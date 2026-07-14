<script setup lang="ts">
import AppFooter from '~/components/AppFooter.vue';

useHead({
    title: 'Privacy Policy | HomeoDoctorsBD',
    meta: [
        { name: 'description', content: 'Read HomeoDoctorsBD\'s Privacy Policy to understand how we collect, use, and protect your personal information on our homeopathy platform.' }
    ]
})

const lastUpdated = 'March 13, 2025';

const sections = [
    {
        icon: 'i-lucide-database',
        title: 'Information We Collect',
        content: [
            {
                subtitle: 'Information You Provide',
                text: 'When you use HomeoDoctorsBD, we may collect information you provide directly, such as your name, phone number, email address, and location when you contact a doctor or register on our platform.'
            },
            {
                subtitle: 'Automatically Collected Information',
                text: 'We automatically collect certain technical information when you visit our site, including your IP address, browser type, pages visited, and the time and date of your visit. This helps us understand how users interact with our platform.'
            },
            {
                subtitle: 'Doctor Profile Information',
                text: 'For registered doctors, we collect professional information including qualifications, registration numbers, chamber addresses, visiting hours, and contact details that are displayed publicly on the platform.'
            }
        ]
    },
    {
        icon: 'i-lucide-settings-2',
        title: 'How We Use Your Information',
        content: [
            {
                subtitle: 'Platform Operation',
                text: 'We use your information to operate and improve HomeoDoctorsBD, including displaying doctor profiles, facilitating patient-doctor connections, and providing customer support.'
            },
            {
                subtitle: 'Communication',
                text: 'We may use your contact information to send you important service updates, newsletters (if subscribed), and responses to your inquiries. You can opt out of non-essential communications at any time.'
            },
            {
                subtitle: 'Analytics & Improvement',
                text: 'We analyze aggregated, anonymized usage data to understand trends and improve the platform\'s functionality and user experience. This data does not identify individual users.'
            }
        ]
    },
    {
        icon: 'i-lucide-share-2',
        title: 'Information Sharing',
        content: [
            {
                subtitle: 'We Do Not Sell Your Data',
                text: 'HomeoDoctorsBD does not sell, rent, or trade your personal information to third parties for marketing purposes. Period.'
            },
            {
                subtitle: 'Public Doctor Profiles',
                text: 'Doctor profile information (name, qualifications, chambers, contact numbers) is publicly visible on the platform by design, enabling patients to find and contact practitioners easily.'
            },
            {
                subtitle: 'Service Providers',
                text: 'We may share information with trusted service providers who assist in operating our platform (e.g., hosting, SMS services), under strict confidentiality agreements.'
            },
            {
                subtitle: 'Legal Requirements',
                text: 'We may disclose information when required by law, court order, or governmental authority, or to protect the rights and safety of our users and the public.'
            }
        ]
    },
    {
        icon: 'i-lucide-shield',
        title: 'Data Security',
        content: [
            {
                subtitle: 'Security Measures',
                text: 'We implement industry-standard security measures including encrypted connections (HTTPS), secure servers, and access controls to protect your information from unauthorized access, alteration, or disclosure.'
            },
            {
                subtitle: 'No Absolute Guarantee',
                text: 'While we take data security seriously, no method of transmission over the internet or electronic storage is 100% secure. We encourage you to use strong passwords and be cautious when sharing personal information online.'
            }
        ]
    },
    {
        icon: 'i-lucide-cookie',
        title: 'Cookies & Tracking',
        content: [
            {
                subtitle: 'What Are Cookies',
                text: 'Cookies are small text files stored on your device that help us recognize you and remember your preferences across visits. They are essential for the proper functioning of our platform.'
            },
            {
                subtitle: 'Types We Use',
                text: 'We use essential cookies (necessary for the site to function), analytics cookies (to understand usage patterns), and preference cookies (to remember your settings). We do not use advertising or tracking cookies.'
            },
            {
                subtitle: 'Cookie Control',
                text: 'You can control and delete cookies through your browser settings. However, disabling essential cookies may affect the functionality of certain parts of the platform.'
            }
        ]
    },
    {
        icon: 'i-lucide-user-check',
        title: 'Your Rights',
        content: [
            {
                subtitle: 'Access & Correction',
                text: 'You have the right to access the personal information we hold about you and to request corrections if that information is inaccurate or incomplete.'
            },
            {
                subtitle: 'Data Deletion',
                text: 'You may request deletion of your personal data from our systems. Please note that some information may be retained for legal or operational reasons even after a deletion request.'
            },
            {
                subtitle: 'Opt-Out',
                text: 'You can opt out of receiving marketing communications from us at any time by clicking the "unsubscribe" link in any email or by contacting us directly.'
            }
        ]
    },
    {
        icon: 'i-lucide-child',
        title: 'Children\'s Privacy',
        content: [
            {
                subtitle: 'Age Restriction',
                text: 'HomeoDoctorsBD is not directed at children under 13 years of age. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately.'
            }
        ]
    },
    {
        icon: 'i-lucide-refresh-cw',
        title: 'Policy Updates',
        content: [
            {
                subtitle: 'Changes to This Policy',
                text: 'We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. We will notify users of significant changes by posting a prominent notice on our platform or via email.'
            },
            {
                subtitle: 'Your Continued Use',
                text: 'Your continued use of HomeoDoctorsBD after any changes to this policy constitutes your acceptance of the updated terms.'
            }
        ]
    },
];
</script>

<template>
    <div class="min-h-screen bg-background">
        <!-- Hero -->
        <section
            class="relative bg-gradient-to-br from-primary/5 via-background to-secondary/10 pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_50%)]" />
            <div class="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

            <div class="container mx-auto px-4 relative z-10">
                <nav class="flex items-center gap-2 text-sm text-muted-foreground mb-6 animate-fade-up">
                    <NuxtLink to="/" class="hover:text-primary transition-colors">Home</NuxtLink>
                    <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
                    <span class="text-foreground font-medium">Privacy Policy</span>
                </nav>
                <div class="max-w-3xl mx-auto text-center animate-fade-up">
                    <div
                        class="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <UIcon name="i-lucide-shield-check" class="w-4 h-4" />
                        Privacy Policy
                    </div>
                    <h1 class="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                        Your Privacy <span class="text-primary">Matters to Us</span>
                    </h1>
                    <p class="text-lg text-muted-foreground leading-relaxed mb-4">
                        At HomeoDoctorsBD, we are committed to being transparent about how we handle your personal
                        information. This policy explains what data we collect, why we collect it, and how we protect it.
                    </p>
                    <div
                        class="inline-flex items-center gap-2 bg-muted/60 text-muted-foreground px-4 py-2 rounded-xl text-sm">
                        <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                        Last updated: {{ lastUpdated }}
                    </div>
                </div>
            </div>
        </section>

        <!-- Quick Summary Banner -->
        <section class="py-10 bg-primary/5 border-y border-primary/10">
            <div class="container mx-auto px-4">
                <div class="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
                    <div class="flex flex-col items-center gap-2">
                        <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <UIcon name="i-lucide-x-circle" class="w-6 h-6 text-primary" />
                        </div>
                        <p class="font-semibold text-foreground text-sm">We never sell your data</p>
                    </div>
                    <div class="flex flex-col items-center gap-2">
                        <div class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                            <UIcon name="i-lucide-lock" class="w-6 h-6 text-blue-600" />
                        </div>
                        <p class="font-semibold text-foreground text-sm">Encrypted & secure connections</p>
                    </div>
                    <div class="flex flex-col items-center gap-2">
                        <div class="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                            <UIcon name="i-lucide-user-x" class="w-6 h-6 text-purple-600" />
                        </div>
                        <p class="font-semibold text-foreground text-sm">You control your data</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Content -->
        <section class="py-16 md:py-24">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto">
                    <!-- TOC -->
                    <div class="card-premium p-6 mb-12 animate-fade-up">
                        <h2 class="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                            <UIcon name="i-lucide-list" class="w-5 h-5 text-primary" />
                            Table of Contents
                        </h2>
                        <ol class="space-y-2">
                            <li v-for="(section, idx) in sections" :key="idx"
                                class="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm">
                                <span
                                    class="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                                    {{ idx + 1 }}
                                </span>
                                {{ section.title }}
                            </li>
                        </ol>
                    </div>

                    <!-- Sections -->
                    <div class="space-y-8">
                        <div v-for="(section, idx) in sections" :key="idx"
                            class="card-premium p-8 animate-fade-up"
                            :style="{ animationDelay: `${idx * 0.05}s` }">
                            <div class="flex items-start gap-4 mb-6">
                                <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <UIcon :name="section.icon" class="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <span class="text-xs font-bold text-primary uppercase tracking-wider">Section {{ idx + 1 }}</span>
                                    <h2 class="font-display text-xl md:text-2xl font-bold text-foreground">
                                        {{ section.title }}
                                    </h2>
                                </div>
                            </div>
                            <div class="space-y-5 pl-0 md:pl-16">
                                <div v-for="(item, iIdx) in section.content" :key="iIdx">
                                    <h3 class="font-semibold text-foreground mb-2 flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                                        {{ item.subtitle }}
                                    </h3>
                                    <p class="text-muted-foreground leading-relaxed text-sm md:text-base">
                                        {{ item.text }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Contact for Privacy -->
                    <div class="mt-12 card-premium p-8 text-center animate-fade-up bg-primary/5 border-primary/20">
                        <div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <UIcon name="i-lucide-mail" class="w-7 h-7 text-primary" />
                        </div>
                        <h3 class="font-display font-bold text-xl text-foreground mb-2">Privacy Questions?</h3>
                        <p class="text-muted-foreground mb-6 text-sm">
                            If you have any questions about this Privacy Policy or how we handle your data, please
                            reach out to us.
                        </p>
                        <NuxtLink to="/contact">
                            <UButton size="lg" class="gap-2 font-semibold shadow-glow-accent">
                                <UIcon name="i-lucide-mail" class="w-4 h-4" />
                                Contact Our Privacy Team
                            </UButton>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>

        <AppFooter />
    </div>
</template>
