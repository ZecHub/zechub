// The on-device crypto core. Drives the wasm-bindgen guardian (web/guardian-core/pkg):
// argon2id keystore + re-randomized FROST rounds. The secret share is decrypted into
// a `Guardian` handle that keeps the KeyPackage INSIDE wasm memory — never returned
// to JS. TypeScript here only moves opaque hex (`handleRelayMessage`); it never parses
// FROST.
import init, { open_guardian, seal_share } from 'steward-guardian-wasm'
import type { Guardian } from 'steward-guardian-wasm'

/** The instruction `Guardian.handleRelayMessage` returns: the browser just moves
 *  bytes. If `action === 'send'`, POST `{ to, msg_hex }` to `/session/{id}/send`. */
export interface RelayAction {
  action: 'send' | 'none'
  to: string | null
  msg_hex: string | null
  done: boolean
  kind: 'round1' | 'round2' | 'adjourn'
}

let ready: Promise<unknown> | null = null

/** Load + instantiate the wasm module once (idempotent). */
export function initWasm(): Promise<unknown> {
  if (!ready) ready = init()
  return ready
}

/** Seal a guardian's secret share (its `SecretShare` JSON) under a passphrase into a
 *  self-describing encrypted-at-rest blob. A malformed share is rejected here. */
export async function sealShare(secretShareJson: string, passphrase: string): Promise<string> {
  await initWasm()
  return seal_share(secretShareJson, passphrase)
}

/** Open a sealed blob into a live `Guardian` handle. argon2id is deliberately slow
 *  (~seconds); a wrong passphrase (or tampered blob) throws a clean `Error`. */
export async function openGuardian(sealedBlob: string, passphrase: string): Promise<Guardian> {
  await initWasm()
  return open_guardian(sealedBlob, passphrase)
}

export type { Guardian }
