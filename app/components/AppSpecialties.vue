<script setup lang="ts">
const specialties = [
    { icon: 'i-lucide-leaf', name: "Constitutional Treatment", doctors: 65, color: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white" },
    { icon: 'i-lucide-activity', name: "Chronic Diseases", doctors: 52, color: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white" },
    { icon: 'i-lucide-heart', name: "Heart & Circulation", doctors: 38, color: "bg-rose-500/10 text-rose-500 group-hover:bg-rose-500 group-hover:text-white" },
    { icon: 'i-lucide-brain', name: "Mental Health", doctors: 32, color: "bg-violet-500/10 text-violet-500 group-hover:bg-violet-500 group-hover:text-white" },
    { icon: 'i-lucide-baby', name: "Child Care", doctors: 45, color: "bg-pink-500/10 text-pink-500 group-hover:bg-pink-500 group-hover:text-white" },
    { icon: 'i-lucide-flower-2', name: "Women's Health", doctors: 48, color: "bg-fuchsia-500/10 text-fuchsia-500 group-hover:bg-fuchsia-500 group-hover:text-white" },
    { icon: 'i-lucide-shield', name: "Skin Disorders", doctors: 41, color: "bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white" },
    { icon: 'i-lucide-bone', name: "Joint & Bone Disorders", doctors: 35, color: "bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white" },
];
</script>

<template>
    <section id="specialties" class="section-padding bg-background relative overflow-hidden">
        <!-- Background Decoration -->
        <div class="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-muted/30 to-transparent" />
        <div
            class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl" />

        <div class="container mx-auto px-4 relative z-10">
            <!-- Section Header -->
            <div class="section-header">
                <span class="badge badge-primary mb-4 ">
                    <UIcon name="i-lucide-sparkles" class="w-4 h-4" />
                    Treatment Areas
                </span>
                <h2
                    class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4  stagger-1">
                    Browse by <span class="text-gradient">Specialty</span>
                </h2>
                <p class="text-lg text-muted-foreground  stagger-2">
                    Find experienced homeopathic doctors across all major treatment specializations
                </p>
            </div>

            <!-- Specialties Grid -->
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                <div v-for="(specialty, index) in specialties" :key="specialty.name"
                    class="group card-premium p-6 transition-all duration-300 hover:-translate-y-1 "
                    :style="{ animationDelay: `${index * 0.08}s` }">
                    <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300"
                        :class="specialty.color">
                        <UIcon :name="specialty.icon" class="w-7 h-7" />
                    </div>
                    <h3
                        class="font-display font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                        {{ specialty.name }}
                    </h3>
                    <p class="text-sm text-muted-foreground mb-4">
                        {{ specialty.doctors }} Doctors
                    </p>
                    <div
                        class="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                        <span>View All</span>
                        <UIcon name="i-lucide-arrow-right"
                            class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>

            <!-- View All Button -->
            <div class="text-center mt-12">
                <NuxtLink to="/specialties">
                    <UButton variant="outline" size="lg" class="gap-2">
                        View All Specialties
                        <UIcon name="i-lucide-arrow-right" class="w-5 h-5" />
                    </UButton>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
