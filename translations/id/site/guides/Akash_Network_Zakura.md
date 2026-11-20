# Cara menjalankan Zakura di Akash Network

Panduan langkah demi langkah untuk menjalankan full node **Zakura** Zcash menggunakan template [awesome-akash zcash-zakura](https://github.com/akash-network/awesome-akash/tree/master/zcash-zakura).

Zakura adalah node Zcash yang kompatibel dengan konsensus (di-fork dari Zebra), dengan sinkronisasi lebih cepat, pruning bawaan, dan bootstrap snapshot. Template ini mengunci versi **`zakuracore/zakura:1.8.1`** (digest dikunci; jangan gunakan `:latest` atau `1.1.1`).

### Yang kamu dapatkan

- P2P Mainnet: kontainer **8233**, dipublikasikan secara global (lihat pemetaan port di bawah)
- Status ter-prune yang persisten (default 64 GiB) dengan bootstrap snapshot Valar saat pertama kali dijalankan
- Prometheus **9999** dan health **8080** (internal, tanpa URI publik)
- JSON-RPC **8232** internal untuk **lightwalletd** yang ditempatkan bersama; LWD mendengarkan di kontainer **9067** dan dipublikasikan secara global

Flag fitur di SDL (true/false): `ENABLE_METRICS`, `ENABLE_HEALTH`, `ENABLE_RPC`, `ENABLE_LIGHTWALLETD`. Autentikasi cookie dinonaktifkan saat lightwalletd aktif, karena lightwalletd tidak dapat membaca file cookie.

### Situs yang digunakan (pembayaran)

SDL-nya sama. Dua UI web Akash berbeda dalam **cara pembayaran**.

| Situs | Pembayaran | Dompet |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Checkout web tradisional (kartu / jalur fiat yang ditawarkan Console) | Akun Console |
| [air.akash.network](https://air.akash.network) | Pembayaran native di chain Akash (AKT / ACT) | **Keplr** |

Gunakan **Air** jika kamu ingin membayar secara on-chain dengan Keplr. Gunakan **Console** jika kamu ingin menggunakan alur pembayaran web konvensional. Jangan berharap ada penyelesaian native Keplr di Console.

### Deploy

**Pembayaran web (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

**Pembayaran native Akash dengan Keplr (Air)**

[Buka template ini di Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

1. Buka tautan yang sesuai di atas (Console atau Air).
2. Di Air, hubungkan **Keplr** dan pastikan kamu memiliki AKT/ACT untuk deposit dan lease. Di Console, selesaikan checkout web yang ditampilkan UI.
3. Muat `zcash-zakura/deploy.yaml` jika belum terisi.
4. Lakukan deposit, terima bid, lalu tunggu lease.
5. Log akan menampilkan unduhan snapshot (saat pertama kali dijalankan), lalu `zakurad start`.
6. Buka **Leases → URIs**. Gunakan host:port yang ditetapkan provider, bukan 8233 atau 9067 pada IP publik.

### Cara Akash memublikasikan port

Port SDL `port` / `as` (8233, 9067, 8232) adalah port **kontainer**. Zakura tetap mendengarkan di 8233; lightwalletd di 9067; RPC di 8232 untuk sidecar LWD (`zakura:8232`).

Port tersebut **bukan** port pada IP publik provider.

**Default (template ini):** tidak ada IP khusus. Setiap expose TCP `global: true` dipetakan ke **port tinggi acak** pada host provider bersama. Console/Air mencantumkannya sebagai URI lease, misalnya:

```
zakura-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Peer terhubung ke URI **8233** (`provider.example:31482`). Dompet ringkas menggunakan URI **9067** (TLS nonaktif kecuali kamu mengakhiri TLS sendiri). Atur `ZAKURA_NETWORK__EXTERNAL_ADDR` ke URI P2P yang dipetakan, bukan `:8233`.

Expose **internal** (`8232` RPC, metrik `9999`, health `8080`) tetap berada di jaringan deployment. Tidak ada URI publik.

**IP khusus** (`endpoints` / `kind: ip`) adalah tambahan berbayar dan **tidak** disertakan dalam template ini. IP tersebut dapat menetapkan IP publik dan terkadang port `as`. Tambahkan hanya jika kamu memerlukan `host:8233` yang stabil.

### Archive vs pruned

Default-nya **pruned** (~11 GiB snapshot, disk 64 GiB). Untuk riwayat lengkap, atur `SNAPSHOT_KIND=archive`, tingkatkan kapasitas disk menjadi 350 GiB+, dan atur `ZAKURA_STATE__STORAGE_MODE=archive`.

### Terkait

- [Zebra di Akash](/guides/akash-network-zebra) — Zcash Foundation `zebrad` (riwayat lengkap, tanpa snapshot)
- [Thus Spoke Zakura di Akash](/guides/thus-spoke-zakura-akash) — Dashboard regtest + app (v0.4.1)
- Zakura sumber: [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- Snapshot: [zakura.com/snapshots/](https://zakura.com/snapshots/)
