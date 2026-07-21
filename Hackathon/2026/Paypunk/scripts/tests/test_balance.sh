#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../.."

PAYPUNK="${PAYPUNK_BIN:-cargo run --quiet --package paypunk --}"
UA="uregtest1p8jnyvgzh5dczns4e7ke4v3wgswh32pls057q2tf9mjl2n3372smalr3crg5kjz9x26nyzjyhqq9tm5n9k8pn6ep4fqzu5r2rg052dny"
MNEMONIC="test test test test test test test test test test test junk"
PASSWORD="test"
KEYPUNKD_SOCK="/tmp/keypunkd.sock"
PAYPUNKD_SOCK="/tmp/paypunkd.sock"

cleanup() {
  local rc=$?
  echo "==> Cleaning up daemons..."
  kill ${KEYPUNKD_PID:-} ${PAYPUNKD_PID:-} 2>/dev/null || true
  wait ${KEYPUNKD_PID:-} ${PAYPUNKD_PID:-} 2>/dev/null || true
  rm -f "$KEYPUNKD_SOCK" "$PAYPUNKD_SOCK"
  echo "==> Done (exit $rc)"
}
trap cleanup EXIT

# ── 1. Start Zcash regtest stack ────────────────────────────────────────────
echo "==> Starting Zcash regtest stack..."
./scripts/start-zcash.sh 120

# ── 2. Reset wallet data ────────────────────────────────────────────────────
echo "==> Resetting wallet data..."
$PAYPUNK reset

# ── 3. Start daemons ────────────────────────────────────────────────────────
echo "==> Starting key-daemon..."
$PAYPUNK keypunkd &
KEYPUNKD_PID=$!

echo "==> Starting wallet-daemon..."
$PAYPUNK paypunkd &
PAYPUNKD_PID=$!

echo "==> Waiting for daemon sockets..."
for i in $(seq 1 30); do
  if [ -S "$KEYPUNKD_SOCK" ] && [ -S "$PAYPUNKD_SOCK" ]; then
    echo "   Both daemons ready after ${i}s"
    break
  fi
  sleep 1
done

if [ ! -S "$KEYPUNKD_SOCK" ] || [ ! -S "$PAYPUNKD_SOCK" ]; then
  echo "!! Daemons did not start in time"
  exit 1
fi

# ── 4. Restore seed (connects to running daemons) ───────────────────────────
echo "==> Restoring wallet with test mnemonic..."
$PAYPUNK restore-seed --mnemonic "$MNEMONIC" --password "$PASSWORD"

# ── 5. Unlock (populates viewing keys and triggers sync on running daemons) ─
echo "==> Unlocking wallet and deriving accounts..."
$PAYPUNK unlock --password "$PASSWORD"

# ── 6. Get balance ──────────────────────────────────────────────────────────
echo "==> Querying balance for funded UA..."
BALANCE=$($PAYPUNK get-balance --protocol zcash --address "$UA" 2>&1)
echo "$BALANCE"

# ── 8. Verify balance is non-zero ───────────────────────────────────────────
SPENDABLE=$(echo "$BALANCE" | grep -oP 'spendable=\K\d+')
PENDING=$(echo "$BALANCE" | grep -oP 'pending=\K\d+')
TOTAL=$(echo "$BALANCE" | grep -oP 'total=\K\d+')

if [ -z "$TOTAL" ] || [ "$TOTAL" -eq 0 ]; then
  echo "!! FAIL: balance is zero — expected funded account to have funds"
  exit 1
fi

if [ -z "$SPENDABLE" ] || [ "$SPENDABLE" -eq 0 ]; then
  echo "!! FAIL: spendable is zero — expected non-zero spendable balance"
  exit 1
fi

echo "==> PASS: balance = $TOTAL zatoshi (spendable=$SPENDABLE, pending=$PENDING)"
