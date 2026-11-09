<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


#  Ilele anya Netwọk Zcash

Ihe na-esonụ bụ ntụziaka banyere otu esi agba Ziggurat 3.0 Crawler maka Zcash yana mmemme Crunchy na P2P-Viz ndị metụtara ya na Ubuntu 22.04 iji nakọta ma lelee anya ozi netwọk Zcash.  
Vidio ejikọtara n'okpuru na-agbaso otu usoro ahụ.

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
## Wụnye Ihe Achọrọ: 

Rust -> [https://rustup.rs/](https://rustup.rs/)

## Nhọrọ:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(maka igosipụta ozi json na terminal)

curl -> [https://everything.curl.dev/install/linux.html](https://everything.curl.dev/install/linux.html)
(maka ịjụ Crawler RPC ajụjụ)

npm (na nvm) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(maka igosipụta P2P-Viz na ihe nchọgharị)

----------------


----------------
Ebe nchekwa Ziggurat 3.0 | [https://github.com/runziggurat](https://github.com/runziggurat)

Ebe nchekwa Crawler | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Ebe nchekwa Crunchy | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

Ebe nchekwa P2P-Viz | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

Bido site n'itinye mmelite ndị a na-emebu.

>  Gbaa iwu ndị a:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Crawler Netwọk Zcash

Crawler Zcash dị n'ime folda a kpọrọ 'zcash', ya mere ọ nwere ike ịbụ ihe amamihe dị na ya ịmepụta ndekọ ọhụrụ tupu ịme clone nke crawler (ebe nchekwa runziggurat/zcash).


>  Site na ndekọ /Home, gbaa iwu ndị a:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

Gaa na ihe nchọgharị na 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

Ma ọ bụ meghee readme na 
'/runziggurat/zcash/src/tools/crawler/README.md'

Ibe a nwere ozi gbasara ojiji pụrụ iche. 

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

`--seed-addrs` \ `--dns-seed` bụ naanị arụmụka a chọrọ ma chọọ opekata mpe otu Adreesị akpa ego akọwapụtara ka ọ gbaa ọsọ.



----------------

Iwu 'cargo run --release --features crawler --bin crawler -- --help' bụ iwu mgbagharị nkịtị, ọ ga-ebipụtakwa menu enyemaka e gosiri.


>  Gbaa iwu ahụ
```bash
cargo run --release --features crawler --bin crawler -- --help
```


Nke a ga-achịkọta mmemme ahụ ma hụ na ihe niile na-arụ ọrụ nke ọma.

Iji gbaa Crawler, a chọrọ itinye ọkọlọtọ '--seed-addrs' n'iwu mmalite ahụ, nke nwere opekata mpe otu Adreesị akpa ego IP node Zcash ziri ezi. Ekwesịrị ikwe ka Crawler gbaa ọsọ ruo oge kwesịrị ekwesị iji nweta nsonaazụ ziri ezi. Enwere ike ịchọta ụfọdụ atụ nke Adreesị akpa ego IP node na [https://mainnet.zcashexplorer.app/nodes](https://mainnet.zcashexplorer.app/nodes).

Iji nweta ozi site na Crawler mgbe ọ na-agba ọsọ, a chọrọ itinye ọkọlọtọ '--rpc-addr' n'iwu mmalite ahụ. Nke a adịghị achọ naanị iji gbaa crawler n'onwe ya, mana ma ọ bụghị ya, a ga-achọ ịkwụsị crawler (ctrl+c ma ọ bụ SIGKILL) iji gosipụta ozi ọ bụla ma ọlị.


>  Gbaa iwu ahụ
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

Crawler ga-amalite ikwurịta okwu na netwọk (ndabara bụ kwa sekọnd 20) ma nakọta data netwọk. 
Enwere ike igosipụta ozi sitere na Crawler site n'iji curl jụọ node ajụjụ (nke a chọrọ jq maka igosipụta ozi ahụ). 
Adreesị RPC Crawler n'ihe atụ a ka edobere na '127.0.0.1:54321'


>  Na Terminal ọzọ, gbaa iwu ahụ
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

Nke a ga-egosipụta data ugbu a anakọtara nke '.protocol_version' dị n'ime mpaghara '.result'. Mpaghara '.result' buru nnukwu ibu, ya mere ọ bara uru ịkpọ akụkụ ya kpọmkwem kama. Ụdị data ndị ọzọ bara uru bụ '.num_known_nodes', '.num_good_nodes', '.user_agents' wdg. Lee ngalaba metrik [Ebe a](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
Iji gbaa Crunchy na P2P-Viz, a chọrọ itinye '.result' n'ime faịlụ .json. 


>  Gbaa iwu ahụ
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

Nke a ga-emepụta faịlụ 'latest.json' na ndekọ ugbu a. A ga-eji faịlụ 'latest.json' a na Crunchy. 

N'oge a, enwere ike iji 'ctrl+c' kwụsị Crawler ma ọ bụrụ na achọkwaghị data ọzọ. Crawler ga-ewepụta akụkọ ozi bara uru na terminal.


----------------

## Crunchy

A chọrọ Crunchy iji chịkọta faịlụ json mmepụta maka iji ya na P2P-Viz.


Iji wuo Crunchy, gaa na folda '/runziggurat' gị 

>  Iji mee clone n'ime ebe nchekwa Crunchy, gbaa iwu ndị a
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
Detuo ma mado faịlụ 'latest.json' n'ime folda 'crunchy/testdata/'.

>  Gbaa iwu ndị a 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

Nke a ga-emepụta faịlụ 'state.json' node Zcash a sachara n'ime folda 'crunchy/testdata/' maka iji ya na P2P-Viz.

----------------

## P2P-Viz

Iji wuo P2P-Viz, a chọrọ inwe npm. 


>  Iji nvm wụnye npm, gbaa iwu ndị a:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Mechie ma malitegharịa terminal.


>  Gbaa iwu ahụ:
```bash
nvm install --lts
```

gaa na folda '/runziggurat' gị


>  Iji mee clone n'ime ebe nchekwa P2P-Viz ma malite ya, gbaa iwu ndị a
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

Mepee ihe nchọgharị na [http://localhost:3000](http://localhost:3000). 

Họrọ 'Geolocation', wee họrọ 'Choose state file'.

Site na mpụta nchọgharị faịlụ, họrọ faịlụ 'state.json'. 

Maapụ Ụwa nke node explorer ga-ejupụta na data faịlụ ahụ. Lee readme [Ebe a](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) maka nkọwa ndị ọzọ gbasara nhọrọ ojiji na ntọala.


----------------
NDỤMỌDỤ! 

Ị nwere ike idobe Crawler ka ọ na-eme crawl nwere oge n'ụzọ dị mfe site n'iwu 'timeout', nke ga-enye iwu igbu kpọmkwem mgbe oge e debere gasịrị. Gbaa 'timeout --help' maka ozi ndị ọzọ.
Iwu na-esonụ ga-amalite ma kwụsịkwa crawler ozugbo mgbe nkeji 50 gachara.

>  Gbaa iwu ahụ
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
NDỤMỌDỤ! 

Enwere ike ịkpọ ma dee 'latest.json' n'ime '/testdata' ka ị ghara iji aka detuo ma mado ya.

----------------
NDỤMỌDỤ! 

Enwere ike ịnakọta ozi Adreesị IP site na mmepụta wee jiri ya kụọ Crawler mkpụrụ ọzọ na mmalite (--seed-addrs). Nke a ga-ebelata oge achọrọ iji mee crawl zuru ezu!
