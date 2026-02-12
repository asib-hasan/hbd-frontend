<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { doctors } from '~/utils/doctors'
import AppFooter from '~/components/AppFooter.vue';

const { id } = useRoute().params
const doctor = doctors.find((d) => d.id === id)

const isAvailableToday = ref(false)

if (doctor) {
    isAvailableToday.value = doctor.availability.toLowerCase().includes('today')
}

// Mock additional data
const additionalInfo = {
    about: `${doctor?.name} is a highly experienced ${doctor?.specialty} specialist with ${doctor?.experience} of practice in homeopathic medicine. Known for a patient-centered approach and dedication to providing holistic treatment through constitutional remedies and individualized care.`,
    services: [
        "Constitutional Treatment",
        "Chronic Disease Management",
        "Acute Care",
        "Follow-up Consultation",
        "Online Consultation",
        "Second Opinion"
    ],
    education: [
        { degree: "BHMS", institution: "Dhaka Homeopathic Medical College", year: "1995" },
        { degree: doctor?.qualifications?.[1] || "DHMS", institution: "Bangladesh Homeopathic Board", year: "2000" },
        { degree: doctor?.qualifications?.[2] || "MD (Hom)", institution: "National Institute of Homeopathy", year: "2005" }
    ],
    schedule: [
        { day: "Saturday", time: "5:00 PM - 9:00 PM" },
        { day: "Sunday", time: "5:00 PM - 9:00 PM" },
        { day: "Monday", time: "5:00 PM - 9:00 PM" },
        { day: "Tuesday", time: "Closed" },
        { day: "Wednesday", time: "5:00 PM - 9:00 PM" },
        { day: "Thursday", time: "5:00 PM - 9:00 PM" },
        { day: "Friday", time: "10:00 AM - 1:00 PM" }
    ],
    patientsSeen: "10,000+",
    successRate: "95%"
}

useHead({
    title: doctor ? `${doctor.name} - ${doctor.specialty} | HomeoDoctorsBD` : 'Doctor Not Found',
    meta: [
        { name: 'description', content: doctor ? `Book an appointment with ${doctor.name}, ${doctor.specialty} specialist at ${doctor.hospital}.` : 'Doctor details not found.' }
    ]
})
</script>

<template>
    <div v-if="!doctor" class="min-h-screen bg-background flex items-center justify-center">
        <div class="text-center">
            <h1 class="text-2xl font-bold text-foreground mb-4">Doctor Not Found</h1>
            <NuxtLink to="/doctors/bangladesh">
                <UButton>Browse Doctors</UButton>
            </NuxtLink>
        </div>
    </div>

    <div v-else class="min-h-screen bg-background pt-16">
        <!-- Hero Section -->
        <section class="relative bg-gradient-hero-subtle overflow-hidden">
            <div
                class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_50%)]" />

            <div class="container mx-auto px-4 py-8 relative z-10">
                <!-- Breadcrumb -->
                <nav class="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <NuxtLink to="/" class="hover:text-primary transition-colors">Home</NuxtLink>
                    <span>/</span>
                    <NuxtLink :to="`/doctors/${doctor.location}`"
                        class="hover:text-primary transition-colors capitalize">
                        {{ doctor.location }} Doctors
                    </NuxtLink>
                    <span>/</span>
                    <span class="text-foreground">{{ doctor.name }}</span>
                </nav>

                <NuxtLink :to="`/doctors/${doctor.location}`"
                    class="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6">
                    <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
                    Back to Doctors
                </NuxtLink>

                <div class="grid lg:grid-cols-3 gap-8">
                    <!-- Doctor Info Card -->
                    <div class="lg:col-span-2">
                        <div class="card-premium p-6 md:p-8">
                            <div class="flex flex-col md:flex-row gap-6">
                                <!-- Image -->
                                <div class="relative flex-shrink-0">
                                    <div class="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-soft">
                                        <img :src="doctor.image" :alt="doctor.name"
                                            class="w-full h-full object-cover" />
                                    </div>
                                    <div
                                        class="absolute -bottom-2 -right-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 shadow-soft">
                                        <UIcon name="i-lucide-badge-check" class="w-4 h-4" />
                                        Verified
                                    </div>
                                </div>

                                <!-- Details -->
                                <div class="flex-1">
                                    <div class="flex items-start justify-between mb-3">
                                        <div>
                                            <span
                                                class="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-lg text-xs font-semibold mb-2">
                                                {{ doctor.specialty }}
                                            </span>
                                            <h1
                                                class="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
                                                {{ doctor.name }}
                                            </h1>
                                            <p v-if="doctor.qualifications" class="text-muted-foreground">
                                                {{ doctor.qualifications.join(", ") }}
                                            </p>
                                        </div>
                                        <div class="flex gap-2">
                                            <UButton variant="outline" size="sm"
                                                class="rounded-full w-9 h-9 p-0 flex items-center justify-center">
                                                <UIcon name="i-lucide-heart" class="w-4 h-4" />
                                            </UButton>
                                            <UButton variant="outline" size="sm"
                                                class="rounded-full w-9 h-9 p-0 flex items-center justify-center">
                                                <UIcon name="i-lucide-share-2" class="w-4 h-4" />
                                            </UButton>
                                        </div>
                                    </div>

                                    <div class="flex items-center gap-4 mb-4">
                                        <div
                                            class="flex items-center gap-1.5 bg-accent/10 text-accent px-3 py-1.5 rounded-xl">
                                            <UIcon name="i-lucide-star" class="w-5 h-5 text-accent" />
                                            <span class="font-bold">{{ doctor.rating }}</span>
                                            <span class="text-sm text-muted-foreground">({{ doctor.reviews }}
                                                reviews)</span>
                                        </div>
                                        <div class="px-3 py-1.5 rounded-xl text-sm font-semibold flex items-center gap-1.5"
                                            :class="isAvailableToday
                                                ? 'bg-green-500/10 text-green-600'
                                                : 'bg-muted text-muted-foreground'">
                                            <UIcon name="i-lucide-clock" class="w-4 h-4" />
                                            {{ doctor.availability }}
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-2 gap-4 mb-4">
                                        <div class="flex items-center gap-2 text-muted-foreground">
                                            <UIcon name="i-lucide-building-2" class="w-4 h-4" />
                                            <!-- Building icon fallback -->
                                            <span class="text-sm line-clamp-1">{{ doctor.hospital }}</span>
                                        </div>
                                        <div class="flex items-center gap-2 text-muted-foreground">
                                            <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                                            <span class="text-sm">{{ doctor.experience }} Experience</span>
                                        </div>
                                        <div class="flex items-center gap-2 text-muted-foreground">
                                            <UIcon name="i-lucide-users" class="w-4 h-4" />
                                            <span class="text-sm">{{ additionalInfo.patientsSeen }} Patients</span>
                                        </div>
                                        <div class="flex items-center gap-2 text-muted-foreground">
                                            <UIcon name="i-lucide-thumbs-up" class="w-4 h-4" />
                                            <span class="text-sm">{{ additionalInfo.successRate }} Success Rate</span>
                                        </div>
                                    </div>

                                    <div class="flex items-center gap-4 pt-4 border-t border-border">
                                        <span class="text-2xl font-bold text-primary">{{ doctor.fee || "৳500" }}</span>
                                        <span class="text-muted-foreground">per consultation</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Booking Card -->
                    <div class="lg:col-span-1">
                        <div class="card-premium p-6 sticky top-24">
                            <h3 class="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                                <UIcon name="i-lucide-leaf" class="w-5 h-5 text-primary" />
                                Book Consultation
                            </h3>

                            <div class="space-y-4 mb-6">
                                <div class="flex items-center justify-between py-3 border-b border-border">
                                    <span class="text-muted-foreground">Consultation Fee</span>
                                    <span class="font-bold text-foreground">{{ doctor.fee || "৳500" }}</span>
                                </div>
                                <div class="flex items-center justify-between py-3 border-b border-border">
                                    <span class="text-muted-foreground">Follow-up Fee</span>
                                    <span class="font-bold text-foreground">৳300</span>
                                </div>
                            </div>

                            <UButton block size="xl" class="w-full mb-3 font-semibold shadow-glow">
                                Book Appointment
                            </UButton>
                            <UButton block variant="outline" size="xl" class="w-full font-semibold gap-2">
                                <UIcon name="i-lucide-phone" class="w-4 h-4" />
                                Call Now
                            </UButton>

                            <div class="mt-6 pt-4 border-t border-border">
                                <div class="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                    <UIcon name="i-lucide-message-circle" class="w-4 h-4" />
                                    <span>Online consultation available</span>
                                </div>
                                <div class="flex items-center gap-2 text-sm text-muted-foreground">
                                    <UIcon name="i-lucide-clock" class="w-4 h-4" />
                                    <span>Usually responds within 24 hours</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Details Section -->
        <section class="py-12 bg-background">
            <div class="container mx-auto px-4">
                <div class="grid lg:grid-cols-3 gap-8">
                    <div class="lg:col-span-2 space-y-8">
                        <!-- About -->
                        <div class="card-premium p-6">
                            <h2 class="font-display font-bold text-xl text-foreground mb-4 flex items-center gap-2">
                                <UIcon name="i-lucide-award" class="w-5 h-5 text-primary" />
                                About
                            </h2>
                            <p class="text-muted-foreground leading-relaxed">
                                {{ additionalInfo.about }}
                            </p>
                        </div>

                        <!-- AI Insights -->
                        <DoctorAIInsights v-if="doctor" :doctor="doctor" />

                        <!-- Services -->
                        <div class="card-premium p-6">
                            <h2 class="font-display font-bold text-xl text-foreground mb-4">
                                Services Offered
                            </h2>
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                                <div v-for="(service, idx) in additionalInfo.services" :key="idx"
                                    class="bg-secondary/50 text-secondary-foreground px-4 py-2.5 rounded-xl text-sm font-medium text-center">
                                    {{ service }}
                                </div>
                            </div>
                        </div>

                        <!-- Education -->
                        <div class="card-premium p-6">
                            <h2 class="font-display font-bold text-xl text-foreground mb-4 flex items-center gap-2">
                                <UIcon name="i-lucide-graduation-cap" class="w-5 h-5 text-primary" />
                                Education & Training
                            </h2>
                            <div class="space-y-4">
                                <div v-for="(edu, idx) in additionalInfo.education" :key="idx"
                                    class="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
                                    <div
                                        class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <UIcon name="i-lucide-graduation-cap" class="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-foreground">{{ edu.degree }}</h4>
                                        <p class="text-sm text-muted-foreground">{{ edu.institution }}</p>
                                        <p class="text-xs text-muted-foreground mt-1">{{ edu.year }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Reviews -->
                        <div class="card-premium p-6">
                            <div class="flex items-center justify-between mb-6">
                                <h2 class="font-display font-bold text-xl text-foreground">
                                    Patient Reviews
                                </h2>
                                <div class="flex items-center gap-2">
                                    <UIcon name="i-lucide-star" class="w-5 h-5 text-accent" />
                                    <span class="font-bold text-lg">{{ doctor.rating }}</span>
                                    <span class="text-muted-foreground">({{ doctor.reviews }} reviews)</span>
                                </div>
                            </div>

                            <div class="space-y-4">
                                <div v-for="(review, idx) in [
                                    { name: 'Rahim Ahmed', date: '2 days ago', rating: 5, comment: 'Excellent homeopathic doctor! Very thorough and caring. Explained the constitutional treatment in detail.' },
                                    { name: 'Fatema Begum', date: '1 week ago', rating: 5, comment: 'Highly recommend. Professional and knowledgeable about homeopathic remedies. My chronic issues improved significantly.' },
                                    { name: 'Kamal Hossain', date: '2 weeks ago', rating: 4, comment: 'Good experience overall. The natural treatment approach really worked for me.' }
                                ]" :key="idx" class="p-4 bg-muted/30 rounded-xl">
                                    <div class="flex items-center justify-between mb-2">
                                        <div class="flex items-center gap-3">
                                            <div
                                                class="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                                <span class="font-semibold text-primary">{{ review.name.charAt(0)
                                                    }}</span>
                                            </div>
                                            <div>
                                                <p class="font-medium text-foreground">{{ review.name }}</p>
                                                <p class="text-xs text-muted-foreground">{{ review.date }}</p>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-0.5">
                                            <UIcon v-for="i in 5" :key="i" name="i-lucide-star" class="w-4 h-4" :class="i <= review.rating ? 'text-accent' : 'text-gray-300 dark:text-gray-600'
                                                " />
                                        </div>
                                    </div>
                                    <p class="text-muted-foreground text-sm">{{ review.comment }}</p>
                                </div>
                            </div>

                            <UButton variant="outline" block class="w-full mt-4">
                                View All Reviews
                            </UButton>
                        </div>
                    </div>

                    <!-- Schedule & Location -->
                    <div class="lg:col-span-1 space-y-6">
                        <!-- Schedule -->
                        <div class="card-premium p-6">
                            <h3 class="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                                <UIcon name="i-lucide-clock" class="w-5 h-5 text-primary" />
                                Consultation Hours
                            </h3>
                            <div class="space-y-3">
                                <div v-for="(item, idx) in additionalInfo.schedule" :key="idx"
                                    class="flex items-center justify-between py-2 px-3 rounded-lg transition-colors"
                                    :class="item.time === 'Closed' ? 'bg-destructive/10 text-destructive' : 'bg-muted/50'">
                                    <span class="font-medium text-foreground">{{ item.day }}</span>
                                    <span
                                        :class="item.time === 'Closed' ? 'text-destructive' : 'text-muted-foreground'">
                                        {{ item.time }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Location -->
                        <div class="card-premium p-6">
                            <h3 class="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                                <UIcon name="i-lucide-map-pin" class="w-5 h-5 text-primary" />
                                Clinic Location
                            </h3>
                            <div class="space-y-4">
                                <div class="aspect-video rounded-xl overflow-hidden bg-muted">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.0611220tried9!2d90.27923710646989!3d23.780573258035692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1703581234567!5m2!1sen!2sbd"
                                        width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen
                                        loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-foreground mb-1">{{ doctor.hospital }}</h4>
                                    <p class="text-sm text-muted-foreground capitalize">
                                        {{ doctor.area ? `${doctor.area}, ` : "" }}{{ doctor.location }}, Bangladesh
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Contact -->
                        <div class="card-premium p-6">
                            <h3 class="font-display font-bold text-lg text-foreground mb-4">
                                Contact Information
                            </h3>
                            <div class="space-y-3">
                                <a href="tel:+8801700000000"
                                    class="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                                    <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                        <UIcon name="i-lucide-phone" class="w-5 h-5 text-primary" />
                                    </div>
                                    <span>+880 1700-000000</span>
                                </a>
                                <a href="mailto:doctor@homeoconnect.com"
                                    class="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                                    <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                        <UIcon name="i-lucide-mail" class="w-5 h-5 text-primary" />
                                    </div>
                                    <span>doctor@homeoconnect.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <AppFooter />

    </div>
</template>
