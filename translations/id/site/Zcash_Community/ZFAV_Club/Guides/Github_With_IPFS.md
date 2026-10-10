<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Melayani Repositori Github dengan IPFS

## Pendahuluan

Dalam panduan ini kita akan mempelajari cara membuat URL yang dapat di-clone dengan git untuk repositori GitHub Anda yang disajikan menggunakan IPFS CID. Hal ini berguna untuk memastikan ketersediaan konten tanpa memandang wilayah geografis, ketahanan terhadap sensor, dan sebagai cadangan persisten dari informasi berharga!

Catatan: Data yang diunggah ke IPFS tersedia bagi *semua* pengguna jaringan. Anda mungkin ingin mengenkripsi data pribadi/sensitif secara lokal.


## Instal IPFS Kubo

Ikuti instruksi instalasi yang disediakan [di sini](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

Dalam contoh ini kami menggunakan Linux, versi OS lainnya tersedia.

Pemeriksaan instalasi telah berhasil menggunakan "ipfs --version"


## Klon Repositori

Untuk memulai, pilih repositori Git yang ingin Anda host & klon repositori tersebut:

Jalankan Perintah: "git clone https://github.com/zechub/zechub"

![](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)


Sekarang, untuk menyiapkannya agar dapat dikloning melalui IPFS.

cd zechub
git update-server-info


Membongkar objek Git:

mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f *.pack objects/pack/*

Melakukan hal ini akan memungkinkan IPFS untuk melakukan deduplikasi objek jika Anda memperbarui repositori Git di kemudian hari.


## Tambahkan ke IPFS

Setelah Anda selesai melakukan hal tersebut, repositori tersebut siap untuk disajikan. Yang tersisa hanyalah menambahkannya ke IPFS:

$ pwd

/code/myrepo

$ ipfs add -r .

![](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

CID yang dihasilkan: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

Luar biasa! Sekarang repositori Anda telah diunggah ke jaringan.


## Klon menggunakan IPFS

Anda sekarang seharusnya sudah dapat mengambil repositori GitHub menggunakan:

git clone http://ipfs.io/ipfs/"yourCID"

Sebagai alternatif, Anda dapat melakukan pencarian & pengambilan menggunakan node IPFS lokal Anda.

Catatan Akhir: Folder repo pada IPFS tidak menerima pembaruan bersamaan dengan repositori GitHub yang sebenarnya. Disarankan untuk mengunggah ulang folder tersebut secara berkala.