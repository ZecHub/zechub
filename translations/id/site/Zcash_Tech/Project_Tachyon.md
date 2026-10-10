<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Proyek Tachyon

## Ringkasan Singkat

- Tachyon adalah usulan desain ulang cara dompet Zcash menemukan dan membelanjakan dana terlindungi, yang dimaksudkan agar jaringan dapat berkembang hingga jumlah pengguna yang sangat besar
- Saat ini, sebuah dompet harus mencoba mendekripsi sebagian besar blockchain untuk menemukan pembayaran mana yang menjadi miliknya, dan itulah alasan utama mengapa sinkronisasi terlindungi terasa lambat
- Tachyon menggantikan hal tersebut dengan **oblivious synchronization**, sehingga sebuah dompet mengambil apa yang dibutuhkannya tanpa memindai segalanya dan tanpa memberi tahu server bagian mana yang diinginkannya
- Ini juga memindahkan detail pembayaran keluar dari blockchain ke dalam permintaan pembayaran itu sendiri, yang membuat protokol menjadi lebih sederhana tetapi mengalihkan tanggung jawab ke dompet
- Ini adalah sebuah proposal, pertama kali diterbitkan pada April 2025 dan dinamakan sebagai kandidat untuk NU7. Fitur ini **belum diluncurkan**, dan memerlukan upaya rekayasa pada skala peningkatan Sapling

<br/>

## Untuk siapa ini ditujukan

- Siapa pun yang pernah menyaksikan sinkronisasi dompet terlindungi dan bertanya-tanya mengapa prosesnya memakan waktu begitu lama
- Pendatang baru yang terus melihat Tachyon disebutkan di samping penskalaan NU7 dan Zcash
- Pembaca yang ingin memahami konsepnya terlebih dahulu sebelum mempelajari kriptografinya

<br/>

## Masalah yang diselesaikan oleh Tachyon

Zcash menyembunyikan untuk siapa sebuah pembayaran ditujukan. Itulah inti utamanya, dan hal ini menciptakan masalah yang canggung: jika tidak ada yang dapat mengetahui milik siapa sebuah pembayaran, bagaimana dompet Anda sendiri menemukan milik Anda?

Di Bitcoin hal ini mudah dilakukan. Alamat bersifat publik, sehingga sebuah dompet dapat bertanya kepada server "apa yang dikirim ke alamat ini?" dan mendapatkan jawaban. Dompet Zcash tidak dapat mengajukan pertanyaan tersebut, karena menanyakannya akan mengungkap apa yang sebenarnya dirancang untuk disembunyikan oleh pool terlindungi.

Jadi Zcash melakukan sesuatu yang berbeda. Pengirim mengenkripsi detail pembayaran dan menyisipkannya ke dalam transaksi itu sendiri. Dompet Anda kemudian memproses transaksi pada chain dan mencoba mendekripsi setiap transaksi tersebut. Hampir semua upaya gagal. Beberapa yang berhasil adalah pembayaran Anda. Ini disebut **trial decryption**, dan proses ini bersifat privat, akurat, serta lambat.

![Today a Zcash wallet downloads every shielded transaction and tries to decrypt each one, with almost every attempt failing, to find the few payments that belong to it](/content-images/tachyon-scanning-today.svg)

Masalahnya terletak pada apa yang menjadi dasar dari pekerjaan tersebut. Upaya yang dihabiskan oleh dompet Anda ditentukan oleh seberapa besar ukuran chain, bukan berdasarkan berapa banyak pembayaran yang sebenarnya Anda terima. Seseorang yang belum pernah menerima satu pembayaran pun melakukan pekerjaan yang hampir sama banyaknya dengan seseorang yang menerimanya setiap hari. Seiring berkembangnya Zcash, hal ini akan semakin buruk bagi semua orang. Seperti yang dinyatakan dalam proposal tersebut, hal ini "sederhananya tidak dapat diskalakan."

<br/>

## Apa yang diubah oleh Tachyon

Tachyon mengatasi masalah ini langsung dari akarnya: ia berhenti menggunakan blockchain sebagai saluran pengiriman untuk rahasia pembayaran.

Sebaliknya, detail yang Anda butuhkan ikut serta bersama permintaan pembayaran itu sendiri, secara out-of-band. Sebuah permintaan pembayaran, URI, atau kode QR membawa informasi yang sebelumnya dienkripsi ke dalam transaksi. Sean Bowe mendeskripsikan hal ini sebagai penerapan **pembayaran out-of-band** untuk pertama kalinya dalam protokol Zcash terlindungi.

Setelah rantai tidak lagi membawa informasi tersebut, dompet Anda tidak lagi memiliki alasan untuk mencarinya, dan masalah dekripsi percobaan pun menghilang.

Namun, dompet Anda tetap perlu mengetahui status chain saat ini agar dapat melakukan pengeluaran. Itulah bagian kedua dari desain ini, **oblivious synchronization**: sebuah cara bagi dompet untuk mengambil hal-hal spesifik yang dibutuhkannya tanpa mengungkapkan kepada server hal apa saja yang diminta.

![With Tachyon the sender passes payment details to the recipient out of band, and the wallet uses oblivious synchronization to retrieve only the data it needs instead of scanning the whole chain](/content-images/tachyon-oblivious-sync.svg)

<br/>

## Apa artinya bagi seseorang yang menggunakan dompet

- **Sinkronisasi tidak lagi bertambah seiring pertumbuhan chain.** Waktu yang dihabiskan dompet Anda untuk mengejar ketertinggalan akan melacak aktivitas Anda sendiri, alih-alih ukuran Zcash.
- **Pembayaran menjadi lebih mirip seperti memberikan tagihan kepada seseorang.** Permintaan pembayaran membawa apa yang dibutuhkan penerima, sehingga pertukaran antara pengirim dan penerima menjadi lebih penting daripada saat ini.
- **Dompet memikul tanggung jawab lebih besar.** Karena chain tidak lagi menyimpan salinan terenkripsi dari detail pembayaran Anda, kehilangan data dompet Anda menjadi jauh lebih krusial. Pencadangan dan pemulihan berubah dari sekadar fitur protokol menjadi sesuatu yang harus dikelola dengan benar oleh perangkat lunak dompet.
- **Beberapa bagian yang sudah dikenal akan berpindah atau menghilang.** Tachyon mengeluarkan diversifikasi kunci, viewing key, dan alamat pembayaran dari protokol inti, dan menyerahkannya ke lapisan dompet. Ini adalah salah satu bagian paling berdampak dari proposal ini dan masih dalam tahap pengerjaan.

<br/>

## Penjelasan lebih mendalam untuk pembaca teknis

Tachyon dijelaskan sebagai perubahan yang kompatibel secara terbalik terhadap protokol Orchard. Hal ini dapat diterapkan baik sebagai peningkatan pada pool Orchard yang sudah ada atau sebagai pool terlindungi terpisah yang diakses melalui [turnstile](https://zechub.wiki/zcash-tech/the-turnstile), mekanisme yang sama dengan yang Zcash digunakan untuk Ironwood. Pilihan tersebut memengaruhi penerapan, bukan desainnya.

Ini menjaga beberapa hal dari Orchard: re-randomisasi kunci RedPallas, komitmen nilai homomorfik dan tanda tangan pengikat, serta struktur kunci terpartisi yang memungkinkan sebuah perangkat mendelegasikan pembuktian tanpa menyerahkan otoritas pengeluaran.

Pekerjaan penskalaan ini bersandar pada **proof-carrying data**, sebuah teknik di mana data berjalan bersama dengan proof dari kebenarannya sendiri, sehingga menggabungkannya dengan proof-carrying data lainnya menghasilkan sesuatu yang mewarisi dan memperluas proof tersebut. Inilah yang memungkinkan sejumlah besar pekerjaan terverifikasi dikompresi menjadi sesuatu yang kecil dan cepat untuk diperiksa. Halo, yang ditemukan oleh tim di balik Zcash, adalah apa yang membuat proof-carrying data cukup praktis untuk dibangun di atasnya.

Alur ketiga adalah **agregat transaksi terlindungi**, yang mengubah cara perubahan status terlindungi dikomunikasikan dan memiliki efek lanjutan pada cara kerja penandatanganan.

<br/>

## Status pekerjaan saat ini

Tachyon adalah sebuah **proposal, bukan fitur yang sudah dirilis**. Proposal ini diterbitkan pada April 2025, dan sebuah postingan lanjutan pada Mei 2025 membahas implikasi konsensusnya. Ini dinamakan sebagai kandidat untuk NU7, peningkatan besar berikutnya setelah Ironwood, namun isi dari NU7 ditentukan melalui pemungutan suara pemegang koin dan belum ada hal apa pun mengenai Tachyon yang diputuskan.

Kerangka berpikir penulis sendiri adalah bahwa ini merupakan rencana yang dapat ditindaklanjuti alih-alih penelitian spekulatif, namun memerlukan upaya rekayasa yang sebanding dengan Sapling, dengan beberapa pertanyaan yang lebih sulit sengaja dibiarkan untuk kemudian hari.

Pekerjaan terkait sudah terlihat. [Zakura](https://zechub.wiki/zcash-tech/zakura-node), sebuah full node yang dirilis pada Juli 2026, merupakan upaya bersama antara Project Tachyon dan Valar Group serta memberikan pratinjau dari beberapa perubahan tingkat jaringan ini. Penelitian [Private information retrieval](https://zechub.wiki/zcash-tech/private-information-retrieval) bertujuan untuk mengatasi hambatan pemindaian yang sama dari sudut pandang yang berbeda.

<br/>

## Kesalahpahaman umum

- **Tachyon belum aktif.** Tidak ada dompet yang menggunakannya saat ini, dan belum ada peningkatan jaringan yang mengaktifkannya.
- **Tachyon tidak sama dengan Ironwood.** Ironwood diaktifkan pada Juli 2026 dan menangani pool Orchard serta turnstile. Tachyon adalah proposal terpisah yang muncul kemudian mengenai penskalaan.
- **Tachyon bukanlah pengurangan privasi.** Tujuannya adalah untuk menjaga ketidakterbedaan ledger sambil menghilangkan biaya penskalaan, bukan menukar privasi dengan kecepatan.
- **Verifikasi zk-SNARK tidak pernah menjadi hambatan.** Proposal tersebut secara eksplisit menyatakan bahwa bagian yang lambat adalah bagaimana dompet menemukan dan mengoordinasikan status, bukan biaya pemeriksaan proof.
- **"Ditujukan untuk NU7" bukanlah sebuah komitmen.** Apa yang masuk ke dalam NU7 ditentukan melalui pemungutan suara.

<br/>

## Glosarium

| Istilah | Makna |
|---|---|
| Trial decryption | Upaya mendekripsi transaksi satu per satu untuk menemukan transaksi yang ditujukan kepada Anda |
| In-band secret distribution | Menempatkan rahasia pembayaran di dalam transaksi pada blockchain, sebagaimana yang dilakukan Zcash saat ini |
| Out-of-band payment | Mengirimkan detail pembayaran secara langsung antara pengirim dan penerima alih-alih melalui chain |
| Oblivious synchronization | Mengambil data chain yang dibutuhkan sebuah dompet tanpa mengungkapkan data mana yang diminta |
| Proof-carrying data (PCD) | Data yang menyertai sebuah proof atas kebenarannya sendiri, sehingga proof dapat digabungkan dan dikompresi |
| Shielded transaction aggregate | Cara Tachyon untuk membundel perubahan status terlindungi, mengubah cara perubahan tersebut dikomunikasikan dan ditandatangani |
| ledger indistinguishability | Sifat di mana transaksi terlindungi tidak dapat dibedakan satu sama lain |

<br/>

## FAQ

**Apakah ini akan membuat sinkronisasi dompet saya lebih cepat?** Itulah tujuannya. Waktu sinkronisasi akan mengikuti aktivitas Anda sendiri alih-alih ukuran chain. Belum ada yang dirilis, sehingga belum ada angka terukur yang dapat dikutip.

**Apakah saya perlu melakukan sesuatu sekarang?** Tidak. Tachyon adalah sebuah proposal. Jika diadopsi, hal tersebut akan hadir melalui peningkatan jaringan dengan pemberitahuan seperti biasanya.

**Apakah menghapus viewing key berarti kehilangan kemampuan untuk berbagi akses baca?** Proposal tersebut memindahkan kapabilitas tersebut keluar dari protokol inti dan ke lapisan dompet. Bagaimana hal itu terlihat dalam praktiknya adalah salah satu pertanyaan yang masih terbuka.

**Apakah uang saya berisiko jika Tachyon diluncurkan?** Penerapan akan menggunakan peningkatan Orchard atau turnstile, keduanya dirancang agar nilai berpindah di bawah aturan akuntansi publik. Halaman Ironwood menjelaskan cara kerja turnstile.

<br/>

## Halaman terkait

- [Private Information Retrieval](https://zechub.wiki/zcash-tech/private-information-retrieval) - pendekatan lain untuk hambatan pemindaian dompet yang sama
- [Zakura Node](https://zechub.wiki/zcash-tech/zakura-node) - sebuah node yang dibangun sebagian dari upaya rekayasa Tachyon
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) - peningkatan yang diaktifkan pada Juli 2026, sering kali tertukar dengan Tachyon
- [The Turnstile](https://zechub.wiki/zcash-tech/the-turnstile) - mekanisme yang dapat digunakan Tachyon jika diterapkan sebagai pool tersendiri
- [Keamanan Post-Quantum](https://zechub.wiki/zcash-tech/post-quantum-security) - di mana Tachyon berada berdampingan dengan pekerjaan protokol jangka panjang
- [Bagaimana Zcash Terorganisir](https://zechub.wiki/start-here/how-zcash-is-organized) - siapa yang melakukan pekerjaan ini dan bagaimana ekosistem ini saling terhubung

<br/>

## Sumber Daya

- [Tachyon: Menskalakan Zcash dengan Oblivious Synchronization](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2 April 2025, proposal asli
- [Tachyaction at a Distance](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15 Mei 2025, implikasi konsensus dan protokol, ditulis untuk developer protokol
- [blog Sean Bowe](https://seanbowe.com/blog/) - tempat seri Tachyon diterbitkan
- [tachyon.z.cash](https://tachyon.z.cash/) - situs proyek