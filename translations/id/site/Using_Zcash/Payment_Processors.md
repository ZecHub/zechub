<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Pemroses Pembayaran Zcash

Cara menerima ZEC sebagai merchant, dibandingkan secara berdampingan. Setiap entri telah diperiksa terhadap situs dan API penyedia itu sendiri pada **29 Juli 2026**.

Dukungan untuk aset privasi sering berubah, jadi setiap baris menyertakan tanggal verifikasi masing-masing. Jika kamu membaca ini beberapa bulan kemudian, periksa kembali situs penyedia sebelum kamu melakukan integrasi.

<div class="processor-table">

| Processor | Kustodial | ZEC Terlindungi | Self-host | Biaya merchant | Wilayah / KYC | Terverifikasi |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | Non-kustodial | Ya, Orchard melalui Unified Addresses | Ya, open source | 1% per pembayaran, gratis jika self-hosted | Tanpa KYC, wilayah tidak disebutkan | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | Non-kustodial, hanya viewing key | Ya, hanya terlindungi (Sapling, Orchard, UA) | Ya, open source | Tidak ada, kamu hanya membayar biaya jaringan | Global, tanpa KYC | 2026-07-29 |
| [ZGo](https://zgo.cash/) | Non-kustodial | Ya, Sapling dan Orchard | Tidak, layanan terhosting | Sesi prabayar, harga tidak dipublikasikan | KYC tidak disebutkan, wilayah tidak disebutkan | 2026-07-29 |
| [Flexa](https://flexa.co/) | Self-kustodial pelanggan, merchant menyelesaikan dalam fiat | Pelanggan menggunakan transaksi terlindungi, sisi penerima tidak didokumentasikan | Tidak | 1% per pembayaran | AS dan 37 negara SEPA, ZEC di EU belum dikonfirmasi | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | Non-kustodial secara default | Tidak, hanya alamat transparan | Tidak | 0,5%, atau 1% dengan konversi | Global kecuali di tempat yang dilarang, tanpa KYC untuk memulai | 2026-07-29 |
| [Plisio](https://plisio.net/accept-zcash) | Kustodial, terlepas dari pemasarannya | Tidak didokumentasikan | Tidak | 0,5% API, 1,5% white label | Tanpa KYC untuk menerima | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | Kustodial, off-chain | Tidak, deposit terlindungi ditolak | Tidak | Gratis wallet ke wallet, 0,8% pembayaran | Terbatas secara geografis, ZEC dihapus dari daftar di FR, ES, IT, PL | 2026-07-29 |

</div>

### Arti dari kolom-kolom tersebut

**Kustodial** adalah apakah pemroses menyimpan ZEC milikmu. Non-kustodial berarti dana tersebut masuk ke dompet yang kamu kendalikan.

**ZEC terlindungi** adalah apakah kamu bisa menerima pembayaran ke dalam pool terlindungi. Transparan hanya berarti jumlah dan alamat bersifat publik di blockchain.

**Self-host** adalah kemampuan kamu untuk menjalankan perangkat lunak sendiri, tanpa ada perusahaan di tengahnya.

**Biaya merchant** tidak termasuk biaya jaringan Zcash, yang harus dibayar seseorang dalam setiap kasus.

Jika penyedia tidak memublikasikan sesuatu, entri tersebut akan bertuliskan "tidak dinyatakan" atau "tidak didokumentasikan" alih-alih menebak. Hal itu tidak sama dengan "tidak ada".

### Mana yang harus kamu pilih

Untuk privasi dan kontrol maksimal, gunakan **BTCPay Server** atau **CipherPay** yang di-host sendiri. Keduanya bersifat terlindungi, open source, dan tidak menyimpan dana milikmu.

Untuk menerima pembayaran di toko alih-alih secara daring, gunakan **Flexa**.

Untuk gateway terkelola di mana pembayaran transparan dapat diterima, gunakan **NOWPayments** atau **Plisio**.

Satu peringatan yang perlu diulang kembali: pemroses yang hanya mendukung transaksi transparan akan memublikasikan setiap jumlah pembayaran dan alamat ke blockchain. Dan dengan pemroses non-kustodial terkelola apa pun, kamu menyerahkan viewing key milikmu, sehingga perusahaan tersebut dapat melihat pembayaran kamu meskipun mereka tidak dapat membelanjakannya. Self-hosting adalah satu-satunya cara untuk menghindari hal tersebut.

<div class="processor-note">

**Peringatan layanan ZGo, 29 Juli 2026.** Backend ZGo di api.zgo.cash mengembalikan HTTP 503 pada setiap endpoint saat halaman ini sedang diperiksa. Proyek ini tidak ditinggalkan dan pengelolanya aktif dalam komunitas bulan ini, tetapi pastikan layanan sedang berjalan sebelum kamu mengandalkannya.

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="logo CipherPay" class="processor-logo" />
- **Tipe Dukungan**: Terlindungi (Orchard, melalui Unified Addresses)
- **Deskripsi**: Terima Zcash dalam hitungan menit, Non-kustodial, Tanpa data pembeli, Tanpa perantara.
- **URL**: [CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="logo CipherPay" width="200" hidden />

Kamu memberikan CipherPay sebuah viewing key yang hanya bisa melihat, sehingga pembayaran langsung masuk ke dompet kamu sendiri dan ia tidak pernah menyimpan dana. Ia menggunakan alamat baru untuk setiap invoice.

Hanya Orchard. Tidak ada dukungan Sapling atau transparan, meskipun README repositori menyebutkan Sapling.

Biayanya adalah 1% per pembayaran, dan tidak ada biaya sama sekali jika kamu menjalankannya sendiri. Seluruh sistem ini bersifat open source, baik sebagai biner Rust dengan SQLite maupun sebagai image Docker. Tidak ada KYC, dan pembeli tidak memerlukan akun.

Integrasi mencakup Shopify, WooCommerce, REST API, checkout yang dihosting, tautan pembayaran, dan QR tatap muka.

Ada dua hal yang perlu dipertimbangkan. Layanan ini diluncurkan pada Februari 2026 dan belum memiliki audit keamanan yang dipublikasikan. Dan pada tier hosted, operator memegang viewing key kamu, sehingga mereka dapat melihat pembayaran kamu. Self-hosting menghilangkan risiko tersebut. Pembayaran terlindungi juga bersifat final, jadi pengembalian dana memerlukan pembeli untuk memberikan alamat kepada kamu.

**Terakhir diverifikasi:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="logo BTCPay Server" class="processor-logo" />
- **Tipe Dukungan**: Hanya terlindungi (Sapling, Orchard, Unified Address)
- **Deskripsi**: BTCPay Server adalah pemroses pembayaran cryptocurrency open-source yang dapat di-host sendiri.
- **URL**: [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="logo BTCPay Server" width="200" hidden />

Opsi terkuat untuk kustodial. Backend dompetnya hanya dapat dilihat (view-only) dan tidak menyimpan frasa pemulihan atau secret key, sehingga bahkan jika server berhasil dikompromi, uang kamu tetap aman dari pengeluaran ilegal.

Hanya terlindungi, mencakup Sapling, Orchard dan Alamat Terpadu (Unified Addresses). Tidak ada fallback transparan, jadi jangan membuat rencana berdasarkan hal tersebut.

Untuk menginstalnya, kamu memerlukan fork Docker btcpay-zcash pada branch feat/zec, ditambah dengan viewing key yang diekspor dari dompet seperti Zkool atau Zingo. Secara default, ia berkomunikasi dengan lightwalletd jarak jauh, atau kamu bisa menjalankan Zebra dan lightwalletd sendiri.

Satu batasan yang perlu kamu ketahui: plugin ini menggunakan satu dompet Zcash untuk setiap toko pada sebuah instance, jadi jangan menjalankannya di server bersama. Dompet per-toko sedang dalam tahap pengerjaan.

Tidak ada biaya untuk perangkat lunaknya sendiri. Kamu membayar biaya jaringan Zcash dan biaya hosting apa pun yang kamu keluarkan.

**Terakhir diverifikasi:** 2026-07-29

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="logo ZGo" class="processor-logo" />
- **Tipe Dukungan**: Terlindungi (Sapling dan Orchard)
- **Deskripsi**: ZGo adalah platform pembayaran elektronik yang berjalan langsung dari pelanggan kamu ke kamu, tanpa melibatkan pihak ketiga.
- **URL**: [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="logo ZGo" width="200" hidden />

Sebuah mesin kasir yang kamu jalankan di browser, sehingga laptop, tablet, atau ponsel menjadi tempat pembayaran. Tersedia juga plugin WooCommerce dan REST API. Ini dibangun oleh Vergara Technologies dan didanai oleh Zcash Community Grants, termasuk perpindahan dari zcashd ke Zebra.

Dana langsung dikirim dari pelanggan ke dompet kamu, tanpa ada perantara.

Terlindungi, mencakup Sapling dan Orchard melalui Alamat Terpadu (Unified Addresses), dan mengikuti ZIP 321. Tidak ada sumber saat ini yang menyatakan bahwa ini menangani alamat transparan, jadi halaman ini tidak lagi mengklaim hal tersebut.

Kamu tidak benar-benar bisa melakukan self-host sendiri. ZGo menjalankan infrastruktur Zcash untuk kamu dan tidak memublikasikan panduan deployment apa pun. Kode sumbernya tersedia secara publik di server Git milik pengembang, meskipun salinan GitLab yang biasanya ditemukan orang adalah mirror tahun 2022 yang sudah usang.

Ini juga tidak gratis. ZGo menjual sesi prabayar dan membutuhkan sesi Pro untuk WooCommerce, tetapi halaman harga saat ini tidak dapat diakses, sehingga tidak ada angka yang dicantumkan di sini.

**Terakhir diverifikasi:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="logo Flexa" class="processor-logo" />
- **Tipe Dukungan**: Pelanggan membelanjakan aset terlindungi, sisi penerima tidak didokumentasikan
- **Deskripsi**: Flexa adalah jaringan pembayaran yang memungkinkan pelanggan membelanjakan aset digital, termasuk Zcash, di lokasi ritel dari dompet self-custody.
- **URL**: [Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="logo Flexa" width="200" hidden />

Flexa bukanlah gateway checkout, jadi ini bukan sebuah swap untuk yang lainnya di sini. Pelanggan membuka dompet yang mendukung Flexa seperti Zodl, menunjukkan kode sekali pakai, dan toko memindainya. Tidak ada invoice ZEC dan tidak ada plugin e-commerce.

Pelanggan menyimpan koin mereka sendiri hingga saat mereka melakukan pembayaran. Kamu sebagai pedagang tidak pernah menerima ZEC. Flexa akan menyelesaikan pembayaran denganmu dalam mata uang yang kamu pilih, sehingga sisi kripto ditangani oleh mereka.

Pengumuman resmi dari Flexa mendeskripsikan integrasi Zcash sebagai pembayaran menggunakan ZEC terlindungi. Jenis alamat yang diterima oleh Flexa tidak dipublikasikan di mana pun.

Biayanya adalah 1% per pembayaran, dengan konversi dan kustodial sudah termasuk tanpa biaya tambahan.

Ini berfungsi di Amerika Serikat dan, sejak Juli 2026, di 37 negara dan wilayah SEPA. Apakah ZEC secara khusus dapat dibelanjakan di Eropa tidak dinyatakan.

**Terakhir diverifikasi:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="logo NOWPayments" class="processor-logo processor-logo-wide" />
- **Tipe Dukungan**: Hanya transparan
- **Deskripsi**: NOWPayments adalah gateway pembayaran crypto yang memungkinkan merchant untuk menerima pembayaran dan donasi Zcash dengan mudah.
- **URL**: [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="logo NOWPayments" width="200" hidden />

Tidak ada dukungan terlindungi. Dokumentasi mereka menyuruh kamu untuk mengatur alamat transparan untuk Zcash, dan ZEC adalah satu-satunya koin yang mereka tentukan dengan cara tersebut. Setiap pembayaran yang kamu terima bersifat publik di blockchain.

Non-kustodial secara default. FAQ mereka menyatakan bahwa mereka tidak menyimpan dana dan tidak pernah memegang private key. Terdapat saldo kustodial opsional, jadi periksa pengaturan akunmu jika kamu perlu memastikannya.

Biaya adalah 0,5% untuk pembayaran langsung, atau 1% untuk pembayaran multi-mata uang, tarif tetap, atau "biaya dibayar oleh pengguna", dengan tambahan biaya jaringan.

Tersedia secara global kecuali di mana hukum melarangnya. Kamu tidak memerlukan KYC untuk mulai menerima crypto, hanya diperlukan saat menarik fiat.

**Terakhir diverifikasi:** 2026-07-29

---

## [Plisio](https://plisio.net/accept-zcash) <img src="/content-images/plisio-wordmark.png" alt="Plisio logo" class="processor-logo processor-logo-wide" />
- **Tipe Dukungan**: Transparan (tidak didokumentasikan)
- **Deskripsi**: Plisio adalah gateway pembayaran cryptocurrency yang memungkinkan bisnis untuk menerima pembayaran Zcash.
- **URL**: [Plisio](https://plisio.net/accept-zcash)
<img src="/content-images/plisio-wordmark.png" alt="Plisio logo" width="200" hidden />

Anggaplah ini sebagai kustodial. Pemasaran Plisio menyebutnya non-kustodial, tetapi halaman bantuan mereka sendiri menjelaskan tentang saldo yang disimpan di platform, cold storage, dan proses penarikan. Klaim non-kustodial tersebut tidak dapat dikonfirmasi.

Plisio tidak pernah menyatakan jenis alamat Zcash mana yang digunakannya, jadi asumsikan transparan sampai seseorang mengonfirmasi sebaliknya.

Dompet ini gratis, gateway dan API dikenakan biaya 0,5%, dan White Label dikenakan biaya 1,5%. White Label adalah rebranding dari layanan hosting mereka, bukan self-hosting.

Kamu tidak memerlukan KYC untuk menerima pembayaran, dan tidak ada daftar negara yang dibatasi yang dipublikasikan.

**Terakhir diverifikasi:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="logo Binance Pay" class="processor-logo" />
- **Tipe Dukungan**: Hanya transparan, deposit terlindungi ditolak
- **Deskripsi**: Binance Pay adalah platform pembayaran cryptocurrency yang mendukung pembayaran Zcash.
- **URL**: [Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="logo Binance Pay" width="200" hidden />

Binance menolak ZEC yang dikirim dari alamat terlindungi. Penolakan tersebut adalah alasan mengapa alamat TEX dibuat.

Layanan ini sepenuhnya bersifat kustodial. Pembayaran berpindah secara off-chain di antara dompet Binance Pay, dan kamu memerlukan akun Binance yang telah terverifikasi.

Transfer antar dompet tidak dikenakan biaya, pembayaran merchant dikenakan biaya 0,8% dengan batas maksimal 5 USD, dan merchant Mini Program dikenakan biaya 1%.

Periksa ketersediaan di tempat kamu berada sebelum bergantung padanya. Binance Pay tidak ditawarkan di beberapa negara dan industri, ZEC telah dihapus daftarnya untuk pengguna di Prancis, Spanyol, Italia, dan Polandia sejak 2023, dan layanan di EEA telah terganggu di bawah MiCA.

**Terakhir diverifikasi:** 2026-07-29

---

### Tidak lagi menerima ZEC

Keduanya telah tercantum di sini sebelumnya. Daftar mata uang langsung milik masing-masing penyedia telah diperiksa pada 29 Juli 2026 dan Zcash sudah tidak ada lagi dari keduanya.

**CoinPayments** tidak mencantumkan ZEC dalam daftar koin v2, daftar legacy, atau API mata uang live miliknya, dan artikel Zcash miliknya sekarang dialihkan ke halaman beranda.

**CoinGate** tidak mencantumkan ZEC pada halaman mata uang yang didukung atau dalam API publiknya. Tidak ada pengumuman penghapusan daftar (delisting), sehingga alasan dan tanggalnya tidak diketahui.

Jika salah satu membawa kembali Zcash, tambahkan lagi dengan tanggal verifikasi yang baru.

### Menjaga agar halaman ini tetap akurat

Dukungan koin privasi terus berubah, jadi halaman ini hanya seakurat pengecekan terakhirnya. Saat kamu meninjaunya:

1. Periksa daftar mata uang milik penyedia itu sendiri atau API mereka. Daftar pihak ketiga sudah tidak diperbarui untuk kedua pemroses yang dihapus di atas.
2. Periksa tipe alamat Zcash mana yang didukung. "Mendukung Zcash" biasanya berarti hanya alamat transparan.
3. Perbarui tanggal verifikasi di dalam tabel dan di bagian penyedia tersebut.