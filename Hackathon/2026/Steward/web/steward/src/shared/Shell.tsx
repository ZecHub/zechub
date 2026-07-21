import type { ReactNode } from 'react'

import { navigate, sectionOf, useHashRoute } from './router'
import type { Section } from './router'

/** The wordmark — always "Steward" — returns to the landing door. */
export function Wordmark() {
  return (
    <button className="wordmark" onClick={() => navigate('#/')} aria-label="Steward home">
      <span className="wordmark-name">Steward</span>
      <span className="wordmark-sub eyebrow">Instrument of Succession</span>
    </button>
  )
}

const NAV: { section: Exclude<Section, 'landing'>; label: string; to: string }[] = [
  { section: 'owner', label: 'My vaults', to: '#/owner' },
  { section: 'guard', label: 'Vaults I guard', to: '#/guard' },
]

/** The two-role switch: My vaults (owner) · Vaults I guard (guardian). The active
 *  section is derived from the live route, so it tracks both hash navigation and the
 *  guardian side's internal enroll → unlock → watch progression (all under #/guard). */
export function Nav() {
  const route = useHashRoute()
  const active = sectionOf(route)
  return (
    <nav className="nav" aria-label="Your two roles">
      {NAV.map((item) => (
        <button
          key={item.section}
          className="nav-link"
          data-active={active === item.section}
          aria-current={active === item.section ? 'page' : undefined}
          onClick={() => navigate(item.to)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}

/** The chamfered wooden frame every screen sits in: the wood-grain ground, the header
 *  (wordmark + role switch + an optional state chip), and the engraved footer. Shared by
 *  the owner screens and the guardian screens so the whole app reads as one instrument. */
export function Shell({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="shell">
      <div className="shell-grain woodgrain" aria-hidden="true" />
      <header className="shell-head">
        <div className="shell-head-lead">
          <Wordmark />
          <Nav />
        </div>
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

/** A small state chip in the ambient accent (the hearth: active → waning → recoverable). */
export function StateChip({ label, tone }: { label: string; tone?: 'active' | 'waning' | 'recoverable' }) {
  return (
    <span className="chip" data-tone={tone ?? 'active'}>
      <span className="chip-dot" />
      <span className="chip-label eyebrow">{label}</span>
    </span>
  )
}
