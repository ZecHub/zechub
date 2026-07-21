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
