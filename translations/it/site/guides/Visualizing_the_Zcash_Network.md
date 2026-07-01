<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


#  Visualizzare la rete Zcash

Quella che segue è una guida su come eseguire il crawler Ziggurat 3.0 per Zcash insieme ai programmi associati Crunchy e P2P-Viz su Ubuntu 22.04 per raccogliere e visualizzare le informazioni sulla rete Zcash.  
Il video collegato qui sotto segue lo stesso procedimento.

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
## Requisiti di installazione: 

Rust -> [https://rustup.rs/](https://rustup.rs/)

## Facoltativo:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(per visualizzare le informazioni json nel terminale)

curl -> [https://everything.curl.dev/get/linux](https://everything.curl.dev/get/linux)
(per interrogare l'RPC del crawler)

npm (con nvm) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(per visualizzare P2P-Viz nel browser)

----------------


----------------
Repository Ziggurat 3.0 | [https://github.com/runziggurat](https://github.com/runziggurat)

Repo del crawler | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Repo di Crunchy | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

Repo di P2P-Viz | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

Inizia applicando i normali aggiornamenti.

>  Esegui i seguenti comandi:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Crawler della rete Zcash

Il crawler di Zcash risiede dentro una cartella chiamata 'zcash', quindi potrebbe essere consigliabile creare una nuova directory prima di clonare il crawler (repo runziggurat/zcash).


>  Dalla directory /Home, esegui i seguenti comandi:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

Naviga nel browser fino a 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

Oppure apri il readme in 
'/runziggurat/zcash/src/tools/crawler/README.md'

Questa pagina contiene informazioni sull'utilizzo specifico. 

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

`--seed-addrs` \ `--dns-seed` è l'unico argomento obbligatorio e necessita di almeno un indirizzo specificato per poter funzionare.



----------------

Il comando 'cargo run --release --features crawler --bin crawler -- --help' è il comando di esecuzione letterale e stamperà il menu di aiuto mostrato.


>  Esegui il comando
```bash
cargo run --release --features crawler --bin crawler -- --help
```


Questo compilerà il programma e si assicurerà che tutto funzioni correttamente.

Per eseguire il crawler, è necessario aggiungere un flag '--seed-addrs' al comando di avvio, contenente almeno un indirizzo IP valido di un nodo Zcash. Il crawler dovrebbe essere lasciato in esecuzione per un periodo di tempo ragionevole per ottenere un risultato accurato. Alcuni indirizzi IP di nodi di esempio si possono trovare su [https://zcashblockexplorer.com/nodes](https://zcashblockexplorer.com/nodes).

Per ottenere informazioni dal crawler mentre è in esecuzione, è necessario aggiungere il flag '--rpc-addr' al comando di avvio. Non è richiesto per eseguire solamente il crawler in sé, ma altrimenti richiederà di arrestare il crawler (ctrl+c o SIGKILL) per visualizzare qualsiasi informazione.


>  Esegui il comando
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

Il crawler inizierà a comunicare con la rete (per impostazione predefinita ogni 20 secondi) e a raccogliere dati di rete. 
Le informazioni dal crawler possono essere visualizzate usando curl per interrogare il nodo (questo richiede jq per visualizzare tali informazioni). 
L'indirizzo RPC del crawler in questo esempio è impostato su '127.0.0.1:54321'


>  In un altro terminale, esegui il comando
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

Questo visualizzerà i dati '.protocol_version' attualmente raccolti contenuti nel campo '.result'. Il campo '.result' è molto grande, quindi è utile richiamarne porzioni specifiche invece di tutto. Altri tipi di dati utili sono '.num_known_nodes', '.num_good_nodes', '.user_agents' ecc. Vedi la sezione metriche [Qui](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
Per eseguire Crunchy e P2P-Viz, è necessario reindirizzare il '.result' in un file .json. 


>  Esegui il comando
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

Questo creerà un file 'latest.json' nella directory corrente. Questo file 'latest.json' verrà usato con Crunchy. 

A questo punto, il crawler può essere arrestato con 'ctrl+c' se non sono necessari altri dati. Il crawler stamperà un report di informazioni utili nel terminale.


----------------

## Crunchy

Crunchy è necessario per aggregare il file json di output da usare con P2P-Viz.


Per compilare Crunchy, naviga fino alla tua cartella '/runziggurat' 

>  Per clonare il repo di Crunchy, esegui i seguenti comandi
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
Copia e incolla il file 'latest.json' nella cartella 'crunchy/testdata/'.

>  Esegui i seguenti comandi 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

Questo creerà un file 'state.json' filtrato sui nodi Zcash nella cartella 'crunchy/testdata/' da usare con P2P-Viz.

----------------

## P2P-Viz

Per compilare P2P-Viz, è necessario avere npm. 


>  Per installare npm con nvm, esegui i seguenti comandi:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Chiudi e riavvia il terminale.


>  Esegui il comando:
```bash
nvm install --lts
```

naviga fino alla tua cartella '/runziggurat'


>  Per clonare il repo di P2P-Viz e avviarlo, esegui i seguenti comandi
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

Apri un browser su [http://localhost:3000](http://localhost:3000). 

Seleziona 'Geolocation' e poi seleziona 'Choose state file'.

Dalla finestra pop-up dell'esplora file, seleziona il file 'state.json'. 

La mappa mondiale dell'esploratore di nodi si popolerà con i dati del file. Vedi il readme [Qui](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) per maggiori dettagli sulle opzioni di utilizzo e sulle impostazioni.


----------------
CONSIGLI! 

Puoi impostare il crawler su una scansione a tempo semplicemente con il comando 'timeout', che emetterà uno specifico comando di terminazione dopo un determinato lasso di tempo. Esegui 'timeout --help' per maggiori informazioni.
Il seguente comando avvierà e arresterà automaticamente il crawler dopo 50 minuti.

>  Esegui il comando
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
CONSIGLI! 

Il 'latest.json' può essere richiamato e scritto direttamente in '/testdata' così da non doverlo copiare e incollare manualmente.

----------------
CONSIGLI! 

Le informazioni sugli indirizzi IP possono essere raccolte dall'output e poi usate per ri-inizializzare (reseed) il crawler all'avvio (--seed-addrs). Questo ridurrà il tempo necessario per condurre una scansione completa! 
