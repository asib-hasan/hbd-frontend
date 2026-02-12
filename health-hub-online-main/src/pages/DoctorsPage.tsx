import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DoctorCard from "@/components/DoctorCard";
import { Button } from "@/components/ui/button";
import { getDoctorsByLocation, locationInfo, dhakaAreas, doctors as allDoctors } from "@/data/doctors";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Districts data
const districts = [
  { id: "all", name: "All Districts" },
  { id: "dhaka", name: "Dhaka" },
  { id: "chittagong", name: "Chittagong" },
  { id: "sylhet", name: "Sylhet" },
  { id: "rajshahi", name: "Rajshahi" },
  { id: "khulna", name: "Khulna" },
];

const DoctorsPage = () => {
  const { location = "bangladesh" } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedDistrict, setSelectedDistrict] = useState("all");

  const doctors = getDoctorsByLocation(location);
  const info = locationInfo[location] || locationInfo.bangladesh;
  const isDhaka = location === "dhaka";
  const isDhakaArea = dhakaAreas.some((area) => area.id === location);
  const isBangladesh = location === "bangladesh";

  const specialties = ["all", ...new Set(doctors.map((d) => d.specialty))];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
    const matchesDistrict = selectedDistrict === "all" || doctor.location === selectedDistrict;
    return matchesSearch && matchesSpecialty && matchesDistrict;
  });

  // Build breadcrumbs
  const breadcrumbs: { label: string; href?: string }[] = [
    { label: "Doctors", href: "/doctors/bangladesh" },
  ];
  
  if (isDhakaArea) {
    breadcrumbs.push({ label: "Dhaka", href: "/doctors/dhaka" });
    const areaInfo = dhakaAreas.find((a) => a.id === location);
    breadcrumbs.push({ label: areaInfo?.name || location.charAt(0).toUpperCase() + location.slice(1) });
  } else {
    breadcrumbs.push({ label: location.charAt(0).toUpperCase() + location.slice(1) });
  }

  return (
    <>
      <Helmet>
        <title>{info.title} | HomeoDoctorsBD - Find Top Homeopathic Doctors</title>
        <meta name="description" content={info.description} />
        <meta name="keywords" content={`homeopathy, homeopathic doctors, ${location}, natural healing, holistic treatment, BHMS, Bangladesh`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <PageHeader
            title={info.title}
            description={info.description}
            breadcrumbs={breadcrumbs}
            stats={[
              { label: "Verified Doctors", value: `${info.doctorCount}+` },
              { label: "Partner Clinics", value: `${info.hospitalCount}+` },
            ]}
          />

          {/* Dhaka Areas Section */}
          {isDhaka && (
            <section className="py-8 bg-card/50 border-b border-border">
              <div className="container mx-auto px-4">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Browse by Area in Dhaka
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {dhakaAreas.map((area) => (
                    <Link
                      key={area.id}
                      to={`/doctors/${area.id}`}
                      className="group p-4 bg-background border border-border rounded-xl hover:border-primary/30 hover:shadow-soft transition-all duration-300"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {area.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {area.doctorCount} Doctors
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Filters Section */}
          <section className="py-8 border-b border-border bg-card/50">
            <div className="container mx-auto px-4">
              <div className="flex flex-col gap-4">
                {/* Search and District Filter Row */}
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

                  {/* District Filter */}
                  {isBangladesh && (
                    <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                      <SelectTrigger className="w-full sm:w-48 h-12 bg-background border-border rounded-xl">
                        <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder="Select District" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district.id} value={district.id}>
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
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
                  Showing <span className="font-semibold text-foreground">{filteredDoctors.length}</span> doctors
                </p>
                {isDhakaArea && (
                  <Link to="/doctors/dhaka" className="text-sm text-primary hover:underline">
                    ← Back to all Dhaka doctors
                  </Link>
                )}
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
                  <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedSpecialty("all"); setSelectedDistrict("all"); }}>
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

export default DoctorsPage;
