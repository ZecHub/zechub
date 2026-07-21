<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


#  Zcash Network la kpɔkpɔ le susu me

Nusiwo gbɔna nye mɔfiame le alesi woawɔ Ziggurat 3.0 Crawler na Zcash kpakple ɖoɖowɔɖi siwo do ƒome kplii Crunchy kple P2P-Viz le Ubuntu 22.04 dzi hena Zcash network nyatakakawo nuƒoƒoƒu kple wo kpɔkpɔ le susu me. 
Video si wotsɔ ka ɖe eŋu le ete la hã zɔna ɖe ɖoɖo ma ke dzi.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Nq5cLiAHxPI"
    title="ziggurat 3.0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ɖe mɔ ɖeFullScreen ŋu
    loading="lazy"
  />
</div>
    
----------------
## Nudidi Siwo Ku Ðe Eɖoɖo Ŋu: 

Gbeɖuɖɔ -> [https://rustup.rs/](https://rustup.rs/)

## Le tiatia me:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(hena json nyatakakawo ɖeɖefia le terminal la me)

ʋuʋudedi -> [https://everything.curl.dev/get/linux](https://everything.curl.dev/get/linux)
(hena biabia tso crawler RPC ŋu)

npm (kple nvm) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(hena P2P-Viz ɖeɖefia le web-browser me)

----------------


----------------
Ziggurat 3.0 Nudzraɖoƒe | [https://github.com/runziggurat](https://github.com/runziggurat)

Crawler ƒe Repo | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Crunchy Repo si le ʋuʋu ɖi | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

P2P-Viz Repo | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

Dze egɔme kple asitɔtrɔ siwo sɔ la zazã.

>  Wɔ sedede siwo gbɔna:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Zcash Netwɔƒe ƒe Ʋuʋu

Zcash Crawler nɔa agbalẽdzraɖoƒe si ŋkɔe nye 'zcash' me eyata ateŋu anyo be nàwɔ agbalẽdzraɖoƒe yeye hafi awɔ crawler la ƒe nɔnɔmetata (runziggurat/zcash repo).


>  Tso /Home ƒe agbalẽdzraɖoƒea, Wɔ sedede siwo gbɔna:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

Yi le browser me yi 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

Alo ʋu readme la le 
'/runziggurat/zcash/src/dɔwɔnuwo/crawler/XLẼME.md'.

Nyatakakawo le axa sia dzi ku ɖe zazã tɔxɛ aɖe ŋu. 

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

`--seed-addrs` \ `--dns-seed` nye nyaʋiʋli ɖeka kolia si hiã eye wòhiã adrɛs ɖeka ya teti si woɖo ɖi hafi wòate ŋu awɔ dɔ.



----------------

Sedede 'cargo run --release --features crawler --bin crawler -- --help' nye sedede ŋutɔŋutɔ si nye run eye wòata kpekpeɖeŋunu si woɖe fia.


>  Ƒu du sededea
```bash
cargo run --release --features crawler --bin crawler -- --help
```


Esia aƒo ɖoɖowɔɖia nu ƒu eye wòakpɔ egbɔ be nusianu le dɔ wɔm nyuie.

Be woawɔ Crawler la, ele be woatsɔ '--seed-addrs' aflaga akpe ɖe gɔmedzedze ƒe sededea ŋu, si me Zcash node IP adrɛs ɖeka ya teti, si sɔ, anɔ. Ele be woaɖe mɔ na ʋuʋudedi la be wòaƒu du hena ɣeyiɣi si sɔ be woakpɔ emetsonu si sɔ. Woate ŋu akpɔ kpɔɖeŋu node IP adrɛs aɖewo le [https://zcashblockexplorer.com/nodes](https://zcashblockexplorer.com/nodes).

Be nàxɔ nyatakaka tso Crawler gbɔ esime wòle dɔ wɔm la, ele be nàtsɔ '--rpc-addr' aflaga akpe ɖe gɔmedzedze ƒe sededea ŋu. Esia mehiã be woawɔ crawler la ŋutɔ ko o gake ne menye nenema o la, abia be woatɔ crawler (ctrl+c alo SIGKILL) be woaɖe nyatakaka aɖeke afia kura o.


>  Ƒu du sededea
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

Crawler la adze kadodo kple network la gɔme (default every 20 secs) eye wòaƒo network data nu ƒu. 
Woateŋu aɖe nyatakaka tso Crawler la afia to curl zazã me atsɔ abia nya tso node la ŋu (esia bia jq hena info ma ɖeɖefia). 
Woɖo Crawler RPC adrɛs le kpɔɖeŋu sia me ɖe '127.0.0.1:54321'.


>  Le Terminal bubu me la, Run sededea
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

Esia aɖe '.protocol_version' nyatakaka siwo woƒo ƒu fifia siwo le '.result' ƒe akpaa me afia. '.result' ƒe akpaa lolo ŋutɔ eyata eɖea vi be woayɔ eƒe akpa aɖewo koŋ ɖe eteƒe. Nyatakaka ƒomevi bubu siwo ŋu viɖe le enye '.num_known_nodes', '.num_good_nodes', '.user_agents' kple bubuawo Kpɔ metrics ƒe akpaa [Afi sia](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
Be woawɔ Crunchy kple P2P-Viz la, ehiã be woatsɔ '.result' la aƒu gbe ɖe .json faɛl me. 


>  Ƒu du sededea
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

Esia awɔ 'latest.json' faɛl le fifi nudzraɖoƒe.Woazã 'latest.json' faɛl sia kple Crunchy. 

Le afisia la, woateŋu atɔ te Crawler la kple 'ctrl+c' nenye be nyatakaka bubu aɖeke mehiã o. Crawler la atsɔ nyatakaka aɖe ayi nyatakaka siwo ŋu viɖe le ƒe terminal.


----------------

## Crunchy ƒe ʋuʋudedi

Crunchy hiã be wòaƒo emetsonu json faɛl la nu ƒu hena zazã kple P2P-Viz.


Be nàtu Crunchy la, yi wò '/runziggurat' agbalẽdzraɖoƒe 

>  Be nàwɔ clone ɖe Crunchy repo la, Run sedede siwo gbɔna
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
Kpɔ 'latest.json' faɛl la eye nàde 'crunchy/testdata/' ƒe agbalẽdzraɖoƒea.

>  Wɔ sedede siwo gbɔna la 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

Esia awɔ Zcash node filtered 'state.json' faɛl le 'crunchy/testdata/' agbalẽdzraɖoƒe si woazã kple P2P-Viz.

----------------

## P2P-Viz

Be woatu P2P-Viz la, wobia be npm nanɔ esi. 


>  Be nàde npm kple nvm la, wɔ sedede siwo gbɔna:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Do terminal la eye nàgbugbɔ adze egɔme.


>  Tsɔ sedede si nye:
```bash
nvm install --lts
```

yi wò '/runziggurat' agbalẽdzraɖoƒea


>  Be nàwɔ clone ɖe P2P-Viz repo me eye nàdze egɔme la, Du sedede siwo gbɔna
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

Ʋu web-browser aɖe le [http://localhost:3000](http://localhost:3000). 

Tia 'Geolocation' eye emegbe natia 'Choose state file'.

Tso file explorer ƒe pop-up me la, tia 'state.json' faɛl la. 

Node explorer World Map ayɔ faɛl ƒe nyatakakawo me fũ. Kpɔ readme [Afi sia](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) hena numeɖeɖe bubuwo tso zazã ƒe tiatia kple ɖoɖowo ŋu.


----------------
AƉAŊUƉOƉOWO! 

Àteŋu aɖo Crawler la ɖe ɣeyiɣi ƒe ʋuʋu dzi ko kple 'ɣeyiɣi ƒe nuwuwu' sedede si ana amewuwu ƒe sedede tɔxɛ aɖe le ɣeyiɣi si woɖo ɖi megbe. Ƒu du 'timeout --help' hena nyatakaka bubuwo.
Sedede si gbɔna la adze egɔme eye wòatɔ le eɖokui si hã le crawler la megbe le 50 mins megbe.

>  Ƒu du sededea
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
AƉAŊUƉOƉOWO! 

Woateŋu ayɔ 'latest.json' eye woaŋlɔe ɖe '/testdata' me ale be mehiã be nàtsɔ asi awɔ eƒe kɔpi ahatsɔe ade eme o.

----------------
AƉAŊUƉOƉOWO! 

Woateŋu aƒo IP Adrɛs nyatakakawo nu ƒu tso emetsonua me eye emegbe woazãe atsɔ agbugbɔ aɖo Crawler la le gɔmedzedzea me (--seed-addrs). Esia aɖe ɣeyiɣi si woatsɔ awɔ crawl bliboe dzi akpɔtɔ! 
