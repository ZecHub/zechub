![alt text](image-1.png)
# Bug Orchard: Ketika Sebuah Sistem Proof Memiliki Celah

### Bagaimana satu baris matematika yang kurang terdefinasi dapat mencetak uang tak terlihat tanpa batas

> **Seri:** *Seri Verifikasi Formal* · **Bagian 2 dari 3**
> **Audiens:** pendatang baru. Bagian 1 memperkenalkan verifikasi formal; di sini kita akan mempelajari bug nyata yang membuatnya menjadi mendesak. Semua hal yang diperlukan dijelaskan dari awal.
> **Apa yang akan Anda dapatkan:** gambaran intuitif namun akurat tentang bagaimana sebuah sistem cryptographic proof dapat mengandung celah soundness, apa sebenarnya bug Zcash "Orchard" tahun 2026, mengapa kelas bug ini dapat tersembunyi selama bertahun-tahun, dan mengapa hal ini pernah terjadi sebelumnya.

Pada Bagian 1 kami telah menyatakan bahwa pengujian dapat menunjukkan adanya bug tetapi tidak pernah bisa memastikan ketiadaannya, dan bahwa bug yang paling berbahaya berada dalam *spesifikasi* suatu sistem, yaitu matematika dasarnya. Artikel ini adalah studi kasusnya. Pada tahun 2026, sebuah celah ditemukan dalam pool terlindungi Orchard milik Zcash yang dapat memungkinkan penyerang membuat uang palsu tanpa batas secara tidak terlihat. Celah ini telah bertahan selama empat tahun dan melalui audit berulang kali. Memahaminya, beserta pendahulunya, adalah motivasi paling jelas untuk membuktikan kebenaran suatu sistem.

---

## 1. Mengapa Anda harus peduli?

Zcash adalah mata uang kripto dengan mode privat. Di dalam pool terlindunginya, jumlah, pengirim, dan penerima transaksi bersifat **tersembunyi**. Privasi ini diciptakan menggunakan **zero-knowledge proofs**: proof kriptografi bahwa sebuah transaksi mematuhi semua aturan, tanpa mengungkapkan isi dari transaksi tersebut.

Desain tersebut memiliki dua sisi mata uang. Pada buku besar transparan seperti Bitcoin, jika seseorang menciptakan koin dari ketiadaan, angka yang terinflasi akan terlihat oleh semua orang, dan jaringan dapat mendeteksinya lalu membatalkannya. Dalam pool terlindungi, angka-angka tersebut disembunyikan secara desain. Jadi, jika sistem proof itu sendiri memiliki celah yang membuat transaksi tidak valid tampak valid, pemalsuan tersebut akan menjadi **tidak terdeteksi**. Anda tidak dapat menemukannya dengan memeriksa buku besar, karena buku besar tersebut sengaja dibuat buram.

Itulah tepatnya risiko yang terwujud dalam Orchard. Untuk memahaminya, kita perlu melihat ke dalam apa yang sebenarnya diperiksa oleh sebuah zero-knowledge proof.

---

## 2. Intuisi: sebuah proof hanya sebaik daftar periksa yang dimilikinya

Bayangkan seorang petugas perbatasan yang harus menyetujui pelancong tanpa melihat dokumen mereka secara langsung. Sebaliknya, setiap pelancong mengisi sebuah **checklist**, dan petugas tersebut menyetujui siapa pun yang checklist-nya telah tercentang sepenuhnya. Checklist ini dirancang sedemikian rupa sehingga *hanya pelancong yang sah yang dapat mencentang setiap kotak.*

Sekarang bayangkan jika daftar periksa tersebut kekurangan satu kotak krusial, misalnya, "paspor tidak kedaluwarsa." Hampir semua orang tetap mengisinya dengan jujur dan tidak ada yang tampak salah. Namun, seseorang dengan paspor yang sudah kedaluwarsa *juga* dapat mencentang setiap kotak yang tersisa dan lolos begitu saja. Sistem tersebut terlihat baik-baik saja dalam penggunaan sehari-hari. Celah tersebut hanya akan menjadi masalah bagi seseorang yang sengaja mencarinya.

Sebuah zero-knowledge proof bekerja seperti daftar periksa tersebut. Ia tidak mengungkapkan detail pribadi; ia memeriksa bahwa detail tersebut memenuhi sekumpulan kondisi yang telah ditentukan. Dan jika satu kondisi penting secara tidak sengaja terlewatkan, maka beberapa input yang tidak valid *juga* dapat lolos, sementara semuanya tetap terlihat normal.

Mari kita buat "checklist of conditions" menjadi presisi, karena di sanalah tepatnya bug tersebut berada.

---

## 3. Matematika: sirkuit, batasan, dan soundness

Di balik layar, pernyataan "transaksi ini valid" dikodekan sebagai sebuah **circuit**: kumpulan kondisi aritmetika tetap, yang disebut **constraints**, yang ditulis sebagai persamaan dalam angka. Untuk membuat sebuah proof yang valid, pembukti harus menyediakan nilai rahasia (**witness**) yang memenuhi *setiap* constraint. Proof tersebut meyakinkan verifikator bahwa witness tersebut ada, tanpa mengungkapkannya.

Properti yang kita butuhkan dari sistem ini memiliki sebuah nama:

> **Soundness:** harus tidak mungkin untuk menghasilkan proof yang valid bagi pernyataan yang *salah*. Hanya pernyataan yang benar yang boleh memiliki witness yang memenuhi semua batasan.

Soundness adalah jaminan anti-pemalsuan. Jika soundness terpenuhi, sebuah proof yang valid benar-benar berarti "sebuah transaksi nyata yang mematuhi aturan telah terjadi." Jika terdapat celah pada soundness, sebuah proof yang valid mungkin tidak berarti apa pun sama sekali.

### Apa yang terjadi jika sebuah batasan hilang (sebuah contoh terverifikasi)

Batasan sering kali perlu memaksa suatu nilai agar menjadi sederhana. Contoh umum: memaksa sebuah nilai `b` untuk menjadi satu **bit**, baik itu `0` atau `1`. Cara standar untuk melakukan ini adalah dengan satu batasan:

```
b × (b − 1) = 0
```

Mengapa ini berhasil? Sebuah hasil perkalian bernilai nol hanya jika salah satu faktornya adalah nol. Jadi, `b × (b − 1) = 0` memaksa `b = 0` atau `b = 1`, dan tidak ada yang lain. Dengan memeriksa setiap nilai dari 0 hingga 16 (dalam aritmetika yang berputar kembali pada 17), *satu-satunya* nilai yang memenuhinya adalah tepat **0 dan 1**. ✓

Sekarang bayangkan jika baris tersebut **tidak sengaja terlewatkan** dari sirkuit. Tiba-tiba `b` tidak lagi memiliki batasan. Seorang prover yang tidak jujur dapat mengatur `b` menjadi `5`, atau `9`, atau apa pun, dan tetap memenuhi batasan yang tersisa. Satu baris yang hilang tersebut adalah sebuah **celah soundness**: pernyataan palsu kini memiliki witness yang memuaskan.

Ini bukan sebuah hipotesis. Sebuah batasan boolean yang hilang dengan jenis tepat seperti ini ditemukan dalam desain terlindungi pertama dari Zcash, yaitu Sprout, selama masa pengembangan, dan diperbaiki sebelum peluncuran. Under-constraining adalah salah satu kesalahan yang paling umum dan berbahaya dalam membangun sirkuit ini.

![alt text](image-2.png)

Inilah seluruh bentuk dari bug Orchard, dalam skala kecil. Sekarang, yang sebenarnya.

---

## 4. Apa sebenarnya bug Orchard tersebut

proof terlindungi dari Zcash dibangun di atas **elliptic curves**, objek matematika yang titik-titiknya dapat dikombinasikan dan "dikalikan" dengan angka, operasi yang harus ditegakkan oleh circuit dengan batasan (constraints). Circuit tersebut berisi gadget yang melakukan **elliptic-curve multiplication** dan memeriksa bahwa hal tersebut telah dilakukan dengan benar.

Menurut pengungkapan oleh Shielded Labs dan peneliti Taylor Hornby, celah Orchard adalah tepat seperti ini:

> Sebuah **elemen Orchard yang kurang terbatasi (under-constrained)** memungkinkan penginputan **input palsu sembarang ke dalam perkalian kurva elips dan tetap membuat pemeriksaan perkalian tersebut berhasil dilewati.**

Dalam istilah sederhana, daftar periksa sirkuit tersebut kehilangan kotak-kotak yang seharusnya mengunci perkalian tersebut. Karena adanya celah ini, penyerang yang cukup ahli dapat menyusun sebuah proof transaksi yang akan diterima oleh sistem meskipun transaksi tersebut menciptakan nilai dari ketiadaan. Hal itu adalah **pemalsuan**, dan karena jumlah dalam pool terlindungi disembunyikan, hal tersebut akan menjadi **tidak terdeteksi** dari ledger. Tim Tachyon kemudian menjelaskan cacat yang sama pada tingkat kode sebagai baris yang hilang dalam sirkuit yang secara diam-diam mengacak persamaan yang mendasarinya.

Kemiripannya dengan cerita daftar periksa kami sangat tepat:

| Cerita Checklist | Bug Orchard |
|---|---|
| Kotak "paspor tidak kedaluwarsa" yang hilang | Hilangnya batasan pada perkalian kurva-elips |
| Pelancong dengan paspor kedaluwarsa tetap bisa lewat | Input palsu sembarang dapat melewati pemeriksaan perkalian |
| Semua orang lainnya tidak terdampak, sehingga tidak ada yang terlihat salah | Transaksi normal berjalan dengan sempurna, menyembunyikan celah tersebut |
| Hanya seseorang yang mencarinya yang menemukan lubang tersebut | Dibutuhkan seorang ahli yang secara sengaja menguji matematika circuit tersebut |

Untuk memperjelas seberapa serius hal ini: peneliti tersebut, dengan bantuan AI, menulis sebuah *eksploitasi kerja yang lengkap* dan mengonfirmasi dalam jaringan uji lokal bahwa hal itu menghasilkan koin palsu yang tidak terbatas dan tidak terdeteksi. Ini adalah celah nyata yang dapat dieksploitasi, bukan sekadar kekhawatiran teoretis.

---

## 5. Mengapa hal ini tersembunyi selama empat tahun

Bug tersebut ada di dalam Orchard sejak aktivasinya pada **Mei 2022** hingga perbaikan darurat pada **Juni 2026**, melalui audit profesional yang berulang oleh beberapa kriptografer terbaik di dunia. Bagaimana bisa?

Karena, sebagaimana diperingatkan pada Bagian 1, **pengujian hanya memeriksa sampel kasus, dan celah ini terdapat dalam kasus yang tidak ada yang mengambil sampelnya.** Transaksi biasa tidak pernah menjalankan batasan yang hilang tersebut, sehingga setiap pengujian berhasil dan setiap hari operasional normal tampak tanpa cela. Celah tersebut hanya dapat dijangkau dengan sengaja menyusun witness tidak biasa yang ditujukan tepat ke celah tersebut. Hal ini pada akhirnya ditemukan bukan dengan menjalankan pengujian, melainkan dengan *bernalar tentang matematika dari circuit tersebut*.

Penemuan itu sendiri merupakan tanda ke mana arah keamanan akan menuju. Pada April 2026, Shielded Labs melibatkan peneliti keamanan **Taylor Hornby** secara khusus untuk mencari celah jenis ini. Segera setelah model AI frontier baru (Claude Opus 4.8 milik Anthropic) dirilis pada akhir Mei 2026, Hornby menggunakannya, bersama dengan harness analisis kustom dan metode tradisional, dalam peninjauan terarah terhadap sirkuit Orchard. Pada **29 Mei 2026**, peninjauan tersebut menemukan kerentanan tersebut.

Dua fakta nyata dari pengungkapan tersebut perlu dinyatakan secara jelas:

- Tim tidak menemukan **bukti** bahwa bug tersebut pernah dieksploitasi, dan menganggap eksploitasi sebelumnya tidak mungkin terjadi (bug ini telah lolos dari pengawasan ahli selama bertahun-tahun, dan ditemukan melalui upaya white-hat yang disengaja). Namun, sifat dasar dari celah yang *tidak dapat terdeteksi* berarti ledger saja tidak dapat membuktikan sepenuhnya bahwa hal tersebut tidak pernah terjadi.
- Penemuan ini menyebabkan gejolak yang signifikan, termasuk penurunan tajam pada harga aset, justru karena *kemungkinan* adanya pemalsuan tersembunyi sangatlah serius bagi uang.

![alt text](image-3.png)

---

## 6. Ini bukan pertama kalinya

Bug Orchard termasuk dalam kelompok yang sering terjadi, dan melihat kelompok tersebut adalah hal yang membuat verifikasi formal terasa bukan sekadar pilihan, melainkan sebuah keharusan. Cacat pemalsuan selalu berasal dari salah satu dari tiga sumber (taksonomi dari Bagian 1): **spesifikasi** (matematika itu sendiri), **implementasi** (kode yang gagal mengikuti matematika yang benar), atau **asumsi yang rusak**. Dan yang terpenting:

> Bug pemalsuan hanya **tidak dapat terdeteksi** jika bug tersebut terdapat di dalam **spesifikasi**. Bug implementasi meninggalkan bukti publik yang permanen, karena setiap blok mencatat seluruh isi dari setiap transaksi, sehingga memutar ulang riwayat melalui perangkat lunak yang telah diperbaiki akan mengekspos transaksi apa pun yang diterima secara salah oleh kode yang bermasalah tersebut.

Sejarah Zcash sendiri mengilustrasikan pola tersebut:

| Bug (tahun) | Sumber | Dapat Terdeteksi? |
|---|---|---|
| Cacat komitmen Zerocash (2016, sebelum peluncuran) | Spesifikasi (hash yang terpotong merusak properti pengikatan) | Tidak dapat terdeteksi |
| Cacat soundness trusted-setup (2018) | Spesifikasi (kesalahan dalam makalah zk-SNARK yang mendasarinya) | Tidak dapat terdeteksi |
| Tabrakan query sistem pembuktian (2025) | Spesifikasi (pemeriksaan yang hilang dalam sistem proof) | Dapat terdeteksi |
| Bug validasi subgroup-curve (2016) | Implementasi (pemeriksaan subgroup yang hilang) | Dapat terbuat |
| **Perkalian under-constrained Orchard (2026)** | **Spesifikasi (sirkuit)** | **Tidak dapat terdeteksi** |

Benang merahnya sangat jelas: kelemahan yang dapat tersembunyi selamanya adalah kelemahan yang ada di dalam matematika. Itulah tepatnya jenis masalah yang dapat dihilangkan oleh machine-checked proof dari spesifikasi tersebut, untuk semua kasus sekaligus. Pengujian dan audit hanya memeriksa sampel; hanya pembuktian matematika yang mencakup setiap input.

---

## 7. Respons

Para pengembang Zcash bergerak dengan cepat dan secara bertahap:

1. **Remediasi darurat (paling lambat 1-2 Juni 2026).** Dalam hitungan hari setelah pengungkapan, sebuah peningkatan jaringan darurat menutup celah kerentanan, dengan menambahkan batasan yang hilang sehingga matematika sirkuit tersebut menjadi kuat kembali.
2. **Awal baru yang dapat dibuktikan ("Ironwood," diaktifkan 28 Juli 2026).** Alih-alih mempercayai versi lama dari pool yang telah ditambal secara tanpa batas, komunitas meluncurkan sebuah pool terlindungi yang benar-benar baru, Ironwood, berdasarkan sirkuit yang telah diperbaiki namun dimulai dengan bersih, dan disertai dengan proof kebenaran formal yang telah diperiksa oleh mesin.

Langkah kedua itulah di mana verifikasi formal masuk ke dalam cerita, dan ini merupakan subjek dari Bagian 3. Realisasi yang diterapkan oleh tim layak untuk dipratinjau, karena hal ini menyatukan seluruh rangkaian ini:

> Celah pemalsuan yang *tidak terdeteksi* hanya dapat eksis di dalam **spesifikasi** protokol. Jadi, jika Anda dapat **membuktikan bahwa spesifikasi tersebut** meniadakan pemalsuan, Anda akan mengeliminasi seluruh kelas bug yang bersembunyi di sini selama empat tahun.

Itulah tepatnya ide pilar pertama dari Bagian 1: verifikasi spesifikasi, dan Anda menutup celah yang tidak akan pernah bisa diatasi oleh pengujian.

---

## 8. Penafian yang jujur

Kami sengaja melakukan penyederhanaan. Sirkuit yang sebenarnya melibatkan ratusan region dan ribuan constraint, dan celah yang sebenarnya secara teknis lebih rumit daripada sekadar satu bit-check yang hilang; kami menggunakan bit-check karena hal tersebut menunjukkan *bentuk* dari sirkuit yang under-constrained secara tepat, dan karena kesalahan yang persis seperti itu benar-benar terjadi dalam sejarah Zcash. Celah Orchard yang presisi adalah perkalian elliptic-curve yang under-constrained, sebagaimana dinyatakan dalam pengungkapan resmi. Kami juga memadatkan lini masa pengungkapan dan remediasi. Untuk laporan teknis yang otoritatif, silakan merujuk pada pengungkapan Shielded Labs dan tulisan Project Tachyon.

---

## 9. Ringkasan

- Pool terlindungi milik Zcash menyembunyikan jumlah menggunakan **zero-knowledge proofs**, sehingga celah dalam proof tersebut dapat memungkinkan terjadinya **pemalsuan yang tidak terlihat**.
- Sebuah sistem proof memeriksa sebuah **circuit** tetap dari **constraints**; properti krusialnya adalah **soundness**: hanya pernyataan yang benar yang boleh memiliki **witness** yang memuaskan.
- **Constraint yang hilang** menciptakan **soundness gap**, yang membiarkan pernyataan palsu lolos. (Kasus mainan yang terverifikasi: `b(b−1)=0` memaksa `b` menjadi 0 atau 1; jika dihapus maka `b` bisa menjadi apa saja. Kelas bug yang sama persis ini benar-benar terjadi dalam sejarah Zcash.)
- **Bug Orchard** adalah sebuah **under-constrained elliptic-curve multiplication**: input palsu arbitrer dapat lolos dari pemeriksaan perkalian, sehingga memungkinkan pemalsuan tanpa batas yang tidak terdeteksi. Sebuah eksploitasi yang berfungsi telah didemonstrasikan dalam sebuah jaringan uji.
- Bug ini tersembunyi selama **empat tahun** (Mei 2022 hingga Juni 2026) karena pengujian hanya mengambil sampel kasus dan tidak pernah mengambil sampel bug tersebut; bug ini ditemukan melalui penalaran matematika, dengan bantuan AI, pada 29 Mei 2026.
- Pemalsuan yang tidak terdeteksi hanya dapat eksis di dalam **spesifikasi**, dan Zcash telah melihat keluarga bug ini sebelumnya. Zcash merespons dengan perbaikan darurat dan sebuah pool baru yang terverifikasi secara formal, **Ironwood**, yang menjadi subjek Bagian 3.

---

## Glosarium

| Istilah | Makna dalam bahasa Inggris sederhana |
|---|---|
| **Pool terlindungi** | Mode privat dari Zcash di mana jumlah dan pihak-pihak disembunyikan |
| **Zero-knowledge proof** | Sebuah proof bahwa pernyataan tersembunyi adalah valid, tanpa mengungkapkan hal lainnya |
| **Circuit** | Kumpulan kondisi aritmatika tetap yang harus dipenuhi oleh sebuah transaksi yang valid |
| **Constraint** | Satu kondisi (persamaan) di dalam circuit |
| **Witness** | Nilai-nilai rahasia yang memenuhi constraint |
| **Soundness** | Jaminan bahwa hanya pernyataan yang benar yang dapat menghasilkan proof yang valid |
| **Soundness gap** | Sebuah constraint yang hilang yang memungkinkan pernyataan palsu lolos |
| **Under-constrained** | Sebuah circuit yang kehilangan kondisi yang dibutuhkannya, akar dari bug Orchard |
| **Dapat dideteksi / tidak dapat dideteksi** | Apakah eksploitasi akan meninggalkan bukti dalam ledger publik |

---

## FAQ

**Apakah Zcash palsu benar-benar dibuat?**
Tidak ada bukti eksploitasi yang ditemukan, dan tim menganggap hal tersebut tidak mungkin terjadi. Namun karena celah tersebut tidak akan terdeteksi dari ledger, ledger saja tidak dapat membuktikan sepenuhnya bahwa hal itu tidak pernah terjadi, itulah sebabnya respons yang diberikan sangat menyeluruh.

**Mengapa menyembunyikan jumlah membuat sebuah bug menjadi lebih buruk?**
Pada chain transparan, koin yang dicetak terlihat dan dapat dideteksi serta dibatalkan. Ketika jumlah disembunyikan demi privasi, sebuah bug pemalsuan tidak menghasilkan anomali yang terlihat, sehingga dapat bertahan tanpa terdeteksi.

**Mengapa audit selama bertahun-tahun tidak menemukannya?**
Audit dan pengujian sebagian besar memeriksa perilaku pada kasus-kasus yang realistis. Celah ini hanya muncul di bawah input tidak biasa yang dibuat secara sengaja untuk menargetkan kasus matematis ekstrem, yang tidak diuji dalam peninjauan rutin. Hal ini ditemukan melalui penalaran terarah terhadap circuit, bukan melalui pengujian.

**Apakah satu batasan yang hilang benar-benar menjadi satu-satunya penyebab?**
Ya. Sebuah sistem proof hanya sekuat kumpulan batasan lengkapnya. Satu kondisi penting yang terlewatkan sudah cukup untuk membiarkan pernyataan tidak valid lolos.

**Apa peran AI?**
Seorang peneliti menggunakan model AI mutakhir bersama dengan harness khusus dan metode tradisional untuk meninjau matematika sirkuit tersebut dan menemukan celahnya. AI semakin banyak digunakan di kedua sisi keamanan, yang menjadi salah satu alasan mengapa membuktikan kebenaran sistem saat ini menjadi sangat penting.

---

### Uji intuisi Anda

Misalkan sebuah transaksi terlindungi seharusnya membuktikan bahwa "uang masuk sama dengan uang keluar", tetapi sirkuit lupa untuk membatasi satu nilai output. Apa yang bisa dilakukan oleh pembuktian (prover) yang tidak jujur, dan mengapa buku besar publik akan terlihat benar-benar normal? *(Jawaban di bawah ini.)*

<details><summary>Jawaban</summary>

Dengan output yang tidak terkendala tersebut, prover dapat mengaturnya lebih besar dari yang diizinkan oleh input asli, sehingga menciptakan nilai dari ketiadaan, sebuah pemalsuan. Proof tersebut akan tetap terverifikasi, karena satu-satunya hal yang dapat mendeteksi ketidakseimbangan tersebut adalah batasan yang hilang. Dan karena pool terlindungi menyembunyikan jumlahnya, buku besar hanya menunjukkan bahwa "sebuah transaksi valid telah terjadi," tanpa adanya ketidakseimbangan yang terlihat untuk memicu peringatan. Pemalsuan ini nyata namun tidak terlihat, dan itulah alasan mengapa soundness dari circuit sangatlah penting, dan alasan tepat mengapa hal tersebut harus dibuktikan alih-alih diuji.
</details>

---

### Apa selanjutnya

**Bagian 3 · Ironwood:** perbaikan tersebut bukan sekadar patch. Para engineer Zcash membangun sebuah pool terlindungi baru dan menyertainya dengan mathematical proof yang diperiksa secara mesin, lebih dari 2.700 teorema yang ditulis dalam Lean proof assistant, bahwa ia tidak dapat menciptakan uang palsu di bawah asumsi yang dinyatakan. Kita akan melihat apa arti "balance integrity" dan "knowledge soundness", secara tepat apa yang dicakup dan tidak dicakup oleh proof tersebut, serta bagaimana pool lama dipensiunkan dengan aman.

*Bagian dari* seri Verifikasi Formal *untuk [ZecHub](https://zechub.org).*