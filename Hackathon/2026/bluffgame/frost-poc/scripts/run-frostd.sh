#!/usr/bin/env bash
# Starts the local FROST coordination server (frostd) used by frost-client
# for both the keygen and signing ceremonies in this PoC.
set -euo pipefail

if ! command -v frostd >/dev/null 2>&1; then
  echo "frostd not found. Install it with:" >&2
  echo "  cargo install --git https://github.com/ZcashFoundation/frost-zcash-demo.git --locked frostd" >&2
  exit 1
fi

echo "Starting frostd on localhost:2744 ..."
frostd
