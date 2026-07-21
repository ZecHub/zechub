// End-to-end test of the Snap auth path against the running ZBooks demo.
// Run with: node scripts/e2e-snap.mjs
// Simulates the data shape the Snap returns after an in-browser permission grant.
import { randomBytes } from "node:crypto";

const BASE = process.env.BASE ?? "http://localhost:3000";
const ok = (m) => console.log(`✓ ${m}`);
const fail = (m) => { console.error(`✗ ${m}`); process.exit(1); };

async function main() {
  const fingerprint = randomBytes(16).toString("hex");
  const ufvk = `uview1${"q".repeat(80)}`;
  ok(`synthetic identity: fingerprint=${fingerprint.slice(0, 12)}…`);

  const envRes = await fetch(`${BASE}/api/auth/snap-envelope`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ fingerprint, ufvk }),
  });
  if (!envRes.ok) {
    const t = await envRes.text();
    fail(`snap-envelope endpoint returned ${envRes.status}: ${t}`);
  }
  const { envelope } = await envRes.json();
  ok(`got envelope (${envelope.length} chars)`);

  const csrfRes = await fetch(`${BASE}/api/auth/csrf`);
  if (!csrfRes.ok) fail(`csrf endpoint returned ${csrfRes.status}`);
  const csrfCookies = csrfRes.headers.getSetCookie?.() ?? [csrfRes.headers.get("set-cookie")].filter(Boolean);
  const { csrfToken } = await csrfRes.json();
  const cookieHeader = (jar) => jar.map((c) => c.split(";")[0]).filter(Boolean).join("; ");
  const cookieJar = [...csrfCookies];

  const body = new URLSearchParams({
    csrfToken,
    callbackUrl: `${BASE}/`,
    fingerprint,
    ufvk,
    envelope,
    json: "true",
  });
  const cbRes = await fetch(`${BASE}/api/auth/callback/snap`, {
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
  if (cbJson?.url?.includes("error")) fail(`NextAuth rejected snap sign-in: ${cbJson.url}`);
  if (!cookieJar.some((c) => /next-auth\.session-token=|__Secure-next-auth\.session-token=/.test(c))) {
    fail(`No session cookie set.\nSet-Cookie:\n${cookieJar.join("\n")}\nBody: ${JSON.stringify(cbJson)}`);
  }
  ok("session cookie issued by NextAuth snap provider");

  const sessRes = await fetch(`${BASE}/api/auth/session`, {
    headers: { cookie: cookieHeader(cookieJar) },
  });
  const sess = await sessRes.json();
  const expectedId = `snap:${fingerprint.slice(0, 32)}`;
  if (sess?.user?.address !== expectedId) {
    fail(`session.user.address mismatch: expected ${expectedId}, got ${JSON.stringify(sess)}`);
  }
  ok(`session.user.address = ${sess.user.address}`);

  const keysRes = await fetch(`${BASE}/api/keys`, {
    headers: { cookie: cookieHeader(cookieJar) },
  });
  if (!keysRes.ok) fail(`/api/keys returned ${keysRes.status}`);
  const { keys } = await keysRes.json();
  const imported = keys.find((k) => k.ufvk === ufvk);
  if (!imported) fail(`UFVK was not auto-imported. Keys: ${JSON.stringify(keys, null, 2)}`);
  ok(`UFVK auto-imported as "${imported.label}" (primary=${imported.primary})`);

  console.log("\nALL CHECKS PASSED ✓");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
