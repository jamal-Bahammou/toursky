import axios from 'axios'

export const Axios = axios.create({
    baseURL: 'http://127.0.0.1:3030',
    headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Content-Type': 'application/json'},
})

Axios.defaults.withCredentials = true