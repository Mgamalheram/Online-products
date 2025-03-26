/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  darkMode: "class",
  theme: {
    colors: {
      primary: "#3b82f6",
      border: "#ebe4e4",
      body: "#f0f0f5",
      "dark-body": "#242841",
      "box-dark": "#2f3148",
      transparent: "transparent",
      ...colors,
    },
    extend: {},
    screens: {
      sm: "576px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "992px",
      // => @media (min-width: 992px) { ... }
      xl: "1200px",
      // => @media (min-width: 1280px) { ... }
      "2xl": "1400px",
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        // sm: "1.5rem",
        // lg: "2rem",
        // xl: "3rem",
        // "2xl": "4rem",
      },
    },
  },
  plugins: [],
};
