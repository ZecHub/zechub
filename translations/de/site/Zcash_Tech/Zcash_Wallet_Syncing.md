<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Zcash Wallet-Synchronisierung

## TL;DR

* Da abgeschirmte Zcash-Transaktionen ihre Details verbergen, kann ein Server nicht einfach den Kontostand einer Wallet nachschlagen, wie er es bei transparenten Coins wie Bitcoin oder Ethereum kann.
* Light Wallets laden kleine „kompakte Blöcke“ von einem spezialisierten Server (`lightwalletd`) herunter und entschlüsseln die relevanten Daten selbst mit ihren privaten Schlüsseln.
* Das Entschlüsseln und Verarbeiten dieser Blöcke braucht Zeit, daher verwenden Wallets schnellere Synchronisierungsmethoden, damit du dein Guthaben früher nutzen kannst.
* Bemerkenswerte Ansätze: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet) und das vorgeschlagene DAGSync.
* Diese Methoden tauschen im Allgemeinen zusätzlichen Speicherbedarf oder Rechenleistung gegen eine schnellere Synchronisierung ein.

## Kernerklärung

### Wie die Zcash-Synchronisierung funktioniert

Zcash verwendet Zero-Knowledge-Proofs, um Transaktionsdetails vor unbefugten Parteien abzuschirmen. Diese Privatsphäre erschwert die Synchronisierung für Light Wallets, weil sie die vollständige Blockchain nicht lokal speichern und stattdessen auf einen Server für die notwendigen Informationen angewiesen sind. Bei Bitcoin oder Ethereum können Server die Blockchain indizieren und Kontodaten schnell zurückgeben. Bei Zcash kann der Server jedoch die Transaktionsdetails nicht sehen. Wie kann also eine Light Wallet ihren Kontostand und Verlauf synchronisieren, ohne selbst die gesamte Blockchain herunterzuladen und zu entschlüsseln?

Zcash löst dieses Problem durch die Kombination mehrerer Ansätze. Es gibt einen spezialisierten Server, `lightwalletd`, der Daten von einem Full Node filtert und nur das behält, was für die Identifizierung von Transaktionen benötigt wird. Diese Daten werden als kompakte Blöcke bezeichnet und sind viel kleiner als die ursprünglichen Blöcke. Light Wallets laden diese kompakten Blöcke zunächst vom `lightwalletd`-Server herunter und entschlüsseln sie dann mit ihren privaten Schlüsseln.

Selbst das Entschlüsseln und Verarbeiten dieser kompakten Blöcke kann erheblich Zeit in Anspruch nehmen, besonders wenn es viele Transaktionen pro Block gibt. Deshalb verwenden Wallets verschiedene Methoden, um die Synchronisierung zu beschleunigen und dir zu ermöglichen, deine Mittel so schnell wie möglich zu verwenden.

## Visuell / Analogie

Stell dir die Blockchain als einen riesigen Postraum voller verschlossener Kisten vor. Bei einer transparenten Coin kann der Angestellte im Postraum die Etiketten lesen und dir sofort sagen, welche Kisten dir gehören. Bei Zcash sind die Etiketten verborgen — daher muss deine Wallet ihre Schlüssel nehmen und die Kisten selbst unauffällig prüfen, um diejenigen zu finden, die sie öffnen kann. Die folgenden Synchronisierungsmethoden sind unterschiedliche Strategien, um diese Kisten schneller zu prüfen.

## Detaillierte Betrachtung

### Warp Sync

Warp Sync ist eine Funktion von YWallet, die die Zwischenschritte des Entschlüsselns und Verarbeitens jedes kompakten Blocks überspringt und direkt zum Endergebnis springt.

Dazu nutzt es Mathematik und Kryptografie, um das Endergebnis zu berechnen, ohne jeden einzelnen Schritt zu durchlaufen.

Warp Sync kann Tausende von Blöcken pro Sekunde verarbeiten, viel schneller als die übliche Synchronisierungsmethode. Das bedeutet, dass YWallet-Nutzer eine schnelle und reibungslose Leistung genießen können, selbst bei Hunderttausenden von Transaktionen und empfangenen Notes in ihren Konten.

Abgesehen von dieser Technik zum Überspringen von Schritten kann YWallet mehrere Blöcke gleichzeitig verarbeiten und die Last auf die verfügbare Hardware verteilen, um den Prozess noch schneller zu machen.

Lies mehr über [Warp Sync](https://ywallet.app/warp/)

### Spend-before-sync

Spend-before-sync ist eine neue Funktion im Zcash Mobile Wallet SDK V2, die es Nutzern ermöglicht, Mittel sofort nach dem Öffnen ihrer Wallet auszugeben, ohne auf die vollständige Wallet-Synchronisierung zu warten. Diese Funktion beschleunigt die Ermittlung des ausgabefähigen Kontostands der Wallet und verbessert die Nutzererfahrung.

Spend-before-sync funktioniert mithilfe eines Synchronisierungsalgorithmus für kompakte Blöcke, der Blöcke vom `lightwalletd`-Server in nichtlinearer Reihenfolge verarbeitet. Das bedeutet, dass Wallets, anstatt zu warten, bis ein Block vollständig verarbeitet wurde, bevor sie weitermachen, etwas mehr Speicher und Rechenleistung nutzen können, um verschiedene Abschnitte der Blockchain zu scannen. Üblicherweise scannt es verschiedene Bereiche und sucht nach neueren Transaktionen, während die älteren Blöcke heruntergeladen und verarbeitet werden. Wenn eine aktuelle, nicht ausgegebene Note entdeckt wird, wird sie sofort verfügbar gemacht.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/363d08df-b7b7-461b-a386-251d9ad702ca" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Blaze Sync wurde vom Zecwallet-Team entwickelt und ist ein Synchronisierungsalgorithmus für Light Wallets, der die Blockchain rückwärts scannt, beginnend mit dem höchsten, neuesten Block und dann rückwärts weiterarbeitet.

Dadurch kann die Wallet ausgegebene Notes vor empfangenen finden und gleichzeitig zuvor nicht ausgegebene Notes verfügbar machen, ohne darauf zu warten, dass der vollständige Synchronisierungsvorgang abgeschlossen ist.

Darüber hinaus verwendet es Out-of-Order Sync, indem es die Komponenten der Synchronisierung voneinander entkoppelt — das Herunterladen von Blöcken, das Durchführen von Probe-Entschlüsselungen und das Aktualisieren von Witnesses — und sie parallel verarbeitet. Das benötigt mehr Speicher- und CPU-Ressourcen, erhöht aber die Synchronisierungsgeschwindigkeit um das Fünffache.
### DAGSync

DAGSync ist ein vorgeschlagener Synchronisierungsalgorithmus, der darauf abzielt, die Benutzererfahrung von abgeschirmten Zcash-Wallets zu verbessern, indem die Synchronisierung beschleunigt wird.

Er verwendet einen [Directed Acyclic Graph (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/), um die Abhängigkeiten zwischen Notes, Witnesses und Nullifiers in einer Zcash-Wallet darzustellen.

Ein DAG ist eine Datenstruktur, die aus Knoten und Kanten besteht, wobei jede Kante eine Richtung hat, die eine Beziehung zwischen zwei Knoten anzeigt. Ein DAG hat keine Zyklen, was bedeutet, dass es keine Möglichkeit gibt, von einem Knoten ausgehend den Kanten zu folgen und wieder zum selben Knoten zurückzukehren.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/eee7e08d-5c98-4c88-a48e-12f7a92a195f" alt="" width="110" height="230"/>
</a>

## Praktische Auswirkungen

Interessanterweise zielen all diese Mechanismen darauf ab, die Fragen zu beantworten, die von Zcash Security in seinem Beitrag über [Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) und dessen Beziehung zu privaten Zahlungssystemen aufgeworfen wurden. Einige gehen sogar noch einen Schritt weiter und laden alle Memo-Daten von Servern herunter, mit Ausnahme von Daten, die exklusiv zu einer Adresse gehören, wodurch die Privatsphäre auf Kosten eines kleinen zusätzlichen Ressourcenaufwands erhöht wird.

Außerdem hat sich die Zcash Foundation mit anderen Alternativen beschäftigt, um die Leistung von Light Wallets zu verbessern. Das ist der Fall bei [Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/), einer Konstruktion, die die Stiftung untersucht hat, „um festzustellen, ob sie eine mögliche Lösung für die jüngsten Leistungsprobleme bietet, von denen Zcash-Wallet-Nutzer betroffen waren.“

## Häufige Fehler

**Anzunehmen, dass der lightwalletd-Server deinen Kontostand kennt.** Der Server liefert nur kompakte Blöcke; deine Wallet entschlüsselt und interpretiert sie lokal mit deinen eigenen Schlüsseln.

**Die Synchronisierung zu früh zu stoppen.** Einige Methoden machen kürzlich empfangene ausgabefähige Mittel verfügbar, bevor eine vollständige Synchronisierung abgeschlossen ist, aber ältere Historie und Notes können noch immer in Bearbeitung sein.

**Die Zcash-Synchronisierung direkt mit der Synchronisierung einer transparenten Chain zu vergleichen.** Ein langsamerer Ablauf kann der Preis für den Schutz der Privatsphäre sein und kein Fehler — die Wallet erledigt Arbeit, die ein Public-Coin-Server andernfalls übernehmen würde, indem er dein Konto offen ausliest.


## Verwandte Seiten

- [Lightwallet-Knoten](/zcash-tech/lightwallet-nodes) — die lightwalletd-Infrastruktur, auf die Light Wallets angewiesen sind.
- [Viewing Keys](/zcash-tech/viewing-keys) — die Schlüssel, die Wallets verwenden, um ihre eigenen Notes zu erkennen und zu entschlüsseln.
- [Pepper Sync](/zcash-tech/pepper-sync) — ein weiterer Ansatz zur Synchronisierung von Zcash-Wallets.
- [FROST](/zcash-tech/frost) — verteilte Signaturautorität für abgeschirmte ZEC.
