<script setup lang="ts">
import { ref, onMounted } from 'vue'

const trustBadges = [
    'Government Registered',
    'BHMS Certified',
    'Verified Reviews',
]
</script>

<template>
    <section class="relative min-h-[92vh] flex items-center overflow-hidden">
        <!-- Background -->
        <div class="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div
            class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(173_80%_30%/0.08),transparent_50%)]" />
        <div
            class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(25_95%_53%/0.05),transparent_50%)]" />

        <!-- Floating Decorative Elements -->
        <div class="absolute top-32 left-[10%] w-20 h-20 rounded-full bg-primary/8 blur-xl animate-float" />
        <div class="absolute top-48 right-[15%] w-32 h-32 rounded-full bg-accent/6 blur-2xl animate-float"
            style="animation-delay: -2s" />
        <div class="absolute bottom-32 left-[20%] w-24 h-24 rounded-full bg-primary/5 blur-xl animate-float"
            style="animation-delay: -4s" />

        <!-- Grid Pattern -->
        <div class="absolute inset-0 opacity-[0.02]"
            style="background-image: radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0); background-size: 40px 40px;" />

        <div class="container mx-auto px-4 relative z-10 py-16 lg:py-0">
            <div class="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
                <!-- Left Column - Content -->
                <div class="max-w-2xl">
                    <!-- Trust Badge -->
                    <div
                        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8 animate-fade-up">
                        <span class="relative flex h-2.5 w-2.5">
                            <span
                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                        </span>
                        <span class="text-sm font-semibold text-primary">Bangladesh's #1 Homeopathy Platform</span>
                    </div>

                    <!-- Headline -->
                    <h1
                        class="font-display text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold text-foreground leading-[1.1] mb-6 animate-fade-up stagger-1">
                        Find & Book
                        <span class="relative inline-block">
                            <span class="text-gradient">Expert</span>
                            <svg class="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 5.5C30 2 58 1 100 3C142 5 170 4 199 2" stroke="hsl(25 95% 53%)"
                                    stroke-width="2.5" stroke-linecap="round" opacity="0.6" />
                            </svg>
                        </span>
                        <br />
                        Homeopathic Doctors
                    </h1>

                    <p
                        class="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl animate-fade-up stagger-2">
                        Connect with 500+ verified homeopathic practitioners across Bangladesh.
                        Natural healing through holistic treatment — book instantly online.
                    </p>

                    <!-- CTA Button instead of Search Box -->
                    <div class="mb-10 animate-fade-up stagger-2">
                        <NuxtLink to="/doctors">
                            <button
                                class="h-14 px-8 bg-primary text-primary-foreground font-semibold rounded-xl shadow-glow hover:shadow-glow-accent transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 text-lg">
                                Find Doctors Now
                                <UIcon name="i-lucide-arrow-right" class="w-5 h-5" />
                            </button>
                        </NuxtLink>
                    </div>

                    <!-- Trust Badges -->
                    <div class="flex flex-wrap items-center gap-4 animate-fade-up stagger-3">
                        <div v-for="badge in trustBadges" :key="badge"
                            class="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <UIcon name="i-lucide-badge-check" class="w-4 h-4 text-primary" />
                            {{ badge }}
                        </div>
                    </div>
                </div>

                <!-- Right Column - Visual -->
                <div class="hidden lg:block relative animate-fade-up stagger-2">
                    <div class="relative">
                        <!-- Top Areas in Dhaka -->
                        <div
                            class="relative bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white/50 p-8 z-10 overflow-hidden group">
                            <!-- Background Map Pattern/Gradient -->
                            <div
                                class="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                            <div
                                class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-radial from-accent/5 to-transparent rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                            <div class="flex items-center gap-4 mb-8 relative z-10">
                                <div
                                    class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10 flex-shrink-0 shadow-sm">
                                    <UIcon name="i-lucide-map-pin" class="w-7 h-7 text-primary" />
                                </div>
                                <div>
                                    <h3 class="font-display font-bold text-foreground text-2xl tracking-tight mb-1">Top
                                        Areas in Dhaka</h3>
                                    <p class="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                                        <UIcon name="i-lucide-search" class="w-3.5 h-3.5" />
                                        Find doctors in your neighborhood
                                    </p>
                                </div>
                            </div>

                            <div class="flex flex-wrap gap-3 relative z-10">
                                <NuxtLink
                                    v-for="(area, i) in ['Uttara', 'Mirpur', 'Mohammadpur', 'Puran Dhaka', 'Kamalapur', 'Motijheel', 'Gulistan', 'Badda', 'Dhanmondi', 'Mohakhali', 'Banani', 'Basundhara']"
                                    :key="area" :to="`/doctors?search=${area}`"
                                    class="group/tag relative px-4 py-2.5 rounded-xl border border-border/50 bg-white/80 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/5 shadow-sm hover:shadow-md text-[15px] font-semibold text-foreground hover:text-primary transition-all duration-300 transform hover:-translate-y-0.5 overflow-hidden"
                                    :style="{ animationDelay: `${i * 0.05}s` }">
                                    <!-- Subtle shine effect on hover -->
                                    <div
                                        class="absolute inset-0 -translate-x-full group-hover/tag:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                    <span class="relative z-10 flex items-center gap-1.5">
                                        {{ area }}
                                        <UIcon name="i-lucide-arrow-up-right"
                                            class="w-3.5 h-3.5 opacity-0 group-hover/tag:opacity-100 -translate-x-1 translate-y-1 group-hover/tag:translate-x-0 group-hover/tag:translate-y-0 transition-all duration-300" />
                                    </span>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
