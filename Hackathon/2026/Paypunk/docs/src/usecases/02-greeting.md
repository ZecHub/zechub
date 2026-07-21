# GreetingScreen — Initial Unlock

**File:** `tui/src/screens/greeting.rs:16`

Shown when `check_wallet_exists()` returns `true` (existing wallet found). Prompts for password, then navigates to HomeScreen.

## Persistence involved:
- **keypunkd** reads `seed.enc` from disk and decrypts with password to derive viewing keys
- **paypunkd** opens `paypunkd.db` (plaintext SQLite), runs migrations
- **paypunkd** writes pre-derived viewing keys to `pre_derived_keys` table
- **paypunkd** writes first account to `accounts` table

```mermaid
sequenceDiagram
    participant U as User
    participant lib as run_tui()
    participant API as RealWalletApi
    participant Client as paypunk-api Client
    participant paypunkd as paypunkd (IPC)
    participant keypunkd as keypunkd (IPC)
    participant SeedFile as seed.enc (disk)
    participant SQLite as paypunkd.db (disk)

    lib->>API: check_wallet_exists()
    API->>Client: check_wallet_exists()
    Client->>paypunkd: IpcMessage(HasSeed)
    paypunkd->>paypunkd: check .wallet_initialized marker file
    paypunkd-->>Client: HasSeed { exists: true }
    Client-->>API: true
    API-->>lib: true

    lib->>GreetingScreen: init() — no-op
    lib->>lib: Push GreetingScreen onto screen stack
    lib->>GreetingScreen: render() — shows password field

    U->>GreetingScreen: Type password + Enter

    GreetingScreen->>API: unlock(password)

    API->>Client: unlock(password)
    Note over Client: Creates ephemeral X25519 Keypair
    Client->>paypunkd: IpcMessage(GetKeypunkEncryptionKey)
    paypunkd-->>Client: keypunkd public key
    Client->>paypunkd: IpcMessage(GetPaypunkdEncryptionKey)
    paypunkd-->>Client: paypunkd public key
    Note over Client: Argon2id-hashes password for domain:
    Note over Client: "keypunkd-seed-key" → encrypted to keypunkd's key
    Client->>paypunkd: IpcMessage(GetSupportedProtocols)
    paypunkd-->>Client: [ProtocolId::Ethereum, ProtocolId::Zcash, ...]
    Note over Client: Builds derivation paths: 30 per protocol (0..29)

    Client->>paypunkd: IpcMessage(Unlock { encrypted_keypunkd_password, keypunkd_client_pk, paths })

    paypunkd->>SQLite: ensure paypunkd.db exists, run pending migrations
    paypunkd->>SQLite: SELECT * FROM accounts
    Note over paypunkd: No accounts found (first unlock)

    paypunkd->>keypunkd: bulk_export_viewing_keys(encrypted_keypunkd_password, keypunkd_client_pk, paths)
    keypunkd->>SeedFile: read() — load encrypted seed blob
    keypunkd->>keypunkd: decrypt seed with password
    keypunkd->>keypunkd: for each (protocol, path): derive viewing key from seed
    keypunkd-->>paypunkd: [(protocol, path, viewing_key), ...] — 60 keys (30 eth + 30 zcash)

    paypunkd->>SQLite: INSERT OR REPLACE INTO pre_derived_keys (protocol, account_index, viewing_key) — 60 rows
    paypunkd->>SQLite: SELECT viewing_key FROM pre_derived_keys WHERE protocol='Ethereum' AND account_index=0
    paypunkd->>paypunkd: derive address from viewing key via protocol
    paypunkd->>SQLite: INSERT INTO accounts (id, protocol, derivation_path, name, address, viewing_key, created_at) — Ethereum account 0
    paypunkd->>SQLite: SELECT viewing_key FROM pre_derived_keys WHERE protocol='Zcash' AND account_index=0
    paypunkd->>paypunkd: derive address from viewing key
    paypunkd->>SQLite: INSERT INTO accounts — Zcash account 0
    paypunkd-->>Client: UnlockSuccess { accounts_count: 2 }
    Client-->>API: Ok(2)
    API-->>GreetingScreen: Ok(UnlockData { accounts_count: 2 })

    GreetingScreen->>GreetingScreen: Nav::Replace(Box::new(HomeScreen))
```
