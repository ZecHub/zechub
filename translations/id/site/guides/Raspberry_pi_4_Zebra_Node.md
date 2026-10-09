<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Panduan Raspberry Pi 4 untuk Menjalankan Zebra

<img src="/content-images/image-2023-11-28-172907488-e7e9fd4ac5.webp" alt="raspberry pi" width="300" height="300"/>

Menjalankan perangkat lunak node Zebra pada Raspberry Pi 4 memungkinkan kamu untuk berpartisipasi dalam jaringan Zcash sebagai node independen yang kompatibel dengan konsensus. Panduan ini akan memandu kamu melalui langkah-langkah untuk menyiapkan dan menjalankan Zebra di Raspberry Pi 4 milikmu.

## Prasyarat

1. Raspberry Pi 4 (disarankan 2GB RAM atau lebih tinggi).

2. Kartu MicroSD (disarankan 16GB atau lebih tinggi) dengan Raspberry Pi OS (Raspbian) yang sudah terinstal.

3. Koneksi internet yang stabil.

4. Keyboard, mouse, dan monitor (untuk pengaturan awal).

5. Klien SSH (opsional, untuk akses jarak jauh).

## Instalasi

1. __Perbarui Sistem Kamu__
   Buka terminal atau SSH ke Raspberry Pi kamu dan pastikan sistem kamu sudah mutakhir dengan menjalankan:

__sudo apt update__

__sudo apt upgrade__

2. __Instal Dependensi__
   Kamu perlu menginstal beberapa dependensi yang diperlukan untuk membangun dan menjalankan Zebra:

__sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __Kloning repositori Zebra__
   Buka terminal dan kloning repositori Zebra ke Raspberry Pi kamu:

__git clone https://github.com/ZcashFoundation/zebra.git__

__cd zebra__

4. __Membangun Zebra__
   Untuk membangun Zebra, gunakan perintah berikut:

__cargo build --release__

Proses ini mungkin memakan waktu beberapa saat. Pastikan Raspberry Pi kamu didinginkan dengan cukup, karena proses kompilasi dapat menghasilkan panas.

5. __Konfigurasi__
   Buat file konfigurasi untuk Zebra. Kamu dapat menggunakan konfigurasi default sebagai titik awal:

__cp zcash.conf.example zcash.conf__

Edit file `zcash.conf` untuk menyesuaikan pengaturan node kamu. Kamu dapat menentukan jaringan, mengaktifkan penambangan, mengatur koneksi peer, dan banyak lagi.

6. __Mulai Zebra__
   Kamu sekarang dapat memulai Zebra dengan konfigurasi kustom kamu:

__./target/release/zebrad -c zcash.conf__

__git comment__

Perintah ini akan menjalankan node Zebra, dan ia akan mulai melakukan sinkronisasi dengan blockchain Zcash.

7. __Pemantauan__
   Kamu dapat memantau progres dan status node Zebra milikmu dengan membuka browser web dan menavigasi ke __http://127.0.0.1:8233/status__.

<img src="/content-images/image-2023-11-28-173024853-99540511cf.webp" alt="logo zebra" width="200" height="200"/>

## Pemecahan Masalah

Jika kamu menemukan masalah saat membangun atau menjalankan Zebra, periksa dokumentasi [Zebra](https://zebra.zfnd.org/user/troubleshooting.html) untuk tips pemecahan masalah dan informasi tambahan.

Pastikan kamu menjaga Raspberry Pi tetap dingin, karena menjalankan sebuah node dapat menghasilkan panas. Kamu mungkin perlu menggunakan solusi pendingin, seperti kipas atau heat sink.

## Kesimpulan

Dengan mengikuti panduan ini, kamu seharusnya telah berhasil menyiapkan dan menjalankan Zebra di Raspberry Pi 4 milikmu. Kamu sekarang berkontribusi pada jaringan Zcash sebagai node independen, membantu mengamankan privasi transaksi Zcash.