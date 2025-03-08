import {Outlet, Navigate, useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';

export function ProtectRouters() {
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);
    const location = useLocation()
    const verificationPersonal = role === 'PERSONAL' && location.pathname.includes('aluno')
    const verificationAluno = role === 'CLIENTE' && location.pathname.includes('personal')

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('http://localhost:3333/me', {
                    withCredentials: true,
                });
                const Role = response.data.role;
                setRole(Role)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        getData()
    }, [])

    if (loading) return <div></div>

    if (!role) return <Navigate to="/auth" replace />

    if (verificationPersonal) return <Navigate to="/home/personal" replace />

    if (verificationAluno) return <Navigate to="/home/aluno" replace />

    return <Outlet />
}
