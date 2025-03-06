import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import coach from "../../../assets/imgs/coach.png"
import velho from "../../../assets/imgs/velho.png"
import house from "../../../assets/imgs/house.png"

gsap.registerPlugin(ScrollTrigger)

export function Services() {
    const Card1 = useRef(null)
    const Card2 = useRef(null)
    const Card3 = useRef(null)
    const Title = useRef(null)
    const subTitle = useRef(null)

    useEffect(() => {
        const cards = [Card1.current, Card2.current, Card3.current]

        cards.forEach((card, index) => {
            gsap.fromTo(
                card,
                { y: "15%", opacity: 0 },
                {
                    y: "0%",
                    opacity: 1,
                    duration: 1.2,
                    ease: "power4.out",
                    delay: index * 0.8,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 50%",
                        toggleActions: "play none none none",
                    },
                }
            )
        })
    }, [])

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
                    delay: index * 0.2,
                    scrollTrigger: {
                        trigger: titles,
                        start: "top 70%",
                        toggleActions: "play none none none",
                    },
                }
            )
        })
    })

    const Cards = [
        {
            Ref: Card1,
            img: <img src={coach} className="w-full rounded-t-lg h-full" />,
            logo: (
                <div>
                    <h1 className="absolute opacity-20 font-poppins font-medium translate-y-1.5 pl-6 text-[13px]">
                        FIT <span className="text-primary-100">SYNC</span>
                    </h1>
                    <h1 className="font-poppins font-medium pl-6 text-[13px]">
                        FIT <span className="text-primary-100">SYNC</span>
                    </h1>
                </div>
            ),
            text1: (
                <h1 className="font-poppins font-semibold text-[16px] pl-6">
                    ACOMPANHAMENTO PERSONALIZADO<span className="block"> DE TREINO</span>
                </h1>
            ),
            text2: (
                <h1 className="font-albert font-medium text-[14px] text-[#CFCBCB] pl-6">
                    Treinos on-line e presenciais com<span className="block"> um treinador</span>
                </h1>
            )
        },
        {
            Ref: Card2,
            img: <img src={velho} className="w-full rounded-t-lg " />,
            logo: (
                <div>
                    <h1 className="absolute opacity-20 font-albert font-medium translate-y-1.5 pl-6 text-[13px]">
                        FIT <span className="text-primary-100">SYNC</span>
                    </h1>
                    <h1 className="font-albert font-medium pl-6 text-[13px]">
                        FIT <span className="text-primary-100">SYNC</span>
                    </h1>
                </div>
            ),
            text1: (
                <h1 className="font-poppins font-semibold text-[16px] pl-6">
                    TREINOS PERSONALIZADOS PARA <span className="block"> DIVERSOS GRUPOS</span>
                </h1>
            ),
            text2: (
                <h1 className="font-albert font-medium text-[14px] text-[#CFCBCB] pl-6">
                    Treinos para grupos específicos adaptados <span className="block"> às suas necessidades</span>
                </h1>
            )
        },
        {
            Ref: Card3,
            img: <img src={house} className="w-full rounded-t-lg" />,
            logo: (
                <div>
                    <h1 className="absolute opacity-20 font-albert font-medium translate-y-1.5 pl-6 text-[13px]">
                        FIT <span className="text-primary-100">SYNC</span>
                    </h1>
                    <h1 className="font-albert font-medium pl-6 text-[13px]">
                        FIT <span className="text-primary-100">SYNC</span>
                    </h1>
                </div>
            ),
            text1: (
                <h1 className="font-poppins font-semibold text-[16px] pl-6">
                    TREINAMENTO ONLINE PARA VOCÊ <span className="block"> FAZER EM QUALQUER LUGAR</span>
                </h1>
            ),
            text2: (
                <h1 className="font-albert font-medium text-[14px] text-[#CFCBCB] pl-6">
                    Treinos online para você <span className="block">com flexibilidade e resultados garantidos</span>
                </h1>
            )
        },
    ]

    return (
        <div className="w-full h-full items-center justify-center flex relative flex-col bg-[#272626] overflow-x-hidden">
            <div className="w-[95%] h-full pt-10 text-white flex flex-col">
                <div className="h-1/5 font-poppins font-semibold text-primary-100">
                    <div className="h-fit relative">
                        <h1 className="absolute opacity-40 -translate-y-6">Serviços</h1>
                        <h1>Serviços</h1>
                        <h1 className="absolute opacity-40">Serviços</h1>
                    </div>
                </div>

                <h1 ref={Title} className="font-poppins font-extrabold text-[35px] mt-16 ">
                    EXPLORE NOSSOS <span className="text-primary-100">SERVIÇOS</span> E DESCUBRA A
                    <span className="block">DIFERENÇA QUE PODEMOS FAZER POR <span className="text-primary-100">VOCÊ!</span></span>
                </h1>

                <h2 ref={subTitle} className="font-albert font-medium text-[16px] mt-10 text-primary-200">
                    Na Fit Sync, oferecemos mais do que um treino: proporcionamos uma experiência de bem-estar
                    <span className="block">com treinos personalizados e profissionais qualificados, em um ambiente motivador para</span>
                    alcançar seus objetivos e resultados reais.
                </h2>
            </div>

            <div className="w-full mt-10 text-white flex justify-around">
                {Cards.map((item, index) => (
                    <div ref={item.Ref} key={index} className="bg-[#1E1D1D] flex justify-center items-center flex-col rounded-lg w-[28%]">
                        {item.img}
                        <div className="w-full p-2 pt-4 justify-center flex flex-col space-y-2">
                            {item.logo}
                            {item.text1}
                            {item.text2}
                        </div>
                    </div>
                ))}
            </div>

            <div draggable="true" className="w-full flex flex-col h-[30%] text-[#272626]">
                <h1>.</h1>
                <h1>.</h1>
                <h1>.</h1>
            </div>
        </div>
    )
}
