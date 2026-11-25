<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zaino.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zaino Pengindeks

## Ringkasan

* **Zebra** memvalidasi chain Zcash.
* **Zaino** mengindeks data chain milik Zebra dan menyediakan API untuk klien.
* **Zallet** adalah komponen dompet dalam stack Z3. Dalam konfigurasi Z3 default, Zallet terhubung langsung ke Zebra dan tidak memerlukan layanan mandiri Zaino.
* Layanan mandiri Zaino berguna saat operator memerlukan endpoint gRPC yang kompatibel dengan lightwalletd, proxy JSON-RPC, atau infrastruktur untuk dompet ringan, penjelajah, faucet, dan layanan serupa.
* Zaino adalah infrastruktur aktif, tetapi operator sebaiknya memeriksa Zaino resmi dan dokumentasi Z3 untuk mengetahui detail deployment terkini sebelum menjalankannya di lingkungan produksi.

## Penjelasan Inti

Zaino adalah pengindeks Rust untuk blockchain Zcash. Layanan ini membaca data chain dari full node Zebra. Layanan ini menyediakan data yang diperlukan dompet, penjelajah, faucet, dan layanan lain, tanpa membebani Zebra dengan tanggung jawab untuk setiap indeks yang digunakan klien.

### Fungsi Zaino

Zaino berada di antara Zebra dan perangkat lunak klien. Zebra adalah node konsensus: node ini mengunduh, memverifikasi, dan mengikuti blockchain Zcash. Zaino menggunakan Zebra sebagai sumber data chain, lalu menyiapkan tampilan terindeks yang dapat dikueri secara efisien oleh aplikasi klien.

Pemisahan ini memperjelas peran setiap komponen:

| Komponen | Peran |
|:--|:--|
| Zebra | Full node dan validator |
| Zaino | Pengindeks dan layanan API untuk klien |
| Zallet | Layanan dompet |
| lightwalletd | Server dompet ringan lama yang dirancang untuk digantikan atau dilengkapi oleh Zaino |

Zaino menyediakan fungsionalitas untuk light client, full client atau dompet, serta penjelajah blok. Layanan ini memberikan akses ke chain yang telah difinalisasi, best chain yang belum difinalisasi, dan data mempool yang disimpan oleh Zebra.

### Perannya dalam Zcash Stack Saat Ini

Stack Z3 saat ini dibangun dengan Zebra, Zallet, dan Zaino opsional.

Dalam deployment Z3 default, Zebra dan Zallet berjalan bersama. Zallet terhubung langsung ke Zebra, sehingga operator yang hanya menjalankan stack dompet lokal tidak perlu memulai layanan mandiri Zaino.

Zaino ditambahkan saat operator ingin melayani klien eksternal. Di Z3, layanan ini berjalan melalui profil Compose `indexer` dan menyediakan:

* endpoint gRPC yang kompatibel dengan lightwalletd untuk klien dompet ringan
* proxy JSON-RPC untuk penjelajah, faucet, dan backend layanan
* database pengindeks yang terpisah dari state chain Zebra

Karena itu, Zaino sangat relevan bagi backend dompet, operator infrastruktur publik, penjelajah, faucet, dan developer yang menguji layanan yang memerlukan data chain Zcash terindeks.

### Zaino dan lightwalletd

lightwalletd adalah server dompet ringan yang asli. Zaino adalah jalur penerus berbasis Rust untuk peran ini. Tujuannya adalah menyediakan API yang kompatibel jika memungkinkan, agar dompet dan layanan dapat bermigrasi tanpa harus langsung ditulis ulang sepenuhnya.

Namun, ini tidak berarti setiap deployment lightwalletd telah beralih ke Zaino. Operator sebaiknya menganggap Zaino sebagai bagian dari stack berbasis Zebra saat ini dan memeriksa dokumentasi proyek, rilis, serta dashboard layanan terbaru sebelum menentukan layanan yang akan dijalankan.

## Visual / Analogi

Bayangkan blockchain Zcash sebagai arsip besar yang berisi halaman-halaman buku besar.

Zebra adalah petugas arsip. Ia menerima setiap halaman baru, memeriksa apakah halaman itu mengikuti aturan, lalu menyimpannya di tempat yang tepat.

Zaino adalah meja referensi di depan arsip. Meja ini membaca apa yang telah disimpan oleh Zebra, membuat katalog agar pencarian cepat, dan menjawab pertanyaan pengunjung dengan segera. Dompet ringan, penjelajah, dan faucet datang ke meja ini dengan pertanyaan seperti "apa isi blok ini?" atau "transaksi apa yang sedang menunggu di mempool?". Meja referensi tidak pernah menentukan halaman mana yang asli. Tugas itu menjadi tanggung jawab petugas arsip.

Dalam konfigurasi Z3 default, Zallet bekerja di gedung yang sama dan langsung menemui petugas arsip. Komponen ini tidak memerlukan meja referensi.

### Beberapa diagram yang menunjukkan cara kerja Zaino

#### Arsitektur Internal Zaino

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

#### Arsitektur Layanan Aktif Zaino

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

#### Arsitektur Sistem Zaino

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Penjelasan Mendalam

### Catatan untuk Operator

Cara deployment resmi yang paling mudah adalah melalui repositori Z3. Z3 menyertakan Zaino sebagai layanan opsional:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Jalankan konfigurasi Z3 biasa terlebih dahulu dan tunggu hingga Zebra selesai disinkronkan sebelum memulai layanan yang bergantung padanya di mainnet atau testnet.

Zaino menyediakan dua jenis layanan jaringan. Layanan gRPC adalah API untuk lightwallet. Layanan JSON-RPC ditujukan untuk loopback atau jaringan privat tepercaya, kecuali ada lapisan eksternal yang menyediakan perlindungan. Jangan mengekspos endpoint JSON-RPC tanpa autentikasi atau enkripsi ke internet publik.

## Kesalahan Umum

**Menganggap Zaino sebagai full node.** Zaino bukan validator. Zebra memvalidasi chain; Zaino mengindeks data dari Zebra.

**Menganggap setiap deployment Z3 memerlukan Zaino mandiri.** Zallet dapat terhubung langsung ke Zebra dalam stack Z3 default. Jalankan Zaino jika Anda memerlukan layanan pengindeks mandiri untuk klien eksternal.

**Menyajikan fitur yang direncanakan seolah-olah sudah tersedia.** Zaino terus dikembangkan secara aktif, jadi periksa catatan rilis dan dokumentasi terkini sebelum menyatakan suatu fitur telah tersedia.

**Mengekspos JSON-RPC tanpa kehati-hatian.** Antarmuka JSON-RPC Zaino ditujukan untuk loopback atau jaringan privat tepercaya, kecuali dilindungi oleh lapisan lain.

## Halaman Terkait

- [Node Lightwallet](/zcash-tech/lightwallet-nodes): server yang digunakan dompet ringan untuk terhubung, lightwalletd dan Zaino, serta cara beralih di antaranya.
- [Zinder](/zcash-tech/zinder), pengindeks Rust lainnya, dari Zcash Foundation (alfa)
- [Zebra Full Node](/zcash-tech/zebra-full-node): node tempat Zaino membaca data chain-nya.
- [Zallet](/zcash-tech/zallet): dompet full node di stack Z3.
- [Stack Z3](/zcash-tech/z3-stack): Zebra, Zallet, dan pengindeks Zaino opsional yang dikemas bersama.
- [Benchmark Pengindeks: Zaino vs Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer): perbandingan yang dapat direproduksi antara dua pengindeks lightwallet.
- [Full Node](/zcash-tech/full-nodes): ikhtisar perangkat lunak full node Zcash.
- [Zcash Sinkronisasi Dompet](/zcash-tech/zcash-wallet-syncing): alasan dompet terlindungi memerlukan proses sinkronisasi.

### Sumber

* [Zaino repositori GitHub](https://github.com/zingolabs/zaino)
* [Zaino rilis ](https://github.com/zingolabs/zaino/releases)
* [Zaino dokumentasi yang dihasilkan ](https://zingolabs.github.io/zaino/)
* [Repositori deployment Z3](https://github.com/ZcashFoundation/z3)
* [Zebra dokumentasi ](https://zebra.zfnd.org/)
* [Zaino diskusi hibah dan proyek ](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Terakhir diperbarui:** November 2026
