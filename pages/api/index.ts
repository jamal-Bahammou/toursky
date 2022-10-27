import axios from 'axios'

export const Axios = axios.create({
    baseURL: 'https://toursky.herokuapp.com',
    headers: {
        'Access-Control-Allow-Origin': 'https://toursky.herokuapp.com',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json'
    },
})