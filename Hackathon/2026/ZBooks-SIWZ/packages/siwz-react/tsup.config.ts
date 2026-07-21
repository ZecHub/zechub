import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  target: "es2022",
  external: ["react", "react-dom"],
  // Mark the styles import as external so bundlers can resolve it via
  // the consumer's CSS pipeline rather than inlining it.
  loader: { ".css": "empty" },
});
