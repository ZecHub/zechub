<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


#  Zcash Network no a wobɛhwɛ wɔ w’adwenem

Nea edidi so yi yɛ akwankyerɛ a ɛfa sɛnea wɔde Ziggurat 3.0 Crawler ma Zcash ne nhyehyɛe ahorow a ɛbata ho Crunchy ne P2P-Viz wɔ Ubuntu 22.04 a wɔde boaboa Zcash ntwamutam ho nsɛm ano na wɔyɛ ho mfonini wɔ w’adwenem. 
Video a ɛwɔ ase ha a wɔde link ahyɛ mu no di adeyɛ koro no ara akyi.

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
## Install Ahwehwɛde ahorow: 

Rust -> [https://rustup.rs/](https://rustup.rs/)

## Ɛnyɛ ɔhyɛ:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(ma json nsɛm a wɔda no adi wɔ terminal no mu)

kurukuruwa -> [ .https://everything.curl.dev/get/linux](https://everything.curl.dev/get/linux)
(ma wobisabisa crawler RPC no)

npm (ne nvm) -> [ .https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(ma P2P-Viz a wobɛda no adi wɔ browser no mu)

----------------


----------------
Ziggurat 3.0 Adekorabea | [https://github.com/runziggurat](https://github.com/runziggurat)

Crawler Repo a Wɔde Di Dwuma | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Crunchy Repo a Ɛyɛ Fɛ | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

P2P-Viz Repo a Wɔde Di Dwuma | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

Fi ase denam updates a ɛyɛ daa a wode bedi dwuma so.

>  Fa ahyɛde ahorow a edidi so yi di dwuma:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Zcash Ntwamutam a Wɔhwehwɛ

Zcash Crawler no te folda bi a wɔato din 'zcash' mu enti ebia ɛbɛyɛ papa sɛ wobɛbɔ directory foforo ansa na woayɛ crawler no clone (runziggurat/zcash repo).


>  Efi /Home directory no mu, Run ahyɛde ahorow a edidi so yi:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

Kɔ browser mu kɔ 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

Anaasɛ bue readme no wɔ 
'/runziggurat/zcash/src/nnwinnade/krawler/README.md'.

Kratafa yi kura nsɛm a ɛfa sɛnea wɔde di dwuma pɔtee bi ho. 

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

`--seed-addrs` \ `--dns-seed` yɛ akyinnyegye biako pɛ a wɔhwehwɛ na anyɛ yiye koraa no ehia address biako a wɔakyerɛ na ama atumi ayɛ adwuma.



----------------

Ahyɛdeɛ 'cargo run --release --features crawler --bin crawler -- --help' yɛ run ahyɛdeɛ ankasa na ɛbɛtintim mmoa menu a wɔakyerɛ no.


>  Fa ahyɛde no tu mmirika
```bash
cargo run --release --features crawler --bin crawler -- --help
```


Eyi bɛboaboa dwumadi no ano na ahwɛ ahu sɛ biribiara reyɛ adwuma yiye.

Sɛ wobɛtumi ayɛ Crawler no a, ɛhia sɛ wode '--seed-addrs' frankaa ka start ahyɛdeɛ no ho, a anyɛ yie koraa no, Zcash node IP address baako, a ɛfata, na ɛwɔ mu. Ɛsɛ sɛ wɔma crawler no kwan ma otu mmirika bere a ɛfata na ama wɔanya nea efi mu ba no pɛpɛɛpɛ. Wobetumi ahu nhwɛsode node IP address ahorow bi wɔ [https://zcashblockexplorer.com/nodes](https://zcashblockexplorer.com/nodes).

Sɛ wopɛ sɛ wonya nsɛm fi Crawler no hɔ bere a ɛretu mmirika a, ɛho hia sɛ wode '--rpc-addr' frankaa ka start ahyɛde no ho. Eyi nhia sɛ wode krawler no ankasa nkutoo na ɛyɛ adwuma nanso sɛ ɛnte saa a, ɛbɛhwehwɛ sɛ wugyae krawla no (ctrl+c anaa SIGKILL) na ama woada nsɛm biara adi koraa.


>  Fa ahyɛde no tu mmirika
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

Crawler no bɛhyɛ aseɛ ne network no adi nkitaho (default biara 20 secs) na waboaboa network data ano. 
Wobetumi ada nsɛm a efi Crawler no adi denam curl a wɔde bedi dwuma de abisa node no so (eyi hwehwɛ sɛ jq de kyerɛ saa info no). 
Wɔde Crawler RPC address a ɛwɔ nhwɛsoɔ yi mu no ato hɔ sɛ '127.0.0.1:54321'.


>  Wɔ Terminal foforo mu no, Run ahyɛde no
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

Wei bɛkyerɛ '.protocol_version' data a wɔaboaboa ano mprempren a ɛwɔ '.result' field no mu. '.result' field no yɛ kɛseɛ paa enti mfasoɔ wɔ so sɛ wobɛfrɛ ne fã pɔtee bi mmom. Data ahorow afoforo a mfaso wɔ so ne '.num_known_nodes', '.num_good_nodes', '.user_agents' ne nea ɛkeka ho Hwɛ metrics ɔfa [Ha](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
Sɛ wobɛtumi ayɛ Crunchy ne P2P-Viz a, ɛhia sɛ wode '.result' no paipe kɔ .json fael mu. 


>  Fa ahyɛde no tu mmirika
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

Wei bɛma woanya 'latest.json' fael wɔ mprempren daerekta no mu.Wɔde saa 'latest.json' fael yi bedi dwuma ne Crunchy. 

Saa bere yi, wobetumi de 'ctrl+c' agyae Crawler no sɛ data foforo biara ho nhia a. Crawler no de amanneɛbɔ bi bɛkɔ terminal a nsɛm a mfaso wɔ so wom.


----------------

## Crunchy a ɛyɛ mmerɛw

Crunchy hia sɛ ɛboaboa output json fael no ano ma wɔde di dwuma ne P2P-Viz.


Sɛ wopɛ sɛ wokyekye Crunchy a, kɔ wo '/runziggurat' folda no so 

>  Sɛ wopɛ sɛ wo clone kɔ Crunchy repo no mu a, Run ahyɛdeɛ a ɛdidi soɔ yi
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
Kɔpi na fa 'latest.json' fael no hyɛ 'crunchy/testdata/' folda no mu.

>  Fa ahyɛde ahorow a edidi so yi di dwuma 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

Wei bɛma Zcash node filtered 'state.json' fael wɔ 'crunchy/testdata/' folda a wɔde bedi dwuma ne P2P-Viz.

----------------

## P2P-Viz

Sɛ wobɛkyekyere P2P-Viz a, ɛhia sɛ wonya npm. 


>  Sɛ wopɛ sɛ wo instɔl npm ne nvm a, yɛ ahyɛdeɛ a ɛdidi soɔ yi:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

To na san hyɛ terminal no ase.


>  Fa ahyɛde no tu mmirika:
```bash
nvm install --lts
```

kɔ wo '/runziggurat' folda no so


>  Sɛ wopɛ sɛ wo clone kɔ P2P-Viz repo no mu na wohyɛ aseɛ a, Run ahyɛdeɛ a ɛdidi soɔ yi
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

Bue browser bi wɔ [ 1 ].http://localhost:3000](http://localhost:3000). 

Paw 'Geolocation' na afei paw 'Choose state file'.

Efi fael explorer pop-up no so, paw 'state.json' fael no. 

Node explorer World Map no bɛhyɛ fael data no ma. Hwɛ readme [Ɛha](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) sɛ wopɛ nsɛm pii fa akwan a wɔfa so de di dwuma ne nhyehyɛe ahorow ho.


----------------
ANO! 

Wubetumi de Crawler no ahyɛ timed crawl so kɛkɛ denam 'timeout' ahyɛde a ɛde kill ahyɛde pɔtee bi bɛma wɔ bere dodow bi a wɔahyɛ akyi. Run 'timeout --help' na woanya nsɛm pii.
Ahyɛdeɛ a ɛdidi soɔ yi bɛhyɛ aseɛ na nso automatically agyae crawler no wɔ 50 mins akyi.

>  Fa ahyɛde no tu mmirika
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
ANO! 

Wobetumi afrɛ 'latest.json' no na wɔakyerɛw no akɔ '/testdata' no mu enti ɛnsɛ sɛ wode nsa kɔpi na wode hyɛ mu.

----------------
ANO! 

Wobetumi aboaboa IP Address ho nsɛm ano afi output no mu na afei wɔde adi dwuma de asan ahyɛ Crawler no mu wɔ mfiase (--seed-addrs). Eyi bɛtew bere a wɔde yɛ crawl a edi mũ no so! 
