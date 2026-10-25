<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo

## TL;DR

Halo adalah sistem proof zero-knowledge rekursif tanpa kepercayaan (ZKP) yang ditemukan oleh Sean Bowe di Electric Coin Co. Sistem ini menghilangkan kebutuhan akan trusted setup dan membuat komposisi proof rekursif menjadi praktis, yang merupakan dasar roadmap skalabilitas dan keamanan Zcash saat ini.

- **Apa itu:** konstruksi zk-SNARK dengan rekursi yang efisien dan tanpa upacara trusted setup.
- **Mengapa penting:** pool terlindungi Orchard milik Zcash, yang diaktifkan bersama NU5 pada 2022, berjalan menggunakan Halo 2 — implementasi produksi dari penelitian ini.
- **Properti utama:** tidak ada "limbah beracun" dari upacara setup, serta proof yang dapat mengesahkan proof lain dalam jumlah praktis tak terbatas.
- **Lisensi:** Halo 2 bersifat open source di bawah [MIT dan Apache 2.0](https://github.com/zcash/halo2#readme), sehingga siapa pun dalam ekosistem dapat membangun di atasnya.

---

## Penjelasan Inti

Halo adalah sistem proof zero-knowledge rekursif tanpa kepercayaan yang ditemukan oleh Sean Bowe di Electric Coin Co. Sistem ini menghilangkan trusted setup dan memungkinkan skalabilitas blockchain Zcash yang lebih besar. Halo merupakan sistem proof zero-knowledge pertama yang sekaligus efisien dan rekursif — yang secara luas dianggap sebagai terobosan ilmiah.

![halo](/content-images/_unavailable.svg "halo")

### Dua komponen

- **Skema Komitmen Polinomial Ringkas.** Memungkinkan pembuat komitmen untuk berkomitmen pada suatu polinomial dengan string pendek yang dapat digunakan oleh verifier untuk mengonfirmasi evaluasi yang diklaim dari polinomial yang dikomitmenkan.
- **Proof Oracle Interaktif Polinomial.** Verifier meminta prover (sebuah algoritme) untuk membuka semua komitmen pada titik-titik yang dipilihnya, menggunakan skema komitmen polinomial, lalu memeriksa bahwa identitas di antara semuanya benar.

### Tanpa trusted setup

zk-SNARKs bergantung pada common reference string (CRS) sebagai parameter publik untuk pembuktian dan verifikasi. CRS ini harus dibuat terlebih dahulu oleh pihak tepercaya. Hingga baru-baru ini, komputasi multi-pihak aman (MPC) yang rumit — seperti yang dilakukan oleh jaringan Aztec dan Zcash — diperlukan untuk memitigasi risiko selama [upacara trusted setup](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) ini.

Pool terlindungi Sprout dan Sapling terdahulu milik Zcash menggunakan sistem zk-proving BCTV14 dan Groth16. Walaupun aman, sistem-sistem tersebut memiliki keterbatasan: tidak dapat diskalakan karena terikat pada satu aplikasi, "limbah beracun" (sisa material kriptografis yang dihasilkan selama upacara genesis) dapat tetap ada, dan terdapat unsur kepercayaan (meskipun sangat kecil) dalam menyatakan upacara tersebut dapat diterima.

Halo menghilangkan trusted setup dengan berulang kali menciutkan beberapa instans masalah sulit secara bersama-sama dalam siklus kurva eliptik, sehingga proof komputasional dapat digunakan untuk menalar tentang dirinya sendiri secara efisien (amortisasi bersarang). Efek sampingnya adalah structured reference string (hasil dari sebuah upacara) dapat ditingkatkan, sehingga memungkinkan aplikasi seperti smart contract.

Halo memberikan pengguna dua jaminan penting mengenai keamanan sistem proof zero-knowledge berskala besar. Pertama, sistem ini memungkinkan pengguna membuktikan bahwa tidak seorang pun yang terlibat dalam upacara genesis telah menciptakan backdoor rahasia untuk menjalankan transaksi curang. Kedua, sistem ini memungkinkan pengguna menunjukkan bahwa sistem tetap aman seiring waktu, bahkan ketika telah mengalami pembaruan dan perubahan.

[Sean BowePenjelasan di Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## Visual / Analogi

### Rantai notaris

Bayangkan zk-SNARK biasa sebagai dokumen yang dinotariskan: satu cap, satu verifikasi, selesai. Kini bayangkan Anda perlu membuktikan bahwa tumpukan sepuluh ribu dokumen autentik. Tanpa rekursi, verifier harus memeriksa setiap cap.

Halo mengubah setiap dokumen yang telah diverifikasi menjadi cap pada dokumen *berikutnya*, hingga seluruh tumpukan menciut menjadi satu dokumen dengan satu cap. Memeriksa dokumen terakhir cukup untuk memercayai seluruh rantai — dan yang terpenting, notaris Halo (sistem proving) membuat capnya sendiri tanpa pernah memerlukan otoritas eksternal untuk menyiapkan segelnya.

### Mengapa menghilangkan trusted setup penting

Dalam sistem lama, "segel" (CRS) berasal dari sebuah upacara. Para peserta harus menghancurkan material perantara, dan semua orang harus memercayai bahwa mereka melakukannya. Segel Halo dihasilkan oleh matematika saja: tidak ada yang perlu dihancurkan, tidak ada yang dapat bocor, dan tidak ada upacara yang perlu dipercayai.

---

## Pendalaman

### Proof rekursif

Komposisi proof rekursif memungkinkan satu proof untuk mengesahkan kebenaran proof lain dalam jumlah praktis tak terbatas, dengan mengompresi sejumlah besar komputasi (dan informasi). Ini merupakan komponen penting untuk skalabilitas, karena memungkinkan jaringan diskalakan secara horizontal sementara kelompok peserta tetap dapat memercayai integritas sisa jaringan.

Sebelum Halo, mencapai komposisi proof rekursif memerlukan biaya komputasi besar dan trusted setup. Salah satu penemuan utamanya adalah teknik bernama **amortisasi bersarang**: komposisi rekursif yang menggunakan skema komitmen polinomial berdasarkan argumen inner product, yang sangat meningkatkan performa sambil menghindari trusted setup.

Makalah [Halo](https://eprint.iacr.org/2019/1021.pdf) menjelaskan sepenuhnya skema komitmen polinomial ini dan menemukan bahwa teknik agregasi baru ada di dalamnya. Teknik ini memungkinkan sejumlah besar proof yang dibuat secara independen untuk diverifikasi hampir secepat memverifikasi satu proof. Dengan sendirinya, hal itu telah menawarkan alternatif yang lebih baik daripada zk-SNARKs sebelumnya yang digunakan dalam Zcash.

### Halo 2

Halo 2 adalah implementasi zk-SNARK berperforma tinggi yang ditulis dalam Rust, yang menghilangkan kebutuhan akan trusted setup sekaligus mempersiapkan skalabilitas di Zcash.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

Sistem ini mencakup generalisasi pendekatan yang disebut **skema akumulasi**. Formalisasi ini menjelaskan cara amortisasi bersarang sebenarnya bekerja: dengan menambahkan proof ke objek bernama **akumulator**, ketika setiap proof menalar tentang keadaan sebelumnya dari akumulator, seluruh proof sebelumnya dapat diperiksa (melalui induksi) hanya dengan memeriksa keadaan akumulator saat ini.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

Secara paralel, banyak tim lain menemukan IOP Polinomial yang lebih efisien daripada Sonic (yang digunakan dalam Halo 1), seperti Marlin. Protokol paling efisien di antaranya adalah PLONK, yang memberikan fleksibilitas besar dalam merancang implementasi efisien berdasarkan kebutuhan khusus aplikasi dan menyediakan waktu prover 5× lebih baik daripada Sonic.

[Ikhtisar PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### Halo dalam ekosistem yang lebih luas

Electric Coin Company mengadakan perjanjian dengan Protocol Labs, Foundation Filecoin, dan Ethereum Foundation untuk mengeksplorasi R&D Halo, termasuk bagaimana teknologi tersebut dapat digunakan di jaringan masing-masing. Perjanjian ini bertujuan menyediakan skalabilitas, interoperabilitas, dan privasi yang lebih baik di seluruh ekosistem serta untuk Web 3.0.

Selain itu, Halo 2 berada di bawah [lisensi open-source MIT dan Apache 2.0](https://github.com/zcash/halo2#readme), yang berarti siapa pun dalam ekosistem dapat membangun dengan sistem proving tersebut.

**Filecoin.** Sejak penerapannya, library halo2 telah diadopsi dalam proyek seperti zkEVM, dan terdapat potensi integrasi Halo 2 ke dalam sistem proof untuk Virtual Machine Filecoin. Filecoin memerlukan banyak proof of spacetime dan proof of replication yang mahal; Halo 2 sangat penting dalam mengompresi penggunaan ruang dan menskalakan jaringan dengan lebih baik. [FilecoinVideo Foundation bersama Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw). Kedua ekosistem juga akan diuntungkan jika pembayaran penyimpanan Filecoin dapat dilakukan dalam ZEC, yang memberikan privasi sama untuk pembelian penyimpanan seperti yang ada dalam transfer terlindungi Zcash — termasuk mengenkripsi file dalam penyimpanan Filecoin dan mendukung klien seluler yang melampirkan media ke memo terenkripsi Zcash. [ECC × FilecoinPostingan blog](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum.** Proof Halo 2 untuk Verifiable Delay Function (VDF) yang efisien sedang dikembangkan. VDF adalah primitif kriptografis dengan banyak potensi use case, termasuk randomisasi tujuan umum untuk smart contract dan pemilihan pemimpin dalam Proof of Stake. ECC, Foundation Filecoin, Protocol Labs, dan Ethereum Foundation juga bekerja dengan [SupraNational](https://www.supranational.net/), vendor yang mengkhususkan diri dalam kriptografi berakselerasi hardware, untuk potensi pengembangan GPU dan ASIC VDF. Kelompok [Privacy and Scaling Explorations](https://appliedzkp.org/) sedang meneliti cara tambahan agar proof Halo 2 dapat meningkatkan privasi dan skalabilitas Ethereum.

### Proyek lain yang menggunakan Halo

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) — protokol atomic swap multichain yang menjaga privasi
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — zkRollup L2 di Cardano
- [Darkfi](https://dark.fi/book/arch/arch.html) — blockchain zkEVM L1 privat
- [Scroll](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) — zkRollup L2 di Ethereum

---

## Implikasi Praktis

**Untuk Zcash sendiri**

- Pool terlindungi Orchard, yang diaktifkan bersama NU5, adalah implementasi sistem proof baru ini pada jaringan Zcash. Pool ini dijaga oleh desain turnstile yang sama seperti yang digunakan antara Sprout dan Sapling, dengan tujuan secara bertahap menghentikan pool terlindungi yang lebih lama.
- Setelah NU5 (pertengahan 2022), integrasi proof rekursif menjadi mungkin, dan beberapa peningkatan privasi menyertainya — terutama diperkenalkannya 'Actions' yang menggantikan input/output, sehingga mengurangi jumlah metadata transaksi.
- Menghilangkan trusted setup menghapus risiko sistemik yang sebaliknya harus diulang untuk setiap peningkatan protokol besar.

**Untuk pemegang dan operator**

- Komposisi proof rekursif berpotensi mengompresi jumlah komputasi tanpa batas, menciptakan sistem terdistribusi yang dapat diaudit, dan meningkatkan kapasitas Layer 1 bagi operator full node — relevan untuk ekstensi seperti Shielded Assets Zcash dan desain jangka panjang Zcash.

---

## Kesalahan Umum

| Keyakinan umum | Keadaan sebenarnya |
| --- | --- |
| "Halo adalah peningkatan masa depan yang sedang ditunggu oleh Zcash." | Orchard, yang aktif di mainnet sejak NU5 (2022), sudah berjalan menggunakan Halo 2. |
| "Tanpa trusted setup berarti tidak ada parameter sama sekali." | Halo tetap menggunakan parameter terstruktur; perbedaannya adalah parameter tersebut tidak mengandung limbah beracun dan dapat dibuat serta ditingkatkan tanpa upacara yang harus dipercayai peserta. |
| "Halo 2 dan makalah Halo adalah hal yang sama." | Makalah [](https://eprint.iacr.org/2019/1021.pdf) menjelaskan skema komitmen polinomial dan amortisasi bersarang; Halo 2 adalah implementasi produksi Rust dengan skema akumulasi dan aritmetisasi PLONKish. |
| "Rekursi hanya membantu menskalakan verifikasi blok." | Rekursi juga mengompresi komputasi tingkat aplikasi — lihat proof of spacetime/replication Filecoin dan pekerjaan VDF untuk Ethereum. |

---

## Halaman Terkait

- [zk-SNARKs](/zcash-tech/zk-snarks) — kategori teknologi umum tempat Halo berada
- [Halo (makalah penelitian)](https://eprint.iacr.org/2019/1021.pdf) — publikasi asli
- [Ironwood](/zcash-tech/ironwood) dan [The Turnstile](/zcash-tech/the-turnstile) — cara pool terlindungi bermigrasi sementara pool lama dihentikan
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — ekstensi yang mendapat manfaat dari proof rekursif
- [Zebra Full Node](/zcash-tech/zebra-full-node) — implementasi node yang memvalidasi proof di chain

## Pembelajaran Lebih Lanjut

- [Pengantar ZKP dan Halo 2 — Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 bersama Daira & Str4d — ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Blog penjelasan teknis](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 Community Showcase — Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Dokumentasi**

- [Sumber daya Halo 2](https://github.com/mhchia/awesome-halo2)
- [Dokumentasi Halo 2](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)
