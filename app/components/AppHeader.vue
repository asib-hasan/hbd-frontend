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
    { name: "Find Doctors", href: "/doctors" },
    // { name: "Specialties", href: "/specialties" },
    {
        name: "Locations",
        href: "#",
        children: [
            { name: "All Bangladesh", href: "/doctors" },
            { name: "Dhaka", href: "/doctors?search=Dhaka" },
            { name: "Chittagong", href: "/doctors?search=Chittagong" },
            { name: "Rajshahi", href: "/doctors?search=Rajshahi" },
            { name: "Khulna", href: "/doctors?search=Khulna" },
            { name: "Barishal", href: "/doctors?search=Barishal" },
            { name: "Sylhet", href: "/doctors?search=Sylhet" },
            { name: "Rangpur", href: "/doctors?search=Rangpur" },
            { name: "Mymensingh", href: "/doctors?search=Mymensingh" },
        ]
    },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
]
</script>

<template>
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        :class="isScrolled || isMenuOpen ? 'bg-background/95 backdrop-blur-xl shadow-sm border-b border-border/40' : 'bg-transparent'">
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
                    <div v-for="link in navLinks" :key="link.name" class="relative group"
                        @mouseenter="link.children && (openDropdown = link.name)"
                        @mouseleave="link.children && (openDropdown = null)">
                        <!-- Normal Link -->
                        <NuxtLink v-if="!link.children" :to="link.href"
                            class="px-3 py-2 text-sm text-foreground/70 hover:text-foreground font-medium transition-colors rounded-md hover:bg-muted/50">
                            {{ link.name }}
                        </NuxtLink>

                        <!-- Dropdown Trigger -->
                        <button v-else
                            class="flex items-center gap-1.5 px-3 py-2 text-sm text-foreground/70 hover:text-foreground font-medium transition-colors rounded-md hover:bg-muted/50">
                            {{ link.name }}
                            <UIcon name="i-lucide-chevron-down" class="w-3.5 h-3.5 transition-transform duration-200"
                                :class="openDropdown === link.name ? 'rotate-180 text-primary' : ''" />
                        </button>

                        <!-- Desktop Dropdown Menu -->
                        <div v-if="link.children"
                            class="absolute top-full left-0 pt-2 w-56 transition-all duration-200 origin-top-left"
                            :class="openDropdown === link.name ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'">
                            <div
                                class="bg-background/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] p-2 flex flex-col gap-1">
                                <NuxtLink v-for="child in link.children" :key="child.name" :to="child.href"
                                    class="px-3 py-2.5 text-sm text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors font-medium flex items-center justify-between group/link"
                                    @click="openDropdown = null">
                                    {{ child.name }}
                                    <UIcon name="i-lucide-arrow-right"
                                        class="w-3 h-3 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200" />
                                </NuxtLink>
                            </div>
                        </div>
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
                        <NuxtLink to="#">
                            <UButton variant="ghost" color="neutral" size="sm" class="h-9 px-3 text-sm">
                                Join as Doctor
                                <UIcon name="i-lucide-user-plus" class="w-4 h-4 mr-1.5" />
                            </UButton>
                        </NuxtLink>
                        <NuxtLink to="#">
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
                        <NuxtLink v-if="!link.children" :to="link.href"
                            class="block w-full text-left px-3 py-2.5 text-sm text-foreground hover:text-primary hover:bg-muted/50 rounded-md font-medium transition-colors"
                            @click="isMenuOpen = false">
                            {{ link.name }}
                        </NuxtLink>

                        <div v-else class="flex flex-col gap-1">
                            <button @click="openDropdown = openDropdown === link.name ? null : link.name"
                                class="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted/50 rounded-lg transition-colors">
                                {{ link.name }}
                                <UIcon name="i-lucide-chevron-down" class="w-4 h-4 transition-transform duration-200"
                                    :class="openDropdown === link.name ? 'rotate-180 text-primary' : ''" />
                            </button>

                            <div v-show="openDropdown === link.name" class="flex flex-col gap-1 pl-4 pr-2 pb-2">
                                <NuxtLink v-for="child in link.children" :key="child.name" :to="child.href"
                                    class="block w-full text-left px-3 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                                    @click="isMenuOpen = false; openDropdown = null">
                                    {{ child.name }}
                                </NuxtLink>
                            </div>
                        </div>
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
                            <NuxtLink to="#" @click="isMenuOpen = false">
                                <UButton variant="outline" size="sm" block class="justify-center w-full">
                                    Join as Doctor
                                </UButton>
                            </NuxtLink>
                            <NuxtLink to="#" @click="isMenuOpen = false">
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
