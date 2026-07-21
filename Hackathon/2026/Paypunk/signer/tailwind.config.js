import konstaConfig from "konsta/config";

const config = konstaConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});

// Replace the broad konsta glob with targeted paths to avoid OOM
if (Array.isArray(config.content)) {
  config.content = config.content.filter(
    (p) => !p.includes("node_modules/konsta")
  );
  config.content.push(
    "./node_modules/konsta/react/esm/components/*.js",
    "./node_modules/konsta/shared/esm/classes/*.js",
    "./node_modules/konsta/shared/esm/colors/*.js",
  );
}

export default config;
