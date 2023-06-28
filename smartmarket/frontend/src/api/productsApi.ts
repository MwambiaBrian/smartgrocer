import axios from 'axios'


const productsApi = axios.create({
    baseURL: "http://localhost:5003"
})


export const getProducts = async () => {
    const response = await productsApi.get("/products")
    return response.data
}

export const addProduct = async (product: object) => {
    const response = await productsApi.post("/products", product)
    return response.data

}


export default productsApi