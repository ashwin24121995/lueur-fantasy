import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import Layout from "@/components/Layout";
import { Loading, PageLoader } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Users,
  Zap,
  Shield,
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar,
  Play,
  Star,
  Target,
  Award,
  TrendingUp,
  Sparkles,
  Radio,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

// Hero slider images
const heroSlides = [
  {
    image: "/images/hero-main.png",
    title: "Experience the Thrill of Fantasy Cricket",
    subtitle: "Create your dream team and compete with players across India",
    cta: "Start Playing Now",
    ctaLink: "/fantasy-cricket",
  },
  {
    image: "/images/hero-team-selection.png",
    title: "Build Your Dream XI",
    subtitle: "Select from real cricket stars and create the ultimate fantasy team",
    cta: "Create Your Team",
    ctaLink: "/fantasy-cricket",
  },
  {
    image: "/images/hero-live-match.png",
    title: "Live Match Excitement",
    subtitle: "Watch your fantasy points grow with every ball bowled",
    cta: "View Live Matches",
    ctaLink: "/fantasy-cricket",
  },
  {
    image: "/images/hero-main.png",
    title: "Compete & Celebrate",
    subtitle: "Join cricket enthusiasts and showcase your skills - 100% Free!",
    cta: "Join Now - It's Free!",
    ctaLink: "/register",
  },
];

// Features data
const features = [
  {
    icon: Trophy,
    title: "Free to Play",
    description: "No real money involved. Pure skill-based fantasy cricket entertainment.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Zap,
    title: "Real-Time Updates",
    description: "Live scores and fantasy points updated every ball.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Users,
    title: "Compete with Friends",
    description: "Create private leagues and challenge your cricket buddies.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Your data is protected with enterprise-grade security.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
];

// Features highlights (no fake stats)
const highlights = [
  { value: "100%", label: "Free to Play", icon: Star, description: "No real money involved" },
  { value: "Live", label: "Real-Time Updates", icon: Zap, description: "Points updated every ball" },
  { value: "Safe", label: "Secure Platform", icon: Shield, description: "Your data is protected" },
  { value: "24/7", label: "Available", icon: Clock, description: "Play anytime, anywhere" },
];

// How it works steps
const howItWorks = [
  {
    step: 1,
    title: "Select a Match",
    description: "Choose from upcoming cricket matches across all major tournaments",
    icon: Target,
  },
  {
    step: 2,
    title: "Create Your Team",
    description: "Pick 11 players within the budget and select your captain",
    icon: Users,
  },
  {
    step: 3,
    title: "Watch & Win",
    description: "Earn points based on your players' real match performance",
    icon: Trophy,
  },
];

// CricScore match type from API
interface CricScoreMatch {
  id: string;
  dateTimeGMT: string;
  matchType: string;
  status: string;
  ms: string;
  t1: string;
  t2: string;
  t1s: string;
  t2s: string;
  t1img: string;
  t2img: string;
  series: string;
}

// Parse GMT date string to UTC Date object
function parseGMTDate(dateStr: string): Date {
  if (!dateStr) return new Date();
  const cleanDate = dateStr.endsWith("Z") ? dateStr : dateStr + "Z";
  return new Date(cleanDate);
}

// Format time in IST
function formatTimeIST(dateStr: string): string {
  const date = parseGMTDate(dateStr);
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
}

// Format date in IST
function formatDateIST(dateStr: string): string {
  const date = parseGMTDate(dateStr);
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Asia/Kolkata",
  });
}

// Get time until match starts
function getTimeUntil(dateStr: string): string {
  const matchDate = parseGMTDate(dateStr);
  const now = new Date();
  const diff = matchDate.getTime() - now.getTime();

  if (diff <= 0) return "Started";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  }
  return `${hours}h ${minutes}m`;
}

// Hero Slider Component
function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div
      className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Badge className="bg-emerald-500 text-white mb-4 px-4 py-1">
                  <Sparkles className="w-4 h-4 mr-1" />
                  100% Free to Play
                </Badge>
              </motion.div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8">
                {heroSlides[currentSlide].subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={heroSlides[currentSlide].ctaLink}>
                  <Button
                    size="lg"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 md:px-8 py-5 md:py-6 text-base md:text-lg rounded-full shadow-lg shadow-emerald-500/30 transition-all hover:scale-105"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    {heroSlides[currentSlide].cta}
                  </Button>
                </Link>
                <Link href="/how-to-play">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 px-6 md:px-8 py-5 md:py-6 text-base md:text-lg rounded-full"
                  >
                    Learn How to Play
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all text-white"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all text-white"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? "w-8 bg-emerald-500"
                : "w-2 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Live Match Card Component
function LiveMatchCard({ match }: { match: CricScoreMatch }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-red-500 to-red-700 text-white h-full">
        <CardContent className="p-0">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <Badge className="bg-white/20 text-white">
                <span className="w-2 h-2 bg-white rounded-full mr-2 animate-ping" />
                LIVE
              </Badge>
              <span className="text-xs opacity-80">{match.matchType?.toUpperCase()}</span>
            </div>
            <p className="text-xs opacity-80 mb-3 line-clamp-1">{match.series}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                <div className="flex items-center gap-2">
                  {match.t1img && (
                    <img src={match.t1img} alt={match.t1} className="w-8 h-8 rounded-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  )}
                  <span className="font-medium text-sm truncate max-w-[100px]">{match.t1}</span>
                </div>
                <span className="font-bold text-lg">{match.t1s || "-"}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                <div className="flex items-center gap-2">
                  {match.t2img && (
                    <img src={match.t2img} alt={match.t2} className="w-8 h-8 rounded-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  )}
                  <span className="font-medium text-sm truncate max-w-[100px]">{match.t2}</span>
                </div>
                <span className="font-bold text-lg">{match.t2s || "-"}</span>
              </div>
            </div>

            {match.status && (
              <p className="text-xs mt-3 opacity-90 text-center line-clamp-2">{match.status}</p>
            )}
          </div>
          <Link href={`/match/${match.id}`}>
            <div className="bg-white/10 hover:bg-white/20 transition-colors p-3 text-center cursor-pointer">
              <span className="text-sm font-medium">View Live Score</span>
            </div>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Upcoming Match Card Component
function UpcomingMatchCard({ match }: { match: CricScoreMatch }) {
  const timeUntil = getTimeUntil(match.dateTimeGMT);
  const isStartingSoon = timeUntil !== "Started" && !timeUntil.includes("d") && parseInt(timeUntil) < 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all bg-white h-full">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-3 text-white">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-white/20 text-white">
                {match.matchType?.toUpperCase()}
              </Badge>
              {isStartingSoon && (
                <Badge className="bg-yellow-500 text-black animate-pulse">
                  Starting Soon!
                </Badge>
              )}
            </div>
            <p className="text-xs mt-1 opacity-90 line-clamp-1">{match.series}</p>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 flex-1">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  {match.t1img ? (
                    <img src={match.t1img} alt={match.t1} className="w-8 h-8 rounded-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  ) : (
                    <span className="text-emerald-700 font-bold text-xs">{match.t1?.substring(0, 3)}</span>
                  )}
                </div>
                <p className="font-medium text-sm text-gray-800 truncate">{match.t1}</p>
              </div>
              <div className="px-2">
                <span className="text-gray-400 font-bold text-xs">VS</span>
              </div>
              <div className="flex items-center gap-2 flex-1 justify-end">
                <p className="font-medium text-sm text-gray-800 truncate text-right">{match.t2}</p>
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  {match.t2img ? (
                    <img src={match.t2img} alt={match.t2} className="w-8 h-8 rounded-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  ) : (
                    <span className="text-emerald-700 font-bold text-xs">{match.t2?.substring(0, 3)}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 border-t pt-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span className="text-xs">{formatDateIST(match.dateTimeGMT)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs">{formatTimeIST(match.dateTimeGMT)} IST</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1 text-emerald-600">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-medium">Starts in {timeUntil}</span>
              </div>
              <Link href={`/create-team/${match.id}`}>
                <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-xs">
                  Create Team
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Fetch live and upcoming matches with 5-second refresh
  const { data: matchData, isLoading: matchesLoading, isFetching } = trpc.matches.getLiveAndUpcoming.useQuery(
    undefined,
    {
      refetchInterval: 5000,
      refetchIntervalInBackground: true,
      staleTime: 4000,
    }
  );

  // Update last refresh time
  useEffect(() => {
    if (matchData) {
      setLastRefresh(new Date());
    }
  }, [matchData]);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const liveMatches = matchData?.live || [];
  const todayMatches = matchData?.today || [];
  const tomorrowMatches = matchData?.tomorrow || [];

  return (
    <Layout>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Highlights Section */}
      <section className="py-8 bg-gradient-to-r from-emerald-600 to-emerald-700 -mt-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center text-white p-3 md:p-4"
              >
                <item.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 opacity-80" />
                <div className="text-xl md:text-3xl font-bold">{item.value}</div>
                <div className="text-xs md:text-sm font-medium">{item.label}</div>
                <div className="text-xs opacity-70 mt-1 hidden md:block">{item.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Matches Section */}
      {liveMatches.length > 0 && (
        <section className="py-12 md:py-16 bg-gradient-to-b from-red-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Live Matches</h2>
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                </div>
                <p className="text-gray-600 text-sm">Real-time scores • Auto-refreshes every 5 seconds</p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
                <RefreshCw className={`h-3 w-3 ${isFetching ? 'animate-spin' : ''}`} />
                <span>Updated: {lastRefresh.toLocaleTimeString()}</span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {liveMatches.slice(0, 8).map((match: CricScoreMatch, index: number) => (
                <LiveMatchCard key={match.id || index} match={match} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Today's Matches Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <Badge className="bg-emerald-500 text-white mb-2">Today</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Today's Matches</h2>
              <p className="text-gray-600 text-sm mt-1">Create your team before the match starts</p>
            </div>
            <Link href="/fantasy-cricket">
              <Button variant="outline" className="hidden md:flex">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {matchesLoading ? (
            <PageLoader />
          ) : todayMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {todayMatches.slice(0, 8).map((match: CricScoreMatch, index: number) => (
                <UpcomingMatchCard key={match.id || index} match={match} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600">No Matches Today</h3>
              <p className="text-gray-500 mt-2">Check tomorrow's matches below</p>
            </div>
          )}
        </div>
      </section>

      {/* Tomorrow's Matches Section */}
      {tomorrowMatches.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <Badge variant="secondary" className="mb-2">Tomorrow</Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Tomorrow's Matches</h2>
                <p className="text-gray-600 text-sm mt-1">Plan ahead and create your teams early</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tomorrowMatches.slice(0, 8).map((match: CricScoreMatch, index: number) => (
                <UpcomingMatchCard key={match.id || index} match={match} />
              ))}
            </div>

            {tomorrowMatches.length > 8 && (
              <div className="text-center mt-8">
                <Link href="/fantasy-cricket">
                  <Button size="lg" variant="outline">
                    View All {tomorrowMatches.length} Matches
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="bg-emerald-100 text-emerald-700 mb-4">Why Choose LUEUR</Badge>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
              The Ultimate Fantasy Cricket Experience
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Join millions of cricket fans who trust LUEUR for their fantasy cricket entertainment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 rounded-2xl ${feature.bgColor} flex items-center justify-center mx-auto mb-4`}
                    >
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="bg-white/20 text-white mb-4">Simple & Easy</Badge>
            <h2 className="text-2xl md:text-4xl font-bold">How It Works</h2>
            <p className="mt-4 opacity-90 max-w-2xl mx-auto">
              Get started with LUEUR Fantasy Cricket in just 3 simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center relative"
              >
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 relative">
                  <step.icon className="w-10 h-10" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-400 text-emerald-800 font-bold flex items-center justify-center text-lg">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="opacity-80">{step.description}</p>

                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-white/20" />
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            {isAuthenticated ? (
              <Link href="/fantasy-cricket">
                <Button
                  size="lg"
                  className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-6 text-lg rounded-full shadow-lg"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Browse Matches
                </Button>
              </Link>
            ) : (
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-6 text-lg rounded-full shadow-lg"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Playing Now - It's Free!
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-r from-gray-900 to-gray-800 p-6 sm:p-8 md:p-12 lg:p-16"
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "url(/images/hero-cricket.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
              <div className="text-center lg:text-left flex-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-4">
                  Ready to Test Your Cricket Knowledge?
                </h2>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg">
                  Join LUEUR today and experience the thrill of fantasy cricket
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
                {isAuthenticated ? (
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 md:px-8 py-4 md:py-6 text-sm md:text-lg rounded-full whitespace-nowrap w-full sm:w-auto"
                    >
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 md:px-8 py-4 md:py-6 text-sm md:text-lg rounded-full whitespace-nowrap w-full sm:w-auto"
                    >
                      Create Free Account
                    </Button>
                  </Link>
                )}
                <Link href="/how-to-play">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 px-6 md:px-8 py-4 md:py-6 text-sm md:text-lg rounded-full whitespace-nowrap w-full sm:w-auto"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
