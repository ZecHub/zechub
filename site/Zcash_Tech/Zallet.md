<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zallet is a full-node Zcash wallet written in Rust. It is the replacement for the wallet that used to be embedded in `zcashd`. After `zcashd` reached its End-of-Support halt on 18 July 2026 at block height 3417100, consensus and wallet duties were split: **Zebra** or **Zakura** validate the chain, and **Zallet** holds keys, scans notes, and exposes the wallet JSON-RPC.

Zallet is currently in **beta**. It has not been fully reviewed. Breaking changes may require deleting and recreating the wallet. Do not treat it as production custody for large amounts of ZEC without reading the security warnings in [The Zallet Book](https://zcash.github.io/zallet/).

---

## TL;DR

- Zallet is a **full-node RPC wallet**, not a mobile light wallet and not a consensus node.
- It replaces the wallet half of `zcashd`. The node half is [Zebra](Zebra_Full_Node.md) or [Zakura](Zakura_Node.md).
- Written in **Rust**, dual-licensed MIT / Apache-2.0, maintained in [zcash/zallet](https://github.com/zcash/zallet).
- Latest published release as of late August 2026: **v0.1.0-beta.3**.
- Talks to chain data through one of two backends: **zebra-state** (direct `ReadStateService` against a local `zebrad`) or **Zaino**.
- Exposes a **zcashd-compatible JSON-RPC** subset. Some methods changed; some were omitted on purpose.
- Key material is always encrypted with **age**. Transaction history, addresses, and viewing keys sit in the clear in `wallet.db`.
- Ships three binaries in one signed archive: `zallet` (launcher), `zallet-zebra`, and `zallet-zaino`.
- Official docs: [The Zallet Book](https://zcash.github.io/zallet/).

---

## Why Zallet exists

`zcashd` bundled a Bitcoin Core–derived consensus node and a wallet in one process. That design is gone.

| Role | Old stack | Current stack |
|------|-----------|---------------|
| Consensus / P2P | `zcashd` | Zebra (`zebrad`) or Zakura |
| Wallet / keys / balances | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| Light-client indexer | `lightwalletd` | Zaino or `lightwalletd` |

Splitting the wallet out of the node means:

- Node software can be swapped (Zebra vs Zakura) without moving keys.
- Wallet scanning and spend authority live in a process that can be locked down separately.
- RPC semantics can evolve toward ZIP 32 accounts, Unified Addresses, and PCZTs instead of staying frozen on `zcashd` quirks.

Zallet is the wallet intended for operators who previously ran `zcashd` as a hot wallet, an exchange backend, a faucet, or a mining payout wallet.

---

## Status

Zallet is in **beta**.

What that means in practice:

- Breaking changes can land in any beta. You may have to delete the data directory and start again.
- Not every `zcashd` wallet RPC has been ported.
- Semantics of some ported methods differ from `zcashd`. Integrations must read the [altered-semantics page](https://zcash.github.io/zallet/zcashd/json_rpc.html).
- The crates are under development and have not been fully reviewed.
- Zallet is **not** a Rust library. There are no guarantees if you depend on it as one.

Feedback goes to [GitHub issues](https://github.com/zcash/zallet/issues/new) or the `#wallet-dev` channel on the [Zcash R&D Discord](https://discord.gg/xpzPR53xtU).

A later stable phase is planned once the intended RPC surface exists. Callers will then be expected to migrate onto Zallet’s methods, including the documented semantic differences.

---

## Architecture

Zallet is split across three Cargo workspaces so the two chain backends can track different dependency graphs.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

All three binaries open the **same** `wallet.db`. The launcher picks a backend at runtime; you do not recompile to switch.

Typical deployment:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet is a **full-node wallet**: it expects a local validating node. It is not a light client. For light wallets and compact-block servers, see [Zaino](Zaino.md) and [Lightwallet Nodes](Lightwallet_Nodes.md).

The Zcash Foundation’s [Z3](https://github.com/ZcashFoundation/z3) compose stack runs Zebra + Zallet together, with optional standalone Zaino for external light clients.

---

## Accounts, addresses, and keys

Zallet is built around ZIP 32 accounts, not `zcashd`’s single implicit account.

- A wallet can hold **multiple BIP 39 mnemonics**. Each mnemonic is an independent spend root, identified by a **seed fingerprint** (`zip32seedfp1…`).
- **Accounts** are derived from a seed with a ZIP 32 account index. Inside one Zallet instance they also have a local **UUID**. The portable identity of an account is `(seedfp, account index)`.
- Addresses are **ZIP 316 Unified Addresses**, produced with `z_getaddressforaccount`. One account can have many diversified addresses; shielded receivers are not linkable on-chain.
- Imported spending keys (`z_importkey`) and watch-only addresses (`z_importaddress`) become UUID accounts that no mnemonic covers.
- Viewing keys can be exported and imported (`z_exportviewingkey`, `z_importviewingkey`), including unified full viewing keys and incoming viewing keys.

`getnewaddress` is not implemented. Use `z_getnewaccount` and `z_getaddressforaccount`.

If `keystore.require_backup` is on (the migrated form of `zcashd`’s `walletrequirebackup`), Zallet refuses to derive new spend authority from a mnemonic whose backup has not been confirmed.

---

## Encryption and backups

Key material is **always** encrypted. There is no unencrypted mode and no `encryptwallet` RPC — that `zcashd` method was never fully supported.

- Setup creates an **age** identity, default path `{datadir}/encryption-identity.txt`.
- Mnemonics and imported spending keys are stored as age ciphertexts in `wallet.db`.
- The rest of the database is **not** encrypted. History, addresses, and viewing keys are readable if someone gets the file.
- The identity can be passphrase-wrapped (`generate-encryption-identity -p`). Unlock with the `walletpassphrase` RPC; lock with `walletlock`.
- Losing the identity file or its passphrase makes spending keys unrecoverable. Back up the identity, every mnemonic, and (separately, encrypted) any `wallet.db` copy you keep.

Copying `wallet.db` while Zallet is running is not a safe backup. SQLite can tear. Prefer a stopped process, or wait for an official online-backup command.

---

## JSON-RPC

Zallet implements a subset of the `zcashd` wallet RPCs over HTTP with Basic auth. Bind to loopback. Remote use should go through an encrypted tunnel. `rpc.allow_insecure_remote_bind` exists and is unsafe.

Notable differences from `zcashd`:

- Balance fields on `getwalletinfo` are empty. Use `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`.
- Fees follow **ZIP 317**. There is no `settxfee`.
- Spend construction is moving onto **PCZTs** (Partially Created Zcash Transactions, ZIP 374). PCZT RPCs landed in the beta series.
- A global **sync lock** blocks balance and spend RPCs while the wallet is catching up or recovering from a reorg (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

Intentionally omitted methods include `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet`, and `encryptwallet`. Replacements are listed in the [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html).

---

## Getting started

Official install paths (Debian packages, Docker, release binaries) are in the [installation guide](https://zcash.github.io/zallet/guide/installation/index.html). Release archives are named `zallet-<version>-<arch>.tar.gz` and contain all three binaries.

Minimal new-wallet flow:

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, backend, indexer / read-state, rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

Point `[indexer]` at a local `zebrad` JSON-RPC endpoint. The zebra backend also wants `[indexer.read_state_service]` and a `zebrad` built with the indexer feature so Zallet can read chain state directly.

Reproducible images can be built with [StageX](https://codeberg.org/stagex/stagex/) (Docker 25+, containerd image store, GNU Make).

---

## Migrating from zcashd

Keep the old `zcashd` datadir until you have confirmed balances and a tested restore.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` is only in builds with the `zcashd-import` feature. Reading `wallet.dat` needs `db_dump` from **Berkeley DB 6.2**, the version `zcashd` used.

Step-by-step operator notes: [Migration Guide: zcashd to Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## How Zallet relates to other software

| | Zallet | zecd | Zashi / ZODL / YWallet | Zebra / Zakura | Zaino |
|--|--------|------|------------------------|----------------|-------|
| What it is | Full-node RPC wallet | Shielded-first wallet server | End-user wallets | Consensus node | Indexer / lightwalletd replacement |
| Replaces | `zcashd` wallet | Not a drop-in `zcashd` clone | Mobile/desktop apps | `zcashd` node | `lightwalletd` |
| Needs a local node | Yes | Yes (Zebra by default) | No (light client) | It *is* the node | Yes |
| zcashd RPC compat | Designed as the compat path | Small chosen subset only | N/A | Partial / Zakura compat mode | Different API |
| Custody model | Operator holds keys in `wallet.db` | Seed-recoverable server | User device keys | No wallet | No keys |

Zallet and **zecd** can both sit in front of Zebra. Pick Zallet when you need the `z_*` wallet surface and a migration path from `wallet.dat`. Pick zecd when you want a shielded-first server that is explicitly *not* a `zcashd` clone.

There is a separate consumer product at [zallet.io](https://www.zallet.io/) that reuses the name. That app is not this project.

---

## Related pages

- [Full Nodes](Full_Nodes.md) — Zebra, Zakura, and the retired `zcashd` node
- [Zebra Full Node](Zebra_Full_Node.md) — the node Zallet’s default backend reads
- [Zakura Node](Zakura_Node.md) — alternative validating node
- [Zaino](Zaino.md) — indexer backend and light-client server
- [ZECD](ZECD.md) — another wallet-server design on librustzcash
- [Zcash Wallet Syncing](Zcash_Wallet_Syncing.md) — how shielded wallets scan the chain
- [Viewing Keys](Viewing_Keys.md)

## Resources

- [The Zallet Book](https://zcash.github.io/zallet/)
- [zcash/zallet on GitHub](https://github.com/zcash/zallet)
- [Releases](https://github.com/zcash/zallet/releases)
- [JSON-RPC altered semantics](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub Raspberry Pi guide (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + Zallet compose stack)](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
