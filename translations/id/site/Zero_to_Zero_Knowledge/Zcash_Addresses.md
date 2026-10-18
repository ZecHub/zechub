# Dari Nol ke Zero-Knowledge: Transaksi Transparan vs Terlindungi & Alamat Terpadu

**Seri:** Zero ke Zero Knowledge

Jika Anda baru pertama kali mempelajari tentang Zcash, Anda akan menemukan bahwa ada dua jenis transaksi yang tersedia: **Transparan** dan **Terlindungi**.

Hari ini kita akan mempelajarinya & membahas salah satu fitur baru dalam ekosistem #Zcash, **Unified Addresses**.

---

## Transaksi Transparan vs Terlindungi

- **Transaksi transparan** menggunakan **alamat t** (terenkode Base58). Segalanya dapat dilihat secara publik - sama seperti Bitcoin.  
- **Transaksi terlindungi** menggunakan alamat yang terenkode untuk pool **Sapling** atau **Orchard**. Transaksi ini menyembunyikan pengirim, penerima, dan jumlah menggunakan zero-knowledge proofs.

**Transaksi terlindungi** mengacu pada transaksi apa pun dengan alamat yang dikodekan untuk pool Sapling/Orchard.

![Transparent vs Shielded intro](/content-images/FpmW00HWIAIZpQD-a244cfd85d.webp)

**Unified Addresses (UAs)** dirancang untuk **menyatukan** transaksi terlindungi atau transparan ke dalam satu alamat tunggal.

---

## Tipe Alamat di Zcash

Ada 3 jenis alamat yang digunakan:

1. **(T) Transparan** – Base58  
2. **(Z) Sapling** – Bech32  
3. **(UA) Unified Address** – Bech32m

Jumlah karakter (dan oleh karena itu ukuran kode QR) meningkat pada setiap tipe.

![Address types comparison](/content-images/FpmXe5bXsAEFeLY-704048927f.webp)

![QR code size comparison](/content-images/FpmXmDwXoAIWxov-dfc8346ffc.webp)

---

## Cara Kerja Alamat Terpadu (Unified Addresses)

Alamat dan kunci dikodekan sebagai urutan byte (**Raw Encoding**).  
**Receiver Encoding** mencakup semua informasi yang diperlukan untuk mentransfer aset menggunakan protokol tertentu.

Pengodean mentah dari sebuah Unified Address adalah kombinasi dari pengodean (typecode, length, addr) dari penerima:

- UA: `0x03`  
- Sapling: `0x02`  
- Transparan: `0x01`

**Penting**: Harus ada **setidaknya satu alamat pembayaran terlindungi** di setiap UA. (Alamat Sprout tidak lagi didukung setelah peningkatan Canopy.)

![UA encoding structure](/content-images/FpmYW1ZXgAAvALT-70903e29c6.webp)

Spesifikasi lengkap: **[ZIP-316: Alamat Terpadu](https://zips.z.cash/zip-0316)**

---

## Manfaat Alamat Terpadu

- **Lebih mudah bagi exchange** - Mereka kini dapat mendukung deposit/penarikan terlindungi dengan lebih aman.  
- **Siap untuk masa depan** - Pool terlindungi baru dapat ditambahkan tanpa merusak dompet.  
- **Terlindungi secara Default** - Setiap UA berisi setidaknya satu alamat terlindungi, sehingga privasi selalu tersedia.

Ini adalah pergeseran mendasar yang sudah membantu lebih banyak ZEC berpindah ke dalam pool terlindungi.

---

## Transaksi & Tindakan Orchard

Orchard memperkenalkan konsep baru yang disebut **Actions**:

- Mereka mengurangi kebocoran metadata dengan menggunakan **satu anchor tunggal** untuk semua Action dalam sebuah transaksi.  
- Mereka menggabungkan field dari (V4) Spend + Output ke dalam satu value commitment tunggal.  
- Hal ini memungkinkan optimasi performa pada sistem proof Halo2.

Daira menjelaskan posisi Anchor (zcon3):

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f6UToqiIdeY"
    title="Zcon3"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div >

---

## Keseimbangan Nilai & Privasi

Dalam beberapa kasus (misalnya transaksi lintas-pool), jumlahnya mungkin dapat terlihat oleh pengamat luar. Namun, `valueBalanceSapling` dan `valueBalanceOrchard` menggunakan **homomorphic commitments** untuk membuktikan total ZEC dalam pool terlindungi dan mencegah pemalsuan.

Baca selengkapnya: [ZIP 209: Melarang Saldo Pool Nilai Rantai di Luar Jangkauan](https://zips.z.cash/zip-0209)

---

## Peningkatan di Masa Depan

Tim ECC sedang mengerjakan metode RPC baru di `zcashd` (menggantikan `z_sendmany`) yang akan memungkinkan pengguna untuk meninjau serta menerima/menolak sebuah transaksi yang diusulkan berdasarkan karakteristik privasinya.

---

## Rekomendasi

Thread ini awalnya mengarah ke **YWallet**, untuk rencana transaksi yang ditampilkan sebelum Anda menekan kirim. YWallet tidak lagi dikelola dan tidak akan diperbarui untuk Ironwood, sehingga tidak dapat lagi mengikuti rantai tersebut. Sebagai gantinya, pilihlah dompet yang dikelola dari halaman [Wallets](https://zechub.wiki/wallets), dan utamakan dompet yang memberi tahu Anda apa yang akan diungkapkan oleh sebuah transaksi sebelum transaksi tersebut dikirim.

Artikel luar biasa mengenai privasi transaksi: https://medium.com/@hanh.huynh/

---

**Thread Asli oleh ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1628498645627666432

---

*Halaman ini disusun dari utas asli Zero to Zero Knowledge untuk wiki ZecHub.*