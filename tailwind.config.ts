import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: "#080B10",
        panel: "#10151D",
        elevated: "#17202A",
        ink: "#F3F7F2",
        muted: "#93A29A",
        line: "rgba(124, 255, 178, 0.16)",
        mint: {
          300: "#B9FFD4",
          400: "#7CFFB2",
          500: "#2FE084",
          700: "#159A5C"
        },
        violet: {
          300: "#D8C7FF",
          500: "#8E7CFF"
        },
        amber: "#FFC857",
        coral: "#FF7A7A"
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      boxShadow: {
        glow: "0 0 50px rgba(124, 255, 178, 0.13)"
      }
    }
  },
  plugins: []
};

export default config;
