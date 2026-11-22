<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5 diluncurkan di mainnet Zcash pada blok 1,687,104 (31 Mei 2022 UTC).

Hal yang akan Anda pelajari: bagaimana NU5 memberi Zcash pool terlindungi baru yang tidak memerlukan trusted setup, serta satu jenis alamat yang berfungsi di seluruh pool.

NU5 (Peningkatan Jaringan 5) adalah Zcash [peningkatan jaringan](../start-here/network-upgrades) keenam, yang diterapkan melalui [ZIP 252](https://zips.z.cash/zip-0252). Ini adalah peningkatan kriptografis besar. Peningkatan ini memperkenalkan protokol pembayaran terlindungi Orchard, yang dibangun di atas sistem proving Halo 2, bersama dengan Alamat Terpadu dan format transaksi versi 5 yang baru. NU5 dirilis dalam rilis zcashd v5.0.0 milik Electric Coin Company.

Mengapa ini penting. Pool terlindungi hanya dapat dipercaya sejauh setup yang membuatnya dapat dipercaya. Dua pool terlindungi pertama Zcash, yaitu Sprout dan Sapling, masing-masing memerlukan upacara trusted setup satu kali untuk menghasilkan parameter rahasianya. Jika parameter tersebut pernah disimpan alih-alih dimusnahkan, seseorang dapat mencetak ZEC palsu tanpa terlihat oleh siapa pun. Pool Orchard milik NU5 menutup kekhawatiran tersebut dengan menggunakan sistem proving Halo 2, yang tidak memerlukan upacara semacam itu.

## Trusted setup

Orchard adalah protokol terlindungi yang diperkenalkan oleh NU5, yang didefinisikan dalam [ZIP 224](https://zips.z.cash/zip-0224). Protokol ini dibangun di atas sistem proving Halo 2, yang menggunakan teknik bernama aritmetisasi PLONKish pada siklus kurva Pallas dan Vesta. Manfaat praktisnya sederhana: Halo 2 tidak memerlukan trusted setup maupun structured reference string, sehingga tidak ada parameter rahasia yang dapat disalahgunakan.

Sprout dan Sapling sama-sama bergantung pada trusted setup. Sekelompok orang menjalankan upacara untuk membuat parameter setiap pool, dan semua orang harus memercayai bahwa setidaknya salah satu dari mereka memusnahkan bagian rahasianya. Orchard menghilangkan asumsi tersebut. Pool lama tetap ada setelah NU5, sehingga jaminan tanpa setup berlaku untuk dana yang Anda simpan di pool Orchard.

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## Apa yang diubah oleh NU5

NU5 menggabungkan beberapa perubahan konsensus, yang semuanya diaktifkan bersama pada blok 1,687,104.

1. Peningkatan ini menambahkan pool terlindungi Orchard (ZIP 224), protokol berbasis Halo 2 yang dijelaskan di atas.
2. Peningkatan ini menambahkan format transaksi versi 5 (ZIP 225), tata letak yang disusun ulang dengan wilayah terpisah untuk data transparan, Sapling, dan Orchard yang baru. Kolom Sprout dihapus, dan format versi 4 yang lebih lama tetap valid setelah aktivasi.
3. Peningkatan ini memperkenalkan Alamat Terpadu dan viewing key terpadu (ZIP 316), yang dibahas di bagian berikutnya.
4. Peningkatan ini mengadopsi non-malleability pengenal transaksi (ZIP 244), cara baru untuk menghitung id transaksi yang memisahkan apa yang dilakukan suatu transaksi dari proof dan tanda tangan yang mengotorisasinya.
5. Peningkatan ini mengadopsi encoding titik Jubjub kanonis (ZIP 216) untuk menghapus encoding nonstandar dan memperketat aturan tentang hal yang dianggap sebagai transaksi valid.
6. Peningkatan ini mengaktifkan penerusan transaksi versi 5 di seluruh jaringan peer-to-peer (ZIP 239).

NU5 juga memperbarui sejumlah ZIP yang sudah ada (32, 203, 209, 212, 213, 221, dan 401) agar memperhitungkan pool Orchard yang baru.

## Alamat Terpadu

Sebelum NU5, setiap pool memiliki jenis alamatnya sendiri, dan pengirim harus mengetahui jenis yang Anda inginkan. Alamat Terpadu, yang didefinisikan dalam [ZIP 316](https://zips.z.cash/zip-0316), mengubah hal tersebut. Satu Alamat Terpadu dapat menggabungkan receiver untuk lebih dari satu pool, sehingga dompet pengirim cukup memilih receiver terbaik yang didukungnya.

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](/content-images/nu5-unified-address-6e2c84f66e.webp)

Viewing key terpadu bekerja dengan cara yang sama untuk penayangan. Key tersebut memberikan visibilitas baca-saja di seluruh pool yang dicakup oleh sebuah alamat. Untuk informasi lebih lanjut, lihat halaman [Viewing Key](../zcash-tech/viewing-keys).

## Posisi NU5

NU5 mengikuti peningkatan sebelumnya dari Zcash: Overwinter, Sapling, Blossom, Heartwood, dan Canopy. Peningkatan ini diaktifkan di mainnet pada 31 Mei 2022. Siklus kurva Orchard dipilih karena mendukung rekursi, yang menjadi dasar bagi pekerjaan penskalaan berikutnya. NU5 adalah pendahulu langsung dari rangkaian peningkatan NU6 dan NU6.x, yang dibangun di atas pool Orchard dan kemudian menambalnya.

## TL;DR

- NU5 diaktifkan di mainnet pada blok 1,687,104 (31 Mei 2022 UTC) — peningkatan kriptografis terbesar Zcash sejak Sapling, yang diterapkan melalui ZIP 252.
- Peningkatan ini meluncurkan pool terlindungi Orchard, pool Zcash pertama yang dibangun di atas Halo 2 — sistem proving yang sama sekali tidak memerlukan trusted setup.
- Peningkatan ini merilis Alamat Terpadu dan viewing key terpadu (ZIP 316): satu string alamat yang dapat menggabungkan receiver untuk beberapa pool.
- Peningkatan ini memindahkan transaksi ke format versi 5 (ZIP 225) dan membuat id transaksi bersifat non-malleable (ZIP 244).
- Orchard berjalan pada siklus kurva Pallas/Vesta, yang mendukung proof rekursif — dasar bagi pekerjaan penskalaan berikutnya dan rangkaian NU6.x.

## Penjelasan Inti

Masalah trusted setup: Sprout (2016) dan Sapling (2018) masing-masing memerlukan upacara satu kali untuk menghasilkan parameter rahasia, dan keamanan bergantung pada setidaknya satu peserta yang memusnahkan fragmennya. Jika setiap peserta diam-diam menyimpan salinan, ZEC palsu akan mungkin dibuat. Orchard sepenuhnya menghilangkan asumsi tersebut: Halo 2 tidak menggunakan trusted setup maupun structured reference string, sehingga tidak ada rahasia yang dapat disalahgunakan.

NU5 menggabungkan beberapa perubahan konsensus yang diaktifkan bersama: pool Orchard (ZIP 224), format transaksi versi 5 (ZIP 225), Alamat Terpadu (ZIP 316), non-malleability id transaksi (ZIP 244), encoding titik Jubjub kanonis (ZIP 216), dan penerusan transaksi v5 secara peer-to-peer (ZIP 239). Peningkatan ini juga memperbarui ZIP 32, 203, 209, 212, 213, 221, dan 401 agar memperhitungkan pool baru.

## Analogi visual

Pool lama seperti brankas yang kombinasi kuncinya dibuat dalam upacara kelompok satu kali — Anda memercayai bahwa setiap peserta menghancurkan salinan mereka. Orchard adalah brankas yang kuncinya memverifikasi ulang dirinya sendiri setiap kali digunakan: tidak ada upacara, tidak ada rahasia utama, tidak ada apa pun yang dapat disimpan. Alamat Terpadu adalah kartu nama yang mencantumkan setiap pintu masuk — transparan, Sapling, Orchard — dan pengunjung memilih pintu yang benar-benar dapat mereka buka.

## Pembahasan Mendalam

Halo 2 menggunakan aritmetisasi PLONKish pada siklus kurva Pallas dan Vesta — dua kurva yang ramah terhadap pairing dan saling melengkapi, yang memungkinkan rekursi: proof yang memverifikasi proof lain. Rekursi tersebut adalah fondasi tempat pekerjaan penskalaan Zcash berikutnya dibangun. Tata letak transaksi v5 memisahkan wilayah transparan, Sapling, dan Orchard serta menghapus kolom Sprout; format versi 4 yang lebih lama tetap valid setelah aktivasi. ZIP 244 menghitung ulang id transaksi berdasarkan apa yang dilakukan transaksi, bukan berdasarkan proof dan tanda tangan yang mengotorisasinya, sehingga menutup vektor malleability.

## Kesalahan Umum

- **Mengira NU5 menghapus trusted setup untuk setiap pool.** Hanya Orchard yang bebas upacara; parameter Sapling masih ada, sehingga jaminan tanpa setup berlaku untuk dana yang disimpan di Orchard.
- **Menganggap alamat atau dompet lama berhenti berfungsi.** NU5 menambahkan opsi; jenis alamat per pool dan format transaksi v4 tetap valid.
- **Mencampuradukkan Orchard dengan Halo 2.** Orchard adalah protokol/pool terlindungi; Halo 2 adalah sistem proving yang digunakannya.
- **Menganggap Alamat Terpadu sebagai satu-satunya jenis alamat.** Alamat ini adalah format tambahan yang dapat Anda gunakan saat dompet Anda mendukungnya.
- **Meyakini NU5 mengubah penerbitan atau privasi yang ada.** Peningkatan ini menambahkan pool dan format; ZEC yang sudah ada beserta privasinya tidak tersentuh.


## Glosarium

| Istilah | Makna dalam bahasa sederhana |
|---|---|
| Network upgrade (NU) | Perubahan terkoordinasi pada aturan konsensus Zcash, yang diaktifkan pada ketinggian blok tertentu |
| Orchard | Pool terlindungi yang diperkenalkan NU5, dibangun di atas sistem proving Halo 2 |
| Halo 2 | Sistem proving di balik Orchard yang tidak memerlukan trusted setup |
| Trusted setup | Upacara satu kali yang membuat parameter rahasia sebuah pool dan harus dipercaya untuk memusnahkannya |
| Unified Address | Satu alamat yang dapat menggabungkan receiver untuk lebih dari satu pool (ZIP 316) |
| Consensus branch id | Pengenal yang menandai kumpulan aturan tempat suatu transaksi berada |

## FAQ

Apakah NU5 mengubah ZEC atau privasi saya? Tidak. NU5 menambahkan pool terlindungi baru dan format alamat baru. ZEC Anda yang sudah ada tidak terpengaruh, dan privasi Anda tidak berkurang. Memindahkan dana ke Orchard memberi Anda pool yang tidak memerlukan trusted setup.

Apa itu Orchard? Orchard adalah protokol terlindungi milik Zcash yang diperkenalkan oleh NU5. Protokol ini berjalan pada sistem proving Halo 2, sehingga tidak memerlukan upacara trusted setup.

Apakah saya harus melakukan sesuatu? Tidak. Dompet yang didukung menangani NU5 untuk Anda. Anda dapat terus menggunakan alamat lama, dan dapat mulai menggunakan Alamat Terpadu ketika dompet Anda menawarkannya.

Apa itu Alamat Terpadu? Satu alamat yang dapat memuat receiver untuk lebih dari satu pool. Dompet pengirim memilih pool yang didukungnya, sehingga Anda tidak perlu membagikan alamat berbeda untuk setiap jenis.

Apakah NU5 menghapus trusted setup dari dana lama saya? Tidak secara retroaktif. Orchard tidak memerlukan trusted setup, tetapi parameter awal pool Sapling tetap ada setelah NU5. Jaminan tanpa setup berlaku untuk dana yang disimpan di pool Orchard.

Apakah format transaksi lama berhenti berfungsi? Tidak. NU5 menambahkan format versi 5, dan format versi 4 yang lebih lama tetap valid setelah aktivasi.

## Uji pemahaman Anda

Sprout dan Sapling sama-sama memerlukan upacara trusted setup. Apa yang diubah oleh pool Orchard milik NU5 mengenai hal itu, dan mengapa hal tersebut penting?

<details>
<summary>Jawaban</summary>

Orchard dibangun di atas sistem proving Halo 2, yang tidak memerlukan trusted setup maupun structured reference string. Hal tersebut menghilangkan risiko bahwa parameter rahasia yang tersisa dapat digunakan untuk memalsukan ZEC. Jaminan ini berlaku bagi dana yang disimpan di pool Orchard. Parameter Sapling yang lebih lama tetap ada setelah NU5.
</details>

### Sumber daya

[ZIP 252: Penerapan Peningkatan Jaringan NU5](https://zips.z.cash/zip-0252)

[ZIP 224: Protokol Terlindungi Orchard](https://zips.z.cash/zip-0224)

[ZIP 225: Format Transaksi Versi 5](https://zips.z.cash/zip-0225)

[ZIP 316: Alamat Terpadu dan Viewing Key Terpadu](https://zips.z.cash/zip-0316)

[Peningkatan Jaringan 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: Rilis zcashd 5.0.0](https://electriccoin.co/blog/new-release-5-0-0/)

### Lihat juga

[Zcash Peningkatan Jaringan](../start-here/network-upgrades)

[Pool Terlindungi](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Viewing Key](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

## Halaman Terkait

- [Halo](./Halo.md) — sistem proving tanpa trusted setup di balik Orchard
- [Alamat Terpadu](./Unified_Addresses.md) — pembahasan mendalam mengenai pengalamatan ZIP 316
- [Sapling](./Sapling.md) — pool terlindungi sebelumnya, yang masih terikat pada upacaranya
- [NU6](./NU6.md) — peningkatan berikutnya, yang dibangun di atas pool Orchard
- [zk_SNARKS](./zk_SNARKS.md) — teknologi zero-knowledge yang mendasarinya


Seri: [Indeks Peningkatan Jaringan](../start-here/network-upgrades) · Sebelumnya: [Canopy](../zcash-tech/canopy) · Berikutnya: [NU6](../zcash-tech/nu6)
