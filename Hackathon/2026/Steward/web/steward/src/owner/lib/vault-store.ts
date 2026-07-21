// The demo seed's guardian shares are returned once, by `POST /demo/vault`, and are
// never stored on the coordinator. So the owner console keeps them in `sessionStorage`
// (per tab, keyed by vault id) — long enough to hand each guardian their link, and to
// reopen the "Guardian links" panel from the vault home. Cleared when the tab closes.

import type { GuardianShare } from './enroll'

const KEY_PREFIX = 'steward.seed.'

/** A vault's guardian shares as captured at creation. */
export interface StoredSeed {
  vaultId: string
  guardianIds: string[]
  shares: GuardianShare[]
}

/** Parse the demo response's `shares_json` string into typed guardian entries. */
export function parseShares(sharesJson: string): GuardianShare[] {
  try {
    const parsed = JSON.parse(sharesJson) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (s): s is GuardianShare =>
        !!s && typeof s === 'object' && typeof (s as GuardianShare).guardian_id === 'string',
    )
  } catch {
    return []
  }
}

/** Persist a seed so the owner can reopen "Guardian links" for this vault. */
export function saveSeed(seed: StoredSeed): void {
  try {
    sessionStorage.setItem(KEY_PREFIX + seed.vaultId, JSON.stringify(seed))
  } catch {
    // sessionStorage unavailable (private mode / quota) — the links just won't
    // survive a reload; the create flow still shows them this once.
  }
}

/** Load a previously-captured seed, or `null` if this tab never saw it. */
export function loadSeed(vaultId: string): StoredSeed | null {
  try {
    const raw = sessionStorage.getItem(KEY_PREFIX + vaultId)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredSeed
    if (!parsed || !Array.isArray(parsed.shares)) return null
    return parsed
  } catch {
    return null
  }
}
