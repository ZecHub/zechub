<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Protokol Crosslink

## Ringkasan Singkat

* Protokol Crosslink adalah rancangan yang diusulkan untuk tahap hybrid Proof-of-Work/Proof-of-Stake (PoW/PoS) milik Zcash. Protokol ini mengintegrasikan PoW dengan protokol Byzantine Fault Tolerance (BFT), yang memungkinkan finalitas terjamin selama PoW atau PoS tetap aman.
* PoS hybrid memperkenalkan notaris yang memvalidasi blok berdasarkan ZEC yang di-stake — awalnya bersifat statis, kemudian dipilih berdasarkan ZEC yang di-stake.
* Crosslink bertujuan untuk menyediakan dua ledger: **ledger final (LOG_fin)** untuk keamanan rollback, dan **ledger dengan latensi lebih rendah (LOG_ba)** yang memperluasnya tidak lebih dari *L* blok.
* **Mode Safety** akan aktif jika ledger final tertinggal lebih dari *L* blok: PoW tetap berlanjut, tetapi aktivitas ekonomi akan dijeda hingga masalah tersebut terselesaikan.
* Seiring berjalannya waktu, validator PoS akan menerima bagian imbalan yang terus meningkat, sehingga mengurangi pendapatan penambang PoW; protokol ini memperkenalkan perubahan secara bertahap.
* Protokol ini sedang dikembangkan oleh Shielded Labs, dengan peta jalan untuk mengintegrasikan Crosslink 2* ke dalam client Zebra milik Zcash.

## Penjelasan Inti

### Pendahuluan: Zcash Hybrid PoS dan Protokol Crosslink

Protokol Crosslink adalah sebuah perkembangan penting dalam evolusi Zcash, yang mengarahkannya menuju model **Hybrid Proof-of-Stake (PoS)** dan **Proof-of-Work (PoW)**. PoW tradisional, meskipun andal untuk memastikan keamanan jaringan, menghadapi kritik karena konsumsi energi dan risiko sentralisasi yang terkait dengan penambangan industri. Crosslink memperkenalkan sistem hybrid, menggabungkan ketangguhan PoW yang telah terbukti dengan efisiensi dan keuntungan tata kelola dari PoS.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Transisi ini selaras dengan tren global dalam inovasi blockchain, di mana proyek-proyek beralih ke mekanisme yang terdesentralisasi dan berkelanjutan secara lingkungan. Model konsensus ganda Crosslinks memastikan Zcash mempertahankan jaminan privasi kriptografisnya yang kuat sambil berevolusi untuk menjawab tantangan kontemporer.

Pendekatan hybrid Proof-of-Stake (PoS) menggabungkan Proof-of-Work (PoW) tradisional dengan PoS, yang bertujuan untuk mengatasi kerentanan seperti serangan 51% sambil tetap menjaga desentralisasi dan mengurangi konsumsi energi. Hybrid PoS memperkenalkan notaris yang memvalidasi blok berdasarkan ZEC yang di-stake. Mekanisme ini dirancang untuk meningkatkan keamanan chain dan validasi checkpoint, menawarkan alternatif yang lebih kuat dibandingkan sistem PoW murni.

### Mengapa Hybrid PoS/PoW sebagai pengujian pertama?

* Ini memberikan kemajuan menuju PoS murni.
* Ini memungkinkan penggunaan kasus penambangan dan staking secara bersamaan serta persilangan ekosistem.
* Ini memitigasi kemungkinan masalah keamanan pada protokol PoS hingga memiliki stake validator dan kepercayaan yang lebih besar.
* Pendekatan umum ini telah didemonstrasikan oleh Ethereum di Produksi.

### Apa itu Crosslink

Protokol Crosslink adalah rancangan yang diusulkan untuk tahap hybrid Proof-of-Work/Proof-of-Stake (PoW/PoS) dari Zcash. Protokol ini mengintegrasikan PoW dengan protokol Byzantine Fault Tolerance (BFT), yang memungkinkan finalitas terjamin selama PoW atau PoS tetap aman. Rancangan ini bertujuan untuk memperkuat keamanan jaringan dan desentralisasi dengan menggabungkan validasi staked sambil tetap mempertahankan partisipasi penambang. Fitur utama dari proposal ini, yang disebut Crosslink 2, menyederhanakan arsitektur dengan menyatukan proposer BFT dan penambang. Pendekatan yang efisien ini meminimalkan perubahan struktural dan memungkinkan penggunaan lapisan BFT "dummy", sehingga memudahkan pembuatan prototipe dan penerapan sambil tetap mempertahankan standar keamanan tinggi.

Rencana implementasi mencakup peta jalan dengan estimasi biaya rekayasa untuk mengintegrasikan Crosslink 2* ke dalam client Zebra milik Zcash. Penerapan bertahap ini berfokus pada penyeimbangan insentif pemangku kepentingan, mengurangi gangguan, dan menyelaraskan dengan tujuan Zcash untuk skalabilitas, kegunaan, dan desentralisasi. Meningkatnya kepercayaan terhadap properti keamanan protokol yang kuat semakin memperkokoh potensinya sebagai langkah kunci dalam evolusi Zcash. Dengan mengatasi efisiensi energi dan meningkatkan mekanisme konsensus, Crosslink menawarkan solusi masa depan untuk tantangan blockchain yang terus berkembang. Untuk detail lebih lanjut, silakan merujuk ke repositori [GitHub](https://github.com/ShieldedLabs/zebra-crosslink) dan Forum Komunitas [Zcash](https://forum.zcashcommunity.com).

### Tujuan dan Sasaran Crosslink

Protokol Crosslink dirancang untuk menjawab beberapa tujuan strategis yang krusial bagi masa depan Zcash:

1. **Desentralisasi**:
   * Dengan menggabungkan PoS, Zcash mengurangi ketergantungan pada perangkat keras PoW khusus (ASIC), yang sering kali memusatkan kekuatan penambangan di antara beberapa operator besar.
   * PoS memungkinkan partisipasi dari komunitas yang lebih luas, di mana pemegang koin melakukan staking pada aset mereka untuk mengamankan jaringan, memastikan konsensus yang lebih terdistribusi.
   * Dengan memperkenalkan validasi berbasis staking, protokol memastikan bahwa peserta ekonomi memainkan peran aktif dalam konsensus, mengurangi ketergantungan hanya pada penambangan.
2. **Tata Kelola yang Ditingkatkan**:
   * Pemegang koin mendapatkan hak suara melalui staking, memungkinkan mereka untuk memengaruhi keputusan mengenai peningkatan jaringan, alokasi pendanaan, dan prioritas ekosistem. Mekanisme demokratis ini menyelaraskan evolusi protokol dengan kepentingan komunitas.
3. **Efisiensi Energi**:
   * Transisi sebagian ke PoS secara signifikan menurunkan kebutuhan energi, menyelaraskan Zcash dengan inisiatif keberlanjutan global. PoS pada dasarnya kurang intensif sumber daya dibandingkan dengan PoW yang berat secara komputasi. Sistem hibrida bertujuan untuk menurunkan penggunaan energi dibandingkan dengan sistem yang hanya menggunakan PoW sambil tetap menjaga keamanan tinggi.
4. **Keamanan Ekonomi dan Keberlanjutan**:
   * Menggabungkan PoW dan PoS mendiversifikasi insentif ekonomi bagi peserta jaringan, memastikan keamanan yang kuat tanpa ketergantungan berlebih pada satu mekanisme tunggal.
   * Staking juga memperkenalkan model imbalan yang dapat diprediksi bagi para peserta, menciptakan proposisi yang menarik bagi investor jangka panjang.
5. **Peningkatan Keamanan**: Crosslink bertujuan untuk meningkatkan ketahanan jaringan terhadap serangan reorganisasi rantai dengan mengintegrasikan PoS bersama dengan PoW.

## Visual / Analogi

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Bayangkan sebuah layanan paket yang mengeluarkan dua dokumen berbeda untuk pengiriman yang sama. Yang pertama adalah pemindaian pelacakan: ia muncul dengan cepat, memberi tahu Anda di mana kemungkinan besar paket tersebut berada, dan sesekali dapat dikoreksi. Yang kedua adalah tanda terima pengiriman yang telah ditandatangani: ia tiba lebih lambat, tetapi begitu dokumen tersebut ada, tidak ada yang menyanggahnya.

Buku besar dengan latensi lebih rendah adalah pemindaian pelacakan, dan buku besar yang telah difinalisasi adalah tanda terima yang ditandatangani. Keduanya mendeskripsikan rantai peristiwa yang sama; keduanya berbeda dalam hal seberapa cepat mereka muncul dan seberapa kuat mereka bertahan.

Mode Keselamatan adalah apa yang dilakukan depot ketika tanda terima yang ditandatangani berhenti tiba sementara pemindaian terus menumpuk. Paket tetap bergerak melalui gedung — tetapi kantor berhenti melakukan pembayaran hanya berdasarkan pemindaian sampai tanda tangan tersebut mengejar ketertinggalan.

## Pendalaman Materi

### Tujuan Keamanan dan Performa dari Crosslink

Protokol Crosslink bertujuan untuk menyediakan dua jenis ledger bagi Zcash: **ledger final (LOG_fin)** dan **ledger dengan latensi lebih rendah (LOG_ba)**. Ledger final memastikan keamanan rollback di bawah asumsi yang wajar mengenai protokol Byzantine Fault Tolerance (BFT) atau blockchain (BC). Protokol ini dirancang agar tetap aktif dan aman bahkan di bawah partisi jaringan, dengan latensi sedikit lebih dari dua kali lipat dari blockchain Zcash saat ini untuk konfirmasi blok yang setara.

Ledger dengan latensi lebih rendah memperluas ledger yang telah difinalisasi tidak lebih dari *L* blok. Ini memastikan keamanan rollback hanya di bawah protokol blockchain dan menjaga latensi serta keamanan tidak lebih buruk dari model Zcash yang ada. Dalam desain 2* Crosslink yang disederhanakan, ledger dengan latensi lebih rendah menyederhanakan pengembangan dan adopsi dengan berfungsi sebagai chain PoW.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Ketersediaan Terbatas dan Mode Keamanan

Crosslink menyertakan **Safety Mode** untuk menangani risiko yang terkait dengan ledger latensi rendah yang berjalan jauh lebih cepat daripada ledger yang telah difinalisasi. Hal ini mencegah ketidaksesuaian, seperti status akun yang tidak seimbang atau celah keamanan yang tidak terverifikasi dalam solusi sementara oleh penyedia layanan. Safety Mode diaktifkan jika ledger yang telah difinalisasi tertinggal lebih dari konstanta *L* blok. Selama status ini, blockchain terus menjalankan operasi PoW (memastikan keamanan dasar), tetapi aktivitas ekonomi dihentikan sementara hingga masalah tersebut diselesaikan. Mekanisme ini dirancang untuk pulih dari kondisi luar biasa seperti serangan besar sambil mendukung kebijakan rollback berbasis tata kelola.

### Detail Teknis dan Penerapan

Protokol Crosslink sedang dikembangkan dan diterapkan secara aktif oleh Shielded Labs dalam kolaborasi dengan mitra ekosistem utama seperti Zodl. Implementasi protokol ini mencakup:

* Menetapkan mekanisme staking yang aman bagi peserta PoS.
* Memodifikasi struktur imbalan untuk menyeimbangkan insentif antara penambang dan staker.
* Memastikan kompatibilitas mundur dan pengalaman pengguna yang mulus selama transisi.
* Sistem Notaris: Protokol ini menyertakan notaris yang menandatangani blok. Pada awalnya, notaris statis digunakan, kemudian bertransisi ke sistem dinamis di mana notaris dipilih berdasarkan ZEC yang di-stake.
* Logika Aktivasi: Pengenalan Crosslink memerlukan perubahan pada aturan konsensus Zcash, termasuk mendefinisikan proses distribusi stake dan memperbarui aturan protokol jaringan untuk mendukung konsensus hibrida.
* Penerapan Bertahap: Protokol akan diluncurkan secara bertahap untuk memastikan stabilitas jaringan dan adaptasi komunitas. Fase awal berfokus pada implementasi teknis, diikuti oleh integrasi tata kelola untuk pemilihan notaris.

Anda dapat mengeksplorasi detail teknis dan melacak progresnya melalui repositori [zebra-crosslink di GitHub](https://github.com/ShieldedLabs/zebra-crosslink) dan [The zebra-crosslink Book](https://shieldedlabs.github.io/zebra-crosslink/).

## Implikasi Praktis

### Dampak pada Pendapatan Penambang PoW

Crosslink mengakui peran mendasar dari penambang PoW dalam pengembangan awal Zcash sambil mempersiapkan transisi secara bertahap:

* **Pengurangan Imbalan Blok**:
  * Seiring berjalannya waktu, validator PoS akan menerima bagian imbalan yang terus meningkat, sehingga mengurangi pendapatan penambang PoW. Redistribusi ini mencerminkan berkurangnya peran PoW dalam model hibrida.
* **Transisi yang Adil**:
  * Protokol memperkenalkan perubahan secara bertahap, memastikan penambang memiliki waktu yang cukup untuk beradaptasi atau mengeksplorasi peran baru dalam ekosistem Zcash, seperti beralih ke staking atau berkontribusi pada layanan jaringan lainnya.
* **Mitigasi Risiko Sentralisasi**:
  * PoS staking pool dirancang untuk mencegah konsentrasi kekuatan, menawarkan kesempatan bagi pemain kecil untuk berpartisipasi pada posisi yang setara. Pendekatan inklusif ini melawan konsentrasi yang saat ini terlihat pada penambangan berbasis ASIC.
* Penambang PoW akan mengalami penurunan pendapatan karena sebagian dari imbalan blok dialokasikan kembali ke validator PoS. Alokasi ulang ini memastikan sistem insentif yang seimbang, memberikan imbalan baik kepada penambang maupun staker untuk mengamankan jaringan.
* Transisi bertahap direncanakan untuk memitigasi dampak ekonomi pada penambang sambil mendorong partisipasi pemangku kepentingan.

Mekanisme konsensus ganda ini memperkuat komitmen Zcash terhadap privasi, keberlanjutan, dan desentralisasi, memposisikannya sebagai pemimpin yang berorientasi ke masa depan dalam ruang blockchain.

## Kesalahan Umum

**Membaca Crosslink sebagai aturan konsensus aktif**. Halaman ini menjelaskan usulan desain dengan rencana penerapan bertahap. Memperkenalkannya memerlukan perubahan pada aturan konsensus Zcash, yang menjadi tujuan dari peta jalan dan pekerjaan integrasi Zebra.

**Dengan asumsi PoS menggantikan penambangan**. Crosslink adalah desain hibrida: produksi blok PoW berlanjut bersamaan dengan validasi berbasis stake. Bahkan dalam Safety Mode, blockchain tetap melanjutkan operasi PoW sementara aktivitas ekonomi dihentikan sementara.

**Menganggap "finality" sebagai konfirmasi yang lebih cepat**. Ledger yang telah difinalisasi dirancang dengan latensi sedikit lebih dari dua kali lipat dari blockchain Zcash saat ini untuk konfirmasi blok yang setara. Hal yang ditambahkan adalah keamanan rollback, bukan kecepatan — ledger dengan latensi lebih rendah adalah tampilan cepatnya.

**Membingungkan kedua ledger**. LOG_ba bukanlah chain terpisah: ia memperluas ledger yang telah difinalisasi tidak lebih dari *L* blok, dan dalam desain Crosslink 2* ia berfungsi sebagai chain PoW.

## Halaman Terkait

- [Zebra Full Node](/zcash-tech/zebra-full-node) — klien tempat Crosslink 2* direncanakan untuk diintegrasikan.
- [Full Nodes](/zcash-tech/full-nodes) — cara node memvalidasi aturan konsensus saat ini, sebelum adanya perubahan konsensus hibrida apa pun.
- [Network Upgrades](/start-here/network-upgrades) — bagaimana perubahan aturan konsensus mencapai jaringan Zcash.
- [Zcash Monetary Policy](/start-here/zcash-monetary-policy) — struktur imbalan blok yang akan didistribusikan kembali oleh Crosslink.

## Sumber Daya Tambahan

- Wawasan komunitas: Forum Komunitas [Zcash - Diskusi Crosslink](https://forum.zcashcommunity.com)
- Pembaruan resmi: Blog [Electric Coin Company](https://electriccoin.co)
- Fokus keberlanjutan: Mengapa Hybrid PoS Penting bagi [Zcash](https://forum.zcashcommunity.com)

Referensi:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
     <iframe
       className="w-full h-full"
       src="https://www.youtube.com/embed/O4wQi_i7k0I"
       title="Crosslink"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       allowFullScreen
       loading="lazy"
     />
</div >