import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The coordinator (crates/steward-coordinator) serves the control plane + relay on
// http://127.0.0.1:8080 by default (override with STEWARD_PORT / --port). The dev
// server proxies the API surfaces to it so a guardian enrolled at the same origin
// ('' coordinator) makes same-origin requests — no CORS needed for the demo.
const COORDINATOR = process.env.STEWARD_COORDINATOR ?? 'http://127.0.0.1:8080'

export default defineConfig({
  plugins: [react()],
  // The WASM guardian core (../guardian-core/pkg) is a wasm-bindgen `--target web`
  // bundle; let Vite serve its .wasm as an asset instead of pre-bundling it.
  optimizeDeps: { exclude: ['steward-guardian-wasm'] },
  server: {
    port: 5176,
    // Allow importing the shared design tokens from web/shared (one dir up).
    fs: { allow: ['..'] },
    proxy: {
      '/vault': COORDINATOR,
      '/session': COORDINATOR,
      '/demo': COORDINATOR,
    },
  },
})
