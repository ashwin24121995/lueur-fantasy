import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Link } from "wouter";
import { 
  Mail, 
  Phone, 
  Send, 
  Loader2, 
  CheckCircle,
  Building,
  Clock,
  MessageSquare,
  HelpCircle,
  FileText,
  Shield,
  Users,
  AlertCircle,
  Globe,
  ArrowRight
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success("Message sent successfully!");
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "For general inquiries and support",
      value: "support@draftiqplay.com",
      action: "mailto:support@draftiqplay.com",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Available Mon-Fri, 9 AM - 6 PM IST",
      value: "Start a conversation",
      action: "#",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "For urgent matters only",
      value: "+91 XXXX XXXX XX",
      action: "tel:+91XXXXXXXXXX",
    },
  ];

  const categories = [
    { value: "general", label: "General Inquiry" },
    { value: "technical", label: "Technical Support" },
    { value: "account", label: "Account Issues" },
    { value: "feedback", label: "Feedback & Suggestions" },
    { value: "partnership", label: "Partnership Inquiry" },
    { value: "media", label: "Media & Press" },
    { value: "fairplay", label: "Fair Play Report" },
    { value: "other", label: "Other" },
  ];

  const quickLinks = [
    {
      icon: HelpCircle,
      title: "FAQ",
      description: "Find answers to common questions",
      href: "/faq",
    },
    {
      icon: FileText,
      title: "How To Play",
      description: "Learn how to use LUEUR",
      href: "/how-to-play",
    },
    {
      icon: Shield,
      title: "Privacy Policy",
      description: "How we protect your data",
      href: "/privacy",
    },
    {
      icon: Users,
      title: "Fair Play",
      description: "Our commitment to fairness",
      href: "/fair-play",
    },
  ];

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
          <div className="container py-16">
            <div className="max-w-md mx-auto">
              <Card className="border-0 shadow-xl">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 mx-auto mb-6 flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Message Sent!</h2>
                  <p className="text-gray-600 mb-8">
                    Thank you for contacting us. We've received your message and will get back to you within 24-48 hours.
                  </p>
                  <div className="space-y-3">
                    <Button onClick={() => setSubmitted(false)} className="w-full bg-emerald-600 hover:bg-emerald-700">
                      Send Another Message
                    </Button>
                    <Link href="/">
                      <Button variant="outline" className="w-full">
                        Back to Home
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 text-white">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              Get In Touch
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-blue-100">
              Have questions, feedback, or need assistance? We're here to help. 
              Reach out to us and we'll respond as quickly as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-white border-b">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => (
              <Card key={index} className="border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-blue-100 flex items-center justify-center">
                    <method.icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{method.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{method.description}</p>
                  <a 
                    href={method.action} 
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    {method.value}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <Card className="border-0 shadow-xl">
                  <CardHeader className="pb-4">
                    <Badge className="w-fit mb-2 bg-blue-100 text-blue-700 border-blue-200">Send a Message</Badge>
                    <CardTitle className="text-2xl text-gray-900">How Can We Help?</CardTitle>
                    <CardDescription className="text-gray-600">
                      Fill out the form below and we'll get back to you within 24-48 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-gray-700">Full Name *</Label>
                          <Input
                            id="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            required
                            className="border-gray-300 focus:border-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-gray-700">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            required
                            className="border-gray-300 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="category" className="text-gray-700">Category *</Label>
                          <Select 
                            value={formData.category} 
                            onValueChange={(value) => handleChange("category", value)}
                          >
                            <SelectTrigger className="border-gray-300 focus:border-blue-500">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat.value} value={cat.value}>
                                  {cat.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject" className="text-gray-700">Subject *</Label>
                          <Input
                            id="subject"
                            placeholder="Brief subject line"
                            value={formData.subject}
                            onChange={(e) => handleChange("subject", e.target.value)}
                            required
                            className="border-gray-300 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-gray-700">Message *</Label>
                        <Textarea
                          id="message"
                          placeholder="Please describe your inquiry in detail..."
                          rows={6}
                          value={formData.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          required
                          className="border-gray-300 focus:border-blue-500 resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Company Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Building className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-gray-900">Company Information</h3>
                    </div>
                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="font-semibold text-gray-900">LUEUR GRACE PRIVATE LIMITED</p>
                        <p className="text-gray-600">Registered Company in India</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Globe className="h-5 w-5 text-gray-400 mt-0.5" />
                        <p className="text-gray-600">www.draftiqplay.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-emerald-600" />
                      </div>
                      <h3 className="font-bold text-gray-900">Support Hours</h3>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monday - Friday</span>
                        <span className="font-medium text-gray-900">9:00 AM - 6:00 PM IST</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Saturday</span>
                        <span className="font-medium text-gray-900">10:00 AM - 4:00 PM IST</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sunday</span>
                        <span className="font-medium text-gray-500">Closed</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                        <p className="text-xs text-amber-700">
                          Email support is available 24/7. Response times may vary during weekends and holidays.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-purple-600" />
                      </div>
                      <h3 className="font-bold text-gray-900">Response Time</h3>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="text-gray-600">General inquiries: 24-48 hours</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-gray-600">Technical support: 12-24 hours</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                        <span className="text-gray-600">Account issues: 6-12 hours</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="text-gray-600">Fair Play reports: 24 hours</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">Quick Links</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Helpful Resources
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Before reaching out, you might find the answer you're looking for in these resources.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <Card className="border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-100 flex items-center justify-center">
                        <link.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1">{link.title}</h3>
                      <p className="text-sm text-gray-500">{link.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-blue-50 border-t">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-gray-600 mb-6">
              Check out our comprehensive FAQ section for answers to commonly asked questions.
            </p>
            <Link href="/faq">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <HelpCircle className="mr-2 h-5 w-5" />
                Visit FAQ
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
