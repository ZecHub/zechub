# Hardened Zebra Full Node

- Ɔde ɔdefo a onni hokwan a wɔatu ne ho ama + kernel-level systemd sandboxing (tetewmu koro no ara ne Docker) di dwuma. 
- RPC yɛ localhost-only a ɛwɔ ahobammɔ cookie auth (default & recommended). 


---

## Nneɛma a ɛsɛ sɛ wodi kan yɛ

- distro biara a egyina Ubuntu so
- Rust adwinnade a wɔde ahyɛ mu (`rustup` + `cargo`)
- Anyɛ yiye koraa no, disk space a wontua hwee 300 GB (`/var` mpaapaemu) .


---

## Bere Biako Nhyehyɛe (Tu mmirika sɛ wo dwumadie a wotaa de di dwuma) .

### 1. Update nhyehyɛe & instɔl ɔdansi dependencies

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Update Rust na instɔl zebrad a aba foforo (v4.3.0+) .

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Bɔ ɔsebɔ a onni hokwan a ɔde ne ho ama

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Yɛ data kyerɛwtohɔ a ahobammɔ wom

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
```

## Yɛ nhyehyɛe a ahobammɔ wom (/etc/zebrad/zebrad.toml) .

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

## Yɛ systemd dwumadie a ɛyɛ den

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

## Daa Daa Dwumadie - Ahyɛdeɛ Baako Adwumayɛ

| Adeyɛ | Ahyɛdeɛ | Nsɛm a Wɔahyɛ no Nsow |
|-------------------------|----------------------------------------------|-------|
| **Fi ase** | `sudo systemctl start zebrad` | Ahyɛdeɛ baako |
| **Gyina** | `sudo systemctl stop zebrad` | Ahyɛdeɛ baako |
| **Gyinabea** | `sudo systemctl status zebrad` | Kyerɛ sɛ ɛretu mmirika |
| **Live logs** | `journalctl -u zebrad -f -o short-precise` | Ɛde si ananmu `screen -r` |
| **Nya RPC kuki** | `sudo cat /var/lib/zebrad/.cookie` | Bere a woretu mmirika nkutoo |

**Aliases a ɛyɛ mmerɛw** (fa ka ho `~/.bashrc` or `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
```
