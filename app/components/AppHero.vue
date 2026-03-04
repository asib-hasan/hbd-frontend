<script setup lang="ts">
import { ref, onMounted } from 'vue'

const searchQuery = ref('')
const selectedLocation = ref('dhaka')

const locations = [
    { id: 'dhaka', name: 'Dhaka' },
    { id: 'chittagong', name: 'Chittagong' },
    { id: 'sylhet', name: 'Sylhet' },
    { id: 'rajshahi', name: 'Rajshahi' },
    { id: 'khulna', name: 'Khulna' },
]

const stats = [
    { value: '500+', label: 'Verified Doctors', icon: 'i-lucide-user-check' },
    { value: '50K+', label: 'Happy Patients', icon: 'i-lucide-heart' },
    { value: '64', label: 'Districts', icon: 'i-lucide-map-pin' },
    { value: '4.8', label: 'Avg Rating', icon: 'i-lucide-star' },
]

const trustBadges = [
    'Government Registered',
    'BHMS Certified',
    'Verified Reviews',
]

// Animated counter
const counters = ref(stats.map(() => 0))
const animateCounters = () => {
    stats.forEach((stat, index) => {
        const target = parseInt(stat.value.replace(/[^0-9]/g, ''))
        const duration = 2000
        const steps = 60
        const increment = target / steps
        let current = 0
        const timer = setInterval(() => {
            current += increment
            if (current >= target) {
                current = target
                clearInterval(timer)
            }
            counters.value[index] = Math.floor(current)
        }, duration / steps)
    })
}

onMounted(() => {
    setTimeout(animateCounters, 500)
})

const handleSearch = () => {
    navigateTo(`/doctors/${selectedLocation.value}`)
}
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

                    <!-- Search Box -->
                    <div
                        class="relative bg-white rounded-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] border border-border/40 p-2 mb-8 animate-fade-up stagger-2">
                        <div class="flex flex-col sm:flex-row gap-2">
                            <div class="relative flex-1">
                                <div class="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <UIcon name="i-lucide-search" class="w-5 h-5 text-muted-foreground/50" />
                                </div>
                                <input v-model="searchQuery" type="text" placeholder="Search doctor, specialty..."
                                    class="w-full h-12 pl-11 pr-4 bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none rounded-xl text-[15px]" />
                            </div>
                            <div class="flex gap-2">
                                <div class="relative">
                                    <div class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <UIcon name="i-lucide-map-pin" class="w-4 h-4 text-muted-foreground/50" />
                                    </div>
                                    <select v-model="selectedLocation"
                                        class="h-12 pl-9 pr-8 bg-muted/40 border border-border/40 rounded-xl text-foreground text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20">
                                        <option v-for="loc in locations" :key="loc.id" :value="loc.id">
                                            {{ loc.name }}
                                        </option>
                                    </select>
                                    <UIcon name="i-lucide-chevron-down"
                                        class="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 pointer-events-none" />
                                </div>
                                <button @click="handleSearch"
                                    class="h-12 px-6 bg-primary text-primary-foreground font-semibold rounded-xl shadow-glow hover:shadow-glow-accent transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 whitespace-nowrap">
                                    <span class="hidden sm:inline">Find Doctors</span>
                                    <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
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
                        <!-- Main Card Stack -->
                        <div class="relative bg-white rounded-3xl shadow-elevated border border-border/30 p-6 z-10">
                            <!-- Top Doctor Preview -->
                            <div class="flex items-center gap-4 mb-6">
                                <div class="w-16 h-16 rounded-2xl overflow-hidden shadow-soft flex-shrink-0">
                                    <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=faces"
                                        alt="Doctor" class="w-full h-full object-cover" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h3 class="font-display font-bold text-foreground text-lg">Dr. Abdul Karim
                                    </h3>
                                    <p class="text-sm text-muted-foreground">Constitutional Treatment •
                                        Uttara</p>
                                    <div class="flex items-center gap-1 mt-1">
                                        <UIcon v-for="i in 5" :key="i" name="i-lucide-star"
                                            class="w-3.5 h-3.5 text-amber-400" />
                                        <span class="text-xs text-muted-foreground ml-1">(312)</span>
                                    </div>
                                </div>
                                <div
                                    class="bg-emerald-50 text-emerald-600 text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
                                    Available
                                </div>
                            </div>

                            <!-- Mini Schedule -->
                            <div class="bg-muted/30 rounded-2xl p-4 mb-6 border border-border/30">
                                <div class="flex items-center gap-2 mb-3">
                                    <UIcon name="i-lucide-calendar" class="w-4 h-4 text-primary" />
                                    <span class="text-sm font-semibold text-foreground">Available Slots Today</span>
                                </div>
                                <div class="grid grid-cols-4 gap-2">
                                    <div v-for="(time, i) in ['10:00', '11:30', '2:00', '4:30']" :key="i"
                                        class="text-center py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer"
                                        :class="i === 1 ? 'bg-primary text-primary-foreground shadow-soft' : 'bg-white border border-border/60 text-foreground hover:border-primary/30'">
                                        {{ time }}
                                    </div>
                                </div>
                            </div>

                            <!-- Book Button -->
                            <button
                                class="w-full h-12 bg-primary text-primary-foreground font-semibold rounded-xl shadow-glow flex items-center justify-center gap-2">
                                <UIcon name="i-lucide-calendar-check" class="w-5 h-5" />
                                Book Appointment
                            </button>
                        </div>

                        <!-- Floating Badge - Reviews -->
                        <div
                            class="absolute -left-6 top-16 bg-white rounded-2xl shadow-card border border-border/20 p-4 z-20 animate-float">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                                    <UIcon name="i-lucide-star" class="w-5 h-5 text-amber-500" />
                                </div>
                                <div>
                                    <p class="text-sm font-bold text-foreground">4.8/5</p>
                                    <p class="text-xs text-muted-foreground">50K+ Reviews</p>
                                </div>
                            </div>
                        </div>

                        <!-- Floating Badge - Patients -->
                        <div class="absolute -right-4 bottom-20 bg-white rounded-2xl shadow-card border border-border/20 p-4 z-20 animate-float"
                            style="animation-delay: -3s">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                    <UIcon name="i-lucide-users" class="w-5 h-5 text-emerald-500" />
                                </div>
                                <div>
                                    <p class="text-sm font-bold text-foreground">500+</p>
                                    <p class="text-xs text-muted-foreground">Doctors Online</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Stats Bar -->
        <div class="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-border/30 py-5">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div v-for="(stat, index) in stats" :key="stat.label" class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                            <UIcon :name="stat.icon" class="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <p class="font-display font-bold text-lg text-foreground leading-none">
                                {{ counters[index] }}{{ stat.value.replace(/[0-9]/g, '') }}
                            </p>
                            <p class="text-xs text-muted-foreground mt-0.5">{{ stat.label }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
