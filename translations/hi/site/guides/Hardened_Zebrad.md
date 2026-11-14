# हार्डन्ड Zebra फुल नोड (Full Node)

- एक समर्पित बिना-विशेषाधिकार वाला यूज़र (unprivileged user) + कर्नेल-स्तर की systemd सैंडबॉक्सिंग (sandboxing) का उपयोग करता है (Docker जैसा ही आइसोलेशन)।  
- RPC केवल localhost पर उपलब्ध है और सुरक्षित कुकी ऑथेंटिकेशन (cookie auth) के साथ चलता है (डिफ़ॉल्ट और अनुशंसित)।  


---

## पूर्वापेक्षाएँ (Prerequisites)

- कोई भी Ubuntu-आधारित डिस्ट्रो
- Rust टूलचेन (toolchain) इंस्टॉल हो (`rustup` + `cargo`)
- कम से कम 300 GB खाली डिस्क स्पेस (`/var` पार्टिशन)


---

## एक-बार का सेटअप (अपने सामान्य यूज़र के रूप में चलाएँ)

### 1. सिस्टम अपडेट और बिल्ड डिपेंडेंसी (build dependencies) का इंस्टॉलेशन

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Rust का अपडेट और नवीनतम zebrad (v4.3.0+) का इंस्टॉलेशन

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## समर्पित बिना-विशेषाधिकार वाले zebra यूज़र का निर्माण

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## सुरक्षित डेटा डायरेक्टरी का निर्माण

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
```

## सुरक्षित कॉन्फ़िगरेशन का निर्माण (/etc/zebrad/zebrad.toml)

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

## हार्डन्ड systemd सर्विस का निर्माण

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

## दैनिक उपयोग - एकल-कमांड वर्कफ़्लो

| क्रिया                  | कमांड                                      | टिप्पणियाँ |
|-------------------------|----------------------------------------------|-------|
| **शुरू करें**               | `sudo systemctl start zebrad`                | एक कमांड |
| **रोकें**                | `sudo systemctl stop zebrad`                 | एक कमांड |
| **स्थिति**              | `sudo systemctl status zebrad`               | दिखाता है कि यह चल रहा है या नहीं |
| **लाइव लॉग**           | `journalctl -u zebrad -f -o short-precise`  | `screen -r` की जगह लेता है |
| **RPC कुकी प्राप्त करें**      | `sudo cat /var/lib/zebrad/.cookie`           | केवल चलते समय |

**सुविधाजनक एलियास (aliases)** (`~/.bashrc` या `~/.zshrc` में जोड़ें):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
```
