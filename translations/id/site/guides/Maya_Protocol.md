# Maya Decentralised Exchange

---

## Tutorial


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8""
    title="Cara melakukan Swap Ethereum ke Zcash di LeoDex"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div >


## Apa itu Maya Protocol?

Maya adalah sistem [decentralized exchange](https://nym.com/blog/what-is-dex) (DEX) yang memungkinkan perdagangan mata uang kripto di berbagai blockchain yang berbeda. Kamu dapat, sebagai contoh, melakukan swap Bitcoin (BTC) pada blockchain Bitcoin dengan Ethereum (ETH) pada blockchain Ethereum dengan cara yang mudah, tanpa perlu menyimpan aset tersebut atau melibatkan otoritas terpusat maupun prosedur Know Your Customer (KYC).

Maya Protocol dikembangkan menggunakan Cosmos Software Development Kit (Cosmos SDK) dan beroperasi pada mekanisme konsensus Proof of Bond (PoB). Protokol ini dijaga oleh "Node Operators," yang melakukan staking modal ke dalam sistem dan mendapatkan imbal hasil sebagai hadiah atas kontribusi dan upaya mereka. Pada dasarnya, node adalah komputer yang menjalankan software yang memvalidasi swap pengguna dan mengawasi aset di alamat tertentu di berbagai blockchain.

Untuk menyelesaikan sebuah swap, mata uang kripto yang didukung harus diterima di salah satu alamat Maya, dikirim oleh pengguna, dan kemudian jumlah yang setara akan dikirim dari alamat Maya lainnya di blockchain yang berbeda. Proses ini dikelola dan disetujui oleh setidaknya dua pertiga dari node, terutama untuk memastikan bahwa dana telah diterima dengan benar.

Dengan cara ini, kamu dapat mengirim satu jenis token di satu blockchain dan menerima jenis yang berbeda di blockchain lainnya, semuanya secara native dan tanpa menggunakan wrapped tokens.

## Apa itu Proof of Bond?

Proof of Bond (PoB) adalah mekanisme konsensus di mana operator node harus menjaminkan sebuah bond (biasanya dalam bentuk token asli jaringan) untuk berpartisipasi dalam jaringan. Bond ini berfungsi sebagai bentuk keamanan ekonomi, memastikan bahwa node bertindak jujur dan menjaga integritas jaringan2. Jika sebuah node mencoba bertindak secara jahat atau gagal menjalankan tugasnya, bond miliknya dapat di-slash, yang berarti sebagian dari bond tersebut diambil sebagai penalti.

Dalam Maya Protocol, mekanisme ini membantu menghasilkan nilai ekonomi dari sumber daya yang di-stake oleh operator node, sehingga meningkatkan efisiensi modal. Demikian pula, dalam Thorchain, operator node menjaminkan RUNE (token asli) untuk mengamankan jaringan dan memastikan kerja sama antar peserta.

## Perbedaan antara Maya dan THORChain

Maya adalah sebuah fork dari THORChain tetapi dilengkapi dengan beberapa fitur dan fungsionalitas baru yang berfungsi sebagai alternatif yang hebat. Yang paling penting adalah

### Node Likuiditas

Alih-alih mengikuti Model Pure Bond, Maya sedang mempertimbangkan peralihan ke model Liquidity Nodes. Dalam sistem ini, node diizinkan untuk berkontribusi likuiditas secara langsung, dengan mengikatnya ke jaringan. Pendekatan ini berarti operator node menghadapi risiko yang signifikan: jika mereka menyalahgunakan dana, mereka akan mengalami kerugian, yang berfungsi sebagai pencegah yang kuat. Hasilnya, operator node menggunakan Liquidity Units dari Liquidity Pools, yang secara bersamaan menyediakan likuiditas dan memperkuat keamanan jaringan.

### Perlindungan Impermanent Loss

Sebuah sistem yang melindungi penyedia likuiditas (LPs) dari kerugian sementara yang mungkin mereka alami saat menyediakan likuiditas, akibat fluktuasi harga aset kripto yang terus-menerus.
ILP memegang 10% dari pasokan $CACAO (10 juta $CACAO) dan terus diisi ulang oleh 10% dari biaya protokol. ILP menjadi aktif 50 hari setelah deposit likuiditas, dengan cakupan dibatasi maksimal 100%.

Durasi cakupan ILP bergantung pada performa ASSET dan $CACAO. Cakupan penuh tercapai setelah 150 hari jika ASSET berkinerja lebih baik, dan setelah 450 hari jika $CACAO berkinerja lebih baik. ILP dibayarkan sekaligus diatur ulang saat penarikan lengkap, namun tidak terpengaruh oleh penarikan sebagian. Untuk top-up, ILP diatur ulang tetapi tidak dibayarkan.

### Model alokasi yang berbeda

Liquidity Auction adalah acara selama 21 hari yang dirancang untuk mendistribusikan token $CACAO di antara para peserta. Selama acara berlangsung, pengguna menyetorkan aset yang didukung ke alamat tertentu. Pada akhir lelang, 90% dari token $CACAO dialokasikan kepada peserta secara proporsional dengan kontribusi likuiditas mereka, sementara 10% sisanya dialokasikan ke cadangan ILP. Para peserta menjadi penyedia likuiditas, dengan aset yang mereka setorkan dan token $CACAO ditempatkan ke dalam pool Maya, sehingga memungkinkan mereka untuk mendapatkan bagian dari biaya yang dihasilkan.

### Cara berbeda dalam menangani cadangan

Pada awal mula Maya Protocol, cadangan CACAO yang tersedia hanya 10% dari total supply, dibandingkan dengan 44% untuk THORChain, dan utamanya ditujukan untuk Impermanent Loss Protection (ILP). Maya tidak memiliki emisi blok; dan jika Protocol Owned Liquidity serta Lending diimplementasikan, keduanya akan memiliki desain yang berbeda, karena seperti pada THORChain, aspek-aspek ini terintegrasi erat dengan Reserves.

Meskipun memiliki perbedaan, Maya juga berfungsi sebagai solusi pelengkap bagi THORChain, menawarkan redundansi, ekstensi, dan validasi, serta mengintegrasikan jaringan baru yang belum ada dalam implementasi THORChain saat ini.

Selain itu, tujuan Maya adalah untuk menjadi *backend* bagi layanan lain agar dapat dikembangkan lebih lanjut, dengan harapan dapat melihat banyak *frontend* baru, atau layanan DEX yang dibangun di atas infrastruktur Maya.

## Integrasi dompet protokol Maya

Bertindak sebagai *backend*, Maya perlu didukung oleh berbagai UI dan dompet agar dapat digunakan.
Berikut adalah daftar beberapa layanan yang sudah mendukung Maya:

[Thorwallet DEX](https://www.thorwallet.org/): Ledger, XDEFI, Metamask, Keystore

[El Dorado](https://www.eldorado.market/): XDEFI, Keystore

[CacaoSwap](https://cacaoswap.app/): Keystore, MetaMask, XDEFI, Keplr, Leap

[Asgardex](https://www.asgardex.com/): Keystore, Ledger

DefiSpot: tidak lagi online, domainnya tidak dapat diakses.

[XDEFI](https://www.xdefi.io/): sebuah dompet self-custody multi-ekosistem dengan dukungan untuk 30+ blockchain asli, serta semua chain EVM dan Cosmos, termasuk Bitcoin, Ethereum, Solana, THORChain, Maya Protocol, TRON, dan banyak lagi.

[KeepKey ](https://keepkey.com/): Sebuah dompet hardware untuk menyimpan aset digital secara aman.