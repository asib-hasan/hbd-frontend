<script setup lang="ts">
import { computed } from 'vue'
import { useDoctors } from '~/composables/useDoctors'

const localePath = useLocalePath()
const { fetchFeaturedDoctors } = useDoctors()
const { data: apiResponse, pending } = await fetchFeaturedDoctors()

const doctors = computed(() => {
    return (apiResponse.value as any)?.data || []
})
</script>

<template>
    <section id="doctors" class="section-padding bg-muted/30 relative overflow-hidden">
        <div
            class="absolute -top-40 -right-40 w-96 h-96 bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl" />
        <div
            class="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-radial from-accent/5 to-transparent rounded-full blur-3xl" />

        <div class="container mx-auto px-4 relative z-10">
            <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
                <div class="max-w-2xl">
                    <span class="badge badge-primary mb-4 ">
                        <UIcon name="i-lucide-award" class="w-4 h-4" />
                        {{ $t('featured_doctors.badge') }}
                    </span>
                    <h2
                        class="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4  stagger-1">
                        {{ $t('featured_doctors.title_main') }} <span class="text-gradient">{{ $t('featured_doctors.title_highlight') }}</span> {{ $t('featured_doctors.title_suffix') }}
                    </h2>
                    <p class="text-lg text-muted-foreground  stagger-2">
                        {{ $t('featured_doctors.desc') }}
                    </p>
                </div>
                <div class=" stagger-3">
                    <NuxtLink :to="localePath('/doctors')">
                        <UButton variant="outline" size="lg" class="gap-2 w-fit">
                            {{ $t('featured_doctors.view_all') }}
                            <UIcon name="i-lucide-arrow-right" class="w-5 h-5" />
                        </UButton>
                    </NuxtLink>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="pending" class="grid lg:grid-cols-2 gap-5">
                <DoctorCardSkeleton v-for="i in 6" :key="i" />
            </div>

            <!-- Doctor Cards -->
            <div v-else class="grid lg:grid-cols-2 gap-5">
                <DoctorCard v-for="(doctor, index) in doctors.slice(0, 6)" :key="doctor.id" v-bind="doctor"
                    :index="index" />
            </div>
        </div>
    </section>
</template>
