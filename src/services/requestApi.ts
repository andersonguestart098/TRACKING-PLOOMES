import axios from "axios"

const requestApi = axios.create({
    baseURL: process.env.NEXTAUTH_URL
})

export default requestApi