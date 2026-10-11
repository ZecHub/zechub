<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Who_Can_See_Your_Zcash_Payment.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Siapa yang Bisa Melihat Pembayaran Zcash Kamu?

## Ringkasan Singkat

- Zcash memberi kamu **dua jenis alamat**: transparan (`t`) dan terlindungi (`z` atau `u`).
- Seberapa banyak yang dapat dilihat publik bergantung pada jenis mana pembayaran kamu berpindah.
- Hanya pembayaran dari **terlindungi ke terlindungi** yang menyembunyikan pengirim, penerima, dan jumlahnya.
- Alamat terlindungi bukanlah satu kunci tunggal. Ini adalah sekumpulan kecil kunci, dan kamu dapat memberikan **akses baca-saja tanpa memberikan kemampuan untuk membelanjakan**.
- viewing key **tidak dapat ditarik kembali** setelah kamu membagikannya.

---

## Satu hal yang perlu kamu pahami terlebih dahulu

Di sebagian besar blockchain, tidak ada pilihan yang bisa kamu buat. Semua yang kamu kirim bersifat publik, selamanya, bagi siapa saja yang melihatnya.

Zcash justru memberimu sebuah pilihan. Pilihan tersebut dibuat dua kali: **sekali saat kamu memilih alamat mana yang akan dikirimi dana, dan sekali lagi saat kamu memutuskan siapa yang mendapatkan key untuk membaca riwayatmu.**

Gambar di bawah ini mencakup keduanya.

![Zcash key types and what a block explorer can see for each of the four transaction paths](/content-images/who-can-see-your-zcash-payment-04d41ac960.webp)

---

## Pilihan pertama: alamat mana

Setiap pembayaran Zcash berpindah di antara dua alamat, dan masing-masing dapat bersifat transparan atau terlindungi. Hal ini menghasilkan empat jalur, dan setiap jalur membocorkan jumlah yang berbeda.

Polanya lebih sederhana dari kelihatannya: **apa pun yang menyentuh alamat transparan akan menjadi publik.** Pembayaran yang tetap berada di dalam pool terlindungi sepanjang prosesnya tidak mengungkapkan apa pun selain biayanya.

Hal ini paling penting saat kamu melakukan penarikan dari sebuah exchange. Banyak exchange hanya mengirim ke alamat transparan, sehingga penarikannya bersifat publik. Lindungi dana tersebut sendiri setelah tiba, sebelum kamu menggunakannya.

Untuk melihat lebih dalam tentang apa sebenarnya yang dapat dibaca oleh sebuah explorer, lihat [Apa yang dapat dilihat oleh sebuah block explorer](/zcash-tech/what-a-block-explorer-can-see).

---

## Pilihan kedua: siapa yang mendapatkan kunci

Privasi yang tidak akan pernah bisa kamu buka tidaklah berguna. Terkadang kamu perlu membuktikan sesuatu kepada akuntan, auditor, atau kantor pajak. Zcash menangani hal ini tanpa memintamu untuk melepaskan kendali.

**spending key.** Dapat melihat segalanya dan memindahkan dana. Inilah uangnya. Ini tetap berada di tanganmu dan tidak pernah dibagikan kepada siapa pun, dengan alasan apa pun.

**Full Viewing Key.** Hanya baca. Menampilkan aktivitas masuk dan keluar serta saldo, tetapi tidak dapat membelanjakan satu zatoshi pun. Inilah yang kamu berikan kepada auditor atau akuntan.

**Incoming Viewing Key.** Lebih sempit lagi: ini hanya menunjukkan pembayaran yang masuk. Sebuah exchange atau merchant dapat menjalankan ini untuk mengonfirmasi bahwa deposit kamu telah sampai, sementara spending key tetap berada di perangkat keras yang tidak pernah terhubung ke internet.

Urutan itu penting. Berikan kunci paling sempit yang dapat menjalankan tugasnya, bukan kunci paling luas yang kebetulan kamu miliki.

---

## Bagian yang terlewatkan oleh pemula

**Viewing key tidak dapat dicabut.** Tidak ada tombol "batalkan berbagi". Begitu seseorang memilikinya, mereka dapat membaca alamat tersebut selama alamat itu masih ada. Jika kamu perlu memutuskan akses, kamu harus memindahkan dana kamu ke alamat baru.

**Biaya bersifat publik bahkan dalam pembayaran yang sepenuhnya terlindungi.** Jumlahnya disembunyikan; biayanya tidak.

**Publik bersifat permanen.** Apa pun yang ditampilkan oleh chain hari ini, akan tetap ditampilkan dalam dua puluh tahun ke depan. Memutuskan untuk melakukan shielding pada pembayaran *setelah* kamu mengirimnya bukanlah sesuatu yang bisa kamu lakukan.

---

## Mari kita praktikkan

- Gunakan dompet yang melakukan shielding secara default, seperti [ZODL](https://zodl.com) atau [Zingo!](https://www.zingolabs.org/).
- Lindungi dana ke dalam transaksi terlindungi segera setelah dana tiba dari exchange, sebelum digunakan.
- Kirim ke alamat terlindungi kapan pun penerima mendukungnya.
- Sebelum membagikan viewing key, tanyakan kunci mana yang paling kecil yang dapat menjawab pertanyaan yang diajukan.

---

## Sumber Daya

- Menjelaskan viewing key (Electric Coin Company) dari [](https://electriccoin.co/blog/explaining-viewing-keys/)
- Pengungkapan selektif dan viewing keys dari [ (Electric Coin Company)](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ZIP 310: viewing key](https://zips.z.cash/zip-0310)
- Bagaimana cara kerja teknologi [ Zcash ](https://z.cash/technology/)

## Halaman terkait

- Dasar-dasar [Zcash](/start-here/what-is-zec-and-zcash)
- Panduan pengguna baru [Zcash](/start-here/new-user-guide)
- Apa yang dapat dilihat oleh block explorer [](/zcash-tech/what-a-block-explorer-can-see)
- viewing keys [](/zcash-tech/viewing-keys)
- Transaksi [](/using-zcash/transactions)

---

*Jika kamu ingin menambahkan atau menyarankan pengeditan pada halaman wiki ini, silakan buka repo [ZecHub GitHub](https://github.com/ZecHub/zechub) dan ajukan pull request.*