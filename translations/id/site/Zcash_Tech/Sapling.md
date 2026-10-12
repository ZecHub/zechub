<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Sapling

> Sapling diluncurkan pada mainnet Zcash di blok 419.200 (29 Oktober 2018, 02:15 UTC).

Apa yang akan Anda pelajari: Sapling membuat pembayaran Zcash yang privat cukup cepat dan ringan untuk dijalankan di ponsel atau dompet perangkat keras.

Sapling adalah Zcash peningkatan jaringan utama kedua, yang diaktifkan pada hari jadi Zcash yang kedua. Ini merupakan hard fork konsensus yang membangun kembali cara transaksi terlindungi (privat) disusun. Penerapannya ditentukan oleh ZIP 205, aturan tanda tangan transaksi baru oleh ZIP 243, dan keduanya dibangun di atas ZIP 200, mekanisme peningkatan jaringan. Detail lengkapnya terdapat dalam Spesifikasi Protokol Zcash. Electric Coin Company membangun peningkatan tersebut dan merilis versi pertama yang mendukungnya, zcashd 2.0.0, pada Agustus 2018. Di dalam chain, jaringan mengidentifikasi aturan Sapling melalui id cabang konsensusnya.

Mengapa ini penting. Sebelum Sapling, melakukan pembayaran yang benar-benar privat berarti harus menunggu beberapa menit sementara komputer Anda menghabiskan gigabyte memori untuk membangun proof. Hal itu terlalu lambat dan terlalu berat bagi kebanyakan orang, sehingga banyak pengguna, exchange, dan toko melewatkan transaksi terlindungi dan justru mengirim ZEC secara terbuka. Sapling memangkas pekerjaan tersebut menjadi hanya beberapa detik dan sekitar 40 megabyte memori. Perubahan tunggal itulah yang membuat ZEC terlindungi praktis untuk digunakan dalam kehidupan sehari-hari, pada ponsel biasa dan pada dompet perangkat keras.

## Apa yang berubah

Inti dari Sapling adalah cara yang lebih cepat untuk membangun zero-knowledge proof yang menjaga privasi transaksi terlindungi. Desain Sprout yang asli menggunakan satu sirkuit pembuktian (sirkuit JoinSplit) yang lambat dan boros memori. Sapling menggantinya dengan dua sirkuit yang dibuat khusus, yaitu sirkuit Spend dan sirkuit Output, yang dijelaskan dalam Spesifikasi Protokol Zcash. Hasilnya adalah penurunan biaya yang besar. Berdasarkan Electric Coin Company, sebuah transaksi terlindungi dapat dibangun hanya dalam beberapa detik dengan menggunakan sekitar 40 megabyte memori. Baseline Sprout sebelum Sapling jauh lebih berat, pada kisaran menit dan beberapa gigabyte memori (angka sisi Sprout ini adalah baseline perkiraan yang banyak dikutip).

![Sprout versus Sapling shielded transaction cost](/content-images/sapling-before-after-a045b0b48f.webp)

## Kunci baru

Sapling juga memperkenalkan serangkaian alamat dan kunci terlindungi yang baru. Satu kunci dapat menurunkan banyak alamat yang terdiversifikasi, yang merupakan alamat pembayaran terpisah yang tidak dapat dihubungkan satu sama lain oleh pengamat luar. Sapling juga menambahkan viewing key: viewing key lengkap atau incoming viewing key memungkinkan Anda berbagi kemampuan untuk melihat detail transaksi sebuah dompet tanpa menyerahkan kemampuan untuk membelanjakan dana di dalamnya. Hal ini berguna untuk audit, akuntansi, atau sekadar membuktikan bahwa suatu pembayaran telah dilakukan.

Perubahan terkait adalah bahwa Sapling memisahkan tugas pembuatan proof dari tugas penandatanganan transaksi. Perangkat yang menyusun zero-knowledge proof tidak lagi harus menjadi perangkat yang memegang otoritas pengeluaran. Pemisahan ini memungkinkan dompet hardware untuk menjaga spending key Anda tetap terisolasi sementara perangkat terpisah melakukan pekerjaan proving yang lebih berat.

![Proving device hands the proof to a separate signing device](/content-images/sapling-decoupled-spend-6fceca13a2.webp)

## Setup terpercaya

Sirkuit dari Sapling bergantung pada sekumpulan parameter publik yang harus dibuat dengan sangat hati-hati. Jika satu pihak memproduksinya sendirian dan menyimpan sisa data rahasia ("toxic waste"), pihak tersebut dapat memalsukan proof. Untuk menghindari hal ini, parameter tersebut berasal dari upacara multi-party dua fase. Fase 1, yang disebut Powers of Tau, bersifat circuit-agnostic, artinya tidak terikat pada sirkuit spesifik milik Sapling. Fase 2, MPC Sapling, bersifat circuit-specific. Setiap fase tetap aman selama setidaknya satu peserta bertindak jujur dan menghancurkan toxic waste mereka, sehingga upacara ini hanya akan gagal jika setiap peserta melakukan kolusi.

## Cara pengaktifannya

Sapling diikuti oleh Overwinter, peningkatan Juni 2018 yang mempersiapkan mekanisme peningkatan jaringan. Electric Coin Company menetapkan tinggi aktivasi mainnet dalam zcashd 2.0.0, yang dirilis pada Agustus 2018, dan jaringan beralih ke aturan Sapling saat blok 419.200 ditambang. Di dalam chain, momen tersebut ditandai dengan id cabang konsensus Sapling.

![Timeline from Zcash launch to Sapling activation](/content-images/sapling-timeline-6cad184c30.webp)

## Glosarium

| Istilah | Makna dalam Bahasa Inggris sederhana |
|---|---|
| Transaksi terlindungi | Sebuah transaksi Zcash privat yang menyembunyikan pengirim, penerima, dan jumlahnya. |
| Sprout | Protokol terlindungi asli Zcash yang diluncurkan, lebih lambat dan lebih berat daripada Sapling. |
| Sirkuit Spend dan Output | Dua sirkuit pembuktian Sapling baru yang menggantikan sirkuit JoinSplit tunggal milik Sprout. |
| Alamat terdiversifikasi | Salah satu dari banyak alamat pembayaran yang tidak dapat ditautkan yang dapat Anda turunkan dari satu kunci tunggal. |
| Viewing Key | Sebuah kunci yang memungkinkan seseorang melihat transaksi sebuah dompet tanpa bisa melakukan pengeluaran darinya. |
| ID cabang konsensus | Kode singkat yang memberi tahu jaringan aturan peningkatan mana yang diikuti oleh sebuah transaksi. |

## FAQ

Apakah Sapling mengubah jumlah ZEC yang saya miliki? Tidak. Sapling mengubah cara transaksi terlindungi dibuat, bukan jumlah ZEC yang dimiliki siapa pun atau total pasokan. Saldo Anda tidak terpengaruh.

Apakah ZEC saya tetap privat setelah Sapling? Ya, dan lebih mudah digunakan. Sapling mempertahankan privasi kuat dari transaksi terlindungi dan membuatnya cukup cepat serta murah untuk benar-benar digunakan. Dana terlindungi tetap tersembunyi dengan cara yang sama.

Apakah saya harus melakukan sesuatu? Tidak ada tindakan yang diperlukan dari Anda sebagai pemegang. Sapling adalah sebuah peningkatan jaringan yang diadopsi oleh perangkat lunak dompet dan node. Dompet modern sudah mendukung alamat Sapling.

Apa perbedaan antara Sprout dan Sapling? Sprout adalah protokol terlindungi pertama dan menggunakan satu sirkuit pembuktian yang lambat serta berat dalam penggunaan memori. Sapling menggantikannya dengan sirkuit Spend dan Output yang lebih cepat, menambahkan viewing keys dan mendiversifikasi alamat, serta membuat transaksi terlindungi cukup ringan untuk ponsel dan dompet hardware.

Mengapa beberapa sumber menyebutkan 28 Oktober dan yang lainnya 29 Oktober? Tinggi aktivasi telah ditetapkan sebelumnya untuk menargetkan 28 Oktober 2018. Blok yang sebenarnya memicu perubahan tersebut, blok 419.200, ditambang pada dini hari tanggal 29 Oktober UTC. Di banyak zona waktu lokal, saat itu masih tanggal 28 Oktober. Bloknya tetap sama dan momennya pun sama dalam kedua kondisi tersebut.

Apa itu viewing key? Sebuah viewing key memungkinkan Anda untuk membagikan akses baca ke dompet terlindungi. Seseorang dengan full viewing key atau incoming viewing key dapat melihat detail transaksi dompet tersebut tetapi tidak dapat membelanjakan dananya. Lihat [Viewing Keys](../zcash-tech/viewing-keys) untuk informasi lebih lanjut.

## Uji pemahaman Anda

Di bawah Sprout, mengapa begitu banyak orang menghindari transaksi terlindungi, dan bagaimana Sapling memperbaikinya?

<details>
<summary>Jawaban</summary>
Di bawah Sprout, pembuatan transaksi terlindungi memakan waktu beberapa menit dan menggunakan memori berukuran gigabyte, sehingga terlalu lambat dan berat bagi sebagian besar pengguna, exchange, dan toko. Sapling memperkenalkan sirkuit Spend dan Output yang lebih cepat yang memangkas pekerjaan menjadi beberapa detik dan sekitar 40 megabyte, membuat transaksi terlindungi menjadi praktis pada ponsel sehari-hari dan dompet hardware.
</details>

### Sumber Daya

- [ZIP 205: Penerapan Sapling Peningkatan Jaringan Zcash](https://zips.z.cash/zip-0205)
- [ZIP 243: Validasi Tanda Tangan Transaksi untuk Sapling](https://zips.z.cash/zip-0243)
- [Zcash Sapling halaman upgrade](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: Sapling pengumuman](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: Mengumumkan Sapling MPC](https://electriccoin.co/blog/sapling-mpc/)

### Lihat juga

- [Pool Terlindungi](../using-zcash/shielded-pools)
- [Viewing Keys](../zcash-tech/viewing-keys)
- [zk-SNARKs](../zcash-tech/zk-snarks)
- [Zcash Peningkatan Jaringan](../start-here/network-upgrades)
- [Dompet](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Seri: Indeks Peningkatan Jaringan [](../start-here/network-upgrades) · Sebelumnya: [Overwinter](../zcash-tech/overwinter) · Berikutnya: [Blossom](../zcash-tech/blossom)