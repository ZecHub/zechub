# Mdudu wa Zebra Aliyefanywa Mgumu

- Matumizi ya kujitolea user unprivileged + kernel-level systemd sandboxing (moja kutengwa kama Docker). 
- RPC ni localhost-tu na salama kuki auth (default & ilipendekeza). 


---

## Mahitaji ya awali

- yoyote Ubuntu-msingi distro
- Rust toolchain imewekwa (`rustup` + `cargo`)
- Angalau 300 GB nafasi ya bure disk (`/var` kizigeu)


---

## Usanidi wa Mara Moja (Kimbia kama mtumiaji wako wa kawaida)

### 1. update mfumo & kufunga kujenga dependencies

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Sasisha Rust na kufunga zebrad karibuni (v4.3.0+)

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Unda mtumiaji wa zebra aliyejitolea asiye na upendeleo

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Kujenga salama data directory

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
```

## Kujenga salama Configuration (/etc/zebrad/zebrat.toml)

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

## Kujenga huduma systemd ngumu

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

## Daily Matumizi - Single-Amri Workflow

Kitendo. Amri. Vidokezo.
|-------------------------|----------------------------------------------|-------|
Kuanza. `sudo systemctl start zebrad` Amri moja.
** Acha **. `sudo systemctl stop zebrad` Amri moja.
Hali ya sasa `sudo systemctl status zebrad` Inaonyesha ikiwa inafanya kazi.
** Kuishi kumbukumbu ** `journalctl -u zebrad -f -o short-precise` Inachukua nafasi ya `screen -r` |
**Kupata cookie RPC** `sudo cat /var/lib/zebrad/.cookie` Tu wakati wa kukimbia.

** Aliases urahisi ** (kuongeza kwa `~/.bashrc` or `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
```
