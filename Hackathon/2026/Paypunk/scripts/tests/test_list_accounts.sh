#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../.."

PAYPUNK="${PAYPUNK_BIN:-cargo run --quiet --package paypunk --}"
MNEMONIC="test test test test test test test test test test test junk"
PASSWORD="test"
KEYPUNKD_SOCK="/tmp/keypunkd.sock"
PAYPUNKD_SOCK="/tmp/paypunkd.sock"

cleanup() {
  local rc=$?
  if [ $rc -ne 0 ]; then
    echo "!! FAIL: list-accounts test exited with code $rc"
  fi
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

# ── 4. Restore seed ─────────────────────────────────────────────────────────
echo "==> Restoring wallet with test mnemonic..."
$PAYPUNK restore-seed --mnemonic "$MNEMONIC" --password "$PASSWORD"

# ── 5. Unlock (creates account 0 only) ──────────────────────────────────────
echo "==> Unlocking wallet and deriving accounts..."
$PAYPUNK unlock --password "$PASSWORD"

# ── 6. List accounts — should show exactly 1 Zcash account ──────────────────
echo "==> Listing accounts after unlock..."
AFTER_UNLOCK=$($PAYPUNK list-accounts 2>&1)
echo "$AFTER_UNLOCK"

ZCASH_COUNT=$(echo "$AFTER_UNLOCK" | grep -c "Zcash" || true)
if [ "$ZCASH_COUNT" -ne 1 ]; then
  echo "!! FAIL: expected exactly 1 Zcash account after unlock, got $ZCASH_COUNT"
  exit 1
fi
echo "   Correct: exactly 1 Zcash account after unlock"

# Verify account 0 exists with correct path
if ! echo "$AFTER_UNLOCK" | grep -q "m/44'/133'/0'"; then
  echo "!! FAIL: account 0 (m/44'/133'/0') not found after unlock"
  exit 1
fi

# ── 7. Verify account index 2 does NOT exist (not all accounts created) ─────
if echo "$AFTER_UNLOCK" | grep -q "m/44'/133'/2'"; then
  echo "!! FAIL: account 2 exists after unlock but should not"
  exit 1
fi
echo "   Correct: account 2 not created — only account 0 exists"

# ── 8. Create a second account ──────────────────────────────────────────────
echo "==> Creating account 1..."
ACCT1=$($PAYPUNK create-account --protocol zcash --account-index 1 --name "Zcash Account 1" 2>&1)
echo "$ACCT1"

if ! echo "$ACCT1" | grep -q "Zcash"; then
  echo "!! FAIL: account 1 protocol is not Zcash"
  exit 1
fi
if ! echo "$ACCT1" | grep -q "m/44'/133'/1'"; then
  echo "!! FAIL: account 1 derivation path is wrong"
  exit 1
fi

# ── 9. List accounts — should show 2 Zcash accounts ─────────────────────────
echo "==> Listing accounts after creating account 1..."
AFTER_CREATE=$($PAYPUNK list-accounts 2>&1)
echo "$AFTER_CREATE"

ZCASH_COUNT2=$(echo "$AFTER_CREATE" | grep -c "Zcash" || true)
if [ "$ZCASH_COUNT2" -ne 2 ]; then
  echo "!! FAIL: expected exactly 2 Zcash accounts, got $ZCASH_COUNT2"
  exit 1
fi
echo "   Correct: exactly 2 Zcash accounts"

# ── 10. Extract addresses and verify ────────────────────────────────────────
ACCT0_LINE=$(echo "$AFTER_CREATE" | grep "Zcash" | grep "m/44'/133'/0'")
ACCT1_LINE=$(echo "$AFTER_CREATE" | grep "Zcash" | grep "m/44'/133'/1'")

ADDR0=$(echo "$ACCT0_LINE" | grep -oP '\S+$')
ADDR1=$(echo "$ACCT1_LINE" | grep -oP '\S+$')

if ! echo "$ADDR0" | grep -q "^uregtest1"; then
  echo "!! FAIL: account 0 address does not look like a Zcash regtest UA: $ADDR0"
  exit 1
fi
echo "   Account 0: $ADDR0"

if ! echo "$ADDR1" | grep -q "^uregtest1"; then
  echo "!! FAIL: account 1 address does not look like a Zcash regtest UA: $ADDR1"
  exit 1
fi
echo "   Account 1: $ADDR1"

# ── 11. Verify addresses are different ──────────────────────────────────────
if [ "$ADDR0" = "$ADDR1" ]; then
  echo "!! FAIL: account 0 and account 1 have the same address"
  exit 1
fi
echo "   Addresses are unique"

# ── 12. Verify account index 2 still does not exist ─────────────────────────
if echo "$AFTER_CREATE" | grep -q "m/44'/133'/2'"; then
  echo "!! FAIL: account 2 should not exist after creating account 1"
  exit 1
fi
echo "   Correct: account 2 still does not exist"

# ── 13. PASS ────────────────────────────────────────────────────────────────
echo "==> PASS: list-accounts verified — unlock creates 1 account, second added manually, not all accounts created"
