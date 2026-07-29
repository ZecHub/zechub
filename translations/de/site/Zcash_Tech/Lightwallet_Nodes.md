<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>


# Zcash Lightwallet-Knoten

## Einführung

Zcash, eine datenschutzorientierte Kryptowährung, unterstützt eine Funktion namens „Lightwallet-Knoten“, die es Nutzern ermöglicht, mit der Zcash-Blockchain zu interagieren, ohne die gesamte Blockchain-Historie herunterzuladen. Diese Wiki-Seite bietet einen Überblick über Lightwallet-Knoten, die Rolle des Dienstes „lightwalletd“ im Zcash-Ökosystem, eine aktuelle Liste von Lightwallet-Knoten-Servern sowie Anleitungen dazu, wie man Server in beliebten Wallets wie Ywallet und Zingo wechselt.

## Lightwalletd-Dienst

Der Dienst „lightwalletd“, kurz für „lightwallet daemon“, spielt eine entscheidende Rolle im Ökosystem der Zcash-Lightwallet-Knoten. Er fungiert als Vermittler, der leichtgewichtigen Clients (Lightwallets) die Informationen bereitstellt, die sie benötigen, um effektiv zu funktionieren. Hier ist eine kurze Erklärung des lightwalletd-Dienstes:

__Datenaggregator__: Lightwalletd bündelt Daten aus der Zcash-Blockchain, wie Transaktionsinformationen, Blockdaten und Informationen zu abgeschirmten Pools.

__Vereinfachte Verifizierung__: Lightwalletd führt eine vereinfachte Verifizierung dieser Daten durch, sodass Lightwallets auf notwendige Informationen zugreifen können, ohne die gesamte Blockchain validieren zu müssen.

__Wahrung der Privatsphäre__: Der Dienst schützt die Privatsphäre von Zcash-Nutzern, da diese weder ihre Viewing Keys noch persönliche Transaktionsinformationen offenlegen müssen.

__Effiziente Synchronisierung__: Lightwalletd ermöglicht eine effiziente Synchronisierung für Lightwallets und reduziert dabei deutlich die Zeit und Ressourcen, die benötigt werden, um mit der Zcash-Blockchain auf dem neuesten Stand zu sein.


## Aktuelle Liste der Lightwalletd-Server

* [status.zec.rocks](https://status.zec.rocks/)
* [hosh.zec.rocks](https://hosh.zec.rocks/zec)

## Serverwechsel in mobilen Wallets

Das Ändern des Lightwallet-Knoten-Servers ist relativ unkompliziert. Finden und öffnen Sie die erweiterten Einstellungen innerhalb der Anwendung.

__Ywallet/Zingo/Zashi/eZcash öffnen__: Starten Sie die Wallet Ihrer Wahl auf Ihrem Gerät.

#### Ywallet:

Bei Ywallet ist es das Zahnradsymbol in der oberen rechten Ecke – gehen Sie zum Zcash-Tab. 

![SmartSelect_20250313_105128](https://github.com/user-attachments/assets/b0a2910b-dbdf-4292-8e69-af5a386aa183)

#### Zingo:

Bei Zingo befindet es sich im Hamburger-Menü in der oberen linken Ecke. Klicken Sie dann auf Einstellungen und scrollen Sie nach unten.

![SmartSelect_20250313_105737_Zingo](https://github.com/user-attachments/assets/ea8f7672-e644-41a5-a422-db131740404a)

#### Zashi:

Bei Zashi ist es das Zahnradsymbol in der oberen rechten Ecke – gehen Sie zu den erweiterten Einstellungen und wählen Sie dann einen Server aus.

![SmartSelect_20250313_110200_Zashi](https://github.com/user-attachments/assets/5a9d050a-8308-4cc2-907e-513072066aed)

#### eZcash

Bei eZcash befindet es sich im Hamburger-Menü in der oberen linken Ecke. Klicken Sie dann auf Einstellungen und tippen Sie auf Erweitert.

![SmartSelect_20250313_110616](https://github.com/user-attachments/assets/655c0172-61a0-4322-b8cf-4eee4bb53b51)


## Fazit

Die Lightwallet-Knoten von Zcash und der lightwalletd-Dienst bieten Nutzern eine bequeme und datenschutzfreundliche Möglichkeit, mit der Blockchain zu interagieren. Die Möglichkeit, Server zu wechseln, bietet Flexibilität bei der Auswahl eines Knotens, der Ihren Anforderungen am besten entspricht.
