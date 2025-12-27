import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Trophy,
  Users,
  Radio,
  Target,
  Sparkles,
  RefreshCw,
} from "lucide-react";

// CricScore match type from API
interface CricScoreMatch {
  id: string;
  dateTimeGMT: string;
  matchType: string;
  status: string;
  ms: string;
  t1: string;
  t2: string;
  t1s: string;
  t2s: string;
  t1img: string;
  t2img: string;
  series: string;
}

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
    weekday: "short",
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

// Live Match Card Component
function LiveMatchCard({ match }: { match: CricScoreMatch }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-red-500 to-red-700 text-white h-full">
        <CardContent className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Badge className="bg-white/20 text-white border-0 animate-pulse">
              <Radio className="w-3 h-3 mr-1" />
              LIVE
            </Badge>
            <span className="text-xs opacity-80">{match.matchType?.toUpperCase()}</span>
          </div>

          {/* Series */}
          <p className="text-xs opacity-70 mb-3 truncate">{match.series}</p>

          {/* Teams */}
          <div className="space-y-3">
            {/* Team 1 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {match.t1img ? (
                  <img src={match.t1img} alt={match.t1} className="w-8 h-8 rounded-full bg-white/20 object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                    {match.t1?.substring(0, 2)}
                  </div>
                )}
                <span className="font-semibold text-sm">{match.t1}</span>
              </div>
              <span className="font-bold text-lg">{match.t1s || "-"}</span>
            </div>

            {/* Team 2 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {match.t2img ? (
                  <img src={match.t2img} alt={match.t2} className="w-8 h-8 rounded-full bg-white/20 object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                    {match.t2?.substring(0, 2)}
                  </div>
                )}
                <span className="font-semibold text-sm">{match.t2}</span>
              </div>
              <span className="font-bold text-lg">{match.t2s || "-"}</span>
            </div>
          </div>

          {/* Status */}
          <div className="mt-4 pt-3 border-t border-white/20">
            <p className="text-xs text-center opacity-80">{match.status}</p>
          </div>

          {/* View Button */}
          <Link href={`/match/${match.id}`}>
            <Button className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white border-0">
              View Live Score
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Upcoming Match Card Component
function UpcomingMatchCard({ match }: { match: CricScoreMatch }) {
  const timeUntil = getTimeUntil(match.dateTimeGMT);
  const isStartingSoon = timeUntil !== "Started" && !timeUntil.includes("d");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all h-full bg-white">
        <CardContent className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <Badge variant="outline" className="text-emerald-600 border-emerald-600">
              {match.matchType?.toUpperCase()}
            </Badge>
            {isStartingSoon && (
              <Badge className="bg-orange-500 text-white border-0 text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {timeUntil}
              </Badge>
            )}
          </div>

          {/* Series */}
          <p className="text-xs text-gray-500 mb-4 truncate">{match.series}</p>

          {/* Teams */}
          <div className="flex items-center justify-between py-4 px-3 bg-gray-50 rounded-xl mb-4">
            <div className="flex flex-col items-center flex-1">
              {match.t1img ? (
                <img src={match.t1img} alt={match.t1} className="w-12 h-12 rounded-full bg-gray-200 object-cover mb-2" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold mb-2">
                  {match.t1?.substring(0, 2)}
                </div>
              )}
              <span className="font-semibold text-sm text-center">{match.t1}</span>
            </div>

            <div className="px-4">
              <span className="text-gray-400 font-bold text-lg">VS</span>
            </div>

            <div className="flex flex-col items-center flex-1">
              {match.t2img ? (
                <img src={match.t2img} alt={match.t2} className="w-12 h-12 rounded-full bg-gray-200 object-cover mb-2" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold mb-2">
                  {match.t2?.substring(0, 2)}
                </div>
              )}
              <span className="font-semibold text-sm text-center">{match.t2}</span>
            </div>
          </div>

          {/* Match Info */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDateIST(match.dateTimeGMT)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{formatTimeIST(match.dateTimeGMT)} IST</span>
            </div>
          </div>

          {/* Countdown */}
          {timeUntil !== "Started" && (
            <div className="text-center mb-4">
              <span className="text-xs text-gray-500">Starts in </span>
              <span className="text-sm font-semibold text-emerald-600">{timeUntil}</span>
            </div>
          )}

          {/* Create Team Button */}
          <Link href={`/create-team/${match.id}`}>
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
              Create Team <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Loading Skeleton
function MatchCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="animate-pulse">
          <div className="flex justify-between mb-4">
            <div className="h-5 w-16 bg-gray-200 rounded" />
            <div className="h-5 w-12 bg-gray-200 rounded" />
          </div>
          <div className="h-3 w-32 bg-gray-200 rounded mb-4" />
          <div className="flex items-center justify-between py-4 px-3 bg-gray-50 rounded-xl mb-4">
            <div className="flex flex-col items-center flex-1">
              <div className="w-12 h-12 bg-gray-200 rounded-full mb-2" />
              <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>
            <div className="h-6 w-8 bg-gray-200 rounded" />
            <div className="flex flex-col items-center flex-1">
              <div className="w-12 h-12 bg-gray-200 rounded-full mb-2" />
              <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="h-10 w-full bg-gray-200 rounded" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function FantasyCricket() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("upcoming");
  
  // Use the same API as homepage - getLiveAndUpcoming
  const { data: matchData, isLoading, isFetching } = trpc.matches.getLiveAndUpcoming.useQuery(
    undefined,
    {
      refetchInterval: 5000,
      refetchIntervalInBackground: true,
      staleTime: 4000,
    }
  );

  const liveMatches = matchData?.live || [];
  const todayMatches = matchData?.today || [];
  const tomorrowMatches = matchData?.tomorrow || [];
  const upcomingMatches = [...todayMatches, ...tomorrowMatches];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "url(/images/hero-cricket.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }} />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-white/20 text-white border-0">
              <Sparkles className="w-4 h-4 mr-1" />
              Fantasy Cricket
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Build Your Dream Team
            </h1>
            <p className="text-lg opacity-90 mb-6">
              Select a match, create your fantasy team, and compete with other cricket fans. 
              All contests are 100% free to join!
            </p>
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100">
                  Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Link href="/register">
                <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100">
                  Register to Play <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: 1, icon: Target, title: "Select Match", desc: "Choose from upcoming fantasy-enabled matches" },
              { step: 2, icon: Users, title: "Build Team", desc: "Pick 11 players and choose your captain" },
              { step: 3, icon: Trophy, title: "Compete", desc: "Join free contests and climb the leaderboard" },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4 relative">
                  <item.icon className="w-8 h-8 text-emerald-600" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 text-white text-sm font-bold flex items-center justify-center">
                    {item.step}
                  </div>
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Matches Section */}
      <section className="py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Available Matches</h2>
            {isFetching && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Updating...
              </div>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming" className="gap-2">
                <Calendar className="h-4 w-4" />
                Upcoming
                {upcomingMatches.length > 0 && (
                  <Badge variant="secondary" className="ml-1">{upcomingMatches.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="live" className="gap-2">
                <Radio className="h-4 w-4" />
                Live
                {liveMatches.length > 0 && (
                  <Badge className="ml-1 bg-red-500 text-white">{liveMatches.length}</Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Upcoming Matches */}
            <TabsContent value="upcoming">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <MatchCardSkeleton key={i} />
                  ))}
                </div>
              ) : upcomingMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {upcomingMatches.map((match: CricScoreMatch, index: number) => (
                    <UpcomingMatchCard key={match.id || index} match={match} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-16 text-center">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Upcoming Matches</h3>
                    <p className="text-gray-500">
                      There are no upcoming matches at the moment. Check back later!
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Live Matches */}
            <TabsContent value="live">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <MatchCardSkeleton key={i} />
                  ))}
                </div>
              ) : liveMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {liveMatches.map((match: CricScoreMatch, index: number) => (
                    <LiveMatchCard key={match.id || index} match={match} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-16 text-center">
                    <Radio className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Live Matches</h3>
                    <p className="text-gray-500">
                      There are no live matches right now. Check the upcoming matches to create your team!
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Test Your Cricket Knowledge?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of cricket fans on LUEUR and experience the thrill of fantasy cricket. It's 100% free!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link href="/fantasy-cricket">
                <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100">
                  Browse Matches
                </Button>
              </Link>
            ) : (
              <Link href="/register">
                <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100">
                  Create Free Account
                </Button>
              </Link>
            )}
            <Link href="/how-to-play">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn How to Play
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
