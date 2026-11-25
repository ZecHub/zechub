<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zaino.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Indexer Zaino

## Ringkasan Singkat

* **Zebra** memvalidasi chain Zcash.
* **Zaino** mengindeks data chain Zebra dan menyediakan API yang dapat diakses oleh client.
* **Zallet** adalah komponen dompet dalam stack Z3. Dalam pengaturan Z3 default, Zallet berkomunikasi langsung dengan Zebra dan tidak memerlukan layanan Zaino yang berdiri sendiri.
* Layanan Zaino yang berdiri sendiri berguna ketika operator membutuhkan endpoint gRPC yang kompatibel dengan lightwalletd, proxy JSON-RPC, atau infrastruktur untuk dompet ringan, explorer, faucet, dan layanan serupa lainnya.
* Zaino adalah infrastruktur aktif, namun operator harus memeriksa dokumentasi resmi Zaino dan Z3 untuk detail deployment saat ini sebelum menjalankannya di lingkungan produksi.

## Penjelasan Inti

Zaino adalah pengindeks Rust untuk blockchain Zcash. Layanan ini membaca data chain dari full node Zebra. Layanan ini menyediakan data yang diperlukan dompet, penjelajah, faucet, dan layanan lain, tanpa membebani Zebra dengan tanggung jawab untuk setiap indeks yang digunakan klien.

### Fungsi Zaino

Zaino berada di antara Zebra dan perangkat lunak klien. Zebra adalah node konsensus: ia mengunduh, memverifikasi, dan mengikuti blockchain Zcash. Zaino menggunakan Zebra sebagai sumber data chain miliknya, lalu menyiapkan tampilan terindeks yang dapat dikueri secara efisien oleh aplikasi klien.

Pemisahan ini menjaga peran tetap jelas:

| Komponen | Peran |
|:--|:--|
| Zebra | Full node dan validator |
| Zaino | Indexer dan layanan API yang menghadap ke client |
| Zallet | Layanan dompet |
| lightwalletd | Server light wallet lama yang dirancang untuk digantikan atau dilengkapi oleh Zaino |

Zaino menyediakan fungsionalitas untuk light client, full client atau dompet, serta penjelajah blok. Layanan ini memberikan akses ke chain yang telah difinalisasi, best chain yang belum difinalisasi, dan data mempool yang disimpan oleh Zebra.

### Perannya dalam Zcash Stack Saat Ini

Stack Z3 saat ini dibangun di sekitar Zebra, Zallet, dan Zaino opsional.

Dalam penerapan Z3 default, Zebra dan Zallet berjalan bersama. Zallet menjangkau Zebra secara langsung, sehingga operator yang hanya menjalankan stack dompet lokal tidak perlu memulai layanan Zaino standalone.

Zaino ditambahkan saat operator ingin melayani klien eksternal. Di Z3, ini berjalan di balik profil `indexer` Compose dan menambahkan:

* sebuah endpoint gRPC yang kompatibel dengan lightwalletd untuk client dompet ringan
* sebuah proxy JSON-RPC untuk explorer, faucet, dan backend layanan
* sebuah database indexer yang terpisah dari status chain Zebra

Hal ini membuat Zaino menjadi sangat relevan bagi backend dompet, operator infrastruktur publik, explorer, faucet, dan developer yang menguji layanan yang membutuhkan data rantai Zcash yang terindeks.

### Zaino dan lightwalletd

lightwalletd adalah server light wallet asli. Zaino adalah jalur penerus berbasis Rust untuk peran ini. Tujuannya adalah untuk menyediakan API yang kompatibel jika memungkinkan sehingga dompet dan layanan dapat bermigrasi tanpa harus ditulis ulang sepenuhnya secara sekaligus.

Hal ini tidak berarti setiap penerapan lightwalletd telah beralih ke Zaino. Operator harus memperlakukan Zaino sebagai bagian dari stack berbasis Zebra saat ini dan memeriksa dokumentasi proyek, rilis, serta dashboard layanan terbaru sebelum memilih apa yang akan dijalankan.

## Visual / Analogi

Bayangkan blockchain Zcash sebagai arsip besar yang berisi halaman-halaman buku besar.

Zebra adalah petugas arsip. Ia menerima setiap halaman baru, memeriksa apakah halaman itu mengikuti aturan, lalu menyimpannya di tempat yang tepat.

Zaino adalah meja referensi di depan arsip. Meja ini membaca apa yang telah disimpan oleh Zebra, membuat katalog agar pencarian cepat, dan menjawab pertanyaan pengunjung dengan segera. Dompet ringan, penjelajah, dan faucet datang ke meja ini dengan pertanyaan seperti "apa isi blok ini?" atau "transaksi apa yang sedang menunggu di mempool?". Meja referensi tidak pernah menentukan halaman mana yang asli. Tugas itu menjadi tanggung jawab petugas arsip.

Dalam konfigurasi Z3 default, Zallet bekerja di gedung yang sama dan langsung menemui petugas arsip. Komponen ini tidak memerlukan meja referensi.

### Beberapa diagram yang menunjukkan cara kerja Zaino

#### Arsitektur Internal Zaino

![Arsitektur Internal Zaino](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

#### Arsitektur Layanan Aktif Zaino

![Arsitektur Layanan Langsung Zebra](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

#### Arsitektur Sistem Zaino

![Arsitektur Sistem Zaino](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Penjelasan Mendalam

### Catatan untuk Operator

Jalur penyebaran otoritatif yang paling mudah adalah repositori Z3. Z3 menyertakan Zaino sebagai layanan opsional:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Jalankan pengaturan Z3 normal terlebih dahulu dan tunggu hingga Zebra tersinkronisasi sebelum memulai layanan dependen pada mainnet atau testnet.

Zaino menyediakan dua jenis layanan jaringan. Layanan gRPC adalah API untuk lightwallet. Layanan JSON-RPC ditujukan untuk loopback atau jaringan privat tepercaya, kecuali ada lapisan eksternal yang menyediakan perlindungan. Jangan mengekspos endpoint JSON-RPC tanpa autentikasi atau enkripsi ke internet publik.

## Kesalahan Umum

**Menganggap Zaino sebagai sebuah full node.** Zaino bukanlah validatornya. Zebra memvalidasi rantai; Zaino mengindeks data dari Zebra.

**Mengasumsikan setiap penerapan Z3 memerlukan Zaino mandiri.** Zallet dapat menjangkau Zebra secara langsung dalam stack Z3 default. Mulai Zaino saat Anda membutuhkan layanan indexer mandiri untuk klien eksternal.

**Menyajikan fitur yang direncanakan seolah-olah sudah diterapkan.** Zaino dikembangkan secara aktif, jadi periksalah catatan rilis dan dokumentasi terbaru sebelum mendeskripsikan sebuah fitur sebagai fitur yang tersedia.

**Mengekspos JSON-RPC secara sembarangan.** Antarmuka JSON-RPC dari Zaino ditujukan untuk loopback atau jaringan privat terpercaya kecuali jika dilindungi oleh lapisan lain.

## Halaman Terkait

- [Node Lightwallet](/zcash-tech/lightwallet-nodes): server yang digunakan dompet ringan untuk terhubung, lightwalletd dan Zaino, serta cara beralih di antaranya.
- [Zinder](/zcash-tech/zinder), pengindeks Rust lainnya, dari Zcash Foundation (alfa)
- [Full Node Zebra](/zcash-tech/zebra-full-node): node tempat Zaino membaca data chain-nya.
- [Zallet](/zcash-tech/zallet): dompet full node di stack Z3.
- [Stack Z3](/zcash-tech/z3-stack): Zebra, Zallet, dan pengindeks Zaino opsional yang dikemas bersama.
- [Benchmark Pengindeks: Zaino vs Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer): perbandingan yang dapat direproduksi antara dua pengindeks lightwallet.
- [Full Node](/zcash-tech/full-nodes): ikhtisar perangkat lunak full node Zcash.
- [Sinkronisasi Dompet Zcash](/zcash-tech/zcash-wallet-syncing): alasan dompet terlindungi memerlukan proses sinkronisasi.

### Sumber

* [Repositori GitHub Zaino](https://github.com/zingolabs/zaino)
* [Rilis Zaino ](https://github.com/zingolabs/zaino/releases)
* [Dokumentasi yang dihasilkan Zaino ](https://zingolabs.github.io/zaino/)
* [Repositori deployment Z3](https://github.com/ZcashFoundation/z3)
* [Dokumentasi Zebra ](https://zebra.zfnd.org/)
* [Diskusi hibah dan proyek Zaino ](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Terakhir diperbarui:** November 2026
