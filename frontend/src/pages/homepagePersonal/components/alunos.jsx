import { useState, useMemo, useCallback, useEffect } from "react"
import { Modal } from './alunosComponents/alunosModal'
import { CardAluno } from "./alunosComponents/alunosCard"
import './alunosComponents/style.css'

const options = [
    { id: 1, value: 'Filtrar por...' },
    { id: 2, value: 'Nome' },
    { id: 3, value: 'Email' },
    { id: 4, value: 'Telefone' },
    { id: 5, value: 'IMC' },
    { id: 6, value: 'Cidade'},
    { id: 7, value: 'Estado'},
    { id: 8, value: 'Sexo'}
]


export function Alunos({alunos, setAlunos, selectedAluno, setSelectedAluno}) {
    const [arrow, setArrow] = useState(false)
    const [search, setSearch] = useState('')
    const [select, setSelect] = useState('Filtrar por...')
    const [modalOpen, setModalOpen] = useState(false)
    const [foto, setFoto] = useState(null)

    const ValorInput = useCallback((e) => {
        setSearch(e.target.value?.toLowerCase())
    }, [])

    const ValorSelect = useCallback((e) => {
        setSelect(e.target.value)
    },[])

    const Adicionar_Aluno = (newAluno) => {
        setAlunos((alunos) => [...alunos, newAluno])
        // Aqui eu estou adicionando o aluno criado, (criasse o aluno do modal aluno)
    }

    const Editar_Aluno = (aluno) => {
        if (aluno.id) {
            setAlunos((alunos) =>
                alunos.map(a =>
                    a.id === aluno.id ? { ...a, ...aluno } : a
                )
            );
        }
    }

    const cardsFilter = useMemo(() => {
        
        return alunos?.filter(({ nome, sobrenome, email, telefone, imc, cidade, estado, sexo }) => {
           const searchData = [
                { value: nome, key: 'Nome' },
                { value: sobrenome, key: 'Nome' },
                { value: email, key: 'Email' },
                { value: telefone, key: 'Telefone' },
                { value: imc ? imc.toString() : '', key: 'IMC' },
                { value: cidade, key: 'Cidade'},
                { value: estado, key: 'Estado'},
                { value: sexo, key: 'Sexo'}
            ]

            return searchData.some(({value, key}) => {
                if (select === 'Filtrar por...' || select === key){
                    return value?.toLowerCase().includes(search)
                }
                return false
            })
        })
    }, [search, select, alunos])

    return (
        <div className={`h-full w-full max-md:w-dvw flex items-center flex-col p-2 mt-5 relative S`}>
            <div className="w-full p-2 flex items-center justify-center space-x-6">
                <input
                    className="w-[70%] max-md:w-[65%] rounded-md outline-none pl-2 py-1.5 text-[14px] bg-[#252424] text-white "
                    placeholder="Pesquisar..."
                    value={search}
                    onChange={ValorInput}
                />
                <div className="w-[12%] flex relative max-md:w-[35%]">
                    <select 
                    value={select}
                    onChange={ValorSelect}
                    className="py-1.5 px-2 w-full rounded-md  outline-none text-[14px] bg-[#252424] text-white p-1 appearance-none" onClick={() => { setArrow(Arrow => !Arrow) }}>
                        {options.map((item, index) => (
                            <option className="p-1 rounded-md max-md:p-0" key={index} value={item.value}>{item.value}</option>
                        ))}
                    </select>

                    <button
                        className="absolute right-1 bottom-[3px] duration-500"
                    >
                        {arrow ? (<svg xmlns="http://www.w3.org/2000/svg" className="rotate-180 transform transition-transform duration-300 bottom-[3px]" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffff"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" className="transform transition-transform duration-300" width="24px" fill="#ffff"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>)}
                    </button>
                </div>
            </div>

            <div className="mt-4 flex items-center">
                <button
                    onClick={() => {
                        setModalOpen(true) 
                        setSelectedAluno(null)}
                    }
                    className="bg-white font-poltawski text-[#252424] white py-2 px-5 justify-between rounded-md flex items-center font-bold hover:bg-[#252424] hover:text-[#FFF4A3] duration-500 active:bg-[#4e4e4e] max-md:px-2">
                    <h1 className="-translate-x-1 text-[15px]">Cadrastrar Aluno</h1>
                    <svg width="16" height="16" className="ml-2 md:translate-x-1 max-md:w-4 max-md:h-4" viewBox="0 0 22 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.5 12.5H0.5V9.5H9.5V0.5H12.5V9.5H21.5V12.5H12.5V21.5H9.5V12.5Z" fill="currentColor" />
                    </svg>

                </button>
            </div>
            <div className="grid grid-cols-3 w-[82%] max-md:w-full max-md:ml-2 ml-14 p-2 h-full overflow-y-auto custom-scrollbar mt-5 max-md:grid-cols-2 ">
            {cardsFilter?.map((aluno, index) => (
                    <CardAluno
                        key={aluno.id}
                        Aluno={aluno}
                        Edit={() => { 
                            setSelectedAluno(aluno)
                            setModalOpen(true)
                            Editar_Aluno(aluno) }}
                        Remove={() => setAlunos(Alunos => Alunos?.filter((_, a) => a !== index))}
                        Tipo='aluno'
                        Foto={foto}
                    />
            ))}
            </div>
            <div className="absolute flex justify-center item-center z-[1000]">
                <Modal
                    Open={modalOpen}
                    Close={() => setModalOpen(false)}
                    Save={selectedAluno ? Editar_Aluno : Adicionar_Aluno}
                    Aluno={selectedAluno}
                    Foto={selectedAluno?.foto} 
                    setFoto={setFoto} 
            />
            </div>
        </div>
    )
}
