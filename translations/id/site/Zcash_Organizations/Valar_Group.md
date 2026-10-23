<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Organizations/Valar_Group.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Valar Group

Kunjungi situs web [](https://valargroup.dev/)

<img width="200" height="200" alt="254678133" src="/content-images/0dc8c697-bcad-492a-b024-89b502d27af4-4c0d4552c2.webp" />


## Pernyataan Misi

Valar Group adalah organisasi teknik independen yang berfokus pada penskalaan Zcash, memperkuat tata kelola pemegang koin, serta meningkatkan privasi, performa, dan ketahanan jangka panjang dari protokol tersebut.

Fokus kerjanya terkonsentrasi pada infrastruktur tingkat protokol: pemungutan suara pemegang token secara privat, perangkat lunak full node berperforma tinggi, teknologi sinkronisasi dompet, dan peningkatan jaringan yang membuat Zcash terlindungi menjadi lebih mudah digunakan dalam skala yang lebih besar.

Organisasi ini bertujuan untuk memberikan cara bagi pemegang ZEC untuk mengekspresikan preferensi secara privat, memberikan perangkat lunak yang lebih cepat dan mumpuni kepada operator node, serta memberikan alat pada dompet yang menjaga privasi pengguna sekaligus mengurangi biaya partisipasi dalam jaringan.

## Latar Belakang

Valar Group dipimpin oleh Dev Ojha (ValarDragon), seorang cofounder Osmosis dan anggota tim yang meluncurkan Cosmos. Selama satu dekade terakhir, ia telah bekerja di berbagai bidang zk-SNARKs, konsensus BFT, dan sistem DeFi produksi.

Karya publik grup ini di Zcash menjadi menonjol saat ekosistem beralih ke tim protokol independen setelah reorganisasi pengembangan inti pada tahun 2026. Valar Group muncul sebagai salah satu organisasi yang membangun infrastruktur Zcash generasi berikutnya bersama dengan Project Tachyon, Shielded Labs, ZODL, dan Zcash Foundation.

Tema yang berulang dalam karyanya adalah bahwa properti privasi Zcash harus melampaui pembayaran. Jika pemegang aset diminta untuk memberikan suara pada penerbitan, waktu blok, atau cakupan peningkatan jaringan, mereka harus dapat melakukannya dari saldo terlindungi tanpa mengungkapkan identitas, saldo, atau suara individu. Persyaratan tersebut mendorong Valar Group untuk merancang dan meluncurkan rantai pemungutan suara khusus bagi pemilik koin.

Latar belakang skalabilitas dan kriptografi yang sama juga membentuk pekerjaan pada node dan sinkronisasi. Blok yang lebih cepat, sinkronisasi dompet yang lebih ringan, dan full node yang lebih mumpuni dianggap sebagai prasyarat bagi uang privat yang dapat digunakan pada skala jaringan pembayaran, bukan hanya sebagai penyimpan nilai.

## Visi

Materi publik dan pekerjaan proyek Valar Group mengarah pada jaringan Zcash yang dapat:

- Mendukung pemungutan suara pemegang koin yang privat dan dapat diaudit sebagai proses tata kelola yang dapat diulang.
- Menskalakan pembayaran proof-of-work tanpa mengorbankan privasi terlindungi.
- Mengurangi hambatan dompet dan node melalui PIR, pruning, dan propagasi blok yang lebih cepat.
- Meningkatkan keragaman implementasi dengan menghadirkan stack full-node yang independen.
- Berkontribusi pada kesiapan pasca-kuantum dan peningkatan protokol yang ditinjau secara formal.

Organisasi ini bekerja sebagai kontributor independen, bukan sebagai pemilik protokol. Perubahan protokol tetap melalui proses ZIP, implementasi, peninjauan, dan signaling komunitas. Peran Valar Group adalah merancang, mengimplementasikan, mengoperasikan, dan menjadikan open-source sistem yang membuat proses-proses tersebut menjadi praktis.

## Area Strategis

Pekerjaan Valar Group berfokus pada empat area.

### Tata Kelola Pemegang Koin Privasi

Zcash tidak menggunakan kontrol protokol on-chain otomatis. Poll pemegang koin adalah sinyal penasihat yang memberi makan proses rough-consensus yang lebih luas. Valar Group membangun Tokenholder Voting Chain agar sinyal tersebut dapat dikumpulkan dari saldo terlindungi tanpa mengekspos identitas pemilih atau ukuran suara individu.

Desain saat ini menggunakan:

- Sebuah rantai aplikasi SDK Cosmos khusus untuk mengatur putaran pemungutan suara.
- Snapshot proof terhadap note Ironwood yang dapat dibelanjakan.
- Enkripsi homomorfik dari jumlah suara.
- Private Information Retrieval untuk proof ketidakanggotaan nullifier.
- Sebuah multisig koordinator dan otoritas pemilihan terdistribusi.

Tujuannya adalah untuk menggantikan proses pemungutan suara pemegang token sebelumnya dengan sistem yang dapat digunakan kembali, telah diaudit, dan dapat diintegrasikan ke dalam dompet yang dapat dioperasikan oleh organisasi lain serta dihitung secara independen.

### Perangkat Lunak Node dan Skalabilitas Jaringan

Valar Group berkolaborasi dengan Project Tachyon pada Zakura, sebuah full node Zcash yang dibangun dari codebase Zebra. Zakura diposisikan sebagai node berperforma tinggi bagi operator yang membutuhkan sinkronisasi awal, pruning, snapshot bootstrapping yang lebih cepat, serta jalur kompatibilitas bagi mantan pengguna `zcashd`.

Pekerjaan penskalaan terkait meliputi:

- Waktu target blok yang lebih cepat, termasuk eksperimen blok 25 detik pada testnet NU7.
- Propagasi blok peer-to-peer yang ditingkatkan.
- Fitur full-node yang ditujukan agar Zcash tetap dapat digunakan seiring dengan berkembangnya aktivitas terlindungi.

### Infrastruktur Dompet dan Sinkronisasi

Dompet terlindungi secara historis harus memindai sejumlah besar data chain. Valar Group mengembangkan sistem PIR sehingga dompet dapat mengambil proof yang mereka butuhkan tanpa perlu mengunduh seluruh set nullifier atau mengungkapkan note mana yang mereka perhatikan.

Karya ini muncul baik dalam tumpukan pemungutan suara maupun dalam penelitian sinkronisasi dompet yang lebih luas. Grup ini juga telah berkontribusi pada pekerjaan keandalan sisi dompet, termasuk pengiriman transaksi multi-server dan peningkatan pemilihan server yang digunakan dalam tumpukan seluler ZODL.

### Peningkatan Protokol dan Koordinasi Ekosistem

Valar Group adalah salah satu organisasi yang secara publik berkomitmen pada respons Ironwood setelah kerentanan sirkuit Orchard. Ironwood memperkenalkan pool terlindungi baru, menyegel pool Orchard asli di balik turnstile, dan memulihkan jalur untuk memverifikasi suplai beredar secara independen. Valar Group bekerja sama dengan Project Tachyon, Shielded Labs, ZODL, dan Zcash Foundation dalam hal arsitektur, implementasi aturan konsensus, dan koordinasi ekosistem.

Grup ini juga berpartisipasi dalam penentuan cakupan NU7, pengoperasian testnet, dan penyuntingan ZIP. Dev Ojha terdaftar sebagai editor ZIP.

## Inisiatif Saat Ini

### Rantai Pemungutan Suara Tokenholder / Pemungutan Suara Terlindungi

Shielded Vote adalah protokol tata kelola privat milik Valar Group untuk Zcash. Pemegang token memberikan suara dengan saldo terlindungi tanpa mengungkapkan jumlah individu atau menghubungkan suara ke identitas tertentu.

Properti utama meliputi:

- Satu sesi online untuk memberikan suara, alih-alih proses commit/reveal selama beberapa hari.
- Tanda tangan snapshot yang kompatibel dengan Keystone yang mendelegasikan hak suara ke hotkey tanpa menempatkan dana dalam risiko.
- Jumlah suara terenkripsi menggunakan homomorphic ElGamal.
- Kueri PIR sehingga nullifier tidak bocor selama proof snapshot.
- Pemisahan suara dan pengiriman relay yang ditunda untuk mengurangi korelasi waktu.
- Perhitungan suara yang dapat diaudit secara publik.

Pada Agustus 2026, Valar Group dan Project Tachyon menggunakan stack ini untuk pemungutan suara pemegang koin NU7. Kelayakan memerlukan ZEC terlindungi yang dapat dibelanjakan di Ironwood pada height mainnet 3.459.350. Pemungutan suara berlangsung dari 25 Agustus hingga 14 September 2026, dengan ambang batas partisipasi 1.000.000 ZEC agar hasilnya dapat dianggap representatif. Pertanyaan-pertanyaan yang diajukan mencakup penghalusan penerbitan NSM, waktu penerbitan kembali, penghentian Sprout/v4, waktu blok 25 detik, dan cakupan/kesiapan NU7.

Koordinasi default-chain menggunakan multisig 2-dari-5 di antara Project Tachyon, Valar Group, Zcash Foundation, ZODL, dan Shielded Labs. Set validator terpisah memegang bagian kunci dekripsi per-round. Tidak ada satu validator pun yang dapat memulihkan suara individu; ambang batas validator diperlukan untuk menghasilkan perhitungan akhir.

Antarmuka operator publik dan auditor meliputi:

- Pengaturan rantai voting [](https://setup.valargroup.org)
- Auditor penghitungan [](https://tally.valargroup.org)
- UI Koordinator [](https://svote.valargroup.org/)
- Pengaturan server PIR [](https://setup-pir.valargroup.org)
- Dokumentasi Vote Terlindungi [](https://valargroup.gitbook.io/shielded-vote-docs)

### Zakura

Zakura adalah sebuah Zcash full node yang dikembangkan sebagai kolaborasi antara Valar Group dan Project Tachyon. Node ini diturunkan dari Zebra dan menambahkan sinkronisasi yang lebih cepat, pruning asli, snapshot bootstrapping, jalur kompatibilitas `zcashd`, serta pengembangan P2P performa tinggi yang eksperimental.

Zcash Foundation menyambut baik proyek ini secara publik, dengan mencatat bahwa Zebra dirilis di bawah lisensi permisif sehingga tim independen dapat melakukan fork dan meningkatkannya, dan bahwa beberapa kontributor Zakura telah berkontribusi upstream ke Zebra.

### Pengambilan Informasi Pribadi (Private Information Retrieval)

Valar Group mengelola layanan dan library PIR untuk dua masalah terkait:

- Membuktikan bahwa sebuah note belum digunakan pada ketinggian snapshot tanpa mengungkapkan nullifier-nya.
- Mengurangi data yang harus diambil oleh dompet untuk melakukan sinkronisasi atau voting.

Ini adalah dependensi inti dari Shielded Vote dan merupakan blok pembangun untuk UX dompet privasi yang lebih cepat.

### Rekayasa Ironwood dan NU7

Valar Group adalah bagian dari komitmen bersama Juni 2026 terhadap Ironwood dan berkontribusi pada implementasi aturan konsensus serta pekerjaan klien seputar pool baru. Valar Group juga mengoperasikan infrastruktur testnet NU7, termasuk script join dan node publik yang dihosting di bawah `nu7.valargroup.dev`.

### Library Protokol Open-Source

Organisasi `valargroup` GitHub memublikasikan stack pemungutan suara dan node sebagai repositori publik, termasuk:

- [`vote-sdk`](https://github.com/valargroup/vote-sdk) — chain khusus aplikasi untuk pemungutan suara on-chain yang privat
- [`zcash_voting`](https://github.com/valargroup/zcash_voting) — library, proof, penyimpanan, dan FFI untuk pemungutan suara terlindungi di sisi client
- [`voting-circuits`](https://github.com/valargroup/voting-circuits) — sirkuit delegasi dan pemungutan suara Halo2
- [`vote-nullifier-pir`](https://github.com/valargroup/vote-nullifier-pir) — PIR untuk proof ketidakanggotaan nullifier
- [`token-holder-voting-config`](https://github.com/valargroup/token-holder-voting-config) — konfigurasi penemuan-layanan dompet
- [`zebra`](https://github.com/valargroup/zebra) — fork pengembangan Zebra/Zakura milik Valar Group

## Tim-tim Kami

Valar Group dipimpin oleh **Dev Ojha** (ValarDragon). Halaman tim publik yang terkait dengan Zakura mencantumkan engineer afiliasi Valar berikut ini:

- **Dev Ojha** — Maintainer; memimpin Valar Group. Bidang fokus mencakup pemungutan suara pemegang token, pekerjaan pasca-kuantum, Zakura, dan PIR.
- **Roman Akhtariev** — Principal engineer. Sebelumnya merupakan principal engineer di Osmosis; pekerjaan mencakup sinkronisasi dompet PIR, pemungutan suara pemegang token, dan performa sinkronisasi Zakura.
- **Evan Forbes** — Principal engineer. Mantan pemimpin konsensus Celestia dan founding engineer; pekerjaan mencakup kesiapan waktu blok yang lebih cepat dan stack QUIC P2P.
- **Adam Tucker** — Principal engineer. Mantan engineer Osmosis; pekerjaan mencakup pemungutan suara pemegang token bersama Roman Akhtariev, keandalan dompet, dan integrasi Ironwood di seluruh stack.

Zakura sendiri dikelola bersama dengan Project Tachyon, yang dipimpin oleh Sean Bowe. Kedua organisasi tersebut berkolaborasi secara erat namun tetap terpisah.

## Struktur Organisasi

Valar Group beroperasi sebagai organisasi teknik independen. Ini bukan bagian dari Zcash Foundation, ZODL, Shielded Labs, atau Zcash Community Grants.

Dalam desain voting-chain, Valar Group adalah salah satu dari lima organisasi koordinator. Peran tersebut merupakan parameter dari sistem pemungutan suara, bukan klaim kontrol eksklusif atas tata kelola Zcash. Tim lain dapat menjalankan validator, membangun voting chain alternatif, atau mengaudit hasil perhitungan yang dipublikasikan dari alat publik.

Informasi tambahan mengenai jenis entitas hukum, komposisi dewan, dan tata kelola internal belum dipublikasikan dengan rincian yang sama seperti organisasi Zcash yang lebih lama.

## Pendanaan

Pernyataan forum publik dari pertengahan tahun 2026 menjelaskan bahwa Valar Group dan Project Tachyon didanai melalui donasi pribadi. Berbeda dengan putaran pendanaan venture yang diungkapkan oleh ZODL atau pengumuman donasi publik dari Shielded Labs, Valar Group belum memublikasikan daftar donor terperinci atau jadwal hibah.

Model pendanaan tersebut menjaga tim agar tetap independen dari jalur historis Development Fund / block-reward, namun hal ini juga berarti berkurangnya visibilitas publik terhadap ukuran anggaran dan sumber pendanaan.

## Peran dalam Ekosistem Zcash

Valar Group adalah salah satu organisasi protokol independen yang terbentuk di sekitar lanskap pengembangan Zcash tahun 2026. Dalam lanskap tersebut:

- **Zcash Foundation** melanjutkan pengelolaan komunitas dan Zebra.
- **ZODL** berfokus pada produk dompet dan kelanjutan protokol setelah pemisahan ECC.
- **Shielded Labs** berfokus pada keberlanjutan, keamanan, dan penelitian konsensus.
- **Proyek Tachyon** berfokus pada rekursi, verifikasi formal, dan skalabilitas jangka panjang.
- **Valar Group** berfokus pada pemungutan suara pemegang koin privat, performa node, PIR, dan rekayasa yang diperlukan untuk mengoperasikan sistem tersebut dalam produksi.

Kontribusi khasnya adalah membuat tata kelola terlindungi menjadi operasional. Pemungutan suara NU7 adalah penggunaan utama pertama dari stack tersebut: pemegang bukti saldo Ironwood, dompet seperti ZODL dan Vizor dapat mengintegrasikan alirannya, dan siapa pun dapat mengaudit hasil perhitungan tanpa perlu mengetahui bagaimana pemegang tertentu memberikan suaranya.

Pekerjaan node dan sinkronisasi dari tim yang sama dimaksudkan untuk mendukung setengah bagian lainnya dari gambaran tersebut. Pemungutan suara privat menjadi kurang berguna jika dompet tidak dapat melakukan sinkronisasi, node tidak dapat mengikuti perkembangan, atau peningkatan jaringan tidak dapat diterapkan dengan cepat. Valar Group memperlakukan tata kelola, perangkat lunak node, dan infrastruktur dompet sebagai satu masalah: membuat Zcash privat dapat digunakan dalam skala besar tanpa memusatkan kekuatan operasional pada satu organisasi tunggal.

## Sumber Daya

- Situs web [Valar Group](https://valargroup.dev/)
- [Valar Group GitHub](https://github.com/valargroup)
- Dokumentasi [Shielded Vote](https://valargroup.gitbook.io/shielded-vote-docs)
- Pengaturan rantai voting [](https://setup.valargroup.org)
- Auditor [Tally](https://tally.valargroup.org)
- UI [Coordinator](https://svote.valargroup.org/)
- [Zakura](https://zakura.com/)
- [Zakura tentang / tim](https://zakura.com/about/)
- Thread forum voting pemegang koin [NU7](https://forum.zcashcommunity.com/t/nu7-token-holder-vote/56912)
- Thread forum Coinholder Voting Chain [](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925)



