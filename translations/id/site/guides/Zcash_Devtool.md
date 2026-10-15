# Devtool Zcash

[Apa itu zcash-devtool?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Devtool Zcash adalah platform untuk melakukan hacking pada Zcash. Devtool ini dibuat oleh developer, untuk developer, guna pengujian & pengembangan fungsionalitas Zcash baru; dan tidak boleh dianggap siap untuk produksi. API command line yang disediakan alat ini dapat & akan berubah kapan saja dan tanpa peringatan. JANGAN gunakan dana dalam jumlah besar untuk dompet bawaan zcash-devtool.

### Tutorial video Devtool Zcash:
Kris Nuttycombe (@nuttycom) mempresentasikan alat ini selama ZconVI.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool: multitool pengembangan Zcash bersama Kris Nuttycombe - ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

Untuk panduan langkah demi langkah memulai penggunaan alat-alat ini, lihat [panduan ini](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md). Panduan ini mendokumentasikan langkah lengkap untuk menyiapkan dan menggunakan alat zcash devtool. Panduan ini dimaksudkan sebagai panduan untuk menyiapkan serta menambahkan fungsionalitasmu sendiri ke alat tersebut.

## Mulai cepat

Perintah di bawah ini diperiksa terhadap zcash-devtool `main` (commit `5a26ee8`, Agustus 2026). Alat ini berubah tanpa pemberitahuan, jadi jalankan `--help` pada perintah apa pun jika sesuatu di sini sudah tidak cocok.

### Instalasi

Tidak ada binary yang telah dibuat sebelumnya. Instal [Rust](https://rustup.rs), lalu build dari source:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

Contoh di bawah memanggil binary hasil build, `target/release/zcash-devtool`. `cargo run --release -- ...` berfungsi dengan cara yang sama.

### Buat dompet testnet

Mulailah di testnet. Koin testnet (TAZ) tidak memiliki nilai.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` adalah direktori dompet. Opsi ini ditempatkan setelah `wallet` dan sebelum subperintah.
- `-i` adalah file identitas [age](https://age-encryption.org). Frasa mnemonic dompet dienkripsi ke file tersebut, dan file dibuat jika belum ada. Simpan file ini: `send`, `shield`, dan perintah pengeluaran lainnya membutuhkannya untuk mendekripsi seed.
- `-n` adalah jaringan: `test` atau `main`.
- `-s` memilih server light wallet. Nilai default, `zecrocks`, terhubung ke server zec.rocks untuk jaringan yang dipilih.
- Untuk memulihkan dompet yang sudah ada, gunakan `restore-mnemonic` sebagai pengganti `init`. Perintah ini akan meminta frasa tersebut.

`balance` mencantumkan setiap pool secara terpisah, termasuk Ironwood:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

Jalankan `zcash-devtool wallet -w ./my-wallet list-addresses` untuk melihat unified address dompet, lalu kirimkan dana testnet ke sana dari [faucet](https://zechub.wiki/using-zcash/faucets).

Untuk mainnet, berikan `-n main` ke `init`. Gunakan hanya jumlah yang sanggup kamu tanggung jika hilang.

### Kirim dan lindungi

Jumlah dinyatakan dalam zatoshi (1 ZEC = 100.000.000 zatoshi).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose` menampilkan transaksi yang akan dibuat oleh `send`, tanpa mengirimkannya. `list-tx` dan `list-unspent` menampilkan riwayat serta note dompet.

Setiap perintah yang berkomunikasi dengan server juga menerima `--connection tor`, yang merutekan koneksi melalui klien Tor bawaan.

### Periksa alamat, key, dan transaksi

`inspect` mendekode data Zcash secara offline: alamat, key, dan transaksi mentah. Tambahkan `--lookup` untuk mengambil informasi lebih lanjut dari chain, seperti transaksi berdasarkan ID-nya.

```
$ zcash-devtool inspect utest1h55y5z...
Zcash address
 - Network: testnet
 - Kind: Unified Address
 - Receivers:
   - Orchard (...)
   - Sapling (...)
   - Transparent P2PKH (...)
```

Note Ironwood dikirim ke receiver Orchard yang sama dalam unified address, sehingga alamat tidak berubah dengan NU6.3.

### Buat transaksi secara bertahap dengan PCZT

Sebuah PCZT (transaksi Zcash yang dibuat sebagian) membagi pembuatan transaksi ke dalam langkah-langkah terpisah: membuat, membuktikan, menandatangani, dan mengirim. Setiap langkah dapat dijalankan pada mesin yang berbeda, misalnya dengan hardware signer seperti Keystone. Setiap perintah `pczt` membaca PCZT dari file atau stdin dan menulisnya ke file (`--output`) atau stdout, sehingga langkah-langkah tersebut dapat di-pipe:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help` mencantumkan langkah lainnya, termasuk `inspect`, `redact`, `combine`, `extract`, dan `shield`.

### Pindahkan dana dari Orchard ke Ironwood

Sejak NU6.3, dana Orchard hanya dapat dipindahkan ke alamat milik dompet itu sendiri. Perintah `migration` memindahkannya ke Ironwood:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` menampilkan pratinjau pemisahan note dan jadwal transfer, serta tidak mengubah apa pun.
- `commit` membuat dan melakukan pra-tanda tangan pada transaksi persiapan pertama. Tambahkan `--external` untuk membiarkannya tidak ditandatangani bagi external signer seperti Keystone.
- `status` menampilkan kemajuan migrasi dan langkah berikutnya.
- `advance` membuktikan transaksi berikutnya yang anchor-nya siap.

Perintah migrasi masih sedang dibuat. `advance` berhenti pada transaksi pertama yang siap disiarkan, karena penyiaraan belum diterapkan dalam alat ini. Untuk penggunaan sehari-hari, pindahkan dana menggunakan dompet yang mendukung Ironwood. Lihat [Pool Terlindungi](https://zechub.wiki/using-zcash/shielded-pools).


**Peringatan Keamanan:**
JANGAN GUNAKAN INI DALAM PRODUKSI!!!
Aplikasi ini belum ditulis dengan mempertimbangkan keamanan. Namun, aplikasi ini memiliki fitur seperti enkripsi frasa mnemonic seed yang seharusnya membuatnya layak untuk eksperimen skala kecil, dengan risiko ditanggung sendiri.

### Lanjutan (tutorial librustzcash )


[lihat video di sini](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
