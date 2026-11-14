# <img src="/content-images/people-community-add-svgrepo-com-3c6ac75333.svg" width="24" height="24" alt="community icon"/> Jalankan kampanye penggalangan dana ZEC

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Menengah - 10 menit
</span>

## Ringkasan

- Berikan akun dompet dan alamat terlindungi khusus untuk kampanye agar tidak pernah tercampur dengan dana lain
- Bagikan tautan permintaan pembayaran atau kode QR dengan jumlah yang disarankan dan memo yang sudah diisi
- Tunjukkan progres tanpa mengungkapkan donor: posting totalnya sendiri, atau berikan satu peninjau tepercaya sebuah viewing key
- Viewing key mencakup seluruh akun, bukan hanya satu alamat, sehingga kampanye memerlukan akunnya sendiri
- Tutup kampanye pada tanggal yang dijanjikan dan publikasikan penggunaan dana tersebut

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Untuk siapa ini?

- Kelompok komunitas, proyek open-source, dan kreator yang menggalang dana untuk satu tujuan
- Organisasi nirlaba yang menjalankan penggalangan dana akhir tahun atau darurat di ZEC
- Siapa pun yang ingin donor memercayai kampanye tanpa membuat setiap donasi menjadi publik

Jika kamu adalah organisasi nirlaba AS, baca [Menerima Donasi Privat sebagai Organisasi Nirlaba AS](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit) terlebih dahulu untuk mengetahui tentang tanda terima dan formulir IRS.

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Masalahnya

Sebagian besar penggalangan dana crypto menggunakan alamat transparan agar donor dapat melihat totalnya bertambah. Namun, hal itu juga memperlihatkan setiap donasi, jumlahnya, waktu kedatangannya, dan ke mana dana tersebut selanjutnya dikirim. Donor yang sengaja berdonasi secara privat kehilangan privasi itu, dan siapa pun dapat mengikuti dana tersebut setelah kampanye.

Kampanye yang sepenuhnya privat memiliki masalah sebaliknya: donor tidak dapat melihat apakah target telah tercapai atau bagaimana uangnya dibelanjakan.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> Mengapa Zcash?

Dengan ZEC terlindungi, setiap donasi tetap privat di blockchain, dan kamu menentukan apa yang akan ditampilkan: total, bilah progres, atau akses baca-saja untuk peninjau. Donor dapat menambahkan pesan dalam [memo](/using-zcash/memos), dan kamu dapat berterima kasih kepada mereka tanpa orang lain melihat siapa yang berdonasi.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Yang kamu perlukan

- Dompet [terlindungi](/wallets) tempat kamu dapat membuat akun terpisah
- Halaman kampanye: situs web, postingan media sosial, atau utas forum
- Target, tanggal berakhir, dan rencana penggunaan dana

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Panduan langkah demi langkah

### Langkah 1: Tetapkan target dan aturan

Tuliskan hal-hal berikut sebelum kamu meluncurkan kampanye:
- Jumlah dana yang dikumpulkan dan kegunaannya
- Tanggal berakhir
- Apa yang terjadi jika kamu mengumpulkan dana lebih atau kurang dari target
- Siapa yang mengendalikan dana, dan apakah pengeluaran harus disetujui oleh lebih dari satu orang (lihat [Jalankan Treasury Privat Komunitas](/zcash-use-cases/private-community-treasury))

Publikasikan hal-hal ini di halaman kampanye. Donor memercayai kampanye yang sejak awal menjelaskan apa yang akan dilakukannya.

### Langkah 2: Buat akun terpisah untuk kampanye

Buat akun baru di dompetmu yang hanya digunakan untuk kampanye ini, lalu salin alamat terlindungi darinya. Memisahkan kampanye memudahkan pembacaan total, dan hal ini penting nantinya jika kamu membagikan viewing key, karena viewing key memperlihatkan aktivitas seluruh akun ([Viewing Keys](/zcash-tech/viewing-keys)).

### Langkah 3: Buat tautan permintaan pembayaran dan kode QR

[URI permintaan pembayaran](/using-zcash/payment-request-uris) adalah tautan `zcash:` yang mengisi alamat, jumlah yang disarankan, dan memo untuk donor. Gunakan ZecHub milik [generator permintaan pembayaran](/tools) untuk membuatnya, lalu bagikan sebagai tautan dan kode QR.

Memo seperti "Nama kampanye, balas ke: email atau nama pengguna kamu" membantu donor yang menginginkan ucapan terima kasih atau tanda terima. Nyatakan di halaman bahwa memo bersifat opsional.

### Langkah 4: Luncurkan halaman kampanye

Cantumkan di halaman:
- Target, tanggal berakhir, dan aturan dari Langkah 1
- Alamat terlindungi, kode QR, dan tautan
- Cara berdonasi dari dompet terlindungi, serta tempat mendapatkannya
- Cara kamu melaporkan progres (Langkah 5)

Sematkan alamat di satu tempat dan beri tahu donor untuk menyalinnya hanya dari sana.

### Langkah 5: Laporkan progres tanpa mengungkapkan donor

Pilih salah satu dan jelaskan yang mana di halaman:
- **Posting totalnya sendiri**, misalnya seminggu sekali, dari saldo dompetmu untuk akun kampanye
- **Berikan viewing key kepada satu peninjau tepercaya**, seperti anggota dewan atau anggota komunitas yang dikenal donor, yang mengonfirmasi totalnya secara publik. Incoming viewing key memperlihatkan donasi yang diterima; full viewing key juga memperlihatkan pengeluaran ([Viewing Keys](/zcash-tech/viewing-keys))

Jangan publikasikan viewing key di halaman kampanye. Siapa pun yang memilikinya dapat melihat jumlah dan memo setiap donasi, termasuk detail kontak donor.

### Langkah 6: Ucapkan terima kasih kepada donor

Balas donor yang meninggalkan kontak dalam memo. Jangan pernah mempublikasikan nama atau jumlah donasi seorang donor tanpa meminta izin mereka terlebih dahulu.

### Langkah 7: Tutup dan laporkan

Pada tanggal berakhir:
- Nyatakan bahwa kampanye telah ditutup, lalu hapus atau perbarui alamat dan kode QR
- Posting total akhir dan penggunaan dana tersebut
- Jika kamu membagikan viewing key, minta peninjau untuk mengonfirmasi total akhir dan pengeluaran

[Pengungkapan pembayaran](/zcash-tech/payment-disclosures) suatu hari nanti mungkin memungkinkan kamu membuktikan satu pembayaran tanpa viewing key, tetapi standarnya masih berupa draf, jadi jangan mengandalkannya dulu.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Kesalahan umum yang harus dihindari

- Menjalankan kampanye dari akun dompet sehari-hari kamu
- Mempublikasikan viewing key, yang mengungkapkan jumlah dan memo setiap donor
- Menggunakan alamat setoran transparan atau exchange karena lebih mudah untuk menampilkan total
- Membiarkan alamat tetap tersedia setelah kampanye berakhir, sehingga donasi terus berdatangan tanpa rencana untuk menanganinya
- Tidak pernah melaporkan penggunaan dana

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Hasil

Kamu dapat:
- Menggalang ZEC untuk target yang jelas sementara setiap donasi tetap privat di blockchain
- Menunjukkan progres yang dapat dipercaya donor
- Menutup kampanye dengan laporan publik tanpa mengungkapkan donor

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Terkait

- [Menerima Donasi Secara Privat](/zcash-use-cases/receive-donations-privately) - donasi berkelanjutan, tanpa kampanye
- [Jalankan Treasury Privat Komunitas](/zcash-use-cases/private-community-treasury) - peran dan persetujuan untuk dana bersama
- [URI Permintaan Pembayaran](/using-zcash/payment-request-uris) - tautan dan kode QR dengan jumlah dan memo yang sudah diisi
- [Viewing Keys](/zcash-tech/viewing-keys) - akses baca-saja untuk peninjau
- [Tempat Berdonasi ZEC](/zcash-use-cases/where-to-donate-zec) - organisasi nirlaba yang sudah menerima ZEC

<br/>

## Langkah selanjutnya

- [Menerima Donasi Privat sebagai Organisasi Nirlaba AS](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit)

<br/>

Jika kamu baru memulai, mulailah dari sini: [Apa Itu Zcash](/start-here/what-is-zec-and-zcash)
