import { useEffect, useState } from "react"
import { TreinosSelecionados } from "./TreinosSelecionados"
import { ModalTreinoMobile } from "./modalTrienoMobile"
import '../alunosComponents/style.css'

export function ModalTreino({ onOpen, onClose, onSave, Treino, setTreino, Foto, setFoto, Aluno, setAluno, form, setForm, ForceAbleModal }) {
    // Meio que apartir daqui é quase a mesma logica, não preciso explicar
    const [verification, setVerification] = useState(false)
    const [feedbackTreino, setFeedbackTreino] = useState(false)
    const [visibleModalMobile, setVisibleModalMobile] = useState(false)

    const getValuesFields = (e) => {
        const { name, value } = e.target
        setForm((valores) => ({
            ...valores,
            [name]: value,
        }))
    }

    const getFoto = (e) => {
        console.log(e.target.files)
        const file = e.target.files?.[0]
        if (file) {
            setForm((data) => ({ ...data, foto: file }))
            setFoto(file)
        } else {
            console.log("Nenhum arquivo selecionado.")
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

    const SalvarTreino = () => {
        if (!Verification()) return

        const { id } = form
        const newId = id ? id : Date.now()
        const Dataform = { ...form, id: newId }

        setTreino((treino) => {
            return treino.some((item) => item.id === newId)
                ? treino.map((item) => (item.id === newId ? Dataform : item))
                : [...treino, Dataform];
        });

        setAluno((alunos) =>
            alunos.map((a) => {
                if (a.id === Aluno?.id) {
                    return {
                        ...a,
                        treinos: a.treinos
                            ? [...a.treinos, Dataform] 
                            : [Dataform],
                    };
                }
                return a 
            })
        )

        setFeedbackTreino(true)
        setTimeout(() => {
            setFeedbackTreino(false)
        }, [2000])
    }


    useEffect(() => {
        if (Treino) {
            setForm({
                nomeExercicio: Treino?.nomeExercicio || '',
                reperticoes: Treino?.reperticoes || '',
                exercucoes: Treino?.exercucoes || '',
                intervalo: Treino?.intervalo || '',
                exercucoesPorRep: Treino?.exercucoesPorRep || '',
                tipo: Treino?.tipo || '',
                foto: Treino?.foto || null
            })
        } else {
            setForm({
                nomeExercicio: '',
                reperticoes: '',
                exercucoes: '',
                intervalo: '',
                exercucoesPorRep: '',
                tipo: '',
                foto: Foto || null
            })

        }
    }, [Treino, Foto, Aluno])

    const campos = [
        { name: "nomeExercicio", type: "text", label: "Nome do exercicio:", placeholder: 'Ex. Agachamento' },
        { name: "reperticoes", type: "number", label: "Repertições:", placeholder: 'Ex. 12' },
        { name: "exercucoes", type: "number", label: "Exercuções:", placeholder: 'Ex. 3' },
        { name: "intervalo", type: "text", label: "Intervalo:", placeholder: 'Ex. 30 segundos' },
        { name: "exercucoesPorRep", type: "text", label: "Exercuções por rep:", placeholder: 'Ex. 3x12' },
        { name: "tipo", type: "text", label: "Tipo de treino:", placeholder: 'Ex. Iniciante' }
    ]

    return (
        <div className={`h-[70%] w-[70%] bg-slate-50 flex item-center justify-center fixed top-24 rounded-md shadow-lg shadow-[#272626] transform max-md:w-[90%] max-md:h-[65%] max-md:max-h-[480px] ${onOpen ? 'scale-100 opacity-100' : 'scale-110 opacity-0 pointer-events-none'}  transition-all duration-300`}>
            <div className={`flex relative items-center space-y-2 flex-col h-full w-[75%] max-md:w-full p-2 text-whi ${visibleModalMobile ? 'hidden cursor-not-allowed' : ''}`}>
                <div className="flex justify-center h-fit">
                    <h1 className="text-black text-[25px] font-poltawski font-bold max-md:text-[24px] max-md:mt-1"> Informações do treino </h1>
                </div>

                <div className="bg-gray-600 rounded-full relative aspect-square h-[30%] max-md:h-2/5 cursor-pointer">
                    <input
                        type="file"
                        onChange={getFoto}
                        accept="image/*"
                        className={`absolute appearance-none w-fit h-full opacity-0 cursor-pointer z-20 whitespace-break-spaces`}
                    />

                    {form.foto && (
                        <img
                            src={URL.createObjectURL(form.foto)}
                            alt="Foto do exercicio"
                            className="absolute w-full h-full rounded-full object-cover z-10"
                        />
                    )}

                    <svg width="20" height="20" className="absolute right-[50%] text-white translate-x-[10px] max-md:translate-y-8 md:translate-y-14  insert-0" viewBox="0 0 22 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.5 12.5H0.5V9.5H9.5V0.5H12.5V9.5H21.5V12.5H12.5V21.5H9.5V12.5Z" fill="currentColor" />
                    </svg>
                </div>

                <h1 className="text-black font-aleo -translate-y-1">Selecione a foto do exercicio</h1>

                <div className="w-full flex flex-col justify-center relative items-center h-fit space-y-4">
                    <h1 className={`text-red-500 absolute top-0 -translate-y-3 font-aleo  duration-500 ${verification ? 'opacity-100' : 'opacity-0'}`}>Preencha todas as informações</h1>
                    <h1 className={`text-white absolute top-0 -translate-y-3 font-aleo  duration-500 ${feedbackTreino ? 'opacity-100' : 'opacity-0'}`}>Treino criado com sucesso!</h1>
                    <form className="w-full grid grid-cols-3 max-md:grid-cols-2 place-items-center p-2 gap-x-3 gap-y-4 md:gap-y-8 max-md:p-1">
                        {campos.map((item, index) => (
                            <div key={index} className="flex justify-center flex-col relative w-[100%]">
                                <label className="text-[#252424] font-aleo font-medium max-md:text-[14px] max-md:whitespace-nowrap">{item.label}</label>
                                <input
                                    type={item.type}
                                    name={item.name}
                                    onChange={getValuesFields}
                                    value={form[item.name]}
                                    placeholder={item.placeholder}
                                    className="w-full appearance-none text-black border-b-[1px] border-[#252424] bg-white outline-none"
                                />
                            </div>
                        ))}
                    </form>

                    <button onClick={SalvarTreino} className=" max-md:w-[30%] w-[25%] bg-[#252424] text-white px-2 py-1 rounded-md text-[18px] font-poltawski font-bold flex justify-center space-x-4 items-center hover:bg-[#2e2e2e] hover:text-[#FFF4A3] duration-500 active:bg-[#4e4e4e] shadow-md shadow-[#252424]">
                        <h1 >Salvar</h1>
                        <svg width="16" height="16" className="" viewBox="0 0 22 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.5 12.5H0.5V9.5H9.5V0.5H12.5V9.5H21.5V12.5H12.5V21.5H9.5V12.5Z" fill="currentColor" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="h-full max-md:hidden w-[25%] bg-[#252424] rounded-md flex items-center relative flex-col p-2 space-y-4">
                <h1 className="text-white font-poltawski font-bold text-[20px]"> Treinos selecionados </h1>

                <div className="flex items-center flex-col w-full item-center h-full custom-scrollbar overflow-y-auto overflow-x-hidden font-aleo text-white space-y-2">
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

            <ModalTreinoMobile 
            Aluno={Aluno}
            setAluno={setAluno}
            visibleModalMobile={visibleModalMobile}
            onClose={onClose}
            setVisibleModalMobile={setVisibleModalMobile}
            TreinosSelecionados={TreinosSelecionados}
            />

            <button onClick={onClose} className="absolute left-0 top-1 text-[#252424] hover:text-red-600 duration-500">
                <svg width="31" height="37" viewBox="0 0 31 37" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.82749 22.9235L8.42749 21.5235L14.0275 15.9235L8.42749 10.3235L9.82749 8.92346L15.4275 14.5235L21.0275 8.92346L22.4275 10.3235L16.8275 15.9235L22.4275 21.5235L21.0275 22.9235L15.4275 17.3235L9.82749 22.9235Z" fill="currentColor" />
                </svg>
            </button>
        
            <button onClick={() => setVisibleModalMobile(true)} className="absolute md:hidden right-0 top-0 text-[#252424] hover:text-red-600 duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" height="37" viewBox="0 -960 960 960" width="31" fill="#252424"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
            </button>
        </div>
    )
}