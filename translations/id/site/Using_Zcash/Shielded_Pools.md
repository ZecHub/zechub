<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Pool Nilai 

## Ringkasan singkat

- Zcash saat ini memiliki **5 value pool**: Sprout (legacy), Sapling, Orchard (hanya spend), Ironwood, dan Transparan.
- **Ironwood** adalah primary shielded pool saat ini, aktif sejak peningkatan NU6.3 pada 28 Juli 2026.
- **Orchard** sekarang bersifat **hanya spend**: tidak ada nilai baru yang dapat masuk ke dalamnya, dan dana yang ada bermigrasi keluar ke Ironwood.
- **Sapling** (z-addresses yang dimulai dengan `zs`) tetap didukung secara luas dan terus mengamankan sejumlah besar ZEC terlindungi.
- Alamat **Transparan** (t...) tidak memberikan privasi transaksi dan beroperasi secara serupa dengan Bitcoin.
- **Sprout** adalah shielded pool legacy yang telah dipensiunkan dari penggunaan aktif.
- Migrasi Orchard ke Ironwood sedang **berlangsung** dan diaudit secara publik oleh turnstile.
- Untuk jaminan privasi terkuat, pengguna harus tetap mengutamakan transaksi **shielded-to-shielded (z → z)** kapan pun memungkinkan.


<br/>

## Memahami Pool Nilai Zcash

Zcash memisahkan dana ke dalam sistem akuntansi berbeda yang dikenal sebagai value pool. Setiap pool memiliki aturan kriptografi dan properti privasi tersendiri, sementara protokol melacak total nilai yang bergerak di antara mereka.

Hari ini, jaringan ini memiliki lima pool nilai utama:

- Transparan — Publik dan sepenuhnya terlihat di on-chain.
- Sapling — Pool terlindungi modern pertama yang diadopsi secara luas, masih aktif.
- Orchard — Pool terlindungi utama sebelumnya, sekarang hanya untuk pengeluaran (spend-only).
- Ironwood — Pool terlindungi utama saat ini, diperkenalkan oleh NU6.3.
- Sprout — Pool terlindungi asli yang diluncurkan bersama Zcash pada tahun 2016.
  


Seiring berkembangnya Zcash, pool terlindungi baru mungkin akan diperkenalkan untuk meningkatkan keamanan, privasi, kegunaan, dan auditabilitas sambil tetap menjaga kompatibilitas dengan dana yang sudah ada.

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)Gambar 1: Sebuah bagan yang menunjukkan tiga pool terlindungi (Sprout, Sapling dan Orchard) hingga 29 Oktober 2025, sebelum Ironwood diaktifkan

<br/>

## Pool Terlindungi 


1. <h3 id="ironwood" class="text-3xl font-bold my-4">Pool Ironwood</h3>

Ironwood adalah pool terlindungi utama saat ini. Ini diaktifkan pada 28 Juli 2026 pada blok 3,428,143 sebagai bagian dari peningkatan jaringan NU6.3, dan merupakan tempat nilai terlindungi baru berada sekarang.

Ini ada karena sebuah kerentanan ditemukan dalam sistem proving Orchard pada Mei 2026. Tidak ada bukti bahwa hal tersebut pernah dieksploitasi, tetapi celah tersebut menyebabkan pasokan terlindungi tidak dapat dibuktikan keabsahannya hanya melalui proof saja. Alih-alih melakukan patch di tempat, jaringan membuat pool baru dengan circuit yang telah diperbaiki dan memindahkan nilai melalui sebuah turnstile yang menghitung setiap koin secara publik. Pencatatan itulah yang memulihkan jaminan bahwa pasokan terlindungi sepenuhnya didukung.

Ironwood menggunakan kembali model Action dari Orchard dan 2 proof dari Halo, sehingga perilakunya sama dari hari ke hari. Ada dua hal baru: transaksi menggunakan format v6, dan catatan Ironwood bersifat **quantum-recoverable** berdasarkan [ZIP 2005](https://zips.z.cash/zip-2005), yang berarti catatan on-chain sebuah koin tetap dapat dipulihkan jika komputer kuantum di masa depan berhasil memecahkan kriptografi saat ini. Ini adalah jalur pemulihan, bukan ketahanan kuantum (quantum resistance), dan hal ini tidak berlaku untuk pool yang lebih lama.

Kamu tidak memerlukan alamat baru. Alamat terpadu menggabungkan beberapa penerima, dan dompet akan memilih pool yang tepat untukmu.

____

2. <h3 id="orchard" class="text-3xl font-bold my-4">Pool Orchard</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)Gambar 2: Sebuah grafik yang menunjukkan pool Orchard hingga 29 Oktober 2025, sebelum Ironwood diaktifkan

<br/>

Pool terlindungi Orchard diaktifkan pada 31 Mei 2022 sebagai bagian dari peningkatan jaringan NU5. Orchard memperkenalkan protokol terlindungi baru yang menghilangkan kebutuhan akan trusted setup dan menjadi pool terlindungi utama yang digunakan oleh Unified Addresses (UAs).

Orchard secara signifikan meningkatkan kegunaan, efisiensi, dan privasi dengan mengurangi kebocoran metadata transaksi dan memperkenalkan model transaksi yang lebih fleksibel berdasarkan Action alih-alih input dan output terlindungi tradisional.

Sejak peningkatan Ironwood diaktifkan pada 28 Juli 2026, **Orchard hanya dapat digunakan untuk pengeluaran**. Tidak ada nilai baru yang dapat masuk ke dalam pool. Dana yang sudah ada di sana masih dapat dibelanjakan, dan sedang bermigrasi keluar menuju Ironwood melalui turnstile. Dompet akan menangani ini untuk kamu, meskipun sebagian besar memberikan kamu kendali atas kecepatannya.

Jika kamu menyimpan dana Orchard, lihat [Ironwood](/zcash-tech/ironwood) untuk memahami apa arti migrasi ini dalam praktiknya.

____

3. <h3 id="sapling" class="text-3xl font-bold my-4">Pool Sapling</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)Gambar 3: Sebuah grafik yang menunjukkan pool Sapling hingga 29 Oktober 2025, sebelum Ironwood diaktifkan

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) adalah sebuah peningkatan pada protokol Zcash yang diperkenalkan pada tanggal 28 Oktober 2018. Ini merupakan peningkatan besar dari versi sebelumnya yang dikenal sebagai Sprout yang memiliki beberapa keterbatasan dalam hal privasi, efisiensi, dan kegunaan. 

Beberapa peningkatan tersebut mencakup performa yang lebih baik untuk alamat terlindungi, viewing key yang ditingkatkan agar memungkinkan pengguna melihat transaksi masuk dan keluar tanpa mengekspos private key kamu, serta kunci zero-knowledge independen untuk hardware wallet selama penandatanganan transaksi. 

Zcash Sapling memungkinkan pengguna untuk melakukan transaksi privat hanya dalam beberapa detik jika dibandingkan dengan durasi yang lebih lama pada Seri Sprout. 

Penyelubungan transaksi meningkatkan privasi, sehingga mustahil bagi pihak ketiga untuk menghubungkan transaksi dan menentukan jumlah ZEC yang sedang ditransfer. Sapling juga meningkatkan kegunaan dengan mengurangi persyaratan komputasi untuk menghasilkan transaksi privat agar lebih mudah diakses oleh pengguna.

Alamat dompet Sapling dimulai dengan "zs" dan ini dapat diamati di semua Zcash Shielded Wallet (Zkool, Zingo Wallet, Nighthawk, dll.) yang memiliki alamat Sapling bawaan. Zcash Sapling mewakili perkembangan signifikan dalam teknologi terkait privasi dan efisiensi transaksi yang menjadikan Zcash cryptocurrency yang praktis dan efektif bagi pengguna yang menghargai privasi dan keamanan.

____

4. <h3 id="sprout" class="text-3xl font-bold my-4">Pool Sprout</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)Gambar 4: Sebuah grafik yang menunjukkan pool Sprout hingga 29 Oktober 2025, sebelum Ironwood diaktifkan

Sprout adalah protokol privasi zero-knowledge tanpa izin terbuka pertama yang pernah diluncurkan. Protokol ini diluncurkan pada tanggal 28 Oktober 2016.

Alamat Sprout diidentifikasi melalui dua huruf pertamanya yang selalu berupa "zc". Alamat ini dinamakan "Sprout" dengan tujuan utama untuk menekankan bahwa software tersebut adalah blockchain muda yang sedang berkembang dengan potensi besar untuk tumbuh dan terbuka untuk pengembangan. 

Sprout digunakan sebagai alat awal untuk [Zcash penambangan yang dimulai secara lambat ](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) yang menghasilkan distribusi ZEC dan hadiah Block bagi para penambang. 

Seiring dengan ekosistem Zcash yang terus berkembang dengan meningkatnya jumlah transaksi terlindungi, terpantau bahwa Sprout Seri Zcash menjadi terbatas dan kurang efisien dalam hal privasi pengguna, skalabilitas transaksi, dan pemrosesan. Hal ini menyebabkan modifikasi jaringan dan Peningkatan Sapling. 

---
5. <h3 id="transparent" class="text-3xl font-bold my-4">Pool Transparan</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)Gambar 5: Sebuah grafik yang menunjukkan pool transparan hingga 29 Oktober 2025, sebelum Ironwood diaktifkan

<br/>

Pool transparan Zcash tidak terlindungi dan tidak privat. Alamat dompet transparan pada Zcash dimulai dengan huruf "t", privasi sangat rendah saat menggunakan tipe alamat ini untuk transaksi.

Transaksi transparan di Zcash mirip dengan transaksi Bitcoin yang mendukung transaksi multi-signature dan menggunakan alamat publik standar.

Alamat transparan Zcash sebagian besar digunakan oleh exchange terpusat untuk memastikan adanya transparansi yang tinggi dan konfirmasi jaringan saat mengirim dan menerima ZEC antar pengguna.

Penting juga untuk dicatat bahwa meskipun alamat terlindungi Zcash memberikan privasi tinggi selama transaksi, alamat tersebut juga memerlukan lebih banyak sumber daya komputasi untuk memproses transaksi. Oleh karena itu, beberapa pengguna mungkin menggunakan alamat transparan untuk transaksi yang tidak memerlukan tingkat privasi yang sama.

<br/>

## Praktik Terbaik yang Direkomendasikan untuk Transfer Pool

Dalam hal mempertimbangkan tingkat privasi yang tinggi saat melakukan transaksi di Jaringan Zcash, kamu disarankan untuk mengikuti praktik-praktik di bawah ini;

Transaksi yang terjadi di antara dompet "z to z" pada blockchain Zcash sebagian besar bersifat terlindungi dan terkadang disebut sebagai Transaksi Privat karena tingkat privasi tinggi yang dihasilkan. Ini biasanya merupakan cara terbaik dan yang paling direkomendasikan untuk mengirim dan menerima $ZEC ketika privasi diperlukan. 

---

Saat kamu mengirim ZEC dari "alamat Z" ke "alamat T", hal ini secara sederhana menandakan bentuk transaksi Deshielding. Dalam jenis transaksi ini, tingkat privasi tidak selalu tinggi karena beberapa informasi akan terlihat di blockchain akibat efek pengiriman ZEC ke Alamat Transparan. Transaksi Deshielding tidak selalu direkomendasikan ketika privasi tinggi diperlukan. 

---

Mentransfer ZEC dari Alamat Transparan (T-address) ke Z-address secara sederhana dikenal sebagai Shielding. Dalam jenis transaksi ini, tingkat privasi tidak selalu tinggi jika dibandingkan dengan transaksi z-z, namun cara ini juga direkomendasikan saat privasi diperlukan. 

---

Mengirim ZEC dari Alamat Transparan (alamat T) ke Alamat Transparan (alamat T) lainnya di Jaringan Zcash (transaksi T-T) sangat mirip dengan transaksi Bitcoin dan inilah sebabnya transaksi T-T di Zcash selalu disebut sebagai transaksi Publik karena detail transaksi pengirim maupun penerima menjadi terlihat oleh publik, yang membuat tingkat Privasi menjadi sangat rendah dalam transaksi tersebut. 

Sebagian besar exchange kripto terpusat menggunakan Alamat Transparan ("T-address") saat melakukan transaksi pada blockchain Zcash, namun jenis transaksi ini (T-T) tidak akan memiliki properti privasi apa pun.

<br/>

## Migrasi Orchard ke Ironwood

Migrasi sedang berlangsung saat ini. Orchard telah disegel untuk deposit baru, dan nilai yang masih tersimpan di sana sedang dipindahkan ke Ironwood satu per satu melalui transaksi. Kamu dapat memantau totalnya di [ironwood.live](https://ironwood.live/).

Apa artinya ini bergantung pada di mana dana kamu berada:

1. **Aktivitas terlindungi baru** masuk ke Ironwood secara otomatis. Tidak ada yang perlu dilakukan.
2. **Dana Orchard yang sudah ada** perlu bermigrasi. Dompet yang dikelola (maintained wallets) akan melakukan ini untuk kamu, biasanya dalam beberapa tahap daripada sekaligus.
3. **Sapling tidak terpengaruh** dan tetap menerima dana. Hanya Orchard yang disegel.
4. **Turnstile menghitung semua hal** yang melintasi antar pool, yang mana inilah yang membuktikan tidak ada koin yang diciptakan di tengah jalan.

> **Satu peringatan privasi yang perlu kamu ketahui.** turnstile mempublikasikan *jumlah* yang berpindah antar pool, bersama dengan tinggi blok. Pengirim dan penerima tetap tersembunyi seperti biasa, tetapi jumlah yang khas dapat ditelusuri kembali ke kamu. Inilah sebabnya mengapa dompet melakukan migrasi secara bertahap menggunakan denominasi standar alih-alih memindahkan saldo kamu dalam satu jumlah besar yang mudah dikenali. Biarkan dompet kamu mengatur kecepatannya sendiri, dan pertimbangkan untuk menggunakan Tor atau VPN agar IP kamu tidak terhubung dengan jumlah yang kamu pindahkan.

Lihat [Ironwood](/zcash-tech/ironwood) untuk peningkatan itu sendiri, dan [The Turnstile](/zcash-tech/the-turnstile) untuk cara kerja akuntansinya.

<br/>

## Kesalahan Umum yang Harus Dihindari

- **Mengirim dari alamat t ke alamat t** — sepenuhnya publik, tidak ada privasi. Selalu lakukan shielding dana terlebih dahulu.
- **Mengasumsikan Orchard masih menerima dana** — ini hanya bisa digunakan untuk pengeluaran (spend-only) sejak 28 Juli 2026. Nilai dapat keluar, tetapi tidak ada yang baru masuk
- **Membingungkan antara alamat Sapling dan Unified** — alamat Sapling dimulai dengan `zs`. Alamat Unified dimulai dengan `u1` dan menggabungkan beberapa penerima, sehingga pool tempat pembayaran kamu mendarat bergantung pada penerima mana yang dibawa oleh alamat tersebut
- **Meninggalkan dana di dalam pool Sprout** — Sprout telah didepresiasi selama bertahun-tahun; pindahkan dana tersebut keluar
- **Mengharapkan migrasi terjadi secara sepenuhnya tidak terlihat** — jumlah yang melewati turnstile bersifat publik, meskipun pengirim dan penerima tidak
- **Mengasumsikan t → z (shielding) sepenuhnya privat** — tindakan shielding itu sendiri terlihat di on-chain; isinya tidak

---

## Halaman Terkait

- [Ironwood](/zcash-tech/ironwood) — Peningkatan jaringan yang menciptakan pool saat ini
- [The Turnstile](/zcash-tech/the-turnstile) — Bagaimana nilai yang berpindah antar pool diaudit
- [Dompet](/using-zcash/wallets) — Dompet mana saja yang dikelola dan Ironwood siap digunakan
- [Transaksi](/using-zcash/transactions) — Cara mengirim transaksi terlindungi
- [Membeli ZEC](/using-zcash/buying-zec) — Mendapatkan ZEC sebelum menggunakannya di dalam pool
- [zk-SNARKs](/zcash-tech/zk-snarks) — Fondasi kriptografi dari pool terlindungi
- [Apa itu ZEC dan Zcash](/start-here/what-is-zec-and-zcash) — Latar belakang tentang privasi Zcash
