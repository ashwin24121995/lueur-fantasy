import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { HelpCircle, Mail, ArrowRight } from "lucide-react";

export default function FAQ() {
  const faqCategories = [
    {
      title: "Getting Started",
      questions: [
        {
          q: "What is LUEUR?",
          a: "LUEUR is a free-to-play fantasy cricket platform operated by LUEUR GRACE PRIVATE LIMITED. You can create your dream cricket team, compete in contests, and enjoy fantasy cricket without any monetary investment.",
        },
        {
          q: "Is LUEUR free to use?",
          a: "Yes, LUEUR is 100% free to play. There are no entry fees, no deposits required, and no real money involved. All contests are free to join.",
        },
        {
          q: "How do I create an account?",
          a: "Click on the 'Register' button, fill in your details including name, email, date of birth, and state. You must be 18 years or older to register. After verification, you can start playing immediately.",
        },
        {
          q: "What are the age requirements?",
          a: "You must be 18 years of age or older to register and use LUEUR. We verify age during registration through date of birth validation.",
        },
      ],
    },
    {
      title: "Playing Fantasy Cricket",
      questions: [
        {
          q: "How do I create a fantasy team?",
          a: "Select an upcoming match, choose 11 players from both teams (following the composition rules), select your Captain and Vice-Captain, and join a contest. Your team will earn points based on the real performance of your selected players.",
        },
        {
          q: "What are the team composition rules?",
          a: "Your team must have 11 players with: minimum 1 Wicket-Keeper, minimum 3 Batsmen, minimum 1 All-Rounder, minimum 3 Bowlers. You can select a maximum of 7 players from any single team.",
        },
        {
          q: "What is Captain and Vice-Captain?",
          a: "Captain earns 2x (double) the fantasy points, and Vice-Captain earns 1.5x the fantasy points. Choose players you expect to perform exceptionally well in the match.",
        },
        {
          q: "How are fantasy points calculated?",
          a: "Points are calculated based on real match performance including runs scored, wickets taken, catches, stumpings, and other cricket actions. The detailed points system is available on our 'How to Play' page.",
        },
        {
          q: "Can I edit my team after creating it?",
          a: "You can edit your team until the match starts. Once the match begins, your team is locked and cannot be modified.",
        },
      ],
    },
    {
      title: "Contests & Leaderboards",
      questions: [
        {
          q: "How do contests work?",
          a: "Contests are competitions where multiple users participate with their fantasy teams. Points are calculated based on player performance, and rankings are displayed on the leaderboard.",
        },
        {
          q: "Are there any prizes?",
          a: "LUEUR is a free-to-play platform with no cash prizes or rewards. The platform is designed purely for entertainment and the joy of competing with friends and other cricket fans.",
        },
        {
          q: "How is the leaderboard calculated?",
          a: "The leaderboard ranks users based on total fantasy points earned by their team. In case of a tie, the user who created their team first is ranked higher.",
        },
      ],
    },
    {
      title: "Account & Security",
      questions: [
        {
          q: "How do I reset my password?",
          a: "Click on 'Forgot Password' on the login page, enter your registered email address, and follow the instructions sent to your email to reset your password.",
        },
        {
          q: "Can I have multiple accounts?",
          a: "No, each user is allowed only one account. Creating multiple accounts is a violation of our Fair Play Policy and may result in account suspension.",
        },
        {
          q: "How is my data protected?",
          a: "We use industry-standard security measures to protect your personal information. Please refer to our Privacy Policy for detailed information about data handling.",
        },
        {
          q: "How do I delete my account?",
          a: "Contact our support team at support@draftiqplay.com to request account deletion. Please note that this action is irreversible.",
        },
      ],
    },
    {
      title: "Geographic Restrictions",
      questions: [
        {
          q: "Why is LUEUR not available in some states?",
          a: "Due to state regulations, LUEUR is not available in Telangana, Andhra Pradesh, Assam, and Odisha. We comply with all applicable laws and regulations.",
        },
        {
          q: "What happens if I try to register from a restricted state?",
          a: "Registration from restricted states (Telangana, Andhra Pradesh, Assam, Odisha) is not permitted. Users attempting to register from these states will not be able to create an account.",
        },
      ],
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 lueur-gradient opacity-10" />
        <div className="container py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 lueur-gradient text-white">Help Center</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about LUEUR fantasy cricket platform.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${categoryIndex}-${faqIndex}`}
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <Card className="lueur-gradient text-white">
              <CardContent className="py-8">
                <Mail className="h-12 w-12 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Still Have Questions?</h2>
                <p className="text-white/80 mb-6">
                  Can't find the answer you're looking for? Our support team is here to help.
                </p>
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
