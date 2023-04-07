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
      },
      fontFamily: {
        sans: ["Hanken Grotesk", "sans-serif"],
        logo: ["Rozha One", "cursive"],
      },
      minHeight: {
        1: "38rem",
      },
    },
  },
  plugins: [],
};
