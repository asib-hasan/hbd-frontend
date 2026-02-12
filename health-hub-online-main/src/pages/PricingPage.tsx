import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Crown, Leaf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const subscriptionPackages = [
  {
    id: "basic",
    name: "Basic",
    price: "৳999",
    period: "/month",
    yearlyPrice: "৳9,990",
    yearlyPeriod: "/year",
    description: "Perfect for new homeopaths starting their practice",
    features: [
      "Profile listing on platform",
      "Up to 50 patient inquiries/month",
      "Basic analytics dashboard",
      "Email support",
      "Standard profile badge",
    ],
    popular: false,
    icon: Leaf,
  },
  {
    id: "professional",
    name: "Professional",
    price: "৳2,499",
    period: "/month",
    yearlyPrice: "৳24,990",
    yearlyPeriod: "/year",
    description: "For established practitioners seeking growth",
    features: [
      "Priority profile listing",
      "Unlimited patient inquiries",
      "Advanced analytics & insights",
      "Priority support (24/7)",
      "Verified badge",
      "Appointment booking system",
      "Patient review management",
    ],
    popular: true,
    icon: Star,
  },
  {
    id: "premium",
    name: "Premium",
    price: "৳4,999",
    period: "/month",
    yearlyPrice: "৳49,990",
    yearlyPeriod: "/year",
    description: "Complete solution for clinics and senior doctors",
    features: [
      "Featured profile placement",
      "Unlimited everything",
      "Custom branding options",
      "Dedicated account manager",
      "Premium verified badge",
      "Multi-location support",
      "Patient CRM integration",
      "Marketing tools & promotions",
      "Video consultation support",
    ],
    popular: false,
    icon: Crown,
  },
];

const PricingPage = () => {
  const { toast } = useToast();

  const handleSelectPackage = (packageName: string) => {
    toast({
      title: "Contact Us",
      description: `To subscribe to the ${packageName} package, please contact us at support@homeodoctorsbd.com or call +880 1700-000000`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Pricing - Doctor Subscription Packages | HomeoDoctorsBD</title>
        <meta
          name="description"
          content="Choose the perfect subscription plan to grow your homeopathic practice. Basic, Professional, and Premium packages available."
        />
      </Helmet>

      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Pricing Plans
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Grow Your Homeopathic Practice
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect subscription plan to reach more patients and expand your holistic healthcare services
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {subscriptionPackages.map((pkg) => {
                const IconComponent = pkg.icon;
                return (
                  <Card
                    key={pkg.id}
                    className={`relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 ${
                      pkg.popular ? "border-primary shadow-lg ring-2 ring-primary/20 scale-105" : ""
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground py-2 text-center text-sm font-semibold">
                        Most Popular
                      </div>
                    )}
                    <CardHeader className={pkg.popular ? "pt-12" : ""}>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                      <CardDescription className="min-h-[48px]">{pkg.description}</CardDescription>
                      <div className="pt-4">
                        <span className="text-5xl font-bold text-foreground">{pkg.price}</span>
                        <span className="text-muted-foreground">{pkg.period}</span>
                        <p className="text-sm text-muted-foreground mt-1">
                          or {pkg.yearlyPrice}{pkg.yearlyPeriod} (save 2 months)
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <ul className="space-y-3">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3 text-sm">
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-primary" />
                            </div>
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full"
                        size="lg"
                        variant={pkg.popular ? "default" : "outline"}
                        onClick={() => handleSelectPackage(pkg.name)}
                      >
                        {pkg.popular ? "Get Started Now" : "Choose Plan"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-2">How do I subscribe?</h3>
                <p className="text-muted-foreground">
                    Contact our team at support@homeodoctorsbd.com or call +880 1700-000000. We'll help you choose the right plan and set up your account.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-2">Can I upgrade my plan later?</h3>
                  <p className="text-muted-foreground">
                    Yes! You can upgrade your subscription at any time. The price difference will be prorated for the remaining billing period.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-2">Is there a free trial?</h3>
                  <p className="text-muted-foreground">
                    We offer a 7-day free trial for all new doctors. Experience our platform before committing to a subscription.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-2">What payment methods are accepted?</h3>
                  <p className="text-muted-foreground">
                    We accept bKash, Nagad, bank transfers, and all major credit/debit cards. Monthly and yearly billing options available.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="bg-primary text-primary-foreground overflow-hidden">
              <CardContent className="py-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Practice?</h2>
                <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
                  Join hundreds of homeopathic doctors who trust HomeoDoctorsBD to connect with patients seeking holistic healthcare.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={() => handleSelectPackage("Professional")}
                  >
                    Start Free Trial
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                    onClick={() => window.location.href = "mailto:support@homeodoctorsbd.com"}
                  >
                    Contact Sales
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;
