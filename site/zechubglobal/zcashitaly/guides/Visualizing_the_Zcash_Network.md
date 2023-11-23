# Visualizzazione della rete Zcash

Quella che segue è una guida su come eseguire Ziggurat 3.0 Crawler per Zcash e i programmi associati Crunchy e P2P-Viz su Ubuntu 22.04 per raccogliere e visualizzare le informazioni sulla rete Zcash.  
Il video collegato qui sotto segue lo stesso processo.

https://www.youtube.com/watch?v=Nq5cLiAHxPI

----------------
## Installare i requisiti: 

Rust [https://rustup.rs/](https://rustup.rs/)

## Opzionale:
jq [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(per visualizzare informazioni json nel terminale)

curl [https://everything.curl.dev/get/linux](https://everything.curl.dev/get/linux)
(per interrogare il crawler RPC)

npm (con nvm) [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(per visualizzare P2P-Viz nel browser)

----------------


----------------
Repository di Ziggurat 3.0
[https://github.com/runziggurat](https://github.com/runziggurat)

Repository di Crawler
[https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Repository Crunchy
[https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

Replica di P2P-Viz
[https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

Iniziare applicando i normali aggiornamenti.

> Eseguite i seguenti comandi:
```fish
sudo apt update
sudo apt upgrade
```

----------------

## Zcash Network Crawler

Zcash Crawler risiede all'interno di una cartella denominata "zcash", quindi è consigliabile creare una nuova directory prima di clonare il crawler (runziggurat/zcash repo).


> Dalla cartella /Home, eseguire i seguenti comandi:
``fish
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

Navigare nel browser su
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

Oppure aprire il readme in 
'/runziggurat/zcash/src/tools/crawler/README.md'

Questa pagina contiene informazioni sull'uso specifico. 

----------------


```fish
$ cargo run --release --features crawler --bin crawler -- --help

OPZIONI:
    -c, --crawl-interval <CRAWL_INTERVAL>
            L'intervallo del ciclo di crawling principale in secondi [valore predefinito: 5].

    -h, --help
            Stampa informazioni di aiuto

    -r, --rpc-addr <RPC_ADDR>
            Se presente, avvia un server RPC all'indirizzo specificato.

    -s, --seed-addrs <SEED_ADDRS>...
            Un elenco di indirizzi IP standalone iniziali e/o di server DNS a cui connettersi

    -n, --node-listening-port <NODE_LISTENING_PORT>
            Porta predefinita utilizzata per la connessione ai nodi [default: 8233].

    -V, --versione
            Stampa le informazioni sulla versione
```

`--seed-addrs` \ `--dns-seed` è l'unico argomento richiesto e necessita di almeno un indirizzo specificato per essere eseguito.



----------------

Il comando 'cargo run --release --features crawler --bin crawler -- --help' è il comando di esecuzione letterale e stamperà il menu di aiuto mostrato.


> Eseguire il comando
``fish
cargo run --release --features crawler --bin crawler -- --help
```


Ciò compilerà il programma e assicurerà che tutto funzioni correttamente.

Per eseguire il Crawler, è necessario aggiungere l'opzione '--seed-addrs' al comando di avvio, contenente almeno un indirizzo IP valido di un nodo Zcash. Il Crawler dovrebbe essere eseguito per un periodo di tempo ragionevole per ottenere un risultato accurato. Alcuni esempi di indirizzi IP dei nodi possono essere trovati su [https://zcashblockexplorer.com/nodes](https://zcashblockexplorer.com/nodes).

Per ottenere informazioni dal Crawler mentre è in esecuzione, è necessario aggiungere l'opzione '--rpc-addr' al comando di avvio. Questo non è necessario solo per eseguire il Crawler stesso, ma altrimenti richiederebbe di interrompere il Crawler (ctrl+c o SIGKILL) per visualizzare qualsiasi informazione.


> Eseguire il comando
``fish
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

Il Crawler inizierà a comunicare con la rete (default ogni 20 secondi) e a raccogliere dati sulla rete. Le informazioni dal Crawler possono essere visualizzate utilizzando curl per interrogare il nodo (questo richiede jq per visualizzare tali informazioni). L'indirizzo RPC del Crawler in questo esempio è impostato su '127.0.0.1:54321'


> In un altro terminale, eseguire il comando
```fish
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

Questo mostrerà i dati correnti delle '.protocol_version' raccolte contenute nel campo '.result'. Il campo '.result' è molto grande, quindi è utile richiamarne solo alcune parti. Altri tipi di dati utili sono '.num_known_nodes', '.num_good_nodes', '.user_agents' ecc. Vedi la sezione delle metriche [Qui](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
Per eseguire Crunchy e P2P-Viz, è necessario inserire il '.result' in un file .json. 


> Eseguire il comando
```fish
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

Questo creerà un file "latest.json" nella cartella corrente, che verrà utilizzato con Crunchy.

A questo punto, Crawler può essere fermato con "ctrl+c" se non sono necessari altri dati. Crawler invierà al terminale un rapporto con le informazioni utili.


----------------

## Crunchy

Crunchy è necessario per aggregare il file json di output da usare con P2P-Viz.


Per creare Crunchy, navigare nella cartella '/runziggurat'. 

> Per clonare il repo di Crunchy, eseguire i seguenti comandi
``Pesce
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
Copiare e incollare il file 'latest.json' nella cartella 'crunchy/testdata/'.

> Eseguire i seguenti comandi
```fish
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

Questo creerà un file "state.json" filtrato per i nodi Zcash nella cartella "crunchy/testdata/" da usare con P2P-Viz.

----------------

## P2P-Viz

Per compilare P2P-Viz, è necessario avere npm.


> Per installare npm con nvm, eseguire i seguenti comandi:
``fish
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Chiudere e riavviare il terminale.


> Eseguire il comando:
``fish
nvm install --lts
```

Navigare nella cartella '/runziggurat'.


> Per clonare il repo P2P-Viz e avviarlo, eseguite i seguenti comandi
```fish
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------


Aprire un browser all'indirizzo [http://localhost:3000](http://localhost:3000). 

Selezionare "Geolocation" e poi "Choose state file".

Dall'apertura del file explorer, seleziona il file "state.json". 

La mappa del mondo dell'esploratore di nodi si popolerà con i dati del file. Per ulteriori dettagli sulle opzioni di utilizzo e sulle impostazioni, consultare il file Readme [Qui] (https://github.com/runziggurat/p2p-viz#build-and-run-the-app).


----------------
SUGGERIMENTI! 

È possibile impostare Crawler su una ricerca a tempo semplicemente con il comando "timeout", che emetterà un comando di arresto specifico dopo un determinato periodo di tempo. Eseguire 'timeout --help' per maggiori informazioni.
Il comando seguente avvia e arresta automaticamente il crawler dopo 50 minuti.

> Eseguire il comando
```fish
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
SUGGERIMENTI! 

Il file 'latest.json' può essere richiamato e scritto in '/testdata', in modo da non doverlo copiare e incollare manualmente.

----------------
SUGGERIMENTI! 

Le informazioni sugli indirizzi IP possono essere raccolte dall'output e quindi utilizzate per riseminare Crawler all'avvio (--seed-addrs). Questo ridurrà il tempo necessario per condurre un crawling completo!