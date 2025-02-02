export function TreinosSelecionados({Treino, Remove}){

    const foto = Treino?.foto ? URL.createObjectURL(Treino.foto) : '/default-avatar.png'

    return (
        <div className="bg-[#3b3b3b] flex h-fit justify-between item-center w-full hover:bg-[#474747] relative duration-500 rounded-md shadow-md shadow-black p-2">
            <div className="flex flex-col w-[40%] space-y-1 h-full max-md:p-3 justify-center items-center">
                <h1 className="font-aleo mt-5 text-[14px] max-md:text-[16px] max-md:mt-0">{Treino?.nomeExercicio}</h1>
                <h1 className="font-aleo text-[14px] max-md:text-[16px]">{Treino?.exercucoesPorRep }</h1>
            </div>
            <div className="h-20 aspect-square bg-gray-600 rounded-full">
                <img 
                src={foto}
                className="w-[102%] h-full rounded-full object-cover"/>
            </div>

            <button onClick={Remove} className="absolute top-0 left-0 text-white hover:text-red-500 duration-500">
                <svg width="25" height="25" viewBox="0 0 31 37" className="max-md:h-7 max-md:w-7" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.82749 22.9235L8.42749 21.5235L14.0275 15.9235L8.42749 10.3235L9.82749 8.92346L15.4275 14.5235L21.0275 8.92346L22.4275 10.3235L16.8275 15.9235L22.4275 21.5235L21.0275 22.9235L15.4275 17.3235L9.82749 22.9235Z" fill="currentColor"/>
                </svg>
            </button>
        </div>
    )
}