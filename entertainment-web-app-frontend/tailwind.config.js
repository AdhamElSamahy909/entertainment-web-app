/** @type {import('tailwindcss').Config} */
import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /bg-\[url\(.+\)\]/,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FC4747",
        secondary: "#10141E",
        display: "#5A698F",
        accent: "#161D2F",
        white: "#FFFFFF",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      fontSize: {
        32: "2rem",
        24: "1.5rem",
        18: "1.125rem",
        15: "0.9375rem",
        13: "0.8125rem",
      },
      fontWeight: {
        light: "300",
        medium: "500",
      },
      keyframes: {
        "spin-custom": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "spin-custom": "spin-custom 1s linear infinite",
      },
    },
  },
  plugins: [scrollbarHide],
};
