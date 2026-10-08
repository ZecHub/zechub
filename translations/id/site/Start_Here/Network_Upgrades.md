# Peningkatan Jaringan Zcash

Zcash meningkat melalui peningkatan jaringan: perubahan aturan yang terkoordinasi di mana setiap node menyetujuinya, masing-masing diaktifkan pada ketinggian blok yang telah ditentukan. Setiap peningkatan di bawah ini memiliki halamannya sendiri yang menjelaskan, dengan bahasa sederhana, apa yang diubahnya dan mengapa. Baru di Zcash? Bacalah secara berurutan, dari Sprout hingga Ironwood.

Untuk cerita visual tentang bagaimana privasi Zcash telah berkembang melalui peningkatan jaringan ini, lihat [Evolusi Privasi](https://zechub.wiki/zcash-evolution). Halaman ini adalah indeksnya. Halaman tersebut adalah lini masanya.

| Upgrade | Aktivasi (UTC) | Blok | Branch id | Apa yang diubah |
|---|---|---|---|---|
| [Sprout](../zcash-tech/sprout) | 28 Oktober 2016 | genesis | 00000000 | Peluncuran: pool terlindungi pertama dan transaksi pribadi zk-SNARK |
| [Overwinter](../zcash-tech/overwinter) | 26 Juni 2018 | 347.500 | 5ba81b19 | Perlindungan replay, versi transaksi, dan masa berlaku, sehingga peningkatan yang aman menjadi mungkin |
| [Sapling](../zcash-tech/sapling) | 29 Oktober 2018 | 419.200 | 76b809bb | Transaksi terlindungi yang efisien, cukup cepat untuk ponsel dan dompet hardware |
| [Blossom](../zcash-tech/blossom) | 11 Desember 2019 | 653.600 | 2bb40e60 | Blok lebih cepat, sekitar 75 detik, dan throughput yang lebih tinggi |
| [Heartwood](../zcash-tech/heartwood) | 16 Juli 2020 | 903.000 | f5b9230b | Imbalan penambangan terlindungi dan client yang lebih ringan (FlyClient) |
| [Canopy](../zcash-tech/canopy) | 18 November 2020 | 1.046.400 | e9ff75a6 | Development Fund, halving pertama, dan penghentian pool Sprout |
| [NU5](../zcash-tech/nu5) | 31 Mei 2022 | 1.687.104 | c2d6d0b4 | Pool Orchard pada Halo 2 (tanpa trusted setup), alamat terpadu, dan transaksi v5 |
| [NU6](../zcash-tech/nu6) | 23 November 2024 | 2.726.400 | c8e71055 | Deferred Dev Fund Lockbox dan pembagian pendanaan pengembangan yang baru |
| [NU6.1](../zcash-tech/nu6-1) | 24 November 2025 | 3.146.400 | 4dec4df0 | Tata kelola komunitas dan pemegang koin atas pendanaan tersebut |
| [NU6.2](../zcash-tech/nu6-2) | 3 Juni 2026 | 3.364.600 | 5437f330 | Perbaikan darurat yang mengoreksi sirkuit Orchard |
| [Ironwood (NU6.3)](../zcash-tech/ironwood) | 28 Juli 2026 | 3.428.143 | 37a5165b | Pool Ironwood dan turnstile publik yang memungkinkan siapa saja mengaudit suplai |

Tanggal ditampilkan dalam UTC. Beberapa dashboard menampilkannya dalam waktu lokal, yang merupakan blok yang sama dan momen yang sama. Pemicu tetap untuk setiap peningkatan adalah ketinggian blok aktivasinya, bukan tanggal kalender: Ironwood diaktifkan pada blok 3.428.143. Peningkatan di masa mendatang, NU7, masih dalam tahap perencanaan dan tidak sama dengan Ironwood.