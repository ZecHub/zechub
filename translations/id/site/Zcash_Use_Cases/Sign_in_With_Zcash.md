# <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" alt="lock icon"/> Masuk dengan Zcash

<span className="inline-flex items-center gap-[6px]"><span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>Menengah - 7 menit</span >

## Ringkasan singkat

- Masuk dengan membuktikan bahwa kamu mengontrol alamat Zcash, alih-alih menggunakan kata sandi
- Dua desain sedang digunakan: **menandatangani sebuah challenge**, atau **mengirim pembayaran terlindungi dengan kode di dalam memo**
- Karena alamat terlindungi menyembunyikan saldo dan riwayat, pembuktian kontrol tidak akan mengekspos keuanganmu
- Pola ini masih baru. Belum ada standar yang diratifikasi, dan implementasi yang ada belum dapat saling beroperasi satu sama lain

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Ini untuk siapa?

- Developer yang menginginkan login tanpa kata sandi tanpa mengumpulkan data pribadi
- Pengguna yang lebih memilih untuk tidak memberikan alamat email ke setiap situs
- Siapa pun yang ingin login tanpa menghubungkan riwayat keuangan mereka ke sebuah akun

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Masalahnya

Sebagian besar opsi login membocorkan sesuatu:

- **Kata sandi dan email** membuat akun yang terhubung dengan identitasmu, dan keduanya dapat berakhir dalam kebocoran data (breach dumps)
- **Sign-in sosial** memberi tahu penyedia identitas setiap tempat di mana kamu login dan kapan hal itu terjadi
- **Sign-in dompet pada chain transparan** lebih buruk dari kelihatannya. Menghubungkan dompet dapat memberikan seluruh saldo dan riwayat transaksimu kepada situs tersebut secara permanen

Biasanya kamu harus memilih antara kenyamanan dan pengungkapan data.

<br/>

## <img src="/content-images/celebration-spark-svgrepo-com-bc98dec7c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="spark icon"/> Mengapa Zcash?

Zcash memisahkan *kontrol pembuktian* dari *pengungkapan keuangan*:

- **Alamat terlindungi** menjaga saldo dan riwayat transaksi tetap privat, sehingga membuktikan bahwa kamu memilikinya tidak akan mengungkap apa pun tentang aset yang kamu miliki
- **Memo terenkripsi** dapat membawa kode login satu kali secara privat di dalam sebuah transaksi
- **Viewing key** memungkinkan pengungkapan selektif, sehingga sebuah aplikasi dapat diberikan akses baca tepat pada apa yang dibutuhkannya dan tidak lebih

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Cara Kerjanya

Dua pendekatan telah muncul. Keduanya berakhir dengan aplikasi memegang pengenal stabil untuk kamu dan tanpa kata sandi.

### Pendekatan 1: Menandatangani sebuah tantangan

1. Aplikasi menghasilkan tantangan sekali pakai yang acak
2. Dompet kamu menandatangani tantangan tersebut dengan kunci di balik alamat kamu
3. Aplikasi memverifikasi tanda tangan tersebut dan mengizinkan kamu masuk

Tidak ada yang disiarkan, sehingga tidak ada biaya dan tidak perlu menunggu blok. Spesifikasi yang relevan adalah [ZIP 304, Sapling Address Signatures](https://zips.z.cash/zip-0304), yang masih berupa draf, sehingga dukungan dompet untuk penandatanganan pesan bervariasi.

### Pendekatan 2: Buktikan dengan pembayaran terlindungi

1. Aplikasi menghasilkan kode satu kali dan menampilkan permintaan pembayaran
2. Kamu mengirim transaksi terlindungi dalam jumlah kecil dengan kode tersebut di dalam memo
3. Aplikasi memantau memo, mencocokkan kode, dan melakukan login untukmu

Ini berfungsi dengan dompet yang sudah mendukung memo saat ini, yaitu sebagian besar dari mereka. Kompensasinya adalah kamu harus membayar biaya jaringan dan menunggu konfirmasi.

### Menjaga privasi alamat

Sebuah aplikasi tidak harus menyimpan alamat kamu untuk mengenali kamu. Beberapa implementasi melakukan hashing pada alamat tersebut bersama dengan nilai spesifik aplikasi, sehingga setiap situs melihat pengenal yang berbeda namun stabil untuk pengguna yang sama. Hal ini mencegah situs-situs tersebut saling membandingkan data untuk menghubungkan akun-akun kamu.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Trade-offs

Layak untuk dipahami sebelum kamu membangun atau mengandalkannya.

| | Tantangan bertanda tangan | Pembayaran terlindungi |
|---|---|---|
| Biaya | Gratis | Biaya jaringan per login |
| Kecepatan | Instan | Menunggu konfirmasi |
| Dukungan dompet | Terbatas, ZIP 304 masih berupa draf | Luas, hanya membutuhkan memo |
| Meninggalkan catatan rantai | Tidak | Ya, sebuah transaksi ada |

Batasan bersama:

- **Tidak ada pemulihan akun secara default.** Kehilangan key berarti kehilangan akun, kecuali jika aplikasi merancang jalur pemulihan
- **Penggunaan ulang alamat dapat menghubungkan kamu.** Menggunakan alamat yang sama di banyak situs menciptakan kembali masalah pelacakan, itulah sebabnya pengenal khusus aplikasi sangat penting
- **Tidak ada standar yang diratifikasi.** Setiap proyek memiliki skema sendiri, sehingga login yang dibuat untuk satu proyek tidak akan berfungsi dengan proyek lainnya
- **Bukan anonimitas secara mandiri.** Ini menyembunyikan keuangan kamu dari aplikasi, tetapi aplikasi tetap dapat membuat profil tentang apa yang kamu lakukan setelah kamu berada di dalamnya

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Kesalahan Umum yang Harus Dihindari

- Menggunakan kembali kode tantangan. Setiap kode harus hanya dapat digunakan satu kali dan kedaluwarsa dengan cepat, jika tidak, kode yang telah ditangkap dapat dimainkan ulang (replayed)
- Meminta pengguna untuk mengirimkan jumlah yang berarti agar bisa login. Pembayaran tersebut adalah sebuah proof, jadi jumlahnya haruslah sangat kecil
- Menyimpan alamat mentah padahal pengenal spesifik aplikasi dapat melakukan fungsi yang sama
- Berasumsi bahwa penandatanganan pesan berfungsi di mana saja. Periksa dompet yang sebenarnya dimiliki oleh pengguna kamu
- Menganggap memo sebagai rahasia setelah transaksi terjadi. Memo membuktikan bahwa pengirim telah bertindak, itu bukan sebuah kata sandi

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Proyek yang Menjelajahi Ini

Ini dibuat untuk jalur **Login Zcash** pada [ZecHub Hackathon 3.0](https://zechub.wiki/hackathon). Ini adalah eksperimen alih-alih produk jadi, dan menunjukkan betapa berbedanya cara membangun ide yang sama.

- **ZecAuth** - sebuah protokol koneksi dompet untuk Zcash, dengan semangat yang sama seperti apa yang dilakukan WalletConnect di tempat lain. Aplikasi ini menampilkan kode QR atau tautan `zecauth://` yang membawa tantangan serta kapabilitas yang diminta, seperti login, permintaan pembayaran, atau akses viewing. Tidak ada transaksi, tidak ada biaya, tidak ada interaksi chain. Protokol spesifikasi tertulis disertakan bersama dengan kodenya
- **ZShield** - mengubah alamat terlindungi menjadi W3C DID dan identitas OpenID Connect. Browser menghasilkan sepasang kunci (keypair), server mengeluarkan nonce melalui antarmuka gaya ZIP 304, dompet menandatanganinya, dan server mengembalikan JWT. Karena hasilnya kompatibel dengan OIDC, aplikasi yang sudah ada dapat menggunakannya tanpa integrasi khusus
- **ZecPass** - membuktikan kepemilikan melalui memo yang ditandatangani, dan dibangun sedemikian rupa sehingga aplikasi tidak pernah mengetahui alamat pengguna sama sekali. Protokol ini menurunkan hash berskala aplikasi untuk digunakan sebagai pengenal stabil, menjaga tantangan agar hanya dapat digunakan satu kali dan terikat waktu, serta menyediakan tombol React siap pakai dengan pustaka verifikasi Node
- **Portal** - login dengan mengirimkan transaksi terlindungi dengan kode satu kali di dalam memo, yang berjalan di mainnet. Alur yang sama digunakan kembali untuk membuka konten berbayar dan untuk mengirim atau menerima uang melalui sebuah tautan
- **ZcashMe** - menggunakan pembayaran terlindungi sebagai proof identitas, dan berfokus pada celah antara desktop ke mobile sehingga login di laptop tidak memerlukan ekstensi browser
- **ZBooks** - sebuah alat akuntansi dan pembayaran yang memperlakukan login dengan Zcash sebagai primitif auth yang dapat digunakan kembali alih-alih sebagai produk itu sendiri, dan membaca data treasury melalui Unified Full Viewing Key

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Halaman terkait

- [Memo](/using-zcash/memos) - cara kerja memo terenkripsi, dan bagaimana kode login berpindah di dalamnya
- [Viewing Keys](/zcash-tech/viewing-keys) - memberikan akses baca saja tanpa menyerahkan kekuatan pengeluaran
- [Menyimpan Catatan dengan ZEC Terlindungi](/zcash-use-cases/keeping-records-with-shielded-zec) - ide pengungkapan selektif yang sama, diterapkan pada akuntansi
- [Kirim Uang Tanpa Menghubungkan Identitas](/zcash-use-cases/send-money-without-linking-identity) - mengapa penggunaan ulang alamat merusak privasi

<br/>
