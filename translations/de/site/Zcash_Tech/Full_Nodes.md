<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Full Nodes

Ein Full Node ist Software, die eine vollständige Kopie der Blockchain einer beliebigen Kryptowährung ausführt und damit Zugang zu den Funktionen des Protokolls bietet.

Er enthält eine vollständige Aufzeichnung jeder Transaktion, die seit dem Genesis-Block stattgefunden hat, und ist daher in der Lage, die Gültigkeit neuer Transaktionen und Blöcke zu verifizieren, die der Blockchain hinzugefügt werden.

## Zcashd

> **Hinweis:** zcashd wird eingestellt. Die Electric Coin Company hat [offiziell angekündigt](https://z.cash/support/zcashd-deprecation/), dass zcashd außer Betrieb genommen wird; seine Rolle als Full Node wird durch [Zebra](https://github.com/ZcashFoundation/zebra) (`zebrad`) ersetzt und seine Wallet-Rolle durch [Zallet](https://github.com/zcash/zallet). Für neue Deployments verwende Zebra (siehe unten). Wenn du bereits einen zcashd-Node betreibst, folge dem [Migrationsleitfaden: zcashd zu Zebrad/Zallet](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet).

zcashd war die ursprüngliche Full-Node-Implementierung für Zcash, entwickelt und gepflegt von der Electric Coin Company. Die unten stehenden Build-Anweisungen bleiben als Referenz und für Betreiber erhalten, die von zcashd weg migrieren.

Zcashd stellt über seine RPC-Schnittstelle eine Reihe von APIs bereit. Diese APIs bieten Funktionen, die es externen Anwendungen ermöglichen, mit dem Node zu interagieren.

[Lightwalletd](https://github.com/zcash/lightwalletd) ist ein Beispiel für eine Anwendung, die einen Full Node verwendet, um es Entwicklern zu ermöglichen, mobile-freundliche shielded Light Wallets zu erstellen und zu pflegen, ohne direkt mit Zcashd interagieren zu müssen.

[Vollständige Liste der unterstützten RPC-Befehle](https://zcash.github.io/rpc/)

[Das Zcashd-Buch](https://zcash.github.io/zcash/)


### Einen Node starten (Linux)

- Abhängigkeiten installieren 

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Neueste Version klonen, auschecken, einrichten und bauen:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Blockchain synchronisieren (kann mehrere Stunden dauern)

    Um den Node zu starten, führe aus:

      ./src/zcashd

- Private Keys werden in ~/.zcash/wallet.dat gespeichert

[Anleitung für Zcashd auf Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra ist eine unabhängige, produktionsreife Full-Node-Implementierung des Zcash-Protokolls, erstellt von der Zcash Foundation und in Rust geschrieben. Da zcashd eingestellt wird, ist Zebra (`zebrad`) der empfohlene Full Node für neue Deployments.

Zebra validiert Blöcke und Transaktionen, nimmt am Peer-to-Peer-Netzwerk teil und stellt eine RPC-Schnittstelle für Anwendungen bereit. Die Wallet ist jetzt eine separate Komponente: [Zallet](https://github.com/zcash/zallet) läuft gegen einen Zebra-Node und verwaltet Keys und Guthaben. Dies ersetzt zcashd, das Node und Wallet in einem einzigen Prozess gebündelt hat.

Um shielded Light Wallets zu bedienen, läuft der Node zusammen mit einem Indexer, entweder dem etablierten [lightwalletd](https://github.com/zcash/lightwalletd) oder dem neueren [Zaino](https://zechub.wiki/zaino).

Lies unbedingt das Zebra-Buch für Einrichtungsanweisungen und tritt dem R&D-Discord-Server für Support bei. 

[Github](https://github.com/ZcashFoundation/zebra/)

[Das Zebra-Buch](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## Das Netzwerk

Indem du einen Full Node betreibst, hilfst du dabei, das zcash-Netzwerk zu stärken, indem du seine Dezentralisierung unterstützt. 

Dies hilft dabei, gegnerische Kontrolle zu verhindern und das Netzwerk widerstandsfähig gegenüber einigen Formen von Störungen zu halten.

DNS-Seeders stellen über einen eingebauten Server eine Liste anderer zuverlässiger Nodes bereit. Dadurch können sich Transaktionen im gesamten Netzwerk verbreiten. 

### Netzwerkstatistiken

Dies sind Beispielplattformen, die Zugang zu Zcash-Netzwerkdaten bieten:

[Zcash Block Explorer](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Du kannst auch zur Entwicklung des Netzwerks beitragen, indem du Tests ausführst oder neue Verbesserungen vorschlägst und Metriken bereitstellst. 



### Mining

Miner benötigen Full Nodes, um auf alle miningbezogenen RPCs wie getblocktemplate und getmininginfo zuzugreifen. 

Zcashd ermöglicht außerdem Mining auf shielded Coinbase. Miner und Mining-Pools haben die Möglichkeit, direkt zu minen, um standardmäßig shielded ZEC in einer z-address anzusammeln. 

Lies den [Mining-Leitfaden](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) oder besuche die Community-Forum-Seite für [Zcash-Miner](https://forum.zcashcommunity.com/c/mining/13).

### Privatsphäre 

Das Betreiben eines Full Node ermöglicht es dir, alle Transaktionen und Blöcke im Zcash-Netzwerk unabhängig zu verifizieren.

Das Betreiben eines Full Node vermeidet einige Datenschutzrisiken, die mit der Nutzung von Drittanbieterdiensten verbunden sind, die Transaktionen in deinem Namen verifizieren.

Die Nutzung deines eigenen Node erlaubt außerdem die Verbindung zum Netzwerk über [Tor](https://zcash.github.io/zcash/user/tor.html).
Das hat den zusätzlichen Vorteil, dass andere Nutzer sich privat mit der .onion-Adresse deines Node verbinden können.


**Brauchst du Hilfe?**

Lies die [Support-Dokumentation](https://zcash.readthedocs.io/en/latest/)

Tritt unserem [Discord-Server](https://discord.gg/zcash) bei oder kontaktiere uns auf [twitter](https://twitter.com/ZecHub)
