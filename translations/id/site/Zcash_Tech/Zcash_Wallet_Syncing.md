<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Sinkronisasi Dompet Zcash

## Ringkasan Singkat

* Karena transaksi Zcash yang terlindungi menyembunyikan detailnya, sebuah server tidak dapat begitu saja memeriksa saldo dompet seperti halnya pada koin transparan seperti Bitcoin atau Ethereum.
* Light wallet mengunduh "compact blocks" kecil dari server khusus (lightwalletd) dan mendekripsi data yang relevan sendiri menggunakan private key mereka.
* Mendekripsi dan memproses blok-blok tersebut membutuhkan waktu, sehingga dompet menggunakan metode sinkronisasi yang lebih cepat agar Anda dapat menggunakan dana Anda lebih awal.
* Pendekatan yang menonjol: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet), dan usulan DAGSync.
* Metode-metode ini umumnya menukar penggunaan memori atau daya pemrosesan tambahan demi sinkronisasi yang lebih cepat.

## Penjelasan Inti

### Cara kerja sinkronisasi Zcash

Zcash menggunakan zero-knowledge proofs untuk menyembunyikan detail transaksi dari pihak yang tidak berwenang. Privasi ini membuat sinkronisasi menjadi lebih sulit bagi light wallet karena mereka tidak menyimpan seluruh blockchain secara lokal dan sebaliknya mengandalkan server untuk informasi yang diperlukan. Dengan Bitcoin atau Ethereum, server dapat mengindeks blockchain dan mengembalikan data akun dengan cepat. Namun dengan Zcash, server tidak dapat melihat detail transaksi. Jadi bagaimana sebuah light wallet dapat menyinkronkan saldo dan riwayatnya tanpa mengunduh dan mendekripsi seluruh blockchain itu sendiri?

Zcash mengatasi masalah ini dengan menggabungkan beberapa pendekatan. Ia memiliki server khusus, lightwalletd, yang menyaring data dari sebuah full node dan hanya menyimpan apa yang diperlukan untuk identifikasi transaksi. Data ini disebut compact blocks, dan ukurannya jauh lebih kecil daripada blok aslinya. Dompet light client pertama-tama mengunduh compact blocks ini dari server lightwalletd dan kemudian mendekripsinya dengan private key mereka.

Bahkan mendekripsi dan memproses blok-blok ringkas ini dapat memakan waktu yang signifikan, terutama ketika terdapat banyak transaksi per blok. Oleh karena itu, dompet menggunakan metode berbeda untuk mempercepat sinkronisasi dan memungkinkan Anda menggunakan dana Anda sesegera mungkin.

## Visual / Analogi

Bayangkan blockchain sebagai sebuah ruang surat raksasa yang penuh dengan kotak-kotak terkunci. Dengan koin transparan, petugas ruang surat dapat membaca label dan secara instan memberi tahu Anda kotak mana yang milik Anda. Dengan Zcash, label-label tersebut disembunyikan — sehingga dompet Anda harus mengambil kunci-kuncinya sendiri dan memeriksa kotak-kotak tersebut secara diam-diam untuk menemukan kotak mana yang dapat dibuka. Metode sinkronisasi di bawah ini adalah strategi berbeda untuk memeriksa kotak-kotak tersebut dengan lebih cepat.

## Pendalaman Materi

### Warp Sync

Warp sync adalah fitur YWallet yang melewati langkah-langkah perantara dalam mendekripsi dan memproses setiap compact block, dan langsung melompat ke hasil akhir.

Untuk melakukannya, ia menggunakan matematika dan kriptografi untuk menghitung hasil akhir tanpa harus melewati setiap langkah.

Warp sync dapat memproses ribuan blok per detik, jauh lebih cepat daripada metode sinkronisasi biasa. Ini berarti pengguna YWallet dapat menikmati performa yang cepat dan lancar, bahkan dengan ratusan ribu transaksi dan catatan yang diterima di akun mereka.

Selain teknik melewati langkah ini, YWallet dapat memproses beberapa blok secara bersamaan, mendistribusikan beban ke seluruh perangkat keras yang Anda miliki untuk membuat prosesnya menjadi lebih cepat lagi.

Baca Selengkapnya tentang [Warp Sync](https://ywallet.app/warp/)

> Warp sync dijelaskan di sini sebagai sebuah teknik sinkronisasi. Ywallet sendiri tidak lagi dikelola dan tidak akan diperbarui untuk Ironwood, sehingga bukan merupakan dompet yang disarankan untuk diinstal saat ini.

### Spend-before-sync

Spend-before-sync adalah fitur baru dalam Zcash Mobile Wallet SDK V2 yang memungkinkan pengguna untuk langsung membelanjakan dana saat membuka dompet mereka, tanpa perlu menunggu sinkronisasi dompet secara penuh. Fitur ini mempercepat penemuan saldo yang dapat dibelanjakan pada dompet dan meningkatkan pengalaman pengguna.

Spend-before-sync bekerja dengan menggunakan algoritma sinkronisasi compact-blocks yang memproses blok dari server lightwalletd dalam urutan non-linear. Ini berarti alih-alih menunggu satu blok diproses sepenuhnya sebelum melanjutkan, dompet dapat menggunakan sedikit lebih banyak memori dan daya pemrosesan untuk memindai berbagai bagian blockchain. Biasanya, algoritma ini memindai rentang yang berbeda, mencari transaksi yang lebih baru sementara blok-blok lama sedang diunduh dan diproses. Jika sebuah note yang baru dan belum terpakai ditemukan, note tersebut akan segera tersedia.

<a href="">
    <img src="/content-images/363d08df-b7b7-461b-a386-251d9ad702ca-a857cd8385.webp" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Dikembangkan oleh tim Zecwallet, Blaze sync adalah algoritma sinkronisasi untuk light wallet yang memindai blockchain secara mundur, dimulai dari blok terbaru dengan nomor tertinggi dan bekerja mundur ke belakang.

Hal ini memungkinkan dompet untuk menemukan catatan yang telah digunakan sebelum catatan yang diterima, sekaligus membuat catatan yang sebelumnya belum digunakan menjadi tersedia tanpa harus menunggu proses sinkronisasi penuh selesai.

Selain itu, sistem ini menggunakan Out-of-Order Sync dengan memisahkan komponen sinkronisasi satu sama lain — mengunduh blok, melakukan trial decryption, dan memperbarui witness — serta memprosesnya secara paralel. Hal ini membutuhkan lebih banyak sumber daya memori dan CPU tetapi meningkatkan kecepatan sinkronisasi sebesar X5.

### DAGSync

DAGSync adalah usulan algoritma sinkronisasi yang bertujuan untuk meningkatkan pengalaman pengguna dari dompet terlindungi Zcash dengan mempercepat proses sinkronisasi.

Ini menggunakan [Directed Acyclic Graph (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) untuk merepresentasikan ketergantungan antara note, witness, dan nullifier dalam sebuah Zcash dompet.

DAG adalah struktur data yang terdiri dari node dan edge, di mana setiap edge memiliki arah yang menunjukkan hubungan antara dua node. Sebuah DAG tidak memiliki siklus, yang berarti tidak ada cara untuk memulai dari sebuah node dan mengikuti edge kembali ke node yang sama.

<a href="">
    <img src="/content-images/eee7e08d-5c98-4c88-a48e-12f7a92a195f-316493530f.webp" alt="" width="110" height="230"/>
</a>

## Implikasi Praktis

Menariknya, semua mekanisme ini bertujuan untuk menjawab pertanyaan-pertanyaan yang diajukan oleh Zcash Security dalam unggahannya tentang [Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) dan hubungannya dengan sistem pembayaran privat. Beberapa bahkan mengambil langkah ekstra dengan mengunduh semua data memo dari server, kecuali untuk data yang eksklusif bagi sebuah alamat, sehingga meningkatkan privasi dengan pengorbanan sedikit sumber daya tambahan.

Selain itu, Zcash Foundation telah mencari alternatif lain untuk meningkatkan performa light client. Hal ini berlaku pada [Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/), sebuah konstruksi yang telah dipelajari oleh yayasan “untuk menentukan apakah hal tersebut menawarkan solusi potensial terhadap masalah performa baru-baru ini yang telah memengaruhi pengguna dompet Zcash.”

## Kesalahan Umum

**Dengan asumsi server lightwalletd mengetahui saldo Anda.** Server hanya mengirimkan blok ringkas; dompet Anda mendekripsi dan menafsirkannya secara lokal dengan kunci Anda sendiri.

**Menghentikan sinkronisasi terlalu dini.** Beberapa metode membuat dana yang dapat dibelanjakan baru-baru ini tersedia sebelum sinkronisasi penuh selesai, namun riwayat lama dan catatan mungkin masih dalam proses.

**Membandingkan sinkronisasi Zcash secara langsung dengan sinkronisasi transparent-chain.** Jalur yang lebih lambat dapat menjadi konsekuensi dari menjaga privasi, bukan sebuah kekurangan — dompet sedang melakukan pekerjaan yang seharusnya dilakukan oleh server koin publik dengan membaca akun Anda secara terbuka.


## Halaman Terkait

- [Node Lightwallet](/zcash-tech/lightwallet-nodes) — lightwalletd infrastruktur yang diandalkan oleh light wallet.
- [Viewing Keys](/zcash-tech/viewing-keys) — kunci yang digunakan dompet untuk mendeteksi dan mendekripsi note mereka sendiri.
- [Pepper Sync](/zcash-tech/pepper-sync) — pendekatan lain untuk Zcash sinkronisasi dompet.
- [FROST](/zcash-tech/frost) — otoritas penandatanganan terdistribusi untuk ZEC terlindungi.