import { defineConfig } from "vite";

export default defineConfig({
  clearScreen: false,
  server: {
    port: 1421,
    strictPort: true,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  define: {
    "globalThis.Buffer": "Buffer",
  },
  resolve: {
    alias: {
      buffer: "buffer/",
    },
  },
});
