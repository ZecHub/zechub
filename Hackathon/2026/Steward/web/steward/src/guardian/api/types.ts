// Wire types — mirror crates/steward-coordinator/src/http.rs exactly.

export type VaultState = 'Active' | 'Recoverable'

export type CeremonyPurpose =
  | 'NormalSpend'
  | 'SocialRecoverySweep'
  | 'InheritanceRelease'

export interface Balance {
  zatoshis: number | null
  note: string
}

/** GET /vault/:id
 *
 *  The heartbeat / dead-man's-switch fields are `null` for a **plain multisig** vault
 *  (`inheritance_enabled === false`) — a guardian may guard either kind. */
export interface VaultStatus {
  vault_id: string
  threshold: number
  guardians: string[]
  /** The free-text purpose label ("inheritance" / "treasury" / …). */
  purpose: string
  /** The owner-chosen human **name** for the vault (public config). Shown as the vault's name;
   *  the coordinator falls this back to the vault id when the owner supplied none. */
  label: string
  /** Whether this vault has a dead-man's-switch. `false` = a plain t-of-n multisig. */
  inheritance_enabled: boolean
  state: VaultState | null
  last_heartbeat: number | null
  trip_at: number | null
  interval_secs: number | null
  grace_secs: number | null
  now: number
  heir: string | null
  balance: Balance
}

/** The plain-words description a guardian reads on the approval card. */
export interface PendingDisplay {
  /** The purpose in plain words ("Release the vault to the heir", …). */
  headline: string
  /** The heir's shielded receiving address, if the vault records one. */
  heir: string | null
  /** The payee address the owner is paying, if the proposer attached one (a `NormalSpend`).
   *  Best-effort display; the `sighash` below is the authoritative commitment. */
  recipient: string | null
  /** A human amount string, if the proposer attached one. */
  amount: string | null
  /** The 32-byte sighash (hex) the guardians will authorize — what they are signing. */
  sighash: string
}

/** GET /vault/:id/pending — one open relay-mode ceremony awaiting guardians. */
export interface PendingSession {
  session_id: string
  purpose: CeremonyPurpose
  display: PendingDisplay
  invited: string[]
  approvals: number
}

/** GET /vault/:id/heartbeat — the latest signed proof-of-life bulletin, for the guardian to
 *  re-verify itself. `time`/`sig_hex` are null until the owner posts their first heartbeat. */
export interface HeartbeatBulletin {
  vault_id: string
  /** The owner's Ed25519 heartbeat public key (32-byte hex) — verify `sig_hex` against this. */
  pubkey_hex: string
  /** The owner-signed timestamp of the latest proof-of-life, or null if none yet. */
  time: number | null
  /** The Ed25519 signature (64-byte hex) over the canonical message, or null if none yet. */
  sig_hex: string | null
  /** Heartbeat interval (seconds) — public policy, for computing `is_lapsed`. */
  interval_secs: number
  /** Grace window (seconds) after a missed heartbeat. */
  grace_secs: number
}

/** POST /session/:id/recv — one drained relay message. */
export interface RecvItem {
  from: string
  msg_hex: string
}
export interface RecvResponse {
  messages: RecvItem[]
}

/** POST /session/:id/send — a relay payload to route. `to: null` = the coordinator. */
export interface SendBody {
  to: string | null
  msg_hex: string
}
