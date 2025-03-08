import gsap from 'gsap'
import { useEffect, useRef } from 'react'

export function Loading() {

    const bola1 = useRef(null)
    const bola2 = useRef(null)
    const bola3 = useRef(null)

    useEffect(() => {
        const bolas = [bola1.current, bola2.current, bola3.current]
        bolas.map((bola, index) => {
            gsap.fromTo(bola, { y: 0 }, { y: '-35%', duration: 0.6, repeat: -1, yoyo: true, delay: index * -0.9, ease: 'power4.Out'})
        })
    })

    const bolas = (
        <svg draggable="true" width="161" height="100" viewBox="0 0 161 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle ref={bola1} cx="15" cy="15" r="15" fill='#ececec' />
            <circle ref={bola2} cx="80" cy="15" r="15" fill="#ececec"/>
            <circle ref={bola3} cx="145" cy="15" r="15" fill="#ececec"/>
        </svg>
    )

    return (
        <div className="w-screen h-screen flex relative justify-center flex-col items-center bg-[#131313]">
            <h1 draggable="true" className='font-extrabold font-poppins text-[50px] text-white'>CARREGANDO</h1>
            {bolas}
        </div>
    );
}