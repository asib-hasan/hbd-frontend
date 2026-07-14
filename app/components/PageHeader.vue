<script setup lang="ts">
defineProps<{
    title: string
    description: string
    breadcrumbs?: { label: string; href?: string }[]
    stats?: { label: string; value: string }[]
}>()

const formatTitle = (title: string) => {
    if (title.includes("Best")) {
        const parts = title.split("Best")
        // Returning an array to handle the split rendering in template
        return {
            prefix: parts[0],
            highlight: "Best",
            suffix: parts[1]
        }
    }
    return { prefix: title, highlight: "", suffix: "" }
}
</script>

<template>
    <section class="relative pt-28 pb-12 lg:pt-32 lg:pb-20 overflow-hidden">
        <!-- Background -->
        <div class="absolute inset-0 bg-gradient-hero-subtle" />
        <div class="absolute inset-0 bg-hero-pattern opacity-40" />
        <div
            class="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div
            class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div class="container mx-auto px-4 relative z-10">
            <!-- Breadcrumbs -->
            <nav v-if="breadcrumbs && breadcrumbs.length > 0"
                class="flex items-center gap-2 text-sm text-muted-foreground mb-6 animate-fade-up">
                <NuxtLink to="/" class="hover:text-primary transition-colors">Home</NuxtLink>
                <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
                <template v-for="(crumb, idx) in breadcrumbs" :key="idx">
                    <NuxtLink v-if="crumb.href" :to="crumb.href" class="hover:text-primary transition-colors">
                        {{ crumb.label }}
                    </NuxtLink>
                    <span v-else class="text-foreground font-medium line-clamp-1 max-w-[200px]">{{ crumb.label }}</span>
                    <UIcon v-if="idx < breadcrumbs.length - 1" name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
                </template>
            </nav>

            <div class="max-w-4xl" :class="!breadcrumbs ? 'mt-4' : ''">
                <h1
                    class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-up stagger-1">
                    <template v-if="title.includes('Best')">
                        {{ formatTitle(title).prefix }}
                        <span class="text-gradient">Best</span>
                        {{ formatTitle(title).suffix }}
                    </template>
                    <template v-else>
                        {{ title }}
                    </template>
                </h1>
                <p class="text-lg text-muted-foreground max-w-2xl animate-fade-up stagger-2">
                    {{ description }}
                </p>

                <!-- Stats -->
                <div v-if="stats" class="flex flex-wrap gap-8 mt-8 animate-fade-up stagger-3">
                    <div v-for="(stat, index) in stats" :key="index" class="flex items-center gap-2">
                        <span class="text-2xl font-bold text-primary font-display">{{ stat.value }}</span>
                        <span class="text-muted-foreground">{{ stat.label }}</span>
                    </div>
                </div>

                <slot />
            </div>
        </div>
    </section>
</template>
