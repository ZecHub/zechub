<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


#  Ichepụta Netwọk Zcash

The following is a guide on how to run the Ziggurat 3.0 Crawler for Zcash as well as the associated programs Crunchy and P2P-Viz on Ubuntu 22.04 for gathering and visualizing Zcash network information.  
Vidio a jikọtara n'okpuru na-agbaso otu usoro ahụ.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Nq5cLiAHxPI"
    title="ziggurat 3.0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    kweeFullScreen
    loading="lazy"
  />
</div>
    
----------------
## Ntinye chọrọ: 

Ọkụ -> [https://rustup.rs/](https://rustup.rs/)

## Nhọrọ:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(maka igosipụta ozi json na ọdụ)

curl -> [https://everything.curl.dev/get/linux](https://everything.curl.dev/get/linux)
(maka ịjụ ndị crawler RPC)

npm (na nvm) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(maka igosipụta P2P-Viz na ihe nchọgharị)

----------------


----------------
Ebe nchekwa Ziggurat 3.0 [https://github.com/runziggurat](https://github.com/runziggurat)

Crawler Repo [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Crunchy Repo [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

P2P-Viz Repo [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

Malite site n'itinye mmelite nkịtị.

>  Gbaa iwu ndị a:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Zcash Network Crawler

Zcash Crawler bi n'ime folda a na-akpọ 'zcash' ya mere ọ nwere ike ịbụ ihe amamihe dị na ya ịmepụta ndekọ ọhụrụ tupu ị na-ejikọta crawler (runziggurat / zcash repo).


>  Site na / Home directory, Gbaa iwu ndị a:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

Na-agagharị na ihe nchọgharị gaa 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

Ma ọ bụ mepee ihe na-agụ na 
"/runziggurat/zcash/src/tools/crawler/README.md"

Peeji a nwere ozi gbasara ojiji pụrụ iche. 

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

`--seed-addrs` \ `--dns-seed` bụ naanị arụmụka achọrọ ma chọọ ma ọ dịkarịa ala otu adreesị akọwapụtara maka ya ka ọ rụọ ọrụ.



----------------

Iwu 'cargo run --release --features crawler --bin crawlar -- --help' bụ iwu ịgba ọsọ nkịtị ma ga-ebipụta menu enyemaka egosiri.


>  Gbaa iwu ahụ
```bash
cargo run --release --features crawler --bin crawler -- --help
```


Nke a ga-achịkọta usoro ihe omume ahụ ma hụ na ihe niile na-arụ ọrụ nke ọma.

To run the Crawler, it is required to add a '--seed-addrs' flag to the start command, containing at least one, valid, Zcash node IP address. The crawler should be allowed to run for a reasonable amount of time to get an accurate result. Some sample node IP addresses can be found on  [https://zcashblockexplorer.com/nodes](https://zcashblockexplorer.com/nodes).

To get information from the Crawler while its running, it is required to add the '--rpc-addr' flag to the start command. This isn't required to only run the crawler itself but will otherwise require stopping the crawler (ctrl+c or SIGKILL) to display any information at all.


>  Gbaa iwu ahụ
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

Onye nyocha ahụ ga-amalite ikwurịta okwu na netwọkụ (ndabara ọ bụla 20 sekọnd) na ịnakọta data netwọkụ. 
Enwere ike igosi ozi sitere na Crawler site na iji curl iji jụọ ọnụ (nke a chọrọ jq maka igosi ihe ọmụma ahụ). 
Adreesị RPC Crawler na ihe atụ a ka edobere na '127.0.0.1:54321'


>  Na Terminal ọzọ, Gbaa iwu ahụ
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

This will display the current collected '.protocol_version' data contained within the '.result' field. The '.result' field is very large so it is useful to call specific portions of it instead. Other useful data types are '.num_known_nodes', '.num_good_nodes', '.user_agents' etc. See the metrics section [Here](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
Iji na-agba ọsọ Crunchy na P2P-Viz, ọ dị mkpa iji ọkpọkọ '.result' n'ime faịlụ .json. 


>  Gbaa iwu ahụ
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

Nke a ga-emepụta faịlụ 'latest.json' n'ime akwụkwọ ndekọ ugbu a. A ga-eji faịlụ 'last. json' a na Crunchy. 

N'oge a, enwere ike ịkwụsị Crawler na 'ctrl + c' ma ọ bụrụ na achọrọ data ọzọ. Crawler ga-ewepụta akụkọ na ọdụ nke ozi bara uru.


----------------

## Ihe na-agba agba

A chọrọ Crunchy iji chịkọta faịlụ json mmepụta maka iji ya na P2P-Viz.


Iji wuo Crunchy, gaa na folda '/runziggurat' gị 

>  Iji clone n'ime Crunchy repo, Gbaa iwu ndị a
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
Detuo ma mado faịlụ 'latest.json' n'ime folda 'crunchy/testdata/'.

>  Gbaa iwu ndị a 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

Nke a ga-emepụta faịlụ 'state.json' Zcash node na nchekwa 'crunchy/testdata/' iji jiri P2P-Viz.

----------------

## P2P-Viz

Iji wuo P2P-Viz, ọ dị mkpa inwe npm. 


>  Iji wụnye npm na nvm, gbaa iwu ndị a:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Mechie ma malitegharịa ọnụ.


>  Gbaa iwu a:
```bash
nvm install --lts
```

gaa na folda '/runziggurat' gị


>  Iji clone n'ime P2P-Viz repo na-amalite, Gbaa ndị na-esonụ iwu
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

Site na faịlụ nchọgharị mmapụta, họrọ faịlụ 'state.json'. 

Onye na-eme nchọpụta ụwa ga-ejupụta data faịlụ ahụ. Lee readme [Ebe a](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) maka nkọwa ndị ọzọ gbasara nhọrọ ojiji na ntọala.


----------------
NDỤMỌDỤ! 

Ị nwere ike ịtọ Crawler na oge a na-emechi ngwa ngwa site na iwu 'timeout' nke ga-enye iwu igbu egbu kpọmkwem mgbe oge ụfọdụ gasịrị. Gbaa 'oge - enyemaka' maka ozi ndị ọzọ.
Iwu na-esote ga-amalite ma kwụsịkwa crawler na-akpaghị aka mgbe minit 50 gasịrị.

>  Gbaa iwu ahụ
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
NDỤMỌDỤ! 

Enwere ike ịkpọ 'latest.json' ma dee ya na '/testdata' ka ị ghara iji aka gị detuo ma mado ya.

----------------
NDỤMỌDỤ! 

Enwere ike ịnakọta ozi adreesị IP site na mmepụta wee jiri ya mee ihe na Crawler na mbido (--seed-addrs). Nke a ga-ebelata oge achọrọ iji mee nyocha zuru ezu! 
