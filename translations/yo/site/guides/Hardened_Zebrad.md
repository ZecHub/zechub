# Àwọn Ẹranko Zebra Tí Wọ́n Ti Gbé Ga

- Ó ńlo olùṣàmúlò tí kò ní ẹ̀tọ́ àkànṣe + systemd sandboxing ní ìpele kernel (ìkọ̀kan kan náà bíi Docker). 
- RPC jẹ localhost-only with secure cookie auth (default & recommended). 


---

## Àwọn ohun tó pọn dandan

- eyikeyi distro ti o da lori Ubuntu
- Rust irinṣẹ irinṣẹ ti fi sori ẹrọ (`rustup` + `cargo`)
- Ó kéré tán, 300 GB àyè disk tó wà lárọ̀ọ́wọ́tó (`/var` àlàfo)


---

## Ìsopọ̀ ìgbàkan (Ṣiṣẹ́ gẹ́gẹ́ bí oníṣe rẹ)

### 1. Àtúnṣe ètò & fi sori ẹrọ kọ dependencies

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

## Ṣẹ̀dá olùṣàmúlò Zebra tí kò ní àǹfààní

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Ṣẹda itọsọna data to ni aabo

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
```

## Ṣẹda iṣeto to ni aabo (/etc/zebrad / zebrad.toml)

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

## Ṣẹda iṣẹ systemd ti o nira

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

## Ìlò Ojoojúmọ́ - Ọ̀nà Ìṣiṣẹ́ Ìpinnu-ìkan

Ìṣe. Àṣẹ. Àkọlé.
|-------------------------|----------------------------------------------|-------|
Ṣíṣe ìfilọ̀. `sudo systemctl start zebrad` Àṣẹ kan.
Ẹ dúró. `sudo systemctl stop zebrad` Àṣẹ kan.
Àsìá ilẹ̀ `sudo systemctl status zebrad` Ó ń fi hàn bí ó bá ń ṣiṣẹ́
Àwọn Àkọsílẹ̀ Ìgbésí Ayé `journalctl -u zebrad -f -o short-precise` Ó rọ́pò `screen -r` |
"Ẹ rí i pé ẹ jẹ́ kí RPC cookie" `sudo cat /var/lib/zebrad/.cookie` Kìkì nígbà tí mo bá ń sáré ni.

** Àwọn orúkọ àdàkọ tí ó rọrùn láti lò** (fi kún `~/.bashrc` or `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
```
