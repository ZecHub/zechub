<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Outgoing_Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Key Keluar (OVK)

Viewing key keluar (OVK) adalah nilai 32 byte yang hanya digunakan untuk mengenkripsi ciphertext *keluar* dari output terlindungi. Ini memungkinkan suatu pihak memulihkan plaintext note yang dikirimkan (alamat penerima, nilai, dan memo) tanpa kemampuan untuk membelanjakan dana atau melihat note masuk.

Penerima selalu mendekripsi note masuk dengan viewing key masuk mereka sendiri. Pilihan OVK tidak mengubah apa yang dilihat penerima. Tidak ada encoding standar untuk OVK mentah; OVK tersebut hanyalah 32 byte.

## TL;DR

- OVK hanya mengendalikan siapa yang dapat memulihkan plaintext keluar dari pembayaran terlindungi.
- Dompet memilih di antara tiga kebijakan: **Pengirim** (pemulihan normal dengan UFVK akun), **Kustom** (pemulihan dengan key yang Anda sediakan), atau **Discard** (tidak seorang pun dapat memulihkan plaintext keluar dari chain).
- Bahkan dengan Discard atau OVK kustom, pemegang UFVK tetap melihat note mana yang dibelanjakan dan dapat menghitung jumlah bersih yang keluar dari akun.
- Satu-satunya cara andal untuk menjaga jumlah tetap tidak terlihat oleh UFVK tertentu adalah memastikan note tersebut tidak pernah menjadi milik akun itu (akun terpisah atau dompet terpisah).
- Tiga kebijakan tersebut sudah ada di `zcash_client_backend`; hampir setiap dompet saat ini hanya menggunakan kebijakan Pengirim bawaan.

---

## Tiga kebijakan

Dompet yang dibangun di atas `zcash_client_backend` memilih `OvkPolicy` ketika membangun transaksi:

| Kebijakan | Ciphertext keluar | Siapa yang nantinya dapat memulihkan plaintext keluar |
|--------|----------------------|----------------------------------------------|
| **Pengirim** (bawaan) | Dienkripsi ke OVK normal akun | Unified Full Viewing Key dari akun pengirim |
| **Kustom** | Dienkripsi ke key yang Anda sediakan | Siapa pun yang memegang key yang disediakan |
| **Discard** | Tidak ada OVK yang digunakan (`ovk = ⊥`) | Tidak seorang pun (bahkan pengirim) |

Sebuah constructor praktis membuat kebijakan `Custom` dari satu nilai 32 byte sehingga OVK eksternal dan internal merupakan key yang sama.

![Outgoing Viewing Key policy comparison](/content-images/ovk-policies.webp)

Lihat dokumentasi [OvkPolicy](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html) dan [ZIP 310](https://zips.z.cash/zip-0310).

## Kegunaan setiap kebijakan

**Pengirim** adalah perilaku dompet biasa. Setelah transaksi ditambang, siapa pun yang memegang UFVK akun dapat mendekripsi ciphertext keluar dan memulihkan alamat penerima, jumlah, serta memo.

**Kustom** memungkinkan Anda memberikan pihak ketiga (auditor, pemroses pembayaran, sistem tanda terima, atau perangkat terpisah) kemampuan untuk mendekripsi pembayaran keluar tertentu tanpa memberi mereka viewing key lengkap. Anda juga dapat menggunakan key ephemeral yang dibuang setelah transaksi, atau menggunakan key berbeda untuk rekanan berbeda sehingga tidak ada satu key pun yang melihat setiap pembayaran keluar.

**Discard** berarti dompet pengirim tidak dapat memulihkan plaintext keluar dari chain. Ini berguna ketika Anda ingin meminimalkan apa yang dapat dipulihkan jika UFVK kemudian disusupi, atau ketika Anda sengaja tidak menginginkan catatan on-chain yang dapat dibuka oleh OVK akun.

## Yang masih dilihat oleh pemegang UFVK

Bahkan ketika Discard atau OVK kustom digunakan, pemegang UFVK akun masih dapat:

- Mendeteksi note akun mana yang dibelanjakan (melalui nullifier).
- Mengetahui nilai note input tersebut.
- Memulihkan note kembalian apa pun (note tersebut dienkripsi ke viewing key masuk internal, bukan ke OVK).
- Oleh karena itu menghitung jumlah bersih yang keluar dari akun.

Yang tidak terlihat adalah alamat penerima individual, pembagian jumlah, dan memo. Dokumentasi `WalletWrite` memperingatkan bahwa data tentang transaksi yang dibuat di bawah Discard (atau OVK kustom acak) tidak dapat dipulihkan dari data chain jika catatan lokal hilang.

## Menjaga jumlah agar tidak terlihat oleh UFVK tertentu

`OvkPolicy` hanya mengendalikan pemulihan plaintext keluar. Ini tidak menyembunyikan pembelanjaan atau jumlah bersih dari UFVK akun itu sendiri.

Satu-satunya cara andal untuk menjaga jumlah agar tidak terlihat oleh UFVK tertentu adalah memastikan note yang membawa jumlah tersebut tidak pernah menjadi milik akun yang dikendalikan UFVK tersebut:

1. **Akun ZIP-32 terpisah** (seed yang sama) — Buat indeks akun baru, pindahkan dana ke sana, dan jangan pernah mengekspor UFVK akun tersebut. UFVK akun asli hanya melihat transfer ke akun baru.
2. **Dompet yang sepenuhnya terpisah** (seed berbeda) — Danai dompet baru, belanjakan dari dompet tersebut, lalu buang seed atau UFVK-nya. Dompet asli hanya mencatat transfer pendanaan.
3. **Dompet sekali pakai ephemeral** — Sama seperti di atas, tetapi perlakukan dompet pembelanjaan sebagai dompet sekali pakai.

UFVK berlaku per akun. Note yang tidak pernah berada di akun tersebut tidak pernah muncul dalam saldo atau total arus keluarnya.

## Cara dompet menggunakan kebijakan saat ini

Hampir setiap dompet produksi hanya menggunakan kebijakan **Pengirim** bawaan, sehingga riwayat keluar lengkap dapat dipulihkan dari UFVK. Dua kebijakan lainnya ada di library tetapi jarang ditampilkan dalam antarmuka pengguna.

Pilihan masa depan yang mungkin mencakup:

- Flag per transaksi yang memungkinkan pengguna memilih Kustom atau Discard untuk satu pembayaran.
- Mode Discard permanen (pemulihan seed kemudian hanya akan menampilkan arus keluar bersih).
- OVK kustom untuk pengungkapan selektif pembayaran individual (lebih ringan daripada pengungkapan pembayaran [ZIP 311](https://zips.z.cash/zip-0311) lengkap).
- Penggunaan berkelanjutan pemisahan akun atau dompet untuk isolasi yang lebih kuat.

## Sumber daya

- [ZIP 310: Properti Keamanan Viewing Key Sapling](https://zips.z.cash/zip-0310)
- [ZIP 316: Alamat Unified dan Viewing Key Unified](https://zips.z.cash/zip-0316)
- [ZIP 315: Praktik Terbaik untuk Implementasi Dompet](https://zips.z.cash/zip-0315)
- [OvkPolicy di zcash_client_backend](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html)
- [librustzcash](https://github.com/zcash/librustzcash)
- [zingolib](https://github.com/zingolabs/zingolib)

## Halaman terkait

- [Viewing Key](/zcash-tech/viewing-keys)
- [Pengungkapan Pembayaran](/zcash-tech/payment-disclosures)
- [Alamat Unified](/zcash-tech/unified-addresses)
- [Apa yang Dapat Dilihat oleh Block Explorer](/zcash-tech/what-a-block-explorer-can-see)
