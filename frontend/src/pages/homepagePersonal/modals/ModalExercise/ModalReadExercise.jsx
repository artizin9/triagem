import { useEffect } from 'react'
import noPhoto from '../../../../assets/imgs/noPhoto.png'
import { CardExercise } from '../../components/CardExercise'

const seeExercise = (<svg width="22" height="17" viewBox="0 0 22 17" className='rotate-180' fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2.00353C9 0.375799 10.8407 -0.570208 12.1642 0.377318L20.7285 6.50858C21.8428 7.30637 21.8428 8.96322 20.7285 9.76101L12.1924 15.8721C10.8723 16.8171 9.03572 15.8786 9.02823 14.2551L9.01096 10.5109C9.01093 10.5049 9.00603 10.5 9 10.5H2.25C1.00736 10.5 0 9.49264 0 8.25C0 7.00736 1.00736 6 2.25 6H7C8.10457 6 9 5.10457 9 4V2.00353Z" fill="currentColor" />
</svg>)

export function ReadExercise({ Back, Open, UpdateExercise, DeleteExercise, Treinos, setFormExercise, form, setFormTreino }) {

    const { name, destined, time, weekDay, photo } = form

    const formTreinoFields = [
        { label: "Nome:", value: name },
        { label: "Destinado para:", value: destined },
        { label: "Tempo de conclusão:", value: time },
        { label: "Dia da semana:", value: weekDay }
    ]

    useEffect(() => {}, [Treinos])

    return (
        <div className={`w-full h-full bg-black flex justify-center items-center bg-opacity-30 fixed insert-0 ${Open ? 'visible' : 'invisible'}`}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={`h-[90%] w-3/5 flex   relative rounded-lg shadow-md shadow-black/60 bg-[#131313] pt-1 duration-300 ease-in-out ${Open ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}>
                <div className="h-full w-1/2 flex flex-col items-center p-2 space-y-2 border-white border-r justify-evenly">
                    <div className="flex flex-col text-center mt-2">
                        <h1 className="font-poppins font-extrabold text-[24px] text-white">TREINO <span className="text-primary-100">SELECIONADO </span></h1>
                        <h1 className="font-albert font-medium text-[15px] text-center text-primary-200">Veja o treino onde os exercícios <span className='block'>estão sendo enviados</span></h1>
                    </div>

                    <div className="w-1/3 aspect-square rounded-full relative bg-[#131313] mt-4">
                        <img src={photo ? photo : noPhoto} className="w-full aspect-square rounded-full object-cover duration-500 " />
                    </div>

                    <div className='w-[60%] h-fit space-y-8 flex flex-col items-center'>
                        {formTreinoFields.map((item, index) => (
                            <div key={index} className="w-full flex flex-col relative">
                                <label className="font-albert font-medium text-[#d7d7d7]">{item.label}</label>
                                <input
                                    readOnly
                                    value={item.value}
                                    className="border-b-white border-b w-full text-white outline-none bg-[#131313] placeholder:font-albert placeholder:font-medium placeholder:text-[12px] placeholder:text-primary-200"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="h-full w-1/2 flex flex-col items-center p-2 space-y-2">
                    <div className="flex flex-col text-center mt-2">
                        <h1 className="font-poppins font-extrabold text-[24px] text-white">EXERCICIOS <span className="text-primary-100">CRIADOS</span></h1>
                        <h1 className="font-albert font-medium text-[15px] text-center text-primary-200">Veja e edite os exercícios</h1>
                    </div>

                    <div className='w-full h-full overflow-y-auto grid grid-cols-2 gap-x-0 gap-y-2 pt-5'>
                        {Treinos.map((treino) =>
                           treino?.exercise && treino?.exercise?.map((exercise, index) => (
                                <CardExercise
                                    key={index}
                                    type="read"
                                    UpdateExercise={() => {
                                        setFormExercise(exercise)
                                        setFormTreino(treino)
                                        UpdateExercise()
                                    }}
                                    Delete={() => {
                                        setFormExercise(exercise)
                                        setFormTreino(treino)
                                        DeleteExercise()
                                    }}
                                    exercise={exercise}
                                />
                            ))
                        )
                        }
                    </div>
                </div>
                <button
                    onClick={Back} className="absolute w-fit h-fit top-3 left-1 hover:text-primary-100 text-white duration-500">
                    {seeExercise}
                </button>
            </div>

        </div>
    )
}