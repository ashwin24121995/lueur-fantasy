import { eq, and, gte, lte, desc, asc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { 
  users, InsertUser, User,
  matches, InsertMatch, Match,
  contests, InsertContest, Contest,
  fantasyTeams, InsertFantasyTeam, FantasyTeam,
  playerSelections, InsertPlayerSelection, PlayerSelection,
  matchResults, InsertMatchResult, MatchResult,
  sessions, passwordResetTokens, leaderboard
} from "../drizzle/schema";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _db: any = null;
let _pool: mysql.Pool | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _pool = mysql.createPool(process.env.DATABASE_URL);
      _db = drizzle({ client: _pool });
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============ USER AUTHENTICATION ============

// Restricted states for geo-blocking
const RESTRICTED_STATES = ["telangana", "andhra pradesh", "assam", "odisha"];

export function isRestrictedState(state: string): boolean {
  return RESTRICTED_STATES.includes(state.toLowerCase().trim());
}

export function isUserAdult(dateOfBirth: Date): boolean {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18;
}

export async function createUser(userData: {
  email: string;
  password: string;
  name: string;
  phone?: string;
  dateOfBirth: Date;
  state: string;
  city?: string;
}): Promise<{ success: boolean; error?: string; userId?: number }> {
  const db = await getDb();
  if (!db) return { success: false, error: "Database not available" };

  // Check age restriction
  if (!isUserAdult(userData.dateOfBirth)) {
    return { success: false, error: "You must be 18 years or older to register" };
  }

  // Check geo restriction
  if (isRestrictedState(userData.state)) {
    return { success: false, error: "Registration is not available in your state" };
  }

  // Check if email already exists
  const existingUser = await db.select().from(users).where(eq(users.email, userData.email.toLowerCase())).limit(1);
  if (existingUser.length > 0) {
    return { success: false, error: "Email already registered" };
  }

  // Hash password
  const passwordHash = await bcrypt.hash(userData.password, 12);

  try {
    const result = await db.insert(users).values({
      email: userData.email.toLowerCase(),
      passwordHash,
      name: userData.name,
      phone: userData.phone || null,
      dateOfBirth: userData.dateOfBirth,
      state: userData.state,
      city: userData.city || null,
      isVerified: false,
      role: "user",
    });

    // MySQL returns insertId in the result
    const insertId = (result as any)[0]?.insertId;
    return { success: true, userId: insertId };
  } catch (error) {
    console.error("[Database] Failed to create user:", error);
    return { success: false, error: "Failed to create account" };
  }
}

export async function authenticateUser(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
  const db = await getDb();
  if (!db) return { success: false, error: "Database not available" };

  const result = await db.select().from(users).where(eq(users.email, email.toLowerCase())).limit(1);
  if (result.length === 0) {
    return { success: false, error: "Invalid email or password" };
  }

  const user = result[0];

  if (user.isBlocked) {
    return { success: false, error: "Your account has been blocked" };
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isValidPassword) {
    return { success: false, error: "Invalid email or password" };
  }

  // Update last signed in
  await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, user.id));

  return { success: true, user };
}

export async function getUserById(id: number): Promise<User | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.email, email.toLowerCase())).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserProfile(userId: number, data: Partial<Pick<User, 'name' | 'phone' | 'city'>>): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    await db.update(users).set(data).where(eq(users.id, userId));
    return true;
  } catch (error) {
    console.error("[Database] Failed to update user:", error);
    return false;
  }
}

// ============ PASSWORD RESET ============

export async function createPasswordResetToken(email: string): Promise<{ success: boolean; token?: string; error?: string }> {
  const db = await getDb();
  if (!db) return { success: false, error: "Database not available" };

  const user = await getUserByEmail(email);
  if (!user) {
    // Don't reveal if email exists
    return { success: true };
  }

  const token = nanoid(32);
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  try {
    await db.insert(passwordResetTokens).values({
      userId: user.id,
      token,
      expiresAt,
    });
    return { success: true, token };
  } catch (error) {
    console.error("[Database] Failed to create reset token:", error);
    return { success: false, error: "Failed to create reset token" };
  }
}

export async function resetPassword(token: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
  const db = await getDb();
  if (!db) return { success: false, error: "Database not available" };

  const result = await db.select().from(passwordResetTokens)
    .where(and(
      eq(passwordResetTokens.token, token),
      gte(passwordResetTokens.expiresAt, new Date())
    ))
    .limit(1);

  if (result.length === 0) {
    return { success: false, error: "Invalid or expired reset token" };
  }

  const resetToken = result[0];
  if (resetToken.usedAt) {
    return { success: false, error: "Reset token already used" };
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);

  try {
    await db.update(users).set({ passwordHash }).where(eq(users.id, resetToken.userId));
    await db.update(passwordResetTokens).set({ usedAt: new Date() }).where(eq(passwordResetTokens.id, resetToken.id));
    return { success: true };
  } catch (error) {
    console.error("[Database] Failed to reset password:", error);
    return { success: false, error: "Failed to reset password" };
  }
}

// ============ SESSIONS ============

export async function createSession(userId: number, token: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  try {
    await db.insert(sessions).values({ userId, token, expiresAt });
    return true;
  } catch (error) {
    console.error("[Database] Failed to create session:", error);
    return false;
  }
}

export async function deleteSession(token: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    await db.delete(sessions).where(eq(sessions.token, token));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete session:", error);
    return false;
  }
}

// ============ MATCHES ============

export async function upsertMatch(matchData: InsertMatch): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    // MySQL upsert using ON DUPLICATE KEY UPDATE
    await db.insert(matches).values(matchData).onDuplicateKeyUpdate({
      set: {
        name: matchData.name,
        matchType: matchData.matchType,
        status: matchData.status,
        venue: matchData.venue,
        matchDate: matchData.matchDate,
        dateTimeGMT: matchData.dateTimeGMT,
        teams: matchData.teams,
        teamInfo: matchData.teamInfo,
        score: matchData.score,
        fantasyEnabled: matchData.fantasyEnabled,
        bbbEnabled: matchData.bbbEnabled,
        hasSquad: matchData.hasSquad,
        matchStarted: matchData.matchStarted,
        matchEnded: matchData.matchEnded,
        tossWinner: matchData.tossWinner,
        tossChoice: matchData.tossChoice,
        matchWinner: matchData.matchWinner,
        lastUpdated: new Date(),
      },
    });
    return true;
  } catch (error) {
    console.error("[Database] Failed to upsert match:", error);
    return false;
  }
}

export async function getUpcomingMatches(): Promise<Match[]> {
  const db = await getDb();
  if (!db) return [];

  const now = new Date();
  const result = await db.select().from(matches)
    .where(and(
      gte(matches.matchDate, now),
      eq(matches.matchEnded, false)
    ))
    .orderBy(asc(matches.matchDate))
    .limit(50);

  return result;
}

export async function getLiveMatches(): Promise<Match[]> {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select().from(matches)
    .where(and(
      eq(matches.matchStarted, true),
      eq(matches.matchEnded, false)
    ))
    .orderBy(asc(matches.matchDate))
    .limit(20);

  return result;
}

export async function getCompletedMatches(limit: number = 20): Promise<Match[]> {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select().from(matches)
    .where(eq(matches.matchEnded, true))
    .orderBy(desc(matches.matchDate))
    .limit(limit);

  return result;
}

export async function getMatchById(id: number): Promise<Match | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(matches).where(eq(matches.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getMatchByApiId(apiMatchId: string): Promise<Match | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(matches).where(eq(matches.apiMatchId, apiMatchId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getFantasyEnabledMatches(): Promise<Match[]> {
  const db = await getDb();
  if (!db) return [];

  const now = new Date();
  const result = await db.select().from(matches)
    .where(and(
      eq(matches.fantasyEnabled, true),
      eq(matches.matchEnded, false),
      gte(matches.matchDate, now)
    ))
    .orderBy(asc(matches.matchDate))
    .limit(50);

  return result;
}

// ============ CONTESTS ============

export async function createContest(contestData: InsertContest): Promise<number | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.insert(contests).values(contestData).$returningId();
    return result[0]?.id ?? null;
  } catch (error) {
    console.error("[Database] Failed to create contest:", error);
    return null;
  }
}

export async function getContestsByMatch(matchId: number): Promise<Contest[]> {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select().from(contests)
    .where(eq(contests.matchId, matchId))
    .orderBy(asc(contests.startTime));

  return result;
}

export async function getContestById(id: number): Promise<Contest | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(contests).where(eq(contests.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateContestParticipants(contestId: number, increment: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    const contest = await getContestById(contestId);
    if (!contest) return false;

    await db.update(contests)
      .set({ currentParticipants: contest.currentParticipants + increment })
      .where(eq(contests.id, contestId));
    return true;
  } catch (error) {
    console.error("[Database] Failed to update contest participants:", error);
    return false;
  }
}

// ============ FANTASY TEAMS ============

export async function createFantasyTeam(teamData: InsertFantasyTeam): Promise<number | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.insert(fantasyTeams).values(teamData).$returningId();
    return result[0]?.id ?? null;
  } catch (error) {
    console.error("[Database] Failed to create fantasy team:", error);
    return null;
  }
}

export async function getFantasyTeamById(id: number): Promise<FantasyTeam | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(fantasyTeams).where(eq(fantasyTeams.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserFantasyTeams(userId: number): Promise<FantasyTeam[]> {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select().from(fantasyTeams)
    .where(eq(fantasyTeams.userId, userId))
    .orderBy(desc(fantasyTeams.createdAt));

  return result;
}

export async function getUserTeamForContest(userId: number, contestId: number): Promise<FantasyTeam | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(fantasyTeams)
    .where(and(
      eq(fantasyTeams.userId, userId),
      eq(fantasyTeams.contestId, contestId)
    ))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserTeamForMatch(userId: number, apiMatchId: string): Promise<FantasyTeam | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(fantasyTeams)
    .where(and(
      eq(fantasyTeams.userId, userId),
      eq(fantasyTeams.apiMatchId, apiMatchId)
    ))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function updateFantasyTeamPoints(teamId: number, points: number, rank?: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    const updateData: Partial<FantasyTeam> = { totalPoints: points };
    if (rank !== undefined) updateData.rank = rank;

    await db.update(fantasyTeams).set(updateData).where(eq(fantasyTeams.id, teamId));
    return true;
  } catch (error) {
    console.error("[Database] Failed to update fantasy team points:", error);
    return false;
  }
}

// ============ PLAYER SELECTIONS ============

export async function addPlayerSelections(selections: InsertPlayerSelection[]): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    await db.insert(playerSelections).values(selections);
    return true;
  } catch (error) {
    console.error("[Database] Failed to add player selections:", error);
    return false;
  }
}

export async function getTeamPlayerSelections(fantasyTeamId: number): Promise<PlayerSelection[]> {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select().from(playerSelections)
    .where(eq(playerSelections.fantasyTeamId, fantasyTeamId));

  return result;
}

export async function updatePlayerPoints(fantasyTeamId: number, playerId: string, points: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    await db.update(playerSelections)
      .set({ points })
      .where(and(
        eq(playerSelections.fantasyTeamId, fantasyTeamId),
        eq(playerSelections.playerId, playerId)
      ));
    return true;
  } catch (error) {
    console.error("[Database] Failed to update player points:", error);
    return false;
  }
}

// ============ MATCH RESULTS ============

export async function upsertMatchResult(resultData: InsertMatchResult): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    // For PostgreSQL, we need to handle upsert differently
    // First try to find existing record
    const existing = await db.select().from(matchResults)
      .where(and(
        eq(matchResults.matchId, resultData.matchId),
        eq(matchResults.playerId, resultData.playerId)
      ))
      .limit(1);

    if (existing.length > 0) {
      await db.update(matchResults)
        .set({
          battingPoints: resultData.battingPoints,
          bowlingPoints: resultData.bowlingPoints,
          fieldingPoints: resultData.fieldingPoints,
          totalPoints: resultData.totalPoints,
          battingStats: resultData.battingStats,
          bowlingStats: resultData.bowlingStats,
          updatedAt: new Date(),
        })
        .where(eq(matchResults.id, existing[0].id));
    } else {
      await db.insert(matchResults).values(resultData);
    }
    return true;
  } catch (error) {
    console.error("[Database] Failed to upsert match result:", error);
    return false;
  }
}

export async function getMatchResults(matchId: number): Promise<MatchResult[]> {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select().from(matchResults)
    .where(eq(matchResults.matchId, matchId))
    .orderBy(desc(matchResults.totalPoints));

  return result;
}

// ============ LEADERBOARD ============

export async function updateLeaderboard(contestId: number, userId: number, fantasyTeamId: number, totalPoints: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    // Check if entry exists
    const existing = await db.select().from(leaderboard)
      .where(and(
        eq(leaderboard.contestId, contestId),
        eq(leaderboard.userId, userId)
      ))
      .limit(1);

    if (existing.length > 0) {
      await db.update(leaderboard)
        .set({ totalPoints, updatedAt: new Date() })
        .where(eq(leaderboard.id, existing[0].id));
    } else {
      await db.insert(leaderboard).values({
        contestId,
        userId,
        fantasyTeamId,
        totalPoints,
      });
    }
    return true;
  } catch (error) {
    console.error("[Database] Failed to update leaderboard:", error);
    return false;
  }
}

export async function getContestLeaderboard(contestId: number): Promise<Array<{ userId: number; fantasyTeamId: number; totalPoints: number; rank: number }>> {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select().from(leaderboard)
    .where(eq(leaderboard.contestId, contestId))
    .orderBy(desc(leaderboard.totalPoints));

  return result.map((entry: typeof result[number], index: number) => ({
    userId: entry.userId,
    fantasyTeamId: entry.fantasyTeamId,
    totalPoints: entry.totalPoints,
    rank: index + 1,
  }));
}
