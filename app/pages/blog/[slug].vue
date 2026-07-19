<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogs } from '~/composables/useBlogs'


const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const slug = route.params.slug as string
const { fetchBlog, fetchRelatedBlogs } = useBlogs()

const { data: apiResponse, pending } = await fetchBlog(slug)

const post = computed(() => {
    return (apiResponse.value as any)?.data || null
})

const relatedBlogs = ref<any[]>([])

const shareUrl = computed(() => {
    if (typeof window !== 'undefined') return window.location.href
    return ''
})

const tags = computed(() => {
    if (!post.value || !post.value.keywords_en) return []
    const rawTags = locale.value === 'bn' ? (post.value.keywords_bn || post.value.keywords_en) : post.value.keywords_en
    return rawTags.split(',').map((t: string) => t.trim()).filter(Boolean)
})

const readingTime = computed(() => {
    if (!post.value?.details_en) return '1 min'
    const text = post.value.details_en.replace(/<[^>]*>/g, '')
    const words = text.split(/\s+/).length
    const minutes = Math.max(1, Math.ceil(words / 200))
    return `${minutes} min read`
})

const copyLink = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl.value)
        linkCopied.value = true
        setTimeout(() => linkCopied.value = false, 2000)
    }
}

const linkCopied = ref(false)

onMounted(async () => {
    try {
        const response = await fetchRelatedBlogs(slug)
        relatedBlogs.value = response?.data || []
    } catch (e) {
        console.error('Failed to fetch related blogs:', e)
    }
})

const currentTitle = computed(() => {
    if (!post.value) return 'Article Not Found | HomeoDoctorsBD'
    if (post.value.meta_title) return post.value.meta_title
    return `${locale.value === 'bn' ? (post.value.title_bn || post.value.title_en) : post.value.title_en} | HomeoDoctorsBD Blog`
})

const currentDescription = computed(() => {
    if (!post.value) return 'Article Not Found | HomeoDoctorsBD'
    if (post.value.meta_description) return post.value.meta_description
    return locale.value === 'bn' ? (post.value.title_bn || post.value.title_en) : post.value.title_en
})

// SEO
if (post.value) {
    useSeoMeta({
        title: currentTitle,
        ogTitle: currentTitle,
        description: currentDescription,
        ogDescription: currentDescription,
        ogImage: computed(() => post.value.photo || ''),
        ogType: 'article',
        twitterCard: 'summary_large_image',
        twitterTitle: currentTitle,
        twitterDescription: currentDescription,
    })

    useHead({
        script: [
            {
                type: 'application/ld+json',
                children: computed(() => {
                    if (!post.value) return ''
                    const schema = {
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": locale.value === 'bn' ? (post.value.title_bn || post.value.title_en) : post.value.title_en,
                        "image": post.value.photo,
                        "datePublished": post.value.created_at,
                        "description": currentDescription.value,
                        "articleSection": locale.value === 'bn' ? (post.value.category_name_bn || post.value.category_name_en) : post.value.category_name_en
                    }
                    return JSON.stringify(schema)
                })
            }
        ]
    })
} else {
    useHead({
        title: 'Article Not Found | HomeoDoctorsBD'
    })
}
</script>

<template>
  <div>
    <!-- Loading State -->
    <div v-if="pending" class="min-h-[100dvh] flex flex-col bg-background">
        <!-- Hero Skeleton -->
        <section class="pt-28 pb-12 lg:pt-32 lg:pb-20 bg-gradient-hero-subtle">
            <div class="container mx-auto px-4 relative z-10 max-w-4xl">
                <USkeleton class="h-4 w-64 mb-6" />
                <div class="flex gap-3 mb-5">
                    <USkeleton class="h-6 w-24 rounded-full" />
                    <USkeleton class="h-6 w-20 rounded-full" />
                </div>
                <USkeleton class="h-12 w-full mb-3" />
                <USkeleton class="h-12 w-3/4 mb-5" />
                <div class="flex items-center gap-5">
                    <USkeleton class="h-8 w-32" />
                    <USkeleton class="h-4 w-24" />
                </div>
            </div>
        </section>
        
        <!-- Content Skeleton -->
        <section class="pb-16 flex-grow">
            <div class="container mx-auto px-4">
                <div class="grid lg:grid-cols-3 gap-10">
                    <div class="lg:col-span-2 space-y-6">
                        <USkeleton class="h-56 md:h-[420px] lg:h-[400px] w-full rounded-2xl" />
                        <USkeleton class="h-4 w-full" />
                        <USkeleton class="h-4 w-full" />
                        <USkeleton class="h-4 w-full" />
                        <USkeleton class="h-4 w-5/6" />
                        <USkeleton class="h-4 w-full" />
                        <USkeleton class="h-4 w-3/4" />
                    </div>
                    <aside class="lg:col-span-1 space-y-6">
                        <USkeleton class="h-6 w-48 mb-4" />
                        <USkeleton class="h-32 w-full rounded-2xl" />
                        <USkeleton class="h-32 w-full rounded-2xl" />
                    </aside>
                </div>
            </div>
        </section>
    </div>

    <!-- Not Found State -->
    <div v-else-if="!post" class="min-h-screen bg-background flex flex-col">
        <div class="flex-grow flex items-center justify-center text-center px-4">
            <div class="max-w-md">
                <div class="w-20 h-20 bg-muted/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <UIcon name="i-lucide-file-x" class="w-10 h-10 text-muted-foreground" />
                </div>
                <h1 class="text-3xl font-display font-bold text-foreground mb-3">{{ $t('blog_details.not_found_title') }}</h1>
                <p class="text-muted-foreground mb-8 text-lg">{{ $t('blog_details.not_found_desc') }}</p>
                <NuxtLink :to="localePath('/blog')">
                    <UButton size="lg" class="font-bold px-8 h-12 rounded-xl shadow-soft">
                        <UIcon name="i-lucide-arrow-left" class="w-4 h-4 mr-2" />
                        {{ $t('blog_details.back_to_blog') }}
                    </UButton>
                </NuxtLink>
            </div>
        </div>

    </div>

    <!-- Actual Page Layout -->
    <main v-else class="min-h-[100dvh] flex flex-col bg-background">
        <!-- Hero Section -->
        <section class="pt-28 pb-12 lg:pt-32 lg:pb-20 bg-gradient-hero-subtle relative overflow-hidden">
            <div
                class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.05),transparent_50%)]" />
            <div
                class="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl -translate-y-1/2" />

            <div class="container mx-auto px-4 relative z-10">
                <!-- Breadcrumb -->
                <nav class="flex items-center gap-2 text-sm text-muted-foreground mb-6 animate-fade-up">
                    <NuxtLink :to="localePath('/')" class="hover:text-primary transition-colors">{{ $t('nav.home') }}</NuxtLink>
                    <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
                    <NuxtLink :to="localePath('/blog')" class="hover:text-primary transition-colors">{{ $t('nav.blogs') }}</NuxtLink>
                    <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
                    <span class="text-foreground font-medium line-clamp-1 max-w-[200px]">{{ locale === 'bn' ? (post.title_bn || post.title_en) : post.title_en }}</span>
                </nav>

                <div class="max-w-4xl">
                    <!-- Category & Meta -->
                    <div class="flex flex-wrap items-center gap-3 mb-5 animate-fade-up stagger-1">
                        <div v-if="post.category_name_en"
                            class="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-bold text-primary shadow-sm">
                            <UIcon name="i-lucide-folder" class="w-3.5 h-3.5 mr-1.5" />
                            {{ locale === 'bn' ? (post.category_name_bn || post.category_name_en) : post.category_name_en }}
                        </div>
                        <div
                            class="inline-flex items-center rounded-full bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                            <UIcon name="i-lucide-clock" class="w-3.5 h-3.5 mr-1.5" />
                            {{ readingTime }}
                        </div>
                    </div>

                    <!-- Title -->
                    <h1
                        class="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-5 leading-[1.15] animate-fade-up stagger-2">
                        {{ locale === 'bn' ? (post.title_bn || post.title_en) : post.title_en }}
                    </h1>

                    <!-- Post Meta -->
                    <div class="flex flex-wrap items-center gap-5 animate-fade-up stagger-3">
                        <div class="flex items-center gap-2 text-sm text-muted-foreground">
                            <div
                                class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <UIcon name="i-lucide-shield-check" class="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <span class="block font-semibold text-foreground text-xs">HomeoDoctorsBD</span>
                                <span class="text-xs">{{ $t('blog_details.official_post') }}</span>
                            </div>
                        </div>
                        <div class="w-px h-6 bg-border hidden sm:block" />
                        <span class="flex items-center gap-1.5 text-sm text-muted-foreground" v-if="post.created_at">
                            <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                            {{ post.created_at }}
                        </span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Content with Sidebar -->
        <section class="pb-16 flex-grow">
            <div class="container mx-auto px-4">
                <div class="grid lg:grid-cols-3 gap-10">
                    <!-- Main Content - Left -->
                    <div class="lg:col-span-2">
                        <!-- Featured Image (inside grid) -->
                        <div
                            class="relative rounded-2xl overflow-hidden shadow-elevated border border-border/30 group mb-10">
                            <img :src="post.photo || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200'"
                                :alt="post.title_en"
                                class="w-full h-56 md:h-[420px] lg:h-[400px] object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                        </div>

                        <!-- Article Body -->
                        <article>
                            <div class="prose prose-lg text-muted-foreground max-w-none
                                prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground
                                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border/30 prose-h2:pb-3
                                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                                prose-p:leading-[1.85] prose-p:text-muted-foreground prose-p:mb-5
                                prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                                prose-img:rounded-2xl prose-img:shadow-soft prose-img:border prose-img:border-border/30
                                prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:px-4
                                prose-strong:text-foreground
                                prose-li:text-muted-foreground prose-li:marker:text-primary
                                prose-code:bg-muted prose-code:rounded-md prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm"
                                v-html="locale === 'bn' ? (post.details_bn || post.details_en) : post.details_en">
                            </div>
                        </article>

                        <!-- Tags -->
                        <div v-if="tags.length > 0" class="mt-10 pt-8 border-t border-border/50">
                            <div class="flex items-center gap-2 mb-4">
                                <UIcon name="i-lucide-tag" class="w-4 h-4 text-primary" />
                                <h4 class="font-semibold text-foreground font-display text-sm uppercase tracking-wider">
                                    {{ $t('blog_details.tags') }}</h4>
                            </div>
                            <div class="flex flex-wrap gap-2">
                                <div v-for="tag in tags" :key="tag"
                                    class="inline-flex items-center rounded-xl border border-border bg-muted/30 px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all cursor-default">
                                    <span class="text-primary mr-1">#</span>{{ tag }}
                                </div>
                            </div>
                        </div>

                        <!-- Share Section -->
                        <div class="mt-8 pt-8 border-t border-border/50">
                            <div
                                class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-muted/20 rounded-2xl border border-border/30">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <UIcon name="i-lucide-share-2" class="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 class="font-semibold font-display text-foreground text-sm">{{ $t('blog_details.share_title') }}</h4>
                                        <p class="text-xs text-muted-foreground">{{ $t('blog_details.share_desc') }}</p>
                                    </div>
                                </div>
                                <div class="flex gap-2">
                                    <a :href="`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`"
                                        target="_blank" rel="noopener noreferrer"
                                        class="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all text-muted-foreground shadow-sm group"
                                        title="Share on Facebook">
                                        <UIcon name="i-lucide-facebook"
                                            class="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    </a>
                                    <a :href="`https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(post.title_en)}`"
                                        target="_blank" rel="noopener noreferrer"
                                        class="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all text-muted-foreground shadow-sm group"
                                        title="Share on Twitter">
                                        <UIcon name="i-lucide-twitter"
                                            class="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    </a>
                                    <a :href="`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodeURIComponent(post.title_en)}`"
                                        target="_blank" rel="noopener noreferrer"
                                        class="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all text-muted-foreground shadow-sm group"
                                        title="Share on LinkedIn">
                                        <UIcon name="i-lucide-linkedin"
                                            class="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    </a>
                                    <button @click="copyLink"
                                        class="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all text-muted-foreground shadow-sm group"
                                        :title="linkCopied ? $t('blog_details.copied') : $t('blog_details.copy_link')">
                                        <UIcon :name="linkCopied ? 'i-lucide-check' : 'i-lucide-link'"
                                            class="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <aside class="lg:col-span-1">
                        <div class="space-y-6">
                            <div v-if="relatedBlogs.length > 0">
                                <div class="flex items-center gap-2 mb-4">
                                    <UIcon name="i-lucide-newspaper" class="w-5 h-5 text-primary" />
                                    <h3 class="font-display font-bold text-lg text-foreground">{{ $t('blog_details.related_articles') }}</h3>
                                </div>
                                <div class="space-y-4">
                                    <NuxtLink v-for="(article, idx) in relatedBlogs" :key="article.id"
                                        :to="localePath(`/blog/${article.slug}`)"
                                        class="block group rounded-2xl border border-border/50 bg-background overflow-hidden hover:border-primary/30 hover:shadow-soft transition-all">
                                        <div class="relative h-36 overflow-hidden">
                                            <img :src="article.photo" :alt="article.title_en"
                                                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                            <div v-if="article.category_name_en"
                                                class="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm">
                                                {{ locale === 'bn' ? (article.category_name_bn || article.category_name_en) : article.category_name_en }}
                                            </div>
                                        </div>
                                        <div class="p-4">
                                            <h4
                                                class="font-display font-semibold text-sm text-foreground mb-1.5 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                                                {{ locale === 'bn' ? (article.title_bn || article.title_en) : article.title_en }}
                                            </h4>
                                            <div class="flex items-center gap-3 text-xs text-muted-foreground">
                                                <span v-if="article.created_at" class="flex items-center gap-1">
                                                    <UIcon name="i-lucide-calendar" class="w-3 h-3" />
                                                    {{ article.created_at }}
                                                </span>
                                            </div>
                                        </div>
                                    </NuxtLink>
                                </div>

                                <NuxtLink :to="localePath('/blog')"
                                    class="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-border/50 text-sm font-semibold text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                                    {{ $t('blog_details.view_all_articles') }}
                                    <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
                                </NuxtLink>
                            </div>

                            <div v-else
                                class="p-6 rounded-2xl border border-dashed border-border/50 bg-muted/10 text-center">
                                <UIcon name="i-lucide-book-open"
                                    class="w-8 h-8 text-muted-foreground/50 mx-auto mb-3" />
                                <p class="text-sm text-muted-foreground font-medium">{{ $t('blog_details.no_related_articles') }}</p>
                                <NuxtLink :to="localePath('/blog')"
                                    class="inline-flex items-center gap-1 text-primary text-sm font-semibold mt-2 hover:underline">
                                    {{ $t('blog_details.browse_all_articles') }}
                                    <UIcon name="i-lucide-arrow-right" class="w-3.5 h-3.5" />
                                </NuxtLink>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    </main>
  </div>
</template>
