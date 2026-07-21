# Захищений повний вузол Zebra

- Використовує окремого непривілейованого користувача + sandboxing systemd на рівні ядра (така ж ізоляція, як у Docker).  
- RPC доступний лише через localhost із безпечною автентифікацією cookie (типово та рекомендовано).  


---

## Передумови

- будь-який дистрибутив на базі Ubuntu
- встановлений набір інструментів Rust (`rustup` + `cargo`)
- щонайменше 300 ГБ вільного місця на диску (розділ `/var`)


---

## Одноразове налаштування (запускайте як звичайний користувач)

### 1. Оновіть систему та встановіть залежності для збірки

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Оновіть Rust і встановіть останній zebrad (v4.3.0+)

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Створіть окремого непривілейованого користувача zebra

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Створіть захищений каталог даних

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
```

## Створіть захищену конфігурацію (/etc/zebrad/zebrad.toml)

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

## Створіть захищену службу systemd

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

## Щоденне використання — робочий процес з однією командою

| Дія                     | Команда                                      | Примітки |
|-------------------------|----------------------------------------------|-------|
| **Запуск**              | `sudo systemctl start zebrad`                | Одна команда |
| **Зупинка**             | `sudo systemctl stop zebrad`                 | Одна команда |
| **Стан**                | `sudo systemctl status zebrad`               | Показує, чи запущено |
| **Живі логи**           | `journalctl -u zebrad -f -o short-precise`  | Замінює `screen -r` |
| **Отримати RPC cookie** | `sudo cat /var/lib/zebrad/.cookie`           | Лише під час роботи |

**Зручні псевдоніми** (додайте до `~/.bashrc` або `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
```
