# Field Terhingga: Sistem Bilangan Tempat Kriptografi Berada
##### Riset Orisinal dari [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-5-6e8a8950f8.webp)

### Mengapa "wrapping around" adalah fondasi rahasia dari Zcash

> **Seri:** *Zcash dari Prinsip Dasar* . **Artikel 1 . Field Terhingga**
> **Audiens:** pendatang baru. Kami hanya mengasumsikan aritmetika sekolah biasa (penjumlahan, perkalian, pembagian). Tanpa pengetahuan kriptografi atau matematika tingkat tinggi sebelumnya.
> **Apa yang akan Anda dapatkan:** pemahaman intuitif dan benar tentang field terhingga, alasan mengapa kriptografer menggunakannya, dan di mana mereka muncul di dalam Zcash.

Dalam [Artikel 0](article-0-shielded-transaction.md) kita telah bertemu dengan lima karakter: note, commitment, note commitment tree, nullifier, dan zero-knowledge proof. Kita meninggalkan satu pertanyaan yang belum terjawab: *dari mana sebenarnya semua kunci dan resep rahasia tersebut berasal?* Semuanya berasal dari angka. Namun bukan angka biasa yang Anda kenal sejak kecil. Semuanya berasal dari sistem angka khusus yang mandiri yang disebut **finite field**, dan hampir setiap bagian dari kriptografi di Zcash dibangun di atasnya.

Artikel ini membangun gagasan tersebut secara perlahan. Sesuai janji, intuisi didahulukan. Tidak ada formula sampai formula tersebut terbukti bermanfaat bagi Anda.

---

## 1. Mengapa Anda harus peduli?

Angka biasa memiliki masalah bagi kriptografi: jumlahnya tak terhingga, dan mereka membocorkan informasi.

Pikirkan apa yang terjadi ketika sebuah angka menjadi *lebih besar*. Jika saya memberi tahu Anda bahwa sebuah perhitungan rahasia menghasilkan `8,142,067`, Anda sudah mengetahui cukup banyak: itu adalah angka tujuh digit, angkanya ganjil, dan "cukup besar". Ukuran adalah sebuah petunjuk. Dan petunjuk adalah sesuatu yang tidak boleh diberikan oleh sebuah sistem privasi.

Kriptografi menginginkan sistem angka di mana:

- terdapat **jumlah nilai yang terbatas**, sehingga komputer dapat menyimpan salah satu dari nilai tersebut secara tepat tanpa pembulatan dan tanpa overflow,
- nilai-nilai tersebut **tidak membocorkan ukurannya**, karena sistem tidak memiliki konsep nyata tentang "lebih besar",
- Anda tetap dapat **menambah, mengurangi, mengalikan, dan membagi** secara bebas dan reversibel, karena resep kriptografi membutuhkan aljabar nyata agar dapat berfungsi, dan
- ruang tersebut dapat dibuat menjadi **sangat besar secara astronomis**, sehingga menebak menjadi sia-sia.

Daftar keinginan tersebut memiliki sebuah nama. Itu adalah sebuah **finite field**. Mari kita bangun intuisinya sebelum kita menulis satu simbol pun.

---

## 2. Intuisi: sebuah jam

Anda sudah menggunakan field finit setiap hari. Itu adalah jam di dinding Anda.

Pada jam 12-jam, angka akan *berputar kembali*. Mulailah dari pukul 10, tambahkan 5 jam, dan Anda tidak akan mendarat di "pukul 15," melainkan mendarat pada **pukul 3**. Jam tersebut hanya memiliki dua belas posisi, dan menghitung melewati bagian atas jam akan langsung berputar kembali ke awal.

![alt text](/content-images/image-9-30b39f4cc5.webp)

Tiga hal baru saja terjadi yang merupakan inti dari artikel ini:

1. **Dunia ini terbatas.** Terdapat tepat dua belas posisi, tidak peduli seberapa lama Anda menghitung.
2. **Penambahan tetap berfungsi.** Anda dapat menambahkan jam sepanjang hari; Anda akan selalu mendarat pada posisi jam yang valid.
3. **Ukuran tidak lagi menjadi masalah.** "Jam 3" tidak memberi tahu Anda apakah Anda telah menghitung 3 jam atau 15 atau 27. Pengulangan (wrap-around) tersebut *menghapus informasi ukuran.* Penghapusan itulah tepatnya sifat ramah privasi yang kita inginkan.

Aritmetika putar balik ini memiliki nama formal: **aritmetika modular**. Jam bekerja dengan "modulo 12," yang ditulis **mod 12**. Para matematikawan lebih suka menghitung posisi mulai dari 0, sehingga "jam mod 12" sebenarnya memiliki posisi `0, 1, 2, ..., 11`. Jam mod 7 akan memiliki posisi `0` hingga `6`.

> **Satu-satunya aturan:** untuk menghitung apa pun "mod p," lakukan aritmetika biasa, lalu bagi dengan `p` dan ambil hanya sisanya.
> Contoh mod 7: `5 + 4 = 9`, dan `9` menyisakan sisa `2` setelah dibagi dengan `7`, sehingga `5 + 4 = 2 (mod 7)`.

---

## 3. Dari jam ke field

Sebuah jam memungkinkan kita untuk melakukan penjumlahan. Sebuah **field** adalah peningkatannya: sebuah sistem angka di mana keempat operasi dapat berjalan, termasuk operasi yang rumit, pembagian.

Secara informal, sebuah **field** adalah kumpulan "angka" apa pun di mana Anda dapat melakukan **penjumlahan, pengurangan, perkalian, dan pembagian** (dengan apa pun kecuali nol), dan semua aturan yang umum berlaku tetap berlaku: urutan tidak berpengaruh untuk penjumlahan atau perkalian, tanda kurung dapat dikelompokkan ulang, terdapat `0` dan `1`, serta setiap angka memiliki nilai negatif dan (kecuali `0`) kebalikan.

Bilangan rasional adalah sebuah field. Bilangan riil adalah sebuah field. Apa yang kita inginkan adalah sebuah field yang *terbatas*.

Berikut adalah hasil utamanya, dan ini sangat indah:

> **Ambil bilangan bulat `0, 1, ..., p-1` dan lakukan semua aritmetika mod `p`. Jika `p` adalah bilangan prima, hasilnya adalah sebuah field finit.** Kami menuliskannya sebagai `F_p` (dibaca "F sub p").

Jadi `F_7 = {0, 1, 2, 3, 4, 5, 6}` dengan aritmetika gaya jam mod 7 adalah sebuah field finit yang sesungguhnya. Mari kita lihat cara kerjanya.

### Perkalian dalam F_7 (terverifikasi)

Setiap entri adalah `(row x column) mod 7`:

| x | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| **2** | 0 | 2 | 4 | 6 | 1 | 3 | 5 |
| **3** | 0 | 3 | 6 | 2 | 5 | 1 | 4 |
| **4** | 0 | 4 | 1 | 5 | 2 | 6 | 3 |
| **5** | 0 | 5 | 3 | 1 | 6 | 4 | 2 |
| **6** | 0 | 6 | 5 | 4 | 3 | 2 | 1 |

Perhatikan baris-baris untuk `1` hingga `6`: masing-masing berisi setiap nilai tidak nol `1..6` tepat satu kali. Pola "tidak ada pengulangan, tidak ada yang hilang" tersebut adalah sidik jari nyata dari sebuah field.

### Pembagian: keajaiban yang membutuhkan bilangan prima

Pembagian hanyalah "perkalian dengan kebalikan". Dalam `F_7`, kebalikan (atau **invers**) dari sebuah angka `a` adalah nilai `a^(-1)` sedemikian sehingga `a x a^(-1) = 1`. Membacanya langsung dari tabel:

| `a` | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| `a⁻¹` | 1 | 4 | 5 | 2 | 3 | 6 |

Periksa satu: `2 x 4 = 8 = 1 (mod 7)`. Jadi "bagi dengan 2" dalam `F_7` berarti "kalikan dengan 4." Setiap elemen yang tidak nol memiliki pasangan. **Itulah yang membuat `F_7` menjadi sebuah field.**

---

## 4. Mengapa modulus harus prima

Ini adalah ide yang paling penting dalam artikel ini, jadi mari kita buat menjadi konkret daripada abstrak.

Perhatikan apa yang rusak jika kita mencoba membangun "field" mod `6` secara naif (dan `6` *bukan* bilangan prima):

> Apakah ada `x` dengan `2 x x = 1 (mod 6)`? Memeriksa semuanya: `2x0=0, 2x1=2, 2x2=4, 2x3=0, 2x4=2, 2x5=4`. **Jawaban `1` tidak pernah muncul.** Jadi `2` tidak memiliki resiprokal mod 6. Lebih buruk lagi, `2 x 3 = 6 = 0 (mod 6)`: dua angka tidak nol yang dikalikan menghasilkan nol.

Kalimat kedua tersebut adalah sebuah bencana bagi aritmetika. Dua hal tidak nol yang dikalikan menghasilkan nol (disebut sebagai **pembagi nol**) berarti pembagian menjadi rusak, dan sistem dengan pembagian yang rusak bukanlah sebuah field. Hal ini terjadi justru karena `6` dapat difaktorkan menjadi `2 x 3`.

Sebuah bilangan prima, berdasarkan definisinya, tidak memiliki faktor semacam itu. Jadi, dalam mod bilangan prima, tidak ada pembagi nol yang dapat muncul, setiap elemen bukan nol mendapatkan resiprokal yang bersih, dan strukturnya adalah sebuah field yang tepat.

![alt text](/content-images/image-8-573914db92.webp)

> **Satu baris perintah yang dapat digunakan kembali untuk artikel Anda:** *modulus prima masuk, pembagian bersih keluar.*

---

## 5. Satu rumus yang layak dipelajari: bagaimana komputer menemukan invers

Kami membaca invers dari sebuah tabel untuk `F_7`, tetapi bilangan prima Zcash memiliki ratusan digit; tidak ada tabel yang memungkinkan hal tersebut. Ada jalan pintas klasik, dan itu adalah satu-satunya formula dalam artikel ini.

**Teorema Kecil Fermat** menyatakan bahwa untuk bilangan prima `p` dan `a` tidak nol apa pun:

```
a^(p-1) = 1   (mod p)
```

Susun ulang (lepaskan satu faktor dari `a`) dan Anda akan mendapatkan inversnya secara gratis:

```
a^(-1) = a^(p-2)   (mod p)
```

Uji dalam `F_7` (`p = 7`, sehingga `p - 2 = 5`): kebalikan dari `2` haruslah `2^5 = 32 = 4 (mod 7)`. Dan memang tabel kami menyatakan `2^(-1) = 4`. Komputer meningkat ke pangkat besar dengan sangat cepat, sehingga hal ini mengubah "mencari resiprokal" menjadi komputasi yang cepat dan tepat bahkan untuk bilangan prima yang sangat besar.

Anda tidak perlu menghafal ini. Anda hanya perlu mengetahui bahwa **pembagian dalam field berhingga adalah operasi yang cepat dan tepat**, dan itulah alasan mengapa para kriptografer senang membangun di atasnya.

---

## 6. Mengapa kriptografi jatuh cinta pada field berhingga

Menyatukan intuisi tersebut, berikut adalah keseluruhan kasus dalam satu halaman.

| Properti dari `F_p` | Mengapa sistem privasi menginginkannya |
|---|---|
| **Terbatas (Finite)** | Komputer menyimpan setiap elemen secara tepat; tidak ada pembulatan, tidak ada overflow, tidak ada ketidakpastian floating-point |
| **Wrap-around** | Menghapus "ukuran", sehingga sebuah nilai tidak membocorkan apa pun tentang bagaimana nilai tersebut dihasilkan |
| **Keempat operasi berfungsi** | Resep kriptografi (keys, commitments, proofs) membutuhkan aljabar yang asli, bukan sekadar penghitungan |
| **Ukuran dapat dipilih** | Pilih bilangan prima 255-bit atau 381-bit dan field tersebut memiliki lebih banyak elemen daripada jumlah atom di alam semesta yang teramati; menebak adalah hal yang sia-sia |
| **Eksak dan deterministik** | Dua pihak jujur yang menghitung hal yang sama selalu mendapatkan hasil yang identik, yang mana proofs bergantung pada hal tersebut |

Sebuah finite field, dalam satu frasa, adalah **sebuah taman bermain yang tertutup secara sempurna, sangat tepat, dan sangat luas untuk aritmetika.** Segala hal lainnya di Zcash dibangun dengan cara bermain di dalamnya.

---

## 7. Di mana ini berada dalam Zcash

Anda tidak perlu memercayai begitu saja bahwa "Zcash menggunakan field terbatas". Berikut adalah peta konkretnya (mekanisme yang lebih mendalam akan dibahas pada artikel mendatang; ini hanya untuk menunjukkan bahwa jejak tersebut nyata).

- **Sapling** (desain terlindungi yang lebih lama) membangun proof miliknya di atas kurva yang disebut **BLS12-381**, yang field dasarnya menggunakan bilangan prima sepanjang **381 bit**. Setiap koordinat, key, dan elemen proof adalah elemen dari sebuah finite field yang dibangun di atas bilangan prima tersebut.
- **Orchard** (desain terlindungi saat ini) menggunakan sepasang kurva yang disebut **Pallas dan Vesta** (kurva "Pasta"), yang fieldnya menggunakan bilangan prima dengan panjang sekitar **255 bit**.
- **note commitment**, **nullifier**, dan angka-angka di dalam sebuah **zero-knowledge proof** dari Artikel 0, pada dasarnya adalah elemen dari salah satu finite field ini. Ketika protokol mengatakan "hitung commitment ini," itu berarti "lakukan aritmetika ini mod bilangan prima tersebut."

![alt text](/content-images/image-7-c81fe982f0.webp)

Jadi jawaban atas pertanyaan terbuka di Artikel 0, *"dari mana resep rahasia itu berasal?"*, dimulai di sini: **segalanya bermula sebagai aritmetika dalam sebuah finite field.** Di artikel berikutnya, kita akan mengambil field tersebut dan membangun objek sebenarnya, titik-titik pada kurva eliptik, yang menjadi kunci dan commitment.

---

## 8. Penafian yang jujur

Agar tetap ramah bagi pendatang baru, kami menyederhanakan beberapa hal yang sebenarnya. Field finit tidak hanya hadir dalam varian `F_p`; Anda juga dapat membangun field dengan elemen `p^n` (disebut **extension fields**), dan hal tersebut penting bagi "pairings" yang menjadi andalan sistem proof Sapling. Kami juga melewatkan daftar lengkap aksioma field dan sekilas membahas bagaimana bilangan prima berukuran ini dipilih dan divalidasi. Tidak ada satu pun dari hal tersebut yang mengubah intuisi yang Anda miliki sekarang; hal itu justru menyempurnakannya. Kami akan menambahkan kembali presisinya, dengan catatan tambahan, saat artikel berikutnya membutuhkannya.

---

## 9. Ringkasan

- Kriptografi membutuhkan sistem angka yang **terbatas, eksak, tidak peduli ukuran (size-blind), sepenuhnya dapat dibalik (invertible), dan sangat besar.** Sistem tersebut adalah **finite field**.
- Intuisi yang digunakan adalah sebuah **jam**: aritmetika yang **berputar kembali** (aritmetika modular), yang secara praktis menghapus "ukuran" dari sebuah angka.
- Melakukan aritmetika dengan angka `0..p-1` mod sebuah bilangan **prima** `p` menghasilkan field riil `F_p`, di mana Anda juga dapat melakukan **pembagian** karena setiap elemen yang bukan nol memiliki invers.
- Modulus **harus prima**: modulus komposit menciptakan pembagi nol (seperti `2 x 3 = 0 mod 6`) dan merusak pembagian.
- Komputer menemukan invers dengan cepat melalui **Teorema Kecil Fermat** (`a^(-1) = a^(p-2)`).
- Dalam **Zcash**, setiap key, commitment, nullifier, dan elemen proof pada akhirnya adalah elemen dari finite field yang besar (Pasta fields 255-bit untuk Orchard, field 381-bit untuk BLS12-381 milik Sapling).

---

## Glosarium

| Istilah | Makna dalam bahasa Inggris sederhana |
|---|---|
| **Aritmetika modular** | Aritmetika yang berputar kembali setelah mencapai nilai tetap, seperti jam |
| **mod p** | "Bagi dengan `p` dan ambil sisanya" |
| **Field** | Sebuah sistem angka di mana operasi tambah, kurang, kali, dan bagi semuanya dapat berfungsi |
| **Field finit `F_p`** | Angka-angka `0..p-1` dengan aritmetika yang dilakukan mod sebuah prima `p` |
| **Kebalikan (resiprokal)** | Elemen `a^(-1)` dengan `a x a^(-1) = 1`; "membagi dengan `a`" berarti mengalikannya dengan elemen tersebut |
| **Pembagi nol** | Dua nilai tidak nol yang hasil kalinya adalah nol; hal yang merusak modulus komposit |
| **Prima** | Bilangan bulat yang lebih besar dari 1 dengan tidak ada faktor selain 1 dan dirinya sendiri |

---

## FAQ

**Mengapa tidak menggunakan bilangan bulat atau desimal biasa saja?**
Desimal mengalami pembulatan dan pergeseran; bilangan bulat tumbuh tanpa batas dan membocorkan ukuran. Field finit bersifat eksak, terbatas, dan buta terhadap ukuran, yang merupakan syarat yang dibutuhkan oleh kriptografi.

**Apakah "wrap around" menghilangkan informasi?**
Secara sengaja, ya. Menghapus ukuran dari nilai perantara adalah sebuah fitur, bukan bug, demi privasi.

**Apakah bilangan prima yang lebih besar selalu lebih aman?**
Secara garis besar, field yang lebih besar berarti lebih banyak kemungkinan nilai dan lebih sulit untuk ditebak, namun keamanan bergantung pada keseluruhan konstruksi, bukan hanya pada ukuran field saja. Artikel selanjutnya akan menjelaskan hal ini secara presisi.

**Mengapa bilangan prima spesifik ini (255-bit, 381-bit) digunakan dalam Zcash?**
Bilangan tersebut dipilih agar kurva yang dibangun di atasnya memiliki struktur dan efisiensi yang tepat untuk sistem proof. "Struktur yang tepat" tersebut adalah subjek dari dua artikel berikutnya.

---

### Uji intuisi Anda

Di `F_7`, apa itu `5 - 6`? (Ingat: tetaplah berada di dalam `{0,...,6}` dengan cara berputar.) *(Jawaban di bawah ini.)*

<details><summary>Jawaban</summary>

`5 - 6 = -1`, dan `-1` yang dibungkus ke dalam `F_7` adalah `6` (karena `6 + 1 = 7 = 0`). Jadi `5 - 6 = 6 (mod 7)`. Pengurangan tidak pernah meninggalkan field; ia hanya membungkus ke arah sebaliknya.
</details>

---

### Apa selanjutnya

**Artikel 2 . Kurva eliptik:** kita mengambil field finit yang baru saja kita bangun dan menggunakannya untuk menggambar jenis kurva aneh yang titik-titiknya dapat "ditambahkan" bersama. Titik-titik tersebut menjadi kunci dan komitmen dari Zcash, dan mereka menyembunyikan trapdoor satu arah yang memungkinkan seluruh sistem privasi ini berfungsi. Intuisi terlebih dahulu, seperti biasa.

*Bagian dari* Zcash dari seri *First Principles untuk [ZecHub](https://zechub.org). Berlisensi CC BY-SA 4.0.*