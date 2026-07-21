/**
 * RedPallas (RedDSA over the Pallas curve, Orchard `SpendAuthSig`) sign + verify.
 *
 * Byte-for-byte compatible with the `reddsa` crate:
 *
 *   H*(x)      = scalarFromWideLE( BLAKE2b-512(personal="Zcash_RedPallasH", x) )
 *
 *   sign(sk, msg, T):                       // T = 80 random bytes
 *     nonce = H*(T || vk || msg)
 *     R     = nonce · B,   r = encode(R)
 *     c     = H*(r || vk || msg)
 *     s     = nonce + c · sk   (mod q)
 *     sig   = r (32) || encodeScalar(s) (32)
 *
 *   verify(vk, msg, sig):
 *     c = H*(r || vk || msg)
 *     accept iff  s · B − c · vk − R == identity
 */
import { H_STAR_PERSONAL, blake2b512Personal } from "./hash.js";
import {
  BASEPOINT,
  Fq,
  add,
  decodePoint,
  decodeScalarCanonical,
  encodePoint,
  encodeScalar,
  mul,
  negate,
  scalarFromWideLE,
} from "./pallas.js";

/** RedPallas hash-to-scalar H*. */
export function hStar(parts: Uint8Array[]): bigint {
  return scalarFromWideLE(blake2b512Personal(H_STAR_PERSONAL, parts));
}

/**
 * Sign `message` with auth scalar `sk` (whose verification key encodes to `vkBytes`).
 * `randomBytes` MUST be 80 cryptographically-random bytes (matching reddsa's nonce
 * material length of (512 + 128) / 8 = 80). Returns the 64-byte signature `r || s`.
 */
export function sign(
  sk: bigint,
  vkBytes: Uint8Array,
  message: Uint8Array,
  randomBytes: Uint8Array,
): Uint8Array {
  if (randomBytes.length !== 80) {
    throw new Error("zecauth: RedPallas sign requires 80 random bytes");
  }
  const nonce = hStar([randomBytes, vkBytes, message]);
  const R = mul(nonce, BASEPOINT);
  const rBytes = encodePoint(R);
  const c = hStar([rBytes, vkBytes, message]);
  const s = Fq.add(nonce, Fq.mul(c, Fq.create(sk)));

  const sig = new Uint8Array(64);
  sig.set(rBytes, 0);
  sig.set(encodeScalar(s), 32);
  return sig;
}

/** Verify a 64-byte RedPallas signature `sig` over `message` for key `vkBytes`. */
export function verify(
  vkBytes: Uint8Array,
  message: Uint8Array,
  sig: Uint8Array,
): boolean {
  if (vkBytes.length !== 32 || sig.length !== 64) return false;

  const vk = decodePoint(vkBytes);
  if (vk === undefined) return false;

  const rBytes = sig.slice(0, 32);
  const sBytes = sig.slice(32, 64);

  const R = decodePoint(rBytes);
  if (R === undefined) return false;

  const s = decodeScalarCanonical(sBytes);
  if (s === undefined) return false;

  const c = hStar([rBytes, vkBytes, message]);

  // check = s·B − c·vk − R ; valid iff identity (Pallas is prime-order).
  const sB = mul(s, BASEPOINT);
  const cVk = mul(c, vk);
  const check = add(add(sB, negate(cVk)), negate(R));
  return check === null;
}
