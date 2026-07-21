/**
 * ZecAuth authentication-key derivation — the high-level crypto entry point.
 *
 * Derives a dedicated auth keypair from a wallet seed at the ZIP-32 ad-hoc path
 *   m / 616' / coin_type' / account'
 * with context string "ZcashZecauthAuth" (global) or "ZcashZecauthAuth:<domain>"
 * (domain-scoped, for unlinkable per-dApp identities). Byte-for-byte compatible with
 * `zecauth-core::AuthKeyPair::{from_seed, from_seed_for_domain}`.
 */
import { bytesToHex } from "@noble/curves/abstract/utils";
import { chacha20FirstBlock } from "./chacha.js";
import { BASEPOINT, encodePoint, encodeScalar, mul, scalarFromWideLE } from "./pallas.js";
import { sign as redpallasSign } from "./redpallas.js";
import { deriveAdhoc } from "./zip32.js";

export type Network = "mainnet" | "testnet";

/** ZecAuth ZIP-32 purpose index. */
const ZECAUTH_PURPOSE = 616;
/** SLIP-44 coin types. */
const COIN_TYPE: Record<Network, number> = { mainnet: 133, testnet: 1 };
/** Base derivation context string. */
const BASE_CONTEXT = "ZcashZecauthAuth";

/** A derived ZecAuth keypair. The scalar is the private auth key; never leaves the device. */
export interface AuthKeyPair {
  /** Private auth scalar (mod q). */
  readonly sk: bigint;
  /** 32-byte verification-key encoding (the public identity). */
  readonly pubkey: Uint8Array;
  /** Hex of `pubkey` (64 chars) — the canonical wire form of the identity. */
  readonly pubkeyHex: string;
}

function utf8(s: string): Uint8Array {
  if (typeof TextEncoder !== "undefined") return new TextEncoder().encode(s);
  // Fallback UTF-8 encoder for environments without TextEncoder.
  const bytes: number[] = [];
  for (let i = 0; i < s.length; i++) {
    let c = s.charCodeAt(i);
    if (c < 0x80) bytes.push(c);
    else if (c < 0x800) bytes.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
    else if (c >= 0xd800 && c <= 0xdbff) {
      const c2 = s.charCodeAt(++i);
      c = 0x10000 + ((c & 0x3ff) << 10) + (c2 & 0x3ff);
      bytes.push(
        0xf0 | (c >> 18),
        0x80 | ((c >> 12) & 0x3f),
        0x80 | ((c >> 6) & 0x3f),
        0x80 | (c & 0x3f),
      );
    } else bytes.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
  }
  return Uint8Array.from(bytes);
}

function contextFor(domain?: string): Uint8Array {
  const ctx = domain ? `${BASE_CONTEXT}:${domain}` : BASE_CONTEXT;
  const bytes = utf8(ctx);
  if (bytes.length > 252) {
    throw new Error(
      `zecauth: derivation context too long (${bytes.length} bytes, max 252) — domain too long`,
    );
  }
  return bytes;
}

/**
 * Derive the ZecAuth keypair for a wallet `seed`.
 *
 * @param seed     Wallet seed bytes (32..252). For a real wallet this is the BIP-39 seed.
 * @param network  "mainnet" | "testnet" (selects coin_type).
 * @param account  Account index (default 0).
 * @param domain   Optional dApp domain for an unlinkable domain-scoped identity.
 */
export function deriveAuthKeyPair(
  seed: Uint8Array,
  network: Network,
  account = 0,
  domain?: string,
): AuthKeyPair {
  const context = contextFor(domain);
  const path = [ZECAUTH_PURPOSE, COIN_TYPE[network], account];
  const derived = deriveAdhoc(context, seed, path);
  const wide = chacha20FirstBlock(derived);
  const sk = scalarFromWideLE(wide);
  const pubkey = encodePoint(mul(sk, BASEPOINT));
  return { sk, pubkey, pubkeyHex: bytesToHex(pubkey) };
}

/** Just the public identity (hex) for a seed — convenience over {@link deriveAuthKeyPair}. */
export function deriveAuthPubkey(
  seed: Uint8Array,
  network: Network,
  account = 0,
  domain?: string,
): string {
  return deriveAuthKeyPair(seed, network, account, domain).pubkeyHex;
}

/**
 * Sign `message` (UTF-8 bytes) with a derived keypair, producing the 64-byte RedPallas
 * signature. `randomBytes` must be 80 cryptographically-random bytes.
 */
export function signWithKeyPair(
  keypair: AuthKeyPair,
  message: Uint8Array,
  randomBytes: Uint8Array,
): Uint8Array {
  return redpallasSign(keypair.sk, keypair.pubkey, message, randomBytes);
}

/** The raw private scalar as 32 little-endian bytes (e.g. for secure backup). Handle with care. */
export function exportScalarLE(keypair: AuthKeyPair): Uint8Array {
  return encodeScalar(keypair.sk);
}
