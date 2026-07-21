// End-to-end test of the ZBooks payout flow (payees, runs, batch URI, reconcile).
// Requires a dev server with SIWZ_DEMO=1. Run with: node scripts/e2e-payouts.mjs
import { secp256k1 } from "@noble/curves/secp256k1";
import { SiwzMessage, hash160, base58checkEncode, magicHash } from "@siwz/core";

const BASE = process.env.BASE ?? "http://localhost:3000";
const log = (...a) => console.log(...a);
const ok = (msg) => log(`✓ ${msg}`);
const fail = (msg) => { console.error(`✗ ${msg}`); process.exit(1); };
const assert = (cond, msg) => { if (!cond) fail(msg); else ok(msg); };

function t1Address(priv = secp256k1.utils.randomPrivateKey()) {
  const pub = secp256k1.getPublicKey(priv, true);
  const payload = new Uint8Array(22);
  payload[0] = 0x1c; payload[1] = 0xb8;
  payload.set(hash160(pub), 2);
  return { priv, address: base58checkEncode(payload) };
}

async function signIn() {
  const { nonce, token: nonceToken } = await (await fetch(`${BASE}/api/siwz/nonce`, { cache: "no-store" })).json();
  const { priv, address } = t1Address();
  const issuedAt = new Date();
  const msg = new SiwzMessage({
    domain: "localhost:3000", address,
    statement: "Sign in to ZBooks.", uri: BASE, network: "mainnet", nonce,
    issuedAt: issuedAt.toISOString(),
    expirationTime: new Date(issuedAt.getTime() + 10 * 60_000).toISOString(),
  });
  const wire = msg.toString();
  const sig = secp256k1.sign(magicHash(wire), priv, { lowS: true });
  const sigBytes = new Uint8Array(65);
  sigBytes[0] = 27 + (sig.recovery ?? 0) + 4;
  sigBytes.set(sig.toCompactRawBytes(), 1);
  const signature = Buffer.from(sigBytes).toString("base64");

  const csrfRes = await fetch(`${BASE}/api/auth/csrf`);
  const csrfCookies = csrfRes.headers.getSetCookie?.() ?? [];
  const { csrfToken } = await csrfRes.json();
  const jar = [...csrfCookies];
  const cookie = () => jar.map((c) => c.split(";")[0]).filter(Boolean).join("; ");

  const cbRes = await fetch(`${BASE}/api/auth/callback/siwz`, {
    method: "POST", redirect: "manual",
    headers: { "content-type": "application/x-www-form-urlencoded", cookie: cookie() },
    body: new URLSearchParams({ csrfToken, callbackUrl: `${BASE}/`, message: wire, signature, nonceToken, json: "true" }),
  });
  jar.push(...(cbRes.headers.getSetCookie?.() ?? []));
  if (!jar.some((c) => /next-auth\.session-token=/.test(c))) fail("no session cookie");
  ok(`signed in as ${address}`);
  return cookie;
}

const j = (cookie, method, url, body) =>
  fetch(`${BASE}${url}`, {
    method,
    headers: { "content-type": "application/json", cookie: cookie() },
    body: body ? JSON.stringify(body) : undefined,
  });

async function main() {
  const cookie = await signIn();

  // Treasury key (also seeds sample transactions).
  const keyRes = await j(cookie, "POST", "/api/keys", { label: "Treasury", ufvk: `uview1${"q".repeat(80)}` });
  if (!keyRes.ok) fail(`POST /api/keys ${keyRes.status}: ${await keyRes.text()}`);
  const { key } = await keyRes.json();
  ok(`treasury key id=${key.id}`);

  // Payees A, B (completed) and C (in progress).
  const mk = async (label) => {
    const { address } = t1Address();
    const r = await j(cookie, "POST", "/api/payees", { label, address });
    if (!r.ok) fail(`POST /api/payees ${r.status}: ${await r.text()}`);
    return { ...(await r.json()).payee, address };
  };
  const A = await mk("Alice (dev)");
  const B = await mk("Bob (motion)");
  const C = await mk("Carol (video)");
  ok(`created payees A/B/C`);

  // Run.
  const runRes = await j(cookie, "POST", "/api/payouts", { title: "Week of May 25", sourceUfvkId: key.id });
  if (!runRes.ok) fail(`POST /api/payouts ${runRes.status}: ${await runRes.text()}`);
  const run = (await runRes.json()).run;
  ok(`created run id=${run.id}`);

  // Line items: A 0.5 + B 0.2 completed; C 0.8 in progress (excluded).
  const addItem = async (payee, amountZec, workStatus, memo) => {
    const r = await j(cookie, "POST", `/api/payouts/${run.id}/items`, { payeeId: payee.id, amountZec, workStatus, memo });
    if (!r.ok) fail(`add item ${r.status}: ${await r.text()}`);
    return (await r.json()).item;
  };
  const itemA = await addItem(A, 0.5, "completed", "Dev task completed");
  await addItem(B, 0.2, "completed", "Motion design completed");
  await addItem(C, 0.8, "in_progress");
  ok("added 3 line items (2 completed, 1 in progress)");

  // Pre-flight: only completed+unpaid items in the batch.
  let detail = await (await j(cookie, "GET", `/api/payouts/${run.id}`)).json();
  assert(detail.preflight.count === 2, `preflight excludes in-progress (count=${detail.preflight.count}, want 2)`);
  assert(Math.abs(detail.preflight.totalZec - 0.7) < 1e-9, `total = 0.7 ZEC (got ${detail.preflight.totalZec})`);
  assert(detail.preflight.feeZec > 0, `fee estimated (${detail.preflight.feeZec} ZEC)`);
  assert(detail.preflight.balance !== null, "treasury balance reported");
  assert(detail.preflight.sufficient === true, `spendable covers run (spendable=${detail.preflight.spendableZec})`);
  assert(detail.preflight.uri.startsWith("zcash:?address="), `multi-recipient URI form (${detail.preflight.uri.slice(0, 40)}…)`);

  // The batch URI encodes both completed recipients with indexed params.
  const params = new URLSearchParams(detail.preflight.uri.slice("zcash:?".length));
  assert(params.get("address") && params.get("address.1"), "URI has address + address.1");

  // QR endpoint serves an SVG.
  const qr = await fetch(`${BASE}/api/payouts/${run.id}/qr`, { headers: { cookie: cookie() } });
  assert(qr.ok && (qr.headers.get("content-type") || "").includes("svg"), `QR endpoint returns SVG (${qr.status})`);

  // Mark A paid manually -> drops out of the next batch.
  const payA = await j(cookie, "PATCH", `/api/payouts/${run.id}/items/${itemA.id}`, { action: "mark_paid", txid: "deadbeef".repeat(8) });
  assert(payA.ok && (await payA.json()).item.pay_status === "paid", "A marked paid");
  detail = await (await j(cookie, "GET", `/api/payouts/${run.id}`)).json();
  assert(detail.preflight.count === 1, `paid item leaves the batch (count=${detail.preflight.count}, want 1)`);
  assert(Math.abs(detail.preflight.totalZec - 0.2) < 1e-9, `batch total now 0.2 (got ${detail.preflight.totalZec})`);

  // Reconcile endpoint runs without error.
  await j(cookie, "PATCH", `/api/payouts/${run.id}`, { status: "sent" });
  const rec = await j(cookie, "POST", `/api/payouts/${run.id}/reconcile`);
  assert(rec.ok, `reconcile endpoint ok (${rec.status})`);

  // Auto-reconcile against a real seeded OUT tx: build a payee+item that matches.
  const csv = await (await fetch(`${BASE}/api/reports/export`, { headers: { cookie: cookie() } })).text();
  const rows = csv.split("\n").slice(1).filter(Boolean).map((l) => l.split(","));
  // CSV cols: Date,Direction,Amount,Category,Counterparty,Memo,Notes,TxID,Block
  const outRow = rows.find((c) => c[1] === "OUT" && /^(t1|zs|u1)/.test((c[4] || "").replace(/"/g, "")) && Number(c[2]) < 0);
  if (outRow) {
    const addr = outRow[4].replace(/"/g, "");
    const amt = Math.abs(Number(outRow[2]));
    const pr = await j(cookie, "POST", "/api/payees", { label: "Seeded match", address: addr });
    if (pr.ok) {
      const pid = (await pr.json()).payee.id;
      await j(cookie, "POST", `/api/payouts/${run.id}/items`, { payeeId: pid, amountZec: amt, workStatus: "completed" });
      const rec2 = await (await j(cookie, "POST", `/api/payouts/${run.id}/reconcile`)).json();
      assert(rec2.matched >= 1, `auto-reconciled a seeded OUT tx (matched=${rec2.matched})`);
    } else { log("• skipped auto-reconcile (seeded address rejected by payee validation)"); }
  } else {
    log("• skipped auto-reconcile (no valid-address OUT row in seeded data)");
  }

  log("\nALL PAYOUT CHECKS PASSED ✓");
}

main().catch((err) => { console.error(err); process.exit(1); });
