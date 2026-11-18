<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Mengekspor Riwayat Transaksi dari Viewing Key

Sebagian besar ekspor dompet hanya memuat sedikit informasi. Ekspor pajak ZODL, misalnya, memberikan tanggal, jumlah, dan biaya untuk tahun kalender sebelumnya, tetapi tidak menyertakan ID transaksi, memo, atau alamat. Informasi itu tidak cukup untuk pembukuan, memeriksa migrasi dompet, atau mencari tahu apa yang terjadi pada suatu pembayaran.

Kamu tidak memerlukan frasa pemulihan untuk mendapatkan gambaran lengkap. Full viewing key terpadu (UFVK, diawali `uview1`) dapat melihat setiap transaksi masuk dan keluar di sebuah akun, dan dua alat dapat mengubahnya menjadi file yang bisa kamu simpan: server Zkool GraphQL dan zingo-cli. Panduan ini merangkum pendekatan dari [thread forum ini](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) dan memperbaruinya untuk rilis terkini.

Diuji pada September 2026 dengan Zkool 6.30.0 dan zingo-cli dari zingolib 6.0.0. Keduanya dirilis sebelum NU7, jadi pada November 2026 langkah-langkahnya diperbarui ke Zkool 6.37.0 dan zingolib 8.0.0. [Zkool 6.35.0](https://github.com/hhanh00/zkool2/pull/1388) adalah rilis Zkool pertama yang dibuat dengan ketinggian aktivasi Mainnet NU7, dan zingolib 8.0.0 adalah rilis yang menambahkan dukungan Mainnet NU7.

## Sebelum mulai

Kamu memerlukan dua hal:

1. **UFVK** untuk akun tersebut. [Viewing Keys](/zcash-tech/viewing-keys) menjelaskan informasi yang dapat dilihat dan cara mengekspornya.
2. **Ketinggian awal**, yaitu blok tempat pemindaian dimulai. Gunakan ketinggian sebelum transaksi pertamamu. Jika disetel terlalu tinggi, riwayat lama akan hilang tanpa pemberitahuan. Jika terlalu rendah, pemindaian hanya akan berlangsung lebih lama. Aktivasi Sapling (419200) selalu aman, tetapi pemindaiannya bisa memakan waktu berjam-jam.

## Jaga kerahasiaannya

Viewing key tidak dapat digunakan untuk membelanjakan dana, tetapi siapa pun yang memegangnya dapat melihat seluruh riwayatmu.

- Jangan tempelkan key ke situs web atau block explorer. Impor key ke software yang kamu jalankan sendiri.
- Server yang kamu gunakan untuk sinkronisasi dapat melihat alamat IP-mu dan transaksi mana yang kamu unduh secara lengkap. Kedua alat di bawah ini mengambil setiap transaksi berdasarkan ID untuk membaca memo dan biaya, dan catatan [ZIP 307](https://zips.z.cash/zip-0307) menyebutkan bahwa hal ini memberi tahu server transaksi mana milikmu. Sinkronisasi dari node Zebra milikmu sendiri dengan Zaino atau lightwalletd menghindari hal itu. [Zingolib dan Zaino Tutorial](/guides/zingolib-and-zaino-tutorial) menjelaskan cara menyiapkannya.
- zingo-cli mengirim pembayaran melalui mixnet Nym, tetapi sinkronisasinya tetap terhubung langsung ke server, jadi poin di atas juga berlaku untuknya.
- Berikan viewing key kepada alat-alat ini, jangan pernah memberikan seed. Perintah Docker di bawah menjalankan server Zkool GraphQL dengan `--allow-unauthenticated`, sehingga tidak memiliki login. API-nya dapat mengembalikan seed akun mana pun yang dibuat dari key tersebut dan dapat mengirim dana.
- Jalankan server di komputermu sendiri. Perintah Docker di bawah hanya menerima koneksi di `127.0.0.1` komputermu. Di dalam container, server harus menerima koneksi di semua antarmuka (`--bind-address 0.0.0.0`), jika tidak Docker tidak dapat mengaksesnya; pemetaan `-p 127.0.0.1:8000:8000` yang membuatnya tetap lokal.
- Kedua alat menyimpan key dan riwayatmu tanpa enkripsi. Zkool dapat mengenkripsi databasenya (`--db-password-file`), tetapi perintah di bawah dibuat sederhana dengan `--allow-unencrypted-database`. Hapus data kerja setelah selesai dan simpan ekspornya di tempat terenkripsi.

## Opsi 1: Zkool GraphQL

`zkool_graphql` adalah mesin dompet Zkool dalam bentuk server mandiri. Ini program terpisah dari aplikasi Zkool. Cara termudah menjalankannya adalah dengan image resmi Docker (amd64 dan arm64). Tersedia juga binary x86-64 Linux di [halaman rilisZkool](https://github.com/hhanh00/zkool2/releases); binary ini memerlukan glibc 2.38 atau yang lebih baru, jadi dapat dijalankan di Ubuntu 24.04, tetapi tidak di Debian 12.

### 1. Jalankan server

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.37.0 \
  --db-path /data/zkool.db \
  --bind-address 0.0.0.0 \
  --allow-unauthenticated \
  --allow-unencrypted-database
```

Sejak versi 6.32.0, server tidak akan berjalan sebelum kamu menentukan dua hal: cara klien login (key JWT atau `--allow-unauthenticated`) dan apakah database dienkripsi (dengan kata sandi atau `--allow-unencrypted-database`). Sekarang server juga hanya menerima koneksi di `127.0.0.1` secara default. Di dalam container, artinya tidak ada koneksi dari luar yang dapat mengaksesnya; karena itu `--bind-address 0.0.0.0` diperlukan. Jika container langsung berhenti, `docker logs zkool-export` menunjukkan opsi mana yang belum diatur.

Server menyinkronkan data dari `https://zec.rocks` kecuali kamu menambahkan `--lwd-url` dengan server milikmu sendiri. Image ini sudah menyertakan parameter Sapling, jadi tidak ada lagi yang perlu diunduh.

Buka `http://127.0.0.1:8000/graphiql` di browser. Kamu dapat menempelkan setiap langkah berikut di sana lalu menjalankannya.

### 2. Impor key

```graphql
mutation {
  createAccount(newAccount: {
    name: "export"
    key: "uview1..."
    aindex: 0
    birth: 2500000
    useInternal: true
  })
}
```

Perintah ini mengembalikan ID akun baru, yaitu 1 jika server masih baru.

- Selalu atur `birth`. Tanpanya, Zkool akan mulai dari blok saat ini dan tidak menemukan apa pun.
- `useInternal: true` membuat Zkool memeriksa alamat transparan untuk kembalian juga. Tetap aktifkan untuk key dari ZODL, seperti pengaturan yang digunakan [Recovering Funds](/using-zcash/recovering-funds) untuk seed ZODL.

### 3. Sinkronkan

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

Perintah ini berjalan sampai sinkronisasi selesai. Jangan tambahkan `fast: true`. Opsi itu melewati pengunduhan transaksi lengkap, padahal memo, biaya, dan output ada di sana.

Angka yang dikembalikan adalah ketinggian target sinkronisasi, bukan proof bahwa sinkronisasi benar-benar mencapainya. Kesalahan jaringan dapat menghentikan sinkronisasi lebih awal tanpa laporan apa pun, jadi periksa:

```graphql
{ currentHeight accounts { id name height } }
```

Jika `height` akun berada di bawah `currentHeight`, jalankan sinkronisasi lagi. Prosesnya akan melanjutkan dari titik terakhir.

### 4. Ekspor

Simpan ini sebagai `history.graphql`:

```graphql
{
  transactionsByAccount(idAccount: 1) {
    txid height time value fee
    notes { pool scope address value memo }
    spends { pool scope address value }
    outputs { pool vout address value memo }
  }
}
```

Jangan sertakan argumen `height` kecuali memang kamu menginginkannya. Argumen itu menetapkan batas minimum, jadi `height: 3000000` dalam contoh forum menghapus semua data sebelum blok tersebut.

Ambil datanya sebagai JSON:

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

Setiap transaksi seharusnya menunjukkan biaya di atas 0, kecuali imbalan penambangan. Jika ada yang menunjukkan `"fee": "0"` dan tidak memiliki memo, detailnya belum terunduh. Zkool mengambil transaksi lengkap satu per satu setelah pemindaian, dan satu kegagalan akan menghentikan proses berikutnya tanpa pemberitahuan. Untuk mencantumkan transaksi yang terdampak:

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

Jika ada hasil yang muncul, sinkronkan lagi beberapa menit kemudian lalu ekspor ulang.

Kemudian ratakan datanya menjadi CSV, satu baris per transaksi:

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### Membaca hasilnya

| Kolom | Arti |
|---|---|
| `value` | Perubahan bersih pada akun dalam ZEC, termasuk biaya. Bernilai negatif untuk pengiriman. |
| `fee` | Biaya dalam ZEC. Untuk pembayaran yang kamu terima, pengirim yang membayarnya dan biaya itu tidak termasuk dalam `value`. |
| `time` | Waktu blok dalam UTC, tanpa penanda zona waktu |
| `notes` | Dana yang diterima akun dalam transaksi ini, termasuk kembalian. Memo yang dikirim kepadamu ada di sini. Entri transparan tidak memiliki alamat. |
| `spends` | Catatan milik akun yang digunakan dalam transaksi ini |
| `outputs` | Dana yang dikirim dalam transaksi: setiap output transparan, serta pembayaran terlindungi ke alamat lain beserta memo |
| `pool` | 0 transparan, 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` | 0 eksternal (pembayaran masuk), 1 internal (kembalian) |

Aplikasi Zkool juga menyediakan Ekspor Transaksi, Memo, dan Catatan di menu akun, tetapi itu hanya ekspor tabel mentah: jumlah dalam zatoshi, stempel waktu Unix, serta memo dalam file terpisah.

## Opsi 2: zingo-cli

zingo-cli adalah dompet baris perintah milik Zingo. Tidak ada unduhan siap pakai, jadi kamu perlu membuatnya dengan Rust. Gunakan zingolib 8.0.0 atau yang lebih baru: itulah rilis pertama yang mengenali ketinggian aktivasi Mainnet NU7 (3,543,405), menurut [catatan rilisnya](https://github.com/zingolabs/zingolib/releases/tag/zingolib_v8.0.0). Build dari tag yang lebih lama seperti 6.0.0 tidak mengenalinya.

Build ini menggunakan [cargo-make](https://github.com/sagiegurari/cargo-make) (`cargo install cargo-make`). Di Ubuntu, kamu juga memerlukan `sudo apt install build-essential gcc libsqlite3-dev`.

```bash
git clone --branch zingolib_v8.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
makers run-cli --build-only
```

Perintah ini membuat `./target/release/zingo-cli` dan menaruh `nym-proxy` di sebelahnya. Kamu tetap memerlukan `nym-proxy` hanya untuk sinkronisasi: zingo-cli tidak akan terhubung tanpa itu. Sejak versi 8.0.0, `zingo-netutils` menjadi bagian dari workspace utama, jadi cara lama yang menyalin `nym-proxy` dari `zingo-netutils/target/release/` tidak lagi berfungsi.

Jika kamu memindahkan `zingo-cli` ke tempat lain, pindahkan juga `nym-proxy`, atau beri tahu zingo-cli lokasinya dengan `--nym-proxy /path/to/nym-proxy` atau variabel lingkungan `ZINGO_NYM_PROXY`. Tanpa itu, program akan mencarinya di sebelah binary-nya sendiri lalu di `PATH` milikmu. Jika tidak dapat menjalankan proxy, program sama sekali tidak akan terhubung.

Hanya pembayaran (dan pencarian harga ZEC) yang melalui Nym. Sinkronisasi terhubung langsung ke server.

Saat pertama kali dijalankan, program membuat dompet hanya untuk melihat, menyinkronkannya, lalu mencetak riwayat:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` harus berupa jalur absolut.
- `--viewkey` dan `--birthday` hanya berlaku saat dompet dibuat. Setelah itu, jangan sertakan keduanya.
- Dompet zingo-cli baru secara default dalam keadaan offline dan perlu persetujuanmu untuk terhubung. `--server` memilih server sekaligus menjadi persetujuan tersebut. Cara lainnya adalah `--online` (hanya untuk sesi ini) dan `--remember-online`, yang juga menyimpan pilihan di sebelah dompet agar proses berikutnya terhubung tanpa flag (`--forget-online` membatalkannya).
- Key akan masuk ke riwayat shell-mu, jadi hapus setelahnya.

Untuk proses berikutnya:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline` membaca data yang sudah disinkronkan tanpa mengakses jaringan.

- `transactions` memberikan satu entri per transaksi: txid, waktu (UTC), ketinggian, jenis (`received`, `sent`, `shield`, atau `send-to-self`), nilai, biaya, dan catatan yang terkait.
- `value_transfers` memberikan satu entri per pembayaran. Jadi, pengiriman kepada dua orang menghasilkan dua entri, masing-masing dengan alamat penerima dan memo.
- `messages` mencantumkan memo sebagai JSON.

Beberapa hal yang perlu diketahui tentang hasilnya:

- `transactions` dan `value_transfers` mencetak teks biasa yang sekilas tampak seperti JSON, tetapi sebenarnya bukan.
- Jumlah dinyatakan dalam zatoshi (100,000,000 untuk 1 ZEC) dan selalu positif. `kind` menunjukkan arahnya. Untuk pengiriman, `value` adalah jumlah yang dikirim kepada orang lain, tanpa biaya.
- Biaya ditampilkan sebagai "not available" ketika suatu transaksi menggunakan dana transparan yang bukan milikmu. Hanya memo teks yang ditampilkan.
- Jika sinkronisasi gagal, kesalahannya muncul di terminal, bukan di file. Sejak zingolib 8.0.0 (zingo-cli 0.5.0), perintah yang gagal juga keluar dengan kode bukan nol, tetapi periksa terminal sebelum memercayai `transactions.txt`.

[zingoHelper](https://github.com/dismad/zingoHelper) milik dismad memiliki skrip `exportToJSON.sh` yang mengubah `transactions` menjadi JSON. Skrip ini dibuat sebelum zingo-cli 6, disiapkan untuk testnet, menandai beberapa Sapling keluar dan entri transparan sebagai placeholder, serta memerlukan alat GNU, jadi tidak akan berjalan di macOS standar. Anggap hasilnya sebagai titik awal dan periksa jumlah totalnya.

## Hal yang tidak dapat diberitahukan viewing key

- **Harga.** Tidak satu pun alat mencatat harga ZEC saat setiap transaksi berlangsung. Tambahkan sendiri nilai fiatnya.
- **Riwayat transparan, jika key tidak mencakupnya.** Bagian transparan pada UFVK bersifat opsional menurut [ZIP 316](https://zips.z.cash/zip-0316). Dengan zingo-cli, `$Z --offline parse_viewkey uview1...` menunjukkan pool mana saja yang dicakup oleh suatu key.
- **Siapa yang membayarmu.** Pembayaran terlindungi tidak membawa alamat pengirim. Jika pengirim tidak mencantumkannya di memo, informasi itu tidak ada di mana pun.
- **Beberapa detail pengiriman.** Alamat tujuan, jumlah, dan memo untuk pengiriman terlindungi dipulihkan dengan mendekripsi menggunakan key. Dompet dapat membuat transaksi dengan cara yang membuatnya mustahil dipulihkan, meskipun sebagian besar dompet tidak melakukannya.

## Alat lainnya

| Alat | Hasil yang didapat |
|---|---|
| ZODL | CSV pajak dengan tanggal, jumlah, biaya, dan tag. Hanya tahun kalender sebelumnya; transaksi shielding dilewati, tanpa txid, memo, atau alamat. |
| Aplikasi Zkool | Ekspor tabel mentah dari menu akun |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | Mengimpor UFVK dengan `importvk`. `listreceived` melalui RPC mengembalikan catatan yang diterima beserta txid dan memo, tetapi tanpa pengiriman dan biaya. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` menyediakan detail lengkap tetapi ditandai eksperimental, sedangkan Zallet hanya mengimpor viewing key Sapling, bukan UFVK |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | Mengimpor UFVK dengan `wallet init-fvk`, lalu `wallet list-tx`. Mode CSV-nya tidak menyertakan txid atau alamat, dan proyeknya menyarankan agar alat ini tidak digunakan di lingkungan produksi. |

## Terkait

- [Viewing Keys](/zcash-tech/viewing-keys)
- [Recovering Funds](/using-zcash/recovering-funds)
- [Zingolib dan Zaino Tutorial](/guides/zingolib-and-zaino-tutorial)
- [Forum: Mengekspor riwayat transaksi ke JSON/CSV dari UFVK/seed](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Forum: Zkool & GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v8.0.0/zingo-cli/README.md)
