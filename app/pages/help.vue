<script setup lang="ts">
import AppFooter from '~/components/AppFooter.vue';

useHead({
    title: 'Help Center | HomeoDoctorsBD',
    meta: [
        { name: 'description', content: 'Find answers to your questions about HomeoDoctorsBD. Learn how to find doctors, book appointments, and get the most out of our homeopathy platform.' }
    ]
})

const categories = [
    { icon: 'i-lucide-search', title: 'Finding Doctors', desc: 'Search by specialty, district, or name', count: 6 },
    { icon: 'i-lucide-calendar-check', title: 'Appointments', desc: 'Booking, rescheduling, and cancellations', count: 8 },
    { icon: 'i-lucide-user-circle', title: 'Your Account', desc: 'Profile, settings, and preferences', count: 5 },
    { icon: 'i-lucide-credit-card', title: 'Payments & Fees', desc: 'Consultation fees and payment methods', count: 4 },
    { icon: 'i-lucide-shield-check', title: 'Safety & Privacy', desc: 'Data security and doctor verification', count: 7 },
    { icon: 'i-lucide-stethoscope', title: 'Doctor Registration', desc: 'How to register as a homeopathic doctor', count: 5 },
];

const faqs = [
    {
        category: 'General',
        items: [
            {
                q: 'What is HomeoDoctorsBD?',
                a: 'HomeoDoctorsBD is Bangladesh\'s leading platform dedicated to connecting patients with verified homeopathic doctors across the country. We make it easy to find, research, and contact qualified homeopathic practitioners in your district.'
            },
            {
                q: 'Is HomeoDoctorsBD available all over Bangladesh?',
                a: 'Yes! We cover all 64 districts of Bangladesh. You can filter doctors by your district or area to find the most convenient practitioners near you.'
            },
            {
                q: 'Is the service free for patients?',
                a: 'Yes, browsing and finding doctors on HomeoDoctorsBD is completely free for patients. The consultation fee is set by the individual doctor and is displayed clearly on their profile.'
            },
        ]
    },
    {
        category: 'Finding a Doctor',
        items: [
            {
                q: 'How do I search for a homeopathic doctor?',
                a: 'Visit the Doctors page and use the filters to search by district, specialty, or doctor name. Each doctor\'s profile shows their qualifications, experience, fees, chambers, and visiting hours.'
            },
            {
                q: 'Are all doctors verified?',
                a: 'Yes. Every doctor listed on HomeoDoctorsBD goes through a verification process. We confirm their credentials, BHMS/MD qualifications, and professional registration before approving their profile.'
            },
            {
                q: 'Can I see a doctor\'s chamber (clinic) locations?',
                a: 'Absolutely. Each doctor\'s profile page shows all their chamber locations, visiting hours, contact numbers, and a map link for directions.'
            },
        ]
    },
    {
        category: 'Appointments & Contact',
        items: [
            {
                q: 'How do I book an appointment?',
                a: 'Currently, you can contact the doctor directly using the hotline or chamber contact numbers listed on their profile page. Online booking is coming soon!'
            },
            {
                q: 'What if a doctor\'s phone is not reachable?',
                a: 'If you cannot reach the doctor\'s listed number, please use the "Contact Us" form on our website and we will assist you in getting connected with the doctor\'s chamber staff.'
            },
        ]
    },
    {
        category: 'For Doctors',
        items: [
            {
                q: 'How can I register as a doctor on the platform?',
                a: 'Doctors can register through our admin panel or by contacting us directly at info@homeodoctorsbd.com. We will verify your credentials and create your professional profile.'
            },
            {
                q: 'Can I update my chamber schedule and contact info?',
                a: 'Yes. Once registered, our admin team can update your chamber locations, visiting hours, contact numbers, and all profile information at any time.'
            },
        ]
    },
];

const openIndex = ref<string | null>(null);
const toggle = (key: string) => {
    openIndex.value = openIndex.value === key ? null : key;
};
</script>

<template>
    <div class="min-h-screen bg-background">
        <!-- Hero -->
        <section
            class="relative bg-gradient-to-br from-primary/5 via-background to-secondary/10 pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_50%)]" />
            <div class="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div class="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

            <div class="container mx-auto px-4 relative z-10">
                <div class="max-w-3xl mx-auto text-center animate-fade-up">
                    <div
                        class="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <UIcon name="i-lucide-help-circle" class="w-4 h-4" />
                        Help Center
                    </div>
                    <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                        How can we <span class="text-primary">help you?</span>
                    </h1>
                    <p class="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                        Find answers to common questions about finding doctors, appointments, and using the
                        HomeoDoctorsBD platform.
                    </p>
                    <!-- Search Bar removed -->
                </div>
            </div>
        </section>

        <!-- Category Cards -->
        <section class="py-16 md:py-20">
            <div class="container mx-auto px-4">
                <div class="text-center max-w-2xl mx-auto mb-12 animate-fade-up">
                    <h2 class="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Browse by Category
                    </h2>
                    <p class="text-muted-foreground">Select a topic to find relevant answers quickly</p>
                </div>
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <div v-for="(cat, idx) in categories" :key="idx"
                        class="card-premium p-6 flex items-start gap-4 cursor-pointer hover:-translate-y-1 transition-all duration-300 group animate-fade-up"
                        :style="{ animationDelay: `${idx * 0.08}s` }">
                        <div
                            class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                            <UIcon :name="cat.icon" class="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 class="font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                                {{ cat.title }}
                            </h3>
                            <p class="text-sm text-muted-foreground mb-2">{{ cat.desc }}</p>
                            <span
                                class="inline-block bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-lg">
                                {{ cat.count }} articles
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section class="py-16 md:py-20 bg-muted/30">
            <div class="container mx-auto px-4">
                <div class="text-center max-w-2xl mx-auto mb-12 animate-fade-up">
                    <h2 class="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p class="text-muted-foreground">Quick answers to the most common questions</p>
                </div>

                <div class="max-w-3xl mx-auto space-y-10">
                    <div v-for="(section, sIdx) in faqs" :key="sIdx" class="animate-fade-up"
                        :style="{ animationDelay: `${sIdx * 0.1}s` }">
                        <h3
                            class="font-display font-bold text-lg text-primary mb-4 flex items-center gap-2 uppercase tracking-wider text-sm">
                            <span class="flex-1 h-px bg-primary/20" />
                            {{ section.category }}
                            <span class="flex-1 h-px bg-primary/20" />
                        </h3>
                        <div class="space-y-3">
                            <div v-for="(faq, fIdx) in section.items" :key="fIdx"
                                class="card-premium overflow-hidden">
                                <button
                                    class="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                                    @click="toggle(`${sIdx}-${fIdx}`)">
                                    <span class="font-semibold text-foreground pr-4">{{ faq.q }}</span>
                                    <UIcon
                                        :name="openIndex === `${sIdx}-${fIdx}` ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                                        class="w-5 h-5 text-primary flex-shrink-0 transition-transform" />
                                </button>
                                <Transition name="faq">
                                    <div v-if="openIndex === `${sIdx}-${fIdx}`"
                                        class="px-5 pb-5 text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                                        {{ faq.a }}
                                    </div>
                                </Transition>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Still Need Help CTA -->
        <section class="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
            <div class="container mx-auto px-4">
                <div class="max-w-2xl mx-auto text-center animate-fade-up">
                    <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <UIcon name="i-lucide-message-circle" class="w-8 h-8 text-primary" />
                    </div>
                    <h2 class="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Still need help?
                    </h2>
                    <p class="text-muted-foreground mb-8 leading-relaxed">
                        Can't find what you're looking for? Our support team is ready to assist you directly.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <NuxtLink to="/contact">
                            <UButton size="lg" class="gap-2 shadow-glow-accent px-8 font-semibold">
                                <UIcon name="i-lucide-mail" class="w-4 h-4" />
                                Contact Support
                            </UButton>
                        </NuxtLink>
                        <a href="tel:+8801700000000">
                            <UButton variant="outline" size="lg" class="gap-2 px-8 font-semibold">
                                <UIcon name="i-lucide-phone" class="w-4 h-4" />
                                Call Us
                            </UButton>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <AppFooter />
    </div>
</template>

<style scoped>
.faq-enter-active,
.faq-leave-active {
    transition: all 0.25s ease;
    overflow: hidden;
}

.faq-enter-from,
.faq-leave-to {
    opacity: 0;
    max-height: 0;
}

.faq-enter-to,
.faq-leave-from {
    opacity: 1;
    max-height: 300px;
}
</style>
