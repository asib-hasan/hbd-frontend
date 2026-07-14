<script setup lang="ts">
const steps = [
    {
        icon: 'i-lucide-search',
        title: "Search Doctors",
        description: "Find homeopathic specialists by name, specialty, or location using our smart search.",
        color: "from-primary to-blue-600",
        bgColor: "bg-primary/10",
        iconColor: "text-primary",
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
        color: "from-cyan-500 to-primary",
        bgColor: "bg-primary/10",
        iconColor: "text-primary",
    },
];
</script>

<template>
    <section class="py-12 lg:py-16 bg-muted/20 relative overflow-hidden">
        <!-- Background Elements -->
        <div class="absolute inset-0 bg-hero-pattern opacity-30" />
        <div
            class="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] opacity-70 translate-x-1/3 -translate-y-1/2 pointer-events-none" />
        <div
            class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[80px] opacity-60 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div class="container mx-auto px-4 relative z-10">
            <!-- Section Header -->
            <div class="text-center max-w-3xl mx-auto mb-20 lg:mb-28">
                <span class="badge badge-primary mb-6 animate-fade-up">
                    <UIcon name="i-lucide-activity" class="w-4 h-4 mr-1.5" />
                    Simple Process
                </span>
                <h2
                    class="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.15] tracking-tight animate-fade-up stagger-1">
                    Your Journey to <br class="hidden md:block" />
                    <span class="text-gradient">Better Health</span>
                </h2>
                <p
                    class="text-lg md:text-xl text-muted-foreground animate-fade-up stagger-2 leading-relaxed max-w-2xl mx-auto">
                    Experience seamless healthcare with our simple 4-step process designed for your convenience and
                    well-being.
                </p>
            </div>

            <!-- Steps Container -->
            <div class="relative max-w-7xl mx-auto">
                <!-- Desktop Connecting Line -->
                <div class="hidden lg:block absolute top-[120px] left-[10%] right-[10%] h-[2px] bg-border/50" />
                <div
                    class="hidden lg:block absolute top-[120px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-primary via-accent to-primary opacity-50 origin-left animate-shimmer scale-x-0" />

                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
                    <div v-for="(step, index) in steps" :key="step.title" class="group animate-fade-up"
                        :style="{ animationDelay: `${index * 0.15}s` }">

                        <!-- Card UI -->
                        <div
                            class="relative h-full z-10 p-8 rounded-[2rem] bg-background border border-border/50 shadow-soft hover:shadow-elevated transition-all duration-500 overflow-hidden hover:-translate-y-2">
                            <!-- Animated Top Border Glow -->
                            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                :class="step.color" />

                            <!-- Massive Watermark Number -->
                            <div
                                class="absolute -right-4 -bottom-10 font-display font-black text-[10rem] leading-none text-muted/30 group-hover:text-primary/10 transition-colors duration-500 pointer-events-none select-none">
                                {{ index + 1 }}
                            </div>

                            <!-- Icon Container -->
                            <div class="relative mb-8">
                                <div class="w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm bg-gradient-to-br border border-white/20"
                                    :class="[step.bgColor, step.color.replace('from-', 'from-').replace('to-', 'to-').replace('500', '100').replace('600', '50')]">
                                    <UIcon :name="step.icon" class="w-10 h-10 transition-colors duration-500"
                                        :class="step.iconColor" />
                                </div>
                            </div>

                            <!-- Content -->
                            <div class="relative z-10">
                                <h3
                                    class="font-display font-bold text-2xl text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                                    {{ step.title }}
                                </h3>
                                <p class="text-muted-foreground leading-relaxed">
                                    {{ step.description }}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- Bottom CTA -->
            <div class="mt-24 flex justify-center animate-fade-up stagger-3">
                <NuxtLink to="/doctors">
                    <UButton size="xl"
                        class="h-14 px-10 rounded-full font-bold text-base text-white shadow-glow hover:shadow-glow-accent hover:-translate-y-1 transition-all duration-300">
                        Start Your Healing Journey
                        <UIcon name="i-lucide-arrow-right" class="w-5 h-5 ml-2" />
                    </UButton>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
