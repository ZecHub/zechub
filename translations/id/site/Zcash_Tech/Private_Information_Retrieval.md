# Pengambilan Informasi Privat

## Ringkasan

- Pengambilan informasi privat, atau PIR, memungkinkan perangkat mengambil satu item dari basis data server tanpa server mengetahui item mana yang diminta
- Zcash membutuhkannya karena dompet privat tidak dapat bertanya kepada server transaksi mana yang merupakan miliknya tanpa mengungkapkan identitasnya
- Saat ini, dompet mengunduh dan memindai jauh lebih banyak data daripada yang dibutuhkan, yang menjadi salah satu alasan utama sinkronisasi berjalan lambat
- PIR akan memungkinkan dompet mengambil hanya datanya sendiri secara privat, menghilangkan hambatan tersebut sekaligus menjaga privasi
- Ini merupakan bidang riset aktif untuk Zcash, secara teoretis sangat menjanjikan, dan sedang dibuat praktis untuk dompet sungguhan
- Demonstrasi langsung sudah tersedia: [ZecBlock Private](https://private.zecblock.com) adalah block explorer Zcash berbasis PIR pertama yang lengkap (transaksi, blok, dan alamat)

## Untuk siapa halaman ini

- Siapa pun yang pernah bertanya-tanya bagaimana dompet privat menemukan koinnya sendiri tanpa membocorkan koin mana
- Pendatang baru yang sering melihat PIR disebut bersama upaya penskalaan Zcash
- Pembaca yang ingin memahami konsepnya terlebih dahulu, lalu kriptografi di baliknya
- Siapa pun yang tertarik pada block explorer berbasis PIR yang sudah berfungsi

## Masalah yang diatasi PIR untuk Zcash

Zcash menyembunyikan siapa penerima suatu transaksi. Privasi itu menimbulkan pertanyaan yang sulit: jika jaringan tidak dapat melihat transaksi mana yang menjadi milik Anda, bagaimana dompet Anda sendiri menemukannya?

Saat ini, jawabannya sederhana. Dompet tidak dapat bertanya kepada server transaksi mana yang menjadi milik saya, karena pertanyaan itu akan mengungkapkan hal yang berusaha disembunyikan oleh Zcash. Jadi, dompet mengunduh banyak data lalu memeriksa setiap item secara lokal untuk mengetahui mana yang menjadi miliknya. Cara ini berhasil dan menjaga privasi, tetapi lambat dan membebani perangkat. Pemindaian ini adalah salah satu alasan utama sinkronisasi dompet terasa lamban.

Idealnya, dompet dapat meminta data yang benar-benar menjadi miliknya dari server dan menerimanya tanpa server mengetahui apa yang diminta. Itulah yang disediakan oleh pengambilan informasi privat.

## Apa itu PIR

Pengambilan informasi privat adalah metode kriptografi yang memungkinkan client membaca satu entri dari basis data server tanpa mengungkapkan kepada server entri mana yang dibaca.

Bayangkan sebuah perpustakaan tempat Anda bisa menerima buku yang tepat Anda inginkan, tetapi pustakawan tidak pernah tahu buku mana yang diberikan kepada Anda. Anda mendapatkan item yang diminta, sementara minat Anda tetap privat. PIR adalah versi matematis dari gagasan itu, yang diterapkan pada basis data apa pun.

Konsep ini telah dipelajari dalam kriptografi selama puluhan tahun. Konsep ini pertama kali diperkenalkan pada 1995 oleh Chor, Goldreich, Kushilevitz, dan Sudan, yang menjelaskan pendekatan dengan beberapa server. Versi server tunggal pertama menyusul pada 1997, dari Kushilevitz dan Ostrovsky. PIR bukan sesuatu yang diciptakan oleh Zcash; ini adalah bidang mapan yang kini diterapkan oleh Zcash untuk mengatasi masalah nyata yang sulit diselesaikan.

## Cara kerja PIR, tingkat dasar

Ada dua pendekatan umum untuk membangun PIR, dan perbedaannya penting.

Pendekatan pertama menggunakan beberapa server. Client mengirimkan sebagian kueri kepada masing-masing server, lalu menggabungkan jawaban mereka secara lokal. Tidak satu pun server memiliki cukup informasi untuk mengetahui apa yang diminta. Cara ini efisien, tetapi bergantung pada server yang tidak berkolusi satu sama lain, sesuatu yang sulit dijamin di dunia nyata.

Pendekatan kedua menggunakan satu server dan kriptografi cerdas sebagai pengganti beberapa pihak. Di sini, client mengandalkan alat khusus bernama enkripsi homomorfik. Pendekatan ini paling berguna untuk penerapan nyata karena tidak memerlukan beberapa server yang tidak berkolusi.

## Mekanismenya: enkripsi homomorfik

Enkripsi homomorfik adalah jenis enkripsi yang memungkinkan server melakukan komputasi atas data selagi data tersebut tetap terenkripsi. Server menghasilkan jawaban terenkripsi yang benar tanpa pernah melihat nilai yang mendasarinya.

Berikut gagasan di balik PIR server tunggal yang dibangun dengan cara ini. Client menginginkan item nomor tiga dari sebuah daftar. Client membuat kueri yang pada dasarnya berupa jawaban ya terenkripsi untuk posisi tiga dan jawaban tidak terenkripsi untuk setiap posisi lainnya. Bagi server, kueri ini hanyalah derau yang tidak bermakna; server tidak dapat mengetahui posisi yang berisi jawaban ya.

Server kemudian menggabungkan basis datanya dengan kueri terenkripsi menggunakan sifat khusus enkripsi homomorfik, yaitu mengalikan setiap item tersimpan dengan jawaban ya atau tidak terenkripsi yang sesuai, lalu menjumlahkan hasilnya. Hasilnya berupa satu paket terenkripsi yang hanya berisi item yang diinginkan client, tanpa mengungkapkan item yang dimaksud. Client mendekripsi paket itu dan membaca itemnya. Server telah menjawab pertanyaan tersebut tanpa pernah mengetahui pertanyaannya.

Versi yang lebih kuat, disebut PIR simetris, menambahkan jaminan kedua: client hanya mempelajari item yang dimintanya dan tidak mengetahui apa pun tentang entri lain dalam basis data. Ini melindungi basis data sekaligus client.

## Penjelasan lebih mendalam bagi pembaca teknis

Skema server tunggal modern dibangun di atas kriptografi kisi, yang paling umum menggunakan asumsi learning with errors. Kueri client berupa vektor ciphertext: enkripsi bernilai satu pada indeks target dan nol di tempat lain. Enkripsi ini bersifat homomorfik secara aditif, sehingga server dapat menjumlahkan ciphertext dan mengalikannya dengan entri basis data plaintext tanpa melakukan dekripsi.

Server memperlakukan basis data sebagai matriks, menerapkan vektor seleksi terenkripsi, lalu mengembalikan satu ciphertext yang akan didekripsi menjadi baris yang diinginkan. Karena kueri tidak dapat dibedakan dari derau acak, server tidak memperoleh informasi tentang indeks tersebut.

Hambatan historisnya selalu berupa biaya. Secara naif, server harus mengakses setiap entri dalam basis data untuk setiap kueri, yang mahal dari segi komputasi, sementara ukuran ciphertext besar dan mahal dari segi bandwidth. Riset terbaru mengatasi masalah ini dengan prapemrosesan. Skema seperti SimplePIR dan FrodoPIR memungkinkan server menyiapkan basis data terlebih dahulu dan memberikan petunjuk kecil kepada setiap client. Sebagian besar pekerjaan dipindahkan ke fase offline sehingga kueri langsung dapat diproses dengan cepat. Manfaat tambahan yang berguna adalah bahwa konstruksi berbasis kisi juga dianggap tahan terhadap serangan kuantum, sejalan dengan peralihan Zcash yang lebih luas menuju privasi pascakuantum.

## PIR di Zcash

PIR merupakan bagian dari upaya untuk membuat Zcash tetap privat dan cepat dalam skala besar.

Hambatan pemindaian dompet yang dijelaskan sebelumnya adalah sasaran utamanya. Riset di Valar Group mengembangkan teknik pengambilan informasi privat agar dompet dapat mengambil datanya sendiri dari server tanpa server mengetahui entri mana yang diminta. Salah satu penerapan konkretnya adalah memeriksa nullifier secara privat. Nullifier adalah penanda unik yang dipublikasikan ketika sebuah note dibelanjakan, sehingga dana yang sama tidak dapat dibelanjakan dua kali. Dompet sering kali perlu memeriksa apakah nullifier tertentu sudah muncul—dengan kata lain, apakah note masih belum dibelanjakan. Jika pemeriksaan itu dilakukan melalui server saat ini, informasi tentang note yang ditanyakan dapat bocor. Pengambilan informasi privat memungkinkan dompet mengajukan pertanyaan tersebut tanpa mengungkapkan nullifier mana yang ingin diperiksanya. Ini melengkapi upaya penskalaan lain, termasuk Project Tachyon dan perangkat lunak node baru, yang bertujuan menghilangkan batas kinerja yang saat ini menghambat dompet privat.

Penting untuk menjelaskan tahap pengembangannya dengan jujur. Ini masih berupa riset dan rekayasa aktif, belum menjadi fitur final yang sudah dirilis. Konsepnya sudah mapan dan arahnya sudah ditentukan, tetapi membuat PIR cukup efisien untuk dompet sehari-hari pada perangkat biasa adalah bagian sulit yang sedang dikerjakan.

## Contoh langsung: ZecBlock Private

Pada November 2026, ZecBlock meluncurkan **ZecBlock Private** (private.zecblock.com), versi explorer mereka yang menggunakan pengambilan informasi privat untuk pencarian transaksi, blok, dan alamat.

Ini adalah block explorer Zcash lengkap pertama (mencakup transaksi, blok, dan alamat) yang dibangun dengan PIR. Demonstrasi explorer PIR sebelumnya terbatas pada kueri yang lebih sempit, seperti saldo alamat.

### Cara kerja pencarian privat

- Kueri (ID transaksi, tinggi/hash blok, atau alamat) dienkripsi sepenuhnya di browser sebelum dikirim.
- Server memproses seluruh dataset yang dipublikasikan tanpa mengetahui catatan mana yang diminta.
- Server mengembalikan satu respons terenkripsi yang hanya dapat didekripsi oleh browser.
- Pencarian atas sesuatu yang ada tidak dapat dibedakan dari pencarian atas sesuatu yang tidak ada (ukuran dan bentuk permintaan sama).

Setelah setiap pencarian, situs menampilkan ringkasan singkat tentang hal yang dikirim secara persis, sehingga sifat privasinya mudah diperiksa.

### Langkah verifikasi

Setiap publikasi data ditandatangani. Browser memverifikasi tanda tangan pada setiap hasil sebelum menampilkannya, sehingga server yang berbahaya atau mengalami kesalahan tidak dapat mengganti data dengan data lain.

### Kemutakhiran data

Blok baru dipublikasikan setiap beberapa detik. Data di private explorer biasanya hanya berselisih sekitar 20 detik dari explorer ZecBlock biasa.

### Biaya bandwidth

PIR lebih mahal daripada pencarian biasa karena server harus mengakses seluruh dataset:

- Pencarian transaksi: sekitar 1,2 MB diunggah
- Pencarian alamat: sekitar 0,4 MB diunggah

Inilah biaya praktis agar server tidak mengetahui apa pun tentang kueri.

### Implementasi client

Client browser adalah wrapper Rust → WebAssembly (saat ini berada di repositori ZecBlock di bawah `prototype/pir-browser`). Wrapper ini dibangun di atas pustaka PIR open source dari Valar Group. Wrapper ini belum diterbitkan sebagai paket npm mandiri, tetapi penerbitannya direncanakan.

### Perbedaan dengan PIR untuk dompet

ZecBlock Private mendemonstrasikan PIR untuk data chain **publik** (mencari transaksi, blok, atau alamat yang sudah diketahui tanpa mengungkapkan yang mana). Ini **tidak** menyelesaikan masalah dompet yang lebih sulit: menemukan secara privat note mana yang menjadi milik suatu viewing key atau memeriksa secara privat nullifier untuk note yang belum dibelanjakan. Hal-hal tersebut masih menjadi bidang riset aktif.

## Kesalahpahaman umum

- PIR menyembunyikan item yang Anda minta, tetapi belum tentu menyembunyikan bahwa Anda menghubungi server; metadata pada tingkat jaringan adalah persoalan terpisah
- PIR tidak hanya ada di Zcash; ini adalah alat kriptografi umum yang diterapkan oleh Zcash untuk privasi dompet
- Sinkronisasi yang lebih cepat berkat PIR masih menjadi sasaran yang sedang diupayakan, bukan fitur yang sudah tersedia di dompet
- Mengunduh semuanya lalu memindainya secara lokal, pendekatan saat ini, menjaga privasi tetapi lambat; PIR bertujuan mempertahankan privasi sekaligus menghilangkan kelambatan

## Halaman terkait

- [Zcash Sinkronisasi Dompet](https://zechub.wiki/zcash-tech/zcash-wallet-syncing) - alasan sinkronisasi berjalan seperti sekarang
- [Node Lightwallet](https://zechub.wiki/zcash-tech/lightwallet-nodes) - model light client yang dapat ditingkatkan dengan PIR
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) - alat kriptografi utama lainnya di balik privasi Zcash
- [Keamanan Pascakuantum](https://zechub.wiki/zcash-tech/post-quantum-security) - alasan metode berbasis kisi penting untuk masa depan
- [ZecBlock](https://zecblock.com) - explorer publik utama
- [Valar Group](https://zechub.wiki/zcash-organizations/valar-group) - developer pustaka PIR yang digunakan oleh prototipe explorer dan riset dompet
