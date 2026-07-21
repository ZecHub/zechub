# SetupScreen — Wallet Creation / Import

**File:** `tui/src/screens/setup.rs:32`

Two paths: **Create New Wallet** and **Import Existing Wallet**. Both end with `Nav::Replace(HomeScreen)` on success.

## Create New Wallet Flow

```mermaid
sequenceDiagram
    participant U as User
    participant TUI as SetupScreen
    participant API as RealWalletApi
    participant Client as paypunk-api Client
    participant paypunkd as paypunkd (IPC)
    participant keypunkd as keypunkd (IPC)
    participant SeedFile as seed.enc (disk)
    participant SQLite as paypunkd.db (SQLite)

    Note over TUI: init() called
    TUI->>API: get_setup()
    API->>Client: generate_mnemonic()
    Client-->>API: Zeroizing<String> (12-word phrase)
    API-->>TUI: SetupData { new_mnemonic: [12 words], ... }

    Note over TUI: User sees mnemonic (ShowMnemonic step)

    U->>TUI: Enter (confirm saved)
    Note over TUI: VerifyMnemonic step — user types words #4, #8, #12

    U->>TUI: Enter (verification submitted)
    TUI->>TUI: Validate words against stored mnemonic
    Note over TUI: SetPassword step — user enters + confirms password

    U->>TUI: Enter (password submitted)
    Note over TUI: Creating step — spinner shown

    TUI->>API: submit_setup_create(SetupCreateInput { password })
    API->>Client: restore_seed(mnemonic, password)
    Client->>paypunkd: IpcMessage(RestoreSeed { encrypted_mnemonic, encrypted_password, client_pk })
    paypunkd->>keypunkd: forward RestoreSeed
    keypunkd->>keypunkd: decrypt password, validate mnemonic, derive seed
    keypunkd->>keypunkd: encrypt_seed(seed, password) — Argon2id + AES-256-GCM
    keypunkd->>SeedFile: write(encrypted_blob) — atomic write via seed.enc.tmp + rename
    keypunkd-->>paypunkd: SeedRestored

    API->>Client: unlock(password)
    Client->>paypunkd: IpcMessage(Unlock { encrypted_keypunkd_password, keypunkd_client_pk, paths })
    paypunkd->>paypunkd: ensure database file exists, run migrations
    paypunkd->>keypunkd: bulk_export_viewing_keys(encrypted_password, keypunkd_client_pk, paths)
    keypunkd->>keypunkd: decrypt seed, derive viewing keys for 30 paths per protocol
    keypunkd-->>paypunkd: viewing keys per (protocol, path)
    paypunkd->>SQLite: INSERT OR REPLACE INTO pre_derived_keys (protocol, account_index, viewing_key) — for each key
    paypunkd->>SQLite: SELECT viewing_key FROM pre_derived_keys WHERE protocol=?1 AND account_index=?2 — for account 0
    paypunkd->>paypunkd: derive address from viewing key via protocol
    paypunkd->>SQLite: INSERT INTO accounts (id, protocol, derivation_path, name, address, viewing_key, created_at) — first account per protocol
    paypunkd-->>Client: UnlockSuccess { accounts_count }
    Client-->>API: Ok(accounts_count)
    API-->>TUI: Ok(())

    TUI->>TUI: Nav::Replace(HomeScreen)
```

## Import Existing Wallet Flow

```mermaid
sequenceDiagram
    participant U as User
    participant TUI as SetupScreen
    participant API as RealWalletApi
    participant Client as paypunk-api Client
    participant paypunkd as paypunkd (IPC)
    participant keypunkd as keypunkd (IPC)
    participant SeedFile as seed.enc (disk)
    participant SQLite as paypunkd.db (SQLite)

    Note over TUI: init() called
    TUI->>API: get_setup()
    API-->>TUI: SetupData { import_methods: ["mnemonic"], ... }

    U->>TUI: Select "Import Existing Wallet"
    Note over TUI: ImportMnemonic step — 12-field grid

    U->>TUI: Enter (phrase entered)
    Note over TUI: ImportPassword step — set + confirm password

    U->>TUI: Enter (password submitted)

    TUI->>API: submit_setup_import(SetupImportInput { method: "mnemonic", secret: phrase, password })
    API->>Client: restore_seed(mnemonic, password)
    Client->>paypunkd: IpcMessage(RestoreSeed { encrypted_mnemonic, encrypted_password, client_pk })
    paypunkd->>keypunkd: forward RestoreSeed
    keypunkd->>keypunkd: decrypt password, validate mnemonic, derive seed
    keypunkd->>keypunkd: encrypt_seed(seed, password) — Argon2id + AES-256-GCM
    keypunkd->>SeedFile: write(encrypted_blob) — atomic write
    keypunkd-->>paypunkd: SeedRestored

    API->>Client: unlock(password)
    Client->>paypunkd: IpcMessage(Unlock { ... })
    paypunkd->>SQLite: ensure file exists, run migrations
    paypunkd->>keypunkd: bulk_export_viewing_keys
    keypunkd->>keypunkd: derive viewing keys
    keypunkd-->>paypunkd: keys
    paypunkd->>SQLite: INSERT pre_derived_keys (30 per protocol)
    paypunkd->>SQLite: INSERT accounts (first account per protocol)
    paypunkd-->>Client: UnlockSuccess
    Client-->>API: Ok(())
    API-->>TUI: Ok(())

    TUI->>TUI: Nav::Replace(HomeScreen)
```
