# Full Node Ewusiri Ike Zebra

- Ọ na-eji onye ọrụ raara nye nke enweghị ikike pụrụ iche yana sandboxing systemd n'ogo kernel [kernel] (otu ikewapụ ahụ dịka Docker).  
- RPC dị naanị na localhost ma jiri kuki [cookie] nchekwa maka nyocha (ndabara ma akwadoro).  


---

## Ihe ndị a chọrọ

- distro ọ bụla dabere na Ubuntu
- arụnyere toolchain Rust (`rustup` + `cargo`)
- Opekempe 300 GB nke oghere diski efu (partition `/var`)


---

## Nhazi Otu Oge (Gbaa dịka onye ọrụ nkịtị gị)

### 1. Melite sistemụ ma wụnye ihe ndabere maka iwulite

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

## Mepụta onye ọrụ zebra raara nye nke enweghị ikike pụrụ iche

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Mepụta ndekọ data nchekwa

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
```

## Mepụta nhazi nchekwa (/etc/zebrad/zebrad.toml)

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

## Mepụta ọrụ systemd ewusiri ike

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

## Ojiji Kwa Ụbọchị - Usoro Ọrụ Nwere Otu Iwu

| Omume                  | Iwu                                      | Nkọwa |
|-------------------------|----------------------------------------------|-------|
| **Bido**               | `sudo systemctl start zebrad`                | Otu iwu |
| **Kwụsị**                | `sudo systemctl stop zebrad`                 | Otu iwu |
| **Ọnọdụ**              | `sudo systemctl status zebrad`               | Na-egosi ma ọ na-arụ ọrụ |
| **Ndekọ ndụ**           | `journalctl -u zebrad -f -o short-precise`  | Na-anọchi `screen -r` |
| **Nweta kuki RPC**      | `sudo cat /var/lib/zebrad/.cookie`           | Naanị mgbe ọ na-arụ ọrụ |

**Aliases dị mfe** (tinye na `~/.bashrc` ma ọ bụ `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
```
