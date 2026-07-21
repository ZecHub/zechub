# Steward

### Hold shielded ZEC together. Recover it when a device is lost. Pass it on when you're gone.

*A threshold-custody protocol for shielded Zcash — built on Zcash Foundation FROST, and proven on mainnet.*

> ZecHub Hackathon 3.0 · **FROST track** · MIT

---

**It already works on-chain.** A real shielded, FROST-threshold-signed Zcash transaction — a **2-of-3**
quorum, built, Halo2-proved, co-signed, and **mined on mainnet**:

> **`6dfe556827dbdfa8eda7971a3e396d058f2487c81054ff7baa405e631b4ef496`**
> [view on Blockchair →](https://blockchair.com/zcash/transaction/6dfe556827dbdfa8eda7971a3e396d058f2487c81054ff7baa405e631b4ef496)

As far as we know, this is the first shielded-FROST-multisig transaction on Zcash mainnet from an
application like this. The whole point of the project is that this txid exists.

---

## Why it has to exist

On Zcash today, shielded funds answer to exactly **one** key. Lose it and the money is gone forever.
Share it and you've handed one person total control. And there is no way — none — to pass shielded ZEC
to an heir. Transparent chains have had multisig, recovery, and inheritance for years; **shielded**
Zcash has had none of it.

Steward splits a vault's Orchard spend authority into **`t`-of-`n` FROST shares** across people you
trust, then builds the missing human layer on top. Three capabilities, one protocol — the same three
words the demo closes on:

### 🔒 Held together — shielded multisig
No one moves the vault alone. A quorum of guardians co-signs **every** spend, each holding just one
share on their own device: a family account, a DAO or business treasury, a can't-spend-alone cold
vault. *Zcash has no consumer shielded-multisig product today.* Leave the dead-man's-switch **off** and
this is all you get — a clean `t`-of-`n` shielded wallet. Turn it **on** and you also get:

### ♻️ Recoverable — social recovery
Lose your device and `t` guardians restore you — repair the missing share **in place** (byte-identical
to the original), or sweep the vault to a fresh address. No lone seed phrase to lose in the first place.

### 🕊️ Passed on — inheritance
The owner sends signed **proof-of-life** heartbeats. If they ever lapse, the guardians release the vault
to the heir — and the release is a **real, threshold-signed payment, broadcast on mainnet**, not a key
handed over. Each guardian verifies the silence **itself**, on its own clock — so no relay, and no
impatient heir, can forge liveness or fake an absence.

Everything above is routed by a relay that is **untrusted**: it holds no shares and can never move
funds. Steward is a **protocol** — a spec + SDK any wallet can adopt — with an open **reference app**
that proves it end to end.

---

## How the trust actually holds

Exactly three things cross between components — the **FROST round messages**, the **64-byte RedPallas
signature**, and the **canonical heartbeat message**. Anything that speaks those interoperates. The
lifecycle:

1. **Keygen, once.** The owner's device is trusted dealer: generate the Orchard spend authority, `split`
   it `t`-of-`n` through even-Y normalization, derive the vault's Unified Address, mint an Ed25519
   heartbeat key, hand each guardian one **encrypted** share, and **discard the whole key**. The relay
   receives only public config.
2. **Heartbeat.** The owner posts signed `steward-heartbeat-v1 ‖ vault_id ‖ time` beats. Each guardian
   re-verifies the Ed25519 signature itself and computes `lapsed = now > last + interval + grace` on its
   **own** clock. A relay with no heartbeat key **cannot** fake liveness; a valid beat from any channel
   resets every guardian's clock.
3. **Ceremony.** A spend or release opens a session with a **real transaction sighash** and the ZIP-312
   randomizer α. Each guardian runs the two FROST rounds on-device (the share never leaves), and the
   coordinator aggregates a 64-byte signature verified against `rk = ak + [α]·G`. Inheritance releases
   are gated by each guardian's own heartbeat check.
4. **On-chain.** Construct a PCZT from the vault's **viewing key** (no secret) → Halo2-prove the
   `FixedPostNu6_2` Orchard circuit → apply the FROST signature inline → finalize → broadcast. Balances
   come from scanning the viewing key against any public lightwalletd/Zaino — **no full node required**.

To ship that pipeline we had to **migrate the signing stack to the NU6.2-native crates**
(`orchard 0.14`'s `FixedPostNu6_2` circuit, `pczt 0.7`, `zcash_protocol 0.9`…), because the ecosystem's
FROST/PCZT tooling still lags the NU6.2 hard fork's Orchard security change.

→ The full protocol contract lives in **[docs/SPEC.md](docs/SPEC.md)**.

---

## What runs where

A Rust workspace on the ZF FROST stack (`frost-core` / `frost-rerandomized` / `reddsa` RedPallas), plus
web + mobile clients. Secrets structurally never reach the relay or disk.

| Piece | What it is |
|---|---|
| **`steward-core`** | The crypto/policy **SDK** (native + WASM): keygen/`split` + even-Y, ZIP-312 re-randomized signing, repairable recovery, heartbeat sign/verify/lapse, the dead-man's-switch state machine. No tx construction, no network. |
| **`steward-coordinator`** | The **untrusted relay** + control plane: routes ceremonies, hosts the signed-heartbeat bulletin, persists **public config only**, and exposes the one-call spend / release helpers. Holds no shares. |
| **`steward-signer`** | The **isolated PCZT engine** (own lockfile, NU6.2 stack): construct → prove → **inline FROST sign** → finalize → broadcast, plus no-node viewing-key sync. |
| **`steward-guardian-wasm`** | The browser **guardian**: seal/open a share (Argon2id → XChaCha20-Poly1305), run the two FROST rounds, verify heartbeats — the `KeyPackage` never leaves WASM. |
| **`steward-ffi`** | The **mobile SDK**: UniFFI → Kotlin + Swift over `steward-core`, same sealed-share format as the web client. |
| **`steward-cli` · `steward-testvectors`** | Dev/demo driver + cross-implementation byte vectors (Rust ↔ TS parity). |
| **`web/steward`** | The **reference app** — one wordmark, two sides: **My vaults** (owner: seal, heartbeat, send, convene a release) and **Vaults I guard** (guardian: hold a share, stand watch, co-sign). Warm "Ironwood" design system. |

*(`web/guardian` and `web/owner-console` are the earlier split apps, superseded by `web/steward` and kept for reference.)*

---

## See it for yourself

```sh
./scripts/dev.sh          # coordinator + the unified app at http://localhost:5175
```

- **Prove it's correct (no chain needed):** `cargo test --workspace` and `./scripts/demo-lifecycle.sh`
  — 2-of-3 keygen + re-randomized signing verified against `rk`, a repaired share proven byte-identical,
  a full relay ceremony, and the dead-man's-switch gate.
- **Drive the flows:** open **My vaults**, seal a vault, open each guardian enrollment link in its own
  window, and run the payment / recovery / inheritance ceremonies.
- **Move real money, no node:** seal a Mainnet or Testnet vault, fund its `u1…`/`utest1…` address,
  **Sync**, then **Send a payment** (or, for an inheritance vault, let the heartbeat lapse and
  **Release**) — your guardians co-sign and it broadcasts to a txid.

→ Full run + on-chain walkthrough: **[docs/DEMO.md](docs/DEMO.md)**.

---

## Honest about v0.1

The novel part is the **application layer**, not the cryptography — the FROST re-randomized Orchard
signing is the Zcash Foundation's, and we build *on* it correctly rather than reinventing it. What
doesn't exist for shielded ZEC anywhere else is what Steward adds: guardian-verifiable inheritance,
social recovery, the untrusted-relay trust model, and a working shielded-multisig spend — landed on
mainnet.

What it is **not**, yet: keygen is trusted-dealer (DKG is the hardening path); recovery and inheritance
need guardians **online** (FROST is interactive — deliberate human friction); a compromised relay could
mislabel payment metadata, though the signature still binds the real transaction (SPEC §9); pre-signed
heartbeats are a griefing vector inherent to any liveness credential; the NU6.2 signing stack is
vendored ahead of upstream FROST tooling; and this is a **reference implementation, not audited for
production**.

---

## Go deeper

- **[docs/SPEC.md](docs/SPEC.md)** — the protocol contract: roles, ceremony, heartbeat, authorization, trust model.
- **[docs/INTEGRATION.md](docs/INTEGRATION.md)** — how a wallet or service adopts Steward: the integration surfaces, real API names, the one-call spend.
- **[docs/DEMO.md](docs/DEMO.md)** — run + test guide, from `cargo test` to a real on-chain send.
- **[docs/PROTOCOL.md](docs/PROTOCOL.md)** — internal build notes: the PCZT pipeline, crate versions, the NU6.2 stack, α-by-value.
- **[docs/SELF-HOST.md](docs/SELF-HOST.md)** — run your own relay (it's your infrastructure; it holds no secrets).

---

MIT licensed — see [LICENSE](LICENSE). Built for ZecHub Hackathon 3.0, FROST track.
