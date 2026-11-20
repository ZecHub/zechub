# Полный узел Zebra с усиленной защитой

- Использует отдельного непривилегированного пользователя и песочницу systemd на уровне ядра (такая же изоляция, как у Docker).  
- RPC доступен только через localhost, а для аутентификации используется защищённый cookie (настройка по умолчанию и рекомендуемый вариант).  


---

## Предварительные требования

- любой дистрибутив на базе Ubuntu
- установленный набор инструментов Rust (`rustup` + `cargo`)
- не менее 300 ГБ свободного места на диске (раздел `/var`)


---

## Первоначальная настройка (выполняется от имени обычного пользователя)

### 1. Обновите систему и установите зависимости для сборки

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Обновите Rust и установите последнюю версию zebrad (7.0.0 или новее)

NU7 активирован в Mainnet на блоке 3,543,405. Только [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) и более поздние версии следуют правилам цепочки после этой высоты, поэтому `zebrad` версии 6.x или старше застрянет на старых правилах. Для сборки требуется Rust версии 1.91 или новее, которую устанавливает `rustup update`. Если вы обновляете уже работающий узел с Zebra версии 6.x, сначала сделайте резервную копию `/var/lib/zebrad/state/v28`: при первом запуске Zebra версии 7 переводит её в новый формат базы данных v29, после чего версия 6.x уже не сможет её прочитать.

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Создайте отдельного непривилегированного пользователя zebra

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Создайте защищённый каталог данных

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
sudo mkdir -p /var/lib/zebrad-rpc
sudo chown zebra:zebra /var/lib/zebrad-rpc
sudo chmod 750 /var/lib/zebrad-rpc
```

`/var/lib/zebrad-rpc` содержит cookie для аутентификации RPC. Служба ниже может записывать данные только в эти два каталога, а systemd откажется запускать её, если хотя бы одного из них нет.

## Создайте защищённую конфигурацию (/etc/zebrad/zebrad.toml)

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

## Создайте усиленную службу systemd

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

Zebra создаёт новый cookie при каждом запуске. Его может читать только пользователь `zebra` (режим 600); при остановке службы cookie удаляется. Прочитайте его с помощью `sudo`, как показано ниже. Не добавляйте строку `ExecStartPost=`, изменяющую режим доступа к cookie: она может выполниться до того, как zebrad запишет cookie, а ошибка команды `ExecStartPost=` остановит службу.

## Ежедневное использование — команды для основных действий

| Действие                | Команда                                      | Примечания |
|-------------------------|----------------------------------------------|-------|
| **Запуск**              | `sudo systemctl start zebrad`                | Одна команда |
| **Остановка**           | `sudo systemctl stop zebrad`                 | Одна команда |
| **Состояние**           | `sudo systemctl status zebrad`               | Показывает, запущен ли узел |
| **Текущие журналы**      | `journalctl -u zebrad -f -o short-precise`  | Заменяет `screen -r` |
| **Получить RPC-cookie** | `sudo cat /var/lib/zebrad-rpc/.cookie`           | Только пока узел запущен |

**Удобные псевдонимы команд** (добавьте в `~/.bashrc` или `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad-rpc/.cookie'
```
