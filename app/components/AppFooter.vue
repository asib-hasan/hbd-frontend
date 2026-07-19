<script setup lang="ts">
import { computed } from 'vue'

const { t } = useI18n()
const localePath = useLocalePath()

const footerLinks = computed(() => ({
    important_links: [
        { name: t("footer.links.about"), href: "/about" },
        { name: t("footer.links.blog"), href: "/blog" },
        { name: t("footer.links.contact"), href: "/contact" },
        { name: t("footer.links.join_doctor"), href: "/register" },
    ],
    top_areas: [
        { name: t("footer.top_areas.mirpur"), href: "/locations/mirpur" },
        { name: t("footer.top_areas.dhanmondi"), href: "/locations/dhanmondi" },
        { name: t("footer.top_areas.gulshan"), href: "/locations/gulshan" },
        { name: t("footer.top_areas.uttara"), href: "/locations/uttara" },
    ],
    support: [
        { name: t("footer.links.help"), href: "/help" },
        { name: t("footer.links.privacy"), href: "/privacy" },
        { name: t("footer.links.terms"), href: "/terms" },
    ],
}));

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
                    <NuxtLink :to="localePath('/')" class="flex items-center gap-3 mb-6 group">
                        <div
                            class="p-2 rounded-xl group-hover:scale-105 transition-transform">
                            <img src="~/assets/images/logo-new-white.png" alt="HomeoDoctorsBD Logo"
                                class="h-16 w-auto scale-125 lg:scale-150 origin-left" />
                        </div>
                    </NuxtLink>
                    <p class="text-primary-foreground/70 mb-6 max-w-sm leading-relaxed">
                        {{ $t('footer.desc') }}
                    </p>
                    <div class="space-y-3 mt-6">
                        <a href="mailto:info@homeodoctorsbd.com"
                            class="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors group">
                            <div
                                class="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                                <UIcon name="i-lucide-mail" class="w-5 h-5" />
                            </div>
                            <span>info@homeodoctorsbd.com</span>
                        </a>
                    </div>
                </div>

                <!-- Links -->
                <div>
                    <h4 class="font-display font-bold text-lg text-primary-foreground mb-6">{{ $t('footer.links_title_1') }}</h4>
                    <ul class="space-y-3">
                        <li v-for="link in footerLinks.important_links" :key="link.name">
                            <NuxtLink :to="localePath(link.href)"
                                class="text-primary-foreground/70 hover:text-primary-foreground transition-colors flex items-center gap-1 group">
                                <span>{{ link.name }}</span>
                                <UIcon name="i-lucide-arrow-right"
                                    class="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Top Areas (New Column) -->
                <div>
                    <h4 class="font-display font-bold text-lg text-primary-foreground mb-6">{{ $t('footer.links_title_3') }}</h4>
                    <ul class="space-y-3">
                        <li v-for="link in footerLinks.top_areas" :key="link.name">
                            <NuxtLink :to="localePath(link.href)"
                                class="text-primary-foreground/70 hover:text-primary-foreground transition-colors flex items-center gap-1 group">
                                <span>{{ link.name }}</span>
                                <UIcon name="i-lucide-arrow-right"
                                    class="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 class="font-display font-bold text-lg text-primary-foreground mb-6">{{ $t('footer.links_title_2') }}</h4>
                    <ul class="space-y-3">
                        <li v-for="link in footerLinks.support" :key="link.name">
                            <NuxtLink :to="localePath(link.href)"
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
                        © {{ currentYear }} HomeoDoctorsBD. {{ $t('footer.rights') }}
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
