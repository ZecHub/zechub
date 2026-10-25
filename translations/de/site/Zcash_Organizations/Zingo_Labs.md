#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[Offizielle Website](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs ist ein Team von Visionären, das sich der Verbesserung der menschlichen Erfahrung widmet. Wir glauben, dass Technologie der Menschheit zugutekommen sollte und dass wir durch einvernehmliche Interaktionen gedeihen. Wir identifizieren die Muster, die dies ermöglichen.

Zingo Lab Cyan agiert als Shielded DAO. Wir verwahren unsere Mittel in einer Treasury, bei der jedes Mitglied über einen View Key verfügt. Mittel werden aus der Treasury ausgegeben, wenn Mitglieder für einen Vorschlag stimmen.

## Projekte

### Zingo! Wallet ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo Wallet ist eine voll ausgestattete Zcash Wallet, die auf Benutzerfreundlichkeit ausgelegt ist, jedoch einige erweiterte Funktionen für fortgeschrittenere Nutzer enthält. Sie unterstützt transparente, Sapling- und Ironwood-Pools, verfügt über ein Adressbuch für wiederkehrende Zahlungen und ist in verschiedenen Sprachen verfügbar. Sie war die erste Wallet mit Unterstützung für Orchard und zur Implementierung von NU5-Formaten.

Eine der Hauptfunktionen von Zingo! ist die Möglichkeit, das Memo-Feld zu verwenden, um wertvolle Einblicke in deine Transaktionen zu bieten.

Zingo! ist für Mobilgeräte und PCs verfügbar. Alle Downloads findest du [hier](https://zingolabs.org/)

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
Eine API und Test-App, die Zcash-Funktionalität für die Nutzung durch Apps bereitstellt. Zingolib stellt sowohl eine Bibliothek für zingo-mobile als auch eine enthaltene CLI-Anwendung namens zingo-cli bereit, eine Kommandozeilen-Light-Wallet, die mit einem Chain-Indexer wie [Zaino](/zcash-tech/zaino) kommuniziert.

### Zaino Indexer ([GitHub](https://github.com/zingolabs/zaino))
Zaino ist ein Rust-Indexer für die Zcash-Blockchain, entwickelt vom Zingo-Team. Es ist der Indexer im [Z3-Stack](/zcash-tech/z3-stack): Er indexiert Chain-Daten von einem [Zebra](/zcash-tech/zebra-full-node)-Validator und bedient Wallets, Explorer und andere Clients. Er ist der Nachfolgepfad für lightwalletd.

Zaino bietet wesentliche Funktionen sowohl für Light Clients wie Wallets und Anwendungen, die nicht die vollständige Blockchain-Historie benötigen, als auch für Full Clients oder Wallets. Es unterstützt zudem Block Explorer und gewährt Zugriff sowohl auf die finalisierte Blockchain als auch auf die nicht finalisierte beste Chain und den Mempool, die von einem Zebra-Full-Validator verwaltet werden.

`zcashd` erreichte seinen End-of-Support-Stopp am 18. Juli 2026 bei Block 3.417.100 und unterstützt Ironwood (NU6.3) nicht. Zaino liest einen Zebra-Validator.

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

Eine Reihe von Dienstprogrammen, die Zcash-Prozesse starten und verwalten. Dies wird für Integrationstests bei der Entwicklung von Folgendem verwendet:
- Light Clients
- Indexern
- Validatoren

Ziel ist es, eine äußerst anpassungsfähige und robuste Testumgebung für Kernknoten (Validatoren) wie Zebra, Indexer wie Zaino und Light-Client-Wallets wie zingo-cli bereitzustellen.

Der standardmäßig gestartete Stack besteht aus Zebrad, zainod und zcash-devtool. Die veralteten Prozesse `zcashd` und lightwalletd befinden sich hinter einer nicht unterstützten `legacy-stack`-Funktion und sollen entfernt werden.

Zusätzlich zur Bereitstellung von Werkzeugen zum Starten, Zwischenspeichern und Laden von Zcash-Chain-Daten (für Mainnet, Testnet und Regtest) wird zcash-local-net von der Testsuite von Zaino verwendet, um die in Zaino gehosteten Lightwallet-RPC-Dienste zu bewerten (siehe [ZainoTestdokumentation](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)).
