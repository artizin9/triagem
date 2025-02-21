/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        albert: ['Albert Sans', 'sans-serif']
      }, 
      colors: {
        'primary-100': '#FF1D15',
        'primary-200': '#d7d7d7',
        'primary-300': '#1E1D1D',
        'primary-400': '#161616'
     },
     keyframes: {
      vibrate: {
        '0%': { transform: 'translateY(0) rotate(0deg)' },
        '25%': { transform: 'translateY(-2px) rotate(5deg)' },
        '50%': { transform: 'translateY(2px) rotate(0deg)' },
        '75%': { transform: 'translateY(-1px) rotate(-5deg)' },
        '100%': { transform: 'translateY(0) rotate(0deg)' },
      },
    },
    animation: {
      vibrate: 'vibrate 1s ease-in-out',
    },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}

