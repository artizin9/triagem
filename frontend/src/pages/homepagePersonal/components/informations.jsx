import { useState } from "react"
import { motion } from "framer-motion"
import { YourInformations } from "./configComponentes/yourInformations"
import { TrainingFinally } from "./configComponentes/treinosfinalizados"
import logo from "../../../assets/imgs/logo.svg"

export function Informations({ alunos, treinos }) {
  const [id, setId] = useState(0)

  const RenderConfig = () => {
    switch (id) {
      case 0:
        return <YourInformations alunos={alunos}/>
      case 1:
        return <TrainingFinally alunos={alunos} treinos={treinos} />
    }
  }

  return (
    <div className="h-full w-full flex items-center flex-col p-1 mt-5 relative">

      <div className="w-full flex md:justify-between items-center max-md:justify-center">
        <div className="flex flex-col pl-6 space-y-2 max-md:w-full max-md:items-center max-md:justify-center">
          <h1 className="font-poltawski text-[40px] max-md:text-[22px] font-bold max-md:-translate-x-2  text-white duration-500">{id === 0 ? "Suas informações" : "Treinos finalizados"}</h1>
          <div className="flex pl-1 space-x-14 relative">
            <button
              className={`text-[16px] max-md:whitespace-nowrap duration-500 font-aleo font-light ${id === 0 ? "text-[#fff4a3]" : "text-white"}`}
              onClick={() => setId(0)}
            >
              Suas informações
            </button>

            <button
              className={`text-[16px] translate-x-2 max-md:whitespace-nowrap duration-500 font-aleo font-light max-md:translate-x-5 ${id === 1 ? "text-[#fff4a3]" : "text-white"}`}
              onClick={() => setId(1)}
            >
              Treinos finalizados
            </button>
            <div>
              <hr
                className="absolute h-[1px] rounded-2xl w-full left-0 bottom-0 -translate-x-4 bg-[#615C5C] border border-[#615C5C]"
              />

              <motion.hr
                className="absolute h-[1px] rounded-2xl border border-[#fff4a3] bottom-0 w-[48%] -translate-x-10 z-10 left-0"
                animate={{ x: id === 0 ? "-9%" : "92%" }}
                transition={{ duration: 0.8 }}
                style={{ width: "50%" }}
              />
            </div>

          </div>
        </div>
      </div>

      <div className="absolute max-md:insert-0 bottom-12 max-md:top-[14%] w-[70%] h-[60%] max-md:w-[90%] max-md:h-[70%] max-md:max-h-[400px] max-h-[510px] min-h-[480px] bg-[#2D2B2B] flex-col flex items-center p-2 rounded-md shadow-md shadow-black md:-translate-x-2">
        <img className="absolute top-0 left-2 w-16 h-16" src={logo}/>
        {RenderConfig()}
      </div>

      <img 
        className="absolute top-2 right-2 w-[15%] h-[15%] max-md:hidden"
        src={logo}
      />
    </div>
  )
}