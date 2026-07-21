# Contributing

Thanks for your interest in contributing to paypunk! This is an experimental privacy wallet framework, and we welcome contributions of all kinds.

## Prerequisites

- **Rust stable** (no `rust-toolchain.toml` — stable is implied by CI)
- **Docker + Compose v2** (for local chain stacks)
- **jq** (used by the Zcash regtest funding script)
- **devenv + direnv** (recommended but optional)

## Getting set up

### With devenv (recommended)

```bash
git clone https://github.com/blockhackersio/paypunk.git
cd paypunk
devenv shell       # enters the dev environment
```

With direnv installed, `.envrc` auto-activates the environment on `cd`.

### Without devenv

```bash
git clone https://github.com/blockhackersio/paypunk.git
cd paypunk
cargo build
```

## Development commands

| Command | Purpose |
|---------|---------|
| `cargo build` | Build the workspace |
| `cargo test` | Run all tests (unit + integration) |
| `cargo fmt --all --check` | Check formatting (CI enforces this) |
| `cargo clippy --all-targets` | Run lints (recommended, not yet CI-gated) |
| `cargo run` | Auto-launch daemons + TUI |
| `cargo run -- tui` | Launch TUI only (daemons must be running) |

### devenv scripts

If using devenv, these shortcuts are available:

| Script | Command | Purpose |
|--------|---------|---------|
| `cb` | `cargo build` | Build |
| `ct` | `cargo test` | Test |
| `setup` | `scripts/setup-test-wallet.sh` | Reset + restore test wallet |
| `ethereum` | `scripts/start-ethereum.sh` | Start anvil Docker stack |
| `zcash` | `scripts/start-zcash.sh` | Start zcashd + lightwalletd regtest |
| `kp` | `scripts/key-daemon.sh` | Run keypunkd |
| `pp` | `scripts/wallet-daemon.sh` | Run paypunkd |
| `tui` | `scripts/ui.sh` | Run TUI |
| `bal` | `scripts/get-balance.sh` | Query ETH balance |

## Local chain stacks

### Zcash regtest

```bash
cd support/zcash && make up          # start zcashd + lightwalletd
make fund UA=<your-orchard-ua>       # mine + shield funds to your wallet
make info                            # check height + Orchard pool value
```

See [`support/zcash/README.md`](support/zcash/README.md) for details.

### Ethereum (anvil)

```bash
cd support/ethereum && docker compose up
```

10 pre-funded accounts at `http://127.0.0.1:8545`. See [`support/ethereum/README.md`](support/ethereum/README.md).

## Testing

### Unit tests

Inline `#[cfg(test)]` modules in each crate. Run with `cargo test`.

### Integration tests

In the `tests/` workspace crate:

- `tests/tests/integration_test.rs` — 14 async tests covering seed generation, address derivation, balance queries, the full ETH send flow, and account CRUD. Uses `TestBuilder` to wire up the full actor chain in-memory.
- `tests/tests/pczt_test.rs` — Zcash Orchard PCZT pipeline tests.

### Test wallet setup

```bash
scripts/setup-test-wallet.sh    # reset + restore + unlock with test mnemonic
```

Uses the standard BIP39 test mnemonic (`test test ... junk`) with password `test`.

## Code style

- **Formatting:** `cargo fmt` defaults (no `rustfmt.toml`). CI checks `cargo fmt --all --check`.
- **No comments unless necessary** — the codebase favors self-documenting code. Don't add comments unless asked.
- **Crate naming:** Libraries use `paypunk-` prefix (`paypunk-types`, `paypunk-ipc`). Daemons use short names (`paypunk`, `paypunkd`, `keypunkd`).
- **Dependencies:** Centralized in `[workspace.dependencies]` in the root `Cargo.toml`. Reference as `foo.workspace = true` in crate manifests.
- **Serialization:** `postcard` for IPC payloads, `toml` for config, `serde` for derive macros.
- **Actor framework:** `tactix` throughout. Actors implement `Actor` + `Handler<Message>`.
- **Edition:** All crates use `edition = "2021"`.
- **License:** `AGPL-3.0-only`.

## Project structure

```
types/           Chain-agnostic domain types + traits
config/          TOML configuration with env var overrides
ipc/             Tactix actor IPC over Unix sockets
keypunkd/        Key daemon (seed storage, signing)
paypunkd/        App daemon (wallet DB, protocol orchestration)
api/             Public-facing client library
cli/             CLI/TUI binary (paypunk)
tui/             Terminal UI (ratatui)
protocols/
  zcash/         Zcash Protocol + SignerProtocol
  ethereum/      Ethereum Protocol + SignerProtocol
bridge/          WebSocket/HTTP relay for air-gapped signing
signer/          Tauri v2 mobile signer app (separate build)
ping/ pong/      IPC diagnostic test pair
tests/           Integration tests
support/         Docker stacks for local chains
docs/            Documentation
adr/             Architecture decision records
```

## Adding a new chain

See [`docs/ADD_PROTOCOL.md`](docs/ADD_PROTOCOL.md) for a step-by-step guide.

## Architecture decisions

See [`adr/`](adr/) for architecture decision records. Current:

- [ADR-001: IPC Authentication Model](adr/001-ipc-auth-model.md)

## Submitting changes

1. Fork the repo and create a branch
2. `cargo fmt --all` — format your code
3. `cargo test` — make sure tests pass
4. `cargo clippy --all-targets` — fix any warnings (recommended)
5. Open a pull request against `master`

CI runs `cargo fmt --all --check` and `cargo test` on all PRs to `master`.

## The signer subproject

The `signer/` directory is a separate Tauri v2 mobile app with its own `devenv.nix`, `Cargo.lock`, and build tooling (Android SDK, NDK, Node, JDK). It is excluded from the Cargo workspace. See [`signer/README.md`](signer/README.md) for build instructions.
