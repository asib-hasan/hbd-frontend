<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const openDropdown = ref<string | null>(null)
const user = ref(null) // Stubbed user for now

// const { auth } = useSupabaseClient() // If supabase was set up
// const user = useSupabaseUser()

const handleScroll = () => {
    isScrolled.value = window.scrollY > 20
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

const handleLogout = async () => {
    // await auth.signOut()
    // navigate to home
}

const navLinks = [
    { name: "Find Doctors", href: "/doctors/bangladesh" },
    { name: "Specialties", href: "/specialties" },
    {
        name: "Locations",
        href: "#",
        children: [
            { name: "All Bangladesh", href: "/doctors/bangladesh" },
            { name: "Dhaka", href: "/doctors/dhaka" },
            { name: "Chittagong", href: "/doctors/chittagong" },
            { name: "Sylhet", href: "/doctors/sylhet" },
            { name: "Rajshahi", href: "/doctors/rajshahi" },
            { name: "Khulna", href: "/doctors/khulna" },
        ]
    },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
]
</script>

<template>
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        :class="isScrolled ? 'bg-background/95 backdrop-blur-xl shadow-sm border-b border-border/40' : 'bg-background/90 backdrop-blur-md'">
        <div class="container mx-auto px-4">
            <div class="flex items-center justify-between h-16">
                <!-- Logo -->
                <NuxtLink to="/" class="flex items-center gap-2.5 group">
                    <div
                        class="w-9 h-9 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                        <UIcon name="i-lucide-leaf" class="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span class="font-display font-bold text-lg text-foreground">HomeoDoctorsBD</span>
                </NuxtLink>

                <!-- Desktop Navigation -->
                <nav class="hidden lg:flex items-center gap-1">
                    <div v-for="link in navLinks" :key="link.name" class="relative"
                        @mouseenter="link.children && (openDropdown = link.name)" @mouseleave="openDropdown = null">
                        <div v-if="link.children">
                            <button
                                class="flex items-center gap-1 px-3 py-2 text-sm text-foreground/70 hover:text-foreground font-medium transition-colors rounded-md hover:bg-muted/50">
                                {{ link.name }}
                                <UIcon name="i-lucide-chevron-down"
                                    class="w-3.5 h-3.5 transition-transform duration-200"
                                    :class="{ 'rotate-180': openDropdown === link.name }" />
                            </button>
                            <div class="absolute top-full left-0 pt-2 transition-all duration-150"
                                :class="openDropdown === link.name ? 'opacity-100 visible' : 'opacity-0 invisible'">
                                <div
                                    class="bg-background border border-border rounded-lg shadow-lg py-1.5 min-w-[160px]">
                                    <NuxtLink v-for="child in link.children" :key="child.name" :to="child.href"
                                        class="block px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors">
                                        {{ child.name }}
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                        <NuxtLink v-else :to="link.href"
                            class="px-3 py-2 text-sm text-foreground/70 hover:text-foreground font-medium transition-colors rounded-md hover:bg-muted/50">
                            {{ link.name }}
                        </NuxtLink>
                    </div>
                </nav>

                <!-- Desktop Actions -->
                <div class="hidden lg:flex items-center gap-2">
                    <template v-if="user">
                        <NuxtLink to="/profile">
                            <UButton variant="ghost" size="sm" class="h-9 px-3 text-sm">
                                <UIcon name="i-lucide-user" class="w-4 h-4 mr-1.5" />
                                Profile
                            </UButton>
                        </NuxtLink>
                        <UButton variant="outline" size="sm" @click="handleLogout" class="h-9 px-3 text-sm">
                            <UIcon name="i-lucide-log-out" class="w-4 h-4 mr-1.5" />
                            Logout
                        </UButton>
                    </template>
                    <template v-else>
                        <NuxtLink to="/auth">
                            <UButton variant="ghost" color="gray" size="sm" class="h-9 px-3 text-sm">
                                Login
                                <UIcon name="i-lucide-log-in" class="w-4 h-4 mr-1.5" />
                            </UButton>
                        </NuxtLink>
                        <NuxtLink to="/auth">
                            <UButton size="sm" class="h-9 px-4 text-sm">
                                Book Now
                            </UButton>
                        </NuxtLink>
                    </template>
                </div>

                <!-- Mobile Menu Button -->
                <button class="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
                    @click="isMenuOpen = !isMenuOpen">
                    <UIcon v-if="isMenuOpen" name="i-lucide-x" class="w-5 h-5" />
                    <UIcon v-else name="i-lucide-menu" class="w-5 h-5" />
                </button>
            </div>

            <!-- Mobile Menu -->
            <div v-if="isMenuOpen" class="lg:hidden py-4 border-t border-border animate-fade-in">
                <nav class="flex flex-col gap-1">
                    <div v-for="link in navLinks" :key="link.name">
                        <div v-if="link.children" class="py-1">
                            <span class="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">{{
                                link.name
                                }}</span>
                            <div class="mt-1">
                                <NuxtLink v-for="child in link.children" :key="child.name" :to="child.href"
                                    class="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
                                    @click="isMenuOpen = false">
                                    {{ child.name }}
                                </NuxtLink>
                            </div>
                        </div>
                        <NuxtLink v-else :to="link.href"
                            class="block w-full text-left px-3 py-2.5 text-sm text-foreground hover:text-primary hover:bg-muted/50 rounded-md font-medium transition-colors"
                            @click="isMenuOpen = false">
                            {{ link.name }}
                        </NuxtLink>
                    </div>
                    <div class="flex flex-col gap-2 pt-3 mt-3 border-t border-border">
                        <template v-if="user">
                            <NuxtLink to="/profile" @click="isMenuOpen = false">
                                <UButton variant="outline" size="sm" block class="justify-center w-full">
                                    <UIcon name="i-lucide-user" class="w-4 h-4 mr-1.5" />
                                    Profile
                                </UButton>
                            </NuxtLink>
                            <UButton variant="ghost" size="sm" block class="justify-center w-full"
                                @click="handleLogout(); isMenuOpen = false">
                                <UIcon name="i-lucide-log-out" class="w-4 h-4 mr-1.5" />
                                Logout
                            </UButton>
                        </template>
                        <template v-else>
                            <NuxtLink to="/auth" @click="isMenuOpen = false">
                                <UButton variant="outline" size="sm" block class="justify-center w-full">
                                    Login
                                </UButton>
                            </NuxtLink>
                            <NuxtLink to="/auth" @click="isMenuOpen = false">
                                <UButton size="sm" block class="justify-center w-full">
                                    Book Consultation
                                </UButton>
                            </NuxtLink>
                        </template>
                    </div>
                </nav>
            </div>
        </div>
    </header>
</template>
