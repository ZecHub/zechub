# Zebra Ɣaɣla dzesi ŋɔŋlɔ blibo [Full Node] si wolé ɖe asi

- Etsɔ zãla si mekpɔ mɔ tɔxɛ kple systemd sandboxing si le kernel ƒe haxɔ me (mamã tɔxɛ abe Docker ene).  
- RPC le localhost ko dzi kple cookie auth si le dedie (enye default eye woɖo eŋu).  


---

## Nusiwo hiã

- Ubuntu-based distro ɖe sia ɖe
- Rust toolchain si wode (`rustup` kple `cargo`)
- Disk ƒe teƒe blibo si ƒe GB 300 le xɔxɔ me (`/var` partition)


---

## Teƒeɖoɖo Ƒe Ɣeyiɣi Ɖeka (Wɔe abe wò zãla kawaida ene)

### 1. Trɔ system la eye nàde build ƒe dependency-wo

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Trɔ Rust eye nàde zebrad si yeyee (v4.3.0+)

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Wɔ zebra zãla tɔxɛ si mekpɔ mɔ

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Wɔ data ƒe fiẽƒe dedie

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
```

## Wɔ configuration dedie (/etc/zebrad/zebrad.toml)

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

## Wɔ systemd service si wolé ɖe asi

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

## Dzidzɔ ƒe Zãzã - Dɔwɔwɔ kple command Ɖeka

| Nuwɔna                  | Command                                      | Nudzɔdzɔ |
|-------------------------|----------------------------------------------|-------|
| **Dze egɔme**               | `sudo systemctl start zebrad`                | Command ɖeka |
| **Tsi**                | `sudo systemctl stop zebrad`                 | Command ɖeka |
| **Nɔnɔme**              | `sudo systemctl status zebrad`               | Efia ne ele dɔ wɔm |
| **Log-wo si le dzɔdzɔm**           | `journalctl -u zebrad -f -o short-precise`  | Etɔ ɖe `screen -r` teƒe |
| **Xɔ RPC cookie**      | `sudo cat /var/lib/zebrad/.cookie`           | Ne ele dɔ wɔm ko |

**Alias-wo si ƒe zãzã bɔbɔe** (tsɔ kpe ɖe `~/.bashrc` alo `~/.zshrc` ŋu):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
```
