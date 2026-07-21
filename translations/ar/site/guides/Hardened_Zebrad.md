# عقدة Zebra الكاملة المُحصّنة

- تستخدم مستخدمًا مخصصًا غير ذي امتيازات + عزل `systemd` على مستوى النواة (نفس مستوى العزل الذي يوفّره Docker).  
- واجهة RPC مقتصرة على `localhost` فقط مع مصادقة آمنة عبر ملف تعريف الارتباط (الإعداد الافتراضي والمُوصى به).  


---

## المتطلبات المسبقة

- أي توزيعة مبنية على Ubuntu
- تثبيت سلسلة أدوات Rust (`rustup` + `cargo`)
- مساحة قرص حرة لا تقل عن 300 GB (قسم `/var`)


---

## الإعداد لمرة واحدة (شغّل كَمستخدمك العادي)

### 1. حدّث النظام وثبّت تبعيات البناء

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## حدّث Rust وثبّت أحدث إصدار من zebrad (v4.3.0+)

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## أنشئ مستخدم zebra مخصصًا غير ذي امتيازات

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## أنشئ دليل بيانات آمن

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
```

## أنشئ إعدادًا آمنًا (`/etc/zebrad/zebrad.toml`)

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

## أنشئ خدمة systemd مُحصّنة

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

## الاستخدام اليومي - سير عمل بأمر واحد

| الإجراء | الأمر | ملاحظات |
|-------------------------|----------------------------------------------|-------|
| **التشغيل**               | `sudo systemctl start zebrad`                | أمر واحد |
| **الإيقاف**                | `sudo systemctl stop zebrad`                 | أمر واحد |
| **الحالة**              | `sudo systemctl status zebrad`               | يوضّح ما إذا كانت تعمل |
| **السجلات المباشرة**           | `journalctl -u zebrad -f -o short-precise`  | بديل عن `screen -r` |
| **الحصول على ملف RPC cookie**      | `sudo cat /var/lib/zebrad/.cookie`           | فقط أثناء التشغيل |

**أسماء مستعارة للتسهيل** (أضِفها إلى `~/.bashrc` أو `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
