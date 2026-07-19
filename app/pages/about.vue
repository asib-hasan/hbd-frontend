<script setup lang="ts">

const { t } = useI18n()
const localePath = useLocalePath()

const values = computed(() => [
    {
        icon: 'i-lucide-heart',
        title: t('about_page.values.patient_centered.title'),
        description: t('about_page.values.patient_centered.description')
    },
    {
        icon: 'i-lucide-award',
        title: t('about_page.values.quality_assurance.title'),
        description: t('about_page.values.quality_assurance.description')
    },
    {
        icon: 'i-lucide-users',
        title: t('about_page.values.accessibility.title'),
        description: t('about_page.values.accessibility.description')
    },
    {
        icon: 'i-lucide-check-circle-2',
        title: t('about_page.values.trust_transparency.title'),
        description: t('about_page.values.trust_transparency.description')
    }
]);

const stats = computed(() => [
    { value: "500+", label: t('about_page.stats.verified_doctors') },
    { value: "50,000+", label: t('about_page.stats.patients_helped') },
    { value: "64", label: t('about_page.stats.districts_covered') },
    { value: "25+", label: t('about_page.stats.medical_specialties') }
]);

const team = [
    {
        name: "Dr. Aminul Islam",
        role: "Founder & Medical Director",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop"
    },
    {
        name: "Fatema Rahman",
        role: "Chief Operations Officer",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop"
    },
    {
        name: "Karim Ahmed",
        role: "Technology Lead",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
    }
];

useHead({
    title: computed(() => t('about_page.meta_title')),
    meta: [
        { name: 'description', content: computed(() => t('about_page.meta_description')) }
    ]
})
</script>

<template>
    <div class="min-h-screen bg-background">
        <!-- Hero Section -->
        <section
            class="relative bg-gradient-to-br from-primary/5 via-background to-secondary/10 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
            <div
                class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_50%)]" />
            <div class="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div class="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

            <div class="container mx-auto px-4 relative z-10">
                <nav class="flex items-center gap-2 text-sm text-muted-foreground mb-6 ">
                    <NuxtLink :to="localePath('/')" class="hover:text-primary transition-colors">{{ $t('about_page.breadcrumb_home') }}</NuxtLink>
                    <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
                    <span class="text-foreground font-medium">{{ $t('about_page.breadcrumb_about') }}</span>
                </nav>
                <div class="max-w-3xl mx-auto text-center ">
                    <div
                        class="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <UIcon name="i-lucide-leaf" class="w-4 h-4" />
                        {{ $t('about_page.badge') }}
                    </div>
                    <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                        {{ $t('about_page.hero_title_start') }} <span class="text-primary">{{ $t('about_page.hero_title_highlight') }}</span>
                    </h1>
                    <p class="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        {{ $t('about_page.hero_description') }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Stats Section -->
        <section class="py-12 bg-primary/5">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div v-for="(stat, idx) in stats" :key="idx" class="text-center "
                        :style="{ animationDelay: `${idx * 0.1}s` }">
                        <div class="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                            {{ stat.value }}
                        </div>
                        <div class="text-sm text-muted-foreground">{{ stat.label }}</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Mission & Vision -->
        <section class="py-16 md:py-24">
            <div class="container mx-auto px-4">
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="card-premium p-8 ">
                        <div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                            <UIcon name="i-lucide-target" class="w-7 h-7 text-primary" />
                        </div>
                        <h2 class="font-display text-2xl font-bold text-foreground mb-4">{{ $t('about_page.mission.title') }}</h2>
                        <p class="text-muted-foreground leading-relaxed">
                            {{ $t('about_page.mission.description') }}
                        </p>
                    </div>
                    <div class="card-premium p-8 " style="animation-delay: 0.2s">
                        <div class="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center mb-6">
                            <UIcon name="i-lucide-eye" class="w-7 h-7 text-secondary-foreground" />
                        </div>
                        <h2 class="font-display text-2xl font-bold text-foreground mb-4">{{ $t('about_page.vision.title') }}</h2>
                        <p class="text-muted-foreground leading-relaxed">
                            {{ $t('about_page.vision.description') }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Values Section -->
        <section class="py-16 md:py-24 bg-muted/30">
            <div class="container mx-auto px-4">
                <div class="text-center max-w-2xl mx-auto mb-12 ">
                    <h2 class="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                        {{ $t('about_page.values_section.title') }}
                    </h2>
                    <p class="text-muted-foreground">
                        {{ $t('about_page.values_section.subtitle') }}
                    </p>
                </div>
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div v-for="(value, idx) in values" :key="idx" class="card-premium p-6 text-center "
                        :style="{ animationDelay: `${idx * 0.1}s` }">
                        <div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <UIcon :name="value.icon" class="w-7 h-7 text-primary" />
                        </div>
                        <h3 class="font-display font-bold text-lg text-foreground mb-2">
                            {{ value.title }}
                        </h3>
                        <p class="text-sm text-muted-foreground leading-relaxed">
                            {{ value.description }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Team Section -->
        <!-- 
        <section class="py-16 md:py-24">
            <div class="container mx-auto px-4">
                <div class="text-center max-w-2xl mx-auto mb-12 ">
                    <h2 class="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Meet Our Team
                    </h2>
                    <p class="text-muted-foreground">
                        Dedicated professionals working to transform healthcare access in Bangladesh
                    </p>
                </div>
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div v-for="(member, idx) in team" :key="idx" class="card-premium p-6 text-center "
                        :style="{ animationDelay: `${idx * 0.15}s` }">
                        <div class="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 shadow-soft">
                            <img :src="member.image" :alt="member.name" class="w-full h-full object-cover" />
                        </div>
                        <h3 class="font-display font-bold text-lg text-foreground">
                            {{ member.name }}
                        </h3>
                        <p class="text-sm text-muted-foreground">{{ member.role }}</p>
                    </div>
                </div>
            </div>
        </section>
        -->

        <!-- Contact Section -->
        <section class="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
            <div class="container mx-auto px-4">
                <div class="max-w-3xl mx-auto text-center ">
                    <h2 class="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                        {{ $t('about_page.contact.title') }}
                    </h2>
                    <p class="text-muted-foreground mb-8">
                        {{ $t('about_page.contact.description') }}
                    </p>

                    <div class="grid sm:grid-cols-3 gap-6 mb-8">
                        <div class="flex flex-col items-center gap-2">
                            <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                <UIcon name="i-lucide-mail" class="w-5 h-5 text-primary" />
                            </div>
                            <span class="text-sm text-muted-foreground">info@homeodoctorsbd.com</span>
                        </div>
                        <div class="flex flex-col items-center gap-2">
                            <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                <UIcon name="i-lucide-phone" class="w-5 h-5 text-primary" />
                            </div>
                            <span class="text-sm text-muted-foreground">+880 1700-000000</span>
                        </div>
                        <div class="flex flex-col items-center gap-2">
                            <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                <UIcon name="i-lucide-map-pin" class="w-5 h-5 text-primary" />
                            </div>
                            <span class="text-sm text-muted-foreground">Dhaka, Bangladesh</span>
                        </div>
                    </div>

                    <NuxtLink :to="localePath('/doctors')">
                        <UButton size="xl" class="shadow-glow-accent px-8 font-semibold">
                            {{ $t('about_page.contact.find_doctor') }}
                        </UButton>
                    </NuxtLink>
                </div>
            </div>
        </section>

    </div>
</template>
