# HomeScreen — Account List / Main Menu

**File:** `tui/src/screens/home.rs:19`

Displays all wallet accounts in a selectable list. Entry point for all other screens.

**Persistence involved:**
- `list_accounts()` reads from `accounts` SQLite table via `paypunkd`
- `add_account()` reads `pre_derived_keys` table for the viewing key, then inserts into `accounts` table

```mermaid
sequenceDiagram
    participant U as User
    participant TUI as HomeScreen
    participant API as RealWalletApi
    participant Client as paypunk-api Client
    participant paypunkd as paypunkd (IPC)
    participant SQLite as paypunkd.db (SQLite)

    Note over TUI: init() called
    TUI->>API: home_state()
    API->>Client: list_accounts()
    Client->>paypunkd: IpcMessage(ListAccounts)
    paypunkd->>SQLite: SELECT id, protocol, derivation_path, name, address, viewing_key, created_at FROM accounts
    SQLite-->>paypunkd: account rows
    paypunkd-->>Client: AccountsList { accounts }
    Client-->>API: Ok(accounts)
    API->>API: Enrich with protocol metadata (chain_id, ticker)
    API-->>TUI: ApiState::Loaded(HomeData { accounts })

    Note over TUI: Renders account list

    U->>TUI: Enter (select account)
    TUI->>TUI: Nav::Push(AssetsScreen)

    U->>TUI: 's' (send from account)
    TUI->>TUI: Nav::Push(SendScreen)

    U->>TUI: 'o' (receive to account)
    TUI->>TUI: Nav::Push(ReceiveScreen)

    U->>TUI: 'a' (add account)
    TUI->>API: add_account()
    API->>Client: list_accounts() — check existing accounts
    Client->>paypunkd: IpcMessage(ListAccounts)
    paypunkd->>SQLite: SELECT * FROM accounts
    SQLite-->>paypunkd: accounts
    paypunkd-->>Client: accounts
    Note over API: Pick protocol with most accounts, compute next index
    API->>Client: create_account(protocol, derivation_path, index, name)
    Client->>paypunkd: IpcMessage(CreateAccount { protocol, derivation_path, account_index, name })
    paypunkd->>SQLite: SELECT viewing_key FROM pre_derived_keys WHERE protocol=?1 AND account_index=?2
    SQLite-->>paypunkd: viewing_key bytes
    paypunkd->>paypunkd: derive address from viewing key via protocol
    paypunkd->>SQLite: INSERT INTO accounts (id, protocol, derivation_path, name, address, viewing_key, created_at) VALUES (...)
    SQLite-->>paypunkd: ok
    paypunkd-->>Client: AccountCreated { account }
    Client-->>API: Ok(account)
    API-->>TUI: Ok(())
    TUI->>API: refresh_home() + home_state()
    API-->>TUI: Updated account list

    U->>TUI: 'r' (refresh)
    TUI->>API: refresh_home() + home_state()
    API-->>TUI: Refreshed account list

    U->>TUI: 'q' (quit)
    TUI->>TUI: Nav::Quit

    U->>TUI: '?' (help)
    TUI->>TUI: Nav::Push(HelpScreen)
```

## Reactivation Flow (returning from child screen)

```mermaid
sequenceDiagram
    participant TUI as HomeScreen
    participant API as RealWalletApi

    Note over TUI: on_reactivate() called by App.process_nav(Nav::Pop)
    TUI->>API: refresh_home()
    API-->>TUI: (clears in-memory cache)
    TUI->>API: home_state()
    API->>Client: list_accounts() — fresh DB read
    Client->>paypunkd: IpcMessage(ListAccounts)
    paypunkd->>SQLite: SELECT * FROM accounts
    SQLite-->>paypunkd: accounts
    paypunkd-->>Client: accounts
    API-->>TUI: ApiState::Loaded(HomeData)
    TUI->>TUI: rebuild_list() with fresh data
```
