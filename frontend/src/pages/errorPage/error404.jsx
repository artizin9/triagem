import { useState} from "react"
import { me } from "../../utils/api/api"
import { Error } from "../../utils/error/errorAuth"
import { Loading } from "../loading/loading"
import { useNavigate } from "react-router-dom"

export function ErrorPage() {
    const [loading, setLoading] = useState(false)
    const Navigate = useNavigate()

    async function userVerification() {
        setLoading(true)
        try {
            const response = await me()

            if (!response.data) {
                Navigate('/auth')
                return
            }

            const role = response.data.role
            setTimeout(() => {
                if (role === 'PERSONAL') {
                    Navigate('/home/personal')
                } else {
                    Navigate('/home/aluno')
                }
            }, 1500)
        } catch (err) {
            Error(err)
            Navigate('/')
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <Loading />

    return (
        <div className="w-screen h-screen bg-primary-400 flex justify-center items-center space-y-6 relative flex-col">
            <h1 className='font-extrabold font-poppins text-[50px] text-white absolute top-2'>Fit <span className="text-primary-100">Sync</span> </h1>
                <div className="flex flex-col items-center">
                <h1 className="font-poppins font-extrabold text-[80px] text-white">404</h1>
                <h1 className="font-albert font-medium text-[25px] text-white">Ops... Parece que aconteceu um erro</h1>
                </div>
            
                <button 
                    onClick={userVerification} 
                    className="font-poppins w-[15%] font-extrabold text-primary-400 rounded-xl bg-white px-4 py-1 text-center duration-500 hover:bg-primary-100 hover:text-white text-[18px] "
                >
                    Voltar
                </button>
        </div>
    )
}
