[![Edit Page](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Namada_Protocol.md)

# Protokol Namada

![Namada Logo](/content-images/logo-2067e2533d.webp)


## Apa itu Namada?

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Wg_WtPdBig0"
    title="Penjelasan Zcash: Aliansi Strategis Namada-Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div >

Protokol Namada berfungsi sebagai platform Layer 1 berbasis konsensus proof-of-stake, yang dirancang untuk menyediakan privasi agnostic-aset antar-chain. Melalui protokol Inter-Blockchain Communication (IBC), Namada terintegrasi secara mulus dengan chain berfinalitas cepat, memungkinkan interoperabilitas yang lancar. Selain itu, Namada membangun bridge dua arah tanpa kepercayaan (trustless) dengan Ethereum, memfasilitasi komunikasi yang aman dan andal antara kedua jaringan tersebut.

Namada memprioritaskan privasi dengan menerapkan iterasi yang ditingkatkan dari sirkuit Multi-Asset Shielded Pool (MASP). Versi yang telah diperbarui ini memungkinkan semua jenis aset, termasuk token fungible maupun non-fungible, untuk menggunakan set terlindungi bersama persis seperti Zcash. Hasilnya, tindakan mentransfer aset yang didukung pada Namada menjadi berbeda karena sulit untuk diidentifikasi akibat tingkat privasi tinggi yang terlibat. Selain itu, pembaruan terbaru pada sirkuit Multi Asset Shielded Pool memungkinkan adanya reward set terlindungi, yang merupakan fitur atau insentif terobosan yang mengalokasikan sumber daya untuk mempromosikan privasi sebagai barang publik.

## Jembatan Ethereum + Kompatibel dengan IBC

Integrasi bridge Ethereum ke dalam Namada menghilangkan kebutuhan akan protokol terpisah, karena ia menjadi bagian integral dari ekosistem Namada. Validator di dalam Namada dipercaya untuk menjalankan bridge bersama dengan protokol inti Namada. Validator ini juga berfungsi sebagai relayers saat melakukan transfer aset ke Namada, sehingga keterlibatan aktor tambahan tidak lagi diperlukan. Di sisi lain, saat mentransfer aset ke Ethereum, pihak eksternal (yang dikenal sebagai relayers) akan terlibat, meskipun mereka tidak memikul tanggung jawab untuk memvalidasi atau mengamankan bridge tersebut.

![Ethereum Bridge Diagram](/content-images/image-0fd8f754ba.webp)

Protokol Namada juga memiliki kemampuan untuk terhubung secara mulus dengan chain mana pun yang memiliki finalitas cepat dan mendukung protokol Inter-Blockchain Communication (IBC). Dalam hal interoperabilitas dengan Ethereum, Namada menerapkan bridge Ethereum khusus dan aman yang beroperasi secara trustless. Bridge ini dirancang dengan cermat untuk memprioritaskan keamanan dengan menerapkan kontrol alur untuk semua koneksi bridge dan memperlakukan setiap transfer Ethereum yang bermasalah sebagai pelanggaran serius yang dapat mengakibatkan penalti slashing.

## Imbalan Set Terlindungi

Dalam pembaruan terbaru dari Protokol [Namada](https://blog.namada.net/what-is-namada/), pengguna yang memegang aset terlindungi diberikan insentif untuk berpartisipasi aktif dalam set terlindungi bersama. Hal ini dimungkinkan melalui integrasi sirkuit MASP yang telah diperbarui, yang kini mencakup Convert Circuit yang inovatif. Dengan memanfaatkan fitur baru ini, Namada mendorong pengguna untuk berkontribusi pada set terlindungi bersama dengan cara memegang aset terlindungi.

Dalam Namada, set terlindungi dianggap sebagai barang publik yang non-eksklusif dan anti-rivalrous. Ini berarti bahwa seiring semakin banyaknya individu yang menggunakan transfer terlindungi, tingkat jaminan privasi akan meningkat bagi setiap peserta. Protokol ini menyadari pentingnya adopsi dan partisipasi kolektif dalam meningkatkan privasi bagi semua pengguna. Oleh karena itu, dengan memberi insentif kepada pengguna untuk menyimpan aset terlindungi dan berkontribusi pada set terlindungi bersama, Namada mendorong ekosistem privasi yang lebih kuat dan tangguh.

## Transaksi Aset Terlindungi

Dalam hal transfer terlindungi, baik itu melibatkan Ethereum non-fungible token (NFT), ATOM, atau NAM, semuanya tidak dapat dibedakan satu sama lain. Ini berarti fitur pelindung privasi yang disediakan oleh MASP (Protokol Sapling Modified Accumulator), versi yang telah ditingkatkan dari sirkuit Sapling Zcash, berlaku secara seragam untuk semua jenis aset. Sirkuit MASP memungkinkan semua aset di dalam ekosistem Namada untuk berbagi set terlindungi yang sama. Pendekatan ini memastikan bahwa jaminan privasi tidak terfragmentasi di antara aset-aset individual. Terlepas dari volume transaksi yang terkait dengan aset tertentu, perlindungan privasi tetap konsisten dan independen.

![Shielded Assets Transaction Diagram](/content-images/image-1-512c639d56.webp)

Dengan menyatukan set terlindungi di berbagai aset yang berbeda, Namada memastikan bahwa privasi dijaga secara seragam, terlepas dari jenis aset spesifik yang terlibat dalam transfer terlindungi. Pendekatan ini mendorong kerangka kerja privasi yang kohesif di dalam protokol dan meningkatkan kerahasiaan transaksi yang melibatkan NFT Ethereum, ATOM, NAM, dan aset lain yang didukung. Namada juga memungkinkan transfer privat dari token fungible dan non-fungible menggunakan zk-SNARKs baru, memastikan kerahasiaan untuk token native maupun non-native sama seperti yang dilakukan pada Zcash.

## Biaya Lebih Rendah dan Transaksi Cepat

Namada menggabungkan dua elemen kunci untuk memberikan kecepatan transaksi dan finalitas yang cepat: pembuatan proof yang cepat dan konsensus Byzantine Fault Tolerant (BFT) modern. Kedua fitur ini memungkinkan Namada untuk mencapai tingkat pemrosesan transaksi yang sebanding dengan Visa, sebuah jaringan pembayaran terkenal yang diakui karena kemampuan throughput yang tinggi. Pembuatan proof yang cepat mengacu pada produksi cryptographic proof yang efisien untuk memvalidasi kebenaran dan integritas transaksi pada Blockchain. Dengan menggunakan teknik dan optimasi tingkat lanjut, Protokol Namada meminimalkan overhead komputasi yang diperlukan untuk menghasilkan proof ini, sehingga menghasilkan verifikasi dan konfirmasi transaksi yang cepat.

Selain itu, Namada menggunakan algoritma konsensus BFT modern, yang menjamin integritas dan kesepakatan transaksi di seluruh jaringan. Mekanisme konsensus ini memungkinkan Namada untuk mencapai konsensus pada urutan dan validitas transaksi, memberikan jaminan finalitas yang kuat. Dengan adanya finalitas, transaksi dianggap tidak dapat dibatalkan, sehingga mengurangi risiko pengeluaran ganda atau rollback transaksi. Namada mengikuti pendekatan yang serupa dengan Anoma, protokol lain yang dikenal karena solusi skalabilitasnya. Namada mengadopsi fractal instances, yang memungkinkan pembuatan chain bersarang di dalam blockchain utama. Struktur fractal ini memungkinkan penskalaan horizontal dengan mendistribusikan beban ke berbagai instance, sehingga meningkatkan kapasitas dan performa jaringan secara keseluruhan.

## Aliansi Strategis Namada dan Zcash

Berdasarkan publikasi terbaru yang dapat ditemukan di [Blog Namada](https://blog.namada.net/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/), tim di balik Protokol Namada dengan antusias menyajikan sebuah proposal dan request-for-comment (RFC) untuk aliansi strategis antara aset, chain, dan komunitas Namada dan Zcash.

![Namada-Zcash Strategic Alliance Diagram](/content-images/image-2-68804c60f3.webp)

Aliansi yang diusulkan ini mencakup tiga elemen utama. Pertama, terdapat sebuah grants pool yang akan dibuat untuk menyediakan pendanaan bagi proyek-proyek yang memberikan keuntungan bagi Zcash maupun Namada. Kedua, airdrop token NAM akan dialokasikan kepada pemegang ZEC. Terakhir, sebuah rencana telah disusun untuk membangun bridge dengan tingkat kepercayaan minimal (trust-minimized) yang menghubungkan Zcash dan Namada. Setelah diimplementasikan, bridge ini akan memungkinkan pemegang ZEC, yang disebut sebagai Zolders, untuk menggunakan ZEC mereka di Namada. Selain itu, Zolders akan memiliki kesempatan untuk mengakses ekosistem Cosmos dan Ethereum yang lebih luas melalui Namada. Kamu dapat mempelajari lebih lanjut tentang aliansi strategis ini di Forum Komunitas [Zcash](https://forum.zcashcommunity.com/t/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/44372)

## Tautan Referensi

- Video Resmi Protokol [Namada](https://www.youtube.com/watch?v=Wg_WtPdBig0)
- Situs Web Resmi Protokol [Namada](https://namada.net/)
- Blog [Namada](https://blog.namada.net/)
- Dokumentasi [Namada](https://docs.namada.net/)