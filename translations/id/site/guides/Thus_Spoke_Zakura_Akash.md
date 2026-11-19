# Thus Spoke Zakura di Akash (Regtest)

Jalankan stack **Thus Spoke Zakura v0.4.1** di Akash: Zakura Regtest, lightwalletd, dan **dashboard / HTTP API** dompet. Koin uji tidak memiliki nilai. Jangan kirim ZEC mainnet ke sini.

Template: [awesome-akash/thus-spoke-zakura](https://github.com/akash-network/awesome-akash/tree/master/thus-spoke-zakura)

Hulu: [zcashlabs/thus-spoke-zakura](https://github.com/zcashlabs/thus-spoke-zakura) tag **v0.4.1**

### Gambar

| Layanan | Gambar |
| --- | --- |
| Dashboard + API (`app`) | `ghcr.io/zcashlabs/thus-spoke-zakura-app:0.4.1` |
| lightwalletd | `ghcr.io/zcashlabs/thus-spoke-zakura-lightwalletd:0.4.1` |
| Zakura | `zakuracore/zakura:1.6.0` (pin dikompilasi ke dalam launcher 0.4.1) |

### Bootstrap mandiri

Saat pertama kali dijalankan, kontainer `app` menjalankan `ths-server init` pada volume persisten, lalu `ths-server serve`. Serve mencoba kembali hingga JSON-RPC Zakura dan lightwalletd aktif. Kamu tidak menjalankan `ths` pada provider; SDL adalah runtime-nya.

### Cara Akash memublikasikan port

SDL `port` / `as` adalah port **kontainer**. Aplikasi mendengarkan pada **8080** (`THS_LISTEN`); lightwalletd pada **9067**; RPC Zakura pada **18232** dan P2P pada **18233**. Di dalam deployment, layanan sudah menggunakan port tersebut (`http://zakura:18232`, `http://lightwalletd:9067`).

Port tersebut **bukan** port pada IP publik provider.

**Default (template ini):** tanpa IP khusus.

| Layanan | Port dengar kontainer | SDL `as` | Tampilan pada lease |
| --- | --- | --- | --- |
| `app` (dashboard + HTTP API) | 8080 | 80 (HTTP) | Hostname ingress, biasanya pada 80/443 — **buka URI ini di browser** |
| `lightwalletd` | 9067 | 9067 (TCP, global) | `host:&lt;random-high-port&gt;` |
| RPC `zakura` | 18232 | 18232 (TCP, global) | `host:&lt;random-high-port&gt;` |
| P2P `zakura` | 18233 | 18233 (TCP, global) | `host:&lt;random-high-port&gt;` |

Setelah lease siap, **Leases → URIs** menjadi sumber informasi utama. Buka URI **`app`** untuk dashboard (UI yang sama dengan yang dibuka `ths` secara lokal). Arahkan klien ringkas ke URI **lightwalletd** (`THS_LIGHTWALLETD_TLS=false`). Jangan masukkan `:8080`, `:80`, atau `:9067` pada IP provider kecuali lease IP khusus membuat port tersebut tersedia untuk publik.

**IP khusus** (`endpoints` / `kind: ip`) adalah tambahan berbayar dan **tidak** termasuk dalam template ini. IP khusus dapat menetapkan IP publik dan terkadang port `as`. Biarkan opsi ini nonaktif kecuali kamu membutuhkannya.

### Situs yang digunakan (pembayaran)

SDL-nya sama. Kedua UI web Akash berbeda dalam **cara pembayaran**.

| Situs | Pembayaran | Dompet |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Checkout web tradisional (kartu / metode pembayaran fiat yang ditawarkan Console) | Akun Console |
| [air.akash.network](https://air.akash.network) | Pembayaran native pada chain Akash (AKT / ACT) | **Keplr** |

Gunakan **Air** jika kamu ingin membayar dengan Keplr secara on-chain. Gunakan **Console** jika kamu ingin menggunakan alur pembayaran web konvensional.

### Deploy

**Pembayaran web (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

**Pembayaran native Akash dengan Keplr (Air)**

[Buka template ini di Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

Buat deployment dari template, terima bid, tunggu hingga log `app` menunjukkan `ths-server serve` tetap berjalan, lalu buka **URI `app`** untuk dashboard.

### Terkait

- [Zakura di Akash](/guides/akash-network-zakura) — Node validator Mainnet/Testnet
- [Zebra di Akash](/guides/akash-network-zebra)
- Buku: [github.com/zcashlabs/thus-spoke-zakura/tree/main/book](https://github.com/zcashlabs/thus-spoke-zakura/tree/main/book)
