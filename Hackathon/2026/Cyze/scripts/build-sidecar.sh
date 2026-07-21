#!/usr/bin/env bash
# Put BOTH sidecars where Tauri expects them, for this host's target triple:
#
#   frostd      — built from frost-tools at the pinned rev (scripts/PINNED_REV)
#   cloudflared — downloaded from Cloudflare's releases (Apache-2.0)
#
# tauri.conf.json lists both in `externalBin`, so the app will not build unless
# both are present. A missing one surfaces late and cryptically, as:
#   resource path `binaries/cloudflared-<triple>` doesn't exist
# Fetching cloudflared here (as CI does) is what lets a fresh clone build.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
PINNED_REV="$(cat "$SCRIPT_DIR/PINNED_REV")"
FROST_TOOLS_DIR="${FROST_TOOLS_DIR:-$HOME/frost-tools}"
TARGET_TRIPLE="$(rustc -vV | sed -n 's/host: //p')"
BIN_DIR="$REPO_ROOT/src-tauri/binaries"

# Windows executables carry the .exe suffix; Tauri resolves sidecars by triple.
EXT=""
case "$TARGET_TRIPLE" in *windows*) EXT=".exe" ;; esac

mkdir -p "$BIN_DIR"

# --- frostd: build from the pinned revision ---------------------------------
# The rev must match the frost-client dependency in src-tauri/Cargo.toml, or the
# client and server disagree on the wire format.
FROSTD_DEST="$BIN_DIR/frostd-$TARGET_TRIPLE$EXT"

if [ ! -d "$FROST_TOOLS_DIR" ]; then
  git clone https://github.com/ZcashFoundation/frost-tools.git "$FROST_TOOLS_DIR"
fi

(
  cd "$FROST_TOOLS_DIR"
  git fetch --quiet origin
  git checkout --quiet "$PINNED_REV"
  cargo build --release -p frostd
  cp "target/release/frostd$EXT" "$FROSTD_DEST"
)
echo "sidecar ready: ${FROSTD_DEST#"$REPO_ROOT/"}"

# --- cloudflared: download the prebuilt binary ------------------------------
# Bundled so the optional public-tunnel feature needs no install or PATH entry.
# Cloudflare ships one asset per OS/arch; macOS is a .tgz, the rest are raw.
CF_DEST="$BIN_DIR/cloudflared-$TARGET_TRIPLE$EXT"

if [ -x "$CF_DEST" ] && [ -z "${FORCE_CLOUDFLARED:-}" ]; then
  echo "sidecar ready: ${CF_DEST#"$REPO_ROOT/"} (cached; set FORCE_CLOUDFLARED=1 to refetch)"
else
  case "$TARGET_TRIPLE" in
    x86_64-unknown-linux-gnu)   ASSET=cloudflared-linux-amd64       ;;
    aarch64-unknown-linux-gnu)  ASSET=cloudflared-linux-arm64       ;;
    x86_64-pc-windows-msvc)     ASSET=cloudflared-windows-amd64.exe ;;
    aarch64-apple-darwin)       ASSET=cloudflared-darwin-arm64.tgz  ;;
    x86_64-apple-darwin)        ASSET=cloudflared-darwin-amd64.tgz  ;;
    *)
      echo "error: no cloudflared asset known for '$TARGET_TRIPLE'." >&2
      echo "Download one manually to $CF_DEST — see docs/RELEASE.md." >&2
      exit 1
      ;;
  esac

  TMP="$(mktemp -d)"
  trap 'rm -rf "$TMP"' EXIT
  URL="https://github.com/cloudflare/cloudflared/releases/latest/download/$ASSET"
  echo "fetching $ASSET…"
  curl -fL "$URL" -o "$TMP/cf-download"
  case "$ASSET" in
    *.tgz) tar -xzf "$TMP/cf-download" -C "$TMP"; cp "$TMP/cloudflared" "$CF_DEST" ;;
    *)     cp "$TMP/cf-download" "$CF_DEST" ;;
  esac
  chmod +x "$CF_DEST" || true
  echo "sidecar ready: ${CF_DEST#"$REPO_ROOT/"}"
fi

# --- Guard: fail here, not inside the Tauri build ---------------------------
for BIN in "$FROSTD_DEST" "$CF_DEST"; do
  test -f "$BIN" || { echo "error: sidecar missing at $BIN" >&2; exit 1; }
done
echo "Both sidecars present for $TARGET_TRIPLE — ready to build."
