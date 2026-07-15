<script setup lang="ts">
import { computed } from 'vue'

const runtimeConfig = useRuntimeConfig()
const apiBaseUrl = runtimeConfig.public.apiBaseUrl

// Fetch blogs from API with limit
const { data: blogResponse } = await useFetch(`${apiBaseUrl}/blogs?limit=3`)

const blogs = computed(() => {
    // @ts-ignore
    return blogResponse.value?.data?.data || []
})

const onImageError = (e: Event) => {
    const target = e.target as HTMLImageElement
    if (target) {
        target.src = 'https://placehold.co/600x400?text=No+Image'
    }
}
</script>

<template>
    <section v-if="blogs.length > 0" class="section-padding bg-background relative overflow-hidden">
        <div class="container mx-auto px-4 relative z-10">
            <!-- Section Header -->
            <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
                <div>
                    <span class="badge badge-primary mb-4 animate-fade-up inline-flex items-center gap-2">
                        <UIcon name="i-lucide-file-text" class="w-4 h-4" />
                        Health Tips
                    </span>
                    <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground animate-fade-up stagger-1">
                        Latest <span class="text-gradient">Articles</span>
                    </h2>
                </div>
                <NuxtLink to="/blog" class="mt-4 sm:mt-0 group flex items-center gap-2 text-primary font-medium hover:text-primary-600 transition-colors animate-fade-up stagger-2">
                    View All Articles
                    <UIcon name="i-lucide-arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </NuxtLink>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <NuxtLink v-for="blog in blogs" :key="blog.id" :to="`/blog/${blog.slug}`"
                    class="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 animate-fade-up h-full">
                    
                    <div class="relative h-48 md:h-56 overflow-hidden">
                        <img v-if="blog.photo" :src="blog.photo" :alt="blog.title_en"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            @error="onImageError" />
                        <div v-else class="w-full h-full bg-gray-100 flex items-center justify-center">
                            <UIcon name="i-lucide-image" class="w-12 h-12 text-gray-300" />
                        </div>
                        
                        <div v-if="blog.category_name_en" class="absolute top-4 left-4">
                            <span class="px-3 py-1 bg-white/90 backdrop-blur-sm text-sm font-medium rounded-full shadow-sm">
                                {{ blog.category_name_en }}
                            </span>
                        </div>
                    </div>

                    <div class="p-6 flex flex-col flex-grow">
                        <div class="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                            <span>{{ blog.created_at }}</span>
                        </div>
                        <h3 class="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {{ blog.title_en }}
                        </h3>
                        <p class="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">
                            {{ blog.excerpt_en }}
                        </p>
                        <div class="mt-auto flex items-center text-primary font-medium text-sm group/link">
                            Read More
                            <UIcon name="i-lucide-chevron-right" class="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
