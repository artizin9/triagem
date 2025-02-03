import { CardAluno } from "./alunosComponents/alunosCard"
import { useState, useMemo } from "react"
import { ModalTreino } from "./treinosComponentes/ModalTreino"
import { ModalDicas } from "./treinosComponentes/ModalDicas"

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

export function Treino({alunos, setAlunos, selectedAluno, setSelectedAluno, treinos, setTreinos}){
    
    const [arrow, setArrow] = useState(false)
    const [search, setSearch] = useState('')
    const [select, setSelect] = useState('Filtrar por...')
    const [modalTreino, setModalTreino] = useState(false)
    const [modalDicas, setModalDicas] = useState(false)
    const [foto, setFoto] = useState(null)

    // Isso funciona da mesma forma que o form do alunos, cria o form, envia pra array treinos
    const [form, setForm] = useState({
        id: 1,
        nomeExercicio: '',
        reperticoes: '',
        exercucoes: '',
        intervalo: '',
        exercucoesPorRep: '',
        descricao: '',
        foto: foto || null
    })

    const [dicas, setDicas] = useState({
        id: 1,
        Dicas: "",
        DicasSeguranca: "",
    })

    // Isso serve para obter informações do treino ja existente para eu poder utilizar em alguma tela (utilizei em renderDicas) 
    const [treinosExistentes, setTreinosExistentes] = useState({
        id: treinos?.id || 1,
        nomeExercicio: treinos?.nomeExercicio || "",
        reperticoes: treinos?.reperticoes || "",
        exercucoes: treinos?.exercucoes || "",
        intervalo: treinos?.intervalo || "",
        exercucoesPorRep: treinos?.exercucoesPorRep || "",
        descricao: treinos?.descricao || "",
        foto: treinos?.foto || null,
    })

    const filterCards = useMemo(() => {
        return alunos?.filter(({ nome, sobrenome, email, telefone, imc, cidade, estado, sexo}) => {
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
                    return value.toLowerCase().includes(search)
                }
                return false
            })
        })
    }, [search, select, alunos])

    return (
        <div className='h-full w-full flex items-center flex-col p-2 mt-5 relative'>
        <div className="w-full p-2 flex items-center justify-center space-x-6">
            <input
                className="w-[70%] max-md:w-[65%] rounded-md outline-none pl-2 py-1.5 text-[14px] bg-[#252424] text-white "
                placeholder="Pesquisar..."
                value={search}
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
            <div className="w-[12%] flex relative max-md:w-[35%]">
                <select 
                value={select}
                onChange={(e) => setSelect(e.target.value)}
                className="py-1.5 px-2 w-full rounded-md  outline-none text-[14px] bg-[#252424] text-white p-1 appearance-none" onClick={() => { setArrow(Arrow => !Arrow) }}>
                    {options.map((item, index) => (
                        <option className="p-1 rounded-md" key={index} value={item.value}>{item.value}</option>
                    ))}
                </select>

                <button
                    className="absolute right-1 bottom-[3px] duration-500"
                >
                    {arrow ? (<svg xmlns="http://www.w3.org/2000/svg" className="rotate-180 transform transition-transform duration-300 bottom-[3px]" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffff"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" className="transform transition-transform duration-300" width="24px" fill="#ffff"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>)}
                </button>
            </div>
        </div>
        <div className="grid grid-cols-3 w-[82%] ml-14 p-2 h-full overflow-y-auto custom-scrollbar mt-5 max-md:grid-cols-2 max-md:w-full max-md:ml-2">
                    {filterCards?.map((aluno, index) => (
                            <CardAluno
                                key={aluno.id}
                                Aluno={aluno}
                                Remove={() => setAlunos(Alunos => Alunos?.filter((_, i) => i !== index))}
                                onOpenTreino={() => {
                                    setSelectedAluno(aluno)
                                    setModalTreino(true)
                                }}
                                onOpenDicas={() => {
                                    setSelectedAluno(aluno)
                                    setModalDicas(true)
                                }}
                                Tipo='Treino'
                            />
                    ))}
                    </div>

        <ModalTreino 
        onOpen={modalTreino}
        onClose={() => setModalTreino(false)}
        setFoto={setFoto}
        Aluno={selectedAluno}
        Treino={treinos}
        setTreino={setTreinos}
        setAluno={setAlunos}
        form={form}
        setForm={setForm}
        />

        <ModalDicas 
        Treino={treinos}
        Aluno={selectedAluno}
        onOpen={modalDicas}
        setTreino={setTreinos}
        onClose={() => setModalDicas(false)}
        form={treinosExistentes}
        setForm={setTreinosExistentes}
        setAluno={setAlunos}
        setDicas={setDicas}
        Dicas={dicas}
        />
    </div>
    )}