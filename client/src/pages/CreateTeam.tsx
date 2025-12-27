import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useParams, useLocation } from "wouter";
import { 
  Users, 
  User,
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Star,
  Shield,
  AlertTriangle,
  Loader2,
  Search
} from "lucide-react";

type Player = {
  id: string;
  name: string;
  role: string;
  battingStyle?: string;
  bowlingStyle?: string;
  teamName: string;
};

type SelectedPlayer = Player & {
  isCaptain: boolean;
  isViceCaptain: boolean;
};

// Role category mapping
const categorizeRole = (role: string): "WK" | "BAT" | "AR" | "BOWL" => {
  const r = role.toLowerCase();
  if (r.includes("wk") || r.includes("keeper")) return "WK";
  if (r.includes("allrounder") || r.includes("all-rounder")) return "AR";
  if (r.includes("bowl")) return "BOWL";
  return "BAT";
};

const roleLabels = {
  WK: "Wicket-Keeper",
  BAT: "Batsman",
  AR: "All-Rounder",
  BOWL: "Bowler",
};

const roleColors = {
  WK: "bg-yellow-100 text-yellow-800",
  BAT: "bg-blue-100 text-blue-800",
  AR: "bg-green-100 text-green-800",
  BOWL: "bg-purple-100 text-purple-800",
};

export default function CreateTeam() {
  const { matchId } = useParams<{ matchId: string }>();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  
  const [step, setStep] = useState<"select" | "captain" | "confirm">("select");
  const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayer[]>([]);
  const [captainId, setCaptainId] = useState<string | null>(null);
  const [viceCaptainId, setViceCaptainId] = useState<string | null>(null);
  const [teamName, setTeamName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("WK");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [authLoading, isAuthenticated, setLocation]);

  // Fetch match details
  const { data: matchData, isLoading: matchLoading } = trpc.matches.getById.useQuery(
    { matchId: matchId || "" },
    { enabled: !!matchId }
  );

  // Fetch squad
  const { data: squadData, isLoading: squadLoading } = trpc.matches.getSquad.useQuery(
    { matchId: matchId || "" },
    { enabled: !!matchId }
  );

  // Create team mutation
  const createTeamMutation = trpc.teams.create.useMutation({
    onSuccess: (data) => {
      toast.success("Team created successfully!");
      setLocation("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create team");
    },
  });

  // Process squad data - squadData is an array of TeamSquad objects
  const players = useMemo(() => {
    if (!squadData || !Array.isArray(squadData)) return [];
    const allPlayers: Player[] = [];
    squadData.forEach((team: any) => {
      if (team.players && Array.isArray(team.players)) {
        team.players.forEach((p: any) => {
          allPlayers.push({
            id: p.id,
            name: p.name,
            role: p.role || "Batsman",
            battingStyle: p.battingStyle,
            bowlingStyle: p.bowlingStyle,
            teamName: team.teamName || "Unknown",
          });
        });
      }
    });
    return allPlayers;
  }, [squadData]);

  // Group players by role
  const playersByRole = useMemo(() => {
    const grouped: Record<string, Player[]> = {
      WK: [],
      BAT: [],
      AR: [],
      BOWL: [],
    };
    
    players.forEach((player: Player) => {
      const category = categorizeRole(player.role);
      grouped[category].push(player);
    });
    
    return grouped;
  }, [players]);

  // Filter players by search
  const filteredPlayers = useMemo(() => {
    const rolePlayers = playersByRole[activeTab] || [];
    if (!searchQuery) return rolePlayers;
    return rolePlayers.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.teamName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [playersByRole, activeTab, searchQuery]);

  // Count selected by role
  const selectedByRole = useMemo(() => {
    const counts: Record<string, number> = { WK: 0, BAT: 0, AR: 0, BOWL: 0 };
    selectedPlayers.forEach(p => {
      const category = categorizeRole(p.role);
      counts[category]++;
    });
    return counts;
  }, [selectedPlayers]);

  // Count selected by team
  const selectedByTeam = useMemo(() => {
    const counts: Record<string, number> = {};
    selectedPlayers.forEach(p => {
      counts[p.teamName] = (counts[p.teamName] || 0) + 1;
    });
    return counts;
  }, [selectedPlayers]);

  // Validation
  const validation = useMemo(() => {
    const errors: string[] = [];
    
    if (selectedPlayers.length !== 11) {
      errors.push(`Select ${11 - selectedPlayers.length} more player(s)`);
    }
    if (selectedByRole.WK < 1) errors.push("Need at least 1 Wicket-Keeper");
    if (selectedByRole.BAT < 3) errors.push("Need at least 3 Batsmen");
    if (selectedByRole.BOWL < 3) errors.push("Need at least 3 Bowlers");
    
    // Check max 7 from one team
    Object.entries(selectedByTeam).forEach(([team, count]) => {
      if (count > 7) errors.push(`Max 7 players from ${team}`);
    });

    return {
      isValid: errors.length === 0 && selectedPlayers.length === 11,
      errors,
    };
  }, [selectedPlayers, selectedByRole, selectedByTeam]);

  const isPlayerSelected = (playerId: string) => 
    selectedPlayers.some(p => p.id === playerId);

  const togglePlayer = (player: Player) => {
    if (isPlayerSelected(player.id)) {
      setSelectedPlayers(prev => prev.filter(p => p.id !== player.id));
      if (captainId === player.id) setCaptainId(null);
      if (viceCaptainId === player.id) setViceCaptainId(null);
    } else {
      if (selectedPlayers.length >= 11) {
        toast.error("You can only select 11 players");
        return;
      }
      
      // Check team limit
      const teamCount = selectedByTeam[player.teamName] || 0;
      if (teamCount >= 7) {
        toast.error(`Maximum 7 players from ${player.teamName}`);
        return;
      }
      
      setSelectedPlayers(prev => [...prev, { ...player, isCaptain: false, isViceCaptain: false }]);
    }
  };

  const handleCaptainSelect = (playerId: string) => {
    if (viceCaptainId === playerId) {
      setViceCaptainId(null);
    }
    setCaptainId(playerId);
  };

  const handleViceCaptainSelect = (playerId: string) => {
    if (captainId === playerId) {
      setCaptainId(null);
    }
    setViceCaptainId(playerId);
  };

  const handleSubmit = () => {
    if (!captainId || !viceCaptainId) {
      toast.error("Please select Captain and Vice-Captain");
      return;
    }

    // For now, we'll create a default contest or use match ID
    // In a real app, you'd select a contest first
    createTeamMutation.mutate({
      contestId: 1, // Default contest - in real app, this would be selected
      matchId: parseInt(matchId || "0"),
      teamName: teamName || `Team ${Date.now()}`,
      captainPlayerId: captainId,
      viceCaptainPlayerId: viceCaptainId,
      players: selectedPlayers.map(p => ({
        playerId: p.id,
        playerName: p.name,
        playerRole: p.role,
        teamName: p.teamName,
      })),
    });
  };

  if (authLoading || matchLoading || squadLoading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading match data...</p>
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
      {/* Header */}
      <section className="bg-muted/30 border-b">
        <div className="container py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setLocation("/fantasy-cricket")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-bold line-clamp-1">
                {matchData?.name || "Create Team"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {step === "select" && "Select 11 players for your team"}
                {step === "captain" && "Choose Captain & Vice-Captain"}
                {step === "confirm" && "Review and confirm your team"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress */}
      <section className="border-b bg-background">
        <div className="container py-3">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className={`flex items-center gap-2 ${step === "select" ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === "select" ? "lueur-gradient text-white" : "bg-muted"}`}>
                1
              </div>
              <span className="text-sm hidden sm:inline">Select</span>
            </div>
            <div className="flex-1 h-0.5 bg-muted mx-2" />
            <div className={`flex items-center gap-2 ${step === "captain" ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === "captain" ? "lueur-gradient text-white" : "bg-muted"}`}>
                2
              </div>
              <span className="text-sm hidden sm:inline">Captain</span>
            </div>
            <div className="flex-1 h-0.5 bg-muted mx-2" />
            <div className={`flex items-center gap-2 ${step === "confirm" ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === "confirm" ? "lueur-gradient text-white" : "bg-muted"}`}>
                3
              </div>
              <span className="text-sm hidden sm:inline">Confirm</span>
            </div>
          </div>
        </div>
      </section>

      {/* Selection Stats */}
      <section className="border-b bg-background sticky top-0 z-10">
        <div className="container py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{selectedPlayers.length}/11</p>
                <p className="text-xs text-muted-foreground">Players</p>
              </div>
              <div className="hidden sm:flex gap-2">
                {Object.entries(selectedByRole).map(([role, count]) => (
                  <Badge key={role} variant="outline" className="text-xs">
                    {role}: {count}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              {step !== "select" && (
                <Button 
                  variant="outline" 
                  onClick={() => setStep(step === "confirm" ? "captain" : "select")}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back
                </Button>
              )}
              {step === "select" && (
                <Button 
                  className="lueur-gradient"
                  disabled={!validation.isValid}
                  onClick={() => setStep("captain")}
                >
                  Next <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              )}
              {step === "captain" && (
                <Button 
                  className="lueur-gradient"
                  disabled={!captainId || !viceCaptainId}
                  onClick={() => setStep("confirm")}
                >
                  Next <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              )}
              {step === "confirm" && (
                <Button 
                  className="lueur-gradient"
                  onClick={() => setShowConfirmDialog(true)}
                  disabled={createTeamMutation.isPending}
                >
                  {createTeamMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>Create Team</>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-4">
        <div className="container">
          {/* Step 1: Select Players */}
          {step === "select" && (
            <div className="grid lg:grid-cols-4 gap-4">
              {/* Player List */}
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
                        <TabsList className="grid grid-cols-4">
                          <TabsTrigger value="WK" className="text-xs sm:text-sm">
                            WK ({playersByRole.WK?.length || 0})
                          </TabsTrigger>
                          <TabsTrigger value="BAT" className="text-xs sm:text-sm">
                            BAT ({playersByRole.BAT?.length || 0})
                          </TabsTrigger>
                          <TabsTrigger value="AR" className="text-xs sm:text-sm">
                            AR ({playersByRole.AR?.length || 0})
                          </TabsTrigger>
                          <TabsTrigger value="BOWL" className="text-xs sm:text-sm">
                            BOWL ({playersByRole.BOWL?.length || 0})
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search players..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9 w-full sm:w-48"
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {players.length === 0 ? (
                        <div className="text-center py-12">
                          <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold mb-2">Squad Not Announced Yet</h3>
                          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                            The playing squad for this match has not been announced yet. 
                            Please check back closer to the match time when teams are finalized.
                          </p>
                          <Button variant="outline" onClick={() => setLocation("/fantasy-cricket")}>
                            <ArrowLeft className="h-4 w-4 mr-2" /> Browse Other Matches
                          </Button>
                        </div>
                      ) : filteredPlayers.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          No players found matching your search
                        </div>
                      ) : (
                        filteredPlayers.map((player: Player) => {
                          const isSelected = isPlayerSelected(player.id);
                          return (
                            <div
                              key={player.id}
                              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                                isSelected 
                                  ? "bg-primary/10 border border-primary" 
                                  : "bg-muted/50 hover:bg-muted"
                              }`}
                              onClick={() => togglePlayer(player)}
                            >
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                isSelected ? "lueur-gradient" : "bg-muted"
                              }`}>
                                {isSelected ? (
                                  <Check className="h-5 w-5 text-white" />
                                ) : (
                                  <User className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{player.name}</p>
                                <p className="text-xs text-muted-foreground">{player.teamName}</p>
                              </div>
                              <Badge className={roleColors[categorizeRole(player.role)]}>
                                {categorizeRole(player.role)}
                              </Badge>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Selection Summary */}
              <div>
                <Card className="sticky top-32">
                  <CardHeader>
                    <CardTitle className="text-sm">Team Composition</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(roleLabels).map(([key, label]) => (
                      <div key={key} className="flex items-center justify-between text-sm">
                        <span>{label}</span>
                        <Badge variant={selectedByRole[key] > 0 ? "default" : "outline"}>
                          {selectedByRole[key]}
                        </Badge>
                      </div>
                    ))}
                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between text-sm font-semibold">
                        <span>Total</span>
                        <span>{selectedPlayers.length}/11</span>
                      </div>
                    </div>
                    
                    {!validation.isValid && validation.errors.length > 0 && (
                      <Alert variant="destructive" className="mt-4">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-xs">
                          {validation.errors[0]}
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Step 2: Select Captain */}
          {step === "captain" && (
            <Card>
              <CardHeader>
                <CardTitle>Choose Captain & Vice-Captain</CardTitle>
                <CardDescription>
                  Captain gets 2x points, Vice-Captain gets 1.5x points
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {selectedPlayers.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center gap-3 p-4 rounded-lg bg-muted/50"
                    >
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{player.name}</p>
                        <p className="text-xs text-muted-foreground">{player.teamName}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={captainId === player.id ? "default" : "outline"}
                          className={captainId === player.id ? "lueur-gradient" : ""}
                          onClick={() => handleCaptainSelect(player.id)}
                        >
                          <Star className="h-4 w-4 mr-1" />
                          C
                        </Button>
                        <Button
                          size="sm"
                          variant={viceCaptainId === player.id ? "default" : "outline"}
                          className={viceCaptainId === player.id ? "lueur-gradient" : ""}
                          onClick={() => handleViceCaptainSelect(player.id)}
                        >
                          <Shield className="h-4 w-4 mr-1" />
                          VC
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Confirm */}
          {step === "confirm" && (
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Confirm Your Team</CardTitle>
                  <CardDescription>Review your selections before submitting</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Team Name (Optional)</label>
                    <Input
                      placeholder="Enter team name"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div className="space-y-2">
                    {selectedPlayers.map((player) => (
                      <div
                        key={player.id}
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          captainId === player.id || viceCaptainId === player.id
                            ? "bg-primary/10 border border-primary"
                            : "bg-muted/50"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{player.name}</p>
                          <p className="text-xs text-muted-foreground">{player.teamName}</p>
                        </div>
                        <Badge className={roleColors[categorizeRole(player.role)]}>
                          {categorizeRole(player.role)}
                        </Badge>
                        {captainId === player.id && (
                          <Badge className="lueur-gradient text-white">C</Badge>
                        )}
                        {viceCaptainId === player.id && (
                          <Badge className="lueur-gradient text-white">VC</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Confirm Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Team Creation</DialogTitle>
            <DialogDescription>
              Are you sure you want to create this team? You can edit it until the match starts.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">
              <strong>Captain:</strong> {selectedPlayers.find(p => p.id === captainId)?.name}
            </p>
            <p className="text-sm">
              <strong>Vice-Captain:</strong> {selectedPlayers.find(p => p.id === viceCaptainId)?.name}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="lueur-gradient" 
              onClick={handleSubmit}
              disabled={createTeamMutation.isPending}
            >
              {createTeamMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
