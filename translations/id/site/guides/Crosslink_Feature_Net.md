<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Bergabung dengan Crosslink Feature Net

## Ringkasan

- Feature Net adalah jaringan pengujian publik Shielded Labs untuk [Crosslink](/zcash-tech/crosslink-protocol), lapisan finalitas yang diusulkan dan menambahkan staking di samping proof-of-work milik Zcash.
- Jaringan ini menggunakan koin uji, cTAZ. Tidak ada yang kamu lakukan di dalamnya yang memindahkan atau mempertaruhkan ZEC mainnet.
- Satu aplikasi desktop berperan sebagai node, penambang, dompet, dan finalizer. Aplikasi ini menambang cTAZ secara default dan memiliki tombol faucet.
- Staking, unstaking, dan penarikan hanya berfungsi selama "Staking Day", yaitu satu hari setiap tiga hari. Jika kamu melewatkannya, kamu harus menunggu hari berikutnya.
- Untuk melakukan staking, kamu menempelkan identitas finalizer dan mengeklik jumlah. Panduan ini menggunakan finalizer milik ZecHub sebagai contoh.
- Dua panggilan RPC menunjukkan posisimu: `wallet_staking_positions` dan `get_tfl_recency_status`.

*Diuji dengan Feature Net versi 14 pada Windows 11 (versi 10.0.26200.9550), dari 8 hingga 10 Oktober 2026. Perangkat lunak ini adalah prototipe dan berubah pada setiap rilis. Jika yang kamu lihat berbeda dari halaman ini, percayai hasil penggunaanmu sendiri dan silakan buka PR.*

## Apa itu Feature Net

Crosslink adalah sebuah proposal, dan belum menjadi bagian dari Zcash saat ini. FAQ Shielded Labs [Crosslink](https://shieldedlabs.net/crosslink-faq/) menyatakan bahwa proposal ini "perlu melalui proses tata kelola Zcash standar" sebelum dapat mencapai mainnet. Halaman [Crosslink Protocol](/zcash-tech/crosslink-protocol) menjelaskan desainnya.

Untuk mencoba desain tersebut bersama pengguna nyata, Shielded Labs menjalankan apa yang disebutnya [incentivized feature nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/): "serangkaian testnet dengan insentif". Terdapat tiga peran di jaringan ini, dan aplikasi desktop dapat menjalankan semuanya:

| Peran | Fungsinya |
|---|---|
| Penambang | Menghasilkan blok proof-of-work, seperti pada Zcash saat ini |
| Staker | Mengunci cTAZ dalam obligasi delegasi dan mengarahkannya ke finalizer |
| Finalizer | Memilih untuk memfinalkan blok. Kekuatan suaranya adalah stake yang didelegasikan kepadanya |

Repositori di baliknya dibuka dengan penafian yang patut dibaca sebelum kamu memasang apa pun: repositori ini "ada untuk membuktikan gagasan, bukan untuk mendemonstrasikan rekayasa produksi" dan merupakan "kode yang belum siap produksi" ([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). Jalankan pada mesin yang sesuai untuk risiko tersebut.

### Perubahan pada versi 14

[Version 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) dirilis pada 1 Oktober 2026. Jaringannya dimulai sebagai proof-of-work biasa dan mengaktifkan Crosslink dalam tiga tahap ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), juga ditampilkan di [ctaz.cash](https://ctaz.cash/v14)):

| Blok | Yang terjadi |
|---|---|
| 20,736 | Staking dibuka |
| 34,560 | Daftar awal finalizer diambil dari stake yang ada di chain |
| 36,288 | Finalitas BFT dimulai, beserta reward staking |

Reward staking dimulai pada blok terakhir tersebut. Obligasi yang dibuat lebih awal tidak menghasilkan apa pun hingga saat itu ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

Rilis yang sama membatasi daftar aktif menjadi 12 finalizer dengan stake terbanyak ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)) dan, menurut catatan rilisnya, memberi mereka komisi: "10% dari seluruh PoS Rewards dalam sebuah blok masuk ke komisi ini, sementara 90% didistribusikan ke seluruh obligasi staking".

### cTAZ dan ZEC asli

cTAZ ("Crosslink TAZ") adalah koin uji milik Feature Net. Kamu melakukan staking cTAZ, bukan ZEC.

ZEC asli hanya terlibat pada akhirnya. Shielded Labs telah [menyisihkan 500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) untuk feature nets, dan [release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) menyatakan bahwa koin tersebut dibayarkan "secara pro rata semata-mata berdasarkan jumlah cTAZ yang diperoleh setiap peserta melalui penambangan atau staking". Ada dua konsekuensi:

- **Koin faucet tidak dihitung.** cTAZ yang kamu terima, baik dari faucet maupun orang lain, tidak menghasilkan apa pun hanya dengan berada di dompetmu. Hanya reward blok dari penambangan dan staking yang dihitung.
- **Pembayaran harus diklaim, bukan otomatis.** Shielded Labs mengumumkan setiap putaran di [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210). Untuk Putaran 2, peserta diminta mengirim viewing key dompet mereka dan alamat mainnet sebelum 4 Oktober 2026 ([post 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). Jaringan yang dijalankan versi 14, yaitu jaringan yang digunakan panduan ini, diumumkan sebagai Putaran 3 ([post 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## Sebelum memulai

- **Komputer yang dapat kamu biarkan menyala.** Rilis ini menyediakan build untuk Windows, macOS, Ubuntu, dan Arch Linux. Panduan ini dijalankan pada Windows, pada PC dengan prosesor Intel Core i5-8350U.
- **Staking Day.** Periksa kapan hari berikutnya dibuka sebelum merencanakan apa pun. [Staker Space's dashboard](https://crosslink.staker.space/) menghitung mundur hingga saat itu.
- **Tidak ada yang lain.** Tidak perlu ZEC, akun, maupun pendaftaran.

## Langkah 1: Unduh aplikasi dan periksa file

1. Buka [version 14 release](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) dan gulir ke **Assets**.
2. Unduh file untuk sistemmu. Pada Windows, file tersebut adalah `zebrad_v14_win32.exe`.
3. Bandingkan SHA-256 file dengan digest yang ditampilkan GitHub di samping aset tersebut.

Pada Windows, di PowerShell:

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

Digest yang ditampilkan GitHub untuk file tersebut adalah `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`. Heksadesimal tidak peka terhadap huruf besar-kecil, jadi huruf kapital di atas tidak masalah. Agar shell yang membandingkan, bukan matamu:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

Pahami nilai pemeriksaan ini. Rilis tersebut tidak memiliki tanda tangan, sehingga hash yang cocok hanya memberitahumu bahwa unduhan lengkap dan merupakan file yang disajikan GitHub. Hash tersebut tidak memberitahumu siapa yang membuatnya. [Verifying Zcash Releases](/guides/verifying-zcash-releases) menjelaskan perbedaannya.

## Langkah 2: Jalankan node dan biarkan melakukan sinkronisasi

Jalankan aplikasi dari terminal agar pesan startup-nya tetap tampil di layar. Gunakan jendela PowerShell biasa, bukan jendela yang dibuka dengan "Run as administrator": ini adalah perangkat lunak prototipe tanpa tanda tangan dan tidak memerlukan hak administrator.

```powershell
.\zebrad_v14_win32.exe
```

Sebuah jendela berjudul "Zcash Crosslink Visualizer" terbuka. Dompet berada di kiri, dengan tab **Your Wallet** dan **Faucet Wallet**, chain digambar di tengah, dan finalizer tercantum di kanan. Terminal terus mencetak log node. Biarkan keduanya terbuka selama kamu menggunakan jaringan.

Catatan rilis menautkan [video pemasangan Windows](https://www.youtube.com/watch?v=cO-5Oa4B1Tk).

Aplikasi menyimpan datanya dalam folder cache: `%LOCALAPPDATA%\zebra` pada Windows, `~/.cache/zebra` pada Linux, dan `~/Library/Caches/zebra` pada macOS, menurut catatan rilis.

**Simpan rahasia itu untuk dirimu sendiri.** Folder tersebut menyimpan file bernama `secret.seed`. Aplikasi membuatnya saat pertama kali dijalankan ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) dan menurunkan dompet serta identitas finalizer-mu darinya ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). Aplikasi juga memiliki tombol **Copy Seed** yang menempatkan rahasia yang sama ke clipboard-mu. Siapa pun yang memiliki salah satunya mengendalikan dompetmu. Jangan pernah menempelkannya ke chat, postingan forum, atau tangkapan layar.

### Cara mengetahui bahwa kamu sudah tersinkronisasi

Catatan rilis menyatakan bahwa tidak ada "pemantauan bawaan untuk mengetahui seberapa dekat sinkronisasi kamu dengan tip jaringan". Versi 14 memang memiliki beberapa pemantauan: menu drop-down **Network Info** di bagian atas jendela memiliki baris untuk PoW Height, Wallet Sync, dan Blocks Behind Known PoW ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). Bandingkan tinggi blokmu dengan yang ada di [Staker Space](https://crosslink.staker.space/) atau [ctaz.cash](https://ctaz.cash/).

Node juga menjawab melalui RPC:

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"getblockcount","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  36490
}
```

Port RPC `127.0.0.1:8232` terbuka secara default pada build ini dan tidak memerlukan kata sandi ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). Port tersebut hanya mendengarkan pada mesinmu sendiri, dan apa pun yang berjalan pada mesin tersebut dapat memanggilnya.

Pada pengujian ini, sinkronisasi pertama, dari blok 0 hingga tip di sekitar blok 28.400, membutuhkan sekitar 50 menit.

**Setelah restart, saldo kamu akan terbaca nol untuk sementara waktu.** Setiap kali aplikasi dimulai, aplikasi membangun ulang dompet dari `secret.seed` dan memindai kembali chain dari blok 0 ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)). Hingga pemindaian mencapai transaksi-transaksimu, saldo dan stake-mu ditampilkan sebagai 0. Pada pengujian ini, keduanya kembali sekitar 15 menit setelah restart. Dompet faucet dipindai ulang dengan cara yang sama ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)), dan selama pemindaian tab Faucet Wallet menampilkan saldo yang sangat besar. Abaikan keduanya hingga Wallet Sync selesai.

## Langkah 3: Dapatkan cTAZ

### Menambangnya

Menurut catatan rilis, aplikasi mulai melakukan penambangan CPU ke dompetmu sendiri setelah tersinkronisasi. Kamu tidak perlu mengaktifkan apa pun. Koin hasil tambang masuk ke alamat transparan dompetmu sendiri ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

Apakah aplikasi menemukan blok adalah hal lain. Catatan tersebut memperingatkan bahwa "kamu mungkin kalah bersaing dengan orang lain yang menambang lebih cepat, jadi tidak ada jaminan keberhasilan". Secara default, penambang bawaan menggunakan satu thread CPU ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

Untuk menggunakan lebih banyak thread, tetapkan variabel lingkungan pada jendela PowerShell yang sama sebelum menjalankan aplikasi ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). Pengujian ini menggunakan empat:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

Variabel tersebut hanya berlaku selama jendela itu terbuka. Setelah ditetapkan, penghitung prosesor Windows menunjukkan node memakai waktu setara empat hingga lima prosesor, dalam persentase dari satu prosesor logis:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

Hasilnya: sebuah Intel Core i5-8350U yang menambang dengan empat thread, dari awal 8 Oktober hingga sore 9 Oktober, tidak menemukan blok.

### Atau gunakan faucet

Aplikasi memiliki tombol **Receive cTAZ** di kanan bawah. Dalam source versi 14, satu kali tekan mengirim 0,5 cTAZ dari dompet faucet ke dompetmu ([amount](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [send](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). Faucet adalah satu dompet yang dibawa setiap salinan aplikasi ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)), dan tab **Faucet Wallet** menampilkan saldonya.

Tombol hanya diaktifkan jika faucet memiliki lebih dari 5,01 cTAZ dalam koin terlindungi ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). Tab tersebut juga menghitung koin hasil tambang faucet, dan koin tersebut hanya terlindungi dalam lot tepat 10 cTAZ ditambah biaya ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)), sehingga tab dapat menunjukkan saldo besar sementara tombol tetap abu-abu. Pada pengujian ini, tombol tetap abu-abu pada 8 dan 9 Oktober, dengan tulisan "The faucet is mining more funds." saat diarahkan kursor, sementara tab menampilkan 14.74695 cTAZ.

**Saat tombol berwarna abu-abu, tanyakan kepada node-mu sendiri.** Node memiliki metode permintaan faucet, `requestfaucetdonation` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)), yang tidak menerapkan aturan tombol 5,01 cTAZ. Ganti `YOUR_ADDRESS` dengan alamatmu sendiri (alamat tersebut adalah field `address` dari `wallet_spendable_funds`, di bawah):

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"requestfaucetdonation","params":[{"address":"YOUR_ADDRESS"}],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "amount":  50000000
               }
}
```

Balasan tersebut berarti permintaan telah masuk antrean, bukan telah dikirim. Pada pengujian ini, 0,5 cTAZ dari faucet ditambang pada blok 33.306 dan dapat dibelanjakan pada blok 33.322. Mintalah sekali saja: faucet digunakan bersama, dan permintaan kedua untuk alamat yang sama ditolak ketika permintaan pertama masih tertunda ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### Atau minta kepada peserta lain

Siapa pun di jaringan dapat mengirimkan cTAZ kepadamu dengan tombol **Send** aplikasi. Pada pengujian ini, peserta lain mengirim 31 cTAZ. Koin tersebut tiba sebagai "Received" dengan catatan "send from user wallet", yaitu catatan yang dilampirkan oleh Send aplikasi sendiri ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). Tanyakan di [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), dan berikan hanya alamatmu.

Koin faucet dan hadiah cukup untuk mempelajari staking. Keduanya tidak dihitung terhadap reward ZEC.

### Periksa apa yang dapat kamu belanjakan

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Ini adalah balasan setelah 0,5 cTAZ dari faucet tiba, dengan alamat dipersingkat:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "address":  "utest1vqszm53j...mqmdj",
                   "committed_zats":  0,
                   "pending_zats":  0,
                   "spendable_zats":  50000000,
                   "tip_height":  33322,
                   "unshielded_zats":  0
               }
}
```

Jumlah menggunakan satuan zatoshi: 100.000.000 zatoshi setara dengan satu cTAZ. Koin terlindungi memerlukan 3 konfirmasi sebelum dihitung sebagai dapat dibelanjakan ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). Koin dari faucet dan peserta lain masuk ke `spendable_zats`. Koin hasil tambang bersifat transparan, jadi masuk ke `unshielded_zats` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

Satu blok setelah stake kedua dalam pengujian ini, sisa saldo ditampilkan di bawah `pending_zats`. Beberapa blok kemudian, saldo tersebut dapat dibelanjakan kembali.

## Langkah 4: Lakukan staking ke finalizer

### Tunggu Staking Day

Staking, unstaking, dan penarikan hanya diterima ketika

```text
block height mod 10,368 < 3,456
```

yang merupakan jendela 3.456 blok pada awal setiap 10.368 blok. Pada target waktu blok jaringan 25 detik, itu berarti satu hari setiap tiga hari ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)). Jendela pertama versi 14 dibuka pada blok 20.736, 31.104, 41.472, dan 51.840.

Menurut catatan rilis, aplikasi mengumumkan awal dan akhir setiap Staking Day. Dalam pengujian ini, daftar bloknya menunjukkan baris merah "* STAKING DAY END *" di antara blok 34.559 dan 34.560.

**Catatan rilis menyatakan dua hal.** Daftar perubahannya menyebutkan "~1 hari untuk Staking Day dan ~3 hari untuk Staking Cycle", yang sesuai dengan kode. Lebih bawah, bagian yang terbawa dari Season 1 masih menyatakan bahwa Staking Day dimulai setiap 150 blok dan berlangsung selama 70 blok. Ikuti yang pertama. Baris akhir di atas berada pada tempat aturan pertama menutup jendela (34.560 mod 10.368 = 3.456); menurut aturan kedua, blok 34.560 akan berada dalam sebuah jendela.

### Pilih finalizer

Finalizer dinamai berdasarkan identitasnya, sebuah string yang dimulai dengan `zfinv1`. ZecHub menerbitkan identitas finalizer yang dijalankannya di [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json):

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

Salin identitas dari sumber yang kamu percaya. Menurut catatan rilis, aplikasi juga mencantumkan finalizer dalam panel kanan, dengan ikon salin di sebelah kiri masing-masing finalizer.

Setelah kamu melakukan staking, riwayat dompet dan RPC menyebut finalizer dengan kunci hex, bukan identitasnya. Untuk finalizer milik ZecHub, kunci tersebut adalah `2941ef23...266aae8f`.

Pilih finalizer yang kamu percaya. Desain ini tidak memiliki slashing otomatis, tetapi memungkinkan "hard fork yang dikoordinasikan pengguna dan membakar seluruh stake yang didelegasikan kepada finalizer bernama" ([Crosslink book, ikhtisar desain](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

Pilihan ini juga menentukan siapa yang memberikan suara. Setiap obligasi aktif mendapatkan bagian reward staking. Jika finalizer-nya termasuk di antara 12 finalizer dalam daftar, sepersepuluh bagian tersebut diberikan kepada finalizer sebagai komisi. Obligasi yang diarahkan ke finalizer di luar 12 finalizer tersebut mempertahankan seluruh bagiannya, tetapi finalizer itu tidak memberikan suara ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### Staking

1. Salin identitas finalizer.
2. Pada tab **Your Wallet**, tekan **Stake**.
3. Tekan **Paste Identity**. Baris di atas tombol berubah menjadi karakter pertama dan terakhir dari identitas, `[zfinv1j6..YWyzp4YN]` untuk milik ZecHub. Periksa sebelum melanjutkan.
4. Klik jumlah. Jumlah tersedia dalam kenaikan tetap, yang terkecil adalah 0,01 cTAZ, dan hanya jumlah yang tercakup oleh saldomu yang menyala. Dengan 0,5 cTAZ, +0,01 cTAZ dan +0,1 cTAZ menyala.

**Tidak ada yang meminta konfirmasi, dan seolah-olah tidak terjadi apa-apa.** Dalam pengujian ini, menurut penguji: "I clicked it once and nothing happened, it just turned grey and lit up back." Staking telah berhasil dilakukan. Riwayat dompet menunjukkan "Staked @ 33334 to 2941ef23..266aae8f", biayanya 0,00015 cTAZ, dan dompet menunjukkan 0,010 cTAZ Staked. Staking kedua beberapa menit kemudian membuat obligasi kedua, pada blok 33.348.

Setiap staking membuat obligasi delegasinya sendiri. Jumlah tetap dan Staking Day sama-sama ada demi privasi: keduanya membuat stake seseorang lebih sulit dibedakan dari stake orang lain.

## Langkah 5: Periksa posisimu

### Obligasi kamu

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Ini adalah balasan pada blok 36.490, dua hari setelah staking:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "active":  {
                                  "2941ef2309a4156342f285f9302ab601bd4dbd6b3a99b1ecde219207266aae8f":  [
                                                                                                           {
                                                                                                               "create_height":  33334,
                                                                                                               "create_txid":  "6824b24834eb8ca13befb3a817765e512fd25132166f0b38ad096503c4fc5a35",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "128a0ae7fef05e338d6b613939a45cb7773d8e9c98915cadef6fffa898f4e28d"
                                                                                                           },
                                                                                                           {
                                                                                                               "create_height":  33348,
                                                                                                               "create_txid":  "f4d932738ef4104b8663f21e5666e60a0236b117a7883391e9870a0029d25ba2",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "f113e0c15eaf6e89621314d88ed15d9fb035a5afeee4606af7173f9d60c48c0c"
                                                                                                           }
                                                                                                       ]
                              },
                   "withdrawable":  [

                                    ]
               }
}
```

Panggilan ini tidak menggunakan parameter. Panggilan tersebut mengembalikan obligasi aktifmu, yang dikelompokkan menurut kunci finalizer yang didukung setiap obligasi, serta obligasi yang telah selesai unstaking dan dapat ditarik. Setiap obligasi menampilkan jumlah yang di-stake (`initial_val`), nilainya saat ini (`latest_val`), serta transaksi dan tinggi blok yang membuatnya. Reward ditambahkan ke obligasi itu sendiri: pada blok 36.490, setiap obligasi sebesar 1.000.000 zatoshi telah tumbuh menjadi 1.003.451.

**Jendela Edit Stake menampilkan setiap obligasi sepuluh kali terlalu besar.** Dalam pengujian ini, setiap obligasi 0,01 cTAZ terbaca 0,100 cTAZ pada barisnya sendiri, dan 0,1003536 cTAZ setelah reward dimulai, sementara total di atas baris-baris tersebut (0,020 cTAZ, kemudian 0,02007 cTAZ) sesuai dengan RPC. Ikuti total dan RPC.

Jendela yang sama menampilkan segitiga peringatan di samping finalizer, sebelum dan sesudah finalitas dimulai. Dalam source, segitiga tersebut berarti aplikasi kamu tidak menghitung finalizer itu sebagai online, sedangkan finalizer online mendapat ikon Wi-Fi ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)). Obligasi tetap memperoleh reward.

### Finalizer

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Menurut catatan rilis, panggilan ini melaporkan posisi node-mu dalam proses pemungutan suara dan, untuk setiap finalizer, kapan node-mu terakhir mendengar darinya serta bagaimana finalizer tersebut telah memberikan suara.

Sebelum blok 36.288, setiap field bernilai nol dan daftar kosong. Ini adalah balasan pada blok 33.354:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  0,
                   "my_height":  0,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  0,
                   "my_valid_round":  0,
                   "finalizer_statuses":  [

                                          ]
               }
}
```

Setelah finalitas dimulai, daftar tersebut memuat finalizer dalam daftar aktif. Pada blok 36.490, daftar tersebut memuat 12 finalizer, dengan ZecHub milik `2941ef23...` di antaranya, sesuai batas daftar 12 finalizer. Ini adalah awal balasan tersebut, dipotong setelah entri pertama:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  1791628531,
                   "my_height":  8,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  -1,
                   "my_valid_round":  -1,
                   "finalizer_statuses":  [
                                              [
                                                  "8239a79bc2f224f9f2a276a1050ec9945866253be7da4bdf27c4186c8e588dee",
                                                  {
                                                      "no_yes_votes_in_my_height":  [
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ],
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ]
                                                                                    ],
                                                      "highest_round_vote":  0,
                                                      "last_seen_new_info_utc":  0,
                                                      "last_direct_connection_utc":  null
                                                  }
                                              ],
```

Beberapa menit kemudian, panel kanan aplikasi menunjukkan "Finalizers (23)".

### Pada Linux dan macOS

[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) memberikan panggilan dalam bentuk `curl`. Ubah nama metode untuk panggilan lainnya. Bentuk ini tidak dijalankan untuk panduan ini:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

Pada Linux, catatan rilis menyatakan bahwa kamu kemungkinan perlu memasang `xclip` sebelum salin dan tempel berfungsi di aplikasi.

### Satu nama RPC yang perlu diperhatikan

Catatan rilis versi 14 menjelaskan panggilan staking bernama `wallet_staking_action` yang menerima sebuah objek. Source code versi 14 tidak memiliki metode dengan nama itu, dan dalam pengujian ini node menjawab:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "error":  {
                  "code":  -32601,
                  "message":  "Method not found"
              }
}
```

Metode staking yang didaftarkannya adalah [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420), yang menerima satu string berisi permintaan sebagai JSON, dengan finalizer diberikan melalui identitas `zfinv1` miliknya ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). Metode ini tidak dicoba untuk panduan ini.

## Unstake dan tarik

Obligasi tidak dapat dibatalkan pada hari pembuatannya. Prosesnya membutuhkan tiga Staking Day dari awal hingga akhir: melakukan staking pada satu hari, melakukan unstaking pada hari berikutnya, dan menarik pada hari ketiga. Catatan rilis menambahkan bahwa satu obligasi tidak dapat menjalani dua tindakan staking dalam Staking Day yang sama.

*Tidak dijalankan untuk panduan ini. Dari catatan rilis versi 14:* untuk melakukan unstaking, tekan **Edit Stake**, pilih obligasi dari daftar Staked Bonds, lalu klik ikon rantai. Untuk menarik pada Staking Day berikutnya, tekan **Edit Stake**, pilih obligasi dari daftar Withdrawable Bonds, lalu klik ikon uang. Memindahkan obligasi ke finalizer lain, yang disebut catatan tersebut sebagai retargeting, diizinkan kapan saja.

## Tempat memantau jaringan

Tab [Crosslink di ZecHub Tools](https://zechub.wiki/tools?tool=crosslink) mengumpulkan alat di satu tempat, di bawah pemberitahuan yang berbunyi "Staking on this network does not move ZEC":

- Dihosting, tanpa memerlukan node: [Staker Space](https://crosslink.staker.space/), sebuah "dashboard langsung untuk testnet cTAZ saat ini" dengan tinggi blok, penambang, solution rate, hitung mundur Staking Day, dan finalitas, serta [ctaz.cash](https://ctaz.cash/), dengan produksi penambangan, daftar finalizer, peer, dan klaim nama alamat staking.
- Pada mesinmu sendiri: `zcash-explorer`, yang halaman `/live/crosslink`-nya menampilkan aktivasi, keterlambatan finalitas, daftar aktif, dan posisi staking, serta `crosslink_indexer`, sebuah indeks SQLite dari node Crosslink.

## Kesalahan umum

**Merencanakan berdasarkan jam, bukan tinggi blok.** Staking Day dihitung dalam blok. Pantau hitung mundur dashboard, bukan kalender.

**Melakukan staking pada menit-menit terakhir jendela.** Aturan diperiksa terhadap blok yang memasukkan transaksimu ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)), sehingga stake harus ditambang sebelum jendela ditutup, bukan sekadar dikirim.

**Berharap dapat menambang stake-mu.** Penambang CPU empat thread pada Intel Core i5-8350U tidak menemukan blok antara 8 dan 9 Oktober. Dapatkan cTAZ pertamamu dari faucet atau peserta lain.

**Mengeklik lagi karena tampaknya tidak terjadi apa-apa.** Setiap klik pada jumlah membuat obligasi baru. Periksa riwayat dompet atau `wallet_staking_positions` terlebih dahulu.

**Panik setelah restart.** Saldo dan stake-mu terbaca nol hingga dompet selesai memindai ulang. Tunggu hingga Wallet Sync selesai.

**Menganggap cTAZ sebagai uang mainan, atau rahasia sebagai sesuatu yang tidak berbahaya.** cTAZ adalah koin uji, tetapi cTAZ yang kamu peroleh menentukan bagianmu dari ZEC asli. Lindungi `secret.seed` sebagaimana kamu melindungi dompet.

**Membaca instruksi lama.** Catatan rilis memuat teks dari season sebelumnya di samping aturan baru. Jika teks tersebut tidak sesuai dengan perilaku node-mu, node-mu yang benar.

## Halaman terkait

- [Crosslink Protocol](/zcash-tech/crosslink-protocol) - desain yang diuji jaringan ini
- [Shielded Labs](/zcash-organizations/shielded-labs) - tim di balik Crosslink
- [Verifying Zcash Releases](/guides/verifying-zcash-releases) - hal yang dibuktikan dan tidak dibuktikan oleh checksum
- [Zebra Full Node](/zcash-tech/zebra-full-node) - node yang menjadi dasar aplikasi Feature Net
- [Zcash Testnet](/using-zcash/testnet) - jaringan pengujian Zcash biasa, yang merupakan jaringan berbeda

## Sumber

- [Version 14 release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 1 Oktober 2026
- [Crosslink: Incentivized Feature Nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2 April 2026
- [Crosslink: Incentivized Feature Net](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), Zcash Community Forum
- [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [The Crosslink book](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*Langkah-langkah pada halaman ini dijalankan dengan Feature Net versi 14 pada Windows 11 (versi 10.0.26200.9550), dari 8 hingga 10 Oktober 2026. Pernyataan yang mengutip catatan rilis atau source code diambil dari keduanya. Apa pun yang ditandai "not run" tidak dicoba.*
