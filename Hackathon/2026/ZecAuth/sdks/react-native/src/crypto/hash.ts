/**
 * BLAKE2b helpers used across ZecAuth's key derivation and signatures.
 *
 * All three personalizations are exactly 16 bytes, as required by BLAKE2b's
 * personalization parameter and matched against the Rust implementations
 * (`reddsa`, `zip32`, `zcash_spec`).
 */
import { blake2b } from "@noble/hashes/blake2b";

/** RedPallas hash-to-scalar personalization (`reddsa` H*). */
export const H_STAR_PERSONAL = utf16("Zcash_RedPallasH");
/** ZIP-32 ad-hoc master key generation domain (`zip32::arbitrary`). */
export const ADHOC_MKG_PERSONAL = utf16("ZcashArbitraryKD");
/** PRF^expand personalization (`zcash_spec`). */
export const PRF_EXPAND_PERSONAL = utf16("Zcash_ExpandSeed");

function utf16(s: string): Uint8Array {
  // ASCII-only personalizations; one byte per char.
  const out = new Uint8Array(16);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i) & 0xff;
  return out;
}

/** BLAKE2b-512 with a 16-byte personalization over the concatenation of `parts`. */
export function blake2b512Personal(
  personalization: Uint8Array,
  parts: Uint8Array[],
): Uint8Array {
  const hasher = blake2b.create({ dkLen: 64, personalization });
  for (const part of parts) hasher.update(part);
  return hasher.digest();
}
