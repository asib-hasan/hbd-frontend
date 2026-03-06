export const useBlogs = () => {
    const config = useRuntimeConfig()
    const apiBaseUrl = (config.public?.apiBaseUrl as string) || 'http://127.0.0.1:8000/api'

    const fetchBlogs = async (params: { search?: string, category_id?: string, page?: number } = {}) => {
        return await useFetch('/blogs', {
            baseURL: apiBaseUrl,
            params
        })
    }

    const fetchBlogCategories = async () => {
        return await useFetch('/blogs/categories', {
            baseURL: apiBaseUrl
        })
    }

    const fetchBlog = async (slug: string) => {
        return await useFetch(`/blogs/${slug}`, {
            baseURL: apiBaseUrl
        })
    }

    return {
        fetchBlogs,
        fetchBlogCategories,
        fetchBlog
    }
}
