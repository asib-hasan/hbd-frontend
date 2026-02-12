<script setup lang="ts">
import { ref, computed } from 'vue'
import { blogPosts, blogCategories } from '~/utils/blogs'
import PageHeader from '~/components/PageHeader.vue';

const selectedCategory = ref("All")
const searchQuery = ref("")

const filteredPosts = computed(() => {
    return blogPosts.filter((post) => {
        const matchesCategory = selectedCategory.value === "All" || post.category === selectedCategory.value
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()))
        return matchesCategory && matchesSearch
    })
})

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
}

useHead({
    title: 'Health & Wellness Blog | HomeoDoctorsBD',
    meta: [
        { name: 'description', content: 'Explore articles, tips, and insights about homeopathy and natural healing from our expert practitioners.' }
    ]
})
</script>

<template>
    <div class="min-h-screen bg-background">
        <PageHeader title="Health & Wellness Blog"
            description="Explore articles, tips, and insights about homeopathy and natural healing from our expert practitioners."
            :breadcrumbs="[
                { label: 'Home', href: '/' },
                { label: 'Blog' }
            ]" />

        <section class="py-12 lg:py-16">
            <div class="container mx-auto px-4">
                <!-- Search and Filter -->
                <div class="flex flex-col lg:flex-row gap-4 mb-10">
                    <div class="relative flex-1 max-w-md">
                        <UIcon name="i-lucide-search"
                            class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                        <input type="text" placeholder="Search articles..." v-model="searchQuery"
                            class="w-full h-10 pl-10 pr-4 bg-background border border-input rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all font-sans text-sm" />
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <button v-for="category in blogCategories" :key="category" @click="selectedCategory = category"
                            class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                            :class="selectedCategory === category
                                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                : 'bg-background border border-input text-foreground hover:bg-accent hover:text-accent-foreground'">
                            {{ category }}
                        </button>
                    </div>
                </div>

                <!-- Blog Grid -->
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    <article v-for="(post, index) in filteredPosts" :key="post.id"
                        class="group card-premium hover-lift animate-fade-up"
                        :style="{ animationDelay: `${(index % 6 + 1) * 0.1}s` }">
                        <NuxtLink :to="`/blog/${post.slug}`">
                            <div class="relative overflow-hidden rounded-t-2xl">
                                <img :src="post.coverImage" :alt="post.title"
                                    class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div
                                    class="absolute top-4 left-4 bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full text-xs font-semibold">
                                    {{ post.category }}
                                </div>
                            </div>
                            <div class="p-5">
                                <div class="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                    <span class="flex items-center gap-1.5">
                                        <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                                        {{ formatDate(post.publishedAt) }}
                                    </span>
                                    <span class="flex items-center gap-1.5">
                                        <UIcon name="i-lucide-clock" class="w-4 h-4" />
                                        {{ post.readTime }}
                                    </span>
                                </div>
                                <h3
                                    class="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                    {{ post.title }}
                                </h3>
                                <p class="text-muted-foreground text-sm line-clamp-2 mb-4">
                                    {{ post.excerpt }}
                                </p>
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <img :src="post.authorAvatar" :alt="post.author"
                                            class="w-8 h-8 rounded-full object-cover" />
                                        <span class="text-sm font-medium text-foreground">{{ post.author }}</span>
                                    </div>
                                    <span
                                        class="text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Read More
                                        <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        </NuxtLink>
                    </article>
                </div>

                <div v-if="filteredPosts.length === 0" class="text-center py-16">
                    <p class="text-muted-foreground text-lg">No articles found matching your criteria.</p>
                    <button @click="selectedCategory = 'All'; searchQuery = ''"
                        class="mt-4 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors">
                        Clear Filters
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>
