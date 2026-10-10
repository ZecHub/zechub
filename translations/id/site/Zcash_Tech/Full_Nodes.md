<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Full Node

## Ringkasan Singkat

- Sebuah full node menyimpan salinan lengkap dari blockchain Zcash dan memeriksa setiap blok serta transaksi baru terhadap aturan konsensus.
- Zebra (`zebrad`) adalah node yang harus diinstal saat ini. Zakura adalah implementasi kedua, yang merupakan fork dari Zebra.
- zcashd telah dipensiunkan. Penghentian Akhir Dukungan (End-of-Support) telah tercapai pada 18 Juli 2026 pada ketinggian blok 3417100, dan node tersebut tidak lagi dapat dijalankan.
- Node dan dompet kini merupakan program yang terpisah. [Zallet](https://github.com/zcash/zallet) berjalan terhadap sebuah node dan menyimpan kunci.
- Menjalankan node Anda sendiri memberikan verifikasi independen dan menghilangkan kebutuhan untuk mempercayai server orang lain.

## Penjelasan Inti

Full Node adalah perangkat lunak yang menjalankan salinan lengkap dari blockchain suatu mata uang kripto, yang memberi Anda akses ke fitur-fitur protokol tersebut.

Ia menyimpan catatan lengkap dari setiap transaksi yang telah terjadi sejak genesis dan oleh karena itu mampu memverifikasi validitas transaksi dan blok baru yang ditambahkan ke blockchain.

## Implementasi Node

### Zebra

Zebra adalah implementasi full node mandiri dan siap produksi dari protokol Zcash, yang dibuat oleh Zcash Foundation dan ditulis dalam Rust. Karena zcashd telah dipensiunkan, Zebra (`zebrad`) adalah full node yang direkomendasikan untuk penerapan baru.

Zebra memvalidasi blok dan transaksi, berpartisipasi dalam jaringan peer-to-peer, dan menyediakan antarmuka RPC untuk aplikasi. Dompet kini menjadi komponen terpisah: [Zallet](https://github.com/zcash/zallet) berjalan terhadap sebuah node Zebra dan menangani kunci serta saldo. Ini menggantikan zcashd, yang menyatukan node dan dompet dalam satu proses tunggal.

Untuk melayani dompet light terlindungi, node berjalan bersama dengan sebuah indexer, baik [lightwalletd](https://github.com/zcash/lightwalletd) yang sudah mapan maupun [Zaino](https://zechub.wiki/zaino) yang lebih baru.

Pastikan Anda membaca buku Zebra untuk instruksi pengaturan, dan bergabunglah dengan server Discord R&D untuk mendapatkan dukungan.

[Github](https://github.com/ZcashFoundation/zebra/)

Buku ](https://zebra.zfnd.org)Zebra dari [

Lihat [Zebra Full Node](/zcash-tech/zebra-full-node) untuk langkah-langkah instalasi, konfigurasi, dan persyaratan perangkat keras.

### Zakura

Zakura adalah full node kedua yang kompatibel dengan konsensus, yang merupakan fork dari Zebra dan dikembangkan oleh Valar Group bersama dengan Project Tachyon. Ini mengikuti aturan protokol yang sama dan menambahkan sinkronisasi yang lebih cepat, pemangkasan blok (block pruning), serta lapisan kompatibilitas RPC zcashd. Lihat [Zakura Node](/zcash-tech/zakura-node).

### zcashd (pensiun)

> **Catatan:** zcashd telah dipensiunkan. Electric Coin Company [telah mengumumkan penghentian penggunaan](https://z.cash/support/zcashd-deprecation/), dan penghentian otomatis Akhir-Dukungan (End-of-Support) tercapai pada 18 Juli 2026 pada ketinggian blok 3417100. Setiap zcashd 6.20.0 node yang tidak dimodifikasi berhenti beroperasi pada ketinggian tersebut dan menolak untuk memulai ulang, dan perangkat lunak ini tidak mendukung NU6.3. Gunakan Zebra. Jika Anda memegang zcashd `wallet.dat`, ikuti [Panduan Migrasi: zcashd ke Zebrad/Zallet](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet).

zcashd adalah implementasi Full Node asli untuk Zcash, yang dikembangkan dan dikelola oleh Electric Coin Company. Instruksi build di bawah ini tetap disertakan sebagai referensi dan bagi operator yang bermigrasi dari zcashd.

Zcashd mengekspos sekumpulan API melalui antarmuka RPC-nya. API ini menyediakan fungsi yang memungkinkan aplikasi eksternal untuk berinteraksi dengan node.

[Lightwalletd](https://github.com/zcash/lightwalletd) adalah contoh aplikasi yang menggunakan full node untuk memungkinkan developer membangun dan memelihara dompet ringan terlindungi yang ramah seluler tanpa harus berinteraksi secara langsung dengan Zcashd.

Daftar lengkap perintah RPC [ yang didukung](https://zcash.github.io/rpc/)

Buku [Zcashd](https://zcash.github.io/zcash/)

#### Menjalankan sebuah Node (Linux)

- Instal Dependensi

sudo apt update

sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Kloning rilis terbaru, checkout, setup, dan build:

git clone https://github.com/zcash/zcash.git

cd zcash/

git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Sinkronisasi blockchain (mungkin memakan waktu beberapa jam)

Untuk menjalankan node, jalankan:

./src/zcashd

- Kunci Privat disimpan di ~/.zcash/wallet.dat

Panduan untuk Zcashd pada Raspberry Pi [](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## Implikasi Praktis

### Jaringan

Dengan menjalankan sebuah full node, Anda membantu memperkuat jaringan zcash dengan mendukung desentralisasinya.

Hal ini membantu mencegah kontrol adversarial dan menjaga jaringan tetap tangguh terhadap beberapa bentuk gangguan.

DNS seeder menyediakan daftar node andal lainnya melalui server bawaan. Hal ini memungkinkan transaksi untuk menyebar ke seluruh jaringan.

### Statistik Jaringan

Berikut adalah contoh platform yang memungkinkan akses ke data Jaringan Zcash:

[Zcash Penjelajah Blok](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Anda juga dapat berkontribusi pada pengembangan jaringan dengan menjalankan pengujian atau mengusulkan peningkatan baru & menyediakan metrik.

### Penambangan

Penambang memerlukan full node untuk mengakses semua RPC terkait penambangan seperti `getblocktemplate` & `getmininginfo`.

Zcashd juga memungkinkan penambangan ke coinbase terlindungi. Penambang dan pool penambangan memiliki opsi untuk menambang secara langsung guna mengakumulasi ZEC terlindungi dalam alamat z secara default.

Baca [Panduan Penambangan](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) atau kunjungi halaman Forum Komunitas untuk [Zcash Penambang](https://forum.zcashcommunity.com/c/mining/13).

### Privasi

Menjalankan sebuah full node memungkinkan Anda untuk memverifikasi secara independen semua transaksi dan blok pada jaringan Zcash.

Menjalankan sebuah full node dapat menghindari beberapa risiko privasi yang terkait dengan penggunaan layanan pihak ketiga untuk memverifikasi transaksi atas nama Anda.

Menggunakan node Anda sendiri juga memungkinkan koneksi ke jaringan melalui [Tor](https://zcash.github.io/zcash/user/tor.html).
Hal ini memiliki keuntungan tambahan yaitu memungkinkan pengguna lain untuk terhubung secara privat ke alamat .onion node Anda.

## Kesalahan Umum

- Membangun zcashd dari instruksi di atas dan mengharapkan sebuah node yang berfungsi. Binary tersebut akan terhenti pada ketinggian deprecation.
- Menjalankan sebuah node dan berasumsi bahwa dompet mobile Anda sekarang menggunakannya. Sebuah light wallet akan terus berkomunikasi dengan server apa pun yang dikonfigurasikan padanya sampai Anda mengarahkannya ke node milik Anda sendiri. Lihat [Lightwallet Nodes](/zcash-tech/lightwallet-nodes).
- Hanya menjalankan `zebrad` dan mengharapkan light wallets dapat terhubung. Node tersebut membutuhkan indexer di sampingnya, baik itu lightwalletd atau [Zaino](/zcash-tech/zaino).
- Mencari RPC dompet pada node. Kunci dan saldo telah dipindahkan ke Zallet.

## Halaman Terkait

- [Zebra Full Node](/zcash-tech/zebra-full-node) - instal, konfigurasi, dan jalankan node yang direkomendasikan
- [Zakura Node](/zcash-tech/zakura-node) - implementasi node kedua, hasil fork dari Zebra
- [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) - server yang dikueri oleh light wallet
- [Zaino](/zcash-tech/zaino) - indexer Rust yang melayani light wallet
- [Zcash Sinkronisasi Dompet](/zcash-tech/zcash-wallet-syncing) - mengapa sinkronisasi bekerja dengan cara tersebut

## Pembelajaran Lebih Lanjut

Baca [Dokumentasi Dukungan](https://zcash.readthedocs.io/en/latest/)

Bergabunglah dengan Server [Discord](https://discord.gg/zcash) kami atau hubungi kami di [X](https://X.com/ZecHub)