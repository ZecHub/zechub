<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Keamanan Pasca-Quantum di Zcash

## Ringkasan Singkat

- Komputer kuantum adalah risiko di masa depan karena mereka dapat mematahkan beberapa kriptografi kunci-publik yang digunakan oleh blockchain saat ini.
- "Post-quantum" berarti kriptografi yang berjalan pada komputer biasa tetapi dirancang untuk menahan serangan dari komputer kuantum di masa depan.
- Zcash belum sepenuhnya post-quantum saat ini.
- Zcash terlindungi mengurangi jumlah data transaksi publik yang dapat dipelajari oleh penyerang di masa depan, namun penggunaan shielded tidak sama dengan ketahanan kuantum penuh.
- Zcash sedang bersiap melalui penelitian, ZIP, dan proposal peningkatan jaringan seperti ZIP 2005 dan Project Tachyon.
- Migrasi post-quantum yang aman harus melindungi dana, privasi, dompet, exchange, dan aturan konsensus secara bersamaan.

Untuk melihat apa yang diubah oleh Ironwood dan tanggal status dari setiap bagian, lihat [Apakah Zcash Pasca-Quantum?](/zcash-tech/is-zcash-post-quantum).

## Apa Itu Komputasi Kuantum?

Komputer biasa menyimpan informasi sebagai bit. Setiap bit adalah `0` atau `1`.

Komputer kuantum menggunakan bit kuantum, yang disebut qubit. Qubit dapat digunakan oleh algoritma khusus yang menyelesaikan beberapa masalah matematika jauh lebih cepat daripada komputer biasa.

Itu tidak berarti komputer kuantum lebih cepat dalam segala hal. Risikonya bersifat spesifik. Beberapa kriptografi bergantung pada masalah matematika yang sangat sulit bagi komputer biasa tetapi jauh lebih mudah bagi komputer kuantum yang cukup besar.

Untuk blockchain, contoh yang paling penting adalah kriptografi kunci publik. Kunci publik dan tanda tangan digunakan untuk membuktikan bahwa seorang pengguna diizinkan untuk membelanjakan koin.

## Mengapa Blockchain Peduli

Blockchain menggunakan kriptografi untuk beberapa fungsi yang berbeda:

| Alat kriptografi | Fungsinya | Dampak kuantum |
| --- | --- | --- |
| Tanda tangan digital | Membuktikan bahwa pemilik mengizinkan pengeluaran | Risiko tinggi untuk sistem kurva-elips umum |
| Fungsi hash | Membangun alamat, komitmen, Merkle tree, dan tantangan | Risiko lebih rendah, tetapi margin keamanan sangat penting |
| Zero-knowledge proofs | Membuktikan bahwa transaksi terlindungi adalah valid tanpa mengungkapkan detailnya | Bergantung pada sistem proof dan asumsi yang digunakan |
| Kesepakatan kunci | Membantu dompet mengenkripsi data note untuk penerima | Memerlukan peninjauan cermat di bawah model ancaman kuantum |

Komputer kuantum yang cukup kuat dapat mengancam banyak skema tanda tangan yang digunakan saat ini, termasuk tanda tangan elliptic-curve. Hal ini penting karena tanda tangan adalah apa yang memungkinkan jaringan mengetahui bahwa sebuah transaksi telah diotorisasi oleh kunci yang tepat.

Fungsi hash berbeda. Algoritme Grover dapat mempercepat pencarian brute force, tetapi tidak merusak fungsi hash dengan cara yang sama secara langsung. Margin keamanan yang lebih besar dapat membantu.

## Apa Itu Kriptografi Pasca-Kuantum?

Kriptografi pasca-kuantum adalah kriptografi yang dirancang agar tetap aman terhadap komputer biasa maupun komputer kuantum di masa depan.

Ini tidak berarti kriptografinya menggunakan komputer kuantum. Ini berarti sistem tersebut didasarkan pada masalah matematika sulit yang berbeda.

Pada tahun 2024, NIST merilis standar post-quantum pertama yang telah difinalisasi:

- **ML-KEM** untuk pembentukan kunci
- **ML-DSA** untuk tanda tangan digital
- **SLH-DSA** untuk tanda tangan digital berbasis hash

Standar-standar ini merupakan pencapaian besar, namun sebuah blockchain tidak dapat begitu saja melakukan swap satu algoritma dengan algoritma lainnya dalam semalam. Aturan konsensus, dompet, dompet hardware, ukuran transaksi, biaya, dan privasi semuanya harus dipertimbangkan.

## Bagaimana Risiko Kuantum Muncul Secara On-Chain

Cara sederhana untuk memikirkan risikonya adalah:

1. Seorang pengguna membuat pasangan kunci.
2. Kunci publik atau data tanda tangan mungkin muncul di on-chain.
3. Penyerang kuantum di masa depan mungkin dapat menggunakan materi publik tersebut untuk mempelajari kunci privat.
4. Jika dana masih dikendalikan oleh kunci tersebut, dana tersebut mungkin berisiko.

Blockchain transparan mengekspos banyak informasi secara desain. Alamat, jumlah, dan tautan transaksi bersifat publik. Materi kunci publik juga dapat menjadi terlihat saat koin digunakan.

Ini adalah salah satu alasan mengapa penggunaan kembali alamat sangat berbahaya. Penggunaan kembali memberikan lebih banyak data kepada pengamat untuk menghubungkan data saat ini dan memberikan lebih banyak materi historis kepada penyerang di masa depan untuk dianalisis.

## Apa yang Berbeda dari Zcash?

Zcash mendukung transaksi transparan maupun transaksi terlindungi.

Zcash transparan bekerja lebih seperti penggunaan blockchain publik gaya Bitcoin. Alamat, jumlah, dan hubungan transaksi dapat terlihat.

Zcash terlindungi berbeda. Transaksi terlindungi menggunakan zero-knowledge proofs sehingga jaringan dapat memverifikasi bahwa sebuah transaksi mengikuti aturan tanpa mengungkapkan pengirim, penerima, atau jumlahnya.

Ini memberikan keuntungan privasi yang penting bagi Zcash:

- Lebih sedikit data transaksi yang dipublikasikan untuk dilihat semua orang.
- Pengguna menghindari pembuatan grafik pembayaran publik saat mereka tetap terlindungi.
- Pengamat di masa mendatang memiliki lebih sedikit riwayat keuangan publik untuk dianalisis.
- Pengungkapan selektif dapat terjadi melalui viewing key alih-alih catatan yang bersifat publik secara default.

Namun, Zcash yang terlindungi tidak secara otomatis bersifat post-quantum. Pool terlindungi masih bergantung pada asumsi kriptografi. Otorisasi pengeluaran, komitmen note, nullifier, sistem proof, enkripsi, dan kunci dompet semua memerlukan peninjauan yang cermat.

Versi singkatnya:

> Penggunaan terlindungi mengurangi paparan publik, tetapi Zcash masih memerlukan peningkatan pasca-kuantum yang disengaja.

## Peta Risiko Zcash

| Area | Penjelasan Pemula | Kekhawatiran pasca-kuantum |
| --- | --- | --- |
| Alamat transparan | Alamat publik dan grafik transaksi publik | Risiko serupa dengan blockchain transparan lainnya |
| Otorisasi pengeluaran | Proof bahwa seorang pengguna diizinkan untuk membelanjakan dana | Skema tanda tangan mungkin memerlukan penggantian atau migrasi |
| Note terlindungi | Catatan nilai privat di dalam pool terlindungi | Beberapa komponen mungkin memerlukan asumsi baru atau alat pemulihan |
| zk-SNARKs | Proofs bahwa transaksi terlindungi adalah valid | Asumsi sistem proof perlu ditinjau |
| Pemindaian dompet | Bagaimana dompet menemukan dan mendekripsi note yang diterima | Kesepakatan kunci dan enkripsi note perlu ditinjau |
| Migrasi | Memindahkan dana ke kriptografi yang lebih aman | Harus menghindari kehilangan dana maupun kebocoran privasi |

## Bagaimana Zcash Sedang Bersiap

### Zcash Memiliki Proses Peningkatan Jaringan

Zcash telah mengubah kriptografinya sebelumnya. Sapling membuat transaksi terlindungi lebih mudah digunakan. NU5 memperkenalkan Orchard, Alamat Terpadu (Unified Addresses), dan Halo 2.

Hal ini penting karena kesiapan pasca-kuantum bukanlah sekadar satu baris patch perangkat lunak. Hal ini memerlukan peningkatan jaringan yang terkoordinasi, perubahan dompet, audit, dan waktu bagi pengguna untuk melakukan migrasi.

Peningkatan Zcash di masa lalu menunjukkan bahwa ekosistem ini memiliki pengalaman dalam beralih dari kriptografi lama menuju desain yang lebih baru.

### Pengurangan Asumsi Lama pada Halo dan Orchard

Halo 2 digunakan oleh Orchard, pool terlindungi modern milik Zcash. Satu peningkatan penting adalah bahwa Halo menghapus kebutuhan akan trusted setup untuk sistem proof Orchard.

Itu tidak sama dengan keamanan pasca-kuantum. Hal ini tetap relevan karena menunjukkan bahwa Zcash dapat menggantikan blok bangunan kriptografi utama ketika desain yang lebih baik tersedia.

### ZIP Berfokus Pada Pemulihan Kuantum

ZIP berjudul "Orchard Pemulihan Kuantum." Dokumen ini mengusulkan perubahan yang dimaksudkan untuk membantu pengguna Orchard memulihkan atau memigrasikan dana jika serangan kuantum terhadap asumsi lama menjadi praktis.

Kemampuan pemulihan tidak sama dengan keamanan pasca-kuantum penuh. Hal ini lebih sempit namun tetap bermanfaat:

- Keamanan pasca-kuantum penuh berupaya mencegah serangan kuantum agar tidak berhasil.
- Kemampuan pemulihan memberikan jalur yang lebih baik bagi pengguna jujur jika kriptografi lama menjadi tidak aman.

Bagi pemula, anggaplah ini sebagai rencana pintu keluar darurat. Ini tidak menggantikan seluruh bangunan, tetapi membantu orang-orang meninggalkan ruangan lama dengan aman jika kunci lama menjadi lemah.

### Proyek Tachyon Menuju Peningkatan Protokol yang Lebih Besar

Proyek Tachyon adalah usulan Zcash upgrade yang berfokus pada skala, sinkronisasi, dan pertumbuhan state. Situs publiknya menyatakan bahwa proposal ini bertujuan untuk memperkecil transaksi, mengurangi pertumbuhan state validator, dan memperoleh privasi post-quantum penuh sebagai efek sampingnya.

Karena Tachyon adalah sebuah proposal, hal ini masih bergantung pada pekerjaan rekayasa, peninjauan, dan persetujuan komunitas sebelum aktivasi. Hal ini paling tepat dipahami sebagai bagian dari arah riset aktif dan peningkatan Zcash, bukan sebagai fitur yang sudah dapat digunakan oleh pengguna saat ini.

### Penelitian Dan Standar Terus Berkembang

Dunia kriptografi yang lebih luas juga sedang bergerak. Standar pasca-kuantum dari NIST memberikan blok bangunan yang lebih kuat bagi para implementer untuk tanda tangan dan pembentukan kunci. Peneliti zero-knowledge terus mempelajari sistem proof yang dapat bertahan di bawah asumsi kuantum.

Zcash dapat mengambil manfaat dari pekerjaan tersebut, tetapi ia masih harus menyesuaikannya ke dalam blockchain yang menjaga privasi.

## Kemungkinan Pendekatan Peningkatan di Masa Depan

### Otorisasi Pengeluaran Pasca-Quantum

Zcash pada akhirnya mungkin memerlukan otorisasi pengeluaran yang tidak bergantung pada skema tanda tangan yang rentan terhadap kuantum.

Ini dapat menggunakan tanda tangan post-quantum, tanda tangan hibrida, atau desain lainnya. Desain hibrida menggunakan pemeriksaan klasik dan post-quantum selama masa transisi, sehingga sistem tidak hanya bergantung pada satu asumsi saja.

Tantangannya adalah ukuran dan biaya. Tanda tangan pasca-kuantum dapat lebih besar daripada tanda tangan saat ini, yang memengaruhi ukuran transaksi, bandwidth, biaya, dompet seluler, dan dompet perangkat keras.

### Format Alamat Dan Kunci Baru

Kriptografi baru sering kali membutuhkan kunci dan alamat baru. Pengguna akan memerlukan jalur migrasi yang jelas dari format lama ke format yang lebih aman.

Migrasi ini seharusnya sederhana di dalam dompet. Sebagian besar pengguna tidak perlu memahami setiap detail kriptografi untuk tetap aman.

### Migrasi yang Menjaga Privasi

Migrasi sangat sensitif bagi Zcash. Jika banyak pengguna memindahkan dana dari pool lama ke pool baru dalam pola yang jelas, migrasi itu sendiri dapat membocorkan informasi.

Rencana migrasi yang baik perlu melindungi:

- Dana pengguna
- Privasi pengguna
- Kompatibilitas dompet
- Dukungan exchange
- Dukungan dompet hardware
- Keamanan konsensus jaringan

### Tinjauan Sistem Proof Pasca-Quantum

Mengganti tanda tangan saja tidak cukup. Desain terlindungi dari Zcash juga bergantung pada zero-knowledge proofs dan commitment.

Pekerjaan di masa mendatang mungkin perlu meninjau atau mengganti:

- Asumsi zk-SNARK
- Komitmen polinomial
- Hash tantangan Fiat-Shamir
- Komitmen note
- Konstruksi nullifier
- Asumsi merkle tree
- Enkripsi note dan perilaku viewing-key

Beberapa komponen mungkin dapat diterima dengan parameter yang disesuaikan. Komponen lainnya mungkin memerlukan desain baru.

## Contoh Pemula

### Contoh 1: Kunci Lama

Bayangkan sebuah brankas dengan kunci yang sangat kuat saat ini. Sebuah alat baru yang ditemukan di masa depan mungkin dapat membuka kunci lama tersebut dengan cepat.

Kriptografi pasca-kuantum ibarat mengganti kunci dengan desain yang tidak diperkirakan dapat dibobol oleh alat baru tersebut.

Untuk sebuah blockchain, mengganti kunci sangatlah sulit karena setiap dompet, node, exchange, dan perangkat keras harus memahami desain baru tersebut.

### Contoh 2: Kotak Resi Publik

Data blockchain yang transparan ibarat memasukkan setiap struk ke dalam kotak publik selamanya. Meskipun saat ini tidak ada yang dapat membaca setiap pola, alat di masa depan mungkin dapat mempelajari lebih banyak hal nantinya.

Zcash terlindungi berusaha menghindari publikasi tanda terima tersebut sejak awal. Hal ini membantu privasi jangka panjang, tetapi kunci yang melindungi sistem terlindungi tetap harus ditinjau untuk masa depan kuantum.

### Contoh 3: Rencana Keluar

Kemampuan pemulihan ibarat merencanakan rute evakuasi sebelum terjadi kebakaran. Anda berharap tidak perlu menggunakannya, namun jauh lebih aman untuk merancangnya sejak dini daripada saat keadaan darurat.

ZIP 2005 sesuai dengan ide ini untuk catatan Orchard.

## Apa yang Dapat Dilakukan Pengguna Saat Ini

Pengguna tidak perlu panik. Komputer kuantum publik berskala besar yang mampu mematahkan kriptografi blockchain yang diterapkan belum tersedia saat ini.

Kebiasaan baik tetap membantu:

- Utamakan penggunaan Zcash terlindungi jika memungkinkan.
- Hindari menggunakan kembali alamat yang sama.
- Pastikan dompet selalu diperbarui.
- Ikuti pengumuman peningkatan jaringan Zcash.
- Pantau ZIP dan panduan dompet mengenai kemampuan pemulihan atau migrasi.
- Jangan berasumsi bahwa aktivitas transparan bersifat privat.
- Jangan memindahkan dana berdasarkan rumor; tunggu panduan jelas dari pengembang Zcash dan tim dompet yang terpercaya.

## Tantangan

Peningkatan pasca-kuantum sulit bagi setiap blockchain.

Tantangan umum meliputi:

- Kunci dan tanda tangan yang lebih besar
- Transaksi yang lebih besar
- Biaya verifikasi yang lebih tinggi
- Penggunaan bandwidth yang lebih banyak
- Audit keamanan baru
- Dukungan dompet hardware
- Performa dompet mobile
- Integrasi exchange dan kustodial
- Kebocoran privasi selama migrasi
- Kesepakatan komunitas mengenai perubahan konsensus

Untuk Zcash, bagian tersulit bukan hanya menjaga agar koin dapat dibelanjakan. Bagian sulitnya adalah menjaga agar koin dapat dibelanjakan sambil tetap mempertahankan privasi yang membuat Zcash berbeda.

## Ringkasan

Komputer kuantum pada akhirnya dapat mengancam beberapa kriptografi yang digunakan oleh blockchain. Kriptografi pasca-kuantum adalah jawaban jangka panjang, namun hal tersebut harus diterapkan dengan hati-hati.

Zcash belum sepenuhnya pasca-kuantum saat ini. Namun, Zcash memiliki kekuatan yang bermanfaat: transaksi terlindungi mengurangi paparan publik, jaringan ini memiliki sejarah peningkatan kriptografi, dan penelitian saat ini seperti ZIP 2005 serta Project Tachyon sudah ditujukan untuk risiko kuantum di masa depan.

Bagi pemula, ide utamanya sederhana: privasi saat ini mengurangi paparan data di masa depan, dan peningkatan yang cermat dapat membantu Zcash bergerak menuju keamanan era kuantum yang lebih kuat tanpa mengorbankan kegunaan.

## Halaman Terkait

- [Apakah Zcash Pasca-Quantum?](/zcash-tech/is-zcash-post-quantum) - Apa yang Ironwood berubah, apa yang masih terekspos, dan tabel status berdasarkan tanggal
- [Pool Terlindungi](/using-zcash/shielded-pools) - Bagaimana Zcash transaksi terlindungi melindungi detail transaksi
- [Halo](/zcash-tech/halo) - Sistem proof Zcash tanpa trusted setup
- [ZKP & ZK-SNARKS](/zcash-tech/zk-snarks) - Bagaimana zero-knowledge proofs bekerja dalam Zcash
- [Viewing Keys](/zcash-tech/viewing-keys) - Bagaimana pengungkapan selektif bekerja untuk Zcash terlindungi
- [Zcash Aset Terlindungi](/zcash-tech/zcash-shielded-assets) - Aset terlindungi di masa depan dan dukungan aset privat
- [Privasi sebagai Prinsip Utama](/privacy/privacy-as-a-core-principle) - Mengapa privasi finansial itu penting

## Referensi

- [NIST: Standar enkripsi pasca-kuantum pertama yang difinalisasi](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [Proyek Kriptografi Pasca-Kuantum NIST](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [ZIP 2005: Orchard Quantum Recoverability](https://zips.z.cash/zip-2005)
- [Proyek Tachyon](https://tachyon.z.cash/)
- [Zcash Spesifikasi Protokol](https://zips.z.cash/protocol/protocol.pdf)
- [Halo 2 Buku](https://zcash.github.io/halo2/)