import axios from "axios"

const requestApi = axios.create({
    baseURL: "http://192.168.0.104:3000"
})

export default requestApi