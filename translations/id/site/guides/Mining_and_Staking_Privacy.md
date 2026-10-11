<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Privasi penambangan dan staking

Pembayaran penambang kamu dan finalizer kamu bukanlah hal yang sama. Chain tidak pernah menghubungkan keduanya. Hal ini sangat berguna, namun juga mudah disia-siakan.

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
| Kekuatan voting dan bank reward | Ya | Dipublikasikan terhadap kunci finalizer |
| Alamat transparan mana yang mendanai sebuah bond | Tidak, setelah shield | Bond menggunakan note terlindungi |
| Tautan dari penambang kamu ke finalizer kamu | Tidak di on chain | Tidak ada dalam protokol yang menuliskannya |

## Stake ke diri sendiri, atau ke orang lain

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">Bond ke finalizer milikmu sendiri</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">Paling sederhana. Kamu tetap memegang peran operator dan bond tersebut. Seorang observer tetap tidak dapat membuktikan bahwa t-address dan zfinv1 adalah orang yang sama hanya dari data chain saja.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">Bond ke anggota lain</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">Kekuatan voting akan muncul di bawah kunci mereka. Mereka mendapatkan komisi active-finalizer sebesar 10%. Kamu tetap mendapatkan 90% yang terakumulasi pada bond tersebut. Ini adalah pola yang mematahkan tebakan yang jelas.</p>
  </div>
</div>

Sebuah grup dapat menambang pada alamat pembayaran terpisah, melakukan shielding, dan melakukan bonding di antara para anggota. Hal ini membuat klaim "penambang ini adalah finalizer ini" menjadi jauh lebih sulit. Ini tidak menyembunyikan siapa saja finalizer tersebut, dan tidak menyembunyikan proses penambangan.

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
