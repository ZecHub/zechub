# فول‌نود Zebra مقاوم‌سازی‌شده

- از یک کاربر اختصاصی بدون دسترسی ویژه به همراه sandboxing در سطح کرنل با systemd استفاده می‌کند (همان ایزوله‌سازی Docker).  
- RPC فقط روی localhost در دسترس است و از احراز هویت امن مبتنی بر cookie استفاده می‌کند (پیش‌فرض و توصیه‌شده).  


---

## پیش‌نیازها

- هر توزیع مبتنی بر Ubuntu
- مجموعه‌ابزار Rust نصب‌شده (`rustup` + `cargo`)
- دست‌کم 300 GB فضای خالی دیسک (پارتیشن `/var`)


---

## راه‌اندازی یک‌باره (با کاربر عادی خود اجرا کنید)

### 1. به‌روزرسانی سیستم و نصب وابستگی‌های build

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## به‌روزرسانی Rust و نصب آخرین نسخهٔ zebrad (7.0.0 یا جدیدتر)

NU7 در Mainnet در بلوک 3,543,405 فعال شد. فقط [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) و نسخه‌های بعدی، زنجیره را پس از آن ارتفاع دنبال می‌کنند، بنابراین `zebrad` نسخهٔ 6.x یا قدیمی‌تر روی قوانین قدیمی گیر می‌کند. Build کردن آن به Rust نسخهٔ 1.91 یا جدیدتر نیاز دارد که `rustup update` آن را نصب می‌کند. اگر شما یک نود موجود را از Zebra 6.x ارتقا می‌دهید، ابتدا از `/var/lib/zebrad/state/v28` نسخهٔ پشتیبان بگیرید: Zebra 7 در نخستین اجرا آن را به قالب جدید پایگاه‌دادهٔ v29 منتقل می‌کند و نسخهٔ 6.x پس از آن نمی‌تواند آن را بخواند.

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## ایجاد کاربر اختصاصی zebra بدون دسترسی ویژه

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## ایجاد دایرکتوری داده امن

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
sudo mkdir -p /var/lib/zebrad-rpc
sudo chown zebra:zebra /var/lib/zebrad-rpc
sudo chmod 750 /var/lib/zebrad-rpc
```

`/var/lib/zebrad-rpc` cookie احراز هویت RPC را نگه می‌دارد. سرویس زیر فقط می‌تواند در این دو دایرکتوری بنویسد و اگر هر یک از آن‌ها وجود نداشته باشد، systemd از اجرای آن خودداری می‌کند.

## ایجاد پیکربندی امن (/etc/zebrad/zebrad.toml)

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

## ایجاد سرویس systemd مقاوم‌سازی‌شده

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

Zebra هر بار که اجرا می‌شود یک cookie جدید می‌نویسد که فقط برای کاربر `zebra` قابل خواندن است (mode 600) و هنگام توقف آن را حذف می‌کند. همان‌طور که در ادامه آمده است، آن را با `sudo` بخوانید. خط `ExecStartPost=`ای که mode مربوط به cookie را تغییر می‌دهد اضافه نکنید: ممکن است پیش از آنکه zebrad cookie را نوشته باشد اجرا شود و یک فرمان `ExecStartPost=` ناموفق، سرویس را متوقف می‌کند.

## استفادهٔ روزانه - گردش‌کار تک‌فرمانی

| عملیات                  | فرمان                                      | توضیحات |
|-------------------------|----------------------------------------------|-------|
| **شروع**               | `sudo systemctl start zebrad`                | یک فرمان |
| **توقف**                | `sudo systemctl stop zebrad`                 | یک فرمان |
| **وضعیت**              | `sudo systemctl status zebrad`               | نشان می‌دهد که آیا در حال اجراست |
| **لاگ‌های زنده**           | `journalctl -u zebrad -f -o short-precise`  | جایگزین `screen -r` می‌شود |
| **دریافت cookie مربوط به RPC**      | `sudo cat /var/lib/zebrad-rpc/.cookie`           | فقط هنگام اجرا |

**aliasهای کاربردی** (به `~/.bashrc` یا `~/.zshrc` اضافه کنید):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad-rpc/.cookie'
```
