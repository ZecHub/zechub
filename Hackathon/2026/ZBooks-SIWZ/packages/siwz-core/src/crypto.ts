import { sha256 } from "@noble/hashes/sha256";
import { ripemd160 } from "@noble/hashes/ripemd160";
import { base58, bech32, bech32m } from "@scure/base";

export { base58, bech32, bech32m };

/** HASH160 = RIPEMD160(SHA256(x)). Used for transparent address derivation. */
export function hash160(data: Uint8Array): Uint8Array {
  return ripemd160(sha256(data));
}

/** Double SHA256. */
export function dsha256(data: Uint8Array): Uint8Array {
  return sha256(sha256(data));
}

/** Encode bytes as Base58Check (4-byte double-SHA256 checksum appended). */
export function base58checkEncode(payload: Uint8Array): string {
  const checksum = dsha256(payload).slice(0, 4);
  const out = new Uint8Array(payload.length + 4);
  out.set(payload, 0);
  out.set(checksum, payload.length);
  return base58.encode(out);
}

/** Decode a Base58Check string. Returns the payload, or throws on bad checksum. */
export function base58checkDecode(s: string): Uint8Array {
  const decoded = base58.decode(s);
  if (decoded.length < 4) throw new Error("base58check: too short");
  const payload = decoded.slice(0, decoded.length - 4);
  const checksum = decoded.slice(decoded.length - 4);
  const expected = dsha256(payload).slice(0, 4);
  for (let i = 0; i < 4; i++) {
    if (checksum[i] !== expected[i]) throw new Error("base58check: bad checksum");
  }
  return payload;
}

/** Encode a Bitcoin-style compact-size varint. */
export function encodeVarInt(n: number | bigint): Uint8Array {
  const v = typeof n === "bigint" ? n : BigInt(n);
  if (v < 0n) throw new Error("varint: negative");
  if (v < 0xfdn) return new Uint8Array([Number(v)]);
  if (v <= 0xffffn) {
    const buf = new Uint8Array(3);
    buf[0] = 0xfd;
    buf[1] = Number(v & 0xffn);
    buf[2] = Number((v >> 8n) & 0xffn);
    return buf;
  }
  if (v <= 0xffffffffn) {
    const buf = new Uint8Array(5);
    buf[0] = 0xfe;
    new DataView(buf.buffer).setUint32(1, Number(v), true);
    return buf;
  }
  const buf = new Uint8Array(9);
  buf[0] = 0xff;
  new DataView(buf.buffer).setBigUint64(1, v, true);
  return buf;
}

const ENC = new TextEncoder();

export const ZCASH_SIGNED_MESSAGE_MAGIC = "Zcash Signed Message:\n";

/**
 * Compute the Zcash signed-message hash:
 *   dsha256(varint(magic.length) || magic || varint(msg.length) || msg)
 * The Zcash-specific magic prevents cross-replay with Bitcoin signatures.
 */
export function magicHash(message: string): Uint8Array {
  const magicBytes = ENC.encode(ZCASH_SIGNED_MESSAGE_MAGIC);
  const msgBytes = ENC.encode(message);
  const magicLen = encodeVarInt(magicBytes.length);
  const msgLen = encodeVarInt(msgBytes.length);
  const total = new Uint8Array(magicLen.length + magicBytes.length + msgLen.length + msgBytes.length);
  let o = 0;
  total.set(magicLen, o); o += magicLen.length;
  total.set(magicBytes, o); o += magicBytes.length;
  total.set(msgLen, o); o += msgLen.length;
  total.set(msgBytes, o);
  return dsha256(total);
}

export function base64Decode(s: string): Uint8Array {
  if (typeof atob === "function") {
    const bin = atob(s);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }
  return new Uint8Array(Buffer.from(s, "base64"));
}

export function base64Encode(bytes: Uint8Array): string {
  if (typeof btoa === "function") {
    let bin = "";
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]!);
    return btoa(bin);
  }
  return Buffer.from(bytes).toString("base64");
}

export function bytesEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i]! ^ b[i]!;
  return diff === 0;
}
