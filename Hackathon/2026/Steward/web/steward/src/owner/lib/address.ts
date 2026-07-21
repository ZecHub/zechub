// Prefix-only Zcash address helpers, shared by every owner screen that takes a
// destination address (the seal-a-vault heir field and the Send-a-payment recipient).
// These verify the NETWORK from the address prefix — not the checksum — so a testnet
// vault never sends to a mainnet address (or vice versa); the coordinator's PCZT build
// is the authoritative validator.

import type { Network } from '../api/types'

/** Detect a Zcash address's network from its prefix — Unified (`u1`/`utest1`), Sapling
 *  (`zs1`/`ztestsapling1`), TEX (`tex1`/`textest1`), or transparent (`t1`,`t3` / `tm`,`t2`).
 *  Prefix-only: verifies the NETWORK, not the checksum. */
export function addressNetwork(addr: string): Network | 'unknown' {
  const a = addr.trim().toLowerCase()
  if (!a) return 'unknown'
  if (a.startsWith('utest1') || a.startsWith('ztestsapling1') || a.startsWith('textest1')) return 'test'
  if (a.startsWith('u1') || a.startsWith('zs1') || a.startsWith('tex1')) return 'main'
  if (a.startsWith('tm') || a.startsWith('t2')) return 'test'
  if (a.startsWith('t1') || a.startsWith('t3')) return 'main'
  return 'unknown'
}

/** The plain word for a network id — "mainnet" / "testnet". */
export const netLabel = (n: Network): string => (n === 'main' ? 'mainnet' : 'testnet')
