# Ethereum Anvil Dev Stack

A containerized local Ethereum node using [anvil](https://book.getfoundry.sh/anvil/)
from the Foundry suite. Provides a deterministic dev environment with
pre-funded accounts derived from the Hardhat "test junk" mnemonic.

## Quick Start

```bash
docker compose up
```

## What Happens

1. **anvil** starts on port 8545 with:
   - 10 pre-funded accounts (10000 ETH each) from the mnemonic
   - 12-second block time for realistic block production
   - 30M gas limit per block
   - Automatic mining every 12 seconds

## Exposed Ports

| Port | Service | Protocol       |
|------|---------|----------------|
| 8545 | anvil   | JSON-RPC (HTTP + WebSocket) |

## Using with PayPunk

```bash
# Start anvil
docker compose up -d

# Configure paypunk to use it
export PAYPUNK_ETHEREUM_RPC_URL=http://127.0.0.1:8545

# Run paypunk
paypunk
```

## Test Accounts

The first test account (index 0) is:
- Address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- Private key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

All 10 accounts have 10000 ETH each.

## Common Commands

```bash
# Check balance
curl -s http://127.0.0.1:8545 -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","latest"],"id":1}'

# Mine a block immediately
curl -s http://127.0.0.1:8545 -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"evm_mine","params":[],"id":1}'

# Full reset
docker compose down -v
```

## File Structure

```
├── docker-compose.yml
└── README.md
```
