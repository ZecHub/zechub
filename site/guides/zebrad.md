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

## Update Rust and install latest zebrad (v4.3.0+)

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
```

## Create secure configuration (/etc/zebrad/zebrad.toml)

```
sudo mkdir -p /etc/zebrad
sudo tee /etc/zebrad/zebrad.toml > /dev/null <<EOF
[network]
network = "Mainnet"
listen_addr = "0.0.0.0:8233"

[state]
cache_dir = "/var/lib/zebrad"

[rpc]
# Enable RPC on localhost only (never expose to the internet!)
listen_addr = "127.0.0.1:8232"

# Cookie authentication 
enable_cookie_auth = true     # ← uncomment to be explicit
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
ExecStartPost=/bin/chmod 750 /var/lib/zebrad-rpc
ExecStartPost=/bin/chmod 640 /var/lib/zebrad-rpc/.cookie

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

## Daily Usage – Single-Command Workflow

| Action                  | Command                                      | Notes |
|-------------------------|----------------------------------------------|-------|
| **Start**               | `sudo systemctl start zebrad`                | One command |
| **Stop**                | `sudo systemctl stop zebrad`                 | One command |
| **Status**              | `sudo systemctl status zebrad`               | Shows if running |
| **Live logs**           | `journalctl -u zebrad -f -o short-precise`  | Replaces `screen -r` |
| **Get RPC cookie**      | `sudo cat /var/lib/zebrad/.cookie`           | Only while running |

**Convenience aliases** (add to `~/.bashrc` or `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
```
