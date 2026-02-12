<script setup lang="ts">
import { useRoute } from 'vue-router'
import { blogPosts } from '~/utils/blogs'
import AppFooter from '~/components/AppFooter.vue';

const route = useRoute()
const slug = route.params.slug as string
const post = blogPosts.find((p) => p.slug === slug)

const relatedPosts = post
    ? blogPosts
        .filter((p) => p.id !== post.id && p.category === post.category)
        .slice(0, 3)
    : []

const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })
}

// SEO
if (post) {
    useHead({
        title: `${post.title} | HomeoDoctorsBD Blog`,
        meta: [
            { name: 'description', content: post.excerpt },
            { property: 'og:title', content: post.title },
            { property: 'og:description', content: post.excerpt },
            { property: 'og:image', content: post.coverImage }
        ]
    })
} else {
    useHead({
        title: 'Article Not Found | HomeoDoctorsBD'
    })
}
</script>

<template>
    <div v-if="!post" class="min-h-screen bg-background flex flex-col">
        <!-- Header placeholder if needed, or rely on layout -->
        <div class="flex-grow flex items-center justify-center text-center px-4">
            <div>
                <h1 class="text-3xl font-display font-bold text-foreground mb-4">Article Not Found</h1>
                <p class="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
                <NuxtLink to="/blog">
                    <UButton>Back to Blog</UButton>
                </NuxtLink>
            </div>
        </div>
        <AppFooter />
    </div>

    <div v-else class="min-h-screen bg-background pt-16">
        <!-- Hero Section -->
        <section class="pt-12 pb-12 bg-gradient-hero-subtle relative overflow-hidden">
            <div
                class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.05),transparent_50%)]" />
            <div class="container mx-auto px-4 relative z-10">
                <NuxtLink to="/blog"
                    class="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6">
                    <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
                    Back to Blog
                </NuxtLink>

                <div class="max-w-4xl">
                    <div
                        class="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        {{ post.category }}
                    </div>
                    <h1
                        class="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                        {{ post.title }}
                    </h1>

                    <div class="flex flex-wrap items-center gap-6 text-muted-foreground">
                        <div class="flex items-center gap-3">
                            <img :src="post.authorAvatar" :alt="post.author"
                                class="w-12 h-12 rounded-full object-cover border-2 border-primary/20" />
                            <div>
                                <p class="font-medium text-foreground">{{ post.author }}</p>
                                <p class="text-xs">Homeopathic Practitioner</p>
                            </div>
                        </div>
                        <div class="hidden md:block w-px h-8 bg-border"></div>
                        <div class="flex items-center gap-4 text-sm">
                            <span class="flex items-center gap-1.5">
                                <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                                {{ formatDate(post.publishedAt) }}
                            </span>
                            <span class="flex items-center gap-1.5">
                                <UIcon name="i-lucide-clock" class="w-4 h-4" />
                                {{ post.readTime }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Image -->
        <section class="relative -mt-4 mb-8">
            <div class="container mx-auto px-4">
                <div class="max-w-5xl">
                    <img :src="post.coverImage" :alt="post.title"
                        class="w-full h-64 md:h-[400px] object-cover rounded-2xl shadow-elevated" />
                </div>
            </div>
        </section>

        <!-- Content -->
        <section class="pb-12 lg:pb-16">
            <div class="container mx-auto px-4">
                <div class="grid lg:grid-cols-3 gap-10">
                    <!-- Main Content -->
                    <article class="lg:col-span-2">
                        <div class="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
                            v-html="post.content">
                        </div>

                        <!-- Tags -->
                        <div class="mt-10 pt-6 border-t border-border">
                            <h4 class="font-semibold text-foreground mb-3">Tags</h4>
                            <div class="flex flex-wrap gap-2">
                                <div v-for="tag in post.tags" :key="tag"
                                    class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                    #{{ tag }}
                                </div>
                            </div>
                        </div>

                        <!-- Share -->
                        <div class="mt-8 pt-6 border-t border-border">
                            <h4 class="font-semibold text-foreground mb-3 flex items-center gap-2">
                                <UIcon name="i-lucide-share-2" class="w-4 h-4" />
                                Share this article
                            </h4>
                            <div class="flex gap-3">
                                <a :href="`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`" target="_blank"
                                    rel="noopener noreferrer"
                                    class="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors text-muted-foreground">
                                    <UIcon name="i-lucide-facebook" class="w-5 h-5" />
                                </a>
                                <a :href="`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`"
                                    target="_blank" rel="noopener noreferrer"
                                    class="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors text-muted-foreground">
                                    <UIcon name="i-lucide-twitter" class="w-5 h-5" />
                                </a>
                                <a :href="`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${post.title}`"
                                    target="_blank" rel="noopener noreferrer"
                                    class="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors text-muted-foreground">
                                    <UIcon name="i-lucide-linkedin" class="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </article>

                    <!-- Sidebar -->
                    <aside class="lg:col-span-1">
                        <div class="sticky top-28">
                            <!-- Author Card -->
                            <div class="card-premium p-6 mb-6">
                                <h4 class="font-display font-semibold text-foreground mb-4">About the Author</h4>
                                <div class="flex items-center gap-3 mb-3">
                                    <img :src="post.authorAvatar" :alt="post.author"
                                        class="w-16 h-16 rounded-full object-cover" />
                                    <div>
                                        <p class="font-semibold text-foreground">{{ post.author }}</p>
                                        <p class="text-sm text-muted-foreground">Homeopathic Practitioner</p>
                                    </div>
                                </div>
                                <p class="text-sm text-muted-foreground">
                                    Experienced homeopath dedicated to natural healing and patient education.
                                </p>
                            </div>

                            <!-- Related Posts -->
                            <div v-if="relatedPosts.length > 0" class="card-premium p-6">
                                <h4 class="font-display font-semibold text-foreground mb-4">Related Articles</h4>
                                <div class="space-y-4">
                                    <NuxtLink v-for="relatedPost in relatedPosts" :key="relatedPost.id"
                                        :to="`/blog/${relatedPost.slug}`" class="group flex gap-3">
                                        <img :src="relatedPost.coverImage" :alt="relatedPost.title"
                                            class="w-20 h-16 rounded-lg object-cover flex-shrink-0" />
                                        <div>
                                            <h5
                                                class="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                                {{ relatedPost.title }}
                                            </h5>
                                            <p class="text-xs text-muted-foreground mt-1">{{ relatedPost.readTime }}</p>
                                        </div>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <AppFooter />
    </div>
</template>
