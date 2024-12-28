/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Footer: '#243642',
        Buttons: '#FFD700',
        AddCam:'#387478',
        Card:'#C08261',
        together:'#F7C566',
        AllCard:'#79D7BE',
        Profile:'#1E90FF',
        BG:'#20B2AA',
        bgrecent1:"#5ee7df",
        bgrecent2:"#b490ca",
        bgMain1:"#2af598",
        bgMain2:"#009efd",
        bgButton1:"#f6d365",
        bgButton2:"#fda085",
        footerBg1:"#4facfe",
        footerBg2:"#00f2fe",

     
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark', 'synthwave'], 
  },
}
