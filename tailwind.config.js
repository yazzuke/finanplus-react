  const { nextui } = require("@nextui-org/react");

  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
             primary: '#BFBFBF',
          'gray-fijos': '#1B1B1C',
          'gray-credito': '#202021',
          'gray-diarios': '#19191A ',
          'gray-variables': '#2B2B2D  '
        },
        fontFamily: {
          'varela': ['Varela Round', 'sans-serif'], 
        },
      },
    },
    darkMode: "class",
    plugins: [nextui()]
  }