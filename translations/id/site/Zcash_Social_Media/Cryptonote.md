# Dari Nol ke Zero-Knowledge: Protokol CryptoNote

**Seri:** Dari Nol ke Zero Knowledge

Sesuatu yang menarik hari ini!  
Protokol **CryptoNote** memungkinkan privasi on-chain yang kuat. Hari ini kita akan mempelajari semua fitur utamanya dan bagaimana protokol ini telah diimplementasikan oleh beberapa proyek privasi terkemuka.

![CryptoNote intro](/content-images/FrXr5P8WIAAvx36-88db0c8250.webp)

---

## Latar Belakang

Whitepaper CryptoNote asli diterbitkan di bawah pseudonim **"Nicolas van Saberhagen"**.

**Bytecoin** adalah mata uang kripto pertama yang mengimplementasikan protokol ini. Proyek paling terkenal yang menggunakannya saat ini adalah **Monero (XMR)**. Protokol ini juga telah digunakan dalam TurtleCoin, Aeon, dan beberapa lainnya.

---

## Fitur Utama CryptoNote

Protokol CryptoNote menyediakan tiga fitur utama:

1. **Ketidakterlacakan dan Ketidakmampuan untuk Menghubungkan** transaksi
2. **Egalitarian Proof of Work** (tahan ASIC)
3. **Emisi dinamis**

---

## 1. Ketidakterlacakan - Ring Signatures

Ketidakterlacakan utamanya dicapai menggunakan **Ring Signatures**.

Saat mengirimkan sebuah transaksi, kunci publik asli Anda dicampur dengan beberapa kunci umpan (the "ring") - yang semuanya berisi jumlah koin yang sama. Hal ini membuat sangat sulit untuk menentukan siapa yang sebenarnya mengirim koin tersebut.

**Ukuran ring** secara signifikan memengaruhi set anonimitas. Ring yang lebih besar memberikan privasi yang lebih baik.

![Ring Signatures explanation](/content-images/FrXteGHXgAANE0F-f11593a0d9.webp)

**Perbandingan dengan Zcash**:  
set anonimitas Zcash adalah jumlah total transaksi yang *pernah* dilakukan dalam suatu pool terlindungi tertentu (jauh lebih besar daripada ukuran ring CryptoNote pada umumnya).

---

## Ring CT (Confidential Transactions)

Model **Ring CT** telah meningkatkan privasi secara signifikan pada koin berbasis CryptoNote.

Alih-alih hanya menyembunyikan pengirim, Ring CT juga **mengaburkan jumlah transaksi** antara pengirim dan penerima.

![Ring CT diagram](/content-images/FrXuivgWYAAze7B-260071c1b3.webp)

Ini menggunakan:
- Elliptic Curve Cryptography
- Pedersen Commitments
- Homomorphic Encryption

**Proof** digunakan untuk menunjukkan bahwa jumlah tersebut lebih besar dari 0 dan berada dalam rentang yang valid **tanpa mengungkapkan nilai sebenarnya**.

**Stealth Addresses** juga menambahkan alamat sekali pakai untuk penerima.

![Stealth Addresses + Proofs](/content-images/FrXut5aWAAMhuRb-f3ce8ea3fd.webp)

---

## 2. Egalitarian Proof of Work (ePoW)

CryptoNote bertujuan untuk menciptakan sistem penambangan yang lebih adil dengan menjadi tahan terhadap ASIC.

Ini menggunakan algoritma **CryptoNight** (sebuah fungsi memory-hard). Berbeda dengan SHA256 milik Bitcoin, CryptoNight dirancang untuk memperkecil kesenjangan antara penambang CPU, GPU, dan ASIC.

**Langkah-langkah CryptoNight:**
1. Inisialisasi area memori yang besar (scratchpad) dengan data pseudorandom
2. Lakukan berbagai operasi baca/tulis pada scratchpad
3. Hash seluruh scratchpad untuk menghasilkan nilai akhir

![CryptoNight mining](/content-images/FrXvNs3XsAA37LG-5779657f5c.webp)

(Catatan: Monero sejak saat itu telah beralih dari CryptoNight ke algoritma lainnya.)

---

## 3. Emisi Dinamis

Alih-alih peristiwa halving yang tiba-tiba (seperti Bitcoin), CryptoNote menggunakan **imbalan blok yang berkurang secara bertahap**.

Hal ini menciptakan kurva emisi yang jauh lebih mulus seiring berjalannya waktu.

![Dynamic emission curve](/content-images/FrXv8wpXoAEjUxW-e2bbaebced.webp)

**Koneksi Zcash**:  
Para pengembang Zcash telah mendiskusikan penerapan kurva emisi yang lebih mulus di masa mendatang, yang berpotensi melalui sebuah "Zcash Posterity Fund".

---

## Kesimpulan

CryptoNote telah terbukti menjadi pendekatan yang kuat dan teruji untuk privasi on-chain. Banyak inovasinya telah memengaruhi ekosistem koin privasi yang lebih luas.

Beberapa peneliti percaya bahwa fitur-fitur CryptoNote pada akhirnya dapat dikombinasikan dengan pool terlindungi zero-knowledge yang tanpa kepercayaan (trustless).

---

**Thread Asli oleh ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1636473585781948416

---

*Halaman ini disusun dari utas asli Zero to Zero Knowledge untuk wiki ZecHub.*