// End-to-end test of the SIWZ to ZBooks flow.
// Run with: node scripts/e2e-signin.mjs
import { secp256k1 } from "@noble/curves/secp256k1";
import {
  SiwzMessage,
  hash160,
  base58checkEncode,
  magicHash,
} from "@siwz/core";

const BASE = process.env.BASE ?? "http://localhost:3000";

const log = (...a) => console.log(...a);
const ok = (msg) => log(`✓ ${msg}`);
const fail = (msg) => { console.error(`✗ ${msg}`); process.exit(1); };

async function main() {
  const nonceRes = await fetch(`${BASE}/api/siwz/nonce`, { cache: "no-store" });
  if (!nonceRes.ok) fail(`nonce endpoint returned ${nonceRes.status}`);
  const { nonce, token: nonceToken } = await nonceRes.json();
  ok(`got nonce: ${nonce}`);

  const priv = secp256k1.utils.randomPrivateKey();
  const pub = secp256k1.getPublicKey(priv, true);
  const payload = new Uint8Array(22);
  payload[0] = 0x1c;
  payload[1] = 0xb8;
  payload.set(hash160(pub), 2);
  const address = base58checkEncode(payload);
  ok(`derived address: ${address}`);

  const issuedAt = new Date();
  const expirationTime = new Date(issuedAt.getTime() + 10 * 60_000);
  const msg = new SiwzMessage({
    domain: "localhost:3000",
    address,
    statement: "Sign in to ZBooks to manage your team's ZEC accounting.",
    uri: BASE,
    network: "mainnet",
    nonce,
    issuedAt: issuedAt.toISOString(),
    expirationTime: expirationTime.toISOString(),
  });
  const wire = msg.toString();
  ok("built SIWZ message");

  const hash = magicHash(wire);
  const sig = secp256k1.sign(hash, priv, { lowS: true });
  const sigBytes = new Uint8Array(65);
  sigBytes[0] = 27 + (sig.recovery ?? 0) + 4; // compressed pubkey flag
  sigBytes.set(sig.toCompactRawBytes(), 1);
  const signature = Buffer.from(sigBytes).toString("base64");
  ok("signed message");

  const csrfRes = await fetch(`${BASE}/api/auth/csrf`);
  if (!csrfRes.ok) fail(`csrf endpoint returned ${csrfRes.status}`);
  const csrfCookies = csrfRes.headers.getSetCookie?.() ?? [csrfRes.headers.get("set-cookie")].filter(Boolean);
  const { csrfToken } = await csrfRes.json();

  const cookieHeader = (jar) =>
    jar.map((c) => c.split(";")[0]).filter(Boolean).join("; ");
  const cookieJar = [...csrfCookies];

  const body = new URLSearchParams({
    csrfToken,
    callbackUrl: `${BASE}/`,
    message: wire,
    signature,
    nonceToken,
    json: "true",
  });
  const cbRes = await fetch(`${BASE}/api/auth/callback/siwz`, {
    method: "POST",
    redirect: "manual",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      cookie: cookieHeader(cookieJar),
    },
    body,
  });
  cookieJar.push(...(cbRes.headers.getSetCookie?.() ?? [cbRes.headers.get("set-cookie")].filter(Boolean)));

  const cbJson = await cbRes.json().catch(() => null);
  if (cbJson?.url?.includes("error")) fail(`NextAuth rejected sign-in: ${cbJson.url}`);
  if (!cookieJar.some((c) => /next-auth\.session-token=|__Secure-next-auth\.session-token=/.test(c))) {
    fail(`No session cookie set.\n${cookieJar.join("\n")}\nbody: ${JSON.stringify(cbJson)}`);
  }
  ok("session cookie issued by NextAuth");

  const sessRes = await fetch(`${BASE}/api/auth/session`, {
    headers: { cookie: cookieHeader(cookieJar) },
  });
  const sess = await sessRes.json();
  if (sess?.user?.address !== address) fail(`session.user.address mismatch: ${JSON.stringify(sess)}`);
  ok(`session.user.address = ${sess.user.address}`);

  // Adding the first viewing key auto-seeds sample transactions.
  const ufvk = `uview1${"q".repeat(80)}`;
  const keyRes = await fetch(`${BASE}/api/keys`, {
    method: "POST",
    headers: { "content-type": "application/json", cookie: cookieHeader(cookieJar) },
    body: JSON.stringify({ label: "E2E test key", ufvk }),
  });
  if (!keyRes.ok) {
    const t = await keyRes.text();
    fail(`POST /api/keys returned ${keyRes.status}: ${t}`);
  }
  const { key } = await keyRes.json();
  ok(`added UFVK id=${key.id} label="${key.label}" primary=${key.primary}`);

  const csvRes = await fetch(`${BASE}/api/reports/export`, {
    headers: { cookie: cookieHeader(cookieJar) },
  });
  if (!csvRes.ok) fail(`CSV export returned ${csvRes.status}`);
  const csv = await csvRes.text();
  const lines = csv.split("\n").filter(Boolean);
  if (lines.length < 5) fail(`CSV unexpectedly short: ${lines.length} lines`);
  ok(`CSV export: ${lines.length - 1} transaction rows`);

  const txList = lines.slice(1).map((l) => l.split(",")[7]).filter(Boolean);
  ok(`first tx ids: ${txList.slice(0, 2).join(", ")}…`);

  log("\nALL CHECKS PASSED ✓");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
