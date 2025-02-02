/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poltawski: ['Poltawski Nowy', 'sans-serif'],
        aleo: ['Aleo', 'sans-serif']
      }, 
      colors: {
        'fundoRender': '#3F3D3D',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}

