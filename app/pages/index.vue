<script setup lang="ts">
const title = 'HomeoDoctorsBD - Find & Book Expert Homeopathic Doctors Near You'
const description = 'Connect with experienced homeopathic doctors across Bangladesh. Natural healing through holistic treatment. Book appointments instantly online.'

useSeoMeta({
    title: title,
    ogTitle: title,
    description: description,
    ogDescription: description,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
})

useHead({
    meta: [
        { name: 'keywords', content: 'homeopathy, homeopathic doctors, natural healing, holistic treatment, BHMS, constitutional treatment, Bangladesh' }
    ]
})
</script>

<template>
    <main class="min-h-screen bg-background">
        <AppHero />

        <!-- <AppSpecialties /> -->

        <AppFeaturedDoctors />

        <AppHowItWorks />

        <!-- Latest Blogs -->
        <AppLatestBlogs />

        <!-- FAQs -->
        <AppFaqs />

        <!-- Banners -->
        <AppBanners />
    </main>
</template>
