/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "green-primary": "#2D5016",
        "green-dark": "#1E3A0E",
        "green-light": "#3D6B1E",
        gold: "#C4943B",
        "gold-light": "#D4A94E",
        cream: "#FAF8F3",
        "cream-dark": "#F0EDE5",
      },
      fontFamily: {
        serif: ["Merriweather", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
