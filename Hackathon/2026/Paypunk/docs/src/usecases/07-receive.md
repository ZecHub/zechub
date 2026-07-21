# ReceiveScreen — Display Receiving Address

**File:** `tui/src/screens/receive.rs:15`

Shows the account's receiving address, format info, QR payload, and a simulated QR code.

**Persistence involved:**
- `receive_state()` reads from `accounts` SQLite table to get the account's address
- No writes to any persistence layer

```mermaid
sequenceDiagram
    participant U as User
    participant TUI as ReceiveScreen
    participant API as RealWalletApi
    participant Client as paypunk-api Client
    participant paypunkd as paypunkd (IPC)
    participant SQLite as paypunkd.db (SQLite)

    Note over TUI: init(account) called
    TUI->>API: receive_state(account_id)
    API->>Client: get_account(account_id)
    Client->>paypunkd: IpcMessage(GetAccount { id })
    paypunkd->>SQLite: SELECT id, protocol, derivation_path, name, address, viewing_key, created_at FROM accounts WHERE id=?1
    SQLite-->>paypunkd: account row
    paypunkd-->>Client: AccountFound { account }
    Client-->>API: Ok(Some(account))
    API-->>TUI: ApiState::Loaded(ReceiveData { address, chain_id, address_format: "hex", qr_payload: address })

    Note over TUI: Renders: Address, Format, QR Payload, simulated QR box

    U->>TUI: 'c' (copy address)
    TUI->>TUI: arboard::Clipboard::set_text(address)
    TUI->>TUI: Show "Copied!" feedback

    U->>TUI: Esc
    TUI->>TUI: Nav::Pop
```

## Reactivation Flow

```mermaid
sequenceDiagram
    participant TUI as ReceiveScreen
    participant API as RealWalletApi
    participant SQLite as paypunkd.db (SQLite)

    Note over TUI: on_reactivate() called
    TUI->>API: refresh_receive(account_id)
    API-->>TUI: (clears in-memory cache)
    TUI->>API: receive_state(account_id)
    API->>Client: get_account(account_id)
    Client->>paypunkd: IpcMessage(GetAccount)
    paypunkd->>SQLite: SELECT * FROM accounts WHERE id=?
    SQLite-->>paypunkd: account
    paypunkd-->>Client: account
    API-->>TUI: Fresh ReceiveData
```
