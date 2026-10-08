<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Non-Custodial_Exchanges.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# <img src="/content-images/ZEC-USD-a2189a84b9.webp" alt="Alt Text" width="50"/>   Exchange Non-Kustodial

[Zcash Exchange Non-Kustodial](/dex)

Dalam dunia perdagangan cryptocurrency yang terus berkembang, exchange non-kustodial, yang juga dikenal sebagai Decentralized Exchanges atau DEX, memungkinkan pengguna untuk berdagang tanpa menyerahkan dana mereka ke akun exchange. Kamu memegang kunci milikmu sendiri, tetapi itu tidak berarti tidak ada pihak lain yang terlibat. Bergantung pada rutenya, sebuah swap dapat melewati situs web atau aplikasi dompet, layanan routing, smart contract, solver, dan bridge.

Exchange yang terdaftar di atas memungkinkan kamu untuk mendapatkan dan memperdagangkan Zcash dari dompet milikmu sendiri. Seberapa privat sebuah swap bergantung pada layanan tersebut, jaringan yang kamu gunakan untuk membayar, dan apakah ZEC kamu berakhir di alamat terlindungi. Bagian di bawah ini akan menjelaskan perbedaannya.

### **Memahami Exchange Non Kustodial**

Exchange non-kustodial, yang juga dikenal sebagai Decentralized Exchanges (DEXs), adalah platform yang memfasilitasi perdagangan cryptocurrency tanpa mengharuskan kamu menyetorkan dana ke dalam exchange itu sendiri. Sebaliknya, pengguna tetap memegang kendali atas private key mereka dan berdagang dari dompet mereka sendiri. Cross-chain swap masih mengandalkan pihak lain untuk memberikan penawaran (quote), rute, dan menyelesaikan transaksi tersebut (lihat di bawah).

Hal ini dapat meningkatkan keamanan, karena kamu tidak bergantung pada exchange untuk menyimpan asetmu, yang mana mengurangi risiko peretasan atau salah kelola. Ini tidak membuat sebuah swap menjadi privat dengan sendirinya. Transaksi pada exchange non-kustodial sering kali menggunakan smart contract, yang bersifat publik, dan layanan yang kamu gunakan masih dapat melihat alamat serta detail koneksi kamu.

Keuntungan utama dari exchange cryptocurrency non-kustodial terletak pada peningkatan kontrol yang mereka berikan kepada pengguna atas aset mereka. Karena exchange ini tidak menyimpan aset tersebut, pengguna menikmati kepemilikan dan otoritas penuh atas mata uang digital mereka.

### **Exchange Non Kustodial vs Exchange Kustodial**

**#1 Keamanan**: exchange non-kustodial menghilangkan kebutuhan untuk menyimpan dana dalam akun exchange terpusat. Pengguna tetap memegang kendali atas private key mereka, sehingga mengurangi risiko peretasan, serangan orang dalam, dan kegagalan platform yang mungkin dialami oleh exchange kustodial. Cross-chain swap masih dapat menahan dana untuk waktu singkat di alamat deposit atau bridge selama transaksi diselesaikan.

**#2 Privasi**: Swap non-kustodial biasanya tidak memerlukan akun exchange, sehingga kamu sering kali bisa melewati proses pendaftaran menggunakan email atau ID. Hal tersebut tidak sama dengan anonimitas. Deposit yang kamu kirim di jaringan sumber (misalnya Solana atau Ethereum) bersifat publik di chain tersebut, dan layanan tersebut masih dapat melihat alamat dompet, alamat IP, serta detail swap milikmu. Privasi pada sisi Zcash bergantung pada ke mana ZEC kamu mendarat (lihat di bawah).

**#3 Desentralisasi**: exchange non-kustodial lebih selaras dengan etos desentralisasi mata uang kripto. Pengguna memiliki otonomi dan kendali yang lebih besar atas aktivitas perdagangan mereka, sejalan dengan prinsip-prinsip teknologi blockchain yang lebih luas.

Dalam hal Exchange Kustodial, tingkat Desentralisasi sering kali sangat minim di sebagian besar exchange terpusat, yang menyebabkan tim atau pejabat exchange mengelola data atau informasi pengguna di dalam exchange tersebut.

**#4 Adaptabilitas terhadap Perubahan Regulasi**: Exchange non-kustodial sering kali lebih adaptabel terhadap perubahan lingkungan regulasi. Karena mereka tidak menyimpan dana pengguna, mereka mungkin memiliki tantangan kepatuhan yang lebih sedikit dibandingkan dengan exchange kustodial.

**#5 Inovasi dan Eksperimentasi**: exchange non-kustodial sering kali mendorong inovasi di ruang kripto. Mereka mendorong pengembangan teknologi terdesentralisasi, seperti automated market makers (AMM) dan aplikasi decentralized finance (DeFi).

**#6 Aksesibilitas Global**: Exchange non-kustodial sering kali menyediakan akses ke mata uang kripto bagi pengguna di seluruh dunia, termasuk wilayah di mana hambatan regulasi mungkin membatasi ketersediaan layanan exchange kustodial.

**#7 Tanpa Persyaratan KYC**: Banyak exchange non-kustodial tidak meminta dokumen identitas di awal. Sebagian besar tetap memeriksa alamat dompet terhadap database kepatuhan, dan sebuah swap dapat ditunda, diblokir, atau ditolak jika ada sesuatu yang ditandai. Periksa ketentuan layanan tersebut sebelum kamu mengandalkannya.

### **Apa yang Dilindungi oleh Zcash dan Apa yang Tidak**

Privasi Zcash berasal dari alamat terlindungi. Saat ZEC berpindah di antara alamat terlindungi, pengirim, penerima, jumlah, dan memo dienkripsi pada rantai Zcash. Lihat [Shielded Pools](/using-zcash/shielded-pools) untuk memahami cara kerjanya.

Sebuah swap memiliki bagian-bagian yang tidak dapat disembunyikan oleh Zcash:

- **Jaringan sumber.** Dana yang kamu kirim dari Solana, Ethereum, atau chain publik lainnya dapat terlihat di chain tersebut, termasuk alamat dan jumlahnya.
- **Alamat penerima.** Beberapa rute swap mengirimkan ZEC ke alamat transparan. Sebagai contoh, Near Intents mencantumkan ZEC hanya didukung untuk [alamat transparan](https://docs.near-intents.org/resources/chain-support). ZEC yang dikirim ke alamat transparan (t1 atau t3) bersifat publik, sangat mirip dengan Bitcoin. Melindunginya setelah itu akan melindungi apa yang kamu lakukan selanjutnya, tetapi transfer masuk dan transaksi shielding tetap terlihat.
- **Layanan.** Aplikasi dan layanan routing apa pun dapat melihat alamat dan jumlah yang kamu berikan kepada mereka, ditambah data koneksi seperti alamat IP kamu.

Kirim ZEC ke dompet yang kamu kendalikan dan buat menjadi terlindungi sebelum digunakan. [Menggunakan ZEC Secara Pribadi](/guides/using-zec-privately) mencakup langkah-langkah selanjutnya.

### **Siapa Saja yang Terlibat dalam sebuah Swap**

Ambil contoh sebuah swap yang dirutekan melalui layanan Near Intents 1Click. Ketentuan [API](https://docs.near-intents.org/security-compliance/terms-of-service) miliknya memperlakukan hal ini sebagai bagian yang terpisah:

- **Antarmuka**: situs web atau dompet yang kamu gunakan. Ini dapat dijalankan oleh Intents Technology atau oleh pihak ketiga dengan ketentuan tersendiri.
- **1Click**: layanan routing dan penyelesaian yang dijalankan oleh Intents Technology Limited. Kamu mengirim dana ke alamat deposit yang dibuat untuk penawaranmu. Dokumentasi menyatakan bahwa 1Click tidak melakukan kustodial, namun ketentuannya mencatat bahwa aset dapat ditahan atau dikunci dalam infrastruktur bridge saat transfer sedang berlangsung.
- **Protokol**: smart contract Near Intents.
- **Solvers**: pihak ketiga independen yang memenuhi penawaran.
- **Bridges**: perpindahan ZEC asli melalui PoA Bridge, yang dioperasikan oleh Intents Technology.

Near Intents juga [memeriksa alur kutipan yang terintegrasi](https://docs.near-intents.org/security-compliance/risk-and-compliance) terhadap beberapa database AML, dan menyatakan bahwa cakupannya bervariasi tergantung pada alur dan integrasi. Berdasarkan ketentuannya, sebuah swap yang ditandai dapat ditunda, diblokir, dibekukan, atau ditolak.

### **Apa yang Kamu Bagikan Selama Swap**

- Alamat ZEC yang menerima swap, dan alamat pengembalian dana pada jaringan sumber.
- Aset dan jumlahnya, serta transaksi deposit yang kamu kirim, yang bersifat publik pada chain sumber.
- Data koneksi. Ketentuan 1Click menyatakan bahwa Intents Technology dapat mengumpulkan metadata permintaan, alamat IP, dan alamat dompet, dan kebijakan privasi di near.com mencantumkan alamat IP, lokasi, browser, dan informasi perangkat.
- Apa pun yang ditambahkan oleh aplikasi, seperti alamat dompet terhubung lainnya. Aplikasi juga dapat menjalankan pemeriksaan kepatuhan mereka sendiri terhadap dompet kamu.

### **Di Mana Memeriksa Ketentuan dan Dukungan**

Ketentuan dapat berubah, jadi bacalah versi terbaru sebelum melakukan swap besar.

- **Mulailah dengan aplikasi yang kamu gunakan.** Ini adalah titik kontak utamamu. Ketentuan 1Click API menyatakan bahwa Intents Technology tidak memiliki hubungan langsung dengan pengguna aplikasi yang dibangun di atasnya.
- **Terkait Intents:** ketentuan dan kebijakan privasi di near.com/terms dan near.com/privacy, ditambah dengan [ketentuan 1Click API](https://docs.near-intents.org/security-compliance/terms-of-service) serta [risiko dan kepatuhan](https://docs.near-intents.org/security-compliance/risk-and-compliance).
- **Pelacakan dan dukungan:** cari swap pada [Near Intents Explorer](https://explorer.near-intents.org) atau tanyakan di [Near Intents Telegram](https://t.me/near_intents).
- **Pengembalian dana (Refund):** swap yang gagal mungkin akan dikirim kembali ke alamat pengembalian dana yang kamu berikan, tetapi ketentuan near.com menyatakan bahwa pengembalian dana tidak dijamin. Ketentuan 1Click juga menyatakan bahwa permintaan pemulihan untuk kesalahan pengguna di bawah USD 300 tidak akan dipertimbangkan.

Sekarang, mari kita jelajahi beberapa exchange non-kustodial yang dapat diakses yang memfasilitasi perdagangan Zcash. Menggunakan platform ini akan memberimu cara yang nyaman untuk mendapatkan lebih banyak koin Zcash.

### **Ringkasan**

Exchange non-kustodial, atau DEX, memungkinkan kamu untuk berdagang dari dompet milikmu sendiri sambil tetap memegang kendali atas private key milikmu. Hal itu membantu keamanan, tetapi privasi bergantung pada rutenya: chain sumber bersifat publik, layanan tersebut dapat melihat alamat dan data koneksi kamu, dan ZEC kamu hanya akan menjadi privat setelah berada di dalam alamat terlindungi.

Meskipun exchange non-kustodial menawarkan keuntungan yang menarik, penting untuk mengakui bahwa hal tersebut mungkin disertai dengan kekurangan, seperti potensi masalah likuiditas dan kurva pembelajaran yang lebih curam bagi pengguna yang kurang berpengalaman.

Seperti halnya keputusan finansial lainnya, trader harus menilai prioritas, toleransi risiko, dan pemahaman mereka terhadap teknologi secara saksama sebelum memilih antara opsi exchange non-kustodial dan kustodial.