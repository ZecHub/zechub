#!/usr/bin/env bash
# mine.sh — mine 1 regtest block per second until Ctrl+C.
set -euo pipefail

cd "$(dirname "$0")"

echo "==> Mining 1 block/sec (Ctrl+C to stop)…"
while true; do
  sleep 1
  HEIGHT=$(docker compose exec -T zcashd zcash-cli -datadir=/data generate 1 | jq -r '.[0]')
  echo "[$(date '+%H:%M:%S')] mined block ${HEIGHT}"
done
