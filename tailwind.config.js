/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#060a12",
          900: "#0a0f1a",
          850: "#0d1320",
          800: "#111827",
          700: "#1a2233",
          600: "#232c42",
        },
        teal: {
          glow: "#0ee6c8",
          bright: "#1ae5be",
          soft: "#22d3ee",
          deep: "#0b8f7c",
        },
        amber: {
          glow: "#f5b942",
        },
        violet: {
          glow: "#8b5cf6",
        },
      },
      fontFamily: {
        serif: ['"DM Serif Display"', '"Playfair Display"', "serif"],
        sans: ['"Plus Jakarta Sans"', '"DM Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', '"Fira Code"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        cap: "0.18em",
      },
      boxShadow: {
        glow: "0 0 60px -15px rgba(14, 230, 200, 0.35)",
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 60px -30px rgba(0,0,0,0.8)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      animation: {
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
        drift: "drift 18s linear infinite",
        reveal: "reveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      keyframes: {
        pulseSlow: {
          "0%,100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        drift: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100px)" },
        },
        reveal: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
