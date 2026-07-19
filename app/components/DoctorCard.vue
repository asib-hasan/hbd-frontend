<template>
    <div class="group bg-primary/[0.03] rounded-xl border border-primary/10 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 animate-fade-up overflow-hidden flex"
        :style="{ animationDelay: `${index * 0.08}s` }">
        
        <div class="flex flex-row p-4 sm:p-5 gap-4 sm:gap-6 w-full">
            
            <!-- Left: Image Container -->
            <div class="shrink-0 flex flex-col items-center">
                <NuxtLink :to="localePath(`/doctor/${slug || id}`)" class="relative w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] rounded-xl overflow-hidden bg-white border border-gray-100 p-1 block shadow-sm group-hover:border-primary/20 transition-colors">
                    <img :src="image || userImg" @error="(e) => e.target.src = userImg" :alt="name" class="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500" />
                    <!-- Status Badge -->
                    <div class="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm z-10"
                         :class="doctor_status === 'Active' ? 'bg-green-500' : 'bg-gray-400'"
                         :title="doctor_status === 'Active' ? $t('common.active') : (doctor_status ? $t('common.unavailable') : $t('common.unknown'))">
                    </div>
                </NuxtLink>
            </div>

            <!-- Right: Content -->
            <div class="flex flex-col flex-1 min-w-0">
                
                <!-- Name -->
                <NuxtLink :to="localePath(`/doctor/${slug || id}`)">
                    <h3 class="font-display font-bold text-[18px] sm:text-[20px] text-gray-900 group-hover:text-primary transition-colors flex items-center gap-1.5 truncate">
                        {{ locale === 'bn' ? (name_bn || name) : name }}
                        <UIcon name="i-lucide-badge-check" class="w-5 h-5 text-blue-600 shrink-0" title="Verified" />
                    </h3>
                </NuxtLink>
                
                <!-- Degrees -->
                <p v-if="degree_name || degree_name_bn" class="text-[13px] sm:text-[14px] text-gray-500 mt-1 font-medium leading-snug line-clamp-2 pr-2">
                    {{ locale === 'bn' ? (degree_name_bn || degree_name) : degree_name }}
                </p>

                <!-- Details List -->
                <div class="mt-3.5 space-y-2.5">
                    <!-- Speciality / Qualifications -->
                    <div v-if="qualifications && qualifications.length" class="flex items-start gap-2.5 text-[13px] sm:text-[14px]">
                        <UIcon name="i-lucide-stethoscope" class="w-4.5 h-4.5 text-gray-400 shrink-0 mt-0.5" />
                        <span class="text-blue-600 font-semibold line-clamp-1">{{ qualifications.join(', ') }}</span>
                    </div>

                    <!-- Chamber / Location -->
                    <div class="flex items-start gap-2.5 text-[13px] sm:text-[14px]">
                        <UIcon name="i-lucide-building" class="w-4.5 h-4.5 text-gray-400 shrink-0 mt-0.5" />
                        <span class="text-gray-700 leading-snug line-clamp-2">
                            {{ experience ? experience + ' ' + $t('common.exp') + ', ' : '' }}
                            <span class="text-blue-600 font-semibold">{{ locale === 'bn' ? (chamber_name_bn || chamber_name || $t('common.no_chamber')) : (chamber_name || $t('common.no_chamber')) }}</span>
                        </span>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-wrap items-center gap-3 mt-auto pt-4">
                    <NuxtLink :to="localePath(`/doctor/${slug || id}`)">
                        <UButton color="primary" variant="solid" class="h-9 px-4 sm:px-5 text-[13px] sm:text-[14px] font-semibold rounded shadow-sm text-white hover:bg-primary/90 transition-colors">
                            {{ $t('common.book_appt') }}
                        </UButton>
                    </NuxtLink>
                    <NuxtLink :to="localePath(`/doctor/${slug || id}`)">
                        <UButton color="gray" variant="soft" class="h-9 px-4 sm:px-5 text-[13px] sm:text-[14px] font-semibold rounded bg-gray-100 hover:bg-gray-200 text-gray-700 ring-0 hover:ring-0 border-0 transition-colors">
                            {{ $t('common.view_profile') }}
                        </UButton>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
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
    degree_name?: string | null
    degree_name_bn?: string | null
    hospital?: string
    chamber_name?: string | null
    chamber_name_bn?: string | null
    image: string
    rating?: number | string
    reviews?: number | string
    experience: string | number
    availability?: string
    doctor_status?: string
    fee?: string
    qualifications?: string[]
    index: number
}>();
</script>
