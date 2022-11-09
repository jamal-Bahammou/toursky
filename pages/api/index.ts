import axios from 'axios'

// const URL = 'http://127.0.0.1:3030'
const URL = 'https://toursky.herokuapp.com'

export const Axios = axios.create({ baseURL: URL, withCredentials:true })