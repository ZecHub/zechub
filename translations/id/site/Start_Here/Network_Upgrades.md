# Zcash Peningkatan Jaringan

Zcash berkembang melalui peningkatan jaringan: perubahan terkoordinasi pada aturan yang disepakati setiap node, masing-masing diaktifkan pada ketinggian blok yang ditetapkan. Setiap peningkatan di bawah memiliki halaman sendiri yang menjelaskan, dengan bahasa sederhana, apa yang diubah dan alasannya. Baru mengenal Zcash? Bacalah secara berurutan, dari Sprout hingga Ironwood.

Untuk kisah visual tentang bagaimana privasi Zcash berkembang di seluruh peningkatan ini, lihat [Evolusi Privasi](https://zechub.wiki/zcash-evolution). Halaman ini adalah indeksnya. Halaman itu adalah linimasanya.

| Peningkatan | Aktivasi (UTC) | Blok | ID cabang | Perubahannya |
|---|---|---|---|---|
| [Sprout](../zcash-tech/sprout) | 28 Oktober 2016 | genesis | 00000000 | Peluncuran: pool terlindungi pertama dan transaksi privat zk-SNARK |
| [Overwinter](../zcash-tech/overwinter) | 26 Juni 2018 | 347,500 | 5ba81b19 | Perlindungan replay, pembuatan versi transaksi, dan masa kedaluwarsa, sehingga peningkatan yang aman menjadi mungkin |
| [Sapling](../zcash-tech/sapling) | 29 Oktober 2018 | 419,200 | 76b809bb | Transaksi terlindungi yang efisien, cukup cepat untuk ponsel dan dompet perangkat keras |
| [Blossom](../zcash-tech/blossom) | 11 Desember 2019 | 653,600 | 2bb40e60 | Blok yang lebih cepat, sekitar 75 detik, dan throughput yang lebih tinggi |
| [Heartwood](../zcash-tech/heartwood) | 16 Juli 2020 | 903,000 | f5b9230b | Imbalan penambangan terlindungi dan klien yang lebih ringan (FlyClient) |
| [Canopy](../zcash-tech/canopy) | 18 November 2020 | 1,046,400 | e9ff75a6 | Dana Pengembangan, halving pertama, dan penghentian bertahap pool Sprout |
| [NU5](../zcash-tech/nu5) | 31 Mei 2022 | 1,687,104 | c2d6d0b4 | Pool Orchard pada Halo 2 (tanpa trusted setup), alamat terpadu, dan transaksi v5 |
| [NU6](../zcash-tech/nu6) | 23 November 2024 | 2,726,400 | c8e71055 | Deferred Dev Fund Lockbox dan pembagian baru pendanaan pengembangan |
| [NU6.1](../zcash-tech/nu6-1) | 24 November 2025 | 3,146,400 | 4dec4df0 | Tata kelola komunitas dan pemegang koin atas pendanaan tersebut |
| [NU6.2](../zcash-tech/nu6-2) | 3 Juni 2026 | 3,364,600 | 5437f330 | Perbaikan darurat yang mengoreksi sirkuit Orchard |
| [Ironwood (NU6.3)](../zcash-tech/ironwood) | 28 Juli 2026 | 3,428,143 | 37a5165b | Pool Ironwood dan turnstile publik yang memungkinkan siapa pun mengaudit pasokan |
| **NU7** (mendatang) | Testnet: 4 Okt 2026; Mainnet: ditargetkan 5 Nov 2026 | Testnet: 4,465,026; Mainnet: 3,543,405 | 77190ad9 | Blok 25 detik (ZIP 218), daur ulang biaya NSM (ZIP 235+237), penghentian Sprout (ZIP 2003) |

Tanggal ditampilkan dalam UTC. Beberapa dashboard menampilkannya dalam waktu lokal, yang merupakan blok dan momen yang sama. Pemicu tetap untuk setiap peningkatan adalah ketinggian blok aktivasinya, bukan tanggal kalender.

### Status NU7

NU7 aktif di Testnet publik pada ketinggian **4,465,026** (diaktifkan pada 4 Oktober 2026). Ketinggian aktivasi Mainnet adalah **3,543,405** ([ZIP 259](https://zips.z.cash/zip-0259)), yang ditargetkan pada **5 November 2026**.

Cakupan (ZIP 259):

- **Blok 25 detik** (ZIP 218) — konfirmasi pertama ~3× lebih cepat; penerbitan ZEC harian tidak berubah.
- **Network Sustainability Mechanism** (ZIP 235 + ZIP 237) — 60% biaya transaksi dikeluarkan dari peredaran ke dalam cadangan, diterbitkan kembali kepada penambang dengan jadwal yang mempertahankan halving mulai sekitar Februari 2031.
- **Penghentian Sprout** (ZIP 2003) — transaksi versi 4 menjadi tidak valid; dana Sprout yang tersisa menjadi tidak dapat dibelanjakan.
- Batas tindakan terlindungi dan jendela perataan kesulitan yang lebih lebar (17 → 102 blok).

Tidak ada format transaksi baru yang diperkenalkan. ID cabang konsensus: `0x77190ad9`.

Lihat linimasa [Evolusi Privasi](https://zechub.wiki/zcash-evolution) dan [ZIP 259](https://zips.z.cash/zip-0259) untuk detail lengkap. Linimasa forum: [NU7 Timeline](https://forum.zcashcommunity.com/t/nu7-timeline/57655).
