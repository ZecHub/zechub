Launch YWallet (Linux Desktop) — Wayland-first Playbook

Quick Start — Choose 1 or 2 instances

Use this when you want exactly one or two YWallet windows, launched from the same built bundle.

Sync behavior (desktop): Both instances auto-start syncing
- On Linux desktop builds, both Instance A and Instance B now auto-start a manual sync on first frame. This guarantees each instance syncs its own transactions immediately at launch, then continues with the normal 15s auto-sync cadence.
- No extra flags or commands are needed. Just launch A and/or B using the steps below.

Interactive chooser (copy/paste to run):
```bash
#!/usr/bin/env bash
set -euo pipefail

ROOT="/home/kameron/Documents/fuckbitcoin/Anino/zwallet"

echo "[setup] Ensuring a single built bundle exists (from modified sources)"
if [ -x "$HOME/flutter_3.22.2/bin/flutter" ]; then
  FLUTTER="$HOME/flutter_3.22.2/bin/flutter"
elif [ -x "$HOME/flutter/bin/flutter" ]; then
  FLUTTER="$HOME/flutter/bin/flutter"
elif command -v flutter >/dev/null 2>&1; then
  FLUTTER="$(command -v flutter)"
else
  echo "[error] Flutter SDK not found under ~/flutter_3.22.2, ~/flutter, or PATH" >&2
  exit 1
fi

BIN_DIR=$(ls -d "$ROOT"/build/linux/*/debug/bundle 2>/dev/null | head -n1 || true)
if [ -z "${BIN_DIR:-}" ] || [ ! -x "$BIN_DIR/ywallet" ]; then
  echo "[build] Building FFI + bundle"
  command -v cargo >/dev/null 2>&1 || { echo "[error] cargo not found" >&2; exit 1; }
  cd "$ROOT"
  cargo build -p zcash-warpsync --lib --features dart_ffi --profile dev
  mkdir -p linux/lib && cp target/debug/libwarp_api_ffi.so linux/lib/libwarp_api_ffi.so
  "$FLUTTER" pub get
  "$FLUTTER" build linux --debug
  BIN_DIR=$(ls -d "$ROOT"/build/linux/*/debug/bundle 2>/dev/null | head -n1)
fi

echo "[clean] Closing any stray instances (safe)"
# Stop tracked A/B if present (ignores errors)
for f in /tmp/ywalletA.pid /tmp/ywalletB.pid; do
  [ -f "$f" ] && kill "$(cat "$f")" 2>/dev/null || true
done

# Close flutter_tester if running
pgrep -x flutter_tester >/dev/null && pgrep -x flutter_tester | xargs -r kill 2>/dev/null || true

# Close 'flutter run -d linux' processes safely
for pid in $(pgrep -x flutter || true); do
  if tr '\0' ' ' < "/proc/$pid/cmdline" | grep -qE 'flutter(\\S| )+run(\\S| )+-d(\\S| )+linux'; then
    kill "$pid" 2>/dev/null || true
  fi
done

# Close extra ywallet processes (keep A/B if tracked)
keep=""
[ -f /tmp/ywalletA.pid ] && keep+=" $(cat /tmp/ywalletA.pid)"
[ -f /tmp/ywalletB.pid ] && keep+=" $(cat /tmp/ywalletB.pid)"
for p in $(pgrep -x ywallet || true); do
  case " $keep " in *" $p "*) continue ;; esac
  kill "$p" 2>/dev/null || true
done

launch_A() {
  (cd "$BIN_DIR" && env LD_LIBRARY_PATH="$BIN_DIR/lib" ./ywallet \
    > "$ROOT/run-ywallet-A.log" 2>&1 & echo $! > /tmp/ywalletA.pid; disown)
}

launch_B() {
  mkdir -p "$HOME/.local/share/ywallet-profile-2" \
           "$HOME/.config/ywallet-profile-2" \
           "$HOME/.cache/ywallet-profile-2" \
           "$HOME/.local/state/ywallet-profile-2"
  (cd "$BIN_DIR" && env \
    XDG_DATA_HOME="$HOME/.local/share/ywallet-profile-2" \
    XDG_CONFIG_HOME="$HOME/.config/ywallet-profile-2" \
    XDG_CACHE_HOME="$HOME/.cache/ywallet-profile-2" \
    XDG_STATE_HOME="$HOME/.local/state/ywallet-profile-2" \
    LD_LIBRARY_PATH="$BIN_DIR/lib" \
    ./ywallet > "$ROOT/run-ywallet-B.log" 2>&1 & echo $! > /tmp/ywalletB.pid; disown)
}

read -rp "How many YWallet instances would you like to launch — 1 or 2? " COUNT
COUNT="${COUNT:-2}"
if [ "$COUNT" = "1" ]; then
  read -rp "Which YWallet would you like to launch: Instance A (existing development wallet) or Instance B (new wallet in an isolated profile)? [A/B] " WHICH
  case "${WHICH^^}" in
    A) launch_A ;;
    B) launch_B ;;
    *) echo "Please answer A or B." >&2; exit 1 ;;
  esac
else
  launch_A
  launch_B
fi

sleep 1
echo "[verify] Active YWallet processes:"
for p in $(pgrep -x ywallet); do echo -n "$p -> "; readlink "/proc/$p/exe"; done
```

Safety tip — safe cleanup alternative
- In some environments, using `pkill -f` can match the invoking shell's command line and terminate it. If you prefer PID-targeted cleanup, use this safer alternative before launching:
```bash
#!/usr/bin/env bash
set -euo pipefail

# Stop tracked A/B if present (ignores errors)
for f in /tmp/ywalletA.pid /tmp/ywalletB.pid; do
  [ -f "$f" ] && kill "$(cat "$f")" 2>/dev/null || true
done

# Close flutter_tester if running
pgrep -x flutter_tester >/dev/null && pgrep -x flutter_tester | xargs -r kill 2>/dev/null || true

# Close extra ywallet processes (keep A/B if tracked)
keep=""
[ -f /tmp/ywalletA.pid ] && keep+=" $(cat /tmp/ywalletA.pid)"
[ -f /tmp/ywalletB.pid ] && keep+=" $(cat /tmp/ywalletB.pid)"
for p in $(pgrep -x ywallet || true); do
  case " $keep " in *" $p "*) continue ;; esac
  kill "$p" 2>/dev/null || true
done
```

Manual launch (copy/paste)

1) Build once from modified sources (if you haven’t already):
```bash
cd /home/kameron/Documents/fuckbitcoin/Anino/zwallet
cargo build -p zcash-warpsync --lib --features dart_ffi --profile dev
mkdir -p linux/lib && cp target/debug/libwarp_api_ffi.so linux/lib/libwarp_api_ffi.so
${HOME}/flutter_3.22.2/bin/flutter pub get
${HOME}/flutter_3.22.2/bin/flutter build linux --debug
```

2) Launch Instance A (existing development wallet, default profile):
```bash
BIN_DIR=/home/kameron/Documents/fuckbitcoin/Anino/zwallet/build/linux/x64/debug/bundle
env LD_LIBRARY_PATH="$BIN_DIR/lib" "$BIN_DIR/ywallet" \
  > /home/kameron/Documents/fuckbitcoin/Anino/zwallet/run-ywallet-A.log 2>&1 & echo $! >/tmp/ywalletA.pid; disown
```

3) Launch Instance B (new wallet in an isolated profile):
```bash
BIN_DIR=/home/kameron/Documents/fuckbitcoin/Anino/zwallet/build/linux/x64/debug/bundle
mkdir -p ~/.local/share/ywallet-profile-2 ~/.config/ywallet-profile-2 ~/.cache/ywallet-profile-2 ~/.local/state/ywallet-profile-2
env XDG_DATA_HOME="$HOME/.local/share/ywallet-profile-2" \
    XDG_CONFIG_HOME="$HOME/.config/ywallet-profile-2" \
    XDG_CACHE_HOME="$HOME/.cache/ywallet-profile-2" \
    XDG_STATE_HOME="$HOME/.local/state/ywallet-profile-2" \
    LD_LIBRARY_PATH="$BIN_DIR/lib" "$BIN_DIR/ywallet" \
  > /home/kameron/Documents/fuckbitcoin/Anino/zwallet/run-ywallet-B.log 2>&1 & echo $! >/tmp/ywalletB.pid; disown
```

4) Launch both (A + B):
```bash
# A
BIN_DIR=/home/kameron/Documents/fuckbitcoin/Anino/zwallet/build/linux/x64/debug/bundle
env LD_LIBRARY_PATH="$BIN_DIR/lib" "$BIN_DIR/ywallet" \
  > /home/kameron/Documents/fuckbitcoin/Anino/zwallet/run-ywallet-A.log 2>&1 & echo $! >/tmp/ywalletA.pid; disown
# B
mkdir -p ~/.local/share/ywallet-profile-2 ~/.config/ywallet-profile-2 ~/.cache/ywallet-profile-2 ~/.local/state/ywallet-profile-2
env XDG_DATA_HOME="$HOME/.local/share/ywallet-profile-2" \
    XDG_CONFIG_HOME="$HOME/.config/ywallet-profile-2" \
    XDG_CACHE_HOME="$HOME/.cache/ywallet-profile-2" \
    XDG_STATE_HOME="$HOME/.local/state/ywallet-profile-2" \
    LD_LIBRARY_PATH="$BIN_DIR/lib" "$BIN_DIR/ywallet" \
  > /home/kameron/Documents/fuckbitcoin/Anino/zwallet/run-ywallet-B.log 2>&1 & echo $! >/tmp/ywalletB.pid; disown
```

5) Stop & verify:
```bash
# Stop A / Stop B
kill "$(cat /tmp/ywalletA.pid)" 2>/dev/null || true
kill "$(cat /tmp/ywalletB.pid)" 2>/dev/null || true

# Verify exactly two and their paths
for p in $(pgrep -x ywallet); do echo -n "$p -> "; readlink /proc/$p/exe; done
```

Definitions
- Instance A: existing, modified development wallet using the default user profile (no custom XDG directories).
- Instance B: brand‑new wallet isolated via `XDG_DATA_HOME`, `XDG_CONFIG_HOME`, `XDG_CACHE_HOME`, `XDG_STATE_HOME` so seeds/history never collide.

Note
- Build once and use the same bundle for both A and B. Avoid mixing the single‑instance runner with a second launch; use the bundle binary for consistent behavior.

Single-instance runner (preferred)
- From repo root:
```bash
cd /home/kameron/Documents/fuckbitcoin/Anino
pkill -f "flutter run -d linux" || true
pkill -f flutter_tester || true
pkill -x ywallet || true

# Wayland-friendly binary mode
YW_USE_BINARY=1 ./ywallet_run.sh
```

Tip: If `pkill` feels too broad in your shell, see “Safety tip — safe cleanup alternative” above.

Direct-binary launch (when `flutter run` is unreliable or window is hidden)
```bash
cd /home/kameron/Documents/fuckbitcoin/Anino/zwallet
# 1) Kill stray instances
pkill -f "flutter run -d linux" || true; pkill -f flutter_tester || true; pkill -x ywallet || true

# 2) Build FFI and copy for bundling
cargo build -p zcash-warpsync --lib --features dart_ffi --profile dev
mkdir -p linux/lib && cp target/debug/libwarp_api_ffi.so linux/lib/libwarp_api_ffi.so

# 3) Build the Linux debug bundle (absolute flutter path if needed)
${HOME}/flutter_3.22.2/bin/flutter pub get
${HOME}/flutter_3.22.2/bin/flutter build linux --debug

# 4) Run the compiled binary from inside the bundle (ensures RPATH finds lib/)
./build/linux/x64/debug/bundle/ywallet
```

Verify syncing (optional)
```bash
# A (default profile)
sqlite3 /home/kameron/databases/zec.db "SELECT MAX(height) FROM blocks;"
# B (isolated profile)
sqlite3 $HOME/.local/share/ywallet-profile-2/databases/zec.db "SELECT MAX(height) FROM blocks;"
```
Both values should advance over time. You can also tail the logs:
```bash
tail -f /home/kameron/Documents/fuckbitcoin/Anino/zwallet/run-ywallet-A.log
tail -f /home/kameron/Documents/fuckbitcoin/Anino/zwallet/run-ywallet-B.log
```

Tip: If the cleanup step risks terminating your shell, use the safer PID-based cleanup in “Safety tip — safe cleanup alternative.”

If the window still doesn’t appear (Wayland focus quirks)
- Run from inside the bundle with an explicit loader path:
```bash
cd /home/kameron/Documents/fuckbitcoin/Anino/zwallet/build/linux/x64/debug/bundle
env LD_LIBRARY_PATH="$(pwd)/lib" ./ywallet
```

XWayland fallback (last resort to surface the window)
```bash
BIN_DIR=/home/kameron/Documents/fuckbitcoin/Anino/zwallet/build/linux/x64/debug/bundle
env GDK_BACKEND=x11 LD_LIBRARY_PATH="$BIN_DIR/lib" "$BIN_DIR/ywallet"
```

Quick diagnostics
- Confirm binary exists: `ls -l build/linux/x64/debug/bundle/ywallet`
- Verify running: `pgrep -fl ywallet`
- Tail logs: `tail -n 120 /home/kameron/Documents/fuckbitcoin/Anino/zwallet/run-ywallet.log`

Notes
- Rerun FFI build + copy after `flutter clean`.
- Use the runner for single-instance behavior; it kills old `flutter run`, `flutter_tester`, and `ywallet` first.


