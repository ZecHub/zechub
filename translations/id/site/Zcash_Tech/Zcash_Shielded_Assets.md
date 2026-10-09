<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Zcash Aset Terlindungi

## Ringkasan Singkat

ZcashAset Terlindungi (ZSA) adalah usulan ekstensi protokol yang memungkinkan aset **selain ZEC** — stablecoin, token tata kelola, atau aset kustom apa pun — berada di dalam pool terlindungi Zcash, dengan pengirim, penerima, dan jumlahnya tetap terjaga privasinya.

- **Apa itu:** Aset kustom bergaya ERC-20, namun terlindungi secara default.
- **Siapa yang membangunnya:** [QEDIT](https://qed-it.com/), di bawah hibah dari Zcash Foundation, bekerja sama dengan Electric Coin Company.
- **Bagaimana spesifikasinya:** [ZIP 226](https://zips.z.cash/zip-0226) (transfer dan burn) bersama dengan [ZIP 227](https://zips.z.cash/zip-0227) (penerbitan).
- **Status:** belum aktif di mainnet. Protokol ZSA dijadwalkan untuk penerapan pada Peningkatan Jaringan 7 (NU7).
- **Biaya:** selalu dibayar dalam ZEC, terlepas dari aset apa pun yang dipindahkan.

---

## Penjelasan Inti

Zcash Shielded Assets (ZSA) adalah usulan peningkatan untuk protokol Zcash yang akan memungkinkan pembuatan, transfer, dan pembakaran aset kustom pada chain Zcash.

Jika Anda sudah terbiasa dengan standar token [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) pada blockchain Ethereum, maka ZSA adalah bagi Zcash sebagaimana token ERC-20 bagi Ethereum.

ZcashAset Terlindungi akan memungkinkan pembuatan token kustom pada blockchain Zcash, sehingga memungkinkan token selain [ZEC](/guides/using-zec-privately) untuk mendapatkan manfaat dari anonimitas dan privasi transaksi terlindungi pada blockchain Zcash.

Kegunaan potensial utama dari ZSA adalah untuk menerbitkan stablecoin pada protokol Zcash. Stablecoin adalah cryptocurrency yang menambatkan nilainya ke mata uang fiat, seperti Dolar AS atau Euro. Saat ini, beberapa stablecoin yang paling banyak beredar adalah token ERC-20 seperti [USDC](https://www.circle.com/en/usdc) dan [Dai](https://docs.makerdao.com/).

Kegunaan potensial lain dari ZSA adalah untuk penerbitan token tata kelola. Sebagai contoh, Zechub (penerbit wiki ini) adalah sebuah Decentralized Autonomous Organization (DAO) dan dapat membuat serta menerbitkan ZSA kepada para anggotanya untuk melakukan voting pada proposal dan keputusan tata kelola.

ZSAs sedang dikembangkan oleh [QEDIT](https://qed-it.com/), di bawah hibah utama dari [Zcash Foundation](/zcash-organizations/zcash-foundation) melalui kolaborasi dengan [Electric Coin Company](/zcash-organizations/electric-coin-company). Karena proyek ini masih aktif dikembangkan, pembaruan diposting pada [thread ini](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) di forum Zcash. [Pengajuan hibah ZSA](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) oleh QEDIT tersedia di situs web hibah Zcash Foundation.

---

## Visual / Analogi

### Amplop yang tersegel

Bayangkan sebuah transaksi terlindungi Zcash seperti amplop polos yang tersegel dan dimasukkan ke dalam kotak surat publik. Siapa pun dapat melihat bahwa sebuah amplop telah dikirimkan. Tidak ada yang dapat melihat siapa pengirimnya, siapa yang mengambilnya, atau apa isinya — dan setiap amplop terlihat identik dengan amplop lainnya.

Hari ini, sebuah amplop pada jaringan Zcash hanya dapat membawa satu hal: ZEC.

ZSA tidak mengubah amplop tersebut. ZSA mengubah **apa yang diperbolehkan di dalamnya**. Setelah ZSA, amplop tersegel yang sama dapat membawa stablecoin, token tata kelola DAO, atau poin loyalitas perusahaan — dan dari luar, tampilannya akan tetap persis seperti amplop lainnya di jaringan tersebut.

Satu detail yang perlu diingat adalah: **biaya pos selalu dibayar dalam ZEC**, apa pun isi di dalam amplop tersebut.

### Apa yang dapat dilihat oleh pengamat luar

| Seorang pengamat dapat melihat... | ERC-20 pada Ethereum | ZSA pada Zcash |
| --- | --- | --- |
| Siapa yang mengirimnya | Publik | Terlindungi |
| Siapa yang menerimanya | Publik | Terlindungi |
| Berapa banyak yang dipindahkan | Publik | Terlindungi |
| Saldo individu | Publik | Terlindungi |
| Total supply dari aset tersebut | Publik | **Publik — secara sengaja** |
| Mata uang yang digunakan untuk membayar biaya | ETH | ZEC |

### Mengapa baris suplai bukanlah sebuah bug

Dua baris terbawah dari tabel tersebut adalah bagian di mana ZSA menjadi menarik.

ZIP secara sengaja menjaga **penerbitan tetap transparan**, sehingga pasokan beredar dari setiap aset dapat dilacak secara on-chain. Kepemilikan individu dan pembayaran individu tetap privat; namun jumlah total token yang ada tidak demikian.

Bagi penerbit stablecoin, kombinasi tersebut merupakan sebuah keunggulan alih-alih sebuah kompromi. Cadangan dapat diaudit terhadap pasokan yang dapat diverifikasi secara publik, sementara orang-orang yang benar-benar menggunakan token tersebut tetap menjaga kerahasiaan saldo dan pembayaran mereka.

### Satu aset, satu identitas

Setiap aset mendapatkan **Asset Identifier** yang unik, yang diturunkan dari kunci penerbitan (issuance key) penerbit bersama dengan deskripsi teks dari aset tersebut. Dua penerbit yang berbeda tidak dapat menghasilkan identifier yang sama, dan mencetak atau mengubah aset memerlukan otorisasi kriptografis dari penerbitnya. Dalam istilah amplop: siapa pun dapat mengirimkan amplop, tetapi hanya mint yang memiliki aset tertentu yang dapat mencetak lebih banyak aset tersebut.

---

## Penjelasan Mendalam

### Demo ZSA di Zebra

[![Video Thumbnail](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**Jalankan demonya sendiri!**

Kloning repositori zcash-tx-tool: [https://github.com/QED-it/zcash_tx_tool](https://github.com/QED-it/zcash_tx_tool)

### Proposal Peningkatan Zcash (ZIPs)

- [ZIP 226](https://zips.z.cash/zip-0226): Transfer dan Burn dari Aset Terlindungi Zcash
- [ZIP 227](https://zips.z.cash/zip-0227): Penerbitan Aset Terlindungi Zcash
- [ZIP 230](https://zips.z.cash/zip-0230): Format Transaksi Versi 6

> **Catatan tentang ZIP 230:** ZIP 230 sejak saat itu telah ditarik dan tidak akan diterapkan. Versi transaksi 6 sekarang ditentukan oleh [ZIP 229](https://zips.z.cash/zip-0229). Lihat pemberitahuan di bagian atas halaman [ZIP 230](https://zips.z.cash/zip-0230).

ZIP 226 mendefinisikan protokol OrchardZSA — sebuah ekstensi dari protokol Orchard yang membawa transfer dan pembakaran aset kustom. ZIP 227 mendefinisikan bagaimana aset tersebut dibuat pada awalnya, dan hanya boleh diimplementasikan bersamaan dengan ZIP 226.

### Proposal Hibah ZSA

Proposal ZSA untuk Aset Terlindungi (ZSA/UDA) dipresentasikan oleh tim [QEDIT](https://qed-it.com/) untuk membangun aset terlindungi generik pada blockchain Zcash. Hal ini biasanya disebut sebagai User Defined Assets (UDA) atau sebagai Zcash Shielded Assets (ZSA).

Dengan proposal ini, tim di [QEDIT](https://qed-it.com/) berencana untuk menghadirkan DeFi ke dalam ekosistem Zcash dan, pada saat yang sama, memungkinkan penggunaan teknologi privasi terbaik di dalam ekosistem DeFi yang sudah ada. Dalam sebuah survei jajak pendapat, tim mengajukan pertanyaan, dan komunitas menjawab bahwa [aset terlindungi generik (ZSA/UDA) adalah fitur yang paling banyak diminta saat ini](https://twitter.com/BenarrochDaniel/status/1428327864034791429).

Proposal ini secara teknis mematuhi spesifikasi [Zcash Improvement Proposal (ZIP)](https://zips.z.cash/zip-0000) dan didefinisikan dalam ZIP 226 & ZIP 227.

1. [ZIP 226](https://zips.z.cash/zip-0226): Transfer dan Burn dari Aset Terlindungi Zcash
2. [ZIP 227](https://zips.z.cash/zip-0227): Penerbitan Aset Terlindungi Zcash

---

## Implikasi Praktis

**Jika Anda menyimpan atau menggunakan ZEC**

- ZSA didefinisikan sebagai perluasan dari Orchard ("OrchardZSA"), sehingga mereka akan berbagi mekanisme terlindungi yang sudah digunakan oleh ZEC. Dompet Anda akan memerlukan dukungan ZSA secara eksplisit sebelum dapat menyimpan atau mengirimnya.
- Anda akan selalu membutuhkan sejumlah ZEC di tangan. Biaya untuk menerbitkan dan mentransfer ZSA dibayarkan dalam ZEC, bukan dalam aset itu sendiri.
- Tidak ada hal terkait transaksi ZEC Anda yang berubah.

**Jika Anda adalah calon penerbit — sebuah stablecoin, DAO, atau perusahaan**

- Penerbitan aset memerlukan otorisasi kriptografis yang terikat pada kunci penerbitan, sehingga hanya Anda yang dapat mencetak atau mengubah atribut dari aset Anda sendiri.
- Pasokan beredar aset Anda dapat diaudit secara publik sementara saldo dan transfer pengguna Anda tidak dapat dilihat. Bagi penerbit yang teregulasi, ini biasanya merupakan kombinasi tepat yang dibutuhkan.
- Sebuah transaksi penerbitan tunggal dapat membuat lebih dari satu aset sekaligus.

**Untuk ekosistem**

- Karena setiap biaya ZSA dinyatakan dalam ZEC, aktivitas pada aset masa depan apa pun yang diterbitkan di Zcash menciptakan permintaan untuk ZEC itu sendiri.

---

## Kesalahan Umum

| Keyakinan umum | Apa yang sebenarnya terjadi |
| --- | --- |
| "ZSA sudah aktif di Zcash saat ini." | Belum. ZSA dijadwalkan untuk penerapan pada Peningkatan Jaringan 7 (NU7) dan masih dalam tahap peninjauan serta pengujian. |
| "ZSA menghadirkan smart contract ke Zcash." | ZSA menentukan penerbitan, transfer, dan pembakaran aset. Ini bukan lapisan kontrak yang dapat diprogram untuk tujuan umum. |
| "Anda dapat membayar biaya ZSA dengan token ZSA itu sendiri." | Biaya dibayarkan dalam ZEC. |
| "Jika bersifat terlindungi, pasokan token juga harus rahasia." | ZIP 227 sengaja membuat penerbitan menjadi transparan, sehingga pasokan setiap aset dapat dilacak secara publik. Saldo dan transfer tetap privat; namun pasokannya tidak. |
| "ZIP 230 adalah format transaksi versi 6 saat ini." | ZIP 230 telah ditarik. Versi 6 sekarang ditentukan oleh ZIP 229. |

---

## Halaman Terkait

- [Halo](/zcash-tech/halo) — sistem pembuktian di balik Orchard, protokol yang diperluas oleh ZSA
- [Zk-SNARKs](/zcash-tech/zk-snarks) — zero-knowledge proofs yang memungkinkan transfer terlindungi diverifikasi tanpa harus diungkapkan
- [Pool Terlindungi](/using-zcash/shielded-pools) — tempat ZSA akan berada bersama dengan ZEC
- [Transaksi](/using-zcash/transactions) — bagaimana sebuah transaksi Zcash disusun
- [Zebra Full Node](/zcash-tech/zebra-full-node) — implementasi node yang digunakan dalam demo ZSA di atas