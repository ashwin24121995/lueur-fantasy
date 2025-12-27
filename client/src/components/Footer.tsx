import { Link } from "wouter";

const footerLinks = {
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/faq", label: "FAQ" },
  ],
  fantasy: [
    { href: "/fantasy-cricket", label: "Fantasy Cricket" },
    { href: "/how-to-play", label: "How To Play" },
    { href: "/fair-play", label: "Fair Play" },
  ],
  legal: [
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/responsible-gaming", label: "Responsible Gaming" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="LUEUR" className="h-10 w-auto" />
            </Link>
            <p className="text-gray-700 text-sm font-medium mb-2">
              LUEUR GRACE PRIVATE LIMITED
            </p>
            <p className="text-gray-500 text-sm">
              India's premier free-to-play fantasy cricket platform. 
              Test your cricket knowledge and compete with friends.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fantasy Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Fantasy Cricket</h3>
            <ul className="space-y-2">
              {footerLinks.fantasy.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Age Restriction Banner */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">18+</span>
              </div>
              <span className="text-gray-600 text-sm">
                This platform is for users aged 18 years and above only.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Geo Restriction Notice */}
      <div className="border-t border-gray-200 bg-gray-100">
        <div className="container py-3">
          <p className="text-gray-500 text-xs text-center">
            Not available in Telangana, Andhra Pradesh, Assam, and Odisha.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} LUEUR GRACE PRIVATE LIMITED. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Free to Play • No Real Money Involved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
