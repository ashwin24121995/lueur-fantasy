import { useEffect } from "react";
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
  Star,
  Shield
} from "lucide-react";

export default function MyTeams() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [authLoading, isAuthenticated, setLocation]);

  const { data: teams, isLoading } = trpc.teams.getMyTeams.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  if (authLoading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
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
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 lueur-gradient opacity-10" />
        <div className="container py-8 relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">My Teams</h1>
              <p className="text-muted-foreground">
                View and manage your fantasy cricket teams
              </p>
            </div>
            <Link href="/fantasy-cricket">
              <Button className="lueur-gradient">
                Create New Team <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Teams List */}
      <section className="py-8">
        <div className="container">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full mb-4" />
                    <Skeleton className="h-9 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : teams && teams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team: any) => (
                <Card key={team.id} className="lueur-card-hover">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {team.teamName || `Team #${team.id}`}
                        </CardTitle>
                        <CardDescription>
                          Match ID: {team.matchId}
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={team.status === "submitted" ? "default" : "outline"}
                        className={team.status === "submitted" ? "lueur-gradient text-white" : ""}
                      >
                        {team.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>11 Players Selected</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>Captain: {team.captainPlayerId?.slice(0, 8) || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Shield className="h-4 w-4 text-blue-500" />
                        <span>VC: {team.viceCaptainPlayerId?.slice(0, 8) || "N/A"}</span>
                      </div>
                      {team.totalPoints !== null && team.totalPoints !== undefined && (
                        <div className="flex items-center gap-2 text-sm">
                          <Trophy className="h-4 w-4 text-primary" />
                          <span className="font-semibold">{team.totalPoints} Points</span>
                        </div>
                      )}
                      {team.rank && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground">Rank:</span>
                          <Badge variant="outline">#{team.rank}</Badge>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span>Created: {new Date(team.createdAt).toLocaleDateString()}</span>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/team/${team.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-16 text-center">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">No Teams Yet</h2>
                <p className="text-muted-foreground mb-6">
                  You haven't created any fantasy teams yet. Start by selecting a match and building your dream team!
                </p>
                <Link href="/fantasy-cricket">
                  <Button className="lueur-gradient">
                    Browse Matches <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </Layout>
  );
}
