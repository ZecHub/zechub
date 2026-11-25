<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zaino.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Zaino Indexer

## Kurzfassung

* **Zebra** validiert die Zcash-Chain.
* **Zaino** indexiert die Chain-Daten von Zebra und stellt APIs für Clients bereit.
* **Zallet** ist die Wallet-Komponente im Z3-Stack. In der Standardkonfiguration von Z3 greift Zallet direkt auf Zebra zu und benötigt den eigenständigen Dienst Zaino nicht.
* Der eigenständige Dienst Zaino ist nützlich, wenn Betreiber einen mit lightwalletd kompatiblen gRPC-Endpunkt, einen JSON-RPC-Proxy oder Infrastruktur für Light Wallets, Explorer, Faucets und ähnliche Dienste benötigen.
* Zaino ist aktive Infrastruktur. Betreiber sollten jedoch vor dem Einsatz in der Produktion die offiziellen Zaino- und Z3-Dokumentationen auf aktuelle Bereitstellungsdetails prüfen.

## Grundlegende Erklärung

Zaino ist ein Rust-Indexer für die Zcash-Blockchain. Er liest Chain-Daten von einem vollständigen Zebra-Knoten. Er stellt die Daten bereit, die Wallets, Explorer, Faucets und andere Dienste benötigen, ohne Zebra für jeden clientseitigen Index verantwortlich zu machen.

### Was Zaino macht

Zaino befindet sich zwischen Zebra und der Client-Software. Zebra ist der Konsens-Knoten: Er lädt die Zcash-Blockchain herunter, überprüft sie und folgt ihr. Zaino nutzt Zebra als Quelle für Chain-Daten und bereitet daraus indexierte Ansichten vor, die Client-Anwendungen effizient abfragen können.

Durch diese Trennung bleiben die Aufgaben klar:

| Komponente | Aufgabe |
|:--|:--|
| Zebra | Vollständiger Knoten und Validator |
| Zaino | Indexer und API-Dienst für Clients |
| Zallet | Wallet-Dienst |
| lightwalletd | Älterer Light-Wallet-Server, den Zaino ersetzen oder ergänzen soll |

Zaino stellt Funktionen für Light-Clients, vollständige Clients oder Wallets sowie Block-Explorer bereit. Es ermöglicht den Zugriff auf die finalisierte Chain, die nicht finalisierte beste Chain und die von Zebra gehaltenen Mempool-Daten.

### Einordnung in den aktuellen Zcash Stack

Der aktuelle Z3-Stack basiert auf Zebra, Zallet und dem optionalen Zaino.

In der Standardbereitstellung von Z3 laufen Zebra und Zallet zusammen. Zallet greift direkt auf Zebra zu. Wer also nur einen lokalen Wallet-Stack betreibt, muss den eigenständigen Dienst Zaino nicht starten.

Zaino kommt hinzu, wenn der Betreiber externe Clients bedienen möchte. In Z3 läuft es hinter dem Compose-Profil `indexer` und ergänzt:

* einen mit lightwalletd kompatiblen gRPC-Endpunkt für Light-Wallet-Clients
* einen JSON-RPC-Proxy für Explorer, Faucets und Service-Backends
* eine vom Chain-Zustand von Zebra getrennte Indexer-Datenbank

Damit ist Zaino besonders relevant für Wallet-Backends, Betreiber öffentlicher Infrastruktur, Explorer, Faucets und Entwickler, die Dienste mit indexierten Zcash-Chain-Daten testen.

### Zaino und lightwalletd

lightwalletd ist der ursprüngliche Light-Wallet-Server. Zaino ist der auf Rust basierende Nachfolger für diese Aufgabe. Ziel ist es, nach Möglichkeit kompatible APIs bereitzustellen, damit Wallets und Dienste migrieren können, ohne sofort vollständig neu geschrieben werden zu müssen.

Das bedeutet nicht, dass jede lightwalletd-Bereitstellung bereits auf Zaino umgestellt wurde. Betreiber sollten Zaino als Teil des aktuellen Zebra-basierten Stacks betrachten und vor der Entscheidung, was sie einsetzen, die aktuelle Projektdokumentation, Releases und Service-Dashboards prüfen.

## Veranschaulichung / Analogie

Stell dir die Zcash-Blockchain als ein riesiges Archiv voller Seiten eines Kontobuchs vor.

Zebra ist der Archivar. Er nimmt jede neue Seite entgegen, prüft, ob sie den Regeln entspricht, und legt sie am richtigen Ort ab.

Zaino ist die Auskunftsstelle vor dem Archiv. Sie liest, was Zebra abgelegt hat, erstellt Kataloge für schnelle Suchvorgänge und beantwortet Fragen von Besuchern zügig. Light Wallets, Explorer und Faucets wenden sich mit Fragen wie „Was steht in diesem Block?“ oder „Welche Transaktionen warten im Mempool?“ an diese Stelle. Die Auskunftsstelle entscheidet niemals, welche Seiten echt sind. Das ist Aufgabe des Archivars.

Zallet arbeitet in der Standardkonfiguration von Z3 im selben Gebäude und geht direkt zum Archivar. Die Auskunftsstelle braucht es nicht.

### Einige Diagramme zur Funktionsweise von Zaino

#### Interne Architektur von Zaino

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

#### Live-Service-Architektur von Zaino

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

#### Systemarchitektur von Zaino

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Ausführlicher Überblick

### Hinweise für Betreiber

Der einfachste maßgebliche Weg zur Bereitstellung führt über das Z3-Repository. Z3 enthält Zaino als optionalen Dienst:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Führe zuerst die normale Z3-Einrichtung durch und warte, bis Zebra synchronisiert ist, bevor du abhängige Dienste im Mainnet oder Testnet startest.

Zaino stellt zwei Arten von Netzwerkdiensten bereit. Der gRPC-Dienst ist die API für Light Wallets. Der JSON-RPC-Dienst ist für den Loopback-Zugriff oder vertrauenswürdige private Netzwerke vorgesehen, sofern keine zusätzliche Schutzschicht vorhanden ist. Stelle keinen unauthentifizierten oder unverschlüsselten JSON-RPC-Endpunkt öffentlich ins Internet.

## Häufige Fehler

**Zaino für einen vollständigen Knoten halten.** Zaino ist nicht der Validator. Zebra validiert die Chain; Zaino indexiert Daten von Zebra.

**Annehmen, dass jede Z3-Bereitstellung den eigenständigen Dienst Zaino benötigt.** Zallet kann im Standard-Z3-Stack direkt auf Zebra zugreifen. Starte Zaino, wenn du den eigenständigen Indexer-Dienst für externe Clients benötigst.

**Geplante Funktionen als bereits bereitgestellt darstellen.** Zaino wird aktiv weiterentwickelt. Prüfe daher vor der Aussage, eine Funktion sei verfügbar, die aktuellen Release-Hinweise und Dokumentationen.

**JSON-RPC unbedacht öffentlich zugänglich machen.** Die JSON-RPC-Schnittstelle von Zaino ist für den Loopback-Zugriff oder vertrauenswürdige private Netzwerke vorgesehen, sofern sie nicht durch eine andere Schutzschicht abgesichert ist.

## Verwandte Seiten

- [Lightwallet-Knoten](/zcash-tech/lightwallet-nodes): die Server, mit denen sich Light Wallets verbinden, lightwalletd und Zaino sowie das Wechseln zwischen ihnen.
- [Zinder](/zcash-tech/zinder), ein weiterer Rust-Indexer, aus dem Zcash Foundation (Alpha)
- [Zebra Vollständiger Knoten](/zcash-tech/zebra-full-node): der Knoten, von dem Zaino seine Chain-Daten bezieht.
- [Zallet](/zcash-tech/zallet): die Wallet für vollständige Knoten im Z3-Stack.
- [Z3-Stack](/zcash-tech/z3-stack): Zebra, Zallet und der optionale Zaino-Indexer als gemeinsames Paket.
- [Indexer-Benchmark: Zaino vs. Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer): ein reproduzierbarer Vergleich zweier Light-Wallet-Indexer.
- [Vollständige Knoten](/zcash-tech/full-nodes): ein Überblick über die Software für vollständige Zcash-Knoten.
- [ZcashSynchronisierung von Wallets](/zcash-tech/zcash-wallet-syncing): warum abgeschirmte Wallets überhaupt einen Synchronisierungsprozess benötigen.

### Ressourcen

* [Zaino GitHub-Repository](https://github.com/zingolabs/zaino)
* [Zaino-Releases](https://github.com/zingolabs/zaino/releases)
* [Zaino generierte Dokumentation](https://zingolabs.github.io/zaino/)
* [Z3-Bereitstellungs-Repository](https://github.com/ZcashFoundation/z3)
* [Zebra-Dokumentation](https://zebra.zfnd.org/)
* [Zaino Diskussion zu Grants und Projekten](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Zuletzt aktualisiert:** November 2026
