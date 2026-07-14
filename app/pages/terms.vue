<script setup lang="ts">
import AppFooter from '~/components/AppFooter.vue';

useHead({
    title: 'Terms of Service | HomeoDoctorsBD',
    meta: [
        { name: 'description', content: 'Read the Terms of Service for HomeoDoctorsBD. Understand your rights and responsibilities when using Bangladesh\'s leading homeopathy platform.' }
    ]
})

const lastUpdated = 'March 13, 2025';

const sections = [
    {
        icon: 'i-lucide-file-text',
        title: 'Acceptance of Terms',
        content: 'By accessing or using HomeoDoctorsBD ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the platform. These terms apply to all visitors, patients, doctors, and anyone else who accesses or uses the platform.'
    },
    {
        icon: 'i-lucide-monitor',
        title: 'Use of the Platform',
        content: 'HomeoDoctorsBD provides an online directory to connect patients with registered homeopathic doctors in Bangladesh. The platform is intended for lawful, personal, and non-commercial use. You agree not to use the platform for any unlawful purposes, to post false or misleading information, to impersonate any person or entity, or to attempt to gain unauthorized access to any part of the platform or its systems.'
    },
    {
        icon: 'i-lucide-stethoscope',
        title: 'Medical Disclaimer',
        content: 'HomeoDoctorsBD is a directory and communication platform — we are NOT a healthcare provider. The information on doctor profiles is provided for informational purposes only. Content on this platform does not constitute medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare professional for any medical condition. Never disregard professional medical advice or delay seeking it because of something you read on this platform.'
    },
    {
        icon: 'i-lucide-user-circle',
        title: 'Doctor Listings',
        content: 'Doctors listed on HomeoDoctorsBD have been reviewed for basic credential verification. However, HomeoDoctorsBD does not guarantee the accuracy, completeness, or suitability of any doctor for any particular patient\'s needs. Patients are responsible for independently verifying a doctor\'s credentials and using their own judgment when choosing a healthcare provider. The relationship between a patient and a doctor is solely between those two parties.'
    },
    {
        icon: 'i-lucide-shield-alert',
        title: 'Limitation of Liability',
        content: 'To the fullest extent permitted by applicable law, HomeoDoctorsBD and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform or inability to use it. This includes damages resulting from any treatment or advice given by a doctor found through our platform. HomeoDoctorsBD\'s maximum liability for any claim shall not exceed the amount you paid us (if any) in the 12 months preceding the claim.'
    },
    {
        icon: 'i-lucide-copyright',
        title: 'Intellectual Property',
        content: 'All content on HomeoDoctorsBD — including but not limited to text, graphics, logos, icons, and software — is the property of HomeoDoctorsBD or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission. Doctor profile information submitted by doctors remains their intellectual property, but by submitting it, they grant HomeoDoctorsBD a license to display it on the platform.'
    },
    {
        icon: 'i-lucide-user-check',
        title: 'User Responsibilities',
        content: 'Users of HomeoDoctorsBD are responsible for: (a) maintaining the confidentiality of any account credentials; (b) all activities that occur under their account; (c) ensuring that any information they provide to the platform is accurate and up to date; (d) complying with all applicable local, national, and international laws in connection with their use of the platform; and (e) treating other users, including doctors and platform staff, with respect.'
    },
    {
        icon: 'i-lucide-link-2-off',
        title: 'Third-Party Links',
        content: 'The platform may contain links to third-party websites or services (such as Google Maps for chamber locations). These links are provided for your convenience only. HomeoDoctorsBD has no control over the content of those sites and accepts no responsibility for any loss or damage that may arise from your use of them. Visiting any linked website is at your own risk.'
    },
    {
        icon: 'i-lucide-ban',
        title: 'Termination',
        content: 'HomeoDoctorsBD reserves the right to suspend or terminate any user\'s access to the platform at any time, with or without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, third parties, or for any other reason at our sole discretion. Upon termination, all licenses and rights granted to you will immediately cease.'
    },
    {
        icon: 'i-lucide-refresh-cw',
        title: 'Changes to Terms',
        content: 'HomeoDoctorsBD may revise these Terms of Service at any time. We will make reasonable efforts to notify users of significant changes. By continuing to use the platform after changes are posted, you accept and agree to the revised terms. We encourage you to review these terms periodically to stay informed about your rights and obligations.'
    },
    {
        icon: 'i-lucide-scale',
        title: 'Governing Law',
        content: 'These Terms of Service shall be governed by and construed in accordance with the laws of the People\'s Republic of Bangladesh. Any disputes arising from these terms or your use of the platform shall be subject to the exclusive jurisdiction of the courts located in Dhaka, Bangladesh.'
    },
    {
        icon: 'i-lucide-mail',
        title: 'Contact Information',
        content: 'If you have any questions, concerns, or feedback about these Terms of Service, please contact us at info@homeodoctorsbd.com or through the Contact Us page on our platform. We welcome your input and will respond to all legitimate enquiries in a timely manner.'
    },
];

const highlights = [
    { icon: 'i-lucide-stethoscope', color: 'text-orange-600', bg: 'bg-orange-500/10', text: 'We are a directory, not a medical provider' },
    { icon: 'i-lucide-scale', color: 'text-blue-600', bg: 'bg-blue-500/10', text: 'Governed by Bangladesh law' },
    { icon: 'i-lucide-user-check', color: 'text-primary', bg: 'bg-primary/10', text: 'You are responsible for your use of the platform' },
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
                    <span class="text-foreground font-medium">Terms of Service</span>
                </nav>
                <div class="max-w-3xl mx-auto text-center animate-fade-up">
                    <div
                        class="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <UIcon name="i-lucide-scroll-text" class="w-4 h-4" />
                        Terms of Service
                    </div>
                    <h1 class="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                        Terms of <span class="text-primary">Service</span>
                    </h1>
                    <p class="text-lg text-muted-foreground leading-relaxed mb-4">
                        Please read these terms carefully before using HomeoDoctorsBD. These terms govern your access
                        to and use of our platform and services.
                    </p>
                    <div
                        class="inline-flex items-center gap-2 bg-muted/60 text-muted-foreground px-4 py-2 rounded-xl text-sm">
                        <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                        Last updated: {{ lastUpdated }}
                    </div>
                </div>
            </div>
        </section>

        <!-- Key Highlights -->
        <section class="py-10 bg-amber-500/5 border-y border-amber-500/20">
            <div class="container mx-auto px-4">
                <p class="text-center text-sm font-semibold text-amber-700 dark:text-amber-400 mb-6 flex items-center justify-center gap-2">
                    <UIcon name="i-lucide-lightbulb" class="w-4 h-4" />
                    Key Things to Know
                </p>
                <div class="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div v-for="(h, idx) in highlights" :key="idx"
                        class="flex items-center gap-3">
                        <div :class="`w-10 h-10 ${h.bg} rounded-xl flex items-center justify-center flex-shrink-0`">
                            <UIcon :name="h.icon" :class="`w-5 h-5 ${h.color}`" />
                        </div>
                        <p class="text-sm font-medium text-foreground">{{ h.text }}</p>
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
                        <ol class="space-y-2 columns-1 sm:columns-2">
                            <li v-for="(section, idx) in sections" :key="idx"
                                class="flex items-center gap-3 text-muted-foreground text-sm break-inside-avoid">
                                <span
                                    class="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                                    {{ idx + 1 }}
                                </span>
                                {{ section.title }}
                            </li>
                        </ol>
                    </div>

                    <!-- Sections -->
                    <div class="space-y-6">
                        <div v-for="(section, idx) in sections" :key="idx"
                            class="card-premium p-8 animate-fade-up"
                            :style="{ animationDelay: `${idx * 0.04}s` }">
                            <div class="flex items-start gap-4 mb-4">
                                <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <UIcon :name="section.icon" class="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <span class="text-xs font-bold text-primary uppercase tracking-wider">{{ idx + 1 }}.</span>
                                    <h2 class="font-display text-xl font-bold text-foreground">{{ section.title }}</h2>
                                </div>
                            </div>
                            <p class="text-muted-foreground leading-relaxed pl-0 md:pl-16 text-sm md:text-base">
                                {{ section.content }}
                            </p>
                        </div>
                    </div>

                    <!-- Agreement note -->
                    <div class="mt-12 card-premium p-8 text-center animate-fade-up bg-primary/5 border-primary/20">
                        <div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <UIcon name="i-lucide-handshake" class="w-7 h-7 text-primary" />
                        </div>
                        <h3 class="font-display font-bold text-xl text-foreground mb-2">By Using Our Platform</h3>
                        <p class="text-muted-foreground mb-6 text-sm max-w-xl mx-auto">
                            You acknowledge that you have read, understood, and agree to be bound by these Terms of
                            Service and our Privacy Policy.
                        </p>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <NuxtLink to="/doctors">
                                <UButton size="lg" class="gap-2 font-semibold shadow-glow-accent">
                                    <UIcon name="i-lucide-search" class="w-4 h-4" />
                                    Find a Doctor
                                </UButton>
                            </NuxtLink>
                            <NuxtLink to="/contact">
                                <UButton variant="outline" size="lg" class="gap-2 font-semibold">
                                    <UIcon name="i-lucide-mail" class="w-4 h-4" />
                                    Questions? Contact Us
                                </UButton>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <AppFooter />
    </div>
</template>
