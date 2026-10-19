<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Anonimitas Mixnet Nym untuk Zcash

> Terakhir diverifikasi: 18 Oktober 2026

Pool terlindungi Zcash menyembunyikan jumlah, pengirim, dan penerima on-chain. Pool tersebut tidak menyembunyikan jalur jaringan antara dompet dan server lightwallet. Mixnet Nym menambahkan perlindungan lapisan jaringan yang belum tersedia tersebut. Per Oktober 2026, integrasinya telah aktif di dompet produksi (Zingo, Zkool).

Sumber: [Bagaimana Nym menambahkan anonimitas ke dompet Zcash](https://nym.com/blog/zcash-mixnet-anonymity) (Nym, 13 Oktober 2026).

## Yang dilindungi

Nym memecah paket transaksi (biasanya 7–15 KB data pengeluaran dan proof ZK) menjadi paket Sphinx dan merutekannya melalui mixnet. Ini:

- Menyembunyikan IP pengirim dari server lightwallet
- Mencampurkan lalu lintas dengan lalu lintas Nym lainnya
- Memberikan sekitar 17 bit entropi pada pengaturan default, dengan set anonimitas yang dikutip melebihi 100.000 pengguna

Pembayaran dan permintaan harga di Zingo v7 mengikuti jalur ini secara default.

## Yang tidak dilindungi

Sinkronisasi chain, kueri nullifier, pengambilan transaksi, dan lalu lintas mempool saat ini menggunakan koneksi indexer normal. Metadata tingkat perangkat atau aplikasi di luar paket campuran juga berada di luar cakupan Nym.

Jika model ancamanmu mengharuskan penyembunyian lalu lintas sinkronisasi, gabungkan dompet mixnet native dengan NymVPN tingkat sistem. Lihat [Nym VPN](/guides/nym-vpn).

## Dompet

| Dompet | Status | Catatan |
| --- | --- | --- |
| Zingo v7 | Aktif, default | `makers run-cli` menyertakan `nym-proxy`. Sesi dimulai secara offline; `--online`, `--remember-online`, atau `--server` memberikan persetujuan. |
| Zkool | Aktif | Integrasi mixnet native. |
| Lainnya | Melalui NymVPN | Rutekan dompet melalui mode Mixnet tingkat sistem. |

Detail penyiapan untuk jalur tingkat dompet tersedia di [Rutekan Lalu Lintas Dompet Zcash melalui Mixnet Nym](/guides/nym-mixnet-wallet-setup).

## Kompromi

Broadcast yang dirutekan melalui Nym sekitar 12,5× lebih lambat daripada clearnet (~3,4 dtk). Tor lebih cepat (~3,7×), tetapi menggunakan stream FIFO tanpa pencampuran, sehingga lawan global masih dapat melakukan korelasi. Memperbesar basis pengguna Nym bersama meningkatkan anonimitas lebih efektif daripada menambahkan penundaan ekstra.

## Kebersihan lapisan aplikasi: nym-swizzle-zcash

Perlindungan lapisan jaringan tidak cukup. Bahkan dengan mixnet atau VPN yang sempurna, server lightwallet masih dapat menautkan sesi dengan mengamati pola lapisan aplikasi:

- Rantai titik lanjut: client melanjutkan sinkronisasi tepat dari `previous end + 1`, sehingga server dapat merangkai sesi hanya berdasarkan tinggi blok.
- Sinkronisasi lalu kirim: dompet melakukan sinkronisasi tepat sebelum broadcast, sehingga server dapat mengatribusikan transaksi ke sesi sinkronisasi sebelumnya.

Crate [`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) mengimplementasikan kebijakan kebersihan khusus Zcash yang menangani keduanya. Crate ini mengemas primitive `nym-swizzle` umum menjadi kebijakan yang memahami chain untuk light client.

**Rentang sinkronisasi terkuantisasi.** Permintaan diperluas ke grid seluruh jaringan dengan sel berukuran satu hari. Awalnya dibulatkan ke bawah dan akhirnya dibulatkan ke atas. Rentangnya deterministik, menaik, dan tidak tumpang tindih. Pemeriksaan reorg tetap berada dalam rentang yang diperluas agar titik lanjut yang tepat tidak terungkap. Anonimitas berasal dari tabrakan (banyak dompet mengirimkan batas yang sama), bukan dari noise.

**Broadcast yang dipisahkan.** Pengiriman transaksi ditunda dengan distribusi eksponensial (rata-rata 144 blok ≈ 3 jam, batas 576 blok ≈ 12 jam) yang sesuai dengan penjadwalan transfer ZIP 318. Penundaan melebihi masa hidup proses pada umumnya, sehingga jadwal disimpan secara persisten. Transaksi hanya dibuat pada waktu eksekusi terhadap tip yang baru. Sinkronisasi dan broadcast sebaiknya menggunakan server yang berbeda.

Crate ini mengekspos trait `BlockSource` dan `TxBroadcaster`, dikompilasi untuk `wasm32-unknown-unknown`, dan tidak memiliki stack jaringan sendiri. Lihat dokumentasi [Nym](https://nym.com/docs/developers/swizzle/zcash) untuk API lengkap dan contoh.

## Sumber

- [Bagaimana Nym menambahkan anonimitas ke dompet Zcash](https://nym.com/blog/zcash-mixnet-anonymity) — Nym, 13 Oktober 2026
- [nym-swizzle-zcash: Kebijakan Kebersihan untuk Light Client Zcash](https://nym.com/docs/developers/swizzle/zcash) — Dokumentasi Nym
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [Rutekan Lalu Lintas Dompet Zcash melalui Mixnet Nym](/guides/nym-mixnet-wallet-setup) — ZecHub
- [Nym VPN](/guides/nym-vpn) — ZecHub
