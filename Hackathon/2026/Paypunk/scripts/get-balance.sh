#!/usr/bin/env bash
set -euo pipefail

ADDRESS="${1:-0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18}"

HEX=$(curl -s -X POST http://127.0.0.1:8545 \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "eth_getBalance",
    "params": ["'"$ADDRESS"'", "latest"],
    "id": 1
  }' | grep -o '"result":"0x[^"]*"' | cut -d'"' -f4)

WEI=$(bc <<< "ibase=16; $(tr '[:lower:]' '[:upper:]' <<< "${HEX#0x}")")
echo "$WEI wei"
