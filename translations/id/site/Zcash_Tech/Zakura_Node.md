<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Node Zakura

> 🇧🇷 [Versi dalam Bahasa Portugis](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura adalah implementasi full node sumber terbuka yang gratis untuk Zcash, yang dibangun untuk skalabilitas. Di-fork dari [Zebra](Zebra_Full_Node.md) dan dikembangkan melalui kolaborasi antara **Valar Group** dan **Project Tachyon**, Zakura menghadirkan sinkronisasi yang jauh lebih cepat, pemangkasan blok asli, dan lapisan kompatibilitas untuk alat `zcashd` lama. Versi 1.0.0 dirilis pada 15 Juli 2026.

---

## Ringkasan Singkat

- Zakura adalah **Zcash full node yang kompatibel dengan konsensus** — sebuah alternatif untuk Zebra dan zcashd, yang merupakan fork dari Zebra.
- Sinkronisasi blockchain kira-kira **5× lebih cepat daripada Zebra**; bootstrapping snapshot selesai dalam **kurang dari 2 menit**.
- **Pemangkasan blok asli (native block pruning)** memungkinkan operator untuk menjalankan full node dengan ruang disk yang jauh lebih sedikit (~11 GB snapshot yang dipangkas vs. 300 GB untuk full Zebra node).
- **Mode kompatibilitas RPC zcashd** memungkinkan dompet dan integrasi yang sudah ada untuk bekerja tanpa modifikasi.
- **Lapisan transport P2P eksperimental** (dinonaktifkan secara default) menargetkan propagasi blok di bawah 500ms dengan gossip yang tahan terhadap DoS.
- Kompatibel dengan **Ironwood (NU6.3)**, peningkatan jaringan Zcash yang diaktifkan pada pertengahan 2026.
- **Zakura Common** (v1.3.0, Agustus 2026) mempercepat kriptografi yang digunakan dompet untuk membangun transaksi privat: dari lebih dari 3 detik menjadi kurang dari 200 ms dalam banyak kasus, berdasarkan benchmark Zakura.
- Dipimpin oleh **Sean Bowe** (rekan pendiri Zcash, Project Tachyon) dan **Dev Ojha** (Valar Group).

---

## Apa itu Zakura?

Zakura adalah Zcash full node yang dirancang dari awal agar siap digunakan untuk skala produksi. Meskipun memiliki kompatibilitas konsensus dengan Zebra — yang berarti ia memvalidasi dan mengikuti aturan protokol Zcash yang sama — Zakura memperkenalkan peningkatan rekayasa yang signifikan yang bertujuan untuk menurunkan hambatan dalam menjalankan Zcash full node.

Proyek ini merupakan upaya bersama antara **Project Tachyon** (dipimpin oleh Sean Bowe, salah satu engineer kriptografi asli Zcash) dan **Valar Group** (dipimpin oleh Dev Ojha). Bersama-sama mereka fokus pada peningkatan protokol Zcash generasi berikutnya, dan Zakura berfungsi sebagai reference node untuk pekerjaan tersebut.

---

## Fitur Utama

### Sinkronisasi Rantai 5× Lebih Cepat

Zakura mencapai sinkronisasi blockchain yang kira-kira 5× lebih cepat dibandingkan dengan Zebra. Hal ini membuatnya jauh lebih praktis bagi operator yang perlu menjalankan sebuah node dengan cepat atau pulih dari waktu henti (downtime).

### Snapshot Bootstrapping

Zakura mempublikasikan snapshot chain yang telah dibuat sebelumnya yang secara drastis mengurangi waktu sinkronisasi awal:

| Metode Bootstrap | Waktu |
|-----------------|------|
| Snapshot arsip | ~37 menit |
| Snapshot pruned | **Di bawah 2 menit** |
| Zebra (sinkronisasi penuh) | ~20 jam |

Snapshot yang dipangkas (pruned) berukuran sekitar **11 GB**, memungkinkan proses bootstrap node **680× lebih cepat** dibandingkan melakukan sinkronisasi dari genesis.

### Pemangkasan Blok Native

Zakura mendukung pemangkasan blok yang dapat dikonfigurasi, memungkinkan operator node untuk menentukan seberapa banyak riwayat rantai yang akan disimpan. Hal ini membuatnya praktis untuk menjalankan full node pada perangkat keras dengan penyimpanan terbatas — berguna bagi validator, developer, dan penyedia infrastruktur yang tidak memerlukan seluruh riwayat rantai secara lengkap.

### Mode Kompatibilitas RPC zcashd

Zakura menyertakan mode kompatibilitas yang mereproduksi antarmuka JSON-RPC `zcashd` versi lama. Dompet, exchange, dan integrasi yang sudah ada yang mengandalkan RPC `zcashd` dapat beralih ke Zakura tanpa memerlukan perubahan kode.

### Lapisan Transport P2P Eksperimental

Zakura dilengkapi dengan lapisan transport peer-to-peer generasi berikutnya, yang saat ini **dinonaktifkan secara default**. Jika diaktifkan, ia menargetkan:

- Propagasi blok terburuk di bawah 500ms di seluruh jaringan
- Agregasi mempool untuk relay transaksi yang lebih efisien
- Protokol gossip yang tahan terhadap DoS untuk meningkatkan ketahanan jaringan

Lapisan ini merupakan pratinjau dari peningkatan tingkat jaringan Zcash di masa mendatang yang sedang dikembangkan di bawah Project Tachyon.

### Kompatibel dengan Ironwood (NU6.3)

Zakura sepenuhnya kompatibel dengan peningkatan jaringan Ironwood (NU6.3), yang diaktifkan pada mainnet Zcash pada pertengahan 2026.

---

## Zakura Umum: Kriptografi Dompet yang Lebih Cepat

Pada Agustus 2026, tim Zakura merilis Zakura Common, sebuah rangkaian fork yang dipercepat dari pustaka kriptografi yang diandalkan oleh dompet dan node Zcash. Zakura beralih ke stack baru tersebut pada versi 1.3.0, dan Vizor Wallet adalah salah satu dompet pertama yang mengintegrasikannya.

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

Berdasarkan benchmark milik Zakura sendiri:

| Operasi | Peningkatan Kecepatan |
|--|--|
| Pembuatan proof pada seluler | lebih dari 14× (desktop: lebih dari 5×) |
| Hashing Sinsemilla | lebih dari 21× |
| Verifikasi zk-SNARK | 4–8× |
| Dekripsi percobaan | lebih dari 1.5× |

Bagi pengguna, perubahan yang paling terlihat adalah waktu tunggu. Membuat transaksi terlindungi dulunya membutuhkan waktu lebih dari tiga detik bagi sebuah dompet. Dengan Zakura Common, hal ini dapat memakan waktu kurang dari 200 ms dalam banyak kasus. Ini adalah waktu yang dihabiskan perangkat Anda untuk menyiapkan transaksi, bukan waktu yang dibutuhkan jaringan untuk mengonfirmasinya.


---

## Bagaimana Zakura Berhubungan dengan Node Zcash Lainnya

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Bahasa | C++ (fork dari Bitcoin) | Rust | Rust (fork dari Zebra) |
| Status | Deprecated | Aktif | Aktif (v1.0.0, Jul 2026) |
| Kecepatan sinkronisasi | Baseline | ~1× | ~5× lebih cepat |
| Pemangkasan blok | Tidak | Tidak | Ya |
| Kompatibilitas RPC zcashd | Native | Parsial | Ya (mode kompatibilitas) |
| Bootstrap snapshot | Tidak | Tidak | Ya (kurang dari 2 menit) |
| P2P Eksperimental | Tidak | Tidak | Ya (opt-in) |

---

## Memulai

Opsi unduhan, snapshot, dan dokumentasi konfigurasi tersedia di:

- **Panduan unduh & pengaturan:** [zakura.com/download](https://zakura.com/download/)
- **Snapshot chain:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Kode sumber:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## Halaman Terkait

- [Zebra Full Node](Zebra_Full_Node.md) — Zakura full node Zcash upstream yang merupakan fork dari
- [Zaino Indexer](Zaino.md) — indexer berbasis Rust yang kompatibel dengan Zebra dan Zakura
- [Full Nodes](Full_Nodes.md) — ringkasan opsi full node Zcash
- [Lightwallet Nodes](Lightwallet_Nodes.md) — alternatif light client yang ringan

## Sumber Daya

- Memperkenalkan Zakura dari [ — pengumuman](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- Website [Zakura](https://zakura.com/)
- di X/Twitter](https://x.com/ZakuraZcash) [Zakura
- Proyek [ Tachyon](https://electriccoin.co/blog/)
- Pengumuman umum [Zakura](https://zakura.com/announcements/zakura-common/)