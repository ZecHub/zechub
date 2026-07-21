# The Steward Protocol

**A self-sovereign, threshold-custody and inheritance protocol for shielded Zcash.**

Version 0.1 (draft) · MIT · built on the Zcash Foundation's FROST.

Steward lets a person put shielded ZEC under **collaborative custody** — a `t-of-n` group of
guardians who hold the spending authority *together*, so no single party (not even the owner,
not even a server) can move the funds alone. On top of that custody core sit two human flows:
**social recovery** (guardians restore an owner who lost their device) and **dead-man's-switch
inheritance** (if the owner stops proving they're alive, guardians release the vault to an heir).

This document specifies the protocol so that any wallet or service can implement or integrate it.
It is written to be honest about what is novel here and what is inherited: **the threshold-signing
math is the Zcash Foundation's FROST; Steward's contribution is the application layer** — the vault
lifecycle, the guardian-verifiable heartbeat, the recovery/inheritance policy, and the trust model.

---

## 1. Design goals

1. **Self-sovereign.** No party you must trust with custody. The owner runs (or chooses) the
   infrastructure; guardians run their own clients. A compromised relay cannot steal, and cannot
   forge the facts that authorize a release.
2. **Shielded-native.** Everything operates over Orchard shielded funds. Amounts, participants,
   and heir are not public.
3. **No single key, ever.** The spending key exists only as `t-of-n` shares, each on a different
   device. No share, and no reconstruction, lives in one place.
4. **Trust-minimized policy.** The dead-man's-switch decision is made **independently by each
   guardian** from cryptographic evidence, not asserted by a server.
5. **Adoptable.** A protocol + SDK a wallet can integrate, not a hosted product.

## 2. Roles

| Role | Holds | Does |
|---|---|---|
| **Owner** | the vault's viewing key; an Ed25519 **heartbeat key**; optionally one FROST share | creates the vault, funds it, proves liveness (heartbeats), proposes spends/recovery |
| **Guardian** (×n) | **one FROST share** (encrypted, on their own device) | co-signs authorized ceremonies; **independently verifies** heartbeats before arming a release |
| **Relay** | nothing secret | routes ceremony messages; hosts the heartbeat bulletin. **Untrusted** — see §9 |
| **Heir** | a shielded receiving address | receives the vault on an inheritance release |

The threshold `t` MUST be reachable by the guardians **without** the owner, or recovery and
inheritance cannot proceed when the owner is absent (e.g. `2-of-3` where the owner holds one share
and two guardians suffice).

## 3. Cryptographic foundation (inherited from ZF FROST)

- Threshold signing is **FROST** over the **RedPallas** ciphersuite (`reddsa`, `frost-core 3.0`,
  `frost-rerandomized 3.0`) — the same primitive Zcash uses for Orchard spend authorization.
- The FROST **group verifying key** *is* the Orchard **spend-validating key** `ak`. The group
  **secret** is the Orchard **spend-authorizing key** `ask`, which is split into the `n` shares.
- Spending an Orchard note requires a **re-randomized** signature: the transaction fixes a
  randomizer `α` and the signature must verify under `rk = ak + [α]·G`. Steward threads `α`
  through the ceremony **by value** (never re-deriving it), or the aggregate won't verify.
- Only shielded pools are supported (FROST is Schnorr; transparent Zcash is ECDSA).

## 4. Vault lifecycle

### 4.1 Creation (trusted-dealer)

The owner's device acts as dealer, once:

1. Generate the Orchard spend authority as a RedPallas signing key; derive its group key `ak`.
2. `split` `ask` into `n` shares with threshold `t`; route each through **even-Y** normalization
   (RedPallas/Orchard require `ak` to have even Y).
3. Derive the vault's **Unified Full Viewing Key** and receiving **Unified Address** from `ak`
   (via the Orchard `from_sk_ak` construction), network `test` or `main`.
4. Generate an **Ed25519 heartbeat keypair**; keep the secret on the owner's device.
5. Distribute one encrypted share to each guardian (see §4.2); **discard the monolithic `ask`**.
6. Publish the vault's **public record** to the relay: `{ label (owner-chosen name), t, guardian
   ids, PublicKeyPackage, heartbeat public key, policy (interval, grace), heir, network }`. The
   `label` is a human name **every** app (owner, guardians, integrators) displays; the vault's
   stable identifier remains its relay id. No secret leaves the owner's device except the
   guardians' individual encrypted shares.

The vault now has an address. Funding = sending shielded ZEC to it. The coordinator/relay holds
**no shares** for a real vault.

### 4.2 Share custody

A guardian's share is sealed at rest with **Argon2id → XChaCha20-Poly1305** under a passphrase
only the guardian knows. The sealed blob is the only vault-secret a guardian stores, and it is
exportable to a backup file (still useless without the passphrase). Nonces used in signing are
single-use and destroyed after round 2.

### 4.3 States

`Active` (heartbeats current) → `Waning` (inside the grace window) → `Recoverable` (lapsed).
The state is **advisory** when reported by the relay; the authoritative determination for an
inheritance release is each guardian's own check (§6).

## 5. The signing ceremony (wire protocol)

A ceremony produces one re-randomized RedPallas signature over a transaction sighash. It is the
FROST two-round protocol, carried over a relay:

1. **Propose.** The initiator opens a session with a `purpose` (§7), the 32-byte `sighash`, and
   the randomizer `α`, inviting a signer set. For a spend (`NormalSpend`/`SocialRecoverySweep`)
   the `sighash` **MUST** be the sighash of a real, proven Orchard transaction (§10) — so the
   resulting signature is valid for **that transaction and no other**. The proposer also attaches
   **display metadata** (recipient address, amount) for the guardians' approval card.
2. **Round 1 — commit.** Each participating guardian generates single-use nonces and returns
   `SigningCommitments` (`Message::Round1Reply { identifier, commitments }`).
3. **Package.** The coordinator forms a `SigningPackage` over exactly the `t` commitments and the
   sighash.
4. **Round 2 — sign.** Each guardian returns a re-randomized `SignatureShare` under `α`
   (`Message::Round2Reply { identifier, share }`), then destroys its nonces.
5. **Aggregate.** The coordinator aggregates to a 64-byte signature and verifies it against
   `rk = ak + [α]·G` before use.

Messages are `serde_json` of the FROST round types. Transport is opaque byte routing (the relay
never needs to parse them); inter-guardian confidentiality (Noise) is an optional hardening layer.
Identifiable abort names a misbehaving guardian.

A session runs in one of two transports: **auto** (a demo vault's shares co-sign in-process, for
tests/solo demos) or **relay** (real remote guardians discover the session via
`GET /vault/:id/pending`, see the purpose + display metadata, and co-sign over the relay). The
display metadata is advisory (§9): the signature binds the **sighash**, so a guardian wanting full
assurance verifies the proposed transaction's outputs itself.

## 6. The heartbeat (proof-of-life) — Steward's novel core

The dead-man's-switch must not depend on trusting the relay's clock. Steward makes liveness a
**signed, self-authenticating, independently-verifiable** fact.

### 6.1 Canonical message

```
msg  = "steward-heartbeat-v1" ‖ vault_id (UTF-8) ‖ unix_time (u64, big-endian, 8 bytes)
beat = Ed25519_sign(heartbeat_secret_key, msg)
```

A heartbeat is `{ time, signature }`. The vault records the owner's Ed25519 **public** key at
creation. This layout is identical across implementations (verified: Rust `ed25519-dalek` and JS
`@noble/ed25519` produce byte-identical signatures), so owner, guardians, and core all agree.

### 6.2 Publication channels

- **Channel A (default): relay bulletin + direct-to-guardians.** The owner posts each heartbeat to
  the relay (a bulletin others can fetch) and pushes it to each guardian. No single relay can
  *hide* it, because guardians receive it directly.
- **Channel B (optional): on-chain.** The owner posts the same `{time, signature}` as an Orchard
  memo; guardians watch the chain. Censorship-proof; costs a fee per beat and leaks timing. The
  message format is deliberately identical, so only the transport differs.

### 6.3 The guardian's independent gate (the trust crux)

Before a guardian will co-sign an **`InheritanceRelease`**, its client MUST, on its own:

1. obtain the latest heartbeat (from any channel it trusts),
2. **verify the Ed25519 signature** against the vault's recorded heartbeat public key and the
   canonical message, and
3. compute `lapsed = now > signed_time + interval + grace` on its own clock.

It arms the release **only if** the signature verifies **and** it is lapsed. It never relies on
the relay's reported state. Consequences:

- A relay **cannot forge liveness** — it has no heartbeat key.
- A relay **cannot fake silence** — a guardian requires a *valid signature* to consider the owner
  alive; withholding heartbeats only matters if guardians never receive one directly/on-chain.
- **Cancellation is automatic and trustless:** any newer valid heartbeat resets every guardian's
  clock (the signed timestamp is the anchor; a replayed old heartbeat cannot advance time).

## 7. Authorization policy

Every ceremony carries a `purpose`, and the gate differs by purpose:

| Purpose | Gate |
|---|---|
| `NormalSpend` | owner-authorized payment to **any** recipient (the owner initiates; the guardian quorum co-signs) |
| `SocialRecoverySweep` | owner-authorized (recovery to a new owner address) |
| `InheritanceRelease` | **each guardian's independent heartbeat gate (§6.3)** — refused unless the owner's signed proof-of-life has genuinely lapsed |

`NormalSpend` and `SocialRecoverySweep` are always available (they need the owner or the guardian
quorum acting deliberately). `InheritanceRelease` is the only purpose the dead-man's-switch gates.

## 8. Social recovery

If a share is lost, `t` other guardians run the **Repairable Threshold Scheme** (frost-core
`repairable`: `repair_share_part1/2/3`) to regenerate the lost share **without reconstructing**
`ask` or moving funds — the group key and vault address are unchanged. Alternatively they run a
`SocialRecoverySweep` to move the vault to a fresh owner-controlled address. Neither requires the
owner's participation.

## 9. Trust model & threat analysis

**The relay is untrusted.** It sees the (non-secret) FROST round messages and hosts the heartbeat
bulletin. What it can and cannot do:

- ✅ can: route/withhold messages (a DoS — the ceremony fails *safely*, it cannot mint a bad
  signature); serve a stale heartbeat.
- ❌ cannot: move funds (holds no share); forge a heartbeat (no key); fabricate a lapse (guardians
  verify the signature themselves); reconstruct the key.

**Honest limitations (non-goals for v0.1):**

- **Pre-signed heartbeats.** Anyone with the owner's *heartbeat* key could pre-sign future-dated
  heartbeats to block inheritance indefinitely (a griefing attack — not theft). This is inherent
  to any liveness credential and is out of scope for v0.1.
- **Payment-metadata display.** In a relay ceremony the guardian sees the recipient/amount the
  proposer *attached*; a compromised relay could show one thing while the sighash commits to
  another. The signature still only validates the **actual** transaction, so this is a
  social-engineering risk (approve-what-you-didn't-mean), not silent theft. Full defense —
  guardian-side reconstruction of the PCZT to confirm its outputs match the display — is a
  hardening path.
- **Guardian availability.** Recovery and inheritance need `t` guardians to come online and
  co-sign (FROST is interactive). This is a deliberate human friction, not a bug.
- **Not audited.** Steward builds on audited ZF FROST crypto, but the protocol and implementation
  are a reference, not production-hardened.
- **Trusted-dealer keygen.** v0.1 uses a trusted dealer (the owner) at setup; DKG (no dealer) is a
  hardening path.

## 10. Transaction pipeline (Orchard)

A release/spend becomes an on-chain transaction via:

**Construct** a PCZT from the scanned vault (viewing-key only, no `ask`) → **Prove** the Orchard
proof (public parameters, no `ask`) → **Sign** (the FROST ceremony of §5 supplies the spend-auth
signature) → **Finalize + Extract** the transaction → **Broadcast** via lightwalletd/Zaino.

Neither construction nor proving needs the spending key; only the signature does, and that is what
the guardian quorum produces. A vault's balance is discovered by scanning its viewing key from any
public lightwalletd/Zaino endpoint — **no full node required**.

**App-driven spend (one call).** Because *construct*, *prove*, and *broadcast* touch **no secret
material** (a viewing key goes in, a co-signed transaction comes out), a relay may offer them as a
convenience: `POST /vault/:id/spend { to, amount_zat }` builds + proves the PCZT, runs the §5
ceremony over its **real** sighash (the owner's guardians co-signing), extracts, broadcasts, and
returns the **txid** — all without ever holding a share. An integrator that would rather not trust
a relay with build/broadcast runs the same signer pipeline locally; the co-signing seam is
identical either way. This is what makes a real send *one action* in any Steward app instead of a
manual pipeline.

## 11. Integration surface (SDK)

A wallet or service adopts Steward through:

- **`steward-core`** (Rust, compiles to WASM): keygen/`split`, even-Y, re-randomized signing,
  `repairable` recovery, the heartbeat (sign/verify/lapse), the policy state machine. This is the
  crypto/policy SDK — no transaction construction, no network.
- **The guardian client** (WASM + a thin relay client): seal/open a share, run the two rounds,
  drive a relay session, verify heartbeats. A wallet embeds this to *be* a guardian.
- **The relay** (an untrusted HTTP service, self-hostable): message routing + heartbeat bulletin +
  vault public-config store (persisted; never secrets) + an optional **spend helper**
  (`POST /vault/:id/spend`, §10) that builds/broadcasts without holding a share.
- **The signer** (the PCZT pipeline of §10): construct/prove/extract/broadcast, driving the FROST
  signature over a hex seam — either **relay** mode (real guardians co-sign) or **auto** (demo).

The seams are stable and minimal: FROST round messages (`serde_json`), the 64-byte signature, the
32-byte `ak`, the 32-byte `α`, and the canonical heartbeat message.

## 12. Applications

The same protocol powers:

- **Inheritance** (flagship) — the dead-man's-switch release to an heir.
- **Social recovery** — restore a lost-key owner.
- **General shielded multisig** — a family account, a DAO/business treasury, or a personal
  "can't-spend-alone" vault: Steward with the heartbeat/inheritance policy simply turned off. This
  fills a real gap — Zcash has no consumer shielded-multisig product today.

---

*Reference implementation: this repository. Internal build notes (crate versions, the PCZT/`zcash-sign`
integration, version-skew handling) live in [`docs/PROTOCOL.md`](PROTOCOL.md).*
