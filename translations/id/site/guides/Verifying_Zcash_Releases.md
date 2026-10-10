<a href="https://github.com/zechub/zechub/edit/main/site/guides/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Memverifikasi Rilis Zcash

## Ringkasan Singkat

- Mengunduh biner Zcash tidaklah sama dengan mendapatkan biner yang dipublikasikan oleh proyek tersebut. Verifikasi adalah cara kamu membedakannya.
- Sebuah checksum membuktikan bahwa file telah sampai dengan utuh. Sebuah **signature** membuktikan siapa yang menghasilkannya. Kamu membutuhkan keduanya, karena checksum saja hanya memberikan sedikit bukti.
- Zebra mempublikasikan sebuah file `SHA256SUMS` ditambah bundle **Sigstore** yang menghubungkan rilis tersebut ke workflow GitHub Actions tertentu, tag, dan commit — tanpa perlu manajemen key.
- Zallet mempublikasikan signature **GPG** terpisah (`.asc`) bersama dengan SLSA provenance dan SBOM.
- Signing key Zcash telah dirotasi pada tahun 2026 dari Electric Coin Company ke Zcash Open Development Lab (ZODL). Jika kamu memverifikasi rilis lama, kamu memerlukan key baru — dan pernyataan serah terima ditandatangani oleh kedua key tersebut, sehingga kamu dapat memverifikasi rotasi itu sendiri.
- `gpg` melaporkan **subkey** yang menandatangani sebuah file, bukan primary key yang disebutkan dalam pengumuman. Fingerprint yang terlihat salah biasanya adalah subkey, bukan serangan.
- Jika verifikasi gagal, jangan jalankan biner tersebut.

*Diverifikasi terhadap Zebra `v6.3.0` dan Zallet `v0.1.0-beta.2` pada 2026-08-18.*

## Mengapa ini lebih penting bagi Zcash

Biner dompet yang telah dimodifikasi dapat membocorkan spending key atau viewing key. Berbeda dengan kata sandi yang terkompromi, kehilangan tersebut bersifat permanen: tidak ada rollback, tidak ada chargeback, dan tidak ada meja bantuan. Transaksi terlindungi melindungi apa yang terjadi *on chain* — mereka tidak memberikan perlindungan sama sekali ketika perangkat lunak yang kamu jalankan telah diganti sebelum sampai ke tanganmu.

Ini adalah salah satu dari sedikit jalur serangan di mana jaminan privasi dari protokol sama sekali tidak relevan. Verifikasi adalah lapisan yang menutupinya.

## Model ancaman — apa yang dapat dan tidak dapat dideteksi oleh verifikasi

**Catches:**

- Mirror yang telah dimanipulasi atau file yang telah diubah yang disajikan dari tempat lain selain halaman rilis proyek.
- Swap man-in-the-middle selama pengunduhan.
- CDN yang terkompromi atau host distribusi yang dibajak.
- Kerusakan tidak sengaja saat transit.

**Tidak menangkap:**

- Seorang pemelihara yang menandatangani kode berbahaya. Tanda tangan tersebut akan terverifikasi dengan benar; hal itu membuktikan asal-usul, bukan niat.
- Host build yang telah dikompromikan yang menghasilkan artefak bertanda tangan tetapi berbahaya. Inilah alasan mengapa build yang dapat direproduksi dan atestasi provenance ada untuk mempersempit kemungkinan ini.
- Kunci yang kamu dapatkan dari sumber kompromi yang sama dengan biner tersebut. Jika penyerang mengendalikan file sekaligus kunci yang kamu gunakan untuk memeriksanya, verifikasi tidak akan memberitahumu apa pun.

Poin terakhir itulah yang paling sering dilewatkan oleh sebagian besar panduan. **Dari mana kamu mendapatkan kunci tersebut sama pentingnya dengan menjalankan perintahnya.**

---

## Bagian 1 — Zebra: checksum dan Sigstore

Zebra merilis aset-aset ini untuk setiap rilis:

| Aset | Tujuan |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | arsip biner |
| `zebrad-<version>-<arch>.tar.gz.sha256` | checksum per-file |
| `SHA256SUMS` | checksum untuk semua arsitektur |
| `SHA256SUMS.sigstore.json` | penandatanganan bundle Sigstore `SHA256SUMS` |

### Langkah 1 — Unduh

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### Langkah 2 — Periksa checksum

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

Please provide the Markdown fragment you would like me to translate. I am ready to begin the localization process following all your specified rules and terminology.

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

`--ignore-missing` diperlukan di sini karena `SHA256SUMS` mencakup setiap arsitektur dan kamu hanya mengunduh satu. Tanpanya, `sha256sum` melaporkan arsip aarch64 yang tidak ada sebagai kegagalan dan kamu mungkin salah membaca hasil sukses sebagai kegagalan.

Varian per-file juga berfungsi:

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**Langkah ini saja tidak cukup.** Kamu mengunduh checksum dari tempat yang sama dengan file biner tersebut. Siapa pun yang bisa mengganti salah satunya juga bisa mengganti yang lainnya. Checksum membuktikan integritas; langkah berikutnya membuktikan asal-usulnya.

### Langkah 2b — Pemeriksaan yang sama di Windows

PowerShell tidak memiliki mode verifikasi `-c`, jadi kamu harus membandingkannya secara manual:

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

Please provide the Markdown fragment you would like me to translate. I am ready to begin the localization process according to your instructions.

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

Bandingkan hal tersebut dengan hasil Linux sebelumnya di halaman ini:

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**Nilai identik.** Hex tidak memiliki huruf besar/kecil (case), dan ini adalah alarm palsu yang paling umum terjadi di Windows.

Dua jebakan khusus Windows lainnya:

- **Tidak ada kode keluar untuk diperiksa.** Di Linux, `sha256sum -c` mengembalikan 1 saat terjadi kegagalan dan sebuah skrip dapat menindaklanjutinya. `Get-FileHash` hanya mencetak sebuah hash — perbandingannya adalah tugasmu untuk melakukannya, dan tugasmu pula jika melakukan kesalahan karena hanya membacanya sekilas.
- **Membaca 64 karakter hex dengan mata tidaklah andal.** Biarkan shell yang melakukannya:

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **Di macOS:** alur kerjanya sama, tetapi BSD userland menyertakan `shasum` alih-alih `sha256sum` — gunakan `shasum -a 256 -c --ignore-missing SHA256SUMS`. Penulis halaman ini tidak memiliki mesin macOS yang tersedia, sehingga perintah tersebut didokumentasikan dari alat bantu Apple dan bukan dijalankan secara langsung. Jika kamu melakukan verifikasi di macOS, silakan buka PR untuk mengonfirmasi atau memperbaikinya.

### Langkah 3 — Verifikasi bundle Sigstore

Sigstore menggantikan kunci penandatanganan berumur panjang dengan sertifikat berumur pendek yang terikat pada identitas CI, dan dicatat dalam log transparansi publik. Tidak ada seorang pun yang memegang kunci rilis yang dapat dicuri.

Jalur yang mudah menggunakan `cosign`:

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

Kedua flag `--certificate-*` adalah inti utamanya. **Tanpa flag tersebut, kamu hanya mengonfirmasi bahwa seseorang, di suatu tempat, telah menandatangani file tersebut.** Dengan flag tersebut, kamu mengonfirmasi bahwa file itu ditandatangani oleh sebuah workflow di repositori Zebra, yang diautentikasi oleh issuer OIDC milik GitHub.

> ⚠️ **Versi sangat berpengaruh.** Build cosign versi lama tidak dapat membaca format bundle Sigstore saat ini. Menjalankan perintah di atas dengan cosign `v2.4.1` akan menghasilkan:
>
>```
> Error: bundle does not contain cert for verification, please provide public key
> ```>
> Bundle tersebut *memang* berisi sertifikat — sertifikat itu berada di bawah `verificationMaterial.certificate.rawBytes`, yang tidak dicari oleh rilis lama. Ini adalah batasan client, bukan rilis yang rusak. Jika kamu mengalaminya, tingkatkan cosign daripada menyimpulkan bahwa unduhan tersebut buruk. Cosign yang dikemas dalam distribusi sering kali tertinggal jauh dari upstream.

Dua langkah berikutnya menunjukkan cara memverifikasi bundle yang sama secara manual, yang sangat penting untuk dipahami terlepas dari apa pun — dan merupakan solusi cadangan yang dapat digunakan saat build cosign kamu tidak berfungsi sebagaimana mestinya.

### Langkah 4 — Baca apa yang sebenarnya dinyatakan oleh sertifikat tersebut

Kamu dapat memeriksa bundle tersebut tanpa `cosign`, yang sangat berguna untuk memahami apa yang kamu percayai. Ekstrak sertifikatnya:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('cert.der','wb').write(base64.b64decode(d['verificationMaterial']['certificate']['rawBytes']))"

openssl x509 -in cert.der -inform DER -noout -issuer -ext subjectAltName
```

Output asli untuk Zebra v6.3.0:

```
issuer=O = sigstore.dev, CN = sigstore-intermediate
X509v3 Subject Alternative Name: critical
    URI:https://github.com/ZcashFoundation/zebra/.github/workflows/zfnd-release-binaries.yml@refs/tags/v6.3.0
```

Subject Alternative Name adalah identitasnya. Ini menamai repositori, file workflow yang tepat, dan tag tersebut. Sigstore menyematkan metadata build lebih lanjut dalam ekstensi kustom:

| Field | Nilai untuk v6.3.0 |
|---|---|
| OIDC issuer | `https://token.actions.githubusercontent.com` |
| Source repository | `https://github.com/ZcashFoundation/zebra` |
| Build commit | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| Runner environment | `github-hosted` |
| Workflow run | `.../actions/runs/31424510487/attempts/1` |
| Repository visibility | `public` |

Setiap poin ini dapat diperiksa. Hash commit harus sesuai dengan tag di repositori; jalannya workflow harus ada dan bersifat publik.

### Langkah 5 — Verifikasi tanda tangan secara kriptografis

Kamu dapat mengonfirmasi tanda tangan tersebut secara langsung dengan OpenSSL:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('sig.bin','wb').write(base64.b64decode(d['messageSignature']['signature']))"

openssl x509 -in cert.der -inform DER -pubkey -noout > pub.pem
openssl dgst -sha256 -verify pub.pem -signature sig.bin SHA256SUMS
```

Please provide the Markdown fragment you would like me to translate. I am ready to begin the localization process according to your specific rules and terminology.

```
Verified OK
```

Bundle tersebut juga mencatat digest yang telah ditandatanganinya. Pastikan hal itu sesuai dengan file lokal kamu:

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### Langkah 6 — Entri log transparansi

Bundle tersebut membawa entri Rekor yang membuktikan bahwa tanda tangan telah dipublikasikan ke log publik yang bersifat append-only:

| Field | Value |
|---|---|
| Rekor log index | `2412071838` |
| Tipe entri | `hashedrekord v0.0.1` |
| Terintegrasi pada | 2026-08-10 19:43:09 UTC |

Inilah yang membuat penyalahgunaan kunci secara diam-diam dapat terdeteksi. Sebuah tanda tangan yang tidak pernah muncul dalam log, atau muncul pada waktu yang tidak masuk akal, adalah sinyal yang layak untuk ditindaklanjuti. Bandingkan waktu integrasi dengan pengumuman rilis.

> **Catatan tentang path OpenSSL:** ini memverifikasi tanda tangan terhadap kunci publik sertifikat, tetapi tidak secara mandiri memvalidasi rantai sertifikat ke root Sigstore atau memeriksa inclusion proof dari entri log tersebut. `cosign verify-blob` melakukan ketiga hal tersebut. Gunakan OpenSSL untuk memahami mekanismenya; gunakan `cosign` sebagai pemeriksaan aktual kamu.

---

## Bagian 2 — Zallet: Tanda tangan GPG

Zallet menerbitkan kumpulan aset yang berbeda:

| Aset | Tujuan |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | arsip biner |
| `.tar.gz.asc` | tanda tangan GPG terpisah |
| `.tar.gz.intoto.jsonl` | atestasi provenance SLSA |
| `.tar.gz.provenance.json` | metadata provenance |
| `.tar.gz.sbom.spdx` | software bill of materials |

### Langkah 1 — Identifikasi kunci penandatanganan sebelum kamu mencarinya

Jalankan verifikasi *terlebih dahulu*, tanpa ada kunci yang diimpor:

```bash
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Please provide the Markdown fragment you would like me to translate. I am ready to begin the localization process according to your specific rules and terminology.

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Can't check signature: No public key
```

Ini bukanlah sebuah kegagalan. Ini memberitahumu bahwa sebuah tanda tangan ada dan menyebutkan dengan tepat kunci mana yang kamu butuhkan, **sebelum** kamu mulai mencari. Perhatikan fingerprint dan penerbitnya, lalu dapatkan kunci tersebut dari sumber yang independen dari unduhan tersebut.

> `gpg` mencetak stempel waktu dalam zona waktu lokal kamu. Output di atas menunjukkan `WAT` (UTC+1); tanda tangan yang sama terbaca sebagai `18:18:44 UTC` di tempat lain. Waktu yang sama. Jangan menganggap perbedaan zona waktu sebagai ketidakcocokan.

### Langkah 2 — Impor kunci dan verifikasi

```bash
curl -sL https://apt.z.cash/zodl.asc -o zodl.asc
gpg --import zodl.asc
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Please provide the Markdown fragment you would like me to translate. I am ready to begin the localization process following all your specified rules and terminology.

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Good signature from "Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>" [unknown]
gpg: WARNING: The key's User ID is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 0338 34DD 49DE CF9D BB99  34BC 6C93 CA8E 58E2 6AB1
     Subkey fingerprint: 1FE9 9324 758F 2967 18B4  5706 7F4B BBBA 23F0 617F
```

`Good signature` adalah apa yang kamu inginkan. Ada dua hal dalam output tersebut yang membingungkan orang, dan keduanya adalah hal yang wajar.

### Mengapa sidik jari tidak cocok dengan pengumuman

Pernyataan transisi kunci ZODL menyebutkan sidik jari `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`. Namun, `gpg --verify` melaporkan `1FE9 9324 …  23F0 617F`. Hal itu terlihat seperti ketidakcocokan, padahal sebenarnya tidak.

`gpg` melaporkan **subkey** yang membuat tanda tangan tersebut. Pengumuman tersebut menyebutkan **primary key**. Verifikasi sendiri hubungannya:

```bash
gpg --list-keys --with-subkey-fingerprints sysadmin@zodl.com
```

Please provide the Markdown fragment you would like me to translate. I am ready to begin the localization process following all your specified rules and terminology.

```
pub   rsa4096 2026-03-23 [SCEA]
      033834DD49DECF9DBB9934BC6C93CA8E58E26AB1
uid           [ unknown] Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>
sub   rsa4096 2026-03-23 [SEA]
      1FE99324758F296718B457067F4BBBBA23F0617F
```

Baris `sub` adalah subkey penandatanganan; baris `pub` adalah yang utama. Satu identitas, satu paket kunci. Inilah sebabnya mengapa output verifikasi mencetak **kedua** sidik jari — bandingkan yang *utama* dengan pengumuman apa pun yang dipublikasikan, dan anggap baris subkey sebagai pemberitahuan bagian mana dari kunci tersebut yang melakukan pekerjaan tersebut.

Pemisahan kunci dengan cara ini dilakukan secara sengaja: sebuah subkey penandatanganan dapat diputar atau dicabut tanpa harus membuang identitas utama beserta kepercayaan yang telah terakumulasi.

### Apa arti peringatan `[unknown]`

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

Ini **bukan** masalah pada tanda tangan tersebut. Tanda tangan tersebut valid secara kriptografis — itulah yang dinyatakan oleh `Good signature`. Peringatan tersebut mengatakan hal yang berbeda: kamu belum memberi tahu GnuPG lokal milikmu bahwa kamu percaya kunci ini milik pihak yang diklaimnya.

GnuPG memisahkan dua pertanyaan:

1. **Apakah kunci ini menandatangani file ini?** — dijawab oleh `Good signature`. Bersifat kriptografis, tanpa penilaian manusia.
2. **Apakah kunci ini milik ZODL?** — sama sekali tidak dijawab oleh kriptografi. Kamu memastikannya dengan memeriksa fingerprint terhadap sumber independen.

Kamu akan melihat peringatan ini di hampir setiap verifikasi kecuali jika kamu menandatangani kunci tersebut secara eksplisit di perangkat lokal. Jangan menganggapnya sebagai kegagalan. **Harus** anggap hilangnya `Good signature` sebagai kegagalan.

### Langkah 3 — Verifikasi transisi kunci itu sendiri

Penandatanganan rilis Zcash dipindahkan dari Electric Coin Company ke Zcash Open Development Lab pada tahun 2026, setelah ZODL dibentuk pada Januari 2026 oleh tim engineering dan produk ECC sebelumnya.

| | Kunci lama | Kunci baru |
|---|---|---|
| Fingerprint | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Signing Key (ECC) `<sysadmin@z.cash>` | Zcash Open Development Lab (ZODL) `<sysadmin@zodl.com>` |
| Tipe | RSA 3072-bit, dibuat 2023-06-19 | RSA 4096-bit, dibuat 2026-03-23, kedaluwarsa 2028-03-22 |
| Dipublikasikan di | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

Lini masa yang dipublikasikan: kunci baru dibuat pada 2026-03-23, diumumkan pada 2026-03-27, penandatanganan eksklusif mulai 2026-04-23, pencabutan kunci lama ECC direncanakan pada 2026-06-23.

Pengumuman rotasi pada sebuah situs web hanya dapat dipercaya sejauh situs web tersebut dapat dipercaya. Mekanisme yang benar adalah pernyataan yang **ditandatangani secara jelas oleh kedua kunci**, sehingga kunci lama menjamin kunci baru. ZODL mempublikasikan hal tersebut secara tepat:

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

Output asli (diringkas — dua tanda tangan pada satu dokumen):

```
gpg: Signature made Fri Mar 27 01:11:14 2026 WAT
gpg:                using RSA key B1C9095EAA1848DBB54D9DDA1D05FDC66B372CFE
gpg:                issuer "sysadmin@z.cash"
gpg: Good signature from "Zcash Master Signing Key (Electric Coin Company) <sysadmin@z.cash>" [unknown]
Primary key fingerprint: B1C9 095E AA18 48DB B54D  9DDA 1D05 FDC6 6B37 2CFE

gpg: Signature made Fri Mar 27 01:11:14 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Good signature from "Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>" [unknown]
Primary key fingerprint: 0338 34DD 49DE CF9D BB99  34BC 6C93 CA8E 58E2 6AB1
     Subkey fingerprint: 1FE9 9324 758F 2967 18B4  5706 7F4B BBBA 23F0 617F
```

Dua hasil `Good signature` pada satu dokumen, dari kunci lama dan yang baru. Jika kamu mempercayai kunci ECC untuk rilis sebelumnya, kepercayaan tersebut kini berlanjut ke kunci ZODL tanpa kamu harus mempercayai `zodl.com`, `apt.z.cash`, atau sebuah postingan forum. Ini adalah properti yang perlu dicari setiap kali sebuah proyek melakukan rotasi kunci — dan ketiadaannya patut dipertanyakan.

### Di mana mendapatkan kunci — dan di mana sebaiknya tidak

Diurutkan dari yang terbaik hingga yang terburuk:

1. **Pernyataan yang ditandatangani oleh kunci sebelumnya**, seperti di atas. Opsi terkuat setelah rotasi.
2. **Sumber yang independen dari unduhan.** Binary berasal dari GitHub; kunci berasal dari `apt.z.cash`. Penyerang membutuhkan keduanya.
3. **Keyserver, yang diperiksa silang terhadap fingerprint yang telah dipublikasikan.** Siapa pun dapat mengunggah kunci yang mengklaim identitas apa pun ke sebagian besar keyserver. Perbandingan fingerprint inilah yang membuatnya aman — bukan keyserver-nya.
4. **Halaman yang sama dengan binary.** Hampir tidak ada jaminan. Siapa pun yang dapat mengganti salah satunya dapat mengganti yang lainnya.

Selalu bandingkan fingerprint **lengkap** dengan kunci **utama**. ID kunci yang pendek sangat mudah mengalami kolisi dan telah digunakan dalam serangan nyata.

## Bagian 3 — Verifikasi yang gagal

Verifikasi hanya akan berguna jika kamu tahu seperti apa bentuk kegagalan tersebut. Berikut adalah contoh nyata, yang dihasilkan dengan menambahkan satu null byte ke arsip yang valid:

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
sha256sum tampered.tar.gz > tampered.sha256
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

Please provide the Markdown fragment you would like me to translate. I am ready to begin the localization process following all your specified rules and terminology.

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

Kode keluar: `1`.

Letakkan kedua digest berdampingan:

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

Satu byte ditambahkan ke sebuah berkas berukuran 66.992.676-byte. Kedua hash tersebut tidak berbagi apa pun — tidak ada awalan, tidak ada pola. Tidak ada kecocokan parsial dan tidak ada istilah "cukup dekat": sebuah checksum akan cocok secara tepat atau berkas tersebut bukanlah berkas yang kamu inginkan.

### Apa yang harus dilakukan saat ini terjadi

1. **Jangan jalankan binari tersebut.** Jangan mengekstraknya, jangan `chmod +x`-nya.
2. **Coba lagi dari halaman rilis resmi.** Sebagian besar kegagalan disebabkan oleh unduhan yang terputus.
3. **Jika gagal untuk kedua kalinya, ganti jalur jaringan.** Gunakan koneksi berbeda, atau VPN. Kegagalan yang terus terjadi di berbagai jaringan berbeda dengan kegagalan yang tidak mengikuti kamu ke jaringan lain.
4. **Pastikan kamu memiliki file checksum yang benar untuk versi yang tepat.** Membandingkan checksum v6.3.0 dengan v6.2.3 akan menghasilkan kegagalan secara akurat.
5. **Jika masih gagal, laporkan.** Buka issue di repositori proyek, atau gunakan kontak keamanan di `SECURITY.md` untuk apa pun yang kamu curigai sebagai tindakan sengaja. Lihat halaman [Zcash Keamanan Ekosistem](/zcash-community/zcash-ecosystem-security) untuk saluran pengungkapan.
6. **Simpan artefak tersebut.** Binari yang telah dimanipulasi adalah bukti. Jangan menghapusnya sebelum melapor.

Kegagalan tanda tangan lebih serius daripada kegagalan checksum. Ketidakcocokan checksum biasanya merupakan korupsi data; file yang valid tetapi memiliki tanda tangan yang buruk bukanlah sesuatu yang terjadi secara tidak sengaja.

---

## Bagian 4 — Tabel referensi

| Proyek | Rilis diterbitkan pada | Metode | Dari mana kunci berasal |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + bundle Sigstore | Tanpa kunci — identitas CI melalui GitHub OIDC |
| **Zallet** | `github.com/zcash/zallet/releases` | GPG `.asc` terpisah, SLSA provenance, SBOM | `apt.z.cash/zodl.asc` — `0338 34DD…58E2 6AB1` utama, subkey penandatanganan `1FE9 9324…23F0 617F` |
| **zcashd** | *pensiun* | — | Dihentikan pada blok 3,417,100 pada 2026-07-18. Jangan instal. |
| **Zodl** (sebelumnya Zashi) | App Store / Google Play; `zodl-inc` di GitHub | Penandatanganan Store; biner Android mandiri yang ditandatangani GPG | Kunci ZODL per pernyataan transisi |

> **Catatan penamaan:** Zashi telah berganti nama menjadi **Zodl** pada tahun 2026 — pertama di App Store, kemudian di Google Play. Panduan lama yang merujuk ke "Zashi" mendeskripsikan silsilah dompet yang sama.

---

## Bagian 5 — Dompet mobile dan hardware wallet

Verifikasi bekerja secara berbeda setelah kamu meninggalkan unduhan langsung.

**App store.** Kamu tidak bisa memeriksa tanda tangan secara mandiri. Store tersebut menandatangani paketnya dan kamu mempercayai peninjauan dari store serta integritas akun developer tersebut. Apa yang *bisa* kamu verifikasi adalah bahwa kamu memiliki aplikasi yang benar: konfirmasikan nama penerbit dan pengenal paket terhadap situs resmi proyek, bukan terhadap hasil pencarian. Aplikasi penyamaran sangat umum terjadi, dan daftar di store bukanlah bukti keaslian.

**APK Android Mandiri.** Ini *dapat* diverifikasi. ZODL mempublikasikan biner Android mandiri yang ditandatangani GPG melalui GitHub Releases, sehingga alur kerja Bagian 2 dapat diterapkan. Pilih jalur ini jika kamu menginginkan rantai yang dapat diperiksa.

**Dompet hardware.** Perangkat tersebut memverifikasi firmware miliknya sendiri, sehingga jangkar kepercayaan (trust anchor) berada pada hardware, bukan pada file di mesin kamu. Lihat [Keystone Zashi](/guides/keystone-zashi) untuk alur verifikasi perangkat. Belilah langsung dari produsen — manipulasi rantai pasokan dapat terjadi antara pabrik dan pembeli.

---

## Bacaan lebih lanjut

- Keamanan Ekosistem [Zcash](/zcash-community/zcash-ecosystem-security) — kebijakan pengungkapan dan kontak keamanan
- [Zebra Full Node](/zcash-tech/zebra-full-node) — menginstal Zebra setelah memverifikasinya
- [Zallet Panduan Referensi Cepat](/using-zcash/zallet-quick-reference-guide) — menggunakan Zallet
- Dokumentasi [Sigstore](https://docs.sigstore.dev/)
- Tingkat provenance [SLSA](https://slsa.dev/)

---

*Perintah dalam halaman ini dijalankan terhadap Zebra `v6.3.0` dan Zallet `v0.1.0-beta.2` pada 2026-08-18. Perubahan tooling rilis: jika output berbeda dari apa yang ditampilkan di sini, percayalah pada hasil lari kamu sendiri dan silakan buka PR.*