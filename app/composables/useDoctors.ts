export const useDoctors = () => {
    const config = useRuntimeConfig()
    const apiBaseUrl = (config.public?.apiBaseUrl as string)

    const fetchAllDoctors = async (params: { search?: string, district_id?: string, area_id?: string, page?: number } = {}) => {
        return await $fetch<any>('/doctors', {
            baseURL: apiBaseUrl,
            params
        })
    }

    const fetchFeaturedDoctors = async () => {
        return await useFetch('/top-doctors', {
            baseURL: apiBaseUrl,
        })
    }

    const fetchDistricts = async () => {
        return await $fetch<any>('/district', {
            baseURL: apiBaseUrl,
        })
    }

    const fetchAreas = async (districtId: string | number) => {
        return await $fetch<any>('/area', {
            baseURL: apiBaseUrl,
            params: { district_id: districtId }
        })
    }

    const fetchDoctor = async (slug: string | any) => {
        return await useFetch(() => `/doctors/${unref(slug)}`, {
            baseURL: apiBaseUrl,
            key: `doctor-${unref(slug)}`,
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
