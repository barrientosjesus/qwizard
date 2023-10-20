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
    themes: [
      {
        qwizard: {
          "primary": "#9333ea",
          "secondary": "#60a5fa",
          "accent": "#f0abfc",
          "neutral": "#021431",
          "base-100": "#ffffff",
          "info": "#93e6fb",
          "success": "#34d399",
          "warning": "#fde047",
          "error": "#f87171",
        },
      },
      'winter',
      "night",
    ],
    darkTheme: "night",
    base: true,
    styled: true,
    utils: true,
    rtl: false,
    prefix: "",
    logs: true,
  },
}

