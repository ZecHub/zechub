# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 0.6.x   | :white_check_mark: |
| < 0.6   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in ZHAC, please report it responsibly:

1. **DO NOT** open a public GitHub issue.
2. Email security findings to the maintainers.
3. Include a clear description of the vulnerability and steps to reproduce.
4. You will receive a response within 48 hours.

## Cryptographic Design

ZHAC uses the following audited cryptographic primitives from the Zcash ecosystem:

| Primitive | Crate | Usage |
|-----------|-------|-------|
| Jubjub curve | `jubjub` 0.10 | Key agreement, signatures |
| RedJubjub | `redjubjub` 0.7 | Schnorr signatures (SpendAuth) |
| BLS12-381 | `bls12_381` 0.8 | Groth16 pairing curve |
| Groth16 | `bellman` 0.14 | Zero-knowledge proofs |
| FROST | `frost-core` 3.0 | Threshold signatures (RFC 9591) |
| ChaCha20Poly1305 | `chacha20poly1305` 0.10 | AEAD encryption |
| HKDF-SHA256 | `hkdf` 0.12 | Key derivation |
| Argon2id | `argon2` 0.5 | Passphrase-based key stretching |
| BLAKE2b | `blake2b_simd` 1.0 | Key derivation PRF (512-bit output) |
| BLAKE2s | `blake2s_simd` 1.0 | DiversifyHash, IVK derivation |

## Security Properties

- **Key generation**: 256-bit random seed from `OsRng` (CSPRNG).
- **Scalar derivation**: BLAKE2b-512 with domain separation, reduced mod Fr via `from_bytes_wide` (uniform distribution).
- **DiversifyHash**: Try-and-increment hash-to-curve on Jubjub Edwards form, producing points with unknown discrete log. Unlinkability preserved across diversified addresses.
- **Encryption**: Ephemeral DH-KA + HKDF-SHA256 + ChaCha20Poly1305 (AEAD provides confidentiality + integrity).
- **Signatures**: RedJubjub Schnorr with randomized nonces (matching Zcash SpendAuth).
- **Threshold signatures**: FROST (RFC 9591) with DKG support — no trusted dealer required.
- **ZK proofs**: Groth16 with strict range check (witness < Fr modulus, strict less-than).
- **Key storage**: Private keys are zeroized on drop. Passphrase encryption uses Argon2id (memory-hard KDF, 64MB/3 iterations) + ChaCha20Poly1305. Versioned format (v2) with legacy v1 support.
- **File permissions**: Private keys, seeds, nonces, and FROST secret shares are written with 0600 permissions on Unix.
- **Auth replay protection**: NonceCache tracks seen nonces to prevent token replay.
- **Auth challenge binding**: Block hash validated to be exactly 32 bytes for canonical serialization.
- **WebSocket security**: Session secret authentication, duplicate ID rejection, TLS support via `rustls-tls-webpki-roots`.
- **RPC client**: Credentials redacted in Debug output. HTTP warning for non-local endpoints.

## Known Limitations

- **No streaming I/O**: Files are loaded entirely into memory. Large files (>1GB) may cause OOM.
- **No constant-time guarantees on all paths**: While underlying crates use constant-time operations, the try-and-increment DiversifyHash is variable-time by design (matching Zcash).
- **Trusted setup for ZK proofs**: Groth16 requires a trusted setup. The `zhac setup` command performs a local setup — the params file contains toxic waste and is written with 0600 permissions. In production, a ceremony (like Zcash's Powers of Tau) would be needed.
- **No formal security audit**: This code has not been audited by a professional security firm. (A comprehensive internal audit was performed — see audit findings below.)
- **Orchard group hash**: Uses try-and-increment via point decompression on Pallas. This produces points with unknown DLP but is not the exact SWU map from the Zcash specification.
- **Orchard scalar reduction**: Uses wide reduction via 256 doublings with MSB masking. Not perfectly uniform (loses ~2 bits per half) but significantly better than simple byte masking.
- **Sapling nullifier generator**: Derived via hash-to-curve rather than using the exact Zcash specification generator. Keys will not match real Zcash wallet nullifiers.
- **Orchard PRF personalization**: Uses "Zcash_Orchard_ExpandSeed" (matching Zcash spec). Verify compatibility with Ywallet before relying on derived Orchard addresses.
- **Chain scanning**: `try_decrypt_sapling` only validates the ephemeral key, not actual decryption. The `decryptable` field should be interpreted as "valid_ephemeral_key", not as "note belongs to this IVK".
- **No PKI / key registry**: Auth tokens embed public keys but there is no binding to an identity. Verifiers must establish trust in public keys out-of-band.
- **Signature-only auth mode**: The `-s` flag skips all chain-state checks and has no freshness guarantee. Not secure for production authentication.
- **NonceCache is in-memory only**: Replay protection only works within a single verifier process. Distributed verifiers need a shared nonce cache.
- **Timing side-channel in multi-recipient decryption**: Header iteration time reveals which position matches. Header order is already public in the ciphertext, so this is a minor leak.

## Threat Model

ZHAC protects against:
- Ciphertext tampering (AEAD authentication tag)
- Message tampering (signature verification)
- Key compromise via memory dumps (zeroization)
- Passive eavesdropping (DH-KA + AEAD)
- Single-party key compromise in threshold schemes (FROST t-of-n)
- Weak passphrase brute-force (Argon2id memory-hard KDF)
- World-readable key files (0600 permissions)
- Auth token replay (NonceCache)
- WebSocket impersonation (session secret authentication)
- WebSocket eavesdropping (TLS via wss://)

ZHAC does NOT protect against:
- Side-channel attacks (timing, power, EM)
- Physical key extraction
- Compromised host systems
- Quantum computers (not post-quantum secure)
- Malicious Zcash node providing fake chain state (the node is a trust root)
- Groth16 proof forgery by anyone with access to the params file (toxic waste)
