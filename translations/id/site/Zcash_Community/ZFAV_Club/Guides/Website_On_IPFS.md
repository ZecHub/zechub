<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Menerbitkan Situs Web di IPFS

![](/content-images/IPFS-40c2e22732.webp)

## Pengenalan ke IPFS

IPFS (InterPlanetary File System) adalah protokol dan jaringan peer-to-peer yang dirancang untuk menciptakan metode terdesentralisasi dalam menyimpan dan berbagi berkas.

Berbeda dengan model client-server tradisional pada internet, IPFS memungkinkan pengguna untuk berbagi file secara langsung satu sama lain, alih-alih mengandalkan server terpusat untuk menyimpan dan mendistribusikan konten.

File di IPFS dialamatkan menggunakan *content-addressing*, yang berarti setiap file diberikan hash unik atau CONTENT IDENTIFIER (CID) berdasarkan kontennya, dan hash ini digunakan untuk mengambil file tersebut dari jaringan.

Saat seorang pengguna menambahkan file ke IPFS, file tersebut dipecah menjadi potongan-potongan kecil yang disebut blok, dan setiap blok diberikan sebuah CID. Blok-blok ini kemudian disimpan pada node yang berbeda di dalam jaringan, sehingga file tersebut dapat diambil dengan mudah dari berbagai sumber.

Hal ini memastikan redundansi dan toleransi kesalahan sekaligus mempersulit satu node mana pun untuk menjadi titik kegagalan atau kendali tunggal.

Baca [Pengantar ke IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)



## Membuat Situs Anda

Untuk contoh ini, kita sedang membuat sebuah situs web sederhana.

Situs Contoh [](https://squirrel.surf)


**Langkah 1:** Jika Anda tidak terbiasa dengan desain web, tuliskan konten utama untuk situs web Anda termasuk Judul, Isi Utama teks, dengan tautan ke halaman/situs lain & footer.

**Langkah 2:** Gunakan templat [HTML!](https://nicepage.com/html-templates) Tempelkan teks yang telah Anda tulis dengan sesuai. Opsional untuk juga membuat stylesheet .CSS bagi situs web Anda.

**Langkah 3:** Simpan direktori Anda. Semua halaman .html + gambar harus berada dalam Folder yang sama.



## Menyiapkan sebuah Node

Unduh dan instal IPFS dari [Situs web resmi](https://docs.ipfs.tech/install/ipfs-desktop/).



### Inisialisasi IPFS:

Jika Anda menggunakan Aplikasi Desktop, Anda tidak perlu melakukan inisialisasi.

Menggunakan Terminal atau command prompt, Jalankan perintah: <mark>ipfs init </mark>.



**Tambahkan Folder Situs ke IPFS**:

Pilih folder yang berisi file situs web Anda dan navigasikan ke opsi Tambahkan Folder.

![](/content-images/ipfs-site-folder-2c96524d98.webp)

Please provide the Markdown fragment you would like me to translate. I am ready to begin the localization process following all your specified rules and terminology.

Jika menggunakan Terminal, Jalankan perintah: <mark>ipfs add -r "folder_name"</mark> untuk menambahkan seluruh folder secara rekursif ke IPFS.


### Pin Situs pada IPFS:

Setelah file situs web Anda ditambahkan ke IPFS, Anda perlu melakukan **pin** pada file tersebut untuk memastikan file tetap tersedia di jaringan.

Please provide the Markdown fragment you would like me to translate. I am ready to begin according to your instructions.

Jika menggunakan Terminal, Jalankan perintah: Jika menggunakan Terminal, Jalankan perintah: <mark>ipfs pin add "hash"</mark>

"hash" = CID dari folder yang Anda tambahkan pada langkah sebelumnya.


Sebagai alternatif, Anda juga dapat menyematkan direktori menggunakan layanan seperti [Pinata](https://pinata.cloud) atau [Dolpin](https://dolpin.io)

Ini sangat menghemat banyak waktu!

Please provide the Markdown fragment you would like me to translate. I am ready to begin the localization process following all your specified rules and terminology.

### Akses situs web Anda di IPFS:

Situs web Anda sekarang telah dipublikasikan di IPFS dan dapat diakses menggunakan hash dari folder tersebut. Untuk mengakses situs web Anda, Anda dapat mengunjungi https://ipfs.io/ipfs/"hash"

"hash" = CID dari folder tersebut.

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

Jika Anda sudah memiliki alamat web, Anda dapat menambahkan record baru menggunakan TXT record `_dnslink(domain Anda)`. Tergantung pada penyedianya, data ini mungkin akan terisi secara otomatis.

![](/content-images/example-c2a9edb28b.webp)

Akan membutuhkan waktu untuk menyebar melalui jaringan sebelum Anda dapat melihatnya.

Selamat! Anda telah menyiapkan situs web yang tahan terhadap sensor.


**Sumber Daya**

Dokumentasi [IPFS](https://docs.ipfs.tech)

Dokumentasi [IPNS](https://docs.ipfs.tech/concepts/ipns/)

Tautan DNS [Dokumentasi](https://dnslink.io/#introduction)