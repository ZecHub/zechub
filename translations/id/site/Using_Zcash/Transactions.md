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

Zcash tidak menggunakan unit gas ala Ethereum. Biaya transaksi Zcash dibayarkan dalam ZEC, yang biasanya diukur dalam **zatoshis**. Satu ZEC sama dengan 100.000.000 zatoshis.

[ZIP 317](https://zips.z.cash/zip-0317) mendefinisikan mekanisme biaya konvensional yang berskala sesuai dengan kompleksitas transaksi. Alih-alih setiap transaksi menggunakan biaya tetap 1.000 zatoshi yang lama, biaya konvensional didasarkan pada "tindakan logis" seperti input, output, dan tindakan terlindungi. Transaksi sederhana biasanya dimulai sekitar 10.000 zatoshis, atau 0,0001 ZEC, dan transaksi yang lebih kompleks dapat membutuhkan lebih banyak lagi.

Di sebagian besar dompet saat ini, pengguna tidak perlu menghitung biaya ZIP 317 secara manual. Dompet tersebut harus memilih biaya yang sesuai secara otomatis. Jika sebuah dompet masih menggunakan biaya tetap lama atau membiarkan kamu menetapkan biaya jauh di bawah biaya konvensional ZIP 317, transaksi tersebut mungkin akan tertunda, dideprioritaskan, dibuang oleh beberapa node, atau gagal diteruskan dengan andal.

## Mengatasi Transaksi yang Tertahan

Sebuah transaksi Zcash tidak bersifat final hanya karena muncul di dompet kamu. Transaksi tersebut menjadi final untuk penggunaan biasa setelah ditambang ke dalam sebuah blok dan menerima konfirmasi yang cukup sesuai dengan situasi kamu. Exchange dan layanan lainnya mungkin memerlukan lebih banyak konfirmasi daripada yang ditampilkan oleh dompet secara default.

Gunakan pohon keputusan ini sebelum mengirim ulang:

1. **Apakah dompet kamu menampilkan ID transaksi?**
   - Jika tidak, dompet mungkin belum membuat atau menyiarkan transaksi tersebut. Periksa status sinkronisasi, koneksi internet, versi dompet, dan pesan kesalahan apa pun pada dompet.
   - Jika ya, salin ID transaksi dan lanjutkan.
2. **Apakah transaksi sudah dikonfirmasi dalam sebuah blok?**
   - Jika ya, tunggu jumlah konfirmasi yang diperlukan oleh dompet, exchange, merchant, atau layanan kamu.
   - Jika tidak, lanjutkan.
3. **Apakah transaksi telah mencapai expiry height miliknya?**
   - Jika tidak, jangan kirim ulang pembayaran yang sama secara manual. Transaksi asli mungkin masih bisa dikonfirmasi.
   - Jika ya, transaksi tersebut tidak dapat ditambang setelah expiry height tersebut. Dompet kamu mungkin menandainya sebagai kedaluwarsa atau gagal, dan kamu mungkin perlu membuat transaksi baru.
4. **Apakah transaksi muncul di satu server atau explorer tetapi tidak di yang lain?**
   - Anggap ini sebagai masalah visibilitas jaringan, bukan bukti bahwa transaksi telah gagal. Node yang berbeda dapat memiliki tampilan mempool yang berbeda.
   - Tunggu, sinkronkan ulang dompet kamu, atau beralih ke server terpercaya lainnya jika dompet kamu mendukung hal tersebut.
5. **Apakah transaksi menghilang setelah muncul sebagai terkonfirmasi?**
   - Reorganisasi rantai (chain reorganization) singkat dapat untuk sementara menghapus sebuah transaksi dari rantai terbaik.
   - Tunggu blok berikutnya. Jika transaksi muncul kembali, lanjutkan menunggu konfirmasi. Jika tidak muncul kembali dan kemudian kedaluwarsa, buatlah transaksi baru.
6. **Apakah dompet meminta kamu untuk mengirim ulang?**
   - Ikuti panduan terbaru dari dompet hanya setelah memastikan bahwa transaksi sebelumnya telah kedaluwarsa, gagal, atau tidak lagi valid.
   - Jika kamu ragu, hubungi dukungan sebelum mengirim kembali.

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