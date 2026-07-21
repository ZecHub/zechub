# ZBooks

> Non-custodial accounting and structured batch payouts for Zcash teams.
> Built on SIWZ, a Zcash-native auth primitive also shipped in this repo.

**Live:** [zecbooks.vercel.app](https://zecbooks.vercel.app)
**Demo:** [Youtube](https://youtu.be/An8s-ca0ZxQ?si=dtTzs4Ozo5MCz4cQ)
**Track:** Accounting  

---

ZBooks solves a real problem for Zcash teams and DAOs. Treasurers currently paste txids into spreadsheets, try to remember what each payment was for, and pay contributors one by one. There is no clean audit trail and no good way to require multiple approvals before money leaves the treasury.

ZBooks fixes that. It reads the treasury through a Unified Full Viewing Key, lets you tag transactions, generates proper reports, and turns payouts into a structured process with multi-approval before anything hits the chain. The treasurer's own wallet signs every payment. ZBooks never holds spending keys.

## What it does

| | |
|---|---|
| **Accounting** | Read-only via Unified Full Viewing Key (UFVK). Categorise transactions, monthly P&L, CSV export for QuickBooks/Xero. Encrypted at rest with AES-256-GCM. |
| **Payouts** | Build a payout run by hand or import completed bounties from [ZEC-Bounties](https://bounties.zechub.wiki). One multi-recipient ZIP 321 QR pays everyone. |
| **Approvals** | M-of-N treasurer approvals before the payment URI is revealed. HMAC-bound to the exact payable item set, so editing any line invalidates older approvals. |
| **Reconciliation** | Auto-watches the treasury UFVK after broadcast. Lines flip to paid as the chain confirms. Outgoing tx posts straight into the books. |
| **Roles** | Admin, treasurer, viewer. First sign-in becomes admin. Owner-gated key mutation. |
| **Notifications** | Optional Discord webhook for "approval needed", "approval recorded", "cleared, ready to pay". |
| **Sign-in** | Three flows via SIWZ: memo-challenge (universal), signmessage paste, MetaMask Snap. |

## Try ZBooks locally

```bash
pnpm install
cp apps/demo/.env.example apps/demo/.env.local
# generate a NEXTAUTH_SECRET and paste it into apps/demo/.env.local:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

pnpm dev:zbooks
```

Open [http://localhost:3000](http://localhost:3000). With `SIWZ_DEMO=1` (the default), memo-challenge sign-in completes without a real on-chain payment so you can exercise the flow immediately. Set `SIWZ_DEMO=0` plus a `SIWZ_SERVICE_ADDRESS` you control to wire it to mainnet.

## How it uses the Zcash network

ZBooks talks to Zcash mainnet through these mechanisms:

1. **Memo-challenge authentication (ZIP 321).** Users send a tiny shielded payment with a one-time memo. The on-chain transaction itself proves address control. Spending key never reaches the app.
2. **Multi-recipient ZIP 321 payouts.** Each payout run becomes one shielded transaction the treasurer signs in their own wallet (YWallet or ZODL preferred). Single-recipient wallets fall back to per-line payment.
3. **Unified Full Viewing Key accounting (ZIP 316).** Read-only history pulled from the treasury's UFVK. Audit, categorise, report. UFVKs are encrypted at rest (AES-256-GCM, key derived from `NEXTAUTH_SECRET` via HKDF-SHA256).
4. **Fee estimation (ZIP 317).** Pre-flight check compares treasury spendable balance against the total payout plus estimated network fee before showing the payment QR.
5. **Light client via lightwalletd.** A Node wrapper on a VPS runs `zingo-cli` in lite mode and talks to public lightwalletd mirrors (`zec.rocks` + EU/NA failovers). No full Zcash node required.
6. **M-of-N approval gate.** Each payout requires the configured threshold of treasurer approvals via SIWZ identity before the ZIP 321 URI is revealed. HMAC-bound to the payable item set so edits invalidate older approvals. Designed to absorb FROST signing when wallet support matures.
7. **Auto-reconciliation against the treasury UFVK.** ZBooks polls the wallet after broadcast. As the multi-recipient transaction confirms on chain, line items flip to paid automatically and the outgoing tx posts into the books as a contractor expense.

Full architecture in [`docs/zbooks/architecture.md`](./docs/zbooks/architecture.md).

## What's in this repo

| Path | What it is |
|---|---|
| [`apps/demo`](./apps/demo) | **ZBooks** itself (Next.js 14, Turso, NextAuth). Folder is named `demo` for legacy reasons; the package is `@zbooks/app`. |
| [`apps/lightwallet-rpc`](./apps/lightwallet-rpc) | The `zingo-cli`-backed HTTPS wrapper for shielded UFVK reads. Multi-arch Docker image on GHCR. |
| [`apps/zecwall`](./apps/zecwall) | ZecWall: minimal SIWZ reference integration (Zcash-gated comments wall). |
| [`apps/site`](./apps/site) | The [siwz.vercel.app](https://siwz.vercel.app) landing page. |
| [`packages/siwz-core`](./packages/siwz-core) | SIWZ protocol primitives. Zero React/Next deps. |
| [`packages/siwz-react`](./packages/siwz-react) | SIWZ React components: `<SignInWithZcash />`, `<MemoSignIn />`, `<SignOut />`, `useSiwz()`. |
| [`packages/siwz-next-auth`](./packages/siwz-next-auth) | SIWZ NextAuth.js v4 / Auth.js v5 provider plus optional JWT export for non-Next.js backends. |
| [`docs/zbooks`](./docs/zbooks) | ZBooks docs: architecture, page-by-page guide, the payout system. |
| [`docs/siwz`](./docs/siwz) | SIWZ docs: protocol spec, integration, wallet matrix, deployment, roadmap. |
| [`docs/security.md`](./docs/security.md), [`docs/system-workflow.md`](./docs/system-workflow.md) | Cross-cutting: threat model and the integrated SIWZ + ZBooks workflow. |

## Foundation: SIWZ

ZBooks is built on SIWZ, the Zcash-native auth primitive that did not exist before. SIWZ ships independently as three npm packages so any Zcash app can use it:

```bash
npm i @siwz/core @siwz/react @siwz/next-auth
```

- **`@siwz/core`**: protocol primitives, ZIP 321 builder/parser, memo-challenge, pure-TS verification, JWT issue/verify. 76 unit tests.
- **`@siwz/react`**: components and hooks (`<MemoSignIn />`, `<SignInWithZcash />`, `<SignOut />`, `useSiwz()`).
- **`@siwz/next-auth`**: NextAuth credentials provider, stateless HMAC nonces, optional JWT export for non-Next.js backends (Express, FastAPI, Laravel, Phoenix, raw Lambda).

Landing site: [siwz.vercel.app](https://siwz.vercel.app). Design rationale and protocol spec live in [`docs/siwz/`](./docs/siwz/).

The memo-challenge flow is inspired by **zcashnames.com**. When I tried purchasing a name, I saw how they authenticate ownership: the user sends a small shielded payment with a unique memo/passcode, and the service scans the chain to verify it. That payment itself becomes the proof of address control.

SIWZ uses the same proven pattern. A tiny on-chain payment with a unique nonce in the memo **is** the authentication. It works with every shielded Zcash wallet that supports ZIP 321 because it only relies on sending a normal payment. Cost per sign-in is dust paid by the user (well under a cent). No `signmessage` required.


SIWZ actually supports **three sign-in methods** so users can choose whatever works best for their wallet:
- Memo-challenge (the universal one)
- Signed message paste
- MetaMask + ChainSafe Zcash Snap

`apps/zecwall` is the minimal SIWZ reference integration (a Zcash-gated comments wall). Live at [zecwall.vercel.app](https://zecwall.vercel.app); run locally with `pnpm --filter @siwz/zecwall dev`.

## Status

**Working today:**

- **ZBooks on mainnet.** UFVK accounting, transaction tagging, monthly P&L, CSV export, RBAC (admin / treasurer / viewer), M-of-N approval gate, ZecBounties import, auto-reconciliation, optional Discord webhook, AES-256-GCM encryption at rest.
- **SIWZ three sign-in flows.** Memo-challenge (universal), signmessage paste, MetaMask + ChainSafe Snap.
- **76 unit tests** across the three SIWZ packages.
- **Shielded memo decryption** via [`apps/lightwallet-rpc`](./apps/lightwallet-rpc) (multi-arch Docker on GHCR).
- **JWT export** for non-Next.js backends.
- **Live mainnet deploys**: [zecbooks.vercel.app](https://zecbooks.vercel.app), [zecwall.vercel.app](https://zecwall.vercel.app), [siwz.vercel.app](https://siwz.vercel.app).

**Where it goes next:**

- ZIP 304 Sapling signed messages via the existing `saplingVerifier` plug-point.
- NU6 + ZSAs as identity tokens (a fourth sign-in flow when the protocol ships).
- FROST threshold signing for payouts when consumer wallets support PCZT + FROST.
- PCZT one-click payouts for ZBooks treasurers.

Full roadmap and non-goals in [`docs/siwz/roadmap.md`](./docs/siwz/roadmap.md).

## License

MIT. Built for the ZecHub hackathon 3.0 2026.
