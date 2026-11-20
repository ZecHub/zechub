# Gehärteter Zebra Full Node

- Verwendet einen dedizierten, unprivilegierten Benutzer und Sandboxing auf Kernel-Ebene mit systemd (dieselbe Isolation wie bei Docker).  
- RPC ist auf localhost beschränkt und verwendet eine sichere Cookie-Authentifizierung (Standard und empfohlen).  


---

## Voraussetzungen

- eine Ubuntu-basierte Distribution
- Rust-Toolchain installiert (`rustup` + `cargo`)
- Mindestens 300 GB freier Speicherplatz (`/var`-Partition)


---

## Einmalige Einrichtung (als normaler Benutzer ausführen)

### 1. System aktualisieren und Build-Abhängigkeiten installieren

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Rust aktualisieren und die neueste Version von zebrad installieren (7.0.0 oder neuer)

NU7 wurde im Mainnet bei Block 3,543,405 aktiviert. Nur [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) und neuere Versionen folgen der Chain nach dieser Blockhöhe; ein `zebrad` der Version 6.x oder älter bleibt daher bei den alten Regeln hängen. Für den Build ist Rust 1.91 oder neuer erforderlich, das `rustup update` installiert. Wenn du einen vorhandenen Knoten von Zebra 6.x aktualisierst, sichere zuerst `/var/lib/zebrad/state/v28`: Zebra 7 stellt es beim ersten Start auf das neue Datenbankformat v29 um, das 6.x anschließend nicht mehr lesen kann.

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Dedizierten, unprivilegierten Zebra-Benutzer erstellen

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Sicheres Datenverzeichnis erstellen

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
sudo mkdir -p /var/lib/zebrad-rpc
sudo chown zebra:zebra /var/lib/zebrad-rpc
sudo chmod 750 /var/lib/zebrad-rpc
```

`/var/lib/zebrad-rpc` enthält das RPC-Authentifizierungscookie. Der unten beschriebene Dienst kann nur in diese beiden Verzeichnisse schreiben, und systemd verweigert den Start, wenn eines davon fehlt.

## Sichere Konfiguration erstellen (/etc/zebrad/zebrad.toml)

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

Zebra schreibt bei jedem Start ein neues Cookie, das nur für den Benutzer `zebra` lesbar ist (Modus 600), und löscht es beim Beenden. Lies es wie unten gezeigt mit `sudo` aus. Füge keine `ExecStartPost=`-Zeile hinzu, die den Modus des Cookies ändert: Sie kann ausgeführt werden, bevor zebrad das Cookie geschrieben hat, und ein fehlgeschlagener `ExecStartPost=`-Befehl beendet den Dienst.

## Tägliche Nutzung – Ein-Befehl-Ablauf

| Aktion                  | Befehl                                      | Hinweise |
|-------------------------|----------------------------------------------|-------|
| **Starten**               | `sudo systemctl start zebrad`                | Ein Befehl |
| **Stoppen**                | `sudo systemctl stop zebrad`                 | Ein Befehl |
| **Status**              | `sudo systemctl status zebrad`               | Zeigt an, ob der Dienst läuft |
| **Live-Protokolle**           | `journalctl -u zebrad -f -o short-precise`  | Ersetzt `screen -r` |
| **RPC-Cookie abrufen**      | `sudo cat /var/lib/zebrad-rpc/.cookie`           | Nur während des Betriebs |

**Praktische Aliase** (füge sie zu `~/.bashrc` oder `~/.zshrc` hinzu):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad-rpc/.cookie'
```
