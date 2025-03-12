import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isBefore, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";

const NextMouth = (<svg width="22" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.94773 2.00402C7.94773 0.165356 10.22 -0.699046 11.442 0.67473L20.3106 10.6443C20.3106 10.6443 20.3106 10.6443 20.3106 10.6443H20.3106C20.3107 10.6443 20.3107 10.6443 20.3107 10.6443C20.3107 10.6444 20.3107 10.6444 20.3107 10.6444C20.3107 10.6444 20.3107 10.6445 20.3106 10.6445H20.3106C20.3106 10.6445 20.3106 10.6445 20.3106 10.6445L11.4674 20.5856C10.2472 21.9572 7.97844 21.0979 7.97305 19.2621L7.95739 13.9337C7.95738 13.9283 7.95302 13.9239 7.94764 13.9239H3.11991C1.39683 13.9239 0 12.5271 0 10.804C0 9.08095 1.39683 7.68412 3.11991 7.68412H5.94773C7.0523 7.68412 7.94773 6.78869 7.94773 5.68412V2.00402Z" fill="currentColor"/>
    </svg>
    )
const PrevMouth = (<svg width="22" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0523 19.6043C13.0523 21.4429 10.78 22.3073 9.55795 20.9335L0.689436 10.964C0.689425 10.964 0.689409 10.964 0.689394 10.964H0.68935C0.689318 10.964 0.689302 10.964 0.689323 10.9639C0.689335 10.9639 0.689335 10.9639 0.689323 10.9639C0.689302 10.9639 0.689318 10.9638 0.68935 10.9638H0.689394C0.689409 10.9638 0.689425 10.9638 0.689434 10.9638L9.53264 1.02271C10.7528 -0.348902 13.0216 0.510361 13.027 2.34613L13.0426 7.67462C13.0426 7.67999 13.047 7.68434 13.0524 7.68434L17.8801 7.68434C19.6032 7.68434 21 9.08117 21 10.8042C21 12.5273 19.6032 13.9242 17.8801 13.9242H15.0523C13.9477 13.9242 13.0523 14.8196 13.0523 15.9242V19.6043Z" fill="currentColor"/>
    </svg>
    )
const IconCalendar = (<svg width="28" height="28" viewBox="0 0 26 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.8773 32.225C2.08604 32.225 1.40868 31.9095 0.845207 31.2784C0.281736 30.6474 0 29.8887 0 29.0025V6.44501C0 5.55882 0.281736 4.80019 0.845207 4.16911C1.40868 3.53804 2.08604 3.2225 2.8773 3.2225H4.31595V0H7.19325V3.2225H18.7025V0H21.5798V3.2225H23.0184C23.8097 3.2225 24.487 3.53804 25.0505 4.16911C25.614 4.80019 25.8957 5.55882 25.8957 6.44501V29.0025C25.8957 29.8887 25.614 30.6474 25.0505 31.2784C24.487 31.9095 23.8097 32.225 23.0184 32.225H2.8773ZM2.8773 29.0025H23.0184V12.89H2.8773V29.0025ZM2.8773 9.66751H23.0184V6.44501H2.8773V9.66751ZM12.9479 19.335C12.5402 19.335 12.1986 19.1806 11.9228 18.8718C11.6471 18.563 11.5092 18.1803 11.5092 17.7238C11.5092 17.2672 11.6471 16.8846 11.9228 16.5758C12.1986 16.2669 12.5402 16.1125 12.9479 16.1125C13.3555 16.1125 13.6972 16.2669 13.9729 16.5758C14.2486 16.8846 14.3865 17.2672 14.3865 17.7238C14.3865 18.1803 14.2486 18.563 13.9729 18.8718C13.6972 19.1806 13.3555 19.335 12.9479 19.335ZM7.19325 19.335C6.78564 19.335 6.44396 19.1806 6.16822 18.8718C5.89247 18.563 5.7546 18.1803 5.7546 17.7238C5.7546 17.2672 5.89247 16.8846 6.16822 16.5758C6.44396 16.2669 6.78564 16.1125 7.19325 16.1125C7.60087 16.1125 7.94255 16.2669 8.21829 16.5758C8.49403 16.8846 8.6319 17.2672 8.6319 17.7238C8.6319 18.1803 8.49403 18.563 8.21829 18.8718C7.94255 19.1806 7.60087 19.335 7.19325 19.335ZM18.7025 19.335C18.2948 19.335 17.9532 19.1806 17.6774 18.8718C17.4017 18.563 17.2638 18.1803 17.2638 17.7238C17.2638 17.2672 17.4017 16.8846 17.6774 16.5758C17.9532 16.2669 18.2948 16.1125 18.7025 16.1125C19.1101 16.1125 19.4518 16.2669 19.7275 16.5758C20.0032 16.8846 20.1411 17.2672 20.1411 17.7238C20.1411 18.1803 20.0032 18.563 19.7275 18.8718C19.4518 19.1806 19.1101 19.335 18.7025 19.335ZM12.9479 25.78C12.5402 25.78 12.1986 25.6256 11.9228 25.3168C11.6471 25.008 11.5092 24.6253 11.5092 24.1688C11.5092 23.7123 11.6471 23.3296 11.9228 23.0208C12.1986 22.7119 12.5402 22.5575 12.9479 22.5575C13.3555 22.5575 13.6972 22.7119 13.9729 23.0208C14.2486 23.3296 14.3865 23.7123 14.3865 24.1688C14.3865 24.6253 14.2486 25.008 13.9729 25.3168C13.6972 25.6256 13.3555 25.78 12.9479 25.78ZM7.19325 25.78C6.78564 25.78 6.44396 25.6256 6.16822 25.3168C5.89247 25.008 5.7546 24.6253 5.7546 24.1688C5.7546 23.7123 5.89247 23.3296 6.16822 23.0208C6.44396 22.7119 6.78564 22.5575 7.19325 22.5575C7.60087 22.5575 7.94255 22.7119 8.21829 23.0208C8.49403 23.3296 8.6319 23.7123 8.6319 24.1688C8.6319 24.6253 8.49403 25.008 8.21829 25.3168C7.94255 25.6256 7.60087 25.78 7.19325 25.78ZM18.7025 25.78C18.2948 25.78 17.9532 25.6256 17.6774 25.3168C17.4017 25.008 17.2638 24.6253 17.2638 24.1688C17.2638 23.7123 17.4017 23.3296 17.6774 23.0208C17.9532 22.7119 18.2948 22.5575 18.7025 22.5575C19.1101 22.5575 19.4518 22.7119 19.7275 23.0208C20.0032 23.3296 20.1411 23.7123 20.1411 24.1688C20.1411 24.6253 20.0032 25.008 19.7275 25.3168C19.4518 25.6256 19.1101 25.78 18.7025 25.78Z" fill="white"/>
    </svg>
    )


export function BookTraining({ Close, Open }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDays, setSelectedDays] = useState([])
    const [sendData, setSendData] = useState({
        Date: '',
        id: Date.now()
    })
    const [isDaySelected, setIsDaySelected] = useState(false)
    const [confirmedDay, setConfirmedDay] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null)
    const [step, setStep] = useState(1)

    const today = format(new Date(), "yyyy-MM-dd")
    const mes = format(currentDate, "MMMM", { locale: ptBR }).charAt(0).toUpperCase() + format(currentDate, "MMMM", { locale: ptBR }).slice(1).toLowerCase() 
    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(currentDate),
        end: endOfMonth(currentDate)
    });

    const handleClickDay = (day) => {
        const formattedDay = format(day, "yyyy-MM-dd");
        if (confirmedDay === today) return;
        if (selectedDay === formattedDay) {
            setSelectedDay(null);
            setStep(1);
        } else {
            setSelectedDay(formattedDay);
        setSendData((prevData) => ({
            ...prevData,
            Date: formattedDay
        }))
            setStep(2);
        }
    };

    const handleConfirm = () => {
        setConfirmedDay(selectedDay)
        setSelectedDays((prevDays) => [...prevDays, sendData]);
        setStep(1)
    };

    const handleUnselect = () => {
        setSelectedDay(null);
        setStep(1);
    };

    console.log(selectedDays)

    const prevMonth = () => setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    const nextMonth = () => setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    
    return (
        <div onClick={Close} className={`w-full h-full bg-black flex justify-center items-center bg-opacity-30 fixed inset-0 ${Open ? 'visible' : 'invisible'}`}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={`h-[72%] w-2/5 flex flex-col items-center relative rounded-lg shadow-md shadow-white/20 bg-[#131313] pt-1 duration-300 ease-in-out ${Open ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}>
                <div className="flex flex-col text-center mt-4">
                    <h1 className="font-poppins font-semibold text-[26px] text-white">MARQUE SEU <span className="text-primary-100">TREINO</span></h1>
                    <h1 className="font-albert font-medium text-[15px] text-white">Registre seu progresso</h1>
                </div>

                <div className="w-[90%] h-full bg-[#131313] text-white p-1 pt-4 rounded-lg">
                    <div className="flex justify-between items-center pt-4">
                        <button className="hover:text-primary-100 duration-500 text-white" onClick={prevMonth}>{PrevMouth}</button>
                        <h2 className="font-poppins font-bold text-[20px] flex space-x-4">
                            <div>{IconCalendar}</div>
                            <div>{mes}</div>
                        </h2>
                        <button className="hover:text-primary-100 duration-500 text-white" onClick={nextMonth}>{NextMouth}</button>
                    </div>
                    <div className="grid grid-cols-7 gap-y-4 gap-x-10 text-center mt-8">
                        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((d) => (
                            <div key={d} className="tracking-widest font-albert font-medium text-white text-[15px]">{d}</div>
                        ))}
                        {daysInMonth.map((day) => {
                            const isPast = isBefore(day, new Date()) && !isToday(day);
                            const formattedDay = format(day, "yyyy-MM-dd");
                            const isSelected = selectedDay === formattedDay;
                            const isConfirmed = confirmedDay === formattedDay;
                            return (
                                <button
                                    key={formattedDay}
                                    onClick={() => handleClickDay(day)}
                                    disabled={confirmedDay && confirmedDay !== today}
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg duration-500 
                                        ${isPast ? "text-gray-500" : "text-white"} 
                                        ${isSelected ? "bg-red-500" : "bg-transparent"} 
                                        ${isConfirmed ? "bg-primary-100" : ""}`}
                                >
                                    {format(day, "d")}
                                </button>
                            );
                        })}
                    </div>
                </div>
                
                {step === 1 && !confirmedDay &&
                (<button
                onClick={() => handleClickDay(new Date())} 
                className="w-1/2 py-1 mb-3 flex space-x-3 items-center justify-center hover:bg-primary-100 duration-500 hover:text-white rounded-lg bg-white font-poppins font-bold text-primary-400 text-[16px]">
                    <h1>REGISTRAR TREINO</h1>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.775 21.4084L8.63333 17.2667L10.325 15.575L12.775 18.025L17.675 13.125L19.3667 14.8167L12.775 21.4084ZM5.83333 25.6667C5.19167 25.6667 4.64236 25.4382 4.18542 24.9813C3.72847 24.5243 3.5 23.975 3.5 23.3334V7.00004C3.5 6.35837 3.72847 5.80907 4.18542 5.35212C4.64236 4.89518 5.19167 4.66671 5.83333 4.66671H7V2.33337H9.33333V4.66671H18.6667V2.33337H21V4.66671H22.1667C22.8083 4.66671 23.3576 4.89518 23.8146 5.35212C24.2715 5.80907 24.5 6.35837 24.5 7.00004V23.3334C24.5 23.975 24.2715 24.5243 23.8146 24.9813C23.3576 25.4382 22.8083 25.6667 22.1667 25.6667H5.83333ZM5.83333 23.3334H22.1667V11.6667H5.83333V23.3334ZM5.83333 9.33337H22.1667V7.00004H5.83333V9.33337Z" fill="currentColor"/>
                    </svg>
                </button>)}
                
                {step === 2 && (
                <div className="flex items-center justify-center w-full space-x-5">
                    <button
                    onClick={handleUnselect} 
                    className="w-[42%] py-1 mb-3 flex space-x-3 items-center justify-center hover:bg-primary-100 duration-500 hover:text-white rounded-lg bg-white font-poppins font-bold text-primary-400 text-[16px]">
                        <h1>RETIRAR REGISTRO</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 -960 960 960" fill="currentColor"><path d="m388-212-56-56 92-92-92-92 56-56 92 92 92-92 56 56-92 92 92 92-56 56-92-92-92 92ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>               
                    </button>
                    <button
                    onClick={handleConfirm} 
                    className="w-[43%] py-1 mb-3 flex space-x-3 items-center justify-center hover:bg-primary-100 duration-500 hover:text-white rounded-lg bg-white font-poppins font-bold text-primary-400 text-[16px]">
                        <h1>CONFIRMAR REGISTRO</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28" fill="currentColor"><path d="M438-226 296-368l58-58 84 84 168-168 58 58-226 226ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>
                    </button>
                </div>
                )}

                <button onClick={Close} className="absolute w-fit h-fit top-2 left-1 hover:text-primary-100 text-white duration-500">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.75933 17.05L4.49951 15.7937L9.53877 10.7684L4.49951 5.74315L5.75933 4.48684L10.7986 9.51209L15.8379 4.48684L17.0977 5.74315L12.0584 10.7684L17.0977 15.7937L15.8379 17.05L10.7986 12.0247L5.75933 17.05Z" fill="currentColor" />
                    </svg>
                </button>
            </div>
        </div>
    )
}