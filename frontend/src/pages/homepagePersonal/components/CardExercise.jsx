import { api } from "../../../utils/api/api"

export function CardExercise({ exercise, Delete, UpdateExercise, type }) {

    const photo = exercise?.photo ? exercise?.photo : api.defaults.baseURL + '/uploads/' + exercise?.imageUrl

    
    return (
        <div className={`bg-[#1b1b1b] w-[90%] h-[50%] flex flex-col relative items-center rounded-lg p-2 shadow-md shadow-black/50 justify-between mx-auto ${type === "read" ? "min-h-[250px]" : "max-h-[170px]"}`}>
            <div className="flex flex-col items-center justify-center w-[60%]">
                <div className="w-full aspect-square rounded-full bg-primary-400 space-y-1">
                    <img src={photo} className="w-full h-full object-cover rounded-full" />
                </div>
                <h1 className="font-poppins font-medium text-[14px] text-white mt-1">{exercise?.name}</h1>
                <h1 className="font-albert font-regular text-[12px] text-primary-200">{exercise?.execByRep}</h1>
            </div>
            {type === "read" ? (
                <div className="w-[95%] items-center p-1 justify-center space-y-3">
                    <button
                        onClick={UpdateExercise}
                        className="w-full  whitespace-nowrap py-0.5 bg-white text-primary-400 font-poppins font-bold shadow-black/30 shadow-md duration-500 ease-in-out hover:bg-primary-100/80 hover:text-white rounded-[3px] text-[14px]">
                        Editar exercício
                    </button>

                    <button
                        onClick={Delete}
                        className="w-full  whitespace-nowrap py-0.5 bg-primary-100 text-white font-poppins font-bold shadow-black/30 shadow-md duration-500 ease-in-out rounded-[3px] text-[14px]">
                        Deletar exercicio
                    </button>
                </div>
            ) :
                ('')
            }
        </div>
    )
}