import { useNavigate } from "react-router-dom"

export function Footer(){

    const Navigate = useNavigate()

    return (
        <div className="w-full h-full items-center justify-center flex relative flex-col bg-[#242424] overflow-x-hidden pt-2 p-2">
            <div className="space-y-5 flex flex-col text-white items-center justify-center mt-5">
                <h1 className="font-poppins font-extrabold text-[35px]">ESTÁ PREPARADO PARA ALCANÇAR SEUS OBJETIVOS?</h1>
                <button onClick={() => Navigate('/auth')} className="px-3 py-1.5 space-x-3 flex items-center justify-center bg-primary-100 shadow-sm shadow-black/40 rounded-lg">
                    <h1 className="font-poppins font-bold">COMEÇAR</h1>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.25 20V8.75H10V6.25H23.75V20H21.25ZM15 26.25V15H3.75V12.5H17.5V26.25H15Z" fill="white"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}