#!/usr/bin/env bash
# Derives the Orchard address + Unified Full Viewing Key (UFVK) for the
# 2-of-2 group's public key. Import the UFVK into YWallet as a view-only
# account, then fund the printed Orchard address from a testnet faucet.
#
# Usage: ./generate-address.sh <group-public-key>
# Find <group-public-key> via: frost-client groups -c server.toml
set -euo pipefail

if [ $# -ne 1 ]; then
  echo "Usage: $0 <group-public-key>" >&2
  echo "(get it from: frost-client groups -c server.toml)" >&2
  exit 1
fi

zcash-sign generate --ak "$1" --danger-dummy-sapling
