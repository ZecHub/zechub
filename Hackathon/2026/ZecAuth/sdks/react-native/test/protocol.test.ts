/**
 * Protocol-layer tests: parsing, deep links, and a full end-to-end flow where the JS
 * wallet signs a challenge and Rust's real `verify_response` (domain/chain/expiry/nonce
 * + signature) accepts it — proving the canonical message format is wire-compatible.
 */
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import {
  ZecAuthWallet,
  buildChallengeMessage,
  mnemonicToSeed,
  parseChallenge,
  parseDeepLink,
  setRandomSource,
} from "../src/index.js";

setRandomSource((n) => new Uint8Array(randomBytes(n)));

const here = dirname(fileURLToPath(import.meta.url));
const bin = join(here, "../../../target/debug/zecauth-testvectors");

function rustVerifyResponse(
  pubkey: string,
  signature: string,
  message: string,
  domain: string,
  chain: string,
): boolean {
  const res = spawnSync(bin, ["verify-response"], {
    input: JSON.stringify({ pubkey, signature, message, domain, chain }),
    encoding: "utf8",
  });
  return res.stdout.trim() === "true";
}

const seed = mnemonicToSeed(
  "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about",
);

function makeChallengeJson(domain: string, chain: string, ttlSeconds = 300): string {
  const now = new Date();
  const exp = new Date(now.getTime() + ttlSeconds * 1000);
  return JSON.stringify({
    domain,
    uri: `https://${domain}/dashboard`,
    version: 1,
    chain,
    nonce: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    issued_at: now.toISOString(),
    expiration_time: exp.toISOString(),
    statement: "Sign in to the demo",
    callback_url: `http://${domain}/auth/callback/abc`,
  });
}

test("parseChallenge extracts fields and builds the canonical message", () => {
  const data = makeChallengeJson("myapp.com", "zcash:mainnet");
  const c = parseChallenge(data, "zcash:mainnet");
  assert.equal(c.domain, "myapp.com");
  assert.equal(c.nonce, "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6");
  assert.equal(c.callbackUrl, "http://myapp.com/auth/callback/abc");
  assert.ok(c.signingMessage.startsWith("myapp.com wants you to sign in with your Zcash wallet.\n\n"));
  assert.ok(c.signingMessage.includes("Statement: Sign in to the demo"));
  assert.equal(c.expired, false);
});

test("parseChallenge rejects chain mismatch and bad version", () => {
  assert.throws(() => parseChallenge(makeChallengeJson("x.com", "zcash:testnet"), "zcash:mainnet"));
  const badVersion = JSON.stringify({ ...JSON.parse(makeChallengeJson("x.com", "zcash:mainnet")), version: 2 });
  assert.throws(() => parseChallenge(badVersion, "zcash:mainnet"));
});

test("buildChallengeMessage matches the documented format exactly", () => {
  const m = buildChallengeMessage({
    domain: "myapp.com",
    uri: "https://myapp.com",
    version: 1,
    chain: "zcash:mainnet",
    nonce: "0123456789abcdef0123",
    issuedAt: "2026-06-08T12:00:00Z",
    expirationTime: "2026-06-08T12:05:00Z",
  });
  assert.equal(
    m,
    "myapp.com wants you to sign in with your Zcash wallet.\n\n" +
      "URI: https://myapp.com\n" +
      "Version: 1\n" +
      "Chain: zcash:mainnet\n" +
      "Nonce: 0123456789abcdef0123\n" +
      "Issued At: 2026-06-08T12:00:00Z\n" +
      "Expiration Time: 2026-06-08T12:05:00Z",
  );
});

test("parseDeepLink handles zecauth:// links and raw JSON", () => {
  const payload = makeChallengeJson("myapp.com", "zcash:mainnet");
  const link = `zecauth://myapp.com?challenge=${encodeURIComponent(payload)}&callback=${encodeURIComponent("http://cb")}`;
  const parsed = parseDeepLink(link);
  assert.equal(parsed?.kind, "auth");
  assert.equal(parsed?.callbackUrl, "http://myapp.com/auth/callback/abc"); // payload callback wins
  assert.equal(parseDeepLink(payload)?.kind, "auth");
  assert.equal(parseDeepLink("not a link"), null);
});

test("wallet derives a stable identity and a different domain-scoped pubkey", () => {
  const wallet = new ZecAuthWallet({ seed, network: "mainnet" });
  const global = wallet.identity();
  const scoped = wallet.pubkeyForDomain("myapp.com");
  assert.match(global, /^[0-9a-f]{64}$/);
  assert.notEqual(global, scoped);
  // Determinism across instances.
  assert.equal(new ZecAuthWallet({ seed, network: "mainnet" }).identity(), global);
});

const itEndToEnd = existsSync(bin) ? test : test.skip;

itEndToEnd("end-to-end: JS wallet signs, Rust verify_response accepts", async () => {
  const wallet = new ZecAuthWallet({ seed, network: "mainnet" });
  const challenge = wallet.parseChallenge(makeChallengeJson("myapp.com", "zcash:mainnet"));
  const response = await wallet.approveAuth(challenge);

  // The wallet uses a domain-scoped key; the response carries that pubkey.
  assert.equal(response.pubkey, wallet.pubkeyForDomain("myapp.com"));
  assert.equal(wallet.verify(response.pubkey, response.message, response.signature), true);

  const ok = rustVerifyResponse(
    response.pubkey,
    response.signature,
    response.message,
    "myapp.com",
    "zcash:mainnet",
  );
  assert.equal(ok, true, "Rust verify_response should accept the JS-signed challenge");

  // Wrong expected domain must fail server-side binding.
  assert.equal(
    rustVerifyResponse(response.pubkey, response.signature, response.message, "evil.com", "zcash:mainnet"),
    false,
  );
});

itEndToEnd("end-to-end: expired challenge is rejected by Rust", async () => {
  const wallet = new ZecAuthWallet({ seed, network: "mainnet" });
  const expiredJson = makeChallengeJson("myapp.com", "zcash:mainnet", -60); // already expired
  const challenge = parseChallenge(expiredJson, "zcash:mainnet");
  const response = await wallet.approveAuth(challenge);
  assert.equal(
    rustVerifyResponse(response.pubkey, response.signature, response.message, "myapp.com", "zcash:mainnet"),
    false,
  );
});
