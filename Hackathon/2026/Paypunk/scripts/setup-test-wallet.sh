#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
MNEMONIC_FILE="${SCRIPT_DIR}/.mnemonic"
MNEMONIC_DEFAULT="${SCRIPT_DIR}/.mnemonic.example"

PAYPUNK="${PAYPUNK_BIN:-cargo run --quiet --package paypunk --}"

BIRTHDAY_ARG="${1:-}"
BIRTHDAY_FLAG=""
if [ -f "$MNEMONIC_FILE" ]; then
  MNEMONIC=$(cat "$MNEMONIC_FILE")
  NETWORK_ARGS="--zcash-network mainnet"
  if [ -z "$BIRTHDAY_ARG" ]; then
    echo "WARNING: You are restoring a mainnet wallet without a birthday block."
    echo "  Without one, the wallet will auto-fetch the current chain tip and"
    echo "  will NOT scan historical blocks. If this wallet has prior activity,"
    echo "  re-run with a birthday block:"
    echo ""
    echo "    devenv shell -- run setup <BLOCK_HEIGHT>"
    echo ""
    echo "  Continuing in 5 seconds (Ctrl-C to abort)..."
    sleep 5
  else
    BIRTHDAY_FLAG="--birthday-height $BIRTHDAY_ARG"
  fi
else
  MNEMONIC=$(cat "$MNEMONIC_DEFAULT")
  NETWORK_ARGS=""
fi

PASSWORD="test"

echo "Resetting wallet data..."
$PAYPUNK $NETWORK_ARGS reset

echo "Restoring wallet with test mnemonic..."
$PAYPUNK $NETWORK_ARGS restore-seed --mnemonic "$MNEMONIC" --password "$PASSWORD" $BIRTHDAY_FLAG

echo "Unlocking wallet and deriving accounts..."
$PAYPUNK $NETWORK_ARGS unlock --password "$PASSWORD"

echo "Done. Test wallet ready — password: $PASSWORD"
