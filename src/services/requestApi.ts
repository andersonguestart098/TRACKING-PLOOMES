import axios from "axios"

const requestApi = axios.create({
    baseURL: "http://localhost:3000"
})

export default requestApi