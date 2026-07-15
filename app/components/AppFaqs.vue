<script setup lang="ts">
import { computed } from 'vue'

const runtimeConfig = useRuntimeConfig()
const apiBaseUrl = runtimeConfig.public.apiBaseUrl

// Fetch faqs from API
const { data: faqData } = await useFetch(`${apiBaseUrl}/faqs`)

const faqs = computed(() => {
    // @ts-ignore
    return faqData.value?.data || []
})

const accordionItems = computed(() => {
    return faqs.value.map(faq => ({
        label: faq.question_en,
        content: faq.answer_en
    }))
})

useHead({
    script: [
        {
            type: 'application/ld+json',
            children: computed(() => {
                const schema = {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": faqs.value.map(faq => ({
                        "@type": "Question",
                        "name": faq.question_en,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": faq.answer_en
                        }
                    }))
                }
                return JSON.stringify(schema)
            })
        }
    ]
})
</script>

<template>
    <section v-if="faqs.length > 0" class="section-padding bg-gray-50 relative overflow-hidden">
        <div class="container mx-auto px-4 relative z-10 max-w-4xl">
            <!-- Section Header -->
            <div class="section-header text-center">
                <span class="badge badge-primary mb-4 animate-fade-up inline-flex items-center gap-2">
                    <UIcon name="i-lucide-help-circle" class="w-4 h-4" />
                    FAQ
                </span>
                <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-up stagger-1">
                    Frequently Asked <span class="text-gradient">Questions</span>
                </h2>
                <p class="text-muted-foreground text-lg mb-8 animate-fade-up stagger-2">
                    Find answers to common questions about homeopathic treatment and our services.
                </p>
            </div>

            <div class="mt-8">
                <UAccordion :items="accordionItems">
                    <template #item="{ item }">
                        <p class="text-gray-600">{{ item.content }}</p>
                    </template>
                </UAccordion>
            </div>
        </div>
    </section>
</template>
