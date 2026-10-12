# <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

Situs Web Resmi [ ](https://zingolabs.org/) - [Github ](https://github.com/zingolabs) - [X/ Twitter ](https://x.com/ZingoLabs) - [ Instagram ](https://www.instagram.com/zingolabesp/)

ZingoLabs adalah tim visioner yang berdedikasi untuk meningkatkan pengalaman manusia. Kami percaya bahwa teknologi harus bermanfaat bagi kemanusiaan dan bahwa kita berkembang melalui interaksi konsensual. Kami sedang mengidentifikasi pola-pola yang memungkinkan hal ini terjadi.

Zingo Lab Cyan beroperasi sebagai Shielded DAO. Kami menyimpan dana kami dalam sebuah perbendaharaan di mana setiap anggota memiliki viewing key. Dana dikeluarkan dari perbendaharaan ketika anggota memberikan suara yang mendukung sebuah proposal.

## Proyek

### Dompet Zingo! ([Github](https://github.com/zingolabs/zingo-mobile))
Dompet Zingo adalah dompet Zcash yang memiliki fitur lengkap dan dirancang agar ramah pengguna, meskipun menyertakan beberapa fitur canggende untuk pengguna tingkat lanjut. Dompet ini mendukung pool transparan, Sapling, dan Orchard, memiliki buku alamat untuk pembayaran berulang, serta tersedia dalam berbagai bahasa. Ini adalah dompet pertama yang mendukung Orchard dan mengimplementasikan format NU5.

Salah satu fitur utama dari Zingo! adalah kemampuannya untuk menggunakan bidang Memo guna menawarkan wawasan berharga tentang transaksi Anda.

Zingo! tersedia untuk perangkat seluler dan PC. Anda dapat menemukan semua unduhan [di sini](https://zingolabs.org/)

### Zingolib ([Github](https://github.com/zingolabs/zingolib))
Sebuah API dan aplikasi pengujian yang menyediakan fungsionalitas zcash untuk penggunaan aplikasi. Zingolib menyediakan library untuk zingo-mobile, serta aplikasi cli terintegrasi untuk berinteraksi dengan zcashd melalui lightwalletd yang disebut Zingo-cli, sebuah client lightwalletd-proxy berbasis command line.

### Indexer Zaino ([Github](https://github.com/zingolabs/zaino))
Zaino adalah sebuah Indexer yang dikembangkan dalam Rust oleh tim Zingo, yang bertujuan untuk menggantikan lightwalletd dan mendorong proyek deplesi zcashd.

Zaino menawarkan fitur-fitur penting baik untuk light client, seperti dompet dan aplikasi yang tidak memerlukan riwayat blockchain lengkap, maupun untuk full client atau dompet. Ini juga mendukung block explorer, yang memberikan akses ke blockchain yang telah difinalisasi maupun chain terbaik yang belum difinalisasi serta mempool yang dikelola oleh Zebra atau validator full Zcashd.

### ZLN (zcash-local-net) ([Github](https://github.com/zingolabs/zcash-local-net))
Sekumpulan utilitas yang menjalankan dan mengelola proses Zcash. Ini digunakan untuk pengujian integrasi dalam pengembangan:
- lightclient
- indexer
- validator

Tujuannya adalah untuk menawarkan lingkungan pengujian yang sangat adaptabel dan kokoh bagi core node (validator) seperti zcash dan zebra, indexer seperti lightwallet dan zaino, serta minimal zingo-cli sebagai dompet light client.

Repositori ini dirancang untuk membandingkan fungsionalitas dari berbagai validator (seperti Zcashd dan Zebrad) dan indexer (seperti Lightwalletd dan Zaino) guna memfasilitasi migrasi selama proses deprisiasi Zcashd.

Selain menyediakan alat untuk memulai, menyimpan cache, dan memuat data chain Zcash (untuk mainnet, testnet, dan regtest), zcash-zocal-net menyertakan serangkaian pengujian untuk membandingkan kemampuan Lightwalletd dan Zaino di seluruh layanan RPC Lightwallet. Pengujian ini dapat dijalankan langsung dari Zaino (lihat [https://github.com/zingolabs/zaino/blob/dev/docs/testing.md](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)]) untuk menilai layanan RPC Lightwallet yang dihosting di Zaino).

