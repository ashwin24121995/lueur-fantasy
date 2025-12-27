import { 
  mysqlTable, 
  serial, 
  varchar, 
  text, 
  timestamp, 
  boolean, 
  int,
  json,
  mysqlEnum
} from "drizzle-orm/mysql-core";

// Enums for MySQL
export const userRoleEnum = mysqlEnum("role", ["user", "admin"]);
export const contestStatusEnum = mysqlEnum("status", ["upcoming", "live", "completed", "cancelled"]);
export const teamStatusEnum = mysqlEnum("status", ["draft", "submitted", "locked"]);

// Users table with custom authentication (no Manus auth)
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull().default(""),
  name: text("name"),
  phone: varchar("phone", { length: 20 }),
  dateOfBirth: timestamp("date_of_birth"),
  state: varchar("state", { length: 100 }),
  city: varchar("city", { length: 100 }),
  isVerified: boolean("is_verified").default(false).notNull(),
  isBlocked: boolean("is_blocked").default(false).notNull(),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  lastSignedIn: timestamp("last_signed_in"),
});

// Password reset tokens
export const passwordResetTokens = mysqlTable("password_reset_tokens", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull().references(() => users.id),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Sessions for JWT management
export const sessions = mysqlTable("sessions", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull().references(() => users.id),
  token: varchar("token", { length: 500 }).notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Cached matches from Cricket API
export const matches = mysqlTable("matches", {
  id: serial("id").primaryKey(),
  apiMatchId: varchar("api_match_id", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 500 }).notNull(),
  matchType: varchar("match_type", { length: 50 }).notNull(),
  status: varchar("status", { length: 255 }),
  venue: varchar("venue", { length: 500 }),
  matchDate: timestamp("match_date").notNull(),
  dateTimeGMT: varchar("date_time_gmt", { length: 50 }),
  teams: json("teams"),
  teamInfo: json("team_info"),
  score: json("score"),
  seriesId: varchar("series_id", { length: 100 }),
  fantasyEnabled: boolean("fantasy_enabled").default(false).notNull(),
  bbbEnabled: boolean("bbb_enabled").default(false).notNull(),
  hasSquad: boolean("has_squad").default(false).notNull(),
  matchStarted: boolean("match_started").default(false).notNull(),
  matchEnded: boolean("match_ended").default(false).notNull(),
  tossWinner: varchar("toss_winner", { length: 255 }),
  tossChoice: varchar("toss_choice", { length: 50 }),
  matchWinner: varchar("match_winner", { length: 255 }),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Contests for fantasy matches
export const contests = mysqlTable("contests", {
  id: serial("id").primaryKey(),
  matchId: int("match_id").notNull().references(() => matches.id),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  maxParticipants: int("max_participants").default(100).notNull(),
  currentParticipants: int("current_participants").default(0).notNull(),
  status: mysqlEnum("status", ["upcoming", "live", "completed", "cancelled"]).default("upcoming").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// User fantasy teams - updated to use API match ID directly
export const fantasyTeams = mysqlTable("fantasy_teams", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull().references(() => users.id),
  contestId: int("contest_id"), // Made optional - can be null for direct team creation
  apiMatchId: varchar("api_match_id", { length: 100 }).notNull(), // Use API match ID directly
  matchName: varchar("match_name", { length: 500 }), // Store match name for display
  teamName: varchar("team_name", { length: 100 }),
  captainPlayerId: varchar("captain_player_id", { length: 100 }).notNull(),
  viceCaptainPlayerId: varchar("vice_captain_player_id", { length: 100 }).notNull(),
  totalPoints: int("total_points").default(0).notNull(),
  rank: int("rank"),
  status: mysqlEnum("status", ["draft", "submitted", "locked"]).default("draft").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Player selections for fantasy teams
export const playerSelections = mysqlTable("player_selections", {
  id: serial("id").primaryKey(),
  fantasyTeamId: int("fantasy_team_id").notNull().references(() => fantasyTeams.id),
  playerId: varchar("player_id", { length: 100 }).notNull(),
  playerName: varchar("player_name", { length: 255 }).notNull(),
  playerRole: varchar("player_role", { length: 100 }).notNull(),
  teamName: varchar("team_name", { length: 255 }).notNull(),
  points: int("points").default(0).notNull(),
  isCaptain: boolean("is_captain").default(false).notNull(),
  isViceCaptain: boolean("is_vice_captain").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Match results and player performance
export const matchResults = mysqlTable("match_results", {
  id: serial("id").primaryKey(),
  matchId: int("match_id").notNull().references(() => matches.id),
  playerId: varchar("player_id", { length: 100 }).notNull(),
  playerName: varchar("player_name", { length: 255 }).notNull(),
  battingPoints: int("batting_points").default(0).notNull(),
  bowlingPoints: int("bowling_points").default(0).notNull(),
  fieldingPoints: int("fielding_points").default(0).notNull(),
  totalPoints: int("total_points").default(0).notNull(),
  battingStats: json("batting_stats"),
  bowlingStats: json("bowling_stats"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Contest leaderboard
export const leaderboard = mysqlTable("leaderboard", {
  id: serial("id").primaryKey(),
  contestId: int("contest_id").notNull().references(() => contests.id),
  userId: int("user_id").notNull().references(() => users.id),
  fantasyTeamId: int("fantasy_team_id").notNull().references(() => fantasyTeams.id),
  totalPoints: int("total_points").default(0).notNull(),
  rank: int("rank"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Types for inserts
export type InsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export type InsertMatch = typeof matches.$inferInsert;
export type Match = typeof matches.$inferSelect;

export type InsertContest = typeof contests.$inferInsert;
export type Contest = typeof contests.$inferSelect;

export type InsertFantasyTeam = typeof fantasyTeams.$inferInsert;
export type FantasyTeam = typeof fantasyTeams.$inferSelect;

export type InsertPlayerSelection = typeof playerSelections.$inferInsert;
export type PlayerSelection = typeof playerSelections.$inferSelect;

export type InsertMatchResult = typeof matchResults.$inferInsert;
export type MatchResult = typeof matchResults.$inferSelect;
