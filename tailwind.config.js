// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#b8912a",
        "gold-soft": "rgba(184,145,42,0.15)",
      },
    },
  },
  plugins: [],
};
