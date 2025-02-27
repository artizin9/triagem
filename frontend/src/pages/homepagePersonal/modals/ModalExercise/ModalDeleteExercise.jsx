const IconDelete = (<svg className="w-[40%] aspect-square " viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M41.6667 8.33334L37.5001 12.5H16.6667V20.8333H83.3334V12.5H62.5001L58.3334 8.33334H41.6667ZM20.8334 29.1667V91.6667H79.1667V29.1667H20.8334ZM33.3334 37.5H41.6667V83.3333H33.3334V37.5ZM58.3334 37.5H66.6667V83.3333H58.3334V37.5Z" fill="#FF1D15"/>
    </svg>)
    
const ButtonClose = (<svg width="25" height="25" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.75933 17.05L4.49951 15.7937L9.53877 10.7684L4.49951 5.74315L5.75933 4.48684L10.7986 9.51209L15.8379 4.48684L17.0977 5.74315L12.0584 10.7684L17.0977 15.7937L15.8379 17.05L10.7986 12.0247L5.75933 17.05Z" fill="currentColor"/>
    </svg>)

export function DeleteExercise({Close, Open, Delete}){
    return (
        <div onClick={Close} className={`w-full h-full bg-black flex justify-center items-center bg-opacity-30 fixed insert-0 ${Open ? 'visible' : 'invisible'}`}>
            <div 
            onClick={(e) => e.stopPropagation()}
            className={`bg-[#131313] flex flex-col items-center justify-center px-2 w-[30%] h-[55%] rounded-lg relative duration-300 ease-in-out ${Open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}>
                {IconDelete}
                <div className="flex flex-col w-full items-center justify-center pt-1 mt-3">
                    <h1 className="font-poppins font-extrabold text-[20px] text-white">DELETAR EXERCICIO</h1>
                    <h2 className="font-albert font-medium text-[14px] text-primary-200">Você tem certeza que quer deletar esse exercicio?</h2>
                </div>
                <div className="w-full items-center h-1/5 flex justify-center pt-5">
                    <button onClick={Delete} className="flex items-center justify-center w-3/5 py-1 font-poppins font-semibold text-white bg-primary-100 text-[18px] rounded-lg ">Deletar</button>
                </div>

                <button onClick={Close} className="absolute w-fit h-fit top-2 left-1 hover:text-primary-100 text-white duration-500">
                    {ButtonClose}
                </button>
            </div>
        </div>
    )
}