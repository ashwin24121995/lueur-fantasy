import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  UserPlus, 
  Search, 
  Users, 
  Trophy, 
  ArrowRight,
  CheckCircle,
  Star,
  Target
} from "lucide-react";

export default function HowToPlay() {
  const steps = [
    {
      number: 1,
      icon: UserPlus,
      title: "Create Your Account",
      description: "Sign up for free with your email. You must be 18 years or older to register.",
      details: [
        "Enter your basic details",
        "Verify your age (18+)",
        "Select your state (some restrictions apply)",
        "Set a secure password",
      ],
    },
    {
      number: 2,
      icon: Search,
      title: "Select a Match",
      description: "Browse upcoming cricket matches and choose the one you want to play.",
      details: [
        "View all upcoming matches",
        "Check match timings",
        "Look for fantasy-enabled matches",
        "Select your preferred match",
      ],
    },
    {
      number: 3,
      icon: Users,
      title: "Build Your Team",
      description: "Create your dream team of 11 players within the given constraints.",
      details: [
        "Select 11 players from both teams",
        "Choose at least 1 Wicket-Keeper",
        "Choose at least 3 Batsmen",
        "Choose at least 3 Bowlers",
        "Choose at least 1 All-Rounder",
        "Maximum 7 players from one team",
      ],
    },
    {
      number: 4,
      icon: Star,
      title: "Choose Captain & Vice-Captain",
      description: "Select your Captain (2x points) and Vice-Captain (1.5x points).",
      details: [
        "Captain earns 2x fantasy points",
        "Vice-Captain earns 1.5x fantasy points",
        "Choose players you expect to perform well",
        "Strategic selection is key to winning",
      ],
    },
    {
      number: 5,
      icon: Trophy,
      title: "Join a Contest",
      description: "Enter a contest and compete with other players.",
      details: [
        "All contests are FREE to join",
        "No entry fees required",
        "Compete with friends or public",
        "Track your ranking on leaderboard",
      ],
    },
    {
      number: 6,
      icon: Target,
      title: "Earn Points & Win",
      description: "Watch your team score points based on real match performance.",
      details: [
        "Points update in real-time",
        "Based on actual player performance",
        "Batting, bowling & fielding points",
        "Climb the leaderboard to win",
      ],
    },
  ];

  const pointsSystem = {
    batting: [
      { action: "Run", points: "+1" },
      { action: "Boundary (4)", points: "+1" },
      { action: "Six", points: "+2" },
      { action: "Half Century (50)", points: "+8" },
      { action: "Century (100)", points: "+16" },
      { action: "Duck (Batsman)", points: "-2" },
    ],
    bowling: [
      { action: "Wicket", points: "+25" },
      { action: "Maiden Over", points: "+8" },
      { action: "3 Wicket Haul", points: "+4" },
      { action: "4 Wicket Haul", points: "+8" },
      { action: "5 Wicket Haul", points: "+16" },
    ],
    fielding: [
      { action: "Catch", points: "+8" },
      { action: "Stumping", points: "+12" },
      { action: "Run Out (Direct)", points: "+12" },
      { action: "Run Out (Indirect)", points: "+6" },
    ],
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 lueur-gradient opacity-10" />
        <div className="container py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 lueur-gradient text-white">Guide</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How To Play <span className="lueur-text-gradient">Fantasy Cricket</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Learn how to create your dream team and compete in fantasy cricket contests. 
              It's easy, fun, and completely free!
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <Card key={index} className="lueur-card-hover overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 p-6 lueur-gradient text-white flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="text-2xl font-bold">{step.number}</span>
                        </div>
                        <step.icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Points System */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Fantasy Points System</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understand how points are calculated based on player performance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Batting Points */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full player-role-bat flex items-center justify-center">
                    <span className="text-xs font-bold">BAT</span>
                  </div>
                  Batting Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {pointsSystem.batting.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{item.action}</span>
                      <span className={`font-semibold ${item.points.startsWith('-') ? 'text-red-500' : 'text-green-600'}`}>
                        {item.points}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bowling Points */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full player-role-bowl flex items-center justify-center">
                    <span className="text-xs font-bold">BOWL</span>
                  </div>
                  Bowling Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {pointsSystem.bowling.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{item.action}</span>
                      <span className="font-semibold text-green-600">{item.points}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fielding Points */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full player-role-ar flex items-center justify-center">
                    <span className="text-xs font-bold">FLD</span>
                  </div>
                  Fielding Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {pointsSystem.fielding.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{item.action}</span>
                      <span className="font-semibold text-green-600">{item.points}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            * Points may vary based on match format (T20, ODI, Test). 
            Captain gets 2x and Vice-Captain gets 1.5x of these points.
          </p>
        </div>
      </section>

      {/* Team Composition Rules */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Team Composition Rules</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <div className="w-12 h-12 rounded-full player-role-wk mx-auto mb-2 flex items-center justify-center">
                      <span className="text-xs font-bold">WK</span>
                    </div>
                    <p className="font-semibold">Wicket-Keeper</p>
                    <p className="text-sm text-muted-foreground">Min: 1 | Max: 4</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <div className="w-12 h-12 rounded-full player-role-bat mx-auto mb-2 flex items-center justify-center">
                      <span className="text-xs font-bold">BAT</span>
                    </div>
                    <p className="font-semibold">Batsmen</p>
                    <p className="text-sm text-muted-foreground">Min: 3 | Max: 6</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <div className="w-12 h-12 rounded-full player-role-ar mx-auto mb-2 flex items-center justify-center">
                      <span className="text-xs font-bold">AR</span>
                    </div>
                    <p className="font-semibold">All-Rounders</p>
                    <p className="text-sm text-muted-foreground">Min: 1 | Max: 4</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <div className="w-12 h-12 rounded-full player-role-bowl mx-auto mb-2 flex items-center justify-center">
                      <span className="text-xs font-bold">BOWL</span>
                    </div>
                    <p className="font-semibold">Bowlers</p>
                    <p className="text-sm text-muted-foreground">Min: 3 | Max: 6</p>
                  </div>
                </div>
                <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-sm text-center">
                    <strong>Important:</strong> You can select a maximum of 7 players from any single team.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <Card className="lueur-gradient text-white max-w-3xl mx-auto">
            <CardContent className="py-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Playing?</h2>
              <p className="text-white/80 mb-8">
                Create your free account and start building your fantasy cricket team today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" variant="secondary">
                    Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/fantasy-cricket">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Browse Matches
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
