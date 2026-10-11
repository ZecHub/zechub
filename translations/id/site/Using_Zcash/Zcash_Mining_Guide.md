# Panduan Penambangan Zcash: Bergabung dengan Mining Pool dengan Perangkat Keras Pribadi

## Pendahuluan

Zcash (ZEC) adalah cryptocurrency yang berfokus pada privasi yang menggunakan algoritma proof-of-work Equihash untuk penambangan. Menambang Zcash melibatkan penggunaan daya komputasi untuk menyelesaikan masalah matematika yang kompleks, memvalidasi transaksi, dan mengamankan jaringan sebagai imbalan atas hadiah ZEC. Karena tingkat kesulitan jaringan yang tinggi, solo mining tidak direkomendasikan bagi kebanyakan pengguna. Bergabung dengan mining pool adalah cara terbaik untuk mendapatkan hadiah yang konsisten dengan menggabungkan hash power kamu dengan milik orang lain.

Panduan ini berfokus pada penambangan Zcash menggunakan perangkat keras pribadi (misalnya, PC rumah dengan GPU atau ASIC tingkat pemula). Perlu dicatat bahwa meskipun GPU masih dapat menambang Zcash, ASIC jauh lebih efisien dan menguntungkan di tahun 2026 karena kesulitan jaringan. Selalu periksa profitabilitas saat ini menggunakan alat seperti WhatToMine.com, karena faktor-faktor seperti biaya listrik, harga perangkat keras, dan nilai ZEC memengaruhi kelayakan. Penambangan mungkin tidak menguntungkan bagi semua orang; teliti regulasi lokal dan tarif energi (targetkan < $0.08/kWh).


## Persyaratan

### Hardware
- **Penambangan GPU (Setup Pribadi Direkomendasikan untuk Pemula):**
  - GPU NVIDIA atau AMD dengan minimal 4GB VRAM (misalnya, NVIDIA GTX 1070, RTX 3060; AMD RX 580 atau yang lebih baik).
  - Motherboard yang kompatibel, PSU yang memadai (minimal 750W untuk beberapa GPU), dan pendinginan yang baik untuk mencegah overheating.
  - Rig multi-GPU umum digunakan untuk hash rate yang lebih baik (misalnya, 6x GPU dapat mencapai 1-2 kSol/s).
- **Penambangan ASIC (Lebih Efisien tetapi Biaya Lebih Tinggi):**
  - ASIC yang kompatibel dengan Equihash seperti Bitmain Antminer Z15 (420 kSol/s) atau Innosilicon A9 (50 kSol/s).
  - Perangkat ini lebih berisik, lebih panas, dan mengonsumsi lebih banyak daya (misalnya, 1500W+); cocok untuk ruang khusus. Belilah dari sumber terpercaya seperti Bitmain.com atau reseller (Blockware Mining).
- **Umum:** Internet yang stabil, sebuah komputer untuk setup/monitoring. ASIC mendominasi jaringan (~13 GSol/s total hashrate pada tahun 2026), membuat penambangan GPU menjadi kurang kompetitif tetapi tetap memungkinkan bagi penghobi.

### Software
- **Sistem Operasi:** Windows 10/11, Linux (Ubuntu direkomendasikan untuk stabilitas).
- **Software Penambangan:**
  - Untuk GPU: lolMiner (mendukung AMD/NVIDIA), GMiner, atau miniZ (berfokus pada NVIDIA). Unduh dari repo resmi GitHub (misalnya, github.com/Lolliedieb/lolMiner-releases).
  - Untuk ASIC: Gunakan firmware/dashboard bawaan pabrikan (misalnya, antarmuka web Bitmain).
- **Dompet:** Sebuah dompet Zcash untuk menerima pembayaran. Rekomendasi:
  - Terlindungi (privat): Zodl Wallet, Zingo (Mobile/Desktop), Zkool (mobile/desktop).
  - Transparan (lebih mudah tetapi kurang privat): Edge Wallet, Zecwallet Lite.
  - Unduh dari [wallets](https://zechub.wiki/wallets). Buat alamat terlindungi (dimulai dengan 'zs') untuk privasi jika pool mendukungnya.

### Lainnya
- Listrik: Hitung biaya yang diperlukan. GPU menggunakan 150-300W per kartu; ASIC 1000W+.
- Antivirus: Nonaktifkan selama pengaturan karena dapat menandai penambang sebagai ancaman.

## Panduan Langkah demi Langkah untuk Bergabung dengan Pool Penambangan

### Langkah 1: Siapkan Dompet Zcash Kamu
1. Unduh dan instal dompet dari situs web resmi Zcash [wallets](https://zechub.wiki/wallets).
2. Buat dompet baru dan cadangkan frasa pemulihan kamu dengan aman.
3. Buat alamat penerima (disarankan menggunakan alamat terlindungi untuk privasi). Catat alamat tersebut, misalnya `zs1exampleaddress...`.
4. Jika menggunakan alamat transparan (dimulai dengan 't'), prosesnya lebih sederhana tetapi menawarkan privasi yang lebih rendah.

### Langkah 2: Siapkan Hardware Kamu
- Untuk GPU:
  1. Pasang GPU ke dalam PC kamu dan perbarui driver (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Lakukan overclock jika kamu sudah berpengalaman (gunakan MSI Afterburner untuk stabilitas; targetkan +100-200 core clock, -500 memory untuk efisiensi).
- Untuk ASIC:
  1. Hubungkan ASIC ke daya dan Ethernet.
  2. Temukan alamat IP-nya menggunakan alat seperti Advanced IP Scanner atau aplikasi dari produsennya.
  3. Akses web dashboard (misalnya, masukkan IP di browser, login default: root/root untuk Bitmain).

**Peringatan:** Pastikan ventilasi memadai; penambangan menghasilkan panas. Mulailah dari skala kecil untuk pengujian.

### Langkah 3: Pilih dan Bergabung dengan Pool Penambangan
Pool penambangan mendistribusikan pekerjaan dan membagi imbalan berdasarkan hashrate yang kamu kontribusikan. Pilih berdasarkan biaya (0-2%), minimum pembayaran (0.01-0.1 ZEC), lokasi (ping rendah), dan keandalan.

**Pool yang Direkomendasikan (Berdasarkan Hashrate, Biaya, dan Ulasan):**
- **2Miners (zec.2miners.com)**: biaya 1%, pembayaran PPLNS, mendukung GPU/ASIC/NiceHash. Hashrate tinggi (~1.17 GSol/s), server andal.
- **F2Pool (zec.f2pool.com)**: biaya 2%, pembayaran PPS+, dukungan multi-coin. Pool besar (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: biaya 2% (PPS+), dashboard yang ramah pengguna, server global.
- **AntPool (zec.antpool.com)**: biaya 1%, dari Bitmain, bagus untuk ASIC (~494 MSol/s).
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**: Pool penambangan Zcash profesional oleh Foundry Digital. Menggunakan pembayaran PPLNS, menawarkan pelacakan imbalan yang transparan dan dukungan kelas enterprise. Paling cocok untuk penambang ASIC institusional dan skala besar; memerlukan verifikasi akun.
- **Sovright (mining.sovright.com)**: Sebuah pool Zcash yang dibangun di atas Stratum V2, saat ini berjalan sebagai testnet publik. Belum ada pembayaran ZEC secara langsung, jadi anggaplah ini sebagai cara untuk menguji pengaturan kamu daripada sebagai sumber penghasilan. Lihat bagian khusus di bawah untuk detailnya.
- Lainnya: Kryptex Pool, Luxor (cek poolwatch.io/coin/zcash untuk statistik real-time).

1. Kunjungi situs web pool dan buat akun (menggunakan email atau tanpa registrasi untuk beberapa seperti 2Miners).
2. Tambahkan alamat dompet Zcash kamu di pengaturan untuk pembayaran.
3. Catat server stratum pool (misalnya, zec.2miners.com:1010) dan port-nya.

### Langkah 4: Instal dan Konfigurasi Software Penambangan
- Untuk GPU (Contoh: lolMiner di Windows/Linux):
  1. Unduh lolMiner dari GitHub (versi terbaru, misal 1.88).
  2. Ekstrak ke sebuah folder.
  3. Buat file batch (start.bat) dengan konfigurasi:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Ganti `YOUR_WALLET_ADDRESS` dengan alamat ZEC kamu.
     - `WORKER_NAME`: Nama untuk rig kamu (misalnya, Rig1).
     - Untuk server EU: eu.zec.2miners.com:1010.
  4. Jalankan file batch tersebut. File ini akan terhubung ke pool dan mulai menambang.
- Untuk ASIC (Contoh: Bitmain Antminer):
  1. Login ke web dashboard.
  2. Buka Miner Configuration.
  3. Tambahkan detail pool:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Username: ALAMAT_DOMPET_KAMU.NAMA_WORKER
     - Password: x (atau kosongkan).
  4. Simpan dan reboot miner tersebut.
- Untuk software lain (misalnya, GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Uji Coba:** Jalankan selama 10-15 menit; periksa konsol untuk melihat share yang diterima dan hashrate.

### Langkah 5: Mulai Menambang dan Memantau
1. Jalankan penambang: program akan terhubung ke pool dan mulai mengirimkan share.
2. Pantau melalui:
   - Dashboard pool: Masukkan alamat dompet kamu untuk melihat hashrate, saldo yang belum dibayar, dan statistik.
   - Konsol software: Perhatikan jika ada error, suhu (jaga agar tetap < 80 derajat C).
   - Tools: Gunakan HiveOS atau SimpleMining OS untuk manajemen rig jarak jauh.
3. Pembayaran: Sebagian besar pool membayar secara otomatis saat kamu mencapai batas minimum (misalnya, 0.05 ZEC). Periksa aturan pool tersebut.

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Pool Testnet dan Jaringan Relay

Sovright (sovright.com) menjalankan sebuah pool penambangan Stratum V2 dan jaringan relay blok terpisah. Keduanya memiliki tugas yang berbeda, sehingga dibahas secara terpisah di bawah ini.

### Mining Pool (mining.sovright.com)

Pool milik Sovright berjalan pada Zcash testnet publik (NU6, Stratum V2), bukan mainnet. Testnet ini tidak memberikan pembayaran ZEC asli. Gunakanlah untuk menguji konfigurasi penambang kamu, bukan untuk mencari keuntungan.

- Tidak diperlukan akun untuk memulai. Arahkan penambang Equihash CPU atau ASIC ke pool dan share kamu akan muncul di dashboard secara langsung.
- Sovright juga merilis proxy Stratum V2 open source bagi penambang yang ingin memilih template blok mereka sendiri alih-alih hanya mengambil job dari pool:

### Memantau Pool Zcash Foundry

Untuk pengguna Pool Zcash Foundry:

- Pantau performa penambang melalui dashboard pool Foundry.
- Periksa:
  - Worker aktif
  - Hashrate yang dilaporkan
  - Shares yang diterima
  - Estimasi imbalan
  - Status pembayaran

Karena Foundry menggunakan model imbalan PPLNS, imbalan penambangan bergantung pada kontribusi share selama jendela imbalan pool daripada hanya berdasarkan hashrate instan saja.

Praktik pemantauan yang direkomendasikan:
- Bandingkan hashrate dashboard ASIC dengan hashrate yang dilaporkan oleh Foundry.
- Selidiki share yang ditolak, share stale, atau ketidakstabilan koneksi.
- Jaga konektivitas jaringan agar tetap stabil karena downtime mengurangi jumlah share yang dikirim dan potensi imbalan.
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Arahkan penambang kamu ke proxy alih-alih langsung ke pool:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  menggunakan nama worker seperti `yourname.rig1`.
- Halaman transparansi Sovright menyatakan kebijakan "sertakan semua" untuk transaksi terlindungi, tidak seperti beberapa pool yang menyaringnya. Setiap blok mendapatkan atestasi bertanda tangan sehingga kebijakan tersebut dapat diperiksa secara independen.
- Buat akun di mining.sovright.com (masuk dengan Google atau email) untuk melacak worker milikmu sendiri alih-alih menggunakan data dashboard sampel.

### Jaringan Relay (relay.sovright.com)

Sovright menjalankan jaringan relay blok publik secara terpisah di mainnet Zcash. Ketika sebuah pool menemukan sebuah blok, seberapa cepat blok tersebut mencapai bagian lain dari jaringan akan menentukan seberapa sering blok itu menjadi orphaned, yang berarti blok tersebut kalah dalam perlombaan propagasi dan imbalannya akan hilang. Relay ini meneruskan blok ke empat wilayah menggunakan compact block relay dengan forward error correction.

Dashboard publik menampilkan efeknya secara langsung: wilayah yang terhubung ke relay dapat melihat blok baru dalam waktu jauh di bawah setengah dari waktu yang dibutuhkan oleh gossip peer-to-peer biasa, dan dashboard tersebut melacak tingkat orphan jaringan secara langsung.

Ini adalah infrastruktur untuk operator pool, bukan penambang individu. Repositori `mining-infra` open source milik Sovright mendokumentasikan gateway relay `submitblock` untuk menyebarkan blok yang ditemukan ke dalam mesh lebih cepat daripada P2P asli. Untuk terhubung, hubungi Sovright secara langsung (support@sovright.com) untuk mendapatkan alamat peer relay dan kunci auth.


## Tips dan Praktik Terbaik
- **Profitabilitas:** Gunakan kalkulator seperti whattomine.com/coins/166-zec-equihash. Contoh: Sebuah RTX 3060 (~300 Sol/s) menghasilkan ~0.001 ZEC/hari pada harga $50/ZEC, dikurangi biaya listrik ~$0.50.
- **Privasi:** Gunakan pool terlindungi jika tersedia; hindari menggunakan kembali alamat yang sama.
- **Keamanan:** Gunakan kata sandi yang kuat; aktifkan 2FA pada pool/dompet. Jangan pernah membagikan private key.
- **Pemecahan Masalah:** Jika tidak ada share, periksa firewall, antivirus, atau konfigurasi yang salah. Bergabunglah dengan forum seperti forum.zcashcommunity.com atau Reddit r/zec.
- **Alternatif:** Jika tidak menguntungkan, pertimbangkan cloud mining atau staking koin lain.
- **Catatan Lingkungan:** Penambangan mengonsumsi energi; gunakan sumber terbarukan jika memungkinkan.
- **Pembaruan:** Zcash dapat berkembang (misalnya, potensi peralihan ke PoS); periksa z.cash untuk berita terbaru.
