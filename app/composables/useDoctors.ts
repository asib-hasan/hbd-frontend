export const useDoctors = () => {
    const config = useRuntimeConfig()
    const apiBaseUrl = (config.public?.apiBaseUrl as string) || 'http://127.0.0.1:8000/api'

    const fetchAllDoctors = async (params: { search?: string, district_id?: string, area_id?: string, page?: number } = {}) => {
        return await useFetch('/doctors', {
            baseURL: apiBaseUrl,
            params
        })
    }

    const fetchFeaturedDoctors = async () => {
        return await useFetch('/top-doctors', {
            baseURL: apiBaseUrl
        })
    }

    const fetchDistricts = async () => {
        return await useFetch('/district', {
            baseURL: apiBaseUrl,
        })
    }

    const fetchAreas = async (districtId: string | number) => {
        return await useFetch('/area', {
            baseURL: apiBaseUrl,
            params: { district_id: districtId }
        })
    }

    const fetchDoctor = async (slug: string) => {
        return await useFetch(`/doctors/${slug}`, {
            baseURL: apiBaseUrl,
        })
    }

    return {
        fetchAllDoctors,
        fetchFeaturedDoctors,
        fetchDistricts,
        fetchAreas,
        fetchDoctor
    }
}
