<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Panduan Referensi Cepat Zallet

## Ringkasan Singkat

- Zallet adalah dompet Zcash full-node yang ditulis dalam Rust. Ini menggantikan dompet yang sebelumnya berada di dalam zcashd.
- zcashd telah mencapai penghentian End-of-Support pada 18 Juli 2026 dan tidak lagi berjalan. Zebra sekarang menangani sisi node; Zallet menangani sisi dompet.
- Kamu menjalankan Zallet dari command line dengan `zallet rpc <command>`, sama seperti saat kamu menggunakan `zcash-cli` sebelumnya.
- Setiap argumen setelah nama perintah harus berupa JSON yang valid, yang berarti nilai string tetap mempertahankan tanda kutip ganda mereka.
- Zallet masih dalam tahap alpha. Perintah dapat berubah di antara rilis, dan belum semua RPC zcashd dipindahkan ke sini.

## Penjelasan Inti

Zallet mengekspos fungsionalitasnya melalui JSON-RPC, gaya antarmuka yang sama dengan yang digunakan oleh dompet zcashd. Apa pun yang kamu inginkan dari dompet tersebut — memeriksa saldo, membuat akun, mengirim pembayaran terlindungi — adalah perintah yang kamu teruskan ke `zallet rpc`.

Ada dua hal yang berbeda dari kebiasaan `zcash-cli` lama dan menjadi penyebab sebagian besar kesalahan di awal. Pertama, argumen harus berupa JSON yang valid, bukan sekadar teks biasa, sehingga argumen string membawa tanda kutipnya sendiri di dalam tanda kutip shell. Kedua, kumpulan perintah yang tersedia bergantung pada rilis alpha mana yang sedang kamu jalankan, sehingga daftar yang tertanam dalam binary kamu lebih andal daripada halaman tertulis apa pun, termasuk halaman ini.

Untuk menampilkan semua RPC yang tersedia:

```bash
zallet rpc help
```

Untuk mendapatkan bantuan terperinci untuk RPC tertentu:

```bash
zallet rpc help '"<command>"'
```

> **Penting:** Setiap argumen setelah nama metode **harus berupa JSON yang valid**.  
> Nilai string harus ditulis sebagai `"value"` (termasuk tanda kutip ganda).

## Kesalahan Umum

- **Menghapus tanda kutip dalam pada argumen string.** `zallet rpc validateaddress u1abc...` gagal, karena alamat harus dikirim sebagai JSON. Argumen tersebut perlu ditulis `'"u1abc..."'`.
- **Mengasumsikan setiap RPC zcashd ada di sini.** Proses porting masih berlangsung. Beberapa metode berperilaku identik, beberapa memerlukan penggunaan yang berbeda, dan beberapa tidak akan dipindahkan sama sekali.
- **Menganggap halaman ini sebagai acuan utama untuk binary kamu.** Zallet masih dalam tahap alpha dan berkembang dengan cepat. Jika sebuah perintah di sini tidak berfungsi, periksa `zallet rpc help` sebelum berasumsi ada sesuatu yang rusak.
- **Mengharapkan Zallet adalah sebuah node.** Ini adalah bagian dompet dari pasangan tersebut. Zebra menjalankan node, dan Zallet berkomunikasi dengannya.

## Perintah RPC

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Parameter   | Tipe   | Wajib   | Deskripsi              |
|-------------|--------|----------|--------------------------|
| hexstring   | string | ya      | String hex transaksi   |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Parameter   | Tipe   | Wajib   | Deskripsi     |
|-------------|--------|----------|-----------------|
| hexstring   | string | ya      | Hex script      |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Parameter | Tipe | Wajib | Default | Deskripsi |
|------------|--------|----------|---------|--------------------------------------|
| txid | string | ya | | ID transaksi |
| verbose | number | tidak | 0 | `0` = hex, non-nol = objek JSON |
| blockhash | string | tidak | | Batasi pencarian ke blok ini |

---

### getwalletinfo

```bash
zallet rpc getwalletinfo
```

Please provide the Markdown fragment you would like me to translate. I am ready to begin as soon as you provide the content.

---

### getwalletstatus

```bash
zallet rpc getwalletstatus
```

Please provide the Markdown fragment you would like me to translate. I am ready to begin once you provide the content.

---

### listaddresses

```bash
zallet rpc listaddresses
```

Please provide the Markdown fragment you would like me to translate. I am ready to begin once you provide the content.

---

### rpc.discover

```bash
zallet rpc rpc.discover
```

Tidak ada parameter. Mengembalikan skema OpenRPC.

---

### stop

```bash
zallet rpc stop
```

Tidak ada parameter. (Hanya Regtest)

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| Parameter | Tipe | Wajib | Deskripsi |
|-----------|------|-------|-----------|
| address   | string | ya    | Alamat transparan |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Parameter  | Tipe   | Wajib | Deskripsi             |
|------------|--------|-------|-------------------------|
| address    | string | ya    | Alamat transparan     |
| signature  | string | ya    | Signature Base64        |
| message    | string | ya    | Pesan asli        |

---

### walletlock

```bash
zallet rpc walletlock
```

Please provide the Markdown fragment you would like me to translate. I am ready to begin according to your instructions.

---

### walletpassphrase

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| Parameter   | Tipe   | Wajib   | Deskripsi                          |
|-------------|--------|----------|--------------------------------------|
| passphrase  | string | ya      | Passphrase dompet                    |
| timeout     | number | ya      | Detik untuk menjaga dompet tetap tidak terkunci  |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Parameter             | Tipe    | Wajib  | Deskripsi                  |
|-----------------------|---------|--------|----------------------------|
| transparent_address   | string  | ya     | Alamat P2PKH yang akan dikonversi |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Parameter | Tipe | Wajib | Deskripsi |
|-----------|--------|-------|-----------|
| address   | string | ya    | alamat Sapling yang spending key-nya akan diekspor |

> Dompet harus dibuka kuncinya. Hanya mengekspor spending key dari Sapling.

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Parameter     | Tipe   | Wajib | Deskripsi     |
|---------------|--------|-------|-----------------|
| account_uuid  | string | ya    | Account UUID    |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Parameter          | Tipe            | Wajib    | Deskripsi                                |
|--------------------|-----------------|----------|------------------------------------------|
| account            | string / number | ya       | UUID akun atau indeks akun ZIP-32      |
| receiver_types     | array of string | tidak    | Tipe penerima yang ingin disertakan      |
| diversifier_index  | number          | tidak    | Indeks diversifier tertentu              |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Parameter | Tipe            | Wajib    | Default | Deskripsi                        |
|-----------|-----------------|----------|---------|----------------------------------|
| account   | string / number | ya       |         | UUID akun atau indeks ZIP-32    |
| minconf   | number          | tidak    | 1       | Konfirmasi minimum               |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| Parameter | Tipe | Wajib | Default | Deskripsi |
|-----------|--------|----------|---------|---------------------------|
| minconf   | number | tidak       | 1       | Konfirmasi minimum     |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Parameter     | Tipe   | Wajib | Deskripsi                              |
|---------------|--------|-------|------------------------------------------|
| account_name  | string | ya    | Nama yang dapat dibaca manusia          |
| seedfp        | string | tidak | Wajib jika dompet memiliki banyak seed  |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Parameter     | Tipe   | Wajib | Default | Deskripsi                          |
|---------------|--------|-------|---------|--------------------------------------|
| minconf       | number | tidak | 1       | Konfirmasi minimum                |
| as_of_height  | number | tidak |         | Query pada height ini (`-1` = tip) |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Parameter    | Tipe            | Wajib | Deskripsi                                |
|--------------|-----------------|-------|------------------------------------------|
| operationid  | array of string | tidak | ID Operasi (abaikan untuk semua yang selesai) |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Parameter    | Tipe            | Wajib | Deskripsi                    |
|--------------|-----------------|-------|--------------------------------|
| operationid  | array of string | tidak | ID Operasi (abaikan untuk semua)   |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Parameter          | Tipe    | Wajib   | Default | Deskripsi                       |
|--------------------|---------|---------|---------|---------------------------------|
| minconf            | number  | tidak   | 1       | Konfirmasi minimum              |
| include_watchonly  | boolean | tidak   | false   | Sertakan saldo watch-only       |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Parameter | Tipe | Wajib | Default | Deskripsi |
|------------|-------|-------|---------|--------------------------------------|
| account    | string  | ya      |         | UUID Akun                         |
| hex_data   | string  | ya      |         | Hex public key atau redeem script      |
| rescan     | boolean | tidak  | true    | Rescan setelah impor                  |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Parameter     | Type   | Required | Default        | Description                              |
|---------------|--------|----------|----------------|------------------------------------------|
| key           | string | yes      |                | spending key Sapling yang diperluas          |
| rescan        | string | no       | `"whenkeyisnew"` | `"yes"`, `"no"`, atau `"whenkeyisnew"`                  |
| start_height  | number | no       | 0              | Tinggi awal rescan                       |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Parameter          | Tipe     | Wajib    | Default | Deskripsi                                |
|--------------------|----------|----------|---------|------------------------------------------|
| include_addresses  | boolean  | tidak    | true    | Juga mengembalikan alamat untuk setiap akun |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Parameter | Tipe | Wajib | Deskripsi |
|-----------|------|-------|-----------|
| status    | string | tidak | Filter berdasarkan status (misalnya `"success"`) |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Parameter      | Tipe   | Wajib | Deskripsi                  |
|----------------|--------|-------|------------------------------|
| account_uuid   | string | tidak | Batasi ke satu akun         |
| start_height   | number | tidak | Batas bawah inklusif        |
| end_height     | number | tidak | Batas atas eksklusif        |
| offset         | number | tidak | Lewati sekian hasil         |
| limit          | number | tidak | Maksimum hasil yang dikembalikan    |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Parameter          | Tipe    | Wajib | Deskripsi                    |
|--------------------|---------|-------|------------------------------|
| unified_address    | string  | ya    | Unified Address untuk diperiksa        |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Parameter          | Tipe            | Wajib  | Default | Deskripsi                            |
|--------------------|-----------------|--------|---------|--------------------------------------|
| minconf            | number          | tidak  | 1       | Konfirmasi minimum                    |
| maxconf            | number          | tidak  | ∞       | Konfirmasi maksimum                   |
| include_watchonly  | boolean         | tidak  | false   | Sertakan watch-only                  |
| addresses          | array of string | tidak  |         | Filter ke alamat-alamat ini          |
| as_of_height       | number          | tidak  |         | Query per ketinggian (height) ini     |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Parameter | Tipe | Wajib | Deskripsi |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| accounts  | array | ya      | Array dari objek: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Parameter        | Tipe            | Wajib  | Default         | Deskripsi                                        |
|------------------|-----------------|--------|-----------------|--------------------------------------------------|
| fromaddress      | string          | ya     |                 | Alamat sumber atau `"ANY_TADDR"`                         |
| amounts          | array of object | ya     |                 | Penerima (`address`, `amount`, opsional `memo`)           |
| minconf          | number          | tidak  |                 | Konfirmasi minimum                               |
| fee              | null            | tidak  |                 | Harus berupa `null` (hanya ZIP-317)             |
| privacy_policy   | string          | tidak  | `"FullPrivacy"`            | String kebijakan privasi                         |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Parameter        | Tipe    | Wajib | Deskripsi                                        |
|------------------|---------|-------|--------------------------------------------------|
| fromaddress      | string  | ya    | Alamat transparan atau UUID akun                |
| toaddress        | string  | ya    | Tujuan terlindungi                              |
| fee              | null    | tidak | Harus berupa `null`                               |
| limit            | number  | tidak | Jumlah maksimal UTXO coinbase untuk dilindungi |
| memo             | string  | tidak | Memo terenkode hex                              |
| privacy_policy   | string  | tidak | `AllowRevealedSenders` atau `AllowLinkingAccountAddresses`                                 |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Parameter | Tipe   | Wajib | Deskripsi     |
|-----------|--------|-------|-----------------|
| txid      | string | ya    | ID Transaksi  |

---

## Halaman Terkait

- Panduan Migrasi [: Zcashd ke Zebrad dan Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — langkah demi langkah pindah dari pengaturan zcashd yang sudah ada
- [Zebra Full Node](/zcash-tech/zebra-full-node) — implementasi node yang bekerja bersama Zallet
- [Full Nodes](/zcash-tech/full-nodes) — apa saja yang terlibat dalam menjalankan full node dan mengapa kamu mungkin membutuhkannya
- [Dompet](/using-zcash/wallets) — opsi dompet yang lebih ringan jika full node terasa berlebihan bagi kebutuhanmu
- [Transaksi](/using-zcash/transactions) — bagaimana perbedaan antara transaksi terlindungi dan transparan