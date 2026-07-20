<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDoctors } from '~/composables/useDoctors'
import userImg from '~/assets/images/user.webp'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const slug = computed(() => {
    const s = route.params.slug;
    return Array.isArray(s) ? s[0] : s;
})
const { fetchDoctor } = useDoctors()

const { data: apiResponse, pending, error } = await fetchDoctor(slug)
const doctor = computed(() => {
    return (apiResponse.value as any)?.data || null
})

const isAvailableToday = computed(() => {
    return doctor.value && doctor.value.doctor_status === 'Active'
})

// Extract properties
const qualifications = computed(() => {
    if (!doctor.value?.educations) return []
    return doctor.value.educations.map((e: any) => locale.value === 'bn' ? (e.degree_bn || e.degree_en) : e.degree_en)
})

const activeChamber = computed(() => {
    if (!doctor.value?.chambers || doctor.value.chambers.length === 0) return null
    return doctor.value.chambers[0]
})

const doctorSpecialties = computed(() => {
    if (doctor.value?.specialties?.length) {
        return doctor.value.specialties.map((s: any) => locale.value === 'bn' ? (s.name_bn || s.name_en) : s.name_en).join(', ')
    }
    return locale.value === 'bn' ? (doctor.value?.specialty_bn || doctor.value?.specialty || '') : (doctor.value?.specialty || '')
})

const pageTitle = computed(() => {
    if (!doctor.value) return t('doctor_profile.not_found_title')
    if (doctor.value.meta_title) return doctor.value.meta_title
    return `${locale.value === 'bn' ? (doctor.value.name_bn || doctor.value.name_en) : doctor.value.name_en} | HomeoDoctorsBD`
})

const pageDescription = computed(() => {
    if (!doctor.value) return t('doctor_profile.not_found_desc')
    if (doctor.value.meta_description) return doctor.value.meta_description
    return `View the profile of ${locale.value === 'bn' ? (doctor.value.name_bn || doctor.value.name_en) : doctor.value.name_en}${doctorSpecialties.value ? `, ${doctorSpecialties.value} specialist` : ''}.`
})

useSeoMeta({
    title: pageTitle,
    ogTitle: pageTitle,
    description: pageDescription,
    ogDescription: pageDescription,
    ogImage: computed(() => doctor.value?.image || 'https://homeodoctorsbd.com/default-og-image.jpg'),
    twitterCard: 'summary_large_image',
    twitterTitle: pageTitle,
    twitterDescription: pageDescription,
    twitterImage: computed(() => doctor.value?.image || 'https://homeodoctorsbd.com/default-og-image.jpg'),
})

useHead({
    script: [
        {
            type: 'application/ld+json',
            children: computed(() => {
                if (!doctor.value) return ''
                const schema = {
                    "@context": "https://schema.org",
                    "@type": "Physician",
                    "name": locale.value === 'bn' ? (doctor.value.name_bn || doctor.value.name_en) : doctor.value.name_en,
                    "image": doctor.value.image,
                    "medicalSpecialty": doctor.value.specialties?.map((s: any) => locale.value === 'bn' ? (s.name_bn || s.name_en) : s.name_en) || doctor.value.specialty,
                    "description": pageDescription.value,
                    "priceRange": `৳${doctor.value.consultation_fee}`
                }
                return JSON.stringify(schema)
            })
        }
    ]
})
const scrollToChambers = () => {
    const el = document.getElementById('chambers-section')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div>
    <div v-if="pending" class="min-h-screen bg-background flex flex-col">
        <!-- Hero Skeleton -->
        <section class="relative bg-gradient-hero-subtle pt-28 pb-8 lg:pt-32 lg:pb-12">
            <div class="container mx-auto px-4 pt-2 pb-8 relative z-10">
                <USkeleton class="h-4 w-48 mb-6" />
                <div class="card-premium p-6 md:p-8">
                    <div class="flex flex-col md:flex-row gap-6">
                        <USkeleton class="w-40 h-40 md:w-48 md:h-48 rounded-2xl flex-shrink-0" />
                        <div class="flex-1 space-y-4 py-2">
                            <USkeleton class="h-6 w-24 rounded-full" />
                            <USkeleton class="h-8 w-64" />
                            <USkeleton class="h-4 w-48" />
                            <USkeleton class="h-4 w-32" />
                            <div class="flex gap-4 mt-6">
                                <USkeleton class="h-10 w-24 rounded-xl" />
                                <USkeleton class="h-10 w-24 rounded-xl" />
                                <USkeleton class="h-10 w-24 rounded-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Details Skeleton -->
        <section class="pb-10 bg-background flex-grow">
            <div class="container mx-auto px-4">
                <div class="grid lg:grid-cols-3 gap-8">
                    <div class="lg:col-span-2 space-y-8">
                        <div class="card-premium p-6 space-y-4">
                            <USkeleton class="h-6 w-32 mb-4" />
                            <USkeleton class="h-4 w-full" />
                            <USkeleton class="h-4 w-full" />
                            <USkeleton class="h-4 w-3/4" />
                        </div>
                        <div class="card-premium p-6 space-y-4">
                            <USkeleton class="h-6 w-32 mb-4" />
                            <div class="flex gap-3">
                                <USkeleton class="h-10 w-24 rounded-xl" />
                                <USkeleton class="h-10 w-32 rounded-xl" />
                            </div>
                        </div>
                    </div>
                    <div class="lg:col-span-1">
                        <USkeleton class="h-6 w-48 mb-4" />
                        <USkeleton class="h-48 w-full rounded-2xl" />
                    </div>
                </div>
            </div>
        </section>
    </div>

    <div v-else-if="!doctor" class="min-h-screen bg-background flex items-center justify-center">
        <div class="text-center">
            <h1 class="text-3xl font-bold text-foreground mb-4">{{ $t('doctor_profile.not_found_title') }}</h1>
            <p class="text-muted-foreground mb-6">{{ $t('doctor_profile.not_found_desc') }}</p>
            <NuxtLink :to="localePath('/doctors')">
                <UButton>{{ $t('doctor_profile.browse_doctors') }}</UButton>
            </NuxtLink>
        </div>
    </div>

    <main v-else class="min-h-screen bg-background">
        <!-- Hero Section -->
        <section class="relative bg-gradient-hero-subtle overflow-hidden pt-28 pb-8 lg:pt-32 lg:pb-12">
            <div
                class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_50%)]" />

            <div class="container mx-auto px-4 pt-2 pb-8 relative z-10">
                <!-- Breadcrumb -->
                <nav class="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <NuxtLink :to="localePath('/')" class="hover:text-primary transition-colors">{{ $t('nav.home') }}</NuxtLink>
                    <span>/</span>
                    <NuxtLink :to="localePath('/doctors')" class="hover:text-primary transition-colors capitalize">
                        {{ $t('nav.doctors') }}
                    </NuxtLink>
                    <span>/</span>
                    <span class="text-foreground">{{ locale === 'bn' ? (doctor.name_bn || doctor.name_en) : doctor.name_en }}</span>
                </nav>

                <NuxtLink :to="localePath('/doctors')"
                    class="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6">
                    <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
                    {{ $t('doctor_profile.back_to_doctors') }}
                </NuxtLink>

                <!-- Doctor Info Card - Full Width -->
                <div class="card-premium p-6 md:p-8">
                    <div class="flex flex-col md:flex-row gap-6">
                        <!-- Image -->
                        <div class="relative flex-shrink-0 w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-soft border border-border/50">
                            <img :src="doctor.image || userImg" @error="(e) => e.target.src = userImg"
                                :alt="doctor.name_en" class="w-full h-full object-cover" />
                        </div>

                        <!-- Details -->
                        <div class="flex-1">
                            <div class="flex items-start justify-between mb-3">
                                <div>
                                    <span v-if="doctor.specialties?.length"
                                        class="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-lg text-xs font-semibold mb-2">
                                        {{doctor.specialties.map((s: any) => locale === 'bn' ? (s.name_bn || s.name_en) : s.name_en).join(', ')}}
                                    </span>
                                    <span v-else-if="doctor.specialty"
                                        class="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-lg text-xs font-semibold mb-2">
                                        {{ locale === 'bn' ? (doctor.specialty_bn || doctor.specialty) : doctor.specialty }}
                                    </span>
                                    <div class="flex flex-wrap items-center gap-2 mb-1">
                                        <h1 class="font-display text-2xl md:text-3xl font-bold text-foreground">
                                            {{ locale === 'bn' ? (doctor.name_bn || doctor.name_en) : doctor.name_en }}
                                        </h1>
                                        <div class="bg-primary/10 text-primary px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm border border-primary/20">
                                            <UIcon name="i-lucide-shield-check" class="w-4 h-4" />
                                            {{ $t('doctor_profile.verified') }}
                                        </div>
                                    </div>
                                    <div v-if="activeChamber" class="flex items-center gap-1.5 text-foreground font-medium mb-1.5">
                                        <UIcon name="i-lucide-building-2" class="w-4 h-4 text-primary shrink-0" />
                                        <span class="line-clamp-1">{{ locale === 'bn' ? (activeChamber.name_bn || activeChamber.name_en) : activeChamber.name_en }}</span>
                                    </div>
                                    <p v-if="qualifications.length > 0" class="text-muted-foreground text-sm flex items-start gap-1.5">
                                        <UIcon name="i-lucide-graduation-cap" class="w-4 h-4 shrink-0 mt-0.5" />
                                        <span class="leading-tight">{{ qualifications[0] }}</span>
                                    </p>
                                </div>
                            </div>

                            <div class="flex items-center gap-4 mb-4">
                                <div class="px-3 py-1.5 rounded-xl text-sm font-semibold flex items-center gap-1.5"
                                    :class="isAvailableToday
                                        ? 'bg-blue-500/10 text-blue-600'
                                        : 'bg-muted text-muted-foreground'">
                                    <UIcon name="i-lucide-clock" class="w-4 h-4" />
                                    {{ isAvailableToday ? $t('doctor_profile.active') : $t('doctor_profile.unavailable') }}
                                </div>
                            </div>

                            <div class="flex flex-wrap gap-x-6 gap-y-3 mb-4">
                                <div class="flex items-center gap-2 text-muted-foreground">
                                    <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                                    <span class="text-sm">{{ doctor.experience || 0 }} {{ $t('doctor_profile.years_exp') }}</span>
                                </div>
                                <div class="flex items-center gap-2 text-muted-foreground">
                                    <UIcon name="i-lucide-users" class="w-4 h-4" />
                                    <span class="text-sm">{{ doctor.total_patients_seen || 0 }}+ {{ $t('doctor_profile.patients') }}</span>
                                </div>
                                <div class="flex items-center gap-2 text-muted-foreground">
                                    <UIcon name="i-lucide-thumbs-up" class="w-4 h-4" />
                                    <span class="text-sm">{{ doctor.success_rate || 0 }}% {{ $t('doctor_profile.success') }}</span>
                                </div>
                            </div>

                            <div class="flex items-center gap-4 pt-4 border-t border-border">
                                <span class="text-2xl font-bold text-primary">৳{{ doctor.consultation_fee }}</span>
                                <span class="text-muted-foreground">{{ $t('doctor_profile.per_consultation') }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Details Section -->
        <section class="pb-10 bg-background">
            <div class="container mx-auto px-4">
                <div class="grid lg:grid-cols-3 gap-8">
                    <!-- Left Column: Details -->
                    <div class="lg:col-span-2 space-y-8">
                        <!-- About -->
                        <div class="card-premium p-6">
                            <h2 class="font-display font-bold text-xl text-foreground mb-4 flex items-center gap-2">
                                <UIcon name="i-lucide-award" class="w-5 h-5 text-primary" />
                                {{ $t('doctor_profile.about') }}
                            </h2>
                            <p class="text-muted-foreground leading-relaxed" v-html="locale === 'bn' ? (doctor.about_bn || doctor.about_en || `${doctor.name_bn || doctor.name_en} is a highly experienced ${doctor.specialty} specialist.`) : (doctor.about_en || `${doctor.name_en} is a highly experienced ${doctor.specialty} specialist.`)">
                            </p>
                        </div>

                        <!-- Services -->
                        <div class="card-premium p-6" v-if="doctor.services && doctor.services.length > 0">
                            <h2 class="font-display font-bold text-xl text-foreground mb-4">
                                {{ $t('doctor_profile.services') }}
                            </h2>
                            <div class="flex flex-wrap gap-3">
                                <div v-for="(service, idx) in doctor.services" :key="idx"
                                    class="bg-secondary/50 text-secondary-foreground px-4 py-2.5 rounded-xl text-sm font-medium text-center">
                                    {{ locale === 'bn' ? (service.service_name_bn || service.service_name_en) : service.service_name_en }}
                                </div>
                            </div>
                        </div>

                        <!-- Experience -->
                        <div class="card-premium p-6" v-if="doctor.experiences && doctor.experiences.length > 0">
                            <h2 class="font-display font-bold text-xl text-foreground mb-4 flex items-center gap-2">
                                <UIcon name="i-lucide-briefcase" class="w-5 h-5 text-primary" />
                                {{ $t('doctor_profile.experience') }}
                            </h2>
                            <div class="space-y-4">
                                <div v-for="(exp, idx) in doctor.experiences" :key="idx"
                                    class="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
                                    <div
                                        class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <UIcon name="i-lucide-briefcase" class="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-foreground">{{ locale === 'bn' ? (exp.designation_bn || exp.designation_en) : exp.designation_en }}</h4>
                                        <p class="text-sm text-muted-foreground">{{ locale === 'bn' ? (exp.company_name_bn || exp.company_name_en) : exp.company_name_en }}</p>
                                        <p class="text-xs text-muted-foreground mt-1" v-if="exp.employment_period_en">{{
                                            locale === 'bn' ? (exp.employment_period_bn || exp.employment_period_en) : exp.employment_period_en }}</p>
                                        <p class="text-xs text-muted-foreground mt-2" v-if="exp.description_en">{{
                                            locale === 'bn' ? (exp.description_bn || exp.description_en) : exp.description_en }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Education -->
                        <div class="card-premium p-6">
                            <h2 class="font-display font-bold text-xl text-foreground mb-4 flex items-center gap-2">
                                <UIcon name="i-lucide-graduation-cap" class="w-5 h-5 text-primary" />
                                {{ $t('doctor_profile.education') }}
                            </h2>
                            <div class="space-y-4">
                                <div v-for="(edu, idx) in doctor.educations" :key="idx"
                                    class="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
                                    <div
                                        class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <UIcon name="i-lucide-graduation-cap" class="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-foreground">{{ locale === 'bn' ? (edu.degree_bn || edu.degree_en) : edu.degree_en }}</h4>
                                        <p class="text-sm text-muted-foreground">{{ locale === 'bn' ? (edu.institution_bn || edu.institution_en) : edu.institution_en }}</p>
                                        <p class="text-xs text-muted-foreground mt-1" v-if="edu.passing_year">{{
                                            edu.passing_year }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Reviews (commented out)
                        <div class="card-premium p-6">
                            <div class="flex items-center justify-between mb-6">
                                <h2 class="font-display font-bold text-xl text-foreground">Patient Reviews</h2>
                                <div class="flex items-center gap-2">
                                    <UIcon name="i-lucide-star" class="w-5 h-5 text-accent" />
                                    <span class="font-bold text-lg">{{ doctor.rating }}</span>
                                    <span class="text-muted-foreground">({{ doctor.reviews }} reviews)</span>
                                </div>
                            </div>
                            <div class="space-y-4" v-if="doctor.reviews && doctor.reviews.length > 0">
                                <div v-for="(review, idx) in doctor.reviews.slice(0, 5)" :key="idx"
                                    class="p-4 bg-muted/30 rounded-xl">
                                    <div class="flex items-center justify-between mb-2">
                                        <div class="flex items-center gap-3">
                                            <div
                                                class="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                                <span class="font-semibold text-primary">{{
                                                    review.patient_name.charAt(0) }}</span>
                                            </div>
                                            <div>
                                                <p class="font-medium text-foreground">{{ review.patient_name }}</p>
                                                <p class="text-xs text-muted-foreground">{{ new
                                                    Date(review.created_at).toLocaleDateString() }}</p>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-0.5">
                                            <UIcon v-for="i in 5" :key="i" name="i-lucide-star" class="w-4 h-4"
                                                :class="i <= review.rating ? 'text-accent' : 'text-gray-300 dark:text-gray-600'" />
                                        </div>
                                    </div>
                                    <p class="text-muted-foreground text-sm">{{ review.review }}</p>
                                </div>
                            </div>
                            <div v-else class="text-center py-6 text-muted-foreground">No reviews found.</div>
                            <UButton variant="outline" block class="w-full mt-4">View All Reviews</UButton>
                        </div>
                        -->
                    </div>

                    <!-- Right Column: ONLY Chambers -->
                    <div id="chambers-section" class="lg:col-span-1">
                        <div class="space-y-4">
                            <h3 class="font-display font-bold text-lg text-foreground flex items-center gap-2">
                                <UIcon name="i-lucide-building-2" class="w-5 h-5 text-primary" />
                                {{ $t('doctor_profile.chambers_locations') }}
                            </h3>

                            <template v-if="doctor.chambers && doctor.chambers.length > 0">
                                <div v-for="(chamber, idx) in doctor.chambers" :key="idx"
                                    class="bg-background/95 backdrop-blur-sm rounded-2xl p-5 border-2 border-primary/20 hover:border-primary/60 transition-all shadow-lg group flex flex-col">

                                    <!-- Chamber Name -->
                                    <div class="flex items-start gap-3 mb-4">
                                        <div
                                            class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <UIcon name="i-lucide-hospital" class="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 class="font-bold text-foreground text-base leading-tight">{{
                                                locale === 'bn' ? (chamber.name_bn || chamber.name_en) : chamber.name_en }}</h4>
                                            <div class="flex items-start gap-1 mt-1.5 text-muted-foreground">
                                                <UIcon name="i-lucide-map-pin"
                                                    class="w-4 h-4 mt-0.5 flex-shrink-0 text-primary/70" />
                                                <p class="text-xs leading-relaxed font-medium">{{ locale === 'bn' ? (chamber.address_bn || chamber.address_en) : chamber.address_en }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Visiting Hours -->
                                    <div class="bg-primary/5 rounded-xl p-3 border border-primary/10 mb-5"
                                        v-if="chamber.visiting_hour_en || chamber.visiting_hour_bn">
                                        <div class="flex items-center gap-2 mb-1">
                                            <UIcon name="i-lucide-clock" class="w-4 h-4 text-primary" />
                                            <span
                                                class="text-xs font-bold text-primary uppercase tracking-wider">{{ $t('doctor_profile.visiting_hours') }}</span>
                                        </div>
                                        <p class="text-sm font-semibold text-foreground ml-6">{{
                                            locale === 'bn' ? (chamber.visiting_hour_bn || chamber.visiting_hour_en) : chamber.visiting_hour_en }}</p>
                                    </div>

                                    <!-- Contact Numbers -->
                                    <div class="mb-5"
                                        v-if="chamber.contact_numbers || chamber.contact_number_en || chamber.appointment_number_en || chamber.appointment_number_bn">
                                        <p
                                            class="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                                            <UIcon name="i-lucide-phone-incoming" class="w-4 h-4" /> {{ $t('doctor_profile.appointments') }}
                                        </p>
                                        <ul class="space-y-2 ml-6">
                                            <li v-for="(num, numIdx) in (chamber.contact_numbers || chamber.appointment_number_bn || chamber.contact_number_en || chamber.appointment_number_en).split(',')"
                                                :key="numIdx"
                                                class="flex items-center gap-2 text-sm text-foreground font-bold">
                                                <div class="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                                                {{ num.trim() }}
                                            </li>
                                        </ul>
                                    </div>

                                    <!-- Hotline Button -->
                                    <div class="flex flex-col gap-3 mt-auto pt-2">
                                        <a v-if="chamber.hotline_number || chamber.hotline_number_en || chamber.hotline_number_bn"
                                            :href="`tel:${chamber.hotline_number || chamber.hotline_number_bn || chamber.hotline_number_en}`"
                                            class="block w-full">
                                            <UButton block size="lg"
                                                class="w-full justify-center shadow-lg font-bold text-sm tracking-wide bg-primary hover:bg-primary/90 text-primary-foreground">
                                                <UIcon name="i-lucide-phone-call" class="w-5 h-5 mr-1.5" />
                                                {{ $t('doctor_profile.hotline') }}: {{ chamber.hotline_number || chamber.hotline_number_bn || chamber.hotline_number_en }}
                                            </UButton>
                                        </a>
                                        <a v-if="chamber.map_link" :href="chamber.map_link" target="_blank"
                                            class="block w-full">
                                            <UButton block size="md" variant="soft" color="neutral"
                                                icon="i-lucide-navigation"
                                                class="w-full justify-center font-semibold border border-border hover:border-primary/40 hover:bg-primary/5">
                                                {{ $t('doctor_profile.get_directions') }}
                                            </UButton>
                                        </a>
                                    </div>
                                </div>
                            </template>
                            <div v-else
                                class="text-muted-foreground text-sm p-6 border-2 border-dashed border-border/50 rounded-2xl bg-muted/10 text-center font-medium">
                                {{ $t('doctor_profile.no_chambers') }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->


        <!-- Mobile Bottom Strip -->
        <div
            class="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/90 backdrop-blur-lg border-t border-border/60 safe-bottom">
            <div class="flex items-center justify-around py-2 px-2 max-w-md mx-auto">
                <button @click="scrollToChambers"
                    class="flex flex-col items-center gap-0.5 text-primary active:scale-90 transition-transform px-3">
                    <UIcon name="i-lucide-building-2" class="w-5 h-5" />
                    <span class="text-[10px] font-semibold">{{ $t('doctor_profile.chambers') }}</span>
                </button>
                <a v-if="activeChamber && (activeChamber.hotline_number || activeChamber.hotline_number_en || activeChamber.hotline_number_bn)"
                    :href="`tel:${activeChamber.hotline_number || activeChamber.hotline_number_bn || activeChamber.hotline_number_en}`"
                    class="flex flex-col items-center gap-0.5 text-primary active:scale-90 transition-transform px-3">
                    <UIcon name="i-lucide-phone-call" class="w-5 h-5" />
                    <span class="text-[10px] font-semibold">Hotline</span>
                </a>
                <a v-if="activeChamber?.map_link" :href="activeChamber.map_link" target="_blank"
                    class="flex flex-col items-center gap-0.5 text-muted-foreground active:scale-90 transition-transform px-3">
                    <UIcon name="i-lucide-navigation" class="w-5 h-5" />
                    <span class="text-[10px] font-semibold">{{ $t('doctor_profile.directions') }}</span>
                </a>
            </div>
        </div>

    </main>
  </div>
</template>

<style scoped>
.safe-bottom {
    padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
}
</style>
