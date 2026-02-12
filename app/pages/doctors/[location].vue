<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { 
    getDoctorsByLocation, 
    locationInfo, 
    dhakaAreas, 
    districts,
    type Doctor 
} from '~/utils/doctors'

const route = useRoute()
const location = computed(() => (route.params.location as string) || 'bangladesh')

const searchQuery = ref("")
const selectedSpecialty = ref("all")
const selectedDistrict = ref("all")

const doctors = computed(() => getDoctorsByLocation(location.value))
const info = computed(() => locationInfo[location.value] || locationInfo.bangladesh || {
    title: "Homeopathic Doctors",
    description: "Find homeopathic doctors in Bangladesh",
    doctorCount: 0,
    hospitalCount: 0
})

const isDhaka = computed(() => location.value === 'dhaka')
const isDhakaArea = computed(() => dhakaAreas.some(area => area.id === location.value))
const isBangladesh = computed(() => location.value === 'bangladesh')

const specialties = computed(() => {
    const specs = new Set(doctors.value.map(d => d.specialty))
    return ["all", ...Array.from(specs)]
})

const filteredDoctors = computed(() => {
    return doctors.value.filter(doctor => {
        const matchesSearch = 
            doctor.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            doctor.specialty.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            doctor.hospital.toLowerCase().includes(searchQuery.value.toLowerCase())
        
        const matchesSpecialty = selectedSpecialty.value === 'all' || doctor.specialty === selectedSpecialty.value
        
        const matchesDistrict = selectedDistrict.value === 'all' || doctor.location === selectedDistrict.value
        
        return matchesSearch && matchesSpecialty && matchesDistrict
    })
})

const breadcrumbs = computed(() => {
    const crumbs: { label: string; href?: string }[] = [{ label: "Doctors", href: "/doctors/bangladesh" }]
    
    if (isDhakaArea.value) {
        crumbs.push({ label: "Dhaka", href: "/doctors/dhaka" })
        const areaInfo = dhakaAreas.find(a => a.id === location.value)
        crumbs.push({ label: areaInfo?.name || location.value })
    } else {
        crumbs.push({ label: location.value.charAt(0).toUpperCase() + location.value.slice(1) })
    }
    
    return crumbs
})

// SEO
useHead({
    title: computed(() => `${info.value.title} | HomeoDoctorsBD`),
    meta: [
        { name: 'description', content: computed(() => info.value.description) },
        { name: 'keywords', content: computed(() => `homeopathy, homeopathic doctors, ${location.value}, natural healing`) }
    ]
})

const formatDistrict = (id: string) => {
    const district = districts.find(d => d.id === id)
    return district ? district.name : id
}

const clearFilters = () => {
    searchQuery.value = ""
    selectedSpecialty.value = "all"
    selectedDistrict.value = "all"
}
</script>

<template>
    <div class="min-h-screen bg-background">
        <PageHeader 
            :title="info.title" 
            :description="info.description" 
            :breadcrumbs="breadcrumbs"
            :stats="[
                { label: 'Verified Doctors', value: `${info.doctorCount}+` },
                { label: 'Partner Clinics', value: `${info.hospitalCount}+` }
            ]" 
        />

        <!-- Dhaka Areas Section -->
        <section v-if="isDhaka" class="py-8 bg-card/50 border-b border-border">
            <div class="container mx-auto px-4">
                <h3 class="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <UIcon name="i-lucide-map-pin" class="w-5 h-5 text-primary" />
                    Browse by Area in Dhaka
                </h3>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    <NuxtLink v-for="area in dhakaAreas" :key="area.id" :to="`/doctors/${area.id}`"
                        class="group p-4 bg-background border border-border rounded-xl hover:border-primary/30 hover:shadow-soft transition-all duration-300">
                        <div class="flex flex-col gap-1">
                            <span class="font-medium text-foreground group-hover:text-primary transition-colors">
                                {{ area.name }}
                            </span>
                            <span class="text-xs text-muted-foreground">
                                {{ area.doctorCount }} Doctors
                            </span>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </section>

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
                        <div v-if="isBangladesh" class="w-full sm:w-48">
                            <div class="relative">
                                <UIcon name="i-lucide-map-pin"
                                    class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                                <select v-model="selectedDistrict"
                                    class="w-full h-12 pl-10 pr-4 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 appearance-none cursor-pointer">
                                    <option v-for="district in districts" :key="district.id" :value="district.id">
                                        {{ district.name }}
                                    </option>
                                </select>
                                <UIcon name="i-lucide-chevron-down"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <!-- Specialty Filter -->
                    <div class="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                        <UIcon name="i-lucide-sliders-horizontal" class="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        <button v-for="specialty in specialties.slice(0, 6)" :key="specialty"
                            @click="selectedSpecialty = specialty"
                            class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all" :class="selectedSpecialty === specialty
                                ? 'bg-primary text-primary-foreground shadow-soft'
                                : 'bg-muted hover:bg-muted/80 text-foreground'">
                            {{ specialty === 'all' ? 'All Specialties' : specialty }}
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Doctors Grid -->
        <section class="section-padding bg-muted/30">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between mb-8">
                    <p class="text-muted-foreground">
                        Showing <span class="font-semibold text-foreground">{{ filteredDoctors.length }}</span> doctors
                    </p>
                    <NuxtLink v-if="isDhakaArea" to="/doctors/dhaka" class="text-sm text-primary hover:underline">
                        ← Back to all Dhaka doctors
                    </NuxtLink>
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
