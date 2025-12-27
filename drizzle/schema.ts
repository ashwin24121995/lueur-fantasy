import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json } from "drizzle-orm/mysql-core";

// Users table with custom authentication (no Manus auth)
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull().default(""),
  name: text("name"),
  phone: varchar("phone", { length: 20 }),
  dateOfBirth: timestamp("dateOfBirth"),
  state: varchar("state", { length: 100 }),
  city: varchar("city", { length: 100 }),
  isVerified: boolean("isVerified").default(false).notNull(),
  isBlocked: boolean("isBlocked").default(false).notNull(),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn"),
});

// Password reset tokens
export const passwordResetTokens = mysqlTable("passwordResetTokens", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expiresAt: timestamp("expiresAt").notNull(),
  usedAt: timestamp("usedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Sessions for JWT management
export const sessions = mysqlTable("sessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  token: varchar("token", { length: 500 }).notNull().unique(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Cached matches from Cricket API
export const matches = mysqlTable("matches", {
  id: int("id").autoincrement().primaryKey(),
  apiMatchId: varchar("apiMatchId", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 500 }).notNull(),
  matchType: varchar("matchType", { length: 50 }).notNull(),
  status: varchar("status", { length: 255 }),
  venue: varchar("venue", { length: 500 }),
  matchDate: timestamp("matchDate").notNull(),
  dateTimeGMT: varchar("dateTimeGMT", { length: 50 }),
  teams: json("teams"),
  teamInfo: json("teamInfo"),
  score: json("score"),
  seriesId: varchar("seriesId", { length: 100 }),
  fantasyEnabled: boolean("fantasyEnabled").default(false).notNull(),
  bbbEnabled: boolean("bbbEnabled").default(false).notNull(),
  hasSquad: boolean("hasSquad").default(false).notNull(),
  matchStarted: boolean("matchStarted").default(false).notNull(),
  matchEnded: boolean("matchEnded").default(false).notNull(),
  tossWinner: varchar("tossWinner", { length: 255 }),
  tossChoice: varchar("tossChoice", { length: 50 }),
  matchWinner: varchar("matchWinner", { length: 255 }),
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Contests for fantasy matches
export const contests = mysqlTable("contests", {
  id: int("id").autoincrement().primaryKey(),
  matchId: int("matchId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  maxParticipants: int("maxParticipants").default(100).notNull(),
  currentParticipants: int("currentParticipants").default(0).notNull(),
  status: mysqlEnum("status", ["upcoming", "live", "completed", "cancelled"]).default("upcoming").notNull(),
  startTime: timestamp("startTime").notNull(),
  endTime: timestamp("endTime"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// User fantasy teams
export const fantasyTeams = mysqlTable("fantasyTeams", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  contestId: int("contestId").notNull(),
  matchId: int("matchId").notNull(),
  teamName: varchar("teamName", { length: 100 }),
  captainPlayerId: varchar("captainPlayerId", { length: 100 }).notNull(),
  viceCaptainPlayerId: varchar("viceCaptainPlayerId", { length: 100 }).notNull(),
  totalPoints: int("totalPoints").default(0).notNull(),
  rank: int("rank"),
  status: mysqlEnum("status", ["draft", "submitted", "locked"]).default("draft").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Player selections for fantasy teams
export const playerSelections = mysqlTable("playerSelections", {
  id: int("id").autoincrement().primaryKey(),
  fantasyTeamId: int("fantasyTeamId").notNull(),
  playerId: varchar("playerId", { length: 100 }).notNull(),
  playerName: varchar("playerName", { length: 255 }).notNull(),
  playerRole: varchar("playerRole", { length: 100 }).notNull(),
  teamName: varchar("teamName", { length: 255 }).notNull(),
  points: int("points").default(0).notNull(),
  isCaptain: boolean("isCaptain").default(false).notNull(),
  isViceCaptain: boolean("isViceCaptain").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Match results and player performance
export const matchResults = mysqlTable("matchResults", {
  id: int("id").autoincrement().primaryKey(),
  matchId: int("matchId").notNull(),
  playerId: varchar("playerId", { length: 100 }).notNull(),
  playerName: varchar("playerName", { length: 255 }).notNull(),
  battingPoints: int("battingPoints").default(0).notNull(),
  bowlingPoints: int("bowlingPoints").default(0).notNull(),
  fieldingPoints: int("fieldingPoints").default(0).notNull(),
  totalPoints: int("totalPoints").default(0).notNull(),
  battingStats: json("battingStats"),
  bowlingStats: json("bowlingStats"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Contest leaderboard
export const leaderboard = mysqlTable("leaderboard", {
  id: int("id").autoincrement().primaryKey(),
  contestId: int("contestId").notNull(),
  userId: int("userId").notNull(),
  fantasyTeamId: int("fantasyTeamId").notNull(),
  totalPoints: int("totalPoints").default(0).notNull(),
  rank: int("rank"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Match = typeof matches.$inferSelect;
export type InsertMatch = typeof matches.$inferInsert;
export type Contest = typeof contests.$inferSelect;
export type InsertContest = typeof contests.$inferInsert;
export type FantasyTeam = typeof fantasyTeams.$inferSelect;
export type InsertFantasyTeam = typeof fantasyTeams.$inferInsert;
export type PlayerSelection = typeof playerSelections.$inferSelect;
export type InsertPlayerSelection = typeof playerSelections.$inferInsert;
export type MatchResult = typeof matchResults.$inferSelect;
export type InsertMatchResult = typeof matchResults.$inferInsert;
