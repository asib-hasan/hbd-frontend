import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Specialties from "@/components/Specialties";
import FeaturedDoctors from "@/components/FeaturedDoctors";
import Locations from "@/components/Locations";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>HomeoDoctorsBD - Find & Book Expert Homeopathic Doctors Near You</title>
        <meta name="description" content="Connect with experienced homeopathic doctors across Bangladesh. Natural healing through holistic treatment. Book appointments instantly online." />
        <meta name="keywords" content="homeopathy, homeopathic doctors, natural healing, holistic treatment, BHMS, constitutional treatment, Bangladesh" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <AdBanner size="leaderboard" className="bg-background" />
          <Specialties />
          <AdBanner size="banner" className="bg-muted/30" />
          <FeaturedDoctors />
          <AdBanner size="leaderboard" className="bg-background" />
          <HowItWorks />
          <AdBanner size="banner" className="bg-muted/30" />
          <Locations />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
