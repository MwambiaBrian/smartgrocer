import axios from 'axios'


const deliveryApi = axios.create({
    baseURL: "http://localhost:5005"
})


export const getProducts = async () => {
    const response = await deliveryApi.get("/delivery")
    return response.data
}

export default deliveryApi