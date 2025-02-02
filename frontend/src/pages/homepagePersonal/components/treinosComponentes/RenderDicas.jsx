import { useState, useEffect } from "react";

export function RenderDicas({ Treino, Aluno, onSave, setAluno, setFoto, Dicas, form, setForm, getValues, setDicas, PegarDicas, setIsMobile, isMobile}) {
    const InformacoesTreino = [
        { name: "nomeExercicio", type: "text", label: "Nome do Exercicio:" },
        { name: "reperticoes", type: "number", label: "Repertições:" },
        { name: "exercucoes", type: "number", label: "Exercuções:" },
        { name: "intervalo", type: "text", label: "Intervalo:" },
        { name: "exercucoesPorRep", type: "text", label: "Exercuções por rep:" },
    ];

    const textAreas = [
        { name: 'Dicas', onChange: Dicas, Descrição: 'Dicas do treino' },
        { name: 'DicasSeguranca', onChange: Dicas, Descrição: 'Dicas de segurança' }
    ];

    const [EditOrSave, setEditOrSave] = useState(false)
    const [verification, setVerification] = useState(false)
    const [FeedbackDicasMessage, setFeedbackDicasMessage] = useState(false)

    const PegaDicas = () => {
        PegarDicas()
        setFeedbackDicasMessage(true)
        setTimeout(() => {
            setFeedbackDicasMessage(false)
        }, 4000)
    }

    const toggleEditSave = () => {
        if (EditOrSave) {
            onSave(form)
            console.log('Dados salvos: ', form)
        }
        setEditOrSave((prev) => !prev);
    }
    
    const ExisteTreino = Aluno?.treinos?.length > 0;

    useEffect(() => {
        if (Treino && Treino.length > 0) {
            const treinoAtual = Treino.find(t => t.id === form.id);
            if (treinoAtual) {
                setForm({
                    id: treinoAtual.id || "",
                    nomeExercicio: treinoAtual.nomeExercicio || "",
                    reperticoes: treinoAtual.reperticoes || "",
                    exercucoes: treinoAtual.exercucoes || "",
                    intervalo: treinoAtual.intervalo || "",
                    exercucoesPorRep: treinoAtual.exercucoesPorRep || "",
                    foto: treinoAtual.foto || null
                });
            }
        }
    }, [Treino, form.id])

    return (
        <>
            {ExisteTreino ? (
                <>
                    <div className="w-[30%] h-full flex flex-col items-center p-2 ml-2 max-md:w-[50%]">
                        <div className="bg-gray-600 rounded-full relative aspect-square h-[25%] cursor-pointer">
                            <input
                                type="file"
                                onChange={setFoto}
                                disabled={!EditOrSave}
                                accept="image/*"
                                className="absolute appearance-none w-fit h-full opacity-0 cursor-pointer z-20 whitespace-break-spaces"
                            />
                            {form?.foto && (
                                <img
                                    src={URL.createObjectURL(form?.foto)}
                                    alt="Foto do dicas"
                                    className="absolute w-full h-full rounded-full object-cover z-10"
                                />
                            )}
                        </div>
                        <form className="flex flex-col items-center justify-center p-2 w-full space-y-2">
                            {InformacoesTreino.map((item, index) => (
                                <div key={index} className="flex justify-center items-center flex-col relative w-[100%]">
                                    <label className="text-[#252424] text-[14px] font-aleo font-medium max-md:text-[13px] max-md:text-center">{item.label}</label>
                                    <input
                                        type={item.type}
                                        name={item.name}
                                        readOnly={!EditOrSave}
                                        onChange={getValues}
                                        value={form[item.name]}
                                        className="w-full appearance-none text-black border-b-[1px] border-[#252424] bg-slate-50 outline-none text-center"
                                    />
                                </div>
                            ))}
                        </form>
                        <div className="relative flex flex-col justify-end h-[15%] items-center w-full">
                            <h1 className={`text-red-500 absolute top-0 whitespace-nowrap text-[14px] font-aleo duration-500 ${verification ? "opacity-100" : "opacity-0"}`}>
                                Preencha todas as informações
                            </h1>
                            <button
                                onClick={toggleEditSave}
                                className="bg-[#252424] font-poltawski text-white w-[70%] whitespace-nowrap py-1 px-2 justify-center rounded-md flex items-center font-bold hover:bg-[#2e2e2e] hover:text-[#FFF4A3] duration-500 active:bg-[#4e4e4e] mb-1 shadow-md shadow-[#252424]"
                            >
                                {EditOrSave ? "Salvar" : "Editar"}
                            </button>
                        </div>
                    </div>

                    <div className="w-[55%] h-full flex justify-between items-center p-2 space-y-2 max-md:w-4/5 max-md:p-1">
                        <div className="w-[60%] h-full max-md:hidden"></div>
                        <div className="h-[98%] flex-col flex w-[70%] items-center space-y-2 translate-x-8 max-md:w-4/5">
                            <div className="flex items-center justify-center w-full relative">
                                <h1 className="font-poltawski font-bold text-[19px] max-md:text-[20px] whitespace-nowrap md:translate-y-1">
                                    {isMobile ? 'Dicas do treino' : `Dicas do treino para o aluno ${Aluno?.nome}`}
                                </h1>
                                <h1 className={`font-poltawski md:text-[16px] max-md:text-[14px] absolute bottom-0 text-emerald-700 font-semibold translate-y-5 duration-500 whitespace-nowrap ${FeedbackDicasMessage ? 'opacity-100' : 'opacity-0'}`}>
                                    Dicas salvas com sucesso
                                </h1>
                            </div>
                            {textAreas.map((item, index) => (
                                <div key={index} className="flex items-center justify-center flex-col w-full h-[60%] space-y-2">
                                    <h1 className="font-aleo max-md:text-center">{item.Descrição}</h1>
                                    <textarea
                                        name={item.name}
                                        onChange={(e) => {
                                            const {name, value} = e.target
                                            setDicas((Dicas) => ({
                                                ...Dicas,
                                                [name]: value
                                            }))
                                        }}
                                        className="w-full p-2 bg-[#252424] text-white rounded-md h-[70%] text-[14px] appearance-none"
                                    ></textarea>
                                </div>
                            ))}

                            <button
                                onClick={PegaDicas}
                                className="bg-[#252424] font-poltawski text-white w-[60%] whitespace-nowrap py-1 px-2 justify-center rounded-md flex items-center font-bold hover:bg-[#2e2e2e] hover:text-[#FFF4A3] duration-500 active:bg-[#4e4e4e] mb-2 shadow-md shadow-[#252424]"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex h-full w-full font-poltawski text-[30px] font-bold text-black items-center justify-center">
                    Não há treinos disponíveis
                </div>
            )}

            <button onClick={setIsMobile} className=" md:hidden absolute z-20 -left-2 top-2 max-md:top-2 text-[#252424] hover:text-red-600 duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#252424"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
            </button>
        </>
    );
}




