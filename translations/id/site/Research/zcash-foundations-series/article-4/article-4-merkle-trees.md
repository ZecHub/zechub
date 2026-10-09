# Merkle Trees: Bagaimana Blockchain Mengingat Setiap Note
##### Riset Asli dari [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-19-cfbdcf8f78.webp)

### Meringkas jutaan commitment dalam satu sidik jari kecil

> **Seri:** *Zcash dari Prinsip Dasar* . **Artikel 4 . Merkle Trees**
> **Audiens:** pendatang baru. Kami membangun berdasarkan [Artikel 3 (hashing dan commitment)](article-3-hashing-commitments.md). Jika Anda memahami apa itu sidik jari dan commitment, Anda sudah siap.
> **Apa yang akan Anda dapatkan:** gambaran intuitif dan benar tentang Merkle trees, cara membuktikan keanggotaan tanpa mengungkapkan item mana yang Anda maksud, dan secara tepat bagaimana hal ini menjadi tree commitment note milik Zcash.

[Artikel 0](article-0-shielded-transaction.md) menjelaskan sebuah "papan publik" yang menyimpan setiap note yang pernah dibuat dan terus berkembang. Sekarang Anda dapat menebak apa yang tersemat di dalamnya: **commitments** (Artikel 3), amplop-amplop yang tersegel. Namun, papan yang sebenarnya akan menampung *ratusan juta* darinya. Bagaimana jaringan menyimpan hal tersebut, memverifikasinya, dan memungkinkan Anda membuktikan bahwa amplop Anda ada di dalam papan tanpa harus menunjukkannya? Jawabannya adalah salah satu struktur paling elegan dalam ilmu komputer: **Merkle tree.**

---

## 1. Mengapa Anda harus peduli?

Dua masalah muncul saat Anda memiliki daftar komitmen publik yang sangat besar.

**Masalah pertama: integritas dalam skala besar.** Jika daftar tersebut memiliki 300 juta entri, bagaimana seseorang dapat memastikan bahwa *tidak ada satu pun* yang telah diubah secara rahasia? Memeriksa ulang 300 juta item pada setiap pandangan adalah hal yang sia-sia.

**Masalah kedua: keanggotaan privat.** Untuk membelanjakan sebuah note (Artikel 0), Anda harus membuktikan bahwa komitmen Anda benar-benar ada di dalam papan tersebut. Namun, jika Anda menunjukkannya ("ini adalah entri nomor 4.201.337!"), Anda baru saja mengungkap anonimitas diri Anda sendiri. Anda perlu membuktikan *"amplop saya berada di suatu tempat di papan ini"* tanpa mengungkapkan yang **mana**.

Sebuah Merkle tree menyelesaikan keduanya sekaligus. Ia mengompres seluruh daftar menjadi satu sidik jari tunggal, dan memungkinkan Anda membuktikan keanggotaan dengan sebuah proof kecil yang menyembunyikan posisi.

---

## 2. Intuisi: sebuah turnamen sidik jari

Bayangkan sebuah bagan turnamen sistem gugur, tetapi alih-alih pemain yang maju ke babak berikutnya, **sidik jari digabungkan.**

- Di bagian bawah, setiap potongan data mendapatkan fingerprint-nya sendiri (hash dari Artikel 3). Ini adalah **daun.**
- Pasangkan mereka. Dua fingerprint dari setiap pasangan di-hash *bersama* menjadi satu fingerprint induk.
- Pasangkan para induk, hash setiap pasangan bersama-sama, dan seterusnya.
- Terus lakukan hingga **satu fingerprint tunggal** berada di posisi paling atas. Juara tersebut adalah **Merkle root.**

![alt text](/content-images/image-20-f5d57e425a.webp)

Satu-satunya properti yang paling penting berasal langsung dari efek avalanche (Artikel 3):

> **Root adalah sidik jari dari *segalanya* yang ada di bawahnya.** Ubah satu leaf saja, bahkan hanya satu bit, maka sidik jarinya akan berubah, yang kemudian mengubah parent-nya, yang mengubah parent *tersebut*, terus berlanjut hingga ke atas. **Root tersebut berubah.** Jadi, satu nilai root kecil dapat menjamin integritas seluruh daftar. Hal ini menyelesaikan Masalah pertama.

---

## 3. Sebuah pohon nyata, dihitung secara tepat

Mari kita bangun pohon empat daun di atas dengan sidik jari SHA-256 yang sebenarnya pada bagian daun `A, B, C, D` (digest ditampilkan dalam bentuk terpotong agar mudah dibaca):

```
hA = 559aead08264...     hB = df7e70e50215...
hC = 6b23c0d5f35d...     hD = 3f39d5c348e5...

hAB = H(hA , hB) = 63956f0ce48e...
hCD = H(hC , hD) = 98a2fbfddbc7...

ROOT = H(hAB , hCD) = 1b3faa3fcc5e...
```

Semuanya hanyalah "hash suatu hal, lalu hash pasangan hash tersebut." Tidak ada yang lebih eksotis daripada Artikel 3, yang disusun dalam sebuah pohon.

---

## 4. Bagian yang cerdik: membuktikan keanggotaan tanpa mengungkapkan posisi

Sekarang Masalah kedua. Katakanlah Anda ingin membuktikan bahwa leaf `C` ada di dalam tree kepada seseorang yang hanya mengetahui **root**. Anda *tidak* memberikan seluruh tree kepada mereka. Anda hanya memberikan fingerprint yang diperlukan untuk mendaki dari `C` ke root, yang disebut sebagai **authentication path** (atau **Merkle proof**):

> Untuk membuktikan bahwa `C` ada di dalam tree, berikan:
> - sibling-nya `hD`, dan
> - uncle-nya `hAB`.

Verifikator, yang hanya mengetahui root tersebut, menghitung ulang pendakiannya:

```
step 1:  H(hC , hD)        = hCD       (combine C with its sibling)
step 2:  H(hAB , hCD)      = ROOT?     (combine with the uncle)
```

Dihitung secara nyata: ini menghasilkan `1b3faa3fcc5e...`, yang **cocok dengan root.** Leaf tersebut terbukti berada di dalam tree.

![alt text](/content-images/image-21-d9e5d6eaf6.webp)

Dua hal membuat ini sangat kuat:

- **Ukurannya sangat kecil.** Untuk 4 leaf, Anda menyediakan 2 hash. Untuk sebuah tree dengan `n` leaf, Anda hanya perlu menyediakan sekitar **log_2(n)** hash. Untuk satu miliar leaf, itu hanya sekitar **30 hash**, bukan satu miliar. Proof ini hampir tidak bertambah besar meskipun ukuran tree meledak secara masif.
- **Ini adalah benih privasi.** Proof tersebut menunjukkan bahwa leaf Anda berada di *suatu tempat* di dalam tree. Ketika pemeriksaan yang sama ini dilakukan *di dalam sebuah zero-knowledge proof* (Artikel 5), bahkan jalurnya pun disembunyikan, sehingga Anda membuktikan "note saya ada di dalam tree" tanpa mengungkapkan note maupun posisinya. Hal tersebut sepenuhnya menyelesaikan Masalah kedua.

---

## 5. Dari pohon Merkle ke pohon komitmen catatan Zcash

Sekarang kita dapat menyatakan dengan tepat apa sebenarnya "papan publik" dari Pasal 0:

> **Note commitment tree** adalah sebuah Merkle tree yang **daunnya merupakan note commitment.** Setiap kali sebuah note dibuat di mana pun di dunia, commitment-nya ditambahkan sebagai daun berikutnya, dan root akan diperbarui.

Beberapa detail spesifik:

- **Hanya terus berkembang.** Daun ditambahkan, tidak pernah dihapus. Ini disebut sebagai **Merkle tree inkremental.** (Hal ini sesuai dengan Artikel 0 bahwa "dewan tidak pernah meruntuhkan apa pun.")
- **Root disebut sebagai *anchor*.** Saat Anda melakukan pengeluaran, transaksi Anda mereferensikan sebuah anchor terbaru dan membuktikan, secara zero-knowledge, bahwa commitment note Anda berada di dalam tree dengan root tersebut.
- **Kedalaman tetap.** Tree terlindungi milik Zcash memiliki kedalaman **32**, yang berarti dapat menampung hingga `2^(32)` (lebih dari empat miliar) note.
- **Hashing yang ramah ZK.** Tree ini tidak dibangun dengan SHA-256. Sapling melakukan hashing pada tree menggunakan **Pedersen hashes** dan Orchard menggunakan **Sinsemilla** (keduanya dari Artikel 3), tepat agar proses pembuktian keanggotaan menjadi murah di dalam sebuah circuit.

![alt text](/content-images/image-22-518354b8d5.webp)

### Satu hal yang *tidak* ditangani oleh tree: pengeluaran ganda (double-spends)

Tree ini membuktikan bahwa sebuah note **ada**. Secara mandiri, tree ini tidak mencegah Anda untuk membelanjakan note yang sama dua kali. Tugas tersebut merupakan tanggung jawab dari **nullifier set** dari Artikel 0: kumpulan terpisah dari "token kosong". Saat Anda melakukan pembelanjaan, Anda mempublikasikan nullifier dari note tersebut, dan jaringan akan menolak setiap nullifier yang pernah dilihat sebelumnya.

Jadi, kedua struktur publik tersebut memainkan peran yang saling melengkapi, dan menjaga keduanya tetap terpisah adalah hal yang tepat untuk memutuskan hubungan antara awal mula sebuah note dan akhir dari note tersebut:

| Struktur | Pertanyaan yang dijawab | Diperbarui saat |
|---|---|---|
| **Note commitment tree** | "Apakah note ini ada?" | Sebuah note **dibuat** (commitment ditambahkan) |
| **Nullifier set** | "Apakah note ini sudah digunakan?" | Sebuah note **digunakan** (nullifier dipublikasikan) |

---

## 6. Penafian yang jujur

Penyederhanaan, seperti biasa. Merkle tree inkremental yang sebenarnya melacak node "frontier" sehingga root dapat diperbarui tanpa membangun ulang segalanya; jaringan menyimpan jendela anchor terbaru, bukan hanya yang paling baru, agar dompet tidak rusak oleh setiap blok baru; dan leaf kosong menggunakan nilai padding yang telah ditentukan. Kami juga menggambar binary tree dengan pangkat dua yang rapi. Semua ini tidak mengubah intuisinya: leaf dari commitment, yang di-hash berpasangan hingga menjadi satu root, dengan membership proof yang singkat. Detail pembukuan yang tepat akan dibahas kembali dalam artikel protokol.

---

## 7. Ringkasan

- Sebuah **Merkle tree** melakukan hashing data ke dalam **leaves**, lalu melakukan hashing pada **pasangan secara naik** hingga menyisakan satu **root**.
- Berkat efek avalanche, **root adalah sidik jari dari seluruh daftar**: ubah satu leaf dan root akan berubah. Satu nilai kecil dapat mensertifikasi dataset yang sangat besar.
- Sebuah **membership proof (authentication path)** hanyalah saudara kandung (siblings) di sepanjang jalur menuju root, sekitar **log_2(n)** hash, sehingga proof tetap berukuran sangat kecil bahkan untuk miliaran leaves.
- Dilakukan **di dalam sebuah zero-knowledge proof**, pemeriksaan keanggotaan tersebut menyembunyikan leaf *mana* yang Anda maksud, membuktikan "note saya ada di dalam tree" tanpa mengungkapkan note atau posisinya.
- **Note commitment tree** milik Zcash adalah Merkle tree **inkremental** dari commitment note, dengan kedalaman **32**, yang root-nya adalah **anchor**; Sapling melakukan hashing padanya dengan **Pedersen** dan Orchard dengan **Sinsemilla**.
- Tree tersebut membuktikan **eksistensi**; **nullifier set** yang terpisah mencegah **double-spends**. Memisahkan keduanya adalah hal yang memutuskan hubungan antara kelahiran sebuah note dengan kematiannya.

---

## Glosarium

| Istilah | Makna dalam Bahasa Inggris sederhana |
|---|---|
| **Merkle tree** | Sebuah pohon hash; leaf adalah sidik jari data, parent melakukan hash terhadap child mereka |
| **Leaf** | Node paling bawah; di Zcash, satu commitment note |
| **Merkle root** | Satu sidik jari teratas yang merangkum seluruh pohon |
| **Authentication path / Merkle proof** | Hash sibling yang diperlukan untuk membuktikan bahwa sebuah leaf ada di dalam pohon |
| **Incremental Merkle tree** | Sebuah Merkle tree yang hanya dapat ditambahkan (leaf hanya bisa ditambahkan) |
| **Anchor** | Sebuah Merkle root yang dijadikan referensi oleh pengeluaran sebagai "status pohon yang saya buktikan" |
| **Nullifier set** | Kumpulan terpisah dari penanda pengeluaran yang mencegah double-spend |

---

## FAQ

**Mengapa menggunakan pohon dan bukan sekadar daftar hash yang panjang?**
Daftar yang datar akan memaksa Anda untuk mengungkap atau memproses setiap entri guna membuktikan keanggotaan. Sebuah pohon memberi Anda proof berukuran logaritmik dan satu root tunggal untuk integritas.

**Apakah verifikator membutuhkan seluruh tree?**
Tidak. Verifikator hanya membutuhkan **root** ditambah dengan jalur autentikasi singkat Anda. Itulah poin utamanya.

**Mengapa khusus kedalaman 32?**
Ini membatasi pohon pada sekitar empat miliar catatan, yang memberikan ruang tambahan yang cukup, sambil menjaga membership proof (dan biaya dalam sirkuitnya) tetap pada ukuran yang tetap dan dapat dikelola.

**Jika root berubah pada setiap note baru, bagaimana proof lama tetap valid?**
Jaringan mengingat jendela root terbaru (anchor), sehingga proof yang dibuat terhadap anchor yang sedikit lebih lama tetap dapat diverifikasi. Artikel protokol menjelaskan hal ini secara presisi.

---

### Uji intuisi Anda

Dalam pohon 4-daun kami, misalkan seorang penyerang secara diam-diam melakukan swap daun `C` dengan nilai yang berbeda tetapi membiarkan root yang dipublikasikan tidak berubah. Apa yang salah bagi mereka, dan mengapa mereka tidak dapat memperbaikinya secara diam-diam? *(Jawaban di bawah.)*

<details><summary>Jawaban</summary>

Mengubah `C` akan mengubah `hC` (efek avalanche), yang kemudian mengubah `hCD = H(hC, hD)`, yang selanjutnya mengubah `ROOT = H(hAB, hCD)`. Dengan demikian, root yang dihitung ulang tidak lagi sesuai dengan root yang dipublikasikan, dan manipulasi tersebut terdeteksi. Untuk "memperbaikinya secara diam-diam", mereka perlu menemukan `C` berbeda yang menghasilkan `hC` yang *sama*, yang merupakan sebuah hash collision, dan hal ini tidak mungkin dilakukan berdasarkan Pasal 3. Integritas tetap terjaga.
</details>

---

### Apa selanjutnya

**Artikel 5 . Zero-knowledge proofs:** puncaknya. Kita sekarang telah membangun notes, commitments, dan tree, dan kita terus mengatakan "terbukti dalam zero knowledge." Artikel 5 akhirnya menjelaskan bagaimana Anda dapat membuktikan bahwa suatu pernyataan adalah benar, bahwa note Anda ada di dalam tree, bahwa nullifier Anda benar, dan bahwa saldo uang seimbang, tanpa mengungkapkan satu pun dari hal tersebut.

*Bagian dari* Zcash dari seri *First Principles untuk [ZecHub](https://zechub.org). Berlisensi CC BY-SA 4.0.*