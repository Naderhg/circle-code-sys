import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1976d2",
        secondary: "#4a89dc",
        accent: "#e8f0fe",
        destructive: "#ef4444",
        ring: "#1976d2",
        background: "#fff",
        foreground: "#333",
      }
    },
  },
  plugins: [tailwindcssAnimate],
};
