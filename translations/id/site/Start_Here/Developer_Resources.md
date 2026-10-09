<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>


# Sumber Daya Pengembang

Sumber daya yang kamu butuhkan untuk membangun di Zcash, dikelompokkan berdasarkan kegunaan masing-masing alih-alih hanya disusun dalam satu daftar.

Stack ini mengalami banyak perubahan pada tahun 2026. zcashd, yang menjalankan jaringan selama sebagian besar sejarahnya, mencapai akhir masa pakainya pada 18 Juli 2026 pada ketinggian blok 3417100, dan setiap node yang tidak dimodifikasi akan mati pada ketinggian tersebut dan akan menolak untuk memulai ulang. Panduan yang ditulis untuk zcashd kini telah menjadi sejarah alih-alih sebuah titik awal, sehingga halaman ini disusun berdasarkan apa yang menggantikannya.

## Ringkasan stack

| Layer | Apa yang digunakan | Mulai dengan |
|:--|:--|:--|
| Full node | Zebra atau Zakura | [Buku Zebra](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Dompet full node | Zallet, dalam versi beta | [Buku Zallet](https://zcash.github.io/zallet/) |
| Server dompet light client | Zaino atau lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Library dompet | crate librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| Mobile | SDK Android dan iOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Spesifikasi | Spesifikasi protokol dan ZIPs | [zips.z.cash](https://zips.z.cash) |

## Node

Sebuah node memvalidasi konsensus dan menyimpan chain. Ada dua implementasi yang sedang dikembangkan secara aktif.

[Zebra](/zcash-tech/zebra-full-node) adalah node dari Zcash Foundation, ditulis dalam Rust, dan merupakan node yang diasumsikan oleh sebagian besar panduan saat ini. [Zebra Book](https://zebra.zfnd.org/) membahas cara menginstal dan menjalankannya, dan [repository](https://github.com/ZcashFoundation/zebra) adalah tempat pengembangan dilakukan.

[Zakura](/zcash-tech/zakura-node) adalah node yang lebih baru, yang dijelaskan oleh penulisnya sebagai "full node Zcash yang kompatibel dengan konsensus, dibangun untuk skala", dengan sinkronisasi yang lebih cepat, pemangkasan blok, dan mode kompatibilitas zcashd. Node ini dipimpin oleh Sean Bowe, seorang Zcash cofounder, dan Dev Ojha. Proyek ini bersifat open source di bawah Apache 2.0 di [zakura-core/zakura](https://github.com/zakura-core/zakura).

ZecHub memiliki halaman ](/zcash-tech/full-nodes)Full Nodes[ yang membahas tentang berbagai pilihan kompromi di antara keduanya.

## Dompet full node

zcashd menyertakan sebuah dompet bersama dengan node tersebut. Dompet itu sudah tidak ada, dan [Zallet](https://github.com/zcash/zallet) adalah penggantinya. Zallet Book mendeskripsikannya sebagai "dompet Zcash full-node yang ditulis dalam Rust" yang "dibuat sebagai pengganti untuk dompet zcashd".

Baca peringatan keamanan sebelum mengandalkannya. Zallet masih dalam tahap beta, "belum ditinjau sepenuhnya", perubahan yang merusak "dapat terjadi kapan saja, yang mengharuskan kamu untuk menghapus dan membuat ulang dompet Zallet kamu", dan belum semua metode RPC zcashd dipindahkan.

Jika kamu sedang memindahkan pengaturan yang sudah ada, ZecHub memiliki panduan [migrasi dari zcashd ke Zebra dan Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) serta referensi cepat [Zallet](/using-zcash/zallet-quick-reference-guide).

## Server dompet light client

Sebagian besar dompet tidak menjalankan sebuah node. Mereka berkomunikasi dengan sebuah server yang menyimpan chain dan memberikan tampilan ringkas darinya.

[lightwalletd](https://github.com/zcash/lightwalletd) adalah layanan asli, ditulis dalam Go, yang dijelaskan sebagai "layanan backend yang menyediakan antarmuka hemat bandwidth ke blockchain Zcash". [Zaino](/zcash-tech/zaino) adalah indexer yang lebih baru, ditulis dalam Rust, dan membaca dari validator full node alih-alih membawa salinan chain sendiri.

Dokumentasi [Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) membahas protokol itu sendiri. Halaman [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) membahas apa yang dapat dan tidak dapat dilihat oleh server ini mengenai seorang pengguna, yang perlu kamu pahami sebelum kamu memilih salah satunya.

## Membangun dompet

Sebagian besar pekerjaan dompet terjadi di dalam crate Rust di bawah [librustzcash](https://github.com/zcash/librustzcash), yang menjadi dasar bagi SDK mobile dan beberapa dompet desktop. Setiap crate didokumentasikan pada [docs.rs](https://docs.rs).

| Crate | Kegunaannya |
|:--|:--|
| zcash_client_backend | "API untuk membuat Zcash light client terlindungi", termasuk sinkronisasi dan konstruksi transaksi |
| zcash_client_sqlite | "Sebuah Zcash light client berbasis SQLite", lapisan penyimpanan untuk yang di atas |
| zcash_keys | "Manajemen alamat dan key Zcash" |
| zcash_primitives | "Implementasi Rust dari primitif Zcash" |
| zcash_protocol | "Konstanta jaringan protokol dan tipe nilai Zcash" |
| orchard | "Protokol transaksi terlindungi Orchard" |
| sapling-crypto | "Library kriptografi untuk Zcash Sapling" |
| pczt | "Alat untuk bekerja dengan transaksi Zcash yang dibuat sebagian", digunakan untuk penandatanganan hardware dan multi-device |
| zip321 | URI permintaan pembayaran, sebagaimana ditentukan dalam ZIP 321 |

Untuk seluler, [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) dan [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) membungkus library tersebut. Repositori iOS sebelumnya disebut ZcashLightClientKit, sehingga tautan dan artikel lama menggunakan nama tersebut.

## Spesifikasi dan kriptografi

Spesifikasi [protocol](https://zips.z.cash/protocol/protocol.pdf) adalah otoritas utama mengenai cara kerja Zcash, termasuk pengodean kunci dan alamat [address](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

[ZIPs](https://zips.z.cash) adalah tempat di mana perubahan diusulkan dan ditentukan, dan indeksnya menunjukkan mana yang merupakan draf dan mana yang sudah final. Perubahan konsensus disertakan dalam peningkatan jaringan, dan ZecHub melacak hal tersebut pada halaman [Network Upgrades](/start-here/network-upgrades).

Untuk kriptografi di baliknya, bacalah [The halo2 Book](https://zcash.github.io/halo2/index.html) dan [The Orchard Book](https://zcash.github.io/orchard/), bersama dengan dokumentasi crate [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) dan [orchard](https://docs.rs/orchard/latest/orchard/). [The FROST Book](https://frost.zfnd.org/) membahas threshold signatures, dan ZecHub memiliki halaman [FROST](/zcash-tech/frost).

## Testnet

Testnet adalah rantai terpisah dengan koin tanpa nilai, yang disebut TAZ. Baik Zebra maupun Zakura dapat dijalankan terhadapnya, dan panduan testnet [](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) mencakup konfigurasi node.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) adalah block explorer testnet yang berfungsi, dengan padanan mainnet di [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Mendapatkan TAZ adalah bagian yang sulit, karena faucet yang ditautkan dari dokumentasi lama telah berhenti merespons. [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz) adalah faucet yang dikelola komunitas yang menjalankan "node, dompet, dan penambang sendiri", membayar "tetesan z2z terlindungi", dan membatasi klaim dengan "browser proof of work alih-alih vendor captcha". Ini bersifat open source di bawah lisensi MIT. Jika tidak tersedia, tanyakan di Zcash R&D Discord, sebagaimana yang disarankan oleh dokumentasi Zcash itu sendiri.

## Dokumentasi umum

Dokumentasi [Zcash](https://zcash.readthedocs.io/en/latest/) masih merupakan sumber tunggal yang paling luas, mencakup konsep protokol, integrasi, dan penambangan. Bacalah dengan saksama. Dokumentasi ini memiliki versi yang disesuaikan dengan zcashd, sehingga beberapa bagian mendeskripsikan sebuah node yang sudah tidak berjalan lagi, sementara bagian protokol dan light client tetap berguna. [Model Ancaman Aplikasi ZcashWallet App](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) yang ada di sana layak untuk dibaca sebelum kamu merancang apa pun yang bersentuhan dengan privasi pengguna.

Jika kamu baru mengenal blockchain secara umum, [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) adalah rekomendasi yang biasa diberikan untuk memahami dasar-dasar bersama, dan dapat dibaca sepenuhnya secara gratis. Buku ini tidak membahas transaksi terlindungi.

## Alat lain yang disebutkan oleh pengembang

[Arti](https://docs.rs/arti/latest/arti/) adalah implementasi Rust dari Tor, yang digunakan oleh zcash_client_backend untuk mengarahkan lalu lintas dompet. [Tailscale](https://github.com/tailscale/tailscale) muncul sebagai opsi untuk terhubung ke node yang kamu jalankan sendiri. [warp2](https://github.com/hhanh00/warp2) adalah implementasi sinkronisasi cepat oleh Hanh, meskipun belum diperbarui sejak 2023.

## Komunitas dan acara

R&D [Zcash Discord](https://discord.gg/6AK7keWFaK) adalah tempat diskusi pengembangan protokol dan dompet, dan [Zcash Community Forum](https://forum.zcashcommunity.com/) berisi proposal yang lebih panjang serta thread dukungan.

Hasil hackathon baru-baru ini memberikan gambaran yang baik tentang apa yang sedang dibangun orang-orang: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) dan [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Sumber daya yang sudah tidak digunakan

Tetap dipertahankan karena artikel lama menautkan ke sana, dan karena ini masih menjadi referensi tentang bagaimana node yang sudah pensiun berperilaku. Jangan mulai dari sini.

[The Zcashd Book](https://zcash.github.io/zcash/) dan dokumen referensi [zcashd RPC](https://zcash.github.io/rpc/) adalah perangkat lunak yang telah mencapai [end of life](https://zcash.github.io/zcash/user/end-of-life.html) pada Juli 2026. Repositori [zcash/zcash](https://github.com/zcash/zcash) telah diarsipkan.

Jika kamu memiliki sumber daya untuk ditambahkan, atau kamu menemukan sesuatu di sini yang sudah tidak mutakhir, buka sebuah issue atau pull request. Tim tidak selalu memiliki kapasitas untuk menjaga semuanya tetap terbaru, dan menandai apa yang kamu temukan akan membantu mengarahkan panduan ini.

**Terakhir diperbarui:** Agustus 2026