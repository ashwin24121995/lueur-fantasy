import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { 
  Trophy, 
  Users, 
  Target, 
  Shield, 
  ArrowRight, 
  Calendar,
  Clock,
  RefreshCw,
  Zap,
  Radio,
  Loader2
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

// Live Match Card with real-time scores
function LiveMatchCard({ match }: { match: CricScoreMatch }) {
  return (
    <Card className="lueur-card-hover overflow-hidden border-2 border-red-500/50 relative">
      {/* Live pulse indicator */}
      <div className="absolute top-3 right-3">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </div>
      
      <CardHeader className="pb-2 bg-red-50">
        <div className="flex items-center gap-2">
          <Badge className="status-live flex items-center gap-1 bg-red-500 text-white">
            <Radio className="h-3 w-3" />
            LIVE
          </Badge>
          <span className="text-xs text-muted-foreground">{match.matchType?.toUpperCase()}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{match.series}</p>
        
        {/* Teams with Live Scores */}
        <div className="space-y-3 mb-4">
          {/* Team 1 */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              {match.t1img && (
                <img 
                  src={match.t1img} 
                  alt={match.t1} 
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              )}
              <span className="font-medium text-sm truncate max-w-[120px]">{match.t1}</span>
            </div>
            <span className="font-bold text-lg text-primary">{match.t1s || "-"}</span>
          </div>
          
          {/* Team 2 */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              {match.t2img && (
                <img 
                  src={match.t2img} 
                  alt={match.t2} 
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              )}
              <span className="font-medium text-sm truncate max-w-[120px]">{match.t2}</span>
            </div>
            <span className="font-bold text-lg text-primary">{match.t2s || "-"}</span>
          </div>
        </div>

        {/* Match Status */}
        {match.status && (
          <div className="p-2 bg-primary/10 rounded-lg mb-4">
            <p className="text-xs text-center font-medium text-primary line-clamp-2">{match.status}</p>
          </div>
        )}

        <Link href={`/match/${match.id}`}>
          <Button variant="outline" className="w-full border-red-500 text-red-600 hover:bg-red-50" size="sm">
            <Zap className="mr-2 h-4 w-4" />
            View Live Score
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

// Upcoming Match Card
function UpcomingMatchCard({ match, label }: { match: CricScoreMatch; label?: string }) {
  const matchDate = new Date(match.dateTimeGMT);
  const now = new Date();
  const isToday = matchDate.toDateString() === now.toDateString();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const isTomorrow = matchDate.toDateString() === tomorrow.toDateString();

  // Calculate time until match
  const timeDiff = matchDate.getTime() - now.getTime();
  const hoursUntil = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutesUntil = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  const displayLabel = label || (isToday ? "Today" : isTomorrow ? "Tomorrow" : "Upcoming");

  return (
    <Card className="lueur-card-hover overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge className={isToday ? "bg-green-100 text-green-800" : isTomorrow ? "bg-blue-100 text-blue-800" : "status-upcoming"}>
            {displayLabel}
          </Badge>
          <span className="text-xs text-muted-foreground">{match.matchType?.toUpperCase()}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{match.series}</p>
        
        {/* Teams */}
        <div className="flex items-center justify-between mb-4 py-2">
          <div className="text-center flex-1">
            <div className="flex flex-col items-center gap-1">
              {match.t1img && (
                <img 
                  src={match.t1img} 
                  alt={match.t1} 
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              )}
              <p className="font-medium text-sm truncate max-w-[100px]">{match.t1}</p>
            </div>
          </div>
          <div className="px-3">
            <span className="text-muted-foreground text-lg font-bold">VS</span>
          </div>
          <div className="text-center flex-1">
            <div className="flex flex-col items-center gap-1">
              {match.t2img && (
                <img 
                  src={match.t2img} 
                  alt={match.t2} 
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              )}
              <p className="font-medium text-sm truncate max-w-[100px]">{match.t2}</p>
            </div>
          </div>
        </div>

        {/* Time Until Match */}
        {timeDiff > 0 && (
          <div className="p-2 bg-muted/50 rounded-lg mb-3 text-center">
            <p className="text-xs text-muted-foreground">Starts in</p>
            <p className="font-bold text-primary">
              {hoursUntil > 24 
                ? `${Math.floor(hoursUntil / 24)}d ${hoursUntil % 24}h` 
                : hoursUntil > 0 
                  ? `${hoursUntil}h ${minutesUntil}m` 
                  : `${minutesUntil} minutes`}
            </p>
          </div>
        )}

        <div className="space-y-1 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{matchDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{matchDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} IST</span>
          </div>
        </div>

        <Link href={`/create-team/${match.id}`}>
          <Button className="w-full lueur-gradient" size="sm">
            Create Team <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

function MatchCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-5 w-20" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-3" />
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-12 w-24" />
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-12 w-24" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-28" />
        </div>
        <Skeleton className="h-9 w-full mt-4" />
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [lastRefresh, setLastRefresh] = useState(new Date());
  
  // Fetch matches using the new getLiveAndUpcoming endpoint with 5-second auto-refresh
  const { data: matchesData, isLoading, isFetching } = trpc.matches.getLiveAndUpcoming.useQuery(undefined, {
    refetchInterval: 5000, // Auto-refresh every 5 seconds
    refetchIntervalInBackground: true,
    staleTime: 4000,
  });

  // Update last refresh time when data changes
  useEffect(() => {
    if (matchesData) {
      setLastRefresh(new Date());
    }
  }, [matchesData]);

  const liveMatches = matchesData?.live || [];
  const todayMatches = matchesData?.today || [];
  const tomorrowMatches = matchesData?.tomorrow || [];

  const features = [
    {
      icon: Trophy,
      title: "Free to Play",
      description: "Enjoy fantasy cricket without any cost. No real money involved.",
    },
    {
      icon: Users,
      title: "Compete with Friends",
      description: "Create private contests and challenge your friends.",
    },
    {
      icon: Target,
      title: "Real-Time Updates",
      description: "Live scores and instant point updates during matches.",
    },
    {
      icon: Shield,
      title: "Fair Play",
      description: "Transparent scoring system based on official cricket data.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 lueur-gradient opacity-10" />
        <div className="container py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 lueur-gradient text-white">Free to Play Fantasy Cricket</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Welcome to{" "}
              <span className="lueur-text-gradient">LUEUR</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              India's premier free-to-play fantasy cricket platform. 
              Build your dream team, compete in contests, and showcase your cricket knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link href="/fantasy-cricket">
                  <Button size="lg" className="lueur-gradient text-white">
                    Play Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/register">
                    <Button size="lg" className="lueur-gradient text-white">
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/how-to-play">
                    <Button size="lg" variant="outline">
                      Learn How to Play
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose LUEUR?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience fantasy cricket like never before with our feature-rich platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center lueur-card-hover">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full lueur-gradient mx-auto mb-4 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Matches Section */}
      <section className="py-16 bg-gradient-to-b from-red-50 to-white">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold">Live Matches</h2>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              </div>
              <p className="text-muted-foreground">Real-time scores • Auto-refreshes every 5 seconds</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {isFetching && <Loader2 className="h-3 w-3 animate-spin" />}
              <RefreshCw className={`h-3 w-3 ${isFetching ? 'animate-spin' : ''}`} />
              <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <MatchCardSkeleton key={i} />
              ))}
            </div>
          ) : liveMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {liveMatches.map((match) => (
                <LiveMatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <Card className="bg-muted/30">
              <CardContent className="py-12 text-center">
                <Radio className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Live Matches</h3>
                <p className="text-muted-foreground">
                  There are no matches currently in progress. Check back soon!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Today's Matches Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Today's Matches</h2>
              <p className="text-muted-foreground">Create your fantasy team before the match starts</p>
            </div>
            <Link href="/fantasy-cricket">
              <Button variant="outline">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <MatchCardSkeleton key={i} />
              ))}
            </div>
          ) : todayMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {todayMatches.map((match) => (
                <UpcomingMatchCard key={match.id} match={match} label="Today" />
              ))}
            </div>
          ) : (
            <Card className="bg-muted/30">
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Matches Today</h3>
                <p className="text-muted-foreground">
                  There are no matches scheduled for today. Check tomorrow's matches below!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Tomorrow's Matches Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Tomorrow's Matches</h2>
              <p className="text-muted-foreground">Plan ahead and prepare your teams</p>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <MatchCardSkeleton key={i} />
              ))}
            </div>
          ) : tomorrowMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tomorrowMatches.map((match) => (
                <UpcomingMatchCard key={match.id} match={match} label="Tomorrow" />
              ))}
            </div>
          ) : (
            <Card className="bg-background">
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Matches Tomorrow</h3>
                <p className="text-muted-foreground">
                  No matches are scheduled for tomorrow yet. Check back later for updates!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lueur-gradient text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Play?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of cricket fans on LUEUR. Create your account now and start 
            building your dream fantasy cricket team!
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary">
              Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
