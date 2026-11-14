<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>


# Transaksi

ZEC adalah aset digital yang digunakan secara luas untuk pembayaran, menawarkan fitur privasi kuat yang membuatnya cocok untuk berbagai transaksi seperti membayar teman, melakukan pembelian, atau berdonasi. Untuk memaksimalkan privasi dan keamanan, sangat penting untuk memahami bagaimana berbagai jenis transaksi bekerja di dalam Zcash.

## Ringkasan Singkat

- Zcash mendukung dua jenis transaksi: **terlindungi**, yang menjaga detail tetap privat, dan **transparan**, yang mencatatnya secara publik.
- Alamat terlindungi dimulai dengan `u` atau `z`. Alamat transparan dimulai dengan `t` dan berperilaku sangat mirip dengan alamat Bitcoin.
- Pilihan ada di tanganmu pada setiap pembayaran. Privasi adalah opsi yang diberikan Zcash kepadamu, bukan pengaturan yang diputuskan orang lain untukmu.
- Menarik dana dari exchange adalah tempat paling umum di mana orang kehilangan privasi. Jika exchange hanya mendukung penarikan transparan, lindungi dana tersebut sendiri setelah sampai.
- Biaya mengikuti [ZIP 317](https://zips.z.cash/zip-0317) dan meningkat seiring dengan ukuran transaksi. Dompet yang masih mengirimkan biaya flat lama dapat melihat transaksi mereka tertunda.
- Sebagian besar transaksi Zcash memiliki expiry height di bawah [ZIP 203](https://zips.z.cash/zip-0203). Jika sebuah transaksi kedaluwarsa sebelum ditambang, transaksi tersebut tidak dapat dikonfirmasi setelah expiry height tersebut dan mungkin perlu dikirim ulang.

## Transaksi Terlindungi

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Penjelasan Zcash: Transaksi Terlindungi Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div >

---

Transaksi terlindungi terjadi saat kamu memindahkan ZEC ke dalam dompet terlindungi milikmu. Alamat dompet terlindungimu dimulai dengan `u` atau `z`. Saat mengirim transaksi terlindungi, kamu dan orang-orang yang bertransaksi denganmu dapat menjaga tingkat privasi yang tidak dimungkinkan pada jaringan pembayaran publik secara default.

Mengirim transaksi terlindungi paling mudah dilakukan saat kamu menggunakan dompet yang mendukung jaringan Zcash saat ini dan pool terlindungi saat ini. Sebelum mengandalkan sebuah dompet untuk privasi, periksa apakah dompet tersebut mendukung pengiriman terlindungi, penerimaan terlindungi, dan pool yang berencana kamu gunakan. Saat menarik ZEC dari sebuah exchange, periksa apakah exchange tersebut mendukung penarikan terlindungi atau transparan. Jika hanya mendukung penarikan transparan, pindahkan dana tersebut ke dompet yang mampu melakukan transaksi terlindungi setelah dana tiba.

Menggunakan transaksi terlindungi untuk mengirim dan menerima dana adalah cara terbaik untuk menjaga privasi dan mengurangi risiko kebocoran data pembayaran.

## Transaksi Transparan

Transaksi transparan bekerja secara serupa dengan transaksi Bitcoin. Detail transaksi dapat dilihat secara publik di blockchain, termasuk alamat transparan dan nilai transparan. Transaksi transparan sebaiknya dihindari ketika privasi menjadi prioritas.

Alamat transparan masih berguna dalam beberapa situasi, terutama ketika sebuah exchange atau layanan tidak mendukung alamat terlindungi. Jika kamu menerima ZEC ke alamat transparan, pertimbangkan untuk menjadikannya terlindungi sebelum melakukan pembayaran di kemudian hari.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Pelajari dompet terlindungi Zcash!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div >

## Cara Sederhana untuk Menggambarkannya

Transaksi transparan adalah sebuah kartu pos. Tukang pos mengantarkannya, tetapi siapa pun yang menanganinya di sepanjang jalan dapat membaca pesannya, melihat siapa yang mengirimnya, dan melihat siapa yang menerimanya.

Transaksi terlindungi adalah sebuah amplop tertutup. Layanan pos tetap mengonfirmasi bahwa ada surat asli dengan prangko asli yang melewati sistem tersebut, dan tidak ada seorang pun yang dapat memalsukannya atau mengirim surat yang sama dua kali. Apa yang ada di dalam amplop tersebut tetap menjadi rahasia antara pengirim dan penerima.

Bagian pentingnya adalah Zcash memungkinkan kamu memutuskan mana yang akan dikirim, pembayaran demi pembayaran.

## Biaya Zcash

Biarkan dompet kamu menghitung biaya jaringan, lalu periksa biaya tersebut sebelum mengirim. Biaya dibayarkan dalam ZEC: **1 ZEC = 100.000.000 zatoshis**. Biaya dalam dolar AS juga bergantung pada nilai tukar ZEC.

### Mengapa dua pembayaran bisa memiliki biaya yang berbeda

[ZIP 317](https://zips.z.cash/zip-0317#fee-calculation) menghitung biaya konvensional berdasarkan **aksi logis**, bukan berdasarkan persentase dari jumlah yang dikirim:

```text
fee in zatoshis = marginal fee × max(2, logical actions)
```

Logical action mengukur komponen transaksi. Sebagai contoh, transaksi yang hanya menggunakan Orchard memakai jumlah action Orchard-nya; transaksi yang hanya menggunakan Sapling memakai nilai yang lebih besar antara jumlah spend dan jumlah output-nya. Kontribusi dari pool yang berbeda dijumlahkan. Komponen transparan menggunakan perhitungan berbasis ukuran. Lihat ZIP 317 untuk rumus lengkapnya, termasuk Ironwood dan Sprout lama.

Membelanjakan banyak note kecil yang diterima atau menggunakan beberapa pool karena itu bisa memakan biaya lebih besar daripada pembayaran yang lebih sederhana dengan nilai yang sama. Jumlah penerima saja tidak bisa dijadikan kalkulator biaya: kembalian dan padding juga berpengaruh.

Contoh-contoh ini dimulai dengan jumlah aksi logis yang sudah dihitung:

| Aksi logis | Dengan 5.000 zatoshi per aksi | Dengan 1.000 zatoshi per aksi |
| --- | --- | --- |
| 2 | 10.000 zatoshi / 0,0001 ZEC | 2.000 zatoshi / 0,00002 ZEC |
| 3 | 15.000 zatoshi / 0,00015 ZEC | 3.000 zatoshi / 0,00003 ZEC |
| 10 | 50.000 zatoshi / 0,0005 ZEC | 10.000 zatoshi / 0,0001 ZEC |

### Biaya marginal mana yang berlaku

**Diperiksa 11 November 2026:** ZIP 317 mencantumkan revisi 2 dan [ZIP 2009](https://zips.z.cash/zip-2009) sebagai usulan. Sebelum revisi 2, biaya marginal adalah 5.000 zatoshi. Revisi 2 menetapkan 1.000, sehingga biaya minimumnya menjadi 2.000 zatoshi, bukan 10.000.

Proposal ini menetapkan ketinggian Mainnet **3,590,000**, yang diperkirakan tercapai sekitar 19 November 2026, dan ketinggian Testnet **4,465,026**. Perkiraan tanggal di kalender bukanlah syarat aktivasi. Bagi dompet, ketinggian yang relevan adalah blok tempat transaksi diperkirakan akan ditambang, sedangkan node menggunakan ketinggian blok berikutnya. Periksa kembali spesifikasi yang ditautkan dan panduan rilis dompetmu seiring perubahan pada proses deployment.

Jangan memaksakan biaya yang lebih rendah secara manual hanya karena sebuah proposal atau rilis software menyebutkannya. ZIP 2009 mengharuskan node menerapkan kebijakan relay yang baru sebelum dompet mengadopsi biaya tersebut; node yang masih menggunakan parameter lama dapat menolak me-relay transaksi dengan biaya yang lebih rendah. Testnet dan Mainnet juga memiliki ketinggian aktivasi yang berbeda.

### Jika perkiraannya terlihat salah

Pastikan dompetmu sudah diperbarui dan tersinkronisasi. Bandingkan biaya jaringannya dengan biaya penarikan dari layanan pengirim secara terpisah: kutipan biaya dari layanan bukanlah rumus ZIP 317. Untuk pembayaran yang masih tertunda, ikuti [langkah pemecahan masalah di bawah ini](#troubleshooting-stuck-transactions) sebelum mengirim ulang.

ZIP 317 adalah kebijakan dompet dan node, bukan aturan konsensus yang mewajibkan biaya persis seperti ini. Membayar biaya konvensional meningkatkan kompatibilitas relay, tetapi tidak menjamin waktu konfirmasi.

## Mengatasi Transaksi yang Tertahan

Sebuah transaksi Zcash tidak bersifat final hanya karena muncul di dompet kamu. Transaksi tersebut menjadi final untuk penggunaan biasa setelah ditambang ke dalam sebuah blok dan menerima konfirmasi yang cukup sesuai dengan situasi kamu. Exchange dan layanan lainnya mungkin memerlukan lebih banyak konfirmasi daripada yang ditampilkan oleh dompet secara default.

Masa kedaluwarsa adalah **tinggi blok**, bukan hitungan mundur tetap. Untuk pembayaran biasa dengan tinggi kedaluwarsa bukan nol, tinggi tersebut adalah blok terakhir tempat pembayaran itu masih bisa ditambang. Misalnya, pembayaran yang kedaluwarsa pada tinggi 3539 masih bisa dimasukkan ke dalam blok 3539, tetapi blok 3540 sudah terlambat. Tinggi kedaluwarsa 0 berarti pembayaran biasa tidak memiliki masa kedaluwarsa. Lihat [ZIP 203](https://zips.z.cash/zip-0203).

Default bukanlah batas waktu yang universal. ZIP 203 menetapkan 40 blok setelah Blossom, kira-kira 50 menit dengan target jarak blok 75 detik. Perubahan NU7 yang diusulkan merekomendasikan 120 blok dengan target jarak blok 25 detik, juga kira-kira 50 menit ([ZIP 218](https://zips.z.cash/zip-0218)). Pengaturan dan implementasi dompet bisa berbeda, dan interval blok yang sebenarnya bervariasi. Periksa expiry height dari transaksi tersebut alih-alih mengatur waktu pengiriman ulang.

Kedaluwarsa tidak membatalkan pembayaran yang sudah ditambang dan tidak membuat transaksi pengembalian dana. Jika transaksi asli kedaluwarsa tanpa ditambang, transaksi itu tidak pernah diselesaikan on-chain. Dompet kamu mungkin perlu melakukan sinkronisasi sebelum menampilkan dana terkait sebagai dana yang dapat dibelanjakan lagi.

Gunakan pohon keputusan ini sebelum mengirim ulang:

1. **Apakah dompet kamu menampilkan ID transaksi?**
   - Jika tidak, dompet mungkin belum membuat atau menyiarkan transaksi tersebut. Periksa status sinkronisasi, koneksi internet, versi dompet, dan pesan kesalahan apa pun dari dompet.
   - Jika ya, salin ID transaksi dan lanjutkan.
2. **Apakah transaksi sudah dikonfirmasi dalam sebuah blok?**
   - Jika ya, tunggu hingga jumlah konfirmasi yang diwajibkan oleh dompet, exchange, merchant, atau layanan kamu tercapai.
   - Jika tidak, lanjutkan.
3. **Apakah transaksi yang belum ditambang sudah melewati tinggi kedaluwarsa bukan nolnya?**
   - Jika belum, jangan mengirim ulang pembayaran yang sama secara manual dulu. Transaksi asli mungkin masih bisa terkonfirmasi.
   - Jika sudah, biarkan dompet melakukan sinkronisasi dan pastikan bahwa transaksi asli tidak ditambang pada atau sebelum tinggi tersebut. Kemudian ikuti panduan dompet untuk membuat transaksi pengganti jika diperlukan.
4. **Apakah transaksi muncul di satu server atau explorer tetapi tidak di yang lain?**
   - Anggap ini sebagai masalah visibilitas jaringan, bukan bukti bahwa transaksi gagal. Node yang berbeda dapat memiliki tampilan mempool yang berbeda.
   - Tunggu, sinkronkan ulang dompet kamu, atau beralih ke server tepercaya lain jika dompet kamu mendukungnya.
5. **Apakah transaksi menghilang setelah sempat terlihat terkonfirmasi?**
   - Reorganisasi chain singkat dapat menghapus transaksi untuk sementara dari chain terbaik.
   - Tunggu lebih banyak blok. Jika transaksi muncul kembali, terus tunggu hingga konfirmasi tercapai. Jika tidak muncul kembali dan kemudian kedaluwarsa, buat transaksi baru.
6. **Apakah dompet meminta kamu untuk mengirim ulang?**
   - Ikuti panduan dompet saat ini hanya setelah memastikan bahwa transaksi sebelumnya sudah kedaluwarsa, gagal, atau tidak lagi valid.
   - Jika kamu tidak yakin, tanyakan ke tim dukungan sebelum mengirim lagi.

## Tertunda, Kedaluwarsa, Dibatalkan, dan Reorged

- **Pending** berarti transaksi telah dibuat atau disiarkan tetapi belum ditambang ke dalam sebuah blok.
- **Expired** berarti tinggi kedaluwarsa (expiry height) transaksi telah terlewati. Di bawah ZIP 203, transaksi dengan expiry height tidak dapat ditambang setelah tinggi tersebut terlampaui.
- **Dropped** berarti satu atau lebih node tidak lagi menyimpan transaksi di dalam mempool mereka. Hal ini dapat terjadi karena kedaluwarsa, biaya rendah, kebijakan mempool, perilaku restart, atau perbedaan relay.
- **Reorged** berarti sebuah blok yang sebelumnya berisi transaksi tersebut bukan lagi bagian dari chain terbaik. Transaksi tersebut mungkin akan ditambang kembali nanti, atau dapat kembali ke status pending jika masih valid.

## Kapan Tidak Perlu Mengirim Ulang

Jangan langsung mengirim ulang hanya karena sebuah transaksi sedang tertunda, lambat, atau tidak muncul di salah satu explorer. Mengirim ulang terlalu dini dapat menyebabkan kebingungan dan, tergantung pada bagaimana dompet menyusun pembayaran baru tersebut, dapat berisiko melakukan pembayaran dua kali.

Tunggu atau dapatkan bantuan terlebih dahulu saat:

- Transaksi tersebut memiliki ID transaksi dan belum kedaluwarsa.
- Satu server menampilkannya sementara server lainnya tidak.
- Transaksi baru saja ditambang tetapi kehilangan konfirmasi setelah kemungkinan adanya reorg.
- Layanan penerima belum selesai menghitung konfirmasi.
- Dompet kamu masih dalam proses sinkronisasi.

Biasanya lebih aman untuk mengirim ulang hanya setelah dompet secara jelas menandai transaksi sebagai kedaluwarsa atau gagal, atau setelah tim dukungan mengonfirmasi bahwa transaksi asli tidak dapat dikonfirmasi.

## Pemeriksaan Aman Privasi

Kamu dapat memeriksa status transaksi dasar tanpa mengekspos informasi lebih dari yang diperlukan:

- Periksa apakah dompet kamu sudah tersinkronisasi sepenuhnya.
- Periksa apakah aplikasi dompet kamu sudah menggunakan versi terbaru.
- Periksa apakah transaksi tersebut memiliki ID transaksi.
- Periksa apakah transaksi berstatus konfirmasi, tertunda, kedaluwarsa, atau gagal.
- Periksa tinggi blok saat ini dan bandingkan dengan tinggi kedaluwarsa transaksi jika dompet kamu menampilkannya.
- Untuk transaksi transparan, block explorer dapat menunjukkan transaksi publik, alamat, nilai, dan konfirmasi.
- Untuk transaksi terlindungi, block explorer dapat menunjukkan bahwa suatu transaksi ada, tetapi tidak dapat menunjukkan detail pengirim terlindungi, penerima, jumlah, atau memo.

## Apa yang Tidak Boleh Dibagikan Secara Publik

Jangan pernah memposting ini di chat publik, media sosial, atau pelacak isu (issue tracker):

- Frasa pemulihan atau frasa recovery
- spending key, private key, atau cadangan dompet
- Full Viewing Key
- Tangkapan layar yang menunjukkan saldo, alamat lengkap, memo, kode QR, atau detail akun exchange
- Dokumen identitas pribadi atau catatan pemulihan akun

ID transaksi bersifat publik di dalam chain, tetapi hal ini tetap dapat menghubungkan pertanyaan dukungan kamu dengan identitas kamu. Jika privasi itu penting, bagikan ID tersebut hanya kepada saluran dukungan yang terpercaya.

## Apa yang Dibutuhkan Tim Dukungan

Saat meminta bantuan ke dukungan dompet, exchange, atau layanan, bagikan hanya informasi minimal yang berguna:

- Nama dompet atau layanan
- Versi aplikasi dan sistem operasi
- Apakah transaksi tersebut terlindungi, transparan, atau antara alamat terlindungi dan transparan
- ID transaksi, jika kamu merasa nyaman untuk membagikannya
- Perkiraan waktu pengiriman
- Apakah dompet sudah tersinkronisasi sepenuhnya
- Status saat ini yang ditampilkan oleh dompet
- Pesan kesalahan yang tepat, dengan data pribadi yang telah dihapus
- Tangkapan layar dengan saldo, alamat, memo, dan detail akun yang disembunyikan

Tim dukungan tidak memerlukan frasa pemulihan, spending key, private key, atau full viewing key milikmu.

## Kesalahan Umum

- **Mengasumsikan bahwa dompet apa pun yang mencantumkan ZEC dapat mengirimnya secara privat.** Sejumlah dompet multi-koin hanya mendukung sisi transparan dari Zcash. Periksa pool yang didukung oleh dompet tersebut sebelum kamu mengandalkannya untuk privasi. Halaman [Wallets](https://zechub.wiki/using-zcash/wallets) mencantumkan hal ini untuk setiap opsi.
- **Menarik dana ke alamat transparan dan membiarkan dana tersebut di sana.** Penarikan itu sendiri bersifat publik, dan setiap pergerakan selanjutnya dari alamat tersebut juga akan tetap publik. Lindungi dana tersebut dengan status terlindungi setelah dana tiba.
- **Menganggap privasi sebagai sesuatu yang cukup kamu aktifkan sekali saja.** Setiap transaksi adalah pilihan yang terpisah. Mengirim secara terlindungi hari ini tidak membatalkan pembayaran transparan yang kamu lakukan minggu lalu.
- **Menggunakan kembali alamat transparan untuk segala hal.** Karena aktivitas transparan terlihat secara permanen, satu alamat yang digunakan berulang kali secara bertahap akan menghubungkan pembayaran yang seharusnya tidak memiliki alasan untuk terhubung.
- **Mengirim dengan biaya default yang sudah usang.** Dompet yang belum mengadopsi ZIP 317 mungkin masih mengirimkan biaya flat lama, yang dapat menyebabkan transaksi tertahan tanpa konfirmasi.
- **Mengirim ulang sebelum kedaluwarsa.** Transaksi yang tertunda masih dapat terkonfirmasi hingga masa berlakunya habis. Periksa status kedaluwarsa sebelum membuat pembayaran lainnya.

## Catatan

Harap diperhatikan bahwa cara paling aman untuk menggunakan ZEC adalah dengan menggunakan transaksi terlindungi kapan pun pengirim, penerima, dompet, dan layanan semuanya mendukungnya. Beberapa dompet dan exchange mendukung [alamat terpadu](https://web.archive.org/web/20260823012524/https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), yang dapat menggabungkan beberapa jenis Zcash penerima ke dalam satu alamat.

## Sumber Daya

- [ZIP 203: Kedaluwarsa Transaksi](https://zips.z.cash/zip-0203)
- [ZIP 317: Mekanisme Biaya Transfer Proporsional](https://zips.z.cash/zip-0317)
- [Zcash ZIPs](https://zips.z.cash/)

## Halaman Terkait

- [Dompet](/using-zcash/wallets) - dompet mana yang mendukung pengiriman terlindungi, dan mana yang hanya transparan
- [Pengungkapan pembayaran](/zcash-tech/payment-disclosures) - bagaimana pengirim dapat membuktikan detail terpilih dari satu pembayaran terlindungi
- [Pool Terlindungi](/using-zcash/shielded-pools) - Sapling dan Orchard, pool tempat dana terlindungi kamu berada
- [Memo](/using-zcash/memos) - pesan terenkripsi yang dapat menyertai sebuah transaksi terlindungi
- [Alamat Exchange Transparan](/using-zcash/transparent-exchange-addresses) - alamat TEX dan alasan mengapa exchange menggunakannya
- [Exchange Kustodial](/using-zcash/custodial-exchanges) - exchange mana saja yang mendukung penarikan terlindungi

## Konverter ZEC ke ZAT