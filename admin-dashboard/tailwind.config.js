/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Syne", "sans-serif"],
      },
      colors: {
        bg: {
          DEFAULT: "#0d0f14",
          2: "#13161d",
          3: "#1a1e28",
        },
        border: {
          DEFAULT: "#252936",
          2: "#2e3344",
        },
        accent: {
          DEFAULT: "#6c63ff",
          2: "#4f46e5",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0, transform: "translateY(8px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
