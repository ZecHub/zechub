<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Zebra Full Node

## Ringkasan Singkat

- Zebra (`zebrad`) adalah Zcash full node yang ditulis dalam Rust dan dikelola oleh Zcash Foundation.
- Ia memvalidasi blok dan transaksi, menjaga status chain, dan berkomunikasi dengan node lain melalui jaringan peer-to-peer.
- Zebra dan zcashd mengimplementasikan protokol yang sama dan dapat saling beroperasi. Sejak pensiunnya zcashd, Zebra menjalankan peran konsensus.
- Dua cara untuk menjalankannya: menggunakan image Docker `zfnd/zebra`, atau build dari source.
- Perangkat keras yang direkomendasikan adalah 4 core CPU, RAM 16 GB, dan disk 300 GB. Spesifikasi minimum adalah 2 core dan RAM 4 GB, dengan disk 300 GB yang sama.

## Penjelasan Inti

Zebra adalah Zcash node pertama yang ditulis sepenuhnya dalam Rust. Node ini berada di jaringan peer-to-peer Zcash, di mana ia memvalidasi dan menyiarkan transaksi serta menjaga status blockchain. Memiliki implementasi independen kedua membuat infrastruktur jaringan menjadi tidak terlalu bergantung pada satu basis kode tunggal.

### Zebra dan zcashd

Node Zcash asli, zcashd, dikembangkan oleh Electric Coin Company dari basis kode Bitcoin. Zebra ditulis dari awal menggunakan Rust, bahasa yang aman secara memori, dengan fokus pada keamanan dan efisiensi.

Kedua implementasi mengikuti protokol yang sama, sehingga keduanya dapat berkomunikasi dan berinteroperabilitas. zcashd mencapai penghentian End-of-Support pada 18 Juli 2026 dan tidak lagi berjalan, yang membuat Zebra dan Zakura menjadi implementasi node yang digunakan. Lihat [Full Nodes](/zcash-tech/full-nodes) untuk gambaran yang lebih luas.

## Menjalankan Zebra

Anda dapat menjalankan Zebra menggunakan image Docker, atau Anda dapat membangunnya secara manual. Silakan lihat bagian Persyaratan Sistem.

### Penggunaan Docker

Untuk menjalankan rilis terbaru dan menyinkronkannya hingga ke ujung (tip), jalankan perintah berikut:

```

docker run zfnd/zebra:latest

```

Untuk instruksi lengkap, silakan merujuk ke dokumentasi [Docker](https://zebra.zfnd.org/user/docker.html).

### Membangun Zebra

Membangun Zebra memerlukan Rust, libclang, dan kompiler C++.

- Pastikan Anda telah menginstal versi Rust stabil terbaru, karena Zebra secara eksklusif diuji dengan versi tersebut.
- Dependensi build yang diperlukan meliputi:
  - libclang (juga dikenal sebagai libclang-dev atau llvm-dev)
  - clang atau kompiler C++ lainnya (seperti g++ untuk semua platform atau Xcode untuk macOS)
  - protoc (kompiler Protocol Buffers) dengan flag *--experimental_allow_proto3_optional*, yang diperkenalkan dalam Protocol Buffers v3.12.0 (dirilis pada 16 Mei 2020).

### Instal dan Mulai

Pada x86_64 atau aarch64 Linux dengan glibc 2.34 atau yang lebih baru (Ubuntu 22.04+, Debian 12+, RHEL 9+, Amazon Linux 2023), Anda dapat melewati dependensi build dan menginstal biner pra-rilis yang telah ditandatangani:

```
cargo binstall zebrad
```

Binary yang sama dilampirkan pada setiap rilis GitHub sebagai `zebrad-<version>-<target>.tar.gz`, masing-masing dengan checksum SHA-256, atestasi Sigstore build-provenance, dan tanda tangan Cosign. Pada platform lama, gunakan image Docker atau bangun dari sumbernya (source).

Untuk membangun dari sumbernya, dapatkan kodenya dan bangun biner rilis:

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo build --release --bin zebrad
```

Jalankan node dengan:

```
target/release/zebrad start
```

Panduan instalasi: [zebra.zfnd.org/user/install.html](https://zebra.zfnd.org/user/install.html)

## Konfigurasi & Fitur Opsional

### Menginisialisasi File Konfigurasi

- Buat file konfigurasi menggunakan perintah:

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

- *zebrad.toml* yang dihasilkan akan ditempatkan di direktori preferensi default Linux. Untuk lokasi default pada OS alternatif lainnya, silakan merujuk ke dokumentasi.

### Mengonfigurasi Bilah Kemajuan

- Konfigurasikan *tracing.progress_bar* di dalam *zebrad.toml* Anda untuk menampilkan metrik utama di terminal menggunakan progress bar. Catatan: Terdapat masalah yang diketahui di mana estimasi progress bar dapat menjadi sangat besar.

### Mengonfigurasi Penambangan

- Zebra dapat dikonfigurasi untuk penambangan dengan menentukan *MINER_ADDRESS* dan pemetaan port di Docker. Detail lebih lanjut dapat ditemukan dalam [dokumentasi dukungan penambangan](https://zebra.zfnd.org/user/mining-docker.html).

### Fitur Build Kustom

- Perluas fungsionalitas Zebra dengan fitur Cargo tambahan seperti metrik Prometheus, pemantauan Sentry, dukungan eksperimental Elasticsearch, dan banyak lagi.

- Gabungkan beberapa fitur dengan mencantumkannya sebagai parameter dari flag `--features` selama instalasi.

- Beberapa fitur debugging dan pemantauan dinonaktifkan dalam build rilis untuk mengoptimalkan performa. Untuk daftar lengkap fitur eksperimental dan pengembang, silakan merujuk ke dokumentasi [API](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).

## Persyaratan Sistem dan Konfigurasi Jaringan

### Persyaratan yang Direkomendasikan

- CPU: 4 core CPU
- RAM: 16 GB
- Ruang Disk: 300 GB ruang disk yang tersedia untuk mengompilasi biner dan menyimpan cache status chain
- Jaringan: Koneksi jaringan 100 Mbps dengan minimum 300 GB unggahan dan unduhan per bulan

### Persyaratan Minimum

- CPU: 2 core CPU
- RAM: 4 GB
- Ruang Disk: 300 GB ruang disk yang tersedia

Rangkaian pengujian Zebra mungkin memerlukan waktu lebih dari satu jam untuk selesai tergantung pada spesifikasi mesin Anda. Sistem yang lebih lambat dapat mengompilasi dan menjalankan Zebra. Batas performa yang tepat belum ditetapkan melalui pengujian.

### Persyaratan Disk

- Zebra menggunakan sekitar 300 GB untuk data Mainnet yang di-cache dan 10 GB untuk data Testnet yang di-cache. Perkirakan penggunaan disk akan meningkat seiring berjalannya waktu.
- Database dibersihkan secara berkala, serta saat shutdown atau restart. Perubahan dikomit menggunakan transaksi database. Perubahan yang tidak lengkap akibat penghentian paksa atau panic akan di-rollback pada saat Zebra dimulai kembali.

### Persyaratan Jaringan dan Port

- Zebra menggunakan port TCP berikut untuk koneksi masuk dan keluar:
  - 8233 untuk Mainnet
  - 18233 untuk Testnet
- Mengonfigurasi Zebra dengan `listen_addr` tertentu akan mengiklankan alamat ini untuk koneksi masuk. Koneksi keluar diperlukan untuk sinkronisasi; koneksi masuk bersifat opsional.
- Akses ke DNS seeder Zcash diperlukan melalui resolver DNS OS (biasanya port 53).
- Zebra dapat melakukan koneksi keluar pada port apa pun. zcashd lebih menyukai peer pada port default untuk menghindari penggunaan sebagai serangan DDoS pada jaringan lain.

### Penggunaan Jaringan Mainnet yang Umum

- Sinkronisasi Awal: unduhan sebesar 300 GB diperlukan untuk sinkronisasi awal, dan angka ini diperkirakan akan terus bertambah.
- Pembaruan Berkelanjutan: unggahan dan unduhan harian berkisar antara 10 MB hingga 10 GB, tergantung pada ukuran transaksi pengguna dan permintaan peer.
- Zebra memulai sinkronisasi awal pada setiap perubahan versi database internal, yang dapat berarti pengunduhan seluruh chain selama peningkatan versi.
- Peer dengan latensi round-trip sebesar 2 detik atau kurang lebih diutamakan. Jika latensi melebihi ambang batas ini, buka tiket di repositori Zebra.

## Kesalahan Umum

- Menentukan ukuran disk untuk saat ini. State Mainnet yang di-cache sudah mendekati 300 GB dan terus bertambah.
- Mengharapkan RPC dompet dari `zebrad`. Kunci dan saldo berada di [Zallet](https://github.com/zcash/zallet), sebuah program terpisah.
- Menjalankan `zebrad` secara mandiri dan mengharapkan light wallet dapat terhubung. Jalur tersebut membutuhkan indexer, baik itu lightwalletd atau [Zaino](/zcash-tech/zaino).
- Menganggap resync yang tidak terduga sebagai sebuah kesalahan. Perubahan versi database memicu hal tersebut secara desain.

## Halaman Terkait

- [Full Nodes](/zcash-tech/full-nodes) - apa yang dilakukan oleh sebuah full node dan implementasi mana saja yang tersedia
- [Zakura Node](/zcash-tech/zakura-node) - sebuah node yang merupakan fork dari Zebra dengan sinkronisasi dan pruning yang lebih cepat
- [Zaino](/zcash-tech/zaino) - indexer Rust yang melayani light wallet
- [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) - server yang dikueri oleh light wallet
- [Zcash Panduan Penambangan](/using-zcash/zcash-mining-guide) - menambang terhadap node Anda sendiri

## Pembelajaran Lebih Lanjut

- [Buku Zebra](https://zebra.zfnd.org)
- [Zebra pada GitHub](https://github.com/ZcashFoundation/zebra/)
- [Persyaratan Sistem](https://zebra.zfnd.org/user/requirements.html)