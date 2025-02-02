import React, { useState } from "react"
import { Calendar } from "./calendar"
import { SeeDicas } from "./SeeDicas"
import { ComponentTreinoAluno } from "./TreinoAlno"

const options = [
  { id: 1, value: "Filtrar por..." },
  { id: 2, value: "Nome do exercicio" },
  { id: 3, value: "Exercuções por rep" },
  { id: 4, value: "Tipo de treino" },
]


export function HomeAluno({ foto, personal, treino, dicas }) {

  // to colocando os valores com props, mas quem deve pegar os valores é você, também tu tem que interligar o aluno ao personal, e quando o personal criar o treino, o componente deve aparecer

  const campos = [
    { name: "nomeExercicio", type: "text", label: "Nome do exercicio:", value: treino?.nomeExercicio },
    { name: "reperticoes", type: "number", label: "Repertições:", value: treino?.reperticoes + "" + "repertições"},
    { name: "exercucoes", type: "number", label: "Exercuções:", value: treino?.exercucoes + "" + "exercuções"},
    { name: "intervalo", type: "text", label: "Intervalo:", value: treino?.intervalo},
    { name: "exercucoesPorRep", type: "text", label: "Exercuções por rep:", value: treino?.exercucoesPorRep },
    { name: "tipo", type: "text", label: "Tipo de treino:", value: treino?.tipo },
  ]

  const [arrow, setArrow] = useState(false)
  const [search, setSearch] = useState("")
  const [select, setSelect] = useState("Filtrar por...")
  const [completedExercises, setCompletedExercises] = useState([])
  const [modalDicas, setModalDicas] = useState(false)
  console.log(completedExercises)

  return (
    <div className="h-full w-full flex items-center flex-col p-2 mt-5 relative">
      <div className="w-full p-2 flex items-center justify-center space-x-6">
        <input
          className="w-[70%] max-md:w-[65%] rounded-md outline-none pl-2 py-1.5 text-[14px] bg-[#252424] text-white"
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <div className="w-[15%] flex relative max-md:w-[35%]">
          <select
            value={select}
            onChange={(e) => setSelect(e.target.value)}
            className="py-1.5 px-2 w-full rounded-md outline-none text-[14px] bg-[#252424] text-white p-1 appearance-none"
            onClick={() => {
              setArrow((Arrow) => !Arrow)
            }}
          >
            {options.map((item, index) => (
              <option
                className="p-1 rounded-md"
                key={index}
                value={item.value}
              >
                {item.value}
              </option>
            ))}
          </select>

          <button className="absolute right-1 bottom-[3px] duration-500">
            {arrow ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-180 transform transition-transform duration-300 bottom-[3px]"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#ffff"
              >
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                className="transform transition-transform duration-300"
                width="24px"
                fill="#ffff"
              >
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="w-full h-full p-2 pt-5 overflow-y-auto custom-scrollbar flex flex-col space-y-4 max-md:pt-2 items-center max-md:space-y-0">
        <div className="flex flex-col items-center">
          <h1 className="font-poltawski text-[30px] tracking-widest font-bold text-white max-md:text-[25px]">
            Treinos disponíveis
          </h1>
          <h2 className="font-poltawski text-[18px] max-md:text-[16px] text-white -translate-y-1">
            Personal {personal?.nome}
          </h2>
        </div>

        <ComponentTreinoAluno 
        foto={foto}
        campos={campos}
        completedExercises={completedExercises}
        setCompletedExercises={setCompletedExercises}
        setModalDicas={setModalDicas}
        />
        
        </div>
      <SeeDicas 
      onOpen={modalDicas}
      onClose={() => setModalDicas(false)}
      Dicas={dicas}
      Personal={personal}
      foto={foto}
      />
    </div>
  )
}
