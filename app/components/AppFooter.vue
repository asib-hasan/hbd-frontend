<script setup lang="ts">
const footerLinks = {
    locations: [
        { name: "Best in Bangladesh", href: "/doctors" },
        { name: "Best in Dhaka", href: "/doctors?district=Dhaka" },
        { name: "Best in Chittagong", href: "/doctors?district=Chittagong" },
        { name: "Best in Sylhet", href: "/doctors?district=Sylhet" },
    ],
    services: [
        { name: "Find Doctors", href: "/doctors" },
        { name: "Online Consultation", href: "#" },
        { name: "Constitutional Treatment", href: "#" },
        { name: "Health Articles", href: "/blog" },
    ],
    support: [
        { name: "Help Center", href: "/help" },
        { name: "Contact Us", href: "/contact" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
    ],
};

const socialLinks = [
    { icon: 'i-lucide-facebook', href: "#", label: "Facebook" },
    { icon: 'i-lucide-twitter', href: "#", label: "Twitter" },
    { icon: 'i-lucide-instagram', href: "#", label: "Instagram" },
    { icon: 'i-lucide-linkedin', href: "#", label: "LinkedIn" },
];

const currentYear = new Date().getFullYear();
</script>

<template>
    <footer id="about" class="bg-gradient-dark text-primary-foreground">


        <!-- Main Footer -->
        <div class="container mx-auto px-4 py-16">
            <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
                <!-- Brand -->
                <div class="lg:col-span-2">
                    <NuxtLink to="/" class="flex items-center gap-3 mb-6 group">
                        <div
                            class="bg-white/10 p-2 rounded-xl backdrop-blur-sm group-hover:scale-105 transition-transform">
                            <img src="~/assets/images/logo-new.png" alt="HomeoDoctorsBD Logo"
                                class="h-16 w-auto scale-125 lg:scale-150 origin-left brightness-0 invert" />
                        </div>
                    </NuxtLink>
                    <p class="text-primary-foreground/70 mb-6 max-w-sm leading-relaxed">
                        Your trusted homeopathy platform connecting patients with the best homeopathic doctors across
                        Bangladesh. Natural healing through holistic treatment.
                    </p>
                    <div class="space-y-3">
                        <a href="tel:+8801700000000"
                            class="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors group">
                            <div
                                class="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                                <UIcon name="i-lucide-phone" class="w-5 h-5" />
                            </div>
                            <span>+880 1700-000000</span>
                        </a>
                        <a href="mailto:info@homeodoctorsbd.com"
                            class="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors group">
                            <div
                                class="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                                <UIcon name="i-lucide-mail" class="w-5 h-5" />
                            </div>
                            <span>info@homeodoctorsbd.com</span>
                        </a>
                        <div class="flex items-start gap-3 text-primary-foreground/70">
                            <div
                                class="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <UIcon name="i-lucide-map-pin" class="w-5 h-5" />
                            </div>
                            <span>Dhaka, Bangladesh</span>
                        </div>
                    </div>
                </div>

                <!-- Links -->
                <div>
                    <h4 class="font-display font-bold text-lg text-primary-foreground mb-6">Top Locations</h4>
                    <ul class="space-y-3">
                        <li v-for="link in footerLinks.locations" :key="link.name">
                            <NuxtLink :to="link.href"
                                class="text-primary-foreground/70 hover:text-primary-foreground transition-colors flex items-center gap-1 group">
                                <span>{{ link.name }}</span>
                                <UIcon name="i-lucide-arrow-right"
                                    class="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 class="font-display font-bold text-lg text-primary-foreground mb-6">Services</h4>
                    <ul class="space-y-3">
                        <li v-for="link in footerLinks.services" :key="link.name">
                            <NuxtLink :to="link.href"
                                class="text-primary-foreground/70 hover:text-primary-foreground transition-colors flex items-center gap-1 group">
                                <span>{{ link.name }}</span>
                                <UIcon name="i-lucide-arrow-right"
                                    class="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 class="font-display font-bold text-lg text-primary-foreground mb-6">Support</h4>
                    <ul class="space-y-3">
                        <li v-for="link in footerLinks.support" :key="link.name">
                            <NuxtLink :to="link.href"
                                class="text-primary-foreground/70 hover:text-primary-foreground transition-colors flex items-center gap-1 group">
                                <span>{{ link.name }}</span>
                                <UIcon name="i-lucide-arrow-right"
                                    class="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-primary-foreground/10">
            <div class="container mx-auto px-4 py-6">
                <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p class="text-primary-foreground/60 text-sm">
                        © {{ currentYear }} HomeoDoctorsBD. All rights reserved.
                    </p>
                    <div class="flex items-center gap-3">
                        <a v-for="social in socialLinks" :key="social.label" :href="social.href"
                            :aria-label="social.label"
                            class="w-10 h-10 bg-primary-foreground/10 rounded-xl flex items-center justify-center hover:bg-primary-foreground/20 hover:scale-110 transition-all">
                            <UIcon :name="social.icon" class="w-5 h-5 text-primary-foreground/80" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
