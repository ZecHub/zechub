# Menyimpan catatan dengan ZEC terlindungi

## Ringkasan Singkat

- Dana terlindungi bersifat pribadi, tetapi kamu tetap bisa menyimpan catatan keuangan yang bersih dan lengkap
- Memo berfungsi sebagai item baris dalam buku besar kamu, seperti nomor faktur atau tujuan pembayaran
- viewing key memungkinkan kamu, atau seseorang yang kamu pilih seperti akuntan, untuk meninjau riwayat kamu tanpa menjadikannya publik
- Kamu dapat menjumlahkan pendapatan dan pengeluaran untuk periode apa pun, yang mana merupakan hal yang kamu butuhkan untuk pelaporan atau pajak
- Semua ini tidak memperlemah privasi kamu, karena kamu yang memutuskan siapa yang boleh melihat apa

<br/>

## Untuk siapa ini?

- Pekerja lepas dan bisnis kecil yang dibayar dalam ZEC
- Siapa pun yang perlu melakukan pembukuan sambil tetap menjaga privasi
- Orang yang sedang menyiapkan catatan untuk akuntan atau untuk pajak

<br/>

## Tantangannya

Privasi dan pencatatan keuangan bisa terasa seperti dua hal yang berlawanan. Jika transaksi kamu terlindungi, jumlah dan alamatnya tersembunyi dari publik, jadi bagaimana cara kamu melakukan pembukuan dengan benar atau menunjukkan pendapatanmu kepada akuntan?

Dengan Zcash, ini adalah sebuah trade-off yang keliru. Transaksi terlindungi menyembunyikan aktivitasmu dari semua orang secara default, tetapi Zcash juga memberimu alat untuk mengungkapkan catatanmu sendiri kepada orang-orang yang membutuhkannya, sesuai dengan keinginanmu. Kamu tetap privat terhadap dunia dan terbuka bagi akuntanmu di saat yang bersamaan.

<br/>

## Memo adalah buku besar kamu

Setiap transaksi terlindungi (z ke z) dapat menyertakan [memo](/using-zcash/memos) terenkripsi. Untuk keperluan pencatatan, memo adalah tempat kamu menuliskan tujuan pembayaran tersebut: nomor faktur, nama klien, kode proyek, atau catatan singkat seperti "Sewa Maret".

Karena memo ikut serta dalam transaksi dan hanya dapat dibaca oleh pihak-pihak yang terlibat, memo tersebut menjadi item baris privat dalam pembukuan kamu. Saat kamu atau klien kamu menyertakan memo yang jelas pada setiap pembayaran, riwayat transaksi kamu berubah menjadi buku besar yang dapat digunakan, alih-alih sekadar daftar jumlah tanpa konteks.

Kebiasaan sederhana: sepakati dengan klien untuk selalu menyertakan nomor faktur di dalam memo. Nantinya, mencocokkan pembayaran dengan faktur akan menjadi sangat mudah.

<br/>

## Meninjau riwayat kamu sendiri

Untuk menjaga pembukuan, kamu perlu melihat aktivitasmu sendiri. Dompet kamu menyimpan kunci yang mendekripsi transaksi terlindungi milikmu, sehingga dompet kamu dapat menunjukkan gambaran lengkapnya: tanggal, jumlah, mana yang diterima, mana yang dikirim, dan memo yang terlampir.

Ini adalah bagian yang tidak dapat dilihat oleh publik, tetapi kamu bisa melihatnya, karena data tersebut adalah milikmu. Meninjau riwayatmu secara rutin, alih-alih hanya pada akhir tahun, akan menjaga catatanmu tetap akurat dan membuat kesalahan lebih mudah ditemukan.

<br/>

## Berbagi catatan dengan akuntan

Saat kamu perlu orang lain melihat aktivitas terlindungi milikmu, seperti akuntan atau auditor, kamu tidak perlu menyerahkan spending key milikmu atau mempublikasikan apa pun. Kamu cukup membagikan [viewing key](/zcash-tech/viewing-keys).

Full viewing key bersifat read-only. Ini memungkinkan pemegangnya untuk melihat transaksi masuk dan keluar untuk sebuah alamat, termasuk jumlah dan memo, tetapi tidak akan pernah membiarkan mereka memindahkan dana kamu. Hal ini menjadikannya sesuatu yang aman untuk diberikan kepada akuntan. Mereka mendapatkan visibilitas yang tepat sesuai kebutuhan mereka, uang kamu tetap berada di bawah kendali kamu, dan seluruh dunia tetap tidak bisa melihat apa pun.

Ini disebut pengungkapan selektif, dan ini adalah salah satu alasan praktis mengapa Zcash terlindungi berfungsi untuk pembukuan yang jujur alih-alih melawannya.

<br/>

## Penjumlahan untuk suatu periode

Untuk sebagian besar pelaporan, kamu memerlukan total dalam rentang waktu tertentu: berapa banyak yang kamu terima kuartal ini, berapa banyak yang kamu kirim, serta posisi neto kamu. Karena kamu dapat meninjau seluruh riwayat milikmu sendiri, kamu dapat menjumlahkan angka-angka ini untuk periode apa pun yang kamu pilih, baik itu satu bulan, satu kuartal, atau satu tahun.

Menjaga konsistensi memo akan membuat hal ini menjadi lebih mudah, karena kamu dapat mengelompokkan pembayaran berdasarkan tujuannya, bukan hanya berdasarkan tanggal dan jumlahnya.

<br/>

## Catatan mengenai pajak

Aturan pajak berbeda di setiap negara dan berubah seiring waktu, jadi ini adalah informasi umum dan bukan saran pajak. Di banyak tempat, menerima atau melepas cryptocurrency dapat memiliki konsekuensi pajak, dan kamu mungkin diharapkan untuk menyimpan catatan tentang apa yang kamu terima, kapan, dan nilainya pada saat itu.

Kabar baiknya adalah Zcash terlindungi tidak menghalangimu untuk memenuhi kewajiban ini. Kamu dapat menyimpan catatan pribadi yang lengkap, menjumlahkannya untuk periode yang diminta oleh otoritas pajakmu, dan mengungkapkannya kepada akuntan atau otoritas pajak menggunakan viewing key, tanpa membuat aktivitasmu menjadi publik. Jika kamu tidak yakin apa saja kewajibanmu, bicaralah dengan profesional yang berkualifikasi di negaramu.

<br/>

## Kesalahan umum yang harus dihindari

- Melewatkan memo, yang membuat kamu hanya memiliki jumlah nominal tanpa konteks pada akhir tahun
- Menggunakan satu alamat untuk segalanya, yang membuatmu lebih sulit untuk memisahkan klien atau tujuan
- Menunggu hingga musim pajak untuk meninjau riwayat satu tahun penuh alih-alih menyimpan catatan saat transaksi berlangsung
- Membagikan spending key padahal hanya viewing key yang bersifat read-only yang dibutuhkan oleh akuntan

<br/>

## Halaman terkait

- [Memo](/using-zcash/memos) - cara kerja memo terenkripsi
- [Viewing Keys](/zcash-tech/viewing-keys) - cara mengekspor dan membagikan akses baca saja
- [Pengaturan Privasi Freelancer](/zcash-use-cases/freelance-privacy-setup) - menerima pendapatan secara privat, langkah sebelum menyimpan catatan