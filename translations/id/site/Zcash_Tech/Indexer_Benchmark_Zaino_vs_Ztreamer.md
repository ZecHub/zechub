# Tolok Ukur Indexer: Zaino vs Ztreamer

Zaino dan Ztreamer adalah dua indexer yang menyediakan protokol gRPC lightwallet, API yang digunakan dompet ringan Zcash untuk melakukan sinkronisasi. Halaman ini merangkum perbandingan independen dan dapat direproduksi dari keduanya: apakah keduanya memberikan jawaban yang sama, berapa lama waktu yang diperlukan untuk membangun indeksnya, dan seberapa cepat keduanya melayani dompet.

## Ringkasan

* Kedua indexer mengembalikan data chain yang benar. Setiap respons yang dapat diperiksa terhadap Zebra cocok, sehingga dompet dapat menggunakan salah satunya.
* Perbedaan yang ditemukan berupa konvensi dan kasus tepi: kode error, urutan byte dari satu hash, cara alamat duplikat dihitung, dan beberapa bentuk respons JSON-RPC.
* Ztreamer membangun indeksnya sekitar 6× lebih cepat pada CPU yang sama. Zaino mulai menjawab setelah 6 detik dengan meneruskan permintaan ke Zebra saat membangun.
* Ztreamer melayani lebih cepat dalam setiap skenario yang diukur: 13–17× lebih banyak blok per detik untuk unduhan dompet penuh.
* Sebagian besar latensi Zaino berasal dari satu pengaturan socket yang tidak ada (`TCP_NODELAY`), yang menambahkan sekitar 40 ms pada banyak permintaan. Perbaikannya hanya satu baris.

## Yang Dibandingkan

| Build | Node pendukung | Alasan |
|:--|:--|:--|
| Zaino 0.10.1 | Zebra 6.4.2 (backend `direct`) | Rilis stabil Zaino terbaru |
| Zaino 0.9.0 | Zebra 6.4.2 (backend `direct`) | Versi yang diukur dalam perbandingan terbitan Ztreamer sendiri |
| Ztreamer v0.1.0 | Node Zakura tersemat | Tag Ztreamer terbaru |
| Ztreamer master | Zakura 1.5.1 tersemat | Yang dibangun oleh instruksi pemasangan Ztreamer |

Keduanya menggunakan desain yang berbeda:

* **Zaino** berjalan sebagai proses terpisah di samping full node [Zebra](Zebra_Full_Node.md), membaca state Zebra, dan mempertahankan indeksnya sendiri. Ini adalah indexer dalam tumpukan [Z3](Z3_Stack.md). Lihat [Zaino](Zaino.md).
* **Ztreamer** menyematkan node [Zakura](Zakura_Node.md) (fork Zebra) dalam proses yang sama dan mempertahankan indeks compact-block.

## Cara Pengukuran Dilakukan

* **Data yang sama untuk semua.** Setiap build dimulai dari snapshot testnet Zcash Foundation yang sama, dibekukan pada tinggi 4,382,897, sehingga semuanya mengindeks chain yang persis sama.
* **Siapa pun dapat mengulanginya.** Semua proses berjalan pada runner yang dihosting GitHub secara gratis: fork repository dan jalankan satu workflow.
* **Tiga kali pengujian per build**, masing-masing dari indeks kosong. Server dan pembangkit beban berjalan pada core CPU terpisah.
* **Kompatibilitas:** seluruh 20 metode gRPC protokol lightwallet (274 kasus uji), dibandingkan byte demi byte antar-build dan diperiksa terhadap JSON-RPC Zebra. Ke-28 metode JSON-RPC yang dilayani Zaino juga diperiksa.
* **Performa:** waktu dan sumber daya untuk membangun indeks, latensi per permintaan, throughput rentang blok, 1 hingga 128 klien bersamaan, serta unduhan dompet penuh dari aktivasi Sapling hingga tip.

## Hasil

### Pembangunan indeks

Median dari tiga kali pengujian:

| Build | Indeks selesai | Jawaban pertama | Ukuran indeks di disk |
|:--|--:|--:|--:|
| Zaino 0.10.1 | 1,395 s | 6 s | 22.06 GiB |
| Zaino 0.9.0 | 1,211 s | 6 s | 22.06 GiB |
| Ztreamer v0.1.0 | 216 s | 210 s | 1.44 GiB |
| Ztreamer master | 159 s | 158 s | 1.44 GiB |

Zaino dapat digunakan hampir seketika karena meneruskan permintaan ke Zebra saat membangun. Ztreamer tidak melayani apa pun hingga indeksnya selesai. Pada model CPU yang sama, Zaino 0.10.1 membutuhkan waktu 6–6,5× lebih lama daripada Ztreamer v0.1.0 dan menggunakan waktu CPU 7,5–8× lebih banyak (termasuk Zebra).

### Pelayanan

Median dari tiga kali pengujian, dalam blok per detik kecuali dinyatakan lain:

| Skenario | Zaino 0.10.1 | Ztreamer v0.1.0 |
|:--|--:|--:|
| Rentang blok sebanyak 1,000 blok | 11,414 | 179,486 |
| Unduhan dompet penuh (280,000 → tip) | 11,124 | 189,041 |
| Rentang blok sebanyak 1,000 blok, 128 klien | 110,093 | 229,527 |
| Satu blok, 128 klien (permintaan/s) | 6,843 | 11,044 |

Dengan 128 klien, kesenjangannya menyempit menjadi sekitar 2×, karena kedua server dibatasi hingga dua core CPU.

### Batas bawah 40 ms

Pada Zaino, enam dari dua belas RPC memiliki latensi median sekitar 40 ms, dan setiap RPC memiliki persentil ke-99 sekitar 41 ms. Penyebabnya adalah cara Zaino menyiapkan listener gRPC-nya: opsi socket `TCP_NODELAY` tidak pernah diaktifkan, sehingga sistem operasi menahan respons kecil hingga 40 ms.

Mengaktifkan opsi tersebut dari luar, tanpa mengubah biner Zaino, menghilangkan batas bawah itu. Sebagai contoh, `GetTreeState` turun dari 40.3 ms menjadi 0.75 ms (Ztreamer: 0.63 ms). Streaming blok massal tidak berubah, sehingga kesenjangan throughput di atas nyata.

### Perbedaan kompatibilitas

* **Zaino 0.9.0** secara default menyertakan data transparan dalam `GetBlock`, padahal protokol menyatakan bahwa default-nya hanya data terlindungi. Hal ini diperbaiki pada 0.10.1.
* **`GetSubtreeRoots`:** kolom `completingBlockHash` menggunakan urutan byte yang berlawanan pada kedua indexer. Dompet saat ini tidak membaca kolom ini.
* **Kode error:** Zaino mengembalikan `INTERNAL` untuk input yang buruk; Ztreamer mengembalikan `INVALID_ARGUMENT` atau `NOT_FOUND`.
* **Alamat duplikat** dalam `GetTaddressBalanceStream` dihitung dua kali, kecuali pada Ztreamer master.
* **JSON-RPC:** Zaino milik `getrawtransaction` dengan verbosity 0 mengembalikan objek alih-alih string hex, tidak seperti Zebra dan zcashd.

## Keterbatasan

* **Hanya testnet.** Blok testnet lebih kecil daripada blok mainnet, sehingga waktu dan ukuran absolut bukanlah angka mainnet. Perbandingannya bersifat relatif, pada input yang identik.
* **Mesin CI bersama** dengan beberapa model CPU. Laporan lengkap memberikan perbandingan CPU yang sama untuk angka utama.
* **Tidak diukur:** reorg, mengikuti tip chain aktif, beban mempool, dan TLS.

## Tempat Mempelajari Lebih Lanjut

* Laporan lengkap: [zcash-indexer-bench/report/report.md](https://github.com/pearl-max468/zcash-indexer-bench/blob/main/report/report.md)
* Repository benchmark: [github.com/pearl-max468/zcash-indexer-bench](https://github.com/pearl-max468/zcash-indexer-bench)
* Data mentah: [rilis results-2026-10-10](https://github.com/pearl-max468/zcash-indexer-bench/releases/tag/results-2026-10-10)
* Zaino: [github.com/zingolabs/zaino](https://github.com/zingolabs/zaino)
* Ztreamer: [ztreamer.sh](https://ztreamer.sh)
