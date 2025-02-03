import logo from '../../../assets/imgs/logo.svg'
import { useState } from 'react'
import { HomeAluno } from '../components/HomeAluno'

const buttons = [
    {
        id: 1,
        name: 'Treinos',
        img: (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m826-585-56-56 30-31-128-128-31 30-57-57 30-31q23-23 57-22.5t57 23.5l129 129q23 23 23 56.5T857-615l-31 30ZM346-104q-23 23-56.5 23T233-104L104-233q-23-23-23-56.5t23-56.5l30-30 57 57-31 30 129 129 30-31 57 57-30 30Zm397-336 57-57-303-303-57 57 303 303ZM463-160l57-58-302-302-58 57 303 303Zm-6-234 110-109-64-64-109 110 63 63Zm63 290q-23 23-57 23t-57-23L104-406q-23-23-23-57t23-57l57-57q23-23 56.5-23t56.5 23l63 63 110-110-63-62q-23-23-23-57t23-57l57-57q23-23 56.5-23t56.5 23l303 303q23 23 23 56.5T857-441l-57 57q-23 23-57 23t-57-23l-62-63-110 110 63 63q23 23 23 56.5T577-161l-57 57Z" /></svg>)
    },

    {
        id: 2,
        name: 'Sair',
        img: (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>)
    }
]

const contanto = [
    {
        id: 1,
        img: (<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 50 50">
            <path fill='currentColor' d="M 43.753906 6.4023438 C 42.53621 6.3489969 41.294792 6.712898 40.271484 7.46875 L 37.525391 9.4960938 L 25 18.755859 L 12.591797 9.5839844 A 1.0001 1.0001 0 0 0 11.949219 9.3007812 L 12.199219 9.3007812 L 9.734375 7.4765625 C 8.7104042 6.7188363 7.4671493 6.3528895 6.2480469 6.40625 C 5.0289444 6.4596105 3.8349462 6.9314667 2.9082031 7.8457031 C 1.7309454 9.0063798 1 10.629831 1 12.410156 L 1 15.84375 A 1.0001 1.0001 0 0 0 1 16.138672 L 1 39.5 C 1 41.421188 2.5788117 43 4.5 43 L 12 43 A 1.0001 1.0001 0 0 0 13 42 L 13 25.373047 L 24.40625 33.804688 A 1.0001 1.0001 0 0 0 25.59375 33.804688 L 37 25.373047 L 37 42 A 1.0001 1.0001 0 0 0 38 43 L 45.5 43 C 47.421188 43 49 41.421188 49 39.5 L 49 16.119141 A 1.0001 1.0001 0 0 0 49 15.859375 L 49 12.410156 C 49 10.6517 48.290455 9.0357821 47.128906 7.8730469 C 47.095336 7.8394769 47.084086 7.83018 47.097656 7.84375 A 1.0001 1.0001 0 0 0 47.091797 7.8378906 C 46.165242 6.9256756 44.971603 6.4556905 43.753906 6.4023438 z M 43.644531 8.4003906 C 44.400835 8.4300436 45.134049 8.7168876 45.689453 9.2636719 C 45.708363 9.2823439 45.722171 9.2964424 45.712891 9.2871094 C 46.50934 10.084374 47 11.188613 47 12.410156 L 47 15.496094 L 39 21.408203 L 39 11 A 1.0001 1.0001 0 0 0 38.996094 10.898438 L 41.458984 9.078125 A 1.0001 1.0001 0 0 0 41.460938 9.078125 C 42.109578 8.598977 42.888228 8.3707375 43.644531 8.4003906 z M 6.3574219 8.40625 C 7.1145694 8.37661 7.8958927 8.6037105 8.5449219 9.0839844 L 11.003906 10.902344 A 1.0001 1.0001 0 0 0 11 11 L 11 21.408203 L 3 15.496094 L 3 12.410156 C 3 11.174482 3.5017577 10.068855 4.3125 9.2695312 C 4.8677569 8.7217677 5.6002743 8.4358895 6.3574219 8.40625 z M 37 12.371094 L 37 22.886719 L 25 31.755859 L 13 22.886719 L 13 12.373047 L 24.40625 20.804688 A 1.0001 1.0001 0 0 0 25.59375 20.804688 L 37 12.371094 z M 3 17.982422 L 11 23.896484 L 11 41 L 4.5 41 C 3.6591883 41 3 40.340812 3 39.5 L 3 17.982422 z M 47 17.982422 L 47 39.5 C 47 40.340812 46.340812 41 45.5 41 L 39 41 L 39 23.896484 L 47 17.982422 z"></path>
        </svg>)
    },

    {
        id: 2,
        img: (<svg width="22" height="22" viewBox="0 0 27 27" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.64 1.62012C3.76954 1.62012 0.619995 4.76966 0.619995 8.64012V18.3601C0.619995 22.2306 3.76954 25.3801 7.64 25.3801H17.36C21.2305 25.3801 24.38 22.2306 24.38 18.3601V8.64012C24.38 4.76966 21.2305 1.62012 17.36 1.62012H7.64ZM7.64 2.70012H17.36C20.6467 2.70012 23.3 5.35342 23.3 8.64012V18.3601C23.3 21.6468 20.6467 24.3001 17.36 24.3001H7.64C4.35329 24.3001 1.7 21.6468 1.7 18.3601V8.64012C1.7 5.35342 4.35329 2.70012 7.64 2.70012ZM18.98 5.94012C18.6936 5.94012 18.4189 6.0539 18.2163 6.25644C18.0138 6.45898 17.9 6.73368 17.9 7.02012C17.9 7.30655 18.0138 7.58125 18.2163 7.78379C18.4189 7.98633 18.6936 8.10012 18.98 8.10012C19.2664 8.10012 19.5411 7.98633 19.7437 7.78379C19.9462 7.58125 20.06 7.30655 20.06 7.02012C20.06 6.73368 19.9462 6.45898 19.7437 6.25644C19.5411 6.0539 19.2664 5.94012 18.98 5.94012ZM12.5 7.56012C9.22582 7.56012 6.56 10.2259 6.56 13.5001C6.56 16.7743 9.22582 19.4401 12.5 19.4401C15.7742 19.4401 18.44 16.7743 18.44 13.5001C18.44 10.2259 15.7742 7.56012 12.5 7.56012ZM12.5 8.64012C15.1905 8.64012 17.36 10.8096 17.36 13.5001C17.36 16.1906 15.1905 18.3601 12.5 18.3601C9.8095 18.3601 7.64 16.1906 7.64 13.5001C7.64 10.8096 9.8095 8.64012 12.5 8.64012Z" fill="currentColor" />
        </svg>
        )
    },
]

export function Render({ imagem, nome }) {

    const [id, setId] = useState(1)
    const [logOut, setLogOut] = useState(false)
    const VisibleLogOut = () => {
        setLogOut(logOut => !logOut)
    }

    const renderContent = () => {
        switch (id) {
            case 1:
                return <HomeAluno />
        }
    }

    return (
        <>
            <div className="w-full h-full flex items-center justify-center overflow-hidden max-md:hidden">
                <div className="w-[15%] h-full bg-[#252424] items-center space-y-5 relative max-md:hidden">
                    <div className="flex items-center justify-between w-full p-1">

                        <div className="flex justify-between  items-center mt-1 ">
                            <div className="rounded-full h-8 w-8 bg-gray-600 mb-0.5">{imagem}</div>
                            <h1 className="ml-2 font-poltawski font-light text-white text-[13px]"> {nome} </h1>
                        </div>

                        <svg width="17" height="17" className="mt-[5px] text-white hover:text-red-400 duration-500 cursor-pointer" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 14C9.28333 14 9.52083 13.9042 9.7125 13.7125C9.90417 13.5208 10 13.2833 10 13C10 12.7167 9.90417 12.4792 9.7125 12.2875C9.52083 12.0958 9.28333 12 9 12C8.71667 12 8.47917 12.0958 8.2875 12.2875C8.09583 12.4792 8 12.7167 8 13C8 13.2833 8.09583 13.5208 8.2875 13.7125C8.47917 13.9042 8.71667 14 9 14ZM8 10H10V4H8V10ZM5.25 18L0 12.75V5.25L5.25 0H12.75L18 5.25V12.75L12.75 18H5.25ZM6.1 16H11.9L16 11.9V6.1L11.9 2H6.1L2 6.1V11.9L6.1 16Z" fill="currentColor" />
                        </svg>

                    </div>

                    <div className='flex justify-center items-center'>
                        <img src={logo} alt="Logo" className="h-36 w-36" />
                    </div>

                    <div className='flex items-center justify-center space-y-5 flex-col'>
                        {buttons.map((item, index) => (
                            <button
                                key={index}
                                className={` ${item.id === id ? 'bg-[#464545] w-[95%] text-[#FFF4A3] border-r-4 border-[#FFF4A3] font-aleo flex items-center justify-center p-2 scale-105 duration-300 ' : 'bg-[#252424] flex items-center justify-center p-2 font-aleo w-full text-white'} ${item.id === 2 ? "md:hidden" : ""}`}
                                onClick={() => { setId(item.id) }}>
                                <div className={`flex items-center justify-center ${item.id === 2 ? 'md:hidden' : ''}`}>
                                    {item.img}
                                    <h1 className='ml-2 mt-1 '> {item.name} </h1>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className='absolute bottom-2 flex flex-col justify-center items-center w-full'>

                        <div className={`${logOut ? 'w-[80%] rounded-lg flex flex-col font-poltawski font-bold p-1 bg-[#464545] items-center py-3 px-1 text-white absolute -translate-y-28 ' : 'hidden'}`}>
                            Você deseja sair?
                            <button className='w-[80%] mt-2 bg-[#FFF4A3] text-[#252424] hover:bg-red-500 duration-300 hover:text-white rounded-md'> Sair </button>
                        </div>
                        <button className='bg-[#252424] flex items-center justify-center p-2 font-aleo w-full text-white hover:bg-[#464545] hover:text-[#FFF4A3] hover:border-r-4 hover:border-[#FFF4A3]  duration-300' onClick={VisibleLogOut}>

                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
                            <h1 className='ml-2 mt-1 text-[18px]'> Sair </h1>

                        </button>

                        <div className='flex justify-center items-center flex-col w-full space-y-2 text-white font-poltawski mt-1'>
                            <h1> Entre em contanto </h1>
                            <div className='flex justify-center space-x-4 items-center w-full'>
                                {contanto.map((item, index) => (
                                    <div key={index} className='rounded-xl text-white bg-[#464545] p-1.5 hover:text-[#FFF4A3] hover:bg-[#3f3e3e]  duration-300 cursor-pointer '>
                                        {item.img}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-[85%] bg-[#3F3D3D] h-full flex  justify-center text-black relative  max-md:hidden'>
                    {renderContent()}
                </div>


            </div>

            <div className='w-dvw h-dvh flex justify-center flex-col items-center md:hidden'>

                <div className='w-full bg-[#3F3D3D] h-full flex justify-center text-black relative'>
                    {renderContent()}

                    <div
                        onClick={() => setLogOut(false)}
                        className={`md:hidden w-full h-full rounded-lg flex justify-center flex-col font-poltawski font-bold p-1 bg-[#464545] items-center py-3 px-1 text-white absolute bg-black/20  ${logOut ? 'visible' : 'invisible'}`}>

                        <div
                            onClick={(e) => e.stopPropagation()}
                            className={`duration-500 w-[80%] rounded-lg flex flex-col font-poltawski font-bold bg-white items-center py-5 px-1 text-[#252424] shadow-black shadow-lg ${logOut ? 'opacity-100 scale-100 ' : 'opacity-0 scale-125'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="100px" viewBox="0 -960 960 960" width="100px" fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
                            <h1 className='font-poltawski font-bold text-xl'>Você deseja sair?</h1>
                            <h3 className='font-aleo font-light text-sm'>Ao sair, você terá que fazer login</h3>

                            <button className='w-[60%] mt-2 translate-y-2 text-white bg-red-500 duration-300 rounded-md py-1'> Sair da conta </button>

                            <button onClick={() => setLogOut(false)} className="absolute left-0 top-1 text-[#25242] active:text-red-600  duration-500">
                                <svg width="31" height="33" viewBox="0 0 31 37" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.82749 22.9235L8.42749 21.5235L14.0275 15.9235L8.42749 10.3235L9.82749 8.92346L15.4275 14.5235L21.0275 8.92346L22.4275 10.3235L16.8275 15.9235L22.4275 21.5235L21.0275 22.9235L15.4275 17.3235L9.82749 22.9235Z" fill="currentColor" />
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>

                <div className='h-fit w-full bg-[#252424] p-2 relative z-10'>
                    <div className='h-full w-full p-1 flex justify-evenly items-center'>
                        {buttons.map((item) => (
                            <button
                                key={item.id}
                                className={`${item.id === id ? "scale-115 shadow-lg shadow-[#fff4a3] text-[#fff4a3] flex p-1 items-center justify-center h-12 aspect-square rounded-full bg-[#3f3f3f] ease-in-out transition-all duration-500 -translate-y-2 border border-[#fff4a3]" : "flex p-1 items-center justify-center h-12 aspect-square rounded-full bg-[#3f3f3f] shadow-lg shadow-black text-white duration-500 border border-[#3f3f3f]"}`}
                                onClick={() => { item.id === 2 ? VisibleLogOut() : setId(item.id) }}>
                                {item.img}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}