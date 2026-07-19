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
                <span class="badge badge-primary mb-4 ">
                    <UIcon name="i-lucide-megaphone" class="w-4 h-4" />
                    Updates
                </span>
                <h2
                    class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4  stagger-1">
                    Latest <span class="text-gradient">Updates</span>
                </h2>
            </div>

            <!-- Banners Slider -->
            <ClientOnly>
                <div class="relative group mt-8">
                    <!-- Wrapper for horizontal scrolling -->
                    <div class="flex overflow-x-auto snap-x snap-mandatory gap-6 hide-scrollbar pb-6 pt-2 px-2"
                        id="banner-slider">
                        <!-- Individual Banner Card -->
                        <div v-for="(banner, index) in banners" :key="banner.id"
                            class="snap-start shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group/banner relative rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 h-56 md:h-64 cursor-pointer">

                            <!-- Image Section -->
                            <NuxtLink v-if="banner.url" :to="banner.url" :target="banner.url.startsWith('http') ? '_blank' : undefined" class="w-full h-full relative block bg-muted">
                                <img :src="banner.photo" :alt="banner.title"
                                    class="absolute inset-0 w-full h-full object-cover group-hover/banner:scale-105 transition-transform duration-700"
                                    @error="onImageError" />
                            </NuxtLink>
                            <div v-else class="w-full h-full relative bg-muted">
                                <img :src="banner.photo" :alt="banner.title"
                                    class="absolute inset-0 w-full h-full object-cover group-hover/banner:scale-105 transition-transform duration-700"
                                    @error="onImageError" />
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
                <template #fallback>
                    <div class="flex overflow-x-auto gap-6 hide-scrollbar pb-6 pt-2 px-2">
                        <USkeleton v-for="i in 3" :key="i" class="w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 h-56 md:h-64 rounded-2xl" />
                    </div>
                </template>
            </ClientOnly>
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
