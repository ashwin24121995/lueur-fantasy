import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Shield, 
  Heart,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  Brain,
  Target,
  Phone,
  Mail,
  Lightbulb,
  Scale,
  HandHeart,
  MessageCircle,
  BookOpen,
  HelpCircle
} from "lucide-react";

export default function ResponsibleGaming() {
  const principles = [
    {
      icon: Heart,
      title: "Play for Fun",
      description: "Fantasy cricket should be an enjoyable hobby, not a source of stress. Keep it entertaining and light-hearted.",
    },
    {
      icon: Clock,
      title: "Set Time Limits",
      description: "Allocate specific time for playing and stick to it. Don't let fantasy sports consume your daily routine.",
    },
    {
      icon: Brain,
      title: "Stay Informed",
      description: "Understand the game mechanics, rules, and your own playing patterns. Knowledge leads to better decisions.",
    },
    {
      icon: Scale,
      title: "Maintain Balance",
      description: "Keep a healthy balance between fantasy sports and other aspects of life - work, family, and social activities.",
    },
    {
      icon: Target,
      title: "Set Realistic Goals",
      description: "Focus on improving your skills and enjoying the game rather than obsessing over rankings or outcomes.",
    },
    {
      icon: Users,
      title: "Seek Support",
      description: "If you feel overwhelmed, talk to friends, family, or professionals. Support is always available.",
    },
  ];

  const warningSignsPersonal = [
    "Spending more time on fantasy sports than intended",
    "Neglecting work, studies, or family responsibilities",
    "Feeling restless or irritable when not playing",
    "Constantly thinking about fantasy sports",
    "Using fantasy sports to escape problems or relieve stress",
    "Lying to others about time spent on fantasy sports",
    "Feeling guilty or anxious about your gaming habits",
    "Difficulty controlling or stopping your participation",
  ];

  const healthyHabits = [
    {
      title: "Schedule Your Play Time",
      description: "Decide in advance when and how long you'll play. Use phone timers or app limits to stick to your schedule.",
    },
    {
      title: "Take Regular Breaks",
      description: "Step away from the screen regularly. Use the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.",
    },
    {
      title: "Stay Physically Active",
      description: "Balance screen time with physical activities. Exercise helps maintain mental well-being and perspective.",
    },
    {
      title: "Maintain Social Connections",
      description: "Don't let fantasy sports replace real-world social interactions. Spend quality time with friends and family.",
    },
    {
      title: "Keep Perspective",
      description: "Remember that fantasy sports are entertainment. Wins and losses don't define your worth or abilities.",
    },
    {
      title: "Monitor Your Mood",
      description: "Pay attention to how fantasy sports affect your emotions. If it's causing more stress than joy, reassess your involvement.",
    },
  ];

  const resources = [
    {
      name: "iCall Psychosocial Helpline",
      phone: "9152987821",
      description: "Professional counseling and support for mental health concerns",
    },
    {
      name: "Vandrevala Foundation",
      phone: "1860-2662-345",
      description: "24/7 mental health support and crisis intervention",
    },
    {
      name: "NIMHANS Helpline",
      phone: "080-46110007",
      description: "National Institute of Mental Health and Neurosciences support line",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-600/20 to-purple-600/20 opacity-50"></div>
        <div className="container py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              Play Responsibly
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Responsible Gaming
            </h1>
            <p className="text-lg md:text-xl text-rose-100 mb-8">
              At LUEUR, we believe fantasy cricket should be fun, safe, and balanced. 
              We're committed to promoting responsible gaming practices and supporting 
              our users' well-being.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#self-assessment">
                <Button className="bg-white text-rose-600 hover:bg-rose-50">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Self-Assessment
                </Button>
              </a>
              <a href="#resources">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  <Phone className="mr-2 h-4 w-4" />
                  Get Help
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-rose-100 text-rose-700 border-rose-200">Our Commitment</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your Well-Being Comes First
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                LUEUR is a 100% free-to-play platform with no real money involved. 
                We're designed purely for entertainment and skill development, 
                but we still believe in promoting healthy gaming habits.
              </p>
            </div>

            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8" />
                  <h3 className="text-xl font-bold">100% Free-to-Play Platform</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">No Real Money</h4>
                      <p className="text-sm text-gray-600">No deposits, withdrawals, or cash prizes involved</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">No Entry Fees</h4>
                      <p className="text-sm text-gray-600">All contests are completely free to join</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Skill-Based Fun</h4>
                      <p className="text-sm text-gray-600">Focus on cricket knowledge and strategic thinking</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Pure Entertainment</h4>
                      <p className="text-sm text-gray-600">Designed for enjoyment and friendly competition</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Responsible Gaming Principles */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-rose-100 text-rose-700 border-rose-200">Guidelines</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Principles of Responsible Gaming
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Follow these principles to ensure your fantasy cricket experience 
                remains positive and enjoyable.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {principles.map((principle, index) => (
                <Card key={index} className="border border-gray-200 hover:border-rose-300 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center mb-4">
                      <principle.icon className="h-6 w-6 text-rose-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{principle.title}</h3>
                    <p className="text-gray-600 text-sm">{principle.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section id="self-assessment" className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-amber-100 text-amber-700 border-amber-200">Self-Assessment</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Recognize the Warning Signs
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Even with free-to-play games, it's important to maintain healthy habits. 
                Be aware of these signs that may indicate unhealthy gaming patterns.
              </p>
            </div>

            <Card className="border-2 border-amber-200 bg-amber-50">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                  <h3 className="text-xl font-bold text-gray-900">Warning Signs to Watch For</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {warningSignsPersonal.map((sign, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-amber-700 text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-700">{sign}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 bg-white rounded-lg border border-amber-200">
                  <p className="text-gray-700 text-sm">
                    <strong>If you recognize any of these signs in yourself:</strong> Take a break, 
                    talk to someone you trust, and consider reaching out to a mental health professional. 
                    Your well-being is more important than any game.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Healthy Gaming Habits */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200">Best Practices</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Healthy Gaming Habits
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Adopt these habits to ensure your fantasy cricket experience 
                remains enjoyable and balanced.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {healthyHabits.map((habit, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Lightbulb className="h-4 w-4 text-emerald-600" />
                      </div>
                      <h3 className="font-bold text-gray-900">{habit.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{habit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools & Features */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">Platform Features</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tools to Help You Stay in Control
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                LUEUR provides features to help you manage your gaming experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">Activity History</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    View your complete activity history to understand your gaming patterns 
                    and time spent on the platform.
                  </p>
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                      View Dashboard
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">Account Controls</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Take control of your account. You can request temporary suspension 
                    or permanent deletion at any time.
                  </p>
                  <Link href="/contact">
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                      Contact Support
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Help Resources */}
      <section id="resources" className="py-16 bg-rose-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-rose-100 text-rose-700 border-rose-200">Support</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Help & Support Resources
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                If you or someone you know needs support, these resources are available to help.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {resources.map((resource, index) => (
                <Card key={index} className="border border-rose-200 bg-white">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                          <Phone className="h-6 w-6 text-rose-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{resource.name}</h3>
                          <p className="text-gray-600 text-sm">{resource.description}</p>
                        </div>
                      </div>
                      <a href={`tel:${resource.phone}`}>
                        <Button className="bg-rose-600 hover:bg-rose-700 text-white">
                          <Phone className="mr-2 h-4 w-4" />
                          {resource.phone}
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-rose-600 to-purple-600 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                    <HandHeart className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Need to Talk?</h2>
                    <p className="text-rose-100">Our support team is here for you</p>
                  </div>
                </div>
                <p className="text-rose-100 mb-6">
                  If you have concerns about your gaming habits or need assistance, 
                  our support team is available to help. We're here to listen and 
                  provide guidance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-3">
                    <Mail className="h-5 w-5" />
                    <span className="font-medium">support@draftiqplay.com</span>
                  </div>
                  <Link href="/contact">
                    <Button className="bg-white text-rose-600 hover:bg-rose-50">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-white border-t">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Related Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/fair-play">
                <Card className="border border-gray-200 hover:border-rose-300 hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Scale className="h-8 w-8 mx-auto mb-3 text-rose-600" />
                    <h3 className="font-semibold text-gray-900">Fair Play Policy</h3>
                    <p className="text-sm text-gray-500 mt-1">Our commitment to fairness</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/how-to-play">
                <Card className="border border-gray-200 hover:border-rose-300 hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <BookOpen className="h-8 w-8 mx-auto mb-3 text-rose-600" />
                    <h3 className="font-semibold text-gray-900">How To Play</h3>
                    <p className="text-sm text-gray-500 mt-1">Learn the game basics</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/faq">
                <Card className="border border-gray-200 hover:border-rose-300 hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <HelpCircle className="h-8 w-8 mx-auto mb-3 text-rose-600" />
                    <h3 className="font-semibold text-gray-900">FAQ</h3>
                    <p className="text-sm text-gray-500 mt-1">Common questions answered</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
