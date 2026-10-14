<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Unified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Alamat Terpadu

> Satu alamat untuk semua Zcash. Bagikan alamat tersebut, dan dompet pengirim akan menemukan cara paling privat untuk membayarmu.

Alamat terpadu (UA) adalah satu alamat Zcash yang menggabungkan beberapa penerima menjadi satu. Penerima adalah bagian dari alamat yang menerima dana dalam pool nilai tertentu: Ironwood, Sapling, dan transparan. UA dimulai dengan `u1` di mainnet dan didefinisikan dalam [ZIP 316](https://zips.z.cash/zip-0316), yang diperkenalkan bersama peningkatan jaringan NU5 pada 31 Mei 2022.

Sebelum alamat terpadu, menerima ZEC berarti harus memikirkan jenis alamat. Alamat `zs` menerima dana Sapling, alamat `t` menerima dana transparan, dan pengiriman antarjenis memerlukan langkah tambahan. UA mengakhiri hal tersebut. Kamu membagikan satu alamat, dan dompet mengurus sisanya.

## Cara kerjanya

Saat seseorang mengirim ke UA-mu, dompet mereka membaca penerima di dalamnya dan memilih pool paling privat yang didukung oleh kedua dompet:

1. Jika kedua dompet mendukung pool terlindungi saat ini, pembayaran tiba secara terlindungi. Tidak ada yang bersifat publik menyentuh chain.
2. Jika pengirim hanya dapat mengirim dari pool yang lebih lama, dompet akan beralih ke penerima terbaik yang kalian berdua miliki, seperti Sapling.
3. Jika pengirim hanya dapat mengirim dana transparan, pembayaran masuk ke penerima transparan UA-mu, dan dompetmu dapat melindunginya dari sana.

Kamu tidak perlu mengelola hal ini sendiri. Alamatnya tetap sama; perutean terjadi di dalamnya.

## Mengapa ini penting sekarang

Zcash terus melakukan peningkatan. Saat pool Ironwood diaktifkan bersama NU6.3 pada 28 Juli 2026, pemegang UA tidak memerlukan alamat baru: dompet cukup mulai memilih penerima Ironwood di dalam alamat yang sudah dimiliki orang-orang. Pengguna yang memiliki alamat mandiri lama harus bermigrasi. Pemegang UA tidak perlu melakukan apa pun.

Inilah tujuan desainnya. Pool baru hadir melalui peningkatan jaringan di masa mendatang, dan alamat terpadu menyerapnya tanpa ada yang perlu membagikan ulang alamat atau memindahkan dana secara manual. Lihat [Zcash pool nilai](/using-zcash/shielded-pools) untuk susunan pool saat ini.

## Alamat baru untuk setiap pengirim

Dompet dapat menghasilkan banyak alamat terpadu terdiversifikasi untuk satu akun. Masing-masing membayar ke dana yang sama, tetapi tidak ada dua alamat yang dapat ditautkan di chain. Berikan UA yang berbeda kepada setiap orang atau layanan yang membayarmu, dan tidak ada pasangan di antara mereka yang dapat membandingkan alamat untuk mengetahui bahwa mereka membayar ke dompet yang sama.

## Alat terkait

- **Viewing key.** Setiap akun memiliki viewing key terpadu yang membagikan apa yang diterima UA (atau semua yang dikirimnya) tanpa membagikan wewenang untuk membelanjakan. Awalan `uview` dan `uivk`. Lihat [viewing key](/zcash-tech/viewing-keys).
- **Alamat TEX.** Beberapa exchange, saat ini Binance, mengharuskan deposit tiba dari sumber transparan. Alamat TEX ([ZIP 320](https://zips.z.cash/zip-0320)) adalah pendamping khusus transparan untuk UA-mu tepat untuk kasus tersebut. Lihat [alamat exchange transparan](/using-zcash/transparent-exchange-addresses).
- **Permintaan pembayaran.** UA dapat disematkan dalam URI permintaan pembayaran dengan jumlah dan memo yang telah diisi sebelumnya. Lihat [URI permintaan pembayaran](/using-zcash/payment-request-uris).

## Fakta singkat

| | |
|---|---|
| Awalan | `u1` (mainnet) |
| Pengodean | bech32m |
| Didefinisikan dalam | [ZIP 316](https://zips.z.cash/zip-0316) |
| Diperkenalkan | NU5, 31 Mei 2022 |
| Berisi | Penerima Ironwood, Sapling, dan transparan |
| Spending key | Satu per akun, digunakan bersama oleh semua UA-nya |

Periksa dompet mana yang mendukung alamat terpadu di halaman [dompet](/wallets).
