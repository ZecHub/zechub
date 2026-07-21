# Pendrake Watch

> A watch-only Zcash wallet for people and teams who keep books on shielded funds without holding spend authority. Paste a Unified Full Viewing Key and it syncs in the background, charts the balance against historical ZEC prices, and posts a desktop notification the moment a transaction lands. It never touches a spending key.

**Track:** Accounting

**Team:** [dorianvp](https://github.com/dorianvp), [joserngomez](https://github.com/joserngomez), [Micaela](https://ar.linkedin.com/in/micaelafernandez7)

**Repository:** https://github.com/auzum197/pendrake-watch

**Releases:** https://github.com/auzum197/pendrake-watch/releases

**Demo video:** https://www.youtube.com/watch?v=Hk5awvFrZuI

---

[![Pendrake Watch demo](https://img.youtube.com/vi/Hk5awvFrZuI/hqdefault.jpg)](https://www.youtube.com/watch?v=Hk5awvFrZuI)

## The problem it solves

Shielded Zcash keeps balances and payments off every public explorer. That privacy is the point, but it leaves whoever does the books with a bad trade: to watch funds arrive, read memos, or reconcile a balance, the usual move is to load the seed phrase into a full wallet. The person keeping the records ends up able to spend the treasury.

Pendrake Watch removes that trade. It accepts only a UFVK, so it can decrypt and display everything the wallet has received and spent, and it cannot move a single zatoshi. A treasurer reporting to a team, or a grantee reporting to a funder, gets full visibility with no spend risk.

The other problem is attention. A wallet app only tells you about a payment when you open it and wait for a sync. Pendrake ships a background daemon that syncs continuously, so a payment shows up as a desktop notification while the window is closed and the session is locked.

## What it is

A desktop app for Linux, macOS, and Windows (Tauri), paired with a background sync daemon.

- Import a UFVK with a birthday height or date. The daemon runs the initial scan, then follows the chain tip and notifies on each newly detected transaction ("Received 1.5 ZEC", "Sent 0.2 ZEC").
- A balance chart over selectable spans (week, month, year, all time) with a fiat value marked daily against historical prices. Prices are reconciled from several sources (CoinGecko, Coinbase, Kraken, plus a bundled historical tail) and carry a confidence flag when only one source covers a period. Price fetching is off until the user consents, since it reaches services beyond the indexer.
- A transaction list with per-note memos, and a notes view showing each shielded note and transparent UTXO, its pool, and whether it has been spent.
- Wallet files encrypted at rest behind a passphrase. The session lock returns the app to the unlock screen while sync and notifications keep running underneath.
- Discreet mode, which obscures amounts, dates, memos, and addresses everywhere they appear, including in notifications, for screen shares and shoulder surfers.

## How it uses the Zcash network

Pendrake connects to an indexer and syncs from the wallet's birthday using a zingolib fork. Decryption happens locally: the UFVK recovers the wallet's own Orchard and Sapling notes and memos on the user's machine, and nothing derived from the key leaves it. Transparent UTXOs belonging to the key are tracked alongside the shielded pools. It runs against Zcash mainnet with real viewing keys, and also supports regtest for development.

## Install

Grab an installer from the [releases](https://github.com/auzum197/pendrake-watch/releases). On first run, paste your UFVK and set a passphrase.

### macOS security warning

The DMG is currently unsigned and unnotarized, so macOS will flag it as being from an unidentified developer. To allow it:

1. Try to open the app normally (it will be blocked)
2. Go to **System Settings → Privacy & Security → Security**
3. Scroll down to the blocked app and click **Allow anyway**
4. Try opening again and click **Open**

Notarization is in progress and will land in a future release.

## Building from source

### Prerequisites

- Rust, pinned by `rust-toolchain.toml`
- Node and `pnpm` at the version in `package.json`
- [`just`](https://github.com/casey/just), the task runner
- `protoc` for zingolib's gRPC stubs
- Tauri v2 platform prerequisites: webkit2gtk on Linux, WebView2 on Windows, Xcode on macOS

The `crates/Cargo.lock` is committed and required (a yanked transitive dependency only resolves through it).

### Building

Install dependencies and start dev:

```bash
just install
just dev
```

`just dev` builds the release daemon and runs the GUI with hot reload. The daemon is built release because it does the heavy scanning.

For production, build and bundle:

```bash
just macos helper     # macOS only: build the Swift notification helper
just package          # Build release and create installers
```

The full list of tasks:

```bash
just dev              # GUI with hot reload
just check            # Typecheck frontend, build Rust
just fmt              # Format Rust code
just daemon           # Build pendraked only
just package          # Build release and bundle installers
just macos run        # macOS: build helper and run both apps
just macos helper     # macOS: rebuild the Swift helper after engine changes
just stop             # Stop background daemons (platform-specific)
```

Run `just` to list all tasks including platform-specific ones.

### Repository layout

- `crates/` — Rust workspace (pendrake-core, pendrake-ipc, pendrake-daemon, pendrake-ffi)
- `src/` and `src-tauri/` — Tauri GUI
- `platform/macos/` — Swift helper app
- `scripts/` — Build scripts
- [AGENTS.md](AGENTS.md) — Contributor conventions

### Architecture

`pendrake-core` owns the wallet file and runs the sync loop. Two hosts embed it:

- `pendraked` (Linux, Windows, macOS dev) — the standalone daemon binary
- `PendrakeSync.app` (macOS) — a Swift app embedding the daemon through uniffi, needed for clickable notifications

### macOS dev notes

`pendraked` notifies but clicking does nothing, because a loose binary cannot drive `UNUserNotificationCenter`. For clickable notifications during dev, build the Swift helper with `just macos helper` (or `just macos helper debug` for a faster Swift-only rebuild). The helper is a frozen copy of the engine, so rebuild it after any pendrake-core changes.

Notifications only open the transaction screen when the registered app bundle is running (the installed app or `just macos run`). Under `just dev` a click focuses the window but does not navigate.

### Environment

- `PENDRAKE_DATA_DIR` — directory for wallet, socket, and lock (both GUI and daemon read it)
- `PENDRAKED_BIN` — explicit path to the pendraked binary
- `PENDRAKE_SYNC_APP` — explicit path to PendrakeSync.app on macOS

### Tests and checks

```bash
cd crates && cargo test
pnpm test
just check
```

---

Built for ZecHub Hackathon 3.0, Accounting track. MIT licensed.
