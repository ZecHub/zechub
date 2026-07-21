#!/usr/bin/env bash
set -euo pipefail
if [ ! -f "${HOME}/.zcash-params/sapling-spend.params" ]; then
  echo "[zcashd] fetching parameters…"
  zcash-fetch-params
fi
echo "[zcashd] starting regtest node…"
exec zcashd -datadir=/data -printtoconsole -noconnect
