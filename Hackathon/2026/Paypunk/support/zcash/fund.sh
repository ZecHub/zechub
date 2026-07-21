#!/usr/bin/env bash
# fund.sh — mine regtest blocks past coinbase maturity, then shield all coinbase
# straight into your wallet's Orchard unified address in one operation.
#
# Usage: ./fund.sh <orchard-unified-address> [blocks]
# Requires: jq (for parsing zcash-cli JSON).
set -euo pipefail

UA="${1:?usage: ./fund.sh <orchard-unified-address> [blocks]}"
BLOCKS="${2:-120}"   # >100 for coinbase maturity, with headroom for value

command -v jq >/dev/null || { echo "fund.sh needs jq installed"; exit 1; }

cli() { docker compose exec -T zcashd zcash-cli -datadir=/data "$@"; }

echo "==> mining ${BLOCKS} blocks (coinbase matures at 100)…"
cli generate "$BLOCKS" >/dev/null

echo "==> shielding coinbase -> ${UA} (Orchard)…"
# z_shieldcoinbase sweeps all coinbase UTXOs ("*") into the target shielded
# address. AllowRevealedSenders is required because the transparent source is
# public. Args: fromaddr toaddr fee limit memo privacyPolicy.
OPID=$(cli z_shieldcoinbase "*" "$UA" null 0 null "AllowRevealedSenders" | jq -r '.opid')
if [ -z "$OPID" ] || [ "$OPID" = "null" ]; then
  echo "!! no opid returned. If zcashd rejected the unified address, shield to a"
  echo "   Sapling zaddr first, or use z_sendmany from a specific coinbase taddr."
  exit 1
fi
echo "   opid=${OPID}"

echo "==> waiting for the shield to complete…"
while :; do
  ST=$(cli z_getoperationstatus "[\"${OPID}\"]" | jq -r '.[0].status')
  case "$ST" in
    success) echo "   success"; break ;;
    failed)  echo "   FAILED:"; cli z_getoperationstatus "[\"${OPID}\"]" | jq '.[0]'; exit 1 ;;
    *) sleep 2 ;;
  esac
done

echo "==> mining 10 blocks to confirm the shielding tx…"
cli generate 10 >/dev/null

echo "==> done. Orchard funds are on-chain at ${UA}."
echo "    Point your wallet at lightwalletd 127.0.0.1:9067 (plaintext) and sync."
