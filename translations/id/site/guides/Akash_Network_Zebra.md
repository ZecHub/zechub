# Cara menjalankan Zebra di Akash Network

Panduan langkah demi langkah untuk menyebarkan Zcash full node Zebra menggunakan [Akash Console](https://console.akash.network).

### Apa yang Kamu Deploy

Sebuah node Zebra full yang akan:

-> Sinkronkan seluruh blockchain Zcash (100GB+ untuk mainnet, ~40GB untuk testnet)

-> Biaya sekitar $15/bulan tergantung pada harga token AKT

-> Membutuhkan waktu beberapa jam hingga beberapa hari untuk sinkronisasi sepenuhnya

-> Gunakan 4 vCPU, 16GB RAM, penyimpanan 350GB (mainnet) atau 2 vCPU, 8GB RAM, 50GB (testnet)


### Penting: Pemetaan Port pada Akash

Saat kamu mengekspos sebuah port di Akash (misalnya, port 8233 untuk P2P Zebra), port tersebut **TIDAK akan terikat ke port yang sama persis** pada IP publik penyedia. Sebaliknya, penyedia akan menetapkan sebuah high port acak (seperti 31234 atau 42567) dan melakukan reverse-proxy ke port 8233 milik kontainer kamu.

Ini memang sudah dirancang seperti itu - penyedia menjalankan beberapa deployment, dan mereka akan mengalami konflik jika semua orang mencoba menggunakan port 8233 secara langsung.

**Apa artinya ini bagimu:**

-> Kamu mengonfigurasi port 8233 di SDL (port P2P standar Zebra)

-> Akash memberikan kamu URI seperti *provider.com:31234*

-> Node Zcash lainnya terhubung ke kamu di *provider.com:31234*

Di dalam kontainer kamu, Zebra masih mendengarkan pada port 8233


Ini ditangani secara otomatis. Cukup gunakan URI yang diberikan oleh Akash kepada kamu.

### Prasyarat

1. Ekstensi browser **Keplr Wallet** sudah terinstal (Chrome/Brave/Firefox)
2. **token AKT** - Dapatkan 50-100 AKT dari sebuah exchange (Coinbase, Kraken, Osmosis)
3. **5 menit** untuk menelusuri UI Console

#### Langkah 1: Hubungkan Dompet Kamu

→ Buka [https://console.akash.network](https://console.akash.network)

-> Klik **"Connect Wallet"** di pojok kanan atas

-> Pilih **Keplr** (atau dompet Cosmos pilihanmu)

→ Setujui koneksi saat Keplr muncul


Saldo AKT kamu seharusnya muncul di kanan atas. Jika saldonya nol, isi saldo dompet kamu terlebih dahulu.

#### Langkah 2: Membuat Deployment

-> Klik tombol **"Deploy"** (tombol biru besar, di tengah halaman)

-> Pilih **"Build your template"** (atau lewati langsung ke pengunggahan SDL)


##### Opsi A: Unggah File SDL (Direkomendasikan)

[![Deploy on Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Opsi B: Gunakan Editor SDL

Jika kamu ingin menempelkan [SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml) secara manual:

-> Salin isi dari *zebra-akash.yml*

-> Tempel ke dalam editor SDL

-> Modifikasi sesuai kebutuhan (lihat bagian konfigurasi di bawah)

-> Klik **"Create Deployment"**


#### Langkah 3: Tinjau dan Setujui Deposit

Konsol akan menunjukkan padamu:

-> **Deposit deployment**: ~5 AKT (kamu akan mendapatkan ini kembali saat kamu menutup deployment)

-> **Estimasi biaya**: Berdasarkan harga SDL kamu

Klik **"Approve"** dan tanda tangani transaksi di Keplr.

#### Langkah 4: Pilih Penyedia

Setelah ~ 30 detik, kamu akan melihat penawaran dari penyedia layanan. Setiap penawaran menunjukkan:

-> **Harga per blok** (dalam AKT atau USDC)

**Estimasi biaya bulanan**

-> **Detail penyedia** (uptime, wilayah, dll.)


**Jangan hanya pilih yang termurah.** Periksa:

-> Persentase uptime (targetkan > 95%)

-> Wilayah (semakin dekat dengan kamu = latensi semakin baik, tetapi tidak terlalu berpengaruh bagi node blockchain)

-> Status audit (tanda centang hijau = lebih tepercaya)


Klik **"Accept Bid"** pada penyedia yang kamu pilih dan tanda tangani di Keplr.

#### Langkah 5: Tunggu Deployment

Console akan:

-> Buat sewa dengan penyedia yang kamu pilih

-> Kirim manifes (memberitahu penyedia apa yang harus dijalankan)

-> Mulai kontainer kamu

Proses ini memakan waktu 1-2 menit. Kamu akan melihat pembaruan status di UI.

#### Langkah 6: Verifikasi Bahwa Node Sedang Berjalan

Setelah diterapkan, kamu akan melihat:

-> Tab **Services**: Menampilkan layanan *zebra* kamu beserta statusnya

-> Tab **Logs**: Log kontainer secara langsung

-> Tab **Leases**: Detail tentang deployment kamu (DSEQ, penyedia, biaya)


##### Periksa Log

Klik pada **Logs** dan kamu akan melihat Zebra sedang memulai:

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

Sinkronisasi akan memakan waktu **beberapa jam hingga beberapa hari** tergantung pada jaringan. Perhatikan:

-> Meningkatkan tinggi blok

-> Koneksi peer (seharusnya 10-30 peer)

Please provide the Markdown fragment you would like me to translate. I am ready to begin the localization process following all your specified rules and terminology.


#### Langkah 7: Dapatkan Alamat Node Kamu

Klik pada tab **Leases**, lalu **URIs**.

Kamu akan melihat sesuatu seperti:

```bash
zebra-8233: provider-hostname.com:31234
```

Ini adalah **endpoint P2P publik** milik node kamu. Node Zcash lainnya akan terhubung ke kamu di alamat ini.

**Perhatikan pemetaan port:** Kamu mengonfigurasi port 8233 di SDL, tetapi Akash menetapkannya ke port publik yang berbeda (31234 dalam contoh ini). Hal ini normal - lihat bagian "Port Mapping on Akash" di bagian atas jika ini membingungkan kamu. Node kamu dapat diakses pada port mana pun yang ditunjukkan oleh Akash di sini, tidak harus 8233.

Jika kamu mengaktifkan RPC (secara default dinonaktifkan dalam SDL), kamu juga akan melihat endpoint RPC di sini dengan port terpetakan miliknya sendiri.

### Opsi Konfigurasi

#### Beralih ke Testnet

SDL secara default menggunakan Mainnet. Untuk menggunakan Testnet sebagai gantinya:

-> **Berikan komentar pada konfigurasi Mainnet** di bagian *env*:

   ```yaml
   # - "ZEBRA_NETWORK__NETWORK=Mainnet"
   # - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:8233"
   ```

-> **Hapus komentar konfigurasi Testnet**:

   ```yaml
   - "ZEBRA_NETWORK__NETWORK=Testnet"
   - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:18233"
   ```

-> **Perbarui port yang diekspos** pada bagian *expose*:

   ```yaml
   # Comment out Mainnet port:
   # - port: 8233
   #   as: 8233
   #   to:
   #     - global: true
   #   proto: tcp

   # Uncomment Testnet port:
   - port: 18233
     as: 18233
     to:
       - global: true
     proto: tcp
   ```

-> **Opsional: Kurangi sumber daya** untuk Testnet di *profiles.compute.zebra.resources*:

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **Opsional: Harga lebih rendah** pada *profiles.placement.akash.pricing*:

   ```yaml
   amount: 5000  # Down from 10000
   ```

#### Mengaktifkan Akses RPC

RPC dinonaktifkan secara default demi keamanan. Untuk mengaktifkannya:

**Untuk Mainnet:**

-> Hilangkan tanda komentar di bagian *env*:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Hapus tanda komentar pada port RPC Mainnet di *expose*:

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

**Untuk Testnet:**

-> Hapus tanda komentar di bagian *env*:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Hilangkan komentar pada port RPC Testnet di *expose*:

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Peringatan**: Jika kamu mengatur *global: true* untuk RPC, kamu mengeksposnya ke internet. Zebra menggunakan autentikasi cookie secara default, namun tetap saja - jangan lakukan ini kecuali kamu tahu apa yang kamu lakukan.

**Pengingat pemetaan port**: Meskipun kamu mengekspos RPC secara global, Akash akan memetakannya ke port tinggi acak (bukan 8232/18232). Periksa URI dalam deployment kamu untuk melihat endpoint publik yang sebenarnya. Untuk *global: false* (direkomendasikan), endpoint RPC hanya dapat diakses di dalam jaringan deployment Akash, bukan dari internet publik.

#### Mengaktifkan Metrik (Prometheus)

Untuk mengambil metrik guna pemantauan:

-> Hapus tanda komentar di *env*:

   ```yaml
   - "ZEBRA_METRICS__ENDPOINT_ADDR=0.0.0.0:9999"
   ```

-> Hapus tanda komentar pada port metrik di *expose*:

   ```yaml
   - port: 9999
     as: 9999
     to:
       - global: false
     proto: tcp
   ```

#### Menyesuaikan Sumber Daya/Harga

Jika kamu tidak mendapatkan penawaran atau ingin mengoptimalkan biaya:

**Untuk penyedia dengan spesifikasi lebih rendah**, kurangi pada bagian *profiles.compute.zebra.resources*:

-> CPU: *unit: 2* (minimum untuk kecepatan sinkronisasi yang wajar)

-> Memori: *ukuran: 12Gi* (minimum untuk stabilitas)

-> Penyimpanan: *ukuran: 120Gi* (minimum untuk mainnet)

**Untuk menarik lebih banyak penawaran**, tingkatkan *profiles.placement.akash.pricing*:

-> Mainnet: Coba *jumlah: 1000000* uakt/block

-> Testnet: Coba *jumlah: 1000000* uakt/block

### Memperbarui Deployment Kamu

Perlu mengubah konfigurasi setelah melakukan deployment?

-> Buka **My Deployments** di Console

Temukan deployment Zebra kamu

-> Klik **"Update Deployment"**

-> Edit SDL

-> Klik **"Update"** dan setujui di Keplr

**Catatan**: Pembaruan akan memulai ulang kontainer kamu. Node akan melanjutkan dari status yang tersimpan (penyimpanan persisten), tetapi harap antisipasi waktu henti selama 1-2 menit.

### Pemantauan

#### Melalui Konsol

-> **Tab log**: Log kontainer secara langsung

-> **Tab Shell**: Dapatkan shell di dalam kontainer (berguna untuk debugging)

-> **Tab Event**: event Kubernetes (sebagian besar tidak berguna kecuali ada sesuatu yang rusak)


#### Melalui RPC (jika diaktifkan)

Jika kamu mengaktifkan RPC, kamu dapat melakukan kueri ke node milikmu sebagai zebrad full node biasa (karena memang demikian!)

### Menutup Deployment Kamu

Saat kamu sudah selesai atau ingin berhenti membayar:

-> Buka **Deployment Saya**

Temukan deployment Zebra kamu

-> Klik **"Close Deployment"**

-> Konfirmasi dan tanda tangani di Keplr

Deposit 5 AKT kamu akan dikembalikan. **Penyimpanan persisten** seharusnya tetap dijaga oleh penyedia layanan, tetapi jangan mengandalkannya - perlakukan hal tersebut seperti penyedia cloud lainnya.

### Pemecahan Masalah

#### Kesalahan "Saldo tidak cukup"

Kamu butuh lebih banyak AKT. Isi saldo dompet Keplr kamu.

#### Tidak ada penawaran yang muncul

Entah:

-> Harga kamu terlalu rendah (tingkatkan *jumlah* dalam SDL)

-> Kebutuhan sumber daya kamu terlalu tinggi untuk penyedia yang tersedia (kurangi CPU/memori/penyimpanan)

-> Tunggu lebih lama (terkadang membutuhkan waktu 60-90 detik agar penawaran muncul)


#### Deployment tertahan dalam status "pending"

Penyedia layanan mungkin sedang mengalami masalah. Tutup deployment dan coba penyedia layanan lain.

#### log Zebra menunjukkan "No peers connected"

Ini normal untuk beberapa menit pertama. Zebra akan menemukan peer secara otomatis. Jika hal ini berlanjut setelah lebih dari 10 menit, kamu mungkin mengalami masalah jaringan (kecil kemungkinannya terjadi di Akash).

#### Kesalahan "Out of memory" dalam log

Kamu terlalu hemat dalam penggunaan RAM. Tutup deployment tersebut dan lakukan redeploy dengan setidaknya 12Gi memori (disarankan 16Gi).

#### Sinkronisasi memakan waktu sangat lama

Selamanya:

-> **Jam**: Normal

-> **Hari**: Juga normal untuk mainnet dari awal

-> **Minggu**: Ada yang salah, periksa log untuk melihat kesalahan


### Manajemen Biaya

Pantau pengeluaran kamu di Console:

-> **Deployment Saya** -> Deployment kamu -> Menampilkan estimasi "Biaya per bulan"

Saldo dompet Keplr kamu akan berkurang seiring berjalannya waktu


Saat saldo kamu menipis, Akash akan menutup deployment kamu secara otomatis. **Isi ulang dompet kamu secara berkala** atau atur peringatan.

#### Mengurangi Biaya

-> **Gunakan Testnet** untuk pengujian non-produksi (50% lebih murah)

-> **CPU/memori lebih rendah** jika kamu tidak membutuhkan sinkronisasi cepat

-> **Pilih penyedia yang lebih murah** (tidak selalu bijaksana - uptime sangat penting)


### Mainnet vs Testnet

```markdown
----------------------------------------------------------------------------------
|            | Mainnet (default)               | Testnet                         |
---------------------------------------------------------------------------------|
| Purpose   | Production Zcash blockchain      | Testing and development         |
| Network   | ZEBRA_NETWORK__NETWORK=Mainnet   | ZEBRA_NETWORK__NETWORK=Testnet  |
| P2P Port  | 8233                             | 18233                           |
| RPC Port  | 8232                             | 18232                           |
| Sync time | Days                             | Hours                           |
| Storage   | 350GB+                           | 50GB                            |
| Resources | 4 CPU / 16GB RAM                 | 2 CPU / 8GB RAM                 |
| Cost      | ~$15/month                       | ~$5/month                       |
----------------------------------------------------------------------------------
```

Mulailah dengan Testnet jika kamu hanya sedang menguji proses deployment. Lihat bagian "Beralih ke Testnet" di atas untuk konfigurasi.

### Sumber Daya Tambahan

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Dokumentasi Akash**: [https://akash.network/docs/](https://akash.network/docs/)

**Dokumentasi Zebra**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Explorer Zcash**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (untuk masalah penyedia)

