import { useEffect, useState } from "react"

const PhotoDefaultSrc = "data:image/svg+xml,%3Csvg width='150' height='150' viewBox='0 0 150 150' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='75' cy='75' r='75' fill='%23252424'/%3E%3Cpath d='M127.53 128.642C127.53 121.785 126.362 112.859 123.609 106.524C120.855 100.189 116.82 94.4326 111.732 89.5839C106.644 84.7352 100.604 80.8891 93.9567 78.265C87.3093 75.6409 80.1847 74.2903 72.9895 74.2903C65.7944 74.2903 58.6697 75.6409 52.0223 78.265C45.3749 80.8891 39.3349 84.7352 34.2472 89.5839C29.1595 94.4326 25.1237 100.189 22.3702 106.524C19.6167 112.859 19.8806 119.484 19.8806 126.341C37.059 139.811 44.664 149.696 73.9359 149.763L81.208 149.054L89.6756 147.63L96.3998 145.968L101.132 144.544L105.614 142.693L109.101 141.126L112.588 139.323L116.074 137.281L119.312 135.145L121.678 133.474L124.044 131.633L124.542 131.253L125.04 130.816L126.036 129.971L127.157 128.974L127.53 128.642Z' fill='%23A9A9A9'/%3E%3Ccircle cx='74.7635' cy='39.2745' r='28.3912' fill='%23A9A9A9'/%3E%3C/svg%3E"

const EyeClose = (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.4167 8.91666L12.2084 10.125C12.3334 10.7778 12.1459 11.3889 11.6459 11.9583C11.1459 12.5278 10.5 12.75 9.70837 12.625L8.50004 13.8333C8.73615 13.9444 8.97574 14.0278 9.21879 14.0833C9.46185 14.1389 9.72226 14.1667 10 14.1667C11.0417 14.1667 11.9271 13.8021 12.6563 13.0729C13.3855 12.3437 13.75 11.4583 13.75 10.4167C13.75 10.1389 13.7223 9.87846 13.6667 9.63541C13.6112 9.39235 13.5278 9.15277 13.4167 8.91666ZM16.0834 6.29166L14.875 7.45832C15.4028 7.8611 15.8716 8.30207 16.2813 8.78124C16.691 9.26041 17.0417 9.80555 17.3334 10.4167C16.6389 11.8194 15.6424 12.934 14.3438 13.7604C13.0452 14.5868 11.5973 15 10 15C9.59726 15 9.20143 14.9722 8.81254 14.9167C8.42365 14.8611 8.04171 14.7778 7.66671 14.6667L6.37504 15.9583C6.94449 16.1944 7.52782 16.3715 8.12504 16.4896C8.72226 16.6076 9.34726 16.6667 10 16.6667C12.0973 16.6667 13.9653 16.0868 15.6042 14.9271C17.2431 13.7674 18.4306 12.2639 19.1667 10.4167C18.8473 9.59721 18.4271 8.83679 17.9063 8.13541C17.3855 7.43402 16.7778 6.81943 16.0834 6.29166ZM16.5 1.16666L13 4.62499C12.5139 4.47221 12.0243 4.35763 11.5313 4.28124C11.0382 4.20485 10.5278 4.16666 10 4.16666C7.90282 4.16666 6.03476 4.74652 4.39587 5.90624C2.75699 7.06596 1.56949 8.56943 0.833374 10.4167C1.12504 11.1528 1.4931 11.8368 1.93754 12.4687C2.38199 13.1007 2.88893 13.6667 3.45837 14.1667L1.16671 16.5L2.33337 17.6667L17.6667 2.33332L16.5 1.16666ZM4.62504 13C4.22226 12.6389 3.85421 12.243 3.52087 11.8125C3.18754 11.3819 2.90282 10.9167 2.66671 10.4167C3.36115 9.01388 4.35768 7.89929 5.65629 7.07291C6.9549 6.24652 8.40282 5.83332 10 5.83332C10.2778 5.83332 10.5487 5.85068 10.8125 5.88541C11.0764 5.92013 11.3473 5.95832 11.625 5.99999L10.875 6.79166C10.7223 6.74999 10.5764 6.71874 10.4375 6.69791C10.2987 6.67707 10.1528 6.66666 10 6.66666C8.95837 6.66666 8.07296 7.03124 7.34379 7.76041C6.61462 8.48957 6.25004 9.37499 6.25004 10.4167C6.25004 10.5694 6.26046 10.7153 6.28129 10.8542C6.30212 10.993 6.33337 11.1389 6.37504 11.2917L4.62504 13Z" fill="#E8EAED" />
</svg>)

const EyeOpen = (<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#ffff">
    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
</svg>)

const Clean = (<svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22" fill="currentColor"><path d="M440-520h80v-280q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800v280ZM200-360h560v-80H200v80Zm-58 240h98v-80q0-17 11.5-28.5T280-240q17 0 28.5 11.5T320-200v80h120v-80q0-17 11.5-28.5T480-240q17 0 28.5 11.5T520-200v80h120v-80q0-17 11.5-28.5T680-240q17 0 28.5 11.5T720-200v80h98l-40-160H182l-40 160Zm676 80H142q-39 0-63-31t-14-69l55-220v-80q0-33 23.5-56.5T200-520h160v-280q0-50 35-85t85-35q50 0 85 35t35 85v280h160q33 0 56.5 23.5T840-440v80l55 220q13 38-11.5 69T818-40Zm-58-400H200h560Zm-240-80h-80 80Z"/></svg>)

export function CreateAluno({ aluno, setAluno, Close, Open, form, setForm, CleanForm }) {

    const [setaState, setSetaState] = useState(false)
    const [setaCity, setSetaCity] = useState(false)
    const [messageError, setMessageError] = useState('opa')
    const [messageRight, setMessageRight] = useState(false)
    const [visible, setVisible] = useState(false)
    const [error, setError] = useState(false)
    const [messageClean, setMessageClean] = useState(false)

    const { id, name, photo, password, email, phone, state, city } = form

    // Formatação do telefone pedi ao chatgpt
    function formatPhoneNumber(value) {
        const cleaned = value.replace(/\D/g, '')
        
        const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/)
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`
        }
    
        return value
    }

    function GetValuesForm(e) {
        const { name, value } = e.target
        let formattedValue = value

        if (name === "phone") {
            formattedValue = formatPhoneNumber(value)
        }

        setForm((aluno) => ({
            ...aluno,
            [name]: formattedValue
        }))
    }

    function HandleFileChange(e) {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setForm((prev) => ({ ...prev, photo: reader.result }))
            }
            reader.readAsDataURL(file)
        }
    }

    function Verification() {
        setError(false)
        setMessageError('')

        const isEmailValid = email.includes('@') && email.endsWith('.com') && email.length > 3
        const isPhoneValid = phone.length == 15
        const isPasswordValid = password.length >= 8
        const isFieldsNotEmpty = name.trim() && state.trim() && city.trim()

        if (!isFieldsNotEmpty) {
            setMessageError("Erro! Não deixe nenhum campo vazio")
            setError(true)
            return false
        }

        if (!isEmailValid) {
            setMessageError("Erro! Digite um email válido")
            setError(true)
            return false
        }

        if (!isPhoneValid) {
            setMessageError("Erro! Digite um número de telefone válido")
            setError(true)
            return false
        }

        if (!isPasswordValid) {
            setMessageError("Erro! Digite uma senha maior que 7 caracteres")
            setError(true)
            return false
        }

        return true
    }


    function CreateAluno() {
        if (!Verification()) {
            setError(true)
            return
        }

        setAluno((alunos) => [...alunos, form])
        setError(false)
        CleanForm()
        setMessageRight(true)
        setTimeout(() => {
            setMessageRight(false)
        }, [2000])
    }

    // O backend deve colocar a api da cidade e estado, boa sorte nisso

    const FormFields = [
        { label: "Nome:", name: "name", type: "text", onChange: GetValuesForm, placeholder: "Ex. João Paulo ", value: name },
        { label: "Email:", name: "email", type: "email", onChange: GetValuesForm, placeholder: "Ex. JoaoPaulo@gmail.com", value: email },
        { label: "Telefone:", name: "phone", type: "text", onChange: GetValuesForm, placeholder: "Ex. (88) 88888-8888 ", value: phone, maxlength: 15 },
        { label: "Senha:", name: "password", type: "password", onChange: GetValuesForm, value: password },
        { label: "Estado:", name: "state", type: "select", onChange: GetValuesForm, placeholder: "Ex. São Paulo", value: state },
        { label: "Cidade:", name: "city", type: "select", onChange: GetValuesForm, placeholder: "Ex. São Paulo", value: city }
    ]

    const SetaState = (<svg width="24" height="24" className={`absolute right-0 bottom-0.5 duration-500 transition-all ${setaState ? "rotate-180" : "rotate-0"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 13.2L16.6 8.6L18 10L12 16L6 10L7.4 8.6L12 13.2Z" fill="#FFF" />
    </svg>
    )

    const SetaCity = (<svg width="24" height="24" className={`absolute right-0 bottom-0.5 duration-500 transition-all ${setaCity ? "rotate-180" : "rotate-0"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 13.2L16.6 8.6L18 10L12 16L6 10L7.4 8.6L12 13.2Z" fill="#FFF" />
    </svg>
    )

    useEffect(() => { }, [aluno])

    return (
        <div onClick={Close} className={`w-full h-full bg-black flex justify-center items-center bg-opacity-30 fixed insert-0 ${Open ? 'visible' : 'invisible'}`}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={`h-[90%] w-3/5 flex flex-col items-center relative rounded-lg shadow-md shadow-black/60 bg-[#131313] pt-1 duration-300 ease-in-out ${Open ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}>
                <div className="flex flex-col text-center mt-4">
                    <h1 className="font-poppins font-extrabold text-[26px] text-white">INFORMAÇÕES DO <span className="text-primary-100">ALUNO</span></h1>
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
                            {item.type === "select" ? (
                                <select
                                    value={item.value}
                                    onClick={item.name === 'state' ? () => setSetaState(prev => !prev) : () => setSetaCity(prev => !prev)}
                                    name={item.name}
                                    onChange={item.onChange}
                                    className="border-b-white border-b w-full text-white outline-none bg-[#131313] appearance-none"
                                >
                                    <option className="text-[#d7d7d7]" value="">{item.name === "state" ? 'Selecione o estado' : 'Selecione a cidade'}</option>
                                    <option className="text-white" value="São Paulo">São Paulo</option>
                                </select>
                            ) : (
                                <input
                                    value={item.value}
                                    name={item.name}
                                    placeholder={item.placeholder}
                                    type={item.label === 'Senha:' ? (visible ? "text" : "password") : item.type}
                                    onChange={item.onChange}
                                    className="border-b-white border-b w-full text-white outline-none bg-[#131313]"
                                    maxLength={item.maxlength}
                                />)}

                            {item.label === 'Senha:' ?
                                (<button
                                    className='absolute right-0 bottom-0.5 '
                                    onClick={() => setVisible(see => see = !see)}>
                                    {visible ? EyeOpen : EyeClose}
                                </button>)
                                :
                                ''}
                            {item.type === "select" ? (item.name === "state" ? SetaState : SetaCity) : ''}
                        </div>

                    ))}
                </div>
                <div className="h-full w-full flex items-center justify-center relative">
                    <h1 className={`font-albert duration-500 font-medium text-[16px] text-white absolute top-2 ${messageRight ? 'opacity-100' : 'opacity-0'}`}>
                        O aluno foi cadastrado com sucesso!</h1>
                    <button
                        onClick={CreateAluno}
                        className=" flex items-center justify-center mt-5 w-[30%] py-1 font-poppins font-extrabold text-white bg-primary-100 shadow-md shadow-black/50  rounded-lg">Cadrastrar Aluno</button>
                </div>

                <button onClick={Close} className="absolute w-fit h-fit top-2 left-1 hover:text-primary-100 text-white duration-500">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.75933 17.05L4.49951 15.7937L9.53877 10.7684L4.49951 5.74315L5.75933 4.48684L10.7986 9.51209L15.8379 4.48684L17.0977 5.74315L12.0584 10.7684L17.0977 15.7937L15.8379 17.05L10.7986 12.0247L5.75933 17.05Z" fill="currentColor" />
                    </svg>
                </button>

                <button
                    onMouseEnter={() => setMessageClean(true)}
                    onMouseLeave={() => setMessageClean(false)}
                    onClick={CleanForm} className="absolute w-fit h-fit top-3 right-1 hover:text-primary-100 text-white duration-500">
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