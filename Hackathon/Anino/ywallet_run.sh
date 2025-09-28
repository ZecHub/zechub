#!/usr/bin/env bash
set -euo pipefail

# Single-instance runner for YWallet on Linux desktop.
# - Ensures zwallet submodule is on our fork branch
# - Builds FFI lib and copies to linux/lib/
# - Kills any existing instances before launching one foreground instance

REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"
ZW="$REPO_ROOT/zwallet"

is_git_repo() {
  git -C "$1" rev-parse --is-inside-work-tree >/dev/null 2>&1
}

if is_git_repo "$REPO_ROOT"; then
  echo "[run] Ensuring zwallet submodule exists (will not overwrite local edits)"
  git submodule update --init --recursive zwallet
  git -C "$ZW" submodule update --init --recursive || true
  if is_git_repo "$ZW"; then
    # If there are no local modifications, ensure we're on the expected branch and up to date
    if [ -z "$(git -C "$ZW" status --porcelain)" ]; then
      echo "[run] No local changes in zwallet; syncing branch anino-stable-sent-sending from myfork"
      git -C "$ZW" fetch myfork || git -C "$ZW" remote add myfork https://github.com/fuck-bitcoin/zwallet.git || true
      git -C "$ZW" checkout anino-stable-sent-sending || true
      git -C "$ZW" pull --ff-only myfork anino-stable-sent-sending || true
    else
      echo "[run] Local changes detected in zwallet; skipping checkout/pull"
    fi
  else
    echo "[run] zwallet is not a Git repo; skipping submodule branch sync"
  fi
else
  echo "[run] Repo root is not a Git repo; skipping submodule initialization"
fi

echo "[run] Killing existing instances (flutter run, flutter_tester, ywallet)"
pkill -f "flutter run -d linux" || true
pkill -f flutter_tester || true
pkill -x ywallet || true

echo "[run] Locating Flutter SDK"
if [ -x "$HOME/flutter_3.22.2/bin/flutter" ]; then
  FLUTTER="$HOME/flutter_3.22.2/bin/flutter"
elif [ -x "$HOME/flutter/bin/flutter" ]; then
  FLUTTER="$HOME/flutter/bin/flutter"
elif command -v flutter >/dev/null 2>&1; then
  FLUTTER="$(command -v flutter)"
else
  echo "[run][error] Flutter SDK not found under ~/flutter_3.22.2, ~/flutter, or PATH" >&2
  echo "Install Flutter or adjust PATH, then re-run this script." >&2
  exit 1
fi
"$FLUTTER" --version | cat

echo "[run] Building FFI lib (zcash-warpsync)"
cd "$ZW"
if ! command -v cargo >/dev/null 2>&1; then
  echo "[run][error] Rust cargo not found. Please install Rust toolchain (cargo)." >&2
  exit 1
fi
cargo build -p zcash-warpsync --lib --features dart_ffi --profile dev | cat
mkdir -p linux/lib && cp target/debug/libwarp_api_ffi.so linux/lib/libwarp_api_ffi.so

echo "[run] Enabling Linux desktop and fetching Dart deps"
"$FLUTTER" config --enable-linux-desktop | cat
"$FLUTTER" pub get | cat

echo "[run] Launching foreground (single instance)"
if [ "${YW_USE_BINARY:-0}" = "1" ]; then
  echo "[run] Building linux debug bundle (YW_USE_BINARY=1)"
  "$FLUTTER" build linux --debug | cat
  BUNDLE_DIR=$(ls -d build/linux/*/debug/bundle 2>/dev/null | head -n1)
  if [ -z "$BUNDLE_DIR" ] || [ ! -x "$BUNDLE_DIR/ywallet" ]; then
    echo "[run][error] bundle binary not found under build/linux/*/debug/bundle/ywallet" >&2
    exit 1
  fi
  echo "[run] Executing binary: $BUNDLE_DIR/ywallet"
  exec "$BUNDLE_DIR/ywallet"
else
  exec "$FLUTTER" run -d linux
fi

