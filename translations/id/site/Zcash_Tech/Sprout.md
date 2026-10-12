<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Sprout

> Zcash diluncurkan pada 28 Oktober 2016, dengan pool terlindungi Sprout.

Apa yang akan Anda pelajari: Sprout adalah tempat di mana Zcash dimulai, pertama kalinya uang privat dan dapat diverifikasi berjalan pada blockchain yang aktif.

Sprout adalah peluncuran asli dari jaringan Zcash, bukan [peningkatan jaringan yang terjadi kemudian](../start-here/network-upgrades). Jaringan ini mulai aktif pada blok genesis pada 28 Oktober 2016. Tidak ada ZIP yang mendefinisikan Sprout: proses ZIP dimulai belakangan dengan Overwinter, sehingga Sprout dijelaskan oleh Spesifikasi Protokol Zcash asli dan konstruksi Zerocash yang menjadi dasarnya. [Electric Coin Company](../zcash-organizations/electric-coin-company) (kemudian Electric Coin Company Zerocoin), yang dipimpin oleh Zooko Wilcox, membangun dan meluncurkannya. Sprout memperkenalkan transaksi terlindungi zk-SNARK praktis pertama dan pool terlindungi yang asli, sehingga orang dapat mengirim ZEC dengan pengirim, penerima, dan jumlah yang tersembunyi sementara jaringan tetap memeriksa bahwa saldo tersebut telah sesuai. Nama tersebut menandakan sebuah chain muda yang sedang berkembang, yang diharapkan tim akan terus tumbuh.

Mengapa ini penting. Setiap blockchain publik sebelum Sprout menampilkan pembayaran Anda secara terbuka: siapa pun dapat melihat siapa yang membayar siapa dan berapa jumlahnya. Sprout adalah jaringan permissionless live pertama yang menyembunyikan detail tersebut namun tetap membuktikan bahwa tidak ada yang berbuat curang. Hal ini penting bagi privasi finansial biasa, jenis privasi yang Anda harapkan dari uang tunai atau rekening koran yang tidak dapat dibaca oleh orang lain. Ini juga membuktikan bahwa privasi on-chain yang kuat dapat berfungsi dalam praktiknya, melampaui sekadar desain di atas kertas. Ceremony trusted-setup yang memungkinkan hal tersebut menjadi titik acuan bagi karya kriptografi selanjutnya, dan sistem proving Sprout yang lambat serta berat memori yang disertakan adalah alasan utama yang mendorong tim untuk membangun Sapling dua tahun kemudian.

## Pool terlindungi pertama

Sprout menciptakan dua jenis alamat. Alamat transparan (t-addresses) bekerja seperti Bitcoin, dengan detail yang terlihat pada buku besar publik. Alamat terlindungi (z-addresses) mengirim dana ke dalam Sprout [pool terlindungi](../using-zcash/shielded-pools), di mana pengirim, penerima, dan jumlahnya tetap tersembunyi. Rahasianya adalah [zk-SNARKs](../zcash-tech/zk-snarks), zero-knowledge proofs yang memungkinkan sebuah transaksi menunjukkan bahwa transaksi tersebut valid, tanpa double spend dan dengan saldo yang sesuai, tanpa mengungkapkan detail apa pun. Sprout adalah pertama kalinya hal ini dijalankan dalam produksi pada cryptocurrency yang aktif.

![Transparent transactions expose sender, receiver, and amount, while Sprout shielded transactions hide all three yet stay verifiable](/content-images/sprout-shielded-vs-transparent-61d3b1980c.webp)

## Upacara

zk-SNARKs di Sprout membutuhkan sekumpulan parameter publik, dan pembuatannya secara aman memerlukan pengaturan satu kali yang disebut Ceremony. Enam partisipan di lokasi terpisah yang berjauhan masing-masing menghasilkan sebuah bagian rahasia, yang disebut toxic waste. Jika ada seseorang yang berhasil menyatukan kembali semua bagian tersebut, mereka dapat memalsukan ZEC dari ketiadaan. Desain ini mengubah risiko tersebut menjadi aturan sederhana: selama setidaknya satu partisipan menghancurkan bagian mereka, rahasia lengkap tersebut tidak akan pernah bisa dibangun kembali, sehingga pemalsuan tetap mustahil dilakukan. Partisipan yang telah disebutkan secara publik meliputi Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd, dan Derek Hinch dari NCC Group. Satu partisipan memilih untuk tetap anonim.

![The Ceremony: six participants generate private shards, then destroy the toxic waste, leaving only the public Sprout parameters](/content-images/sprout-ceremony-flow-ae16f6282a.webp)

## Asal-usul

Sprout adalah baseline yang menjadi dasar bagi setiap perubahan berikutnya. Ketika mekanisme peningkatan jaringan hadir bersama dengan Overwinter, mekanisme tersebut menandai aturan asli sebagai id cabang konsensus 0, yang berarti belum ada peningkatan yang diterapkan. Segala sesuatu sejak saat itu (Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6, dan seterusnya) berada pada rantai yang dimulai oleh Sprout. Peluncurannya diumumkan pada Agustus 2016 untuk genesis tanggal 28 Oktober, Ceremony berlangsung pada minggu-minggu sebelumnya, dan timestamp hardcoded pada blok genesis menunjukkan 28 Oktober 2016, pukul 07:56 UTC.

![Timeline from the August 2016 announcement through the parameter Ceremony to the October 28, 2016 Sprout launch](/content-images/sprout-timeline-348766352a.webp)

## Glosarium

| Istilah | Makna dalam Bahasa Inggris sederhana |
|---|---|
| zk-SNARK | Sebuah zero-knowledge proof yang menunjukkan bahwa suatu transaksi valid tanpa mengungkapkan pengirim, penerima, atau jumlahnya |
| Shielded pool | Sisi privat dari Zcash di mana jumlah dan pihak-pihak terkait disembunyikan. Pool Sprout adalah yang pertama |
| z-address and t-address | z-address bersifat terlindungi dan menjaga detail tetap privat. t-address bersifat transparan dan menampilkan detail pada ledger publik |
| The Ceremony | Setup multi-party tahun 2016 yang menghasilkan parameter publik Sprout dan kemudian membuang toxic waste |
| Toxic waste | Potongan secret key dari The Ceremony yang harus dimusnahkan agar ZEC tidak dapat dipalsukan |
| Consensus branch id 0 | Label untuk aturan Sprout, yang berarti baseline sebelum adanya peningkatan jaringan apa pun |

## FAQ

Apakah Sprout mengubah ZEC atau privasi Anda saat ini? Tidak. Sprout adalah sejarah, peluncuran yang memulai rantai tempat ZEC Anda berada. Koin Anda dan privasi Anda saat ini bergantung pada dompet dan pool terlindungi yang Anda gunakan sekarang, bukan pada apa pun yang perlu Anda lakukan terkait Sprout.

Mengapa tidak ada nomor ZIP untuk Sprout? Proses ZIP dimulai kemudian, dengan peningkatan Overwinter. Sprout adalah peluncuran asli, yang dijelaskan oleh Spesifikasi Protokol Zcash dan konstruksi Zerocash yang menjadi dasarnya. ZIP 200 hanya menyebutkan Sprout dalam tinjauan kembali, sebagai id cabang konsensus 0, baseline sebelum adanya peningkatan apa pun.

Apakah saya perlu memercayai keenam orang dalam Ceremony tersebut? Pengaturannya dibangun sedemikian rupa sehingga Anda hanya memerlukan salah satu dari mereka untuk jujur. Masing-masing memegang bagian rahasia, dan selama satu peserta menghancurkan bagian mereka, rahasia lengkap tidak akan pernah bisa dibangun kembali dan tidak ada yang dapat memalsukan ZEC. Lima peserta telah disebutkan secara publik dan satu orang tetap anonim.

Apakah pool Sprout adalah yang digunakan dompet saya saat ini? Kemungkinan besar tidak. Sprout adalah pool terlindungi pertama, tetapi peningkatan selanjutnya seperti Sapling memperkenalkan desain terlindungi yang lebih cepat, dan sebagian besar dompet menggunakan pool yang lebih baru saat ini. Sprout tetap penting sebagai karya yang membuktikan bahwa transaksi yang privat dan dapat diverifikasi dapat berjalan di jaringan yang aktif.

Apa yang membuat Sprout berbeda dari Bitcoin? Bitcoin menempatkan setiap pembayaran pada buku besar publik di mana jumlah dan alamat dapat terlihat. Sprout menambahkan transaksi terlindungi yang menyembunyikan pengirim, penerima, dan jumlahnya namun tetap memungkinkan jaringan untuk mengonfirmasi bahwa transaksi tersebut valid. Ia juga tetap mempertahankan alamat transparan, sehingga kedua gaya tersebut hidup di chain yang sama.

## Uji pemahaman Anda

Sprout sering disebut sebagai peningkatan jaringan dengan tinggi aktivasi. Mengapa hal tersebut tidak sepenuhnya tepat?

<details>
<summary>Jawaban</summary>

Sprout adalah peluncuran asli dari Zcash, bukan peningkatan di kemudian hari. Ini telah aktif sejak genesis block (block 0) pada 28 Oktober 2016, sehingga tidak ada height aktivasi yang dapat ditunjuk. Mekanisme peningkatan jaringan muncul kemudian dan melabeli aturan Sprout sebagai consensus branch id 0, yang merupakan baseline sebelum adanya peningkatan apa pun.
</details>

### Sumber Daya

[ZIP 200: Mekanisme Peningkatan Jaringan](https://zips.z.cash/zip-0200)

Peningkatan jaringan [Zcash](https://z.cash/upgrade/)

[Electric Coin Company: Peluncuran Zcash Sprout ](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: Desain Upacara](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### Lihat juga

[Pool terlindungi](../using-zcash/shielded-pools)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Zcash Peningkatan Jaringan](../start-here/network-upgrades)

[Apa itu ZEC dan Zcash](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Seri: Indeks Peningkatan Jaringan [](../start-here/network-upgrades) · Berikutnya: [Overwinter](../zcash-tech/overwinter)
