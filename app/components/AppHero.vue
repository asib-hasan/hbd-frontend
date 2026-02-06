<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref("");
const location = ref("");
import { dhakaAreas } from '~/utils/doctors';

const stats = [
    { icon: 'i-lucide-users', value: "500+", label: "Homeo Doctors", color: "bg-primary/10 text-primary" },
    { icon: 'i-lucide-award', value: "50K+", label: "Happy Patients", color: "bg-accent/10 text-accent" },
    { icon: 'i-lucide-clock', value: "24/7", label: "Support Available", color: "bg-green-500/10 text-green-600" },
];

const quickLinks = [
    { label: "Best in Bangladesh", href: "/doctors/bangladesh" },
    { label: "Best in Dhaka", href: "/doctors/dhaka" },
    { label: "Best in Chittagong", href: "/doctors/chittagong" },
    { label: "Best Female Doctors", href: "/female-doctors" },
];

const popularAreas = dhakaAreas.slice(0, 8);

const specializations = [
    { name: "Constitutional Treatment", icon: "🌿" },
    { name: "Chronic Diseases", icon: "💊" },
    { name: "Child Care", icon: "👶" },
    { name: "Women's Health", icon: "🩺" },
    { name: "Skin Disorders", icon: "✨" },
    { name: "Mental Health", icon: "🧠" },
    { name: "Digestive Disorders", icon: "🍃" },
    { name: "Joint & Bone", icon: "🦴" },
];

const scrollToSpecialties = () => {
    const el = document.getElementById('specialties');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}
</script>

<template>
    <section class="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <!-- Enhanced Background -->
        <div class="absolute inset-0 bg-gradient-hero-subtle" />
        <div class="absolute inset-0 bg-hero-pattern opacity-30" />
        <div
            class="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-primary/8 via-primary/3 to-transparent rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div
            class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-accent/8 via-accent/3 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <!-- Floating Elements -->
        <div
            class="absolute top-32 left-[10%] w-24 h-24 bg-primary/8 rounded-3xl rotate-12 animate-float hidden xl:block" />
        <div
            class="absolute bottom-32 right-[8%] w-20 h-20 bg-accent/15 rounded-full animate-float stagger-3 hidden xl:block" />
        <div
            class="absolute top-1/2 right-[15%] w-16 h-16 bg-secondary rounded-2xl -rotate-12 animate-float stagger-2 hidden xl:block" />

        <div class="container mx-auto px-4 relative z-10">
            <div class="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
                <!-- Left Content -->
                <div class="lg:col-span-3 max-w-2xl">
                    <div
                        class="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-8 animate-fade-up shadow-soft">
                        <UIcon name="i-lucide-leaf" class="w-4 h-4" />
                        <span class="tracking-wide">Bangladesh's Trusted Homeopathy Platform</span>
                    </div>

                    <h1
                        class="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1] mb-6 animate-fade-up stagger-1">
                        Find & Book
                        <span class="text-gradient block mt-1">Homeopathic Doctors</span>
                        <span class="block mt-1">Near You</span>
                    </h1>

                    <p
                        class="text-lg lg:text-xl text-muted-foreground mb-10 animate-fade-up stagger-2 max-w-lg leading-relaxed">
                        Connect with experienced homeopathic practitioners across Bangladesh. Natural healing through
                        holistic treatment.
                    </p>

                    <!-- Enhanced Search Box -->
                    <div class="glass-card p-3 shadow-card animate-fade-up stagger-3">
                        <div class="flex flex-col md:flex-row gap-3">
                            <div class="flex-1 relative">
                                <UIcon name="i-lucide-search"
                                    class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input type="text" placeholder="Search doctors, specialties..." v-model="searchQuery"
                                    class="w-full h-14 pl-12 pr-4 bg-muted/40 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-muted/60 transition-all border-none" />
                            </div>
                            <div class="flex-1 relative">
                                <UIcon name="i-lucide-map-pin"
                                    class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input type="text" placeholder="Location (e.g., Dhaka)" v-model="location"
                                    class="w-full h-14 pl-12 pr-4 bg-muted/40 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-muted/60 transition-all border-none" />
                            </div>
                            <UButton size="xl" class="h-14 px-8 shadow-glow bg-primary text-primary-foreground">
                                <UIcon name="i-lucide-search" class="w-5 h-5" />
                                <span class="hidden sm:inline">Search</span>
                            </UButton>
                        </div>
                    </div>

                    <!-- Quick Links -->
                    <div class="flex flex-wrap items-center gap-3 mt-6 animate-fade-up stagger-4">
                        <span class="text-sm text-muted-foreground font-medium">Popular:</span>
                        <NuxtLink v-for="link in quickLinks" :key="link.label" :to="link.href"
                            class="px-4 py-2 bg-card border border-border hover:border-primary/30 hover:bg-primary/5 hover:text-primary rounded-full text-sm font-medium transition-all duration-300 shadow-xs hover:shadow-soft">
                            {{ link.label }}
                        </NuxtLink>
                    </div>

                    <!-- Stats -->
                    <div class="flex flex-wrap gap-6 lg:gap-10 mt-12 animate-fade-up stagger-5">
                        <div v-for="(stat, index) in stats" :key="index" class="flex items-center gap-4">
                            <div class="w-14 h-14 rounded-2xl flex items-center justify-center shadow-soft"
                                :class="stat.color">
                                <UIcon :name="stat.icon" class="w-7 h-7" />
                            </div>
                            <div>
                                <div class="font-display font-bold text-2xl lg:text-3xl text-foreground">{{ stat.value
                                    }}</div>
                                <div class="text-sm text-muted-foreground">{{ stat.label }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Content - Popular Areas & Specializations -->
                <div class="lg:col-span-2 space-y-6 animate-fade-up stagger-3">
                    <!-- Popular Areas -->
                    <div class="glass-card p-6 shadow-card">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-display font-semibold text-lg text-foreground flex items-center gap-2">
                                <UIcon name="i-lucide-map-pin" class="w-5 h-5 text-primary" />
                                Popular Areas
                            </h3>
                            <NuxtLink to="/doctors/dhaka"
                                class="text-sm text-primary hover:underline flex items-center gap-1">
                                View All
                                <UIcon name="i-lucide-arrow-right" class="w-3 h-3" />
                            </NuxtLink>
                        </div>
                        <div class="grid grid-cols-2 gap-2">
                            <NuxtLink v-for="area in popularAreas" :key="area.id" :to="`/doctors/${area.id}`"
                                class="flex items-center justify-between px-4 py-3 bg-muted/50 hover:bg-primary/10 hover:text-primary rounded-xl text-sm font-medium transition-all duration-200 group">
                                <span>{{ area.name }}</span>
                                <span class="text-xs text-muted-foreground group-hover:text-primary/70">{{
                                    area.doctorCount }}</span>
                            </NuxtLink>
                        </div>
                    </div>

                    <!-- Popular Specializations -->
                    <div class="glass-card p-6 shadow-card">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-display font-semibold text-lg text-foreground flex items-center gap-2">
                                <UIcon name="i-lucide-stethoscope" class="w-5 h-5 text-primary" />
                                Specializations
                            </h3>
                            <button @click="scrollToSpecialties"
                                class="text-sm text-primary hover:underline flex items-center gap-1">
                                View All
                                <UIcon name="i-lucide-arrow-right" class="w-3 h-3" />
                            </button>
                        </div>
                        <div class="grid grid-cols-2 gap-2">
                            <NuxtLink v-for="spec in specializations" :key="spec.name"
                                :to="`/doctors/bangladesh?specialty=${encodeURIComponent(spec.name)}`"
                                class="flex items-center gap-2 px-4 py-3 bg-muted/50 hover:bg-primary/10 hover:text-primary rounded-xl text-sm font-medium transition-all duration-200">
                                <span class="text-lg">{{ spec.icon }}</span>
                                <span class="truncate">{{ spec.name }}</span>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
