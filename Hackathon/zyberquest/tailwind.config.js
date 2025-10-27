/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zx: {
          green: "#00FF9C",
          cyan: "#00E5FF",
          magenta: "#FF3DBE",
          ink: "#0A0D0A",
          black: "#000000",
          mid: "#0E1A16",
          grid: "rgba(0,255,156,0.08)",
        },
      },
    },
  },
  plugins: [],
};
