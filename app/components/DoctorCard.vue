<template>
    <div class="group card-premium transition-all duration-500 hover:-translate-y-2 animate-fade-up"
        :style="{ animationDelay: `${index * 0.08}s` }">
        <!-- Image Container -->
        <div class="relative h-52 overflow-hidden">
            <img :src="image" :alt="name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />

            <!-- Rating Badge -->
            <!-- <div
                class="absolute top-4 right-4 bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-soft">
                <UIcon name="i-lucide-star" class="w-4 h-4 text-accent" />
                <span class="font-bold text-sm text-foreground">{{ rating }}</span>
                <span class="text-xs text-muted-foreground">({{ reviews }})</span>
            </div> -->

            <!-- Status Badge -->
            <div class="absolute bottom-4 left-4 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                :class="doctor_status === 'Active' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'">
                <UIcon name="i-lucide-activity" class="w-3.5 h-3.5" />
                {{ doctor_status || 'Unknown' }}
            </div>

            <!-- Verified Badge -->
            <div
                class="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                <UIcon name="i-lucide-badge-check" class="w-3.5 h-3.5" />
                Verified
            </div>
        </div>

        <!-- Content -->
        <div class="p-5">
            <div class="mb-4">
                <div class="flex items-center gap-2 mb-2">
                    <span v-if="fee"
                        class="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-lg text-xs font-semibold">
                        Fee: {{ fee }}
                    </span>
                </div>
                <h3
                    class="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {{ name }}
                </h3>
                <p v-if="degree_name" class="text-xs text-muted-foreground mt-1 line-clamp-1">
                    {{ degree_name }}
                </p>
            </div>

            <div class="space-y-2 mb-5">
                <div class="flex items-center gap-2 text-sm text-muted-foreground">
                    <UIcon name="i-lucide-map-pin" class="w-4 h-4 flex-shrink-0" />
                    <span class="line-clamp-1">{{ chamber_name || 'No Chamber' }}</span>
                </div>
                <div class="flex items-center gap-2 text-sm text-muted-foreground">
                    <UIcon name="i-lucide-calendar" class="w-4 h-4 flex-shrink-0" />
                    <span>{{ experience }} Experience</span>
                </div>
            </div>

            <div class="mt-auto">
                <NuxtLink :to="`/doctor/${slug || id}`" class="block w-full group/btn">
                    <UButton variant="soft" size="md" block
                        class="w-full h-11 justify-between px-4 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-xl font-semibold">
                        Visit Profile
                        <UIcon name="i-lucide-arrow-right"
                            class="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </UButton>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    id: string | number
    slug?: string
    name: string
    degree_name?: string | null
    hospital?: string
    chamber_name?: string | null
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
