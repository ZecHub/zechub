# Zero-Knowledge Proofs: Membuktikan Anda Benar Tanpa Memberitahu Alasannya
##### Riset Asli dari [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-23-71534bece9.webp)

### Tirai yang memungkinkan dunia memverifikasi apa yang tidak akan pernah bisa mereka lihat

> **Seri:** *Zcash dari Prinsip Dasar* . **Artikel 5 . Zero-Knowledge Proofs**
> **Audiens:** pendatang baru. Kami memanfaatkan setiap artikel sebelumnya (finite fields, curves, commitments, Merkle trees), tetapi setiap ide akan diingatkan kembali saat kita membutuhkannya.
> **Apa yang akan Anda dapatkan:** pemahaman intuitif dan benar tentang apa itu zero-knowledge proof, tiga jaminan yang diberikannya, bagaimana pernyataan arbitrer dibuktikan, dan apa yang mendasari Sapling serta Orchard milik Zcash.

Ini adalah artikel yang menjadi tujuan dari seluruh rangkaian ini. Sejak [Artikel 0](article-0-shielded-transaction.md) dan seterusnya, kami terus mengatakan bahwa sebuah pembayaran divalidasi "di balik tirai," dibuktikan benar tanpa mengungkapkan apa pun. Sebuah zero-knowledge proof adalah tirai tersebut. Inilah bagian yang akhirnya menyelesaikan paradoks yang kita buka di awal: *bagaimana publik dapat memverifikasi sebuah transaksi yang tidak diperbolehkan untuk mereka lihat?*

---

## 1. Mengapa Anda harus peduli?

Ingat kembali kontradiksi yang menjadi inti dari Zcash:

- Sebuah blockchain dapat dipercaya karena bersifat **dapat diverifikasi secara publik**.
- Pembayaran Zcash bersifat **sepenuhnya privat**: jumlah, pengirim, penerima, semuanya tersembunyi.

Ini tampak saling eksklusif. Verifikasi tampaknya *memerlukan* pemeriksaan. Privasi *melarang* pemeriksaan. Jika Anda tidak dapat mendamaikannya, Anda tidak dapat memiliki uang privat yang dipercayai oleh siapa pun.

**zero-knowledge proof (ZKP)** adalah sebuah rekonsiliasi. Hal ini memungkinkan seorang **prover** meyakinkan seorang **verifier** bahwa suatu pernyataan adalah benar **tanpa mengungkapkan apa pun selain fakta bahwa pernyataan tersebut benar.** Tanpa jumlah. Tanpa identitas. Tanpa catatan. Hanya: *"semuanya di sini mematuhi aturan."* Mari kita bangun intuisinya sebelum mempelajari mekanismenya.

---

## 2. Intuisi: tiga proof sehari-hari

**Proof bahwa Anda mengetahui sebuah kata sandi, tanpa mengatakannya.** Sebuah situs web dapat memverifikasi bahwa Anda mengetahui kata sandi Anda dengan cara mengamati Anda membuka sesuatu yang hanya bisa dibuka oleh kata sandi tersebut, tanpa pernah melihat kata sandi itu sendiri. Anda membuktikan *pengetahuan* tanpa melakukan *pengungkapan*.

**Teman buta warna dan dua bola.** Anda memegang sebuah bola merah dan sebuah bola hijau yang terlihat identik bagi teman Anda yang buta warna. Anda ingin meyakinkannya bahwa keduanya memiliki *warna yang berbeda* tanpa memberi tahu mana yang merupakan warna apa. Dia menyembunyikan kedua bola tersebut di balik punglimnya, secara opsional menukarnya, lalu menunjukkan satu bola kepada Anda. Anda mengatakan apakah dia telah menukarnya atau tidak. Jika bola-bola tersebut memang berbeda, Anda akan selalu benar. Jika bola-bola tersebut identik, Anda hanya akan menebak dengan benar sebanyak setengah dari waktu yang ada. Setelah 20 ronde, rentetan kemenangan Anda yang tak terputus meyakinkannya bahwa bola tersebut berbeda, namun dia tidak pernah mengetahui bola mana yang berwarna merah. **Dia diyakinkan oleh sebuah fakta sementara tidak mempelajari hal lain apa pun.** Itulah zero-knowledge dalam bentuk miniatur.

**Gua tersebut.** Sebuah gua berbentuk cincin memiliki pintu ajaib di bagian belakang yang hanya dapat terbuka dengan kata rahasia. Anda mengaku mengetahui kata tersebut. Untuk membuktikannya tanpa mengungkapkannya: seorang verifikator menunggu di luar sementara Anda berjalan masuk dan memilih lorong kiri atau kanan secara acak. Verifikator kemudian berteriak dari sisi mana mereka ingin Anda *keluar*. Jika Anda benar-benar mengetahui kata tersebut, Anda selalu dapat memenuhinya (Anda dapat membuka pintu untuk berpindah sisi jika diperlukan). Jika Anda sedang menggertak, Anda hanya dapat keluar dari sisi kanan karena keberuntungan, dengan peluang 50/50 di setiap putaran. Ulangi sebanyak 20 kali dan peluang seorang penggertak untuk bertahan hidup adalah kurang dari satu berbanding sejuta.

Cerita gua tersebut secara diam-diam menunjukkan **tiga jaminan** yang harus dipenuhi oleh setiap zero-knowledge proof.

---

## 3. Tiga jaminan

![alt text](/content-images/image-24-b559d31849.webp)

| Jaminan | Dalam cerita gua | Dalam Zcash |
|---|---|---|
| **Completeness** | Jika Anda mengetahui kata tersebut, Anda selalu keluar dari sisi yang benar | Transaksi yang valid selalu menghasilkan proof yang diterima |
| **Soundness** | Seorang penipu akan tertangkap dengan probabilitas yang sangat besar | Transaksi palsu (uang palsu, double-spend) tidak dapat menghasilkan proof yang diterima |
| **Zero-knowledge** | Verifikator tidak pernah mendengar kata rahasia tersebut | Jaringan tidak pernah mengetahui jumlah, alamat, atau note mana yang digunakan |

Jika salah satu dari hal ini gagal, sistem akan rusak: tanpa kelengkapan (completeness) dan pengguna yang jujur akan ditolak; tanpa keabsahan (soundness) dan pemalsu dapat mencetak uang; tanpa zero-knowledge dan privasi akan lenyap.

---

## 4. Dari sebuah gua ke *setiap* pernyataan: sirkuit dan witness

Gua tersebut membuktikan satu fakta menarik. Zcash perlu membuktikan sebuah pernyataan yang kompleks: *"Saya mengetahui sebuah note yang belum terpakai di dalam tree, saya memiliki otorisasi untuk membelanjakannya, nullifier-nya dihitung dengan benar, dan input saya sama dengan output saya."* Bagaimana kita beralih dari bola dan gua menuju hal tersebut?

Jembatan ini adalah sebuah ide yang menyatukan seluruh rangkaian ini:

> **Setiap pernyataan yang dapat Anda verifikasi dengan sebuah komputasi dapat ditulis ulang sebagai sirkuit aritmetika:** sebuah jaringan penjumlahan dan perkalian di atas field terbatas (Artikel 1).

Anggaplah sirkuit tersebut sebagai daftar batasan aritmetika yang *semuanya terpenuhi hanya jika pernyataan tersebut benar.* Input privat yang membuat semuanya sesuai, seperti note Anda, key Anda, dan jalur Merkle, disebut sebagai **witness.**

![alt text](/content-images/image-25-2479377e43.webp)

Inilah alasan mengapa kami mendedikasikan Artikel 1 untuk field finit dan Artikel 3 untuk hash yang ramah ZK: sirkuit berbicara dalam aritmetika field, sehingga setiap operasi di dalam pernyataan (termasuk hashing dan pendakian Merkle pada Artikel 4) harus dinyatakan dengan cara tersebut. Semakin murah biaya setiap operasi untuk dinyatakan, semakin kecil dan cepat proof yang dihasilkan.

---

## 5. Menjadikannya praktis: non-interaktif dan ringkas

Gua tersebut membutuhkan banyak putaran bolak-balik. Hal itu tidak praktis untuk sebuah blockchain, di mana sebuah proof harus diposting satu kali dan diperiksa oleh semua orang, selamanya. Dua peningkatan jaringan memperbaiki hal ini.

**Non-interaktif (ide Fiat-Shamir).** Alih-alih verifikator aktif yang meneriakkan tantangan acak, pembukti menghasilkan "tantangan acak" itu sendiri dengan cara *hashing* dari proof mereka sejauh ini. Karena hash yang baik tidak dapat diprediksi (Artikel 3), pembukti tidak dapat memanipulasi tantangan agar menguntungkan diri mereka sendiri. Percakapan yang komunikatif tersebut menyusut menjadi **satu proof mandiri** yang dapat diperiksa oleh siapa saja di kemudian hari, tanpa perlu adanya interaksi.

**Ringkas.** Sistem terbaik membuat proof menjadi **sangat kecil dan cepat untuk diverifikasi, tidak peduli seberapa besar pernyataannya.** Inilah bagian yang benar-benar menakjubkan.

> Sebuah proof Groth16 (sistem yang digunakan oleh Sapling) berukuran sekitar **192 byte** dan dapat diverifikasi dalam hitungan milidetik, *baik pernyataan yang dibuktikannya kecil maupun sangat besar.* Beberapa ratus byte dapat memberikan kesaksian atas sebuah komputasi yang melibatkan banyak ribu batasan.

Gabungkan semua itu dan Anda akan mendapatkan akronim yang akan Anda lihat di mana-mana:

> **zk-SNARK** = **z**ero-**k**nowledge **S**uccinct **N**on-interactive **AR**gument of **K**nowledge. Zero-knowledge (tidak mengungkapkan apa pun), succinct (sangat kecil dan cepat), non-interactive (sekali jalan), argument of knowledge (pembukti benar-benar *mengetahui* witness yang valid).

---

## 6. Satu kendala: trusted setup

Tidak ada makan siang gratis. Banyak SNARK memerlukan **setup** satu kali yang menghasilkan parameter publik untuk sirkuit tersebut. Setup ini menghasilkan keacakan rahasia sebagai produk sampingan, dan rahasia tersebut harus **dimusnahkan.** Jika ada yang menyimpannya, mereka dapat memalsukan proof, yaitu, **memalsukan uang** (meskipun, yang sangat krusial, mereka tetap *tidak dapat* merusak privasi).

Sisa rahasia ini dijuluki sebagai **toxic waste.** Untuk membuangnya dengan aman, Zcash menjalankan **multi-party ceremonies** yang rumit di mana banyak partisipan independen masing-masing menyumbangkan keacakan; selama *walaupun hanya satu* orang menghancurkan bagian mereka secara jujur, toxic waste tersebut tidak dapat dipulihkan.

![alt text](/content-images/image-26-cdad6625cd.webp)

Sistem yang lebih baru menghapus persyaratan ini sepenuhnya, yang merupakan salah satu alasan terbesar mengapa Zcash mengembangkan sistem proof miliknya dari waktu ke waktu.

---

## 7. Di mana ini berada di Zcash

| Desain | Sistem proof | Trusted setup? | Dibangun di atas |
|---|---|---|---|
| **Sprout** (paling awal) | zk-SNARK awal | Ya | seremoni asli |
| **Sapling** | **Groth16** | Ya (seremoni multi-party "Powers of Tau" + Sapling) | **BLS12-381** (Artikel 2) |
| **Orchard** (saat ini) | **Halo 2** | **Tanpa trusted setup** | **Pallas / Vesta** (Artikel 2) |

Perjalanan dari Sprout ke Sapling hingga Orchard sebagian besar adalah kisah tentang proof yang menjadi lebih kecil, lebih cepat, dan melepaskan diri dari trusted setup. **Halo 2**, yang digunakan oleh Orchard, tidak memerlukan seremoni sama sekali dan dibangun untuk mendukung *rekursi* (proof yang memverifikasi proof lainnya), itulah sebabnya Orchard menggunakan **siklus** kurva Pallas/Vesta dari Artikel 2: setiap kurva disesuaikan untuk memverifikasi proof yang ditulis di atas kurva lainnya.

Ini menutup celah terbesar dari Artikel 0. Keajaiban "di balik layar" ini adalah sebuah **zk-SNARK**: ia membuktikan bahwa transaksi Anda memenuhi sirkuit aritmetika yang menyandikan semua aturan, tanpa mengungkapkan apa pun selain satu bit tunggal yaitu "valid."

---

## 8. Penafian yang jujur

zero-knowledge proofs adalah bidang yang sangat mendalam dan kami sengaja tetap berada pada tingkat intuisi. Kami tidak mendefinisikan batasan probabilitas yang tepat dalam soundness, bentuk persis dari sirkuit aritmetika (R1CS, PLONKish, dan sebagainya), bagaimana polinomial dan commitment mengubah sirkuit menjadi proof yang singkat, atau detail internal sebenarnya dari Groth16 dan Halo 2. Gua tersebut adalah sebuah proof *interaktif*; sistem produksi bersifat non-interaktif dan jauh lebih rumit. Tidak ada satu pun dari hal tersebut yang mengubah intinya: membuktikan bahwa sebuah sirkuit dipenuhi oleh witness rahasia, secara lengkap, secara sound, dan tanpa mengungkapkan apa pun. Mekanismenya adalah serangkaian proses tersendiri.

---

## 9. Ringkasan

- Sebuah **zero-knowledge proof** memungkinkan seorang pembukti meyakinkan seorang verifikator bahwa suatu pernyataan adalah benar **tanpa mengungkapkan hal lainnya**, sehingga menyelesaikan paradoks antara verifikasi dan privasi.
- Ia harus memenuhi tiga jaminan: **completeness** (pernyataan yang benar dapat meyakinkan), **soundness** (pernyataan yang salah tidak dapat meyakinkan), dan **zero-knowledge** (verifikator hanya mempelajari bahwa "itu benar").
- Pernyataan arbitrer menjadi **arithmetic circuits** di atas field terbatas; input rahasia yang memenuhi circuit tersebut adalah **witness**. Inilah alasan mengapa field terbatas dan hash yang ramah terhadap ZK sangatlah penting.
- **Fiat-Shamir** membuat proof menjadi **non-interactive** (sekali jalan); sistem terbaik juga bersifat **succinct** (sebuah Groth16 proof berukuran sekitar **192 bytes** dan diverifikasi dalam hitungan milidetik tanpa mempedulikan ukuran pernyataan). Secara bersamaan: sebuah **zk-SNARK**.
- Beberapa SNARK memerlukan **trusted setup** yang sisa **toxic waste**-nya harus dimusnahkan (melalui upacara multi-party); kompromi pada tahap ini akan memungkinkan pemalsuan uang tetapi **tidak** akan merusak privasi.
- **Sapling** menggunakan **Groth16** (trusted setup, BLS12-381); **Orchard** menggunakan **Halo 2** (tanpa trusted setup, Pallas/Vesta, ramah terhadap rekursi).

---

## Glosarium

| Istilah | Makna dalam Bahasa Inggris Sederhana |
|---|---|
| **Zero-knowledge proof** | Meyakinkan seseorang bahwa suatu pernyataan itu benar tanpa mengungkapkan hal lainnya |
| **Prover / Verifier** | Pihak yang membuat proof / pihak yang memeriksanya |
ly | |
| **Completeness** | Pernyataan yang benar akan selalu diterima (dari prover yang jujur) |
| **Soundness** | Pernyataan yang salah akan ditolak (penipu tidak bisa menang kecuali karena keberuntungan) |
| **Witness** | Input rahasia yang membuat pernyataan tersebut menjadi benar |
| **Arithmetic circuit** | Sebuah pernyataan yang ditulis ulang sebagai operasi penjumlahan dan perkalian dalam sebuah finite field |
| **Non-interactive (Fiat-Shamir)** | Sebuah proof satu kali jalan yang tidak memerlukan interaksi bolak-balik secara langsung |
| **Succinct** | Proof berukuran sangat kecil dan cepat untuk diverifikasi tanpa mempedulikan ukuran pernyataan |
| **zk-SNARK** | Zero-knowledge Succinct Non-interactive ARgument of Knowledge |
| **Trusted setup / toxic waste** | Pembuatan parameter satu kali yang sisa rahasianya harus dimusnahkan |

---

## FAQ

**Jika proof tidak mengungkapkan apa pun, bagaimana pemeriksaan tersebut bisa memiliki arti?**
Karena matematika telah disusun sedemikian rupa sehingga *hanya* saksi yang nyata dan valid yang dapat menghasilkan proof yang lolos verifikasi. Lolosnya pemeriksaan itu sendiri adalah buktinya, tanpa memerlukan pengungkapan informasi apa pun.

**Dapatkah seseorang memalsukan sebuah proof?**
Soundness membuat hal ini tidak layak dilakukan. Satu-satunya pengecualian adalah SNARK yang toxic waste dari trusted-setup miliknya disimpan; itulah alasan tepat mengapa upacara untuk menghancurkannya sangat penting.

**Apakah setup terpercaya yang rusak membocorkan data pribadi saya?**
Tidak. Hal tersebut akan memungkinkan penyerang untuk memalsukan uang *baru*, tetapi **tidak** mengungkap jumlah, alamat, atau note. Privasi dan soundness adalah jaminan yang terpisah.

**Mengapa Zcash mengubah sistem proof seiring berjalannya waktu?**
Untuk mendapatkan proof yang lebih kecil dan lebih cepat serta, dengan Halo 2, untuk menghapus trusted setup sepenuhnya dan memungkinkan rekursi.

---

### Uji intuisi Anda

Di dalam gua, mengapa sangat penting bagi verifikator untuk memilih sisi pintu keluar *setelah* pembukti sudah berjalan masuk, alih-alih mengumumkannya sebelumnya? *(Jawaban di bawah ini.)*

<details><summary>Jawaban</summary>

Jika verifier mengumumkan sisi terlebih dahulu, seorang penipu yang tidak mengetahui kata tersebut dapat dengan mudah berjalan ke sisi itu sejak awal dan berjalan kembali keluar, tanpa pernah membutuhkan pintu tersebut. Memilih *setelah* prover melakukan commit pada sebuah bagian memaksa penipu untuk mengandalkan keberuntungan (50/50 per ronde), yang mana hal inilah yang membuat ronde-ronde berulang menjadi meyakinkan. Urutan "commit terlebih dahulu, kemudian ditantang" ini adalah tepat apa yang dipertahankan oleh Fiat-Shamir dengan menurunkan tantangan dari hash dari proof milik prover yang telah di-commit sebelumnya.
</details>

---

### Apa selanjutnya

**Artikel 6 . Protokol terlindungi, dari ujung ke ujung:** puncaknya. Kami mengambil setiap bagian, catatan, komitmen, pohon komitmen catatan, nullifier, saldo nilai, dan zero-knowledge proof, lalu menyusun sebuah transaksi terlindungi Zcash yang lengkap, menutup setiap loop yang telah dibuka kembali pada Artikel 0.

*Bagian dari* Zcash dari seri *First Principles untuk [ZecHub](https://zechub.org). Berlisensi CC BY-SA 4.0.*