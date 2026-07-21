# Konclave

### The vault that decides together.

*Usable FROST threshold vaults for ordinary treasurers on Zcash: quorum payments and private
payroll. Private on the outside, transparent on the inside.*

> ZecHub Hackathon 3.0 · **FROST + Accounting** tracks · Apache-2.0 / MIT

- **Repository:** https://github.com/deegalabs/konclave
- **Live demo (browser, no setup):** https://konclave-demo.vercel.app
- **Full submission write-up:** https://github.com/deegalabs/konclave/blob/main/SUBMISSION.md

---

**It works on mainnet.** A 2-of-3 quorum payment, proposed and approved in the app, signed by a
real FROST ceremony, broadcast to Zcash mainnet, the key never reconstituted:

> **`43433a109d3f2a078c0a9269ccb156392ade7a1f7ac1532981611eda1e59a572`**
> [view on the explorer →](https://mainnet.zcashexplorer.app/transactions/43433a109d3f2a078c0a9269ccb156392ade7a1f7ac1532981611eda1e59a572)

(First slice, CLI Gate 1: [`f63ee64d…c522360`](https://mainnet.zcashexplorer.app/transactions/f63ee64d7bc086a8286631d03936ec2ca2ca57f4e4c63712fc95c1f02c522360).)

## Why it exists

Using FROST on Zcash today means a command line, several terminals, and copying hex between
participants by hand. The Zcash Foundation finished the cryptography; the missing piece is the
**human layer**. Konclave is that layer: a group creates a shared vault, and **no payment leaves
without a quorum** — without anyone ever holding the whole key.

## What you can do

- **Quorum payment** — propose → members approve → at quorum the vault signs (FROST) and
  broadcasts a shielded Orchard transaction. One click never moves money.
- **Private payroll** — one shielded Orchard transaction with N outputs, approved once; each
  payslip rides in an **encrypted memo** only its recipient can read.
- **Accounting** — a full internal ledger + an **itemized CSV export** (a payroll of N is N
  line-items). Transparent inside, private outside.

The vault is created by **real Distributed Key Generation** — the key is never assembled, at
creation or at signing. Receives only in Orchard (shielded), built against NU6.2.

## New: multi-device FROST in the browser

Aimed straight at the FROST track's "threshold signing wallets" idea: **separate devices create
and operate one vault entirely in the browser, over a blind relay, with no server ever seeing a
secret.** Two browser contexts run a real **DKG in WebAssembly** (the secret round-2 packages
sealed end-to-end with X25519 → HKDF → XChaCha20-Poly1305, so the relay stays blind), then
**produce a verifying FROST group signature together**, each device keeping only its own share.
To our knowledge, a first for Zcash. This is the path to "your key lives on your phone, the
platform never has access."

## Shared-custody safety: recovery + inheritance

A real shared vault must survive a lost device and an absent owner. Both are built on the same
FROST + blind-relay foundation and proven by tests:

- **Social recovery** — a **quorum rebuilds a lost member's share** (Repairable Threshold
  Scheme); the group key is untouched, no share is revealed, and the repaired share is
  byte-identical to the lost one (it then signs a verifying 2-of-3).
- **Inheritance / dead-man's-switch** — signed proof-of-life heartbeats; on a lapse past the
  window (plus a cancellable grace period), the quorum may **release** the vault to a named heir.

## Built on the Zcash Foundation's tools (no crypto reimplemented)

`frostd` · `frost-client` · `zcash-sign` (frost-tools), the reference `frost` crate,
`zcash-devtool`, and `librustzcash`. Konclave adds the usability, orchestration, and accounting
layer on top.

## Honest status

- ✅ **On mainnet:** a 2-of-3 quorum payment (FROST-signed, broadcast, txid above); vault by
  real DKG; shares sealed at rest.
- 🔬 **By dry-run** (signs, not yet broadcast): the private payroll (multi-output Orchard).
- 🌐 **In the browser, proven across tabs:** multi-device DKG + FROST signing over the blind
  relay. The signature is real; the message is a test digest, not yet a broadcast transaction.
- 🗺️ **Roadmap:** hosting the relay publicly (phone-to-phone), persisting the share on-device,
  real payroll broadcast, a single installable desktop binary.

**Tests:** 166 (orchestrator) + 7 (konclave-wasm) + 23 (UI). Security posture and honest limits
in [`SECURITY.md`](https://github.com/deegalabs/konclave/blob/main/SECURITY.md) and the
submission write-up.
