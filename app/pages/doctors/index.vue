<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useDoctors } from '~/composables/useDoctors'
import type { Doctor } from '~/utils/doctors'

const searchQuery = ref("")
const selectedDistrict = ref("all")
const selectedArea = ref("all")

const districtsData = ref<any[]>([])
const areasData = ref<any[]>([])

const { fetchAllDoctors, fetchDistricts, fetchAreas } = useDoctors()

const apiResponse = ref<any>(null)
const pending = ref(true)

const doctors = computed<Doctor[]>(() => {
    const responseData = (apiResponse.value as any)?.data
    const rawDoctors = Array.isArray(responseData) ? responseData : (responseData?.data || [])
    return rawDoctors.map((d: any) => ({
        id: String(d.id),
        slug: d.slug,
        name: d.name,
        specialty: d.specialty || '',
        hospital: d.chamber_name || "Chamber N/A",
        chamber_name: d.chamber_name,
        image: d.image,
        rating: Number(d.rating) || 0,
        reviews: Number(d.total_reviews) || 0,
        experience: d.experience ? `${d.experience} Years` : "",
        doctor_status: d.doctor_status,
        fee: `${d.consultation_fee} BDT`,
        degree_name: d.degree_name,
        location: 'bangladesh',
    }))
})

const selectedLocationName = computed(() => {
    let districtName = ""
    let areaName = ""

    if (selectedDistrict.value !== "all") {
        const district = districtsData.value.find(d => d.id == selectedDistrict.value)
        if (district) districtName = district.name_en || district.name
    }

    if (selectedArea.value !== "all") {
        const area = areasData.value.find(a => a.id == selectedArea.value)
        if (area) areaName = area.name_en || area.name
    }

    if (areaName && districtName) return `in ${areaName}, ${districtName}`
    if (districtName) return `in ${districtName}`
    return "in Bangladesh"
})

const infoTitle = computed(() => `Best Homeopathic Doctors ${selectedLocationName.value}`)

const info = computed(() => ({
    title: infoTitle.value,
    description: "Find and book appointments with the most experienced homeopathic doctors across Bangladesh. Natural healing through holistic treatment.",
    doctorCount: doctors.value.length || 0,
    hospitalCount: 0
}))

const filteredDoctors = computed(() => {
    return doctors.value;
})

const breadcrumbs = computed(() => {
    return [{ label: "Doctors", href: "/doctors" }]
})

// SEO
useHead({
    title: computed(() => `Find Doctors | HomeoDoctorsBD`),
    meta: [
        { name: 'description', content: info.value.description },
        { name: 'keywords', content: `homeopathy, homeopathic doctors, bangladesh, natural healing` }
    ]
})

const clearFilters = () => {
    searchQuery.value = ""
    selectedDistrict.value = "all"
    selectedArea.value = "all"
}

const loadDoctors = async () => {
    pending.value = true
    const params: any = {}
    if (searchQuery.value) params.search = searchQuery.value
    if (selectedDistrict.value !== 'all') params.district_id = selectedDistrict.value
    if (selectedArea.value !== 'all') params.area_id = selectedArea.value

    const { data } = await fetchAllDoctors(params)
    apiResponse.value = data.value
    pending.value = false
}

const loadDistricts = async () => {
    const { data } = await fetchDistricts()
    if (Array.isArray((data.value as any)?.data)) {
        districtsData.value = (data.value as any).data
    } else if ((data.value as any)?.data) {
        districtsData.value = [(data.value as any).data]
    }
}

const loadAreas = async (districtId: string | number) => {
    const { data } = await fetchAreas(districtId)
    // Map the nested list correctly given the response format
    if ((data.value as any)?.data?.area) {
        areasData.value = (data.value as any).data.area
    } else if (Array.isArray((data.value as any)?.data)) {
        areasData.value = (data.value as any).data
    } else {
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
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
        loadDoctors()
    }, 500)
})

onMounted(async () => {
    await loadDistricts()
    await loadDoctors()
})
</script>

<template>
    <div class="min-h-screen bg-background">
        <PageHeader :title="info.title" :description="info.description" :breadcrumbs="breadcrumbs" :stats="[
            { label: 'Verified Doctors', value: `${info.doctorCount}` }
        ]" />

        <!-- Filters Section -->
        <section class="py-8 border-b border-border bg-card/50">
            <div class="container mx-auto px-4">
                <div class="flex flex-col gap-4">
                    <!-- Search and District Filter Row -->
                    <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        <!-- Search -->
                        <div class="relative flex-1 w-full max-w-md">
                            <UIcon name="i-lucide-search"
                                class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                            <input type="text" placeholder="Search by name, specialty..." v-model="searchQuery"
                                class="w-full h-12 pl-12 pr-4 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all" />
                        </div>

                        <!-- District Filter -->
                        <div class="w-full sm:w-48">
                            <div class="relative">
                                <UIcon name="i-lucide-map-pin"
                                    class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                                <select v-model="selectedDistrict"
                                    class="w-full h-12 pl-10 pr-4 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 appearance-none cursor-pointer">
                                    <option value="all">All Districts</option>
                                    <option v-for="district in districtsData" :key="district.id" :value="district.id">
                                        {{ district.name_en }}
                                    </option>
                                </select>
                                <UIcon name="i-lucide-chevron-down"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            </div>
                        </div>

                        <!-- Area Filter -->
                        <div class="w-full sm:w-48" v-if="selectedDistrict !== 'all' && areasData.length > 0">
                            <div class="relative">
                                <UIcon name="i-lucide-map"
                                    class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                                <select v-model="selectedArea"
                                    class="w-full h-12 pl-10 pr-4 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 appearance-none cursor-pointer">
                                    <option value="all">All Areas</option>
                                    <option v-for="area in areasData" :key="area.id" :value="area.id">
                                        {{ area.name_en }}
                                    </option>
                                </select>
                                <UIcon name="i-lucide-chevron-down"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <!-- Specialty Filter -->
                    <!-- <div class="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                        <UIcon name="i-lucide-sliders-horizontal" class="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        <button v-for="specialty in specialties.slice(0, 6)" :key="specialty"
                            @click="selectedSpecialty = specialty"
                            class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all" :class="selectedSpecialty === specialty
                                ? 'bg-primary text-primary-foreground shadow-soft'
                                : 'bg-muted hover:bg-muted/80 text-foreground'">
                            {{ specialty === 'all' ? 'All Specialties' : specialty }}
                        </button>
                    </div> -->
                </div>
            </div>
        </section>

        <section class="section-padding bg-muted/30">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between mb-8">
                    <p class="text-muted-foreground">
                        Showing <span class="font-semibold text-foreground">{{ filteredDoctors.length }}</span> doctors
                    </p>
                </div>

                <div v-if="filteredDoctors.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    <DoctorCard v-for="(doctor, index) in filteredDoctors" :key="doctor.id" v-bind="doctor"
                        :index="index" />
                </div>

                <div v-else class="text-center py-16">
                    <div class="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                        <UIcon name="i-lucide-search" class="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 class="font-display text-xl font-semibold text-foreground mb-2">No doctors found</h3>
                    <p class="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                    <button @click="clearFilters"
                        class="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium">
                        Clear Filters
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>
