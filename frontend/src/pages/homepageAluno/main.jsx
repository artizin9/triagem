import { useState, useEffect } from 'react'
import { CardTreinoAluno } from './components/cardTreino'
import { userData } from '../../utils/api/api'
import { Error } from '../../utils/error/errorAuth'

const IconLogOut = (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.77778 20C4.28889 20 3.87037 19.8259 3.52222 19.4778C3.17407 19.1296 3 18.7111 3 18.2222V5.77778C3 5.28889 3.17407 4.87037 3.52222 4.52222C3.87037 4.17407 4.28889 4 4.77778 4H11V5.77778H4.77778V18.2222H11V20H4.77778ZM14.5556 16.4444L13.3333 15.1556L15.6 12.8889H8.33333V11.1111H15.6L13.3333 8.84444L14.5556 7.55556L19 12L14.5556 16.4444Z" fill="currentColor" />
</svg>)

const Search = (<svg width="22" className="absolute right-1.5 top-2 " height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.9667 19.25L12.1917 13.475C11.7333 13.8417 11.2063 14.1319 10.6104 14.3458C10.0146 14.5597 9.38056 14.6667 8.70833 14.6667C7.04306 14.6667 5.63368 14.0899 4.48021 12.9365C3.32674 11.783 2.75 10.3736 2.75 8.70833C2.75 7.04306 3.32674 5.63368 4.48021 4.48021C5.63368 3.32674 7.04306 2.75 8.70833 2.75C10.3736 2.75 11.783 3.32674 12.9365 4.48021C14.0899 5.63368 14.6667 7.04306 14.6667 8.70833C14.6667 9.38056 14.5597 10.0146 14.3458 10.6104C14.1319 11.2063 13.8417 11.7333 13.475 12.1917L19.25 17.9667L17.9667 19.25ZM8.70833 12.8333C9.85417 12.8333 10.8281 12.4323 11.6302 11.6302C12.4323 10.8281 12.8333 9.85417 12.8333 8.70833C12.8333 7.5625 12.4323 6.58854 11.6302 5.78646C10.8281 4.98438 9.85417 4.58333 8.70833 4.58333C7.5625 4.58333 6.58854 4.98438 5.78646 5.78646C4.98438 6.58854 4.58333 7.5625 4.58333 8.70833C4.58333 9.85417 4.98438 10.8281 5.78646 11.6302C6.58854 12.4323 7.5625 12.8333 8.70833 12.8333Z" fill="#FFF" />
</svg>
)

export function Home({OpenModalLogOut, OpenModalSeeExercise, TreinoAluno, setTreinoAluno}) {
    const [name, setName] = useState("")
    const [img, setImg] = useState("")
    const [seta, setSeta] = useState(false)
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("filtrar");

   const filterTrainingStudent = TreinoAluno?.filter((treino) => {
        if (filterType === "filtrar") return true;

        const query = searchQuery.toLowerCase();
        switch (filterType) {
            case "name":
                return treino.name.toLowerCase().includes(query);
            case "destined":
                return treino.destined.toLowerCase().includes(query);
            case "time":
                return treino.time.toLowerCase().includes(query);
            case "weekDay":
                return treino.weekDay.toLowerCase().includes(query);
            default:
                return true
        }
    })
    

    const Seta = (<svg width="24" height="24" className={`absolute right-1 top-2 duration-500 transition-all ${seta ? "rotate-180" : "rotate-0"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 13.2L16.6 8.6L18 10L12 16L6 10L7.4 8.6L12 13.2Z" fill="#FFF" />
    </svg>
    )

    const userDatas = async () => {
        try {
            const { name, photo } = await userData()
            setName(name)
            setImg(photo)
        }
        catch (error) {
            Error(error)
        }
    }

    useEffect(() => {
        userDatas()
    }, [])


    return (
        <div className="w-full h-full flex-col items-center bg-[#222222] overflow-hidden space-y-6 relative">
            <div className='w-full px-10 flex justify-between items-center mt-1'>
                <div className='flex items-center justify-center space-x-3 '>
                    <div className="w-8 h-8 rounded-full bg-white">
                        <img src={img} className="w-full aspect-square object-cover rounded-full" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-poppins font-normal text-[13px] text-white">{name}</h1>
                        <h3 className="font-albert font-normal text-[12px] text-primary-200 text-left">Aluno</h3>
                    </div>
                </div>

                <div draggable="true" className='font-poppins text-white text-[20px] font-bold'>
                    <h1>Fit <span className="text-primary-100">Sync</span> </h1>
                </div>

                <div className='flex items-center justify-center'>
                        <button
                        onClick={OpenModalLogOut} 
                        className="flex space-x-3 items-center duration-500 w-full justify-center relative py-2.5 text-white hover:text-primary-100">
                            {IconLogOut}
                            <h1 className="font-poppins  font-medium text-[17px]"> Sair </h1>
                        </button>
                    </div>
            </div>

                <div className="flex items-center justify-center w-full pt-2 flex-col h-full">
                    <div className='flex itmes-center justify-center w-full space-x-10'>
                    <div className="w-[45%] relative">
                        <input
                            className="w-full bg-[#161616] rounded-lg pl-2 p-1 py-1.5 outline-none text-white shadow-md shadow-black/40"
                            placeholder="Pesquisar..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {Search}
                    </div>
                    <div className="w-[20%] relative">
                        <select
                            onClick={() => setSeta(prev => prev = !prev)}
                            className="w-full bg-[#161616] rounded-lg pl-1 p-1 py-1.5 text-white outline-none appearance-none shadow-md shadow-black/20"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="filtrar"> Filtrar por... </option>
                            <option value="name"> Nome </option>
                            <option value="destined">Destinado</option>
                            <option value="time">Tempo</option>
                            <option value="weekDay">Dia da semana</option>
                        </select>

                        {Seta}
                    </div>
                    </div>
                    <div className="w-[68%] h-full mt-8 overflow-auto overflow-x-hidden grid grid-cols-4 gap-4">
                    {filterTrainingStudent.map((treinoAluno) => (
                        <CardTreinoAluno
                        SeeExercise={OpenModalSeeExercise(treinoAluno)}
                        />
                    ))}
                        
                        </div>
                        
                </div>

        </div>
    )
}