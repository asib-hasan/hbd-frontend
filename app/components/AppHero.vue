<script setup lang="ts">
const areas = [
    { name: 'Dhaka', image: '/images/divisions/dhaka.png', subtitle: '320+ Doctors' },
    { name: 'Chittagong', image: '/images/divisions/chittagong.png', subtitle: '150+ Doctors' },
    { name: 'Sylhet', image: '/images/divisions/sylhet.png', subtitle: '85+ Doctors' },
    { name: 'Rajshahi', image: '/images/divisions/rajshahi.png', subtitle: '60+ Doctors' },
    { name: 'Khulna', image: '/images/divisions/khulna.png', subtitle: '55+ Doctors' },
    { name: 'Barishal', image: '/images/divisions/barishal.png', subtitle: '45+ Doctors' },
    { name: 'Rangpur', image: '/images/divisions/rangpur.png', subtitle: '40+ Doctors' },
    { name: 'Mymensingh', image: '/images/divisions/mymensingh.png', subtitle: '35+ Doctors' },
]
</script>

<template>
    <section class="relative min-h-[60vh] flex items-center overflow-hidden bg-gray-50/50 pt-32 lg:pt-40 pb-10">
        <!-- Background Decorations -->
        <div class="absolute inset-0 bg-gradient-to-br from-white via-white to-primary/5" />
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-accent/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        
        <!-- Grid Pattern -->
        <div class="absolute inset-0 opacity-[0.015]" style="background-image: radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0); background-size: 40px 40px;" />

        <div class="container mx-auto px-4 relative z-10">
            <!-- Top Areas Header -->
            <div class="max-w-6xl mx-auto mb-10 text-center animate-fade-up">

                <h1 class="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                    Top <span class="text-primary">Areas</span> in Bangladesh
                </h1>
                <p class="text-gray-600 text-lg max-w-2xl mx-auto">
                    Select your area to find and book appointments with the best verified homeopathic doctors near you.
                </p>
            </div>

            <!-- Top Areas Grid with Images -->
            <div class="max-w-6xl mx-auto">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-up stagger-1">
                    <NuxtLink
                        v-for="(area, i) in areas"
                        :key="area.name" :to="`/doctors?district=${area.name}`"
                        class="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                        :style="{ animationDelay: `${i * 0.05}s` }">
                        
                        <!-- Image Container -->
                        <div class="relative h-48 w-full overflow-hidden">
                            <img :src="area.image" :alt="area.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                            <!-- Overlay Gradient -->
                            <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        
                        <!-- Content Over Image -->
                        <div class="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                            <div>
                                <h3 class="font-display font-bold text-white text-xl md:text-2xl mb-1 group-hover:text-primary-300 transition-colors">
                                    {{ area.name }}
                                </h3>
                                <div class="flex items-center gap-1.5 text-white/80 text-sm font-medium">
                                    <UIcon name="i-lucide-users" class="w-4 h-4" />
                                    {{ area.subtitle }}
                                </div>
                            </div>
                            
                            <!-- Arrow Button -->
                            <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300 border border-white/30">
                                <UIcon name="i-lucide-arrow-right" class="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </div>
                    </NuxtLink>
                </div>

                <div class="mt-12 text-center animate-fade-up stagger-2">
                    <NuxtLink to="/doctors">
                        <UButton color="primary" variant="solid" size="lg" class="h-12 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all font-bold text-white">
                            View All Doctors Nationwide
                            <UIcon name="i-lucide-search" class="w-5 h-5 ml-2" />
                        </UButton>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>
