import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3333',
    withCredentials: true
})

export async function auth(data){
    const response = await api.post('/login', data)
    return response.data
}

export async function me(){
    const response = await api.get('/me')
    return response.data
}

export async function userData(){
    const response = await api.get('/me')
    return response.data
}