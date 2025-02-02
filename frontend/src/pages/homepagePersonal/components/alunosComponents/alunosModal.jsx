import { useState, useEffect, useRef } from "react"
import { ModalMobileAluno } from "./AlunoModalMobile"

const options = [
    { id: 1, value: 'Selecionar sexo' },
    { id: 2, value: 'Masculino' },
    { id: 3, value: 'Feminino' },
    { id: 4, value: 'Outro' },
]

export function Modal({ Open, Close, Save, Aluno, setFoto, Foto}) {
    
    const [visible, setVisible] = useState(false)
    const [visibleModalMobile, setVisibleModalMobile] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [FeedbackMessage, setFeedbackMessage] = useState(false)
    const formRef = useRef(null)
    const [selectedAlunoIndex, setSelectedAlunoIndex] = useState(null)
    const [form, setForm] = useState({
        id: 1,
        nome: "",
        sobrenome: "",
        email: "",
        telefone: "",
        senha: "",
        sexo: "Selecionar sexo",
        foto: Foto || null,
    })

    const [campos_adicionais, setCampos_adicionais] = useState({
                IMC: "",
                estado: 'Ceara',
                cidade: "Massape",
            })

    // Essa função pega os valores dos campos
    const getValuesfields = (e) => {
        const { name, value } = e.target
        if (campos_adicionais.hasOwnProperty(name)) {
            setCampos_adicionais((prev) => ({
                ...prev,
                [name]: value,
            }))
        } else {
            setForm((valores) => ({
                ...valores,
                [name]: value,
            }))
        }
    }

    const MaskTelefone = (e) => {
        const { value } = e.target
        const cleaned = value.replace(/\D/g, '')

        let formatted = ''
        if (cleaned.length <= 2) {
            formatted = cleaned
        } else if (cleaned.length <= 7) {
            formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`
        } else {
            formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`
        }

        setForm((valores) => ({
            ...valores,
            telefone: formatted,
        }))
    }

    // Essa pega o valor da foto
    const getValueFoto = (e) => {
        const file = e.target.files[0]
        if (file) {
            setForm((data) => ({ ...data, foto: file }))
            setFoto(file)
        }
    }

    const VerificarCampos = () => {
        const { email, telefone, sexo, nome, sobrenome, senha} = form
        console.log("Telefone:", telefone)

        const EmailValido = email.includes("@") && email.endsWith(".com")
        const TelefoneValido = telefone && telefone.replace(/\D/g, '').length === 11
        const SexoSelecionado = sexo !== "Selecionar sexo"
        const CamposPreenchidos = nome && sobrenome && email && telefone && sexo
        const SenhaInvalida = (senha && senha.length <= 7);

        if (!CamposPreenchidos) {
            setErrorMessage("Por favor, preencha todos os campos corretamente.")
            return false
        }

        if (!EmailValido || !TelefoneValido || !SexoSelecionado) {
            setErrorMessage("Por favor, preencha informações válidas.")
            return false
        }

        if (SenhaInvalida){
            setErrorMessage("A senha deve ter no mínimo 8 caracteres")
            return false
        }

        setErrorMessage("")
        return true
    }
    
    // Enviar as informações dos valores que foram usados para criar o user, verifica se ah um erro
    const PegarValores = (e) => {
        e.preventDefault()
        if (!VerificarCampos()) return

        const fullDataform = { 
            ...form, 
            ...campos_adicionais, 
            id: Aluno?.id || Date.now()
        }
        console.log('Dados:', fullDataform)
        
        setFeedbackMessage(true)
        setTimeout(() => {
            setFeedbackMessage(false)
        }, 2000)

        if (selectedAlunoIndex !== null) {
            Save(fullDataform, selectedAlunoIndex)
        } else {
            Save(fullDataform)
        }
    }

    const SeguirDadosMobile = () => {
        if (!VerificarCampos()){
            return
        } else {
            setVisibleModalMobile(true)
        }
    }

    useEffect(() => {
        if (Aluno) {
            setForm({
                id: Aluno?.id || Date.now(),
                nome: Aluno?.nome || "",
                sobrenome: Aluno?.sobrenome || "",
                email: Aluno?.email || "",
                telefone: Aluno?.telefone || "",
                senha: Aluno?.senha || "",
                sexo: Aluno?.sexo || "Selecionar sexo", 
                foto: Aluno?.foto || null,
            })
            setCampos_adicionais({
                IMC: Aluno?.IMC || "",
                idade: Aluno?.idade || "",
                estado: Aluno?.estado || "Ceara", // o backend vai ter q fazer a api funcionar 
                cidade: Aluno?.cidade || "Massape",
            })
        }else {
            setForm({
              id: 1,
              nome: '',
              sobrenome: '',
              email: '',
              telefone: '',
              senha: '',
              sexo: 'Selecionar sexo',
              foto: null,
            })
            setCampos_adicionais({
              IMC: '',
              estado: 'Ceará',
              cidade: 'Massapê',
            })
          }
    }, [Aluno])

    console.log("Aluno.id: ", Aluno?.id)

    const campos = [
        { name: "nome", type: "text", label: "Nome:", onChange: getValuesfields },
        { name: "sobrenome", type: "text", label: "Sobrenome:", onChange: getValuesfields },
        { name: "email", type: "email", label: "Email:", onChange: getValuesfields },
        { name: "telefone", type: "text", label: "Telefone:", onChange: MaskTelefone },
        { name: "senha", type: "password", label: "Senha:", onChange: getValuesfields },
        { name: "sexo", type: "select", label: "Sexo:", onChange: getValuesfields }
    ]

    const Campos_adicionais = [
        { name: "IMC", type: "text", label: "IMC:", onChange: getValuesfields },
        { name: 'estado', type: 'select', label: 'Estado:', onChange: getValuesfields },
        { name: 'cidade', type: 'select', label: 'Cidade:', onChange: getValuesfields }
    ]
    

    return (
        <div className={` h-[70%] w-[70%] bg-slate-50 flex item-center justify-center fixed top-24 rounded-md shadow-lg shadow-[#272626] z-50 transform max-md:w-[90%] max-md:h-[65%] max-md:max-h-[480px] ${Open ? 'scale-100 opacity-100' : 'scale-110 opacity-0 pointer-events-none'} transition-all duration-300`}>
            <div className={`flex items-center w-[70%] h-full relative flex-col space-y-3 max-md:w-full duration-500 ${visibleModalMobile ? 'hidden cursor-not-allowed' : ''}`}>
                <h1 className="font-poltawski font-bold text-[30px] mt-2 max-md:text-[24px] max-md:mt-3 items-center"> Informações Pessoais </h1>
                {errorMessage && <p className="text-red-700 font-aleo font-medium absolute top-10 max-md:text-[13px]">{errorMessage}</p>}
                <form method="post" ref={formRef} onSubmit={PegarValores} className="w-full grid grid-cols-2 p-2 ml-3 gap-y-4 translate-y-1 ">
                    {campos.map((item, index) => (
                        <div key={index} className="flex justify-center flex-col relative w-[90%] mt-6">
                            <label className={`${index === 5 ? 'font-aleo translate-y-1.5' : 'font-aleo'}`}>{item.label}</label>
                            {item.type === 'select' ? (
                                <select
                                    name={item.name}
                                    onChange={getValuesfields}
                                    className="w-full outline-none bg-slate-50 border-b-[1px] border-[#252424] text-[#252424] p-1"
                                >
                                    {options.map((option, optIndex) => (
                                        <option className="p-1 rounded-md" key={optIndex} value={option.value}>
                                            {option.value}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    name={item.name}
                                    value={ index === 3 ? form.telefone : form[item.name]}
                                    onChange={index === 3 ? MaskTelefone : item.onChange}
                                    type={item.type === 'password' ? (visible ? 'text' : 'password') : item.type}
                                    className={'w-full border-b-[1px] border-[#252424] bg-slate-50 outline-none'}
                                />
                            )}
                            {item.name === 'senha' && (
                                <button
                                    type='button'
                                    className='absolute right-0 bottom-1'
                                    onClick={() => { setVisible(see => !see) }}
                                >
                                    {visible ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#252424">
                                            <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#252424">
                                            <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                                        </svg>
                                    )}
                                </button>
                            )}
                        </div>
                    ))}
                </form>

                <div className="w-full flex justify-center relative flex-col items-center h-full">
                    <h1 draggable='true' className={`absolute top-0 font-poltawski font-bold text-[20px] duration-500 ${FeedbackMessage ? 'opacity-100' : 'opacity-0'}`}> {Aluno ? 'Informações foram salvas com sucesso' : 'Aluno cadastrado com sucesso'}</h1>
                <button
                    onClick={PegarValores} 
                    className={`max-md:hidden ${Aluno ? 'bg-[#252424] font-poltawski text-white white w-[30%] whitespace-nowrap py-2 justify-center rounded-md flex items-center font-bold hover:bg-[#2e2e2e] hover:text-[#FFF4A3] duration-500 active:bg-[#4e4e4e] absolute bottom-3 shadow-md shadow-[#252424] max-md:px-0 max-md:w-1/2' : 'bg-[#252424] font-poltawski text-white white w-[30%] whitespace-nowrap py-2 px-2 justify-between rounded-md flex items-center font-bold hover:bg-[#2e2e2e] hover:text-[#FFF4A3] duration-500 active:bg-[#4e4e4e] absolute bottom-3 shadow-md shadow-[#252424] max-md:px-0 max-md:w-1/2' }`}>
                    <h1 className={`${Aluno ? 'pl-0' : 'pl-2'}`}>{Aluno ? 'Salvar Informações' : 'Cadastrar Aluno'}</h1>
                    {Aluno ? null : (
                    <svg width="16" height="16" className="mr-2" viewBox="0 0 22 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.5 12.5H0.5V9.5H9.5V0.5H12.5V9.5H21.5V12.5H12.5V21.5H9.5V12.5Z" fill="currentColor" />
                    </svg>
                    )}
                </button>

                {/* Button for a good resposived */}

                <button 
                onClick={SeguirDadosMobile}
                className="bg-[#252424] font-poltawski text-white white w-[30%] whitespace-nowrap py-2 justify-center rounded-md flex items-center font-bold hover:bg-[#2e2e2e] hover:text-[#FFF4A3] duration-500 active:bg-[#4e4e4e] absolute bottom-3 shadow-md shadow-[#252424] max-md:px-0 max-md:w-1/3 md:hidden">
                    Continuar
                </button>
                </div>
            </div>

            <div className="w-[30%] h-full bg-[#252424] rounded-md flex flex-col itens-center p-1 justify-between max-md:hidden">
                <div className="mt-2 h-[40%] w-[100%] flex items-center justify-center flex-col">
                    <div className={`mt-2 h-full aspect-square flex justify-center items-center relative rounded-full bg-white text-[#242525]`}>
                        <input
                            type='file'
                            onChange={getValueFoto}
                            className={`absolute bottom-0 w-full h-full cursor-pointer opacity-0 z-20`}
                            accept='image/*'
                        />

                        {form.foto && (
                            <img
                                src={URL.createObjectURL(form.foto)}
                                alt="Foto do Aluno"
                                className="absolute top-0 left-0 w-full h-full rounded-full object-cover z-10"
                            />
                        )}

                        <svg width="24" height="24" className="absolute" viewBox="0 0 22 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.5 12.5H0.5V9.5H9.5V0.5H12.5V9.5H21.5V12.5H12.5V21.5H9.5V12.5Z" fill="currentColor" />
                        </svg>
                    </div>

                    <h1 className="text-[16px] font-bold font-poltawski mt-2 text-white"> Selecione uma foto </h1>
                </div>

                <form method="post" ref={formRef} onSubmit={PegarValores} className="flex justify-center items-center space-y-5 flex-col mb-4 h-[50%]">
                    {Campos_adicionais.map((item, index) => (
                        <div key={index} className="flex flex-col justify-center w-[80%] relative ">
                            <label className="text-white text-[16px] font-aleo">{item.label}</label>
                            {item.type === 'select' ? (
                                <select
                                    name={item.name}
                                    value={item.value}
                                    onChange={getValuesfields}
                                    className="w-full outline-none bg-[#252424] border-b-[1px] border-slate-50 text-slate-50 p-1"
                                >
                                        <option value = 'Brasil'>Brasil</option>
                                </select>) :
                                <input
                                    type={item.type}
                                    name={item.name}
                                    className="w-full text-white appearance-none border-b-[1px] border-white bg-[#252424] outline-none"
                                    onChange={item.onChange}
                                />
                            }
                        </div>
                    ))}
                </form>
            </div>
            <button onClick={Close} className="absolute left-0 top-1 max-md:top-0 text-[#252424] hover:text-red-600 duration-500">
                <svg width="31" height="37" viewBox="0 0 31 37" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.82749 22.9235L8.42749 21.5235L14.0275 15.9235L8.42749 10.3235L9.82749 8.92346L15.4275 14.5235L21.0275 8.92346L22.4275 10.3235L16.8275 15.9235L22.4275 21.5235L21.0275 22.9235L15.4275 17.3235L9.82749 22.9235Z" fill="currentColor"/>
                </svg>
            </button>

            {/* for mobile*/}

            <ModalMobileAluno 
            PegarValores={PegarValores}
            form={form}
            Aluno={Aluno}
            Campos_adicionais={Campos_adicionais}
            getValueFoto={getValueFoto}
            Close={Close}
            visibleModalMobile={visibleModalMobile}
            setVisibleModalMobile={setVisibleModalMobile}
            getValuesfields={getValuesfields}
            FeedbackMessage={FeedbackMessage}
            />
        </div>
    )
}