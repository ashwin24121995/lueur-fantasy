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
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useState } from "react";
import { 
  HelpCircle, 
  Mail, 
  ArrowRight, 
  Search,
  Users,
  Trophy,
  Shield,
  CreditCard,
  Settings,
  MapPin,
  Gamepad2,
  BookOpen
} from "lucide-react";

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      title: "Getting Started",
      icon: Gamepad2,
      color: "emerald",
      questions: [
        {
          q: "What is LUEUR?",
          a: "LUEUR is India's premier free-to-play fantasy cricket platform operated by LUEUR GRACE PRIVATE LIMITED. Our platform allows cricket enthusiasts to create their dream cricket teams, compete in contests, and enjoy the thrill of fantasy cricket without any monetary investment. We cover all major cricket leagues including IPL, international matches, Big Bash League, and more.",
        },
        {
          q: "Is LUEUR completely free to use?",
          a: "Yes, LUEUR is 100% free to play. There are absolutely no entry fees, no deposits required, and no real money involved at any stage. All contests are free to join, and we don't offer any cash prizes. Our platform is designed purely for entertainment and the love of cricket.",
        },
        {
          q: "How do I create an account on LUEUR?",
          a: "Creating an account is simple: Click on the 'Register' button on our homepage, fill in your details including your full name, email address, phone number, date of birth, and state of residence. You must be 18 years or older to register. After completing the registration form and agreeing to our terms, your account will be created instantly and you can start playing immediately.",
        },
        {
          q: "What are the eligibility requirements to use LUEUR?",
          a: "To use LUEUR, you must: (1) Be 18 years of age or older, (2) Be a resident of India, (3) Not reside in restricted states (Telangana, Andhra Pradesh, Assam, Odisha, Nagaland, and Sikkim), (4) Have a valid email address and phone number, (5) Agree to our Terms & Conditions and Privacy Policy.",
        },
        {
          q: "Do I need to download an app to use LUEUR?",
          a: "No, LUEUR is a web-based platform that works directly in your browser. You can access it from any device - desktop, laptop, tablet, or mobile phone - without downloading any app. Simply visit our website and start playing. Our platform is fully responsive and optimized for all screen sizes.",
        },
      ],
    },
    {
      title: "Creating Fantasy Teams",
      icon: Users,
      color: "blue",
      questions: [
        {
          q: "How do I create a fantasy cricket team?",
          a: "To create a fantasy team: (1) Browse upcoming matches on the Fantasy Cricket page, (2) Select a match you want to play, (3) Choose 11 players from both teams following the composition rules, (4) Select your Captain (2x points) and Vice-Captain (1.5x points), (5) Give your team a name, (6) Confirm and submit your team. Your team will earn points based on the real-life performance of your selected players during the match.",
        },
        {
          q: "What are the team composition rules?",
          a: "Your fantasy team must consist of exactly 11 players with the following minimum requirements: At least 1 Wicket-Keeper (WK), At least 3 Batsmen (BAT), At least 1 All-Rounder (AR), At least 3 Bowlers (BOWL). Additionally, you can select a maximum of 7 players from any single team. This ensures balanced team composition and strategic selection.",
        },
        {
          q: "What is the role of Captain and Vice-Captain?",
          a: "Captain and Vice-Captain are special designations that multiply the fantasy points earned by those players. Your Captain earns 2x (double) the fantasy points for their performance, while your Vice-Captain earns 1.5x the fantasy points. Choose players you expect to perform exceptionally well in the match for these roles, as they can significantly impact your total score.",
        },
        {
          q: "Can I create multiple teams for the same match?",
          a: "Currently, you can create one team per match. This ensures fair competition and encourages strategic thinking in team selection. Make sure to carefully consider your player choices before finalizing your team.",
        },
        {
          q: "Can I edit my team after creating it?",
          a: "Yes, you can edit your team until the match officially starts (toss time). Once the match begins, your team is locked and cannot be modified. We recommend finalizing your team at least 15 minutes before the match start time to avoid any last-minute issues.",
        },
        {
          q: "What happens if a player I selected doesn't play?",
          a: "If a player you selected doesn't play in the actual match (not in the playing XI), they will earn 0 points. There is no automatic substitution. This is why it's important to stay updated with team news and playing XI announcements before the match.",
        },
      ],
    },
    {
      title: "Points & Scoring",
      icon: Trophy,
      color: "amber",
      questions: [
        {
          q: "How are fantasy points calculated?",
          a: "Fantasy points are calculated based on the real-life performance of players during the match. Points are awarded for: Runs scored, Wickets taken, Catches and stumpings, Run-outs, Maiden overs, Strike rate bonuses/penalties, Economy rate bonuses/penalties, and various other cricket actions. The detailed points system varies by format (T20, ODI, Test) and is available on our 'How to Play' page.",
        },
        {
          q: "When are the points updated?",
          a: "Points are updated in real-time during the match as events occur. You can track your team's performance live on the match page. Final points are confirmed after the match ends and any official corrections are made by the cricket authorities.",
        },
        {
          q: "What is the points system for T20 matches?",
          a: "For T20 matches, key scoring includes: Runs (1 point per run), Boundaries (1 bonus for 4, 2 bonus for 6), Half-century (8 bonus), Century (16 bonus), Wickets (25 points each), Maiden overs (12 points), Catches (8 points), Stumpings (12 points), Run-outs (12 points). Strike rate and economy bonuses/penalties also apply based on minimum balls/overs criteria.",
        },
        {
          q: "Are there negative points?",
          a: "Yes, negative points can be awarded in certain situations: Duck (0 runs and out) for batsmen (-2 points), Poor strike rate (below 70 in T20s after minimum balls), Poor economy rate (above 10 in T20s after minimum overs). This adds strategic depth to team selection.",
        },
      ],
    },
    {
      title: "Contests & Leaderboards",
      icon: Trophy,
      color: "purple",
      questions: [
        {
          q: "How do contests work on LUEUR?",
          a: "Contests are competitions where multiple users participate with their fantasy teams for the same match. All participants' teams earn points based on player performance, and rankings are displayed on the leaderboard. Since LUEUR is free-to-play, all contests are free to join with no entry fees.",
        },
        {
          q: "Are there any prizes for winning contests?",
          a: "LUEUR is a completely free-to-play platform with no cash prizes, rewards, or any form of monetary compensation. The platform is designed purely for entertainment, the joy of competition, and the satisfaction of testing your cricket knowledge against other fans. Your reward is the thrill of the game!",
        },
        {
          q: "How is the leaderboard calculated?",
          a: "The leaderboard ranks all participants based on the total fantasy points earned by their teams. Rankings are updated in real-time during the match. In case of a tie (same total points), the user who created and submitted their team first is ranked higher.",
        },
        {
          q: "Can I see other users' teams?",
          a: "You can view other users' teams only after the match has started and teams are locked. Before the match, all team selections are private to maintain fair competition and prevent copying.",
        },
      ],
    },
    {
      title: "Account & Security",
      icon: Shield,
      color: "red",
      questions: [
        {
          q: "How do I reset my password?",
          a: "To reset your password: (1) Click on 'Forgot Password' on the login page, (2) Enter your registered email address, (3) Check your email for a password reset link (check spam folder if not in inbox), (4) Click the link and create a new password, (5) Log in with your new password. The reset link expires after 24 hours for security.",
        },
        {
          q: "Can I have multiple accounts?",
          a: "No, each user is allowed only one account on LUEUR. Creating multiple accounts is a serious violation of our Fair Play Policy and Terms of Service. Users found with multiple accounts may face immediate suspension or permanent ban from the platform.",
        },
        {
          q: "How is my personal data protected?",
          a: "We take data protection seriously and implement industry-standard security measures including: Encrypted data transmission (SSL/TLS), Secure password hashing, Regular security audits, Limited data access on need-to-know basis, Compliance with applicable data protection laws. Please refer to our Privacy Policy for detailed information.",
        },
        {
          q: "How do I update my profile information?",
          a: "You can update your profile information by: (1) Logging into your account, (2) Going to your Dashboard, (3) Clicking on Profile or Settings, (4) Updating the desired fields, (5) Saving your changes. Note that some information like email and date of birth may require verification to change.",
        },
        {
          q: "How do I delete my account?",
          a: "To delete your account, please contact our support team at support@draftiqplay.com with your registered email address and request for account deletion. Please note that account deletion is permanent and irreversible. All your data, teams, and history will be permanently removed.",
        },
      ],
    },
    {
      title: "Geographic Restrictions",
      icon: MapPin,
      color: "orange",
      questions: [
        {
          q: "Why is LUEUR not available in some Indian states?",
          a: "Due to varying state regulations regarding online gaming and fantasy sports, LUEUR is not available in certain states. We strictly comply with all applicable laws and regulations. The restricted states are: Telangana, Andhra Pradesh, Assam, Odisha, Nagaland, and Sikkim. We continuously monitor regulatory changes and may update this list accordingly.",
        },
        {
          q: "What happens if I try to register from a restricted state?",
          a: "Registration from restricted states is not permitted. If you attempt to register from Telangana, Andhra Pradesh, Assam, Odisha, Nagaland, or Sikkim, you will not be able to create an account. We verify the state of residence during registration to ensure compliance.",
        },
        {
          q: "Can I use LUEUR if I travel to a restricted state?",
          a: "If you have an existing account and temporarily travel to a restricted state, you should refrain from using the platform while in that state to comply with local regulations. We recommend checking local laws before using any online gaming platform.",
        },
        {
          q: "Is LUEUR available outside India?",
          a: "Currently, LUEUR is designed for users residing in India (except restricted states). International access may be limited, and we recommend users outside India to check if they can legally access fantasy sports platforms in their jurisdiction.",
        },
      ],
    },
    {
      title: "Technical Support",
      icon: Settings,
      color: "gray",
      questions: [
        {
          q: "The website is not loading properly. What should I do?",
          a: "If you're experiencing loading issues: (1) Clear your browser cache and cookies, (2) Try a different browser (Chrome, Firefox, Safari recommended), (3) Check your internet connection, (4) Disable browser extensions that might interfere, (5) Try accessing from a different device. If issues persist, contact our support team.",
        },
        {
          q: "I'm not receiving emails from LUEUR. What should I do?",
          a: "If you're not receiving our emails: (1) Check your spam/junk folder, (2) Add support@draftiqplay.com to your contacts, (3) Verify your email address is correct in your profile, (4) Check if your email provider is blocking our domain, (5) Contact support if issues continue.",
        },
        {
          q: "The match points are not updating. Is this normal?",
          a: "Points are updated in real-time, but there may be occasional delays due to: Official scoring delays from the match, Server processing during high traffic, Data verification processes. If points haven't updated for an extended period, please contact support.",
        },
        {
          q: "How do I report a bug or technical issue?",
          a: "To report a bug: (1) Go to our Contact page, (2) Select 'Technical Support' as the category, (3) Describe the issue in detail including what you were doing when it occurred, (4) Include screenshots if possible, (5) Mention your device and browser information. Our technical team will investigate and respond within 24 hours.",
        },
      ],
    },
  ];

  // Filter FAQs based on search query
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      emerald: { bg: "bg-emerald-100", text: "text-emerald-600", border: "border-emerald-200" },
      blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200" },
      amber: { bg: "bg-amber-100", text: "text-amber-600", border: "border-amber-200" },
      purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200" },
      red: { bg: "bg-red-100", text: "text-red-600", border: "border-red-200" },
      orange: { bg: "bg-orange-100", text: "text-orange-600", border: "border-orange-200" },
      gray: { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-200" },
    };
    return colors[color] || colors.gray;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 text-white">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              Help Center
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 mb-8">
              Find answers to common questions about LUEUR fantasy cricket platform. 
              Can't find what you're looking for? Contact our support team.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg bg-white text-gray-900 border-0 shadow-lg rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 bg-white border-b">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-3">
            {faqCategories.map((category, index) => {
              const colors = getColorClasses(category.color);
              return (
                <a
                  key={index}
                  href={`#${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full ${colors.bg} ${colors.text} text-sm font-medium hover:opacity-80 transition-opacity`}
                >
                  <category.icon className="h-4 w-4" />
                  {category.title}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {searchQuery && filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any FAQs matching "{searchQuery}". Try different keywords or contact support.
                </p>
                <Link href="/contact">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    Contact Support
                  </Button>
                </Link>
              </div>
            )}

            {(searchQuery ? filteredCategories : faqCategories).map((category, categoryIndex) => {
              const colors = getColorClasses(category.color);
              return (
                <div 
                  key={categoryIndex} 
                  id={category.title.toLowerCase().replace(/\s+/g, '-')}
                  className="mb-10 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                      <category.icon className={`h-6 w-6 ${colors.text}`} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                    <Badge variant="outline" className={`ml-auto ${colors.border} ${colors.text}`}>
                      {category.questions.length} questions
                    </Badge>
                  </div>
                  
                  <Card className="border border-gray-200 shadow-sm">
                    <CardContent className="p-0">
                      <Accordion type="single" collapsible className="divide-y">
                        {category.questions.map((faq, faqIndex) => (
                          <AccordionItem
                            key={faqIndex}
                            value={`${categoryIndex}-${faqIndex}`}
                            className="border-0"
                          >
                            <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-gray-50 text-gray-900 font-medium">
                              {faq.q}
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                              {faq.a}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Help Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">How To Play Guide</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        New to fantasy cricket? Check out our comprehensive guide to get started.
                      </p>
                      <Link href="/how-to-play">
                        <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-300 hover:bg-emerald-50">
                          Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Fair Play Policy</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Learn about our commitment to fair play and responsible gaming.
                      </p>
                      <Link href="/fair-play">
                        <Button variant="outline" size="sm" className="text-blue-600 border-blue-300 hover:bg-blue-50">
                          View Policy <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
              <Mail className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg text-indigo-100 mb-8">
              Can't find the answer you're looking for? Our support team is here to help you 
              with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold">
                  Contact Support
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="mailto:support@draftiqplay.com">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Mail className="mr-2 h-5 w-5" />
                  Email Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
