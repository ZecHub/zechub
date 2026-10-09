# Full Node Zebra yang Diperkuat

- Menggunakan pengguna tanpa hak istimewa khusus + sandboxing systemd di tingkat kernel (isolasi yang sama dengan Docker).
- RPC hanya tersedia untuk localhost dengan autentikasi cookie yang aman (default & direkomendasikan).


---

## Prasyarat

- distro berbasis Ubuntu apa pun
- Rust toolchain sudah terinstal (`rustup` + `cargo`)
- Setidaknya 300 GB ruang disk kosong (partisi `/var`)


---

## Pengaturan Satu Kali (Jalankan sebagai user biasa kamu)

### 1. Perbarui sistem & instal dependensi build

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Perbarui Rust dan instal zebrad terbaru (v4.3.0+)

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Membuat user zebra khusus tanpa hak akses istimewa

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Buat direktori data yang aman

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
```

## Membuat konfigurasi aman (/etc/zebrad/zebrad.toml)

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

## Membuat layanan systemd yang diperkeras

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

## Penggunaan Harian - Alur Kerja Perintah Tunggal

| Tindakan                  | Perintah                                      | Catatan |
|-------------------------|----------------------------------------------|-------|
| **Mulai**               | `sudo systemctl start zebrad`                | Satu perintah |
| **Berhenti**            | `sudo systemctl stop zebrad`                 | Satu perintah |
| **Status**              | `sudo systemctl status zebrad`               | Menunjukkan apakah sedang berjalan |
| **Log langsung**        | `journalctl -u zebrad -f -o short-precise`  | Menggantikan `screen -r` |
| **Dapatkan cookie RPC** | `sudo cat /var/lib/zebrad/.cookie`           | Hanya saat sedang berjalan |

**Alias kemudahan** (tambahkan ke `~/.bashrc` atau `~/.zshrc`):```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
```
