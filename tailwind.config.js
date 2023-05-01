/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        main: "#f8f5f2",
        card: "#fffffe",
        stroke: "#232323",
        detail: "#222525",
        highlight: "#078080",
        secondary: "#f45d48",
        tertiary: "#f8f5f2",
        success: "#71FB63"
      },
      fontFamily: {
        sans: ["Hanken Grotesk", "sans-serif"],
        logo: ["Rozha One", "cursive"],
      },
      minHeight: {
        1: "38rem",
      },
      width: {
        128: "38rem",
      },
      animation: {
        'fadeIn': 'fadeIn 200ms ease-in forwards',
        'fadeOut': 'fadeOut 200ms ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: "scale(0.9)" },
          '80%': {transform: 'scale(1.05)'},
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: "scale(1)" },
          '90%': {transform: 'scale(0.9)'},
          '100%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
};
