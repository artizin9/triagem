import { useState, useEffect } from 'react'
import { Treino } from './treino/treino'
import { me } from '../../utils/api/api'
import { Error } from '../../utils/error/errorAuth'

const IconLogOut = (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.77778 20C4.28889 20 3.87037 19.8259 3.52222 19.4778C3.17407 19.1296 3 18.7111 3 18.2222V5.77778C3 5.28889 3.17407 4.87037 3.52222 4.52222C3.87037 4.17407 4.28889 4 4.77778 4H11V5.77778H4.77778V18.2222H11V20H4.77778ZM14.5556 16.4444L13.3333 15.1556L15.6 12.8889H8.33333V11.1111H15.6L13.3333 8.84444L14.5556 7.55556L19 12L14.5556 16.4444Z" fill="currentColor" />
</svg>)

const Search = (<svg width="22" className="absolute right-1.5 top-2 " height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.9667 19.25L12.1917 13.475C11.7333 13.8417 11.2063 14.1319 10.6104 14.3458C10.0146 14.5597 9.38056 14.6667 8.70833 14.6667C7.04306 14.6667 5.63368 14.0899 4.48021 12.9365C3.32674 11.783 2.75 10.3736 2.75 8.70833C2.75 7.04306 3.32674 5.63368 4.48021 4.48021C5.63368 3.32674 7.04306 2.75 8.70833 2.75C10.3736 2.75 11.783 3.32674 12.9365 4.48021C14.0899 5.63368 14.6667 7.04306 14.6667 8.70833C14.6667 9.38056 14.5597 10.0146 14.3458 10.6104C14.1319 11.2063 13.8417 11.7333 13.475 12.1917L19.25 17.9667L17.9667 19.25ZM8.70833 12.8333C9.85417 12.8333 10.8281 12.4323 11.6302 11.6302C12.4323 10.8281 12.8333 9.85417 12.8333 8.70833C12.8333 7.5625 12.4323 6.58854 11.6302 5.78646C10.8281 4.98438 9.85417 4.58333 8.70833 4.58333C7.5625 4.58333 6.58854 4.98438 5.78646 5.78646C4.98438 6.58854 4.58333 7.5625 4.58333 8.70833C4.58333 9.85417 4.98438 10.8281 5.78646 11.6302C6.58854 12.4323 7.5625 12.8333 8.70833 12.8333Z" fill="#FFF" />
</svg>
)

const BorderSelection = (<div className="h-full w-[6px] bg-primary-100 absolute right-0 rounded-lg" />)

const Iconreport = (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 14.1667C9.76389 14.1667 9.56597 14.0868 9.40625 13.9271C9.24653 13.7674 9.16667 13.5694 9.16667 13.3333C9.16667 13.0972 9.24653 12.8993 9.40625 12.7396C9.56597 12.5799 9.76389 12.5 10 12.5C10.2361 12.5 10.434 12.5799 10.5938 12.7396C10.7535 12.8993 10.8333 13.0972 10.8333 13.3333C10.8333 13.5694 10.7535 13.7674 10.5938 13.9271C10.434 14.0868 10.2361 14.1667 10 14.1667ZM9.16667 10.8333V2.5H10.8333V10.8333H9.16667ZM4.16667 17.5C3.70833 17.5 3.31597 17.3368 2.98958 17.0104C2.66319 16.684 2.5 16.2917 2.5 15.8333V13.3333H4.16667V15.8333H15.8333V13.3333H17.5V15.8333C17.5 16.2917 17.3368 16.684 17.0104 17.0104C16.684 17.3368 16.2917 17.5 15.8333 17.5H4.16667Z" fill="currentColor" />
</svg>)

const Buttons = [
    {
        id: 1,
        name: 'Treinos',
        img: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_43_46)">
                <path d="M20.65 9.37495L19.25 7.97495L20 7.19995L16.8 3.99995L16.025 4.74995L14.6 3.32495L15.35 2.54995C15.7334 2.16662 16.2084 1.97912 16.775 1.98745C17.3417 1.99578 17.8167 2.19162 18.2 2.57495L21.425 5.79995C21.8084 6.18328 22 6.65412 22 7.21245C22 7.77078 21.8084 8.24162 21.425 8.62495L20.65 9.37495ZM8.65002 21.3999C8.26669 21.7833 7.79586 21.9749 7.23752 21.9749C6.67919 21.9749 6.20836 21.7833 5.82502 21.3999L2.60002 18.1749C2.21669 17.7916 2.02502 17.3208 2.02502 16.7624C2.02502 16.2041 2.21669 15.7333 2.60002 15.3499L3.35002 14.5999L4.77502 16.0249L4.00002 16.7749L7.22502 19.9999L7.97502 19.2249L9.40002 20.6499L8.65002 21.3999ZM18.575 12.9999L20 11.5749L12.425 3.99995L11 5.42495L18.575 12.9999ZM11.575 19.9999L13 18.5499L5.45002 10.9999L4.00002 12.4249L11.575 19.9999ZM11.425 14.1499L14.175 11.4249L12.575 9.82495L9.85002 12.5749L11.425 14.1499ZM13 21.3999C12.6167 21.7833 12.1417 21.9749 11.575 21.9749C11.0084 21.9749 10.5334 21.7833 10.15 21.3999L2.60002 13.8499C2.21669 13.4666 2.02502 12.9916 2.02502 12.4249C2.02502 11.8583 2.21669 11.3833 2.60002 10.9999L4.02502 9.57495C4.40836 9.19162 4.87919 8.99995 5.43752 8.99995C5.99586 8.99995 6.46669 9.19162 6.85002 9.57495L8.42502 11.1499L11.175 8.39995L9.60002 6.84995C9.21669 6.46662 9.02502 5.99162 9.02502 5.42495C9.02502 4.85828 9.21669 4.38328 9.60002 3.99995L11.025 2.57495C11.4084 2.19162 11.8792 1.99995 12.4375 1.99995C12.9959 1.99995 13.4667 2.19162 13.85 2.57495L21.425 10.1499C21.8084 10.5333 22 11.0041 22 11.5624C22 12.1208 21.8084 12.5916 21.425 12.9749L20 14.3999C19.6167 14.7833 19.1417 14.9749 18.575 14.9749C18.0084 14.9749 17.5334 14.7833 17.15 14.3999L15.6 12.8249L12.85 15.5749L14.425 17.1499C14.8084 17.5333 15 18.0041 15 18.5624C15 19.1208 14.8084 19.5916 14.425 19.9749L13 21.3999Z" fill="#E8EAED" />
            </g>
            <defs>
                <clipPath id="clip0_43_46">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>)
    },
    {
        id: 2,
        name: 'Calendário',
        img: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V6C3 5.45 3.19583 4.97917 3.5875 4.5875C3.97917 4.19583 4.45 4 5 4H6V2H8V4H16V2H18V4H19C19.55 4 20.0208 4.19583 20.4125 4.5875C20.8042 4.97917 21 5.45 21 6V20C21 20.55 20.8042 21.0208 20.4125 21.4125C20.0208 21.8042 19.55 22 19 22H5ZM5 20H19V10H5V20ZM5 8H19V6H5V8ZM12 14C11.7167 14 11.4792 13.9042 11.2875 13.7125C11.0958 13.5208 11 13.2833 11 13C11 12.7167 11.0958 12.4792 11.2875 12.2875C11.4792 12.0958 11.7167 12 12 12C12.2833 12 12.5208 12.0958 12.7125 12.2875C12.9042 12.4792 13 12.7167 13 13C13 13.2833 12.9042 13.5208 12.7125 13.7125C12.5208 13.9042 12.2833 14 12 14ZM8 14C7.71667 14 7.47917 13.9042 7.2875 13.7125C7.09583 13.5208 7 13.2833 7 13C7 12.7167 7.09583 12.4792 7.2875 12.2875C7.47917 12.0958 7.71667 12 8 12C8.28333 12 8.52083 12.0958 8.7125 12.2875C8.90417 12.4792 9 12.7167 9 13C9 13.2833 8.90417 13.5208 8.7125 13.7125C8.52083 13.9042 8.28333 14 8 14ZM16 14C15.7167 14 15.4792 13.9042 15.2875 13.7125C15.0958 13.5208 15 13.2833 15 13C15 12.7167 15.0958 12.4792 15.2875 12.2875C15.4792 12.0958 15.7167 12 16 12C16.2833 12 16.5208 12.0958 16.7125 12.2875C16.9042 12.4792 17 12.7167 17 13C17 13.2833 16.9042 13.5208 16.7125 13.7125C16.5208 13.9042 16.2833 14 16 14ZM12 18C11.7167 18 11.4792 17.9042 11.2875 17.7125C11.0958 17.5208 11 17.2833 11 17C11 16.7167 11.0958 16.4792 11.2875 16.2875C11.4792 16.0958 11.7167 16 12 16C12.2833 16 12.5208 16.0958 12.7125 16.2875C12.9042 16.4792 13 16.7167 13 17C13 17.2833 12.9042 17.5208 12.7125 17.7125C12.5208 17.9042 12.2833 18 12 18ZM8 18C7.71667 18 7.47917 17.9042 7.2875 17.7125C7.09583 17.5208 7 17.2833 7 17C7 16.7167 7.09583 16.4792 7.2875 16.2875C7.47917 16.0958 7.71667 16 8 16C8.28333 16 8.52083 16.0958 8.7125 16.2875C8.90417 16.4792 9 16.7167 9 17C9 17.2833 8.90417 17.5208 8.7125 17.7125C8.52083 17.9042 8.28333 18 8 18ZM16 18C15.7167 18 15.4792 17.9042 15.2875 17.7125C15.0958 17.5208 15 17.2833 15 17C15 16.7167 15.0958 16.4792 15.2875 16.2875C15.4792 16.0958 15.7167 16 16 16C16.2833 16 16.5208 16.0958 16.7125 16.2875C16.9042 16.4792 17 16.7167 17 17C17 17.2833 16.9042 17.5208 16.7125 17.7125C16.5208 17.9042 16.2833 18 16 18Z" fill="white" />
        </svg>
        )
    },

]

export function Home({ OpenModalLogOut, OpenModalSeeExercise, TreinoAluno, setTreinoAluno }) {
    const [id, setId] = useState(1)
    const [isHover, setIsHover] = useState(false)
    const [name, setName] = useState("")
    const [img, setImg] = useState("")
    const [seta, setSeta] = useState(false)

    const RenderComponent = () => {
        switch (id) {
            case 1:
                return <Treino TreinoAluno={TreinoAluno} OpenModalExercise={OpenModalSeeExercise} />
            case 2:
                return 2
        }
    }


    const Seta = (<svg width="24" height="24" className={`absolute right-1 top-2 duration-500 transition-all ${seta ? "rotate-180" : "rotate-0"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 13.2L16.6 8.6L18 10L12 16L6 10L7.4 8.6L12 13.2Z" fill="#FFF" />
    </svg>
    )

    const userData = async () => {
        const { user } = await me()
        const { name } = user
        const { photo } = user
        setName(name)
        setImg(photo)
    }

    useEffect(() => {
        userData()
    }, [])


    return (
        <div className="w-full h-full flex items-center bg-[#222222] overflow-hidden space-y-6 relative">
            <div className="bg-[#161616] flex flex-col w-[15%] h-full rounded-tr-lg rounded-br-lg space-y-6 relative">
                <div className="px-2 py-1 flex justify-between items-center">
                    <div className="flex items-center space-x-2 pt-2">
                        <div className="w-8 h-8 rounded-full bg-white">
                            <img src={img} className="w-full aspect-square object-cover rounded-full" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="font-poppins font-normal text-[13px] text-white">{name}</h1>
                            <h3 className="font-albert font-normal text-[12px] text-primary-200 text-left">Personal</h3>
                        </div>
                    </div>

                    <button className="w-fit h-fit duration-500 text-white hover:text-primary-100"> {Iconreport} </button>
                </div>

                <div className="w-full h-[60%] flex flex-col  space-y-6 items-center justify-center">
                    {Buttons.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setId(item.id)}
                            className={`flex space-x-4 items-center duration-500 mt-5 w-full justify-center relative py-2.5 text-white ${item.id === 2 ? 'pl-8' : ''} ${item.id === id ? `bg-[#212020] pr-4` : ""}`}>
                            {item.id === id ? BorderSelection : ''}
                            {item.img}
                            <h1 className="font-poppins  font-medium text-[17px]  ">{item.name}</h1>
                        </button>
                    ))}
                </div>

                <div className="w-full absolute bottom-3 flex flex-col items-center justify-center space-y-4">
                    <button
                        onClick={() => OpenModalLogOut()}
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}
                        className="flex space-x-3 items-center duration-500 mt-5 w-full justify-center relative py-2.5  text-white hover:bg-[#212020] hover:pr-4">
                        {isHover ? BorderSelection : ''}
                        {IconLogOut}
                        <h1 className="font-poppins  font-medium text-[17px]"> Sair </h1>
                    </button>

                    <div className="flex w-full flex-col items-center justify-center text-center">
                        <h1 className="text-white pl-2 font-albert font-normal w-full">Precisa de ajuda?</h1>
                        <h2 className="text-primary-100 font-poppins font-medium text-[13px] w-full">Entre em contato</h2>
                    </div>
                </div>
            </div>

            <div className="w-4/5 h-full flex items-center">
                {RenderComponent()}
            </div>


        </div>
    )
}