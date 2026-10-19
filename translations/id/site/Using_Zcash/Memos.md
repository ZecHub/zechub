<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Memo

## TL;DR

* Memo adalah catatan singkat yang kamu lampirkan pada pembayaran yang dikirim ke alamat terlindungi. Memo dienkripsi, sehingga orang yang mengamati blockchain tidak dapat membacanya.
* Kolom memo dapat menampung hingga 512 byte teks.
* Orang menggunakan memo untuk menyebutkan siapa yang mengirim pembayaran dan untuk apa pembayaran tersebut, atau untuk mengirim pesan pribadi.
* Pembayaran ke alamat transparan tidak dapat membawa memo.
* Sebuah [tautan permintaan pembayaran](/using-zcash/payment-request-uris) dapat mengisi memo untukmu agar toko dapat menandai setiap pesanan.

## Penjelasan Inti

### Mengirim Memo Terenkripsi

Saat mengirim transaksi Z2Z (terlindungi-ke-terlindungi), kamu dapat menyertakan memo (pesan) dalam transaksi. Memo ini dapat digunakan untuk beberapa hal yang berbeda.

### Menandatangani Transaksi

Memo terutama digunakan untuk menandatangani pembayaran. Karena transaksi terlindungi mengenkripsi datamu, kamu tidak dapat melihat siapa yang mengirimmu ZEC dan untuk apa ZEC tersebut mungkin digunakan. Pengguna dapat memakai kolom memo untuk mencantumkan nama atau nama samaran mereka agar pihak lain mengetahui dari siapa transaksi tersebut berasal. Mereka juga dapat menjelaskan tujuan transaksi tersebut.

### Mengirim Pesan

Use case lain dari memo terenkripsi adalah mengirim pesan kepada seseorang dengan alamat-z. Pesan ini dapat membahas apa saja, baik itu [pengingat untuk teman](https://twitter.com/iansagstette/status/1542142468505870336) maupun [pesan sensitif yang harus tetap sepribadi mungkin](https://twitter.com/InsideZcash/status/1545800146352578560).

### Pesan Cinta di Blockchain

Ada seseorang yang mengirim pasangan mereka pesan cinta dalam salah satu blok pertama di blockchain Zcash. Seseorang menemukan bahwa pasangan mereka telah mengirimi mereka file melalui Zcash memo. File ini adalah tiket untuk acara khusus di luar negeri yang telah mereka dan kekasih jarak jauhnya bicarakan untuk dihadiri bersama. Memo tersebut adalah pesan cinta.

## Visual / Analogi

Bayangkan pembayaran terlindungi sebagai amplop tertutup berisi uang. Memo adalah catatan yang dilipat bersama uang tersebut.

Blockchain adalah kantor pos. Blockchain membawa amplop tersebut dan mencatat bahwa amplop itu telah tiba, tetapi tidak pernah membukanya. Orang yang membuka amplop membaca catatannya. Pembayaran transparan adalah kartu pos, sehingga tidak ada amplop untuk melipat catatan ke dalamnya.

## Pembahasan Mendalam

### Apa yang muat dalam memo

Kolom memo selalu tepat berukuran 512 byte. Memo teks yang lebih pendek diisi dengan byte nol sebelum dienkripsi, sehingga setiap memo tampak berukuran sama di blockchain.

Sebagian besar memo adalah teks UTF-8 biasa. [ZIP 302](https://zips.z.cash/zip-0302) juga mencadangkan memo yang dimulai dengan byte `0xF5` atau lebih tinggi untuk jenis data lain, dan memo berupa `0xF6` yang diikuti nol berarti "tanpa memo".

Setiap output terlindungi dalam transaksi membawa memonya sendiri, sehingga satu transaksi yang membayar beberapa orang dapat menyertakan catatan berbeda untuk masing-masing orang.

### Lanjutan

> **Historis. Demo ini tidak lagi berjalan seperti yang ditulis.**
>
> Demo di bawah menggunakan zcashd, dan [skrip penerimanya](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) membaca memo melalui `zcash-cli`. zcashd mencapai penghentian otomatis Akhir Dukungan pada 18 Juli 2026, sehingga skrip tersebut tidak dapat menjangkau node yang berjalan, dan belum di-porting.
>
> Membaca memo terlindungi dari command line masih berfungsi di Zallet: `zallet rpc z_listunspent` mengembalikan setiap catatan terlindungi yang diterima dengan kolom `memoStr` yang sama seperti yang dibaca skrip. Lihat [Zallet Panduan Referensi Cepat](/using-zcash/zallet-quick-reference-guide) untuk perintahnya, serta [panduan migrasi ke Zebra dan Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) untuk memindahkan node dari zcashd. Zallet masih dalam versi beta.
>
> Bagian ini dipertahankan sebagai catatan historis demo Magic-Wormhole.

Berikut cara menggunakan Zcash Memo Terlindungi dengan CLI Magic-Wormhole dan zcashd untuk mengirim file dengan aman dari satu komputer ke komputer lain!

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DEMO: Transfer File Terenkripsi dengan Zcash 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Halaman Terkait

- [URI Permintaan Pembayaran](/using-zcash/payment-request-uris): masukkan memo ke dalam tautan atau kode QR `zcash:`.
- [Transaksi](/using-zcash/transactions): jenis transaksi terlindungi dan transparan.
- [Pool Terlindungi](/using-zcash/shielded-pools): tempat catatan terlindungi yang membawa memo berada.
- [Dompet](/using-zcash/wallets): gunakan filter Memo Terlindungi untuk menemukan dompet yang mendukung memo.
- [Zallet Panduan Referensi Cepat](/using-zcash/zallet-quick-reference-guide): baca memo yang diterima dari command line.
- [Alat Zcash untuk Kreator](/using-zcash/creators-and-tips): alat pemberian tip yang mengirim pesan bersama tip.

### Sumber Daya

[Kolom Memo Terenkripsi](https://electriccoin.co/blog/encrypted-memo-field/)

**Terakhir diperbarui:** Oktober 2026
