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

Saat seorang pengguna menambahkan file ke IPFS, file tersebut dipecah menjadi potongan-potongan kecil yang disebut blok, dan setiap blok diberikan sebuah CID. Blok-blok ini kemudian disimpan pada node yang berbeda di dalam jaringan, sehingga file tersebut dapat diambil dengan mudah dari berbagai sumber.

Hal ini memastikan redundansi dan toleransi kesalahan sekaligus mempersulit satu node mana pun untuk menjadi titik kegagalan atau kendali tunggal.

**Baca: [Pengantar ke IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)**

## Membuat Situs Kamu

Untuk contoh ini, kita akan membuat sebuah situs web sederhana.

Situs Contoh [](https://squirrel.surf/)

**Langkah 1:** Jika kamu belum terbiasa dengan desain web, tulislah konten utama untuk situs webmu termasuk Judul, Isi Teks Utama, dengan tautan ke halaman/situs lain & footer.

**Langkah 2:** Gunakan templat [HTML!](https://nicepage.com/html-templates) Tempel teks yang telah kamu tulis dengan sesuai. Opsional untuk juga membuat stylesheet .CSS bagi situs web kamu.

**Langkah 3:** Simpan direktori kamu. Semua halaman .html + gambar harus berada dalam Folder yang sama.

## Menyiapkan sebuah Node

Unduh dan instal IPFS dari [situs web resmi](https://docs.ipfs.tech/install/ipfs-desktop/).

### Inisialisasi IPFS:

Jika kamu menggunakan Aplikasi Desktop, kamu tidak perlu melakukan inisialisasi.

Menggunakan Terminal atau command prompt, Jalankan perintah: `ipfs init`

### **Tambahkan Folder Situs ke IPFS**:

Pilih folder yang berisi file situs web kamu dan navigasikan ke opsi Tambahkan Folder.


<a href="">
    <img src="/content-images/ipfs-site-folder-2c96524d98.webp" alt="" width="400" height="200"/>
</a>

Please provide the Markdown fragment you would like me to translate. I am ready to begin once you provide the source text.

Jika menggunakan Terminal, jalankan perintah: `ipfs add -r folder_name` untuk menambahkan seluruh folder secara rekursif ke IPFS.

### Pin Situs pada IPFS:

Setelah file situs web kamu ditambahkan ke IPFS, kamu perlu melakukan **pin** pada file tersebut untuk memastikan file tetap tersedia di jaringan.

Please provide the Markdown fragment you would like me to translate. I am ready to begin the localization process following all your specified rules and terminology.

Jika menggunakan Terminal, jalankan perintah: Jika menggunakan Terminal, jalankan perintah: `ipfs pin add **hash**`

**hash** = CID dari folder yang kamu tambahkan pada langkah sebelumnya.

Sebagai alternatif, kamu juga dapat menyematkan direktori menggunakan layanan seperti [Pinata](https://pinata.cloud/) atau [Dolpin](https://dolpin.io/)

Ini sangat menghemat banyak waktu!

Please provide the Markdown fragment you would like me to translate. I am ready to begin the localization process following all your specified rules and terminology.

### Akses situs web kamu di IPFS:

Situs web kamu sekarang telah dipublikasikan di IPFS dan dapat diakses menggunakan hash dari folder tersebut. Untuk mengakses situs web kamu, kamu dapat mengunjungi https://ipfs.io/ipfs/**hash**

**hash** = CID dari folder tersebut.

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

Jika kamu sudah memiliki alamat web, kamu dapat menambahkan record baru menggunakan TXT record `_dnslink(domain kamu)`. Tergantung pada penyedianya, ini mungkin akan terisi secara otomatis.


<a href="">
    <img src="/content-images/example-c2a9edb28b.webp" alt="" width="400" height="100"/>
</a>


Akan membutuhkan waktu untuk menyebar melalui jaringan sebelum kamu dapat melihatnya.

*Selamat! Kamu sekarang memiliki situs web yang tahan sensor.*

Please provide the Markdown fragment you would like me to translate. I am ready to begin once you input the text.

**Sumber Daya**

Dokumentasi [IPFS](https://docs.ipfs.tech/)

Dokumentasi [IPNS](https://docs.ipfs.tech/concepts/ipns/)

Tautan DNS [Docs](https://dnslink.io/#introduction)