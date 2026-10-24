<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Mengekspor Riwayat Transaksi dari Viewing Key

Sebagian besar ekspor dompet sangat minim. Ekspor pajak ZODL, misalnya, memberimu tanggal, jumlah, dan biaya untuk tahun kalender sebelumnya, tetapi tanpa ID transaksi, tanpa memo, dan tanpa alamat. Itu tidak cukup untuk pembukuan, untuk memeriksa migrasi dompet, atau untuk mencari tahu apa yang terjadi pada suatu pembayaran.

Kamu tidak memerlukan frasa pemulihan untuk mendapatkan gambaran lengkapnya. Sebuah unified full viewing key (UFVK, mulai dari `uview1`) dapat melihat setiap transaksi masuk dan keluar dalam sebuah akun, dan dua alat dapat mengubah hal tersebut menjadi file yang kamu simpan: server GraphQL Zkool dan zingo-cli. Panduan ini mengumpulkan pendekatan dari [thread forum ini](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) dan memperbaruinya untuk rilis saat ini.

Diuji pada September 2026 dengan Zkool 6.30.0 dan zingo-cli dari zingolib 6.0.0.

## Sebelum kamu memulai

Kamu membutuhkan dua hal:

1. **UFVK** untuk akun tersebut. [Viewing Keys](/zcash-tech/viewing-keys) menjelaskan apa saja yang diungkapkan oleh kunci ini dan cara mengekspornya.
2. **Tinggi blok lahir (birth height)**, yaitu blok tempat memulai pemindaian. Gunakan tinggi blok dari sebelum transaksi pertama kamu. Jika kamu mengaturnya terlalu tinggi, riwayat lama akan hilang tanpa pemberitahuan. Jika kamu mengaturnya terlalu rendah, proses pemindaian hanya akan memakan waktu lebih lama. Aktivasi Sapling (419200) selalu aman tetapi dapat memakan waktu berjam-jam untuk dipindai.

## Jaga privasi kamu

Sebuah viewing key tidak dapat melakukan pengeluaran, tetapi ia menunjukkan seluruh riwayat kamu kepada siapa pun yang memegangnya.

- Jangan menempelkannya ke situs web atau block explorer. Impor ke dalam perangkat lunak yang kamu jalankan sendiri.
- Server tempat kamu melakukan sinkronisasi dapat melihat alamat IP kamu dan transaksi mana saja yang kamu unduh secara lengkap. Kedua alat di bawah ini mengambil setiap transaksi kamu berdasarkan ID untuk membaca memo dan biaya, dan [ZIP 307](https://zips.z.cash/zip-0307) mencatat bahwa hal ini memberi tahu server transaksi mana yang milikmu. Melakukan sinkronisasi dari Zebra node milikmu sendiri dengan Zaino atau lightwalletd dapat menghindari hal tersebut. [Zingolib dan Zaino Tutorial](/guides/zingolib-and-zaino-tutorial) akan memandu kamu melalui proses pengaturannya.
- zingo-cli 6 mengirim pembayaran melalui Nym mixnet, tetapi sinkronisasinya masih terhubung langsung ke server, sehingga poin di atas juga berlaku untuknya.
- Berikan alat-alat ini viewing key, jangan pernah berikan seed phrase. Zkool GraphQL server tidak memiliki login secara default, dan API-nya akan memberikan seed phrase dari akun apa pun yang dibuat darinya, serta dapat mengirim dana.
- Simpan server di mesin milikmu sendiri. Perintah Docker di bawah ini hanya mendengarkan pada `127.0.0.1`.
- Kedua alat tersebut menyimpan kunci dan riwayat kamu tanpa enkripsi. Hapus data kerja setelah kamu selesai dan simpan hasil ekspor di tempat yang terenkripsi.

## Opsi 1: Zkool GraphQL

`zkool_graphql` adalah mesin dompet Zkool sebagai server mandiri. Ini adalah program terpisah dari aplikasi Zkool. Cara termudah untuk menjalankannya adalah dengan menggunakan Docker image resmi (amd64 dan arm64). Tersedia juga biner Linux x86-64 di halaman rilis [Zkool](https://github.com/hhanh00/zkool2/releases); ini membutuhkan glibc 2.38 atau yang lebih baru, sehingga Ubuntu 24.04 dapat digunakan sedangkan Debian 12 tidak bisa.

### 1. Mulai server

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.30.0 \
  --db-path /data/zkool.db
```

Ia melakukan sinkronisasi dari `https://zec.rocks` kecuali jika kamu menambahkan `--lwd-url` dengan server milikmu sendiri. Pada saat pertama kali dijalankan, ia akan mengunduh parameter Sapling (sekitar 50 MB). Jika proses tersebut gagal, `docker start zkool-export` akan mencoba lagi.

Buka `http://127.0.0.1:8000/graphiql` di browser. Kamu bisa menempelkan setiap langkah berikutnya di sana dan menjalankannya.

### 2. Impor kunci tersebut

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

Ini mengembalikan ID akun baru, yang bernilai 1 pada server baru.

- Selalu atur `birth`. Tanpa itu, Zkool akan dimulai dari blok saat ini dan tidak menemukan apa pun.
- `useInternal: true` membuat Zkool memeriksa alamat perubahan transparan juga. Biarkan tetap aktif untuk kunci dari ZODL, pengaturan yang sama dengan yang digunakan [Memulihkan Dana](/using-zcash/recovering-funds) untuk frasa pemulihan ZODL.

### 3. Sinkronisasi

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

Ini berjalan sampai sinkronisasi berakhir. Jangan tambahkan `fast: true`. Ini melewati proses pengunduhan transaksi lengkap, yang merupakan sumber dari memo, biaya, dan output.

Angka yang dikembalikan adalah ketinggian (height) yang menjadi targetnya, bukan proof bahwa proses tersebut telah berhasil mencapainya. Kesalahan jaringan dapat menghentikan sinkronisasi lebih awal tanpa melaporkan apa pun, jadi periksalah:

```graphql
{ currentHeight accounts { id name height } }
```

Jika `height` dari akun tersebut berada di belakang `currentHeight`, jalankan sinkronisasi lagi. Proses ini akan berlanjut dari titik terakhir saat ia berhenti.

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

Jangan sertakan argumen `height` kecuali jika kamu benar-benar bermaksud demikian. Argumen tersebut menetapkan batas minimum, sehingga contoh forum `height: 3000000` akan menghapus semua hal sebelum blok tersebut.

Ambil sebagai JSON:

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

Setiap transaksi harus menunjukkan biaya di atas 0, terlepas dari imbalan penambangan. Jika sebuah transaksi menunjukkan `"fee": "0"` dan tanpa memo, detailnya tidak berhasil diunduh. Zkool mengambil seluruh transaksi satu per satu setelah pemindaian, dan satu kegagalan akan menghentikan sisanya secara diam-diam. Untuk mencantumkan yang terdampak:

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

Jika ada sesuatu yang muncul, sinkronkan lagi beberapa menit kemudian dan ekspor kembali.

Kemudian ratakan menjadi CSV, satu baris per transaksi:

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### Membaca output

| Field | Makna |
|---|---|
| `value` | Perubahan bersih pada akun dalam ZEC, sudah termasuk biaya. Bernilai negatif untuk pengiriman. |
| `fee` | Biaya dalam ZEC. Pada pembayaran yang kamu terima, pengirim yang membayarnya dan ini tidak ada di `value`. |
| `time` | Waktu blok dalam UTC, tanpa penanda zona waktu |
| `notes` | Apa yang diterima akun dalam transaksi ini, termasuk kembalian. Memo yang dikirim kepadamu ada di sini. Entri transparan tidak memiliki alamat. |
| `spends` | Catatan milik akun sendiri yang telah digunakan oleh transaksi ini |
| `outputs` | Apa yang dikirim oleh transaksi: setiap output transparan, ditambah pembayaran terlindungi ke alamat lain beserta memo mereka |
| `pool` | 0 transparan, 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` | 0 eksternal (pembayaran masuk), 1 internal (kembalian) |

Aplikasi Zkool juga memiliki fitur Ekspor Transaksi, Memo, dan Catatan di menu akun, tetapi itu hanyalah dump tabel mentah: jumlah dalam zatoshi, timestamp Unix, dan memo dalam file terpisah.

## Opsi 2: zingo-cli

zingo-cli adalah dompet baris perintah milik Zingo. Tidak ada unduhan yang sudah jadi, jadi kamu harus membangunnya dengan Rust:

```bash
git clone --branch zingolib_v6.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release -p zingo-cli
cargo build --release --manifest-path zingo-netutils/Cargo.toml --features nym --bin nym-proxy
cp zingo-netutils/target/release/nym-proxy target/release/
```

Kamu membutuhkan `nym-proxy` bahkan hanya untuk melakukan sinkronisasi. zingo-cli 6 tidak akan dapat terhubung ke server mana pun tanpanya.

Jalankan pertama kali untuk membuat dompet khusus melihat (view-only), menyinkronkannya, dan mencetak riwayatnya:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` harus berupa path absolut.
- `--viewkey` dan `--birthday` hanya berlaku saat dompet dibuat. Jangan sertakan setelah itu.
- zingo-cli secara default dimulai dalam keadaan offline. `--server` memilih server dan juga dianggap sebagai persetujuan kamu untuk online.
- Key tersebut akan berakhir di shell history kamu, jadi hapuslah setelahnya.

Eksekusi selanjutnya:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline` membaca apa yang sudah tersinkronisasi tanpa menyentuh jaringan.

- `transactions` memberikan satu entri per transaksi: txid, waktu (UTC), height, jenis (`received`, `sent`, `shield` atau `send-to-self`), nilai, biaya, dan catatan yang terlibat.
- `value_transfers` memberikan satu entri per pembayaran, jadi pengiriman ke dua orang adalah dua entri, masing-masing dengan alamat penerima dan memo.
- `messages` mencantumkan memo sebagai JSON.

Beberapa hal yang perlu kamu ketahui tentang outputnya:

- `transactions` dan `value_transfers` mencetak teks biasa yang terlihat sedikit seperti JSON tetapi sebenarnya bukan.
- Jumlah dalam satuan zatoshis (100.000.000 hingga 1 ZEC) dan selalu bernilai positif. `kind` memberi tahu kamu arahnya. Untuk pengiriman, `value` adalah jumlah yang dikirim ke orang lain, tanpa biaya.
- Biaya akan muncul sebagai "not available" ketika sebuah transaksi menggunakan dana transparan yang bukan milikmu. Hanya memo teks yang ditampilkan.
- Jika sinkronisasi gagal, error akan masuk ke terminal, bukan ke file, dan zingo-cli tetap keluar secara normal. Periksa terminal sebelum mempercayai `transactions.txt`.

[zingoHelper](https://github.com/dismad/zingoHelper) milik dismad memiliki skrip `exportToJSON.sh` yang mengubah `transactions` menjadi JSON. Skrip ini ditulis sebelum zingo-cli 6, dikonfigurasi untuk testnet, menandai beberapa entri Sapling keluar dan transparan sebagai placeholder, serta membutuhkan GNU tools, sehingga tidak akan dapat berjalan pada macOS standar. Anggap outputnya sebagai titik awal dan periksa totalnya.

## Apa yang tidak bisa diberitahukan oleh viewing key kepadamu

- **Harga.** Kedua alat tersebut tidak mencatat harga ZEC pada saat setiap transaksi terjadi. Tambahkan nilai fiat sendiri secara manual.
- **Riwayat transparan, jika kunci tidak menyertakannya.** Bagian transparan dari sebuah UFVK bersifat opsional berdasarkan [ZIP 316](https://zips.z.cash/zip-0316). Dengan zingo-cli, `$Z --offline parse_viewkey uview1...` menunjukkan pool mana saja yang dicakup oleh sebuah kunci.
- **Siapa yang membayar kamu.** Pembayaran terlindungi tidak menyertakan alamat pengirim. Kecuali jika pengirim mencantumkannya di dalam memo, informasi tersebut tidak akan ada di mana pun.
- **Beberapa detail keluar.** Alamat tujuan, jumlah, dan memo untuk pengiriman terlindungi dapat dipulihkan dengan melakukan dekripsi menggunakan kunci tersebut. Sebuah dompet dapat menyusun transaksi sedemikian rupa sehingga hal itu tidak memungkinkan, meskipun sebagian besar dompet tidak melakukannya.

## Alat lainnya

| Tool | Apa yang kamu dapatkan |
|---|---|
| ZODL | CSV Pajak dengan tanggal, jumlah, biaya, dan tag. Hanya untuk tahun kalender sebelumnya, melewati transaksi terlindungi, tanpa txid, memo, atau alamat. |
| app Zkool | Ekspor tabel mentah dari menu akun |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | Mengimpor UFVK dengan `importvk`. `listreceived` melalui RPC mengembalikan catatan yang diterima dengan txid dan memo, tetapi tanpa pengiriman dan tanpa biaya. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` sangat detail tetapi ditandai sebagai eksperimental, dan Zallet hanya mengimpor viewing key Sapling, bukan UFVK |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | Mengimpor UFVK dengan `wallet init-fvk`, lalu `wallet list-tx`. Mode CSV-nya tidak memiliki txid atau alamat, dan proyek ini menyatakan untuk tidak menggunakannya dalam produksi. |

## Terkait

- [Viewing Keys](/zcash-tech/viewing-keys)
- [Memulihkan Dana](/using-zcash/recovering-funds)
- [Zingolib dan Zaino Tutorial](/guides/zingolib-and-zaino-tutorial)
- [Forum: Mengekspor riwayat transaksi ke JSON/CSV dari UFVK/seed](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Forum: Zkool & GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v6.0.0/zingo-cli/README.md)