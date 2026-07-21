<script setup lang="ts">


useHead({
    title: 'Privacy Policy | HomeoDoctorsBD',
    meta: [
        { name: 'description', content: 'Read HomeoDoctorsBD\'s Privacy Policy to understand how we collect, use, and protect your personal information on our homeopathy platform.' }
    ]
})

const lastUpdated = 'March 13, 2025';

const { tm, t } = useI18n()
const localePath = useLocalePath()
    

</script>

<template>
    <div class="min-h-screen bg-background">
        <!-- Hero -->
        <section
            class="relative bg-gradient-to-br from-primary/5 via-background to-secondary/10 pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_50%)]" />
            <div class="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

            <div class="container mx-auto px-4 relative z-10">
                <nav class="flex items-center gap-2 text-sm text-muted-foreground mb-6 ">
                    <NuxtLink :to="localePath('/')" class="hover:text-primary transition-colors">{{ $t('nav.home') }}</NuxtLink>
                    <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
                    <span class="text-foreground font-medium">{{ $t('privacy_page.nav_title') }}</span>
                </nav>
                <div class="max-w-3xl mx-auto text-center ">
                    <div
                        class="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <UIcon name="i-lucide-shield-check" class="w-4 h-4" />
                        {{ $t('privacy_page.nav_title') }}
                    </div>
                    <h1 class="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                        {{ $t('privacy_page.hero_title') }} <span class="text-primary">{{ $t('privacy_page.hero_title_span') }}</span>
                    </h1>
                    <p class="text-lg text-muted-foreground leading-relaxed mb-4">
                        {{ $t('privacy_page.hero_desc') }}
                    </p>
                    <div
                        class="inline-flex items-center gap-2 bg-muted/60 text-muted-foreground px-4 py-2 rounded-xl text-sm">
                        <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                        {{ $t('privacy_page.last_updated') }}
                    </div>
                </div>
            </div>
        </section>

        <!-- Quick Summary Banner -->
        <section class="py-10 bg-primary/5 border-y border-primary/10">
            <div class="container mx-auto px-4">
                <div class="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
                    <div class="flex flex-col items-center gap-2">
                        <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <UIcon name="i-lucide-x-circle" class="w-6 h-6 text-primary" />
                        </div>
                        <p class="font-semibold text-foreground text-sm">{{ $t('privacy_page.banner1') }}</p>
                    </div>
                    <div class="flex flex-col items-center gap-2">
                        <div class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                            <UIcon name="i-lucide-lock" class="w-6 h-6 text-blue-600" />
                        </div>
                        <p class="font-semibold text-foreground text-sm">{{ $t('privacy_page.banner2') }}</p>
                    </div>
                    <div class="flex flex-col items-center gap-2">
                        <div class="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                            <UIcon name="i-lucide-user-x" class="w-6 h-6 text-purple-600" />
                        </div>
                        <p class="font-semibold text-foreground text-sm">{{ $t('privacy_page.banner3') }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Content -->
        <section class="py-16 md:py-24">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto">
                    <!-- TOC -->
                    <div class="card-premium p-6 mb-12 ">
                        <h2 class="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                            <UIcon name="i-lucide-list" class="w-5 h-5 text-primary" />
                            {{ $t('privacy_page.toc_title') }}
                        </h2>
                        <ol class="space-y-2">
                            <li v-for="(section, idx) in tm('privacy_page.sections')" :key="idx"
                                class="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm">
                                <span
                                    class="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                                    {{ idx + 1 }}
                                </span>
                                {{ $rt(section.title) }}
                            </li>
                        </ol>
                    </div>

                    <!-- Sections -->
                    <div class="space-y-8">
                        <div v-for="(section, idx) in tm('privacy_page.sections')" :key="idx"
                            class="card-premium p-8 "
                            :style="{ animationDelay: `${idx * 0.05}s` }">
                            <div class="flex items-start gap-4 mb-6">
                                <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <UIcon :name="$rt(section.icon)" class="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <span class="text-xs font-bold text-primary uppercase tracking-wider">Section {{ idx + 1 }}</span>
                                    <h2 class="font-display text-xl md:text-2xl font-bold text-foreground">
                                        {{ $rt(section.title) }}
                                    </h2>
                                </div>
                            </div>
                            <div class="space-y-5 pl-0 md:pl-16">
                                <div v-for="(item, iIdx) in section.content" :key="iIdx">
                                    <h3 class="font-semibold text-foreground mb-2 flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                                        {{ $rt(item.subtitle) }}
                                    </h3>
                                    <p class="text-muted-foreground leading-relaxed text-sm md:text-base">
                                        {{ $rt(item.text) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>


    </div>
</template>
