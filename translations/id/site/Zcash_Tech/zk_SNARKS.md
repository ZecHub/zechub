<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# ZKP & ZK-SNARKS

## Ringkasan Singkat

- **ZK-SNARKs** = Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge
- Teknologi ini memungkinkan satu pihak untuk **membuktikan bahwa mereka mengetahui sesuatu** tanpa mengungkapkan informasi itu sendiri
- Zcash menggunakan ZK-SNARKs untuk membuktikan bahwa sebuah transaksi valid (jumlah yang benar, input yang belum terpakai) **tanpa mengungkapkan pengirim, penerima, atau jumlahnya**
- "Succinct" berarti proof tersebut sangat kecil dan cepat untuk diverifikasi bahkan untuk pernyataan yang kompleks
- Pool Orchard menggunakan Halo 2, sebuah sistem ZK-SNARK yang **tidak memerlukan trusted setup**

---

## Apa itu Proof?

Proof adalah dasar bagi semua matematika. Sebuah proof adalah sebuah klaim atau teorema yang sedang Anda coba buktikan & urutan derivasi yang dibuat untuk menyatakan bahwa teorema tersebut telah terbukti. misal, semua sudut dalam sebuah segitiga berjumlah 180° dapat diperiksa secara independen oleh siapa pun (verifier).

**Proof**

Prover ---> Membuat Klaim ---> Verifier Memilih ---> Terima/Tolak

(Baik prover maupun verifier adalah algoritma)

Dalam ilmu komputer, istilah untuk proof yang dapat diverifikasi secara efisien adalah proof NP. Proof singkat ini dapat diverifikasi dalam waktu polinomial. Ide besarnya adalah "Terdapat solusi untuk sebuah teorema & solusi tersebut diberikan kepada verifier untuk memeriksanya".


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="/content-images/d25345cf-e958-4ce2-b01d-f4e7f2db9551-1ac56e56d7.webp" alt="" width="600" height="400"/>
</a>


Dalam bahasa NP = dua kondisi harus terpenuhi:

Kelengkapan: Klaim yang benar akan diterima oleh verifier (memungkinkan prover yang jujur untuk mencapai verifikasi)

Keabsahan: Klaim palsu tidak akan memiliki proof (untuk semua strategi pembukti yang curang, mereka tidak akan mampu membuktikan kebenaran dari klaim yang salah).


### Proof Interaktif & Probabilistik

**Interaksi**: Alih-alih hanya membaca proof tersebut, verifikator berinteraksi dengan pembukti secara bolak-balik melalui beberapa putaran pesan.

**Randomness**: Permintaan verifier kepada prover diacak dan prover harus dapat menjawab setiap permintaan dengan benar.


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="/content-images/1542be12-d3fd-4934-8413-0d16f95b8d10-58bfcb4059.webp" alt="" width="600" height="400"/>
</a>


Dengan menggunakan interaksi dan keacakan secara bersama-sama, dimungkinkan untuk membuktikan suatu klaim kepada verifikator buta dalam Probabilistic Polynomial Time (PPT).

Dapatkah Interactive Proofs memverifikasi lebih banyak daripada proof NP secara efisien?

NP Proofs vs IP proofs:

|  Pernyataan   |    NP     | IP    |
|--------------|-----------|--------|
|    NP        |  ya      |  ya   |
|    CO-NP     |  tidak       |  ya   |
|    #P        |  tidak       |  ya   |
|    PSPACE    |  tidak       |  ya   |


NP - Terdapat solusi untuk sebuah pernyataan

CO-NP - Membuktikan tidak adanya solusi untuk sebuah pernyataan

#P - Untuk menghitung berapa banyak solusi yang ada dari sebuah pernyataan

PSPACE - Membuktikan sebuah alternasi dari pernyataan yang berbeda

### Apa itu Zero-knowledge?

Apa yang dapat dihitung oleh seorang verifikator setelah sebuah interaksi adalah identik dengan apa yang dapat mereka buktikan sebelumnya. Interaksi selama beberapa putaran antara pembukti & verifikator tidak telah meningkatkan kekuatan komputasi dari verifikator tersebut.

**Simulasi Paradigm**

Eksperimen ini ada di seluruh kriptografi. Ini menghadirkan "Tampilan Nyata" & "Tampilan Simulasi".

Pandangan Nyata: Semua kemungkinan riwayat interaksi antara Prover & Verifier (P,V)

Tampilan Simulasi: Verifier mensimulasikan semua interaksi yang mungkin antara Prover & Verifier

<a href="">
    <img width="850" height="397" alt="simulation1" src="/content-images/0e68649d-a231-44d8-a76a-25a307f68b9e-ba1f0027cf.webp"  alt="" width="600" height="400"/>
</a>

Sebuah distinguisher berwaktu polinomial melakukan upaya untuk menentukan apakah mereka sedang melihat tampilan asli atau simulasi dan meminta sampel dari keduanya secara berulang-ulang.

Kedua pandangan tersebut dikatakan "secara komputasi tidak dapat dibedakan" jika untuk semua algoritma/strategi pembeda, bahkan setelah menerima jumlah sampel polinomial dari yang asli atau simulasi, probabilitasnya adalah >1/2.

**Argumen Zero-knowledge of Knowledge**

Sebuah protokol interaktif (P,V) adalah zero-knowledge jika terdapat sebuah simulator (algoritma) sedemikian rupa sehingga untuk setiap verifier dengan waktu polinomial probabilitas (ketika teorema tersebut benar), distribusi probabilitas yang menentukan perbedaan antara view asli dan simulasi tidak dapat dibedakan secara komputasi.

Protokol Interaktif sangat berguna ketika hanya ada satu verifikator. Sebuah contohnya adalah auditor pajak dalam aplikasi zero-knowledge 'proof of taxes'.

## Apa itu SNARK?

**Succinct Non-Interactive Argument of Knowledge**

Definisi luas - Sebuah proof ringkas bahwa suatu pernyataan adalah benar. Proof tersebut harus singkat dan cepat untuk diverifikasi. Dalam SNARKs, sebuah pesan tunggal dikirim dari Prover ke Verifier. Verifier kemudian dapat memilih untuk menerima atau menolak.

contoh pernyataan: "Saya mengetahui sebuah pesan (m) sedemikian sehingga SHA256(m)=0"

Dalam sebuah zk-SNARK, proof tidak mengungkapkan apa pun tentang pesan (m).

**Polinomial**: Jumlah dari suku-suku yang mengandung konstanta (seperti 1,2,3), variabel (seperti x,y,z), dan eksponen dari variabel (seperti x², y³).

3x² + 8x + 17

**Sirkuit Aritmetika**: Sebuah model untuk menghitung polinomial. Secara lebih umum, ini dapat didefinisikan sebagai Directed Acyclic Graph di mana pada setiap node grafik dilakukan sebuah operasi aritmetika. Sirkuit ini terdiri dari gate penjumlahan, gate perkalian, dan beberapa gate konstanta. Dengan cara yang sama seperti sirkuit Boolean membawa bit dalam kabel, sirkuit Aritmetika membawa integer.


<a href="">
<img width="785" height="368" alt="circuit1" src="/content-images/be1de1d6-60d3-4fd1-b9a2-5094c65d696f-dbd3177247.webp" alt="" width="300" height="200"/>
</a>

Dalam contoh ini, pembukti ingin meyakinkan verifikator bahwa ia mengetahui solusi untuk sirkuit aritmetika tersebut.

**Commitments**: Untuk melakukan ini, pembukti akan memasukkan semua nilai (privat dan publik) yang terkait dengan sirkuit ke dalam sebuah commitment. Commitment menyembunyikan inputnya dengan menggunakan fungsi yang outputnya tidak dapat dibalikkan.

Sha256 adalah salah satu contoh fungsi hashing yang dapat digunakan dalam skema komitmen.

Setelah pembukti melakukan komitmen terhadap nilai-nilai tersebut, komitmen dikirim ke verifikator (dengan keyakinan bahwa mereka tidak dapat mengungkap nilai asli apa pun). Pembukti kemudian dapat menunjukkan kepada verifikator pengetahuan tentang setiap nilai pada node di graf tersebut.

**Transformasi Fiat-Shamir**

Untuk membuat protokol menjadi *non-interactive*, pembukti menghasilkan keacakan (yang digunakan untuk tantangan tersembunyi) atas nama verifikator menggunakan fungsi hash kriptografi. Hal ini dikenal sebagai random oracle. Pembukti kemudian dapat mengirimkan satu pesan tunggal kepada verifikator yang setelah itu dapat memeriksa kebenarannya.

Untuk membentuk SNARK yang dapat digunakan untuk sirkuit umum, diperlukan dua elemen:

Skema komitmen fungsional: Memungkinkan seorang komiter untuk melakukan komitmen pada sebuah polinomial dengan string pendek yang dapat digunakan oleh verifier untuk mengonfirmasi klaim evaluasi dari polinomial yang dikomit tersebut.

Oracle interaktif polinomial: Verifier meminta prover (algoritma) untuk membuka semua commitment pada berbagai titik pilihan mereka menggunakan skema polynomial commitment & memeriksa apakah identitas tetap terpenuhi di antara mereka.

**Persiapan**

Prosedur pengaturan membantu verifikator dengan meringkas sirkuit & menghasilkan parameter publik.

<a href="">
<img width="845" height="398" alt="setup1" src="/content-images/c41212ca-b5e9-4ac8-8695-be612c45a679-80a6a87752.webp" alt="" width="600" height="300"/>
</a>

**Jenis pengaturan pra-pemrosesan**:

Trusted Setup per sirkuit - Dijalankan satu kali per sirkuit. Bersifat spesifik untuk sebuah sirkuit & keacakan rahasia (Common Reference String) harus dijaga kerahasiaannya + dimusnahkan.

Pengaturan yang terkompromi dalam metode ini berarti pembuktian (prover) yang tidak jujur dapat membuktikan pernyataan yang salah.

Setup Terpercaya namun Universal - Hanya perlu menjalankan trusted setup satu kali dan setelah itu dapat melakukan pra-pemrosesan beberapa sirkuit secara deterministik.

Setup Transparan (Tanpa Trusted Setup) - Algoritma preprocessing tidak menggunakan keacakan rahasia sama sekali.


**Jenis konstruksi SNARK proof**:

[Groth16](https://www.youtube.com/watch?v=QDplVkyncYQ): Memerlukan Trusted Setup tetapi memiliki proof yang sangat singkat yang dapat diverifikasi dengan cepat.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[Plonk](https://eprint.iacr.org/2019/953): Setup Terpercaya Secara Universal.

[DARK](https://www.youtube.com/watch?v=_ZDM7NwSxEY)/[HALO](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): Tanpa Trusted Setup tetapi menghasilkan proof yang sedikit lebih panjang atau mungkin membutuhkan waktu lebih lama bagi prover untuk berjalan.

SNARKs sangat berguna ketika diperlukan banyak verifikator seperti blockchain seperti Zcash atau zk-Rollup seperti [Aztec](https://docs.aztec.network) sehingga banyak node validasi tidak perlu berinteraksi selama beberapa ronde dengan setiap proof.

## Bagaimana zk-SNARK diimplementasikan dalam Zcash?

Secara umum, zero-knowledge proofs adalah sebuah alat untuk menegakkan perilaku jujur dalam protokol tanpa mengungkapkan informasi apa pun.

Zcash adalah blockchain publik yang memfasilitasi transaksi privat. zk-SNARK digunakan untuk membuktikan bahwa sebuah transaksi privat valid dalam aturan konsensus jaringan tanpa mengungkapkan detail lain mengenai transaksi tersebut.

[Video Penjelasan](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - Dalam kuliah ini Ariel Gabizon memberikan deskripsi tentang Zcash Note Commitment Tree, Blind Polynomial Evaluation & Homomorphically Hidden Challenges dan bagaimana semuanya diimplementasikan pada jaringan.

Baca buku [Halo2](https://zcash.github.io/halo2/index.html) untuk informasi lebih lanjut.

## Aplikasi Zero-Knowledge Lainnya

zk-SNARKs memberikan beberapa keuntungan dalam berbagai aplikasi yang berbeda. Mari kita lihat beberapa contohnya.

**Skalabilitas**: Hal ini dicapai melalui 'Outsourcing Computation'. Tidak ada kebutuhan mutlak akan zero-knowledge bagi sebuah rantai L1 untuk memverifikasi pekerjaan dari layanan off-chain. Transaksi tidak selalu bersifat privat pada zk-EVM.

Keuntungan dari layanan Rollup berbasis proof (zk-Rollup) adalah memproses batch yang berisi ratusan/ribuan transaksi & L1 mampu memverifikasi sebuah proof ringkas bahwa semua transaksi telah diproses dengan benar, meningkatkan throughput transaksi jaringan dengan faktor 100 atau 1000.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="/content-images/a3cbb5c9-8767-4b34-9fcb-868ca421838f-d69b264b5b.webp" width="600" height="300"/>
</a>


**Interoperabilitas**: Hal ini dicapai pada zk-Bridge dengan 'mengunci' aset di chain sumber dan membuktikan kepada chain tujuan bahwa aset tersebut telah dikunci (proof of consensus).

**Kepatuhan**: Proyek seperti [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) mampu membuktikan bahwa sebuah transaksi privat telah patuh terhadap hukum perbankan setempat tanpa mengungkapkan detail dari transaksi tersebut.

**Melawan Disinformasi**: Di antara beberapa contoh di luar blockchain & cryptocurrency, penggunaan pembuatan proof pada gambar yang telah diproses oleh outlet berita & media untuk memungkinkan penonton memverifikasi sumber gambar dan semua operasi yang dilakukan padanya secara independen. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Pembelajaran Lebih Lanjut:

Bibliografi Zero-Knowledge [ - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

zkSNARK dengan [Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 dan SNARKs tanpa Trusted Setups - Sean Bowe di Dystopia labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Zero knowledge Proofs dengan Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Zero-Knowledge Proofs Interaktif - Artikel Chainlink](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Kuliah 1: Pengantar dan Sejarah ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Penjelasan Sederhana tentang Sirkuit Aritmetika - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[Skalabilitas itu Membosankan, Privasi Sudah Mati: ZK-Proofs, Apa Kegunaannya?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## Halaman Terkait

- [Pool terlindungi](/using-zcash/shielded-pools) — Bagaimana ZK-SNARKs digunakan dalam pool nilai Zcash
- [Halo](/zcash-tech/halo) — Sistem ZK-SNARK Zcash yang menghilangkan trusted setup
- [Keamanan Post-Quantum dalam Zcash](/zcash-tech/post-quantum-security) - Bagaimana risiko kuantum di masa depan berkaitan dengan kriptografi Zcash
- [Zcash Aset Terlindungi](/zcash-tech/zcash-shielded-assets) — ZSAs yang dibangun di atas teknologi ZK-SNARK
- [Apa itu ZEC dan Zcash](/start-here/what-is-zec-and-zcash) — Pengenalan terhadap Zcash dan model privasinya
- [Privasi sebagai Prinsip Utama](/privacy/privacy-as-a-core-principle) — Mengapa privasi finansial itu penting