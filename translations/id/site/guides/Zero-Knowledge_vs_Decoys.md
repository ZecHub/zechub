<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Zero-knowledge vs Sistem Berbasis Decoy

"Cryptocurrency mengekspos semua aktivitas pengeluaran kamu ke publik karena ini sama saja dengan Twitter bagi rekening Bank kamu dan ini adalah masalah besar yang harus diselesaikan dengan mengadopsi privasi on chain." - Ian Miers di [Devcon4](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9).

Beberapa proyek kripto telah mendapatkan pengakuan karena pendekatan mereka yang berpusat pada privasi. Zcash terkenal karena menggunakan Zero Knowledge Proofs (ZK) untuk melindungi jumlah transaksi dan alamat. Monero menonjol karena penggunaan obfuscation pengirim berbasis Decoy yang dikombinasikan dengan skema enkripsi lainnya untuk mencapai privasi pengguna di blockchain.


<a href="">
    <img src="/content-images/257773807-af8ae27d-0805-4a60-a5ba-749e2f-cafd67320f.webp" alt="" width="400" height="300"/>
</a>


## Memahami ZK Proofs dan Sistem Berbasis Decoy

Zero Knowledge Proofs adalah sistem kriptografi yang memungkinkan satu pihak (prover) untuk menunjukkan validitas suatu pernyataan kepada pihak lain (verifier) tanpa mengungkapkan *informasi mendasar apa pun mengenai pernyataan itu sendiri*. Dalam konteks Zcash, ZK proofs digunakan untuk memverifikasi validitas sebuah transaksi tanpa mengungkap detail transaksi seperti PENGIRIM, PENERIMA, atau JUMLAH transaksi.

**Hal ini memastikan privasi pengguna tetap terjaga karena transaksi tetap rahasia meskipun sedang divalidasi. Teknologi ini dirancang untuk menjamin kerahasiaan transaksi keuangan pada jaringan Zcash.**

Dalam sistem berbasis Decoy seperti [RingCT](https://twitter.com/ZecHub/status/1636473585781948416), beberapa transaksi digabungkan sehingga membuat pelacakan sumber dan tujuan dana yang sebenarnya menjadi menantang atau sulit. Algoritme ini memperkenalkan input dan output decoy dalam transaksi serta menerapkan enkripsi pada alamat yang digunakan sebagai input & menggunakan Range proofs untuk memvalidasi bahwa jumlah yang ditransfer dapat dibelanjakan.

Pendekatan ini mengaburkan jejak transaksi. Penggunaan input umpan (decoy inputs) mempersulit siapa pun yang menganalisis blockchain untuk mengidentifikasi pengirim, penerima, atau jumlah transaksi yang sebenarnya.

**Catatan Penting**: Metode transaksi pelindung privasi on-chain ini masih secara eksplisit mengungkapkan input (terenkripsi) ke semua transaksi pengguna. Metadata seperti *ALIRAN TRANSAKSI* antara pengguna yang berbeda di jaringan masih dapat dikumpulkan. Jika seorang penyerang berpartisipasi aktif dalam menghasilkan transaksi di jaringan, hal tersebut secara efektif akan melakukan deanonymise terhadap decoy input dari pengguna lain.


## Keunggulan ZK Dibandingkan Sistem Berbasis Decoy

Baik Zcash maupun Monero adalah cryptocurrency yang berfokus pada privasi, tetapi keduanya mencapai privasi dengan cara yang berbeda.

Berikut adalah beberapa keunggulan zero-knowledge proof (ZK) milik Zcash dibandingkan dengan sistem decoy Monero:

1) **Pengungkapan Selektif**: Dengan set fitur ZK dari Zcash, pengguna memiliki opsi untuk mengungkapkan detail transaksi kepada pihak tertentu [Baca ECC Blog tentang Pengungkapan Selektif](https://electriccoin.co/blog/viewing-keys-selective-disclosure/). Dalam Zcash, konten terenkripsi dari transaksi terlindungi memungkinkan individu untuk mengungkapkan data dari transfer tertentu secara selektif. Selain itu, viewing key dapat diberikan untuk mengungkapkan semua transaksi yang terkait dengan alamat terlindungi tertentu. Fitur ini memungkinkan kepatuhan regulasi dan auditabilitas tanpa mengorbankan privasi jaringan secara keseluruhan.

Meskipun algoritma decoy Monero (ring signature) membantu dalam menyediakan privasi, ia tidak menawarkan pengungkapan *selektif* dengan cara yang sama.


<a href="">
    <img src="/content-images/257793324-2dcc6047-300e-4fa7-a28d-2e6cbb-7242c98ea4.webp" alt="" width="400" height="80"/>
</a>


2) **Visibilitas Opsional**: Zcash memungkinkan pengguna untuk memilih antara transaksi transparan (tidak privat) dan transaksi terlindungi (privat). Hal ini menandakan bahwa Zcash menawarkan fleksibilitas bagi pengguna untuk menjaga informasi keuangan mereka tetap privat (terlindungi) atau membuatnya transparan dan tersedia secara publik seperti kebanyakan blockchain lainnya sebagaimana dijelaskan pada situs web resmi [Zcash](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/). Privasi opsional ini memungkinkan fleksibilitas yang lebih besar serta penggunaan kasus bisnis/organisasi yang relevan, karena beberapa transaksi mungkin memerlukan privasi yang lebih rendah untuk pengawasan publik, sementara yang lain mendapatkan manfaat dari privasi yang ditingkatkan.


3) **Anonymity Set**: [anonymity set](https://docs.wasabiwallet.io/FAQ/FAQ-UseWasabi.html#what-is-the-difference-between-anonymity-set-and-anonymity-score) dari zero-knowledge shielded pools terdiri dari semua transaksi yang *pernah* terjadi. Ini jauh lebih besar daripada sebagian besar teknik on-chain lainnya untuk mencapai ketidakterhubungan transaksi. Catatan: ini hanya berlaku untuk transaksi di dalam shielded pool yang sama.

Penggunaan decoy memang meningkatkan set anonimitas. Namun, pendekatan ini sepenuhnya bergantung pada jumlah pengguna *asli* di dalam jaringan.

4) **Tanpa Trusted Setup**: setup Sprout & Sapling dari Zcash menggunakan multi-party computation yang dikenal sebagai "trusted setup ceremony". peningkatan jaringan NU5 baru-baru ini tidak memerlukan kepercayaan apa pun pada integritas setup zero-knowledge circuit. [Baca Blog ECC di NU5](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/).

5) **Privasi Data**: Teknologi [zk-SNARK](https://zechub.wiki/zcash-technology) yang digunakan dalam pool terlindungi milik Zcash memungkinkan peningkatan keamanan yang signifikan bagi pengguna. Pengurangan kebocoran metadata on-chain berarti bahwa pengguna aman dari pihak lawan seperti potensi hacker atau badan negara yang represif.

Ada sejumlah kasus di mana bug telah teridentifikasi dalam algoritma pemilihan decoy Monero. Bug ini berpotensi mengungkap pengeluaran pengguna menurut laporan dari [Coindesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero).


Singkatnya, apa yang paling penting adalah mengurangi atau menghilangkan kebocoran informasi dan data pengguna sebagaimana dijelaskan oleh Zooko pada sesi live [Orchid (priv8) AMA](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9)


<a href="">
    <img src="/content-images/257788813-509f1139-7daa-4f95-bbb4-c53564-f815d11477.webp" alt="" width="400" height="200"/>
</a>


Please provide the Markdown fragment you would like me to translate. I am ready to begin the localization process according to your instructions.

***Tautan Referensi***

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/



