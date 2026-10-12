# Men-deploy zcashd ke Akash melalui Console

> **Usang. Jangan ikuti panduan ini untuk men-deploy node yang ingin kamu gunakan.**
>
> zcashd telah mencapai penghentian otomatis Akhir Dukungan (End-of-Support) pada 18 Juli 2026. Node zcashd yang di-deploy hari ini tidak akan sinkron ke ujung chain, sehingga deployment tersebut memakan biaya setiap bulan dan tidak menghasilkan apa pun.
>
> Gunakan **Zebra** sebagai gantinya: [Cara menjalankan Zebra di Akash Network](/guides/akash-network-zebra), yang mencakup alur kerja Akash Console yang sama dan hanya membutuhkan sekitar sepertiga dari kapasitas disk. Jika kamu sedang memindahkan setup yang sudah ada, lihat [zcashd ke panduan migrasi Zebra dan Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Halaman ini tetap disimpan sebagai catatan historis dari deployment zcashd.

Panduan untuk menerapkan zcashd Zcash full node (implementasi Electric Coin Co) menggunakan [Akash Console](https://console.akash.network). Berikut adalah video tutorial di bawah ini. Panduan yang lebih mendalam dapat ditemukan di bawah ini.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Pengaturan Zcash Full Node di Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div >


## Apa yang Kamu Deploy

Sebuah full zcashd node yang akan:

-> Sinkronkan seluruh blockchain Zcash (350GB+ untuk mainnet, ~ 40GB untuk testnet)

-> Biaya sekitar $15/bulan tergantung pada harga token AKT

-> Membutuhkan waktu beberapa jam hingga beberapa hari untuk sinkronisasi sepenuhnya

-> Gunakan 4 vCPU, 16GB RAM, penyimpanan 350GB (mainnet) atau 2 vCPU, 8GB RAM, 50GB (testnet)

-> Mengunduh parameter kriptografi pada saat pertama kali dijalankan (~ 2GB, satu kali saja)

**zcashd vs Zebra:**

zcashd adalah implementasi Zcash node asli oleh Electric Coin Co, yang dihentikan sejak 18 Juli 2026

Zebra, dari Zcash Foundation, adalah full node yang digunakan saat ini

-> Hanya Zebra yang mengikuti rantai saat ini; sebuah node zcashd tidak dapat mencapai ujung rantai

dompet zcashd telah digantikan oleh [Zallet](/using-zcash/zallet-quick-reference-guide)

-> Gunakan zcashd jika kamu membutuhkan fungsionalitas dompet atau API RPC tertentu


### **Penting: Pemetaan Port pada Akash**

Saat kamu mengekspos sebuah port di Akash (misalnya, port 8233 untuk P2P zcashd), port tersebut **TIDAK akan terikat ke port yang sama persis** pada IP publik penyedia. Sebaliknya, penyedia akan menetapkan port tinggi secara acak (seperti 31234 atau 42567) dan melakukan reverse-proxy ke port 8233 milik kontainer kamu.

Ini memang sudah dirancang seperti itu - penyedia menjalankan beberapa deployment, dan mereka akan mengalami konflik jika semua orang mencoba menggunakan port 8233 secara langsung.

**Apa artinya ini bagi kamu:**

-> Kamu mengonfigurasi port 8233 di SDL (port P2P standar zcashd)

-> Akash memberikan kamu URI seperti *provider.com:31234*

-> Node Zcash lainnya terhubung ke kamu di *provider.com:31234*

-> Di dalam kontainer kamu, zcashd masih mendengarkan pada port 8233


Ini ditangani secara otomatis. Cukup gunakan URI yang diberikan oleh Akash kepada kamu.

## Prasyarat

-> Ekstensi browser **Keplr Wallet** sudah terinstal (Chrome/Brave/Firefox)

-> **token AKT** - Dapatkan 50-100 AKT dari sebuah exchange (Coinbase, Kraken, Osmosis)

-> **5 menit** untuk menelusuri UI Console


## Langkah 1: Hubungkan Dompet Kamu

→ Buka [https://console.akash.network](https://console.akash.network)

-> Klik **"Connect Wallet"** di pojok kanan atas

-> Pilih **Keplr** (atau dompet Cosmos pilihanmu)

-> Setujui koneksi saat Keplr muncul


Saldo AKT kamu seharusnya muncul di kanan atas. Jika saldonya nol, isi saldo dompet kamu terlebih dahulu.

## Langkah 2: Membuat Deployment

-> Klik tombol **"Deploy"** (tombol biru besar, di tengah halaman)

-> Pilih **"Build your template"** (atau lewati langsung ke pengunggahan SDL)

### Opsi A: Unggah File SDL (Direkomendasikan)

> **Tombol ini menyebarkan node yang terhenti.** Ini akan menagih saldo AKT kamu untuk node yang tidak dapat melakukan sinkronisasi. Gunakan panduan ](/guides/akash-network-zebra)[Zebra sebagai gantinya.

[![Deploy on Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Opsi B: Gunakan Editor SDL

Jika kamu ingin menempelkan SDL secara manual:

-> Salin isi dari *zcashd-akash.yml*

-> Tempel ke dalam editor SDL

-> Modifikasi sesuai kebutuhan (lihat bagian konfigurasi di bawah)

-> Klik **"Create Deployment"**


## Langkah 3: Tinjau dan Setujui Deposit

Konsol akan menunjukkan kepada kamu:

-> **Deposit deployment**: ~ 5 AKT (kamu akan mendapatkan ini kembali saat kamu menutup deployment)

-> **Estimasi biaya**: Berdasarkan harga SDL kamu


Klik **"Approve"** dan tanda tangani transaksi di Keplr.

## Langkah 4: Pilih Penyedia Layanan

Setelah ~ 30 detik, kamu akan melihat penawaran dari penyedia layanan. Setiap penawaran menunjukkan:

-> **Harga per blok** (dalam AKT atau USDC)

**Estimasi biaya bulanan**

-> **Detail penyedia** (uptime, wilayah, dll.)


**Jangan hanya pilih yang termurah.** Periksa:

-> Persentase uptime (targetkan > 95%)

-> Wilayah (semakin dekat dengan kamu = latensi semakin baik, tetapi tidak terlalu berpengaruh bagi node blockchain)

-> Status audit (tanda centang hijau = lebih tepercaya)


Klik **"Accept Bid"** pada penyedia yang kamu pilih dan tanda tangani di Keplr.

## Langkah 5: Tunggu Deployment

Console akan:

-> Buat sewa dengan penyedia yang kamu pilih

-> Kirim manifest (memberitahu penyedia apa yang harus dijalankan)

-> Mulai kontainer kamu


Proses ini memakan waktu 1-2 menit. Kamu akan melihat pembaruan status di UI.

## Langkah 6: Verifikasi Bahwa Node Sudah Berjalan

Setelah diterapkan, kamu akan melihat:

-> Tab **Services**: Menampilkan layanan *zcashd* kamu beserta statusnya

-> Tab **Logs**: Log langsung dari zcashd node kamu

-> Tab **Leases**: Detail tentang deployment kamu (DSEQ, penyedia, biaya)


### Periksa Log

Klik pada **Logs** dan kamu akan melihat zcashd sedang memulai:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**Jalankan pertama kali akan mengunduh zcash-params (~2GB).** Ini adalah operasi satu kali dan memakan waktu 5-10 menit tergantung pada bandwidth penyedia layanan. Restart berikutnya akan melewati proses ini.

Sinkronisasi akan memakan waktu **berjam-jam hingga berhari-hari** tergantung pada jaringan. Perhatikan:

-> Meningkatkan tinggi blok

-> Koneksi peer (seharusnya 10-30 peer)

Please provide the Markdown fragment you would like me to translate. I am ready to begin the localization process following all your specified rules and terminology.


## Langkah 7: Dapatkan Alamat Node Kamu

Klik pada tab **Leases**, lalu **URIs**.

Kamu akan melihat sesuatu seperti:

```
zcashd-8233: provider-hostname.com:31234
```

Ini adalah **endpoint P2P publik** milik node kamu. Node Zcash lainnya akan terhubung ke kamu di alamat ini.

**Perhatikan pemetaan port:** Kamu mengonfigurasi port 8233 di SDL, tetapi Akash menetapkannya ke port publik yang berbeda (31234 dalam contoh ini). Hal ini normal - lihat bagian "Port Mapping on Akash" di bagian atas jika ini membingungkan kamu. Node kamu dapat diakses pada port mana pun yang ditunjukkan oleh Akash di sini, tidak harus 8233.

Jika kamu mengaktifkan RPC (secara default dikomentari di dalam SDL), kamu juga akan melihat endpoint RPC di sini dengan port terpetakan miliknya sendiri.

## Opsi Konfigurasi

### Beralih ke Testnet

SDL secara default menggunakan Mainnet. Untuk menggunakan Testnet sebagai gantinya:

-> **Ubah jaringan di bagian *env*:**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
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

-> **Opsional: Kurangi sumber daya** untuk Testnet dalam *profiles.compute.zcashd.resources*:

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

> catatan: menurunkan harga dapat menyaring penyedia kami agar tidak melakukan penawaran. bereksperimenlah dengan nilai ini, atau gunakan endpoint penyedia untuk memeriksa apakah mereka akan melakukan penawaran. (tinjau dokumentasi API penyedia)

### Aktifkan Akses RPC

RPC dinonaktifkan secara default demi keamanan. Untuk mengaktifkannya:

**KRITIS: Atur kredensial yang kuat.** zcashd RPC mengirimkan username/password melalui HTTP (bukan HTTPS). Hanya buka akses RPC jika kamu memahami implikasi keamanannya.

-> Hapus tanda komentar di bagian *env*:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> Hilangkan komentar pada port RPC di *expose*:

**Untuk Mainnet:**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

**Untuk Testnet:**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Peringatan**: Jika kamu mengatur *global: true* untuk RPC, kamu mengeksposnya ke internet dengan autentikasi dasar. Ini adalah ide yang buruk. Gunakan *global: false* dan akses RPC melalui jaringan internal Akash atau siapkan terowongan (tunnel) yang aman.

**Pengingat pemetaan port**: Meskipun kamu mengekspos RPC secara global, Akash akan memetakannya ke port tinggi acak (bukan 8232/18232). Periksa URI dalam deployment kamu untuk melihat endpoint publik yang sebenarnya. Untuk *global: false* (disarankan), endpoint RPC hanya dapat diakses di dalam jaringan deployment Akash, bukan dari internet publik.

### Aktifkan Indeks Transaksi

Indeks transaksi memungkinkan kamu untuk mencari transaksi apa pun berdasarkan ID-nya melalui RPC. Menggunakan lebih banyak penyimpanan (peningkatan ~ 20%).

Hapus komentar di *env*:

```yaml
- "ZCASHD_TXINDEX=1"
```

**Peringatan**: Mengaktifkan txindex pada node yang sudah tersinkronisasi memerlukan pengindeksan ulang seluruh blockchain, yang memakan waktu berjam-jam.

### Mengaktifkan Insight Explorer

Insight Explorer menyediakan endpoint REST API tambahan untuk data blockchain (berguna untuk block explorer).

Hapus komentar di *env*:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Ini secara otomatis mengaktifkan txindex dan menambahkan metode RPC tambahan.

### Mengaktifkan Metrik Prometheus

Untuk mengambil metrik guna pemantauan:

-> Hapus tanda komentar di *env*:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> Hilangkan komentar pada port metrik di *expose*:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
Metrik akan tersedia di http://yourendpoint:9969/metrics dalam format Prometheus.

### Menyesuaikan Sumber Daya/Harga

Jika kamu tidak mendapatkan penawaran atau ingin mengoptimalkan biaya:

**Untuk penyedia dengan spesifikasi lebih rendah**, kurangi pada bagian *profiles.compute.zcashd.resources*:

-> CPU: *unit: 2* (minimum untuk kecepatan sinkronisasi yang wajar)

-> Memori: *ukuran: 12Gi* (minimum untuk stabilitas)

-> Penyimpanan: *ukuran: 120Gi* (minimum untuk mainnet)


**Untuk menarik lebih banyak penawaran**, tingkatkan *profiles.placement.akash.pricing*:

-> Mainnet: Coba *jumlah: 15000* uakt/block

-> Testnet: Coba *jumlah: 7500* uakt/block


Nilai-nilai SDL ditetapkan cukup tinggi secara konservatif. Sebagian besar penyedia akan mengajukan penawaran yang lebih rendah.

## Memperbarui Deployment Kamu

Perlu mengubah konfigurasi setelah melakukan deployment?

-> Buka **My Deployments** di Console

Temukan deployment zcashd kamu

-> Klik **"Update Deployment"**

-> Edit SDL

-> Klik **"Update"** dan setujui di Keplr


**Catatan**: Pembaruan akan memulai ulang kontainer kamu. Node akan melanjutkan dari status yang tersimpan (penyimpanan persisten), tetapi harap antisipasi waktu henti selama 1-2 menit.

## Pemantauan

### Melalui Konsol

-> **Tab log**: Log kontainer secara langsung

-> **Tab Shell**: Dapatkan shell di dalam container (berguna untuk debugging)

-> **Tab Event**: event Kubernetes (sebagian besar tidak berguna kecuali ada sesuatu yang rusak)


### Melalui RPC (jika diaktifkan)

Jika kamu mengaktifkan RPC, kamu dapat melakukan kueri ke node milikmu sebagai zcashd full node biasa (karena memang demikian!)

### Alternatif zcash-cli

Jika kamu memiliki akses shell melalui Console, kamu dapat menggunakan *zcash-cli* secara langsung:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Menutup Deployment Kamu

Saat kamu sudah selesai atau ingin berhenti membayar:

-> Buka **Deployment Saya**

Temukan deployment zcashd kamu

-> Klik **"Close Deployment"**

-> Konfirmasi dan tanda tangani di Keplr


Deposit 5 AKT kamu akan dikembalikan. **Penyimpanan persisten** seharusnya tetap dijaga oleh penyedia layanan, tetapi jangan mengandalkannya - perlakukan hal tersebut seperti penyedia cloud lainnya.

## Pemecahan Masalah

### Kesalahan "Saldo tidak cukup"

Kamu butuh lebih banyak AKT. Isi saldo dompet Keplr kamu.

### Tidak ada penawaran yang muncul

Entah:

-> Harga kamu terlalu rendah (tingkatkan *jumlah* dalam SDL)

-> Kebutuhan sumber daya kamu terlalu tinggi untuk penyedia yang tersedia (kurangi CPU/memori/penyimpanan)

-> Tunggu lebih lama (terkadang membutuhkan waktu 60-90 detik agar penawaran muncul)


### Deployment tertahan dalam status "pending"

Penyedia layanan mungkin sedang mengalami masalah. Tutup deployment dan coba penyedia layanan lain.

### Log zcashd menunjukkan "No peers connected"

Sejak penghentian End-of-Support pada 18 Juli 2026, ini adalah kondisi permanen yang diperkirakan akan terjadi, bukan sekadar penundaan saat startup, dan tidak ada jumlah waktu tunggu atau deployment ulang yang dapat memperbaikinya. Deploy [Zebra](/guides/akash-network-zebra) sebagai gantinya.

### Kesalahan "Out of memory" dalam log

Kamu terlalu hemat dalam penggunaan RAM. Tutup deployment tersebut dan lakukan redeploy dengan setidaknya 12Gi memori (disarankan 16Gi).

### Sinkronisasi memakan waktu sangat lama

Selamanya:

-> **Jam**: Normal

-> **Hari**: Juga normal untuk mainnet dari awal

-> **Minggu**: Ada yang salah, periksa log untuk melihat kesalahan


### "Error saat mengambil zcash-params"

Penyedia mungkin mengalami masalah jaringan atau bandwidth yang lambat. Hal ini biasanya akan teratasi dengan sendirinya. Jika masalah berlanjut selama lebih dari 30 menit, cobalah melakukan redeploy ke penyedia lain.

### Kegagalan autentikasi RPC

-> Pastikan *ZCASHD_RPCUSER* dan *ZCASHD_RPCPASSWORD* telah diatur dengan benar

-> Pastikan kamu menggunakan port yang benar (8232 untuk mainnet, 18232 untuk testnet)

-> Ingat bahwa port dipetakan oleh Akash - gunakan URI dari deployment kamu, bukan 8232 secara langsung


## Manajemen Biaya

Pantau pengeluaran kamu di Console:

-> **Deployment Saya** -> Deployment kamu -> Menampilkan estimasi "Biaya per bulan"

Saldo dompet Keplr kamu akan berkurang seiring berjalannya waktu


Saat saldo kamu menipis, Akash akan menutup deployment kamu secara otomatis. **Isi ulang dompet kamu secara berkala** atau atur peringatan.

### Mengurangi Biaya

-> **Gunakan Testnet** untuk pengujian non-produksi (50% lebih murah)

-> **CPU/memori lebih rendah** jika kamu tidak membutuhkan sinkronisasi cepat

-> **Pilih penyedia yang lebih murah** (tidak selalu bijaksana - uptime sangat penting)

-> **Gunakan USDC alih-alih AKT** jika harga AKT volatil (memerlukan perubahan penetapan harga SDL)

-> **Nonaktifkan txindex** jika kamu tidak membutuhkannya (menghemat ~ 20% penyimpanan)


### Sumber Daya Tambahan

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Dokumentasi Akash**: [https://akash.network/docs/](https://akash.network/docs/)

**Explorer Zcash**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (untuk masalah penyedia)

## Catatan Akhir

- **Penyimpanan persisten itu penting.** Jangan lewatkan *persistent: true* atau gunakan kelas *beta2*. Gunakan *beta3*.
- **Sinkronisasi awal itu lambat.** Bersabarlah. Ini adalah hal normal bagi node blockchain.
- **Pastikan dompet kamu memiliki saldo.** Deployment akan ditutup secara otomatis saat kamu kehabisan AKT.
- **Backup tidak bersifat otomatis.** Jika kamu peduli dengan datanya, asumsikan data tersebut bisa hilang dan buatlah rencana yang sesuai.
- **Keamanan RPC sangat krusial.** Jangan mengekspos RPC ke internet tanpa langkah keamanan yang tepat.
- **zcash-params disimpan dalam cache.** Saat pertama kali dijalankan, sistem akan mengunduh ~2GB parameter kriptografi. Ini normal dan hanya terjadi satu kali.