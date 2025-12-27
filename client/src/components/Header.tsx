import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, LogOut, LayoutDashboard, Trophy, ChevronDown } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/fantasy-cricket", label: "Fantasy Cricket" },
  { href: "/how-to-play", label: "How To Play" },
  { href: "/about", label: "About Us" },
];

const moreLinks = [
  { href: "/responsible-gaming", label: "Responsible Gaming" },
  { href: "/fair-play", label: "Fair Play" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="LUEUR" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:text-primary hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* More dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-gray-600 hover:text-primary hover:bg-gray-100">
                  More <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {moreLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href} className="w-full cursor-pointer">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center gap-3">
            {loading ? (
              <div className="w-24 h-9 bg-gray-200 animate-pulse rounded-lg" />
            ) : isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-gray-700 hover:bg-gray-100">
                    <User className="h-4 w-4 mr-2" />
                    {user.name || "User"}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="w-full cursor-pointer">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-teams" className="w-full cursor-pointer">
                      <Trophy className="h-4 w-4 mr-2" />
                      My Teams
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="w-full cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-700 hover:bg-gray-100">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="lueur-gradient text-white hover:opacity-90">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-gray-700">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white text-gray-900 border-gray-200">
              <div className="flex flex-col gap-6 mt-8">
                {/* Mobile Nav Links */}
                <nav className="flex flex-col gap-2">
                  {[...navLinks, ...moreLinks].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        location === link.href
                          ? "bg-primary/10 text-primary"
                          : "text-gray-600 hover:text-primary hover:bg-gray-100"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Mobile Auth */}
                <div className="border-t border-gray-200 pt-4">
                  {isAuthenticated && user ? (
                    <div className="flex flex-col gap-2">
                      <div className="px-4 py-2 text-sm text-gray-500">
                        Signed in as <span className="text-gray-900 font-medium">{user.name}</span>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/my-teams"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-100"
                      >
                        My Teams
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 text-left"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-100">
                          Login
                        </Button>
                      </Link>
                      <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full lueur-gradient text-white">
                          Register
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
