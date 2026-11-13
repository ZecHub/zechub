<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Blossom

> Blossom diluncurkan pada mainnet Zcash di blok 653.600 (11 Desember 2019 UTC).

Apa yang akan Anda pelajari: bagaimana Blossom membuat blok Zcash tiba sekitar dua kali lebih cepat tanpa mengubah jumlah ZEC yang dibuat jaringan dari waktu ke waktu.

Blossom adalah Zcash [peningkatan jaringan](../start-here/network-upgrades). Ini diterapkan oleh [ZIP 206](https://zips.z.cash/zip-0206), dan perubahan konsensus utamanya didefinisikan dalam [ZIP 208](https://zips.z.cash/zip-0208). Blossom adalah peningkatan skalabilitas: ini memperpendek target waktu antar blok dari 150 detik menjadi 75 detik, sehingga blok tiba sekitar dua kali lebih sering. Electric Coin Company memimpin dan mengumumkan Blossom.

Mengapa ini penting. Saat Anda mengirim ZEC, Anda menunggu jaringan mengonfirmasinya dalam sebuah blok. Jika blok lambat, Anda akan menunggu lebih lama. Sebelum Blossom, blok baru diharapkan muncul sekitar setiap 150 detik. Blossom memangkas target tersebut menjadi setengahnya, yaitu 75 detik, sehingga konfirmasi datang lebih cepat dan chain dapat membawa lebih banyak transaksi dalam jumlah waktu yang sama. Hal ini dilakukan tanpa menciptakan lebih banyak ZEC atau mengubah waktu halving di masa mendatang.

## TL;DR

- Blossom adalah peningkatan jaringan ketiga Zcash, yang aktif pada blok mainnet 653.600 (11 Desember 2019 UTC), diterapkan melalui ZIP 206 dengan perubahan intinya di ZIP 208.
- Peningkatan ini memangkas target interval blok dari 150 detik menjadi 75 detik — blok muncul sekitar dua kali lebih sering, sehingga konfirmasi pertama datang lebih cepat dan throughput kira-kira berlipat dua.
- Agar penerbitan tetap stabil, imbalan per blok dibagi dua dan interval halving digandakan dari 840.000 menjadi 1.680.000 blok.
- Total ZEC yang tercipta per satuan waktu dan waktu nyata halving di masa mendatang tidak berubah.
- Ini adalah perubahan bilateral yang wajib: setiap node harus ditingkatkan agar tetap berada di chain.

## Analogi visual

Blossom adalah jaringan bus yang menggandakan jumlah keberangkatannya. Bus kini datang setiap 75 detik, bukan setiap 150 detik, sehingga Anda hanya menunggu separuh waktu (konfirmasi lebih cepat) dan jaringan mengangkut dua kali lipat jumlah penumpang (throughput). Agar total gaji pengemudi tetap sama, bayaran per perjalanan untuk setiap pengemudi dipotong setengah. Total pengeluaran gaji tetap sama, hanya dibayarkan untuk dua kali lebih banyak perjalanan.

## Blok yang lebih cepat

Perubahan inti dari Blossom sangatlah sederhana. Target interval blok Zcash, yaitu waktu yang ditargetkan jaringan di antara satu blok ke blok berikutnya, turun dari 150 detik menjadi 75 detik ([ZIP 208](https://zips.z.cash/zip-0208)). Blok ditemukan melalui proof of work, sehingga celah sebenarnya di antara blok-blok tersebut bervariasi, namun jaringan kini menargetkan sebuah blok sekitar setiap 75 detik, bukan lagi setiap 150 detik.

Dua hal berikut ini:

1. Blok tiba sekitar dua kali lebih sering, sehingga rantai dapat membawa kira-kira dua kali lipat jumlah transaksi per satuan waktu.
2. Transaksi Anda mendapatkan konfirmasi pertama lebih cepat, karena Anda tidak perlu menunggu lama untuk blok berikutnya.

![Before Blossom the block target was 150 seconds with slower confirmations and lower throughput. After Blossom the target is 75 seconds with faster confirmations and roughly double the throughput](/content-images/blossom-block-spacing-50b6bfbacc.webp)

## Menjaga penerbitan tetap stabil

Blok yang lebih cepat menimbulkan sebuah pertanyaan. Jika Zcash membuat blok dua kali lebih banyak dan setiap blok tetap membayar imbalan yang sama, jaringan akan menciptakan ZEC dua kali lebih cepat. Blossom menghindari hal tersebut. Ini memotong setengah imbalan yang dibayarkan per blok, dan menggandakan interval halving imbalan-blok dari 840.000 menjadi 1.680.000 blok ([ZIP 208](https://zips.z.cash/zip-0208)). Jumlah blok dua kali lebih banyak, dengan masing-masing membayar setengahnya, menghasilkan jumlah ZEC yang sama yang dibuat per unit waktu. Jadwal total suplai dan waktu halving di masa mendatang, yang diukur dalam waktu nyata, tidak berubah.

![How Blossom keeps issuance steady: 75 second blocks arrive twice as often, the per-block reward is halved, the halving interval is doubled, so total emission over time stays the same](/content-images/blossom-emission-balance-f2443e29ab.webp)

## Sebuah peningkatan wajib

Blossom adalah perubahan konsensus bilateral, yang berarti setiap node harus melakukan upgrade agar dapat terus mengikuti chain ([ZIP 206](https://zips.z.cash/zip-0206)). Hal ini tidak bersifat opsional bagi operator node yang ingin tetap sinkron. Blossom diaktifkan pada block mainnet 653,600 dan membawa consensus branch id sendiri, sebuah tag yang memungkinkan node dan transaksi mengonfirmasi bahwa mereka berada pada aturan Blossom. Upgrade tersebut menggunakan mekanisme peningkatan jaringan standar dari Zcash ([ZIP 200](https://zips.z.cash/zip-0200)).

## Di mana posisi Blossom

Blossom adalah peningkatan jaringan ketiga dari Zcash. Ini mengikuti Overwinter dan Sapling, serta terjadi sebelum Heartwood dan Canopy. Berbeda dengan Sapling, yang merombak kriptografi terlindungi milik Zcash, Blossom berfokus pada skala dan kecepatan. Tugas utamanya adalah pengaturan waktu blok, bukan fitur privasi baru.

## Kesalahan Umum

- **Mengira block yang lebih cepat berarti lebih banyak ZEC.** Memangkas setengah imbalan per block sambil menggandakan laju block membuat emisi tetap persis sama per satuan waktu.
- **Mengira halving terjadi lebih cepat dalam waktu nyata.** Interval halving digandakan dari 840.000 menjadi 1.680.000 block, sehingga tanggal halving dalam waktu nyata tidak bergeser.
- **Menganggap "75 detik" sebagai jaminan.** Ini adalah target proof of work; selang waktu antar block yang sebenarnya bervariasi di sekitar angka tersebut.
- **Menganggap Blossom sebagai peningkatan privasi.** Tugasnya adalah pengaturan waktu block dan skala. Berbeda dengan Sapling, peningkatan ini tidak mengubah kriptografi apa pun.
- **Mengira operator node dapat melewatinya.** Blossom adalah perubahan konsensus bilateral; node yang tidak ditingkatkan akan terpisah dari jaringan karena fork.

## Glosarium

| Istilah | Makna dalam bahasa Indonesia yang sederhana |
|---|---|
| Block target spacing | Waktu yang ditargetkan jaringan antara satu blok ke blok berikutnya |
| Block reward | ZEC baru yang dibuat dan dibayarkan saat setiap blok ditambang |
| Halving interval | Berapa banyak blok yang berlalu di antara setiap halving dari block reward |
| Consensus branch id | Sebuah tag yang menandai set aturan jaringan mana yang diikuti oleh sebuah node atau transaksi |
| Bilateral consensus change | Perubahan aturan yang harus diadopsi oleh setiap node untuk tetap berada di dalam jaringan |
| Network upgrade (NU) | Perubahan terkoordinasi pada aturan konsensus Zcash, yang diaktifkan pada ketinggian blok tertentu |

## FAQ

Apakah Blossom mengubah seberapa banyak ZEC yang ada atau kapan halving terjadi? Tidak. Imbalan per-block dipotong setengah dan interval halving digandakan pada saat yang sama, sehingga jumlah ZEC yang dibuat per unit waktu, serta waktu halving di masa mendatang, tetap sama.

Apakah Blossom mengubah ZEC saya atau privasi saya? Tidak. Blossom mengubah waktu blok dan perhitungan imbalan. Hal tersebut tidak menyentuh saldo Anda atau transaksi terlindungi Anda.

Apa sebenarnya arti dari 75 detik tersebut? Ini adalah sebuah target, bukan jaminan. Block ditemukan melalui proof of work, sehingga selang waktu antar block yang sebenarnya bervariasi. Jaringan bertujuan untuk menghasilkan satu block sekitar setiap 75 detik, alih-alih setiap 150 detik.

Apakah saya harus melakukan sesuatu saat Blossom diaktifkan? Jika Anda menjalankan full node, Anda perlu memperbaruinya, karena Blossom bersifat wajib. Jika Anda menggunakan dompet, Anda memerlukan versi yang mendukung aturan baru tersebut.

Mengapa imbalan blok harus dikurangi setengahnya? Karena sekarang blok muncul dua kali lebih cepat. Mengurangi imbalan per-blok menjadi setengah akan mencegah jaringan menciptakan ZEC dua kali lebih cepat.

Kapan Blossom diaktifkan? Pada blok mainnet 653.600, pada tanggal 11 Desember 2019 UTC.

## Uji pemahaman Anda

Blossom membuat Zcash blok tiba sekitar dua kali lebih sering. Mengapa hal tersebut tidak menggandakan laju pembuatan ZEC baru?

<details>
<summary>Jawaban</summary>

Karena Blossom juga memotong setengah dari imbalan yang dibayarkan per blok dan menggandakan interval halving dari 840.000 menjadi 1.680.000 blok. Jumlah blok dua kali lipat, dengan masing-masing pembayaran setengah dari sebelumnya, menghasilkan jumlah ZEC yang sama per unit waktu, sehingga jadwal emisi yang diukur dalam waktu nyata tidak berubah.
</details>

### Sumber Daya

[ZIP 208: Target Jarak Blok yang Lebih Pendek](https://zips.z.cash/zip-0208)

[ZIP 206: Penerapan Blossom Peningkatan Jaringan](https://zips.z.cash/zip-0206)

[Blossom Peningkatan Jaringan](https://z.cash/upgrade/blossom/)

[Blossom Peningkatan Meningkatkan Kecepatan, Skalabilitas, Kapasitas (Electric Coin Company)](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### Lihat juga

[Zcash Peningkatan Jaringan](../start-here/network-upgrades)

[Zcash Kebijakan Moneter](../start-here/zcash-monetary-policy)

[Apa itu ZEC dan Zcash](../start-here/what-is-zec-and-zcash)

[Full Node](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

## Halaman Terkait

- [Sapling](./Sapling.md) — peningkatan sebelumnya (kriptografi, bukan waktu)
- [Heartwood](./Heartwood.md) — peningkatan berikutnya dalam seri ini
- [Full Node](./Full_Nodes.md) — apa saja yang diperlukan untuk menjalankan node melalui peningkatan wajib
- [Indeks Peningkatan Jaringan](../start-here/network-upgrades) — linimasa lengkap peningkatan

Seri: Indeks Peningkatan Jaringan [](../start-here/network-upgrades) · Sebelumnya: [Sapling](../zcash-tech/sapling) · Berikutnya: [Heartwood](../zcash-tech/heartwood)