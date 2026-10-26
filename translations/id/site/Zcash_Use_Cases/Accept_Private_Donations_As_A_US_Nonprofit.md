# <img src="/content-images/money-business-and-finance-svgrepo-com-eac0e054bd.svg" width="24" height="24" alt="finance icon"/> Terima donasi ZEC privat sebagai organisasi nirlaba AS

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Menengah - 10 menit
</span>

> Halaman ini berisi informasi umum, bukan nasihat hukum atau pajak. Aturan pajak AS berubah, jadi periksa setiap langkah dengan akuntan atau penasihat pajakmu. Setiap aturan di bawah ini tertaut ke sumber IRS-nya, diperiksa pada Oktober 2026 berdasarkan Publication 526 (untuk pengembalian pajak 2025) dan Form 8283 (revisi Desember 2025). FAQ mata uang virtual IRS ditulis untuk transaksi sebelum 2025, jadi periksa panduan terkini.

## TL;DR

- Simpan donasi dalam dompet terlindungi yang dikendalikan organisasi kamu, bukan dompet pribadi anggota staf
- IRS memperlakukan ZEC sebagai properti, sehingga pemberian ZEC merupakan kontribusi nonkas
- Untuk pemberian sebesar $250 atau lebih, kirimkan kepada donor pengakuan tertulis yang menjelaskan ZEC tetapi tidak mencantumkan nilai dolar
- Untuk pemberian di atas $5.000, donor memerlukan penilaian yang memenuhi syarat, dan kamu menandatangani Form 8283 mereka
- Jika kamu menjual ZEC dalam waktu tiga tahun setelah menerimanya dan kamu telah menandatangani Bagian B dari Form 8283 donor, ajukan Form 8282
- Donor yang tetap anonim bagi kamu umumnya tidak dapat mengklaim pengurangan sebesar $250 atau lebih

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Untuk siapa ini?

- Badan amal 501(c)(3) AS, gereja, dan kelompok komunitas yang ingin menerima ZEC
- Bendahara, pemegang buku, dan anggota dewan yang menyiapkan pemberian crypto
- Donor yang ingin mengetahui apa yang diperlukan organisasi nirlaba dari mereka

Untuk individu dan kreator, lihat [Menerima Donasi Secara Privat](/zcash-use-cases/receive-donations-privately).

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Masalahnya

Sebagian besar layanan donasi crypto untuk badan amal AS memberi kamu alamat transparan, atau mengonversikan pemberian untuk kamu melalui alamat tersebut. Pada alamat transparan, siapa pun dapat melihat setiap pemberian, jumlahnya, dan saldo kamu. Donor yang sengaja memberi secara privat kehilangan privasi itu saat pemberian tersebut masuk.

Organisasi nirlaba juga memiliki administrasi yang tidak dimiliki individu: tanda terima donor, formulir IRS untuk pemberian yang lebih besar, dan pengembalian tahunan. Privasi dan administrasi tersebut dapat berjalan bersama, selama kamu merencanakannya sebelum pemberian pertama tiba.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> Apa yang tetap privat, dan apa yang tidak

| | Pemberian terlindungi ke alamat terlindungi kamu |
|---|---|
| Publik | Tidak dapat melihat donor, alamat kamu, atau jumlahnya |
| Organisasi kamu | Melihat jumlah dan memo; melihat donor hanya jika mereka memberi tahu kamu |
| Akuntan kamu | Melihat apa yang kamu bagikan, misalnya dengan [viewing key](/zcash-tech/viewing-keys) |
| Saat kamu menjual | Jika exchange kamu hanya menerima setoran transparan, jumlah yang kamu pindahkan keluar dari pool terlindungi menjadi publik (lihat [turnstile](/zcash-tech/the-turnstile)) |

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Yang kamu perlukan

- Kebijakan penerimaan pemberian, yang disetujui dewan kamu, yang mencakup cryptocurrency
- Sebuah [dompet](/using-zcash/wallets) dengan alamat terlindungi, yang dikendalikan oleh organisasi
- Akun exchange atas nama organisasi, jika kamu berencana mengonversi ZEC menjadi dolar
- Akuntan yang telah menangani pemberian nonkas

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Panduan langkah demi langkah

### Langkah 1: Tentukan kebijakan kamu

Tuliskan, dan minta dewan kamu menyetujui:
- Siapa yang dapat memindahkan dana, dan apakah dua orang harus menyetujui setiap pemindahan
- Apakah kamu menjual setiap pemberian segera atau menyimpan sebagian ZEC
- Apakah kamu menerima pemberian anonim, dan hingga jumlah berapa

### Langkah 2: Siapkan dompet yang dikendalikan organisasi

- Buat dompet pada perangkat organisasi, bukan ponsel pribadi
- Simpan frasa pemulihan secara offline, bersama dua pejabat yang masing-masing dapat mengaksesnya
- Untuk kendali bersama, lihat [Menjalankan Treasury Komunitas Privat](/zcash-use-cases/private-community-treasury)

### Langkah 3: Publikasikan alamat terlindungi

- Bagikan alamat khusus terlindungi di halaman donasi kamu. Sebuah [alamat terpadu](/using-zcash/unified-addresses) dimulai dengan `u1`, tetapi alamat tersebut juga dapat berisi penerima transparan, dan pemberian dari dompet khusus transparan kemudian masuk secara publik. Gunakan alamat khusus terlindungi dari dompet kamu jika tersedia.
- Jangan publikasikan alamat transparan (dimulai dengan `t1` atau `t3`)
- Minta donor yang menginginkan tanda terima untuk mencantumkan email mereka dalam [memo](/using-zcash/memos). Memo dienkripsi, sehingga hanya organisasi kamu yang dapat membacanya.

### Langkah 4: Catat setiap pemberian

Untuk setiap pemberian, catat:
- Tanggal dan waktu diterima
- Jumlah dalam ZEC
- Nilai dalam dolar AS pada saat itu, serta sumber harga yang kamu gunakan
- ID transaksi dan memo

IRS memperlakukan ZEC sebagai properti ([Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)), sehingga ini merupakan kontribusi nonkas dalam pembukuan kamu. Untuk memberi akuntan kamu akses hanya-baca, lihat [Menyimpan catatan dengan ZEC terlindungi](/zcash-use-cases/keeping-records-with-shielded-zec).

### Langkah 5: Akui pemberian sebesar $250 atau lebih

Donor tidak dapat mengurangi satu pemberian sebesar $250 atau lebih tanpa pengakuan tertulis dari kamu ([Publication 1771](https://www.irs.gov/pub/irs-pdf/p1771.pdf)). Untuk pemberian ZEC, sertakan:
- Nama organisasi kamu
- Tanggal kamu menerimanya
- Deskripsi pemberian, misalnya "1,5 ZEC". Jangan cantumkan nilai dolar: menilai pemberian adalah tugas donor.
- Apakah kamu memberikan sesuatu sebagai imbalan, misalnya "Tidak ada barang atau jasa yang diberikan sebagai imbalan atas kontribusi ini."

Donor harus memilikinya sebelum mengajukan pengembalian pajak mereka ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf)). Organisasi biasanya mengirimkannya paling lambat 31 Januari tahun berikutnya; mengirimkannya segera adalah yang paling sederhana.

### Langkah 6: Tandatangani Form 8283 untuk pemberian di atas $5.000

Jika donor mengklaim lebih dari $5.000, mereka memerlukan penilaian yang memenuhi syarat. Crypto tidak dianggap sebagai sekuritas yang diperdagangkan secara publik, sehingga penilaian berlaku untuknya ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf), [CCA 202302012](https://www.irs.gov/pub/irs-wd/202302012.pdf)). Donor membawa [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf) kepada kamu, dan kamu menandatangani bagian penerima donasi pada Bagian B. Tanda tangan kamu mengonfirmasi bahwa kamu menerima ZEC pada tanggal tersebut; tanda tangan itu tidak mengonfirmasi nilai dari donor ([FAQ IRS, Q36](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

### Langkah 7: Konversikan ke dolar, jika perlu

- Periksa exchange mana yang menerima setoran terlindungi di [Exchange Kustodial](/using-zcash/custodial-exchanges). Banyak yang hanya menerima setoran transparan.
- Jika exchange kamu hanya transparan, pindahkan ZEC dari dompet terlindungi kamu ke exchange dalam satu langkah, pada saat kamu menjualnya. Jumlah tersebut menjadi publik, tetapi pemberian lain dan saldo kamu tetap privat.
- Jika kamu menjual ZEC dalam waktu tiga tahun setelah menerimanya, dan kamu telah menandatangani Bagian B dari Form 8283 donor, ajukan [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf) dalam 125 hari setelah penjualan dan kirimkan salinannya kepada donor ([FAQ IRS, Q37](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

### Langkah 8: Laporkan pada pengembalian tahunan kamu

Laporkan pemberian ZEC sebagai kontribusi nonkas pada pengembalian Form 990-series kamu, dengan [Schedule M](https://www.irs.gov/forms-pubs/about-schedule-m-form-990) jika berlaku bagi kamu. Tanyakan kepada akuntan kamu bagaimana mencantumkan pemberian anonim.

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Donor anonim: apa yang dapat dan tidak dapat mereka klaim

- Privasi dari publik tidak sama dengan anonimitas dari kamu. Donor dapat memberi secara privat dan tetap membagikan email mereka dalam memo untuk mendapatkan tanda terima.
- Donor yang tetap anonim bagi kamu tidak dapat memperoleh pengakuan, sehingga mereka tidak dapat mengurangi satu pemberian sebesar $250 atau lebih.
- Di atas $5.000, donor juga memerlukan penilaian dan tanda tangan kamu pada Form 8283, yang berarti memberi tahu kamu siapa mereka.
- Bagi donor, pemberian ZEC yang disimpan lebih dari setahun umumnya dapat dikurangkan sebesar nilai pasar wajar, tanpa pajak capital gain atas pemberian tersebut ([FAQ IRS, Q34–Q35](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

Sampaikan hal ini di halaman donasi kamu, agar donor dapat memilih sebelum memberi.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Kesalahan umum yang perlu dihindari

- Menyimpan pemberian dalam dompet pribadi anggota staf
- Mempublikasikan alamat transparan, atau alamat setoran exchange, sebagai alamat donasi kamu
- Mencantumkan nilai dolar dalam pengakuan
- Menjual dalam waktu tiga tahun dan melupakan Form 8282
- Menjanjikan pengurangan pajak kepada donor anonim

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Hasil

Kamu dapat:
- Menerima ZEC tanpa mengungkapkan donor atau saldo kamu
- Memberi donor administrasi yang mereka perlukan untuk mengklaim pengurangan
- Menyimpan catatan yang dapat diperiksa oleh akuntan dan auditor kamu

<br/>

## Sumber

- [IRS: Pertanyaan yang sering diajukan tentang transaksi mata uang virtual](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions) (Q34–Q37 membahas badan amal)
- [IRS Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)
- [IRS Publication 1771: Kontribusi amal, pembuktian, dan pengungkapan](https://www.irs.gov/pub/irs-pdf/p1771.pdf)
- [IRS Publication 526: Kontribusi amal](https://www.irs.gov/pub/irs-pdf/p526.pdf)
- [IRS Publication 561: Menentukan nilai properti yang didonasikan](https://www.irs.gov/pub/irs-pdf/p561.pdf)
- [IRS Chief Counsel Advice 202302012: Penilaian untuk pemberian crypto](https://www.irs.gov/pub/irs-wd/202302012.pdf)
- [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf) dan [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf)

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Terkait

- [Menerima Donasi Secara Privat](/zcash-use-cases/receive-donations-privately) - gagasan yang sama untuk individu
- [Menyimpan catatan dengan ZEC terlindungi](/zcash-use-cases/keeping-records-with-shielded-zec) - memo dan viewing key untuk pembukuan kamu
- [Viewing Keys](/zcash-tech/viewing-keys) - akses hanya-baca untuk akuntan atau auditor
- [Turnstile](/zcash-tech/the-turnstile) - apa yang menjadi publik ketika ZEC meninggalkan pool terlindungi

<br/>

## Langkah berikutnya

- [Menjalankan Treasury Komunitas Privat](/zcash-use-cases/private-community-treasury)

<br/>
