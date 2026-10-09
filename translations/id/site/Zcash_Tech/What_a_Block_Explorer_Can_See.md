<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/What_a_Block_Explorer_Can_See.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Apa yang dapat dilihat oleh block explorer pada Zcash

## Ringkasan Singkat

- Pada Bitcoin, sebuah block explorer menampilkan segalanya: pengirim, penerima, dan jumlahnya.
- Pada Zcash, hal tersebut hanya berlaku untuk aktivitas transparan (alamat-t).
- Sebuah explorer dapat melihat uang masuk dan keluar dari pool terlindungi, tetapi tidak dapat melihat apa yang terjadi di dalamnya.
- Transaksi yang sepenuhnya terlindungi (z ke z) tidak mengungkapkan pengirim, penerima, maupun jumlahnya.
- Angka "shield rate" publik apa pun merupakan batas minimum, karena aktivitas yang sepenuhnya privat tidak terlihat dari luar.

---

## Dua tipe alamat

Zcash memiliki dua jenis alamat.

Sebuah **alamat transparan** dimulai dengan `t` dan bekerja seperti alamat Bitcoin. Saldo dan pembayaran bersifat publik.

Sebuah **alamat terlindungi** dimulai dengan `z` dan dilindungi oleh zero-knowledge proofs. Jaringan dapat mengonfirmasi bahwa pembayaran terlindungi adalah valid tanpa mengungkapkan pengirim, penerima, atau jumlahnya.

Karena terdapat dua jenis, nilai dapat berpindah dalam empat cara: transparan ke transparan (t ke t), transparan ke terlindungi (t ke z, disebut shielding), terlindungi ke transparan (z ke t, disebut deshielding), dan terlindungi ke terlindungi (z ke z, sepenuhnya privat).

## Apa yang dapat dilihat oleh sebuah explorer

Explorer publik seperti [Blockchair](https://blockchair.com/zcash) dapat membaca dengan jelas:

- Setiap pembayaran yang sepenuhnya transparan (t ke t), dari ujung ke ujung.
- Uang yang masuk ke dalam pool terlindungi (sisi transparan dan jumlahnya).
- Uang yang keluar dari pool terlindungi (sisi transparan dan jumlahnya).
- Total ZEC yang disimpan di setiap pool terlindungi, yang bersifat publik sehingga jaringan dapat membuktikan bahwa tidak ada koin yang dibuat dari ketiadaan.

Singkatnya, tepi-tepi dari pool terlindungi dapat terlihat. Anda dapat memantau nilai yang masuk dan keluar.

## Apa yang tidak dapat dilihat oleh explorer

Explorer publik tidak dapat membaca:

- Transaksi yang sepenuhnya terlindungi (z ke z). Pengirim, penerima, dan jumlahnya tetap tersembunyi.
- Pengirim atau penerima di balik pembayaran terlindungi apa pun.
- Saldo dari sebuah alamat terlindungi individu.
- Apa yang terjadi pada dana setelah berada di dalam pool.

Saat melakukan kueri pada data mentah, field pengirim dan penerima terlindungi akan kembali dalam keadaan kosong. Explorer tidak menyembunyikan hal ini secara sengaja. Data tersebut tidak pernah berada di chain publik dalam bentuk yang dapat dibaca. Informasi tersebut dienkripsi, dan hanya seseorang dengan viewing key yang tepat yang dapat membacanya.

## Mengapa ini penting

**Privasi Anda berasal dari kriptografi, bukan dari mempercayai sebuah perusahaan.** Penyedia data tidak dapat melihat ke dalam transaksi terlindungi meskipun mereka menginginkannya.

**Angka tingkat-shielding publik tidak mencerminkan privasi yang sebenarnya.** Peneliti hanya dapat mengukur apa yang melewati batas publik, sehingga jumlah aktivitas privat yang sebenarnya setidaknya adalah apa yang mereka laporkan, dan biasanya lebih banyak lagi.

**Pool terlindungi yang lebih besar melindungi semua orang.** Semakin banyak orang yang menggunakan alamat terlindungi, semakin besar kerumunan tempat setiap pembayaran pribadi bersembunyi. Menggunakan alamat terlindungi membantu melindungi Anda dan semua orang lainnya di dalam pool.

## Praktikkan langsung

- Gunakan dompet yang secara default menggunakan alamat terlindungi, seperti [ZODL](https://zodl.com) atau [Zingo!](https://www.zingolabs.org/).
- Saat Anda menerima ZEC di alamat transparan, pindahkan ke alamat terlindungi sebelum Anda membelanjakannya.
- Bayarlah ke alamat terlindungi jika memungkinkan. Setiap pembayaran transparan bersifat sepenuhnya publik; pembayaran terlindungi tidak demikian.

## Sumber Daya

- [Zcash: rekomendasi privasi dan keamanan](https://z.cash/support/security/privacy-security-recommendations/)
- Ekosistem terlindungi dari [ (Electric Coin Company)](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)
Bagaimana teknologi [ Zcash bekerja](https://z.cash/technology/)
Explorer [ Blockchair Zcash](https://blockchair.com/zcash)

## Halaman terkait

- Dasar-dasar [Zcash](/start-here/what-is-zec-and-zcash)
- [Dompet](/using-zcash/wallets)
- [Pool terlindungi](/using-zcash/shielded-pools)
- [zk-SNARKs](/zcash-tech/zk-snarks)

---

*Jika Anda ingin menambahkan atau menyarankan pengeditan pada halaman wiki ini, silakan kunjungi repo [ZecHub GitHub](https://github.com/ZecHub/zechub) dan ajukan pull request.*