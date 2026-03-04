<script setup lang="ts">
const steps = [
    {
        icon: 'i-lucide-search',
        title: "Search Doctors",
        description: "Find homeopathic specialists by name, specialty, or location using our smart search.",
        color: "from-emerald-500 to-green-600",
        bgColor: "bg-emerald-500/10",
        iconColor: "text-emerald-500",
    },
    {
        icon: 'i-lucide-user-check',
        title: "Choose Your Doctor",
        description: "Review profiles, qualifications, ratings, and patient reviews in detail.",
        color: "from-violet-500 to-purple-600",
        bgColor: "bg-violet-500/10",
        iconColor: "text-violet-500",
    },
    {
        icon: 'i-lucide-calendar',
        title: "Book Consultation",
        description: "Select your preferred date, time, and book instantly online.",
        color: "from-primary to-teal-600",
        bgColor: "bg-primary/10",
        iconColor: "text-primary",
    },
    {
        icon: 'i-lucide-leaf',
        title: "Get Natural Healing",
        description: "Receive personalized homeopathic treatment for holistic wellness.",
        color: "from-green-500 to-emerald-600",
        bgColor: "bg-green-500/10",
        iconColor: "text-green-500",
    },
];
</script>

<template>
    <section class="py-20 lg:py-32 bg-white relative overflow-hidden">
        <!-- Background Elements -->
        <div
            class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.05),transparent_50%)] pointer-events-none" />
        <div
            class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />

        <!-- Decorative Blurs -->
        <div
            class="absolute top-20 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-float" />
        <div class="absolute bottom-20 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-float"
            style="animation-delay: -2s" />

        <div class="container mx-auto px-4 relative z-10">
            <!-- Section Header -->
            <div class="text-center max-w-3xl mx-auto mb-20">
                <div
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-semibold mb-6 animate-fade-up">
                    <span class="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Simple Process
                </div>
                <h2
                    class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight animate-fade-up stagger-1">
                    Your Journey to <span class="text-gradient">Better Health</span>
                </h2>
                <p class="text-xl text-muted-foreground animate-fade-up stagger-2 leading-relaxed">
                    Experience seamless healthcare with our simple 4-step process designed for your convenience
                </p>
            </div>

            <!-- Steps -->
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                <div v-for="(step, index) in steps" :key="step.title" class="relative group animate-fade-up"
                    :style="{ animationDelay: `${index * 0.15}s` }">

                    <!-- Connector Line (Desktop) -->
                    <div v-if="index < steps.length - 1"
                        class="hidden lg:block absolute top-16 left-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-border to-transparent -z-10 opacity-50"
                        style="transform: translateX(50%)">
                        <div
                            class="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent w-1/2 animate-shimmer" />
                    </div>

                    <!-- Card Content -->
                    <div class="relative z-10 flex flex-col items-center text-center">
                        <!-- Icon Container -->
                        <div
                            class="relative mb-8 group-hover:-translate-y-2 transition-transform duration-500 ease-out">
                            <!-- Glow Effect -->
                            <div class="absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                                :class="step.bgColor.replace('/10', '/30')" />

                            <!-- Icon Box -->
                            <div class="w-32 h-32 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/50 shadow-soft relative overflow-hidden"
                                :class="step.bgColor">
                                <div
                                    class="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <UIcon :name="step.icon"
                                    class="w-14 h-14 relative z-10 transition-transform duration-500 group-hover:scale-110"
                                    :class="step.iconColor" />
                            </div>

                            <!-- Step Number Badge -->
                            <div class="absolute -top-3 -right-3 w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold shadow-lg text-white bg-gradient-to-br ring-4 ring-white"
                                :class="step.color">
                                {{ index + 1 }}
                            </div>
                        </div>

                        <!-- Text Content -->
                        <div class="space-y-3 px-4">
                            <h3
                                class="font-display font-bold text-2xl text-foreground group-hover:text-primary transition-colors duration-300">
                                {{ step.title }}
                            </h3>
                            <p class="text-muted-foreground leading-relaxed">
                                {{ step.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom CTA -->
            <div class="mt-20 text-center animate-fade-up stagger-3">
                <NuxtLink to="/doctors/bangladesh">
                    <UButton size="xl"
                        class="px-10 h-14 text-base shadow-glow hover:shadow-glow-accent transition-all duration-300 font-semibold rounded-2xl">
                        Find a Doctor Now
                        <UIcon name="i-lucide-arrow-right" class="w-5 h-5 ml-2" />
                    </UButton>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
