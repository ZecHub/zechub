---
published: 2025-08-02
---

<a href="https://github.com/Zechub/zechub/edit/main/site/Research/Namada_Privacy_and_Best_Practices.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

![Namada Logo](/content-images/nam-078c7b6883.webp)

# Praktik Terbaik Privasi Namada

> Panduan praktis dan dapat ditindaklanjuti untuk mencapai privasi maksimal pada Namada - dan memahami dengan tepat di mana perlindungannya berakhir.

**Privasi adalah hak mendasar.** Namada dibangun khusus untuk melindunginya melalui kriptografi zero-knowledge tingkat lanjut. Panduan ini merangkum praktik paling efektif yang digunakan oleh pengguna dan developer yang peduli terhadap privasi.

---

## Bagaimana Namada Melindungi Privasi Anda

Namada adalah blockchain berdaulat yang mengutamakan privasi yang menyembunyikan alamat dompet, jumlah transaksi, dan saldo menggunakan **zero-knowledge proofs (zk-SNARKs)**.

### Fitur Privasi Utama

- **Transaksi terlindungi** - Menyembunyikan pengirim, penerima, dan jumlah secara sepenuhnya.
- **Multi-Asset Shielded Pool (MASP)** - Transfer privat, swap, dan bridging di seluruh aset apa pun.
- **Privasi Cross-Chain** - Bridging terlindungi via IBC (dukungan Ethereum dan Solana akan segera hadir).
- **Imbalan Yield Terlindungi** - Dapatkan token NAM hanya dengan melakukan transaksi terlindungi.
- **Biaya Rendah** - Privasi yang kuat tanpa mengorbankan kegunaan.

---

## Batasan Penting

Bahkan privasi on-chain yang paling kuat sekalipun dapat dirusak oleh perilaku pengguna atau faktor off-chain.

<div class="border-l-4 border-yellow-400 bg-yellow-400/10 p-6 my-8 rounded-r-xl text-sm">

**Namada TIDAK melindungi dari:**

- Terhubung tanpa VPN atau Tor (alamat IP Anda terekspos)
- Menggunakan kembali alamat terlindungi secara berulang kali
- Melakukan transaksi transparan (tidak terlindungi)
- Menghubungkan alamat Namada Anda ke media sosial atau identitas dunia nyata
- Menggunakan exchange dengan KYC terpusat untuk deposit atau penarikan

</div>

---

## Praktik Terbaik untuk Privasi Maksimal

### 1. Prinsip Umum
- Gunakan **transaksi terlindungi** sebagai standar untuk setiap tindakan.
- Jangan pernah menggunakan kembali alamat terlindungi untuk tujuan yang berbeda.
- Hindari mencampur aktivitas terlindungi dan transparan dalam sesi yang sama.

### 2. Menjembatani Aset
- Gunakan alamat transparan khusus **hanya** untuk jembatan masuk (incoming bridges).
- Segera lindungi aset setelah melakukan bridging masuk.
- Minimalkan bridging keluar dari Namada jika memungkinkan.

### 3. MASP (Multi-Asset Shielded Pool)
- Simpan semua aset di dalam MASP secara default.
- Perlakukan saldo MASP Anda sebagai dompet pribadi utama Anda.

### 4. Viewing Key
- Bagikan viewing key **hanya** kepada pihak yang Anda percayai sepenuhnya.
- Jangan pernah mempublikasikan atau mengunggah viewing key secara publik.

### 5. Higienitas Transaksi
- Acak waktu dan jumlah di antara transaksi.
- Gabungkan beberapa transaksi jika memungkinkan.
- Hindari mengirim jumlah yang bulat atau sangat mudah diidentifikasi.

### 6. Keamanan Operasional
- Selalu gunakan **VPN** (idealnya Tor) saat berinteraksi dengan dompet atau dApps.
- Jangan pernah membagikan tangkapan layar yang berisi alamat atau saldo.
- Gunakan dompet terpisah untuk aktivitas yang berbeda (trading, donasi, penggunaan pribadi).

---

## Daftar Periksa Privasi yang Diperluas

1. **Selalu lindungi terlebih dahulu** - pindahkan aset ke MASP sebelum melakukan transaksi.
2. **Rotasi alamat terlindungi** secara berkala untuk berbagai kegunaan yang berbeda.
3. **Tarik langsung ke alamat terlindungi** dari exchange jika memungkinkan.
4. **Variasikan waktu transaksi** untuk memutus pola yang dapat diidentifikasi.
5. **Gunakan dompet hardware** untuk kepemilikan aset yang lebih besar.
6. **Jaga perangkat lunak tetap mutakhir** - selalu jalankan client Namada terbaru.
7. **Amankan perangkat Anda** dengan enkripsi yang kuat dan pengelola kata sandi.
8. **Berhati-hatilah secara ekstrem** terhadap kebocoran metadata dalam obrolan atau log publik.

---

## Berkontribusi

Memiliki praktik terbaik atau masukan tambahan?  
[Bergabunglah dalam diskusi di Discord](https://discord.gg/srC76aE6)

---
*Terakhir diperbarui: Maret 2026*