# Σκληρυμένος Zebra πλήρης κόμβος

- Χρησιμοποιεί έναν αποκλειστικό μη προνομιούχο χρήστη και sandboxing του systemd σε επίπεδο kernel (ίδιος βαθμός απομόνωσης με το Docker).  
- Το RPC είναι προσβάσιμο μόνο από το localhost και χρησιμοποιεί ασφαλή έλεγχο ταυτότητας με cookie (προεπιλεγμένη και συνιστώμενη ρύθμιση).  


---

## Προαπαιτούμενα

- οποιαδήποτε διανομή βασισμένη στο Ubuntu
- εγκατεστημένη αλυσίδα εργαλείων Rust (`rustup` + `cargo`)
- Τουλάχιστον 300 GB ελεύθερου χώρου στον δίσκο (διαμέρισμα `/var`)


---

## Αρχική ρύθμιση (εκτέλεση ως ο κανονικός σου χρήστης)

### 1. Ενημέρωσε το σύστημα και εγκατέστησε τις εξαρτήσεις κατασκευής

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Ενημέρωσε το Rust και εγκατέστησε την πιο πρόσφατη έκδοση του zebrad (7.0.0 ή νεότερη)

Το NU7 ενεργοποιήθηκε στο Mainnet στο μπλοκ 3.543.405. Μόνο τα [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) και οι νεότερες εκδόσεις ακολουθούν την αλυσίδα μετά από αυτό το ύψος, οπότε ένα `zebrad` έκδοσης 6.x ή παλαιότερης παραμένει κολλημένο στους παλιούς κανόνες. Για την κατασκευή του χρειάζεται Rust 1.91 ή νεότερο, το οποίο εγκαθιστά το `rustup update`. Αν αναβαθμίζεις έναν υπάρχοντα κόμβο από το Zebra 6.x, δημιούργησε πρώτα ένα αντίγραφο ασφαλείας του `/var/lib/zebrad/state/v28`: το Zebra 7 το μετατρέπει στη νέα μορφή βάσης δεδομένων v29 κατά την πρώτη εκκίνηση και έπειτα η έκδοση 6.x δεν μπορεί να το διαβάσει.

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Δημιούργησε τον αποκλειστικό μη προνομιούχο χρήστη zebra

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Δημιούργησε έναν ασφαλή κατάλογο δεδομένων

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
sudo mkdir -p /var/lib/zebrad-rpc
sudo chown zebra:zebra /var/lib/zebrad-rpc
sudo chmod 750 /var/lib/zebrad-rpc
```

Το `/var/lib/zebrad-rpc` αποθηκεύει το cookie ελέγχου ταυτότητας RPC. Η παρακάτω υπηρεσία μπορεί να γράφει μόνο σε αυτούς τους δύο καταλόγους και το systemd αρνείται να την εκκινήσει αν λείπει οποιοσδήποτε από τους δύο.

## Δημιούργησε ασφαλή ρύθμιση παραμέτρων (/etc/zebrad/zebrad.toml)

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

## Δημιούργησε μια ενισχυμένη υπηρεσία systemd

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

Το Zebra δημιουργεί ένα νέο cookie κάθε φορά που ξεκινά, το οποίο είναι αναγνώσιμο μόνο από τον χρήστη `zebra` (λειτουργία 600), και το διαγράφει όταν σταματά. Διάβασέ το με το `sudo`, όπως παρακάτω. Μην προσθέσεις γραμμή `ExecStartPost=` που αλλάζει τη λειτουργία του cookie: μπορεί να εκτελεστεί πριν γράψει το cookie το zebrad, και μια αποτυχημένη εντολή `ExecStartPost=` σταματά την υπηρεσία.

## Καθημερινή χρήση - Ροή εργασίας με μία εντολή

| Ενέργεια                  | Εντολή                                      | Σημειώσεις |
|-------------------------|----------------------------------------------|-------|
| **Εκκίνηση**               | `sudo systemctl start zebrad`                | Μία εντολή |
| **Διακοπή**                | `sudo systemctl stop zebrad`                 | Μία εντολή |
| **Κατάσταση**              | `sudo systemctl status zebrad`               | Δείχνει αν εκτελείται |
| **Ζωντανά αρχεία καταγραφής**           | `journalctl -u zebrad -f -o short-precise`  | Αντικαθιστά το `screen -r` |
| **Λήψη cookie RPC**      | `sudo cat /var/lib/zebrad-rpc/.cookie`           | Μόνο όσο εκτελείται |

**Συντομεύσεις για διευκόλυνση** (πρόσθεσέ τες στο `~/.bashrc` ή στο `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad-rpc/.cookie'
```
