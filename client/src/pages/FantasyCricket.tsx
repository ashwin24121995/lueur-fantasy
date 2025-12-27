import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Trophy,
  Users,
  Loader2
} from "lucide-react";

function MatchCard({ match, showCreateTeam = true }: { match: any; showCreateTeam?: boolean }) {
  const matchDate = new Date(match.dateTimeGMT || match.date);
  const isLive = match.matchStarted && !match.matchEnded;
  const isUpcoming = !match.matchStarted && !match.matchEnded;
  const isCompleted = match.matchEnded;

  return (
    <Card className="lueur-card-hover overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge 
            className={isLive ? "status-live" : isUpcoming ? "status-upcoming" : "status-completed"}
          >
            {isLive ? "LIVE" : isUpcoming ? "Upcoming" : "Completed"}
          </Badge>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{match.matchType?.toUpperCase()}</span>
            {match.fantasyEnabled && (
              <Badge variant="outline" className="text-xs border-primary text-primary">
                Fantasy
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold text-sm mb-1">{match.name}</h3>
        {match.series && (
          <p className="text-xs text-muted-foreground mb-3">{match.series}</p>
        )}
        
        {/* Teams */}
        {match.teams && match.teams.length >= 2 && (
          <div className="flex items-center justify-between mb-4 py-3 px-4 bg-muted/50 rounded-lg">
            <div className="text-center flex-1">
              <p className="font-semibold text-sm">{match.teamInfo?.[0]?.shortname || match.teams[0]}</p>
              {match.score?.[0] && (
                <p className="text-xs text-muted-foreground mt-1">
                  {match.score[0].r}/{match.score[0].w} ({match.score[0].o})
                </p>
              )}
            </div>
            <div className="px-4">
              <span className="text-muted-foreground text-lg font-bold">VS</span>
            </div>
            <div className="text-center flex-1">
              <p className="font-semibold text-sm">{match.teamInfo?.[1]?.shortname || match.teams[1]}</p>
              {match.score?.[1] && (
                <p className="text-xs text-muted-foreground mt-1">
                  {match.score[1].r}/{match.score[1].w} ({match.score[1].o})
                </p>
              )}
            </div>
          </div>
        )}

        {/* Match Status for completed */}
        {isCompleted && match.status && (
          <p className="text-sm text-primary font-medium mb-3 text-center">
            {match.status}
          </p>
        )}

        {/* Match Info */}
        <div className="space-y-1 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            <span>{matchDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span>{matchDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} IST</span>
          </div>
          {match.venue && (
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{match.venue}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {showCreateTeam && match.fantasyEnabled && isUpcoming && (
          <Link href={`/create-team/${match.id}`}>
            <Button className="w-full lueur-gradient" size="sm">
              Create Team <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
        {isLive && (
          <Link href={`/match/${match.id}`}>
            <Button variant="outline" className="w-full" size="sm">
              View Live Score
            </Button>
          </Link>
        )}
        {isCompleted && (
          <Link href={`/match/${match.id}/results`}>
            <Button variant="outline" className="w-full" size="sm">
              View Results
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
        <div className="flex justify-between">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-16" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-3 w-3/4 mb-4" />
        <div className="flex items-center justify-between mb-4 py-3 px-4 bg-muted/50 rounded-lg">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-6 w-8" />
          <Skeleton className="h-8 w-20" />
        </div>
        <div className="space-y-2 mb-4">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
        <Skeleton className="h-9 w-full" />
      </CardContent>
    </Card>
  );
}

export default function FantasyCricket() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const { data: matchesData, isLoading, error } = trpc.matches.getAll.useQuery();

  const upcomingMatches = matchesData?.upcoming || [];
  const liveMatches = matchesData?.live || [];
  const completedMatches = matchesData?.completed || [];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 lueur-gradient opacity-10" />
        <div className="container py-12 relative">
          <div className="max-w-3xl">
            <Badge className="mb-4 lueur-gradient text-white">Fantasy Cricket</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Build Your Dream Team
            </h1>
            <p className="text-muted-foreground mb-6">
              Select a match, create your fantasy team, and compete with other cricket fans. 
              All contests are free to join!
            </p>
            {!isAuthenticated && (
              <Link href="/register">
                <Button className="lueur-gradient">
                  Register to Play <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Matches Section */}
      <section className="py-8">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="upcoming" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Upcoming
                  {upcomingMatches.length > 0 && (
                    <Badge variant="secondary" className="ml-1">{upcomingMatches.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="live" className="gap-2">
                  <Trophy className="h-4 w-4" />
                  Live
                  {liveMatches.length > 0 && (
                    <Badge className="ml-1 status-live">{liveMatches.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="completed" className="gap-2">
                  <Users className="h-4 w-4" />
                  Completed
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Upcoming Matches */}
            <TabsContent value="upcoming">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <MatchCardSkeleton key={i} />
                  ))}
                </div>
              ) : error ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">Failed to load matches. Please try again later.</p>
                    <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                      Retry
                    </Button>
                  </CardContent>
                </Card>
              ) : upcomingMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingMatches.map((match: any) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Upcoming Matches</h3>
                    <p className="text-muted-foreground">
                      There are no upcoming fantasy-enabled matches at the moment. 
                      Check back later!
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Live Matches */}
            <TabsContent value="live">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <MatchCardSkeleton key={i} />
                  ))}
                </div>
              ) : liveMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {liveMatches.map((match: any) => (
                    <MatchCard key={match.id} match={match} showCreateTeam={false} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Live Matches</h3>
                    <p className="text-muted-foreground">
                      There are no live matches right now. Check the upcoming matches to create your team!
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Completed Matches */}
            <TabsContent value="completed">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <MatchCardSkeleton key={i} />
                  ))}
                </div>
              ) : completedMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedMatches.slice(0, 12).map((match: any) => (
                    <MatchCard key={match.id} match={match} showCreateTeam={false} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Completed Matches</h3>
                    <p className="text-muted-foreground">
                      Recently completed matches will appear here.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4">
                <div className="w-12 h-12 rounded-full lueur-gradient mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Select Match</h3>
                <p className="text-sm text-muted-foreground">Choose from upcoming fantasy-enabled matches</p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 rounded-full lueur-gradient mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Build Team</h3>
                <p className="text-sm text-muted-foreground">Pick 11 players and choose your captain</p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 rounded-full lueur-gradient mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Compete</h3>
                <p className="text-sm text-muted-foreground">Join free contests and climb the leaderboard</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
