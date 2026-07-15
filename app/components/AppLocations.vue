<script setup lang="ts">
const localePath = useLocalePath()

const locations = [
    { name: "Dhaka", slug: "dhaka", doctors: 285, hospitals: 65, image: "https://images.unsplash.com/photo-1606298246186-c0278e0e1d0b?w=500&h=350&fit=crop", featured: true },
    { name: "Chittagong", slug: "chittagong", doctors: 142, hospitals: 32, image: "https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=500&h=350&fit=crop", featured: true },
    { name: "Sylhet", slug: "sylhet", doctors: 78, hospitals: 18, image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=500&h=350&fit=crop" },
    { name: "Rajshahi", slug: "rajshahi", doctors: 95, hospitals: 22, image: "https://images.unsplash.com/photo-1583952932871-fc7c4f85e9a4?w=500&h=350&fit=crop" },
    { name: "Khulna", slug: "khulna", doctors: 65, hospitals: 15, image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=500&h=350&fit=crop" },
    { name: "Rangpur", slug: "rangpur", doctors: 52, hospitals: 12, image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&h=350&fit=crop" },
];
</script>

<template>
    <section id="hospitals" class="section-padding bg-background relative overflow-hidden">
        <!-- Background decorations -->
        <div
            class="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl" />
        <div
            class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-accent/5 to-transparent rounded-full blur-3xl" />

        <div class="container mx-auto px-4 relative z-10">
            <!-- Section Header -->
            <div class="section-header">
                <span class="badge badge-primary mb-4 animate-fade-up">
                    <UIcon name="i-lucide-map-pin" class="w-4 h-4" />
                    {{ $t('locations.badge') }}
                </span>
                <h2
                    class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-up stagger-1">
                    {{ $t('locations.title_main') }} <span class="text-gradient">{{ $t('locations.title_highlight') }}</span>
                </h2>
                <p class="text-lg text-muted-foreground animate-fade-up stagger-2">
                    {{ $t('locations.desc') }}
                </p>
            </div>

            <!-- Featured Locations - Large Cards -->
            <div class="grid md:grid-cols-2 gap-6 mb-6">
                <NuxtLink v-for="(location, index) in locations.filter(l => l.featured)" :key="location.slug"
                    :to="localePath(`/doctors/${location.slug}`)"
                    class="group relative h-72 rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 animate-fade-up"
                    :style="{ animationDelay: `${index * 0.1}s` }">
                    <img :src="location.image" :alt="$t(`locations.cities.${location.slug}`)"
                        class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div class="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-foreground/10" />

                    <div class="absolute inset-0 p-6 flex flex-col justify-end">
                        <div class="flex items-center gap-2 text-primary-foreground/80 mb-2">
                            <div
                                class="w-8 h-8 bg-primary/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                <UIcon name="i-lucide-map-pin" class="w-4 h-4 text-primary-foreground" />
                            </div>
                            <span class="text-sm font-medium">{{ $t('locations.best_doctors_in') }}</span>
                        </div>

                        <h3
                            class="font-display font-bold text-3xl text-primary-foreground mb-4 group-hover:text-accent transition-colors">
                            {{ $t(`locations.cities.${location.slug}`) }}
                        </h3>

                        <div class="flex items-center gap-6 mb-4">
                            <div class="flex items-center gap-2 text-primary-foreground/90">
                                <UIcon name="i-lucide-users" class="w-4 h-4" />
                                <span class="text-sm font-medium">{{ $t('locations.doctors_count', { count: location.doctors }) }}</span>
                            </div>
                            <div class="flex items-center gap-2 text-primary-foreground/90">
                                <UIcon name="i-lucide-building-2" class="w-4 h-4" />
                                <span class="text-sm font-medium">{{ $t('locations.hospitals_count', { count: location.hospitals }) }}</span>
                            </div>
                        </div>

                        <div
                            class="flex items-center gap-2 text-primary-foreground font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                            <span>{{ $t('locations.explore_doctors') }}</span>
                            <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
                        </div>
                    </div>
                </NuxtLink>
            </div>

            <!-- Other Locations - Smaller Cards -->
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <NuxtLink v-for="(location, index) in locations.filter(l => !l.featured)" :key="location.slug"
                    :to="localePath(`/doctors/${location.slug}`)"
                    class="group relative h-48 rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-500 hover:-translate-y-1 animate-fade-up"
                    :style="{ animationDelay: `${(index + 2) * 0.1}s` }">
                    <img :src="location.image" :alt="$t(`locations.cities.${location.slug}`)"
                        class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />

                    <div class="absolute inset-0 p-5 flex flex-col justify-end">
                        <h3
                            class="font-display font-bold text-xl text-primary-foreground mb-1 group-hover:text-accent transition-colors">
                            {{ $t(`locations.cities.${location.slug}`) }}
                        </h3>
                        <div class="flex items-center gap-3 text-primary-foreground/80 text-sm">
                            <span>{{ $t('locations.doctors_count', { count: location.doctors }) }}</span>
                            <span>•</span>
                            <span>{{ $t('locations.hospitals_count', { count: location.hospitals }) }}</span>
                        </div>
                    </div>

                    <div
                        class="absolute top-4 right-4 w-8 h-8 bg-primary-foreground/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <UIcon name="i-lucide-chevron-right" class="w-4 h-4 text-primary-foreground" />
                    </div>
                </NuxtLink>
            </div>

            <!-- View All -->
            <div class="text-center mt-12">
                <NuxtLink :to="localePath('/doctors')">
                    <UButton variant="outline" size="lg" class="gap-2">
                        {{ $t('locations.view_all') }}
                        <UIcon name="i-lucide-arrow-right" class="w-5 h-5" />
                    </UButton>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
