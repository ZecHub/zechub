# SIWZ + ZBooks: how the whole system works

This is a plain-language walkthrough of the entire system, written for someone reviewing it cold. It covers what the pieces are, how a user moves through them, and where trust sits.

## What this is

Two things that compose:

1. **SIWZ (Sign in with Zcash)** is an authentication library. It is "Sign in with Ethereum, but Zcash-native." A user proves control of a Zcash address or wallet and gets a session, with no password and no custody of keys.
2. **ZBooks** is the first real app built on SIWZ. It is accounting and payroll for teams paid in Zcash. You give it read-only viewing keys, it categorises transactions and produces a P&L, and it can pay contributors in a single batch transaction.

The thesis: infrastructure (SIWZ) plus a real app that uses it (ZBooks) is a stronger story than infrastructure alone, because you can see the auth working in production rather than as a toy.

## The pieces

| Package | Role |
|---|---|
| `packages/siwz-core` | Protocol primitives in pure TypeScript: message format, address parsing, signature verification, ZIP 321 URI building, memo-challenge logic. No React, no Node-only dependencies. |
| `packages/siwz-react` | The `<SignInWithZcash />` and `<MemoSignIn />` components, the `useSiwz()` hook, and MetaMask Snap detection. |
| `packages/siwz-next-auth` | A NextAuth provider, the stateless HMAC nonce helpers, and the snap envelope signing. |
| `apps/demo` | ZBooks itself (package name `@zbooks/app`). |
| `apps/zecwall` | ZecWall, a minimal app that uses SIWZ to show the library in isolation. |
| `apps/lightwallet-rpc` | A small Node service that runs on a cheap VPS, wraps `zingo-cli`, and gives ZBooks shielded read access over HTTPS. |

## Authentication: three ways to sign in

Every flow ends the same way, with one `signIn()` call into NextAuth that mints a session. The user picks the flow their wallet supports.

**1. Signed-message paste.** The app shows a SIWZ message (an EIP-4361-style statement with domain, address, nonce, and timestamp). The user signs it in a wallet that supports message signing (zcashd, YWallet) and pastes the signature back. The server recovers the public key from the secp256k1 signature over the Zcash-magic-prefixed hash and checks that it matches the claimed address, plus the nonce, domain, and expiry. Instant, no on-chain cost, transparent addresses only.

**2. Memo-challenge (the default, and the Zcash-native one).** The server issues a challenge and renders a `zcash:` payment URI as a QR code, carrying either a unique amount (transparent service address) or a `SIWZ:<nonce>` memo (shielded service address). The user pays a tiny shielded amount from any wallet (Zodl, YWallet, Zingo). Usually within 5 to 15 seconds the transaction lands. For transparent service addresses, a free public explorer (3xpl + Blockchair fallback) matches the amount; for shielded service addresses, a VPS-hosted `zingo-cli` wrapper decrypts the memo using the incoming viewing key. Either way, the app matches the nonce and signs the user in. This works with every ZIP 321 wallet because it only relies on sending a normal payment.

**3. MetaMask + ChainSafe Zcash Snap.** The snap exposes a seed fingerprint and a unified full viewing key. The server HMAC-signs an envelope binding them to an identity and mints a session. One click, no QR, no on-chain fee. This path is the most ergonomic where the snap is available.

**Nonces are stateless.** Instead of storing `(nonce, expiry)` server-side, the server issues a token of the form `nonce.expiry.HMAC(secret, nonce.expiry)`. The client round-trips it, the server checks the HMAC and the expiry. Nothing to store, so it works on serverless with no database. The same pattern signs the memo-challenge token and the snap envelope.

## ZBooks accounting: from viewing key to P&L

1. **Sign in.** The first address ever to sign in becomes the admin, so a fresh deploy has someone who can manage the team. Later sign-ins join as viewers until promoted.
2. **Add viewing keys** on `/keys`. You paste a unified full viewing key (UFVK). ZBooks gets read-only access; the spending key never leaves the user's wallet. Each key has a birthday (the block to start scanning from), defaulting to a recent height so the first sync is fast.
3. **Sync.** ZBooks asks the VPS wrapper to scan the key. The wrapper runs `zingo-cli` against a public lightwalletd and returns the transaction history. Results are stored and shown on `/transactions`.
4. **Categorise.** Each transaction can be tagged (contractor, grant payout, expense, and so on). Shielded memos arrive as the first draft of the notes. Treasurers tag; viewers read.
5. **Report.** `/reports` renders a monthly profit and loss, contractor totals, and a CSV export shaped for QuickBooks and Xero. `/counterparties` lets you label an address once and have the friendly name appear everywhere. `/audit` records who did what.

## ZBooks payouts: pay the team in one batch

Payouts are restricted to admin and treasurer. The model is "ZBooks initiates and reconciles, it never custodies or sends." Steps:

1. **Payees.** Save a contributor once: a name and a Zcash address.
2. **Create a run** and pick the paying wallet (the treasury viewing key the run reconciles against).
3. **Add line items**: payee, amount, optional memo. Each line has a work status (completed or in progress). Only completed, unpaid lines go into the batch.
4. **Pre-flight.** Before showing the payment, ZBooks compares the treasury's spendable balance against the run total plus an estimated ZIP 317 fee, and refuses to present a batch the treasury cannot cover.
5. **Approve (optional M-of-N).** Workspaces can set a policy on `/settings/approvals` requiring more than one treasurer to greenlight a run. Each approver signs in with their own SIWZ identity and clicks Approve on the run; the ZIP 321 URI and the Pay button stay hidden until the threshold clears. Approvals are bound to the exact payable item set via a payload hash, so editing a line item invalidates older approvals and forces re-approval. With the default threshold of 1, this step is a no-op and the URI is available immediately.
6. **Pay.** ZBooks builds one multi-recipient ZIP 321 URI and shows it as a QR. The treasurer scans it in a multi-recipient wallet (today: YWallet, ZODL) and approves. One transaction pays everyone, which means one change note and one confirmation wait rather than one per contributor. Single-recipient wallets (Zingo, Cake, Brave) only pay the first line; for those the treasurer copies the URI and pays each recipient in turn.
7. **Reconcile.** ZBooks watches the treasury viewing key, finds the outgoing transaction, matches each output back to its line item by address and amount, and marks it paid. It also tags the matched transaction as a contractor expense and labels the recipient, so the payout posts straight into the P&L. This runs automatically when the run page loads and can be forced with a button right after paying.

The only manual fallback is a per-row "mark paid," for the rare case of paying from a wallet ZBooks is not watching.

## Infrastructure and trust

```
Browser / wallet
      |
      v
ZBooks (Next.js, NextAuth)            stateless, hosts free on Vercel or runs locally
      |
      |--- transparent path ---> public explorers (3xpl + Blockchair)
      |                          (no infra; SDK default)
      |
      |--- shielded path ---> HTTPS + bearer token
                              |
                              v
                       lightwallet-rpc wrapper  (a ~$3/mo VPS)
                              |  raw gRPC
                              v
                       public lightwalletd (zec.rocks, with mirror failover)
```

Transparent sign-in and accounting against transparent treasuries need no extra infrastructure. The shielded leg, used for shielded sign-in and UFVK-based accounting, is the only thing that needs the VPS.

- ZBooks holds no keys at all beyond what it stores in its data file: viewing keys, which are read-only.
- The VPS wrapper also only ever uses viewing keys. It reads; it never spends.
- Spending always happens in the user's own wallet. A payout is signed by the treasurer's wallet, not by ZBooks.
- The wrapper pins its lightwalletd endpoint with `--server` and fails over across a list (`zec.rocks`, then regional mirrors) on a transient error.

## Roles

- **Admin**: sets policy, manages the team, can do everything.
- **Treasurer**: tags transactions, manages keys, runs payouts.
- **Viewer**: reads transactions and reports. Cannot see payouts, since those expose the payee address book and amounts.

## One-line summary

Sign in by proving you hold a Zcash address or wallet, with no custody. Then watch a treasury through its viewing key, get books your accountant recognises, and pay your team in one batch transaction that the treasurer signs from their own wallet.
