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

/** GET /vault/:id */
export interface VaultStatus {
  vault_id: string
  threshold: number
  guardians: string[]
  state: VaultState
  last_heartbeat: number
  trip_at: number
  interval_secs: number
  grace_secs: number
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
