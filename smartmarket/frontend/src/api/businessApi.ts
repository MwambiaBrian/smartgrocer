import axios from "axios"

const businessesApi = axios.create({
    baseURL: "http://localhost:5003"
})

export const getByOwnerId = async ({ownerId}) => {
    const response = await businessesApi.get(`/businesses/${ownerId}`, ownerId)
    return response.data
}

export const getById = async ({id}) => {
    const response = await businessesApi.get(`/businesses/${id}`)
    return response.data
}

export const getBusinesses = async () => {
    const response = await businessesApi.get("/businesses")
    return response.data
}

export const addBusiness = async (business: object) => {
    const response = await businessesApi.post("/businesses", business)
    return response.data

}

export const updateBusiness = async (business: object) => {
    const response = await businessesApi.patch(`/businesses/${business.id}`, business)
    return response.data
}

export const deleteBusiness = async ({id}) => {
    const response = await businessesApi.delete(`/businesses/${id}`, id)
    return response.data
}

export default businessesApi