# ZHAC Has Awesome Cryptography

**A GPG-inspired CLI tool and library built on Zcash Sapling.**

ZHAC unifies the cryptographic stack via aligning solely with the cryptography
present in Zcash. ZHAC

**ZecHub Hackathon tracks:**
- **Zcash Login** — Challenge-response authentication using native signatures and mainnet block height.

## Quick Start

```bash
# Build
cargo build --release

# Run the full demo
./demo.sh

# Or use manually
./target/release/zhac gen-key -o alice.priv -p alice.pub
echo "Secret message" > msg.txt
./target/release/zhac encrypt -k alice.pub -i msg.txt -o msg.zhac
./target/release/zhac decrypt -k alice.priv -i msg.zhac -o decrypted.txt
```

### Zcash Mainnet Integration

```bash
# Query a zebrad node for chain state
zhac mainnet-info -r http://127.0.0.1:8232

# Create an auth challenge bound to mainnet block height
zhac auth-challenge -k alice.priv -p alice.pub -r http://127.0.0.1:8232 -o token.json

# Verify the auth token against mainnet
zhac auth-verify -t token.json -r http://127.0.0.1:8232

# Offline verification (signature only, no node required)
zhac auth-verify -t token.json -s
```

## CLI Reference

```
KEY MANAGEMENT:
  zhac gen-key           -o <priv> -p <pub> [-s <seed>] [-w <passphrase>] [--passphrase-stdin]
  zhac import-seed       -s <hex_seed> -o <priv> -p <pub> [-w <passphrase>] [--passphrase-stdin]
  zhac export-seed       -k <priv>
  zhac view-key          -k <priv> -d <diversifier> -o <viewing_key>
  zhac key-info          -k <pub>
  zhac fingerprint       -k <pub>

ENCRYPTION:
  zhac encrypt           -k <recipient> [-k <recipient2> ...] -i <input> -o <output>
  zhac decrypt           -k <priv> -i <input> -o <output>
  zhac view-key-decrypt  -k <viewing_key> -i <input> -o <output>

SIGNING:
  zhac sign              -k <priv> -i <input> -o <signature>
  zhac verify            -k <pub> -i <input> -s <signature>

ZCASH MAINNET / LOGIN:
  zhac mainnet-info      -r <rpc_url> [-u <user>] [-p <pass>]
  zhac auth-challenge    -k <priv> -p <pub> -r <rpc_url> -o <token.json> [--mock]
  zhac auth-verify       -t <token.json> -r <rpc_url> [-s for signature-only]

THRESHOLD SIGNING (FROST):
  zhac threshold-sign trusted-dealer    -t <t> -n <n> -o <dir>
  zhac threshold-sign round1            -k <key_package> -o <dir>
  zhac threshold-sign build-package     -m <message> -c <commitments_dir> -o <dir>
  zhac threshold-sign round2            -k <key> -n <nonces> -p <package> -o <share>
  zhac threshold-sign aggregate         -b <build_dir> -s <shares_dir> -k <pkp> -o <sig>
  zhac threshold-sign threshold-verify  -s <sig> -m <message> -k <pkp>

GLOBAL FLAGS:
  --quiet, -q     Suppress status output
  --verbose, -v   Show detailed output
```
```

### Wallet Seed Compatibility

ZHAC's 32-byte seed is compatible with Ywallet and zcashd seed exports:

```bash
# Export seed from ZHAC (hex format)
zhac export-seed -k alice.priv
# → 4036a8904a9da31a55f086c7e46e27375e0c6f4ea7c0d64a113397b52519bb78

# Import a seed from any wallet
zhac import-seed -s 4036a8904a9da31a... -o alice.priv -p alice.pub
```

The **seed** is the portable format. ZHAC and Zcash wallets derive different key hierarchies from the same seed:
- **ZHAC** derives: encryption key (`ask`), nullifier key (`nsk`), RedJubjub signing key (`sig_sk`) — all via BLAKE2b with ZHAC domain strings.
- **Zcash wallets** derive: Sapling spending key, incoming viewing key, payment address — via BLAKE2b with Zcash ZIP-32 domain strings.

Both use the same 32 random bytes as input. Export your ZHAC seed and import it into Ywallet to get a Zcash shielded address. Import a Ywallet seed into ZHAC to get ZHAC signing/encryption keys.

### Real Zcash Sapling + Orchard Key Derivation

ZHAC can derive **real Zcash mainnet keys** from any 32-byte seed:

```bash
# Derive Sapling (zs1...) and Orchard (p1...) addresses from a seed
zhac zcash-keygen -s <hex_seed> -o keys.json

# Output includes:
#   Sapling address: zs1qqqqqqqqqqqqqqqqq...
#   Sapling IVK:     (hex)
#   Orchard address: p1qqqqqqqqqqqqqqqqqq...
#   Orchard IVK:     (hex)
```

### Threshold Signing (FROST)

ZHAC implements FROST(Jubjub, BLAKE2b-512) per RFC 9591:

- **Trusted dealer**: One party generates and distributes shares
- **Signing**: 2-round protocol (commit → sign → aggregate)

### Zcash Login — Chain-State-Bound Authentication

ZHAC implements a privacy-preserving authentication protocol that interacts with
Zcash mainnet:

**Protocol:**
1. **Challenge creation**: Query a Zcash node for current block height + best block hash
2. **Signing**: User signs `nonce ‖ block_height ‖ block_hash ‖ timestamp` with their ZHAC key (RedJubjub SpendAuth)
3. **Verification**: Server checks signature AND independently queries Zcash mainnet to verify block height matches (within 1 block tolerance) and timestamp is fresh (within 5 minutes), and nonce has not been seen before (replay protection)

**Mainnet interaction:**
- `zhac mainnet-info` — queries selected node for blockchain info (chain, height, hash, connections)
- `zhac auth-challenge` — creates a signed auth token bound to current mainnet block
- `zhac auth-verify` — verifies token against mainnet chain state
- `zhac auth-verify -s` — offline signature-only verification (no node required)

### Multi-Recipient Encryption

```bash
# Encrypt for Alice and Bob in one ciphertext
zhac encrypt -k alice.pub -k bob.pub -i secret.txt -o secret.zhac

# Each recipient decrypts with their own private key
zhac decrypt -k alice.priv -i secret.zhac -o alice_copy.txt
zhac decrypt -k bob.priv -i secret.zhac -o bob_copy.txt
```

## Testing

```bash
# Unit tests (69) + integration tests (18) + doctests (4)
cargo test --release

# Clippy (zero warnings)
cargo clippy --all-targets --features net -- -D warnings

# Benchmarks
cargo bench

# Demo
./demo.sh
```

| Test Type | Count | Coverage |
|-----------|-------|----------|
| Unit tests | 69 | Roundtrips, negative cases, tamper detection, serialization, auth protocol, nonce replay, hash validation, RPC client, Sapling/Orchard key derivation |
| Integration tests | 18 | End-to-end CLI: keygen, encrypt/decrypt, sign/verify, multi-recipient, viewing key, threshold, quiet flag, auth mock, auth tampered, no-node failure, import/export seed, empty plaintext, wrong passphrase, passphrase-stdin |
| Doctests | 4 | Public API examples (key generation, encryption, signing, RPC client) |
| Benchmarks | 11 | Key generation, diversify_hash, encrypt/decrypt (48B + 64KB), sign, verify, multi-encrypt, fingerprint |
| Fuzz targets | 7 | ciphertext, signature, public key, multi-ciphertext, bech32, auth token, ZK params decoding |


## Security

See [SECURITY.md](SECURITY.md) for the full security policy, threat model, and known limitations.

**Not production-audited.** This is a hackathon project demonstrating Zcash's cryptography. This is a minimum-viable product.
