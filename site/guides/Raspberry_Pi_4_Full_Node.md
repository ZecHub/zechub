# Run a Full Node on a Raspberry Pi 4 (Zebra + Zallet)

*Migrated from the original zcashd-based guide. zcashd reached its automatic End-of-Support halt on July 18, 2026, so this guide now uses **Zebra** (the current full node, maintained by the Zcash Foundation) and **Zallet** (the wallet built to replace zcashd's built-in wallet).*

## What you'll learn
- How to flash and configure Ubuntu Server 22.04+ (64-bit) on a Raspberry Pi 4 for headless use
- How to install and run Zebra, either via Docker or a pre-built binary
- How to install, configure, and initialize Zallet, including wallet encryption setup
- How to optionally migrate an existing zcashd config/wallet into Zallet

## What changed from the old guide
The previous version of this guide walked through compiling **zcashd** natively on a Pi 4 — a single-threaded compile that took 3–4 hours because the Pi 4 doesn't have enough memory for a parallel (`-j$(nproc)`) build. Zebra and Zallet both now ship **official pre-built ARM64 binaries and Docker images**, so in most cases you no longer need to compile anything from source on the Pi itself.

## Prerequisites
- A Raspberry Pi 4 (4 GB RAM or more recommended)
- A microSD card (32 GB+) for the OS
- An external SSD/HDD with USB 3.0 support — **Zebra needs roughly 300 GB for cached Mainnet data**, growing over time, so don't try to run this off the microSD card alone
- A computer with a microSD card slot (to flash the OS image)
- A wired Ethernet connection or Wi-Fi
- Basic comfort with the command line over SSH

## Step 1: Flash Ubuntu Server 22.04+ (64-bit)
Zebra's and Zallet's pre-built binaries and Docker images require **glibc 2.34+**, which means **Ubuntu Server 22.04 or newer (64-bit/aarch64)**.

1. Install the Raspberry Pi Imager on your main computer.
2. Insert your microSD card.
3. Choose **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (or newer).
4. Use the Imager's advanced options (gear icon) to pre-configure hostname, enable SSH, and set Wi-Fi credentials if needed, for a headless first boot.
5. Write the image, insert the card, power on the Pi.
6. SSH in: `ssh <username>@<pi-hostname-or-ip>`

## Step 2: Attach and mount external storage
1. Connect your external SSD/HDD via USB 3.0.
2. Identify the device: `lsblk`
3. Format (if new) and mount it, e.g. to `/mnt/zcash-data`, with a standard `mkfs`/`fstab` setup so it auto-mounts on reboot.

## Step 3: Update the system
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Step 4: Install and run Zebra
### Option A — Docker (recommended)
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # log out/in after this
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
Check progress: `docker logs -f zebra`

### Option B — Pre-built binary via cargo binstall
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
This installs a pre-built `aarch64` binary — no compiling required.

**On sync time:** expect this to take a while — commonly-cited first-sync figures (roughly 2 hours) come from reference hardware that is more powerful than a Pi 4's CPU, so your actual sync time on real Pi 4 hardware will likely run longer.

## Step 5: Install Zallet
Zallet is currently in **alpha** — expect breaking changes, and don't treat it as production-ready custody for significant funds yet.

### Option A — Docker (recommended)
```bash
docker pull zodlinc/zallet:latest
```
This image supports ARM64 (via a Nix-based build) and runs from a minimal, shell-less filesystem — pass configuration and data paths explicitly via `--datadir` and volume mounts (see Step 6).

### Option B — Build from source
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
Zallet's crates aren't yet published to crates.io during the alpha phase, so installing from the git repo directly is the supported non-Docker method.

## Step 6: Configure Zallet
Create `zallet.toml` in your chosen datadir (e.g. `/mnt/zcash-data/zallet`):
```toml
[builder.limits]
[consensus]
network = "main"
[database]
[external]
[features]
as_of_version = "0.0.0"
[features.deprecated]
[features.experimental]
[indexer]
validator_address = "127.0.0.1:8232"   # Zebra's JSON-RPC endpoint
[keystore]
[note_management]
[rpc]
bind = ["127.0.0.1:SOMEPORT"]
```
Adjust `validator_address` if Zebra runs on a different host/port, and configure `validator_cookie_auth`/`validator_user`/`validator_password` under `[indexer]` to match your Zebra RPC auth setup.

**Migrating from zcashd?** If you still have an old `zcash.conf`:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## Step 7: Set up wallet encryption
Zallet encrypts all key material using `age`/`rage`:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
This prints a public key and an autogenerated passphrase — **save the passphrase; you cannot recover the identity file without it.**

## Step 8: Initialize and start the wallet
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**Only run `generate-mnemonic` once** unless you deliberately want multiple independent spending roots.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## Step 9: Migrating an existing zcashd wallet (optional)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
This requires the `db_dump` utility (built against Berkeley DB 6.2.23) — from a system install or a local source-build of zcashd. If you no longer have zcashd installed, this is the one migration step that isn't fully self-contained in Zallet yet.

## Step 10: Verify everything works
```bash
zallet -d /mnt/zcash-data/zallet help
```
Confirm the wallet responds, and once Zebra finishes syncing, that balances/addresses match expectations.

## Troubleshooting
- **Zebra build/runtime issues on ARM:** if building from source, install the Rust ARM toolchain — running x86_64 build tools on ARM hardware will run noticeably slower, per Zebra's own documentation.
- **Storage filling up:** Zebra's ~300 GB footprint keeps growing — plan headroom.
- **Docker permission errors:** log out/back in after adding your user to the `docker` group, or use `sudo` in the meantime.
- **Zallet container has no shell:** the official `zodlinc/zallet` image is from-scratch by design — always pass `--datadir` explicitly and mount your data directory as a volume.

## Hardware notes vs. the old zcashd guide
Zebra and Zallet are generally lighter on CPU during setup than compiling zcashd was, since you're running pre-built binaries/containers. 4 GB RAM is a reasonable starting point; monitor with `htop` and consider the 8 GB Pi 4 variant if you see heavy swapping.

## Additional resources
- [Zebra Book](https://zebra.zfnd.org) — official Zebra documentation
- [Zallet Book](https://zcash.github.io/zallet/) — official Zallet documentation
- [zcashd End-of-Support notice](https://z.cash/support/zcashd-deprecation)

---

*If you found this guide useful, consider supporting ZecHub: [insert current ZecHub donation shielded address from zechub.wiki/donation — not included here since I couldn't verify it's still current].*
