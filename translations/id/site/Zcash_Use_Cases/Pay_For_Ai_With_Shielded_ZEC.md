# <img src="/content-images/programmer-software-engineer-coder-softw-bce5a0cb5b.svg" width="24" height="24" alt="developer icon"/> Bayar Layanan AI Secara Privat dengan ZEC Terlindungi

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Pemula - 10 mnt
</span >


## Ringkasan Singkat

- **NanoGPT** menerima ZEC terlindungi secara langsung, tanpa akun dan tanpa email
- Top-up minimum adalah **$0.10**, jadi kamu bisa mencobanya hanya dengan uang receh
- Kredit masuk dalam waktu sekitar **30 detik**, pada konfirmasi pertama
- Untuk layanan yang tidak menerima ZEC, gunakan **CrossPay** untuk membelanjakan ZEC terlindungi dan membayarnya dalam USDC
- Apa yang akhirnya tercatat di chain bergantung pada **di pool mana ZEC kamu berada**, dan layar tidak pernah memberitahumu

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Ini untuk siapa?

- Siapa pun yang tidak ingin langganan AI terikat dengan nama mereka
- Developer yang membayar untuk inferensi tanpa kartu perusahaan
- Orang-orang di negara di mana pembayaran kartu ke layanan AI gagal
- Siapa pun yang lebih memilih untuk tidak memberikan email saat mencoba sebuah model

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Masalahnya

Membayar untuk AI biasanya berarti menggunakan kartu, email, dan sebuah akun. Hal ini mengaitkan setiap prompt yang kamu tulis dengan identitas hukummu, dan penyedia layanan pembayaran juga dapat melihatnya.

Kripto seharusnya dapat mengatasi hal ini, tetapi sebagian besar panduan sudah kedaluwarsa. Layanan-layanan mengubah apa yang mereka terima, dan panduan yang ditulis setahun lalu akan mengarahkan kamu ke jalur yang tidak lagi berfungsi.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> Mengapa Zcash?

Pembayaran terlindungi menyembunyikan pengirim, penerima, dan jumlahnya. Layanan tersebut dibayar, dan tidak ada seorang pun yang mengawasi chain dapat mengetahui siapa yang membayar atau berapa jumlahnya.

Hal itu hanya berlaku jika kamu membayar **dari** dana terlindungi. Halaman ini menjelaskan secara spesifik kapan hal tersebut berlaku dan kapan tidak.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Apa yang Kamu Butuhkan

- ZEC dalam saldo **terlindungi**
- Dompet yang dapat mengirim ke satu alamat terpadu. Panduan ini menggunakan **Noir Wallet**, sebuah ekstensi browser, sehingga seluruh alur tetap berada dalam satu jendela. Zkool dan Zodl bekerja dengan cara yang sama
- Sekitar $1 untuk mengikuti panduan ini

> **Berasal dari exchange?** Sebagian besar exchange, termasuk Binance, hanya menarik ZEC ke alamat **transparan**, dan mereka tidak akan menerima alamat `u1...` sebagai tujuan. Tarik terlebih dahulu ke alamat transparan milikmu sendiri, lakukan shielding di dompetmu, lalu bayar dari saldo terlindungi.

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Rute 1: Bayar NanoGPT secara langsung

[NanoGPT](https://nano-gpt.com/) memberi kamu 200+ model, termasuk GPT, Claude, Gemini dan model gambar, serta menerima ZEC secara native.

### Langkah 1: Buka saja. Tidak perlu mendaftar

Buka nano-gpt.com dan mulailah menggunakannya. Setiap sesi bersifat anonim secara default dan aplikasi itu sendiri menyatakan hal tersebut: *"Kamu sudah menggunakan NanoGPT secara privat."* Tidak ada akun yang perlu dibuat dan tidak ada email yang perlu diberikan.

### Langkah 2: Simpan token login terlebih dahulu

Sebelum kamu memasukkan uang, buka **Settings** dan buat token login, lalu simpan di tempat yang aman.

> **Langkah ini melindungi uangmu.** Saldo anonim tersimpan di dalam data lokal browsermu. Jika kamu menghapus cookie tanpa menyimpan token, maka saldo tersebut akan hilang, dan tidak ada akun yang bisa digunakan untuk memulihkannya. Lakukan hal ini sebelum kamu melakukan deposit, bukan setelahnya.

### Langkah 3: Tambahkan saldo

Buka **Balance**, pilih **Custom**, dan masukkan jumlahnya. Batas minimum adalah **$0.10** dan batas maksimum adalah $5,000. NanoGPT akan memberi tahu kamu apa yang bisa dibeli dengan jumlah tersebut, sekitar 12 prompt GPT 5.5 atau 18 gambar untuk $1.

![NanoGPT add balance screen showing the custom amount and the ten cent minimum](/content-images/nanogpt-add-balance-acc74a4e6d.webp)

### Langkah 4: Pilih Zcash

Pilih **Mata uang digital**, lalu pilih **Zcash** dari kisi-kisi tersebut.

Kamu akan mendapatkan kode QR, alamat pembayaran, dan **minimum transfer** di ZEC untuk jumlah yang kamu pilih. Angka tersebut ditentukan pada saat halaman dimuat.

![NanoGPT Zcash deposit screen with the QR code, unified address and transfer minimum](/content-images/nanogpt-zec-deposit-bd1980d2f7.webp)

### Langkah 5: Kirim dari dompet kamu

Salin alamat tersebut ke dalam dompet kamu, masukkan jumlahnya, dan kirim. Biaya jaringan adalah sekitar **0.00015 ZEC**.

> **Kirim sedikit lebih banyak dari jumlah minimum.** Harga yang tertera ditentukan saat halaman dimuat dan ZEC berubah sebelum transaksi kamu dikonfirmasi. Saat pengujian, mengirim tepat jumlah minimum hanya menghasilkan **$0.99** alih-alih $1.00. Mengirim sedikit lebih banyak menghasilkan $1.17 untuk nominal $1 yang sama, karena NanoGPT memberikan kredit sesuai dengan apa yang sebenarnya kamu kirim.

![Noir Wallet send screen with the NanoGPT address pasted in and the network fee shown](/content-images/noir-send-6380a5f4ef.webp)

### Langkah 6: Tunggu sekitar 30 detik

Dompet kamu akan menunjukkan transaksi dalam status pending, lalu kemudian confirming. NanoGPT memberikan kredit saldo pada **konfirmasi pertama**, jadi kamu tidak perlu menunggu hingga ketiga konfirmasi selesai.

![Wallet confirmation showing the amount sent and the transaction hash](/content-images/noir-sent-2d476e94b9.webp)

Saldo akan muncul dan kamu dapat langsung membelanjakannya.

![NanoGPT balance page showing the credited amount and deposit history](/content-images/nanogpt-balance-0b0c0c86ba.webp)

<br/>

## <img src="/content-images/send-svgrepo-com-b62f643de0.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="send icon"/> Rute 2: Layanan yang tidak mengambil ZEC

Sebagian besar layanan AI tidak menerima ZEC. **Venice.ai** dan **OpenRouter** keduanya menggunakan USDC sebagai gantinya, dan OpenRouter memungkinkan kamu memilih chain mana yang digunakan untuk penyelesaian pembayaran.

Untuk itu, gunakan **CrossPay** di [Zodl](/zcash-organizations/zodl). Kamu membelanjakan ZEC terlindungi dan penerima dibayar dalam aset yang mereka minta, yang diarahkan melalui NEAR Intents tanpa exchange terpusat dan tanpa KYC.

1. Dapatkan alamat pembayaran layanan tersebut beserta aset dan chain yang diharapkan, misalnya USDC di Base
2. Buka Zodl dan pilih **CrossPay**
3. Masukkan alamat tersebut, pilih aset yang diminta oleh layanan, dan masukkan jumlahnya
4. Kirim dari saldo terlindungi kamu

ZEC kamu keluar dari status terlindungi. Layanan tersebut melihat pembayaran USDC biasa yang masuk dan tidak akan pernah tahu bahwa itu bermula sebagai ZEC.

> Sisi swap terlihat pada chain tujuan, sehingga pembayaran USDC itu sendiri sama publiknya dengan pembayaran USDC lainnya. Yang tetap privat adalah sisi Zcash dan hubungan antara keduanya.

<br/>

## <img src="/content-images/triangle-exclamation-7a4c4150be.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Apa yang terungkap di setiap langkah

Ini adalah bagian yang paling sering dilewati oleh sebagian besar panduan.

| Apa yang terjadi | Apa yang dipelajari oleh layanan | Apa yang tercatat di chain |
|---|---|---|
| Menjelajah dan memberikan prompt | Tidak ada apa pun. Tanpa akun, tanpa email | Tidak ada apa pun |
| Alamat deposit diterbitkan | Tidak ada apa pun | Tidak ada apa pun. Shielded ke shielded |
| Kamu membayar **dari Sapling** | Alamat deposit yang kamu gunakan | Tidak ada apa pun. Shielded ke shielded |
| Kamu membayar **dari Ironwood** | Sama | **Jumlah dan block height** |
| Kamu membayar **dari alamat transparan** | Sama | Jumlah dan t-address milikmu |
| Salah satu dari hal di atas | IP kamu, kecuali jika kamu menggunakan Tor atau VPN | Tidak berlaku |

### Mengapa pool itu penting

Alamat deposit NanoGPT adalah alamat terpadu. Mendekode satu alamat yang diterbitkan pada Agustus 2026 menunjukkan tepat dua penerima: **Sapling** dan **Orchard**.

Sejak peningkatan [Ironwood](/zcash-tech/ironwood) diaktifkan pada 28 Juli 2026, Orchard hanya dapat digunakan untuk pengeluaran dan tidak ada nilai baru yang dapat masuk ke dalamnya. Hal ini menjadikan **Sapling sebagai satu-satunya penerima tempat pembayaran benar-benar dapat mendarat**.

Jadi jika ZEC kamu sudah berada di Sapling, pembayarannya adalah Sapling ke Sapling dan tidak ada satu pun hal tentang itu yang bersifat publik. Namun jika kamu telah bermigrasi ke Ironwood, pembayaran memindahkan nilai melintasi batas pool, dan [the turnstile](/zcash-tech/the-turnstile) mempublikasikan jumlah dan height meskipun pengirim dan penerima tetap tersembunyi.

Tampilan layarnya terlihat identik dengan cara apa pun. Menyimpan saldo Sapling yang kecil untuk pembayaran adalah solusi termudah.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Kesalahan Umum yang Harus Dihindari

- Melakukan deposit sebelum menyimpan token login, lalu menghapus cookie
- Mengirim tepat pada jumlah minimum transfer dan ternyata kurang satu sen
- Mencoba menarik dana langsung dari sebuah exchange ke alamat `u1...`
- Berasumsi bahwa pembayaran tersebut bersifat privasi tanpa memeriksa dari pool mana kamu melakukan pengeluaran
- Melakukan pembayaran melalui koneksi biasa padahal tujuan utamanya adalah agar tidak teridentifikasi

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Hasil

Kamu dapat:

- Gunakan model AI frontier tanpa akun, email, atau kartu
- Bayar dengan ZEC terlindungi dan ketahui dengan tepat apa yang disembunyikan dan apa yang tidak
- Jangkau layanan yang belum pernah mendengar tentang Zcash, melalui CrossPay

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Terkait

- [Ironwood](/zcash-tech/ironwood) - mengapa pool tempat dana kamu berada berubah
- [The Turnstile](/zcash-tech/the-turnstile) - apa yang menjadi publik saat nilai berpindah antar pool
- [Wallets](/using-zcash/wallets) - dompet mana saja yang dikelola
- [ZODL](/zcash-organizations/zodl) - dompet di balik CrossPay

<br/>

## <img src="/content-images/progress-arrows-svgrepo-com-aad76739e5.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="progress icon"/> Progres

**Langkah 1 dari 1**

Kamu telah membayar layanan AI dengan ZEC terlindungi dan kamu tahu apa yang terungkap darinya.

<br/>

## Langkah Selanjutnya

- [Kirim Uang Tanpa Menghubungkan Identitas](/zcash-use-cases/send-money-without-linking-identity)

<br/>