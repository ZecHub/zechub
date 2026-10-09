<a href="https://github.com/zechub/zechub/edit/main/site/contribute/Contributing_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Berkontribusi ke ZecHub

ZecHub membantu orang-orang belajar tentang Zcash. Jika kamu sedang membaca halaman ini, kami sangat senang karena kamu mempertimbangkan untuk berkontribusi! Setiap kontribusi yang kamu berikan akan tercermin di [zechub.wiki](https://www.zechub.wiki/) dan media sosial ZecHub lainnya.

### Kontributor baru

Untuk mendapatkan gambaran umum tentang ZecHub, bacalah [README](https://github.com/ZecHub/zechub/blob/main/README.md).


### Memulai

ZecHub menggunakan GitHub untuk mengelola kontribusi komunitas. Jika kamu baru di GitHub, jangan khawatir! Kami akan menjelaskan bagaimana kamu bisa terlibat sebagai kontributor komunitas untuk ZecHub. Kami memberikan tip dalam ZEC terlindungi untuk kontribusi yang diterima. Jumlah hadiah tidak tetap di ZEC — lihat [Bagaimana hadiah ditentukan](#how-rewards-are-set). Dalam panduan ini, kamu akan mendapatkan gambaran umum tentang alur kerja kontribusi mulai dari membuka issue, membuat pull request (PR), meninjau, hingga menggabungkan PR tersebut.


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8eYDTyV39a4""
    title="Cara Berkontribusi ke ZecHub!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div >


### Bergabung dalam percakapan

Pertama, bergabunglah dalam percakapan di tautan komunitas [kami](https://zechub.wiki/zcash-community/community-links).

### Panduan Gaya

Setiap kontribusi untuk ZecHub harus mengikuti panduan gaya [ZecHub](https://zechub.wiki/contribute/style-guide). Ini mencakup wiki, dokumentasi, dan konten media sosial.

### Cara kamu dapat berkontribusi

ZecHub adalah proyek berbasis komunitas yang bertujuan untuk menyediakan dukungan dan sumber daya bagi pengguna dan pengembang Zcash. Ada banyak cara untuk terlibat dengan ZecHub, termasuk menulis untuk buletin mingguan kami, berkontribusi pada basis pengetahuan kami, atau membantu proyek pengembangan.

Berikut adalah jenis kontribusi yang saat ini diterima oleh ZecHub:

### Bagaimana imbalan ditetapkan

Tip dibayarkan dalam ZEC terlindungi. Angka ZEC yang sebelumnya berada di bagian judul di bawah adalah cuplikan historis pada kurs ZEC/USD yang lebih lama. Jangan menganggapnya sebagai kurs saat ini.

Bagaimana jumlah dipilih:

1. Sesuaikan pekerjaan dengan interval USD dalam kebijakan jumlah bounty [bounty amounts policy](https://bounties.zechub.wiki/docs/bounty-amounts).
2. Pilih target di dalam rentang tersebut — tidak secara otomatis yang paling atas.
3. Konversi pada spot ZEC/USD publik dan masukkan ZEC pada bounty:

```
zec_to_enter = usd_target / zec_usd_spot
```

Bulatkan hingga 4 tempat desimal. File kebijakan adalah satu-satunya sumber kebenaran. Jika halaman ini dan file tersebut tidak sesuai, maka kebijakan yang berlaku.

Pekerjaan berbayar terdaftar di [ZEC Bounties](https://bounties.zechub.wiki/).

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Lb5Bvl1GkRQ"
    title="Penjelasan ZecBounties | Dapatkan ZEC dengan Berkontribusi"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div >

Tiga keadaan yang tidak sama:

1. **Merged** — PR telah diterima ke dalam repositori.
2. **Reward approved** — sponsor atau DAO menyetujui bahwa reward berhak diberikan, beserta besarannya.
3. **Paid** — ZEC sampai ke Unified Address terlindungi milikmu.

Kontribusi yang digabungkan tidak secara otomatis menyetujui sebuah imbalan. Imbalan yang telah disetujui bukanlah pembayaran yang selesai.

#### Pekerjaan Dev

Setiap pekerjaan pengembangan yang disetujui yang membantu membangun ekosistem Zcash. Ini dapat mencakup wiki kami, dompet baru, atau aplikasi apa pun yang bisa kamu pikirkan.

#### Tutorial Zcash (video)

Berikut adalah contoh tutorial di bawah ini:


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/qz4KzDjkqu8"
    title="Tutorial Instalasi WSL + Kompilasi Zcashd/Transaksi"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div >

Buat dan bagikan tutorial tentang aplikasi Zcash dan dapatkan hadiah. Kirimkan PR ke zechub/tutorials atau kirim video ke saluran #video-content di Discord. Jika video memenuhi kriteria kami, kami akan mengunggahnya dan memberi kamu tip.

#### Wiki ZecHub - halaman wiki baru telah diterbitkan

Situs wiki kami menyediakan materi edukasi Zcash dalam format yang mudah dan sederhana untuk dipahami. Zcash adalah teknologi yang sangat mutakhir dengan komunitas yang dinamis, sehingga masih banyak dokumentasi yang perlu kami bangun. Tujuan kami adalah membangun dokumentasi mengenai:

```
- Zcash and its related technologies
- ZEC (Zcash currency) Use cases
- New User Guides
- Zcash Community and Ecosystem
- Privacy Ecosystem & Tools
```

Ini adalah bidang yang cukup luas, jadi ada banyak hal yang bisa dikerjakan. Jika kamu butuh inspirasi, silakan cek situs [wiki-docs kami saat ini](https://zechub.wiki/) dan lihat apa yang masih kurang. Setelah kamu menentukan apa yang ingin kamu tulis, mulailah melakukan perubahan dan pelajari cara mengirimkan PR ke repo ZecHub. Semua dokumentasi kami dibuat dan dikelola di repo ini. Ikuti [ZecHub panduan gaya](https://zechub.wiki/contribute/style-guide) saat menulis halaman wiki, dan gunakan halaman yang sudah ada di bagian yang sama sebagai referensi struktur. Setelah kamu mengirimkan PR, silakan kirim pesan ke @dismad, @squirrel, atau @vito di bagian #zechub pada discord, dan mereka akan meninjau PR kamu serta menggabungkannya jika sudah siap untuk ditambahkan ke situs. Jika berhasil digabungkan, mereka akan menambahkan dokumen tersebut ke situs web ZecHub. Jika dokumen belum siap, mereka akan menyarankan pengeditan untukmu di dalam PR tersebut.

#### Wiki ZecHub - halaman wiki yang diterjemahkan

Tujuan dari ZecHub adalah untuk menyediakan pusat edukasi open-source yang dapat dikontribusikan oleh siapa saja di komunitas Zcash. Salah satu keberhasilan terbesar dari hub ini adalah melihat anggota komunitas menerjemahkan materi ZecHub ke dalam bahasa lokal mereka.

Catatan: Batas kecepatan penerjemahan halaman global untuk ZecHub adalah 10 halaman per minggu.

Halaman lokal yang dikurasi di bawah `translations/<locale>/site/` dilacak terhadap sumber bahasa Inggrisnya menggunakan manifes hash-sumber. Lihat [translation/README-sync.md](https://github.com/ZecHub/zechub/blob/main/translation/README-sync.md) untuk deteksi data usang, alur kerja sinkronisasi, dan validasi istilah-terlindungi.

#### Wiki ZecHub - edit ke dokumen yang sudah ada

Terkadang informasi kami dalam dokumentasi tidak sepenuhnya akurat. Tidak apa-apa. Itulah alasan mengapa kami menjadikannya open-source! Jika kamu menemukan sesuatu yang perlu diubah dalam dokumen wiki, silakan buka bagian footer dokumen tersebut (yang terhubung ke halaman Github-nya) dan sarankan perubahan melalui PR.

#### ZecHub Wiki - tautan rusak telah diperbaiki

Jika kamu menemukan tautan yang rusak, atau ada sesuatu yang penting yang salah eja, silakan buka bagian footer dokumen ini (yang terhubung ke halaman GitHub-nya) dan sarankan perubahan tersebut melalui PR.

#### Newsletter - edisi baru

Kami memproduksi buletin mingguan ekosistem ini. Ini adalah cara yang sangat ringan / mudah untuk ikut terlibat! Buletin ini dikirimkan setiap hari Jumat atau Sabtu. Jika kamu ingin menulis buletin, kirim pesan ke @squirrel di bagian #zecweekly dari Discord untuk memberi tahu mereka.

Setelah kamu melakukan itu, kamu dapat menuju ke bagian [newsletter dari repositori ini](/newsletter/newsletterbasics.md) dan mengirimkan pull request untuk membuat edisi baru dari newsletter tersebut. Silakan ikuti format yang digunakan dalam [template](/newsletter/newslettertemplate.md) ini.

Setelah kamu melakukan ini, @squirrel atau (di Discord) akan melihat bahwa edisi baru buletinmu sudah tersedia, dan mereka akan meninjaunya lalu menggabungkannya ke repositori. Setelah digabungkan, mereka akan mengambil konten tersebut dan mengunggahnya melalui Substack.

#### Buletin - terjemahan

Saat ini kami memiliki edisi dalam bahasa Spanyol, Portugis, dan Rusia. Versi terjemahannya diunggah di media sosial mereka, dan kami melakukan yang terbaik untuk memperluas jangkauannya melalui media sosial ZecHub.

Jika kamu ingin menerjemahkan buletin ini ke dalam bahasa lokalmu, beri tahu kami saluran apa yang akan kamu gunakan untuk membagikannya dan bahasa apa yang akan kamu gunakan untuk menerbitkan buletin tersebut, agar kami dapat mengoordinasikan rilisnya.

#### Podcast - episode diunggah di media sosial ZecHub

Apakah kamu punya ide untuk acara berita, podcast, bincang-bincang Twitter, atau konten video/audio lainnya? Beritahu kami di Discord #video-content dan kita akan mendiskusikannya.

Imbalan untuk jenis konten ini sedikit lebih besar, sehingga sebuah proposal perlu diajukan ke DAO ZecHub sebelum menyetujui pengeluarannya.

#### Post media sosial yang kreatif

Kami menginginkan konten baru yang menarik untuk media sosial kami. Video pendek, GIF, meme, dan postingan kreatif lainnya dapat diterima jika sesuai dengan panduan gaya [ZecHub](https://zechub.wiki/contribute/style-guide). Besaran hadiah mengikuti kebijakan jumlah bounty [](https://bounties.zechub.wiki/docs/bounty-amounts).

Kamu juga bisa mendesain thumbnail untuk buletin dan podcast kami. Jika kamu memiliki bakat desain, kirim pesan kepada kami di #design pada Discord.

#### Ide lainnya? Beri tahu kami!

Punya saran lain? Beritahu kami di #general pada Discord. Kita bisa mendiskusikannya dan melihat apakah DAO dari ZecHub akan mendukungnya.

### Untuk Menyelesaikan

Jangan ragu untuk mulai berkontribusi pada salah satu protokol yang paling dihormati di industri ini. Ini adalah cara yang luar biasa untuk terlibat dengan Zcash. Jika kamu memiliki pertanyaan apa pun mengenai kontribusi, silakan beri tahu kami di [Discord](#join-the-conversation).

Terima kasih!