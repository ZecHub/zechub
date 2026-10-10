# Zaino Indexer

Zaino adalah sebuah indexer Rust untuk blockchain Zcash. Ia membaca data chain dari sebuah Zebra full node dan menyajikan data yang dibutuhkan oleh dompet, explorer, faucet, dan layanan lainnya tanpa membuat Zebra itu sendiri bertanggung jawab atas setiap indeks yang menghadap ke klien.

## Ringkasan Singkat

* **Zebra** memvalidasi chain Zcash.
* **Zaino** mengindeks data chain Zebra dan menyediakan API yang dapat diakses oleh client.
* **Zallet** adalah komponen dompet dalam stack Z3. Dalam pengaturan Z3 default, Zallet berkomunikasi langsung dengan Zebra dan tidak memerlukan layanan Zaino yang berdiri sendiri.
* Layanan Zaino yang berdiri sendiri berguna ketika operator membutuhkan endpoint gRPC yang kompatibel dengan lightwalletd, proxy JSON-RPC, atau infrastruktur untuk dompet ringan, explorer, faucet, dan layanan serupa lainnya.
* Zaino adalah infrastruktur aktif, namun operator harus memeriksa dokumentasi resmi Zaino dan Z3 untuk detail deployment saat ini sebelum menjalankannya di lingkungan produksi.

## Apa yang Dilakukan Zaino

Zaino berada di antara Zebra dan perangkat lunak klien. Zebra adalah node konsensus: ia mengunduh, memverifikasi, dan mengikuti blockchain Zcash. Zaino menggunakan Zebra sebagai sumber data chain miliknya, lalu menyiapkan tampilan terindeks yang dapat dikueri secara efisien oleh aplikasi klien.

Pemisahan ini menjaga peran tetap jelas:

| Komponen | Peran |
|:--|:--|
| Zebra | Full node dan validator |
| Zaino | Indexer dan layanan API yang menghadap ke client |
| Zallet | Layanan dompet |
| lightwalletd | Server light wallet lama yang dirancang untuk digantikan atau dilengkapi oleh Zaino |

Zaino menyediakan fungsionalitas untuk light client, full client atau dompet, dan block explorer. Ini memberikan akses ke chain yang telah difinalisasi, best chain yang belum difinalisasi, dan data mempool yang disimpan oleh Zebra.

## Bagaimana Perannya dalam Stack Zcash Saat Ini

Stack Z3 saat ini dibangun di sekitar Zebra, Zallet, dan Zaino opsional.

Dalam penerapan Z3 default, Zebra dan Zallet berjalan bersama. Zallet menjangkau Zebra secara langsung, sehingga operator yang hanya menjalankan stack dompet lokal tidak perlu memulai layanan Zaino standalone.

Zaino ditambahkan saat operator ingin melayani klien eksternal. Di Z3, ini berjalan di balik profil `indexer` Compose dan menambahkan:

* sebuah endpoint gRPC yang kompatibel dengan lightwalletd untuk client dompet ringan
* sebuah proxy JSON-RPC untuk explorer, faucet, dan backend layanan
* sebuah database indexer yang terpisah dari status chain Zebra

Hal ini membuat Zaino menjadi sangat relevan bagi backend dompet, operator infrastruktur publik, explorer, faucet, dan developer yang menguji layanan yang membutuhkan data rantai Zcash yang terindeks.

## Zaino dan lightwalletd

lightwalletd adalah server light wallet asli. Zaino adalah jalur penerus berbasis Rust untuk peran ini. Tujuannya adalah untuk menyediakan API yang kompatibel jika memungkinkan sehingga dompet dan layanan dapat bermigrasi tanpa harus ditulis ulang sepenuhnya secara sekaligus.

Hal ini tidak berarti setiap penerapan lightwalletd telah beralih ke Zaino. Operator harus memperlakukan Zaino sebagai bagian dari stack berbasis Zebra saat ini dan memeriksa dokumentasi proyek, rilis, serta dashboard layanan terbaru sebelum memilih apa yang akan dijalankan.

## Catatan Operator

Jalur penyebaran otoritatif yang paling mudah adalah repositori Z3. Z3 menyertakan Zaino sebagai layanan opsional:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Jalankan pengaturan Z3 normal terlebih dahulu dan tunggu hingga Zebra tersinkronisasi sebelum memulai layanan dependen pada mainnet atau testnet.

Zaino mengekspos dua jenis layanan jaringan. Layanan gRPC adalah API yang ditujukan untuk light wallet. Layanan JSON-RPC ditujukan untuk loopback atau jaringan privat terpercaya kecuali jika lapisan eksternal menyediakan perlindungan. Jangan mengekspos endpoint JSON-RPC yang tidak terautentikasi atau tidak terenkripsi ke internet publik.

## Beberapa diagram yang menunjukkan cara kerja Zaino

### Arsitektur Internal Zaino

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

### Arsitektur Layanan Langsung Zaino

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

### Arsitektur Sistem Zaino

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Kesalahan Umum

**Menganggap Zaino sebagai sebuah full node.** Zaino bukanlah validatornya. Zebra memvalidasi rantai; Zaino mengindeks data dari Zebra.

**Mengasumsikan setiap penerapan Z3 memerlukan Zaino mandiri.** Zallet dapat menjangkau Zebra secara langsung dalam stack Z3 default. Mulai Zaino saat Anda membutuhkan layanan indexer mandiri untuk klien eksternal.

**Menyajikan fitur yang direncanakan seolah-olah sudah diterapkan.** Zaino dikembangkan secara aktif, jadi periksalah catatan rilis dan dokumentasi terbaru sebelum mendeskripsikan sebuah fitur sebagai fitur yang tersedia.

**Mengekspos JSON-RPC secara sembarangan.** Antarmuka JSON-RPC dari Zaino ditujukan untuk loopback atau jaringan privat terpercaya kecuali jika dilindungi oleh lapisan lain.

## Di mana saya bisa mempelajari lebih lanjut?

* repositori [Zaino GitHub](https://github.com/zingolabs/zaino)
* rilis [Zaino](https://github.com/zingolabs/zaino/releases)
* dokumentasi yang dihasilkan [Zaino](https://zingolabs.github.io/zaino/)
* repositori deployment Z3 [](https://github.com/ZcashFoundation/z3)
* dokumentasi [Zebra](https://zebra.zfnd.org/)
* diskusi hibah dan proyek [Zaino](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Pembaruan terakhir:** Agustus 2026