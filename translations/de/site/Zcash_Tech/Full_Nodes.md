<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Full Nodes

Ein Full Node ist eine Software, die eine vollständige Kopie der Blockchain einer beliebigen Kryptowährung ausführt und Zugriff auf die Funktionen des Protokolls ermöglicht.

Er enthält eine vollständige Aufzeichnung jeder Transaktion, die seit dem Genesis-Block stattgefunden hat, und ist daher in der Lage, die Gültigkeit neuer Transaktionen und Blöcke zu verifizieren, die der Blockchain hinzugefügt werden.

## Zcashd

Zcashd ist derzeit die wichtigste von Zcash verwendete Full Node-Implementierung und wird von der Electric Coin Company entwickelt und gepflegt.

Zcashd stellt über seine RPC-Schnittstelle eine Reihe von APIs bereit. Diese APIs bieten Funktionen, die es externen Anwendungen ermöglichen, mit dem Node zu interagieren.

[Lightwalletd](https://github.com/zcash/lightwalletd) ist ein Beispiel für eine Anwendung, die einen Full Node verwendet, um Entwicklern das Erstellen und Pflegen mobilfreundlicher abgeschirmter Light Wallets zu ermöglichen, ohne direkt mit Zcashd interagieren zu müssen.

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

- Private Schlüssel werden in ~/.zcash/wallet.dat gespeichert

[Anleitung für Zcashd auf dem Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra ist eine unabhängige Full Node-Implementierung für das Zcash-Protokoll, die von der Zcash Foundation erstellt wurde. 

Sie befindet sich derzeit in der Testphase und ist noch experimentell.

Es gibt zwei Hauptkomponenten von Zebra. Die Client-Komponente, die für das Scannen der Blockchain und die Probe-Entschlüsselung von Transaktionen verantwortlich ist. 

Der zweite Teil ist das Zebra-Kommandozeilenwerkzeug. Dieses Werkzeug verwaltet Spending Keys, Adressen und kommuniziert mit der Client-Komponente in zebrad, um grundlegende Wallet-Funktionalität bereitzustellen.

Alle, die daran interessiert sind, Zebra auszuprobieren, um Blöcke zu minen, sind eingeladen, dem R&D-Discord-Server beizutreten. Lies außerdem unbedingt das Zebra-Buch für Einrichtungsanweisungen. 

[Github](https://github.com/ZcashFoundation/zebra/)

[Das Zebra-Buch](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## Das Netzwerk

Durch das Ausführen eines Full Nodes trägst du dazu bei, das Zcash-Netzwerk zu stärken, indem du seine Dezentralisierung unterstützt. 

Dies hilft dabei, feindliche Kontrolle zu verhindern und das Netzwerk gegenüber einigen Formen von Störungen widerstandsfähig zu halten.

DNS-Seeder stellen über einen eingebauten Server eine Liste anderer zuverlässiger Nodes bereit. Dadurch können sich Transaktionen im gesamten Netzwerk verbreiten. 

### Netzwerkstatistiken

Dies sind Beispiele für Plattformen, die Zugriff auf Zcash-Netzwerkdaten ermöglichen:

[Zcash Block Explorer](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Du kannst auch zur Entwicklung des Netzwerks beitragen, indem du Tests ausführst oder neue Verbesserungen vorschlägst und Metriken bereitstellst. 



### Mining

Miner benötigen Full Nodes, um auf alle miningbezogenen RPCs wie getblocktemplate und getmininginfo zugreifen zu können. 

Zcashd ermöglicht außerdem Mining auf abgeschirmte Coinbase-Auszahlungen. Miner und Mining-Pools haben die Möglichkeit, standardmäßig direkt zu minen, um abgeschirmte ZEC in einer z-Adresse zu sammeln. 

Lies den [Mining-Leitfaden](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) oder tritt der Community-Forum-Seite für [Zcash-Miner](https://forum.zcashcommunity.com/c/mining/13) bei.

### Privatsphäre 

Das Ausführen eines Full Nodes ermöglicht es dir, alle Transaktionen und Blöcke im Zcash-Netzwerk unabhängig zu verifizieren.

Das Ausführen eines Full Nodes vermeidet einige Datenschutzrisiken, die mit der Nutzung von Diensten Dritter verbunden sind, die Transaktionen in deinem Namen verifizieren.

Die Verwendung eines eigenen Nodes erlaubt außerdem die Verbindung zum Netzwerk über [Tor](https://zcash.github.io/zcash/user/tor.html).
Dies hat den zusätzlichen Vorteil, dass andere Nutzer sich privat mit der .onion-Adresse deines Nodes verbinden können.


**Brauchst du Hilfe?**

Lies die [Support-Dokumentation](https://zcash.readthedocs.io/en/latest/)

Tritt unserem [Discord-Server](https://discord.gg/zcash) bei oder kontaktiere uns auf [twitter](https://twitter.com/ZecHub)

---

**Protected terms (keep in English):** `Zaino` `Zallet`
