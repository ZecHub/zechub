# panduan pembangun hackathon ZecHub

## Ringkasan Singkat

- Ketahui alasan Anda membangun sebelum menulis kode, kegunaan lebih penting daripada kompleksitas
- Tetaplah sederhana, ide kecil yang diselesaikan dengan baik lebih baik daripada ide besar yang tidak selesai
- Pelajari stack infrastruktur Zcash sejak dini, ini adalah bagian pendakian yang paling terjal
- Jika aplikasi Anda memindahkan dana, ia harus berfungsi di mainnet, bangunlah di testnet, lalu buktikan di mainnet
- Dokumentasi dan demo yang jelas dapat lebih penting daripada produk itu sendiri
- Menang adalah garis awal, hal itu membangun reputasi Anda dan membuka pintu di dalam komunitas

<br/>

## Untuk siapa ini ditujukan

- Builder pemula yang mengikuti hackathon ZecHub atau Zcash
- Developer dari ekosistem lain yang baru mengenal Zcash
- Siapa pun yang ingin mengubah proyek hackathon menjadi sesuatu yang berkelanjutan

<br/>

## Mulai dengan mengapa

Sebelum Anda membuka editor, ketahui masalah apa yang sedang Anda selesaikan dan mengapa hal itu penting bagi orang lain. Sebuah pengujian yang baik adalah sederhana: jika sesuatu yang Anda bangun tidak ada, apakah ada orang yang akan merindukannya? Bangunlah sesuatu yang akan Anda gunakan sendiri. Privasi adalah alasan Zcash ada, jadi pahami mengapa privasi penting bagi orang-orang yang menjadi target pengembangan Anda, lalu biarkan hal tersebut membentuk seluruh proyek tersebut.

<br/>

## Pelajari stack terlebih dahulu

Kejutan yang paling umum bagi para developer dari chain lain adalah kurva pembelajaran untuk infrastruktur Zcash, bukan aspek pengkodeannya. Berikan waktu bagi diri Anda untuk memahami bagaimana setiap bagian saling terhubung sebelum Anda merancang aplikasi Anda. Mulailah dengan stack inti, yang sering disebut sebagai Z pangkat tiga: zebrad, sebuah server ringan, dan sebuah dompet. Kemudian, mulailah membiasakan diri dengan alat developer berikut:

1. Baca halaman developer di wiki pada [zechub.wiki/developers](https://zechub.wiki/developers), ini adalah langkah pertama yang direkomendasikan
2. Jelajahi zingolib dan zingo-cli, yang panggilan-panggilannya mencakup sebagian besar kebutuhan proyek di berbagai jalur
3. Lihat librustzcash dan dompet referensi ZODL untuk blok bangunan tingkat rendah
4. Untuk proyek FROST, gunakan frostd dari Zcash Foundation dan frost-core dari crates.io, dan manfaatkan AI untuk membantu definisi, meskipun penggunaan FROST secara aman tetap membutuhkan upaya dan waktu yang nyata

<br/>

## Memahami apa itu mainnet

Beberapa jalur mengharuskan aplikasi Anda untuk berinteraksi dengan mainnet Zcash. Dalam praktiknya, ini berarti proyek Anda, atau seseorang yang menggunakannya, termasuk agen AI, mengirim atau menerima dana asli di mainnet, atau membangun dan meningkatkan alat yang memungkinkan hal ini terjadi. Jika aplikasi Anda melakukan transaksi, Anda harus menunjukkannya di mainnet dalam pengajuan Anda.

Bangunlah di testnet saat Anda melakukan pengembangan. Aktivitas mainnet memakan biaya ZEC asli dan akan menjadi lebih mahal seiring berjalannya waktu, sehingga testnet adalah tempat yang direkomendasikan untuk melakukan iterasi. Beralihlah ke mainnet untuk proof akhir. Perhatikan satu detail saat Anda merancang alur Anda: ketika dana tiba di alamat terlindungi, dompet Anda harus memindai dan menemukannya sebelum dapat digunakan, dan pemindaian tersebut membutuhkan sedikit waktu. Masukkan waktu tunggu singkat tersebut ke dalam aplikasi Anda daripada berasumsi bahwa dana yang masuk siap digunakan secara langsung.

<br/>

## Tetap sederhana

Ide yang sederhana dan dieksekusi dengan baik telah berkali-kali mengalahkan ide yang kompleks. Para juri telah menyaksikan konsep dasar menang atas proyek yang lebih ambisius secara teknis dalam acara yang sama, karena konsep tersebut menyelesaikan masalah nyata dan mudah untuk dipahami. Ambillah beban kerja yang lebih sedikit dari apa yang Anda pikir dapat Anda selesaikan. Mengabaikan detail, cakupan yang terlalu besar, dan melewatkan riset adalah kesalahan-kesalahan yang membuat para pengembang kehilangan hadiah. Buatlah proyek Anda mudah untuk dipahami dan mudah untuk dijalankan, mulai dari konsep inti hingga perintah pertama.

<br/>

## Menangkan 30 detik pertama

Peninjau akan segera membentuk kesan yang kuat, sehingga presentasi, topik, dan visual memiliki bobot yang nyata, di samping seberapa baru solusi Anda. Dokumentasi dan demo yang jelas bukanlah sekadar pemikiran tambahan. Mengomunikasikan ide Anda terkadang lebih penting daripada ide itu sendiri, karena jika tidak ada yang memahami apa yang Anda bangun, hal tersebut tidak dapat berhasil. Penilaian cenderung menyeimbangkan kedalaman teknis, pengalaman pengguna, orisinalitas, dan kegunaan praktis, dan dokumentasi yang kuat akan meningkatkan semua aspek tersebut.

<br/>

## Lihat jejak yang lebih sulit dan lebih tipis

Jika Anda menginginkan kompetisi yang tidak terlalu padat, jalur yang lebih sulit sering kali memiliki lebih sedikit peserta hanya karena lebih sedikit orang yang mencobanya. Jalur Akuntansi adalah pilihan yang baik bagi pemula yang ingin menghindari pekerjaan transaksi on-chain. FROST sangat kuat dan kurang dimanfaatkan, serta dapat menjadi fondasi yang kokoh untuk sebuah proyek. Komunitas tidak menentukan apa yang harus dibangun, jadi membangun di atas alat mumpuni yang sudah dimiliki ekosistem, alih-alih memulai dari nol, adalah langkah yang cerdas.

<br/>

## Setelah hackathon

Menang bukanlah akhir dari segalanya. Kemenangan membangun portofolio dan reputasi Anda, membuka pintu di komunitas, dan dapat mengarah pada pendanaan melalui proposal.

1. Bawa proyek yang kuat lebih jauh sebagai proposal kepada ZecHub DAO atau Zcash Community Grants, dengan peta jalan, pencapaian, dan rasionalisasi anggaran
2. Tetap aktif di komunitas melalui forum, Discord, dan X
3. Ikuti pertemuan R&D Arborist, kirimkan ide, dan mintalah umpan balik
4. Teruslah membangun meskipun Anda tidak menang, dan nantikan hackathon berikutnya

<br/>

## Halaman terkait

- [Sumber Daya Developer](https://zechub.wiki/developers) - pemberhentian pertama bagi Zcash pembangun
- [Zebra Full Node](https://zechub.wiki/zcash-tech/zebra-full-node) - node pada dasar tumpukan
- [FROST](https://zechub.wiki/zcash-tech/frost) - threshold signatures untuk proyek tingkat lanjut

<br/>

<small>Panduan ini disusun berdasarkan wawasan dari kontributor inti ZecHub yaitu squirrel, Dismad, dan Tron.</small>