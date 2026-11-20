# Full node Zebra yang diperkuat

- Menggunakan pengguna khusus tanpa hak istimewa + sandbox systemd tingkat kernel (isolasi yang sama seperti Docker).  
- RPC hanya dapat diakses melalui localhost dengan autentikasi cookie yang aman (bawaan dan direkomendasikan).  


---

## Prasyarat

- distro berbasis Ubuntu apa pun
- toolchain Rust sudah terpasang (`rustup` + `cargo`)
- Ruang disk kosong minimal 300 GB (partisi `/var`)


---

## Penyiapan Sekali Saja (Jalankan sebagai pengguna biasa)

### 1. Perbarui sistem & pasang dependensi build

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Perbarui Rust dan pasang zebrad terbaru (7.0.0 atau lebih baru)

NU7 diaktifkan di Mainnet pada blok 3,543,405. Hanya [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) dan versi setelahnya yang mengikuti chain setelah ketinggian tersebut, jadi `zebrad` versi 6.x atau lebih lama akan tertahan pada aturan lama. Untuk membangunnya, diperlukan Rust 1.91 atau lebih baru, yang dipasang oleh `rustup update`. Jika kamu meningkatkan node yang sudah ada dari Zebra 6.x, cadangkan `/var/lib/zebrad/state/v28` terlebih dahulu: Zebra 7 mengubahnya ke format database v29 yang baru saat pertama kali dijalankan, dan setelah itu versi 6.x tidak dapat membacanya.

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Buat pengguna zebra khusus tanpa hak istimewa

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Buat direktori data yang aman

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
sudo mkdir -p /var/lib/zebrad-rpc
sudo chown zebra:zebra /var/lib/zebrad-rpc
sudo chmod 750 /var/lib/zebrad-rpc
```

`/var/lib/zebrad-rpc` menyimpan cookie autentikasi RPC. Layanan di bawah ini hanya dapat menulis ke kedua direktori tersebut, dan systemd menolak untuk memulainya jika salah satunya tidak ada.

## Buat konfigurasi yang aman (/etc/zebrad/zebrad.toml)

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

## Buat layanan systemd yang diperkuat

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

Zebra menulis cookie baru setiap kali dimulai. Cookie hanya dapat dibaca oleh pengguna `zebra` (mode 600) dan dihapus saat layanan berhenti. Baca cookie dengan `sudo`, seperti di bawah ini. Jangan tambahkan baris `ExecStartPost=` yang mengubah mode cookie: baris itu dapat dijalankan sebelum zebrad menulis cookie, dan perintah `ExecStartPost=` yang gagal akan menghentikan layanan.

## Penggunaan Harian - Alur Kerja Satu Perintah

| Tindakan                | Perintah                                      | Catatan |
|-------------------------|----------------------------------------------|-------|
| **Mulai**               | `sudo systemctl start zebrad`                | Satu perintah |
| **Hentikan**            | `sudo systemctl stop zebrad`                 | Satu perintah |
| **Status**              | `sudo systemctl status zebrad`               | Menunjukkan apakah sedang berjalan |
| **Log langsung**        | `journalctl -u zebrad -f -o short-precise`  | Menggantikan `screen -r` |
| **Dapatkan cookie RPC** | `sudo cat /var/lib/zebrad-rpc/.cookie`           | Hanya saat sedang berjalan |

**Alias praktis** (tambahkan ke `~/.bashrc` atau `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad-rpc/.cookie'
```
