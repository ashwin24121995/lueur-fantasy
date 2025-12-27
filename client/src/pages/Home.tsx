import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { 
  Trophy, 
  Users, 
  Target, 
  Shield, 
  ArrowRight, 
  Calendar,
  MapPin,
  Clock
} from "lucide-react";

function MatchCard({ match }: { match: any }) {
  const matchDate = new Date(match.dateTimeGMT || match.date);
  const isLive = match.matchStarted && !match.matchEnded;
  const isUpcoming = !match.matchStarted && !match.matchEnded;

  return (
    <Card className="lueur-card-hover overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge 
            className={isLive ? "status-live" : isUpcoming ? "status-upcoming" : "status-completed"}
          >
            {isLive ? "LIVE" : isUpcoming ? "Upcoming" : "Completed"}
          </Badge>
          <span className="text-xs text-muted-foreground">{match.matchType?.toUpperCase()}</span>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold text-sm mb-3 line-clamp-2">{match.name}</h3>
        
        {match.teams && match.teams.length >= 2 && (
          <div className="flex items-center justify-between mb-3">
            <div className="text-center flex-1">
              <p className="font-medium text-sm">{match.teams[0]}</p>
              {match.score?.[0] && (
                <p className="text-xs text-muted-foreground">
                  {match.score[0].r}/{match.score[0].w} ({match.score[0].o})
                </p>
              )}
            </div>
            <span className="text-muted-foreground text-xs px-2">vs</span>
            <div className="text-center flex-1">
              <p className="font-medium text-sm">{match.teams[1]}</p>
              {match.score?.[1] && (
                <p className="text-xs text-muted-foreground">
                  {match.score[1].r}/{match.score[1].w} ({match.score[1].o})
                </p>
              )}
            </div>
          </div>
        )}

        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{matchDate.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          {match.venue && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{match.venue}</span>
            </div>
          )}
        </div>

        {match.fantasyEnabled && isUpcoming && (
          <Link href={`/fantasy-cricket?match=${match.id}`}>
            <Button className="w-full mt-4 lueur-gradient" size="sm">
              Create Team <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
        {isLive && (
          <Link href={`/match/${match.id}`}>
            <Button variant="outline" className="w-full mt-4" size="sm">
              View Live Score
            </Button>
          </Link>
        )}
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
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-8 w-24" />
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
  const { data: matchesData, isLoading } = trpc.matches.getAll.useQuery();

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
      {matchesData?.live && matchesData.live.length > 0 && (
        <section className="py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Live Matches</h2>
                <p className="text-muted-foreground">Watch the action unfold in real-time</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchesData.live.slice(0, 3).map((match: any) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Matches Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Upcoming Matches</h2>
              <p className="text-muted-foreground">Create your fantasy team before the match starts</p>
            </div>
            <Link href="/fantasy-cricket">
              <Button variant="outline">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <>
                <MatchCardSkeleton />
                <MatchCardSkeleton />
                <MatchCardSkeleton />
              </>
            ) : matchesData?.upcoming && matchesData.upcoming.length > 0 ? (
              matchesData.upcoming.slice(0, 6).map((match: any) => (
                <MatchCard key={match.id} match={match} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No upcoming matches at the moment.</p>
                <p className="text-sm text-muted-foreground mt-2">Check back later for new matches!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <Card className="lueur-gradient text-white overflow-hidden">
            <CardContent className="py-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Play?</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Join thousands of cricket fans and start building your dream team today. 
                It's completely free!
              </p>
              {isAuthenticated ? (
                <Link href="/fantasy-cricket">
                  <Button size="lg" variant="secondary">
                    Browse Matches <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Link href="/register">
                  <Button size="lg" variant="secondary">
                    Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
