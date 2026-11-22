# Mendeteksi pembayaran terlindungi: biaya pemindaian

Bisnis yang menerima ZEC terlindungi harus menemukan pembayaran masuknya. Pada pool transparan, hal itu cukup dilakukan dengan pencarian indeks. Pada pool terlindungi, tidak ada yang dapat mengindeks pembayaran berdasarkan alamat, sehingga dompet atau backend harus menguji setiap output terlindungi di blockchain menggunakan key-nya sendiri. Halaman ini menjelaskan cara kerjanya, biayanya, dan cara memilih desain akun agar biayanya tetap terkendali.

## Ringkasan

* Biaya deteksi terlindungi bertambah seiring jumlah **viewing key** yang Anda pantau, bukan jumlah alamat yang Anda berikan
* Satu akun dapat menerbitkan **alamat terdiversifikasi** yang baru dan tidak dapat ditautkan untuk setiap pelanggan atau invoice tanpa menambah biaya pemindaian
* Viewing key memperlihatkan **seluruh akun**. Jika auditor hanya boleh melihat satu pelanggan, pelanggan itu memerlukan akunnya sendiri, dan setiap akun menambah pekerjaan pemindaian pada setiap blok
* Siapkan pemindai untuk **blok penuh**, bukan rata-ratanya. Mainnet sudah menghasilkan rangkaian blok yang hampir penuh
* Ukur biaya per percobaan di perangkat keras Anda sendiri sebelum menentukan kapasitas

## Mengapa pembayaran terlindungi tidak dapat diindeks

Dengan alamat transparan, node dapat membaca alamat pada setiap output dan membuat indeks yang memetakan alamat ke output. Zebra menyediakan fitur ini melalui `getaddressutxos` dan `getaddresstxids`.

Tindakan terlindungi tidak memiliki alamat yang dapat dibaca. Tindakan ini memuat komitmen note, kunci publik sementara, dan note terenkripsi. Tidak ada bagian dari byte tersebut yang menunjukkan untuk siapa pembayaran ditujukan, sehingga node maupun pengindeks [indexer](Lightwallet_Nodes.md) tidak dapat membuat indeks alamat.

Karena itu, penemuan pembayaran bekerja dengan cara sebaliknya. Dompet mengambil setiap output terlindungi lalu bertanya, "Apakah ini milik saya?" dengan mencoba mendekripsinya. Proses ini disebut **dekripsi percobaan**. [Viewing keys](Viewing_Keys.md) menjelaskan informasi yang diungkapkan oleh key, sedangkan [Zcash wallet syncing](Zcash_Wallet_Syncing.md) membahas cara dompet menjadwalkan pekerjaan tersebut.

## Cara kerja satu percobaan

Untuk format tindakan protokol Orchard yang digunakan oleh pool Orchard dan Ironwood:

1. **Perjanjian key:** kalikan kunci publik sementara tindakan dengan incoming viewing key Anda. Ini adalah perkalian skalar pada kurva Pallas, dan merupakan bagian terbesar dari biayanya
2. **Derivasi key:** hash rahasia bersama menjadi key simetris
3. **Dekripsi 52 byte pertama** dari note: diversifier, nilai, dan `rseed`
4. **Bangun ulang komitmen note** dari hasil dekripsi
5. **Bandingkan** hasilnya dengan `cmx` tindakan. Jika cocok, note tersebut milik Anda

Anda baru mengetahui apakah note itu milik Anda pada langkah 5, jadi **biaya percobaan yang tidak cocok hampir sama dengan yang cocok**. Hampir semua tindakan di blockchain milik orang lain, sehingga hampir semua pekerjaan berakhir dengan hasil yang tidak cocok.

## Rumus biaya

```text
work per block = K × I × A × t

K  accounts you watch
I  incoming viewing keys per account (2: external and internal)
A  shielded actions in the block
t  time for one trial on one core
```

Tidak ada komponen untuk alamat. Dompet mencoba key eksternal (alamat yang Anda berikan) dan key internal (uang kembalian), itulah sebabnya `I = 2`. Anda dapat melihatnya pada loop `for scope in [Scope::External, Scope::Internal]` di `zcash_client_backend/src/scanning.rs` milik librustzcash.

[ZIP 218](https://zips.z.cash/zip-0218) membatasi tindakan terlindungi hingga **330 per blok**, sehingga `A` paling banyak bernilai 330.

## Alamat terdiversifikasi: banyak alamat, satu key

Alamat protokol Orchard terdiri atas diversifier `d` (11 byte) dan kunci transmisi yang diturunkan dari incoming viewing key yang sama. [ZIP 32](https://zips.z.cash/zip-0032) menurunkan setiap diversifier dari indeks 88-bit dengan enkripsi FF1, sehingga satu akun memiliki **2^88 alamat**, dan semuanya valid untuk protokol Orchard.

Hal ini memberi backend pembayaran dua keunggulan:

* **Alamat-alamatnya tidak dapat ditautkan.** Tanpa viewing key, dua alamat terdiversifikasi dari satu akun tampak seolah berasal dari dua dompet yang berbeda
* **Pembayaran dapat dipetakan kembali ke invoice tanpa tabel pencarian.** Saat dekripsi percobaan berhasil, note hasil dekripsi memuat `d`. Kunci diversifier akun mendekripsi `d` menjadi indeksnya, sehingga jika indeks tersebut adalah nomor invoice Anda, Anda tahu invoice mana yang telah dibayar

Bungkus setiap alamat dalam [unified address](../Using_Zcash/Unified_Addresses.md) ([ZIP 316](https://zips.z.cash/zip-0316)) sebelum menampilkannya kepada pelanggan.

## Hal yang perlu diperhatikan: viewing key memperlihatkan seluruh akun

Anda tidak dapat membatasi viewing key hanya untuk satu alamat terdiversifikasi, karena setiap alamat dalam akun menggunakan key yang sama. Karena itu, akun juga menjadi unit pengungkapan. Siapa pun yang mendapatkan viewing key akun dapat melihat semua pembayaran ke setiap alamat di dalamnya.

Dengan demikian, tiga hal berikut merupakan satu keputusan:

| Desain | Biaya pemindaian | Informasi yang dapat ditunjukkan kepada auditor |
|:--|:--|:--|
| Satu akun, satu alamat terdiversifikasi untuk setiap pelanggan | Satu key, berapa pun jumlah pelanggan | Semua atau tidak sama sekali |
| Satu akun untuk setiap pelanggan | Satu key per pelanggan, pada setiap blok | Satu pelanggan pada satu waktu |
| Satu akun untuk setiap pelanggan dan periode | Satu key per pelanggan dan periode | Satu pelanggan untuk satu periode |

Pilih desain akun sejak awal. Memecah akun di kemudian hari berarti memindahkan dananya ke akun baru, yang menimbulkan biaya transaksi dan menciptakan pola yang terlihat.

## Biaya dalam praktik

Angka berikut diperoleh dari satu inti laptop (Apple M3 Pro, build rilis), menggunakan `try_compact_note_decryption` dari `zcash_note_encryption` 0.5.1 pada tindakan Ironwood nyata dari testnet:

| Pengukuran | Nilai |
|:--|:--|
| Satu percobaan, satu key setiap kali | sekitar 82 µs |
| Satu percobaan, diproses secara batch untuk 10 atau 100 key | sekitar 42 µs |

Pemrosesan batch mengurangi biaya sekitar setengahnya, dan pemindai milik librustzcash juga memproses secara batch karena alasan yang sama.

Dengan `t = 42 µs` dan blok penuh berisi 330 tindakan:

| Akun yang dipantau | Waktu inti per blok penuh | Jumlah inti yang diperlukan untuk memproses blok penuh tepat waktu |
|:--|:--|:--|
| 1 | 28 ms | 0.001 |
| 1.000.000 (satu per pelanggan) | 7,7 jam | sekitar 1.109 |

Jutaan pelanggan yang sama, dengan alamat terdiversifikasi pada satu akun, hanya memerlukan 28 ms per blok penuh. Satu-satunya perbedaan adalah letak batas akunnya.

## Siapkan kapasitas untuk lonjakan, bukan rata-rata

Dari 5.000 blok mainnet hingga ketinggian 3.582.677 (sampel diambil pada 17 November 2026):

* 62% blok tidak memiliki output terlindungi, dan mediannya nol
* Rata-rata terdapat 12,3 output terlindungi per blok
* Sebanyak 153 blok di antara ketinggian 3.579.935 dan 3.580.346, sekitar tiga jam blockchain, masing-masing memiliki lebih dari 250 output dan sering kali terjadi berturut-turut. Blok-blok tersebut memuat 75% dari seluruh output dalam sampel

Pemindai yang kapasitasnya disiapkan berdasarkan rata-rata akan tertinggal saat terjadi rangkaian seperti itu. Sediakan kapasitas cadangan (misalnya, rencanakan penggunaan setengah dari interval 25 detik setiap blok) dan siapkan kapasitas untuk batas maksimum.

## Blok ringkas membantu menghemat bandwidth, bukan mengurangi jumlah percobaan

Dompet ringan memindai blok ringkas dari server lightwallet. Satu tindakan ringkas berukuran 148 byte, sedangkan tindakan penuh berukuran 820 byte. Blok ringkas hanya memuat hal-hal yang diperlukan untuk percobaan: kunci sementara, 52 byte pertama ciphertext, nullifier, dan `cmx`. Data transparan hanya dikirim jika diminta oleh klien.

Blok ringkas mengurangi ukuran unduhan. Blok ini tidak mengurangi jumlah percobaan, karena setiap tindakan tetap harus diuji dengan setiap key.

## Daftar periksa untuk backend pembayaran

* Tentukan sejak awal siapa yang kelak perlu melihat apa sebelum membuat akun
* Jika pengungkapan memungkinkan, terbitkan alamat terdiversifikasi untuk setiap invoice dari satu akun
* Ukur `t` pada perangkat keras Anda sendiri dengan pemrosesan batch diaktifkan
* Siapkan pemindaian tip untuk 330 tindakan per blok, dengan kapasitas cadangan
* Bagi pemindaian ulang berdasarkan rentang ketinggian blok di antara beberapa worker. Riwayatnya tetap, sehingga pekerjaan ini mudah diparalelkan
* Ingat bahwa setiap akun baru juga harus dipindai kembali hingga ketinggian blok saat akun tersebut dibuat

## Pelajari lebih lanjut

* [ZIP 218: target jarak blok 25 detik](https://zips.z.cash/zip-0218), termasuk batas tindakan per blok
* [ZIP 32: dompet deterministik hierarkis terlindungi](https://zips.z.cash/zip-0032)
* [ZIP 316: unified address dan unified viewing keys](https://zips.z.cash/zip-0316)
* [Lightwallet protocol: compact_formats.proto](https://github.com/zcash/lightwallet-protocol/tree/main/walletrpc)
* [librustzcash](https://github.com/zcash/librustzcash): pemindaian `zcash_client_backend` dan `zcash_note_encryption`
* [One viewing key, a million customers](https://udokaam.dev/writing/one-viewing-key-a-million-customers/): pengukuran lengkap beserta kode lab untuk mereproduksinya
