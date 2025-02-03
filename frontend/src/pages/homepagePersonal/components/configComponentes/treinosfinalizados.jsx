import { CardAlunoTreinoFinally } from "./cardAlunoForTrienofinally"
import { SeeTreinoFinally } from "./seeTreinosFinally"
import { useState } from "react"
import "../alunosComponents/style.css"

export function TrainingFinally({alunos, treinos}){

    const [Modal, setModal] = useState(false)

    return (
        <div className="w-full p-1 md:mt-1 flex flex-col space-y-10 items-center overflow-x-hidden overflow-y-auto custom-scrollbar relative h-full bg-[#2D2B2B]">
            <div className="flex flex-col items-center -space-y-2">
                <h1 className="text-white font-poltawski font-bold text-[40px] tracking-wider max-md:text-[24px] max-md:text-center"> Treinos finalizados</h1>
                <h2 className="text-white font-aleo font-light text-[20px] max-md:text-[16px] max-md:text-center"> Veja os treinos que seus alunos fizeram </h2>
            </div>

            <div className="w-full grid grid-cols-3 place-items-center gap-4 max-md:grid-cols-1">
                {alunos.map((item, index) => (
                    <CardAlunoTreinoFinally
                    key={index}
                    Aluno={item}
                    onOpenTreinoFinalizado={() => setModal(true)}
                    Tipo='info'
                />
                ))}
            </div>
            <SeeTreinoFinally 
            treinos={treinos}
            Open={Modal}
            Close={() => setModal(false)}>
            </SeeTreinoFinally>
        </div>
    )
}