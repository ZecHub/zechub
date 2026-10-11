<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Halo


## Apa itu Halo?

Halo adalah sebuah zero-knowledge proof (ZKP) rekursif yang trustless, ditemukan oleh Sean Bowe di Electric Coin Co. Teknologi ini menghilangkan trusted setup dan memungkinkan skalabilitas yang lebih besar pada blockchain Zcash. Halo adalah sistem zero-knowledge proof pertama yang efisien & rekursif dan dianggap secara luas sebagai sebuah terobosan ilmiah.

![halo](/content-images/_unavailable.svg "halo")


**Komponen**

Skema Komitmen Polinomial yang Ringkas: Memungkinkan seorang komiter untuk melakukan komitmen pada sebuah polinomial dengan string pendek yang dapat digunakan oleh verifikator untuk mengonfirmasi klaim evaluasi dari polinomial yang dikomit tersebut.

Polynomial Interactive Oracle Proof: Verifier meminta prover (algoritma) untuk membuka semua commitment pada berbagai titik pilihan mereka menggunakan skema polynomial commitment & memeriksa apakah identitas tersebut terbukti benar di antara mereka.


### Tanpa Trusted Setup

zkSNARKs bergantung pada common reference string (CRS) sebagai parameter publik untuk pembuktian & verifikasi. CRS ini harus dibuat sebelumnya oleh pihak terpercaya. Hingga baru-baru ini, komputasi multi-party (MPC) yang rumit dan aman seperti yang dilakukan oleh jaringan Aztec & Zcash diperlukan untuk memitigasi risiko yang terlibat selama [upacara setup terpercaya](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) ini.

Sebelumnya, Sprout & Sapling pool terlindungi milik Zcash menggunakan sistem zk-proving BCTV14 & Groth 16. Meskipun sistem ini aman, terdapat beberapa keterbatasan. Sistem tersebut tidak dapat diskalakan karena terikat pada satu aplikasi tunggal, "toxic waste" (sisa dari materi kriptografi yang dihasilkan selama upacara genesis) dapat tetap ada, dan terdapat elemen kepercayaan (meskipun sangat kecil) bagi pengguna untuk menganggap upacara tersebut dapat diterima.

Dengan meruntuhkan berulang kali beberapa instansi dari masalah sulit bersama-sama melalui siklus kurva eliptik sehingga proof komputasi dapat digunakan untuk menalar dirinya sendiri secara efisien (amortisasi bersarang), kebutuhan akan trusted setup dapat dihilangkan. Hal ini juga berarti bahwa structured reference string (output dari seremoni) dapat ditingkatkan, yang memungkinkan aplikasi seperti smart contract.

Halo memberikan dua jaminan penting kepada pengguna terkait keamanan sistem zero-knowledge proof skala besar. Pertama, hal ini memungkinkan pengguna untuk membuktikan bahwa tidak ada seorang pun yang terlibat dalam genesis ceremony telah membuat backdoor rahasia untuk mengeksekusi transaksi penipuan. Kedua, hal ini memungkinkan pengguna untuk menunjukkan bahwa sistem tetap aman dari waktu ke waktu, bahkan saat telah mengalami pembaruan dan perubahan.

Penjelasan [Sean Bowes mengenai Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)
 


### Recursive Proofs

Komposisi proof rekursif memungkinkan satu proof untuk memberikan kesaksian atas kebenaran dari jumlah proof lain yang praktis tidak terbatas, sehingga memungkinkan sejumlah besar komputasi (dan informasi) untuk dikompresi. Ini adalah komponen penting untuk skalabilitas, terutama karena hal ini memungkinkan kita untuk menskalakan jaringan secara horizontal sambil tetap memungkinkan kelompok partisipan untuk mempercayai integritas dari sisa jaringan lainnya.

Sebelum Halo, mencapai komposisi proof rekursif memerlukan biaya komputasi yang besar dan sebuah trusted setup. Salah satu penemuan utamanya adalah teknik yang disebut **nested amortization**. Teknik ini memungkinkan komposisi rekursif menggunakan skema polynomial commitment berbasis inner product argument, yang secara masif meningkatkan performa dan menghindari trusted setup.

Dalam makalah [Halo](https://eprint.iacr.org/2019/1021.pdf), kami telah mendeskripsikan skema commitment polinomial ini secara lengkap dan menemukan adanya teknik agregasi baru di dalamnya. Teknik ini memungkinkan sejumlah besar proof yang dibuat secara independen untuk diverifikasi hampir secepat verifikasi satu proof tunggal. Hal ini saja sudah menawarkan alternatif yang lebih baik daripada zk-SNARKs sebelumnya yang digunakan dalam Zcash.


### Halo 2

Halo 2, adalah implementasi zk-SNARK berperforma tinggi yang ditulis dalam Rust yang menghilangkan kebutuhan akan trusted setup sekaligus mempersiapkan landasan bagi skalabilitas di Zcash.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

Ini mencakup generalisasi dari pendekatan kami yang disebut sebagai **skema akumulasi**. Formalisasi baru ini menunjukkan bagaimana teknik amortisasi bersarang kami sebenarnya bekerja; dengan menambahkan proof ke sebuah objek yang disebut **accumulator**, di mana proof tersebut menalar tentang status sebelumnya dari accumulator, kita dapat memeriksa bahwa semua proof sebelumnya sudah benar (melalui induksi) hanya dengan memeriksa status saat ini dari accumulator.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>



Secara paralel, banyak tim lainnya menemukan Polynomial IOPs baru yang lebih efisien daripada Sonic (yang digunakan dalam Halo 1), seperti Marlin.

Protokol baru yang paling efisien dari semua ini adalah PLONK, yang memberikan fleksibilitas luar biasa dalam merancang implementasi efisien berdasarkan kebutuhan spesifik aplikasi dan memberikan waktu pembuktian (prover time) 5x lebih baik daripada Sonic.

Ringkasan [ PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### Bagaimana hal ini bermanfaat bagi Zcash?

Orchard Shielded pool diaktifkan dengan NU5 & merupakan implementasi dari sistem proof baru ini pada Jaringan Zcash. Dilindungi oleh desain turnstile yang sama seperti yang digunakan antara Sprout dan Sapling dengan tujuan untuk secara bertahap menghentikan penggunaan pool terlindungi yang lebih lama. Hal ini mendorong migrasi ke sistem proof yang sepenuhnya trustless, memperkuat kepercayaan pada keandalan basis moneter, serta mengurangi kompleksitas implementasi dan surface serangan dari Zcash secara keseluruhan. Menyusul aktivasi NU5 pada pertengahan 2022, integrasi recursive proofs menjadi memungkinkan (meskipun ini belum lengkap). Beberapa peningkatan privasi juga dilakukan secara tangensial. Pengenalan 'Actions' untuk menggantikan input/output membantu mengurangi jumlah metadata transaksi.

Setup terpercaya umumnya sulit untuk dikoordinasikan & menghadirkan risiko sistemik. Hal ini perlu diulang untuk setiap peningkatan protokol utama. Menghapusnya menghadirkan peningkatan substansial dalam mengimplementasikan peningkatan protokol baru secara aman.

Komposisi proof rekursif memiliki potensi untuk mengompres jumlah komputasi yang tidak terbatas, menciptakan sistem terdistribusi yang dapat diaudit, membuat Zcash sangat mumpuni terutama dengan peralihan ke Proof of Stake. Hal ini juga berguna untuk ekstensi seperti Zcash Shielded Assets dan meningkatkan kapasitas Layer 1 pada penggunaan full node tingkat tinggi di tahun-tahun mendatang bagi Zcash.


## Halo dalam ekosistem yang lebih luas

Electric Coin Company telah menjalin perjanjian dengan Protocol Labs, Filecoin Foundation, dan Ethereum Foundation untuk mengeksplorasi R&D Halo, termasuk bagaimana teknologi tersebut dapat digunakan dalam jaringan mereka masing-masing. Perjanjian ini bertujuan untuk memberikan skalabilitas, interoperabilitas, dan privasi yang lebih baik di seluruh ekosistem dan untuk Web 3.0.

Selain itu, Halo 2 berada di bawah lisensi open-source [MIT dan Apache 2.0](https://github.com/zcash/halo2#readme), yang berarti siapa pun dalam ekosistem dapat membangun menggunakan sistem pembuktian tersebut.

### Filecoin

Sejak peluncurannya, library halo2 telah diadopsi dalam proyek-proyek seperti zkEVM, terdapat potensi integrasi Halo 2 ke dalam sistem proof untuk Filecoin Virtual Machine. Filecoin memerlukan banyak proof of spacetime / proof of replication yang mahal. Halo2 akan menjadi sangat penting dalam mengompres penggunaan ruang, sehingga meningkatkan skalabilitas jaringan dengan lebih baik.

Video Filecoin Foundation bersama [Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)

Selain itu, akan sangat bermanfaat bagi ekosistem Filecoin dan Zcash jika pembayaran penyimpanan Filecoin dapat dilakukan dalam ZEC, sehingga memberikan tingkat privasi yang sama untuk pembelian penyimpanan seperti yang ada pada transfer terlindungi Zcash. Dukungan ini akan menambah kemampuan untuk mengenkripsi file di penyimpanan Filecoin dan menambahkan dukungan ke mobile client agar mereka dapat **melampirkan** media atau file ke sebuah memo terenkripsi Zcash.

[ECC x Postingan Blog Filecoin](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum

Implementasi Halo 2 proof untuk Verifiable Delay Function (VDF) efisien yang sedang dikembangkan. VDF adalah primitif kriptografi yang memiliki banyak potensi kegunaan.

Ini dapat digunakan sebagai sumber keacakan tujuan umum termasuk penggunaan dalam aplikasi smart contract serta pemilihan pemimpin dalam Proof of Stake pada Ethereum & protokol lainnya.

ECC, Filecoin Foundation, Protocol Labs, dan Ethereum Foundation juga akan bekerja sama dengan [SupraNational](https://www.supranational.net/), sebuah vendor yang berspesialisasi dalam kriptografi berbasis akselerasi perangkat keras, untuk potensi desain dan pengembangan GPU serta ASIC dari VDF.

Grup [Privacy and Scaling Exploration](https://appliedzkp.org/) juga sedang meneliti berbagai cara bagaimana Halo 2 proofs dapat meningkatkan privasi dan skalabilitas bagi ekosistem Ethereum. Grup ini bernaung di bawah Ethereum foundation, dan memiliki fokus yang luas pada zero-knowledge proofs dan primitif kriptografi.

## Proyek lain yang menggunakan Halo

+ [Anoma, sebuah protokol atomic swap multichain yang menjaga privasi](https://anoma.net/blog/hash-functions-in-plonkup)

+ [Oribis, sebuah L2 zkRollup di Cardano](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, sebuah blockchain zkEVM L1 privat](https://dark.fi/book/arch/arch.html)

+ [Scroll, sebuah L2 zkRollup di Ethereum](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**Pembelajaran Lebih Lanjut**:

[Pengenalan tentang zkp dan halo 2 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2 bersama Daira & Str4d - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

Blog Penjelasan Teknis [](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Halo 2 Showcase Komunitas - Ying Tong @Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Dokumentasi**

[Halo 2 sumber daya](https://github.com/mhchia/awesome-halo2)

[Halo 2 dokumen](https://zcash.github.io/halo2/)

[Halo 2 github](https://github.com/zcash/halo2)