<script setup lang="ts">
import PageHeader from '~/components/PageHeader.vue';


const specialties = [
    {
        icon: 'i-lucide-leaf',
        name: "Constitutional Treatment",
        slug: "constitutional-treatment",
        doctors: 65,
        colorClass: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white",
        description: "Holistic treatment based on individual constitution and symptom patterns for long-term health improvement."
    },
    {
        icon: 'i-lucide-activity',
        name: "Chronic Diseases",
        slug: "chronic-diseases",
        doctors: 52,
        colorClass: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white",
        description: "Long-term management of persistent conditions like diabetes, hypertension, and autoimmune disorders."
    },
    {
        icon: 'i-lucide-heart',
        name: "Heart & Circulation",
        slug: "heart-circulation",
        doctors: 38,
        colorClass: "bg-rose-500/10 text-rose-500 group-hover:bg-rose-500 group-hover:text-white",
        description: "Cardiovascular health support including blood pressure management and circulation improvement."
    },
    {
        icon: 'i-lucide-brain',
        name: "Mental Health",
        slug: "mental-health",
        doctors: 32,
        colorClass: "bg-violet-500/10 text-violet-500 group-hover:bg-violet-500 group-hover:text-white",
        description: "Treatment for anxiety, depression, stress-related disorders, and emotional well-being."
    },
    {
        icon: 'i-lucide-baby',
        name: "Child Care",
        slug: "child-care",
        doctors: 45,
        colorClass: "bg-pink-500/10 text-pink-500 group-hover:bg-pink-500 group-hover:text-white",
        description: "Pediatric homeopathy for common childhood ailments, growth issues, and immune support."
    },
    {
        icon: 'i-lucide-flower-2',
        name: "Women's Health",
        slug: "womens-health",
        doctors: 48,
        colorClass: "bg-fuchsia-500/10 text-fuchsia-500 group-hover:bg-fuchsia-500 group-hover:text-white",
        description: "Hormonal balance, menstrual disorders, pregnancy care, and menopause management."
    },
    {
        icon: 'i-lucide-shield',
        name: "Skin Disorders",
        slug: "skin-disorders",
        doctors: 41,
        colorClass: "bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white",
        description: "Treatment for eczema, psoriasis, acne, allergies, and other dermatological conditions."
    },
    {
        icon: 'i-lucide-bone',
        name: "Joint & Bone Disorders",
        slug: "joint-bone-disorders",
        doctors: 35,
        colorClass: "bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white",
        description: "Arthritis, osteoporosis, back pain, and musculoskeletal problems treatment."
    },
    {
        icon: 'i-lucide-stethoscope',
        name: "Respiratory Health",
        slug: "respiratory-health",
        doctors: 42,
        colorClass: "bg-sky-500/10 text-sky-500 group-hover:bg-sky-500 group-hover:text-white",
        description: "Asthma, bronchitis, allergies, sinusitis, and other respiratory conditions."
    },
    {
        icon: 'i-lucide-eye',
        name: "Eye Disorders",
        slug: "eye-disorders",
        doctors: 28,
        colorClass: "bg-indigo-500/10 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white",
        description: "Treatment for eye strain, conjunctivitis, and vision-related issues."
    },
    {
        icon: 'i-lucide-pill',
        name: "Digestive Health",
        slug: "digestive-health",
        doctors: 55,
        colorClass: "bg-lime-500/10 text-lime-500 group-hover:bg-lime-500 group-hover:text-white",
        description: "IBS, acidity, constipation, liver disorders, and gastrointestinal problems."
    },
    {
        icon: 'i-lucide-wind',
        name: "Allergies & Immunity",
        slug: "allergies-immunity",
        doctors: 47,
        colorClass: "bg-teal-500/10 text-teal-500 group-hover:bg-teal-500 group-hover:text-white",
        description: "Allergy management, immune system strengthening, and autoimmune support."
    },
    {
        icon: 'i-lucide-droplets',
        name: "Kidney & Urinary",
        slug: "kidney-urinary",
        doctors: 31,
        colorClass: "bg-cyan-500/10 text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white",
        description: "Urinary tract infections, kidney stones, and renal health management."
    },
    {
        icon: 'i-lucide-moon',
        name: "Sleep Disorders",
        slug: "sleep-disorders",
        doctors: 29,
        colorClass: "bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white",
        description: "Insomnia, sleep apnea, and other sleep-related issues treatment."
    },
    {
        icon: 'i-lucide-zap',
        name: "Neurological Disorders",
        slug: "neurological-disorders",
        doctors: 26,
        colorClass: "bg-red-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-white",
        description: "Migraine, headaches, neuropathy, and nervous system disorders."
    },
];

const stats = [
    { label: "Specialties", value: `${specialties.length}+` },
    { label: "Expert Doctors", value: "500+" },
    { label: "Patients Served", value: "50K+" },
]

useHead({
    title: 'Homeopathic Specialties | HomeoDoctorsBD',
    meta: [
        { name: 'description', content: 'Explore all homeopathic treatment specialties. Find experienced homeopaths for constitutional treatment, chronic diseases, mental health, and more.' }
    ]
})
</script>

<template>
    <div class="min-h-screen bg-background">
        <PageHeader title="Treatment Specialties"
            description="Explore our comprehensive range of homeopathic treatment areas and find specialists for your health needs"
            :breadcrumbs="[
                { label: 'Home', href: '/' },
                { label: 'Specialties' }
            ]" :stats="stats" />

        <section class="py-12 lg:py-16 bg-background">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <NuxtLink v-for="(specialty, index) in specialties" :key="specialty.slug" :to="`/doctors`"
                        class="group card-premium p-6 transition-all duration-300 hover:-translate-y-1 "
                        :style="{ animationDelay: `${index * 0.05}s` }">
                        <div class="flex items-start gap-4">
                            <div class="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                                :class="specialty.colorClass">
                                <UIcon :name="specialty.icon" class="w-7 h-7" />
                            </div>
                            <div class="flex-1 min-w-0">
                                <h3
                                    class="font-display font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                                    {{ specialty.name }}
                                </h3>
                                <p class="text-sm text-muted-foreground mb-3 line-clamp-2">
                                    {{ specialty.description }}
                                </p>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-muted-foreground">
                                        {{ specialty.doctors }} Doctors
                                    </span>
                                    <div
                                        class="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <span>Find Doctors</span>
                                        <UIcon name="i-lucide-arrow-right"
                                            class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </section>


    </div>
</template>
