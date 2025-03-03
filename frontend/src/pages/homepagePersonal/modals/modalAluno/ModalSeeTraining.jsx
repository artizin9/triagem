import { CardTreino } from "../../components/CardTreino"
import { useEffect, useState } from "react"
import { Component1 } from "../../components/ComponenteSeeTraining"
import { Component2 } from "../../components/ComponenteTrainingFinallyy"


const SeeTreinoFinally = (<svg width="22" height="17" viewBox="0 0 22 17" className='rotate-180' fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2.00353C9 0.375799 10.8407 -0.570208 12.1642 0.377318L20.7285 6.50858C21.8428 7.30637 21.8428 8.96322 20.7285 9.76101L12.1924 15.8721C10.8723 16.8171 9.03572 15.8786 9.02823 14.2551L9.01096 10.5109C9.01093 10.5049 9.00603 10.5 9 10.5H2.25C1.00736 10.5 0 9.49264 0 8.25C0 7.00736 1.00736 6 2.25 6H7C8.10457 6 9 5.10457 9 4V2.00353Z" fill="currentColor" />
</svg>)

const SeeTreino = (<svg width="22" height="17" viewBox="0 0 22 17" className='' fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2.00353C9 0.375799 10.8407 -0.570208 12.1642 0.377318L20.7285 6.50858C21.8428 7.30637 21.8428 8.96322 20.7285 9.76101L12.1924 15.8721C10.8723 16.8171 9.03572 15.8786 9.02823 14.2551L9.01096 10.5109C9.01093 10.5049 9.00603 10.5 9 10.5H2.25C1.00736 10.5 0 9.49264 0 8.25C0 7.00736 1.00736 6 2.25 6H7C8.10457 6 9 5.10457 9 4V2.00353Z" fill="currentColor" />
</svg>)

export function SeeTraining({Open, Close, Alunos, WithDraw, SeeExercise}) {
    
    const [id, setId] = useState(1)

    const RenderComponent = () => {
        switch (id) {
            case 1:
                return <Component1 Alunos={Alunos} WithDraw={WithDraw} SeeExercise={SeeExercise}/>
            case 2:
                return <Component2/>
        }
    }

    return (
        <div onClick={Close} className={`w-full h-full bg-black flex justify-center items-center bg-opacity-30 fixed insert-0 ${Open ? 'visible' : 'invisible'}`}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={`h-[90%] w-3/5 flex flex-col items-center relative rounded-lg shadow-md shadow-black/60 bg-[#131313] pt-1 duration-300 ease-in-out ${Open ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}>
                <div className="flex flex-col text-center mt-4">
                    <h1 className="font-poppins font-extrabold text-[26px] text-white">{id === 1 ? "VISUALIZE OS TREINOS DO SEU" : "TREINOS"} <span className="text-primary-100">{id === 1 ? "ALUNO" : "FINALIZADO"}</span></h1>
                    <h1 className="font-albert font-medium text-[16px] text-white">{id === 1 ? "Visualize os exercicios ou retire o treino de seu aluno" : "Visualize os exercicios que seu aluno já finalizou"}</h1>
                </div>

                <div className="w-4/5 grid grid-cols-3 gap-4 pt-8 h-full overflow-y-auto ml-4">
                    {RenderComponent()}
                </div>  

                <button onClick={Close} className={`absolute w-fit h-fit top-2 left-1 hover:text-primary-100 text-white duration-500 ${id === 1 ? "" : "hidden"}`}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.75933 17.05L4.49951 15.7937L9.53877 10.7684L4.49951 5.74315L5.75933 4.48684L10.7986 9.51209L15.8379 4.48684L17.0977 5.74315L12.0584 10.7684L17.0977 15.7937L15.8379 17.05L10.7986 12.0247L5.75933 17.05Z" fill="currentColor" />
                    </svg>
                </button>

                {id === 1 ? (
                    <button onClick={() => setId(2)} className="absolute w-fit h-fit top-2 right-1 hover:text-primary-100 text-white duration-500">
                        {SeeTreino}
                    </button>
                )
                :
                (
                    <button onClick={() => setId(1)} className="absolute w-fit h-fit top-2 left-1 hover:text-primary-100 text-white duration-500">
                        {SeeTreinoFinally}
                    </button>
                )}
        </div>

        </div>
    )
}