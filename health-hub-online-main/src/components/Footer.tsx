import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = {
    locations: [
      { name: "Best in Bangladesh", href: "/doctors/bangladesh" },
      { name: "Best in Dhaka", href: "/doctors/dhaka" },
      { name: "Best in Chittagong", href: "/doctors/chittagong" },
      { name: "Best in Sylhet", href: "/doctors/sylhet" },
    ],
    services: [
      { name: "Find Doctors", href: "/doctors/bangladesh" },
      { name: "Online Consultation", href: "#" },
      { name: "Constitutional Treatment", href: "#" },
      { name: "Health Articles", href: "#" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer id="about" className="bg-gradient-dark text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-16">
          <div className="bg-gradient-hero rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-primary-foreground mb-2">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-primary-foreground/80 max-w-md">
                  Get homeopathy health tips, new doctor updates, and exclusive offers directly in your inbox.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/60" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="h-14 pl-12 pr-6 bg-primary-foreground/15 backdrop-blur-sm border border-primary-foreground/20 rounded-xl text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/40 min-w-[280px] transition-colors"
                  />
                </div>
                <Button variant="accent" size="lg" className="h-14 px-8 gap-2 shadow-glow-accent">
                  Subscribe
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
                <Leaf className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <span className="font-display font-bold text-2xl text-primary-foreground">HomeoDoctorsBD</span>
                <span className="block text-xs text-primary-foreground/60 font-medium tracking-wide">HOMEOPATHY PLATFORM</span>
              </div>
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-sm leading-relaxed">
              Your trusted homeopathy platform connecting patients with the best homeopathic doctors across Bangladesh. Natural healing through holistic treatment.
            </p>
            <div className="space-y-3">
              <a href="tel:+8801700000000" className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors group">
                <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span>+880 1700-000000</span>
              </a>
              <a href="mailto:info@homeodoctorsbd.com" className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors group">
                <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span>info@homeodoctorsbd.com</span>
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/70">
                <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <span>House 123, Road 12, Banani, Dhaka-1213, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold text-lg text-primary-foreground mb-6">Top Locations</h4>
            <ul className="space-y-3">
              {footerLinks.locations.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors flex items-center gap-1 group">
                    <span>{link.name}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg text-primary-foreground mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors flex items-center gap-1 group">
                    <span>{link.name}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg text-primary-foreground mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors flex items-center gap-1 group">
                    <span>{link.name}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} HomeoDoctorsBD. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-primary-foreground/10 rounded-xl flex items-center justify-center hover:bg-primary-foreground/20 hover:scale-110 transition-all"
                >
                  <social.icon className="w-5 h-5 text-primary-foreground/80" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
