<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Overwinter

> Overwinter diluncurkan pada mainnet Zcash di blok 347.500 (26 Juni 2018 UTC).

Apa yang akan Anda pelajari: bagaimana Zcash belajar untuk mengubah aturannya sendiri secara aman, dan mengapa landasan tersebut memungkinkan setiap peningkatan selanjutnya, dimulai dengan Sapling, dapat dilakukan.

Overwinter adalah Zcash [peningkatan jaringan](../start-here/network-upgrades), yang pertama setelah jaringan diluncurkan. Ini didefinisikan melalui beberapa Zcash Improvement Proposals: [ZIP 200](https://zips.z.cash/zip-0200), [ZIP 201](https://zips.z.cash/zip-0201), [ZIP 202](https://zips.z.cash/zip-0202), [ZIP 203](https://zips.z.cash/zip-0203), dan [ZIP 143](https://zips.z.cash/zip-0143). Overwinter tidak menambahkan fitur terlindungi baru apa pun. Sebaliknya, peningkatan ini memperkuat protokol sehingga peningkatan di masa mendatang dapat diluncurkan dengan aman. Peningkatan ini didokumentasikan oleh [Electric Coin Company](../zcash-organizations/electric-coin-company) pada halaman peningkatan Zcash resmi.

Mengapa ini penting. Mengubah aturan blockchain yang sedang berjalan sangatlah berbahaya. Jika terjadi kesalahan, dua versi jaringan dapat tidak sejalan, atau transaksi yang ditujukan untuk satu chain dapat disalin ke chain lainnya. Sebelum Overwinter, Zcash tidak memiliki cara standar dan aman dari replay untuk mengoordinasikan perubahan aturan. Overwinter memperbaiki hal tersebut. Ini memberikan Zcash proses formal untuk peningkatan jaringan dan, yang sama pentingnya, perlindungan replay dua arah, sehingga transaksi yang valid di bawah satu set aturan tidak dapat di-replay di bawah aturan lainnya. Landasan itulah yang membuat Sapling, dan setiap peningkatan setelahnya, memungkinkan untuk diaktifkan secara bersih.

![Before and after Overwinter: before, no standard upgrade path and no replay protection. After, a network upgrade mechanism with two-way replay protection and safe future upgrades](/content-images/overwinter-before-after-acf4f5d283.webp)

## Mekanisme peningkatan jaringan

Overwinter memperkenalkan Mekanisme Peningkatan Jaringan, yang didefinisikan dalam [ZIP 200](https://zips.z.cash/zip-0200). Setiap peningkatan kini menentukan dua hal: id cabang konsensus yang menamai set aturan saat ini, dan tinggi aktivasi, yaitu blok di mana aturan baru mulai berlaku. Hal ini memberikan jendela waktu yang jelas bagi semua orang yang menjalankan perangkat lunak Zcash untuk melakukan pembaruan sebelum peralihan terjadi.

Overwinter sendiri diaktifkan pada mainnet di blok 347.500.

[ZIP 201](https://zips.z.cash/zip-0201) menangani bagaimana node memperlakukan satu sama lain di sekitar sebuah peningkatan jaringan. Sebelum aktivasi, node lebih memilih untuk terhubung ke peer yang menjalankan versi yang sama. Pada saat aktivasi, sebuah node akan memutuskan koneksi dari peer yang berada pada cabang konsensus yang berbeda, sehingga jaringan terpisah secara bersih mengikuti aturan baru alih-alih menjadi bingung.

## Perlindungan replay

Replay adalah ketika seseorang mengambil sebuah transaksi yang valid pada satu chain dan menyiarkannya kembali di chain lain. Overwinter menutup celah tersebut dengan skema tanda tangan baru, yang didefinisikan dalam [ZIP 143](https://zips.z.cash/zip-0143). Saat sebuah dompet menandatangani transaksi, tanda tangan tersebut kini mengikat pada consensus branch id dari chain saat ini. Sebuah transaksi yang ditandatangani untuk satu branch menjadi tidak valid pada branch lainnya, ke arah mana pun. Itulah yang dimaksud dengan perlindungan replay dua arah.

Ini bekerja berdampingan dengan format transaksi versi 3 baru dari [ZIP 202](https://zips.z.cash/zip-0202), yang terkadang disebut sebagai format Overwintered. Ini menambahkan flag fOverwintered dan id grup versi yang memperjelas ke set aturan konsensus mana sebuah transaksi termasuk. Sebagai manfaat tambahan, skema tanda tangan baru ini juga meningkatkan seberapa cepat transaksi transparan divalidasi.

![How replay protection works: a wallet signs a transaction that commits to the current consensus branch id, so the transaction cannot be replayed on any other branch](/content-images/overwinter-replay-flow-754ec8578a.webp)

## Kedaluwarsa transaksi

[ZIP 203](https://zips.z.cash/zip-0203) menambahkan kedaluwarsa transaksi. Sebuah transaksi kini dapat menetapkan tinggi blok kedaluwarsa. Jika transaksi tersebut belum ditambang pada tinggi tersebut, node akan menghapusnya dari mempool, ruang tunggu untuk transaksi yang belum dikonfirmasi. Sebelum ini, sebuah transaksi dapat tertahan tanpa konfirmasi dalam waktu yang lama. Kedaluwarsa berarti transaksi yang tersendat pada akhirnya akan terhapus dengan sendirinya, yang mengurangi ketidakpastian bagi Anda dan menjaga agar mempool tidak penuh dengan transaksi lama yang belum ditambang.

## Di mana letaknya

Overwinter adalah Zcash peningkatan jaringan pertama setelah peluncuran mainnet Oktober 2016, dan dirilis secara sengaja sebelum Sapling. Tugasnya adalah infrastruktur, bukan fitur. Dengan memasang mekanisme peningkatan dan mesin perlindungan-replay terlebih dahulu, hal ini memberikan jalur yang aman bagi setiap peningkatan berikutnya (Sapling, Blossom, Heartwood, Canopy, NU5, dan yang setelahnya) untuk diaktifkan.

![Timeline from the October 2016 Sprout launch, through the 2016 to 2018 stretch with no upgrade framework, to Overwinter in June 2018](/content-images/overwinter-timeline-689d9bcf20.webp)

## Glosarium

| Istilah | Makna dalam Bahasa Indonesia |
|---|---|
| Peningkatan jaringan (NU) | Perubahan terkoordinasi pada aturan konsensus Zcash, yang diaktifkan pada ketinggian blok tertentu |
| ID cabang konsensus | Pengidentifikasi singkat yang menamai set aturan konsensus saat ini |
| Ketinggian aktivasi | Blok di mana aturan baru dari peningkatan jaringan mulai berlaku |
| Perlindungan replay | Aturan yang menghentikan transaksi valid pada satu chain agar tidak digunakan kembali pada chain lain |
| Mempool | Pool transaksi yang telah disiarkan tetapi belum ditambang ke dalam sebuah blok |
| Kedaluwarsa transaksi | Ketinggian blok kedaluwarsa di mana transaksi yang belum ditambang akan dihapus |

## FAQ

Apakah Overwinter mengubah ZEC atau privasi Anda? Tidak. Overwinter tidak menambahkan fitur baru dan tidak menyentuh transaksi terlindungi. Ini adalah infrastruktur untuk peningkatan jaringan yang aman di masa mendatang. Dana dan privasi Anda tidak terpengaruh.

Apakah Overwinter menambahkan Sapling atau alamat terlindungi? Tidak. Overwinter tidak menambahkan fitur terlindungi apa pun. Ini mempersiapkan landasan agar Sapling dapat diaktifkan dengan aman di kemudian hari.

Apa itu consensus branch id? Ini adalah label singkat yang menamai kumpulan aturan saat ini. Transaksi berkomitmen padanya saat ditandatangani, yang mana inilah yang memberikan perlindungan replay pada Zcash.

Mengapa beberapa sumber menyebutkan 25 Juni dan yang lainnya 26 Juni? Overwinter diaktifkan pada pukul 01:37 UTC pada 26 Juni 2018. Itu adalah waktu tepat setelah tengah malam UTC, sehingga di banyak zona waktu Barat, jam lokal masih menunjukkan tanggal 25 Juni. Ini adalah blok yang sama dan momen yang sama.

Apa kegunaan dari kedaluwarsa transaksi? Ini berarti transaksi yang tidak pernah ditambang tidak akan tertahan selamanya. Setelah tinggi blok kedaluwarsanya, node akan menghapusnya, sehingga Anda tidak perlu menebak-nebak tentang pembayaran yang tertahan.

Apakah saya perlu melakukan sesuatu? Tidak. Overwinter diaktifkan pada tahun 2018. Setiap dompet atau node Zcash saat ini sudah mengikuti aturan ini.

## Uji pemahaman Anda

Overwinter tidak menambahkan fitur terlindungi baru. Jadi mengapa ini dianggap sebagai salah satu peningkatan paling penting dalam sejarah Zcash?

<details>
<summary>Jawaban</summary>

Karena hal tersebut membangun mekanisme yang menjadi dasar bagi setiap peningkatan selanjutnya. Overwinter memperkenalkan Mekanisme Peningkatan Jaringan dan perlindungan replay dua arah, memberikan Zcash cara standar dan aman untuk mengubah aturan konsensusnya. Tanpa landasan tersebut, Sapling dan peningkatan setelahnya tidak akan dapat diaktifkan dengan lancar.
</details>

### Sumber Daya

[ZIP 200: Mekanisme Peningkatan Jaringan](https://zips.z.cash/zip-0200)

[ZIP 201: Manajemen Peer Jaringan untuk Overwinter](https://zips.z.cash/zip-0201)

[ZIP 202: Format Transaksi Versi 3 untuk Overwinter](https://zips.z.cash/zip-0202)

[ZIP 203: Kedaluwarsa Transaksi](https://zips.z.cash/zip-0203)

[ZIP 143: Validasi Tanda Tangan Transaksi untuk Overwinter](https://zips.z.cash/zip-0143)

[Overwinter Peningkatan Jaringan](https://z.cash/upgrade/overwinter/)

### Lihat juga

[Zcash Peningkatan Jaringan](../start-here/network-upgrades)

[Pool terlindungi](../using-zcash/shielded-pools)

[Full Node](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Apa itu ZEC dan Zcash](../start-here/what-is-zec-and-zcash)

---

Seri: Indeks Peningkatan Jaringan [](../start-here/network-upgrades) · Sebelumnya: [Sprout](../zcash-tech/sprout) · Berikutnya: [Sapling](../zcash-tech/sapling)