import { 
  Leaf, 
  Heart, 
  Brain, 
  Baby, 
  Bone,
  Sparkles,
  Shield,
  Activity,
  ArrowRight,
  Flower2
} from "lucide-react";
import { Button } from "@/components/ui/button";

const specialties = [
  { icon: Leaf, name: "Constitutional Treatment", doctors: 65, color: "bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white" },
  { icon: Activity, name: "Chronic Diseases", doctors: 52, color: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white" },
  { icon: Heart, name: "Heart & Circulation", doctors: 38, color: "bg-rose-500/10 text-rose-500 group-hover:bg-rose-500 group-hover:text-white" },
  { icon: Brain, name: "Mental Health", doctors: 32, color: "bg-violet-500/10 text-violet-500 group-hover:bg-violet-500 group-hover:text-white" },
  { icon: Baby, name: "Child Care", doctors: 45, color: "bg-pink-500/10 text-pink-500 group-hover:bg-pink-500 group-hover:text-white" },
  { icon: Flower2, name: "Women's Health", doctors: 48, color: "bg-fuchsia-500/10 text-fuchsia-500 group-hover:bg-fuchsia-500 group-hover:text-white" },
  { icon: Shield, name: "Skin Disorders", doctors: 41, color: "bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white" },
  { icon: Bone, name: "Joint & Bone Disorders", doctors: 35, color: "bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white" },
];

const Specialties = () => {
  return (
    <section id="specialties" className="section-padding bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-muted/30 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-primary mb-4 animate-fade-up">
            <Sparkles className="w-4 h-4" />
            Treatment Areas
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-up stagger-1">
            Browse by <span className="text-gradient">Specialty</span>
          </h2>
          <p className="text-lg text-muted-foreground animate-fade-up stagger-2">
            Find experienced homeopathic doctors across all major treatment specializations
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {specialties.map((specialty, index) => (
            <a
              key={specialty.name}
              href={`#${specialty.name.toLowerCase()}`}
              className="group card-premium p-6 transition-all duration-300 hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className={`w-14 h-14 ${specialty.color} rounded-2xl flex items-center justify-center mb-4 transition-all duration-300`}>
                <specialty.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                {specialty.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {specialty.doctors} Doctors
              </p>
              <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <span>View All</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a href="/specialties">
            <Button variant="outline" size="lg" className="gap-2">
              View All Specialties
              <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Specialties;
