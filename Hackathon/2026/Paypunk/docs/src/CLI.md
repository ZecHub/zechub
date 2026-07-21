# CLI Reference

> **Note:** This is a work in progress. Only simple transfers (send/receive) are currently supported. Some subcommands may be incomplete or have placeholder behavior. Passwords are accepted via `--password` flag only (no interactive prompt yet).

The `paypunk` binary is the single entry point for all wallet operations. It auto-launches daemons when needed and tears them down on exit.

## Usage

```
paypunk [OPTIONS] [COMMAND]
```

Run with no subcommand to auto-launch daemons + TUI.

## Global options

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--socket-path` | `-s` | `/tmp/paypunkd.sock` | paypunkd IPC socket path |
| `--signer` | | `false` | Enable offline signer mode (spawns bridge instead of keypunkd) |
| `--zcash-network` | | `regtest` | Zcash network: `regtest`, `testnet`, or `mainnet` |
| `--lightwalletd-host` | | Network default | Override lightwalletd endpoint |
| `--data-dir` | | `~/.local/share/paypunk/<network>/` | Override data directory |

## Environment variables

All config fields can be overridden via environment variables:

| Env var | Config field |
|---------|-------------|
| `PAYPUNK_SOCKET_PATH` | `paypunkd_socket_path` |
| `KEYPUNKD_SOCKET_PATH` | `keypunkd_socket_path` |
| `PAYPUNK_DATA_DIR` | `data_dir` |
| `PAYPUNK_CONFIG_DIR` | `config_dir` |
| `PAYPUNK_ETHEREUM_RPC_URL` | `ethereum_rpc_url` |
| `PAYPUNK_LIGHTWALLETD_HOST` | `lightwalletd_host` |
| `PAYPUNK_ZCASH_NETWORK` | `zcash_network` |
| `PAYPUNK_BRIDGE_SOCKET_PATH` | `bridge_socket_path` |
| `PAYPUNK_OFFLINE_SIGNER` | `offline_signer` (`"true"` or `"1"`) |

## Configuration file

Located at `~/.config/paypunk/config.toml`. Generated on first run if missing.

```toml
paypunkd_socket_path = "/tmp/paypunkd.sock"
keypunkd_socket_path = "/tmp/keypunkd.sock"
bridge_socket_path = "/tmp/paypunk-bridge.sock"
data_dir = "~/.local/share/paypunk/"
config_dir = "~/.config/paypunk/"
ethereum_rpc_url = "http://127.0.0.1:8545"
zcash_network = "regtest"
offline_signer = false
```

## Subcommands

### `generate-seed`

Generate a new wallet seed.

```bash
paypunk generate-seed -p <password>
```

| Flag | Short | Type | Required | Default |
|------|-------|------|----------|---------|
| `--password` | `-p` | String | Yes | — |

Prints the 12-word BIP39 mnemonic. Save it offline.

### `restore-seed`

Restore a wallet from an existing seed phrase.

```bash
paypunk restore-seed -m "word1 word2 ... word12" -p <password> --birthday-height 1234567
```

| Flag | Short | Type | Required | Default |
|------|-------|------|----------|---------|
| `--mnemonic` | `-m` | String | Yes | — |
| `--password` | `-p` | String | Yes | — |
| `--birthday-height` | | u64 | No | None |

Birthday height speeds up initial sync by avoiding scanning from genesis. Recommended for mainnet.

On mainnet, if `--birthday-height` is omitted the wallet auto-fetches the current chain tip as the birthday. This is fine for fresh wallets, but existing funds below that height will not be detected. Always provide a birthday block when restoring a mainnet wallet with prior activity. The stored birthday is consulted by `create_account`, `register_signer`, and `bulk_derive_accounts` before falling back to the tip, and the background sync loop falls back to the minimum account birthday when no blocks have been scanned yet.

### `unlock`

Unlock the wallet and derive accounts from pre-derived viewing keys.

```bash
paypunk unlock -p <password>
```

| Flag | Short | Type | Required | Default |
|------|-------|------|----------|---------|
| `--password` | `-p` | String | Yes | — |

On first unlock, bulk-derives 30 viewing keys per protocol from keypunkd, stores them in `pre_derived_keys`, and creates the first account per protocol.

### `submit-transfer`

Submit a transfer intent for preview (two-phase signing, step 1).

```bash
paypunk submit-transfer \
  --to "u1..." --amount "0.001" --from "u1..." \
  --protocol zcash --memo "payment" --account 0
```

| Flag | Short | Type | Required | Default |
|------|-------|------|----------|---------|
| `--to` | `-t` | String | Yes | — |
| `--amount` | `-a` | String | Yes | — |
| `--from` | `-f` | String | Yes | — |
| `--asset` | | String | No | `eip155:1/slip44:60` |
| `--protocol` | `-p` | String | No | Inferred from asset |
| `--data` | `-d` | String | No | None |
| `--memo` | `-m` | String | No | None |
| `--account` | | u32 | No | `0` |

Protocol is inferred from `--asset` if not provided: `eip155` → Ethereum, `zcash` → Zcash, else defaults to Ethereum.

Saves a pending intent to `<data_dir>/pending.intent`. Run `approve-signature` next.

### `approve-signature`

Approve a previously submitted intent (two-phase signing, step 2).

```bash
paypunk approve-signature -p <password>
```

| Flag | Short | Type | Required | Default |
|------|-------|------|----------|---------|
| `--password` | `-p` | String | Yes | — |
| `--account` | | u32 | No | `0` |

Reads `<data_dir>/pending.intent`, signs the artifact via keypunkd, broadcasts the transaction, and removes the pending file.

### `get-balance`

Query balance for a protocol and account.

```bash
paypunk get-balance --protocol zcash --account 0
paypunk get-balance --protocol ethereum --address 0xf39Fd6...
```

| Flag | Short | Type | Required | Default |
|------|-------|------|----------|---------|
| `--protocol` | `-p` | String | No | `zcash` |
| `--account` | `-a` | u32 | No | `0` |
| `--address` | | String | No | None (uses account) |

If `--address` is omitted, looks up the account by protocol + derivation path.

### `list-accounts`

List all accounts in the wallet.

```bash
paypunk list-accounts
```

No flags. Prints `id | protocol | derivation_path | name | address` for each account.

### `create-account`

Create a new account from a pre-derived viewing key.

```bash
paypunk create-account --protocol zcash --account-index 1 --name "Savings"
```

| Flag | Short | Type | Required | Default |
|------|-------|------|----------|---------|
| `--protocol` | `-p` | String | No | `zcash` |
| `--account-index` | | u32 | No | `0` |
| `--name` | `-n` | String | No | `"{Protocol} Account {index}"` |
| `--birthday-height` | | u64 | No | None |

### `tui`

Launch the terminal UI. Does NOT start daemons — they must be running.

```bash
paypunk tui
paypunk tui --signer    # connect to bridge instead of keypunkd
```

| Flag | Short | Type | Required | Default |
|------|-------|------|----------|---------|
| `--signer` | | bool | No | `false` |

### `keypunkd`

Launch the key daemon as a foreground process.

```bash
paypunk keypunkd --zcash-network regtest
```

| Flag | Short | Type | Required | Default |
|------|-------|------|----------|---------|
| `--socket-path` | `-s` | String | No | `/tmp/keypunkd.sock` |
| `--data-dir` | `-d` | String | No | `~/.local/share/paypunk/<network>/` |
| `--zcash-network` | `-z` | String | No | `regtest` |

### `paypunkd`

Launch the app daemon as a foreground process.

```bash
paypunk paypunkd --keypunkd-socket /tmp/keypunkd.sock --lightwalletd-host http://127.0.0.1:9067
```

| Flag | Short | Type | Required | Default |
|------|-------|------|----------|---------|
| `--socket-path` | `-s` | String | No | `/tmp/paypunkd.sock` |
| `--keypunkd-socket` | `-k` | String | No | `/tmp/keypunkd.sock` |
| `--ethereum-rpc-url` | `-e` | String | No | `http://127.0.0.1:8545` |
| `--data-dir` | `-d` | String | No | `~/.local/share/paypunk/<network>/` |
| `--lightwalletd-host` | `-l` | String | No | Network default |
| `--zcash-network` | `-z` | String | No | `regtest` |

### `bridge`

Run the QR bridge web server for air-gapped signing.

```bash
paypunk bridge --port 12345 --socket-path /tmp/keypunkd.sock
```

| Flag | Short | Type | Required | Default |
|------|-------|------|----------|---------|
| `--port` | | u16 | No | `12345` |
| `--socket-path` | | String | No | `/tmp/keypunkd.sock` |

Serves an HTML page at `http://0.0.0.0:{port}/` and a WebSocket at `ws://0.0.0.0:{port}/ws`.

### `reset`

Remove all wallet data (seed, database, accounts). Resets to clean state.

```bash
paypunk reset
```

No flags. Removes the entire data directory (all networks).

### `uninstall`

Permanently remove all wallet + config data.

```bash
paypunk uninstall           # prompts for confirmation
paypunk uninstall --force   # skip confirmation
```

| Flag | Short | Type | Required | Default |
|------|-------|------|----------|---------|
| `--force` | `-f` | bool | No | `false` |

Removes both `data_dir` and `config_dir`.

## Auto-launch behavior

When run with no subcommand (or with a client command like `generate-seed`), `paypunk` automatically:

1. Checks if `paypunkd` is already running on the socket (500ms connect probe)
2. If not, spawns `keypunkd` (or `bridge` in signer mode) + `paypunkd` as child processes
3. Waits up to 30 seconds for sockets to appear
4. Runs the command/TUI
5. Kills spawned daemons on exit

If daemons are already running, they are reused — no new processes are spawned.

## Two-phase signing (CLI)

The CLI uses a two-phase signing flow for transfers:

```bash
# Phase 1: build + preview
paypunk submit-transfer --to "u1..." --amount "0.001" --from "u1..." --protocol zcash
# → prints fee, saves pending.intent

# Phase 2: approve + broadcast
paypunk approve-signature -p <password>
# → signs with keypunkd, broadcasts, prints tx hash
```

The pending intent is stored at `<data_dir>/pending.intent` (base data dir, not network-specific).
