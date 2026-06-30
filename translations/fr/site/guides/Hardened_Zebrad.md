# Nœud complet Zebra renforcé

- Utilise un utilisateur dédié non privilégié + le sandboxing systemd au niveau du noyau (même isolation que Docker).  
- Le RPC est limité à localhost avec une authentification par cookie sécurisée (par défaut et recommandée).  


---

## Prérequis

- toute distribution basée sur Ubuntu
- chaîne d’outils Rust installée (`rustup` + `cargo`)
- Au moins 300 Go d’espace disque libre (partition `/var`)


---

## Configuration initiale (à exécuter avec votre utilisateur normal)

### 1. Mettre à jour le système et installer les dépendances de compilation

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Mettre à jour Rust et installer le dernier zebrad (v4.3.0+)

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Créer un utilisateur zebra dédié non privilégié

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Créer un répertoire de données sécurisé

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
```

## Créer une configuration sécurisée (/etc/zebrad/zebrad.toml)

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

## Créer un service systemd renforcé

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

## Utilisation quotidienne - flux de travail à commande unique

| Action                  | Commande                                     | Remarques |
|-------------------------|----------------------------------------------|-----------|
| **Démarrer**            | `sudo systemctl start zebrad`                | Une commande |
| **Arrêter**             | `sudo systemctl stop zebrad`                 | Une commande |
| **Statut**              | `sudo systemctl status zebrad`               | Indique s’il est en cours d’exécution |
| **Journaux en direct**  | `journalctl -u zebrad -f -o short-precise`  | Remplace `screen -r` |
| **Obtenir le cookie RPC** | `sudo cat /var/lib/zebrad/.cookie`         | Uniquement pendant l’exécution |

**Alias pratiques** (à ajouter à `~/.bashrc` ou `~/.zshrc`) :
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
