# Zcash Avalanche RedBridge

Zcash Avalanche RedBridge adalah bridge terdesentralisasi yang memungkinkan interoperabilitas antara blockchain Zcash (ZEC) dan Avalanche (AVAX). Bridge ini dirancang untuk memfasilitasi transfer ZEC secara mulus ke dalam blockchain Avalanche, dengan memanfaatkan throughput tinggi, biaya rendah, dan mekanisme konsensus ramah lingkungan dari Avalanche sambil tetap mempertahankan fitur-fitur yang berpusat pada privasi dari Zcash.

RedBridge mendukung berbagai macam kegunaan, termasuk keuangan terdesentralisasi (DeFi) lintas-chain, transaksi privat, dan berbagi likuiditas, yang memberdayakan pemegang Zcash dengan aksesibilitas yang lebih luas ke ekosistem Avalanche. Bridge ini dioperasikan melalui sekumpulan node terdesentralisasi dan sebuah oracle, yang dikenal sebagai **ZavaX**, yang memastikan transfer data dan verifikasi harga yang andal antara Zcash dan Avalanche.

### Fitur Utama

Interoperabilitas Pelestari Privasi: Memungkinkan pengguna Zcash untuk menjaga privasi saat menggunakan aplikasi DeFi di Avalanche.
Oracle Terdesentralisasi ZavaX: Mengintegrasikan sistem oracle untuk memastikan data harga ZEC/AVAX yang akurat, memungkinkan operasi crosschain tanpa memerlukan kepercayaan (trustless).
Skalabel dan Ramah Lingkungan: Menggunakan model konsensus Avalanche, menyediakan transaksi berkecepatan tinggi dengan dampak lingkungan yang minimal.
Dukungan untuk DeFi dan DApps: Pemegang Zcash kini dapat berpartisipasi dalam berbagai platform DeFi di Avalanche tanpa mengorbankan privasi.

### Komponen Teknis

**ZavaX Oracle Terdesentralisasi**
Deskripsi: Oracle ZavaX sangat krusial bagi bridge, menyediakan feed harga crosschain dan memungkinkan konversi ZEC ke AVAX secara trustless.
[Tautan ke Oracle](https://zavax-oracle.red.dev)

**Kontrak Cross Chain Bridge**
Deskripsi: Arsitektur smart contract yang mendukung bridge Zcash Avalanche, menangani deposit, konversi, dan penarikan ZEC.

**Integrasi Lapisan Privasi**
Deskripsi: Memastikan bahwa fitur privasi Zcash tetap terjaga selama proses bridging, yang memungkinkan terjadinya transaksi lintas chain secara privat.

## Hasil Akhir dan Dokumentasi

**Jembatan Elastic Subnet Zcash pada Avalanche**: [Proposal Hibah](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/)
Berikut adalah hasil utama dan sumber daya teknis yang telah diselesaikan untuk proyek Zcash Avalanche RedBridge:

Deliverable 1.1: PoC Awal yang mendukung kueri transaksi Zcash testnet dari subnet Avalanche testnet menggunakan CLI, dipublikasikan di Github dan dengan satu subnet node pada Avalanche testnet. https://github.com/red-dev-inc/zavax-oracle

Deliverable 2.1: Arsitektur [](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)


### Milestone 3 31 Maret 2024

Deliverable 3.1 telah selesai, menyajikan analisis kami mengenai penggunaan FROST dibandingkan BLS untuk threshold signatures pada bridge ZavaX. Perubahan ini memanfaatkan library yang telah diaudit dari Zcash Foundation dan memfasilitasi integrasi serta keamanan yang lebih baik. https://github.com/ZcashFoundation/frost

Deliverable 3.2 desain UX dan UI untuk GUI telah selesai, merinci peningkatan keamanan kami untuk subnet ZavaX Oracle, didukung oleh hasil penetration testing. Untuk detail lebih lanjut, termasuk konfigurasi server dan hasil pengujian [Penilaian Keamanan](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/deployment-notes.md)
[Laporan Audit](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/pen-testing-report-2024-09.md)
Selain itu, tim telah melakukan rebranding dari ZavaX menjadi redbridge dan mengubah token staking kami dari ZAX menjadi RBR.

### Milestone 4 30 April 2024
Hasil kerja 4.1 Deployment yang berfungsi penuh ke Zcash dan testnet Avalanche, dengan 3 validator Subnet, dengan dukungan CLI

### Milestone 5 31 Mei 2024
Hasil Kerja 5.1 GUI: integrasi bridge ke dalam Core atau Webapp

Milestone 6 30 Juni 2024
Deliverable 6.1 Berhasil melewati audit perangkat lunak
Deliverable 6.2 Publikasi kode sumber yang telah diaudit ke repo Github publik

Lihat repositori GitHub [](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)
  
Untuk detail teknis lebih lanjut, pengguna disarankan untuk meninjau repositori dan dokumentasi proyek RedBridge untuk [menjelajahi](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/) spesifikasi integrasi, kerangka kerja pengujian, dan protokol keamanan.


![img1](/content-images/b8c5d267-1711-458a-8a32-1df9d56fae8a-a93ff66932.webp)


* Hasil: 
Pada Q1 2025, tim mengumumkan peluncuran situs web demo [red·bridge](https://redbridge-demo.red.dev/index.html), di mana siapa pun dapat mencoba pengalaman pengguna, memberikan umpan balik, dan menyarankan peningkatan. Situs ini juga berfungsi sebagai cara mudah untuk memperkenalkan proyek ini kepada orang-orang non-teknis.

* Tim menggunakan Zebra untuk versi final dari red·bridge. Untuk mengujinya, mereka meningkatkan dua dari tiga node di blockchain pengujian mereka, ZavaX Oracle, yang berjalan di testnet Fuji milik Avalanche. Node terakhir berhasil ditingkatkan, sekarang [Zavax Oracle](https://web.archive.org/web/20260823181644/https://zavax-oracle.red.dev/) kini berjalan di Zebra!

* Pada Q1 tahun 2025, situs web red.bridge dikodekan untuk menawarkan empat tampilan yaitu merah, Dark, Light, dan Zebra sebagai lawan dari versi awal, yang hanya berwarna merah.

* Poin lainnya adalah tim akan mengaktifkan red·bridge L1 secara langsung di mainnet Avalanche pada Desember 2025. Pada awalnya, ini akan berfungsi sebagai oracle untuk blockchain Zcash dan kemudian, segera setelah itu, untuk Bitcoin juga. Di mana setiap permintaan akan memakan biaya 0.001 AVAX dalam token gas. Pengembangan ini akan memungkinkan L1 atau smart contract apa pun di Avalanche untuk melakukan kueri data dari Zcash dan Bitcoin secara murah dengan cara yang terdesentralisasi.

* Di Q2, tim mengajukan milestone ACP-77 (dikenal sebagai Avalanche9000) kepada Avalanche Foundation untuk membuat pengoperasian guardian red.bridge menjadi lebih awal dan lebih terjangkau bagi semua orang. Pada awalnya, validator perlu melakukan staking sekitar 2000 AVAX; namun, dengan biaya Avalanche9000, validator hanya membutuhkan 1 AVAX (per bulan). Selain itu, milestone ini juga memfinalisasi rencana untuk menggunakan implementasi FROST dari ZF, yang memberikan setiap Guardian sebuah signing share untuk kontrol dompet bridge yang aman dan terdistribusi.

* Pada Q1 dan Q2 tahun 2026, red.bridge akan mengadakan airdrop token RBR (sebelumnya ZAX) untuk anggota komunitas Zcash dan Avalanche. Menurut pendiri red.dev, mereka akan mengadakan incentivized testnet di mana pengguna akan memiliki kesempatan untuk mendapatkan RBR sambil membantu menguji bridge tersebut.


