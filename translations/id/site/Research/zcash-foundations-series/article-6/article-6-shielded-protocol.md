# Protokol Terlindungi, Ujung ke Ujung
##### Riset Asli dari [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-27-4094293ec0.webp)

### Menyusun setiap bagian menjadi satu transaksi Zcash yang privat

> **Seri:** *Zcash dari Prinsip Dasar* . **Artikel 6 . Protokol Terlindungi** (final)
> **Audiens:** pendatang baru yang telah membaca Artikel 0 hingga 5. Di sinilah semuanya terhubung.
> **Apa yang akan Anda dapatkan:** model mental yang lengkap dan benar tentang transaksi Zcash yang terlindungi, dengan setiap konsep dari seri ini berada di tempat yang tepat, dan setiap alur dari Artikel 0 tertutup sepenuhnya.

Kita telah memulai, dalam [Artikel 0](article-0-shielded-transaction.md), dengan sebuah paradoks dan sebuah cerita tentang amplop tertutup di papan pengumuman publik. Kemudian kita menghabiskan lima artikel untuk membangun bagian-bagiannya: finite fields, elliptic curves, commitments, Merkle trees, dan zero-knowledge proofs. Sekarang kita menyatukan semuanya dan menyaksikan cara kerja pembayaran privat yang nyata, dari awal hingga akhir.

---

## 1. Mengapa Anda harus peduli?

Secara individual, setiap bagian yang telah Anda pelajari sangatlah cerdas. Namun, *keajaiban* dari Zcash terletak pada bagaimana bagian-bagian tersebut saling mengunci. Sebuah nullifier saja tidak memberikan privasi. Sebuah commitment saja tidak mencegah pemalsuan. Sebuah proof saja tidak membuktikan apa pun yang berguna. **Perakitan** inilah yang mengubah lima komponen menjadi uang yang secara bersamaan bersifat privat dan tepercaya.

Artikel ini adalah sebuah perakitan. Pada akhirnya, kalimat *"jaringan memverifikasi transaksi yang tidak dapat dilihatnya"* tidak akan terasa seperti sebuah paradoks, melainkan sebagai konsekuensi nyata dari bagian-bagian yang sudah Anda pahami.

---

## 2. Para pemeran, berkumpul kembali

Berikut adalah seluruh rangkaian dalam satu halaman, dipetakan dari cerita Artikel 0 ke mekanisme yang sebenarnya.

| Elemen cerita Artikel 0 | Komponen Nyata | Dibangun dari |
|---|---|---|
| Uang di dalam amplop | **Note** (nilai, penerima, keacakan) | dikodekan sebagai elemen field (Art 1) |
| Amplop buram yang tersegel | **Note commitment** | Pedersen / Sinsemilla commitment (Art 2, 3) |
| Papan pengumuman publik | **Note commitment tree** (anchor = root-nya) | incremental Merkle tree (Art 4) |
| Token hampa | **Nullifier** | hash yang ramah ZK dari note + secret key (Art 2, 3) |
| "Uang masuk sama dengan uang keluar" | **Value commitments + pemeriksaan saldo** | homomorphic Pedersen commitments (Art 2, 3) |
| Keajaiban di balik layar | **Zero-knowledge proof** | zk-SNARK di atas sebuah sirkuit aritmetika (Art 5) |
| "Hanya Anda yang dapat membaca amplop Anda" | **Note terenkripsi + viewing keys** | enkripsi + hierarki kunci (artikel ini) |

---

## 3. Dari mana kunci berasal

Segala sesuatu yang dapat dilakukan pengguna mengalir dari satu rahasia tunggal, yaitu **spending key**, melalui hierarki satu arah (setiap panah adalah derivasi yang tidak dapat dibalik, berkat trapdoor dalam Artikel 2 dan 3):

![alt text](/content-images/image-32-f443f9bb72.webp)

Dua hal yang patut diperhatikan, keduanya merupakan konsekuensi dari artikel-artikel sebelumnya:

- Pemisahan ini memungkinkan Anda memberikan **viewing key** (misalnya, kepada auditor) yang mengungkap transaksi Anda **tanpa** memberikan wewenang untuk membelanjakan dana. Privasi bersifat selektif, bukan semua-atau-tidak-sama-sekali.
- Setiap derivasi bersifat **satu arah**: memiliki viewing key tidak akan pernah memungkinkan siapa pun untuk memulihkan spending key, tepat seperti fungsi elliptic-curve trapdoor dari Artikel 2 yang menjalankan tugasnya.

---

## 4. Menggunakan sebuah note: empat klaim

Untuk membelanjakan sebuah note secara privat, Anda harus meyakinkan jaringan akan empat hal sekaligus **tanpa mengungkapkan note tersebut, nilainya, posisinya, atau identitas Anda.** Setiap klaim dipenuhi oleh komponen yang sudah Anda ketahui.

![alt text](/content-images/image-31-86309af194.webp)

Proof tersebut tidak mengungkapkan **satupun** dari fakta yang mendasarinya (seperti catatan apa, kunci milik siapa, atau nilai apa). Proof tersebut hanya mengungkapkan bahwa *keempat klaim tersebut benar.* Itulah seluruh inti dari Zcash terlindungi, yang dinyatakan dalam satu diagram.

---

## 5. Trik keseimbangan-nilai (keuntungan yang kita hemat)

Kembali ke Artikel 2 dan 3, kami telah mencatat bahwa komitmen Pedersen **dapat dijumlahkan**: komitmen terhadap `v_1` ditambah dengan komitmen terhadap `v_2` adalah sebuah komitmen terhadap `v_1 + v_2`. Di sinilah manfaat tersebut akan terasa.

Setiap catatan input dan output membawa sebuah **komitmen nilai**: sebuah komitmen Pedersen `v.G + r.H` yang menyembunyikan jumlahnya `v`. Karena nilai-nilai ini dapat dijumlahkan, jaringan dapat menghitung:

```
(sum of input value commitments) − (sum of output value commitments)
```

Jika transaksi tersebut seimbang (tidak ada uang yang dibuat atau dihancurkan), bagian-bagian `v` saling meniadakan secara tepat, sehingga hanya menyisakan komitmen terhadap **nilai nol**, yang disamarkan oleh sisa keacakan. Pengirim membuktikan bahwa mereka mengetahui sisa keacakan tersebut dengan menghasilkan tanda tangan kecil yang disebut **binding signature.** Sebuah binding signature yang valid hanya mungkin terjadi ketika nilai-nilainya benar-benar seimbang, **namun tidak ada satu pun jumlah yang terungkap.**

> Ini adalah ilustrasi paling jelas di seluruh seri tentang *mengapa* kita membutuhkan komitmen berbasis kurva yang homomorfik. Aturan "uang masuk sama dengan uang keluar" ditegakkan dengan **menjumlahkan amplop tertutup** dan memeriksa apakah hasilnya menutup ke nol.

---

## 6. Sebuah transaksi lengkap, dipantau dari awal hingga akhir

Mari kita susun skenario Alice membayar Bob. Kita akan menggunakan struktur "sisi pengeluaran / sisi output" yang jelas dari Sapling sebagai model pembelajaran.

**Sebuah transaksi terlindungi menggabungkan dua jenis deskripsi:**

| Deskripsi pengeluaran (mengonsumsi sebuah note) | Deskripsi keluaran (membuat sebuah note) |
|---|---|
| value commitment dari input | value commitment dari output |
| **anchor** yang dibuktikan terhadapnya (sebuah root tree) | **note commitment** baru (sebuah leaf baru) |
| **nullifier** dari note yang telah digunakan | **ephemeral key** untuk enkripsi |
| kunci publik yang di-re-randomized + tanda tangan otorisasi-pengeluaran | **encrypted note** (ciphertext untuk penerima) |
| **zk-SNARK** yang membuktikan keempat klaim tersebut | **zk-SNARK** yang membuktikan bahwa output sudah terbentuk dengan benar |

Satu tambahan **binding signature** pada seluruh bundel, yang menegakkan keseimbangan nilai (Bagian 5).

![alt text](/content-images/image-30-98511eb2d0.webp)

Lacak privasinya: jaringan memeriksa anchor, memeriksa bahwa nullifier masih baru, memverifikasi proof, dan memverifikasi saldo. Jaringan menerima pembayaran yang valid **tanpa mengetahui jumlahnya, tanpa mengetahui alamatnya, dan tidak mengetahui note mana yang telah digunakan.** Sementara itu, **nullifier** dari note yang telah digunakan (kematiannya) dan **commitment** baru milik Bob (kelahiran note miliknya) berada di dua struktur publik yang berbeda tanpa ada tautan yang terlihat di antara keduanya, yaitu tautan yang telah terputus dari Artikel 0.

---

## 7. Menutup setiap loop dari Artikel 0

Artikel 0 secara sengaja membuka pertanyaan-pertanyaan. Di sini semuanya telah terjawab.

| Loop dibuka dalam Artikel 0 | Ditutup oleh |
|---|---|
| Bagaimana amplop yang tersegel namun tidak dapat dipalsukan bisa terjadi? | Commitments: menyembunyikan dari randomness, binding dari collision resistance / the curve trapdoor (Art 3) |
| Dari mana asal kunci dan resep rahasia? | Field arithmetic dan elliptic-curve scalar multiplication (Art 1, 2) |
| Apa sebenarnya "the board" itu? | Sebuah Merkle tree inkremental dari note commitments; root-nya adalah anchor (Art 4) |
| Mengapa void token tidak dapat dihubungkan ke amplopnya? | Nullifier adalah keyed hash yang disimpan dalam set terpisah dari commitments (Art 2, 3, 4) |
| Bagaimana Anda membuktikan validitas tanpa mengungkapkan apa pun? | Sebuah zk-SNARK pada arithmetic circuit yang menyandikan keempat klaim tersebut (Art 5) |
| Bagaimana penerima mengetahui bahwa mereka telah dibayar? | Note dienkripsi ke alamat mereka; mereka melakukan trial-decrypt dengan viewing key (artikel ini) |
| Bagaimana "uang masuk = uang keluar" ditegakkan secara privat? | Homomorphic value commitments + binding signature (Sec 5) |

Paradoks dari halaman pertama, *verifikasi apa yang tidak dapat Anda lihat*, kini telah sepenuhnya terurai. Jaringan memverifikasi **klaim tentang data tersembunyi**, bukan datanya itu sendiri.

---

## 8. Sapling vs Orchard, dalam satu napas

Kami belajar dengan struktur Sapling karena pembagiannya adalah yang paling jelas. Desain saat ini, **Orchard**, menyempurnakan alih-alih menggantikan ide-ide tersebut:

| | **Sapling** | **Orchard** |
|---|---|---|
| Unit transaksi | deskripsi **Spend** dan **Output** terpisah | **Actions** terpadu (masing-masing melakukan satu spend + satu output) |
| Sistem proof | **Groth16** (trusted setup) | **Halo 2** (tanpa trusted setup) |
| Curve | BLS12-381 + Jubjub | Pallas / Vesta (Pasta) |
| Hash commitment | Pedersen | Sinsemilla |

Setiap konsep dalam artikel ini beralih secara langsung; Orchard utamanya menggabungkan pengeluaran-dan-output bersama-sama dan menukar sistem proof tanpa seremoni. Kelima pilar tersebut tidak berubah.

---

## 9. Penafian yang jujur

Ini adalah gambaran paling lengkap dalam seri ini, namun tetap merupakan sebuah model. Kami telah mengompresi pengodean field yang tepat dari sebuah note, formula derivasi key yang presisi, re-randomisasi dari spending key, alamat yang terdiversifikasi, field memo, penanganan biaya, perbedaan antara value commitment dan note commitment secara mendetail, serta peran presisi dari setiap tanda tangan. Kami juga menyajikan satu alur kanonik; transaksi nyata dapat membawa banyak pengeluaran (spends) dan output sekaligus serta dapat mencampur bagian transparan dan terlindungi. Sumber otoritatifnya adalah Spesifikasi Protokol Zcash. Apa yang Anda pegang sekarang adalah bentuk yang benar; spesifikasi tersebut melengkapi setiap pengukurannya.

---

## 10. Ringkasan

- Sebuah transaksi terlindungi mengunci kelima komponen: sebuah **note** (nilainya), **commitment** miliknya dalam **note commitment tree**, sebuah **nullifier** untuk mencegah pengeluaran ganda, **value commitments** untuk keseimbangan, dan sebuah **zk-SNARK** yang mengikat semuanya menjadi satu.
- Pengeluaran membuktikan **empat klaim sekaligus**: bahwa note tersebut ada, Anda memiliki otorisasi, nullifier miliknya benar, dan nilai seimbang, dalam **zero-knowledge**, tanpa mengungkapkan fakta-fakta dasarnya.
- **Keseimbangan nilai** ditegakkan dengan **menambahkan homomorphic commitments** dan memeriksa apakah semuanya berjumlah nol, melalui **binding signature**, tanpa ada jumlah yang diungkapkan.
- Kekuatan seorang pengguna mengalir dari satu **spending key** melalui **hierarki satu arah**, memungkinkan penggunaan **viewing keys** yang dapat mengungkap data tanpa memberikan kekuatan pengeluaran.
- Jaringan **memverifikasi klaim tentang data tersembunyi**, menghilangkan paradoks verifikasi-vs-privasi dari Artikel 0. Setiap loop yang terbuka di sana kini telah tertutup.
- **Orchard** menyempurnakan **Sapling** (Actions yang terpadu, Halo 2 tanpa trusted setup, kurva Pasta, Sinsemilla) tanpa mengubah lima pilar tersebut.

---

## Glosarium

| Istilah | Makna dalam Bahasa Indonesia |
|---|---|
| **Spending key** | Satu-satunya akar rahasia yang menjadi asal mula semua kunci pengguna |
| **Viewing key** | Mengungkap transaksi Anda kepada pemegang kunci tanpa mengizinkan mereka untuk membelanjakan dana |
| **Spend description** | Bagian dari sebuah tx yang menghabiskan sebuah note (nullifier, anchor, proof) |
| **Output description** | Bagian dari sebuah tx yang membuat sebuah note (commitment, ciphertext, proof) |
| **Action (Orchard)** | Sebuah unit terpadu yang melakukan satu pengeluaran dan satu output secara bersamaan |
| **Value commitment** | Sebuah Pedersen commitment homomorfik terhadap suatu jumlah |
| **Binding signature** | Tanda tangan yang membuktikan keseimbangan nilai tanpa mengungkapnya |
| **Anchor** | Root tree yang digunakan oleh sebuah pengeluaran untuk membuktikan keanggotaannya |
| **Trial decryption** | Penerima yang menguji commitment baru untuk menemukan note yang ditujukan bagi mereka |

---

## FAQ

**Apakah jaringan pernah melihat jumlah atau siapa yang membayar siapa?**
Tidak. Jaringan memverifikasi proof, kesegaran nullifier, anchor, dan binding signature. Semua nilai privat tetap tersembunyi.

**Apa yang mencegah saya membelanjakan sebuah note dua kali?**
Nullifier. Melakukan pembelanjaan akan mempublikasikannya; jaringan akan menolak nullifier apa pun yang sudah ada dalam kumpulan nullifier. Note yang sama akan selalu menghasilkan nullifier yang sama.

**Bagaimana saldo dapat diperiksa jika jumlahnya disembunyikan?**
Komitmen nilai dijumlahkan secara homomorfik; komitmen dari transaksi yang seimbang akan saling meniadakan menjadi sebuah komitmen nol, yang dibuktikan oleh tanda tangan binding.

**Dapatkah saya membuktikan transaksi saya kepada auditor tanpa melepaskan kendali?**
Ya. Berikan sebuah viewing key. Ini akan mengungkap aktivitas terlindungi Anda tetapi tidak dapat mengotorisasi pengeluaran, berkat hierarki kunci satu arah.

**Apakah Sapling sudah usang sekarang setelah adanya Orchard?**
Keduanya telah ada di dalam jaringan; Orchard adalah desain saat ini. Konsep-konsepnya saling berbagi, sehingga memahami salah satunya akan membantu Anda memahami yang lainnya.

---

### Uji intuisi Anda

Seorang teman berkata: "Karena proof menyembunyikan jumlahnya, seorang pencuri bisa saja mengeklaim bahwa output mereka bernilai lebih besar daripada input mereka dan mencetak uang gratis." Menggunakan Bagian 5, jelaskan dalam dua kalimat mengapa hal ini gagal. *(Jawaban di bawah.)*

<details><summary>Jawaban</summary>

Jumlahnya disembunyikan, tetapi masing-masing dibungkus dalam sebuah homomorphic value commitment, dan jaringan menjumlahkan semua input commitment serta mengurangkan semua output commitment; jika nilai yang tersembunyi tersebut tidak seimbang, hasilnya tidak akan menyegel ke nol dan **tidak ada binding signature valid yang dapat dihasilkan.** Pencuri dapat menyembunyikan *berapa banyak* jumlahnya, tetapi tidak dapat membuat nilai yang tidak seimbang lolos dari pemeriksaan keseimbangan, sehingga mencetak uang gratis adalah hal yang mustahil tanpa mengungkapkan sesuatu namun tetap tertangkap oleh perhitungan aritmetika tersebut.
</details>

---

### Seri ini, lengkap

Anda kini telah melakukan perjalanan dari sebuah paradoks tunggal menuju pembayaran privat yang lengkap:

![alt text](/content-images/cd8bbb40-57b8-4854-b9cf-97f2485d126a-8847fae521.webp)


Dari sini, alur selanjutnya secara alami akan masuk lebih dalam: cara kerja internal Groth16 dan Halo 2, upacara trusted-setup, detail sirkuit Sapling dan Orchard, derivasi kunci dan alamat yang terdiversifikasi, serta evolusi protokol melalui peningkatan jaringan. Namun, fondasinya kini telah terbentuk, dan setiap topik tersebut telah memiliki tempat untuk dikaitkan.

*Bagian dari* Zcash dari seri *First Principles untuk [ZecHub](https://zechub.org). Berlisensi CC BY-SA 4.0.*