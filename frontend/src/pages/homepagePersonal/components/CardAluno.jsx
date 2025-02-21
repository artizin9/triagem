const iconDelete = (<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_47_84)">
    <path d="M10.6666 10.3333V8.99996H14.6666V10.3333H10.6666ZM5.99996 11C5.26663 11 4.63885 10.7388 4.11663 10.2166C3.5944 9.6944 3.33329 9.06663 3.33329 8.33329C3.33329 7.59996 3.5944 6.97218 4.11663 6.44996C4.63885 5.92774 5.26663 5.66663 5.99996 5.66663C6.73329 5.66663 7.36107 5.92774 7.88329 6.44996C8.40552 6.97218 8.66663 7.59996 8.66663 8.33329C8.66663 9.06663 8.40552 9.6944 7.88329 10.2166C7.36107 10.7388 6.73329 11 5.99996 11ZM0.666626 16.3333V14.4666C0.666626 14.0888 0.763848 13.7416 0.958293 13.425C1.15274 13.1083 1.41107 12.8666 1.73329 12.7C2.42218 12.3555 3.12218 12.0972 3.83329 11.925C4.5444 11.7527 5.26663 11.6666 5.99996 11.6666C6.73329 11.6666 7.45552 11.7527 8.16663 11.925C8.87774 12.0972 9.57774 12.3555 10.2666 12.7C10.5888 12.8666 10.8472 13.1083 11.0416 13.425C11.2361 13.7416 11.3333 14.0888 11.3333 14.4666V16.3333H0.666626ZM1.99996 15H9.99996V14.4666C9.99996 14.3444 9.9694 14.2333 9.90829 14.1333C9.84718 14.0333 9.76663 13.9555 9.66663 13.9C9.06663 13.6 8.46107 13.375 7.84996 13.225C7.23885 13.075 6.62218 13 5.99996 13C5.37774 13 4.76107 13.075 4.14996 13.225C3.53885 13.375 2.93329 13.6 2.33329 13.9C2.23329 13.9555 2.15274 14.0333 2.09163 14.1333C2.03051 14.2333 1.99996 14.3444 1.99996 14.4666V15ZM5.99996 9.66663C6.36663 9.66663 6.68052 9.53607 6.94163 9.27496C7.20274 9.01385 7.33329 8.69996 7.33329 8.33329C7.33329 7.96663 7.20274 7.65274 6.94163 7.39163C6.68052 7.13051 6.36663 6.99996 5.99996 6.99996C5.63329 6.99996 5.3194 7.13051 5.05829 7.39163C4.79718 7.65274 4.66663 7.96663 4.66663 8.33329C4.66663 8.69996 4.79718 9.01385 5.05829 9.27496C5.3194 9.53607 5.63329 9.66663 5.99996 9.66663Z" fill="currentColor"/>
    </g>
    <defs>
    <clipPath id="clip0_47_84">
    <rect width="16" height="16" fill="currentColor"/>
    </clipPath>
    </defs>
    </svg>)

const PhotoDefaultSrc = "data:image/svg+xml,%3Csvg width='150' height='150' viewBox='0 0 150 150' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='75' cy='75' r='75' fill='%23252424'/%3E%3Cpath d='M127.53 128.642C127.53 121.785 126.362 112.859 123.609 106.524C120.855 100.189 116.82 94.4326 111.732 89.5839C106.644 84.7352 100.604 80.8891 93.9567 78.265C87.3093 75.6409 80.1847 74.2903 72.9895 74.2903C65.7944 74.2903 58.6697 75.6409 52.0223 78.265C45.3749 80.8891 39.3349 84.7352 34.2472 89.5839C29.1595 94.4326 25.1237 100.189 22.3702 106.524C19.6167 112.859 19.8806 119.484 19.8806 126.341C37.059 139.811 44.664 149.696 73.9359 149.763L81.208 149.054L89.6756 147.63L96.3998 145.968L101.132 144.544L105.614 142.693L109.101 141.126L112.588 139.323L116.074 137.281L119.312 135.145L121.678 133.474L124.044 131.633L124.542 131.253L125.04 130.816L126.036 129.971L127.157 128.974L127.53 128.642Z' fill='%23A9A9A9'/%3E%3Ccircle cx='74.7635' cy='39.2745' r='28.3912' fill='%23A9A9A9'/%3E%3C/svg%3E"

export function CardAluno({aluno, Delete, UpdateInfo, Seetraining, type}){

    const photo = aluno?.photo ? aluno?.photo : PhotoDefaultSrc

    return (
        <div className="bg-primary-400 w-[90%] h-[60%] flex flex-col relative items-center rounded-lg p-2 shadow-md shadow-black/40 justify-between">
            <div className="flex flex-col items-center justify-center w-[60%]"> 
                <div className="w-full aspect-square rounded-full bg-primary-400 space-y-1">
                <img src={photo} className="w-full h-full object-cover rounded-full" />
            </div> 
            <h1 className="font-poppins font-medium text-[14px] text-white">{aluno?.name}</h1>
            </div>
            <div className="text-white flex flex-col w-full items-center justify-center text-center space-y-1">
                <h1 className="font-albert text-[13px]">Email: {aluno?.email}</h1>
                <h1 className="font-albert text-[13px]">Telefone: {aluno?.phone}</h1>
            </div>
                {type === "aluno" ? (
                    <div className="w-[95%] items-center p-1 justify-center space-y-3">
                    <button
                    onClick={UpdateInfo} 
                    className="w-full whitespace-nowrap py-0.5 bg-white text-black font-poppins font-bold shadow-black/30 shadow-md duration-500 ease-in-out hover:bg-primary-100/80 hover:text-white rounded-[3px] text-[14px]">
                        Editar informações
                    </button>

                    <button 
                    onClick={Seetraining}
                    className="w-full  whitespace-nowrap py-0.5 bg-white text-primary-400 font-poppins font-bold shadow-black/30 shadow-md duration-500 ease-in-out hover:bg-primary-100/80 hover:text-white rounded-[3px] text-[14px]">
                        Visualizar treinos
                    </button>
                    </div>
                ) : 
                ('')
                }

                <button 
                onClick={Delete}
                className="text-white hover:text-primary-100 duration-500 ease-in-out absolute top-1 right-1">
                    {iconDelete}
                </button>
            </div>
    )
}