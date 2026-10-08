![alt text](image-1.png)
# Apa Itu Verifikasi Formal?

### Cara Anda membuktikan bahwa sebuah program sudah benar, alih-alih hanya berharap demikian

> **Seri:** *Seri Verifikasi Formal* · **Bagian 1 dari 3**
> **Audiens:** pendatang baru sepenuhnya. Tidak memerlukan latar belakang matematika, pemrograman, atau kriptografi.
> **Apa yang akan Anda dapatkan:** pemahaman yang jelas tentang apa artinya *membuktikan* kebenaran perangkat lunak, mengapa hal tersebut secara fundamental berbeda dari pengujian, apa itu proof yang diperiksa oleh mesin, serta batasan tepat (dan jujur) dari apa yang dapat dijanjikan oleh proof tersebut.

Sebagian besar perangkat lunak dipercaya karena telah *diuji*: kita menjalankannya pada banyak input dan mengamati perilakunya. Verifikasi formal mengajukan pertanyaan yang lebih berani. Dapatkah kita *membuktikan*, dengan kepastian matematis, bahwa sebuah sistem melakukan apa yang seharusnya dilakukan untuk **setiap** input yang memungkinkan, termasuk input yang tidak pernah terpikirkan oleh siapa pun untuk dicoba? Artikel ini membangun ide tersebut dari dasar. Intuisi terlebih dahulu, tanpa simbol hingga Anda layak mendapatkannya.

---

## 1. Mengapa Anda harus peduli?

Ini adalah sebuah kisah nyata, dan inilah alasan mengapa seri ini ada.

Pada tahun 2022, mata uang kripto yang berfokus pada privasi Zcash meluncurkan sebuah pool terlindungi baru bernama Orchard, yang memungkinkan orang untuk bertransaksi dengan jumlah yang tersembunyi. Selama empat tahun, sistem ini berjalan tanpa cela dan lulus audit profesional yang berulang kali dilakukan. Kemudian, pada Mei 2026, seorang peneliti keamanan yang melakukan penalaran secara cermat terhadap matematika yang mendasarinya (dengan bantuan alat AI) menemukan satu titik **under-constrained** dalam matematika sistem tersebut. Satu celah itu dapat memungkinkan penyerang untuk membuat uang palsu dalam jumlah yang *tidak terbatas*, dan karena jumlahnya tersembunyi, tidak ada yang akan melihat hal itu terjadi. Celah tersebut telah ada selama ini.

Hal ini tidak terdeteksi oleh pengujian. Setiap pengujian telah berhasil selama empat tahun. Hal ini ditemukan oleh seseorang yang *melakukan penalaran terhadap matematika tersebut*. Dan ketika tim memperbaikinya, mereka tidak sekadar melakukan patch dan melanjutkan pekerjaan. Mereka menulis sebuah **machine-checked mathematical proof**, lebih dari 2.700 teorema individu, bahwa penggantinya sama sekali tidak dapat mengandung jenis cacat tersebut.

Itulah verifikasi formal, dan inilah manfaat yang Anda dapatkan: bukan "kami telah mencoba banyak kasus dan semuanya berhasil," melainkan "kami telah membuktikan bahwa hal tersebut berlaku untuk setiap kasus." Untuk sistem di mana satu kasus yang terlewat dapat berakibat katastrofik (uang, pesawat terbang, perangkat medis, kriptografi), perbedaan tersebut adalah segalanya.

Titik buta dalam pengujian telah dinamai beberapa dekade lalu oleh ilmuwan komputer Edsger Dijkstra, dan hal itu masih tetap benar:

> **Pengujian dapat menunjukkan *keberadaan* bug, tetapi tidak pernah menunjukkan *ketiadaannya*.**

Jika sebuah pengujian berhasil, Anda telah mempelajari bahwa sistem tersebut berfungsi *pada input tersebut*. Anda tidak mempelajari apa pun tentang input yang tidak Anda coba, dan bug yang berbahaya hampir selalu berada pada kasus-kasus yang tidak dicoba oleh siapa pun.

---

## 2. Intuisi: memeriksa pintu vs. membuktikan bangunan

Bayangkan Anda bertanggung jawab atas sebuah gedung dengan seribu pintu, dan tugas Anda adalah menjamin setiap pintu terkunci pada malam hari.

- **Pendekatan pengujian:** berjalan berkeliling dan mencoba beberapa sampel pintu. Cobalah lima puluh, seratus, lima ratus. Setiap pintu yang Anda coba dalam keadaan terkunci, sehingga kepercayaan diri Anda meningkat. Namun, Anda belum mencoba semuanya, dan satu pintu yang tidak terkunci mungkin adalah pintu yang Anda lewati.
- **Pendekatan verifikasi-formal:** memeriksa *sistem penguncian itu sendiri* dan membuktikan, dari desainnya, bahwa menekan tombol "lock" pasti akan mengunci setiap pintu. Sekarang Anda tidak perlu mencoba pintu satu per satu sama sekali. Anda telah menunjukkan bahwa *tidak ada kemungkinan pintu yang dapat dibiarkan tidak terkunci*, karena mekanisme tersebut membuatnya mustahil terjadi.

Perbedaannya terletak pada antara **pengambilan sampel realitas** dan **pembuktian properti dari sebuah desain**. Pengujian melakukan pengambilan sampel. Verifikasi formal memberikan proof. Itulah ide utamanya, dan segala hal lainnya adalah mekanisme untuk melakukannya secara ketat.

![alt text](image-2.png)

---

## 3. Tiga pilar dari verifikasi formal apa pun

Setiap verifikasi formal, tidak peduli seberapa canggihnya, dibangun dari tepat tiga bahan. Pahami hal ini dengan jelas dan sisanya hanyalah detail.

| Pilar | Makna sederhana | Analogi bangunan |
|---|---|---|
| **Spesifikasi** | Pernyataan tepat tentang apa yang dimaksud dengan "*benar*" | "Setiap pintu harus dikunci pada malam hari" |
| **Sistem** | Hal aktual yang sedang diperiksa (sebuah program, sirkuit, protokol) | Bangunan dan mekanisme pengunciannya |
| **Proof** | Argumen ketat bahwa sistem selalu memenuhi spesifikasi | Demonstrasi logis bahwa menekan "kunci" akan mengunci semua pintu |

Dan bahan keempat yang lebih tenang membuat seluruh hal ini dapat dipercaya:

- **Pemeriksa mesin.** proof tidak ditulis oleh manusia dan sekadar diperiksa secara sekilas. Ia dimasukkan ke dalam sebuah program (sebuah **proof assistant**, yang juga disebut sebagai **theorem prover**) yang memeriksa *setiap langkah logis*. Manusia dapat melakukan kesalahan kecil atau ketidaktelitian; mesin tidak akan menerima langkah yang tidak mengikuti aturan secara ketat. Inilah sebabnya mengapa kami mengatakan hasilnya telah **machine-checked**.

![alt text](image-3.png)

Proof assistant yang mungkin pernah Anda dengar namanya meliputi **Lean**, **Rocq** (sebelumnya Coq), dan **Isabelle**. Pada dasarnya, mereka adalah mesin pengecek logika yang sangat ketat. Zcash proof dalam cerita pembuka kami ditulis menggunakan **Lean**. Menariknya, model AI modern semakin banyak digunakan untuk membantu *menulis* proof ini, dengan manusia sebagai pemandunya, yang telah mempersingkat upaya yang dulunya memakan waktu bertahun-tahun menjadi hanya beberapa minggu. Mesin tersebut tetap memeriksa setiap langkah, sehingga percepatan ini tidak mengorbankan kepastian apa pun.

---

## 4. Apa sebenarnya sebuah proof itu

Kata "proof" mungkin terasa mengintimidasi, jadi mari kita hilangkan kesan misteriusnya dengan contoh konkret yang dapat diperiksa. Tanpa kriptografi, cukup menggunakan aritmatika sekolah.

**Klaim:** untuk setiap bilangan bulat `n`, jumlah `0 + 1 + 2 + ... + n` sama dengan `n(n+1)/2`.

Anda dapat *mengujinya*. `n = 5` menghasilkan `0+1+2+3+4+5 = 15`, dan `5 × 6 / 2 = 15`. ✓ Ini cocok. Coba `n = 10`: jumlahnya adalah `55`, dan formula tersebut memberikan `10 × 11 / 2 = 55`. ✓ (Ini dihitung dan dikonfirmasi; klaim tersebut faktanya berlaku untuk setiap `n` dari 0 hingga 999 saat diperiksa secara langsung.)

Namun menguji nilai-nilai, bahkan hingga ribuan sekalipun, tidak akan pernah mencapai "**setiap** bilangan bulat." Ada jumlah yang tak terhingga. Sebuah **proof** menutup celah tak terhingga tersebut dalam argumen yang terbatas, menggunakan teknik yang disebut **induksi**:

1. **Kasus dasar:** untuk `n = 0`, jumlahnya hanyalah `0`, dan rumus tersebut menghasilkan `0 × 1 / 2 = 0`. Keduanya sesuai. ✓
2. **Langkah induktif:** *asumsikan* rumus tersebut berlaku untuk suatu angka `k`. Sekarang tambahkan angka berikutnya, `k+1`. Jumlah hingga `k+1` adalah `(sum up to k) + (k+1) = k(k+1)/2 + (k+1)`. Satu baris aljabar menyusun ulang ini menjadi `(k+1)(k+2)/2`, yang merupakan rumus persis dengan `k+1` sebagai pengganti `k`. ✓

Karena ia bernilai benar pada awal (0) dan setiap langkah membawanya ke angka berikutnya, maka hal ini berlaku untuk **semua** bilangan bulat, selamanya, dalam satu argumen yang terbatas. Itulah sebuah proof. Sebuah proof assistant melakukan penalaran yang persis seperti ini, namun memverifikasi secara mekanis bahwa setiap langkah, termasuk "baris aljabar," benar-benar mengikuti apa yang telah dinyatakan sebelumnya.

> Lompatan yang layak dipahami: sebuah proof mengubah "kasus yang tak terhingga jumlahnya" menjadi sebuah **argumen terbatas yang dapat diperiksa**. Itulah kekuatan super yang tidak dimiliki oleh pengujian struktural.

---

## 5. Di mana bug sebenarnya berada

Verifikasi formal sangat kuat sebagian karena adanya wawasan yang memperjelas dari *mana* bug berasal pada awalnya. Setiap kecacatan dalam sistem pemeriksaan aturan dapat ditelusuri ke salah satu dari tiga tempat:

| Sumber bug | Apa artinya | Bisakah kita membuktikannya agar hilang? |
|---|---|---|
| **Spesifikasi** | Matematika atau aturan itu sendiri salah (kondisi yang hilang, definisi yang buruk) | **Ya**, secara langsung, ini adalah bidang utama verifikasi formal |
| **Implementasi** | Kode gagal menjalankan spesifikasi yang benar dengan setia | Sebagian; sering kali kegagalan semacam itu meninggalkan bukti yang dapat dideteksi |
| **Asumsi yang rusak** | Sesuatu yang menjadi tumpuan seluruh sistem ternyata salah | Tidak; asumsi adalah fondasi yang tidak dapat dikurangi lagi |

Taksonomi ini lebih penting daripada kelihatannya, dan Bagian 2 serta 3 bergantung padanya. Bug yang paling dalam dan paling berbahaya, jenis yang dapat bersembunyi selamanya, cenderung berada di dalam **spesifikasi**: deskripsi matematis tentang apa yang seharusnya dilakukan oleh sistem tersebut. Dan spesifikasi adalah tepat apa yang dapat diperiksa secara langsung oleh machine-checked proof, untuk semua kasus sekaligus. Itulah sebabnya upaya verifikasi formal yang serius menargetkan hal tersebut terlebih dahulu.

![alt text](image-4.png)

---

## 6. Peringatan paling penting di seluruh bidang ini

Verifikasi formal sangatlah kuat, namun janjinya bersifat presisi, dan kesalahpahaman terhadap hal ini dapat menyesatkan orang. Jadi, nyatakanlah dengan hati-hati:

> **Sebuah proof menjamin bahwa *sistem* memenuhi *spesifikasi*, di bawah *asumsi* yang dinyatakan. Tidak lebih dari itu.**

Empat konsekuensi akan menyusul, dan masing-masing sangatlah penting:

- **Jika spesifikasi salah, proof tersebut tidak berharga.** Jika Anda membuktikan bahwa "setiap pintu terkunci" padahal persyaratan sebenarnya adalah "setiap *jendela* terkunci," Anda telah membuktikan hal yang salah dengan sempurna. Verifikasi memeriksa bahwa Anda membangun *apa yang Anda tentukan*, bukan apakah Anda menentukan hal yang benar.
- **Jika sebuah definisi dinyatakan secara keliru, jaminannya akan menyempit secara diam-diam.** Sebuah proof mengenai definisi "saldo" yang sedikit salah mungkin menetapkan lebih sedikit dari yang Anda duga namun tetap lolos setiap pemeriksaan. Inilah sebabnya mengapa definisi inti dalam sebuah verifikasi harus singkat, standar, dan dapat ditinjau secara terbuka oleh manusia.
- **Jika asumsi gagal, jaminan tersebut gugur.** Proof bersandar pada asumsi ("perangkat keras kunci tidak rusak secara fisik"). Jika sebuah asumsi tidak benar dalam kenyataannya, maka kesimpulannya tidak perlu berlaku.
- **Ini tidak berarti "tidak ada bug selamanya."** Ini berarti "tidak ada bug dari jenis yang telah dikesampingkan oleh spesifikasi ini, dengan mempertimbangkan asumsi-asumsi tersebut." Sebuah klaim yang lebih sempit, lebih jujur, dan jauh lebih berguna.

Alih-alih memperlemah verifikasi formal, presisi ini justru merupakan kekuatannya. Hal ini memberi tahu Anda *dengan tepat* apa yang Anda dapatkan. Seperti yang akan kita lihat di Bagian 3, tim Zcash yang menyatakan cakupan dan asumsi mereka secara gamblang ("kami membuktikan soundness supply, di bawah asumsi-asumsi berikut, dan bukan privasi") adalah sebuah model dari kejujuran tersebut.

![alt text](image-5.png)

---

## 7. Penafian yang jujur

Untuk menjaga agar teks ini tetap mudah dibaca, kami melakukan penyederhanaan. Spesifikasi yang sebenarnya ditulis dalam bahasa formal yang presisi, bukan dalam kalimat bahasa Inggris; terdapat beberapa *gaya* verifikasi formal (interactive theorem proving, model checking, metode berbasis SMT) yang sesuai untuk masalah yang berbeda; dan menulis proof ini tetap menjadi pekerjaan yang membutuhkan keahlian serta upaya besar bahkan dengan bantuan AI. Kami juga melewatkan bagaimana sebuah proof assistant merepresentasikan logika secara internal. Semua ini tidak mengubah inti utamanya: sebuah spesifikasi, sebuah sistem, dan sebuah machine-checked proof yang membuktikan bahwa keduanya selaras, di bawah asumsi yang telah dinyatakan. Detail akan kami sertakan kembali saat dibutuhkan.

---

## 8. Ringkasan

- **Pengujian** mengambil sampel input tertentu dan dapat menunjukkan adanya bug, namun tidak pernah bisa membuktikan bahwa bug tidak ada. Bug yang berbahaya bersembunyi dalam kasus-kasus yang tidak diambil sampelnya oleh siapa pun.
- **Verifikasi formal** membuktikan bahwa suatu properti berlaku untuk **setiap** kemungkinan kasus, dalam argumen yang terbatas dan dapat diperiksa.
- Setiap verifikasi memiliki tiga pilar: sebuah **spesifikasi** (apa arti dari benar), sebuah **sistem** (hal yang diperiksa), dan sebuah **proof** bahwa keduanya selaras, ditambah dengan **proof assistant** (seperti **Lean**) yang melakukan pemeriksaan mesin pada setiap langkah.
- Sebuah **proof** (misalnya, melalui **induksi**) merangkum tak terhingga banyaknya kasus ke dalam satu argumen yang terbatas.
- Bug berada di dalam **spesifikasi**, **implementasi**, atau **asumsi yang salah**. Verifikasi formal menargetkan spesifikasi secara langsung, yang merupakan tempat di mana bug terdalam dan paling tersembunyi cenderung berada.
- Jaminannya sangat presisi: sistem memenuhi **spesifikasi**, di bawah **asumsi yang dinyatakan**. Spesifikasi yang salah, definisi yang keliru, atau asumsi yang rusak akan membatalkannya, dan ini tidak pernah berarti "tidak ada bug selamanya."

---

## Glosarium

| Istilah | Makna dalam Bahasa Inggris Sederhana |
|---|---|
| **Formal verification** | Membuktikan secara matematis bahwa sebuah sistem memenuhi spesifikasi untuk semua kasus |
| **Specification** | Pernyataan presisi tentang apa yang dimaksud dengan "perilaku yang benar" |
| **System** | Program, sirkuit, atau protokol aktual yang sedang diperiksa |
| **Proof** | Rantai langkah logis terbatas yang menetapkan suatu klaim untuk semua kasus |
| **Proof assistant / theorem prover** | Perangkat lunak (Lean, Rocq, Isabelle) yang memeriksa setiap langkah dari sebuah proof |
| **Machine-checked** | Diverifikasi langkah demi langkah oleh komputer, bukan hanya melalui pembacaan manusia |
| **Induction** | Sebuah teknik proof: benar di awal, dan setiap langkah membawanya ke langkah berikutnya |
| **Assumption** | Sebuah kondisi yang menjadi sandaran proof; jika salah, jaminan tersebut mungkin tidak berlaku |

---

## FAQ

**Apakah verifikasi formal menggantikan pengujian?**
Tidak. Keduanya saling melengkapi. Pengujian menangkap masalah praktis dan asumsi yang salah dengan biaya murah; verifikasi meniadakan seluruh kelas bug yang mungkin tidak pernah teruji oleh pengujian.

**Jika itu begitu kuat, mengapa tidak semuanya diverifikasi secara formal?**
Hal ini mahal dan membutuhkan keahlian khusus, meskipun bantuan AI sedang menurunkan biaya tersebut. Metode ini dikhususkan untuk sistem di mana bug yang langka dapat berakibat katastrofik, yang mana merupakan kondisi tepat di mana biayanya sebanding dengan hasilnya.

**Apakah sistem yang terverifikasi secara formal masih bisa gagal?**

Ya, jika spesifikasinya salah, sebuah definisi dinyatakan secara keliru, suatu asumsi tidak terpenuhi, atau kegagalan tersebut berada di luar apa yang telah ditentukan. proof hanya mencakup apa yang diklaim untuk dicakupnya.

**Apakah proof yang diperiksa oleh mesin lebih tepercaya daripada proof buatan manusia?**
Untuk proof yang besar dan rumit, umumnya ya. Sebuah mesin tidak akan melewatkan celah kecil atau menerima penjelasan yang tidak berdasar, meskipun mesin tersebut tetap mempercayai spesifikasi dan definisi yang diberikan kepadanya.

**Jika AI membantu menulis proof, mengapa Anda harus mempercayainya?**
Karena asisten proof memeriksa setiap langkah secara mekanis. AI mengusulkan langkah-langkah; mesin memverifikasinya. Langkah yang salah akan langsung ditolak, sehingga AI mempercepat pekerjaan tanpa memperlemah jaminan tersebut.

---

### Uji intuisi Anda

Anda membuktikan bahwa perangkat lunak sebuah bank "tidak pernah membiarkan saldo akun menjadi negatif." Setahun kemudian, uang tetap hilang. Bagaimana kedua hal tersebut bisa benar secara bersamaan? *(Jawaban di bawah ini.)*

<details><summary>Jawaban</summary>

proof tersebut menjamin tepat satu properti: saldo tidak pernah menjadi negatif. Dana dapat hilang dengan cara yang tidak pernah ditangani oleh properti tersebut, misalnya bug yang memindahkan dana ke akun yang salah (yang tetap non-negatif), atau cacat pada bagian sistem yang tidak pernah ditentukan. Verifikasi melakukan tepat apa yang dijanjikannya dan tidak lebih dari itu. Ini adalah penerapan peringatan pada Bagian 6: sebuah proof mencakup spesifikasi, bukan setiap gagasan tentang "kebenaran" yang dapat dibayangkan.

---

### Apa selanjutnya

**Bagian 2 · Bug Orchard:** kita beralih ke kisah nyata tahun 2026 secara lengkap. Sebuah sistem privasi menyembunyikan jumlah menggunakan cryptographic proofs, dan satu baris yang kurang terbatasi (under-constrained) dalam matematikanya menyebabkan proofs tersebut dapat dibuat untuk berbohong, sehingga memungkinkan pemalsuan tak terlihat tanpa batas. Kita akan melihat dengan tepat apa yang dimaksud dengan "circuit yang kurang terbatasi", mengapa jenis bug ini dapat tersembunyi selamanya, dan mengapa hal ini telah terjadi lebih dari satu kali.

*Bagian dari* seri Verifikasi Formal *untuk [ZecHub](https://zechub.org).*