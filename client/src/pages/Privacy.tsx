import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Shield, 
  Lock,
  Eye,
  Database,
  Share2,
  Cookie,
  Clock,
  Mail,
  UserCheck,
  Server,
  Bell,
  Trash2,
  FileText,
  Globe,
  Key,
  AlertCircle
} from "lucide-react";

export default function Privacy() {
  const lastUpdated = "December 28, 2025";
  
  const sections = [
    {
      id: "introduction",
      icon: FileText,
      title: "1. Introduction",
      content: [
        "LUEUR GRACE PRIVATE LIMITED (\"LUEUR\", \"we\", \"us\", or \"our\") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our fantasy cricket platform.",
        "By accessing or using LUEUR, you consent to the collection, use, and disclosure of your information as described in this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.",
        "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last Updated\" date.",
      ],
    },
    {
      id: "information-collected",
      icon: Database,
      title: "2. Information We Collect",
      content: [
        "Personal Information You Provide:",
        "• Full name and display name",
        "• Email address",
        "• Phone number",
        "• Date of birth",
        "• State and city of residence",
        "• Password (stored in encrypted form)",
        "",
        "Information Collected Automatically:",
        "• Device information (device type, operating system, browser type)",
        "• IP address and approximate location",
        "• Usage data (pages visited, features used, time spent)",
        "• Log data (access times, error logs, referring pages)",
        "• Cookies and similar tracking technologies",
        "",
        "Fantasy Gaming Data:",
        "• Teams created and contest participation history",
        "• Points earned and rankings",
        "• Gaming preferences and patterns",
      ],
    },
    {
      id: "how-we-use",
      icon: Eye,
      title: "3. How We Use Your Information",
      content: [
        "We use the information we collect for the following purposes:",
        "",
        "To Provide Our Services:",
        "• Create and manage your account",
        "• Enable participation in fantasy cricket contests",
        "• Calculate and display points and rankings",
        "• Process and respond to your requests",
        "",
        "To Improve Our Platform:",
        "• Analyze usage patterns and trends",
        "• Develop new features and services",
        "• Fix bugs and improve performance",
        "• Conduct research and analytics",
        "",
        "To Communicate With You:",
        "• Send service-related notifications",
        "• Provide customer support",
        "• Send promotional communications (with your consent)",
        "• Notify you of policy changes",
        "",
        "To Ensure Security:",
        "• Verify your identity and prevent fraud",
        "• Detect and prevent unauthorized access",
        "• Enforce our terms and policies",
        "• Comply with legal obligations",
      ],
    },
    {
      id: "information-sharing",
      icon: Share2,
      title: "4. Information Sharing & Disclosure",
      content: [
        "We do not sell your personal information. We may share your information in the following circumstances:",
        "",
        "Service Providers: We may share information with third-party vendors who provide services on our behalf, such as hosting, analytics, customer support, and email delivery. These providers are contractually obligated to protect your information.",
        "",
        "Legal Requirements: We may disclose information if required by law, court order, or government request, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.",
        "",
        "Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction. We will notify you of any such change.",
        "",
        "With Your Consent: We may share information with third parties when you give us explicit consent to do so.",
        "",
        "Aggregated Data: We may share aggregated, anonymized data that cannot be used to identify you for research, marketing, or other purposes.",
      ],
    },
    {
      id: "cookies",
      icon: Cookie,
      title: "5. Cookies & Tracking Technologies",
      content: [
        "We use cookies and similar tracking technologies to enhance your experience on our platform.",
        "",
        "Types of Cookies We Use:",
        "• Essential Cookies: Required for the platform to function properly (authentication, security)",
        "• Functional Cookies: Remember your preferences and settings",
        "• Analytics Cookies: Help us understand how users interact with our platform",
        "• Performance Cookies: Monitor and improve platform performance",
        "",
        "Managing Cookies: Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or alert you when cookies are being sent. However, disabling cookies may affect the functionality of our platform.",
        "",
        "Do Not Track: Some browsers have a \"Do Not Track\" feature. We currently do not respond to Do Not Track signals.",
      ],
    },
    {
      id: "data-security",
      icon: Lock,
      title: "6. Data Security",
      content: [
        "We implement robust security measures to protect your personal information:",
        "",
        "Technical Safeguards:",
        "• Encryption of data in transit (SSL/TLS) and at rest",
        "• Secure password hashing algorithms",
        "• Regular security audits and vulnerability assessments",
        "• Firewalls and intrusion detection systems",
        "",
        "Organizational Measures:",
        "• Access controls and authentication requirements",
        "• Employee training on data protection",
        "• Incident response procedures",
        "• Regular review of security practices",
        "",
        "Important Note: While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.",
      ],
    },
    {
      id: "data-retention",
      icon: Clock,
      title: "7. Data Retention",
      content: [
        "We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.",
        "",
        "Retention Periods:",
        "• Account Information: Retained while your account is active and for 3 years after account deletion",
        "• Transaction Records: Retained for 7 years for legal and tax compliance",
        "• Usage Data: Retained for 2 years for analytics purposes",
        "• Support Communications: Retained for 3 years after resolution",
        "",
        "Account Deletion: When you request account deletion, we will delete or anonymize your personal information within 30 days, except where retention is required by law or for legitimate business purposes.",
      ],
    },
    {
      id: "your-rights",
      icon: UserCheck,
      title: "8. Your Rights & Choices",
      content: [
        "You have the following rights regarding your personal information:",
        "",
        "Access: You can request a copy of the personal information we hold about you.",
        "",
        "Correction: You can request correction of inaccurate or incomplete information.",
        "",
        "Deletion: You can request deletion of your personal information, subject to legal requirements.",
        "",
        "Data Portability: You can request your data in a structured, machine-readable format.",
        "",
        "Opt-Out: You can opt out of promotional communications at any time.",
        "",
        "Withdraw Consent: Where we rely on consent, you can withdraw it at any time.",
        "",
        "To exercise these rights, please contact us at privacy@lueur.com. We will respond to your request within 30 days.",
      ],
    },
    {
      id: "children",
      icon: AlertCircle,
      title: "9. Children's Privacy",
      content: [
        "LUEUR is not intended for users under 18 years of age. We do not knowingly collect personal information from children under 18.",
        "If we become aware that we have collected personal information from a child under 18, we will take steps to delete that information as soon as possible.",
        "If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately at privacy@lueur.com.",
      ],
    },
    {
      id: "international",
      icon: Globe,
      title: "10. International Data Transfers",
      content: [
        "Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws.",
        "When we transfer your information internationally, we implement appropriate safeguards to ensure your information remains protected in accordance with this Privacy Policy.",
        "By using our services, you consent to the transfer of your information to countries outside your country of residence.",
      ],
    },
    {
      id: "third-party",
      icon: Server,
      title: "11. Third-Party Services",
      content: [
        "Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties.",
        "We encourage you to read the privacy policies of any third-party services you access through our platform.",
        "Third-party services we may use include:",
        "• Cricket data providers for match and player information",
        "• Analytics services for platform improvement",
        "• Cloud hosting providers for data storage",
        "• Email service providers for communications",
      ],
    },
    {
      id: "changes",
      icon: Bell,
      title: "12. Changes to This Policy",
      content: [
        "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.",
        "When we make material changes, we will:",
        "• Update the \"Last Updated\" date at the top of this policy",
        "• Notify you via email or through the platform",
        "• Obtain your consent where required by law",
        "We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.",
      ],
    },
  ];

  const dataRights = [
    { icon: Eye, title: "Access", description: "Request a copy of your data" },
    { icon: FileText, title: "Correction", description: "Update inaccurate information" },
    { icon: Trash2, title: "Deletion", description: "Request data removal" },
    { icon: Share2, title: "Portability", description: "Export your data" },
    { icon: Bell, title: "Opt-Out", description: "Unsubscribe from communications" },
    { icon: Key, title: "Consent", description: "Withdraw consent anytime" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700/20 to-indigo-600/20 opacity-50"></div>
        <div className="container py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              Your Privacy Matters
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-purple-100 mb-6">
              We are committed to protecting your privacy and ensuring the security 
              of your personal information. Learn how we collect, use, and safeguard your data.
            </p>
            <div className="flex items-center justify-center gap-2 text-purple-200">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Last Updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Your Rights Summary */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Your Data Rights at a Glance</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {dataRights.map((right, index) => (
                <Card key={index} className="border border-gray-200 hover:border-purple-300 transition-colors">
                  <CardContent className="p-4 text-center">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
                      <right.icon className="h-5 w-5 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm">{right.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{right.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Quick Navigation</h2>
            <div className="flex flex-wrap gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-sm px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-gray-600 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-colors"
                >
                  {section.title.split('. ')[1]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => (
              <Card key={index} id={section.id} className="border border-gray-200 scroll-mt-24">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <section.icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 pt-2">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-3 text-gray-600 leading-relaxed pl-0 md:pl-16">
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
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                    <Mail className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Privacy Questions?</h2>
                    <p className="text-purple-100">Contact our Privacy Team</p>
                  </div>
                </div>
                <p className="text-purple-100 mb-6">
                  If you have any questions about this Privacy Policy or wish to exercise 
                  your data rights, please contact our dedicated privacy team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-3">
                    <Mail className="h-5 w-5" />
                    <span className="font-medium">privacy@lueur.com</span>
                  </div>
                  <Link href="/contact">
                    <Button className="bg-white text-purple-600 hover:bg-purple-50">
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </div>
              <CardContent className="p-8 bg-white">
                <h3 className="font-bold text-gray-900 mb-4">Data Protection Officer</h3>
                <p className="text-gray-600 mb-4">
                  For privacy-related inquiries, you can also reach our Data Protection Officer:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 font-semibold">LUEUR GRACE PRIVATE LIMITED</p>
                  <p className="text-gray-600 text-sm mt-2">Email: dpo@lueur.com</p>
                  <p className="text-gray-600 text-sm">Response Time: Within 30 days</p>
                </div>
              </CardContent>
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
              <Link href="/terms">
                <Card className="border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <FileText className="h-8 w-8 mx-auto mb-3 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">Terms & Conditions</h3>
                    <p className="text-sm text-gray-500 mt-1">Usage terms and rules</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/fair-play">
                <Card className="border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Shield className="h-8 w-8 mx-auto mb-3 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">Fair Play Policy</h3>
                    <p className="text-sm text-gray-500 mt-1">Our commitment to fairness</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/responsible-gaming">
                <Card className="border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Lock className="h-8 w-8 mx-auto mb-3 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">Responsible Gaming</h3>
                    <p className="text-sm text-gray-500 mt-1">Play responsibly</p>
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
