import { useAuth } from "@/_core/hooks/useAuth";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  Users, 
  Calendar, 
  ArrowRight, 
  User,
  Target,
  TrendingUp,
  Clock,
  Radio,
  Zap,
  Star,
  Award,
  Play,
  ChevronRight,
  Activity,
  Flame,
  Medal,
  Crown,
  Shield,
  Sparkles,
  BarChart3,
  PieChart,
  Timer,
  Bell,
  Settings,
  HelpCircle,
  LogOut
} from "lucide-react";
import { useEffect, useState } from "react";

// Parse GMT date string to UTC Date object
function parseGMTDate(dateStr: string): Date {
  if (!dateStr) return new Date();
  const cleanDate = dateStr.endsWith("Z") ? dateStr : dateStr + "Z";
  return new Date(cleanDate);
}

// Format time in IST
function formatTimeIST(dateStr: string): string {
  const date = parseGMTDate(dateStr);
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
}

// Format date in IST
function formatDateIST(dateStr: string): string {
  const date = parseGMTDate(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    timeZone: "Asia/Kolkata",
  });
}

// Get time until match starts
function getTimeUntil(dateStr: string): string {
  const matchDate = parseGMTDate(dateStr);
  const now = new Date();
  const diff = matchDate.getTime() - now.getTime();

  if (diff <= 0) return "Started";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  }
  return `${hours}h ${minutes}m`;
}

// Animated Stat Card Component
function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  description,
  trend,
  trendValue,
  color = "emerald"
}: { 
  title: string; 
  value: string | number; 
  icon: any; 
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: "emerald" | "blue" | "purple" | "amber" | "red";
}) {
  const colorClasses = {
    emerald: "from-emerald-500 to-emerald-600",
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
    amber: "from-amber-500 to-amber-600",
    red: "from-red-500 to-red-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-white">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClasses[color]} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2`} />
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">{title}</p>
              <p className="text-3xl font-bold text-gray-900">{value}</p>
              {description && (
                <p className="text-xs text-gray-400">{description}</p>
              )}
              {trend && trendValue && (
                <div className={`flex items-center gap-1 text-xs ${
                  trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-600" : "text-gray-500"
                }`}>
                  {trend === "up" ? <TrendingUp className="h-3 w-3" /> : trend === "down" ? <TrendingUp className="h-3 w-3 rotate-180" /> : null}
                  <span>{trendValue}</span>
                </div>
              )}
            </div>
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center shadow-lg`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Match Card Component
function MatchCard({ match, index }: { match: any; index: number }) {
  const isLive = match.ms === "live" || match.status?.toLowerCase().includes("live");
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Link href={isLive ? `/match/${match.id}` : `/create-team/${match.id}`}>
        <div className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
          isLive 
            ? "bg-gradient-to-r from-red-50 to-orange-50 border-red-200 hover:border-red-300 hover:shadow-md" 
            : "bg-white border-gray-100 hover:border-emerald-200 hover:shadow-md"
        }`}>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className={`text-xs ${isLive ? "border-red-300 text-red-600 bg-red-50" : "border-gray-200"}`}>
              {match.matchType?.toUpperCase() || "T20"}
            </Badge>
            {isLive ? (
              <div className="flex items-center gap-1 text-red-600">
                <Radio className="h-3 w-3 animate-pulse" />
                <span className="text-xs font-semibold">LIVE</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-gray-500">
                <Timer className="h-3 w-3" />
                <span className="text-xs font-medium">{getTimeUntil(match.dateTimeGMT)}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">{match.t1}</p>
              {isLive && match.t1s && (
                <p className="text-xs text-gray-600 mt-0.5">{match.t1s}</p>
              )}
            </div>
            <div className="px-3">
              <span className="text-xs font-bold text-gray-400">VS</span>
            </div>
            <div className="flex-1 text-right">
              <p className="font-semibold text-gray-900 text-sm">{match.t2}</p>
              {isLive && match.t2s && (
                <p className="text-xs text-gray-600 mt-0.5">{match.t2s}</p>
              )}
            </div>
          </div>
          
          {!isLive && (
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                <span>{formatDateIST(match.dateTimeGMT)}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{formatTimeIST(match.dateTimeGMT)} IST</span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

// Quick Action Button Component
function QuickAction({ icon: Icon, label, href, color = "gray" }: { icon: any; label: string; href: string; color?: string }) {
  const colorClasses: Record<string, string> = {
    emerald: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100",
    blue: "bg-blue-50 text-blue-600 hover:bg-blue-100",
    purple: "bg-purple-50 text-purple-600 hover:bg-purple-100",
    amber: "bg-amber-50 text-amber-600 hover:bg-amber-100",
    gray: "bg-gray-50 text-gray-600 hover:bg-gray-100",
  };

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-colors ${colorClasses[color]}`}
      >
        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
        <span className="font-medium">{label}</span>
        <ChevronRight className="h-4 w-4 ml-auto opacity-50" />
      </motion.div>
    </Link>
  );
}

// Activity Item Component
function ActivityItem({ icon: Icon, title, description, time, color = "gray" }: { 
  icon: any; 
  title: string; 
  description: string; 
  time: string;
  color?: string;
}) {
  const colorClasses: Record<string, string> = {
    emerald: "bg-emerald-100 text-emerald-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    amber: "bg-amber-100 text-amber-600",
    gray: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-gray-900">{title}</p>
        <p className="text-xs text-gray-500 truncate">{description}</p>
      </div>
      <span className="text-xs text-gray-400 whitespace-nowrap">{time}</span>
    </div>
  );
}

export default function Dashboard() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [loading, isAuthenticated, setLocation]);

  const { data: recentTeams, isLoading: teamsLoading } = trpc.teams.getMyTeams.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  // User stats - calculate from teams data
  const statsLoading = teamsLoading;
  const userStats = {
    totalTeams: recentTeams?.length || 0,
    contestsJoined: recentTeams?.length || 0,
    totalPoints: 0,
    bestRank: null as number | null,
    winRate: 0,
    streak: 0,
  };

  // Use getLiveAndUpcoming for matches
  const { data: matchData, isLoading: matchesLoading } = trpc.matches.getLiveAndUpcoming.useQuery(
    undefined,
    {
      refetchInterval: 30000,
      enabled: isAuthenticated,
    }
  );

  const liveMatches = matchData?.live || [];
  const todayMatches = matchData?.today || [];
  const tomorrowMatches = matchData?.tomorrow || [];
  const allUpcoming = [...liveMatches, ...todayMatches, ...tomorrowMatches];

  // Get greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container py-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-500 font-medium">Loading your dashboard...</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Hero Welcome Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500">
          <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
          <div className="container py-8 md:py-12 relative">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-yellow-300" />
                  <span className="text-emerald-100 text-sm font-medium">{getGreeting()}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Welcome back, {user?.name?.split(' ')[0] || "Champion"}!
                </h1>
                <p className="text-emerald-100 text-lg">
                  Ready to dominate the fantasy cricket arena?
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-3"
              >
                <Link href="/fantasy-cricket">
                  <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 shadow-lg">
                    <Play className="mr-2 h-5 w-5" />
                    Play Now
                  </Button>
                </Link>
                <Link href="/my-teams">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <Trophy className="mr-2 h-5 w-5" />
                    My Teams
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Live Match Alert */}
            <AnimatePresence>
              {liveMatches.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
                        <Radio className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold">{liveMatches.length} Live Match{liveMatches.length > 1 ? 'es' : ''} Now!</p>
                        <p className="text-emerald-100 text-sm">{liveMatches[0].t1} vs {liveMatches[0].t2}</p>
                      </div>
                      <Link href={`/match/${liveMatches[0].id}`}>
                        <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                          Watch Live
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 -mt-6 relative z-10">
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {statsLoading ? (
                <>
                  {[...Array(4)].map((_, i) => (
                    <Card key={i} className="border-0">
                      <CardContent className="p-6">
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-8 w-16" />
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : (
                <>
                  <StatCard
                    title="Teams Created"
                    value={userStats.totalTeams}
                    icon={Users}
                    description="Total fantasy teams"
                    color="emerald"
                  />
                  <StatCard
                    title="Matches Played"
                    value={userStats.contestsJoined}
                    icon={Trophy}
                    description="All time"
                    color="blue"
                  />
                  <StatCard
                    title="Total Points"
                    value={userStats.totalPoints.toLocaleString()}
                    icon={Target}
                    description="Fantasy points"
                    color="purple"
                  />
                  <StatCard
                    title="Best Rank"
                    value={userStats.bestRank ? `#${userStats.bestRank}` : "-"}
                    icon={Medal}
                    description="In any contest"
                    color="amber"
                  />
                </>
              )}
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="py-6">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Matches & Teams */}
              <div className="lg:col-span-2 space-y-6">
                {/* Upcoming Matches */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Upcoming Matches</CardTitle>
                          <CardDescription>Create teams and compete</CardDescription>
                        </div>
                      </div>
                      <Link href="/fantasy-cricket">
                        <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700">
                          View All <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {matchesLoading ? (
                      <div className="space-y-3">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="p-4 rounded-xl bg-gray-50">
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        ))}
                      </div>
                    ) : allUpcoming.length > 0 ? (
                      <div className="space-y-3">
                        {allUpcoming.slice(0, 5).map((match: any, index: number) => (
                          <MatchCard key={match.id || index} match={match} index={index} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 mb-4">No upcoming matches</p>
                        <Link href="/fantasy-cricket">
                          <Button variant="outline">Browse All Matches</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* My Teams */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                          <Trophy className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">My Teams</CardTitle>
                          <CardDescription>Your fantasy cricket teams</CardDescription>
                        </div>
                      </div>
                      <Link href="/my-teams">
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                          View All <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {teamsLoading ? (
                      <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="flex-1">
                              <Skeleton className="h-4 w-48 mb-2" />
                              <Skeleton className="h-3 w-32" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : recentTeams && recentTeams.length > 0 ? (
                      <div className="space-y-3">
                        {recentTeams.slice(0, 4).map((team: any, index: number) => (
                          <motion.div
                            key={team.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all"
                          >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-sm">
                              <Trophy className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900 truncate">{team.name}</p>
                              <p className="text-sm text-gray-500 truncate">
                                {team.matchName || "Fantasy Match"}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg text-gray-900">{team.points || 0}</p>
                              <p className="text-xs text-gray-500">points</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                          <Users className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 mb-4">No teams created yet</p>
                        <Link href="/fantasy-cricket">
                          <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                            <Zap className="mr-2 h-4 w-4" />
                            Create Your First Team
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Quick Actions & Activity */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <QuickAction icon={Play} label="Play Fantasy Cricket" href="/fantasy-cricket" color="emerald" />
                    <QuickAction icon={Trophy} label="View My Teams" href="/my-teams" color="blue" />
                    <QuickAction icon={User} label="Edit Profile" href="/profile" color="purple" />
                    <QuickAction icon={HelpCircle} label="How to Play" href="/how-to-play" color="amber" />
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-lg">Recent Activity</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {recentTeams && recentTeams.length > 0 ? (
                      <div className="space-y-1">
                        {recentTeams.slice(0, 4).map((team: any, index: number) => (
                          <ActivityItem
                            key={team.id}
                            icon={Trophy}
                            title="Team Created"
                            description={team.name}
                            time="Recently"
                            color={index === 0 ? "emerald" : "gray"}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <Activity className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">No recent activity</p>
                        <p className="text-xs text-gray-400 mt-1">Start playing to see your activity here</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Pro Tips */}
                <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-teal-50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                        <Star className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Pro Tip</h3>
                        <p className="text-sm text-gray-600">
                          Select your Captain wisely! They earn 2x points. Pick a player who's in great form and has a good track record.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Account Section */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{user?.name || "User"}</p>
                        <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                      <Link href="/profile" className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <Settings className="h-4 w-4 mr-1" />
                          Settings
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => logout()}
                      >
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
