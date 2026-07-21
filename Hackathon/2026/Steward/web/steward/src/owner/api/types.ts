// Wire types — mirror crates/steward-coordinator/src/http.rs exactly.

export type VaultState = 'Active' | 'Recoverable'

/** The vault's chain network. `test` is the safe default; `main` moves real ZEC. */
export type Network = 'test' | 'main'

export type CeremonyPurpose =
  | 'NormalSpend'
  | 'SocialRecoverySweep'
  | 'InheritanceRelease'

export interface Balance {
  /** The last-synced total in zatoshis (POST /vault/:id/sync), or null if never synced. */
  zatoshis: number | null
  note: string
}

/** GET /vault/:id
 *
 *  The heartbeat / dead-man's-switch fields (`state`, `last_heartbeat`, `trip_at`,
 *  `interval_secs`, `grace_secs`) are only meaningful for an **inheritance** vault and are
 *  `null` for a **plain multisig** vault (`inheritance_enabled === false`). */
export interface VaultStatus {
  vault_id: string
  /** The vault's human name (the owner-chosen `label`); the coordinator falls back to the
   *  vault id when no name was given, so this is always non-empty. */
  label: string
  threshold: number
  guardians: string[]
  /** The free-text purpose label ("inheritance" / "treasury" / "family" / "personal" / "custom"). */
  purpose: string
  /** Whether this vault has a dead-man's-switch. `false` = a plain t-of-n multisig. */
  inheritance_enabled: boolean
  state: VaultState | null
  last_heartbeat: number | null
  trip_at: number | null
  interval_secs: number | null
  grace_secs: number | null
  now: number
  heir: string | null
  /** The FROST group verifying key (Orchard `ak`), 32-byte hex. */
  group_ak_hex: string
  /** The chain the vault lives on. */
  network: Network
  /** The vault's derived on-chain Unified Address (`utest1…` / `u1…`), or null if the
   *  signer binary is unavailable. */
  receiving_address: string | null
  balance: Balance
}

/** POST /vault/:id/sync — a real network scan of the vault's UFVK (testnet ~7–15s; mainnet ~1.5–2 min). */
export interface VaultSyncResponse {
  network: Network
  /** Whether the wallet is fully scanned to the chain tip. */
  synced: boolean
  /** The endpoint chain-tip height at scan time. */
  tip_height: number
  /** Total value across all pools (incl. pending), zatoshis. */
  total_zat: number
  /** Orchard-pool total, zatoshis. */
  orchard_zat: number
  /** Immediately-spendable value, zatoshis. */
  spendable_zat: number
}

/** POST /demo/vault
 *
 *  For an **inheritance** vault, send `interval_secs` + `grace_secs` (+ optional `heir` and
 *  `heartbeat_pubkey`). For a **plain multisig** vault, omit them all — the coordinator creates
 *  a t-of-n vault with the dead-man's-switch turned OFF. */
export interface DemoVaultRequest {
  threshold: number
  n: number
  guardian_names: string[]
  /** Heartbeat cadence (seconds). Omit (with `grace_secs`) for a plain multisig vault. */
  interval_secs?: number
  /** Grace window (seconds). Omit (with `interval_secs`) for a plain multisig vault. */
  grace_secs?: number
  heir?: string
  /** The chain to create the vault on. Optional; the coordinator defaults to `test`. */
  network?: Network
  /** The owner's Ed25519 heartbeat public key (32-byte hex), inheritance vaults only. The console
   *  generates the keypair client-side and sends only the PUBLIC key — the coordinator never sees
   *  the secret. */
  heartbeat_pubkey?: string
  /** A free-text purpose label ("inheritance" / "treasury" / …), for display + the kind badge. */
  purpose?: string
  /** The owner-chosen human NAME for the vault. Optional; the coordinator falls back to the
   *  vault id when empty. */
  label?: string
}
export interface DemoVaultResponse {
  vault_id: string
  guardian_ids: string[]
  shares_json: string
  /** Present only when no `heartbeat_pubkey` was supplied (a demo convenience the console
   *  does not use — it always supplies its own pubkey, so this is `undefined`). */
  heartbeat_secret_hex?: string
}

/** POST /vault/:id/heartbeat — a SIGNED proof-of-life over the canonical message. */
export interface HeartbeatBody {
  time: number
  sig_hex: string
}

/** POST /vault/:id/heartbeat response. */
export interface HeartbeatResponse {
  vault_id: string
  last_heartbeat: number
  trip_at: number
  state: VaultState
}

/** How a proposed ceremony is co-signed.
 *  - `auto`  — coordinator drives the demo vault's shares in-process (solo demo).
 *  - `relay` — the coordinator waits for real remote guardians on the HTTP relay. */
export type SessionMode = 'auto' | 'relay'

/** POST /vault/:id/session */
export interface SessionRequest {
  purpose: CeremonyPurpose
  sighash_hex: string
  randomizer_hex: string
  session_id?: string
  participants?: string[]
  timeout_ms?: number
  /** Defaults to `auto` server-side when omitted. */
  mode?: SessionMode
  /** Display-only human amount for the guardians' approval card (relay mode). */
  amount?: string
}
export interface SessionResponse {
  session_id: string
  signature_hex: string
}

/** The plain-words description a guardian reads on the approval card. */
export interface PendingDisplay {
  headline: string
  heir: string | null
  amount: string | null
  /** The 32-byte sighash (hex) the guardians authorize. */
  sighash: string
}

/** GET /vault/:id/pending — one open relay-mode ceremony awaiting guardians. */
export interface PendingSession {
  session_id: string
  purpose: CeremonyPurpose
  display: PendingDisplay
  invited: string[]
  /** How many invited guardians have committed so far (best-effort, for the seal). */
  approvals: number
}

/** POST /vault/:id/spend — a REAL, app-driven payment. The coordinator builds a transaction
 *  to `to` for `amount_zat` ZATOSHIS, has the guardians co-sign the real sighash, broadcasts,
 *  and returns the txid. A LONG request (~1–2 min on mainnet: build + prove + co-sign +
 *  broadcast). Errors: 422 = insufficient funds / not synced; 502 = signer missing. */
export interface SpendRequest {
  /** Recipient unified/shielded address, on the vault's network. */
  to: string
  /** Amount to send in ZATOSHIS (integer). The network fee is added on top by the signer. */
  amount_zat: number
  /** Co-signing transport: `relay` (real remote guardians, the default) or `auto` (the
   *  coordinator's in-process demo shares, for a solo/demo vault). Omit for the real path. */
  mode?: 'relay' | 'auto'
}
/** POST /vault/:id/spend response. */
export interface SpendResponse {
  /** The broadcast transaction id (hex) — view it on a Zcash explorer. */
  txid: string
}
