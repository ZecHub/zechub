# Changelog

All notable changes to ZHAC are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.0] — 2026-06-21

### Added
- **Real Zcash Sapling key derivation** (`src/zcash_wallet.rs`): ZIP-32 compatible key derivation using `PRF^expand` (BLAKE2b-512 with "ZcashExp_32S1_PrfE" personalization), real Sapling IVK derivation (BLAKE2s-256 with "Zcashivk" personalization), real DiversifyHash (try-and-increment on Jubjub Edwards curve), and `zs1...` address encoding (Bech32m, HRP "zs").
- **Real Zcash Orchard key derivation**: ZIP-316 compatible key derivation on the Pallas curve (via `pasta_curves`), using `PRF^expand` with "ZcashExp_OrchSetSeed" personalization, Orchard IVK derivation, and `p1...` address encoding (Bech32m, HRP "p").
- **Chain scanning** (`scan_sapling_notes`): Fetches blocks via `getblock` + `getrawtransaction` RPC, parses Sapling `OutputDescription`s (ephemeralKey, encCiphertext), and attempts note decryption with the incoming viewing key.
- **`zcash-keygen` CLI command**: Derives real Zcash Sapling + Orchard keys from a 32-byte seed, outputs JSON with addresses, IVKs, and public keys.
- **`zcash-scan` CLI command**: Scans a range of mainnet blocks for shielded Sapling outputs belonging to a viewing key.
- **`call_raw` method on ZcashRpc**: Public method for arbitrary JSON-RPC calls (used by chain scanning).
- 9 new unit tests for Sapling/Orchard key derivation (determinism, different seeds, address format, IVK format).

### Changed
- Total test count: 86 (67 unit + 15 integration + 4 doctest).
- CLI subcommand count: 21 (+ `zcash-keygen`, `zcash-scan`).
- Module count: 10 (+ `zcash_wallet`).
- New dependencies: `pasta_curves` (Orchard Pallas/Vesta curves), `subtle` (constant-time comparison).
- Demo script now has 11 steps (added real Zcash key derivation).

## [0.4.1] — 2026-06-21

### Added
- **`import-seed` CLI command**: Import a 32-byte hex seed (compatible with Ywallet/zcashd seed exports) and derive ZHAC keys. The seed is the portable format — any wallet's seed export can be used.
- **`export-seed` CLI command**: Export the raw 32-byte hex seed from a private key. Can be imported into Ywallet or other Zcash wallets that accept hex seeds.
- **`--mock` flag on `auth-challenge`**: Creates an auth token with mock chain state (no node required). The demo script uses this in its fallback path, so judges without a node still see the auth protocol in action.
- 3 new integration tests: import-seed/export-seed roundtrip, auth mock challenge, auth mock verify.

### Fixed
- **RPC client now uses `ureq`** instead of hand-rolled HTTP/1.1 over raw TCP. Supports HTTPS/TLS for remote nodes, chunked encoding, and proper connection management.
- **Auth verify() now compares best_block_hash** against the Zcash node. Reduced from up to 7 RPC calls to at most 2: `getblockchaininfo` (already needed) + `getblockhash(token_height)` if the hash doesn't match the current best.
- **demo.sh fallback no longer has dead code** — the offline path now uses `auth-challenge --mock` → `auth-verify -s`, exercising the actual auth protocol code path instead of generic sign/verify.
- **README stale test count** — fixed from 45/10/3 to 58/15/4.
- **Error variant usage** — `ZhacCiphertext::from_bytes` and `ZhacMultiCiphertext::from_bytes` now use `ZhacError::Format`. `ZhacSignature::from_bytes` now uses `ZhacError::Signature`.
- **Redundant code eliminated** — `derive_symmetric_key` and `derive_kek` merged into single `derive_key` with info prefix parameter.
- Removed dead dependency `frost-rerandomized`.

### Changed
- Total test count: 77 (58 unit + 15 integration + 4 doctest).
- Version bumped to 0.4.1.

## [0.4.0] — 2026-06-21

### Added
- **Zcash mainnet integration**: JSON-RPC 2.0 client for zebrad/zcashd (`src/rpc.rs`). Minimal HTTP/1.1 over raw TCP — no external HTTP dependency. Supports `getblockchaininfo`, `getblockhash`, `getnetworkinfo`, and HTTP Basic Auth.
- **Zcash Login authentication protocol** (`src/auth.rs`): Privacy-preserving challenge-response authentication bound to Zcash mainnet chain state. Auth challenges embed the current block height and best block hash from mainnet, preventing replay attacks across chains.
- **`mainnet-info` CLI command**: Query a Zcash node for chain info (chain, height, hash, difficulty, connections, node version).
- **`auth-challenge` CLI command**: Create a signed auth token bound to mainnet block height.
- **`auth-verify` CLI command**: Verify an auth token against mainnet chain state (or signature-only with `-s` flag).
- **FROST threshold authentication**: The auth protocol works with FROST verifying keys, enabling t-of-n threshold login.
- 14 new unit tests for RPC client (URL parsing, base64, auth) and auth protocol (signing, verification, tamper detection, JSON roundtrip, nonce uniqueness).
- 1 new doctest for `ZcashRpc` client.
- Updated demo.sh with Zcash Login section.

### Changed
- Version bumped to 0.4.0.
- Total test count: 72 (58 unit + 10 integration + 4 doctest).
- CLI subcommand count: 17 (was 14).
- Module count: 9 (was 7, + `rpc` + `auth`).

## [0.3.0] — 2026-06-21

### Added
- **Real DiversifyHash**: Try-and-increment BLAKE2s hash-to-curve on Jubjub (Edwards form), replacing scalar-multiplication hash. Produces points with unknown discrete log, matching Zcash Sapling's unlinkability guarantee.
- **Full ZK range check**: Complete lexicographic bit-by-bit less-than comparison against the Jubjub scalar field modulus (~756 R1CS constraints), replacing the 4-constraint bits-252-255 zero check. Total circuit: ~3,700 constraints.
- **Working network aggregation**: WebSocket coordinator now performs real FROST signature aggregation via `frost::aggregate()`, replacing the placeholder string.
- **Key fingerprint**: BLAKE2b-160 fingerprint and 8-character key ID, displayed GPG-style (`A1B2 C3D4 ...`).
- **Multi-recipient encryption**: Encrypt for up to 255 recipients in a single ciphertext using a random DEK wrapped per-recipient via DH-KA.
- **Viewing key decryption**: `view-key-decrypt` command allows decryption with only the incoming viewing key (no signing capability needed), matching Zcash Sapling viewing key semantics.
- **Passphrase-based key encryption at rest**: `--passphrase`/`-w` flag on `gen-key` encrypts the private key using HKDF-SHA256 + ChaCha20Poly1305.
- **`--quiet`/`--verbose` CLI flags**: Global flags for output control.
- **`fingerprint` subcommand**: Display key fingerprint and short key ID.
- **Error display fix**: Errors now print via `Display` (e.g., `Error: cryptographic error: ...`) instead of `Debug`.
- **Integration tests**: 10 end-to-end tests exercising the CLI binary (key generation, encrypt/decrypt, sign/verify, multi-recipient, viewing key, threshold signing, quiet flag, tampered message).
- **Criterion benchmarks**: 11 benchmarks for key generation, diversify_hash, encryption (48B + 64KB), signing, verification, multi-recipient encryption, and fingerprint computation.
- **Demo script**: `demo.sh` demonstrates all features in one command.
- **Dockerfile**: Multi-stage build for containerized deployment.
- **GitHub Actions CI**: Automated testing, clippy, formatting check, and build for both default and `net` feature configurations.
- **SECURITY.md**: Security policy, threat model, and known limitations.
- **`.gitignore`**: Prevents private keys, ciphertexts, and build artifacts from being committed.
- **Cargo.toml metadata**: Categories, keywords, repository, homepage, readme, MSRV.

### Changed
- `ZhacError` enum: Added `Signature` and `Format` variants for better error classification.
- ZK circuit constraint count: ~3,700 (was ~3,000 with incomplete range check).
- Test count: 45 unit tests + 10 integration tests (was 29).
- Clippy: Zero warnings across both build configurations (was 5 warnings).

### Fixed
- All 5 original clippy lint warnings (needless borrows, explicit counter loop, map_or simplification).
- Network module borrow checker issues and type signature errors.
- `serde_json::from_json` → `serde_json::from_str` (function doesn't exist).
- Dev artifact `codex.txt` removed.

## [0.2.0] — 2026-05-28

### Added
- ZHAC key hierarchy: BLAKE2b PRF → `(ask, nsk, sig_sk)`.
- Bech32m encoding for `zhac1…`/`zhacsecret1…`/`zhacview1…` addresses.
- DH-KA over Jubjub + HKDF-SHA256 + ChaCha20Poly1305 encryption.
- RedJubjub Schnorr signatures (SpendAuth domain).
- FROST threshold signatures (trusted dealer + DKG, RFC 9591).
- Groth16 ZK proof of key ownership.
- WebSocket coordinator/participant for FROST (optional `net` feature).
- 29 unit tests covering roundtrips and negative cases.
- README with architecture overview and CLI reference.
