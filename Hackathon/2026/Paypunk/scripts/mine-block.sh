#!/usr/bin/env bash
# mine-block.sh — mine N blocks on the zcashd regtest node.
# Usage: ./scripts/mine-block.sh [count=1]
set -euo pipefail

COUNT="${1:-1}"
cd "$(dirname "$0")/../support/zcash"
docker compose exec -T zcashd zcash-cli -datadir=/data generate "$COUNT"
