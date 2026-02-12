import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, Loader2, LogOut, Crown, Check, Star, FileText, Download, Receipt, MapPin, Trophy } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { format } from "date-fns";

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  avatar_url: string | null;
  is_doctor: boolean;
}

interface Subscription {
  id: string;
  plan_name: string;
  plan_type: string;
  status: string;
  price: number;
  billing_cycle: string;
  start_date: string;
  end_date: string | null;
}

interface Invoice {
  id: string;
  invoice_number: string;
  amount: number;
  status: string;
  billing_date: string;
  due_date: string;
  paid_at: string | null;
  subscription_id: string;
}

const positionPackages = [
  {
    id: "position-1",
    position: 1,
    name: "1st Position",
    icon: "🥇",
    color: "from-yellow-400 to-amber-500",
    borderColor: "border-yellow-400",
    pricing: { "3": { price: 4999, originalPrice: 5999 }, "6": { price: 8999, originalPrice: 11999 }, "12": { price: 14999, originalPrice: 23999 } },
  },
  {
    id: "position-2",
    position: 2,
    name: "2nd Position",
    icon: "🥈",
    color: "from-gray-300 to-gray-400",
    borderColor: "border-gray-300",
    pricing: { "3": { price: 4499, originalPrice: 5499 }, "6": { price: 7999, originalPrice: 10999 }, "12": { price: 12999, originalPrice: 21999 } },
  },
  {
    id: "position-3",
    position: 3,
    name: "3rd Position",
    icon: "🥉",
    color: "from-orange-400 to-orange-500",
    borderColor: "border-orange-400",
    pricing: { "3": { price: 3999, originalPrice: 4999 }, "6": { price: 6999, originalPrice: 9999 }, "12": { price: 10999, originalPrice: 19999 } },
  },
  {
    id: "position-4",
    position: 4,
    name: "4th Position",
    icon: "4️⃣",
    color: "from-blue-400 to-blue-500",
    borderColor: "border-blue-400",
    pricing: { "3": { price: 3499, originalPrice: 4499 }, "6": { price: 5999, originalPrice: 8999 }, "12": { price: 9499, originalPrice: 17999 } },
  },
  {
    id: "position-5",
    position: 5,
    name: "5th Position",
    icon: "5️⃣",
    color: "from-green-400 to-green-500",
    borderColor: "border-green-400",
    pricing: { "3": { price: 2999, originalPrice: 3999 }, "6": { price: 4999, originalPrice: 7999 }, "12": { price: 7999, originalPrice: 15999 } },
  },
  {
    id: "position-6",
    position: 6,
    name: "6th Position",
    icon: "6️⃣",
    color: "from-teal-400 to-teal-500",
    borderColor: "border-teal-400",
    pricing: { "3": { price: 2499, originalPrice: 3499 }, "6": { price: 3999, originalPrice: 6999 }, "12": { price: 6499, originalPrice: 13999 } },
  },
  {
    id: "position-7",
    position: 7,
    name: "7th Position",
    icon: "7️⃣",
    color: "from-purple-400 to-purple-500",
    borderColor: "border-purple-400",
    pricing: { "3": { price: 1999, originalPrice: 2999 }, "6": { price: 3499, originalPrice: 5999 }, "12": { price: 5499, originalPrice: 11999 } },
  },
  {
    id: "position-8",
    position: 8,
    name: "8th Position",
    icon: "8️⃣",
    color: "from-pink-400 to-pink-500",
    borderColor: "border-pink-400",
    pricing: { "3": { price: 1499, originalPrice: 2499 }, "6": { price: 2499, originalPrice: 4999 }, "12": { price: 3999, originalPrice: 9999 } },
  },
  {
    id: "position-9",
    position: 9,
    name: "9th Position",
    icon: "9️⃣",
    color: "from-indigo-400 to-indigo-500",
    borderColor: "border-indigo-400",
    pricing: { "3": { price: 999, originalPrice: 1999 }, "6": { price: 1799, originalPrice: 3999 }, "12": { price: 2999, originalPrice: 7999 } },
  },
  {
    id: "position-10",
    position: 10,
    name: "10th Position",
    icon: "🔟",
    color: "from-slate-400 to-slate-500",
    borderColor: "border-slate-400",
    pricing: { "3": { price: 699, originalPrice: 1499 }, "6": { price: 1199, originalPrice: 2999 }, "12": { price: 1999, originalPrice: 5999 } },
  },
];

const availableAreas = [
  { id: "bangladesh", name: "All Bangladesh" },
  { id: "dhaka", name: "Dhaka" },
  { id: "uttara", name: "Uttara, Dhaka" },
  { id: "dhanmondi", name: "Dhanmondi, Dhaka" },
  { id: "mohammadpur", name: "Mohammadpur, Dhaka" },
  { id: "mirpur", name: "Mirpur, Dhaka" },
  { id: "gulshan", name: "Gulshan, Dhaka" },
  { id: "banani", name: "Banani, Dhaka" },
  { id: "chittagong", name: "Chittagong" },
  { id: "sylhet", name: "Sylhet" },
  { id: "rajshahi", name: "Rajshahi" },
  { id: "khulna", name: "Khulna" },
];

const durationOptions = [
  { value: "3", label: "3 Months", discount: "Save 15%" },
  { value: "6", label: "6 Months", discount: "Save 25%" },
  { value: "12", label: "12 Months", discount: "Save 35%" },
];

const ProfilePage = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedArea, setSelectedArea] = useState("dhaka");
  const [selectedDuration, setSelectedDuration] = useState("3");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session?.user) {
          navigate("/auth");
        } else {
          setUser(session.user);
          setTimeout(() => {
            fetchProfile(session.user.id);
            fetchSubscriptions(session.user.id);
          }, 0);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchProfile(session.user.id);
        fetchSubscriptions(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchSubscriptions = async (userId: string) => {
    const { data: subsData, error: subsError } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (subsError) {
      console.error("Error fetching subscriptions:", subsError);
    } else if (subsData) {
      setSubscriptions(subsData);
      
      // Fetch invoices for all subscriptions
      const { data: invoicesData, error: invoicesError } = await supabase
        .from("invoices")
        .select("*")
        .eq("user_id", userId)
        .order("billing_date", { ascending: false });

      if (invoicesError) {
        console.error("Error fetching invoices:", invoicesError);
      } else if (invoicesData) {
        setInvoices(invoicesData);
      }
    }
  };

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching profile:", error);
    } else if (data) {
      setProfile(data);
      setFullName(data.full_name || "");
      setPhone(data.phone || "");
    }
    setLoading(false);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        phone: phone,
      })
      .eq("user_id", user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleSelectPackage = (packageId: string) => {
    toast({
      title: "Contact Us",
      description: `To subscribe to the ${packageId} package, please contact us at support@homeoconnect.com or call +880 1700-000000`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
              <p className="text-muted-foreground mt-1">Manage your account and subscription</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full max-w-lg grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="my-subscriptions">My Subscriptions</TabsTrigger>
              <TabsTrigger value="subscription">Packages</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your profile details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={user?.email || ""}
                          className="pl-10"
                          disabled
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+880 1XXXXXXXXX"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <Button type="submit" disabled={saving}>
                      {saving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="my-subscriptions">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Receipt className="w-5 h-5" />
                      My Subscriptions
                    </CardTitle>
                    <CardDescription>View your active and past subscriptions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {subscriptions.length === 0 ? (
                      <div className="text-center py-8">
                        <Crown className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">You don't have any subscriptions yet.</p>
                        <p className="text-sm text-muted-foreground mt-1">Check out our packages to get started!</p>
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Plan</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Billing</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {subscriptions.map((sub) => (
                            <TableRow key={sub.id}>
                              <TableCell className="font-medium capitalize">{sub.plan_name}</TableCell>
                              <TableCell>
                                <Badge 
                                  variant={sub.status === 'active' ? 'default' : sub.status === 'cancelled' ? 'destructive' : 'secondary'}
                                >
                                  {sub.status}
                                </Badge>
                              </TableCell>
                              <TableCell>৳{sub.price}</TableCell>
                              <TableCell className="capitalize">{sub.billing_cycle}</TableCell>
                              <TableCell>{format(new Date(sub.start_date), 'MMM dd, yyyy')}</TableCell>
                              <TableCell>{sub.end_date ? format(new Date(sub.end_date), 'MMM dd, yyyy') : '-'}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Invoices
                    </CardTitle>
                    <CardDescription>View and download your billing invoices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {invoices.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No invoices found.</p>
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Invoice #</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Billing Date</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Paid At</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {invoices.map((invoice) => (
                            <TableRow key={invoice.id}>
                              <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
                              <TableCell>৳{invoice.amount}</TableCell>
                              <TableCell>
                                <Badge 
                                  variant={
                                    invoice.status === 'paid' ? 'default' : 
                                    invoice.status === 'pending' ? 'secondary' : 
                                    invoice.status === 'failed' ? 'destructive' : 'outline'
                                  }
                                >
                                  {invoice.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{format(new Date(invoice.billing_date), 'MMM dd, yyyy')}</TableCell>
                              <TableCell>{format(new Date(invoice.due_date), 'MMM dd, yyyy')}</TableCell>
                              <TableCell>
                                {invoice.paid_at ? format(new Date(invoice.paid_at), 'MMM dd, yyyy') : '-'}
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm" className="gap-1">
                                  <Download className="w-4 h-4" />
                                  Download
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="subscription">
              <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Crown className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Current Plan: Free</h3>
                        <p className="text-sm text-muted-foreground">
                          Boost your visibility with area-wise position packages
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Position-Based Packages</h2>
                  <p className="text-muted-foreground mb-6">
                    Secure your position in search results for your preferred area
                  </p>

                  {/* Area and Duration Selection */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-8 p-4 bg-muted/30 rounded-xl">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        Select Area
                      </Label>
                      <Select value={selectedArea} onValueChange={setSelectedArea}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an area" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableAreas.map((area) => (
                            <SelectItem key={area.id} value={area.id}>
                              {area.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-primary" />
                        Package Duration
                      </Label>
                      <div className="flex gap-2">
                        {durationOptions.map((option) => (
                          <Button
                            key={option.value}
                            variant={selectedDuration === option.value ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedDuration(option.value)}
                            className="flex-1 flex-col h-auto py-2"
                          >
                            <span className="font-semibold">{option.label}</span>
                            <span className="text-xs opacity-80">{option.discount}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {positionPackages.map((pkg) => {
                      const pricing = pkg.pricing[selectedDuration as keyof typeof pkg.pricing];
                      const perMonth = Math.round(pricing.price / parseInt(selectedDuration));
                      
                      return (
                        <Card
                          key={pkg.id}
                          className={`relative overflow-hidden transition-all hover:shadow-lg ${pkg.borderColor} border-2`}
                        >
                          <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${pkg.color}`} />
                          <CardHeader className="text-center pb-2">
                            <div className="text-3xl mb-1">{pkg.icon}</div>
                            <CardTitle className="text-lg">{pkg.name}</CardTitle>
                            <div className="pt-3">
                              <div className="flex items-center justify-center gap-2">
                                <span className="text-xs text-muted-foreground line-through">৳{pricing.originalPrice}</span>
                                <Badge variant="secondary" className="text-xs">Save {Math.round((1 - pricing.price / pricing.originalPrice) * 100)}%</Badge>
                              </div>
                              <div className="mt-1">
                                <span className="text-2xl font-bold text-foreground">৳{pricing.price}</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                ৳{perMonth}/month
                              </p>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-2">
                            <Button
                              className="w-full"
                              size="sm"
                              variant={pkg.position <= 3 ? "default" : "outline"}
                              onClick={() => handleSelectPackage(`${pkg.name} - ${availableAreas.find(a => a.id === selectedArea)?.name} - ${selectedDuration} months`)}
                            >
                              Select
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  <p className="text-center text-sm text-muted-foreground mt-8">
                    Need multiple areas or custom positions?{" "}
                    <a href="mailto:support@homeoconnect.com" className="text-primary hover:underline">
                      Contact us
                    </a>{" "}
                    for custom packages.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
