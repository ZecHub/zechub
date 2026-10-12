# BTCPay Server dengan Dukungan Zcash: Panduan Instalasi dan Integrasi Lengkap

BTCPay Server memungkinkan bisnis online untuk menerima pembayaran cryptocurrency secara langsung, tanpa perantara atau kustodial. Panduan ini akan membimbing kamu melalui proses lengkap pengaturan BTCPay Server dengan dukungan asli untuk pembayaran terlindungi Zcash.

> Dokumentasi ini berfokus pada pengintegrasian Zcash ke dalam instansi BTCPay Server kamu.  
> Ini mendukung setup **full node (Zebra)** maupun **setup berbasis lightwalletd**.

---

## Daftar Isi

- [Mengapa Menggunakan BTCPay Server dengan Zcash](#Why-Use-BTCPay-Server-with-Zcash)
- [Cara Kerja BTCPay Server](#How-BTCPay-Server-Works)
- [Di Mana Dana Disimpan? Siapa yang Mengontrol Private Key?](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Cara Menyiapkan BTCPay Server untuk Menerima Zcash](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [Menerapkan BTCPay Server dengan Dukungan Zcash](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [Menjalankan Zcash Full Node Milikmu Sendiri (Zebra + Lightwalletd)](#Running-Your-Own-Zcash-Full-Node)
  - [Menghubungkan ke lightwalletd Node Eksternal (Konfigurasi Kustom)](#Connecting-to-an-External-Lightwalletd-Node)
  - [Menghosting BTCPay Server di Rumah dengan Cloudflare Tunnel](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [Mengonfigurasi Plugin Zcash di Antarmuka Web BTCPay Server](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [Mengintegrasikan BTCPay Server dengan Situs Webmu](#Integrating-BTCPay-Server-with-Your-Website)
  - [Integrasi API](#API-Integration)
    - [Menghasilkan API Key](#Generating-an-API-Key)
    - [Contoh: Membuat Invoice via API](#Example-Creating-an-Invoice-via-API)
    - [Menyiapkan Webhook](#Setting-Up-a-Webhook-Optional)
  - [Integrasi CMS](#CMS-Integration)
  - [Tombol Pembayaran atau Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [Kesimpulan](#Conclusion)
- [Sumber Daya](#Resources)


---

## Mengapa Menggunakan BTCPay Server dengan Zcash

Perdagangan online semakin banyak menerima cryptocurrency. Ini cepat, global, dan bekerja tanpa bank. Hal ini menguntungkan baik bagi pedagang maupun pelanggan. Namun, ada satu detail penting yang sering diabaikan oleh banyak orang.

Saat melakukan pemesanan, pelanggan biasanya memberikan informasi pribadi: nama, alamat pengiriman, dan nomor telepon. Jika pembayaran dilakukan menggunakan blockchain publik - seperti Bitcoin, Ethereum, atau stablecoin di Ethereum atau Tron - transaksi tersebut menjadi terlihat secara permanen untuk dianalisis.

Siapa pun, bahkan tanpa mengetahui apa yang dipesan, dapat:

- lihat kapan dan berapa banyak yang dibayarkan
- telusuri dari mana dana berasal dan ke mana dana tersebut pergi
- hubungkan alamat cryptocurrency ke orang sungguhan jika terdapat titik korelasi (misalnya, kebocoran email atau nama pengiriman)

Ini berarti bahwa satu pembelian saja dapat mengungkap seluruh riwayat keuangan seorang pelanggan.

Dan hal ini juga berlaku sebaliknya. Jika alamat seorang pedagang pernah muncul di on-chain, mereka akan menjadi terekspos. Kompetitor dan pengamat pihak ketiga dapat melacak volume pembayaran, aktivitas pemasok, dan struktur alur bisnis.

### Kombinasi antara BTCPay Server dan Zcash dapat menyelesaikan ini.


BTCPay Server adalah sistem gratis dan terdesentralisasi untuk menerima pembayaran cryptocurrency.  
Ini bukan perantara pembayaran dan tidak menyimpan dana apa pun. Semua pembayaran langsung masuk ke dompet merchant.  
Ini bisa berupa dompet pribadi atau pengaturan multisig di dalam sebuah organisasi.

Server menangani tugas-tugas koordinasi:

- menghasilkan alamat unik untuk setiap pesanan  
- melacak kapan pembayaran diterima dan menghubungkannya dengan pesanan  
- menerbitkan tanda terima dan notifikasi  
- menyediakan antarmuka pembayaran bagi pelanggan

Semuanya berjalan di bawah kendali pemilik toko, tanpa bergantung pada layanan pihak ketiga.

Zcash adalah mata uang kripto yang dibangun di atas zero-knowledge proofs. Ini mendukung model transaksi yang sepenuhnya privat.  
Saat menggunakan alamat terlindungi (selanjutnya hanya disebut sebagai "alamat"), pengirim, penerima, dan jumlah transaksi tidak akan terungkap di blockchain.

Bagi toko online, ini berarti:

- Pembeli dapat menyelesaikan pembayaran tanpa mengungkap riwayat keuangan mereka
- Penjual menerima pembayaran tanpa mengekspos alamat, volume penjualan, atau struktur transaksi mereka
- Tidak ada pengamat eksternal yang dapat menghubungkan pembayaran dengan pesanan atau data pelanggan

### Contoh Praktis

Seorang pengguna membuat pesanan dan memilih Bitcoin atau USDT sebagai metode pembayaran.  
Situs web menghasilkan alamat pembayaran dan menampilkan jumlahnya.  
Setelah pembayaran dilakukan, alamat ini disimpan di blockchain dan menjadi publik.  
Seorang penyerang hanya perlu menghubungkan satu pesanan ke alamat tersebut untuk mendapatkan visibilitas jangka panjang terhadap seluruh riwayat transaksinya.

Sekarang bayangkan situasi yang sama dengan Zcash.  
BTCPay Server menghasilkan alamat terlindungi. Pembeli mengirimkan pembayaran.  
Dari perspektif blockchain, tidak ada yang terjadi. Tidak ada data publik untuk dianalisis.  
Server menerima konfirmasi, menghubungkannya ke pesanan, dan menyelesaikan prosesnya.

Bagi pihak luar mana pun, terlihat seolah-olah tidak ada yang terjadi.  
Semua logika tetap berada di antara toko dan pelanggan - sebagaimana mestinya.

Solusi ini tidak mengorbankan otomatisasi atau kegunaan.  
Semuanya bekerja sama seperti pada mata uang kripto lainnya, hanya saja tanpa risiko kebocoran data.



## Cara Kerja BTCPay Server

BTCPay Server bertindak sebagai jembatan pemrosesan pembayaran antara platform e-commerce kamu dan blockchain. Berikut adalah cara alur kerjanya:

1. **Pelanggan membuat pesanan** di situs web kamu (misalnya WooCommerce, Magento, atau platform apa pun dengan integrasi BTCPay).

2. **Toko meminta invoice pembayaran** dari BTCPay Server. Server menghasilkan invoice unik dengan:
   - Jumlah pesanan
   - Timer hitung mundur
   - Sebuah Zcash Unified Address (UA) - misal, `u1...` - yang secara default menyertakan penerima Orchard terlindungi.

3. **Pelanggan melihat halaman pembayaran** dan mengirim ZEC ke alamat yang telah disediakan.

4. **BTCPay Server memantau blockchain**, memeriksa pembayaran terhadap:
   - Jumlah yang diharapkan
   - Alamat penerima
   - Timestamp invoice

5. **Setelah transaksi terdeteksi dan dikonfirmasi**, BTCPay akan memberi tahu toko tersebut.

6. **Pelanggan menerima konfirmasi pembayaran.** Secara opsional, server dapat mengirimkan tanda terima melalui email.

Seluruh proses ini terjadi secara **otomatis**, tanpa perantara atau kustodial.  
BTCPay Server **tidak menyimpan dana apa pun** - ia hanya menghubungkan sistem pesanan ke blockchain secara aman dan privat.
## Di Mana Dana Disimpan? Siapa yang Mengontrol Private Keys?

BTCPay Server **bukan** sebuah dompet dan **tidak memerlukan private keys**.  
Semua dana dikirimkan **secara langsung** ke dompet merchant. Keamanan dipastikan dengan menggunakan **arsitektur berbasis viewing key**.

### Cara Kerjanya

- **Dompet dibuat sebelumnya.**  
  Merchant menggunakan dompet Zcash yang mendukung viewing key - seperti [Zkool](https://github.com/hhanh00/zkool2/) atau Wallet[Zingo!](https://zingolabs.org/).  
  Daftar lengkap tersedia di [ZecHub.wiki](https://zechub.wiki/wallets).

- **BTCPay Server terhubung melalui viewing key.**  
  Viewing key adalah **kunci read-only**: kunci ini dapat mendeteksi pembayaran masuk dan menghasilkan alamat penerima baru,  
  tetapi tidak dapat membelanjakan dana. Server tidak menyimpan frasa pemulihan atau private key.

- **Data blockchain diakses melalui server `lightwalletd`.**  
  Kamu dapat menggunakan node publik seperti `https://zec.rocks`, atau menjalankan stack `Zebra + lightwalletd` milikmu sendiri untuk kedaulatan penuh.

- **Setiap pesanan mendapatkan alamat unik.**  
  Viewing key memungkinkan server untuk menurunkan alamat terlindungi Zcash baru untuk setiap faktur,  
  sehingga pelacakan pembayaran yang aman dapat dilakukan dan penggunaan ulang alamat dapat dicegah.

- **Kamu memegang kendali penuh atas dana tersebut.**  
  Bahkan jika server disusupi, tidak ada yang bisa mencuri uangmu - hanya metadata pembayaran yang mungkin terekspos.

Desain ini memisahkan **infrastruktur** dari **kontrol aset**.  
Kamu dapat memperbarui, melakukan migrasi, atau menginstal ulang BTCPay Server tanpa menempatkan dana apa pun dalam risiko.

## Cara Menyiapkan BTCPay Server untuk Menerima Zcash

Di bagian sebelumnya, kami telah menjelaskan bagaimana BTCPay Server bekerja dengan Zcash dan mengapa hal ini penting untuk pembayaran yang menjaga privasi. Sekarang saatnya untuk mempraktikkannya secara langsung.

Pengaturan persis kamu akan bergantung pada beberapa faktor:

- Apakah kamu sudah memiliki instansi BTCPay Server?
- Apakah kamu ingin menggunakan lightwalletd publik atau menjalankan full node milikmu sendiri?
- Apakah server akan dijalankan di VPS atau di rumah?

Bab ini mencakup semua skenario konfigurasi saat ini - mulai dari pengaturan minimal hingga penerapan yang sepenuhnya berdaulat.

Kita akan membahas hal-hal berikut:

- Cara melakukan deployment semuanya dari awal di VPS, termasuk full node (Zebra)
- Cara menjalankan BTCPay Server di rumah sambil menyembunyikan IP kamu menggunakan **Cloudflare Tunnel**
- Cara mengaktifkan dan mengonfigurasi dukungan Zcash di dalam antarmuka web BTCPay Server
- Cara mengintegrasikan BTCPay dengan situs web atau toko online kamu


## Menjalankan BTCPay Server dengan Dukungan Zcash

Mari kita lanjut ke pengaturan yang sebenarnya. Di bagian ini, kita akan menginstal BTCPay Server dengan dukungan Zcash - baik pada VPS baru atau dengan menambahkan dukungan ZEC ke instance yang sudah ada.

Jika kamu sudah menjalankan BTCPay Server (misalnya untuk BTC atau Lightning), kamu tidak perlu menginstal ulang semuanya - cukup aktifkan plugin ZEC.

Kami akan memandu kamu melalui berbagai konfigurasi, mulai dari pengaturan minimal menggunakan `lightwalletd` node publik hingga instalasi yang sepenuhnya berdaulat dengan full node milikmu sendiri.  
Opsi terbaik bergantung pada lokasi server kamu dan seberapa besar kemandirian yang kamu inginkan dari infrastruktur eksternal.

> Dokumentasi plugin resmi:  
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **Peringatan - satu dompet per instance:**  
> Plugin Zcash menggunakan **satu dompet bersama** di **semua store** dalam instance BTCPay.  
> Jika kamu menjalankan beberapa store independen pada satu instance, mereka akan berbagi dompet Zcash yang sama.  
> Gunakan instance terpisah jika kamu membutuhkan isolasi dompet yang ketat.

---

### Konfigurasi VPS yang Direkomendasikan

Sebelum melakukan instalasi, pastikan kamu sudah memiliki:

- Sebuah VPS dengan **Ubuntu 22.04+**
- Nama domain yang mengarah ke alamat IP server kamu (melalui DNS)
- `git`, `docker`, dan `docker-compose` sudah terinstal
- Akses SSH ke server

---

## Menyiapkan Server Kamu (bagian tersembunyi)

<details>
  <summary>Klik untuk memperluas</summary>

Untuk menyebarkan BTCPay Server dengan dukungan Zcash, kamu akan membutuhkan hal-hal berikut:

### 1. VPS dengan Ubuntu 22.04 atau yang lebih baru

Kami menyarankan penggunaan instalasi minimal dari **Ubuntu Server 22.04 LTS**.  
Penyedia VPS apa pun yang menawarkan alamat IP khusus akan dapat digunakan.

**Persyaratan minimum**:  
- 2 core CPU  
- 4 GB RAM  
- 40 GB ruang disk

Pengaturan ini sudah cukup jika kamu menggunakan lightwalletd untuk Zcash.  
Jika kamu berencana menjalankan **node full Zcash**, kamu akan membutuhkan **setidaknya 300 GB** ruang disk kosong.

---

### 2. Nama domain yang mengarah ke server kamu

Di dashboard penyedia DNS kamu, buatlah sebuah record `A` untuk subdomain (misalnya `btcpay.example.com`) yang mengarah ke alamat IP VPS kamu.

Domain ini akan digunakan untuk mengakses BTCPay Server dari browser  
dan untuk membuat **sertifikat SSL gratis** secara otomatis melalui Let's Encrypt.

---

### 3. Akses SSH ke server

Untuk menginstal BTCPay Server, kamu harus terhubung ke VPS milikmu melalui SSH.  
Dari terminal kamu, jalankan:

`ssh root@YOUR_SERVER_IP`

Jika kamu menggunakan macOS, Linux, atau WSL di Windows, SSH sudah tersedia di terminal.
Pada Windows biasa, gunakan klien SSH seperti **PuTTY**.

---

### 4. Instal Git, Docker, dan Docker Compose

Setelah terhubung melalui SSH, perbarui paket sistem kamu dan instal komponen yang diperlukan:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Pada Ubuntu 22.04 dan yang lebih baru, `docker-compose` dari APT sudah usang.
> Paket yang direkomendasikan adalah `docker-compose-plugin`, yang menyediakan perintah `docker compose` (perhatikan penggunaan spasi alih-alih tanda hubung).

Lingkungan server kamu sekarang sudah siap untuk menginstal BTCPay Server.

</details>

---

### Langkah 1: Klon Repositori

Buat direktori kerja dan unduh deployment Docker BTCPay Server:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### Langkah 2: Ekspor Variabel Lingkungan

Please provide the Markdown fragment you would like me to translate. Once you provide the text containing the ``btcpay.example.com`` placeholder, I will proceed with the translation following all your specified rules.

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Jika kamu berencana untuk menambahkan Monero atau Litecoin nanti, kamu bisa menyertakannya sekarang:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

Kamu dapat menambahkan koin baru kapan saja dengan mengekspor variabel yang sesuai dan menjalankan ulang skrip setup:

`. ./btcpay-setup.sh -i`

Untuk panduan ini, kita hanya akan fokus pada **Zcash**.

---

### Langkah 3: Jalankan Installer

Jalankan skrip pengaturan untuk membangun dan meluncurkan server:

`. ./btcpay-setup.sh -i`

Skrip ini akan menginstal dependensi, membuat `docker-compose.yml`, memulai layanan, dan mengonfigurasi `systemd`.
Proses ini memakan waktu sekitar 5 menit.

Setelah selesai, instansi BTCPay Server kamu akan tersedia di:

`https://btcpay.example.com`

> Jika kamu sedang memodifikasi instalasi yang sudah ada (misalnya menambahkan ZEC), pastikan untuk menghentikan dan memulai ulang server dengan pengaturan baru:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Kemudian lanjutkan ke bagian berikutnya untuk mengonfigurasi Zcash di antarmuka web BTCPay Server.



## Menjalankan Zcash Full Node Milikmu Sendiri

Jika kamu lebih memilih untuk **tidak** bergantung pada node `lightwalletd` publik, kamu dapat menjalankan full Zcash node milikmu sendiri bersama dengan Lightwalletd di server yang sama.  
Ini memberimu **otonomi penuh** - tanpa ketergantungan eksternal, tidak memerlukan kepercayaan.

---

### Langkah 1: Pastikan Ruang Disk Mencukupi

Sebuah full node Zcash lengkap (Zebra + Lightwalletd) saat ini membutuhkan **300+ GB** ruang disk, dan ukurannya terus bertambah.

Rincian:

- Database blockchain Zebra: ~260-270 GB
- Pengindeksan lightwalletd: ~15-20 GB

#### Penyimpanan yang direkomendasikan:

- **400 GB+** jika server digunakan **hanya** untuk pembayaran Zcash
- **800 GB+** jika server juga menjalankan BTCPay Server, PostgreSQL, Nginx, dll.

> Idealnya gunakan disk SSD/NVMe dengan **kapasitas 1 TB**, terutama jika kamu tidak berencana untuk melakukan pruning data secara rutin.

---

### Langkah 2: Atur Variabel Lingkungan

Tambahkan hal berikut ke pengaturan lingkungan kamu untuk mengaktifkan konfigurasi full node:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Ini akan mencakup fragmen `zcash-fullnode`, yang menjalankan `zebrad` dan `lightwalletd` di dalam BTCPay Server.

---

### Langkah 3: Jalankan Kembali Installer

`. ./btcpay-setup.sh -i`

Skrip ini akan:

* Unduh image Docker untuk Zebra dan Lightwalletd
* Siapkan layanan di dalam stack BTCPay
* Hubungkan plugin Zcash ke instance `lightwalletd` **lokal**

> **Sinkronisasi blockchain secara penuh mungkin memakan waktu beberapa hari**, terutama pada server VPS dengan sumber daya rendah.
> Sebelum sinkronisasi selesai, pembayaran terlindungi tidak akan tersedia.


## Menghubungkan ke Node lightwalletd Eksternal

Dalam kebanyakan kasus, otonomi penuh tidak diperlukan - dan merchant mungkin tidak ingin menghabiskan waktu dan ruang disk untuk menjalankan Zcash full node.  
Secara default, BTCPay Server terhubung ke `lightwalletd` node publik untuk menangani pembayaran terlindungi tanpa perlu mengunduh seluruh blockchain.

Endpoint default adalah:

`https://zec.rocks:443`

Namun, kamu dapat mengonfigurasi BTCPay Server untuk terhubung ke **node `lightwalletd` eksternal apa pun**, seperti:

`https://lightwalletd.example:443`

Bagian ini menunjukkan cara melakukannya menggunakan **fragmen Docker kustom**.

> Contoh konfigurasi lengkap dengan semua variabel lingkungan tersedia di repositori [plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml).  
> Langkah-langkah di bawah ini menunjukkan pengaturan kerja minimal.

---

### Langkah 1: Buat Fragmen Docker Kustom

Di dalam direktori proyek BTCPayServer kamu, buatlah sebuah file fragmen kustom:

```
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

Silakan berikan konten Markdown yang ingin kamu terjemahkan. Saya siap menerjemahkannya ke dalam Bahasa Indonesia sesuai dengan aturan profesional yang telah kamu tetapkan.

```
exclusive:
- zcash
```

Direktif `exclusive` memastikan bahwa hanya satu fragmen dengan label yang sama (`zcash` dalam hal ini) yang dapat aktif pada satu waktu.
Ini mencegah konflik konfigurasi - sebagai contoh, kamu tidak dapat menjalankan fragmen `zcash-fullnode` dan fragmen eksternal kustom `lightwalletd` ini secara bersamaan.
Dengan menandainya sebagai `exclusive: zcash`, BTCPay Server akan secara otomatis menonaktifkan kontainer default `zcash-fullnode` dan `lightwalletd` internal, sehingga memungkinkan kamu untuk terhubung ke node eksternal milikmu sendiri sebagai gantinya.

---

### Langkah 2: Atur Variabel Lingkungan

Di terminal:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### Langkah 3: Tentukan Alamat Node Eksternal

Buka berkas `.env` kamu:

`nano .env`

Tambahkan baris berikut, ganti URL dengan endpoint pilihanmu:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

Kamu dapat menggunakan:

* Sebuah **node publik**, seperti `https://zec.rocks:443`
* Node milikmu sendiri yang di-host secara mandiri, yang diterapkan terpisah dari BTCPay Server

> Jika `lightwalletd` eksternal tidak tersedia atau kelebihan beban, pembayaran terlindungi akan gagal.
> Untuk layanan kritis, pilihlah **endpoint yang stabil dan terbukti** (seperti `zec.rocks` default).

> Ingin melakukan self-host `lightwalletd`?
> Kamu dapat menggunakan `docker-compose.lwd.yml` dari repositori [Zebra](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> **Peringatan:** Pengaturan ini tidak didokumentasikan secara resmi dan memerlukan pengaturan TLS manual, port forwarding, serta konfigurasi firewall - hanya direkomendasikan untuk pengguna tingkat lanjut.

---

### Langkah 4: Jalankan Kembali Installer

`. ./btcpay-setup.sh -i`

BTCPay Server akan menerapkan konfigurasi kustom kamu dan terhubung ke `lightwalletd` node yang ditentukan.

Mulai sekarang, plugin Zcash akan menggunakan endpoint eksternal tersebut untuk menangani transaksi terlindungi.


## Menjalankan BTCPay Server di Rumah dengan Cloudflare Tunnel

Ingin menerima pembayaran Zcash sambil menjalankan BTCPay Server pada perangkat rumah — seperti Raspberry Pi 5 atau server lokal lainnya **tanpa IP statis**?  
Kamu dapat mengekspos instans kamu ke internet secara aman menggunakan **Cloudflare Tunnel**.

Metode ini menghindari port forwarding dan menyembunyikan alamat IP asli kamu dari publik - sambil tetap menjaga server kamu dapat diakses melalui HTTPS.

Ini juga membantu kamu **menghindari biaya menyewa VPS**, yang sangat ideal jika pembayaran cryptocurrency hanyalah fitur opsional dan bukan inti dari bisnis kamu.

---

### Langkah 1: Instal Cloudflare Tunnel

1. Buat akun di [cloudflare.com](https://www.cloudflare.com) dan tambahkan domain kamu.
2. Pada **home server** kamu, instal Cloudflare Tunnel menggunakan repositori paket resmi Cloudflare:

```bash
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main" | sudo tee /etc/apt/sources.list.d/cloudflared.list
sudo apt update
sudo apt install cloudflared
```

Jika `apt install cloudflared` gagal, instal `.deb` yang sesuai sebagai gantinya:

```bash
# Raspberry Pi / ARM64
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb
sudo dpkg -i cloudflared.deb
```

```bash
# x86_64
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb
```

3. Autentikasi dengan Cloudflare:

`cloudflared tunnel login`

Perintah ini akan membuka jendela browser. Masuklah dan berikan otorisasi akses ke domain kamu.
Cloudflare akan secara otomatis membuat file `credentials` dengan sebuah token di server kamu.

4. Buat tunnel baru (kamu bisa menamainya `btcpay` atau apa pun):

`cloudflared tunnel create btcpay`

Ini menghasilkan berkas `btcpay.json` yang berisi ID tunnel dan kredensial - kamu akan membutuhkannya di langkah berikutnya.

---

### Langkah 2: Membuat File Konfigurasi Tunnel

Buat direktori konfigurasi (jika belum ada) dan buka berkas konfigurasi:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Tempelkan konfigurasi berikut:

```
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### Penjelasan:

* `tunnel` - nama tunnel yang kamu buat sebelumnya
* `credentials-file` - jalur ke file token yang dihasilkan selama `cloudflared tunnel login`
* `hostname` - domain kamu yang terdaftar di Cloudflare (misalnya `btcpay.example.com`)
* `service` - alamat lokal dari BTCPay Server kamu (biasanya `http://127.0.0.1:80` untuk Nginx)

> Cloudflare akan memproksi lalu lintas secara aman ke server lokal kamu, tanpa mengekspos IP rumah kamu.


### Langkah 3: Tambahkan Rekaman DNS untuk Tunnel Kamu

Setelah membuat tunnel, Cloudflare biasanya akan **menambahkan record DNS CNAME secara otomatis** untuk domain kamu. Hasilnya akan terlihat seperti ini:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

Jika tidak muncul secara otomatis, tambahkan secara manual:

1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com/) kamu
2. Navigasi ke bagian **DNS**
3. Tambahkan record CNAME baru:
   - **Name**: `btcpay`
   - **Target**: `<UUID>.cfargotunnel.com`  
     Kamu dapat menemukan nilai tepatnya di file `btcpay.json` kamu atau dengan menjalankan:
     
`cloudflared tunnel list`
     
- **Status proxy**: Aktif (awan oranye)

> Rekaman ini memastikan bahwa semua permintaan ke `btcpay.example.com` diarahkan melalui Cloudflare Tunnel, menyembunyikan alamat IP asli kamu dari publik.

---

### Langkah 4: Aktifkan Tunnel saat Startup Sistem

Agar tunnel dapat berjalan secara otomatis saat booting, instal sebagai layanan sistem:

`sudo cloudflared service install`

Kemudian aktifkan dan jalankan layanannya:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Periksa status:

`sudo systemctl status cloudflared`

Kamu akan melihat pesan seperti `Active: active (running)` dan konfirmasi bahwa `btcpay.example.com` sedang online.

> Mulai sekarang, tunnel akan berjalan secara otomatis pada setiap reboot, dan BTCPay Server kamu akan dapat diakses secara publik - tanpa port forwarding dan tanpa mengekspos IP asli kamu.

---

### Langkah 5: Menyelesaikan Pengaturan BTCPay Server

Jika kamu hendak menginstal BTCPay Server untuk pertama kalinya, atur domain kamu sebelum menjalankan skrip pengaturan:

`export BTCPAY_HOST="btcpay.example.com"`

Ini memastikan domain yang benar digunakan saat membuat **konfigurasi Nginx** dan **sertifikat SSL**.

Jika BTCPay Server sudah terinstal dan kamu hanya menambahkan tunnel-nya:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

Pengaturan ini akan membuat ulang konfigurasi dan menerapkan domain baru.
Sekarang kamu seharusnya sudah bisa mengakses server kamu di:

`https://btcpay.example.com`

> Baik kamu menggunakan `lightwalletd` publik atau full node milikmu sendiri, hal ini tidak memengaruhi tunnel.
> Yang terpenting adalah BTCPay Server sedang mendengarkan pada `127.0.0.1:80` secara lokal.


## Mengonfigurasi Plugin Zcash di Antarmuka Web BTCPay Server

> **Penting untuk pengaturan multi-store:**  
> Dompet Zcash yang dikonfigurasi di sini bersifat **global** untuk instansi tersebut. Semua store akan menggunakan dompet ini kecuali jika kamu menjalankan instansi BTCPay yang terpisah.

Setelah berhasil menyebarkan instance BTCPay Server milikmu, kamu perlu melakukan beberapa konfigurasi dasar melalui antarmuka web admin.  
Dokumentasi resmi menyediakan instruksi lengkap dalam bahasa Inggris - di sini, kita akan membahas langkah-langkah penting dan fokus secara khusus pada konfigurasi plugin Zcash.

---

### Langkah 1: Login ke Antarmuka Web

Kunjungi instansi kamu di:

`[https://btcpay.example.com](https://btcpay.example.com)`

- Masukkan login dan kata sandi administrator kamu.
- Jika ini adalah pertama kalinya kamu masuk, kamu akan diminta untuk membuat akun.
- Akun pertama yang kamu daftarkan akan secara otomatis diberikan hak istimewa admin.

---

### Langkah 2: Instal Plugin Zcash

1. Di menu utama, buka:

`Plugins -> Browse Plugins`

2. Temukan plugin **Zcash (ZEC)**. Gunakan bilah pencarian jika perlu.
3. Klik **Install** dan konfirmasi.

> Ulangi proses ini untuk altcoin lain apa pun yang kamu aktifkan selama konfigurasi server.

Setelah instalasi, klik **Restart Server** untuk memuat ulang antarmuka dengan plugin yang aktif.


### Langkah 3: Hubungkan Dompet Kamu melalui Viewing Key

Setelah menginstal plugin, bagian **Zcash** baru akan muncul di menu pengaturan.

1. Buka:

`Zcash -> Settings`

2. Tempelkan **Unified Full Viewing Key (UFVK)** kamu - BTCPay akan menurunkan Unified Address untuk setiap invoice dan mendeteksi pembayaran terlindungi yang masuk.

> **Catatan:** viewing key Sapling lama didukung, tetapi untuk menggunakan Alamat Orchard/Unified, kamu harus menyediakan **UFVK**.


Please provide the Markdown fragment you would like me to translate. I am ready to begin according to your instructions.

`uview184syv9wftwngkay8d...`

3. Masukkan nilai pada kolom tinggi blok (Block height)

* **Pengaturan pertama kali dengan dompet baru (frasa pemulihan baru):** masukkan tinggi blok Zcash saat ini (kamu dapat mengeceknya di 3xpl.com/zcash) - ini akan mempercepat pemindaian awal.
* **Migrasi pada server yang sama dari pengaturan lama yang hanya menggunakan Sapling ke Unified Addresses / Orchard:** biarkan kolom ini kosong.
* **Memindahkan store kamu ke server baru dengan dompet/UFVK yang sama:** secara opsional masukkan birth height - perkiraan tinggi dari pesanan berbayar pertama di store kamu (sesuaikan dengan tanggal pesanan di 3xpl untuk mempersempit pemindaian). Jika tidak yakin, biarkan kosong.

> Belum semua dompet mendukung ekspor **Unified Full Viewing Key (UFVK)**.  
> Opsi yang direkomendasikan:  
> – [**Zkool**](https://github.com/hhanh00/zkool2/)  
> – [**Zingo! Wallet (versi untuk PC)**](https://zingolabs.org/)  
> Di kedua aplikasi tersebut, cari ekspor UFVK di bagian backup/ekspor.

Kunci-kunci ini mendukung **rotasi alamat otomatis**, yang berarti:
- Setiap pelanggan mendapatkan alamat pembayaran yang **unik**
- Kamu melihat saldo yang **tunggal dan terpadu**

Kamu dapat menemukan daftar kompatibilitas yang lebih luas di [ZecHub -> Dompet](https://zechub.wiki/wallets).

Setelah semua kolom diisi, klik **Simpan**.

---

### Uji Alur Pembayaran ZEC Kamu

Selamat - dompet Zcash kamu sekarang telah terhubung ke BTCPay Server.

Mari kita jalankan sebuah pengujian:

1. Buka:

`Invoices -> Create New`

2. Buat invoice uji coba untuk jumlah kecil di ZEC.
3. Kirim dana dari **dompet yang berbeda** (bukan dompet yang terhubung ke BTCPay).
4. Setelah transaksi terdeteksi, halaman invoice akan menampilkan perayaan visual.
5. Pastikan status invoice berubah menjadi **Paid**.

Jika semuanya berfungsi dengan baik - kamu sudah siap untuk mengintegrasikan pembayaran ZEC ke dalam situs web kamu menggunakan API atau plugin CMS.



## Mengintegrasikan BTCPay Server dengan Situs Web Kamu

Setelah dompet Zcash kamu terhubung ke BTCPay Server, kamu dapat mengintegrasikan sistem pembayaran ke dalam situs web kamu.  
Ada beberapa cara untuk melakukan ini - mulai dari akses API langsung hingga plugin siap pakai untuk platform CMS populer.

---

### Opsi Integrasi

- **Integrasi API**  
  Ideal untuk situs web atau sistem buatan sendiri tanpa CMS.  
  Memberikan kamu kontrol penuh atas pembuatan invoice, pelacakan pembayaran, dan notifikasi - semuanya di dalam antarmuka dan logika milikmu sendiri.  
  Memerlukan pengetahuan pemrograman dasar, jadi tugas ini paling baik ditangani oleh developer kamu.

- **Plugin CMS**  
  Tersedia untuk platform seperti **WooCommerce**, **PrestaShop**, dan lainnya.  
  Plugin ini memungkinkan kamu menerima pembayaran hanya dalam beberapa menit - tanpa perlu coding.

- **Tombol Pembayaran atau Iframe**  
  Metode termudah.  
  Sangat cocok untuk landing page, situs web pribadi, atau situs apa pun di mana kamu hanya ingin menyematkan tautan donasi atau widget checkout.

---

### Integrasi API

Jika kamu menggunakan platform kustom (atau tanpa CMS sama sekali), API adalah opsi terbaik.  
Ini memberimu fleksibilitas penuh: kamu dapat membuat invoice, melacak statusnya, menerima notifikasi, dan mengontrol pengalaman pengguna sepenuhnya.

> Catatan: Bahkan beberapa plugin CMS menggunakan API di balik layar, jadi membuat kunci API sering kali menjadi **langkah pertama yang diperlukan**, terlepas dari metode integrasi yang kamu gunakan.

Langkah berikutnya: buat kunci API untuk tokomu dan mulailah menggunakan [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) untuk membangun integrasimu.


### Membuat API Key

Untuk mengintegrasikan BTCPay Server dengan situs web atau aplikasi kamu, kamu perlu membuat kunci API.

1. Masuk ke BTCPay Server dan buka **menu pengguna** (pojok kanan atas)
2. Buka **API Keys**
3. Klik **Create a new API key**
4. Masukkan nama untuk kunci kamu
5. Di bagian **Permissions**, aktifkan:
   - `Can create invoice`
   - `Can view invoice`
   - *(Opsional)* `Can modify store settings` - hanya jika kamu membutuhkan manajemen tingkat toko

6. Klik **Generate**. API key pribadi kamu akan ditampilkan - salin dan simpan dengan aman.

> Kunci ini memberikan akses ke faktur toko kamu.  
> **Jangan** membagikannya secara publik atau mengeksposnya dalam kode sisi klien.

---

### Contoh: Membuat Invoice melalui API

**Endpoint:**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

**Body permintaan:**

```
{
  "amount": 5,
  "currency": "ZEC",
  "checkout": {
    "speedPolicy": "HighSpeed",
    "paymentMethods": ["Zcash"]
  }
}
```

**Response:**

Kamu akan menerima objek JSON dengan:

* `invoiceId`
* Sebuah URL pembayaran yang dapat kamu sematkan di situs webmu atau kirimkan ke pelanggan

Lihat dokumentasi lengkap:
[Greenfield API – Buat Invoice](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Menyiapkan Webhook (Opsional)

Untuk menerima notifikasi waktu nyata saat status faktur berubah (misalnya, saat pembayaran diterima):

1. Buka pengaturan toko kamu -> **Webhooks**
2. Tambahkan URL dari endpoint backend kamu yang akan menangani permintaan `POST` dari BTCPay Server
3. BTCPay akan secara otomatis mengirimkan notifikasi saat sebuah invoice telah dibayar atau kedaluwarsa

Payload webhook dan logika pengulangan dijelaskan dalam [dokumentasi webhook resmi](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-).

> Contoh integrasi tersedia untuk berbagai bahasa pemrograman di dokumentasi BTCPay dan repositori GitHub.



### Integrasi CMS

BTCPay Server mendukung plugin untuk sistem manajemen konten (CMS) yang populer.  
Integrasi yang paling matang dan banyak digunakan adalah dengan **WordPress + WooCommerce**, sehingga memudahkan kamu untuk menerima pembayaran ZEC **tanpa perlu menulis kode**.

---

#### WooCommerce (WordPress)

BTCPay Server secara resmi mendukung plugin untuk WooCommerce.

Langkah-langkah untuk integrasi:

1. Instal plugin **BTCPay untuk WooCommerce** dari direktori plugin WordPress atau dari GitHub.
2. Di panel admin WordPress kamu, buka:

`WooCommerce -> Settings -> Payments`

3. Temukan **BTCPay** dalam daftar dan klik **Set up**
4. Masukkan URL BTCPay Server kamu dan ikuti instruksi otorisasi  
   (generasi API key otomatis sangat disarankan)
5. Aktifkan metode pembayaran dan simpan pengaturan kamu

> Instruksi mendetail, tutorial video, dan panduan pemecahan masalah tersedia di dokumentasi plugin.

Kamu juga akan menemukan opsi integrasi CMS lainnya di bagian yang sama pada dokumentasi BTCPay tersebut.

---

### Tombol Pembayaran atau Iframe (Tanpa Perlu CMS atau API)

Jika kamu tidak menggunakan CMS dan tidak ingin bekerja dengan API, cara termudah untuk menerima pembayaran ZEC adalah dengan **menyematkan tautan pembayaran atau widget** secara langsung di situs web kamu.

Metode ini sangat ideal untuk:

- Halaman landas
- Situs portofolio
- Blog atau halaman statis
- Proyek tanpa server backend

---

#### Opsi 1: Tombol Pembayaran (Tautan)

1. Di BTCPay Server, buat invoice secara manual di bagian **Invoices**
2. Salin tautan pembayaran, contoh:

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. Tambahkan tautan ke HTML kamu:

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### Opsi 2: Invoice Tersemat (Iframe)

Untuk menampilkan invoice secara langsung di situs kamu, gunakan iframe:

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> Kamu dapat menyesuaikan gaya tombol atau kontainer iframe agar sesuai dengan desain situsmu - BTCPay Server memungkinkan penyesuaian tema yang fleksibel pada halaman invoice.

## Kesimpulan

Panduan ini memang panjang - tetapi ini hanya mencakup aspek-aspek mendasar dari integrasi pembayaran Zcash dengan BTCPay Server.

Antarmuka BTCPay Server menawarkan jauh lebih banyak fungsionalitas daripada yang telah kami tunjukkan di sini. Beruntungnya, UI ini tersedia dalam berbagai bahasa (termasuk Rusia), sehingga memudahkan kamu untuk menjelajah dan bereksperimen lebih jauh.

BTCPay adalah alat yang sangat fleksibel. Kamu dapat:

* Host beberapa toko independen pada satu instance tunggal
* Tentukan peran dan izin khusus untuk anggota tim - mulai dari hanya melihat pesanan hingga admin penuh
* Gunakan domain dan branding milikmu sendiri
* Atur webhook, dompet fallback, dan bahkan akses Tor
* Konfigurasikan pengaturan lanjutan seperti aturan pajak, kode diskon, kustomisasi halaman checkout, pembatasan metode pembayaran, dan banyak lagi

BTCPay dibangun sebagai alternatif sumber terbuka untuk penyedia pembayaran terpusat. Jika kamu ingin menerima pembayaran ZEC yang privat tanpa perantara, platform ini sangat layak untuk kamu perhatikan.

Kami mendoakan kesuksesanmu dalam menjelajahi ekosistem BTCPay dan membuat pembayaranmu benar-benar menjadi milikmu sendiri.

## Sumber Daya

* [BTCPay Server Situs Web Resmi](https://btcpayserver.org/)
* [FAQ BTCPay](https://docs.btcpayserver.org/FAQ/)
* [BTCPay Server Repositori GitHub](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Server Demo Mainnet](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Zcash Plugin untuk BTCPay (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Zcash Panduan Instalasi Plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Contoh zcash-lightwalletd.custom.yml Kustom](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [File Docker Compose Lightwalletd (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [Dokumentasi API Key BTCPay (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Membuat Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Zcash Daftar Kompatibilitas Dompet (ZecHub)](https://zechub.wiki/wallets)
* [Zebra + Lightwalletd pada Raspberry Pi 5 (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)