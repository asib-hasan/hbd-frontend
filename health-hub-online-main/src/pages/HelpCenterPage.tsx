import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle, Phone, Mail, BookOpen, Users, Calendar, CreditCard } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const HelpCenterPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { icon: Users, title: "Account & Profile", description: "Manage your account settings and profile", count: 8 },
    { icon: Calendar, title: "Appointments", description: "Book, reschedule or cancel appointments", count: 12 },
    { icon: BookOpen, title: "For Doctors", description: "Doctor registration and management", count: 10 },
    { icon: CreditCard, title: "Payments & Billing", description: "Payment methods and invoices", count: 6 },
  ];

  const faqs = [
    {
      question: "How do I book an appointment with a homeopathic doctor?",
      answer: "To book an appointment, browse our doctors list, select a doctor, and click 'Book Appointment'. Choose your preferred date and time, fill in your details, and confirm your booking. You'll receive a confirmation via email and SMS."
    },
    {
      question: "How can I register as a doctor on HomeoDoctorsBD?",
      answer: "Click 'Sign Up' and select 'Doctor Account'. Fill in your details including your BHMS/DHMS certificate, NID, and other required documents. Our team will verify your credentials within 24-48 hours."
    },
    {
      question: "What qualifications do your doctors have?",
      answer: "All doctors on our platform are verified homeopathic practitioners with BHMS (Bachelor of Homeopathic Medicine and Surgery) or DHMS (Diploma in Homeopathic Medicine and Surgery) qualifications from recognized institutions."
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer: "Yes, you can cancel or reschedule your appointment up to 2 hours before the scheduled time. Go to 'My Appointments' in your profile and select the appointment you wish to modify."
    },
    {
      question: "How do online consultations work?",
      answer: "Online consultations are conducted via video call. After booking, you'll receive a link to join the consultation at the scheduled time. Ensure you have a stable internet connection and a quiet environment."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept bKash, Nagad, Rocket, credit/debit cards, and bank transfers. Payment can be made at the time of booking or at the clinic for in-person consultations."
    },
    {
      question: "How do I leave a review for a doctor?",
      answer: "After your consultation, you'll receive a prompt to rate your experience. You can also go to the doctor's profile page and click 'Write a Review' if you've had a verified appointment."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we take data security seriously. All personal and medical information is encrypted and stored securely. We never share your information with third parties without your consent."
    },
  ];

  const filteredFaqs = faqs.filter(
    faq => faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
           faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Help Center | HomeoDoctorsBD - Get Support & Answers</title>
        <meta name="description" content="Find answers to common questions about HomeoDoctorsBD. Get help with appointments, doctor registration, payments, and more." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <PageHeader
            title="Help Center"
            description="Find answers to your questions and get the support you need."
            breadcrumbs={[{ label: "Help Center" }]}
          />

          {/* Search Section */}
          <section className="py-12 bg-card/50 border-b border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for help articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-14 pl-12 pr-4 text-lg rounded-xl"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">Browse by Category</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <div
                    key={category.title}
                    className="p-6 bg-card border border-border rounded-2xl hover:border-primary/30 hover:shadow-soft transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <category.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{category.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                    <span className="text-xs text-primary font-medium">{category.count} articles</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30"
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline py-5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                {filteredFaqs.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Contact Options */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">Still Need Help?</h2>
              <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Link
                  to="/contact"
                  className="p-6 bg-card border border-border rounded-2xl hover:border-primary/30 hover:shadow-soft transition-all text-center group"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <MessageCircle className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Send a Message</h3>
                  <p className="text-sm text-muted-foreground">Contact us via our form</p>
                </Link>
                <a
                  href="tel:+8801700000000"
                  className="p-6 bg-card border border-border rounded-2xl hover:border-primary/30 hover:shadow-soft transition-all text-center group"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Call Us</h3>
                  <p className="text-sm text-muted-foreground">+880 1700-000000</p>
                </a>
                <a
                  href="mailto:support@homeodoctorsbd.com"
                  className="p-6 bg-card border border-border rounded-2xl hover:border-primary/30 hover:shadow-soft transition-all text-center group"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Email Us</h3>
                  <p className="text-sm text-muted-foreground">support@homeodoctorsbd.com</p>
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HelpCenterPage;