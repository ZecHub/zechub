<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU7.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU7

> NU7 diaktifkan di Mainnet pada Zcash blok 3,543,405 pada 6 November 2026 (02:34 UTC; malam 5 November di zona waktu AS), dan telah berjalan sejak saat itu.

Yang akan Anda pelajari: perubahan yang dibuat NU7 (blok lebih cepat, batas tindakan terlindungi, daur ulang biaya, berakhirnya transaksi versi 4), hal-hal yang tidak berubah, serta tindakan yang perlu dilakukan operator node, dompet, exchange, dan penambang.

NU7 adalah peningkatan jaringan Zcash [](../start-here/network-upgrades), yang diterapkan melalui [ZIP 259](https://zips.z.cash/zip-0259). Peningkatan ini memangkas waktu antarblok dari 75 detik menjadi 25 detik, membatasi jumlah tindakan terlindungi dalam satu blok, mulai mengeluarkan 60% biaya transaksi dari peredaran agar dapat diterbitkan kembali kepada penambang di masa mendatang, dan membuat transaksi versi 4 tidak valid sehingga pool Sprout lama dihentikan. Peningkatan ini tidak memperkenalkan format transaksi baru. ID cabang konsensusnya adalah `0x77190ad9`.

Mengapa ini penting. Sebelum NU7, Anda menunggu rata-rata 75 detik untuk konfirmasi pertama, yang terlalu lama untuk kasir toko, setoran exchange, atau swap lintas chain. NU7 memangkas waktu itu menjadi sekitar 25 detik tanpa mencetak lebih banyak ZEC: imbalan per blok dipangkas menjadi sepertiganya, sehingga penerbitan harian tetap sama. Peningkatan ini juga merupakan yang pertama menambahkan mekanisme untuk membiayai keamanan jaringan setelah imbalan blok menyusut.

Baru mengenal Zcash? Mulailah dengan [Apa itu ZEC dan Zcash](../start-here/what-is-zec-and-zcash) dan [Pool Terlindungi](../using-zcash/shielded-pools), lalu kembali ke halaman ini.

## TL;DR

Singkatnya: blok kini muncul setiap 25 detik, jumlah ZEC baru per hari tetap sama, sebagian biaya setiap transaksi disimpan untuk penambang di masa depan, dan pool Sprout lama ditutup.

- **Blok 25 detik** ([ZIP 218](https://zips.z.cash/zip-0218)): konfirmasi pertama dalam sekitar 25 detik, bukan 75 detik. Subsidi blok turun dari 1.5625 menjadi 0.52083333 ZEC, sehingga sekitar 1.800 ZEC tetap diterbitkan per hari.
- **Batas tindakan terlindungi** (ZIP 218): maksimal 330 tindakan terlindungi per blok di seluruh pool, dengan batas untuk setiap pool, agar biaya validasi blok dan sinkronisasi dompet dalam skenario terburuk lebih rendah daripada sebelumnya.
- **Mekanisme Keberlanjutan Jaringan** ([ZIP 235](https://zips.z.cash/zip-0235) + [ZIP 237](https://zips.z.cash/zip-0237)): 60% biaya transaksi setiap blok dikeluarkan dari peredaran dan diterbitkan kembali kepada penambang di kemudian hari, mulai dari blok 8,939,664 (diperkirakan sekitar Februari 2031). Batas pasokan 21 juta tidak berubah.
- **Transaksi versi 4 tidak valid** ([ZIP 2003](https://zips.z.cash/zip-2003)): dompet harus membuat transaksi v5 atau v6. Sprout hanya dapat dibelanjakan dengan v4, sehingga dana yang masih berada di Sprout kini dibekukan.
- **Perangkat lunak**: [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) dan versi setelahnya mengikuti NU7. Tidak ada rilis `zcashd` dengan dukungan NU7.

## Analogi visual

Bayangkan blockchain sebagai jalur kereta. Sebelum NU7, kereta berangkat setiap 75 detik dan dapat mengangkut penumpang sebanyak yang muat dalam 2 MB. NU7 menjalankan kereta setiap 25 detik, membayar setiap masinis sepertiga ongkos lama sehingga jumlah harian tetap sama, dan membatasi jumlah penumpang terberat (tindakan terlindungi) yang dapat naik ke satu kereta agar pemeriksaan setiap kereta tidak memakan waktu terlalu lama.

![NU7 in four panels: blocks are three times faster and new ZEC per day stays the same; 60% of fees go into a public reserve for rewards from 2031; the legacy Sprout pool from 2016 can no longer be spent; 98.9% of voting ZEC chose to keep halvings](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-four-changes.png)

## Perubahan yang dibuat NU7

### Target jarak antarblok 25 detik (ZIP 218)

- Penyesuaian kesulitan kini menargetkan satu blok setiap **25 detik**, bukan 75 detik, sehingga blok muncul tiga kali lebih sering.
- Subsidi blok dibagi tiga: **0.52083333 ZEC** per blok pada periode halving saat ini (sebelumnya 1.5625 ZEC). Penerbitan harian tetap sekitar 1.800 ZEC (3.456 blok per hari, bukan 1.152).
- Halving tetap terjadi setiap empat tahun. Karena blok lebih cepat, halving berikutnya bergeser ke blok **6,132,390**, diperkirakan sekitar akhir November 2028 dengan jarak antarblok 25 detik (ZIP 259).
- Jendela rata-rata kesulitan bertambah dari 17 menjadi **102 blok**, sehingga penyesuaiannya tetap melihat rentang waktu yang serupa.
- Kedaluwarsa transaksi default bertambah dari 40 menjadi **120 blok**, sehingga waktunya tetap sekitar 50 menit.

### Batas tindakan terlindungi (ZIP 218)

Setiap blok kini memiliki anggaran bersama dan batas untuk setiap pool:

| Batas | Per blok |
|---|---|
| Semua tindakan terlindungi di seluruh pool | 330 |
| Tindakan Orchard | 330 |
| Tindakan Ironwood | 330 |
| Input + output Sapling | 300 |
| Sprout JoinSplits | tidak diizinkan |

Sebelum NU7, blok 2 MB yang penuh dapat memuat sekitar 617 tindakan Orchard atau Ironwood, atau sekitar 2.107 output Sapling, tanpa batas per pool. ZIP 218 menetapkan batas baru agar, meski blok muncul tiga kali lebih banyak, skenario terburuk bagi node dan sinkronisasi dompet lebih ringan daripada sebelumnya (misalnya, bandwidth sinkronisasi terlindungi light client maksimum turun dari sekitar 271 menjadi 169 MB per hari), sementara throughput protokol Orchard meningkat lebih dari dua kali lipat (sekitar 2,9 menjadi 6,6 transaksi per detik untuk transaksi dengan 2 tindakan).

### Mekanisme Keberlanjutan Jaringan (ZIP 235 + ZIP 237)

- **Pengeluaran biaya (ZIP 235):** 60% biaya transaksi di setiap blok dikeluarkan dari peredaran; 40% sisanya diberikan kepada penambang seperti sebelumnya. Tidak seperti pembakaran, ZEC yang dikeluarkan tetap dicatat agar dapat diterbitkan kembali nanti.
- **Penerbitan kembali (ZIP 237):** ZEC yang dikeluarkan disimpan dalam status konsensus publik yang disebut Saldo Nilai NSM. Saldo ini diisi pada NU7 dengan nilai 368.58 ZEC yang tidak diklaim penambang pada masa lalu. Mulai blok **8,939,664** (diperkirakan sekitar Februari 2031), setiap blok menerbitkan bagian tetap dari saldo tersebut di atas jadwal halving normal.
- Batas pasokan tidak meningkat. Saat saldo mencapai nol, penerbitan mengikuti jadwal halving lama secara tepat.
- NU7 **tidak** menerapkan [ZIP 233](https://zips.z.cash/zip-0233) (pengeluaran sukarela oleh pengguna) atau [ZIP 234](https://zips.z.cash/zip-0234) (mengganti halving dengan kurva yang mulus). Jajak pendapat pemegang koin memilih rancangan yang mempertahankan halving dalam ZIP 237.
- Rincian penghapusan biaya dan penerbitan kembali ada di halaman [Network Sustainability Mechanism](./Network_Sustainability_Mechanism.md).

### Transaksi versi 4 dilarang (ZIP 2003)

- Mulai NU7, setiap transaksi versi 4 tidak valid: bukan hanya transfer Sprout, tetapi juga transaksi khusus transparan dan transaksi Sapling yang dibuat dalam format v4. Transaksi versi 5 (NU5) dan versi 6 ([Ironwood](../zcash-tech/ironwood)) tidak berubah.
- Transfer Sprout hanya tersedia dalam format v4, sehingga pool [Sprout](../zcash-tech/sprout) tidak dapat lagi digunakan untuk membelanjakan dana. Lihat [Memulihkan Dana](../using-zcash/recovering-funds).

### Hal-hal kecil lainnya

- Revisi aturan dana pengembangan agar aliran pendanaan berfungsi dengan blok 25 detik ([ZIP 207](https://zips.z.cash/zip-0207) Revisi 2, [ZIP 214](https://zips.z.cash/zip-0214) Revisi 3), serta pembaruan daftar alamat aliran pendanaan ([ZIP 2008](https://zips.z.cash/zip-2008)).
- Node NU7 mengiklankan versi protokol jaringan **170190** di Mainnet dan memutus koneksi peer lama setelah aktivasi.

## Hal-hal yang tidak dilakukan NU7

- **Tidak ada format transaksi baru.** NU7 sengaja menghindari migrasi dompet dan parser lainnya tepat setelah Ironwood memperkenalkan transaksi v6.
- **Tidak ada perubahan pada batas pasokan atau siklus halving empat tahunan.**
- **Tidak ada perubahan pada masa jatuh tempo coinbase.** Koin hasil penambangan tetap memerlukan 100 blok sebelum dapat dibelanjakan (kini sekitar 42 menit, bukan sekitar 2 jam).
- **Tidak ada pool terlindungi baru.** Ironwood (NU6.3) tetap menjadi pool terbaru; Orchard tetap hanya bisa digunakan untuk membelanjakan dana, seperti sejak Ironwood.

## Tindakan yang perlu dilakukan setiap kelompok

- **Operator node:** jalankan [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) atau versi setelahnya. Zebra 7 memindahkan basis datanya dari format v28 ke v29 saat pertama kali dijalankan, dan Zebra 6.x tidak dapat membaca v29, jadi cadangkan `state/v28` sebelum melakukan peningkatan. `zcashd` tidak memiliki rilis NU7 (rilis terbarunya adalah 6.20.0, dari Juni 2026); panduan migrasi API [zcashd Zebra](https://zebra.zfnd.org/user/zcashd-api-migration-guide.html) memetakan setiap RPC `zcashd` ke Zebra, [Zallet](../zcash-tech/zallet) atau penggantinya. Lihat [Full Nodes](../zcash-tech/full-nodes) dan panduan [Hardened Zebra](../guides/hardened-zebrad).
- **Dompet:** berhenti membuat transaksi v4, gunakan kedaluwarsa default 120 blok, pertahankan kedalaman anchor 3 blok (kini sekitar 1,25 menit), dan patuhi batas tindakan per blok. Transaksi yang dengan sendirinya melanggar batas tidak akan pernah dapat ditambang.
- **Exchange dan layanan pembayaran:** konfirmasi kini memerlukan 25 detik, jadi jumlah konfirmasi yang sama mencakup sepertiga waktu. Tinjau kembali jumlah konfirmasi setoran berdasarkan waktu dan keamanan yang Anda inginkan, alih-alih mempertahankan jumlah lama karena kebiasaan.
- **Penambang dan pool:** perangkat lunak penambangan dan template harus menggunakan subsidi baru, pembagian biaya, dan batas tindakan; blok yang dibuat berdasarkan aturan lama akan ditolak.

## Kesalahan umum

- **"Node lama saya masih berjalan, jadi semuanya baik-baik saja."** Khusus untuk NU7, ZIP 259 mengesampingkan aturan biasa yang membuat perangkat lunak sebelum peningkatan berhenti sendiri sebelum aktivasi. Zebra 6.x atau node `zcashd` dapat tetap daring dengan aturan lama dan diam-diam tertinggal dari chain yang sebenarnya. Pastikan node Anda melaporkan ketinggian di atas 3,543,405 dan cocok dengan block explorer.
- **"Blok lebih cepat berarti lebih banyak ZEC yang dicetak."** Tidak. Subsidi per blok turun menjadi sepertiganya, sehingga penerbitan harian tidak berubah.
- **"60% biaya dibakar selamanya."** Tidak. Biaya tersebut dikeluarkan lalu diterbitkan kembali kepada penambang oleh NSM; batas pasokan tidak berubah.
- **"Hanya pengguna Sprout yang terdampak oleh perubahan v4."** Dompet atau skrip apa pun yang masih menghasilkan transaksi v4, termasuk transaksi khusus transparan dan transaksi Sapling, tidak lagi berfungsi. Transaksi v4 yang masih tertunda menjadi tidak valid saat aktivasi, dan menandatanganinya kembali saja tidak dapat membuatnya valid.
- **"Pengaturan berdasarkan jumlah blok tetap sama."** Semua hal yang diukur dalam blok (konfirmasi, kedaluwarsa, waktu penguncian, batas waktu) kini berlalu tiga kali lebih cepat dalam waktu nyata.

## Glosarium

| Istilah | Arti sederhana |
|---|---|
| Block target spacing | Rata-rata waktu antarblok yang dituju penyesuaian kesulitan: 25 detik sejak NU7 |
| Block subsidy | ZEC baru yang dibuat di setiap blok, dibagi antara penambang dan aliran dana pengembangan |
| Shielded action | Satu unit pekerjaan terlindungi dalam transaksi (tindakan Orchard atau Ironwood, atau input atau output Sapling) |
| Network Sustainability Mechanism (NSM) | Aturan yang mengeluarkan sebagian biaya dari peredaran dan menerbitkannya kembali kepada penambang di masa depan |
| NSM Value Balance | Jumlah berjalan publik dari ZEC yang dikeluarkan dari peredaran dan menunggu untuk diterbitkan kembali |
| Version 4 transaction | Format transaksi dari Sapling, yang dibuat tidak valid oleh NU7; v5 dan v6 tetap valid |
| Consensus branch ID | Angka yang mengidentifikasi serangkaian aturan konsensus; tanda tangan menyertakan angka ini, sehingga transaksi yang ditandatangani untuk aturan lama tidak valid berdasarkan aturan baru |

## FAQ

**Kapan NU7 diaktifkan?** Di Mainnet pada blok 3,543,405 tanggal 6 November 2026 pukul 02:34 UTC. Testnet diaktifkan lebih awal, pada blok 4,465,026 tanggal 4 Oktober 2026.

**Apakah imbalan blok berubah?** Per blok, ya: 0.52083333 ZEC, bukan 1.5625 ZEC. Per hari, tidak: sekitar 1.800 ZEC dalam kedua skenario.

**Apakah Sprout ZEC saya hilang?** Dana itu tidak dapat lagi dipindahkan karena pengeluaran Sprout memerlukan transaksi v4, dan transaksi tersebut kini tidak valid. Lihat [Memulihkan Dana](../using-zcash/recovering-funds) untuk mengetahui dampaknya dalam praktik.

**Apakah saya memerlukan dompet baru?** Anda memerlukan versi dompet yang mendukung NU7. Halaman ZecHub[Dompet](../using-zcash/wallets) menunjukkan dompet mana yang kompatibel dengan NU7.

**Kapan biaya mulai diterbitkan kembali?** Pada blok 8,939,664 di Mainnet, diperkirakan sekitar Februari 2031 jika rata-rata waktu antarblok tetap 25 detik.

**Mengapa NU7 melewatkan format transaksi baru?** Agar dompet dan parser tidak perlu melakukan migrasi kedua tepat setelah format v6 Ironwood, dan karena pembagian biaya dihitung per blok sehingga tidak diperlukan kolom transaksi baru.

## Uji pemahaman Anda

1. Mengapa penerbitan ZEC harian tetap sama setelah NU7?
2. Apa yang terjadi pada 60% biaya yang dikeluarkan dari peredaran?
3. Mengapa dana Sprout tidak dapat dibelanjakan setelah NU7?
4. Mengapa node yang tidak pernah ditingkatkan sangat berisiko dalam peningkatan ini?

Jawaban: (1) subsidi per blok dipangkas menjadi sepertiganya, sementara blok muncul tiga kali lebih sering; (2) biaya masuk ke Saldo Nilai NSM dan diterbitkan kembali kepada penambang mulai dari blok 8,939,664; (3) pengeluaran Sprout hanya tersedia dalam format v4, yang dibuat tidak valid oleh NU7; (4) ZIP 259 mengesampingkan penghentian otomatis, sehingga node lama dapat terus berjalan di chain yang salah.

### Sumber

[ZIP 259: Penerapan Peningkatan Jaringan NU7](https://zips.z.cash/zip-0259)

[ZIP 218: Target Jarak Antarblok 25 Detik](https://zips.z.cash/zip-0218)

[ZIP 235: Mengeluarkan 60% Biaya Transaksi dari Peredaran](https://zips.z.cash/zip-0235)

[ZIP 237: Mekanisme Keberlanjutan Jaringan: Penerbitan yang Mempertahankan Halving](https://zips.z.cash/zip-0237)

[ZIP 2003: Melarang transaksi versi 4](https://zips.z.cash/zip-2003)

[Zebra Catatan rilis 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)

[Zcash Forum Komunitas: NU7 Linimasa](https://forum.zcashcommunity.com/t/nu7-timeline/57655)

## Halaman terkait

| Halaman | Alasan terkait |
|---|---|
| [Ironwood](./Ironwood.md) | peningkatan sebelumnya dalam rangkaian ini, yang memperkenalkan transaksi v6 |
| [Network Sustainability Mechanism](./Network_Sustainability_Mechanism.md) | rincian penghapusan biaya dan penerbitan kembali |
| [Perubahan Nyata dari Blok 25 Detik](../research/what-25-second-blocks-actually-change) | pembahasan lebih mendalam tentang waktu blok yang lebih cepat |
| [Sprout](./Sprout.md) | pool NU7 yang dihentikan |
| [Memulihkan Dana](../using-zcash/recovering-funds) | arti pembekuan Sprout bagi dana lama |
| [Transaksi](../using-zcash/transactions) | kedaluwarsa dan konfirmasi setelah NU7 |

---

Seri: indeks [Peningkatan Jaringan](../start-here/network-upgrades) · Sebelumnya: [Ironwood](../zcash-tech/ironwood)
