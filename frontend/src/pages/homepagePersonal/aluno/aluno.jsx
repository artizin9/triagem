import { useState } from "react"

const Search = (<svg width="22" className="absolute right-1.5 top-2 " height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.9667 19.25L12.1917 13.475C11.7333 13.8417 11.2063 14.1319 10.6104 14.3458C10.0146 14.5597 9.38056 14.6667 8.70833 14.6667C7.04306 14.6667 5.63368 14.0899 4.48021 12.9365C3.32674 11.783 2.75 10.3736 2.75 8.70833C2.75 7.04306 3.32674 5.63368 4.48021 4.48021C5.63368 3.32674 7.04306 2.75 8.70833 2.75C10.3736 2.75 11.783 3.32674 12.9365 4.48021C14.0899 5.63368 14.6667 7.04306 14.6667 8.70833C14.6667 9.38056 14.5597 10.0146 14.3458 10.6104C14.1319 11.2063 13.8417 11.7333 13.475 12.1917L19.25 17.9667L17.9667 19.25ZM8.70833 12.8333C9.85417 12.8333 10.8281 12.4323 11.6302 11.6302C12.4323 10.8281 12.8333 9.85417 12.8333 8.70833C12.8333 7.5625 12.4323 6.58854 11.6302 5.78646C10.8281 4.98438 9.85417 4.58333 8.70833 4.58333C7.5625 4.58333 6.58854 4.98438 5.78646 5.78646C4.98438 6.58854 4.58333 7.5625 4.58333 8.70833C4.58333 9.85417 4.98438 10.8281 5.78646 11.6302C6.58854 12.4323 7.5625 12.8333 8.70833 12.8333Z" fill="#FFF"/>
    </svg>
    )

const addAluno = (<svg width="22" height="22" className="absolute right-2 top-2 "viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5001 12.8333V10.0833H13.7501V8.24996H16.5001V5.49996H18.3334V8.24996H21.0834V10.0833H18.3334V12.8333H16.5001ZM8.25008 11C7.24175 11 6.37855 10.6409 5.6605 9.92288C4.94244 9.20482 4.58341 8.34163 4.58341 7.33329C4.58341 6.32496 4.94244 5.46176 5.6605 4.74371C6.37855 4.02565 7.24175 3.66663 8.25008 3.66663C9.25841 3.66663 10.1216 4.02565 10.8397 4.74371C11.5577 5.46176 11.9167 6.32496 11.9167 7.33329C11.9167 8.34163 11.5577 9.20482 10.8397 9.92288C10.1216 10.6409 9.25841 11 8.25008 11ZM0.916748 18.3333V15.7666C0.916748 15.2472 1.05043 14.7698 1.31779 14.3343C1.58515 13.8989 1.94036 13.5666 2.38341 13.3375C3.33064 12.8638 4.29314 12.5086 5.27091 12.2718C6.24869 12.035 7.24175 11.9166 8.25008 11.9166C9.25841 11.9166 10.2515 12.035 11.2292 12.2718C12.207 12.5086 13.1695 12.8638 14.1167 13.3375C14.5598 13.5666 14.915 13.8989 15.1824 14.3343C15.4497 14.7698 15.5834 15.2472 15.5834 15.7666V18.3333H0.916748ZM2.75008 16.5H13.7501V15.7666C13.7501 15.5986 13.7081 15.4458 13.624 15.3083C13.54 15.1708 13.4292 15.0638 13.2917 14.9875C12.4667 14.575 11.6341 14.2656 10.7938 14.0593C9.95355 13.8531 9.10564 13.75 8.25008 13.75C7.39453 13.75 6.54661 13.8531 5.70633 14.0593C4.86605 14.2656 4.03341 14.575 3.20841 14.9875C3.07091 15.0638 2.96015 15.1708 2.87612 15.3083C2.7921 15.4458 2.75008 15.5986 2.75008 15.7666V16.5ZM8.25008 9.16663C8.75425 9.16663 9.18584 8.98711 9.54487 8.62808C9.9039 8.26906 10.0834 7.83746 10.0834 7.33329C10.0834 6.82913 9.9039 6.39753 9.54487 6.0385C9.18584 5.67947 8.75425 5.49996 8.25008 5.49996C7.74591 5.49996 7.31432 5.67947 6.95529 6.0385C6.59626 6.39753 6.41675 6.82913 6.41675 7.33329C6.41675 7.83746 6.59626 8.26906 6.95529 8.62808C7.31432 8.98711 7.74591 9.16663 8.25008 9.16663Z" fill="#fff"/>
    </svg>)

export function Aluno({aluno, Open}){

    const [seta, setSeta] = useState(false)

    const Seta = (<svg width="24" height="24" className={`absolute right-1 top-2 duration-500 transition-all ${seta ? "rotate-180" : "rotate-0"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 13.2L16.6 8.6L18 10L12 16L6 10L7.4 8.6L12 13.2Z" fill="#FFF"/>
        </svg>
        )

    return (
        <div className="p-2 pt-3 flex flex-col items-center w-full h-full mt-2">
            <div className="flex flex-col p-1 w-full items-center justify-center space-y-5">
                <div className="flex items-center justify-around w-4/5">
                    <div className="w-[60%] relative">
                    <input 
                        className="w-full bg-[#161616] rounded-lg pl-2 p-1 py-1.5 outline-none text-white shadow-md shadow-black/40"
                        placeholder="Pesquisar..."
                    />
                    {Search}
                    </div>
                    <div className="w-[27%] relative">
                    <select
                        onClick={() => setSeta(prev => prev = !prev )}
                        className="w-full bg-[#161616] rounded-lg pl-1 p-1 py-1.5 text-white outline-none appearance-none shadow-md shadow-black/20"
                    >
                        <option value="filtrar"> Filtrar por... </option>
                        <option value="name"> Nome </option>
                        <option value="email">Email</option>
                        <option value="phone">Telefone</option>
                        <option value="state">Estado</option>  
                        <option value="city">Cidade</option>
                    </select>

                    {Seta}
                    </div>
                </div>
                <div className="w-4/5 flex justify-center items-center">
                    <button 
                    onClick={Open}
                    className="w-[27%] bg-[#161616] rounded-lg px-2 p-1 py-1.5 text-white outline-none font-poppins font-medium text-left duration-500 hover:bg-primary-100/80 relative shadow-md shadow-black/20">
                        Cadrastrar aluno
                        {addAluno}
                    </button>
                </div>

            </div>
        </div>
    )
}