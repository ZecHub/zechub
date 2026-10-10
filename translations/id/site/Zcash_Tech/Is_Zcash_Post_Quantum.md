<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Apakah Zcash Post-Quantum?

## Jawaban singkat

Belum, belum saatnya.

Sejak peningkatan Ironwood, Zcash bersifat **quantum-recoverable** untuk dana yang disimpan dalam pool Ironwood. Itu adalah sebuah langkah nyata, tetapi tidak sama dengan menjadi aman secara post-quantum. ZIP 2005, spesifikasi di baliknya, menyatakan hal tersebut secara langsung: perubahan tersebut "tidak dengan sendirinya membuat protokol aman terhadap lawan quantum". Hal ini mempersiapkan dana Ironwood agar dapat dipindahkan melalui Recovery Protocol di masa mendatang setelah kriptografi saat ini dinonaktifkan.

Halaman ini memisahkan apa yang dilindungi oleh Zcash saat ini, apa yang diubah oleh Ironwood, apa yang masih terekspos, dan apa yang baru sebatas proposal. Tabel [status](#status-table) di dekat bagian akhir menunjukkan posisi setiap bagian dan kapan hal tersebut terakhir diperiksa.

<br/>

## Untuk siapa ini ditujukan

- Siapa pun yang telah melihat "quantum-recoverable" dan membacanya sebagai "quantum-proof"
- Pemegang aset yang sedang memutuskan apakah akan memindahkan dana ke Ironwood
- Penulis dan moderator yang membutuhkan jawaban bersumber untuk mengarahkan orang lain

Untuk latar belakang mengenai komputasi kuantum itu sendiri, mulailah dengan [Keamanan Post-Quantum di Zcash](/zcash-tech/post-quantum-security).

<br/>

## Mengapa pertanyaan ini membingungkan

"Post-quantum" digunakan seolah-olah itu adalah satu properti tunggal. Untuk Zcash, ini setidaknya mencakup empat pertanyaan terpisah, dan semuanya memiliki jawaban yang berbeda:

1. **Privasi.** Bisakah penyerang kuantum melihat siapa yang membayar siapa dan berapa jumlahnya?
2. **Pengeluaran.** Bisakah penyerang kuantum membelanjakan koin yang bukan milik mereka?
3. **Inflasi.** Bisakah penyerang kuantum menciptakan ZEC dari ketiadaan?
4. **Pemulihan.** Jika kriptografi saat ini harus dinonaktifkan, dapatkah pengguna jujur tetap mengeluarkan dana mereka?

Ironwood hanya mengubah jawaban untuk pertanyaan keempat, dan hanya untuk catatan di dalam pool Ironwood.

Ancaman di balik semua ini adalah penyerang yang dapat menghitung logaritma diskrit pada kurva eliptik yang digunakan oleh Zcash. Komputer kuantum yang cukup besar yang menjalankan algoritma Shor akan menjadi salah satu cara untuk melakukannya. ZIP 2005 menunjukkan bahwa menemukan **satu** logaritma diskrit saja sudah cukup untuk menyebabkan inflasi sembarangan atau mencuri dana.

<br/>

## Apa yang dilindungi Zcash saat ini

Tabel ini mendeskripsikan protokol sebagaimana yang berjalan saat ini, terhadap penyerang yang dapat memecahkan logaritma diskrit. Ini berlaku untuk setiap pool terlindungi, termasuk Ironwood, karena Ironwood menggunakan sirkuit Orchard yang sama, 2 proof Halo, dan tanda tangan RedPallas seperti Orchard.

| Properti | Terhadap penyerang quantum saat ini | Apa yang diubah oleh Ironwood |
|---|---|---|
| Privasi | Tetap terjaga jika penyerang tidak mengetahui alamat terlindungi Anda. Proof dan tanda tangan yang di-rerandomize tidak membocorkan apa pun secara ekstra. Jika penyerang mengetahui alamat tersebut, mereka dapat mendekripsi catatan yang dikirim ke sana, termasuk catatan lama yang disimpan dari chain. | Tidak ada. ZIP 2005: "Situasi terkait Privasi tidak berubah untuk pool mana pun." |
| Pengeluaran | Tidak terlindungi. Penyerang dapat memalsukan proof atau tanda tangan pengeluaran dan mencuri dari pool terlindungi mana pun, bahkan untuk alamat yang belum pernah mereka lihat. | Belum ada. Perlindungan hanya akan hadir setelah peralihan ke Recovery Protocol di masa mendatang. |
| Inflasi | Tidak terlindungi. Penyerang dapat memalsukan proof yang tampak valid dan membuat ZEC di dalam pool terlindungi mana pun, kemungkinan tanpa ada yang menyadarinya. Satu-satunya batasan adalah [turnstile](/zcash-tech/the-turnstile): tidak ada pool yang dapat membayar lebih dari saldo terdaftarnya. | Belum ada. Catatan Ironwood sekarang melakukan commit terhadap semua kontennya dengan cara yang seharusnya tidak dapat dipalsukan oleh penyerang quantum, yang mana merupakan hal yang dibutuhkan Recovery Protocol di masa mendatang untuk menjaga pasokan tetap sehat. |
| Pemulihan | Catatan Sprout, Sapling dan Orchard tidak memiliki jalur pemulihan. Begitu protokolnya dimatikan, apa pun yang tersisa di dalamnya tidak akan dapat diakses. | Setiap catatan Ironwood pada prinsipnya dapat dipulihkan. Tidak ada catatan Sapling atau Orchard yang demikian. |

Transparan ZEC adalah kasus yang terpisah. Tanda tangan ECDSA miliknya dapat dipalsukan setelah kunci publik diketahui. Untuk alamat transparan normal, hal ini terjadi saat pertama kali Anda melakukan pengeluaran darinya, dan terdapat juga jendela waktu singkat selama sebuah transaksi tertahan tanpa konfirmasi di dalam mempool. ZIP 2005 tidak mengubah semua itu.

<br/>

## Apa yang diubah oleh Ironwood

Ironwood adalah peningkatan jaringan NU6.3. Peningkatan ini diaktifkan pada Mainnet pada blok 3,428,143 pada 28 Juli 2026. Tujuan utamanya adalah integritas pasokan setelah bug soundness Orchard (lihat halaman [Ironwood](/zcash-tech/ironwood)), dan pemulihan kuantum dari ZIP 2005 yang dikirimkan sebagai bagian darinya.

- **Format note baru.** Setiap output note Ironwood menggunakan format yang dapat dipulihkan secara quantum (byte utama plaintext note adalah `0x03`). Randomness dari note kini diturunkan dari semua field-nya, sehingga note terikat pada kontennya melalui hash, bukan hanya melalui matematika elliptic-curve.
- **Jalur pemulihan hanya untuk note Ironwood.** ZIP 326 menyatakan secara eksplisit bahwa setiap note Ironwood dapat dipulihkan dan tidak ada note Orchard yang dapat dipulihkan. Pengaturan dompet tidak mengubah hal tersebut.
- **Orchard berhenti menerima nilai baru.** Reward Coinbase tidak lagi dapat masuk ke Orchard, dan Orchard tidak lagi dapat mengirim ke alamat Orchard yang berbeda, sehingga nilai terlindungi baru akan masuk ke Ironwood.
- **Dompet diperintahkan untuk memindahkan semuanya.** ZIP 2005 menyatakan bahwa dompet SEHARUSNYA memindahkan semua dana yang mereka kendalikan, termasuk dana transparan, Sprout, dan Sapling, ke dalam note Ironwood sesegera mungkin secara praktis, dan terus melakukannya saat dana baru tiba.

Apa yang tidak berubah dari Ironwood: kriptografi yang digunakan untuk pengeluaran dan pembuktian saat ini, enkripsi catatan, dan apa pun mengenai ZEC transparan.

<br/>

## Batasan yang masih ada

**Ada jendela eksposur.** Dari aktivasi Ironwood hingga protokol lama dimatikan, penyerang kuantum masih dapat mencuri, menggelembungkan, atau memblokir dana di setiap pool terlindungi. ZIP 2005 menyebut ini sebagai "periode eksposur kritis" dan memperingatkan bahwa serangan selama periode tersebut masih dapat merusak kemampuan pemegang untuk pulih di kemudian hari. Itulah sebabnya disebutkan bahwa Zcash harus mematikan Orchard, Sapling, dan Sprout **sebelum** serangan kuantum menjadi layak dilakukan.

**Penghentian ini tidak memiliki tanggal.** Tidak ada jadwal ZIP untuk mematikan Orchard atau Sapling. ZIP 2003, sebuah Draft dan kandidat NU7, akan menonaktifkan pengeluaran Sprout dengan melarang transaksi versi 4. Diskusi mengenai penarikan saja Sapling dimulai di forum pada April 2026.

**Protokol Pemulihan belum selesai.** ZIP 2005 hanya menguraikannya, dan menyatakan bahwa detailnya "dapat berubah sewaktu-waktu". Belum ada satu pun bagian darinya yang diterapkan.

**Panen sekarang, dekripsi nanti.** Ciphertext untuk Ironwood, Orchard, Sapling dan Sprout semuanya bersifat publik di dalam chain. Seseorang dapat menyimpannya hari ini dan mendekripsinya nanti, jika mereka juga mengetahui alamat penerima. Setiap alamat yang Anda publikasikan atau berikan adalah bagian dari risiko tersebut. ZIP 2005 menyatakan "perubahan protokol lainnya sedang dalam pertimbangan" untuk transfer di masa mendatang.

**Dana transparan tidak tercakup.** Alamat yang telah digunakan untuk pengeluaran, atau digunakan kembali, memiliki kunci publik yang terekspos. Kemampuan pemulihan untuk beberapa alamat transparan sejauh ini barulah sebuah ide (ZIP 2007, lihat di bawah).

**Setup FROST memiliki peringatan tambahan.** Dengan FROST, setiap partisipan memegang quantum spending key (`qsk`), dan penyerang quantum yang memegangnya mungkin dapat mencuri. ZIP 2005 merekomendasikan pemindahan dana FROST ke protokol post-quantum penuh dengan dukungan threshold setelah protokol tersebut tersedia.

<br/>

## Proposal dan riset

Tidak ada satu pun dari ini yang aktif.

- **Protokol Pemulihan.** Mekanisme yang sebenarnya akan memungkinkan dana Ironwood untuk dibelanjakan setelah peralihan. Diuraikan dalam ZIP 2005, tidak ditentukan secara spesifik.
- **ZIP 2007, kemampuan pemulihan untuk beberapa alamat transparan.** Hanya sebuah jumlah ZIP yang dicadangkan dengan diskusi di [zips#1302](https://github.com/zcash/zips/issues/1302). Idenya adalah bahwa output P2PKH dan P2SH yang kunci publiknya belum pernah diungkapkan dapat dipulihkan, dengan jaminan yang lebih lemah daripada Ironwood.
- **Privasi post-quantum untuk alamat yang diketahui.** Terbuka sejak 2022 dalam [zips#1133](https://github.com/zcash/zips/issues/1133), yang mencatat bahwa Zcash "sudah dimaksudkan untuk menjadi privat secara post-quantum" ketika alamat dijaga kerahasiaannya dan menanyakan bagaimana memperluas hal tersebut ke alamat yang diketahui, misalnya dengan skema enkapsulasi kunci post-quantum seperti Kyber (sekarang ML-KEM). Pada Juni 2026 [zips#1307](https://github.com/zcash/zips/issues/1307) mengusulkan sebuah ZIP untuk mendokumentasikan properti privasi saat ini dan kemungkinan perbaikan.
- **Proyek Tachyon.** Sebuah usulan peningkatan skalabilitas. Situsnya menyatakan bahwa proyek ini akan memperoleh "privasi post-quantum penuh" sebagai efek samping, dengan memindahkan pengiriman pembayaran ke luar chain dan menggunakan pertukaran kunci post-quantum. Library data yang membawa proof miliknya, Ragu, dijelaskan sebagai "masih dalam tahap konstruksi". Lihat [Project Tachyon](/zcash-tech/project-tachyon).
- **Sebuah Zcash yang sepenuhnya post-quantum.** Proof, tanda tangan, dan komitmen post-quantum secara bersamaan. Dilacak dalam [zips#1134](https://github.com/zcash/zips/issues/1134), terbuka sejak 2016. Tidak ada spesifikasi atau lini masa.

<br/>

## Tabel status

Terakhir diperiksa 13 September 2026. Status header sebuah ZIP dan status jaringannya adalah dua hal yang berbeda: ZIP 2005 masih bertuliskan "Proposed" pada headernya meskipun aturannya telah diterapkan di Mainnet sejak Juli 2026.

| Item | status ZIP | Status jaringan | Tanggal | Sumber |
|---|---|---|---|---|
| pool Ironwood dengan catatan yang dapat dipulihkan secara quantum (NU6.3) | ZIP 2005 Diusulkan, ZIP 229 dan ZIP 258 Draft | **Diaktifkan** pada Mainnet | 28 Jul 2026, blok 3,428,143 | [ZIP 2005](https://zips.z.cash/zip-2005), [ZIP 258](https://zips.z.cash/zip-0258) |
| Orchard ditutup untuk nilai baru | ZIP 2006 Dipesan, aturan dalam ZIP 258 | **Diaktifkan** pada Mainnet | 28 Jul 2026 | [ZIP 258](https://zips.z.cash/zip-0258) |
| Dompet memindahkan dana ke Ironwood | Panduan dalam ZIP 2005, ZIP 318 dan ZIP 326 (Draft) | Direkomendasikan, tergantung pada dompet Anda | Sejak 28 Jul 2026 | [ZIP 318](https://zips.z.cash/zip-0318), [ZIP 326](https://zips.z.cash/zip-0326) |
| Protokol Pemulihan | Diuraikan hanya di dalam ZIP 2005 | **Tidak diimplementasikan** | Tidak ada tanggal | [ZIP 2005](https://zips.z.cash/zip-2005) |
| Mematikan Orchard dan Sapling | Tidak ada ZIP | **Tidak dijadwalkan** | Diskusi Sapling dari Apr 2026 | [Forum](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| Menonaktifkan pengeluaran Sprout (ZIP 2003) | Draft, kandidat NU7 | **Tidak diaktifkan** | Tidak ada tanggal | [ZIP 2003](https://zips.z.cash/zip-2003) |
| Kemampuan pemulihan transparan (ZIP 2007) | Dipesan | **Proposal** | ZIP dipesan 5 Jul 2025, diskusi dibuka 17 Jun 2026 | [zips#1302](https://github.com/zcash/zips/issues/1302) |
| Privasi post-quantum untuk alamat yang diketahui | Isu terbuka, tidak ada ZIP | **Riset** | #1133 dibuka 18 Agt 2022, #1307 dibuka 23 Jun 2026 | [zips#1133](https://github.com/zcash/zips/issues/1133), [zips#1307](https://github.com/zcash/zips/issues/1307) |
| Proyek Tachyon | Tidak ada ZIP | **Proposal**, dalam pengembangan | Pertama kali diterbitkan Apr 2025 | [tachyon.z.cash](https://tachyon.z.cash/roadmap/) |
| Protokol sepenuhnya post-quantum | Isu terbuka, tidak ada ZIP | **Pekerjaan masa depan** | #1134 dibuka 28 Mar 2016 | [zips#1134](https://github.com/zcash/zips/issues/1134) |

Dalam jajak pendapat sentimen NU7 dari Zcash Foundation (Februari 2026), pemulihan kuantum mendapatkan dukungan 90,5% dari ZCAP dan 94,6% dari pemegang koin, dan Tachyon mendapatkan dukungan yang hampir universal. Itu adalah jajak pendapat sentimen, bukan keputusan tentang apa yang dimasukkan ke dalam NU7.

<br/>

## Apa yang dapat Anda lakukan sekarang

- **Pindahkan dana Anda ke Ironwood.** Catatan Sapling dan Orchard tidak akan pernah dapat dipulihkan. Memindahkan nilai antar pool menunjukkan jumlah tersebut secara on-chain, sehingga ZIP 318 memiliki dompet yang membagi saldo menjadi jumlah tetap dan mengirimkannya secara bertahap. Biarkan dompet Anda melakukannya daripada memindahkan semuanya sekaligus.
- **Jangan publikasikan alamat terlindungi yang tidak perlu Anda bagikan.** Privasi terhadap penyerang quantum di masa depan bergantung pada ketidaktahuan mereka terhadap alamat Anda. Alamat unified murah untuk dibuat, jadi berikan alamat baru kepada setiap pembayar. ZIP 229 merekomendasikan rotasi alamat karena alasan ini.
- **Jangan gunakan kembali alamat transparan.** Begitu Anda melakukan pengeluaran dari satu alamat, kunci publiknya akan ada di chain selamanya.
- **Jaga keamanan frasa pemulihan Anda.** Dalam Recovery Protocol seperti yang diuraikan, sebuah pengeluaran pemulihan harus membuktikan bahwa Anda mengetahui spending key Anda, dan dompet biasa menurunkan kunci tersebut dari seed phrase.
- **Abaikan klaim "Zcash tahan terhadap quantum".** Saat ini belum, dan orang-orang yang menulis spesifikasinya pun mengatakannya.

<br/>

## Kesalahpahaman umum

- **"Ironwood adalah post-quantum."** Tidak. Ia menjalankan kriptografi Orchard yang sama, dan ZIP 2005 menyatakan bahwa fitur tersebut "tidak membuat protokol Orchard aman terhadap serangan quantum".
- **"Quantum-recoverable berarti aman dari komputer quantum saat ini."** Tidak. Ini berarti dana Ironwood dapat dipulihkan setelah peralihan di masa depan, selama peralihan tersebut terjadi tepat waktu.
- **"Zcash terlindungi sudah memiliki privasi post-quantum."** Hanya ketika penyerang tidak mengetahui alamat Anda. Alamat yang diketahui terekspos di setiap pool.
- **"Tachyon sudah menambahkan privasi post-quantum."** Tachyon adalah sebuah proposal. Belum ada satu pun dari proposal tersebut yang aktif.
- **"Komputer quantum merusak setiap bagian dari Zcash."** Fungsi hash hanya melemah, bukan rusak, oleh serangan quantum yang diketahui. Kemampuan pemulihan quantum bergantung tepat pada perbedaan tersebut.

<br/>

## Halaman terkait

- Keamanan Post-Quantum di Zcash](/zcash-tech/post-quantum-security) [
- [Ironwood](/zcash-tech/ironwood)
- [Turnstile ](/zcash-tech/the-turnstile)
- Proyek Tachyon](/zcash-tech/project-tachyon) [
- [FROST](/zcash-tech/frost)
- Pool terlindungi ](/using-zcash/shielded-pools) [

<br/>

## Sumber

- [ZIP 2005: Ironwood Pemulihan Quantum](https://zips.z.cash/zip-2005)
- [ZIP 229: Format Transaksi Versi 6](https://zips.z.cash/zip-0229)
- [ZIP 258: Penerapan Peningkatan Jaringan NU6.3](https://zips.z.cash/zip-0258)
- [ZIP 318: Migrasi Orchard ke Ironwood](https://zips.z.cash/zip-0318)
- [ZIP 326: Konsekuensi NU6.3 untuk Dompet](https://zips.z.cash/zip-0326)
- [ZIP 2003: Melarang transaksi versi 4](https://zips.z.cash/zip-2003)
- [ZIP 209: Melarang Saldo Pool Chain Terlindungi yang Negatif](https://zips.z.cash/zip-0209)
- [zips#1302: Pemulihan quantum dari subset protokol transparan](https://github.com/zcash/zips/issues/1302)
- [zips#1133: Privasi pasca-quantum untuk Zcash](https://github.com/zcash/zips/issues/1133)
- [zips#1307: Privasi Zcash terhadap penyerang quantum dan pemecah logaritma diskrit](https://github.com/zcash/zips/issues/1307)
- [zips#1134: Zcash](https://github.com/zcash/zips/issues/1134) yang sepenuhnya pasca-quantum
- [Roadmap Proyek Tachyon](https://tachyon.z.cash/roadmap/)
- [NU7 Hasil Polling: Apa yang Kami Dengar dan Ke Mana Kita Melangkah dari Sini](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [Blok 3,428,143 pada Blockchair](https://blockchair.com/zcash/block/3428143)
- [Permintaan Forum: Apakah Zcash pasca-quantum?](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
