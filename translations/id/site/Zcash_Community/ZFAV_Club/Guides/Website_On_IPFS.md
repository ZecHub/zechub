<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Menerbitkan Situs Web di IPFS

![](/content-images/IPFS-40c2e22732.webp)

## Pengenalan ke IPFS

IPFS (InterPlanetary File System) adalah protokol dan jaringan peer-to-peer yang dirancang untuk menciptakan metode terdesentralisasi dalam menyimpan dan berbagi berkas.

Berbeda dengan model client-server tradisional pada internet, IPFS memungkinkan pengguna untuk berbagi file secara langsung satu sama lain, alih-alih mengandalkan server terpusat untuk menyimpan dan mendistribusikan konten.

File di IPFS dialamatkan menggunakan *content-addressing*, yang berarti setiap file diberikan hash unik atau CONTENT IDENTIFIER (CID) berdasarkan kontennya, dan hash ini digunakan untuk mengambil file tersebut dari jaringan.

IPFS menyimpan konten sebagai blok-blok yang diidentifikasi oleh CID. Menambahkan file akan menyimpannya di node Anda; file tersebut tidak otomatis disalin ke node lain. Pastikan ada salinan yang tetap online dan dapat dijangkau, atau atur remote pinning, agar pembaca lain dapat mengambilnya. Lihat persistensi [IPFS](https://docs.ipfs.tech/concepts/persistence/).

Baca [Pengantar ke IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)



## Membuat Situs Anda

Untuk contoh ini, kita sedang membuat sebuah situs web sederhana.

Situs Contoh [](https://squirrel.surf)


**Langkah 1:** Jika Anda tidak terbiasa dengan desain web, tuliskan konten utama untuk situs web Anda termasuk Judul, Isi Utama teks, dengan tautan ke halaman/situs lain & footer.

**Langkah 2:** Gunakan templat [HTML!](https://nicepage.com/html-templates) Tempelkan teks yang telah Anda tulis dengan sesuai. Opsional untuk juga membuat stylesheet .CSS bagi situs web Anda.

**Langkah 3:** Letakkan halaman beranda Anda di `index.html` pada root folder situs. Sertakan gambar dan CSS-nya dengan menggunakan path relatif seperti `style.css` agar semuanya juga berfungsi di bawah URL gateway IPFS.

## Menyiapkan sebuah Node

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) mengelola node untuk Anda. Biarkan tetap berjalan selama Anda membagikan situs Anda.

Untuk [jalur baris perintah](https://docs.ipfs.tech/how-to/command-line-quick-start/), inisialisasi repositori baru satu kali:

```sh
ipfs init
```

Kemudian jalankan node dan biarkan terminal ini tetap terbuka:

```sh
ipfs daemon
```

Jalankan perintah lainnya di terminal kedua. Jangan memulai daemon kedua jika IPFS Desktop sudah mengelola repositori ini.

**Tambahkan Folder Situs ke IPFS**:

Di IPFS Desktop, pilih folder yang berisi file situs web Anda menggunakan opsi Add Folder.

![](/content-images/ipfs-site-folder-2c96524d98.webp)

--

Untuk cara melalui CLI, jalankan perintah ini dari direktori induk folder situs Anda:

```sh
ipfs add -r folder_name
```

Ganti `folder_name` dengan nama folder Anda (beri tanda kutip pada nama yang mengandung spasi). Simpan CID pada baris `added ... folder_name` terakhir: CID tersebut mengidentifikasi seluruh direktori, bukan hanya `index.html`.

### Pin Situs pada IPFS:

Perintah CLI `ipfs add` secara default menyematkan konten yang diimpor secara lokal. Periksa sematan folder dengan:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

Ganti `YOUR_FOLDER_CID` dengan CID dari langkah sebelumnya; output-nya seharusnya menampilkan `recursive`. Pinning melindungi salinan di node ini dari garbage collection, tetapi tidak membuat komputer yang dimatikan tetap online. Agar konten tetap tersedia saat node Anda offline, atur [remote pinning](https://docs.ipfs.tech/how-to/work-with-pinning-services/) dan pastikan layanan remote telah selesai melakukan pinning.

### Akses situs web Anda di IPFS:

Pertama, periksa situs Anda melalui gateway lokal di `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` (gunakan port gateway yang ditampilkan oleh daemon Anda jika berbeda). Garis miring di akhir memungkinkan tautan relatif diselesaikan di dalam direktori.

Gateway publik seperti `https://ipfs.io/ipfs/YOUR_FOLDER_CID/` dapat menyajikannya setelah gateway tersebut dapat mengambil konten dari node yang dapat dijangkau. Pratinjau lokal yang berhasil tidak membuktikan bahwa konten tersedia secara publik.

Dalam kasus kami CID = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3"


## IPNS

Interplanetary Naming System (IPNS) memungkinkan Anda untuk memperbarui CID IPFS yang terkait dengan situs web Anda dan tetap menyajikan tautan statis. Ini disediakan sebagai kunci.

![](/content-images/dns-query.a0134a75-9ef7817f80.webp)

Dalam menu pengaturan untuk folder situs Anda pada aplikasi desktop IPFS, pilih Publish to IPNS.

![](/content-images/IPNS-2fe62cc369.webp)

Kunci: "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

Ini juga dapat digunakan untuk melihat situs kami melalui gateway: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## Tautan DNS
 
Situs telah dibuat, sekarang kita membutuhkan cara untuk mengarahkan URL ke konten tersebut.

Untuk `example.com`, tambahkan catatan DNS berikut dan ganti `YOUR_FOLDER_CID` dengan CID direktori Anda:

| Jenis | Nama | Nilai |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

Beberapa penyedia DNS menambahkan zona secara otomatis; cukup masukkan `_dnslink` di sana. Jika menggunakan nama IPNS di atas, nilainya dapat diganti dengan `dnslink=/ipns/YOUR_IPNS_NAME`. Lihat [DNSLink](https://docs.ipfs.tech/concepts/dnslink/).

![](/content-images/example-c2a9edb28b.webp)

Setelah propagasi DNS selesai, coba `https://ipfs.io/ipns/example.com/`. Menyajikan situs secara langsung di `https://example.com/` juga memerlukan gateway yang mendukung DNSLink serta konfigurasi HTTPS; record TXT saja tidak menyiapkan hal-hal tersebut. Ikuti [panduan domain kustom](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/).

Selamat! Anda telah menyiapkan situs web yang tahan terhadap sensor.


**Sumber Daya**

Dokumentasi [IPFS](https://docs.ipfs.tech)

Dokumentasi [IPNS](https://docs.ipfs.tech/concepts/ipns/)

Tautan DNS [Dokumentasi](https://dnslink.io/#introduction)