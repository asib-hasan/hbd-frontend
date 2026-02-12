import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { 
  Leaf, 
  Heart, 
  Users, 
  Award, 
  CheckCircle2, 
  Target, 
  Eye,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: "Patient-Centered Care",
      description: "We prioritize the well-being of patients by connecting them with qualified homeopathic practitioners who treat the whole person, not just symptoms."
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Every doctor on our platform is verified for their qualifications, experience, and commitment to ethical homeopathic practice."
    },
    {
      icon: Users,
      title: "Accessibility",
      description: "We believe everyone deserves access to natural healing. Our platform makes finding and booking homeopathic care simple and affordable."
    },
    {
      icon: CheckCircle2,
      title: "Trust & Transparency",
      description: "Genuine patient reviews, clear pricing, and verified credentials help you make informed decisions about your healthcare."
    }
  ];

  const stats = [
    { value: "500+", label: "Verified Doctors" },
    { value: "50,000+", label: "Patients Helped" },
    { value: "64", label: "Districts Covered" },
    { value: "4.8", label: "Average Rating" }
  ];

  const team = [
    { name: "Dr. Aminul Islam", role: "Founder & Medical Director", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop" },
    { name: "Fatema Rahman", role: "Chief Operations Officer", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop" },
    { name: "Karim Ahmed", role: "Technology Lead", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop" }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - HomeoDoctorsBD | Bangladesh's Leading Homeopathy Platform</title>
        <meta name="description" content="Learn about HomeoDoctorsBD's mission to make homeopathic healthcare accessible to everyone in Bangladesh. Discover our values, team, and commitment to natural healing." />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/10 py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_50%)]" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Leaf className="w-4 h-4" />
                About HomeoDoctorsBD
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Connecting Bangladesh with <span className="text-primary">Natural Healing</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                HomeoDoctorsBD is Bangladesh's premier platform for finding and booking appointments with qualified homeopathic doctors. We're on a mission to make holistic healthcare accessible to everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card-premium p-8">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To bridge the gap between patients seeking natural healing and qualified homeopathic practitioners across Bangladesh. We strive to make booking appointments simple, transparent, and accessible, empowering individuals to take control of their health journey through holistic medicine.
                </p>
              </div>
              <div className="card-premium p-8">
                <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-secondary-foreground" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To become the most trusted healthcare platform in Bangladesh, where every citizen has easy access to verified homeopathic care. We envision a future where natural healing is a mainstream choice, supported by technology that connects patients with the right practitioners.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-muted-foreground">
                These principles guide everything we do at HomeoDoctorsBD
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, idx) => (
                <div key={idx} className="card-premium p-6 text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Meet Our Team
              </h2>
              <p className="text-muted-foreground">
                Dedicated professionals working to transform healthcare access in Bangladesh
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member, idx) => (
                <div key={idx} className="card-premium p-6 text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 shadow-soft">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Get in Touch
              </h2>
              <p className="text-muted-foreground mb-8">
                Have questions or want to partner with us? We'd love to hear from you.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">info@homeodoctorsbd.com</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">+880 1700-000000</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Dhaka, Bangladesh</span>
                </div>
              </div>

              <Link to="/doctors/bangladesh">
                <Button size="lg" className="shadow-premium">
                  Find a Doctor Near You
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AboutPage;
