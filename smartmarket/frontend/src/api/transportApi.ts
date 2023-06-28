import axios from 'axios'


const transportApi = axios.create({
    baseURL: "http://localhost:5005"
})


export const getTransports = async () => {
    const response = await transportApi.get("/transports")
    return response.data
}

export const addTransport = async (transport: object) => {
    const response = await transportApi.post("/transports", transport)
    return response.data

}


export default transportApi