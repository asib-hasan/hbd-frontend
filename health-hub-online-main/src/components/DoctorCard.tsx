import { Star, MapPin, Clock, Calendar, ArrowRight, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  image: string;
  rating: number;
  reviews: number;
  experience: string;
  availability: string;
  fee?: string;
  qualifications?: string[];
  index?: number;
}

const DoctorCard = ({
  id,
  name,
  specialty,
  hospital,
  image,
  rating,
  reviews,
  experience,
  availability,
  fee,
  qualifications,
  index = 0,
}: DoctorCardProps) => {
  const isAvailableToday = availability.toLowerCase().includes("today");

  return (
    <div 
      className="group card-premium transition-all duration-500 hover:-translate-y-2 animate-fade-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Image Container */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-soft">
          <Star className="w-4 h-4 text-accent" fill="currentColor" />
          <span className="font-bold text-sm text-foreground">{rating}</span>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>

        {/* Availability Badge */}
        <div className={`absolute bottom-4 left-4 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
          isAvailableToday 
            ? "bg-green-500/90 text-white" 
            : "bg-card/95 text-foreground"
        }`}>
          <Clock className="w-3.5 h-3.5" />
          {availability}
        </div>

        {/* Verified Badge */}
        <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
          <BadgeCheck className="w-3.5 h-3.5" />
          Verified
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-lg text-xs font-semibold">
              {specialty}
            </span>
            {fee && (
              <span className="text-xs text-muted-foreground">• {fee}</span>
            )}
          </div>
          <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {name}
          </h3>
          {qualifications && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
              {qualifications.join(", ")}
            </p>
          )}
        </div>

        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">{hospital}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>{experience} Experience</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Link to={`/doctor/${id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full h-11">
              View Profile
            </Button>
          </Link>
          <Button size="sm" className="flex-1 h-11 gap-1 shadow-soft">
            Book Now
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
