export function Footer(){
    return (
        <div className="w-full h-full items-center justify-center flex relative flex-col bg-[#171717] overflow-x-hidden pt-2">
            <div className="space-y-5 flex flex-col text-white items-center justify-center mt-5">
                <h1 className="font-poppins font-extrabold text-[35px]">ESTÁ PREPARADO PARA ALCANÇAR SEUS OBJETIVOS?</h1>
                <button className="px-3 py-1.5 space-x-3 bg-primary-100 shadow-sm shadow-black/40 rounded-lg">
                    <h1 className="font-poppins font-bold">COMEÇAR</h1>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.25 20V8.75H10V6.25H23.75V20H21.25ZM15 26.25V15H3.75V12.5H17.5V26.25H15Z" fill="white"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}