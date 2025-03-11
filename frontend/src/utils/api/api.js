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


// CRUD Aluno
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

<<<<<<< HEAD
export async function updateUser(id, dataForm){
    try {
        const response = await api.put(`/alunos/${id}`, dataForm, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
        return response.data
    } catch (error){
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


// CRUD Treino

export async function createTraining(dataFormTraining){
    try {
        const response = await api.post('/treinos', dataFormTraining, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
        return response.data
    } catch (error) {
        Error(error)
    }
}

export async function getTraining(setTreino){
    try {
        const response = await api.get('/treinos')
        const { treinos } = response.data
        const treino = treinos.map((treino) => ({
            id: treino.id,
            name: treino.name,
            file: api.defaults.baseURL + '/uploads/' + treino.imageUrl,
            conclusionTime: treino.conclusionTime,
            levelTraining: treino.levelTraining,
            weekDay: treino.weekDay
        }))
        setTreino(treino)
        return response.data
    } catch (error) {
        Error(error)
    }
}

export async function updateTraining(id, dataFormTraining){
    try {
        const response = api.put(`/treinos/${id}/update`, dataFormTraining,{
            headers: {'Content-Type': 'multipart/form-data'}
        })
        return response.data
    } catch (error) {
        Error(error)
    }
}

export async function deleteTraining(id){
    try {
        const response = api.delete(`/treinos/${id}/delete`)
        return response.data
    } catch (error){
        Error(error)
    }
}

// CRUD Exercicio

export async function createExercise(id, formDataExercise){
    try {
        const response = api.post(`/treinos/${id}/exercicios`, formDataExercise, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
        response.data
    } catch (error){
        Error(error)
    }
}

export async function getExercise(id){
    try {
        const response = api.get(`/treinos/${id}/exercicios`)
    } catch (error){
        Error(error)
    }
}

export async function updateExercise(id, formDataExercise){
    try {
        const response = api.put(`/exercicios/${id}/update`, formDataExercise, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
        response.data
    } catch (error){
        Error(error)
    }
}

export async function deleteExercise(id){
    try {
        const response = api.delete(`/exercicios/${id}/delete`)
        return response.data
    } catch (error) {
        Error(error)
    }
}

// Conectar treino ao aluno

export async function createAlunotoTraining(idAluno, idTreino, data){
    try {
        const response = api.post(`/alunos/${idAluno}/treinos/${idTreino}/associate`, data,{
            headers: {'Content-Type': 'multipart/form-data'}
        })
        return response.data
    } catch (error) {
        Error(error)
    }
}

export async function getAlunotoTraining(idAluno){
    try{
        const response = api.get(`/alunos/${idAluno}/exercicios`)
    } catch (error){
        Error(error)
    }
}
export async function deleteAlunotoTraining(idAluno, idTreino){
    try {
        const response = api.delete(`/alunos/${idAluno}/treinos/${idTreino}/disassociate`)
        return response.data
    } catch (error){
        Error(error)
    }
}
