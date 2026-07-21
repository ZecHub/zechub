import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The coordinator (crates/steward-coordinator) serves the control plane + relay on
// http://127.0.0.1:8080 by default (override with STEWARD_PORT / --port). The dev
// server proxies the API surfaces to it so the console makes same-origin requests.
const COORDINATOR = process.env.STEWARD_COORDINATOR ?? 'http://127.0.0.1:8080'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    // Allow importing the shared design tokens from web/shared (one dir up).
    fs: { allow: ['..'] },
    proxy: {
      '/demo': COORDINATOR,
      '/vault': COORDINATOR,
      '/session': COORDINATOR,
    },
  },
})
