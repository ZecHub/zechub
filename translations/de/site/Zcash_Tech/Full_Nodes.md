<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Vollständige Knoten

## TL;DR

- Ein vollständiger Knoten hält eine vollständige Kopie der Zcash-Blockchain und prüft jeden neuen Block und jede Transaktion anhand der Konsensregeln.
- Zebra (`zebrad`) ist der Knoten, den man heute installieren sollte. Zakura ist eine zweite Implementierung, die von Zebra geforkt wurde.
- zcashd wurde eingestellt. Der End-of-Support-Stopp wurde am 18. Juli 2026 bei Blockhöhe 3417100 erreicht, und diese Knoten starten nicht mehr.
- Knoten und Wallet sind nun getrennte Programme. [Zallet](https://github.com/zcash/zallet) läuft mit einem Knoten und verwaltet die Schlüssel.
- Der Betrieb eines eigenen Knotens ermöglicht unabhängige Verifizierung und macht es unnötig, dem Server einer anderen Person zu vertrauen.

## Grunderklärung

Ein vollständiger Knoten ist Software, die eine vollständige Kopie der Blockchain einer Kryptowährung ausführt und dir Zugriff auf die Funktionen des Protokolls gibt.

Er enthält eine vollständige Aufzeichnung jeder seit der Entstehung erfolgten Transaktion und kann daher die Gültigkeit neuer Transaktionen und Blöcke prüfen, die zur Blockchain hinzugefügt werden.

## Knotenimplementierungen

### Zebra

Zebra ist eine unabhängige, produktionsreife Implementierung eines vollständigen Knotens des Zcash-Protokolls, die von der Zcash Foundation erstellt und in Rust geschrieben wurde. Da zcashd eingestellt wurde, ist Zebra (`zebrad`) der empfohlene vollständige Knoten für neue Bereitstellungen.

Zebra validiert Blöcke und Transaktionen, nimmt am Peer-to-Peer-Netzwerk teil und stellt eine RPC-Schnittstelle für Anwendungen bereit. Die Wallet ist jetzt eine separate Komponente: [Zallet](https://github.com/zcash/zallet) läuft mit einem Zebra-Knoten und verwaltet Schlüssel und Guthaben. Dies ersetzt zcashd, das Knoten und Wallet in einem einzigen Prozess bündelte.

Um abgeschirmte Light Wallets bereitzustellen, läuft der Knoten neben einem Indexer, entweder dem etablierten [lightwalletd](https://github.com/zcash/lightwalletd) oder dem neueren [Zaino](https://zechub.wiki/zcash-tech/zaino).

Lies unbedingt das Zebra-Buch für Einrichtungsanleitungen und tritt dem R&D-Discord-Server bei, um Unterstützung zu erhalten.

[GitHub](https://github.com/ZcashFoundation/zebra/)

[Das Zebra-Buch](https://zebra.zfnd.org)

Siehe [Zebra Vollständiger Knoten](/zcash-tech/zebra-full-node) für Installationsschritte, Konfiguration und Hardwareanforderungen.

### Zakura

Zakura ist ein zweiter konsenskompatibler vollständiger Knoten, der von Zebra geforkt und von Valar Group zusammen mit Project Tachyon entwickelt wurde. Er folgt denselben Protokollregeln und ergänzt schnellere Synchronisierung, Blockbereinigung und eine zcashd-RPC-Kompatibilitätsschicht. Siehe [Zakura Knoten](/zcash-tech/zakura-node).

### zcashd (eingestellt)

> **Hinweis:** zcashd wurde eingestellt. Die Electric Coin Company [kündigte die Einstellung an](https://z.cash/support/zcashd-deprecation/), und der automatische End-of-Support-Stopp wurde am 18. Juli 2026 bei Blockhöhe 3417100 erreicht. Jeder unveränderte zcashd-6.20.0-Knoten wurde bei dieser Höhe heruntergefahren und verweigert einen Neustart; außerdem unterstützt die Software NU6.3 nicht. Verwende Zebra. Wenn du eine zcashd `wallet.dat` besitzt, folge dem [Migrationsleitfaden: zcashd zu zebrad/Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet).

zcashd war die ursprüngliche Implementierung eines vollständigen Knotens für Zcash, entwickelt und gepflegt von der Electric Coin Company. Die folgenden Build-Anweisungen werden als Referenz und für Betreiber beibehalten, die von zcashd migrieren.

zcashd stellt über seine RPC-Schnittstelle eine Reihe von APIs bereit. Diese APIs bieten Funktionen, die externen Anwendungen die Interaktion mit dem Knoten ermöglichen.

[lightwalletd](https://github.com/zcash/lightwalletd) ist ein Beispiel für eine Anwendung, die einen vollständigen Knoten nutzt, damit Entwickler mobilfreundliche abgeschirmte Light Wallets erstellen und pflegen können, ohne direkt mit zcashd interagieren zu müssen.

[Vollständige Liste unterstützter RPC-Befehle](https://zcash.github.io/rpc/)

[Das zcashd-Buch](https://zcash.github.io/zcash/)

#### Einen Knoten starten (Linux)

- Abhängigkeiten installieren

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Neueste Veröffentlichung klonen, auschecken, einrichten und erstellen:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Blockchain synchronisieren (kann mehrere Stunden dauern)

    Um den Knoten zu starten, führe Folgendes aus:

      ./src/zcashd

- Private Schlüssel werden in ~/.zcash/wallet.dat gespeichert

[Anleitung für zcashd auf Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## Praktische Auswirkungen

### Das Netzwerk

Durch den Betrieb eines vollständigen Knotens hilfst du, das zcash-Netzwerk zu stärken, indem du seine Dezentralisierung unterstützt.

Dies hilft, gegnerische Kontrolle zu verhindern und das Netzwerk gegen einige Arten von Störungen widerstandsfähig zu halten.

DNS-Seeder stellen über einen integrierten Server eine Liste anderer zuverlässiger Knoten bereit. Dadurch können sich Transaktionen im gesamten Netzwerk verbreiten.

### Netzwerkstatistiken

Dies sind Beispielplattformen, die Zugriff auf Zcash-Netzwerkdaten ermöglichen:

[Zcash Block Explorer](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Du kannst außerdem zur Entwicklung des Netzwerks beitragen, indem du Tests ausführst, neue Verbesserungen vorschlägst und Metriken bereitstellst.

### Mining

Miner benötigen vollständige Knoten, um auf alle Mining-bezogenen RPCs wie getblocktemplate und getmininginfo zuzugreifen.

zcashd ermöglicht außerdem Mining zu abgeschirmter Coinbase. Miner und Mining-Pools können standardmäßig direkt minen, um abgeschirmte ZEC in einer z-Adresse anzusammeln.

Lies [Den Mining-Leitfaden](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) oder tritt der Community-Forumseite für [Zcash Miner](https://forum.zcashcommunity.com/c/mining/13) bei.

### Privatsphäre

Der Betrieb eines vollständigen Knotens ermöglicht dir, alle Transaktionen und Blöcke im Zcash-Netzwerk unabhängig zu verifizieren.

Der Betrieb eines vollständigen Knotens vermeidet einige Datenschutzrisiken, die mit der Nutzung von Diensten Dritter zur Überprüfung von Transaktionen in deinem Namen verbunden sind.

Die Nutzung deines eigenen Knotens ermöglicht außerdem die Verbindung zum Netzwerk über [Tor](https://zcash.github.io/zcash/user/tor.html).
Dies bietet den zusätzlichen Vorteil, dass andere Nutzer sich privat mit der .onion-Adresse deines Knotens verbinden können.

## Häufige Fehler

- zcashd anhand der obigen Anweisungen erstellen und einen funktionierenden Knoten erwarten. Diese Binärdateien halten bei der Einstellungshöhe an.
- Einen Knoten betreiben und annehmen, dass deine mobile Wallet ihn nun verwendet. Eine Light Wallet kommuniziert weiterhin mit dem Server, mit dem sie konfiguriert ist, bis du sie auf deinen eigenen verweist. Siehe [Lightwallet-Knoten](/zcash-tech/lightwallet-nodes).
- Nur `zebrad` betreiben und erwarten, dass sich Light Wallets verbinden. Der Knoten benötigt einen Indexer daneben, entweder lightwalletd oder [Zaino](/zcash-tech/zaino).
- Nach Wallet-RPCs auf dem Knoten suchen. Schlüssel und Guthaben wurden zu Zallet verschoben.

## Verwandte Seiten

- [Zebra Vollständiger Knoten](/zcash-tech/zebra-full-node) - den empfohlenen Knoten installieren, konfigurieren und betreiben
- [Zakura Knoten](/zcash-tech/zakura-node) - die zweite Knotenimplementierung, geforkt von Zebra
- [Lightwallet-Knoten](/zcash-tech/lightwallet-nodes) - die Server, die Light Wallets abfragen
- [Zaino](/zcash-tech/zaino) - der Rust-Indexer, der Light Wallets bereitstellt
- [Zcash Wallet-Synchronisierung](/zcash-tech/zcash-wallet-syncing) - warum die Synchronisierung so funktioniert

## Weiterführendes Lernen

Lies [Support-Dokumentation](https://zcash.readthedocs.io/en/latest/)

Tritt unserem [Discord-Server](https://discord.gg/zcash) bei oder kontaktiere uns auf [X](https://X.com/ZecHub)
