#!/usr/bin/env bash
# zcash.sh — start the regtest stack, wait for readiness, fund an Orchard UA,
# then mine 1 block/sec until Ctrl+C.
#
# Edit UA below to your wallet's Orchard unified address (uregtest1...).
set -euo pipefail

# should be the first address fron test test test test test test test test test test test junk
UA="uregtest1p8jnyvgzh5dczns4e7ke4v3wgswh32pls057q2tf9mjl2n3372smalr3crg5kjz9x26nyzjyhqq9tm5n9k8pn6ep4fqzu5r2rg052dny"
BLOCKS="${1:-120}"

cleanup() {
  local rc=$?
  echo ""
  echo "==> Shutting down…"
  docker compose down
  if [ $rc -ne 0 ]; then
    echo "!! zcash.sh failed (exit $rc)."
  fi
}
trap cleanup EXIT

cd ./support/zcash

docker compose down -v
echo "==> Starting zcashd + lightwalletd…"
docker compose up -d --build

echo "==> Waiting for zcashd RPC to be ready…"
for i in $(seq 1 30); do
  if docker compose exec -T zcashd zcash-cli -datadir=/data getwalletinfo >/dev/null 2>&1; then
    echo "   zcashd ready after ${i}s"
    break
  fi
  sleep 1
done

echo "==> Funding ${UA}…"
./fund.sh "$UA" "$BLOCKS"

echo ""
echo "==> Stack is up. Mining 1 block/sec (Ctrl+C to stop)…"
echo "    zcashd RPC:      127.0.0.1:18232"
echo "    lightwalletd:    127.0.0.1:9067 (plaintext)"
echo ""

while true; do
  sleep 5
  HEIGHT=$(docker compose exec -T zcashd zcash-cli -datadir=/data generate 1 | jq -r '.[0]')
  echo "[$(date '+%H:%M:%S')] mined block ${HEIGHT}"
done
