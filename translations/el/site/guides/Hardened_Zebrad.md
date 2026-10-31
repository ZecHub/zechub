# Θωρακισμένος πλήρης κόμβος Zebra

- Χρησιμοποιεί έναν αποκλειστικό μη προνομιούχο χρήστη + sandboxing systemd σε επίπεδο kernel (ίδια απομόνωση με το Docker).  
- Το RPC είναι διαθέσιμο μόνο στο localhost με ασφαλή έλεγχο ταυτότητας cookie (προεπιλογή & συνιστώμενο).  


---

## Προαπαιτούμενα

- οποιαδήποτε διανομή βασισμένη στο Ubuntu
- εγκατεστημένο toolchain Rust (`rustup` + `cargo`)
- Τουλάχιστον 300 GB ελεύθερου χώρου στον δίσκο (διαμέρισμα `/var`)


---

## Εφάπαξ ρύθμιση (εκτέλεση ως ο κανονικός σου χρήστης)

### 1. Ενημέρωσε το σύστημα & εγκατάστησε τις εξαρτήσεις build

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Ενημέρωσε το Rust και εγκατέστησε την πιο πρόσφατη έκδοση του zebrad (v4.3.0+)

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Δημιούργησε αποκλειστικό μη προνομιούχο χρήστη zebra

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Δημιούργησε ασφαλή κατάλογο δεδομένων

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
```

## Δημιούργησε ασφαλή διαμόρφωση (/etc/zebrad/zebrad.toml)

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

## Δημιούργησε θωρακισμένη υπηρεσία systemd

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

## Καθημερινή χρήση - ροή εργασίας με μία εντολή

| Ενέργεια                  | Εντολή                                      | Σημειώσεις |
|-------------------------|----------------------------------------------|-------|
| **Εκκίνηση**               | `sudo systemctl start zebrad`                | Μία εντολή |
| **Διακοπή**                | `sudo systemctl stop zebrad`                 | Μία εντολή |
| **Κατάσταση**              | `sudo systemctl status zebrad`               | Δείχνει αν εκτελείται |
| **Ζωντανά logs**           | `journalctl -u zebrad -f -o short-precise`  | Αντικαθιστά το `screen -r` |
| **Λήψη cookie RPC**      | `sudo cat /var/lib/zebrad/.cookie`           | Μόνο όσο εκτελείται |

**Χρήσιμα aliases** (πρόσθεσέ τα στο `~/.bashrc` ή στο `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
```
