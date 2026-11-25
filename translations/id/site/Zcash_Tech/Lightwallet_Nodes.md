<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Zcash Node Lightwallet

## Ringkasan

* Kebanyakan orang menggunakan Zcash melalui light wallet, yang tidak mengunduh seluruh blockchain. Sebagai gantinya, light wallet berkomunikasi dengan server yang telah melakukan pekerjaan tersebut.
* Saat ini, tiga perangkat lunak umum melayani light wallet: **lightwalletd** (yang pertama, Go), **Zaino** (pengindeks Rust), dan ztreamer (pengindeks Rust berperforma tinggi dari Zcash Labs yang mendukung jaringan fastz.cash publik).
* Kunci Anda tidak pernah meninggalkan perangkat, dan server tidak dapat membelanjakan dana Anda atau membaca jumlah dan memo di dalam transaksi yang sepenuhnya terlindungi.
* Server dapat mengetahui alamat IP dan waktu aktivitas Anda — transaksi terlindungi menjaga informasi yang ada di blockchain, bukan koneksi Anda ke server.
* Tor menghilangkan identitas IP; fitur ini tersedia di dompet yang dibangun di atas `zcash_client_backend`, dan di ZODL berupa pengaturan di Advanced Settings.
* Anda dapat mengubah server yang digunakan dompet atau menjalankan server sendiri — lightwalletd, Zaino, dan ztreamer semuanya bersifat open source.

## Penjelasan Inti

Kebanyakan orang menggunakan Zcash melalui light wallet, yang tidak mengunduh seluruh blockchain. Sebagai gantinya, light wallet berkomunikasi dengan server yang telah melakukan pekerjaan tersebut. Halaman ini menjelaskan server tersebut, informasi yang dapat dan tidak dapat dilihatnya tentang Anda, cara merutekan koneksi melalui Tor, dan cara mengubah server yang digunakan dompet Anda.

Saat ini, tiga perangkat lunak umum melayani light wallet. **lightwalletd** adalah layanan pertama, yang ditulis dalam Go. **Zaino** adalah pengindeks yang lebih baru, ditulis dalam Rust dan dibuat sebagai bagian dari pekerjaan penghentian zcashd. **ztreamer** adalah pengindeks Rust berperforma tinggi dari Zcash Labs yang mendukung jaringan fastz.cash publik.

### Fungsi server light wallet

Server light wallet berada di antara dompet Anda dan blockchain Zcash, lalu menyediakan tampilan rantai yang hemat bandwidth. Server ini melakukan tiga hal untuk Anda.

Server menyediakan blok ringkas. Alih-alih mengirim seluruh blok, server mengirim bentuk ringkas yang hanya memuat informasi yang diperlukan dompet untuk mendeteksi pembayaran ke alamat terlindungi Anda, mendeteksi pembelanjaan catatan Anda, dan memperbarui saksi Anda.

Server meneruskan transaksi Anda. Saat Anda mengirim transaksi, dompet menyerahkan transaksi yang telah selesai kepada server, lalu server menyiarkannya ke jaringan.

Server menjawab kueri tentang rantai, seperti tinggi blok terkini dan informasi biaya yang diperlukan dompet Anda.

Dompet Anda tetap melakukan pekerjaan privat secara lokal. Dompet menyimpan kunci Anda, mencoba mendekripsi blok untuk menemukan catatan Anda, serta membuat dan menandatangani transaksi di perangkat Anda.

### Informasi yang dapat dan tidak dapat dilihat server

Bagian ini mudah disalahpahami. Kunci Anda tidak pernah meninggalkan perangkat, tetapi bukan berarti server tidak dapat mengetahui apa pun tentang Anda.

Acuan di sini adalah model ancaman aplikasi dompet [Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), yang sebaiknya dibaca secara lengkap jika Anda peduli dengan hal ini. Model tersebut menguraikan beberapa jenis adversari. Yang relevan untuk halaman ini adalah adversari yang dapat memantau lalu lintas antara dompet Anda dan internet, serta antara server dan internet. Siapa pun yang menjalankan server pada dasarnya berada di sebagian posisi tersebut karena dompet Anda terhubung langsung ke server itu.

Mari mulai dengan hal yang dilindungi. Terhadap semua adversari dalam model, termasuk pihak yang telah menyusupi server, adversari tersebut “tidak dapat mengetahui materi kunci kriptografis pengguna (spending key, viewing key, frasa pemulihan, dan sebagainya)”, tidak dapat mencuri dana Anda, dan tidak dapat membuat Anda mengirim dana yang tidak ingin Anda kirim. Jumlah dan memo di dalam transaksi yang sepenuhnya terlindungi tetap terenkripsi.

Lalu ada hal yang tidak dilindungi. Model ancaman mencantumkan kelemahan berikut terhadap adversari yang memantau lalu lintas:

| Kelemahan | Caranya |
|:--|:--|
| Mengetahui identitas Anda | “Adversari mengetahui alamat IP pengguna, yang dapat mengarah pada identitas asli pengguna” |
| Memperkirakan lokasi Anda | Mencari alamat IP Anda “di basis data geolokasi untuk memperkirakan lokasi mereka” |
| Mengetahui bahwa dan kapan Anda mengirim atau menerima transaksi terlindungi | Pengiriman “menggunakan lebih banyak bandwidth, yang terlihat meskipun koneksi dienkripsi”. Model tersebut mencatat bahwa tindakan mengirim dan menerima terlihat oleh server itu sendiri |
| Menghitung jumlah transaksi yang Anda lakukan dari waktu ke waktu | Pola bandwidth yang sama, diamati dalam periode yang lebih panjang |
| Menemukan pola pembayaran berulang | Mengamati kapan aktivitas terjadi |
| Mengetahui apakah suatu alamat milik Anda | Adversari yang sudah mengetahui sebuah alamat “dapat mengirim dana ke alamat tersebut dan mengamati apakah ada lonjakan bandwidth” saat dompet Anda mengambilnya |

Model tersebut juga mencatat bahwa skenario biasa mengasumsikan adanya “hubungan kepercayaan antara pengguna dan operator server lightwalletd”.

Jadi, ringkasan yang jujur adalah sebagai berikut. Server light wallet tidak dapat membelanjakan uang Anda dan tidak dapat membaca jumlah atau memo dalam transaksi terlindungi Anda. Server dapat mengetahui alamat IP dan waktu aktivitas Anda, dan kedua hal tersebut dapat mengungkapkan banyak informasi tentang seseorang. Transaksi terlindungi menjaga informasi yang ada di blockchain. Dengan sendirinya, transaksi tersebut tidak menyembunyikan koneksi Anda ke server.

## Visual / Analogi

Bayangkan sebuah perpustakaan umum yang menyimpan setiap surat kabar yang pernah dicetak. Full node adalah pembaca yang membawa pulang seluruh arsip. Light wallet adalah pembaca yang meminta pustakawan membuat ringkasan harian — selembar kertas tipis berisi informasi secukupnya untuk mengetahui apakah ada sesuatu yang berkaitan dengannya.

Ringkasan itu tersegel: pustakawan menyusunnya tanpa dapat membaca bagian mana yang penting bagi Anda, lalu Anda membukanya di rumah dengan kunci Anda sendiri. Itulah blok ringkas, dan proses membukanya adalah dekripsi percobaan di perangkat Anda.

Namun, pustakawan tetap melihat siapa yang datang, kapan mereka datang, dan seberapa tebal bundel yang mereka bawa pulang. Itulah alamat IP dan waktu aktivitas — terlihat dari meja pustakawan, seberapa baik pun amplopnya tersegel. Tor setara dengan mengirim kurir anonim: pustakawan tetap menyerahkan bundel yang sama, tetapi tidak lagi mengetahui ke rumah siapa bundel itu dikirim.

## Penjelasan Mendalam

### Merutekan melalui Tor

Tor memutus hubungan antara alamat IP dan lalu lintas dompet Anda, sehingga menghilangkan identitas terkuat dalam tabel di atas.

Dukungan tersedia di pustaka Rust yang menjadi dasar banyak dompet Zcash. zcash_client_backend menyertakan modul Tor yang dibangun di atas [Arti](https://tpo.pages.torproject.net/core/arti/), implementasi Rust untuk Tor, sehingga dompet dapat merutekan sinkronisasi, penyiaraan transaksi, dan pencarian harga melalui Tor tanpa menyertakan klien Tor terpisah.

Developer Zaino menyampaikan argumen yang sama dengan merujuk langsung pada model ancaman: ada “kebutuhan untuk menggunakan protokol transport anonim (seperti Nym atau Tor) guna mengaburkan identitas klien dari server pengindeks Zcash”.

Di **ZODL**, Tor tersedia sebagai pengaturan di Advanced Settings. Catatan rilis dompet mengarahkan pengguna ke mode koneksi manual “serta mengaktifkan Tor di Advanced Settings” jika mereka “ingin mengurangi paparan metadata”. Aplikasi ini juga menawarkan untuk mengaktifkan Tor sebelum Anda memulihkan dompet, yaitu saat alamat IP baru biasanya akan dikaitkan dengan seluruh riwayat dompet.

Ada dua hal yang perlu diperhatikan. Tor menyembunyikan alamat IP Anda dari server, tetapi tidak mengubah informasi yang dapat diketahui server dari permintaan yang Anda buat. Perutean onion juga menambah latensi, sehingga sinkronisasi berlangsung lebih lama. Menjalankan server sendiri menjawab persoalan kepercayaan dengan cara lain karena Andalah operatornya.

### Zaino, pengindeks Rust

[Zaino](/zcash-tech/zaino) adalah pengindeks yang ditulis dalam Rust oleh tim Zingo, dan dibuat untuk menggantikan lightwalletd sebagai bagian dari pekerjaan penghentian zcashd. Pengindeks ini melayani light client, full client, dan block explorer dengan membaca data rantai yang disimpan oleh “Zebra atau validator penuh zcashd”.

Perangkat lunak ini masih aktif dikembangkan, dengan versi 0.10.1 dirilis pada September 2026. Sebisa mungkin, perangkat lunak ini berupaya menjaga kompatibilitas mundur dengan lightwalletd agar dompet dapat menggunakannya tanpa perlu ditulis ulang.

Zaino memiliki halaman tersendiri yang memuat diagram arsitektur, jadi halaman ini hanya membahas perannya sebagai server light wallet.

### ztreamer dan fastz.cash

[ztreamer](https://github.com/zcashlabs/ztreamer) adalah pengindeks Zcash berperforma tinggi sekaligus server light wallet yang ditulis dalam Rust oleh Zcash Labs. Perangkat lunak ini dirancang untuk latensi rendah dan throughput tinggi, serta mendukung jaringan pengindeks publik [fastz.cash](https://forum.zcashcommunity.com/t/announcing-fastz-cash-rpc-by-zcash-labs/59478) (diumumkan pada 19 November 2026).

fastz.cash menjalankan server edge regional (saat ini di Frankfurt, London, Virginia, Oregon, São Paulo, Singapura, dan Osaka). Setiap wilayah memiliki full node dan indeks ztreamer lokal. TLS berakhir di node. Median terukur untuk waktu hingga respons pertama pada panggilan GetLatestBlock adalah sekitar 35 ms di seluruh dunia. Sinkronisasi rentang blok dilaporkan hingga ~3× lebih cepat dibandingkan lightwalletd versi terbaru, dengan jejak indeks yang kecil (~18 GB) sehingga lokasi edge tambahan dapat diterapkan dengan praktis.

Status dan endpoint terdekat: [status.fastz.cash](https://status.fastz.cash).

**Catatan privasi:** fastz.cash juga menjalankan layanan wallet-pir milik Valar Group. Pengguna Vizor dapat menggunakannya sekarang untuk kueri sinkronisasi privat yang mengurangi metadata yang dapat diketahui server tentang catatan atau rentang yang diminta. Ini adalah lapisan privasi tambahan di atas model ancaman light wallet yang dijelaskan sebelumnya; fitur ini tidak menggantikan Tor atau pilihan operator.

ztreamer bersifat open source dan dapat dijalankan secara mandiri (node Zakura tertanam atau mode jarak jauh). Seperti lightwalletd dan Zaino, ztreamer melayani protokol light wallet melalui gRPC. Perangkat lunak ini masih aktif dikembangkan dan diposisikan sebagai infrastruktur produksi sekaligus tempat uji untuk peningkatan protokol light wallet di masa depan.

### Menjalankan server sendiri

Pilihan terkuat adalah menjadi operator sendiri, sehingga persoalan kepercayaan sepenuhnya hilang. Ketiga server bersifat open source: [lightwalletd](https://github.com/zcash/lightwalletd) dalam Go, [Zaino](https://github.com/zingolabs/zaino) dalam Rust, dan [ztreamer](https://github.com/zcashlabs/ztreamer) dalam Rust. Server-server tersebut membaca data dari validator penuh, jadi Anda juga memerlukan [Zebra](/zcash-tech/zebra-full-node) atau Zakura. Server zec.rocks diterapkan dengan [Zcash Stack](/guides/zcash-stack), sebuah Helm chart open source dan kit Compose Docker yang menjalankan Zebra dan lightwalletd secara bersamaan.

## Implikasi Praktis

### Daftar server

Dashboard [hosh.zec.rocks](https://hosh.zec.rocks/zec) memantau server publik dan kondisinya, serta menjadi tempat untuk memeriksa server yang benar-benar aktif. [status.zec.rocks](https://status.zec.rocks/) menampilkan status layanan. Untuk jaringan fastz.cash, lihat [status.fastz.cash](https://status.fastz.cash).

Server yang tercantum di dashboard tersebut saat halaman ini ditulis:

| Server | Catatan |
|:--|:--|
| zec.rocks:443 | Endpoint regional juga tercantum di na.zec.rocks, eu.zec.rocks, ap.zec.rocks, dan sa.zec.rocks |
| zec-node.cakewallet.com:443 | Menggunakan domain Wallet Cake |
| zec.0xrpc.io:443 | Dijalankan oleh 0xRPC, yang menyediakan endpoint publik gratis untuk sejumlah chain dan meminta donasi untuk menanggung kapasitas |
| zaino.unsafe.zec.rocks:443 | Instans Zaino. Perhatikan nama host dan anggap sebagai eksperimental |
| testnet.zec.rocks:443 | Testnet, dengan instans testnet Zaino yang tercantum di zaino.testnet.unsafe.zec.rocks |
| rpc.fastz.cash | Jaringan ztreamer publik oleh Zcash Labs. Periksa status.fastz.cash untuk melihat endpoint regional dan kondisinya. |

Periksa dashboard alih-alih mengandalkan daftar ini. Operator bisa berhenti atau mulai beroperasi, dan informasi di halaman seperti ini bisa kedaluwarsa.

### Mengubah server di dompet Anda

Langkah ini berguna jika Anda ingin memilih operator yang Anda percayai, membagi aktivitas di antara beberapa operator, atau menggunakan server sendiri.

Jalur menu di bawah ini sesuai saat halaman diperbarui, tetapi antarmuka dompet bisa berubah. Anggap petunjuk ini sebagai panduan, bukan jalur yang pasti. Cari Advanced Settings atau opsi server.

#### ZODL

Sebelumnya Zashi. Ketuk ikon roda gigi di sudut kanan atas, lalu pilih Advanced Settings. Tor berada di layar yang sama. ZODL juga menyediakan pintasan Switch server saat kegagalan sinkronisasi disebabkan oleh server yang versinya sudah usang.

#### Zkool

Penerus Ywallet dari developer yang sama (Ywallet sendiri tidak lagi dipelihara dan tidak dapat mengikuti jaringan setelah Ironwood). Ketuk ikon roda gigi (Open Settings) di bagian atas layar akun, lalu pilih kolom Light Node Server. Tombol daftar di sebelahnya memungkinkan Anda memilih server yang dikenal, sedangkan pilihan Direct / Tor / Nym / Proxy di bawahnya mengatur cara dompet terhubung.

#### Zingo

Ketuk menu hamburger di sudut kiri atas, pilih Settings, lalu gulir ke bawah.

![Zingo server settings](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

Ketuk menu hamburger di sudut kiri atas, pilih Settings, lalu Advanced.

![eZcash server settings](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Tangkapan layar tersebut diambil pada Maret 2025, dan aplikasi telah merilis versi baru sejak saat itu, jadi letak tombol mungkin sudah berubah.

## Kesalahan Umum

**Mengira server dapat membaca transaksi Anda**. Server tidak dapat melakukannya. Kunci Anda tetap berada di perangkat, dan jumlah serta memo di dalam transaksi yang sepenuhnya terlindungi tetap terenkripsi — bahkan terhadap adversari yang telah menyusupi server.

**Mengartikan “terlindungi” sebagai “koneksi anonim”**. Transaksi terlindungi menjaga informasi yang ada di blockchain. Alamat IP dan waktu aktivitas Anda adalah lapisan terpisah, dan lapisan itulah yang terlihat oleh server.

**Menganggap Tor menghapus semua jejak**. Tor menyembunyikan alamat IP Anda dari server, tetapi tidak mengubah informasi yang dapat diketahui server dari permintaan Anda dan menambah latensi saat sinkronisasi.

**Memercayai daftar server di halaman wiki**. Operator bisa berhenti atau mulai beroperasi. Periksa [hosh.zec.rocks](https://hosh.zec.rocks/zec) dan [status.fastz.cash](https://status.fastz.cash) untuk mengetahui server yang benar-benar aktif sebelum menghubungkan dompet Anda ke server mana pun.

## Ringkasan

Light wallet menyediakan pool terlindungi tanpa memerlukan ruang disk, dan itu merupakan kompromi yang baik. Pahami saja hal yang Anda korbankan. Server tidak dapat mengambil dana Anda atau membaca jumlah transaksi terlindungi, tetapi server dapat mengetahui alamat IP dan waktu transaksi Anda. Rutekan koneksi melalui Tor, pilih operator dengan cermat, atau jalankan server sendiri.

## Halaman Terkait

- [Siapa yang Dapat Melihat Pembayaran Zcash](/start-here/who-can-see-your-zcash-payment) — penjelasan untuk pemula tentang pertanyaan yang sama.
- [Informasi yang Dapat Dilihat Block Explorer](/zcash-tech/what-a-block-explorer-can-see) — informasi yang terlihat secara on-chain, berbeda dari yang terlihat di server.
- [Zaino](/zcash-tech/zaino) — diagram arsitektur dan peran pengindeks Rust yang lebih luas.
- [Zinder](/zcash-tech/zinder) — pengindeks alpha milik Zcash Foundation, yang melayani light wallet melalui adaptor yang kompatibel dengan lightwalletd.
- [Zebra Full Node](/zcash-tech/zebra-full-node) — validator yang menjadi sumber data bagi server light wallet.
- [Zcash Sinkronisasi Dompet](/zcash-tech/zcash-wallet-syncing) — cara dompet Anda memproses blok ringkas yang dikirim server.
- [ztreamer](https://github.com/zcashlabs/ztreamer) — pengindeks Rust berperforma tinggi yang digunakan jaringan fastz.cash.

**Terakhir diperbarui:** November 2026
