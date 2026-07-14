<script setup lang="ts">
const reasons = [
    {
        title: "Holistic Approach",
        description: "Homeopathy focuses on treating the whole person—mind, body, and emotions—rather than just suppressing isolated symptoms, ensuring true healing from within.",
        icon: "i-lucide-activity",
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        title: "Safe & Natural",
        description: "Homeopathic remedies are derived from natural sources. They are highly diluted, making them non-toxic, non-addictive, and safe for patients of all ages, including infants.",
        icon: "i-lucide-leaf",
        color: "text-primary",
        bg: "bg-primary/10"
    },
    {
        title: "Root Cause Resolution",
        description: "Instead of merely masking the problem temporarily, homeopathy aims to identify and cure the underlying root cause of the illness for long-term health.",
        icon: "i-lucide-microscope",
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    },
    {
        title: "Personalized Care",
        description: "No two patients are the same. Treatments are carefully tailored to your unique physical, emotional, and genetic constitution for the most effective results.",
        icon: "i-lucide-users",
        color: "text-amber-500",
        bg: "bg-amber-500/10"
    },
    {
        title: "Strengthens Immunity",
        description: "Homeopathy stimulates your body's own natural defense mechanisms, building stronger immunity to help prevent future illnesses naturally.",
        icon: "i-lucide-shield-check",
        color: "text-rose-500",
        bg: "bg-rose-500/10"
    },
    {
        title: "Cost-Effective",
        description: "In the long run, homeopathic treatment is often much more affordable than conventional therapies, reducing the need for recurrent expensive medications.",
        icon: "i-lucide-wallet",
        color: "text-teal-500",
        bg: "bg-teal-500/10"
    }
]
</script>

<template>
    <section class="py-12 lg:py-16 bg-muted/20 relative overflow-hidden">
        <!-- Background Accents -->
        <div
            class="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl" />
        <div
            class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-accent/5 to-transparent rounded-full blur-3xl" />

        <div class="container mx-auto px-4 relative z-10">
            <!-- Section Header -->
            <div class="text-center max-w-3xl mx-auto mb-16">
                <div
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-border/50 text-foreground text-sm font-semibold mb-6 animate-fade-up shadow-sm">
                    <UIcon name="i-lucide-check-circle-2" class="w-4 h-4 text-primary" />
                    Healing Philosophy
                </div>
                <h2
                    class="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 animate-fade-up stagger-1 tracking-tight">
                    Why Choose <span class="text-gradient">Homeopathy?</span>
                </h2>
                <p class="text-lg text-muted-foreground animate-fade-up stagger-2 leading-relaxed">
                    Discover the profound benefits of a natural, holistic approach to healthcare that prioritizes your
                    long-term well-being without harmful side effects.
                </p>
            </div>

            <!-- Reasons Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="(reason, index) in reasons" :key="reason.title"
                    class="group bg-white rounded-3xl p-8 border border-border/40 shadow-sm hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 relative overflow-hidden animate-fade-up"
                    :style="{ animationDelay: `${index * 0.1}s` }">

                    <!-- Decorative corner bloop -->
                    <div class="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-20 group-hover:opacity-50 transition-opacity duration-500"
                        :class="reason.bg.replace('/10', '/30')" />

                    <div class="relative z-10">
                        <!-- Icon -->
                        <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-border/50 group-hover:scale-110 transition-transform duration-300"
                            :class="[reason.bg, reason.color]">
                            <UIcon :name="reason.icon" class="w-7 h-7" />
                        </div>

                        <!-- Content -->
                        <h3
                            class="font-display font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                            {{ reason.title }}
                        </h3>
                        <p class="text-muted-foreground leading-relaxed text-[15px]">
                            {{ reason.description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
