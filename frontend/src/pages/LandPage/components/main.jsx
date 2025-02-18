import { Logo } from "./logo"
import main from "../../../assets/imgs/main.avif"
import { useNavigate } from "react-router-dom"
import "./css/style.css"

export function Main() {

    const buttons = [
        { name: 'Serviços' },
        { name: 'About' },
        { name: 'FQA' }
    ]

    const Navigate = useNavigate()

    return (
        <div className="w-full h-[650px] items-center justify-center flex relative flex-col overflow-x-hidden">
            <img className="w-full h-full absolute -z-20" src={main}/>
            <div className="w-full h-full absolute -z-10 bg-[#1E1D1D] bg-opacity-80"/>
            <div className="w-[95%] h-full pt-4 text-white flex flex-col">

                <div className="w-full h-[32%]">
                    <div className="w-full p-1 rounded-full flex items-center justify-between px-1 bg-[#373535] bg-opacity-50 h-fit">

                        <div className="flex  justify-center space-x-6 ml-2">
                            <Logo />
                            <div className="flex space-x-8 font-albert text-[16px] font-medium mb-1">
                                {buttons.map((item, index) => (
                                    <button key={index} className="text-white md:hover:text-primary-100 duration-500">
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button onClick={Navigate('/auth')} className="px-2 py-0.5 w-[12%] h-fit font-poppins font-extrabold text-white bg-primary-100 rounded-md mr-6 hover:bg-red-500 duration-500">
                            Entrar
                        </button>
                    </div>
                </div>

                <div className="flex flex-col">
                    <h1 className="font-poppins font-extrabold text-[35px] text-white">VOCÊ MERECE <span className="text-primary-100">RESULTADOS</span> <span className="block"> E AQUI ISSO <span className="text-primary-100">ACONTECE!</span> </span></h1>
                    <h2 className="font-albert font-medium text-[16px] mt-5">Não importa o seu ponto de partida, o que importa é a sua  <span className="block">vontade de mudar. Aqui, você encontra suporte e motivação </span> para alcançar a sua melhor versão.</h2>

                    <button className="px-1 py-1.5 w-1/6 h-fit font-poppins font-extrabold text-white bg-primary-100 rounded-md mt-5 flex items-center justify-center space-x-5 duration-500 text-[17px] group">
                        <h1>CONTINUAR</h1>
                        <svg width="22" height="17" className="group-hover:animate-vibrate" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2.00353C9 0.375799 10.8407 -0.570208 12.1642 0.377318L20.7285 6.50858C21.8428 7.30637 21.8428 8.96322 20.7285 9.76101L12.1924 15.8721C10.8723 16.8171 9.03572 15.8786 9.02823 14.2551L9.01096 10.5109C9.01093 10.5049 9.00603 10.5 9 10.5H2.25C1.00736 10.5 0 9.49264 0 8.25C0 7.00736 1.00736 6 2.25 6H7C8.10457 6 9 5.10457 9 4V2.00353Z" fill="white" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="bg-primary-100 w-full h-[10%] blur-3xl absolute bottom-0 " />
        </div>
    )
}