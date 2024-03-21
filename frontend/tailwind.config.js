/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#007BFF",

          "secondary": "#F5F5F5",

          "accent": "#005cff",

          "neutral": "#333333",

          "info": "#FFC107",

          "success": "#00e958",
          
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

