<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Payment_Disclosures.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Proof pembayaran terlindungi dan pengungkapan pembayaran

## Ringkasan Singkat

- ID transaksi mengidentifikasi sebuah transaksi, tetapi tidak mengungkap penerima terlindungi, jumlah, atau memo.
- Pengungkapan pembayaran dirancang agar pengirim dapat membuktikan detail terpilih dari satu pembayaran tanpa mengekspos sisa riwayat dompet mereka.
- viewing key memberikan akses baca berkelanjutan ke sebuah alamat atau akun. Gunakan ini untuk audit berkelanjutan, bukan untuk perselisihan satu pembayaran.
- Pengungkapan pembayaran tidak dapat membuktikan pengiriman barang, mengidentifikasi seseorang secara mandiri, membatalkan pembayaran, atau menggantikan pemeriksaan konfirmasi.
- [ZIP 311](https://zips.z.cash/zip-0311) masih berupa **Draft**. Teks saat ini belum menyelesaikan dukungan Orchard, dukungan input-transparan, pengodean, penomoran versi, dan aturan antarmuka pengguna.

## Mengapa ID transaksi saja tidak cukup

Siapa pun dapat memeriksa detail publik dari pembayaran Zcash yang transparan. Sebuah block explorer dapat menunjukkan alamat, jumlah, dan status konfirmasi dari pembayaran tersebut.

Pembayaran terlindungi bekerja secara berbeda. Rantai tersebut membuktikan bahwa transaksi telah mengikuti aturan Zcash, tetapi tidak memublikasikan pengirim, penerima, jumlah, atau memo terlindungi. Membagikan ID transaksi dapat menunjukkan bahwa sebuah transaksi telah ditambang, tetapi tidak dapat membuktikan kepada pedagang atau pihak ketiga pembayaran pribadi mana yang ada di dalamnya.

Hal ini menciptakan masalah praktis. Seorang pelanggan mungkin perlu menyelesaikan perselisihan dengan pedagang, sebuah exchange mungkin perlu membuktikan bahwa mereka telah memproses penarikan, atau seorang donatur mungkin ingin membuktikan satu kontribusi. Membagikan viewing key secara penuh akan mengungkap jauh lebih banyak daripada yang dibutuhkan oleh kasus-kasus tersebut.

[ZIP 311: Zcash Pengungkapan Pembayaran](https://zips.z.cash/zip-0311) mengusulkan jawaban yang lebih sempit: mengungkapkan dan mengautentikasi informasi terpilih dari satu transaksi.

![A transaction ID proves that a transaction exists but does not reveal shielded payment details. A ZIP 311 payment disclosure would let a verifier authenticate only the selected recipient, amount, memo, and optional sender details against the mined transaction.](/content-images/payment-disclosure-proof-flow-208c033e06.webp)

## Bagaimana pengungkapan pembayaran bekerja

Alur dasarnya adalah:

1. Verifier memberikan tantangan atau referensi unik kepada pengirim, ketika sebuah interactive proof diperlukan.
2. Pengirim memilih transaksi dan output terlindungi yang akan diungkapkan.
3. Perangkat lunak dompet yang kompatibel membuat pengungkapan pembayaran yang terikat dengan transaksi tersebut dan, secara opsional, dengan tantangan tersebut.
4. Pengirim memberikan pengungkapan tersebut kepada verifier.
5. Verifier memperoleh transaksi asli dari node Zcash yang tepercaya, memeriksa bahwa transaksi tersebut telah ditambang, dan memverifikasi pengungkapan terhadap transaksi tersebut.
6. Hasil yang valid hanya mengonfirmasi klaim yang terkandung dalam pengungkapan tersebut.

Desain Sapling dari ZIP menggunakan kunci cipher keluar untuk memulihkan setiap output yang dipilih. Hal ini dapat mengungkap penerima, jumlah, dan memo dari output tersebut. Ini juga memerlukan proof otoritas pengeluaran untuk setidaknya satu input transaksi, sehingga seseorang yang hanya melihat transaksi tersebut tidak dapat membuat pengungkapan valid seolah-olah mereka yang mengirimnya.

Pengungkapan pembayaran Sapling tidak harus mengungkapkan alamat pengirim. Otoritas pengeluaran dapat mengontrol banyak alamat yang beragam, sehingga membuktikan kontrol atas pengeluaran tersebut tidak secara otomatis mengidentifikasi satu alamat. ZIP 311 mencakup sebuah address proof opsional untuk kasus-kasus di mana menghubungkan proof tersebut ke alamat pengirim yang diketahui sangat diperlukan.

## Pengungkapan pembayaran atau viewing key?

| Metode | Penggunaan terbaik | Apa yang diungkapkan | Akses berkelanjutan? | Terikat secara kriptografis dengan pembayaran? |
| --- | --- | --- | --- | --- |
| ID Transaksi | Memeriksa bahwa sebuah transaksi telah ditambang | Data transaksi publik dan konfirmasi | Tidak | Ya, tetapi detail pembayaran terlindungi tetap tersembunyi |
| Tangkapan layar atau tanda terima | Pencatatan informal | Apa pun yang dipilih pengirim untuk ditampilkan | Tidak | Tidak; gambar dapat diedit |
| Pengungkapan pembayaran | Membuktikan detail terpilih dari satu pembayaran | Output transaksi terpilih dan setiap sender proof atau challenge proof yang disertakan | Tidak, tetapi proof yang dibagikan dapat disalin | Ya |
| Incoming Viewing Key | Memantau pembayaran yang diterima oleh sebuah akun | Aktivitas masuk yang dicakup oleh key tersebut | Ya | Ini mendekripsi pembayaran masuk yang sesuai |
| Full Viewing Key | Akuntansi atau audit sebuah akun | Aktivitas masuk dan keluar, jumlah, memo, dan saldo yang dicakup oleh key tersebut | Ya | Ini mendekripsi aktivitas akun yang sesuai |

Gunakan pengungkapan terkecil yang dapat menjawab pertanyaan tersebut. Perselisihan pedagang mengenai satu pembayaran biasanya tidak membenarkan akses ke setiap pembayaran dalam sebuah akun. Seorang akuntan yang harus meninjau seluruh periode pelaporan mungkin memerlukan viewing key sebagai gantinya.

Kedua metode tersebut tidak memberikan izin untuk membelanjakan dana. Jangan pernah membagikan frasa pemulihan, spending key, private key, atau cadangan dompet sebagai bukti pembayaran.

![A transaction record is available today but provides no new third-party proof. A payment disclosure would prove selected details of one payment. A viewing key provides broader, ongoing visibility.](/content-images/payment-disclosure-scope-0585cdc075.webp)

## Apa yang bisa saya gunakan hari ini?

Tidak ada dompet saat ini yang diidentifikasi di sini sebagai pengimplementasi pembuatan atau verifikasi ZIP 311 pengungkapan pembayaran. ZIP masih berupa draf dan mencantumkan implementasi referensinya sebagai "TBD." Alat-alat yang dikelola berikut ini masih dapat membantu pengirim, penerima, atau auditor resmi untuk memeriksa catatan yang tersedia saat ini:

| Aplikasi | Berguna saat ini untuk | Batasan penting |
| --- | --- | --- |
| [Zkool](https://github.com/hhanh00/zkool2) | Melihat metadata transaksi yang terperinci, jumlah, input dan output pool, serta memo; mengimpor viewing key Unified atau Sapling ke dalam akun view-only | Tidak mengiklankan pembuatan atau verifikasi pengungkapan ZIP 311 |
| [Zingo PC](https://github.com/zingolabs/zingo-pc) | Meninjau riwayat transaksi terlindungi dan memo; mengimpor Full Viewing Key Unified dalam mode read-only | Rekaman dompet atau akun read-only bukanlah pengungkapan pembayaran dengan cakupan selektif |
| [Zallet](https://zcash.github.io/zallet/) | Alur kerja operator menggunakan `z_viewtransaction`, `z_exportviewingkey`, dan `z_importviewingkey` | Perangkat lunak Beta; viewing key dan RPC transaksi miliknya adalah rekaman yang lebih luas atau lokal, bukan ZIP proof 311 |

Gunakan dompet yang pertama kali mengirim atau menerima pembayaran tersebut. Periksa detail transaksi, memo, ID transaksi, dan konfirmasinya, lalu mintalah pihak lain untuk membandingkan detail tersebut dengan catatan mereka sendiri. Jangan menginstal dompet baru dan memasukkan frasa pemulihan hanya demi menghasilkan bukti. Jika auditor memerlukan visibilitas berkelanjutan, pertimbangkan penggunaan akun view-only yang kompatibel dan pahami cakupan dari viewing key sebelum membagikannya.

Aplikasi-aplikasi ini adalah alternatif praktis untuk memeriksa catatan, bukan proof bahwa pengungkapan pembayaran terstandarisasi tersedia. Tangkapan layar dapat membantu orang membandingkan catatan, tetapi dapat diedit dan bukan merupakan cryptographic proof.

## Di mana pengungkapan pembayaran berlaku

### Perselisihan pedagang

Seorang pelanggan dapat membuktikan bahwa jumlah tertentu telah dikirim ke alamat terlindungi milik pedagang. Proof tersebut tidak menetapkan bahwa barang telah dikirim, bahwa pengembalian dana terutang, atau bahwa orang yang menyajikannya memiliki identitas hukum tertentu. Pertanyaan-pertanyaan tersebut masih bergantung pada catatan pesanan dan kesepakatan para pihak.

### Penarikan terlindungi

ZIP 311 mencantumkan penarikan terlindungi sebagai target penggunaan: sebuah exchange akan membuktikan penerima dan jumlahnya tanpa mempublikasikan detail tersebut secara on-chain. Proof input-transparan miliknya masih belum selesai, sehingga ini belum menjadi alur kerja standar yang lengkap. Pelanggan juga harus memeriksa status konfirmasi transaksi secara mandiri.

### Donasi

Seorang donor atau kampanye dapat membuktikan kontribusi tertentu sambil tetap menjaga pembayaran yang tidak terkait agar tetap privat. Memublikasikan pengungkapan tersebut membuat detail terpilih menjadi publik bagi siapa saja yang menerima salinannya, sehingga saluran verifikasi privat lebih aman ketika proof publik tidak diperlukan.

### Akuntansi

Gunakan pengungkapan pembayaran saat seorang akuntan membutuhkan bukti untuk satu transaksi. Gunakan viewing key paling terbatas yang sesuai saat akuntan membutuhkan akses berkelanjutan ke banyak transaksi atau periode pelaporan yang lengkap.

## Alur kerja yang aman secara privasi

ZIP 311 belum menjadi standar dompet yang selesai dan dapat diterapkan secara luas. Ketika alat pengirim dan verifikator yang kompatibel tersedia, gunakan daftar periksa ini:

1. **Konfirmasikan kompatibilitas terlebih dahulu.** Kedua alat harus mendukung format pengungkapan yang sama dan pool terlindungi yang digunakan oleh pembayaran tersebut.
2. **Selesaikan masalah umum terlebih dahulu.** Periksa sinkronisasi dompet, ID transaksi, jumlah konfirmasi, status kedaluwarsa, dan catatan penerima sebelum mengungkapkan detail pribadi.
3. **Ajukan sebuah tantangan.** Untuk sebuah perselisihan, verifikator harus memberikan nomor pesanan baru atau tantangan acak agar pengungkapan tersebut terikat dengan permintaan tersebut.
4. **Pilih hanya output yang diperlukan.** Jangan sertakan output yang tidak terkait dari transaksi yang sama.
5. **Pratinjau setiap field yang diungkapkan.** Periksa penerima, jumlah, memo, proof alamat pengirim, dan tantangan sebelum melakukan ekspor.
6. **Bagikan melalui saluran pribadi.** Sebuah pengungkapan bukanlah spending key rahasia, tetapi siapa pun yang menerimanya dapat menyimpan atau mendistribusikan kembali informasi yang diungkapkannya.
7. **Verifikasi terhadap chain.** Verifikator harus mengambil transaksi yang tepat dari node terpercaya, mengonfirmasi bahwa transaksi tersebut berada dalam jaringan dan blok yang dituju, lalu memvalidasi pengungkapan tersebut.
8. **Catat hasilnya, bukan rahasia tambahan.** Simpan hanya apa yang diperlukan oleh proses perselisihan, penarikan, donasi, atau akuntansi.

Jika dompet tidak dapat menghasilkan pengungkapan, jangan mengganti dengan full viewing key tanpa memahami cakupan luas dan permanennya. Tanyakan apakah penerima dapat mengonfirmasi pembayaran dari catatan dompet mereka sendiri atau menerima catatan yang kurang sensitif sebagai gantinya.

## Apa yang tidak dapat dibuktikan oleh pengungkapan yang valid

Verifikasi yang berhasil tidak membuktikan:

- Bahwa transaksi tersebut memiliki konfirmasi yang cukup sesuai dengan kebijakan risiko verifikator
- Bahwa reorganisasi chain tidak dapat menghapus transaksi terbaru
- Bahwa barang atau jasa telah dikirimkan
- Bahwa pengembalian dana atau chargeback diperlukan
- Bahwa pengirim mengendalikan alamat tertentu, kecuali jika proof alamat yang sesuai disertakan
- Bahwa orang yang menyajikan pengungkapan tersebut memiliki identitas dunia nyata yang diklaim
- Bahwa output yang tidak diungkapkan, transaksi lain, atau saldo dompet memiliki nilai tertentu
- Bahwa pengungkapan tetap bersifat pribadi setelah dibagikan

Verifikator harus memeriksa penyertaan rantai dan status konfirmasi secara terpisah. Prosedur verifikasi ZIP 311 mengasumsikan bahwa pemanggil telah memperoleh transaksi yang telah ditambang beserta tinggi bloknya.

## Batasan saat ini

Anggap ZIP 311 sebagai standar yang diusulkan, bukan sebagai janji bahwa dompet saat ini memiliki tombol **Prove payment** yang berfungsi.

Draf saat ini menentukan pengeluaran dan output Sapling, tetapi masih berisi item yang belum selesai untuk Orchard, input transparan, pengodean pengungkapan, penomoran versi, dan bagaimana dompet harus menampilkan berbagai tingkat validitas. Implementasi referensinya juga tercantum sebagai "TBD." Sebagaimana tertulis, draf ini tidak mendefinisikan pengungkapan pembayaran untuk pembayaran Orchard atau Ironwood.

Pengirim juga mungkin tidak dapat mengungkapkan sebuah output jika transaksi tersebut sengaja dibuat tanpa viewing key keluar untuk output tersebut. ZIP 311 mempertahankan pilihan privasi tersebut alih-alih membuat jalur pemulihan baru.

Dokumentasi lama menjelaskan perintah eksperimental `z_getpaymentdisclosure` dan `z_validatepaymentdisclosure` di dalam `zcashd`. Perintah tersebut hanya mendukung **output Sprout JoinSplit**, bukan desain Sapling pada ZIP 311, dan telah usang. `zcashd` mencapai penghentian akhir Dukungan-nya (End-of-Support) pada Juli 2026. Jangan gunakan panduan lama tersebut sebagai instruksi untuk dana saat ini.

Kesenjangan ini tidak membuat ide tersebut menjadi tidak berguna. Hal ini menjelaskan mengapa sebuah panduan yang cermat harus memisahkan model privasi dan kasus penggunaan dari perangkat lunak yang sudah siap untuk pengguna biasa.

## FAQ

### Bisakah saya membuktikan pembayaran terlindungi hanya dengan ID transaksi?

Tidak. ID tersebut dapat mengidentifikasi transaksi dan status konfirmasinya, tetapi penerima terlindungi, jumlah, dan memo tidak bersifat publik.

### Apakah pengungkapan pembayaran sama dengan viewing key?

Tidak. Sebuah pengungkapan hanya mencakup detail terpilih dari satu transaksi. Sebuah viewing key dapat mengungkap aktivitas yang sesuai untuk sebuah alamat atau akun dari waktu ke waktu.

### Bisakah penerima membuat proof pengirim?

Tidak di bawah desain ZIP 311. Sebuah pengungkapan yang valid harus membuktikan otoritas pengeluaran untuk setidaknya satu input. Penerima dapat mengonfirmasi pembayaran menggunakan catatan dompet mereka sendiri, tetapi itu adalah klaim yang berbeda.

### Bisakah saya membatalkan pengungkapan setelah membagikannya?

Tidak. Ini tidak memberikan akses akun di masa mendatang seperti viewing key, tetapi data dan proof yang terungkap dapat disalin. Bagikanlah dengan sangat hati-hati sebagaimana Anda menjaga catatan keuangan pribadi lainnya.

### Apakah verifikasi memindahkan atau mengunci ZEC apa pun?

Tidak. Membuat atau memverifikasi pengungkapan tidak akan membelanjakan, mengembalikan, membekukan, atau membatalkan dana.

### Apa yang harus saya gunakan hari ini jika dompet saya tidak memiliki fitur pengungkapan?

Mulailah dengan catatan dompet penerima, ID transaksi dan status konfirmasi, referensi faktur dalam memo terenkripsi, atau tanda terima lain yang disepakati bersama. Gunakan viewing key hanya ketika cakupan luasnya benar-benar diperlukan dan dipahami.

## Sumber Daya

- [ZIP 311: Zcash Pengungkapan Pembayaran](https://zips.z.cash/zip-0311) - rancangan draf, persyaratan, proses verifikasi, dan pertimbangan privasi
- [ZIP 310: Properti Keamanan dari Sapling Viewing Keys](https://zips.z.cash/zip-0310) - apa yang diungkapkan oleh viewing keys dan jaminan apa yang mereka berikan
- [ZIP 304: Sapling Tanda Tangan Alamat](https://zips.z.cash/zip-0304) - mekanisme address-proof opsional yang dirujuk oleh ZIP 311
- [Zcash spesifikasi protokol](https://zips.z.cash/protocol/protocol.pdf) - Sapling enkripsi catatan, viewing keys keluar, dan otorisasi pengeluaran
- [Arsip zcashd dokumen pengungkapan pembayaran](https://github.com/zcash/zcash/blob/master/doc/payment-disclosure.md) - implementasi historis Sprout-only, bukan panduan saat ini
- [zcashd fitur yang sudah usang](https://zcash.github.io/zcash/user/deprecation.html) - status dari perintah pengungkapan eksperimental lama

## Halaman terkait

- [Transaksi](/using-zcash/transactions) - pembayaran terlindungi, konfirmasi, dan pemecahan masalah transaksi
- [Viewing keys](/zcash-tech/viewing-keys) - akses baca-saja berkelanjutan dan opsi ekspor saat ini
- [Apa yang dapat dilihat oleh block explorer](/zcash-tech/what-a-block-explorer-can-see) - field transaksi publik dan privat
- [Menyimpan catatan dengan ZEC](/zcash-use-cases/keeping-records-with-shielded-zec) terlindungi - akuntansi tanpa mempublikasikan riwayat dompet