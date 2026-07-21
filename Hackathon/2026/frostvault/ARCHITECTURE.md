# FrostVault — Architecture

## Why a real backend

The original scope for this hackathon project called for simulating FROST
entirely client-side. That was reversed deliberately: the FROST track is
about FROST, so the cryptographic core had to be real. Zcash Foundation's
`frost-tools` repo (`frostd`, `frost-client`) is 100% Rust, self-hosted, and
explicitly "demo purposes only" with no JS/WASM bindings — not something a
browser can call directly. The workable path is a small Rust HTTP service
that uses `frost-core` and `frost-rerandomized` as libraries, which is what
`backend/` is.

## The real cryptography

`reddsa` (crates.io, `features = ["frost"]`) provides
`reddsa::frost::redpallas`, a real `Ciphersuite` implementation for
RedPallas — the curve and scheme Zcash uses for Orchard spend authorization.
`frost-rerandomized` (v3.x) adds the rerandomization layer
(`RandomizedParams`, `sign_with_randomizer_seed`, `aggregate`) needed to
match Zcash's unlinkability requirement — a plain (non-rerandomized) FROST
signature would leak linkability information a real shielded spend can't
afford to leak. DKG (`frost_core::keys::dkg::part1/2/3`) is generic over any
`Ciphersuite`, so it works with `redpallas` directly, with no trusted dealer.

All of the exact function calls used here (`dkg::part1/2/3`,
`round1::commit`, `rerandomized::RandomizedParams::new_from_commitments`,
`rerandomized::sign_with_randomizer_seed`, `rerandomized::aggregate`) were
taken directly from `reddsa`'s own doctested README and DKG module docs
(`reddsa-0.5.2/src/frost/redpallas/{README.md,dkg.md}`), not guessed — those
examples are what the crate maintainers themselves test in CI.

### DKG (`backend/src/frost.rs::run_dkg`)

For `max_signers` participants with a `min_signers` threshold:

1. **Round 1**: each participant runs `dkg::part1`, producing a secret
   package they keep and a package broadcast to everyone else.
2. **Round 2**: each participant runs `dkg::part2` over what they received,
   producing per-recipient packages.
3. **Finalize**: each participant runs `dkg::part3`, producing their own
   `KeyPackage` (a distinct secret share) and the shared `PublicKeyPackage`
   (the group public key, derived from verifiable-secret-sharing
   commitments — never by combining private shares).

No party — including this backend — ever computes or holds the reassembled
group private key. `backend/src/frost.rs`'s test suite asserts every
participant's share is pairwise distinct as a sanity check.

### Threshold signing (`run_signing_ceremony`)

For a message and a chosen threshold-many signers:

1. **Round 1**: each signer runs `round1::commit`, producing a nonce (kept)
   and a commitment (shared).
2. The coordinator derives `RandomizedParams` from all commitments — this is
   where rerandomization enters, matching Zcash's spec.
3. **Round 2**: each signer runs `rerandomized::sign_with_randomizer_seed`.
4. **Aggregate**: `rerandomized::aggregate` combines the shares (verifying
   each one) into the final signature, checked against the rerandomized
   verifying key.

### What this deliberately does not attempt

No wallet — including the Zcash Foundation's own — has shipped construction
and broadcast of a real Orchard shielded spend authorized by a FROST
signature. That requires note-commitment-tree management, halo2 proof
generation, and deep integration with `librustzcash`'s transaction-builder
crates (`orchard`, `sapling-crypto`, `zcash_client_backend`), which the
Foundation's own ["State of FROST for
Zcash"](https://zfnd.org/the-state-of-frost-for-zcash/) post describes as
still ahead of them, not behind them. Attempting it here would have spent
the entire build on unshippable infrastructure. Instead: the "send" and
"recovery" flows produce a real, independently-verifiable signature over a
canonical message describing the transaction intent, and the ledger entry
that follows is an explicitly-labeled placeholder.

## Ceremony orchestration model

`backend/src/ceremony.rs` models each DKG or signing operation as a
`ceremonies` row with a `phase` the frontend polls
(`GET /ceremonies/:id`, ~400ms interval): `awaiting_round1 →
awaiting_round2 → finalizing|aggregating → complete|failed`.

Because every participant's computation runs inside this one process (see
the single-operator simplification below), the actual cryptographic work at
each phase transition is fast — microseconds. The small delays between
phase updates in the background task represent the round-trip latency that
would exist between separate participant devices in a real deployment; the
computation triggered at each step is genuinely executed, not mocked. This
is stated directly in `frost.rs` and `ceremony.rs`'s module docs.

### Single-operator key custody simplification

Every participant's `KeyPackage` (their real secret share) is generated and
persisted server-side in this build, because there's one operator running a
solo demo with no separate participant hardware. In a real multi-party
deployment, each participant would run DKG on their own device and keep
their own `KeyPackage` locally; a coordinator would relay round packages
(like `frostd` does) but never see the shares themselves. This is a
simplification of *where* the real math executes, disclosed here and in
`frost.rs`, not a simulation of the math.

## Data model (SQLite, `backend/src/db.rs`)

- `vaults` — name, threshold, total participants, the real group public key
  (hex), status.
- `participants` — name, role, FROST identifier, real key share (hex,
  server-held per the simplification above).
- `ceremonies` — kind (`dkg`/`send`/`recovery`), phase, signer set, and on
  completion: the real signature, the real rerandomized verifying key, and
  an independently re-checked `verified` boolean.
- `transactions` — the explicitly-mocked ledger; `send` rows link back to
  the real `ceremony_id` that authorized them.

## Frontend

Next.js 15 (App Router) + Tailwind v4 + shadcn/ui, calling the backend via
`lib/api/*`. No client-side simulation exists anywhere in the send/recovery
path — `SigningProgress` polls the real ceremony endpoint and renders actual
phase transitions, not a scripted animation. `lib/zcashnames.ts` is the one
disclosed frontend-side mock (see README).

## Social recovery, reframed

FROST's actual value proposition for recovery isn't "regenerate a lost
key" — it's that you never needed one specific participant's share back in
the first place. Any threshold-many of the original participants can
already produce a fully valid signature. The recovery flow
(`app/vault/[id]/recovery`) makes this literal: it runs the same real
signing ceremony used for sends, over a participant subset the user chooses
(typically excluding someone), and shows the resulting signature verifying
against the vault's original group public key. `backend/src/frost.rs`'s
`recovery_demo_different_threshold_subset_still_verifies` test is the same
scenario at the crypto-library level.
