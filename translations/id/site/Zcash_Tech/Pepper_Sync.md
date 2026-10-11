<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Pepper_Sync.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Zingo 2.0 - Pepper Sync

## Ringkasan Singkat

* Pepper Sync adalah mesin sinkronisasi yang diperkenalkan dalam Zingo! 2.0, dompet Zcash open-source yang dibuat oleh Zingo Labs.
* Ia menggunakan sinkronisasi non-linear alih-alih memindai chain dalam potongan sekuensial yang besar, sehingga saldo dan transaksi Anda muncul jauh lebih cepat.
* Progres disimpan secara berkelanjutan. Jika koneksi terputus atau aplikasi ditutup, sinkronisasi akan dilanjutkan dari tempat terakhir berhenti alih-alih mengulang dari awal.
* Anda dapat melakukan pengeluaran sebelum sinkronisasi selesai.
* Transaksi terlindungi tetap privat di seluruh proses tersebut.

## Penjelasan Inti

Zingo 2.0 adalah versi terbaru dari dompet Zingo!, sebuah dompet open-source yang ringan dan dibuat untuk komunitas Zcash. Bintang utama dari rilis ini adalah Pepper Sync, sebuah peningkatan besar yang merombak total cara dompet terhubung dengan blockchain.

Di masa lalu, proses sinkronisasi bisa terasa sangat lambat, rentan terhadap kesalahan, dan memakan banyak sumber daya, yang terkadang memaksa pengguna untuk memulai ulang dari awal. Pepper Sync mengubah semua itu. Fitur ini membuat sinkronisasi menjadi lebih cepat, lebih lancar, lebih andal, dan tidak terlalu membebani perangkat Anda, sambil tetap menjaga privasi transaksi terlindungi sepenuhnya.

Baik Anda seorang pengguna baru yang sedang mencoba Zcash untuk pertama kalinya, atau anggota komunitas lama yang mengelola banyak dompet terlindungi, Pepper Sync membuat pengalaman tersebut jauh lebih praktis dan menyenangkan.

### Fitur utama Pepper Sync

Pepper Sync memperkenalkan beberapa peningkatan:

- Sinkronisasi Jauh Lebih Cepat - Dompet Anda siap dalam hitungan menit, bukan jam.
- Pembaruan Cerdas - Data diproses dalam potongan yang lebih kecil, menghindari pemindaian ulang secara penuh.
- Tahan Terhadap Gangguan - Jika koneksi Anda terputus, sinkronisasi akan berlanjut dari titik terakhir.
- Ringan & Efisien - Dioptimalkan untuk ponsel, laptop, dan perangkat lain dengan daya rendah lainnya.
- Umpan Balik Lebih Jelas - Pembaruan progres secara real-time mengurangi kebingungan.
- Menjaga Privasi - Transaksi terlindungi tetap privat selama seluruh proses berlangsung.

### Apa yang lebih baik dari sebelumnya

Versi lama dari Zingo sering kali membuat pengguna frustrasi karena waktu sinkronisasi yang lama, penanganan kesalahan yang tidak jelas, dan penggunaan sumber daya yang berat. Pepper Sync memperbaiki masalah umum ini:

| Fitur              | Versi Zingo Sebelumnya                 | Zingo 2.0 dengan Pepper Sync               |
| ------------------ | -------------------------------------- | -------------------------------------------- |
| Kecepatan Sinkronisasi | Lebih lambat, terutama pada pengaturan awal | Sinkronisasi awal dan berkelanjutan jauh lebih cepat |
| Penanganan Error   | Terkadang terhenti dan kegagalan tidak jelas | Stabilitas yang ditingkatkan dengan pemulihan otomatis |
| Pengalaman Pengguna | Sinkronisasi terasa "buram" bagi pendatang baru | Transparan, dengan status dan pembaruan yang lebih jelas |
| Performa Perangkat | Penggunaan CPU/memori tinggi             | Dioptimalkan untuk penggunaan sumber daya yang lancar |

Singkatnya: sinkronisasi kini lebih cepat, lebih andal, dan lebih mudah dipahami.

## Visual / Analogi

Bayangkan sinkronisasi dompet lama seperti membaca buku yang sangat panjang dari halaman pertama, dengan suara keras, sebelum Anda diizinkan untuk mengatakan apa pun tentang buku tersebut. Berhenti di tengah jalan, dan Anda harus mulai lagi dari halaman satu. Pepper Sync membaca buku yang sama, tetapi ia menyimpan sebuah pembatas buku, membaca bab-bab yang penting bagi Anda terlebih dahulu, dan membiarkan Anda membicarakan ceritanya sebelum Anda menyelesaikan halaman terakhir.

Bookmark adalah bagian yang penting. Setiap versi sebelumnya menganggap sinkronisasi yang terinterupsi sebagai pekerjaan yang sia-sia; Pepper Sync menganggapnya sebagai jeda.

### Panduan visual

- Alur Terperinci - Menampilkan proses lengkap. ![Detailed Flow](/content-images/119c13ec-76be-42bd-b558-762d09275a1b-8ba7a18302.webp)

- Alur Sederhana - Tampilan cepat untuk pengguna sehari-hari. ![Simplified Flow](/content-images/9b612cbd-f24d-4472-9b87-0f2c908bb368-eb34a722a2.webp)

## Penjelasan Mendalam

### Cara kerja Pepper Sync (tampilan sederhana)

Alih-alih memindai ulang blockchain dalam potongan besar yang berat, Pepper Sync bekerja dalam langkah-langkah kecil yang mudah dikelola—selalu menyimpan progres Anda saat proses berlangsung.

1. Hubungkan - Dompet melakukan pengecekan ke jaringan.
2. Ambil Blok - Data diunduh secara bertahap.
3. Verifikasi - Transaksi divalidasi.
4. Kelola Note Terlindungi - Privasi tetap terjaga setiap saat.
5. Perbarui Saldo - Dompet diperbarui secara aman.
6. Simpan Progres - Berhenti dan melanjutkan kembali dengan lancar.
7. Selesai - Dompet siap untuk melakukan transaksi.

## Implikasi Praktis

### Siapa yang mendapat manfaat dari Pepper Sync?

- Pengguna Baru - Dapat menyiapkan dompet dengan cepat tanpa merasa terhambat oleh penundaan.
- Pengguna Harian - Sinkronisasi yang andal membuat pembayaran terlindungi praktis untuk penggunaan sehari-hari.
- Developer & Penguji - Waktu sinkronisasi yang lebih singkat berarti siklus pengujian yang lebih cepat.
- Perangkat Seluler & Ringan - Zingo kini berjalan secara efisien bahkan pada perangkat keras dengan sumber daya terbatas.

### Mengapa ini penting bagi Zcash

Zcash dibangun di sekitar transaksi terlindungi, salah satu alat privasi paling kuat dalam cryptocurrency. Namun privasi hanya akan berguna jika dapat diakses dengan mudah.

Pepper Sync membantu dengan cara:

- Menurunkan hambatan masuk - Pengguna baru dapat memulai dengan cepat.
- Mendukung kegunaan sehari-hari - Alamat terlindungi menjadi lebih mudah untuk dipercaya.
- Mendorong pertumbuhan ekosistem - Pengalaman dompet yang lebih baik mendorong lebih banyak adopsi, aplikasi, dan layanan.

Dengan meningkatkan pengalaman dompet, Pepper Sync memperkuat seluruh ekosistem Zcash.

### Memulai: onboarding dengan Zingo 2.0

1. Unduh Dompet - Dapatkan versi yang tepat dari halaman rilis [Zingo GitHub](https://github.com/zingolabs/zingolib)
2. Atur Dompet Anda - Buat dompet baru atau pulihkan dari frasa pemulihan yang sudah ada. [Zingo 2.0 dengan Zingo Labs](https://www.youtube.com/watch?v=FREwMzf_LlM)
3. Biarkan Pepper Sync Berjalan - Pantau indikator progres saat dompet Anda diperbarui. [Menjalankan Pepper Sync](https://x.com/ZingoLabs/status/1961871338441724191)
4. Mulai Gunakan Zcash - Kirim dan terima ZEC terlindungi segera setelah sinkronisasi selesai.
5. Tidak Perlu Khawatir Tentang Gangguan - Jika aplikasi tertutup atau koneksi terputus, Pepper Sync akan berlanjut secara otomatis.

## Kesalahan Umum

**Menganggap Pepper Sync sebagai dompet tersendiri**. Pepper Sync adalah mesin sinkronisasi di dalam dompet Zingo!, bukan aplikasi terpisah. Anda menginstal Zingo; Pepper Sync adalah apa yang berjalan di bawahnya.

**Mengasumsikan sinkronisasi yang lebih cepat berarti privasi yang lebih lemah**. Kecepatan tersebut berasal dari bagaimana data blok diambil, diurutkan, dan disimpan dalam cache, bukan dari pengungkapan informasi lebih lanjut. Transaksi terlindungi tetap privat di seluruh prosesnya.

**Dengan asumsi Anda harus tersinkronisasi sepenuhnya sebelum dapat melakukan pengeluaran**. Melakukan pengeluaran sebelum sinkronisasi selesai adalah salah satu fitur utama dari Pepper Sync, sehingga Anda tidak perlu menunggu dompet mencapai ujung rantai (chain tip).

## FAQ - Pertanyaan umum

**T: Apakah saya harus melakukan pemindaian ulang setiap kali saya membuka dompet?**

A: Tidak. Pepper Sync menyimpan progres, sehingga Anda hanya melakukan pembaruan dari titik terakhir.

**T: Apa yang terjadi jika koneksi internet saya terputus?**

Sinkronisasi berhenti sejenak dan berlanjut kemudian tanpa perlu memulai ulang.

**T: Apakah privasi saya aman saat melakukan sinkronisasi?**

Ya. Transaksi terlindungi tetap sepenuhnya privat.

**Q: Berapa lama sinkronisasi pertama berlangsung?**

Biasanya hanya beberapa menit, bukan berjam-jam, tergantung pada perangkat dan internet Anda.

**T: Bisakah saya menggunakan dompet sebelum sinkronisasi selesai?**

A: Ya. Pepper Sync mendukung pengeluaran sebelum sinkronisasi selesai, sehingga Anda tidak perlu menunggu dompet mencapai ujung rantai.

## Kesimpulan

Dengan Zingo 2.0 Pepper Sync, sinkronisasi bukan lagi kendala terbesar dari dompet terlindungi. Kini prosesnya menjadi cepat, stabil, dan ramah pengguna, sehingga menurunkan hambatan bagi pendatang baru dan membuat penggunaan sehari-hari jauh lebih praktis.

Bagi pengguna, ini berarti waktu tunggu yang lebih singkat dan privasi yang lebih tinggi. Bagi developer, ini berarti fondasi yang lebih kuat untuk dibangun. Bagi ekosistem Zcash, ini adalah langkah lain menuju pembuatan transaksi terlindungi yang dapat diakses oleh semua orang.

Zingo 2.0 dengan Pepper Sync bukan sekadar peningkatan; ini adalah sebuah lompatan maju untuk kripto yang privat dan dapat digunakan.

## Halaman Terkait

- Sinkronisasi Dompet [Zcash](/zcash-tech/zcash-wallet-syncing) — bagaimana sinkronisasi dompet bekerja di seluruh ekosistem Zcash.
- Node [Lightwallet](/zcash-tech/lightwallet-nodes) — infrastruktur yang digunakan untuk sinkronisasi dompet ringan seperti Zingo.
- [Zaino](/zcash-tech/zaino) — indexer yang dikembangkan oleh tim Zingo.
- [Dompet](/wallets) — direktori lengkap dari dompet Zcash dan fitur-fiturnya.

## Pembelajaran Lebih Lanjut

- Repositori GitHub Zingo! [](https://github.com/zingolabs/zingolib)
- Forum Komunitas ](https://forum.zcashcommunity.com/) [Zcash
- Pengumuman Resmi - [Zingo Labs Twitter](https://twitter.com/ZingoLabs)

Please provide the Markdown fragment you would like me to translate. I am ready to begin the localization process following all your specified rules and terminology.