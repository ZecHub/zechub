# Bagaimana Cara Kerja Transaksi Zcash Terlindungi yang Sebenarnya
##### Riset Orisinal dari [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-fedc371488.webp)

### Intuisi sebelum matematika: panduan pembayaran privat tanpa formula

> **Seri:** *Zcash dari Prinsip Dasar* . **Artikel 0 . Jangkar**
> **Audiens:** pendatang baru sepenuhnya. Tidak memerlukan latar belakang kriptografi, blockchain, maupun matematika.
> **Apa yang akan Anda dapatkan:** model mental yang benar tentang bagaimana Zcash menyembunyikan *siapa membayar siapa, dan berapa banyak*, namun tetap memungkinkan seluruh dunia memverifikasi bahwa tidak ada uang yang dipalsukan atau dibelanjakan dua kali.

Setiap artikel berikutnya dalam seri ini akan membahas lebih mendalam satu bagian dari mesin yang akan Anda temui. Jadi jika ada istilah di sini yang terasa kurang jelas, itu adalah hal yang *baik*. Itu adalah janji bahwa kami akan kembali dan menjelaskannya dengan semestinya.

---

## 1. Mengapa Anda harus peduli?

Bayangkan jika rekening koran bank Anda dipaku di dinding alun-alun kota. Selamanya. Siapa pun (pemilik kontrakan Anda, pemberi kerja Anda, orang asing, calon pemberi kerja di masa depan, pemerintah) dapat membaca setiap pembayaran sewa, setiap tagihan medis, setiap donasi, setiap pembelian kopi, dan melacak dengan tepat kepada siapa Anda mengirim uang dan siapa yang mengirim uang kepada Anda.

Itu bukanlah sebuah hipotesis distopia. **Begitulah kira-kira cara kerja Bitcoin.**

Bitcoin sering disebut sebagai "anonim", padahal sebenarnya tidak. Bitcoin bersifat *pseudonim*: nama Anda tidak tercantum dalam buku besar, tetapi setiap transaksi, jumlah, dan hubungan antar alamat bersifat publik dan permanen. Seluruh bidang "chain analysis" ada untuk mengupas pseudonim yang tipis tersebut dan menghubungkan alamat dengan orang sungguhan. Begitu salah satu alamat Anda terhubung dengan Anda, riwayat keuangan Anda akan terungkap.

Zcash dibangun untuk menjawab sebuah pertanyaan yang tampak mudah namun sebenarnya sulit:

> **Bisakah kita memiliki uang yang sepenuhnya privat, menyembunyikan pengirim, penerima, dan jumlahnya, namun tetap memungkinkan siapa pun untuk memverifikasi bahwa aturan telah dipatuhi?**

Kedua tujuan tersebut saling bertentangan. Buku besar publik dapat diverifikasi *karena* semua orang dapat melihatnya. Privasi berarti tidak ada yang dapat melihatnya. Jadi, bagaimana publik dapat memverifikasi sesuatu yang tidak diizinkan untuk mereka lihat?

Menyelesaikan paradoks tersebut adalah keseluruhan cerita dari seri ini. Mari kita mulai.

---

## 2. Ada dua dunia di dalam Zcash

Sebelum hal lainnya, luruskan sebuah kesalahpahaman umum: **Zcash bukanlah "koin privat." Ini adalah koin yang menawarkan privasi sebagai sebuah opsi.** Pada awal kemunculannya, ia sebenarnya merupakan fork dari Bitcoin, dan membawa dua sistem paralel pada blockchain yang sama.

| | **Dunia transparan** | **Dunia terlindungi** |
|---|---|---|
| Privasi | Publik, seperti Bitcoin | Privat |
| Alamat dimulai dengan | `t...` | `z...` atau `u...` |
| Pengirim / penerima / jumlah | **Terlihat** oleh semua orang | **Tersembunyi** dari semua orang |
| Teknologi dasar | Buku besar publik gaya Bitcoin | Komitmen kriptografi + zero-knowledge proofs |

Uang bahkan dapat melintasi batas di antara keduanya: memindahkan dana *ke dalam* dunia terlindungi disebut dengan *shielding*, dan memindahkannya kembali ke luar disebut dengan *deshielding*.

Dunia transparan adalah "Bitcoin yang sudah Anda pahami secara garis besar." **Dunia terlindungi** lah yang mengandung semua kriptografi yang indah, dan hanya dunia itulah yang menjadi fokus utama dari seri ini.

![alt text](/content-images/image-1-f821d24c6f.webp)

---

## 3. Intuisi: amplop tersegel di papan pengumuman publik

Berikut adalah satu gambaran mental tunggal yang perlu Anda ingat selama sisa artikel ini. Kita akan terus kembali merujuk padanya.

Bayangkan sebuah **papan pengumuman publik** raksasa yang dapat dilihat oleh semua orang di Bumi setiap saat.

* **Menerima uang** berarti seseorang menempelkan **amplop tertutup yang tidak tembus pandang** ke papan. Di dalam amplop tersebut terdapat *jumlah uang yang dikandungnya* dan *sebuah rahasia yang hanya dapat dibaca oleh penerima*, karena amplop tersebut terkunci pada kunci pribadi penerima tersebut. Seluruh dunia dapat melihat bahwa *sebuah amplop telah muncul*. Tidak ada orang lain selain pemiliknya yang dapat melihat apa isi di dalamnya.

* **Papan ini akan terus berkembang.** Amplop tidak pernah dibongkar atau dihapus. Amplop baru akan disematkan di bagian atas, selamanya.

* **Menghabiskan uang** berarti melangkah ke balik tirai, membuktikan *"Saya memiliki salah satu amplop yang belum digunakan di papan ini, dan saya diizinkan untuk membukanya"*, lalu menjatuhkan sebuah **void token** yang unik ke dalam tempat sampah "spent" publik dan menempelkan **amplop baru** bagi siapa pun yang Anda bayar.

Ritual kecil itu (menyematkan token kosong, menyematkan amplop baru, semuanya dari balik tirai) *adalah* pembayaran Zcash. Sisanya hanyalah detail.

Sekarang mari kita berikan nama asli pada properti tersebut.

---

## 4. Lima kata benda

Kelima istilah ini adalah seluruh kosakata dari Zcash terlindungi. Pelajarilah sebagai sebuah *cerita*, bukan sebagai glosarium, maka Anda akan mudah mengingatnya.

| Dalam cerita | Istilah Zcash yang sebenarnya | Apa itu sebenarnya |
|---|---|---|
| Isi amplop (jumlah + pemilik + sebuah rahasia) | **Note** | "Koin" pribadi: sepotong nilai milik seseorang |
| Amplop tertutup dan buram di papan | **Note commitment** | Segel kriptografis yang membuktikan sebuah amplop ada namun menyembunyikan isinya |
| Papan pengumuman itu sendiri | **Note commitment tree** | Catatan *setiap note yang pernah dibuat* yang hanya dapat ditambahkan (append-only) |
| Token kosong di tempat sampah "terpakai" | **Nullifier** | Penanda unik yang berarti "note ini sekarang telah digunakan" |
| Sihir "di balik tirai" | **Zero-knowledge proof** | Sebuah proof bahwa seluruh pengeluaran adalah valid, tanpa mengungkap satu pun detailnya |

Jika Anda tidak mengingat hal lain dari artikel ini, ingatlah tabel ini. Semua yang menyusul setelahnya hanyalah penjelasan *mengapa* setiap bagian harus dibentuk sedemikian rupa.

---

## 5. Mengapa setiap bagian dibentuk sedemikian rupa

Ini adalah bagian yang paling sering dilewati oleh sebagian besar penjelasan, dan inilah bagian yang membedakan antara "Saya menghafal beberapa kata" dengan "Saya memahami desainnya." Masing-masing dari kelima komponen tersebut ada untuk menyelesaikan **satu masalah spesifik.**

### Komitmen catatan: menyembunyikan isi, namun membuat pemalsuan menjadi mustahil

Amplop biasa dapat dibuka dengan uap panas. Sebuah **note commitment** kriptografis tidak bisa. Anggaplah ini sebagai amplop yang tersegel secara *ajaib*, sepenuhnya buram, dengan dua kekuatan super:

- **Menyembunyikan**: melihat amplop yang tersegel tidak memberi tahu Anda *apa pun* mengenai jumlah atau pemilik di dalamnya.
- **Mengikat**: setelah disegel, isinya tidak dapat ditukar. Anda tidak dapat mengklaim di kemudian hari bahwa amplop tersebut berisi jumlah yang berbeda.

Bagaimana seekor anjing laut bisa melakukan keduanya sekaligus? Itu adalah pertanyaan nyata yang dapat dijawab. Hal ini merupakan subjek dari **Pasal 3 (komitmen)**. Untuk saat ini, anggaplah amplop tersebut sebagai keajaiban dan teruslah melangkah.

### Nullifier: bagian yang benar-benar cerdas

Saat Anda membelanjakan sebuah note, Anda mempublikasikan **nullifier**-nya, yaitu "token pembatal." Token ini dihitung dari *note itu sendiri* **dan** *kunci rahasia Anda*. Resep tersebut menghasilkan tiga properti secara bersamaan, dan masing-masing sangat penting:

1. **Hanya pemilik yang dapat membuatnya.** Anda memerlukan kunci rahasia untuk menghitungnya, sehingga tidak ada orang lain yang dapat membelanjakan note Anda untuk Anda.
2. **Token tersebut selalu *sama* untuk note tertentu.** Cobalah untuk membelanjakan note yang sama dua kali dan Anda akan menghasilkan token void yang *identik* pada kedua kesempatan tersebut, dan bin "spent" publik sudah berisi token tersebut. Pengeluaran ganda (double-spend) akan ditolak.
3. **Tidak ada yang dapat melacaknya kembali ke envelope asalnya.** Token void terlihat sama sekali tidak terkait dengan envelope tempat ia berasal.

Properti ketiga tersebut adalah **inti dari privasi Zcash**, dan ia layak mendapatkan bagian tersendiri di bawah ini.

### zero-knowledge proof: tirai itu sendiri

Segalanya terjadi di balik tirai, dan apa yang Anda berikan kepada dunia setelahnya adalah sebuah **zero-knowledge proof**, sejenis sertifikat yang tidak dapat dipalsukan. Hal ini secara diam-diam memberikan kesaksian atas semua ini sekaligus:

- *amplop yang saya belanjakan benar-benar terpaku pada papan* (ini adalah catatan nyata yang ada),
- *saya benar-benar diizinkan untuk membukanya* (saya memegang kunci yang tepat),
- *token void saya dihitung dengan benar* (tidak ada kecurangan dalam pemeriksaan double-spend),
- *amplop baru saya berisi uang dalam jumlah yang persis sama dengan amplop lama*: **tidak ada uang yang tercipta dari ketiadaan.**

Keajaibannya adalah bahwa proof tersebut tidak mengungkapkan **satupun** dari fakta-fakta tersebut. Tidak jumlahnya, tidak alamatnya, tidak juga amplop mana yang digunakan. Ia hanya meyakinkan Anda bahwa *setiap pernyataan di atas adalah benar*. Bagaimana hal itu bisa terjadi dibahas dalam **Artikel 5 (zero-knowledge proofs)**, puncak dari seri ini.

---

## 6. Kehidupan sebuah note tunggal

Sebuah catatan *lahir*, ia *hidup* di papan, dan pada akhirnya ia *mati*, dan yang terpenting, kelahiran dan kematiannya tampak tidak saling berhubungan bagi siapa pun yang mengamatinya.

![alt text](/content-images/image-2-0eca0ea4f7.webp)

---

## 7. Sebuah pembayaran, dari ujung ke ujung

Mari kita saksikan Alice membayar Bob, dengan setiap langkah publik dan privat yang telah diberi label.

![alt text](/content-images/image-4-7af0dfe795.webp)

Perhatikan asimetri yang membuat privasi tersebut bekerja:

- **Catatan lama Alice** mati melalui sebuah *nullifier* di dalam bin yang telah digunakan.
- **Catatan baru Bob** lahir melalui sebuah *commitment* baru pada papan.
- Bagi semua orang yang mengawasi, kedua peristiwa ini **tidak memiliki koneksi yang terlihat.** Jejak uang tersebut terputus.

> **Bagaimana Bob bisa tahu bahwa dia telah dibayar?** Catatannya dienkripsi *ke kuncinya*. Dia terus memindai papan pengumuman dan hanya amplop *miliknya* yang terbuka untuknya, seperti memiliki satu kunci yang pas dengan sekumpulan kunci gembok tertentu. Mekanisme di balik hal ini adalah **viewing keys**, sebuah topik yang akan dibahas kemudian.

---

## 8. Apa yang dilihat dunia vs. apa yang tetap tersembunyi

| Fakta tentang pembayaran | Terlihat oleh publik? |
|---|---|
| Bahwa *sebuah* transaksi terlindungi telah terjadi | Ya |
| Bahwa transaksi tersebut mematuhi semua aturan (tidak ada pemalsuan, tidak ada double-spend) | Ya (melalui proof) |
| **Siapa** yang mengirim uang | Tersembunyi |
| **Siapa** yang menerimanya | Tersembunyi |
| **Berapa banyak** yang dikirim | Tersembunyi |
| **Note** mana sebelumnya yang telah digunakan | Tersembunyi |

Ini adalah resolusi dari paradoks pada Bagian 1. Publik memverifikasi *aturan*, bukan *konten*. Verifikasi dan privasi tidak lagi saling bertentangan, karena zero-knowledge proof memungkinkan Anda memeriksa hal yang pertama tanpa menyentuh hal yang terakhir.

---

## 9. Inti dari segalanya: mengapa amplop dan token void tidak dapat dihubungkan

Jika Anda memahami satu ide ini, Anda akan memahami mengapa Zcash bersifat privat. Bacalah perlahan.

- Sebuah **amplop (commitment)** dipasang pada papan saat sebuah note **lahir**.
- Sebuah **void token (nullifier)** dimasukkan ke dalam tempat sampah saat note yang sama **dibelanjakan**, mungkin beberapa bulan kemudian.
- Keduanya dihasilkan oleh **resep rahasia yang berbeda**, dan **tidak ada matematika publik** yang dapat mengubah satu menjadi yang lainnya.

Jadi, seorang pengamat luar melihat aliran amplop yang muncul dan aliran token void yang muncul, tetapi **tidak dapat mencocokkannya**. Mereka tidak dapat mengatakan "token void yang jatuh hari ini sesuai dengan amplop yang dipasang Maret lalu." Tautan tersebut *hanya* ada di dalam pengetahuan rahasia pemilik note, dan zero-knowledge proof mengonfirmasi bahwa tautan tersebut valid *tanpa mengungkapkannya.*

Tautan yang terputus itulah yang menjadi santapan bagi perusahaan analisis rantai dalam Bitcoin, dan hal yang secara sengaja diputus oleh Zcash.

> **Uji intuisi Anda:** Jika nullifier sebaliknya dihitung *hanya* dari note (tanpa melibatkan secret key), properti mana dari ketiga properti di Bagian 5 yang akan rusak, dan mengapa hal itu secara diam-diam akan menghancurkan privasi? *(Jawaban ada di bagian akhir.)*

---

## 10. Penafian yang jujur

Ini adalah sebuah **model mental**, bukan spesifikasi teknis. Agar tetap ramah bagi pendatang baru, kami telah menyederhanakan beberapa hal nyata secara diam-diam: Zcash telah memiliki beberapa desain terlindungi (Sprout, kemudian Sapling, sekarang Orchard); transaksi nyata dapat membelanjakan dan membuat *beberapa* note sekaligus; "papan" sebenarnya adalah jenis pohon tertentu, bukan papan pengumuman literal; dan keseimbangan nilai ditegakkan dengan beberapa pembukuan kriptografi tambahan. Tidak ada satu pun dari detail tersebut yang mengubah cerita yang baru saja Anda pelajari; detail tersebut hanya menyempurnakannya. Kami akan menambahkan kembali presisinya, satu per satu artikel, dan akan menandainya dengan jelas setiap kali kami melakukannya.

Konten edukasi yang baik mendapatkan kepercayaan dengan menyatakan apa yang tidak disertakan. Bagian ini adalah perwujudan dari janji tersebut.

---

## 11. Loop yang kami buka (peta seri Anda)

Setiap "kita akan kembali ke hal ini" di atas adalah sebuah utas. Berikut adalah tempat di mana masing-masing utas tersebut diselesaikan:

![alt text](/content-images/image-29-27ef4636ff.webp)

| Masalah yang belum terjawab dari artikel ini | Di mana hal tersebut diselesaikan |
|---|---|
| Bagaimana amplop tertutup bisa bersifat menyembunyikan *sekaligus* tidak dapat dipalsukan? | Artikel 3: commitments |
| Dari mana asal kunci dan resep rahasia tersebut? | Artikel 1 & 2: fields and curves |
| Apa sebenarnya "papan" tersebut? | Artikel 4: Merkle trees |
| Bagaimana Anda dapat membuktikan sesuatu tanpa mengungkapkan apa pun? | Artikel 5: zero-knowledge proofs |
| Bagaimana kelima bagian tersebut menyatu dalam Zcash yang nyata? | Artikel 6: protokol terlindungi |

---

## 12. Ringkasan

- Bitcoin bersifat **transparan**; Zcash menawarkan dunia **terlindungi** di mana pengirim, penerima, dan jumlahnya tersembunyi.
- Paradoks yang tampak (*privat namun dapat diverifikasi secara publik*) adalah inti utamanya, dan hal ini dapat diselesaikan.
- Pembayaran terlindungi terdiri dari lima bagian yang saling terkait: sebuah **note** (koin), sebuah **note commitment** (amplop tertutup), **note commitment tree** (papan publik), sebuah **nullifier** (token kosong yang mencegah pengeluaran ganda), dan sebuah **zero-knowledge proof** (tirai yang membuktikan validitas tanpa mengungkapkan apa pun).
- Privasi pada akhirnya bergantung pada **satu tautan yang terputus**: tidak ada orang di luar yang dapat menghubungkan kelahiran sebuah note (commitment) dengan kematiannya (nullifier).
- Publik memverifikasi **aturan**, bukan **isi**.

Anda kini memegang petanya. Sisa dari seri ini akan melengkapinya.

---

## Glosarium

| Istilah | Makna dalam Bahasa Inggris Sederhana |
|---|---|
| **Note** | Unit nilai privat, setara dengan koin atau uang kertas pada Zcash |
| **Note commitment** | Segel kriptografis yang membuktikan keberadaan sebuah note tanpa mengungkapnya |
| **Note commitment tree** | Rekaman publik bersifat append-only dari semua note commitment |
| **Nullifier** | Penanda "telah digunakan" yang unik dan dipublikasikan saat sebuah note digunakan, untuk mencegah double-spend |
| **Zero-knowledge proof** | Sebuah proof bahwa suatu pernyataan adalah benar tanpa mengungkap apa pun selain kebenarannya |
| **Shielding / deshielding** | Memindahkan dana ke dalam / keluar dari dunia shielded yang privat |
| **Viewing key** | Kunci yang memungkinkan pemilik untuk mendeteksi dan membaca note yang ditujukan kepada mereka |

---

## FAQ

**Apakah Zcash selalu privat?**
Tidak. Privasi berlaku pada dunia *terlindungi* (alamat `z...`/`u...`). Transaksi transparan (`t...`) bersifat publik, seperti Bitcoin.

**Jika semuanya tersembunyi, apa yang mencegah seseorang mencetak uang gratis?**
zero-knowledge proof. Secara matematis, hal ini memaksa setiap output transaksi untuk didukung oleh input asli yang belum digunakan, *sambil* tetap menjaga kerahasiaan jumlahnya.

**Apakah note yang sama dapat digunakan dua kali?**
Tidak. Menggunakan sebuah note akan mempublikasikan nullifier-nya; upaya kedua akan mempublikasikan nullifier yang identik, yang sudah berada di dalam wadah "telah digunakan", sehingga jaringan akan menolaknya.

**Dapatkah pihak luar menghubungkan pengirim dengan penerima?**
Tidak. Commitment (kelahiran note) dan nullifier (kematian note) tidak dapat dicocokkan oleh siapa pun tanpa pengetahuan rahasia pemiliknya.

---

### Jawaban untuk tes intuisi (Bagian 9)

Jika nullifier dihitung *hanya* dari note, tanpa kunci rahasia, maka **siapa pun** dapat menghitungnya, sehingga merusak properti #1 (hanya pemilik yang dapat membelanjakan). Lebih buruk lagi, nullifier kini dapat diturunkan langsung dari informasi publik tentang note tersebut, yang dapat memungkinkan pengamat untuk **menghubungkan kembali nullifier ke commitment-nya**, merusak properti #3 dan secara diam-diam mengungkap privasi seluruh sistem. Kunci rahasia adalah apa yang membuat token void menjadi *eksklusif milik Anda* sekaligus *tidak dapat ditelusuri hubungannya (unlinkable).*

---

### Apa selanjutnya

**Artikel 1 . Field finit:** sistem angka yang aneh dan indah di mana aritmetika "berputar kembali," dan alasan mengapa setiap bagian kriptografi dalam seri ini berada di sana. Kita akan mulai, seperti biasa, dengan intuisi, tanpa rumus sampai Anda layak mendapatkannya.

*Bagian dari* Zcash dari seri *First Principles untuk [ZecHub](https://zechub.org). Berlisensi CC BY-SA 4.0.*