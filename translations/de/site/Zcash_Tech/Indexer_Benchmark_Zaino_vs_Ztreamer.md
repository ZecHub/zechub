# Indexer-Benchmark: Zaino vs. Ztreamer

Zaino und Ztreamer sind zwei Indexer, die das lightwallet-gRPC-Protokoll bereitstellen – die API, die Zcash Light Wallets zur Synchronisierung verwenden. Diese Seite fasst einen unabhängigen, reproduzierbaren Vergleich der beiden zusammen: ob sie dieselben Antworten liefern, wie lange sie zum Aufbau ihres Index benötigen und wie schnell sie Wallets bedienen.

## Kurzfassung

* Beide Indexer liefern korrekte Chain-Daten. Jede Antwort, die mit Zebra abgeglichen werden konnte, stimmte überein, sodass Wallets beide verwenden können.
* Die gefundenen Unterschiede betreffen Konventionen und Sonderfälle: Fehlercodes, die Byte-Reihenfolge eines Hashes, die Zählung einer duplizierten Adresse und einige JSON-RPC-Antwortformate.
* Ztreamer erstellt seinen Index auf derselben CPU etwa 6× schneller. Zaino beginnt nach 6 Sekunden mit Antworten, indem es Anfragen während des Aufbaus an Zebra weiterleitet.
* Ztreamer bedient in jedem gemessenen Szenario schneller: 13–17× mehr Blöcke pro Sekunde bei einem vollständigen Wallet-Download.
* Ein großer Teil der Latenz von Zaino stammt von einer fehlenden Socket-Einstellung (`TCP_NODELAY`), die vielen Anfragen etwa 40 ms hinzufügt. Die Behebung erfordert nur eine Zeile.

## Was verglichen wurde

| Build | Zugrunde liegender Knoten | Warum |
|:--|:--|:--|
| Zaino 0.10.1 | Zebra 6.4.2 (`direct`-Backend) | Neueste stabile Zaino-Version |
| Zaino 0.9.0 | Zebra 6.4.2 (`direct`-Backend) | Die in Ztreamers eigenem veröffentlichten Vergleich gemessene Version |
| Ztreamer v0.1.0 | Eingebetteter Zakura-Knoten | Neuester Ztreamer-Tag |
| Ztreamer master | Eingebetteter Zakura 1.5.1 | Was die Installationsanweisungen von Ztreamer erstellen |

Die beiden verwenden unterschiedliche Designs:

* **Zaino** läuft als separater Prozess neben einem [Zebra](Zebra_Full_Node.md)-Full-Knoten, liest den Zustand von Zebra und verwaltet einen eigenen Index. Es ist der Indexer im [Z3-Stack](Z3_Stack.md). Siehe [Zaino](Zaino.md).
* **Ztreamer** bettet einen [Zakura](Zakura_Node.md)-Knoten (einen Zebra-Fork) in denselben Prozess ein und verwaltet einen Compact-Block-Index.

## Wie gemessen wurde

* **Für alle dieselben Daten.** Jeder Build startete mit demselben Zcash Foundation-Testnet-Snapshot, eingefroren bei Höhe 4.382.897, sodass alle exakt dieselbe Chain indexierten.
* **Jeder kann es wiederholen.** Alles läuft auf kostenlosen, von GitHub gehosteten Runnern: Repository forken und einen Workflow ausführen.
* **Drei Durchläufe pro Build**, jeweils mit einem leeren Index. Der Server und der Lastgenerator liefen auf getrennten CPU-Kernen.
* **Kompatibilität:** alle 20 gRPC-Methoden des Lightwallet-Protokolls (274 Testfälle), Byte für Byte zwischen Builds verglichen und gegen das JSON-RPC von Zebra geprüft. Die 28 JSON-RPC-Methoden, die Zaino bereitstellt, wurden ebenfalls geprüft.
* **Leistung:** Zeit und Ressourcen zum Aufbau des Index, Latenz pro Anfrage, Durchsatz von Blockbereichen, 1 bis 128 gleichzeitige Clients sowie ein vollständiger Wallet-Download von der Aktivierung von Sapling bis zur Spitze.

## Ergebnisse

### Indexaufbau

Mediane aus drei Durchläufen:

| Build | Index vollständig | Erste Antwort | Indexgröße auf der Festplatte |
|:--|--:|--:|--:|
| Zaino 0.10.1 | 1.395 s | 6 s | 22,06 GiB |
| Zaino 0.9.0 | 1.211 s | 6 s | 22,06 GiB |
| Ztreamer v0.1.0 | 216 s | 210 s | 1,44 GiB |
| Ztreamer master | 159 s | 158 s | 1,44 GiB |

Zaino ist fast sofort nutzbar, da es Anfragen während des Aufbaus an Zebra weiterleitet. Ztreamer bedient keine Anfragen, bis sein Index vollständig ist. Auf demselben CPU-Modell benötigte Zaino 0.10.1 6–6,5× so lange wie Ztreamer v0.1.0 und verwendete 7,5–8× so viel CPU-Zeit (Zebra eingeschlossen).

### Bedienung

Mediane aus drei Durchläufen, sofern nicht anders angegeben in Blöcken pro Sekunde:

| Szenario | Zaino 0.10.1 | Ztreamer v0.1.0 |
|:--|--:|--:|
| Blockbereich von 1.000 Blöcken | 11.414 | 179.486 |
| Vollständiger Wallet-Download (280.000 → Spitze) | 11.124 | 189.041 |
| Blockbereich von 1.000 Blöcken, 128 Clients | 110.093 | 229.527 |
| Einzelner Block, 128 Clients (Anfragen/s) | 6.843 | 11.044 |

Bei 128 Clients verringert sich der Abstand auf etwa 2×, da beide Server auf zwei CPU-Kerne begrenzt waren.

### Die 40-ms-Untergrenze

Bei Zaino weisen sechs von zwölf RPCs eine mediane Latenz von etwa 40 ms auf, und jeder RPC hat ein 99. Perzentil von rund 41 ms. Die Ursache liegt in der Art, wie Zaino seinen gRPC-Listener einrichtet: Die Socket-Option `TCP_NODELAY` wird nie aktiviert, sodass das Betriebssystem kleine Antworten bis zu 40 ms zurückhält.

Das Aktivieren der Option von außen, ohne die Binärdatei von Zaino zu ändern, beseitigte die Untergrenze. Beispielsweise sank `GetTreeState` von 40,3 ms auf 0,75 ms (Ztreamer: 0,63 ms). Das Streaming umfangreicher Blöcke änderte sich nicht, sodass der oben gezeigte Durchsatzunterschied real ist.

### Kompatibilitätsunterschiede

* **Zaino 0.9.0** schließt transparente Daten standardmäßig in `GetBlock` ein, obwohl das Protokoll als Standard nur abgeschirmte Daten vorsieht. Dies wurde in 0.10.1 behoben.
* **`GetSubtreeRoots`:** Das Feld `completingBlockHash` verwendet bei den beiden Indexern entgegengesetzte Byte-Reihenfolgen. Aktuelle Wallets lesen dieses Feld nicht.
* **Fehlercodes:** Zaino gibt bei ungültiger Eingabe `INTERNAL` zurück; Ztreamer gibt `INVALID_ARGUMENT` oder `NOT_FOUND` zurück.
* **Duplizierte Adressen** in `GetTaddressBalanceStream` werden doppelt gezählt, außer bei Ztreamer master.
* **JSON-RPC:** Zainos `getrawtransaction` mit Verbosität 0 gibt im Gegensatz zu Zebra und zcashd ein Objekt statt eines Hex-Strings zurück.

## Einschränkungen

* **Nur Testnet.** Testnet-Blöcke sind kleiner als die des Mainnets, daher entsprechen absolute Zeiten und Größen nicht den Mainnet-Werten. Der Vergleich ist relativ und verwendet identische Eingaben.
* **Gemeinsam genutzte CI-Maschinen** mit mehreren CPU-Modellen. Der vollständige Bericht enthält Vergleiche auf derselben CPU für die zentralen Kennzahlen.
* **Nicht gemessen:** Reorgs, das Verfolgen einer Live-Chain-Spitze, Mempool-Last und TLS.

## Wo du mehr erfahren kannst

* Vollständiger Bericht: [zcash-indexer-bench/report/report.md](https://github.com/pearl-max468/zcash-indexer-bench/blob/main/report/report.md)
* Benchmark-Repository: [github.com/pearl-max468/zcash-indexer-bench](https://github.com/pearl-max468/zcash-indexer-bench)
* Rohdaten: [Release results-2026-10-10](https://github.com/pearl-max468/zcash-indexer-bench/releases/tag/results-2026-10-10)
* Zaino: [github.com/zingolabs/zaino](https://github.com/zingolabs/zaino)
* Ztreamer: [ztreamer.sh](https://ztreamer.sh)
