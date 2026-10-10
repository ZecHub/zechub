<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Memo

#### Mengirim Memo Terenkripsi

Saat mengirim transaksi Z2Z (terlindungi-ke-terlindungi), kamu dapat menyertakan sebuah memo (pesan) di dalam transaksi tersebut. Memo ini dapat digunakan untuk berbagai hal yang berbeda.

#### Menandatangani Transaksi

Memo utamanya digunakan untuk menandai pembayaran. Karena transaksi terlindungi mengenkripsi data kamu, kamu tidak akan bisa melihat siapa yang mengirim ZEC kepadamu, dan apa kemungkinan ZEC tersebut. Pengguna dapat menggunakan kolom memo untuk mencantumkan nama atau pseudonim mereka agar pihak lawan transaksi tahu dari siapa transaksi tersebut berasal. Mereka juga dapat menjelaskan tujuan dari transaksi tersebut.

#### Mengirim Pesan

Kegunaan lain dari memo terenkripsi adalah untuk mengirim pesan kepada seseorang dengan z-addr. Pesan-pesan ini bisa tentang apa saja, baik itu berupa [pengingat untuk seorang teman](https://twitter.com/iansagstette/status/1542142468505870336), atau [pesan sensitif yang harus tetap sejauh mungkin terjaga privasinya](https://twitter.com/InsideZcash/status/1545800146352578560).

#### Catatan Cinta di Blockchain

Ada seseorang yang mengirimkan catatan cinta kepada pasangannya di salah satu blok pertama dalam blockchain Zcash. Seseorang menemukan bahwa pasangannya telah mengirimkan sebuah berkas kepadanya melalui Zcash memo. Berkas ini adalah tiket untuk sebuah acara khusus di luar negeri, yang telah dibicarakan olehnya dan kekasih jauhnya untuk dihadiri bersama. Memo tersebut adalah sebuah catatan cinta.

#### Lanjutan

> **Historis. Demo ini tidak lagi berjalan seperti yang tertulis.**
>
> Demo di bawah ini menggunakan zcashd, dan script [penerima](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh)-nya membaca memo melalui `zcash-cli`. zcashd telah mencapai penghentian otomatis End-of-Support pada 18 Juli 2026, sehingga script tersebut tidak dapat menjangkau node yang sedang berjalan, dan belum dipindahkan.
>
> Membaca memo terlindungi dari command line masih berfungsi di Zallet: `zallet rpc z_listunspent` mengembalikan setiap catatan terlindungi yang diterima dengan field `memoStr` yang sama dengan yang dibaca oleh script tersebut. Lihat [Zallet Panduan Referensi Cepat](/using-zcash/zallet-quick-reference-guide) untuk perintahnya, dan [panduan migrasi ke Zebra serta Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) untuk memindahkan node dari zcashd. Zallet masih dalam tahap beta.
>
> Bagian ini tetap dipertahankan sebagai catatan historis dari demo Magic-Wormhole.

Berikut adalah cara menggunakan Zcash Memo Terlindungi dengan Magic-Wormhole CLI dan zcashd untuk mengirim file secara aman dari satu komputer ke komputer lainnya!:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DEMO: Transfer File Terenkripsi dengan Zcash 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div >

#### Sumber Daya

[Bidang Memo Terenkripsi](https://electriccoin.co/blog/encrypted-memo-field/)


