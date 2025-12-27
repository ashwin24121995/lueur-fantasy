import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Scale, 
  Eye, 
  Lock, 
  AlertTriangle,
  CheckCircle,
  Ban,
  FileText
} from "lucide-react";

export default function FairPlay() {
  const principles = [
    {
      icon: Scale,
      title: "Equal Opportunity",
      description: "Every user has an equal chance to participate and succeed. Our platform does not favor any user over another.",
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "All rules, scoring systems, and contest mechanics are clearly documented and accessible to all users.",
    },
    {
      icon: Lock,
      title: "Data Integrity",
      description: "We use official cricket data sources to ensure accurate and unbiased scoring for all fantasy points.",
    },
    {
      icon: Shield,
      title: "Anti-Fraud Measures",
      description: "We employ advanced systems to detect and prevent fraudulent activities, multiple accounts, and collusion.",
    },
  ];

  const prohibitedActivities = [
    {
      title: "Multiple Accounts",
      description: "Creating or operating more than one account per user is strictly prohibited.",
    },
    {
      title: "Collusion",
      description: "Coordinating with other users to gain unfair advantages in contests is not allowed.",
    },
    {
      title: "Automated Systems",
      description: "Using bots, scripts, or automated tools to create teams or participate in contests is forbidden.",
    },
    {
      title: "Information Manipulation",
      description: "Providing false information during registration or account management is prohibited.",
    },
    {
      title: "Account Sharing",
      description: "Sharing account credentials or allowing others to access your account is not permitted.",
    },
    {
      title: "Exploiting Bugs",
      description: "Taking advantage of system errors or bugs for personal gain is strictly prohibited.",
    },
  ];

  const scoringPrinciples = [
    "Points are calculated based on official match data from trusted cricket data providers",
    "All scoring rules are published and available to users before contest entry",
    "Point calculations are automated to eliminate human bias",
    "Any scoring disputes are reviewed and resolved transparently",
    "Historical point data is maintained for verification purposes",
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 lueur-gradient opacity-10" />
        <div className="container py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 lueur-gradient text-white">Fair Play Policy</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Fair Play at <span className="lueur-text-gradient">LUEUR</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We are committed to maintaining a fair and transparent platform where 
              every user can enjoy fantasy cricket on equal terms.
            </p>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Fair Play Principles</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide how we operate and ensure fairness for all users.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {principles.map((item, index) => (
              <Card key={index} className="lueur-card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full lueur-gradient flex-shrink-0 flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Scoring Transparency */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Transparent Scoring System</h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  How We Ensure Fair Scoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {scoringPrinciples.map((principle, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{principle}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Prohibited Activities */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Prohibited Activities</h2>
            <p className="text-center text-muted-foreground mb-8">
              The following activities are strictly prohibited and may result in account suspension or termination.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prohibitedActivities.map((activity, index) => (
                <Card key={index} className="border-red-100">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-sm mb-1">{activity.title}</h3>
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
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
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <AlertTriangle className="h-6 w-6" />
                  Consequences of Violations
                </CardTitle>
              </CardHeader>
              <CardContent className="text-yellow-700">
                <p className="mb-4">
                  Violations of our Fair Play Policy may result in the following actions:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-600" />
                    Warning and notification of the violation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-600" />
                    Temporary suspension of account privileges
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-600" />
                    Disqualification from ongoing contests
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-600" />
                    Permanent account termination for severe or repeated violations
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reporting */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Report Violations</h2>
            <p className="text-muted-foreground mb-8">
              If you suspect any unfair play or policy violations, please report them to us. 
              We take all reports seriously and investigate thoroughly.
            </p>
            <Card className="lueur-gradient text-white">
              <CardContent className="py-8">
                <Shield className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Help Us Maintain Fair Play</h3>
                <p className="text-white/80 mb-4">
                  Report any suspicious activity to: <strong>fairplay@draftiqplay.com</strong>
                </p>
                <p className="text-sm text-white/60">
                  All reports are kept confidential and investigated promptly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
