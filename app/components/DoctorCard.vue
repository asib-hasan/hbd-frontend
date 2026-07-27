<template>
    <NuxtLink 
        :to="localePath(`/doctor/${slug || id}`)" 
        class="group relative bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl hover:border-primary/30 active:scale-[0.985] active:bg-gray-50/80 transition-all duration-300 overflow-hidden flex flex-col justify-between p-4 sm:p-5 cursor-pointer select-none">
        
        <div class="flex flex-row items-start gap-3.5 sm:gap-5 w-full">
            <!-- Left: Image Container -->
            <div class="relative shrink-0">
                <div class="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 p-1 shadow-sm group-hover:border-primary/30 transition-colors">
                    <NuxtImg 
                        :src="image || userImg" 
                        @error="(e: any) => e.target.src = userImg" 
                        :alt="name" 
                        format="webp"
                        loading="lazy"
                        class="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500" 
                    />
                </div>
                <!-- Active Status Indicator -->
                <span class="absolute bottom-1 right-1 flex h-3.5 w-3.5">
                    <span 
                        v-if="doctor_status === 'Active'" 
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                    ></span>
                    <span 
                        class="relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-white shadow-sm"
                        :class="doctor_status === 'Active' ? 'bg-emerald-500' : 'bg-gray-400'"
                    ></span>
                </span>
            </div>

            <!-- Right: Details -->
            <div class="flex flex-col flex-1 min-w-0 pt-0.5">
                <!-- Name & Verified -->
                <div class="flex items-center gap-1.5 min-w-0">
                    <h3 class="font-display font-bold text-base xs:text-lg sm:text-xl text-gray-900 group-hover:text-primary transition-colors truncate">
                        {{ locale === 'bn' ? (name_bn || name) : name }}
                    </h3>
                    <UIcon name="i-lucide-badge-check" class="w-4 h-4 xs:w-5 xs:h-5 text-blue-500 shrink-0" title="Verified Doctor" />
                </div>

                <!-- Degree -->
                <p v-if="degree_name || degree_name_bn" class="text-xs xs:text-sm text-gray-500 font-medium line-clamp-1 mt-0.5">
                    {{ locale === 'bn' ? (degree_name_bn || degree_name) : degree_name }}
                </p>

                <!-- Badges: Experience / Fee -->
                <div class="flex flex-wrap items-center gap-1.5 mt-2">
                    <span v-if="experience" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[11px] xs:text-xs font-semibold">
                        <UIcon name="i-lucide-award" class="w-3 h-3" />
                        {{ experience }} {{ $t('common.exp') }}
                    </span>
                    <span v-if="fee && fee !== '0 BDT' && fee !== '0.00 BDT'" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[11px] xs:text-xs font-semibold border border-amber-200/50">
                        <UIcon name="i-lucide-banknote" class="w-3 h-3" />
                        {{ fee }}
                    </span>
                </div>

                <!-- Qualifications / Specialty -->
                <div v-if="qualifications && qualifications.length" class="flex items-center gap-1.5 text-xs xs:text-sm text-blue-600 font-semibold line-clamp-1 mt-2">
                    <UIcon name="i-lucide-stethoscope" class="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span class="truncate">{{ qualifications.join(', ') }}</span>
                </div>
                <div v-else-if="specialty" class="flex items-center gap-1.5 text-xs xs:text-sm text-blue-600 font-semibold line-clamp-1 mt-2">
                    <UIcon name="i-lucide-stethoscope" class="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span class="truncate">{{ locale === 'bn' ? (specialty_bn || specialty) : specialty }}</span>
                </div>

                <!-- Chamber / Location -->
                <div class="flex items-center gap-1.5 text-xs xs:text-sm text-gray-600 line-clamp-1 mt-1.5">
                    <UIcon name="i-lucide-building" class="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span class="truncate">{{ locale === 'bn' ? (chamber_name_bn || chamber_name || $t('common.no_chamber')) : (chamber_name || $t('common.no_chamber')) }}</span>
                </div>
            </div>
        </div>

        <!-- Action Button Row -->
        <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
            <div class="flex items-center gap-1.5 text-xs font-semibold text-gray-500 group-hover:text-primary transition-colors">
                <span>{{ $t('common.view_profile') }}</span>
                <UIcon name="i-lucide-arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>

            <div class="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs xs:text-sm font-semibold shadow-sm group-hover:bg-primary-600 group-hover:shadow-md transition-all">
                <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                <span>{{ $t('common.book_appt') }}</span>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import userImg from '~/assets/images/user.webp'

const { t, locale } = useI18n()
const localePath = useLocalePath()

const props = defineProps<{
    id: string | number
    slug?: string
    name: string
    name_bn?: string
    specialty?: string
    specialty_bn?: string
    degree_name?: string | null
    degree_name_bn?: string | null
    hospital?: string
    chamber_name?: string | null
    chamber_name_bn?: string | null
    image: string | null
    rating?: number | string
    reviews?: number | string
    experience: string | number
    availability?: string
    doctor_status?: string
    fee?: string
    qualifications?: string[]
    index?: number
}>()
</script>
