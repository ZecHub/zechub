# Zinder Indexer

Zinder adalah indexer Zcash yang dihosting sendiri, ditulis dalam Rust dan diterbitkan oleh Zcash Foundation. Indexer ini membaca chain satu kali dari Zebra atau full node Zakura, menyimpan satu tampilan yang konsisten, lalu menyajikan tampilan tersebut ke beberapa dompet, aplikasi, dan explorer secara bersamaan. Dompet ringan yang sudah ada dapat mengaksesnya melalui adapter yang kompatibel dengan lightwalletd.

> **Zinder masih berstatus alfa.** README-nya menyatakan bahwa API native, lapisan kompatibilitas lightwalletd, tata letak penyimpanan, dan topologi deployment akan berubah, serta bahwa rilis bertag bukan jaminan stabilitas. Tetapkan versi yang tepat dan bersiaplah menghadapi pembaruan yang dapat merusak kompatibilitas.

## Ringkasan

* **Zebra** atau **Zakura** memvalidasi chain. **Zinder** mengindeks data yang dimiliki node dan menyajikannya kepada klien.
* Ada dua cara untuk mengaksesnya: API gRPC `WalletQuery` milik Zinder, serta adapter terpisah yang menggunakan protokol `CompactTxStreamer` milik lightwalletd, sehingga dompet yang dibuat untuk lightwalletd dapat mengarah ke sana tanpa perubahan kode.
* Setiap pembacaan dikaitkan dengan satu status chain ("epoch"), sehingga satu batch sinkronisasi tidak pernah mencampur data dari dua ujung chain yang bersaing. Kunci dan pemindaian terlindungi tetap berada di dompet.
* Sistem ini dirancang untuk satu operator yang menjalankan satu node dan melayani banyak konsumen. Tempatkan endpoint publik di belakang TLS, autentikasi, dan pembatasan laju yang Anda kelola sendiri.
* Rilis hadir dengan cepat (dari 0.7.0 hingga 0.12.0 antara 10 dan 14 November 2026), dan beberapa di antaranya membawa perubahan yang merusak kompatibilitas. Baca changelog sebelum setiap pembaruan.

## Posisi Zinder

Dompet ringan tidak pernah berkomunikasi langsung dengan full node. Dompet tersebut meminta blok ringkas, status tree, dan data transaksi dari indexer (lihat [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)). Ekosistem Zcash kini memiliki beberapa indexer yang dapat melakukan hal ini:

| Indexer | Bahasa | Pengelola | Terhubung ke | Catatan |
|:--|:--|:--|:--|:--|
| lightwalletd | Go | Komunitas ECC / Zcash | Zebra atau zcashd | Server dompet ringan yang pertama |
| [Zaino](/zcash-tech/zaino) | Rust | Zingo Labs | Zebra atau zcashd | Profil indexer opsional di stack Z3 |
| [Ztreamer](https://github.com/zcashlabs/ztreamer) | Rust | zcashlabs | Node Zakura tertanam | Lihat [Zaino vs Ztreamer benchmark](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer) |
| **Zinder** | Rust | Zcash Foundation | Zebra 7.0.0 atau Zakura 1.8.6 (node arsip) | Alfa. API native, adapter lightwalletd, dan pembacaan explorer opsional |

Dokumentasi Zinder menjelaskan secara langsung kapan sistem ini menjadi pilihan yang tepat: keunggulannya paling terasa ketika akses ke chain perlu tetap tersedia di luar satu proses dompet, melayani beberapa konsumen independen, atau dipisahkan dari kode dompet tertentu. Untuk satu dompet yang terintegrasi erat, indexer tertanam bisa lebih sederhana. Sementara itu, konsumen yang hanya membutuhkan data yang sudah dimiliki node dapat menggunakan RPC milik Zebra secara langsung.

## Cara kerjanya

Zinder membagi pekerjaan ke dalam proses-proses terpisah, masing-masing dengan satu tugas:

| Runtime | Peran |
|:--|:--|
| `zinder-ingest` | Satu-satunya penulis ke penyimpanan chain kanonis (RocksDB). Mengikuti node, menangani reorganisasi, dan menjaga status mempool terkini |
| `zinder-projector` | Satu-satunya penulis ke penyimpanan dompet. Membangun dan mengikuti tampilan chain yang disesuaikan untuk dompet |
| `zinder-query` | Menyajikan API gRPC native `WalletQuery` |
| `zinder-compat-lightwalletd` | Menyajikan API `CompactTxStreamer` milik lightwalletd di atas data yang sama |

Lapisan explorer opsional (`zinder-explorer` dengan `ExplorerQuery`) menyajikan ringkasan blok, detail transaksi, tampilan mempool, dan pencarian. Adapter opsional menyajikan API REST dan WebSocket milik explorer CipherScan. Keduanya tidak termasuk dalam image rilis.

Setiap runtime menyediakan `/healthz`, `/readyz`, dan `/metrics`. Reader hanya melaporkan status siap setelah salinan penyimpanan chain dan penyimpanan dompetnya menunjuk ke status chain yang persis sama.

## Cara menghubungkan

* **Dompet ringan yang sudah ada** tetap menggunakan integrasi lightwalletd dan mengarahkannya ke `zinder-compat-lightwalletd`. Dokumentasi Zinder membedakan kompatibilitas protokol dari dukungan: sebuah dompet baru dianggap didukung setelah rilis terkininya lulus sertifikasi menyeluruh. Rilis 0.10.0 memperbaiki kolom versi protokol `GetLightdInfo` agar Zingo dapat melakukan sinkronisasi.
* **Klien native** memanggil `zinder-query` untuk pembacaan yang dikaitkan dengan status tertentu, blok ringkas, stream peristiwa chain dan mempool, serta hasil siaran dengan alasan penolakan bertipe.
* **Aplikasi Rust** menggunakan crate `zinder-client`, SDK yang mengutamakan koneksi jarak jauh dan terhubung ke `zinder-query` tanpa menautkan stack penyimpanan.
* **Explorer dan backend** menggabungkan pembacaan dompet dengan lapisan `ExplorerQuery` opsional.

## Menjalankannya

Panduan mulai cepat upstream menjalankan node dengan [Z3 stack](/zcash-tech/z3-stack), lalu Zinder dengan Docker Compose dari checkout Zinder:

```bash
# In the Z3 checkout
Z3_NETWORK=testnet docker compose up -d

# In the Zinder checkout
docker compose --env-file deploy/.env.testnet \
  -f deploy/docker-compose.yml up -d --build
```

File env untuk Mainnet dan untuk node Zakura (`deploy/.env.zakura-mainnet`, `deploy/.env.zakura-testnet`) berada di sebelahnya. Sejak versi 0.11.0, file Compose tidak lagi mengasumsikan Z3: file env harus mencantumkan jaringan node, volume cookie, dan alamat RPC.

Port host default (Testnet menambahkan 10000):

| Layanan | Mainnet | Testnet |
|:--|:--|:--|
| gRPC native `WalletQuery` | 9102 | 19102 |
| gRPC yang kompatibel dengan lightwalletd | 9067 | 19067 |
| Kesiapan: ingest / projector / query / compat | 9105 / 9110 / 9106 / 9107 | 19105 / 19110 / 19106 / 19107 |

Kedua port dompet terikat ke loopback. Periksa port tersebut dengan:

```bash
grpcurl -plaintext -d '{}' 127.0.0.1:19102 zinder.v1.wallet.WalletQuery/ServerInfo
grpcurl -plaintext -d '{}' 127.0.0.1:19067 cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo
```

Cara deployment lainnya:

* **Image rilis** di `ghcr.io/zcashfoundation/`: keempat runtime, ditambah `zinder-wallet-serving` (ingest, projector, dan native query dalam satu container untuk host yang dapat memasang satu volume ke satu container; tanpa adapter lightwalletd) dan `zinder-canonical-runtime` (ingest saja).
* **Biner Linux** untuk x86-64 (memerlukan CPU x86-64-v3) dan AArch64, dengan glibc 2.34 atau yang lebih baru. Debian 12 adalah baseline yang tersertifikasi. Setiap rilis menyertakan SBOM dan provenance SLSA yang ditandatangani.

### Persyaratan node

* **Node arsip.** Sejak versi 0.11.0, `zinder-ingest` menolak untuk dijalankan dengan node yang dipangkas.
* Zebra **7.0.0** atau Zakura **1.8.6**. Inilah dua versi node yang tersertifikasi untuk jalur rilis.
* Untuk image `zinder-wallet-serving`, sediakan **endpoint gRPC indexer** milik node (`ZINDER_NODE__INDEXER_GRPC_ADDR`, Zebra `indexer_listen_addr`, port 8155 di Mainnet). Indexer Zakura pada alamat selain loopback memerlukan mutual TLS, yang didukung Zinder sejak versi 0.11.0.

### Kebutuhan sumber daya Mainnet

Berdasarkan panduan operasional penyajian dompet:

* Sediakan **memori minimal 8 GB**. Penggunaan puncak yang terukur: ingest sekitar 2,6 GiB, projector sekitar 2,7 GiB selama proses pembangunan, dan query hingga sekitar 1,4 GiB.
* Sisakan sekitar **130 GB ruang kosong** pada volume saat penyimpanan dompet Mainnet dibangun.
* Dalam satu pengukuran, pembangunan Mainnet dari genesis memerlukan sekitar **empat jam** untuk penyimpanan chain (staging mendekati 310 GB) dan **lebih dari dua jam** untuk penyimpanan dompet. Batas waktu pembangunan bawaan hanya sesuai untuk Testnet: tingkatkan menjadi setidaknya 24 jam dan 12 jam untuk Mainnet, atau proses pembangunan akan dimulai ulang dan tidak pernah selesai.

## Catatan rilis penting

| Versi | Tanggal | Perubahan bagi operator |
|:--|:--|:--|
| 0.7.0 | 2026-11-10 | Jendela reorganisasi default dinaikkan menjadi 1000 blok, kedalaman saat Zebra 7 dan Zakura memfinalisasi blok. Perubahan ini tidak dapat dibatalkan: rilis yang lebih lama tidak dapat membuka penyimpanan yang sudah dinaikkan batasnya |
| 0.9.0 | 2026-11-12 | Image `zinder-wallet-serving` dan `zinder-canonical-runtime` yang baru |
| 0.10.0 | 2026-11-13 | **Rilis pertama yang dapat mendekode blok NU7.** Versi 0.9.0 dan sebelumnya berhenti pada blok NU7 pertama. Revisi protokol native 8: perbarui ingest dan query secara bersamaan, beserta klien native |
| 0.11.1 | 2026-11-14 | Zakura 1.8.6 tersertifikasi bersama Zebra 7.0.0; mutual TLS ke indexer node; node yang dipangkas ditolak. Versi 0.11.0 hanya dirilis sebagai crate, jadi deploy versi 0.11.1 |
| 0.12.0 | 2026-11-14 | Perbaikan status kesiapan dan shutdown; pemutaran ulang explorer lebih cepat dan dijeda saat ruang disk menipis |

## Kesalahan Umum

**Menganggapnya sebagai perangkat lunak produksi.** Proyek ini menyebut dirinya berstatus alfa. Menurut proyek itu sendiri, deployment Compose lokal yang berhasil "belum dengan sendirinya merupakan sertifikasi untuk produksi".

**Mengarahkannya ke node yang dipangkas.** Ingest berhenti saat startup. Gunakan node Zebra atau Zakura arsip.

**Membuka port gRPC secara langsung.** Kedua port dompet terikat ke loopback karena suatu alasan. Pasang TLS, autentikasi, pembatasan laju, dan kuota pada proxy yang Anda kelola sebelum membuka port tersebut ke internet.

**Memperbarui runtime satu per satu.** Beberapa rilis mengubah revisi protokol native atau format penyimpanan. Perbarui layanan Zinder secara bersamaan, lalu perbarui klien native dalam proses peralihan yang sama.

**Menganggap dompet didukung hanya karena protokolnya didukung.** Adapter lightwalletd menggunakan protokol tersebut, tetapi Zinder hanya menyatakan dukungan untuk dompet tertentu setelah rilis terkini dompet itu tersertifikasi secara menyeluruh.

## Halaman Terkait

* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) — fungsi server dompet ringan dan data yang dapat dilihatnya
* [Zaino](/zcash-tech/zaino) — indexer Zingo Labs Rust
* [Indexer Benchmark: Zaino vs Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer)
* [Z3 Stack](/zcash-tech/z3-stack) — Zebra + Zallet, konfigurasi node yang digunakan panduan mulai cepat Zinder
* [Zebra Full Node](/zcash-tech/zebra-full-node) dan [Zakura Node](/zcash-tech/zakura-node) — dua node yang disertifikasi oleh Zinder

## Di mana saya dapat mempelajari lebih lanjut?

* Repositori [Zinder GitHub](https://github.com/ZcashFoundation/zinder)
* Rilis [Zinder](https://github.com/ZcashFoundation/zinder/releases) dan [changelog](https://github.com/ZcashFoundation/zinder/blob/main/CHANGELOG.md)
* [Apa itu Zinder dan apa yang bukan](https://github.com/ZcashFoundation/zinder/blob/main/docs/architecture/indexer-wallet-boundary.md)
* Panduan operasional [Deploying on a VM](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-on-a-vm.md) dan [wallet-serving image](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-wallet-serving.md)

**Terakhir diperbarui:** November 2026
