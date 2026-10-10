<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Zimppy.xyz

## Ringkasan Singkat

- **Zimppy** adalah infrastruktur pembayaran yang mengutamakan privasi untuk agen AI menggunakan Machine Payment Protocol (MPP) milik Zcash
- **Deposit satu kali** secara on-chain (~75 detik), lalu lakukan **permintaan instan tanpa batas** tanpa interaksi blockchain per permintaan
- Mendukung pembayaran **Zcash (Orchard) yang sepenuhnya terlindungi** — pengirim, penerima, jumlah, dan memo semuanya terenkripsi
- Kompatibel dengan **SDK TypeScript dan Rust** untuk integrasi mudah ke dalam pipeline AI dan server API
- Sangat cocok untuk **API LLM, marketplace data, server tool MCP**, dan segala penggunaan pembayaran M2M

---

> **Zimppy** adalah metode pembayaran Machine Payment Protocol (MPP) untuk Zcash yang mendukung pembayaran terlindungi maupun transparan. Deposit sekali secara on-chain, lalu buat permintaan bearer instan tanpa batas tanpa interaksi chain per permintaan.

---

## Daftar Isi

1. [Apa itu Zimppy.xyz?](#what-is-zimppyxyz)
2. [Mengapa Pembayaran Terlindungi untuk Agen AI?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Cara Kerja Zimppy](#how-zimppy-works)
   - [Sessions (Direkomendasikan)](#sessions-recommended)
   - [Streaming](#streaming)
   - [Charge](#charge)
5. [Use Cases & Contoh](#use-cases--examples)
6. [Instalasi](#installation)
7. [Menyiapkan Dompet Zimppy](#setting-up-the-zimppy-wallet)
8. [Mengintegrasikan Zimppy](#integrating-zimppy--typescript-sdk)
   - [Server (Terlindungi)](#typescript-server--shielded)
   - [Server (Transparan)](#typescript-server--transparent)
   - [Client](#typescript-client)
9. [Mengintegrasikan Zimppy - Rust SDK](#integrating-zimppy--rust-sdk)
   - [Server (Axum)](#rust-server-axum)
   - [Client](#rust-client)
10. [Referensi CLI](#cli-reference)
11. [Fitur Utama](#key-features)
12. [Arsitektur](#architecture)
13. [Contoh & Demo](#examples--demos)

---

## Apa itu Zimppy.xyz?

**Zimppy.xyz** adalah infrastruktur pembayaran yang mengutamakan privasi yang dirancang khusus untuk agen AI dan alur kerja machine-to-machine (M2M) otomatis. Protokol ini menerapkan **Machine Payment Protocol (MPP)** menggunakan **Zcash** sebagai mata uang dasarnya, yang memungkinkan mode pembayaran terlindungi (sepenuhnya privat) maupun transparan.

Berbeda dengan sistem pembayaran blockchain tradisional, di mana setiap transaksi dapat dilihat secara publik di on-chain, Zimppy dirancang dengan arsitektur berbasis sesi yang menghilangkan latensi per-permintaan sambil tetap menjaga privasi kriptografis. Hal ini membuatnya sangat cocok untuk agen AI yang perlu membayar API, data, komputasi, atau alat AI secara terprogram, tanpa membocorkan metadata perilaku.

### Properti Inti

- **Deposit satu kali** on-chain (~75 detik untuk konfirmasi Zcash)
- **Permintaan instan tanpa batas** setelah sesi dibuka, tanpa interaksi chain per permintaan
- **Pembayaran terlindungi** mengenkripsi pengirim, penerima, jumlah, dan memo menggunakan protokol Orchard milik Zcash
- **Pembayaran transparan** menggunakan T-addresses per-tantangan untuk pencegahan replay tanpa privasi penuh
- **Sesuai spesifikasi**, tantangan HMAC-SHA256, error RFC 9457, penemuan `/.well-known/payment`

---

## Mengapa Pembayaran Terlindungi untuk Agen AI?

Untuk agen AI yang menangani alur kerja sensitif, riset hukum, kueri medis, analisis keuangan, dan intelijen kompetitif, **setiap pembayaran publik adalah kebocoran metadata**. Zimppy adalah satu-satunya metode pembayaran MPP yang **privat secara default**.

### Tabel Perbandingan Privasi

| Properti | Chain Publik (USDC, ETH) | Zimppy Terlindungi | Zimppy Transparan |
|---|---|---|---|
| **Pengirim** | Terlihat | Terenkripsi | Terlihat |
| **Penerima** | Terlihat | Terenkripsi | Per-challenge (tidak dapat ditautkan) |
| **Jumlah** | Terlihat | Terenkripsi | Terlihat |
| **Memo** | Terlihat | Terenkripsi | N/A |
| **Perlindungan Replay** | Tidak ada | Pengikatan memo | T-address per-challenge |
| **Pola Penggunaan Layanan** | Dapat ditautkan | Privat | Tidak dapat ditautkan (alamat baru) |

### Masalah Latensi, Diselesaikan dengan Session

> *"Tetapi Zcash memiliki waktu blok 75 detik."*

**Sesi menyelesaikan hal ini.** Penantian on-chain terjadi tepat **satu kali** saat deposit. Setiap permintaan berikutnya bersifat instan.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Bayar sekali, panggil secara instan, dapatkan kembaliannya.** Latensi per-permintaan adalah nol.

---

## Protokol Pembayaran Mesin (Machine Payment Protocol - MPP)

**Machine Payment Protocol (MPP)** adalah protokol terstandarisasi yang memungkinkan agen perangkat lunak otonom (agen AI, bot, skrip) untuk menemukan, menegosiasikan, dan memenuhi persyaratan pembayaran untuk akses API tanpa intervensi manusia sama sekali.

### Bagaimana MPP Berintegrasi dengan API

MPP mengikuti alur HTTP **402 Payment Required**:

1. **Agen meminta** sebuah sumber daya dari endpoint API berbayar.
2. **Server merespons** dengan `402 Payment Required` + tantangan bertanda tangan (jumlah, penerima, memo).
3. **Agen membayar** menggunakan metode pembayaran yang kompatibel (misalnya, Zimppy Zcash terlindungi).
4. **Agen mencoba kembali** permintaan tersebut dengan `Authorization: Payment {txid}`.
5. **Server memverifikasi** pembayaran secara kriptografis (dekripsi Orchard IVK, pemeriksaan jumlah + memo).
6. **Server merespons** dengan `200 OK` + header `Payment-Receipt`.

### Kepatuhan Spesifikasi

- Penandatanganan tantangan **HMAC-SHA256**
- Respons kesalahan terstruktur **RFC 9457**
- Endpoint **`/.well-known/payment`** untuk penemuan metode pembayaran otomatis
- **Orchard IVK** (Incoming Viewing Key) untuk verifikasi pembayaran di sisi server tanpa mengekspos spending key

---

## Cara Kerja Zimppy

### Sesi (Direkomendasikan)

Sesi adalah pola interaksi utama. Agen menyetorkan saldo secara on-chain satu kali, menerima bearer token, dan menggunakannya untuk semua permintaan berikutnya dengan latensi nol.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Terbaik untuk:** Pemanggilan API frekuensi tinggi, inferensi LLM, kueri data berulang.

---

### Streaming

Konten berbayar per-token yang dikirimkan melalui **Server-Sent Events (SSE)**. Server akan memotong saldo sesi untuk setiap kata atau token yang dialirkan.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Terbaik untuk:** respons streaming LLM, feed data real-time, alat AI bayar-per-token.

---

### Biaya

Satu pembayaran terlindungi per permintaan. Seluruh alur HTTP 402 dijalankan per panggilan. Cocok digunakan saat permintaan jarang terjadi atau bernilai tinggi.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Terbaik untuk:** Permintaan satu kali bernilai tinggi, pemanggilan API yang jarang terjadi, endpoint data premium.

---

## Use Cases & Contoh

### 1. Agen AI

Agen AI hukum melakukan kueri ke basis data yurisprudensi berbayar. Dengan menggunakan sesi terlindungi dari Zimppy, baik identitas firma hukum maupun kueri spesifik tidak terlihat di on-chain - melindungi hak istimewa pengacara-klien pada tingkat infrastruktur.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. Agen AI untuk Pipeline Kueri Medis

Agen diagnostik medis melakukan kueri ke beberapa basis data klinis. Pembayaran terlindungi memastikan pola kueri pasien tidak dapat ditautkan di berbagai penyedia layanan.

### 3. Agen Analisis Keuangan

Agen perdagangan algoritmik membayar untuk API data pasar secara real-time. Pembayaran transparan menggunakan alamat T baru untuk setiap tantangan, guna mencegah korelasi pola penggunaan di berbagai vendor data.

### 4. Server Alat MCP, Alat AI Berbayar

Sebuah server MCP (Model Context Protocol) mengekspos alat AI berbayar. Setiap pemanggilan alat memicu biaya Zimppy, yang memungkinkan adanya pasar untuk kapabilitas AI yang dimonetisasi.

### 5. Ringkasan LLM, Bayar-Per-Token

Layanan ringkasan LLM mengenakan biaya kepada agen per token output melalui streaming SSE, dengan pemotongan saldo otomatis dan pengembalian dana (refund) dari saldo prabayar yang tidak terpakai.

---

## Instalasi

### Node.js / TypeScript

```bash
npm install zimppy          # CLI + wallet
npm install zimppy-ts       # TypeScript SDK
```

### Rust

```toml
[dependencies]
zimppy-core = "0.5"         # Rust verification engine
zimppy-rs = "0.5"           # Rust SDK (charge, session, axum)
```

---

## Menyiapkan Dompet Zimppy

Zimppy CLI menyediakan antarmuka dompet lengkap. Semua perintah tersedia melalui `npx zimppy`.

### Langkah 1 : Buat Dompet

```bash
npx zimppy wallet create
```

Menghasilkan kunci kriptografi dan menampilkan **frasa pemulihan** kamu. Simpan ini dengan aman - frasa ini tidak dapat dipulihkan jika hilang.

### Langkah 2 : Periksa Alamat dan Saldo Kamu

```bash
npx zimppy wallet whoami
```

Menampilkan **Unified Address (UA)** kamu, **alamat T**, saldo saat ini, dan jaringan yang aktif.

```bash
npx zimppy wallet balance --all
```

Menampilkan rincian saldo per akun di seluruh ZIP-32 akun.

### Langkah 3 : Isi Dompet Kamu

Kirim ZEC ke Unified Address kamu dari dompet atau exchange apa pun yang kompatibel dengan Zcash. Deposit terlindungi akan langsung masuk ke akun Orchard kamu.

### Langkah 4 : Kirim dan Lindungi Dana

```bash
# Send ZEC to any address (shielded or transparent)
npx zimppy wallet send <addr> 42000

# Move transparent funds into Orchard (shielded)
npx zimppy wallet shield

# Transfer between your own accounts
npx zimppy wallet transfer 0 1 50000

# Switch active wallet identity
npx zimppy wallet use work
```

### Langkah 5 : Buat Permintaan Auto-Pay

```bash
npx zimppy request <url>
```

Menangani seluruh alur 402 -> bayar -> coba lagi secara otomatis. Sesi dibuka dan dikelola secara transparan.

---

## Mengintegrasikan Zimppy - TypeScript SDK

### TypeScript Server - Terlindungi

```typescript
import { Mppx } from 'mppx/server'
import { zcash } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcash({ wallet: 'server' })],
  realm: 'my-api',
  secretKey: process.env.MPP_SECRET_KEY,
})

const result = await mppx.charge({
  amount: '42000',
  currency: 'zec',
})(request)

if (result.status === 402) return result.challenge

return result.withReceipt(Response.json({ data }))
```

**Poin-poin utama:**
- `zcash({ wallet: 'server' })` memuat dompet terlindungi milik server
- `mppx.charge()` menangani seluruh siklus hidup tantangan/verifikasi 402
- `result.withReceipt()` melampirkan tanda terima pembayaran kriptografi ke dalam respons

---

### Server TypeScript - Transparan

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Setiap tantangan menghasilkan **alamat T baru**, sehingga permintaan pembayaran tidak dapat dihubungkan antar sesi.

---

### Klien TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Klien mencegat respons `402`, membuka sesi secara otomatis, dan mencoba kembali permintaan tersebut - kode pemanggil tidak memerlukan logika khusus pembayaran.

---

## Mengintegrasikan Zimppy - Rust SDK

### Server Rust (Axum)

```rust
use mpp::server::axum::*;
use zimppy_rs::ZcashChallenger;

struct Price;

impl ChargeConfig for Price {
    fn amount() -> &'static str { "42000" }
}

async fn handler(charge: MppCharge<Price>) -> WithReceipt<Json<Value>> {
    WithReceipt {
        receipt: charge.receipt,
        body: Json(data),
    }
}
```

**Poin-poin utama:**
- `MppCharge<Price>` adalah extractor Axum yang memverifikasi pembayaran sebelum handler dijalankan
- `WithReceipt` membungkus respons dengan tanda terima pembayaran kriptografis
- `ChargeConfig` menentukan logika penetapan harga - dapat bersifat dinamis berdasarkan parameter permintaan

---

### Klien Rust

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` memperluas klien HTTP apa pun dengan penanganan otomatis 402, manajemen sesi, dan pemenuhan pembayaran Zcash.

---

## Referensi CLI

| Perintah | Deskripsi |
|---|---|
| `npx zimppy wallet create` | Menghasilkan kunci dan menampilkan frasa pemulihan |
| `npx zimppy wallet whoami` | Menampilkan alamat (UA + T-addr), saldo, jaringan |
| `npx zimppy wallet balance --all` | Rincian saldo per akun |
| `npx zimppy wallet send <addr> <zat>` | Mengirim ZEC terlindungi atau transparan |
| `npx zimppy wallet transfer <from> <to> <zat>` | Transfer internal antar akun |
| `npx zimppy wallet shield` | Memindahkan dana transparan ke Orchard (terlindungi) |
| `npx zimppy wallet use <name>` | Mengganti identitas dompet yang aktif |
| `npx zimppy request <url>` | Auto 402 -> bayar -> coba lagi permintaan |

---

## Fitur Utama

### Dompet Native-Agent

Dompet Zimppy dirancang untuk penggunaan programatik oleh agen AI - bukan ekstensi browser yang dikelola manusia. Key dikelola melalui CLI atau SDK, akun dapat dirotasi melalui **derivasi akun ZIP-32**, dan dompet ini mendukung alur pembayaran yang sepenuhnya otomatis tanpa persetujuan manusia per transaksi.

### Dukungan Multi-Agent

Beberapa agen dapat beroperasi dari dompet yang sama menggunakan **rotasi akun ZIP-32** - setiap agen mendapatkan akunnya sendiri dengan pelacakan saldo yang terisolasi, kemampuan transfer antar-akun, dan pelaporan saldo per-akun. Hal ini memungkinkan manajemen armada dari banyak agen dari satu infrastruktur dompet tunggal.

### Transaksi Zcash yang Sepenuhnya Terlindungi (Orchard)

Pembayaran terlindungi menggunakan **protokol Orchard** dari Zcash, yaitu pool terlindungi yang diperkenalkan oleh NU5. Server memverifikasi pembayaran menggunakan **Incoming Viewing Key (IVK)**, yang dapat mendekripsi note yang diterima tanpa mengekspos spending key. Serangan replay dicegah melalui **pengikatan memo** - setiap tantangan menyematkan memo `zimppy:{challenge_id}` unik yang diverifikasi secara kriptografis.

### Sesi, Latensi Nol per Permintaan

Arsitektur sesi memisahkan waktu tunggu konfirmasi on-chain dari latensi per-permintaan. Setelah satu kali deposit (~75 detik), semua permintaan bearer-token berikutnya dilayani secara instan tanpa interaksi blockchain hingga sesi ditutup.

### Streaming, Bayar-Per-Token

Dukungan **SSE (Server-Sent Events)** asli memungkinkan konten berbayar per-token. Sangat ideal untuk API inferensi LLM di mana panjang output bervariasi dan penagihan harus mencerminkan konsumsi aktual.

### Kepatuhan Spesifikasi

- Tantangan yang ditandatangani dengan **HMAC-SHA256** mencegah pemalsuan
- Format kesalahan terstruktur **RFC 9457** untuk penanganan kesalahan yang interoperabel
- **`/.well-known/payment`** untuk penemuan metode pembayaran otomatis oleh agen apa pun yang patuh pada MPP

---

## Arsitektur

```
crates/
  zimppy-core/       Zcash verification engine (Orchard decryption, replay protection)
  zimppy-wallet/     Native Zcash wallet (zingolib)
  zimppy-rs/         Rust SDK (ChargeMethod, SessionMethod, PaymentProvider, axum extractors)
  zimppy-napi/       Node.js native bindings (NAPI-RS)

packages/
  zimppy-ts/         TypeScript SDK (charge, session, SSE)
  zimppy-cli/        CLI with auto-pay and session management
```

### Tanggung Jawab Komponen

**`zimppy-core`** - Inti kriptografis. Menangani dekripsi note Orchard menggunakan IVK server, parsing memo, logika perlindungan replay, dan verifikasi tantangan. Ditulis dalam Rust untuk performa dan akurasi.

**`zimppy-wallet`** - Sebuah dompet Zcash asli yang didukung oleh `zingolib`. Mengelola key, akun, saldo terlindungi/transparan, dan pengiriman transaksi.

**`zimppy-rs`** - Rust SDK. Menyediakan trait `ChargeMethod`, `SessionMethod`, dan `PaymentProvider`, ditambah extractor Axum (`MppCharge`, `WithReceipt`) untuk integrasi server yang ergonomis.

**`zimppy-napi`** - binding NAPI-RS yang mengekspos inti Rust ke Node.js, memungkinkan SDK TypeScript untuk menggunakan mesin kriptografi yang sama tanpa mengimplementasikan ulang primitif Zcash dalam JavaScript.

**`zimppy-ts`** - SDK TypeScript. Membungkus binding NAPI dengan API async/await yang idiomatis untuk alur streaming charge, session, dan SSE.

**`zimppy-cli`** - Dompet baris perintah dan alat permintaan. Mendukung auto-pay (402 -> bayar -> coba lagi), manajemen sesi, dan semua operasi dompet.

---

## Contoh & Demo

| Contoh | Deskripsi |
|---|---|
| `examples/fortune-teller/` | Demo charge, session, dan streaming - Rust server + client |
| `examples/llm-summarizer/` | Demo streaming LLM pay-per-token |
| `examples/mcp-server/` | Server tool MCP dengan AI tools berbayar |
| `examples/ts-server/` | Implementasi referensi server MPP TypeScript |

---

## Apa yang Termasuk - Ringkasan Fitur

| Fitur | Deskripsi |
|---|---|
| **Sessions** | Deposit sekali, permintaan bearer instan, pengembalian dana saat ditutup |
| **Streaming** | Konten terukur bayar-per-token melalui SSE |
| **Charge** | Pembayaran terlindungi atau transparan per permintaan HTTP (alur 402) |
| **Pembayaran Transparan** | Alamat T dengan pencegahan replay per-tantangan + perintah shield |
| **Multi-Account** | Rotasi akun ZIP-32, transfer antar-akun, saldo per-akun |
| **CLI Wallet** | Kirim, shield, transfer, saldo --all, whoami, auto-pay |
| **Dual SDK** | TypeScript dan Rust |
| **Patuh Spesifikasi** | Tantangan HMAC-SHA256, error RFC 9457, penemuan `/.well-known/payment` |

---

*Untuk informasi lebih lanjut, kunjungi [zimppy.xyz](https://zimppy.xyz)*

---

## Halaman Terkait

- [Dompet](/using-zcash/wallets) — Zcash dompet yang mendukung transaksi terlindungi
- [Pool Terlindungi](/using-zcash/shielded-pools) — Bagaimana Orchard transaksi terlindungi melindungi data pembayaran
- [Pemroses Pembayaran](/using-zcash/payment-processors) — Cara lain untuk menerima pembayaran Zcash
- [Zcash Aset Terlindungi](/zcash-tech/zcash-shielded-assets) — ZSAs dan masa depan Zcash programmability
- [Proyek Komunitas](/zcash-community/community-projects) — Lebih banyak proyek ekosistem Zcash