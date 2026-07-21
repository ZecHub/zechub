<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>


#  Zcash Ağını Görselleştirme

Aşağıda, Zcash ağ bilgilerini toplamak ve görselleştirmek için Ubuntu 22.04 üzerinde Zcash için Ziggurat 3.0 Crawler ile ilişkili Crunchy ve P2P-Viz programlarını nasıl çalıştıracağınıza dair bir rehber bulunmaktadır.  
Aşağıda bağlantısı verilen video aynı süreci takip etmektedir.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Nq5cLiAHxPI"
    title="ziggurat 3.0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    
----------------
## Gereksinimleri Kurun: 

Rust -> [https://rustup.rs/](https://rustup.rs/)

## İsteğe bağlı:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(json bilgisini terminalde görüntülemek için)

curl -> [https://everything.curl.dev/get/linux](https://everything.curl.dev/get/linux)
(crawler RPC’sini sorgulamak için)

npm (nvm ile birlikte) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(P2P-Viz’i tarayıcıda görüntülemek için)

----------------


----------------
Ziggurat 3.0 Deposu | [https://github.com/runziggurat](https://github.com/runziggurat)

Crawler Deposu | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Crunchy Deposu | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

P2P-Viz Deposu | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

Normal güncellemeleri uygulayarak başlayın.

>  Aşağıdaki komutları çalıştırın:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Zcash Ağ Crawler’ı

Zcash Crawler, 'zcash' adlı bir klasörün içinde yer alır; bu nedenle crawler’ı (runziggurat/zcash deposu) klonlamadan önce yeni bir dizin oluşturmanız tavsiye edilebilir.


>  /Home dizininden aşağıdaki komutları çalıştırın:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

Tarayıcıda şu adrese gidin 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

Veya şu konumdaki readme dosyasını açın 
'/runziggurat/zcash/src/tools/crawler/README.md'

Bu sayfa, belirli kullanımlara dair bilgiler içerir. 

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

`--seed-addrs` \ `--dns-seed` tek zorunlu argümandır ve çalışması için en az bir belirtilmiş adrese ihtiyaç duyar.



----------------

'cargo run --release --features crawler --bin crawler -- --help' komutu, birebir çalıştırma komutudur ve gösterilen yardım menüsünü yazdıracaktır.


>  Komutu çalıştırın
```bash
cargo run --release --features crawler --bin crawler -- --help
```


Bu, programı derleyecek ve her şeyin düzgün çalıştığını doğrulayacaktır.

Crawler’ı çalıştırmak için, başlangıç komutuna en az bir geçerli Zcash düğüm IP adresi içeren bir '--seed-addrs' bayrağı eklemek gerekir. Doğru bir sonuç elde etmek için crawler’ın makul bir süre çalışmasına izin verilmelidir. Bazı örnek düğüm IP adresleri [https://zcashblockexplorer.com/nodes](https://zcashblockexplorer.com/nodes) adresinde bulunabilir.

Crawler çalışırken ondan bilgi almak için, başlangıç komutuna '--rpc-addr' bayrağını eklemek gerekir. Bu yalnızca crawler’ı çalıştırmak için gerekli değildir, ancak aksi takdirde herhangi bir bilgiyi görüntülemek için crawler’ı durdurmanız gerekir (ctrl+c veya SIGKILL).


>  Komutu çalıştırın
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

Crawler ağ ile iletişim kurmaya (varsayılan olarak her 20 saniyede bir) ve ağ verilerini toplamaya başlayacaktır. 
Crawler’dan alınan bilgiler, düğümü sorgulamak için curl kullanılarak görüntülenebilir (bu bilgiyi göstermek için jq gerekir). 
Bu örnekte Crawler RPC adresi '127.0.0.1:54321' olarak ayarlanmıştır.


>  Başka bir terminalde komutu çalıştırın
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

Bu, '.result' alanı içinde bulunan mevcut toplanmış '.protocol_version' verisini görüntüleyecektir. '.result' alanı çok büyüktür, bu nedenle onun belirli bölümlerini çağırmak daha kullanışlıdır. Diğer faydalı veri türleri arasında '.num_known_nodes', '.num_good_nodes', '.user_agents' vb. bulunur. Metrikler bölümüne [Buradan](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics) bakın

----------------


----------------
Crunchy ve P2P-Viz’i çalıştırmak için, '.result' çıktısını bir .json dosyasına yönlendirmek gerekir. 


>  Komutu çalıştırın
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

Bu, mevcut dizinde bir 'latest.json' dosyası oluşturacaktır. Bu 'latest.json' dosyası Crunchy ile kullanılacaktır. 

Bu noktada, artık daha fazla veriye ihtiyaç yoksa Crawler 'ctrl+c' ile durdurulabilir. Crawler, terminale faydalı bilgiler içeren bir rapor yazdıracaktır.


----------------

## Crunchy

Crunchy, çıktıdaki json dosyasını P2P-Viz ile kullanılmak üzere bir araya getirmek için gereklidir.


Crunchy’yi derlemek için '/runziggurat' klasörünüze gidin 

>  Crunchy deposunu klonlamak için aşağıdaki komutları çalıştırın
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
'latest.json' dosyasını kopyalayıp 'crunchy/testdata/' klasörüne yapıştırın.

>  Aşağıdaki komutları çalıştırın 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

Bu, P2P-Viz ile kullanılmak üzere 'crunchy/testdata/' klasöründe Zcash düğümlerine göre filtrelenmiş bir 'state.json' dosyası oluşturacaktır.

----------------

## P2P-Viz

P2P-Viz’i derlemek için npm yüklü olmalıdır. 


>  nvm ile npm kurmak için aşağıdaki komutları çalıştırın:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Terminali kapatıp yeniden başlatın.


>  Komutu çalıştırın:
```bash
nvm install --lts
```

'/runziggurat' klasörünüze gidin


>  P2P-Viz deposunu klonlamak ve başlatmak için aşağıdaki komutları çalıştırın
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın. 

'Geolocation' seçeneğini seçin ve ardından 'Choose state file' seçeneğini seçin.

Açılan dosya gezgini penceresinden 'state.json' dosyasını seçin. 

Düğüm gezgini Dünya Haritası, dosya verileriyle dolacaktır. Kullanım seçenekleri ve ayarlar hakkında daha fazla ayrıntı için readme’ye [Buradan](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) bakın.


----------------
İPUÇLARI! 

Crawler’ı zamanlanmış bir tarama için yalnızca 'timeout' komutuyla ayarlayabilirsiniz; bu komut belirlenen sürenin ardından belirli bir sonlandırma komutu gönderir. Daha fazla bilgi için 'timeout --help' çalıştırın.
Aşağıdaki komut, crawler’ı başlatacak ve ayrıca 50 dakika sonra otomatik olarak durduracaktır.

>  Komutu çalıştırın
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
İPUÇLARI! 

'latest.json', '/testdata' içine çağrılıp yazdırılabilir; böylece elle kopyalayıp yapıştırmanız gerekmez.

----------------
İPUÇLARI! 

IP adresi bilgileri çıktıdan toplanabilir ve ardından başlangıçta Crawler’ı yeniden seed etmek için (--seed-addrs) kullanılabilir. Bu, tam bir tarama gerçekleştirmek için gereken süreyi azaltacaktır!
