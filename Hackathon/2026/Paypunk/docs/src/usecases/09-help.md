# HelpScreen — Keybinding Overlay

**File:** `tui/src/screens/help.rs:11`

Context-sensitive help overlay pushed on top of the current screen. Dismissed with `Esc`, `q`, or `?`.

**Persistence:** None. Pure UI overlay — no API calls, no IPC, no DB or file access.

```mermaid
sequenceDiagram
    participant U as User
    participant CurrentScreen as Active Screen
    participant TUI as HelpScreen

    Note over CurrentScreen: User presses '?' while on any screen
    CurrentScreen->>CurrentScreen: Nav::Push(HelpScreen::new(self.name()))
    App->>HelpScreen: init() — no-op

    Note over TUI: Renders: keybinding reference for current_screen name

    alt Screen name matches known bindings
        Note over TUI: Shows bindings for: Wallets, Assets, Home, Send, Receive, Lock, Settings, or Setup
    else Unknown screen name
        Note over TUI: Shows generic: Esc/q to close
    end

    U->>TUI: Esc / q / ?
    TUI->>TUI: Nav::Pop (returns to previous screen)
```

The HelpScreen is a **pure UI overlay** — it makes no API calls, has no IPC interactions, and touches no persistence layer. It reads the current screen name from its constructor and returns static keybinding data based on that name.
