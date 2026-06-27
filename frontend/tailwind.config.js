/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Clash Display'", "'Syne'", "sans-serif"],
        body:    ["'DM Sans'", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        ink:    "#080a0f",
        void:   "#0c0e15",
        panel:  "#10131c",
        card:   "#141720",
        rim:    "#1e2235",
        rim2:   "#262b40",
        muted:  "#3d4460",
        faint:  "#8892b0",
        soft:   "#ccd6f6",
        bright: "#e8eaf6",
        accent: "#6366f1",
        glow:   "#818cf8",
        teal:   "#2dd4bf",
        rose:   "#fb7185",
        amber:  "#fbbf24",
        emerald:"#34d399",
      },
      animation: {
        "fade-up":    "fadeUp 0.6s ease forwards",
        "fade-in":    "fadeIn 0.4s ease forwards",
        "slide-in":   "slideIn 0.5s ease forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "float":      "float 6s ease-in-out infinite",
        "marquee":    "marquee 30s linear infinite",
      },
      keyframes: {
        fadeUp:    { from: { opacity: 0, transform: "translateY(30px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        fadeIn:    { from: { opacity: 0 }, to: { opacity: 1 } },
        slideIn:   { from: { opacity: 0, transform: "translateX(-20px)" }, to: { opacity: 1, transform: "translateX(0)" } },
        glowPulse: { "0%,100%": { opacity: 0.4 }, "50%": { opacity: 0.8 } },
        float:     { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        marquee:   { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        "grid": "40px 40px",
      },
    },
  },
  plugins: [],
};
