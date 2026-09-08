<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Synchronisierung von Zcash Wallets

## TL;DR

* Da abgeschirmte Zcash Transaktionen ihre Details verbergen, kann ein Server nicht einfach den Kontostand eines Wallets abfragen, wie er es bei transparenten Coins wie Bitcoin oder Ethereum kann.
* Light Wallets laden kleine „Compact Blocks“ von einem spezialisierten Server (lightwalletd) herunter und entschlüsseln die relevanten Daten selbst mit ihren privaten Schlüsseln.
* Das Entschlüsseln und Verarbeiten dieser Blöcke braucht Zeit, daher verwenden Wallets schnellere Synchronisierungsmethoden, damit du deine Gelder früher nutzen kannst.
* Bemerkenswerte Ansätze: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet) und das vorgeschlagene DAGSync.
* Diese Methoden tauschen im Allgemeinen zusätzlichen Speicher oder Rechenleistung gegen eine schnellere Synchronisierung ein.

## Grundlegende Erklärung

### Wie die Zcash Synchronisierung funktioniert

Zcash verwendet Zero-Knowledge-Proofs, um Transaktionsdetails vor unbefugten Parteien abzuschirmen. Diese Privatsphäre erschwert die Synchronisierung für Light Wallets, da sie die vollständige Blockchain nicht lokal speichern und sich stattdessen auf einen Server für die notwendigen Informationen verlassen. Bei Bitcoin oder Ethereum können Server die Blockchain indexieren und Kontodaten schnell zurückgeben. Bei Zcash kann der Server jedoch keine Transaktionsdetails sehen. Wie kann ein Light Wallet also seinen Kontostand und Verlauf synchronisieren, ohne die gesamte Blockchain selbst herunterzuladen und zu entschlüsseln?

Zcash löst dieses Problem durch die Kombination mehrerer Ansätze. Es verfügt über einen spezialisierten Server, lightwalletd, der Daten von einem vollständigen Knoten filtert und nur das für die Transaktionsidentifikation Erforderliche behält. Diese Daten werden Compact Blocks genannt und sind viel kleiner als die ursprünglichen Blöcke. Light Wallets laden diese Compact Blocks zunächst vom lightwalletd-Server herunter und entschlüsseln sie dann mit ihren privaten Schlüsseln.

Selbst das Entschlüsseln und Verarbeiten dieser Compact Blocks kann viel Zeit in Anspruch nehmen, besonders wenn es viele Transaktionen pro Block gibt. Daher nutzen Wallets unterschiedliche Methoden, um die Synchronisierung zu beschleunigen und dir die Nutzung deiner Gelder so schnell wie möglich zu ermöglichen.

## Visualisierung / Analogie

Stell dir die Blockchain als riesige Poststelle voller verschlossener Kisten vor. Bei einem transparenten Coin kann die Person am Schalter die Etiketten lesen und dir sofort sagen, welche Kisten dir gehören. Bei Zcash sind die Etiketten verborgen — daher muss dein Wallet seine Schlüssel nehmen und die Kisten selbst diskret prüfen, um diejenigen zu finden, die es öffnen kann. Die folgenden Synchronisierungsmethoden sind unterschiedliche Strategien, um diese Kisten schneller zu prüfen.

## Detaillierter Einblick

### Warp Sync

Warp Sync ist eine YWallet-Funktion, die die Zwischenschritte des Entschlüsselns und Verarbeitens jedes einzelnen Compact Blocks überspringt und direkt zum Endergebnis gelangt.

Dazu verwendet sie Mathematik und Kryptografie, um das Endergebnis zu berechnen, ohne jeden Schritt durchlaufen zu müssen.

Warp Sync kann Tausende von Blöcken pro Sekunde verarbeiten, deutlich schneller als die übliche Synchronisierungsmethode. Das bedeutet, dass YWallet-Nutzer eine schnelle und reibungslose Leistung genießen können, selbst mit Hunderttausenden von Transaktionen und empfangenen Notes in ihren Konten.

Neben dieser Technik des Überspringens von Schritten kann YWallet mehrere Blöcke gleichzeitig verarbeiten und die Last auf die verfügbare Hardware verteilen, um den Prozess noch weiter zu beschleunigen.

Lies mehr über [Warp Sync](https://ywallet.app/warp/)

> Warp Sync wird hier als Synchronisierungstechnik beschrieben. Ywallet selbst wird nicht mehr gepflegt und nicht für Ironwood aktualisiert, daher ist es heute kein Wallet, das installiert werden sollte.

### Spend-before-sync

Spend-before-sync ist eine neue Funktion im Zcash Mobile Wallet SDK V2, die es Nutzern ermöglicht, Gelder direkt beim Öffnen ihres Wallets auszugeben, ohne auf die vollständige Wallet-Synchronisierung zu warten. Diese Funktion beschleunigt die Ermittlung des ausgebbaren Kontostands des Wallets und verbessert die Nutzererfahrung.

Spend-before-sync funktioniert mithilfe eines Compact-Blocks-Synchronisierungsalgorithmus, der Blöcke vom lightwalletd-Server in einer nichtlinearen Reihenfolge verarbeitet. Das bedeutet, dass Wallets nicht darauf warten müssen, dass ein Block vollständig verarbeitet wird, bevor sie fortfahren, sondern etwas mehr Speicher und Rechenleistung nutzen können, um verschiedene Abschnitte der Blockchain zu durchsuchen. Üblicherweise durchsucht es verschiedene Bereiche und sucht nach neueren Transaktionen, während die älteren Blöcke heruntergeladen und verarbeitet werden. Wird eine kürzlich erstellte, nicht ausgegebene Note entdeckt, wird sie sofort verfügbar gemacht.

<a href="">
    <img src="/content-images/363d08df-b7b7-461b-a386-251d9ad702ca-a857cd8385.webp" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Blaze Sync wurde vom Zecwallet-Team entwickelt und ist ein Synchronisierungsalgorithmus für Light Wallets, der die Blockchain rückwärts durchsucht, beginnend mit dem höchsten, neuesten Block und dann rückwärts fortschreitend.

Dadurch kann das Wallet ausgegebene Notes vor den empfangenen finden und gleichzeitig zuvor nicht ausgegebene Notes verfügbar machen, ohne auf den Abschluss des vollständigen Synchronisierungsprozesses zu warten.

Darüber hinaus verwendet es Out-of-Order Sync, indem es die Komponenten der Synchronisierung voneinander entkoppelt — Blöcke herunterladen, Testentschlüsselungen durchführen und Witnesses aktualisieren — und sie parallel verarbeitet. Dies benötigt mehr Speicher- und CPU-Ressourcen, erhöht aber die Synchronisierungsgeschwindigkeit um das Fünffache.

### DAGSync

DAGSync ist ein vorgeschlagener Synchronisierungsalgorithmus, der die Nutzererfahrung von abgeschirmten Zcash Wallets durch eine schnellere Synchronisierung verbessern soll.

Er verwendet einen [gerichteten azyklischen Graphen (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/), um die Abhängigkeiten zwischen Notes, Witnesses und Nullifiers in einem Zcash Wallet darzustellen.

Ein DAG ist eine Datenstruktur, die aus Knoten und Kanten besteht, wobei jede Kante eine Richtung hat, die eine Beziehung zwischen zwei Knoten angibt. Ein DAG hat keine Zyklen, das heißt, es gibt keine Möglichkeit, von einem Knoten aus den Kanten zu folgen und wieder zum selben Knoten zurückzukehren.

<a href="">
    <img src="/content-images/eee7e08d-5c98-4c88-a48e-12f7a92a195f-316493530f.webp" alt="" width="110" height="230"/>
</a>

## Praktische Auswirkungen

Interessanterweise zielen all diese Mechanismen darauf ab, die Fragen aufzugreifen, die Zcash Security in seinem Beitrag über [Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) und dessen Beziehung zu privaten Zahlungssystemen aufwirft. Einige gehen sogar noch einen Schritt weiter und laden alle Memo-Daten von Servern herunter, ausgenommen Daten, die ausschließlich einer Adresse zugeordnet sind. Das erhöht die Privatsphäre auf Kosten einiger zusätzlicher Ressourcen.

Auch die Zcash Foundation untersucht andere Alternativen, um die Leistung von Light Wallets zu verbessern. Dazu gehört [Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/), eine Konstruktion, die die Foundation untersucht, „um festzustellen, ob sie eine mögliche Lösung für die jüngsten Leistungsprobleme bietet, von denen Zcash Wallet-Nutzer betroffen waren.“

## Häufige Fehler

**Anzunehmen, dass der lightwalletd-Server deinen Kontostand kennt.** Der Server liefert nur Compact Blocks; dein Wallet entschlüsselt und interpretiert sie lokal mit deinen eigenen Schlüsseln.

**Die Synchronisierung zu früh abzubrechen.** Einige Methoden stellen kürzlich verfügbare ausgebbare Gelder bereit, bevor eine vollständige Synchronisierung abgeschlossen ist, aber der ältere Verlauf und Notes können noch verarbeitet werden.

**Die Zcash Synchronisierung direkt mit der Synchronisierung transparenter Chains zu vergleichen.** Ein langsamerer Weg kann der Preis für den Erhalt der Privatsphäre sein, kein Fehler — das Wallet erledigt Arbeit, die ein Server für öffentliche Coins sonst durch das offene Lesen deines Kontos erledigen würde.


## Verwandte Seiten

- [Lightwallet-Knoten](/zcash-tech/lightwallet-nodes) — die lightwalletd-Infrastruktur, auf die Light Wallets angewiesen sind.
- [Viewing Keys](/zcash-tech/viewing-keys) — die Schlüssel, mit denen Wallets ihre eigenen Notes erkennen und entschlüsseln.
- [Pepper Sync](/zcash-tech/pepper-sync) — ein weiterer Ansatz zur Synchronisierung von Zcash Wallets.
- [FROST](/zcash-tech/frost) — verteilte Signaturbefugnis für abgeschirmte ZEC.
