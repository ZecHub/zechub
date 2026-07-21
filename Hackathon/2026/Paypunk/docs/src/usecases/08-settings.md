# SettingsScreen — Settings Management

**File:** `tui/src/screens/settings.rs:21`

Two sub-actions: **Main** (edit preferences) and **RevealPhrase** (authenticate to show mnemonic).

**Persistence:** Settings are persisted in the paypunkd SQLite database via `GetSettings`/`SaveSettings` IPC messages. Reveal phrase is implemented end-to-end via keypunkd's `ExportMnemonic`.

## Main Settings Flow

```mermaid
sequenceDiagram
    participant U as User
    participant TUI as SettingsScreen
    participant API as RealWalletApi
    participant Client as paypunk-api Client
    participant paypunkd as paypunkd (IPC)
    participant SQLite as paypunkd.db (SQLite)

    Note over TUI: init() called
    TUI->>API: get_settings()
    API->>Client: get_settings()
    Client->>paypunkd: IpcMessage(GetSettings)
    paypunkd->>SQLite: SELECT auto_lock_minutes, fiat_currency FROM settings
    SQLite-->>paypunkd: settings row
    paypunkd-->>Client: SettingsResult { auto_lock_minutes, fiat_currency }
    Client-->>API: (auto_lock_minutes, fiat_currency)
    API-->>TUI: SettingsData { security: { auto_lock_minutes }, fiat_currency, app_version: "0.1.0" }

    Note over TUI: Renders: Auto-Lock field, Fiat Currency field, "Reveal Recovery Phrase" option, "Save Settings" option

    U->>TUI: Edit Auto-Lock value
    U->>TUI: Edit Fiat Currency value
    U->>TUI: Navigate to "Save Settings" + Enter

    TUI->>API: submit_settings(SettingsInput { updated_security: { auto_lock_minutes }, fiat_currency })
    API->>Client: save_settings(auto_lock_minutes, fiat_currency)
    Client->>paypunkd: IpcMessage(SaveSettings { auto_lock_minutes, fiat_currency })
    paypunkd->>SQLite: INSERT OR REPLACE INTO settings
    paypunkd-->>Client: SettingsSaved
    Client-->>API: Ok(())
    API-->>TUI: Ok(())

    U->>TUI: Esc
    TUI->>TUI: Nav::Pop
```

## Reveal Recovery Phrase Flow

```mermaid
sequenceDiagram
    participant U as User
    participant TUI as SettingsScreen
    participant API as RealWalletApi
    participant Client as paypunk-api Client
    participant paypunkd as paypunkd (IPC)
    participant keypunkd as keypunkd (IPC)
    participant SeedFile as seed.enc (disk)

    Note over TUI: In Main action, focus on "Reveal Recovery Phrase" + Enter
    TUI->>TUI: Set action = RevealPhrase

    Note over TUI: Renders password field for authentication

    U->>TUI: Type password + Enter

    TUI->>API: submit_reveal_phrase(RevealPhraseInput { auth_type: "password", value })
    API->>Client: reveal_phrase(password)
    Client->>Client: encrypt password to keypunkd's public key via ephemeral X25519 keypair
    Client->>paypunkd: IpcMessage(RevealPhrase { encrypted_password, client_public_key })
    paypunkd->>keypunkd: forward ExportMnemonic
    keypunkd->>keypunkd: decrypt password via X25519 keystore
    keypunkd->>SeedFile: read() — load encrypted seed blob
    keypunkd->>keypunkd: decrypt_mnemonic(encrypted_blob, password) — Argon2id + AES-256-GCM
    keypunkd->>keypunkd: encrypt mnemonic to client's public key
    keypunkd-->>paypunkd: MnemonicExported { encrypted_mnemonic }
    paypunkd-->>Client: PhraseRevealed { encrypted_mnemonic }
    Client->>Client: decrypt mnemonic via ephemeral keypair
    Client-->>API: Ok(mnemonic words)
    API-->>TUI: Ok(vec!["ribbon", "velvet", ..., "anchor"]) — 12 words
    Note over TUI: Renders 12-word grid with warning: "Never share your recovery phrase"

    U->>TUI: Esc
    TUI->>TUI: Set action = Main, clear phrase
```
