/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0079ff",
        secondary: "#007cff",
        accent: "#cb0000",
        neutral: "#282b35",
        "base-100": "#fffbf4",
        info: "#00c2ff",
        success: "#00a683",
        warning: "#da3900",
        error: "#ed3f49",
      },
    },
  },
  plugins: [require('daisyui')],
}
