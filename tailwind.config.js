/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F7F6F2",
        surface: "#FFFFFF",
        foreground: "#2B2B2B",

        primary: "#2D5A27",
        "primary-foreground": "#F7F6F2",

        secondary: "#8B5E34",
        "secondary-foreground": "#FFFFFF",

        muted: "#D8E2DC",
        "muted-foreground": "#4A4A4A",

        border: "#D6C7B5",
        ring: "#2D5A27",

        danger: "#B91C1C",
        "danger-foreground": "#FFFFFF",
      },
      fontFamily: {
        serif: ["Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "12px",
        xl: "18px",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
