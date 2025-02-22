const iconDelete = (<svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.93336 14.5999L8.00002 13.6666L10.3667 11.2999L4.70002 5.63324L2.33336 7.9999L1.40002 7.06657L2.33336 6.0999L1.40002 5.16657L2.80002 3.76657L1.86669 2.7999L2.80002 1.86657L3.76669 2.7999L5.16669 1.3999L6.10002 2.33324L7.06669 1.3999L8.00002 2.33324L5.63336 4.6999L11.3 10.3666L13.6667 7.9999L14.6 8.93324L13.6667 9.8999L14.6 10.8332L13.2 12.2332L14.1334 13.1999L13.2 14.1332L12.2334 13.1999L10.8334 14.5999L9.90002 13.6666L8.93336 14.5999Z" fill="currentColor"/>
    <rect x="9" y="4" width="6" height="1.33333" fill="currentColor"/>
    </svg>
    )

const PhotoDefaultSrc = (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.93336 14.5999L8.00002 13.6666L10.3667 11.2999L4.70002 5.63324L2.33336 7.9999L1.40002 7.06657L2.33336 6.0999L1.40002 5.16657L2.80002 3.76657L1.86669 2.7999L2.80002 1.86657L3.76669 2.7999L5.16669 1.3999L6.10002 2.33324L7.06669 1.3999L8.00002 2.33324L5.63336 4.6999L11.3 10.3666L13.6667 7.9999L14.6 8.93324L13.6667 9.8999L14.6 10.8332L13.2 12.2332L14.1334 13.1999L13.2 14.1332L12.2334 13.1999L10.8334 14.5999L9.90002 13.6666L8.93336 14.5999Z" fill="white"/>
    <rect x="9" y="4" width="6" height="1.33333" fill="white"/>
    </svg>
    )

export function CardTreino({treino, Delete, UpdateInfo, Seetraining, type}){

    const photo = treino?.photo ? treino?.photo : PhotoDefaultSrc

    return (
        <div className="bg-primary-400 w-[90%] h-[60%] flex flex-col relative items-center rounded-lg p-2 shadow-md shadow-black/40 justify-between min-h-[330px]">
            <div className="flex flex-col items-center justify-center w-[60%]"> 
                <div className="w-full aspect-square rounded-full bg-primary-400 space-y-1">
                <img src={photo} className="w-full h-full object-cover rounded-full" />
            </div> 
            <h1 className="font-poppins font-medium text-[14px] text-white mt-1">{treino?.name}</h1>
            <h1 className="font-albert font-regular text-[12px] text-primary-200">Para {treino?.destined}</h1>
            </div>
                {type === "treino" ? (
                    <div className="w-[95%] items-center p-1 justify-center space-y-3">
                    <button
                    onClick={UpdateInfo} 
                    className="w-full whitespace-nowrap py-0.5 bg-white text-black font-poppins font-bold shadow-black/30 shadow-md duration-500 ease-in-out hover:bg-primary-100/80 hover:text-white rounded-[3px] text-[14px]">
                        Adicionar exercicio
                    </button>

                    <button 
                    onClick={UpdateInfo}
                    className="w-full  whitespace-nowrap py-0.5 bg-white text-primary-400 font-poppins font-bold shadow-black/30 shadow-md duration-500 ease-in-out hover:bg-primary-100/80 hover:text-white rounded-[3px] text-[14px]">
                        Editar treino
                    </button>

                    <button 
                    onClick={''}
                    className="w-full  whitespace-nowrap py-0.5 bg-white text-primary-400 font-poppins font-bold shadow-black/30 shadow-md duration-500 ease-in-out hover:bg-primary-100/80 hover:text-white rounded-[3px] text-[14px]">
                        Enviar treino
                    </button>
                    </div>
                ) : 
                ('')
                }

                <button 
                onClick={Delete}
                className="text-white hover:text-primary-100 duration-500 ease-in-out absolute top-2 right-1.5">
                    {iconDelete}
                </button>
            </div>
    )
}