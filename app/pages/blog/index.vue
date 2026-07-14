<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useBlogs } from '~/composables/useBlogs'
import PageHeader from '~/components/PageHeader.vue'
import BlogCard from '~/components/BlogCard.vue'

const searchQuery = ref("")
const selectedCategory = ref("all")
const categoriesData = ref<any[]>([])

const { fetchBlogs, fetchBlogCategories } = useBlogs()

const apiResponse = ref<any>(null)
const pending = ref(true)

const processedBlogs = computed(() => {
    const responseData = apiResponse.value?.data
    const rawData = Array.isArray(responseData) ? responseData : (responseData?.data || [])
    return rawData
})

const getBlogs = async (page = 1) => {
    pending.value = true
    try {
        const response = await fetchBlogs({
            search: searchQuery.value,
            category_id: selectedCategory.value === 'all' ? '' : selectedCategory.value,
            page: page
        })
        apiResponse.value = response
    } catch (e) {
        console.error('Failed to fetch blogs:', e)
    } finally {
        pending.value = false
    }
}

const getCategories = async () => {
    try {
        const response = await fetchBlogCategories()
        categoriesData.value = response?.data || []
    } catch (e) {
        console.error('Failed to fetch blog categories:', e)
    }
}

onMounted(() => {
    getCategories()
    getBlogs()
})

const debouncedSearch = ref("")
let timeoutId: any = null

watch(searchQuery, (newVal) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
        debouncedSearch.value = newVal
    }, 500)
})

watch([debouncedSearch, selectedCategory], () => {
    getBlogs()
})

useHead({
    title: 'Health & Wellness Blog | HomeoDoctorsBD',
    meta: [
        { name: 'description', content: 'Explore articles, tips, and insights about homeopathy and natural healing from our expert practitioners.' }
    ]
})
</script>

<template>
    <div class="min-h-screen bg-background">
        <PageHeader title="Health & Wellness Blog"
            description="Explore articles, tips, and insights about homeopathy and natural healing from our expert practitioners."
            :breadcrumbs="[
                { label: 'Blog' }
            ]" />

        <section class="py-12 lg:py-16">
            <div class="container mx-auto px-4">
                <!-- Search and Filter -->
                <div class="flex flex-col xl:flex-row gap-4 mb-10 items-stretch">
                    <div class="relative flex-1 min-w-[280px] lg:max-w-md shrink-0">
                        <UIcon name="i-lucide-search"
                            class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                        <input type="text" placeholder="Search articles by title..." v-model="searchQuery"
                            class="w-full h-12 pl-10 pr-4 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all font-sans text-sm" />
                    </div>

                    <div class="flex gap-2 w-full overflow-x-auto pb-2 scrollbar-none snap-x mask-fade-edges">
                        <button @click="selectedCategory = 'all'"
                            class="whitespace-nowrap px-5 py-3 rounded-xl text-sm font-semibold transition-all snap-start shadow-sm active:scale-95"
                            :class="selectedCategory === 'all'
                                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                : 'bg-background border border-input text-foreground hover:bg-accent hover:text-accent-foreground'">
                            All Articles
                        </button>
                        <button v-for="cat in categoriesData" :key="cat.id" @click="selectedCategory = String(cat.id)"
                            class="whitespace-nowrap px-5 py-3 rounded-xl text-sm font-semibold transition-all snap-start shadow-sm active:scale-95"
                            :class="selectedCategory === String(cat.id)
                                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                : 'bg-background border border-input text-foreground hover:bg-accent hover:text-accent-foreground'">
                            {{ cat.name_en }}
                        </button>
                    </div>
                </div>

                <!-- Loading State -->
                <div v-if="pending" class="flex justify-center items-center py-20">
                    <UIcon name="i-lucide-loader-2" class="w-10 h-10 animate-spin text-primary" />
                </div>

                <!-- Blog Grid -->
                <div v-else-if="processedBlogs.length > 0">
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        <BlogCard v-for="(post, index) in processedBlogs" :key="post.id" v-bind="post" :index="index" />
                    </div>

                    <!-- Pagination -->
                    <!-- Wait API Pagination implementation inside (apiResponse.meta) -->
                    <div v-if="(apiResponse?.meta?.last_page || 1) > 1" class="flex justify-center mt-12 gap-2">
                        <UButton v-for="page in apiResponse.meta.last_page" :key="page"
                            :variant="page === apiResponse.meta.current_page ? 'solid' : 'soft'" @click="getBlogs(page)"
                            class="w-10 h-10 flex items-center justify-center font-bold">
                            {{ page }}
                        </UButton>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-else class="text-center py-24 px-4 bg-muted/20 rounded-3xl border border-dashed border-border">
                    <div
                        class="bg-background w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft">
                        <UIcon name="i-lucide-file-x" class="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 class="text-2xl font-display font-bold text-foreground mb-3">No articles found</h3>
                    <p class="text-muted-foreground text-lg max-w-md mx-auto">
                        We couldn't find any articles matching your search criteria. Try a different term or select
                        another category.
                    </p>
                    <UButton @click="selectedCategory = 'all'; searchQuery = ''"
                        class="mt-8 px-6 shadow-soft font-bold rounded-xl h-12" size="lg">
                        Clear all filters
                        <UIcon name="i-lucide-refresh-cw" class="w-4 h-4 ml-2" />
                    </UButton>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
    display: none;
}

.scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.mask-fade-edges {
    mask-image: linear-gradient(to right, black 90%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, black 90%, transparent 100%);
}
</style>
