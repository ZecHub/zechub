// The owner's guardian-verifiable heartbeat — the signing half of the trustless
// dead-man's-switch. The owner holds an Ed25519 heartbeat key ON THIS DEVICE (its secret in
// localStorage, keyed by vault id); each "Send heartbeat" signs a timestamped proof-of-life
// the coordinator verifies and guardians re-verify themselves.
//
// THE canonical message — MUST be byte-identical to steward_core::heartbeat (Rust) and the
// guardian app:
//   msg = "steward-heartbeat-v1" || vault_id (UTF-8) || unix_time (u64, 8 bytes BIG-ENDIAN)
// Proven byte-for-byte against ed25519-dalek in the task's cross-impl check.
import * as ed from '@noble/ed25519'

const DOMAIN = new TextEncoder().encode('steward-heartbeat-v1')
const SECRET_KEY_PREFIX = 'steward.hb.' // localStorage: one heartbeat secret per vault id

/** Build the canonical heartbeat message (see the module header). */
export function heartbeatMessage(vaultId: string, time: number): Uint8Array {
  const id = new TextEncoder().encode(vaultId)
  const msg = new Uint8Array(DOMAIN.length + id.length + 8)
  msg.set(DOMAIN, 0)
  msg.set(id, DOMAIN.length)
  // u64 BIG-ENDIAN unix time
  new DataView(msg.buffer).setBigUint64(DOMAIN.length + id.length, BigInt(time), false)
  return msg
}

function toHex(u8: Uint8Array): string {
  return Array.from(u8, (b) => b.toString(16).padStart(2, '0')).join('')
}
function fromHex(h: string): Uint8Array {
  const clean = h.trim()
  const out = new Uint8Array(clean.length / 2)
  for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16)
  return out
}

/** Generate a fresh Ed25519 heartbeat keypair. The secret is a 32-byte RFC 8032 seed —
 *  the exact representation `steward_core::heartbeat` / the CLI sign with. WebCrypto-backed. */
export async function generateHeartbeatKey(): Promise<{ secretHex: string; publicHex: string }> {
  const sk = ed.utils.randomSecretKey() // 32-byte seed, from crypto.getRandomValues
  const pk = await ed.getPublicKeyAsync(sk)
  return { secretHex: toHex(sk), publicHex: toHex(pk) }
}

/** Sign a proof-of-life `(vaultId, time)` with a hex secret seed → 64-byte signature hex. */
export async function signHeartbeat(secretHex: string, vaultId: string, time: number): Promise<string> {
  const sig = await ed.signAsync(heartbeatMessage(vaultId, time), fromHex(secretHex))
  return toHex(sig)
}

/** Persist a vault's heartbeat secret on THIS device (localStorage, keyed by vault id). The
 *  coordinator never receives it — that is what makes the owner's liveness unforgeable. */
export function storeSecret(vaultId: string, secretHex: string): void {
  try {
    localStorage.setItem(SECRET_KEY_PREFIX + vaultId, secretHex)
  } catch {
    // localStorage unavailable (private mode / quota) — heartbeats then can't be signed on
    // this device; the caller surfaces that when the owner tries to send one.
  }
}

/** Load a vault's heartbeat secret from this device, or `null` if it was never stored here. */
export function loadSecret(vaultId: string): string | null {
  try {
    return localStorage.getItem(SECRET_KEY_PREFIX + vaultId)
  } catch {
    return null
  }
}
