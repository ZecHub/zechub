# Panduan Pengguna ZEC Terlindungi di Ledger

Pada 23 September 2026, Ledger menambahkan dukungan terlindungi native untuk ZEC ke Wallet Desktop Ledger. Satu akun Zcash kini menyimpan saldo transparan dan saldo privat di pool Ironwood milik Zcash. Private key kamu tetap berada di Ledger kamu, dan setiap transaksi ditinjau serta ditandatangani di perangkat.

**Hanya desktop.** Pengumuman Ledger menyatakan bahwa ZEC terlindungi "hanya tersedia di Wallet Desktop Ledger. Dukungan seluler belum tersedia saat ini, tetapi akan segera hadir." Aplikasi desktop menampilkan pemberitahuan yang sama. Diperiksa pada 15 Oktober 2026.

## Persiapan

- Perangkat Ledger yang menjalankan aplikasi Zcash: Nano S Plus, Nano X, Stax, atau Flex. Aplikasi Zcash saat ini tidak dibuat untuk Nano S versi asli.
- Wallet Desktop Ledger versi 4.21 atau yang lebih baru, diunduh hanya dari [ledger.com](https://www.ledger.com). Panduan ini menggunakan versi 4.24.0.
- Aplikasi Zcash terbaru di Ledger kamu (3.9.4 saat panduan ini ditulis).
- Sejumlah kecil ZEC untuk pengujian. Setiap langkah di bawah dilakukan di mainnet dengan 0.001 ZEC. Setiap transaksi dikenai biaya jaringan kecil (0.00015 ZEC dalam pengujian kami).
- Frasa pemulihan 24 kata kamu tetap tersimpan di kertas. Jangan pernah mengetiknya ke komputer atau membagikannya.

## Panduan Langkah demi Langkah (Wallet Desktop Ledger)

**1. Instal atau perbarui aplikasi Zcash**
- Buka Wallet Ledger, hubungkan dan buka kunci Ledger kamu, lalu buka **Ledger Saya**. Izinkan koneksi pada perangkat.
- Cari **Zcash** di katalog aplikasi, lalu klik **Instal**, atau **Perbarui** jika sudah terinstal.
- Buka aplikasi Zcash di Ledger kamu. Layar menampilkan "Aplikasi Zcash siap". Gulir ke kanan ke **Info aplikasi** untuk memeriksa versinya.

**2. Tambahkan akun Zcash**
- Di Wallet Ledger, pilih **Tambahkan akun**. Di **Pilih aset**, cari Zcash dan pilih **Zcash (ZEC)**, bukan token wrapped seperti Token Zcash-Peg Binance.
- Dengan aplikasi Zcash terbuka di Ledger kamu, Wallet Ledger menemukan akun kamu. Centang di bawah **Pilih akun yang ingin kamu tambahkan** dan klik **Konfirmasi**.
- Halaman akun menampilkan **Saldo tersedia**, **Saldo transparan**, dan **Saldo privat**, serta tombol **Aktifkan terlindungi**.

![Akun Zcash di Ledger Wallet Desktop yang menampilkan pemberitahuan khusus desktop, saldo transparan dan terlindungi, serta tombol “Enable shielded”](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-01-account-desktop-only.png)

**3. Aktifkan saldo privat**
- Klik **Aktifkan terlindungi**. Jendela **Aktifkan saldo privat Zcash** memiliki empat langkah: Birthday, UFVK, Perangkat, dan Konfirmasi.
- **Birthday:** Untuk akun baru, pertahankan tinggi birthday pada tanggal hari ini. Centang "Akun ini menerima ZEC terlindungi di masa lalu" hanya jika kamu tahu bahwa akun tersebut memang menerimanya, karena pemindaian dari blok 0 dapat memakan waktu lama.
- **UFVK dan Perangkat:** Wallet Ledger meminta Ledger kamu untuk mengekspor Unified Full Viewing Key (UFVK). Baca layar pada perangkat dan setujui. Jika kamu melihat "Koneksi perangkat terputus", pastikan aplikasi Zcash terbuka, segera setujui, lalu klik **Coba lagi**.
- Saat kamu melihat **UFVK berhasil diimpor**, klik **Mulai sinkronisasi**. Ketika sinkronisasi selesai, tombol berubah menjadi **Perbarui saldo** dengan waktu "Sinkronisasi terakhir".
- Viewing key tetap berada di komputer kamu. Viewing key dapat menemukan dana terlindungi kamu tetapi tidak dapat membelanjakannya.

![Enable Zcash private balance window showing UFVK successfully imported and the Start sync button](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-02-ufvk-imported.png)

**4. Terima ZEC dan verifikasi kedua alamat di Ledger kamu**
- Klik **Terima** dan pilih akun Zcash kamu. Wallet Ledger menampilkan **Alamat untuk Zcash 1** (transparan, diawali t1) dan **Alamat privat untuk Zcash 1** (diawali u1). Alamat sebelumnya tetap valid.
- Ledger kamu menampilkan "Verifikasi alamat Zcash", **Alamat privat** di dua halaman, lalu **Alamat publik**. Bandingkan setiap karakter dengan layar sebelum kamu membagikan salah satu alamat, lalu konfirmasikan pada perangkat.
- Utamakan alamat privat; gunakan alamat transparan hanya ketika pengirim tidak mendukung pilihan lain.

![Ledger Wallet Receive window showing the transparent address and the private address for Zcash 1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-03-receive-addresses.png)

![Ledger device screens: Verify Zcash addresses, Private address in two pages, then Public Address](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-04-device-verify-addresses.png)

**5. Pindahkan ZEC transparan ke saldo privat kamu**
- Klik **Kirim**. Di bawah **Transfer sendiri**, pilih **Kirim ke saldo privat**.
- Masukkan jumlah atau gunakan 25%, 50%, 75%, atau **Maks**. Periksa biaya jaringan, lalu klik **Tinjau**.
- Di Ledger kamu, telusuri langkah-langkah berikut: "Tinjau transaksi untuk mengirim ZEC", "Transfer dari alamat publik ke alamat privat", jumlahnya, alamat keluaran di dua halaman, biaya, dan tinggi kedaluwarsa. Periksa bahwa alamat keluaran sesuai dengan alamat privat kamu dari langkah 4, lalu tekan kedua tombol pada **Tandatangani transaksi**.
- Wallet Ledger menampilkan **Transaksi terkirim**. Dalam detail transaksi, jenisnya berbunyi **Privat (Ironwood)**.
- Wallet Ledger mencatat bahwa transfer sendiri menghubungkan dana terlindungi kamu dengan alamat publik kamu. Menerima langsung ke alamat privat kamu membuatnya tidak terhubung.

![Send ZEC window in Ledger Wallet with the Self transfer option Send to private balance](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-05-send-to-private-balance.png)

![Ledger device review screens for moving ZEC from the transparent balance to the private address, ending with Sign transaction and Transaction signed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-06-device-review-shielding.png)

- Setelah transaksi dikonfirmasi, saldo transparan berkurang dan saldo privat bertambah. Dana terlindungi baru ditampilkan sebagai "maturing" hingga memiliki cukup konfirmasi untuk dibelanjakan.

![Akun Zcash setelah perlindungan: saldo transparan berkurang, saldo terlindungi bertambah dan ditampilkan sebagai dalam pematangan](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-07-balances-after-shielding.png)

**6. Kirim ZEC dari saldo privat kamu**
- Setelah saldo privat dapat dibelanjakan, klik **Kirim** dan atur **Transfer dari** ke **Saldo privat**.
- Tempel alamat penerima dan masukkan jumlahnya. Kamu dapat menambahkan **Memo (opsional)** terenkripsi hingga 512 byte, yang hanya dapat dibaca oleh penerima.
- Tinjau penerima, jumlah, dan biaya di Ledger kamu, lalu tekan kedua tombol pada **Tandatangani transaksi**.

![Sent transaction from the private balance in Ledger Wallet transaction details](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-08-private-send.png)

## Hal yang Perlu Diketahui

- ZEC terlindungi di Ledger saat ini hanya tersedia untuk desktop (diperiksa pada 15 Oktober 2026).
- Saldo privat Wallet Ledger menggunakan pool Ironwood.
- Ledger menyatakan bahwa kamu dapat membagikan akses baca-saja ke riwayat transaksi kamu dengan penasihat pajak. Siapa pun yang memiliki viewing key kamu dapat melihat riwayat terlindungi kamu, jadi bagikan hanya dengan sengaja.
- Layar perangkat dalam panduan ini diambil menggunakan emulator Speculos milik Ledger (Nano S Plus) yang menjalankan aplikasi Zcash versi 3.9.4, terhubung ke Wallet Desktop Ledger versi 4.24.0 di mainnet Zcash. Ledger fisik menjalankan aplikasi yang sama dan menampilkan layar yang sama.

## Bantuan Tambahan

- [Baru di Wallet Ledger: Dukungan Zcash Terlindungi Native](https://www.ledger.com/blog-native-shielded-zcash-support) (pengumuman Ledger)
- [Pusat Bantuan Ledger](https://support.ledger.com)
- [Halaman Dompet ZecHub](/using-zcash/wallets)
- [Pool Terlindungi](/using-zcash/shielded-pools) dan [Viewing Key](/zcash-tech/viewing-keys) di ZecHub
- Pilihan dompet hardware lainnya: [Keystone Panduan Pengguna Zashi](/guides/keystone-zashi)
