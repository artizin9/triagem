import { useNavigate } from "react-router-dom";
import axios from "axios";

const IconLogOut = (<svg className="w-[45%] aspect-square translate-x-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.77778 20C4.28889 20 3.87037 19.8259 3.52222 19.4778C3.17407 19.1296 3 18.7111 3 18.2222V5.77778C3 5.28889 3.17407 4.87037 3.52222 4.52222C3.87037 4.17407 4.28889 4 4.77778 4H11V5.77778H4.77778V18.2222H11V20H4.77778ZM14.5556 16.4444L13.3333 15.1556L15.6 12.8889H8.33333V11.1111H15.6L13.3333 8.84444L14.5556 7.55556L19 12L14.5556 16.4444Z" fill="#ff1d15"/>
    </svg>)
const ButtonClose = (<svg width="25" height="25" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.75933 17.05L4.49951 15.7937L9.53877 10.7684L4.49951 5.74315L5.75933 4.48684L10.7986 9.51209L15.8379 4.48684L17.0977 5.74315L12.0584 10.7684L17.0977 15.7937L15.8379 17.05L10.7986 12.0247L5.75933 17.05Z" fill="currentColor"/>
    </svg>)



export function ModalLogOut({Close, Open}){
    const Navigate = useNavigate()
    const Logout = async () => {
        try {
            await axios.post('http://localhost:3333/logout', {}, {withCredentials: true})
            Navigate('/auth')
        } catch(error){
            console.log(error)
        }
    }

    return (
        <div onClick={Close} className={`w-full h-full bg-black flex justify-center items-center bg-opacity-30 fixed insert-0 ${Open ? 'visible' : 'invisible'}`}>
            <div 
            onClick={(e) => e.stopPropagation()}
            className={`bg-[#131313] flex flex-col items-center justify-center px-2 w-[30%] h-[55%] rounded-lg relative duration-300 ease-in-out ${Open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}>
                {IconLogOut}
                <div className="flex flex-col w-full items-center justify-center pt-1 mt-3">
                    <h1 className="font-poppins font-bold text-[22px] text-white">SAIR DA CONTA</h1>
                    <h2 className="font-albert font-medium text-[14px] text-primary-200">Ao sair da conta você terá que logar novamente</h2>
                </div>
                <div className="w-full items-center h-1/5 flex justify-center pt-5">
                    <button onClick={Logout} className="flex items-center justify-center w-3/5 py-1 font-poppins font-semibold text-white bg-primary-100 text-[18px] rounded-lg">Sair</button>
                </div>

                <button onClick={Close} className="absolute w-fit h-fit top-2 left-1 hover:text-primary-100 text-white duration-500">
                    {ButtonClose}
                </button>
            </div>
        </div>
    )
}