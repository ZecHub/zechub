<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


#  Ịhụ ihe gbasara netwọk Zcash

N'okpuru ebe a bụ ntuziaka maka otu esi agba ọsọ Ziggurat 3.0 Crawler maka Zcash yana mmemme ndị metụtara ya Crunchy na P2P-Viz na Ubuntu 22.04 maka ịchịkọta na ịhụ ozi netwọk Zcash. 
Vidiyo njikọ dị n'okpuru na-eso otu usoro ahụ.

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
## Ihe achọrọ maka nrụnye: 

Nchara -> [https://rustup.rs/](https://rustup.rs/)

## Nhọrọ:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(maka igosi ozi json na njedebe)

gbagọọ agbagọ -> [https://everything.curl.dev/install/linux.html](https://everything.curl.dev/install/linux.html)
(maka ịjụ ajụjụ gbasara RPC crawler)

npm (na nvm) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(maka igosi P2P-Viz na ihe nchọgharị)

----------------


----------------
Ebe Nchekwa Ziggurat 3.0 | [https://github.com/runziggurat](https://github.com/runziggurat)

Ebe a na-adọkpụ ihe | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Ebe Nchekwa Dị Mfe | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

P2P-Viz Repo | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

Malite site n'itinye mmelite nkịtị.

>  Gbaa iwu ndị a:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Zcash Network Crawler

Zcash Crawler bi n'ime folda aha ya bụ 'zcash', yabụ ọ ga-adị mma ka ị mepụta ndekọ ọhụrụ tupu ị kụọ crawler (runziggurat/zcash repo).


>  Site na ndekọ /Home, Gbaa iwu ndị a:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

Gaa na ihe nchọgharị gị 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

Ma ọ bụ mepee readme na 
'/runziggurat/zcash/src/tools/crawler/README.md'

Ibe a nwere ozi gbasara ojiji a kapịrị ọnụ. 

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

`--seed-addrs` \ `--dns-seed` bụ naanị arụmụka achọrọ ma chọọ opekata mpe otu adreesị akọwapụtara ka ọ wee rụọ ọrụ.



----------------

Iwu 'cargo run --release --features crawler --bin crawler ---help' bụ iwu ọsọ nkịtị ma ga-ebipụta menu enyemaka egosiri.


>  Gbaa iwu ahụ
```bash
cargo run --release --features crawler --bin crawler -- --help
```


Nke a ga-achịkọta usoro ahụ ma hụ na ihe niile na-arụ ọrụ nke ọma.

Iji gbaa Crawler ọsọ, ọ dị mkpa ka ị tinye ọkọlọtọ '--seed-adds' na iwu mmalite, nke nwere opekata mpe otu adreesị IP nke Zcash node dị irè. Ekwesịrị ịhapụ crawler ahụ ka ọ na-agba ọsọ ruo oge kwesịrị ekwesị iji nweta nsonaazụ ziri ezi. Enwere ike ịchọta ụfọdụ adreesị IP nke node node na [https://zcashblockexplorer.com/nodes](https://zcashblockexplorer.com/nodes).

Iji nweta ozi site n'aka Crawler mgbe ọ na-agba ọsọ, ọ dị mkpa ka ị tinye ọkọlọtọ '--rpc-addr' na iwu mmalite. Nke a abụghị naanị iji gbaa crawler n'onwe ya kama ọ ga-achọ ka a kwụsị crawler (ctrl+c ma ọ bụ SIGKILL) iji gosipụta ozi ọ bụla ma ọlị.


>  Gbaa iwu ahụ
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

Onye na-agbagharị ga-amalite ịkparịta ụka na netwọk (na ndabara kwa sekọnd iri abụọ ọ bụla) ma na-anakọta data netwọk. 
Enwere ike igosi ozi sitere na Crawler site na iji curl iji jụọ ajụjụ na node (nke a chọrọ jq maka igosi ozi ahụ). 
A na-ahazi adreesị Crawler RPC dị na ihe atụ a ka ọ bụrụ '127.0.0.1:54321'


>  Na Terminal ọzọ, Gbaa iwu ahụ
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

Nke a ga-egosi data '.protocol_version' anakọtara ugbu a dị n'ime ubi '.result'. Ubi '.result' buru ibu nke ukwuu ya mere ọ bara uru ịkpọ akụkụ ụfọdụ nke ya kama. Ụdị data ndị ọzọ bara uru bụ '.num_known_nodes', '.num_good_nodes', '.user_agents' wdg. Lee ngalaba metrics [Ebe a](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
Iji mee ka Crunchy na P2P-Viz rụọ ọrụ, ọ dị mkpa ka ịpịnye '.result' ahụ n'ime faịlụ .json. 


>  Gbaa iwu ahụ
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

Nke a ga-emepụta faịlụ 'latest.json' na ndekọ dị ugbu a. A ga-eji faịlụ 'latest.json' a na Crunchy. 

N'oge a, enwere ike iji 'ctrl+c' kwụsị Crawler ma ọ bụrụ na achọghị data ọzọ. Crawler ga-ewepụta akụkọ na njedebe nke ozi bara uru.


----------------

## Ọkpụkpụ gbawara agbawa

A chọrọ ka ọ dị nro iji chịkọta faịlụ json mmepụta maka ojiji na P2P-Viz.


Iji wuo Crunchy, gaa na folda '/runziggurat' gị 

>  Iji mepụta Crunchy repo, gbaa iwu ndị a
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
Detuo ma mado faịlụ 'latest.json' n'ime folda 'crunchy/testdata/'.

>  Gbaa iwu ndị a 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

Nke a ga-emepụta faịlụ 'state.json' nke a na-ehichapụ na Zcash node na folda 'crunchy/testdata/' iji ya na P2P-Viz.

----------------

## P2P-Viz

Iji wuo P2P-Viz, ọ dị mkpa ka e nwee npm. 


>  Iji wụnye npm na nvm, gbaa iwu ndị a:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Mechie ma malitegharịa ọdụ ahụ.


>  Gbaa iwu ahụ:
```bash
nvm install --lts
```

gaa na folda '/runziggurat' gị


>  Iji mepụta ihe nchekwa P2P-Viz wee malite, Gbaa iwu ndị a
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

Mepee ihe nchọgharị na [http://localhost:3000](http://localhost:3000). 

Họrọ 'Geolocation' wee họrọ 'Họrọ faịlụ steeti'.

Site na mmapụta faịlụ explorer, họrọ faịlụ 'state.json'. 

Ihe nchọgharị node World Map ga-ejupụta na data faịlụ ahụ. Lee readme [Ebe a](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) maka nkọwa ndị ọzọ gbasara nhọrọ na ntọala ojiji.


----------------
NDỤMỌDỤ! 

I nwere ike ịtọ Crawler ka ọ rụọ ọrụ n'oge a kara aka site na iji iwu 'timeout' nke ga-enye iwu igbu egbu kpọmkwem mgbe oge a kara aka gasịrị. Gbaa 'timeout --help' maka ozi ndị ọzọ.
Iwu a ga-amalite ma kwụsịkwa crawler ahụ ozugbo nkeji iri ise gachara.

>  Gbaa iwu ahụ
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
NDỤMỌDỤ! 

Enwere ike ịkpọ ma dee 'latest.json' n'ime '/testdata' ka ị ghara idetuo ma mado ya aka.

----------------
NDỤMỌDỤ! 

Enwere ike ịchịkọta ozi gbasara adreesị IP site na ihe e si na ya pụta wee jiri ya mee ka Crawler ahụ maliteghachi na mbido (--seed-adds). Nke a ga-ebelata oge achọrọ iji mee nyocha zuru oke! 
