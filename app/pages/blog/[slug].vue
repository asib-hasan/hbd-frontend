<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogs } from '~/composables/useBlogs'
import AppFooter from '~/components/AppFooter.vue'

const route = useRoute()
const slug = route.params.slug as string
const { fetchBlog } = useBlogs()

const { data: apiResponse, pending } = await fetchBlog(slug)

const post = computed(() => {
    return (apiResponse.value as any)?.data || null
})

const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

const tags = computed(() => {
    if (!post.value || !post.value.keywords_en) return []
    return post.value.keywords_en.split(',').map((t: string) => t.trim()).filter(Boolean)
})

// SEO
if (post.value) {
    useHead({
        title: `${post.value.title_en} | HomeoDoctorsBD Blog`,
        meta: [
            { name: 'description', content: post.value.title_en },
            { property: 'og:title', content: post.value.title_en },
            { property: 'og:image', content: post.value.photo || '' }
        ]
    })
} else {
    useHead({
        title: 'Article Not Found | HomeoDoctorsBD'
    })
}
</script>

<template>
    <!-- Loading State -->
    <div v-if="pending" class="min-h-screen bg-background flex flex-col items-center justify-center">
        <UIcon name="i-lucide-loader-2" class="w-12 h-12 animate-spin text-primary mb-4" />
        <p class="text-muted-foreground font-medium animate-pulse">Loading article...</p>
    </div>

    <!-- Not Found State -->
    <div v-else-if="!post" class="min-h-screen bg-background flex flex-col">
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

    <!-- Actual Page Layout -->
    <div v-else class="min-h-[100dvh] flex flex-col bg-background pt-16">
        <!-- Hero Section -->
        <section class="pt-12 pb-12 bg-gradient-hero-subtle relative overflow-hidden">
            <div
                class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.05),transparent_50%)]" />
            <div class="container mx-auto px-4 relative z-10">
                <NuxtLink to="/blog"
                    class="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 font-medium">
                    <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
                    Back to Blog
                </NuxtLink>

                <div class="max-w-4xl">
                    <div v-if="post.category_name_en"
                        class="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary transition-colors hover:bg-primary/20 shadow-soft">
                        {{ post.category_name_en }}
                    </div>
                    <h1
                        class="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                        {{ post.title_en }}
                    </h1>

                    <div class="flex flex-wrap items-center gap-6 text-muted-foreground">
                        <div class="flex items-center gap-4 text-sm font-medium">
                            <span class="flex items-center gap-1.5" v-if="post.created_at">
                                <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                                {{ post.created_at }}
                            </span>
                            <span class="flex items-center gap-1.5 text-primary">
                                <UIcon name="i-lucide-shield-check" class="w-4 h-4" />
                                Official Post
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
                    <img :src="post.photo || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200'"
                        :alt="post.title_en"
                        class="w-full h-64 md:h-[500px] object-cover rounded-3xl shadow-elevated border border-border/50" />
                </div>
            </div>
        </section>

        <!-- Content -->
        <section class="pb-12 lg:pb-16 flex-grow">
            <div class="container mx-auto px-4">
                <div class="grid lg:grid-cols-3 gap-10">
                    <!-- Main Content -->
                    <article class="lg:col-span-2">
                        <div class="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-p:leading-relaxed"
                            v-html="post.details_en">
                        </div>

                        <!-- Tags inline -->
                        <div v-if="tags.length > 0" class="mt-10 pt-6 border-t border-border/50">
                            <h4 class="font-semibold text-foreground mb-3 font-display">Tags</h4>
                            <div class="flex flex-wrap gap-2">
                                <div v-for="tag in tags" :key="tag"
                                    class="inline-flex items-center rounded-lg border border-border bg-muted/50 px-3 py-1 text-xs font-semibold text-foreground hover:bg-muted transition-colors shadow-sm">
                                    #{{ tag }}
                                </div>
                            </div>
                        </div>

                        <!-- Share -->
                        <div class="mt-8 pt-6 border-t border-border/50">
                            <h4 class="font-semibold font-display text-foreground mb-4 flex items-center gap-2">
                                <UIcon name="i-lucide-share-2" class="w-5 h-5 text-primary" />
                                Share this article
                            </h4>
                            <div class="flex gap-3">
                                <a :href="`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`" target="_blank"
                                    rel="noopener noreferrer"
                                    class="w-12 h-12 rounded-xl bg-muted/50 border border-border flex items-center justify-center hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors text-muted-foreground shadow-sm group">
                                    <UIcon name="i-lucide-facebook"
                                        class="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </a>
                                <a :href="`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title_en}`"
                                    target="_blank" rel="noopener noreferrer"
                                    class="w-12 h-12 rounded-xl bg-muted/50 border border-border flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors text-muted-foreground shadow-sm group">
                                    <UIcon name="i-lucide-twitter"
                                        class="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </a>
                                <a :href="`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${post.title_en}`"
                                    target="_blank" rel="noopener noreferrer"
                                    class="w-12 h-12 rounded-xl bg-muted/50 border border-border flex items-center justify-center hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors text-muted-foreground shadow-sm group">
                                    <UIcon name="i-lucide-linkedin"
                                        class="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </article>

                    <!-- Sidebar -->
                    <aside class="lg:col-span-1">
                        <div class="sticky top-28 space-y-6">
                            <!-- Subscribe / Quick Action Banner -->
                            <div
                                class="card-premium p-6 bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20">
                                <div
                                    class="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-4 text-primary">
                                    <UIcon name="i-lucide-mail" class="w-6 h-6" />
                                </div>
                                <h4 class="font-display font-bold text-xl text-foreground mb-2">Stay Updated</h4>
                                <p class="text-sm text-muted-foreground mb-5">
                                    Get the latest homeopathic health insights delivered directly.
                                </p>
                                <UButton block size="lg" icon="i-lucide-arrow-right"
                                    class="shadow-soft w-full h-12 font-bold justify-between">
                                    Subscribe Now
                                </UButton>
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
