# ETF Grayscale Zcash (ZCSH)

**Zcash tidak meluncurkan ETF. Grayscale yang melakukannya**, dengan mengonversi dana yang
telah dikelolanya sejak 2017. Zcash adalah sebuah protokol — tidak memiliki perusahaan, treasury, atau dewan
yang dapat menerbitkan dana. Grayscale adalah manajer aset independen yang membeli
ZEC di pasar terbuka seperti siapa pun lainnya.

Perbedaan tersebut adalah hal tunggal yang paling sering disalahpahami tentang ZCSH, dan di sinilah
halaman ini dimulai. Pada 25 Agustus 2026, dana tersebut mulai diperdagangkan di NYSE Arca sebagai
*ETF Zcash*, produk yang diperdagangkan di exchange spot Zcash pertama di AS, dan kini
menjadi salah satu pemegang tunggal terbesar ZEC yang ada.

![How the Grayscale Zcash ETF works: investors buy ZCSH shares through a brokerage and receive price exposure only, while the trust holds the ZEC at Coinbase Custody in transparent wallets; Authorized Participants create and redeem shares in baskets of 10,000 for cash, and the Sponsor's Fee is paid out of the trust's ZEC, so ZEC per share declines over time](https://raw.githubusercontent.com/ZecHub/zechub/main/assets/ZCSH_ETP_Structure.png)

## Dana yang sama, tiga tahap

| Kapan | Yang berubah |
| --- | --- |
| Oktober 2017 | Diluncurkan sebagai penempatan privat, hanya untuk investor terakreditasi |
| Oktober 2021 | Saham dikutip di OTCQX dengan ticker ZCSH, diperdagangkan dengan diskon terhadap NAV |
| 25 Agustus 2026 | Menjadi ETP yang dapat ditebus di NYSE Arca dan menghapus "Trust" dari namanya |

Tahap 2026 bukan sekadar kosmetik. Trust yang dikutip di OTC tidak memiliki mekanisme
penebusan, sehingga sahamnya dapat bergerak ke premium atau diskon terhadap nilai
aset yang mendasarinya, terkadang secara signifikan — yang persis terjadi
antara 2021 dan 2026. Produk yang diperdagangkan di exchange dengan
penciptaan dan penebusan yang berfungsi memiliki jalur arbitrase yang menjaga harga saham
tetap terikat pada nilai aset bersih. Perubahan dari satu bentuk ke bentuk lainnya mengubah cara
instrumen tersebut berperilaku sebagai efek.

## Siapa melakukan apa

| Peran | Pihak |
| --- | --- |
| Sponsor | Grayscale Investments Sponsors, LLC |
| Wali amanat | CSC Delaware Trust Company |
| Administrator dan agen transfer | Bank of New York Mellon |
| Prime broker | Coinbase, Inc. — memperoleh ZEC untuk trust |
| Peserta berwenang | Jane Street, Virtu — menciptakan dan menebus saham |
| Agen pemasaran | Foreside Fund Services |
| **Kustodian** | **Coinbase Custody Trust Company, LLC** — satu-satunya tempat ZEC sebenarnya berada |

Tidak satu pun dari pihak-pihak ini merupakan dana tersebut. Strukturnya adalah pengaturan
di antara mereka, sebagaimana dijelaskan oleh diagram di atas. Beberapa peran ini
hilang atau keliru dalam liputan berita pada saat pencatatan; daftar di sini
mengikuti pernyataan pendaftaran Form S-3 Grayscale di EDGAR.

## Cara saham diciptakan dan ditebus

Hanya Peserta Berwenang — broker-dealer terdaftar berdasarkan perjanjian dengan
Sponsor — yang dapat menciptakan atau menebus saham, dan hanya dalam blok 10.000,
yang disebut Keranjang. Investor biasa tidak pernah menyentuh mekanisme ini; mereka membeli
dan menjual saham yang sudah ada di exchange seperti efek terdaftar lainnya.

Mekanisme saat ini adalah **tunai**, bukan in-kind. Peserta Berwenang
menyetorkan uang tunai ke, atau menerima uang tunai dari, akun tunai, dan penyedia
likuiditas pihak ketiga yang benar-benar memperoleh atau melepas ZEC. Pernyataan
pendaftaran juga menjelaskan proses in-kind, ketika Peserta Berwenang akan menyetorkan
ZEC secara langsung kepada Trust atau menerima ZEC darinya — tetapi pernyataan tersebut menyatakan dengan jelas
bahwa "Persetujuan Regulasi In-Kind belum diperoleh," dan mungkin tidak akan pernah diperoleh.

Jadi, dalam proses tunai, ZEC berpindah tangan antara penyedia likuiditas
dan pasar, tidak pernah antara investor dan Trust. Tidak seorang pun dalam jalur ritel
menyentuh alamat Zcash.

## Biaya dibayar dalam ZEC

Biaya sponsor adalah **2,5% per tahun**, pada saat pencatatan. Biaya tersebut terakumulasi setiap hari sebagai
persentase nilai aset bersih dan, menurut kata-kata dalam pengajuan, "dibayarkan dalam ZEC
kepada Sponsor setiap hari secara tunggakan."

Konsekuensinya bersifat struktural, bukan insidental. Biaya berasal dari
ZEC dana, sehingga jumlah ZEC yang mendukung setiap saham berkurang sedikit setiap
hari. Saham bukanlah jumlah tetap ZEC yang disimpan tanpa batas waktu; saham adalah klaim
atas jumlah yang perlahan menyusut. Siapa pun yang membandingkan eksposur ZCSH jangka panjang dengan
sekadar memegang ZEC perlu memasukkan hal tersebut dalam perbandingan.

Sebagai konteks, 2,5% kira-kira sepuluh kali biaya pada ETF spot bitcoin pada umumnya.
Grayscale mengatakan bahwa pendapatan awal dari biaya sponsor akan diarahkan kembali
ke pengembangan ekosistem Zcash.

## Apa yang sebenarnya dimiliki pemegang saham

Saham adalah eksposur terhadap harga ZEC. Saham bukan ZEC.

Pemegang saham tidak dapat mengirim transaksi terlindungi, tidak dapat melampirkan memo, tidak dapat
memegang unified address, dan tidak dapat melakukan self-custody. Tidak satu pun dari sifat yang
membedakan Zcash dari aset lain tersedia melalui pembungkus ini — pembungkus tersebut
menyampaikan harga dan tidak lebih dari itu. Bagi investor yang tujuannya adalah eksposur
di dalam akun pialang atau pensiun, itulah tepatnya intinya. Bagi
siapa pun yang tertarik pada Zcash karena privasinya, ETF bukan pengganti
dompet, dan keduanya sebenarnya bukan alternatif satu sama lain.

## ZEC disimpan secara terbuka

Terdapat ironi lebih lanjut dalam struktur ini, dan ini adalah hal paling tajam di
halaman ini. Coinbase Custody menyimpan ZEC Trust dalam alamat **transparan**,
bukan alamat terlindungi. Kepemilikan dana terlihat di blockchain,
dapat ditelusuri ke kustodian, dan dapat diamati secara waktu nyata oleh siapa pun yang ingin
melihatnya. Tidak ada dalam dana ini yang menggunakan alamat terlindungi.

Ini bukan kelalaian. Infrastruktur dana teregulasi dibangun berdasarkan audit
dan pengesahan, dan saldo terlindungi adalah tepatnya sesuatu yang tidak dapat diverifikasi
secara independen oleh auditor. Dukungan Coinbase sendiri mencerminkan asimetri yang sama: dukungan tersebut
akan menerima ZEC yang dikirim dari alamat terlindungi, tetapi tidak mengirim ZEC ke
alamat tersebut.

Jadi pemegang institusional terbesar aset privasi menyimpannya dalam satu-satunya
bentuk yang tidak memiliki privasi. Poin ini bersumber dari pelaporan, bukan dari
pengajuan — S-3 menjelaskan kustodi kunci privat Trust tetapi tidak
menggolongkan jenis alamat — dan dinyatakan di sini dengan peringatan tersebut.

## Seberapa banyak ZEC yang terlibat

Pada saat pencatatan pada 25 Agustus 2026, dana tersebut memegang sekitar **387.000 ZEC**, dengan
sekitar **$313 juta** dalam pengelolaan.

Untuk pandangan yang lebih panjang: per 30 September 2025, pengajuan menyatakan Trust memegang
sekitar **2,4% dari ZEC yang beredar**. Kedua angka berubah — yang pertama seiring
harga ZEC serta penciptaan dan penebusan, yang kedua karena biaya dibayarkan
dari kepemilikan — jadi ambil angka terkini dari pengajuan terbaru atau
pengungkapan harian dana sendiri, bukan dari halaman ini.

## Sumber

Semuanya primer, semuanya di EDGAR dengan CIK 1720265 kecuali dinyatakan lain.

- [Grayscale Zcash Trust (ZEC) — indeks pengajuan EDGAR](https://www.sec.gov/edgar/browse/?CIK=1720265&owner=exclude)
- [Pernyataan pendaftaran Form S-3, November 2025](https://www.sec.gov/Archives/edgar/data/1720265/000119312525298561/zcsh-20251126.htm) — peran entitas, mekanisme penciptaan dan penebusan, Biaya Sponsor, serta persentase ZEC yang beredar
- [Form 10-K untuk tahun yang berakhir pada 31 Desember 2024](https://www.sec.gov/Archives/edgar/data/1720265/000095017025035469/zcsh-20241231.htm)
- [ETF Zcash mulai diperdagangkan di NYSE Arca, 25 Agustus 2026](https://www.globenewswire.com/news-release/2026/8/25/3350404/0/en/the-zcash-etf-ticker-zcsh-built-by-grayscale-begins-trading-on-nyse-arca-expanding-investor-access-to-the-leading-privacy-focused-digital-currency.html)
- [Grayscale halaman dana Zcash Trust](https://www.grayscale.com/funds/grayscale-zcash-trust) — tanggal awal dan pengungkapan terkini
- [ETF coin privasi pertama: di dalam pengajuan Grayscale oleh Zcash](https://crypto.news/the-first-privacy-coin-etf-inside-grayscales-zcash-filing/) — sumber sekunder; satu-satunya yang ditemukan yang menyatakan bahwa ZEC Trust disimpan dalam alamat transparan

Angka-angka berlaku pada tanggal yang disebutkan dan akan berubah. Diperiksa 30 September 2026.
Hanya untuk penggunaan edukasional, bukan nasihat investasi.
