
import axios from 'axios'

const ordersApi = axios.create({
    baseURL: "http://localhost:5004"
})

export const createOrder = async (order: object) => {
    const response = await ordersApi.post("/order", order)
    return response.data

}

export default ordersApi