import { useEffect, useState } from "react"
import PhotoDefaultTreino from "../../../../assets/imgs/selecionarFoto.png"
import { createTraining } from "../../../../utils/api/api"


const Clean = (<svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22" fill="currentColor"><path d="M440-520h80v-280q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800v280ZM200-360h560v-80H200v80Zm-58 240h98v-80q0-17 11.5-28.5T280-240q17 0 28.5 11.5T320-200v80h120v-80q0-17 11.5-28.5T480-240q17 0 28.5 11.5T520-200v80h120v-80q0-17 11.5-28.5T680-240q17 0 28.5 11.5T720-200v80h98l-40-160H182l-40 160Zm676 80H142q-39 0-63-31t-14-69l55-220v-80q0-33 23.5-56.5T200-520h160v-280q0-50 35-85t85-35q50 0 85 35t35 85v280h160q33 0 56.5 23.5T840-440v80l55 220q13 38-11.5 69T818-40Zm-58-400H200h560Zm-240-80h-80 80Z"/></svg>)

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

export function CreateTreino({ treino, setTreino, Close, Open, formTreino, setformTreino, CleanformTreino }) {

    const [setaDestined, setSetaDestined] = useState(false)
    const [setaWeekDay, setSetaWeekDay] = useState(false)
    const [messageError, setMessageError] = useState('')
    const [messageRight, setMessageRight] = useState(false)
    const [error, setError] = useState(false)
    const [messageClean, setMessageClean] = useState(false)

    const { name, destined, weekDay, time, photo, file } = formTreino

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

    // o back so precisdaa fazer a requisição aq abaixo fe tudo
    async function Createtreino() {
        if (!Verification()) {
            setError(true)
            return
        }

        const formDataTraining = new FormData()
        formDataTraining.append('file', file)

        for (const key in formTreino){
            key !== 'file' ? formDataTraining.append(key, formTreino[key]) : ''
        }

        setTreino((treinos) => [...treinos, {...formTreino, exercise: [] }])
        setError(false)
        CleanformTreino()
        setMessageRight(true)
        setTimeout(() => {
            setMessageRight(false)
        }, 4000)

        await createTraining(formDataTraining)
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
                    <img src={photo ? photo : PhotoDefaultTreino} className="w-full aspect-square rounded-full object-cover duration-500 hover:border-white hover:scale-105" />
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
                                    <option className="text-primary-200 text-[12px]" value="">{item.name === "destined" ? 'Selecione o destino' : 'Selecione o dia'}</option>
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
                                    className="border-b-white border-b w-full text-white outline-none bg-[#131313] placeholder:font-albert placeholder:font-medium placeholder:text-[12px] placeholder:text-primary-200"
                                />)}
                            {item.type === "select" ? (item.name === "destined" ? SetaDestined : SetaWeekday) : ''}
                        </div>

                    ))}
                </div>
                <div className="h-full w-full flex items-center justify-center relative">
                    <h1 className={`font-albert duration-500 font-medium text-[16px] text-white absolute top-2 ${messageRight ? 'opacity-100' : 'opacity-0'}`}>
                        O treino foi cadastrado com sucesso!</h1>
                    <button
                        onClick={Createtreino}
                        className=" flex items-center justify-center mt-5 w-[30%] py-1 font-poppins font-extrabold text-white bg-primary-100 shadow-md shadow-black/50  rounded-lg">Cadrastrar treino</button>
                </div>

                <button onClick={Close} className="absolute w-fit h-fit top-2 left-1 hover:text-primary-100 text-white duration-500">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.75933 17.05L4.49951 15.7937L9.53877 10.7684L4.49951 5.74315L5.75933 4.48684L10.7986 9.51209L15.8379 4.48684L17.0977 5.74315L12.0584 10.7684L17.0977 15.7937L15.8379 17.05L10.7986 12.0247L5.75933 17.05Z" fill="currentColor" />
                    </svg>
                </button>

                <button
                    onMouseEnter={() => setMessageClean(true)}
                    onMouseLeave={() => setMessageClean(false)}
                    onClick={CleanformTreino} className="absolute w-fit h-fit top-3 right-1 hover:text-primary-100 text-white duration-500">
                    {Clean}
                </button>
                <div
                    className={`bg-primary-100/80 absolute top-10 right-1 text-white font-albert font-medium px-1 py-1 rounded-md duration-500 ease-in-out ${messageClean ? "opacity-100" : "opacity-0"}`}>
                    Limpar tudo
                </div>
            </div>
        </div>
    )
}