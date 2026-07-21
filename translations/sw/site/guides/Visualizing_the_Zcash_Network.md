<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


#  Kuona Network Zcash

Yafuatayo ni mwongozo juu ya jinsi ya kuendesha Ziggurat 3.0 Crawler kwa Zcash pamoja na programu zinazohusiana Crunchy na P2P-Viz kwenye Ubuntu 22.04 kwa ajili ya kukusanya na visualizing Zcash mtandao habari. 
Video iliyounganishwa hapa chini inafuata mchakato huo.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Nq5cLiAHxPI"
    title="ziggurat 3.0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ruhusuFullScreen
    loading="lazy"
  />
</div>
    
----------------
## Weka Mahitaji: 

Kutu -> [https://rustup.rs/](https://rustup.rs/)

## Hiari:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(kwa kuonyesha habari json katika terminal)

curl -> [https://everything.curl.dev/get/linux](https://everything.curl.dev/get/linux)
(kwa kuuliza RPC crawler)

npm (na nvm) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(kwa kuonyesha P2P-Viz katika browser)

----------------


----------------
Ziggurat 3.0 Repository [https://github.com/runziggurat](https://github.com/runziggurat)

Crawler Repo [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Crunchy Repo [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

P2P-Viz Repo [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

Anza kwa kutumia updates kawaida.

>  Tumia amri zifuatazo:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Zcash Mtandao Crawler

Zcash Crawler anaishi ndani ya folda aitwaye 'zcash' hivyo inaweza kuwa vyema kuunda orodha mpya kabla ya cloning crawler (runziggurat / zcash repo).


>  Kutoka / Home directory, Run amri zifuatazo:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

Nenda kwenye kivinjari 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

Au kufungua readme katika 
"/runziggurat/zcash/src/tools/crawler/README.md"

Ukurasa huu una habari kuhusu matumizi maalum. 

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

`--seed-addrs` \ `--dns-seed` ni hoja tu required na mahitaji ya anwani angalau moja maalum kwa ajili yake ya kukimbia.



----------------

Amri 'cargo kukimbia --release --features crawler --bin crowler -- --help' ni amri ya kukimbia halisi na itachapisha menyu ya msaada iliyoonyeshwa.


>  Tumia amri
```bash
cargo run --release --features crawler --bin crawler -- --help
```


Hii itakuwa kukusanya programu na kuhakikisha kila kitu ni kazi vizuri.

To run the Crawler, it is required to add a '--seed-addrs' flag to the start command, containing at least one, valid, Zcash node IP address. The crawler should be allowed to run for a reasonable amount of time to get an accurate result. Some sample node IP addresses can be found on  [https://zcashblockexplorer.com/nodes](https://zcashblockexplorer.com/nodes).

Ili kupata taarifa kutoka Crawler wakati wa kukimbia yake, ni required kuongeza '--rpc-addr' bendera kwa amri ya kuanza. Hii si required tu kuendesha Crawler yenyewe lakini vinginevyo itahitaji kuacha Crawler (ctrl + c au SIGKILL) kuonyesha taarifa yoyote wakati wote.


>  Tumia amri
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

Crawler itaanza kuwasiliana na mtandao (default kila sekunde 20) na kukusanya data ya mtandao. 
Taarifa kutoka Crawler inaweza kuonyeshwa kwa kutumia curl kuuliza node (hii inahitaji jq kwa kuonyesha kwamba info). 
Crawler RPC anwani katika mfano huu ni kuweka kwa '127.0.0.1:54321'


>  Katika Terminal nyingine, Run amri
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

Hii itaonyesha sasa zilizokusanywa data '.protocol_version' zilizomo ndani ya uwanja wa '.result'. uwanja '.results' ni kubwa sana hivyo ni muhimu kwa wito sehemu maalum ya badala yake. aina nyingine za data muhimu ni '.num_known_nodes', '. num_good_nods', '.user_agents' nk Angalia kipimo sehemu [Hapa](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
Kuendesha Crunchy na P2P-Viz, ni required kwa bomba '. matokeo 'katika faili .json. 


>  Tumia amri
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

Hii itaunda faili ya 'latest.json' katika saraka ya sasa. Hii faili ya "latest .json" itatumika na Crunchy. 

Katika hatua hii, Crawler inaweza kusimamishwa na 'ctrl + c' kama hakuna data zaidi inahitajika. Crawler itakuwa pato ripoti ya terminal ya habari muhimu.


----------------

## Chumvi

Crunchy inahitajika kukusanya faili ya json ya pato kwa matumizi na P2P-Viz.


Kujenga Crunchy, navigate kwa '/ runziggurat' yako folder 

>  Kwa clone katika Crunchy repo, Run amri zifuatazo
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
Nakili na kuweka faili 'latest.json' katika 'crunchy/testdata/' folda.

>  Tumia amri zifuatazo 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

Hii itaunda Zcash node filtered 'state.json' faili katika 'crunchy/testdata/' folder kutumika na P2P-Viz.

----------------

## P2P-Viz

Kujenga P2P-Viz, inahitajika kuwa na npm. 


>  Kufunga npm na nvm, kukimbia amri zifuatazo:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Kufunga na kuanzisha upya terminal.


>  Tumia amri:
```bash
nvm install --lts
```

navigate to your '/runziggurat' folder [Nenda kwenye folda yako ya '/ runziggurat]


>  Kwa clone katika P2P-Viz repo na kuanza, kukimbia amri zifuatazo
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

Fungua kivinjari katika [http://localhost:3000](http://localhost:3000). 

Chagua 'Geolocation' na kisha chagua 'Chagua faili hali'.

Kutoka faili Explorer pop-up, kuchagua 'state.json' faili. 

Node Explorer Dunia Ramani itakuwa populate na data faili. Angalia readme [Hapa](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) kwa maelezo zaidi juu ya chaguzi za matumizi na mipangilio.


----------------
TIPI! 

Unaweza kuweka Crawler juu ya kutambaa timed tu na 'timeout' amri ambayo itatoa maalum kill amri baada ya kuweka kiasi cha muda. Run 'time out --help' kwa maelezo zaidi.
Amri ifuatayo itaanza na pia moja kwa moja kuacha crawler baada ya dakika 50.

>  Tumia amri
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
TIPI! 

'latest.json' inaweza kuitwa na kuandikwa katika '/ testdata' hivyo huna nakala na kuweka yake manually.

----------------
TIPI! 

Anwani ya IP habari inaweza kukusanywa kutoka pato na kisha kutumika kwa reseed Crawler katika kuanza (--mbegu-addrs). Hii kupunguza muda required kufanya kutambaa kamili! 
