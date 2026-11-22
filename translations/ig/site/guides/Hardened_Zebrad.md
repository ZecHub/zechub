# Hardened Zebra Full Node

- Ọ na-eji onye ọrụ pụrụ iche na-enweghị ikike yana nchekwa systemd nke ọkwa kernel (otu nkewa na Docker).  
- RPC na-anabata naanị localhost, na-eji nkwenye cookie echedoro (nke ndabara ma bụrụkwa nke a tụrụ aro).  


---

## Ihe ndị dị mkpa tupu amalite

- ụdị Ubuntu ọ bụla
- etinyela ngwa ọrụ Rust (`rustup` + `cargo`)
- Opekata mpe 300 GB ohere diski efu (nkebi `/var`)


---

## Nhazi otu ugboro (Gbaa ya dịka onye ọrụ gị na-emebu)

### 1. Melite sistemụ ma wụnye ihe ndabere maka iwulite ya

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Melite Rust ma wụnye zebrad kachasị ọhụrụ (7.0.0 ma ọ bụ karịa)

E mere ka NU7 rụọ ọrụ na Mainnet na block 3,543,405. Naanị [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) na ndị mechara ya na-agbaso chain mgbe ogo ahụ gafere; ya mere, `zebrad` 6.x ma ọ bụ nke ochie ga-arapara n'iwu ochie. Iwulite ya chọrọ Rust 1.91 ma ọ bụ nke ọhụrụ, nke `rustup update` na-etinye. Ọ bụrụ na ị na-emelite node dị adị site na Zebra 6.x, buru ụzọ kwadoo `/var/lib/zebrad/state/v28`: Zebra 7 na-atụgharị ya gaa n'ụdị nchekwa data v29 ọhụrụ mgbe mbụ ọ malitere, ma 6.x agaghị enwe ike ịgụ ya ọzọ.

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Mepụta onye ọrụ zebra pụrụ iche na-enweghị ikike

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Mepụta ndekọ data echedoro

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
sudo mkdir -p /var/lib/zebrad-rpc
sudo chown zebra:zebra /var/lib/zebrad-rpc
sudo chmod 750 /var/lib/zebrad-rpc
```

`/var/lib/zebrad-rpc` na-echekwa cookie nkwenye RPC. Ọrụ dị n'okpuru nwere ike ide naanị na ndekọ abụọ a, systemd agaghị ekwe ka ọ malite ma ọ bụrụ na nke ọ bụla adịghị.

## Mepụta nhazi echedoro (/etc/zebrad/zebrad.toml)

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

## Mepụta ọrụ systemd echedoro nke ọma

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

Zebra na-ede cookie ọhụrụ oge ọ bụla ọ malitere; naanị onye ọrụ `zebra` nwere ike ịgụ ya (ọnọdụ 600), ọ na-ehichapụkwa ya mgbe ọ kwụsịrị. Jiri `sudo` gụọ ya, dịka egosiri n'okpuru. Etinyela ahịrị `ExecStartPost=` nke na-agbanwe ọnọdụ cookie: ọ nwere ike ịgba ọsọ tupu zebrad edee cookie ahụ, iwu `ExecStartPost=` dara ada ga-akwụsịkwa ọrụ ahụ.

## Ojiji kwa ụbọchị - Usoro iwu otu

| Ihe a ga-eme             | Iwu                                          | Ihe ọ pụtara |
|--------------------------|----------------------------------------------|-------|
| **Malite**               | `sudo systemctl start zebrad`                | Otu iwu |
| **Kwụsị**                | `sudo systemctl stop zebrad`                 | Otu iwu |
| **Ọnọdụ**                | `sudo systemctl status zebrad`               | Na-egosi ma ọ na-arụ ọrụ |
| **Ndekọ dị ndụ**         | `journalctl -u zebrad -f -o short-precise`  | Na-anọchi `screen -r` |
| **Nweta cookie RPC**     | `sudo cat /var/lib/zebrad-rpc/.cookie`           | Naanị mgbe ọ na-arụ ọrụ |

**Aha iwu dị mfe** (tinye na `~/.bashrc` ma ọ bụ `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad-rpc/.cookie'
```
