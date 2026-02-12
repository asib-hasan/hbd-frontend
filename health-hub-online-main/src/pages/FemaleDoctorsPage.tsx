import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DoctorCard from "@/components/DoctorCard";
import { Button } from "@/components/ui/button";
import { getFemaleDoctors } from "@/data/doctors";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const FemaleDoctorsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const doctors = getFemaleDoctors();
  const specialties = ["all", ...new Set(doctors.map((d) => d.specialty))];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const breadcrumbs = [
    { label: "Doctors", href: "/doctors/bangladesh" },
    { label: "Female Doctors" },
  ];

  return (
    <>
      <Helmet>
        <title>Best Female Homeopathic Doctors in Bangladesh | HomeoDoctorsBD</title>
        <meta name="description" content="Find and book appointments with the best female homeopathic doctors across Bangladesh. Experienced women practitioners for personalized natural healing." />
        <meta name="keywords" content="female homeopathic doctors, women doctors, homeopathy, natural healing, Bangladesh, BHMS" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <PageHeader
            title="Best Female Homeopathic Doctors in Bangladesh"
            description="Connect with experienced female homeopathic practitioners across Bangladesh. Personalized care and natural healing from trusted women doctors."
            breadcrumbs={breadcrumbs}
            stats={[
              { label: "Female Doctors", value: `${doctors.length}+` },
              { label: "Patient Reviews", value: "10K+" },
            ]}
          />

          {/* Filters Section */}
          <section className="py-8 border-b border-border bg-card/50">
            <div className="container mx-auto px-4">
              <div className="flex flex-col gap-4">
                {/* Search Row */}
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search by name, specialty..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-12 pl-12 pr-4 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                    />
                  </div>
                </div>

                {/* Specialty Filter */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0">
                  <SlidersHorizontal className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  {specialties.slice(0, 6).map((specialty) => (
                    <button
                      key={specialty}
                      onClick={() => setSelectedSpecialty(specialty)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                        selectedSpecialty === specialty
                          ? "bg-primary text-primary-foreground shadow-soft"
                          : "bg-muted hover:bg-muted/80 text-foreground"
                      }`}
                    >
                      {specialty === "all" ? "All Specialties" : specialty}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Doctors Grid */}
          <section className="section-padding bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredDoctors.length}</span> female doctors
                </p>
              </div>

              {filteredDoctors.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {filteredDoctors.map((doctor, index) => (
                    <DoctorCard
                      key={doctor.id}
                      {...doctor}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">No doctors found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                  <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedSpecialty("all"); }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FemaleDoctorsPage;