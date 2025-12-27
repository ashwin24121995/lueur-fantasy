import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function Privacy() {
  const lastUpdated = "December 28, 2024";

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 lueur-gradient opacity-10" />
        <div className="container py-16 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 lueur-gradient text-white">Legal</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8 prose prose-gray max-w-none">
              <h2>1. Introduction</h2>
              <p>
                LUEUR GRACE PRIVATE LIMITED ("Company", "we", "us", or "our") is committed 
                to protecting your privacy. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our fantasy 
                cricket platform at www.draftiqplay.com.
              </p>

              <h2>2. Information We Collect</h2>
              <h3>2.1 Personal Information</h3>
              <p>When you register for an account, we collect:</p>
              <ul>
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number (optional)</li>
                <li>Date of birth (for age verification)</li>
                <li>State and city of residence</li>
                <li>Password (stored in encrypted form)</li>
              </ul>

              <h3>2.2 Usage Information</h3>
              <p>We automatically collect:</p>
              <ul>
                <li>Device information (browser type, operating system)</li>
                <li>IP address</li>
                <li>Pages visited and features used</li>
                <li>Time spent on the platform</li>
                <li>Contest participation history</li>
                <li>Team creation and selection data</li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>We use the collected information to:</p>
              <ul>
                <li>Create and manage your account</li>
                <li>Verify your age and geographic eligibility</li>
                <li>Provide and improve our fantasy cricket services</li>
                <li>Send important notifications about your account</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Detect and prevent fraud and abuse</li>
                <li>Comply with legal obligations</li>
                <li>Analyze usage patterns to improve user experience</li>
              </ul>

              <h2>4. Information Sharing</h2>
              <p>We do not sell your personal information. We may share your information with:</p>
              <ul>
                <li>Service providers who assist in operating our platform</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners for analytics purposes (anonymized data only)</li>
              </ul>

              <h2>5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect 
                your personal information, including:
              </p>
              <ul>
                <li>Encryption of sensitive data (passwords, personal details)</li>
                <li>Secure HTTPS connections</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Secure data storage practices</li>
              </ul>

              <h2>6. Data Retention</h2>
              <p>
                We retain your personal information for as long as your account is active 
                or as needed to provide services. We may retain certain information for 
                legal compliance, dispute resolution, and enforcement purposes.
              </p>

              <h2>7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your account and data</li>
                <li>Opt-out of marketing communications</li>
                <li>Lodge a complaint with relevant authorities</li>
              </ul>

              <h2>8. Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to enhance your experience, 
                remember your preferences, and analyze platform usage. You can control 
                cookie settings through your browser preferences.
              </p>

              <h2>9. Children's Privacy</h2>
              <p>
                LUEUR is not intended for users under 18 years of age. We do not knowingly 
                collect information from children. If we discover that a child has provided 
                us with personal information, we will delete it immediately.
              </p>

              <h2>10. Geographic Restrictions</h2>
              <p>
                We collect state information to enforce geographic restrictions. Users from 
                Telangana, Andhra Pradesh, Assam, and Odisha are not permitted to use our 
                services due to regulatory requirements.
              </p>

              <h2>11. Third-Party Links</h2>
              <p>
                Our platform may contain links to third-party websites. We are not responsible 
                for the privacy practices of these external sites. We encourage you to review 
                their privacy policies.
              </p>

              <h2>12. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of 
                significant changes through email or platform notifications. The updated 
                policy will be effective upon posting.
              </p>

              <h2>13. Contact Us</h2>
              <p>
                For questions or concerns about this Privacy Policy or our data practices, 
                please contact us at:
              </p>
              <ul>
                <li>Email: privacy@draftiqplay.com</li>
                <li>Company: LUEUR GRACE PRIVATE LIMITED</li>
              </ul>

              <h2>14. Grievance Officer</h2>
              <p>
                In accordance with the Information Technology Act, 2000 and rules made 
                thereunder, the name and contact details of the Grievance Officer are:
              </p>
              <ul>
                <li>Email: grievance@draftiqplay.com</li>
                <li>Response Time: Within 24 hours of receiving the complaint</li>
              </ul>

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  By using LUEUR, you consent to the collection and use of your information 
                  as described in this Privacy Policy.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
