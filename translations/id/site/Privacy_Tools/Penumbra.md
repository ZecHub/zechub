# Penumbra 

Penumbra adalah jaringan layer-1 proof-of-stake yang sepenuhnya terlindungi dan exchange terdesentralisasi dalam ekosistem Cosmos. Pool terlindungi interchain-nya dapat menyimpan aset dari chain yang terhubung dengan IBC. Pengguna dapat mentransfer, melakukan staking, swap, dan menyediakan likuiditas di dalam Penumbra tanpa memublikasikan saldo akun masing-masing atau mengaitkan tindakan tersebut dengan identitas mereka. Ini tidak berarti bahwa setiap bagian data jaringan atau DEX bersifat privat.

![image.png](/content-images/_unavailable.svg)

## Teknologi yang digunakan dalam IBC Penumbra 

Integrasi IBC: Protokol Inter-Blockchain Communication (IBC) menghubungkan Penumbra dengan chain lain yang mendukung IBC. Transfer IBC masuk melindungi dana saat memasuki Penumbra; transfer keluar menghapus perlindungannya saat dana keluar. Aktivitas pada chain mitra yang transparan tetap bersifat publik, termasuk alamat tujuan dari deposit masuk. [Batas privasi mengikuti batas IBC](https://guide.penumbra.zone/overview/interchain-privacy).

Proof Zero-Knowledge (ZKP): Penumbra menggunakan proof zero-knowledge di sisi klien untuk menunjukkan bahwa pembaruan status terenkripsi valid tanpa memublikasikan data transaksi pribadi pengguna. Dompet memindai dan mendekripsi data yang terlihat oleh mereka secara lokal; node publik tidak dapat begitu saja mengembalikan saldo pribadi pengguna.

![image.png](/content-images/_unavailable.svg)

Exchange Terdesentralisasi dengan Privasi: Penumbra mencakup DEX untuk memperdagangkan aset di dalam pool terlindunginya. Hasil swap individual bersifat privat, sedangkan hasil eksekusi batch dan posisi likuiditas anonim bersifat publik. Perbedaan ini penting saat menjelaskan apa yang disembunyikan oleh exchange.

## Use Case

Transaksi aman: Transfer di dalam pool terlindungi Penumbra melindungi pengirim, penerima, jumlah, dan jenis aset. Pengguna dapat mengungkapkan aktivitas secara selektif kepada pihak ketiga yang berwenang. Membagikan alamat penerimaan saja tidak mengungkapkan saldo pemiliknya. Karakteristik ini tidak berlaku untuk aktivitas publik di chain lain setelah dana ditarik.

Staking: Token staking native Penumbra adalah **UM**. Mendelegasikan UM kepada validator menghasilkan token delegasi yang mewakili bagian dalam pool delegasi validator tersebut. Total stake di pool setiap validator bersifat publik, sedangkan delegasi individual bersifat anonim. Undelegasi mula-mula menciptakan token unbonding khusus validator, yang tetap rentan terhadap slashing hingga penundaan unbonding berakhir. Lihat panduan resmi [staking terlindungi](https://guide.penumbra.zone/overview/staking).

Swap token: Intent swap dikelompokkan berdasarkan pasangan perdagangan dan dieksekusi sebagai batch pada akhir setiap blok. Ini menghilangkan pengurutan intent swap di dalam blok sebagai sarana bagi trader; ini adalah mekanisme khusus, bukan jaminan bahwa tidak ada bentuk MEV yang dapat ada. Hasil batch ditulis ke status chain publik, dan pengguna secara privat mengklaim bagian hasil mereka ke dalam pool terlindungi. [Panduan DEX](https://guide.penumbra.zone/overview/dex) menjelaskan eksekusi batch dan arbitrase otomatis protokol.

Pembuatan pasar: Penyedia likuiditas membuat posisi likuiditas terkonsentrasi yang anonim. Likuiditas dan fungsi perdagangan posisi tersebut bersifat publik, tetapi tidak dikaitkan dengan identitas penyedia.
