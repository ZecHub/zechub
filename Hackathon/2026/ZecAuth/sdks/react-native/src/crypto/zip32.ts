/**
 * ZIP-32 ad-hoc ("arbitrary") hardened key derivation.
 *
 * Byte-for-byte compatible with `zip32::arbitrary::SecretKey::from_path`:
 *
 *   master:  I = BLAKE2b-512(personal="ZcashArbitraryKD",
 *                            [len(ctx)] || ctx || [len(seed)] || seed)
 *            sk = I[0..32], c = I[32..64]
 *
 *   child:   I = BLAKE2b-512(personal="Zcash_ExpandSeed",
 *                            c_par || [0xAB] || sk_par || LE32(index))
 *            sk = I[0..32], c = I[32..64]
 *
 * where every index is hardened (index = value + 2^31) and `0xAB` is the
 * `ADHOC_ZIP32_CHILD` PRF^expand domain separator.
 */
import {
  ADHOC_MKG_PERSONAL,
  PRF_EXPAND_PERSONAL,
  blake2b512Personal,
} from "./hash.js";

const HARDENED_OFFSET = 0x80000000; // 2^31
const ADHOC_CHILD_DOMAIN = 0xab;

export interface ExtendedSecretKey {
  /** 32-byte key material. */
  sk: Uint8Array;
  /** 32-byte chain code. */
  chainCode: Uint8Array;
}

function le32(n: number): Uint8Array {
  const out = new Uint8Array(4);
  out[0] = n & 0xff;
  out[1] = (n >>> 8) & 0xff;
  out[2] = (n >>> 16) & 0xff;
  out[3] = (n >>> 24) & 0xff;
  return out;
}

function split(i: Uint8Array): ExtendedSecretKey {
  return { sk: i.slice(0, 32), chainCode: i.slice(32, 64) };
}

/** Ad-hoc master key from a context string and seed. */
export function master(context: Uint8Array, seed: Uint8Array): ExtendedSecretKey {
  if (context.length < 1 || context.length > 252) {
    throw new Error("zecauth: context string must be 1..252 bytes");
  }
  if (seed.length < 32 || seed.length > 252) {
    throw new Error("zecauth: seed must be 32..252 bytes");
  }
  const i = blake2b512Personal(ADHOC_MKG_PERSONAL, [
    Uint8Array.of(context.length),
    context,
    Uint8Array.of(seed.length),
    seed,
  ]);
  return split(i);
}

/** Derive a hardened child at `index` (the raw value, hardened internally). */
export function deriveChildHardened(
  parent: ExtendedSecretKey,
  index: number,
): ExtendedSecretKey {
  const hardened = (index + HARDENED_OFFSET) >>> 0;
  const i = blake2b512Personal(PRF_EXPAND_PERSONAL, [
    parent.chainCode,
    Uint8Array.of(ADHOC_CHILD_DOMAIN),
    parent.sk,
    le32(hardened),
  ]);
  return split(i);
}

/** Derive the 32-byte ad-hoc key at `path` (each entry hardened) from `seed`. */
export function deriveAdhoc(
  context: Uint8Array,
  seed: Uint8Array,
  path: number[],
): Uint8Array {
  let xsk = master(context, seed);
  for (const index of path) xsk = deriveChildHardened(xsk, index);
  return xsk.sk;
}
