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
    <section class="section-padding bg-muted/30 relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 bg-hero-pattern opacity-20" />
        <div class="absolute top-20 left-10 w-40 h-40 border-2 border-primary/10 rounded-full hidden lg:block" />
        <div class="absolute bottom-20 right-10 w-56 h-56 border-2 border-accent/10 rounded-full hidden lg:block" />

        <div class="container mx-auto px-4 relative z-10">
            <!-- Section Header -->
            <div class="section-header">
                <span class="badge badge-primary mb-4 animate-fade-up">
                    Simple Process
                </span>
                <h2
                    class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-up stagger-1">
                    How It <span class="text-gradient">Works</span>
                </h2>
                <p class="text-lg text-muted-foreground animate-fade-up stagger-2">
                    Book your homeopathic consultation in just a few simple steps
                </p>
            </div>

            <!-- Steps -->
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                <div v-for="(step, index) in steps" :key="step.title" class="relative text-center animate-fade-up"
                    :style="{ animationDelay: `${index * 0.12}s` }">
                    <!-- Connector Line -->
                    <div v-if="index < steps.length - 1"
                        class="hidden lg:flex absolute top-20 left-[60%] w-[80%] items-center">
                        <div class="flex-1 h-0.5 bg-gradient-to-r from-border via-primary/20 to-border" />
                        <UIcon name="i-lucide-arrow-right" class="w-4 h-4 text-muted-foreground/30 -ml-1" />
                    </div>

                    <!-- Step Number -->
                    <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-soft z-10 text-white bg-gradient-to-br"
                        :class="step.color">
                        {{ index + 1 }}
                    </div>

                    <!-- Icon -->
                    <div class="w-36 h-36 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-soft transition-transform duration-300 hover:scale-105"
                        :class="step.bgColor">
                        <UIcon :name="step.icon" class="w-16 h-16" :class="step.iconColor" />
                    </div>

                    <!-- Content -->
                    <h3 class="font-display font-bold text-xl text-foreground mb-3">
                        {{ step.title }}
                    </h3>
                    <p class="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                        {{ step.description }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
