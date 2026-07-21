# Zcash PDV — Shielded Point of Sale

A desktop point-of-sale terminal for accepting **Zcash shielded (Orchard) payments**. The cashier terminal generates a payment request, shows a QR code, and automatically detects the incoming payment on-chain — **without ever holding spend authority**.

Built for the **ZecHub Hackathon 2026** · Track: **Accounting** (payment management system for teams handling ZEC).

---

## The problem

A merchant who wants to accept ZEC needs a simple checkout terminal. But putting a spending wallet (a seed phrase) on a cashier's machine is dangerous: a compromised terminal, or a dishonest operator, could drain the funds.

Zcash PDV solves this by giving the terminal a **Unified Full Viewing Key (UFVK)** only. The terminal can *watch* for incoming payments but can *never spend*. It's the payment-desk equivalent of a read-only camera pointed at the till.

---

## What it does

- Accepts an amount in **ZEC or USD** (live conversion, with quick-amount presets).
- Derives a **fresh Orchard shielded address per charge** and renders a **ZIP-321** payment URI as a QR code.
- Monitors the Zcash **mainnet** through a GraphQL wallet backend and **detects the payment automatically** once it confirms on-chain.
- **Cross-checks the on-chain amount against the expected amount**, flagging underpayments.
- Shows a live dashboard: balance, today's takings, payment count, and a list of on-chain transactions with clickable txids that open in a block explorer.
- Shows USD equivalents throughout (toggleable), using a live ZEC/USD rate.

---

## Security model

Security is the core of this project.

**Watch-only by design.** The terminal is registered with a UFVK, which is imported into the wallet backend as a watch-only account. There is no seed and no spend key anywhere in the app. A stolen terminal cannot move funds.

**UFVK encrypted at rest.** The viewing key is stored encrypted with **AES-256-GCM**. The encryption key is derived from an admin password using **Argon2id** and is *never persisted*. Copying the local `pdv.db` file yields nothing without the admin password — this protects against the cashier operator, not just outside attackers.

**Immutable registration.** A wallet is registered once. There is no update or delete path exposed to the cashier, so an operator cannot swap the viewing key.

**Authenticated payment correlation.** Each charge gets a unique Orchard address. Payments are matched primarily **by address**, with an **HMAC-authenticated memo** (ZIP-321) as a secondary check. The received on-chain amount is compared against the expected amount, so tampering or underpayment is detected rather than silently accepted.

**Privacy preserving.** All payments are Orchard shielded. A new diversified address per charge avoids address reuse.

---

## Architecture

```
┌─────────────────────────────────────────────┐
│  Electron app (single cashier terminal)      │
│                                              │
│  Renderer (React)          Main process      │
│  ────────────────          ────────────      │
│  Dashboard / Charge  <IPC>  UFVK in memory   │
│  Settings / QR              Payment watcher  │
│                             AES-GCM / Argon2 │
│                                    │         │
│                          Prisma / SQLite     │
│                          (encrypted UFVK,    │
│                           payment records)   │
└──────────────────────────────────┼──────────┘
                                    │ GraphQL
                          ┌─────────▼─────────┐
                          │       zkool       │
                          │  GraphQL backend  │
                          └─────────┬─────────┘
                                    │
                          ┌─────────▼─────────┐
                          │   Zcash mainnet   │
                          └───────────────────┘
```

The decrypted UFVK and the HMAC key live **only in the main process memory** after unlock, and are never exposed to the renderer (the cashier UI).

### Stack

Electron · React · TypeScript · Tailwind CSS · Prisma (SQLite) · graphql-request · Argon2id · AES-256-GCM · qrcode.

---

## Prerequisites

- **Node.js 18+**
- A running **Zcash GraphQL wallet backend** (Zkool_Graphql by Hanh), reachable at an HTTP endpoint (default `http://localhost:8000/graphql`). This is what connects to the Zcash mainnet.
- A **UFVK** for the account you want to monitor.

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Create the local database
npx prisma migrate dev --name init

# 3. (optional) point to your GraphQL backend if not on the default port
#    set the HANH_GRAPHQL_URL environment variable, e.g.
#    HANH_GRAPHQL_URL=http://localhost:8000/graphql

# 4. Run in development
npm run dev
```

To build a distributable:

```bash
npm run build
```

---

## Usage

1. **Register the wallet (one time).** On first launch, paste your UFVK and set an admin password. The app imports the account into the wallet backend as watch-only, encrypts the UFVK, and stores it. This step cannot be undone from the UI.
2. **Unlock.** Enter the admin password to start a session. This decrypts the UFVK into memory and starts the payment watcher.
3. **Create a charge.** Click *New charge*, enter an amount in ZEC or USD (or tap a preset), and generate the QR.
4. **Customer pays.** The customer scans the QR with any Zcash wallet that supports shielded payments and pays to the unique address shown.
5. **Automatic confirmation.** Once the payment confirms on-chain, the terminal detects it, shows a *Payment received* confirmation, and the transaction appears on the dashboard. Underpayments are flagged.

Settings (gear icon) let you toggle USD display and adjust window transparency.

---

## Mainnet interaction

This project interacts with the **Zcash mainnet**: it derives real Orchard addresses, builds real ZIP-321 payment requests, and detects real confirmed transactions via the viewing key. Payment detection is driven by actual on-chain notes read through the wallet backend.

---

## Notes and limitations

- The terminal is **receive-only** by design; it cannot send funds. This is a feature, not a limitation.
- USD values require internet access for the live rate; if offline, amounts are shown in ZEC only.
- Payment matching relies on paying to the exact per-charge address shown in the QR. Reusing an old QR will not match a new charge.

---

## License

MIT — see [LICENSE](./LICENSE).
