<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zgo_Payment_Processor.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Prosesor Pembayaran ZGo: Menerima Zcash Tanpa Kustodial

ZGo adalah pemroses pembayaran non-kustodial untuk Zcash. Seorang pelanggan membayar dalam ZEC dari dompet mereka sendiri, ZGo memantau blockchain Zcash untuk transaksi tersebut, dan dana tiba secara langsung di dompet merchant melalui transfer terlindungi. ZGo tidak pernah menahan uang tersebut di antaranya.

Panduan ini menjelaskan bagaimana alur pembayaran bekerja, cara menyiapkan akun, dan cara mengintegrasikan ZGo dengan Xero dan WooCommerce. Panduan ini juga membahas dua kesalahan yang menyebabkan sebagian besar masalah pada pengaturan pertama kali.

## Di halaman ini

1. [Mengapa menggunakan ZGo](#why-use-zgo)
2. [Cara kerja ZGo](#how-zgo-works)
3. [Menyiapkan akun](#setting-up-an-account)
4. [ZGo dengan Xero](#zgo-with-xero)
5. [ZGo dengan WooCommerce](#zgo-with-woocommerce)
6. [Fitur](#features)
7. [Kesalahan umum](#common-mistakes)
8. [Kesimpulan](#conclusion)
9. [Sumber daya](#resources)

## Mengapa menggunakan ZGo

Sebagian besar pemroses pembayaran cryptocurrency bersifat kustodial. Dana pertama-tama akan masuk ke akun pemroses dan baru kemudian diteruskan ke pedagang, yang berarti pihak ketiga mengontrol uang tersebut untuk sementara dan dapat membekukan, menunda, atau melaporkannya.

ZGo mengambil pendekatan sebaliknya. Pembayaran berpindah dari dompet pelanggan secara langsung ke dompet pedagang melalui transaksi terlindungi Zcash. Processor hanya membuat invoice dan memantau blockchain untuk konfirmasi. Tidak ada saldo perantara, tidak ada alur penarikan, dan tidak ada pihak ketiga yang dapat menunda penyelesaian.

Bagi seorang merchant, ini berarti tiga hal praktis: kustodial penuh atas ZEC yang masuk, privasi transaksi terlindungi secara default, dan tidak ada ketergantungan pada penyedia terpusat untuk tetap online atau solven.

## Cara kerja ZGo

Alur pembayarannya tetap sama terlepas dari apakah ZGo digunakan secara mandiri, melalui Xero, atau melalui WooCommerce:

1. Merchant membuat permintaan pembayaran di ZGo, yang akan muncul sebagai kode QR berisi jumlah pembayaran, ID invoice, dan alamat penerima Zcash.
2. Pelanggan memindai QR tersebut menggunakan dompet Zcash (tipe alamat Orchard, Sapling, dan Transparan semuanya didukung pada plugin WordPress) dan menyetujui pembayaran.
3. Transaksi disiarkan ke jaringan Zcash sebagai transfer terlindungi dari dompet pelanggan ke dompet merchant.
4. ZGo memantau blockchain Zcash untuk mencari transaksi tersebut.
5. Setelah lima konfirmasi, ZGo menandai pembayaran sebagai final dan memberi tahu integrasi apa pun yang terhubung (Xero, WooCommerce, atau webhook).

Ambang batas lima konfirmasi adalah angka kunci. Apa pun yang terjadi sebelum itu adalah pembayaran yang sedang diproses, bukan pembayaran yang telah diterima. Pemenuhan pesanan, pembaruan inventaris, dan tindakan apa pun yang tidak dapat dibatalkan di sisi pedagang harus menunggu hingga langkah ke-5.

ZGo berjalan di browser modern apa pun pada desktop atau seluler, tanpa perlu instalasi di kedua sisi. Pelanggan memerlukan dompet Zcash; pedagang memerlukan dompet Zcash dan akun ZGo.

<img width="672" height="378" alt="ringkasan permintaan pembayaran ZGo dan pemantauan blockchain" src="/content-images/de50885b-b068-4157-bbda-0981ca23efc8-a00a274776.webp" />

## Menyiapkan akun

Untuk membuat akun ZGo, diperlukan dompet Zcash dengan sejumlah kecil ZEC. Saldo ZEC yang kecil tersebut digunakan untuk menutupi biaya on-chain pada transaksi inisialisasi akun. Dompet Zcash utama apa pun dapat digunakan untuk hal ini; lihat [ZecHub Wallets](https://zechub.wiki/wallets) untuk opsi saat ini.

Pengaturan dasar:

1. Buka [zgo.cash](https://zgo.cash/) di browser.
2. Buat akun menggunakan dompet Zcash yang berada di bawah kendali merchant. Dompet ini harus memegang kunci. Alamat deposit exchange tidak akan berhasil (lihat [Kesalahan umum](#common-mistakes)).
3. Verifikasi dompet dengan mengirimkan transaksi inisialisasi kecil.
4. Konfigurasi alamat penerima. Semua pembayaran yang diproses melalui akun ini akan masuk ke dalam dompet ini.

Setelah akun aktif, merchant yang sama dapat menggunakan ZGo untuk pembayaran satu kali (satu kode QR di acara pop-up) atau mengintegrasikannya ke dalam pengaturan permanen melalui Xero atau WooCommerce.

## ZGo dengan Xero

[Xero](https://www.xero.com/) adalah platform akuntansi cloud yang digunakan oleh banyak bisnis kecil dan menengah. Integrasi ZGo–Xero memungkinkan pedagang untuk menerbitkan faktur di Xero, meminta pelanggan membayarnya dalam ZEC, dan membuat Xero secara otomatis menandai faktur tersebut sebagai lunas setelah transaksi terkonfirmasi.

Cara kerjanya:

1. Merchant membuat faktur di Xero seperti biasa.
2. ZGo menyertakan opsi pembayaran Zcash ke dalam faktur tersebut.
3. Pelanggan membayar dalam ZEC melalui dompet mereka.
4. ZGo memantau [blockchainZcash](https://z.cash/) untuk transaksi tersebut.
5. Setelah lima konfirmasi, ZGo melaporkan pembayaran kembali ke Xero, yang kemudian menandai faktur sebagai telah lunas.

ZEC mendarat di dompet pedagang, bukan di akun mana pun yang dikendalikan oleh ZGo atau dikendalikan oleh Xero. Catatan akuntansi di Xero tetap sinkron dengan penyelesaian on-chain secara otomatis.

Untuk pengaturan pertama kali, ikuti panduan khusus: [Konfigurasi Integrasi Xero](https://hedgedoc.vergara.tech/s/4iXC67fmb).

## ZGo dengan WooCommerce

Untuk toko online yang berjalan di [WooCommerce](https://woocommerce.com/) dan [WordPress](https://wordpress.org/), ZGo menyediakan plugin khusus. Plugin ini menambahkan Zcash sebagai metode pembayaran saat checkout dan menangani status pesanan secara otomatis ketika pembayaran terkonfirmasi.

<img width="672" height="378" alt="alur checkout dan pemesanan plugin ZGo WooCommerce" src="/content-images/55a791bb-1947-4f55-b5b9-55083be8ed49-2bc8d2571e.webp" />

Alur end-to-end di dalam toko WooCommerce:

1. Pelanggan mencapai halaman checkout dan memilih Zcash sebagai metode pembayaran.
2. Plugin menghasilkan permintaan pembayaran dan menampilkan kode QR pada halaman checkout.
3. Pelanggan membayar dari dompet mereka.
4. Transaksi disiarkan ke jaringan Zcash dan ZGo mulai memantaunya.
5. Setelah lima konfirmasi, ZGo melaporkan pembayaran tersebut sebagai final ke plugin.
6. Plugin menandai pesanan WooCommerce sebagai telah dibayar dan memperbarui database pesanan.

Pesanan hanya dibayar ketika langkah 6 selesai. Status sebelumnya (siaran, konfirmasi pertama) dapat ditampilkan kepada pelanggan sebagai "pembayaran diterima, menunggu konfirmasi," tetapi inventaris, pemenuhan, dan otomatisasi hilir lainnya harus menunggu status akhir.

Plugin ini juga menginstal dashboard administratif di dalam WordPress, di mana merchant dapat memantau pesanan dan pembayaran ZEC yang masuk bersamaan dengan tampilan pesanan WooCommerce yang normal. Plugin ini mendukung semua tipe alamat Zcash saat ini: Orchard, Sapling, dan Transparan. Pelanggan yang membayar dari dompet mana pun yang kompatibel dapat menyelesaikan transaksi tersebut.

## Fitur

**Non-kustodial.** Pembayaran berpindah langsung dari dompet pelanggan ke dompet pedagang melalui transaksi terlindungi. ZGo tidak pernah menahan dana di tengah proses, dan pedagang tetap memegang kendali penuh selama seluruh proses berlangsung.

**Penerapan fleksibel.** ZGo dapat digunakan untuk satu sore saja di pasar pop-up, untuk pengaturan titik penjualan permanen, atau sebagai backend untuk toko online melalui integrasi Xero atau WooCommerce.

**Berbasis browser.** Tidak perlu instalasi di sisi pelanggan maupun merchant. ZGo berjalan di browser modern apa pun pada desktop atau mobile.

**Kompatibilitas dompet.** Dompet Zcash utama, termasuk yang mendukung tipe alamat Orchard, Sapling, dan transparan, dapat membayar invoice ZGo tanpa konfigurasi tambahan di sisi pelanggan.

**Integrasi.** Integrasi langsung dengan Xero (akuntansi) dan WooCommerce (e-commerce) mencakup dua alur kerja merchant yang paling umum secara langsung.

## Kesalahan umum

**Menganggap pesanan telah dibayar sebelum lima konfirmasi.** Transaksi yang disiarkan tidak sama dengan pembayaran yang terkonfirmasi. Transaksi tersebut masih bisa gagal dikonfirmasi atau digantikan. Hanya setelah lima konfirmasi ZGo melaporkan pembayaran sebagai final, dan hanya pada saat itulah pesanan harus ditandai sebagai sudah dibayar di sistem downstream. Jika seorang merchant mengonfigurasi inventaris atau pemenuhan pesanan untuk dipicu oleh peristiwa siaran (broadcast), pembayaran yang menipu atau gagal akan menyebabkan kerugian nyata.

**Mengarahkan ZGo ke alamat deposit exchange.** Ini terlihat seperti alamat Zcash, tetapi alamat deposit exchange dikendalikan oleh exchange, bukan oleh merchant. Exchange memegang kunci, yang berarti exchange memegang dana, sehingga menghilangkan alasan penggunaan pemroses non-kustodial. Alamat dompet yang dikonfigurasi di ZGo haruslah dompet yang frasa pemulihannya dikendalikan secara langsung oleh merchant.

**Menganggap ZGo sebagai sebuah dompet.** ZGo adalah pemroses pembayaran, bukan sebuah dompet. Ia tidak menyimpan kunci, menahan saldo, atau membiarkan merchant menghabiskan dana. Sebuah dompet Zcash terpisah di bawah kendali merchant diperlukan untuk menerima uang yang diarahkan oleh ZGo.

## Kesimpulan

ZGo memberikan cara bagi merchant untuk menerima pembayaran Zcash tanpa harus menyerahkan kustodial, tanpa bergantung pada perantara, dan tanpa mengekspos detail transaksi pada chain publik. Kedua integrasi (Xero dan WooCommerce) mencakup alur kerja merchant yang paling umum; untuk hal lainnya, ZGo dapat digunakan secara mandiri dari browser apa pun.

Untuk pengaturan, jalannya singkat: dapatkan dompet Zcash, buat akun di [zgo.cash](https://zgo.cash/), dan kamu bisa langsung mulai membuat permintaan pembayaran atau menginstal integrasi yang relevan.

## Sumber Daya

- Situs web resmi [ZGo](https://zgo.cash/)
- Panduan konfigurasi integrasi [Xero](https://hedgedoc.vergara.tech/s/4iXC67fmb)
- [WooCommerce](https://woocommerce.com/) dan [WordPress](https://wordpress.org/)
- [Xero](https://www.xero.com/)
- Beranda proyek [Zcash](https://z.cash/)
- Dompet [ZecHub](https://zechub.wiki/wallets), daftar dompet Zcash yang kompatibel
- Ikhtisar [ZecHub Proses Pembayaran](https://zechub.wiki/payment-processors), ZGo dalam konteks opsi pembayaran Zcash lainnya
- Plugin [BTCPayServer Zcash](https://zechub.wiki/guides/btcpayserver-zcash-plugin), panduan ZecHub terkait untuk alternatif self-hosted