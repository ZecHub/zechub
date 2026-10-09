<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>


# Mengapa Privasi Itu Penting

Di era digital, menjaga [privasi](https://www.privacyguides.org/en/) kamu menjadi semakin vital. Meskipun beberapa orang mungkin menganggap privasi sebagai hal yang sia-sia, kenyataannya tidak demikian. Privasi kamu sedang dipertaruhkan dan harus menjadi perhatian. Privasi memiliki nilai yang signifikan karena berkaitan dengan kekuasaan, dan memastikan bahwa kekuasaan tersebut digunakan secara bertanggung jawab adalah hal yang krusial.

## Teknologi Tor & I2P

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) adalah alat proxy yang memanfaatkan jaringan Tor untuk membangun koneksi bagi aplikasi. Torbot mencapai hal ini dengan mengarahkan lalu lintas mereka melalui Tor, sehingga meningkatkan [privasi dan anonimitas](https://www.torproject.org/) bagi aplikasi-aplikasi tersebut.

## Jaringan I2P

Jaringan I2P, yang juga dikenal sebagai [Invisible Internet Project](https://geti2p.net/en/about/intro), adalah jaringan overlay peer-to-peer yang terenkripsi sepenuhnya. Jaringan ini memastikan bahwa isi, sumber, dan tujuan pesan tersembunyi dari pengamat. Dengan kata lain, tidak ada yang bisa melihat asal atau tujuan lalu lintas data maupun isi sebenarnya dari pesan yang sedang dikirimkan. Enkripsi yang digunakan dalam I2P menjamin tingkat privasi dan anonimitas yang tinggi bagi para penggunanya.

### Menginstal I2P

Ada dua implementasi. [Java I2P](https://geti2p.net/en/download) yang asli berjalan di Windows, macOS, Linux, dan Android. [i2pd](https://i2pd.website/), yang ditulis dalam C++, lebih ringan dan merupakan pilihan umum pada server atau mesin berkekuatan rendah.

Setelah berjalan, I2P menyediakan konsol lokal pada `127.0.0.1:7657` dan proxy pada `127.0.0.1:4444` (HTTP) serta `127.0.0.1:4447` (SOCKS). Perlu diperhatikan bahwa proses ini akan memakan waktu beberapa menit pada saat pertama kali dijalankan: I2P harus membangun tunnel melalui jaringan sebelum semuanya dapat berfungsi, dan prosesnya akan menjadi lebih cepat semakin lama ia tetap online.

### Menggunakan I2P dengan Zcash

Harap diperhatikan bahwa **tidak ada Zcash node saat ini yang mendukung I2P secara native.** Zebra tidak memiliki dukungan I2P, begitu pula dengan zcashd. Jika kamu melihat panduan yang mengklaim dapat menjalankan Zcash node melalui I2P, panduan tersebut sedang menjelaskan sesuatu yang tidak dapat dilakukan oleh perangkat lunak ini.

Kegunaan I2P yang sebenarnya di sini adalah segala hal seputar dompet: mengakses sebuah situs, forum, atau layanan tanpa mengungkap alamat kamu. Untuk menganonimkan koneksi dompet itu sendiri, Tor adalah pilihan praktis saat ini, dan bagian di bawah ini akan membahasnya.

## Tor dan I2P berbagi fitur yang sama tetapi juga memiliki perbedaan yang signifikan.

Baik Tor maupun I2P adalah jaringan peer-to-peer yang terdesentralisasi dan anonim, tetapi I2P memberikan tingkat keamanan yang lebih tinggi dibandingkan dengan Tor. Namun, I2P utamanya dirancang untuk mengakses layanan seperti email, chat, dan torrenting di dalam jaringannya sendiri dan tidak dapat digunakan untuk mengakses internet reguler. Di sisi lain, Tor memungkinkan pengguna untuk mengakses deep web, sama seperti I2P, tetapi ia juga berfungsi sebagai browser reguler untuk mengakses situs web di surface web.

*Catatan: Untuk informasi lebih lanjut mengenai persamaan dan perbedaan antara Tor & I2P, kunjungi [di sini](https://geti2p.net/en/comparison/tor)*

## Mengarahkan dompet seluler melalui Tor dengan Orbot

Orbot adalah virtual private network (VPN) tanpa biaya yang dirancang untuk smartphone, yang mengarahkan lalu lintas dari semua aplikasi di perangkat kamu melalui jaringan Tor.

Ikuti instruksi ini untuk mengarahkan dompet Zcash melalui Tor. Perlu diperhatikan bahwa Ywallet, yang digunakan oleh versi panduan sebelumnya, tidak lagi dikelola dan tidak akan mengikuti jaringan setelah Ironwood, jadi pilihlah dompet yang masih dikelola dari halaman [Wallets](/using-zcash/wallets).

1. Unduh dan instal *Orbot* dari toko aplikasi.

2. Setelah instalasi, pesan salam akan muncul. Lanjutkan ke halaman beranda *Orbot* dan klik pada *'Tor Enabled Apps'.*

3. Ini akan memunculkan halaman di layar yang menampilkan aplikasi-aplikasi yang kompatibel dengan Tor. Temukan dompet Zcash kamu dalam daftar dan pastikan sudah terpilih.

4. Permintaan koneksi untuk menyiapkan VPN akan muncul, yang akan memungkinkan *Orbot* untuk memantau lalu lintas jaringan. *Orbot* akan melakukan inisialisasi setelah izin ini disetujui.

5. Periksa taskbar atau beranda Orbot untuk memverifikasi bahwa Tor sedang berjalan, hal ini dikonfirmasi saat kamu melihat 'Connected to the Tor network'.

*Catatan: Jika Tor diblokir oleh jaringan seluler kamu, kamu dapat menggunakan Bridge Server sebagai cara alternatif untuk terhubung.*


## Menginstal Tor di PC atau desktop

* Browser Tor dapat diunduh dari situs web resmi, kamu dapat mengakses tautan [di sini](https://www.torproject.org/download/).

Cara paling praktis untuk menginstal Tor adalah melalui Tor Browser Bundle. Jika kamu lebih menyukai instalasi headless, kamu dapat memilih untuk menginstal daemon Tor secara terpisah.

*Catatan: Secara default, paket Tor Browser mengekspos listener SOCKS pada tcp/9150 dan daemon Tor mengekspos listener SOCKS pada tcp/9050.*

* Rujuk ke instruksi [instalasi](https://support.torproject.org/apt/) khusus untuk sistem operasi kamu sebagaimana disediakan oleh Tor Project.

## Menjalankan node melalui Tor

Ini adalah bagian yang paling banyak berubah, dan jawaban jujurnya adalah saat ini hal tersebut menjadi lebih sulit daripada sebelumnya.

**zcashd sudah tidak ada.** Layanan ini telah mencapai akhir masa dukungan dan berhenti pada 18 Juli 2026 di blok 3,417,100. Layanan ini tidak akan dimulai kembali, halaman unduhannya menghasilkan error 404, dan repositori apt tidak lagi disediakan. Instruksi apa pun yang menyuruh kamu untuk menjalankan `zcashd -proxy=127.0.0.1:9050` tidak lagi berlaku untuk apa pun.

**Zebra juga belum bisa melakukannya.** Zebra adalah node yang dikelola, dan crate jaringannya memang berisi kode koneksi terisolasi untuk Tor, tetapi fitur tersebut dinonaktifkan dalam `zebra-network/Cargo.toml`:

```
# tor = ["arti-client", "tor-rtcompat"]
```

Dokumentasi crate menyatakan hal yang sama dengan jelas: *"Koneksi Tor saat ini dinonaktifkan sampai dependensi `arti-client` yaitu `x25519-dalek v1.2.0` diperbarui."* Fungsi `connect_isolated_tor` juga ikut dikomentari (commented out). Jadi, saat ini tidak ada cara resmi untuk menjalankan node Zcash melalui Tor.

Jika kamu membutuhkan anonimitas di tingkat node sekarang, pendekatan yang dapat dilakukan adalah dengan menempatkan seluruh mesin di balik Tor atau VPN pada tingkat sistem operasi, alih-alih mengonfigurasi node itu sendiri. Hal tersebut melindungi lokasi jaringanmu tanpa bergantung pada fitur node yang belum tersedia.

### Apa yang masih bisa kamu lakukan hari ini

- **Routekan dompet kamu melalui Tor** dengan Orbot di perangkat seluler, seperti yang dijelaskan di atas. Ini adalah opsi praktis bagi kebanyakan orang, dan dapat menyembunyikan IP kamu dari server lightwalletd tempat dompet kamu terhubung
- **Gunakan Tor Browser** untuk block explorer, forum, dan hal lainnya di mana kamu tidak ingin terhubung melalui alamat
- **Ingat apa yang tidak disembunyikan oleh Tor.** Tor menganonimkan lokasi jaringan kamu, bukan aktivitas on-chain kamu. Mengirim dari alamat transparan tetap bersifat publik, dan nilai yang berpindah antar pool terlindungi tetap memublikasikan jumlahnya. Lihat [Pool Terlindungi](/using-zcash/shielded-pools) untuk mengetahui apa yang tetap terlihat