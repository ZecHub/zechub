<a href="https://github.com/zechub/zechub/edit/main/site/guides/ShapeShift_Zcash.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# ShapeShift dan Zcash: Perdagangan Terdesentralisasi yang Mengutamakan Privasi

---

## Pendahuluan

Privasi dan self-custody adalah prinsip dasar dari cryptocurrency, namun banyak pengguna masih mengandalkan exchange terpusat yang memerlukan verifikasi identitas dan menyimpan dana pengguna. Integrasi antara ShapeShift dan Zcash menyatukan platform exchange yang sepenuhnya terdesentralisasi dengan salah satu cryptocurrency pelindung privasi paling canggih, memberikan cara bagi pengguna untuk memperdagangkan ZEC tanpa mengorbankan privasi atau kendali atas aset mereka.

Artikel ini menjelaskan apa itu ShapeShift, bagaimana cara kerja Zcash, bagaimana kamu dapat melakukan swap ZEC di ShapeShift, dan mengapa kemitraan ini penting bagi masa depan keuangan terdesentralisasi yang privat.

---

## Apa itu ShapeShift?

[ShapeShift](https://shapeshift.com/) adalah platform mata uang kripto terdesentralisasi dan open-source yang memungkinkan pengguna untuk memperdagangkan, melacak, dan mengelola aset digital di berbagai blockchain tanpa perlu membuat akun, mengirimkan dokumen identitas, atau menyerahkan kustodial dana mereka.

### Sejarah Singkat

ShapeShift awalnya didirikan pada tahun 2014 oleh Erik Voorhees sebagai sebuah exchange cryptocurrency terpusat yang berbasis di Swiss. Platform ini dengan cepat menjadi populer karena antarmukanya yang sederhana yang memungkinkan pengguna untuk melakukan swap satu cryptocurrency ke cryptocurrency lainnya tanpa perlu membuat akun.

Pada tahun 2021, ShapeShift mengalami transformasi radikal. Perusahaan tersebut membubarkan struktur korporatnya dan bertransisi menjadi **Decentralized Autonomous Organization (DAO)**, yang dikelola oleh pemegang **token FOX**. Sebagai bagian dari transisi ini, sekitar 340 juta token FOX dibagikan melalui airdrop kepada lebih dari satu juta pengguna, menjadikannya salah satu airdrop terbesar dalam sejarah crypto. Sejak saat itu, semua keputusan besar mengenai platform telah dibuat melalui proposal tata kelola komunitas dan pemungutan suara.

### Fitur Utama

- **Non-Kustodial**: Pengguna melakukan trading langsung dari dompet mereka sendiri. ShapeShift tidak pernah menyimpan dana kamu.
- **Tanpa Perlu KYC**: Tidak ada verifikasi identitas, tidak ada pembuatan akun, dan tidak ada pengumpulan data pribadi.
- **Dukungan Multichain**: Akses ke lebih dari 10.000 aset di 15+ blockchain, termasuk Bitcoin, Ethereum, Cosmos, dan Zcash.
- **Agregasi DEX**: ShapeShift mengarahkan trading melalui protokol terdesentralisasi seperti THORChain, 0x, dan lainnya untuk menemukan rate terbaik.
- **Cross-Chain Swaps**: Swap aset secara native antar blockchain yang berbeda tanpa menggunakan wrapped token atau bridge terpusat.
- **Sepenuhnya Open-Source**: Seluruh platform, termasuk aplikasi seluler, bersifat open-source tanpa backend proprietary selain data blockchain.

---

## Cara Kerja Zcash

[Zcash](https://z.cash/) (ZEC) adalah mata uang kripto yang dibangun di atas fondasi kriptografi kuat yang memberikan kemampuan kepada pengguna untuk bertransaksi secara privat. Diluncurkan pada tahun 2016, Zcash adalah sebuah fork dari Bitcoin yang menambahkan teknologi privasi canggih sambil tetap mempertahankan pasokan tetap Bitcoin sebanyak 21 juta koin dan konsensus proof-of-work.

### Transaksi Terlindungi dan Zero-Knowledge Proofs

Inovasi inti dari Zcash adalah penggunaan **zero-knowledge proofs** (khususnya, sebuah bentuk yang disebut **zk-SNARKs**). Proof kriptografi ini memungkinkan satu pihak untuk membuktikan kepada pihak lain bahwa suatu pernyataan adalah benar tanpa mengungkapkan informasi apa pun selain validitas dari pernyataan itu sendiri.

Dalam praktiknya, ini berarti transaksi Zcash dapat sepenuhnya **terlindungi**: alamat pengirim, alamat penerima, dan jumlah transaksi semuanya dienkripsi pada blockchain. Jaringan tetap dapat memverifikasi bahwa transaksi tersebut valid (tidak ada pengeluaran ganda, saldo benar) tanpa pernah melihat detail tersebut.

### Tipe Transaksi

Zcash mendukung dua jenis alamat:

- **Alamat transparan** (t-addresses): Alamat ini berfungsi seperti alamat Bitcoin, di mana detail transaksi dapat dilihat secara publik di blockchain.
- **Alamat terlindungi** (z-addresses): Alamat ini menggunakan zero-knowledge proofs untuk menjaga kerahasiaan detail transaksi.

Pengguna dapat mengirim ZEC di antara alamat transparan dan terlindungi. Untuk privasi maksimal, transaksi dari satu alamat terlindungi ke alamat lainnya tidak mengungkapkan informasi apa pun secara publik.

### Alamat Terpadu

Dompet Zcash modern seperti [Zodl](https://zodl.com) menggunakan **Alamat Terpadu**, yang menggabungkan penerima transparan dan terlindungi ke dalam satu alamat tunggal. Hal ini menyederhanakan pengalaman pengguna sambil secara otomatis menggunakan tingkat privasi tertinggi yang tersedia.

### Mengapa Privasi Itu Penting

Privasi finansial bukan tentang menyembunyikan kesalahan. Ini melindungi individu dari pengawasan, pemanenan data oleh korporasi, dan serangan terarah. Sama seperti kamu tidak ingin saldo rekening bankmu dapat dilihat oleh publik, transaksi cryptocurrency layak mendapatkan tingkat kerahasiaan yang sama. Zcash menyediakan hal ini melalui desainnya.

---

## Cara Melakukan Swap ZEC di ShapeShift

Platform ShapeShift memungkinkan pengguna untuk memperoleh dan memperdagangkan ZEC melalui proses yang sepenuhnya terdesentralisasi. Berikut adalah cara kerjanya.

### Langkah 1: Kunjungi ShapeShift

Buka [app.shapeshift.com](https://app.shapeshift.com/) di browser web kamu atau unduh aplikasi seluler ShapeShift. Tidak diperlukan pembuatan akun atau verifikasi identitas.

### Langkah 2: Hubungkan Dompet Kamu

Hubungkan dompet kustodial mandiri yang kompatibel. ShapeShift mendukung berbagai macam dompet termasuk:

- **KeepKey** (dompet hardware)
- **MetaMask**
- **XDEFI / Ctrl Wallet**
- **Keplr** (untuk aset berbasis Cosmos)
- **Dompet yang kompatibel dengan WalletConnect**

Karena kamu melakukan swap ke atau dari ZEC, pastikan kamu sudah menyiapkan dompet yang kompatibel dengan Zcash (seperti Zodl) untuk menerima dana kamu.

### Langkah 3: Pilih Pasangan Swap Kamu

Gunakan antarmuka swap untuk memilih aset yang ingin kamu tukarkan (misalnya, BTC, ETH, atau token ERC-20) dan tetapkan ZEC sebagai aset tujuan. Antarmuka ShapeShift dirancang dengan tata letak bergaya Uniswap yang bersih dan dioptimalkan untuk desktop maupun mobile.

### Langkah 4: Masukkan Jumlah dan Tinjau Kembali

Masukkan jumlah yang ingin kamu swap. ShapeShift akan mengarahkan perdagangan melalui protokol terdesentralisasi terbaik yang tersedia (seperti THORChain untuk swap lintas-chain) dan menampilkan estimasi kurs, biaya, serta jumlah output.

### Langkah 5: Konfirmasi dan Eksekusi

Tinjau detail transaksi dan konfirmasi. Swap dieksekusi secara on-chain melalui protokol terdesentralisasi. ZEC kamu akan dikirim ke alamat yang kamu tentukan. Tidak ada perantara yang pernah memegang dana kamu.

### Langkah 6: Lindungi ZEC Kamu dengan Fitur Terlindungi

Setelah ZEC kamu tiba, gunakan fungsi **shield** pada dompet Zcash kamu (tersedia di dompet seperti Zodl) untuk memindahkan dana ke dalam pool terlindungi. Hal ini memastikan bahwa saldo dan transaksi kamu di masa mendatang tetap sepenuhnya privat.

### Pasangan Cross-Chain yang Didukung

ShapeShift memungkinkan ZEC swap di berbagai ekosistem blockchain, termasuk:

- **Bitcoin** (BTC) &lt;-&gt; ZEC
- **Ethereum** (ETH) &lt;-&gt; ZEC
- Aset **Arbitrum** &lt;-&gt; ZEC
- Token ekosistem **Cosmos** &lt;-&gt; ZEC

---

## Mengapa Integrasi Ini Penting

### Mengembalikan Privasi dalam DeFi

Sebagian besar exchange terdesentralisasi menganggap privasi sebagai hal yang baru dipikirkan belakangan. Transaksi pada DEX berbasis Ethereum, misalnya, sepenuhnya transparan: siapa pun dapat melacak riwayat dompet, saldo token, dan pola perdagangan kamu. Integrasi ShapeShift-Zcash menantang norma ini dengan menyediakan akses ke ZEC terlindungi melalui platform terdesentralisasi tanpa KYC.

Seperti yang dinyatakan oleh Houston Morgan, pemimpin alur kerja pertumbuhan dan komunitas ShapeShift: *"Privasi seharusnya tidak menakutkan, tetapi memperdagangkan ZEC di exchange terpusat sering kali terasa menakutkan. Struktur dan risiko hukum mereka mematikan privasi yang sesungguhnya."*

### Dari Delisting ke Default

Sejarah membuat integrasi ini menjadi jauh lebih signifikan. Pada tahun 2020, ketika ShapeShift masih merupakan perusahaan terpusat, mereka **menghapus daftar koin privasi** termasuk Zcash karena adanya tekanan regulasi. Transisi ke struktur DAO membebaskan ShapeShift dari batasan-batasan tersebut. Kini, sebagai protokol yang dikelola oleh komunitas, ShapeShift tidak hanya telah mendaftarkan kembali Zcash tetapi juga menjadikannya bagian utama dari strategi privasinya.

Dengan rilisnya **ShapeShift v4.0** pada Desember 2025, Zcash menjadi **aset pembayaran dan perutean utama yang menjaga privasi** di platform ini. Privasi kini diposisikan sebagai fitur bawaan, bukan tambahan opsional, dengan ZEC yang terintegrasi langsung ke dalam tumpukan dompet dan perutean ShapeShift.

### Dukungan Zcash Community Grants

Program [Zcash Community Grants](https://zcashcommunitygrants.org/) mengalokasikan **$50.000** untuk mendukung infrastruktur teknis dan upaya pemasaran ShapeShift untuk integrasi Zcash. Pendanaan ini membantu tim ShapeShift bermitra dengan **Liquify**, penyedia infrastruktur Web3 yang mendukung 90+ blockchain, untuk menangani endpoint remote procedure call (RPC) demi eksekusi yang lebih cepat dan keandalan jaringan yang lebih baik.

### Memajukan Keuangan Terdesentralisasi

Integrasi ini menunjukkan bahwa privasi dan desentralisasi dapat berjalan bersama dalam DeFi. Kamu dapat:

- **Swap** aset antar chain tanpa perantara terpusat
- **Mempertahankan full self-custody** atas dana kamu selama proses berlangsung
- **Mengakses ZEC terlindungi** tanpa KYC atau pengumpulan data
- **Berpartisipasi dalam tata kelola** melalui token FOX untuk membentuk masa depan platform

Seiring dengan semakin ketatnya lingkungan regulasi di seluruh dunia, dengan wilayah seperti Uni Eropa yang sedang menjajaki pembatasan pada teknologi penjaga privasi, platform seperti ShapeShift menyediakan infrastruktur alternatif yang penting untuk privasi finansial.

---

## Ringkasan

| Fitur | Detail |
|---|---|
| **Platform** | DAO ShapeShift (desentralisasi, open-source) |
| **Tata Kelola** | Pemegang token FOX |
| **Dukungan Zcash** | Perdagangan ZEC penuh dengan dukungan transaksi terlindungi |
| **KYC Diperlukan** | Tidak |
| **Kustodi** | Non-kustodial (pengguna menyimpan kunci mereka sendiri) |
| **Cross-Chain Swaps** | BTC, ETH, Arbitrum, Cosmos, dan banyak lagi |
| **Infrastruktur** | Didukung oleh Liquify (dukungan 90+ RPC blockchain) |
| **Pendanaan Zcash Community Grants** | $50.000 untuk dukungan teknis dan pemasaran |

Integrasi ShapeShift dan Zcash merupakan langkah maju yang berarti bagi privasi dalam keuangan terdesentralisasi. Dengan menggabungkan infrastruktur perdagangan multichain non-kustodial milik ShapeShift dengan teknologi zero-knowledge proof dari Zcash, pengguna mendapatkan akses ke perdagangan cryptocurrency yang benar-benar privat dan tanpa izin. Bagi siapa pun yang menghargai privasi finansial dan kedaulatan diri, integrasi ini menyediakan jalur praktis dan mudah diakses untuk menggunakan ZEC tanpa kompromi.

---

### Sumber Daya

[ShapeShift Platform](https://shapeshift.com/)

[Zcash Situs Web Resmi](https://z.cash/)

Dompet [Zodl](https://zodl.com)

Tata Kelola [DAOShapeShift (Token FOX)](https://shapeshift.com/fox-token)

[Zcash Community Grants](https://zcashcommunitygrants.org/)

[ShapeShift mengintegrasikan Zcash untuk memperkuat privasi onchain (crypto.news)](https://crypto.news/shapeshift-integrates-zcash-to-enable-true-onchain-privacy/)

[ShapeShift meluncurkan v4.0, memusatkan kembali privasi dan self-custody dalam DeFi (Invezz)](https://invezz.com/news/2025/12/18/shapeshift-unveils-version-4-0-re-centering-privacy-and-self-custody-in-defi/)

[ShapeShift meluncurkan dukungan untuk transaksi Zcash terlindungi (CoinTelegraph)](https://cointelegraph.com/news/shapeshift-rolls-out-support-for-shielded-zcash-transactions-for-true-privacy)