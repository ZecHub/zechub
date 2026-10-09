# FROST & Viewing Keys: Zcash/Ringkasan Riset Interop Dash

*Disiapkan untuk ZecHub · Direvisi 27 September 2026 · Semua klaim bersumber secara inline*

## Ringkasan eksekutif

ZecHub mengajukan pertanyaan ini setelah menambahkan DASH terlindungi sebagai opsi donasi wiki: mungkinkah viewing key bergaya Zcash, atau tanda tangan ambang batas (threshold signatures) FROST, dapat diterapkan ke Dash?

Penelitian tersebut telah mengubah sudut pandangnya. Viewing keys bukanlah sebuah pertanyaan terbuka — Dash telah menyertakan [Zcash Orchard pool terlindungi](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) ke dalam rantai Evolution-nya, dan hierarki kunci dari Orchard mencakup viewing keys secara struktural. [roadmap](https://www.dash.org/roadmap/) milik Dash sendiri memposisikan mereka untuk pengungkapan auditor dan kepatuhan Travel Rule. Bagian tersebut telah diterapkan, bukan sekadar hipotesis.

**FROST adalah tempat di mana kesenjangan yang sebenarnya berada.** Dash sudah menjalankan tanda tangan ambang batas BLS melalui [Long-Living Masternode Quorums](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html), tetapi hal tersebut berfungsi untuk konsensus tingkat jaringan — ChainLocks dan InstantSend. [ZIP 312](https://zips.z.cash/zip-0312) menargetkan sesuatu yang berbeda: otorisasi pengeluaran ambang batas pada satu akun terlindungi yang dipegang oleh sekelompok kecil pemegang kunci individu. Keduanya tidak dapat saling menggantikan. Dan karena ZIP 312 masih berupa **Draft**, tidak ada implementasi referensi pada salah satu chain untuk dipindahkan, sehingga ini akan menjadi pekerjaan baru terlepas dari sisi mana yang membangunnya.

---

## Lini Masa: mengapa perbandingan ini tidak biasa saat ini

Dua peristiwa pool terlindungi terjadi dalam rentang waktu beberapa minggu satu sama lain pada pertengahan 2026.

**Zcash dipindahkan dari Orchard.** Peneliti Taylor Hornby mengungkapkan kerentanan sirkuit pada Orchard yang dapat dieksploitasi untuk menggelembungkan pasokan tanpa terdeteksi. Zcash menanggapi dengan mengaktifkan **Ironwood (NU6.3)** pada **28 Juli 2026**, memperkenalkan pool terlindungi baru dengan mekanisme migrasi turnstile.

**Dash beralih ke Orchard.** Dash mengumumkan rencana tersebut pada [19 Februari 2026](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — *"Kami berharap dapat segera meluncurkan transfer terlindungi, tentu saja menunggu audit keamanan dan peninjauan kode lebih lanjut."* [roadmap](https://www.dash.org/roadmap/) Dash mencatat Saldo Terlindungi sebagai **selesai pada Juli 2026** dengan Dash Platform **v4.0**, dan Dash menerbitkan [*"Transaksi terlindungi telah aktif di mainnet Dash Evolution"*](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) pada **4 Agustus 2026**.

> **Catatan mengenai urutan.** Beberapa liputan menempatkan aktivasi mainnet Dash pada 17 Juli 2026, yang akan menempatkannya sebelum Ironwood. Tanggal tersebut tampaknya merujuk pada laporan pers mengenai pengumuman tersebut alih-alih pada sebuah aktivasi. Pada sumber milik Dash sendiri, fitur tersebut selesai pada bulan Juli dan diumumkan secara langsung pada 4 Agustus — setelah Ironwood. Kedua chain tersebut bersinggungan dalam beberapa minggu; urutan pastinya bergantung pada milestone mana yang dihitung, dan ringkasan ini tidak mengklaim salah satunya.

Yang sangat penting, Dash tidak mewarisi bug tersebut. Pengumuman mereka sangat eksplisit: *"kami mengimplementasikan versi Orchard tanpa bug inflasi yang diketahui. Versi sebelumnya mengandung bug yang dapat dieksploitasi untuk menginflasi pasokan Zcash secara tidak terdeteksi."*

Jadi Dash sekarang menjalankan fork yang telah ditambal dari kriptografi Zcash itu sendiri, sementara pool generasi berikutnya dari Zcash (Ironwood) dan skema otorisasi-pengeluaran generasi berikutnya (FROST) masing-masing baru saja aktif dan masih dalam tahap Draft.

---

## Viewing keys: telah diterapkan, bukan celah penelitian

Pool terlindungi Dash adalah [Orchard](https://zips.z.cash/zip-0224), dibangun di atas Halo 2 zk-SNARKs yang tidak memerlukan trusted setup. Hierarki kunci Orchard selalu menyertakan Full Viewing Keys dan Incoming Viewing Keys sebagai bagian dari desainnya, bukan sebagai tambahan — sehingga kemampuan tersebut hadir bersama dengan kodenya, dan bukan sebagai port yang harus dinegosiasikan oleh kedua chain.

Roadmap Dash menyatakan niat tersebut secara langsung:

> *"Berbeda dengan sistem privasi wajib yang telah menghadapi penghapusan daftar oleh exchange dan gesekan regulasi, Saldo Terlindungi mendukung pengungkapan selektif melalui view keys — memungkinkan pengguna dan bisnis untuk membagikan detail transaksi kepada auditor atau mematuhi persyaratan Travel Rule saat dibutuhkan, tanpa mengorbankan privasi untuk penggunaan sehari-hari."*

Dua pengamatan yang patut dicatat:

**Dash memposisikan viewing key pada use cases produksi yang lebih konkret daripada yang telah dicapai oleh perangkat Zcash sendiri.** Perangkat pengungkapan pembayaran milik Zcash sebagian besar tetap bersifat eksperimental dan bersifat opsional di berbagai dompet. Dash meluncurkan view key sebagai fitur kepatuhan dengan use cases yang ditentukan, pada sebuah chain yang juga menawarkan penyelesaian deterministik sekitar satu detik dan sinkronisasi dompet sekitar dua puluh detik berdasarkan pengumuman mereka sendiri.

**Masalah terbuka yang ada adalah pergeseran kompatibilitas, bukan kapabilitas.** Apakah implementasi viewing-key Dash tetap kompatibel secara wire dengan format viewing-key Orchard milik Zcash saat kedua chain berkembang secara independen adalah hal yang perlu dipantau. Ini merupakan pertanyaan pemantauan alih-alih sebuah proyek penelitian.

---

## Derivasi kunci: Perbandingan antara Zcash dan Dash

Bagian ini menjawab pertanyaan peninjau secara langsung. Jawaban singkatnya adalah bahwa pohon kunci *terlindungi* hampir identik karena kodenya digunakan bersama — perbedaan yang bermakna terletak pada bagaimana setiap rantai melakukan **rooting** pada pohon tersebut di dalam ruang kunci dompetnya, dan pada apa lagi yang mengisi ruang tersebut.

### Zcash

Zcash menggunakan [ZIP 32, *Shielded Hierarchical Deterministic Wallets*](https://zips.z.cash/zip-0032), yang berstatus **Final**. Alih-alih menempatkan kunci terlindungi di dalam satu pohon BIP 32 tunggal, ZIP 32 memberikan setiap pool terlindungi master key sendiri dan jalurnya sendiri:

```
m_Orchard / purpose' / coin_type' / account'
m_Sapling / purpose' / coin_type' / account'
```

`purpose` ditetapkan pada `32'` (0x80000020) sesuai dengan BIP 43, dan `coin_type` mengikuti SLIP 44, dengan semua testnet berbagi indeks `1`.

Di dalam akun Orchard, hierarkinya bersifat satu arah secara ketat — setiap level dapat menurunkan semua yang ada di bawahnya dan tidak dapat menurunkan apa pun yang ada di atasnya:

| Kunci | Dapat melakukan | Menurunkan |
|---|---|---|
| spending key | Membelanjakan catatan | `ask`, `nk`, `rivk` |
| Spend authorizing key (`ask`) | Mengotorisasi pembelanjaan | — |
| Full Viewing Key (`ak`, `nk`, `rivk`) | Melihat pembayaran masuk **dan** keluar | IVK, OVK |
| Incoming Viewing Key | Hanya melihat pembayaran masuk | Diversified addresses |
| Viewing Key keluar | Memulihkan detail pembayaran keluar | — |
| Diversified address | Menerima | — |

Orchard menyederhanakan ini dibandingkan dengan Sapling: menurut [Orchard Book](https://zcash.github.io/orchard/design/keys.html), kunci privat nullifier `nsk` telah dihapus, `nk` menjadi sebuah elemen field alih-alih titik curve, dan `ovk` kini diturunkan dari full viewing key alih-alih disimpan secara terpisah.

Di atas ini terdapat [ZIP 316, *Unified Addresses and Unified Viewing Keys*](https://zips.z.cash/zip-0316) — Revisi 0 Aktif, Revisi 1 Ditarik, Revisi 2 Draf — yang menggabungkan kunci per-pool ke dalam **Unified Full Viewing Key** ("menggabungkan beberapa Full Viewing Key… Item") dan sebuah **Unified Incoming Viewing Key**. Perbedaan yang harus dipatuhi oleh developer dompet: UFVK mengungkapkan aktivitas masuk maupun keluar, sedangkan UIVK hanya aktivitas masuk.

### Dash

Dash merujangkan segalanya dalam pohon BIP 32 konvensional, dengan tipe koin SLIP 44 `5'`, dan menambahkan dua ekstensi derivasi miliknya sendiri.

[DIP-0009, *Feature Derivation Paths*](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html) menyisipkan tingkat **fitur** yang mempartisi ruang kunci berdasarkan fungsi spesifik koin:

```
m / purpose' / coin_type' / feature' / *
```

dengan `purpose` ditetapkan pada `9'` (0x80000009) dan `coin_type` pada `5'` (0x80000005). Motivasi yang dinyatakan dalam DIP adalah isolasi — *"mungkin diinginkan untuk menjaga dana campuran dalam jalur yang terisolasi dari dana non-campuran."*

[DIP-0014, *Extended Key Derivation using 256-bit Unsigned Integers*](https://github.com/dashpay/dips/blob/master/dip-0014.md) melangkah lebih jauh, dengan meningkatkan batas indeks 31-bit pada BIP 32 sehingga komponen jalur dapat membawa nilai penuh 256-bit. Hal ini memungkinkan jalur yang diturunkan dari identitas seperti:

```
m(userA)/9'/5'/15'/0'/(userA's unique id)/(userB's unique id)
```

di mana dua komponen terakhir adalah hash identitas pengguna. Zcash tidak memiliki analog: ZIP 32 tidak memiliki konsep menurunkan jalur kunci dari identitas pihak lain.

### Di mana keduanya sebenarnya berbeda

**Subtree terlindungi adalah sama.** Kunci terlindungi milik Dash adalah kunci Orchard, karena pool terlindungi milik Dash adalah Orchard. Seorang developer dompet yang berpindah di antara keduanya bekerja dengan struktur spending-key-ke-viewing-key yang sama.

**Akar dasarnya berbeda.** Zcash mengisolasi setiap pool terlindungi di bawah master key-nya sendiri dengan tujuan `32'`. Dash menggantungkan fitur terlindungi pada satu pohon terpadu di bawah tujuan `9'`, bersama dengan setiap fitur lainnya. Pemisahan Zcash dilakukan berdasarkan pool kriptografis; pemisahan Dash dilakukan berdasarkan fitur produk.

**Ruang kunci Dash mengandung sesuatu yang tidak dimiliki oleh Zcash: domain BLS terpisah.** Kunci operator Masternode, kunci voting, dan kunci quorum yang digunakan oleh LLMQ adalah kunci BLS, bukan kunci keluarga Schnorr, dan berada sepenuhnya di luar pohon BIP 32 yang dijelaskan di atas. Inilah alasan tepat mengapa sistem penandatanganan threshold Dash saat ini berada di sana — dan alasan tepat mengapa ia tidak dapat dikombinasikan dengan otorisasi pengeluaran Orchard, sebagaimana dijelaskan pada bagian berikutnya.

**Derivasi yang terkait dengan identitas hanya tersedia di Dash.** Jalur 256-bit pada DIP-0014 ada untuk menurunkan kunci dari hubungan antar identitas. Itu adalah konsep Dash Platform yang tidak memiliki padanan di Zcash, dan ini merupakan kasus paling jelas di mana kedua skema derivasi telah berbeda secara sengaja dan bukan karena ketidaksengajaan.

*Lihat Gambar 1 untuk dua skema rooting yang bertemu pada sebuah subtree Orchard bersama.*

---

## FROST: pertanyaan yang benar-benar terbuka

Dash memiliki sistem threshold-signature yang matang dalam **LLMQ berbasis BLS** (Long-Living Masternode Quorums), yang digunakan untuk ChainLocks, InstantSend, dan konsensus validator Dash Platform.

[ZIP 312, *FROST untuk Otorisasi Pengeluaran Multisignature*](https://zips.z.cash/zip-0312), dengan status **Draft**, melakukan hal lain. Ia menerapkan ambang batas (threshold) pada tanda tangan otorisasi pengeluaran berbasis Schnorr yang telah ditentukan oleh Sapling dan Orchard — masing-masing **RedJubjub** dan **RedPallas** — sehingga, dalam kerangka kerja ZIP sendiri, *"pengguna dan layanan pihak ketiga yang berbagi kustodial sebuah dompet, atau sekelompok orang yang mengelola dana bersama"* dapat memerlukan persetujuan ambang batas seperti 2-dari-3 sebelum pengeluaran dilakukan. Ini dikategorikan sebagai ZIP **Wallet**: ia menghasilkan tanda tangan yang kompatibel dengan otorisasi pengeluaran yang sudah ada alih-alih mengubah konsensus. Ia mempertahankan peran Coordinator, yang secara eksplisit ditolak untuk dihapus oleh ZIP, dan membahas pembuatan kunci dealer tepercaya (trusted-dealer) maupun pembuatan kunci terdistribusi (distributed key generation).

Perbedaan yang penting, dan alasan mengapa ini bukan merupakan pengganti:

| | Dash BLS / LLMQ | Zcash FROST (ZIP 312) |
|---|---|---|
| Skema tanda tangan | BLS | Schnorr — RedJubjub / RedPallas |
| Siapa yang menandatangani | Kuorum masternode | Sekelompok kecil pemegang kunci individu |
| Apa yang diotorisasi | Fakta jaringan: penguncian blok, penguncian transaksi | Pengeluaran dari satu akun terlindungi |
| Layer | Konsensus | Dompet |
| Ruang kunci | Domain BLS terpisah | Kunci otorisasi pengeluaran Orchard/Sapling |
| Status | Telah diterapkan | Draf, tidak ada implementasi referensi |

Dash memiliki tanda tangan ambang batas BLS **tidak** berarti bahwa ia memiliki, atau membutuhkan, FROST. Namun, hal ini berarti para insinyur Dash memiliki keahlian internal dalam penandatanganan ambang batas, pembuatan kunci terdistribusi, dan koordinasi kuorum — pengalaman yang benar-benar dapat dialihkan jika mereka memilih untuk membangun ini.

*Lihat Gambar 2 untuk melihat apa yang sebenarnya ditandatangani oleh setiap skema.*

### Apa yang akan dibutuhkan oleh FROST pada fork Orchard dari Dash pada tahap awal

1. **Sebuah FROST DKG dan upacara penandatanganan melalui RedPallas**, skema otorisasi pengeluaran Orchard — sebuah varian Schnorr di atas kurva Pallas. Ini terpisah dari, dan tidak dapat direduksi menjadi, BLS DKG milik Dash yang sudah ada untuk LLMQs.
2. **Dukungan dompet dan UX untuk penandatanganan multi-pihak pada satu akun terlindungi**, yang merupakan pola interaksi berbeda dari alat masternode-quorum dan membutuhkan setara dengan Coordinator.
3. **Keputusan mengenai layer.** Kemungkinan besar hanya pada level dompet, karena ZIP 312 memiliki cakupan sebagai skema dompet di atas primitif yang sudah ada alih-alih sebuah perubahan konsensus — namun hal ini perlu dikonfirmasi terhadap fork Orchard milik Dash secara spesifik, tidak boleh diasumsikan dari cakupan Zcash.

---

## Rekomendasi

**Viewing keys — dokumentasikan, jangan diteliti.** Kemampuan ini tersedia di kedua chain. Sebuah catatan wiki singkat yang mencatat bahwa pool terlindungi Dash menyertakan view keys, dan menautkan roadmap Dash, mencegah audiens ZecHub berasumsi bahwa hal tersebut masih bersifat hipotetis. Pantau kompatibilitas format-wire seiring dengan evolusi kedua chain tersebut.

**FROST — peluang nyata, terhambat di hulu.** Hal ini bergantung pada ZIP 312 yang mencapai implementasi referensi, atau Dash memilih untuk membangun secara paralel. ZecHub tidak dapat mempercepatnya secara langsung.

**Langkah selanjutnya dengan nilai tertinggi adalah sebuah percakapan, bukan riset meja lebih lanjut.** Orang-orang yang akan membangun ini dapat dijangkau. Shielded Labs sedang mendorong ZIP 312; tim teknik Dash telah terlibat secara positif dengan pembingkaian "dipinjam dari Zcash" seputar integrasi Orchard. Sebuah utas lintas komunitas yang menghubungkan keduanya akan memunculkan lebih banyak hal daripada sekadar satu putaran membaca lainnya, dan ringkasan ini telah mencapai batas dari apa yang dapat diselesaikan oleh sumber publik.

---

## Gambar

**Gambar 1 — Akar derivasi kunci: Zcash ZIP 32 dan Dash DIP-0009/0014, bertemu pada subtree Orchard bersama.**
`assets/Zcash_Dash_Key_Derivation.svg`

**Gambar 2 — Apa yang ditandatangani oleh setiap skema ambang batas: sebuah kuorum masternode yang memberikan kesaksian terhadap fakta jaringan, dibandingkan dengan sekelompok pemegang kunci yang mengotorisasi satu pengeluaran terlindungi.**
`assets/FROST_vs_BLS_LLMQ.svg`

---

## Sumber

**Zcash — protokol**
- [ZIP 32: Dompet Hierarchical Deterministic Terlindungi](https://zips.z.cash/zip-0032) — status Final
- [ZIP 224: Orchard Protokol Terlindungi](https://zips.z.cash/zip-0224)
- [ZIP 312: FROST untuk Multisignature Otorisasi Pengeluaran](https://zips.z.cash/zip-0312) — status Draft
- [ZIP 316: Alamat Terpadu dan Viewing Keys Terpadu](https://zips.z.cash/zip-0316)
- [Buku Orchard — Kunci dan alamat](https://zcash.github.io/orchard/design/keys.html)
- [Zcash Spesifikasi Protokol](https://zips.z.cash/protocol/protocol.pdf) — komponen kunci, §5.6.4

**Dash — protokol dan pengumuman**
- ](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/)Transaksi terlindungi telah aktif di mainnet Dash Evolution[ — 4 Agustus 2026
- ](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/)Dash Menambahkan Transaksi Terlindungi ke Evolution[ — 19 Februari 2026
- ](https://www.dash.org/roadmap/)Roadmap Dash[ — Saldo Terlindungi, selesai Juli 2026, Platform v4.0; diperbarui 12 September 2026
- ](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)DIP-0009: Fitur Derivation Paths[
- ](https://github.com/dashpay/dips/blob/master/dip-0014.md)DIP-0014: Extended Key Derivation menggunakan 256-bit Unsigned Integers[
- ](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)Dokumentasi Dash Core — Masternode Quorums (LLMQ)[
- ](https://github.com/dashpay/dips)repositori dashpay/dips[

**Pelaporan kontemporer**
- [Dash meluncurkan teknologi Orchard milik Zcash dalam peningkatan privasi ](https://www.cryptopolitan.com/dash-launch-zcash-orchard-technology/) — Cryptopolitan
- [Dash Menghadirkan Privasi Orchard Zcash ke Evolution Chain untuk Transaksi Terlindungi ](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions) — HackerNoon

*Sumber diperiksa pada 27 September 2026. Dash Platform dan ZIP 312 keduanya sedang berubah; angka dan status harus diverifikasi ulang sebelum dipublikasikan kembali.*