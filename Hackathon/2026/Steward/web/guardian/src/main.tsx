// SUPERSEDED — this standalone guardian app is now the "Vaults I guard" section of the unified
// Steward app (web/steward). Kept for reference; scripts/dev.sh no longer starts it. See docs/DEMO.md.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './fonts'
import '../../shared/tokens.css' // single source of truth — see web/DESIGN.md
import './styles/app.css'
import { App } from './App'

const root = document.getElementById('root')
if (!root) throw new Error('missing #root')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
