import { MapPin, Building2, Users, ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const locations = [
  { name: "Dhaka", slug: "dhaka", doctors: 285, hospitals: 65, image: "https://images.unsplash.com/photo-1606298246186-c0278e0e1d0b?w=500&h=350&fit=crop", featured: true },
  { name: "Chittagong", slug: "chittagong", doctors: 142, hospitals: 32, image: "https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=500&h=350&fit=crop", featured: true },
  { name: "Sylhet", slug: "sylhet", doctors: 78, hospitals: 18, image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=500&h=350&fit=crop" },
  { name: "Rajshahi", slug: "rajshahi", doctors: 95, hospitals: 22, image: "https://images.unsplash.com/photo-1583952932871-fc7c4f85e9a4?w=500&h=350&fit=crop" },
  { name: "Khulna", slug: "khulna", doctors: 65, hospitals: 15, image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=500&h=350&fit=crop" },
  { name: "Rangpur", slug: "rangpur", doctors: 52, hospitals: 12, image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&h=350&fit=crop" },
];

const Locations = () => {
  return (
    <section id="hospitals" className="section-padding bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-accent/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-primary mb-4 animate-fade-up">
            <MapPin className="w-4 h-4" />
            Find by Location
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-up stagger-1">
            Top Doctors & Hospitals <span className="text-gradient">Near You</span>
          </h2>
          <p className="text-lg text-muted-foreground animate-fade-up stagger-2">
            Find healthcare services in major cities across Bangladesh
          </p>
        </div>

        {/* Featured Locations - Large Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {locations.filter(l => l.featured).map((location, index) => (
            <Link
              key={location.slug}
              to={`/doctors/${location.slug}`}
              className="group relative h-72 rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={location.image}
                alt={location.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-foreground/10" />

              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex items-center gap-2 text-primary-foreground/80 mb-2">
                  <div className="w-8 h-8 bg-primary/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium">Best Doctors in</span>
                </div>
                
                <h3 className="font-display font-bold text-3xl text-primary-foreground mb-4 group-hover:text-accent transition-colors">
                  {location.name}
                </h3>
                
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2 text-primary-foreground/90">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">{location.doctors}+ Doctors</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary-foreground/90">
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm font-medium">{location.hospitals} Hospitals</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-primary-foreground font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span>Explore Doctors</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Other Locations - Smaller Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {locations.filter(l => !l.featured).map((location, index) => (
            <Link
              key={location.slug}
              to={`/doctors/${location.slug}`}
              className="group relative h-48 rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-500 hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
            >
              <img
                src={location.image}
                alt={location.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />

              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <h3 className="font-display font-bold text-xl text-primary-foreground mb-1 group-hover:text-accent transition-colors">
                  {location.name}
                </h3>
                <div className="flex items-center gap-3 text-primary-foreground/80 text-sm">
                  <span>{location.doctors} Doctors</span>
                  <span>•</span>
                  <span>{location.hospitals} Hospitals</span>
                </div>
              </div>

              <div className="absolute top-4 right-4 w-8 h-8 bg-primary-foreground/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <ChevronRight className="w-4 h-4 text-primary-foreground" />
              </div>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link to="/doctors/bangladesh">
            <Button variant="outline" size="lg" className="gap-2">
              View All Locations
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Locations;
