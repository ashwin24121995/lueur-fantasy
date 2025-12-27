import { useAuth } from "@/_core/hooks/useAuth";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc";
import { Link, useLocation } from "wouter";
import { 
  Trophy, 
  Users, 
  Calendar, 
  ArrowRight, 
  User,
  Target,
  TrendingUp,
  Clock
} from "lucide-react";
import { useEffect } from "react";

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  description 
}: { 
  title: string; 
  value: string | number; 
  icon: any; 
  description?: string;
}) {
  return (
    <Card className="lueur-card-hover">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <div className="w-10 h-10 rounded-full lueur-gradient flex items-center justify-center">
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();

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

  // User stats - we'll calculate from teams data
  const statsLoading = teamsLoading;
  const userStats = {
    totalTeams: recentTeams?.length || 0,
    contestsJoined: recentTeams?.length || 0,
    totalPoints: 0,
    bestRank: null as number | null,
  };

  const { data: upcomingMatches, isLoading: matchesLoading } = trpc.matches.getAll.useQuery();

  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading...</p>
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
      {/* Welcome Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 lueur-gradient opacity-10" />
        <div className="container py-8 relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome back, {user?.name || "Player"}!
              </h1>
              <p className="text-muted-foreground">
                Here's your fantasy cricket overview
              </p>
            </div>
            <Link href="/fantasy-cricket">
              <Button className="lueur-gradient">
                Play Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsLoading ? (
              <>
                {[...Array(4)].map((_, i) => (
                  <Card key={i}>
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
                  title="Total Teams"
                  value={userStats?.totalTeams || 0}
                  icon={Users}
                  description="Teams created"
                />
                <StatCard
                  title="Contests Joined"
                  value={userStats?.contestsJoined || 0}
                  icon={Trophy}
                  description="All time"
                />
                <StatCard
                  title="Total Points"
                  value={userStats?.totalPoints?.toLocaleString() || 0}
                  icon={Target}
                  description="Fantasy points earned"
                />
                <StatCard
                  title="Best Rank"
                  value={userStats?.bestRank ? `#${userStats.bestRank}` : "-"}
                  icon={TrendingUp}
                  description="In any contest"
                />
              </>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Teams */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>My Recent Teams</CardTitle>
                    <CardDescription>Your recently created fantasy teams</CardDescription>
                  </div>
                  <Link href="/my-teams">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {teamsLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div className="flex-1">
                            <Skeleton className="h-4 w-48 mb-2" />
                            <Skeleton className="h-3 w-32" />
                          </div>
                          <Skeleton className="h-8 w-20" />
                        </div>
                      ))}
                    </div>
                  ) : recentTeams && recentTeams.length > 0 ? (
                    <div className="space-y-4">
                      {recentTeams.map((team: any) => (
                        <div 
                          key={team.id} 
                          className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className="w-12 h-12 rounded-full lueur-gradient flex items-center justify-center">
                            <Trophy className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{team.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {team.matchName || "Match"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{team.points || 0} pts</p>
                            <Badge variant="outline" className="text-xs">
                              {team.status || "Active"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">No teams created yet</p>
                      <Link href="/fantasy-cricket">
                        <Button className="lueur-gradient">
                          Create Your First Team
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Matches */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Matches
                  </CardTitle>
                  <CardDescription>Create teams for these matches</CardDescription>
                </CardHeader>
                <CardContent>
                  {matchesLoading ? (
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="p-3 rounded-lg bg-muted/50">
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      ))}
                    </div>
                  ) : upcomingMatches?.upcoming && upcomingMatches.upcoming.length > 0 ? (
                    <div className="space-y-3">
                      {upcomingMatches.upcoming.slice(0, 5).map((match: any) => {
                        const matchDate = new Date(match.dateTimeGMT || match.date);
                        return (
                          <Link key={match.id} href={`/create-team/${match.id}`}>
                            <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                              <p className="font-medium text-sm line-clamp-1">{match.name}</p>
                              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>
                                  {matchDate.toLocaleDateString('en-IN', { 
                                    day: 'numeric', 
                                    month: 'short' 
                                  })} at {matchDate.toLocaleTimeString('en-IN', { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </span>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                      <Link href="/fantasy-cricket">
                        <Button variant="outline" className="w-full mt-2" size="sm">
                          View All Matches
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No upcoming matches</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/profile">
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      My Profile
                    </Button>
                  </Link>
                  <Link href="/my-teams">
                    <Button variant="ghost" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      My Teams
                    </Button>
                  </Link>
                  <Link href="/how-to-play">
                    <Button variant="ghost" className="w-full justify-start">
                      <Target className="mr-2 h-4 w-4" />
                      How to Play
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
