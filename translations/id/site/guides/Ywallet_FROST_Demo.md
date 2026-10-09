# Demo FROST Ywallet

> **Ywallet tidak lagi dikelola.** Pengembangnya telah mengonfirmasi bahwa dompet ini tidak akan diperbarui untuk Ironwood (NU6.3), sehingga tidak lagi dapat mengikuti rantai dan langkah-langkah di bawah ini tidak dapat diselesaikan di mainnet. Halaman ini tetap disimpan sebagai referensi. Zkool, dari pengembang yang sama, adalah penerus yang dikelola dan mendukung multisig FROST.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="Demo Transaksi Ywallet FROST"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div >


## Kompilasi binari FROST

Tautan GitHub [](https://github.com/ZcashFoundation/frost-zcash-demo)

Gunakan repositori di atas dan ikuti petunjuk dalam melakukan kompilasi:

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participant
```

Bins akan menjadi folder target.

## Membuat FROST UA

`./generateFROST_UA.sh`



## Impor UFVK ke dalam Ywallet

Akun -> Klik + dan tempel ufvk dari langkah di atas

## Membuat transaksi dengan Ywallet

Tempelkan UA apa pun dan kirim sebuah transaksi. Simpan filenya.

## Mulai prosedur penandatanganan FROST

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

input pertama adalah lokasi dari transaksi mentah dari langkah di atas
input kedua adalah lokasi dan nama transaksi yang telah ditandatangani yang ingin kamu siarkan
Ini adalah bagian di mana kamu memberi tahu FROST transaksi mana yang ingin kamu minta semua orang tandatangani

## Mulai Koordinator

`./runCoordinator.sh`

Ini mengoordinasikan tanda tangan setiap peserta dan membuat sebuah tanda tangan grup

## Pastikan setiap Peserta menandatangani transaksi ini

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Menyelesaikan transaksi yang telah ditandatangani

Di jendela koordinator, salin group signature yang dihasilkan dan tempelkan ke dalam jendela penandatanganan FROST.
Ini akan menyelesaikan penandatanganan FROST dan menghasilkan 'mysingedtx'


## Siarkan Transaksi kamu dengan Ywallet

Klik 'More' di sisi kanan bawah Ywallet dan temukan 'Broadcast'. Temukan 'mysignedtx' dan klik ok.

Jika semuanya berhasil, kamu akan mendapatkan ID transaksi :)