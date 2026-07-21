# Gehärteter Zebra Full Node

- Verwendet einen eigenen unprivilegierten Benutzer + systemd-Sandboxing auf Kernel-Ebene (dieselbe Isolation wie Docker).  
- RPC ist nur auf localhost verfügbar mit sicherer Cookie-Authentifizierung (Standard & empfohlen).  


---

## Voraussetzungen

- jede Ubuntu-basierte Distribution
- installierte Rust-Toolchain (`rustup` + `cargo`)
- mindestens 300 GB freier Speicherplatz (Partition `/var`)


---

## Einmalige Einrichtung (als normaler Benutzer ausführen)

### 1. System aktualisieren & Build-Abhängigkeiten installieren

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Rust aktualisieren und das neueste zebrad installieren (v4.3.0+)

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Eigenen unprivilegierten Zebra-Benutzer erstellen

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Sicheres Datenverzeichnis erstellen

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
```

## Sichere Konfiguration erstellen (/etc/zebrad/zebrad.toml)

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

## Gehärteten systemd-Dienst erstellen

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

## Tägliche Nutzung - Workflow mit einem einzigen Befehl

| Aktion                  | Befehl                                       | Hinweise |
|-------------------------|----------------------------------------------|----------|
| **Starten**             | `sudo systemctl start zebrad`                | Ein Befehl |
| **Stoppen**             | `sudo systemctl stop zebrad`                 | Ein Befehl |
| **Status**              | `sudo systemctl status zebrad`               | Zeigt an, ob es läuft |
| **Live-Logs**           | `journalctl -u zebrad -f -o short-precise`  | Ersetzt `screen -r` |
| **RPC-Cookie abrufen**  | `sudo cat /var/lib/zebrad/.cookie`           | Nur während des Betriebs |

**Praktische Aliase** (zu `~/.bashrc` oder `~/.zshrc` hinzufügen):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
