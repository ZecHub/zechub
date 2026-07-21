import type { ReactNode } from 'react'

import { navigate } from '../lib/hooks'

export function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <button className="wordmark" onClick={onClick ?? (() => navigate('#/'))} aria-label="Steward home">
      <span className="wordmark-name">Steward</span>
      <span className="wordmark-sub eyebrow">Instrument of Succession</span>
    </button>
  )
}

export function Shell({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="shell">
      <div className="shell-grain woodgrain" aria-hidden="true" />
      <header className="shell-head">
        <Wordmark />
        {aside}
      </header>
      <main className="shell-main">{children}</main>
      <footer className="shell-foot">
        <span className="eyebrow">Zcash · Orchard · FROST t-of-n</span>
        <span className="eyebrow">shielded threshold custody</span>
      </footer>
    </div>
  )
}

/** A small state chip in the ambient accent. */
export function StateChip({ label, tone }: { label: string; tone?: 'active' | 'waning' | 'recoverable' }) {
  return (
    <span className="chip" data-tone={tone ?? 'active'}>
      <span className="chip-dot" />
      <span className="chip-label eyebrow">{label}</span>
    </span>
  )
}
