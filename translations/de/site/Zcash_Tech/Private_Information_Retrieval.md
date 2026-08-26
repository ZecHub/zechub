# Privater Informationsabruf

## TL;DR

- Privater Informationsabruf, oder PIR, ermöglicht es einem Gerät, ein Element aus der Datenbank eines Servers abzurufen, ohne dass der Server erfährt, welches Element angefragt wurde
- Zcash braucht das, weil ein privates Wallet einen Server nicht fragen kann, welche Transaktionen die eigenen sind, ohne sich dabei zu verraten
- Heute laden Wallets weit mehr Daten herunter und scannen sie, als sie brauchen, was ein Hauptgrund dafür ist, dass die Synchronisierung langsam ist
- PIR würde es einem Wallet erlauben, nur die eigenen Daten privat abzurufen, diesen Engpass zu beseitigen und gleichzeitig die Privatsphäre zu wahren
- Es ist ein aktives Forschungsgebiet für Zcash, theoretisch sehr leistungsfähig und wird für echte Wallets praktikabel gemacht

<br/>

## Für wen ist das

- Für alle, die sich gefragt haben, wie ein privates Wallet seine eigenen Coins findet, ohne preiszugeben, welche es sind
- Für Neulinge, die PIR ständig im Zusammenhang mit der Skalierungsarbeit von Zcash erwähnt sehen
- Für Leser, die zuerst das Konzept und erst danach die zugrunde liegende Kryptografie verstehen wollen

<br/>

## Das Problem, das PIR für Zcash löst

Zcash verbirgt, für wen eine Transaktion bestimmt ist. Diese Privatsphäre schafft eine unangenehme Frage: Wenn das Netzwerk nicht sehen kann, welche Transaktionen zu dir gehören, wie findet dein eigenes Wallet sie dann?

Heute ist die Antwort grob. Ein Wallet kann einen Server nicht fragen, welche Transaktionen meine sind, weil diese Frage genau das offenlegen würde, was Zcash zu verbergen versucht. Stattdessen lädt das Wallet also eine große Menge an Daten herunter und prüft jedes Element lokal, um festzustellen, was ihm gehört. Das funktioniert und wahrt die Privatsphäre, aber es ist langsam und aufwendig. Dieses Scannen ist einer der Hauptgründe, warum sich die Wallet-Synchronisierung träge anfühlen kann.

Ideal wäre eine Möglichkeit, mit der ein Wallet einen Server gezielt nach genau den eigenen Daten fragen und sie erhalten kann, ohne dass der Server jemals erfährt, was angefordert wurde. Genau das bietet der private Informationsabruf.

<br/>

## Was PIR ist

Privater Informationsabruf ist eine kryptografische Methode, mit der ein Client einen Eintrag aus der Datenbank eines Servers lesen kann, ohne dem Server offenzulegen, welchen Eintrag er gelesen hat.

Stell dir eine Bibliothek vor, in der du genau das Buch bekommst, das du willst, ohne dass der Bibliothekar jemals erfährt, welches Buch er dir gegeben hat. Du erhältst dein Objekt, und dein Interesse bleibt privat. PIR ist die mathematische Version dieser Idee, angewandt auf jede beliebige Datenbank.

Das Konzept wird in der Kryptografie seit Jahrzehnten untersucht. Es wurde erstmals 1995 von Chor, Goldreich, Kushilevitz und Sudan eingeführt, die den Ansatz mit mehreren Servern beschrieben, und die erste Single-Server-Version folgte 1997 von Kushilevitz und Ostrovsky. Es ist also nichts, was Zcash erfunden hat, sondern ein etabliertes Forschungsfeld, das Zcash nun auf ein reales und hartnäckiges Problem anwendet.

<br/>

## Wie PIR auf einer ersten Ebene funktioniert

Es gibt zwei grobe Arten, PIR zu konstruieren, und der Unterschied ist wichtig.

Die erste verwendet mehrere Server. Der Client sendet jedem von mehreren Servern einen Teil der Anfrage und kombiniert deren Antworten lokal. Kein einzelner Server sieht genug, um zu erfahren, was angefragt wurde. Das ist effizient, setzt aber voraus, dass die Server nicht miteinander kolludieren, was sich in der realen Welt schwer garantieren lässt.

Die zweite verwendet einen einzelnen Server und clevere Kryptografie statt mehrerer Parteien. Hier stützt sich der Client auf ein spezielles Werkzeug namens homomorphe Verschlüsselung, und das ist die Richtung, die für reale Einsätze am nützlichsten ist, weil sie keine mehreren nicht kolludierenden Server braucht.

<br/>

## Der Mechanismus: homomorphe Verschlüsselung

Homomorphe Verschlüsselung ist eine Art von Verschlüsselung, die es einem Server erlaubt, mit Daten zu rechnen, während sie verschlüsselt bleiben. Der Server erzeugt eine korrekte verschlüsselte Antwort, ohne die zugrunde liegenden Werte jemals zu sehen.

Hier ist die Grundidee hinter Single-Server-PIR, das auf diese Weise aufgebaut ist. Der Client möchte Element Nummer drei aus einer Liste. Er erstellt eine Anfrage, die im Grunde ein verschlüsseltes Ja für Position drei und ein verschlüsseltes Nein für jede andere Position ist. Für den Server ist diese Anfrage nur bedeutungsloses Rauschen, er kann nicht erkennen, welche Position das Ja enthält.

Der Server kombiniert dann seine Datenbank mithilfe der besonderen Eigenschaften homomorpher Verschlüsselung mit dieser verschlüsselten Anfrage, indem er jedes gespeicherte Element mit dem passenden verschlüsselten Ja oder Nein multipliziert und die Ergebnisse zusammenaddiert. Heraus kommt ein einziges verschlüsseltes Paket, das genau das Element enthält, das der Client wollte, und nichts verrät, welches es war. Der Client entschlüsselt dieses Paket und liest sein Element. Der Server hat die Frage beantwortet, ohne die Frage jemals zu kennen.

Eine stärkere Version, genannt symmetrisches PIR, fügt eine zweite Garantie hinzu: Der Client erfährt nur das Element, nach dem er gefragt hat, und nichts über irgendeinen anderen Eintrag in der Datenbank. Das schützt die Datenbank ebenso wie den Client.

<br/>

## Ein genauerer Blick für technisch versierte Leser

Moderne Single-Server-Verfahren basieren auf Gitter-Kryptografie, meist auf der Annahme Learning With Errors. Die Anfrage des Clients ist ein Vektor aus Ciphertexts, eine Verschlüsselung von eins am Zielindex und null an allen anderen Stellen, und die Verschlüsselung ist additiv homomorph, sodass der Server Ciphertexts addieren und sie mit Klartext-Datenbankeinträgen multiplizieren kann, ohne zu entschlüsseln.

Der Server behandelt die Datenbank als Matrix, wendet den verschlüsselten Auswahlvektor an und gibt einen einzelnen Ciphertext zurück, der sich zur gewünschten Zeile entschlüsseln lässt. Weil die Anfrage von zufälligem Rauschen nicht zu unterscheiden ist, gewinnt der Server keine Information über den Index.

Das historische Hindernis waren immer die Kosten. Naiv betrachtet muss der Server für jede Anfrage jeden Eintrag in der Datenbank berühren, was rechnerisch teuer ist, und die Ciphertexts sind groß, was Bandbreite kostet. Neuere Forschung begegnet dem mit Vorverarbeitung; Verfahren wie SimplePIR und FrodoPIR erlauben es dem Server, die Datenbank im Voraus vorzubereiten und jedem Client einen kleinen Hinweis zu geben, wodurch ein Großteil der Arbeit in eine Offline-Phase verlagert wird, sodass Live-Anfragen schnell werden. Ein nützlicher Nebeneffekt ist, dass gitterbasierte Konstruktionen auch als resistent gegen Quantenangriffe gelten, was mit dem breiteren Schritt von Zcash hin zu post-quantenfester Privatsphäre übereinstimmt.

<br/>

## PIR in Zcash

PIR ist Teil der Bemühungen, Zcash sowohl privat als auch in großem Maßstab schnell zu machen.

Der zuvor beschriebene Engpass beim Wallet-Scanning ist das Ziel. Die Arbeit der Valar Group entwickelt Techniken des privaten Informationsabrufs, damit ein Wallet seine eigenen Daten von einem Server abrufen kann, ohne dass der Server erfährt, welche Einträge angefragt wurden. Eine konkrete Anwendung ist die private Prüfung von Nullifiers. Ein Nullifier ist ein eindeutiger Marker, der veröffentlicht wird, wenn eine Note ausgegeben wird, und verhindert, dass dieselben Mittel zweimal ausgegeben werden. Ein Wallet muss oft prüfen, ob ein bestimmter Nullifier bereits erschienen ist, also mit anderen Worten, ob eine Note noch nicht ausgegeben ist, und das heute über einen Server zu tun, kann offenlegen, nach welcher Note gefragt wird. Privater Informationsabruf ermöglicht es dem Wallet, diese Frage zu stellen, ohne preiszugeben, welcher Nullifier von Interesse ist. Das geschieht parallel zu anderer Skalierungsarbeit, darunter Project Tachyon und neue Knoten-Software, die darauf abzielt, die Leistungsgrenzen zu beseitigen, die private Wallets heute ausbremsen.

Es ist wichtig, ehrlich über den Stand zu sein. Das ist aktive Forschung und Entwicklungsarbeit, kein fertiges, ausgeliefertes Feature. Das Konzept ist gut etabliert und die Richtung steht fest, aber PIR effizient genug für alltägliche Wallets auf gewöhnlichen Geräten zu machen, ist genau der schwierige Teil, an dem derzeit gearbeitet wird.

<br/>

## Häufige Missverständnisse

- PIR verbirgt, welches Element du angefordert hast; es verbirgt nicht zwangsläufig, dass du den Server überhaupt kontaktiert hast, Metadaten auf Netzwerkebene sind ein separates Problem
- PIR ist nicht einzigartig für Zcash, es ist ein allgemeines kryptografisches Werkzeug, das Zcash auf Wallet-Privatsphäre anwendet
- Schnellere Synchronisierung durch PIR ist ein Ziel, an dem gearbeitet wird, kein Feature, das bereits in Wallets vorhanden ist
- Alles herunterzuladen und lokal zu scannen, der aktuelle Ansatz, ist privat, aber langsam; PIR zielt darauf ab, die Privatsphäre zu bewahren und gleichzeitig die Langsamkeit zu beseitigen

<br/>

## Verwandte Seiten

- [Zcash-Wallet-Synchronisierung](https://zechub.wiki/zcash-tech/zcash-wallet-syncing) - warum die Synchronisierung heute so funktioniert, wie sie funktioniert
- [Lightwallet-Knoten](https://zechub.wiki/zcash-tech/lightwallet-nodes) - das Light-Client-Modell, das PIR verbessern würde
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) - das andere wichtige kryptografische Werkzeug hinter der Privatsphäre von Zcash
- [Post-Quanten-Sicherheit](https://zechub.wiki/zcash-tech/post-quantum-security) - warum gitterbasierte Methoden für die Zukunft wichtig sind
