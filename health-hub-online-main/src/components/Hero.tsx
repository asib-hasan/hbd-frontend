import { Search, MapPin, Users, Award, Clock, Leaf, Stethoscope, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { dhakaAreas } from "@/data/doctors";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const stats = [
    { icon: Users, value: "500+", label: "Homeo Doctors", color: "bg-primary/10 text-primary" },
    { icon: Award, value: "50K+", label: "Happy Patients", color: "bg-accent/10 text-accent" },
    { icon: Clock, value: "24/7", label: "Support Available", color: "bg-green-500/10 text-green-600" },
  ];

  const quickLinks = [
    { label: "Best in Bangladesh", href: "/doctors/bangladesh" },
    { label: "Best in Dhaka", href: "/doctors/dhaka" },
    { label: "Best in Chittagong", href: "/doctors/chittagong" },
    { label: "Best Female Doctors", href: "/female-doctors" },
  ];

  const popularAreas = dhakaAreas.slice(0, 8);

  const specializations = [
    { name: "Constitutional Treatment", icon: "🌿" },
    { name: "Chronic Diseases", icon: "💊" },
    { name: "Child Care", icon: "👶" },
    { name: "Women's Health", icon: "🩺" },
    { name: "Skin Disorders", icon: "✨" },
    { name: "Mental Health", icon: "🧠" },
    { name: "Digestive Disorders", icon: "🍃" },
    { name: "Joint & Bone", icon: "🦴" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-hero-subtle" />
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-primary/8 via-primary/3 to-transparent rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-accent/8 via-accent/3 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
      
      {/* Floating Elements */}
      <div className="absolute top-32 left-[10%] w-24 h-24 bg-primary/8 rounded-3xl rotate-12 animate-float hidden xl:block" />
      <div className="absolute bottom-32 right-[8%] w-20 h-20 bg-accent/15 rounded-full animate-float stagger-3 hidden xl:block" />
      <div className="absolute top-1/2 right-[15%] w-16 h-16 bg-secondary rounded-2xl -rotate-12 animate-float stagger-2 hidden xl:block" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div className="lg:col-span-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-8 animate-fade-up shadow-soft">
              <Leaf className="w-4 h-4" />
              <span className="tracking-wide">Bangladesh's Trusted Homeopathy Platform</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1] mb-6 animate-fade-up stagger-1">
              Find & Book 
              <span className="text-gradient block mt-1">Homeopathic Doctors</span>
              <span className="block mt-1">Near You</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground mb-10 animate-fade-up stagger-2 max-w-lg leading-relaxed">
              Connect with experienced homeopathic practitioners across Bangladesh. Natural healing through holistic treatment.
            </p>

            {/* Enhanced Search Box */}
            <div className="glass-card p-3 shadow-card animate-fade-up stagger-3">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search doctors, specialties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-muted/40 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-muted/60 transition-all"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Location (e.g., Dhaka)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-muted/40 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-muted/60 transition-all"
                  />
                </div>
                <Button variant="hero" size="lg" className="h-14 px-8 shadow-glow">
                  <Search className="w-5 h-5" />
                  <span className="hidden sm:inline">Search</span>
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center gap-3 mt-6 animate-fade-up stagger-4">
              <span className="text-sm text-muted-foreground font-medium">Popular:</span>
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="px-4 py-2 bg-card border border-border hover:border-primary/30 hover:bg-primary/5 hover:text-primary rounded-full text-sm font-medium transition-all duration-300 shadow-xs hover:shadow-soft"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 lg:gap-10 mt-12 animate-fade-up stagger-5">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center shadow-soft`}>
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-2xl lg:text-3xl text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Popular Areas & Specializations */}
          <div className="lg:col-span-2 space-y-6 animate-fade-up stagger-3">
            {/* Popular Areas */}
            <div className="glass-card p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Popular Areas
                </h3>
                <Link to="/doctors/dhaka" className="text-sm text-primary hover:underline flex items-center gap-1">
                  View All <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {popularAreas.map((area) => (
                  <Link
                    key={area.id}
                    to={`/doctors/${area.id}`}
                    className="flex items-center justify-between px-4 py-3 bg-muted/50 hover:bg-primary/10 hover:text-primary rounded-xl text-sm font-medium transition-all duration-200 group"
                  >
                    <span>{area.name}</span>
                    <span className="text-xs text-muted-foreground group-hover:text-primary/70">{area.doctorCount}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Specializations */}
            <div className="glass-card p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-primary" />
                  Specializations
                </h3>
                <button 
                  onClick={() => document.getElementById('specialties')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  View All <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {specializations.map((spec) => (
                  <Link
                    key={spec.name}
                    to={`/doctors/bangladesh?specialty=${encodeURIComponent(spec.name)}`}
                    className="flex items-center gap-2 px-4 py-3 bg-muted/50 hover:bg-primary/10 hover:text-primary rounded-xl text-sm font-medium transition-all duration-200"
                  >
                    <span className="text-lg">{spec.icon}</span>
                    <span className="truncate">{spec.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
