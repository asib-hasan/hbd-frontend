import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const PrivacyPolicyPage = () => {
  const lastUpdated = "December 26, 2025";

  const sections = [
    {
      title: "1. Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "When you create an account, book an appointment, or contact us, we may collect information such as your name, email address, phone number, and address. For doctors, we also collect professional credentials including BHMS/DHMS certificates and NID information for verification purposes."
        },
        {
          subtitle: "Health Information",
          text: "To facilitate consultations, we may collect health-related information you provide to doctors through our platform. This information is handled with the highest level of confidentiality."
        },
        {
          subtitle: "Usage Data",
          text: "We automatically collect information about how you interact with our platform, including pages visited, features used, and time spent on the platform."
        }
      ]
    },
    {
      title: "2. How We Use Your Information",
      content: [
        {
          text: "We use your information to provide and improve our services, including facilitating appointment bookings, enabling communication between patients and doctors, verifying doctor credentials, sending appointment reminders and notifications, processing payments, and improving our platform based on usage patterns."
        }
      ]
    },
    {
      title: "3. Information Sharing",
      content: [
        {
          text: "We do not sell your personal information. We may share your information with doctors you book appointments with (limited to what's necessary for the consultation), payment processors for transaction purposes, service providers who help us operate our platform, and legal authorities when required by law."
        }
      ]
    },
    {
      title: "4. Data Security",
      content: [
        {
          text: "We implement industry-standard security measures to protect your information, including encryption of data in transit and at rest, secure access controls, regular security audits, and employee training on data protection. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security."
        }
      ]
    },
    {
      title: "5. Your Rights",
      content: [
        {
          text: "You have the right to access, correct, or delete your personal information. You can update your profile information through your account settings. To request data deletion or obtain a copy of your data, please contact us at privacy@homeodoctorsbd.com."
        }
      ]
    },
    {
      title: "6. Cookies and Tracking",
      content: [
        {
          text: "We use cookies and similar technologies to improve your experience, remember your preferences, and analyze how our platform is used. You can control cookie settings through your browser preferences."
        }
      ]
    },
    {
      title: "7. Third-Party Links",
      content: [
        {
          text: "Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies."
        }
      ]
    },
    {
      title: "8. Children's Privacy",
      content: [
        {
          text: "Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately."
        }
      ]
    },
    {
      title: "9. Changes to This Policy",
      content: [
        {
          text: "We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the 'Last Updated' date. Your continued use of our platform after changes constitutes acceptance of the updated policy."
        }
      ]
    },
    {
      title: "10. Contact Us",
      content: [
        {
          text: "If you have questions about this Privacy Policy or our data practices, please contact us at privacy@homeodoctorsbd.com or call us at +880 1700-000000. You can also write to us at House 123, Road 12, Banani, Dhaka-1213, Bangladesh."
        }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy | HomeoDoctorsBD - Your Data Protection</title>
        <meta name="description" content="Learn how HomeoDoctorsBD protects your personal information and health data. Read our comprehensive privacy policy." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <PageHeader
            title="Privacy Policy"
            description="Your privacy is important to us. This policy explains how we collect, use, and protect your information."
            breadcrumbs={[{ label: "Privacy Policy" }]}
          />

          <section className="section-padding">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="bg-card border border-border rounded-2xl p-8 lg:p-12">
                  <p className="text-sm text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>
                  
                  <div className="prose prose-lg max-w-none">
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      HomeoDoctorsBD ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our homeopathic doctor booking platform.
                    </p>

                    <div className="space-y-8">
                      {sections.map((section, index) => (
                        <div key={index}>
                          <h2 className="font-display text-xl font-bold text-foreground mb-4">{section.title}</h2>
                          <div className="space-y-4">
                            {section.content.map((item, idx) => (
                              <div key={idx}>
                                {item.subtitle && (
                                  <h3 className="font-semibold text-foreground mb-2">{item.subtitle}</h3>
                                )}
                                <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
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

export default PrivacyPolicyPage;