<script setup lang="ts">
import { getFeaturedDoctors } from '../utils/doctors';

const doctors = getFeaturedDoctors();
</script>

<template>
    <section id="doctors" class="section-padding bg-muted/30 relative overflow-hidden">
        <!-- Background Decoration -->
        <div
            class="absolute -top-40 -right-40 w-96 h-96 bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl" />
        <div
            class="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-radial from-accent/5 to-transparent rounded-full blur-3xl" />

        <div class="container mx-auto px-4 relative z-10">
            <!-- Section Header -->
            <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
                <div class="max-w-2xl">
                    <span class="badge badge-primary mb-4 animate-fade-up">
                        <UIcon name="i-lucide-award" class="w-4 h-4" />
                        Top Rated Practitioners
                    </span>
                    <h2
                        class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-up stagger-1">
                        Meet Our <span class="text-gradient">Expert</span> Homeopaths
                    </h2>
                    <p class="text-lg text-muted-foreground animate-fade-up stagger-2">
                        Our team of experienced homeopathic practitioners is dedicated to providing you with natural
                        healing and holistic treatment across Bangladesh.
                    </p>
                </div>
                <div class="animate-fade-up stagger-3">
                    <NuxtLink to="/doctors/bangladesh">
                        <UButton variant="outline" size="lg" class="gap-2 w-fit">
                            View All Doctors
                            <UIcon name="i-lucide-arrow-right" class="w-5 h-5" />
                        </UButton>
                    </NuxtLink>
                </div>
            </div>

            <!-- Doctors Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <DoctorCard v-for="(doctor, index) in doctors.slice(0, 4)" :key="doctor.id" v-bind="doctor"
                    :index="index" />
            </div>
        </div>
    </section>
</template>
