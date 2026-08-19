<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>


# Zcash Lightwallet-Knoten

## Einführung

Die meisten Menschen nutzen Zcash über eine Light Wallet, die nicht die gesamte blockchain herunterlädt. Stattdessen kommuniziert sie mit einem Server, der diese Arbeit bereits erledigt hat. Diese Seite erklärt, was diese Server sind, was sie über dich sehen können und was nicht, wie du deine Verbindung über Tor leitest und wie du den Server wechselst, den deine Wallet verwendet.

Heute bedienen zwei Software-Komponenten Light Wallets. **lightwalletd** ist der ursprüngliche Dienst, geschrieben in Go. **Zaino** ist ein neuerer Indexer, geschrieben in Rust und entwickelt als Teil der Arbeiten zur Ablösung von zcashd.

## Was ein Light-Wallet-Server tut

Ein Light-Wallet-Server sitzt zwischen deiner Wallet und der Zcash-blockchain und gibt ihr eine bandbreiteneffiziente Sicht auf die chain. Er übernimmt drei Aufgaben für dich.

Er stellt kompakte Blöcke bereit. Anstatt ganzer Blöcke sendet er eine kompakte Form, die nur das enthält, was eine Wallet benötigt, um eine Zahlung an ihre Shielded-Adresse zu erkennen, eine Ausgabe ihrer Notes zu erkennen und ihre Witnesses zu aktualisieren.

Er leitet deine Transaktionen weiter. Wenn du sendest, übergibt deine Wallet die fertige Transaktion an den Server, der sie ins Netzwerk überträgt.

Er beantwortet chain-Abfragen, etwa zur aktuellen Höhe und zu den Gebühreninformationen, die deine Wallet benötigt.

Deine Wallet erledigt die privaten Aufgaben weiterhin lokal. Sie verwahrt deine Schlüssel, entschlüsselt Blöcke probeweise, um deine Notes zu finden, und erstellt und signiert Transaktionen auf deinem Gerät.

## Was der Server sehen kann und was nicht

Das ist der Teil, bei dem man sich leicht irren kann. Deine Schlüssel verlassen niemals dein Gerät, aber das ist nicht dasselbe wie die Aussage, dass der Server nichts über dich erfährt.

Die Referenz hierfür ist das [Bedrohungsmodell der Zcash-Wallet-App](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), das du vollständig lesen solltest, wenn dir das wichtig ist. Es beschreibt mehrere Arten von Angreifern. Für diese Seite relevant ist ein Angreifer, der den Datenverkehr zwischen deiner Wallet und dem Internet sowie zwischen dem Server und dem Internet beobachten kann. Wer den Server betreibt, befindet sich naturgemäß teilweise in genau dieser Position, weil deine Wallet sich direkt mit ihm verbindet.

Beginnen wir mit dem, was geschützt ist. Gegen jeden Angreifer im Modell, einschließlich eines Angreifers, der den Server kompromittiert hat, kann er "can't learn any of the user's cryptographic key material (spending keys, viewing keys, seed phrase, etc.)", deine Gelder nicht stehlen und dich nicht dazu bringen, Gelder zu senden, die du nicht senden wolltest. Die Beträge und Memos in vollständig abgeschirmten Transaktionen bleiben verschlüsselt.

Dann gibt es noch das, was nicht geschützt ist. Das Bedrohungsmodell listet dies als bekannte Schwächen gegenüber einem verkehrsbeobachtenden Angreifer auf:

| Schwäche | Wie |
|:--|:--|
| Erkennen, wer du bist | "The adversary knows the user's IP address, which could lead them to the user's real identity" |
| Ungefähr erkennen, wo du bist | Nachschlagen deiner IP "in a geolocation database to approximate their location" |
| Erkennen, dass und wann du eine Shielded-Transaktion gesendet oder empfangen hast | Beim Senden wird "uses more bandwidth, which is visible even though the connection is encrypted". Das Modell weist darauf hin, dass der Vorgang des Sendens und Empfangens für den Server selbst sichtbar ist |
| Zählen, wie viele Transaktionen du im Laufe der Zeit gemacht hast | Dieselben Bandbreitenmuster, über einen längeren Zeitraum beobachtet |
| Wiederkehrende Zahlungsmuster erkennen | Beobachten, wann Aktivität stattfindet |
| Herausfinden, ob eine Adresse dir gehört | Ein Angreifer, der eine Adresse bereits kennt, "could send funds to that address and watch to see if there are bandwidth spikes" von deiner Wallet beim Abrufen |

Das Modell weist außerdem darauf hin, dass der Normalfall "a trust relationship between the user and the lightwalletd server operator" voraussetzt.

Die ehrliche Zusammenfassung lautet also: Ein Light-Wallet-Server kann dein Geld nicht ausgeben, und er kann die Beträge oder Memos in deinen Shielded-Transaktionen nicht lesen. Was er sehr gut herausfinden kann, ist deine IP-Adresse und der Zeitpunkt deiner Aktivität, und diese beiden Dinge zusammen können viel über eine Person aussagen. Shielded-Transaktionen schützen das, was auf der blockchain geschieht. Sie verbergen nicht von selbst deine Verbindung zum Server.

## Routing über Tor

Tor trennt die Verbindung zwischen deiner IP-Adresse und dem Datenverkehr deiner Wallet, wodurch der stärkste Identifikator aus der obigen Tabelle entfällt.

Unterstützung dafür existiert in den Rust-Bibliotheken, auf denen viele Zcash-Wallets aufbauen. zcash_client_backend enthält ein Tor-Modul auf Basis von [Arti](https://tpo.pages.torproject.net/core/arti/), der Rust-Implementierung von Tor, sodass eine Wallet Synchronisierung, Transaktionsübertragung und Preisabfragen über Tor leiten kann, ohne einen separaten Tor-Client mitzuliefern.

Die Zaino-Entwickler argumentieren ähnlich und zitieren das Bedrohungsmodell direkt: Es gebe "a need to use anonymous transport protocols (such as Nym or Tor) to obfuscate clients' identities from Zcash's indexing servers".

In **ZODL** ist Tor eine Einstellung unter Advanced Settings. Die Release Notes der Wallet verweisen Nutzer auf den manuellen Verbindungsmodus "plus enabling Tor in Advanced Settings", wenn sie "prefer to reduce metadata exposure", und die App bietet an, Tor einzuschalten, bevor du eine Wallet wiederherstellst – also genau in dem Moment, in dem eine neue IP sonst mit der gesamten Wallet-Historie verknüpft würde.

Zwei Einschränkungen. Tor verbirgt deine IP vor dem Server, verändert aber nicht, was der Server aus den Anfragen lernen kann, die du stellst. Und Onion Routing erhöht die Latenz, sodass die Synchronisierung länger dauert. Ein eigener Server umgeht die Vertrauensfrage auf andere Weise, denn dann bist du selbst der Betreiber.

## Zaino, der Rust-Indexer

[Zaino](/site/Zcash_Tech/Zaino) ist ein in Rust geschriebener Indexer des Zingo-Teams, der als Ersatz für lightwalletd im Rahmen der Ablösung von zcashd entwickelt wurde. Er bedient Light Clients, Full Clients und Block-Explorer und liest chain-Daten, die von "either a Zebra or Zcashd full validator" gehalten werden.

Er befindet sich in aktiver Entwicklung; Version 0.7.0 wurde im August 2026 veröffentlicht. Wo immer möglich, soll er zu lightwalletd abwärtskompatibel bleiben, sodass Wallets auf ihn zeigen können, ohne neu geschrieben werden zu müssen.

Zaino hat eine eigene Seite mit Architekturdiagrammen, daher behandelt diese Seite nur seine Rolle als Light-Wallet-Server.

## Serverliste

Das Dashboard [hosh.zec.rocks](https://hosh.zec.rocks/zec) verfolgt öffentliche Server und ihren Zustand und ist der richtige Ort, um zu prüfen, was tatsächlich verfügbar ist. [status.zec.rocks](https://status.zec.rocks/) zeigt den Servicestatus.

Server, die zum Zeitpunkt des Schreibens auf diesem Dashboard gelistet waren:

| Server | Hinweise |
|:--|:--|
| zec.rocks:443 | Regionale Endpunkte sind daneben unter na.zec.rocks, eu.zec.rocks, ap.zec.rocks und sa.zec.rocks aufgeführt |
| zec-node.cakewallet.com:443 | Auf der Domain von Cake Wallet |
| zec.0xrpc.io:443 | Betrieben von 0xRPC, das kostenlose öffentliche Endpunkte für mehrere chains anbietet und um Spenden bittet, um die Kapazität zu decken |
| zaino.unsafe.zec.rocks:443 | Eine Zaino-Instanz. Beachte den Hostnamen und behandle sie als experimentell |
| testnet.zec.rocks:443 | Testnet, mit einer Zaino-Testnet-Instanz unter zaino.testnet.unsafe.zec.rocks |

Prüfe das Dashboard, statt dieser Liste zu vertrauen. Betreiber kommen und gehen, und eine Seite wie diese altert.

## Den Server in deiner Wallet ändern

Das lohnt sich, wenn du einen Betreiber auswählen möchtest, dem du vertraust, Aktivität auf mehrere Betreiber verteilen willst oder auf deinen eigenen Server zeigen möchtest.

Die untenstehenden Menüpfade waren korrekt, als diese Seite aktualisiert wurde, aber Wallet-Oberflächen ändern sich, also verstehe sie eher als Hinweis denn als exakten Pfad. Suche nach Advanced Settings oder einer Server-Option.

#### ZODL

Früher Zashi. Das Zahnrad oben rechts, dann Advanced Settings. Tor befindet sich auf demselben Bildschirm. ZODL bietet außerdem eine Verknüpfung zum Serverwechsel, wenn ein Synchronisierungsfehler dadurch verursacht wird, dass der Server veraltet ist.

#### Ywallet

Das Zahnrad oben rechts, dann der Reiter Zcash.

![Ywallet-Servereinstellungen](/content-images/b0a2910b-dbdf-4292-8e69-af5a386aa183-f51f098d19.webp)

#### Zingo

Das Hamburger-Menü oben links, dann Settings, dann nach unten scrollen.

![Zingo-Servereinstellungen](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

Das Hamburger-Menü oben links, dann Settings, dann Advanced.

![eZcash-Servereinstellungen](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Diese Screenshots wurden im März 2025 aufgenommen, und die Apps haben seitdem neue Versionen veröffentlicht, daher könnten sich Schaltflächen verschoben haben.

## Deinen eigenen betreiben

Die stärkste Option ist, selbst der eigene Betreiber zu sein, wodurch die Vertrauensfrage vollständig entfällt. Beide Server sind Open Source: [lightwalletd](https://github.com/zcash/lightwalletd) in Go und [Zaino](https://github.com/zingolabs/zaino) in Rust. Beide lesen von einem vollständigen Validator, daher wirst du auch [Zebra](/site/Zcash_Tech/Zebra_Full_Node) benötigen.

## Zusammenfassung

Light Wallets geben dir den Shielded Pool ohne den Speicherplatzbedarf, und das ist ein guter Tausch. Sei dir nur darüber im Klaren, was du eintauschst. Der Server kann deine Gelder nicht nehmen oder deine Shielded-Beträge lesen, aber er ist sehr gut positioniert, um deine IP-Adresse und den Zeitpunkt deiner Transaktionen zu sehen. Leite über Tor, wähle deinen Betreiber bewusst oder betreibe deinen eigenen.

**Zuletzt aktualisiert:** August 2026
