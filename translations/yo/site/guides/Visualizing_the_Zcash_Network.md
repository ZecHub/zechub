<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


#  Ṣíṣe àwòrán Ìpínlẹ̀ Zcash

Àwọn ojúewé wọ̀nyí jápọ̀ mọ́ Ziggurat 3.0 Crawler for Zcash àti àwọn ètò Crunchy àti P2P-Viz lórí Ubuntu 22.04 fún kíkójọ àti fífi àwòrán wo ìsọfúnni nípa ẹ̀rọ Zcash: 
Àwọn fídíò tí ó wà nísàlẹ̀ yìí ń tẹ̀lé ìlànà kan náà.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Nq5cLiAHxPI"
    title="ziggurat 3.0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    jẹ́ kíFullScreen
    loading="lazy"
  />
</div>
    
----------------
## Awọn ibeere fifi sori ẹrọ: 

Ìdàró -> [https://rustup.rs/](https://rustup.rs/)

## Aṣayan:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(fún fífi ìwífún json hàn nínú òpópónà)

curl -> [https://everything.curl.dev/get/linux](https://everything.curl.dev/get/linux)
(fún wíwá ìsọfúnni láti inú RPC alágbèéká)

npm (pẹlu nvm) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(fún fífi P2P-Viz hàn nínú aṣàwákiri)

----------------


----------------
Ìpamọ́ Ziggurat 3.0 [https://github.com/runziggurat](https://github.com/runziggurat)

Àtòjọ ìsọfúnni nípa ohun tó ń lọ lágbàáyé [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Àdàkọ:Crunchy Repohttps://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

P2P-Viz Repo | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

Bẹrẹ nípa lílo àwọn àtúnṣe tó bágbà mu.

>  Ṣiṣe awọn aṣẹ wọnyi:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Zcash Network Crawler (Ohun tí ó ń ṣe àdàkọ)

Zcash Crawler n gbe inu folda kan ti a npe ni 'zcash' nitorina o le jẹ imọran lati ṣẹda itọsọna tuntun ṣaaju ki o to ṣe ẹda crawler (runziggurat / zcash repo).


>  Láti inú àkọọ́lẹ̀ /Ilé, Ṣiṣẹ àwọn àṣẹ yìí:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

Yọ kiri ninu aṣàwákiri lọ sí 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

Àbí ṣí ìwé kíkà ní 
"/runziggurat/zcash/src/tools/crawler/README.md" Àtúnṣe ojúewé

Ojú-ewé yìí ní ìsọfúnni nípa lílò pàtó. 

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

`--seed-addrs` \ `--dns-seed` is the only required argument and needs at least one specified address for it to run.



----------------

Àṣẹ 'cargo run --release --features crawler --bin crawlar -- --help' ni àṣẹ tí ó jẹ́ òótọ́ àti yóò tẹ àtòjọ ìrànlọ́wọ́ tí a fi hàn jáde.


>  Ṣiṣẹ àṣẹ náà
```bash
cargo run --release --features crawler --bin crawler -- --help
```


Èyí ni yóò ṣe àkójọ ètò náà, tí yóò sì rí i dájú pé ohun gbogbo ń ṣiṣẹ́ bó ṣe yẹ.

To run the Crawler, it is required to add a '--seed-addrs' flag to the start command, containing at least one, valid, Zcash node IP address. The crawler should be allowed to run for a reasonable amount of time to get an accurate result. Some sample node IP addresses can be found on  [https://zcashblockexplorer.com/nodes](https://zcashblockexplorer.com/nodes).

To get information from the Crawler while its running, it is required to add the '--rpc-addr' flag to the start command. This isn't required to only run the crawler itself but will otherwise require stopping the crawler (ctrl+c or SIGKILL) to display any information at all.


>  Ṣiṣẹ àṣẹ náà
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

Ẹrọ ayárabíàṣá náà yóò bẹ̀rẹ̀ sí bá nẹ́ẹ̀kì sọ̀rọ̀ (níṣe pàtó ní gbogbo ìṣẹ́jú 20) àti kíkó àwọn ìsọfúnni nẹ̀ẹ̀kà jọ. 
Alaye lati inu Crawler ni a le ṣe afihan nipa lilo curl lati beere fun node (eyi nilo jq fun fifihan alaye naa). 
Adirẹsi RPC Crawler ninu apẹẹrẹ yii ni a ṣeto si '127.0.0.1:54321'


>  Ninu Terminal miiran, Ṣiṣẹ aṣẹ naa
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

This will display the current collected '.protocol_version' data contained within the '.result' field. The '.result' field is very large so it is useful to call specific portions of it instead. Other useful data types are '.num_known_nodes', '.num_good_nodes', '.user_agents' etc. See the metrics section [Here](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
Láti ṣe Crunchy àti P2P-Viz, ó pọn dandan láti fi àbájáde sínú fáìlì .json. 


>  Ṣiṣẹ àṣẹ náà
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

Eleyi yoo ṣẹda a 'latest.json' faili ninu awọn ti isiyi directory.This 'last.jsion' faili yoo wa ni lo pẹlu Crunchy. 

Ni aaye yii, a le da Crawler duro pẹlu 'ctrl + c' ti ko ba nilo data diẹ sii. Crawler yoo ṣe agbejade ijabọ si ebute ti alaye ti o wulo.


----------------

## Ó máa ń kán

Crunchy nilo lati ṣajọpọ faili json ti o jade fun lilo pẹlu P2P-Viz.


Lati kọ Crunchy, lọ si folda rẹ '/runziggurat' 

>  Lati ṣe ẹda sinu ibi ipamọ Crunchy, Ṣiṣẹ awọn aṣẹ wọnyi
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
Ṣe àdàkọ àti lẹẹmọ fáìlì 'latest.json' sínú àpamọ́ 'crunchy/testdata/'.

>  Ṣiṣe awọn aṣẹ wọnyi 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

Eyi yoo ṣẹda faili 'state.json' ti a fi silẹ Zcash node ninu folda 'crunchy/testdata/' lati lo pẹlu P2P-Viz.

----------------

## P2P-Viz

Lati kọ P2P-Viz, o nilo lati ni npm. 


>  Lati fi npm sori ẹrọ pẹlu nvm, ṣe awọn aṣẹ wọnyi:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Pa ati tun bẹrẹ ebute naa.


>  Ṣiṣẹ aṣẹ:
```bash
nvm install --lts
```

lọ sí àpamọ́ '/runziggurat' rẹ


>  Lati ṣe àdàkọ sinu P2P-Viz repo ki o si bẹrẹ, Ṣiṣẹ awọn atẹle awọn aṣẹ
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

Ṣii aṣàwákiri kan ní [http://localhost:3000](http://localhost:3000). 

Yan 'Geolocation' ki o si yan 'Yan ipinle faili'.

Lati inu faili explorer pop-up, yan faili 'state.json'. 

Awọn node explorer World Map yoo kún pẹlu awọn faili data. Wo awọn readme [Nibi](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) fún ìsọfúnni síwájú sí i lórí àwọn àyè àti ìtòlẹ́sẹẹsẹ lílò.


----------------
ÀWỌN ÌDÍLÉ! 

You can set the Crawler on a timed crawl simply with the 'timeout' command which will issue a specific kill command after a set amount of time. Run 'timeout --help' for more info.
Àṣẹ tí ó wà nísàlẹ̀ yìí yóò bẹ̀rẹ̀, yóò sì tún dá ẹ̀rọ náà dúró lẹ́yìn àádọ́ta ìṣẹ́jú

>  Ṣiṣẹ àṣẹ náà
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
ÀWỌN ÌDÍLÉ! 

A le pe 'latest.json' ki a si kọ ọ sinu '/testdata' ki o maṣe ni lati daakọ ati lẹẹ mọ pẹlu ọwọ.

----------------
ÀWỌN ÌDÍLÉ! 

IP Adirẹsi alaye le ti wa ni gba lati awọn jade ati ki o si lo lati reseed awọn Crawler ni ibẹrẹ (--seed-addrs). Eleyi yoo din awọn akoko ti a beere lati se agbekale kan ni kikun crawl! 
