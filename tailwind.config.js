/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        '2xl': {'min': '1535px'},
        'xl': {'min': '1279px'},
        'lg': {'min': '1023px'},
        'md': {'min': '767px'},
        'sm': {'max': '766px'},
      },
      colors: {
        "tp-red": "#ff36367d ",
        "tp-gray": "#3e3e3e7d ",
        "tp-white": "#e0e0e07d ",
      }
    },
  },
  plugins: [],
}

