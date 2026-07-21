// End-to-end test of the SIWZ memo-challenge flow against ZBooks.
// Run with: node scripts/e2e-memo.mjs
// Requires the dev server in DEMO mode (SIWZ_DEMO=1).
const BASE = process.env.BASE ?? "http://localhost:3000";
const ok = (m) => console.log(`✓ ${m}`);
const fail = (m) => { console.error(`✗ ${m}`); process.exit(1); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const issueRes = await fetch(`${BASE}/api/auth/memo/issue`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  });
  if (!issueRes.ok) fail(`/api/auth/memo/issue → ${issueRes.status}: ${await issueRes.text()}`);
  const challenge = await issueRes.json();
  if (!challenge.uri?.startsWith("zcash:")) fail(`expected ZIP 321 URI, got ${challenge.uri}`);
  ok(`challenge issued anonymously: amount=${challenge.amountZec} ZEC → ${challenge.serviceAddress}`);

  const amountZ = BigInt(challenge.amountZatoshi);
  if (amountZ < 10_000n || amountZ > 20_000n) {
    fail(`amount ${challenge.amountZatoshi} zatoshi out of dust range [10000, 20000]`);
  }
  ok(`amount in dust range (${challenge.amountZatoshi} zatoshi ≈ $${(Number(amountZ) * 0.000000006 * 600).toFixed(3)} at $600/ZEC)`);

  if (!challenge.demoMode) fail(`expected demoMode (set SIWZ_DEMO=1 in .env.local and restart dev server)`);
  ok(`demo mode active`);

  // Issue does not auto-prime: poll must return 202 until demo-simulate is called.
  const earlyPoll = await fetch(`${BASE}/api/auth/memo/poll`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ token: challenge.token }),
  });
  if (earlyPoll.status !== 202) {
    fail(`expected 202 from poll before demo-simulate, got ${earlyPoll.status}`);
  }
  ok("poll correctly returns 202 (no tx yet) before demo-simulate is called");

  const simRes = await fetch(`${BASE}/api/auth/memo/demo-simulate`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ token: challenge.token }),
  });
  if (!simRes.ok) fail(`/api/auth/memo/demo-simulate → ${simRes.status}: ${await simRes.text()}`);
  const simJson = await simRes.json();
  ok(`demo simulate primed mock with txid ${simJson.txid?.slice(0, 16)}…`);

  let pollJson;
  let attempts = 0;
  while (attempts < 5) {
    attempts++;
    const pollRes = await fetch(`${BASE}/api/auth/memo/poll`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token: challenge.token }),
    });
    if (pollRes.status === 200) {
      pollJson = await pollRes.json();
      ok(`poll matched after ${attempts} attempt(s)`);
      break;
    }
    if (pollRes.status === 202) {
      await sleep(500);
      continue;
    }
    fail(`/api/auth/memo/poll → ${pollRes.status}: ${await pollRes.text()}`);
  }
  if (!pollJson) fail(`poll never matched after ${attempts} attempts`);
  if (!pollJson.identity?.startsWith("anon:")) {
    fail(`expected anonymous identity, got ${pollJson.identity}`);
  }
  ok(`anonymous identity assigned: ${pollJson.identity}`);

  const csrfRes = await fetch(`${BASE}/api/auth/csrf`);
  const csrfCookies = csrfRes.headers.getSetCookie?.() ?? [csrfRes.headers.get("set-cookie")].filter(Boolean);
  const { csrfToken } = await csrfRes.json();
  const cookieHeader = (jar) => jar.map((c) => c.split(";")[0]).filter(Boolean).join("; ");
  const cookieJar = [...csrfCookies];

  const body = new URLSearchParams({
    csrfToken,
    callbackUrl: `${BASE}/`,
    identity: pollJson.identity,
    envelope: pollJson.envelope,
    json: "true",
  });
  const cbRes = await fetch(`${BASE}/api/auth/callback/memo`, {
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
  if (cbJson?.url?.includes("error")) fail(`NextAuth rejected memo sign-in: ${cbJson.url}`);
  if (!cookieJar.some((c) => /next-auth\.session-token=|__Secure-next-auth\.session-token=/.test(c))) {
    fail(`No session cookie set. Body: ${JSON.stringify(cbJson)}`);
  }
  ok(`session cookie issued by NextAuth memo provider`);

  const sessRes = await fetch(`${BASE}/api/auth/session`, {
    headers: { cookie: cookieHeader(cookieJar) },
  });
  const sess = await sessRes.json();
  if (!sess?.user?.address?.startsWith("anon:")) {
    fail(`expected session.user.address = anon:<hash>, got ${JSON.stringify(sess)}`);
  }
  ok(`session.user.address = ${sess.user.address}`);

  const keysRes = await fetch(`${BASE}/api/keys`, { headers: { cookie: cookieHeader(cookieJar) } });
  const { keys } = await keysRes.json();
  const anonKey = keys.find((k) => k.ufvk.startsWith("anon:"));
  if (anonKey) fail(`anonymous identity was incorrectly imported as a UFVK: ${JSON.stringify(anonKey)}`);
  ok(`no UFVK auto-imported (anonymous session — user can add one later from /keys)`);

  console.log("\nALL CHECKS PASSED ✓");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
