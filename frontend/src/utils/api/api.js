import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('token')
console.log(token)

const api = axios.create({
    baseURL: 'http://localhost:3333',
    withCredentials: true
})

export async function auth(data){
    const response = await api.post('/login', data) 
    return response.data
}

export async function me(){
    const token = Cookies.get('token')
    if (!token) throw new Error

    const response = await api.get('/me', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}

export async function userData(){
    const response = await api.get('/me')
    return response.data
}