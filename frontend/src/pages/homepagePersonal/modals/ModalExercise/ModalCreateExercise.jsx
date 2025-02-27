import { useEffect, useState } from "react"

const PhotoDefaultSrc = "data:image/svg+xml,%3Csvg width='150' height='150' viewBox='0 0 150 150' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='75' cy='75' r='75' fill='%23252424'/%3E%3Cpath d='M127.53 128.642C127.53 121.785 126.362 112.859 123.609 106.524C120.855 100.189 116.82 94.4326 111.732 89.5839C106.644 84.7352 100.604 80.8891 93.9567 78.265C87.3093 75.6409 80.1847 74.2903 72.9895 74.2903C65.7944 74.2903 58.6697 75.6409 52.0223 78.265C45.3749 80.8891 39.3349 84.7352 34.2472 89.5839C29.1595 94.4326 25.1237 100.189 22.3702 106.524C19.6167 112.859 19.8806 119.484 19.8806 126.341C37.059 139.811 44.664 149.696 73.9359 149.763L81.208 149.054L89.6756 147.63L96.3998 145.968L101.132 144.544L105.614 142.693L109.101 141.126L112.588 139.323L116.074 137.281L119.312 135.145L121.678 133.474L124.044 131.633L124.542 131.253L125.04 130.816L126.036 129.971L127.157 128.974L127.53 128.642Z' fill='%23A9A9A9'/%3E%3Ccircle cx='74.7635' cy='39.2745' r='28.3912' fill='%23A9A9A9'/%3E%3C/svg%3E"

const Clean = (<svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22" fill="currentColor"><path d="M440-520h80v-280q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800v280ZM200-360h560v-80H200v80Zm-58 240h98v-80q0-17 11.5-28.5T280-240q17 0 28.5 11.5T320-200v80h120v-80q0-17 11.5-28.5T480-240q17 0 28.5 11.5T520-200v80h120v-80q0-17 11.5-28.5T680-240q17 0 28.5 11.5T720-200v80h98l-40-160H182l-40 160Zm676 80H142q-39 0-63-31t-14-69l55-220v-80q0-33 23.5-56.5T200-520h160v-280q0-50 35-85t85-35q50 0 85 35t35 85v280h160q33 0 56.5 23.5T840-440v80l55 220q13 38-11.5 69T818-40Zm-58-400H200h560Zm-240-80h-80 80Z"/></svg>)

const seeExercise = (<svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2.00353C9 0.375799 10.8407 -0.570208 12.1642 0.377318L20.7285 6.50858C21.8428 7.30637 21.8428 8.96322 20.7285 9.76101L12.1924 15.8721C10.8723 16.8171 9.03572 15.8786 9.02823 14.2551L9.01096 10.5109C9.01093 10.5049 9.00603 10.5 9 10.5H2.25C1.00736 10.5 0 9.49264 0 8.25C0 7.00736 1.00736 6 2.25 6H7C8.10457 6 9 5.10457 9 4V2.00353Z" fill="currentColor"/>
    </svg>)

export function CreateExercise({ Treino, setTreino, Close, Open, formExercise, setFormExercise, CleanFormExercise, formTreino, ReadExercise }) {

    const [messageError, setMessageError] = useState('')
    const [messageRight, setMessageRight] = useState(false)
    const [error, setError] = useState(false)
    const [messageClean, setMessageClean] = useState(false)
    const { photo, name, numberExec, numberRep, execByRep, interval, description} = formExercise
    const { id } = formTreino

    function GetValuesForm(e) {
        const { name, value } = e.target

        setFormExercise((aluno) => ({
            ...aluno,
            [name]: value
        }))
    }

    function HandleFileChange(e) {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormExercise((prev) => ({ ...prev, photo: reader.result }))
            }
            reader.readAsDataURL(file)
        }
    }

    function Verification() {
        setError(false)
        setMessageError('')

        const isFieldsNotEmpty = name.trim() && numberExec.trim() && numberRep.trim() && execByRep.trim() && description.trim() && interval.trim()

        if (!isFieldsNotEmpty) {
            setMessageError("Erro! Não deixe nenhum campo vazio")
            setError(true)
            return false
        }

        return true
    }


    function CreateExercise() {
        if (!Verification()) {
            setError(true)
            return
        }

        setTreino((treinos) =>
            treinos.map((treino) => {
              if (treino.id === id) {
                return {
                  ...treino,
                  exercise: [...(treino.exercise ?? []), { ...formExercise, id: Date.now() }]
                }
              }
              return treino
            })
          )
          
        setError(false)
        CleanFormExercise()
        setMessageRight(true)
        setTimeout(() => {
            setMessageRight(false)
        }, [2000])
    }

    const FormFields = [
        { label: "Nome:", name: "name", type: "text", onChange: GetValuesForm, placeholder: "Ex. Agachamento ", value: name },
        { label: "Numero de exercuções:", name: "numberExec", type: "text", onChange: GetValuesForm, placeholder: "Ex. 3 exercuções", value: numberExec },
        { label: "Numero de repertições:", name: "numberRep", type: "text", onChange: GetValuesForm, placeholder: "Ex. 12 repertições ", value: numberRep },
        { label: "Exercuções por repertições", name: "execByRep", type: "text", onChange: GetValuesForm, value: execByRep, placeholder: "Ex. 3x12 " },
        { label: "Intervalo:", name: "interval", type: "text", onChange: GetValuesForm, placeholder: "Ex. 30 segundos", value: interval },
        { label: "Descrição:", name: "description", type: "select", onChange: GetValuesForm, placeholder: "Ex. Você deve agachar...", value: description }
    ]

    useEffect(() => {}, [Treino, id])

    return (
        <div onClick={Close} className={`w-full h-full bg-black flex justify-center items-center bg-opacity-30 fixed insert-0 ${Open ? 'visible' : 'invisible'}`}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={`h-[90%] w-3/5 flex flex-col items-center relative rounded-lg shadow-md shadow-black/60 bg-[#131313] pt-1 duration-300 ease-in-out ${Open ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}>
                <div className="flex flex-col text-center mt-4">
                    <h1 className="font-poppins font-extrabold text-[26px] text-white">INFORMAÇÕES DO <span className="text-primary-100">EXERCICIO</span></h1>
                    <h1 className="font-albert font-normal text-[16px] text-white">Preencha as informações necessárias</h1>
                </div>

                <div className="w-1/5 aspect-square rounded-full relative bg-[#131313] mt-4 duration-500 border-opacity-0 ease-in-out transition-all border border-primary-100 hover:border-opacity-100  hover:scale-105">
                    <img src={photo ? photo : PhotoDefaultSrc} className="w-full aspect-square rounded-full object-cover duration-500 hover:border-white hover:scale-105" />
                    <input type="file" accept="image/*" onChange={HandleFileChange} className="opacity-0 absolute top-0 w-full h-full cursor-pointer" />
                </div>
                <div className="relative flex justify-center items-center">
                    <h1 className="font-albert font-normal text-[16px] text-white mt-2">Selecione uma foto</h1>
                    <h1 className={`font-albert text-primary-100 whitespace-nowrap absolute bottom-0 translate-y-6 duration-500 ${error ? "opacity-100" : "opacity-0"}`}>{messageError}</h1>
                </div>

                <div className="grid grid-cols-3 gap-6 w-[90%] gap-y-12 p-2 mt-6 place-items-center">
                    {FormFields.map((item, index) => (
                        <div key={index} className="w-full flex flex-col relative">
                            <label className="font-albert font-medium text-[#d7d7d7]">{item.label}</label>
                                <input
                                    value={item.value}
                                    name={item.name}
                                    placeholder={item.placeholder}
                                    type={item.type}
                                    onChange={item.onChange}
                                    className="border-b-white border-b w-full text-white outline-none bg-[#131313] placeholder:font-albert placeholder:font-medium placeholder:text-[12px] placeholder:text-primary-200"
                                />
                        </div>

                    ))}
                </div>
                <div className="h-full w-full flex items-center justify-center relative">
                    <h1 className={`font-albert duration-500 font-medium text-[16px] text-white absolute top-2 ${messageRight ? 'opacity-100' : 'opacity-0'}`}>
                        O exercicio foi cadastrado com sucesso!</h1>
                    <button
                        onClick={CreateExercise}
                        className=" flex items-center justify-center mt-5 w-[30%] py-1 font-poppins font-extrabold text-white bg-primary-100 shadow-md shadow-black/50  rounded-lg">Cadrastrar Exercicio</button>
                </div>

                <button onClick={Close} className="absolute w-fit h-fit top-2 left-1 hover:text-primary-100 text-white duration-500">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.75933 17.05L4.49951 15.7937L9.53877 10.7684L4.49951 5.74315L5.75933 4.48684L10.7986 9.51209L15.8379 4.48684L17.0977 5.74315L12.0584 10.7684L17.0977 15.7937L15.8379 17.05L10.7986 12.0247L5.75933 17.05Z" fill="currentColor" />
                    </svg>
                </button>

                <button
                    onMouseEnter={() => setMessageClean(true)}
                    onMouseLeave={() => setMessageClean(false)}
                    onClick={CleanFormExercise} className="absolute w-fit h-fit top-2.5 right-10 hover:text-primary-100 text-white duration-500">
                    {Clean}
                </button>
                <button
                    onClick={ReadExercise} className="absolute w-fit h-fit top-3 right-1 hover:text-primary-100 text-white duration-500">
                    {seeExercise}
                </button>
                <div
                    className={`bg-primary-100/80 absolute top-10 right-10 text-white font-albert font-medium px-1 py-1 rounded-md duration-500 ease-in-out ${messageClean ? "opacity-100" : "opacity-0"}`}>
                    Limpar tudo
                </div>
            </div>
        </div>
    )
}