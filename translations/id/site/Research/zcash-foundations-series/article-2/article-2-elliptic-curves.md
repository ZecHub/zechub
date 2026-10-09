# Kurva Eliptik: Tempat Lahirnya Key dan Commitment dari Zcash
##### Riset Orisinal dari [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-10-c1097b22d7.webp)

### Jalan satu arah yang dibangun dari titik-titik pada sebuah kurva

> **Seri:** *Zcash dari First Principles* . **Artikel 2 . Kurva Eliptik**
> **Audiens:** pendatang baru. Kami hanya mengasumsikan [Artikel 1 (field terbatas)](article-1-finite-fields.md): aritmetika yang berputar di sekitar mod bilangan prima. Tidak diperlukan latar belakang lainnya.
> **Apa yang akan Anda dapatkan:** gambaran intuitif dan benar tentang kurva eliptik, "trapdoor" yang membuatnya berguna, dan secara tepat bagaimana Zcash mengubahnya menjadi kunci dan komitmen.

[Artikel 1](article-1-finite-fields.md) memberi kita arena bermain yang sempurna untuk aritmetika: field finit. Namun, sebuah field secara mandiri hanyalah sekumpulan angka. Untuk membangun kunci dan "amplop tersegel" dari [Artikel 0](article-0-shielded-transaction.md), Zcash membutuhkan sebuah objek dengan jenis kesulitan satu arah yang istimewa: mudah dihitung ke depan, namun praktis mustahil untuk dibalik. Objek tersebut adalah **kurva eliptik**. Artikel ini membangunnya dari dasar, mengutamakan intuisi sebelum aljabar.

---

## 1. Mengapa Anda harus peduli?

Setiap sistem privasi membutuhkan sebuah **jalan satu arah**: sebuah operasi yang sangat mudah untuk dijalankan ke depan dan secara efektif mustahil untuk dijalankan kembali.

Inilah alasannya. **Secret key** Anda adalah sebuah angka yang Anda simpan secara rahasia. **Public key** Anda (dan alamat Anda) diturunkan darinya dan diperlihatkan kepada dunia. Seluruh keamanan sistem ini bergantung pada satu fakta: *dengan adanya public key, tidak ada seorang pun yang dapat melakukan proses balik ke secret key Anda.* Jika mereka bisa, mereka dapat menghabiskan uang Anda.

Jadi kita membutuhkan operasi matematika di mana:

- bergerak **ke depan** (rahasia -> publik) sangat cepat dan mudah, tetapi
- bergerak **ke belakang** (publik -> rahasia) sangat sulit sehingga semua komputer di Bumi yang bekerja selama masa hidup alam semesta pun tidak akan mampu menyelesaikannya.

Perkalian field-finite biasa tidaklah cukup; pembagian dapat membatalkannya secara instan (itulah inti dari Artikel 1). Kita membutuhkan sesuatu yang tidak memiliki tombol "undo" yang mudah. Kurva eliptik menyediakan hal tersebut, dan sebagai bonus, titik-titiknya dapat dikombinasikan dengan cara yang sempurna untuk membangun komitmen. Mari kita lihat bagaimana caranya.

---

## 2. Intuisi: sebuah kurva yang titik-titiknya dapat Anda "tambahkan"

Lupakan kriptografi sejenak. Sebuah **kurva elips** hanyalah himpunan titik-titik `(x, y)` yang memenuhi persamaan dengan bentuk:

```
y^2 = x^3 + ax + b
```

Di atas angka-angka biasa, ia tampak seperti kurva yang mulus dan melengkung, sering kali dengan sebuah simpul bulat dan dua ekor:

![alt text](/content-images/image-14-1d2e8c25d2.webp)

Bagian yang benar-benar mengejutkan: **Anda dapat "menambahkan" dua titik pada kurva ini untuk mendapatkan titik ketiga pada kurva yang sama.** Ini bukanlah penjumlahan koordinat biasa. Ini adalah aturan geometris, dan lebih mudah untuk *dilihat* daripada diucapkan.

### Aturan chord (menambahkan dua titik yang berbeda)

Untuk menambahkan `P + Q`:

1. Tarik garis lurus melalui `P` dan `Q`.
2. Garis tersebut memotong kurva di tepat satu titik lainnya. Sebut ini `R*`.
3. **Refleksikan `R*` terhadap sumbu horizontal.** Refleksi tersebut adalah jawabannya, `P + Q`.

![alt text](/content-images/image-11-61f3df1989.webp)

### Aturan garis singgung (menambahkan sebuah titik ke dirinya sendiri)

Untuk menghitung `P + P` (ditulis `2P`), tidak ada titik kedua untuk menarik garis, jadi Anda menggunakan garis **tangen** pada `P` sebagai gantinya, lalu ikuti resep "perpotongan ketiga, kemudian refleksi" yang sama.

Itulah seluruh operasinya. Dua aturan geometris. Dengan aturan tersebut, titik-titik pada kurva eliptik membentuk apa yang disebut matematikawan sebagai **grup**: sebuah himpunan dengan "penjumlahan" yang teratur. Ia bahkan memiliki sebuah "nol".

### Titik di tak terhingga (nol dari kurva tersebut)

Setiap sistem bilangan membutuhkan `0`, sesuatu yang tidak mengubah apa pun saat Anda menambahkannya. Pada kurva eliptik, peran tersebut dimainkan oleh sebuah titik ekstra khusus yang disebut **point at infinity**, yang ditulis sebagai `O`. Anda dapat membayangkannya sebagai "tak terhingga jauh di atas," tempat di mana garis-garis vertikal bertemu. Menambahkan `O` ke titik mana pun tidak akan mengubahnya, persis seperti menambahkan `0`.

---

## 3. Dari gambar ke sebuah finite field

Kurva mulus di atas adalah *intuisi*. Namun Zcash tidak menggunakan angka riil (angka tersebut dibulatkan dan membocorkan ukuran, sesuai Pasal 1). Ia menggunakan kurva eliptik **di atas field terbatas**: persamaan yang sama dengan `y^2 = x^3 + ax + b`, tetapi semua aritmetika dilakukan mod sebuah bilangan prima.

Saat Anda melakukan hal tersebut, kurva yang indah itu hancur menjadi **sebaran titik-titik yang terputus**, satu titik untuk setiap pasangan `(x, y)` yang memenuhi persamaan mod `p`. Ia tidak lagi terlihat seperti sebuah kurva sama sekali. Namun, inilah hal yang krusial:

> **Aljabar dari aturan chord-and-tangent masih bekerja dengan sempurna.** Formula yang sama yang menemukan `P + Q` secara geometris kini menghitungnya dengan aritmetika finite-field. Titik-titik tersebut tetap membentuk sebuah group, dengan `0` yang sama (titik di tak terhingga).

Mari kita wujudkan ini dengan contoh kecil yang telah terverifikasi sepenuhnya.

### Sebuah kurva lengkap, dihitung secara tepat

Ambil `y^2 = x^3 + 2x + 2` di atas field finit `F_17`. Menghitung setiap titik yang valid menghasilkan tepat **18 titik, ditambah titik di tak terhingga = total 19.** Beberapa di antaranya:

```
(0,6) (0,11) (3,1) (3,16) (5,1) (5,16) (6,3) (6,14) (7,6) (7,11) ...
```

Sekarang pilih titik `G = (5, 1)` dan terus tambahkan ke dirinya sendiri. Perhatikan apa yang terjadi (setiap baris di bawah ini dihitung, bukan ditebak):

| Langkah | Titik | Langkah | Titik |
|---|---|---|---|
| `1G` | (5, 1) | `11G` | (13, 10) |
| `2G` | (6, 3) | `12G` | (0, 11) |
| `3G` | (10, 6) | `13G` | (16, 4) |
| `4G` | (3, 1) | `14G` | (9, 1) |
| `5G` | (9, 16) | `15G` | (3, 16) |
| `6G` | (16, 13) | `16G` | (10, 11) |
| `7G` | (0, 6) | `17G` | (6, 14) |
| `8G` | (13, 7) | `18G` | (5, 16) |
| `9G` | (7, 6) | `19G` | **O (infinity)** |
| `10G` | (7, 11) | | |

Dua hal yang perlu diperhatikan:

- Ia **mengunjungi ke-18 titik berhingga dan kemudian mendarat di `O`** pada langkah ke-19, lalu ia akan berulang selamanya. Titik awal `G` "menghasilkan" seluruh grup, sehingga kita menyebutnya sebagai **generator**.
- Ini adalah grup yang terverifikasi: misalnya `1G + 2G = (5,1) + (6,3) = (10,6)`, yang tepat sama dengan `3G`. Penjumlahan di dalamnya konsisten secara internal, sebagaimana yang dituntut oleh sebuah grup.

---

## 4. Pintu jebakan: perkalian skalar

Tabel `1G, 2G, 3G, ...` tersebut adalah inti dari segalanya. Menambahkan sebuah titik ke dirinya sendiri secara berulang-ulang disebut sebagai **perkalian skalar**: titik `kG` berarti "`G` ditambahkan ke dirinya sendiri sebanyak `k` kali."

Sekarang keajaibannya. Pertimbangkan dua arah berikut:

| Arah | Pertanyaan | Kesulitan |
|---|---|---|
| **Maju** | Diberikan `k` dan `G`, hitung `kG` | **Mudah.** Bahkan untuk `k` yang sangat besar secara astronomis, sebuah trik bernama *double-and-add* dapat mencapainya dalam beberapa ratus langkah |
| **Mundur** | Diberikan `G` dan `kG`, pulihkan `k` | **Secara efektif mustahil** pada kurva kriptografi yang nyata |

Asimetri tersebut adalah **jalan satu arah** yang kita butuhkan di Bagian 1. Masalah ke belakang ("manakah `k` yang menghasilkan titik ini?") disebut sebagai **Elliptic Curve Discrete Logarithm Problem (ECDLP)**, dan pada kurva yang digunakan Zcash, tidak ada metode yang diketahui dapat menyelesaikannya sebelum kematian panas alam semesta.

![alt text](/content-images/image-12-86b9ace6cb.webp)

> Dalam kurva `F_17` mainan kami, Anda *bisa* saja langsung membaca `k` dari tabel, karena ia hanya memiliki 19 titik. Kurva yang sebenarnya memiliki sekitar `2^(255)` titik. Tabel tersebut akan memiliki lebih banyak baris daripada jumlah atom di alam semesta, sehingga "membacanya dari tabel" bukanlah sebuah pilihan. Ukurannya yang kecil adalah hal yang membuat kurva mainan ini mudah diajarkan dan juga alasan mengapa ia tidak aman.

---

## 5. Bagaimana kunci dibuat (hasil akhirnya)

Sekarang kita telah memiliki semua yang diperlukan untuk menjelaskan sebuah kunci kriptografi yang sebenarnya, dan ini sangatlah sederhana:

> **Pilih angka rahasia `k`. Publikasikan titik `kG`. Itu saja.**
> `k` adalah **private key** Anda. `kG` adalah **public key** Anda. Jalan satu arah (ECDLP) menjamin tidak ada yang dapat menjalankan `kG` kembali ke `k`.

Satu ide tunggal ini, *kunci publik adalah skalar rahasia dikalikan dengan generator tetap*, adalah benih dari spending key, viewing key, dan alamat Zcash. Pohon kunci lengkap menambahkan lebih banyak struktur di atasnya, tetapi setiap cabang tumbuh dari akar ini.

### Bonus: mengapa titik kurva menghasilkan commitment yang sempurna

Ingat kembali "amplop tersegel" (komitmen) dari Artikel 0, yang harus **menyembunyikan** isinya namun **mustahil untuk dipalsukan**. Kurva eliptik memberi kita cara yang bersih untuk membangunnya. Ambil dua titik generator publik yang tetap `G` dan `H`, sebuah nilai rahasia `v`, dan sebuah angka blinding acak `r`, lalu bentuk:

```
Commitment  =  v.G  +  r.H
```

Ini adalah sebuah **Pedersen commitment**, dan ia memiliki kedua properti yang kita inginkan:

- **Hiding:** `r` yang acak menyebarkan hasil ke seluruh kurva, sehingga titik tersebut tidak mengungkapkan apa pun tentang `v`.
- **Binding:** ECDLP membuat pencarian `(v, r)` *berbeda* yang menghasilkan titik yang sama menjadi tidak layak, sehingga Anda tidak dapat mengubah keputusan mengenai apa yang telah Anda komitkan.

Sebuah properti bonus ternyata menjadi tak ternilai harganya di kemudian hari: komitmen-komitmen ini **saling menjumlahkan**. Komitmen terhadap `v_1` ditambah dengan komitmen terhadap `v_2` adalah sebuah komitmen yang valid terhadap `v_1 + v_2`. Perilaku "homomorfik" tersebut adalah cara Zcash nantinya akan membuktikan bahwa uang yang masuk *ke dalam* sebuah transaksi sama dengan uang yang keluar, tanpa mengungkapkan jumlah apa pun. Kita akan membahas hal ini lebih lanjut di sekitar Artikel 6.

---

## 6. Di mana ini berada di Zcash

Sidik jari tersebut bersifat konkret dan dapat diperiksa.

| Desain Zcash | Curve yang digunakan | Peran |
|---|---|---|
| **Sapling** (lama) | **BLS12-381** ditambah sebuah curve tertanam bernama **Jubjub** | BLS12-381 membawa sistem proof; Jubjub dibangun di atas scalar field dari BLS12-381 sehingga operasi key dan commitment murah untuk dilakukan *di dalam* sebuah zero-knowledge proof |
| **Orchard** (saat ini) | **Pallas** dan **Vesta** (siklus "Pasta") | Pallas membawa keys dan commitments dari Orchard; pairing Pallas/Vesta diatur secara khusus untuk membuat proofs tingkat lanjut menjadi efisien |

Alasan mengapa satu kurva menjadi "tertanam" di dalam field kurva lainnya, dan mengapa sebuah *cycle* dari dua kurva sangat berguna, adalah nyata dan penting, namun hal tersebut termasuk dalam artikel-artikel sistem-proof. Untuk saat ini, poin utamanya sudah jelas: **setiap key Zcash adalah skalar dikalikan dengan generator, dan setiap commitment Zcash adalah jumlah dari titik-titik kurva**, yang berada pada salah satu dari kurva bernama ini.

![alt text](/content-images/image-13-ffdd703c60.webp)

---

## 7. Sebuah penafian yang jujur

Beberapa penyederhanaan menjaga agar ini tetap mudah dibaca. Kami menggunakan bentuk **short Weierstrass** (`y^2 = x^3 + ax + b`); kurva Zcash sering ditulis dalam bentuk ekuivalen lainnya (*Jubjub* adalah kurva *twisted Edwards*) yang dipilih demi efisiensi dan keamanan, tetapi ide grupnya identik. Kami tidak mendefinisikan rumus penambahan-titik secara tepat (itu adalah versi aljabar dari "irisan ketiga, lalu refleksi"), dan kami mengesampingkan kerumitan seperti order kurva, cofactor, dan "pairings," yang menjadi penting dalam artikel-artikel sistem-proof. Tidak ada satu pun dari hal ini yang mengubah intuisi; hal ini justru mempertajamnya.

---

## 8. Ringkasan

- Sebuah sistem privasi membutuhkan **jalan satu arah**: mudah ke depan, tidak mungkin ke belakang. Kurva eliptik menyediakannya.
- Sebuah **kurva eliptik** adalah himpunan titik-titik yang memenuhi `y^2 = x^3 + ax + b`, dan titik-titiknya dapat **ditambahkan** melalui aturan geometris **chord-and-tangent**, dengan sebuah **point at infinity** khusus yang bertindak sebagai nol.
- Di atas sebuah **finite field**, kurva tersebut menjadi sebaran titik, tetapi penjumlahan yang sama tetap berfungsi dan titik-titik tersebut membentuk sebuah **group**. (Contoh terverifikasi: `y^2 = x^3 + 2x + 2` di atas `F_17` memiliki 19 titik, dan `G = (5,1)` menghasilkan semuanya.)
- **Perkalian skalar** `kG` mudah untuk dihitung tetapi tidak mungkin untuk dibalik: **ECDLP**. Itulah trapdoor-nya.
- **Keys:** private key `k`, public key `kG`. **Commitments:** bentuk Pedersen `v.G + r.H`, yang menyembunyikan, mengikat, dan secara praktis dapat **dijumlahkan**.
- Dalam **Zcash**, Sapling menggunakan **BLS12-381 + Jubjub** dan Orchard menggunakan kurva **Pallas/Vesta (Pasta)**; setiap key dan commitment berada di atas kurva ini.

---

## Glosarium

| Istilah | Makna dalam bahasa Inggris sederhana |
|---|---|
| **Elliptic curve** | Titik-titik yang memenuhi `y^2 = x^3 + ax + b`, dengan "penjumlahan" titik yang khusus |
| **Point addition** | Aturan chord-and-tangent: garis melalui dua titik, ambil titik ketiga, lalu cerminkan |
ly | |
| **Point at infinity (`O`)** | "Nol" dari kurva tersebut; menambahkannya tidak mengubah apa pun |
| **Generator (`G`)** | Sebuah titik dasar yang kelipatannya pada akhirnya mencakup seluruh grup |
| **Scalar multiplication (`kG`)** | Menambahkan `G` ke dirinya sendiri sebanyak `k` kali; mudah secara maju, sulit untuk dibalik |
| **ECDLP** | Masalah sulit dalam memulihkan `k` dari `kG`; fondasi keamanan |
| **Pedersen commitment** | `v.G + r.H`; sebuah amplop tersegel yang menyembunyikan, mengikat, dan dapat dijumlahkan |

---

## FAQ

**Mengapa menggunakan kurva alih-alih hanya angka besar mod sebuah bilangan prima?**
Keduanya dapat memberikan jalan satu arah, tetapi kurva eliptik mencapai keamanan yang sama dengan kunci yang jauh lebih kecil dan operasi yang lebih cepat, serta aritmetika titiknya sangat ideal untuk commitment.

**Apakah ECDLP telah terbukti sulit?**
Hal ini tidak *terbukti* mustahil, tetapi upaya intensif selama puluhan tahun belum menemukan serangan yang efisien pada kurva yang dipilih dengan baik. Keamanan bergantung pada asumsi yang telah diuji dengan baik tersebut.

**Bisakah komputer kuantum memecahkan ini?**
Komputer kuantum yang cukup besar dapat memecahkan ECDLP. Hal tersebut merupakan kekhawatiran jangka panjang yang diketahui di seluruh industri dan merupakan bidang penelitian aktif; kurva saat ini tetap aman terhadap komputer klasik.

**Mengapa Zcash menggunakan lebih dari satu kurva?**
Tugas yang berbeda. Satu kurva membawa sistem zero-knowledge proof; kurva lainnya (tertanam dalam field kurva pertama) membuat operasi key dan commitment di dalam proof menjadi efisien. Artikel berikutnya menjelaskan mengapa pemasangan tersebut penting.

---

### Uji intuisi Anda

Menggunakan tabel yang telah diverifikasi pada Bagian 3, berapakah `9G + 10G` pada kurva mainan kita? Dan apa yang jawaban tersebut beri tahu Anda mengenai `G`? *(Jawaban di bawah ini.)*

<details><summary>Jawaban</summary>

`9 + 10 = 19`, dan kita melihat bahwa `19G = O`, titik di tak terhingga. Jadi `9G + 10G = O`. Ini berarti `10G` adalah **negatif** (invers aditif) dari `9G`: dua titik yang jika dijumlahkan menghasilkan titik "nol". Pada sebuah kurva, negatif dari suatu titik hanyalah bayangan cerminnya di seluruh sumbu-x, dan memang benar `9G = (7,6)` dan `10G = (7,11)` berbagi `x` yang sama dan memiliki nilai `y` yang berjumlah `17 = 0 (mod 17)`. Strukturnya sangat konsisten, yang merupakan jaminan dari "ini adalah sebuah grup".
</details>

---

### Apa selanjutnya

**Artikel 3 . Hashing dan komitmen:** kita akan membuka "amplop tersegel ajaib" ini dengan semestinya. Anda kini telah melihat satu cara untuk membangun sebuah komitmen dari titik-titik kurva; selanjutnya kita akan mempelajari apa arti sebenarnya dari hiding dan binding, mengenal fungsi hash, dan menghubungkan keduanya ke komitmen note yang menjadi jangkar bagi setiap pembayaran Zcash.

*Bagian dari* Zcash dari seri *First Principles untuk [ZecHub](https://zechub.org). Dilisensikan CC BY-SA 4.0.*
