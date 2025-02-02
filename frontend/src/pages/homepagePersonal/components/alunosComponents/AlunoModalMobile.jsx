export function ModalMobileAluno({PegarValores, Campos_adicionais, getValueFoto, form, Aluno, Close, setVisibleModalMobile, visibleModalMobile, getValuesfields, FeedbackMessage}){
    return (
        <div className={`w-[100%] relative h-full bg-[#252424] rounded-md flex flex-col itens-center duration-500 p-2 justify-between md:hidden overflow-y-visible ${visibleModalMobile ? 'scale-100 opacity-100 md:hidden' : 'hidden scale-75'}`}>
                <div className="mt-2 h-[40%] w-[100%] flex items-center justify-center flex-col">
                    <div className={`mt-2 h-full aspect-square flex justify-center items-center relative rounded-full bg-white text-[#242525]`}>
                        <input
                            type='file'
                            onChange={getValueFoto}
                            className={`absolute bottom-0 w-full h-full cursor-pointer opacity-0 z-20`}
                            accept='image/*'
                        />

                        {form.foto && (
                            <img
                                src={URL.createObjectURL(form.foto)}
                                alt="Foto do Aluno"
                                className="absolute top-0 left-0 w-full h-full rounded-full object-cover z-10"
                            />
                        )}

                        <svg width="24" height="24" className="absolute" viewBox="0 0 22 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.5 12.5H0.5V9.5H9.5V0.5H12.5V9.5H21.5V12.5H12.5V21.5H9.5V12.5Z" fill="currentColor" />
                        </svg>
                    </div>

                    <h1 className="text-[16px] font-bold font-poltawski mt-2 text-white"> Selecione uma foto </h1>
                </div>

                <form method="post" onSubmit={PegarValores} className="flex justify-center items-center space-y-5 flex-col mb-4 h-[50%] max-md:space-y-4">
                    {Campos_adicionais.map((item, index) => (
                        <div key={index} className="flex flex-col justify-center w-[80%] relative ">
                            <label className="text-white text-[16px] font-aleo">{item.label}</label>
                            {item.type === 'select' ? (
                                <select
                                    name={item.name}
                                    value={item.value}
                                    onChange={getValuesfields}
                                    className="w-full outline-none bg-[#252424] border-b-[1px] border-slate-50 text-slate-50 p-1"
                                >
                                        <option value = 'Brasil'>Brasil</option>
                                </select>) :
                                <input
                                    type={item.type}
                                    name={item.name}
                                    className="w-full text-white appearance-none border-b-[1px] border-white bg-[#252424] outline-none"
                                    onChange={item.onChange}
                                />
                            }
                        </div>
                    ))}
                </form>

                 <div className="w-full relative flex items-center space-y-1 flex-col justify-center">
                 
                 <h1 draggable='true' className={` font-poltawski font-bold text-white text-[14px] duration-500 ${FeedbackMessage ? 'opacity-100' : 'opacity-0'}`}> {Aluno ? 'Informações foram salvas com sucesso' : 'Aluno cadastrado com sucesso'}</h1>

                <button
                    onClick={PegarValores} 
                    className={`${Aluno ? 'bg-white font-poltawski text-[#252424] w-[30%] whitespace-nowrap py-2 justify-center rounded-md flex items-center font-bold hover:bg-[#2e2e2e] hover:text-[#FFF4A3] duration-500 active:bg-[#4e4e4e] shadow-md shadow-[#252424] max-md:px-0 max-md:w-1/2' : 'bg-white font-poltawski text-[#252424] w-[30%] whitespace-nowrap py-2 px-2 justify-between rounded-md flex items-center font-bold hover:bg-[#2e2e2e] hover:text-[#FFF4A3] duration-500 active:bg-[#4e4e4e] shadow-md shadow-[#252424] max-md:px-0 max-md:w-1/2' }`}>
                    <h1 className={`${Aluno ? 'pl-0' : 'pl-2'}`}>{Aluno ? 'Salvar Informações' : 'Cadastrar Aluno'}</h1>
                    {Aluno ? null : (
                    <svg width="16" height="16" className="mr-2" viewBox="0 0 22 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.5 12.5H0.5V9.5H9.5V0.5H12.5V9.5H21.5V12.5H12.5V21.5H9.5V12.5Z" fill="currentColor" />
                    </svg>
                    )}
                </button>
                </div>  

                <button onClick={Close} className="absolute right-0 top-1 max-md:top-0 text-white hover:text-red-600 duration-500">
                <svg width="31" height="37" viewBox="0 0 31 37" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.82749 22.9235L8.42749 21.5235L14.0275 15.9235L8.42749 10.3235L9.82749 8.92346L15.4275 14.5235L21.0275 8.92346L22.4275 10.3235L16.8275 15.9235L22.4275 21.5235L21.0275 22.9235L15.4275 17.3235L9.82749 22.9235Z" fill="currentColor"/>
                </svg>
            </button>

            <button onClick={() => setVisibleModalMobile(false)} className="absolute left-2 top-2 max-md:top-1 text-white hover:text-red-600 duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffff"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
            </button>

            </div>
    )
}