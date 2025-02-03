import userNull from '../../../../assets/imgs/usernull.svg'

export function CardAlunoTreinoFinally({Aluno, onOpenTreinoFinalizado}){

    // Apenas a foto do aluno
    const foto = Aluno?.foto ? URL.createObjectURL(Aluno.foto) : userNull
    
    return (
        <div className="bg-[#252424] min-h-[320px] max-h-[320px] max-md:min-w-[160px] mb-5 h-[65%] w-[100%] rounded-md shadow-md shadow-black flex flex-col p-2 max-md:pb-1 items-center relative  duration-500 hover:rounded-md ">
            <div className={`aspect-square h-[45%] max-h-[45%] max-md:h-[45%] max-md:h-max-[40%] bg-[#2e2d2d] rounded-full flex items-center flex-col`}>
                <img 
                src={foto}
                alt="Foto do Aluno" 
                className="w-fit aspect-square rounded-full object-cover"/>
            </div>
            <h1 className="font-aleo mt-2 max-md:mt-1 text-white text-[20px] max-md:text-[15px] whitespace-nowrap">{Aluno?.nome + ' ' + Aluno?.sobrenome}</h1>
            <div className="h-full flex-col justify-evenly items-center flex w-full max-md:text-center">
                <div className="flex flex-col items-center justify-center space-y-2 ">
                    <h2 className="font-aleo text-white max-md:text-[16px]">Email: <span className="text-[#FFF4A3] text-[16px]">{Aluno?.email}</span></h2>
                    <h2 className="font-aleo text-white max-md:text-[16px] max-md:text-center">Telefone: <span className="text-[#FFF4A3] text-[16px]">{Aluno?.telefone}</span> </h2>
                </div>
                <button 
                onClick={onOpenTreinoFinalizado}
                className="w-3/4 bg-white font-poltawski flex justify-evenly items-center rounded-md py-0.5 md:py-1 shadow-md shadow-black text-[#252424] duration-500 font-bold hover:bg-[#3F3D3D] hover:text-[#fff4a3] space-x-2 px-1 text-[17px] max-md:w-2/3 whitespace-nowrap"> 
                    Treinos finalizados
                </button>
               
            </div>

            <div 
            draggable="true" 
            className="px-2 py-1 w-7 h-7 rounded-md bg-gray-100 text-[#252424] flex items-center justify-center absolute top-2 right-2"
            style={{
                background: "linear-gradient(150deg, #FFF4A3 39%, #ACA88C 88%)",
              }}>
                
            </div>
        </div>
    )
}