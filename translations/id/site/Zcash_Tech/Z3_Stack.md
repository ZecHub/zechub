<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Z3 Stack

**Z3 Stack** adalah platform node terpaket milik Zcash Foundation: **Zebra** (full node) + **Zallet** (dompet full node), dengan opsional indexer **Zaino**. Ini dimaksudkan sebagai pengganti untuk proses `zcashd` mandiri, yang menggabungkan konsensus dan dompet dalam satu biner dan mencapai akhir masa pakai pada 18 Juli 2026.

Implementasi referensinya adalah proyek Docker Compose di [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

---

## Ringkasan (TL;DR)

* Z3 **bukan merupakan client konsensus baru**. Ini adalah cara Anda menjalankan stack pasca-`zcashd` secara bersamaan: Zebra memvalidasi chain, Zallet menyimpan kunci dan menyediakan RPC dompet, dan Zaino (opsional) menggunakan protokol gRPC lightwalletd.
* Node + dompet `zcashd` yang terbundel. Z3 **memisahkan peran-peran tersebut**. Exchange, pool penambangan, dan operator wallet full-node lainnya bermigrasi ke kombinasi ini daripada hanya ke Zebra saja.
* Tiga proyek Compose yang terisolasi dapat berjalan pada satu host: **mainnet**, **testnet**, dan **regtest**.
* Sinkronisasi pertama mainnet memakan waktu sekitar **24–72 jam** dan berukuran sekitar **300 GB**. Regtest aktif dalam hitungan detik dan merupakan tempat yang tepat untuk mempelajari stack ini.
* Zallet menyematkan library indexer milik Zaino dan berkomunikasi dengan Zebra melalui JSON-RPC. Layanan Zaino mandiri hanya diperlukan jika Anda menginginkan endpoint yang kompatibel dengan lightwalletd untuk dompet eksternal.
* Zallet masih dalam tahap **beta**. Perubahan yang merusak (breaking changes) dapat mengharuskan penghapusan dan pembuatan ulang dompet. Jangan menganggapnya sebagai perangkat lunak kustodial yang sudah selesai untuk jumlah besar.

---

## Mengapa Z3 ada

Selama sebagian besar masa hidup Zcash, `zcashd` berfungsi sebagai full node referensi sekaligus satu-satunya dompet full node produksi. Desain itulah yang menjadi acuan integrasi bagi exchange, pool, dan kustodial.

`zcashd` telah dipensiunkan. Konsensus telah pindah ke [Zebra](/zcash-tech/zebra-full-node) (dan sekarang juga ke [Zakura](/zcash-tech/zakura-node)). Dompet yang tertanam telah pindah ke [Zallet](https://github.com/zcash/zallet). Layanan light-wallet sedang berpindah dari [lightwalletd](/zcash-tech/lightwallet-nodes) ke [Zaino](/zcash-tech/zaino).

Ketiga bagian tersebut adalah repositori yang terpisah, rangkaian rilis yang terpisah, dan konfigurasi yang terpisah. Z3 adalah perekatnya: image yang dipaku (pinned), health check yang menjaga dompet tetap mati hingga node tersinkronisasi, port dan volume per-jaringan, serta jalur operator yang terdokumentasi.

Nama tersebut adalah singkatan ekosistem informal — Zebra, Zaino, Zallet — meskipun file Compose default hanya memulai Zebra dan Zallet. Zaino adalah profil Compose, bukan proses ketiga yang diwajibkan.

---

## Arsitektur

```
                    ┌──────────────────────── Z3 (per network) ────────────────────────┐
                    │                                                                  │
  peers ◄──P2P──►  Zebra (zebrad)  ──JSON-RPC──►  Zallet                                │
                    │   full node                    │  embeds Zaino libraries          │
                    │                                │  wallet RPC for operators        │
                    │                                └─────────────────────────────────┤
                    │                                                                  │
                    │   Zaino (optional, --profile indexer)                            │
                    │     lightwalletd-compatible gRPC + JSON-RPC proxy                │
                    │            │                                                     │
                    └────────────┼─────────────────────────────────────────────────────┘
                                 ▼
                        light wallets / explorers
```

| Komponen | Peran dalam Z3 | Diperlukan? |
| --- | --- | --- |
| **Zebra** | Menyinkronkan dan memvalidasi chain, gossip, JSON-RPC, endpoint health | Ya |
| **Zallet** | Dompet full-node. Menyematkan library Zaino. Terhubung langsung ke JSON-RPC Zebra. **Tidak** memanggil kontainer Zaino yang berdiri sendiri | Ya |
| **Zaino** | Indexer mandiri. gRPC yang kompatibel dengan lightwalletd untuk light client eksternal, ditambah proxy JSON-RPC untuk explorer dan faucet | Tidak — `--profile indexer` |

Z3 menyematkan versi gambar di `docker-compose.yml`. Timpa dengan `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE`, atau `Z3_ZALLET_IMAGE` jika Anda memerlukan tag yang berbeda.

---

## Bagaimana ini berbeda dari zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| Bahasa | C++ (fork Bitcoin) | Layanan Rust, diorkestrasi dengan Docker Compose |
| Model proses | Satu biner: node + dompet | Kontainer node dan dompet terpisah |
| Konsensus | Dihentikan (EOS 18 Juli 2026) | Zebra (atau node kompatibel lainnya) |
| Dompet | `wallet.dat` bawaan | Zallet, datadir terenkripsi-age |
| Light client | Biasanya lightwalletd terpisah | Profil Zaino opsional |
| Konfigurasi | `zcash.conf` | File per-jaringan di bawah `config/<network>/` ditambah file env Compose |
| Jaringan pada satu host | Bentrokan port yang menyulitkan | Kelas utama: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Jika Anda masih memiliki dompet `zcashd`, gunakan [panduan migrasi](/guides/migration-guide-zcashd-to-zebrad-zallet) dari ZecHub dan `migrate-zcashd-wallet`perintah dari Zallet daripada menyalin `wallet.dat` ke dalam volume Z3.

---

## Jaringan

Z3 terdiri dari tiga proyek Compose yang independen. Proyek-proyek ini tidak berbagi port atau volume.

| Jaringan | Nama proyek | Gunakan untuk | Sinkronisasi pertama | Dana asli |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | Produksi | 24–72 jam | Ya |
| **testnet** | `z3-testnet` | Staging pada jaringan uji publik | 2–12 jam | Tidak (uji ZEC) |
| **regtest** | `z3-regtest` | Praktik lokal: blok instan, tanpa peer | Detik | Tidak |

Operator baru sebaiknya memulai pada **regtest**, konfirmasikan alur RPC dan dompet, lalu pindah ke testnet atau mainnet.

---

## Port host default

Ketiga jaringan tersebut dimaksudkan untuk dapat berjalan bersamaan pada satu mesin. Nilai-nilai di bawah ini adalah nilai default yang dipublikasikan; setiap nilai dapat ditimpa melalui variabel lingkungan `Z3_*` yang sesuai. Matriks kanoniknya adalah [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| Layanan | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| JSON-RPC Zebra | 8232 | 18232 | 29232 |
| P2P Zebra | 8233 | 18233 | (tidak dipublikasikan) |
| health (`/ready`) Zebra | 8080 | 18080 | 28080 |
| gRPC (profil indexer) Zaino | 8137 | 18137 | 28137 |
| JSON-RPC (profil indexer) Zaino | 8237 | 18237 | 28237 |
| RPC Zallet | 28232 | 40232 | 50232 |

Di dalam jaringan Compose, layanan diselesaikan berdasarkan nama (`zebra`, `zaino`, `zallet`).

---

## Data dan cadangan

| Volume | Apa yang dikandungnya | Cadangkan? |
| --- | --- | --- |
| `z3-<network>-chain` | State chain Zebra (~300 GB mainnet) | Opsional — dapat disinkronisasi ulang |
| `z3-<network>-zallet` | Database dompet terenkripsi **dan** identitas age yang membukanya | **Ya — ini adalah satu-satunya volume yang wajib dicadangkan** |
| `z3-<network>-zaino` | State indexer (hanya dengan profil indexer) | Opsional — dapat dibangun ulang |
| `z3-<network>-cookie` | Cookie RPC Zebra | Tidak — dibuat ulang |

Untuk meletakkan status chain pada disk lain sebelum memulai pertama kali:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` menghentikan stack dan menyimpan volume. Menambahkan `-v` akan menghapusnya dan memaksa sinkronisasi ulang secara penuh. Sertakan `--profile "*"` agar layanan yang dibatasi profil (indexer, monitoring) benar-benar dihentikan.

---

## Memulai

Prasyarat: Docker Engine, Docker Compose v2.24.4+, Git. `openssl` hanya diperlukan untuk regtest.

### Regtest (cara tercepat untuk melihat stack)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Lihat [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) untuk perintah pengujian.

### Mainnet (boot dua fase)

Zebra harus selesai melakukan sinkronisasi sebelum Zallet dapat digunakan. Memulai Zallet lebih awal akan membuatnya mengalami loop-restart hingga `/ready` bernilai benar.

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3

# 1. One-time setup: local config + Zallet wallet identity
./scripts/setup-network.sh mainnet

# 2. Start Zebra and wait until it is synced
docker compose --env-file .env.mainnet up -d zebra
./scripts/check-zebra-readiness.sh

# 3. Start Zallet (and anything else in the default profile)
docker compose --env-file .env.mainnet up -d
```

Testnet memiliki alur yang sama dengan `.env.testnet` dan `./scripts/check-zebra-readiness.sh 18080`.

Penyuntingan di bawah `config/<network>/` tetap bersifat lokal dan bertahan dalam `git pull`.

### Profil opsional

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Port default Grafana adalah 3000 (mainnet), 13000 (testnet), 23000 (regtest).

---

## Catatan operator

* **Gambar yang disematkan.** Z3 tidak melayang secara diam-diam ke `:latest`. Perbarui pin dalam perubahan yang telah ditinjau, atau atur `Z3_<SERVICE>_IMAGE`.
* **Kontainer non-root.** Kapabilitas Linux akan dihapus. Pemeriksaan kesehatan (health checks) menahan dompet hingga Zebra siap. Kebijakan restart aktif secara default.
* **Log.** Z3 tidak menetapkan driver logging tertentu. Atur batas ukuran dalam konfigurasi daemon Docker atau log akan tumbuh tanpa batas pada node yang berjalan 24/7.
* **P2P.** Mainnet dan testnet mempublikasikan port P2P dari Zebra. Di belakang NAT, atur `ZEBRA_NETWORK__EXTERNAL_ADDR` ke alamat yang harus dihubungi oleh peer. Regtest tidak memiliki peer.
* **Zaino pada ARM.** Gambar Zaino upstream hanya untuk `linux/amd64`. Pada Apple Silicon, ini berjalan di bawah emulasi kecuali jika Anda membangunnya dari source. Zebra dan Zallet bersifat multi-arch.
* **Host bersama.** Tidak ada batasan CPU atau memori yang ditetapkan secara default. Tambahkan `deploy.resources.limits` dalam file override jika server tersebut tidak didedikasikan untuk node.

Daftar periksa dan FAQ siap produksi: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Siapa yang sebaiknya menjalankan Z3

**Sesuai**

* Exchange, kustodial, dan mining pool yang menggunakan `zcashd` sebagai node-plus-wallet
* Operator yang menginginkan RPC dompet full-node yang didukung terhadap Zebra yang tersinkronisasi
* Developer yang membutuhkan mainnet, testnet, dan regtest secara berdampingan
* Siapa pun yang membangun endpoint yang kompatibel dengan lightwalletd secara privat melalui profil Zaino

**Biasanya alat yang salah**

* Pengguna akhir yang hanya perlu mengirim dan menerima ZEC — gunakan light wallet seperti ZODL / Zashi, Zingo, atau YWallet
* Orang yang hanya ingin memvalidasi chain — jalankan Zebra (atau Zakura) saja
* Orang yang hanya ingin melayani compact blocks — jalankan Zebra + Zaino, atau Zebra + lightwalletd, tanpa Zallet

---

## Halaman terkait

* [Zebra Full Node](/zcash-tech/zebra-full-node) — wraps Z3 consensus node
* [Zaino](/zcash-tech/zaino) — profil indexer opsional
* [Full Nodes](/zcash-tech/full-nodes) — Zebra, Zakura, dan zcashd yang telah dipensiunkan
* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) — apa yang dihubungi oleh light client
* [Zakura Node](/zcash-tech/zakura-node) — full node alternatif; bukan apa yang disertakan dalam Z3 saat ini
* [Panduan Migrasi: zcashd ke Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Sumber Daya Developer](/start-here/developer-resources)

---

## Sumber Daya

* Repositori [Z3](https://github.com/ZcashFoundation/z3)
* Kontrak [Z3 (port, volume, nama proyek)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [Buku ZebraZ3](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Buku ZalletZ3](https://zcash.github.io/zallet/)
* [Zcash Forum Komunitas — pembaruan Z3](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 Launcher](https://github.com/Jubrilabdulazeez/z3-launcher) — control plane komunitas atas stack Compose resmi (ZecHub Hackathon)

