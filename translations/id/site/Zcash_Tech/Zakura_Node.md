<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sunting Halaman"/>
</a>

# Node Zakura

Zakura adalah implementasi full node gratis dan open source untuk Zcash, yang dibuat untuk skala besar. Di-fork dari [Zebra](Zebra_Full_Node.md) dan dikembangkan melalui kolaborasi antara **Valar Group** dan **Project Tachyon**, Zakura menghadirkan sinkronisasi yang jauh lebih cepat, pemangkasan blok bawaan, dan lapisan kompatibilitas untuk alat `zcashd` lama. Versi 1.0.0 dirilis pada 15 Juli 2026. Setelah itu, rilis datang dengan cepat: 1.7.0 (22 Oktober 2026) mengaktifkan NU7 di Mainnet, disusul seri 1.8 pada November.

---

## Ringkasan

- Zakura adalah **full node Zcash yang kompatibel dengan konsensus** — alternatif untuk Zebra dan zcashd, yang di-fork dari Zebra.
- Sinkronisasi blockchain kira-kira **5× lebih cepat daripada Zebra**; bootstrap snapshot selesai dalam **kurang dari 2 menit**.
- **Pemangkasan blok bawaan** memungkinkan operator menjalankan full node dengan ruang disk yang jauh lebih sedikit (snapshot yang dipangkas sekitar 11 GB dibandingkan 300 GB untuk node Zebra penuh).
- **Mode kompatibilitas RPC zcashd** memungkinkan dompet dan integrasi yang sudah ada berfungsi tanpa modifikasi.
- **Lapisan transport P2P eksperimental** (dinonaktifkan secara default) menargetkan propagasi blok di bawah 500 ms dengan gossip yang tahan terhadap DoS.
- Kompatibel dengan **Ironwood (NU6.3)**, peningkatan jaringan Zcash yang diaktifkan pada pertengahan 2026.
- Mengikuti **NU7**: Zakura 1.7.0 adalah rilis yang mengaktifkannya di Mainnet. Setiap rilis juga berhenti beroperasi pada blok akhir dukungan beberapa minggu setelah dirilis, jadi rencanakan peningkatan secara berkala (lihat Sebelum Menjalankannya di bawah).
- **Zakura Common** (v1.3.0, Agustus 2026) mempercepat kriptografi yang digunakan dompet untuk membuat transaksi privat: dari lebih dari 3 detik menjadi kurang dari 200 ms dalam banyak kasus, menurut tolok ukur Zakura.
- Dipimpin oleh **Sean Bowe** (salah satu pendiri Zcash, Project Tachyon) dan **Dev Ojha** (Valar Group).

---

## Apa itu Zakura?

Zakura adalah full node Zcash yang dirancang dari awal agar siap digunakan dalam skala besar di lingkungan produksi. Meskipun kompatibel dengan konsensus Zebra — artinya memvalidasi dan mengikuti aturan protokol Zcash yang sama — Zakura menghadirkan peningkatan rekayasa yang signifikan untuk mempermudah pengoperasian full node Zcash.

Proyek ini merupakan upaya bersama antara **Project Tachyon** (dipimpin oleh Sean Bowe, salah satu engineer kriptografi asli Zcash) dan **Valar Group** (dipimpin oleh Dev Ojha). Keduanya berfokus pada peningkatan protokol Zcash generasi berikutnya, dan Zakura berfungsi sebagai node referensi untuk pekerjaan tersebut.

---

## Fitur Utama

### Sinkronisasi Chain 5× Lebih Cepat

Zakura mencapai sinkronisasi blockchain sekitar 5× lebih cepat dibandingkan Zebra. Hal ini membuatnya jauh lebih praktis bagi operator yang perlu menyiapkan node dengan cepat atau memulihkan layanan setelah terjadi gangguan.

### Bootstrap Snapshot

Zakura menerbitkan snapshot chain siap pakai yang memangkas waktu sinkronisasi awal secara drastis:

| Metode Bootstrap | Waktu |
|-----------------|------|
| Snapshot arsip | ~37 menit |
| Snapshot yang dipangkas | **Kurang dari 2 menit** |
| Zebra (sinkronisasi penuh) | ~20 jam |

Snapshot yang dipangkas berukuran sekitar **11 GB**, sehingga bootstrap node **680× lebih cepat** dibandingkan sinkronisasi dari genesis.

### Pemangkasan Blok Bawaan

Zakura mendukung pemangkasan blok yang dapat dikonfigurasi, sehingga operator node dapat menentukan seberapa banyak riwayat chain yang akan disimpan. Dengan begitu, full node dapat dijalankan secara praktis pada perangkat keras dengan ruang penyimpanan terbatas — berguna bagi validator, developer, dan penyedia infrastruktur yang tidak memerlukan seluruh riwayat chain.

### Mode Kompatibilitas RPC zcashd

Zakura menyertakan mode kompatibilitas yang mereproduksi antarmuka JSON-RPC `zcashd` lama. Dompet, exchange, dan integrasi yang sudah ada dan mengandalkan RPC `zcashd` dapat beralih ke Zakura tanpa memerlukan perubahan kode.

### Lapisan Transport P2P Eksperimental

Zakura menyertakan lapisan transport peer-to-peer generasi berikutnya, yang saat ini **dinonaktifkan secara default**. Jika diaktifkan, lapisan ini menargetkan:

- Propagasi blok terburuk di bawah 500 ms di seluruh jaringan
- Agregasi mempool untuk relay transaksi yang lebih efisien
- Protokol gossip yang tahan terhadap DoS untuk meningkatkan ketahanan jaringan

Lapisan ini merupakan pratinjau peningkatan tingkat jaringan Zcash di masa mendatang yang sedang dikembangkan di bawah Project Tachyon.

### Kompatibel dengan Ironwood (NU6.3)

Zakura sepenuhnya kompatibel dengan peningkatan jaringan Ironwood (NU6.3), yang diaktifkan di Mainnet Zcash pada pertengahan 2026.

### NU7

Zakura 1.7.0, yang dirilis pada 22 Oktober 2026, adalah rilis yang mengaktifkan NU7 di Mainnet ([catatan rilis](https://github.com/zakura-core/zakura/releases/tag/v1.7.0)). Node memerlukan versi 1.7.0 atau yang lebih baru untuk mengikuti chain setelah peningkatan tersebut. [NU7](NU7.md) menjelaskan perubahan yang dibawa oleh peningkatan tersebut.

---

## Zakura Common: Kriptografi Dompet yang Lebih Cepat

Pada Agustus 2026, tim Zakura merilis Zakura Common, sekumpulan fork yang dipercepat dari pustaka kriptografi yang digunakan oleh dompet dan node Zcash. Zakura beralih ke stack baru ini pada versi 1.3.0, dan Vizor Wallet termasuk salah satu dompet pertama yang mengintegrasikannya.

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

Menurut tolok ukur yang dilakukan sendiri oleh Zakura:

| Operasi | Peningkatan Kecepatan |
|--|--|
| Pembuatan proof di perangkat seluler | lebih dari 14× (desktop: lebih dari 5×) |
| Hashing Sinsemilla | lebih dari 21× |
| Verifikasi zk-SNARK | 4–8× |
| Dekripsi percobaan | lebih dari 1,5× |

Bagi pengguna, perubahan yang paling terlihat adalah waktu tunggu. Dahulu, dompet memerlukan lebih dari tiga detik untuk membuat transaksi privat. Dengan Zakura Common, proses ini dapat selesai dalam kurang dari 200 ms dalam banyak kasus. Ini adalah waktu yang digunakan perangkat Anda untuk menyiapkan transaksi, bukan waktu yang diperlukan jaringan untuk mengonfirmasinya.


---

## Hubungan Zakura dengan Node Zcash Lainnya

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Bahasa | C++ (di-fork dari Bitcoin) | Rust | Rust (di-fork dari Zebra) |
| Status | Tidak digunakan lagi | Aktif | Aktif (v1.0.0 Juli 2026; v1.8.8 November 2026) |
| Kecepatan sinkronisasi | Acuan | ~1× | ~5× lebih cepat |
| Pemangkasan blok | Tidak | Tidak | Ya |
| Kompatibilitas RPC zcashd | Bawaan | Sebagian | Ya (mode kompatibilitas) |
| Bootstrap snapshot | Tidak | Tidak | Ya (kurang dari 2 menit) |
| P2P eksperimental | Tidak | Tidak | Ya (opsional) |

---

## Memulai

Opsi unduhan, snapshot, dan dokumentasi konfigurasi tersedia di:

- **Panduan unduhan dan penyiapan:** [zakura.com/download](https://zakura.com/download/)
- **Snapshot chain:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Kode sumber:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- **Catatan rilis:** [github.com/zakura-core/zakura/releases](https://github.com/zakura-core/zakura/releases)

### Menyediakan Layanan untuk Dompet Ringan

Zakura bukan server dompet ringan. `CompactTxStreamer` tidak mengimplementasikan protokol gRPC yang digunakan dompet ringan seperti Zodl (sebelumnya Zashi), sehingga dompet tidak dapat terhubung langsung ke `zakurad`. Untuk menyediakan layanan bagi dompet ringan, jalankan salah satu ini di depannya:

- [Zaino](Zaino.md) (pilihan utama)
- [lightwalletd](Lightwallet_Nodes.md)
- [Ztreamer](https://github.com/zcashlabs/ztreamer), pengindeks dan server dompet ringan milik Zcash Labs, yang membaca chain dari node Zakura, baik yang disematkan dalam prosesnya sendiri maupun yang berjalan dari jarak jauh melalui JSON-RPC

gRPC pengindeks milik Zakura (`indexer_listen_addr` di bagian `[rpc]`, dinonaktifkan secara default) adalah antarmuka terpisah: aliran blok, mempool, dan ujung chain untuk perangkat lunak tepercaya yang Anda jalankan sendiri, bukan protokol dompet ringan. Teks biasa hanya diizinkan pada loopback, dan alamat lainnya memerlukan TLS mutual ([referensi konfigurasi](https://github.com/zakura-core/zakura/blob/v1.8.7/crates/zakura-rpc/src/config/rpc.rs)).

### Sebelum Menjalankannya

Beberapa hal dari catatan rilis 1.8 yang kerap mengejutkan operator:

- **Rilis memiliki masa berlaku.** Setiap rilis Zakura memiliki batas ketinggian akhir dukungan, dan node Mainnet yang menjalankannya akan berhenti pada blok tersebut. Rilis 1.8.x "Didukung di Mainnet hingga blok 3.643.309, sekitar 3 Desember 2026", dengan peringatan peningkatan sekitar tiga hari sebelumnya ([v1.8.8](https://github.com/zakura-core/zakura/releases/tag/v1.8.8)). Periksa rilis terbaru sebelum tanggal tersebut, dan jangan menetapkan versi lama di skrip atau templat deployment tanpa rencana untuk meningkatkannya.
- **Persyaratan CPU x86-64 sejak versi 1.8.0.** Biner rilis dan image Docker menggunakan instruksi BMI2/ADX, yang mensyaratkan Intel Broadwell, AMD Zen, atau yang lebih baru. Pada CPU yang lebih lama, `zakurad` akan berhenti saat startup dengan pesan kesalahan yang menyebutkan ekstensi yang tidak tersedia. Build dari kode sumber dengan `--features portable` agar dapat berjalan di mesin tersebut ([v1.8.0](https://github.com/zakura-core/zakura/releases/tag/v1.8.0)).
- **Konfigurasi lama yang dibuat otomatis dan P2P bawaan.** `zakurad generate` sebelumnya menulis `peer_memory_budget_bytes = 8589934592` (8 GiB). Sejak versi 1.8.3, nilai itu hanya mengizinkan sekitar setengah jumlah koneksi P2P bawaan, dan nilai 4 GiB atau kurang akan membuat node yang menjalankan P2P bawaan gagal dimulai. Tingkatkan `[network.zakura] peer_memory_budget_bytes` menjadi setidaknya 15 GiB, atau hapus baris tersebut untuk menggunakan nilai default baru sebesar 15 GiB ([v1.8.3](https://github.com/zakura-core/zakura/releases/tag/v1.8.3)).
- **Alat status dipindahkan ke `zakurad`.** Sejak versi 1.8.3, biner mandiri `zakura-prune-state` dan `zakura-rollback-state` tidak lagi disertakan, termasuk dalam Docker. Gunakan `zakurad prune-state` dan `zakurad rollback-state` sebagai gantinya. Keduanya menerima argumen yang sama, tetapi memuat `zakura.toml`, jadi berikan `--cache-dir` untuk menentukan direktori status tertentu.

---

## Halaman Terkait

- [Zebra Full Node](Zebra_Full_Node.md) — full node upstream Zcash, yang menjadi asal fork Zakura
- [Zaino Indexer](Zaino.md) — pengindeks berbasis Rust yang kompatibel dengan Zebra dan Zakura
- [Full Nodes](Full_Nodes.md) — ikhtisar opsi full node Zcash
- [Lightwallet Nodes](Lightwallet_Nodes.md) — alternatif klien ringan

## Sumber

- [Memperkenalkan Zakura — pengumuman](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Zakura Situs Web](https://zakura.com/)
- [Zakura di X/Twitter](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
- [Zakura pengumuman Common](https://zakura.com/announcements/zakura-common/)
