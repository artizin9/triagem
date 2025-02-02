import { useState } from 'react'
import { Link } from 'react-router-dom'


export function AuthCliente(){

    const [email, setEmail] = useState('') // Valor do email
    const [senha, setSenha] = useState('') // Valor da senha
    const [verification, setVerification] = useState(false) // Verifica se não tem nada de errado no email e senha
    const [visible, setVisible] = useState(false) // Ativa a visualização de senha
    
    // Estou apenas pegando o valor da email
    const ValorEmail = (e) => {
        setEmail(e.target.value)
    }

    // Estou pegando o valor da senha
    const ValorSenha = (e) => {
        setSenha(e.target.value)
    }

    // Nessa verificação Nadyson, você fará a autenticação de usuario, ela já esta associada no onclick
    const VerificaçãoEmailSenha = () => {
        const EmailValido = email.includes('@') && email.endsWith('.com')
        const SenhaValido = senha.length >= 8

        if (!EmailValido || !SenhaValido) {
            setVerification(true)
        } else {
            setVerification(false)
        }
    }

    // Se houver erro não envia o formulario
    const NãoEnviarForm = (e) => {
        e.preventDefault()
        VerificaçãoEmailSenha()
        if (verification){
            return
        }
    }

    // Apenas fiz um componente do formulario, e criei uma lista de objs, onde cada obj é criado com valores atribuidos no meu componente
    const Form = [
        {
            id: 1,
            name: 'Email:',
            getnameAxios: 'email',
            value: email,
            type: 'text',
            onChange: ValorEmail
        },

        {
            id: 2,
            name: 'Senha:',
            getnameAxios: 'senha',
            value: senha,
            type: 'password',
            onChange: ValorSenha
        }
    ]

    const Buttons = [
        {
            id: 1,
            name: 'Google',
            img: (
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 30 30">
                     <path fill="currentColor" d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"></path>
                </svg>
            )
            // Aqui é para ter um obj chamado function ou onclick, no caso é a API do Google, ai tu cria uma function ou arrow function que é a API, fora da const Buttons, enfim, Ex. function: Nome_da_API
        },

        {
            id: 2,
            name: 'Apple Id',
            img: (
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 30 30">
                     <path fill="currentColor" d="M25.565,9.785c-0.123,0.077-3.051,1.702-3.051,5.305c0.138,4.109,3.695,5.55,3.756,5.55 c-0.061,0.077-0.537,1.963-1.947,3.94C23.204,26.283,21.962,28,20.076,28c-1.794,0-2.438-1.135-4.508-1.135 c-2.223,0-2.852,1.135-4.554,1.135c-1.886,0-3.22-1.809-4.4-3.496c-1.533-2.208-2.836-5.673-2.882-9 c-0.031-1.763,0.307-3.496,1.165-4.968c1.211-2.055,3.373-3.45,5.734-3.496c1.809-0.061,3.419,1.242,4.523,1.242 c1.058,0,3.036-1.242,5.274-1.242C21.394,7.041,23.97,7.332,25.565,9.785z M15.001,6.688c-0.322-1.61,0.567-3.22,1.395-4.247 c1.058-1.242,2.729-2.085,4.17-2.085c0.092,1.61-0.491,3.189-1.533,4.339C18.098,5.937,16.488,6.872,15.001,6.688z"></path>
                </svg>
            )
            // Na mesma coisa da API
        }
    ]

    
    // Acho que não será necessário comentarios no html / tailwindcss, pois você deve entender
    return (
        <div className="w-screen h-screen bg-[#575656fd] flex items-center justify-center max-md:h-dvh "> 
        <div className="h-[80%] w-[40%] max-md:w-[80%] max-md:h-[90%] max-md:max-h-[570px] max-md:max-w-[300px] bg-[#252424] rounded-2xl flex items-center space-y-5 flex-col shadow-[#0908088a] relative z-10 max-md:space-y-12 max-lg:h-[60%] max-lg:w-[80%] max-lg:max-h-[600px] max-lg:max-w-[550px] max-lg:space-y-10 max-2xl:max-h-[550px] max-2xl:max-w-[530px] max-xl:h-[90%] max-xl:max-h-[550px] max-xl:w-[70%] max-xl:max-w-[550px]"> 
            <header className="flex flex-col mt-2 w-full items-center relative "> 
                    <h1 className=" text-white text-[55px] font-poltawski font-bold tracking-wider max-md:text-[45px]"> Entrar </h1>
                    <h3 className=" text-white text-[17px] font-aleo font-normal -translate-y-3 max-md:text-[14px] text-center">Desafie seus limites e conquiste sua melhor versão. </h3>
                    <div className='mt-4 absolute bottom-0 translate-y-3'>
                        <h2 className='text-red-500 font-poltawski font-bold text-[14px]'>{verification ? 'Suas crendencias estão incorretas' : ''}</h2>
                    </div>
            </header>

            <form method='post' onSubmit={NãoEnviarForm} className="w-[80%] flex justify-center items-center p-2 flex-col relative max-md:w-[90%] max-md:p-1 ">
                <div className="flex items-center justify-center space-y-16 mt-2 flex-col w-full">
                    { Form.map((item, index) => (
                        <div key={index} className="flex flex-col justify-center w-full relative"> 
                            <label className="text-white font-poltawski font-medium">{item.name}</label>
                            <input 
                                type = {index === 1 ? (visible ? 'text' : 'password') : 'text'}
                                name = {item.getnameAxios} // Se for utilizar axios, aqui o name para ajudar logo
                                placeholder= {index === 0 ? 'Ex. aluno@gmail.com' : ''}
                                className="w-full text-white border-b-[1px] border-white bg-[#252424] outline-none"
                                onChange={item.onChange}
                                value={item.value}
                            />

                            {index === 1 && (
                                <button
                                    type='button'
                                    className='absolute right-0 bottom-[1px] '
                                    onClick={() => {setVisible(see => !see)}}
                                >
                                    {visible ? ( <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg> ) : (<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>)}
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className='w-full'>
                        <h2 className='text-[#FFF4A3] text-[14px] mt-0.5 cursor-pointer duration-200 md:hover:text-[#fcea60] active:text-[#fcea60] w-fit font-aleo'> 
                            <Link to={'#'}>Esqueci minha senha </Link>
                        </h2>
                </div>

                <button 
                type='submit' 
                onClick={VerificaçãoEmailSenha}
                className='bg-white w-[50%] rounded-md text-[22px] h-fit text-center mt-8 text-[#574D03] shadow-md shadow-[#eef52e57] hover:bg-[#FFF4A3] duration-500 font-poltawski font-medium max-md:mt-12 max-md:w-[55%] max-lg:mt-14'>
                    Entrar
                </button>

                <div className='mt-2 w-[50%] max-md:w-[60%] max-md:mt-3'> 
                    <div className='flex items-center justify-between text-white font-poltawski max-md:whitespace-nowrap'> 
                        <div className='h-[1px] w-[20%] mt-1 bg-white max-md:w-[15%] font-aleo'></div>
                        Ou entre com
                        <div className='h-[1px] w-[20%] mt-1 bg-white max-md:w-[15%]'></div>
                    </div>

                </div>

                <div className='flex justify-center items-center space-x-10 mt-3 w-[80%] max-md:w-[90%] max-md:mt-4 max-md:space-x-7 '>
                        { Buttons.map((item, index) => (
                            <button key={index} className='flex items-center justify-evenly bg-[#252424] rounded-md border-white border p-1 py-1 px-2 text-white w-[40%] duration-500 hover:bg-white hover:text-[#252424] font-poltawski max-md:whitespace-nowrap max-md:w-[50%] max-md:space-x-1'>
                                {item.img}
                                {item.name}
                            </button>
                        ))}
                    </div>
            </form>
        </div>
    </div>
    )
}



