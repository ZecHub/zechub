import type { VaultStatus } from '../api/types'

/** The vault's ambient life-state, driving the whole UI's accent (see DESIGN.md):
 *  active → verdigris, waning → brass, recoverable → oxblood. */
export type Ambient = 'active' | 'waning' | 'recoverable'

/** Derive the ambient life-state from a status + a live `now` (server-aligned). A plain
 *  multisig vault has no dead-man's-switch, so it is always calmly `active`. */
export function ambientOf(s: VaultStatus, nowSecs: number): Ambient {
  if (s.state === null || s.trip_at === null || s.grace_secs === null) return 'active'
  const remaining = Math.max(0, s.trip_at - nowSecs)
  const recoverable = s.state === 'Recoverable' || remaining <= 0
  const waning = !recoverable && remaining <= s.grace_secs
  return recoverable ? 'recoverable' : waning ? 'waning' : 'active'
}

/** Format the time-to-trip: `Xd Yh` far out, `Xh Ym` closer, live `mm:ss` when near. */
export function formatCountdown(remaining: number): string {
  if (remaining <= 0) return 'LAPSED'
  const d = Math.floor(remaining / 86_400)
  const h = Math.floor((remaining % 86_400) / 3600)
  const m = Math.floor((remaining % 3600) / 60)
  const s = Math.floor(remaining % 60)
  if (d > 0) return `${d}d ${h}h`
  if (remaining >= 3600) return `${h}h ${m}m`
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

/** Middle-truncate a long address/hash for display, keeping it in the mono ledger. */
export function truncateMiddle(s: string, head = 10, tail = 8): string {
  if (s.length <= head + tail + 1) return s
  return `${s.slice(0, head)}…${s.slice(-tail)}`
}
