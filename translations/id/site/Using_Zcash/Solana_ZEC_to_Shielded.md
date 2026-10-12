<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Solana_ZEC_to_Shielded.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Punya ZEC di Solana? Pindahkan ke Zcash terlindungi

Halaman ini ditujukan untuk kamu jika ZEC muncul di dompet Solana milikmu karena kamu memegang ZCAT, atau token Solana lainnya yang memberikan ZEC kepada pemegangnya. Kamu tidak perlu menjual apa pun untuk mengikutinya. Kamu akan memindahkan ZEC yang sudah kamu miliki dari Solana ke dompet Zcash dan akhirnya menjadikannya terlindungi.

Kami menjalankan setiap langkah di bawah ini dengan transfer nyata pada 27 September 2026, dimulai dengan 0.00266336 ZEC di Phantom. Biaya, waktu, dan tampilan layar pada halaman ini adalah apa yang kami lihat.

---

## Apa yang sebenarnya kamu miliki

ZEC di dalam dompet Solana kamu adalah sebuah token di Solana, bukan koin di jaringan Zcash. NEAR OmniBridge menerbitkannya dan menyimpan ZEC asli pada chain Zcash untuk menjaminnya; bridge ini telah aktif di Solana sejak Oktober 2025. Sisi Solananya berjalan menggunakan pesan Wormhole dan NEAR Chain Signatures, bukan pada Zcash light client, sehingga sisi Solana hanya seaman kedua sistem tersebut. Orang-orang menyebutnya sebagai "paper ZEC". Ini melacak harga ZEC, tetapi setiap saldo dan setiap transfer berada di ledger publik Solana di bawah alamat dompet kamu, dan tidak dapat dibuat terlindungi selama aset tersebut berada di sana.

Pastikan bahwa milikmu adalah token yang asli. Di Phantom, ketuk **ZEC** dan gulir ke **Tentang Zcash**. Alamat kontraknya haruslah:

```
A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS
```

![Phantom's About Zcash panel showing the contract address A7bd…QXaS on the Solana network](/content-images/01-phantom-zec-mint-4a718bc213.webp)

Phantom mempersingkatnya menjadi `A7bd…QXaS`, jadi bandingkan karakter pertama dan terakhir, atau cari alamat lengkapnya di [Solscan](https://solscan.io/token/A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS). Token "ZEC" lainnya di dompet kamu, apa pun nama atau logonya, bukanlah yang satu ini. Jangan menyentuhnya.

---

## Mengapa memindahkannya

ZEC terlindungi adalah inti dari Zcash. Saat ZEC kamu berada di dalam pool terlindungi, pengirim, penerima, dan jumlah dari setiap pembayaran terenkripsi pada chain Zcash. Tidak ada seorang pun yang sedang menelusuri explorer dapat melihat saldo kamu.

Kamu sudah memegang ZEC. Memindahkannya ke dalam dompet Zcash akan memberimu bagian yang membuatnya menjadi Zcash, dan ini menghilangkan peran bridge dari proses tersebut: ZEC asli di dompetmu sendiri tidak bergantung pada siapa pun untuk memenuhi penukaran.

[Siapa yang dapat melihat Zcash pembayaran kamu? ](/start-here/who-can-see-your-zcash-payment) menjelaskan secara tepat apa yang tetap tersembunyi.

---

## Pilih dompet Zcash

ZecHub tidak memilihkan satu untukmu. Pilih dari direktori [ZecHubdompet](/wallets), dan periksa dua label pada kartu dompet sebelum kamu menginstalnya:

- **Ironwood: Siap.** Ironwood adalah pool baru tempat ZEC terlindungi masuk sejak peningkatan jaringan [Ironwood](/zcash-tech/ironwood) pada 28 Juli 2026. Pool Orchard yang lebih lama tidak lagi menerima dana baru.
- **Shielding Otomatis.** Berguna jika sebuah pembayaran masuk secara transparan: dompet akan memindahkan ZEC tersebut ke dalam pool terlindungi untukmu. Jangan menganggap label ini sebagai pengganti **Ironwood: Siap**. Sebuah dompet dapat memiliki Shielding Otomatis namun tetap tidak memiliki pool Ironwood (Edge berada dalam kondisi tersebut di direktori saat ini). Sebagian besar dompet lainnya menampilkan tombol **Shield** sebagai gantinya.

Instal dompet dari tautan pada kartu direktorinya, bukan dari hasil pencarian atau iklan. Tulis frasa pemulihan di atas kertas dan simpan secara offline.

Dompet kamu menunjukkan dua jenis alamat:

![A Zcash wallet's Receive screen with a shielded address starting u1 and a transparent address starting t1](/content-images/02-zodl-receive-c98cd378fb.webp)

| Dimulai dengan | Tipe | Apa yang dilihat publik |
|---|---|---|
| `u1` | Unified Address | Tidak ada informasi tentang kamu, tetapi hanya saat pembayaran masuk ke dalam pool terlindungi |
| `t1` | Alamat transparan | Alamat dan jumlah milikmu, selamanya, seperti pada Solana |

Gunakan `u1` yang dilabeli sebagai terlindungi oleh dompet kamu. Sebuah `u1` adalah kumpulan penerima, dan beberapa dompet menyertakan penerima transparan di dalamnya berdampingan dengan yang terlindungi. Pengirim yang hanya dapat membayar ke alamat transparan akan menggunakan alamat tersebut, sehingga pembayaran kamu menjadi publik meskipun kamu telah menempelkan `u1`. Alamat terlindungi dari dompet uji kami tidak memiliki penerima transparan, jadi hal itu tidak akan terjadi. [Pool terlindungi](/using-zcash/shielded-pools) membahas penerima secara lebih mendalam. Beberapa dompet menampilkan `u1` baru setiap kali kamu membuka Receive; itu normal, dan semuanya adalah milik kamu. Tangkapan layar receive dan kolom penerima near.com pada halaman ini menggunakan awalan `u1` yang berbeda karena alasan tersebut.

Kami menggunakan ZODL untuk pengujian kami karena itu adalah dompet yang telah kami siapkan. Hanya dompet yang ditandai oleh direktori sebagai **Ironwood: Ready** yang dapat menerima nilai terlindungi baru.

---

## Pindahkan ke sini

Rute ini memiliki dua bagian: masukkan ZEC kamu ke dalam NEAR Intents dari Phantom, lalu kirimkan ke alamat Zcash kamu. Kami menggunakan [solswap.org](https://solswap.org), sebuah situs berbasis NEAR untuk pengguna Solana, untuk bagian pertama dan [near.com](https://near.com), aplikasi milik NEAR sendiri, untuk bagian kedua. Panduan [Cara melakukan swap untuk ZEC di ](/using-zcash/solswap)Wallet Phantom milik ZecHub membahas layar solswap dengan lebih detail. Jangan gunakan tombol **Swap** milik Phantom untuk hal ini: kamu sudah memegang token tersebut, dan melakukan swap tidak akan memberikan hasil apa pun.

Simpan sedikit SOL di Phantom untuk biaya Solana.

### 1. Deposit ZEC kamu di solswap.org

1. Buka Phantom, buka tab browser, ketik `solswap.org` sendiri dan hubungkan dompet kamu.
2. Ketuk **Deposit**. Atur **Asset** ke **Zcash**, **Network** ke **Solana** dan metode ke **Wallet**.
3. Masukkan jumlahnya (atau ketuk **Max**) dan setujui transaksi di Phantom.

![solswap Deposit screen with Zcash as the asset, Solana as the network and Wallet as the method](/content-images/03-solswap-deposit-425691e62f.webp)

Setoran kami masuk ke dalam blok Solana pada pukul 15:09:08 (UTC+1) dan solswap menampilkannya sebagai **Completed** sembilan detik kemudian.

![solswap deposit history showing Completed, +0.0026 ZEC](/content-images/04-solswap-deposit-complete-be5feaf758.webp)

ZEC kamu sekarang berada di saldo NEAR Intents kamu. Key Phantom memberikan otorisasi untuk setiap perpindahan keluar darinya, solver NEAR Intents melakukan pengiriman, dan NEAR Intents dapat menyimpan saldo untuk peninjauan kepatuhan (lihat catatan kepercayaan di bawah ini).

### 2. Kirim ke alamat Zcash kamu di near.com

solswap juga memiliki halaman **Penarikan**, tetapi tidak berhasil bagi kami. **Jumlah yang diterima** dan **Biaya** tetap bertanda "–" dan tombolnya tidak melakukan apa pun, baik saat kami memilih Zcash maupun Solana sebagai jaringannya.

![solswap Withdraw form with the received amount and fee stuck at a dash](/content-images/05-solswap-withdraw-blank-92c6e64c65.webp)

Jika hal itu terjadi padamu, ZEC milikmu tidaklah tersangkut. Saldo tersebut terikat pada key dompetmu, bukan pada situs webnya, sehingga aplikasi NEAR Intents apa pun yang kamu gunakan untuk masuk dengan dompet tersebut dapat mengaksesnya. Kami menyelesaikannya di near.com:

1. Buka `near.com` dan masuk dengan Phantom dompet yang sama.
2. Saldo solswap kamu muncul di bawah **Move legacy assets** (near.com menyebut saldo dari aplikasi NEAR Intents lama sebagai "legacy"). Ketuk **Withdraw** pada baris ZEC. Kamu tidak memerlukan **Move**.

![near.com Move legacy assets page listing 0.0026 ZEC with Move and Withdraw buttons](/content-images/06-nearcom-legacy-assets-7ee16c5ac4.webp)

3. Atur **Network** ke **Zcash**, tempelkan alamat `u1` dompet kamu sebagai **Recipient** dan periksa enam karakter pertama serta terakhir dengan dompet kamu.

![near.com Withdraw legacy asset form with Zcash as the network and a u1 recipient, receive at least 0.00233164 ZEC, about 2 minutes](/content-images/07-nearcom-withdraw-724ef22b38.webp)

4. Ketuk **Review withdrawal**, baca ringkasannya, dan ketuk **Send**.

![near.com Review send screen: network Zcash, recipient receives at least 0.00233164 ZEC, fee 0 ZEC, you pay 0.00266336 ZEC](/content-images/08-nearcom-review-b6053f675b.webp)

5. Phantom meminta kamu untuk **Sign Message** untuk near.com. Tanda tangan ini adalah apa yang memberikan wewenang kepada NEAR Intents untuk memindahkan saldo kamu. Ini tidak memakan biaya SOL, tetapi bukan berarti hal ini tidak berbahaya: situs yang mirip dapat menampilkan permintaan yang sama dan mengosongkan saldo NEAR Intents kamu dengannya. Sebelum kamu mengetuk **Confirm**, periksa semua hal ini, dan ketuk **Cancel** jika ada satu saja yang gagal:
- Situs yang disebutkan dalam permintaan adalah `near.com`. (Setoran pada langkah 1 adalah permintaan transaksi Phantom biasa dari `solswap.org`; pastikan nama tersebut sama dengan cara yang sama.)
- Buka **Pesan** dan temukan `"verifying_contract": "intents.near"`.
- Pesannya adalah teks yang dapat dibaca seperti pada tangkapan layar. Jika pesannya berupa kumpulan karakter yang tidak terbaca, atau situsnya tidak sesuai dengan yang ada di bilah alamat kamu, tolaklah pesan tersebut.
- Ini tidak akan pernah meminta frasa pemulihan kamu. Proses penandatanganan tidak pernah melibatkan pengetikan frasa tersebut.

![Phantom Sign Message request from near.com on the Solana network](/content-images/09-phantom-sign-message-cb1ce6d20f.webp)

6. near.com menampilkan **Processing send**, **Sending**, dan **Complete**. **View on explorer** membuka catatan NEAR Intents dari transfer tersebut.

![near.com status screen: Sending 0.0023 ZEC, all three steps complete](/content-images/10-nearcom-complete-c641093c46.webp)

![NEAR Intents explorer record: created 3:59:28 PM, withdrawn to the u1 address 4:07:55 PM, with the Zcash withdraw transaction ID](/content-images/11-intents-explorer-f93f87814e.webp)

### Berapa biaya pengujian kami dan berapa lama waktu yang dibutuhkan

| | Tes kami |
|---|---|
| ZEC disetorkan dari Phantom | 0.00266336 ZEC |
| ZEC diterima di dompet Zcash | 0.00241336 ZEC, terlindungi |
| Biaya di sisi ZEC | 0.00025 ZEC (near.com menunjukkan "Fee 0 ZEC"; biaya sudah termasuk dalam penawaran) |
| SOL yang dihabiskan untuk setoran | 0.00156844 SOL, di mana 0.00008 SOL adalah biaya jaringan |
| Minimum | Tidak ada yang tercapai. solswap mencantumkan setoran minimum sebesar 0.00000001 ZEC, dan near.com menerima 0.0026 ZEC |
| Setoran, Phantom ke solswap | 9 detik |
| Penarikan, menandatangani di near.com ke ZEC di dompet Zcash | Sekitar 8 menit (near.com memperkirakan sekitar 2) |

Catatan: Deposit Solana [5ijsgRrh…AjLkx](https://solscan.io/tx/5ijsgRrhViNTtFMmnsfJDSo3HhRmt3Ri7WB513oBoQLxfGNswDxvHnakwW1yyqXznTTCSxnUkooAHDKowz9AjLkx), NEAR Intents [79c23cfd…a405a9](https://explorer.near-intents.org/transactions/79c23cfd43928de5522c182e26f8f052dc9c43d53430ca497b40e016a6a405a9), Zcash [28d6da27…481034](https://mainnet.zcashexplorer.app/transactions/28d6da27d74dc91e45175a7aff6023bc85578603dd77f1b49782a28f8f481034) di blok 3,498,141. Biaya dan waktu berubah sesuai dengan beban jaringan, jadi layar peninjauan adalah keputusan akhir saat kamu melakukannya.

Bridge milik NEAR menetapkan minimum 0.01 ZEC dan biaya 0.00047 ZEC untuk penarikan Zcash standarnya. near.com tidak menerapkan keduanya pada 0.0026 ZEC kami. Jika sebuah aplikasi menolak jumlah kecil, cobalah near.com sebelum kamu melakukan top up.

### Rute lainnya dan apa yang dipercayai oleh masing-masing rute tersebut

Setiap rute keluar dari Solana mempercayai OmniBridge, karena bridge tersebut menyimpan ZEC yang menjamin token kamu. Selain itu:

- **Rute di atas** mempercayai NEAR Intents. Tanda tangan kamu mengotorisasi transfer, solver mengirimkan ZEC di sisi Zcash, dan NEAR Intents dapat menahan dana untuk peninjauan kepatuhan; pada tahun 2026, seorang pemegang Zcash [melaporkan sebuah swap besar yang ditahan selama berminggu-minggu](https://www.cryptotimes.io/2026/09/11/zcash-holder-says-589k-usdt-stuck-on-near-intents-50-days-after-zodl-swap/). Kamu juga menghubungkan dompet kamu ke dua situs web, jadi periksa bilah alamat setiap saat.
- **Dompet dengan NEAR Intents bawaan** (cari fitur NEAR Intents di direktori [](/wallets)) menggunakan sistem yang sama dari dalam dompet Zcash. Kepercayaan yang sama, lebih sedikit situs web. Kami tidak menguji ini dengan ZEC di Solana.
- **Sebuah exchange**, hanya jika ia menerima deposit token ini di jaringan Solana, yang mana sebagian besar tidak bisa. Kamu menyerahkan kustodial dan biasanya identitas kamu, dan banyak exchange hanya mengirim ZEC ke alamat `t1`. Lihat [exchange kustodial](/using-zcash/custodial-exchanges).

---

## Lindungi dan periksa

Aset tersebut tiba dalam keadaan terlindungi. ZEC milik kami dikirim ke alamat `u1` dan langsung masuk ke Ironwood shielded pool. Tidak ada langkah transparan dan tidak ada yang perlu dilindungi secara manual. Dompet mencatatnya sebagai **Receiving…** dengan ikon shield pada pukul 16:07 (UTC+1) saat sedang mengumpulkan konfirmasi.

![Zcash wallet activity showing Receiving 0.00241336 ZEC with a shield icon](/content-images/12-zodl-receiving-cb9f41511d.webp)

Untuk mengeceknya sendiri, buka transaksi tersebut di dompet kamu dan salin ID transaksi tersebut.

![Zcash wallet transaction details with the transaction ID and timestamp](/content-images/13-zodl-tx-details-b08434d680.webp)

Tempelkan ke dalam [block explorer Zcashdari ](https://mainnet.zcashexplorer.app). Jangan bingung dengan ringkasannya. Milik kami menunjukkan **Shielded Inputs / Outputs 0 / 0** dan **Transferred from/to shielded pool 0.0 ZEC**, karena ringkasan explorer belum menghitung Ironwood. Alamat `t1` yang kamu lihat berada di sisi pengirim (ZEC yang telah dibelanjakan dan kembalian yang disimpan), bukan milikmu.

![Explorer summary for the transaction: two transparent inputs, one transparent output, 0/0 shielded](/content-images/14-explorer-summary-6153afb265.webp)

Klik **Raw TX: JSON** dan cari `ironwood`. Nilai `valueBalance` negatif di sana menunjukkan ZEC yang memasuki pool Ironwood. Milik kami adalah `-0.00241336`, tepat seperti apa yang tiba, dan tidak ada satu pun dalam transaksi tersebut yang menunjukkan siapa penerimanya.

![Raw transaction JSON with the ironwood section highlighted: valueBalance -0.00241336 (highlight added)](/content-images/15-explorer-raw-ironwood-8ff8ae0892.webp)

Apa yang dapat dilihat oleh [ block explorer ](/zcash-tech/what-a-block-explorer-can-see) menjelaskan sisa dari field lainnya.

### Jika kamu menempelkan alamat `t1`

Kita tidak mengirim ke salah satunya, tetapi hasilnya dapat diprediksi. ZEC akan masuk ke saldo transparan dompet kamu, dan explorer akan menunjukkan alamat `t1` kamu serta jumlahnya kepada siapa pun, secara permanen. Dompet dengan fitur shielding otomatis kemudian akan memindahkannya ke dalam pool terlindungi; jika tidak, ketuk **Shield**, yang memerlukan biaya jaringan kecil. Transaksi shielding tersebut juga bersifat publik, karena melakukan pengeluaran dari alamat `t1` kamu. Tidak ada yang hilang, tetapi tautan antara deposit tersebut dan dompet kamu tetap ada di dalam chain. Tempelkan `u1`.

---

## Tetap aman

Pemegang baru menjadi target. Hampir setiap penipuan yang akan kamu lihat adalah salah satu dari ini:

- **Tipe alamat salah.** Alamat Zcash dimulai dengan `u1`, `t1`, `zs` atau `tex1`. Alamat Solana tidak memiliki awalan tersebut. Jangan pernah mengirim ZEC asli ke alamat Solana, dan jangan pernah mengirim token Solana ke alamat Zcash.
- **Layanan khusus transparan.** Beberapa bridge, situs swap dan exchange hanya dapat mengirim ke alamat `t1`. Hal ini bisa dilakukan jika kamu melakukan shielding pada ZEC segera setelah dana tiba. Jangan biarkan dana tersebut tetap di sana.
- **Dompet palsu.** Instal hanya dari tautan pada kartu [direktori dompet](/wallets) atau daftar app store resmi yang ditujunya. Aplikasi dompet crypto palsu bisa saja menyusup ke app store, dan tampilannya terlihat persis seperti yang asli.
- **Phishing frasa pemulihan.** Tidak ada dompet, bridge, situs swap, agen dukungan, moderator atau airdrop yang pernah membutuhkan frasa pemulihan kamu. Menandatangani pesan tidak pernah melibatkan pengetikan frasa tersebut. Siapa pun yang memintanya sedang mencoba mencuri darimu. [Memulihkan dana](/using-zcash/recovering-funds) membahas versi penipuan "kami akan memulihkan dompetmu" ini.
- **Token scam dan situs "claim".** Token bernama ZEC, Zcash atau yang serupa muncul di dompet Solana tanpa diminta, sering kali dengan tautan untuk "claim" lebih banyak. Menghubungkan dompet kamu ke tautan tersebut dapat menguras isinya. Periksa alamat kontrak dari bagian atas halaman ini dan abaikan yang lainnya.
- **Permintaan tanda tangan berbahaya.** Permintaan "Sign Message" dapat memindahkan saldo NEAR Intents kamu tanpa biaya SOL apa pun. Hanya tanda tangani di `near.com` atau `solswap.org`, dan hanya ketika pesan tersebut menyebutkan `intents.near` (langkah 5 di atas menunjukkan apa yang harus diperiksa).
- **Situs tiruan.** Ketik `solswap.org` dan `near.com` sendiri atau gunakan bookmark. Jangan ikuti tautan dari DM, balasan atau iklan.

---

## Apa yang harus dilakukan dengan ZEC terlindungi

- Jaga privasi saat kamu membelanjakannya: [Menggunakan ZEC secara privat](/guides/using-zec-privately)
- Temukan tempat yang menerimanya: [Tempat untuk membelanjakan ZEC](/using-zcash/spend-zcash/top-10-places-to-spend-zec)
- Kirim dengan pesan pribadi terlampir: [Memo](/using-zcash/memos)
- Bayar seseorang tanpa menghubungkan identitasmu: [Kirim uang tanpa menghubungkan identitas](/zcash-use-cases/send-money-without-linking-identity)