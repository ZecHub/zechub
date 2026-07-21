# सुदृढ़ीकृत Zebra Full Node

- समर्पित unprivileged user + kernel-level systemd sandboxing का उपयोग करता है (Docker जैसी ही isolation)।  
- RPC केवल localhost पर उपलब्ध है और secure cookie auth का उपयोग करता है (डिफ़ॉल्ट और अनुशंसित)।  


---

## आवश्यकताएँ

- कोई भी Ubuntu-आधारित distro
- Rust toolchain स्थापित हो (`rustup` + `cargo`)
- कम से कम 300 GB खाली disk space (`/var` partition)


---

## एक-बार की सेटअप (अपने सामान्य user के रूप में चलाएँ)

### 1. सिस्टम अपडेट करें और build dependencies इंस्टॉल करें

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Rust अपडेट करें और नवीनतम zebrad इंस्टॉल करें (v4.3.0+)

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## समर्पित unprivileged zebra user बनाएँ

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## सुरक्षित data directory बनाएँ

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
```

## सुरक्षित configuration बनाएँ (/etc/zebrad/zebrad.toml)

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

## सुदृढ़ीकृत systemd service बनाएँ

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

## दैनिक उपयोग - Single-Command Workflow

| Action                  | Command                                      | Notes |
|-------------------------|----------------------------------------------|-------|
| **शुरू करें**           | `sudo systemctl start zebrad`                | एक कमांड |
| **बंद करें**            | `sudo systemctl stop zebrad`                 | एक कमांड |
| **स्थिति**              | `sudo systemctl status zebrad`               | दिखाता है कि चल रहा है या नहीं |
| **लाइव logs**          | `journalctl -u zebrad -f -o short-precise`  | `screen -r` का विकल्प |
| **RPC cookie प्राप्त करें** | `sudo cat /var/lib/zebrad/.cookie`           | केवल चलते समय |

**सुविधाजनक aliases** (`~/.bashrc` या `~/.zshrc` में जोड़ें):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
```
