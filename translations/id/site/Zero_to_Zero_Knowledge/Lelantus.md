# Dari Nol ke Zero Knowledge: Protokol Lelantus

**Seri:** Zero ke Zero Knowledge

Hari ini kita akan melihat **Lelantus**!

Dirilis pada tahun 2019, protokol ini dibangun berdasarkan Zerocoin. Protokol ini digunakan dalam mata uang **Firo** (sebelumnya Zcoin) untuk memungkinkan transaksi on-chain yang privat. Protokol ini menyerupai Zcash dalam beberapa hal tetapi sangat berbeda dalam sebagian besar aspek lainnya.

![Lelantus intro](/content-images/Fsk18DgXsAEc0Ob-a8cd9a85d1.webp)

---

## Fondasi Protokol Zcash vs Firo

- **Zcash** - Dibangun di atas protokol **Zerocash**  
- **Firo (Zcoin)** - Dibangun di atas protokol **Zerocoin**

![Zerocash vs Zerocoin comparison](/content-images/Fsk2Fk7WcAA81ty-92158edf6b.webp)

---

## Evolusi Protokol Privasi Firo

Serupa dengan Zcash, Firo menggunakan alamat terlindungi untuk mencapai pembayaran anonim.

**Lini Masa:**
- **Zerocoin** - Keandalan (soundness) terbukti cacat
- **Sigma** - Sistem denominasi tetap
- **Lelantus 1.0** - Kurang memiliki proof keamanan yang tepat

![Protocol evolution](/content-images/Fsk2NdaWAAAKVgH-f84ae27c48.webp)

---

## Batasan Protokol Sigma

Protokol Σ (Sigma) yang digunakan pada versi awal Zcoin/Firo memiliki batasan utama: pengguna hanya dapat mencetak denominasi tetap.

Hal ini menciptakan set anonimitas yang lebih kecil dan membuka peluang bagi serangan timing antara operasi mint dan redeem (ditambah dengan masalah "tainted change").

![Sigma denominations](/content-images/Fsk2fxfWcAMUBDo-333a8f9df3.webp)

---

## Bagaimana Lelantus Meningkatkan Privasi

**Lelantus** menyelesaikan masalah denominasi tetap dengan memungkinkan pencetakan dari satu set yang lebih besar.

Manfaat utama:
- Menghilangkan set anonimitas denominasi tetap
- Mengurangi serangan timing antara burn/redeem
- Menghapus masalah kembalian yang tercemar

**Batasan**: Ukuran set saat ini dibatasi maksimal **65.000 koin**.

![Lelantus advantages](/content-images/Fsk2wK3X0AA6MEe-06f29b3621.webp)

---

## Komitmen Koin

**coin commitment** adalah komitmen double-blinded yang menyandikan nomor seri koin dan nilai koin.

Ini berfungsi secara serupa dengan **Notes** di Zcash.

Komitmen koin dipublikasikan dan disimpan di dalam ledger saat koin dibuat (melalui transaksi Mint atau Spend).

![Coin commitment diagram](/content-images/Fsk3AWNX0AIHya8-0ed01a73c1.webp)

---

## Model Basecoin < - > Zerocoin

Lelantus menggunakan model klasik **basecoin < - > zerocoin**.

**Fitur penting**: Penebusan parsial kini dimungkinkan dengan tetap menjaga sisa saldo dan jumlah tetap tersembunyi.

Seperti Zcash, transaksi transparan harus dipilih secara eksplisit oleh pengguna.

![Lelantus flow](/content-images/Fsk3HrjXgAMgqmX-4d727febf5.webp)

---

## One-of-Many Proofs

Lelantus menggunakan **One-of-Many Proofs** untuk mengekstrak nilai input yang diperlukan guna membuktikan saldo tanpa mengungkapkan asal usul input - dan tanpa memerlukan trusted setup.

Proof ini juga digunakan dalam **Triptych** (disebutkan dalam utas CryptoNote kami).

![One-of-Many Proofs](/content-images/Fsk3Z0nWIAAPD4k-b76f087018.webp)

---

## Privasi Lapisan Jaringan: Dandelion++

node Firo menggunakan Network Magic yang sama dengan Magicbean milik Zcash.

Seperti Monero, Firo menerapkan **Dandelion++** untuk menambah privasi dengan mengaburkan alamat IP dari penyiar transaksi.

**Fase Dandelion++:**
- **Fase Stem** - Transaksi diteruskan ke satu node acak alih-alih ke semua peer
- **Fase Fluff** - Dimulai secara acak, kemudian beralih ke mode gossip normal

Hal ini membuatnya jauh lebih sulit untuk melacak asal usul sebuah transaksi melalui analisis jaringan.

![Dandelion++ explanation](/content-images/Fsk4A8VWcAU84MR-538b054cab.webp)

---

## Masa Depan: Lelantus-Spark

**Lelantus-Spark** (direncanakan untuk akhir 2023) memperkenalkan dua tingkat visibilitas opsional menggunakan **derivasi gaya ZIP-32** dan alamat yang terdiversifikasi.

Ini juga akan menambahkan dukungan untuk:
- Multisig
- Aset Konfidensial yang Ditentukan Pengguna

Fitur-fitur ini sejajar dengan Zcash Shielded Assets.

![Lelantus-Spark announcement](/content-images/Fsk4jXeXsAACQ3h-b53294b16e.webp)

---

**Thread Asli oleh ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1641902859800150017

---

*Halaman ini disusun dari utas asli Zero to Zero Knowledge untuk wiki ZecHub.*