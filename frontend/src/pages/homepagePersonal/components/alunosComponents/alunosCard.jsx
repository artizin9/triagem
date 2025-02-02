import { useEffect } from "react" 
import userNull from '../../../../assets/imgs/usernull.svg'

export function CardAluno({Aluno, Edit, Remove, Tipo, onOpenTreino, onOpenDicas,}){

    const ButtonsTreino = [
        {
            id: 1,
            nome: 'Treino',
            img: (<svg width="24" height="24" viewBox="0 0 24 24" className="max-md:w-5 max-md:h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 19H6.425L16.2 9.225L14.775 7.8L5 17.575V19ZM3 21V16.75L16.2 3.575C16.4 3.39167 16.6208 3.25 16.8625 3.15C17.1042 3.05 17.3583 3 17.625 3C17.8917 3 18.15 3.05 18.4 3.15C18.65 3.25 18.8667 3.4 19.05 3.6L20.425 5C20.625 5.18333 20.7708 5.4 20.8625 5.65C20.9542 5.9 21 6.15 21 6.4C21 6.66667 20.9542 6.92083 20.8625 7.1625C20.7708 7.40417 20.625 7.625 20.425 7.825L7.25 21H3ZM15.475 8.525L14.775 7.8L16.2 9.225L15.475 8.525Z" fill="currentColor"/>
                </svg>),
            onClick: onOpenTreino
        },
    
        {
            id: 2, 
            nome: 'Dicas',
            img: (<svg width="28" height="28" viewBox="0 0 34 34" className="max-md:w-6 max-md:h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 20.1667V17.3333H9.91667V20.1667H0ZM0 14.5V11.6667H15.5833V14.5H0ZM0 8.83333V6H15.5833V8.83333H0ZM12.75 28.6667V24.3104L20.5771 16.5188C20.7896 16.3063 21.0257 16.1528 21.2854 16.0583C21.5451 15.9639 21.8049 15.9167 22.0646 15.9167C22.3479 15.9167 22.6194 15.9698 22.8792 16.076C23.1389 16.1823 23.375 16.3417 23.5875 16.5542L24.8979 17.8646C25.0868 18.0771 25.2344 18.3132 25.3406 18.5729C25.4469 18.8326 25.5 19.0924 25.5 19.3521C25.5 19.6118 25.4528 19.8774 25.3583 20.149C25.2639 20.4205 25.1104 20.6625 24.8979 20.875L17.1063 28.6667H12.75ZM14.875 26.5417H16.2208L20.5063 22.2208L19.8687 21.5479L19.1958 20.9104L14.875 25.1958V26.5417ZM19.8687 21.5479L19.1958 20.9104L20.5063 22.2208L19.8687 21.5479Z" fill="currentColor"/>
                </svg>),
            onClick: onOpenDicas
        }
    ]

    // Apenas a foto do aluno
    const foto = Aluno?.foto ? URL.createObjectURL(Aluno.foto) : userNull
    console.log("Renderizando aluno:", Aluno)
    
    return (
        <div className="bg-[#252424] min-h-[320px] max-h-[320px] max-md:min-w-[160px] mb-5 h-[65%] w-[80%] rounded-md shadow-md shadow-black flex flex-col p-2 max-md:pb-1 items-center relative  duration-500 hover:rounded-md ">
            <div className={`aspect-square h-[45%] max-h-[45%] max-md:h-[35%] max-md:h-max-[40%] bg-[#2e2d2d] rounded-full flex items-center flex-col`}>
                <img 
                src={foto}
                alt="Foto do Aluno" 
                className="w-fit aspect-square rounded-full object-cover"/>
            </div>
            <h1 className="font-aleo mt-2 max-md:mt-1 text-white text-[20px] max-md:text-[15px] whitespace-nowrap">{Aluno?.nome + ' ' + Aluno?.sobrenome}</h1>
            <div className="h-full flex-col justify-evenly items-center flex w-full max-md:text-center">
                <div className="flex flex-col items-center justify-center space-y-2 ">
                    <h2 className="font-aleo text-white max-md:text-[14px]">Email: <span className="text-[#FFF4A3] text-[14px]">{Aluno?.email}</span></h2>
                    <h2 className="font-aleo text-white max-md:text-[14px] max-md:text-center">Telefone: <span className="text-[#FFF4A3] text-[14px]">{Aluno?.telefone}</span> </h2>
                </div>
            {Tipo === 'aluno' ? ( 
                <button 
                onClick={Edit}
                className="w-1/2 bg-white font-poltawski flex justify-evenly items-center rounded-md py-0.5 md:py-1 shadow-md shadow-black text-[#252424] duration-500 font-bold hover:bg-[#3F3D3D] hover:text-[#fff4a3] space-x-2 px-1 text-[17px] max-md:w-2/3"> 
                    <h1> Editar </h1>
                    <svg width="18" height="18" viewBox="0 0 18 18" className="max-md:w-4 max-md:h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 16H3.425L13.2 6.225L11.775 4.8L2 14.575V16ZM0 18V13.75L13.2 0.575C13.4 0.391667 13.6208 0.25 13.8625 0.15C14.1042 0.05 14.3583 0 14.625 0C14.8917 0 15.15 0.05 15.4 0.15C15.65 0.25 15.8667 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.7708 2.4 17.8625 2.65C17.9542 2.9 18 3.15 18 3.4C18 3.66667 17.9542 3.92083 17.8625 4.1625C17.7708 4.40417 17.625 4.625 17.425 4.825L4.25 18H0ZM12.475 5.525L11.775 4.8L13.2 6.225L12.475 5.525Z" fill="#currentColor"/>
                    </svg>
                </button>) : (
                    <div className="w-full flex p-1 flex-nowrap justify-evenly items-center max-md:space-x-1  max-md:justify-between ">
                    {
                    ButtonsTreino.map((item) => (<button 
                    key = {item.id}
                    onClick={item.onClick}
                    className="w-[45%] bg-white font-poltawski flex justify-evenly items-center rounded-md py-1 shadow-md shadow-black text-[#252424] duration-500 font-bold hover:bg-[#3F3D3D] hover:text-[#fff4a3] space-x-2 px-1 text-[18px] max-md:text-[15px] max-md:space-x-0 max-md:w-[49%] max-md:justify-center max-md:py-1.5"> 
                        <h1 className={`${item.id === 1 ? 'translate-x-0.5' : ''}`}> {item.nome} </h1>
                        <div className={`${item.id === 2 ? 'translate-x-1 max-md:translate-y-0.5 translate-y-1 ' : 'max-md:translate-x-0.5' }`}>{item.img}</div>
                    </button>)
                    )} 
                    </div>
                )}
               
            </div>
            <button onClick={Remove} className="absolute top-2 right-1 max-md:top-0 max-md:right-0  text-white hover:text-red-500 duration-500">
                <svg width="31" height="37" viewBox="0 0 31 37" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.82749 22.9235L8.42749 21.5235L14.0275 15.9235L8.42749 10.3235L9.82749 8.92346L15.4275 14.5235L21.0275 8.92346L22.4275 10.3235L16.8275 15.9235L22.4275 21.5235L21.0275 22.9235L15.4275 17.3235L9.82749 22.9235Z" fill="currentColor"/>
                </svg>
            </button>

        </div>
    )
}