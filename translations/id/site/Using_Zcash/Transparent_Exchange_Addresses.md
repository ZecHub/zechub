# Apa Itu Alamat Zcash TEX?

Alamat Zcash TEX mewakili jenis alamat penerimaan yang unik. Merupakan akronim untuk alamat "Transparent Exchange", ini adalah pengodean tipe Unified (bech32m) yang **Unik** dari satu alamat transparan p2pkh tunggal.

Satu-satunya tujuannya adalah untuk memberi tahu dompet yang kompatibel agar melakukan transaksi Transparan-Saja (T -> T).

Logikanya adalah sebagai berikut: Saat mendeteksi Alamat TEX, dompet yang kompatibel akan mendekodenya untuk mendapatkan penerima Transparan yang terkandung di dalamnya. Dompet tersebut kemudian mengirimkan dana yang diperlukan untuk transaksi dari pool terlindungi ke alamat Transparan sementara yang terpisah dan dikendalikan oleh pengguna (Z -> T). Setelah itu, dompet mengirimkan dana tersebut ke penerima Transparan hasil dekode dari alamat TEX tersebut (T -> T).

Proposal teknis untuk alamat TEX diuraikan dalam Zcash [ZIP 320](https://zips.z.cash/zip-0320), yang mendefinisikan jenis alamat khusus untuk menerima dana dari Alamat Transparan.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)


Meskipun alamat TEX belum diadopsi secara luas, pengguna Zcash mungkin akan diminta untuk menggunakannya pada akhirnya.

## Kapan Saya Membutuhkan Alamat TEX

### Kamu **Membutuhkan** alamat TEX saat mengirim dana ke alamat Transparan menggunakan dompet yang tidak mendukung pengiriman langsung ke alamat Transparan. 

Dompet tertentu tidak memungkinkan pengiriman langsung ke alamat Transparan dan **penerima mungkin tidak menyediakan padanan TEX**. Jadi, **Mengonversi** dari alamat Transparan ke alamat TEX terkadang diperlukan. Hal ini dapat dilakukan secara manual dengan menjalankan implementasi referensi yang diuraikan dalam [zip-320](https://zips.z.cash/zip-0320#reference-implementation).

### Kamu Membutuhkan alamat TEX saat mengirim dana ke exchange terpusat yang **MEWAJIBKAN dana tersebut berasal dari sumber Transparan**. 
Saat ini, [Binance](https://www.binance.com/) adalah satu-satunya Exchange Terpusat yang menggunakan alamat TEX (dan itulah alasan utama pembuatan TEX). 
Alamat TEX menginformasikan dompet yang kompatibel bahwa semua dana yang dikirim ke alamat tersebut harus transparan dan mengecualikan setiap nilai terlindungi agar tidak terkirim ke alamat tersebut.
Jika sebuah exchange seperti Binance menolak nilai yang dikirim, ia memiliki sarana yang diperlukan untuk mengembalikan nilai tersebut kembali ke alamat asalnya. Hal ini juga membantu entitas seperti Binance untuk mematuhi hukum dan peraturan yang ditetapkan oleh pemerintah atau otoritas lainnya.


## Dompet mana yang mendukung Alamat TEX?

Kamu dapat melihat daftar terbaru pada halaman [dompet](https://zechub.wiki/wallets) kami. Gunakan **Filter Alamat TEX.**