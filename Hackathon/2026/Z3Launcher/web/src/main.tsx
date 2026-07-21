import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './theme' // applies persisted dark/light theme before first paint
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
