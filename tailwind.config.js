/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  safelist: [
    {
      pattern:
        /(text|border|bg)-(success|error|warning|info|main|card|highlight|stroke|detail|secondary|tertiary)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        main: "#f8f5f2",
        card: "#fffffe",
        stroke: "#22525",
        detail: "#818c8c",
        highlight: "#078080",
        secondary: "#f45d48",
        tertiary: "#f8f5f2",
        success: "#229941",
        error: "#e30707",
        warning: "#e36e07",
        info: "#88898a",
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
        fadeIn: "fadeIn 200ms ease-in forwards",
        fadeOut: "fadeOut 200ms ease-in forwards",
        slowFadeIn: "fadeIn 700ms ease-in forwards",
        slowFadeOut: "fadeOut 700ms ease-in forwards",
        spinner: "spinner 1.2s cubic-bezier infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "80%": { transform: "scale(1.05)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        fadeOut: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "90%": { transform: "scale(0.9)" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
