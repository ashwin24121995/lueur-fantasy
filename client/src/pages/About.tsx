import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Trophy, 
  Users,
  Target,
  Heart,
  Shield,
  Zap,
  Globe,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Gamepad2
} from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Passion for Cricket",
      description: "We're cricket enthusiasts who understand the love fans have for the game. Every feature we build comes from our deep appreciation for cricket.",
    },
    {
      icon: Shield,
      title: "Fair Play",
      description: "We maintain the highest standards of fairness and transparency. Every user gets an equal opportunity to showcase their cricket knowledge.",
    },
    {
      icon: Users,
      title: "Community First",
      description: "Our community is at the heart of everything we do. We listen, adapt, and grow together with our users.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We continuously improve our platform with cutting-edge technology to deliver the best fantasy cricket experience.",
    },
  ];

  const stats = [
    { value: "100%", label: "Free to Play", icon: Sparkles },
    { value: "24/7", label: "Live Updates", icon: Zap },
    { value: "100+", label: "Matches Covered", icon: Trophy },
    { value: "Safe", label: "& Secure", icon: Shield },
  ];

  const milestones = [
    {
      year: "2024",
      title: "Platform Launch",
      description: "LUEUR was born with a mission to make fantasy cricket accessible to everyone, completely free.",
    },
    {
      year: "2024",
      title: "Feature Expansion",
      description: "Added comprehensive match coverage including IPL, international matches, and domestic leagues.",
    },
    {
      year: "2025",
      title: "Community Growth",
      description: "Building a vibrant community of cricket enthusiasts who share our passion for the game.",
    },
  ];

  const features = [
    "Create unlimited fantasy teams for free",
    "Real-time scoring and live updates",
    "Comprehensive player statistics",
    "Multiple cricket formats covered",
    "User-friendly interface",
    "Mobile-responsive design",
    "Secure and private platform",
    "No hidden charges ever",
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500 text-white">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container py-20 md:py-28 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30 text-sm px-4 py-1">
              About LUEUR
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Where Cricket Passion
              <br />
              <span className="text-cyan-200">Meets Fantasy</span>
            </h1>
            <p className="text-lg md:text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              LUEUR is India's premier free-to-play fantasy cricket platform, 
              designed for cricket lovers who want to test their knowledge and 
              compete with friends without any financial risk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold">
                  <Gamepad2 className="mr-2 h-5 w-5" />
                  Start Playing Free
                </Button>
              </Link>
              <Link href="/how-to-play">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn How It Works
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200">Our Story</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Built by Cricket Fans,
                  <br />
                  <span className="text-emerald-600">For Cricket Fans</span>
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    LUEUR was founded with a simple belief: everyone should be able to enjoy 
                    fantasy cricket without worrying about money. We saw how paid fantasy 
                    platforms created barriers for millions of cricket fans who just wanted 
                    to have fun and test their cricket knowledge.
                  </p>
                  <p>
                    Our team of passionate cricket enthusiasts and technology experts came 
                    together to create a platform that puts the joy of the game first. 
                    No entry fees, no cash prizes, no financial stress – just pure cricket 
                    entertainment.
                  </p>
                  <p>
                    Today, LUEUR stands as a testament to our commitment to making fantasy 
                    cricket accessible, enjoyable, and fair for everyone. Whether you're a 
                    seasoned cricket analyst or a casual fan, LUEUR welcomes you to showcase 
                    your cricket knowledge.
                  </p>
                </div>
              </div>
              <div className="relative">
                <Card className="border-0 shadow-2xl overflow-hidden">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-white">
                    <Trophy className="h-16 w-16 mb-6 opacity-90" />
                    <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
                    <p className="text-emerald-100">
                      To democratize fantasy cricket by providing a free, fair, and fun 
                      platform where cricket knowledge is the only currency that matters.
                    </p>
                  </div>
                  <CardContent className="p-6 bg-white">
                    <h4 className="font-semibold text-gray-900 mb-3">What Sets Us Apart</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        100% free to play, forever
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        No gambling or real money involved
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        Focus on skill and cricket knowledge
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        Safe for all age groups (18+)
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200">Our Values</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What We Stand For
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our core values guide every decision we make and every feature we build.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <value.icon className="h-7 w-7 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-emerald-50">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200">Platform Features</Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Everything You Need for
                  <br />
                  <span className="text-emerald-600">Fantasy Cricket</span>
                </h2>
                <p className="text-gray-600 mb-8">
                  LUEUR provides all the tools and features you need to enjoy fantasy 
                  cricket to the fullest, without any cost.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <Globe className="h-10 w-10 mx-auto mb-3 text-emerald-600" />
                    <h4 className="font-semibold text-gray-900">Global Coverage</h4>
                    <p className="text-sm text-gray-500 mt-1">All major cricket leagues</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-10 w-10 mx-auto mb-3 text-emerald-600" />
                    <h4 className="font-semibold text-gray-900">Live Scoring</h4>
                    <p className="text-sm text-gray-500 mt-1">Real-time updates</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <Award className="h-10 w-10 mx-auto mb-3 text-emerald-600" />
                    <h4 className="font-semibold text-gray-900">Leaderboards</h4>
                    <p className="text-sm text-gray-500 mt-1">Compete & rank up</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <Star className="h-10 w-10 mx-auto mb-3 text-emerald-600" />
                    <h4 className="font-semibold text-gray-900">Player Stats</h4>
                    <p className="text-sm text-gray-500 mt-1">Detailed analytics</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200">Our Journey</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Milestones & Growth
              </h2>
            </div>

            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-600 font-bold">{milestone.year}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join the LUEUR Family?
            </h2>
            <p className="text-lg text-emerald-100 mb-8">
              Start your fantasy cricket journey today. It's free, it's fun, 
              and it's waiting for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
