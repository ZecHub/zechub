# Hashing dan Komitmen: Amplop Segel yang Ajaib
##### Riset Orisinal dari [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-15-0c16784b27.webp)

### Cara mengunci rahasia secara publik dan tidak akan pernah bisa berbohong tentang hal tersebut

> **Seri:** *Zcash dari Prinsip Dasar* . **Artikel 3 . Hashing dan Komitmen**
> **Audiens:** pendatang baru. Kami membangun berdasarkan [Artikel 1 (finite fields)](article-1-finite-fields.md) dan [Artikel 2 (elliptic curves)](article-2-elliptic-curves.md), namun intuisinya dapat dipahami secara mandiri.
> **Apa yang akan Anda peroleh:** pemahaman yang jelas tentang fungsi hash, apa arti sebenarnya dari "hiding" dan "binding", serta bagaimana Zcash membangun note commitments yang menjadi jangkar bagi setiap pembayaran privat.

Dalam [Artikel 0](article-0-shielded-transaction.md) kami telah mendeskripsikan sebuah "amplop tersegel ajaib": sesuatu yang dapat Anda sematkan pada papan publik yang membuktikan bahwa sebuah amplop itu ada sambil menyembunyikan apa yang ada di dalamnya, dan yang tidak pernah dapat Anda swap di kemudian hari. Kami berjanji untuk menjelaskan bagaimana hal tersebut dapat terjadi. Inilah artikel tersebut. Kita membutuhkan dua bahan: **fungsi hash** dan **commitments**.

---

## 1. Mengapa Anda harus peduli?

Bayangkan Anda memprediksi hasil sebuah pemilihan umum dan ingin membuktikan, *setelahnya*, bahwa Anda telah memprediksinya jauh sebelumnya. Anda tidak bisa begitu saja mengumumkan prediksi Anda (karena hal itu dapat memengaruhi orang lain, atau mengundang tuduhan bahwa Anda mengubahnya). Dan Anda juga tidak bisa menyimpannya sepenuhnya rahasia (karena jika demikian, Anda tidak dapat membuktikan apa pun di kemudian hari).

Apa yang Anda inginkan adalah cara untuk **mengunci sebuah nilai sekarang, secara publik, sedemikian rupa sehingga:**

- tidak ada yang dapat mengetahui apa yang Anda kunci (hal tersebut tetap rahasia untuk saat ini), dan
- kemudian, saat Anda mengungkapkannya, Anda **tidak dapat berbohong** tentang apa isi dari kunci tersebut.

Perangkat "kunci sekarang, ungkapkan nanti, tidak ada kebohongan" ini disebut sebagai **commitment**, dan ia ada di mana-mana dalam Zcash. Nilai dan pemilik sebuah note dikunci ke dalam sebuah commitment pada saat note tersebut dibuat. Untuk membangun commitment, pertama-tama kita memerlukan mesin penggeraknya: fungsi hash.

---

## 2. Intuisi: sidik jari untuk data

Sebuah **fungsi hash** mengambil data apa pun, baik itu satu huruf tunggal maupun seluruh perpustakaan, dan memadatkannya menjadi string berukuran tetap yang pendek yang disebut sebagai **digest** atau **hash**. Anggaplah ini sebagai **sidik jari untuk data.**

![alt text](/content-images/image-16-52fdf62c87.webp)

Sebuah sidik jari kriptografi yang baik memiliki empat properti. Simpanlah sebagai intuisi, bukan persamaan:

| Properti | Arti sederhana | Mengapa ini penting |
|---|---|---|
| **Deterministik** | Input yang sama selalu menghasilkan sidik jari yang sama | Anda dapat memeriksa ulang sebuah sidik jari kapan saja |
| **Cepat (Fast forwards)** | Menghitung sidik jari dilakukan dengan cepat | Praktis untuk digunakan di mana saja |
| **Satu arah (preimage resistant)** | Jika diberikan sebuah sidik jari, Anda tidak dapat menemukan input yang menghasilkannya | Menyembunyikan data asli |
| **Tahan tabrakan (Collision resistant)** | Anda tidak dapat menemukan dua input berbeda dengan sidik jari yang sama | Tidak ada yang bisa memalsukan kecocokan |

Dan satu lagi perilaku yang membuat fingerprint terasa hampir ajaib:

### Efek avalanche (terverifikasi)

Ubah input dalam jumlah sekecil apa pun dan fingerprint akan berubah *secara keseluruhan*, tanpa kemiripan dengan yang lama. Berikut adalah dua fingerprint SHA-256 asli dari pesan yang hanya berbeda satu karakter:

```
H("Pay Bob 5 ZEC") = 6e2dc1a954c70cc865f18ea8cb70b7b56eeaf6ca42b380824a55d65dc342f34b
H("Pay Bob 6 ZEC") = 76abc346d8d3053f76a9ae18b617af71f02729a73ec6a51732d2d94934e4217f
```

Dari 64 digit heksadesimal, **59 di antaranya berbeda.** Satu karakter masuk, sidik jari yang sepenuhnya tidak terkait keluar. Inilah alasan mengapa Anda tidak dapat mengarahkan sebuah input menuju target sidik jari tertentu: tidak ada sinyal "lebih hangat / lebih dingin" untuk diikuti.

---

## 3. Dari sidik jari ke komitmen

Berikut adalah sebuah ide yang menarik namun cacat: untuk melakukan komitmen pada nilai rahasia `v`, cukup publikasikan fingerprint-nya `H(v)`.

Ini *mengikat* Anda dengan baik (Anda tidak dapat mengklaim `v` yang berbeda di kemudian hari, karena hal itu akan membutuhkan sebuah tabrakan). Namun ini **gagal menyembunyikan.** Jika kumpulan nilai yang memungkinkan kecil, penyerang cukup melakukan fingerprinting pada setiap kandidat dan membandingkannya. Melakukan komitmen pada "ya" atau "tidak"? Mereka melakukan hash pada keduanya dan seketika mengetahui mana yang Anda pilih. Determinisme, yang baru saja menjadi teman kita, kini membocorkan rahasianya.

Solusinya hanya satu kata: **randomness.**

> **Sebuah komitmen adalah sidik jari dari nilai Anda yang dicampur dengan angka acak baru:**
> `commitment = H(v, r)` di mana `r` adalah nilai "blinding" acak yang rahasia.

Sekarang `v` yang sama menghasilkan commitment yang terlihat berbeda setiap saat, karena `r` berbeda. Kedua properti yang kita inginkan akhirnya keduanya terpenuhi:

![alt text](/content-images/image-17-3ec4617665.webp)

Untuk **membuka** (mengungkap) komitmen tersebut di kemudian hari, Anda memublikasikan `v` dan `r`; siapa pun dapat menghitung ulang `H(v, r)` dan memeriksa apakah hasilnya cocok. Anda telah terikat. Itulah keajaiban amplop tersegel dari Artikel 0, yang menjadi nyata.

> **Dua hal penting untuk diingat selamanya:** *binding* berasal dari hash yang tahan terhadap tabrakan (collision resistant); *hiding* berasal dari faktor penyamaran (blinding factor) acak `r`.

---

## 4. Dua cara untuk membangun amplop

Ada dua resep umum, dan Zcash menggunakan keduanya.

| | **Komitmen berbasis Hash** | **Komitmen Pedersen** (dari Artikel 2) |
|---|---|---|
| Resep | `H(v, r)` | `v.G + r.H` (titik pada kurva) |
| Sifat menyembunyikan dari | `r` yang acak | `r` yang acak |
| Sifat mengikat dari | ketahanan tabrakan (*collision resistance*) | *trapdoor* kurva eliptik (ECDLP) |
| Kekuatan khusus | sederhana dan cepat | komitmen dapat **dijumlahkan** (homomorfik) |

Baris terakhir tersebut adalah alasan mengapa komitmen Pedersen sangat penting dalam Zcash. Karena `commit(v_1) + commit(v_2)` adalah `commit(v_1 + v_2)` yang valid, protokol nantinya dapat membuktikan bahwa **uang masuk sama dengan uang keluar** dengan menjumlahkan komitmen-komitmen tersebut, semuanya tanpa mengungkapkan satu jumlah pun. Kami menyimpan fakta tersebut untuk Artikel 6.

---

## 5. Sebuah kehalusan yang membentuk seluruh Zcash: hashing yang ramah ZK

Berikut adalah sebuah wawasan yang sering terlewatkan dalam kebanyakan pengenalan, dan ini adalah poin tepat di mana "matematika bertemu dengan teknik" yang patut disoroti.

SHA-256 adalah sidik jari yang luar biasa untuk komputasi sehari-hari. Namun Zcash tidak hanya *menghitung* hash; ia harus **membuktikan, di dalam sebuah zero-knowledge proof, bahwa sebuah hash telah dihitung dengan benar** (Artikel 5 menjelaskan alasannya). Dan inilah kendalanya: sebuah zero-knowledge proof bekerja dalam bahasa **aritmetika field-terhingga** (Artikel 1), sementara SHA-256 dibangun dari operasi manipulasi bit (shift, AND, XOR). Mengekspresikan semua manipulasi bit tersebut ke dalam aritmetika field sangatlah mahal, yang membuat proof menjadi sangat besar dan lambat.

Jadi kriptografer Zcash merancang fungsi hash yang bagian internalnya *sudah* merupakan aritmetika field, sehingga murah untuk dibuktikan:

![alt text](/content-images/image-18-89ade807ad.webp)

Satu tekanan teknis ini, *"harus murah untuk membuktikannya,"* adalah alasan mengapa Zcash menciptakan dan mengadopsi fungsi hash khusus alih-alih menggunakan SHA-256 di mana-mana.

---

## 6. Di mana ini berada dalam Zcash

Zcash telah menggunakan hash yang berbeda di seluruh desainnya, masing-masing dipilih untuk tugas tertentu:

| Desain | Hash yang digunakan | Di mana |
|---|---|---|
| **Sprout** (paling awal) | **SHA-256** | Komitmen note dan tree |
| **Sapling** | **Pedersen hashes**, ditambah **BLAKE2** | Pedersen untuk komitmen note dan Merkle tree; BLAKE2 untuk derivasi key dan nullifier |
| **Orchard** (saat ini) | **Sinsemilla**, ditambah **Poseidon** | Sinsemilla untuk komitmen note dan Merkle tree; Poseidon untuk nullifier, semuanya dirancang untuk sirkuit aritmetika |

Nama-nama yang perlu dikenali adalah **Pedersen** dan **Sinsemilla** (hash bergaya komitmen yang dibangun dari titik kurva, sehingga mereka mewarisi kemampuan super "dapat dijumlahkan" dan dapat dibuktikan dengan murah) serta **Poseidon** (hash aritmetika field yang dibuat khusus untuk sirkuit zero-knowledge). Ketika Artikel 0 menyatakan bahwa isi sebuah note disegel ke dalam sebuah komitmen, *inilah* mesin yang melakukan penyegelan tersebut.

Jadi, pertanyaan terbuka dari Artikel 0, *"bagaimana amplop tertutup dapat menyembunyikan isinya namun mustahil untuk dipalsukan?"*, kini telah terjawab: **penyembunyian (hiding) berasal dari blinding factor acak, dan pengikatan (binding) berasal dari resistensi tabrakan atau trapdoor kurva.**

---

## 7. Penafian yang jujur

Kami menyederhanakannya agar segala sesuatunya tetap jelas. Skema komitmen yang sebenarnya menentukan secara tepat bagaimana `v` dan `r` dikodekan dan generator mana yang digunakan; "hiding" dan "binding" masing-masing hadir dalam berbagai variasi (perfect vs computational) dengan definisi keamanan yang presisi; dan kami tidak menunjukkan detail internal dari Pedersen, Sinsemilla, atau Poseidon. Tidak ada satu pun dari hal tersebut yang mengubah intuisinya: sebuah komitmen adalah sidik jari ditambah randomness yang menyembunyikan saat ini dan mengikat selamanya. Detail-detail tersebut akan muncul kembali, dengan penanda khusus, saat artikel protokol membutuhkannya.

---

## 8. Ringkasan

- Sebuah **fungsi hash** adalah **sidik jari untuk data**: deterministik, satu arah, cepat ke depan, tahan tabrakan (collision resistant), dengan **efek avalanche** (satu bit masuk, sidik jari yang berbeda total keluar).
- Sebuah **commitment** memungkinkan Anda untuk **mengunci suatu nilai secara publik sekarang dan mengungkapkannya nanti tanpa bisa berbohong.**
- Memublikasikan sidik jari polos `H(v)` bersifat mengikat (binding) tetapi **tidak** menyembunyikan (hiding). Menambahkan faktor blinding acak, `H(v, r)`, memperbaiki hal tersebut: **menyembunyikan dari `r`, mengikat dari ketahanan tabrakan.**
- Zcash menggunakan commitment berbasis **hash** dan **Pedersen**; commitment Pedersen secara tambahan dapat **dijumlahkan**, yang mana akan dimanfaatkan oleh Artikel 6 untuk membuktikan keseimbangan nilai secara privat.
- Karena hash harus **dibuktikan** di dalam zero-knowledge proofs, Zcash menggunakan hash yang **ZK-friendly** yang dibangun dari aritmatika field (**Pedersen**, **Sinsemilla**, **Poseidon**) alih-alih menggunakan SHA-256 di mana-mana.

---

## Glosarium

| Istilah | Makna dalam Bahasa Inggris sederhana |
|---|---|
| **Hash function** | Menghancurkan data apa pun menjadi sidik jari berukuran tetap yang pendek (digest) |
| **Digest** | Hasil sidik jari dari sebuah hash function |
| **Preimage resistance** | Tidak dapat membalikkan digest kembali ke input asalnya (satu arah) |
| **Collision resistance** | Tidak dapat menemukan dua input dengan digest yang sama |
| **Avalanche effect** | Perubahan input yang sangat kecil akan mengubah digest secara keseluruhan |
| **Commitment** | Mengunci nilai sekarang, mengungkapkannya nanti, dan tidak dapat berbohong mengenainya |
| **Blinding factor (`r`)** | Angka acak baru yang membuat sebuah commitment tersembunyi |
| **ZK-friendly hash** | Sebuah hash yang dibangun dari aritmatika field sehingga murah untuk dibuktikan |

---

## FAQ

**Mengapa tidak mengenkripsi nilainya saja alih-alih melakukan komitmen terhadapnya?**
Enkripsi adalah tentang *kerahasiaan yang dapat Anda dekripsi di kemudian hari*. Sebuah komitmen adalah tentang *binding*: jaminan bahwa Anda tidak dapat mengubah jawaban Anda di kemudian hari. Tugas yang berbeda.

**Jika komitmen menyembunyikan nilainya, bagaimana semua orang dapat memeriksa aturannya?**
Itulah peran dari zero-knowledge proofs (Artikel 5): mereka membuktikan bahwa nilai yang tersembunyi mematuhi aturan tanpa mengungkapkannya.

**Apakah SHA-256 telah rusak, karena Zcash menghindarinya di beberapa bagian?**
Tidak. SHA-256 baik-baik saja dan Zcash masih menggunakannya. Hanya saja sangat mahal untuk *dibuktikan di dalam sebuah circuit*, itulah sebabnya hash yang ramah ZK tersedia untuk tugas spesifik tersebut.

**Dari mana asal `r` acak tersebut, dan siapa yang menyimpannya?**
Nilai ini dibuat baru saat catatan dibuat dan diketahui oleh pemilik catatan. Ini adalah bagian dari apa yang membuat setiap catatan unik dan privat.

---

### Uji intuisi Anda

Anda berkomitmen pada prediksi pemilihan Anda sebagai `H(v, r)` dan mempublikasikannya. Seorang teman bersikeras bahwa Anda sebaiknya hanya mempublikasikan `H(v)` agar lebih sederhana. Dalam satu kalimat, mengapa hal itu merupakan ide yang buruk jika hanya ada dua kemungkinan hasil? *(Jawaban di bawah.)*

<details><summary>Jawaban</summary>

Dengan hanya dua hasil, teman Anda dapat menghitung `H("win")` dan `H("lose")` sendiri dan membandingkannya dengan digest yang Anda publikasikan, sehingga secara instan mengetahui prediksi Anda. Hash mentah memang mengikat tetapi tidak menyembunyikan; `r` acak adalah apa yang menghentikan serangan tebak-dan-periksa ini.

---

### Apa selanjutnya

**Artikel 4 . Merkle trees:** kita sekarang memiliki jutaan commitment yang menumpuk. Artikel 4 menunjukkan bagaimana Zcash mengorganisasikannya ke dalam satu tree tunggal yang root fingerprint kecilnya mewakili seluruh riwayat, dan bagaimana Anda dapat membuktikan bahwa note Anda ada di dalam tree tersebut tanpa mengungkapkan yang mana. Itulah bentuk nyata dari "papan publik" milik Artikel 0.

*Bagian dari* Zcash dari seri *First Principles untuk [ZecHub](https://zechub.org). Dilisensikan CC BY-SA 4.0.*