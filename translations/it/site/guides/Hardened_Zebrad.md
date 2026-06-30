# Nodo completo Zebra rafforzato

- Usa un utente dedicato senza privilegi + sandboxing systemd a livello di kernel (lo stesso isolamento di Docker).  
- L'RPC è solo localhost con autenticazione sicura tramite cookie (predefinita e raccomandata).  


---

## Prerequisiti

- qualsiasi distro basata su Ubuntu
- toolchain Rust installata (`rustup` + `cargo`)
- Almeno 300 GB di spazio su disco libero (partizione `/var`)


---

## Configurazione una tantum (eseguita come utente normale)

### 1. Aggiorna il sistema e installa le dipendenze di build

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Aggiorna Rust e installa l'ultimo zebrad (v4.3.0+)

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Crea un utente zebra dedicato senza privilegi

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Crea una directory dati sicura

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
```

## Crea una configurazione sicura (/etc/zebrad/zebrad.toml)

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

## Crea un servizio systemd rafforzato

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

## Uso quotidiano - Flusso di lavoro con un solo comando

| Azione                  | Comando                                      | Note |
|-------------------------|----------------------------------------------|-------|
| **Avvia**               | `sudo systemctl start zebrad`                | Un comando |
| **Ferma**               | `sudo systemctl stop zebrad`                 | Un comando |
| **Stato**               | `sudo systemctl status zebrad`               | Mostra se è in esecuzione |
| **Log in tempo reale**  | `journalctl -u zebrad -f -o short-precise`  | Sostituisce `screen -r` |
| **Ottieni il cookie RPC** | `sudo cat /var/lib/zebrad/.cookie`         | Solo mentre è in esecuzione |

**Alias di comodità** (aggiungi a `~/.bashrc` o `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
```
