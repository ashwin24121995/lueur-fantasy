import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { useParams, useLocation, Link } from "wouter";
import { 
  ArrowLeft,
  Trophy,
  Target,
  Calendar,
  Clock,
  MapPin,
  RefreshCw
} from "lucide-react";

export default function MatchResults() {
  const { matchId } = useParams<{ matchId: string }>();
  const [, setLocation] = useLocation();

  // Fetch match details
  const { data: matchData, isLoading: matchLoading, refetch: refetchMatch } = trpc.matches.getById.useQuery(
    { matchId: matchId || "" },
    { enabled: !!matchId, refetchInterval: 30000 } // Refetch every 30 seconds for live matches
  );

  // Fetch scorecard
  const { data: scorecardData, isLoading: scorecardLoading, refetch: refetchScorecard } = trpc.matches.getScorecard.useQuery(
    { matchId: matchId || "" },
    { enabled: !!matchId, refetchInterval: 30000 }
  );

  // Fetch fantasy points
  const { data: pointsData, isLoading: pointsLoading } = trpc.matches.getPoints.useQuery(
    { matchId: matchId || "" },
    { enabled: !!matchId }
  );

  const handleRefresh = () => {
    refetchMatch();
    refetchScorecard();
  };

  const isLive = matchData?.matchStarted && !matchData?.matchEnded;
  const isCompleted = matchData?.matchEnded;

  if (matchLoading) {
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

  if (!matchData) {
    return (
      <Layout>
        <div className="container py-8">
          <Card>
            <CardContent className="py-16 text-center">
              <h2 className="text-xl font-bold mb-2">Match Not Found</h2>
              <p className="text-muted-foreground mb-4">
                The match you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => setLocation("/fantasy-cricket")}>
                Back to Matches
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="bg-muted/30 border-b">
        <div className="container py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setLocation("/fantasy-cricket")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold line-clamp-1">{matchData.name}</h1>
                {isLive && <Badge className="status-live">LIVE</Badge>}
                {isCompleted && <Badge className="status-completed">Completed</Badge>}
              </div>
              <p className="text-sm text-muted-foreground">{matchData.matchType?.toUpperCase()}</p>
            </div>
            {isLive && (
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-1" /> Refresh
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Match Info */}
      <section className="py-6">
        <div className="container">
          <Card className="mb-6">
            <CardContent className="p-6">
              {/* Teams and Score */}
              {matchData.teams && matchData.teams.length >= 2 && (
                <div className="flex items-center justify-between mb-6">
                  <div className="text-center flex-1">
                    <p className="font-bold text-lg">{matchData.teamInfo?.[0]?.shortname || matchData.teams[0]}</p>
                    {matchData.score?.[0] && (
                      <p className="text-2xl font-bold text-primary mt-1">
                        {matchData.score[0].r}/{matchData.score[0].w}
                        <span className="text-sm text-muted-foreground ml-1">({matchData.score[0].o})</span>
                      </p>
                    )}
                  </div>
                  <div className="px-6">
                    <span className="text-muted-foreground text-2xl font-bold">VS</span>
                  </div>
                  <div className="text-center flex-1">
                    <p className="font-bold text-lg">{matchData.teamInfo?.[1]?.shortname || matchData.teams[1]}</p>
                    {matchData.score?.[1] && (
                      <p className="text-2xl font-bold text-primary mt-1">
                        {matchData.score[1].r}/{matchData.score[1].w}
                        <span className="text-sm text-muted-foreground ml-1">({matchData.score[1].o})</span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Match Status */}
              {matchData.status && (
                <div className="text-center py-3 px-4 bg-primary/10 rounded-lg mb-4">
                  <p className="font-semibold text-primary">{matchData.status}</p>
                </div>
              )}

              {/* Match Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(matchData.dateTimeGMT || matchData.date).toLocaleDateString('en-IN', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(matchData.dateTimeGMT || matchData.date).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })} IST</span>
                </div>
                {matchData.venue && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{matchData.venue}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Scorecard and Points */}
          <Tabs defaultValue="scorecard">
            <TabsList className="mb-4">
              <TabsTrigger value="scorecard">Scorecard</TabsTrigger>
              <TabsTrigger value="points">Fantasy Points</TabsTrigger>
            </TabsList>

            {/* Scorecard Tab */}
            <TabsContent value="scorecard">
              {scorecardLoading ? (
                <Card>
                  <CardContent className="py-8">
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : scorecardData?.scorecard && scorecardData.scorecard.length > 0 ? (
                <div className="space-y-6">
                  {scorecardData.scorecard.map((inning: any, index: number) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{inning.inning}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {/* Batting */}
                        {inning.batting && inning.batting.length > 0 && (
                          <div className="mb-6">
                            <h4 className="font-semibold mb-3 text-sm text-muted-foreground">BATTING</h4>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left py-2">Batsman</th>
                                    <th className="text-center py-2">R</th>
                                    <th className="text-center py-2">B</th>
                                    <th className="text-center py-2">4s</th>
                                    <th className="text-center py-2">6s</th>
                                    <th className="text-center py-2">SR</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {inning.batting.map((bat: any, i: number) => (
                                    <tr key={i} className="border-b last:border-0">
                                      <td className="py-2">
                                        <p className="font-medium">{bat.batsman?.name}</p>
                                        <p className="text-xs text-muted-foreground">{bat.dismissalText || bat.dismissal}</p>
                                      </td>
                                      <td className="text-center font-semibold">{bat.r}</td>
                                      <td className="text-center">{bat.b}</td>
                                      <td className="text-center">{bat["4s"]}</td>
                                      <td className="text-center">{bat["6s"]}</td>
                                      <td className="text-center">{bat.sr?.toFixed(2)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {/* Bowling */}
                        {inning.bowling && inning.bowling.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-3 text-sm text-muted-foreground">BOWLING</h4>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left py-2">Bowler</th>
                                    <th className="text-center py-2">O</th>
                                    <th className="text-center py-2">M</th>
                                    <th className="text-center py-2">R</th>
                                    <th className="text-center py-2">W</th>
                                    <th className="text-center py-2">ECO</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {inning.bowling.map((bowl: any, i: number) => (
                                    <tr key={i} className="border-b last:border-0">
                                      <td className="py-2 font-medium">{bowl.bowler?.name}</td>
                                      <td className="text-center">{bowl.o}</td>
                                      <td className="text-center">{bowl.m}</td>
                                      <td className="text-center">{bowl.r}</td>
                                      <td className="text-center font-semibold">{bowl.w}</td>
                                      <td className="text-center">{bowl.eco?.toFixed(2)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Scorecard Not Available</h3>
                    <p className="text-muted-foreground">
                      {isLive ? "Scorecard will be updated as the match progresses." : "Scorecard data is not available for this match."}
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Fantasy Points Tab */}
            <TabsContent value="points">
              {pointsLoading ? (
                <Card>
                  <CardContent className="py-8">
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : pointsData?.totals && pointsData.totals.length > 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Fantasy Points</CardTitle>
                    <CardDescription>Points earned by players in this match</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Rank</th>
                            <th className="text-left py-2">Player</th>
                            <th className="text-right py-2">Points</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pointsData.totals
                            .sort((a: any, b: any) => b.points - a.points)
                            .map((player: any, index: number) => (
                              <tr key={player.id} className="border-b last:border-0">
                                <td className="py-3">
                                  <Badge variant={index < 3 ? "default" : "outline"} className={index < 3 ? "lueur-gradient text-white" : ""}>
                                    #{index + 1}
                                  </Badge>
                                </td>
                                <td className="py-3 font-medium">{player.name}</td>
                                <td className="py-3 text-right">
                                  <span className="font-bold text-primary">{player.points}</span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Points Not Available</h3>
                    <p className="text-muted-foreground">
                      {isLive ? "Fantasy points will be calculated after the match." : "Fantasy points data is not available for this match."}
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}
