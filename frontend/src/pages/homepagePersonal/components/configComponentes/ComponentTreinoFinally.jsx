export function TreinosFinalizados({Treino}){

    const foto = Treino?.foto ? URL.createObjectURL(Treino.foto) : '/default-avatar.png'

    return (
        <div className="w-full flex items-center justify-center ">
        <div className="bg-[#3b3b3b] flex h-fit justify-between item-center w-full hover:bg-[#474747] relative duration-500 rounded-md shadow-md shadow-black p-2">
            <div className="flex flex-col w-[40%] space-y-1 h-full max-md:p-3 justify-center items-center text-white">
                <h1 className="font-aleo mt-5 text-[14px] max-md:text-[16px] max-md:mt-0">{Treino?.nomeExercicio}</h1>
                <h1 className="font-aleo text-[14px] max-md:text-[16px]">{Treino?.exercucoesPorRep }</h1>
            </div>
            <div className="h-20 aspect-square bg-gray-600 rounded-full">
                <img 
                src={foto}
                className="w-[102%] h-full rounded-full object-cover"/>
            </div>
        </div>

        <div className="w-[70%] bg-[#3b3b3b] duration-500 hover:bg-[#474747] h-[90%] rounded-br-md rounded-tr-md shadow-black shadow-md text-white flex  items-center justify-center flex-col space-y-1 font-aleo font-light max-md:text-[14px]">
               <h1>Dia: 22</h1>
                <h1>Mês: Dezembro</h1>
            </div>

        </div>
    )
}