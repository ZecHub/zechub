<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash URI Permintaan Pembayaran

## TL;DR

* URI permintaan pembayaran adalah tautan yang dimulai dengan `zcash:` dan memuat detail pembayaran: alamat, jumlah, dan memo opsional.
* Dibagikan sebagai kode QR atau tautan yang dapat diklik, URI ini memungkinkan dompetmu mengisi pembayaran untukmu. Kamu memeriksa detailnya lalu menyetujui.
* [ZIP 321](https://zips.z.cash/zip-0321) mendefinisikan formatnya. Format ini berasal dari BIP 21 milik Bitcoin.
* Satu permintaan dapat membayar beberapa penerima dalam satu transaksi.
* ZecHub menyediakan widget pembayaran dan generator, sehingga toko dapat menambahkan tombol pembayaran Zcash tanpa menulis URI secara manual.

## Penjelasan Inti

URI permintaan pembayaran adalah tautan `zcash:` yang didefinisikan oleh [ZIP 321](https://zips.z.cash/zip-0321). Dompet yang kompatibel membaca alamat, jumlah, dan memo opsional dari tautan atau QR lalu mengisi awal transaksi. Tidak perlu akun tambahan, tidak ada pemroses di tengah.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    Buka widget pembayaran
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    Buat permintaan pembayaran
  </a>
</div>

Demo widget adalah modal ZIP-321 langsung: QR, salin alamat/URI, tautan singkat, dan Buka di Dompet. Halaman alat adalah generator jika kamu ingin terlebih dahulu menetapkan alamat dan jumlahmu sendiri.

### Anatomi

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| Bidang | Wajib | Catatan |
| --- | --- | --- |
| address | ya | Sebaiknya gunakan Unified Address (`u1` / `utest1`) |
| amount | tidak | ZEC desimal dengan `.` sebagai pemisah dan paling banyak 8 angka desimal (`0.5`, bukan `0,5`) |
| memo | tidak | Hanya alamat terlindungi. Byte UTF-8 memo (paling banyak 512), dienkode base64url tanpa padding `=`: `Thanks!` menjadi `VGhhbmtzIQ`, bukan teks biasa |
| label | tidak | Nama yang dapat dibaca manusia dan ditampilkan oleh beberapa dompet. Enkode persen untuk spasi dan karakter cadangan (`Coffee%20shop`); `+` adalah tanda plus literal, bukan spasi |

Aturan lengkap: [ZIP 321](https://zips.z.cash/zip-0321).

### Use case

- Checkout: Isi awal harga dan memo pesanan sehingga pelanggan hanya perlu mengonfirmasi di dompet mereka
- Faktur: Bagikan satu tautan atau QR
- Donasi: Sematkan widget di situs
- P2P: Kirim tautan `zcash:` dalam chat

### Sematkan di situs

Arahkan skrip ini ke alamat terlindungimu sendiri. Salinan yang di-host tersedia di ZecHub:

```html
<div id="zcash-pay"></div>
<script
  src="https://zechub.wiki/zcash-payment-request-widget.embed.v2.js"
  data-target="#zcash-pay"
  data-address="u1..."
  data-amount="0.01"
  data-label="Pay with Zcash"
  data-memo="order-42"
  data-theme="dark"
  data-api-base="https://zechub.wiki/api"
></script>
```

Wajib: `data-address`, `data-amount`, `data-target`.

Coba tombol yang di-host terlebih dahulu: [Buka widget pembayaran](/zcash-payment-uri).

### Video

Cara membuat Permintaan Pembayaran dengan Zcash:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="How to make Payment Requests with Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Menambahkan Widget Donasi Zcash ke Situs Webmu:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Adding a Zcash Donation Widget to your Website"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Visual / Analogi

Bayangkan formulir transfer bank dengan bidang untuk nomor rekening, jumlah, dan catatan yang menjelaskan tujuan pembayaran. Mengisinya secara manual lambat, dan satu digit yang salah akan mengirim uang ke tempat yang salah.

URI permintaan pembayaran adalah formulir tersebut, yang telah diisi oleh toko. Kode QR adalah foto formulir itu. Kamera ponselmu membaca foto tersebut, dompet menyalin setiap bidang ke tempatnya, lalu kamu memeriksa angka dan menandatangani.

Tautan di halaman web melakukan hal yang sama. Mengekliknya menyerahkan formulir yang telah diisi kepada dompetmu.

## Pembahasan Mendalam

### Contoh nyata

Berikut contoh dari ZIP 321, yang ditulis untuk testnet:

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

URI ini meminta 1 ZEC untuk satu alamat Sapling terlindungi. Memo didekode menjadi "This is a simple memo." Pesan "Thank you for your purchase" adalah teks yang ditampilkan dompet di layar.

### Aturan yang diperiksa dompet

Format jumlah bersifat ketat. `amount=0.5` dan `amount=50` valid. `amount=50,000.00`, `amount=.5`, dan `amount=0.123456789` tidak valid: titik adalah satu-satunya pemisah desimal, dan maksimal hanya boleh ada 8 digit setelahnya. Jumlah tidak boleh melebihi 21.000.000 ZEC.

Dalam URI mentah, memo dienkode dalam base64url, dan dapat memuat hingga 512 byte setelah didekode. Memo yang dilampirkan pada alamat transparan membuat seluruh permintaan tidak valid, karena alamat transparan tidak dapat membawa memo. Alamat Sprout sama sekali tidak diizinkan, dan permintaan yang tidak mengikuti tata bahasa ZIP 321 harus ditolak.

Dua bidang lain tersedia selain tabel di atas. `message` adalah deskripsi pembayaran untuk ditampilkan dompet. `req-asset` dicadangkan untuk Custom Assets, sebagaimana didefinisikan dalam ZIP 227.

### Membayar beberapa orang sekaligus

Setiap pembayaran tambahan diberi nomor indeks pada nama parameternya, misalnya `address.1`, `amount.1`, dan `memo.1`. Dompet membuat satu transaksi yang membayar semua orang dalam daftar. Ini berguna untuk checkout yang membagi pembayaran, atau untuk sekelompok donasi yang dikirim bersamaan.

### Asal format

Bitcoin memiliki dua standar lama untuk permintaan pembayaran: BIP 21, tautan sederhana untuk satu penerima, dan BIP 70, protokol yang lebih berat untuk pembayaran kompleks. ZIP 321 mengambil jalan tengah, yaitu format tautan yang menyediakan ruang untuk beberapa penerima. Pembahasannya dimulai pada 2018 di repositori ZIPs Zcash, tempat nomor 321 dipilih untuk menggemakan BIP 21, dan ZIP itu sendiri dibuat pada Agustus 2020.

## Halaman Terkait

- [Memo](/using-zcash/memos): Kegunaan bidang memo dalam permintaan pembayaran.
- [Pemroses Pembayaran](/using-zcash/payment-processors): Layanan yang menangani pembayaran untuk toko.
- [Dompet](/using-zcash/wallets): Gunakan filter Permintaan Pembayaran untuk menemukan dompet yang membaca tautan ini.
- [Zcash Aset Terlindungi](/zcash-tech/zcash-shielded-assets): Custom Assets yang dirujuk oleh `req-asset`.
- [Apa Itu Alamat TEX Zcash?](/using-zcash/transparent-exchange-addresses): Aturan alamat lain yang dibaca dompetmu sebelum membayar.

**Terakhir diperbarui:** Oktober 2026
