# AssetsScreen — Balance View

**File:** `tui/src/screens/assets.rs:27`

Shows account's asset holdings. Has Send/Receive/History buttons and sync status polling.

**Persistence involved:**
- `get_assets()` reads from `accounts` SQLite table to get the account's address and protocol
- Balance is fetched from the chain (RPC call via protocol implementation), NOT from the DB
- Sync status is from the protocol layer (no DB)

```mermaid
sequenceDiagram
    participant U as User
    participant TUI as AssetsScreen
    participant API as RealWalletApi
    participant Client as paypunk-api Client
    participant paypunkd as paypunkd (IPC)
    participant SQLite as paypunkd.db (SQLite)
    participant Chain as Blockchain RPC

    Note over TUI: init(account_id) called
    TUI->>API: get_assets(account_id)
    API->>Client: get_account(account_id)
    Client->>paypunkd: IpcMessage(GetAccount { id })
    paypunkd->>SQLite: SELECT id, protocol, derivation_path, name, address, viewing_key, created_at FROM accounts WHERE id=?1
    SQLite-->>paypunkd: account row
    paypunkd-->>Client: AccountFound { account }
    Client-->>API: Ok(Some(account))
    API->>API: Enrich with protocol metadata (chain_id, decimals, ticker, asset)
    API->>Client: get_balance(caip10_address, asset)
    Client->>paypunkd: IpcMessage(GetBalance { address, asset })
    paypunkd->>Chain: protocol.get_balance(address, asset) — RPC call
    Chain-->>paypunkd: balance
    paypunkd-->>Client: Balance { spendable, pending, total }
    Client-->>API: Ok(balance)
    API-->>TUI: AssetsData { assets: [AssetRow { holdings_amount, ... }] }

    Note over TUI: Renders asset table + button bar

    loop Every render tick (~50ms)
        TUI->>API: get_sync_status(protocol)
        API->>Client: get_sync_status(protocol_id)
        Client->>paypunkd: IpcMessage(GetSyncStatus { protocol })
        Note over paypunkd: Currently returns hardcoded SyncStatus{ is_syncing: false }
        paypunkd-->>Client: SyncStatusResult { status }
        Client-->>API: Ok(status)
        API-->>TUI: SyncStatus { is_syncing, current_height, target_height }
        Note over TUI: If syncing, renders progress bar in header
    end

    U->>TUI: Click "Send" button (or Enter on button)
    TUI->>TUI: Nav::Push(SendScreen)

    U->>TUI: Click "Receive" button
    TUI->>TUI: Nav::Push(ReceiveScreen)

    U->>TUI: Click "History" button
    TUI->>TUI: Nav::Push(HistoryScreen)

    U->>TUI: Esc
    TUI->>TUI: Nav::Pop
```

## Reactivation Flow

```mermaid
sequenceDiagram
    participant TUI as AssetsScreen
    participant API as RealWalletApi
    participant SQLite as paypunkd.db (SQLite)
    participant Chain as Blockchain RPC

    Note over TUI: on_reactivate() called after child screen pops
    TUI->>API: get_assets(account_id)
    API->>Client: get_account(account_id)
    Client->>paypunkd: IpcMessage(GetAccount)
    paypunkd->>SQLite: SELECT * FROM accounts WHERE id=?
    SQLite-->>paypunkd: account
    paypunkd-->>Client: account
    API->>Client: get_balance(address, asset)
    Client->>paypunkd: IpcMessage(GetBalance)
    paypunkd->>Chain: protocol.get_balance()
    Chain-->>paypunkd: balance
    paypunkd-->>Client: Balance
    API-->>TUI: Fresh AssetsData
    TUI->>TUI: Rebuild asset list
```
