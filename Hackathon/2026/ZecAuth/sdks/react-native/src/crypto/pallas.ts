/**
 * Pallas curve + field arithmetic for ZecAuth's RedPallas signatures.
 *
 * Byte-for-byte compatible with the Rust `pasta_curves` + `reddsa` stack used by
 * `zecauth-core`. We build on `@noble/curves`'s audited modular field (for inversion
 * and Tonelli–Shanks square roots) and implement the small amount of group law and
 * the Pasta point/scalar encodings ourselves, because Pasta's serialization
 * (little-endian x with the y-parity in the top bit) differs from noble's default SEC1.
 *
 * Pallas: y² = x³ + 5 over F_p, prime order group (cofactor 1).
 *   p (base field  / coordinates) = 0x40…30ed00000001
 *   q (scalar field / group order) = 0x40…eb2100000001
 */
import { Field } from "@noble/curves/abstract/modular";
import { bytesToNumberLE, numberToBytesLE } from "@noble/curves/abstract/utils";

/** Pallas base field modulus (coordinate field, F_p). */
export const P =
  0x40000000000000000000000000000000224698fc094cf91b992d30ed00000001n;

/** Pallas scalar field modulus = group order (F_q). */
export const Q =
  0x40000000000000000000000000000000224698fc0994a8dd8c46eb2100000001n;

/** Coordinate field F_p (provides inv + sqrt via Tonelli–Shanks). */
export const Fp = Field(P);
/** Scalar field F_q. */
export const Fq = Field(Q);

/** Curve coefficient b (a = 0). */
const B = 5n;

/** An affine point, or `null` for the identity (point at infinity). */
export type Point = { x: bigint; y: bigint } | null;

/** The identity element. */
export const IDENTITY: Point = null;

function mod(a: bigint, m: bigint): bigint {
  const r = a % m;
  return r >= 0n ? r : r + m;
}

/** Point addition on Pallas (affine, complete handling of identity / doubling). */
export function add(p: Point, q: Point): Point {
  if (p === null) return q;
  if (q === null) return p;
  if (p.x === q.x) {
    if (mod(p.y + q.y, P) === 0n) return null; // p == -q
    return double(p); // p == q
  }
  // slope = (q.y - p.y) / (q.x - p.x)
  const slope = Fp.mul(Fp.sub(q.y, p.y), Fp.inv(Fp.sub(q.x, p.x)));
  const x = Fp.sub(Fp.sub(Fp.mul(slope, slope), p.x), q.x);
  const y = Fp.sub(Fp.mul(slope, Fp.sub(p.x, x)), p.y);
  return { x, y };
}

/** Point negation: (x, y) -> (x, -y). */
export function negate(p: Point): Point {
  if (p === null) return null;
  return { x: p.x, y: p.y === 0n ? 0n : P - p.y };
}

/** Point doubling. */
export function double(p: Point): Point {
  if (p === null) return null;
  if (p.y === 0n) return null;
  // slope = (3x²) / (2y)   (a = 0)
  const num = Fp.mul(3n, Fp.mul(p.x, p.x));
  const slope = Fp.mul(num, Fp.inv(Fp.mul(2n, p.y)));
  const x = Fp.sub(Fp.mul(slope, slope), Fp.mul(2n, p.x));
  const y = Fp.sub(Fp.mul(slope, Fp.sub(p.x, x)), p.y);
  return { x, y };
}

// ── Fast scalar multiplication via Jacobian coordinates ──────────────────────
// Affine add/double above do one field inversion each, which makes a full scalar
// multiplication hundreds of milliseconds. For `mul` we use Jacobian coordinates
// (X : Y : Z) with x = X/Z², y = Y/Z³ and identity Z = 0, performing a single
// inversion at the end to return to affine. Formulas: dbl-2009-l, add-2007-bl.

type Jac = { X: bigint; Y: bigint; Z: bigint };

function fpm(a: bigint): bigint {
  const r = a % P;
  return r >= 0n ? r : r + P;
}

function jacDouble(p: Jac): Jac {
  if (p.Z === 0n || p.Y === 0n) return { X: 0n, Y: 1n, Z: 0n };
  const A = fpm(p.X * p.X);
  const B = fpm(p.Y * p.Y);
  const C = fpm(B * B);
  let D = fpm(p.X + B);
  D = fpm(2n * (fpm(D * D) - A - C));
  const E = fpm(3n * A);
  const F = fpm(E * E);
  const X3 = fpm(F - 2n * D);
  const Y3 = fpm(E * (D - X3) - 8n * C);
  const Z3 = fpm(2n * p.Y * p.Z);
  return { X: X3, Y: Y3, Z: Z3 };
}

function jacAdd(p: Jac, q: Jac): Jac {
  if (p.Z === 0n) return q;
  if (q.Z === 0n) return p;
  const Z1Z1 = fpm(p.Z * p.Z);
  const Z2Z2 = fpm(q.Z * q.Z);
  const U1 = fpm(p.X * Z2Z2);
  const U2 = fpm(q.X * Z1Z1);
  const S1 = fpm(p.Y * q.Z * Z2Z2);
  const S2 = fpm(q.Y * p.Z * Z1Z1);
  const H = fpm(U2 - U1);
  const r = fpm(2n * (S2 - S1));
  if (H === 0n) {
    if (r === 0n) return jacDouble(p);
    return { X: 0n, Y: 1n, Z: 0n }; // opposite points → identity
  }
  const I = fpm(fpm(2n * H) * fpm(2n * H));
  const J = fpm(H * I);
  const V = fpm(U1 * I);
  const X3 = fpm(r * r - J - 2n * V);
  const Y3 = fpm(r * (V - X3) - 2n * S1 * J);
  const Z3 = fpm((fpm(p.Z + q.Z) ** 2n - Z1Z1 - Z2Z2) * H);
  return { X: X3, Y: Y3, Z: Z3 };
}

function jacToAffine(p: Jac): Point {
  if (p.Z === 0n) return null;
  const zInv = Fp.inv(p.Z);
  const zInv2 = Fp.mul(zInv, zInv);
  const zInv3 = Fp.mul(zInv2, zInv);
  return { x: Fp.mul(p.X, zInv2), y: Fp.mul(p.Y, zInv3) };
}

/** Scalar multiplication `k · P` (k reduced mod q), via Jacobian double-and-add. */
export function mul(k: bigint, p: Point): Point {
  let n = mod(k, Q);
  if (n === 0n || p === null) return null;
  let result: Jac = { X: 0n, Y: 1n, Z: 0n };
  let addend: Jac = { X: p.x, Y: p.y, Z: 1n };
  while (n > 0n) {
    if (n & 1n) result = jacAdd(result, addend);
    addend = jacDouble(addend);
    n >>= 1n;
  }
  return jacToAffine(result);
}

/** Whether `(x, y)` satisfies the curve equation. */
function onCurve(x: bigint, y: bigint): boolean {
  // y² == x³ + 5
  return Fp.mul(y, y) === Fp.add(Fp.mul(Fp.mul(x, x), x), B);
}

/**
 * Encode a point to the 32-byte Pasta representation:
 * little-endian x with the LSB of y stored in the top bit of byte 31.
 * The identity encodes as all-zero bytes. Matches `pasta_curves`' `to_bytes`.
 */
export function encodePoint(p: Point): Uint8Array {
  if (p === null) return new Uint8Array(32);
  const out = numberToBytesLE(p.x, 32);
  const ySign = Number(p.y & 1n) << 7;
  out[31] = (out[31] as number) | ySign;
  return out;
}

/**
 * Decode a 32-byte Pasta point. Returns `null` (identity) for all-zero input or
 * `undefined` if the bytes are not a canonical on-curve encoding.
 * Matches `pasta_curves`' `from_bytes` (including the canonical x < p check).
 */
export function decodePoint(bytes: Uint8Array): Point | undefined {
  if (bytes.length !== 32) return undefined;
  const tmp = bytes.slice();
  const ySign = ((tmp[31] as number) >> 7) & 1;
  tmp[31] = (tmp[31] as number) & 0x7f;
  const x = bytesToNumberLE(tmp);
  if (x >= P) return undefined; // non-canonical x
  if (x === 0n && ySign === 0) return null; // identity
  // y² = x³ + 5
  const y2 = Fp.add(Fp.mul(Fp.mul(x, x), x), B);
  let y: bigint;
  try {
    y = Fp.sqrt(y2);
  } catch {
    return undefined; // not a quadratic residue → not on curve
  }
  // Choose the root whose parity matches the sign bit.
  if ((Number(y & 1n) & 1) !== ySign) y = Fp.neg(y);
  if (!onCurve(x, y)) return undefined;
  return { x, y };
}

/**
 * The Orchard `SpendAuthSig` basepoint, as used by RedPallas. This is the 32-byte
 * compressed encoding from `reddsa` (reproducible by
 * `pallas::Point::hash_to_curve("z.cash:Orchard")(b"G")`).
 */
export const BASEPOINT_BYTES = Uint8Array.from([
  99, 201, 117, 184, 132, 114, 26, 141, 12, 161, 112, 123, 227, 12, 127, 12, 95,
  68, 95, 62, 124, 24, 141, 59, 6, 214, 241, 40, 179, 35, 85, 183,
]);

/** The decoded RedPallas basepoint `B`. */
export const BASEPOINT: Point = (() => {
  const pt = decodePoint(BASEPOINT_BYTES);
  if (!pt) throw new Error("zecauth: failed to decode RedPallas basepoint");
  return pt;
})();

/** Reduce 64 little-endian bytes into a scalar mod q (matches `from_uniform_bytes`). */
export function scalarFromWideLE(bytes: Uint8Array): bigint {
  if (bytes.length !== 64) throw new Error("scalarFromWideLE expects 64 bytes");
  return mod(bytesToNumberLE(bytes), Q);
}

/** Encode a scalar as 32 little-endian bytes (`to_repr`). */
export function encodeScalar(s: bigint): Uint8Array {
  return numberToBytesLE(mod(s, Q), 32);
}

/**
 * Decode a canonical 32-byte little-endian scalar (`from_repr`). Returns `undefined`
 * if the value is ≥ q (non-canonical), matching the strict check in `reddsa::verify`.
 */
export function decodeScalarCanonical(bytes: Uint8Array): bigint | undefined {
  if (bytes.length !== 32) return undefined;
  const s = bytesToNumberLE(bytes);
  if (s >= Q) return undefined;
  return s;
}
