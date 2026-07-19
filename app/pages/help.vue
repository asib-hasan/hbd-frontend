<script setup lang="ts">


useHead({
    title: 'Help Center | HomeoDoctorsBD',
    meta: [
        { name: 'description', content: 'Find answers to your questions about HomeoDoctorsBD. Learn how to find doctors, book appointments, and get the most out of our homeopathy platform.' }
    ]
})

const { tm, t } = useI18n()
const localePath = useLocalePath()

const openIndex = ref<string | null>(null);
const toggle = (key: string) => {
    openIndex.value = openIndex.value === key ? null : key;
};
</script>

<template>
    <div class="min-h-screen bg-background">
        <!-- Hero -->
        <section
            class="relative bg-gradient-to-br from-primary/5 via-background to-secondary/10 pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_50%)]" />
            <div class="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div class="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

            <div class="container mx-auto px-4 relative z-10">
                <nav class="flex items-center gap-2 text-sm text-muted-foreground mb-6 ">
                    <NuxtLink :to="localePath('/')" class="hover:text-primary transition-colors">{{ $t('nav.home') }}</NuxtLink>
                    <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
                    <span class="text-foreground font-medium">{{ $t('help_page.nav_title') }}</span>
                </nav>
                <div class="max-w-3xl mx-auto text-center ">
                    <div
                        class="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <UIcon name="i-lucide-help-circle" class="w-4 h-4" />
                        {{ $t('help_page.nav_title') }}
                    </div>
                    <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                        {{ $t('help_page.hero_title') }} <span class="text-primary">{{ $t('help_page.hero_title_span') }}</span>
                    </h1>
                    <p class="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                        {{ $t('help_page.hero_desc') }}
                    </p>
                    <!-- Search Bar removed -->
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section class="py-16 md:py-20 bg-muted/30">
            <div class="container mx-auto px-4">
                <div class="text-center max-w-2xl mx-auto mb-12 ">
                    <h2 class="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                        {{ $t('help_page.faq_title') }}
                    </h2>
                    <p class="text-muted-foreground">{{ $t('help_page.faq_desc') }}</p>
                </div>

                <div class="max-w-3xl mx-auto space-y-10">
                    <div v-for="(section, sIdx) in tm('help_page.faqs')" :key="sIdx" class=""
                        :style="{ animationDelay: `${sIdx * 0.1}s` }">
                        <h3
                            class="font-display font-bold text-lg text-primary mb-4 flex items-center gap-2 uppercase tracking-wider text-sm">
                            <span class="flex-1 h-px bg-primary/20" />
                            {{ $rt(section.category) }}
                            <span class="flex-1 h-px bg-primary/20" />
                        </h3>
                        <div class="space-y-3">
                            <div v-for="(faq, fIdx) in section.items" :key="fIdx"
                                class="card-premium overflow-hidden">
                                <button
                                    class="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                                    @click="toggle(`${sIdx}-${fIdx}`)">
                                    <span class="font-semibold text-foreground pr-4">{{ $rt(faq.q) }}</span>
                                    <UIcon
                                        :name="openIndex === `${sIdx}-${fIdx}` ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                                        class="w-5 h-5 text-primary flex-shrink-0 transition-transform" />
                                </button>
                                <Transition name="faq">
                                    <div v-if="openIndex === `${sIdx}-${fIdx}`"
                                        class="px-5 pb-5 text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                                        {{ $rt(faq.a) }}
                                    </div>
                                </Transition>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Still Need Help CTA -->
        <section class="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
            <div class="container mx-auto px-4">
                <div class="max-w-2xl mx-auto text-center ">
                    <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <UIcon name="i-lucide-message-circle" class="w-8 h-8 text-primary" />
                    </div>
                    <h2 class="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                        {{ $t('help_page.still_help_title') }}
                    </h2>
                    <p class="text-muted-foreground mb-8 leading-relaxed">
                        {{ $t('help_page.still_help_desc') }}
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <NuxtLink :to="localePath('/contact')">
                            <UButton size="lg" class="gap-2 shadow-glow-accent px-8 font-semibold">
                                <UIcon name="i-lucide-mail" class="w-4 h-4" />
                                {{ $t('help_page.contact_btn') }}
                            </UButton>
                        </NuxtLink>
                        <a href="tel:+8801700000000">
                            <UButton variant="outline" size="lg" class="gap-2 px-8 font-semibold">
                                <UIcon name="i-lucide-phone" class="w-4 h-4" />
                                {{ $t('help_page.call_btn') }}
                            </UButton>
                        </a>
                    </div>
                </div>
            </div>
        </section>


    </div>
</template>

<style scoped>
.faq-enter-active,
.faq-leave-active {
    transition: all 0.25s ease;
    overflow: hidden;
}

.faq-enter-from,
.faq-leave-to {
    opacity: 0;
    max-height: 0;
}

.faq-enter-to,
.faq-leave-from {
    opacity: 1;
    max-height: 300px;
}
</style>
