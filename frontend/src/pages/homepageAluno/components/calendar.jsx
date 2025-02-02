import React, { useState } from "react";

export function Calendar({
  Treino,
  completedExercises,
  setCompletedExercises,
  seeModalDicas,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();
  const monthNames = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ];

  // Função para mudar o mês
  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  // Função para marcar/desmarcar exercício ao clicar em "Exercício Feito"
  const handleMarkExercise = () => {
    const day = today.getDate();
    const month = monthNames[currentDate.getMonth()]; // Obter o nome do mês

    setCompletedExercises((prev) => {
      const existingExercise = prev.find(exercise => 
          exercise.Dia === day && exercise.Mes === month
      );

      if (existingExercise) {
          // Se já existe, remove
          return prev.filter(exercise => 
              !(exercise.Dia === day && exercise.Mes === month)
          );
      } else {
          // Se não existe, adiciona
          return [...prev, { id: Date.now(), Dia: day, Mes: month }];
      }
    });
  };
  // Renderizar os dias do mês (apenas para visualização)
  const renderDays = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();

    const days = [];
    const todayDate =
      currentDate.getFullYear() === today.getFullYear() &&
      currentDate.getMonth() === today.getMonth()
        ? today.getDate()
        : null;

    for (let i = 0; i < startOfMonth; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="w-5 h-5 flex justify-center items-center"
        />
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isCompleted = completedExercises.some(exercise => 
          exercise.Dia === day && exercise.Mes === monthNames[currentDate.getMonth()]
      )
      const isDisabled = day < todayDate && todayDate !== null;
  
      days.push(
          <div
              key={day}
              className={`h-6 w-6 flex items-center justify-center rounded-full border text-[13px]
                  ${day === todayDate ? "border-[#fff4a3e8]" : "border-transparent"}
                  ${isCompleted ? "bg-[#fff4a3e8] text-[#252424]" : "bg-transparent"}
                  ${isDisabled ? "text-gray-400" : ""}
              `}
          >
              {day}
          </div>
      );
  }
    return days;
  };

  const isExerciseCompleted = completedExercises.some(exercise => 
    exercise.Dia === today.getDate() && 
    exercise.Mes === monthNames[currentDate.getMonth()]
)

  return (
    <div className="h-full w-1/4 flex flex-col relative max-md:w-full max-md:justify-center max-md:items-center">
      <div className="md:p-2 w-full max-h-[90%] mx-auto text-white md:mt-2 max-md:h-full">
        <div className="flex items-center justify-between pl-2">
          <button
            onClick={handlePrevMonth}
            className="text-xl ml-3 flex items-center justify-center"
          >
            <div className="p-1 flex items-center justify-center rounded-full bg-[#64646470] text-white hover:bg-[#3b3b3b] hover:text-[#FFF4A3] duration-500 max-md:-translate-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="12px"
                viewBox="0 -960 960 960"
                width="12px"
                fill="currentColor"
                className="translate-x-0.5"
              >
                <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
              </svg>
            </div>
          </button>
          <h2 className="font-poltawski text-[16px]">
            {currentDate.toLocaleString("pt-BR", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button
            onClick={handleNextMonth}
            className="text-xl flex items-center justify-center -translate-y-[0.5px]"
          >
            <div className="p-1 flex items-center justify-center rounded-full bg-[#64646470] text-white hover:bg-[#3b3b3b] hover:text-[#FFF4A3] duration-500 max-md:-translate-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="12px"
                viewBox="0 -960 960 960"
                width="12px"
                fill="currentColor"
              >
                <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
              </svg>
            </div>
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 pl-5 max-md:pl-4">
          {["D", "S", "T", "Q", "Q", "S", "S"].map((day, idx) => (
            <div
              key={idx}
              className="w-5 h-5 flex items-center justify-center"
            >
              <div className="p-2 text-[13px] max-md:p-1 max-md:text-[11px]">{day}</div>
            </div>
          ))}
          {renderDays()}
        </div>
      </div>
      <div className="w-full flex justify-evenly items-center absolute bottom-1 max-md:bottom-0">
      <button
    onClick={handleMarkExercise}
    className="w-[43%] bg-white text-[#252424] px-2 py-1 rounded-md text-[12px] font-poltawski font-bold flex justify-center space-x-4 items-center md:hover:bg-[#464545] md:hover:text-[#FFF4A3] duration-500 active:bg-[#4e4e4e] shadow-md shadow-[#252424] whitespace-nowrap ml-4"
>
    {isExerciseCompleted ? "Desmarcar" : "Exercício feito"}
</button>
        <button
          onClick={seeModalDicas}
          className="w-[42%] bg-white text-[#252424] px-2 py-1 rounded-md text-[12px] font-poltawski font-bold flex justify-center space-x-4 items-center md:hover:bg-[#464545] md:hover:text-[#FFF4A3] duration-500 active:bg-[#4e4e4e] shadow-md shadow-[#252424] whitespace-nowrap"
        >
          Dicas
        </button>
      </div>
    </div>
  );
}
