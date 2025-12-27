import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Shield, 
  Clock, 
  Users, 
  Heart, 
  AlertTriangle,
  CheckCircle,
  Phone,
  Mail
} from "lucide-react";

export default function ResponsibleGaming() {
  const guidelines = [
    {
      icon: Clock,
      title: "Set Time Limits",
      description: "Allocate specific time for playing fantasy cricket and stick to it. Don't let it interfere with your work, studies, or personal relationships.",
    },
    {
      icon: Users,
      title: "Play for Fun",
      description: "Remember that LUEUR is a free-to-play platform. The primary goal is entertainment and enjoying cricket, not competition.",
    },
    {
      icon: Heart,
      title: "Maintain Balance",
      description: "Keep a healthy balance between fantasy cricket and other activities. Don't neglect your responsibilities or relationships.",
    },
    {
      icon: Shield,
      title: "Protect Your Information",
      description: "Never share your account credentials with others. Keep your personal information secure at all times.",
    },
  ];

  const warningSignsGaming = [
    "Spending excessive time on fantasy sports",
    "Neglecting work, studies, or family responsibilities",
    "Feeling anxious or irritable when not playing",
    "Lying about time spent on fantasy sports",
    "Using fantasy sports as an escape from problems",
    "Difficulty controlling the urge to play",
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 lueur-gradient opacity-10" />
        <div className="container py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 lueur-gradient text-white">Responsible Gaming</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Play Responsibly with <span className="lueur-text-gradient">LUEUR</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              At LUEUR, we are committed to promoting responsible gaming practices. 
              Our platform is designed for entertainment, and we encourage all users 
              to play responsibly.
            </p>
          </div>
        </div>
      </section>

      {/* Free to Play Notice */}
      <section className="py-8">
        <div className="container">
          <Alert className="max-w-3xl mx-auto bg-green-50 border-green-200">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800">100% Free to Play Platform</AlertTitle>
            <AlertDescription className="text-green-700">
              LUEUR is a completely free-to-play fantasy cricket platform. We do not involve 
              any real money transactions, betting, or gambling. All contests are free to join, 
              and there are no cash prizes or deposits required.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Responsible Gaming Guidelines</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow these guidelines to ensure a healthy and enjoyable fantasy cricket experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {guidelines.map((item, index) => (
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

      {/* Age Restriction */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-800">
                  <AlertTriangle className="h-6 w-6" />
                  Age Restriction: 18+ Only
                </CardTitle>
              </CardHeader>
              <CardContent className="text-red-700">
                <p className="mb-4">
                  LUEUR is strictly for users who are 18 years of age or older. 
                  We take this requirement seriously and have implemented measures to verify user age during registration.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Age verification during registration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Date of birth validation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Account suspension for underage users
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Recognize Warning Signs</h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Signs of Unhealthy Gaming Habits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  While LUEUR is free to play, it's important to maintain healthy gaming habits. 
                  Watch out for these warning signs:
                </p>
                <ul className="space-y-3">
                  {warningSignsGaming.map((sign, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-yellow-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <span className="text-yellow-600 text-sm font-semibold">{index + 1}</span>
                      </div>
                      <span className="text-sm">{sign}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Geo Restrictions */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Geographic Restrictions</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  In compliance with state regulations, LUEUR is not available in the following states:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 rounded-lg bg-red-50 text-center">
                    <p className="font-semibold text-red-800">Telangana</p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-50 text-center">
                    <p className="font-semibold text-red-800">Andhra Pradesh</p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-50 text-center">
                    <p className="font-semibold text-red-800">Assam</p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-50 text-center">
                    <p className="font-semibold text-red-800">Odisha</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Users from these states are not permitted to register or participate in contests on LUEUR.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
            <p className="text-muted-foreground mb-8">
              If you or someone you know is struggling with gaming habits, please reach out for support.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="lueur-card-hover">
                <CardContent className="p-6 text-center">
                  <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Email Support</h3>
                  <p className="text-sm text-muted-foreground">support@draftiqplay.com</p>
                </CardContent>
              </Card>
              <Card className="lueur-card-hover">
                <CardContent className="p-6 text-center">
                  <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Self-Exclusion</h3>
                  <p className="text-sm text-muted-foreground">Contact us to temporarily or permanently disable your account</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
