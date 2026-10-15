<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Privasi penambangan dan staking

Pembayaran penambang kamu dan finalizer kamu bukanlah hal yang sama. Chain tidak pernah menghubungkan keduanya.

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Penambang</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">Pembayaran transparan</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase membayar ke alamat Zcash. Riwayat t-address bersifat publik.</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Finalizer</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">Kunci zfinv1</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">Sebuah kunci ed25519. Ini menandatangani voting. Ini bukan alamat Zcash.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Bond</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">Stake terlindungi</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">Berada di dalam staking pool. Menentukan target finalizer.</p>
  </div>
</div>

## Urutan yang penting

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 Tambang</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 Lindungi</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 Bond</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">Lewati tahap lindungi dan langkah privasi tidak akan pernah terjadi. Sebuah bond tidak menghapus coinbase transparan.</p>
</div>

## Apa itu publik

| Hal | Publik? | Mengapa |
|---|---|---|
| Alamat t-address penambang dan riwayat coinbase | Ya | Output transparan normal |
| Kunci finalizer dan zfinv1 | Ya, setelah ada di daftar | Harus demikian, untuk memverifikasi suara |
| Kekuatan voting dan bank reward | Ya | Dipublikasikan terhadap kunci finalizer agar distribusi stake dapat diaudit |
| Alamat transparan mana yang mendanai sebuah bond | Tidak, setelah shield | Bond menggunakan note terlindungi |
| Tautan dari penambang kamu ke finalizer kamu | Tidak di on chain | Tidak ada dalam protokol yang menuliskannya |

Jumlah yang di-stake sengaja diungkapkan. Desain ini membutuhkan total yang di-stake dan distribusinya di seluruh finalizer agar dapat diperiksa secara publik. Kuantisasi (pangkat 10) dan jendela staking tetap membatasi seberapa banyak informasi waktu atau pola individu yang bocor sambil tetap memungkinkan audit tersebut. Saldo Orchard yang tidak di-stake tetap privat; staking adalah pengungkapan yang disengaja.

## Stake ke diri sendiri, atau ke orang lain

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">Bond ke finalizer kamu sendiri</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">Paling sederhana. Kamu mempertahankan peran operator dan bond tersebut. Pengamat tetap tidak dapat membuktikan bahwa t-address dan zfinv1 adalah satu orang hanya dari data chain.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">Bond ke anggota lain</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">Kekuatan voting ditampilkan di bawah key mereka. Mereka memperoleh komisi finalizer aktif sebesar 10%. Kamu mempertahankan 90% yang terakumulasi pada bond tersebut. Ini menggagalkan dugaan yang jelas bahwa penambang yang menerima pembayaran transparan adalah orang yang sama yang mengoperasikan finalizer.</p>
  </div>
</div>

Sebuah kelompok dapat menambang menggunakan alamat pembayaran terpisah, melindungi, dan membangun ikatan antaranggota. Hal itu membuat klaim “penambang ini adalah finalizer ini” jauh lebih sulit dilakukan berdasarkan data chain. Hal ini tidak menyembunyikan siapa para finalizer tersebut, dan tidak menyembunyikan penambangannya.

## Apa yang tidak dilakukan oleh ini

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">Tidak tersembunyi</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>Siapa saja finalizer tersebut</li>
    <li>Berapa banyak kekuatan voting yang dimiliki masing-masing pihak</li>
    <li>Riwayat penambangan transparan kamu</li>
    <li>Tautan yang kamu buat secara off-chain: satu IP, satu pola pembayaran, satu operator</li>
  </ul>
</div>

Target zfinv1 berada di dalam aksi staking. Privasi di sini adalah tentang sumber dana, bukan tentang menyembunyikan kunci tujuan.

## Versi pendek

Tambang. Lindungi. Lalu ikat. Alamat penambang dan kunci finalizer tetap tidak terkait kecuali kamu menghubungkannya sendiri.
