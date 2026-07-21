# ZBooks: accounting and payouts for teams paid in ZEC

> Hackathon submission: the "QuickBooks for ZEC teams" most DAOs and grant recipients have been pasting txids into spreadsheets to avoid building.

Built on [Sign in with Zcash](../../README.md). Authentication is non-custodial. The app never sees a spending key, only signed messages.

## What it does

| Page | What you can do |
|---|---|
| `/` | Sign in with Zcash (paste flow + optional MetaMask Snap one-click). |
| `/keys` | Paste one or more UFVKs (read-only Unified Full Viewing Keys). Mark primary. Remove. |
| `/transactions` | See every tx synced from your keys. Tag by category. Add notes. |
| `/reports` | Monthly P&L. Top contractors. CSV export your accountant can drop into QuickBooks/Xero. |
| `/team` | Role-based access (admin / treasurer / viewer). First sign-in is admin. |
| `/payouts` | Build batch payout runs. Pre-flight balance, ZIP 321 multi-recipient URI, reconcile against the treasury UFVK. ZecBounties import. |
| `/settings/approvals` | M-of-N approval gate. Set a threshold and an approver allowlist; new runs require that many SIWZ-authenticated approvals before the Pay button unlocks. Optional Discord webhook. |

## Status

**Working today:**
- SIWZ sign-in end-to-end (paste flow universal; Snap path probes the upstream Zcash Snap RPC and gracefully falls back).
- UFVK paste + per-key transaction lists.
- Tagging UI, monthly P&L, CSV export.
- Multi-user team with three roles.
- Non-custodial batch payouts via ZIP 321 with auto-reconciliation against the treasury UFVK.
- Process-level M-of-N approval gate on payout runs. Per-run snapshot of the threshold, HMAC-bound to the exact payable item set, optional Discord pings.

**Stubbed (clearly marked):**
- Lightwalletd sync. Adding your first UFVK seeds a set of realistic-looking sample transactions so the rest of the flow is exercisable end-to-end. Replacing this stub with a real gRPC-web client to lightwalletd is a single function in [`src/lib/db.ts`](src/lib/db.ts).

## Run

```bash
pnpm install                                 # from repo root
cp apps/demo/.env.example apps/demo/.env.local
# generate a NEXTAUTH_SECRET:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
# paste it into apps/demo/.env.local

pnpm dev:zbooks
```

Open [http://localhost:3000](http://localhost:3000).

## Try the entire flow without a wallet

```bash
node scripts/e2e-signin.mjs
```

Synthesizes a fresh secp256k1 keypair → derives a real t1 mainnet address →
signs a SIWZ challenge → posts through NextAuth → adds a UFVK → confirms
the seeded transactions are visible → fetches the CSV export. Asserts at
each step and exits non-zero on failure.

## Architecture

```
src/lib/
├── db.ts             Tiny JSON-file store: ufvks, transactions, team (swap for Postgres anytime)
├── seed.ts           Sample shielded transactions (used when first UFVK is added)
├── ufvk.ts           Best-effort UFVK shape validator
├── auth.ts           NextAuth options + SiwzProvider
├── session.ts        currentUser() + role-gate helpers
└── reports.ts        monthlyPL + transactionsCsv

src/app/
├── (public)
│   └── page.tsx              Landing + sign-in
├── keys/                     UFVK management
├── transactions/             Synced tx list with inline tagging
├── reports/                  Monthly P&L + CSV download
├── team/                     Role management
└── api/
    ├── auth/[...nextauth]    SIWZ-backed NextAuth handler
    ├── siwz/nonce            Issues SIWZ nonces
    ├── keys                  CRUD for UFVKs
    ├── transactions/:id/tag  PATCH a tx category / notes
    ├── reports/export        CSV download
    └── team                  Role management
```

Folder is named `apps/demo` because it was the original SIWZ comments-wall
demo; the package itself is named `@zbooks/app`.
