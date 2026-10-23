# Zcash Panduan Penambangan: Bergabung dengan Pool Penambangan menggunakan Hardware Pribadi

## Pendahuluan

Zcash (ZEC) adalah cryptocurrency yang berfokus pada privasi dan menggunakan algoritme proof-of-work Equihash untuk penambangan. Menambang Zcash melibatkan penggunaan daya komputasi untuk menyelesaikan masalah matematika yang kompleks, memvalidasi transaksi, dan mengamankan jaringan sebagai imbalan atas hadiah ZEC. Karena tingkat kesulitan jaringan yang tinggi, penambangan solo tidak disarankan bagi sebagian besar pengguna. Bergabung dengan pool penambangan adalah cara terbaik untuk memperoleh hadiah yang konsisten dengan menggabungkan hash power kamu dengan pengguna lain.

Panduan ini berfokus pada penambangan Zcash menggunakan hardware pribadi (misalnya, PC rumahan dengan GPU atau ASIC tingkat pemula). Perhatikan bahwa meskipun GPU masih dapat menambang Zcash, ASIC jauh lebih efisien dan menguntungkan pada tahun 2026 karena tingkat kesulitan jaringan. Selalu periksa profitabilitas terkini menggunakan alat seperti WhatToMine.com, karena faktor seperti biaya listrik, harga hardware, dan nilai ZEC memengaruhi kelayakannya. Penambangan mungkin tidak menguntungkan bagi semua orang; teliti regulasi lokal dan tarif energi (targetkan < $0.08/kWh).


## Persyaratan

### Hardware
- **Penambangan GPU (Pengaturan Pribadi Direkomendasikan untuk Pemula):**
  - GPU NVIDIA atau AMD dengan VRAM minimal 4GB (misalnya, NVIDIA GTX 1070, RTX 3060; AMD RX 580 atau lebih baik).
  - Motherboard yang kompatibel, PSU yang memadai (minimal 750W untuk beberapa GPU), serta pendinginan yang baik untuk mencegah panas berlebih.
  - Rig multi-GPU umum digunakan untuk memperoleh hash rate yang lebih baik (misalnya, 6x GPU dapat mencapai 1-2 kSol/s).
- **Penambangan ASIC (Lebih Efisien tetapi Biaya Lebih Tinggi):**
  - ASIC yang kompatibel dengan Equihash seperti Bitmain Antminer Z15 (420 kSol/s) atau Innosilicon A9 (50 kSol/s).
  - Perangkat ini lebih berisik, lebih panas, dan mengonsumsi lebih banyak daya (misalnya, 1500W+); cocok untuk ruang khusus. Beli dari sumber tepercaya seperti Bitmain.com atau penjual kembali (Blockware Mining).
- **Umum:** Internet stabil dan komputer untuk pengaturan/pemantauan. ASIC mendominasi jaringan (~13 GSol/s total hash rate pada tahun 2026), sehingga penambangan GPU kurang kompetitif tetapi masih memungkinkan bagi penghobi.

### Software
- **Sistem Operasi:** Windows 10/11, Linux (Ubuntu direkomendasikan untuk stabilitas).
- **Software Penambangan:**
  - Untuk GPU: lolMiner (mendukung AMD/NVIDIA), GMiner, atau miniZ (berfokus pada NVIDIA). Unduh dari repositori GitHub resmi (misalnya, github.com/Lolliedieb/lolMiner-releases).
  - Untuk ASIC: Gunakan firmware/dashboard bawaan produsen (misalnya, antarmuka web Bitmain).
- **Dompet:** Dompet Zcash untuk menerima pembayaran. Direkomendasikan:
  - Terlindungi (privat): ZODL Wallet, Zingo (Mobile/Desktop), Zkool (seluler/desktop).
  - Transparan (lebih mudah tetapi kurang privat): Edge Wallet, Zecwallet Lite.
  - Unduh dari [wallets](https://zechub.wiki/wallets). Buat alamat terlindungi (diawali dengan 'zs') untuk privasi jika pool mendukungnya.

### Lainnya
- Listrik: Hitung biayanya. GPU menggunakan 150-300W per kartu; ASIC 1000W+.
- Antivirus: Nonaktifkan selama pengaturan karena mungkin menandai miner sebagai ancaman.

## Panduan Langkah demi Langkah untuk Bergabung dengan Pool Penambangan

### Langkah 1: Siapkan Dompet Zcash Kamu
1. Unduh dan instal dompet dari situs web resmi Zcash [wallets](https://zechub.wiki/wallets).
2. Buat dompet baru dan cadangkan frasa pemulihan kamu dengan aman.
3. Buat alamat penerima (sebaiknya terlindungi untuk privasi). Catat alamat tersebut, misalnya, `zs1exampleaddress...`.
4. Jika menggunakan alamat transparan (diawali dengan 't'), caranya lebih sederhana tetapi menawarkan privasi yang lebih sedikit.

### Langkah 2: Siapkan Hardware Kamu
- Untuk GPU:
  1. Instal GPU di PC kamu dan perbarui driver (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Lakukan overclock jika berpengalaman (gunakan MSI Afterburner untuk stabilitas; targetkan +100-200 core clock, -500 memory untuk efisiensi).
- Untuk ASIC:
  1. Hubungkan ASIC ke daya dan Ethernet.
  2. Temukan alamat IP-nya menggunakan alat seperti Advanced IP Scanner atau aplikasi produsen.
  3. Akses dashboard web (misalnya, masukkan IP di browser, login bawaan: root/root untuk Bitmain).

**Peringatan:** Pastikan ventilasi memadai; penambangan menghasilkan panas. Mulailah dari skala kecil untuk pengujian.

### Langkah 3: Pilih dan Bergabung dengan Pool Penambangan
Pool penambangan mendistribusikan pekerjaan dan membagikan hadiah berdasarkan hash rate yang kamu kontribusikan. Pilih berdasarkan biaya (0-2%), minimum pembayaran (0.01-0.1 ZEC), lokasi (ping rendah), dan keandalan.

**Pool yang Direkomendasikan (Berdasarkan Hashrate, Biaya, dan Ulasan):**
- **2Miners (zec.2miners.com)**: Biaya 1%, pembayaran PPLNS, mendukung GPU/ASIC/NiceHash. Hashrate tinggi (~1.17 GSol/s), server andal.
- **F2Pool (zec.f2pool.com)**: Biaya 2%, pembayaran PPS+, dukungan multi-coin. Pool besar (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: Biaya 2% (PPS+), dashboard ramah pengguna, server global.
- **AntPool (zec.antpool.com)**: Biaya 1%, dari Bitmain, baik untuk ASIC (~494 MSol/s).
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**: Pool penambangan Zcash profesional oleh Foundry Digital. Menggunakan pembayaran PPLNS, menawarkan pelacakan hadiah transparan dan dukungan tingkat perusahaan. Paling cocok bagi penambang ASIC institusional dan berskala besar; memerlukan verifikasi akun.
- **Sovright (mining.sovright.com)**: Pool Zcash yang dibangun di atas Stratum V2, saat ini berjalan sebagai testnet publik. Belum ada pembayaran ZEC langsung, jadi anggap ini sebagai cara menguji pengaturan kamu, bukan sumber penghasilan. Lihat bagian khusus di bawah untuk detailnya.
- Lainnya: Kryptex Pool, Luxor (periksa poolwatch.io/coin/zcash untuk statistik waktu nyata).

1. Kunjungi situs web pool dan buat akun (email atau tanpa pendaftaran untuk beberapa pool seperti 2Miners).
2. Tambahkan alamat dompet Zcash kamu dalam pengaturan untuk pembayaran.
3. Catat server stratum pool (misalnya, zec.2miners.com:1010) dan port-nya.

### Langkah 4: Instal dan Konfigurasikan Software Penambangan
- Untuk GPU (Contoh: lolMiner di Windows/Linux):
  1. Unduh lolMiner dari GitHub (versi terbaru, misalnya, 1.88).
  2. Ekstrak ke folder.
  3. Buat file batch (start.bat) dengan konfigurasi:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Ganti `YOUR_WALLET_ADDRESS` dengan alamat ZEC kamu.
     - `WORKER_NAME`: Nama untuk rig kamu (misalnya, Rig1).
     - Untuk server EU: eu.zec.2miners.com:1010.
  4. Jalankan file batch. File tersebut akan terhubung ke pool dan mulai menambang.
- Untuk ASIC (Contoh: Bitmain Antminer):
  1. Masuk ke dashboard web.
  2. Buka Miner Configuration.
  3. Tambahkan detail pool:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Nama pengguna: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Kata sandi: x (atau kosong).
  4. Simpan dan mulai ulang miner.
- Untuk software lain (misalnya, GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Uji:** Jalankan selama 10-15 menit; periksa konsol untuk share yang diterima dan hash rate.

### Langkah 5: Mulai Menambang dan Memantau
1. Jalankan miner: miner akan terhubung ke pool dan mulai mengirimkan share.
2. Pantau melalui:
   - Dashboard pool: Masukkan alamat dompet kamu untuk melihat hash rate, saldo belum dibayar, dan statistik.
   - Konsol software: Perhatikan kesalahan, suhu (jaga < 80 derajat C).
   - Alat: Gunakan HiveOS atau SimpleMining OS untuk manajemen rig jarak jauh.
3. Pembayaran: Sebagian besar pool membayar secara otomatis saat kamu mencapai minimum (misalnya, 0.05 ZEC). Periksa aturan pool.

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Pool Testnet dan Jaringan Relay

Sovright (sovright.com) menjalankan pool penambangan Stratum V2 dan jaringan relay blok terpisah. Keduanya memiliki fungsi berbeda, sehingga dibahas secara terpisah di bawah.

### Pool Penambangan (mining.sovright.com)

Pool Sovright berjalan pada testnet Zcash publik (NU6, Stratum V2), bukan mainnet. Testnet tidak membayar ZEC nyata. Gunakan untuk menguji konfigurasi miner kamu, bukan untuk memperoleh penghasilan.

- Tidak diperlukan akun untuk memulai. Arahkan miner CPU atau ASIC Equihash ke pool dan share kamu akan muncul di dashboard langsung.
- Sovright juga menerbitkan proxy Stratum V2 open source bagi penambang yang ingin memilih template blok mereka sendiri alih-alih hanya mengambil pekerjaan dari pool:

### Memantau Foundry Zcash Pool

Untuk pengguna Foundry Zcash Pool:

- Pantau performa miner melalui dashboard pool Foundry.
- Periksa:
  - Worker aktif
  - Hashrate yang dilaporkan
  - Share yang diterima
  - Perkiraan hadiah
  - Status pembayaran

Karena Foundry menggunakan model hadiah PPLNS, hadiah penambangan bergantung pada share yang dikontribusikan selama jendela hadiah pool, bukan hanya hash rate sesaat.

Praktik pemantauan yang direkomendasikan:
- Bandingkan hashrate dashboard ASIC dengan hashrate yang dilaporkan Foundry.
- Selidiki share yang ditolak, share basi, atau ketidakstabilan koneksi.
- Pertahankan konektivitas jaringan yang stabil karena waktu henti mengurangi share yang dikirimkan dan potensi hadiah.
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Arahkan miner kamu ke proxy alih-alih langsung ke pool:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  menggunakan nama worker seperti `yourname.rig1`.
- Halaman transparansi Sovright menyatakan kebijakan "include all" untuk transaksi terlindungi, tidak seperti beberapa pool yang memfilternya. Setiap blok mendapat atestasi yang ditandatangani sehingga kebijakan tersebut dapat diperiksa secara independen.
- Buat akun di mining.sovright.com (masuk dengan Google atau email) untuk melacak worker kamu sendiri alih-alih data dashboard contoh.

### Jaringan Relay (relay.sovright.com)

Sovright secara terpisah menjalankan jaringan relay blok publik pada mainnet Zcash. Saat sebuah pool menemukan blok, seberapa cepat blok tersebut mencapai seluruh jaringan menentukan seberapa sering blok itu menjadi orphan, yang berarti kalah dalam perlombaan propagasi dan hadiahnya hilang. Relay meneruskan blok di empat wilayah menggunakan relay blok ringkas dengan forward error correction.

Dashboard publik menunjukkan dampaknya secara langsung: wilayah yang terhubung ke relay melihat blok baru dalam waktu jauh di bawah setengah waktu yang diperlukan gossip peer to peer biasa, dan dashboard melacak tingkat orphan jaringan secara langsung.

Ini adalah infrastruktur bagi operator pool, bukan penambang individu. Repositori `mining-infra` open source milik Sovright mendokumentasikan gateway relay `submitblock` untuk menyebarkan blok yang ditemukan ke mesh lebih cepat daripada P2P bawaan. Untuk terhubung, hubungi Sovright secara langsung (support@sovright.com) untuk alamat peer relay dan auth key.


## Menambang menggunakan node Zebra kamu sendiri

Semua hal di atas mengarahkan miner kamu ke pool milik orang lain. Jalur lainnya adalah menjalankan node sendiri dan meminta software penambangan kamu untuk memintanya memberikan pekerjaan. Karena zcashd berhenti pada 18 Juli 2026, itu berarti [Zebra](/zcash-tech/zebra-full-node), node yang dibahas bagian ini.

Bagian Zebra kecil dan spesifik: node ini membangun template blok dan menerima blok yang telah diselesaikan melalui antarmuka RPC-nya. Hashing dilakukan oleh software penambangan, dan pembagian hadiah di antara beberapa miner adalah tugas software pool. Apakah penambangan sendiri dapat menemukan blok bergantung pada bagian kamu dari hash rate jaringan, yang tidak coba diperkirakan oleh bagian ini. Itulah sebabnya pendahuluan halaman ini tidak merekomendasikan penambangan solo bagi sebagian besar pengguna.

Langkah-langkah ini mengikuti dua halaman Zebra Book, [Menambang Zcash dengan Zebra](https://zebra.zfnd.org/user/mining.html) dan [Menambang dengan Zebra di Docker](https://zebra.zfnd.org/user/mining-docker.html), sebagaimana adanya pada 8 Oktober 2026. Nama key dan nilai bawaan berubah antar-rilis, jadi periksa Book sebelum kamu mengandalkannya.

### Tetapkan alamat yang menerima hadiah

Buat file konfigurasi dengan pengaturan bawaan, lalu edit:

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

Alamat miner diperlukan ([Book: Alamat miner](https://zebra.zfnd.org/user/mining.html#miner-address)):

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

Zebra menerima alamat P2PKH atau P2SH transparan, alamat Sapling, atau Unified Address. Untuk Unified Address dengan lebih dari satu receiver, Book menyatakan bahwa Zebra membayar satu receiver, "mengutamakan Orchard, lalu Sapling, kemudian transparan".

Dua key opsional berada di bagian `[mining]` yang sama:

| Key | Fungsinya | Batas |
|---|---|---|
| `extra_coinbase_data` | Menambahkan tag publik, seperti nama pool, ke input coinbase setiap blok yang kamu tambang, setelah penanda milik Zebra sendiri ([Book](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)) | 86 byte. Di atas itu, "Zebra menolak untuk memulai" |
| `miner_memo` | Melampirkan memo terlindungi pada output hadiah. Tidak seperti `extra_coinbase_data`, memo ini tidak publik: hanya seseorang dengan viewing key untuk alamat penerima yang dapat membacanya ([Book](https://zebra.zfnd.org/user/mining.html#miner-memo)) | 512 byte. Ini hanya berfungsi saat hadiah masuk ke receiver terlindungi. Dengan alamat transparan, ini "diam-diam tidak berpengaruh" |

### Buka port RPC

Software penambangan berbicara dengan Zebra melalui JSON-RPC, yang tetap nonaktif sampai kamu memberinya alamat untuk didengarkan ([Book: Bagian RPC](https://zebra.zfnd.org/user/mining.html#rpc-section)):

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232 adalah port RPC standar di Mainnet. `127.0.0.1` menjaga port tersebut hanya dapat dijangkau dari mesin yang sama.

Sejak Zebra 2.0.0, cookie melindungi port RPC, metode yang serupa dengan yang digunakan zcashd. Zebra menulis cookie saat endpoint RPC dimulai dan menghapusnya saat dimatikan. Secara bawaan, file tersebut berada di direktori cache Zebra, misalnya `/home/user/.cache/zebra/.cookie` di Linux, dan berisi satu baris:

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir` memindahkan file tersebut. `rpc.enable_cookie_auth = false` menonaktifkan pemeriksaan, dan bersamanya satu-satunya autentikasi yang dimiliki port RPC: apa pun yang dapat menjangkau port kemudian dapat memanggilnya.

### Jalankan Zebra dan biarkan melakukan sinkronisasi

```bash
zebrad
```

Zebra membaca konfigurasi dari lokasi bawaan. Berikan `-c /path/to/zebrad.toml` untuk menggunakan file lain. Tunggu hingga sinkronisasi selesai. Log menampilkan `sync_percent=100.000%` saat selesai ([Book: Menjalankan zebra](https://zebra.zfnd.org/user/mining.html#running-zebra)). [Zebra Full Node](/zcash-tech/zebra-full-node) membahas hardware dan ruang disk.

### Periksa dengan getblocktemplate

`getblocktemplate` adalah panggilan yang dibuat software penambangan untuk mendapatkan pekerjaan, sehingga juga merupakan pengujian tercepat ([Book: Menguji pengaturan](https://zebra.zfnd.org/user/mining.html#testing-the-setup)). Masukkan isi file cookie kamu sebagai pengganti `__cookie__:PASSWORD`:

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

Pengaturan yang berfungsi mengembalikan objek `result` dengan field yang diperlukan miner, di antaranya `previousblockhash`, `coinbasetxn`, `target`, dan `height`. Jika kamu menetapkan `extra_coinbase_data`, Book menjelaskan cara menemukan tag kamu di `coinbasetxn.data`.

### Arahkan software penambangan kamu ke sana

Berikan endpoint RPC, `127.0.0.1:8232`, serta nama pengguna dan kata sandi dari cookie kepada software penambangan atau pool kamu. Book menyatakan Zebra "mendukung metode RPC yang diperlukan untuk menjalankan sebagian besar software pool penambangan" ([Book: Jalankan pool penambangan](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)).

Dua catatan dari Book sebelum kamu memilih software:

- **s-nomp hanya untuk pengujian.** Book menyebut pengaturan s-nomp-nya "eksperimental" dan menyatakan s-nomp "tidak kompatibel dengan NU5, sehingga beberapa fungsi penambangan dinonaktifkan". Panduan [Testnet](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html)-nya menambahkan bahwa s-nomp "belum diperbarui secara resmi untuk NU5 atau peningkatan jaringan setelahnya" dan mengarahkan penambang produksi ke software pool yang mendukung peningkatan terkini.
- **Zebra menyediakan stack siap pakai.** Repositori Zebra memiliki pengaturan Compose Docker di [`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining) yang memulai Zebra bersama pool penambangan dan, jika kamu memintanya, miner CPU. Pool di dalamnya adalah s-nomp dan berjalan di Testnet kecuali kamu mengubahnya, jadi anggap ini sebagai cara mempelajari bagian-bagian yang bergerak.

### Jalur Docker

Jalur terpendek dalam Book adalah image `zfnd/zebra` Docker, dengan alamat dan port RPC diberikan sebagai environment variable ([Book: Menambang dengan Zebra di Docker](https://zebra.zfnd.org/user/mining-docker.html)). Perintah di bawah adalah perintah Book dengan satu perubahan: perintah tersebut hanya memublikasikan port RPC pada alamat loopback host, sehingga mesin lain tidak dapat menjangkaunya.

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

Perintah ini memulai node Mainnet, memublikasikan port P2P (8233) pada host Docker, dan membuat port RPC (8232) hanya dapat dijangkau dari host itu sendiri. Cetak cookie dengan:

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **Simpan `0.0.0.0` di `ZEBRA_RPC__LISTEN_ADDR`.** Itu adalah alamat yang didengarkan Zebra di dalam container. Docker meneruskan port yang dipublikasikan ke antarmuka jaringan container sendiri, sehingga Zebra yang mendengarkan di `127.0.0.1` di dalam container tidak akan menerima koneksi, bahkan dari host. `127.0.0.1:` di depan `-p`-lah yang menjaga port tetap tidak dapat diakses dari jaringan.
- **Perintah Book** memublikasikan port RPC dengan `-p 8232:8232`, yang membukanya pada setiap antarmuka jaringan host.
- **Untuk berlatih di Testnet**, tambahkan `-e ZEBRA_NETWORK__NETWORK="Testnet"`, tetapkan `ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232`, publikasikan `-p 18233:18233` dan `-p 127.0.0.1:18232:18232`, serta berikan alamat Testnet. Alamat Mainnet mencegah Zebra memulai di Testnet, dan sebaliknya.

Membayar miner dan menangani dompet berada di luar bagian ini. Untuk sisi dompet, lihat [Zallet](/zcash-tech/zallet).

## Tips dan Praktik Terbaik
- **Profitabilitas:** Gunakan kalkulator seperti whattomine.com/coins/166-zec-equihash. Contoh: RTX 3060 (~300 Sol/s) menghasilkan ~0.001 ZEC/hari pada $50/ZEC, dikurangi biaya listrik ~$0.50.
- **Privasi:** Gunakan pool terlindungi jika tersedia; hindari menggunakan ulang alamat.
- **Keamanan:** Gunakan kata sandi yang kuat; aktifkan 2FA pada pool/dompet. Jangan pernah membagikan private key.
- **Pemecahan Masalah:** Jika tidak ada share, periksa firewall, antivirus, atau konfigurasi yang salah. Bergabunglah dengan forum seperti forum.zcashcommunity.com atau Reddit r/zec.
- **Alternatif:** Jika tidak menguntungkan, pertimbangkan cloud mining atau staking coin lain.
- **Catatan Lingkungan:** Penambangan mengonsumsi energi; gunakan sumber terbarukan jika memungkinkan.
- **Pembaruan:** Zcash mungkin berkembang (misalnya, potensi peralihan PoS); periksa z.cash untuk berita.
