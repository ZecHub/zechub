# Ringkasan Pendanaan & Tata Kelola Zcash

Model pendanaan on-chain Zcash, mekanisme imbalan blok, dan peran organisasi-organisasi utama

## 1. Cara Kerja Imbalan Blok Zcash

Zcash adalah mata uang kripto Proof-of-Work. Setiap blok yang ditambang mendistribusikan **subsidi blok**-nya (ZEC yang baru dibuat) ditambah biaya transaksi sesuai dengan aturan protokol tetap yang ditetapkan oleh peningkatan jaringan.

- **Model saat ini (NU6.1 / 24 November 2025 dan seterusnya)**  
  Distribusinya adalah:

| Penerima                      | Persentase | Apa yang didanai / status                                     |
|--------------------------------|------------|-------------------------------------------------------------|
| Penambang                      | 80%        | Imbalan blok langsung kepada penambang                     |
| Zcash Community Grants (ZCG)                  | 8%         | Hibah komunitas (berlanjut hingga ~2028)                   |
| Dana yang Dikendalikan Pemegang Koin | 12%        | Didanai awal dari bekas lockbox; pemegang koin memberikan suara atas hibah ([ZIP 1016](https://zips.z.cash/zip-1016)) |

- **Dana pengembangan historis Pra-NU6 (2020-Nov 2024)**  
  20% dari setiap subsidi blok diberikan langsung ke organisasi pengembangan:

- 7% -> Electric Coin Company (ECC) / Proyek Bootstrap  
  - 5% -> Zcash Foundation (ZF)  
  - 8% -> Zcash Community Grants (ZCG)

"Dev fund" sebesar 20% ini telah digantikan oleh model 8% ZCG + 12% lockbox melalui [ZIP 1015](https://zips.z.cash/zip-1015) (NU6, November 2024). Dari November 2024 hingga November 2025, dana 12% tersebut terakumulasi di Deferred Dev Fund Lockbox tanpa ada cara untuk membelanjakannya.

### Model saat ini: ZIP 1016 - Model Pendanaan Komunitas dan Pemegang Koin
ZIP 1016 (dibuat Februari 2025) diaktifkan di mainnet oleh [NU6.1](/zcash-tech/nu6-1) pada blok 3.146.400 pada 24 November 2025 ([ZIP 255](https://zips.z.cash/zip-0255)). Model ini:
- Melanjutkan alokasi 8% ke ZCG.
- Telah mengubah lockbox 12% menjadi "Dana yang Dikendalikan Pemegang Koin" (didanai oleh dana lockbox yang ada + subsidi blok 12% yang berkelanjutan).
- Berlaku hingga halving ketiga (ZIP memungkinkan tanggal tersebut bergeser jika NU7 mengubah waktu blok).
- Memungkinkan pemegang koin ZEC melakukan voting mengenai hibah (mayoritas sederhana, minimum 420.000 ZEC yang diberikan suara).
- Mewajibkan Organisasi Pemegang Kunci (saat ini mencakup ZF dan Shielded Labs, dengan Bootstrap/ECC yang dirujuk dalam konteks hibah) untuk mengelola penyaluran dana melalui multisig, yang terikat oleh perjanjian hukum dan keputusan pemegang koin.
- Mempertahankan semua persyaratan ZIP 1015 pada penggunaan lockbox (hibah ekosistem pendanaan).

Model ini beralih dari tata kelola yang dikendalikan organisasi ke tata kelola pemegang koin secara langsung untuk alokasi 12%. Hal ini tidak mengubah proses ZIP atau aturan merek dagang.

## 2. Organisasi Inti & Sumber Pendanaan Mereka

**Electric Coin Company (ECC) / Proyek Bootstrap**  
- Pencipta asli dari Zcash (2016).  
- Secara historis menerima ~7% dari dana pengembangan hingga November 2024.  
- Pada Januari 2026, tim teknik inti dan produk mengundurkan diri dari Bootstrap/ECC karena perselisihan tata kelola dan membentuk Zcash Open Development Lab (ZODL).  
- ECC/Bootstrap tidak lagi menerima pendanaan protokol secara langsung dan tidak lagi mempekerjakan tim pengembangan utama. Organisasi ini bergantung pada donasi, sponsor, dan kasnya sendiri.  
- Memiliki signifikansi historis tetapi bukan lagi organisasi pengembangan protokol yang aktif.  
-> Lihat profil lengkap: [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)

**Zcash Open Development Lab (ZODL)**  
- Dibentuk pada Januari 2026 oleh developer protokol Zcash asli (tim inti rekayasa dan produk ECC) setelah mereka meninggalkan Bootstrap/ECC.  
- Mengumpulkan lebih dari $25 juta dalam pendanaan awal dari investor utama termasuk a16z Crypto dan Coinbase Ventures.  
- Tim ini, yang terdiri dari penemu dan developer asli protokol Zcash, melanjutkan pengembangan protokol inti, kontribusi ZIP, dan alat fokus privasi termasuk dompet seluler Zodl (rebranding dari Zashi).  
- Tidak ada pendanaan protokol on-chain secara langsung; beroperasi sebagai lab independen yang didukung VC yang berfokus pada memajukan infrastruktur privasi Zcash.  
-> Lihat profil lengkap: [ZODL](https://zechub.wiki/zcash-organizations/ZODL)  
-> Situs resmi: [zodl.com](https://zodl.com/)
  
**Zcash Foundation (ZF)**  
- Organisasi nirlaba 501(c)(3) independen yang berfokus pada infrastruktur, perangkat lunak node, penelitian, dan kesehatan ekosistem.  
- Secara historis menerima 5% dari dana developer.  
- Tidak lagi menerima pendanaan protokol secara langsung setelah NU6. Bergantung pada donasi dan hibah.  
- Memegang merek dagang Zcash (didonasikan oleh ECC pada tahun 2019) dan memainkan peran sentral dalam tata kelola.  
- Menjalankan Panel Penasihat Komunitas Zcash (ZCAP) dan membantu memfasilitasi pemungutan suara komunitas.  
- Bertindak sebagai Organisasi Pemegang Kunci berdasarkan ZIP 1016.  
-> Lihat profil lengkap: [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)  
-> Situs resmi: [zfnd.org](https://zfnd.org/)

**Zcash Community Grants (ZCG)**  
- Program Zcash Community Grants mendanai tim dan proyek independen untuk melakukan pengembangan berkelanjutan yang besar dan pekerjaan lainnya demi kebaikan publik ekosistem Zcash.  
- Hibah diputuskan oleh komite yang dipilih oleh komunitas.  
- Terus menerima penuh 8% dari imbalan blok (pasca-NU6), yang dikelola melalui Financial Privacy Foundation.  
- Hibah diberikan melalui proses pengajuan dan pemungutan suara transparan yang terbuka bagi komunitas.  
-> Lihat profil lengkap: [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)  
-> Situs resmi: [zcashcommunitygrants.org/](https://zcashcommunitygrants.org/)

**Financial Privacy Foundation (FPF)**  
- Sebuah organisasi nirlaba yang didirikan di Kepulauan Cayman.  
- Menerima alokasi subsidi blok 8% secara langsung dari protokol (berdasarkan ZIP 1015) dan menangani semua administrasi hukum, keuangan, dan operasional untuk program Zcash Community Grants.  
- Menyediakan struktur payung dan dukungan administratif untuk operasi ZCG, termasuk pencairan dana, kontrak, dan kepatuhan.  
- ZCG beroperasi sebagai entitas otonom yang dipilih oleh komunitas di bawah naungan FPF.  
-> Lihat profil lengkap: [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)  
-> Situs resmi: [financialprivacyfoundation.org/](https://www.financialprivacyfoundation.org/)

**Shielded Labs**  
- Organisasi pendukung Zcash independen yang didanai melalui donasi dan berbasis di Swiss.  
- Organisasi pertama dalam ekosistem Zcash yang tidak pernah menerima pendanaan langsung maupun tidak langsung dari Development Fund atau imbalan blok.  
- Berfokus pada inisiatif yang menguntungkan pemegang ZEC dan memprioritaskan suara pemegang dalam membentuk arah Zcash.  
- Bertindak sebagai Key-Holder Organization berdasarkan ZIP 1016 untuk administrasi Coinholder-Controlled Fund.  
- Berkontribusi pada pengembangan protokol, proses ZIP, dan tata kelola (perwakilan editor ZIP).  
-> Lihat profil lengkap: [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs)  
-> Situs resmi: [shieldedlabs.net](https://shieldedlabs.net/)

## 3. Tata Kelola - Bagaimana Keputusan Dibuat

Tata kelola Zcash adalah campuran antara "aturan protokol on-chain" dan "konsensus sosial off-chain":

1. **Proses ZIP (Proposal Peningkatan Zcash)**  
   - Siapa pun dapat mengajukan ZIP.  
   - Debat publik di forum, Discord, GitHub.  
   - Editor ZIP saat ini adalah Jack Grigg, Daira-Emma Hopwood, dan Kris Nuttycombe (dalam kapasitas individu); Arya dan Marek (Zcash Foundation); Mark Henderson dan Sam H. Smith (Shielded Labs); Sean Bowe dan Tal Derei (Project Tachyon); serta Dev Ojha (Valar Group).
   - Persetujuan ZIP tidak secara otomatis menjadwalkan penyertaannya dalam peningkatan jaringan berikutnya. ZIP konsensus memerlukan rencana penerapan dan implementasi, dan aturannya diaktifkan pada ketinggian peningkatan jaringan yang telah ditentukan.

2. **Perjanjian Merek Dagang (2019-2024)**  
   - ECC menyumbangkan merek dagang Zcash kepada ZF pada tahun 2019.  
   - Perjanjian tersebut awalnya mewajibkan persetujuan bersama dari ECC dan ZF untuk setiap peningkatan jaringan yang membuat protokol konsensus baru.  
   - Pada April 2024, ECC mengumumkan niat untuk mengakhiri perjanjian; pemberitahuan penghentian resmi dikeluarkan pada Agustus 2024.  
   - Per tahun 2025, ZF adalah pengelola tunggal dari merek dagang Zcash dan telah mengadopsi kebijakan merek dagang permisif baru yang mencerminkan desentralisasi ekosistem. Merek dagang tersebut tidak lagi berfungsi sebagai mekanisme veto tata kelola.

3. **Panel Penasihat Komunitas Zcash (ZCAP)**  
   - Grup sukarelawan yang terdiri dari para ahli ekosistem.  
   - Digunakan untuk jajak pendapat komunitas yang tidak mengikat mengenai keputusan-keputusan besar.

4. **Ratifikasi On-chain**  
   - Peningkatan jaringan aktif pada ketinggian blok yang telah ditentukan sebelumnya. Node yang menjalankan perangkat lunak yang kompatibel menerapkan aturan konsensus baru sejak ketinggian tersebut. Node yang tidak melakukan peningkatan dapat terus mengikuti cabang konsensus sebelum peningkatan, yang berpotensi mengakibatkan pemisahan chain.

5. **The Lockbox & ZIP 1016**  
   - Dana lockbox sebesar 12% terakumulasi di dalam protokol dari November 2024 hingga November 2025.  
   - NU6.1 mengubah dana tersebut menjadi Dana yang Dikendalikan Pemegang Koin, dengan pemungutan suara pemegang koin dan administrasi multisig oleh Organisasi Pemegang Kunci (saat ini tercatat ZF dan Shielded Labs).

## 4. Tabel Referensi Cepat - Evolusi Pendanaan

| Periode           | Penambang | ECC/Bootstrap | ZF   | ZCG  | Lockbox | Catatan                                     |
|------------------|--------|---------------|------|------|---------|--------------------------------------------|
| 2020 - Nov 2024  | 80%    | 7%            | 5%   | 8%   | -       | Dana pengembangan klasik                   |
| Nov 2024 - Nov 2025 | 80% | 0%            | 0%   | 8%   | 12%     | Model NU6 + ekstensi ZCG                |
| Nov 2025 - sekarang (ZIP 1016) | 80% | 0%   | 0%   | 8%   | 12% (Dikendalikan Pemegang Koin) | NU6.1; hingga halving ke-3; pemungutan suara pemegang koin |

## 5. Sumber Daya Terkait

- Penjelasan resmi pendanaan -> [z.cash/network funding section](https://z.cash/network/?funding=#funding)  
- ZIP 1015 (perubahan NU6 pendanaan) -> [zips.z.cash/zip-1015](https://zips.z.cash/zip-1015)  
- ZIP 1016 (model pemegang koin, aktif sejak NU6.1) -> [zips.z.cash/zip-1016](https://zips.z.cash/zip-1016)  
- Zcash Proposal Peningkatan -> [zips.z.cash](https://zips.z.cash)  
- Zcash Community Grants portal -> [zcashcommunitygrants.org](https://zcashcommunitygrants.org)

## 6. Dashboard Lockbox

Dashboard ZecHub sebagai jumlah ZEC saat ini di dalam dana Lockbox dan Coinholders [di sini](https://zechub.wiki/dashboard?tab=lockbox).