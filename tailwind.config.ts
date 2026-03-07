import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "spin-slow": "spin 8s linear infinite",
        "wave": "wave 4s ease-in-out infinite",
        "drift": "drift 12s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { filter: "drop-shadow(0 0 5px rgba(255, 185, 30, 0.5))" },
          "100%": { filter: "drop-shadow(0 0 22px rgba(255, 185, 30, 0.9))" },
        },
        wave: {
          "0%, 100%": { transform: "translateX(0) scaleY(1)" },
          "50%": { transform: "translateX(-20px) scaleY(0.95)" },
        },
        drift: {
          "0%, 100%": { transform: "translateX(0) translateY(0) rotate(0deg)" },
          "33%": { transform: "translateX(15px) translateY(-8px) rotate(5deg)" },
          "66%": { transform: "translateX(-10px) translateY(5px) rotate(-3deg)" },
        },
      },
      boxShadow: {
        "neon": "0 0 10px rgba(255, 185, 30, 0.45), 0 0 22px rgba(255, 185, 30, 0.2)",
        "neon-red": "0 0 10px rgba(220, 60, 50, 0.45), 0 0 22px rgba(220, 60, 50, 0.2)",
        "neon-ocean": "0 0 10px rgba(30, 130, 210, 0.45), 0 0 22px rgba(30, 130, 210, 0.2)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      }
    },
  },
  plugins: [],
} satisfies Config;
