export const useBlogs = () => {
    const config = useRuntimeConfig()
    const apiBaseUrl = (config.public?.apiBaseUrl as string)

    const fetchBlogs = async (params: { search?: string, category_id?: string, page?: number } = {}) => {
        return await $fetch<any>('/blogs', {
            baseURL: apiBaseUrl,
            params
        })
    }

    const fetchBlogCategories = async () => {
        return await $fetch<any>('/blogs/categories', {
            baseURL: apiBaseUrl
        })
    }

    const fetchBlog = async (slug: string) => {
        return await useFetch(`/blogs/${slug}`, {
            baseURL: apiBaseUrl
        })
    }

    const fetchRelatedBlogs = async (slug: string) => {
        return await $fetch<any>(`/blogs/${slug}/related`, {
            baseURL: apiBaseUrl
        })
    }

    return {
        fetchBlogs,
        fetchBlogCategories,
        fetchBlog,
        fetchRelatedBlogs
    }
}

