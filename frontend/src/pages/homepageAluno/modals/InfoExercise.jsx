import { useEffect, useState } from "react"

const PhotoDefaultSrc = "data:image/svg+xml,%3Csvg width='150' height='150' viewBox='0 0 150 150' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='75' cy='75' r='75' fill='%23252424'/%3E%3Cpath d='M127.53 128.642C127.53 121.785 126.362 112.859 123.609 106.524C120.855 100.189 116.82 94.4326 111.732 89.5839C106.644 84.7352 100.604 80.8891 93.9567 78.265C87.3093 75.6409 80.1847 74.2903 72.9895 74.2903C65.7944 74.2903 58.6697 75.6409 52.0223 78.265C45.3749 80.8891 39.3349 84.7352 34.2472 89.5839C29.1595 94.4326 25.1237 100.189 22.3702 106.524C19.6167 112.859 19.8806 119.484 19.8806 126.341C37.059 139.811 44.664 149.696 73.9359 149.763L81.208 149.054L89.6756 147.63L96.3998 145.968L101.132 144.544L105.614 142.693L109.101 141.126L112.588 139.323L116.074 137.281L119.312 135.145L121.678 133.474L124.044 131.633L124.542 131.253L125.04 130.816L126.036 129.971L127.157 128.974L127.53 128.642Z' fill='%23A9A9A9'/%3E%3Ccircle cx='74.7635' cy='39.2745' r='28.3912' fill='%23A9A9A9'/%3E%3C/svg%3E"


export function InfoExercise({ TreinoAluno, Close, Open }) {

    const photo = TreinoAluno?.photo ? TreinoAluno?.photo : PhotoDefaultSrc
    
    const FormFields = [
        { label: "Nome:", name: "name", type: "text",},
        { label: "Numero de exercuções:", name: "numberExec", type: "text"},
        { label: "Numero de repertições:", name: "numberRep", type: "text"},
        { label: "Exercuções por repertições", name: "execByRep", type: "text"},
        { label: "Intervalo:", name: "interval", type: "text",},
        { label: "Descrição:", name: "description", type: "select", }
    ]

    return (
        <div onClick={Close} className={`w-full h-full bg-black flex justify-center items-center bg-opacity-30 fixed inset-0 ${Open ? 'visible' : 'invisible'}`}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={`h-[88%] w-3/5 flex flex-col items-center relative rounded-lg shadow-md shadow-white/15 bg-[#131313] pt-1 duration-300 ease-in-out ${Open ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}>
                <div className="flex flex-col text-center mt-4">
                    <h1 className="font-poppins font-extrabold text-[26px] text-white">INFORMAÇÕES DO <span className="text-primary-100">EXERCICIO</span></h1> 
                </div>

                <div className="w-1/5 aspect-square rounded-full relative bg-[#131313] mt-4">
                    <img src={photo ? photo : PhotoDefaultSrc} className="w-full aspect-square rounded-full object-cover duration-500 hover:border-white hover:scale-105" />
                </div>
                <div className="relative flex justify-center items-center">
                    <h1 className="font-albert font-normal text-[16px] text-white mt-2">Foto do exercicio</h1>
                </div>

                <div className="grid grid-cols-3 gap-6 w-[90%] gap-y-12 p-2 pb-2 mt-6 place-items-center h-[80%]">
                    {FormFields.map((item, index) => (
                        <div key={index} className="w-full flex flex-col relative mb-2">
                            <label className="font-albert font-medium text-[#d7d7d7]">{item.label}</label>
                                <input
                                    readOnly
                                    name={item.name}
                                    placeholder={item.placeholder}
                                    type={item.type}
                                    onChange={item.onChange}
                                    className="border-b-white border-b w-full text-white outline-none bg-[#131313] placeholder:font-albert placeholder:font-medium placeholder:text-[12px] placeholder:text-primary-200"
                                />
                        </div>

                    ))}
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