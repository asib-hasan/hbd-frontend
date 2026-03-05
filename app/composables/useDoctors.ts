export const useDoctors = () => {
    const config = useRuntimeConfig()
    // Default to the typical local Laravel port if not provided
    const apiBaseUrl = (config.public?.apiBaseUrl as string) || 'http://127.0.0.1:8000/api'

    const fetchAllDoctors = async () => {
        return await useFetch('/doctors', {
            baseURL: apiBaseUrl,
        })
    }

    return {
        fetchAllDoctors
    }
}
