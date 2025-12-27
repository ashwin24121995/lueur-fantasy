import axios from "axios";

// Cricket Data API Configuration
const CRICKET_API_BASE_URL = "https://api.cricapi.com/v1";

// API Key - should be set via environment variable
const getApiKey = () => process.env.CRICKET_API_KEY || "";

// Types for API responses
export interface TeamInfo {
  name: string;
  shortname: string;
  img: string;
}

export interface Score {
  r: number;
  w: number;
  o: number;
  inning: string;
}

// CricScore API response type (for live scores and fixtures)
export interface CricScoreMatch {
  id: string;
  dateTimeGMT: string;
  matchType: string;
  status: string;
  ms: string; // "fixture" for upcoming, or contains score info for live/completed
  t1: string; // Team 1 name with shortcode
  t2: string; // Team 2 name with shortcode
  t1s: string; // Team 1 score (empty for fixtures)
  t2s: string; // Team 2 score (empty for fixtures)
  t1img: string;
  t2img: string;
  series: string;
}

export interface MatchData {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo: TeamInfo[];
  score?: Score[];
  seriesId?: string;
  series_id?: string;
  fantasyEnabled?: boolean;
  bbbEnabled?: boolean;
  hasSquad?: boolean;
  matchStarted?: boolean;
  matchEnded?: boolean;
  tossWinner?: string;
  tossChoice?: string;
  matchWinner?: string;
}

export interface Player {
  id: string;
  name: string;
  role: string;
  battingStyle?: string;
  bowlingStyle?: string;
  country?: string;
  playerImg?: string;
}

export interface TeamSquad {
  teamName: string;
  shortname: string;
  img: string;
  players: Player[];
}

export interface PlayerPoints {
  id: string;
  name: string;
  points: number;
  altnames?: string[];
}

export interface InningsPoints {
  inning: string;
  batting: PlayerPoints[];
  bowling: PlayerPoints[];
}

export interface BattingStats {
  batsman: { id: string; name: string };
  dismissal: string;
  dismissalText?: string;
  r: number;
  b: number;
  "4s": number;
  "6s": number;
  sr: number;
}

export interface BowlingStats {
  bowler: { id: string; name: string };
  o: number;
  m: number;
  r: number;
  w: number;
  nb?: number;
  wd?: number;
  eco: number;
}

export interface ScorecardInning {
  batting: BattingStats[];
  bowling: BowlingStats[];
  inning: string;
}

// API Response wrapper
interface ApiResponse<T> {
  apikey: string;
  data: T;
  status: string;
  info: {
    hitsToday: number;
    hitsUsed: number;
    hitsLimit: number;
    credits: number;
    server: number;
    queryTime: number;
  };
}

class CricketApiService {
  private apiKey: string;

  constructor() {
    this.apiKey = getApiKey();
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, string> = {}): Promise<T | null> {
    try {
      const apiKey = getApiKey();
      if (!apiKey) {
        console.error("[CricketAPI] API key not configured");
        return null;
      }

      console.log(`[CricketAPI] Calling ${endpoint} with params:`, params);

      const response = await axios.get<ApiResponse<T>>(`${CRICKET_API_BASE_URL}${endpoint}`, {
        params: {
          apikey: apiKey,
          ...params,
        },
        timeout: 30000,
      });

      console.log(`[CricketAPI] Response status: ${response.data.status}, data count: ${Array.isArray(response.data.data) ? response.data.data.length : 'N/A'}`);

      if (response.data.status === "success") {
        return response.data.data;
      } else {
        console.error("[CricketAPI] API returned error status:", response.data);
        return null;
      }
    } catch (error) {
      console.error("[CricketAPI] Request failed:", error);
      return null;
    }
  }

  /**
   * Get live scores and fixtures using cricScore API (most reliable for live/upcoming)
   */
  async getCricScore(): Promise<CricScoreMatch[]> {
    const data = await this.makeRequest<CricScoreMatch[]>("/cricScore");
    return data || [];
  }

  /**
   * Get current matches with full details (includes recently completed)
   */
  async getCurrentMatches(offset: number = 0): Promise<MatchData[]> {
    const data = await this.makeRequest<MatchData[]>("/currentMatches", { offset: offset.toString() });
    return data || [];
  }

  /**
   * Get list of matches (general list)
   */
  async getMatches(): Promise<MatchData[]> {
    const data = await this.makeRequest<MatchData[]>("/matches");
    return data || [];
  }

  /**
   * Get detailed information for a specific match
   */
  async getMatchInfo(matchId: string): Promise<MatchData | null> {
    return this.makeRequest<MatchData>("/match_info", { id: matchId });
  }

  /**
   * Get squad information for a match (Fantasy API)
   */
  async getMatchSquad(matchId: string): Promise<TeamSquad[]> {
    const data = await this.makeRequest<TeamSquad[]>("/match_squad", { id: matchId });
    return data || [];
  }

  /**
   * Get scorecard for a match (Fantasy API)
   */
  async getMatchScorecard(matchId: string): Promise<{ data: MatchData; scorecard: ScorecardInning[] } | null> {
    const response = await this.makeRequest<MatchData & { scorecard: ScorecardInning[] }>("/match_scorecard", { id: matchId });
    if (response) {
      const { scorecard, ...matchData } = response;
      return { data: matchData, scorecard: scorecard || [] };
    }
    return null;
  }

  /**
   * Get fantasy points for a match (Fantasy API)
   */
  async getMatchPoints(matchId: string, ruleset: number = 0): Promise<{ innings: InningsPoints[]; totals?: PlayerPoints[] } | null> {
    return this.makeRequest<{ innings: InningsPoints[]; totals?: PlayerPoints[] }>("/match_points", { 
      id: matchId, 
      ruleset: ruleset.toString() 
    });
  }

  /**
   * Get live matches from cricScore API
   * Live matches have ms != "fixture" and have scores
   */
  async getLiveMatches(): Promise<CricScoreMatch[]> {
    const matches = await this.getCricScore();
    return matches.filter(match => {
      // Live matches have scores (t1s or t2s not empty) and ms is not "fixture"
      const hasScores = match.t1s || match.t2s;
      const isFixture = match.ms === "fixture";
      const isCompleted = match.status.toLowerCase().includes("won") || 
                          match.status.toLowerCase().includes("draw") ||
                          match.status.toLowerCase().includes("no result") ||
                          match.status.toLowerCase().includes("abandoned");
      return hasScores && !isFixture && !isCompleted;
    });
  }

  /**
   * Get upcoming matches (fixtures) from cricScore API
   */
  async getUpcomingMatches(): Promise<CricScoreMatch[]> {
    const matches = await this.getCricScore();
    const now = new Date();
    
    return matches.filter(match => {
      const isFixture = match.ms === "fixture";
      const matchDate = new Date(match.dateTimeGMT);
      return isFixture && matchDate >= now;
    }).sort((a, b) => {
      const dateA = new Date(a.dateTimeGMT);
      const dateB = new Date(b.dateTimeGMT);
      return dateA.getTime() - dateB.getTime();
    });
  }

  /**
   * Get today's matches from cricScore API
   */
  async getTodayMatches(): Promise<CricScoreMatch[]> {
    const matches = await this.getCricScore();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return matches.filter(match => {
      const matchDate = new Date(match.dateTimeGMT);
      return matchDate >= today && matchDate < tomorrow;
    }).sort((a, b) => {
      const dateA = new Date(a.dateTimeGMT);
      const dateB = new Date(b.dateTimeGMT);
      return dateA.getTime() - dateB.getTime();
    });
  }

  /**
   * Get tomorrow's matches from cricScore API
   */
  async getTomorrowMatches(): Promise<CricScoreMatch[]> {
    const matches = await this.getCricScore();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(dayAfter.getDate() + 1);
    
    return matches.filter(match => {
      const matchDate = new Date(match.dateTimeGMT);
      return matchDate >= tomorrow && matchDate < dayAfter;
    }).sort((a, b) => {
      const dateA = new Date(a.dateTimeGMT);
      const dateB = new Date(b.dateTimeGMT);
      return dateA.getTime() - dateB.getTime();
    });
  }

  /**
   * Parse API date string as UTC
   * API returns dates like "2025-12-28T08:25:00" which are in GMT/UTC
   */
  private parseApiDateAsUTC(dateStr: string): Date {
    // If the date string doesn't have a timezone, append 'Z' to treat as UTC
    if (!dateStr.endsWith('Z') && !dateStr.includes('+') && !dateStr.includes('-', 10)) {
      return new Date(dateStr + 'Z');
    }
    return new Date(dateStr);
  }

  /**
   * Get IST (Indian Standard Time) date boundaries
   * IST is UTC+5:30
   */
  private getISTDateBoundaries(): { todayStart: Date; tomorrowStart: Date; dayAfterStart: Date } {
    const now = new Date();
    // IST offset is +5:30 = 330 minutes
    const IST_OFFSET_MS = 330 * 60 * 1000;
    
    // Get current time in IST
    const istNow = new Date(now.getTime() + IST_OFFSET_MS);
    
    // Get today's midnight in IST, then convert to UTC
    // Today in IST starts at 00:00 IST = 18:30 previous day UTC
    const todayMidnightIST = new Date(Date.UTC(
      istNow.getUTCFullYear(),
      istNow.getUTCMonth(),
      istNow.getUTCDate(),
      0, 0, 0, 0
    ));
    // Convert IST midnight to UTC (subtract 5:30)
    const todayStart = new Date(todayMidnightIST.getTime() - IST_OFFSET_MS);
    
    const tomorrowStart = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);
    const dayAfterStart = new Date(tomorrowStart.getTime() + 24 * 60 * 60 * 1000);
    
    return { todayStart, tomorrowStart, dayAfterStart };
  }

  /**
   * Get all live and upcoming matches combined
   * Uses IST timezone for today/tomorrow calculations
   */
  async getLiveAndUpcomingMatches(): Promise<{ live: CricScoreMatch[]; today: CricScoreMatch[]; tomorrow: CricScoreMatch[] }> {
    const matches = await this.getCricScore();
    const { todayStart, tomorrowStart, dayAfterStart } = this.getISTDateBoundaries();
    const now = new Date();

    console.log(`[CricketAPI] Current time: ${now.toISOString()}`);
    console.log(`[CricketAPI] IST Date Boundaries - Today: ${todayStart.toISOString()}, Tomorrow: ${tomorrowStart.toISOString()}, DayAfter: ${dayAfterStart.toISOString()}`);

    const live: CricScoreMatch[] = [];
    const todayMatches: CricScoreMatch[] = [];
    const tomorrowMatches: CricScoreMatch[] = [];

    for (const match of matches) {
      // Parse API date as UTC (API returns dates in GMT)
      const matchDate = this.parseApiDateAsUTC(match.dateTimeGMT);
      const hasScores = match.t1s || match.t2s;
      const isFixture = match.ms === "fixture";
      const statusLower = (match.status || "").toLowerCase();
      const isCompleted = statusLower.includes("won") || 
                          statusLower.includes("draw") ||
                          statusLower.includes("no result") ||
                          statusLower.includes("abandoned");
      
      // Check if match has started (current time is past match start time)
      // For T20 matches, assume ~4 hours duration; for ODI ~9 hours; for Test ~8 hours per day
      const matchStarted = now >= matchDate;
      const hoursSinceStart = (now.getTime() - matchDate.getTime()) / (1000 * 60 * 60);
      // Consider match potentially live if started within last 10 hours (covers most formats)
      const potentiallyLive = matchStarted && hoursSinceStart < 10;

      // Live match conditions:
      // 1. Has scores and not completed (API confirmed live)
      // 2. OR match has started (time-based) and not marked as completed
      const isLive = (hasScores && !isCompleted) || (potentiallyLive && !isCompleted && !isFixture);

      if (isLive) {
        live.push(match);
      }
      // Today's fixture - hasn't started yet (in IST)
      else if (matchDate >= now && matchDate >= todayStart && matchDate < tomorrowStart && !isCompleted) {
        todayMatches.push(match);
      }
      // Tomorrow's fixture (in IST)
      else if (matchDate >= tomorrowStart && matchDate < dayAfterStart && !isCompleted) {
        tomorrowMatches.push(match);
      }
    }

    console.log(`[CricketAPI] Found - Live: ${live.length}, Today: ${todayMatches.length}, Tomorrow: ${tomorrowMatches.length}`);

    // Sort by date
    const sortByDate = (a: CricScoreMatch, b: CricScoreMatch) => {
      const dateA = this.parseApiDateAsUTC(a.dateTimeGMT);
      const dateB = this.parseApiDateAsUTC(b.dateTimeGMT);
      return dateA.getTime() - dateB.getTime();
    };

    return {
      live: live.sort(sortByDate),
      today: todayMatches.sort(sortByDate),
      tomorrow: tomorrowMatches.sort(sortByDate)
    };
  }

  /**
   * Filter matches to get only upcoming matches (today and future) - for MatchData type
   */
  filterUpcomingMatches(matches: MatchData[]): MatchData[] {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return matches.filter(match => {
      const matchDate = new Date(match.dateTimeGMT || match.date);
      return matchDate >= today && !match.matchEnded;
    }).sort((a, b) => {
      const dateA = new Date(a.dateTimeGMT || a.date);
      const dateB = new Date(b.dateTimeGMT || b.date);
      return dateA.getTime() - dateB.getTime();
    });
  }

  /**
   * Filter matches to get only live matches - for MatchData type
   */
  filterLiveMatches(matches: MatchData[]): MatchData[] {
    return matches.filter(match => match.matchStarted && !match.matchEnded);
  }

  /**
   * Filter matches to get only completed matches - for MatchData type
   */
  filterCompletedMatches(matches: MatchData[]): MatchData[] {
    return matches.filter(match => match.matchEnded).sort((a, b) => {
      const dateA = new Date(a.dateTimeGMT || a.date);
      const dateB = new Date(b.dateTimeGMT || b.date);
      return dateB.getTime() - dateA.getTime(); // Most recent first
    });
  }

  /**
   * Filter matches to get only fantasy-enabled matches - for MatchData type
   */
  filterFantasyEnabledMatches(matches: MatchData[]): MatchData[] {
    return matches.filter(match => match.fantasyEnabled === true);
  }

  /**
   * Get upcoming fantasy-enabled matches
   */
  async getUpcomingFantasyMatches(): Promise<MatchData[]> {
    const matches = await this.getCurrentMatches();
    const upcoming = this.filterUpcomingMatches(matches);
    return this.filterFantasyEnabledMatches(upcoming);
  }

  /**
   * Get live fantasy-enabled matches
   */
  async getLiveFantasyMatches(): Promise<MatchData[]> {
    const matches = await this.getCurrentMatches();
    const live = this.filterLiveMatches(matches);
    return this.filterFantasyEnabledMatches(live);
  }

  /**
   * Calculate total points for a player from innings data
   */
  calculatePlayerTotalPoints(playerId: string, inningsData: InningsPoints[]): number {
    let totalPoints = 0;

    for (const inning of inningsData) {
      // Check batting points
      const battingEntry = inning.batting.find(p => p.id === playerId);
      if (battingEntry) {
        totalPoints += battingEntry.points;
      }

      // Check bowling points
      const bowlingEntry = inning.bowling.find(p => p.id === playerId);
      if (bowlingEntry) {
        totalPoints += bowlingEntry.points;
      }
    }

    return totalPoints;
  }

  /**
   * Categorize player by role for team selection
   */
  categorizePlayerRole(role: string): "WK" | "BAT" | "AR" | "BOWL" {
    const normalizedRole = role.toLowerCase();
    
    if (normalizedRole.includes("wk") || normalizedRole.includes("wicket")) {
      return "WK";
    }
    if (normalizedRole.includes("allrounder") || normalizedRole.includes("all-rounder")) {
      return "AR";
    }
    if (normalizedRole.includes("bowl")) {
      return "BOWL";
    }
    return "BAT";
  }
}

export const cricketApi = new CricketApiService();

// Additional method to get matches with squad data available
export async function getMatchesWithSquad(): Promise<MatchData[]> {
  const matches = await cricketApi.getCurrentMatches();
  // Filter to only matches that have squad data available
  return matches.filter(match => match.hasSquad === true && !match.matchEnded);
}
