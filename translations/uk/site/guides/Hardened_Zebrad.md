# Захищений повний вузол Zebra

- Використовує окремого непривілейованого користувача та ізоляцію systemd на рівні ядра (такий самий рівень ізоляції, як у Docker).  
- RPC доступний лише з localhost і використовує автентифікацію через захищений cookie (типово та рекомендовано).  


---

## Передумови

- будь-який дистрибутив на основі Ubuntu
- встановлений набір інструментів Rust (`rustup` + `cargo`)
- щонайменше 300 ГБ вільного місця на диску (розділ `/var`)


---

## Одноразове налаштування (виконуйте під звичайним користувачем)

### 1. Оновіть систему та встановіть залежності для збирання

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Оновіть Rust і встановіть найновішу версію zebrad (7.0.0 або новішу)

NU7 активовано в Mainnet на блоці 3,543,405. Лише [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) і новіші версії продовжують роботу в ланцюзі після цієї висоти, тож вузол версії 6.x або старішої `zebrad` застрягне на старих правилах. Для збирання потрібен Rust версії 1.91 або новішої, який встановлює `rustup update`. Якщо ви оновлюєте наявний вузол з Zebra версії 6.x, спершу створіть резервну копію `/var/lib/zebrad/state/v28`: під час першого запуску Zebra версії 7 переводить його в новий формат бази даних v29, після чого версія 6.x вже не зможе його прочитати.

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
sudo mkdir -p /var/lib/zebrad-rpc
sudo chown zebra:zebra /var/lib/zebrad-rpc
sudo chmod 750 /var/lib/zebrad-rpc
```

`/var/lib/zebrad-rpc` зберігає cookie для автентифікації RPC. Служба нижче може записувати дані лише в ці два каталоги, а systemd відмовиться запускати її, якщо бракуватиме хоча б одного з них.

## Створіть захищену конфігурацію (/etc/zebrad/zebrad.toml)

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

## Створіть посилену службу systemd

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

Zebra створює новий cookie під час кожного запуску, доступний лише для читання користувачеві `zebra` (режим 600), і видаляє його під час зупинки. Прочитайте його за допомогою `sudo`, як показано нижче. Не додавайте рядок `ExecStartPost=`, який змінює режим доступу до cookie: він може виконатися до того, як zebrad запише cookie, а невдала команда `ExecStartPost=` зупинить службу.

## Щоденне використання — робочий процес однією командою

| Дія                    | Команда                                      | Примітки |
|------------------------|----------------------------------------------|----------|
| **Запустити**          | `sudo systemctl start zebrad`                | Одна команда |
| **Зупинити**           | `sudo systemctl stop zebrad`                 | Одна команда |
| **Статус**             | `sudo systemctl status zebrad`               | Показує, чи запущено |
| **Поточні журнали**    | `journalctl -u zebrad -f -o short-precise`  | Замінює `screen -r` |
| **Отримати RPC cookie**| `sudo cat /var/lib/zebrad-rpc/.cookie`           | Лише під час роботи |

**Зручні псевдоніми команд** (додайте до `~/.bashrc` або `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad-rpc/.cookie'
```
