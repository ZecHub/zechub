<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Heartwood

> Heartwood diluncurkan pada mainnet Zcash di blok 903.000 (16 Juli 2020 UTC).

Apa yang akan Anda pelajari: bagaimana Heartwood memungkinkan penambang menerima hadiah blok mereka secara langsung ke alamat terlindungi, dan bagaimana hal itu membuat proof-of-work Zcash dapat diperiksa oleh light client.

Heartwood adalah Zcash [peningkatan jaringan](../start-here/network-upgrades), sebuah hard fork aturan konsensus yang penerapannya ditentukan dalam [ZIP 250](https://zips.z.cash/zip-0250). Ini menggabungkan dua perubahan fitur: [ZIP 213](https://zips.z.cash/zip-0213) (Shielded Coinbase) dan [ZIP 221](https://zips.z.cash/zip-0221) (FlyClient). Heartwood adalah Zcashpeningkatan jaringan utama keempat, dan ini didukung bersama oleh [Electric Coin Company](../zcash-organizations/electric-coin-company) dan [Zcash Foundation](../zcash-organizations/zcash-foundation). Seperti setiap peningkatan Zcash, ini menetapkan id cabang konsensus baru, sebuah tag yang memberikan perlindungan replay dua arah sehingga transaksi yang dibuat di bawah aturan baru tidak dapat di-replay pada chain lama, dan sebaliknya.

Heartwood aktif pada ketinggian blok yang telah ditentukan (903.000), bukan pada waktu jam yang tetap, sehingga menit tepat yang Anda lihat pada sebuah dashboard dapat sedikit berbeda dari satu tempat ke tempat lainnya. Blok tersebut, dan momennya, adalah sama.

Mengapa ini penting. Penambang mendapatkan ZEC yang baru dicetak setiap kali mereka menambang sebuah blok. Sebelum Heartwood, pendapatan tersebut harus masuk ke alamat transparan, yang bersifat publik. Siapa pun dapat melihat berapa banyak yang diperoleh penambang dan ke mana koin tersebut pergi selanjutnya. Heartwood memungkinkan imbalan tersebut langsung masuk ke alamat terlindungi sebagai gantinya, sehingga pembayaran penambang dapat tetap privat. Hal ini juga memungkinkan dompet ringan dan chain lainnya untuk memeriksa proof-of-work dari Zcash tanpa perlu mengunduh seluruh chain.

## Coinbase terlindungi

Transaksi coinbase adalah transaksi khusus yang membayarkan imbalan blok. Sebelum Heartwood, outputnya harus transparan, sehingga ZEC milik penambang yang baru dicetak selalu dimulai di alamat publik. Heartwood mengubah aturan konsensus sehingga, dalam kata-kata ZIP 213, transaksi coinbase dapat berisi output Sapling. Dalam istilah sederhana, penambang sekarang dapat menerima imbalan secara langsung ke alamat Sapling terlindungi. Output coinbase transparan masih didukung, jadi ini adalah opsi baru, bukan perubahan paksaan.

![Before Heartwood a miner's block reward had to go to a transparent public address. After Heartwood coinbase transactions may contain Sapling outputs, so the reward can go straight to a shielded address](/content-images/heartwood-shielded-coinbase-3bf38ae60d.webp)

## Mengapa Sapling yang pertama

Coinbase terlindungi menargetkan output Sapling secara spesifik, dan ada alasan untuk itu. ZIP 213 menjelaskan bahwa peningkatan Sapling membawa perubahan arsitektural dan peningkatan performa yang membuat proses shielding dana secara langsung dalam transaksi coinbase menjadi layak. Pool terlindungi Sprout yang asli terlalu intensif sumber daya untuk melakukan shielding tepat di dalam coinbase. Sistem proving dan format note milik Sapling yang lebih efisien membuatnya menjadi praktis. Sapling sendiri telah memperluas aturan lama yang melarang output coinbase terlindungi sehingga aturan tersebut juga mencakup output Sapling, dan Heartwood melonggarkan aturan tersebut untuk mengizinkannya. Ini adalah contoh yang baik tentang bagaimana peningkatan Zcash saling membangun satu sama lain: infrastruktur dari satu peningkatan menjadi fondasi bagi peningkatan berikutnya.

## FlyClient

Heartwood juga mengubah apa yang dikomitmenkan oleh sebuah header blok. Field header yang sebelumnya bernama hashFinalSaplingRoot digunakan kembali dan diubah namanya menjadi hashLightClientRoot. Sekarang, field ini mengomitmenkan root dari Merkle Mountain Range (MMR), sebuah struktur berjalan yang dibangun di atas data header dan metadata dari blok-blok sebelumnya, seperti timestamp, target kesulitan, root Sapling, accumulated work, dan jumlah transaksi. Komitmen tersebut memungkinkan sebuah light client, atau rantai eksternal, untuk memverifikasi proof-of-work milik Zcash menggunakan sebuah proof kecil yang ukurannya hanya tumbuh secara logaritmik seiring dengan panjang rantai. Hasilnya adalah dompet light-client yang lebih baik dan integrasi pihak ketiga serta cross-chain yang lebih mudah, karena sebuah client tidak lagi harus mengunduh setiap blok untuk mempercayai work di balik rantai tersebut.

![FlyClient flow: each block's header data is committed into a Merkle Mountain Range root (hashLightClientRoot), which lets a light client verify proof-of-work with a small logarithmic-size proof](/content-images/heartwood-flyclient-0c6b5bda0d.webp)

## Di mana posisi Heartwood

Heartwood adalah satu langkah dalam rangkaian peningkatan Zcash, di mana masing-masing menambahkan bagian yang menjadi tumpuan bagi tahap berikutnya. Overwinter dan Sapling hadir pada tahun 2018, Blossom pada tahun 2019, dan Heartwood pada tahun 2020 pada blok 903.000. Canopy menyusul kemudian pada tahun 2020 pada blok 1.046.400. Sapling adalah tautan kunci dalam rantai ini untuk Heartwood: mekanisme transaksi terlindungi yang efisien darinya merupakan prasyarat teknis yang memungkinkan coinbase terlindungi.

![Timeline of Zcash upgrades: Overwinter and Sapling in 2018, Blossom in 2019, and Heartwood in 2020](/content-images/heartwood-timeline-99bc79b6e9.webp)

## Glosarium

| Istilah | Makna dalam Bahasa Inggris Sederhana |
|---|---|
| Peningkatan jaringan (NU) | Perubahan terkoordinasi pada aturan konsensus Zcash, yang diaktifkan pada ketinggian blok tertentu |
| Transaksi Coinbase | Transaksi khusus dalam setiap blok yang membayarkan imbalan blok |
| Alamat Sapling terlindungi | Tipe alamat Zcash pribadi yang diperkenalkan oleh peningkatan Sapling |
| Coinbase terlindungi | Perubahan Heartwood yang memungkinkan imbalan blok dibayarkan ke alamat Sapling terlindungi |
| FlyClient | Sebuah metode yang memungkinkan light client memverifikasi proof-of-work dengan proof kecil |
| Merkle Mountain Range (MMR) | Ringkasan berkelanjutan dari blok-blok sebelumnya yang dikomit oleh header blok |
| Consensus branch id | Sebuah tag yang mengidentifikasi aturan peningkatan mana yang diikuti oleh sebuah transaksi, digunakan untuk perlindungan replay |

## FAQ

Apakah Heartwood mengubah ZEC saya atau privasi saya? Tidak. Heartwood tidak menyentuh dana Anda yang sudah ada. Ini menambahkan opsi bagi penambang untuk menerima imbalan ke dalam alamat terlindungi dan meningkatkan dukungan untuk light client. Saldo Anda sendiri dan transaksi terlindungi tidak terpengaruh.

Apa itu coinbase terlindungi? Coinbase adalah transaksi yang membayar imbalan blok. Heartwood memungkinkan imbalan tersebut masuk ke alamat Sapling terlindungi alih-alih ke alamat transparan, sehingga pendapatan penambang dapat tetap terjaga privasinya.

Apakah penambang harus menerima imbalan secara terlindungi sekarang? Tidak. Coinbase terlindungi bersifat opsional. Output coinbase transparan tetap didukung, sehingga penambang dapat memilih salah satu di antaranya.

Mengapa coinbase terlindungi menggunakan Sapling dan bukan pool Sprout yang lebih lama? Karena desain Sapling yang lebih efisien membuat proses shielding secara langsung di dalam coinbase menjadi praktis. Pool Sprout sebelumnya terlalu boros sumber daya untuk melakukannya.

Apa yang berubah bagi light client? Header blok kini melakukan komitmen terhadap Merkle Mountain Range atas blok-blok sebelumnya melalui field `hashLightClientRoot`. Hal ini memungkinkan light client dan chain lainnya memverifikasi proof-of-work dari Zcash dengan proof berukuran kecil secara logaritmik, alih-alih menggunakan seluruh chain.

## Uji pemahaman Anda

Sebelum Heartwood, mengapa imbalan blok yang dibayarkan kepada penambang muncul secara publik, dan apa yang diubah oleh Heartwood?

<details>
<summary>Jawaban</summary>

Output dari Coinbase harus bersifat transparan, sehingga imbalan yang baru dicetak oleh penambang selalu masuk ke alamat transparan publik yang dapat diperiksa oleh siapa saja. Heartwood mengubah aturan konsensus (ZIP 213) sehingga transaksi coinbase dapat berisi output Sapling, yang memungkinkan penambang menerima imbalan mereka secara langsung ke alamat terlindungi.
</details>

### Sumber Daya

[ZIP 250: Penerapan Peningkatan Jaringan Heartwood](https://zips.z.cash/zip-0250)

[ZIP 213: Coinbase Terlindungi ](https://zips.z.cash/zip-0213)

[ZIP 221: FlyClient - Perubahan Lapisan Konsensus](https://zips.z.cash/zip-0221)

Peningkatan jaringan [ Heartwood ](https://z.cash/upgrade/heartwood/)

### Lihat juga

[Zcash Peningkatan Jaringan](../start-here/network-upgrades)

[Pool terlindungi](../using-zcash/shielded-pools)

Dompet [](../using-zcash/wallets)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

Seri: Indeks Peningkatan Jaringan [](../start-here/network-upgrades) · Sebelumnya: [Blossom](../zcash-tech/blossom) · Berikutnya: [Canopy](../zcash-tech/canopy)