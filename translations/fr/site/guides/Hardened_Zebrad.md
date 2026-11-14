# Nœud complet Zebra renforcé

- Utilise un utilisateur dédié non privilégié et le sandboxing systemd au niveau du noyau (même isolation que Docker).  
- Le RPC est accessible uniquement en localhost avec une authentification sécurisée par cookie (par défaut et recommandée).  


---

## Prérequis

- N'importe quelle distribution basée sur Ubuntu
- Chaîne d'outils Rust installée (`rustup` + `cargo`)
- Au moins 300 Go d'espace disque libre (partition `/var`)


---

## Configuration initiale (à exécuter avec votre utilisateur habituel)

### 1. Mettre à jour le système et installer les dépendances de compilation

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Mettre à jour Rust et installer la dernière version de zebrad (7.0.0 ou plus récente)

NU7 a été activé sur le Mainnet au bloc 3 543 405. Seules les versions [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) et ultérieures suivent la chaîne au-delà de cette hauteur ; un `zebrad` en version 6.x ou antérieure reste donc bloqué sur les anciennes règles. Sa compilation nécessite Rust 1.91 ou plus récent, que `rustup update` installe. Si vous mettez à niveau un nœud existant depuis Zebra 6.x, sauvegardez d'abord `/var/lib/zebrad/state/v28` : Zebra 7 le convertit au nouveau format de base de données v29 lors du premier démarrage, et la version 6.x ne peut plus le lire ensuite.

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
sudo mkdir -p /var/lib/zebrad-rpc
sudo chown zebra:zebra /var/lib/zebrad-rpc
sudo chmod 750 /var/lib/zebrad-rpc
```

`/var/lib/zebrad-rpc` contient le cookie d'authentification RPC. Le service ci-dessous ne peut écrire que dans ces deux répertoires, et systemd refuse de le démarrer si l'un d'eux est absent.

## Créer une configuration sécurisée (/etc/zebrad/zebrad.toml)

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

Zebra écrit un nouveau cookie à chaque démarrage, lisible uniquement par l'utilisateur `zebra` (mode 600), et le supprime à l'arrêt. Lisez-le avec `sudo`, comme ci-dessous. N'ajoutez pas de ligne `ExecStartPost=` qui modifie le mode du cookie : elle peut s'exécuter avant que zebrad n'ait écrit le cookie, et l'échec d'une commande `ExecStartPost=` arrête le service.

## Utilisation quotidienne : une commande par action

| Action                  | Commande                                     | Remarques |
|-------------------------|----------------------------------------------|-------|
| **Démarrer**            | `sudo systemctl start zebrad`                | Une seule commande |
| **Arrêter**             | `sudo systemctl stop zebrad`                 | Une seule commande |
| **État**                | `sudo systemctl status zebrad`               | Indique s'il est en cours d'exécution |
| **Journaux en direct**  | `journalctl -u zebrad -f -o short-precise`  | Remplace `screen -r` |
| **Obtenir le cookie RPC** | `sudo cat /var/lib/zebrad-rpc/.cookie`           | Uniquement pendant l'exécution |

**Alias pratiques** (à ajouter à `~/.bashrc` ou `~/.zshrc`) :
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad-rpc/.cookie'
```
