export function ModalTreinoMobile({Aluno, setAluno, visibleModalMobile, onClose, setVisibleModalMobile, TreinosSelecionados}){
    return (
        < div className={`${visibleModalMobile ? '' : 'hidden'} w-full h-full md:hidden`}>
            <div className = {`h-full w-[25%] bg-[#252424] rounded-md flex items-center relative flex-col p-2 space-y-4 max-md:w-full ${visibleModalMobile ? '' : 'hidden'}`}>
                            <h1 className="text-white font-poltawski font-bold text-[20px]"> Treinos selecionados </h1>
            
                            <div className="flex items-center flex-col w-full item-center h-full custom-scrollbar overflow-y-auto overflow-x-hidden font-aleo text-white space-y-2 max-md:w-[85%]">
                                <h1>Aluno: {Aluno?.nome}</h1>
                                {Aluno?.treinos?.map((item, index) => (
                                    <TreinosSelecionados
                                        key={item?.id}
                                        Remove={() => {
                                            // Atualizar treinos do aluno
                                            setAluno((alunos) =>
                                                alunos.map((a) =>
                                                    a.id === Aluno.id
                                                        ? {
                                                            ...a,
                                                            treinos: a.treinos?.filter((_, i) => i !== index),
                                                        }
                                                        : a
                                                )
                                            )
                                        }}
                                        Treino={item}
                                    />
                                ))}
                            </div>
                            
                        </div>
                        <button onClick={onClose} className="absolute right-0 top-1 z-20 text-white hover:text-red-600 duration-500">
                <svg width="31" height="37" viewBox="0 0 31 37" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.82749 22.9235L8.42749 21.5235L14.0275 15.9235L8.42749 10.3235L9.82749 8.92346L15.4275 14.5235L21.0275 8.92346L22.4275 10.3235L16.8275 15.9235L22.4275 21.5235L21.0275 22.9235L15.4275 17.3235L9.82749 22.9235Z" fill="currentColor" />
                </svg>
            </button>

            <button onClick={() => setVisibleModalMobile(false)} className="absolute z-20 left-2 top-2 max-md:top-2 text-white hover:text-red-600 duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffff"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
            </button>
        </div>
    )
}