# Hardened Zebra ɣaɣla dzesi ŋɔŋlɔ blibo

- Ɗe ame si mekpɔ dɔwɔwɔ ŋusẽ o kple kernel-level systemd sandboxing (nɔnɔƒe ɖeɖe ka ene kple Docker).  
- RPC le localhost ko dzi, eye wòtsɔ secure cookie auth (default kple Recommended) wòwɔa dɔ.  


---

## Ŋgɔdonya

- Ubuntu dziŋɔnu siwo wòtsɔ wɔ
- Rust toolchain si wòde eŋu (`rustup` kple `cargo`)
- Disk teƒe si xɔ 300 GB alo wu eye wòle dɔ wɔm (`/var` partition)


---

## Ɗoɖoɖo Ɖeka (Wɔe kple wò ŋutilã ƒe user)

### 1. Dzra system ɖo eye nàɖo build dependencies

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Ɖo Ŋgɔ Rust eye nàɖo zebrad yeye si le eme (7.0.0 alo yeyetɔ)

NU7 ɖo eŋu le Mainnet me le gaɖoɖowo ƒuƒoƒe 3,543,405. [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) kple esiwo va emegbe ko wɔa ɖoɖoɖo kple ɖoɖonu le gaɖoɖo ƒe dzidzime sia megbe, eye esia ta 6.x alo `zebrad` xoxo la le nu siwo ƒe se xoxo la me. Wòwɔe hia Rust 1.91 alo yeyetɔ, si `rustup update` ɖoa ɖo. Ne èle ɖoɖo yeye wɔm na ɣaɣla dzesi ŋɔŋlɔ si wòle ɖoɖo me tso Zebra 6.x me la, dzra `/var/lib/zebrad/state/v28` ɖo gbã: Zebra 7 tsɔe yi v29 database format yeye la me le eƒe ƒuƒoƒe gbãtɔ me, eye 6.x mate ŋu axlẽe o le ema megbe.

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Wɔ zebra user si mekpɔ dɔwɔwɔ ŋusẽ o ɖo

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Wɔ data directory dedie si dedie ɖo

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
sudo mkdir -p /var/lib/zebrad-rpc
sudo chown zebra:zebra /var/lib/zebrad-rpc
sudo chmod 750 /var/lib/zebrad-rpc
```

`/var/lib/zebrad-rpc` ƒoa RPC auth cookie ɖo. Service si le afima la ate ŋu aŋlɔ ɖe directory eve siawo ko me, eye systemd meɖea asi na wo be woa dze dɔ o ne wo dometɔ ɖeka mele o.

## Wɔ secure configuration (/etc/zebrad/zebrad.toml)

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

## Wɔ systemd service si wɔ ɖoɖo sesẽtɔ

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

Zebra wɔa cookie yeye le eƒe dɔgɔme ɖesiaɖe me, si `zebra` user ko ate ŋu axlẽe (mode 600), eye wòtsrɔ̃e ne enu. Xlẽe kple `sudo`, ale si le afima. Métsɔ `ExecStartPost=` line si trɔa cookie ƒe mode la o: ate ŋu awɔ dɔ hafi zebrad ŋlɔ cookie la, eye ne `ExecStartPost=` command la do ŋgɔ o la, service la trɔna dɔwɔwɔ.

## Gbe sia gbe ƒe dɔwɔwɔ - dɔwɔwɔ Ɖeka ƒe command

| Nu si wɔna              | Command                                      | Nuxlẽ |
|-------------------------|----------------------------------------------|-------|
| **Dze dɔ**               | `sudo systemctl start zebrad`                | Command ɖeka |
| **Tua dɔ**               | `sudo systemctl stop zebrad`                 | Command ɖeka |
| **Nɔnɔme**              | `sudo systemctl status zebrad`               | Efia ne wò le dɔ wɔm |
| **Log siwo le va eme**  | `journalctl -u zebrad -f -o short-precise`  | Wòlea `screen -r` teƒe |
| **Xɔ RPC cookie**       | `sudo cat /var/lib/zebrad-rpc/.cookie`           | Le dɔ wɔwɔ me ko |

**Aliases siwo wɔa nu bɔbɔe** (tsɔe kpe ɖe `~/.bashrc` alo `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad-rpc/.cookie'
```
