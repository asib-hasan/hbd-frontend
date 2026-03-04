<script setup lang="ts">
const testimonials = [
    {
        name: "Rahim Ahmed",
        location: "Dhaka",
        rating: 5,
        text: "I was suffering from chronic migraines for years. Found Dr. Karim through HomeoDoctorsBD and after 3 months of treatment, I'm completely migraine-free. The booking process was so easy!",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
        doctor: "Dr. Abdul Karim",
    },
    {
        name: "Fatema Begum",
        location: "Chittagong",
        rating: 5,
        text: "My daughter's recurring allergies were treated naturally without any side effects. The doctor was so patient and caring. Highly recommend this platform for child healthcare.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
        doctor: "Dr. Fatema Rahman",
    },
    {
        name: "Kamal Hossain",
        location: "Sylhet",
        rating: 5,
        text: "As someone skeptical about homeopathy, I was pleasantly surprised. The constitutional treatment approach truly works. My chronic skin condition has improved dramatically.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
        doctor: "Dr. Ahsan Habib",
    },
]

useHead({
    title: 'HomeoDoctorsBD - Find & Book Expert Homeopathic Doctors Near You',
    meta: [
        { name: 'description', content: 'Connect with experienced homeopathic doctors across Bangladesh. Natural healing through holistic treatment. Book appointments instantly online.' },
        { name: 'keywords', content: 'homeopathy, homeopathic doctors, natural healing, holistic treatment, BHMS, constitutional treatment, Bangladesh' }
    ]
})
</script>

<template>
    <div class="min-h-screen bg-background">
        <!-- Hero Section -->
        <AppHero />

        <!-- Specialties Section -->
        <AppSpecialties />

        <!-- Featured Doctors -->
        <AppFeaturedDoctors />

        <!-- How It Works -->
        <AppHowItWorks />

        <!-- Testimonials Section -->
        <section class="py-20 lg:py-28 bg-background relative overflow-hidden">
            <!-- Background -->
            <div
                class="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl" />
            <div
                class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-accent/5 to-transparent rounded-full blur-3xl" />

            <div class="container mx-auto px-4 relative z-10">
                <!-- Section Header -->
                <div class="text-center max-w-3xl mx-auto mb-16">
                    <div
                        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-semibold mb-6 animate-fade-up">
                        <UIcon name="i-lucide-message-square" class="w-4 h-4" />
                        Patient Stories
                    </div>
                    <h2
                        class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-up stagger-1">
                        Trusted by <span class="text-gradient">Thousands</span>
                    </h2>
                    <p class="text-lg text-muted-foreground animate-fade-up stagger-2">
                        Real stories from patients who found healing through our platform
                    </p>
                </div>

                <!-- Testimonials Grid -->
                <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
                    <div v-for="(testimonial, index) in testimonials" :key="testimonial.name"
                        class="group relative bg-white rounded-2xl border border-border/50 p-7 transition-all duration-300 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1 animate-fade-up"
                        :style="{ animationDelay: `${index * 0.12}s` }">
                        <!-- Quote Icon -->
                        <div class="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <svg class="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                            </svg>
                        </div>

                        <!-- Stars -->
                        <div class="flex items-center gap-0.5 mb-4">
                            <UIcon v-for="i in testimonial.rating" :key="i" name="i-lucide-star"
                                class="w-4 h-4 text-amber-400" />
                        </div>

                        <!-- Text -->
                        <p class="text-foreground/80 leading-relaxed mb-6 text-[15px]">
                            "{{ testimonial.text }}"
                        </p>

                        <!-- Author -->
                        <div class="flex items-center justify-between pt-4 border-t border-border/40">
                            <div class="flex items-center gap-3">
                                <img :src="testimonial.avatar" :alt="testimonial.name"
                                    class="w-10 h-10 rounded-full object-cover ring-2 ring-primary/10" />
                                <div>
                                    <p class="font-semibold text-sm text-foreground">{{ testimonial.name }}</p>
                                    <p class="text-xs text-muted-foreground">{{ testimonial.location }}</p>
                                </div>
                            </div>
                            <div class="text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full">
                                {{ testimonial.doctor }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Locations -->
        <AppLocations />

        <!-- Bottom CTA Section -->
        <section class="py-20 lg:py-28 relative overflow-hidden">
            <!-- Gradient Background -->
            <div class="absolute inset-0 bg-gradient-to-br from-primary via-primary to-teal-600" />
            <div
                class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
            <div
                class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.08),transparent_50%)]" />

            <!-- Floating Elements -->
            <div class="absolute top-16 left-[10%] w-20 h-20 rounded-full bg-white/5 blur-xl animate-float" />
            <div class="absolute bottom-16 right-[10%] w-32 h-32 rounded-full bg-white/5 blur-xl animate-float"
                style="animation-delay: -3s" />

            <div class="container mx-auto px-4 relative z-10">
                <div class="max-w-3xl mx-auto text-center">
                    <div
                        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-semibold mb-8 animate-fade-up">
                        <UIcon name="i-lucide-sparkles" class="w-4 h-4" />
                        Start Your Healing Journey
                    </div>
                    <h2
                        class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight animate-fade-up stagger-1">
                        Ready to Experience Natural Healing?
                    </h2>
                    <p class="text-lg text-white/80 mb-10 max-w-2xl mx-auto animate-fade-up stagger-2">
                        Join thousands of patients who have found relief through qualified homeopathic treatment.
                        Book your consultation in minutes.
                    </p>
                    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up stagger-3">
                        <NuxtLink to="/doctors/bangladesh">
                            <button
                                class="group h-14 px-8 bg-white text-primary font-bold rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2.5 text-base">
                                Find a Doctor Now
                                <UIcon name="i-lucide-arrow-right"
                                    class="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </button>
                        </NuxtLink>
                        <NuxtLink to="/contact">
                            <button
                                class="h-14 px-8 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl border border-white/20 transition-all duration-300 flex items-center gap-2.5 text-base backdrop-blur-sm">
                                <UIcon name="i-lucide-phone" class="w-5 h-5" />
                                Contact Us
                            </button>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
