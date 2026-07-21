#  <img src="https://github.com/user-attachments/assets/e38b13a9-d410-426a-a1e6-2dde105d56c4" alt="Alt-Text" width="50"/> ZingoLabs

[Offizielle Website](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs ist ein Team von Visionären, das sich der Verbesserung der menschlichen Erfahrung widmet. Wir glauben, dass Technologie der Menschheit zugutekommen sollte und dass wir durch einvernehmliche Interaktionen aufblühen. Wir identifizieren die Muster, die dies ermöglichen.

Zingo Lab Cyan arbeitet als Shielded DAO. Wir verwahren unsere Mittel in einer Treasury, bei der jedes Mitglied einen view key hat. Mittel werden aus der Treasury ausgegeben, wenn Mitglieder für einen Vorschlag stimmen.

## Projekte

### Zingo! Wallet ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo Wallet ist eine voll ausgestattete Zcash-Wallet, die auf Benutzerfreundlichkeit ausgelegt ist, obwohl sie auch einige fortgeschrittene Funktionen für erfahrenere Nutzer enthält. Sie unterstützt transparente, Sapling- und Orchard-Pools, verfügt über ein Adressbuch für wiederkehrende Zahlungen und ist in verschiedenen Sprachen verfügbar. Sie war die erste Wallet, die Orchard unterstützte und NU5-Formate implementierte.

Eine der Hauptfunktionen von Zingo! ist die Möglichkeit, das Memo-Feld zu verwenden, um wertvolle Einblicke in deine Transaktionen zu bieten.

Zingo! ist für mobile Geräte und PCs verfügbar. Alle Downloads findest du [hier](https://zingolabs.org/)

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
Eine API und Test-App, die Zcash-Funktionalität für die Nutzung in Apps bereitstellt. Zingolib bietet sowohl eine Bibliothek für zingo-mobile als auch eine enthaltene CLI-Anwendung zur Interaktion mit zcashd über lightwalletd namens Zingo-cli, einen Lightwalletd-Proxy-Client für die Befehlszeile.

### Zaino Indexer ([GitHub](https://github.com/zingolabs/zaino))
Zaino ist ein vom Zingo-Team in Rust entwickelter Indexer, der darauf abzielt, lightwalletd zu ersetzen und das Projekt zur Ausmusterung von zcashd voranzutreiben.

Zaino bietet essenzielle Funktionen sowohl für Light-Clients wie Wallets und Anwendungen, die nicht die vollständige Blockchain-Historie benötigen, als auch für Full-Clients oder Wallets. Es unterstützt auch Block-Explorer und gewährt Zugriff sowohl auf die finalisierte Blockchain als auch auf die nicht finalisierte Best-Chain und den Mempool, die von einem vollständigen Validator auf Basis von Zebra oder Zcashd verwaltet werden.

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/zcash-local-net))
Ein Satz von Dienstprogrammen, die Zcash-Prozesse starten und verwalten. Dies wird für Integrationstests bei der Entwicklung von Folgendem verwendet:
- Light-Clients
- Indexern
- Validatoren

Ziel ist es, eine hochgradig anpassbare und robuste Testumgebung für Core-Nodes (Validatoren) wie zcash und zebra, Indexer wie lightwallet und zaino sowie mindestens zingo-cli als Light-Client-Wallet bereitzustellen.

Dieses Repository wurde entwickelt, um die Funktionalität verschiedener Validatoren (wie Zcashd und Zebrad) und Indexer (wie Lightwalletd und Zaino) zu vergleichen, um die Migration während des Prozesses der Ausmusterung von Zcashd zu erleichtern.

Zusätzlich zur Bereitstellung von Tools zum Starten, Cachen und Laden von Zcash-Chain-Daten (für Mainnet, Testnet und Regtest) enthält zcash-zocal-net eine Reihe von Tests, um die Fähigkeiten von Lightwalletd und Zaino über alle Lightwallet-RPC-Services hinweg zu vergleichen. Diese Tests können direkt aus Zaino ausgeführt werden (siehe [https://github.com/zingolabs/zaino/blob/dev/docs/testing.md](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)]) , um die in Zaino gehosteten Lightwallet-RPC-Services zu bewerten.
