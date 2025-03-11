import { useEffect, useState } from "react"
import noPhoto from '../../../../assets/imgs/selecionarFoto.png'
import { updateTraining } from "../../../../utils/api/api"

const OptionsWeekDay = [
    {day: 'Segunda-feira'},
    {day: 'Terça-feira'},
    {day: 'Quarta-feira'},
    {day: 'Quinta-feira'},
    {day: 'Sexta-feira'},
    {day: 'Sábado'},
    {day: 'Domingo'},
]

const OptionsDestined = [
    {destined: 'Iniciantes'},
    {destined: 'Intermediários'},
    {destined: 'Avançados'}
]

export function UpdateTreino({ treino, setTreino, Close, Open, formTreino, setformTreino}) {

    const [setaDestined, setSetaDestined] = useState(false)
    const [setaWeekDay, setSetaWeekDay] = useState(false)
    const [messageError, setMessageError] = useState('')
    const [messageRight, setMessageRight] = useState(false)
    const [error, setError] = useState(false)
    const [messageClean, setMessageClean] = useState(false)

    const { id, name, destined, weekDay, time, photo, file } = formTreino

    function GetValuesformTreino(e) {
        const { name, value } = e.target
        setformTreino((treino) => ({
            ...treino,
            [name]: value
        }))
    }

    function HandleFileChange(e) {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setformTreino((prev) => ({ 
                    ...prev, 
                    file: file,
                    photo: reader.result }))
            }
            reader.readAsDataURL(file)
        }
    }

    function Verification() {
        setError(false)
        setMessageError('')

        const isFieldsNotEmpty = name.trim() && destined.trim() && weekDay.trim() && time.trim()

        if (!isFieldsNotEmpty) {
            setMessageError("Erro! Não deixe nenhum campo vazio")
            setError(true)
            return false
        }

        return true
    }


   async function UpdateTreino() {
        if (!Verification()) {
            setError(true)
            return
        }

        const formDataTraining = new FormData()
        formDataTraining.append('file', file)

        for (const key in formTreino){
            key !== 'file' ? formDataTraining.append(key, formTreino[key]) : ''
        }

        setTreino((treinos) => 
            treinos.map((treino) => treino.id === id ? {...treino, ...formTreino} : treino)
        )
        setError(false)
        setMessageRight(true)
        setTimeout(() => {
            setMessageRight(false)
        }, [2000])

        await updateTraining(id, formDataTraining)
    }

    // O backend deve colocar a api da cidade e estado, boa sorte nisso

    const formTreinoFields = [
        { label: "Nome:", name: "name", type: "text", onChange: GetValuesformTreino, placeholder: "Ex. Treino de Peito ", value: name },
        { label: "Destinado para:", name: "destined", type: "select", onChange: GetValuesformTreino, value: destined },
        { label: "Tempo de conclusão:", name: "time", type: "text", onChange: GetValuesformTreino, placeholder: "Ex. 3 meses", value: time },
        { label: "Dia da semana:", name: "weekDay", type: "select", onChange: GetValuesformTreino, value: weekDay }
    ]

    const SetaDestined = (<svg width="24" height="24" className={`absolute right-0 bottom-0.5 duration-500 transition-all ${setaDestined ? "rotate-180" : "rotate-0"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 13.2L16.6 8.6L18 10L12 16L6 10L7.4 8.6L12 13.2Z" fill="#FFF" />
    </svg>
    )

    const SetaWeekday = (<svg width="24" height="24" className={`absolute right-0 bottom-0.5 duration-500 transition-all ${setaWeekDay ? "rotate-180" : "rotate-0"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 13.2L16.6 8.6L18 10L12 16L6 10L7.4 8.6L12 13.2Z" fill="#FFF" />
    </svg>
    )

    useEffect(() => { }, [treino])

    return (
        <div onClick={Close} className={`w-full h-full bg-black flex justify-center items-center bg-opacity-30 fixed insert-0 ${Open ? 'visible' : 'invisible'}`}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={`h-[90%] w-3/5 flex flex-col items-center relative rounded-lg shadow-md shadow-black/60 bg-[#131313] pt-1 duration-300 ease-in-out ${Open ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}>
                <div className="flex flex-col text-center mt-4">
                    <h1 className="font-poppins font-extrabold text-[26px] text-white">INFORMAÇÕES DO <span className="text-primary-100">TREINO</span></h1>
                    <h1 className="font-albert font-normal text-[16px] text-white">Preencha as informações necessárias</h1>
                </div>

                <div className="w-1/5 aspect-square rounded-full relative bg-[#252424] mt-4 duration-500 border-opacity-0 ease-in-out transition-all border border-primary-100 hover:border-opacity-100  hover:scale-105">
                    <img src={photo ? photo : noPhoto} className="w-full aspect-square rounded-full object-cover duration-500 hover:border-white hover:scale-105" />
                    <input type="file" accept="image/*" onChange={HandleFileChange} className="opacity-0 absolute top-0 w-full h-full cursor-pointer" />
                </div>
                <div className="relative flex justify-center items-center">
                    <h1 className="font-albert font-normal text-[16px] text-white mt-2">Selecione uma foto</h1>
                    <h1 className={`font-albert text-primary-100 whitespace-nowrap absolute bottom-0 translate-y-6 duration-500 ${error ? "opacity-100" : "opacity-0"}`}>{messageError}</h1>
                </div>

                <div className="grid grid-cols-2 gap-6 w-[60%] gap-x-8 gap-y-12 p-2 mt-6 place-items-center">
                    {formTreinoFields.map((item, index) => (
                        <div key={index} className="w-full flex flex-col relative">
                            <label className="font-albert font-normal text-[#d7d7d7]">{item.label}</label>
                            {item.type === "select" ? (
                                <select
                                    value={item.value}
                                    onClick={item.name === 'destined' ? () => setSetaDestined(prev => !prev) : () => setSetaWeekDay(prev => !prev)}
                                    name={item.name}
                                    onChange={item.onChange}
                                    className="border-b-white border-b w-full text-white outline-none bg-[#131313] appearance-none"
                                >
                                    <option className="text-[#d7d7d7]" value="">{item.name === "destined" ? 'Selecione o destino' : 'Selecione o dia'}</option>
                                    {item.name === "destined" ? OptionsDestined.map((item, index) => (
                                        <option key={index} value={item.destined}>{item.destined}</option>
                                    )) :  OptionsWeekDay.map((item, index) => (
                                        <option key={index} value={item.day}>{item.day}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    value={item.value}
                                    name={item.name}
                                    placeholder={item.placeholder}
                                    type={item.type}
                                    onChange={item.onChange}
                                    className="border-b-white border-b w-full text-white outline-none bg-[#131313]"
                                />)}
                            {item.type === "select" ? (item.name === "destined" ? SetaDestined : SetaWeekday) : ''}
                        </div>

                    ))}
                </div>
                <div className="h-full w-full flex items-center justify-center relative">
                    <h1 className={`font-albert duration-500 font-medium text-[16px] text-white absolute top-2 ${messageRight ? 'opacity-100' : 'opacity-0'}`}>
                        O treino foi atualizado com sucesso!</h1>
                    <button
                        onClick={UpdateTreino}
                        className=" flex items-center justify-center mt-5 w-[30%] py-1 font-poppins font-extrabold text-white bg-primary-100 shadow-md shadow-black/50  rounded-lg">Salvar informações</button>
                </div>

                <button onClick={Close} className="absolute w-fit h-fit top-2 left-1 hover:text-primary-100 text-white duration-500">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.75933 17.05L4.49951 15.7937L9.53877 10.7684L4.49951 5.74315L5.75933 4.48684L10.7986 9.51209L15.8379 4.48684L17.0977 5.74315L12.0584 10.7684L17.0977 15.7937L15.8379 17.05L10.7986 12.0247L5.75933 17.05Z" fill="currentColor" />
                    </svg>
                </button>
            </div>
        </div>
    )
}