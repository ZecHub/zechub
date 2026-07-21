/**
 * Live end-to-end check against the real `zecauth-server` (the demo dApp backend).
 *
 * Exercises the exact wallet code path the app uses — `ZecAuthWallet.parseChallenge`,
 * `approveAuth`, `submit`, and the transaction flow — against the running HTTP server,
 * then confirms the server authenticates the session and verifies the payment.
 *
 *   1. cargo run -p zecauth-server        # serves http://127.0.0.1:3000
 *   2. node --import tsx test/e2e-server.ts
 */
import { randomBytes } from 'node:crypto';
import {
  ZecAuthWallet,
  mnemonicToSeed,
  setRandomSource,
} from '../src/index.js';

setRandomSource((n) => new Uint8Array(randomBytes(n)));

const BASE = process.env.ZECAUTH_SERVER ?? 'http://127.0.0.1:3000';

const seed = mnemonicToSeed(
  'legal winner thank year wave sausage worth useful legal winner thank yellow',
);
const wallet = new ZecAuthWallet({ seed, network: 'mainnet' });

async function getJson(url: string, init?: RequestInit): Promise<any> {
  const res = await fetch(url, init);
  const text = await res.text();
  let body: any;
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }
  if (!res.ok) throw new Error(`${url} → ${res.status}: ${text}`);
  return body;
}

async function authFlow(): Promise<void> {
  console.log('· requesting challenge…');
  const challenge = await getJson(`${BASE}/auth/challenge`);
  const parsed = wallet.parseChallenge(challenge.challenge_json);
  console.log(`  domain=${parsed.domain} nonce=${parsed.nonce.slice(0, 8)}…`);

  const response = await wallet.approveAuth(parsed);
  console.log(`  signed with ${response.pubkey.slice(0, 16)}…`);

  // Relay (what the wallet POSTs) then verify (what the dApp calls).
  await getJson(challenge.callback_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(response),
  });

  const verify = await getJson(`${BASE}/auth/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(response),
  });

  if (!verify.authenticated || !verify.token) throw new Error('auth not granted');
  console.log(`✔ authenticated — JWT issued for ${verify.pubkey.slice(0, 16)}…\n`);
}

async function txFlow(): Promise<void> {
  console.log('· requesting a payment…');
  const tx = await getJson(`${BASE}/tx/request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipient: 'u1demo000recipient', amount: '0.42', description: 'Coffee' }),
  });

  const parsed = wallet.parseTransaction(tx.request_json);
  console.log(`  ${parsed.amount} ZEC → ${parsed.recipient}`);

  const approval = await wallet.approveTransaction(parsed);
  await getJson(tx.callback_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(approval),
  });

  const result = await getJson(`${BASE}/tx/approve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(approval),
  });

  if (!result.verified || result.status !== 'approved') throw new Error('tx not verified');
  console.log(`✔ payment authorized & verified (${result.amount} ZEC)\n`);
}

(async () => {
  try {
    await fetch(`${BASE}/health`);
  } catch {
    console.error(`Server not reachable at ${BASE}. Start it: cargo run -p zecauth-server`);
    process.exit(2);
  }
  await authFlow();
  await txFlow();
  console.log('All live server flows passed ✅');
})().catch((e) => {
  console.error('✗', e.message);
  process.exit(1);
});
