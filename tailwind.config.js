/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable dark mode based on the presence of 'dark' class
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#0079ff",
          secondary: "#007cff",
          neutral: "#ffffff",
          text: "#16181D",
          btn: "#0079ff",
          // Define other light mode colors...
        },
        dark: {
          primary: "#002f6c",
          secondary: "#006b5f",
          neutral: "#16181D",
          text: "#ffffff",
          // Define other dark mode colors...
        },
        // Define shared colors...
        accent: "#cb0000",
        info: "#00c2ff",
        success: "#00a683",
        warning: "#da3900",
        error: "#ed3f49",
      },
    },
  },
  plugins: [require("daisyui")],
};
