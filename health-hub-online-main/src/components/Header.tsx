import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf, User, ChevronDown, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleHashLink = (href: string) => {
    if (href.startsWith("/#")) {
      if (location.pathname === "/") {
        const element = document.querySelector(href.replace("/", ""));
        element?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          const element = document.querySelector(href.replace("/", ""));
          element?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
      return true;
    }
    return false;
  };

  const navLinks = [
    { name: "Find Doctors", href: "/doctors/bangladesh" },
    { name: "Specialties", href: "/specialties" },
    { 
      name: "Locations", 
      href: "#",
      children: [
        { name: "All Bangladesh", href: "/doctors/bangladesh" },
        { name: "Dhaka", href: "/doctors/dhaka" },
        { name: "Chittagong", href: "/doctors/chittagong" },
        { name: "Sylhet", href: "/doctors/sylhet" },
        { name: "Rajshahi", href: "/doctors/rajshahi" },
        { name: "Khulna", href: "/doctors/khulna" },
      ]
    },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-xl shadow-sm border-b border-border/40" : "bg-background/90 backdrop-blur-md"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">HomeoDoctorsBD</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {link.children ? (
                  <>
                    <button className="flex items-center gap-1 px-3 py-2 text-sm text-foreground/70 hover:text-foreground font-medium transition-colors rounded-md hover:bg-muted/50">
                      {link.name}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`absolute top-full left-0 pt-2 transition-all duration-150 ${openDropdown === link.name ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                      <div className="bg-background border border-border rounded-lg shadow-lg py-1.5 min-w-[160px]">
                        {link.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className="block px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  link.href.startsWith("/#") ? (
                    <button
                      onClick={() => handleHashLink(link.href)}
                      className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground font-medium transition-colors rounded-md hover:bg-muted/50"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground font-medium transition-colors rounded-md hover:bg-muted/50"
                    >
                      {link.name}
                    </Link>
                  )
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="h-9 px-3 text-sm">
                    <User className="w-4 h-4 mr-1.5" />
                    Profile
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout} className="h-9 px-3 text-sm">
                  <LogOut className="w-4 h-4 mr-1.5" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm" className="h-9 px-3 text-sm">
                    Login
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="sm" className="h-9 px-4 text-sm">
                    Book Now
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.children ? (
                    <div className="py-1">
                      <span className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">{link.name}</span>
                      <div className="mt-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    link.href.startsWith("/#") ? (
                      <button
                        onClick={() => {
                          handleHashLink(link.href);
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2.5 text-sm text-foreground hover:text-primary hover:bg-muted/50 rounded-md font-medium transition-colors"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <Link
                        to={link.href}
                        className="block px-3 py-2.5 text-sm text-foreground hover:text-primary hover:bg-muted/50 rounded-md font-medium transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    )
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-2 pt-3 mt-3 border-t border-border">
                {user ? (
                  <>
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full justify-center">
                        <User className="w-4 h-4 mr-1.5" />
                        Profile
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="w-full justify-center" 
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-1.5" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full justify-center">
                        Login
                      </Button>
                    </Link>
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <Button size="sm" className="w-full justify-center">
                        Book Consultation
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
