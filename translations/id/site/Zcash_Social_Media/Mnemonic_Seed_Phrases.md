# Dari Nol ke Zero-Knowledge: Frasa Pemulihan Mnemonic

**Seri:** Dari Nol ke Zero Knowledge

Frasa pemulihan mnemonik mendasari salah satu aspek terpenting dari mata uang kripto - **kustodial mandiri**.  
Hari ini kita akan mempelajari bagaimana frasa pemulihan dibuat dan digunakan dalam dompet.

---

## Apa itu Mnemonic Seed Phrases?

Frasa pemulihan ditentukan oleh spesifikasi **BIP-39**, jenis frasa pemulihan yang paling umum digunakan saat ini.

Pembuatan frasa pemulihan dimulai dengan menghasilkan **keacakan**. Semakin banyak entropi, semakin tinggi keamanannya. Entropi sebesar **128 bit** dianggap cukup bagi sebagian besar pengguna.

![Seed phrase concept](/content-images/FooM3qWWACgrwzn-f222c4081f.webp)

Tergantung pada panjang entropi awal, frasa pemulihan akan memiliki panjang **12 hingga 24 kata**.

---

## Langkah demi Langkah: Bagaimana Frasa Pemulihan 12-Kata Dihasilkan

### 1. Menghasilkan Entropi
Kita mulai dengan menghasilkan **128 bit** entropi.

### 2. Tambahkan Checksum
Kami melakukan hashing pada entropi menggunakan **SHA256**. Beberapa bit pertama dari hash ini menjadi checksum.  
Hal ini memberi kami sidik jari unik untuk entropi kami.

![Entropy + Checksum diagram](/content-images/FooNoOEXgAAu-g6-613238fa7e.webp)

### 3. Bagi menjadi potongan 11-bit
Total 132 bit (128 entropi + 4 checksum) dipisahkan ke dalam potongan berukuran 11 bit.

### 4. Pemetaan ke Wordlist
Setiap urutan 11-bit dikonversi menjadi angka desimal (0-2047).  
Wordlist BIP-39 berisi tepat **2048 kata** (Bahasa Inggris, Spanyol, Mandarin, dll.).

Angka-angka ini digunakan untuk menemukan kata yang sesuai dalam daftar kata.

![Word mapping example](/content-images/FooN9rfXEBoQuU2-d11331fc0a.webp)

**Hasil:** Sekarang Anda memiliki frasa pemulihan 12 kata yang aman dan dapat dibaca manusia!

---

## Dari Frasa Pemulihan -> Seed -> Alamat Pembayaran

Dengan menggunakan frasa pemulihan, sebuah dompet dapat menghasilkan kunci untuk membuat alamat pembayaran dan berbagai akun dompet lainnya.

Kunci yang dihasilkan bersifat **deterministik** - input yang sama akan selalu menghasilkan output yang sama.

### Pembuatan Seed
Seed dompet diturunkan dari frasa mnemonik menggunakan **Key Derivation Function (KDF)**:

- Di **Bitcoin**: PBKDF2  
- Di **Zcash**: Blake2b-256/512

Ini menghasilkan sebuah frasa pemulihan **64-byte (512-bit)**.

![Seed to master keys](/content-images/FooOuumXEAgcBm1-dc7c66b84a.webp)

### Kunci Utama
Seed dibagi menjadi dua urutan 32-byte:
- **Master Spending Key**
- **Master Chain Code**

Ini digunakan dalam **Dompet Hierarchical Deterministic (HD)** untuk derivasi kunci anak.

---

## Fitur Spesifik Zcash (ZIP-32)

Di Zcash, **viewing authority** atau **spending authority** dapat didelegasikan secara independen untuk sub-tree tanpa mengompromikan master seed.

**ZIP-32** mendefinisikan standar pembuatan kunci hierarkis deterministik yang diadaptasi untuk fitur privasi Zcash.

Dari **Expanded Spending Key**, kita menurunkan:
- Full Viewing Key
- Incoming Viewing Key
- Kumpulan alamat pembayaran

Mekanisme derivasi yang berbeda menghasilkan alamat eksternal yang sesuai untuk diberikan kepada pengirim di seluruh pool terlindungi (Sapling & Orchard).

![Zcash key derivation hierarchy](/content-images/FooPKd4XEBUQhJ6-af133c01bf.webp)

Zcash juga mendukung **alamat internal** untuk operasi dompet seperti Auto-Shielding.

---

## Sumber Daya

- [ZIP-32: Dompet Hierarchical Deterministic Terlindungi](https://zips.z.cash/zip-0032)  
- Spesifikasi Protokol [Zcash (NU5)](https://zips.z.cash/protocol/protocol.pdf)  
- [Ikhtisar dompet yang secara default terlindungi](https://zechub.wiki)

---

**Thread Asli oleh ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1624125037945946145

---

*Halaman ini disusun dari utas asli Zero to Zero Knowledge untuk wiki ZecHub.*