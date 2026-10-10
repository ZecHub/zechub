<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
# FROST


## Ringkasan (TL;DR)

* FROST (Flexible Round-Optimised Schnorr Threshold Signatures) adalah protokol tanda tangan threshold dan pembuatan kunci terdistribusi: beberapa penandatangan masing-masing memegang bagian dari kunci privat bersama, dan sejumlah ambang batas dari mereka harus bekerja sama untuk menghasilkan satu tanda tangan.
* Karena hasilnya adalah satu tanda tangan Schnorr tunggal, transaksi yang dibuat dengan cara ini terlihat seperti transaksi biasa pada jaringan.
* Protokol ini membutuhkan jumlah putaran komunikasi yang minimal, dapat berjalan secara paralel, serta dapat mengidentifikasi dan mengecualikan partisipan yang berperilakan buruk.
* Untuk Zcash, ini berarti FROST memungkinkan banyak pihak yang terpisah secara geografis untuk mengontrol otoritas pengeluaran dari ZEC terlindungi — berguna untuk kustodial, escrow, layanan non-kustodial, dan Zcash Shielded Assets (ZSA).
* Protokol ini dibuat oleh Chelsea Komlo (University of Waterloo, Zcash Foundation) dan Ian Goldberg (University of Waterloo).

## Penjelasan Inti

### Apa itu tanda tangan Schnorr?

Tanda tangan digital Schnorr adalah sekumpulan algoritma: (KeyGen, Sign, Verify).

Tanda tangan Schnorr memiliki beberapa keuntungan. Salah satu keuntungan utamanya adalah ketika beberapa kunci digunakan untuk menandatangani pesan yang sama, tanda tangan yang dihasilkan dapat digabungkan menjadi satu tanda tangan tunggal. Hal ini dapat secara signifikan mengurangi ukuran pembayaran multisig dan transaksi terkait multisig lainnya.

### Apa itu FROST?

**Tanda Tangan Ambang Schnorr yang Dioptimalkan untuk Round Fleksibel** -
*Dibuat oleh Chelsea Komlo (University of Waterloo, Zcash Foundation) & Ian Goldberg (University of Waterloo).*

FROST adalah protokol tanda tangan threshold dan distributed key generation yang membutuhkan jumlah round komunikasi minimal dan dapat dijalankan secara paralel. Protokol FROST adalah versi threshold dari skema tanda tangan Schnorr.

Berbeda dengan tanda tangan dalam pengaturan satu pihak, tanda tangan threshold memerlukan kerja sama di antara sejumlah penandatangan ambang batas, yang masing-masing memegang bagian dari kunci privat bersama.

[Apa itu Threshold Signatures? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Akibatnya, pembuatan tanda tangan dalam pengaturan threshold menimbulkan overhead karena adanya putaran jaringan di antara penandatangan, sehingga menjadi mahal ketika share rahasia disimpan pada perangkat dengan keterbatasan jaringan atau ketika koordinasi terjadi melalui jaringan yang tidak andal.

Overhead jaringan selama operasi penandatanganan dikurangi dengan menggunakan teknik baru yang melindungi dari serangan pemalsuan dan dapat diterapkan pada skema lainnya juga.

FROST meningkatkan protokol tanda tangan ambang batas dengan memungkinkan jumlah operasi tanda tangan yang tidak terbatas untuk dilakukan secara paralel (konkurensi) dengan aman.

Ini dapat digunakan baik sebagai protokol 2-round, di mana penanda tangan mengirim dan menerima total 2 pesan, atau sebagai protokol penandatanganan single-round yang dioptimalkan dengan tahap preprocessing.

FROST mencapai peningkatan efisiensinya sebagian dengan memungkinkan protokol untuk membatalkan proses jika terdapat partisipan yang berperilaku buruk, yang kemudian diidentifikasi dan dikeluarkan dari operasi di masa mendatang.

Proof keamanan yang menunjukkan bahwa FROST aman terhadap serangan chosen-message, dengan asumsi masalah logaritma diskrit adalah sulit, dan pihak lawan mengendalikan lebih sedikit peserta daripada ambang batas, disediakan [di sini](https://eprint.iacr.org/2020/852.pdf#page=16).

### Bagaimana cara kerja FROST?

Protokol FROST berisi dua komponen penting:

Pertama, n partisipan menjalankan protokol distributed key generation (DKG) untuk menghasilkan kunci verifikasi bersama. Pada akhirnya, setiap partisipan memperoleh satu bagian kunci rahasia privat dan satu bagian kunci verifikasi publik.

Setelah itu, setiap t-dari-n partisipan dapat menjalankan protokol penandatanganan threshold untuk menghasilkan tanda tangan Schnorr yang valid secara kolaboratif.

<a href="">
    <img src="/content-images/1634081807-frost-flexible-round-optimize-3697a713d9.webp" alt="" width="400" height="300"/>
</a>

## Visual / Analogi

Bayangkan FROST seperti kotak deposit aman yang hanya terbuka ketika beberapa pemegang kunci resmi memutar kunci mereka secara bersamaan — tetapi tidak semua pemegang kunci diperlukan; cukup sejumlah angka tertentu (misalnya, 3 dari 5). Setelah kotak terbuka, pengamat luar tidak dapat mengetahui pemegang kunci mana yang hadir, atau bahkan mengetahui bahwa lebih dari satu orang yang terlibat. Dengan cara yang sama, sebuah grup dapat secara bersama-sama mengotorisasi transaksi Zcash sementara jaringan hanya melihat satu tanda tangan yang tampak biasa saja.

## Pendalaman Materi

**Distributed key generation (DKG)**

Tujuan dari fase ini adalah untuk menghasilkan bagian kunci rahasia yang berumur panjang dan sebuah kunci verifikasi bersama. Fase ini dijalankan oleh n partisipan.

FROST membangun fase pembuatan kunci sendiri di atas DKG Pedersen (GJKR03), yang menggunakan skema Shamir's secret sharing dan Feldman's verifiable secret sharing sebagai subrutin. Selain itu, setiap partisipan harus mendemonstrasikan pengetahuan tentang rahasia mereka sendiri dengan mengirimkan zero-knowledge proof kepada partisipan lainnya, yang mana merupakan sebuah Schnorr signature. Langkah tambahan ini melindungi dari serangan rogue-key ketika t ≥ n/2.

Pada akhir protokol DKG, sebuah verifikasi key bersama `vk` dihasilkan. Setiap partisipan $P_i$ memegang nilai $(i, sk_i)$ yang merupakan secret share jangka panjang mereka dan sebuah verifikasi key share $vk_i = sk_i \cdot G$. Verifikasi key share $vk_i$ milik partisipan $P_i$ digunakan oleh partisipan lain untuk memverifikasi kebenaran signature shares dari $P_i$ selama fase penandatanganan, sementara verifikasi key $vk$ digunakan oleh pihak eksternal untuk memverifikasi signature yang diterbitkan oleh grup tersebut.

**Penandatanganan Threshold**

Fase ini dibangun berdasarkan teknik-teknik yang telah diketahui yang menggunakan additive secret sharing dan konversi share secara non-interaktif untuk menghasilkan nonce bagi setiap tanda tangan. Fase ini juga memanfaatkan teknik binding untuk menghindari serangan pemalsuan yang telah diketahui tanpa membatasi konkurensi.

Pada tahap pra-pemrosesan, setiap partisipan menyiapkan sejumlah pasangan titik Elliptic Curve (EC) yang tetap untuk digunakan kemudian. Tahap ini dijalankan satu kali di seluruh beberapa fase penandatanganan threshold.

<a href="">
    <img src="/content-images/preprocess-5cbb14f892.webp" alt="" width="400" height="300"/>
</a>

Putaran Penandatanganan 1: Setiap partisipan Pᵢ memulai dengan menghasilkan satu pasangan nonce privat (dᵢ, eᵢ) dan pasangan titik EC yang sesuai (Dᵢ, Eᵢ), kemudian menyiarkan pasangan titik ini ke semua partisipan lainnya. Setiap partisipan menyimpan pasangan titik EC ini untuk digunakan nanti. Putaran penandatanganan 2 dan 3 adalah operasi aktual di mana t-dari-n partisipan bekerja sama untuk membuat tanda tangan Schnorr yang valid.

Ronde Penandatanganan 2: Peserta bekerja sama untuk membuat tanda tangan Schnorr yang valid. Teknik inti di balik ronde ini adalah t-out-of-t additive secret sharing.

Langkah ini mencegah serangan pemalsuan karena penyerang tidak dapat menggabungkan bagian tanda tangan (signature shares) di berbagai operasi penandatanganan yang berbeda atau mengubah urutan set penanda tangan atau titik-titik yang dipublikasikan untuk setiap penanda tangan.

<a href="">
    <img src="/content-images/sign-402794d36a.webp" alt="" width="400" height="300"/>
</a>

Setelah menghitung tantangan c, setiap partisipan dapat menghitung respons zᵢ menggunakan nonce sekali pakai dan pembagian rahasia jangka panjang, yang merupakan Shamir secret shares t-dari-n (derajat t-1) dari kunci berumur panjang grup tersebut. Pada akhir putaran penandatanganan ke-2, setiap partisipan menyiarkan zᵢ ke partisipan lainnya.

[Baca makalah lengkapnya](https://eprint.iacr.org/2020/852.pdf)

### Penggunaan FROST dalam ekosistem yang lebih luas

**FROST di [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Untuk meningkatkan efisiensi sistem penandatanganan ambang batas milik Coinbase, mereka mengembangkan versi dari FROST. Implementasi Coinbase ini melakukan sedikit perubahan dari draf asli FROST.

Mereka memilih untuk tidak menggunakan peran agregator tanda tangan. Sebaliknya, setiap partisipan adalah agregator tanda tangan. Desain ini lebih aman: semua partisipan dalam protokol memverifikasi komputasi pihak lain, sehingga mencapai tingkat keamanan yang lebih tinggi dan mengurangi risiko. Tahap pra-pemrosesan satu kali juga dihapus untuk mempercepat implementasi, dengan menggunakan ronde penandatanganan ketiga sebagai gantinya.

---

**[ROAST](https://eprint.iacr.org/2022/550.pdf) oleh Blockstream**

Sebuah peningkatan khusus aplikasi pada FROST diusulkan untuk digunakan pada [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) untuk Bitcoin.

“ROAST adalah wrapper sederhana di sekitar skema threshold signature seperti FROST. Ini menjamin bahwa kuorum dari penandatangan yang jujur, misalnya, functionaries Liquid, selalu dapat memperoleh tanda tangan yang valid bahkan dengan adanya penandatangan yang mengganggu ketika koneksi jaringan memiliki latensi yang sangat tinggi secara arbitrer.”

---

**FROST di IETF**

Internet Engineering Task Force, yang didirikan pada tahun 1986, adalah organisasi pengembangan standar utama untuk Internet. IETF mengembangkan standar sukarela yang sering diadopsi oleh pengguna Internet, operator jaringan, dan vendor peralatan, yang membantu membentuk lintasan Internet.

Versi 11 (varian dua putaran) dari FROST telah [diajukan ke IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). Ini adalah langkah penting menuju evaluasi lengkap terhadap FROST sebagai standar skema tanda tangan ambang baru untuk digunakan di seluruh internet, dalam perangkat keras, dan untuk layanan lainnya di tahun-tahun mendatang.


## Implikasi Praktis

Tentu saja. Pengenalan FROST ke Zcash akan memungkinkan banyak pihak, yang terpisah secara geografis, untuk mengontrol otoritas pengeluaran dari ZEC terlindungi. Transaksi yang disiarkan menggunakan skema tanda tangan ini tidak akan dapat dibedakan dari transaksi lainnya di jaringan, menjaga resistensi yang kuat terhadap pelacakan pembayaran dan membatasi jumlah data blockchain yang tersedia untuk analisis.

Dalam praktiknya, hal ini memungkinkan berbagai aplikasi baru untuk dibangun di atas jaringan, mulai dari penyedia escrow hingga layanan non-kustodial lainnya.

FROST juga akan menjadi komponen penting dalam penerbitan dan pengelolaan Zcash Shielded Assets (ZSA) yang aman, memungkinkan pengelolaan otoritas pengeluaran yang lebih aman di dalam organisasi pengembangan & kustodian ZEC seperti exchange, sekaligus memberikan kemampuan ini kepada pengguna Zcash.

## Kesalahan Umum

**Menyamakan FROST dengan multisig on-chain tradisional**. Multisig tradisional dapat mengungkapkan banyak penandatangan atau banyak tanda tangan secara on-chain. FROST menghasilkan satu tanda tangan Schnorr yang diagregasikan, sehingga sebuah transaksi tidak dapat dibedakan dari transaksi dengan tanda tangan tunggal.

**Mengasumsikan jumlah di bawah ambang batas tidak dapat menandatangani**. Hanya sejumlah peserta dengan ambang batas tertentu (t-dari-n) yang bertindak bersama yang dapat menghasilkan tanda tangan yang valid; kelompok yang lebih kecil tidak dapat melakukannya.

**Dengan asumsi FROST menyembunyikan semua hal secara off-chain**. FROST melindungi tanda tangan on-chain, tetapi koordinasi antar penandatangan tetap terjadi secara off-chain dan memerlukan kontrol privasi serta keamanan tersendiri.


## Halaman Terkait

- [Halo](/zcash-tech/halo) — sistem proof rekursif tanpa kepercayaan yang digunakan dalam pool Orchard milik Zcash.
- [Viewing Keys](/zcash-tech/viewing-keys) — pengungkapan selektif untuk transaksi terlindungi.
- [Zcash Aset Terlindungi](/zcash-tech/zcash-shielded-assets) — tempat FROST membantu mengelola otoritas pengeluaran/penerbitan.
- [Zcash Sinkronisasi Dompet](/zcash-tech/zcash-wallet-syncing) — bagian inti lainnya dari infrastruktur privasi Zcash.


## Pembelajaran Lebih Lanjut

[Coinbase Artikel - Threshold Signatures](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir Secret Sharing - Penjelasan & Contoh](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Video Singkat tentang Tanda Tangan Digital Schnorr](https://youtu.be/r9hJiDrtukI?t=19)

___
___
