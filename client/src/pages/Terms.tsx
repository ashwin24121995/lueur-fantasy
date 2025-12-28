import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  FileText, 
  Shield, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Scale,
  Clock,
  Mail,
  BookOpen,
  Gavel,
  Ban,
  CreditCard,
  UserCheck,
  Globe,
  Lock
} from "lucide-react";

export default function Terms() {
  const lastUpdated = "December 28, 2024";
  
  const sections = [
    {
      id: "acceptance",
      icon: CheckCircle,
      title: "1. Acceptance of Terms",
      content: [
        "By accessing or using LUEUR (the \"Platform\"), you agree to be bound by these Terms and Conditions (\"Terms\"). If you do not agree to these Terms, you must not access or use the Platform.",
        "These Terms constitute a legally binding agreement between you and LUEUR GRACE PRIVATE LIMITED. We reserve the right to modify these Terms at any time, and such modifications will be effective immediately upon posting on the Platform.",
        "Your continued use of the Platform following any changes indicates your acceptance of the modified Terms. We encourage you to review these Terms periodically.",
        "By registering an account, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.",
      ],
    },
    {
      id: "eligibility",
      icon: UserCheck,
      title: "2. Eligibility Requirements",
      content: [
        "To use LUEUR, you must be at least 18 years of age or the age of majority in your jurisdiction, whichever is higher.",
        "You must be a resident of India and accessing the Platform from a state where fantasy sports are legal and permitted.",
        "Fantasy sports involving real money are prohibited in the following states: Andhra Pradesh, Assam, Nagaland, Odisha, Sikkim, and Telangana. Users from these states may only participate in free contests.",
        "You must not be an employee, director, or immediate family member of LUEUR GRACE PRIVATE LIMITED or any of its affiliated companies.",
        "You must not be a professional cricketer, team official, match official, or anyone with access to insider information about cricket matches.",
        "You represent that all information provided during registration is accurate, current, and complete.",
      ],
    },
    {
      id: "account",
      icon: Users,
      title: "3. Account Registration & Security",
      content: [
        "To access certain features of the Platform, you must create an account by providing accurate and complete information.",
        "You are permitted to maintain only ONE account on LUEUR. Creating multiple accounts is strictly prohibited and will result in immediate termination of all accounts.",
        "You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
        "You must immediately notify us of any unauthorized use of your account or any other security breach.",
        "We reserve the right to suspend or terminate your account if we suspect any fraudulent, abusive, or illegal activity.",
        "Account credentials are non-transferable. You may not sell, transfer, or share your account with any other person.",
      ],
    },
    {
      id: "free-platform",
      icon: FileText,
      title: "4. Free-to-Play Platform",
      content: [
        "LUEUR is a 100% free-to-play fantasy cricket platform. We explicitly state that:",
        "• No real money is involved in any contest or game on our platform",
        "• There are no entry fees for any contest",
        "• There are no cash prizes or monetary rewards",
        "• No deposits or withdrawals are required or possible",
        "• The platform is designed purely for entertainment and skill development purposes",
        "• Users compete for virtual points, rankings, and bragging rights only",
      ],
    },
    {
      id: "fantasy-contests",
      icon: Scale,
      title: "5. Fantasy Contests & Gameplay",
      content: [
        "LUEUR offers fantasy cricket contests where users create virtual teams of real cricket players and earn points based on the actual performance of those players in real matches.",
        "Fantasy sports on LUEUR are games of skill. Success depends predominantly on the user's knowledge, judgment, and attention to the sport.",
        "All contest rules, scoring systems, and ranking structures are published before contest entry and are binding on all participants.",
        "Once a contest deadline passes, team selections are locked and cannot be modified.",
        "We reserve the right to cancel, modify, or suspend any contest at our discretion, including in cases of technical issues, data errors, or insufficient participation.",
        "In the event of match cancellation or abandonment, contest results will be determined based on our published policies for such situations.",
      ],
    },
    {
      id: "prohibited",
      icon: Ban,
      title: "6. Prohibited Conduct",
      content: [
        "You agree not to engage in any of the following prohibited activities:",
        "• Creating multiple accounts or using false identity information",
        "• Using automated systems, bots, or scripts to access the Platform or participate in contests",
        "• Colluding with other users to gain unfair advantages",
        "• Exploiting bugs, glitches, or vulnerabilities in the Platform",
        "• Engaging in any form of match-fixing or insider trading",
        "• Harassing, threatening, or abusing other users or staff",
        "• Attempting to manipulate contest outcomes or rankings",
        "• Violating any applicable laws or regulations",
        "• Circumventing any security measures or access restrictions",
        "Violation of these prohibitions may result in immediate account termination.",
      ],
    },
    {
      id: "intellectual-property",
      icon: Lock,
      title: "7. Intellectual Property Rights",
      content: [
        "All content on the Platform, including but not limited to text, graphics, logos, images, software, and trademarks, is the property of LUEUR GRACE PRIVATE LIMITED or its licensors.",
        "You are granted a limited, non-exclusive, non-transferable license to access and use the Platform for personal, non-commercial purposes.",
        "You may not copy, modify, distribute, sell, or lease any part of the Platform or its content without our express written permission.",
        "Any feedback, suggestions, or ideas you provide to us may be used by us without any obligation to compensate you.",
        "Third-party trademarks, logos, and content displayed on the Platform are the property of their respective owners.",
      ],
    },
    {
      id: "disclaimers",
      icon: AlertTriangle,
      title: "8. Disclaimers & Limitation of Liability",
      content: [
        "THE PLATFORM IS PROVIDED \"AS IS\" AND \"AS AVAILABLE\" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.",
        "We do not guarantee that the Platform will be uninterrupted, error-free, or free from viruses or other harmful components.",
        "We are not responsible for any losses arising from technical failures, data errors, or third-party service interruptions.",
        "TO THE MAXIMUM EXTENT PERMITTED BY LAW, LUEUR GRACE PRIVATE LIMITED SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.",
        "Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability, so some of the above may not apply to you.",
      ],
    },
    {
      id: "indemnification",
      icon: Shield,
      title: "9. Indemnification",
      content: [
        "You agree to indemnify, defend, and hold harmless LUEUR GRACE PRIVATE LIMITED, its officers, directors, employees, agents, and affiliates from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from:",
        "• Your use of the Platform",
        "• Your violation of these Terms",
        "• Your violation of any rights of another party",
        "• Your violation of any applicable laws or regulations",
        "This indemnification obligation will survive the termination of your account and these Terms.",
      ],
    },
    {
      id: "termination",
      icon: Gavel,
      title: "10. Termination",
      content: [
        "We may suspend or terminate your account and access to the Platform at any time, with or without cause, and with or without notice.",
        "You may terminate your account at any time by contacting our support team.",
        "Upon termination, all licenses and rights granted to you under these Terms will immediately cease.",
        "Provisions of these Terms that by their nature should survive termination will survive, including ownership provisions, warranty disclaimers, indemnification, and limitations of liability.",
      ],
    },
    {
      id: "governing-law",
      icon: Globe,
      title: "11. Governing Law & Dispute Resolution",
      content: [
        "These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.",
        "Any disputes arising from these Terms or your use of the Platform shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.",
        "Before initiating any legal proceedings, you agree to first attempt to resolve any dispute informally by contacting us at legal@lueur.com.",
        "Any claim or cause of action arising from your use of the Platform must be filed within one (1) year after such claim or cause of action arose.",
      ],
    },
    {
      id: "general",
      icon: BookOpen,
      title: "12. General Provisions",
      content: [
        "These Terms, together with our Privacy Policy and any other policies referenced herein, constitute the entire agreement between you and LUEUR GRACE PRIVATE LIMITED.",
        "Our failure to enforce any provision of these Terms shall not constitute a waiver of that provision.",
        "If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.",
        "We may assign our rights and obligations under these Terms to any third party without your consent.",
        "You may not assign your rights or obligations under these Terms without our prior written consent.",
        "These Terms do not create any agency, partnership, or joint venture relationship between you and LUEUR.",
      ],
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-700 via-slate-600 to-gray-700 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-gray-600/20 opacity-50"></div>
        <div className="container py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              Legal Document
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms & Conditions
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-6">
              Please read these terms carefully before using LUEUR. By using our platform, 
              you agree to be bound by these terms and conditions.
            </p>
            <div className="flex items-center justify-center gap-2 text-slate-300">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Last Updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Quick Navigation</h2>
            <div className="flex flex-wrap gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-sm px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
                >
                  {section.title.split('. ')[1]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => (
              <Card key={index} id={section.id} className="border border-gray-200 scroll-mt-24">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <section.icon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 pt-2">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-4 text-gray-600 leading-relaxed pl-0 md:pl-16">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className={paragraph.startsWith('•') ? 'pl-4' : ''}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                    <Mail className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Questions About These Terms?</h2>
                    <p className="text-emerald-100">We're here to help</p>
                  </div>
                </div>
                <p className="text-emerald-100 mb-6">
                  If you have any questions or concerns about these Terms and Conditions, 
                  please don't hesitate to contact our legal team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-3">
                    <Mail className="h-5 w-5" />
                    <span className="font-medium">legal@lueur.com</span>
                  </div>
                  <Link href="/contact">
                    <Button className="bg-white text-emerald-600 hover:bg-emerald-50">
                      Contact Support
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
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Related Policies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/privacy">
                <Card className="border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Lock className="h-8 w-8 mx-auto mb-3 text-emerald-600" />
                    <h3 className="font-semibold text-gray-900">Privacy Policy</h3>
                    <p className="text-sm text-gray-500 mt-1">How we handle your data</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/fair-play">
                <Card className="border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Scale className="h-8 w-8 mx-auto mb-3 text-emerald-600" />
                    <h3 className="font-semibold text-gray-900">Fair Play Policy</h3>
                    <p className="text-sm text-gray-500 mt-1">Our commitment to fairness</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/responsible-gaming">
                <Card className="border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Shield className="h-8 w-8 mx-auto mb-3 text-emerald-600" />
                    <h3 className="font-semibold text-gray-900">Responsible Gaming</h3>
                    <p className="text-sm text-gray-500 mt-1">Play responsibly</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Agreement Notice */}
      <section className="py-8 bg-emerald-50 border-t border-emerald-100">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm text-gray-600">
              By using LUEUR, you acknowledge that you have read, understood, and 
              agree to be bound by these Terms and Conditions and our Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
