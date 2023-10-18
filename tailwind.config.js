/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require("daisyui")
  ],
  daisyui: {
    themes: ['winter', "night"],
    darkTheme: "night",
    base: true,
    styled: true,
    utils: true,
    rtl: false,
    prefix: "",
    logs: true, 
  },
}

