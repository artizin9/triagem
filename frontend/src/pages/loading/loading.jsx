import gsap from 'gsap'
import { useEffect, useRef } from 'react'

export function Loading() {

    const bola1 = useRef(null)
    const bola2 = useRef(null)
    const bola3 = useRef(null)

    useEffect(() => {
        const bolas = [bola1.current, bola2.current, bola3.current]
        bolas.map((bola, index) => {
            gsap.fromTo(bola, { y: 0 }, { y: '-35%', duration: 0.6, repeat: -1, yoyo: true, delay: index * -0.9, ease: 'power4.Out' })
        })
    })

    const bolas = (
        <svg width="190" height="100" viewBox="0 0 190 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_153_4)">
                <circle ref={bola1} cx="30" cy="26" r="15" fill="white" />
            </g>
            <g filter="url(#filter1_d_153_4)">
                <circle ref={bola2} cx="95" cy="26" r="15" fill="white" />
            </g>
            <g filter="url(#filter2_d_153_4)">
                <circle ref={bola3} cx="160" cy="26" r="15" fill="white" />
            </g>
            <defs>
                <filter id="filter0_d_153_4" x="0" y="0" width="60" height="60" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="7.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.113889 0 0 0 0 0.0833333 0 0 0 0.3 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_153_4" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_153_4" result="shape" />
                </filter>
                <filter id="filter1_d_153_4" x="65" y="0" width="60" height="60" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="7.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.113889 0 0 0 0 0.0833333 0 0 0 0.3 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_153_4" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_153_4" result="shape" />
                </filter>
                <filter id="filter2_d_153_4" x="130" y="0" width="60" height="60" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="7.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.113889 0 0 0 0 0.0833333 0 0 0 0.3 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_153_4" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_153_4" result="shape" />
                </filter>
            </defs>
        </svg>

    )

    return (
        <div className="w-screen h-screen flex relative justify-center flex-col items-center bg-[#131313]">
            <h1 className='font-extrabold font-poppins text-[50px] text-white absolute top-2'>Fit <span className="text-primary-100">Sync</span> </h1>
            <h1 draggable="true" className='font-extrabold font-poppins text-[50px] text-white'>CARREGANDO</h1>
            {bolas}
        </div>
    );
}