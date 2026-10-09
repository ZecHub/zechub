<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>


# Memvisualisasikan Jaringan Zcash

Berikut adalah panduan tentang cara menjalankan Ziggurat 3.0 Crawler untuk Zcash serta program terkait Crunchy dan P2P-Viz pada Ubuntu 22.04 untuk mengumpulkan dan memvisualisasikan informasi jaringan Zcash.  
Video yang ditautkan di bawah ini mengikuti proses yang sama.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Nq5cLiAHxPI""
    title="ziggurat 3.0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div >
    
## Instal Persyaratan: 

Rust -> [https://rustup.rs/](https://rustup.rs/)

## Opsional:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(untuk menampilkan informasi json di terminal)

curl -> [https://everything.curl.dev/install/linux.html](https://everything.curl.dev/install/linux.html)
(untuk melakukan query pada RPC crawler)

npm (dengan nvm) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(untuk menampilkan P2P-Viz di browser)

----------------


Repositori Ziggurat 3.0 | [https://github.com/runziggurat](https://github.com/runziggurat)

Crawler Repo | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Crunchy Repo | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

Repo P2P-Viz | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

Mulailah dengan menerapkan pembaruan normal.

> Jalankan perintah berikut:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Crawler Jaringan Zcash

Zcash Crawler berada di dalam sebuah folder bernama 'zcash', jadi ada baiknya kamu membuat direktori baru sebelum melakukan cloning crawler (repo runziggurat/zcash).


> Dari direktori /Home, jalankan perintah berikut:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

Navigasi di browser ke 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

Atau buka readme di 
'/runziggurat/zcash/src/tools/crawler/README.md'

Halaman ini berisi informasi tentang penggunaan spesifik. 

----------------


```bash
$ cargo run --release --features crawler --bin crawler -- --help

OPTIONS:
    -c, --crawl-interval <CRAWL_INTERVAL>
            The main crawling loop interval in seconds [default: 5]

    -h, --help
            Print help information

    -r, --rpc-addr <RPC_ADDR>
            If present, start an RPC server at the specified address

    -s, --seed-addrs <SEED_ADDRS>...
            A list of initial standalone IP addresses and/or DNS servers to connect to

    -n, --node-listening-port <NODE_LISTENING_PORT>
            Default port used for connecting to the nodes [default: 8233]

    -V, --version
            Print version information
```

`--seed-addrs` \ `--dns-seed` adalah satu-satunya argumen yang diperlukan dan membutuhkan setidaknya satu alamat yang ditentukan agar dapat berjalan.



----------------

Perintah 'cargo run --release --features crawler --bin crawler -- --help' adalah perintah jalan literal dan akan mencetak menu bantuan yang ditampilkan.


> Jalankan perintah ini
```bash
cargo run --release --features crawler --bin crawler -- --help
```


Ini akan mengompilasi program dan memastikan semuanya berfungsi dengan baik.

Untuk menjalankan Crawler, kamu perlu menambahkan flag '--seed-addrs' pada perintah awal, yang berisi setidaknya satu alamat IP Zcash node yang valid. Crawler harus dibiarkan berjalan dalam jangka waktu yang wajar untuk mendapatkan hasil yang akurat. Beberapa contoh alamat IP node dapat ditemukan di [https://zcashblockexplorer.com/nodes](https://zcashblockexplorer.com/nodes).

Untuk mendapatkan informasi dari Crawler saat sedang berjalan, kamu perlu menambahkan flag '--rpc-addr' ke perintah awal. Hal ini tidak hanya diperlukan untuk menjalankan crawler itu sendiri, tetapi jika tidak dilakukan, kamu harus menghentikan crawler (ctrl+c atau SIGKILL) untuk dapat menampilkan informasi apa pun.


> Jalankan perintah ini
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

Crawler akan mulai berkomunikasi dengan jaringan (default setiap 20 detik) dan mengumpulkan data jaringan. 
Informasi dari Crawler dapat ditampilkan dengan menggunakan curl untuk melakukan query ke node (ini memerlukan jq untuk menampilkan info tersebut). 
Alamat RPC Crawler dalam contoh ini diatur ke '127.0.0.1:54321'


> Di Terminal lain, jalankan perintah ini
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

Ini akan menampilkan data '.protocol_version' yang saat ini dikumpulkan dan terdapat di dalam field '.result'. Field '.result' sangat besar sehingga lebih berguna untuk memanggil bagian-bagian spesifik darinya saja. Tipe data berguna lainnya adalah '.num_known_nodes', '.num_good_nodes', '.user_agents' dan lain-lain. Lihat bagian metrik [Here](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


Untuk menjalankan Crunchy dan P2P-Viz, kamu perlu mengarahkan output '.result' ke dalam sebuah berkas .json. 


> Jalankan perintah ini
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

Ini akan membuat berkas 'latest.json' di direktori saat ini. Berkas 'latest.json' ini akan digunakan dengan Crunchy. 

Pada titik ini, Crawler dapat dihentikan dengan 'ctrl+c' jika tidak ada lagi data yang diperlukan. Crawler akan mengeluarkan laporan berisi informasi bermanfaat ke terminal.


----------------

## Crunchy

Crunchy diperlukan untuk menggabungkan file json output agar dapat digunakan dengan P2P-Viz.


Untuk membangun Crunchy, navigasikan ke folder '/runziggurat' kamu 

> Untuk melakukan kloning ke repo Crunchy, jalankan perintah berikut
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
Salin dan tempel file 'latest.json' ke dalam folder 'crunchy/testdata/'.

> Jalankan perintah berikut 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

Ini akan membuat file 'state.json' dari node Zcash yang telah difilter di dalam folder 'crunchy/testdata/' untuk digunakan dengan P2P-Viz.

----------------

## P2P-Viz

Untuk membangun P2P-Viz, kamu perlu memiliki npm. 


> Untuk menginstal npm dengan nvm, jalankan perintah berikut:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Tutup dan mulai ulang terminal.


> Jalankan perintah:
```bash
nvm install --lts
```

navigasi ke folder '/runziggurat' kamu


> Untuk melakukan kloning ke repo P2P-Viz dan memulai, jalankan perintah berikut
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

Buka browser di [http://localhost:3000](http://localhost:3000). 

Pilih 'Geolocation' lalu pilih 'Choose state file'.

Dari pop-up penjelajah berkas, pilih berkas 'state.json'. 

Peta Dunia explorer node akan terisi dengan data file tersebut. Lihat readme [Here](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) untuk detail lebih lanjut mengenai opsi penggunaan dan pengaturan.


TIPS! 

Kamu dapat mengatur Crawler pada jadwal crawl tertentu cukup dengan perintah 'timeout' yang akan mengirimkan perintah kill spesifik setelah jangka waktu yang ditentukan. Jalankan 'timeout --help' untuk info lebih lanjut.
Perintah berikut akan memulai dan juga menghentikan crawler secara otomatis setelah 50 menit.

> Jalankan perintah ini
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

TIPS! 

'latest.json' dapat dipanggil dan ditulis ke dalam '/testdata' sehingga kamu tidak perlu menyalin dan menempelnya secara manual.

TIPS! 

Informasi Alamat IP dapat dikumpulkan dari output dan kemudian digunakan untuk melakukan reseed pada Crawler saat memulai (--seed-addrs). Hal ini akan mengurangi waktu yang diperlukan untuk melakukan crawl penuh! 
