<script setup lang="ts">
import { computed, ref } from 'vue'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const runtimeConfig = useRuntimeConfig()
const apiBaseUrl = runtimeConfig.public.apiBaseUrl

// Fetch faqs from API
const { data: faqData } = await useFetch(`${apiBaseUrl}/faqs`)

const faqs = computed(() => {
    // @ts-ignore
    return faqData.value?.data || []
})

const activeIndex = ref<number | null>(0)

const toggleFaq = (index: number) => {
    activeIndex.value = activeIndex.value === index ? null : index
}

const getFaqField = (faq: any, field: string) => {
    return faq[`${field}_${locale.value}`] || faq[`${field}_en`]
}

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
                        "name": getFaqField(faq, 'question'),
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": getFaqField(faq, 'answer')
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
        <!-- Background Elements -->
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div class="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] rounded-full bg-primary/5 blur-[100px]"></div>
            <div class="absolute bottom-[-10%] left-[-5%] w-[30rem] h-[30rem] rounded-full bg-blue-400/5 blur-[80px]"></div>
        </div>

        <div class="container mx-auto px-4 relative z-10 max-w-4xl">
            <!-- Section Header -->
            <div class="section-header text-center mb-12">
                <span class="badge badge-primary mb-4 animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm border border-primary/20 shadow-sm">
                    <UIcon name="i-lucide-help-circle" class="w-4 h-4" />
                    {{ $t('common.faq') }}
                </span>
                <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-up stagger-1">
                    {{ $t('common.frequently_asked_questions') }}
                </h2>
                <p class="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-up stagger-2">
                    {{ $t('common.faq_desc') }}
                </p>
            </div>

            <!-- Custom Premium Accordion -->
            <div class="max-w-3xl mx-auto space-y-4 animate-fade-up stagger-3">
                <div v-for="(faq, index) in faqs" :key="index"
                     class="group border border-gray-200/60 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                     :class="{ 'ring-1 ring-primary/30 shadow-lg shadow-primary/5': activeIndex === index }">
                    <button @click="toggleFaq(index)"
                            class="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors duration-300"
                            :class="activeIndex === index ? 'bg-primary/[0.03]' : 'hover:bg-gray-50'">
                        <div class="flex items-center gap-4 sm:gap-5">
                            <div class="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl font-display font-bold text-lg transition-all duration-300"
                                 :class="activeIndex === index ? 'bg-primary text-white shadow-md shadow-primary/30 scale-105' : 'bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary'">
                                {{ String(index + 1).padStart(2, '0') }}
                            </div>
                            <h3 class="text-base sm:text-lg lg:text-xl font-semibold transition-colors duration-300 pr-4"
                                :class="activeIndex === index ? 'text-primary' : 'text-gray-800'">
                                {{ getFaqField(faq, 'question') }}
                            </h3>
                        </div>
                        <div class="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full transition-colors duration-300 border"
                             :class="activeIndex === index ? 'bg-primary/10 text-primary border-primary/20' : 'bg-gray-50 text-gray-400 border-gray-200 group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/20'">
                            <UIcon name="i-heroicons-plus-20-solid"
                                   class="w-5 h-5 transform transition-transform duration-500"
                                   :class="activeIndex === index ? 'rotate-45 text-primary' : 'text-gray-500 group-hover:text-primary'" />
                        </div>
                    </button>
                    
                    <div class="grid transition-all duration-500 ease-in-out"
                         :style="{ gridTemplateRows: activeIndex === index ? '1fr' : '0fr' }">
                        <div class="overflow-hidden">
                            <div class="pb-6 px-5 sm:px-6 pt-2">
                                <div class="pl-14 sm:pl-17">
                                    <div class="w-full h-px bg-gradient-to-r from-gray-100 to-transparent mb-4"></div>
                                    <p class="text-gray-600 leading-relaxed text-sm sm:text-base">
                                        {{ getFaqField(faq, 'answer') }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mt-12 text-center animate-fade-up stagger-4">
                <p class="text-gray-500 mb-4">{{ $t('common.still_have_questions') }}</p>
                <NuxtLink :to="localePath('/contact')" class="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full font-medium text-primary hover:bg-gray-50 hover:text-primary-600 hover:shadow-md transition-all duration-300">
                    <UIcon name="i-lucide-message-circle" class="w-5 h-5" />
                    {{ $t('common.contact_support') }}
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
