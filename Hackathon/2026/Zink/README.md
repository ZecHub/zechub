# Zink

> Non-custodial payment links for shielded ZEC. Every invoice gets a fresh
> Orchard-only address, reconciled through a viewing key that can never spend.

**Repo:** [github.com/KaranSinghBisht/zink](https://github.com/KaranSinghBisht/zink)
**Demo:** https://youtu.be/DI69ZiJnaUA
**Track:** Accounting (payment management)
**License:** MIT

---

A crypto payment link is just your address. Anyone who pays you can read your balance, your revenue, and every other customer who ever paid you. Stripe fixes that by holding your money. Zcash fixes it in the protocol.

Zink is a Stripe-style payment link for Zcash that keeps the convenience and drops the graph. The merchant configures a **Unified Full Viewing Key** — never a spending key. Every invoice derives a **fresh Orchard-only diversified address** (ZIP-316), so no customer can connect an invoice to the merchant's balance, history, or to each other. The invoice reference travels in an **encrypted memo**, so the ledger reconciles itself with zero public metadata.

The server can watch payments arrive. It cannot spend. Non-custodial by construction, not by promise.

## What it does

| | |
|---|---|
| **Unlinkable receivables** | One UFVK derives billions of shielded addresses. Each payment link gets its own, so invoices share no public address-level link. |
| **View-only by construction** | Zink holds viewing capability only. No key on the server can move money. Fails closed if merchant auth is missing. |
| **ZIP-321 checkout** | The QR encodes address, amount, and an encrypted `zink:<id>` reference. Scan and pay from Zashi or YWallet. |
| **Self-reconciling ledger** | A view-only wallet syncs mainnet, matches address + amount + memo, and clears the invoice. CSV export for the books. |
| **Settlement means mined** | An invoice only stamps PAID once the tx is mined at the configured confirmation depth. Mempool activity never settles a link. |

## Zcash mainnet

Zink runs against **Zcash mainnet** through a view-only wallet (vendored `zcash-devtool`, connecting over Tor by default). Addresses in the demo are real mainnet `u1…` Unified Addresses derived live from the configured viewing key, using a local patch that adds `--shielded-only` derivation (`UnifiedAddressRequest::SHIELDED`) so links are Orchard-only rather than exposing a transparent receiver. The patch is included at `patches/zcash-devtool-zink.patch` and CI verifies it applies to the pinned upstream commit.

## Honest status

The create, derive, watch, and reconcile paths are implemented and the wallet syncs mainnet live. **A cleared payment is not demonstrated in the demo video** — I did not have funded ZEC available before the deadline, so the recording shows the ledger watching mainnet rather than a mined settlement. The detection query and PAID transition are in the codebase and documented, but they have not been proven end-to-end against a real mined payment. I'd rather say that plainly than imply a clearing that isn't on tape.

Other known limits, documented in the repo: single-merchant; SQLite plus an interval poller assume one persistent Node process; paid invoices are not auto-reverted after a deep reorg; upstream `zcash-devtool` describes itself as a prototype. A UFVK cannot spend but still reveals shielded transaction metadata, so the view wallet must be isolated.

## Setup

See the [main repo README](https://github.com/KaranSinghBisht/zink#readme) for full setup, including wallet creation, the devtool bootstrap script, and network configuration (`ZINK_NETWORK=main|test`).

```bash
git clone https://github.com/KaranSinghBisht/zink
cd zink && ./scripts/bootstrap-devtool.sh
cd web && pnpm install && cp .env.example .env.local
# configure ZINK_WALLET_DIR + ZINK_ADMIN_TOKEN, then:
pnpm dev
```
