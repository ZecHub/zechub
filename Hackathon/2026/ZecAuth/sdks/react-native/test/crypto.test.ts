/**
 * Byte-for-byte cross-implementation tests against Rust (`zecauth-core` / `reddsa`).
 *
 * `test/vectors.json` is produced by `cargo run -p zecauth-testvectors`. For each vector
 * we assert that the TS crypto reproduces the Rust derivation intermediates and pubkey
 * exactly, that the TS verifier accepts Rust signatures, and that TS↔TS sign/verify
 * round-trips. A companion round-trip (TS signs → Rust verifies) is checked in
 * `run-vectors.ts`, which shells out to the Rust verifier.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { test } from "node:test";

import { bytesToHex, hexToBytes } from "@noble/curves/abstract/utils";
import {
  type Network,
  chacha20FirstBlock,
  deriveAdhoc,
  deriveAuthKeyPair,
  redpallasVerify,
  scalarFromWideLE,
  signWithKeyPair,
} from "../src/crypto/index.js";

const here = dirname(fileURLToPath(import.meta.url));

interface Vector {
  label: string;
  seed_hex: string;
  network: Network;
  account: number;
  domain: string | null;
  pubkey: string;
  derived32: string;
  wide64: string;
  sk_le: string;
  message: string;
  signature: string;
}

const vectors: Vector[] = JSON.parse(
  readFileSync(join(here, "vectors.json"), "utf8"),
);

const utf8 = (s: string) => new TextEncoder().encode(s);

for (const v of vectors) {
  test(`[${v.label}] ZIP-32 derivation intermediates match Rust`, () => {
    const seed = hexToBytes(v.seed_hex);
    const context =
      v.domain === null ? "ZcashZecauthAuth" : `ZcashZecauthAuth:${v.domain}`;
    const coinType = v.network === "testnet" ? 1 : 133;
    const derived = deriveAdhoc(utf8(context), seed, [616, coinType, v.account]);
    assert.equal(bytesToHex(derived), v.derived32, "derived32");

    const wide = chacha20FirstBlock(derived);
    assert.equal(bytesToHex(wide), v.wide64, "wide64 (ChaCha20 keystream)");

    const sk = scalarFromWideLE(wide);
    // sk_le is the 32-byte little-endian scalar repr
    assert.equal(bytesToHex(numberToLE(sk, 32)), v.sk_le, "sk_le");
  });

  test(`[${v.label}] derives the same pubkey as Rust`, () => {
    const seed = hexToBytes(v.seed_hex);
    const kp = deriveAuthKeyPair(
      seed,
      v.network,
      v.account,
      v.domain ?? undefined,
    );
    assert.equal(kp.pubkeyHex, v.pubkey);
  });

  test(`[${v.label}] TS verifier accepts the Rust signature`, () => {
    const ok = redpallasVerify(
      hexToBytes(v.pubkey),
      utf8(v.message),
      hexToBytes(v.signature),
    );
    assert.equal(ok, true);
  });

  test(`[${v.label}] TS sign → TS verify round-trips, and tampering fails`, () => {
    const seed = hexToBytes(v.seed_hex);
    const kp = deriveAuthKeyPair(
      seed,
      v.network,
      v.account,
      v.domain ?? undefined,
    );
    const rand = new Uint8Array(80);
    // Deterministic-but-arbitrary nonce material for the test.
    for (let i = 0; i < 80; i++) rand[i] = (i * 7 + 13) & 0xff;
    const sig = signWithKeyPair(kp, utf8(v.message), rand);
    assert.equal(sig.length, 64);
    assert.equal(
      redpallasVerify(kp.pubkey, utf8(v.message), sig),
      true,
      "valid signature should verify",
    );
    assert.equal(
      redpallasVerify(kp.pubkey, utf8(v.message + "!"), sig),
      false,
      "tampered message must fail",
    );
  });
}

test("rejects a wrong-key signature", () => {
  const a = deriveAuthKeyPair(hexToBytes("00".repeat(32)), "mainnet");
  const b = deriveAuthKeyPair(hexToBytes("11".repeat(32)), "mainnet");
  const rand = new Uint8Array(80).fill(9);
  const sig = signWithKeyPair(a, utf8("x"), rand);
  assert.equal(redpallasVerify(b.pubkey, utf8("x"), sig), false);
});

function numberToLE(n: bigint, len: number): Uint8Array {
  const out = new Uint8Array(len);
  let x = n;
  for (let i = 0; i < len; i++) {
    out[i] = Number(x & 0xffn);
    x >>= 8n;
  }
  return out;
}
