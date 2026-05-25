## Anino — Hackathon Submission

### Purpose & Scope
Anino (Tagalog for “shadow”) is a privacy‑first Zcash wallet and chat prototype. It aims to pair YWallet’s proven core with a Zashi‑inspired UX: simple, predictable, and privacy‑by‑default. The “shadow” metaphor reflects the intent to mirror familiar Zashi workflows so users instantly understand how to navigate, while layering in opinionated privacy defaults (e.g., forcing sweeps from transparent to shielded, emphasizing Orchard‑capable addresses, and reducing foot‑guns).

Problems addressed:
- Onboarding friction: familiar UX modeled after Zashi lowers cognitive load.
- Privacy foot‑guns: encourage Orchard and shielded flows; plan to sweep t‑addr funds before spend.
- Coordination friction: encrypted, memo‑based chat embedded directly in the wallet to request/send ZEC without switching apps.

### Core Features (current prototype)
- Multi‑account management: create, restore, rename, re‑order, mark watch‑only.
- Send/Receive ZEC: standard flows; USD entry with live rate fetch when available.
- Privacy defaults (in progress):
  - Prefer Orchard‑capable UA; plan to force sweep of t‑addr funds before spend.
  - Immediate sync on desktop start; background 15s cadence thereafter.
- Encrypted Chat (memo‑based) MVP:
  - Invite/Accept handshake using structured headers in memo.
  - Per‑contact reply‑to UA; block messaging until an invite is accepted.
  - Reactions and replies; transaction deep‑links inline (send/request ZEC from a thread).
- Desktop dual‑instance support: launch Instance A (default profile) and Instance B (isolated profile) for demos/tests.

### Architecture (high level)
```
+---------------------------+           +-----------------------+
| Flutter UI (Dart)        |           | Lightwalletd servers |
|  - Screens: accounts,    |  updateLWD+----> ZEC RPC/GRPC     |
|    send/receive, chat    |<----------+                       |
|  - Router/state/mobx     |           +-----------------------+
|  - Chat UX (headers)     |
|                          |           +-----------------------+
| Dart FFI (flutter_rust_bridge)       | Zcash Rust core (warp)|
|  - RustLib.init()        |<--------->|  - zcash-warpsync     |
|  - WarpApi.* calls       |           |  - wallet/db/scan     |
|                          |           +-----------------------+
| Local Storage            |                
|  - SQLite db per profile |           +-----------------------+
|  - XDG dirs (A/B)        |<--------->| OS (Linux desktop)    |
|                          |           |  - GTK window, logs   |
+--------------------------+           +-----------------------+
```

Data/flow highlights:
- On startup, Rust FFI is initialized; wallets are opened and LWD URL is set from user settings or defaults. Desktop auto‑triggers a manual sync on first frame.
- Chat uses human‑readable headers in memos: `v1; type=invite|accept; conversation_id=...; seq=...; reply_to_ua=...` to coordinate handshakes and dedupe echoes.
- Instance B runs under isolated XDG dirs to guarantee profile separation for demos.

### Technology Stack
- Frontend: Flutter (Dart) with Material 3‑style components and theming.
- Core wallet + sync: Rust (`zcash-warpsync`) via `flutter_rust_bridge` FFI.
- Desktop: GTK (Linux) embedding; Linux debug bundle for demos.
- Persistence: SQLite databases per profile; SharedPreferences for settings.
- Networking: Lightwalletd (configurable; defaults provided for Zcash/Ycash).

### How to Run (Linux Desktop)
1) Build once:
```
cd /home/kameron/Documents/fuckbitcoin/Anino/zwallet
cargo build -p zcash-warpsync --lib --features dart_ffi --profile dev
mkdir -p linux/lib && cp target/debug/libwarp_api_ffi.so linux/lib/libwarp_api_ffi.so
${HOME}/flutter_3.22.2/bin/flutter pub get
${HOME}/flutter_3.22.2/bin/flutter build linux --debug
```
2) Launch A and B:
```
# A (default profile)
BIN_DIR=/home/kameron/Documents/fuckbitcoin/Anino/zwallet/build/linux/x64/debug/bundle
env LD_LIBRARY_PATH="$BIN_DIR/lib" "$BIN_DIR/ywallet" \
  > /home/kameron/Documents/fuckbitcoin/Anino/zwallet/run-ywallet-A.log 2>&1 & echo $! >/tmp/ywalletA.pid; disown

# B (isolated profile)
mkdir -p ~/.local/share/ywallet-profile-2 ~/.config/ywallet-profile-2 ~/.cache/ywallet-profile-2 ~/.local/state/ywallet-profile-2
env XDG_DATA_HOME="$HOME/.local/share/ywallet-profile-2" \
    XDG_CONFIG_HOME="$HOME/.config/ywallet-profile-2" \
    XDG_CACHE_HOME="$HOME/.cache/ywallet-profile-2" \
    XDG_STATE_HOME="$HOME/.local/state/ywallet-profile-2" \
    LD_LIBRARY_PATH="$BIN_DIR/lib" "$BIN_DIR/ywallet" \
  > /home/kameron/Documents/fuckbitcoin/Anino/zwallet/run-ywallet-B.log 2>&1 & echo $! >/tmp/ywalletB.pid; disown
```

### Notes & Future Work
- Enforce automatic sweeps from t‑addr to UA before spend; surface Orchard preference throughout UI.
- Complete request‑ZEC flow and wire it into message threads.
- Expand rebrand assets/text; today, process/binary remain `ywallet` while window title shows “Anino”.
- Cross‑platform builds beyond Linux desktop.

### Credits
- Upstream: YWallet (core, performance, reliability)
- UX Inspiration: Zashi (clear, privacy‑first expectations)


