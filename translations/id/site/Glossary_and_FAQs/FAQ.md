# Pertanyaan yang Sering Diajukan

Daftar pertanyaan yang paling umum mengenai Zcash. Untuk pemecahan masalah pada client Zcash, silakan lihat [panduan resmi pemecahan masalah](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Navigasi Cepat

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Apa itu Zcash?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Bagaimana cara saya mendapatkan Zcash?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Perbedaan dari cryptocurrency lain?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Tata kelola protokol?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Di mana transaksi saya?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Apakah Zcash benar-benar privat?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Kesalahpahaman umum</a>
</div>

---

## Apa itu Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash adalah mata uang digital dengan transaksi yang cepat, rahasia, dan biaya rendah. Privasi adalah fitur utama dari Zcash. Ia mempelopori penggunaan zero-knowledge proofs untuk mengenkripsi semua transaksi.

Beberapa dompet tersedia untuk pembayaran instan, seluler, aman, dan privat: [Dompet](/using-zcash/wallets)

</div>

## Bagaimana cara saya mendapatkan Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Anda dapat membeli ZEC di [exchange kustodial](/using-zcash/custodial-exchanges), [DEXs](/dex), atau [platform swap terpusat](/using-zcash/centralizedswaps).

Anda juga dapat membeli Zcash secara peer-to-peer atau mendapatkannya dengan menambang.

</div>

## Apa perbedaan antara Zcash dan mata uang kripto lainnya?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash secara fundamental lebih privat daripada Bitcoin atau Ethereum. Ia menawarkan waktu blok yang cepat (75 detik), biaya rendah, dan peningkatan jaringan secara berkala.

Pengguna dapat memilih antara transaksi **Transparan** atau **Terlindungi**. Untuk informasi lebih lanjut, lihat [Ekosistem Terlindungi](https://electriccoin.co/blog/shielded-ecosystem).

</div>

## Bagaimana protokol Zcash dikelola?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Protokol ini diatur oleh proses **Proposal Peningkatan Zcash (ZIP)**. Siapa pun dapat mengajukan draf ZIP. Draf diperdebatkan oleh komunitas dan diterima atau ditolak oleh editor ZIP:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Keputusan ditulis ke dalam spesifikasi dan diratifikasi secara on-chain saat jaringan mengadopsinya.

</div>

## Di mana Transaksi Saya?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Pertama, baca [panduan kami tentang block explorer](/guides/blockchain-explorers). Kemudian periksa [Zcash Block Explorer](https://zcashblockexplorer.com).

Transaksi kedaluwarsa setelah sekitar 25 menit (20 blok) dan dana dikembalikan secara otomatis.

**Alasan umum mengapa sebuah transaksi mungkin tidak muncul:**

- Kehilangan konektivitas
- Biaya transaksi terlalu rendah
- Beban berlebih jaringan
- Terlalu banyak input transparan (ukuran terlalu besar)

**Tips untuk berhasil:**

- Gunakan koneksi yang stabil
- Bayar biaya standar (atau lebih tinggi untuk prioritas)
- Tunggu dan coba lagi nanti
- Gunakan lebih sedikit input agar transaksi tetap kecil

</div>

## Apakah Zcash Benar-benar Privat?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**Ya.** Zcash mengenkripsi data pengirim, jumlah, dan penerima untuk transaksi terlindungi.

Zcash **tidak**:

- Enkripsi transaksi multisignature (integrasi FROST masih tertunda)
- Melindungi dari korelasi dengan transaksi transparan
- Menyembunyikan alamat IP

Bacaan lebih lanjut: [Ekosistem Terlindungi](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## Beberapa kesalahpahaman umum

<div className="rounded-2xl border border-border bg-card p-5 my-4 overflow-x-auto">

<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Miskonsepsi</th>
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Jawaban Benar</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Apakah Zcash adalah koin terpusat?</td>
      <td className="py-4 px-5 text-foreground">Tidak. Perjanjian merek dagang mencegah Zcash Foundation atau ECC bertindak melawan konsensus komunitas. Tata kelola telah terbukti terdesentralisasi (lihat laporan [Messari](https://messari.io/report/decentralizing-zcash)). Pemungutan suara komunitas, ZecHub, dan Zcash Foundation A/V Club semuanya memungkinkan partisipasi yang luas.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Apakah Zcash memiliki backdoor?</td>
      <td className="py-4 px-5 text-foreground">Tidak. Baik Zcash maupun perangkat lunak kriptografi apa pun yang telah kami bangun tidak mengandung backdoor, dan tidak akan pernah ada.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Apakah Zcash dikendalikan oleh sebuah korporasi?</td>
      <td className="py-4 px-5 text-foreground">Salah. Meskipun kami bermitra dengan berbagai perusahaan untuk penelitian, Zcash tetap berkomitmen pada desentralisasi. Berbagai organisasi otonom bekerja sama menuju hak privasi dan self-custody.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash memiliki privasi terbatas dibandingkan dengan koin privasi lainnya</td>
      <td className="py-4 px-5 text-foreground">Tidak. Privasi gaya Monero/Grin bergantung pada decoy (yang dapat dikalahkan). Zcash mengenkripsi semua data transaksi terlindungi sehingga setiap transaksi dalam pool tidak dapat dibedakan. Lihat [Not Private Enough?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**Terakhir diperbarui:** Maret 2026
**Ingin berkontribusi?** [Edit halaman ini di GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)