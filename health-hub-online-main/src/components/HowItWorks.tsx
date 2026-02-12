import { Search, UserCheck, Calendar, CheckCircle, ArrowRight, Leaf } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search Doctors",
    description: "Find homeopathic specialists by name, specialty, or location using our smart search.",
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
  },
  {
    icon: UserCheck,
    title: "Choose Your Doctor",
    description: "Review profiles, qualifications, ratings, and patient reviews in detail.",
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-500/10",
    iconColor: "text-violet-500",
  },
  {
    icon: Calendar,
    title: "Book Consultation",
    description: "Select your preferred date, time, and book instantly online.",
    color: "from-primary to-teal-600",
    bgColor: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Leaf,
    title: "Get Natural Healing",
    description: "Receive personalized homeopathic treatment for holistic wellness.",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-500/10",
    iconColor: "text-green-500",
  },
];

const HowItWorks = () => {
  return (
    <section className="section-padding bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20" />
      <div className="absolute top-20 left-10 w-40 h-40 border-2 border-primary/10 rounded-full hidden lg:block" />
      <div className="absolute bottom-20 right-10 w-56 h-56 border-2 border-accent/10 rounded-full hidden lg:block" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-primary mb-4 animate-fade-up">
            Simple Process
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-up stagger-1">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground animate-fade-up stagger-2">
            Book your homeopathic consultation in just a few simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative text-center animate-fade-up"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-20 left-[60%] w-[80%] items-center">
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-border via-primary/20 to-border" />
                  <ArrowRight className="w-4 h-4 text-muted-foreground/30 -ml-1" />
                </div>
              )}

              {/* Step Number */}
              <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br ${step.color} text-white rounded-full flex items-center justify-center text-sm font-bold shadow-soft z-10`}>
                {index + 1}
              </div>

              {/* Icon */}
              <div className={`w-36 h-36 ${step.bgColor} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-soft transition-transform duration-300 hover:scale-105`}>
                <step.icon className={`w-16 h-16 ${step.iconColor}`} strokeWidth={1.5} />
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-xl text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
