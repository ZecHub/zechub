# Steward — Protocol & Integration Reference

Authoritative technical notes resolved from **primary source** (crates cloned at exact
release tags, 2026-07-06). This is the ground truth `steward-core` and `steward-signer`
are built against. Every claim is source-cited. Read this before touching P2+ code.

---

## ⚠️ NU6.2 update — supersedes the signer-stack details below

Mainnet activated **NU6.2** (height 3,364,600), whose Orchard security fix (GHSA-2x4w-pxqw-58v9)
**changed the Orchard ZK circuit** — a proof from the pre-NU6.2 stack is rejected on-chain
("could not validate orchard proof"). `steward-signer` was therefore **migrated off the pinned
pre-NU6.2 stack** (the external `zcash-sign` binary + the `conradoplg/orchard@4d001c5` fork +
`pczt 0.5` / `zcb 0.21` / `zcash_protocol 0.7.1`) to the released NU6.2 wave:

| crate | now | note |
|---|---|---|
| `orchard` | **0.14.0** (`unstable-frost`) | ships `FixedPostNu6_2`; `build()` defaults to it — the conradoplg fork is no longer needed. |
| `pczt` | **0.7.0** | signing is now **inline** via its `signer` role — the external `zcash-sign` binary is GONE. |
| `zcash_client_backend` | **0.23.0** | + `zcash_client_sqlite 0.21`, `zcash_keys 0.14`, `zcash_address 0.12` |
| `zcash_protocol` | **0.9.0** | NU6.2-native (branch id `0x5437_f330`, mainnet activation 3,364,600) |
| `zcash_primitives` / `zcash_proofs` | **0.28.0** | |
| `zip321` | **0.8.0** | |

**In code:** `src/sign.rs` computes the sighash via pczt's `Signer::shielded_sighash`, reads each
Orchard action's α (`spend().alpha().to_repr()`), fetches the 64-byte FROST sig from the coordinator,
and applies it with `Action::apply_signature` (which re-verifies `rk = ak + [α]G` locally — a bad
sig fails here, not on-chain). Only **real** spends (`value() != NoteValue::default()`) get the FROST
sig; Orchard's value-0 dummy padding is already signed by the constructor and skipped.
`prove.rs`/`finalize_extract.rs` pin `FixedPostNu6_2` explicitly on both proof and verify sides. The
FROST wire seam (sighash, α, 64-byte sig) is unchanged, so `steward-core` and the coordinator were
untouched.

**Proven:** a real 2-of-3 shielded FROST spend, mainnet-mined — txid
`6dfe556827dbdfa8eda7971a3e396d058f2487c81054ff7baa405e631b4ef496`.

Everything below (the `zcash-sign` contract, the pinned version table, the "commit that Cargo.lock"
note) is **historical** — it documents the pre-NU6.2 stack and *why* it was pinned, which is the
context for the migration, not the current build. The current build is defined by
`crates/steward-signer/Cargo.toml` + `src/`.

---

## 0. Version reality & interop strategy (READ FIRST)

`frost-tools` (the ZF reference binaries: `frostd`, `frost-client`, `zcash-sign`,
`coordinator`, `participant`) does **not** build against our target crates. It pins:

| crate | frost-tools pins | Steward targets | API compatible? |
|---|---|---|---|
| `frost-core` | **2.2.0** | **3.0.0** | ❌ (wire ✅) |
| `frost-rerandomized` | 2.1.0 / 2.0.0-rc | 3.0.0 | ❌ (wire ✅) |
| `reddsa` | 0.5.1 (git rev) | **=0.5.2** | module path same |
| `orchard` | **0.11.0 git fork** `conradoplg/orchard@4d001c5b`, feat `unstable-frost` | mainline 0.14.x | see §4 |
| `pczt` | 0.5 | (align to signer needs) | — |
| `zcash_keys` | 0.12.0 (`::new`) | 0.14.x (`from_orchard_fvk`) | ❌ |

**Strategy — keep `steward-core` on the modern crates.io 3.0 stack; interop with stock
tooling only across hex wire boundaries.** The wire formats are cross-version compatible
(verified): the group key `ak` (32-byte hex), the ZIP-312 randomizer α (`pallas::Scalar`
32-byte LE), and the aggregated RedPallas SpendAuth signature (64-byte `R‖z`). So:

- **We replace `frost-client` entirely** with our own guardian clients (3.0 + our own
  Noise). We never mix our FROST types with stock 2.x types → no serde-repr interop risk.
- **We drive `zcash-sign` as a black-box subprocess** (hex in/out only) — §3.
- **Stock `frostd` is a version-agnostic blind relay** — it only routes opaque hex blobs,
  so our 3.0 clients can use it unchanged — §2.
- The 2.x-vs-3.0 gap would only bite if we mixed our client with stock `frost-client`; we don't.

---

## 1. Vault keys — keygen, address, and the `ask`-extraction crux (P2)

The Orchard `FullViewingKey` is three parts (`orchard::keys`):
```rust
struct FullViewingKey { ak: SpendValidatingKey, nk: NullifierDerivingKey, rivk: CommitIvkRandomness }
```
- **`ak` = the FROST group verifying key** (`SpendValidatingKey` wraps `redpallas::VerificationKey<SpendAuth>`).
- **`nk`, `rivk`** are viewing-key material with no signing power — dealer-generated.

**Steward setup is cleaner than the ZF DKG demo** because our owner holds a *real* Orchard
`SpendingKey`. Do NOT use `from_sk_ak` with a throwaway `sk` (that's the demo's DKG hack).
Instead (current mainline crates):

```rust
let fvk  = FullViewingKey::from(&owner_sk);                 // real, consistent ak,nk,rivk
let ufvk = UnifiedFullViewingKey::from_orchard_fvk(fvk)?;   // zcash_keys 0.14, feature `unstable-frost`
let ua   = ufvk.orchard().unwrap().address_at(0u64, External); // ordinary receiving UA
// scanning/balance: feed `ufvk` to zcash_client_backend / Zaino — zero FROST-awareness needed.

let sk    = SigningKey::<PallasBlake2b512>::deserialize(&ask_bytes)?;  // ask scalar (see crux below)
let (shares, pubpkg) = redpallas::keys::split(&sk, n, t, IdentifierList::Default, rng)?; // NOTE order: max=n, min=t
// EvenY is impl'd on PublicKeyPackage / KeyPackage / SecretShare SEPARATELY (NOT on the tuple —
// the tuple helper is pub(crate)). split() already applies it via post_generate; we re-assert:
let is_even = pubpkg.has_even_y();
let pubpkg = pubpkg.into_even_y(Some(is_even));
let shares = shares.into_iter().map(|(id, s)| (id, s.into_even_y(Some(is_even)))).collect();
assert_eq!(pubpkg.verifying_key().serialize()?, ak_bytes_of(&fvk));  // group key must equal ak
drop(owner_sk); // discard monolithic spend authority
```

`frost_core::keys::split` (3.0.0, confirmed docs.rs):
```rust
pub fn split<C: Ciphersuite, R: RngCore + CryptoRng>(
    key: &SigningKey<C>, max_signers: u16, min_signers: u16,
    identifiers: IdentifierList<'_, C>, rng: &mut R,
) -> Result<(BTreeMap<Identifier<C>, SecretShare<C>>, PublicKeyPackage<C>), Error<C>>
```

### ⚠️ Crux (P2): getting `ask` bytes out of orchard
`SpendAuthorizingKey` exposes **no public byte accessor**, even under `unstable-frost`
(only `SpendValidatingKey` bytes are public). Two options:
1. **Patch orchard** with a `#[cfg_attr(feature="unstable-frost", visibility::make(pub))]`
   accessor on `SpendAuthorizingKey` (mirrors what the fork did for `SpendValidatingKey`), or
2. **Re-derive `ask`**: `to_scalar(PrfExpand::ORCHARD_ASK.with(&sk.0))` then the even-Y
   negation (negate if `repr(ak)[31]>>7 == 1`), serialize canonical LE.

**Byte-verify** either way: orchard's `ask` LE repr must equal what
`SigningKey::<PallasBlake2b512>::deserialize` expects (they are the same RedPallas SpendAuth
field element/encoding, but confirm with a vector).

### Even-Y (mandatory)
RedPallas/Orchard requires `ak` to have even Y. `reddsa::frost::redpallas::keys::EvenY`:
`has_even_y()` checks `serialized[31] & 0x80 == 0`; `into_even_y(..)` negates all components
(linear → preserves the sharing and the group key). Orchard's `ask` is already canonical, so
this is a no-op — but **always route split output through it** so a non-canonical import
can't silently break signing.

### Rerandomization
`ak` in the FVK is the un-randomized group key. Per spend, `frost-rerandomized` applies
`rsk = ask + α`, `rak = ak + [α]G` at signing time (α from `zcash-sign`). The FVK/UFVK never change.

Sources: `orchard` fork `src/keys.rs:120,143,307,314,347,447`; mainline orchard 0.14 `src/keys.rs`
(`unstable-frost` exposes only `SpendValidatingKey` bytes); `zcash_keys` 0.14 `UnifiedFullViewingKey::from_orchard_fvk`; `frost-client/src/trusted_dealer/…`.

---

## 2. FROST protocol + `frostd` relay (P1/P3)

### Keygen (MVP = trusted dealer)
`keys::split()` an existing scalar (§1) — the owner is the dealer. `keys::generate_with_dealer`
mints a fresh group instead. DKG (`keys::dkg::part1/2/3`) removes the dealer but adds 3 rounds
— **out of MVP scope**.

### Two-round signing (plain; §5 is the re-randomized form we actually use)
- R1: `frost::round1::commit(signing_share, &mut rng) -> (SigningNonces, SigningCommitments)`.
  Persist `SigningNonces` (secret, single-use); send `SigningCommitments`.
- Coordinator: `frost::SigningPackage::new(commitments_map, message)`.
- R2: `frost::round2::sign(&signing_package, &nonces, &key_package) -> SignatureShare`.
- Aggregate: `frost::aggregate(&signing_package, &shares, &pubkey_package) -> Signature`
  (identifiable abort: returns the cheater's `Identifier`).

### `frostd` relay
Untrusted JSON-HTTPS FIFO relay, default port **2744**. Routes: `/challenge` `/login`
`/logout` `/create_new_session` `/list_sessions` `/get_session_info` `/send` `/receive`
`/close_session`. Auth: `GET /challenge` → UUID → sign with comm key (XEdDSA) →
`POST /login {pubkey, challenge, signature}` → `access_token` (Bearer). Sessions are UUIDs;
participants addressed by hex pubkey; **empty `recipients` = the coordinator**.
Self-host: `cargo install --git https://github.com/ZcashFoundation/frost-tools --locked frostd`;
TLS via `mkcert` (local) or nginx. It only relays hex `msg` blobs → version-agnostic.

### MVP relay: the coordinator hosts its own HTTP relay (increment B) — trust tradeoff
For the hackathon MVP we do **not** stand up stock `frostd`: it is pinned to the yanked
2.x / orchard-fork stack and needs mkcert/TLS. Since **we control both client ends** (the
guardian clients are ours), `steward-coordinator` serves as **its own relay over plain
HTTP**, implementing the same [`Transport`] seam (`crates/steward-coordinator/src/http.rs`):

- **Relay plane** (mirrors `frostd`'s FIFO model): `POST /session/{id}/send` (body = `to`
  recipient + hex `msg`) and `POST /session/{id}/recv` (drains the caller's FIFO,
  non-blocking, like `/receive`). Caller identity is bound to the request via an
  `x-steward-id` header (our analogue of `frostd`'s Bearer token); the reserved
  `__coordinator__` id = the empty-`recipients` coordinator mailbox. The server-side hub
  is the increment-A `InProcessRelay`, so the FIFO semantics are the already-tested ones,
  and the coordinator's own ceremony reaches that hub **in-process** (no self-HTTP hop).
- **Control plane:** `POST /vault` (store threshold + guardian ids + `PublicKeyPackage` +
  `HeartbeatPolicy`; **public data only, no shares**), `GET /vault/{id}` (state at `now`,
  guardians, threshold, balance-stub), `POST /vault/{id}/heartbeat` (owner proof-of-life →
  advances the deadline via `HeartbeatPolicy::heartbeat`), `POST /vault/{id}/session`
  (propose a ceremony with a `CeremonyPurpose` + sighash + α → runs the P6-gated
  `run_authorized_signing_session` over the relay against connected guardians → returns the
  aggregated 64-byte signature hex, or a 403 if the dead-man's-switch gate refuses it).

**⚠️ The tradeoff, stated honestly:** unlike untrusted `frostd` — where each guardian's
round messages ride inside a client↔client Noise channel so the relay sees only ciphertext
— **our coordinator-hosted relay sees the plaintext FROST round-1 commitments and round-2
signature shares.** This is acceptable for the MVP because *those messages do not leak the
signing key*: a commitment is a public nonce commitment and a share is only usable inside
its own `(sighash, α, commitment-set)` context; a malicious/curious relay learns nothing
that lets it forge, and a tampered share makes `aggregate`/`rk`-verify **reject** rather
than mint a bad signature. What we forgo is transport-level confidentiality and defence
against relay-level routing games. **Where Noise slots in later (P3/P4 hardening):** replace
the body of `HttpTransport` with a `Noise_K_25519_ChaChaPoly_BLAKE2s` (`snow`) channel
between guardian and guardian, keyed by the comm keypair that also does XEdDSA login (§4) —
the relay then carries only ciphertext and **nothing in the ceremony, guardian, or control
plane changes**, because the `Transport` trait is preserved as the seam.

---

## 3. `zcash-sign` contract — PCZT path (P2 signer)

> **The ywallet-JSON path is DISABLED** (`zcash-sign/src/sign.rs` ywallet branch is
> `#[cfg(false)]`, returns "Ywallet signing is disabled"). The `frost.zfnd.org` ywallet-demo
> tutorial documents a dead flow. **Only PCZT works today.** `steward-signer` targets PCZT.

### `generate` — derive the vault UFVK from the FROST group key
```
zcash-sign generate --ak <hex ak> [--network main|test] [--danger-dummy-sapling]
```
Prints an `Orchard-only unified address: "u1…"` and `Unified Full Viewing Key: "uview1…"`.
Uses `FullViewingKey::from_sk_ak(random_sk, ak)` (random nk/rivk). *We prefer §1's real-key
path instead, but `generate` is a fast way to get a scannable vault UFVK from just `ak` hex.*
`--danger-dummy-sapling` attaches a throwaway Sapling FVK only because **ywallet** rejects
Orchard-only UFVKs — never send funds to that Sapling address.

### `sign` — ONE interactive subprocess (not two subcommands)
```
zcash-sign sign -i <pczt_or_txplan_file> -o <out_file> [-u <ufvk_hex>] [-n main|test]
```
- Input auto-detected: tries `Pczt::parse` first, else ywallet JSON (which is disabled).
- `-u/--ufvk` optional; **not needed for PCZTs**.
- Behaviour (`sign_pczt`): only **v5 tx with a shielded bundle** accepted. Prints:
  ```
  SIGHASH: <64 hex>                         # v5_signature_hash(Shielded)
  Randomizer #<idx>: <64 hex>               # α = pallas::Scalar LE, per NON-DUMMY Orchard action
  Input hex-encoded signature #<idx>:       # <-- BLOCKS on stdin, one 128-hex line per action, in idx order
  ```
  then applies each sig (`action.apply_signature`), and writes `pczt.serialize()`.
- **Output is a signed PCZT, NOT a broadcastable raw tx.** Must run a **PCZT Transaction
  Extractor** afterward to get raw bytes, then broadcast via lightwalletd/Zaino/Zallet.
- `zcash-sign` is fully **offline** (no node): plan-construction (upstream) and broadcast
  (downstream) are Steward's responsibility.

### Driving it from `steward-signer`
`zcash-sign sign` blocks on stdin, so drive it as a **long-lived child process**: read the
`SIGHASH` + `Randomizer #idx` lines from stdout, run our re-randomized FROST (§5) per action,
write each aggregated 64-byte hex signature to stdin in idx order. Multiple Orchard spends →
multiple prompt/read cycles. (Alternatively reimplement against the library, but subprocess is
lower-risk for the MVP.)

### Wire handoff compatibility (2.x tool ↔ 3.0 core)
- `SIGHASH` hex → our signing `message`.
- `Randomizer #n` hex → `frost_rerandomized::Randomizer::<PallasBlake2b512>::deserialize` (32-byte LE — matches).
- our aggregated 64-byte `R‖z` hex → `zcash-sign`'s signature prompt (RedPallas SpendAuth sig — matches).

Sources: `frost-tools@7d33a95` `zcash-sign/src/{args,main,sign,generate,transaction_plan}.rs`,
`frost-client/src/coordinator/args.rs`.

### PCZT production — RESOLVED (verified against source)
`zcash-sign` consumes a PCZT; it does not build one. The full pipeline, and the version
constraint that governs it:

```
[Construct] zcb 0.21 create_pczt_from_proposal  → unsigned/unproven v5 PCZT  (UFVK + synced WalletDb; NO ask)
[Prove]     pczt::roles::prover::Prover          → + Halo2 Orchard proof       (public ProvingKey::build(); NO ask)
[FROSTSign] zcash-sign sign -i proven.pczt       → signed PCZT                 (our FROST group makes the RedPallas sig)
[Finalize]  pczt::roles::spend_finalizer         → finalized PCZT
[Extract]   pczt::roles::tx_extractor            → zcash_primitives Transaction bytes
[Broadcast] CompactTxStreamer.SendTransaction    → Zaino/lightwalletd (or zcash-cli sendrawtransaction)
```
Prove **before** `zcash-sign` (canonical order). Neither Construct nor Prove needs `ask` —
the Orchard circuit proves `rk = ak + [α]G` from the **public** `ak` in the FVK; the only
secret operation is the spend-auth signature, which is exactly what FROST produces. Do NOT
run the Redactor (it strips `alpha`/witnesses the signer/prover need).

Construction API (`zcash_client_backend 0.21.0::data_api::wallet`) — **exact signatures, verified by compiling:**
```rust
propose_transfer(&mut db, &params, account_id, &input_selector, &change_strategy,
                 request: zip321::TransactionRequest, confirmations_policy) -> Result<Proposal<..>>
create_pczt_from_proposal(&mut db, &params, account_id, OvkPolicy::Sender, &proposal) -> Result<pczt::Pczt>
// where DbT: WalletWrite + WalletCommitmentTrees, DbT::AccountId: serde::Serialize
```
Notes (deviations from earlier drafts): `propose_transfer` takes an **`input_selector` + `change_strategy`
+ `ConfirmationsPolicy`** (fee lives inside the ZIP-317 change strategy — no bare `min_confirmations`/`fee_rule`).
Use `GreedyInputSelector` + a `standard` `SingleOutputChangeStrategy(StandardFeeRule::Zip317, …, ShieldedProtocol::Orchard, …)`.
The phantom error params (`InputsErrT`/`ChangeErrT`/`CommitmentTreeErrT`) turbofish to `Infallible`.
It fetches `account.ufvk()` (uses the **UFVK, not a USK**) and pulls commitments/witnesses/anchor from a
fully-synced `zcash_client_sqlite::WalletDb`. Single-step proposals only. **Correction to §0:**
`UnifiedFullViewingKey::from_orchard_fvk` **does** exist in `zcash_keys 0.12` (behind `unstable-frost`).

### ⚠️ Version lock (decides the whole signer architecture)
`pczt 0.5.0::parse()` **hard-rejects any serialization version ≠ 1** (`pczt-0.5.0/src/lib.rs:75`).
Newer `pczt` (0.6/0.7) drift the wire layout → a PCZT they produce is **rejected by `zcash-sign`**.
So the producer MUST be pinned to `zcash-sign`'s stack:

```toml
zcash_client_backend = { version = "=0.21.0", features = ["orchard", "pczt", "lightwalletd-tonic-tls-webpki-roots"] }
zcash_client_sqlite  = { version = "=0.19.1", features = ["orchard", "transparent-inputs"] }
pczt                 = { version = "=0.5.0",  features = ["prover", "signer", "tx-extractor"] }
zcash_keys           = { version = "=0.12.0", features = ["orchard", "unstable-frost"] }
zcash_primitives     = "=0.26.1"
zcash_proofs         = { version = "=0.26.1", features = ["bundled-prover"] }
zcash_protocol       = "=0.7.1"
zcash_address        = "=0.10.1"   # REQUIRED pin — wrong value forks in an old zcash_protocol 0.5.4
orchard              = { version = "0.11.0", features = ["unstable-frost"] }
tonic = { version = "0.14", default-features = false, features = ["channel","codegen","tls-webpki-roots","tls-ring"] }
prost = "0.14"                     # zcb 0.21 uses the tonic-prost split (0.14), not 0.13
[patch.crates-io]
orchard = { git = "https://github.com/conradoplg/orchard.git", rev = "4d001c5b6ad15373e68a5923d5868fbe42daba96" }
```
Verified: this set **resolves and compiles** (isolated `steward-signer` workspace). `Cargo.lock` pins
`pczt 0.5.0`, `orchard 0.11.0 (git 4d001c5)`, `zcb 0.21.0`, `zcs 0.19.1`. **⚠️ Commit that `Cargo.lock`** —
`core2`/`halo2_* 0.3` are **yanked** on crates.io, so a fresh `cargo generate-lockfile` fails; the lock was
seeded from the orchard fork's committed lock. Never run `generate-lockfile` here.

**Architecture consequence:** `steward-signer` (PCZT producer + `zcash-sign` driver + extractor +
broadcaster) lives on **this older, divergent stack, ISOLATED from `steward-core`'s modern 3.0
stack** — it is NOT a member of the main workspace (or uses its own lock + the orchard patch,
which is workspace-global). The seam between them is the **64-byte hex signature**: `steward-signer`
emits `(sighash, α, action_idx)` and consumes an aggregated 64-byte hex sig; `steward-core` (via the
coordinator/guardians) produces it. `steward-signer` therefore does **not** depend on `steward-core`.

**Cannot be used:** Zallet (zero PCZT support — issue zcash/zallet#99; and it's on pczt 0.7),
current `zcash-devtool` HEAD (pczt 0.7 → rejected). Vendor devtool's `create`/`prove`/`extract`/`send`
logic (~120 LOC total) into the pinned harness instead.

**v5-only ceiling:** `zcash-sign` rejects v6 txs → NU7/Ironwood will break this toolchain until ZF
re-pins the fork. Keep the vault demo on the v5 (pre-NU7) path; don't bump the producer crates.

Sources: `pczt 0.5.0` `src/{lib,roles}.rs`; `zcash_client_backend 0.21.0` `src/data_api/wallet.rs:699,1748`;
`zcash-devtool` `src/commands/pczt/{create,prove,extract,send_without_storing}.rs`; `zallet#99`;
`orchard` fork `@4d001c5` `src/pczt/prover.rs`.

---

## 4. Noise E2E for the guardian client (P3)

Reimplement `frost-client`'s transport exactly (it's `snow`-based and framework-free, ~250 LOC):

| Aspect | Value |
|---|---|
| Noise pattern | **`Noise_K_25519_ChaChaPoly_BLAKE2s`** (`K` — both static keys pre-shared, 1-msg 0-RTT) |
| DH / cipher / hash | X25519 / ChaCha20-Poly1305 / BLAKE2s |
| Comm keypair | **one 32-byte Curve25519 key**, dual-use: X25519 static for Noise **and** signs `frostd` login challenges via **XEdDSA** (`xeddsa`), not Ed25519 |
| Contact exchange | out-of-band **Bech32m**, HRP `"zffrost"`, wrapping `postcard(Contact{version:0,name,pubkey})` |
| Sessions | one Noise session **per peer, per direction** (initiator=send, responder=recv); nonce is an implicit counter → **ordering is load-bearing** |
| Framing | raw Noise bytes (≤ 65535) in `SendArgs.msg`, wire-encoded as **hex** (`serdect`); payload inside Noise is `serde_json` of the FROST round structs |
| `/send` | `{ session_id, recipients:[hex pubkey] (empty=coordinator), msg: hex }`; coordinator sends **one `/send` per recipient** (each ciphertext is per-recipient) |

`snow 0.9.x` default resolver is pure-Rust (no `ring`/C) → **WASM-safe**. For web either
compile `snow` to `wasm32-unknown-unknown` (plus a WASM XEdDSA impl) or use a JS Noise lib
that supports the exact `K` suite (many only ship `XX`/`IK` — verify byte-compat against the
Rust `test_snow` vector before trusting it).

Sources: `frost-tools` `frost-client/src/{cipher,api,cli/contact,cli/config,client}.rs`,
`frostd/src/functions.rs`, `frostd/tests/integration_tests.rs:582-648`.

---

## 5. Re-randomized signing (P2, the crypto Steward owns) — IMPLEMENTED

Signs an **externally supplied** sighash under the **externally supplied** randomizer α
(from `zcash-sign`, §3) — never a fresh α, or the aggregate won't verify against `rk`.
Implemented in `steward-core/src/sign.rs`, tested (2-of-3 sign → verify against `rk`).

### ⚠️ Critical: use the α-BY-VALUE path, NOT the seed API
`frost-rerandomized` 3.0's "modern" surface (`sign_with_randomizer_seed`,
`RandomizedParams::new_from_commitments`, `regenerate_from_seed_and_commitments`)
**derives α itself** as `H(seed ‖ commitments)` — i.e. the *protocol* chooses α. That is
**wrong for Steward**: α is dictated by the transaction (`rk = ak + [α]G`) and given to us by
`zcash-sign`. Using the seed API computes a *different* α → the aggregate verifies against the
wrong key → unusable on-chain. The only public 3.0 path that takes α **by value** is the
`#[deprecated]` `frost_rerandomized::sign`; wrap that call in `#[allow(deprecated)]`. It is
still correct (internally `RandomizedParams::from_randomizer(vk, α) → randomize → round2::sign`);
`aggregate` is not deprecated.

### Exact API used (`C = reddsa::frost::redpallas::PallasBlake2b512`, verified)
```rust
// R1 (guardian): shared with plain signing
redpallas::round1::commit(key_package.signing_share(), rng) -> (SigningNonces, SigningCommitments)
// coordinator
SigningPackage::new(commitments_map, sighash /* &[u8;32] */) -> SigningPackage
// randomizer from zcash-sign's `Randomizer #n` line (32-byte LE):
redpallas::rerandomized::Randomizer::deserialize(&bytes) -> Randomizer   // == frost_rerandomized::Randomizer<C>
// R2 (guardian): α by value — deprecated but correct
#[allow(deprecated)] frost_rerandomized::sign(&signing_package, &nonces, &key_package, randomizer) -> SignatureShare
// coordinator
let params = RandomizedParams::from_randomizer(pubkey_pkg.verifying_key(), randomizer);
frost_rerandomized::aggregate(&signing_package, &shares, &pubkey_pkg, &params) -> Signature
// verify against rk = ak + [α]G (NOT ak):
params.randomized_verifying_key().verify(&sighash, &sig) -> Result<()>
```
**Signer wiring:** hex-decode `zcash-sign`'s `Randomizer #n` into `[u8;32]`, pass straight
through — do not regenerate. One α + one full round1/round2/aggregate cycle **per non-dummy
Orchard action**, fed back to `zcash-sign` in idx order.

---

## 6. Social recovery — `repairable` (P5 repair / general) & `refresh`

**Repair a lost share (RTS, eprint 2017/1155) — group secret never reconstructed.** Use the
RedPallas typed wrapper `reddsa::frost::redpallas::keys::repairable` (monomorphized to
`PallasBlake2b512`, **no generics**). Names are `repair_share_part1/2/3` (NOT `_step_`):
```rust
repair_share_part1<C,R>(helpers: &[Identifier], key_package_i: &KeyPackage, rng, participant: Identifier)
    -> Result<BTreeMap<Identifier, Delta>>          // each helper i; needs >= t helpers
repair_share_part2<C>(deltas: &[Delta]) -> Sigma    // each helper j; sums deltas addressed to it; infallible
repair_share_part3<C>(sigmas: &[Sigma], identifier, public_key_package: &PublicKeyPackage)
    -> Result<KeyPackage>                            // recovering participant; rebuilds its KeyPackage
```
`Delta`/`Sigma` have `serialize()`/`deserialize()` for transport.
**Gotcha:** `repair_share_part3` errors `InvalidMinSigners` if `PublicKeyPackage.min_signers()`
is `None` (pre-3.0.0 packages) — ensure it's `Some`.

**Refresh shares (rotation / remove a member):** reddsa has **no** RedPallas wrapper — call
`frost_core::keys::refresh` generically with `PallasBlake2b512`. Trusted-dealer form:
`compute_refreshing_shares(pub_key_package, &identifiers, rng) -> (Vec<SecretShare>, PublicKeyPackage)`
then each participant `refresh_share(refreshing_share, &current_key_package) -> KeyPackage`.
Passing a strict subset of `identifiers` **drops** the omitted members. DKG form:
`refresh_dkg_part1/part2/refresh_dkg_shares`. Group verifying key is preserved (even-Y safe;
no re-`into_even_y` needed). Accessor gotchas: `KeyPackage::min_signers() -> &u16`,
`PublicKeyPackage::min_signers() -> Option<u16>`.

Sources: `frost-core@v3.0.0` `src/keys/{repairable,refresh}.rs`; `reddsa@0.5.2`
`src/frost/redpallas/keys/repairable.rs`.

---

## Appendix — dependency pins (Steward)
`frost-core 3.0` · `frost-rerandomized 3.0` · `reddsa =0.5.2` (feat `frost`) · `zip32 0.2`.
Orchard/zcash_keys/zcash_client_backend/pczt versions are pinned when `steward-signer` +
scanner land (P2/P4), targeting mainline with the `unstable-frost` features noted above.
