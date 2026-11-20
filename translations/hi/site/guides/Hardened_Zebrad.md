# कठोर सुरक्षा वाला Zebra फुल नोड

- एक समर्पित अप्रिविलेज्ड उपयोगकर्ता और कर्नेल-स्तर की systemd सैंडबॉक्सिंग का उपयोग करता है (Docker जैसा ही पृथक्करण)।  
- RPC केवल लोकलहोस्ट पर उपलब्ध है और सुरक्षित कुकी प्रमाणीकरण का उपयोग करता है (डिफ़ॉल्ट और अनुशंसित)।  


---

## पूर्वापेक्षाएँ

- Ubuntu-आधारित कोई भी डिस्ट्रो
- Rust टूलचेन इंस्टॉल हो (`rustup` + `cargo`)
- कम से कम 300 GB खाली डिस्क स्थान (`/var` पार्टीशन)


---

## एक बार का सेटअप (अपने सामान्य उपयोगकर्ता के रूप में चलाएँ)

### 1. सिस्टम अपडेट करें और बिल्ड निर्भरताएँ इंस्टॉल करें

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Rust अपडेट करें और नवीनतम zebrad (7.0.0 या नया) इंस्टॉल करें

NU7 Mainnet पर ब्लॉक 3,543,405 पर सक्रिय हुआ। उसके बाद चेन का अनुसरण केवल [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) और उसके बाद के संस्करण करते हैं, इसलिए 6.x या उससे पुराना `zebrad` पुराने नियमों पर अटक जाता है। इसे बिल्ड करने के लिए Rust 1.91 या नया संस्करण चाहिए, जिसे `rustup update` इंस्टॉल करता है। यदि आप किसी मौजूदा नोड को Zebra 6.x से अपग्रेड कर रहे हैं, तो पहले `/var/lib/zebrad/state/v28` का बैकअप लें: पहली बार शुरू होने पर Zebra 7 इसे नए v29 डेटाबेस फ़ॉर्मैट में बदल देता है, और उसके बाद 6.x इसे पढ़ नहीं सकता।

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## समर्पित अप्रिविलेज्ड ज़ेब्रा उपयोगकर्ता बनाएँ

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## सुरक्षित डेटा डायरेक्टरी बनाएँ

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
sudo mkdir -p /var/lib/zebrad-rpc
sudo chown zebra:zebra /var/lib/zebrad-rpc
sudo chmod 750 /var/lib/zebrad-rpc
```

`/var/lib/zebrad-rpc` में RPC प्रमाणीकरण कुकी रखी जाती है। नीचे दी गई सेवा केवल इन दो डायरेक्टरियों में लिख सकती है, और यदि इनमें से कोई भी मौजूद न हो तो systemd इसे शुरू करने से मना कर देता है।

## सुरक्षित कॉन्फ़िगरेशन बनाएँ (/etc/zebrad/zebrad.toml)

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

## कठोर सुरक्षा वाली systemd सेवा बनाएँ

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

Zebra हर बार शुरू होने पर एक नई कुकी लिखता है, जिसे केवल `zebra` उपयोगकर्ता पढ़ सकता है (मोड 600), और सेवा बंद होने पर इसे मिटा देता है। इसे नीचे दिए अनुसार `sudo` से पढ़ें। ऐसी `ExecStartPost=` पंक्ति न जोड़ें जो कुकी का मोड बदलती हो: यह zebrad के कुकी लिखने से पहले चल सकती है, और `ExecStartPost=` कमांड विफल होने पर सेवा बंद हो जाती है।

## रोज़मर्रा का उपयोग - एक-कमांड कार्यप्रवाह

| कार्रवाई                  | कमांड                                      | नोट्स |
|-------------------------|----------------------------------------------|-------|
| **शुरू करें**               | `sudo systemctl start zebrad`                | एक कमांड |
| **बंद करें**                | `sudo systemctl stop zebrad`                 | एक कमांड |
| **स्थिति**              | `sudo systemctl status zebrad`               | दिखाता है कि चल रहा है या नहीं |
| **लाइव लॉग**           | `journalctl -u zebrad -f -o short-precise`  | `screen -r` की जगह लेता है |
| **RPC कुकी प्राप्त करें**      | `sudo cat /var/lib/zebrad-rpc/.cookie`           | केवल चलते समय |

**सुविधाजनक उपनाम** (`~/.bashrc` या `~/.zshrc` में जोड़ें):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad-rpc/.cookie'
```
