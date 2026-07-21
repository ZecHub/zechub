#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../.."

PAYPUNK="${PAYPUNK_BIN:-cargo run --quiet --package paypunk --}"
FROM="uregtest1p8jnyvgzh5dczns4e7ke4v3wgswh32pls057q2tf9mjl2n3372smalr3crg5kjz9x26nyzjyhqq9tm5n9k8pn6ep4fqzu5r2rg052dny"
TO="uregtest1pvdm76kxc89r72jzjngdx5y8rmzam2vga47l2kayd9lt6lpepkaez4me30z7r7ya3azme48mz6aumdmasdn8p0q89aqq7sd63u4v0k6e"
AMOUNT="1"
MNEMONIC="test test test test test test test test test test test junk"
PASSWORD="test"
KEYPUNKD_SOCK="/tmp/keypunkd.sock"
PAYPUNKD_SOCK="/tmp/paypunkd.sock"

cleanup() {
  local rc=$?
  if [ $rc -ne 0 ]; then
    echo "!! FAIL: transfer test exited with code $rc"
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

# ── 5. Unlock ───────────────────────────────────────────────────────────────
echo "==> Unlocking wallet and deriving accounts..."
$PAYPUNK unlock --password "$PASSWORD"

# ── 6. Create recipient account ─────────────────────────────────────────────
echo "==> Creating recipient account (account 1)..."
$PAYPUNK create-account --protocol zcash --account-index 1 --name "Zcash Account 1" 2>&1
echo "   Recipient account created"

# ── 7. Record sender's initial balance ──────────────────────────────────────
echo "==> Recording sender's initial balance..."
SENDER_INITIAL=$($PAYPUNK get-balance --protocol zcash --address "$FROM" 2>&1)
echo "   Sender: $SENDER_INITIAL"
SENDER_INITIAL_TOTAL=$(echo "$SENDER_INITIAL" | grep -oP 'total=\K\d+')
SENDER_INITIAL_SPENDABLE=$(echo "$SENDER_INITIAL" | grep -oP 'spendable=\K\d+')

if [ -z "$SENDER_INITIAL_TOTAL" ] || [ "$SENDER_INITIAL_TOTAL" -eq 0 ]; then
  echo "!! FAIL: sender has zero balance — cannot send"
  exit 1
fi

# ── 7. Submit transfer ──────────────────────────────────────────────────────
AMOUNT_ZATOSHI=100000000
echo "==> Submitting transfer of $AMOUNT ZEC ($AMOUNT_ZATOSHI zatoshi) from funded address to recipient..."
TRANSFER_OUTPUT=$($PAYPUNK submit-transfer \
  --protocol zcash \
  --from "$FROM" \
  --to "$TO" \
  --amount "$AMOUNT" \
  --asset "zcash" 2>&1)
echo "$TRANSFER_OUTPUT"

# ── 8. Verify transfer preview succeeded and extract fee ─────────────────────
if ! echo "$TRANSFER_OUTPUT" | grep -q "Artifact preview received"; then
  echo "!! FAIL: did not receive artifact preview"
  exit 1
fi
echo "==> Transfer preview received successfully"

FEE=$(echo "$TRANSFER_OUTPUT" | grep -oP 'Fee: \K\d+')
if [ -z "$FEE" ]; then
  echo "!! FAIL: could not extract fee from preview"
  exit 1
fi
echo "   Fee: $FEE zatoshi"

# ── 9. Approve signature ────────────────────────────────────────────────────
echo "==> Approving transfer signature..."
APPROVE_OUTPUT=$($PAYPUNK approve-signature --password "$PASSWORD" 2>&1)
echo "$APPROVE_OUTPUT"

# ── 10. Mine a block to confirm the transaction ──────────────────────────────
echo "==> Mining a block to confirm the transfer..."
./scripts/mine-block.sh 1 >/dev/null
echo "   Block mined"

# ── 11. Re-sync wallet to detect the incoming transaction ────────────────────
echo "==> Re-syncing wallet after mining..."
$PAYPUNK unlock --password "$PASSWORD" >/dev/null 2>&1 || true
echo "   Sync complete"

# ── 12. Query post-transfer balances ─────────────────────────────────────────
echo "==> Querying post-transfer balances..."
SENDER_FINAL=$($PAYPUNK get-balance --protocol zcash --address "$FROM" 2>&1)
echo "   Sender: $SENDER_FINAL"
RECIPIENT_FINAL=$($PAYPUNK get-balance --protocol zcash --address "$TO" 2>&1)
echo "   Recipient: $RECIPIENT_FINAL"

SENDER_FINAL_TOTAL=$(echo "$SENDER_FINAL" | grep -oP 'total=\K\d+')
RECIPIENT_TOTAL=$(echo "$RECIPIENT_FINAL" | grep -oP 'total=\K\d+')

# ── 12. Verify sender balance decreased by (amount + fee) ────────────────────
EXPECTED_SENDER=$((SENDER_INITIAL_TOTAL - AMOUNT_ZATOSHI - FEE))
if [ "$SENDER_FINAL_TOTAL" -ne "$EXPECTED_SENDER" ]; then
  echo "!! FAIL: sender balance mismatch"
  echo "   Expected: $EXPECTED_SENDER (initial=$SENDER_INITIAL_TOTAL - amount=$AMOUNT_ZATOSHI - fee=$FEE)"
  echo "   Got:      $SENDER_FINAL_TOTAL"
  exit 1
fi
echo "==> Sender balance decreased correctly by $AMOUNT_ZATOSHI + $FEE (fee)"

# ── 13. Verify recipient balance increased by the transfer amount ────────────
if [ "$RECIPIENT_TOTAL" -ne "$AMOUNT_ZATOSHI" ]; then
  echo "!! FAIL: recipient balance mismatch"
  echo "   Expected: $AMOUNT_ZATOSHI"
  echo "   Got:      $RECIPIENT_TOTAL"
  exit 1
fi
echo "==> Recipient balance increased by $AMOUNT_ZATOSHI zatoshi"

# ── 14. PASS ─────────────────────────────────────────────────────────────────
echo "==> PASS: transfer of $AMOUNT ZEC completed and balances verified"
