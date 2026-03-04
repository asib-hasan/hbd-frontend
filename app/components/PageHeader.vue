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
    <section class="relative pt-24 pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
        <!-- Background -->
        <div class="absolute inset-0 bg-gradient-hero-subtle" />
        <div class="absolute inset-0 bg-hero-pattern opacity-40" />
        <div
            class="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div
            class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div class="container mx-auto px-4 relative z-10">
            <!-- Breadcrumbs -->


            <div class="max-w-4xl">
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
