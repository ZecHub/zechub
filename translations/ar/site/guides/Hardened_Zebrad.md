# عقدة كاملة مقوّاة من Zebra

- تستخدم مستخدمًا مخصصًا غير ذي امتيازات، مع عزل systemd على مستوى النواة (العزل نفسه المستخدم في Docker).  
- يقتصر RPC على الاتصالات المحلية، مع مصادقة آمنة عبر ملف تعريف الارتباط (الإعداد الافتراضي والموصى به).  


---

## المتطلبات المسبقة

- أي توزيعة مبنية على Ubuntu
- تثبيت سلسلة أدوات Rust (`rustup` + `cargo`)
- توفر مساحة قرص خالية لا تقل عن 300 GB (القسم `/var`)


---

## الإعداد لمرة واحدة (نفّذه بصفتك المستخدم العادي)

### 1. تحديث النظام وتثبيت تبعيات البناء

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## تحديث Rust وتثبيت أحدث zebrad (الإصدار 7.0.0 أو أحدث)

NU7 فُعِّل على Mainnet عند الكتلة 3,543,405. وحدها [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) والإصدارات الأحدث تتبع السلسلة بعد ذلك الارتفاع، لذا فإن `zebrad` بالإصدار 6.x أو أقدم يظل عالقًا على القواعد القديمة. يتطلب بناؤه Rust بالإصدار 1.91 أو أحدث، وهو ما يثبّته `rustup update`. إذا كنت تحدّث عقدة موجودة من Zebra بالإصدار 6.x، فأنشئ نسخة احتياطية من `/var/lib/zebrad/state/v28` أولًا: ينقلها Zebra 7 إلى تنسيق قاعدة البيانات الجديد v29 عند بدء التشغيل لأول مرة، ولن يتمكن الإصدار 6.x من قراءتها بعد ذلك.

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## إنشاء مستخدم zebra مخصص غير ذي امتيازات

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## إنشاء دليل بيانات آمن

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
sudo mkdir -p /var/lib/zebrad-rpc
sudo chown zebra:zebra /var/lib/zebrad-rpc
sudo chmod 750 /var/lib/zebrad-rpc
```

يحتوي `/var/lib/zebrad-rpc` على ملف تعريف ارتباط مصادقة RPC. لا يمكن للخدمة أدناه الكتابة إلا إلى هذين الدليلين، ويرفض systemd تشغيلها إذا كان أي منهما مفقودًا.

## إنشاء إعداد آمن (/etc/zebrad/zebrad.toml)

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

## إنشاء خدمة systemd مقوّاة

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

ينشئ Zebra ملف تعريف ارتباط جديدًا عند كل تشغيل، لا يمكن قراءته إلا بواسطة المستخدم `zebra` (الوضع 600)، ويحذفه عند التوقف. اقرأه باستخدام `sudo`، كما هو موضح أدناه. لا تضف سطر `ExecStartPost=` يغيّر وضع ملف تعريف الارتباط: فقد يُنفّذ قبل أن يكتب zebrad ملف تعريف الارتباط، ويؤدي فشل الأمر `ExecStartPost=` إلى إيقاف الخدمة.

## الاستخدام اليومي - سير عمل بأمر واحد

| الإجراء                  | الأمر                                      | ملاحظات |
|-------------------------|----------------------------------------------|-------|
| **التشغيل**               | `sudo systemctl start zebrad`                | أمر واحد |
| **الإيقاف**               | `sudo systemctl stop zebrad`                 | أمر واحد |
| **الحالة**              | `sudo systemctl status zebrad`               | يوضح ما إذا كانت تعمل |
| **السجلات المباشرة**           | `journalctl -u zebrad -f -o short-precise`  | يستبدل `screen -r` |
| **الحصول على ملف تعريف ارتباط RPC**      | `sudo cat /var/lib/zebrad-rpc/.cookie`           | أثناء التشغيل فقط |

**اختصارات للتسهيل** (أضفها إلى `~/.bashrc` أو `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad-rpc/.cookie'
```
