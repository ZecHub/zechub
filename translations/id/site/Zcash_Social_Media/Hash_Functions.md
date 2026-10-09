# Dari Nol ke Zero Knowledge: Fungsi Hash

**Pendahuluan Seri**  
Selamat datang di seri baru: **Zero to Zero Knowledge**!

Dalam seri ini, kita akan mempelajari dasar-dasar dari berbagai teknologi yang digunakan dalam protokol penjaga privasi kami.

---

## Bagian 1: Fungsi Hash

Hari ini kita mulai dengan **Fungsi Hash** - sebuah komponen kunci kriptografi yang digunakan dalam blockchain. Nantinya dalam seri ini, kita akan membahas beberapa topik yang bergantung pada properti tersebut.

### Apa itu Fungsi Hash?

Fungsi Hash menerima input dengan panjang apa pun dan menghasilkan output dengan panjang tetap.

- **Pesan yang akan di-hash** = Input  
- **Algoritma yang digunakan** = Fungsi Hash  
- **Hasil keluaran** = Nilai Hash


![Hash Function diagram](/content-images/Fn_NkFHXgAEtgse-474c24c373.webp)

### Coba sendiri!

Mari kita dapatkan pemahaman praktis menggunakan alat ini!  
Masukkan teks sembarang apa pun untuk menghasilkan output dengan panjang tetap. Perhatikan bagaimana output bervariasi tergantung pada algoritma hashing yang berbeda.

**Coba sekarang:** https://cryptii.com/pipes/hash-function

---

### Properti Fungsi Hash Kriptografi

Fungsi Hash Kriptografi harus memiliki **3 properti** ini:

1. **Satu arah** - Harus tidak mungkin untuk membalikkan fungsi hash  
2. **Resisten terhadap kolisi** - Dua input yang berbeda tidak boleh menghasilkan hash ke output yang sama  
3. **Deterministik** - Untuk input apa pun, fungsi hash harus selalu memberikan hasil yang sama

---

### Fungsi Hash Umum

Ada beberapa kelas Fungsi Hash. Beberapa contohnya:

- Secure Hashing Algorithm (**SHA-3**)  
- Message Digest Algorithm 5 (**MD5**)  
- **BLAKE2b** - Digunakan dalam derivasi kunci Zcash

**Pengenalan BLAKE2**: https://www.blake2.net

---

### Penggunaan Fungsi Hash di Dunia Nyata

#### 1. Integrity Hashing (Pemeriksaan Integritas Data)
Pemeriksaan integritas data adalah salah satu contoh dari "Integrity Hashing". Hal ini digunakan untuk menghasilkan checksum pada file data dan memberikan jaminan kebenaran kepada pengguna.

![Integrity Hashing example](/content-images/Fn_Or0MWIAI6sgx-9aab89b808.webp)

#### 2. Merkle Trees (Hash Trees)
Sebuah **hash tree** atau **Merkle tree** terdiri dari cabang-cabang dan node daun yang diberi label dengan hash kriptografis dari sebuah blok data.

![Merkle Tree diagram](/content-images/Fn_O7ndWIAY5PA-8e30e442ed.webp)

Merkle tree adalah sebuah contoh dari **skema komitmen kriptografi**. Root dari tree tersebut dianggap sebagai sebuah komitmen, dan node daun yang terbukti merupakan bagian dari komitmen asli.

Mereka memverifikasi data yang disimpan atau ditransfer pada jaringan P2P, memastikan data yang diterima dari peer tidak berubah.

#### 3. Note Commitment Tree dalam Zcash
Dalam pool terlindungi Zcash **Sapling** & **Orchard**, **Note Commitment Tree** digunakan untuk memverifikasi bahwa transaksi valid terhadap konsensus sambil menyembunyikan pengirim, penerima & jumlah yang digunakan secara sempurna.

#### 4. Signature Hash (blok gaya Bitcoin)
**SHA256** adalah contoh dari "Signature hash" yang digunakan untuk menegakkan imutabilitas setiap blok dalam rantai Bitcoin. Penambang menggunakan hash dari blok sebelumnya + Sebuah hash dari semua transaksi dalam blok saat ini (hashMerkleRoot) + Timestamp + nilai acak / kesulitan jaringan untuk blok baru.

![SHA256 block diagram](/content-images/Fn_PaVZXoAApHPf-936e479067.webp)

#### 5. Equihash (Penambangan Zcash)
**Equihash** adalah algoritma hashing yang digunakan dalam penambangan Zcash. Algoritma ini juga digunakan oleh jaringan seperti Komodo & Horizen.

**Equihash: Asymmetric Proof-of-Work Berdasarkan Generalized Birthday Problem** (Biryukov dan Khovratovich): https://eprint.iacr.org/2015/946

---

### Bacaan Lebih Lanjut

Untuk membangun pemahaman yang lebih mendalam tentang berbagai jenis fungsi hash dan kegunaan terkaitnya, ini adalah sumber daya yang sangat baik:  
https://en.wikipedia.org/wiki/Hash_function

---

**Utas oleh ZecHub (@ZecHub)**  
Utas X asli: https://x.com/ZecHub/status/1621240109663227906

---

*Halaman ini disusun dari utas asli Zero to Zero Knowledge untuk wiki ZecHub.*