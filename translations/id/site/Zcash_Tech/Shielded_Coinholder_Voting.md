<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Shielded_Coinholder_Voting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Pemungutan Suara Pemegang Koin Terlindungi

> Pada Agustus 2026, Zcash mengadakan jajak pendapat pemegang koin di mana surat suara tetap terenkripsi dan hanya total akhir yang diungkapkan, menggunakan protokol voting terlindungi yang dibangun oleh Valar Group.

Apa yang akan Anda pelajari: bagaimana sebuah suara dapat dibobotkan berdasarkan seberapa banyak ZEC yang Anda miliki, tetap terjaga privasinya, dan tetap dihitung dengan benar, semuanya tanpa ada orang lain yang mengetahui bagaimana Anda memberikan suara atau seberapa banyak aset yang Anda miliki.

Pemungutan suara pemegang koin terlindungi memungkinkan pemegang Zcash untuk memberikan suara pada pertanyaan ekosistem menggunakan ZEC terlindungi mereka. Tidak ada yang dapat mengetahui apa yang dipilih oleh setiap individu atau seberapa banyak ZEC yang mereka miliki, namun siapa pun dapat mengaudit bahwa totalnya sudah benar. Ini berjalan pada rantai pemungutan suara khusus yang dibangun oleh Valar Group, terpisah dari mainnet Zcash, sehingga dana asli Anda tidak pernah berpindah. Untuk bagaimana Zcash membuat keputusan secara lebih luas, lihat ringkasan [Zcash Pendanaan dan Tata Kelola](../zcash-community/zcash-governance). Halaman ini hanya membahas tentang protokol pemungutan suara kriptografis.

Baru di Zcash? Mulailah dengan [Apa itu ZEC dan Zcash](../start-here/what-is-zec-and-zcash), [Pool terlindungi](../using-zcash/shielded-pools), dan [zk-SNARKs](../zcash-tech/zk-snarks), lalu kembali ke sini.

![Shielded voting flow: a voter proves their Ironwood balance at a snapshot, casts an encrypted ballot split into shares, which are homomorphically tallied and then threshold-decrypted into totals only](/content-images/shielded-voting-flow.webp)

## Mengapa pemungutan suara privat itu sulit

Pemegang koin yang baik menginginkan empat hal sekaligus, dan cara-cara nyata untuk mendapatkannya saling bertentangan satu sama lain.

1. Berdasarkan bobot stake, sehingga memegang lebih banyak ZEC memberikan bobot yang lebih besar.
2. Privasi pilihan, sehingga tidak ada yang mengetahui bagaimana Anda memilih.
3. Privasi saldo, sehingga tidak ada yang mengetahui berapa banyak ZEC yang Anda miliki.
4. Perhitungan yang benar dan dapat diaudit yang dapat diperiksa oleh siapa saja.

Untuk melakukan pembobotan berdasarkan stake, Anda sepertinya membutuhkan saldo semua orang. Untuk menghitung surat suara, Anda sepertinya perlu membukanya. Melakukan salah satu dengan cara naif akan membocorkan informasi privat yang justru ingin dilindungi oleh [pool terlindungi](../using-zcash/shielded-pools), dan pemungutan suara koin sebelumnya memang membocorkan informasi saldo karena alasan ini. Pemungutan suara terlindungi menyelesaikan ketegangan tersebut dengan alat yang sama yang menggerakkan pembayaran terlindungi: [zero-knowledge proofs](../zcash-tech/zk-snarks), nullifier, dan enkripsi.

## Intuisi: kotak suara yang menghitung dirinya sendiri

> Sebuah turnstile memungkinkan Anda menghitung apa yang melewati brankas bank tanpa perlu melihat ke dalamnya. Kotak suara terlindungi melangkah lebih jauh: ia menjumlahkan suara-suara yang tersegel tanpa pernah membukanya.

Bayangkan sebuah kotak suara dengan tiga kekuatan yang tidak biasa. Kotak ini dapat menambahkan amplop tersegel ke dalam total berjalan tanpa membukanya. Sekelompok pejabat, di mana tidak ada satu pun yang memegang kuncinya secara tunggal, kemudian hanya mengungkapkan total akhir saja. Dan sebelum Anda memasukkan amplop, Anda secara diam-diam membuktikan bahwa Anda memiliki ZEC pada momen masa lalu yang tetap dan belum memberikan suara, tanpa menunjukkan koin mana yang milik Anda. Semua yang dijelaskan di bawah ini adalah cara kotak tersebut sebenarnya dibangun.

## Kelayakan dan snapshot

Satu putaran pemungutan suara menetapkan tinggi snapshot, sebuah blok mainnet Zcash tunggal, dan bobot Anda adalah saldo terlindungi yang dapat digunakan dalam pool [Ironwood](../zcash-tech/ironwood) pada blok tersebut. Aturannya sederhana: satu Ironwood ZEC pada snapshot sama dengan satu suara. Untuk jajak pendapat cakupan NU7, snapshot yang digunakan adalah blok mainnet 3.459.350, sekitar 24 Agustus 2026 pukul 19:00 UTC, dengan pemungutan suara terbuka hingga 14 September 2026 pukul 19:00 UTC. ZEC transparan ditangani secara terpisah oleh metode lama, bukan oleh protokol ini.

1. Dana Anda tidak pernah berpindah dan tidak pernah terkunci. Kelayakan ditetapkan pada saat snapshot, sehingga Anda dapat langsung membelanjakan atau memindahkan ZEC segera setelahnya tanpa memengaruhi suara Anda.
2. Tidak ada langkah registrasi. Hanya diperlukan tinggi snapshot, yang menjaga proses tetap ringan dan menghindari pengungkapan siapa yang berniat untuk memberikan suara.

## Membuktikan saldo Anda tanpa mengungkapkannya

Saat Anda memberikan suara, dompet Anda menghasilkan zero-knowledge proof bahwa pada saat snapshot Anda mengendalikan beberapa ZEC terlindungi yang belum terpakai. Hal ini menetapkan saldo dan ukurannya yang valid ke mesin penghitungan privat, tetapi tidak mengungkapkan catatan apa pun dan tidak menghasilkan transaksi apa pun pada mainnet Zcash.

Proof tersebut mencetak kredit pemungutan suara pada rantai pemungutan suara yang setara dengan saldo snapshot Anda, yang dimiliki oleh voting key baru yang dihasilkan dompet Anda khusus untuk putaran ini. Karena key tersebut baru dan tidak terhubung dengan alamat Zcash Anda, tidak ada apa pun di rantai pemungutan suara yang dapat dilacak kembali ke catatan asli Anda. Identitas on-chain Anda dan surat suara Anda tidak dapat dihubungkan secara konstruksi.

## Mencegah pemungutan suara ganda, secara privat

Untuk mencegah siapa pun memberikan suara dua kali dengan koin yang sama, sistem harus memastikan bahwa note di balik saldo Anda belum digunakan pada saat snapshot. Di mainnet, hal ini dilakukan dengan mengungkap nullifier dari sebuah note, yaitu penanda pengeluaran uniknya, yang diperiksa oleh full node untuk mendeteksi penggunaan ulang. Namun, mengungkap nullifier Anda di sini akan menghubungkan surat suara Anda secara langsung kembali ke note Anda.

![Private double-vote prevention: instead of revealing a nullifier, the wallet uses Private Information Retrieval to fetch proof material while hiding which nullifier it asked about, then proves the note was unspent](/content-images/shielded-voting-pir.webp)

Jadi, protokol tersebut membuktikan sebaliknya secara privat. Protokol ini menyusun daftar setiap nullifier yang telah digunakan hingga saat snapshot, dan dompet Anda membuktikan dalam zero-knowledge bahwa nullifier dari note Anda tidak ada dalam daftar tersebut, yang menunjukkan bahwa note tersebut belum dibelanjakan tanpa mengungkapkan note mana yang dimaksud.

Satu masalah masih tersisa. Mengambil potongan daftar yang diperlukan dari sebuah server akan mengungkap nullifier Anda kepada server tersebut, dan daftar lengkapnya sangat besar, sekitar 2 GB untuk data era Orchard dan jauh lebih besar seiring pertumbuhan Zcash. [Private Information Retrieval](../zcash-tech/private-information-retrieval) (PIR) menyelesaikan keduanya: dompet Anda mengambil tepat data yang dibutuhkannya sambil menyembunyikan secara kriptografis data mana yang diminta. Hasilnya diperiksa terhadap ringkasan daftar nullifier yang telah dipublikasikan, sehingga server yang tidak jujur tidak dapat memalsukan hasil palsu.

## Memberikan suara terenkripsi

Untuk setiap pertanyaan, dompet Anda melakukan tiga hal.

1. Ini mengenkripsi bobot suara Anda ke komite penghitungan menggunakan enkripsi homomorfik, sejenis enkripsi yang ciphertext-nya dapat dijumlahkan bersama tanpa perlu didekripsi. Hal inilah yang memungkinkan kotak tersebut menjumlahkan total suara yang tidak dapat ia baca.
2. Ini membagi suara Anda menjadi 16 bagian terpisah, sehingga bahkan komite yang berkolusi sepenuhnya akan kesulitan untuk menyusun kembali seberapa besar suara yang diberikan oleh satu orang.
3. Ini mengirimkan bagian-bagian tersebut pada waktu yang diacak melalui beberapa server, sehingga pengamat tidak dapat mengetahui bahwa bagian-bagian tersebut milik pemilih yang sama berdasarkan waktu kedatangannya.

Setiap bagian membawa zero-knowledge proof miliknya sendiri bahwa bagian tersebut adalah bagian sah dari surat suara yang valid, sehingga tidak ada yang dapat menambahkan suara tanpa dukungan. Bagian yang telah diverifikasi ditambahkan secara homomorfik ke dalam total berjalan terenkripsi untuk jawaban yang Anda pilih.

## Penghitungan tanpa membuka surat suara apa pun

Penghitungan dijalankan oleh otoritas pemilihan terdistribusi: setidaknya 10 validator voting-chain, di mana tidak ada satu pun dari mereka yang dapat mendekripsi apa pun. Pada awal sebuah ronde, mereka secara bersama-sama menjalankan upacara pembuatan kunci yang menghasilkan kunci enkripsi, yang mana kunci dekripsi pasangannya dibagi ke seluruh anggota dan tidak pernah disatukan di satu tempat.

> Tidak ada satu pejabat resmi pun yang memegang kuncinya. Kotak tersebut hanya akan terbuka ketika dua pertiga dari mereka memutar kunci mereka secara bersamaan, dan bahkan dalam kondisi itu, kotak tersebut hanya akan memperlihatkan jumlah totalnya.

Ketika putaran ditutup, total terenkripsi sudah ada dari penjumlahan homomorfik di atas. Setiap validator mempublikasikan dekripsi parsial beserta sebuah proof bahwa mereka melakukan dekripsi dengan benar. Setelah setidaknya dua pertiga telah berkontribusi, bagian-bagian tersebut digabungkan menjadi hasil perhitungan teks terang akhir untuk setiap pertanyaan, dan tidak ada hal lain yang pernah didekripsi. Setiap full node kemudian dapat memeriksa combined correctness proof tersebut, sehingga publik dapat memverifikasi jumlahnya tanpa harus mempercayai validator.

## Siapa yang menjalankannya, dan apa yang tidak dapat mereka lakukan

Desain ini memisahkan dua peran sehingga tidak ada grup yang memiliki terlalu banyak kekuasaan.

![Separation of powers: a coordinator multisig sets which questions appear but cannot see votes, while a validator set counts but cannot read individual ballots or forge a tally](/content-images/shielded-voting-roles.webp)

Multisig koordinator adalah grup 2-dari-5 dengan perwakilan dari Project Tachyon, [Zcash Foundation](../zcash-organizations/zcash-foundation), ZODL, [Shielded Labs](../zcash-organizations/shielded-labs), dan Valar Group. Grup ini memutuskan pertanyaan mana yang mencapai chain dan memberikan atestasi pada encryption key setiap ronde, tetapi tidak dapat melihat, mengubah, atau memblokir suara individu. Siapa pun yang tidak menyukai pertanyaan tersebut dapat menjalankan rantai pemungutan suara mereka sendiri, karena perangkat lunaknya bersifat terbuka dan permissionless.

Validator adalah setidaknya 10 node yang memegang kunci dekripsi terpisah dan melakukan dekripsi threshold. Mereka tidak dapat mendekripsi surat suara secara individu atau membuat rekapitulasi palsu, karena setiap dekripsi disertai dengan public correctness proof.

## Apa kegunaan quorum

Penyelenggara menetapkan ambang batas partisipasi: hasil jajak pendapat dianggap mewakili pemegang koin hanya jika setidaknya 1.000.000 ZEC berpartisipasi dalam setidaknya satu pertanyaan, termasuk abstain. Kuorum ini tidak menentukan keputusan atas suatu pertanyaan dan tidak diterapkan per pertanyaan. Ini adalah satu pemeriksaan tunggal pada seluruh jajak pendapat, sehingga hasil hanya dianggap serius ketika jumlah ZEC yang signifikan hadir. Di bawah tingkat tersebut, hasilnya tidak dianggap sebagai sinyal yang berarti.

## Apa yang tidak dapat dilindungi oleh protokol ini

Memahami batasan-batasan yang ada adalah bagian dari memahami desainnya.

1. Ini adalah sebuah sinyal, bukan keputusan yang mengikat. Pemungutan suara pemegang koin mengukur sentimen yang dibobot berdasarkan stake dan menjadi bagian dari proses [governance normal milik Zcash](../zcash-community/zcash-governance) alih-alih menggantikannya.
2. Ini dibobotkan berdasarkan koin, sehingga pengaruh mengikuti kepemilakan. Friksi yang lebih rendah dapat meningkatkan partisipasi tetapi tidak mengubah konsentrasi ZEC.
3. Agenda ditetapkan oleh multisig koordinator, yang memilih pertanyaan mana yang akan muncul. Ini tidak dapat menyentuh pemungutan suara, dan siapa pun dapat menjalankan rantai yang bersaing, namun penetapan agenda tetap menjadi titik pengaruh.
4. Penghitungan memerlukan validator yang online. Menghasilkan hasil akhir memerlukan setidaknya dua pertiga dari mereka untuk bekerja sama, sehingga pemadaman besar atau penolakan terkoordinasi dapat menunda hasil.
5. Menyeimbangkan privasi di bawah kolusi penuh adalah pertahanan berlapis (defense in depth), bukan sebuah teorema. Jika seluruh komite secara rahasia merekonstruksi kunci tersebut, pembagian-bagian dan pengiriman yang dijadwalkan adalah apa yang melindungi keseimbangan Anda, dan para desainer mengakui bahwa hal ini lebih lemah di bawah kolusi. Analisis lalu lintas yang canggih adalah risiko residual.
6. Memiliki lebih banyak komponen bergerak dibandingkan desain lama. Server PIR, server pengiriman, kunci voting baru, dan proof multi-tahap masing-masing merupakan tempat di mana bug atau kesalahan konfigurasi dapat muncul. Sistem ini bersifat open source dan bagian-bagiannya telah diaudit secara independen, yang mengelola risiko tersebut alih-alih menghilangkannya.

Apa yang dilindunginya, secara kuat dan dapat diverifikasi, adalah dua hal yang paling penting: surat suara Anda tidak dapat dikaitkan dengan identitas Anda, dan hanya total akhir yang akan diungkapkan.

## Glosarium

| Istilah | Makna dalam Bahasa Inggris Sederhana |
|---|---|
| Voting chain | Sebuah blockchain terpisah, yang dibangun oleh Valar Group, yang menjalankan pemungutan suara; note Zcash Anda tidak pernah berpindah ke dalamnya |
| Snapshot height | Blok mainnet yang saldo-saldonya menentukan bobot voting (blok 3,459,350 untuk jajak pendapat NU7) |
| Nullifier | Penanda pengeluaran unik dari sebuah note; mengungkapnya akan menghubungkan surat suara ke sebuah note, sehingga voting membuktikan non-keanggotaan sebagai gantinya |
| Private Information Retrieval (PIR) | Mengambil data dari server sambil menyembunyikan data mana yang Anda minta |
| Homomorphic encryption | Enkripsi yang ciphertext-nya dapat dijumlahkan bersama tanpa perlu didekripsi |
| Coordinator multisig | Grup 2-dari-5 yang mengotorisasi pertanyaan dan round key, tetapi tidak dapat melihat atau mengubah suara |
| Election authority | 10 validator atau lebih yang secara bersama-sama memegang split decryption key dan hanya mengungkap hasil akhir |
| Threshold decryption | Memulihkan hasil hanya ketika pemegang bagian kunci yang cukup, dalam hal ini dua pertiga, bekerja sama |
| Quorum | Partisipasi minimum 1.000.000 ZEC untuk jajak pendapat agar dapat dianggap representatif |

## FAQ

Apakah koin saya berpindah atau terkunci saat saya memberikan suara? Tidak. Kelayakan diukur pada blok snapshot, sehingga ZEC Anda tetap berada di tempatnya dan dapat digunakan. Pemungutan suara menghasilkan proof pada chain terpisah, bukan transaksi Zcash.

Apakah ada yang bisa memberi tahu bagaimana saya memberikan suara atau berapa banyak yang saya miliki? Tidak. Surat suara dienkripsi dan hanya total agregat yang didekripsi. Suara Anda tidak dapat ditautkan ke identitas Anda, dan saldo Anda dibagi menjadi 16 bagian berjangka untuk melindunginya bahkan terhadap komite yang melakukan kolusi.

Apa yang mencegah seseorang untuk memberikan suara dua kali, atau memberikan suara dengan koin yang tidak mereka miliki? Setiap surat suara membawa zero-knowledge proofs bahwa suara tersebut didukung oleh saldo snapshot asli yang belum terpakai, dan sebuah non-membership proof berbasis PIR menunjukkan bahwa note yang mendasarinya belum digunakan, tanpa mengungkapkan note mana yang dimaksud.

Siapa yang menghitung suara? Sebuah set terdistribusi dari setidaknya 10 validator, di mana tidak ada satu pun dari mereka yang dapat mendekripsi apa pun secara sendirian. Dua pertiga validator harus bekerja sama untuk mengungkap totalnya, dan setiap dekripsi disertai dengan public correctness proof.

Apakah hasilnya mengikat? Ini adalah sinyal sentimen pemegang koin yang dibobotkan berdasarkan stake. Hal ini memberikan informasi bagi tata kelola normal Zcash alih-alih secara otomatis memberlakukan sebuah perubahan.

Bisakah saya menjalankan atau mengaudit ini sendiri? Ya. Perangkat lunak voting-chain, sirkuit, sistem PIR, dan auditor penghitungan semuanya dipublikasikan oleh Valar Group agar dapat diperiksa dan dijalankan oleh siapa saja.

## Uji pemahaman Anda

Jika setiap surat suara dienkripsi dan setiap pemilih bersifat anonim, bagaimana seseorang dapat memastikan bahwa total yang dipublikasikan sudah benar dan tidak ada yang memberikan suara dua kali?

<details>
<summary>Jawaban</summary>

Tiga proof melakukan pekerjaan tersebut. Setiap surat suara membawa zero-knowledge proof bahwa ia didukung oleh saldo snapshot asli, sehingga tidak ada suara tanpa dukungan yang dihitung. Sebuah non-membership proof berbasis PIR menunjukkan bahwa note di baliknya belum digunakan, mencegah pemungutan suara ganda tanpa mengungkap note tersebut. Dan ketika validator mendekripsi totalnya, masing-masing mempublikasikan correctness proof, sehingga setiap full node dapat mengonfirmasi bahwa angka akhir telah didekripsi secara jujur dari surat suara yang terenkripsi.
</details>

## Sumber Daya

- Pengumuman Pemungutan Suara [NU7 Coinholder (Valar Group dan Proyek Tachyon)](https://forum.zcashcommunity.com/t/nu7-coinholder-vote/56912) - postingan forum yang merinci cakupan jajak pendapat, tinggi snapshot, dan jadwal
- [Rantai Pemungutan Suara Coinholder: desain teknis](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925) - tulisan protokol yang menjadi dasar halaman ini
- Dokumentasi pemungutan suara terlindungi [Valar Group](https://valargroup.gitbook.io/shielded-vote-docs) - referensi yang dikelola untuk rantai pemungutan suara
- Kode pemungutan suara [Valar Group dan audit (GitHub)](https://github.com/valargroup/vote-sdk) - implementasi open-source dan auditnya

## Halaman terkait

- [Private Information Retrieval](../zcash-tech/private-information-retrieval) - teknik non-membership proof di balik pencegahan pemungutan suara ganda secara privat
- [Ironwood](../zcash-tech/ironwood) - pool terlindungi yang saldo di dalamnya menentukan bobot suara
- [zk-SNARKs](../zcash-tech/zk-snarks) - sistem proof di balik proof saldo dan kelayakan
- [Shielded Pools](../using-zcash/shielded-pools) - apa itu saldo terlindungi dan mengapa saldo tersebut tetap tersembunyi
- [Zcash Ikhtisar Pendanaan dan Tata Kelola](../zcash-community/zcash-governance) - bagaimana sinyal sentimen ini masuk ke dalam proses keputusan yang lebih luas dari Zcash
- [Shielded Labs](../zcash-organizations/shielded-labs) - salah satu dari lima anggota multisig koordinator
