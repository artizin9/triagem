import Usernull from "../../../../assets/imgs/usernull.svg"
import { useState } from "react"

export function YourInformations({foto, alunos, date, personal}){

    const Datas = [
        {Name: "Nome:", type: "text"},
        {Name: "Sobrenome:", type: "text"},
        {Name: "Email:", type: "text"},
        {Name: "Telefone:", type: "text"},
        {Name: "Senha:", type: "password"},
        {Name: "Estado:", type: "text"}
    ]

    const [edit, setEdit] = useState(false)
    const [hover, setHover] = useState(false)

    // Função para editar os dados, (o backend deve fazer isso)
    function DataEdit(){
        setEdit((prev) => !prev)
    }

    const formattedDate = date ? new Date(date).toLocaleDateString("pt-BR") : ""


    return (
        <>
        <div className="w-full p-1 md:mt-1 flex flex-col space-y-1 items-center ">
            <div className="aspect-square h-[30%] max-md:max-h-[20%] bg-black rounded-full flex items-center flex-col relative">
            <input
                            type='file'
                            disabled={!edit}
                            className={`absolute bottom-0 w-full h-full ${edit ? "cursor-pointer" : "cursor-default"} opacity-0 z-20`}
                            accept='image/*'
                        />
                <img
                    src={foto ? foto : Usernull}
                    className="w-full aspect-square rounded-full object-cover"
                />
            </div>

            <div className="flex items-center space-x-4 max-md:space-x-2 max-md:w-full max-md:justify-center max-md:flex-col max-md:space-y-2">
                <div 
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                draggable="true" 
                className="bg-white text-[#252424] duration-500 flex px-2 py-1 space-x-3 items-center  rounded-md shadow-md shadow-black md:hover:bg-[#333333] md:hover:text-white max-md:px-1">
                    <h1 className="font-aleo font-light max-md:text-[13px] max-md:whitespace-nowrap">Alunos cadrastrados: </h1>
                    <div className={`rounded-md px-2 max-md:text-[13px] flex items-center justify-center transition-all duration-500 ${
                    hover ? "bg-white text-black" : "bg-[#252424] text-[#fff4a3]"
                }`}>
                        {alunos.length}
                    </div>
                </div>

                <div 
                draggable="true"
                className="bg-white text-[#252424] flex px-2 py-1 space-x-2 items-center  rounded-md shadow-md shadow-black max-md:text-[13px] max-md:whitespace-nowrap max-md:px-1 max-md:space-x-1 max-md:-translate-x-[2px] md:hover:bg-[#333333] md:hover:text-white duration-500">
                    <h1>Criação da conta: </h1>
                    <h1>
                        {formattedDate}
                    </h1>
                </div>
            </div>
            <div className="w-full flex items-center justify-center h-[45%] max-md:h-[42%]">
        <div className="w-[90%] p-1 h-full grid grid-cols-3 max-md:grid-cols-2 gap-x-3 gap-y-0 place-items-center ml-6 max-md:ml-4">
            {Datas.map((item, index) => (
                <div key={index} className="flex justify-center  flex-col w-full text-white">
                    <label className="font-aleo max-md:text-[14px]">{item.Name}</label>
                    <input 
                        className="bg-[#2D2B2B] border-b border-b-white w-[90%] outline-none"
                        type={item.type}
                        readOnly={!edit}
                    />
                </div>
            ))}
        </div>
        </div>

            <button 
            onClick={edit ? DataEdit : () => setEdit(true) }
            className="bg-white rounded-md shadow shadow-black font-poltawski md:hover:bg-[#383737] md:hover:text-[#fff4a3] max-md:active:bg-[#313030] max-md:active:text-[#fff4a3] duration-500 px-1 py-0.5 w-[14%] text-[18px] flex items-center justify-center space-x-3 font-bold max-md:w-[30%]">
                <h1> { edit ? "Salvar" : "Editar"} </h1>
               {edit ? 
               (
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
               ) : 
               (
               <svg width="18" height="18" viewBox="0 0 18 18" className="max-md:w-4 max-md:h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 16H3.425L13.2 6.225L11.775 4.8L2 14.575V16ZM0 18V13.75L13.2 0.575C13.4 0.391667 13.6208 0.25 13.8625 0.15C14.1042 0.05 14.3583 0 14.625 0C14.8917 0 15.15 0.05 15.4 0.15C15.65 0.25 15.8667 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.7708 2.4 17.8625 2.65C17.9542 2.9 18 3.15 18 3.4C18 3.66667 17.9542 3.92083 17.8625 4.1625C17.7708 4.40417 17.625 4.625 17.425 4.825L4.25 18H0ZM12.475 5.525L11.775 4.8L13.2 6.225L12.475 5.525Z" fill="#currentColor"/>
                    </svg>
                )}
            </button>
        </div>
        </>
    )
}