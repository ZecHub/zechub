# Penandatanganan Dingin Terlindungi

> **Gagasan utama:** Dompet pendamping melihat semua yang diperlukan untuk membangun dan memantau transaksi terlindungi. Hanya dompet hardware yang memegang otoritas untuk mengotorisasi pengeluaran. Pemisahan itulah inti dari penandatanganan dingin terlindungi.

Shielding di Zcash melibatkan pemindahan dana dari alamat publik dan transparan ke alamat pribadi dan terlindungi, yang menyembunyikan detail transaksi menggunakan fitur privasi Zcash.

### Apa yang berubah ketika Anda melakukan shielding pada ZEC?

Dalam transaksi Zcash yang transparan, informasi seperti:

- alamat pengirim
- alamat penerima
- jumlah yang ditransfer

dapat diamati di blockchain.

Ketika Anda melakukan shielding pada ZEC, dana Anda berpindah ke pool pribadi (seperti Ironwood). Blockchain dapat memverifikasi bahwa suatu transaksi valid tanpa mengungkapkan detail transaksi pribadi Anda. Sejak peningkatan NU6.3 pada 28 Juli 2026, dana yang baru dilindungi masuk ke pool Ironwood karena pool Orchard yang lebih lama tidak lagi menerima setoran baru, tetapi masih mengizinkan penarikan.

### Komponen Transaksi Terlindungi

### 1. Note (Catatan Saldo Terlindungi)

Note adalah catatan kriptografis pribadi yang merepresentasikan jumlah ZEC yang belum dibelanjakan dan dimiliki oleh pengguna.

Berbeda dengan blockchain publik, yang saldonya dicantumkan dalam teks biasa, note terlindungi mengenkripsi nilai dan detail kepemilikan sehingga pengamat on-chain tidak dapat melihat siapa yang memiliki dana tersebut.

Saat memulai transaksi, dompet pendamping memindai buku besar, mengidentifikasi note pengguna yang belum dibelanjakan, dan memilih note yang akan dibelanjakan.

### 2. Nullifier (Mekanisme Deteksi Pengeluaran Ganda)

Karena detail note disembunyikan dari buku besar publik, network memerlukan mekanisme untuk mendeteksi pengeluaran ganda tanpa mengungkapkan note mana yang dibelanjakan.

Nullifier adalah penanda kriptografis unik yang diturunkan dari note tertentu. Ketika note dibelanjakan, nullifier-nya dipublikasikan ke blockchain.

Network memverifikasi bahwa nullifier tersebut belum pernah dicatat sebelumnya. Jika belum, pengeluaran dapat diterima. Yang terpenting, pengamat luar tidak dapat menggunakan nullifier untuk menentukan note spesifik asalnya.

Dompet pendamping menurunkan dan membangun nullifier yang sesuai sebagai bagian dari perakitan data transaksi.

## Kunci

Kunci adalah informasi kriptografis yang mengendalikan akses ke dana Anda dan memungkinkan dompet Anda melakukan operasi seperti menerima, melihat, dan membelanjakan ZEC.

Sebuah dompet menyimpan beberapa kunci berbeda, masing-masing melayani tujuan yang berbeda, seperti halnya satu akun dapat memiliki kredensial terpisah untuk akses baca dan akses tulis.

Kunci merupakan inti hubungan antara dompet pendamping dan dompet hardware, karena kunci yang berbeda melayani tujuan yang berbeda, dan hanya satu di antaranya yang perlu tetap terkunci dengan aman.

Penting untuk diketahui bahwa setiap pool terlindungi membangun kuncinya sebagai pohon derivasi, dengan panah yang menunjuk dari suatu komponen ke apa pun yang dapat diturunkan darinya. Pengguna yang ingin menerima pembayaran terlindungi harus memiliki alamat pembayaran terlindungi, yang dihasilkan dari spending key.

### Hierarki kunci

**1. Spending key**

Ini adalah kunci yang paling sensitif terhadap keamanan. Kunci ini memberikan kemampuan kriptografis untuk mengotorisasi pengeluaran ZEC.

Inilah kunci yang dimaksud setiap kali frasa "dompet hardware memegang kunci" muncul di bagian lain laporan ini.

Dalam arsitektur penandatanganan dingin, spending key disimpan di dalam dompet hardware dan tidak pernah diekspos kepada dompet pendamping. Dompet pendamping seharusnya sama sekali tidak perlu memiliki kunci ini.

Dalam Sapling maupun Orchard, hierarki kunci menurunkan otoritas pengeluaran dan kemampuan viewing sebagai dua cabang berbeda dari spending key akar:

- **Sapling:** Expanded spending key (𝑎𝑠𝑘,𝑛𝑠𝑘,𝑜𝑣𝑘) menurunkan proof-authorizing keys (𝑎𝑘,𝑛𝑠𝑘) dan full viewing keys (𝑎𝑘,𝑛𝑘,𝑜𝑣𝑘), yang selanjutnya menghasilkan incoming viewing keys (𝑖𝑣𝑘) dan alamat terdiversifikasi.
- **Orchard:** Root spending key (𝑠𝑘) bercabang langsung menjadi spend-authorizing key (𝑎𝑠𝑘) dan full viewing key (𝑎𝑘,𝑛𝑘,𝑟𝑖𝑣𝑘).

Pemisahan struktural ini memberikan fondasi kriptografis formal bagi isolasi kunci hardware, yang melibatkan dompet dalam mengekspor cabang viewing (UFVK) ke komputer host untuk sinkronisasi saldo dan pembangunan transaksi, sambil menjaga cabang spend-authorizing tetap terkunci secara permanen pada perangkat.

Derivasi kunci bersifat satu arah secara ketat. Artinya, viewing key tidak dapat dibalik untuk merekonstruksi otoritas pengeluaran. Ketakterbalikan kriptografis membuat ekspor Unified Full Viewing Key (UFVK) aman karena memberikan visibilitas dompet lengkap tanpa mengekspos rahasia pengeluaran pada perangkat.

**2. Viewing keys**

Zcash memisahkan kemampuan untuk melihat aktivitas terlindungi dari kemampuan untuk membelanjakannya. Viewing key memungkinkan dompet atau pihak berwenang lainnya melihat informasi tentang transaksi terlindungi tanpa memberikan otoritas pengeluaran.

- **Full Viewing Key (FVK), dibungkus sebagai Unified Full Viewing Key (UFVK):** sengaja diturunkan dari spending key, kunci ini memungkinkan perangkat lunak mendeteksi dan mendekripsi aktivitas terlindungi dompet, sehingga mengidentifikasi transaksi. Kunci ini juga memungkinkan perhitungan saldo tanpa dapat mengotorisasi pengeluaran. Kunci ini paling tepat digambarkan sebagai turunan spending key yang kurang privat, bukan salinan seed yang lebih lemah.

Full Viewing Key (FVK) menyediakan visibilitas baca-saja yang lengkap sambil mempertahankan pemisahan keamanan yang ketat. Dengan mendekripsi ciphertext note masuk dan keluar melalui komponen outgoing-viewing-key-nya, dompet pendamping khusus FVK dapat menampilkan riwayat transaksi lengkap yang berlabel, bukan hanya saldo berjalan.

Berbagai alamat pembayaran terdiversifikasi yang tidak dapat dihubungkan berbagi FVK dan incoming viewing key (IVK) yang sama, sehingga memungkinkan pembuatan alamat tanpa batas tanpa meningkatkan beban pemindaian blockchain.

Pemisahan fungsional ini membentuk fondasi alur kerja penandatanganan dingin. Seluruh pemindaian chain berkelanjutan, pelacakan riwayat, dan pengelolaan alamat dialihkan ke perangkat lunak host, sementara otoritas pengeluaran tetap terisolasi pada perangkat hardware.

![Key derivation diagrams](/content-images/key-derivation-diagrams.webp)

### Perbedaan krusial: UFVK vs. spending key

> **UFVK dapat dibagikan. Spending key harus tetap berada di dompet hardware.**
>
> Dompet pendamping menggunakan viewing key untuk memantau dompet, mendeteksi dana masuk, mengidentifikasi note, dan membantu mempersiapkan transaksi. Dompet ini tidak memiliki private key yang diperlukan untuk mengotorisasi pengeluaran.

Seperti disebutkan sebelumnya, pemisahan kunci merupakan fondasi arsitektur penandatanganan dingin.

Dompet pendamping dapat melakukan sebagian besar pekerjaan yang diperlukan untuk mempersiapkan transaksi tanpa pernah memiliki kendali atas dana. Dompet hardware hanya perlu menerima transaksi yang telah dipersiapkan dan melakukan operasi penandatanganan akhir.

Produsen dompet hardware tidak perlu menciptakan pemisahan ini sendiri. Desain kunci Zcash sudah memisahkan kemampuan viewing dari otoritas pengeluaran pada tingkat protokol, dan produsen cukup membangun fungsi penandatanganan serta ekspor di atas struktur yang sudah ada tersebut. Protokol memungkinkan informasi seperti alamat terlindungi atau full viewing key diturunkan dari spending key, sementara spending key itu sendiri tetap pribadi, sehingga dompet hardware seperti Ledger, Keystone, dan Hito dapat memberikan informasi viewing yang diperlukan perangkat lunak pendamping tanpa pernah mengekspos private key yang dapat membelanjakan dana.

### Apa yang sebenarnya dilakukan dompet pendamping dengan informasi kunci

Dengan menggunakan materi viewing key, dompet pendamping dapat:

- mengidentifikasi dana dan note Anda
- menentukan note yang dapat dibelanjakan
- menurunkan atau mengidentifikasi alamat yang relevan
- membangun transaksi
- menghasilkan atau mengoordinasikan proof yang diperlukan
- mempersiapkan transaksi untuk ditandatangani

Penting untuk diketahui bahwa kebutuhan untuk membangun transaksi tidak sama dengan kebutuhan akan private spending key. Pemisahan ini adalah salah satu gagasan keamanan utama di balik integrasi dompet hardware.

## Pembangunan dan Otorisasi Transaksi Terlindungi

Berikut adalah proses yang terlibat dalam membuat dan mengotorisasi transaksi. Secara sederhana, proses ini adalah hal yang sebenarnya dilakukan dompet dengan data tersebut untuk mengirim uang:

### Pembangunan Transaksi (Merakit Transaksi Terlindungi)

Pembangunan transaksi adalah proses merakit informasi yang diperlukan untuk membuat transaksi Zcash valid dari pembayaran yang dimaksudkan pengguna.

Proses pembangunan transaksi menggabungkan note yang dipilih, penerima, jumlah, biaya, nullifier, dan data transaksi lain yang diperlukan ke dalam struktur transaksi. Untuk transaksi terlindungi, proses ini juga mempersiapkan informasi yang diperlukan untuk menghasilkan proof zero-knowledge dan tanda tangan yang diperlukan.

Dompet pendamping umumnya melakukan tahap ini. Dompet ini

- Memilih note yang akan dibelanjakan
- Menentukan input dan output transaksi
- Menghitung nilai yang diperlukan
- Mempersiapkan data transaksi yang nantinya akan dibuktikan dan ditandatangani.

Dalam pengaturan penandatanganan dingin, data transaksi yang dihasilkan dapat dikemas ke dalam PCZT dan diteruskan ke dompet hardware untuk langkah penandatanganan yang sangat penting bagi keamanan.

### Proving (Membuktikan Validitas Protokol)

Proving mengacu pada pembuatan proof zero-knowledge, seperti Halo 2 atau Groth16, yang menunjukkan bahwa suatu transaksi mematuhi aturan protokol Zcash.

Proof membantu network menjamin:

- Pengguna yang membelanjakan berwenang membelanjakan note
- Note benar-benar ada
- Nullifier yang bersesuaian bersifat unik
- Total input sama dengan total output ditambah biaya.

Semua ini dilakukan tanpa mengungkapkan detail pribadi yang mendasarinya.

Pembuatan proof membutuhkan komputasi intensif. Mengalihkan tanggung jawab ini ke perangkat pendamping mencegah dompet hardware macet atau kehabisan memori.

### Signing (Mengotorisasi Pengeluaran)

Signing pada dasarnya berbeda dari proving. Tanda tangan digital bertindak sebagai cap otorisasi eksplisit yang dibuat oleh pemegang private key.

Sementara proof zero-knowledge memverifikasi validitas transaksi, tanda tangan digital membuktikan otoritas pengeluaran. Tanda tangan menegaskan bahwa pemilik sebenarnya menyetujui parameter transfer tertentu.

Signing membutuhkan daya komputasi minimal, sehingga ideal bagi dompet hardware.

### Apa itu penandatanganan dingin terlindungi?

Penandatanganan dingin terlindungi adalah metode untuk mengotorisasi transaksi terlindungi Zcash sambil menjaga private spending keys tetap terisolasi dari dompet pendamping yang terhubung ke internet. Transaksi dapat dibangun dan dipersiapkan di komputer online, sementara dompet hardware terpisah yang disimpan offline atau diisolasi dengan cara lain menggunakan kunci terlindungnya untuk mengotorisasi transaksi.

Prosesnya dapat disederhanakan sebagai berikut:

![Shielded cold signing process](/content-images/cold-signing-process.webp)

Dompet pendamping mengirimkan parameter transaksi terstruktur ke perangkat hardware, yang menandatangani payload secara internal tanpa pernah melepaskan private spending key ke mesin host.

## Dompet Pendamping dan Hardware

Transaksi terlindungi dapat melibatkan dompet pendamping dan dompet hardware, masing-masing dengan fungsi yang berbeda.

### Dompet Pendamping

Apa itu dompet pendamping?

Dompet pendamping berjalan di komputer atau perangkat seluler dan melakukan sebagian besar tugas yang terlibat dalam pembuatan transaksi, seperti:

- Memilih note yang akan dibelanjakan
- Membangun transaksi
- Menghitung data transaksi yang diperlukan
- Mengoordinasikan pembuatan proof zero-knowledge yang diperlukan.

### Mengapa dompet pendamping berguna?

Dompet pendamping menangani proses pembuatan transaksi, tetapi jika komputer terkena malware, penyerang mungkin dapat:

- melihat aktivitas Anda,
- mengubah transaksi yang belum ditandatangani,
- mencoba mengelabui Anda agar menyetujui sesuatu.

Dompet pendamping tidak perlu memiliki akses ke private key yang disimpan pada dompet hardware, sehingga dapat menangani pembangunan transaksi dan tugas komputasional lain sementara dompet hardware menyediakan batas keamanan bagi private key.

### Dompet Hardware

Dompet hardware adalah perangkat fisik offline yang mengisolasi private key Anda dari ponsel atau komputer yang terhubung, bertindak seperti brankas aman untuk aset crypto Anda.

### Mengapa dompet hardware berguna?

Jika komputer Anda terkena malware, penyerang mungkin dapat:

- melihat aktivitas Anda,
- mengubah transaksi yang belum ditandatangani,
- mencoba mengelabui Anda agar menyetujui sesuatu.

Private key tidak dapat begitu saja diekstrak dari dompet hardware, sehingga perangkat dapat bertindak sebagai batas keamanan.

Gambar kemampuan pendamping vs hardware

Pemisahan antara kedua dompet ini sangat penting bagi transaksi terlindungi karena transaksi tersebut lebih kompleks daripada transaksi transparan dan melibatkan komponen seperti note terlindungi, nullifier, commitment, proof zero-knowledge, dan tanda tangan transaksi.

Tidak praktis bagi dompet hardware untuk melakukan setiap operasi komputasional. Sebaliknya, dompet pendamping mempersiapkan transaksi dan memberikan informasi yang diperlukan kepada dompet hardware untuk penandatanganan, sementara private spending key tetap terisolasi di dalam perangkat hardware.

## Isolasi Kunci

> Isolasi kunci berarti private key yang dapat mengotorisasi pengeluaran tidak pernah meninggalkan dompet hardware. Pendamping dapat mempersiapkan transaksi; pendamping tidak dapat menandatanganinya.

Isolasi kunci mengacu pada pemisahan private key yang diperlukan untuk mengotorisasi transaksi dari dompet pendamping dan perangkat tempat dompet tersebut berjalan. Dalam pengaturan penandatanganan dingin terlindungi, dompet pendamping dapat membangun transaksi dan mengoordinasikan proof yang diperlukan, sementara dompet hardware menjaga private spending keys yang sensitif tetap terisolasi.

Jika komputer atau ponsel pendamping dikompromikan, penyerang mungkin dapat berinteraksi dengan transaksi sebelum ditandatangani, tetapi idealnya tidak dapat mengekstrak private key dari dompet hardware. Oleh karena itu, kunci tetap berada di dalam batas keamanan perangkat hardware.

Pemisahan ini memungkinkan dompet pendamping melakukan pembangunan transaksi dan tugas komputasional tanpa memberinya akses langsung ke materi kunci yang diperlukan untuk mengotorisasi transaksi.

![Key isolation](/content-images/key-isolation.webp)

Perbedaan utama yang perlu dipahami adalah bahwa "viewing key" tidak berarti aplikasi menerima versi seed yang lebih lemah.

Dalam Zcash, sebuah Full Viewing Key (FVK/UFVK) sengaja diturunkan dari spending key dan memberi pemegangnya kemampuan untuk mendeteksi serta mendekripsi aktivitas terlindungi yang relevan, tetapi bukan mengotorisasi pengeluaran. FVK adalah turunan spending key yang kurang rahasia.

**Satu peringatan privasi penting:**

Jadi, perlu diketahui bahwa aplikasi tidak dapat mencuri dana hanya dengan UFVK, tetapi dapat melihat aktivitas terlindungi pribadi dompet.

Karena itulah lebih akurat untuk menggambarkan aplikasi pendamping sebagai memiliki *otoritas viewing*, alih-alih sekadar mengatakan bahwa aplikasi tersebut memiliki "informasi publik".

Cara paling sederhana untuk menjelaskan keseluruhan gagasan ini adalah bahwa dompet pendamping memperoleh cukup materi kunci untuk mengetahui apa yang terjadi pada dompet, tetapi tidak cukup materi kunci untuk mengotorisasi apa yang terjadi pada dana dompet. Namun, dompet hardware menjaga otoritas pengeluaran tetap terisolasi dan menggunakannya hanya ketika pengguna menyetujui transaksi.

Itulah model inti isolasi kunci di balik desain dompet hardware terlindungi Zcash ini dan model yang sama muncul, implementasi demi implementasi, pada Ledger, Keystone, dan Hito yang akan segera dibahas.

## PCZT

PCZT adalah singkatan dari Partially Created Zcash Transaction. Ini adalah paket yang membawa transaksi Zcash dan informasi yang diperlukan untuk menyelesaikannya dari satu tahap ke tahap lainnya.

Ini adalah format terstandarisasi untuk transaksi Zcash saat transaksi masih dibangun. Format ini memungkinkan peserta atau perangkat yang berbeda untuk melakukan bagian berbeda dari proses pembuatan transaksi dan meneruskan transaksi yang sebagian selesai di antara mereka.

Membangun transaksi jauh lebih kompleks daripada menandatangani transfer publik sederhana dalam protokol cryptocurrency zero-knowledge seperti Zcash. Transaksi terlindungi memerlukan proof zero-knowledge yang intensif secara komputasional, seperti yang dihasilkan menggunakan Halo 2 atau Groth16. Akibatnya, perangkat berdaya rendah seperti dompet hardware mungkin tidak memiliki memori dan kapasitas pemrosesan untuk menangani seluruh alur kerja transaksi.

Pengenalan PCZT menangani beberapa tantangan inti dalam arsitektur crypto terlindungi. PCZT adalah format data perantara terstandarisasi yang memecah pembuatan transaksi menjadi peran modular dan independen. Format ini memungkinkan komputer pendamping yang kuat menangani perakitan transaksi dan pembuatan proof sambil membatasi dompet hardware offline hanya pada otorisasi dan penandatanganan.

### Keterbatasan Hardware dan Cold Storage

Meskipun dompet hardware menyediakan lingkungan aman untuk melindungi private spending keys, biasanya dompet ini memiliki RAM, daya komputasi, dan kemampuan transfer data yang terbatas dibandingkan komputer pendamping. Keterbatasan ini membuat perangkat tersebut tidak praktis untuk melakukan pembuatan proof zero-knowledge yang intensif secara komputasional atau mempertahankan seluruh status transaksi yang diperlukan selama proses pembangunan transaksi.

Akibatnya, dompet pendamping dapat menangani tugas yang membutuhkan komputasi tinggi, sementara dompet hardware tetap berfokus pada operasi penting bagi keamanan, yaitu mengotorisasi transaksi dengan spending keys yang dilindungi.

Ini menimbulkan pertanyaan, jika perangkat sangat terbatas, bagaimana perangkat tetap melakukan verifikasi yang *cukup* untuk dapat dipercaya?

Sederhananya, dompet hardware tidak dapat menerima nilai arbitrer dari komputer pendamping lalu menandatanganinya. Perangkat membutuhkan informasi yang cukup untuk memastikan bahwa nilai yang ditandatangani sesuai dengan transaksi yang ingin diotorisasi pengguna. Hal ini menciptakan keseimbangan yang sulit karena perangkat harus melakukan parsing dan verifikasi yang cukup untuk melindungi proses penandatanganan, sambil beroperasi dalam batas ketat memori, komputasi, ukuran firmware, dan kompleksitas implementasi.

Penanganan Ledger terhadap Orchard PCZT adalah contoh tantangan ini, yang menunjukkan bahwa parsing khusus yang bergantung pada circuit dapat membuat implementasi lebih mudah dikelola pada perangkat terbatas, tetapi mungkin juga memerlukan perubahan firmware ketika struktur transaksi atau circuit yang didukung berkembang.

Dua upaya berkelanjutan menggambarkan respons berbeda terhadap batasan yang sama ini.

Proposal riset mengenai pipeline proving yang sepenuhnya constant time dan sesuai untuk arsitektur dompet hardware open-source serta komputer biasa diajukan dalam Grant #423. Tujuannya adalah menyelidiki infrastruktur kriptografis yang dapat diimplementasikan dengan aman dalam lingkungan seperti C atau Rust sambil mengurangi kompleksitas dan beban pemeliharaan dukungan Zcash terlindungi.

Namun, pendekatan alternatif diwakili oleh **Zcash SeedSigner** yang merupakan signer air-gapped open-source yang dibangun dari komponen murah dan mudah tersedia. Alur kerja yang diusulkannya menjaga komputer pendamping tetap terpisah dari perangkat penandatanganan, dengan meneruskan PCZT melintasi celah udara untuk verifikasi dan penandatanganan pada perangkat.

https://forum.zcashcommunity.com/t/grant-application-research-on-a-fully-constant-time-proving-pipeline-for-open-source-hardware-wallet-architectures-reusable-for-standard-computers/57555

Bersama-sama, pendekatan ini menggambarkan tantangan rekayasa yang lebih luas di balik dompet hardware terlindungi: pembangunan transaksi dan proving dapat terjadi di luar perangkat yang sangat penting bagi keamanan, tetapi signer tetap harus memiliki informasi dan kemampuan verifikasi yang cukup untuk mengotorisasi transaksi yang dihasilkan dengan aman.

### PCZT Memungkinkan Arsitektur Terpisah

Standar Partially Created Zcash Transaction (PCZT) adalah struktur data formal yang menghubungkan dompet pendamping dan dompet hardware.

Dompet pendamping dapat menangani pemilihan note, menghitung nullifier, dan menghasilkan proof zero-knowledge sendiri. Hal ini dimungkinkan karena informasi yang diperlukan untuk langkah-langkah ini, termasuk kunci yang digunakan untuk menurunkan nullifier, berasal dari viewing key, bukan sesuatu yang terikat pada otoritas pengeluaran. Dompet pendamping kemudian mengemas elemen-elemen ini ke dalam wadah PCZT.

PCZT diserahkan kepada dompet hardware, yang membaca konteks transaksi seperti jumlah dan alamat penerima, menerapkan tanda tangan menggunakan spending keys yang dilindungi, dan menyerahkan PCZT yang telah diperbarui kembali kepada perangkat pendamping.

Desain ini menetapkan batas keamanan yang ketat: hardware host yang kuat dapat melakukan matematika zero-knowledge kompleks tanpa memerlukan akses ke spending keys, sementara perangkat cold storage berdaya rendah dapat menegakkan keamanan finansial tanpa harus menghitung kriptografi berat.

### Kompromi Privasi Prover

Walaupun mendelegasikan pembuatan proof zero-knowledge kepada dompet pendamping atau prover lain menjaga spending keys tetap terisolasi, hal ini tetap mengharuskan prover mengakses informasi transaksi sensitif, seperti nilai note, alamat penerima, dan commitment.

PCZT mempertahankan pemisahan arsitektural dengan memastikan bahwa informasi ini dapat disediakan untuk proving tanpa mentransfer private spending keys yang diperlukan untuk otorisasi.

Hal ini menjamin bahwa otoritas proving terpisah dari otoritas pengeluaran. Prover dapat melakukan pembuatan proof yang intensif secara komputasional tanpa memperoleh otoritas kriptografis untuk membelanjakan dana pengguna.

### Interoperabilitas PCZT

Saat PCZT menjadi bagian penting dari alur kerja dompet hardware, multisignature, dan penandatanganan air-gapped Zcash, interoperabilitas di antara implementasi independen menjadi semakin penting.

Proposal Juni 2026 oleh AngryDavee mencatat bahwa implementasi PCZT telah ada di berbagai proyek termasuk Ledger, Keystone, Hito, OneKey, dan implementasi referensi di librustzcash. Namun, proposal tersebut mengidentifikasi kurangnya pengujian bersama untuk memastikan bahwa implementasi ini menafsirkan PCZT secara konsisten.

Solusi yang diusulkan adalah rangkaian pengujian interoperabilitas open-source yang berisi test vector PCZT kanonis serta pengujian lintas implementasi yang mencakup alur kerja lengkap create → sign → finalize. Proposal ini juga mengusulkan pengujian batas peran seperti Combiner, tempat informasi yang ditandatangani sebagian dari signer berbeda dapat digabungkan sebelum transaksi difinalisasi.

Hal ini sangat relevan bagi dompet hardware karena PCZT memungkinkan pembangunan transaksi dan penandatanganan dipisahkan: dompet pendamping dapat membangun transaksi dan mempersiapkan PCZT, sementara perangkat hardware menerima informasi penandatanganan yang diperlukan dan melakukan operasi penandatanganan penting bagi keamanan.

Proposal tersebut tidak diimplementasikan karena Zcash Community Grants memutuskan untuk tidak melanjutkan grant setelah meninjau proposal dan mempertimbangkan umpan balik komunitas. Akibatnya, rangkaian pengujian lintas implementasi yang diusulkan tidak dikembangkan melalui grant ini. Oleh karena itu, ini merupakan respons yang diusulkan terhadap tantangan interoperabilitas PCZT yang telah diidentifikasi, bukan standar yang saat ini ada di seluruh Zcash.

https://forum.zcashcommunity.com/t/pczt-interoperability-test-suite-feedback-before-at-grant-submission/55931

### Siklus Hidup PCZT

| # | Tahap | Deskripsi |
|---|---|---|
| 1 | Creator | Menginisialisasi PCZT dengan metadata transaksi global, termasuk versi transaksi, consensus branch ID, dan flag pool. |
| 2 | Constructor | Mengisi transaksi dengan input dan output yang dimaksudkan di seluruh pool transparan, Sapling, Orchard, atau Ironwood. |
| 3 | IO Finalizer | Menetapkan kumpulan input dan output sebagai lengkap, menghitung binding signature keys, dan menandatangani dummy spend jika diperlukan. |
| 4 | Updater | Melampirkan data konteks yang diperlukan untuk peserta berikutnya, seperti full viewing keys, anchor, dan Merkle witness. |
| 5 | Prover and Signer | Menjalankan pembuatan proof zero-knowledge dan penandatanganan kriptografis. Dalam versi PCZT modern, kedua tugas ini sepenuhnya independen dan dapat terjadi secara berurutan atau paralel. |
| 6 | Combiner | Menggabungkan beberapa instance PCZT secara deterministik jika perangkat berbeda mengerjakan aspek transaksi yang sama secara bersamaan. Aturan penggabungan memerlukan resolusi konflik yang ketat untuk mencegah kehilangan data secara tidak sengaja. |
| 7 | Spend Finalizer & Extractor | Memvalidasi seluruh elemen kriptografis yang diperlukan, menghapus metadata konteks perantara, dan menghasilkan transaksi Zcash final yang siap disiarkan ke network. |

## Implementasi Dompet Hardware di Dunia Nyata

### Sekilas

| Perangkat   | Yang diterima pendamping              | Yang tetap berada di perangkat          | Transport      |
|----------|------------------------------------------|-----------------------------------|----------------|
| Ledger   | UFVK / Orchard FVK, alamat            | Otoritas pengeluaran                | USB / BLE      |
| Keystone | UFVK + Unified Address                   | Seed / spending keys              | QR (air-gapped)|
| Hito     | UFVK, Unified Address, fingerprint seed  | Seed dan private spending keys    | QR / lokal     |


Beberapa implementasi dompet hardware telah dikembangkan untuk mengeksplorasi cara transaksi terlindungi Zcash dapat didukung sambil menjaga spending keys sensitif tetap terisolasi dari dompet pendamping. Ledger, Keystone, dan Hito merepresentasikan pendekatan berbeda untuk mengintegrasikan perlindungan kunci berbasis hardware dengan alur kerja transaksi Zcash.

![Real world hardware wallet implementations](/content-images/hardware-wallet-implementations.webp)

Untuk memahami bagaimana perangkat tersebut melindungi dana terlindungi, penting untuk membedakan spending keys dan viewing keys. Di ketiganya, pemisahannya mengikuti bentuk yang sama:

| Perangkat | Yang dapat diterima aplikasi pendamping | Yang tetap terlindungi pada perangkat |
|---|---|---|
| Ledger | UFVK / Orchard FVK, alamat dan informasi publik | Otoritas pengeluaran / materi private key |
| Keystone | UFVK + Unified Address | Seed / spending keys |
| Hito | UFVK, Unified Address, fingerprint seed dan informasi network | Seed dan private spending keys |

### Ledger sebagai Lingkungan Penandatanganan Hardware

Ledger adalah perusahaan dompet hardware. Perangkatnya dibangun di sekitar Secure Element, yaitu chip khusus yang dirancang untuk menyimpan materi private key dan menjaganya tetap terisolasi secara fisik dari bagian perangkat lainnya maupun segala sesuatu yang terhubung dengannya. Secure Element itulah alasan utama perangkat Ledger dapat dipercaya untuk cold storage. Artinya, bahkan jika komputer atau ponsel yang terhubung dengannya dikompromikan, kunci di dalam Secure Element tidak dapat diekstrak.

Namun, perangkat Ledger sendiri kosong terkait cryptocurrency tertentu. Perangkat tersebut membutuhkan aplikasi yang terpasang dan mengetahui cara menangani kriptografi khusus mata uang tersebut.

Perangkat Ledger kosong terkait cryptocurrency tertentu, sehingga memerlukan aplikasi yang mengetahui kriptografi mata uang itu. Untuk Zcash, terdapat dua generasi:

- Aplikasi “Zcash Shielded” asli yang dibangun oleh Zondax, digunakan dengan dompet pendamping seperti Zkool dan sedang ditarik pada 5 November 2026, serta
- Aplikasi Zcash terbaru milik Ledger (3.9.4+), yang digunakan secara native oleh Ledger Wallet Desktop 4.21+ untuk Ironwood terlindungi ZEC.

Model isolasi kunci di bawah berlaku untuk keduanya.

Zkool adalah dompet pendamping di ponsel atau komputer Anda yang berkomunikasi dengan aplikasi tersebut. Dompet ini membangun transaksi, mengirimkannya ke Ledger, kemudian aplikasi Zondax pada perangkat menandatanganinya dan mengirimkan tanda tangan kembali.

Jadi, Zondax adalah perangkat lunak yang berjalan pada hardware, sedangkan Zkool adalah perangkat lunak yang berjalan di luar hardware dan menggunakan aplikasi Zondax untuk berkomunikasi dengan perangkat.

### Apa yang meninggalkan Ledger?

Perangkat lunak Zcash milik Ledger mencakup fungsi khusus untuk mengekspor viewing key dompet, yaitu kunci yang memungkinkan perangkat lunak melihat saldo dan transaksi tanpa dapat membelanjakan apa pun.

Fungsi ini dapat mengembalikan salah satu dari dua hal:

- Unified Full Viewing Key (UFVK), yaitu full viewing key yang mencakup seluruh pool terlindungi Zcash sekaligus, atau
- Orchard Full Viewing Key (FVK)

Bagaimanapun, yang keluar selalu hanya viewing key. Apa pun versi yang Anda minta, fungsi ini tidak memiliki cara untuk mengembalikan satu informasi yang benar-benar dapat membuat seseorang memindahkan dana, yaitu spending key.

Itulah inti cara sistem ini dibangun: sistem dirancang sehingga satu-satunya hal yang dapat diekspornya adalah sesuatu yang aman untuk diberikan kepada aplikasi pendamping.

Hierarki kunci Zcash disusun sedemikian rupa sehingga untuk setiap pool terlindungi, spending key menurunkan dua hal terpisah:

- Spend-authorizing key, dan
- Full viewing key

FVK kemudian dapat menurunkan kemampuan terkait viewing lainnya, tetapi jalur derivasi tersebut tidak pernah kembali ke otoritas pengeluaran. Setelah suatu kunci bercabang ke sisi viewing dalam hierarki, kunci itu tetap berada di sana dan tidak dapat digunakan untuk merekonstruksi kunci otoritas pengeluaran asalnya.

Ironwood mengikuti pola yang sama karena menggunakan kembali konstruksi kunci dan note dasar Orchard. Namun, pool ini berbeda pada tingkat konsensus, dengan commitment tree dan kumpulan nullifier sendiri. Artinya, UFVK sebenarnya adalah bundel viewing key per pool (transparan, Sapling, Orchard, dan kini Ironwood), bukan satu kunci datar.

UFVK yang diekspor sebelum Ironwood diaktifkan tidak akan mencakup viewing key Ironwood, karena pool tersebut belum ada. Inilah alasan tepatnya dompet perlu diperbarui untuk mengenali dan menurunkan UFVK yang mendukung Ironwood setelah peningkatan NU6.3.

### Apa yang tetap berada pada Ledger?

Otoritas pengeluaran tetap berada pada perangkat.

Signer Ledger menerima transaksi/PCZT dari host dan menghasilkan tanda tangan otorisasi pengeluaran tergantung pool asal pengeluaran transaksi tersebut (pool Ironwood karena integrasi saat ini Ledger hanya mendukung Ironwood). Tanda tangan kemudian dihasilkan pada perangkat, dan host hanya menerima tanda tangan, bukan private spending key.

Hal ini juga konsisten dengan model keamanan umum Ledger. Secure Element-nya mengisolasi materi private key, dan persyaratan keamanan aplikasi Ledger secara khusus melarang aplikasi mengekspos rahasia tersebut kepada host.

Signer Ledger dapat mengekspor FVK/UFVK sambil secara independen melakukan penandatanganan transaksi. Kedua kemampuan tersebut disediakan melalui fungsi terpisah, bukan digabungkan dalam satu fungsi.

### Apa artinya dalam praktik?

Misalkan Ledger Anda berisi 10 ZEC.

Dompet pendamping dapat memiliki UFVK dan dengan demikian menentukan: "Dompet ini telah menerima 10 ZEC." Dompet ini dapat memindai dan menampilkan transaksi serta saldo.

Namun, jika seseorang mengompromikan dompet pendamping, UFVK saja tidak memberi mereka kemampuan untuk membuat tanda tangan otorisasi pengeluaran.

Tujuan tanda tangan otorisasi pengeluaran yang terpisah adalah memungkinkan perangkat terbatas seperti dompet hardware mengotorisasi pengeluaran terlindungi tanpa harus melakukan seluruh proof zk-SNARK sendiri.

### Aplikasi Zondax Ledger; sisi dompet hardware

#### Apa itu Zondax?

Zondax adalah perusahaan development pihak ketiga yang membangun aplikasi Ledger Zcash. Ini adalah aplikasi firmware sebenarnya yang berjalan pada hardware Ledger dan memberi perangkat kemampuan untuk memahami serta memproses transaksi Zcash.

Zondax adalah developer eksternal. Hardware Ledger tidak memiliki kemampuan bawaan untuk memproses transaksi Zcash, dan kemampuan itu sepenuhnya berasal dari perangkat lunak Zondax.

### Implementasi asli Zcash Ledger

Repositori aplikasi Ledger Zcash milik Zondax adalah perangkat lunak yang berjalan pada perangkat Ledger. Aplikasi ini awalnya berfokus pada transaksi terlindungi Sapling, sebelum Orchard ada sebagai pool terlindungi utama Zcash, sehingga dukungan Sapling merupakan batas kemampuan perangkat Ledger untuk ZEC terlindungi.

Arsitekturnya menggambarkan pemisahan tersebut, dengan sisi host/pendamping mempersiapkan informasi transaksi sementara Ledger menangani operasi kunci sensitif dan penandatanganan.

Bahkan dalam versi paling awal dukungan dompet hardware Zcash ini, prinsip inti—pembangunan dan proving di host, lalu penandatanganan terisolasi pada perangkat—sudah menjadi desainnya.

### Evolusi menuju Orchard

Pekerjaan Ledger beralih menuju Orchard + PCZT. Ini merupakan transisi berarti, bukan pembaruan kecil, mengingat Orchard menggunakan sistem proving yang berbeda (Halo 2, dibandingkan Groth16 milik Sapling) dan konstruksi note serta kunci yang berbeda, sehingga memperluas firmware yang hanya mendukung Sapling untuk menangani penandatanganan Orchard membutuhkan dasar kriptografis baru pada sisi perangkat, bukan sekadar patch firmware.

Namun, ketika Zcash bergerak menuju Ironwood, Zondax dan Ledger mengalihkan fokus development mereka untuk mendukung Ironwood secara langsung, alih-alih menyelesaikan implementasi Orchard hanya untuk kemudian mendesain ulangnya bagi Ironwood. Ini merupakan tahap selanjutnya dalam evolusi implementasi Ledger, karena Ironwood dibangun di atas arsitektur kriptografis Orchard sambil memperkenalkan pool terlindungi terpisah dan perubahan protokol tambahan.

### Apa yang terjadi di dalam aplikasi Ledger ini

Alur yang dihasilkan dijelaskan sebagai berikut:

1. Host membangun PCZT.
2. Host mengirim informasi transaksi yang relevan ke perangkat Ledger.
3. Perangkat menghasilkan tanda tangan spend-authorizing Orchard.
4. Host menangani semua proses setelahnya, termasuk binding signature dan perakitan transaksi akhir.

Aplikasi yang berjalan di dalam Ledger tidak pernah melihat atau menghasilkan apa pun selain tanda tangan otorisasi pengeluaran itu sendiri, dan seluruh pekerjaan yang berat secara komputasional atau membutuhkan banyak data—proving, binding, perakitan—tetap berada di host, yang tidak perlu dipercaya dengan materi kunci.

### Integrasi terlindungi native Ledger; Ledger Wallet Desktop

Integrasi Zcash terbaru milik Ledger memberikan contoh konkret mengenai bagaimana pembangunan transaksi terlindungi dan penandatanganan yang penting bagi keamanan dapat dipisahkan antara perangkat lunak pendamping dan dompet hardware.

Dengan Ledger Wallet Desktop 4.21+ dan aplikasi perangkat Zcash 3.9.4+, pengguna dapat mengirim dan menerima Ironwood terlindungi ZEC secara langsung melalui Ledger Wallet Desktop. Integrasi ini mendukung transfer pribadi-ke-pribadi, shielding dari pool transparan, unshielding ke pool transparan, alamat penerimaan pribadi, dan memo. Transaksi diverifikasi dan ditandatangani pada perangkat Ledger, alih-alih hanya mengandalkan informasi yang ditampilkan komputer.

Bagian penting dari arsitektur ini adalah pemisahan kemampuan viewing dan pengeluaran. Selama sinkronisasi saldo pribadi, Ledger mengekspor Unified Full Viewing Key (UFVK), yang disimpan secara lokal di komputer. UFVK memungkinkan Ledger Wallet Desktop mendeteksi transaksi terlindungi yang relevan dan menentukan saldo dompet, tetapi tidak memberikan otoritas untuk membelanjakan dana. Otoritas pengeluaran yang penting bagi keamanan tetap berada pada perangkat Ledger, yang melakukan operasi penandatanganan akhir. Hal ini menciptakan batas yang jelas antara komputer, yang mengelola status dompet dan membangun transaksi, dengan perangkat hardware, yang melindungi kemampuan yang diperlukan untuk mengotorisasi pengeluaran.

Namun, integrasi saat ini secara khusus hanya untuk Ironwood. Integrasi ini tidak menampilkan atau mengelola dana Orchard atau Sapling melalui Ledger Wallet Desktop. Hal ini penting secara historis karena development Zcash sebelumnya milik Ledger dikaitkan dengan dukungan terlindungi Orchard sebelum implementasinya berkembang menuju protokol Ironwood.

Transisi ini juga menyoroti pentingnya kompatibilitas kunci dan akun. Ledger memiliki aplikasi “Zcash Shielded” yang lebih lama, dikembangkan oleh Zondax dan digunakan oleh integrasi seperti YWallet serta zkool, yang kini sedang dihentikan. Karena aplikasi lama tersebut menggunakan skema derivasi berbeda untuk akun terlindungi, akun Sapling-nya tidak dapat begitu saja direproduksi oleh aplikasi Ledger baru.

Oleh karena itu, integrasi ini menggambarkan kemajuan sekaligus keterbatasan yang masih ada pada dukungan dompet hardware terlindungi. Ledger kini dapat menyediakan pengalaman Ironwood penuh, ketika perangkat lunak pendamping menangani sinkronisasi dompet dan persiapan transaksi sementara perangkat hardware tetap menjadi batas keamanan untuk pengeluaran.

Pada saat yang sama, kompatibilitas akun historis, dukungan hanya untuk pool terlindungi tertentu, batas ukuran transaksi hardware, pembatasan platform, serta kendala komputasional dan firmware dalam parsing serta verifikasi transaksi terlindungi menunjukkan bahwa dukungan dompet hardware untuk Zcash tidak hanya bergantung pada kemampuan protokol, tetapi juga pada desain dan sumber daya setiap implementasi individual.

### Zkool + Ledger — menggunakan aplikasi resmi Zondax

Sebagai penerus Ywallet, Zkool mewarisi tujuan penandatanganan dingin terlindungi tetapi mengambil jalur berbeda untuk mencapainya, jalur yang dibentuk langsung oleh fakta bahwa kriptografi saja tidak membuat integrasi dapat digunakan apabila aplikasi penandatanganan tidak dapat didistribusikan dengan aman.

https://youtu.be/eagkCIv3BlQ?si=7w5YfLlRER77bASw

### Penggunaan aplikasi Zondax oleh Zkool

Zkool beralih menggunakan aplikasi Ledger Zcash resmi yang dikembangkan oleh Zondax, alih-alih aplikasi Ledger proprietary yang ditinggalkan oleh Ywallet. Alih-alih mempertahankan aplikasi kustom yang tidak akan diterima toko Ledger, Zkool membangun di atas aplikasi yang telah diterima dan didistribusikan melalui ekosistem Ledger sendiri.

Perubahan tersebut berarti pengguna tidak lagi perlu mengandalkan instalasi aplikasi Ledger kustom yang tidak ditandatangani untuk menggunakan integrasi ini, karena aplikasi Zondax didistribusikan secara resmi melalui ekosistem Ledger.

Namun, integrasi ini menghadapi perubahan penting pada 5 November 2026, ketika dukungan untuk aplikasi legacy Zcash Shielded dijadwalkan berakhir seiring Ledger menghentikannya secara bertahap. Karena integrasi Ledger milik Zkool bergantung pada aplikasi ini, perubahan tersebut menimbulkan pertanyaan mengenai ketersediaan koneksi yang ada di masa depan. Dampak tepatnya terhadap Zkool bergantung pada apakah aplikasi tersebut dapat terus menggunakan aplikasi legacy di luar Ledger Wallet atau beralih ke alternatif yang kompatibel.

### Pool terlindungi yang didukung

Menurut developer Ywallet, integrasi Ledger milik Zkool menggunakan aplikasi resmi Ledger yang dikembangkan oleh Zondax dan mendukung Zcash transparan maupun terlindungi. Namun, dukungan terlindunginya terbatas pada Sapling dan tidak mendukung Orchard, di samping keterbatasan integrasi lain seperti maksimum lima input dan output dari setiap jenis serta tidak adanya kompatibilitas Ledger Live.

Keterbatasan ini mencerminkan cakupan implementasi Zondax Ledger yang mendasarinya pada waktu itu. Pekerjaan Ledger sebelumnya oleh Zondax menyediakan dukungan Sapling, dan rilis aplikasi Ledger Shielded Zcash berikutnya pada 2024 awalnya mengecualikan Orchard dan Unified Addresses. Oleh karena itu, integrasi yang dibangun di sekitar aplikasi tersebut mewarisi kemampuan dan keterbatasan implementasi dompet hardware yang menjadi ketergantungannya.

Situasinya kemudian berkembang dengan rilis aplikasi Ledger Shielded Zcash khusus pada November 2024. Zondax menyatakan bahwa aplikasi tersebut telah dirilis resmi melalui Ledger Live dan kemudian menerbitkan panduan integrasi serta paket Rust dan JavaScript agar dompet lain dapat berintegrasi dengannya. Namun, saat peluncuran, aplikasi tersebut berkomunikasi secara eksklusif dengan Zecwallet Lite Desktop, sementara integrasi dompet yang lebih luas masih dikembangkan.

Tahap berikutnya adalah development aplikasi Rust berbasis Ledger yang lebih baru milik Zcash. Pada Juni 2026, Ledger melaporkan bahwa berbagi UFVK dan pembuatan Orchard Unified Address telah diimplementasikan, sementara penandatanganan transaksi Orchard dan ClearSign masih dalam development. Ledger juga menyatakan bahwa pekerjaan tersebut akan diteruskan ke jalur Ironwood seiring perubahan protokol.

Ironwood kemudian memerlukan pembaruan di seluruh ekosistem dompet Zcash. Zkool merilis dukungan migrasi Orchard ke Ironwood mulai versi 6.24.0, dan terus menyempurnakan migrasi serta pipeline transaksi pada rilis berikutnya. Ledger, secara terpisah, menggabungkan penandatanganan PCZT v2 ke aplikasi barunya pada 27 Juli, meskipun implementasinya belum menyelesaikan peninjauan Ledger dan peluncuran Ledger Live pada 20 Agustus, sebuah tonggak yang sejak itu telah dirilis, dengan Ledger Wallet Desktop 4.21+ kini menawarkan dukungan native Ironwood secara langsung.

https://forum.zcashcommunity.com/t/a-path-forward-for-ledger-and-zcash/50951/177

Dengan demikian, evolusinya lebih tepat dipahami bukan sebagai satu peningkatan Zondax-ke-Ironwood, melainkan sebagai beberapa perkembangan terkait: implementasi Zondax asli yang berfokus pada Sapling, aplikasi Ledger Shielded Zcash pada 2024, aplikasi Ledger Rust yang lebih baru dengan dukungan Orchard dan PCZT, integrasi native Ledger sendiri di Ledger Wallet Desktop, serta pembaruan paralel terhadap dompet seperti Zkool ketika ekosistem beralih ke Ironwood.

### Dukungan perangkat dan platform Ledger saat ini untuk Zcash

Dukungan Zcash pada Ledger bergantung pada

- Model perangkat
- Aplikasi yang terpasang
- Platform yang digunakan untuk mengelolanya, dan
- Apakah transaksi bersifat transparan atau terlindungi.

Per 21 Juli 2026 (pembaruan terakhir Ledger), aplikasi Zcash Shielded didukung pada Nano S Plus, Stax, dan Flex, tetapi belum pada Nano X atau Nano Gen5.

Nano X dan model lainnya kecuali Nano S asli masih dapat menggunakan aplikasi Zcash klasik, yang mendukung transaksi transparan dan pembelanjaan dana terlindungi ke alamat transparan (deshielding), tetapi bukan penandatanganan terlindungi-ke-terlindungi. Nano S asli tidak mendukung kedua aplikasi tersebut karena Ledger sedang menghentikan dukungan untuk perangkat ini dan aplikasi Zcash terbarunya tidak tersedia di perangkat tersebut. Perangkat terhubung ke Ledger Wallet, sebelumnya Ledger Live, yaitu aplikasi pendamping Ledger, yang tersedia di desktop untuk Windows, macOS, dan Linux serta di perangkat seluler untuk iOS dan Android.

Ledger telah menambahkan Zcash terlindungi native ke Ledger Wallet Desktop, yang dibangun di atas pool Ironwood, sehingga menghilangkan kebutuhan akan dompet pendamping terpisah. ZEC terlindungi belum didukung pada aplikasi seluler Ledger untuk iOS dan Android, walaupun dukungan seluler direncanakan untuk rilis mendatang.

Di luar perangkat lunak milik Ledger sendiri, penggunaan terlindungi bergantung pada dompet pendamping yang kompatibel dan platform yang didukungnya. Seiring Ledger terus memperluas dukungan Ironwood, kompatibilitas bergantung pada model perangkat, firmware, versi aplikasi, dan sistem operasi, sehingga dukungan Zcash secara umum tidak selalu menjamin kompatibilitas.

https://www.youtube.com/watch?v=VhkhfG0LCFs

### Penandatanganan dingin YWallet; pendekatan sebelumnya

Ywallet adalah dompet pendamping, terpisah dari Ledger dan Zondax, yang menempuh jalurnya sendiri menuju penandatanganan dingin terlindungi.

Ywallet penting secara historis karena mengeksplorasi penandatanganan dingin untuk Zcash, yang berarti perangkat penandatanganan dapat dijaga terpisah dari dompet online.

Untuk mewujudkan arsitektur tersebut pada hardware Ledger, Ywallet membangun aplikasi Ledger miliknya sendiri, sebuah aplikasi proprietary yang berbeda dari aplikasi Zondax yang dibahas pada bagian sebelumnya. Artinya, Ywallet tidak mengandalkan implementasi Sapling yang sudah ada milik Zondax; perangkat ini memiliki firmware sendiri yang menjalankan sisi penandatanganan dari hubungan tersebut.

### Mengapa integrasi tersebut penting

Memiliki kriptografi dan kode penandatanganan saja tidak cukup. Integrasi dompet hardware bukan semata masalah kriptografis, tetapi juga masalah distribusi dan platform yang tidak terelakkan. Setidaknya, integrasi ini melibatkan:

- Persetujuan/distribusi aplikasi — apakah toko aplikasi resmi produsen hardware akan menerima dan mendistribusikan aplikasi
- Keamanan firmware/aplikasi — apakah aplikasi memenuhi persyaratan keamanan produsen untuk menangani materi kunci
- Protokol komunikasi — bagaimana dompet pendamping dan perangkat sebenarnya bertukar data transaksi
- Kompatibilitas dengan dompet — apakah format data dan alur aplikasi penandatanganan sesuai dengan yang diharapkan dompet pendamping
- Pool terlindungi yang didukung — pool mana dari Sapling, Orchard, dan kini Ironwood yang sebenarnya dapat ditandatangani oleh aplikasi

Aplikasi Ledger proprietary milik Ywallet memenuhi persyaratan kriptografis dan arsitektural; aplikasi ini dapat menandatangani transaksi Zcash terlindungi, tetapi tidak diterima di toko aplikasi resmi Ledger.

### Transisi meninggalkan aplikasi Ledger proprietary

Karena aplikasi tidak diterima secara resmi, Ywallet harus meminta pengguna memasang firmware tanpa tanda tangan untuk menggunakannya. Ini adalah kompromi keamanan nyata bagi pengguna, dan Ywallet memilih untuk tidak meminta hal tersebut kepada mereka. Jadi, Ywallet akhirnya menghentikan integrasi tersebut alih-alih menempuh jalur itu.

Alih-alih menghidupkan kembali aplikasi proprietary, development berikutnya melalui Zkool, penerus Ywallet, beralih ke aplikasi Ledger resmi yang dibangun Zondax, menukar implementasi kustom yang ditolak dengan implementasi terstandarisasi yang telah diterima ke dalam ekosistem distribusi Ledger. Pergeseran inilah yang pada akhirnya memungkinkan integrasi Ledger yang berfungsi kembali.

### Warisan Ywallet

Bahkan setelah Ywallet sendiri mundur dari development aktif, penciptanya, Hanh, yang juga merupakan anggota ZCG, tetap menjadi suara yang relevan di ekosistem, khususnya ketika migrasi Ironwood memunculkan laporan masalah seputar dana yang tampak menghilang.

**ZODL: pengguna nyata mengalami dana yang hilang setelah migrasi Orchard → Ironwood**

Seorang pengguna, Jmo0615, melaporkan bahwa dana yang sebelumnya terlihat di dompet ZODL mereka tidak lagi muncul setelah migrasi Orchard ke Ironwood. Mereka menyatakan telah memulihkan seed asli, mereset dan memulihkan dompet, serta membiarkan ZODL versi 3.14.1 (1) tersinkronisasi sepenuhnya. Mereka juga menegaskan bahwa tidak ada dompet hardware Keystone yang terlibat.

Belum dapat dipastikan bahwa dana tersebut benar-benar hilang. Sebaliknya, masalah ini diduga terkait penemuan dompet atau migrasi, ketika dana yang sebelumnya terlihat tidak lagi ditampilkan setelah transisi ke Ironwood. Dana yang tidak terdeteksi atau ditampilkan seharusnya tidak secara otomatis digambarkan sebagai dana yang hilang permanen, dan perbedaan ini penting untuk memahami masalah migrasi.

https://forum.zcashcommunity.com/t/funds-not-showing-since-ironwood/57792

**Zkool: "note terkunci" dapat menjelaskan dana yang tampaknya tidak tersedia**

Aspek penting lain dari dompet terlindungi adalah bagaimana status dompet dapat memengaruhi dana yang benar-benar dapat dibelanjakan pengguna. Hanh menjelaskan bahwa pengguna dapat secara tidak sengaja mengunci note melalui coin control, sebuah fitur yang memungkinkan pengguna memilih note secara manual untuk digunakan dalam pengeluaran. Dalam situasi ini, note mungkin masih ada di dompet tetapi ditandai tidak tersedia untuk dibelanjakan.

Hal ini menyoroti perbedaan penting ketika menyelidiki masalah dompet. Jumlah ZEC yang ada di dompet tidak selalu sama dengan jumlah yang saat ini tersedia untuk dibelanjakan. Faktor seperti pemilihan note, sinkronisasi, status migrasi, pemulihan dompet, dan pengaturan coin control dapat memengaruhi saldo yang ditampilkan atau dapat dibelanjakan. Oleh karena itu, laporan “dana hilang” perlu dibedakan dengan cermat antara dana yang tidak terdeteksi atau ditampilkan, dana yang terdeteksi tetapi tidak tersedia untuk dibelanjakan, dan dana yang benar-benar hilang.

https://youtube.com/shorts/eAOMRVYJFTA?si=xytBs-wZKn8hmu8D

## 2. Keystone

**Apa itu Keystone?**

Keystone adalah dompet hardware air-gapped. Perangkat penandatanganannya tidak memiliki koneksi kabel atau nirkabel langsung ke aplikasi pendamping selama proses penandatanganan itu sendiri, dan berkomunikasi melalui kode QR. Di sini perangkat dipasangkan dengan Zashi, yang kini berganti merek menjadi Zodl, yaitu dompet pendamping native Zcash, dan pasangan ini membuat prinsip isolasi kunci sangat eksplisit dan mudah ditelusuri.

**Alur Keystone/Zashi**

Integrasi Zcash milik Keystone dengan Zashi membuat pemisahan ini sangat eksplisit. Ketika Anda menghubungkan Keystone ke Zashi, Unified Full Viewing Key ditransfer dari Keystone ke Zashi.

Jadi alurnya adalah:

![Keystone and Zashi viewing flow](/content-images/keystone-zashi-viewing-flow.webp)

**Apa yang dapat dilakukan Zashi dengan UFVK?**

Zashi dapat menggunakannya untuk:

- mengidentifikasi transaksi terlindungi masuk
- menentukan saldo
- memperoleh informasi mengenai aktivitas terlindungi

Namun, dompet ini tidak dapat membelanjakan dana hanya karena memiliki UFVK.

UFVK adalah "kemampuan viewing" yang memungkinkan mengetahui saldo dan transaksi tetapi tidak memungkinkan pengeluaran.

### Apa yang tetap berada di dalam Keystone?

Otoritas seed/pengeluaran tetap berada pada Keystone. Zashi tidak menerima seed, spending key, atau private key otorisasi pengeluaran. Dompet ini menerima UFVK, informasi alamat, dan informasi yang diperlukan untuk operasi view-only.

Bersama-sama, kedua bagian ini melengkapi gambaran. Apa yang meninggalkan perangkat, seperti UFVK, alamat, dan informasi watch-only, cukup bagi Zashi untuk memantau akun, tetapi tidak ada yang meninggalkan perangkat cukup untuk memindahkan dana keluar dari perangkat.

Inilah alasan integrasi Zashi dan Keystone dapat menyediakan cold storage terlindungi. Aplikasi dompet dapat memantau akun tanpa memiliki otoritas yang diperlukan untuk membelanjakannya. Integrasi ini secara khusus diluncurkan untuk memungkinkan cold storage ZEC terlindungi.

Ketika Anda ingin membelanjakan:

![Keystone and Zashi spending flow](/content-images/keystone-spend-flow.webp)

## 3. Hito

Hito mengikuti model isolasi kunci yang sangat mirip dengan Keystone, tetapi implementasinya lebih baru. Alih-alih dipasangkan dengan dompet pendamping yang ada seperti Zashi, Hito hadir dengan dompet Android sendiri, dan proses onboarding antara perangkat hardware serta aplikasi Android tersebut didokumentasikan dalam tonggak development Hito.

**Onboarding: apa yang diterima aplikasi Hito**

Dompet Android menggunakan:

- Unified Full Viewing Key (UFVK)
- Unified Address
- fingerprint seed ZIP-32
- informasi network

saat melakukan onboarding akun hardware.

Perlu diperhatikan bahwa aplikasi Android tidak pernah menerima seed atau private spending keys dompet hardware.

![Hito onboarding](/content-images/hito-onboarding.webp)

**Apa yang diperoleh aplikasi Hito?**

Informasi onboarding yang didokumentasikan mencakup:

- UFVK
- Unified Address
- fingerprint seed ZIP-32
- Network

UFVK memberi dompet Android informasi yang diperlukan untuk mengoperasikan akun sebagai dompet dengan kemampuan viewing tanpa menerima seed. Fingerprint seed adalah pengenal berukuran tetap yang diturunkan dari seed dan digunakan untuk mengenali akun, bukan seed itu sendiri serta tidak memberikan kemampuan pengeluaran, sehingga keberadaannya tidak bertentangan dengan klaim "tidak pernah menerima seed" di atas.

**Apa yang tetap berada pada Hito?**

Seed sebenarnya, private spending keys, dan otoritas penandatanganan tetap berada pada perangkat hardware. Hito kemudian melakukan penandatanganan secara offline.

Tonggak Hito saat ini menyatakan bahwa seluruh alur kerja pembuatan, ekspor, penandatanganan offline, dan impor telah beroperasi, dengan transport BLE dan ekspor QR BBQr dari PCZT yang telah ditandatangani.

Alur kerja tersebut layak disebutkan secara eksplisit karena merupakan contoh konkret siklus lengkap yang dibahas sebelumnya dalam laporan ini: dompet Android membuat PCZT tanpa tanda tangan, mengekspornya ke Hito, Hito menandatangani secara offline dengan materi kunci yang terisolasi, dan PCZT yang telah ditandatangani diimpor kembali ke dompet Android.

Tidak pernah seed atau spending key melintasi batas tersebut ke arah mana pun.

![Hito signing flow](/content-images/hito-signing-flow.webp)

## Orchard ke Ironwood: Evolusi Dukungan Dompet Hardware

Orchard adalah pool terlindungi dalam protokol Zcash yang memungkinkan pengguna menyimpan dan mentransaksikan ZEC dengan privasi yang lebih kuat. Diperkenalkan dalam Network Upgrade 5 (NU5), Orchard menggunakan sistem proving Halo 2 dan arsitektur kriptografis yang didesain ulang untuk mendukung transaksi terlindungi tanpa mengungkapkan informasi transaksi sensitif seperti pengirim, penerima, atau jumlah.

Ironwood adalah pool terlindungi yang diperkenalkan dalam peningkatan jaringan NU6.3 milik Zcash sebagai penerus pool Orchard. Pool ini menggunakan protokol kriptografis Orchard sambil memperkenalkan perubahan yang dirancang untuk meningkatkan keamanan jangka panjang dana terlindungi, termasuk pemulihan kuantum dan jaminan yang lebih kuat mengenai integritas pasokan.

Sejak awal, penting untuk menjelaskan bahwa Ironwood tidak menggantikan protokol Orchard dengan sistem kriptografis yang sepenuhnya baru. Ironwood diperkenalkan sebagai pool terlindungi baru yang dibangun dari protokol Orchard yang sudah ada. Artinya, keduanya memiliki struktur Action yang sama, sistem proving Halo 2 yang sama, serta konstruksi note dan kunci yang sama.

Ironwood memiliki note commitment tree, kumpulan nullifier, anchor, dan value pool sendiri, sehingga pada tingkat konsensus pool ini benar-benar terpisah. Namun secara kriptografis, pool ini merupakan perluasan dari Orchard, bukan pembangunan ulang.

Pool ini dirancang demikian untuk:

1. **Integritas pasokan.** Pada 29 Mei 2026, peneliti keamanan Taylor Hornby secara pribadi mengungkapkan cacat soundness kritis dalam sistem proof zero-knowledge Orchard, yang dapat memungkinkan pembuatan ZEC palsu tanpa meninggalkan jejak on-chain. Karena data transaksi Orchard bersifat pribadi, tidak seorang pun dapat memverifikasi secara independen bahwa tidak ada ZEC palsu yang dibuat sebelum perbaikan. Menutup pool lama dan memulai pool baru dari nol menyelesaikan masalah tersebut dengan cara yang tidak dapat dilakukan dengan menambal Orchard di tempat.
2. **Memastikan pemulihan kuantum.** Ironwood dirancang agar dananya dapat ikut serta dalam mekanisme pemulihan masa depan jika asumsi discrete log yang mendasarinya pernah rusak.
3. **Meminimalkan perubahan implementasi.** Alih-alih merancang protokol terlindungi yang sepenuhnya baru, arsitektur terbukti Orchard digunakan kembali. Artinya, jauh lebih sedikit kode transaksi, proving, dompet, dan dompet hardware baru yang perlu ditulis dari awal.

### Linimasa publik

- 29 Mei: Kerentanan Orchard diungkapkan.
- Juni: Transaksi Orchard dibatasi sementara selama perbaikan awal dirilis melalui NU6.2. Pada 12 Juni, seorang core developer menargetkan 21 Juli untuk peningkatan penuh; jadwal kemudian mundur satu minggu. Kekhawatiran komunitas muncul bahwa pemilik Keystone akan menjadi pihak terakhir yang bermigrasi, lalu seorang core developer menanggapi bahwa Keystone akan mendukung Ironwood sejak hari pertama, dengan firmware ditargetkan pada 3 Juli, menunggu konstanta penandatanganan final dan perubahan API Orchard dari core Zcash.
- Awal Juli: NU6.3 mencapai testnet; Zebra 6.0.0 dirilis pada 10 Juli.
- 27–28 Juli: Pekerjaan penandatanganan Ironwood PCZT v2 milik Ledger digabungkan ke cabang integrasi. Ironwood (NU6.3) diaktifkan pada 28 Juli di blok 3.428.143, menutup pool Orchard asli di belakang turnstile yang membatasi jumlah ZEC yang dapat keluar dari Orchard hingga jumlah yang secara sah disetorkan ke dalamnya, serta memperkenalkan format transaksi baru.

Zebra menjadi node yang diperlukan, karena zcashd tidak mendukung aturan konsensus baru. Alamat tidak berubah karena Ironwood menggunakan kembali struktur receiver Orchard, sehingga dompet mengarahkan alamat yang ada ke pool baru secara otomatis. Yang dibutuhkan dompet adalah fungsi migrasi, karena dana Orchard pada akhirnya harus dipindahkan ke Ironwood oleh pemiliknya, dan output baru yang menerima Orchard kini sepenuhnya diblokir oleh konsensus.

### Perubahan teknis

Format transaksi berpindah dari versi 5 ke versi 6, sehingga satu transaksi dapat membawa komponen Ironwood bersama komponen Sapling/Orchard/transparan yang sudah ada. PCZT diperluas seiring perubahan tersebut:

- Encoding berubah dari PCZT v1 menjadi v2.
- Bundle Ironwood terpisah kini berada bersama bundle Sapling dan Orchard.
- Transaksi v6 dan sighash v6 baru didukung.
- Plaintext note memperoleh versi baru (V3).

Perubahan sighash paling penting khususnya bagi dompet hardware. Dalam v6, anchor Orchard dan Ironwood dikecualikan dari signature hash dan hanya masuk ke authorizing data digest. Ini adalah perubahan firmware nyata, bukan sekadar peningkatan versi. Perangkat harus mengimplementasikan sighash baru dengan benar dan menghitung ulang sendiri, alih-alih memercayai apa yang diklaim aplikasi pendamping sedang disetujui.

Kontrak isolasi itu sendiri tidak berubah: perangkat tetap hanya mengembalikan tanda tangan otorisasi pengeluaran, tidak pernah `alpha`, dan tidak pernah menghasilkan binding signature; host juga tetap menangani proving serta semua hal lainnya.

Namun, satu aturan signer berubah pada v6: dummy padding spend ditandatangani oleh IO Finalizer, bukan perangkat, karena perangkat tidak memiliki cara untuk memverifikasinya terhadap data note nyata. Peran Signer perangkat melewatinya alih-alih diminta menandatangani sesuatu yang tidak dapat diperiksa. Biaya yang ditampilkan kini juga menjumlahkan kedua saldo nilai Orchard dan Ironwood, karena transaksi v6 dapat membelanjakan dari kedua pool dalam transaksi yang sama.

Mendapatkan akuntansi pool tersebut dengan benar penting dalam praktik, bukan hanya teori. Bug terbaru pada dompet Zcash milik Brave sendiri merupakan ilustrasi yang berguna: perhitungan biayanya mengasumsikan semua input terlindungi berasal dari pool legacy Orchard, yang menyebabkan Action duplikat dan estimasi biaya yang keliru setiap kali transaksi sebenarnya melibatkan Ironwood. Inilah tepatnya jenis kesalahan yang ingin dicegah oleh prinsip "hitung ulang sendiri, jangan percaya host" di balik penandatanganan dompet hardware. Dompet pendamping melakukan kesalahan pada akuntansi pool dan hanya perangkat yang memeriksa perhitungannya sendiri secara independen yang akan menandainya sebelum menyetujui penandatanganan.

### Posisi setiap signer

**Ledger baru saja mengubah keseluruhan situasi.** Pada 23 September 2026, Ledger merilis dukungan Zcash terlindungi native langsung di dalam Ledger Wallet Desktop, tanpa lagi memerlukan aplikasi pendamping terpisah. Spending key Anda tetap berada pada perangkat, komputer melakukan perhitungan transaksi, dan Anda menyetujui semuanya di layar sebelum ditandatangani. Fitur ini hanya mendukung Ironwood, bukan pool Orchard atau Sapling lama. Kekurangannya adalah aplikasi legacy "Zcash Shielded" yang dibangun oleh Zondax, yang memerlukan dompet pendamping seperti Zkool agar berfungsi, sedang dihentikan. Ledger menarik aplikasi lama tersebut dari ketersediaan pada 5 November, sehingga siapa pun yang masih menggunakannya perlu memindahkan dananya sebelum tanggal tersebut.

**Keystone berada dalam kondisi baik.** Firmware 3.0.2 menambahkan dukungan Ironwood penuh pada Juli, dan itu masih merupakan persyaratan stabil saat ini. Namun, versi tersebut atau yang lebih baru diperlukan untuk menandatangani apa pun.

**Hito telah melampaui tonggak testnet awal.** Perangkat ini berhasil menandatangani dan mengirim transaksi Orchard-ke-Ironwood nyata pertamanya pada hardware fisik, awalnya di testnet. Pembaruan berikutnya mengonfirmasi alur mainnet (Ironwood→Ironwood, Ironwood→Transparan, dan lainnya) pada hardware produksi. Firmware stabil dan rilis yang lebih luas masih dalam proses.

Zondax dan Zkool saat ini masih berubah-ubah. Aplikasi Zondax adalah aplikasi yang dihentikan pada Ledger. Zkool, yang mengandalkan aplikasi tersebut untuk berkomunikasi dengan perangkat Ledger, belum mengindikasikan apa yang akan terjadi pada peran itu ketika aplikasi lama menghilang. Belum jelas apakah perangkat ini tetap relevan bagi pengguna Ledger ke depan, atau masa depannya terutama bersama perangkat lain.

Migrasi itu sendiri merupakan dampak terbesar. Karena jumlah yang melintasi pool bersifat publik, dompet menyebarkan transfer ke denominasi standar dari waktu ke waktu alih-alih memindahkan saldo dalam satu bagian yang terlihat, yang berarti banyak transaksi untuk ditandatangani dalam setiap migrasi, dan inilah alasan penandatanganan batch PCZT sangat penting bagi dompet hardware.

Pekerjaan firmware Ledger juga menghadapi batas hardware: satu pengeluaran note nyata dapat mencapai puluhan ribu syscall kriptografis dalam satu perintah sehingga memicu watchdog perangkat. Perbaikannya memindahkan aritmetika field ke perangkat lunak dan membutuhkan status scratch bersama agar sesuai dengan batas stack Nano X.

https://forum.zcashcommunity.com/t/ironwood-is-here-updated-wallets-libraries-aug-20/56557/40

### Evolusi dalam satu gambar

![The evolution in one picture](/content-images/orchard-to-ironwood-evolution.webp)
