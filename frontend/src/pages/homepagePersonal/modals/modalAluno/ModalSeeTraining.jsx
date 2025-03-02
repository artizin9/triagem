import { CardTreino } from "../../components/CardTreino"
import { useEffect, useState } from "react"

export function SeeTraining({Open, Close, Alunos, WithDraw, SeeExercise}) {
    
    return (
        <div onClick={Close} className={`w-full h-full bg-black flex justify-center items-center bg-opacity-30 fixed insert-0 ${Open ? 'visible' : 'invisible'}`}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={`h-[90%] w-3/5 flex flex-col items-center relative rounded-lg shadow-md shadow-black/60 bg-[#131313] pt-1 duration-300 ease-in-out ${Open ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}>
                <div className="flex flex-col text-center mt-4">
                    <h1 className="font-poppins font-extrabold text-[26px] text-white">VISUALIZE OS TREINOS DO SEU <span className="text-primary-100">ALUNO</span></h1>
                    <h1 className="font-albert font-normal text-[16px] text-white">Visualize os exercicios ou retire o treino de seu aluno</h1>
                </div>

                <div className="w-4/5 grid grid-cols-3 gap-4 pt-4 h-full overflow-y-auto ml-4">
                    {Alunos?.training?.map((aluno) => {
                        return (
                            <CardTreino
                                key={aluno.id}
                                treino={aluno.training}
                                WithDraw={WithDraw}
                                SeeExercise={SeeExercise}
                                type=""
                            />
                        )
                    })}
                </div>  

                <button onClick={Close} className="absolute w-fit h-fit top-2 left-1 hover:text-primary-100 text-white duration-500">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.75933 17.05L4.49951 15.7937L9.53877 10.7684L4.49951 5.74315L5.75933 4.48684L10.7986 9.51209L15.8379 4.48684L17.0977 5.74315L12.0584 10.7684L17.0977 15.7937L15.8379 17.05L10.7986 12.0247L5.75933 17.05Z" fill="currentColor" />
                    </svg>
                </button>
        </div>

        </div>
    )
}