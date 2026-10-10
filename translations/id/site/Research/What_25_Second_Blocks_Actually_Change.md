# ZIP 218: Apa yang Sebenarnya Diubah oleh Blok 25 Detik

Dalam jajak pendapat pemegang koin NU7 yang ditutup pada 14 September 2026, sekitar 2.397.669 ZEC memberikan suara untuk ZIP 218 dan 141,6 ZEC memberikan suara menentangnya, dengan hasil 99,9%. Sebagian besar liputan merangkumnya sebagai "blok Zcash menjadi lebih cepat." Hal itu benar, tetapi mengabaikan sebagian besar dari apa yang dilakukan oleh proposal tersebut dan sebagian besar dari apa yang sengaja dijaga agar tetap sama.

Halaman ini menjelaskan ZIP 218 dari teksnya sendiri: apa yang berubah, apa yang tidak berubah, dan berapa biayanya.

## Versi singkat

| | Hari Ini | Setelah ZIP 218 |
|---|---|---|
| Jarak target blok | 75 detik | 25 detik |
| Blok per hari | 1.152 | 3.456 |
| Subsidi blok (era halving saat ini) | 1,5625 ZEC | 0,52083333 ZEC |
| ZEC baru per hari | tidak berubah | tidak berubah |
| Interval halving | 1.680.000 blok | 5.040.000 blok |
| Batasan pada tindakan terlindungi per blok | tidak ada (hanya batasan ukuran 2 MB) | total 330, dengan batas per-pool |
| Throughput Orchard (transaksi 2-tindakan) | sekitar 2,9 per detik | sekitar 6,6 per detik |

![ZIP 218 cuts block target spacing from 75 seconds to 25, tripling daily blocks from 1,152 to 3,456, while dividing the per-block subsidy by the same factor of three from 1.5625 to 0.52083333 ZEC, so daily issuance stays at 1,800 ZEC and the halving interval stretches from 1,680,000 to 5,040,000 blocks to hold halving dates fixed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-block-timing.png)

Tiga kali lipat jumlah blok, masing-masing membayar sepertiga dari sebelumnya. Jadwal pasokan tetap sama seperti semula.

## Mengapa mengubah waktu blok

Tujuan utamanya adalah **waktu tunggu yang lebih rendah**. Saat ini, sebuah pembayaran menunggu rata-rata 75 detik untuk konfirmasi pertamanya, apa pun beban jaringannya. Pada 25 detik, angka tersebut turun menjadi rata-rata 25 detik. ZIP menyebutkan pembayaran point-of-sale, deposit exchange, dan cross-chain bridges sebagai penggunaan yang paling merasakan hal ini.

Dua poin dari ZIP perlu untuk diingat:

- **Ini tidak menyuruh siapa pun untuk menggunakan konfirmasi yang lebih sedikit.** Bagi pengguna yang mempertahankan tingkat toleransi risiko rollback yang sama seperti saat ini, ZIP memperkirakan waktu konfirmasi akan meningkat sedikit kurang dari tiga kali lipat.
- **Ini bukan pengganti dari pekerjaan finalitas.** ZIP mendeskripsikan dirinya sebagai pelengkap bagi mekanisme finalitas seperti Crosslink. Blok layer-dasar yang lebih cepat akan membantu, terlepas dari apakah layer finalitas ditambahkan di kemudian hari atau tidak.

ZIP juga mencatat bahwa throughput yang lebih tinggi sendiri dapat dicapai dengan ukuran blok yang lebih besar. Latensi adalah alasan pemilihan blok yang lebih pendek sebagai gantinya.

## Apa yang berubah

### Penerbitan: ZEC yang sama per hari

Melipatgandakan jumlah blok akan melipatgandakan penerbitan harian jika tidak ada hal lain yang berubah. ZIP 218 mencegah hal tersebut dengan membagi subsidi per-blok dengan faktor tiga lebih lanjut setelah NU7 aktif.

Dalam era halving saat ini, hal tersebut mengurangi subsidi blok dari **1.5625 ZEC menjadi 0.52083333 ZEC** (52.083.333 zatoshi). Karena 156.250.000 zatoshi tidak dapat dibagi habis dengan tiga, setiap blok dibulatkan ke bawah sebesar sepertiga zatoshi. Di seluruh interval halving penuh sebanyak 5.040.000 blok, jumlah totalnya adalah sekitar 0,0168 ZEC.

Subsidi adalah total ZEC baru yang dibuat per blok. Bagian pendanaan pengembangan yang ada saat ini masih diambil darinya, sehingga penambang menerima lebih sedikit dari angka penuh tersebut, persis seperti saat ini.

> **Catatan mengenai angka 0.26041666 ZEC.** Catatan penjelasan pada draf ZIP mencantumkan subsidi pasca-NU7 sebagai floor(156250000 / 6) = 0.26041666 ZEC, dan beberapa liputan berita telah mengulanginya. Catatan tersebut salah dengan faktor dua kali lipat: 156.250.000 zatoshi sudah merupakan subsidi pasca-Blossom, sehingga membaginya dengan enam menerapkan faktor dua Blossom untuk kedua kalinya di atas faktor tiga NU7. Formula normatif memberikan floor(1.250.000.000 / (2 · 3 · 4)) = 52.083.333 zatoshi pada indeks halving saat ini. Masalah implementasi Zebra untuk perubahan ini ([#11463](https://github.com/ZcashFoundation/zebra/issues/11463)) mencatat bahwa catatan tersebut menghitung ganda faktor Blossom, menginstruksikan para pengimplementasi untuk "mengimplementasikan formula, bukan catatan," dan menyatakan bahwa koreksi telah diajukan terhadap ZIP. Angka yang benar saat aktivasi adalah **0.52083333 ZEC**.

### Halving tetap pada jadwalnya

Interval halving meningkat tiga kali lipat dari 1.680.000 blok menjadi 5.040.000 blok. Karena blok muncul tiga kali lebih sering, halving tetap terjadi pada titik waktu yang kira-kira sama dengan jika tidak ada perubahan. Batas total pasokan tidak terpengaruh.

Ini terpisah dari pertanyaan penerbitan lainnya dalam jajak pendapat NU7, di mana pemegang koin memberikan suara untuk mempertahankan halving daripada menggantinya dengan kurva yang diperhalus (smoothed curve). ZIP 218 bekerja dengan model halving yang ada dan tidak mengubahnya.

### Batasan baru pada tindakan terlindungi per blok

ZIP 218 menambahkan batasan pada seberapa banyak aktivitas terlindungi yang dapat ditampung oleh satu blok:

| Batas | Maksimum per blok |
|---|---|
| Gabungan semua pool terlindungi | 330 (setiap Sprout JoinSplit dihitung sebagai 2) |
| Tindakan Orchard | 330 |
| Input ditambah output Sapling | 300 |
| Sprout JoinSplits | 25 |

Bagian transparan dari transaksi tidak terpengaruh, dan batas ukuran blok 2 MB masih berlaku.

Batasan tersebut ada karena jika tidak, lebih banyak blok akan berarti lebih banyak pekerjaan bagi dompet dan node. Dengan adanya batasan ini, skenario terburuk sebenarnya menjadi **lebih baik** daripada saat ini, bahkan dengan jumlah blok tiga kali lipat lebih banyak:

- **Sinkronisasi dompet:** jumlah data terbanyak yang mungkin terpaksa diunduh oleh sebuah light wallet dalam sehari turun dari sekitar 271 MB menjadi sekitar 169 MB, sebuah pengurangan sekitar 38%. Dekripsi uji coba pada skenario terburuk turun dari sekitar 4,8 juta menjadi sekitar 2,3 juta per hari.
- **Verifikasi blok:** benchmark ZIP menempatkan blok Orchard pada skenario terburuk di sekitar 432 ms di bawah batasan baru, dibandingkan dengan sekitar 770 ms untuk skenario terburuk saat ini. Untuk Sapling penurunannya lebih besar, dari sekitar 3.175 ms menjadi sekitar 272 ms.

Batas Sapling dan Sprout sengaja dibuat ketat. Per Mei 2026, Orchard memegang 87,9% dari ZEC terlindungi, Sapling 11,6% dan Sprout 0,5%, sehingga pool yang lebih kecil mendapatkan ruang yang cukup untuk penggunaan aslinya sekaligus memberikan lebih sedikit celah bagi penyerang untuk menyalahgunakan. Karena 317 biaya ZIP mengenakan tarif yang sama per tindakan logis di setiap pool, seorang penyerang tidak akan mendapatkan keuntungan apa pun dengan melakukan spam pada satu pool alih-alih pool lainnya.

### Throughput

Dengan 330 tindakan Orchard per blok, satu transaksi Orchard standar dengan 2 tindakan dapat masuk sebanyak ⌊330 / 2⌋ = 165 kali per blok. Dengan satu blok setiap 25 detik, itu sekitar **6,6 transaksi per detik**, naik dari sekitar 2,9 saat ini — ZIP menyebutnya sebagai peningkatan 2,3× dalam throughput Orchard normal. Sapling mencapai sekitar 3,0 per detik, masih di atas apa yang dikelola Orchard saat ini.

### Penyesuaian tingkat kesulitan

Algoritma kesulitan melakukan rata-rata pada jendela blok terbaru. ZIP 218 meningkatkan jendela tersebut dari 17 blok menjadi 102, sehingga masih mencakup sekitar 2.550 detik waktu nyata, rentang yang sama dengan yang dicakup saat Zcash diluncurkan dengan blok berdurasi 150 detik. ZIP memberikan dua alasan: untuk menghindari mempermudah serangan manipulasi kesulitan (ia mengutip insiden MWEB Litecoin pada April 2026), dan untuk memperhalus variasi jangka pendek dalam waktu blok.

Segera setelah aktivasi, waktu blok akan membutuhkan waktu sejenak untuk stabil pada target baru. Hal ini sudah diperkirakan dan mencerminkan apa yang terjadi pada Blossom, ketika Zcash berubah dari 150 menjadi 75 detik.

### Pengaturan default untuk node dan dompet

Ini adalah rekomendasi untuk implementasi, bukan aturan konsensus:

- **Kedaluwarsa transaksi:** kedaluwarsa default meningkat dari 40 menjadi 120 blok, dengan durasi yang tetap sekitar 50 menit.
- **Kedalaman reorg maksimum:** batas Zebra meningkat dari 99 menjadi 600 blok, sekitar 4,2 jam pada interval 25 detik, jendela waktu yang sama dengan yang dicakup saat peluncuran.
- **Kedalaman anchor untuk transaksi terlindungi:** tetap pada 3 blok, sehingga penundaan berkurang dari 3,75 menit menjadi 1,25 menit. ZIP mengikuti preseden Blossom di sini.
- **Beberapa konstanta jaringan** yang diukur dalam blok ditingkatkan skalanya sebanyak tiga kali agar mencakup jumlah waktu yang sama.

## Apa yang tetap sama

- ZEC yang diterbitkan per hari, jadwal halving dan batas pasokan
- Batas ukuran blok 2 MB
- Transaksi transparan, yang tidak terpengaruh oleh batasan aksi baru
- Kematangan Coinbase pada 100 blok. Perhatikan bahwa ini sekarang berarti sekitar 42 menit, bukan sekitar 125, karena penghitungannya dalam blok, bukan waktu.

## Trade-off: lebih banyak block stale

Blok yang lebih cepat tidaklah gratis. Blok stale adalah blok valid yang kalah dalam persaingan untuk disertakan ke dalam chain karena blok lain mencapai jaringan lebih dulu. Semakin pendek celah antar blok, semakin sering hal ini terjadi, dan ZIP menghubungkan tingkat stale dengan propagasi blok, waktu verifikasi, serta risiko sentralisasi penambangan.

- **Saat ini:** sekitar 0,4%, di mana ZIP mencatat bahwa angka ini mungkin merendahkan tingkat yang sebenarnya karena hashpower terkonsentrasi di dalam pool.
- **Teoretis pada 25 detik:** sekitar 3,26%, berdasarkan pengukuran delay propagasi Zcash.
- **Uji devnet:** 99 node Zebra yang tersebar secara geografis menghasilkan blok penuh sebesar 2 MB dengan interval 25 detik mencatat tingkat stale sebesar 4,86% dan tingkat fork sebesar 0,37%. Satu-satunya penyetelan yang diperlukan hanyalah konfigurasi TCP. Karena devnet tersebut lebih terdesentralisasi daripada mainnet saat ini, ZIP menganggap angka-angka ini mendekati skenario terburuk.
- **Titik referensi:** ZIP menggunakan tingkat stale proof-of-work historis Ethereum sebesar 5,4% sebagai ambang batas keamanannya. Kedua angka devnet berada di bawah ambang tersebut.

Terdapat dua biaya tambahan yang lebih kecil. Dompet light client mengunduh sekitar 200 KB lebih banyak per hari berupa header blok ringkas. Dan karena jumlah blok tiga kali lipat lebih banyak, sebuah full node yang sempat offline memiliki lebih banyak blok untuk diproses saat melakukan sinkronisasi kembali, meskipun setiap blok lebih murah untuk diverifikasi. ZIP menerima keduanya.

## Status dan lini masa

- **Status ZIP:** Draft. Pemilik Dev Ojha dan Evan Forbes; dibuat pada 13 Maret 2026.
- **Polling pemegang koin:** ditutup pada 14 September 2026, dengan dukungan 99,9%. Polling ini menandakan preferensi; polling tersebut tidak mengubah aturan konsensus dengan sendirinya.
- **Lini masa:** dalam pengumuman Forum Komunitas Zcash pada 17 September, organisasi pengembangan menyepakati jadwal penyelesaian kode paling lambat 30 September, NU7 pada testnet pada 6 Oktober, keputusan akhir dan tinggi aktivasi mainnet pada 20 Oktober, dan target aktivasi mainnet sekitar 5 November 2026. 5 November adalah sebuah target, bukan tanggal tetap, sampai tinggi tersebut ditetapkan.
- **Implementasi:** dilacak dalam Zebra ([#11440](https://github.com/ZcashFoundation/zebra/issues/11440)) dan dalam Zakura ([PR #1066](https://github.com/zakura-core/zakura/pull/1066)).

## Apa artinya ini bagi Anda

- **Menyimpan ZEC:** tidak ada yang perlu dilakukan. Saldo dan jadwal pasokan Anda tidak terpengaruh.
- **Menggunakan dompet:** diperbarui saat dompet Anda mendukung NU7. Konfirmasi pertama akan tiba sekitar tiga kali lebih cepat.
- **Menjalankan node, exchange, atau layanan:** rencanakan untuk melakukan upgrade sebelum aktivasi, dan tinjau pengaturan apa pun yang diukur dalam blok, karena jumlah blok tetap kini mencakup sepertiga dari waktu yang biasanya digunakan.

## Sumber

- [ZIP 218: Target Spacing Blok 25 detik](https://zips.z.cash/zip-0218)
- [ZIP 208: Target Spacing Blok yang Lebih Pendek](https://zips.z.cash/zip-0208), preseden Blossom
- [Forum: Proposal — Menurunkan Target Spacing Blok Zcash menjadi 25s](https://forum.zcashcommunity.com/t/proposal-lower-zcash-block-target-spacing-to-25s/54577)
- [Forum: Pengurangan Waktu Blok Zcash Tampaknya Aman untuk NU7 dengan Devnet khusus Zebra](https://forum.zcashcommunity.com/t/zcash-block-time-reduction-appears-safe-for-nu7-w-zebra-only-devnet/55586)
- [Zebra issue #11463](https://github.com/ZcashFoundation/zebra/issues/11463), interval halving dan subsidi pasca-NU7
- [Zebra issue #11440](https://github.com/ZcashFoundation/zebra/issues/11440), pelacakan implementasi ZIP 218
- NU7 hasil jajak pendapat dan lini masa, sebagaimana dilaporkan oleh Bitcoin.com News, crypto.news dan KuCoin (16–19 September 2026)