<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZECD — Server Dompet Terlebih Dahulu Terlindungi

> 🇧🇷 [Versi dalam Bahasa Portugis](/zechubglobal/zcashbrasil/zcashtech/zecd)

ZECD adalah server dompet yang mengutamakan fitur terlindungi untuk Zcash, dibangun di atas [librustzcash](https://github.com/zcash/librustzcash) dan diekspos melalui dialek JSON-RPC Bitcoin Core. ZECD memberikan API yang familiar dan kompatibel dengan Bitcoin bagi developer dan integrator pembayaran untuk berinteraksi dengan Zcash — sekaligus menjadikan Orchard (pool paling privat) sebagai default. Dikembangkan oleh [zec.rocks](https://zec.rocks), ZECD dirancang untuk menggantikan fungsionalitas dompet `zcashd` dalam deployment cloud-native modern.

**Versi saat ini:** 0.5.0-rc3 (13 Juli 2026) — dengan dukungan Ironwood (NU6.3). Instal melalui `cargo install zecd` atau gunakan Docker image resmi.

---

## Ringkasan (TL;DR)

- ZECD adalah sebuah **wallet daemon (server)** — bukan sebuah full node. Ia menangani kunci, pemindaian, pembuktian, dan RPC tanpa menggunakan protokol P2P Zcash.
- Ia menggunakan **dialek JSON-RPC Bitcoin Core**: nama metode, bentuk field, autentikasi, dan kode kesalahan yang sama — banyak klien RPC Bitcoin dapat bekerja dengan Zcash secara langsung.
- **Alamat (terlindungi) Orchard adalah default**; dukungan untuk alamat transparan (t-address) dan Sapling memerlukan persetujuan eksplisit per dompet.
- Ia terhubung ke **full node [Zebra](Zebra_Full_Node.md) yang dihosting sendiri** melalui JSON-RPC lokal — tidak memerlukan lightwalletd.
- **Stateless secara desain**: seluruh dompet dapat dipulihkan hanya dari frasa pemulihan, sehingga direktori data bersifat disposable.
- **Bukan pengganti langsung untuk zcashd**: hanya mengimplementasikan sebagian metode RPC Zcash, dengan perbedaan desain yang disengaja demi privasi dan keamanan.
- Biaya mengikuti **ZIP-317** (perhitungan biaya deterministik); biaya yang ditentukan oleh pengguna akan ditolak.
- Mendukung **memo terlindungi (ZIP-302)** melalui antarmuka RPC Bitcoin yang sudah dikenal.

---

## Masalah Apa yang Diselesaikan oleh ZECD?

`zcashd` adalah gabungan dari node dan dompet asli Zcash — merupakan fork dari codebase C++ Bitcoin pada tahun 2016. Seiring berjalannya waktu, hal ini menciptakan friksi: kode tersebut sulit untuk dipelihara, dompet terikat erat dengan node, dan alamat transparan disajikan sebagai opsi utama bersama dengan alamat terlindungi.

ZECD memisahkan tanggung jawab dompet dari konsensus. Ini adalah **lapisan dompet khusus** yang berada di antara aplikasi dan Zebra full node, yang menyediakan:

- Implementasi Rust yang bersih dan modern yang dibangun di atas librustzcash (library yang sama yang menggerakkan Zodl dan Zingo)
- Desain privacy-by-default (alamat Orchard kecuali dikonfigurasi lain)
- Antarmuka RPC yang kompatibel dengan Bitcoin yang menghilangkan kebutuhan untuk mempelajari tooling khusus Zcash
- Arsitektur stateless, dapat dipulihkan dengan frasa pemulihan yang sesuai untuk deployment containerized dan cloud

---

## Arsitektur

ZECD beroperasi dalam model tiga tingkat:

```
Your app / Bitcoin RPC client
        ↓  JSON-RPC
       ZECD
   (keys, scanning, proving, RPC)
        ↓  JSON-RPC (local only)
       Zebra
   (full node — consensus, mempool, chain data)
```

ZECD berkomunikasi dengan Zebra **secara eksklusif melalui JSON-RPC lokal** — tanpa jaringan peer-to-peer, tanpa indexer pihak ketiga, tanpa lightwalletd. Koneksi Zebra sengaja dibuat hanya untuk lokal: ZECD akan menolak untuk mengirim kredensial ke host yang dapat dirutekan secara global kecuali dikonfigurasi secara eksplisit untuk terowongan aman out-of-band (misalnya WireGuard atau SSH).

---

## Fitur Utama

### Utamakan Terlindungi, Orchard secara Default

ZECD menggunakan Orchard Unified Addresses sebagai tipe alamat default. Pool Sapling dan transparan (t-address) memerlukan konfigurasi eksplisit per dompet. Desain ini mengurangi risiko pengiriman transparan yang tidak disengaja — sebuah celah privasi umum pada alat Zcash versi lama.

Kebijakan privasi dapat dikonfigurasi per panggilan atau secara global di `[spend] privacy_policy`:

| Kebijakan | Perilaku |
|--------|----------|
| `AllowRevealedRecipients` (default) | Mengizinkan pengiriman ke penerima transparan; mengungkapkan jumlah dan penerima secara on-chain |
| `AllowRevealedAmounts` | Mengizinkan pengiriman lintas pool (Sapling↔Orchard) tetapi menolak penerima transparan |
| `FullPrivacy` | Hanya pengiriman yang sepenuhnya terlindungi dalam satu pool; menolak penerima transparan dan lintas pool |
| `AllowFullyTransparent` | Juga mengizinkan pengiriman t→t yang didanai dari UTXO transparan |

### Kompatibilitas RPC Bitcoin Core

ZECD mengimplementasikan dialek JSON-RPC dari Bitcoin Core dengan kepatuhan pada:

- Nama metode (misalnya `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`)
- Nama field dan tipe dalam respons
- Struktur envelope JSON-RPC 1.0
- Basic auth, entri `rpcauth`, dan autentikasi file cookie
- Kode error dan pemetaan status HTTP (HTTP 500 dengan body error, semantik 401)

Ini berarti banyak library pembayaran Bitcoin yang sudah ada, integrasi exchange, dan alat pemantauan dapat berinteraksi dengan Zcash melalui ZECD dengan sedikit atau tanpa perubahan kode.

Rangkaian kepatuhan (140+ pemeriksaan) dijalankan pada setiap PR terhadap daemon regtest yang aktif dan juga telah divalidasi terhadap testnet publik.

### Memo Terlindungi (ZIP-302)

ZECD mengekspos fitur memo terlindungi dari Zcash melalui antarmuka Bitcoin RPC yang sudah dikenal — sesuatu yang tidak tersedia dalam alat Bitcoin standar:

- `sendtoaddress` menerima opsional hex memo sebagai parameter tambahan di akhir (hingga 512 byte; ditolak untuk penerima transparan)
- Entri riwayat transaksi dari `listtransactions` dan `gettransaction` menyertakan field `memo` (hex) dan `memoStr` (teks terdekode) ketika sebuah output membawanya
- Pengiriman dengan jumlah nol ke penerima terlindungi didukung untuk use case memo-only (pola `z_sendmany` "memo-only-send")

Hal ini membuat ZECD cocok untuk aplikasi yang membutuhkan pengiriman pesan on-chain secara privat bersamaan dengan pembayaran.

### Tanpa Status secara Desain

ZECD tidak menyimpan **tidak ada status off-chain yang tidak dapat dibangun kembali melalui pemulihan hanya dengan seed**. Database dompet (`data.sqlite`) sepenuhnya dapat diturunkan dari frasa pemulihan — dana terlindungi dipulihkan tanpa syarat; dana transparan dipulihkan hingga batas gap yang dikonfigurasi.

Untuk memulihkan dompet dari frasa pemulihan:

```sh
zecd init --restore --birthday <block-height>
```

Hal ini membuat direktori data bersifat **dapat dibuang**: sebuah kontainer tanpa volume persisten, yang dibangun ulang dari seed pada setiap awal dijalankan, tidak akan kehilangan data kritis apa pun. Operator bertanggung jawab untuk melacak alamat yang mereka berikan — ZECD hanya mengingat alamat setelah alamat tersebut menerima dana secara on-chain.

Label sengaja tidak disertakan. Karena label tidak memiliki sumber on-chain dan tidak dapat direkonstruksi dari seed, ZECD secara sederhana tidak mendukungnya. Memanggil metode label akan mengembalikan error `method-not-found` (`-32601`).

### Tanpa Ketergantungan lightwalletd

ZECD memperoleh blok ringkas, status pohon, dan visibilitas mempool secara langsung dari JSON-RPC milik Zebra. Tidak ada lightwalletd yang perlu dioperasikan atau dipelihara — mengurangi kompleksitas operasional untuk deployment yang di-host sendiri.

### Deployment Cloud-Native dan Terkontainerisasi

Arsitektur stateless ZECD dirancang untuk lingkungan Docker dan Kubernetes:

- Stack Docker Compose lengkap (`zebra → zecd`) tersedia di dalam repositori
- Endpoint kesehatan pada port `9233` dengan probe readiness yang dapat dikonfigurasi (`synced` atau `connected`)
- Opsi logging JSON terstruktur untuk pipeline agregasi log
- Biaya deterministik ZIP-317 — tidak ada oracle biaya atau konfigurasi biaya manual
- `bootstrap_from_keys` (default aktif): direktori data kosong di sebelah `keys.toml` akan membangun ulang dompet secara otomatis saat startup — deploy dengan memasang satu Secret dan memulai dengan PVC yang kosong

---

## Model Kustodial

ZECD mendukung tiga model kustodial kunci, yang sesuai untuk berbagai kebutuhan penerapan dan keamanan:

### 1. Tidak terenkripsi (Default — Buka Kunci Otomatis)

Frasa pemulihan mnemonic dalam `keys.toml` dibungkus ke sebuah **file identitas age** (`identity.txt`). Dengan `auto_unlock = true` default, frasa pemulihan didekripsi ke dalam memori saat startup sehingga pengiriman dapat dilakukan tanpa pengawasan dan tidak memerlukan panggilan `walletpassphrase`.

Terbaik untuk: pemroses pembayaran otomatis, hot wallet exchange, lingkungan developer.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> Simpan `identity.txt` **di luar** direktori data pada mainnet — siapa pun yang membaca kedua file tersebut memiliki otoritas pengeluaran.

### 2. Terenkripsi (Dilindungi Passphrase)

Mnemonic ini dibungkus dengan passphrase (age scrypt) alih-alih menggunakan file identitas. Dompet dimulai dalam keadaan terkunci; `walletpassphrase "<pass>" <timeout>` membukanya untuk durasi yang ditentukan dan mengunci kembali secara otomatis saat timeout — sesuai dengan perilaku dompet terenkripsi pada Bitcoin Core.

Terbaik untuk: dompet panas di mana otoritas pengeluaran tanpa pengawasan tidak diperlukan; alur kerja operator interaktif.

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. Hanya-Pantau (UFVK — Tanpa Spending Key)

Diinisialisasi dengan Full Viewing Key Terpadu (UFVK) yang diekspor dari dompet lain. Dapat menerima, memindai, dan melaporkan saldo — tetapi tidak dapat menandatangani transaksi. Ideal untuk pemantauan, penagihan, atau node audit yang terpisah dari dompet penandatangan.

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## Cadangan dan Pemulihan

Dana dapat dipulihkan hanya dari **frasa pemulihan saja**. Segala hal lainnya hanyalah cache.

| Artefak | Lokasi | Apa yang dilindunginya | Cadangkan? |
|----------|----------|-----------------|----------|
| **Mnemonic 24-kata** | Ditampilkan sekali di `zecd init` | Dana — kehilangan = kehilangan permanen | **Ya — offline (kertas/HSM)** |
| `keys.toml` | `<wallet dir>/keys.toml` | Seed terenkripsi + birthday + network | **Ya — sebagai Secret** |
| `identity.txt` | `[keys] age_identity` | Mendekripsi `keys.toml` (otoritas pengeluaran) | **Ya — terpisah dari `keys.toml`** |
| Birthday height | Di dalam `keys.toml` | Membuat pemulihan menjadi cepat (height apa pun sebelum transaksi pertama) | Catat bersama mnemonic |
| `data.sqlite` | `<wallet dir>/data.sqlite` | Cache dompet — dibangun ulang dari seed saat pemulihan | Tidak — dapat dibuang |
| `blocks/` | `<wallet dir>/blocks/` | Cache blok yang ringkas | Tidak — jangan pernah dikirim; dapat tumbuh besar |
| `.cookie` | `<datadir>/.cookie` | Cookie RPC ephemeral | Tidak — dibuat ulang saat startup |

> **Direktori data harus bersifat host-lokal.** Kunci instansi tunggal ZECD (`<datadir>/.lock`) adalah kunci advisori OS — ini tidak mencakup lintas host. Jangan pernah berbagi direktori data dengan akses baca-tulis di berbagai mesin (NFS, Kubernetes `ReadWriteMany`) — dua instansi ZECD akan merusak DB dompet. Gunakan volume `ReadWriteOnce` di Kubernetes.

---

## Safelist Metode RPC

Untuk penerapan di mana kebocoran kredensial akan berakibat katastrofik, ZECD mendukung pembatasan permukaan RPC ke subset metode yang dipilih:

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

Metode apa pun yang tidak ada dalam daftar akan mengembalikan `-32601` (HTTP 404) — tidak dapat dibedakan dari metode yang memang tidak ada, sehingga server yang dikunci tidak mengungkapkan apa pun tentang apa yang telah dinonaktifkan. Sebuah invoicer yang hanya menerima (receive-only) dapat menonaktifkan `sendtoaddress`, `sendmany`, dan `stop` untuk meminimalkan blast radius dari client yang terkompromi.

---

## Perbedaan Utama dari Bitcoin Core RPC

Developer yang bermigrasi dari Bitcoin atau alat zcashd harus menyadari perbedaan yang disengaja ini:

| Perilaku | Bitcoin Core | ZECD |
|----------|-------------|------|
| Format alamat | `1...` / `bc1...` | `u1...` (Orchard Unified Address) — tidak dapat diurai sebagai alamat Bitcoin oleh client string-parsing |
| Label | Penyimpanan label lengkap | Belum diimplementasikan — `setlabel`, `listlabels`, dll. mengembalikan `-32601` |
| Biaya | Dapat diatur pengguna; pasar biaya | ZIP-317 hanya deterministik; `settxfee`, `fee_rate`, `subtractfeefromamount` ditolak dengan `-8` |
| Memo | Tidak didukung | `sendtoaddress` menerima memo hex; riwayat memiliki field `memo` + `memoStr` |
| Konfirmasi untuk membelanjakan | 1 | 3 (kembalian sendiri) / 10 (pihak ketiga) — dapat dikonfigurasi melalui `trusted_confirmations` / `untrusted_confirmations` |
| `listsinceblock` saat reorg | Berjalan mundur ke fork | Mengembalikan `-5` (Block tidak ditemukan) jika kursor tergeser oleh reorg — baseline ulang dengan panggilan tanpa parameter |
| Penerima duplikat dalam `sendmany` | Error | JSON parser menggabungkan duplikat (yang terakhir menang) sebelum ZECD melihatnya — jangan mencantumkan alamat yang sama dua kali |
| Saldo selama sinkronisasi awal | Memblokir atau pemanasan | Menyajikan saldo parsial — batasi otomatisasi pada `GET /readyz` (mengembalikan 503 hingga tersinkronisasi penuh dan backlog peningkatan telah dikosongkan) |
| `minconf 0` dalam `getbalance` | Saldo 0-conf | Disajikan sebagai 1 — sebuah shielded note tidak akan pernah dapat dibelanjakan sebelum ditambang |

---

## Mulai Cepat

**Prasyarat:** Zebra yang berjalan secara lokal dengan `rpc.listen_addr = 127.0.0.1:18234` (testnet).

Instal dari crates.io (0.4.3+):

```sh
cargo install zecd
```

Atau bangun dari sumber:

```sh
git clone https://github.com/zecrocks/zecd && cd zecd
cargo build --release
```

```sh
# 1. Initialize a testnet wallet (generates a 24-word mnemonic and an account)
zecd --datadir ./data --testnet init --wallet default --account-name primary

# 2. Start the daemon (syncs in background, serves JSON-RPC on port 18232)
zecd --datadir ./data --testnet \
    --rpcuser zec --rpcpassword secret --rpcbind 127.0.0.1 --rpcport 18232
```

**Berinteraksi melalui curl:**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

**Berinteraksi melalui Python (menggunakan pustaka Bitcoin RPC):**

```python
from bitcoinrpc.authproxy import AuthServiceProxy
rpc = AuthServiceProxy("http://zec:secret@127.0.0.1:18232")
print(rpc.getblockchaininfo())
addr = rpc.getnewaddress()          # returns a u1... Orchard Unified Address
print(rpc.getbalance())
print(rpc.listtransactions("*", 20))

# Send with a shielded memo
rpc.sendtoaddress(addr, 0.001, "", "", False, "48656c6c6f205a6563617368")  # hex memo
```

**Pulihkan dari frasa pemulihan:**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# paste your 24-word mnemonic when prompted
```

---

## Port Default

| Jaringan | ZECD RPC | Zebra RPC (backend) | Kesehatan |
|---------|----------|---------------------|--------|
| Mainnet | 8232 | 8234 | 9233 |
| Testnet | 18232 | 18234 | 9233 |

---

## ZECD vs. zcashd vs. Zaino

| | zcashd | Zaino | ZECD |
|--|--------|-------|------|
| Peran | Full node + dompet | Indexer (menggantikan lightwalletd) | Hanya server dompet |
| Bahasa | C++ | Rust | Rust |
| Status | Deprecated | Aktif | Aktif (v0.5.0-rc3, Jul 2026) |
| Pool default | Transparan | N/A | Orchard (terlindungi) |
| Dialek RPC | Spesifik-zcashd | gRPC (lightwalletd) | Bitcoin Core JSON-RPC |
| Memerlukan full node | Ya (mandiri) | Zebra atau zcashd | Zebra |
| Pemulihan stateless | Tidak | N/A | Ya (hanya frasa pemulihan) |
| Memo terlindungi | Ya (`z_sendmany`) | N/A | Ya (permukaan Bitcoin RPC) |
| Watch-only (UFVK) | Ya | Ya | Ya |
| Cloud-native | Tidak | Parsial | Ya |
| Instalasi | Build/binary | Build | `cargo install zecd` |

---

## Halaman Terkait

- [Zebra Full Node](Zebra_Full_Node.md) — full node yang terhubung ke ZECD
- [Zaino Indexer](Zaino.md) — pendekatan indexer alternatif (menggantikan lightwalletd)
- [Zakura Node](Zakura_Node.md) — implementasi full node lainnya (fork dari Zebra)
- [Viewing Keys](Viewing_Keys.md) — bagaimana ZECD memindai chain menggunakan account viewing keys
- [Dompet](/using-zcash/wallets) — ringkasan ekosistem dompet

## Sumber Daya

- [ZECD GitHub (zecrocks/zecd)](https://github.com/zecrocks/zecd)
- [Runbook Operasi ZECD ](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash — library kriptografi inti Zcash](https://github.com/zcash/librustzcash)
- [ZIP-317: Mekanisme Biaya Transfer Proporsional ](https://zips.z.cash/zip-0317)
- [ZIP-302: Memo Terlindungi ](https://zips.z.cash/zip-0302)
- [Dompet Zodl (kompatibel dengan librustzcash)](https://github.com/zodl-inc/zodl-ios)
