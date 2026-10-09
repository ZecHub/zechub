# Turnstile

## Ringkasan Singkat

- Turnstile adalah aturan akuntansi publik yang melacak seberapa banyak nilai yang masuk dan keluar dari setiap pool terlindungi
- Ini memungkinkan siapa pun untuk memverifikasi bahwa sebuah pool tidak pernah membayar lebih banyak daripada yang dimasukkan ke dalamnya, meskipun transaksi di dalamnya bersifat privat
- Hal ini melindungi pasokan ZEC dari bug tersembunyi, karena koin palsu tidak dapat meninggalkan sebuah pool tanpa merusak perhitungan
- Ini bekerja tanpa memperlemah privasi, karena hanya total pool yang bersifat publik, bukan transaksi individual
- Turnstile adalah alasan mengapa migrasi Orchard ke Ironwood dapat membuktikan bahwa pasokan terlindungi dalam kondisi baik

<br/>

## Untuk siapa ini ditujukan

- Siapa pun yang ingin memahami bagaimana Zcash menjaga pasokan pribadinya agar tetap tepercaya
- Pengguna yang mengikuti migrasi Orchard ke Ironwood dan bertanya-tanya bagaimana cara membuktikan bahwa pasokannya nyata
- Pendatang baru yang penasaran bagaimana sistem uang pribadi masih dapat diaudit

<br/>

## Tantangannya

Zcash terlindungi menyembunyikan jumlah, pengirim, dan penerima. Privasi tersebut adalah intinya. Namun hal ini menimbulkan pertanyaan sulit: jika tidak ada yang dapat melihat ke dalam pool terlindungi, bagaimana semua orang tahu bahwa jumlah total ZEC sudah benar? Bagaimana Anda mengaudit uang yang tidak dapat Anda lihat?

Jika sebuah bug memungkinkan seseorang untuk memalsukan koin di dalam pool terlindungi, pemalsuan tersebut akan tersembunyi oleh privasi yang sama yang melindungi pengguna jujur. Tanpa adanya pengaman, ketidakpastian tersebut akan merusak kepercayaan terhadap seluruh suplai. Turnstile adalah pengaman yang menyelesaikan masalah ini.

<br/>

## Apa itu turnstile

Bayangkan setiap pool terlindungi sebagai sebuah ruangan dengan satu pintu masuk yang terhitung. Setiap kali nilai masuk ke dalam pool dari luar, atau keluar darinya untuk pergi ke tempat lain, nilai tersebut melewati pintu dan dicatat secara publik. Transaksi di dalam ruangan tetap privat, tetapi total kumulatif pada pintu tersebut dapat dilihat oleh semua orang.

Aturannya sederhana: sebuah pool tidak boleh membiarkan nilai yang keluar lebih besar daripada nilai yang masuk. Node menolak setiap blok yang akan mendorong saldo sebuah pool menjadi di bawah nol. Jumlah yang diyakini berada di dalam sebuah pool diketahui setiap saat, karena jumlah tersebut hanyalah total yang masuk dikurangi total yang keluar. Perhitungan publik ini adalah turnstile.

<br/>

## Cara kerjanya

Zcash memiliki beberapa pool terlindungi sepanjang sejarahnya, seperti Sprout, Sapling, dan Orchard. Nilai berpindah antara chain transparan dan pool ini, dan terkadang di antara pool itu sendiri. Turnstile memantau pergerakan tersebut:

1. Saat ZEC berpindah ke dalam pool terlindungi, jumlah tersebut ditambahkan ke saldo publik pool tersebut
2. Saat ZEC keluar dari sebuah pool, jumlah tersebut dikurangi
3. Jaringan menolak setiap blok yang akan membuat saldo pool menjadi negatif, yang berarti lebih banyak jumlah yang keluar daripada yang pernah masuk
4. Transaksi terlindungi secara individual tetap sepenuhnya privat, hanya total pool yang bersifat publik

Jaringan melacak saldo untuk setiap value pool dengan cara ini, termasuk Sprout, Sapling, Orchard, pool Ironwood yang baru, serta saldo transparan dan lockbox. Karena hal ini, meskipun isi pasti dari sebuah pool disembunyikan, jumlah maksimum yang dapat keluar dibatasi oleh apa yang masuk. Tidak ada inflasi tersembunyi yang dapat lolos ke dalam sirkulasi.

<br/>

## Bagaimana saldo nilai diperiksa

Perhitungan di pintu masuk hanya dapat dipercaya karena setiap transaksi dipakally untuk membuktikan bahwa ia memindahkan jumlah yang benar, meskipun jumlah itu sendiri tetap tersembunyi. Setiap transaksi terlindungi menerbitkan satu angka jujur: nilai bersih yang dipindahkannya ke dalam atau ke luar pool, yang disebut sebagai saldo nilainya. Saldo nilai positif berarti dana keluar dari pool ke sisi transparan, sedangkan saldo nilai negatif berarti dana masuk. Detail privat tetap tersegel, tetapi satu angka bersih ini bersifat publik, dan inilah yang dijumlahkan oleh turnstile.

Bagian cerdasnya adalah bagaimana sebuah transaksi membuktikan bahwa angka publik tersebut jujur tanpa mengungkapkan jumlah privat di baliknya. Mekanismenya berbeda berdasarkan pool, dan inilah mesin sebenarnya dari turnstile.

Dalam pool Sprout yang asli, setiap transaksi menggunakan JoinSplit. Sebuah JoinSplit menghabiskan dua note tersembunyi dan membuat dua note baru, serta membawa dua field publik: vpub_old, nilai yang masuk ke pool terlindungi dari sisi transparan, dan vemb_new, nilai yang keluar dari pool kembali ke sisi transparan. Setiap JoinSplit harus seimbang dengan sendirinya, dan zero-knowledge proof miliknya menjamin bahwa input tersembunyi dan output tersembunyi dijumlahkan dengan benar. Saldo pool Sprout hanyalah total berjalan dari semua vpub_old dikurangi semua vpub_new di seluruh chain. Inilah sebabnya mengapa Sprout menjadi contoh yang berguna nantinya: karena vpub_old adalah satu-satunya cara nilai dapat masuk ke pool, satu aturan tunggal yang menonaktifkannya dapat menutup pool untuk selamanya.

Dalam Sapling, Orchard, dan Ironwood, saldo dibuktikan dengan cara yang lebih cerdas, menggunakan binding signature. Alih-alih setiap transfer menyeimbangkan dirinya sendiri, seluruh transaksi berkomitmen pada setiap jumlah tersembunyi menggunakan value commitment. Value commitment adalah amplop tersegel untuk sebuah angka, yang dibangun dengan homomorphic Pedersen commitment, yang memiliki properti khusus: amplop tersebut dapat dijumlahkan dan dikurangi tanpa perlu membukanya. Jaringan menjumlahkan semua input commitment, mengurangi semua output commitment, dan membandingkan hasilnya dengan satu angka neto yang dinyatakan dalam transaksi, yaitu field valueBalance miliknya. Hanya transaksi yang jumlah tersembunyinya benar-laman sesuai dengan valueBalance publik tersebut yang dapat menghasilkan binding signature yang valid atas gabungan commitment tersebut. Jika seseorang mencoba memindahkan nilai lebih banyak daripada yang mereka nyatakan, commitment tidak akan seimbang, binding signature tidak akan terverifikasi, dan transaksi akan ditolak. Ironwood menggunakan protokol Orchard yang sama, sehingga cara kerjanya pun sama.

Hal ini juga yang membuat transfer lintas pool aman untuk diperiksa. Ketika dana berpindah dari satu pool terlindungi ke pool lainnya, misalnya dari Orchard ke dalam Ironwood, transaksi tersebut tidak dapat menyembunyikan jumlahnya dari akuntansi. Setiap pool memiliki saldo nilai tersendiri yang harus dipenuhi oleh proof miliknya sendiri: sisi Orchard harus menunjukkan aliran keluar yang sesuai melalui tanda tangan pengikatnya, dan sisi Ironwood harus menunjukkan aliran masuk yang sesuai melalui proof miliknya sendiri. Nilai yang meninggalkan satu pool dan nilai yang memasuki pool lainnya masing-masing dibuktikan secara independen, sehingga perpindahan lintas pool sebenarnya adalah dua penyeberangan turnstile yang terjadi dalam satu transaksi, satu keluar, satu masuk, dan keduanya dicatat secara publik meskipun jumlah dasarnya tetap privat.

Jadi, turnstile tidak bersifat berbasis kepercayaan. Setiap transaksi membuktikan efek bersihnya sendiri secara matematis, jaringan menjumlahkan efek bersih yang telah terbukti tersebut per pool, dan aturan konsensus (ZIP 209) menolak setiap blok yang akan membuat saldo sebuah pool menjadi negatif. Proof pada level transaksi, penegakan pada level chain.

<br/>

## Mengapa ini penting

Turnstile memberikan tiga hal sekaligus kepada Zcash.

Pertama, ini melakukan kompartementalisasi risiko. Bug kriptografis pada satu pool akan terisolasi di dalam pool tersebut, karena turnstile mencegah nilai palsu menyeberang ke pasokan yang lebih luas.

Kedua, hal ini memungkinkan komunitas untuk memverifikasi pasokan secara retrospektif. Jika sebuah bug ditemukan di kemudian hari, catatan turnstile akan menunjukkan apakah ada nilai yang keluar dari sebuah pool lebih banyak daripada yang masuk ke dalamnya. Catatan yang bersih merupakan bukti kuat bahwa tidak ada pemalsuan yang dieksploitasi.

Ketiga, hal ini menjaga privasi saat melakukan semua ini. Hanya total pada tingkat pool yang bersifat publik. Transaksi individu Anda tetap terlindungi. Auditabilitas dan privasi dapat berdampingan, sebuah hal yang tidak biasa dan merupakan salah satu kekuatan tersembunyi dari Zcash.

<br/>

## Cara kerja turnstile

Turnstile bukanlah hal baru, dan telah digunakan pada momen-momen penting dalam sejarah Zcash.

Ketika Zcash berpindah dari Sprout pool yang asli menuju Sapling pool yang lebih baru, turnstile menjaga transisi tersebut. Sprout pool kemudian dibatasi sehingga tidak dapat menerima aliran masuk baru, yang mendorong pengguna untuk bermigrasi sementara turnstile menjaga akuntansi tetap jujur. Bertahun-tahun kemudian, fakta bahwa tidak ada nilai yang pernah keluar dari Sprout secara tidak semestinya menjadi bukti bahwa kriptografi awalnya tidak pernah berhasil dieksploitasi.

Desain yang sama kini menjaga perpindahan dari Orchard ke Ironwood. Pada tahun 2026, sebuah bug soundness ditemukan dan diperbaiki dalam sistem pembuktian Orchard. Tidak ada bukti bahwa hal tersebut pernah dieksploitasi, namun karena aktivitas terlindungi bersifat privat, kepastian tidak mungkin didapatkan. Responsnya adalah dengan menutup pool Orchard yang lama dan meminta semua orang memigrasikan dana mereka melalui turnstile ke Ironwood, sebuah pool baru yang menggunakan protokol yang telah diperbaiki. Memaksa dana melewati turnstile berarti koin palsu hipotetis apa pun yang tertinggal tidak dapat mengikuti, dan setelah migrasi selesai, siapa pun dapat mengonfirmasi bahwa pasokan terlindungi adalah sound.

<br/>

## Depresiasi one-way pool

Turnstile memungkinkan Anda untuk menghentikan penggunaan pool lama secara aman, hanya dalam satu arah, tanpa pernah merusak jaminan pasokan. Triknya adalah dengan menutup pintu masuk sementara membiarkan pintu keluar tetap terbuka.

Sprout adalah contoh yang paling jelas. Untuk menghentikan penggunaannya, ZIP 211 menambahkan satu aturan konsensus: sejak tinggi aktivasi (activation height) miliknya, field vpub_old dari setiap JoinSplit harus bernilai nol. Karena vpub_old adalah satu-satunya cara nilai dapat masuk ke Sprout, memaksanya menjadi nol berarti tidak ada nilai baru yang dapat masuk lagi, sementara nilai masih dapat mengalir keluar ke sisi transparan atau berlanjut ke Sapling. Pool tersebut menjadi satu arah. Ia hanya dapat berkurang, tidak pernah bertambah. Turnstile terus menghitung sepanjang waktu, sehingga saldo dapat turun saat dana keluar tetapi tidak pernah bisa naik, dan tidak akan pernah menjadi negatif.

Migrasi Orchard ke Ironwood menggunakan ide yang sama. Pada peningkatan NU6.3, pool Orchard ditutup untuk aliran masuk baru, dan dompet diarahkan untuk mengirim dana Orchard melalui turnstile ke dalam pool Ironwood yang baru. Orchard menjadi pool satu arah yang hanya bisa dikosongkan. Karena setiap pengeluaran adalah penyeberangan turnstile yang harus dibuktikan dengan proof, nilai palsu hipotetis apa pun yang tertinggal di Orchard tidak dapat mengikuti dana jujur keluar secara diam-diam. Nilai tersebut terjebak dalam pool yang hanya berkurang dan diawasi di pintu. Seiring waktu, hal ini mendorong pool lama menuju kekosongan dan memungkinkan siapa pun untuk mengonfirmasi bahwa nilai yang keluar tidak pernah lebih besar dari nilai yang masuk secara jujur.

Inilah alasan mendalam mengapa turnstile sangat penting melampaui sekadar akuntansi sederhana. Ini adalah mekanisme yang memungkinkan Zcash untuk menghentikan penggunaan sebuah pool terlindungi, baik untuk mengurangi kompleksitas seperti pada Sprout, atau untuk pulih dari bug yang ditemukan seperti pada Orchard, sambil tetap menjaga jaminan publik, berkelanjutan, dan dapat dibuktikan mengenai pasokan.

<br/>

## Kesalahpahaman umum

- Turnstile tidak mengungkap transaksi Anda. Ia hanya menghitung total pool, bukan siapa yang mengirim apa kepada siapa
- Ia tidak menangkap pemalsu berdasarkan nama. Ia membatasi jumlah yang dapat keluar dari sebuah pool, yang mana inilah yang melindungi pasokan
- Ini bukanlah penemuan baru untuk Ironwood. Ia telah menjaga setiap transisi pool terlindungi utama dalam sejarah Zcash
- Total pool publik tidak memperlemah privasi. Privasi terletak pada transaksi di dalam pool, yang tetap tersembunyi

<br/>

## Sumber Daya

1. [ZIP 209: Melarang Saldo Pool Nilai Rantai di Luar Jangkauan](https://zips.z.cash/zip-0209) - aturan konsensus di balik turnstile
2. [ZIP 211: Menonaktifkan Penambahan Nilai Baru ke Sprout Pool Nilai Rantai](https://zips.z.cash/zip-0211) - bagaimana Sprout pool ditutup untuk deposit baru
3. [ZIP 258: NU6.3](https://zips.z.cash/zip-0258) - peningkatan yang memperkenalkan Ironwood pool dan mengarahkan nilai melalui turnstile
4. [Penegakan Turnstile Terhadap Pemalsuan](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - penjelasan asli dari Electric Coin Company
5. [Zcash Spesifikasi Protokol](https://zips.z.cash/protocol/protocol.pdf) - lihat bagian tentang saldo dan binding signature untuk detail lengkapnya
6. [Pool Nilai, Zebra Buku](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - bagaimana sebuah node melacak saldo nilai setiap pool

<br/>

## Halaman terkait

- [Pool terlindungi](https://zechub.wiki/using-zcash/shielded-pools) - bagaimana Zcash transaksi terlindungi menjaga detail tetap privat
- [Halo](https://zechub.wiki/zcash-tech/halo) - sistem proof di balik Orchard pool
- [Peningkatan Jaringan](https://zechub.wiki/start-here/network-upgrades) - bagaimana Zcash mengaktifkan perubahan seperti pool terlindungi baru
