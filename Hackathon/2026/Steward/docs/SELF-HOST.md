# Run your own relay

The Steward coordinator is a small HTTP service that **relays** a FROST signing
ceremony between guardians and **remembers your vaults' public config**. It is not a
custodian — it holds **no secret shares** — so running your own is cheap and low-stakes.
You already ran it during the demo:

```sh
cargo run -p steward-coordinator          # binds 127.0.0.1:8080
# or a fixed port:  cargo run -p steward-coordinator -- --port 8081
```

## It's your infrastructure, and it holds no secrets
A guardian's secret share lives **on the guardian's own device**, sealed with their
passphrase — it is never sent to the coordinator. The coordinator only ever sees, and
only ever stores, **public** data: the group verifying key (`ak`), the guardian ids,
the dead-man's-switch policy, the heir address, the network, the derived receiving
address/UFVK, the last balance, and the **signed heartbeat bulletin**. Because it holds
no shares, a coordinator you run (or one a friend runs for you) can relay ceremonies and
serve status, but it can **never move your money on its own**.

> Demo vaults (`POST /demo/vault`) are the one exception, and only in RAM: the demo
> "trusted-dealer" path keeps the freshly-split shares in memory so the owner console can
> co-sign standalone with no external guardians. Those shares are **never written to
> disk** (see below), and a production vault (`POST /vault`) never has them at all.

## Persisting your vaults — `STEWARD_DATA_DIR`
By default the coordinator stores vault state in `./steward-coordinator-data/vaults.json`
(relative to where you launch it). Point it anywhere with an env var:

```sh
STEWARD_DATA_DIR=/var/lib/steward cargo run -p steward-coordinator
```

- On **startup** it loads that file, so a restart never orphans a vault.
- On **every mutation** (create, heartbeat, address/balance cache, policy change) it
  writes the file **atomically** (temp file → `fsync` → rename), so a crash mid-write
  cannot corrupt it.
- The file is **public config only** — grep it: you will find `verifying_shares` (those
  are *public* commitments) but never a `signing_share` or `demo_signers`. Secrets are
  never on disk.
- **Consequence, stated plainly:** after a restart a *demo* vault can no longer auto-sign
  in-process (its RAM-only shares are gone — re-seed it to demo again). Its public config
  and heartbeat survive, and a **real-guardian relay ceremony is unaffected** — real
  guardians bring their own shares.

Back it up like any config file. Losing it loses only convenience (cached addresses, the
last heartbeat bulletin), not custody — the guardians and their shares are the vault.
Add your data dir to `.gitignore` (the default `steward-coordinator-data/` already is).

## It is an *untrusted* relay — verify, don't trust
Treat the coordinator as a dumb postbox, even your own:

- **Heartbeats are signed.** The owner signs each proof-of-life with a key the coordinator
  never holds; a guardian **re-verifies** the bulletin (`GET /vault/:id/heartbeat`) against
  the owner's pubkey and computes "is the switch tripped?" on its **own** clock before ever
  arming a release. A malicious relay cannot forge liveness or fake a lapse.
- **You verify what you sign.** In a relay ceremony each guardian is shown the exact
  sighash and the plain-words purpose, and signs that — the aggregated signature is checked
  against `rk = ak + [α]G` before it is accepted. A tampering relay makes a ceremony fail
  *safely* (a bad share is rejected), never mint a bad signature.
- **What a relay could still do** in this MVP is see the (non-secret) round messages and
  drop/misroute them — a denial-of-service, not a theft. The fix is transport encryption
  (guardian-to-guardian Noise) which slots in behind the same `Transport` seam without
  touching the ceremony; see `docs/PROTOCOL.md` §4 and the trust note in `http.rs`.

The one-line summary: **run the relay yourself for uptime and privacy, but you never have
to trust it — the guardians and the owner's signatures are the security, and they check
their own work.**
