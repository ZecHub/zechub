#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[Situs Web Resmi](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs adalah tim visioner yang berdedikasi untuk meningkatkan pengalaman manusia. Kami percaya bahwa teknologi harus bermanfaat bagi kemanusiaan dan bahwa kami berkembang melalui interaksi konsensual. Kami sedang mengidentifikasi pola yang memungkinkan hal ini.

Zingo Lab Cyan beroperasi sebagai DAO Terlindungi. Kami menyimpan dana kami dalam treasury tempat setiap anggota memiliki viewing key. Dana dibelanjakan dari treasury ketika anggota memberikan suara mendukung sebuah proposal.

## Proyek

### Dompet Zingo! ([GitHub](https://github.com/zingolabs/zingo-mobile))
Dompet Zingo adalah dompet Zcash berfitur lengkap yang dirancang agar mudah digunakan, meskipun mencakup beberapa fitur lanjutan untuk pengguna yang lebih mahir. Dompet ini mendukung pool transparan, Sapling, dan Ironwood, memiliki buku alamat untuk pembayaran berulang, dan tersedia dalam berbagai bahasa. Ini adalah dompet pertama yang mendukung Orchard dan menerapkan format NU5.

Salah satu fitur utama Zingo! adalah kemampuannya menggunakan bidang Memo untuk menawarkan wawasan berharga tentang transaksi Anda.

Zingo! tersedia untuk perangkat seluler dan PC. Anda akan menemukan semua unduhan [di sini](https://zingolabs.org/)

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
API dan aplikasi uji yang menyediakan fungsionalitas zcash untuk digunakan aplikasi. Zingolib menyediakan library untuk zingo-mobile, serta aplikasi cli bawaan bernama zingo-cli, sebuah dompet ringan berbasis baris perintah yang berkomunikasi dengan pengindeks chain seperti [Zaino](/zcash-tech/zaino).

### Pengindeks Zaino ([GitHub](https://github.com/zingolabs/zaino))
Zaino adalah pengindeks Rust untuk blockchain Zcash, yang dikembangkan oleh tim Zingo. Ini adalah pengindeks dalam [stack Z3](/zcash-tech/z3-stack): pengindeks ini mengindeks data chain dari validator [Zebra](/zcash-tech/zebra-full-node) dan melayani dompet, penjelajah, serta klien lainnya. Ini merupakan jalur penerus lightwalletd.

Zaino menawarkan fitur-fitur penting bagi light client, seperti dompet dan aplikasi yang tidak memerlukan seluruh riwayat blockchain, serta klien atau dompet penuh. Ini juga mendukung penjelajah blok, dengan memberikan akses ke blockchain yang telah difinalisasi dan chain terbaik yang belum difinalisasi serta mempool yang dikelola oleh full validator Zebra.

`zcashd` mencapai penghentian Akhir Dukungan pada 18 Juli 2026 di blok 3.417.100 dan tidak mendukung Ironwood (NU6.3). Zaino membaca validator Zebra.

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

Sekumpulan utilitas yang meluncurkan dan mengelola proses Zcash. Ini digunakan untuk pengujian integrasi dalam pengembangan:
- light client
- pengindeks
- validator

Tujuannya adalah menawarkan lingkungan pengujian yang sangat adaptif dan tangguh untuk node inti (validator) seperti Zebra, pengindeks seperti Zaino, dan dompet light client seperti zingo-cli.

Stack bawaan yang diluncurkannya adalah Zebrad, zainod, dan zcash-devtool. Proses lawas `zcashd` dan lightwalletd berada di balik fitur `legacy-stack` yang tidak didukung dan dijadwalkan untuk dihapus.

Selain menyediakan alat untuk memulai, menyimpan cache, dan memuat data chain Zcash (untuk mainnet, testnet, dan regtest), zcash-local-net digunakan dari rangkaian pengujian Zaino untuk menilai layanan RPC Lightwallet yang dihosting di Zaino (lihat dokumentasi pengujian [Zaino](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)).
