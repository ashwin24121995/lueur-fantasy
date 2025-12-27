import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Shield, Target, Heart, Zap } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Shield,
      title: "Fair Play",
      description: "We ensure a level playing field for all participants with transparent scoring and rules.",
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building a passionate community of cricket enthusiasts who share their love for the game.",
    },
    {
      icon: Heart,
      title: "Responsible Gaming",
      description: "Promoting healthy gaming habits with our free-to-play model and educational resources.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Continuously improving our platform with the latest technology and features.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 lueur-gradient opacity-10" />
        <div className="container py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 lueur-gradient text-white">About Us</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="lueur-text-gradient">LUEUR</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              India's premier free-to-play fantasy cricket platform, 
              brought to you by LUEUR GRACE PRIVATE LIMITED.
            </p>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    LUEUR was founded with a simple mission: to bring the excitement of 
                    fantasy cricket to every cricket fan in India, completely free of charge.
                  </p>
                  <p>
                    We believe that fantasy sports should be accessible to everyone, 
                    regardless of their financial situation. That's why we've created a 
                    platform where you can enjoy the thrill of building your dream team 
                    and competing with friends without any monetary investment.
                  </p>
                  <p>
                    Our team consists of passionate cricket lovers and technology experts 
                    who work tirelessly to provide you with the best fantasy cricket 
                    experience possible.
                  </p>
                </div>
              </div>
              <div className="relative">
                <Card className="lueur-gradient text-white">
                  <CardContent className="p-8">
                    <Trophy className="h-12 w-12 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">LUEUR GRACE</h3>
                    <p className="text-white/80 mb-4">PRIVATE LIMITED</p>
                    <div className="space-y-2 text-sm text-white/70">
                      <p>Registered Company in India</p>
                      <p>Free-to-Play Fantasy Sports Platform</p>
                      <p>No Real Money Gaming</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="lueur-card-hover">
                <CardContent className="p-8">
                  <Target className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To democratize fantasy cricket by providing a free, fair, and 
                    engaging platform where every cricket fan can showcase their 
                    knowledge and compete with others without any financial barriers.
                  </p>
                </CardContent>
              </Card>
              <Card className="lueur-card-hover">
                <CardContent className="p-8">
                  <Trophy className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To become India's most trusted and loved free-to-play fantasy 
                    cricket platform, fostering a community of millions of cricket 
                    enthusiasts who play responsibly and enjoy the game.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at LUEUR.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="text-center lueur-card-hover">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full lueur-gradient mx-auto mb-4 flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Free to Play Commitment */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-green-100 text-green-800">Our Commitment</Badge>
            <h2 className="text-3xl font-bold mb-6">100% Free to Play</h2>
            <p className="text-lg text-muted-foreground mb-8">
              LUEUR is and will always be a free-to-play platform. We do not involve 
              any real money transactions, betting, or gambling. Our platform is 
              designed purely for entertainment and to celebrate the love of cricket.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg bg-background">
                <p className="font-semibold text-primary">No Entry Fees</p>
                <p className="text-sm text-muted-foreground">All contests are free to join</p>
              </div>
              <div className="p-4 rounded-lg bg-background">
                <p className="font-semibold text-primary">No Cash Prizes</p>
                <p className="text-sm text-muted-foreground">Play for fun and bragging rights</p>
              </div>
              <div className="p-4 rounded-lg bg-background">
                <p className="font-semibold text-primary">No Deposits</p>
                <p className="text-sm text-muted-foreground">Never ask for money</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
