export function SeeDicas({ onOpen, onClose, Dicas, Personal, foto }) {
    return (<div
        className={`h-[90%] w-[50%] bg-[#252424] flex item-center flex-col fixed top-6 md:-translate-x-4 rounded-md shadow-lg shadow-[#272626] transform max-md:h-[80%] max-md:w-[95%] ${onOpen ? "scale-100 opacity-100" : "scale-110 opacity-0 pointer-events-none"
            } transition-all duration-300`}
    >
        <div className="w-full items-center flex flex-col font-poltawski text-white">
            <h1 className="text-[33px] font-bold max-md:text-[25px]">Dicas do exercicio</h1>
            <h3 className="font-aleo text-[18px] max-md:text-[14px]">Personal: {Personal?.nome}</h3>
        </div>
        
        <div className="w-full items-center flex flex-col font-poltawski text-white md:hidden justify-center mt-2">
            <h1 className="text-[14px]">Foto do exercicio</h1>
        <div className="md:hidden h-20 w-20 bg-white rounded-full flex items-center flex-col">
                      <img
                        src={foto}
                        className="w-full aspect-square rounded-full object-cover"
                      />
        </div>
        </div>
        
        <div className="w-full h-[40%] flex flex-col items-center justify-center space-y-1 p-2 mt-4 max-md:mt-2">
            <h1 className="font-poltawski text-[22px] max-md:text-[18px] text-white">Dicas do exercicio</h1>
            <textarea 
            className="w-[80%] h-full max-md:h-[80%] bg-[#252424] border-white border text-white p-1 text-center rounded-md"
            readOnly
            value={Dicas}
            />
        </div>

        <div className="w-full h-[40%] flex flex-col items-center justify-center space-y-1 p-2 mt-4 max-md:mt-2">
            <h1 className="font-poltawski text-[22px] max-md:text-[18px] text-white">Dicas de segurança</h1>
            <textarea 
            className="w-[80%] h-full max-md:h-[80%] bg-[#252424] border-white border text-white p-1 text-center rounded-md"
            readOnly
            value={Dicas}
            />
        </div>

        <button onClick={onClose} className="absolute right-1 h-fit top-1 text-white md:hover:text-red-600 duration-500">
                <svg width="31" height="37" viewBox="0 0 31 37" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.82749 22.9235L8.42749 21.5235L14.0275 15.9235L8.42749 10.3235L9.82749 8.92346L15.4275 14.5235L21.0275 8.92346L22.4275 10.3235L16.8275 15.9235L22.4275 21.5235L21.0275 22.9235L15.4275 17.3235L9.82749 22.9235Z"
                        fill="currentColor"
                    />
                </svg>
            </button>
    </div>
)}