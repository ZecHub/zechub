<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Zcash_Monetary_Policy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Kebijakan Moneter Zcash

## Ringkasan

* Zcash memiliki pasokan tetap sebanyak 21 juta ZEC, dengan batas yang sama seperti Bitcoin.
* Sejak NU7 diaktifkan pada 6 November 2026, blok baru muncul sekitar setiap 25 detik dan menghasilkan 0.52083333 ZEC.
* Jumlahnya sekitar 1.800 ZEC baru per hari, sama seperti jumlah harian sebelum NU7.
* Imbalan blok dibagi: 80% untuk penambang, 8% untuk Zcash Community Grants, dan 12% untuk lockbox.
* Imbalan blok dibagi dua sekitar setiap empat tahun. Halving berikutnya diperkirakan terjadi sekitar akhir November 2028.

## Penjelasan Inti

### Bagaimana ekonomi Zcash?

Basis moneter Zcash sama dengan pasokan tetap Bitcoin, yaitu 21 juta unit mata uang ZEC. Rata-rata setiap 25 detik (75 detik sebelum NU7 diaktifkan pada 6 November 2026), sebuah [block](https://zcash.readthedocs.io/en/latest/rtd_pages/glossary.html#:~:text=Block,mempool%20in%20an%20unconfirmed%20state.) baru ditambang ke blockchain Zcash dan imbalan blok sebesar 0.52083333 ZEC mulai beredar. Sebelum NU7, imbalannya adalah 1.5625 ZEC per blok; [ZIP 218](https://zips.z.cash/zip-0218) membaginya menjadi sepertiga sekaligus memangkas waktu blok menjadi sepertiga, sehingga jumlah ZEC baru per hari tidak berubah. Sejak NU7, 0.52083333 ZEC dibagi menjadi 80% untuk penambang (0.41666668 ZEC, ditambah biaya transaksi), 8% untuk Zcash Community Grants (0.04166666 ZEC), dan 12% untuk lockbox (0.06249999 ZEC), sesuai [ZIP 1015](https://zips.z.cash/zip-1015).

Jumlah imbalan blok dipotong setengah sekitar setiap empat tahun sampai seluruh 21 juta ZEC beredar. Inflasi Zcash hampir persis meniru inflasi Bitcoin. Perlu diingat bahwa ketika koin baru dibuat, inflasi menurun, dan setiap halving menurunkan lajunya secara signifikan.

## Visual / Analogi

Bayangkan sebuah dispenser koin di depan brankas tertutup. Brankas itu menyimpan total 21 juta ZEC, dan tak seorang pun dapat menambahkan satu koin pun ke dalamnya.

Setiap 25 detik, dispenser mengeluarkan segenggam kecil koin baru, sebanyak 0.52083333 ZEC. Penambang yang menemukan blok mengambil 80% dari segenggam itu. Zcash Community Grants mendapat 8%. Sisa 12% masuk ke lockbox.

Sekitar setiap empat tahun, ukuran segenggam itu menjadi setengahnya. Itulah halving.

NU7 membuat segenggam koin keluar tiga kali lebih sering dan membuat setiap genggam berukuran tiga kali lebih kecil. Jumlah koin baru per hari tetap sama.

## Penjelasan Mendalam

### ZEC baru per hari, dari era ke era

Halving mengurangi imbalan per blok. Blok yang lebih cepat (Blossom pada 2019, NU7 pada 2026) juga mengurangi imbalan per blok seiring pemangkasan waktu blok, sehingga jumlah harian tetap sama.

| Periode | Waktu blok | Imbalan per blok | ZEC baru per hari |
|:--|:--|:--|:--|
| Era peluncuran, 2016 sampai 2019 | 150 detik | 12.5 ZEC | 7.200 |
| [Blossom](/zcash-tech/blossom), Des 2019 sampai Nov 2020 | 75 detik | 6.25 ZEC | 7.200 |
| Halving pertama ([Canopy](/zcash-tech/canopy)), Nov 2020 sampai Nov 2024 | 75 detik | 3.125 ZEC | 3.600 |
| Halving kedua ([NU6](/zcash-tech/nu6)), Nov 2024 sampai Nov 2026 | 75 detik | 1.5625 ZEC | 1.800 |
| [NU7](/zcash-tech/nu7), Nov 2026 sampai akhir 2028 | 25 detik | 0.52083333 ZEC | 1.800 |
| Halving ketiga, diperkirakan akhir Nov 2028 | 25 detik | setengah dari imbalan saat ini | sekitar 900 |

Setiap angka harian adalah imbalan per blok dikalikan jumlah blok dalam sehari (86.400 detik dibagi waktu blok). Waktu blok sebenarnya sedikit bervariasi, jadi penerbitan harian aktual sedikit berfluktuasi di sekitar angka-angka ini.

### Kapan halving berikutnya terjadi

NU7 membuat blok muncul tiga kali lebih sering, sehingga nomor blok untuk halving berikutnya berubah. Halving berikutnya dijadwalkan pada blok 6,132,390, diproyeksikan terjadi sekitar akhir November 2028 ([ZIP 259](https://zips.z.cash/zip-0259)). Artikel lama menyebut blok 4,406,400. Angka itu benar sebelum NU7.

### Biaya dan Mekanisme Keberlanjutan Jaringan

Sejak NU7, 60% biaya transaksi di setiap blok dihapus dari peredaran dan disimpan dalam cadangan publik. Mulai blok 8,939,664, yang diproyeksikan terjadi sekitar Februari 2031, setiap blok membayarkan bagian tetap dari cadangan itu kepada penambang di luar imbalan blok normal. Batas 21 juta tidak berubah. Halaman [Mekanisme Keberlanjutan Jaringan](/zcash-tech/network-sustainability-mechanism) menjelaskan cara kerjanya.

## Halaman Terkait

- [NU7](/zcash-tech/nu7): peningkatan yang menghadirkan blok berdurasi 25 detik dan imbalan blok saat ini.
- [Mekanisme Keberlanjutan Jaringan](/zcash-tech/network-sustainability-mechanism): ke mana 60% biaya setiap blok dialokasikan dan kapan biaya itu kembali.
- [Dana Pengembangan](/start-here/development-fund): sejarah bagian imbalan blok yang dialokasikan untuk pengembangan.
- [Peningkatan Jaringan](/start-here/network-upgrades): setiap peningkatan Zcash, lengkap dengan tanggal dan tinggi blok.
- [Zcash Community Grants](/zcash-organizations/zcash-community-grants): organisasi yang menerima bagian sebesar 8%.
- [Pool Penambangan Zcash](/using-zcash/zcash-mining-pools): tempat sebagian besar penambang memperoleh bagian imbalan blok.

### Sumber

Bagaimana ekonomi dari Zcash? [](https://z.cash/support/faq/#:~:text=Zcash's%20monetary%20base%20is%20the,3.125%20ZEC%20comes%20into%20circulation.)

[ZIP 218: Target Jarak Blok 25 Detik](https://zips.z.cash/zip-0218)

[ZIP 259: Penerapan Peningkatan Jaringan NU7](https://zips.z.cash/zip-0259)

[ZIP 1015](https://zips.z.cash/zip-1015)

**Terakhir diperbarui:** November 2026
