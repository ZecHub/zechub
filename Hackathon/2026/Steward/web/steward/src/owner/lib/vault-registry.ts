// The owner's index of vaults sealed on THIS device — what powers the "My vaults" list.
//
// It records only public, non-secret metadata (id, network, quorum, when it was sealed):
// the secret material stays where it always did — the heartbeat signing key in
// `steward.hb.<id>` (localStorage) and the seed shares in `steward.seed.<id>`
// (sessionStorage). This is a pure convenience index so the owner can find their vaults
// again; losing it loses nothing but the shortcut (the vault still lives on the
// coordinator, and its home is reachable by id).
//
// Namespaced `steward.owner.*`, apart from the guardian's `steward.guardian.*`, so one
// person can hold vaults AND guard others' on the same device without collision.

import type { Network } from '../api/types'

const KEY = 'steward.owner.vaults'

/** One entry in the owner's vault index. */
export interface VaultRecord {
  id: string
  /** The owner-chosen human name, shown as the vault's title in "My vaults" before its
   *  status loads. Optional so older records (and blank names) fall back to the id. */
  label?: string
  network: Network
  threshold: number
  n: number
  /** True if an heir address was recorded at seal time. */
  heir: boolean
  /** The use-case label chosen at seal time ("inheritance" / "treasury" / …). Optional so
   *  vaults sealed before presets still load; treated as an inheritance vault when absent. */
  purpose?: string
  /** Whether this vault has a dead-man's-switch (an inheritance vault). Optional for the same
   *  reason; absent ⇒ inheritance (the only kind that existed before presets). */
  inheritance?: boolean
  /** When this vault was sealed on this device (unix ms). */
  sealedAt: number
}

/** Load the owner's known vaults, newest first. Returns `[]` on any problem. */
export function loadVaults(): VaultRecord[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    const rows = parsed.filter(
      (v): v is VaultRecord => !!v && typeof v === 'object' && typeof (v as VaultRecord).id === 'string',
    )
    return rows.sort((a, b) => (b.sealedAt ?? 0) - (a.sealedAt ?? 0))
  } catch {
    return []
  }
}

/** Record a freshly-sealed vault (idempotent by id; a re-record refreshes its metadata). */
export function recordVault(rec: VaultRecord): void {
  try {
    const rows = loadVaults().filter((v) => v.id !== rec.id)
    rows.unshift(rec)
    localStorage.setItem(KEY, JSON.stringify(rows))
  } catch {
    // localStorage unavailable (private mode / quota) — the vault just won't appear in
    // "My vaults"; it is still reachable by id and fully functional.
  }
}

/** Drop a vault from the index (does not touch the vault on the coordinator). */
export function forgetVault(id: string): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(loadVaults().filter((v) => v.id !== id)))
  } catch {
    // ignore — see recordVault
  }
}
