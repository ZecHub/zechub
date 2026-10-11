# Pengambilan informasi pribadi

## Ringkasan Singkat

- Private information retrieval, atau PIR, memungkinkan sebuah perangkat mengambil satu item dari database server tanpa membuat server mengetahui item mana yang diminta
- Zcash membutuhkan ini karena dompet pribadi tidak dapat menanyakan transaksi mana yang miliknya kepada server tanpa mengungkap identitasnya sendiri
- Saat ini, dompet mengunduh dan memindai jauh lebih banyak data daripada yang mereka butuhkan, yang menjadi alasan utama mengapa sinkronisasi berjalan lambat
- PIR akan memungkinkan sebuah dompet mengambil datanya sendiri secara privat, menghilangkan hambatan tersebut sambil tetap menjaga privasi tetap utuh
- Ini adalah area penelitian aktif bagi Zcash, sangat kuat secara teori, dan sedang diupayakan agar dapat diterapkan secara praktis untuk dompet nyata

<br/>

## Untuk siapa ini ditujukan

- Siapa pun yang pernah bertanya-tanya bagaimana sebuah dompet pribadi menemukan koinnya sendiri tanpa membocorkan koin mana saja itu
- Pendatang baru yang terus melihat PIR disebutkan bersamaan dengan pekerjaan penskalaan Zcash
- Pembaca yang ingin memahami konsepnya terlebih dahulu dan kriptografinya setelah itu

<br/>

## Masalah yang diselesaikan PIR untuk Zcash

Zcash menyembunyikan untuk siapa sebuah transaksi ditujukan. Privasi tersebut menimbulkan pertanyaan yang sulit: jika jaringan tidak dapat melihat transaksi mana yang milik Anda, bagaimana dompet Anda sendiri menemukannya?

Hari ini jawabannya sangat lugas. Sebuah dompet tidak dapat bertanya kepada server transaksi mana yang milik saya, karena pertanyaan tersebut akan mengungkap dengan tepat apa yang sedang coba disembunyikan oleh Zcash. Jadi sebagai gantinya, dompet mengunduh data dalam jumlah besar dan memeriksa setiap item secara lokal untuk melihat apa yang menjadi miliknya. Cara ini berhasil, dan menjaga privasi, tetapi lambat dan berat. Pemindaian ini adalah salah satu alasan utama mengapa sinkronisasi dompet dapat terasa lamban.

Idealnya adalah sebuah cara bagi dompet untuk meminta data miliknya secara tepat kepada server, dan menerimanya, tanpa server tersebut pernah mengetahui apa yang diminta. Itulah tepatnya yang disediakan oleh *private information retrieval*.

<br/>

## Apa itu PIR

Pengambilan informasi privat adalah metode kriptografi yang memungkinkan klien membaca satu entri dari basis data server tanpa mengungkapkan kepada server entri mana yang telah dibaca.

Bayangkan sebuah perpustakaan di mana Anda dapat menerima buku yang persis Anda inginkan, tetapi pustakawan tidak pernah tahu buku mana yang mereka berikan kepada Anda. Anda mendapatkan barang Anda, dan minat Anda tetap terjaga privasinya. PIR adalah versi matematis dari ide tersebut, yang diterapkan pada basis data apa pun.

Konsep ini telah dipelajari dalam kriptografi selama beberapa dekade. Konsep ini pertama kali diperkenalkan pada tahun 1995 oleh Chor, Goldreich, Kushilevitz, dan Sudan, yang mendeskripsikan pendekatan multi-server, dan versi single server pertama menyusul pada tahun 1997 dari Kushilevitz dan Ostrovsky. Ini bukanlah sesuatu yang diciptakan oleh Zcash, melainkan sebuah bidang mapan yang kini diterapkan oleh Zcash pada masalah nyata dan sulit.

<br/>

## Bagaimana cara kerja PIR, pada tingkat pertama

Ada dua cara luas untuk membangun PIR, dan perbedaannya sangat penting.

Metode pertama menggunakan beberapa server. Klien mengirimkan sebagian dari kueri ke masing-masing dari beberapa server tersebut, lalu menggabungkan jawaban mereka secara lokal. Tidak ada satu pun server yang melihat informasi yang cukup untuk mengetahui apa yang diminta. Hal ini efisien, namun bergantung pada kondisi di mana server-server tersebut tidak berkolusi satu sama lain, yang mana sulit untuk dijamin dalam dunia nyata.

Metode kedua menggunakan satu server tunggal dan kriptografi yang cerdas alih-alih banyak pihak. Di sini klien mengandalkan alat khusus yang disebut homomorphic encryption, dan inilah arah yang paling berguna untuk penerapan nyata, karena tidak memerlukan banyak server yang tidak berkolusi.

<br/>

## Mekanisme: enkripsi homomorfik

Enkripsi homomorfik adalah sejenis enkripsi yang memungkinkan server melakukan komputasi pada data selama data tersebut tetap terenkripsi. Server menghasilkan jawaban terenkripsi yang benar tanpa pernah melihat nilai-nilai dasarnya.

Berikut adalah ide di balik PIR single-server yang dibangun dengan cara ini. Klien menginginkan item nomor tiga dari sebuah daftar. Klien membuat kueri yang, pada dasarnya, merupakan "ya" terenkripsi untuk posisi ketiga dan "tidak" terenkripsi untuk setiap posisi lainnya. Bagi server, kueri ini hanyalah derau (noise) yang tidak berarti; server tidak dapat mengetahui posisi mana yang berisi jawaban "ya".

Server kemudian menggabungkan basis datanya dengan kueri terenkripsi ini menggunakan properti khusus dari enkripsi homomorfik, mengalikan setiap item yang tersimpan dengan jawaban "ya" atau "tidak" terenkripsi yang sesuai dan menjumlahkan hasilnya. Hasil akhirnya adalah sebuah paket terenkripsi tunggal yang berisi tepat item yang diinginkan klien, dan tidak ada satu pun yang mengungkapkan item mana itu. Klien mendekripsi paket tersebut dan membaca isinya. Server telah menjawab pertanyaan tersebut tanpa pernah mengetahui apa pertanyaannya.

Versi yang lebih kuat, yang disebut symmetric PIR, menambahkan jaminan kedua: klien hanya mempelajari item yang diminta dan tidak ada informasi apa pun mengenai entri lain dalam basis data. Hal tersebut melindungi basis data sekaligus klien.

<br/>

## Penjelasan lebih mendalam untuk pembaca teknis

Skema single-server modern dibangun di atas kriptografi lattice, yang paling umum adalah asumsi learning with errors. Query klien berupa vektor ciphertext, sebuah enkripsi dari satu nilai pada indeks target dan nol di tempat lain, dan enkripsinya bersifat additively homomorphic, sehingga server dapat menjumlahkan ciphertext dan mengalikannya dengan entri database plaintext tanpa melakukan dekripsi.

Server memperlakukan basis data sebagai sebuah matriks, menerapkan vektor seleksi terenkripsi, dan mengembalikan satu ciphertext tunggal yang jika didekripsi akan menghasilkan baris yang diinginkan. Karena kueri tersebut tidak dapat dibedakan dari noise acak, server tidak memperoleh informasi apa pun mengenai indeksnya.

Hambatan historisnya selalu berupa biaya. Secara naif, server harus menyentuh setiap entri dalam database untuk setiap kueri, yang mana mahal dalam hal komputasi, dan ciphertext berukuran besar, yang mana mahal dalam hal bandwidth. Penelitian terbaru mengatasi hal ini dengan preprocessing; skema seperti SimplePIR dan FrodoPIR memungkinkan server menyiapkan database sebelumnya dan memberikan petunjuk kecil kepada setiap client, memindahkan sebagian besar pekerjaan ke fase offline sehingga kueri langsung menjadi cepat. Manfaat sampingan yang berguna adalah konstruksi berbasis lattice juga dianggap tahan terhadap serangan kuantum, yang selaras dengan langkah Zcash yang lebih luas menuju privasi pasca-kuantum.

<br/>

## PIR dalam Zcash

PIR adalah bagian dari upaya untuk membuat Zcash menjadi privat sekaligus cepat dalam skala besar.

Hambatan pemindaian dompet yang dijelaskan sebelumnya adalah target utamanya. Tim di Valar Group sedang mengembangkan teknik *private information retrieval* agar sebuah dompet dapat mengambil datanya sendiri dari server tanpa membuat server mengetahui entri mana yang diminta. Salah satu penerapan konkretnya adalah memeriksa *nullifier* secara privat. *Nullifier* adalah penanda unik yang dipublikasikan saat sebuah *note* digunakan, yang mencegah dana yang sama digunakan dua kali. Sebuah dompet sering kali perlu memeriksa apakah suatu *nullifier* tertentu sudah muncul atau belum, dengan kata lain apakah sebuah *note* masih belum digunakan, dan melakukan hal tersebut melalui server saat ini dapat membocorkan *note* mana yang sedang ditanyakan. *Private information retrieval* memungkinkan dompet mengajukan pertanyaan tersebut tanpa mengungkapkan *nullifier* mana yang menjadi perhatiannya. Hal ini berjalan berdampingan dengan upaya penskalaan lainnya, termasuk Project Tachyon dan perangkat lunak node baru, yang bertujuan untuk menghilangkan batasan performa yang menghambat dompet terlindungi saat ini.

Sangat penting untuk bersikap jujur mengenai tahapannya. Ini adalah penelitian dan rekayasa aktif, bukan fitur yang sudah selesai atau dirilis. Konsepnya sudah mapan dan arahnya telah ditetapkan, namun membuat PIR cukup efisien untuk dompet sehari-hari pada perangkat biasa adalah bagian tersulit yang sedang dikerjakan saat ini.

<br/>

## Kesalahpahaman umum

- PIR menyembunyikan item mana yang Anda minta, namun tidak selalu menyembunyikan fakta bahwa Anda menghubungi server sama sekali; metadata pada tingkat jaringan adalah masalah terpisah
- PIR tidak hanya unik untuk Zcash, melainkan merupakan alat kriptografi umum yang diterapkan oleh Zcash untuk privasi dompet
- Sinkronisasi yang lebih cepat melalui PIR adalah tujuan yang sedang dalam proses pengembangan, bukan fitur yang sudah tersedia di dalam dompet
- Mengunduh semuanya dan memindai secara lokal, yang merupakan pendekatan saat ini, bersifat privat namun lambat; PIR bertujuan untuk menjaga privasi sambil menghilangkan kelambatan tersebut

<br/>

## Halaman terkait

- [Zcash Sinkronisasi Dompet](https://zechub.wiki/zcash-tech/zcash-wallet-syncing) - mengapa sinkronisasi bekerja seperti sekarang ini
- [Node Lightwallet](https://zechub.wiki/zcash-tech/lightwallet-nodes) - model light client yang akan ditingkatkan oleh PIR
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) - alat kriptografi utama lainnya di balik privasi Zcash
- [Keamanan Pasca-Quantum](https://zechub.wiki/zcash-tech/post-quantum-security) - mengapa metode berbasis lattice penting untuk masa depan