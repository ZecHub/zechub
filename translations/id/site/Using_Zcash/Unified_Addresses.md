<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Unified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Alamat Terpadu

> Satu alamat untuk seluruh Zcash. Bagikan alamat ini, dan dompet pengirim akan menemukan cara paling privat untuk membayarmu.

## Ringkasan

* Alamat terpadu (UA) adalah satu alamat Zcash yang memiliki beberapa penerima: Ironwood, Sapling, dan transparan.
* UA mainnet diawali dengan `u1`. ZIP 316 mendefinisikannya, dan UA hadir bersama peningkatan NU5 pada 31 Mei 2022.
* Dompet pengirim memilih pool paling privat yang didukung oleh kedua dompet. Kamu tidak pernah memilih pool sendiri.
* UA-mu tetap berfungsi ketika pool Ironwood diluncurkan pada Juli 2026. Kamu tidak perlu membagikan alamat baru.
* Dompetmu dapat membuat UA baru untuk setiap pengirim, dan semuanya membayar ke akun yang sama.

## Penjelasan Inti

Alamat terpadu (UA) adalah satu alamat Zcash yang menggabungkan beberapa penerima menjadi satu. Penerima adalah bagian dari alamat yang menerima dana dalam pool nilai tertentu: Ironwood, Sapling, dan transparan. UA diawali dengan `u1` di mainnet dan didefinisikan dalam [ZIP 316](https://zips.z.cash/zip-0316), yang diperkenalkan bersama peningkatan jaringan NU5 pada 31 Mei 2022.

Sebelum alamat terpadu, menerima ZEC berarti harus memikirkan jenis alamat. Alamat `zs` menerima dana Sapling, alamat `t` menerima dana transparan, dan pengiriman antarjenis memerlukan langkah tambahan. UA mengakhiri hal itu. Kamu membagikan satu alamat, dan dompet menangani sisanya.

### Cara kerjanya

Ketika seseorang mengirim ke UA-mu, dompet mereka membaca penerima di dalamnya dan memilih pool paling privat yang didukung oleh kedua dompet:

1. Jika kedua dompet mendukung pool terlindungi saat ini, pembayaran tiba secara terlindungi. Tidak ada yang bersifat publik menyentuh chain.
2. Jika pengirim hanya dapat mengirim dari pool lama, dompet kembali menggunakan penerima terbaik yang sama-sama didukung, seperti Sapling.
3. Jika pengirim hanya dapat mengirim dana transparan, pembayaran masuk ke penerima transparan dalam UA-mu, dan dompetmu dapat melindunginya dari sana.

Kamu tidak perlu mengelolanya sendiri. Alamatnya tetap sama; perutean terjadi di dalamnya.

### Mengapa ini penting sekarang

Zcash terus ditingkatkan. Ketika pool Ironwood diaktifkan bersama NU6.3 pada 28 Juli 2026, pemegang UA tidak memerlukan alamat baru: dompet hanya mulai memilih penerima Ironwood di dalam alamat yang sudah mereka miliki. Pengguna yang memiliki alamat mandiri lama harus bermigrasi. Pemegang UA tidak perlu melakukan apa pun.

Inilah tujuan desainnya. Pool baru hadir bersama peningkatan jaringan mendatang, dan alamat terpadu menyerapnya tanpa siapa pun perlu membagikan ulang alamat atau memindahkan dana secara manual. Lihat [Zcash pool nilai](/using-zcash/shielded-pools) untuk susunan pool saat ini.

### Alamat baru untuk setiap pengirim

Dompet dapat menghasilkan banyak alamat terpadu terdiversifikasi untuk satu akun. Masing-masing membayar ke dana yang sama, tetapi tidak ada dua alamat yang dapat dikaitkan di on-chain. Berikan UA yang berbeda kepada setiap orang atau layanan yang membayarmu, dan tidak ada pasangan di antaranya yang dapat membandingkan alamat untuk mengetahui bahwa mereka membayar ke dompet yang sama.

## Visual / Analogi

Bayangkan sebuah pintu depan dengan tiga celah surat. Celah terbaru menjatuhkan surat ke dalam brankas terkunci (Ironwood). Celah kedua menjatuhkannya ke dalam laci terkunci (Sapling). Celah ketiga menjatuhkannya ke baki terbuka yang dapat dibaca siapa saja melalui jendela (transparan).

Pengantar surat adalah dompet pengirim. Dompet itu menggunakan celah paling privat yang dapat dilaluinya. Kamu membagikan satu alamat untuk pintu tersebut, dan ketika rumah mendapat brankas baru, alamat di pintu tetap sama.

## Pembahasan Mendalam

### Alat terkait

- **Viewing key.** Setiap akun memiliki viewing key terpadu yang membagikan apa yang diterima UA (atau semua yang dikirimkannya) tanpa membagikan wewenang pengeluaran. Prefix `uview` dan `uivk`. Lihat [viewing key](/zcash-tech/viewing-keys).
- **Alamat TEX.** Beberapa exchange, saat ini Binance, mengharuskan deposit berasal dari sumber transparan. Alamat TEX ([ZIP 320](https://zips.z.cash/zip-0320)) adalah pendamping khusus transparan untuk UA-mu tepat untuk kasus tersebut. Lihat [alamat exchange transparan](/using-zcash/transparent-exchange-addresses).
- **Permintaan pembayaran.** UA dapat disematkan dalam URI permintaan pembayaran dengan jumlah dan memo yang telah diisi sebelumnya. Lihat [URI permintaan pembayaran](/using-zcash/payment-request-uris).

### Fakta singkat

| | |
|---|---|
| Prefix | `u1` (mainnet) |
| Pengodean | bech32m |
| Didefinisikan dalam | [ZIP 316](https://zips.z.cash/zip-0316) |
| Diperkenalkan | NU5, 31 Mei 2022 |
| Berisi | Penerima Ironwood, Sapling, dan transparan |
| Spending key | Satu per akun, dibagikan oleh semua UA-nya |

Periksa dompet mana yang mendukung alamat terpadu di halaman [dompet](/wallets).

## Kesalahan Umum

- **Membagikan alamat `zs` atau `t` lama.** Alamat mandiri hanya menjangkau satu pool dan tidak menerima pool baru. Bagikan UA-mu.
- **Memberikan UA yang sama kepada semua orang.** Dua orang yang membayarmu dapat membandingkan catatan dan melihat alamat yang sama. Berikan setiap pengirim UA baru dari dompetmu.
- **Mengharapkan setiap pembayaran ke UA bersifat privat.** Pengirim yang hanya dapat mengirim dana transparan membayar ke penerima transparanmu, dan pembayaran itu bersifat publik. Lindungi pembayaran tersebut dari dompetmu setelahnya.

## Halaman Terkait

- [Pool Terlindungi](/using-zcash/shielded-pools): pool nilai di balik setiap penerima dalam UA.
- [Alamat Terpadu (teknis)](/zcash-tech/unified-addresses): cara ZIP 316 membangun dan mengodekan UA.
- [Viewing Key](/zcash-tech/viewing-keys): bagikan apa yang diterima UA tanpa membagikan wewenang pengeluaran.
- [Alamat Exchange Transparan](/using-zcash/transparent-exchange-addresses): format TEX untuk exchange yang memerlukan sumber transparan.
- [URI Permintaan Pembayaran](/using-zcash/payment-request-uris): UA dengan jumlah dan memo yang telah diisi.
- [Dompet](/using-zcash/wallets): dompet mana yang membuat dan membayar alamat terpadu.
- [Exchange Non-Kustodial](/using-zcash/non-custodial-exchanges): hal yang perlu diperiksa ketika swap membayar ZEC ke dompetmu.
- [Siapa yang Dapat Melihat Pembayaran Zcash-mu](/start-here/who-can-see-your-zcash-payment): hal yang tetap terlihat ketika pembayaran menggunakan setiap penerima.

**Terakhir diperbarui:** Oktober 2026
