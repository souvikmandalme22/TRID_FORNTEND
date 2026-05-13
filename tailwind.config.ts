import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1A1A1A",
        surface: "#242424",
        "surface-2": "#2E2E2E",
        accent: "#3A86FF",
        "accent-hover": "#5B9EFF",
        "accent-glow": "rgba(58,134,255,0.35)",
        "steel-blue": "#4A6FA5",
        "soft-gray": "#9CA3AF",
        "text-primary": "#F5F5F7",
        "text-secondary": "#A1A1AA",
        "text-muted": "#52525B",
        border: "rgba(255,255,255,0.08)",
        "border-strong": "rgba(255,255,255,0.15)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        "accent-glow": "0 0 24px rgba(58,134,255,0.4)",
        "card": "0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.5), 0 16px 40px rgba(0,0,0,0.4)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease forwards",
        "slide-up": "slideUp 0.6s ease forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
