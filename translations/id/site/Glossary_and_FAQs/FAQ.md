# Pertanyaan yang Sering Diajukan

Daftar pertanyaan paling umum tentang Zcash. Untuk pemecahan masalah client Zcash, silakan lihat [panduan pemecahan masalah resmi](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Navigasi Cepat

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Apa itu Zcash?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Bagaimana cara memperoleh Zcash?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Perbedaan dari cryptocurrency lain?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Tata kelola protokol?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Di mana transaksi saya?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Apakah Zcash benar-benar privat?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Kesalahpahaman umum</a>
  <a href="#zcashd-stopped-working-what-do-i-run-now" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">zcashd berhenti berfungsi?</a>
  <a href="#how-do-i-move-my-zcashd-wallet-to-zallet" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Memindahkan dompet saya ke Zallet?</a>
  <a href="#what-is-ironwood-and-do-i-need-to-do-anything" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Apa itu Ironwood?</a>
  <a href="#which-full-node-should-i-run" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Full node yang mana?</a>
  <a href="#where-do-i-look-up-a-term-from-a-release-note" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Mencari istilah?</a>
</div>

---

## Apa itu Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash adalah mata uang digital dengan transaksi yang cepat, rahasia, dan berbiaya rendah. Privasi adalah fitur utama Zcash. Mata uang ini memelopori penggunaan proof zero-knowledge untuk mengenkripsi seluruh transaksi.

Beberapa dompet tersedia untuk pembayaran instan, seluler, aman, dan privat: [Dompet](/using-zcash/wallets)

</div>

## Bagaimana cara memperoleh Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Anda dapat membeli ZEC di [exchange kustodial](/using-zcash/custodial-exchanges), [DEX](/using-zcash/dex), atau [platform swap terpusat](/using-zcash/centralized-swaps).

Anda juga dapat membeli Zcash secara peer-to-peer atau memperolehnya melalui penambangan.

</div>

## Apa perbedaan antara Zcash dan cryptocurrency lainnya?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash pada dasarnya lebih privat daripada Bitcoin atau Ethereum. Mata uang ini menawarkan waktu blok yang cepat (75 detik), biaya rendah, dan peningkatan rutin.

Pengguna dapat memilih antara transaksi **Transparan** atau **Terlindungi**. Untuk informasi lebih lanjut, lihat [Ekosistem Terlindungi](https://electriccoin.co/blog/shielded-ecosystem).

</div>

## Bagaimana protokol Zcash dikelola?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Protokol dikelola melalui proses **Proposal Peningkatan Zcash (ZIP)**. Siapa pun dapat mengajukan draf ZIP. Draf diperdebatkan oleh komunitas dan diterima atau ditolak oleh editor ZIP:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Keputusan ditulis ke dalam spesifikasi dan diratifikasi on-chain ketika network mengadopsinya.

</div>

## Di mana Transaksi saya?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Pertama, bacalah [panduan kami tentang block explorer](/guides/blockchain-explorers). Kemudian periksa [Zcash Block Explorer](https://mainnet.zcashexplorer.app).

Transaksi kedaluwarsa setelah sekitar 25 menit (20 blok) dan dana dikembalikan secara otomatis.

**Alasan umum transaksi mungkin tidak muncul:**

- Koneksi terputus
- Biaya transaksi terlalu rendah
- Network kelebihan beban
- Terlalu banyak input transparan (ukuran terlalu besar)

**Kiat agar berhasil:**

- Gunakan koneksi yang stabil
- Bayar biaya standar (atau lebih tinggi untuk prioritas)
- Tunggu dan coba lagi nanti
- Gunakan lebih sedikit input agar transaksi tetap kecil

</div>

## Apakah Zcash benar-benar Privat?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**Ya.** Zcash mengenkripsi data pengirim, jumlah, dan penerima untuk transaksi terlindungi.

Zcash **tidak**:

- Mengenkripsi transaksi multisignature (integrasi FROST masih tertunda)
- Melindungi terhadap korelasi dengan transaksi transparan
- Menyembunyikan alamat IP

Bacaan lebih lanjut: [Ekosistem Terlindungi](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## zcashd berhenti berfungsi, apa yang harus saya jalankan sekarang?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

zcashd telah dihentikan. Versi 6.20.0 mematikan dirinya sendiri pada blok 3417100 pada 18 Juli 2026, dan tidak pernah mendukung Ironwood (NU6.3), sehingga tidak ada versi yang lebih baru untuk ditingkatkan.

Jalankan stack Z3 sebagai gantinya. Tiga program membagi pekerjaan yang sebelumnya dilakukan sendiri oleh zcashd:

- **[Zebra](/zcash-tech/zebra-full-node)** memvalidasi chain
- **[Zaino](/zcash-tech/zaino)** mengindeksnya dan menyediakan data dompet
- **[Zallet](/zcash-tech/zallet)** menyimpan dana Anda

[Zakura](/zcash-tech/zakura-node) adalah full node alternatif. Program ini juga menjalankan zcashd di atasnya, yang membantu jika perangkat lunak lain masih mengharapkan antarmuka lama.

Mulailah dengan [panduan migrasi](/guides/migration-guide-zcashd-to-zebrad-zallet).

</div>

## Bagaimana cara memindahkan dompet zcashd saya ke Zallet?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zallet memigrasikan `wallet.dat` yang sudah ada, sehingga Anda tetap mempertahankan dana dan alamat Anda.

Cadangkan `wallet.dat` terlebih dahulu, lalu ikuti [panduan migrasi](/guides/migration-guide-zcashd-to-zebrad-zallet). Simpan cadangan tersebut hingga Anda telah mengonfirmasi saldo Anda di Zallet.

Referensi cepat [Zallet](/using-zcash/zallet-quick-reference-guide) mencakup perintah sehari-hari setelah Anda berpindah.

</div>

## Apa itu Ironwood, dan apakah saya perlu melakukan sesuatu?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Ironwood adalah peningkatan jaringan NU6.3, aktif di mainnet sejak blok 3.428.143 pada 28 Juli 2026. Peningkatan ini menambahkan pool terlindungi yang dibangun pada circuit yang telah diperbaiki dan menutup pool [Orchard](/using-zcash/shielded-pools) yang lebih lama, sehingga siapa pun dapat memverifikasi bahwa tidak ada ZEC yang dipalsukan.

**Jika Anda memiliki dana terlindungi, dana tersebut mungkin perlu dipindahkan.** Nilai hanya keluar dari Orchard melalui [turnstile](/zcash-tech/the-turnstile), dan dompet menangani pemindahan tersebut pada waktu serta dengan cara yang berbeda. Tanyakan kepada penyedia dompet Anda sebelum memindahkan apa pun secara manual.

Baca [Ironwood](/zcash-tech/ironwood) untuk mengetahui apa yang berubah dan alasannya.

</div>

## Full node yang mana sebaiknya saya jalankan?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**[Zebra](/zcash-tech/zebra-full-node)** adalah pengganti langsung untuk zcashd dan node yang diasumsikan oleh panduan migrasi. Pilih ini kecuali Anda memiliki alasan untuk tidak melakukannya.

**[Zakura](/zcash-tech/zakura-node)** adalah implementasi kedua yang ditujukan untuk skala, dengan sinkronisasi lebih cepat dan pemangkasan blok native. Pilih ini jika Anda memerlukannya, atau jika Anda bergantung pada perangkat lunak yang masih berbicara dengan zcashd.

Keduanya memvalidasi chain yang sama, sehingga ini merupakan pilihan operasional, bukan pilihan konsensus.

</div>

## Di mana saya mencari istilah dari catatan rilis?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Lihat [Zcash Library](/glossary-and-faqs/zcash-library). Library tersebut mencakup perangkat lunak node dan dompet, pool terlindungi, serta nomor ZIP yang paling sering muncul.

</div>

## Beberapa kesalahpahaman umum

<div className="rounded-2xl border border-border bg-card p-5 my-4 overflow-x-auto">

<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Kesalahpahaman</th>
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Jawaban yang Benar</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Apakah Zcash adalah coin yang tersentralisasi?</td>
      <td className="py-4 px-5 text-foreground">Tidak. Perjanjian merek dagang mencegah Zcash Foundation atau ECC bertindak melawan konsensus komunitas. Tata kelola terbukti terdesentralisasi (lihat [laporan Messari](https://messari.io/report/decentralizing-zcash)). Jajak pendapat komunitas, ZecHub, dan A/V Club Zcash Foundation semuanya memungkinkan partisipasi luas.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Apakah Zcash memiliki backdoor?</td>
      <td className="py-4 px-5 text-foreground">Tidak. Baik Zcash maupun perangkat lunak kriptografis yang kami buat tidak mengandung backdoor, dan tidak akan pernah mengandungnya.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Apakah Zcash dikendalikan oleh korporasi?</td>
      <td className="py-4 px-5 text-foreground">Tidak benar. Meskipun kami bermitra dengan perusahaan untuk penelitian, Zcash tetap berkomitmen pada desentralisasi. Berbagai organisasi otonom bekerja sama menuju kustodi mandiri dan hak privasi.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash memiliki privasi terbatas dibandingkan coin privasi lain</td>
      <td className="py-4 px-5 text-foreground">Tidak. Privasi bergaya Monero/Grin bergantung pada decoy (yang dapat dikalahkan). Zcash mengenkripsi seluruh data transaksi terlindungi sehingga setiap transaksi dalam pool tidak dapat dibedakan. Lihat [Tidak Cukup Privat?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**Terakhir diperbarui:** Oktober 2026
**Ingin berkontribusi?** [Edit halaman ini di GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
