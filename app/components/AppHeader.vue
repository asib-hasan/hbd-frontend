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

interface NavLink {
    name: string;
    href: string;
    children?: { name: string; href: string }[];
}

const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Find Doctors", href: "/doctors" },
    // { name: "Specialties", href: "/specialties" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
]
</script>

<template>
    <header class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 transition-shadow duration-300"
        :class="isScrolled ? 'shadow-md py-2' : 'shadow-sm py-3'">
        <div class="container mx-auto px-4 lg:px-8">
            <div class="flex items-center justify-between h-16 lg:h-20">
                <!-- Logo -->
                <NuxtLink to="/" class="flex items-center gap-2.5 flex-shrink-0 h-14 lg:h-20" style="clip-path: inset(0 -150px 0 0);">
                    <img src="~/assets/images/logo-new.png" alt="HomeoDoctorsBD Logo"
                        class="h-full w-auto scale-150 lg:scale-[1.6] origin-left mix-blend-multiply" />
                </NuxtLink>

                <!-- Desktop Navigation -->
                <nav class="hidden lg:flex items-center gap-8 flex-1 justify-center">
                    <div v-for="link in navLinks" :key="link.name" class="relative group"
                        @mouseenter="link.children && (openDropdown = link.name)"
                        @mouseleave="link.children && (openDropdown = null)">
                        <!-- Normal Link -->
                        <NuxtLink v-if="!link.children" :to="link.href"
                            class="text-[16px] font-medium text-gray-700 hover:text-primary transition-colors py-2"
                            active-class="text-primary font-semibold">
                            {{ link.name }}
                        </NuxtLink>

                        <div v-else class="relative">
                            <button class="flex items-center gap-1 text-[16px] font-medium text-gray-700 hover:text-primary transition-colors py-2">
                                {{ link.name }}
                                <UIcon name="i-lucide-chevron-down" class="w-4 h-4" />
                            </button>
                            <div v-show="openDropdown === link.name" class="absolute top-full left-0 w-48 bg-white border border-gray-200 shadow-lg rounded-lg py-2 mt-1">
                                <NuxtLink v-for="child in link.children" :key="child.name" :to="child.href"
                                    class="block px-4 py-2 text-[15px] text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                                    {{ child.name }}
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </nav>

                <!-- Desktop Actions -->
                <div class="hidden lg:flex items-center gap-3 flex-shrink-0">
                    <template v-if="user">
                        <NuxtLink to="/profile">
                            <UButton variant="soft" color="primary" size="md" class="font-medium">
                                <UIcon name="i-lucide-user" class="w-4 h-4 mr-2" />
                                My Profile
                            </UButton>
                        </NuxtLink>
                        <UButton variant="outline" color="gray" size="md" @click="handleLogout" class="font-medium">
                            Logout
                        </UButton>
                    </template>
                    <template v-else>
                        <NuxtLink to="#">
                            <UButton variant="ghost" color="primary" size="md" class="font-medium hover:bg-primary-50">
                                Join as Doctor
                            </UButton>
                        </NuxtLink>
                        <NuxtLink to="#">
                            <UButton color="primary" size="md" class="font-medium px-6 shadow-sm text-white">
                                Book Appointment
                            </UButton>
                        </NuxtLink>
                    </template>
                </div>

                <!-- Mobile Menu Button -->
                <button class="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                    @click="isMenuOpen = !isMenuOpen" aria-label="Toggle Menu">
                    <UIcon v-if="isMenuOpen" name="i-lucide-x" class="w-6 h-6" />
                    <UIcon v-else name="i-lucide-menu" class="w-6 h-6" />
                </button>
            </div>

            <!-- Mobile Menu -->
            <div v-if="isMenuOpen" class="lg:hidden py-4 border-t border-gray-100 mt-2">
                <nav class="flex flex-col gap-1">
                    <div v-for="link in navLinks" :key="link.name">
                        <NuxtLink v-if="!link.children" :to="link.href"
                            class="block w-full px-4 py-3 text-[16px] font-medium text-gray-700 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors"
                            active-class="text-primary bg-primary-50"
                            @click="isMenuOpen = false">
                            {{ link.name }}
                        </NuxtLink>
                        
                        <div v-else class="flex flex-col gap-1">
                            <button @click="openDropdown = openDropdown === link.name ? null : link.name"
                                class="flex items-center justify-between w-full px-4 py-3 text-[16px] font-medium text-gray-700 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors">
                                {{ link.name }}
                                <UIcon name="i-lucide-chevron-down" class="w-5 h-5 transition-transform"
                                    :class="openDropdown === link.name ? 'rotate-180 text-primary' : ''" />
                            </button>
                            <div v-show="openDropdown === link.name" class="flex flex-col gap-1 pl-4 pr-2 pb-2">
                                <NuxtLink v-for="child in link.children" :key="child.name" :to="child.href"
                                    class="block w-full px-4 py-2 text-[15px] text-gray-600 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors"
                                    @click="isMenuOpen = false; openDropdown = null">
                                    {{ child.name }}
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Mobile Actions -->
                    <div class="flex flex-col gap-3 pt-4 mt-2 border-t border-gray-100 px-2">
                        <template v-if="user">
                            <NuxtLink to="/profile" @click="isMenuOpen = false">
                                <UButton variant="soft" color="primary" size="lg" block class="justify-center font-medium">
                                    <UIcon name="i-lucide-user" class="w-5 h-5 mr-2" />
                                    My Profile
                                </UButton>
                            </NuxtLink>
                            <UButton variant="outline" color="gray" size="lg" block class="justify-center font-medium"
                                @click="handleLogout(); isMenuOpen = false">
                                Logout
                            </UButton>
                        </template>
                        <template v-else>
                            <NuxtLink to="#" @click="isMenuOpen = false">
                                <UButton variant="soft" color="primary" size="lg" block class="justify-center font-medium">
                                    Join as Doctor
                                </UButton>
                            </NuxtLink>
                            <NuxtLink to="#" @click="isMenuOpen = false">
                                <UButton color="primary" size="lg" block class="justify-center font-medium shadow-sm text-white">
                                    Book Appointment
                                </UButton>
                            </NuxtLink>
                        </template>
                    </div>
                </nav>
            </div>
        </div>
    </header>
</template>
