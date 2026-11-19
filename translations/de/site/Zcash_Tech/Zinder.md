# Zinder-Indexer

Zinder ist ein selbst gehosteter Zcash-Indexer, der in Rust geschrieben und vom Zcash Foundation veröffentlicht wird. Er liest die Chain einmal von einem vollständigen Zebra- oder Zakura-Knoten ein, speichert eine konsistente Ansicht davon und stellt diese mehreren Wallets, Anwendungen und Explorern gleichzeitig zur Verfügung. Bestehende Light-Wallets können über einen mit lightwalletd kompatiblen Adapter darauf zugreifen.

> **Zinder ist Alpha-Software.** In der README steht, dass sich die native API, die lightwalletd-Kompatibilitätsschnittstelle, die Speicherformate und die Bereitstellungstopologie ändern werden und dass ein getaggtes Release keine Stabilitätszusage ist. Verwendet exakt festgelegte Versionen und rechnet mit inkompatiblen Upgrades.

## TL;DR

* **Zebra** oder **Zakura** validiert die Chain. **Zinder** indexiert die Daten des Knotens und stellt sie Clients bereit.
* Zwei Zugriffsmöglichkeiten: die eigene `WalletQuery`-gRPC-API von Zinder und ein separater Adapter, der das `CompactTxStreamer`-Protokoll von lightwalletd spricht. So können Wallets für lightwalletd darauf zugreifen, ohne dass Codeänderungen nötig sind.
* Jeder Lesevorgang ist an einen Chain-Zustand (eine „Epoch“) gebunden. Dadurch vermischt ein Sync-Batch niemals Daten von zwei konkurrierenden Chain-Spitzen. Die Schlüssel und das Shielded-Scanning bleiben im Wallet.
* Das System ist für einen Betreiber ausgelegt, der einen Knoten betreibt und viele Verbraucher bedient. Öffentliche Endpunkte sollten hinter einer eigenen TLS-Absicherung, Authentifizierung und Ratenbegrenzung liegen.
* Releases erscheinen schnell (von 0.7.0 bis 0.12.0 zwischen dem 10. und 14. November 2026), und mehrere davon waren inkompatibel. Lest vor jedem Upgrade das Änderungsprotokoll.

## Wo Zinder einzuordnen ist

Light-Wallets kommunizieren nie direkt mit einem vollständigen Knoten. Sie fragen einen Indexer nach kompakten Blöcken, Baumzuständen und Transaktionsdaten (siehe [Lightwallet-Knoten](/zcash-tech/lightwallet-nodes)). Im Zcash-Ökosystem gibt es inzwischen mehrere Indexer, die das übernehmen können:

| Indexer | Sprache | Maintainer | Kommuniziert mit | Hinweise |
|:--|:--|:--|:--|:--|
| lightwalletd | Go | ECC / Community von Zcash | Zebra oder zcashd | Der ursprüngliche Light-Wallet-Server |
| [Zaino](/zcash-tech/zaino) | Rust | Zingo Labs | Zebra oder zcashd | Optionales Indexer-Profil im Z3-Stack |
| [Ztreamer](https://github.com/zcashlabs/ztreamer) | Rust | zcashlabs | Eingebetteter Zakura-Knoten | Siehe den Benchmark [Zaino vs. Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer) |
| **Zinder** | Rust | Zcash Foundation | Zebra 7.0.0 oder Zakura 1.8.6 (Archiv-Knoten) | Alpha. Native API sowie ein lightwalletd-Adapter und optionale Explorer-Abfragen |

In der Dokumentation von Zinder wird klar beschrieben, wann es die richtige Wahl ist: Seine Stärken kommen zum Tragen, wenn der Chain-Zugriff unabhängig von einem einzelnen Wallet-Prozess bestehen, mehrere voneinander unabhängige Verbraucher bedienen oder von einem bestimmten Wallet-Code getrennt bleiben soll. Für ein einzelnes, eng gekoppeltes Wallet kann ein eingebetteter Indexer einfacher sein. Verbraucher, die nur Daten benötigen, über die der Knoten bereits verfügt, können direkt die RPC-Schnittstelle von Zebra nutzen.

## Aufbau

Zinder verteilt die Arbeit auf separate Prozesse, die jeweils eine Aufgabe haben:

| Laufzeit | Rolle |
|:--|:--|
| `zinder-ingest` | Einziger Schreibprozess für den kanonischen Chain-Speicher (RocksDB). Folgt dem Knoten, verarbeitet Reorgs und hält den aktuellen Mempool-Zustand vor |
| `zinder-projector` | Einziger Schreibprozess für den Wallet-Speicher. Erstellt und verfolgt die auf das Wallet zugeschnittene Ansicht der Chain |
| `zinder-query` | Stellt die native `WalletQuery`-gRPC-API bereit |
| `zinder-compat-lightwalletd` | Stellt die `CompactTxStreamer`-API von lightwalletd auf Basis derselben Daten bereit |

Eine optionale Explorer-Ebene (`zinder-explorer` mit `ExplorerQuery`) stellt Blockzusammenfassungen, Transaktionsdetails, Mempool-Ansichten und Suchfunktionen bereit. Ein optionaler Adapter stellt die REST- und WebSocket-API des Explorers CipherScan bereit. Keiner von beiden ist Teil der Release-Images.

Jede Laufzeit stellt `/healthz`, `/readyz` und `/metrics` bereit. Die Leseprozesse melden erst dann Bereitschaft, wenn ihre Kopien des Chain- und Wallet-Speichers exakt auf denselben Chain-Zustand verweisen.

## Verbindungsmöglichkeiten

* **Bestehende Light-Wallets** behalten ihre lightwalletd-Integration bei und richten sie auf `zinder-compat-lightwalletd` aus. Die Dokumentation von Zinder unterscheidet zwischen Protokollkompatibilität und Support: Ein Wallet gilt erst dann als unterstützt, wenn sein aktuelles Release die End-to-End-Zertifizierung besteht. In Release 0.10.0 wurde das Versionsfeld des `GetLightdInfo`-Protokolls korrigiert, sodass Zingo synchronisieren kann.
* **Native Clients** rufen `zinder-query` für gebundene Lesevorgänge, kompakte Blöcke, Chain- und Mempool-Ereignisstreams sowie Broadcast-Ergebnisse mit typisierten Ablehnungsgründen auf.
* **Rust-Anwendungen** verwenden den `zinder-client`-Crate, ein SDK mit Remote-Verbindungen als Standard, das sich mit `zinder-query` verbindet, ohne den Speicher-Stack einzubinden.
* **Explorer und Backends** kombinieren die Wallet-Abfragen mit der optionalen `ExplorerQuery`-Ebene.

## Betrieb

Die Kurzanleitung des Upstream-Projekts startet einen Knoten mit dem [Z3-Stack](/zcash-tech/z3-stack) und führt anschließend Zinder mit Docker Compose aus dem Checkout von Zinder aus:

```bash
# In the Z3 checkout
Z3_NETWORK=testnet docker compose up -d

# In the Zinder checkout
docker compose --env-file deploy/.env.testnet \
  -f deploy/docker-compose.yml up -d --build
```

Daneben liegen Env-Dateien für Mainnet und für einen Zakura-Knoten (`deploy/.env.zakura-mainnet`, `deploy/.env.zakura-testnet`). Seit Version 0.11.0 setzt die Compose-Datei Z3 nicht mehr voraus: In der Env-Datei müssen das Netzwerk des Knotens, das Cookie-Volume und die RPC-Adresse angegeben werden.

Standard-Host-Ports (bei Testnet kommt 10000 hinzu):

| Dienst | Mainnet | Testnet |
|:--|:--|:--|
| Native `WalletQuery`-gRPC | 9102 | 19102 |
| Mit lightwalletd kompatibles gRPC | 9067 | 19067 |
| Bereitschaft: Ingest / Projektor / Abfrage / Kompatibilität | 9105 / 9110 / 9106 / 9107 | 19105 / 19110 / 19106 / 19107 |

Beide Wallet-Ports sind an Loopback gebunden. Prüft sie mit:

```bash
grpcurl -plaintext -d '{}' 127.0.0.1:19102 zinder.v1.wallet.WalletQuery/ServerInfo
grpcurl -plaintext -d '{}' 127.0.0.1:19067 cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo
```

Weitere Bereitstellungsmöglichkeiten:

* **Release-Images** auf `ghcr.io/zcashfoundation/`: die vier Laufzeiten sowie `zinder-wallet-serving` (Ingest, Projektor und native Abfrage in einem Container für Hosts, die ein Volume an einen einzelnen Container anhängen können; ohne lightwalletd-Adapter) und `zinder-canonical-runtime` (nur Ingest).
* **Linux-Binärdateien** für x86-64 (erfordert eine x86-64-v3-CPU) und AArch64, mit glibc 2.34 oder neuer. Debian 12 ist die zertifizierte Basis. Jedes Release enthält eine SBOM- und eine signierte SLSA-Herkunftsbestätigung.

### Anforderungen an den Knoten

* Ein **Archiv-Knoten**. Seit Version 0.11.0 startet `zinder-ingest` nicht mehr mit einem beschnittenen Knoten.
* Zebra **7.0.0** oder Zakura **1.8.6**. Für diese beiden Knotenversionen sind die Release-Zweige zertifiziert.
* Für das `zinder-wallet-serving`-Image ist der **Indexer-gRPC-Endpunkt** des Knotens erforderlich (`ZINDER_NODE__INDEXER_GRPC_ADDR`, `indexer_listen_addr` von Zebra, Port 8155 auf Mainnet). Für einen Zakura-Indexer auf einer Nicht-Loopback-Adresse ist gegenseitiges TLS erforderlich. Zinder unterstützt dies seit Version 0.11.0.

### Dimensionierung für Mainnet

Laut dem Runbook für den Wallet-Betrieb:

* Mindestens **8 GB Arbeitsspeicher**. Gemessene Spitzenwerte: Ingest etwa 2,6 GiB, Projektor beim Erstellen etwa 2,7 GiB, Abfrage bis zu etwa 1,4 GiB.
* Beim Aufbau des Mainnet-Wallet-Speichers etwa **130 GB freien Speicherplatz** auf dem Volume vorhalten.
* Ein gemessener Mainnet-Aufbau ab dem Genesis-Block dauerte etwa **vier Stunden** für den Chain-Speicher (Staging-Bereich knapp 310 GB) und **mehr als zwei Stunden** für den Wallet-Speicher. Die mitgelieferten Zeitlimits für den Aufbau reichen nur für Testnet: Erhöht sie für Mainnet auf mindestens 24 h und 12 h. Andernfalls startet der Aufbau immer wieder neu und wird nie abgeschlossen.

## Wichtige Hinweise zu Releases

| Version | Datum | Änderungen für Betreiber |
|:--|:--|:--|
| 0.7.0 | 2026-11-10 | Standardfenster für Reorgs auf 1000 Blöcke erhöht, die Tiefe, bei der Zebra 7 und Zakura Blöcke finalisieren. Nicht umkehrbar: Ältere Releases können die vergrößerten Speicher nicht öffnen |
| 0.9.0 | 2026-11-12 | Neue `zinder-wallet-serving`- und `zinder-canonical-runtime`-Images |
| 0.10.0 | 2026-11-13 | **Erstes Release, das NU7-Blöcke dekodiert.** Version 0.9.0 und frühere Releases stoppen beim ersten NU7-Block. Native Protokollrevision 8: Ingest und Abfrage gemeinsam aktualisieren, ebenso die nativen Clients |
| 0.11.1 | 2026-11-14 | Zakura 1.8.6 zusätzlich zu Zebra 7.0.0 zertifiziert; gegenseitiges TLS zum Indexer des Knotens; beschnittene Knoten werden abgewiesen. Version 0.11.0 wurde nur als Crates veröffentlicht, daher 0.11.1 bereitstellen |
| 0.12.0 | 2026-11-14 | Korrekturen bei Bereitschaft und beim Herunterfahren; Explorer-Wiedergabe schneller und wird bei knappem Speicherplatz angehalten |

## Häufige Fehler

**Das System für produktionsreif halten.** Das Projekt bezeichnet sich selbst als Alpha-Software. Eine erfolgreiche lokale Compose-Bereitstellung ist laut eigener Aussage „für sich genommen keine Produktionszertifizierung“.

**Auf einen beschnittenen Knoten verweisen.** Ingest wird beim Start beendet. Verwendet einen Archiv-Zebra- oder Zakura-Knoten.

**Die gRPC-Ports direkt öffentlich zugänglich machen.** Beide Wallet-Ports sind aus gutem Grund an Loopback gebunden. Schaltet TLS, Authentifizierung, Ratenbegrenzungen und Kontingente über einen von euch kontrollierten Proxy vor, bevor ihr die Ports für das Internet öffnet.

**Die Laufzeiten einzeln aktualisieren.** Mehrere Releases ändern die native Protokollrevision oder das Speicherformat. Aktualisiert die Zinder-Dienste gemeinsam und stellt native Clients beim selben Umstellungszeitpunkt um.

**Annehmen, ein Wallet werde unterstützt, nur weil das Protokoll unterstützt wird.** Der lightwalletd-Adapter spricht das Protokoll, aber Zinder erklärt ein bestimmtes Wallet erst dann für unterstützt, wenn dessen aktuelles Release durchgängig zertifiziert wurde.

## Verwandte Seiten

* [Lightwallet-Knoten](/zcash-tech/lightwallet-nodes) — Aufgaben eines Light-Wallet-Servers und welche Daten er sehen kann
* [Zaino](/zcash-tech/zaino) — Rust-Indexer von Zingo Labs
* [Indexer-Benchmark: Zaino vs. Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer)
* [Z3-Stack](/zcash-tech/z3-stack) — Zebra + Zallet, die Knotenkonfiguration aus der Kurzanleitung von Zinder
* [Zebra-Vollknoten](/zcash-tech/zebra-full-node) und [Zakura-Knoten](/zcash-tech/zakura-node) — die beiden Knoten, für die Zinder zertifiziert ist

## Wo erfahre ich mehr?

* [Zinder-Repository](https://github.com/ZcashFoundation/zinder) von GitHub
* [Zinder-Releases](https://github.com/ZcashFoundation/zinder/releases) und [Änderungsprotokoll](https://github.com/ZcashFoundation/zinder/blob/main/CHANGELOG.md)
* [Was Zinder ist und was nicht](https://github.com/ZcashFoundation/zinder/blob/main/docs/architecture/indexer-wallet-boundary.md)
* [Bereitstellung auf einer VM](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-on-a-vm.md) und Runbooks für [-Images zur Bereitstellung von Wallets](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-wallet-serving.md)

**Zuletzt aktualisiert:** November 2026
