import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

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

// Restricted states where service is not available
const restrictedStates = [
  "Telangana",
  "Andhra Pradesh", 
  "Assam",
  "Odisha",
  "Nagaland",
  "Sikkim"
];

export default function Footer() {
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
            <p className="text-gray-500 text-sm mb-3">
              India's premier free-to-play fantasy cricket platform. 
              Test your cricket knowledge and compete with friends.
            </p>
            {/* Company Registration Details */}
            <div className="text-xs text-gray-500 space-y-1">
              <p><span className="font-medium">CIN:</span> U36999DL2018PTC339812</p>
              <p><span className="font-medium">PAN:</span> AADCL7173R</p>
              <p><span className="font-medium">GST:</span> 07AADCL7173R1ZR</p>
            </div>
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

      {/* Disclaimer Section */}
      <div className="border-t border-gray-200 bg-amber-50">
        <div className="container py-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-gray-700">
              <p className="font-semibold text-amber-800 mb-1">Disclaimer:</p>
              <p className="leading-relaxed">
                LUEUR is a free-to-play fantasy sports platform. No real money is involved in any contest or game. 
                This platform is purely for entertainment purposes and does not involve gambling, betting, or any form of monetary rewards. 
                Users must be 18 years or older to participate. Playing fantasy sports involves an element of financial risk and may be addictive. 
                Please play responsibly and at your own risk.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Age Restriction & Geo Restriction Banner */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            {/* Age Restriction */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
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
      <div className="border-t border-gray-200 bg-red-50">
        <div className="container py-3">
          <p className="text-red-700 text-xs text-center font-medium">
            <span className="font-semibold">Service Not Available In:</span>{" "}
            {restrictedStates.join(", ")}
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 bg-gray-100">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 LUEUR GRACE PRIVATE LIMITED. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs">
              Last Updated: December 28, 2025 • Free to Play • No Real Money Involved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
