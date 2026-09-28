<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


#  Kuona Mtandao wa Zcash

Ifuatayo ni mwongozo wa jinsi ya kuendesha Ziggurat 3.0 Crawler kwa Zcash pamoja na programu zinazohusiana Crunchy na P2P-Viz kwenye Ubuntu 22.04 kwa ajili ya kukusanya na kuibua taarifa za mtandao wa Zcash. 
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
## Mahitaji ya Usakinishaji: 

Kutu -> [https://rustup.rs/](https://rustup.rs/)

## Hiari:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(kwa kuonyesha taarifa za json kwenye terminal)

mkunjo -> [https://everything.curl.dev/install/linux.html](https://everything.curl.dev/install/linux.html)
(kwa ajili ya kuuliza RPC ya kitambaa)

npm (na nvm) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(kwa kuonyesha P2P-Viz kwenye kivinjari)

----------------


----------------
Hifadhi ya Ziggurat 3.0 | [https://github.com/runziggurat](https://github.com/runziggurat)

Repo ya Mtambaaji | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Repo ya Kukasirika | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

Repo ya P2P-Viz | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

Anza kwa kutumia masasisho ya kawaida.

>  Endesha amri zifuatazo:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Kitambaa cha Mtandao cha Zcash

Kitambaa cha Zcash kinaishi ndani ya folda inayoitwa 'zcash' kwa hivyo inaweza kuwa vyema kuunda saraka mpya kabla ya kuunda kitambaa (runziggurat/zcash repo).


>  Kutoka kwa saraka ya /Nyumbani, endesha amri zifuatazo:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

Nenda kwenye kivinjari hadi 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

Au fungua readme katika 
'/runziggurat/zcash/src/tools/crawler/README.md'

Ukurasa huu una taarifa kuhusu matumizi maalum. 

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

`--seed-addrs` \ `--dns-seed` ndiyo hoja pekee inayohitajika na inahitaji angalau anwani moja maalum ili iendeshwe.



----------------

Amri 'cargo run --release --features crawler --bin crawler ---help' ni amri halisi ya run na itachapisha menyu ya usaidizi inayoonyeshwa.


>  Endesha amri
```bash
cargo run --release --features crawler --bin crawler -- --help
```


Hii itakusanya programu na kuhakikisha kila kitu kinafanya kazi vizuri.

Ili kuendesha Kitambaa, inahitajika kuongeza bendera ya '--seed-addrs' kwenye amri ya kuanza, ikiwa na angalau anwani moja ya IP ya nodi ya Zcash, halali. Kitambaa kinapaswa kuruhusiwa kufanya kazi kwa muda unaofaa ili kupata matokeo sahihi. Baadhi ya anwani za IP za nodi za sampuli zinaweza kupatikana kwenye [https://zcashblockexplorer.com/nodes](https://zcashblockexplorer.com/nodes).

Ili kupata taarifa kutoka kwa Kitambaa kinapoendeshwa, inahitajika kuongeza bendera ya '--rpc-addr' kwenye amri ya kuanza. Hii haihitajiki tu kuendesha kitambaa chenyewe lakini vinginevyo itahitaji kusimamisha kitambaa (ctrl+c au SIGKILL) ili kuonyesha taarifa yoyote kabisa.


>  Endesha amri
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

Kitambaa kitaanza kuwasiliana na mtandao (chaguo-msingi kila baada ya sekunde 20) na kukusanya data ya mtandao. 
Taarifa kutoka kwa Crawler zinaweza kuonyeshwa kwa kutumia curl kuuliza nodi (hii inahitaji jq kwa kuonyesha taarifa hiyo). 
Anwani ya Crawler RPC katika mfano huu imewekwa kuwa '127.0.0.1:54321'


>  Katika Kituo kingine, endesha amri
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

Hii itaonyesha data ya sasa ya '.protocol_version' iliyokusanywa ndani ya sehemu ya '.result'. Sehemu ya '.result' ni kubwa sana kwa hivyo ni muhimu kuita sehemu maalum zake badala yake. Aina zingine muhimu za data ni '.num_known_nodes', '.num_good_nodes', '.user_agents' n.k. Tazama sehemu ya vipimo [Hapa](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
Ili kuendesha Crunchy na P2P-Viz, inahitajika kuingiza '.result' kwenye faili ya .json. 


>  Endesha amri
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

Hii itaunda faili ya 'latest.json' katika saraka ya sasa. Faili hii ya 'latest.json' itatumika na Crunchy. 

Katika hatua hii, Kitambaa kinaweza kusimamishwa kwa kutumia 'ctrl+c' ikiwa hakuna data zaidi inayohitajika. Kitambaa kitatoa ripoti kwa kituo cha taarifa muhimu.


----------------

## Mbaya

Crunchy inahitajika ili kukusanya faili ya json ya matokeo kwa matumizi na P2P-Viz.


Ili kuunda Crunchy, nenda kwenye folda yako ya '/runziggurat' 

>  Ili kuunganisha kwenye repo ya Crunchy, endesha amri zifuatazo
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
Nakili na ubandike faili ya 'latest.json' kwenye folda ya 'crunchy/testdata/'.

>  Endesha amri zifuatazo 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

Hii itaunda faili ya 'state.json' iliyochujwa ya nodi ya Zcash kwenye folda ya 'crunchy/testdata/' itakayotumika na P2P-Viz.

----------------

## P2P-Viz

Ili kujenga P2P-Viz, inahitajika kuwa na npm. 


>  Ili kusakinisha npm na nvm, endesha amri zifuatazo:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Funga na uanze tena kituo.


>  Endesha amri:
```bash
nvm install --lts
```

nenda kwenye folda yako ya '/runziggurat'


>  Ili kuunganisha kwenye repo ya P2P-Viz na kuanza, Endesha amri zifuatazo
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

Fungua kivinjari katika [http://localhost:3000](http://localhost:3000). 

Chagua 'Jiografia' kisha uchague 'Chagua faili ya hali'.

Kutoka kwenye dirisha ibukizi la kichunguzi cha faili, chagua faili ya 'state.json'. 

Ramani ya Dunia ya kichunguzi cha nodi itajazwa na data ya faili. Tazama readme [Hapa](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) kwa maelezo zaidi kuhusu chaguo na mipangilio ya matumizi.


----------------
VIDOKEZO! 

Unaweza kuweka Kitambaa kwenye utambazaji wa wakati kwa kutumia amri ya 'timeout' ambayo itatoa amri maalum ya kuua baada ya muda uliowekwa. Endesha 'timeout --help' kwa maelezo zaidi.
Amri ifuatayo itaanza na pia itasimamisha kiotomatiki kitambaa baada ya dakika 50.

>  Endesha amri
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
VIDOKEZO! 

'latest.json' inaweza kuitwa na kuandikwa kwenye '/testdata' kwa hivyo huna haja ya kunakili na kubandika mwenyewe.

----------------
VIDOKEZO! 

Taarifa za anwani ya IP zinaweza kukusanywa kutoka kwa matokeo na kisha kutumika kupanda tena Kitambaa mwanzoni (--seed-addrs). Hii itapunguza muda unaohitajika kufanya kutambaa kamili! 
