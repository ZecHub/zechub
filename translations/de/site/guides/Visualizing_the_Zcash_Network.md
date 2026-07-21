<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>


#  Visualisierung des Zcash-Netzwerks

Im Folgenden findest du eine Anleitung, wie du den Ziggurat 3.0 Crawler für Zcash sowie die zugehörigen Programme Crunchy und P2P-Viz unter Ubuntu 22.04 ausführst, um Informationen über das Zcash-Netzwerk zu sammeln und zu visualisieren.  
Das unten verlinkte Video folgt demselben Prozess.

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
## Anforderungen installieren: 

Rust -> [https://rustup.rs/](https://rustup.rs/)

## Optional:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(zur Anzeige von json-Informationen im Terminal)

curl -> [https://everything.curl.dev/get/linux](https://everything.curl.dev/get/linux)
(zur Abfrage der Crawler-RPC)

npm (mit nvm) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(zur Anzeige von P2P-Viz im Browser)

----------------


----------------
Ziggurat 3.0 Repository | [https://github.com/runziggurat](https://github.com/runziggurat)

Crawler-Repo | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Crunchy-Repo | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

P2P-Viz-Repo | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

Beginne damit, die normalen Updates anzuwenden.

>  Führe die folgenden Befehle aus:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Zcash-Netzwerk-Crawler

Der Zcash Crawler befindet sich in einem Ordner mit dem Namen 'zcash', daher kann es ratsam sein, vor dem Klonen des Crawlers (runziggurat/zcash-Repo) ein neues Verzeichnis zu erstellen.


>  Führe aus dem Verzeichnis /Home die folgenden Befehle aus:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

Navigiere im Browser zu 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

Oder öffne die Readme unter 
'/runziggurat/zcash/src/tools/crawler/README.md'

Diese Seite enthält Informationen zur spezifischen Nutzung. 

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

`--seed-addrs` \ `--dns-seed` ist das einzige erforderliche Argument und benötigt mindestens eine angegebene Adresse, damit es ausgeführt werden kann.



----------------

Der Befehl 'cargo run --release --features crawler --bin crawler -- --help' ist der eigentliche Startbefehl und gibt das gezeigte Hilfemenü aus.


>  Führe den Befehl aus
```bash
cargo run --release --features crawler --bin crawler -- --help
```


Dadurch wird das Programm kompiliert und sichergestellt, dass alles ordnungsgemäß funktioniert.

Um den Crawler auszuführen, muss dem Startbefehl ein Flag '--seed-addrs' hinzugefügt werden, das mindestens eine gültige Zcash-Node-IP-Adresse enthält. Der Crawler sollte eine angemessene Zeit lang laufen dürfen, um ein genaues Ergebnis zu erhalten. Einige Beispiel-IP-Adressen von Nodes findest du unter [https://zcashblockexplorer.com/nodes](https://zcashblockexplorer.com/nodes).

Um Informationen vom Crawler abzurufen, während er läuft, muss dem Startbefehl das Flag '--rpc-addr' hinzugefügt werden. Dies ist nicht erforderlich, um nur den Crawler selbst auszuführen, andernfalls muss der Crawler jedoch gestoppt werden (`ctrl+c` oder SIGKILL), um überhaupt irgendwelche Informationen anzeigen zu können.


>  Führe den Befehl aus
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

Der Crawler beginnt, mit dem Netzwerk zu kommunizieren (standardmäßig alle 20 Sekunden) und Netzwerkdaten zu sammeln. 
Informationen vom Crawler können angezeigt werden, indem du mit curl die Node abfragst (dafür ist jq zur Anzeige dieser Informationen erforderlich). 
Die Crawler-RPC-Adresse ist in diesem Beispiel auf '127.0.0.1:54321' gesetzt.


>  Führe in einem anderen Terminal den Befehl aus
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

Dadurch werden die aktuell gesammelten Daten zu '.protocol_version' angezeigt, die im Feld '.result' enthalten sind. Das Feld '.result' ist sehr groß, daher ist es sinnvoll, stattdessen gezielt bestimmte Teile davon abzurufen. Weitere nützliche Datentypen sind '.num_known_nodes', '.num_good_nodes', '.user_agents' usw. Siehe den Abschnitt Metrics [hier](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
Um Crunchy und P2P-Viz auszuführen, muss '.result' in eine `.json`-Datei umgeleitet werden. 


>  Führe den Befehl aus
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

Dadurch wird im aktuellen Verzeichnis eine Datei 'latest.json' erstellt. Diese Datei 'latest.json' wird mit Crunchy verwendet. 

An diesem Punkt kann der Crawler mit 'ctrl+c' gestoppt werden, falls keine weiteren Daten benötigt werden. Der Crawler gibt im Terminal einen Bericht mit nützlichen Informationen aus.


----------------

## Crunchy

Crunchy wird benötigt, um die ausgegebene json-Datei für die Verwendung mit P2P-Viz zu aggregieren.


Um Crunchy zu bauen, navigiere zu deinem Ordner '/runziggurat' 

>  Um das Crunchy-Repo zu klonen, führe die folgenden Befehle aus
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
Kopiere die Datei 'latest.json' und füge sie in den Ordner 'crunchy/testdata/' ein.

>  Führe die folgenden Befehle aus 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

Dadurch wird im Ordner 'crunchy/testdata/' eine auf Zcash-Nodes gefilterte Datei 'state.json' erstellt, die mit P2P-Viz verwendet werden kann.

----------------

## P2P-Viz

Um P2P-Viz zu bauen, ist npm erforderlich. 


>  Um npm mit nvm zu installieren, führe die folgenden Befehle aus:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Schließe das Terminal und starte es neu.


>  Führe den Befehl aus:
```bash
nvm install --lts
```

navigiere zu deinem Ordner '/runziggurat'


>  Um das P2P-Viz-Repo zu klonen und zu starten, führe die folgenden Befehle aus
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

Öffne einen Browser unter [http://localhost:3000](http://localhost:3000). 

Wähle 'Geolocation' und dann 'Choose state file'.

Wähle im Pop-up des Dateiexplorers die Datei 'state.json' aus. 

Die Weltkarte des Node-Explorers wird mit den Dateidaten gefüllt. Siehe die Readme [hier](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) für weitere Details zu Nutzungsoptionen und Einstellungen.


----------------
TIPPS! 

Du kannst den Crawler ganz einfach mit dem Befehl 'timeout' auf einen zeitgesteuerten Crawl setzen; dieser sendet nach einer festgelegten Zeit ein bestimmtes Kill-Signal. Führe 'timeout --help' für weitere Informationen aus.
Der folgende Befehl startet den Crawler und stoppt ihn nach 50 Minuten automatisch.

>  Führe den Befehl aus
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
TIPPS! 

Die Datei 'latest.json' kann direkt in '/testdata' abgerufen und geschrieben werden, sodass du sie nicht manuell kopieren und einfügen musst.

----------------
TIPPS! 

IP-Adressinformationen können aus der Ausgabe gesammelt und dann verwendet werden, um den Crawler beim Start erneut zu seeden (`--seed-addrs`). Dadurch verringert sich die Zeit, die für einen vollständigen Crawl benötigt wird!
