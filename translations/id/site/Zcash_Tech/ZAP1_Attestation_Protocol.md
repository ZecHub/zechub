# Protokol Atestasi ZAP1

ZAP1 adalah protokol atestasi sumber terbuka untuk Zcash. Protokol ini menulis peristiwa siklus hidup terstruktur ke dalam pohon Merkle BLAKE2b dan menambatkan root pohon tersebut secara on-chain melalui memo terlindungi Orchard. Proof dapat diverifikasi secara publik. Data peristiwa tetap terjaga privasinya.

## Cara kerjanya

Operator mendaftarkan jenis event (deployment, pembayaran, transfer, dll.) dan mengirimkannya ke instansi ZAP1. Setiap event menghasilkan leaf hash menggunakan BLAKE2b-256 yang terpisah secara domain. Leaf terakumulasi dalam sebuah Merkle tree. Ketika ambang batas tercapai, root tree tersebut dikodekan sebagai memo ZAP1:09 dan ditambatkan ke Zcash dalam sebuah transaksi terlindungi.

Siapa pun yang memiliki leaf hash dapat memverifikasi jalur lengkap dari leaf ke root hingga anchor on-chain, tanpa perlu mempercayai operator.

## Properti utama

- **Agnostik terhadap aplikasi**: setiap operator Zcash dapat menentukan jenis event dan string personalisasi mereka sendiri
- **Menjaga privasi**: payload event di-hash sebelum dilakukan anchoring. Hanya hash yang masuk ke on-chain.
- **Dapat diverifikasi secara independen**: verifikasi hanya memerlukan bundle proof dan akses ke chain. Tidak memerlukan kepercayaan pada operator.
- **Kompatibel dengan ZIP 302**: ZAP1 sedang menuju ke arah ZIP 302 partType untuk payload atestasi

## Apa yang tersedia

- Implementasi referensi (Rust, lisensi MIT)
- SDK Verifikasi di crates.io (Rust + 83KB WASM)
- SDK JavaScript di npm
- Decoder memo universal (mengidentifikasi ZAP1, ZIP 302 TVLV, teks, biner, dan memo kosong)
- Kit kepatuhan dengan 29 pemeriksaan API dan 14 pemeriksaan protokol
- Desain penandatanganan ambang batas 2-dari-3 FROST untuk penyiaran anchor multi-pihak
- Draft PR #1243 ZIP sedang dalam peninjauan
- 4 anchor mainnet dengan 14 leaves per Maret 2026

## Arsitektur

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

Setiap operator menjalankan instansi ZAP1 mereka sendiri dengan kunci, pohon Merkle, dan anchor milik mereka sendiri. Tidak ada status bersama antar operator.

## Tempat untuk mempelajari lebih lanjut

- Sumber: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- SDK Verifikasi: [crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- Decoder memo: [crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- Spesifikasi protokol: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- ZIP draf: [PR #1243](https://github.com/zcash/zips/pull/1243)
- API Live: [pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- Panduan operator: [OPERATOR_GUIDE.md](https://github.com/Frontier-Compute/zap1/blob/main/OPERATOR_GUIDE.md)