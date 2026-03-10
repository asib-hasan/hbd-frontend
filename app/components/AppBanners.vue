<script setup lang="ts">
import { computed } from 'vue'

const runtimeConfig = useRuntimeConfig()
const apiBaseUrl = runtimeConfig.public.apiBaseUrl

// Fetch banners from API
const { data: bannerData } = await useFetch(`${apiBaseUrl}/banners`)

const banners = computed(() => {
    // @ts-ignore
    return bannerData.value?.data || []
})

const onImageError = (e: Event) => {
    const target = e.target as HTMLImageElement
    if (target) {
        target.src = 'https://placehold.co/600x400?text=No+Preview'
    }
}
</script>

<template>
    <section v-if="banners.length > 0" class="section-padding bg-background relative overflow-hidden">
        <!-- Background decorations -->
        <div
            class="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div
            class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-accent/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div class="container mx-auto px-4 relative z-10">
            <!-- Section Header -->
            <div class="section-header">
                <span class="badge badge-primary mb-4 animate-fade-up">
                    <UIcon name="i-lucide-megaphone" class="w-4 h-4" />
                    Updates
                </span>
                <h2
                    class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-up stagger-1">
                    Featured <span class="text-gradient">Highlights</span>
                </h2>
            </div>

            <!-- Banners Slider -->
            <div class="relative group mt-8">
                <!-- Wrapper for horizontal scrolling -->
                <div class="flex overflow-x-auto snap-x snap-mandatory gap-6 hide-scrollbar pb-6 pt-2 px-2"
                    id="banner-slider">
                    <!-- Individual Banner Card -->
                    <div v-for="(banner, index) in banners" :key="banner.id"
                        class="snap-start shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group/banner relative rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 h-56 md:h-64 cursor-pointer">

                        <!-- Image Section -->
                        <div class="w-full h-full relative bg-muted">
                            <img :src="banner.photo" :alt="banner.title"
                                class="absolute inset-0 w-full h-full object-cover group-hover/banner:scale-105 transition-transform duration-700"
                                @error="onImageError" />

                            <!-- Hover Overlay -->
                            <div
                                class="absolute inset-0 bg-black/40 opacity-0 group-hover/banner:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                <NuxtLink :to="banner.url" target="_blank"
                                    class="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-bold rounded-full shadow-xl hover:scale-105 transition-transform duration-300 gap-2">
                                    Learn More
                                    <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Navigation Buttons -->
                <button
                    onclick="document.getElementById('banner-slider').scrollBy({left: -window.innerWidth * 0.3, behavior: 'smooth'})"
                    class="absolute top-1/2 -translate-y-1/2 -left-5 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform z-10 hidden md:flex focus:outline-none"
                    aria-label="Previous Banner">
                    <UIcon name="i-lucide-chevron-left" class="w-6 h-6" />
                </button>
                <button
                    onclick="document.getElementById('banner-slider').scrollBy({left: window.innerWidth * 0.3, behavior: 'smooth'})"
                    class="absolute top-1/2 -translate-y-1/2 -right-5 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform z-10 hidden md:flex focus:outline-none"
                    aria-label="Next Banner">
                    <UIcon name="i-lucide-chevron-right" class="w-6 h-6" />
                </button>
            </div>
        </div>
    </section>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
