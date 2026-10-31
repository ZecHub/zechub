<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>


#  Kuona Mtandao wa Zcash

Yafuatayo ni mwongozo wa jinsi ya kuendesha Ziggurat 3.0 Crawler kwa Zcash pamoja na programu zinazohusiana za Crunchy na P2P-Viz kwenye Ubuntu 22.04 kwa ajili ya kukusanya na kuona kwa taswira maelezo ya mtandao [network] wa Zcash.  
Video iliyounganishwa hapa chini inafuata mchakato huo huo.

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
## Sakinisha Mahitaji: 

Rust -> [https://rustup.rs/](https://rustup.rs/)

## Hiari:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(kwa kuonyesha maelezo ya json katika terminali)

curl -> [https://everything.curl.dev/install/linux.html](https://everything.curl.dev/install/linux.html)
(kwa kuhoji RPC ya crawler)

npm (yenye nvm) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(kwa kuonyesha P2P-Viz katika kivinjari)

----------------


----------------
Hifadhi ya Ziggurat 3.0 | [https://github.com/runziggurat](https://github.com/runziggurat)

Hifadhi ya Crawler | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Hifadhi ya Crunchy | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

Hifadhi ya P2P-Viz | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

Anza kwa kutekeleza masasisho ya kawaida.

>  Tekeleza amri zifuatazo:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Crawler ya Mtandao wa Zcash

Crawler ya Zcash iko ndani ya folda inayoitwa 'zcash', hivyo inaweza kupendekezwa kuunda saraka mpya kabla ya kunakili crawler (hifadhi ya runziggurat/zcash).


>  Kutoka saraka ya /Home, Tekeleza amri zifuatazo:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

Nenda katika kivinjari kwenye 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

Au fungua readme katika 
'/runziggurat/zcash/src/tools/crawler/README.md'

Ukurasa huu una maelezo kuhusu matumizi mahususi. 

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

`--seed-addrs` \ `--dns-seed` ndiyo hoja pekee inayohitajika na inahitaji angalau anwani [address] moja iliyobainishwa ili iendeshe.



----------------

Amri 'cargo run --release --features crawler --bin crawler -- --help' ndiyo amri halisi ya kuendesha na itachapisha menyu ya msaada iliyoonyeshwa.


>  Tekeleza amri
```bash
cargo run --release --features crawler --bin crawler -- --help
```


Hii itakusanya programu na kuhakikisha kila kitu kinafanya kazi ipasavyo.

Ili kuendesha Crawler, inahitajika kuongeza alama ya '--seed-addrs' kwenye amri ya kuanza, yenye angalau anwani moja halali ya IP ya node ya Zcash. Crawler inapaswa kuruhusiwa kufanya kazi kwa muda unaofaa ili kupata matokeo sahihi. Baadhi ya sampuli za anwani za IP za node zinaweza kupatikana kwenye  [https://mainnet.zcashexplorer.app/nodes](https://mainnet.zcashexplorer.app/nodes).

Ili kupata maelezo kutoka kwa Crawler inapofanya kazi, inahitajika kuongeza alama ya '--rpc-addr' kwenye amri ya kuanza. Hii haihitajiki ili kuendesha crawler pekee, lakini vinginevyo itahitaji kusimamisha crawler (ctrl+c au SIGKILL) ili kuonyesha maelezo yoyote kabisa.


>  Tekeleza amri
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

Crawler itaanza kuwasiliana na mtandao (kwa chaguo-msingi kila sekunde 20) na kukusanya data ya mtandao. 
Maelezo kutoka kwa Crawler yanaweza kuonyeshwa kwa kutumia curl kuhoji node (hii inahitaji jq ili kuonyesha maelezo hayo). 
Anwani ya RPC ya Crawler katika mfano huu imewekwa kuwa '127.0.0.1:54321'


>  Katika Terminali nyingine, Tekeleza amri
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

Hii itaonyesha data ya sasa iliyokusanywa ya '.protocol_version' iliyomo ndani ya sehemu ya '.result'. Sehemu ya '.result' ni kubwa sana, hivyo ni muhimu kuita sehemu mahususi zake badala yake. Aina nyingine muhimu za data ni '.num_known_nodes', '.num_good_nodes', '.user_agents' n.k. Tazama sehemu ya vipimo [Hapa](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
Ili kuendesha Crunchy na P2P-Viz, inahitajika kuelekeza '.result' kwenye faili ya .json. 


>  Tekeleza amri
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

Hii itaunda faili ya 'latest.json' katika saraka ya sasa. Faili hii ya 'latest.json' itatumika pamoja na Crunchy. 

Katika hatua hii, Crawler inaweza kusimamishwa kwa 'ctrl+c' ikiwa data zaidi haihitajiki. Crawler itatoa ripoti katika terminali yenye maelezo muhimu.


----------------

## Crunchy

Crunchy inahitajika kujumlisha faili ya json ya matokeo kwa matumizi na P2P-Viz.


Ili kujenga Crunchy, nenda kwenye folda yako ya '/runziggurat' 

>  Ili kunakili kwenye hifadhi ya Crunchy, Tekeleza amri zifuatazo
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
Nakili na ubandike faili ya 'latest.json' kwenye folda ya 'crunchy/testdata/'.

>  Tekeleza amri zifuatazo 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

Hii itaunda faili ya 'state.json' iliyochujwa ya node ya Zcash kwenye folda ya 'crunchy/testdata/' itakayotumika pamoja na P2P-Viz.

----------------

## P2P-Viz

Ili kujenga P2P-Viz, inahitajika kuwa na npm. 


>  Ili kusakinisha npm kwa nvm, tekeleza amri zifuatazo:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Funga na uanze upya terminali.


>  Tekeleza amri:
```bash
nvm install --lts
```

Nenda kwenye folda yako ya '/runziggurat'


>  Ili kunakili kwenye hifadhi ya P2P-Viz na kuanza, Tekeleza amri zifuatazo
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

Fungua kivinjari kwenye [http://localhost:3000](http://localhost:3000). 

Chagua 'Geolocation' kisha uchague 'Choose state file'.

Kutoka kwenye dirisha ibukizi la kichunguzi cha faili, chagua faili ya 'state.json'. 

Ramani ya Dunia ya kichunguzi cha node itajazwa na data ya faili. Tazama readme [Hapa](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) kwa maelezo zaidi kuhusu chaguo na mipangilio ya matumizi.


----------------
VIDOKEZO! 

Unaweza kuweka Crawler ifanye utafutaji kwa muda uliopangwa kwa urahisi kwa amri ya 'timeout', ambayo itatoa amri mahususi ya kusimamisha baada ya muda uliowekwa. Tekeleza 'timeout --help' kwa maelezo zaidi.
Amri ifuatayo itaanza na pia kusimamisha crawler kiotomatiki baada ya dakika 50.

>  Tekeleza amri
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
VIDOKEZO! 

'latest.json' inaweza kuitwa na kuandikwa kwenye '/testdata' ili usilazimike kuinakili na kuibandika mwenyewe.

----------------
VIDOKEZO! 

Maelezo ya Anwani ya IP yanaweza kukusanywa kutoka kwenye matokeo na kisha kutumika kupanda upya Crawler wakati wa kuanza (--seed-addrs). Hii itapunguza muda unaohitajika kutekeleza utafutaji kamili!
