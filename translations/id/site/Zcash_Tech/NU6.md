<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU6.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# NU6

> NU6 mulai beroperasi pada mainnet Zcash di blok 2.726.400 (23 November 2024 UTC).

Apa yang akan Anda pelajari: bagaimana Zcash terus mendanai pengembangannya sendiri setelah halving, mengapa ia menyisihkan cadangan yang belum diketahui cara penggunaannya, dan bagaimana ia membuat total pasokan ZEC menjadi sangat terprediksi.

NU6 adalah [peningkatan jaringan](../start-here/network-upgrades) Zcash yang diterapkan oleh [ZIP 253](https://zips.z.cash/zip-0253), yang diaktifkan pada mainnet pada November 2024 pada blok 2.726.400. Ini adalah peningkatan moneter dan ](../start-here/development-fund)pendanaan-pengembangan[: peningkatan ini mempertahankan sebagian dari subsidi blok untuk dialokasikan ke pengembangan setelah halving November 202kan, menetapkan cadangan dalam protokol untuk penggunaan masa depan yang diputuskan oleh komunitas, dan memperketat cara penghitungan ZEC baru. NU6 telah didukung baik oleh Electric Coin Company maupun Zcash Foundation.

Mengapa ini penting. [Development Fund](../zcash-tech/canopy) milik Zcash dijadwalkan berakhir sekitar halving November 2024, yang kedua dalam sejarahnya. NU6 menjaga pendanaan tersebut tetap berjalan, tetapi alih-alih menyerahkan setiap koin kepada penerima tetap, ia menyisihkan sebagian di dalam protokol sehingga komunitas dapat memutuskan apa yang akan dilakukan dengannya nanti. Hal ini juga menutup celah akuntansi yang tidak terlihat, sehingga jumlah total ZEC yang akan pernah ada kini dapat diprediksi secara tepat.

## Apa yang diubah oleh NU6

NU6 terus mengirimkan 20% dari subsidi blok ke pendanaan pengembangan setelah halving November 2024, sebuah aturan yang ditetapkan dalam [ZIP 1015](https://zips.z.cash/zip-1015). Bagian 20% tersebut dibagi menjadi dua cara.

1. 8% dari subsidi blok diberikan kepada Zcash Community Grants (ZCG), yang mendanai pekerjaan oleh dan untuk komunitas.
2. 12% masuk ke dalam lockbox baru di dalam protokol, yang disimpan untuk penggunaan masa depan yang diputuskan oleh komunitas.

Sisa dari subsidi blok, ditambah dengan biaya transaksi, diberikan kepada para penambang yang mengamankan jaringan. NU6 juga memperbarui aturan aliran pendanaan dan dev-fund yang ada (ZIP 207 dan ZIP 214) agar sesuai dengan struktur baru ini.

![NU6 development-fund split: 20 percent of the block subsidy goes to development, with 8 percent to Zcash Community Grants and 12 percent into the Deferred Dev Fund Lockbox](/content-images/nu6-dev-fund-split-08bc73e317.webp)

## Lockbox yang ditangguhkan

Bagian 12% adalah ide baru di NU6. Alih-alih dibayarkan ke alamat penerima, nilai tersebut didepositkan langsung ke dalam pool in-protocol yang disebut Deferred Dev Fund Lockbox, yang didefinisikan dalam [ZIP 2001](https://zips.z.cash/zip-2001).

1. Lockbox adalah jenis aliran pendanaan baru (DEFERRED_POOL), di mana nilai imbalan blok masuk ke dalam protokol itu sendiri, bukan kepada seseorang atau organisasi.
2. Jaringan melacaknya sebagai saldo pool nilai rantai tersendiri, dengan cara yang sama seperti jaringan melacak saldo dari pool terlindungi.
3. NU6 membuat lockbox tersebut dengan sengaja tetapi membiarkan pertanyaan sulit tetap terbuka: siapa yang mengendalikan dana tersebut, dan bagaimana dana tersebut dilepaskan?

Pertanyaan tersebut kemudian dijawab oleh [NU6.1](../zcash-tech/nu6-1), yang menetapkan tata kelola: hal ini melanjutkan aliran subsidi blok sebesar 8% ke Zcash Community Grants dan mengarahkan aliran sebesar 12% ke dalam dana yang dikendalikan oleh pemegang koin yang didanai oleh lockbox.

## Menyeimbangkan pembukuan

NU6 juga menutup celah akuntansi dalam cara ZEC baru dibuat, yang didefinisikan dalam [ZIP 236](https://zips.z.cash/zip-0236). Transaksi Coinbase adalah transaksi khusus yang membayar ZEC baru dan biaya pada setiap blok.

1. Sebelum NU6, sebuah transaksi coinbase hanya perlu tidak mengklaim lebih dari yang seharusnya diterima. Seorang penambang dapat mengklaim kurang dari subsidi penuh, yang secara diam-diam membakar ZEC tersebut.
2. Setelah NU6, sebuah transaksi coinbase harus seimbang secara tepat: total nilai output harus sama dengan subsidi penambang ditambah biaya, tidak lebih dan tidak kurang.
3. Karena penambang tidak lagi dapat melakukan klaim di bawah jumlah seharusnya dan secara tidak sengaja membakar ZEC, jumlah total ZEC yang akan pernah ada kini dapat diprediksi secara tepat.

![Coinbase balancing before and after NU6: before, coinbase could under-claim and burn ZEC so supply was not exactly predictable. After, coinbase must balance exactly so issuance is exactly predictable](/content-images/nu6-coinbase-balance-0fa2394799.webp)

## Bagaimana pendanaan berevolusi

NU6 adalah satu bab dalam sebuah cerita panjang tentang bagaimana Zcash membiayai dirinya sendiri.

1. Canopy (2020) mengakhiri imbalan pendiri asli dan membentuk dana pengembangan [](../start-here/development-fund).
2. NU6 (November 2024) merestrukturisasi pendanaan tersebut setelah halving kedua dan menyiapkan Deferred Dev Fund Lockbox, dengan mencadangkan sebagian dari penerbitan untuk hibah masa depan yang diputuskan oleh komunitas.
3. NU6.1 (2025) menjawab pertanyaan NU6 yang dibiarkan terbuka, mengenai siapa yang mengendalikan dana cadangan tersebut, dengan melanjutkan 8% dari subsidi blok ke Zcash Community Grants dan mengarahkan 12% ke dalam dana yang dikendalikan oleh pemegang koin yang didanai oleh lockbox.

![How Zcash funding evolved: Canopy created the development fund, NU6 set up the lockbox, and NU6.1 set the rules for who controls it](/content-images/nu6-funding-timeline-2427db58c0.webp)

## Glosarium

| Istilah | Makna dalam bahasa Inggris sederhana |
|---|---|
| Block subsidy | ZEC baru yang dibuat dengan setiap blok yang ditambang |
| Transaksi Coinbase | Transaksi khusus yang membayar subsidi blok dan biaya |
| Deferred Dev Fund Lockbox | Cadangan dalam protokol yang menyimpan sebagian dari penerbitan untuk penggunaan masa depan yang diputuskan oleh komunitas |
| Zcash Community Grants (ZCG) | Sebuah komite yang mendanai pekerjaan oleh dan untuk komunitas Zcash |
| Consensus branch id | Pengidentifikasi yang digunakan node untuk memberi tahu aturan peningkatan mana yang diikuti oleh sebuah blok |
| Network upgrade (NU) | Perubahan terkoordinasi pada aturan konsensus Zcash, yang diaktifkan pada ketinggian blok tertentu |

## FAQ

Apakah NU6 mengubah ZEC saya atau privasi saya? Tidak. NU6 adalah tentang bagaimana pengembangan didanai dan bagaimana penerbitan dihitung, bukan tentang transaksi atau privasi Anda. Dana dan transaksi terlindungi Anda tidak terpengaruh.

Dari mana pendanaannya berasal? Dari subsidi blok, ZEC baru yang diterbitkan saat blok ditambang. Sebesar 20% dialokasikan untuk pengembangan alih-alih seluruhnya diberikan kepada penambang.

Apa kegunaan lockbox tersebut? Lockbox ini menyisihkan sebagian dari penerbitan di dalam protokol sehingga komunitas dapat memutuskan cara penggunaannya nanti. NU6 menyisihkan cadangan tersebut, dan NU6.1 menetapkan aturan tentang siapa yang mengendalikannya.

Apakah aturan saldo-persis mengubah koin Anda? Tidak. Aturan ini hanya mengharuskan transaksi coinbase pada setiap blok untuk membayar tepat sesuai dengan jumlah yang seharusnya dibayarkan. Hal ini memengaruhi akuntansi penerbitan baru, bukan saldo yang sudah ada.

Apa yang secara teknis mendefinisikan NU6? NU6 diterapkan oleh ZIP 253, yang menetapkan aktivasi mainnet pada blok 2.726.400 dan id cabang konsensusnya. Perubahan konsensus itu sendiri berasal dari ZIP 236, ZIP 1015, dan ZIP 2001, dengan ZIP 207 dan ZIP 214 yang diperbarui agar sesuai.

Apa perbedaan antara NU6 dan NU6.1? NU6 merestrukturisasi pendanaan dan membuat lockbox. NU6.1 memutuskan siapa yang mengendalikan dana lockbox dan bagaimana bagian cadangan dibagi.

## Uji pemahaman Anda

NU6 menyiapkan Deferred Dev Fund Lockbox tetapi tidak menyebutkan siapa yang mengendalikannya. Mengapa sebuah peningkatan jaringan menciptakan cadangan dan sengaja menunda tata kelolanya untuk waktu mendatang?

<details>
<summary>Jawaban</summary>

Membuat cadangan yang dikunci di mana sebagian dari penerbitan akan disisihkan di dalam protokol alih-alih dibayarkan kepada penerima tetap. Memutuskan siapa yang mengendalikan dana tersebut dan bagaimana dana tersebut dilepaskan adalah pertanyaan tata kelola yang lebih sulit. NU6 sengaja membiarkan hal itu terbuka, dan NU6.1 menjawabnya: 8% dari subsidi blok terus mengalir ke Zcash Community Grants, dan 12% masuk ke dana yang dikendalikan oleh pemegang koin yang diawali oleh lockbox.
</details>

### Sumber Daya

[ZIP 253: Penerapan Peningkatan Jaringan NU6](https://zips.z.cash/zip-0253)

[ZIP 236: Blok harus seimbang secara tepat](https://zips.z.cash/zip-0236)

[ZIP 1015: Alokasi Subsidi Blok untuk Pendanaan Pengembangan Non-Langsung](https://zips.z.cash/zip-1015)

[ZIP 2001: Aliran Pendanaan Lockbox](https://zips.z.cash/zip-2001)

Peningkatan Jaringan 6 (NU6) dari [](https://z.cash/upgrade/nu6/)

### Lihat juga

[Zcash Peningkatan Jaringan](../start-here/network-upgrades)

Dana Pengembangan [](../start-here/development-fund)

[Zcash Kebijakan Moneter](../start-here/zcash-monetary-policy)

[NU6.1](../zcash-tech/nu6-1)

[NU6.2](../zcash-tech/nu6-2)

[Apa itu ZEC dan Zcash](../start-here/what-is-zec-and-zcash)

---

Seri: Indeks Peningkatan Jaringan [](../start-here/network-upgrades) · Sebelumnya: [NU5](../zcash-tech/nu5) · Berikutnya: [NU6.1](../zcash-tech/nu6-1)