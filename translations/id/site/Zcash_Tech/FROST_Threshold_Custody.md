<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# FROST & Threshold Custody untuk ZEC Terlindungi

> Untuk detail kriptografi lengkap dari protokol FROST, lihat halaman teknis [FROST](FROST.md).

Kustodial threshold dari FROST sering muncul dalam percakapan Zcash — ini merupakan track utama pada ZecHub Hackathon 2026 — tetapi konsepnya tidak selalu dijelaskan dengan bahasa yang sederhana. Halaman ini membahas apa artinya, kapan Anda benar-benar membutuhkannya, trade-off yang ada, dan alat mana yang mendukungnya saat ini.

---

## Ringkasan (TL;DR)

- **FROST** memungkinkan sekelompok pemegang kunci untuk secara kolektif mengontrol sebuah alamat Zcash terlindungi tanpa ada satu orang pun yang memegang private key secara penuh.
- Ambang batas **t-of-n** berarti: t orang harus menandatangani bersama untuk membelanjakan dana; jumlah t-1 atau kurang tidak dapat memindahkan dana tersebut sendirian.
- Transaksi terlihat seperti transaksi terlindungi lainnya — tidak ada jejak on-chain yang mengungkapkan bahwa penandatanganan ambang batas telah digunakan.
- Ini secara fundamental berbeda dari multisig transparan (yang bersifat publik di on-chain dan telah lama didukung oleh Zcash) — FROST bekerja di dalam pool terlindungi.
- Ini berguna untuk DAO, exchange, layanan kustodial, tabungan bersama, dan treasury tim — di mana pun titik kegagalan kunci tunggal tidak dapat diterima.

---

## Apa itu FROST dalam bahasa sederhana?

Bayangkan tiga mitra bisnis masing-masing memegang satu bagian dari sebuah kunci. Untuk melakukan pengeluaran dari dompet bersama mereka, dua dari tiga orang tersebut harus setuju dan menandatangani bersama. Transaksi yang dihasilkan akan terlihat identik dengan pengiriman individu biasa — tidak ada pengamat yang dapat mengetahui dari blockchain bahwa ada banyak orang yang terlibat.

FROST (**Flexible Round-Optimized Schnorr Threshold Signatures**) adalah protokol kriptografi yang memungkinkan hal ini terjadi untuk Zcash terlindungi. Protokol ini dibuat oleh Chelsea Komlo (University of Waterloo / Zcash Foundation) dan Ian Goldberg.

Properti utamanya:

- **Threshold**: hanya t-dari-n penandatangan yang perlu berpartisipasi (misalnya 2-dari-3, 3-dari-5)
- **Shielded**: bekerja di dalam pool privasi Orchard — jumlah, pengirim, dan penerima tetap privat
- **Indistinguishable**: tanda tangan akhir terlihat seperti Zcash transaksi terlindungi lainnya
- **Non-custodial**: tidak ada satu pihak pun yang pernah memegang kunci lengkap — bahkan koordinator sekalipun

---

## Kapan Anda harus menggunakan threshold custody?

Kustodial threshold masuk akal ketika **kehilangan satu kunci atau satu orang tidak boleh berarti kehilangan dana tersebut**.

| Situasi | Mengapa threshold custody membantu |
|-----------|----------------------------|
| **DAO atau treasury tim** | Tidak ada satu admin pun yang dapat menguras dana secara sepihak; memerlukan konsensus |
| **Exchange atau kustodian** | Mendistribusikan risiko kunci ke berbagai zona keamanan atau karyawan |
| **Penyimpanan dingin pribadi (dengan keluarga terpercaya)** | 2-dari-3 antara Anda + dua anggota keluarga — jika meninggal atau kehilangan akses, dana tidak akan hilang |
| **Escrow** | Pembeli, penjual, dan arbiter masing-masing memegang satu bagian; dana dilepaskan ketika dua pihak setuju |
| **Pencairan hibah bernilai tinggi** | Gaya ZCG: memerlukan beberapa penandatangan independen sebelum melakukan pembayaran |
| **Manajemen kunci developer** | Mencegah ancaman orang dalam — tidak ada satu engineer pun yang dapat menguras dana protokol |

Anda mungkin **tidak** memerlukan kustodial threshold untuk dompet pribadi yang Anda kendalikan sendiri, jumlah kecil, atau situasi di mana beban koordinasi tambahan lebih besar daripada pengurangan risiko.

---

## Bagaimana perbedaannya dengan multisig transparan?

Zcash telah lama mendukung multisig transparan — beberapa kunci diperlukan untuk membelanjakan dari alamat t. Namun, multisig transparan memiliki biaya privasi yang signifikan: **struktur multisig, semua kunci publik, dan semua penandatangan terlihat di blockchain**.

FROST mengatasi hal ini dengan beroperasi di dalam pool terlindungi:

| | Multisig transparan | FROST threshold (terlindungi) |
|--|---------------------|--------------------------|
| Pool | Transparan (publik) | Orchard (terlindungi) |
| Penandatangan terlihat on-chain | Ya — semua kunci publik terekspos | Tidak — tidak dapat dibedakan dari pengeluaran penandatangan tunggal |
| Jumlah terlihat | Ya | Tidak |
| Koordinasi diperlukan | Skrip on-chain | Putaran komunikasi off-chain |
| Privasi | Tidak ada | Privasi terlindungi penuh |

---

## Trade-off dan batasan

FROST sangat kuat, tetapi disertai dengan konsekuensi nyata yang harus Anda pahami sebelum menggunakannya:

### Overhead koordinasi
Penandatangan harus online secara bersamaan (atau hampir bersamaan) untuk menyelesaikan satu putaran penandatanganan. Jika t penandatangan Anda tersebar di berbagai zona waktu atau memiliki koneksi yang tidak stabil, proses pengeluaran memerlukan koordinasi yang tidak dibutuhkan oleh dompet solo.

### Tidak ada penandatanganan jika kuorum tidak tersedia
Jika pemegang kunci yang cukup tidak dapat diakses (sakit, bepergian, tidak responsif), dana untuk sementara tidak dapat dibelanjakan. Pilih ambang batas dan jumlah pembagi Anda dengan hati-hati — 2-dari-3 lebih tangguh daripada 2-dari-2.

### Upacara pembuatan kunci
Menyiapkan FROST memerlukan upacara distributed key generation (DKG) di mana seluruh n partisipan berada dalam jaringan secara bersamaan. Ini adalah peristiwa satu kali, tetapi harus dilakukan dengan hati-hati — jika partisipan terkompromi selama DKG, keamanan akan terancam.

### Tooling masih dalam tahap pematangan
FROST untuk Zcash terlindungi relatif baru. Standar IETF (draft-irtf-cfrg-frost) sudah matang, tetapi integrasi dompet masih terbatas. Harapkan adanya beberapa kekurangan dibandingkan dengan dompet single-key standar.

### Kompleksitas pemulihan
Kehilangan sebuah shard bukanlah akhir dari segalanya (itulah tujuan dari ambang batas), tetapi rencana pemulihan harus didokumentasikan sebelumnya. Siapa yang memegang cadangan? Apa yang terjadi jika dua shard hilang secara bersamaan?

---

## Siapa yang sedang membangun dengan FROST di Zcash?

### Zcash Foundation — frost.zfnd.org
Zcash Foundation telah merilis implementasi FROST yang berfungsi dan sebuah situs demo. Ini adalah implementasi referensi yang digunakan untuk pengujian dan pengembangan.

### Demo Ywallet FROST
Ywallet memiliki integrasi demo FROST awal, yang dijelaskan dalam panduan [Demo Ywallet FROST di ](/guides/Ywallet_FROST_Demo). Ywallet tidak lagi dikelola dan tidak akan diperbarui untuk Ironwood, jadi bacalah panduan tersebut sebagai latar belakang alih-alih sesuatu untuk dijalankan saat ini. Zkool, dari developer yang sama, adalah penerus yang dikelola dan mencantumkan FROST multisig di antara fitur-fiturnya.

### ZecHub Hackathon 2026 — Proyek Jalur FROST

Jalur FROST adalah yang paling kompetitif pada ZecHub Hackathon 2026. Proyek-proyek yang patut diperhatikan:

- **ZecVault** — escrow terlindungi 2-dari-3 yang diselesaikan di mainnet (ambang batas FROST)
- **Steward** — kustodial threshold untuk Zcash terlindungi dengan UX yang berfokus pada pemulihan

### Coinbase
Coinbase membangun implementasi FROST produksi untuk sistem penandatanganan threshold mereka (untuk Bitcoin), dengan modifikasi yang menghapus tahap preprocessing dan mendistribusikan peran aggregator di antara semua partisipan. Pengalaman mereka memvalidasi model keamanan FROST pada skala produksi.

---

## Bagaimana sesi penandatanganan bekerja (disederhanakan)

1. **Setup (sekali saja):** Semua $n$ partisipan menjalankan upacara distributed key generation (DKG). Setiap pihak mendapatkan shard privat; sebuah kunci publik bersama diturunkan. Tidak ada pihak yang mengetahui kunci privat secara penuh.

2. **Koordinator penanda tangan:** Saat pengeluaran diperlukan, seorang koordinator (yang dapat berupa salah satu penanda tangan) mengumpulkan komitmen dari t partisipan yang bersedia menandatangani.

3. **Ronde 1:** Setiap penanda tangan yang berpartisipasi menghasilkan sebuah nonce dan menyiarkan sebuah komitmen (publik, tidak sensitif).

4. **Putaran 2:** Setiap penanda tangan yang berpartisipasi menghitung tanda tangan parsial mereka menggunakan shard privat mereka dan menyiarkannya.

5. **Agregasi:** Koordinator menggabungkan $t$ tanda tangan parsial menjadi satu tanda tangan Schnorr akhir — yang tidak dapat dibedakan secara on-chain dari tanda tangan satu pihak.

6. **Broadcast:** Transaksi ini disiarkan ke jaringan Zcash seperti biasa.

Jika ada penanda tangan yang mengirimkan tanda tangan parsial yang buruk, protokol akan mengidentifikasi mereka dan membatalkan proses (mereka akan dikecualikan dari sesi mendatang). Koordinasi terjadi di luar rantai (off-chain) — blockchain hanya melihat transaksi akhir.

---

## Memilih parameter ambang batas Anda

| Setup | Ketahanan | Risiko |
|-------|-----------|------|
| 1-of-1 | Tidak ada ketahanan — single point of failure | Kehilangan key = kehilangan permanen |
| 2-of-2 | Harus memiliki kedua penandatangan — tidak ada fault tolerance | Satu tidak tersedia = dana membeku |
| 2-of-3 | Satu shard dapat hilang atau tidak tersedia | Margin keamanan lebih rendah daripada 3-of-5 |
| 3-of-5 | Dua shard dapat hilang; keamanan kuat | Overhead koordinasi lebih tinggi |
| 3-of-7 | Kelas institusi; menoleransi dua kegagalan | Biaya koordinasi tinggi |

Titik awal praktis bagi kebanyakan tim: **2-dari-3** (tangguh, koordinasi minimal) atau **3-dari-5** (institusional, keamanan lebih tinggi).

---

## Halaman Terkait

- [FROST — Pendalaman Teknis](FROST.md) — detail kriptografis dari protokol (DKG, ronde penandatanganan, security proofs)
- [Demo Panduan Ywallet FROST](/guides/Ywallet_FROST_Demo) — latar belakang, Ywallet tidak lagi dikelola
- [Viewing Keys](Viewing_Keys.md) — akses baca-saja ke alamat terlindungi (komplementer terhadap threshold custody)
- [Zcash Aset Terlindungi](Zcash_Shielded_Assets.md) — FROST juga merupakan infrastruktur kunci untuk penerbitan ZSA

## Sumber Daya

- Makalah penelitian [FROST (Komlo & Goldberg, 2020)](https://eprint.iacr.org/2020/852.pdf)
- Standar draf [ IETF FROST (draft-irtf-cfrg-frost)](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- Implementasi FROST [ Zcash Foundation ](https://frost.zfnd.org)
- [Chelsea Komlo — Apa itu Threshold Signatures? (Zcon3)](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase — Tanda Tangan Digital Ambang Batas](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST — Robust Async Schnorr Threshold Signatures (Blockstream)](https://eprint.iacr.org/2022/550.pdf)
