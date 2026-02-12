import DoctorCard from "./DoctorCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { getFeaturedDoctors } from "@/data/doctors";

const FeaturedDoctors = () => {
  const doctors = getFeaturedDoctors();

  return (
    <section id="doctors" className="section-padding bg-muted/30 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-radial from-accent/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="badge badge-primary mb-4 animate-fade-up">
              <Award className="w-4 h-4" />
              Top Rated Practitioners
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-up stagger-1">
              Meet Our <span className="text-gradient">Expert</span> Homeopaths
            </h2>
            <p className="text-lg text-muted-foreground animate-fade-up stagger-2">
              Our team of experienced homeopathic practitioners is dedicated to providing you with natural healing and holistic treatment across Bangladesh.
            </p>
          </div>
          <Link to="/doctors/bangladesh" className="animate-fade-up stagger-3">
            <Button variant="outline" size="lg" className="gap-2 w-fit">
              View All Doctors
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {doctors.slice(0, 4).map((doctor, index) => (
            <DoctorCard key={doctor.id} {...doctor} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDoctors;
