<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const { t } = useI18n()
const localePath = useLocalePath()

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const openDropdown = ref<string | null>(null)
const user = ref(null) // Stubbed user for now

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

const navLinks = computed<NavLink[]>(() => [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.doctors"), href: "/doctors" },
    { 
        name: t("nav.locations"), 
        href: "#",
        children: [
            { name: t("nav.location_list.mirpur"), href: "/locations/mirpur" },
            { name: t("nav.location_list.uttara"), href: "/locations/uttara" },
            { name: t("nav.location_list.farmgate"), href: "/locations/farmgate" },
            { name: t("nav.location_list.dhanmondi"), href: "/locations/dhanmondi" },
            { name: t("nav.location_list.mohammadpur"), href: "/locations/mohammadpur" },
            { name: t("nav.location_list.bashundhara"), href: "/locations/bashundhara" },
            { name: t("nav.location_list.wari"), href: "/locations/wari" },
            { name: t("nav.location_list.banani"), href: "/locations/banani" },
            { name: t("nav.location_list.gulshan"), href: "/locations/gulshan" },
            { name: t("nav.location_list.badda"), href: "/locations/badda" },
            { name: t("nav.location_list.jatrabari"), href: "/locations/jatrabari" },
            { name: t("nav.location_list.malibagh"), href: "/locations/malibagh" },
            { name: t("nav.location_list.view_all"), href: "/doctors" },
        ]
    },
    { name: t("nav.blogs"), href: "/blog" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.contact"), href: "/contact" },
])

const route = useRoute()
const { locale } = useI18n()

const isActive = (href: string) => {
    if (href === '#') return false
    const linkPath = localePath(href)
    
    // Exact match for home
    if (href === '/') {
        return route.path === linkPath || route.path === linkPath + '/'
    }
    
    // Doctors matches both /doctors and /doctor/[slug]
    if (href === '/doctors') {
        const docListPath = localePath('/doctors')
        const prefix = locale.value === 'en' ? '' : `/${locale.value}`
        return route.path.startsWith(docListPath) || route.path.startsWith(`${prefix}/doctor/`)
    }
    
    // Others (like /blog) match themselves and their sub-paths
    return route.path === linkPath || route.path.startsWith(linkPath + '/')
}
</script>

<template>
    <header class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 transition-shadow duration-300"
        :class="isScrolled ? 'shadow-md py-2' : 'shadow-sm py-3'">
        <div class="container mx-auto px-4 lg:px-8">
            <div class="flex items-center justify-between h-16 lg:h-20">
                <!-- Logo -->
                <NuxtLink :to="localePath('/')" class="flex items-center gap-2.5 flex-shrink-0 h-14 lg:h-20" style="clip-path: inset(0 -150px 0 0);">
                    <img src="~/assets/images/logo-new.png" alt="HomeoDoctorsBD Logo"
                        class="h-full w-auto scale-150 lg:scale-[1.6] origin-left mix-blend-multiply" />
                </NuxtLink>

                <!-- Desktop Navigation -->
                <nav class="hidden lg:flex items-center gap-8 flex-1 justify-center">
                    <div v-for="link in navLinks" :key="link.name" class="relative group"
                        @mouseenter="link.children && (openDropdown = link.name)"
                        @mouseleave="link.children && (openDropdown = null)">
                        <!-- Normal Link -->
                        <NuxtLink v-if="!link.children" :to="localePath(link.href)"
                            class="text-lg font-medium transition-colors py-2"
                            :class="isActive(link.href) ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary'"
                            >
                            {{ link.name }}
                        </NuxtLink>

                        <div v-else class="relative">
                            <button class="flex items-center gap-1 text-lg transition-colors py-2"
                                :class="isActive(link.href) ? 'text-primary font-semibold' : 'font-medium text-gray-700 hover:text-primary'">
                                {{ link.name }}
                                <UIcon name="i-lucide-chevron-down" class="w-4 h-4" />
                            </button>
                            <!-- Removed mt-1 and added a small top padding to bridge any gap -->
                            <div v-show="openDropdown === link.name" class="absolute top-full left-0 pt-2 w-72 z-50">
                                <div class="bg-white border border-gray-200 shadow-lg rounded-lg py-2">
                                    <NuxtLink v-for="child in link.children" :key="child.name" :to="localePath(child.href)"
                                        class="block px-4 py-2 text-base text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                                        {{ child.name }}
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <!-- Desktop Actions -->
                <div class="hidden lg:flex items-center gap-3 flex-shrink-0">
                    <LanguageSwitcher />
                    <template v-if="user">
                        <NuxtLink :to="localePath('/profile')">
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
                        <a href="https://docs.google.com/forms/d/1GLUZs7eHcgMfOm3QBkNvXqo4ED5zqU1r4Pnl48yCyL4/" target="_blank" rel="noopener noreferrer">
                            <UButton color="primary" size="md" class="font-medium px-6 shadow-sm text-white">
                                Join as Doctor
                            </UButton>
                        </a>
                    </template>
                </div>

                <!-- Mobile Menu Button -->
                <div class="flex items-center gap-2 lg:hidden">
                    <LanguageSwitcher />
                    <button class="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                        @click="isMenuOpen = !isMenuOpen" aria-label="Toggle Menu">
                        <UIcon v-if="isMenuOpen" name="i-lucide-x" class="w-6 h-6" />
                        <UIcon v-else name="i-lucide-menu" class="w-6 h-6" />
                    </button>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div v-if="isMenuOpen" class="lg:hidden py-4 border-t border-gray-100 mt-2">
                <nav class="flex flex-col gap-1">
                    <div v-for="link in navLinks" :key="link.name">
                        <NuxtLink v-if="!link.children" :to="localePath(link.href)"
                            class="block w-full px-4 py-3 text-lg font-medium hover:text-primary hover:bg-primary-50 rounded-lg transition-colors"
                            :class="isActive(link.href) ? 'text-primary bg-primary-50' : 'text-gray-700'"
                            @click="isMenuOpen = false">
                            {{ link.name }}
                        </NuxtLink>
                        
                        <div v-else class="flex flex-col gap-1">
                            <button @click="openDropdown = openDropdown === link.name ? null : link.name"
                                class="flex items-center justify-between w-full px-4 py-3 text-lg hover:text-primary hover:bg-primary-50 rounded-lg transition-colors"
                                :class="isActive(link.href) ? 'text-primary bg-primary-50 font-semibold' : 'font-medium text-gray-700'">
                                {{ link.name }}
                                <UIcon name="i-lucide-chevron-down" class="w-5 h-5 transition-transform"
                                    :class="openDropdown === link.name ? 'rotate-180 text-primary' : ''" />
                            </button>
                            <div v-show="openDropdown === link.name" class="flex flex-col gap-1 pl-4 pr-2 pb-2">
                                <NuxtLink v-for="child in link.children" :key="child.name" :to="localePath(child.href)"
                                    class="block w-full px-4 py-2 text-base text-gray-600 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors"
                                    @click="isMenuOpen = false; openDropdown = null">
                                    {{ child.name }}
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Mobile Actions -->
                    <div class="flex flex-col gap-3 pt-4 mt-2 border-t border-gray-100 px-2">
                        <template v-if="user">
                            <NuxtLink :to="localePath('/profile')" @click="isMenuOpen = false">
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
                            <a href="https://docs.google.com/forms/d/1GLUZs7eHcgMfOm3QBkNvXqo4ED5zqU1r4Pnl48yCyL4/" target="_blank" rel="noopener noreferrer" @click="isMenuOpen = false">
                                <UButton color="primary" size="lg" block class="justify-center font-medium shadow-sm text-white">
                                    Join as Doctor
                                </UButton>
                            </a>
                        </template>
                    </div>
                </nav>
            </div>
        </div>
    </header>
</template>
