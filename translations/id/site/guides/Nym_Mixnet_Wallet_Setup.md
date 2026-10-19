<a href="https://github.com/zechub/zechub/edit/main/site/guides/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Halaman Edihttps://github.com/ZecHub/zechub/pull/2238t"/>
</a>

# Rutekan Lalu Lintas Dompet Zcash Melalui Mixnet Nym

> Terakhir diverifikasi: 29 September 2026

Transaksi terlindungi Zcash melindungi data transaksi on-chain, tetapi dompet masih berkomunikasi melalui internet. Pengamat jaringan berpotensi mengetahui metadata seperti alamat IP kamu, kapan dompet kamu terhubung, dan infrastruktur mana yang dihubunginya.

Nym menambahkan lapisan privasi jaringan terpisah. Per September 2026, pendekatan terbaik bergantung pada dompet:

1. **Utamakan integrasi Nym bawaan dompet jika tersedia.**
2. Jika tidak, gunakan **mode Mixnet NymVPN tingkat sistem** agar lalu lintas jaringan dompet dirutekan melalui Nym tanpa bergantung pada dukungan proxy khusus dompet.

Untuk latar belakang umum tentang VPN dan dVPN, lihat [VPN & dVPN](./VPN_and_DVPN.md).

## Yang ditambahkan Nym — dan yang tidak

Pembayaran Zcash terlindungi dan alat privasi jaringan menyelesaikan masalah yang berbeda:

- **Pool terlindungi Zcash** melindungi detail transaksi on-chain.
- **Perutean mixnet Nym** dirancang untuk mengurangi keterkaitan antara identitas jaringan asli kamu dan layanan yang menerima lalu lintas dompet.
- Tujuan yang dihubungi melalui tunnel NymVPN tingkat sistem seharusnya melihat exit Nym, bukan IP rumah/seluler kamu.

Mixnet Nym menggunakan beberapa hop, pencampuran paket, penundaan acak, lalu lintas pelindung, dan enkripsi onion untuk mengurangi kebocoran metadata jaringan.

Nym **tidak** melindungi dari perangkat yang dikompromikan, perangkat lunak dompet berbahaya, frasa pemulihan yang terekspos, identitas yang kamu ungkapkan melalui akun exchange, atau hilangnya privasi akibat aktivitas Zcash transparan.

## Dukungan Nym bawaan: gunakan ini terlebih dahulu jika tersedia

Nym mengumumkan pada 24 September 2026 bahwa pekerjaan Community Grant Zcash telah selesai dan dukungan mixnet bawaan sedang dirilis pada dompet Zcash yang sebenarnya.

### Dompet Zingo!

Zingo PC menyertakan transport Nym bawaan. Zingo Mobile juga menyertakan Mode Mixnet pada iOS dan Android dengan menggunakan proxy Nym di dalam aplikasi.

Perilaku saat ini yang didokumentasikan oleh Zingo:

- Kontrol Nym berada di **Settings → Mixnet Nym**.
- Pengiriman pembayaran dirutekan melalui mixnet.
- Transmisi migrasi Ironwood mengikuti jalur pengiriman terlindungi yang sama.
- Permintaan harga ZEC juga dirutekan melalui mixnet.
- Pengiriman gagal secara tertutup saat Nym diaktifkan: jika transport mixnet tidak tersedia, pembayaran tidak diam-diam dikirim melalui clearnet.
- **Sinkronisasi chain saat ini tidak dirutekan melalui mixnet** di Zingo PC. Blok ringkas, kueri nullifier, pengambilan transaksi, lalu lintas mempool, dan pemeriksaan kesehatan server masih menggunakan koneksi server normal.

Perbedaan itu penting: integrasi bawaan Zingo melindungi jalur siaran dengan keterkaitan tertinggi, tetapi belum merupakan tunnel jaringan perangkat penuh.

Jika threat model kamu juga mengharuskan penyembunyian lalu lintas sinkronisasi dari server, gunakan tunnel privasi tingkat sistem seperti NymVPN sembari memahami latensi dan kerumitan tambahan yang ditimbulkannya.

Sumber:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym melaporkan bahwa **Zkool** kini mendukung koneksi ke infrastruktur RPC Zcash melalui mixnet Nym menggunakan toggle bawaan.

Zkool adalah penerus YWallet yang dipelihara secara aktif. Proyeknya juga mendukung proxy Tor dan layanan onion untuk koneksi server Zcash.

Utamakan opsi Nym bawaan Zkool daripada mencoba memaksa build YWallet yang lebih lama melalui jalur proxy yang tidak didokumentasikan.

Sumber:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

NozyWallet juga memiliki jalur transport yang mendukung Nym. Implementasinya saat ini mendukung perutean pengiriman transaksi keluar melalui mixnet Nym dan jalur dVPN Nym terpisah untuk sinkronisasi blok ringkas. Perlakukan ini sebagai perlindungan yang berbeda alih-alih mengasumsikan setiap permintaan dompet secara otomatis menggunakan mixnet.

Sumber:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

Zodl saat ini memiliki **Perlindungan Tor** bawaan, bukan integrasi Nym bawaan yang sama seperti dijelaskan di atas untuk Zingo, Zkool, dan Nozy.

Fitur Tor milik Zodl dapat merutekan pengiriman transaksi, pengambilan data transaksi, permintaan nilai tukar, dan panggilan API pihak ketiga melalui Tor. Nym menyatakan pada 24 September 2026 bahwa pihaknya masih berdiskusi aktif dengan tim Zodl tentang integrasi mixnet yang lebih luas.

Untuk Zodl saat ini, gunakan salah satu:

- Perlindungan Tor terdokumentasi milik Zodl, atau
- NymVPN tingkat sistem jika tujuan kamu adalah merutekan lalu lintas perangkat umum dompet melalui Nym.

Jangan mengasumsikan Tor dan Nym adalah transport yang dapat dipertukarkan di dalam dompet hanya karena keduanya adalah jaringan privasi.

Pengaturan Zodl Tor:

**More → Advanced Features → Beta: Perlindungan Tor → Enable → Save changes**

Sumber:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Alternatif: NymVPN tingkat sistem

Ini adalah opsi Nym yang paling kompatibel secara luas karena tidak mengharuskan dompet memahami pengaturan proxy khusus Nym.

### 1. Instal NymVPN

Unduh NymVPN hanya dari situs web resmi Nym atau toko platform resmi:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN mendukung Android, iOS, Linux, Windows, dan macOS.

### 2. Pilih mode Mixnet

NymVPN menyediakan **Mode cepat**, jalur dVPN 2-hop yang dioptimalkan untuk latensi lebih rendah, dan **Mode Mixnet**, jalur mixnet 5-hop yang dioptimalkan untuk perlindungan metadata jaringan yang lebih kuat. Untuk aktivitas dompet sensitif, pilih Mode Mixnet dan tunggu hingga klien melaporkan bahwa koneksi telah terbentuk sebelum membuka atau menyegarkan dompet.

### 3. Biarkan dompet menggunakan pengaturan jaringan normal

Ketika sistem operasi sudah menyalurkan lalu lintas melalui NymVPN, sebagian besar dompet tidak memerlukan pengaturan proxy khusus.

Buka dompet seperti biasa dan izinkan dompet melakukan sinkronisasi.

Jika NymVPN menyediakan split tunneling pada platform kamu, pastikan dompet **disertakan dalam tunnel terlindungi**, bukan ditempatkan dalam daftar bypass atau pengecualian.

### 4. Verifikasi tunnel sebelum menggunakan dompet

Pemeriksaan sederhana tingkat sistem:

1. Putuskan sambungan NymVPN.
2. Kunjungi layanan pemeriksa IP publik, atau pada desktop jalankan:

   ```bash
   curl https://api.ipify.org
   ```

3. Catat IP yang terlihat.
4. Hubungkan NymVPN dalam Mode Mixnet.
5. Ulangi pemeriksaan.

IP publik yang terlihat seharusnya berubah.

Ini mengonfirmasi tunnel sistem. Ini **tidak** membuktikan bahwa setiap permintaan yang dibuat oleh dompet tertentu mengikuti jalur yang sama jika aplikasi atau OS memiliki aturan perutean khusus.

Untuk kepastian lebih lanjut di desktop:

- Periksa proses dompet dengan pemantau jaringan sistem operasi,
- Verifikasi bahwa tidak ada pengecualian split-tunnel,
- Konfirmasikan bahwa perilaku dompet yang diharapkan berubah jika NymVPN diputuskan.

Jangan unggah tangkapan layar yang berisi alamat dompet, saldo, ID transaksi, alamat IP, atau materi pemulihan saat melakukan pemecahan masalah.

## Mode proxy dApp / dompet NymVPN

NymVPN juga menyediakan mode proxy aplikasi dan dompet yang menggunakan perutean SOCKS5 / RPC melalui mixnet.

Dokumentasi penyiapan publik Nym mendemonstrasikan ini terutama dengan konfigurasi RPC bergaya Ethereum. Ini berguna untuk perangkat lunak yang secara eksplisit mendukung jalur proxy/RPC generik yang kompatibel, tetapi seharusnya **tidak** diasumsikan berfungsi dengan setiap dompet Zcash.

Gunakan jalur ini hanya ketika dokumentasi dompet sendiri mengonfirmasi dukungan proxy atau RPC yang kompatibel.

Jika tidak, utamakan:

- integrasi Nym bawaan dompet, atau
- NymVPN tingkat sistem.

## Trade-off performa dan timeout

Mixnet secara sengaja menukar kecepatan dengan perlindungan metadata yang lebih kuat.

Perkirakan kemungkinan dampak pada:

- sinkronisasi dompet awal,
- sinkronisasi pengejaran yang besar,
- kueri riwayat transaksi,
- timeout RPC,
- panggilan API pihak ketiga.

Panduan praktis:

- Mulailah dengan pengaturan Nym default.
- Perkirakan sinkronisasi pertama atau sinkronisasi pengejaran yang panjang akan memakan waktu lebih lama.
- Coba ulangi timeout sebelum melemahkan pengaturan privasi.
- Hindari berulang kali mengganti mode privasi tepat sebelum transaksi sensitif.
- Jika kamu menggunakan jalur yang lebih cepat untuk sinkronisasi massal, pahami bahwa infrastruktur yang dihubungi dapat mengamati identitas jaringan asli kamu selama periode tersebut.
- Khusus untuk Zingo PC, ingat bahwa transport Nym bawaannya saat ini melindungi pengiriman dan pencarian harga, sementara sinkronisasi tetap langsung.

## Pertimbangan seluler

Pada Android dan iOS, slot VPN sistem operasi biasanya merupakan cara paling sederhana untuk merutekan lalu lintas dompet umum melalui NymVPN: hubungkan NymVPN terlebih dahulu, lalu buka dompet.

Jika VPN lain, firewall, atau pemblokir iklan berbasis VPN lokal sudah menggunakan antarmuka VPN sistem, kedua produk mungkin tidak dapat beroperasi secara bersamaan. Konfirmasikan status VPN sistem operasi sebelum mengasumsikan dompet terlindungi.

## Daftar periksa threat model

Sebelum mengandalkan pengaturan ini, tanyakan:

- Apakah saya menggunakan alamat Zcash terlindungi jika sesuai?
- Apakah dompet saya memiliki dukungan Nym bawaan?
- Jika ya, lalu lintas mana tepatnya yang dilindungi oleh integrasi bawaan itu?
- Jika saya memerlukan cakupan lebih luas, apakah NymVPN terhubung sebelum dompet memulai aktivitas jaringan?
- Apakah dompet dikecualikan oleh aturan split-tunneling?
- Apakah saya mengandalkan mode proxy yang benar-benar didokumentasikan oleh dompet?
- Apakah saya membocorkan identitas melalui exchange, sesi browser, API pihak ketiga, atau alamat transparan?
- Apakah saya siap menghadapi sinkronisasi yang lebih lambat dan timeout sesekali?

## Sumber

- Nym: Mixnet Nym kini aktif di dompet Zcash, 24 September 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Perilaku Zingo PC Nym: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Transport Nym Zingo Mobile: https://github.com/zingolabs/zingo-mobile
- Repositori Zkool: https://github.com/hhanh00/zkool2
- Pekerjaan transport Nym NozyWallet: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Perlindungan Tor Zodl: https://support.zodl.com/article/17-enabling-tor-protection
