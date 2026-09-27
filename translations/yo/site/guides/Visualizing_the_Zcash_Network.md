<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


#  Wiwo Nẹtiwọọki Zcash

Èyí ni ìtọ́sọ́nà lórí bí a ṣe lè lo Ziggurat 3.0 Crawler fún Zcash àti àwọn ètò tí ó so mọ́ ọn Crunchy àti P2P-Viz lórí Ubuntu 22.04 fún kíkó àti fífojúrí ìwífún nípa nẹ́tíwọ́ọ̀kì Zcash. 
Fídíò tí a so mọ́ ìsàlẹ̀ yìí tẹ̀lé ìlànà kan náà.

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
## Awọn ibeere Fifi sori ẹrọ: 

Ipata -> [https://rustup.rs/](https://rustup.rs/)

## Àṣàyàn:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(fun fifi alaye json han ninu ebute naa)

ìfàgùn -> [https://everything.curl.dev/install/linux.html](https://everything.curl.dev/install/linux.html)
(fún ìbéèrè nípa RPC crawler)

npm (pẹ̀lú nvm) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(fún fífi P2P-Viz hàn nínú ẹ̀rọ aṣàwárí)

----------------


----------------
Ibi ìpamọ́ Ziggurat 3.0 | [https://github.com/runziggurat](https://github.com/runziggurat)

Ibi ipamọ Crawler | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Ibi ipamọ ti o nipọn | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

P2P-Viz Repo | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

Bẹ̀rẹ̀ nípa lílo àwọn àtúnṣe déédéé.

>  Ṣiṣe awọn aṣẹ wọnyi:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Olùṣàwárí Nẹ́tíwọ́ọ̀kì Zcash

Zcash Crawler ń gbé inú fódà kan tí orúkọ rẹ̀ ń jẹ́ 'zcash' nítorí náà ó lè dára láti ṣẹ̀dá àkójọ ìwé tuntun kí o tó ṣe ìṣẹ̀dá ìṣẹ̀dá ìwé ...


>  Láti inú ìwé àkójọ/Ilé, Ṣíṣe àwọn àṣẹ wọ̀nyí:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

Lọ kiri ninu ẹrọ aṣawakiri si 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

Tabi ṣii readme ni 
'/runziggurat/zcash/src/tools/crawler/README.md'

Ojú ìwé yìí ní ìwífún nípa lílo pàtó kan. 

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

`--seed-addrs` \ `--dns-seed` ni ariyanjiyan kan ṣoṣo ti a nilo ati pe o nilo o kere ju adirẹsi kan pato fun u lati ṣiṣẹ.



----------------

Àṣẹ ‘cargo run --release --features crawler --bin crawler ---help’ ni àṣẹ run gangan, yóò sì tẹ àkójọ ìrànlọ́wọ́ tí a fihàn jáde.


>  Ṣiṣẹ àṣẹ náà
```bash
cargo run --release --features crawler --bin crawler -- --help
```


Èyí yóò kó gbogbo ètò náà jọ, yóò sì rí i dájú pé ohun gbogbo ń ṣiṣẹ́ dáadáa.

Láti ṣiṣẹ́ Crawler, ó pọndandan láti fi àsíá '--seed-adds' kún àṣẹ ìbẹ̀rẹ̀, tí ó ní ó kéré tán àdírẹ́sì IP Zcash node kan tí ó wúlò. Ó yẹ kí a jẹ́ kí crawler náà ṣiṣẹ́ fún àkókò tí ó yẹ kí ó tó lè rí àbájáde pípéye. A lè rí àwọn àdírẹ́sì IP node kan lórí àpẹẹrẹ [https://zcashblockexplorer.com/nodes](https://zcashblockexplorer.com/nodes).

Láti gba ìwífún láti ọ̀dọ̀ Crawler nígbà tí ó bá ń ṣiṣẹ́, ó pọndandan láti fi àsíá '--rpc-addr' kún àṣẹ ìbẹ̀rẹ̀. Èyí kò pọndandan láti ṣiṣẹ́ crawler fúnra rẹ̀ nìkan ṣùgbọ́n bí bẹ́ẹ̀ kọ́ yóò nílò dídá crawler (ctrl+c tàbí SIGKILL) dúró láti fi ìwífún èyíkéyìí hàn rárá.


>  Ṣiṣẹ àṣẹ náà
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

Olùṣàwárí náà yóò bẹ̀rẹ̀ sí í bá nẹ́tíwọ́ọ̀kì sọ̀rọ̀ (àìyípadà ní gbogbo ìṣẹ́jú-àáyá 20) ó sì ń kó àwọn dátà nẹ́tíwọ́ọ̀kì jọ. 
A le fi alaye lati Crawler han nipa lilo curl lati beere ibeere lori node naa (eyi nilo jq fun fifi alaye naa han). 
A ti ṣètò àdírẹ́sì Crawler RPC nínú àpẹẹrẹ yìí sí '127.0.0.1:54321'


>  Ni ebute miiran, Ṣiṣe aṣẹ naa
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

Èyí yóò fi àwọn dátà '.protocol_version' tí a kó jọ lọ́wọ́lọ́wọ́ tí ó wà nínú pápá '.result' hàn. Ààyè '.result' tóbi púpọ̀ nítorí náà ó wúlò láti pe àwọn apá pàtó kan nínú rẹ̀ dípò. Àwọn irú dátà míràn tí ó wúlò ni '.num_known_nodes', '.num_good_nodes', '.user_agents' àti bẹ́ẹ̀ bẹ́ẹ̀ lọ. Wo apá àwọn ìwọ̀n [Nibi](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
Láti ṣiṣẹ́ Crunchy àti P2P-Viz, ó ṣe pàtàkì láti fi '.result' náà sínú fáìlì .json kan. 


>  Ṣiṣẹ àṣẹ náà
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

Èyí yóò ṣẹ̀dá fáìlì 'latest.json' kan nínú àkójọ ìwé tó wà lọ́wọ́lọ́wọ́.Fáìlì 'latest.json' yìí ni a ó lò pẹ̀lú Crunchy. 

Ní àkókò yìí, a lè dá Crawler dúró pẹ̀lú 'ctrl+c' tí a kò bá nílò dátà mọ́. Crawler yóò fi ìròyìn kan ránṣẹ́ sí ibi tí a ti lè rí àwọn ìsọfúnni tó wúlò.


----------------

## Prunchy

Ó ṣe pàtàkì láti kó gbogbo fáìlì json tó jáde jọ fún lílo pẹ̀lú P2P-Viz.


Láti kọ́ Crunchy, lọ sí folda '/runziggurat' rẹ 

>  Láti ṣe ìfọwọ́sowọ́pọ̀ sínú ibi ìpamọ́ Crunchy, Ṣíṣe àwọn àṣẹ wọ̀nyí
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
Daakọ faili 'latest.json' ki o si lẹẹmọ sinu folda 'crunchy/testdata/'.

>  Ṣiṣe awọn aṣẹ wọnyi 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

Èyí yóò ṣẹ̀dá fáìlì 'state.json' tí a fi sẹ́ẹ̀lì Zcash nínú fódà 'crunchy/testdata/' tí a ó lò pẹ̀lú P2P-Viz.

----------------

## P2P-Viz

Láti kọ́ P2P-Viz, ó ṣe pàtàkì láti ní npm. 


>  Lati fi npm sori ẹrọ pẹlu nvm, ṣiṣe awọn aṣẹ wọnyi:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Tii ki o tun bẹrẹ ebute naa.


>  Ṣiṣe aṣẹ naa:
```bash
nvm install --lts
```

lọ sí folda '/runziggurat' rẹ


>  Láti ṣe àwòkọ sínú ibi ìpamọ́ P2P-Viz kí o sì bẹ̀rẹ̀, Ṣíṣe àwọn àṣẹ wọ̀nyí
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

Ṣí ẹ̀rọ aṣàwákiri kan ní [http://localhost:3000](http://localhost:3000). 

Yan 'Geolocation' lẹ́yìn náà yan 'Yan fáìlì ìpínlẹ̀'.

Láti inú ìfọ́wọ́sí olùṣàwárí fáìlì, yan fáìlì 'state.json'. 

Àkójọpọ̀ ìwádìí nódù World Map yóò kún fún àwọn ìwífún fáìlì náà. Wo ìwé-ẹ̀rí náà [Nibi](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) fun alaye siwaju sii lori awọn aṣayan lilo ati awọn eto.


----------------
ÀWỌN ÌMỌ̀RÀN! 

O le ṣeto Crawler lori crawl ti a ti ṣe akoko pẹlu aṣẹ 'timeout' eyiti yoo funni ni aṣẹ pipa kan pato lẹhin akoko ti a ṣeto. Ṣiṣẹ 'timeout --help' fun alaye diẹ sii.
Àṣẹ tó tẹ̀lé yìí yóò bẹ̀rẹ̀, yóò sì tún dá crawler náà dúró láìfọwọ́kan lẹ́yìn ìṣẹ́jú 50.

>  Ṣiṣẹ àṣẹ náà
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
ÀWỌN ÌMỌ̀RÀN! 

A le pe 'latest.json' naa ki a si kọ sinu '/testdata' ki o ma ba ni lati daakọ rẹ ki o si lẹẹ mọ ọ pẹlu ọwọ.

----------------
ÀWỌN ÌMỌ̀RÀN! 

A le kó ìwífún nípa àdírẹ́sì IP jọ láti inú ìjáde náà, lẹ́yìn náà a lè lò ó láti tún un gbìn Crawler ní ìbẹ̀rẹ̀ (--seed-adds). Èyí yóò dín àkókò tí a nílò láti ṣe ìwádìí kíkún kù! 
