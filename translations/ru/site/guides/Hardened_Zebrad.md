# Защищённый полный узел Zebra

- Использует выделенного непривилегированного пользователя + изоляцию systemd на уровне ядра (такая же изоляция, как у Docker).  
- RPC доступен только через localhost с безопасной cookie-аутентификацией (по умолчанию и рекомендуется).  


---

## Предварительные требования

- любой дистрибутив на базе Ubuntu
- установленный инструментарий Rust (`rustup` + `cargo`)
- не менее 300 ГБ свободного места на диске (раздел `/var`)


---

## Однократная настройка (выполняется от имени вашего обычного пользователя)

### 1. Обновите систему и установите зависимости для сборки

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Обновите Rust и установите последнюю версию zebrad (v4.3.0+)

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Создайте выделенного непривилегированного пользователя zebra

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Создайте защищённый каталог данных

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
```

## Создайте защищённую конфигурацию (/etc/zebrad/zebrad.toml)

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

## Создайте защищённый сервис systemd

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

## Ежедневное использование — рабочий процесс с одной командой

| Действие | Команда | Примечания |
|-------------------------|----------------------------------------------|-------|
| **Запуск** | `sudo systemctl start zebrad` | Одна команда |
| **Остановка** | `sudo systemctl stop zebrad` | Одна команда |
| **Статус** | `sudo systemctl status zebrad` | Показывает, запущен ли сервис |
| **Логи в реальном времени** | `journalctl -u zebrad -f -o short-precise` | Заменяет `screen -r` |
| **Получить RPC cookie** | `sudo cat /var/lib/zebrad/.cookie` | Только во время работы |

**Удобные алиасы** (добавьте в `~/.bashrc` или `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
```
