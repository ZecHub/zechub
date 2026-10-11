<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Pemulihan Dana Dompet Zcash

**Mengapa kamu harus menyimpan materi pemulihanmu?**

Frasa pemulihan, spending key, viewing key, dan file dompet tidak dapat saling menggantikan. Sebuah frasa pemulihan dapat menurunkan kunci dompet untuk banyak dompet, tetapi ia tidak menggantikan setiap kunci lama atau file dompet. Sebuah viewing key dapat mengungkap aktivitas terlindungi tetapi tidak dapat mengotorisasi pengeluaran.

Pemulihan bergantung pada kepemilikan otoritas spending yang benar dan jalur yang saat ini didukung untuk pool yang menyimpan dana tersebut. Jaga kerahasiaan materi pemulihan dan jangan pernah membagikan seed phrase, spending key, atau file dompet kepada siapa pun yang tidak kamu percayai.

# Keamanan dan Tanggung Jawab

Sangat penting bagi pengguna untuk memahami risiko yang terlibat dalam menangani private key dan menjaga agar key ini tetap terlindungi dari akses yang tidak sah. Keamanan dana bergantung pada tanggung jawab pengguna untuk menjaga private key mereka.

## Dana terlindungi lama: Sprout, Sapling dan Orchard

ZEC terlindungi yang lebih lama mungkin perlu dimigrasikan sebagai bagian dari pemulihan. Rutenya bergantung pada pool terlindungi mana yang saat ini menyimpan dana tersebut.

> **NU7 direncanakan pada 5 November 2026.** Setelah diaktifkan, jalur migrasi saat ini dari pool Sprout lama akan berhenti berfungsi.
>
> Jika kamu masih memiliki ZEC di dalam pool Sprout, migrasikan sebelum peningkatan jaringan. Setelah aktivasi, alat yang ada tidak akan lagi dapat memindahkan dana Sprout ke Sapling, alamat transparan, atau tujuan lainnya.
>
> Jika kamu melihat halaman ini **setelah NU7** diaktifkan, **Sprout membeku dalam es** sampai metode pemulihan di masa mendatang tersedia, yang saat ini belum direncanakan.

## Jawaban dalam satu halaman

| Dana kamu berada di | Rute migrasi | Apa yang harus dilakukan |
| --- | --- | --- |
| **Sprout** | **Sprout → Sapling → Ironwood** | Jika kamu memiliki `wallet.dat` atau Sprout spending key mandiri, coba jalur pemulihan Argos saat ini terlebih dahulu. Jika Argos tidak sesuai, gunakan rute sidecar lama di panduan lengkap. Sprout harus mendarat di Sapling terlebih dahulu, lalu lanjut ke Ironwood. Rute ini sensitif terhadap waktu karena adanya NU7. |
| **Sapling** | **Sapling → Ironwood** | Tidak memerlukan lingkungan pemulihan Sprout. Gunakan dompet saat ini yang dapat memulihkan atau membelanjakan akun Sapling spesifik milikmu dan menyusun transaksi Ironwood. Dukungan Ironwood saja tidak membuktikan adanya dukungan pemulihan legacy-Sapling. |
| **Orchard** | **Orchard → Ironwood** | Orchard hanya untuk keluar (exit-only). Gunakan alur migrasi Orchard-ke-Ironwood bawaan dari dompet kompatibel saat ini. Lihat [Dana yang telah dipulihkan dan pool Ironwood](#recovered-funds-and-the-ironwood-pool). |

### Alur keputusan lima pertanyaan

1. **Apakah ini Sprout?** Sebuah frasa pemulihan saja merujuk pada jalur pemulihan era Sapling/Orchard yang lebih baru, bukan Sprout. Alamat `zc...`, atau dompet yang dipulihkan dengan saldo Sprout, menunjukkan Sprout.
2. **Materi pemulihan apa yang kamu miliki?** Cari `wallet.dat`, komputer lama atau datadir, backup `z_exportwallet`, atau spending key Sprout yang telah diekspor. Alamat `zc...` saja tidak cukup.
3. **Argos atau legacy sidecar?** Jika kamu memiliki `wallet.dat` atau spending key Sprout yang berdiri sendiri dan hanya ingin mengeluarkan dana tersebut, coba [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) terlebih dahulu. Gunakan rute legacy sidecar dalam panduan lapangan lengkap jika Argos tidak dapat menangani materi tersebut atau jika kamu ingin seluruh tumpukan pemulihan berada di bawah kendalimu sendiri.
4. **Apakah kamu sudah memiliki datadir zcashd yang tersinkronisasi dan tidak dipangkas (unpruned)?** Ini hanya berpengaruh untuk rute legacy sidecar. Salin data node yang ada hanya setelah shutdown yang bersih; jika tidak, panduan lapangan mencakup opsi snapshot/dari awal.
5. **Ke mana dana tersebut akan berakhir?** **Ironwood.** Sprout melewati Sapling terlebih dahulu karena tidak ada satu transaksi langsung dari Sprout ke Ironwood. Jangan berhenti di Sapling.

### Panduan Lengkap Migrasi ZEC Pool

Untuk referensi migrasi lengkap, termasuk rute pemulihan terperinci, perintah, biaya, persyaratan perangkat keras, pertimbangan privasi, pemecahan masalah, dan catatan sumber, bacalah panduan lengkapnya.

**Versi 1.1 · Diperbarui 18 September 2026**

[Baca ZEC Panduan Lengkap Migrasi Pool di ZecHub](/research/zec-pool-migration/view) secara lengkap

> **Sebelum kamu memulai:** pertama-tama tentukan **apa yang sedang kamu pulihkan dan materi pemulihan apa yang masih kamu miliki**. Seed dompet saat ini atau spending key non-Sprout yang didukung mungkin hanya memerlukan pemulihan normal. Materi lama — seperti seed ZecWallet Lite, `wallet.dat` legacy, atau spending key Sapling atau Sprout mandiri — mungkin memerlukan jalur pemulihan khusus.
>
> Jika kamu merasa dana tersebut ada di **Sprout**, pastikan kamu masih memiliki otoritas pengeluaran sebelum meluangkan waktu untuk pemulihan. Alamat `zc...` atau materi viewing saja tidak cukup untuk memindahkan dana tersebut.
>
> **YWallet tidak lagi mendukung Zcash setelah Ironwood.** Gunakan **Zkool** untuk pemulihan non-Sprout biasa dari seed dan key yang didukung. Gunakan **Argos** untuk pemulihan ZecWallet Lite, file dompet legacy, dan spending key Sapling/Sprout mandiri. Untuk Sprout, Argos adalah rute pertama yang harus dicoba; panduan lapangan lengkap mencakup fallback sidecar legacy.
>
> Gunakan tabel di bawah ini berdasarkan **apa yang sebenarnya kamu miliki**, bukan alat pemulihan yang kamu ingat pernah kamu gunakan.

| Kamu memiliki | Mulai di sini |
| --- | --- |
| Sebuah frasa pemulihan atau **non-Sprout spending key** yang didukung dari dompet yang saat ini atau baru saja dikelola, termasuk material YWallet Zcash lama | [Zkool](#fund-recovery-with-zkool) |
| **Hanya viewing key** | Zkool dapat mengimpor viewing key yang didukung untuk akses baca-saja, tetapi viewing key tidak dapat memberikan otorisasi untuk pemulihan pengeluaran. Temukan seed atau spending key yang sesuai. |
| Seed **ZecWallet Lite** berisi 24 kata | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
| ZecWallet Lite atau zcashd `wallet.dat`, atau sebuah Sapling / Sprout spending key mandiri | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Per 18 September 2026, v1.3.0 adalah versi terbaru dan yang disarankan; gunakan v1.2.0 atau yang lebih baru untuk pemulihan `wallet.dat` dan Sprout. |
| Material Sprout yang tidak dapat ditangani oleh Argos, atau pemulihan di mana kamu ingin komponen legacy berada di bawah kendalimu sendiri | Gunakan rute sidecar legacy dalam [panduan lengkap full field guide](/research/zec-pool-migration/view). |
| Tidak ada seed atau spending key yang berfungsi, tetapi memiliki perangkat yang terkunci, kata sandi yang terlupakan, atau disk yang rusak | [Pemulihan profesional](#professional-recovery-when-you-do-not-have-the-seed). Jangan pernah mengirimkan seed atau spending key yang berfungsi kepada seseorang yang menghubungimu tanpa diminta. |

## Pemulihan Dana dengan Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) adalah penerus Zcash yang dikelola dari YWallet oleh developer yang sama. Ini mendukung jalur pemulihan transparan dan modern yang terlindungi, termasuk kunci Sapling lama, tetapi **tidak Sprout**.

Dua situasi tercakup di sini:

1. **Memulihkan akun** dari frasa pemulihan, private key, atau viewing key
2. **Menyapu dana** keluar dari dompet yang hanya mendukung alamat transparan

### 1) Memulihkan Akun

1. Instal Zkool dari halaman [releases page](https://github.com/hhanh00/zkool2/releases) dan buka aplikasinya
2. Pada **Account Manager** (halaman utama), ketuk tombol **+** untuk menuju ke layar **New Account**
3. Masukkan **Account Name** untuk mengidentifikasi akun ini
4. Aktifkan **Restore Account?**. Ini akan menampilkan kolom key dan birth height
5. Tempelkan key kamu ke dalam **Key (Seed Phrase, Private Key, atau Viewing Key)**. Zkool menerima seed phrase, secret key dari Sapling, transparent extended keys, dan viewing key yang didukung. Viewing key bersifat read-only dan tidak dapat memberikan otorisasi untuk pengeluaran dana.
6. Masukkan **Birth Height** untuk akun lama. Zkool tidak memindai blok sebelum height ini, jadi pilihlah height yang lebih awal dari aktivitas pertama dompet jika kamu tidak yakin. Birth height yang diatur terlalu lambat dapat menyebabkan transaksi asli tampak hilang.

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

7. Simpan akun tersebut, lalu sinkronkan

### Memulihkan frasa pemulihan dari dompet yang berbeda

Jika frasa pemulihan berasal dari dompet yang mengikuti ZIP 316 — termasuk ZODL (sebelumnya Zashi), Zingo, atau zcashd — nyalakan **Advanced Options** dan aktifkan **Use Internal Change** sebelum menyimpan.

ZIP 316 menggunakan alamat internal/kembalian terpisah. Memulihkan salah satu akun ini tanpa **Use Internal Change** dapat membuat output kembalian tampak hilang meskipun dana tersebut sebenarnya masih ada.

Dua bidang lainnya berada di bawah **Opsi Lanjutan**:

- **Passphrase Tambahan (opsional)**, hanya jika dompet asli menggunakan passphrase
- **Indeks Akun**, jika dompet asli memiliki beberapa akun dalam satu frasa pemulihan. Dana mungkin berada di bawah indeks yang berbeda

> **Kedua hal ini hanya akan muncul setelah frasa pemulihan yang valid dimasukkan ke dalam kolom Key.** Saat kolom tersebut kosong, atau berisi private key atau viewing key, Zkool hanya menampilkan **Use Internal Change** dan **H/W Ledger**. Tempelkan seed phrase terlebih dahulu, lalu buka Advanced Options.

### 2) Menyapu Dana dari Dompet Hanya Transparan

Jika dompet atau akun lama hanya berisi **ZEC transparan**, pulihkan akun tersebut terlebih dahulu, temukan setiap alamat transparan yang pernah digunakan, lalu pindahkan dana ke tujuan terlindungi saat ini yang kamu kendalikan. Jangan berasumsi bahwa sebuah brand dompet lama selalu hanya bersifat transparan; beberapa produk menambahkan dukungan terlindungi pada versi berikutnya.

1. Pulihkan akun menggunakan langkah-langkah di atas
2. Buka akun dan buka halaman **Receive Funds**
3. Ketuk ikon kaca pembesar di bar bagian atas (**Find other transparent addresses**). Dompet yang melakukan rotasi alamat, seperti Ledger dan Exodus, menghasilkan banyak alamat transparan dari satu frasa pemulihan, dan fitur ini akan menemukan alamat-alamat yang menyimpan dana
4. **Reset dan sinkronkan akun setelahnya.** Alamat yang baru ditemukan hanya akan memperbarui saldonya pada pemindaian berikutnya, jadi jika kamu melewatkan langkah ini, proses sweep akan terlihat seolah tidak menemukan apa pun
5. Buka halaman **Send**. Di dekat saldo, kamu akan menemukan tiga tombol ikon. Tombol-tombol ini tidak memiliki label teks, jadi arahkan kursor atau tekan lama untuk melihat namanya:
   - **Shield One** (ikon perisai garis luar) memindahkan satu alamat transparan dalam satu waktu
   - **Shield All** (ikon perisai penuh) memindahkan semuanya dari setiap alamat transparan sekaligus
   - **Unshield All** (ikon gembok terbuka) bekerja ke arah sebaliknya, yaitu ke dalam sebuah alamat transparan

> **Shield One adalah pilihan yang lebih privat.** Melindungi beberapa alamat dalam satu transaksi secara publik menghubungkan alamat-alamat tersebut sebagai milik orang yang sama. Zkool memperingatkan tentang hal ini sebelum menjalankan Shield All.

6. Tinjau transaksi dan kirimkan

Unshield All sangat berguna saat kamu melakukan penarikan ke exchange yang hanya menerima alamat transparan. Tombol shielding hanya akan muncul jika akun memiliki alamat terlindungi, dan Unshield All hanya akan muncul jika akun memiliki alamat transparan.

## Pemulihan ZecWallet Lite dan dompet lama dengan Argos

[ZecWallet Lite](https://github.com/adityapk00/zecwallet-lite) tidak lagi dikelola dan repositorinya telah diarsipkan. Derivasi frasa pemulihannya berbeda dari tata letak yang digunakan oleh dompet saat ini, sehingga mengimpor frasa yang sama ke dalam dompet modern dapat menyebabkan dana yang tersimpan di alamat turunan tambahan milik ZecWallet Lite tidak terbawa. [Argos](https://argos.sovright.com), dari Sovright, adalah workspace pemulihan desktop yang dibuat untuk kasus ini dan kasus pemulihan lama lainnya.

Argos membaca seed dan file dompet ZecWallet Lite, zcashd `wallet.dat`, Sapling standalone extended spending keys, dan Sprout material spending. Untuk Sprout, seed ZecWallet Lite saja tidak cukup karena kunci-kunci tersebut dibuat secara terpisah. Argos adalah alat pemulihan, bukan dompet untuk penggunaan sehari-hari: periksa material sumber secara lokal, pindai, lalu sweep ke dalam dompet yang kamu kelola.

Least Authority telah [diaudit](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf) alat tersebut. Proses pemulihan sendiri tidak dipungut biaya. Donasi opsional untuk Sovright dapat muncul selama proses sweep.

> **Jangan pernah mengetik frasa pemulihan ke dalam sebuah situs web.** Situs Argos hanyalah tempat unduhan dan panduan pengguna [](https://argos.sovright.com/guide.html). Kunci tetap berada di aplikasi desktop yang telah ditandatangani. Validasi dilakukan secara lokal terhadap checksum BIP-39. Kolom frasa pemulihan akan dikosongkan setelah pemindaian dimulai. Siapa pun yang mengirim pesan kepadamu meminta frasa pemulihan tersebut "untuk membantu memulihkan dana kamu" sedang menipu kamu.

### Sebelum kamu membuka Argos

1. Unduh aplikasi desktop dari situs resmi [Argos](https://argos.sovright.com) atau halaman rilis [GitHub](https://github.com/sovright/argos/releases). Verifikasi checksum atau tanda tangan saat dipublikasikan.
2. Gunakan rilis Argos terbaru. Per 18 September 2026, **v1.3.0** adalah versi terbaru dan yang disarankan. Gunakan **v1.2.0 atau yang lebih baru untuk pemulihan `wallet.dat` dan Sprout**. Build yang lebih lama dari 1.1.0 masih dapat memindai tetapi membuat sweep pre-Ironwood yang akan ditolak oleh jaringan; perbarui dan coba lagi.
3. Bekerjalah pada mesin yang kamu percayai. Utamakan enkripsi disk penuh. Jangan melakukan screen-share saat frasa pemulihan, passphrase, atau spending key terlihat.
4. Siapkan tujuan Unified Address dari dompet terawat yang kamu kendalikan, seperti [ZODL](https://zodl.app/). Konfirmasi alamat di dompet tersebut sebelum kamu menempelkannya ke Argos.

### Pemulihan frasa pemulihan

1. Buka Argos dan pilih **I have my 24-word seed phrase**. Pemulihan seed tidak memerlukan file dompet.
2. Tempel frasa tersebut dan klik **Validate seed**. Jika muncul keterangan bahwa seed valid, lanjutkan.
3. Masukkan **birthday block height**, atau estimasi terdekat kapan dompet tersebut dibuat. Height yang lebih awal akan terasa lebih lambat tetapi lebih aman daripada menebak terlalu lambat.
4. Di bawah kontrol server, gunakan preset current-server, atau masukkan URL lightwalletd. URL yang dipisahkan dengan koma akan dicoba secara berurutan. Contoh publik:

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. Tempelkan Unified Address tujuan.
6. Klik **start scan**. Proses ini bisa memakan waktu beberapa menit atau hari tergantung pada ketinggian birthday. Kamu dapat keluar dan membuka kembali workspace yang sama; pemindaian akan dilanjutkan.
7. Saat pemindaian selesai, tinjau saldo, estimasi biaya, dan tujuan, lalu klik **sweep**.

Menyiarkan sweep bersifat tidak dapat dibatalkan. Simpan file dompet asli sampai setiap pool yang relevan telah di-sweep dan dompet tujuan menunjukkan dana yang diharapkan. Setelah pemulihan selesai, hentikan penggunaan rahasia lama daripada terus menggunakannya untuk aktivitas baru.

### File dompet dan kunci mandiri

Pada layar selamat datang, **Saya memiliki file dompet** mencakup file ZecWallet Lite, sebuah zcashd `wallet.dat`, atau Sapling extended spending keys yang berdiri sendiri. Pemulihan spending-key Sprout yang berdiri sendiri ditangani oleh Sprout path/CLI pemulihan milik Argos.

Argos membaca file dompet tanpa mengubahnya. Jika dompet dienkripsi, masukkan passphrase saat diminta; data tersebut digunakan dalam memori dan tidak ditulis ke disk. Tinjau jumlah kunci transparan, Sapling, dan Sprout sebelum kamu memulai pemindaian.

Viewing key tidak dapat diterima untuk sebuah sweep karena tidak dapat memberikan otorisasi pengeluaran.

### Catatan Sprout

Seed phrase ZecWallet Lite tidak menurunkan kunci Sprout. Kunci-kunci tersebut dibuat secara terpisah. Pulihkan Sprout dari zcashd `wallet.dat`, atau dari spending key mandiri di CLI.

Jika file tersebut sudah memiliki data note yang dapat dibelanjakan dan witness yang tersimpan di cache, Argos dapat menawarkan **Sweep dana Sprout** tanpa perlu melakukan chain scan. Jika tidak, ia dapat menjalankan pemindaian full-block yang dapat dilanjutkan (resumable) melalui jaringan P2P. Pemindaian tersebut berukuran besar dan lambat. Checkpoint yang ditulis bersifat mampu-belanja (spend-capable), jadi lindungi file tersebut seperti dompet aslinya.

Nilai Sprout hanya dapat masuk ke Sapling. Setelah dana Sapling dikonfirmasi dan dapat digunakan, pindahkan dana tersebut lebih lanjut ke **Ironwood** dengan dompet saat ini yang mendukung akun Sapling yang telah dipulihkan. Jangan berhenti di Sapling.

## Dana yang dipulihkan dan pool Ironwood

Sejak peningkatan Ironwood (NU6.3) diaktifkan pada 28 Juli 2026, pool Orchard hanya dapat digunakan untuk pengeluaran. Tidak ada nilai baru yang dapat masuk ke dalamnya, dan nilai yang ada akan keluar melalui turnstile menuju Ironwood.

Jika dana yang kamu pulihkan berada di Orchard, pindahkan ke Ironwood menggunakan **alur migrasi bawaan dompet saat ini**. Orchard hanya dapat digunakan untuk keluar setelah NU6.3.

Zkool 6.30.0 mutakhir per 18 September 2026 dan mendukung Ironwood. Desain migrasinya berfokus pada privasi, tetapi tidak sama dengan mengklaim kepatuhan ZIP 318. Dompet lain yang ada saat ini mungkin menggunakan migrasi bertahap gaya ZIP 318. Ikuti layar migrasi terkini dan catatan rilis dari dompet yang kamu instal daripada menentukan jumlah atau jadwal secara manual.

Migrasi bertahap dapat menggunakan beberapa transaksi, sehingga total biaya bisa lebih tinggi daripada transfer satu kali jalan.

> **Jumlah migrasi bersifat publik.** Saat nilai melewati turnstile, jumlah dan ketinggian blok dapat terlihat di on-chain meskipun pengirim dan penerima tetap terlindungi. Gunakan kebijakan migrasi privat/staged bawaan dompet saat privasi menjadi hal yang penting, dan gunakan privasi tingkat jaringan seperti Tor atau lapisan privasi tepercaya lainnya jika diperlukan. Privasi jaringan dapat menyembunyikan tautan IP kamu; namun, hal tersebut tidak menyembunyikan jumlah lintas publik tersebut.

## Pemulihan Mendalam dengan ZExcavator

[ZExCavator](https://github.com/zingolabs/zexcavator) adalah proyek pemulihan Zingo Labs yang sedang dalam tahap pengembangan, yang saat ini berfokus pada file dompet ZecWallet Lite dan migrasi format dompet. README-nya saat ini mengarahkan pengguna pemulihan dana ke opsi ekspor **Zingolib** sementara dukungan ZeWIF yang lebih lengkap masih dalam tahap pengembangan.

Anggap ini sebagai alat tingkat lanjut/kasus khusus alih-alih jalur pemulihan default. Untuk frasa pemulihan ZecWallet Lite biasa, file dompet, zcashd `wallet.dat`, dan spending key standalone yang didukung, coba Argos terlebih dahulu. Verifikasi apa pun yang dipulihkan oleh ZExCavator di dalam dompet yang terawat sebelum kamu mengandalkannya.

## Pemulihan profesional saat kamu tidak memiliki frasa pemulihan

Jika frasa pemulihan atau key hilang, proses restorasi mandiri tidak dapat dimulai. Beberapa orang dalam posisi tersebut menggunakan jasa perusahaan pemulihan profesional untuk kata sandi yang terlupakan, kegagalan perangkat keras, atau disk yang tidak terbaca.

Jalur tersebut tidak sama dengan memulihkan frasa pemulihan yang masih kamu miliki. Jangan berikan frasa pemulihan yang aktif kepada siapa pun yang menawarkan untuk "memulihkannya" untukmu. Versi penipuan dari layanan ini sangat umum terjadi.

[Unciphered](https://unciphered.com) adalah satu firma yang melakukan pekerjaan ini secara internal dan telah diliput di tempat-tempat seperti [Wired](https://www.wired.com/story/unciphered-crypto-wallet-recovery/). Mereka adalah layanan pemulihan crypto umum, bukan alat khusus Zcash, dan mereka mengenakan biaya untuk pekerjaan tersebut. ZecHub tidak mendukung firma pemulihan mana pun. Jika kamu memilih jalur ini, konfirmasikan domain resmi secara mandiri dan asumsikan siapa pun yang mengirimkan DM kepadamu terlebih dahulu adalah penipu.

Jika kamu masih memiliki frasa pemulihan atau spending key yang berfungsi, mulailah dengan jalur pemulihan mandiri seperti Zkool atau Argos di mesin milikmu sendiri sebagai gantinya.

## YWallet tidak lagi dikelola

YWallet telah menjadi alat pemulihan yang direkomendasikan di halaman ini untuk waktu yang lama, dan banyak panduan lama masih merujuk ke sana.

Developer-nya sekarang menyatakan bahwa YWallet tidak lagi mendukung Zcash sejak pembaruan Ironwood dan mengarahkan pengguna Zcash ke **Zkool**, penerus yang dikelola secara aktif. Simpan material seed/key YWallet yang lama, tetapi jangan memulai migrasi Zcash baru di YWallet.

Jika kamu sudah memiliki materi pemulihan Zcash dari YWallet, pulihkan di Zkool menggunakan jalur seed/key yang didukung di atas.

## Halaman terkait

- [Dompet](/using-zcash/wallets) - dompet mana saja yang dikelola dan Ironwood kesiapannya, termasuk Argos
- [Ironwood](/zcash-tech/ironwood) - apa yang diubah oleh peningkatan jaringan dan mengapa dana bermigrasi
- [Memo](/using-zcash/memos) - cara kerja memo terenkripsi
- [Viewing Keys](/zcash-tech/viewing-keys) - akses baca saja tanpa kemampuan untuk membelanjakan dana
- [Node Lightwallet](/zcash-tech/lightwallet-nodes) - lightwalletdendpoint publik Argos yang dapat digunakan
- Panduan pengguna [Argos](https://argos.sovright.com/guide.html) - panduan resmi dari Sovright
- [Naomi Brockwell tentang alat pemulihan](https://x.com/naomibrockwell/status/2079146521405333526) - Argos panduan langkah demi langkah dan catatan tentang pemulihan profesional
