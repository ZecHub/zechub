<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Network_Sustainability_Mechanism.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Mekanisme Keberlanjutan Jaringan (NSM)

> NSM telah menjadi bagian dari konsensus Zcash sejak [NU7](./NU7.md) diaktifkan pada blok Mainnet 3,543,405 pada 6 November 2026. Biaya mulai disisihkan sekarang; penerbitan kembali kepada penambang dimulai pada blok 8,939,664 (diperkirakan sekitar Februari 2031).

Yang akan Anda pelajari: fungsi Mekanisme Keberlanjutan Jaringan, jumlah biaya dari setiap blok yang dikeluarkan, ke mana ZEC itu pergi, kapan dan seberapa cepat nilainya kembali sebagai hadiah blok, serta alasan batas 21 juta dan jadwal halving tidak berubah.

Mekanisme Keberlanjutan Jaringan (NSM) adalah seperangkat aturan konsensus yang mengeluarkan sebagian ZEC dari peredaran dan membayarkannya kembali kepada penambang di kemudian hari, selama bertahun-tahun. NU7 menerapkan dua bagiannya: [ZIP 235](https://zips.z.cash/zip-0235), yang mengeluarkan 60% biaya transaksi dari setiap blok dari peredaran, dan [ZIP 237](https://zips.z.cash/zip-0237), yang menerbitkan kembali ZEC yang dikeluarkan itu sebagai tambahan atas subsidi blok normal dengan kurva yang mulus. Keduanya diaktifkan melalui [ZIP 259](https://zips.z.cash/zip-0259).

Mengapa ini penting. Zcash membayar keamanan jaringannya dengan ZEC baru di setiap blok, dan subsidi tersebut dibagi dua kira-kira setiap empat tahun. Ketika jumlahnya kecil, penambang harus mengandalkan biaya. NSM adalah langkah awal menuju masa depan itu: sebagian biaya saat ini disimpan dan dibayarkan kepada penambang di masa depan, tanpa menaikkan batas pasokan dan tanpa mengubah jadwal halving yang sudah diandalkan orang.

## Ringkasan

- **Pengeluaran ([ZIP 235](https://zips.z.cash/zip-0235)):** di setiap blok, 60% dari total biaya transaksi (dibulatkan ke bawah demi keuntungan penambang) keluar dari peredaran. Penambang mempertahankan 40% sisanya.
- **Saldo Nilai NSM:** jumlah akumulatif publik dari ZEC yang dikeluarkan dari peredaran dan belum diterbitkan kembali. Ini adalah status konsensus, bukan pool yang dapat digunakan siapa pun.
- **Saldo awal:** pada NU7, saldo dimulai dari **368.58445520 ZEC**, yakni hadiah blok dan biaya yang tidak diklaim penambang awal sebelum NU6.
- **Penerbitan kembali ([ZIP 237](https://zips.z.cash/zip-0237)):** mulai blok **8,939,664**, setiap blok menambahkan bagian tetap (0.00001375%) dari saldo ke subsidi blok. Dengan demikian, sekitar separuh saldo dibayarkan dalam setiap periode halving empat tahunan.
- **Yang tetap sama:** jadwal halving dan batas 21 juta ZEC sebagai batas atas. Jika saldo pernah mencapai nol, penerbitan kembali mengikuti jadwal lama secara persis.

## Analogi visual

Bayangkan sebuah stoples tabungan di samping mesin kasir. Setiap kali sebuah blok ditambang, 60% tip (biaya) masuk ke stoples, bukan ke kantong penambang. Tidak ada yang dapat mengambil uang dari stoples dengan tangan. Mulai 2031, sebagian kecil yang tetap dari isi stoples ditambahkan ke setiap hadiah blok, sehingga stoples terkuras perlahan: sekitar separuh isinya setiap empat tahun, mengikuti irama halving.

## Cara kerja pengeluaran (ZIP 235)

- Aturan ini berlaku per blok, bukan per transaksi. Untuk blok dengan total biaya `F` (dalam zatoshi), jumlah yang dikeluarkan adalah `floor(6 × F / 10)` dan penambang dapat mengklaim `F` dikurangi jumlah tersebut.
- Pembulatan dilakukan sekali untuk seluruh blok dan selalu menguntungkan penambang. Jika pembulatan dilakukan per transaksi, jumlah yang dikeluarkan secara keseluruhan akan kurang dari 60% (dua biaya masing-masing 1 zatoshi akan menyumbang 0).
- Contoh: blok yang transaksinya membayar biaya sebesar 50,000 zatoshi (0.0005 ZEC) mengeluarkan 30,000 zatoshi dan membayar penambang 20,000. Blok dengan biaya 15 zatoshi mengeluarkan 9 dan membayar penambang 6.
- Tidak diperlukan kolom transaksi. Setiap node menghitung jumlah tersebut dari biaya yang sudah divalidasinya, dan [ZIP 236](https://zips.z.cash/zip-0236) membuat transaksi coinbase mengklaim tepat jumlah yang menjadi hak penambang, sehingga penambang tidak dapat mengeluarkan lebih sedikit atau mengklaim lebih banyak.
- Skala: perkiraan ZIP 235, berdasarkan aktivitas sebelum NU7, menunjukkan sekitar 370 ZEC biaya per tahun, sehingga sekitar 222 ZEC dikeluarkan setiap tahun. Saat ini biaya masih kecil dibandingkan subsidi blok, sehingga para penulis memperkirakan dampaknya terhadap penambang akan kecil.

## Cara kerja penerbitan kembali (ZIP 237)

- **Saldo.** `NSMValueBalance` dimulai dari 368.58445520 ZEC (36,858,445,520 zatoshi) saat aktivasi NU7. Setiap blok menambahkan jumlah yang dikeluarkan oleh ZIP 235 dan mengurangi jumlah yang diterbitkan kembali. Blok yang akan membuat saldo negatif tidak valid.
- **Asal saldo awal.** Sebelum NU6, transaksi coinbase dapat mengklaim kurang dari seluruh hadiah blok dan biayanya. Selama 2,726,400 blok pertama dalam riwayat chain, penambang membiarkan 368.58445520 ZEC tidak diklaim: subsidi terjadwal hingga ketinggian blok tersebut adalah 15,750,000 ZEC, sedangkan pasokan yang diterbitkan adalah 15,749,631.41554480 ZEC. ZIP 237 memasukkan nilai itu ke NSM agar dibayarkan, alih-alih hilang.
- **Penerbitan kembali belum dimulai hingga blok 8,939,664.** Antara NU7 dan ketinggian tersebut, saldo hanya bertambah.
- **Rumus.** Mulai blok 8,939,664, subsidi setiap blok mendapat tambahan `ceiling(0.0000001375 × NSMValueBalance)`, yang dihitung dari saldo setelah blok sebelumnya. Fraksinya adalah `floor(LN2_SCALED / HalvingInterval) / 10^10` = 1375 / 10,000,000,000, dengan interval halving pasca-NU7 sebesar 5,040,000 blok.
- **Alasan fraksi tersebut.** `(1 − 0.0000001375)^5,040,000 ≈ 0.5`, sehingga jika tidak ada nilai baru yang dikeluarkan, sekitar separuh saldo diterbitkan kembali dalam setiap periode halving. Ini adalah peluruhan eksponensial yang hanya diterapkan pada saldo NSM, di atas tahapan halving yang tidak berubah.
- **Contoh perhitungan.** Jika saldo masih hanya berupa saldo awal 368.58 ZEC pada blok 8,939,664, blok pertama akan menerbitkan kembali 5,069 zatoshi (sekitar 0.00005 ZEC), atau kira-kira 0.175 ZEC per hari dengan 3,456 blok per hari. Angka sebenarnya akan lebih tinggi, bergantung pada biaya yang dikeluarkan hingga saat itu.
- **Alasan memilih blok 8,939,664.** ZIP 237 memilihnya berdasarkan aturan tetap, terlepas dari jumlah yang benar-benar dikeluarkan: blok pertama setelah halving ketiga (blok 6,132,390, diperkirakan sekitar November 2028) ketika fraksi NSM yang diterapkan pada seluruh ZEC yang belum dijadwalkan untuk diterbitkan akan menghasilkan jumlah yang lebih kecil daripada subsidi blok normal (0.26041666 ZEC pada periode tersebut). Jajak pendapat pemegang koin dan komunitas NU7 tidak menghasilkan mayoritas bersama mengenai waktu dimulainya penerbitan kembali, sehingga ZIP 259 menggunakan titik peralihan ini.

## Hal yang tidak berubah

- **Jadwal halving.** ZIP 237 mempertahankan tahapan halving empat tahunan. Alternatif yang ditolak, [ZIP 234](https://zips.z.cash/zip-0234), akan menggantinya dengan kurva penerbitan yang mulus; jajak pendapat pada Agustus dan September 2026 NU7 menanyakan apakah halving perlu dipertahankan atau penerbitan dibuat lebih mulus, dan NU7 merilis desain yang mempertahankan halving.
- **Batas pasokan.** Pasokan yang Diterbitkan ditambah Saldo Nilai NSM bertambah tepat sebesar subsidi blok terjadwal di setiap blok, sehingga penerbitan tidak pernah dapat melampaui batas. Bahkan, batasnya sedikit berkurang: pembulatan subsidi pasca-NU7 dalam ZIP 218 menurunkan total penerbitan sekitar 0.50 ZEC, dan NSM tidak menerbitkan kembali kekurangan itu.
- **Pengeluaran sukarela.** [ZIP 233](https://zips.z.cash/zip-0233), yang memungkinkan siapa pun mengirim ZEC ke NSM melalui kolom transaksi eksplisit, tidak diterapkan dalam NU7. Saat ini, biaya adalah satu-satunya sumber pengeluaran. ZIP 237 memungkinkan ZIP berikutnya menambahkan sumber lain.
- **Privasi.** Saldo dan subsidi tambahan dihitung dari nilai yang sudah publik, sehingga NSM tidak mengungkap informasi baru tentang transaksi.

## Kesalahan umum

- **“60% biaya dibakar.”** Tidak secara permanen. Tidak seperti pembakaran (EIP-1559 Ethereum adalah pembanding yang umum), ZEC yang dikeluarkan dicatat dan diterbitkan kembali kepada penambang di masa depan.
- **“NSM mencetak ZEC tambahan.”** Tidak. NSM hanya menerbitkan kembali nilai yang dikeluarkan atau tidak pernah diklaim; total penerbitan tetap di bawah batas yang ada.
- **“Penerbitan kembali sudah dimulai.”** Belum. Hingga blok 8,939,664, saldo hanya terakumulasi.
- **“NSM adalah dana yang dikendalikan seseorang.”** Tidak. NSM adalah angka dalam status konsensus, dan nilainya hanya keluar melalui rumus subsidi blok.
- **“Halving sudah dihapus.”** Tidak. Itu adalah desain ZIP 234, yang tidak diterapkan oleh NU7.

## Glosarium

| Istilah | Makna sederhana |
|---|---|
| Mekanisme Keberlanjutan Jaringan (NSM) | Aturan konsensus yang mengeluarkan ZEC dari peredaran dan menerbitkannya kembali kepada penambang di kemudian hari |
| Saldo Nilai NSM | Jumlah akumulatif publik dari ZEC yang dikeluarkan dari peredaran (atau tidak pernah diklaim) dan belum diterbitkan kembali |
| Pengeluaran dari peredaran | Mengeluarkan ZEC dari pasokan yang diterbitkan dan memasukkannya ke Saldo Nilai NSM; sejak NU7, jumlahnya adalah 60% dari biaya setiap blok |
| Penerbitan kembali | Membayar ZEC dari Saldo Nilai NSM sebagai subsidi blok tambahan, mulai blok 8,939,664 |
| Pasokan yang Diterbitkan | Semua ZEC dalam pool nilai chain; tidak mencakup Saldo Nilai NSM |
| Subsidi blok | ZEC baru yang dibuat di setiap blok, dibagi antara penambang dan aliran dana pengembangan |
| Interval halving | Jumlah blok di antara halving: 5,040,000 sejak NU7 (sekitar empat tahun dengan blok 25 detik) |

## FAQ

**Berapa jumlah dalam NSM saat ini?** Saldo awal 368.58445520 ZEC ditambah 60% biaya setiap blok sejak blok 3,543,405. Nilai ini adalah status konsensus yang dilacak setiap full node.

**Siapa yang menerima ZEC yang diterbitkan kembali?** Nilainya ditambahkan ke subsidi blok, sehingga dibagi dengan cara yang sama: aliran dana pengembangan menerima persentase tetap dari total subsidi (terjadwal ditambah yang diterbitkan kembali), dan penambang menerima sisanya.

**Kapan penerbitan kembali dimulai?** Pada blok 8,939,664 di Mainnet, diperkirakan sekitar Februari 2031 jika rata-rata durasi blok tetap 25 detik. Di Testnet, ketinggian blok mengikuti aturan yang sama, dihitung dari ketinggian aktivasi NU7 di Testnet.

**Apakah biaya akan naik karena NSM?** Tidak. NSM mengubah tujuan biaya, bukan jumlah yang dibayar untuk suatu transaksi.

**Dapatkah pembagian 60/40 berubah?** Hanya melalui ZIP dan peningkatan jaringan di masa mendatang. ZIP 235 menyatakan bahwa pembagian ini dapat ditinjau kembali jika biaya meningkat, misalnya ketika biaya melampaui subsidi blok.

## Uji pemahaman Anda

1. Transaksi dalam suatu blok membayar biaya sebesar 100,000 zatoshi. Berapa yang dipertahankan penambang?
2. Dari mana asal saldo awal NSM?
3. Jika tidak ada nilai baru yang dikeluarkan, kira-kira berapa bagian saldo NSM yang diterbitkan kembali dalam setiap periode halving?
4. Mengapa penerbitan kembali tidak mendorong total penerbitan melampaui 21 juta ZEC?

Jawaban: (1) 40,000 zatoshi; 60,000 dikeluarkan; (2) hadiah blok dan biaya yang tidak diklaim oleh transaksi coinbase sebelum NU6, sebesar 368.58445520 ZEC; (3) sekitar separuh; (4) penerbitan kembali hanya membayarkan nilai yang dikeluarkan atau tidak pernah diklaim, sehingga pasokan yang diterbitkan ditambah saldo NSM bertambah tepat sebesar subsidi terjadwal di setiap blok.

### Sumber

[ZIP 235: Mengeluarkan 60% Biaya Transaksi dari Peredaran](https://zips.z.cash/zip-0235)

[ZIP 237: Mekanisme Keberlanjutan Jaringan: Penerbitan yang Mempertahankan Halving](https://zips.z.cash/zip-0237)

[ZIP 259: Penerapan Peningkatan Jaringan NU7](https://zips.z.cash/zip-0259)

[ZIP 234: Mekanisme Keberlanjutan Jaringan: Penghalusan Penerbitan (tidak diterapkan)](https://zips.z.cash/zip-0234)

[ZIP 233: Mekanisme Keberlanjutan Jaringan: Mengeluarkan Dana dari Peredaran (tidak diterapkan)](https://zips.z.cash/zip-0233)

[ZIP 236: Blok harus diseimbangkan secara tepat](https://zips.z.cash/zip-0236)

## Halaman terkait

| Halaman | Alasan keterkaitan |
|---|---|
| [NU7](./NU7.md) | peningkatan jaringan yang mengaktifkan NSM |
| [Zcash Kebijakan Moneter](../start-here/zcash-monetary-policy) | jadwal halving dan batas pasokan yang dipertahankan NSM |
| [Perubahan Sebenarnya dari Blok 25 Detik](../research/what-25-second-blocks-actually-change) | alasan subsidi dan interval halving berubah pada NU7 |
| [Dana Pengembangan](../start-here/development-fund) | cara subsidi blok dibagi |
| [Transaksi](../using-zcash/transactions) | cara biaya transaksi ditetapkan |

---
