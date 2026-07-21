# Security

_This is experimental software and should not be used with real funds._

> **Warning:** This is a work in progress. Only simple transfers are supported. The wallet database is not yet encrypted, IPC provides integrity but not confidentiality, and several security features (DB encryption, interactive password prompts, secrets file support) are planned but not implemented. Review this document carefully before relying on any security property.

## Security Boundaries

```
┌──────────────────────────────────────────────────────────┐
│  Untrusted zone          │  Trusted zone                  │
│                          │                                │
│  CLI / TUI process       │  keypunkd process              │
│  (never holds keys)      │  (holds decrypted keys)        │
│                          │                                │
│  paypunkd process        │  seed.enc (encrypted at rest)  │
│  (never holds keys)      │                                │
└──────────────────────────┴────────────────────────────────┘
         ▲                              ▲
         │ X25519 + Blake2b MAC         │
         │ (IPC auth)                   │
         └──────────────────────────────┘
```

The core security boundary is between `keypunkd` (which holds keys) and everything else. `paypunkd` and the CLI/TUI never touch key material — they delegate signing to `keypunkd` via IPC.

## What's Protected

### Seed at rest

- **File:** `{data_dir}/seed.enc`
- **Encryption:** Argon2id key derivation from password → AES-256-GCM
- **Format:** `[salt(16B)][nonce(12B)][ciphertext]`
- **Atomic writes:** `.tmp` + rename to prevent corruption
- **Mnemonic:** Stored separately in `seed.mnemonic.enc` with the same encryption

### Seed in memory

- Decrypted on-demand for each `AuthorizeArtifact` or `ExportViewingKey` call
- Held on the stack for the duration of the signing operation only
- No long-lived unlocked session
- `Zeroizing` wrappers used in the API layer for passwords and mnemonics

### IPC authentication

- X25519 ECDH key exchange on connection
- Per-message Blake2b-256 MAC (keyed-hash: `Blake2b(hmac_key || payload)`)
- MAC mismatch drops the connection immediately
- Keypairs are ephemeral — regenerated on each daemon restart
- See [ADR-001](../../adr/001-ipc-auth-model.md) for the full design

### Password sealing

- Passwords are never sent in plaintext over IPC
- The API layer creates an ephemeral X25519 keypair per operation
- Password is Argon2id-hashed with a domain separator (`"keypunkd-seed-key"`)
- Hashed password is encrypted to keypunkd's public key before transmission
- keypunkd decrypts with its private key, uses the hash to decrypt the seed

### Air-gapped signing

- The mobile signer app (Tauri v2) holds keys on a separate device
- Communication via QR codes (BC-UR fountain coding) — no network connection needed
- The bridge relay uses the same IPC authentication on the socket side
- See [BRIDGE.md](BRIDGE.md) for the bridge protocol

## What's Not Protected

### Wallet database is plaintext

- `paypunkd.db` is an unencrypted SQLite file
- `is_locked()` always returns `false`
- Encryption at rest is planned but not yet implemented
- **Risk:** Anyone with filesystem access can read account data, viewing keys, and transaction history

### IPC provides integrity, not confidentiality

- The Blake2b MAC authenticates messages but does not encrypt them
- Postcard-serialized payloads ride in cleartext over the Unix socket
- Sensitive fields (passwords, mnemonics) are encrypted at the application layer before serialization
- **Risk:** A local attacker sniffing the socket could see unsigned transaction details (recipient, amount)

### No client identity verification

- Any process that can reach the socket path can complete the X25519 handshake
- The handshake establishes a shared MAC key but never verifies *who* the client is
- Access control is entirely via filesystem permissions on the socket path
- **Risk:** On a shared host, any user can connect to the socket. Mitigate by restricting the socket directory permissions or running daemons as separate users.

### Separate system user not enforced

- `keypunkd` is designed to run as a separate system user for defense-in-depth
- This is a deployment concern, not enforced by code
- No `setuid`, `setgid`, or user-switching logic exists in the codebase
- **Mitigation:** Use systemd unit files with `User=` directives to enforce process isolation

### Bridge binds to all interfaces

- The bridge HTTP/WebSocket server binds to `0.0.0.0:{port}`, not localhost
- No TLS, no WebSocket authentication
- Any network client can connect and intercept signing requests
- **Risk:** On a networked machine, a remote attacker could connect to the bridge WebSocket and inject forged signing responses
- **Mitigation:** Only use the bridge on a trusted network or behind a firewall. The camera-based QR flow requires `localhost` or HTTPS for `getUserMedia` access.

### Passwords on the command line

- The CLI accepts passwords via `--password` flag only
- No interactive prompt, environment variable, or secrets file support yet
- **Risk:** Passwords appear in process arguments and shell history
- **Mitigation:** Use the TUI for interactive use. CLI password input improvements are planned.

## Threat Model

### Attacker with filesystem access (no keypunkd password)

| Asset | Exposed? | Notes |
|-------|----------|-------|
| Seed | No | Encrypted with Argon2id + AES-256-GCM |
| Mnemonic | No | Encrypted with same scheme |
| Viewing keys | Yes | Stored in `paypunkd.db` (plaintext) |
| Transaction history | Yes | Stored in `paypunkd.db` (plaintext) |
| Address book | Yes | Stored in `paypunkd.db` (plaintext) |
| Settings | Yes | Stored in `paypunkd.db` (plaintext) |

### Attacker with filesystem access + keypunkd password

| Asset | Exposed? | Notes |
|-------|----------|-------|
| Seed | Yes | Password decrypts the seed |
| Mnemonic | Yes | Password decrypts the mnemonic |
| All funds | Yes | Seed allows signing transactions |

### Attacker with process memory access to keypunkd

| Asset | Exposed? | Notes |
|-------|----------|-------|
| Decrypted seed | Yes | On the stack during signing operations |
| IPC keypair | Yes | Ephemeral, regenerated on restart |
| All funds | Yes | Seed allows signing transactions |
| **Mitigation** | | Run keypunkd as a separate system user; limit memory access |

### Attacker with process memory access to paypunkd

| Asset | Exposed? | Notes |
|-------|----------|-------|
| Seed | No | Never held by paypunkd |
| Viewing keys | Yes | Stored in DB, loaded into memory |
| IPC keypair | Yes | Ephemeral, regenerated on restart |
| **Mitigation** | | Viewing keys are non-spending; risk is metadata exposure |

### Attacker on the network (bridge mode)

| Asset | Exposed? | Notes |
|-------|----------|-------|
| Unsigned transactions | Yes | Bridge WS has no auth, binds to 0.0.0.0 |
| Forged signatures | Yes | Attacker can inject WS responses |
| **Mitigation** | | Use bridge only on trusted networks; prefer the mobile signer app |

## Recommendations

1. **Run keypunkd as a separate system user** — Use systemd `User=` and `Group=` directives. This provides file/memory isolation even though the code doesn't enforce it.
2. **Restrict socket permissions** — Place Unix sockets in a directory with restricted permissions (e.g., `/run/paypunk/` with `0700`).
3. **Use the mobile signer for high-value wallets** — Air-gapped signing via QR codes eliminates network attack surface.
4. **Don't use `--password` on shared systems** — Passwords in process arguments are visible to other users via `ps`.
5. **Encrypt the wallet database** — Until DB encryption is implemented, consider full-disk encryption (LUKS) for the data directory.
6. **Keep keypunkd off the network** — keypunkd only needs a Unix socket, not network access. Firewall it if possible.

## Reporting vulnerabilities

Please report security issues privately by opening a draft GitHub issue at https://github.com/blockhackersio/paypunk/issues.
