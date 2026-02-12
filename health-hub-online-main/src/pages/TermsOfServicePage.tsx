import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const TermsOfServicePage = () => {
  const lastUpdated = "December 26, 2025";

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using HomeoDoctorsBD's platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this platform."
    },
    {
      title: "2. Description of Service",
      content: "HomeoDoctorsBD is an online platform that connects patients with homeopathic doctors in Bangladesh. We provide tools for doctor discovery, appointment booking, and facilitating consultations. We are not a healthcare provider and do not provide medical advice."
    },
    {
      title: "3. User Accounts",
      content: "To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must provide accurate, current, and complete information during registration. You agree to notify us immediately of any unauthorized use of your account."
    },
    {
      title: "4. Doctor Registration",
      content: "Doctors must provide valid BHMS/DHMS certificates and NID for verification. We reserve the right to reject or remove any doctor who provides false credentials, engages in unprofessional conduct, or violates these terms. Doctors are responsible for the accuracy of their profile information including qualifications, fees, and availability."
    },
    {
      title: "5. Appointments and Consultations",
      content: "Appointments booked through our platform are agreements between patients and doctors. HomeoConnect facilitates these bookings but is not a party to the doctor-patient relationship. Cancellation policies are set by individual doctors. Patients should review these before booking. We are not responsible for the quality of medical care provided by doctors on our platform."
    },
    {
      title: "6. Payments",
      content: "Payment processing is handled by third-party payment providers. HomeoConnect may charge service fees for certain features. All fees are in Bangladeshi Taka (BDT). Refund policies vary by doctor and are subject to their individual terms."
    },
    {
      title: "7. User Conduct",
      content: "You agree not to use the platform to impersonate any person or entity, post false, misleading, or fraudulent content, harass, abuse, or harm others, violate any applicable laws or regulations, attempt to gain unauthorized access to our systems, or use the platform for any unlawful purpose."
    },
    {
      title: "8. Intellectual Property",
      content: "All content on HomeoDoctorsBD, including text, graphics, logos, and software, is our property or licensed to us and is protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our written permission."
    },
    {
      title: "9. Disclaimer of Warranties",
      content: "The platform is provided 'as is' without warranties of any kind. We do not guarantee that the platform will be uninterrupted, secure, or error-free. We do not endorse any particular doctor or guarantee the quality of medical services. Users rely on doctors' services at their own risk."
    },
    {
      title: "10. Limitation of Liability",
      content: "HomeoDoctorsBD shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform. Our total liability for any claims shall not exceed the amount you paid us in the past 12 months."
    },
    {
      title: "11. Indemnification",
      content: "You agree to indemnify and hold harmless HomeoDoctorsBD and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the platform or violation of these terms."
    },
    {
      title: "12. Modifications to Service",
      content: "We reserve the right to modify, suspend, or discontinue any part of the platform at any time without notice. We may also modify these Terms of Service at any time. Continued use of the platform after changes constitutes acceptance of the new terms."
    },
    {
      title: "13. Termination",
      content: "We may terminate or suspend your account at any time for violation of these terms or for any other reason at our sole discretion. Upon termination, your right to use the platform ceases immediately."
    },
    {
      title: "14. Governing Law",
      content: "These Terms of Service are governed by the laws of Bangladesh. Any disputes arising from these terms shall be resolved in the courts of Dhaka, Bangladesh."
    },
    {
      title: "15. Contact Information",
      content: "For questions about these Terms of Service, please contact us at legal@homeodoctorsbd.com or call +880 1700-000000. You can also write to us at House 123, Road 12, Banani, Dhaka-1213, Bangladesh."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Terms of Service | HomeoDoctorsBD - User Agreement</title>
        <meta name="description" content="Read HomeoDoctorsBD's Terms of Service. Understand your rights and responsibilities when using our homeopathic doctor booking platform." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <PageHeader
            title="Terms of Service"
            description="Please read these terms carefully before using our platform."
            breadcrumbs={[{ label: "Terms of Service" }]}
          />

          <section className="section-padding">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="bg-card border border-border rounded-2xl p-8 lg:p-12">
                  <p className="text-sm text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>
                  
                  <div className="prose prose-lg max-w-none">
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      Welcome to HomeoDoctorsBD. These Terms of Service ("Terms") govern your use of our website, mobile applications, and services (collectively, the "Platform"). By using our Platform, you agree to these Terms.
                    </p>

                    <div className="space-y-8">
                      {sections.map((section, index) => (
                        <div key={index}>
                          <h2 className="font-display text-xl font-bold text-foreground mb-4">{section.title}</h2>
                          <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-12 p-6 bg-muted/50 rounded-xl">
                      <p className="text-muted-foreground text-sm">
                        By using HomeoDoctorsBD, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TermsOfServicePage;