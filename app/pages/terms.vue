<script setup lang="ts">


useHead({
    title: 'Terms of Service | HomeoDoctorsBD',
    meta: [
        { name: 'description', content: 'Read the Terms of Service for HomeoDoctorsBD. Understand your rights and responsibilities when using Bangladesh\'s leading homeopathy platform.' }
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
                <nav class="flex items-center gap-2 text-sm text-muted-foreground mb-6 animate-fade-up">
                    <NuxtLink :to="localePath('/')" class="hover:text-primary transition-colors">{{ $t('nav.home') }}</NuxtLink>
                    <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
                    <span class="text-foreground font-medium">{{ $t('terms_page.nav_title') }}</span>
                </nav>
                <div class="max-w-3xl mx-auto text-center animate-fade-up">
                    <div
                        class="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <UIcon name="i-lucide-scroll-text" class="w-4 h-4" />
                        {{ $t('terms_page.nav_title') }}
                    </div>
                    <h1 class="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                        {{ $t('terms_page.hero_title') }}<span class="text-primary">{{ $t('terms_page.hero_title_span') }}</span>
                    </h1>
                    <p class="text-lg text-muted-foreground leading-relaxed mb-4">
                        {{ $t('terms_page.hero_desc') }}
                    </p>
                    <div
                        class="inline-flex items-center gap-2 bg-muted/60 text-muted-foreground px-4 py-2 rounded-xl text-sm">
                        <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                        {{ $t('terms_page.last_updated') }}
                    </div>
                </div>
            </div>
        </section>

        <!-- Key Highlights -->
        <section class="py-10 bg-amber-500/5 border-y border-amber-500/20">
            <div class="container mx-auto px-4">
                <p class="text-center text-sm font-semibold text-amber-700 dark:text-amber-400 mb-6 flex items-center justify-center gap-2">
                    <UIcon name="i-lucide-lightbulb" class="w-4 h-4" />
                    {{ $t('terms_page.key_things_title') }}
                </p>
                <div class="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div v-for="(h, idx) in tm('terms_page.key_things')" :key="idx"
                        class="flex items-center gap-3">
                        <div :class="`w-10 h-10 ${$rt(h.bg)} rounded-xl flex items-center justify-center flex-shrink-0`">
                            <UIcon :name="$rt(h.icon)" :class="`w-5 h-5 ${$rt(h.color)}`" />
                        </div>
                        <p class="text-sm font-medium text-foreground">{{ $rt(h.text) }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Content -->
        <section class="py-16 md:py-24">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto">
                    <!-- TOC -->
                    <div class="card-premium p-6 mb-12 animate-fade-up">
                        <h2 class="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                            <UIcon name="i-lucide-list" class="w-5 h-5 text-primary" />
                            {{ $t('terms_page.toc_title') }}
                        </h2>
                        <ol class="space-y-2 columns-1 sm:columns-2">
                            <li v-for="(section, idx) in tm('terms_page.sections')" :key="idx"
                                class="flex items-center gap-3 text-muted-foreground text-sm break-inside-avoid">
                                <span
                                    class="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                                    {{ idx + 1 }}
                                </span>
                                {{ $rt(section.title) }}
                            </li>
                        </ol>
                    </div>

                    <!-- Sections -->
                    <div class="space-y-6">
                        <div v-for="(section, idx) in tm('terms_page.sections')" :key="idx"
                            class="card-premium p-8 animate-fade-up"
                            :style="{ animationDelay: `${idx * 0.04}s` }">
                            <div class="flex items-start gap-4 mb-4">
                                <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <UIcon :name="$rt(section.icon)" class="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <span class="text-xs font-bold text-primary uppercase tracking-wider">{{ idx + 1 }}.</span>
                                    <h2 class="font-display text-xl font-bold text-foreground">{{ $rt(section.title) }}</h2>
                                </div>
                            </div>
                            <p class="text-muted-foreground leading-relaxed pl-0 md:pl-16 text-sm md:text-base">
                                {{ $rt(section.content) }}
                            </p>
                        </div>
                    </div>

                    <!-- Agreement note -->
                    <div class="mt-12 card-premium p-8 text-center animate-fade-up bg-primary/5 border-primary/20">
                        <div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <UIcon name="i-lucide-handshake" class="w-7 h-7 text-primary" />
                        </div>
                        <h3 class="font-display font-bold text-xl text-foreground mb-2">{{ $t('terms_page.agreement_title') }}</h3>
                        <p class="text-muted-foreground mb-6 text-sm max-w-xl mx-auto">
                            {{ $t('terms_page.agreement_desc') }}
                        </p>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <NuxtLink :to="localePath('/doctors')">
                                <UButton size="lg" class="gap-2 font-semibold shadow-glow-accent">
                                    <UIcon name="i-lucide-search" class="w-4 h-4" />
                                    {{ $t('terms_page.find_doctor_btn') }}
                                </UButton>
                            </NuxtLink>
                            <NuxtLink :to="localePath('/contact')">
                                <UButton variant="outline" size="lg" class="gap-2 font-semibold">
                                    <UIcon name="i-lucide-mail" class="w-4 h-4" />
                                    {{ $t('terms_page.contact_btn') }}
                                </UButton>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    </div>
</template>
