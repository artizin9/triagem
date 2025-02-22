import { useState } from "react"
import { CardTreino } from "../components/CardTreino"

const Search = (<svg width="22" className="absolute right-1.5 top-2 " height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.9667 19.25L12.1917 13.475C11.7333 13.8417 11.2063 14.1319 10.6104 14.3458C10.0146 14.5597 9.38056 14.6667 8.70833 14.6667C7.04306 14.6667 5.63368 14.0899 4.48021 12.9365C3.32674 11.783 2.75 10.3736 2.75 8.70833C2.75 7.04306 3.32674 5.63368 4.48021 4.48021C5.63368 3.32674 7.04306 2.75 8.70833 2.75C10.3736 2.75 11.783 3.32674 12.9365 4.48021C14.0899 5.63368 14.6667 7.04306 14.6667 8.70833C14.6667 9.38056 14.5597 10.0146 14.3458 10.6104C14.1319 11.2063 13.8417 11.7333 13.475 12.1917L19.25 17.9667L17.9667 19.25ZM8.70833 12.8333C9.85417 12.8333 10.8281 12.4323 11.6302 11.6302C12.4323 10.8281 12.8333 9.85417 12.8333 8.70833C12.8333 7.5625 12.4323 6.58854 11.6302 5.78646C10.8281 4.98438 9.85417 4.58333 8.70833 4.58333C7.5625 4.58333 6.58854 4.98438 5.78646 5.78646C4.98438 6.58854 4.58333 7.5625 4.58333 8.70833C4.58333 9.85417 4.98438 10.8281 5.78646 11.6302C6.58854 12.4323 7.5625 12.8333 8.70833 12.8333Z" fill="#FFF" />
</svg>
)

const addTreino = (<svg width="24" height="24" viewBox="0 0 24 24" className="absolute right-2 top-1.5 " fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.4001 21.9001L12.0001 20.5001L15.5501 16.9501L7.0501 8.4501L3.5001 12.0001L2.1001 10.6001L3.5001 9.1501L2.1001 7.7501L4.2001 5.6501L2.8001 4.2001L4.2001 2.8001L5.6501 4.2001L7.7501 2.1001L9.1501 3.5001L10.6001 2.1001L12.0001 3.5001L8.4501 7.0501L16.9501 15.5501L20.5001 12.0001L21.9001 13.4001L20.5001 14.8501L21.9001 16.2501L19.8001 18.3501L21.2001 19.8001L19.8001 21.2001L18.3501 19.8001L16.2501 21.9001L14.8501 20.5001L13.4001 21.9001Z" fill="white"/>
    <rect x="16" y="6" width="7" height="2" fill="white"/>
    <rect x="18.5" y="3.5" width="2" height="7" fill="white"/>
    </svg>)

export function Treino({ treino, setFormTreino, OpenCreateTraining, OpenCreateExercise, OpenDeleteTraining, OpenUpdateTraining}) {

    const [seta, setSeta] = useState(false)
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("filtrar");

    const filteredAlunos = treino.filter((treino) => {
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

    return (
        <div className="p-2 pt-3 flex flex-col items-center w-full h-full mt-2">
            <div className="flex flex-col p-1 w-full items-center justify-center space-y-5">
                <div className="flex items-center justify-around w-4/5">
                    <div className="w-[60%] relative">
                        <input
                            className="w-full bg-[#161616] rounded-lg pl-2 p-1 py-1.5 outline-none text-white shadow-md shadow-black/40"
                            placeholder="Pesquisar..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {Search}
                    </div>
                    <div className="w-[27%] relative">
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
                <div className="w-4/5 flex justify-center items-center">
                    <button
                        onClick={OpenCreateTraining}
                        className="w-[27%] bg-[#161616] rounded-lg px-2 p-1 py-1.5 text-white outline-none font-poppins font-medium text-left duration-500 hover:bg-primary-100/80 relative shadow-md shadow-black/20">
                        Cadrastrar treino
                        {addTreino}
                    </button>
                </div>

            </div>
            <div className="w-[73%] h-full mt-8 overflow-auto overflow-x-hidden grid grid-cols-3 gap-4">
            {filteredAlunos.map((treino) => (
                    <CardTreino
                        UpdateInfo={() => {
                            setFormTreino(treino)
                            OpenUpdateTraining()
                        }}
                        treino={treino}
                        Delete={() => {
                            setFormTreino(treino)
                            OpenDeleteTraining()    
                        }}
                        type="treino"
                        key={treino.id} />
                ))}
            </div>
        </div>
    )
}
