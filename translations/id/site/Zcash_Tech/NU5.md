<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# NU5

> NU5 diluncurkan pada mainnet Zcash di blok 1.687.104 (31 Mei 2022 UTC).

Apa yang akan Anda pelajari: bagaimana NU5 memberikan Zcash sebuah pool terlindungi baru yang tidak memerlukan trusted setup, ditambah dengan satu tipe alamat tunggal yang dapat digunakan di seluruh pool.

NU5 (Network Upgrade 5) adalah [peningkatan jaringan](../start-here/network-upgrades) Zcashkeenam, yang diterapkan oleh [ZIP 252](https://zips.z.cash/zip-0252). Ini merupakan peningkatan kriptografi utama. Hal ini memperkenalkan protokol pembayaran Orchardterlindungi, yang dibangun di atas sistem Halo 2 proving, bersama dengan Alamat terpadu dan format transaksi versi 5 yang baru. NU5 diluncurkan dalam rilis zcashd v5.0.0 milik Electric Coin Company.

Mengapa ini penting. Sebuah pool terlindungi hanya dapat dipercaya sejauh setup yang membuatnya. Dua pool terlindungi pertama dari Zcash, yaitu Sprout dan Sapling, masing-masing memerlukan upacara trusted setup satu kali untuk menghasilkan parameter rahasianya. Jika parameter tersebut pernah disimpan alih-alih dimusnahkan, seseorang dapat mencetak ZEC palsu tanpa diketahui oleh siapa pun. Pool Orchard milik NU5 mengatasi kekhawatiran tersebut dengan menggunakan sistem pembuktian Halo 2 yang tidak memerlukan upacara semacam itu.

## Setup terpercaya

Orchard adalah protokol terlindungi yang diperkenalkan oleh NU5, yang didefinisikan dalam [ZIP 224](https://zips.z.cash/zip-0224). Protokol ini dibangun di atas sistem pembuktian Halo 2, yang menggunakan teknik bernama arithmetization PLONKish pada siklus kurva Pallas dan Vesta. Keuntungan praktisnya sangat sederhana: Halo 2 tidak memerlukan trusted setup maupun structured reference string, sehingga tidak ada parameter rahasia yang dapat disalahgunakan.

Sprout dan Sapling keduanya bergantung pada trusted setup. Sekelompok orang menjalankan sebuah seremoni untuk membangun parameter dari setiap pool, dan semua orang harus percaya bahwa setidaknya satu dari mereka telah menghancurkan bagian rahasia milik mereka. Orchard menghapus asumsi tersebut. Pool yang lebih lama masih tetap ada setelah NU5, sehingga jaminan tanpa-setup berlaku untuk dana yang Anda simpan di dalam pool Orchard.

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## Apa yang diubah oleh NU5

NU5 menggabungkan beberapa perubahan konsensus, yang semuanya diaktifkan secara bersamaan pada blok 1,687,104.

1. Ini menambahkan pool terlindungi Orchard (ZIP 224), protokol Halo 2 yang dijelaskan di atas.
2. Ini menambahkan format transaksi versi 5 (ZIP 225), sebuah tata letak terstruktur ulang dengan wilayah terpisah untuk data transparan, Sapling, dan Orchard baru. Field Sprout telah dihapus, dan format versi 4 yang lebih lama tetap valid setelah aktivasi.
3. Ini memperkenalkan Unified Addresses dan unified viewing keys (ZIP 316), yang dibahas di bagian berikutnya.
4. Ini mengadopsi non-malleability pengidentifikasi transaksi (ZIP 244), cara baru dalam menghitung id transaksi yang memisahkan apa yang dilakukan sebuah transaksi dari proof dan tanda tangan yang mengotorisasinya.
5. Ini mengadopsi encoding titik Jubjub kanonik (ZIP 216) untuk menghapus encoding non-standar dan memperketat aturan tentang apa yang dianggap sebagai transaksi valid.
6. Ini memungkinkan relay transaksi versi 5 di seluruh jaringan peer-to-peer (ZIP 239).

NU5 juga memperbarui sejumlah ZIP yang sudah ada (32, 203, 209, 212, 213, 221, dan 401) agar sesuai dengan Orchard pool yang baru.

## Alamat Terpadu

Sebelum NU5, setiap pool memiliki tipe alamatnya sendiri, dan pengirim harus mengetahui jenis mana yang Anda inginkan. Alamat Terpadu (Unified Addresses), yang didefinisikan dalam [ZIP 316](https://zips.z.cash/zip-0316), mengubah hal tersebut. Sebuah Alamat Terpadu tunggal dapat menggabungkan penerima untuk lebih dari satu pool, sehingga dompet pengirim cukup memilih alamat terbaik yang didukungnya.

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](/content-images/nu5-unified-address-6e2c84f66e.webp)

Unified viewing keys bekerja dengan cara yang sama untuk proses melihat. Kunci tersebut memberikan visibilitas baca-saja di seluruh pool yang dicakup oleh sebuah alamat. Untuk informasi lebih lanjut mengenai hal tersebut, lihat halaman [Viewing Keys](../zcash-tech/viewing-keys).

## Di mana posisi NU5

NU5 mengikuti peningkatan jaringan sebelumnya dari Zcash: Overwinter, Sapling, Blossom, Heartwood, dan Canopy. Ini diaktifkan pada mainnet pada 31 Mei 2022. Siklus kurva Orchard dipilih karena mendukung rekursi, yang merupakan landasan bagi pekerjaan penskalaan di masa mendatang. NU5 adalah pendahulu langsung bagi lini peningkatan NU6 dan NU6.x, yang dibangun di atas pool Orchard dan kemudian memperbaikinya.

## Glosarium

| Istilah | Makna dalam Bahasa Inggris Sederhana |
|---|---|
| Peningkatan jaringan (NU) | Perubahan terkoordinasi pada aturan konsensus Zcash, yang diaktifkan pada ketinggian blok yang telah ditentukan |
| Orchard | Pool terlindungi NU5 yang diperkenalkan, dibangun di atas sistem pembuktian Halo 2 |
| Halo 2 | Sistem pembuktian di balik Orchard yang tidak memerlukan trusted setup |
| Trusted setup | Sebuah seremoni satu kali yang membuat parameter rahasia sebuah pool dan harus dipercaya untuk menghancurkannya |
| Unified Address | Sebuah alamat tunggal yang dapat menggabungkan penerima untuk lebih dari satu pool (ZIP 316) |
| Consensus branch id | Sebuah pengidentifikasi yang menandai kumpulan aturan mana yang dimiliki oleh sebuah transaksi |

## FAQ

Apakah NU5 mengubah ZEC saya atau privasi saya? Tidak. NU5 menambahkan pool terlindungi baru dan format alamat baru. ZEC Anda yang sudah ada tidak terpengaruh, dan privasi Anda tidak berkurang. Memindahkan dana ke Orchard memberi Anda sebuah pool yang tidak memerlukan trusted setup.

Apa itu Orchard? Orchard adalah protokol terlindungi milik Zcash yang diperkenalkan oleh NU5. Protokol ini berjalan pada sistem pembuktian Halo 2, sehingga tidak memerlukan upacara setup terpercaya.

Apakah saya harus melakukan sesuatu? Tidak. Dompet yang didukung akan menangani NU5 untuk Anda. Anda dapat terus menggunakan alamat lama, dan Anda dapat mulai menggunakan Alamat terpadu saat dompet Anda menyediakannya.

Apa itu Alamat terpadu? Sebuah alamat tunggal yang dapat menampung penerima untuk lebih dari satu pool. Dompet pengirim akan memilih pool yang didukungnya, sehingga Anda tidak perlu memberikan alamat yang berbeda untuk setiap jenis.

Apakah NU5 menghapus trusted setup dari dana lama saya? Tidak secara retroaktif. Orchard tidak memerlukan trusted setup, tetapi parameter awal dari pool Sapling masih tetap ada setelah NU5. Jaminan tanpa setup berlaku untuk dana yang disimpan dalam pool Orchard.

Apakah format transaksi lama berhenti berfungsi? Tidak. NU5 menambahkan format versi 5, dan format versi 4 yang lebih lama tetap valid setelah aktivasi.

## Uji pemahaman Anda

Baik Sprout maupun Sapling sama-sama membutuhkan upacara trusted setup. Apa yang diubah oleh Orchard dari NU5 mengenai hal tersebut pada pool, dan mengapa hal itu penting?

<details>
<summary>Jawaban</summary>

Orchard dibangun di atas sistem pembuktian Halo 2 yang tidak memerlukan trusted setup dan tidak memerlukan structured reference string. Hal ini menghilangkan risiko bahwa parameter rahasia yang tersisa dapat digunakan untuk memalsukan ZEC. Jaminan ini berlaku untuk dana yang disimpan dalam pool Orchard. Parameter Sapling yang lama masih tetap ada setelah NU5.

### Sumber Daya

[ZIP 252: Penerapan Peningkatan Jaringan NU5](https://zips.z.cash/zip-0252)

[ZIP 224: Orchard Protokol Terlindungi](https://zips.z.cash/zip-0224)

[ZIP 225: Format Transaksi Versi 5](https://zips.z.cash/zip-0225)

[ZIP 316: Alamat Terpadu dan Viewing Key Terpadu](https://zips.z.cash/zip-0316)

Peningkatan Jaringan [](https://z.cash/upgrade/nu5/)

[Electric Coin Company: Rilis zcashd 5.0.0](https://electriccoin.co/blog/new-release-5-0-0/)

### Lihat juga

[Zcash Peningkatan Jaringan](../start-here/network-upgrades)

[Pool Terlindungi](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Viewing Keys](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

Seri: Indeks Peningkatan Jaringan [](../start-here/network-upgrades) · Sebelumnya: [Canopy](../zcash-tech/canopy) · Berikutnya: [NU6](../zcash-tech/nu6)