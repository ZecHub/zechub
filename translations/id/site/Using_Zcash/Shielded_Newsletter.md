<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Newsletter Terlindungi

> Kirim catatan markdown ke daftar alamat terlindungi sebagai memo Zcash, menggunakan Zallet. Daftar penerima dan catatan tersebut tetap tersembunyi dari alamat transparan.

Newsletter terlindungi adalah serangkaian transaksi terlindungi. Setiap output membayar sejumlah kecil ke penerima Unified Address dan membawa potongan catatan berikutnya di bidang memo. Zallet membangun dan mengirimkan transaksi tersebut. Zebra dan Zaino hanya menyediakan data chain.

Skrip tersebut berada di [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter). Skrip ini ditulis untuk Zallet versi awal dan tidak aman untuk dijalankan apa adanya terhadap rilis saat ini. Halaman ini adalah prosedur yang telah diperbarui. Telah diperiksa terhadap Zallet `v0.1.0-beta.3` dan buku Zallet per 7 Oktober 2026.

## Apa yang kamu butuhkan

- Zebra tersinkronisasi sepenuhnya, dengan RPC yang terikat ke localhost.
- Zaino tersinkronisasi terhadap Zebra node tersebut.
- Zallet `v0.1.0-beta.3` atau yang lebih baru, build dompet, dengan RPC miliknya yang terikat ke localhost. Buku ini mencantumkan `z_sendmany` sebagai yang telah diimplementasikan. Biaya numerik akan ditolak: jika kamu memasukkan `fee`, nilainya harus `null`, karena Zallet selalu menggunakan biaya ZIP 317.
- Akun terisi dana yang Unified Address dapat membelanjakan dana terlindungi.
- Alamat Terpadu Penerima. Sebuah memo pada alamat transparan adalah sebuah kesalahan.

Jangan menaruh alamat yang terisi dana atau cookie di dalam wiki atau dalam script yang di-commit. `txBuilderFromFile.sh` saat ini memiliki Unified Address yang tertulis secara hardcoded. Ganti secara lokal dan jangan melakukan commit.

## Konfigurasi Zallet

Buat sebuah konfigurasi dengan Zallet yang sedang kamu jalankan, lalu arahkan ke Zebra dan Zaino. Contoh dalam tutorial lama menggunakan `as_of_version = "0.0.0"` dan path home pribadi. Perlakukan file tersebut sebagai snapshot, bukan template.

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help` harus mencantumkan `z_sendmany`, `z_getoperationstatus`, dan `z_getoperationresult`. Ikat RPC hanya ke `127.0.0.1`.

## Daftar penerima

Satu Unified Address per baris, tanpa tanda kutip, tanpa baris kosong. Skrip tersebut membaca `daoAddresses.md`. Readme lama menyatakan `daoAddress.md`. File tersebut tidak ada di repo, dan nama-namanya tidak cocok.

```text
u1...
u1...
```

## Kirim satu memo

`z_sendmany` bersifat asinkron. Ini mengembalikan sebuah id operasi. Lakukan polling pada `z_getoperationstatus` sampai statusnya menjadi `success` atau terjadi error. Jeda tetap selama 5 detik, seperti yang dilakukan oleh skrip ini, akan kehilangan hasil jika proses build memakan waktu lebih lama. `z_getoperationresult` mengonsumsi operasi tersebut, jadi jangan memanggilnya sampai statusnya mencapai terminal.

Biaya dihilangkan. Zallet menghitung ZIP 317. Jangan masukkan angka.

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

Field memo adalah hex mentah, maksimal 512 byte. `ascii2hex` hanya mengodekan ASCII. Catatan dengan karakter non-ASCII apa pun akan gagal. `xxd` atau `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` menangani UTF-8.

Kebijakan privasi secara default adalah `FullPrivacy`. Itu adalah pengaturan default yang tepat untuk penerima terlindungi. Jangan sertakan `AllowFullyTransparent`.

## Cacat skrip

Ini ada di dalam tree per 8 Oktober 2026. Jangan jalankan `shieldNewsletter.sh` sampai semuanya diperbaiki.

- `[[ bytesInFile -lt 512 ]]` kehilangan `$`. Cabang single-memo tidak pernah dijalankan.
- Loop chunk menyimpan hex, lalu `hex2ascii` mendekodenya, kemudian `txBuilderFromFile.sh` mengodekannya kembali. Chunk terakhir tidak dikosongkan kecuali baris berikutnya melampaui 512. Baris yang panjang tidak dipecah. Baris tersebut dikirim secara utuh dan dapat melebihi memo sebesar 512-byte.
- `txBuilderFromFile.sh` memanggil `./zallet rpc` tanpa path konfigurasi, dan mengharapkan binary berada di direktori saat ini. Gunakan `zallet -c <config> rpc`.
- `toCurl.sh` berkomunikasi dengan Zebra pada port 8232 dengan sebuah cookie, dan memanggil `getinfo` serta `sendmany`. Zallet tidak menyediakan `sendmany`. Loop mine-wait juga menggunakan `[[ chainHeight -gt temp ]]` tanpa `$`, sehingga ia tidak menunggu.
- `z_gettotalbalance 0 true` dilewatkan sebagai argumen posisi tambahan. Periksa `rpc help z_gettotalbalance` pada binary yang kamu jalankan sebelum menggunakan panggilan tersebut.
- Setiap chunk mengirimkan `0.0001` ZEC ke setiap penerima. Biaya ZIP 317 ditambahkan di atasnya. Catatan panjang ke banyak alamat menghabiskan lebih banyak daripada jumlah dust.

## Setelah perbaikan

Runner yang telah diperbaiki harus:

1. Baca catatan sebagai byte dan bagi pada batas 512-byte, bukan pada baris.
2. Lakukan hex-encode pada setiap chunk satu kali.
3. Panggil `zallet -c <config> rpc z_sendmany` dengan UA yang telah didanai, array penerima, dan tanpa argumen biaya.
4. Pantau `z_getoperationstatus` untuk id operasi tersebut.
5. Catat txid hanya setelah `success`.

Halaman tutorial lama tetap berada di [Skrip Newsletter Terlindungi](https://github.com/ZecHub/zechub/blob/main/site/tutorials/shieldedNewsletter/readme.md). Gunakan halaman ini untuk prosedurnya.
