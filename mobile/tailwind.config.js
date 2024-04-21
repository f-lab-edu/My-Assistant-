/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#161622",
        secondary: {
          DEFAULT: "#BF3100",
          100: "#B72E00",
          200: "#AF2C00",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        plight: ["Ubuntu-Light", "sans-serif"],
        pregular: ["Ubuntu-Regular", "sans-serif"],
        pmedium: ["Ubuntu-Medium", "sans-serif"],
        pbold: ["Ubuntu-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
