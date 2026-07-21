# Quickstart

> Get a working Zcash wallet with funds running on your machine in under 5 minutes.

This guide uses a local regtest network (no real funds, no external services). The wallet is pre-loaded with the standard test mnemonic and automatically funded by the regtest stack.

---

## Prerequisites

| Tool | Why | Install |
|------|-----|---------|
| **Nix** | Reproducible dev environment | [nixos.org/download](https://nixos.org/download) (enable flakes) |
| **devenv** | One-command environment setup | `nix profile install devenv` |
| **Docker** | Runs zcashd + lightwalletd in containers | [docs.docker.com/get-docker](https://docs.docker.com/get-docker/) |

Make sure Docker is running before you start.

---

## Step 1 — Enter the dev environment

```bash
git clone https://github.com/blockhackersio/paypunk.git
cd paypunk
devenv shell
```

This drops you into a shell with Rust, helper scripts, and all dependencies ready. You'll see a prompt like `(devenv) $`.

## Step 2 — Start the Zcash regtest chain

Open a **new terminal**, then:

```bash
cd paypunk
devenv shell
zcash
```

The `zcash` script starts `zcashd` + `lightwalletd` in Docker, mines 120 blocks, shields coinbase funds into the test wallet's Orchard address, and then mines 1 block per second until you press `Ctrl+C`. **Keep this terminal running.**

> First run downloads ~1.7 GB of Zcash proving parameters. Subsequent runs are fast.

You'll see output like:

```
==> Starting zcashd + lightwalletd…
==> zcashd ready after 3s
==> Funding uregtest1p8jny...
==> done. Orchard funds are on-chain.
==> Stack is up. Mining 1 block/sec (Ctrl+C to stop)…
```

## Step 3 — Set up the wallet

Open a **second terminal**, then:

```bash
cd paypunk
devenv shell
setup
```

This resets any old wallet state, restores the test mnemonic, and derives accounts. The wallet password is `test`.

```
Resetting wallet data...
Restoring wallet with test mnemonic...
Seed restored successfully
Unlocking wallet and deriving accounts...
Unlocked. 2 accounts derived.
Done. Test wallet ready — password: test
```

## Step 4 — Launch the TUI

In the same terminal:

```bash
cargo run --bin paypunk
```

This compiles the project (first build takes a few minutes) and auto-launches `keypunkd` + `paypunkd` + the terminal UI. You should see the wallet home screen with your Zcash account and balance.

---

## Using the TUI

| Key | Action |
|-----|--------|
| `?` | Help overlay (context-sensitive) |
| `Enter` | Select / confirm |
| `Esc` | Back / cancel |
| `q` | Quit |
| `s` | Send |
| `o` | Receive (show your address) |
| `a` | Add account |
| `r` | Refresh |
| `c` | Copy to clipboard |

### Try a send

1. Press `o` to see your Orchard address — copy it with `c`.
2. Press `Esc` to go back, then `s` to send.
3. Paste the address as the recipient, enter an amount (e.g. `0.001`).
4. Confirm. The wallet constructs the transaction, sends it to `keypunkd` for signing, and broadcasts it.
5. Press `r` to refresh — the balance updates after the next block is mined (the regtest stack mines 1 block/sec).

---

## Without devenv

If you don't have Nix/devenv, you can run everything manually. You'll need: **Rust stable**, **Docker + Compose v2**, **jq**.

```bash
git clone https://github.com/blockhackersio/paypunk.git
cd paypunk
cargo build

# Terminal 1 — start regtest chain + fund the test wallet
cd support/zcash && make up
make fund UA=uregtest1p8jnyvgzh5dczns4e7ke4v3wgswh32pls057q2tf9mjl2n3372smalr3crg5kjz9x26nyzjyhqq9tm5n9k8pn6ep4fqzu5r2rg052dny
make mine          # keeps mining 1 block/sec — leave running

# Terminal 2 — set up wallet
cargo run --bin paypunk -- reset
cargo run --bin paypunk -- restore-seed -m "test test test test test test test test test test test junk" -p test
cargo run --bin paypunk -- unlock -p test

# Launch the TUI
cargo run --bin paypunk
```

---

## Optional: Ethereum (anvil)

The repo also includes a local Ethereum node (anvil) with 10 pre-funded accounts.

```bash
# In a devenv shell:
ethereum          # starts anvil on port 8545

# In another terminal:
cargo run --bin paypunk -- reset
cargo run --bin paypunk -- restore-seed -m "test test test test test test test test test test test junk" -p test
cargo run --bin paypunk -- unlock -p test
cargo run --bin paypunk
```

The same test mnemonic derives an Ethereum account that is pre-funded on anvil.

---

## Optional: Offline signer (QR air-gap)

Paypunk supports air-gapped signing where keys live on a separate device and signing requests are relayed via QR codes.

```bash
# Instead of `cargo run --bin paypunk`, use:
cargo run --bin paypunk -- --signer
```

This spawns a WebSocket bridge instead of `keypunkd`. Open `http://0.0.0.0:12345/` in a browser on your signing device to scan/display QR codes. For the full mobile signer app (Android, Tauri v2), see [signer/README.md](signer/README.md).

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `devenv shell` fails | Ensure Nix has flakes enabled: `nix profile install nixpkgs#nixFlakes` or add `experimental-features = nix-command flakes` to `~/.config/nix/nix.conf` |
| `zcash` fails to start | Check Docker is running: `docker info`. If ports are in use, stop old containers: `cd support/zcash && make reset` |
| No balance shows up | The wallet needs to sync. Wait 30-60 seconds and press `r` to refresh. The regtest stack must still be mining (terminal 1). |
| `cargo run` errors with socket in use | Remove stale sockets: `rm -f /tmp/paypunkd.sock /tmp/keypunkd.sock` |
| Want a clean slate | `cargo run --bin paypunk -- reset` wipes wallet data. `cd support/zcash && make reset` wipes the chain. |

---

## What's happening under the hood

```
┌──────────┐     IPC      ┌───────────┐     IPC      ┌──────────┐
│  paypunk │ ──────────▶  │ paypunkd  │ ──────────▶  │ keypunkd │
│  (TUI)   │  Unix socket │ (wallet)  │  Unix socket │  (keys)  │
└──────────┘              └───────────┘              └──────────┘
                               │
                               │ gRPC
                               ▼
                          ┌───────────┐
                          │lightwalletd│
                          └───────────┘
                               │
                               ▼
                          ┌───────────┐
                          │  zcashd   │  (Docker, regtest)
                          └───────────┘
```

- **paypunk** (CLI/TUI) — your interface. Never touches keys.
- **paypunkd** — manages addresses, balances, transaction construction. Never holds key material.
- **keypunkd** — holds decrypted keys in memory, signs transactions.
- **lightwalletd** — gRPC proxy to zcashd for shielded sync.

See the [architecture docs](docs/src/ARCHITECTURE.md) for the full design.
