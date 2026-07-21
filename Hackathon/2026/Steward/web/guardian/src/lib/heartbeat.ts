// The guardian's INDEPENDENT proof-of-life check — the verifying half of the trustless
// dead-man's-switch. Before a guardian will arm an InheritanceRelease it fetches the owner's
// signed heartbeat bulletin and re-verifies it HERE, on-device, then decides `is_lapsed`
// itself. It never trusts the coordinator's `state` flag: a relay with no key cannot forge a
// proof-of-life, and cannot move the owner's signed timestamp without breaking this check.
//
// THE canonical message — MUST be byte-identical to steward_core::heartbeat (Rust) and the
// owner console:
//   msg = "steward-heartbeat-v1" || vault_id (UTF-8) || unix_time (u64, 8 bytes BIG-ENDIAN)
// Proven byte-for-byte against ed25519-dalek in the task's cross-impl check.
import * as ed from '@noble/ed25519'

const DOMAIN = new TextEncoder().encode('steward-heartbeat-v1')

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

function fromHex(h: string): Uint8Array {
  const clean = h.trim()
  if (clean.length % 2 !== 0 || /[^0-9a-fA-F]/.test(clean)) throw new Error('bad hex')
  const out = new Uint8Array(clean.length / 2)
  for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16)
  return out
}

/** Verify a signed heartbeat over the canonical message — the guardian doing it ITSELF, with
 *  `@noble/ed25519` (WebCrypto SHA-512). Returns `false` on any malformed input or failure;
 *  mirrors `steward_core::heartbeat::verify_heartbeat` exactly. */
export async function verifyHeartbeat(
  pubkeyHex: string,
  vaultId: string,
  time: number,
  sigHex: string,
): Promise<boolean> {
  try {
    const pk = fromHex(pubkeyHex)
    const sig = fromHex(sigHex)
    if (pk.length !== 32 || sig.length !== 64) return false
    return await ed.verifyAsync(sig, heartbeatMessage(vaultId, time), pk)
  } catch {
    return false
  }
}

/** Whether the switch has lapsed at `now`, judged from the owner's own signed timestamp:
 *  `now > latest_time + interval + grace`. Strict `>` — exactly at the deadline is NOT yet
 *  lapsed. Mirrors `steward_core::heartbeat::is_lapsed`. */
export function isLapsed(
  latestTime: number,
  intervalSecs: number,
  graceSecs: number,
  now: number,
): boolean {
  return now > latestTime + intervalSecs + graceSecs
}
