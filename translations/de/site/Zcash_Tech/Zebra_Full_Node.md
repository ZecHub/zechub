<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Zebra Vollständiger Knoten

## TL;DR

- Zebra (`zebrad`) ist der in Rust geschriebene und von der Zcash Foundation gepflegte vollständige Zcash-Knoten.
- Er validiert Blöcke und Transaktionen, verwaltet den Chain-Zustand und kommuniziert über das Peer-to-Peer-Netzwerk mit anderen Knoten.
- Zebra und zcashd implementierten dasselbe Protokoll und konnten interoperieren. Seit der Stilllegung von zcashd übernimmt Zebra die Konsensrolle.
- Zwei Möglichkeiten zum Betrieb: das `zfnd/zebra`-Docker-Image oder ein Build aus dem Quellcode.
- Die empfohlene Hardware umfasst 4 CPU-Kerne, 16 GB RAM und 300 GB Festplattenspeicher. Das Minimum sind 2 Kerne und 4 GB RAM bei denselben 300 GB Festplattenspeicher.

## Kernerklärung

Zebra ist der erste vollständig in Rust geschriebene Zcash-Knoten. Er befindet sich im Zcash-Peer-to-Peer-Netzwerk, wo er Transaktionen validiert und verbreitet sowie den Blockchain-Zustand verwaltet. Eine zweite unabhängige Implementierung macht die Netzwerkinfrastruktur weniger abhängig von einer einzelnen Codebasis.

### Zebra und zcashd

Der ursprüngliche Zcash-Knoten, zcashd, wurde von der Electric Coin Company auf Grundlage der Bitcoin-Codebasis entwickelt. Zebra wurde von Grund auf in Rust geschrieben, einer speichersicheren Sprache, mit Fokus auf Sicherheit und Effizienz.

Beide Implementierungen folgen demselben Protokoll und konnten daher kommunizieren und interoperieren. zcashd erreichte am 18. Juli 2026 seinen End-of-Support-Stopp und startet nicht mehr, wodurch Zebra und Zakura die verwendeten Knotenimplementierungen sind. Siehe [Vollständige Knoten](/zcash-tech/full-nodes) für das Gesamtbild.

## Zebra ausführen

Du kannst Zebra mit dem Docker-Image ausführen oder es manuell bauen. Bitte beachte den Abschnitt zu den Systemanforderungen.

### Docker-Nutzung

Um die neueste Version auszuführen und sie mit der Spitze zu synchronisieren, führe den folgenden Befehl aus:

```

docker run zfnd/zebra:latest

```

Eine vollständige Anleitung findest du in der [Docker-Dokumentation](https://zebra.zfnd.org/user/docker.html).

### Zebra bauen

Zum Bauen von Zebra werden Rust, libclang und ein C++-Compiler benötigt.

- Stelle sicher, dass du die neueste stabile Rust-Version installiert hast, da Zebra ausschließlich damit getestet wird.
- Zu den notwendigen Build-Abhängigkeiten gehören:
  - libclang (auch bekannt als libclang-dev oder llvm-dev)
  - clang oder ein anderer C++-Compiler (wie g++ für alle Plattformen oder Xcode für macOS)
  - protoc (Protocol-Buffers-Compiler) mit dem Flag *--experimental_allow_proto3_optional*, das in Protocol Buffers v3.12.0 eingeführt wurde (veröffentlicht am 16. Mai 2020).

### Installieren und starten

Unter x86_64- oder aarch64-Linux mit glibc 2.34 oder neuer (Ubuntu 22.04+, Debian 12+, RHEL 9+, Amazon Linux 2023) kannst du die Build-Abhängigkeiten überspringen und eine signierte vorkompilierte Binärdatei installieren:

```
cargo binstall zebrad
```

Dieselben Binärdateien sind jeder GitHub-Version als `zebrad-<version>-<target>.tar.gz` beigefügt, jeweils mit einer SHA-256-Prüfsumme, einer Sigstore-Build-Provenance-Attestierung und einer Cosign-Signatur. Verwende auf älteren Plattformen das Docker-Image oder baue aus dem Quellcode.

Um aus dem Quellcode zu bauen, hole den Code und erstelle die Release-Binärdatei:

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo build --release --bin zebrad
```

Starte den Knoten mit:

```
target/release/zebrad start
```

Installationsanleitung: [zebra.zfnd.org/user/install.html](https://zebra.zfnd.org/user/install.html)

## Optionale Konfigurationen und Funktionen

### Konfigurationsdatei initialisieren

  - Erzeuge mit folgendem Befehl eine Konfigurationsdatei:

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

  - Die erzeugte *zebrad.toml* wird im Standard-Einstellungsverzeichnis von Linux abgelegt. Informationen zu den Standardpfaden anderer Betriebssysteme findest du in der Dokumentation.

### Fortschrittsbalken konfigurieren

  - Konfiguriere *tracing.progress_bar* in deiner *zebrad.toml*, um wichtige Metriken mithilfe von Fortschrittsbalken im Terminal anzuzeigen. Hinweis: Es gibt ein bekanntes Problem, bei dem Schätzungen der Fortschrittsbalken extrem groß werden können.

### Mining konfigurieren

  - Zebra kann für Mining konfiguriert werden, indem in Docker eine *MINER_ADDRESS* und eine Portzuordnung angegeben werden. Weitere Details findest du in der [Dokumentation zur Mining-Unterstützung](https://zebra.zfnd.org/user/mining-docker.html).

### Benutzerdefinierte Build-Funktionen

  - Erweitere die Funktionalität von Zebra mit zusätzlichen Cargo-Features wie Prometheus-Metriken, Sentry-Monitoring, experimenteller Elasticsearch-Unterstützung und mehr.

  - Kombiniere mehrere Features, indem du sie bei der Installation als Parameter des Flags `--features` aufführst.

  - Einige Debugging- und Monitoring-Features sind in Release-Builds deaktiviert, um die Leistung zu optimieren. Die vollständige Liste experimenteller und Entwickler-Features findest du in der [API-Dokumentation](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).

## Systemanforderungen und Netzwerkkonfiguration

### Empfohlene Anforderungen

- CPU: 4 CPU-Kerne
- RAM: 16 GB
- Festplattenspeicher: 300 GB verfügbarer Festplattenspeicher zum Kompilieren von Binärdateien und Speichern des zwischengespeicherten Chain-Zustands
- Netzwerk: 100-Mbps-Netzwerkverbindung mit mindestens 300 GB Uploads und Downloads pro Monat

### Mindestanforderungen

- CPU: 2 CPU-Kerne
- RAM: 4 GB
- Festplattenspeicher: 300 GB verfügbarer Festplattenspeicher

Die Testsuite von Zebra kann je nach Spezifikation deines Rechners mehr als eine Stunde benötigen. Langsamere Systeme können Zebra kompilieren und ausführen. Die genauen Leistungsgrenzen wurden nicht durch Tests bestimmt.

### Festplattenanforderungen

- Zebra verwendet ungefähr 300 GB für zwischengespeicherte Mainnet-Daten und 10 GB für zwischengespeicherte Testnet-Daten. Der Festplattenverbrauch wird voraussichtlich mit der Zeit zunehmen.
- Die Datenbank wird regelmäßig sowie beim Herunterfahren oder Neustarten bereinigt. Änderungen werden mithilfe von Datenbanktransaktionen festgeschrieben. Unvollständige Änderungen durch erzwungenes Beenden oder eine Panic werden beim nächsten Start von Zebra zurückgesetzt.

### Netzwerkanforderungen und Ports

- Zebra verwendet die folgenden TCP-Ports für eingehende und ausgehende Verbindungen:
  - 8233 für Mainnet
  - 18233 für Testnet
- Die Konfiguration von Zebra mit einer bestimmten listen_addr kündigt diese Adresse für eingehende Verbindungen an. Ausgehende Verbindungen sind für die Synchronisierung erforderlich; eingehende Verbindungen sind optional.
- Der Zugriff auf die DNS-Seeder von Zcash über den DNS-Resolver des Betriebssystems ist erforderlich (typischerweise Port 53).
- Zebra kann ausgehende Verbindungen über jeden Port herstellen. zcashd bevorzugt Peers an Standardports, um nicht für DDoS-Angriffe auf andere Netzwerke genutzt zu werden.

### Typische Mainnet-Netzwerknutzung

- Erstsynchronisierung: Für die anfängliche Synchronisierung ist ein Download von 300 GB erforderlich; dieser Wert wird voraussichtlich steigen.
- Laufende Aktualisierungen: tägliche Uploads und Downloads zwischen 10 MB und 10 GB, abhängig von den Transaktionsgrößen der Nutzer und Peer-Anfragen.
- Zebra startet bei jeder Änderung der internen Datenbankversion eine Erstsynchronisierung, was bei Versions-Upgrades einen vollständigen Chain-Download bedeuten kann.
- Peers mit einer Round-Trip-Latenz von höchstens 2 Sekunden werden bevorzugt. Wenn die Latenz diesen Schwellenwert überschreitet, eröffne ein Ticket im Zebra-Repository.

## Häufige Fehler

- Die Festplatte nur für den heutigen Bedarf zu dimensionieren. Der zwischengespeicherte Mainnet-Zustand liegt bereits bei knapp 300 GB und wächst weiter.
- Wallet-RPCs von `zebrad` zu erwarten. Schlüssel und Guthaben befinden sich in [Zallet](https://github.com/zcash/zallet), einem separaten Programm.
- `zebrad` allein auszuführen und zu erwarten, dass Light Wallets sich verbinden. Dafür wird ein Indexer benötigt, entweder lightwalletd oder [Zaino](/zcash-tech/zaino).
- Eine unerwartete Resynchronisierung als Fehler zu behandeln. Eine Änderung der Datenbankversion löst absichtlich eine solche aus.

## Verwandte Seiten

- [Vollständige Knoten](/zcash-tech/full-nodes) - was ein vollständiger Knoten macht und welche Implementierungen existieren
- [Zakura Knoten](/zcash-tech/zakura-node) - ein von Zebra geforkter Knoten mit schnellerer Synchronisierung und Pruning
- [Zaino](/zcash-tech/zaino) - der Rust-Indexer, der Light Wallets bedient
- [Lightwallet-Knoten](/zcash-tech/lightwallet-nodes) - die Server, die Light Wallets abfragen
- [Zcash Mining-Anleitung](/using-zcash/zcash-mining-guide) - Mining gegen deinen eigenen Knoten

## Weiterführendes Lernen

- [Das Zebra-Buch](https://zebra.zfnd.org)
- [Zebra auf GitHub](https://github.com/ZcashFoundation/zebra/)
- [Systemanforderungen](https://zebra.zfnd.org/user/requirements.html)
