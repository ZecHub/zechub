<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

## Einführung in den Zebra Node

Einführung in Zebra: Revolutionierung der Zcash-Node-Infrastruktur mit Rust

Lernen Sie Zebra kennen, eine bahnbrechende Errungenschaft als erster Zcash-Node, der vollständig in Rust entwickelt wurde. Nahtlos in das Zcash-Peer-to-Peer-Netzwerk integriert, dient Zebra als zentrales Werkzeug zur Stärkung der Widerstandsfähigkeit des Netzwerks. Durch seine Kernfunktionen – die Validierung und Weiterleitung von Transaktionen sowie die sorgfältige Pflege des Zustands der Zcash-Blockchain – trägt Zebra zu einer stärker dezentralisierten Netzwerkinfrastruktur bei.

## Vorteile gegenüber der Zcashd-Node-Implementierung
Im Gegensatz zum ursprünglichen Zcash-Node, zcashd, dessen Ursprung auf den grundlegenden Codebestand von Bitcoin zurückgeht und der von der Electric Coin Company entwickelt wird, steht unsere Implementierung als eigenständige Einheit da. Von Grund auf mit Fokus auf Sicherheit und Effizienz entwickelt, nutzt Zebra die Stärke der speichersicheren Sprache Rust.

Trotz ihrer unterschiedlichen Ursprünge halten sich sowohl zcashd als auch Zebra an dasselbe Protokoll, was eine nahtlose Kommunikation und Interoperabilität zwischen ihnen ermöglicht. Diese Innovation erweitert nicht nur das Zcash-Ökosystem, sondern setzt auch einen neuen Standard für die Entwicklung von Blockchain-Nodes.

## Anweisungen für den Zebra Launcher

Sie können Zebra mit unserem Docker-Image ausführen oder es manuell bauen. Bitte beachten Sie den Abschnitt Systemanforderungen.

### Docker-Nutzung:

Um unsere neueste Version mühelos auszuführen und bis zur aktuellen Spitze zu synchronisieren, führen Sie den folgenden Befehl aus:

```

docker run zfnd/zebra:latest

```

Ausführlichere Anweisungen und detaillierte Einblicke finden Sie in unserer [Docker-Dokumentation](https://zebra.zfnd.org/user/docker.html).

### Zebra bauen:

Zum Bauen von Zebra werden Rust, libclang und ein C++-Compiler benötigt.

- Stellen Sie sicher, dass Sie die neueste stabile Rust-Version installiert haben, da Zebra ausschließlich damit getestet wird.
- Zu den erforderlichen Build-Abhängigkeiten gehören:
  - libclang (auch bekannt als libclang-dev oder llvm-dev)
  - clang oder ein anderer C++-Compiler (wie g++ für alle Plattformen oder Xcode für macOS)
  - protoc (Protocol Buffers-Compiler) mit dem Flag *--experimental_allow_proto3_optional*, eingeführt in Protocol Buffers v3.12.0 (veröffentlicht am 16. Mai 2020).



### Abhängigkeiten unter Arch:

Nachdem sichergestellt wurde, dass die Abhängigkeiten erfüllt sind, fahren Sie mit dem Bauen und Installieren von Zebra mit folgendem Befehl fort:

```

cargo install --locked zebrad

```

Starten Sie Zebra durch Ausführen von:

```
zebrad start

```


## Optionale Konfigurationen & Funktionen:


### - Konfigurationsdatei initialisieren:

  - Erzeugen Sie eine Konfigurationsdatei mit dem Befehl:
    
  ```
  zebrad generate -o ~/.config/zebrad.toml
  
  ```

  - Die erzeugte *zebrad.toml* wird im standardmäßigen Einstellungsverzeichnis von Linux abgelegt. Informationen zu den Standardpfaden anderer Betriebssysteme finden Sie in unserer Dokumentation.



### - Fortschrittsbalken konfigurieren:

  - Konfigurieren Sie *tracing.progress_bar* in Ihrer *zebrad.toml*, um wichtige Metriken im Terminal mithilfe von Fortschrittsbalken anzuzeigen. Hinweis: Es gibt ein bekanntes Problem, bei dem Schätzungen der Fortschrittsbalken extrem groß werden können.



### - Mining konfigurieren:

  - Zebra kann für Mining angepasst werden, indem eine *MINER_ADDRESS* und ein Port-Mapping in Docker angegeben werden. Weitere Details finden Sie in unserer [Dokumentation zur Mining-Unterstützung](https://zebra.zfnd.org/user/mining-docker.html).


### - Benutzerdefinierte Build-Features:

  - Erweitern Sie die Funktionalität von Zebra mit zusätzlichen Cargo-Features wie Prometheus-Metriken, Sentry-Monitoring, experimenteller Elasticsearch-Unterstützung und mehr.

  - Kombinieren Sie mehrere Features, indem Sie sie während der Installation als Parameter des Flags `--features` angeben.


### Hinweis: Einige Debugging- und Monitoring-Features sind in Release-Builds deaktiviert, um die Leistung zu optimieren.

Eine umfassende Liste experimenteller und entwicklerbezogener Features finden Sie in unserer [API-Dokumentation](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).
 

# Systemanforderungen und Netzwerkkonfiguration für Zebra

Um optimale Leistung und Zuverlässigkeit sicherzustellen, empfehlen wir die folgenden Systemanforderungen für das Kompilieren und Ausführen von zebrad, dem revolutionären Zcash-Node, der vollständig in Rust entwickelt wurde:

### Systemanforderungen:
- CPU: 4 CPU-Kerne
- RAM: 16 GB
- Festplattenspeicher: 300 GB verfügbarer Speicherplatz zum Kompilieren von Binärdateien und zum Speichern des zwischengespeicherten Chain-Status
- Netzwerk: 100-Mbit/s-Netzwerkverbindung mit mindestens 300 GB Uploads und Downloads pro Monat


Bitte beachten Sie, dass die Testsuite von Zebra je nach Spezifikationen Ihres Systems mehr als eine Stunde benötigen kann. Langsamere Systeme können Zebra möglicherweise kompilieren und ausführen, jedoch haben wir durch Tests noch keine genauen Leistungsgrenzen festgelegt.


### Festplattenanforderungen:
- Zebra verwendet ungefähr 300 GB für zwischengespeicherte Mainnet-Daten und 10 GB für zwischengespeicherte Testnet-Daten. Rechnen Sie damit, dass der Speicherverbrauch mit der Zeit zunimmt.
- Die Datenbank wird regelmäßig bereinigt, insbesondere bei Herunterfahren oder Neustarts, um die Datenintegrität sicherzustellen. Unvollständige Änderungen infolge erzwungener Beendigungen oder Panics werden beim Neustart von Zebra zurückgesetzt.


### Netzwerkanforderungen und Ports:
- Zebra verwendet die folgenden TCP-Ports für eingehende und ausgehende Verbindungen:
  - 8233 für Mainnet
  - 18233 für Testnet
- Die Konfiguration von Zebra mit einer bestimmten listen_addr ermöglicht die Bekanntgabe dieser Adresse für eingehende Verbindungen. Während ausgehende Verbindungen für die Synchronisierung wesentlich sind, sind eingehende Verbindungen optional.
- Der Zugriff auf Zcash-DNS-Seeder ist über den DNS-Resolver des Betriebssystems erforderlich (typischerweise Port 53).
- Während Zebra ausgehende Verbindungen über jeden Port aufbauen kann, bevorzugt zcashd Peers auf Standardports, um DDoS-Angriffe auf andere Netzwerke abzumildern.


### Typische Mainnet-Netzwerknutzung:
- Erstsynchronisierung: Für die erste Synchronisierung ist ein Download von 300 GB erforderlich; bei späteren Downloads ist mit weiterem Wachstum zu rechnen.
- Laufende Aktualisierungen: Rechnen Sie mit täglichen Uploads und Downloads zwischen 10 MB und 10 GB, abhängig von den Größen der Benutzertransaktionen und den Anfragen der Peers.
- Zebra startet bei jeder Änderung der internen Datenbankversion eine Erstsynchronisierung, was bei Versions-Upgrades möglicherweise vollständige Chain-Downloads erforderlich macht.
- Peers mit einer Round-Trip-Latenz von 2 Sekunden oder weniger werden bevorzugt. Wenn die Latenz diesen Schwellenwert überschreitet, reichen Sie bitte ein Ticket ein, um Unterstützung zu erhalten.


Wenn Sie diese Empfehlungen und Konfigurationen befolgen, können Sie die Effizienz und Wirksamkeit von Zebra innerhalb des Zcash-Netzwerks maximieren. Sollten Sie auf Probleme stoßen oder weitere Unterstützung benötigen, steht Ihnen unser Support-Team jederzeit bereit, um Hilfestellung zu geben.


Hier ist der Link zur Installationsanleitung für den Zebra Node:
https://zebra.zfnd.org/user/install.html?highlight=zebra%20launcher#installing-zebra
