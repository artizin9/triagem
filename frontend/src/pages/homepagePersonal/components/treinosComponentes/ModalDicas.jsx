import { TreinosSelecionados } from "./TreinosSelecionados"
import { RenderDicas } from "./RenderDicas"
import { useState, useEffect } from "react"

export function ModalDicas({ Treino, onOpen, onClose, Aluno, setTreino, Save, Foto, setFoto, form, setForm, Dicas, setAluno, setDicas }) {
    const [verification, setVerification] = useState(false)
    const [idTreino, setIdTreino] = useState(Treino?.id)
    const [isMobile, setIsMobile] = useState(false)

    const getValuesFields = (e) => {
        const { name, value } = e.target
        
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }))
    }

    const getFoto = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setForm((data) => ({ ...data, foto: file }))
            setFoto(file)
        }
    }

    const Verification = () => {
        const { nomeExercicio, reperticoes, exercucoes, intervalo, exercucoesPorRep, tipo } = form
        const CamposPreenchidos = nomeExercicio && reperticoes && exercucoes && intervalo && exercucoesPorRep && tipo

        if (!CamposPreenchidos) {
            setVerification(true)
            return false
        }

        setVerification(false)
        return true
    }

    const SalvarTreino = (dadosForm) => {
        console.log("ta rodando?")
        if (!Verification()) return
    
        setTreino((prevTreinos) => {
            const novosTreinos = prevTreinos.map((treino) =>
                treino.id === idTreino ? { ...treino, ...dadosForm } : treino
            )
            console.log("Após atualização do treino:", novosTreinos)
            return novosTreinos
        })
    
        setAluno((prevAlunos) => {
            const novosAlunos = prevAlunos.map((a) =>
                a.id === Aluno.id
                    ? {
                          ...a,
                          treinos: a.treinos.map((treino) =>
                              treino.id === idTreino ? { ...treino, ...dadosForm } : treino
                          ),
                      }
                    : a
            )
            return novosAlunos
        })
    }

    const getValuesDicas = () => {
        const { id } = Dicas
        const newId = id ? id : Date.now()
        const DataDicas = { ...Dicas, id: newId }
    
        setDicas({ ...DataDicas })
    
        setAluno((alunos) =>
            alunos.map((a) => {
                if (a.id === Aluno?.id) {
                    return {
                        ...a,
                        treinos: a.treinos.map((treino) => {
                            if (treino.id === idTreino) { // idTreino é o ID do treino específico
                                return {
                                    ...treino,
                                    dicas: treino.dicas
                                        ? treino.dicas.some((dica) => dica.id === newId)
                                            ? treino.dicas.map((dica) =>
                                                dica.id === newId ? { ...DataDicas } : dica
                                            )
                                            : [...treino.dicas, DataDicas]
                                        : [DataDicas], // Cria a lista de dicas caso não exista
                                }
                            }
                            return treino // Retorna os outros treinos inalterados
                        }),
                    }
                }
                return a // Retorna os outros alunos inalterados
            })
        )
    }

    useEffect(() => {
        if (idTreino && Treino) {
            const treinoAtual = Treino.find(t => t.id === idTreino)
            if (treinoAtual) {
                setForm({
                    ...treinoAtual, // Pega os dados do treino selecionado e atualiza o estado
                    foto: Foto || treinoAtual.foto
                })
            }
        }
    }, [idTreino, Treino, Foto])

    return (
        <div
            className={`h-[70%] w-[70%] bg-slate-50 flex item-center fixed top-24 rounded-md shadow-lg shadow-[#272626] transform max-md:w-[95%] ${
                onOpen ? "scale-100 opacity-100" : "scale-110 opacity-0 pointer-events-none"
            } transition-all duration-300`}
        >
            <div className={`${isMobile ? "h-full w-[25%] bg-[#252424] rounded-md flex items-center relative flex-col p-2 space-y-4 max-md:w-full max-md:hidden" : "h-full w-[25%] bg-[#252424] rounded-md flex items-center relative flex-col p-2 space-y-4 max-md:w-full"}`}>
                <h1 className="text-white font-poltawski font-bold text-[20px]"> Treinos selecionados </h1>

                <div className="flex items-center flex-col w-full item-center h-full custom-scrollbar overflow-y-auto overflow-x-hidden font-aleo text-white space-y-2 max-md:w-[85%]">
                    <h1>Aluno: {Aluno?.nome}</h1>
                    {Treino?.map((item, index) => (
                        <button
                        onClick={() => {
                            if (window.innerWidth <= 768) {
                                setIsMobile(true)
                            }
                            setIdTreino(item?.id)
                        }}
                            key={index}
                            className={`${
                                item?.id === idTreino ? "bg-[#464545] text-[#e2e057] rounded-md" : ""
                            } w-full h-fit`}
                        >
                            <TreinosSelecionados
                                key={index}
                                Remove={() => setTreino((treinos) => treinos.filter((_, i) => i !== index))}
                                Treino={item}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className={`${isMobile ? "w-full h-full flex items-center space-x-4" : "w-3/4 h-full flex items-center space-x-4 max-md:hidden"}`}> 
                {idTreino && (
                    <RenderDicas
                    Treino={Treino}
                    ValoresInput={getValuesFields}
                    Aluno={Aluno}
                    setAluno={setAluno}
                    onSave={(dadosForm) => SalvarTreino(dadosForm)}
                    getValues={getValuesFields}
                    Foto={Foto}
                    setFoto={getFoto}
                    Dicas={Dicas}
                    form={form}
                    setForm={setForm}
                    setDicas={setDicas}
                    PegarDicas={getValuesDicas}
                    setIsMobile={() => setIsMobile(false)}
                    isMobile={isMobile}
                />
                )}
            </div>

            <button onClick={onClose} className="absolute right-0 top-0 text-[#252424] hover:text-red-600 duration-500 max-md:text-white max-md:left-0">
                <svg width="31" height="37" viewBox="0 0 31 37" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.82749 22.9235L8.42749 21.5235L14.0275 15.9235L8.42749 10.3235L9.82749 8.92346L15.4275 14.5235L21.0275 8.92346L22.4275 10.3235L16.8275 15.9235L22.4275 21.5235L21.0275 22.9235L15.4275 17.3235L9.82749 22.9235Z"
                        fill="currentColor"
                    />
                </svg>
            </button>
        </div>
    )
}