import ImgLogin from '../../assets/imgs/login.png'
import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { auth, me } from '../../utils/api/api'
import { MessageError } from '../../utils/error/errorAuth'
import gsap from 'gsap'


const ToBack = (<svg width="20" height="15" className="rotate-180" viewBox="0 0 22 17" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2.00353C9 0.375799 10.8407 -0.570208 12.1642 0.377318L20.7285 6.50858C21.8428 7.30637 21.8428 8.96322 20.7285 9.76101L12.1924 15.8721C10.8723 16.8171 9.03572 15.8786 9.02823 14.2551L9.01096 10.5109C9.01093 10.5049 9.00603 10.5 9 10.5H2.25C1.00736 10.5 0 9.49264 0 8.25C0 7.00736 1.00736 6 2.25 6H7C8.10457 6 9 5.10457 9 4V2.00353Z" fill="currentColor" />
</svg>)

const EyeClose = (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.4167 8.91666L12.2084 10.125C12.3334 10.7778 12.1459 11.3889 11.6459 11.9583C11.1459 12.5278 10.5 12.75 9.70837 12.625L8.50004 13.8333C8.73615 13.9444 8.97574 14.0278 9.21879 14.0833C9.46185 14.1389 9.72226 14.1667 10 14.1667C11.0417 14.1667 11.9271 13.8021 12.6563 13.0729C13.3855 12.3437 13.75 11.4583 13.75 10.4167C13.75 10.1389 13.7223 9.87846 13.6667 9.63541C13.6112 9.39235 13.5278 9.15277 13.4167 8.91666ZM16.0834 6.29166L14.875 7.45832C15.4028 7.8611 15.8716 8.30207 16.2813 8.78124C16.691 9.26041 17.0417 9.80555 17.3334 10.4167C16.6389 11.8194 15.6424 12.934 14.3438 13.7604C13.0452 14.5868 11.5973 15 10 15C9.59726 15 9.20143 14.9722 8.81254 14.9167C8.42365 14.8611 8.04171 14.7778 7.66671 14.6667L6.37504 15.9583C6.94449 16.1944 7.52782 16.3715 8.12504 16.4896C8.72226 16.6076 9.34726 16.6667 10 16.6667C12.0973 16.6667 13.9653 16.0868 15.6042 14.9271C17.2431 13.7674 18.4306 12.2639 19.1667 10.4167C18.8473 9.59721 18.4271 8.83679 17.9063 8.13541C17.3855 7.43402 16.7778 6.81943 16.0834 6.29166ZM16.5 1.16666L13 4.62499C12.5139 4.47221 12.0243 4.35763 11.5313 4.28124C11.0382 4.20485 10.5278 4.16666 10 4.16666C7.90282 4.16666 6.03476 4.74652 4.39587 5.90624C2.75699 7.06596 1.56949 8.56943 0.833374 10.4167C1.12504 11.1528 1.4931 11.8368 1.93754 12.4687C2.38199 13.1007 2.88893 13.6667 3.45837 14.1667L1.16671 16.5L2.33337 17.6667L17.6667 2.33332L16.5 1.16666ZM4.62504 13C4.22226 12.6389 3.85421 12.243 3.52087 11.8125C3.18754 11.3819 2.90282 10.9167 2.66671 10.4167C3.36115 9.01388 4.35768 7.89929 5.65629 7.07291C6.9549 6.24652 8.40282 5.83332 10 5.83332C10.2778 5.83332 10.5487 5.85068 10.8125 5.88541C11.0764 5.92013 11.3473 5.95832 11.625 5.99999L10.875 6.79166C10.7223 6.74999 10.5764 6.71874 10.4375 6.69791C10.2987 6.67707 10.1528 6.66666 10 6.66666C8.95837 6.66666 8.07296 7.03124 7.34379 7.76041C6.61462 8.48957 6.25004 9.37499 6.25004 10.4167C6.25004 10.5694 6.26046 10.7153 6.28129 10.8542C6.30212 10.993 6.33337 11.1389 6.37504 11.2917L4.62504 13Z" fill="#E8EAED" />
</svg>)

const EyeOpen = (<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#ffff">
    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
</svg>)

export function Auth() {

    // O valor do email e senha estão sendo guardados em um estado
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)
    const MainRef = useRef(null)
    const [error, setError] = useState(false)
    const VisiblePassword = visible ? 'text' : 'password'
    const Navigate = useNavigate()

    const Verification = () => {
        const Emailvalid = email.includes('@') && email.endsWith('.com') && email.length > 3
        const Passwordvalid = password.length >= 8

        if (!email.trim() || !password.trim()) {
            return false
        }

        if (!Emailvalid || !Passwordvalid) {
            return false
        }

        return true
    }

    const Sendvalues = async () => {
        if (!Verification()) {
            setError(true)
            return
        }
        
        setError(false)
        const Data = { email: email, password: password }

        try {
            await auth(Data)
            const { role } = await me()
            role === 'PERSONAL' ? Navigate('/home/personal') : Navigate('/home/aluno')
        }

        catch (error) {
            const errorMessage = MessageError(error)
            console.log(errorMessage.message)
        }
    }


    const form = [
        {
            label: 'Email:',
            placeholder: 'Digite seu email',
            type: 'text',
            value: email,
            onchange: (e) => setEmail(e.target.value)
        },
        {
            label: 'Senha:',
            placeholder: 'Digite sua senha',
            type: VisiblePassword,
            value: password,
            onchange: (e) => setPassword(e.target.value)
        }
    ]

    useEffect(() => {
        gsap.fromTo(
            MainRef.current,
            { y: '-100%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 1.2, ease: 'power3.out' }
        )
    }, [])

    return (
        <div className="flex w-screen h-screen overflow-hidden">
            <div className='bg-primary-300 w-[45%] h-full flex items-center justify-center relative z-10'>
                <button onClick={() => Navigate("/")} className='flex w-fit h-fit absolute space-x-2 items-center text-white hover:text-primary-100 top-2 left-2 font-albert font-medium duration-500'>
                    {ToBack}
                    <h2 className='translate-y-0.5'>Voltar</h2>
                </button>

                <div ref={MainRef} className='w-[90%] h-[70%] flex justify-between flex-col items-center  p-2'>
                    <div className='mt-0 flex flex-col items-center relative'>
                        <h1 className='font-poppins text-[26px] font-extrabold text-white text-center'>SEJA <span className='text-primary-100'>BEM-VINDO</span>, HORA DE CONTINUAR!</h1>
                        <h1 className='font-albert text-[20px] font-medium text-[#d1d1d1]'>Controle seus treinos de qualquer lugar</h1>
                        <h1 className={`font-albert text-primary-100 absolute bottom-0 translate-y-8 duration-500 ${error ? 'opacity-100' : 'opacity-0'}`}>Suas credencias estão incorretas, tente novamente!</h1>
                    </div>

                    <div className='flex flex-col space-y-8 w-[80%] p-1 items-center justify-center'>
                        {form.map((item, index) => (
                            <div key={index} className='w-full flex flex-col relative'>
                                <label className='font-albert font-normal text-[#d1d1d1] mb-1'>{item.label}</label>
                                <input
                                    value={item.value}
                                    onChange={item.onchange}

                                    type={item.type}
                                    className='w-full text-white rounded-lg bg-[#464343] p-2 pl-2 outline-none placeholder:font-poppins placeholder:text-[#b1afaf]'
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            Sendvalues()
                                        }
                                    }}
                                />
                                {item.label === 'Senha:' ?
                                    (<button
                                        className='absolute right-2 bottom-3 translate-y-0.5'
                                        onClick={() => setVisible(see => see = !see)}>
                                        {visible ? EyeOpen : EyeClose}
                                    </button>)
                                    :
                                    ''
                                }
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={Sendvalues}
                        className='bg-primary-100 shadow-sm shadow-black  p-2 w-[80%] tracking-wide text-center font-poppins font-bold text-white rounded-lg h-[8%] text-[22px] flex justify-center items-center hover:bg-[#ec2929] duration-500 active:bg-primary-100/70'>Entrar</button>
                </div>
            </div>

            <div style={{ backgroundImage: `url(${ImgLogin})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", }} className='w-[55%] h-full' />
        </div>
    )
}