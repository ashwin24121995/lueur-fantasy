import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { 
  UserPlus, 
  Search, 
  Users, 
  Trophy, 
  ArrowRight,
  CheckCircle,
  Star,
  Target,
  Shield,
  Zap,
  Award,
  Clock,
  AlertTriangle,
  HelpCircle
} from "lucide-react";

export default function HowToPlay() {
  const { isAuthenticated } = useAuth();

  const steps = [
    {
      number: 1,
      icon: UserPlus,
      title: "Create Your Free Account",
      description: "Getting started is quick and easy. Sign up for free in just 2 minutes with your email address. Our platform is completely free to use with no hidden charges.",
      details: [
        "Enter your full name and email address",
        "Create a strong, secure password",
        "Verify that you are 18 years or older (mandatory)",
        "Select your state of residence",
        "Agree to our terms of service and privacy policy",
        "Verify your email to activate your account"
      ],
      tip: "Use a valid email address as you'll need it for password recovery and important notifications."
    },
    {
      number: 2,
      icon: Search,
      title: "Browse & Select a Match",
      description: "Explore upcoming cricket matches from various leagues including IPL, Big Bash, PSL, CPL, and international fixtures. Choose the match you want to create your fantasy team for.",
      details: [
        "View all upcoming matches with date, time, and venue",
        "See match format (T20, ODI, Test)",
        "Check if fantasy squad data is available",
        "View team lineups and player statistics",
        "Note the team creation deadline",
        "Select matches before they start"
      ],
      tip: "Create your team well before the deadline to avoid last-minute rushes and potential issues."
    },
    {
      number: 3,
      icon: Users,
      title: "Build Your Dream Team",
      description: "This is where your cricket knowledge shines! Select 11 players from both teams to form your fantasy squad. Balance your team with the right mix of batsmen, bowlers, all-rounders, and wicket-keepers.",
      details: [
        "Select exactly 11 players from both playing teams",
        "Minimum 1 Wicket-Keeper (WK) required",
        "Minimum 3 Batsmen (BAT) required",
        "Minimum 3 Bowlers (BOWL) required",
        "Minimum 1 All-Rounder (AR) required",
        "Maximum 7 players from any single team",
        "Consider player form, pitch conditions, and head-to-head records"
      ],
      tip: "Research player recent performances and match conditions before finalizing your team."
    },
    {
      number: 4,
      icon: Star,
      title: "Choose Your Captain & Vice-Captain",
      description: "The most crucial decision! Your Captain earns 2x points and Vice-Captain earns 1.5x points. Strategic selection of these two players can make or break your fantasy team's performance.",
      details: [
        "Captain (C) earns double (2x) fantasy points",
        "Vice-Captain (VC) earns 1.5x fantasy points",
        "Choose consistent performers or in-form players",
        "Consider match conditions and opposition",
        "Analyze player's record at the venue",
        "Look at head-to-head statistics"
      ],
      tip: "Don't always pick star players as captain. Sometimes in-form players from smaller teams can be game-changers!"
    },
    {
      number: 5,
      icon: Trophy,
      title: "Submit & Track Your Team",
      description: "Once you're satisfied with your team selection, submit it before the match starts. Then sit back, watch the match, and track your team's performance in real-time!",
      details: [
        "Review your team one final time",
        "Give your team a unique name",
        "Submit before the match deadline",
        "Track live fantasy points during the match",
        "Watch your rank on the leaderboard",
        "Compete with other fantasy players"
      ],
      tip: "Keep an eye on team announcements before the deadline. Last-minute changes can affect your team!"
    }
  ];

  const pointsSystem = {
    batting: [
      { action: "Run Scored", points: "+1", description: "For every run scored by the batsman" },
      { action: "Boundary Bonus (4s)", points: "+1", description: "Additional point for hitting a four" },
      { action: "Six Bonus (6s)", points: "+2", description: "Additional points for hitting a six" },
      { action: "Half Century (50 runs)", points: "+8", description: "Bonus for scoring 50 runs" },
      { action: "Century (100 runs)", points: "+16", description: "Bonus for scoring 100 runs" },
      { action: "Duck (0 runs, dismissed)", points: "-2", description: "Penalty for getting out on zero" }
    ],
    bowling: [
      { action: "Wicket Taken", points: "+25", description: "For each wicket taken (excl. run out)" },
      { action: "LBW/Bowled Bonus", points: "+8", description: "Extra points for LBW or bowled dismissals" },
      { action: "Maiden Over", points: "+8", description: "For bowling a maiden over" },
      { action: "3 Wicket Haul", points: "+4", description: "Bonus for taking 3 wickets" },
      { action: "4 Wicket Haul", points: "+8", description: "Bonus for taking 4 wickets" },
      { action: "5 Wicket Haul", points: "+16", description: "Bonus for taking 5+ wickets" }
    ],
    fielding: [
      { action: "Catch Taken", points: "+8", description: "For each catch taken" },
      { action: "Stumping", points: "+12", description: "For stumping a batsman" },
      { action: "Run Out (Direct Hit)", points: "+12", description: "For direct hit run out" },
      { action: "Run Out (Indirect)", points: "+6", description: "For indirect run out contribution" },
      { action: "3+ Catches Bonus", points: "+4", description: "Bonus for taking 3 or more catches" }
    ],
    other: [
      { action: "Playing in Match", points: "+4", description: "For being in the playing XI" },
      { action: "Captain Multiplier", points: "2x", description: "Captain earns double points" },
      { action: "Vice-Captain Multiplier", points: "1.5x", description: "Vice-Captain earns 1.5x points" },
      { action: "Player of the Match", points: "+25", description: "Bonus for being named POTM" }
    ]
  };

  const proTips = [
    {
      icon: Target,
      title: "Research Player Form",
      description: "Check recent performances, batting/bowling averages, and strike rates. A player in good form is more likely to perform well."
    },
    {
      icon: Shield,
      title: "Analyze Pitch Conditions",
      description: "Pitch type matters significantly. Spin-friendly pitches favor spinners, while pace-friendly tracks benefit fast bowlers and stroke players."
    },
    {
      icon: Zap,
      title: "Consider Weather Impact",
      description: "Weather conditions can affect gameplay. Overcast conditions often help swing bowlers, while dry conditions favor spinners."
    },
    {
      icon: Award,
      title: "Balance Your Team",
      description: "Don't put all eggs in one basket. Spread your selections across both teams for better chances of earning points."
    },
    {
      icon: Star,
      title: "Smart Captain Selection",
      description: "Your captain choice is crucial. Pick consistent performers or in-form players for maximum points multiplication."
    },
    {
      icon: Clock,
      title: "Monitor Team Announcements",
      description: "Keep an eye on official team announcements. Injuries or last-minute changes can significantly affect your team."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700/20 to-teal-600/20 opacity-50"></div>
        <div className="container py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              Complete Guide
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How To Play Fantasy Cricket
            </h1>
            <p className="text-lg md:text-xl text-emerald-100 mb-8">
              Master the art of fantasy cricket in 5 simple steps. Create your dream team, 
              compete with friends, and showcase your cricket knowledge on LUEUR!
            </p>
            {isAuthenticated ? (
              <Link href="/fantasy-cricket">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-8">
                  Start Playing Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/register">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-8">
                  Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4">Step by Step</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              5 Simple Steps to Get Started
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow these easy steps to create your fantasy team and start competing with cricket fans worldwide
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {steps.map((step, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3 p-8 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-2xl font-bold">{step.number}</span>
                      </div>
                      <step.icon className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-emerald-100 text-sm">{step.description}</p>
                  </div>
                  <div className="lg:w-2/3 p-8">
                    <div className="grid md:grid-cols-2 gap-3 mb-6">
                      {step.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                      <div className="flex items-start gap-2">
                        <HelpCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-amber-800">Pro Tip: </span>
                          <span className="text-amber-700">{step.tip}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Points System */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4">Scoring</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fantasy Points System
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understand how points are calculated based on your players' real match performance
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Batting Points */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-sm font-bold">BAT</span>
                  </div>
                  Batting Points
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {pointsSystem.batting.map((item, i) => (
                    <div key={i} className="flex justify-between items-start border-b border-gray-100 pb-3 last:border-0">
                      <div>
                        <p className="font-medium text-gray-900">{item.action}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <span className={`font-bold text-lg ${item.points.startsWith('-') ? 'text-red-500' : 'text-emerald-600'}`}>
                        {item.points}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bowling Points */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-sm font-bold">BOWL</span>
                  </div>
                  Bowling Points
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {pointsSystem.bowling.map((item, i) => (
                    <div key={i} className="flex justify-between items-start border-b border-gray-100 pb-3 last:border-0">
                      <div>
                        <p className="font-medium text-gray-900">{item.action}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <span className="font-bold text-lg text-emerald-600">{item.points}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fielding Points */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-sm font-bold">FLD</span>
                  </div>
                  Fielding Points
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {pointsSystem.fielding.map((item, i) => (
                    <div key={i} className="flex justify-between items-start border-b border-gray-100 pb-3 last:border-0">
                      <div>
                        <p className="font-medium text-gray-900">{item.action}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <span className="font-bold text-lg text-emerald-600">{item.points}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Other Points */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Star className="h-5 w-5" />
                  </div>
                  Bonus & Multipliers
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {pointsSystem.other.map((item, i) => (
                    <div key={i} className="flex justify-between items-start border-b border-gray-100 pb-3 last:border-0">
                      <div>
                        <p className="font-medium text-gray-900">{item.action}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <span className="font-bold text-lg text-emerald-600">{item.points}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8 max-w-2xl mx-auto">
            * Points may vary slightly based on match format (T20, ODI, Test). 
            The above points are for T20 matches. Captain gets 2x and Vice-Captain gets 1.5x of all earned points.
          </p>
        </div>
      </section>

      {/* Team Composition Rules */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4">Rules</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Team Composition Rules
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Build a balanced team following these composition guidelines
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                    <div className="w-16 h-16 rounded-full bg-blue-500 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold">WK</span>
                    </div>
                    <p className="font-bold text-gray-900 text-lg">Wicket-Keeper</p>
                    <p className="text-blue-600 font-semibold">Min: 1 | Max: 4</p>
                  </div>
                  <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                    <div className="w-16 h-16 rounded-full bg-purple-500 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold">BAT</span>
                    </div>
                    <p className="font-bold text-gray-900 text-lg">Batsmen</p>
                    <p className="text-purple-600 font-semibold">Min: 3 | Max: 6</p>
                  </div>
                  <div className="text-center p-6 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200">
                    <div className="w-16 h-16 rounded-full bg-amber-500 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold">AR</span>
                    </div>
                    <p className="font-bold text-gray-900 text-lg">All-Rounders</p>
                    <p className="text-amber-600 font-semibold">Min: 1 | Max: 4</p>
                  </div>
                  <div className="text-center p-6 rounded-xl bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200">
                    <div className="w-16 h-16 rounded-full bg-rose-500 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold">BOWL</span>
                    </div>
                    <p className="font-bold text-gray-900 text-lg">Bowlers</p>
                    <p className="text-rose-600 font-semibold">Min: 3 | Max: 6</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-emerald-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Total Players Required</p>
                        <p className="text-emerald-600">Exactly 11 players</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Team Limit</p>
                        <p className="text-red-600">Maximum 7 players from one team</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pro Tips Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              Expert Advice
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pro Tips for Success
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Expert strategies to help you build winning fantasy teams consistently
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {proTips.map((tip, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-500/20 text-emerald-400 p-3 rounded-xl">
                      <tip.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{tip.title}</h3>
                      <p className="text-slate-400">{tip.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-500 text-white p-3 rounded-xl flex-shrink-0">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Important Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">LUEUR is a <strong>100% free-to-play</strong> fantasy cricket platform. No real money is involved.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">You must be <strong>18 years or older</strong> to participate on our platform.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">LUEUR is <strong>not available</strong> in Telangana, Andhra Pradesh, Assam, and Odisha.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Fantasy points are calculated based on <strong>official match statistics</strong>.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Teams <strong>cannot be edited</strong> once the match has started.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Play responsibly and enjoy the game of cricket!</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-600 to-emerald-700">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Test Your Cricket Knowledge?
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Join thousands of cricket fans and start building your dream team today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <>
                  <Link href="/fantasy-cricket">
                    <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-8">
                      Browse Matches <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-emerald-700 font-semibold px-8">
                      Go to Dashboard
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/register">
                    <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-8">
                      Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-emerald-700 font-semibold px-8">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
