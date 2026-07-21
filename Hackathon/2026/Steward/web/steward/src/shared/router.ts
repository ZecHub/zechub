// The unified hash router. Steward is one app with two roles — an owner (of your own
// vaults) and a guardian (of others') — so the router carries BOTH worlds:
//
//   #/                          landing (explains both roles)
//   #/owner                     My vaults (owner home — the sealed vaults this device knows)
//   #/owner/create              Seal a new vault (the 5-step wizard)
//   #/vault/:id                 a vault's home (pulse + on-chain)          [owner]
//   #/vault/:id/guardians       distribute guardian enrollment links      [owner]
//   #/vault/:id/send            send a real, quorum-signed payment        [owner]
//   #/vault/:id/release         convene a release / recovery              [owner]
//   #/guard                     Vaults I guard (enroll / unlock / watch)  [guardian]
//   #enroll=<base64url(...)>    an enrollment link → the guardian side, share prefilled
//
// The owner routes are preserved byte-for-byte from the old owner console (`#/vault/…`),
// and the `#enroll=` fragment is the *unchanged* enroll-link format the owner side emits
// and the guardian side consumes — so a link minted here opens the guardian section here.
import { useEffect, useState } from 'react'

/** Which of the two top-level sections a route belongs to (drives the nav highlight). */
export type Section = 'landing' | 'owner' | 'guard'

export type Route =
  | { name: 'landing' }
  | { name: 'owner-home' }
  | { name: 'create' }
  | { name: 'vault'; id: string }
  | { name: 'guardians'; id: string }
  | { name: 'send'; id: string }
  | { name: 'release'; id: string }
  | { name: 'guard' }

/** The section a route lives in — 'owner' for every vault/create screen, 'guard' for the
 *  guardian side, 'landing' for the door. */
export function sectionOf(route: Route): Section {
  switch (route.name) {
    case 'guard':
      return 'guard'
    case 'landing':
      return 'landing'
    default:
      return 'owner'
  }
}

export function parseHash(hash: string): Route {
  // An enrollment link is the guardian's door — the guardian section reads the share
  // straight from the fragment, so route it there regardless of the rest of the hash.
  if (/[#&]enroll=/.test(hash)) return { name: 'guard' }

  const path = hash.replace(/^#/, '')

  // Owner: a vault's own screens (unchanged from the old owner console).
  const m = path.match(/^\/vault\/([^/]+)(?:\/(release|guardians|send))?\/?$/)
  if (m) {
    const id = m[1]
    if (m[2] === 'release') return { name: 'release', id }
    if (m[2] === 'guardians') return { name: 'guardians', id }
    if (m[2] === 'send') return { name: 'send', id }
    return { name: 'vault', id }
  }

  if (path === '/owner/create') return { name: 'create' }
  if (path === '/owner' || path.startsWith('/owner/')) return { name: 'owner-home' }
  if (path === '/guard' || path.startsWith('/guard/')) return { name: 'guard' }

  return { name: 'landing' }
}

/** Subscribe to the current route; re-renders on every hashchange. */
export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))
  useEffect(() => {
    const on = () => setRoute(parseHash(window.location.hash))
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return route
}

/** Navigate by setting the hash (e.g. '#/owner', '#/vault/abc/release'). */
export function navigate(to: string): void {
  window.location.hash = to
}
