#!/usr/bin/env bash
# Generates the 2-of-2 FROST key shares for the "server" + "winner"
# participants using the trusted-dealer flow (fast, for demo purposes).
#
# Production note: a trusted dealer sees the full key transiently during
# generation. The production-intended flow is DKG (`frost-client dkg`),
# where no single party ever holds the complete key — see the README.
set -euo pipefail

cd "$(dirname "$0")/.."

for cfg in server.toml winner.toml; do
  if [ ! -f "$cfg" ]; then
    echo "Missing $cfg — run: frost-client init -c $cfg" >&2
    exit 1
  fi
done

frost-client trusted-dealer \
  -d "Bluff Arena payout pool" \
  --names server,winner \
  -c server.toml -c winner.toml \
  -C redpallas \
  -t 2

echo
echo "Done. Run 'frost-client groups -c server.toml' to see the group id and public key."
