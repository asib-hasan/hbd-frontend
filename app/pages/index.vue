<script setup lang="ts">
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
        <AppHero />

        <!-- <AppSpecialties /> -->

        <AppFeaturedDoctors />

        <AppHowItWorks />

        <!-- Why Choose Homeopathy -->
        <AppWhyHomeopathy />

        <!-- Banners -->
        <AppBanners />

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
                        <NuxtLink to="/doctors">
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
