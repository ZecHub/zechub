# Zebra siri ike Full Node

- Na-eji onye ọrụ na-enweghị ihe ùgwù + kernel-level systemd sandboxing (otu iche dị ka Docker). 
- RPC bụ naanị localhost na nchekwa kuki (ndabara & akwadoro). 


---

## Ihe ndị a chọrọ

- ọ bụla Ubuntu dabeere distro
- Rust toolchain arụnyere (`rustup` + `cargo`)
- Ọ dịkarịa ala 300 GB ohere disk (`/var` nkebi)


---

## Otu-Oge Mbido (Run dị ka gị nkịtị ọrụ)

### 1. Melite usoro & wụnye wuru dependencies

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Melite Rust ma wụnye zebrad kachasị ọhụrụ (v4.3.0+)

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Mepụta onye ọrụ zebra raara onwe ya nye na enweghị ikike

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Mepụta nchekwa data nchekwa

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
```

## Mepụta nhazi nchekwa (/etc/zebrad/zebrat.toml)

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

## Mepụta ọrụ systemd siri ike

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

## Ojiji kwa ụbọchị - Single-Command Workflow

Omume. Iwu. Ihe edeturu.
|-------------------------|----------------------------------------------|-------|
** Malite ** `sudo systemctl start zebrad` Otu iwu.
** Kwụsị ** `sudo systemctl stop zebrad` Otu iwu.
** Ọnọdụ ** `sudo systemctl status zebrad` Na-egosi ma ọ na-agba ọsọ.
** Ihe ndekọ ndụ ** `journalctl -u zebrad -f -o short-precise` Na-anọchi anya `screen -r` |
**Nweta kuki RPC** `sudo cat /var/lib/zebrad/.cookie` Naanị mgbe ị na-agba ọsọ.

**Ebe dị mma aha** (tinye na `~/.bashrc` or `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
```
