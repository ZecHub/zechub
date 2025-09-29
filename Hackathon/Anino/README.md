# Anino — Hackathon Submission

This folder contains the complete source, assets, and scripts needed to build and run Anino (Linux desktop demo).

## Purpose & Scope
Anino (Tagalog for "shadow") is a privacy‑first Zcash wallet and chat prototype. It pairs YWallet’s robust core with a Zashi‑inspired UX so users benefit from familiar workflows while reducing privacy foot‑guns (encouraging Orchard‑capable UA and shielding flows).

## Core Features
- Multi‑account: create/restore, rename, watch‑only, ordering
- Send/Receive ZEC with USD entry (when rates available)
- Privacy defaults (in progress): prefer Orchard, plan sweep from t‑addr to UA before spend
- Encrypted chat MVP via memo headers (invite/accept, replies, reactions)
- Desktop demo supports two isolated instances (A: default, B: isolated XDG)

## Architecture (high‑level)
```
Flutter UI (Dart) ──flutter_rust_bridge── Rust (zcash-warpsync)
       │                                   │
       ├────────── Lightwalletd (configurable URLs) ─────────┤
       └──── SQLite per profile (XDG dirs for A/B) ──────────┘
```

## Build (Linux Desktop)
1) Build Rust FFI and Flutter bundle:
```
cargo build -p zcash-warpsync --lib --features dart_ffi --profile dev
mkdir -p linux/lib && cp target/debug/libwarp_api_ffi.so linux/lib/libwarp_api_ffi.so
flutter pub get
flutter build linux --debug
```

2) Launch Instance A (default profile):
```
BIN_DIR=build/linux/x64/debug/bundle
env LD_LIBRARY_PATH="$BIN_DIR/lib" "$BIN_DIR/ywallet" \
  > run-ywallet-A.log 2>&1 & echo $! >/tmp/ywalletA.pid; disown
```

3) Launch Instance B (isolated profile):
```
BIN_DIR=build/linux/x64/debug/bundle
mkdir -p ~/.local/share/ywallet-profile-2 ~/.config/ywallet-profile-2 ~/.cache/ywallet-profile-2 ~/.local/state/ywallet-profile-2
env XDG_DATA_HOME="$HOME/.local/share/ywallet-profile-2" \
    XDG_CONFIG_HOME="$HOME/.config/ywallet-profile-2" \
    XDG_CACHE_HOME="$HOME/.cache/ywallet-profile-2" \
    XDG_STATE_HOME="$HOME/.local/state/ywallet-profile-2" \
    LD_LIBRARY_PATH="$BIN_DIR/lib" "$BIN_DIR/ywallet" \
  > run-ywallet-B.log 2>&1 & echo $! >/tmp/ywalletB.pid; disown
```

4) Stop/verify:
```
kill "$(cat /tmp/ywalletA.pid)" 2>/dev/null || true
kill "$(cat /tmp/ywalletB.pid)" 2>/dev/null || true
pgrep -fl ywallet
```

## Technology Stack
- Flutter (Dart) UI
- Rust core via flutter_rust_bridge (zcash‑warpsync)
- SQLite, SharedPreferences
- Lightwalletd backends (Zcash/Ycash)
- GTK Linux embedding

## Attribution
- Core forked from YWallet (see LICENSE.md)
- UX inspiration from Zashi
