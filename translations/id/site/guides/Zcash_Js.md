# Zcash Panduan Developer JS

**zcash.js** (`@zcashlabs/zcash.js`) adalah SDK TypeScript/JavaScript eksperimental yang dirilis oleh Zcash Labs pada 26 Oktober 2026. SDK ini memungkinkan developer membangun dompet, light client, dashboard, dan aplikasi yang berinteraksi dengan jaringan Zcash dari Node.js dan browser.

> **Status**: Eksperimental (v0.1.1). Dompet Node persisten saat ini memerlukan Linux + `flock`. Pengiriman/penerimaan browser langsung yang lengkap dan migrasi historis database dompet belum sepenuhnya tervalidasi. Selalu periksa dokumentasi resmi sebelum digunakan di produksi.

## Yang Disediakan SDK

- `createPublicClient` — kueri JSON-RPC stateless dan pengamatan transaksi
- `createLightClient` — kueri dan stream lightwallet (gRPC native di Node, gRPC-Web di browser)
- `createWalletClient` — akun lokal, pemindaian, proposal, penandatanganan, pengiriman, dan pemulihan pembayaran yang tercatat
- Jumlah `bigint` yang tepat, validasi jaringan, alat viewing/alamat, dan utilitas PCZT
- Mesin dompet dasar, worker, dan aset proving Sapling lokal yang sudah dibundel (tidak memerlukan instalasi Rust terpisah)

## Instalasi

Gunakan **Node.js 22.23.4** (versi yang dipatok oleh paket).

```bash
npm install @zcashlabs/zcash.js@0.1.1
```

- Utamakan TypeScript dengan ESM (`"type": "module"` di `package.json`).
- Aplikasi browser berjalan melalui bundler ESM modern. Bundler akan menghasilkan aset WASM, worker, dan proving yang dimuat secara lazy — aset ini harus dideploy bersama aplikasi kamu.

## Kueri Chain Pertama (Tanpa Dompet)

```ts
import { createLightClient } from '@zcashlabs/zcash.js';

const light = await createLightClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
});

const tip = await light.getTip();
console.log(tip.height, tip.hash);
```

- Menghilangkan opsi `network` akan menggunakan mainnet secara default (sediakan endpoint yang sesuai).
- `createPublicClient` juga tersedia untuk penggunaan JSON-RPC murni.

## Membuka Dompet

```ts
import { createWalletClient } from '@zcashlabs/zcash.js';

const wallet = await createWalletClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
  storage: { kind: 'node-filesystem', path: './my-wallet' }, // Linux only for durable storage
});

try {
  const accounts = await wallet.accounts.list();
  console.log(accounts);
} finally {
  await wallet.close();
}
```

### Opsi Penyimpanan

| Lingkungan     | Opsi penyimpanan                                      |
|-----------------|-----------------------------------------------------|
| Node (tahan lama)  | `{ kind: 'node-filesystem', path: './my-wallet' }`  |
| Browser         | `{ kind: 'browser-opfs', name: 'my-wallet' }`       |
| Sementara      | `{ kind: 'memory' }`                                |

**Default penting** (per v0.1.1):

- Pengeluaran dan kembalian hanya menggunakan Ironwood secara default
- Aturan biaya: ZIP-317
- Konfirmasi: 3 tepercaya / 3 tidak tepercaya
- Selalu panggil `wallet.sync()` sebelum mengajukan pembayaran

## Alur Kerja Dompet Tingkat Tinggi

1. Buat atau impor akun mnemonic dan hubungkan signer
2. Panggil `wallet.sync()`
3. Minta alamat penerimaan (utamakan Unified / Ironwood)
4. Buat proposal → tinjau → panggil `wallet.send()`
5. Pantau konfirmasi atau gunakan operasi yang tercatat untuk pemulihan setelah restart

Aplikasi bertanggung jawab atas byte mnemonic. Hapus dari memori ketika tidak lagi diperlukan. Selalu tampilkan UI persetujuan yang jelas, yang menunjukkan setiap penerima, jumlah, biaya, pool, dan masa berlaku.

Lihat panduan [dompet](https://zcashlabs.github.io/zcashjs/api/walkthrough.html) resmi untuk contoh lengkap yang berfungsi.

## Catatan Platform & Keterbatasan Saat Ini

| Kemampuan            | Node                              | Browser                          |
|-----------------------|-----------------------------------|----------------------------------|
| Paket               | Node 22.23.4 + ESM                | Bundler ESM modern + WebAssembly |
| Kueri light         | gRPC native                       | gRPC-Web + CORS                  |
| Penyimpanan tahan lama       | Linux + `flock` saja              | OPFS (konteks aman)            |
| Penyimpanan sementara    | memori                            | memori                           |

Keterbatasan tambahan:

- Penyimpanan Node persisten saat ini hanya menggunakan Linux
- Belum ada vault rahasia terkelola, layanan proving jarak jauh, atau integrasi hardware signer
- Penyimpanan **tidak** diklaim terenkripsi saat disimpan
- Jangan buka penyimpanan dompet yang sama dari beberapa proses atau tab browser secara bersamaan
- Selalu tutup dompet dengan benar menggunakan `await wallet.close()`

## Langkah Selanjutnya

- Instalasi resmi & permintaan pertama: [Instalasi](https://zcashlabs.github.io/zcashjs/api/installation.html)
- Membuka dan mengonfigurasi dompet: [Buka dompet](https://zcashlabs.github.io/zcashjs/api/wallet-runtime.html)
- Alur kerja lengkap: [Panduan dompet](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)
- Referensi API: [Referensi API](https://zcashlabs.github.io/zcashjs/api/reference.html)
- Batasan platform: [Penyiapan Node dan browser](https://zcashlabs.github.io/zcashjs/api/platforms.html)


## Sumber Daya Resmi

- Buku developer: [https://zcashlabs.github.io/zcashjs/](https://zcashlabs.github.io/zcashjs/)
- Repositori GitHub: [https://github.com/zcashlabs/zcashjs](https://github.com/zcashlabs/zcashjs)
- Paket npm: `@zcashlabs/zcash.js`


---

*Panduan ini didasarkan pada `@zcashlabs/zcash.js@0.1.1` (Oktober 2026). SDK ini sedang dalam pengembangan aktif — selalu utamakan dokumentasi resmi untuk API dan keterbatasan terbaru.*
