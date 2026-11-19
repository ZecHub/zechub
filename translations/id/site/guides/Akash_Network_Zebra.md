# Cara menjalankan Zebra di Akash Network

Panduan langkah demi langkah untuk menyebarkan Zebra Zcash full node di Akash.

### Apa yang Kamu Deploy

Sebuah node Zebra full yang akan:

-> Sinkronkan seluruh blockchain Zcash (100GB+ untuk mainnet, ~40GB untuk testnet)

-> Biaya sekitar $15/bulan tergantung pada harga token AKT

-> Membutuhkan waktu beberapa jam hingga beberapa hari untuk sinkronisasi sepenuhnya

-> Gunakan 4 vCPU, 16GB RAM, penyimpanan 350GB (mainnet) atau 2 vCPU, 8GB RAM, 50GB (testnet)


Template awesome-akash kini menetapkan versi tetap **Zebra 7.0.0** (jangan pernah `:latest`). Template ini mengaktifkan Prometheus (`9999`) dan health (`8080`) secara internal, JSON-RPC secara internal untuk **lightwalletd** yang ditempatkan bersama melalui gRPC **9067**, serta feature flag `ENABLE_METRICS` / `ENABLE_HEALTH` / `ENABLE_RPC` / `ENABLE_LIGHTWALLETD`.

Untuk node Mainnet yang sudah dipangkas dan berjalan lebih cepat, lihat [Cara menjalankan Zakura di Akash](/guides/akash-network-zakura). Untuk dashboard Regtest sementara, lihat [Demikianlah Sabda Zakura di Akash](/guides/thus-spoke-zakura-akash).

### Cara Akash memublikasikan port

Angka-angka dalam SDL (`port` / `as`) adalah **port container**. Zebra tetap mendengarkan pada **8233**, lightwalletd pada **9067**, dan pemeriksaan kesehatan pada **8080**. Angka-angka tersebut berlaku untuk proses dan layanan lain dalam deployment yang sama (`zebra:8232`).

Itu **bukan** port pada IP publik penyedia.

**Default (template ini):** tidak ada IP khusus. Untuk setiap expose TCP `global: true`, provider memetakan **port tinggi acak** pada host bersama ke port container kamu. Setelah masa sewa berakhir, **Leases → URIs** di Console/Air mencantumkan endpoint yang sebenarnya, misalnya:

```
zebra-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Peer dan dompet menggunakan nilai host:port **tersebut**. Salin URI untuk expose yang kamu perlukan (P2P vs lightwalletd). Jika kamu mengatur `ZEBRA_NETWORK__EXTERNAL_ADDR`, atur ke URI P2P yang dipetakan (`provider.example:31482`), bukan `…:8233`.

**HTTP** (`as: 80` dengan `http_options`, digunakan di dashboard Thus Spoke): banyak penyedia menerbitkan **nama host ingress** (sering kali di port 80/443) alih-alih port TCP acak. Buka URI untuk layanan tersebut di browser.

**Internal** (`global: false` atau `to: service: lightwalletd`): hanya DNS cluster (`zebra:8232`). Tidak ada URI publik.

**IP Khusus** (`endpoints` / `kind: ip` di SDL) adalah **fitur premium tambahan**. IP khusus dapat menetapkan IP publik dan terkadang port `as` pada IP tersebut. Template ini **tidak** memintanya. Tambahkan sendiri nanti jika kamu menginginkan `host:8233` yang stabil; perkirakan biaya tambahan dan lebih sedikit penyedia yang bisa kamu pilih.

### Situs yang digunakan (pembayaran)

SDL-nya sama. Kedua Akash UI web berbeda dalam **cara kamu membayar**.

| Situs | Pembayaran | Dompet |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Pembayaran web konvensional (kartu / jaringan fiat yang ditawarkan Console) | Akun Console |
| [air.akash.network](https://air.akash.network) | Pembayaran Akash native (AKT / ACT) | **Keplr** |

Gunakan **Air** saat kamu ingin membayar dengan Keplr secara on-chain. Gunakan **Console** saat kamu ingin menggunakan alur pembayaran web konvensional. Jangan berharap ada penyelesaian native Keplr di Console.

### Prasyarat

**Jika kamu membayar melalui Console (checkout web)**

1. Akun Console di [console.akash.network](https://console.akash.network)
2. Metode pembayaran yang diterima UI Console
3. Beberapa menit di UI

**Jika kamu membayar di Air (native Akash / Keplr)**

1. **Ekstensi browser Keplr** (Chrome/Brave/Firefox)
2. **AKT / ACT** di Keplr untuk deposit dan lease (dari exchange atau IBC)
3. Buka [air.akash.network](https://air.akash.network)

#### Langkah 1: Hubungkan

**Console (pembayaran web)**

→ Buka [https://console.akash.network](https://console.akash.network)

-> Masuk / selesaikan alur akun Console

Gunakan checkout yang ditampilkan UI (bukan Keplr on-chain)

**Air (pembayaran native Akash)**

-> Buka [https://air.akash.network](https://air.akash.network)

-> Klik **"Connect Wallet"**

-> Pilih **Keplr** dan setujui koneksinya

-> Pastikan saldo AKT/ACT kamu cukup untuk deposit dan sewa

#### Langkah 2: Membuat Deployment

-> Klik **"Deploy"**

-> Pilih **"Build your template"** (atau lewati langsung ke pengunggahan SDL)


##### Opsi A: Unggah File SDL (Direkomendasikan)

**Pembayaran web (Console)**

[![Deploy on Akash Console](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

**Pembayaran Akash native dengan Keplr (Air)**

[Buka template ini di Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Opsi B: Gunakan Editor SDL

Jika kamu ingin menempelkan [SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml) secara manual:

-> Salin isi dari *zebra-akash.yml*

-> Tempel ke dalam editor SDL

-> Modifikasi sesuai kebutuhan (lihat bagian konfigurasi di bawah)

-> Klik **"Create Deployment"**


#### Langkah 3: Tinjau dan Setujui Deposit

UI akan menampilkan:

-> **Deposit deployment**: ~5 AKT (kamu akan mendapatkan ini kembali saat kamu menutup deployment)

-> **Estimasi biaya**: Berdasarkan harga SDL kamu

Di **Air**, klik **"Approve"** dan masuk ke **Keplr**. Di **Console**, selesaikan proses checkout web yang ditampilkan UI.

#### Langkah 4: Pilih Penyedia

Setelah ~ 30 detik, kamu akan melihat penawaran dari penyedia layanan. Setiap penawaran menunjukkan:

-> **Harga per blok** (dalam AKT atau USDC)

**Estimasi biaya bulanan**

-> **Detail penyedia** (uptime, wilayah, dll.)


**Jangan hanya pilih yang termurah.** Periksa:

-> Persentase uptime (targetkan > 95%)

-> Wilayah (semakin dekat dengan kamu = latensi semakin baik, tetapi tidak terlalu berpengaruh bagi node blockchain)

-> Status audit (tanda centang hijau = lebih tepercaya)


Klik **"Accept Bid"** pada provider pilihanmu. Di Air, masuk Keplr. Di Console, konfirmasikan melalui alur pembayaran web.

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

-> Tidak ada error yang berulang


#### Langkah 7: Dapatkan Alamat Node Kamu

Klik pada tab **Leases**, lalu **URIs**.

Kamu akan melihat sesuatu seperti:

```
zebra-8233: provider-hostname.com:31482
lightwalletd-9067: provider-hostname.com:32011
```

Setiap baris adalah expose `global: true`. Namanya mencakup port SDL `as` (8233, 9067). Angka setelah hostname adalah **port yang dipetakan oleh provider**, yang ditetapkan saat lease. Node Zcash lainnya terhubung ke `provider-hostname.com:31482`. Dompet ringkas menggunakan URI lightwalletd (TLS nonaktif kecuali kamu mengakhiri TLS sendiri).

Container tetap mendengarkan pada port 8233 / 9067. Alamat publik selalu berupa URI, kecuali jika nanti kamu menambahkan IP khusus (tidak termasuk dalam templat ini).

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

Jika kamu mengekspos RPC dengan `global: true`, alamat publiknya tetap berupa **lease URI** (`host:&lt;random-high-port&gt;`), bukan `host:8232`. Dengan `global: false` (templat ini), RPC tetap berada di jaringan deployment (`zebra:8232` untuk lightwalletd). Lease IP khusus adalah opsi berbayar yang terpisah dan tidak termasuk dalam SDL.

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

-> Klik **"Perbarui"** (Air: masuk Keplr; Console: konfirmasi alur pembayaran web)

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

-> Konfirmasi (Air: masuk Keplr; Console: konfirmasi di UI Console)

Deposit 5 AKT kamu akan dikembalikan. **Penyimpanan persisten** seharusnya tetap dijaga oleh penyedia layanan, tetapi jangan mengandalkannya - perlakukan hal tersebut seperti penyedia cloud lainnya.

### Pemecahan Masalah

#### Kesalahan "Saldo tidak cukup"

Di Air, danai Keplr dengan AKT/ACT. Di Console, top up metode pembayaran Console.

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

Pantau pengeluaranmu di Console atau Air:

-> **Deployment Saya** -> Deployment kamu -> Menampilkan estimasi "Biaya per bulan"

-> Air: saldo AKT/ACT Keplr kamu berkurang seiring waktu. Console: saldo pembayaran Console kamu berkurang.

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

**Akash Console** (pembayaran web): [https://console.akash.network](https://console.akash.network)

**Air Akash** (AKT/ACT native + Keplr): [https://air.akash.network](https://air.akash.network)

**Dokumentasi Akash**: [https://akash.network/docs/](https://akash.network/docs/)

**Dokumentasi Zebra**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Explorer Zcash**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (untuk masalah penyedia)

