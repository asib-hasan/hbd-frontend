<script setup lang="ts">
useHead({
    title: 'HomeoDoctorsBD - Find & Book Expert Homeopathic Doctors Near You',
    meta: [
        { name: 'description', content: 'Connect with experienced homeopathic doctors across Bangladesh. Natural healing through holistic treatment. Book appointments instantly online.' },
        { name: 'keywords', content: 'homeopathy, homeopathic doctors, natural healing, holistic treatment, BHMS, constitutional treatment, Bangladesh' }
    ]
})
</script>

<template>
    <div class="min-h-screen bg-background">
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
    </div>
</template>
