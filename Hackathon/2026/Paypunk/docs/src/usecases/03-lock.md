# LockScreen — Re-authentication

**File:** `tui/src/screens/lock.rs:17`

Shown after auto-lock timeout. User authenticates with password to return to HomeScreen.

**Persistence:** `get_lock()` reads lock state (password set, failed attempts) from paypunkd via IPC. `submit_lock()` verifies the password against keypunkd via IPC. Failed attempts are tracked server-side.

```mermaid
sequenceDiagram
    participant U as User
    participant TUI as LockScreen
    participant API as RealWalletApi
    participant Client as paypunk-api Client
    participant paypunkd as paypunkd (IPC)
    participant keypunkd as keypunkd (IPC)

    Note over TUI: init() called
    TUI->>API: get_lock()
    API->>Client: get_lock_state()
    Client->>paypunkd: IpcMessage(GetLockState)
    paypunkd->>paypunkd: check .wallet_initialized marker (HasSeed)
    paypunkd-->>Client: LockState { password_set, failed_attempts }
    Client-->>API: (password_set, failed_attempts)
    API-->>TUI: LockData { auth_methods: { password_set }, failed_attempts }

    Note over TUI: Renders password field + failed attempts counter

    U->>TUI: Type password + Enter

    TUI->>API: submit_lock(LockInput { credential: { type: "password", value } })
    API->>Client: verify_password(password)
    Client->>paypunkd: IpcMessage(VerifyPassword)
    paypunkd->>keypunkd: verify_password
    keypunkd->>keypunkd: attempt seed decryption with password
    alt Correct password
        keypunkd-->>paypunkd: PasswordVerified
        paypunkd-->>Client: Ok
        API-->>TUI: Ok(())
        TUI->>TUI: Nav::Replace(Box::new(HomeScreen))
    else Wrong password
        keypunkd-->>paypunkd: Error
        paypunkd-->>Client: Err
        API-->>TUI: Err(ApiError)
        Note over TUI: Shows error, stays on LockScreen
    end
```

On `Esc`, it returns `Nav::Pop`.
