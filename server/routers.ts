import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
// systemRouter removed - not needed for Railway deployment
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { sdk } from "./_core/sdk";
import * as db from "./db";
import { cricketApi } from "./cricketApi";
import { TRPCError } from "@trpc/server";

// Indian states list for validation
const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

// Restricted states
const RESTRICTED_STATES = ["Telangana", "Andhra Pradesh", "Assam", "Odisha"];

export const appRouter = router({
  
  // Custom Authentication Router
  auth: router({
    me: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.user) return null;
      return {
        id: ctx.user.id,
        email: ctx.user.email,
        name: ctx.user.name,
        phone: ctx.user.phone,
        state: ctx.user.state,
        city: ctx.user.city,
        role: ctx.user.role,
        createdAt: ctx.user.createdAt,
      };
    }),

    register: publicProcedure
      .input(z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        name: z.string().min(2, "Name must be at least 2 characters"),
        phone: z.string().optional(),
        dateOfBirth: z.string(),
        state: z.string(),
        city: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        // Check if state is restricted
        if (RESTRICTED_STATES.some(s => s.toLowerCase() === input.state.toLowerCase())) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Registration is not available in your state (Telangana, Andhra Pradesh, Assam, Odisha)",
          });
        }

        // Check age (must be 18+)
        const dob = new Date(input.dateOfBirth);
        if (!db.isUserAdult(dob)) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You must be 18 years or older to register",
          });
        }

        const result = await db.createUser({
          email: input.email,
          password: input.password,
          name: input.name,
          phone: input.phone,
          dateOfBirth: dob,
          state: input.state,
          city: input.city,
        });

        if (!result.success) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: result.error || "Registration failed",
          });
        }

        return { success: true, message: "Registration successful" };
      }),

    login: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        const result = await db.authenticateUser(input.email, input.password);

        if (!result.success || !result.user) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: result.error || "Invalid credentials",
          });
        }

        const user = result.user;

        // Check geo restriction
        if (db.isRestrictedState(user.state || "")) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Access is not available in your state",
          });
        }

        // Create session token
        const sessionToken = await sdk.createSessionToken(
          user.id,
          user.email,
          user.name || "User",
          { expiresInMs: 7 * 24 * 60 * 60 * 1000 } // 7 days
        );

        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

        return {
          success: true,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
        };
      }),

    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true };
    }),

    forgotPassword: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        await db.createPasswordResetToken(input.email);
        // Always return success to prevent email enumeration
        return { 
          success: true, 
          message: "If an account exists with this email, you will receive a password reset link" 
        };
      }),

    resetPassword: publicProcedure
      .input(z.object({
        token: z.string(),
        password: z.string().min(8),
      }))
      .mutation(async ({ input }) => {
        const result = await db.resetPassword(input.token, input.password);
        if (!result.success) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: result.error || "Failed to reset password",
          });
        }
        return { success: true, message: "Password reset successful" };
      }),

    updateProfile: protectedProcedure
      .input(z.object({
        name: z.string().min(2).optional(),
        phone: z.string().optional(),
        city: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const success = await db.updateUserProfile(ctx.user.id, input);
        if (!success) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update profile",
          });
        }
        return { success: true };
      }),
  }),

  // Matches Router
  matches: router({
    // Get live and upcoming matches using cricScore API (most reliable)
    getLiveAndUpcoming: publicProcedure.query(async () => {
      return cricketApi.getLiveAndUpcomingMatches();
    }),

    // Get all matches from API (upcoming, live, completed)
    getAll: publicProcedure.query(async () => {
      const matches = await cricketApi.getCurrentMatches();
      return {
        upcoming: cricketApi.filterUpcomingMatches(matches),
        live: cricketApi.filterLiveMatches(matches),
        completed: cricketApi.filterCompletedMatches(matches).slice(0, 10),
      };
    }),

    // Get upcoming matches only (using cricScore)
    getUpcoming: publicProcedure.query(async () => {
      return cricketApi.getUpcomingMatches();
    }),

    // Get live matches only (using cricScore)
    getLive: publicProcedure.query(async () => {
      return cricketApi.getLiveMatches();
    }),

    // Get today's matches
    getToday: publicProcedure.query(async () => {
      return cricketApi.getTodayMatches();
    }),

    // Get tomorrow's matches
    getTomorrow: publicProcedure.query(async () => {
      return cricketApi.getTomorrowMatches();
    }),

    // Get fantasy-enabled upcoming matches
    getFantasyMatches: publicProcedure.query(async () => {
      return cricketApi.getUpcomingFantasyMatches();
    }),

    // Get match details
    getById: publicProcedure
      .input(z.object({ matchId: z.string() }))
      .query(async ({ input }) => {
        return cricketApi.getMatchInfo(input.matchId);
      }),

    // Get match squad
    getSquad: publicProcedure
      .input(z.object({ matchId: z.string() }))
      .query(async ({ input }) => {
        return cricketApi.getMatchSquad(input.matchId);
      }),

    // Get match scorecard
    getScorecard: publicProcedure
      .input(z.object({ matchId: z.string() }))
      .query(async ({ input }) => {
        return cricketApi.getMatchScorecard(input.matchId);
      }),

    // Get matches with squad data available (for team creation)
    getMatchesWithSquad: publicProcedure.query(async () => {
      const matches = await cricketApi.getCurrentMatches();
      // Filter to only matches that have squad data available and haven't ended
      return matches.filter(match => match.hasSquad === true && !match.matchEnded);
    }),

    // Get match fantasy points
    getPoints: publicProcedure
      .input(z.object({ matchId: z.string(), ruleset: z.number().optional() }))
      .query(async ({ input }) => {
        return cricketApi.getMatchPoints(input.matchId, input.ruleset || 0);
      }),
  }),

  // Contests Router
  contests: router({
    // Get contests for a match
    getByMatch: publicProcedure
      .input(z.object({ matchId: z.number() }))
      .query(async ({ input }) => {
        return db.getContestsByMatch(input.matchId);
      }),

    // Get contest details
    getById: publicProcedure
      .input(z.object({ contestId: z.number() }))
      .query(async ({ input }) => {
        return db.getContestById(input.contestId);
      }),

    // Create a contest (admin only or auto-created)
    create: protectedProcedure
      .input(z.object({
        matchId: z.number(),
        name: z.string(),
        description: z.string().optional(),
        maxParticipants: z.number().default(100),
        startTime: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        // Only admins can create contests
        if (ctx.user.role !== "admin") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Only admins can create contests",
          });
        }

        const contestId = await db.createContest({
          matchId: input.matchId,
          name: input.name,
          description: input.description,
          maxParticipants: input.maxParticipants,
          startTime: new Date(input.startTime),
        });

        if (!contestId) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create contest",
          });
        }

        return { success: true, contestId };
      }),

    // Get leaderboard for a contest
    getLeaderboard: publicProcedure
      .input(z.object({ contestId: z.number() }))
      .query(async ({ input }) => {
        return db.getContestLeaderboard(input.contestId);
      }),
  }),

  // Fantasy Teams Router
  teams: router({
    // Get user's teams
    getMyTeams: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserFantasyTeams(ctx.user.id);
    }),

    // Get team details with players
    getById: protectedProcedure
      .input(z.object({ teamId: z.number() }))
      .query(async ({ input, ctx }) => {
        const team = await db.getFantasyTeamById(input.teamId);
        if (!team || team.userId !== ctx.user.id) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Team not found",
          });
        }
        const players = await db.getTeamPlayerSelections(team.id);
        return { team, players };
      }),

    // Check if user has team for contest
    hasTeamForContest: protectedProcedure
      .input(z.object({ contestId: z.number() }))
      .query(async ({ input, ctx }) => {
        const team = await db.getUserTeamForContest(ctx.user.id, input.contestId);
        return { hasTeam: !!team, team };
      }),

    // Create fantasy team
    create: protectedProcedure
      .input(z.object({
        contestId: z.number(),
        matchId: z.number(),
        teamName: z.string().optional(),
        captainPlayerId: z.string(),
        viceCaptainPlayerId: z.string(),
        players: z.array(z.object({
          playerId: z.string(),
          playerName: z.string(),
          playerRole: z.string(),
          teamName: z.string(),
        })),
      }))
      .mutation(async ({ input, ctx }) => {
        // Validate team composition
        if (input.players.length !== 11) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Team must have exactly 11 players",
          });
        }

        // Check captain and vice-captain are in the team
        const playerIds = input.players.map(p => p.playerId);
        if (!playerIds.includes(input.captainPlayerId) || !playerIds.includes(input.viceCaptainPlayerId)) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Captain and Vice-Captain must be in the team",
          });
        }

        if (input.captainPlayerId === input.viceCaptainPlayerId) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Captain and Vice-Captain must be different players",
          });
        }

        // Check if user already has a team for this contest
        const existingTeam = await db.getUserTeamForContest(ctx.user.id, input.contestId);
        if (existingTeam) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "You already have a team for this contest",
          });
        }

        // Validate role composition
        const roleCount = {
          WK: 0,
          BAT: 0,
          AR: 0,
          BOWL: 0,
        };

        for (const player of input.players) {
          const category = cricketApi.categorizePlayerRole(player.playerRole);
          roleCount[category]++;
        }

        // Minimum requirements: 1 WK, 3 BAT, 1 AR, 3 BOWL
        if (roleCount.WK < 1) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Team must have at least 1 Wicket-Keeper",
          });
        }
        if (roleCount.BAT < 3) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Team must have at least 3 Batsmen",
          });
        }
        if (roleCount.BOWL < 3) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Team must have at least 3 Bowlers",
          });
        }

        // Create the team
        const teamId = await db.createFantasyTeam({
          userId: ctx.user.id,
          contestId: input.contestId,
          matchId: input.matchId,
          teamName: input.teamName,
          captainPlayerId: input.captainPlayerId,
          viceCaptainPlayerId: input.viceCaptainPlayerId,
          status: "submitted",
        });

        if (!teamId) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create team",
          });
        }

        // Add player selections
        const selections = input.players.map(player => ({
          fantasyTeamId: teamId,
          playerId: player.playerId,
          playerName: player.playerName,
          playerRole: player.playerRole,
          teamName: player.teamName,
          isCaptain: player.playerId === input.captainPlayerId,
          isViceCaptain: player.playerId === input.viceCaptainPlayerId,
        }));

        await db.addPlayerSelections(selections);

        // Update contest participants
        await db.updateContestParticipants(input.contestId, 1);

        return { success: true, teamId };
      }),
  }),

  // Utility data
  utils: router({
    getIndianStates: publicProcedure.query(() => {
      return INDIAN_STATES.map(state => ({
        value: state,
        label: state,
        isRestricted: RESTRICTED_STATES.includes(state),
      }));
    }),

    getRestrictedStates: publicProcedure.query(() => RESTRICTED_STATES),
  }),
});

export type AppRouter = typeof appRouter;
