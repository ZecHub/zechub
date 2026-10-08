<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Canopy

> Canopy diluncurkan pada mainnet Zcash di blok 1.046.400 (18 November 2020 UTC).

Apa yang akan Anda pelajari: bagaimana Zcash terus mendanai pengembangannya sendiri setelah imbalan pendiri berakhir, dan bagaimana Canopy menyusun pembagian pendanaan yang masih menjadi dasar bagi peningkatan jaringan di masa mendatang.

Canopy adalah peningkatan jaringan kelima dari Zcash, yang juga diberi label Network Upgrade 4 (NU4). Ini diterapkan oleh [ZIP 251](https://zips.z.cash/zip-0251), dan diaktifkan pada blok mainnet 1.046.400 pada 18 November 2020 (UTC), pada saat yang sama dengan halving imbalan blok pertama Zcash. Canopy utamanya merupakan peningkatan tata kelola dan moneter. Ini mengakhiri imbalan pendiri asli dan memulai Zcash Development Fund yang baru, yang membayar Electric Coin Company, Zcash Foundation, dan penerima hibah independen. Kebijakan di balik dana tersebut muncul dari proses tata kelola komunitas yang diperluas pada tahun 2019.

Mengapa hal ini penting. Zcash mendanai pengembangannya sendiri dari imbalan blok, karena tidak ada perusahaan di belakangnya. Imbalan yang ditetapkan oleh para pendiri untuk membayar tahun-tahun awalnya akan berakhir pada halving pertama. Canopy adalah penggantinya: ia mengalihkan bagian tetap dari setiap imbalan blok ke dalam Dana Pengembangan dan menetapkan siapa yang menerimanya. Model tersebut disempurnakan melalui peningkatan selanjutnya, hingga [NU6.1](../zcash-tech/nu6-1).

![Before Canopy the founders reward funded development and was set to end at the first halving. After Canopy the Development Fund takes 20 percent of each block reward and runs to the second halving in 2024](/content-images/canopy-founders-to-devfund-010676e799.webp)

## Dana pengembangan

Canopy mengakhiri imbalan pendiri asli dan menggantinya dengan Dana Pengembangan Zcash. Perubahan tersebut terjadi pada blok yang sama dengan halving pertama Zcash, saat imbalan blok turun dari 6.25 ZEC menjadi 3.125 ZEC. Jadi, para penambang melihat imbalan mereka dipotong setengah pada hari yang sama saat sebagian baru dari imbalan yang lebih kecil tersebut mulai mengalir ke pengembangan.

Dana tersebut diatur untuk berjalan selama empat tahun, mulai dari halving pertama ini pada November 2020 hingga halving kedua pada tahun 2024. Kebijakan yang disepakati telah disusun sebagai [ZIP 1014](https://zips.z.cash/zip-1014). Mekanisme konsensus yang benar-benar memindahkan dana tersebut adalah mekanisme aliran pendanaan: [ZIP 207](https://zips.z.cash/zip-0207) memperkenalkan cara umum untuk mengarahkan sebagian dari subsidi blok ke penerima yang telah ditentukan, dan [ZIP 214](https://zips.z.cash/zip-0214) menetapkan aturan spesifik dan alamat penerima untuk Dana Pengembangan.

## Bagaimana pembagian dana dilakukan

Dana Pengembangan mengambil 20 persen dari setiap imbalan blok. Penambang menyimpan 80 persen sisanya. 20 persen tersebut kemudian dibagi menjadi tiga bagian, mengikuti ZIP 1014.

1. 35 persen untuk Bootstrap Project, organisasi induk dari Electric Coin Company.
2. 25 persen untuk Zcash Foundation.
3. 40 persen untuk Major Grants, yang mendanai pekerjaan independen dan dikelola oleh Zcash Foundation. Major Grants kemudian menjadi Zcash Community Grants (ZCG).

Jika diukur terhadap seluruh imbalan blok alih-alih hanya dana tersebut, bagian-bagian tersebut setara dengan 7 persen untuk Electric Coin Company, 5 persen untuk Zcash Foundation, dan 8 persen untuk Major Grants. Kedua cara mendeskripsikannya menghasilkan angka yang sama.

![The Development Fund is 20 percent of each block reward, split 35 percent to Bootstrap and the Electric Coin Company, 25 percent to the Zcash Foundation, and 40 percent to Major Grants](/content-images/canopy-dev-fund-split-005bf6f2dd.webp)

## Perubahan pool Sprout

Canopy juga mulai menghentikan penggunaan pool terlindungi yang paling lama. Sprout adalah pool terlindungi pertama dari Zcash, dan Canopy mulai menutupnya secara bertahap melalui [ZIP 211](https://zips.z.cash/zip-0211).

Sejak saat Canopy diaktifkan, tidak ada nilai baru yang dapat ditambahkan ke dalam pool Sprout. Dalam istilah teknis, field `vpub_old` dari setiap JoinSplit harus bernilai nol. Dana yang sudah ada di Sprout masih dapat ditarik, sehingga tidak ada yang terkunci, tetapi pool hanya dapat menyusut sejak saat ini. Ini adalah langkah pertama menuju penghentian penggunaan pool Sprout lama demi beralih ke pool terlindungi yang lebih baru.

![Before Canopy, value could both enter and leave the Sprout pool. After Canopy, no new value can enter but withdrawals are still allowed](/content-images/canopy-sprout-pool-f5166aa049.webp)

## Tambahan teknis

Bersamaan dengan perubahan pendanaan, Canopy membawa dua ZIP teknis yang lebih kecil. [ZIP 212](https://zips.z.cash/zip-0212) mengubah cara penerima menurunkan rahasia ephemeral Sapling, dengan menurunkannya dari plaintext note. [ZIP 215](https://zips.z.cash/zip-0215) menuliskan aturan eksplisit untuk memvalidasi tanda tangan Ed25519, sehingga setiap node menyepakati secara tepat tanda tangan mana yang dianggap valid.

## Glosarium

| Istilah | Makna dalam Bahasa Inggris sederhana |
|---|---|
| Founders reward | Model pendanaan asli yang membiayai pengembangan awal Zcash, dijadwalkan berakhir pada halving pertama |
| Development Fund | Bagian sebesar 20 persen dari setiap block reward yang dialokasikan oleh Canopy untuk pengembangan, berjalan hingga halving kedua |
| Block reward (subsidy) | ZEC baru yang dibuat dan dibayarkan saat setiap block ditambang |
| Halving | Peristiwa terencana di mana block reward dipotong menjadi setengahnya |
| Funding stream | Mekanisme konsensus (ZIP 207) yang mengarahkan sebagian dari subsidi block ke alamat penerima yang telah ditentukan |
| pool Sprout | pool terlindungi asli milik Zcash, yang tidak lagi menerima nilai baru oleh Canopy |

## FAQ

Apakah Canopy mengubah ZEC saya atau privasi saya? Tidak. Canopy adalah tentang bagaimana pengembangan didanai, ditambah beberapa aturan teknis. Saldo Anda dan transaksi terlindungi Anda tidak terpengaruh.

Apakah Canopy memotong imbalan blok? Canopy diaktifkan pada blok yang sama dengan halving pertama Zcash, yang memotong imbalan dari 6.25 ZEC menjadi 3.125 ZEC. Halving tersebut adalah bagian dari kebijakan moneter Zcash. Tugas Canopy adalah memutuskan bagaimana sebagian dari imbalan yang lebih kecil tersebut digunakan.

Apa kegunaan Development Fund? Dana ini mendanai orang-orang yang membangun Zcash. Uangnya disalurkan ke Electric Coin Company (melalui Bootstrap Project), Zcash Foundation, dan Major Grants, yang mendukung pekerjaan independen.

Apakah saya masih bisa menggunakan dana di dalam pool Sprout? Ya. Anda masih dapat menarik dana yang sudah ada di dalam Sprout. Anda hanya tidak dapat menambahkan nilai baru ke dalamnya setelah Canopy.

Apakah Dana Pengembangan bersifat permanen? Tidak. Dana ini diatur untuk berjalan selama empat tahun, mulai dari halving pertama pada November 2020 hingga halving kedua pada tahun 2024, guna memberikan waktu bagi komunitas untuk melihat cara kerjanya sebelum meninjaunya kembali.

Bagaimana hubungan antara Canopy dengan NU6 dan NU6.1? Canopy mengatur pembagian pendanaan tiga arah dan mekanisme aliran pendanaan. Peningkatan selanjutnya, termasuk NU6 dan NU6.1, meninjau kembali dan membentuk ulang Dana Pengembangan yang dibangun di atas fondasi tersebut.

## Uji pemahaman Anda

Canopy diaktifkan pada blok yang sama persis dengan halving pertama Zcash. Mengapa waktu tersebut dipilih, dan apa yang akan terjadi pada pendanaan pengembangan tanpa Canopy?

<details>
<summary>Jawaban</summary>

Imbalan pendiri asli dijadwalkan berakhir pada halving pertama. Tanpa Canopy, semua imbalan blok pasca-halving yang lebih kecil akan jatuh ke penambang, sehingga tidak ada pendanaan tingkat protokol untuk pengembangan. Canopy menggantikan imbalan pendiri dengan Dana Pengembangan pada blok tersebut, sehingga pendanaan berlanjut tanpa adanya celah.

### Sumber Daya

[ZIP 251: Penerapan Peningkatan Jaringan Canopy](https://zips.z.cash/zip-0251)

[ZIP 1014: Membentuk Dev Fund untuk ECC, ZF, dan Hibah Utama](https://zips.z.cash/zip-1014)

[ZIP 207: Aliran Pendanaan](https://zips.z.cash/zip-0207)

[ZIP 214: Aturan konsensus untuk Dana Pengembangan Zcash](https://zips.z.cash/zip-0214)

[ZIP 211: Menonaktifkan Penambahan Nilai Baru ke dalam Sprout Chain Value Pool](https://zips.z.cash/zip-0211)

[Canopy Peningkatan Jaringan](https://z.cash/upgrade/canopy/)

### Lihat juga

[Zcash Peningkatan Jaringan](../start-here/network-upgrades)

Dana Pengembangan [](../start-here/development-fund)

[Zcash Kebijakan Moneter](../start-here/zcash-monetary-policy)

[Pool Terlindungi](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Zcash Tata Kelola](../zcash-community/zcash-governance)

---

Seri: Indeks Peningkatan Jaringan [](../start-here/network-upgrades) · Sebelumnya: [Heartwood](../zcash-tech/heartwood) · Berikutnya: [NU5](../zcash-tech/nu5)