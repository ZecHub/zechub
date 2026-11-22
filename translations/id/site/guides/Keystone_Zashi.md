<a href="https://github.com/zechub/zechub/edit/main/site/guides/Keystone_Zashi.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Keystone Zodl (sebelumnya Zashi) Panduan Pengguna

> Simpan ZEC terlindungi di penyimpanan dingin: pasangkan dompet hardware Keystone dengan aplikasi Zodl (sebelumnya Zashi, berganti nama pada Februari 2026) dan tanda tangani transaksi dengan kode QR.

## TL;DR

* Keystone 3 Pro (atau Keystone 3) dengan firmware Cypherpunk berfungsi sebagai penanda tangan air gap untuk Zodl, sehingga ZEC terlindungi dapat disimpan dalam penyimpanan dingin.
* Sebelum memulai: pastikan baterai di atas 20%, siapkan kabel USB (atau kartu MicroSD FAT32) untuk pembaruan firmware, dan aplikasi Zodl di ponselmu.
* Verifikasi perangkat di situs web Keystone terlebih dahulu. Ini memastikan perangkat tidak diutak-atik selama pengiriman.
* Buat dompet di Keystone dan catat frasa pemulihan 24 kata secara luring. Frasa ini tidak pernah dimasukkan ke Zodl.
* Hubungkan: di Keystone, ketuk "..." > Connect Software Wallet > Zodl, lalu di Zodl ketuk Connect Hardware Wallet dan pindai kode QR.
* Zodl membuat setiap transaksi; kamu menyetujui dan menandatanganinya di layar Keystone dengan memindai kode QR bolak-balik.

## Penjelasan Inti

Dompet hardware menyimpan spending key-mu di perangkat terpisah yang tidak pernah terhubung ke internet. Keystone menggunakan air gap: perangkat ini berkomunikasi dengan ponselmu hanya melalui kode QR, bukan Bluetooth atau USB.

Dalam pengaturan ini, Zodl berfungsi sebagai sisi "watch". Aplikasi ini menyinkronkan dengan jaringan Zcash, menampilkan saldo terlindungimu, dan menyiapkan transaksi. Keystone menyimpan frasa pemulihan dan menandatangani transaksi. Ponsel yang disusupi dapat melihat saldomu, tetapi tidak dapat memindahkan dana tanpa persetujuan di Keystone.

Langkah-langkah di bawah ini mencakup persiapan perangkat, verifikasi, pembaruan firmware, pembuatan dompet, dan menghubungkannya ke Zodl.

## Ikhtisar

Panduan Twitter:  => [Zodl (sebelumnya Zashi) x Integrasi Dompet Hardware Keystone Twitter Panduan](https://x.com/zashi_app/status/1869793574880973144) 

Integrasi ini menandai perkembangan signifikan dalam kemudahan penggunaan Zcash dengan memungkinkan penyimpanan dingin ZEC terlindungi. Komunitas Zcash pernah menghadapi kendala dengan platform dompet hardware lain, tetapi Keystone muncul sebagai mitra kolaboratif yang bersedia mendorong batas dan berinovasi bersama Electric Coin Company. Tim Keystone menerima hibah ZCG untuk mendukung pekerjaan mereka.

## Tutorial Keystone X Zodl

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="Tutorial Keystone X Zodl"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## Persiapan
[Pesan dan Terima Keystone 3 Pro atau Keystone 3](https://keyst.one) 

Level Baterai: Pastikan baterai perangkat keystone-mu di atas 20%.

Kabel USB atau Kartu SD:

- Kabel USB untuk pembaruan firmware (termasuk).
- Kartu Micro SD (di bawah 1 TB) untuk pembaruan (beli secara terpisah).

Akses ke situs web resmi Keystone untuk Verifikasi dan Pembaruan Firmware.

Penyiapan aplikasi Zodl di perangkat selulermu.

## Panduan Langkah demi Langkah (Perangkat [)Keystone](https://keyst.one/get-started) 


**Pilih Bahasa**

- **Verifikasi Perangkat (melalui QR):** Verifikasi perangkat penting untuk mendeteksi kemungkinan gangguan selama pengiriman, mencegah serangan rantai pasokan, dan memastikan keamanan firmware yang terpasang.
  - Kunjungi halaman Verifikasi Perangkat di situs web Keystone.
  - Klik Scan QR Code di situs web resmi.
  - Gunakan kamera Keystone untuk memindai kode QR yang ditampilkan di situs web.
  - Kode verifikasi akan muncul di layar Keystone.
  - Masukkan kode ini di situs web untuk menyelesaikan proses verifikasi.

- **Pembaruan Firmware:**
  - Perbarui melalui kartu MicroSD
    - Pastikan baterai dompet Keystone terisi setidaknya 20%.
    - Masukkan kartu SD ke komputer dan format sebagai FAT32.
    - Unduh versi firmware Cypherpunk terbaru dari halaman Pembaruan Firmware [Keystone](https://keyst.one/firmware) dan simpan file keystone3.bin di direktori utama kartu MicroSD.
    - Masukkan kartu SD berisi firmware ke dompet Keystone.
    - Buka opsi "Upgrade" di dompet Keystone, lalu ikuti petunjuk di layar untuk memulai proses pembaruan.
  - **Perbarui melalui Kabel USB**
    - Jika versi firmware-mu di bawah 1.0.4, kamu perlu melakukan pembaruan awal menggunakan kartu MicroSD sebelum dapat melanjutkan pembaruan melalui USB.
    - Pastikan baterai dompet Keystone terisi setidaknya 20%.
    - Ketuk via USB dan gunakan kabel USB untuk menghubungkan dompet Keystone ke komputer. Ketuk [Approve] untuk memberikan akses USB kepada dompet Keystone, karena jika tidak, perangkat mungkin hanya mengizinkan pengisian daya.
    - Buka browser web di komputer dan kunjungi halaman Pembaruan Firmware [Keystone](https://keyst.one/firmware)
    - Di halaman pembaruan, klik tombol Install Update dan ikuti petunjuk yang diberikan untuk memasang firmware terbaru.
- **Buat Dompet:**
    - Kata Sandi Aman: Pilih PIN atau kata sandi yang kuat untuk melindungi dompetmu.
    - Beri Nama Dompetmu (Opsional): Kamu dapat memberi nama dompet agar mudah dikenali atau melewati langkah ini.
    - Pilih Create New Wallet jika kamu baru pertama kali menyiapkan dompet.
    - Perangkatmu akan membuat frasa pemulihan 24 kata.
    - Catat frasa pemulihan ini dan simpan dengan aman.
    - Konfirmasikan frasa pemulihan dengan memverifikasi urutan kata yang benar seperti yang ditampilkan di layar.
- **Hubungkan Dompet Zodl + Keystone:**
    - Di perangkat Keystone: Ketuk … di halaman utama
    - Ketuk Connect Software Wallet dan pilih Zodl. Kode QR untuk terhubung ke Zodl akan muncul.
    - Di aplikasi Zodl: Ketuk dropdown Zodl (kiri atas layar)
    - Ketuk Connect Hardware Wallet
    - Ketuk Ready to Scan
    - Pindai kode QR yang ditampilkan di Perangkat Keystone
    - Di aplikasi Zodl: Konfirmasikan akun dompet Keystone dengan mengetuk akun yang ditampilkan
    - Ketuk Connect di bagian bawah layar


## Bantuan Tambahan

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="Hubungkan Dompet Hardware Keystone ke Zodl"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="Tanda Tangani Transaksi Keluar dengan Keystone"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
