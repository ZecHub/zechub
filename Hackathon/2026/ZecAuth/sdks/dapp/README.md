# @zecauth/dapp

The ZecAuth SDK for **dApp developers** — add "Sign in with Zcash" and request payments in a
few lines. Pairs with a ZecAuth server (`zecauth-server`) and any ZecAuth wallet.

## Install

```sh
npm install @zecauth/dapp
```

## Quick start

```ts
import { ZecAuth } from "@zecauth/dapp";

const zecauth = new ZecAuth({
  domain: "myapp.com",
  server: "/auth",                              // your ZecAuth server base URL
  capabilities: ["signin", "sign-transaction"], // what your app wants to do
});

// 1. Create a challenge and show it as a QR / deep link.
const challenge = await zecauth.createChallenge();
showQrCode(`zecauth://${location.host}?challenge=${encodeURIComponent(challenge.challenge_json)}`);

// 2. When the wallet POSTs back its signed response, verify it → you get a session.
const session = await zecauth.verify(walletResponse);
console.log(session.pubkey); // the user's ZecAuth identity

// 3. Request a payment (allowed because "sign-transaction" was declared).
const tx = await zecauth.createTransactionRequest({ recipient: "u1…", amount: "0.5" });
const result = await zecauth.submitTransactionApproval(walletApproval);
```

## Capabilities

You declare the **capabilities** your app needs up front. The wallet shows them to the user
on the connect screen, so they know what they're agreeing to before they sign in.

| Capability | Meaning |
|------------|---------|
| `signin` | Prove the user controls a Zcash wallet (identity only). Always included. |
| `sign-transaction` | Ask the user to approve & sign transactions. Required to call `createTransactionRequest()`. |
| `view-address` | Ask the wallet to share a receiving address (Unified Address) — e.g. to pay or refund the user. |
| `view-balance` | A one-time **balance snapshot**. Privacy-sensitive. |
| `view-incoming` | A one-time snapshot of **received payments** — enough to verify a payment landed. Privacy-sensitive. |
| `view-history` | A one-time snapshot of **full transaction history**. Privacy-sensitive. |
| `view-full` | A read-only **full viewing key** (UFVK) for *ongoing* watching of balance + history. No spend authority. Most powerful — request only if you truly need it. |

These split the exposure: snapshots reveal only what you asked, once; only `view-full` hands
over a key. The user approves or rejects each one — `session.capabilities` is what they
**granted**, `session.denied` is what they **rejected**, so you can decide whether to proceed.

```ts
const zecauth = new ZecAuth({
  domain: "shop.example",
  server: "/auth",
  capabilities: ["signin", "sign-transaction"],
  maxAmount: "10.0", // optional cap (ZEC) the wallet shows per payment request
});

zecauth.getCapabilities(); // [{ id, label, description, scope }, …] — render your own consent UI
zecauth.can("sign-transaction"); // true
```

**The server is authoritative.** `createChallenge()` sends your declared capabilities to your
ZecAuth server, which validates them against its allow-list (`ZECAUTH_CAPABILITIES`), embeds
the approved `scopes` into the challenge, and binds the granted set into the session token. A
dApp cannot exercise a capability the server didn't grant: `createTransactionRequest()` on a
session without `sign-transaction` is rejected server-side (`capability_not_granted`), and the
SDK also throws locally if you never declared it. If you request a capability your server
forbids, `createChallenge()` rejects with `capability_not_allowed`.

### Disclosures

Some capabilities make the wallet *share data*. When you request `view-address`, the wallet
attaches a receiving address to its response; the SDK surfaces it on the session:

```ts
const session = await zecauth.verify(walletResponse);
session.capabilities;                  // what the user GRANTED (authoritative, from the server)
session.denied;                        // what the user REJECTED — decide whether to proceed
session.disclosures?.address;          // "u1…"     — view-address
session.disclosures?.balance;          // { totalZec, spendableZec } — view-balance snapshot
session.disclosures?.incomingPayments; // [{ txid, amountZec, direction, … }] — view-incoming
session.disclosures?.transactions;     // full history snapshot — view-history
session.disclosures?.viewingKey;       // "uview1…" — view-full (read-only UFVK, ongoing)
```

The wallet discloses only capabilities that were **both requested and granted** (it strips
anything else). Snapshots are point-in-time and minimal. `view-incoming` is a real payment
verifier input — match an expected amount against `incomingPayments` (no scanner, no txid).
`view-full` is the uniquely-Zcash one: import the UFVK into a lightwalletd scanner for ongoing
watching — **no spend authority**. Request the narrowest capability that does the job.

See the [ZecAuth protocol spec](../../PROTOCOL.md) (§3.5–3.6) for details.

## API

| Method | Description |
|--------|-------------|
| `createChallenge()` | Fetch a challenge and embed the declared capabilities. Returns `{ challenge_json, capabilities, scopes, callback_url, ws_url, … }`. |
| `verify(response)` | Verify a wallet's `{ pubkey, signature, message }` and start a session. |
| `connect({ onChallenge, onResponse })` | High-level: challenge → wait for wallet → verify. |
| `createTransactionRequest(params)` | Request a payment (needs `sign-transaction`). |
| `submitTransactionApproval(payload)` | Verify the wallet's signed approval. |
| `getSession()` / `restoreSession()` / `disconnect()` | Session lifecycle. |
| `watchSession({ onDisconnect })` | React in real time when the wallet ends the session. |
| `getCapabilities()` / `can(capability)` | Inspect the declared capabilities. |

MIT licensed.
