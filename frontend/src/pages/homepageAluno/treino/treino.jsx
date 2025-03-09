import { useState } from "react"
import { CardTreinoAluno } from "../components/cardTreino"

const Search = (<svg width="22" className="absolute right-1.5 top-2 " height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.9667 19.25L12.1917 13.475C11.7333 13.8417 11.2063 14.1319 10.6104 14.3458C10.0146 14.5597 9.38056 14.6667 8.70833 14.6667C7.04306 14.6667 5.63368 14.0899 4.48021 12.9365C3.32674 11.783 2.75 10.3736 2.75 8.70833C2.75 7.04306 3.32674 5.63368 4.48021 4.48021C5.63368 3.32674 7.04306 2.75 8.70833 2.75C10.3736 2.75 11.783 3.32674 12.9365 4.48021C14.0899 5.63368 14.6667 7.04306 14.6667 8.70833C14.6667 9.38056 14.5597 10.0146 14.3458 10.6104C14.1319 11.2063 13.8417 11.7333 13.475 12.1917L19.25 17.9667L17.9667 19.25ZM8.70833 12.8333C9.85417 12.8333 10.8281 12.4323 11.6302 11.6302C12.4323 10.8281 12.8333 9.85417 12.8333 8.70833C12.8333 7.5625 12.4323 6.58854 11.6302 5.78646C10.8281 4.98438 9.85417 4.58333 8.70833 4.58333C7.5625 4.58333 6.58854 4.98438 5.78646 5.78646C4.98438 6.58854 4.58333 7.5625 4.58333 8.70833C4.58333 9.85417 4.98438 10.8281 5.78646 11.6302C6.58854 12.4323 7.5625 12.8333 8.70833 12.8333Z" fill="#FFF" />
</svg>
)

export function Treino({TreinoAluno, OpenModalExercise}) {
    console.log("Renderizando Treino...");
    const [seta, setSeta] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [filterType, setFilterType] = useState("filtrar")

    const filteredAlunos = TreinoAluno.filter((TreinoAluno) => {
        if (filterType === "filtrar") return true;

        const query = searchQuery.toLowerCase();
        switch (filterType) {
            case "name":
                return TreinoAluno.name.toLowerCase().includes(query);
            case "destined":
                return TreinoAluno.destined.toLowerCase().includes(query);
            case "time":
                return TreinoAluno.time.toLowerCase().includes(query);
            case "weekDay":
                return TreinoAluno.weekDay.toLowerCase().includes(query);
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
            </div>
            <div className="w-[73%] h-full mt-8 overflow-auto overflow-x-hidden grid grid-cols-3 gap-4 relative">
            {filteredAlunos.map((treino) => (
                <CardTreinoAluno
                treino={treino}
                SeeExercise={OpenModalExercise}
                />
            ))}
                
            
            </div>
        </div>
    )
}
