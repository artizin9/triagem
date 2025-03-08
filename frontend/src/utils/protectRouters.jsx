import {Outlet, Navigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'

export function ProtectRouters(){
    const [role, setRole] = useState(null)
    const HomePersonal = (<Navigate to='/home/personal' replace/>)
    const HomeAluno = (<Navigate to='/home/aluno' replace/>)

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('http://localhost:3333/me', {
                withCredentials: true
                })
                const role = response.data.role
                setRole(role)
            } catch (error) {
                console.log(error)
            }}

        getData()
    }, [])

    if (!role) return <Navigate to='/auth' replace/>

    return role === 'PERSONAL' ? HomePersonal : HomeAluno
}