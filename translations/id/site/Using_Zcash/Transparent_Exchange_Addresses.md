<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Apa Itu Alamat TEX Zcash?

## Ringkasan

* Alamat TEX adalah alamat Zcash transparan yang ditulis dalam format berbeda. Alamat ini diawali dengan `tex1` dan didefinisikan dalam [ZIP 320](https://zips.z.cash/zip-0320).
* Alamat ini memberi tahu dompet kamu satu hal: bayar alamat ini hanya dengan dana transparan.
* Jika saldo kamu terlindungi, dompet yang kompatibel melakukan dua langkah untuk kamu. Dompet memindahkan jumlah tersebut ke alamat transparan sementara, lalu mengirimkannya ke alamat TEX.
* Pada 2023, Binance meminta komunitas Zcash cara untuk menolak setoran terlindungi dan mengirimkannya kembali. Alamat TEX adalah jawabannya, dan Binance adalah exchange pada daftar ZecHub [Exchange Kustodial](/using-zcash/custodial-exchanges) yang menerima setoran TEX.
* Pembayaran ke alamat TEX bersifat publik di blockchain, seperti pembayaran transparan lainnya. Sisa saldo terlindungi kamu tetap privat.

## Penjelasan Inti

Alamat TEX Zcash adalah jenis khusus alamat penerima. TEX berarti "Transparent Exchange". Ini merupakan pengodean ulang Bech32m dari satu alamat Transparan p2pkh. Alamat TEX diawali dengan `tex1` dan merupakan jenis yang terpisah dari Unified Address.

Alamat TEX memberi tahu dompet yang kompatibel untuk membuat transaksi Hanya-Transparan (T -> T). 

Logikanya sebagai berikut: Ketika dompet yang kompatibel mendeteksi Alamat TEX, dompet tersebut mendekodenya untuk memperoleh penerima Transparan yang dikandungnya. Dompet kemudian mengirim dana yang diperlukan untuk tx dari pool terlindungi ke alamat Transparan sementara terpisah yang dikendalikan pengguna (Z -> T). Selanjutnya, dompet mengirim dana tersebut ke penerima Transparan hasil dekode dari alamat TEX (T -> T).  

Usulan teknis untuk alamat TEX diuraikan dalam Zcash [ZIP 320](https://zips.z.cash/zip-0320), yang mendefinisikan jenis alamat khusus untuk menerima dana dari Alamat Transparan.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

Alamat TEX belum diadopsi secara luas. Pengguna Zcash mungkin pada akhirnya diwajibkan menggunakannya.

### Kapan Saya Memerlukan Alamat TEX

#### Kamu memerlukan alamat TEX saat mengirim dana ke alamat Transparan menggunakan dompet yang tidak mendukung pengiriman langsung ke alamat Transparan.

Dompet tertentu tidak mengizinkan pengiriman langsung ke alamat Transparan, dan penerima mungkin tidak menyediakan padanan TEX. Jadi, konversi dari alamat Transparan ke alamat TEX terkadang mungkin diperlukan. Hal ini dapat dilakukan secara manual dengan menjalankan implementasi referensi yang diuraikan dalam [zip-320](https://zips.z.cash/zip-0320#reference-implementation).

#### Kamu memerlukan alamat TEX saat mengirim dana ke exchange terpusat yang mengharuskan dana tersebut berasal dari sumber Transparan.

[Binance](https://www.binance.com/) adalah alasan alamat TEX ada. Pada November 2023, pihak ini memberi tahu komunitas Zcash bahwa ZEC dapat dihapus dari daftar kecuali ada cara untuk menolak setoran dari alamat terlindungi dan mengirimkannya kembali kepada penyetor ([ZIP 320, Latar Belakang](https://zips.z.cash/zip-0320#background)). ZIP 320 tidak mengharapkan exchange lain menerbitkan alamat TEX kecuali mereka perlu mengetahui alamat asal suatu pembayaran. Binance adalah exchange pada daftar [Exchange Kustodial](/using-zcash/custodial-exchanges) kami yang menerima setoran ke alamat TEX.
Alamat TEX memberi tahu dompet yang kompatibel bahwa semua dana yang dikirim ke alamat tersebut harus transparan dan mengecualikan setiap nilai terlindungi agar tidak dikirim ke alamat tersebut.
Jika exchange seperti Binance menolak nilai yang dikirim, exchange tersebut memiliki sarana yang diperlukan untuk mengembalikan nilai itu ke alamat asalnya. Hal ini juga membantu entitas seperti Binance mematuhi hukum dan peraturan yang diberlakukan oleh pemerintah atau otoritas lain.

### Dompet Mana yang Mendukung Alamat TEX?

Kamu dapat melihat daftar terbaru di halaman [dompet](/using-zcash/wallets) kami. Gunakan filter Alamat TEX.

## Visual / Analogi

Bayangkan saldo terlindungi kamu sebagai uang dalam brankas terkunci di rumah. Tidak seorang pun di luar dapat melihat berapa banyak uang di dalamnya.

Exchange seperti Binance memiliki papan di konternya: pembayaran hanya diterima dalam amplop bening, agar kasir dapat melihat asal uang dan mengembalikannya jika diperlukan. Alamat TEX adalah papan tersebut.

Saat dompet kamu melihat papan itu, dompet mengambil jumlah tersebut dari brankas, memasukkannya ke dalam amplop bening dengan alamat pengembalian kamu di atasnya (alamat transparan sementara), lalu membawa amplop itu ke konter. Brankas tetap terkunci, dan tidak seorang pun mengetahui apa lagi yang ada di dalamnya.

## Pembahasan Mendalam

### Cara alamat TEX dibuat

Alamat transparan normal yang diawali dengan `t1` menyimpan hash kunci 20-byte, yang ditulis dalam Base58Check. Alamat TEX menyimpan 20 byte yang sama, dikodekan ulang dalam Bech32m dengan prefiks `tex` (`textest` pada testnet). Mengonversi salah satunya menjadi yang lain hanya memerlukan beberapa baris kode, yang ditunjukkan oleh ZIP 320 dalam implementasi referensinya.

Desain sederhana ini merupakan persyaratan dari Binance: konversi harus berjalan hanya dengan pustaka Base58Check dan Bech32m dalam kode front-end exchange. Draf awal ZIP 320 memasukkan ide tersebut ke dalam Unified Address, dan versi itu dibatalkan karena alasan ini.

### Membayar alamat TEX dari saldo terlindungi

ZIP 320 mengharuskan dompet yang kompatibel membuat dua transaksi di sini. Transaksi pertama memindahkan dana dari saldo terlindungi kamu ke alamat transparan sementara yang baru. Transaksi kedua mengirimkannya dari alamat tersebut ke alamat TEX.

Jika exchange menolak setoran, exchange mengembalikan dana ke alamat sementara tersebut. Dompet kamu harus dapat menemukan dan membelanjakannya, sehingga ZIP 320 meminta dompet untuk menurunkan alamat sementara dari frasa pemulihan kamu. Dokumen ini juga meminta dompet untuk menggunakan alamat sementara baru setiap kali, agar pembayaran terpisah tidak dapat dikaitkan satu sama lain.

### Apa yang ditampilkan blockchain

Aturan TEX berada di dompet. Node tidak memeriksanya, sehingga aturan konsensus tetap sama. Di on-chain, pembayaran ke alamat TEX terlihat sama seperti pembayaran ke alamat `t1` yang cocok. Jumlahnya, alamat sementara, dan alamat exchange bersifat publik, seperti pada transaksi transparan lainnya.

## Halaman Terkait

- [Exchange Kustodial](/using-zcash/custodial-exchanges): exchange mana yang menerima jenis alamat tertentu, termasuk setoran TEX Binance.
- [Dompet](/using-zcash/wallets): gunakan filter Alamat TEX untuk menemukan dompet yang dapat membayar alamat TEX.
- [Pool Terlindungi](/using-zcash/shielded-pools): tempat saldo privat kamu berada sebelum pembayaran TEX memindahkan sebagian darinya keluar.
- [Siapa yang Dapat Melihat Pembayaran Zcash Kamu](/start-here/who-can-see-your-zcash-payment): apa yang menjadi terlihat setelah dana meninggalkan pool terlindungi.
- [Apa yang Dapat Dilihat Block Explorer](/zcash-tech/what-a-block-explorer-can-see): bagaimana pembayaran transparan muncul di on-chain.
- [URI Permintaan Pembayaran Zcash](/using-zcash/payment-request-uris): standar dompet lain untuk pembayaran yang sudah diisi sebelumnya.

**Terakhir diperbarui:** Oktober 2026
