import axios from 'axios'
import Cookies from 'js-cookie'
import { Error, MessageError, ErrorCreateStudent } from '../error/errorAuth'

const api = axios.create({
    baseURL: 'http://localhost:3333',
    withCredentials: true,
})

// configurando header com o token a cada requisição
api.interceptors.request.use(config => {
    const token = Cookies.get('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

export async function auth(data, setErro){
    try {
        const response = await api.post('/login', data) 
        return response.data
    } catch(error){
        setErro
        MessageError(error)
    }
}

export async function me(){
    try {
        const response = await api.get('/me')
        return response.data
    } catch(error){
        Error(error)
    }
}

export async function createUser(formData){
    try {
        const response = await api.post('/alunos', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    } catch (error) {
        ErrorCreateStudent(error)
    }    
}

export async function getUser(setAluno) {
    try {
        const response = await api.get('/alunos')
        const { alunos } = response.data
        const Aluno = alunos.map((aluno) => ({
            id: aluno.id,
            name: aluno.name,
            email: aluno.email,
            phone:  aluno.phone,
            state: aluno.state,
            city: aluno.city,
            file: api.defaults.baseURL + '/uploads/' + aluno.imageUrl
        }))
        setAluno(Aluno)
        return response.data
    } catch (error) {
        Error(error)
    }
}

export async function deleteUser(id) {
    try {
        const response = await api.delete(`/alunos/${id}`)
        return response.data
    } catch (error) {
       return Error(error)
    }
}
