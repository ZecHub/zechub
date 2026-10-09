<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Zallet

Zallet adalah dompet Zcash full-node yang ditulis dalam Rust. Ini merupakan pengganti untuk dompet yang sebelumnya tertanam di `zcashd`. Setelah `zcashd` mencapai penghentian End-of-Support pada 18 Juli 2026 di ketinggian blok 3417100, tugas konsensus dan dompet dibagi: **Zebra** atau **Zakura** memvalidasi chain, dan **Zallet** menyimpan key, memindai note, dan menyediakan wallet JSON-RPC.

Zallet saat ini berada dalam tahap **beta**. Fitur ini belum ditinjau sepenuhnya. Perubahan yang merusak (breaking changes) mungkin mengharuskan Anda menghapus dan membuat ulang dompet. Jangan menggunakannya sebagai kustodial produksi untuk jumlah ZEC yang besar tanpa membaca peringatan keamanan di [Buku Zallet](https://zcash.github.io/zallet/).

---

## Ringkasan Singkat

- Zallet adalah **dompet RPC full-node**, bukan dompet light mobile dan bukan node konsensus.
- Ini menggantikan bagian dompet dari `zcashd`. Bagian node adalah [Zebra](Zebra_Full_Node.md) atau [Zakura](Zakura_Node.md).
- Ditulis dalam **Rust**, berlisensi ganda MIT / Apache-2.0, dipelihara di [zcash/zallet](https://github.com/zcash/zallet).
- Rilis terbaru yang diterbitkan hingga akhir Agustus 2026: **v0.1.0-beta.3**.
- Berkomunikasi dengan data chain melalui salah satu dari dua backend: **zebra-state** (`ReadStateService` langsung terhadap `zebrad` lokal) atau **Zaino**.
- Mengekspos subset **JSON-RPC yang kompatibel dengan zcashd**. Beberapa metode berubah; beberapa sengaja dihilangkan.
- Materi kunci selalu dienkripsi dengan **age**. Riwayat transaksi, alamat, dan viewing key tersimpan dalam bentuk teks biasa di `wallet.db`.
- Menyertakan tiga biner dalam satu arsip bertanda tangan: `zallet` (launcher), `zallet-zebra`, dan `zallet-zaino`.
- Dokumentasi resmi: [Buku Zallet](https://zcash.github.io/zallet/).

---

## Mengapa Zallet ada

`zcashd` menggabungkan sebuah node konsensus turunan Bitcoin Core dan sebuah dompet dalam satu proses. Desain tersebut sudah tidak ada lagi.

| Peran | Stack lama | Stack saat ini |
|------|-----------|---------------|
| Konsensus / P2P | `zcashd` | Zebra (`zebrad`) atau Zakura |
| Dompet / kunci / saldo | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| Indexer light-client | `lightwalletd` | Zaino atau `lightwalletd` |

Memisahkan dompet dari node berarti:

- Perangkat lunak node dapat di-swap (Zebra vs Zakura) tanpa memindahkan key.
- Pemindaian dompet dan otoritas pengeluaran berada dalam sebuah proses yang dapat dikunci secara terpisah.
- Semantik RPC dapat berkembang menuju 32 akun ZIP, Alamat Terpadu (Unified Addresses), dan PCZT alih-alih tetap terpaku pada keanehan `zcashd`.

Zallet adalah dompet yang ditujukan bagi operator yang sebelumnya menjalankan `zcashd` sebagai hot wallet, backend exchange, faucet, atau dompet pembayaran penambangan.

---

## Status

Zallet sedang dalam tahap **beta**.

Apa artinya hal tersebut dalam praktiknya:

- Perubahan yang merusak (breaking changes) dapat terjadi pada versi beta mana pun. Anda mungkin harus menghapus direktori data dan memulainya kembali.
- Tidak semua RPC dompet `zcashd` telah dipindahkan.
- Semantik dari beberapa metode yang dipindahkan berbeda dari `zcashd`. Integrasi harus membaca [halaman semantik-yang-diubah](https://zcash.github.io/zallet/zcashd/json_rpc.html).
- crate-crate ini sedang dalam tahap pengembangan dan belum ditinjau sepenuhnya.
- Zallet **bukan** merupakan library Rust. Tidak ada jaminan jika Anda menggunakannya sebagai sebuah library.

Umpan balik dikirimkan ke [GitHub masalah](https://github.com/zcash/zallet/issues/new) atau saluran `#wallet-dev` di [Zcash R&D Discord](https://discord.gg/xpzPR53xtU).

Fase stabil selanjutnya direncanakan setelah permukaan RPC yang dimaksud tersedia. Pemanggil kemudian diharapkan untuk bermigrasi ke metode-metode Zallet, termasuk perbedaan semantik yang telah didokumentasikan.

---

## Arsitektur

Zallet terbagi ke dalam tiga workspace Cargo sehingga kedua backend chain dapat melacak grafik dependensi yang berbeda.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

Ketiga biner tersebut membuka `wallet.db` yang **sama**. Launcher akan memilih backend pada saat runtime; Anda tidak perlu melakukan kompilasi ulang untuk berpindah.

Penerapan umum:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet adalah **dompet full-node**: ia memerlukan node validasi lokal. Ini bukan sebuah light client. Untuk dompet ringan dan server compact-block, lihat [Zaino](Zaino.md) dan [Node Lightwallet](Lightwallet_Nodes.md).

Stack kompresi [Z3](https://github.com/ZcashFoundation/z3) dari Zcash Foundation menjalankan Zebra + Zallet secara bersamaan, dengan Zaino mandiri opsional untuk light client eksternal.

---

## Akun, alamat, dan kunci

Zallet dibangun di sekitar 32 akun ZIP, bukan satu akun implisit milik `zcashd`.

- Sebuah dompet dapat menyimpan **beberapa mnemonik BIP 39**. Setiap mnemonik adalah root pengeluaran independen, yang diidentifikasi oleh **sidik jari seed** (`zip32seedfp1…`).
- **Akun** diturunkan dari sebuah seed dengan indeks akun ZIP 32. Di dalam satu instansi Zallet, akun tersebut juga memiliki **UUID** lokal. Identitas portabel dari sebuah akun adalah `(seedfp, account index)`.
- Alamat adalah **Alamat Terpadu ZIP 316**, yang dihasilkan dengan `z_getaddressforaccount`. Satu akun dapat memiliki banyak alamat yang terdiversifikasi; penerima terlindungi tidak dapat ditautkan secara on-chain.
- Spending key yang diimpor (`z_importkey`) dan alamat watch-only (`z_importaddress`) menjadi akun UUID yang tidak dicakup oleh mnemonik apa pun.
- Viewing key dapat diekspor dan diimpor (`z_exportviewingkey`, `z_importviewingkey`), termasuk unified full viewing keys dan incoming viewing keys.

`getnewaddress` belum diimplementasikan. Gunakan `z_getnewaccount` dan `z_getaddressforaccount`.

Jika `keystore.require_backup` berada pada (bentuk migrasi dari `walletrequirebackup` milik `zcashd`), Zallet menolak untuk menurunkan otoritas pengeluaran baru dari mnemonic yang cadangannya belum dikonfirmasi.

---

## Enkripsi dan pencadangan

Materi kunci **selalu** dienkripsi. Tidak ada mode tanpa enkripsi dan tidak ada RPC `encryptwallet` — metode `zcashd` tersebut tidak pernah didukung sepenuhnya.

- Setup membuat identitas **age**, jalur default `{datadir}/encryption-identity.txt`.
- Mnemonics dan spending key yang diimpor disimpan sebagai ciphertext age di `wallet.db`.
- Sisa database **tidak** dienkripsi. Riwayat, alamat, dan viewing key dapat dibaca jika seseorang mendapatkan file tersebut.
- Identitas dapat dibungkus dengan passphrase (`generate-encryption-identity -p`). Buka kunci dengan RPC `walletpassphrase`; kunci dengan `walletlock`.
- Kehilangan file identitas atau passphrase Anda membuat spending key tidak dapat dipulihkan. Cadangkan identitas, setiap mnemonic, dan (secara terpisah, dalam keadaan terenkripsi) setiap salinan `wallet.db` yang Anda simpan.

Menyalin `wallet.db` saat Zallet sedang berjalan bukanlah cadangan yang aman. SQLite dapat mengalami kerusakan (tear). Lebih baik gunakan proses yang telah dihentikan, atau tunggu perintah online-backup resmi.

---

## JSON-RPC

Zallet mengimplementasikan subset dari RPC dompet `zcashd` melalui HTTP dengan Basic auth. Hubungkan ke loopback. Penggunaan jarak jauh harus melalui terowongan terenkripsi. `rpc.allow_insecure_remote_bind` tersedia dan tidak aman.

Perbedaan penting dari `zcashd`:

- Bidang saldo pada `getwalletinfo` kosong. Gunakan `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`.
- Biaya mengikuti **ZIP 317**. Tidak ada `settxfee`.
- Konstruksi pengeluaran sedang beralih ke **PCZTs** (Transaksi Zcash yang Dibuat Sebagian, ZIP 374). RPC PCZT telah tersedia dalam seri beta.
- **sync lock** global memblokir RPC saldo dan pengeluaran saat dompet sedang melakukan sinkronisasi atau pulih dari reorg (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

Metode yang sengaja dihilangkan meliputi `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet`, dan `encryptwallet`. Penggantinya tercantum dalam Buku [Zallet](https://zcash.github.io/zallet/zcashd/json_rpc.html).

---

## Memulai

Jalur instalasi resmi (paket Debian, Docker, biner rilis) terdapat dalam [panduan instalasi](https://zcash.github.io/zallet/guide/installation/index.html). Arsip rilis diberi nama `zallet-<version>-<arch>.tar.gz` dan berisi ketiga biner tersebut.

Alur dompet baru minimal:

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, backend, indexer / read-state, rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

Arahkan `[indexer]` ke endpoint JSON-RPC `zebrad` lokal. Backend zebra juga membutuhkan `[indexer.read_state_service]` dan `zebrad` yang dibangun dengan fitur indexer sehingga Zallet dapat membaca status chain secara langsung.

Gambar yang dapat direproduksi dapat dibuat dengan [StageX](https://codeberg.org/stagex/stagex/) (Docker 25+, containerd image store, GNU Make).

---

## Bermigrasi dari zcashd

Simpan `zcashd` datadir lama hingga Anda telah mengonfirmasi saldo dan melakukan pemulihan yang telah diuji.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` hanya tersedia dalam build dengan fitur `zcashd-import`. Membaca `wallet.dat` memerlukan `db_dump` dari **Berkeley DB 6.2**, versi yang digunakan oleh `zcashd`.

Catatan operator langkah demi langkah: [Panduan Migrasi: zcashd ke Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Bagaimana Zallet berhubungan dengan perangkat lunak lainnya

| | Zallet | zecd | Zashi / ZODL / YWallet | Zebra / Zakura | Zaino |
|--|--------|------|------------------------|----------------|-------|
| Apa itu | Dompet RPC full-node | Server dompet shielded-first | Dompet pengguna akhir | Consensus node | Pengganti Indexer / lightwalletd |
| Menggantikan | Dompet `zcashd` | Bukan klon `zcashd` yang siap pakai | Aplikasi mobile/desktop | Node `zcashd` | `lightwalletd` |
| Membutuhkan node lokal | Ya | Ya (Zebra secara default) | Tidak (light client) | Ini *adalah* node tersebut | Ya |
| Kompatibilitas RPC zcashd | Dirancang sebagai jalur kompatibilitas | Hanya subset kecil yang dipilih | N/A | Mode kompatibilitas Parsial / Zakura | API Berbeda |
| Model kustodial | Operator memegang kunci di `wallet.db` | Server yang dapat dipulihkan dengan frasa pemulihan | Kunci perangkat pengguna | Tidak ada dompet | Tidak ada kunci |

Zallet dan **zecd** keduanya dapat diletakkan di depan Zebra. Pilih Zallet saat Anda membutuhkan permukaan dompet `z_*` dan jalur migrasi dari `wallet.dat`. Pilih zecd saat Anda menginginkan server yang mengutamakan-transaksi-terlindungi yang secara eksplisit *bukan* merupakan klon `zcashd`.

Terdapat produk konsumen terpisah di [zallet.io](https://www.zallet.io/) yang menggunakan nama yang sama. Aplikasi tersebut bukanlah proyek ini.

---

## Halaman terkait

- [Full Nodes](Full_Nodes.md) — Zebra, Zakura, dan node `zcashd` yang telah dipensiunkan
- [Zebra Full Node](Zebra_Full_Node.md) — pembacaan backend default dari node Zallet
- [Zakura Node](Zakura_Node.md) — node validasi alternatif
- [Zaino](Zaino.md) — backend indexer dan server light-client
- [ZECD](ZECD.md) — desain wallet-server lain pada librustzcash
- [Zcash Sinkronisasi Wallet](Zcash_Wallet_Syncing.md) — cara wallet terlindungi memindai chain
- [Viewing Keys](Viewing_Keys.md)

## Sumber Daya

- [Buku Zallet](https://zcash.github.io/zallet/)
- [zcash/zallet di GitHub](https://github.com/zcash/zallet)
- [Rilis](https://github.com/zcash/zallet/releases)
- [Perubahan semantik JSON-RPC](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [Panduan migrasi ZecHub](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [Panduan ZecHub Raspberry Pi (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (stack Zebra + Zallet compose)](https://github.com/ZcashFoundation/z3)
- [R&D Zcash Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`