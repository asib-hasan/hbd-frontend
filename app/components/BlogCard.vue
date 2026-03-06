<template>
    <article class="group card-premium hover-lift animate-fade-up"
        :style="{ animationDelay: `${(index % 6 + 1) * 0.1}s` }">
        <NuxtLink :to="`/blog/${slug}`">
            <div class="relative overflow-hidden rounded-t-2xl">
                <img :src="photo || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80'"
                    :alt="title_en"
                    class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
                <div v-if="category_name_en"
                    class="absolute top-4 left-4 bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-soft">
                    {{ category_name_en }}
                </div>
            </div>
            <div class="p-5">
                <div class="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span class="flex items-center gap-1.5" v-if="created_at">
                        <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                        {{ created_at }}
                    </span>
                </div>
                <h3
                    class="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {{ title_en }}
                </h3>
                <p class="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {{ excerpt_en || 'Read the full story by visiting the blog page.' }}
                </p>
                <div class="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
                    <span
                        class="text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More
                        <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
                    </span>
                </div>
            </div>
        </NuxtLink>
    </article>
</template>

<script setup lang="ts">
const props = defineProps<{
    id: string | number
    slug: string
    title_en: string
    title_bn?: string
    photo?: string | null
    category_name_en?: string | null
    category_name_bn?: string | null
    excerpt_en?: string
    excerpt_bn?: string
    created_at?: string
    index: number
}>();
</script>
