<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>


# Node Lightwallet Zcash

## Ringkasan Singkat

* Kebanyakan orang menggunakan Zcash melalui dompet light client, yang tidak mengunduh seluruh blockchain. Sebaliknya, ia berkomunikasi dengan server yang telah melakukan pekerjaan tersebut.
* Dua perangkat lunak melayani dompet light client saat ini: **lightwalletd**, layanan asli yang ditulis dalam Go, dan **Zaino**, indexer yang lebih baru yang ditulis dalam Rust.
* Kunci Anda tidak pernah meninggalkan perangkat Anda, dan server tidak dapat membelanjakan dana Anda atau membaca jumlah dan memo di dalam transaksi terlindungi secara penuh.
* Hal yang dapat diketahui dengan mudah oleh server adalah alamat IP Anda dan waktu aktivitas Anda — transaksi terlindungi melindungi apa yang terjadi di blockchain, bukan koneksi Anda ke server.
* Tor menghapus pengenal IP; fitur ini tersedia di dompet yang dibangun di atas `zcash_client_backend`, dan di ZODL fitur ini merupakan pengaturan di Pengaturan Lanjutan.
* Anda dapat mengubah server mana yang digunakan dompet Anda, atau menjalankan server Anda sendiri — baik lightwalletd maupun Zaino bersifat open source.

## Penjelasan Inti

Sebagian besar orang menggunakan Zcash melalui light wallet, yang tidak mengunduh seluruh blockchain. Sebaliknya, ia berkomunikasi dengan server yang telah melakukan pekerjaan tersebut. Halaman ini menjelaskan apa itu server-server tersebut, apa yang dapat dan tidak dapat mereka lihat tentang Anda, cara mengarahkan koneksi Anda melalui Tor, dan cara mengubah server yang digunakan oleh dompet Anda.

Dua perangkat lunak melayani light client saat ini. **lightwalletd** adalah layanan asli, yang ditulis dalam Go. **Zaino** adalah indexer yang lebih baru yang ditulis dalam Rust, dibangun sebagai bagian dari pekerjaan deprisiasi zcashd.

### Apa yang dilakukan oleh server light wallet

Sebuah server dompet light berada di antara dompet Anda dan blockchain Zcash serta memberikan tampilan rantai yang efisien dalam penggunaan bandwidth. Server ini melakukan tiga hal untuk Anda.

Ini menyajikan blok kompak. Alih-alih mengirimkan seluruh blok, ia mengirimkan bentuk kompak yang hanya membawa apa yang dibutuhkan oleh sebuah dompet untuk mendeteksi pembayaran ke alamat terlindung miliknya, mendeteksi pengeluaran dari note miliknya, dan memperbarui witness miliknya.

Ia meneruskan transaksi Anda. Saat Anda mengirim, dompet Anda menyerahkan transaksi yang telah selesai ke server, yang kemudian menyiarkannya ke jaringan.

Ini menjawab kueri chain, seperti tinggi saat ini dan informasi biaya yang diperlukan oleh dompet Anda.

Dompet Anda tetap melakukan pekerjaan privat secara lokal. Dompet tersebut menyimpan kunci Anda, melakukan dekripsi percobaan pada blok untuk menemukan catatan Anda, serta membuat dan menandatangani transaksi di perangkat Anda.

### Apa yang dapat dan tidak dapat dilihat oleh server

Ini adalah bagian yang mudah disalahpahami. Kunci Anda tidak pernah meninggalkan perangkat Anda, tetapi hal itu tidak sama dengan server tidak mempelajari apa pun tentang Anda.

Referensi di sini adalah model ancaman aplikasi dompet [Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), yang sangat layak dibaca secara lengkap jika Anda peduli dengan hal ini. Dokumen tersebut menetapkan beberapa jenis lawan. Yang relevan untuk halaman ini adalah lawan yang dapat memantau lalu lintas antara dompet Anda dan internet, serta antara server dan internet. Siapa pun yang menjalankan server tersebut secara inheren merupakan bagian dari posisi tersebut, karena dompet Anda terhubung langsung kepada mereka.

Mulailah dengan apa yang dilindungi. Terhadap setiap lawan dalam model ini, termasuk pihak yang telah mengompromikan server, sistem "tidak dapat mempelajari materi kunci kriptografi pengguna mana pun (spending keys, viewing keys, frasa pemulihan, dll.)", tidak dapat mencuri dana Anda, dan tidak dapat memaksa Anda mengirim dana yang tidak Anda maksudkan untuk dikirim. Jumlah dan memo di dalam transaksi terlindungi sepenuhnya tetap terenkripsi.

Kemudian terdapat hal-hal yang tidak terlindungi. Model ancaman mencantumkan hal-hal ini sebagai kelemahan yang diketahui terhadap lawan yang mengamati lalu lintas data:

| Kelemahan | Cara |
|:--|:--|
| Mengungkapkan siapa Anda | "Lawan mengetahui alamat IP pengguna, yang dapat mengarahkan mereka ke identitas asli pengguna" |
| Mengungkapkan perkiraan lokasi Anda | Mencari IP Anda "dalam database geolokasi untuk memperkirakan lokasi mereka" |
| Mengungkapkan kapan Anda mengirim atau menerima transaksi terlindungi | Pengiriman "menggunakan lebih banyak bandwidth, yang tetap terlihat meskipun koneksi terenkripsi". Model tersebut mencatat bahwa tindakan mengirim dan menerima dapat terlihat oleh server itu sendiri |
| Menghitung berapa banyak transaksi yang telah Anda lakukan dari waktu ke waktu | Pola bandwidth yang sama, diamati selama periode yang lebih lama |
| Mendeteksi pola pembayaran yang berulang | Mengamati kapan aktivitas terjadi |
| Mencari tahu apakah sebuah alamat adalah milik Anda | Seorang lawan yang sudah mengetahui sebuah alamat "dapat mengirim dana ke alamat tersebut dan memantau untuk melihat apakah ada lonjakan bandwidth" saat dompet Anda mengambilnya |

Model tersebut juga mencatat bahwa kasus biasa mengasumsikan "hubungan kepercayaan antara pengguna dan operator server lightwalletd".

Jadi, ringkasan jujurnya adalah sebagai berikut. Sebuah server light wallet tidak dapat membelanjakan uang Anda, dan tidak dapat membaca jumlah atau memo dalam transaksi terlindungi Anda. Hal yang dapat diketahui dengan mudah oleh server tersebut adalah alamat IP Anda dan waktu aktivitas Anda, dan keduanya secara bersama-sama dapat mengungkapkan banyak hal tentang seseorang. Transaksi terlindungi melindungi apa yang terjadi di blockchain. Namun, transaksi tersebut tidak, dengan sendirinya, menyembunyikan koneksi Anda ke server.

## Visual / Analogi

Bayangkan sebuah perpustakaan umum yang menyimpan setiap surat kabar yang pernah dicetak. Sebuah full node adalah seorang pembaca yang membawa pulang seluruh arsip tersebut ke rumah. Sebuah light wallet adalah seorang pembaca yang meminta ringkasan harian kepada pustakawan — selembar kertas tipis yang hanya berisi informasi yang cukup untuk mengetahui apakah ada sesuatu yang berkaitan dengan mereka.

Digest tersebut disegel: pustakawan menyusunnya tanpa dapat membaca item mana yang penting bagi Anda, dan Anda membukanya di rumah dengan kunci Anda sendiri. Itulah blok ringkas, dan proses pembukaannya adalah trial-decryption pada perangkat Anda.

Namun pustakawan tetap dapat melihat pembaca mana yang masuk, pada jam berapa, dan seberapa tebal bundel yang mereka bawa keluar. Hal tersebut adalah alamat IP dan waktu — terlihat dari meja kerja, tidak peduli seberapa rapat amplop tersebut disegel. Tor setara dengan mengirim kurir anonim: pustakawan tetap menyerahkan bundel yang sama, tetapi tidak lagi mengetahui ke rumah siapa bundel tersebut dikirim.

## Pendalaman Materi

### Perutean melalui Tor

Tor memutus hubungan antara alamat IP Anda dan lalu lintas dompet Anda, yang menghilangkan pengidentifikasi terkuat dalam tabel di atas.

Dukungan tersedia dalam pustaka Rust yang menjadi dasar bagi banyak dompet Zcash. zcash_client_backend menyertakan modul Tor yang dibangun di atas [Arti](https://tpo.pages.torproject.net/core/arti/), implementasi Tor dalam Rust, sehingga sebuah dompet dapat mengarahkan sinkronisasi, siaran transaksi, dan pencarian harga melalui Tor tanpa perlu menyertakan klien Tor terpisah.

Para pengembang Zaino mengajukan argumen yang sama, dengan mengutip model ancaman secara langsung: terdapat "kebutuhan untuk menggunakan protokol transport anonim (seperti Nym atau Tor) guna menyamarkan identitas client dari server pengindeksan Zcash".

Di **ZODL**, Tor adalah sebuah pengaturan dalam Pengaturan Lanjutan. Catatan rilis dompet mengarahkan pengguna ke mode koneksi manual "ditambah dengan mengaktifkan Tor di Pengaturan Lanjutan" jika mereka "lebih memilih untuk mengurangi paparan metadata", dan aplikasi menawarkan untuk menyalakan Tor sebelum Anda memulihkan dompet, yang merupakan saat di mana IP baru akan terhubung dengan seluruh riwayat dompet jika tidak dilakukan demikian.

Dua catatan penting. Tor menyembunyikan IP Anda dari server, tetapi tidak mengubah apa yang dipelajari server dari permintaan yang Anda buat. Dan onion routing menambah latensi, sehingga proses sinkronisasi memakan waktu lebih lama. Menjalankan server Anda sendiri menghindari masalah kepercayaan dengan cara yang berbeda, karena dalam hal ini operatornya adalah Anda.

### Zaino, indexer Rust

[Zaino](/zcash-tech/zaino) adalah sebuah indexer yang ditulis dalam Rust oleh tim Zingo, dibuat untuk menggantikan lightwalletd sebagai bagian dari pekerjaan deplesi zcashd. Ini melayani light client, full client, dan block explorer, dengan membaca data chain yang disimpan oleh "baik Zebra maupun validator full Zcashd".

Ini sedang dalam pengembangan aktif, dengan versi 0.8.0 yang dirilis pada Agustus 2026. Ini bertujuan untuk tetap kompatibel ke belakang dengan lightwalletd jika memungkinkan, sehingga dompet dapat terhubung dengannya tanpa perlu ditulis ulang.

Zaino memiliki halamannya sendiri dengan diagram arsitektur, sehingga halaman ini hanya mencakup perannya sebagai server dompet light.

### Menjalankan milik Anda sendiri

Opsi terkuat adalah menjadi operator Anda sendiri, yang sepenuhnya menghilangkan masalah kepercayaan. Kedua server bersifat open source: [lightwalletd](https://github.com/zcash/lightwalletd) dalam Go dan [Zaino](https://github.com/zingolabs/zaino) dalam Rust. Keduanya membaca dari validator full node, jadi Anda juga akan memerlukan [Zebra](/zcash-tech/zebra-full-node).

## Implikasi Praktis

### Daftar server

Dashboard [hosh.zec.rocks](https://hosh.zec.rocks/zec) melacak server publik dan kondisinya, serta merupakan tempat untuk memeriksa apa yang sebenarnya sedang aktif. [status.zec.rocks](https://status.zec.rocks/) menunjukkan status layanan.

Server yang terdaftar pada dasbor tersebut pada saat penulisan ini:

| Server | Catatan |
|:--|:--|
| zec.rocks:443 | Endpoint regional tercantum di sampingnya pada na.zec.rocks, eu.zec.rocks, ap.zec.rocks dan sa.zec.rocks |
| zec-node.cakewallet.com:443 | Berada di domain Cake Wallet |
| zec.0xrpc.io:443 | Dijalankan oleh 0xRPC, yang menawarkan endpoint publik gratis untuk sejumlah chain dan meminta donasi untuk menutupi kapasitas |
| zaino.unsafe.zec.rocks:443 | Sebuah instance Zaino. Perhatikan hostname-nya, perlakukan sebagai eksperimental |
| testnet.zec.rocks:443 | Testnet, dengan sebuah instance testnet Zaino yang tercantum di zaino.testnet.unsafe.zec.rocks |

Periksalah dashboard daripada mempercayai daftar ini. Operator datang dan pergi, dan halaman seperti ini dapat menjadi usang.

### Mengubah server di dompet Anda

Layak dilakukan jika Anda ingin memilih operator yang Anda percayai, menyebarkan aktivitas ke berbagai operator, atau menunjuk operator milik Anda sendiri.

Jalur menu di bawah ini sudah benar saat halaman ini diperbarui, namun antarmuka dompet dapat berubah, jadi anggaplah ini sebagai petunjuk dan bukan rute yang pasti. Carilah Pengaturan Lanjutan atau opsi server.

#### ZODL

Sebelumnya bernama Zashi. Klik ikon roda gigi di pojok kanan atas, lalu pilih Pengaturan Lanjutan. Tor berada di layar yang sama. ZODL juga menawarkan pintasan Switch server saat kegagalan sinkronisasi disebabkan oleh server yang sudah kedaluwarsa.

#### Ywallet

Ikon roda gigi di pojok kanan atas, lalu tab Zcash.

![Ywallet server settings](/content-images/b0a2910b-dbdf-4292-8e69-af5a386aa183-f51f098d19.webp)

#### Zingo

Menu hamburger di pojok kiri atas, lalu Settings, kemudian gulir ke bawah.

![Zingo server settings](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

Menu hamburger di pojok kiri atas, lalu Settings, kemudian Advanced.

![eZcash server settings](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Tangkapan layar tersebut diambil pada Maret 2025, dan aplikasi telah merilis pembaruan sejak saat itu, sehingga letak tombol mungkin telah berubah.

## Kesalahan Umum

**Berpikir bahwa server dapat membaca transaksi Anda**. Server tidak dapat melakukannya. Kunci Anda tetap berada di perangkat Anda, dan jumlah serta memo di dalam transaksi terlindungi sepenuhnya tetap terenkripsi — bahkan terhadap penyerang yang telah mengompromikan server tersebut.

**Membaca "terlindungi" sebagai "koneksi anonim"**. Transaksi terlindungi melindungi apa yang terjadi di dalam blockchain. Alamat IP Anda dan waktu aktivitas Anda adalah lapisan terpisah, dan lapisan itulah tepatnya yang dilihat oleh server.

**Dengan asumsi Tor menghapus setiap jejak**. Tor menyembunyikan IP Anda dari server, tetapi hal ini tidak mengubah apa yang dipelajari server dari permintaan yang Anda buat, dan menambahkan latensi pada proses sinkronisasi.

**Memercayai daftar server pada sebuah halaman wiki**. Operator datang dan pergi. Periksa [hosh.zec.rocks](https://hosh.zec.rocks/zec) untuk mengetahui apa yang sebenarnya sedang berjalan sebelum Anda mengarahkan dompet Anda ke apa pun.

## Ringkasan

Dompet light memberikan Anda pool terlindungi tanpa memerlukan ruang disk yang besar, yang merupakan pertukaran yang menguntungkan. Namun, bersikaplah jelas mengenai apa yang Anda pertukarkan. Server tidak dapat mengambil dana Anda atau membaca jumlah transaksi terlindungi Anda, tetapi server tersebut berada dalam posisi yang tepat untuk melihat alamat IP Anda dan kapan Anda melakukan transaksi. Gunakan rute melalui Tor, pilih operator Anda dengan sengaja, atau jalankan node Anda sendiri.

## Halaman Terkait

- [Siapa yang Dapat Melihat Zcash Pembayaran ](/start-here/who-can-see-your-zcash-payment) Anda — pandangan tingkat pemula untuk pertanyaan yang sama.
- [Apa yang Dapat Dilihat oleh Block Explorer ](/zcash-tech/what-a-block-explorer-can-see) — apa yang terlihat secara on-chain, berbeda dengan apa yang ada di server.
- [Zaino](/zcash-tech/zaino) — diagram arsitektur dan peran yang lebih luas dari Rust indexer.
- [Zebra Full Node ](/zcash-tech/zebra-full-node) — validator yang dibaca oleh server light wallet.
- [Zcash Sinkronisasi Dompet ](/zcash-tech/zcash-wallet-syncing) — bagaimana compact blocks yang dikirimkan oleh server diproses oleh dompet Anda.

**Terakhir diperbarui:** Agustus 2026