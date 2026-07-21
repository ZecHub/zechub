#!/usr/bin/env bash
# Steward — one-command dev launcher.
# Boots the whole reference stack and tears it all down on Ctrl+C:
#   • coordinator (the untrusted relay)   http://127.0.0.1:8080
#   • Steward (the unified app)            http://localhost:5175
#
# Steward is ONE app now, with two sections — "My vaults" (owner) and "Vaults I guard"
# (guardian) — so there is a single web server. The old split owner-console (:5175) and
# guardian (:5176) apps are superseded; they remain in the tree but nothing here starts them.
#
# Usage:  ./scripts/dev.sh
# Vaults persist in ./steward-coordinator-data (override with STEWARD_DATA_DIR).
set -uo pipefail

cd "$(dirname "$0")/.." || exit 1
ROOT="$PWD"
COORD_PORT="${STEWARD_PORT:-8080}"
DATA_DIR="${STEWARD_DATA_DIR:-$ROOT/steward-coordinator-data}"
SIGNER_BIN="$ROOT/crates/steward-signer/target/debug/steward-signer"

COORD_PID=""; APP_PID=""
cleanup() {
  echo ""; echo "Stopping Steward…"
  for pid in "$APP_PID" "$COORD_PID"; do
    [ -n "$pid" ] && kill "$pid" 2>/dev/null
  done
  # backstop for the coordinator binary (a stray child can hold :8080)
  pkill -f "target/debug/steward-coordinator" 2>/dev/null
  wait 2>/dev/null
  echo "Stopped."
}
trap cleanup EXIT INT TERM

command -v cargo >/dev/null || { echo "cargo not found — install Rust."; exit 1; }
command -v npm   >/dev/null || { echo "npm not found — install Node."; exit 1; }

# Free the coordinator port if a stale instance holds it.
if lsof -nP -iTCP:"$COORD_PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Port $COORD_PORT is in use — stopping any stale coordinator…"
  pkill -f "target/debug/steward-coordinator" 2>/dev/null; sleep 1
fi

echo "→ Building the coordinator…"
cargo build -q -p steward-coordinator || { echo "coordinator build failed"; exit 1; }

# The coordinator shells out to the signer to derive on-chain addresses / balance.
# It's a big one-time compile (halo2/orchard); build it only if missing.
if [ ! -x "$SIGNER_BIN" ]; then
  echo "→ Building the signer (first run only — a few minutes; enables on-chain addresses)…"
  cargo build -q --manifest-path crates/steward-signer/Cargo.toml \
    || echo "  ⚠ signer build failed — the On-chain panel will show 'address unavailable', everything else works."
fi

if [ ! -d "web/steward/node_modules" ]; then
  echo "→ Installing web/steward dependencies…"
  (cd "web/steward" && npm install --silent) || { echo "npm install failed for steward"; exit 1; }
fi

mkdir -p "$DATA_DIR"
echo "→ Starting coordinator on :$COORD_PORT  (vaults persist in $DATA_DIR)"
STEWARD_DATA_DIR="$DATA_DIR" STEWARD_PORT="$COORD_PORT" \
  "$ROOT/target/debug/steward-coordinator" >/tmp/steward-coordinator.log 2>&1 &
COORD_PID=$!

# Wait for it to answer before starting the web proxy.
for _ in $(seq 1 40); do
  curl -s -o /dev/null "http://127.0.0.1:$COORD_PORT/vault/nope" && break; sleep 0.25
done

echo "→ Starting Steward (the unified app)…"
( cd web/steward && exec node_modules/.bin/vite ) >/tmp/steward-app.log 2>&1 &
APP_PID=$!
sleep 3

cat <<EOF

  ┌─ Steward is running ────────────────────────────────────────────
  │  Steward app      →  http://localhost:5175
  │      · My vaults      (owner)     — seal vaults, keep the heartbeat, convene a release
  │      · Vaults I guard (guardian)  — take up a share, stand watch, co-sign
  │  Coordinator API  →  http://127.0.0.1:$COORD_PORT
  │
  │  Multi-window demo: keep the OWNER in this normal window; open each
  │  guardian's enrollment link in a SEPARATE Incognito window (guardians
  │  share localStorage per origin, so each needs its own window).
  │  Vaults persist in: $DATA_DIR
  │  Logs: /tmp/steward-{coordinator,app}.log
  │
  │  Press Ctrl+C to stop everything.
  └─────────────────────────────────────────────────────────────────

EOF

wait
