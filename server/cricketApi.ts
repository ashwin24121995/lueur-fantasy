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

      const response = await axios.get<ApiResponse<T>>(`${CRICKET_API_BASE_URL}${endpoint}`, {
        params: {
          apikey: apiKey,
          ...params,
        },
        timeout: 30000,
      });

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
   * Get list of current and upcoming matches
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
   * Filter matches to get only upcoming matches (today and future)
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
   * Filter matches to get only live matches
   */
  filterLiveMatches(matches: MatchData[]): MatchData[] {
    return matches.filter(match => match.matchStarted && !match.matchEnded);
  }

  /**
   * Filter matches to get only completed matches
   */
  filterCompletedMatches(matches: MatchData[]): MatchData[] {
    return matches.filter(match => match.matchEnded).sort((a, b) => {
      const dateA = new Date(a.dateTimeGMT || a.date);
      const dateB = new Date(b.dateTimeGMT || b.date);
      return dateB.getTime() - dateA.getTime(); // Most recent first
    });
  }

  /**
   * Filter matches to get only fantasy-enabled matches
   */
  filterFantasyEnabledMatches(matches: MatchData[]): MatchData[] {
    return matches.filter(match => match.fantasyEnabled === true);
  }

  /**
   * Get upcoming fantasy-enabled matches
   */
  async getUpcomingFantasyMatches(): Promise<MatchData[]> {
    const matches = await this.getMatches();
    const upcoming = this.filterUpcomingMatches(matches);
    return this.filterFantasyEnabledMatches(upcoming);
  }

  /**
   * Get live fantasy-enabled matches
   */
  async getLiveFantasyMatches(): Promise<MatchData[]> {
    const matches = await this.getMatches();
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
