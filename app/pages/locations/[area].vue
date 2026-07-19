<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useDoctors } from '~/composables/useDoctors'
import type { Doctor } from '~/utils/doctors'

const route = useRoute()
const searchQuery = ref(route.query.search?.toString() || "")
const areaSlug = computed(() => route.params.area?.toString() || "")
const selectedDistrict = ref("1") // Dhaka
const selectedArea = ref("all")

const districtsData = ref<any[]>([])
const areasData = ref<any[]>([])

const { fetchDoctorsByArea, fetchDistricts, fetchAreas } = useDoctors()

const apiResponse = ref<any>(null)
const pending = ref(true)

const currentPage = ref(1)
const totalItems = computed(() => (apiResponse.value as any)?.data?.meta?.total || 0)
const perPage = computed(() => (apiResponse.value as any)?.data?.meta?.per_page || 12)

const { t, locale } = useI18n()
const localePath = useLocalePath()

const capitalize = (str: string) => str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
const displayAreaName = computed(() => {
    if (locale.value === 'bn') {
        const bnNames: Record<string, string> = {
            'mirpur': 'মিরপুর', 'uttara': 'উত্তরা', 'farmgate': 'ফার্মগেট',
            'dhanmondi': 'ধানমন্ডি', 'mohammadpur': 'মোহাম্মদপুর', 'bashundhara': 'বসুন্ধরা',
            'wari': 'ওয়ারী', 'banani': 'বনানী', 'gulshan': 'গুলশান',
            'badda': 'বাড্ডা', 'jatrabari': 'যাত্রাবাড়ী', 'malibagh': 'মালিবাগ'
        }
        return bnNames[areaSlug.value] || capitalize(areaSlug.value)
    }
    return capitalize(areaSlug.value)
})

const { data: ssrDistricts } = await useAsyncData('districts-list', () => fetchDistricts())
const { data: ssrDoctors } = await useAsyncData('initial-doctors-area-list', () => fetchDoctorsByArea(areaSlug.value, 1))

const rawDoctorsList = ref<any[]>([])

if (ssrDistricts.value?.data) {
    districtsData.value = Array.isArray(ssrDistricts.value.data) ? ssrDistricts.value.data : [ssrDistricts.value.data]
}
if (ssrDoctors.value) {
    apiResponse.value = ssrDoctors.value
    rawDoctorsList.value = Array.isArray(ssrDoctors.value.data) ? ssrDoctors.value.data : (ssrDoctors.value.data?.data || [])
    pending.value = false
}

const doctors = computed<Doctor[]>(() => {
    return rawDoctorsList.value.map((d: any) => ({
        id: String(d.id),
        slug: d.slug,
        name: d.name,
        name_bn: d.name_bn,
        specialty: d.specialty || '',
        specialty_bn: d.specialty_bn || '',
        hospital: d.chamber_name || "Chamber N/A",
        chamber_name: d.chamber_name,
        chamber_name_bn: d.chamber_name_bn,
        image: d.image,
        rating: Number(d.rating) || 0,
        reviews: Number(d.total_reviews) || 0,
        experience: d.experience ? `${d.experience}` : "",
        doctor_status: d.doctor_status,
        fee: `${d.consultation_fee} BDT`,
        degree_name: d.degree_name,
        degree_name_bn: d.degree_name_bn,
        location: 'bangladesh',
    }))
})

const selectedLocationName = computed(() => {
    return `${displayAreaName.value}, ${locale.value === 'bn' ? 'ঢাকা' : 'Dhaka'}`
})

const infoTitle = computed(() => {
    return t('doctors_page.title_location', { location: selectedLocationName.value })
})

const info = computed(() => ({
    title: infoTitle.value,
    description: t('doctors_page.description'),
    doctorCount: doctors.value.length || 0,
    hospitalCount: 0
}))

const filteredDoctors = computed(() => {
    return doctors.value;
})

const breadcrumbs = computed(() => {
    return [{ label: t('nav.doctors'), href: localePath('/doctors') }]
})

// SEO
const pageTitle = computed(() => locale.value === 'bn' 
    ? `${displayAreaName.value}, ঢাকার সেরা হোমিওপ্যাথিক ডাক্তার | HomeoDoctorsBD`
    : `Best Homeopathic Doctors in ${displayAreaName.value}, Dhaka | HomeoDoctorsBD`)
const pageDescription = computed(() => locale.value === 'bn'
    ? `${displayAreaName.value}, ঢাকার সেরা এবং ভেরিফাইড হোমিওপ্যাথিক ডাক্তার খুঁজুন ও অনলাইনে অ্যাপয়েন্টমেন্ট বুক করুন।`
    : `Find and book appointments with the top verified homeopathic doctors in ${displayAreaName.value}, Dhaka.`)

useSeoMeta({
    title: pageTitle,
    ogTitle: pageTitle,
    description: pageDescription,
    ogDescription: pageDescription,
    ogType: 'website',
    ogSiteName: 'HomeoDoctorsBD',
    twitterCard: 'summary_large_image',
    twitterTitle: pageTitle,
    twitterDescription: pageDescription,
})

useHead({
    link: [
        {
            rel: 'canonical',
            href: computed(() => `https://homeodoctorsbd.com/locations/${areaSlug.value}`)
        }
    ],
    meta: [
        { name: 'keywords', content: computed(() => `best homeopathic doctor in ${areaSlug.value}, homeopathic doctors ${areaSlug.value}, homeopathy dhaka, natural healing`) }
    ],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: computed(() => {
                const itemListElement = filteredDoctors.value.map((doc, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "item": {
                        "@type": "Physician",
                        "name": locale.value === 'bn' ? (doc.name_bn || doc.name) : doc.name,
                        "medicalSpecialty": locale.value === 'bn' ? (doc.specialty_bn || doc.specialty || "Homeopathy") : (doc.specialty || "Homeopathy"),
                        "image": doc.image,
                        "url": `https://homeodoctorsbd.com/doctor/${doc.slug}`,
                        "address": {
                            "@type": "PostalAddress",
                            "addressCountry": "BD"
                        }
                    }
                }))

                return JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ItemList",
                    "itemListElement": itemListElement
                })
            })
        }
    ]
})

const router = useRouter()
const clearFilters = () => {
    searchQuery.value = ""
    selectedDistrict.value = "1"
    selectedArea.value = "all"
}

const loadingMore = ref(false)
const loadMoreTarget = ref<HTMLElement | null>(null)

const loadDoctors = async (append = false) => {
    if (!append) pending.value = true

    try {
        const response = await fetchDoctorsByArea(areaSlug.value, currentPage.value)
        apiResponse.value = response
        const newDocs = Array.isArray(response?.data) ? response.data : (response?.data?.data || [])
        if (append) {
            rawDoctorsList.value = [...rawDoctorsList.value, ...newDocs]
        } else {
            rawDoctorsList.value = newDocs
        }
    } catch (e) {
        console.error(e)
    } finally {
        pending.value = false
        loadingMore.value = false
    }
}

const loadAreas = async (districtId: string | number) => {
    try {
        const response = await fetchAreas(districtId)
        if (response?.data?.area) {
            areasData.value = response.data.area
        } else if (Array.isArray(response?.data)) {
            areasData.value = response.data
        } else {
            areasData.value = []
        }
    } catch (e) {
        console.error(e)
        areasData.value = []
    }
}

watch(selectedDistrict, async (newVal) => {
    selectedArea.value = 'all'
    if (newVal !== 'all') {
        await loadAreas(newVal)
    } else {
        areasData.value = []
    }
    await loadDoctors()
})

watch(selectedArea, async () => {
    await loadDoctors()
})

let searchTimeout: any;
watch(searchQuery, (newVal) => {
    currentPage.value = 1
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
        loadDoctors()
    }, 500)
})

// Removed watch on currentPage, handled manually

// Initialize areas if district query is present on mount, though usually handled by filters.
onMounted(() => {
    if (selectedDistrict.value !== 'all') {
        loadAreas(selectedDistrict.value)
    }
    
    // Intersection Observer for infinite scrolling
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !pending.value && !loadingMore.value && currentPage.value < Math.ceil(totalItems.value / perPage.value)) {
            currentPage.value++
            loadingMore.value = true
            loadDoctors(true)
        }
    }, { rootMargin: '200px' })

    if (loadMoreTarget.value) {
        observer.observe(loadMoreTarget.value)
    }
})
</script>

<template>
    <main class="min-h-screen bg-background">
        <!-- SEO Optimized Area Hero Section -->
        <section class="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden bg-gradient-to-br from-primary/5 via-white to-accent/5">
            <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-accent/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
            
            <div class="container mx-auto px-4 relative z-10">
                <!-- Breadcrumbs -->
                <nav class="flex mb-8" aria-label="Breadcrumb">
                    <ol class="flex items-center space-x-2 text-sm text-muted-foreground">
                        <li><NuxtLink :to="localePath('/')" class="hover:text-primary transition-colors">{{ $t('nav.home') }}</NuxtLink></li>
                        <li><UIcon name="i-lucide-chevron-right" class="w-4 h-4 mx-1" /></li>
                        <li><NuxtLink :to="localePath('/doctors')" class="hover:text-primary transition-colors">{{ $t('nav.locations') }}</NuxtLink></li>
                        <li><UIcon name="i-lucide-chevron-right" class="w-4 h-4 mx-1" /></li>
                        <li class="font-medium text-primary" aria-current="page">{{ displayAreaName }}</li>
                    </ol>
                </nav>

                <div class="max-w-4xl mx-auto text-center">
                    
                    <h1 class="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">
                        {{ locale === 'bn' ? `${displayAreaName}, ঢাকার সেরা হোমিওপ্যাথিক ডাক্তার` : `Best Homeopathic Doctors in ${displayAreaName}, Dhaka` }}
                    </h1>
                    
                    <p class="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                        {{ locale === 'bn' 
                            ? `${displayAreaName} এলাকায় অভিজ্ঞ এবং ভেরিফাইড হোমিওপ্যাথিক চিকিৎসকদের তালিকা এখানে দেওয়া হলো। দীর্ঘমেয়াদী এবং জটিল রোগের পার্শ্বপ্রতিক্রিয়াহীন, প্রাকৃতিক নিরাময়ের জন্য এখনই আপনার কাছের সেরা ডাক্তারের সিরিয়াল বুক করুন।`
                            : `Explore the top-rated and verified homeopathic doctors practicing in ${displayAreaName}, Dhaka. Book an appointment today for safe, natural, and holistic treatment of chronic and acute diseases without side effects.` 
                        }}
                    </p>

                    <div class="flex flex-wrap justify-center gap-4 md:gap-8">
                        <div class="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <UIcon name="i-lucide-shield-check" class="w-5 h-5" />
                            </div>
                            <div class="text-left">
                                <p class="text-2xl font-bold text-gray-900 leading-none">{{ info.doctorCount }}+</p>
                                <p class="text-sm font-medium text-gray-500">{{ $t('doctors_page.verified_doctors') }}</p>
                            </div>
                        </div>
                        <div class="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                <UIcon name="i-lucide-map-pin" class="w-5 h-5" />
                            </div>
                            <div class="text-left">
                                <p class="text-2xl font-bold text-gray-900 leading-none">{{ displayAreaName }}</p>
                                <p class="text-sm font-medium text-gray-500">{{ locale === 'bn' ? 'ঢাকা' : 'Dhaka' }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-padding bg-muted/30">
            <div class="container mx-auto px-4">
                
                <div class="flex items-center justify-between mb-8">
                    <p class="text-muted-foreground">
                        {{ $t('doctors_page.showing') }} <span class="font-semibold text-foreground">{{ filteredDoctors.length }}</span> {{ $t('doctors_page.doctors_count') }} {{ locale === 'bn' ? `(${displayAreaName})` : `in ${displayAreaName}` }}
                    </p>
                </div>

                <div v-if="pending" class="grid lg:grid-cols-2 gap-6 lg:gap-8">
                    <DoctorCardSkeleton v-for="i in 6" :key="i" />
                </div>

                <div v-else-if="filteredDoctors.length > 0">
                    <div class="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-10">
                        <DoctorCard v-for="(doctor, index) in filteredDoctors" :key="doctor.id" v-bind="doctor"
                            :index="index" />
                    </div>
                    
                    <!-- Infinite Scroll Target -->
                    <div ref="loadMoreTarget" class="h-10 w-full flex justify-center items-center mt-8">
                        <UIcon v-if="loadingMore" name="i-lucide-loader-2" class="animate-spin w-8 h-8 text-primary" />
                    </div>
                </div>

                <div v-else class="text-center py-16">
                    <div class="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                        <UIcon name="i-lucide-search" class="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 class="font-display text-xl font-semibold text-foreground mb-2">{{ $t('doctors_page.no_doctors_found') }}</h3>
                    <p class="text-muted-foreground mb-6">{{ $t('doctors_page.try_adjusting') }}</p>
                    <button @click="clearFilters"
                        class="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium">
                        {{ $t('doctors_page.clear_filters') }}
                    </button>
                </div>
            </div>
        </section>
    </main>
</template>
