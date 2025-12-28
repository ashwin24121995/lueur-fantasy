import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Shield, 
  Scale, 
  Eye, 
  Lock, 
  AlertTriangle,
  CheckCircle,
  Ban,
  FileText,
  Users,
  Gavel,
  MessageSquare,
  Award,
  Target,
  Zap,
  Clock,
  Mail
} from "lucide-react";

export default function FairPlay() {
  const principles = [
    {
      icon: Scale,
      title: "Equal Opportunity for All",
      description: "Every participant on LUEUR has an equal chance to succeed. Our platform is designed to ensure that no user receives preferential treatment, and all contests are conducted on a level playing field regardless of experience level or account age.",
      color: "bg-blue-500",
    },
    {
      icon: Eye,
      title: "Complete Transparency",
      description: "All rules, scoring systems, contest mechanics, and point calculations are clearly documented and accessible to every user. We believe in open communication and ensure you understand exactly how everything works.",
      color: "bg-emerald-500",
    },
    {
      icon: Lock,
      title: "Data Integrity & Security",
      description: "We source all cricket data from official and trusted providers to ensure accurate scoring. Our systems are designed with multiple layers of verification to maintain the integrity of all fantasy points and rankings.",
      color: "bg-purple-500",
    },
    {
      icon: Shield,
      title: "Advanced Anti-Fraud Systems",
      description: "We employ sophisticated algorithms and monitoring systems to detect and prevent fraudulent activities, including multiple accounts, collusion, and automated tools. Our security team works 24/7 to maintain platform integrity.",
      color: "bg-orange-500",
    },
    {
      icon: Users,
      title: "Community Standards",
      description: "We foster a respectful and supportive community where all users treat each other with dignity. Harassment, abuse, or unsportsmanlike conduct has no place on our platform.",
      color: "bg-pink-500",
    },
    {
      icon: Gavel,
      title: "Fair Dispute Resolution",
      description: "When disputes arise, we have a transparent and impartial resolution process. All complaints are reviewed thoroughly, and decisions are made based on evidence and our published policies.",
      color: "bg-cyan-500",
    },
  ];

  const prohibitedActivities = [
    {
      title: "Multiple Accounts",
      description: "Creating or operating more than one account per person is strictly prohibited. Each individual is allowed only one account on LUEUR. Violations will result in permanent bans across all accounts.",
      severity: "high",
    },
    {
      title: "Collusion & Match Fixing",
      description: "Coordinating with other users to gain unfair advantages, sharing insider information, or any form of match-fixing is absolutely forbidden and will be reported to relevant authorities.",
      severity: "high",
    },
    {
      title: "Automated Systems & Bots",
      description: "Using bots, scripts, browser extensions, or any automated tools to create teams, enter contests, or gain advantages is strictly prohibited.",
      severity: "high",
    },
    {
      title: "Identity Fraud",
      description: "Providing false information during registration, using someone else's identity, or creating accounts with fake details is not allowed.",
      severity: "medium",
    },
    {
      title: "Account Sharing or Selling",
      description: "Sharing account credentials, allowing others to access your account, or selling/buying accounts is prohibited and compromises platform security.",
      severity: "medium",
    },
    {
      title: "Exploiting System Vulnerabilities",
      description: "Taking advantage of bugs, glitches, or system errors for personal gain instead of reporting them is a serious violation.",
      severity: "high",
    },
    {
      title: "Harassment & Abuse",
      description: "Any form of harassment, bullying, hate speech, or abusive behavior towards other users or staff members will not be tolerated.",
      severity: "medium",
    },
    {
      title: "Manipulation of Contests",
      description: "Any attempt to manipulate contest outcomes, rankings, or leaderboards through illegitimate means is strictly forbidden.",
      severity: "high",
    },
  ];

  const scoringPrinciples = [
    {
      icon: Target,
      title: "Official Data Sources",
      description: "All points are calculated using official match data from trusted and verified cricket data providers.",
    },
    {
      icon: FileText,
      title: "Published Rules",
      description: "Complete scoring rules are published and available to all users before any contest entry.",
    },
    {
      icon: Zap,
      title: "Automated Calculations",
      description: "Point calculations are fully automated to eliminate human bias and ensure consistency.",
    },
    {
      icon: Eye,
      title: "Transparent Reviews",
      description: "Any scoring disputes are reviewed openly and resolved with full transparency.",
    },
    {
      icon: Clock,
      title: "Historical Records",
      description: "Complete historical point data is maintained for verification and audit purposes.",
    },
  ];

  const consequences = [
    {
      level: "Warning",
      description: "First-time minor violations may result in a formal warning and notification.",
      color: "bg-yellow-100 border-yellow-300 text-yellow-800",
    },
    {
      level: "Temporary Suspension",
      description: "Moderate violations or repeated minor offenses lead to temporary account suspension.",
      color: "bg-orange-100 border-orange-300 text-orange-800",
    },
    {
      level: "Contest Disqualification",
      description: "Violations during active contests result in immediate disqualification and forfeiture.",
      color: "bg-red-100 border-red-300 text-red-800",
    },
    {
      level: "Permanent Ban",
      description: "Severe violations or repeated offenses result in permanent account termination.",
      color: "bg-red-200 border-red-400 text-red-900",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700/20 to-indigo-600/20 opacity-50"></div>
        <div className="container py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              Our Commitment
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Fair Play Policy
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              At LUEUR, we are committed to maintaining a fair, transparent, and enjoyable 
              fantasy cricket experience for all users. Our Fair Play Policy ensures that 
              every participant competes on equal terms.
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">100% Fair Gaming</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <Eye className="h-5 w-5" />
                <span className="text-sm font-medium">Full Transparency</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4">Foundation</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Fair Play Principles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide every aspect of our platform and ensure 
              a fair experience for all users.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {principles.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Scoring Transparency */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">Scoring System</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Transparent & Fair Scoring
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our scoring system is designed to be completely transparent and unbiased.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scoringPrinciples.map((principle, index) => (
                <Card key={index} className="border border-gray-200 hover:border-emerald-300 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                      <principle.icon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{principle.title}</h3>
                    <p className="text-sm text-gray-600">{principle.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prohibited Activities */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="destructive" className="mb-4">Important</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Prohibited Activities
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The following activities are strictly prohibited and may result in 
                immediate action against your account.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prohibitedActivities.map((activity, index) => (
                <Card key={index} className={`border-l-4 ${activity.severity === 'high' ? 'border-l-red-500 bg-red-50/50' : 'border-l-orange-500 bg-orange-50/50'}`}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <Ban className={`h-5 w-5 flex-shrink-0 mt-0.5 ${activity.severity === 'high' ? 'text-red-500' : 'text-orange-500'}`} />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                          {activity.severity === 'high' && (
                            <Badge variant="destructive" className="text-xs">Severe</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Consequences */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-yellow-100 text-yellow-800 border-yellow-300">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Enforcement
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Consequences of Violations
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We take fair play seriously. Violations of our policy will result in 
                appropriate action based on the severity of the offense.
              </p>
            </div>
            <div className="space-y-4">
              {consequences.map((item, index) => (
                <Card key={index} className={`border ${item.color}`}>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm">
                        <span className="font-bold text-lg">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{item.level}</h3>
                        <p className="text-sm opacity-90">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reporting Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageSquare className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">Report Violations</h2>
                    <p className="text-blue-100">Help us maintain a fair platform</p>
                  </div>
                </div>
                <p className="text-blue-100 mb-6">
                  If you suspect any unfair play, policy violations, or suspicious activity, 
                  please report it to us immediately. All reports are kept strictly confidential 
                  and investigated thoroughly by our security team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-3">
                    <Mail className="h-5 w-5" />
                    <span className="font-medium">fairplay@draftiqplay.com</span>
                  </div>
                  <Link href="/contact">
                    <Button className="bg-white text-blue-600 hover:bg-blue-50">
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </div>
              <CardContent className="p-8 bg-white">
                <h3 className="font-bold text-gray-900 mb-4">What to Include in Your Report:</h3>
                <ul className="space-y-3">
                  {[
                    "Username or account details of the suspected violator",
                    "Description of the suspicious activity or violation",
                    "Date and time when you observed the violation",
                    "Any screenshots or evidence you may have",
                    "Contest or match details if applicable",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Award className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Commitment to You
            </h2>
            <p className="text-lg text-emerald-100 mb-8">
              We are dedicated to providing a safe, fair, and enjoyable fantasy cricket 
              experience. Our team continuously works to improve our systems and policies 
              to ensure the highest standards of integrity and fairness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/how-to-play">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-8">
                  Learn How to Play
                </Button>
              </Link>
              <Link href="/terms">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-emerald-700 font-semibold px-8">
                  View Terms & Conditions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
