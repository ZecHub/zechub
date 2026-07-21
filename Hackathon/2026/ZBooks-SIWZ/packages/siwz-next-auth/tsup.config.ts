import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/nonce.ts", "src/memo.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  target: "es2022",
  external: ["next-auth", "next"],
});
