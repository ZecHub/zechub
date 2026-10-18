<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Panduan Praktis: Node RPC dan Pengindeksan Blockchain Zcash

Halaman ini adalah panduan praktis untuk berkomunikasi dengan full node Zcash yang berjalan melalui JSON-RPC serta memasang indexer yang dapat dikueri oleh dompet ringan dan penjelajah. Ini **bukan** panduan instalasi kedua.

Untuk cara menjalankan stack pasca-`zcashd` (Zebra + Zallet, Zaino opsional, port, volume, boot dua fase), gunakan halaman [Stack Z3](/zcash-tech/z3-stack) dan [repositori Z3](https://github.com/ZcashFoundation/z3). Untuk latar belakang node konsensus, lihat [Full Node](/zcash-tech/full-nodes) dan [Zebra Full Node](/zcash-tech/zebra-full-node).

`zcashd` mencapai akhir masa pakainya pada 18 Juli 2026. Pekerjaan operator baru harus menargetkan Zebra (atau [Zakura](/zcash-tech/zakura-node)) serta dompet/indexer, bukan `zcashd`.

---

## Ringkasan

* **JSON-RPC** adalah cara operator dan dompet menanyakan node mengenai chain tip, peer, dan (pada proses dompet) saldo. Pada Z3, Zebra melayani node RPC; Zallet melayani wallet RPC.
* **Regtest** adalah tempat yang tepat untuk mempelajari pemanggilan ini. Router RPC Z3 pada `http://127.0.0.1:8181` menerima `zebra` / `zebra` dan meneruskan metode node ke Zebra serta metode dompet ke Zallet.
* **Mainnet dan testnet** menggunakan autentikasi cookie pada Zebra. Jangan menyalin nama pengguna/kata sandi regtest ke node publik.
* **Pengindeksan** adalah pekerjaan terpisah dari validasi. Zebra memvalidasi. [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) melayani gRPC yang kompatibel dengan lightwalletd. [Ztreamer](https://github.com/distractedm1nd/ztreamer) adalah indexer yang didukung Zakura; ini bukan yang disediakan Z3.
* JSON-RPC Zaino dan gRPC indexer opsional Zebra ditujukan untuk loopback atau jaringan tepercaya. Jangan mengeksposnya tanpa autentikasi di internet publik.

---

## Proses mana yang menjawab setiap panggilan

| Yang kamu inginkan | Hubungi | Port host mainnet Z3 | Catatan |
| --- | --- | --- | --- |
| Chain tip, peer, `getblockchaininfo` | JSON-RPC Zebra | 8232 | Autentikasi cookie |
| Saldo dompet, alamat, kirim | RPC Zallet | 28232 | Proses terpisah; perangkat lunak beta |
| Blok ringkas untuk dompet ringan | gRPC Zaino | 8137 | Hanya dengan `--profile indexer`; h2c plaintext |
| Proxy JSON-RPC penjelajah / faucet | JSON-RPC Zaino | 8237 | Hanya jaringan tepercaya |
| Mempraktikkan semua hal di atas tanpa sinkronisasi | Router RPC regtest Z3 | 8181 | Nama pengguna `zebra` / kata sandi `zebra` |

Matriks port dan nama proyek Compose: [Stack Z3](/zcash-tech/z3-stack) dan [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Berlatih di regtest terlebih dahulu

Dari checkout Z3, setelah `./scripts/regtest-init.sh` dan `docker compose --env-file .env.regtest up -d`:

```bash
# Node method (Zebra)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getblockchaininfo","params":[],"id":1}' \
  http://127.0.0.1:8181

# Wallet method (Zallet)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getwalletinfo","params":[],"id":2}' \
  http://127.0.0.1:8181
```

Hasil `getblockchaininfo` yang sehat mencakup `"blocks"` dan peta `"upgrades"`. Jika curl macet, router belum berjalan; jika kamu mendapatkan `401`, kamu mengakses Zebra secara langsung alih-alih melalui router (Zebra langsung pada regtest adalah `29232` dan tetap mengharapkan kredensial router kecuali kamu mengubahnya).

Alur kerja regtest lengkap, termasuk menambang blok aktivasi: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## JSON-RPC mainnet / testnet (autentikasi cookie)

Pada mainnet dan testnet, Zallet serta layanan Zaino opsional membaca **volume cookie bersama**. Cookie tersebut dibuat ulang saat boot; ini bukan target backup.

**Jangan** memublikasikan JSON-RPC Zebra ke internet publik. Panggil dari jaringan Compose (`zebra:8232`) atau dari host hanya jika kamu mengikatnya ke loopback.

Pemeriksaan operator umum setelah Zebra berstatus `/ready`:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` adalah RPC penambangan. Pool yang masih mengharapkan satu proses `zcashd` memerlukan Zebra (atau Zakura) untuk template serta dompet apa pun yang mereka gunakan untuk coinbase. Lihat [Zcash Pool Penambangan](/using-zcash/zcash-mining-pools) dan [panduan migrasi](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Pasang indexer

Validasi dan pengindeksan adalah pekerjaan yang berbeda.

### Zaino (yang disediakan Z3)

Zaino membaca Zebra dan melayani API gRPC yang kompatibel dengan lightwalletd serta proxy JSON-RPC. Zallet **tidak** memerlukan container Zaino mandiri; ia menyematkan pustaka Zaino dan berkomunikasi dengan Zebra melalui JSON-RPC. Jalankan Zaino mandiri ketika kamu menginginkan dompet ringan eksternal, penjelajah, atau faucet:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Tunggu sampai Zebra tersinkron sebelum mengarahkan klien ke Zaino. Indexer massal yang sedang mengejar ketertinggalan dengan konkurensi pengambilan tinggi dapat memperlambat verifier Zebra; pertahankan `fetch_concurrency` pada angka satu digit rendah sampai indexer selesai mengejar ketertinggalan.

gRPC regtest (plaintext; port `28137`):

```bash
# From the Z3 repo, after: scripts/vendor.sh zaino
# and: docker compose --env-file .env.regtest --profile indexer up -d zaino

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  -d '{}' \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLatestBlock
```

gRPC Zaino adalah h2c plaintext di semua jaringan. Akhiri TLS pada reverse proxy jika ada apa pun di luar host yang akan terhubung. Detail: [Zaino](/zcash-tech/zaino) dan [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Indexer lain (bukan Z3)

* **lightwalletd** — server blok ringkas yang lebih lama. Masih digunakan secara luas; Zaino adalah jalur penerus untuk peran ini.
* **Ztreamer** — indexer yang didukung Zakura dan implementasi `CompactTxStreamer`. Ini bukan layanan Z3. Lihat [Ztreamer repositori](https://github.com/distractedm1nd/ztreamer).
* **Zebra `rpc.indexer_listen_addr`** — listener gRPC opsional *di dalam* Zebra. Z3 tidak memerlukannya dan tidak memublikasikannya ke host.

---

## Kesalahan umum

**Memanggil metode dompet pada Zebra.** `getwalletinfo` dan RPC pengiriman berada pada Zallet (atau dompet lain), bukan pada node konsensus.

**Memulai Zallet sebelum Zebra berstatus `/ready`.** Zallet akan terus melakukan restart-loop. Gunakan `scripts/check-zebra-readiness.sh` pada mainnet/testnet.

**Menyalin `zebra`/`zebra` regtest ke mainnet.** Autentikasi cookie adalah default mainnet/testnet dengan alasan yang tepat.

**Menganggap Zaino sebagai full node.** Zebra (atau Zakura) memvalidasi. Zaino mengindeks.

**Mengekspos JSON-RPC Zaino atau gRPC indexer Zebra secara publik.** Endpoint tersebut ditujukan untuk loopback atau jaringan privat tepercaya.

**Mengasumsikan setiap dompet ringan sudah berbicara Zaino.** Periksa rilis terkini dompet tersebut terhadap protokol yang benar-benar diimplementasikannya.

---

## Halaman terkait

* [Stack Z3](/zcash-tech/z3-stack) — instalasi, port, volume, boot dua fase
* [Zaino](/zcash-tech/zaino) — peran indexer dan catatan operator
* [Full Node](/zcash-tech/full-nodes)
* [Zebra Full Node](/zcash-tech/zebra-full-node)
* [Node Lightwallet](/zcash-tech/lightwallet-nodes)
* [Panduan Migrasi: zcashd ke Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib dan Tutorial Zaino](/guides/zingolib-and-zaino-tutorial)

## Sumber daya

* [repositori Z3](https://github.com/ZcashFoundation/z3)
* [Panduan praktis regtest Z3 (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [FAQ Z3](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet Buku](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**Terakhir diperbarui:** September 2026
