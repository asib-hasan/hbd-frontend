<template>
    <div class="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up overflow-hidden"
        :style="{ animationDelay: `${index * 0.08}s` }">
        <div class="flex flex-row p-4 gap-4 h-full relative">
            
            <!-- Verified Badge (Floating Top Right) -->
            <div class="absolute top-4 right-4 bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-sm border border-primary/20 z-10">
                <UIcon name="i-lucide-shield-check" class="w-3 h-3" />
                {{ $t('common.verified') }}
            </div>

            <!-- Image Container -->
            <NuxtLink :to="localePath(`/doctor/${slug || id}`)" class="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-lg overflow-hidden bg-gray-50 border border-gray-100/50">
                <img :src="image" :alt="name"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                
                <!-- Status Badge -->
                <div class="absolute bottom-1.5 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-bold flex items-center gap-1 shadow-sm border border-gray-100/50 whitespace-nowrap"
                    :class="doctor_status === 'Active' ? 'text-blue-600' : 'text-rose-600'">
                    <span class="relative flex h-1.5 w-1.5">
                        <span v-if="doctor_status === 'Active'" class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-1.5 w-1.5" :class="doctor_status === 'Active' ? 'bg-blue-500' : 'bg-rose-500'"></span>
                    </span>
                    {{ doctor_status === 'Active' ? $t('common.active') : (doctor_status ? $t('common.unavailable') : $t('common.unknown')) }}
                </div>
            </NuxtLink>

            <!-- Content -->
            <div class="flex flex-col flex-1 min-w-0 py-1">
                <div class="mb-2">
                    <NuxtLink :to="localePath(`/doctor/${slug || id}`)">
                        <h3 class="font-display font-bold text-base text-gray-900 group-hover:text-primary transition-colors flex items-center gap-1 truncate pr-16">
                            {{ locale === 'bn' ? (name_bn || name) : name }}
                        </h3>
                    </NuxtLink>
                    <p v-if="degree_name || degree_name_bn" class="text-xs text-gray-600 mt-0.5 font-medium truncate">
                        {{ locale === 'bn' ? (degree_name_bn || degree_name) : degree_name }}
                    </p>
                    <div v-if="qualifications && qualifications.length" class="text-[11px] text-primary/80 mt-1 flex items-center gap-1">
                        <UIcon name="i-lucide-stethoscope" class="w-3 h-3 shrink-0" />
                        <span class="truncate">{{ qualifications.join(', ') }}</span>
                    </div>
                </div>

                <div class="space-y-1.5 mb-3 mt-auto">
                    <div class="flex items-start gap-1.5 text-xs text-gray-600">
                        <UIcon name="i-lucide-map-pin" class="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                        <span class="line-clamp-1 font-medium">{{ locale === 'bn' ? (chamber_name_bn || chamber_name || $t('common.no_chamber')) : (chamber_name || $t('common.no_chamber')) }}</span>
                    </div>
                    <div class="flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 w-fit px-2 py-0.5 rounded">
                        <UIcon name="i-lucide-briefcase-medical" class="w-3.5 h-3.5 shrink-0" />
                        <span>{{ experience }} {{ $t('common.exp') }}</span>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="grid grid-cols-2 gap-2 mt-2">
                    <NuxtLink :to="localePath(`/doctor/${slug || id}`)" class="block">
                        <UButton color="primary" variant="solid" block class="h-8 text-xs font-semibold shadow-sm hover:shadow transition-shadow px-0 text-white">
                            {{ $t('common.book_appt') }}
                        </UButton>
                    </NuxtLink>
                    <NuxtLink :to="localePath(`/doctor/${slug || id}`)" class="block">
                        <UButton color="gray" variant="soft" block class="h-8 text-xs font-semibold hover:bg-gray-100 transition-colors px-0">
                            {{ $t('common.view_profile') }}
                        </UButton>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
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
