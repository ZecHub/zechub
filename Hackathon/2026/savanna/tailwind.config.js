export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "system-ui", "sans-serif"],
        mono: ["Roboto Mono", "ui-monospace", "monospace"],
      },
      colors: {
        zcash: "#4b8b3b",
        ink: "#0d1117",
      },
    },
  },
  plugins: [],
};