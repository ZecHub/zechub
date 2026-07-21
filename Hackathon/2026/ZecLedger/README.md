# ZecLedger

**Track:** Accounting

**Team:** [vancube](https://x.com/AmunnadiG) (GitHub: [vancube2](https://github.com/vancube2))

**Repository:** https://github.com/vancube2/zecledger

**Public dashboard (network research):** https://zecledger-web.vercel.app/

**Demo video:** https://youtu.be/7emZKHAH7TQ

## What it is

ZecLedger is a read-only command-line tool for doing real accounting on shielded Zcash funds. It works entirely from a viewing key, never a spending key, so it can read your shielded transaction history and produce books, reconciliations, cost-basis reports, and privacy checks, while remaining unable to move any funds.

## The problem it solves

Zcash keeps payments private through shielded transactions, which is the point. But that privacy creates a real accounting problem: if your transactions are encrypted and absent from any public explorer, how do you keep books, work out gains for tax, or reconcile invoices? Existing crypto accounting tools assume a transparent chain they can read. They do not work for shielded ZEC.

ZecLedger fills that gap. It is built for the people and teams the Accounting track describes: anyone who receives or holds ZEC privately and still needs to keep honest records.

## How it uses the Zcash network

ZecLedger connects to a Zcash lightwalletd server and syncs a wallet from a Unified Full Viewing Key. On mainnet it connects to the mainnet lightwalletd endpoint, scans the chain from the wallet birthday height, and decrypts the user's own shielded transactions locally using the viewing key.

From that synced mainnet data it reads shielded balances per pool (Sapling, Orchard, transparent), the full transaction history including memos, and uses those records for its accounting features. It has been verified against Zcash mainnet with a real viewing key.

It also generates ZIP-321 payment request URIs, the Zcash standard for payment requests, so a user can ask to be paid without the tool ever holding a spending key.

A companion public dashboard (linked above) presents live network-level research from public Zcash data: the shield rate, network and fee health, and transparent address lookups. It touches only public data and never handles keys. The private accounting described here runs in the local command-line tool, where the viewing key stays on the user's machine.

## Features

- **Read-only by design.** The viewing key is held in memory only, never written to disk, never sent to a server.
- **Balance and history.** Shielded balance per pool and full transaction history with decoded memos, read from mainnet.
- **Cost-basis and gains.** Realised gain/loss using FIFO, LIFO, or average cost, with holding period in days. Because shielded transactions keep price data off-chain, prices are captured locally (manually or via an optional fetch).
- **Reconciliation.** Records expected payments and checks them against received history, flagging partial matches for review rather than confirming them falsely.
- **Payment requests.** Generates standard ZIP-321 URIs to hand to a payer.
- **Privacy check.** Reviews pool usage and amounts for privacy risks.
- **Optional query helper.** An opt-in feature that answers plain-language questions about the wallet. It shows exactly what aggregate data would leave the machine and requires explicit confirmation before sending anything. No addresses or memos are ever included.

## Setup and usage

Requirements: a recent Rust toolchain and `protoc`.

```bash
git clone https://github.com/vancube2/zecledger
cd zecledger
cargo build --release
cargo install --path .
```

Then:

```bash
# Sync from mainnet (prompts for your viewing key and birthday height)
zecledger sync

# Shielded balance
zecledger balance

# Transaction history with memos
zecledger history

# Cost-basis report
zecledger cost-basis --method fifo --fetch-prices
```

Use a wallet birthday height from before your first transaction so the scan covers all of your activity. The viewing key is used for that session only and is never stored. Full documentation is in the repository README.

## Licensing

MIT. Open source.
