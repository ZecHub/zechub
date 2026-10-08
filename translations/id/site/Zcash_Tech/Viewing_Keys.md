<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Viewing Keys

Alamat terlindungi memungkinkan Anda melakukan transaksi dengan mengungkap sesedikit mungkin informasi pada blockchain Zcash. Jadi, apa yang terjadi ketika Anda *perlu* menunjukkan kepada pihak tertentu apa yang Anda miliki, atau apa yang Anda kirim? Setiap alamat terlindungi memiliki viewing key yang memberikan akses baca tanpa memberikan kemampuan untuk membelanjakan dana. Viewing key diperkenalkan pada 310](https://zips.z.cash/zip-0310)ZIP[ dan ditambahkan ke protokol dalam peningkatan jaringan Sapling.

viewing key adalah alat untuk pengungkapan selektif: Anda memilih siapa yang dapat melihat apa, dan Anda tidak pernah menyerahkan otoritas pengeluaran untuk melakukannya.

## Mengapa menggunakan viewing key?

Tulisan Electric Coin Company mengenai subjek ini memaparkan situasi yang paling sering muncul, dan situasi tersebut masih menjadi hal yang umum terjadi saat ini:

- **Sebuah exchange yang memantau setoran.** Exchange tersebut memuat viewing key yang masuk ke dalam detection node yang terhubung dengan internet sehingga dapat menyadari setoran pelanggan ke alamat terlindungi, sementara spending key tetap berada pada perangkat keras yang tidak pernah menyentuh jaringan.
- **Seorang kustodian yang membuktikan kepemilikannya.** Kustodian menyerahkan full viewing key kepada auditor untuk setiap alamat terlindungi. Auditor dapat memeriksa saldo tersebut dan meninjau aktivitas masa lalu ke dan dari alamat-alamat tersebut, dan tidak dapat melakukan hal lainnya.
- **Uji tuntas terhadap pihak lawan.** Dalam kondisi di mana sebuah exchange perlu meninjau riwayat terlindungi seorang pelanggan sebagai bagian dari uji tuntas yang ditingkatkan, exchange tersebut dapat meminta viewing key alih-alih meminta dana tersebut.

## Apa yang diungkapkan dan tidak diungkapkan oleh viewing key

Ada lebih dari satu jenis key, dan perbedaannya menentukan seberapa banyak informasi yang Anda berikan.

| Kunci | Awalan | Hak Akses |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | Dapat melihat transaksi masuk **dan** keluar untuk setiap pool dalam akun tersebut |
| Unified incoming viewing key (UIVK) | `uivk…` | Hanya dapat melihat transaksi masuk, untuk setiap pool dalam akun tersebut |
| Sapling extended full viewing key | `zxviews…` | Dapat melihat aktivitas Sapling masuk dan keluar untuk alamat-alamat dari kunci tersebut |

Tidak ada satu pun dari ini yang dapat membelanjakan dana. Semuanya bersifat permanen dalam hal yang krusial: kunci yang telah Anda berikan tidak dapat ditarik kembali, hanya dapat dilewati masa berlakunya, dengan memindahkan dana ke akun yang kuncinya tidak dimiliki oleh pihak lain tersebut.

Ada dua jebakan pengungkapan yang perlu Anda ketahui sebelum Anda membagikan apa pun.

**Incoming tidak berarti sempit.** Sebuah unified incoming viewing key mencakup seluruh akun, bukan hanya satu alamat yang Anda tanyakan. Mengekspor UIVK untuk satu alamat Sapling tetap memberikan visibilitas incoming di setiap pool dalam akun tersebut, sehingga ia mengungkapkan lebih banyak hal daripada alamat yang disebutkan. [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) menyatakan hal ini secara eksplisit.

**Alamat yang dipublikasikan sudah mengekspos incoming viewing key miliknya kepada penyerang di masa depan.** [ZIP 326](https://zips.z.cash/zip-0326) mencatat bahwa seorang penyerang dengan komputer kuantum dapat memulihkan incoming viewing key dari alamat diversifikasi yang dipublikasikan, yang mana hal ini memungkinkan dilakukan dengan cara yang berbeda dari pemulihan nullifier key. Mempublikasikan sebuah alamat tidaklah sama dengan mempublikasikan viewing key saat ini, namun keduanya akan menjadi semakin berdekatan dalam jangka waktu yang cukup lama.

## Viewing keys setelah Ironwood

NU6.3 memperkenalkan Ironwood pool terlindungi dan membuat Orchard pool hanya dapat digunakan untuk pengeluaran (spend-only), sehingga dana bermigrasi dari satu ke yang lain seiring berjalannya waktu. Lihat [Ironwood](/zcash-tech/ironwood) dan [turnstile](/zcash-tech/the-turnstile) untuk peningkatan jaringan itu sendiri.

**Viewing key yang diterbitkan sebelum Ironwood tetap berfungsi setelah migrasi.** ZIP 326 menetapkan bahwa penerima, dan incoming viewing key yang sesuai, dibatasi pada *protokol* Orchard alih-alih ke sebuah pool: incoming viewing key yang sama melakukan trial-decrypt pada ciphertext note dari Orchard-pool maupun Ironwood-pool. Zallet mengimplementasikannya dengan cara tersebut, mendeskripsikan note Ironwood berbentuk Orchard dan didekripsi secara trial menggunakan viewing keys Orchard milik akun di bawah domain enkripsi-note Ironwood.

Tiga konsekuensi bagi siapa pun yang memegang atau menerbitkan sebuah kunci:

1. **Saldo berpindah antar pool, dan pemirsa dapat melihat proses tersebut.** [ZIP 318](https://zips.z.cash/zip-0318) menentukan migrasi sebagai serangkaian transaksi Orchard-ke-Ironwood kecil yang sengaja dibuat seragam dan disiarkan pada jadwal yang diacak, masing-masing membelanjakan satu catatan Orchard dan menghasilkan satu output Ironwood dengan denominasi kanonik. Seorang auditor yang mengawasi dengan viewing key akan melihat kepemilikan bergeser dari satu pool ke pool lainnya secara bertahap selama berminggu-minggu, bukan dalam satu gerakan tunggal. Sebuah dompet dapat merekonstruksi kemajuan migrasinya sendiri dari data chain menggunakan viewing keys miliknya.
2. **Setiap langkah migrasi mengungkapkan nilai yang dipindahkannya.** Hal tersebut melekat pada proses melewati turnstile, dan itulah yang membuat migrasi dapat diaudit. Membagi saldo ke dalam denominasi kanonik berarti tidak ada satu transaksi pun yang mengungkapkan seluruh saldo pool Orchard.
3. **Akun yang dibuat setelah Ironwood mungkin menurunkan kunci mereka secara berbeda.** [ZIP 2005](https://zips.z.cash/zip-2005) menambahkan flag `use_qsk` untuk kunci yang dapat dipulihkan secara kuantum, dan ini mengubah cara kunci incoming, outgoing, dan diversifier diturunkan, sehingga kunci `use_qsk = true` benar-benar merupakan kunci yang berbeda. ZIP 326 mengharuskan flag tersebut seragam di seluruh akun dan melarang pembuatan kunci `use_qsk = true` sebelum NU6.3 diaktifkan di Mainnet. Oleh karena itu, kunci yang diekspor dari akun yang sudah ada sebelum Ironwood adalah kunci `use_qsk = false`, dan tetap benar untuk akun tersebut. Jangan berasumsi bahwa kunci yang diekspor dari satu akun mendeskripsikan akun lainnya.

## Mengekspor viewing key

### Zallet

[Zallet](https://github.com/zcash/zallet) adalah dompet full-node yang menggantikan dompet di dalam zcashd. Ekspor dan impor viewing-key hadir pada **v0.1.0-beta.2 (28 Juli 2026)**, jadi periksa versi Anda terlebih dahulu; build sebelumnya tidak memiliki metode ini. Setiap argumen setelah nama metode harus berupa JSON yang valid, yang berarti nilai string tetap mempertahankan tanda kutip ganda mereka sendiri. [Panduan Referensi Cepat Zallet](/using-zcash/zallet-quick-reference-guide) mencakup gaya perintah umum.

Daftar apa yang disimpan oleh dompet:

```bash
zallet rpc listaddresses
```

Ekspor unified full viewing key dari akun dengan mengirimkan sebuah unified address:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Ekspor unified incoming viewing key dari akun tersebut sebagai gantinya, dengan menggunakan argumen opsional `ivk`:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Memasukkan alamat Sapling akan mengembalikan extended full viewing key Sapling (`zxviews…`) dari akun tersebut, sesuai dengan perilaku lama zcashd. Dua batasan yang terdokumentasi: alamat Sprout akan ditolak, dan extended full viewing key Sapling tidak dapat diekspor dari akun yang dirinya sendiri diimpor sebagai view-only, karena dompet tidak dapat menyusunnya kembali. Bentuk `ivk` tetap berfungsi untuk akun view-only yang diimpor.

### Dompet yang mengekspor viewing key dari antarmuka mereka sendiri

Halaman [Wallets](/using-zcash/wallets) melacak dukungan viewing-key dan Ironwood kesiapan untuk setiap dompet. Pada saat penulisan ini, dompet yang mencantumkan dukungan viewing-key sekaligus **Ironwood: Ready** meliputi ZODL, Zingo!, Zkool, Cake, Zallet, Zecd, dan Nozy. Periksalah halaman tersebut daripada halaman ini sebelum mengandalkan dompet tunggal apa pun, karena kesiapan dapat berubah.

## Mengimpor viewing key sebagai akun watch-only

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) adalah opsi yang paling fleksibel di sini, karena ia menerima kunci terpadu maupun kunci lama. README-nya mendokumentasikan akun khusus lihat (view-only) yang dibuat dari **unified viewing key** atau **Sapling extended viewing key**, bersama dengan kunci extended terlindungi lama yang diekspor dari zcashd. Tambahkan akun baru, pilih rute khusus lihat, dan tempelkan kunci `uview…` atau `zxviews…`; akun tersebut kemudian akan sinkron dan melaporkan saldo serta riwayat tanpa otoritas pengeluaran.

Dukungan protokol Ironwood dan migrasi Orchard-ke-Ironwood telah hadir di Zkool 6.24.0 (20 Juli 2026), dan 6.26.1 (2 Agustus 2026) memperbaiki deteksi transaksi Ironwood di dalam mempool. Jalankan 6.26.1 atau versi yang lebih baru.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Argumen kedua adalah kebijakan pemindaian ulang: `"whenkeyisnew"` (default), `"yes"` atau `"no"`. Argumen ketiga adalah tinggi blok untuk memulai pemindaian ulang. Zallet mengimpor kunci sebagai akun khusus view-only dan melacak transaksi masuk dan keluar untuk alamat-alamatnya tanpa otoritas pengeluaran.

**Zallet hanya mengimpor Sapling extended full viewing keys.** Ini tidak akan mengimpor `uview…` unified full viewing key, meskipun ia dapat mengekspornya. Untuk memberikan akses baca ke seluruh akun unified, ekspor UFVK dari Zallet dan impor ke dalam dompet yang menerima unified keys, seperti Zkool.

Untuk mengubah kunci yang diimpor menjadi file riwayat transaksi lengkap, dengan txid, biaya, dan memo, lihat [Mengekspor Riwayat Transaksi dari Viewing Key](/guides/viewing-key-transaction-export).

## Apa yang berubah, dan apa yang tidak perlu lagi dicari

Jika Anda mengikuti versi lama dari halaman ini, atau terjemahannya, tiga rute tidak lagi berfungsi.

- **`zcash-cli z_exportviewingkey` dan `z_importviewingkey`.** zcashd telah mencapai akhir masa dukungan (end-of-support) pada 18 Juli 2026 dan tidak lagi berjalan. Metode dengan nama identik milik Zallet adalah penggantinya; lihat [panduan migrasi](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **Panduan penggunaan Ywallet.** Halaman Wallets menandai Ywallet sebagai **Ironwood: Belum Siap**, sehingga ini bukan dompet yang tepat untuk diarahkan kepada orang-orang yang menggunakan viewing key era Ironwood. Zkool, dari pengembang yang sama, menerima rentang kunci yang sama dan ditandai sebagai Siap.
- **zcashblockexplorer.com/vk.** Layanan tersebut mengembalikan HTTP 503 dengan sertifikat tidak valid, dan telah dihentikan alih-alih diganti. Menempelkan viewing key ke sebuah situs web menyerahkan seluruh riwayat transaksi Anda kepada siapa pun yang menjalankan situs web tersebut, yang mana selalu menjadi opsi terlemah dari ketiga opsi pada halaman lama. Sebagai gantinya, impor kunci tersebut ke dalam dompet yang Anda jalankan sendiri.

## Sumber Daya

Gunakan viewing key hanya saat dibutuhkan, dan pilihlah key dengan cakupan paling sempit yang dapat menjawab pertanyaan yang diajukan.

- Pengungkapan pembayaran [](/zcash-tech/payment-disclosures) - membuktikan detail terpilih dari satu pembayaran tanpa memberikan akses berkelanjutan ke sebuah akun
- [ZIP 326: NU6.3 Konsekuensi bagi Dompet](https://zips.z.cash/zip-0326) — bagaimana viewing key berperilaku di seluruh pool Orchard dan Ironwood
- [ZIP 229: Format Transaksi Versi 6](https://zips.z.cash/zip-0229) — mendefinisikan pool Orchard dan Ironwood
- [Zallet log perubahan](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — rilis mana yang menambahkan metode RPC mana
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — tipe akun dan kunci yang didukung
- [ECC, Menjelaskan Viewing Key](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Pengungkapan Selektif dan Viewing Key](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Presentasi Video](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)

Lihat juga: [Alamat Terpadu](./Unified_Addresses.md)