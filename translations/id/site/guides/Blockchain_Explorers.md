<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Blockchain Explorer

## Pendahuluan

Dalam dunia bisnis tradisional, setiap transaksi menyertakan struk sebagai proof pembelian. Demikian pula, dalam dunia blockchain, pengguna menerima struk digital berupa ID transaksi untuk setiap transaksi yang telah selesai. Sebagian besar dompet akan menyediakan ini untuk kamu. Blockchain explorer hanyalah alat yang memungkinkan seseorang untuk memvisualisasikan apa yang telah terjadi pada sebuah blockchain. Alat ini menerima input berupa: ID transaksi, alamat, atau hash blok, dan secara visual menampilkan apa yang telah terjadi.

## Contoh
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (publik): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://explorer.zec.rocks/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (privat): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://explorer.zec.rocks/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Perhatikan dengan Zcash bagaimana transaksi kedua menyembunyikan semua detail penting, hal ini sangat penting dan memiliki implikasi besar di dunia digital.


## Peta Blockchain

Jadi kita memiliki deretan karakter panjang ini sebagai tanda terima digital, lalu apa selanjutnya? Di sinilah kita menggunakan [blockchain explorer](https://nym.com/blog/using-blockchain-privately), atau peta, untuk membantu kita memahami apa yang telah terjadi di blockchain. Perhatikan bagaimana setiap chain memiliki versi [blockchain explorer](https://nym.com/blog/using-blockchain-privately) sendiri seperti di atas. Penting untuk dipahami bahwa semua proyek blockchain ini adalah contoh dari perangkat lunak open source. Artinya, siapa pun dapat berkontribusi pada dan atau melakukan fork terhadap kodenya sesuai keinginan mereka. Dengan pemahaman tersebut, setiap proyek memiliki spesialisasi di bidang yang berbeda dan menyesuaikan blockchain explorer agar sesuai dengan kebutuhan proyek tersebut.

### Blok
Transaksi dimasukkan ke dalam *blok*. Ketika sebuah blok ditambang/divalidasi, setiap transaksi di dalam blok tersebut dikonfirmasi dan sebuah hash blok dibuat. Hash apa pun yang dibuat dapat dimasukkan ke dalam block explorer. Kamu mungkin pernah melihat CEX memerlukan sejumlah *konfirmasi* sebelum mereka melepaskan dana kamu, ini adalah metrik yang mereka gunakan untuk memastikan transaksi kamu telah selesai secara memadai. Bagaimana blockchain menentukan transaksi mana yang masuk ke dalam blok berikutnya? Ini adalah topik penelitian yang kompleks, tetapi sebagian besar chain modern menggunakan ide *biaya* untuk menentukan siapa yang mendapatkan tempat di barisan depan. Semakin tinggi biayanya, semakin besar peluang kamu untuk naik ke barisan paling depan.

### Alamat

Cara yang menyenangkan untuk mempelajari [blockchain explorer](https://nym.com/blog/using-blockchain-privately) secara visual adalah dengan memasukkan alamat transaksi acak apa pun. Kemudian kamu bisa bergerak mundur ke masa lalu dan melihat dari mana dana tersebut berasal! Setiap transaksi memiliki alamat input dan output. Dengan informasi ini, seseorang dapat dengan mudah bergerak maju maupun mundur dari transaksi apa pun yang telah digunakan. Bagi mereka yang menyukai teka-teki, ini adalah padanan digital dari teka-teki keuangan raksasa, dan dapat digunakan untuk tujuan transparansi. Menggunakan blockchain explorer tidak hanya membuat hal ini jauh lebih mudah untuk divisualisasikan, tetapi *juga menyoroti* kebutuhan akan privasi transaksi. Kecuali jika kamu menggunakan Zcash yang terlindungi, kamu dapat melakukan ini dengan *setiap* blockchain transparan: BTC, ETH, ATOM, DOGE, VTC, dll ... . Poin ini sangat krusial bagi siapa pun yang menggunakan blockchain secara aman saat melangkah menuju masa depan digital sepenuhnya.

### Jumlah

Mirip dengan alamat di atas, setiap transaksi pada blockchain publik memiliki jumlah yang tersedia secara publik dan dapat dilihat oleh siapa saja. Ini mencakup jumlah pada alamat input maupun output untuk transaksi apa pun. Satu pengecualian untuk hal ini adalah saat kamu memilih untuk menggunakan Zcash terlindungi -- maka semua jumlah akan disembunyikan. Bagi pemilik bisnis kecil yang sangat membutuhkan privasi demi *perdagangan yang adil*, ini adalah keuntungan yang sangat besar!

![amounts](/content-images/206312357-e9504151-830f-4fa1-81cb-f23619-210f51493c.webp)


### Apa yang dapat dan tidak dapat dilihat oleh explorer pada Zcash

#### Ringkasan
- Alamat transparan (`t`) dapat terlihat sepenuhnya di explorer, sama seperti Bitcoin
- Transaksi yang sepenuhnya terlindungi (z ke z) menyembunyikan jumlah, alamat, dan memo
- Biaya tetap terlihat, bahkan pada transaksi yang sepenuhnya terlindungi
- Proses shielding (memindahkan `t` ke terlindungi) dan deshielding (dari terlindungi kembali ke `t`) sebagian dapat terlihat, karena salah satu sisinya bersifat transparan
- Privasi hanya terjaga selama dana tetap berada di dalam pool terlindungi

Zcash memiliki lebih dari satu jenis alamat, dan sebuah explorer memperlakukannya dengan sangat berbeda.

Alamat transparan, yang dimulai dengan `t`, bekerja seperti Bitcoin. Sebuah explorer menunjukkan pengirim, penerima, jumlah, dan jejak kembali ke asal dana tersebut.

Alamat terlindungi adalah sisi privat. Dana dalam [pool terlindungi](https://zechub.wiki/using-zcash/shielded-pools#content) dari Sapling atau Orchard dilindungi oleh zero-knowledge proofs. Jika kamu mencari transaksi terlindungi sepenuhnya, explorer tidak dapat menampilkan jumlah, alamat, maupun memo. Explorer hanya dapat mengonfirmasi bahwa sebuah transaksi valid telah terjadi dan tercatat dalam sebuah block. Ini adalah contoh privasi tersembunyi yang ditunjukkan di bagian atas halaman ini.

Satu detail tetap terlihat bahkan untuk transaksi terlindungi sepenuhnya: biayanya. Aturan konsensus Zcash mengharuskan biaya transparan dinyatakan secara eksplisit, sehingga explorer selalu dapat menampilkannya, bahkan ketika jumlahnya disamarkan. Karena alasan itulah, merupakan praktik yang baik untuk menggunakan biaya dompet standar, agar transaksi kamu tidak terlihat mencolok karena membayar jumlah yang tidak biasa.

Explorer juga dapat melihat kapan dana berpindah antara sisi transparan dan terlindungi. Memindahkan dana `t` ke dalam sebuah pool adalah proses shielding, sedangkan memindahkannya kembali keluar adalah deshielding. Perpindahan tersebut sebagian dapat terlihat karena salah satu sisinya bersifat transparan. Hanya aktivitas z ke z yang sepenuhnya privat, yang tidak pernah menyentuh alamat `t`, yang menyembunyikan segalanya kecuali biaya.

Kesimpulannya: privasi bergantung pada tetap berada di dalam pool terlindungi. Begitu dana menyentuh alamat `t`, bagian dari riwayat tersebut akan menjadi sepublik Bitcoin. Untuk membuktikan aktivitas terlindungi milikmu kepada seseorang yang kamu pilih, seperti akuntan, bagikan viewing key alih-alih menjadikannya publik. Lihat halaman [Viewing Keys](https://zechub.wiki/zcash-tech/viewing-keys#content).


### Daftar Explorer Blok Zcash

- [Zcash Block Explorer](https://mainnet.zcashexplorer.app/)

- [Blockchair](https://blockchair.com)

- [3xpl](https://3xpl.com/zcash)

- [Bitquery](https://explorer.bitquery.io/zcash)


### Panduan Visual

Berikut adalah empat contoh bagus dari berbagai blockchain explorer:

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Zcash Block Explorer](https://mainnet.zcashexplorer.app)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](/content-images/206279968-a06eb0a1-b3a6-49af-a30f-7d871b-1418d95d28.webp)


![ethExplorer](/content-images/206280208-2ce5eddd-157e-4eed-90a0-680c15-488292c345.webp)


![zcashExplorer](/content-images/206280454-a2c7563f-e82d-47b9-9b58-02eece-76db7aec4c.webp)


![cosmos](/content-images/206316791-2debfd28-923a-44f4-b7d3-701182-cf39a065fc.webp)




