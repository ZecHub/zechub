/**
 * Closes the interop loop in the other direction: the TS SDK *produces* signatures and
 * the Rust verifier (`zecauth-testvectors verify`) checks them. Run after building the
 * Rust binary:  `cargo build -p zecauth-testvectors`.
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { randomBytes } from "node:crypto";
import { hexToBytes } from "@noble/curves/abstract/utils";
import { deriveAuthKeyPair, signWithKeyPair } from "../src/crypto/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const bin = join(here, "../../../target/debug/zecauth-testvectors");

if (!existsSync(bin)) {
  console.error(`Rust verifier not found at ${bin}. Run: cargo build -p zecauth-testvectors`);
  process.exit(2);
}

function rustVerify(pubkey: string, signature: string, message: string): boolean {
  const res = spawnSync(bin, ["verify"], {
    input: JSON.stringify({ pubkey, signature, message }),
    encoding: "utf8",
  });
  return res.stdout.trim() === "true";
}

const utf8 = (s: string) => new TextEncoder().encode(s);
const toHex = (b: Uint8Array) =>
  Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");

let failures = 0;
const cases = [
  { seed: "00".repeat(32), net: "mainnet" as const, account: 0, domain: undefined, msg: "TS→Rust roundtrip" },
  { seed: "0f".repeat(48), net: "testnet" as const, account: 2, domain: "myapp.com", msg: "localhost:3000 wants you to sign in with your Zcash wallet." },
  { seed: "ab".repeat(32), net: "mainnet" as const, account: 0, domain: "shop.example", msg: "Approve 0.5 ZEC" },
];

for (const c of cases) {
  const kp = deriveAuthKeyPair(hexToBytes(c.seed), c.net, c.account, c.domain);
  const sig = signWithKeyPair(kp, utf8(c.msg), new Uint8Array(randomBytes(80)));
  const ok = rustVerify(kp.pubkeyHex, toHex(sig), c.msg);
  const tamper = rustVerify(kp.pubkeyHex, toHex(sig), c.msg + " (tampered)");
  const label = `${c.net} acct${c.account} ${c.domain ?? "global"}`;
  if (ok && !tamper) {
    console.log(`✔ ${label}: Rust verified TS signature; rejected tampered message`);
  } else {
    failures++;
    console.error(`�’ ${label}: ok=${ok} tamperRejected=${!tamper}`);
  }
}

console.log(failures === 0 ? "\nAll TS→Rust round-trips passed." : `\n${failures} failures.`);
process.exit(failures === 0 ? 0 : 1);
