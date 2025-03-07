import fitsync from "../../../assets/imgs/fitsync.png"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function About(){

    const Title = useRef(null)
    const subTitle = useRef(null)
    const Card1 = useRef(null)
    const Card2 = useRef(null)
    const Card3 = useRef(null)

    useEffect(() => {
        const titles = [Title.current, subTitle.current]
        titles.map((titles, index) => {
            gsap.fromTo(
                titles,
                { y: "20%", opacity: 0 },
                {
                    y: "0%",
                    opacity: 1,
                    duration: 1.2,
                    ease: "power4.out",
                    delay: index * 0.4,
                    scrollTrigger: {
                        trigger: titles,
                        start: "top 70%",
                        toggleActions: "play none none none",
                    },
                }
            )
        })
    })

    useEffect(() => {
        const cards = [Card1.current, Card2.current, Card3.current]
        cards.map((cards, index) => {
            gsap.fromTo(
                cards,
                { x: "20%", opacity: 0 },
                {
                    x: "0%",
                    opacity: 1,
                    duration: 1.2,
                    ease: "power4.out",
                    delay: index * 0.2,
                    scrollTrigger: {
                        trigger: cards,
                        start: "top 70%",
                        toggleActions: "play none none none",
                    },
                }
            )
        })
    })

    const infomations = [
        {
            Ref: Card1,
            info: (<h1 className="font-poppins font-extrabold text-[26px] text-primary-100 group-hover:text-black">27 <span className="text-[14px]">mil</span></h1>),
            tema: "Membros"
        },
        {
            Ref: Card2,
            info: "200",
            tema: "Profissionais qualificados"
        },
        {
            Ref: Card3,
            info: "3",
            tema: "Anos de exelência"
        }
    ]


    return (
        <div className="w-full h-full items-center justify-center flex relative flex-col bg-[#1E1D1D] overflow-x-hidden"> 

        <div className="w-[95%] h-full pt-10 text-white flex flex-col">
            <div className="h-1/5 font-poppins font-semibold text-primary-100">
                <div className="h-fit relative">
                <h1 className="absolute opacity-40 -translate-y-6">Sobre nós</h1>
                <h1>Sobre nós</h1>
                <h1 className="absolute opacity-40">Sobre nós</h1>
                </div>
            </div>

            <h1 ref={Title} className="font-poppins font-extrabold text-[35px] mt-14 ">SUA JORNADA <span className="text-primary-100">FITNESS</span> COMEÇA AQUI</h1>

            <h2 ref={subTitle} className="font-albert font-medium text-[16px] mt-8 text-primary-200">Na Fit Sync, nosso objetivo é oferecer uma experiência única de treino, com <span className="block">acompanhamento personalizado e infraestrutura de qualidade. Aqui, você encontrará um</span> ambiente motivador, onde cada pessoa é apoiada para alcançar seus objetivos e <span className="block">conquistar resultados reais. Com profissionais dedicados e treinos feitos sob medida para</span> <span className="block"> você, nossa missão é transformar seu esforço em conquistas concretas.</span></h2>
        </div> 

        <div className="w-[95%] justify-between flex items-center mt-12">
            <div className="w-1/2 flex flex-col space-y-6">
                {infomations.map((item, index) => (
                    <div ref={item.Ref} key={index} className="w-full space-x-4 items-center flex">
                        <div className="rounded-full h-28 justify-center aspect-square p-2 items-center flex space-x-2 bg-[#252424] border border-white hover:bg-white hover:text-black duration-500 hover:scale-110 group">
                            <h1 className="font-poppins font-extrabold text-[25px] text-white group-hover:text-black">+</h1>
                            <h1 className="font-poppins font-extrabold text-[26px] text-primary-100 group-hover:text-black">{item.info}</h1>
                        </div>
                        <h1 className="font-poppins font-extrabold text-[24px] text-white">{item.tema}</h1>
                    </div>
                ))}
            </div>

            <div className="w-[45%] flex flex-col items-center justify-center">
                <img src={fitsync} className="-translate-y-5"/>
            </div>
        </div>

        <div draggable="true" className="w-full flex flex-col h-[30%] text-[#1E1D1D]"> 
            <h1>.</h1>
            <h1>.</h1>
            <h1>.</h1>
        </div>
        </div>
    )
}