# Ironwood dari ![alt text](image-1.png): Membuktikan Bahwa Uang Tidak Dapat Dipalsukan

### Bagaimana Zcash menjawab sebuah bug dengan machine-checked proof

> **Seri:** *Verifikasi Formal* · **Bagian 3 dari 3**
> **Audiens:** pendatang baru. Bagian 1 dan 2 membahas dasar-dasar verifikasi formal dan bug Orchard; bagian penutup ini menunjukkan bagaimana kedua ide tersebut bertemu dalam sebuah sistem nyata. Semua hal yang diperlukan akan diingatkan kembali seiring berjalannya pembahasan.
> **Apa yang akan Anda peroleh:** pemahaman yang akurat tentang apa yang sebenarnya dibuktikan oleh Zcash mengenai pool "Ironwood" barunya, bagaimana proof disusun, apa saja yang dicakup dan tidak dicakup, bagaimana pool lama dipensiunkan dengan aman, dan mengapa hal ini menunjukkan standar baru dalam membangun uang kriptografi.

Di Bagian 1 kita telah mempelajari apa artinya *membuktikan* sebuah sistem benar. Di Bagian 2 kita melihat celah nyata yang terlewatkan oleh pengujian selama empat tahun, sebuah perkalian kurva-elips yang kurang terbatasi (under-constrained) yang dapat memungkinkan pemalsuan tak terlihat tanpa batas. Artikel ini adalah resolusinya: bagaimana Zcash merespons bukan sekadar dengan patch, melainkan dengan proof yang diperiksa oleh mesin bahwa seluruh kelas bug tersebut telah hilang.

---

## 1. Mengapa Anda harus peduli?

Ketika sebuah bug mengancam dana, respons yang biasa dilakukan adalah memperbaikinya dan melanjutkan aktivitas. Zcash melakukan sesuatu yang lebih ambisius. Bersamaan dengan pool terlindungi baru bernama **Ironwood**, yang diaktifkan pada 28 Juli 2026, para insinyurnya menerbitkan sebuah **machine-checked mathematical proof**, yang berisi lebih dari **2.700 teorema** yang ditulis dalam proof assistant **Lean**, yang menetapkan bahwa pool baru tersebut tidak dapat menciptakan koin palsu di bawah asumsi yang telah dinyatakan. Proof tersebut bersifat publik, berada di repositori open-source `ironwood`, dan membutuhkan waktu lebih dari satu bulan bagi tiga tim peneliti dan kriptografer untuk menyelesaikannya.

Hal ini sangat penting melampaui Zcash. Ini adalah salah satu demonstrasi dunia nyata paling jelas bahwa Anda dapat mengambil sistem keuangan yang aktif, menuliskan secara tepat apa arti "tidak ada pemalsuan", dan *membuktikannya*, alih-alih hanya berharap pengujian Anda sudah menyeluruh. Hal ini mengubah sebuah janji menjadi sebuah teorema.

---

## 2. Ide inti: membuktikan spesifikasi, membasmi kelas bug

Bagian 2 berakhir pada wawasan yang memungkinkan hal ini terjadi. Ingatlah kembali, karena semua yang ada di sini bergantung padanya:

> Bug pemalsuan yang *tidak terdeteksi* hanya dapat eksis di dalam **spesifikasi** protokol, yaitu deskripsi matematis tentang apa yang harus ditegakkan oleh sirkuit. Apa pun yang dapat dideteksi akan muncul dalam pembukuan publik. Oleh karena itu, membuktikan kebenaran spesifikasi tersebut secara langsung mengeliminasi seluruh kelas bug pemalsuan tersembunyi sekaligus.

Mengapa "hanya dalam spesifikasi"? Karena setiap blok mencatat secara permanen seluruh isi dari setiap transaksi, termasuk proof miliknya. Jika *perangkat lunak* salah menerima transaksi yang buruk, siapa pun dapat memutar ulang riwayat melalui perangkat lunak yang telah diperbaiki dan melihatnya. Bukti tersebut bersifat permanen dan publik. Hanya cacat dalam *matematika* dasar yang dapat tersembunyi selamanya, karena tidak ada "versi benar" untuk digunakan sebagai pembanding saat memutar ulang. Itulah celah yang ingin diatasi oleh verifikasi formal.

Pengujian memeriksa *perilaku pada input yang diambil secara sampel*, dan bug Orchard tersembunyi justru karena tidak ada input sampel yang mengenainya. Sebuah proof tentang spesifikasi mencakup **semua** input secara bersamaan, termasuk kasus-kasus ekstrem yang tidak terpikirkan oleh siapa pun untuk dicoba. Itulah satu-satunya jenis jaminan yang cukup kuat untuk menghapus cacat tak terlihat yang telah berusia empat tahun dengan penuh percaya diri.

![alt text](image-2.png)

---

## 3. Apa sebenarnya yang telah dibuktikan

Proof tersebut menetapkan satu properti utama, yang dibangun dari properti yang lebih mendalam di bawahnya.

### Integritas saldo

> **Integritas saldo:** nilai tersembunyi yang disimpan dalam pool terlindungi tidak pernah melebihi nilai publik bersih yang telah mengalir ke dalamnya.

Ini adalah properti anti-pemalsuan dalam bentuk sederhana. Dana dapat masuk ke pool terlindungi (terlihat secara publik) dan keluar darinya (terlihat secara publik), tetapi di dalamnya, di mana jumlahnya disembunyikan, tidak ada nilai yang dapat dimunculkan secara tiba-tiba. Mari kita buat ini menjadi konkret dengan buku besar kecil (aritmatika terverifikasi):

- **Transaksi jujur:** input senilai `5 + 3 = 8` menghasilkan output senilai `4 + 4 = 8`. Nilai masuk sama dengan nilai keluar. Integritas saldo terjaga. ✓
- **Upaya pemalsuan:** input yang sama senilai `8`, tetapi output sebesar `4 + 4 + 2 = 10`. Hal tersebut akan mencetak `2` unit dari ketiadaan. Integritas saldo **melarang** hal ini: pool tidak boleh membayar lebih banyak daripada apa yang telah dimasukkan ke dalamnya. ✗

Integritas saldo adalah pernyataan matematis bahwa skenario kedua tidak akan pernah dapat menghasilkan transaksi yang valid.

### Soundness pengetahuan (mesin di baliknya)

Untuk menjamin integritas saldo, para peneliti pertama-tama harus membuktikan properti yang lebih dalam dan lebih halus mengenai sistem zero-knowledge proof itu sendiri. Soundness biasa (Bagian 2 "hanya pernyataan yang benar yang memiliki witness") ternyata *tidak cukup* untuk sebuah pool terlindungi, karena alasan yang menarik: karena sebuah transaksi tersembunyi dapat berisi apa saja, secara teknis hampir setiap pernyataan *memiliki* suatu witness. Oleh karena itu, para peneliti membuktikan properti yang lebih kuat:

> **Keabsahan pengetahuan:** siapa pun yang dapat menghasilkan proof transaksi yang valid harus *benar-benar memiliki* saksi yang valid, yaitu koin asli, yang diturunkan dengan benar, pada alamat yang tepat.

Alat formal untuk hal ini adalah sebuah **extractor**: sebuah prosedur yang, jika diberikan prover mana pun yang dapat meyakinkan verifier, dapat menarik witness aktual dari mereka. Jika sebuah witness selalu dapat diekstrak, maka prover yang meyakinkan pasti benar-benar memilikinya. Dalam bahasa Bagian 2, knowledge soundness adalah janji formal bahwa **tidak ada soundness gap**, tidak ada batasan yang hilang yang akan membiarkan pernyataan palsu lolos. Ini adalah properti tepat di mana *ketidakhadirannya* merupakan bug Orchard. Membuktikan keberadaannya, untuk semua prover yang memungkinkan, adalah hal yang menutup pintu tersebut rapat-rapat.

![alt text](image-3.png)

---

## 4. Bagaimana proof dibangun

Verifikasi tersebut merupakan upaya manusia yang serius, bukan hasil sekali klik:

- Ditulis dalam asisten proof **Lean** (dari Bagian 1: sebuah mesin yang memeriksa setiap langkah logis).
- Terdiri dari **lebih dari 2.700 teorema**, yang tersedia secara publik di repositori `ironwood`.
- Dihasilkan oleh **tiga tim** peneliti dan kriptografer selama **lebih dari satu bulan**, termasuk pekerjaan yang dipimpin oleh Tal Derei dari Project Tachyon, dengan kontribusi dari Gregor Mitscha-Baude dari zkSecurity dan Daira-Emma Hopwood dari Zcash Open Development Lab, ditambah sebuah proof soundness paralel independen oleh kriptografer lainnya.

Untuk menalar properti tersebut, model Lean mendeskripsikan seluruh **ledger** sebagai daftar transaksi, yang masing-masing membawa aksinya, nilai publik yang dideklarasikan, dan tanda tangannya. Sebuah predikat yang disebut peneliti sebagai **ValidLedger** mentranskripsikan aturan konsensus jaringan secara langsung: saksi dari setiap aksi harus memenuhi kondisi yang diperlukan, tidak ada penanda pengeluaran (nullifier) yang boleh muncul dua kali, setiap status tree yang dirujuk haruslah status yang benar-benar dicapai oleh sistem, dan setiap tanda tangan harus dapat diverifikasi. Teorema-teorema tersebut kemudian melakukan kuantifikasi terhadap **setiap** ledger yang valid. Frasa tersebut, "setiap ledger yang valid," adalah inti utamanya: bukan sebuah sampel, melainkan semuanya, sebuah superset dari apa pun yang dapat disusun oleh penyerang sungguhan.

Hasil integritas-saldo disusun dari beberapa teorema tingkat buku besar, yang masing-masing membuktikan bahwa satu rute pemalsuan telah tertutup: bahwa setiap pengeluaran sesuai dengan output sebelumnya yang nyata, bahwa total nilai tetap terjaga, bahwa sebuah note yang diterima tetap dapat dibelanjakan dan tidak dapat dicuri, serta bahwa pengeluaran memerlukan otorisasi yang tepat. Bagian terpisah lainnya, **binding signature**, mengikat nilai-nilai tersembunyi dari setiap transaksi ke jumlah publik yang dideklarasikannya, sehingga akuntansi tersembunyi dan publik tidak dapat berbeda secara diam-diam.

---

## 5. Di mana matematika bertemu dengan perangkat lunak

Sebuah pertanyaan yang halus dan jujur: proof tersebut berkaitan dengan model matematika, tetapi jaringan menjalankan *kode Rust*. Bagaimana kita tahu bahwa kode tersebut sesuai dengan modelnya?

Tim tersebut membuat batasan cermat yang mereka sebut sebagai **fingerprint** verifier. Di atas batasan tersebut, proof Lean melakukan penalaran tentang verifier sebagai objek matematika yang presisi. Di bawahnya terdapat implementasi Rust biasa. Argumen utamanya adalah argumen yang sama dari Bagian 2:

> Cara apa pun di mana perangkat lunak yang sebenarnya dapat menyimpang dari model yang telah terbukti akan menjadi bug *implementasi*, dan bug implementasi hanya akan menghasilkan pemalsuan yang *dapat dideteksi*, karena setiap proof yang diterima dicatat secara permanen dan dapat diputar ulang melalui perangkat lunak yang telah diperbaiki.

Jadi, proof menangani kelas yang tidak dapat dideteksi (spesifikasi), dan catatan publik permanen menangani kelas yang dapat dideteksi (implementasi). Di antara keduanya, tidak ada tempat bagi bug pemalsuan yang *tidak dapat dideteksi* untuk bersembunyi. Tim juga melakukan pengecekan silang, dengan menjalankan verifier asli dan memastikan bahwa ia mereproduksi fingerprint secara tepat pada kasus-kasus yang ditangkap.

---

## 6. Peringatan paling penting: "asumsi yang dinyatakan kurang dari kenyataan"

Bagian 1 menegaskan bahwa sebuah proof menjamin sistem memenuhi spesifikasi *di bawah asumsi yang dinyatakan*, dan tidak pernah berarti "tidak ada bug selamanya." Tim Zcash sangat tepat mengenai hal ini, dan penulisan edukatif yang jujur pun harus demikian.

Proof tersebut mereduksi keamanan Ironwood menjadi sekumpulan kecil asumsi standar yang dinamai dengan jelas. Secara khusus, soundness-nya bergantung pada tingkat kesulitan **discrete logarithm problem** pada kurva eliptik yang digunakan Ironwood (sebuah asumsi yang telah dipelajari secara mendalam, di mana serangan terbaik yang diketahui akan membutuhkan sekitar `2^126` operasi, jauh melampaui komputasi apa pun yang layak), bersama dengan asumsi pemodelan standar untuk fungsi hash. Dua batasan perlu dinyatakan secara jelas:

- **Ini berlaku di bawah asumsi kriptografi tersebut.** Jika sebuah asumsi mendasar terbukti tidak valid, maka jaminan tersebut akan gugur. Hal ini adalah standar dan tidak dapat dihindari; pada dasarnya semua kriptografi yang diterapkan bergantung pada asumsi semacam itu.
- **Ini mencakup integritas saldo, bukan privasi.** proof tersebut berkaitan dengan keabsahan pasokan (tidak ada uang palsu). Ini **tidak** mengklaim untuk membuktikan jaminan privasi terpisah dari pool, yang merupakan properti berbeda dengan argumen yang berbeda pula.

Alih-alih merusak pencapaian tersebut, menetapkan batasan-batasan ini justru adalah apa yang membuatnya dapat dipercaya. Klaimnya sangat tepat: *di bawah asumsi kriptografi standar, pool ini tidak dapat membuat koin palsu yang tidak terdeteksi.* Itu adalah sebuah teorema, bukan sekadar harapan, dan cakupan presisinya dinyatakan secara terbuka.

![alt text](image-4.png)

---

## 7. Menghentikan penggunaan pool lama dengan aman: turnstile

Membuktikan kesehatan pool *baru* masih menyisakan sebuah pertanyaan: bagaimana dengan pool Orchard yang *lama*, tempat celah tersebut berada selama empat tahun? Anda tidak dapat menghapus masa lalunya. Namun, Anda dapat membatasi masa depannya.

Zcash memperkenalkan sebuah mekanisme yang disebut **turnstile**. Aturannya sederhana namun kuat:

> Nilai hanya boleh meninggalkan pool lama hingga jumlah yang dapat diverifikasi telah masuk ke dalamnya.

Karena pergerakan uang yang masuk dan keluar dari sebuah pool terlindungi dapat terlihat secara publik (hanya aktivitas *di dalam* yang disembunyikan), turnstile memungkinkan seluruh jaringan untuk memeriksa bahwa tidak ada jumlah yang keluar lebih banyak daripada yang pernah masuk. Jika koin palsu telah dibuat di dalam pool lama, koin tersebut akan membentur batas ini dan gagal untuk keluar. Dan saat dana yang sah bermigrasi keluar dan tidak ada kelebihan yang muncul, komunitas mendapatkan bukti publik yang kuat bahwa celah tersebut tidak pernah dieksploitasi. Ini adalah hal terdekat dengan mengaudit pasokan sebuah pool privat tanpa merusak privasinya, dan hal ini membawa integritas pasokan lebih dekat ke model transparan dari chain seperti Bitcoin sambil tetap menjaga privasi Zcash.

![alt text](image-5.png)

Ironwood itu sendiri menggunakan kembali sirkuit proof yang *telah diperbaiki*, dimulai dari awal dengan pool kosong, dan menambahkan perlindungan masa depan (termasuk ketentuan agar dana tetap dapat dipulihkan jika komputer kuantum di masa depan mengancam kriptografi saat ini). Aktivitas terlindungi baru kini mengalir melalui Ironwood, sementara pool Orchard yang lama dibatasi hanya untuk penarikan.

---

## 8. Gambaran yang lebih besar: kriptografi dengan jaminan tinggi

Ironwood adalah bagian dari pergeseran yang lebih luas dalam cara Zcash membangun. Upaya penskalaan generasi berikutnya (sebuah arsitektur yang disebut **Tachyon**, yang dibangun di atas recursive proofs dan sebuah toolkit bernama **Ragu**) sedang dikembangkan di bawah filosofi yang terkadang disebut **high-assurance cryptography**: memperlakukan verifikasi formal yang diperiksa mesin bukan sebagai pemikiran tambahan, melainkan sebagai bagian standar dari peluncuran sistem kriptografi baru.

Logikanya sangat meyakinkan. Kriptografi mutakhir adalah bidang di mana intuisi manusia paling lemah dan di mana sebuah edge case yang halus serta belum teruji dapat tersembunyi selama bertahun-tahun, sebagaimana ditunjukkan oleh Orchard. Membuktikan spesifikasi adalah satu-satunya teknik yang dapat berskala ke "semua input yang memungkinkan" dan menutup celah-celah tersebut melalui konstruksi. Tim telah memberi sinyal bahwa mereka berniat untuk memperluas pengawasan ini lebih jauh seiring berjalannya waktu, menuju implementasi dan seterusnya. Anda dapat mengharapkan standar ini diadopsi secara lebih luas, di dalam dan di luar Zcash.

---

## 9. Penafian yang jujur

Kami menyederhanakannya demi kejelasan. Pengembangan Lean yang sebenarnya jauh lebih mendetail daripada sketsa di sini, dengan definisi presisi mengenai tindakan, pernyataan, komitmen, nullifier, dan tanda tangan; "integritas saldo" dan "knowledge soundness" memiliki definisi formal tepat yang kami nyatakan hanya dalam kata-kata; reduksi ke tingkat kesulitan discrete-log melewati beberapa model perantara (model aljabar dari prover dan model random-oracle dari hash) yang kami kompresi menjadi "asumsi standar"; dan kami mendeskripsikan fingerprint serta turnstile pada tingkat konseptual. Semua ini tidak mengubah inti ceritanya: sebuah spesifikasi tentang "tidak ada pemalsuan," sebuah proof yang diperiksa secara mesin di atas semua ledger valid, pernyataan cakupan dan asumsi yang eksplisit dan jujur, serta penghentian pool yang cacat secara aman. Untuk laporan otoritatif, silakan merujuk pada tulisan verifikasi yang diterbitkan oleh Project Tachyon dan repositori proof `ironwood`.

---

## 10. Ringkasan

- Zcash menjawab bug Orchard tidak hanya dengan patch tetapi dengan **machine-checked proof** (lebih dari **2.700 teorema** dalam **Lean**, tersedia untuk publik) untuk **Ironwood** pool barunya.
- Proof tersebut menetapkan **integritas saldo** (pool tidak pernah membayar lebih banyak daripada yang dimasukkan secara publik), yang dibangun di atas **knowledge soundness** (sebuah proof yang valid mengharuskan pembukti untuk benar-benar memegang witness asli, yang diverifikasi melalui sebuah **extractor**). Knowledge soundness adalah tepat properti yang celahnya merupakan bug Orchard.
- Hal ini menalar tentang **setiap ledger yang valid**, bukan kasus sampel, yang mana menutup kelas bug pemalsuan tersembunyi yang terlewatkan oleh pengujian.
- Kesenjangan antara matematika dan perangkat lunak ditangani oleh batas **fingerprint**: bug yang tidak terdeteksi ditiadakan oleh proof, dan setiap penyimpangan implementasi akan dapat **terdeteksi** dalam catatan publik permanen.
- Jaminannya dinyatakan secara tepat: hal ini berlaku di bawah **asumsi discrete-log hardness dan hash standar**, dan mencakup **pemalsuan, bukan privasi**. Kejujuran ini adalah sebuah fitur, bukan kelemahan.
- **turnstile** menghentikan pool lama dengan aman dengan membatasi pengeluarannya sesuai dengan deposit yang dapat diverifikasi, mengungkap pemalsuan apa pun dan membangun bukti publik atas integritas pasokan.
- Ironwood mencerminkan pergerakan menuju **kriptografi dengan jaminan tinggi**, di mana verifikasi formal adalah bagian standar dari pembangunan uang kriptografi baru.

---

## Glosarium

| Istilah | Makna dalam bahasa Inggris sederhana |
|---|---|
| **Ironwood** | pool terlindungi baru milik Zcash (2026), menggantikan pool Orchard yang cacat |
| **Integritas saldo** | Pool tidak pernah membayar nilai lebih besar daripada yang dimasukkan secara publik |
| **Soundness pengetahuan** | Sebuah proof yang valid mengharuskan pembukti untuk memegang witness yang asli |
| **Extractor** | Sebuah prosedur yang menarik witness dari pembukti mana pun yang meyakinkan |
| **Lean** | Proof assistant yang digunakan untuk melakukan machine-check pada verifikasi |
| **ValidLedger** | Model formal dari aturan konsensus yang menjadi dasar penalaran teorema |
| **Fingerprint** | Batas antara matematika yang terbukti dan perangkat lunak Rust yang sedang berjalan |
| **Di bawah asumsi yang dinyatakan** | Proof tetap berlaku selama asumsi kriptografi yang disebutkan terpenuhi |
| **Turnstile** | Sebuah aturan yang membatasi pengeluaran pool sesuai dengan deposit yang dapat diverifikasi |
| **Kriptografi jaminan tinggi** | Membangun kriptografi dengan verifikasi formal sebagai langkah standar |

---

## FAQ

**Apakah proof tersebut berarti Ironwood bebas dari bug?**
Tidak, dan hal itu tidak mengklaim demikian. Proof tersebut membuktikan satu properti yang presisi, yaitu integritas saldo, di bawah asumsi-asumsi yang dinyatakan. Hal tersebut meniadakan pemalsuan yang tidak terdeteksi, namun bukan berarti bebas dari setiap bug yang dapat dibayangkan.

**Apakah proof menjamin transaksi saya bersifat privat?**
Tidak. Verifikasi tersebut mencakup kesehatan pasokan (tidak ada uang palsu), bukan jaminan privasi terpisah dari pool. Hal-hal tersebut dibuktikan dengan cara yang berbeda.

**Mengapa mempercayai sebuah proof yang ditulis oleh manusia (dan AI)?**
Karena ia diperiksa oleh mesin. Lean proof assistant memverifikasi setiap langkah secara mekanis, sehingga kepercayaan bersandar pada spesifikasi dan asumsi yang ditentukan, bukan pada ketelitian manusia atau AI dalam setiap langkahnya.

**Apa yang terjadi pada koin yang masih berada di dalam Orchard pool lama?**
Koin tersebut dapat ditarik, tetapi hanya sampai jumlah yang dapat diverifikasi telah masuk, yang ditegakkan oleh turnstile. Hal ini melindungi integritas pasokan sekaligus membantu menunjukkan bahwa celah lama tidak pernah dieksploitasi.

**Apakah ini akhir dari ceritanya?**
Ini adalah sebuah pencapaian penting, bukan garis finis. Arsitektur masa depan Zcash (Tachyon, dengan toolkit Ragu) sedang dibangun dengan verifikasi formal sebagai praktik standar, guna memperluas pendekatan ini lebih jauh lagi.

---

### Uji intuisi Anda

Seseorang mengklaim: "Karena Ironwood telah diverifikasi secara formal, kini mustahil bagi apa pun untuk terjadi kesalahan pada Zcash." Dengan menggunakan ide-ide dari ketiga bagian tersebut, berikan dua alasan berbeda mengapa klaim tersebut terlalu kuat. *(Jawaban di bawah.)*

<details><summary>Jawaban</summary>

Pertama, proof tersebut mencakup properti *tertentu* (integritas saldo) di bawah *asumsi yang dinyatakan* (kesulitan discrete-log dan pemodelan hash standar). Jika sebuah asumsi kriptografi berhasil ditembus, atau jika muncul masalah di luar apa yang telah ditentukan (misalnya dalam privasi, dalam perangkat lunak dompet, atau dalam beberapa komponen yang belum terbukti), proof tersebut tidak memberikan pernyataan apa pun mengenainya. Kedua, verifikasi formal menjamin sistem memenuhi *spesifikasi yang telah ditulis*; jika spesifikasi itu sendiri gagal menangkap beberapa persyaratan nyata, proof tersebut akan secara setia mensertifikasi hal yang salah. Kedua poin ini adalah pernyataan ulang dari peringatan Bagian 1: sebuah proof bersifat eksak dan terbatas, sangat kuat justru karena cakupannya jujur, bukan merupakan jaminan menyeluruh bahwa tidak ada satu pun hal yang dapat berjalan salah.
</details>

---

### Seri ini, lengkap

Melalui tiga bagian, kita bergerak dari ide umum menuju aplikasi nyata: apa artinya **membuktikan** kebenaran perangkat lunak alih-alih mengujinya (Bagian 1), bagaimana sirkuit yang kurang terbatasi secara nyata dapat mencetak uang yang tidak terlihat (Bagian 2), dan bagaimana proof dari **integritas saldo** yang diperiksa oleh mesin telah menghapus jenis bug tersebut untuk selamanya (Bagian 3). Benang merahnya adalah satu janji yang jujur: bukan "tidak akan pernah ada bug," melainkan "properti presisi ini berlaku untuk setiap kasus, di bawah asumsi yang dinyatakan." Untuk uang yang menyembunyikan jumlahnya sendiri, janji itulah yang sangat layak untuk dibuktikan.

*Bagian dari* seri Verifikasi Formal *untuk [ZecHub](https://zechub.org).*