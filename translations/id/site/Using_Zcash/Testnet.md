# Testnet Zcash

## Apa Itu Testnet Zcash?

**Testnet Zcash** adalah blockchain paralel dari jaringan utama Zcash yang sebenarnya (Mainnet) yang mereplikasi protokol, aturan, dan logika transaksi yang sama persis - tetapi dengan dua perbedaan utama:

1. **Koin tidak memiliki nilai moneter nyata** - koin ini disebut **TAZ**, bukan ZEC, dan hanya digunakan untuk pengujian.  
2. **Peningkatan jaringan, alat, dan perangkat lunak diuji di sini terlebih dahulu** sebelum diterapkan pada blockchain Zcash yang sebenarnya.

Dengan kata lain, Testnet ibarat sebuah **sandbox atau lingkungan eksperimental** di mana para pengembang, auditor, dan pembangun dapat mencoba berbagai ide tanpa risiko kehilangan uang sungguhan.


## Mengapa Testnet Ada?

Testnet sangat krusial bagi pengembangan blockchain karena **blockchain asli seperti Zcash bersifat tidak dapat diubah** - begitu transaksi dikonfirmasi di jaringan utama, transaksi tersebut tidak dapat dibatalkan. Testnet menyediakan **replika yang aman** untuk bereksperimen, menguji, dan memperbaiki bug fitur sebelum diterapkan ke Mainnet.

### Kegunaan Testnet

#### 1. Pengembangan & Integrasi Perangkat Lunak

Developer yang membangun dompet, exchange, perangkat lunak penambangan, atau alat privasi dapat mengujinya dengan aman di Testnet. Kemampuannya meliputi:

- Mengirim dan menerima transaksi
- Menambang blok baru dengan koin TAZ bernilai nol
- Membangun antarmuka pengguna dan API
- Menguji fitur privasi transaksi (transparan vs terlindungi)

**Contoh:**  
Alat seperti [`zcash_tx_tool`](https://github.com/QED-it/zcash_tx_tool) menggunakan Testnet untuk menghasilkan transaksi dan menguji fungsionalitas aset terlindungi Zcash.

**Skenario dunia nyata:**  
Seorang pengembang dompet dapat menghubungkan perangkat lunak ke endpoint RPC Testnet dan mensimulasikan seluruh siklus hidup — membuat alamat, mengirim transaksi terlindungi, dan memvalidasi saldo — sebelum diluncurkan secara live di Mainnet.

#### 2. Menguji Peningkatan Jaringan

Zcash meningkatkan protokol intinya secara berkala (misalnya, NU6.1, NU6.2 dan Ironwood). Testnet mengaktifkan peningkatan baru **sebelum Mainnet**, memungkinkan pengembang dan komunitas untuk mengidentifikasi dan memperbaiki bug.

**Contoh:**  
Aturan konsensus atau tipe transaksi baru pertama kali dikirim ke Testnet. Setelah pengujian berhasil, hal tersebut akan aktif di Mainnet pada ketinggian blok yang telah ditentukan sebelumnya.

#### 3. Menguji Implementasi Node

node yang dikelola oleh Zcash adalah **Zebra** (node berbasis Rust yang dikelola oleh Zcash Foundation) dan dompet yang dikelola adalah [Zallet](https://github.com/zcash/zallet). `zcashd`, implementasi node asli, telah mencapai penghentian dukungan otomatis pada 18 Juli 2026 dan tidak lagi dikelola - lihat panduan migrasi [zcashd ke Zebra dan Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet). Testnet memungkinkan pengujian node dalam kondisi nyata tanpa risiko finansial.

Pengembang node dapat:

- Validasi propagasi blok
- Uji antarmuka RPC
- Amati perilaku node di bawah beban kerja
- Uji interaksi perangkat lunak penambangan

#### 4. Pembelajaran & Edukasi

Pemula dapat mempelajari fitur-fitur Zcash seperti penambangan, membuat transaksi terlindungi, dan menggunakan Unified Addresses.  
Tutorial komunitas dan dokumentasi menyediakan akses ke **faucet Testnet, explorer, dan panduan**.


## Kasus Penggunaan Real Testnet

### 1. Pengujian Developer (Dompet / Aplikasi)

- Terhubung ke Testnet Zcash
- Minta TAZ dari faucet
- Mengirim transaksi terlindungi
- Verifikasi privasi dan stabilitas UI

Tidak ada ZEC asli yang hilang bahkan jika terjadi kesalahan.

### 2. Pengujian Integrasi Exchange

- Jalankan node Testnet
- Gunakan endpoint JSON-RPC Zebrad untuk memproses transaksi
- Uji logika deposit/penarikan otomatis

Memastikan kode produksi yang aman dan mencegah kerugian finansial.

### 3. Uji Coba Pengaturan Penambangan

- Gunakan template penambangan
- Uji validasi blok
- Amati imbalan penambangan (hanya TAZ)
- Atur performa penambangan

Mencegah waktu henti atau hilangnya pendapatan saat berpindah ke Mainnet.

### 4. Penelitian Akademik / Protokol

Peneliti dapat menguji inovasi seperti **verifikasi stateless**, **optimasi zero-knowledge proof**, atau eksperimen protokol lainnya menggunakan Testnet.  
Pengguna tingkat lanjut juga dapat menjalankan **Testnet kustom atau lingkungan regtest** untuk eksperimen khusus.


## Perbedaan Utama Antara Mainnet dan Testnet

| Fitur                 | Mainnet          | Testnet               |
|-----------------------|------------------|-----------------------|
| Nilai koin            | ZEC Asli        | TAZ (tidak memiliki nilai moneter) |
| Risiko                | Risiko finansial | Aman untuk pengujian  |
| Peningkatan protokol | Produksi         | Aktivasi dini        |
| Imbalan penambangan   | Penerbitan asli  | Hanya imbalan uji     |
| Utilitas jaringan     | Transaksi langsung| Pengujian dan pengembangan |

## Kesalahpahaman Umum

- **Koin Testnet memiliki nilai** -> Salah, TAZ tidak memiliki nilai apa pun.  
- **Kehilangan koin Testnet itu penting** -> Salah, tidak ada nilai nyata yang hilang.  
- **Testnet dan Mainnet identik** -> Salah, Testnet sering kali direset dan tidak diamankan secara ekonomi seperti Mainnet.

---

## Apa Itu TAZ?

**TAZ** adalah versi Testnet dari koin Zcash:

- Bukan uang sungguhan; tidak dapat ditukarkan dengan ZEC atau fiat
- Digunakan untuk pengujian, pengembangan, dan pembelajaran
- Mengikuti semua aturan Zcash: dapat dikirim, ditambang, dan digunakan dalam alamat terlindungi

**Contoh:**  
Seorang pengembang dapat mengirim 100 TAZ dari satu alamat Testnet ke alamat lainnya untuk menguji fitur dompet tanpa mempertaruhkan ZEC yang asli.

Anggaplah TAZ sebagai **"uang mainan" untuk Zcash Testnet**.


## Apa Itu Faucet?

Sebuah **faucet** adalah layanan yang memberikan koin TAZ gratis untuk keperluan pengujian:

- Biasanya berupa situs web atau API
- Pengguna menyediakan alamat Testnet; faucet akan mengirimkan sejumlah kecil TAZ
- Menghindari kebutuhan untuk menambang TAZ secara manual

**Contoh:**  
1. Kunjungi faucet Testnet (misalnya, [fauzec.com](https://fauzec.com/) | [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz/))  
2. Masukkan alamat Testnet kamu  
3. Minta TAZ  
4. Terima TAZ secara instan untuk mulai melakukan pengujian

**Mengapa ini penting:**  
- Pengujian aman tanpa mempertaruhkan ZEC  
- Aksesibilitas bagi pemula dan pengembang  
- Prototyping cepat untuk dompet, exchange, dan aplikasi



## Dompet Zkool dan Zingo!

### Zkool

- Dompet multi-akun untuk pengguna Zcash tingkat lanjut
- Mendukung frasa pemulihan, viewing key, serta alamat transparan dan terlindungi
- Dapat terhubung ke Mainnet, Testnet, atau Regtest melalui full node atau server light wallet

### Zingo!

- Dompet mobile yang berfokus pada privasi dan kesederhanaan
- Mendukung alamat terlindungi dan unified
- Diperbarui untuk mendukung protokol Testnet (termasuk NU6 Testnet)

## Mengaktifkan Testnet di Dompet

### Dompet Zkool

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/XCGwwqLZILg"
    title="Testnet Zkool"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div >

**Tips:**  
- Dompet mungkin akan memulai ulang saat berpindah jaringan  
- Akun Mainnet ZEC tidak terpengaruh  
- Gunakan server lightwallet Testnet jika diminta

### Dompet Zingo!

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/To7WAkiBldA"
    title="Testnet Zingo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div >


Setelah diaktifkan, dompet dapat mengirim dan menerima TAZ, menguji transaksi terlindungi, dan bereksperimen dengan aman.


## Setelah Mengaktifkan Testnet

- Transaksi berperilaku seperti Mainnet tetapi dengan **TAZ bernilai nol**
- Transaksi terlindungi, beberapa alamat, dan fitur privasi dapat diuji
- Developer dapat melakukan debugging dan menguji fitur tanpa mempertaruhkan ZEC asli


## Ringkasan Cepat

- **Testnet Zcash** adalah lingkungan sandbox yang aman untuk membangun, menguji, dan bereksperimen  
- Kasus penggunaan: pengujian developer, pengujian node, integrasi exchange, penelitian, dan edukasi  
- **Koin TAZ** digunakan sebagai pengganti ZEC dan tidak memiliki nilai nyata  
- Testnet sangat penting sebelum meluncurkan fitur secara live di Mainnet