import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function Terms() {
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
              Terms & Conditions
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
                Welcome to LUEUR, a free-to-play fantasy cricket platform operated by 
                LUEUR GRACE PRIVATE LIMITED ("Company", "we", "us", or "our"). These 
                Terms and Conditions ("Terms") govern your use of our website located 
                at www.draftiqplay.com and our fantasy cricket services.
              </p>
              <p>
                By accessing or using our platform, you agree to be bound by these Terms. 
                If you do not agree with any part of these Terms, you must not use our services.
              </p>

              <h2>2. Eligibility</h2>
              <p>To use LUEUR, you must:</p>
              <ul>
                <li>Be at least 18 years of age</li>
                <li>Be a resident of India</li>
                <li>Not be a resident of Telangana, Andhra Pradesh, Assam, or Odisha</li>
                <li>Have the legal capacity to enter into a binding agreement</li>
                <li>Not be prohibited by any applicable law from using our services</li>
              </ul>

              <h2>3. Free-to-Play Platform</h2>
              <p>
                LUEUR is a 100% free-to-play fantasy cricket platform. We explicitly state that:
              </p>
              <ul>
                <li>No real money is involved in any contest or game</li>
                <li>There are no entry fees for any contest</li>
                <li>There are no cash prizes or monetary rewards</li>
                <li>No deposits or withdrawals are required or possible</li>
                <li>The platform is designed purely for entertainment purposes</li>
              </ul>

              <h2>4. Account Registration</h2>
              <p>
                To access certain features, you must create an account. You agree to:
              </p>
              <ul>
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information as needed</li>
                <li>Keep your password confidential and secure</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>

              <h2>5. User Conduct</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Create multiple accounts</li>
                <li>Share your account with others</li>
                <li>Use automated systems, bots, or scripts</li>
                <li>Engage in collusion or unfair practices</li>
                <li>Exploit bugs or system errors</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Attempt to circumvent geographic restrictions</li>
              </ul>

              <h2>6. Fantasy Cricket Rules</h2>
              <p>
                By participating in fantasy cricket contests, you agree to:
              </p>
              <ul>
                <li>Follow all contest rules and team composition requirements</li>
                <li>Accept the fantasy points system as published</li>
                <li>Acknowledge that points are calculated based on official cricket data</li>
                <li>Accept final decisions regarding scoring and rankings</li>
              </ul>

              <h2>7. Intellectual Property</h2>
              <p>
                All content on LUEUR, including but not limited to text, graphics, logos, 
                images, and software, is the property of LUEUR GRACE PRIVATE LIMITED or 
                its licensors and is protected by intellectual property laws.
              </p>

              <h2>8. Third-Party Services</h2>
              <p>
                Our platform may use third-party services for cricket data and other 
                functionalities. We are not responsible for the accuracy, availability, 
                or reliability of such third-party services.
              </p>

              <h2>9. Disclaimer of Warranties</h2>
              <p>
                LUEUR is provided "as is" and "as available" without warranties of any kind, 
                either express or implied. We do not guarantee that the service will be 
                uninterrupted, secure, or error-free.
              </p>

              <h2>10. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, LUEUR GRACE PRIVATE LIMITED shall 
                not be liable for any indirect, incidental, special, consequential, or 
                punitive damages arising from your use of the platform.
              </p>

              <h2>11. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your account at any time, 
                with or without cause, with or without notice. You may also delete your 
                account at any time by contacting our support team.
              </p>

              <h2>12. Geographic Restrictions</h2>
              <p>
                LUEUR is not available to residents of Telangana, Andhra Pradesh, Assam, 
                and Odisha. Users from these states are prohibited from registering or 
                using our services. We reserve the right to verify user location and 
                terminate accounts that violate this restriction.
              </p>

              <h2>13. Changes to Terms</h2>
              <p>
                We may update these Terms from time to time. We will notify users of 
                significant changes through email or platform notifications. Continued 
                use of the platform after changes constitutes acceptance of the new Terms.
              </p>

              <h2>14. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the 
                laws of India. Any disputes arising from these Terms shall be subject 
                to the exclusive jurisdiction of the courts in India.
              </p>

              <h2>15. Contact Information</h2>
              <p>
                For questions about these Terms, please contact us at:
              </p>
              <ul>
                <li>Email: legal@draftiqplay.com</li>
                <li>Company: LUEUR GRACE PRIVATE LIMITED</li>
              </ul>

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  By using LUEUR, you acknowledge that you have read, understood, and 
                  agree to be bound by these Terms and Conditions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
