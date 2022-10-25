import axios from 'axios'

export const Axios = axios.create({
    baseURL: process.env.SERVER_HOST,
    headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Content-Type': 'application/json'},
})

Axios.defaults.withCredentials = true