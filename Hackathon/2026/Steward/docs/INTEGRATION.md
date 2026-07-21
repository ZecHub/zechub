# Integrating Steward

How a wallet or service adopts the [Steward Protocol](SPEC.md). Steward ships as an SDK, not a
hosted product — you embed the pieces you need. There are four integration surfaces; pick the ones
your product plays.

| You want to… | Embed |
|---|---|
| let users **be a guardian** | `steward-guardian-wasm` (the guardian client) |
| let users **own/create a vault** | `steward-core` + the signer's address derivation |
| **route ceremonies** for others | the relay (self-hostable coordinator) |
| **spend/release** on-chain | the signer (PCZT pipeline) |

All secret material stays on the participant's device. The relay never holds a share.

---

## 1. `steward-core` — the crypto/policy SDK (Rust, compiles to WASM)

No transaction construction, no network — just the primitives.

**Keygen (owner, at setup):**
```rust
use steward_core::keys::split_authority;
// `ask` is the Orchard spend-authorizing key (a RedPallas SigningKey).
let vault = split_authority(&ask, n /*=3*/, t /*=2*/, &mut rng)?;
// vault.public_key_package  — publish this (the FROST group key = Orchard `ak`)
// vault.shares              — one encrypted share per guardian; then DROP `ask`
```

**Re-randomized signing (the ceremony, §5 of the spec):**
```rust
use steward_core::sign::{commit, signing_package, sign_share, aggregate, randomizer_from_le_bytes};
let (nonces, commitments) = commit(&key_package, &mut rng);          // round 1 (per guardian)
let pkg = signing_package(all_commitments, &sighash);               // coordinator
let alpha = randomizer_from_le_bytes(&alpha_le)?;                    // α comes from the signer (the Orchard action), by value
let share = sign_share(&sighash, &alpha, &nonces, &key_package, &pkg)?; // round 2 (per guardian)
let sig = aggregate(&sighash, &alpha, &pkg, &shares, &public_key_package)?; // → 64-byte RedPallas sig
```

**Heartbeat (proof-of-life, §6):**
```rust
use steward_core::heartbeat::{sign_heartbeat_hex, verify_heartbeat_hex, public_key_hex, is_lapsed};
let pubkey = public_key_hex(&owner_hb_secret_hex)?;                  // record on the vault at setup
let beat   = sign_heartbeat_hex(&owner_hb_secret_hex, vault_id, now)?; // owner: "I'm alive"
// guardian, independently, before arming an InheritanceRelease:
let ok = verify_heartbeat_hex(&pubkey, vault_id, signed_time, &beat)
      && is_lapsed(signed_time, interval, grace, my_now);           // arm ONLY if verified AND lapsed
```

**Social recovery (§8):** `recovery::repair_lost_share(helper_key_packages, public_key_package, lost, rng)`
regenerates a lost share without reconstructing `ask`.

**Policy (§7):** `policy::{HeartbeatPolicy, VaultState}` — the dead-man's-switch state machine.

## 2. `steward-guardian-wasm` — be a guardian (browser/JS)

A wallet embeds this so a user can hold a share and co-sign, on-device. The `KeyPackage` never
leaves WASM memory; the TS never parses FROST.

```ts
import init, { seal_share, open_guardian } from './steward_guardian_wasm.js'
await init()

// enrollment: seal the received share under a passphrase, store the blob (e.g. IndexedDB)
const blob = seal_share(shareJson, passphrase)          // Argon2id + XChaCha20-Poly1305

// unlock (once, not per poll):
const g = open_guardian(blob, passphrase)               // → Guardian handle

// co-sign loop — the TS only moves bytes; `handleRelayMessage` does all FROST:
for (const { msg_hex } of await recv(sessionId)) {
  const a = g.handleRelayMessage(sessionId, msg_hex)    // {action, to, msg_hex, done, kind}
  if (a.action === 'send') await send(sessionId, a.to, a.msg_hex)
  if (a.done) break
}
g.wipe()                                                // zeroize on lock/logout
```
Before arming an **InheritanceRelease**, the client independently verifies the owner's latest
heartbeat (`@noble/ed25519` over the canonical message in §6.1) and checks `is_lapsed` — never
trusting the relay's state flag.

## 3. The relay — route ceremonies (untrusted, self-hostable)

Run the coordinator (`cargo run -p steward-coordinator`, `STEWARD_DATA_DIR` to persist). It stores
only **public** vault config + the signed heartbeat bulletin (never shares — §9, and enforced by a
test). HTTP surface:

- `POST /vault` — register a vault's public record `{ label, threshold, guardian_ids, public_key_package, heartbeat_pubkey, policy, heir, network }` (`label` = the owner-chosen human name every app displays)
- `GET /vault/:id` — public status (`label`, state hint, address, balance, heartbeat pubkey)
- `POST /vault/:id/heartbeat` `{ time, sig_hex }` — a signed beat (verified, monotonic)
- `GET /vault/:id/heartbeat` — the bulletin, for guardians to re-verify
- `POST /vault/:id/session` `{ purpose, sighash_hex, randomizer_hex, mode, recipient?, amount? }` — run a ceremony (`recipient`/`amount` are the payment display metadata guardians see; advisory — the sighash binds)
- `GET /vault/:id/pending` — sessions awaiting guardians (carries `recipient` + `amount` for the approval card)
- `POST /vault/:id/sync` — no-node balance scan of the vault's viewing key
- `POST /vault/:id/spend` `{ to, amount_zat, mode? }` — **one-call real payment** (§ below) → `{ txid }`
- `POST /session/:id/{send,recv}` — the message relay (identity via `x-steward-id`)

Any relay works; guardians verify what they sign, so a bad relay causes safe failure, never theft.

### Sending a real payment (one call)

`POST /vault/:id/spend { to, amount_zat, mode }` is the app-driven spend of SPEC §10 — the whole
build → co-sign → broadcast pipeline behind a single call any app can make:

```ts
const { txid } = await fetch(`/vault/${id}/spend`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ to: 'utest1…', amount_zat: 1_000_000, mode: 'relay' }),
}).then(r => r.json())
// mode 'relay' → the vault's real guardians co-sign the payment in their app; 'auto' → a demo
// vault's in-process shares. Requires a prior POST /vault/:id/sync that found a confirmed note.
```

The relay builds + Halo2-proves the PCZT from the **viewing key** (no secret), runs the ceremony
over the transaction's **real** sighash (guardians co-signing), extracts, and broadcasts — holding
no share at any point. It is a long call (build + human approval + broadcast). An integrator that
would rather not hand build/broadcast to a relay runs the signer pipeline locally (§4) instead; the
co-signing seam is identical.

## 4. The signer — spend/release on-chain

The PCZT pipeline (`steward-signer`, isolated crate, on the NU6.2-native stack) turns a FROST
signature into a broadcast tx: **construct** (`zcash_client_backend` from the scanned viewing key —
no `ask`) → **prove** (public params, `FixedPostNu6_2` circuit) → **sign** (in-process via `pczt`'s
Signer role — reads each Orchard action's α and applies the aggregated FROST signature over the
sighash) → **finalize/extract** → **broadcast** (Zaino/lightwalletd), printing the **txid**. It also
derives the vault's address/UFVK from `ak` and does no-node balance scanning. See
[PROTOCOL.md](PROTOCOL.md) (the NU6.2 update at the top).

`sign-and-broadcast` co-signs in one of two modes: `--mode auto` (a demo vault's in-process shares)
or `--mode relay` (the ceremony is advertised to the vault's real remote guardians, who approve in
their app) — the latter is what `POST /vault/:id/spend` uses. The recipient + amount ride along as
guardian display metadata (`--to`, `--amount`).

---

## The wire seams (stable, minimal)

Between components, only these cross: the FROST round messages (`serde_json`), the 64-byte
signature, the 32-byte `ak`, the 32-byte randomizer `α`, and the canonical heartbeat message
(`steward-heartbeat-v1 ‖ vault_id ‖ time_be`). Keep to those and any implementation interoperates.

## Turning it into a plain multisig wallet

Skip the heartbeat/inheritance policy and use only §1's keygen + signing and §2's guardian client:
you have an `t-of-n` **shielded multisig** — a family account, a treasury, a can't-spend-alone
vault. Inheritance and recovery are opt-in policy on top of the same core.
