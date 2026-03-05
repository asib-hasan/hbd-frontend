export const useDoctors = () => {
    const config = useRuntimeConfig()
    const apiBaseUrl = (config.public?.apiBaseUrl as string) || 'http://127.0.0.1:8000/api'

    const fetchAllDoctors = async (params: { search?: string, district_id?: string, area_id?: string, page?: number } = {}) => {
        return await useFetch('/doctors', {
            baseURL: apiBaseUrl,
            params
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

    return {
        fetchAllDoctors,
        fetchDistricts,
        fetchAreas
    }
}
