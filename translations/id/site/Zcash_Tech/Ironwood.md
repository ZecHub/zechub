<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Ironwood

> Ironwood diaktifkan pada mainnet Zcash pada blok 3.428.143 pada tanggal 28 Juli 2026 UTC, dan telah berjalan sejak saat itu.

Apa yang akan Anda pelajari: apa yang diubah oleh Ironwood, mengapa sebuah bug pada uang tersembunyi sangatlah serius, dan bagaimana turnstile memungkinkan siapa pun untuk mengonfirmasi bahwa tidak ada ZEC yang dipalsukan.

Ironwood adalah Zcash [peningkatan jaringan](../start-here/network-upgrades), secara formal NU6.3, yang memperkenalkan pool terlindungi baru dengan nama yang sama. Sebuah [pool terlindungi](../using-zcash/shielded-pools) adalah kumpulan dana yang jumlah dan pemiliknya tetap tersembunyi oleh [kriptografi zero-knowledge](../zcash-tech/zk-snarks). Ironwood hadir untuk menampung dan mengaudit bug soundness yang ditemukan pada Orchard pool terlindungi yang ada, dan untuk memberikan cara yang lebih kuat bagi komunitas guna memeriksa bahwa total supply dari ZEC adalah jujur. Aturan konsensusnya ditentukan dalam [ZIP 258](https://zips.z.cash/zip-0258).

Mengapa hal ini penting. Dengan uang transparan seperti Bitcoin, siapa pun dapat memeriksa bahwa tidak ada koin yang dipalsukan dengan membaca buku besar publik. Uang terlindungi menyembunyikan jumlahnya, sehingga Anda tidak dapat sekadar melihatnya. Sebaliknya, kriptografi itu sendiri harus menjamin bahwa tidak ada seorang pun yang dapat menciptakan uang secara rahasia. Ironwood menjadi penting karena ditemukan bug dalam jaminan tersebut untuk pool Orchard. Peningkatan jaringan ini menutup celah tersebut dan memberikan cara bagi siapa saja untuk mengonfirmasi bahwa total suplai ZEC tetap jujur.

Baru mengenal Zcash? Mulailah dengan [Apa itu ZEC dan Zcash](../start-here/what-is-zec-and-zcash) dan [Pool terlindungi](../using-zcash/shielded-pools), lalu kembali ke sini.

![Ironwood value migration flow: value leaves the Orchard pool, passes through the turnstile checkpoint, and enters the new Ironwood pool](/content-images/ironwood-flow-8af7a58b99.webp)

## Mengapa Ironwood diperlukan

Pada akhir Mei 2026, peneliti keamanan independen Taylor Hornby, selama audit protokol untuk [Shielded Labs](../zcash-organizations/shielded-labs), secara bertanggung jawab mengungkapkan bug soundness dalam Orchard pool terlindungi. Orchard adalah pool terlindungi terbaru milik Zcash pada saat itu, dan celah tersebut terletak pada bagian elliptic-curve dari circuit zero-knowledge miliknya, yang menggunakan sistem pembuktian [Halo](../zcash-tech/halo) 2.

1. Bug soundness berarti matematika yang membuktikan sebuah transaksi valid tidak memberikan jaminan sepenuhnya.
2. Secara teori, seorang penyerang dapat menggunakan celah tersebut untuk memalsukan nilai tidak valid di dalam pool Orchard dan membelanjakan dana yang sebenarnya bukan milik mereka, tanpa meninggalkan jejak yang dapat dideteksi oleh node normal.
3. turnstile milik Zcash tetap membatasi seberapa banyak nilai yang dapat keluar dari Orchard, sehingga total suplai tidak dapat membengkak, namun kriptografi pool itu sendiri tidak lagi menjamin bahwa setiap koin tersembunyi di dalamnya adalah nyata.

![The bug explained: a transaction puts in 5 ZEC, but the flawed proof still passes when 7 ZEC come out, creating 2 ZEC from nothing](/content-images/ironwood-bug-8f689d6f61.webp)

Angka-angka di atas adalah gambaran yang disederhanakan. Celah sebenarnya terletak pada bagian spesifik dari matematika sirkuit tersebut, bukan pada jumlah koin yang masuk dan keluar secara harfiah. Poin penting yang dapat diambil hanyalah bahwa bug soundness dapat memungkinkan nilai dibuat di dalam pool tanpa terdeteksi.

Yang terpenting, tidak ada bukti bahwa bug tersebut pernah dieksploitasi, tidak ada bukti adanya dampak terhadap dana pengguna, dan tidak ada bukti bahwa total suplai ZEC berubah. Hal ini ditemukan melalui riset keamanan dan telah diperbaiki sebelum terjadi kerugian yang diketahui.

## Respons

Komunitas Zcash merilis perbaikan secara bertahap alih-alih sekaligus.

![Ironwood response timeline: the Orchard bug is found in May 2026, the pool is paused in June 2026, the circuit is fixed in NU6.2, and Ironwood activated at block 3,428,143 on July 28, 2026](/content-images/ironwood-timeline-36243f0cd7.webp)

1. Pada awal Juni 2026, sebuah tindakan sementara menonaktifkan pool Orchard selagi perbaikan menyeluruh sedang disiapkan.
2. Peningkatan NU6.2 memperbaiki sirkuit Orchard itu sendiri, menutup kerentanan soundness yang mendasarinya.
3. Peningkatan NU6.3, Ironwood, memperkenalkan pool terlindungi baru dan checkpoint publik sehingga nilai dapat dipindahkan keluar dari pool Orchard lama di bawah audit penuh.

![The fix in NU6.2: the corrected proof requires inputs to equal outputs, so a valid 5 ZEC output passes while an attempt to output 7 ZEC is rejected](/content-images/ironwood-fix-bb4f70ddc9.webp)

## Apa yang dilakukan oleh pool Ironwood

NU6.2 mengamankan sirkuit Orchard untuk semua transaksi baru, tetapi nilai yang dibuat di bawah aturan lama masih berada di dalam pool Orchard. Ironwood memberikan tujuan yang bersih bagi nilai tersebut dan cara untuk mengauditnya saat berpindah.

Pool Ironwood adalah pool nilai terlindungi yang dibuat oleh NU6.3 pada blok 3,428,143. Pool ini dibangun di atas sirkuit yang telah diperbaiki dan menggunakan format catatan yang dapat dipulihkan secara kuantum (sebuah desain yang memungkinkan dana dipulihkan jika [komputer kuantum](../zcash-tech/post-quantum-security) berhasil mematahkan kriptografi saat ini), yang didefinisikan dalam [ZIP 2005](https://zips.z.cash/zip-2005).

1. Setelah aktivasi, pool Orchard yang lama menjadi hanya-untuk-pengeluaran (spend-only), sehingga tidak ada nilai baru yang dapat masuk ke dalamnya.
2. Nilai terlindungi yang baru mengalir ke Ironwood sebagai gantinya.
3. ZEC terlindungi tetap mempertahankan jaminan privasi kuat yang sama yang menyembunyikan pengirim, penerima, dan jumlahnya.

## Turnstile

Ide utama dalam Ironwood adalah turnstile, sebuah titik pemeriksaan akuntansi yang harus dilewati oleh setiap koin saat berpindah dari Orchard pool lama ke Ironwood.

> Sebuah turnstile melakukan hal yang sama terhadap uang tersembunyi sebagaimana pintu kaca melakukan hal yang sama terhadap brankas bank. Anda tetap tidak dapat melihat ke bagian dalam, tetapi Anda dapat menghitung dengan tepat apa yang masuk dan apa yang keluar.

1. Dana yang meninggalkan Orchard dihitung pada titik verifikasi publik sebelum memasuki Ironwood.
2. Hal ini memungkinkan siapa pun untuk mengaudit seberapa banyak ZEC yang bermigrasi, sehingga memperkuat kepercayaan terhadap jumlah sirkulasi yang sebenarnya.
3. Jika ada ZEC palsu yang telah dibuat melalui bug sebelumnya, akuntansi migrasi inilah tempat hal tersebut akan muncul.

Turnstile bukanlah hal baru bagi Zcash. Jaringan telah menggunakannya sebelumnya, pada batas antara pool Sprout, Sapling, dan Orchard, sehingga nilai yang berpindah antar pool tetap dapat diaudit dan tidak ada pool yang dapat mengeluarkan lebih banyak daripada yang secara sah masuk ke dalamnya.

Aturan konsensus menjaga setiap pool nilai, termasuk Ironwood, tetap berada dalam batas uang maksimum jaringan, sehingga saldo pool tidak akan pernah menjadi negatif.

## Apa yang perlu dilakukan pengguna

Dompet dan perangkat lunak node menangani sebagian besar hal ini secara otomatis, tetapi perubahan praktisnya sederhana: seiring berjalannya waktu, pindahkan kepemilikan terlindungi dari pool Orchard lama melalui turnstile ke dalam pool Ironwood. Ikuti panduan dari penyedia dompet Anda, dan selalu perbarui ke rilis yang didukung sebelum blok aktivasi.

## Glosarium

| Istilah | Makna dalam bahasa Inggris sederhana |
|---|---|
| Pool terlindungi | Kumpulan dana yang jumlah dan pemiliknya disembunyikan oleh kriptografi zero-knowledge |
| Bug soundness | Cacat yang memungkinkan transaksi tidak valid lolos dari pemeriksaan proof seolah-olah transaksi tersebut valid |
| Turnstile | Sebuah checkpoint publik yang menghitung nilai yang berpindah antar pool agar pasokan tetap dapat diaudit |
| Spend-only | Sebuah pool yang dapat Anda gunakan untuk mengirim dana, tetapi tidak dapat ditambahkan nilai baru ke dalamnya |
| Peningkatan jaringan (NU) | Perubahan terkoordinasi pada aturan konsensus Zcash, yang diaktifkan pada ketinggian blok tertentu |
| Note quantum-recoverable | Format note yang dirancang agar dana dapat dipulihkan jika komputer kuantum berhasil menembus kriptografi saat ini |

## Tanya Jawab Umum (FAQ)

Apakah ZEC saya terdampak? Tidak. Tidak ada bukti bahwa bug tersebut pernah digunakan, tidak ada dampak terhadap dana pengguna, dan tidak ada perubahan pada total suplai.

Apakah Anda perlu melakukan sesuatu? Pastikan dompet dan perangkat lunak node Anda diperbarui ke rilis yang didukung sebelum blok aktivasi. Dompet Anda akan memindahkan dana ke Ironwood secara bertahap seiring dengan penggunaan Anda, sehingga tidak ada hal manual yang perlu terburu-buru. Ikuti panduan dari penyedia dompet Anda.

Apakah Zcash masih privat? Ya. Ironwood tetap mempertahankan privasi terlindungi yang sama yang menyembunyikan pengirim, penerima, dan jumlahnya. Peningkatan ini adalah mengenai integritas pasokan, bukan privasi.

Apakah bug tersebut pernah dieksploitasi? Tidak ada bukti bahwa hal itu terjadi. Bug ini ditemukan melalui riset keamanan, diungkapkan secara bertanggung jawab, dan diperbaiki sebelum terjadi kerugian yang diketahui.

Apa yang terjadi pada pool Orchard yang lama? Pool tersebut menjadi hanya untuk pengeluaran (spend-only). Tidak ada nilai baru yang dapat masuk ke dalamnya, dan nilai yang ada berpindah ke Ironwood melalui turnstile, di mana migrasi tersebut diaudit secara publik.

## Uji pemahaman Anda

Jika ZEC di dalam pool terlindungi disembunyikan, bagaimana siapa pun dapat memastikan bahwa bug Orchard tidak secara diam-diam meningkatkan total suplai?

<details>
<summary>Jawaban</summary>

Melalui turnstile. Setiap koin yang meninggalkan pool Orchard lama akan dihitung pada titik pemeriksaan publik saat memasuki Ironwood. Jika ada lebih banyak nilai yang mencoba keluar daripada yang masuk secara sah, pembukuan tidak akan seimbang, sehingga pemalsuan apa pun yang mungkin dibuat oleh bug tersebut akan muncul pada gerbang tersebut.
</details>

### Sumber Daya

[ZIP 258: Penerapan Peningkatan Jaringan NU6.3 ](https://zips.z.cash/zip-0258)

[ZIP 257: Penerapan Mitigasi Kerentanan Sementara Orchard dan NU6.2 Peningkatan Jaringan ](https://zips.z.cash/zip-0257)

[ZIP 2005: Ironwood Pemulihan Kuantum](https://zips.z.cash/zip-2005)

[Ironwood: Sebuah Pool Terlindungi Baru untuk Zcash](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### Lihat juga

[Zcash Peningkatan Jaringan](../start-here/network-upgrades)

[Pool terlindungi](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

Keamanan Pasca-Quantum [](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[Apa itu ZEC dan Zcash](../start-here/what-is-zec-and-zcash)

---

Seri: Indeks peningkatan jaringan [](../start-here/network-upgrades) · Sebelumnya: [NU6.2](../zcash-tech/nu6-2)