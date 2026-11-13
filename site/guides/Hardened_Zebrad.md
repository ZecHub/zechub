# Hardened Zebra Full Node

- Uses a dedicated unprivileged user + kernel-level systemd sandboxing (same isolation as Docker).  
- RPC is localhost-only with secure cookie auth (default & recommended).  


---

## Prerequisites

- any Ubuntu-based distro
- Rust toolchain installed (`rustup` + `cargo`)
- At least 300 GB free disk space (`/var` partition)


---

## One-Time Setup (Run as your normal user)

### 1. Update system & install build dependencies

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Update Rust and install latest zebrad (7.0.0 or newer)

NU7 activated on Mainnet at block 3,543,405. Only [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) and later follow the chain after that height, so a 6.x or older `zebrad` is stuck on the old rules. Building it needs Rust 1.91 or newer, which `rustup update` installs. If you are upgrading an existing node from Zebra 6.x, back up `/var/lib/zebrad/state/v28` first: Zebra 7 moves it to the new v29 database format on first start, and 6.x can't read it afterwards.

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Create dedicated unprivileged zebra user

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Create secure data directory

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
sudo mkdir -p /var/lib/zebrad-rpc
sudo chown zebra:zebra /var/lib/zebrad-rpc
sudo chmod 750 /var/lib/zebrad-rpc
```

`/var/lib/zebrad-rpc` holds the RPC auth cookie. The service below can write only to these two directories, and systemd refuses to start it if either one is missing.

## Create secure configuration (/etc/zebrad/zebrad.toml)

```
sudo mkdir -p /etc/zebrad
sudo tee /etc/zebrad/zebrad.toml > /dev/null <<EOF
[network]
network = "Mainnet"
listen_addr = "0.0.0.0:8233"
# Peer cache. The default, ~/.cache/zebra, isn't writable by this service
cache_dir = "/var/lib/zebrad"

[state]
cache_dir = "/var/lib/zebrad"

[rpc]
# Enable RPC on localhost only (never expose to the internet!)
listen_addr = "127.0.0.1:8232"

# Cookie authentication 
enable_cookie_auth = true     # the default, shown to be explicit
# Without this line the cookie goes to ~/.cache/zebra, which this service can't write to,
# and zebrad stops at startup with "Zebra must be able to write the auth cookie to the disk"
cookie_dir = "/var/lib/zebrad-rpc"
EOF

sudo chown zebra:zebra /etc/zebrad/zebrad.toml
sudo chmod 600 /etc/zebrad/zebrad.toml
```

## Create hardened systemd service

```
sudo tee /etc/systemd/system/zebrad.service > /dev/null <<EOF
[Unit]
Description=Zebra Zcash Full Node (zebrad)
After=network.target

[Service]
Type=simple
User=zebra
Group=zebra
ExecStart=/usr/local/bin/zebrad --config /etc/zebrad/zebrad.toml start

UMask=0027

# Kernel-level sandboxing (makes native zebrad as isolated as Docker)
ProtectSystem=strict
ProtectHome=yes
PrivateTmp=yes
PrivateDevices=yes
NoNewPrivileges=yes
RestrictAddressFamilies=AF_INET AF_INET6
RestrictNamespaces=yes
MemoryDenyWriteExecute=yes
ReadWritePaths=/var/lib/zebrad /var/lib/zebrad-rpc

LimitNOFILE=65535
Restart=on-failure
RestartSec=5s
EOF

sudo systemctl daemon-reload
```

Zebra writes a new cookie each time it starts, readable only by the `zebra` user (mode 600), and deletes it when it stops. Read it with `sudo`, as below. Don't add an `ExecStartPost=` line that changes the cookie's mode: it can run before zebrad has written the cookie, and a failed `ExecStartPost=` command stops the service.

## Daily Usage - Single-Command Workflow

| Action                  | Command                                      | Notes |
|-------------------------|----------------------------------------------|-------|
| **Start**               | `sudo systemctl start zebrad`                | One command |
| **Stop**                | `sudo systemctl stop zebrad`                 | One command |
| **Status**              | `sudo systemctl status zebrad`               | Shows if running |
| **Live logs**           | `journalctl -u zebrad -f -o short-precise`  | Replaces `screen -r` |
| **Get RPC cookie**      | `sudo cat /var/lib/zebrad-rpc/.cookie`           | Only while running |

**Convenience aliases** (add to `~/.bashrc` or `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad-rpc/.cookie'
```
