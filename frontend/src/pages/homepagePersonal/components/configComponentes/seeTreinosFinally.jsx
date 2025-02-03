import { TreinosFinalizados } from "./ComponentTreinoFinally"
import "../alunosComponents/style.css"

{/* Os treinos so devem aparecer se o aluno colocou o dia, marcou*/}

export function SeeTreinoFinally({treinos, Close, Open}){

    return (
        <div className={`md:absolute w-[50%] max-md:w-[95%] top-0 h-[90%] -translate-y-4 bg-[#272727] z-30 p-2 rounded-md flex items-center flex-col duration-500 ${Open ? "scale-100 opacity-100 absolute" : "scale-125 opacity-0"}`}>
            <h1 className="text-white font-poltawski font-bold text-[35px] max-md:text-[26px] max-md:pt-2 items-center">{treinos ? "Exercicios feitos" : "Sem exercicios finalizados"}</h1>
            <div className="flex flex-col items-center w-[90%] h-full p-3 overflow-y-auto custom-scrollbar max-md:w-full">
                {treinos.map((item, index) => (
                    <TreinosFinalizados 
                    Treino={item}
                    key={index}
                    />
                ))}
            </div>

            <button onClick={Close} className="absolute top-1 left-0 text-white hover:text-red-500 duration-500 h-fit w-fit">
                <svg width="30" height="30" viewBox="0 0 31 37" className="max-md:h-9 max-md:w-9" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.82749 22.9235L8.42749 21.5235L14.0275 15.9235L8.42749 10.3235L9.82749 8.92346L15.4275 14.5235L21.0275 8.92346L22.4275 10.3235L16.8275 15.9235L22.4275 21.5235L21.0275 22.9235L15.4275 17.3235L9.82749 22.9235Z" fill="currentColor"/>
                </svg>
            </button>
        </div>
    )
}