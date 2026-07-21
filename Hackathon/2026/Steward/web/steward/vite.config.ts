import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The coordinator (crates/steward-coordinator) serves the control plane + relay on
// http://127.0.0.1:8080 by default (override with STEWARD_PORT / --port). The dev
// server proxies the API surfaces to it so the unified app — both the owner side and
// the guardian side — makes same-origin requests (no CORS needed for the demo).
const COORDINATOR = process.env.STEWARD_COORDINATOR ?? 'http://127.0.0.1:8080'

export default defineConfig({
  plugins: [react()],
  // The WASM guardian core (../guardian-core/pkg) is a wasm-bindgen `--target web`
  // bundle; let Vite serve its .wasm as an asset instead of pre-bundling it.
  optimizeDeps: { exclude: ['steward-guardian-wasm'] },
  server: {
    port: 5175,
    // Allow importing the shared design tokens + the WASM core from web/ (one dir up).
    fs: { allow: ['..'] },
    proxy: {
      // Two long calls need a wide proxy window: a mainnet `sync` (~2 min dense scan) and a
      // `spend` (build + Halo2 prove + guardians co-sign + broadcast, chained — a few minutes).
      // A 10-min timeout keeps the proxy from ever severing either in flight (default sits ~2 min).
      '/demo': { target: COORDINATOR, changeOrigin: true, timeout: 600_000, proxyTimeout: 600_000 },
      '/vault': { target: COORDINATOR, changeOrigin: true, timeout: 600_000, proxyTimeout: 600_000 },
      '/session': { target: COORDINATOR, changeOrigin: true, timeout: 600_000, proxyTimeout: 600_000 },
    },
  },
})
