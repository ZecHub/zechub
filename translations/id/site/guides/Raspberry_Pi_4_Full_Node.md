# Menjalankan Full Node pada Raspberry Pi 4 (Zebra + Zallet)

*Migrasi dari panduan asli berbasis zcashd. zcashd telah mencapai penghentian otomatis Akhir-Dukungan pada 18 Juli 2026, sehingga panduan ini sekarang menggunakan **Zebra** (full node saat ini, yang dikelola oleh Zcash Foundation) dan **Zallet** (dompet yang dibuat untuk menggantikan dompet bawaan zcashd).*

## Apa yang akan kamu pelajari
- Cara melakukan flash dan mengonfigurasi Ubuntu Server 22.04+ (64-bit) pada Raspberry Pi 4 untuk penggunaan headless
- Cara menginstal dan menjalankan Zebra, baik melalui Docker atau binary yang sudah jadi
- Cara menginstal, mengonfigurasi, dan menginisialisasi Zallet, termasuk pengaturan enkripsi dompet
- Cara (opsional) melakukan migrasi config/dompet zcashd yang sudah ada ke dalam Zallet

## Apa yang berubah dari panduan lama
Versi sebelumnya dari panduan ini menjelaskan cara melakukan kompilasi **zcashd** secara native pada Pi 4 — sebuah proses kompilasi single-threaded yang memakan waktu 3–4 jam karena Pi 4 tidak memiliki memori yang cukup untuk build paralel (`-j$(nproc)`). Zebra dan Zallet sekarang keduanya menyediakan **binari ARM64 dan Docker image resmi yang sudah jadi**, sehingga dalam kebanyakan kasus kamu tidak perlu lagi mengompilasi apa pun dari source pada Pi itu sendiri.

## Prasyarat
- Sebuah Raspberry Pi 4 (disarankan RAM 4 GB atau lebih)
- Sebuah kartu microSD (32 GB+) untuk OS
- Sebuah SSD/HDD eksternal dengan dukungan USB 3.0 — **Zebra membutuhkan sekitar 300 GB untuk data Mainnet yang di-cache**, yang akan bertambah seiring waktu, jadi jangan mencoba menjalankan ini hanya dari kartu microSD saja
- Sebuah komputer dengan slot kartu microSD (untuk melakukan flash pada image OS)
- Koneksi Ethernet kabel atau Wi-Fi
- Pemahaman dasar dalam menggunakan command line melalui SSH

## Langkah 1: Flash Ubuntu Server 22.04+ (64-bit)
Biner siap pakai dan Docker image milik Zebra dan Zallet memerlukan **glibc 2.34+**, yang berarti kamu membutuhkan **Ubuntu Server 22.04 atau yang lebih baru (64-bit/aarch64)**.

1. Instal Raspberry Pi Imager di komputer utama kamu.
2. Masukkan microSD card kamu.
3. Pilih **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (atau yang lebih baru).
4. Gunakan opsi lanjutan Imager (ikon roda gigi) untuk mengonfigurasi hostname sebelumnya, mengaktifkan SSH, dan mengatur kredensial Wi-Fi jika diperlukan, agar dapat melakukan boot pertama secara headless.
5. Tulis image tersebut, masukkan card, nyalakan Pi.
6. Masuk via SSH: `ssh <username>@<pi-hostname-or-ip>`

## Langkah 2: Hubungkan dan mount penyimpanan eksternal
1. Hubungkan SSD/HDD eksternal kamu via USB 3.0.
2. Identifikasi perangkatnya: `lsblk`
3. Format (jika baru) dan mount ke, misalnya, `/mnt/zcash-data`, dengan pengaturan `mkfs`/`fstab` standar agar dapat auto-mount saat reboot.

## Langkah 3: Perbarui sistem
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Langkah 4: Instal dan jalankan Zebra
### Opsi A — Docker (direkomendasikan)
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # log out/in after this
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
Periksa progres: `docker logs -f zebra`

### Opsi B — Binary siap pakai melalui cargo binstall
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
Ini menginstal biner `aarch64` yang sudah jadi — tidak perlu melakukan kompilasi.

**Mengenai waktu sinkronisasi:** harap maklum jika ini memakan waktu lama — angka sinkronisasi pertama yang sering dikutip (sekitar 2 jam) berasal dari perangkat keras referensi yang lebih kuat daripada CPU Pi 4, jadi waktu sinkronisasi aktual kamu pada perangkat keras Pi 4 yang sebenarnya kemungkinan akan berjalan lebih lama.

## Langkah 5: Instal Zallet
Zallet saat ini masih dalam tahap **alpha** — harap antisipasi adanya perubahan yang dapat merusak sistem, dan jangan menganggapnya sebagai solusi kustodial siap pakai untuk dana dalam jumlah besar.

### Opsi A — Docker (direkomendasikan)
```bash
docker pull zodlinc/zallet:latest
```
Gambar ini mendukung ARM64 (melalui build berbasis Nix) dan berjalan dari filesystem minimal tanpa shell — berikan konfigurasi dan jalur data secara eksplisit melalui `--datadir` dan mount volume (lihat Langkah 6).

### Opsi B — Membangun dari sumber (build from source)
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
Crate milik Zallet belum dipublikasikan ke crates.io selama fase alpha, jadi menginstal langsung dari repo git adalah metode non-Docker yang didukung.

## Langkah 6: Konfigurasi Zallet
Buat `zallet.toml` di datadir pilihanmu (misalnya `/mnt/zcash-data/zallet`):
```toml
[builder.limits]
[consensus]
network = "main"
[database]
[external]
[features]
as_of_version = "0.0.0"
[features.deprecated]
[features.experimental]
[indexer]
validator_address = "127.0.0.1:8232"   # Zebra's JSON-RPC endpoint
[keystore]
[note_management]
[rpc]
bind = ["127.0.0.1:SOMEPORT"]
```
Sesuaikan `validator_address` jika Zebra berjalan pada host/port yang berbeda, dan konfigurasi `validator_cookie_auth`/`validator_user`/`validator_password` di bawah `[indexer]` agar sesuai dengan pengaturan autentikasi RPC Zebra kamu.

**Beralih dari zcashd?** Jika kamu masih memiliki `zcash.conf` lama:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## Langkah 7: Mengatur enkripsi dompet
Zallet mengenkripsi semua materi kunci menggunakan `age`/`rage`:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
Ini mencetak kunci publik dan passphrase yang dibuat secara otomatis — **simpan passphrase tersebut; kamu tidak dapat memulihkan file identitas tanpanya.**

## Langkah 8: Inisialisasi dan jalankan dompet
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**Hanya jalankan `generate-mnemonic` satu kali** kecuali jika kamu sengaja menginginkan beberapa root spending yang independen.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## Langkah 9: Memigrasi dompet zcashd yang sudah ada (opsional)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
Ini memerlukan utilitas `db_dump` (dibangun menggunakan Berkeley DB 6.2.23) — dari instalasi sistem atau hasil build-sumber lokal dari zcashd. Jika kamu tidak lagi memiliki zcashd yang terinstal, ini adalah satu langkah migrasi yang belum sepenuhnya mandiri di dalam Zallet.

## Langkah 10: Verifikasi semuanya berfungsi
```bash
zallet -d /mnt/zcash-data/zallet help
```
Pastikan dompet merespons, dan setelah Zebra selesai melakukan sinkronisasi, pastikan saldo/alamat sudah sesuai dengan ekspektasi.

## Pemecahan Masalah
- **Masalah build/runtime Zebra pada ARM:** jika melakukan build dari source, instal toolchain Rust ARM — menjalankan alat build x86_64 pada hardware ARM akan berjalan jauh lebih lambat, sesuai dengan dokumentasi Zebra sendiri.
- **Penyimpanan penuh:** jejak data Zebra sebesar ~300 GB terus bertambah — rencanakan ruang tambahan.
- **Kesalahan izin Docker:** log out/masuk kembali setelah menambahkan user kamu ke grup `docker`, atau gunakan `sudo` untuk sementara waktu.
- **Kontainer Zallet tidak memiliki shell:** image resmi `zodlinc/zallet` dirancang dari nol (from-scratch) — selalu masukkan `--datadir` secara eksplisit dan mount direktori data kamu sebagai volume.

## Catatan hardware vs. panduan zcashd lama
Zebra dan Zallet umumnya lebih ringan pada CPU selama pengaturan dibandingkan saat mengompilasi zcashd, karena kamu menjalankan biner/container yang sudah jadi. RAM 4 GB adalah titik awal yang wajar; pantau dengan `htop` dan pertimbangkan varian Pi 4 8 GB jika kamu melihat swapping yang berat.

## Sumber daya tambahan
- Buku [Zebra](https://zebra.zfnd.org) — dokumentasi resmi Zebra
- Buku [Zallet](https://zcash.github.io/zallet/) — dokumentasi resmi Zallet
- Pemberitahuan [zcashd Akhir Dukungan](https://z.cash/support/zcashd-deprecation)

---

*Jika kamu merasa panduan ini bermanfaat, pertimbangkan untuk mendukung ZecHub: [insert current ZecHub donation shielded address from zechub.wiki/donation — not included here since I couldn't verify it's still current].*
