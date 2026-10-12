# **Cara Melakukan Swap untuk ZEC di Dompet Phantom**

![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

Sudah memiliki ZEC di Solana (misalnya dari token yang membayar pemegang dalam ZEC)? Jangan melakukan swap. Pindahkan token tersebut ke dompet Zcash terlindungi dengan [Sudah punya ZEC di Solana? Pindahkan ke Zcash](/using-zcash/solana-zec-to-shielded) terlindungi.

---

## **ZEC Native atau token ZEC?**

"ZEC" di dalam Phantom dapat berarti dua aset yang berbeda, jadi pastikan kamu tahu mana yang sedang kamu bayar.

- **Tombol Swap bawaan Phantom** memberi kamu representasi token dari ZEC di Solana (atau jaringan lain yang didukung oleh Phantom). Ini bukan ZEC asli. Token ini berada di alamat Phantom kamu, tidak memiliki fungsionalitas terlindungi Zcash, dan dompet Zcash tidak dapat melihat atau melindunginya.
- **ZEC asli** hanya ada di blockchain Zcash dan dikirim ke alamat Zcash. Untuk mendapatkannya, kamu memerlukan layanan yang meminta alamat Zcash kamu, seperti swap di dalam [ZODL](https://zodl.com), salah satu opsi pada halaman [DEX](/dex), atau solswap.org yang diikuti dengan penarikan ke dompet Zcash kamu (Langkah 8).

### Periksa sebelum kamu membayar

- **Network:** ZEC yang kamu terima harus berada di network **Zcash**. Jika tertulis Solana, Ethereum, atau Base, itu adalah sebuah token.
- **Asset:** ZEC asli tidak memiliki kontrak token atau alamat mint. Jika milikmu menunjukkan hal tersebut, itu adalah sebuah token. Ada juga banyak token "ZEC" yang mirip di Solana, jadi jangan hanya berpatokan pada namanya saja. Token OmniBridge di Solana adalah `A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS`; itu tetaplah sebuah token, bukan ZEC asli.
- **Address:** ZEC asli dikirim ke alamat Zcash, yang dimulai dengan `t1`, `u1`, atau `zs`. Jika ZEC dikirim ke alamat Phantom milikmu, kamu sedang menerima sebuah token.

---

## **Langkah 1: Buka Antarmuka Swap**
Buka **aplikasi Phantom** dan kunjungi **[solswap.org](https://solswap.org/)** dari browser Phantom. Ketik sendiri alamatnya. Situs ini berjalan di atas NEAR Intents dan dapat mengirimkan ZEC ke alamat Zcash.

Tombol **Swap** milik Phantom juga mencantumkan ZEC, tetapi itu akan memberimu token yang dijelaskan di atas, bukan ZEC asli.

![img2](/content-images/S1Cp-KWqxe-ab70e844b9.webp)

---

## **Langkah 2: Pilih Jaringan dan Token untuk Deposit**
- Pilih **jaringan sumber** kamu (misalnya, *Ethereum* atau *Solana*) lalu lakukan deposit untuk swap.

![img3](/content-images/S1SaGYZ9xx-2a27ccdd47.webp)

- Pilih token dasar seperti **SOL, USDT, atau USDC**.
- Pilih **ZEC** sebagai **token tujuan** kamu.
- Pastikan Zcash tersedia melalui antarmuka swap.

![img4](/content-images/ry4QQF-5gx-2a27ccdd47.webp)

---

## **Langkah 3: Masukkan Jumlah & Tinjau Penawaran**
- Masukkan jumlah yang ingin kamu swap.
- Gunakan jumlah penerimaan yang ditampilkan di **solswap.org**. Penawaran tersebut adalah penawaran yang berlaku pada rute ini.

![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

## **Langkah 4: Periksa Gas & Biaya**
- Simpan token gas chain asal yang cukup di Phantom untuk menyetujui deposit (*SOL* pada Solana, *ETH* pada Ethereum).
- Baca baris biaya pada penawaran solswap sebelum kamu melakukan konfirmasi. Fitur Swap bawaan Phantom menggunakan jadwal biayanya sendiri (secara historis berupa biaya Phantom sebesar 0,85% ditambah gas jaringan dan biaya bridging). Angka-angka tersebut tidak berlaku untuk deposit di solswap.org.

---

## **Langkah 5: Sesuaikan Pengaturan (Opsional)**
Di solswap.org, tinjau slippage dan jumlah minimum yang akan kamu terima pada layar tersebut sebelum kamu melakukan deposit.

Jika kamu melihat lembar **Swap** milik Phantom sebagai gantinya, kamu berada di rute token dari bagian atas halaman ini. Tutup lembar tersebut dan buka `solswap.org` di browser Phantom.

---

## **Langkah 6: Konfirmasi Swap**
- Tinjau semua detail swap di solswap.org.
- Konfirmasi deposit di Phantom.

![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **Langkah 7: Pantau Status**
- Pantau deposit dalam aktivitas di solswap.org hingga menunjukkan status **Completed**.
- ID transaksi Solana atau source-chain berada pada baris aktivitas tersebut dan pada chain explorer untuk jaringan tersebut.

![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **Langkah 8: Tarik ZEC Asli ke Dompet Zcash Kamu**
Setelah swap, ZEC kamu akan muncul di saldo **Akun** solswap.org kamu. Aset tersebut belum ada di jaringan Zcash, dan juga belum ada di Phantom.

1. Buka dompet Zcash yang ditandai oleh direktori [](/wallets) sebagai **Ironwood: Ready**. Salin `u1` label dompet kamu sebagai terlindungi. Sebuah `t1` juga dapat digunakan, tetapi setoran tersebut bersifat publik sampai kamu menjadikannya terlindungi.
2. Di solswap.org, buka **Account** dan ketuk **Withdraw**. Pilih **ZEC**, atur jaringan ke **Zcash**, tempel alamatnya dan periksa karakter pertama serta terakhir sebelum kamu mengonfirmasi.
3. Jika **Received amount** dan **Fee** tetap bertuliskan "–" dan tombol tidak memberikan respons, saldo tersebut tidak hilang. Saldo itu berada di NEAR Intents di bawah Phantom key milikmu. Selesaikan di [near.com](https://near.com): masuk dengan Phantom dompet yang sama, buka **Move legacy assets**, ketuk **Withdraw** pada baris ZEC (bukan **Move**), atur jaringan ke **Zcash**, dan tempel `u1` yang sama. Phantom akan meminta kamu untuk **Sign Message**. Konfirmasi hanya jika permintaan tersebut berasal dari `near.com` dan pesan tersebut menyebutkan `"verifying_contract": "intents.near"`. Layar lengkap untuk solusi sementara tersebut ada di [Got ZEC on Solana? Move it to shielded Zcash](/using-zcash/solana-zec-to-shielded).

---

## **Langkah Selanjutnya**
Setelah ZEC asli ada di dalam dompet Zcash kamu, tetaplah gunakan transaksi terlindungi dengan [Menggunakan ZEC secara privat](/guides/using-zec-privately).

Token ZEC yang dibeli dengan tombol Swap milik Phantom tidak dapat dibuat terlindungi dari Phantom. Token tersebut adalah aset OmniBridge di Solana. Pindahkan menggunakan [Punya ZEC di Solana? Pindahkan ke Zcash](/using-zcash/solana-zec-to-shielded) yang terlindungi.
