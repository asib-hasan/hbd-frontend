import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { 
  Leaf, 
  Heart, 
  Brain, 
  Baby, 
  Bone,
  Shield,
  Activity,
  Flower2,
  Stethoscope,
  Eye,
  Pill,
  Wind,
  Droplets,
  Moon,
  Zap,
  ArrowRight
} from "lucide-react";

const specialties = [
  { 
    icon: Leaf, 
    name: "Constitutional Treatment", 
    slug: "constitutional-treatment",
    doctors: 65, 
    color: "bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white",
    description: "Holistic treatment based on individual constitution and symptom patterns for long-term health improvement."
  },
  { 
    icon: Activity, 
    name: "Chronic Diseases", 
    slug: "chronic-diseases",
    doctors: 52, 
    color: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white",
    description: "Long-term management of persistent conditions like diabetes, hypertension, and autoimmune disorders."
  },
  { 
    icon: Heart, 
    name: "Heart & Circulation", 
    slug: "heart-circulation",
    doctors: 38, 
    color: "bg-rose-500/10 text-rose-500 group-hover:bg-rose-500 group-hover:text-white",
    description: "Cardiovascular health support including blood pressure management and circulation improvement."
  },
  { 
    icon: Brain, 
    name: "Mental Health", 
    slug: "mental-health",
    doctors: 32, 
    color: "bg-violet-500/10 text-violet-500 group-hover:bg-violet-500 group-hover:text-white",
    description: "Treatment for anxiety, depression, stress-related disorders, and emotional well-being."
  },
  { 
    icon: Baby, 
    name: "Child Care", 
    slug: "child-care",
    doctors: 45, 
    color: "bg-pink-500/10 text-pink-500 group-hover:bg-pink-500 group-hover:text-white",
    description: "Pediatric homeopathy for common childhood ailments, growth issues, and immune support."
  },
  { 
    icon: Flower2, 
    name: "Women's Health", 
    slug: "womens-health",
    doctors: 48, 
    color: "bg-fuchsia-500/10 text-fuchsia-500 group-hover:bg-fuchsia-500 group-hover:text-white",
    description: "Hormonal balance, menstrual disorders, pregnancy care, and menopause management."
  },
  { 
    icon: Shield, 
    name: "Skin Disorders", 
    slug: "skin-disorders",
    doctors: 41, 
    color: "bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white",
    description: "Treatment for eczema, psoriasis, acne, allergies, and other dermatological conditions."
  },
  { 
    icon: Bone, 
    name: "Joint & Bone Disorders", 
    slug: "joint-bone-disorders",
    doctors: 35, 
    color: "bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white",
    description: "Arthritis, osteoporosis, back pain, and musculoskeletal problems treatment."
  },
  { 
    icon: Stethoscope, 
    name: "Respiratory Health", 
    slug: "respiratory-health",
    doctors: 42, 
    color: "bg-sky-500/10 text-sky-500 group-hover:bg-sky-500 group-hover:text-white",
    description: "Asthma, bronchitis, allergies, sinusitis, and other respiratory conditions."
  },
  { 
    icon: Eye, 
    name: "Eye Disorders", 
    slug: "eye-disorders",
    doctors: 28, 
    color: "bg-indigo-500/10 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white",
    description: "Treatment for eye strain, conjunctivitis, and vision-related issues."
  },
  { 
    icon: Pill, 
    name: "Digestive Health", 
    slug: "digestive-health",
    doctors: 55, 
    color: "bg-lime-500/10 text-lime-500 group-hover:bg-lime-500 group-hover:text-white",
    description: "IBS, acidity, constipation, liver disorders, and gastrointestinal problems."
  },
  { 
    icon: Wind, 
    name: "Allergies & Immunity", 
    slug: "allergies-immunity",
    doctors: 47, 
    color: "bg-teal-500/10 text-teal-500 group-hover:bg-teal-500 group-hover:text-white",
    description: "Allergy management, immune system strengthening, and autoimmune support."
  },
  { 
    icon: Droplets, 
    name: "Kidney & Urinary", 
    slug: "kidney-urinary",
    doctors: 31, 
    color: "bg-cyan-500/10 text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white",
    description: "Urinary tract infections, kidney stones, and renal health management."
  },
  { 
    icon: Moon, 
    name: "Sleep Disorders", 
    slug: "sleep-disorders",
    doctors: 29, 
    color: "bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white",
    description: "Insomnia, sleep apnea, and other sleep-related issues treatment."
  },
  { 
    icon: Zap, 
    name: "Neurological Disorders", 
    slug: "neurological-disorders",
    doctors: 26, 
    color: "bg-red-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-white",
    description: "Migraine, headaches, neuropathy, and nervous system disorders."
  },
];

const SpecialtiesPage = () => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Specialties" },
  ];

  return (
    <>
      <Helmet>
        <title>Homeopathic Specialties | HomeoDoctorsBD</title>
        <meta 
          name="description" 
          content="Explore all homeopathic treatment specialties. Find experienced homeopaths for constitutional treatment, chronic diseases, mental health, and more." 
        />
      </Helmet>

      <Header />
      
      <main>
        <PageHeader
          title="Treatment Specialties"
          description="Explore our comprehensive range of homeopathic treatment areas and find specialists for your health needs"
          breadcrumbs={breadcrumbs}
          stats={[
            { label: "Specialties", value: `${specialties.length}+` },
            { label: "Expert Doctors", value: "500+" },
            { label: "Patients Served", value: "50K+" },
          ]}
        />

        <section className="section-padding bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialties.map((specialty, index) => (
                <Link
                  key={specialty.slug}
                  to={`/doctors?specialty=${specialty.slug}`}
                  className="group card-premium p-6 transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 ${specialty.color} rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300`}>
                      <specialty.icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                        {specialty.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {specialty.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {specialty.doctors} Doctors
                        </span>
                        <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <span>Find Doctors</span>
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default SpecialtiesPage;
