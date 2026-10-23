<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Sajikan Repo GitHub dengan IPFS

## Pendahuluan

Dalam panduan ini, kita akan mempelajari cara membuat URL yang dapat di-clone menggunakan git untuk repositori GitHub kamu yang disajikan menggunakan IPFS CID.

Ini berguna untuk memastikan ketersediaan konten tanpa memandang wilayah geografis, ketahanan terhadap sensor, dan sebagai cadangan persisten dari informasi berharga!

Catatan: Data yang diunggah ke IPFS tersedia bagi semua pengguna jaringan. Kamu mungkin ingin mengenkripsi data pribadi/sensitif secara lokal.

## Instal IPFS Kubo

Ikuti instruksi instalasi yang disediakan [di sini](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

Dalam contoh ini kita menggunakan Linux, versi OS lainnya juga tersedia.

Periksa apakah instalasi telah berhasil menggunakan `ipfs –version`

## Klon Repositori

Untuk memulai, pilih repositori Git yang ingin kamu host & klon repositori tersebut:

Jalankan Perintah: “git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)

Sekarang, untuk menyiapkannya agar dapat dikloning melalui IPFS.

cd zechub git update-server-info

Membongkar objek Gits:

![](/content-images/image-2024-04-20-175848513-2ceb90dd7b.webp)

Melakukan hal ini akan memungkinkan IPFS untuk melakukan deduplikasi objek jika kamu memperbarui repositori Git di kemudian hari.

## Tambahkan ke IPFS

Setelah kamu selesai melakukan hal tersebut, repositori tersebut sudah siap untuk disajikan. Yang tersisa hanyalah menambahkannya ke IPFS:

$ pwd

/code/myrepo

$ ipfs add -r

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

CID yang dihasilkan: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

Luar biasa! Sekarang repositori kamu telah diunggah ke jaringan.

## Klon menggunakan IPFS

Sekarang kamu seharusnya sudah bisa mengambil repositori GitHub menggunakan:

git clone http://ipfs.io/ipfs/yourCID

Sebagai alternatif, kamu dapat melakukan pencarian & pengambilan data menggunakan node IPFS lokal milikmu.

Catatan Akhir: Folder repo pada IPFS tidak menerima pembaruan bersamaan dengan repositori GitHub yang sebenarnya. Disarankan untuk mengunggah ulang folder tersebut secara berkala.