import { secp256k1 } from "@noble/curves/secp256k1";
import { base58checkEncode, hash160, magicHash } from "../src/index.js";

/** Derive a real mainnet t1 P2PKH address from a 32-byte private key. */
export function deriveMainnetP2pkh(privKey: Uint8Array, compressed = true): {
  privKey: Uint8Array;
  pubKey: Uint8Array;
  address: string;
} {
  const pubKey = secp256k1.getPublicKey(privKey, compressed);
  const payload = new Uint8Array(22);
  payload[0] = 0x1c;
  payload[1] = 0xb8;
  payload.set(hash160(pubKey), 2);
  return { privKey, pubKey, address: base58checkEncode(payload) };
}

export function deriveTestnetP2pkh(privKey: Uint8Array, compressed = true): {
  privKey: Uint8Array;
  pubKey: Uint8Array;
  address: string;
} {
  const pubKey = secp256k1.getPublicKey(privKey, compressed);
  const payload = new Uint8Array(22);
  payload[0] = 0x1d;
  payload[1] = 0x25;
  payload.set(hash160(pubKey), 2);
  return { privKey, pubKey, address: base58checkEncode(payload) };
}

/** Deterministic fixed private key for repeatable tests. */
export const FIXED_PRIV = new Uint8Array(32).fill(7);

/** Sign `message` per Zcash signmessage and return (base64 sig, derived t1 mainnet address). */
export function signForTest(privKey: Uint8Array, message: string, compressed = true) {
  const { address, pubKey } = deriveMainnetP2pkh(privKey, compressed);
  const hash = magicHash(message);
  const sig = secp256k1.sign(hash, privKey, { lowS: true });
  const recoveryByte = 27 + (sig.recovery ?? 0) + (compressed ? 4 : 0);
  const sigBytes = new Uint8Array(65);
  sigBytes[0] = recoveryByte;
  sigBytes.set(sig.toCompactRawBytes(), 1);
  const signatureBase64 =
    typeof btoa === "function"
      ? btoa(String.fromCharCode(...sigBytes))
      : Buffer.from(sigBytes).toString("base64");
  return { signatureBase64, address, pubKey };
}
