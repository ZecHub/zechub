# Zcash Peningkatan Jaringan

Zcash berkembang melalui peningkatan jaringan: perubahan terkoordinasi pada aturan yang disepakati setiap node, dan masing-masing diaktifkan pada ketinggian blok yang ditentukan. Setiap peningkatan di bawah memiliki halaman sendiri yang menjelaskan dengan bahasa sederhana apa yang berubah dan alasannya. Baru mengenal Zcash? Baca secara berurutan, dari Sprout hingga Ironwood.

Untuk melihat kisah visual tentang bagaimana privasi Zcash berkembang melalui peningkatan ini, lihat [Evolusi Privasi](https://zechub.wiki/zcash-evolution). Halaman ini adalah indeksnya. Halaman itu adalah linimasa.

| Peningkatan | Aktivasi (UTC) | Blok | ID cabang | Perubahan |
|---|---|---|---|---|
| [Sprout](../zcash-tech/sprout) | 28 Oktober 2016 | genesis | 00000000 | Peluncuran: pool terlindungi pertama dan transaksi privat zk-SNARK |
| [Overwinter](../zcash-tech/overwinter) | 26 Juni 2018 | 347,500 | 5ba81b19 | Perlindungan replay, pemberian versi transaksi, dan masa kedaluwarsa, sehingga peningkatan yang aman menjadi mungkin |
| [Sapling](../zcash-tech/sapling) | 29 Oktober 2018 | 419,200 | 76b809bb | Transaksi terlindungi yang efisien, cukup cepat untuk ponsel dan dompet perangkat keras |
| [Blossom](../zcash-tech/blossom) | 11 Desember 2019 | 653,600 | 2bb40e60 | Blok lebih cepat, sekitar 75 detik, dan throughput lebih tinggi |
| [Heartwood](../zcash-tech/heartwood) | 16 Juli 2020 | 903,000 | f5b9230b | Imbalan penambangan terlindungi dan klien yang lebih ringan (FlyClient) |
| [Canopy](../zcash-tech/canopy) | 18 November 2020 | 1,046,400 | e9ff75a6 | Development Fund, halving pertama, dan penghentian bertahap pool Sprout |
| [NU5](../zcash-tech/nu5) | 31 Mei 2022 | 1,687,104 | c2d6d0b4 | Pool Orchard pada Halo 2 (tanpa trusted setup), alamat terpadu, dan transaksi v5 |
| [NU6](../zcash-tech/nu6) | 23 November 2024 | 2,726,400 | c8e71055 | Deferred Dev Fund Lockbox dan pembagian pendanaan pengembangan yang baru |
| [NU6.1](../zcash-tech/nu6-1) | 24 November 2025 | 3,146,400 | 4dec4df0 | Tata kelola pendanaan tersebut oleh komunitas dan pemegang coin |
| [NU6.2](../zcash-tech/nu6-2) | 3 Juni 2026 | 3,364,600 | 5437f330 | Perbaikan darurat yang mengoreksi sirkuit Orchard |
| [Ironwood (NU6.3)](../zcash-tech/ironwood) | 28 Juli 2026 | 3,428,143 | 37a5165b | Pool Ironwood dan turnstile publik yang memungkinkan siapa saja mengaudit suplai |
| [NU7](../zcash-tech/nu7) | 6 November 2026 | 3,543,405 | 77190ad9 | Blok 25 detik (ZIP 218), daur ulang biaya NSM (ZIP 235+237), penghentian Sprout (ZIP 2003) |

Tanggal ditampilkan dalam UTC. Beberapa dashboard menampilkannya dalam waktu setempat; blok dan momennya tetap sama. Pemicu tetap untuk setiap peningkatan adalah ketinggian blok aktivasi, bukan tanggal kalender.

### Status NU7

NU7 diaktifkan di Mainnet pada ketinggian **3,543,405** ([ZIP 259](https://zips.z.cash/zip-0259)) pada **6 November 2026** (02:34 UTC; malam tanggal 5 November di zona waktu AS). Peningkatan ini lebih dahulu aktif di Testnet publik, pada ketinggian **4,465,026** (4 Oktober 2026).

Cakupan (ZIP 259):

- **Blok 25 detik** (ZIP 218) — konfirmasi pertama sekitar 3× lebih cepat; penerbitan ZEC harian tidak berubah.
- **Mekanisme Keberlanjutan Jaringan** (ZIP 235 + ZIP 237) — 60% biaya transaksi dikeluarkan dari peredaran dan dimasukkan ke dalam cadangan, lalu diterbitkan kembali kepada penambang dengan jadwal yang mempertahankan halving, dimulai sekitar Februari 2031.
- **Penghentian Sprout** (ZIP 2003) — transaksi versi 4 menjadi tidak valid; dana Sprout yang tersisa tidak dapat dibelanjakan.
- Batas tindakan terlindungi dan jendela perataan kesulitan yang lebih lebar (17 → 102 blok).

Tidak ada format transaksi baru yang diperkenalkan. ID cabang konsensus: `0x77190ad9`.

Lihat linimasa [Evolusi Privasi](https://zechub.wiki/zcash-evolution) dan [ZIP 259](https://zips.z.cash/zip-0259) untuk detail lengkap. Linimasa forum: [NU7 Linimasa](https://forum.zcashcommunity.com/t/nu7-timeline/57655).
