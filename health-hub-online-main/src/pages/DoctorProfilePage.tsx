import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { 
  Star, 
  MapPin, 
  Clock, 
  Calendar, 
  Phone, 
  Mail, 
  GraduationCap, 
  Award, 
  BadgeCheck,
  ArrowLeft,
  Share2,
  Heart,
  MessageCircle,
  Building,
  Users,
  ThumbsUp,
  Leaf
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { doctors } from "@/data/doctors";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DoctorAIInsights from "@/components/DoctorAIInsights";

const DoctorProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const doctor = doctors.find((d) => d.id === id);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Doctor Not Found</h1>
          <Link to="/doctors/bangladesh">
            <Button>Browse Doctors</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isAvailableToday = doctor.availability.toLowerCase().includes("today");

  // Mock additional data for the profile
  const additionalInfo = {
    about: `${doctor.name} is a highly experienced ${doctor.specialty} specialist with ${doctor.experience} of practice in homeopathic medicine. Known for a patient-centered approach and dedication to providing holistic treatment through constitutional remedies and individualized care.`,
    services: [
      "Constitutional Treatment",
      "Chronic Disease Management",
      "Acute Care",
      "Follow-up Consultation",
      "Online Consultation",
      "Second Opinion"
    ],
    education: [
      { degree: "BHMS", institution: "Dhaka Homeopathic Medical College", year: "1995" },
      { degree: doctor.qualifications?.[1] || "DHMS", institution: "Bangladesh Homeopathic Board", year: "2000" },
      { degree: doctor.qualifications?.[2] || "MD (Hom)", institution: "National Institute of Homeopathy", year: "2005" }
    ],
    schedule: [
      { day: "Saturday", time: "5:00 PM - 9:00 PM" },
      { day: "Sunday", time: "5:00 PM - 9:00 PM" },
      { day: "Monday", time: "5:00 PM - 9:00 PM" },
      { day: "Tuesday", time: "Closed" },
      { day: "Wednesday", time: "5:00 PM - 9:00 PM" },
      { day: "Thursday", time: "5:00 PM - 9:00 PM" },
      { day: "Friday", time: "10:00 AM - 1:00 PM" }
    ],
    patientsSeen: "10,000+",
    successRate: "95%"
  };

  return (
    <>
      <Helmet>
        <title>{doctor.name} - {doctor.specialty} | HomeoDoctorsBD</title>
        <meta name="description" content={`Book an appointment with ${doctor.name}, ${doctor.specialty} specialist at ${doctor.hospital}. ${doctor.experience} experience, ${doctor.rating} rating. Natural healing through homeopathy.`} />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_50%)]" />
          
          <div className="container mx-auto px-4 py-8 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link to={`/doctors/${doctor.location}`} className="hover:text-primary transition-colors capitalize">
                {doctor.location} Doctors
              </Link>
              <span>/</span>
              <span className="text-foreground">{doctor.name}</span>
            </div>

            <Link 
              to={`/doctors/${doctor.location}`}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Doctors
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Doctor Info Card */}
              <div className="lg:col-span-2">
                <div className="card-premium p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-premium">
                        <img 
                          src={doctor.image} 
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 shadow-soft">
                        <BadgeCheck className="w-4 h-4" />
                        Verified
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-lg text-xs font-semibold mb-2">
                            {doctor.specialty}
                          </span>
                          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                            {doctor.name}
                          </h1>
                          {doctor.qualifications && (
                            <p className="text-muted-foreground mt-1">
                              {doctor.qualifications.join(", ")}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" className="rounded-full">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="rounded-full">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1.5 bg-accent/10 text-accent px-3 py-1.5 rounded-xl">
                          <Star className="w-5 h-5" fill="currentColor" />
                          <span className="font-bold">{doctor.rating}</span>
                          <span className="text-sm text-muted-foreground">({doctor.reviews} reviews)</span>
                        </div>
                        <div className={`px-3 py-1.5 rounded-xl text-sm font-semibold flex items-center gap-1.5 ${
                          isAvailableToday 
                            ? "bg-green-500/10 text-green-600" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          <Clock className="w-4 h-4" />
                          {doctor.availability}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Building className="w-4 h-4" />
                          <span className="text-sm">{doctor.hospital}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{doctor.experience} Experience</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">{additionalInfo.patientsSeen} Patients</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">{additionalInfo.successRate} Success Rate</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-4 border-t border-border">
                        <span className="text-2xl font-bold text-primary">{doctor.fee || "৳500"}</span>
                        <span className="text-muted-foreground">per consultation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Card */}
              <div className="lg:col-span-1">
                <div className="card-premium p-6 sticky top-24">
                  <h3 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-primary" />
                    Book Consultation
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Consultation Fee</span>
                      <span className="font-bold text-foreground">{doctor.fee || "৳500"}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Follow-up Fee</span>
                      <span className="font-bold text-foreground">৳300</span>
                    </div>
                  </div>

                  <Button className="w-full h-12 text-base font-semibold shadow-premium mb-3">
                    Book Appointment
                  </Button>
                  <Button variant="outline" className="w-full h-12 text-base font-semibold gap-2">
                    <Phone className="w-4 h-4" />
                    Call Now
                  </Button>

                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>Online consultation available</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Usually responds within 24 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* About */}
                <div className="card-premium p-6">
                  <h2 className="font-display font-bold text-xl text-foreground mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    About
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {additionalInfo.about}
                  </p>
                </div>

                {/* AI Insights */}
                <DoctorAIInsights doctor={doctor} />


                <div className="card-premium p-6">
                  <h2 className="font-display font-bold text-xl text-foreground mb-4">
                    Services Offered
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {additionalInfo.services.map((service, idx) => (
                      <div 
                        key={idx}
                        className="bg-secondary/50 text-secondary-foreground px-4 py-2.5 rounded-xl text-sm font-medium text-center"
                      >
                        {service}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="card-premium p-6">
                  <h2 className="font-display font-bold text-xl text-foreground mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    Education & Training
                  </h2>
                  <div className="space-y-4">
                    {additionalInfo.education.map((edu, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl"
                      >
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                          <p className="text-sm text-muted-foreground">{edu.institution}</p>
                          <p className="text-xs text-muted-foreground mt-1">{edu.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews */}
                <div className="card-premium p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display font-bold text-xl text-foreground">
                      Patient Reviews
                    </h2>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-accent" fill="currentColor" />
                      <span className="font-bold text-lg">{doctor.rating}</span>
                      <span className="text-muted-foreground">({doctor.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { name: "Rahim Ahmed", date: "2 days ago", rating: 5, comment: "Excellent homeopathic doctor! Very thorough and caring. Explained the constitutional treatment in detail." },
                      { name: "Fatema Begum", date: "1 week ago", rating: 5, comment: "Highly recommend. Professional and knowledgeable about homeopathic remedies. My chronic issues improved significantly." },
                      { name: "Kamal Hossain", date: "2 weeks ago", rating: 4, comment: "Good experience overall. The natural treatment approach really worked for me." }
                    ].map((review, idx) => (
                      <div key={idx} className="p-4 bg-muted/30 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                              <span className="font-semibold text-primary">{review.name.charAt(0)}</span>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{review.name}</p>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? "text-accent" : "text-muted"}`}
                                fill={i < review.rating ? "currentColor" : "none"}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full mt-4">
                    View All Reviews
                  </Button>
                </div>
              </div>

              {/* Schedule & Location */}
              <div className="lg:col-span-1 space-y-6">
                {/* Schedule */}
                <div className="card-premium p-6">
                  <h3 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Consultation Hours
                  </h3>
                  <div className="space-y-3">
                    {additionalInfo.schedule.map((item, idx) => (
                      <div 
                        key={idx}
                        className={`flex items-center justify-between py-2 px-3 rounded-lg ${
                          item.time === "Closed" ? "bg-destructive/10 text-destructive" : "bg-muted/50"
                        }`}
                      >
                        <span className="font-medium text-foreground">{item.day}</span>
                        <span className={item.time === "Closed" ? "text-destructive" : "text-muted-foreground"}>
                          {item.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="card-premium p-6">
                  <h3 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Clinic Location
                  </h3>
                  <div className="space-y-4">
                    <div className="aspect-video rounded-xl overflow-hidden bg-muted">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.0611220tried9!2d90.27923710646989!3d23.780573258035692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1703581234567!5m2!1sen!2sbd"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{doctor.hospital}</h4>
                      <p className="text-sm text-muted-foreground capitalize">
                        {doctor.area ? `${doctor.area}, ` : ""}{doctor.location}, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="card-premium p-6">
                  <h3 className="font-display font-bold text-lg text-foreground mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <a href="tel:+8801700000000" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <span>+880 1700-000000</span>
                    </a>
                    <a href="mailto:doctor@homeoconnect.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <span>doctor@homeoconnect.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default DoctorProfilePage;
