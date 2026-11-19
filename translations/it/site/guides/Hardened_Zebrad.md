# Full node hardened Zebra

- Usa un utente dedicato senza privilegi e una sandbox di systemd a livello kernel (lo stesso isolamento di Docker).  
- RPC solo su localhost con autenticazione tramite cookie sicuro (impostazione predefinita e consigliata).  


---

## Prerequisiti

- Qualsiasi distribuzione basata su Ubuntu
- Toolchain Rust installata (`rustup` + `cargo`)
- Almeno 300 GB di spazio libero su disco (partizione `/var`)


---

## Configurazione iniziale (esegui come utente normale)

### 1. Aggiorna il sistema e installa le dipendenze di compilazione

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Aggiorna Rust e installa la versione più recente di zebrad (7.0.0 o successiva)

NU7 è stata attivata su Mainnet al blocco 3,543,405. Solo [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) e le versioni successive seguono la chain oltre quell'altezza, quindi un `zebrad` versione 6.x o precedente rimane bloccato sulle vecchie regole. Per compilarlo serve Rust 1.91 o successivo, che `rustup update` installa. Se stai aggiornando un nodo esistente da Zebra 6.x, fai prima un backup di `/var/lib/zebrad/state/v28`: Zebra 7 lo converte nel nuovo formato di database v29 al primo avvio e, in seguito, la versione 6.x non può più leggerlo.

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
sudo mkdir -p /var/lib/zebrad-rpc
sudo chown zebra:zebra /var/lib/zebrad-rpc
sudo chmod 750 /var/lib/zebrad-rpc
```

`/var/lib/zebrad-rpc` contiene il cookie di autenticazione RPC. Il servizio qui sotto può scrivere solo in queste due directory e systemd si rifiuta di avviarlo se ne manca una.

## Crea una configurazione sicura (/etc/zebrad/zebrad.toml)

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

## Crea un servizio systemd con protezioni avanzate

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

Zebra scrive un nuovo cookie a ogni avvio, leggibile solo dall'utente `zebra` (modalità 600), e lo elimina all'arresto. Leggilo con `sudo`, come mostrato sotto. Non aggiungere una riga `ExecStartPost=` che modifica i permessi del cookie: potrebbe essere eseguita prima che zebrad abbia scritto il cookie e, se il comando `ExecStartPost=` fallisce, il servizio si arresta.

## Uso quotidiano: flusso di lavoro con un solo comando

| Azione                  | Comando                                      | Note |
|-------------------------|----------------------------------------------|-------|
| **Avvia**               | `sudo systemctl start zebrad`                | Un comando |
| **Arresta**                | `sudo systemctl stop zebrad`                 | Un comando |
| **Stato**              | `sudo systemctl status zebrad`               | Indica se è in esecuzione |
| **Log in tempo reale**           | `journalctl -u zebrad -f -o short-precise`  | Sostituisce `screen -r` |
| **Ottieni il cookie RPC**      | `sudo cat /var/lib/zebrad-rpc/.cookie`           | Solo mentre è in esecuzione |

**Alias pratici** (aggiungili a `~/.bashrc` o `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad-rpc/.cookie'
```
