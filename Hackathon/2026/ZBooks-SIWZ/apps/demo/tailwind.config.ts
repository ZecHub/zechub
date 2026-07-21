import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/siwz-react/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zcash: {
          yellow: "#f4b728",
          dark: "#1a1a1a",
        },
        // A neutral palette tuned to read warm on the off-white bg.
        // Tailwind's stock neutrals are slightly cool; these are tweaked
        // by ~4% saturation toward warm grey so the UI feels less
        // institutional and more like a hand-set magazine page.
        ink: {
          50: "#fafaf8",
          100: "#f3f3ef",
          200: "#e4e3dd",
          300: "#c8c7be",
          400: "#9c9a91",
          500: "#6c6b62",
          600: "#4c4b44",
          700: "#33322d",
          800: "#1f1f1c",
          900: "#0f0f0d",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
