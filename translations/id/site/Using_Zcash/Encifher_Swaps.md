# **SOL/USDC -> ZEC Swap Menggunakan Encrypt.trade**


![img1](/content-images/Bkbg5alCll-7a02545c00.webp)


*Swap dari Solana ke Zcash, dengan langkah lintas-chain yang diarahkan melalui Near Intents.*

---

###  Pendahuluan  
[**encrypt.trade**](https://encrypt.trade/zec) adalah aplikasi Solana yang dijalankan oleh JMD Labs Inc. Aplikasi ini memungkinkan kamu untuk melakukan swap **SOL atau USDC** di Solana menjadi **Zcash (ZEC)**. Token kamu pertama-tama akan dibungkus ke dalam versi terenkripsi agar jumlahnya tersembunyi di Solana, kemudian di-swap ke ZEC melalui Near Intents.

Swap ini bersifat privat dalam beberapa hal tetapi tidak sepenuhnya. [docs](https://docs.encifher.io/docs) milik aplikasi itu sendiri menyatakan bahwa interaksi kamu dengan chain tidak anonim: orang dapat melihat bahwa dompet kamu menggunakan aplikasi tersebut, tetapi tidak tahu berapa banyak yang kamu pindahkan. ZEC juga tiba di alamat transparan, sehingga tetap terlihat di chain Zcash sampai kamu menjadikannya terlindungi.


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

### Apa yang Perlu Kamu Ketahui Sebelum Melakukan Swap  
- **Sisi Solana.** Wrapping menyembunyikan jumlahnya, tetapi alamat dompet kamu dan penggunaan aplikasi tersebut bersifat publik. [best practices](https://docs.encifher.io/docs/best-practices) dari Solana memperingatkan bahwa proses wrap, swap, dan unwrap yang sederhana membuat transaksi kamu dapat ditelusuri hubungannya.
- **Enkripsi.** Saldo terenkripsi diproses secara off-chain di dalam hardware enclave (TEE). [paper](https://eprint.iacr.org/2026/1504) para pengembang menyatakan bahwa hal ini bergantung pada integritas TEE, manajemen threshold key yang jujur, dan cloud attestation root, bukan hanya pada kriptografi semata.
- **Langkah cross-chain.** Swap ke ZEC diarahkan melalui Near Intents, di mana solver independen akan memenuhi pesanan tersebut.
- **Sisi Zcash.** Near Intents mencantumkan ZEC sebagai yang didukung hanya untuk [alamat transparan](https://docs.near-intents.org/resources/chain-support), dan bidang ZEC pada encrypt.trade hanya menerima alamat transparan (t1 atau t3) saat panduan ini diperiksa pada September 2026. Alamat transparan menampilkan saldo dan transfer masuk secara publik sampai kamu melakukan shielding.
- **Penyaringan.** Aplikasi ini memeriksa dompet yang terhubung terhadap database seperti TRM dan Chainalysis, dan [halaman kepatuhan](https://docs.encifher.io/docs/compliance)nya menyatakan bahwa catatan terenkripsi dapat ditinjau jika terdapat alasan hukum yang sah. Near Intents juga menjalankan [penyaringan](https://docs.near-intents.org/security-compliance/risk-and-compliance)nya sendiri.

---

### Langkah 1: Hubungkan Dompet Solana Kamu  
Kunjungi [encrypt.trade](https://encrypt.trade/zec) menggunakan **Chrome atau Firefox**, dan hubungkan dompet **Phantom**, **Solflare**, atau **Slope** kamu. Pastikan dompet kamu memiliki cukup **SOL** untuk biaya gas dan token yang ingin kamu tukarkan. Setelah terhubung, kamu siap untuk membungkus (wrap) aset kamu.


![img3](/content-images/SyVOs6lRxx-cbd8193e84.webp)





---

![img4](/content-images/Bkh_jTgCex-2fc8428592.webp)


---

### Langkah 2: Bungkus Token Kamu  
Buka bagian **Wrap**. Pilih **SOL** atau **USDC**, masukkan jumlahnya, dan konfirmasi. Aplikasi akan mengunci aset kamu dan menerbitkan **versi terenkripsi (eSOL atau eUSDC)**. Membungkus jumlah yang berbeda dari yang kamu swap akan mempersulit pencocokan keduanya berdasarkan jumlah, tetapi hal ini tidak menyembunyikan fakta bahwa dompet kamu menggunakan aplikasi tersebut.




![img5](/content-images/S10J26xCxg-6322a40b18.webp)

---



![img6](/content-images/Sk0y3Te0gl-124792365a.webp)


---

### Langkah 3: Siapkan Dompet ZODL Kamu  
Unduh [**ZODL**](https://zodl.com), dompet Zcash yang dikelola oleh ZODL. Pada layar Receive, salin **Alamat Transparan Zcash** kamu (dimulai dengan t1). encrypt.trade tidak menerima alamat terlindungi atau unified untuk ZEC saat ini. Simpan frasa pemulihan kamu dengan aman sebelum melanjutkan.


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

### Langkah 4: Swap  
Kembali ke **encrypt.trade**, buka bagian **Swap**. Pilih **eSOL/eUSDC -> ZEC**, tempelkan alamat transparan ZODL milikmu, tinjau detailnya, dan konfirmasi.



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


**Near Intents** menangani perutean lintas-chain dan mengirimkan **ZEC** ke dompet ZODL milikmu. Proses ini dapat memakan waktu beberapa menit. Near Intents menyarankan untuk menunggu hingga 15 menit untuk swap lintas-chain.



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

### Langkah 5: Lindungi ZEC Kamu  
Setelah ZEC tiba, gunakan opsi **Shield** pada ZODL untuk memindahkannya ke dalam [pool terlindungi](/using-zcash/shielded-pools). Sebelum itu, dana tersebut berada di alamat transparan di mana siapa pun dapat melihat saldonya. Proses shielding melindungi apa yang kamu lakukan selanjutnya, tetapi transfer yang masuk dan transaksi shielding tetap terlihat di on-chain. Selalu verifikasi tautan, hindari menggunakan kembali alamat, dan uji dengan jumlah kecil terlebih dahulu.

---

### Siapa Saja yang Terlibat dan Di Mana Mendapatkan Bantuan  
- **encrypt.trade** adalah aplikasinya, yang dijalankan oleh JMD Labs Inc. [kebijakan privasi](https://encrypt.trade/privacy)nya menyatakan bahwa aplikasi ini mengumpulkan data teknis seperti IP, detail browser dan perangkat, mengirimkan alamat dompet kamu, riwayat terbaru, dan saldo ke penyedia kepatuhan sebelum sebuah swap, serta dapat menyimpan log dan hasil pemindaian AML hingga lima tahun. [syarat](https://encrypt.trade/terms)nya melarang penggunaan VPN atau proxy untuk menyembunyikan lokasi kamu. Dukungan: help@encifher.io atau grup [Telegram](https://t.me/+ZWHGMW4ZHXQwYTZl) yang ditautkan dari aplikasi.
- **Near Intents** mengarahkan langkah cross-chain dan mengirimkan ZEC. Lihat [syarat API 1Click](https://docs.near-intents.org/security-compliance/terms-of-service) dan kebijakan privasinya di near.com/privacy, lacak swap pada [Near Intents Explorer](https://explorer.near-intents.org), dan mintalah bantuan di [Near Intents Telegram](https://t.me/near_intents).

Ketentuan dan alamat yang didukung dapat berubah, jadi periksa versi terbaru sebelum melakukan swap dalam jumlah besar. Untuk informasi lebih lanjut mengenai gambaran yang lebih luas, lihat [Non-Custodial Exchanges](/using-zcash/non-custodial-exchanges).

---

Dengan menggabungkan **Solana**, **Zcash**, dan **Near Intents**, **encrypt.trade** memberimu rute cepat dari SOL atau USDC ke ZEC. Ini menyembunyikan jumlah pada Solana tetapi tidak privat secara end-to-end, jadi lindungi ZEC kamu setelah sampai.