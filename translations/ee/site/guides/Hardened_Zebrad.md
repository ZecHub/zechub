# Zebra Sesẽe Blibo Node

- Zãa zãla si tsɔ eɖokui na si si mɔnukpɔkpɔ mele o + kernel-level systemd sandboxing (ɖekaɖeka ma ke abe Docker ene). 
- RPC nye localhost-ko kple dedie cookie auth (default & recommended). 


---

## Nusiwo hiã do ŋgɔ

- distro ɖesiaɖe si wotu ɖe Ubuntu dzi
- Rust dɔwɔnuwo ƒe kɔsɔkɔsɔ si woda ɖe eme (`rustup` + `cargo`)
- Ne mede ɖeke o la, 300 GB ya teti ƒe disk ƒe teƒe si woate ŋu akpɔ faa (`/var` mama) .


---

## Zi Ðeka ƒe Ðoɖowɔwɔ (Du du abe wò zãla si nèzãna ɖaa ene) .

### 1. Trɔ asi le ɖoɖo & install xɔ dependencies

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Trɔ asi le Rust ŋu eye nàda zebrad yeyetɔ (v4.3.0+) ɖe wò kɔmpiuta dzi.

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Wɔ zebra zãla si si mɔnukpɔkpɔ mele o si tsɔ eɖokui na

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Wɔ nyatakakadzraɖoƒe si le dedie

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
```

## Wɔ ɖoɖo si le dedie (/etc/zebrad/zebrad.toml) .

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

## Wɔ systemd subɔsubɔdɔ sesẽ

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

## Gbesiagbe Zazã - Sedede Ðeka ƒe Dɔwɔwɔ

| Nuwɔna | Sedede | De dzesiiwo |
|-------------------------|----------------------------------------------|-------|
| **Dze egɔme** | `sudo systemctl start zebrad` | Sedede ɖeka |
| **Dzudzɔ** | `sudo systemctl stop zebrad` | Sedede ɖeka |
| **Nɔnɔme** | `sudo systemctl status zebrad` | Fia ne ele du dzi |
| **Agbe nuŋlɔɖiwo** | `journalctl -u zebrad -f -o short-precise` | Exɔ ɖe eteƒe `screen -r` |
| **Xɔ RPC kuki** | `sudo cat /var/lib/zebrad/.cookie` | Ne èle du dzi ko |

**Aliases siwo sɔ** (tsɔ kpe ɖe... `~/.bashrc` or `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
```
