# Validasi Unified Address (ZIP-316)

*Ini adalah panduan pembelajaran, bukan decoder paket atau pustaka pembayaran copy-paste. Ini menjelaskan bagaimana sebuah Unified Address terstruktur sehingga Anda dapat memahami apa yang dilakukan oleh pustaka yang dikelola di balik layar. Untuk apa pun yang menangani dana asli, rujuklah pada spesifikasi [ZIP-316](https://zips.z.cash/zip-0316) dan implementasi resmi yang ditautkan di bawah ini.*

---

## Gambaran besar

Sebuah Unified Address (UA) adalah satu string alamat tunggal yang membawa berbagai jenis penerima: **Transparan**, **Sapling**, **Orchard**, atau kombinasi dari semuanya. Dompet pembayar secara otomatis memilih pool penerima terbaik yang didukungnya.

Bayangkan UA sebagai sebuah amplop tertutup yang berisi beberapa kartu berlabel. Setiap kartu mewakili cara berbeda untuk menghubungi Anda. Untuk memeriksa sebuah alamat, sebuah aplikasi harus:

1. **Buka amplop:** Dekode string teks tersebut.
2. **Urutkan kembali isinya:** Batalkan pengacakan pelindung (**F4Jumble**).
3. **Baca setiap kartu:** Ekstrak penerima secara individual.
4. **Terapkan aturan protokol:** Abaikan atau tolak entri sesuai dengan rentang typecode mereka.

---

## Mengapa "cukup dekode Bech32m" tidaklah cukup

UA menggunakan pengkodean teks Bech32m, tetapi melakukan dekode Bech32m saja tidak akan mengungkap penerima yang dapat digunakan.

ZIP-316 secara sengaja mengacak payload menggunakan **F4Jumble** sebelum melakukan encoding. F4Jumble memastikan bahwa mengubah bahkan satu karakter saja dalam alamat akan mengubah output yang didekode secara keseluruhan. Hal ini mencegah serangan malleability alamat di mana penyerang menukar byte di tengah alamat namun membiarkan prefix dan suffix terlihat valid.

> **Aturan utama:** Perlindungan malleability hanya berfungsi jika aplikasi Anda menjalankan seluruh alur decoding dan validasi secara lengkap. Decoding parsial menghilangkan keamanan namun tetap mempertahankan semua risiko.

---

## Alur dekode, langkah demi langkah

### Langkah 1: Dekode Bech32m dan periksa jaringan
- **Bagian yang dapat dibaca manusia (HRP):** `u` mengidentifikasi mainnet; `utest` mengidentifikasi testnet. *(UA Mainnet dimulai dengan `u1`, di mana `1` adalah pemisah Bech32.)*
- **Batas panjang:** Bech32m standar menerapkan batas 90 karakter. UA biasanya melebihi batas ini, sehingga pemeriksaan panjang standar harus dinonaktifkan dalam decoder.
- Konversi kata Bech32m 5-bit kembali ke byte 8-bit standar.

### Langkah 2: Membalikkan F4Jumble
F4Jumble adalah jaringan Feistel 4-round yang dibangun di atas BLAKE2b:
- **Panjang setengah bagian kiri:** `min(64, floor(length / 2))` byte. Batas 64 byte sesuai dengan ukuran output maksimum dari BLAKE2b. Setengah bagian kanan berisi payload yang tersisa.
- **Fungsi hash:** Bergantian antara G dan H menggunakan label personalisasi tetap (`UA_F4Jumble_G` dan `UA_F4Jumble_H`).
- **Urutan round:** Encoding forward berjalan G(0) → H(0) → G(1) → H(1). Proses pembalikan (unscrambling) berjalan H(1) → G(1) → H(0) → G(0).
- **Pemeriksaan rentang:** Menolak input di luar batas ukuran payload ZIP-316.

### Langkah 3: Hapus padding dan verifikasi HRP
Sebelum pengacakan, encoder menambahkan 16 byte yang berisi HRP, dengan padding berupa nol.
- Hapus 16 byte terakhir setelah proses unscrambling.
- Pastikan HRP yang tertanam sesuai dengan jaringan yang diharapkan (`u` atau `utest`). Hal ini mencegah alamat testnet diterima secara tidak sengaja di mainnet.

### Langkah 4: Ekstrak penerima
Payload yang tersisa terdiri dari entri `(typecode, length, content)`, di mana typecode dan panjangnya disimpan sebagai integer berukuran ringkas (satu byte tunggal untuk nilai kecil). Typecode penerima yang diketahui:

| Typecode | Tipe penerima       | Panjang konten |
| :------- | :------------------ | :------------- |
| `0x00`   | Transparan (P2PKH) | 20 bytes       |
| `0x01`   | Transparan (P2SH)  | 20 bytes       |
| `0x02`   | Sapling             | 43 bytes       |
| `0x03`   | Orchard             | 43 bytes       |

Selain ini, ZIP-316 menyediakan dua rentang tambahan untuk kompatibilitas ke depan:

- **`0xC0`–`0xDF` (metadata non-WAJIB-dipahami):** konsumen harus mengabaikan item metadata yang tidak mereka kenali dalam rentang ini.
- **`0xE0` dan `0xE1` (metadata kedaluwarsa WAJIB-dipahami yang ditetapkan):** registry ZIP-316 saat ini menetapkan ini untuk menangani ketinggian (height) dan waktu kedaluwarsa alamat. Konsumen harus memahami item-item ini atau menolak alamat tersebut.
- **`0xE2`–`0xFC` (metadata WAJIB-dipahami yang belum ditetapkan):** konsumen harus menolak alamat jika mereka menemukan item yang tidak dikenali dalam rentang ini.

Untuk tipe penerima yang diketahui, verifikasi bahwa panjang yang dikodekan sesuai dengan panjang konten yang ditentukan untuk tipe tersebut. Untuk item metadata, gunakan panjang compact-size yang telah dikodekan untuk menentukan panjang konten. Tolak entri yang terpotong atau byte tambahan apa pun di bagian akhir.

**Urutan penerima yang lebih disukai.** Setelah sebuah alamat berhasil diurai, dompet atau alat pembayaran harus memilih penerima terbaik dalam urutan ini: Orchard, kemudian Sapling, lalu transparan.

---

## Aturan penolakan wajib ZIP-316

**Berhasil melakukan decoding tidak membuat sebuah alamat menjadi valid.** Dompet resmi Zcash secara ketat menolak alamat yang melanggar aturan berikut. Alat berbasis web juga harus menolaknya untuk mencegah kegagalan pembayaran:

- **Penerima terlindungi yang hilang:** Alamat **harus** berisi setidaknya satu penerima Sapling atau Orchard. UA dengan hanya penerima transparan tidak valid berdasarkan ZIP-316.
- **Duplikasi typecode:** Setiap tipe penerima hanya boleh muncul paling banyak satu kali.
- **Typecode tidak berurutan:** Penerima harus muncul dalam urutan typecode yang naik secara ketat.
- **Penerima transparan yang bertentangan:** Sebuah UA dapat membawa P2PKH atau P2SH, tetapi **tidak pernah keduanya**.
- **Entri atau padding yang salah format:** Ketidaksesuaian prefix jaringan, payload yang terpotong, atau ketidaksesuaian panjang harus memicu penolakan segera.
- **Typecode yang tidak dikenali:** Konsumen harus mengabaikan item yang tidak dikenali kecuali item dalam rentang metadata MUST-understand (`0xE0`–`0xFC`), yang harus mereka tolak jika tidak dikenali. Dalam registry saat ini, `0xE0` dan `0xE1` ditetapkan sebagai tipe kedaluwarsa, sedangkan `0xE2`–`0xFC` belum ditetapkan. Secara independen, tolak alamat apa pun yang gagal memenuhi aturan validitas wajib di atas, termasuk persyaratan untuk penerima Sapling atau Orchard.

---

## Praktik terbaik untuk pengembang

- **Bandingkan penerima yang telah diurai, bukan string mentah.** Dekode alamat terlebih dahulu sebelum memeriksa kesetaraannya.
- **Gunakan library yang terawat untuk apa pun yang menangani dana.** Kompilasi crate Rust resmi (seperti `zcash_address`) ke WebAssembly daripada menerapkan decoder JavaScript kustom.
- **Berhati-hatilah dengan parser yang ditulis secara manual.** Jika Anda menulisnya untuk belajar, perlakukanlah sebagai proyek studi dan uji terhadap vektor resmi di bawah ini sebelum mempercayainya untuk hal apa pun.

---

## Spesifikasi resmi dan implementasi referensi

- **[ZIP-316: Alamat Terpadu dan Viewing Keys](https://zips.z.cash/zip-0316)**
- **crate [zcash_address (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/zcash_address)**
- **crate [f4jumble (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/f4jumble)**
- **Vektor pengujian resmi:**
  - Vektor pengujian [F4Jumble](https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/test_vectors.rs)
  - Vektor pengujian [Unified Address](https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs)

---

## Glosarium

| Istilah | Makna |
| :----------------------- | :-------------------------------------------------------------------- |
| **Unified Address (UA)** | String alamat tunggal yang menggabungkan beberapa pool penerima. |
| **Penerima** | Jenis tujuan pembayaran tertentu (transparan, Sapling, atau Orchard). |
| **Bech32m** | Skema pengodean teks yang digunakan untuk string UA. |
| **HRP** | Bagian yang dapat dibaca manusia atau awalan jaringan (`u` atau `utest`). |
| **F4Jumble** | Algoritma obfuskasi yang dapat dibalik untuk memastikan integritas alamat. |
| **Typecode** | Angka dalam setiap entri yang menentukan jenis penerima dalam payload. |
| **Malleability** | Modifikasi byte alamat tanpa izin tanpa terdeteksi. |

Lihat juga: [Viewing Keys](./Viewing_Keys.md)