<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Publikasikan Situs di IPFS

<a href="">
    <img src="/content-images/IPFS-40c2e22732.webp" alt="" width="800" height="400"/>
</a>



## Pengenalan ke IPFS

IPFS (InterPlanetary File System) adalah protokol dan jaringan peer-to-peer yang dirancang untuk menciptakan metode terdesentralisasi dalam menyimpan dan berbagi file.

Berbeda dengan model client-server tradisional pada internet, IPFS memungkinkan pengguna untuk berbagi file secara langsung satu sama lain, alih-alih mengandalkan server terpusat untuk menyimpan dan mendistribusikan konten.

File di IPFS dialamatkan menggunakan *content-addressing*, yang berarti setiap file diberikan hash unik atau CONTENT IDENTIFIER (CID) berdasarkan kontennya, dan hash ini digunakan untuk mengambil file tersebut dari jaringan.

IPFS menyimpan konten sebagai blok-blok yang diidentifikasi dengan CID. Menambahkan file berarti menyimpannya di node milikmu; file tersebut tidak otomatis disalin ke node lain. Pastikan ada salinan yang tetap online dan dapat dijangkau, atau atur remote pinning, agar pembaca lain dapat mengambilnya. Lihat [IPFS persistensi](https://docs.ipfs.tech/concepts/persistence/).

**Baca: [Pengantar ke IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)**

## Membuat Situs Kamu

Untuk contoh ini, kita akan membuat sebuah situs web sederhana.

Situs Contoh [](https://squirrel.surf/)

**Langkah 1:** Jika kamu belum terbiasa dengan desain web, tulislah konten utama untuk situs webmu termasuk Judul, Isi Teks Utama, dengan tautan ke halaman/situs lain & footer.

**Langkah 2:** Gunakan templat [HTML!](https://nicepage.com/html-templates) Tempel teks yang telah kamu tulis dengan sesuai. Opsional untuk juga membuat stylesheet .CSS bagi situs web kamu.

**Langkah 3:** Letakkan halaman beranda kamu di `index.html` pada root folder situs. Sertakan gambar dan CSS-nya dengan menggunakan path relatif seperti `style.css` agar semuanya juga berfungsi di bawah URL gateway IPFS.

## Menyiapkan sebuah Node

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) mengelola node untukmu. Biarkan tetap berjalan selama kamu membagikan situsmu.

Untuk [jalur command-line](https://docs.ipfs.tech/how-to/command-line-quick-start/), inisialisasi repositori baru sekali saja:

```sh
ipfs init
```

Lalu jalankan node dan biarkan terminal ini tetap terbuka:

```sh
ipfs daemon
```

Jalankan perintah lainnya di terminal kedua. Jangan memulai daemon kedua jika IPFS Desktop sudah mengelola repositori ini.

### **Tambahkan Folder Situs ke IPFS**:

Di IPFS Desktop, pilih folder yang berisi file situs web kamu menggunakan opsi Add Folder.

<a href="">
    <img src="/content-images/ipfs-site-folder-2c96524d98.webp" alt="" width="400" height="200"/>
</a>

–

Untuk cara lewat CLI, jalankan perintah ini dari direktori induk folder situs kamu:

```sh
ipfs add -r folder_name
```

Ganti `folder_name` dengan nama folder kamu (beri tanda kutip pada nama yang mengandung spasi). Simpan CID yang ada di baris `added ... folder_name` terakhir: CID tersebut mengidentifikasi seluruh direktori, bukan hanya `index.html`.

### Pin Situs pada IPFS:

Perintah CLI `ipfs add` secara default mem-pin konten yang diimpor secara lokal. Periksa pin folder dengan:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

Ganti `YOUR_FOLDER_CID` dengan CID dari langkah sebelumnya; output-nya seharusnya menampilkan `recursive`. Pinning melindungi salinan di node ini dari garbage collection, tetapi tidak membuat komputer yang dimatikan tetap online. Agar konten tetap tersedia saat node kamu sedang offline, atur [remote pinning](https://docs.ipfs.tech/how-to/work-with-pinning-services/) dan pastikan layanan remote sudah selesai melakukan pinning.

### Akses situs web kamu di IPFS:

Periksa dulu situs kamu melalui gateway lokal di `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` (gunakan port gateway yang ditampilkan oleh daemon kamu jika berbeda). Garis miring di akhir memungkinkan tautan relatif diarahkan dengan benar di dalam direktori.

Gateway publik seperti `https://ipfs.io/ipfs/YOUR_FOLDER_CID/` dapat menyajikannya setelah gateway tersebut bisa mengambil konten dari node yang dapat dijangkau. Pratinjau lokal yang berhasil tidak membuktikan bahwa konten tersebut tersedia secara publik.

Dalam kasus kita CID = QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3

## IPNS

Interplanetary Naming System (IPNS) memungkinkan kamu untuk memperbarui CID IPFS yang terkait dengan situs webmu dan tetap menyajikan tautan statis. Ini disediakan sebagai sebuah kunci.


<a href="">
    <img src="/content-images/dns-query.a0134a75-9ef7817f80.webp" alt="" width="400" height="100"/>
</a>


Di menu pengaturan untuk folder situs kamu pada aplikasi desktop IPFS, pilih Publish to IPNS.

<a href="">
    <img src="/content-images/IPNS-2fe62cc369.webp" alt="" width="400" height="200"/>
</a>


Kunci: “k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

Ini juga dapat digunakan untuk melihat situs kami melalui gateway: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## Tautan DNS

Situs telah dibuat, sekarang kita membutuhkan cara untuk mengarahkan URL ke konten tersebut.

Untuk `example.com`, tambahkan record DNS ini, lalu ganti `YOUR_FOLDER_CID` dengan CID direktori kamu:

| Tipe | Nama | Nilai |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

Beberapa penyedia DNS menambahkan zona secara otomatis, jadi di sana kamu cukup memasukkan `_dnslink`. Jika kamu menggunakan nama IPNS di atas, nilainya juga bisa diisi dengan `dnslink=/ipns/YOUR_IPNS_NAME`. Lihat [DNSLink](https://docs.ipfs.tech/concepts/dnslink/).

<a href="">
    <img src="/content-images/example-c2a9edb28b.webp" alt="" width="400" height="100"/>
</a>


Setelah propagasi DNS selesai, coba `https://ipfs.io/ipns/example.com/`. Untuk menyajikan situs langsung di `https://example.com/`, kamu juga memerlukan gateway yang mendukung DNSLink dan konfigurasi HTTPS; record TXT saja tidak mengatur keduanya. Ikuti [panduan domain kustom](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/).

*Selamat! Kamu sekarang memiliki situs web yang tahan sensor.*

____

**Sumber Daya**

Dokumentasi [IPFS](https://docs.ipfs.tech/)

Dokumentasi [IPNS](https://docs.ipfs.tech/concepts/ipns/)

Tautan DNS [Docs](https://dnslink.io/#introduction)