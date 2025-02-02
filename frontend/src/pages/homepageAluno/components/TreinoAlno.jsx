import { Calendar } from "./calendar"

export function ComponentTreinoAluno({foto, personal, campos, completedExercises, setCompletedExercises, setModalDicas}){
    return (
                <div className="shadow-md shadow-black w-[90%] min-h-[280px] max-h-[270px] flex bg-[#252424] p-2 md:space-x-2 justify-around mt-4 max-md:w-[95%] max-md:min-h-[510px] max-md:max-h-[520px] max-md:flex-col max-md:space-y-2 max-md:justify-center max-md:items-center ">
                  <div className="flex flex-col p-2 items-center w-1/4 h-full space-y-2 relative max-md:justify-center max-md:hidden">
                    <h1 className="font-poltawski font-bold text-[22px] text-white max-md:text-[16px] max-md:items-center">
                      Foto do exercicio
                    </h1>
                    <div className="aspect-square h-[60%] max-md:max-h-[30%] bg-white rounded-full flex items-center flex-col translate-y-3 ">
                      <img
                        src={foto}
                        className="w-full aspect-square rounded-full object-cover"
                      />
                    </div>
                    <hr className="bg-white absolute  right-0 h-[90%] w-[1px]  max-md:hidden" />
                  </div>
        
                  <div className="w-1/2 h-full flex flex-col items-center p-2 space-y-2 relative max-md:p-1 max-md:w-full max-md:h-1/2">
                    <h1 className="font-poltawski font-bold text-[22px] text-white max-md:text-[16px] text-center">
                      Informações do exercicio
                    </h1>
                    <div className="w-full h-[70%] grid grid-cols-2 max-md:gap-3 max-md:p-1 max-md:gap-x-4 items-center justify-center p-2">
                      {campos.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-center flex-col relative w-[90%] mb-3 ml-4 max-md:w-full max-md:ml-0 max-md:mb-0"
                        >
                          <label className="text-white font-aleo font-medium text-[14px] max-md:text-[13px] max-md:whitespace-nowrap">
                            {item.label}
                          </label>
                          <input
                            readOnly
                            type={item.type}
                            name={item.name}
                            value={item.value}
                            className="w-full appearance-none text-white border-b-[1px] border-white bg-[#252424] outline-none "
                          />
                        </div>
                      ))}
                    </div>
                    <hr className="bg-white absolute  right-0 h-[90%] w-[1px] translate-x-4 max-md:hidden" />
                  </div>
                  <Calendar
                  completedExercises={completedExercises}
                  setCompletedExercises={setCompletedExercises}
                  seeModalDicas={setModalDicas}
                  />
                </div>
    )
}