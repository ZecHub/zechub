<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Apa Itu Alamat TEX Zcash?

## Ringkasan

* Alamat TEX adalah alamat Zcash transparan yang ditulis dalam format berbeda. Alamat ini diawali dengan `tex1` dan didefinisikan dalam [ZIP 320](https://zips.z.cash/zip-0320).
* Alamat ini memberi tahu dompetmu satu hal: bayar alamat ini hanya dengan dana transparan.
* Jika saldo kamu terlindungi, dompet yang kompatibel melakukan dua langkah untukmu. Dompet tersebut memindahkan jumlahnya ke alamat transparan sementara, lalu mengirimkannya ke alamat TEX.
* Pada 2023, Binance meminta komunitas Zcash cara untuk menolak setoran terlindungi dan mengirimkannya kembali. Alamat TEX adalah jawabannya, dan Binance adalah exchange dalam daftar ZecHub [Exchange Kustodial](/using-zcash/custodial-exchanges) yang menerima setoran TEX.
* Dukungan juga berkembang di sisi pengiriman: Coinbase memungkinkan penggunanya mengirim ZEC ke alamat TEX, dan toolkit dompet telah menambahkan dukungan ZIP 320.
* Pembayaran ke alamat TEX bersifat publik di blockchain, seperti pembayaran transparan lainnya. Sisa saldo terlindungimu tetap privat.

## Penjelasan Inti

Alamat TEX Zcash adalah jenis khusus alamat penerima. TEX berarti "Transparent Exchange". Alamat ini merupakan pengodean ulang Bech32m dari satu alamat Transparan p2pkh. Alamat TEX diawali dengan `tex1` dan merupakan jenis yang terpisah dari Unified Address.

Alamat TEX memberi tahu dompet yang kompatibel untuk membuat transaksi Hanya-Transparan (T -> T). 

Logikanya adalah sebagai berikut: Ketika dompet yang kompatibel mendeteksi Alamat TEX, dompet tersebut mendekodenya untuk mendapatkan penerima Transparan yang dikandungnya. Dompet kemudian mengirim dana yang diperlukan untuk tx dari pool terlindungi ke alamat Transparan sementara terpisah yang dikendalikan pengguna (Z -> T). Setelah itu, dompet mengirim dana tersebut ke penerima Transparan yang telah didekode dari alamat TEX (T -> T).  

Proposal teknis untuk alamat TEX dijelaskan dalam Zcash [ZIP 320](https://zips.z.cash/zip-0320), yang mendefinisikan jenis alamat khusus untuk menerima dana dari Alamat Transparan.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

### Seberapa luas alamat TEX digunakan?

Adopsi masih sebagian, tetapi tidak lagi terbatas pada satu exchange. Dua peran berbeda perlu dibedakan:

* **Menerbitkan alamat setoran TEX.** Binance adalah exchange dalam daftar [Exchange Kustodial](/using-zcash/custodial-exchanges) kami yang memberikan alamat TEX untuk setoran, agar dana tiba dari sumber transparan ([ZIP 320, Latar Belakang](https://zips.z.cash/zip-0320#background)). ZIP 320 tidak mengharapkan exchange lain menerbitkan alamat TEX kecuali mereka perlu mengetahui alamat asal pembayaran.
* **Mengirim ke alamat TEX.** Inilah sisi yang telah berkembang. Pada Oktober 2024, Coinbase mengumumkan bahwa pengguna Coinbase.com dapat mengirim Zcash ke alamat TEX ([Coinbase Pengumuman Assets](https://x.com/CoinbaseAssets/status/1844428577921507416)). Toolkit dompet juga telah menambahkan dukungan ZIP 320: KeepKey menambahkan penandatanganan untuk transaksi TEX pada firmware 7.15 ([keepkey/hdwallet #75](https://github.com/keepkey/hdwallet/pull/75)), dan library `zcash-js` XChainJS ditambal setelah menolak penerima `tex1` yang valid (selengkapnya di bawah).

Jadi, alamat TEX belum universal, tetapi pembaca tidak lagi seharusnya menganggap Binance sebagai satu-satunya tempat alamat tersebut muncul.

### Kapan Saya Memerlukan Alamat TEX

#### Kamu memerlukan alamat TEX ketika mengirim dana ke alamat Transparan menggunakan dompet yang tidak mendukung pengiriman langsung ke alamat Transparan.

Dompet tertentu tidak memungkinkan pengiriman langsung ke alamat Transparan, dan penerima mungkin tidak menyediakan padanan TEX. Oleh karena itu, konversi dari alamat Transparan ke alamat TEX terkadang diperlukan. Hal ini dapat dilakukan secara manual dengan menjalankan implementasi referensi yang dijelaskan dalam [zip-320](https://zips.z.cash/zip-0320#reference-implementation).

#### Kamu memerlukan alamat TEX ketika mengirim dana ke exchange terpusat yang mengharuskan dana tersebut berasal dari sumber Transparan.

[Binance](https://www.binance.com/) adalah alasan alamat TEX ada. Pada November 2023, exchange tersebut memberi tahu komunitas Zcash bahwa ZEC dapat dihapus dari daftar kecuali ada cara untuk menolak setoran dari alamat terlindungi dan mengirimkannya kembali kepada penyetor ([ZIP 320, Latar Belakang](https://zips.z.cash/zip-0320#background)). ZIP 320 tidak mengharapkan exchange lain menerbitkan alamat TEX kecuali mereka perlu mengetahui alamat asal pembayaran. Binance adalah exchange dalam daftar [Exchange Kustodial](/using-zcash/custodial-exchanges) kami yang menerima setoran ke alamat TEX.
Alamat TEX memberi tahu dompet yang kompatibel bahwa semua dana yang dikirim ke alamat tersebut harus transparan dan mengecualikan setiap nilai terlindungi dari pengiriman ke alamat tersebut.
Jika exchange seperti Binance menolak nilai yang dikirim, exchange tersebut memiliki sarana yang diperlukan untuk mengembalikan nilai itu ke alamat asalnya. Hal ini juga membantu entitas seperti Binance mematuhi hukum dan regulasi yang ditetapkan oleh pemerintah atau otoritas lain.

### Dompet Mana yang Mendukung Alamat TEX?

Kamu dapat melihat daftar terbaru di halaman [dompet](/using-zcash/wallets) kami. Gunakan filter Alamat TEX.

## Visual / Analogi

Bayangkan saldo terlindungimu sebagai uang di dalam brankas terkunci di rumah. Tidak seorang pun di luar dapat melihat jumlah uang di dalamnya.

Exchange seperti Binance memiliki tanda di loketnya: pembayaran hanya diterima dalam amplop bening, agar kasir dapat melihat asal uang tersebut dan mengembalikannya jika diperlukan. Alamat TEX adalah tanda tersebut.

Ketika dompetmu melihat tanda itu, dompet mengambil jumlahnya dari brankas, memasukkannya ke amplop bening dengan alamat pengembalianmu (alamat transparan sementara), lalu membawa amplop itu ke loket. Brankas tetap terkunci, dan tidak seorang pun mengetahui apa lagi yang ada di dalamnya.

## Pembahasan Mendalam

### Cara alamat TEX dibuat

Alamat transparan biasa yang diawali dengan `t1` menyimpan hash kunci 20 byte, yang ditulis dalam Base58Check. Alamat TEX menyimpan 20 byte yang sama, dikodekan ulang dalam Bech32m dengan awalan `tex` (`textest` di testnet). Mengonversi satu bentuk ke bentuk lainnya hanya memerlukan beberapa baris kode, yang ditunjukkan oleh ZIP 320 dalam implementasi referensinya.

Desain sederhana ini merupakan persyaratan dari Binance: konversi harus dapat berjalan hanya dengan library Base58Check dan Bech32m dalam kode front-end exchange. Draf awal ZIP 320 memasukkan gagasan tersebut ke dalam Unified Address, dan versi itu dibatalkan karena alasan ini.

Alamat TEX meminjam pengodean Bech32m dari format Unified Address, tetapi hampir tidak mempertahankan strukturnya. Jika kamu baru mengenal Bech32m dan cara alamat Zcash divalidasi, halaman [Unified Address](/using-zcash/unified-addresses) membahas dasar-dasarnya dalam [ZIP 316](https://zips.z.cash/zip-0316). Alamat TEX berbeda dari Unified Address dalam empat hal konkret:

| | Unified Address (ZIP 316) | Alamat TEX (ZIP 320) |
|---|---|---|
| Isi | Beberapa penerima yang digabungkan | Satu penerima transparan P2PKH |
| Awalan yang dapat dibaca manusia (HRP) | `u` (mainnet) | `tex` (`textest` di testnet) |
| Obfuscation F4Jumble | Ya | Tidak |
| Typecode untuk setiap penerima | Ya | Tidak |

Singkatnya, alamat TEX adalah pembungkus Bech32m paling sederhana: satu hash kunci transparan, awalan `tex`, dan tidak ada yang lain.

### Aturan penanganan untuk dompet dan integrator

Inilah bagian yang keliru diterapkan oleh implementasi, sehingga perlu dinyatakan dengan jelas. Saat mendeteksi alamat TEX, dompet atau integrator **tidak boleh membelanjakan dari pool terlindungi langsung ke tujuan TEX.** ZIP 320 mengharuskan setiap input untuk pembayaran TEX bersifat transparan, sehingga pembayaran dibuat dalam dua langkah:

1. **Lepaskan perlindungan.** Pindahkan jumlahnya dari pool terlindungi ke alamat transparan sementara baru yang dikendalikan pengguna dan dimiliki dompet (Z -> T).
2. **Kirim transparan ke transparan.** Belanjakan output sementara tersebut ke penerima P2PKH yang telah didekode di dalam alamat TEX (T -> T).

Beberapa aturan membuat proses ini aman, semuanya dari ZIP 320:

* Alamat sementara harus diturunkan dari frasa pemulihanmu, sehingga jika exchange mengembalikan dana, dompetmu tetap dapat menemukan dan membelanjakannya.
* Alamat sementara baru harus digunakan setiap kali, sehingga pembayaran terpisah tidak dapat dikaitkan satu sama lain.
* Transaksi kedua hanya boleh membelanjakan input transparan, sehingga exchange melihat setoran transparan-ke-transparan yang bersih.

Konversi dan alur dua langkah ditunjukkan dalam [ZIP Implementasi referensi 320](https://zips.z.cash/zip-0320#reference-implementation). Kesalahan ini adalah masalah nyata yang baru terjadi: pada Oktober 2026 library `zcash-js` XChainJS menolak penerima `tex1` yang valid dengan kesalahan "Invalid 'to' address", karena validatornya hanya menerima bentuk Base58Check `t1`, yang merusak setoran ZEC ke layanan yang menerbitkan alamat `tex1` ([issue #1782](https://github.com/xchainjs/xchainjs-lib/issues/1782)). Masalah ini diperbaiki dengan mengajarkan validator untuk menerima pengodean ZIP 320 ([PR #1783](https://github.com/xchainjs/xchainjs-lib/pull/1783)).

### Apa yang diungkapkan oleh pengiriman TEX

Pembayaran TEX adalah pembayaran transparan, sehingga bersifat publik, tetapi penting untuk menjelaskan secara tepat apa yang dapat dan tidak dapat dilihat pengamat.

Yang **terlihat** di on-chain:

* Alamat transparan sementara, karena alamat tersebut muncul sebagai output dari langkah pelepasan perlindungan dan input dari pengiriman akhir.
* Kedua jumlahnya: nilai yang meninggalkan pool terlindungi pada langkah Z -> T, dan nilai yang dikirimkan pada langkah T -> T.
* Penerima transparan exchange, yaitu alamat P2PKH yang dikodekan dalam alamat TEX.

Yang tetap **tersembunyi**:

* Sisa saldo terlindungimu, serta catatan terlindungi spesifik mana yang mendanai pembayaran. Langkah pelepasan perlindungan mengungkapkan bahwa *sebagian* nilai meninggalkan pool ke alamat sementara, bukan asalnya dari bagian mana di dalam pool.

Jadi, pengamat dapat mengaitkan alamat sementara dengan pembayaran exchange (dana yang sama, transparan ke transparan) dan dapat melihat bahwa alamat tersebut diisi dari penarikan terlindungi. Mereka tidak dapat menghubungkannya dengan dana atau aktivitas terlindungi lainnya. Tidak ada apa pun di on-chain yang benar-benar menandai pembayaran tersebut sebagai pengiriman "TEX": sebagaimana dicatat oleh ZIP 320, pembayaran ke alamat TEX tidak dapat dibedakan dari pembayaran ke alamat `t1` yang sesuai, karena aturan konsensus tidak berubah dan seluruh aturan berada di dompet.

![On-chain footprint of a TEX send: funds leave the shielded pool to an ephemeral transparent address, then go transparent-to-transparent to the exchange; the ephemeral address, both amounts and the exchange address are visible, while the rest of the shielded balance stays hidden](/content-images/tex-onchain-footprint.webp)

### Apa yang ditampilkan blockchain

Aturan TEX berada di dompet. Node tidak memeriksanya, sehingga aturan konsensus tetap sama. Di on-chain, pembayaran ke alamat TEX terlihat sama seperti pembayaran ke alamat `t1` yang sesuai. Jumlah, alamat sementara, dan alamat exchange bersifat publik, seperti pada transaksi transparan lainnya.

## Halaman Terkait

- [Unified Address](/using-zcash/unified-addresses): format alamat `u1` berdasarkan ZIP 316, serta dasar-dasar Bech32m yang digunakan kembali oleh alamat TEX.
- [Exchange Kustodial](/using-zcash/custodial-exchanges): exchange mana yang menerima jenis alamat mana, termasuk setoran TEX milik Binance.
- [Dompet](/using-zcash/wallets): gunakan filter Alamat TEX untuk menemukan dompet yang dapat membayar alamat TEX.
- [Pool Terlindungi](/using-zcash/shielded-pools): tempat saldo privatmu berada sebelum pembayaran TEX memindahkan sebagian darinya keluar.
- [Siapa yang Dapat Melihat Pembayaran Zcash Kamu](/start-here/who-can-see-your-zcash-payment): apa yang menjadi terlihat setelah dana meninggalkan pool terlindungi.
- [Apa yang Dapat Dilihat Block Explorer](/zcash-tech/what-a-block-explorer-can-see): bagaimana pembayaran transparan muncul di on-chain.
- [Zcash URI Permintaan Pembayaran](/using-zcash/payment-request-uris): standar dompet lain untuk pembayaran yang telah diisi sebelumnya.

**Terakhir diperbarui:** Oktober 2026
