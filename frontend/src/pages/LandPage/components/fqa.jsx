import fqa from "../../../assets/imgs/fqa.png"
import { useState } from "react"

export function FQA() {

    const svgIcon = (isOpen) => (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transform transition-transform duration-500 ${isOpen ? "" : "rotate-180"}`}
        >
            <path d="M18.6 4L20 5.4L8.4 17H15V19H5V9H7V15.6L18.6 4Z" fill={isOpen ? "#FF1D15" : "white"} />
        </svg>
    )

    const [idAsk, setIdAsk] = useState(null)
    const asks = [
        {
            id: 1,
            ask: (<h1 className="font-bold font-poppins text-[20px] text-white pl-4">
                Preciso de <span className="text-primary-100">experiência </span>
                anterior para começar?
            </h1>),
            response: (<h2 className={`${open ? "font-medium font-albert text-[14px] text-primary-200" : "hidden"}`}>
                Não, nossos treinos são adaptáveis para todos os níveis, desde iniciantes até avançados. <span>Nossos profissionais estão prontos para ajudar você a começar e evoluir de acordo com seu ritmo.</span>
            </h2>)
        },
        {
            id: 2,
            ask: (<h1 className="font-bold font-poppins text-[20px] text-white pl-4">
                Vocês <span className="text-primary-100">oferecem </span>
                planos de treino online?
            </h1>),
            response: (<h2 className={`${open ? "font-medium font-albert text-[14px] text-primary-200" : "hidden"}`}>
                Sim, oferecemos treinos online personalizados, com acompanhamento remoto,
                <span> para que você possa treinar onde e quando quiser, com o suporte da nossa equipe.</span>
            </h2>)
        },
        {
            id: 3,
            ask: (<h1 className="font-bold font-poppins text-[20px] text-white pl-4">
                Posso treinar sem fazer <span className="text-primary-100">matrícula?</span>
            </h1>),
            response: (<h2 className={`${open ? "font-medium font-albert text-[14px] text-primary-200" : " font-medium font-albert text-[14px] text-primary-200 pl-4"}`}>
                Para garantir a qualidade do atendimento e o acesso aos nossos serviços, é necessário
                <span> realizar a matrícula. Isso nos permite oferecer um acompanhamento personalizado e adaptar os treinos às suas necessidades.</span>
            </h2>)
        },
        {
            id: 4,
            ask: (<h1 className="font-bold font-poppins text-[20px] text-white pl-4">
                Quais são os horários de <span className="text-primary-100">funcionamento?</span>
            </h1>),
            response: (<h2 className={`${open ? "font-medium font-albert text-[14px] text-primary-200" : "hidden"}`}>
                Estamos abertos todos os dias, com horários flexíveis
                para atender sua rotina. <span>Oferecemos opções de treinos pela manhã,
                tarde e noite, incluindo atendimento 24h em algumas unidades.</span>
            </h2>)
        },
    ]

    function Open(id) {
        setIdAsk(prevId => (prevId === id ? null : id));
    }

    return (
        <div className="w-full h-full items-center justify-center flex relative flex-col bg-[#171717] overflow-x-hidden">

            <div className="w-[95%] h-full pt-10 text-white flex flex-col">
                <div className="h-1/5 font-poppins font-semibold text-primary-100">
                    <div className="h-fit relative">
                        <h1 className="absolute opacity-40 -translate-y-6">FQA</h1>
                        <h1>FQA</h1>
                        <h1 className="absolute opacity-40">FQA</h1>
                    </div>
                </div>

                <h1 className="font-poppins font-extrabold text-[35px] mt-14 ">TEM ALGUMA <span className="text-primary-100"> DUVIDA?</span></h1>

                <h2 className="font-albert font-medium text-[18px] mb-14 text-primary-200">Veja algumas perguntas frequentes</h2>
            </div>

            <div className="w-[95%] flex items-center space-x-6">
                <img className="w-1/2 h-[70%]" src={fqa} />

                <div className="flex flex-col w-1/2 space-y-9">
                    {asks.map((item, index) => (
                        <div
                        key={index}
                        className="bg-[#1e1d1d] rounded-md shadow-black shadow-md flex-col"
                        >
                        <button 
                        value={idAsk}
                        onClick={() => Open(item.id)}
                        className="w-full py-7 relative text-left"
                        >
                            {item.ask}
                            <button 
                              onClick={() => Open(item.id)}
                            className="absolute right-1 bottom-2">
                                {svgIcon(idAsk === item.id)}
                            </button>
                        </button>
                        <div className={`${idAsk === item.id ? "w-full py-2 px-4" : "hidden"} font-medium font-albert text-[14px] text-primary-200`}> 
                            {item.response}
                        </div>
                        </div>
                    ))}
                </div>
            </div>

            <div draggable="true" className="w-full flex flex-col h-[30%] text-[#171717]">
                <h1>.</h1>
                <h1>.</h1>
                <h1>.</h1>
            </div>
        </div>
    )
}