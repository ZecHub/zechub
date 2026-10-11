<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Halaman Edihttps://github.com/ZecHub/zechub/pull/2238t"/>
</a>

# Mengarahkan Lalu Lintas Dompet Zcash Melalui Nym Mixnet

> Terakhir diverifikasi: 29 September 2026

Transaksi terlindungi Zcash melindungi data transaksi secara on-chain, tetapi dompet tetap berkomunikasi melalui internet. Pengamat jaringan berpotensi mempelajari metadata seperti alamat IP kamu, kapan dompet kamu terhubung, dan infrastruktur mana yang dihubungi oleh dompet tersebut.

Nym menambahkan lapisan privasi jaringan yang terpisah. Per September 2026, pendekatan terbaik bergantung pada dompet yang kamu gunakan:

1. **Utamakan integrasi Nym asli pada dompet jika tersedia.**
2. Jika tidak, gunakan **mode NymVPN Mixnet tingkat sistem** agar lalu lintas jaringan dompet kamu diarahkan melalui Nym tanpa bergantung pada dukungan proxy khusus dompet tersebut.

Untuk latar belakang umum mengenai VPN dan dVPN, lihat [VPN & dVPN](./VPN_and_DVPN.md).

## Apa yang ditambahkan Nym — dan apa yang tidak

Pembayaran Zcash yang terlindungi dan alat privasi jaringan menyelesaikan masalah yang berbeda:

- **pool terlindungi Zcash** melindungi detail transaksi secara on-chain.
- **routing Nym mixnet** dirancang untuk mengurangi keterkaitan antara identitas jaringan aslimu dengan layanan yang menerima trafik dompet.
- Tujuan yang dihubungi melalui terowongan NymVPN tingkat sistem seharusnya melihat exit Nym, bukan IP rumah/seluler milikmu.

Mixnet milik Nym menggunakan beberapa hop, pencampuran paket, penundaan acak, cover traffic, dan enkripsi onion untuk mengurangi kebocoran metadata jaringan.

Nym **tidak** melindungi kamu dari perangkat yang terkompromi, perangkat lunak dompet yang berbahaya, frasa pemulihan yang terekspos, identitas yang kamu ungkapkan melalui akun exchange, atau hilangnya privasi yang disebabkan oleh aktivitas transparan Zcash.

## Dukungan Nym asli: gunakan ini terlebih dahulu saat tersedia

Nym mengumumkan pada 24 September 2026 bahwa pekerjaan Hibah Komunitas Zcash mereka telah selesai dan dukungan mixnet asli akan hadir di Zcash dompet asli.

### Dompet Zingo!

Zingo PC menyertakan transport Nym asli. Zingo Mobile juga menyertakan Mixnet Mode pada iOS dan Android menggunakan proxy Nym di dalam aplikasi.

Perilaku saat ini yang didokumentasikan oleh Zingo:

- Kontrol Nym berada di bawah **Settings → Nym Mixnet**.
- Pengiriman pembayaran diarahkan melalui mixnet.
- Transmisi migrasi Ironwood mengikuti jalur pengiriman terlindungi yang sama.
- Permintaan harga ZEC juga diarahkan melalui mixnet.
- Pengiriman akan gagal secara tertutup saat Nym diaktifkan: jika transport mixnet tidak tersedia, pembayaran tidak akan dikirim secara diam-diam melalui clearnet.
- **Sinkronisasi chain saat ini tidak diarahkan melalui mixnet** di Zingo PC. Compact blocks, query nullifier, pengambilan transaksi, lalu lintas mempool, dan pemeriksaan kesehatan server masih menggunakan koneksi server normal.

Perbedaan itu penting: integrasi asli dari Zingo melindungi jalur siaran dengan keterkaitan tertinggi, tetapi ini belum menjadi terowongan jaringan perangkat penuh.

Jika model ancaman kamu juga mengharuskan penyembunyian trafik sinkronisasi dari server, gunakan tunnel privasi tingkat sistem seperti NymVPN selain memahami latensi dan kompleksitas tambahan yang ditimbulkan oleh hal ini.

Sumber:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym melaporkan bahwa **Zkool** kini mendukung koneksi ke infrastruktur RPC Zcash melalui Nym mixnet menggunakan sakelar bawaan.

Zkool adalah penerus dari YWallet yang dikelola secara aktif. Proyek ini juga mendukung proxying Tor dan layanan onion untuk koneksi server Zcash.

Lebih baik gunakan opsi Nym asli dari Zkool daripada mencoba memaksakan build YWallet yang lebih lama melalui jalur proxy yang tidak terdokumentasi.

Sumber:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

NozyWallet juga memiliki jalur transport yang sadar Nym. Implementasi saat ini mendukung perutean pengiriman transaksi keluar melalui Nym mixnet dan jalur Nym dVPN terpisah untuk sinkronisasi compact-block. Anggaplah ini sebagai perlindungan yang berbeda, jangan berasumsi bahwa setiap permintaan dompet secara otomatis menggunakan mixnet.

Sumber:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

Zodl saat ini memiliki **Perlindungan Tor** bawaan, tidak sama dengan integrasi Nym asli yang dijelaskan di atas untuk Zingo, Zkool, dan Nozy.

Fitur Tor milik Zodl dapat mengarahkan pengiriman transaksi, pengambilan data transaksi, permintaan kurs exchange, dan panggilan API pihak ketiga melalui Tor. Nym menyatakan pada 24 September 2026 bahwa mereka masih dalam percakapan aktif dengan tim Zodl mengenai integrasi mixnet yang lebih luas.

Untuk Zodl hari ini, gunakan salah satu dari:

- Perlindungan Tor milik Zodl yang telah didokumentasikan, atau
- NymVPN tingkat sistem jika tujuan kamu adalah mengarahkan lalu lintas perangkat umum dompet melalui Nym.

Jangan menganggap Tor dan Nym dapat saling menggantikan sebagai transport di dalam dompet hanya karena keduanya adalah jaringan privasi.

Pengaturan Zodl Tor:

**Lainnya → Fitur Lanjutan → Beta: Perlindungan Tor → Aktifkan → Simpan perubahan**

Sumber:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Cadangan: NymVPN tingkat sistem

Ini adalah opsi Nym yang paling kompatibel secara luas karena tidak mengharuskan dompet untuk memahami pengaturan proxy khusus Nym.

### 1. Instal NymVPN

Unduh NymVPN hanya dari situs web resmi Nym atau toko platform resmi:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN mendukung Android, iOS, Linux, Windows, dan macOS.

### 2. Pilih mode Mixnet

NymVPN menghadirkan **mode Fast**, jalur dVPN 2-hop yang dioptimalkan untuk latensi lebih rendah, dan **mode Mixnet**, jalur mixnet 5-hop yang dioptimalkan untuk perlindungan metadata jaringan yang lebih kuat. Untuk aktivitas dompet yang sensitif, pilih mode Mixnet dan tunggu hingga client melaporkan bahwa koneksi telah terjalin sebelum membuka atau menyegarkan dompet.

### 3. Biarkan dompet pada pengaturan jaringan normal

Ketika sistem operasi sudah melakukan tunneling lalu lintas melalui NymVPN, sebagian besar dompet tidak memerlukan pengaturan proxy khusus.

Buka dompet secara normal dan biarkan proses sinkronisasi berjalan.

Jika NymVPN mengekspos split tunneling pada platform kamu, pastikan bahwa dompet tersebut **termasuk dalam tunnel terlindungi**, bukan ditempatkan pada daftar bypass atau pengecualian.

### 4. Verifikasi tunnel sebelum menggunakan dompet

Pemeriksaan tingkat sistem yang sederhana:

1. Putuskan koneksi NymVPN.
2. Kunjungi layanan pengecekan IP publik, atau pada desktop jalankan:

   ```bash
   curl https://api.ipify.org
   ```

3. Catat IP yang terlihat.
4. Hubungkan NymVPN dalam mode Mixnet.
5. Ulangi pengecekan tersebut.

IP publik yang terlihat seharusnya berubah.

Ini mengonfirmasi terowongan sistem tersebut. Ini **tidak** membuktikan bahwa setiap permintaan yang dibuat oleh dompet tertentu mengikuti jalur yang sama jika aplikasi atau OS memiliki aturan perutean khusus.

Untuk jaminan lebih lanjut pada desktop:

- periksa proses dompet dengan monitor jaringan sistem operasi kamu,
- verifikasi bahwa tidak ada pengecualian split-tunnel,
- konfirmasi perubahan perilaku dompet yang diharapkan jika NymVPN terputus.

Jangan mengunggah tangkapan layar yang berisi alamat dompet, saldo, ID transaksi, alamat IP, atau materi pemulihan saat melakukan troubleshooting.

## Mode proxy dApp / dompet NymVPN

NymVPN juga menyediakan mode proxy aplikasi-dan-dompet menggunakan perutean SOCKS5 / RPC melalui mixnet.

Dokumentasi setup publik Nym menunjukkan hal ini terutama dengan konfigurasi RPC gaya Ethereum. Ini berguna untuk perangkat lunak yang secara eksplisit mendukung jalur proxy/RPC generik yang kompatibel, tetapi kamu **tidak** boleh berasumsi bahwa ini akan berfungsi dengan setiap dompet Zcash.

Gunakan jalur ini hanya jika dokumentasi dompet itu sendiri mengonfirmasi dukungan proxy atau RPC yang kompatibel.

Jika tidak, lebih baik gunakan:

- integrasi Nym asli pada dompet, atau
- NymVPN tingkat sistem.

## Trade-off antara performa dan timeout

Mixnet secara sengaja mengorbankan kecepatan demi perlindungan metadata yang lebih kuat.

Perkirakan kemungkinan dampak pada:

- sinkronisasi dompet awal,
- sinkronisasi catch-up yang besar,
- kueri riwayat transaksi,
- timeout RPC,
- panggilan API pihak ketiga.

Panduan praktis:

- Mulai dengan pengaturan Nym bawaan.
- Harapkan sinkronisasi pertama atau sinkronisasi catch-up yang lama akan memakan waktu lebih lama.
- Coba lagi saat terjadi timeout sebelum memperlemah pengaturan privasi.
- Hindari berganti mode privasi secara berulang tepat sebelum transaksi sensitif.
- Jika kamu menggunakan jalur yang lebih cepat untuk bulk sync, pahami bahwa infrastruktur yang dihubungi mungkin dapat mengamati identitas jaringan aslimu selama periode tersebut.
- Khusus untuk Zingo PC, ingatlah bahwa transport Nym bawaannya saat ini melindungi pengiriman dan pencarian harga, sementara sinkronisasi tetap bersifat langsung.

## Pertimbangan seluler

Di Android dan iOS, slot VPN pada sistem operasi biasanya merupakan cara termudah untuk mengarahkan lalu lintas dompet umum melalui NymVPN: hubungkan NymVPN terlebih dahulu, lalu buka dompetnya.

Jika VPN, firewall, atau pemblokir iklan berbasis VPN lokal lainnya sudah menggunakan antarmuka VPN sistem, kedua produk tersebut mungkin tidak dapat beroperasi secara bersamaan. Pastikan status VPN pada sistem operasi kamu sebelum menganggap dompet sudah terlindungi.

## Daftar periksa model ancaman

Sebelum mengandalkan pengaturan ini, tanyakanlah:

- Apakah saya menggunakan alamat Zcash terlindungi pada tempat yang tepat?
- Apakah dompet saya memiliki dukungan native Nym?
- Jika ya, trafik mana tepatnya yang dilindungi oleh integrasi native tersebut?
- Jika saya membutuhkan cakupan yang lebih luas, apakah NymVPN terhubung sebelum dompet memulai aktivitas jaringan?
- Apakah dompet dikecualikan oleh aturan split-tunneling?
- Apakah saya mengandalkan mode proxy yang sebenarnya didokumentasikan oleh dompet?
- Apakah saya membocorkan identitas melalui exchange, sesi browser, API pihak ketiga, atau alamat transparan?
- Apakah saya sudah siap untuk sinkronisasi yang lebih lambat dan timeout yang sesekali terjadi?

## Sumber

- Nym: mixnet Nym kini telah aktif di dompet Zcash, 24 September 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Perilaku Nym Zingo PC: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Transport Nym mobile Zingo: https://github.com/zingolabs/zingo-mobile
- repositori Zkool: https://github.com/hhanh00/zkool2
- Pekerjaan transport Nym NozyWallet: https://github.com/LEONINE-DAO/Nozy-wallet
- v2026.12 NymVPN: https://nym.com/blog/nymvpn-v2026.12
- Perlindungan Tor Zodl: https://support.zodl.com/article/17-enabling-tor-protection