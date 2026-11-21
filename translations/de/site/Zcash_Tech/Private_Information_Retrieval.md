# Private Information Retrieval

## TL;DR

- Private Information Retrieval (PIR) ermöglicht es einem Gerät, einen Eintrag aus der Datenbank eines Servers abzurufen, ohne dass der Server erfährt, nach welchem Eintrag gefragt wurde
- Zcash benötigt das, weil eine private Wallet einen Server nicht fragen kann, welche Transaktionen zu ihr gehören, ohne sich dadurch zu verraten
- Heute laden Wallets weit mehr Daten herunter, als sie benötigen, und durchsuchen sie. Das ist ein wichtiger Grund für langsame Synchronisierung
- Mit PIR könnte eine Wallet privat nur ihre eigenen Daten abrufen. So ließe sich dieser Engpass beseitigen, ohne den Datenschutz zu beeinträchtigen
- PIR ist ein aktives Forschungsgebiet für Zcash, in der Theorie leistungsstark und wird für den praktischen Einsatz in echten Wallets weiterentwickelt
- Eine Live-Demonstration ist bereits verfügbar: [ZecBlock Private](https://private.zecblock.com) ist der erste vollständige PIR-basierte Zcash-Block-Explorer für Transaktionen, Blöcke und Adressen

## Für wen ist das gedacht?

- Für alle, die sich gefragt haben, wie eine private Wallet ihre eigenen Coins findet, ohne zu verraten, um welche es sich handelt
- Für Neueinsteiger, die PIR immer wieder im Zusammenhang mit Zcash-Skalierungsarbeiten sehen
- Für Leser, die zuerst das Konzept und danach die zugrunde liegende Kryptografie kennenlernen möchten
- Für alle, die sich für einen funktionierenden PIR-basierten Block-Explorer interessieren

## Das Problem, das PIR für Zcash löst

Zcash verbirgt, für wen eine Transaktion bestimmt ist. Dieser Datenschutz wirft eine knifflige Frage auf: Wenn das Netzwerk nicht sehen kann, welche Transaktionen zu dir gehören, wie findet deine Wallet sie dann?

Heute ist die Antwort einfach: Eine Wallet kann einen Server nicht fragen, welche Transaktionen meine sind, denn diese Frage würde genau das offenlegen, was Zcash verbergen soll. Stattdessen lädt die Wallet eine große Datenmenge herunter und prüft lokal jeden Eintrag darauf, ob er zu ihr gehört. Das funktioniert und schützt die Privatsphäre, ist aber langsam und aufwendig. Diese Suche ist einer der Hauptgründe, warum die Synchronisierung einer Wallet träge wirken kann.

Ideal wäre eine Möglichkeit für die Wallet, einen Server genau nach ihren eigenen Daten zu fragen und sie abzurufen, ohne dass der Server jemals erfährt, wonach gefragt wurde. Genau das ermöglicht Private Information Retrieval.

## Was ist PIR?

Private Information Retrieval ist ein kryptografisches Verfahren, mit dem ein Client einen Eintrag aus der Datenbank eines Servers lesen kann, ohne dem Server zu verraten, welchen Eintrag er gelesen hat.

Stell dir eine Bibliothek vor, in der du genau das gewünschte Buch bekommst, die Bibliothekarin aber nie erfährt, welches Buch sie dir gegeben hat. Du erhältst den gewünschten Eintrag, und dein Interesse bleibt privat. PIR ist die mathematische Umsetzung dieser Idee für beliebige Datenbanken.

Das Konzept wird seit Jahrzehnten in der Kryptografie erforscht. Es wurde erstmals 1995 von Chor, Goldreich, Kushilevitz und Sudan vorgestellt, die den Ansatz mit mehreren Servern beschrieben. Die erste Version mit nur einem Server folgte 1997 von Kushilevitz und Ostrovsky. Zcash hat das nicht erfunden. Es ist ein etabliertes Forschungsgebiet, das Zcash nun auf ein reales und hartnäckiges Problem anwendet.

## Wie PIR grundsätzlich funktioniert

Es gibt zwei grundlegende Ansätze für PIR, und der Unterschied ist wichtig.

Der erste Ansatz verwendet mehrere Server. Der Client sendet jedem von mehreren Servern einen Teil der Anfrage und kombiniert ihre Antworten lokal. Kein einzelner Server sieht genug, um zu erfahren, wonach gefragt wurde. Das ist effizient, setzt aber voraus, dass die Server nicht miteinander kolludieren – eine Bedingung, die sich in der realen Welt nur schwer garantieren lässt.

Der zweite Ansatz verwendet einen einzelnen Server und ausgeklügelte Kryptografie statt mehrerer Parteien. Hier nutzt der Client ein spezielles Verfahren namens homomorphe Verschlüsselung. Für den praktischen Einsatz ist dieser Ansatz besonders nützlich, weil er keine mehreren Server benötigt, die nicht miteinander kolludieren.

## Das Verfahren: homomorphe Verschlüsselung

Homomorphe Verschlüsselung ist eine Art der Verschlüsselung, mit der ein Server Berechnungen auf Daten ausführen kann, während sie verschlüsselt bleiben. Der Server erstellt eine korrekte, verschlüsselte Antwort, ohne jemals die zugrunde liegenden Werte zu sehen.

So funktioniert Single-Server-PIR mit diesem Verfahren: Der Client möchte den dritten Eintrag einer Liste abrufen. Er erstellt eine Anfrage, die im Grunde ein verschlüsseltes Ja für Position drei und ein verschlüsseltes Nein für alle anderen Positionen enthält. Für den Server ist diese Anfrage nur bedeutungsloses Rauschen. Er kann nicht erkennen, an welcher Position sich das Ja befindet.

Anschließend verknüpft der Server seine Datenbank mithilfe der besonderen Eigenschaften der homomorphen Verschlüsselung mit dieser verschlüsselten Anfrage: Er multipliziert jeden gespeicherten Eintrag mit dem jeweils passenden verschlüsselten Ja oder Nein und addiert die Ergebnisse. Das Resultat ist ein einzelnes verschlüsseltes Paket, das genau den gewünschten Eintrag enthält, ohne preiszugeben, welcher es ist. Der Client entschlüsselt das Paket und liest den Eintrag. Der Server hat die Anfrage beantwortet, ohne jemals zu erfahren, worum es ging.

Eine stärkere Variante namens symmetrisches PIR bietet eine zusätzliche Garantie: Der Client erfährt nur den angefragten Eintrag und nichts über andere Einträge in der Datenbank. Dadurch wird auch die Datenbank geschützt.

## Ein genauerer Blick für technisch Interessierte

Moderne Single-Server-Verfahren basieren auf Gitterkryptografie, meist auf der Annahme „Learning with Errors“. Die Anfrage des Clients ist ein Vektor aus Chiffretexten: Am Zielindex steht die Verschlüsselung einer Eins, an allen anderen Stellen die einer Null. Die Verschlüsselung ist additiv homomorph, sodass der Server Chiffretexte addieren und mit unverschlüsselten Datenbankeinträgen multiplizieren kann, ohne sie zu entschlüsseln.

Der Server behandelt die Datenbank als Matrix, wendet den verschlüsselten Auswahlvektor an und gibt einen einzelnen Chiffretext zurück, der nach dem Entschlüsseln die gewünschte Zeile ergibt. Da die Anfrage nicht von zufälligem Rauschen zu unterscheiden ist, erfährt der Server nichts über den Index.

Die Kosten waren schon immer das zentrale Hindernis. Auf naive Weise müsste der Server für jede Anfrage jeden Eintrag in der Datenbank verarbeiten. Das ist rechenintensiv; außerdem sind die Chiffretexte groß, was viel Bandbreite kostet. Neuere Forschung begegnet dem mit Vorverarbeitung. Verfahren wie SimplePIR und FrodoPIR ermöglichen es dem Server, die Datenbank im Voraus aufzubereiten und jedem Client einen kleinen Hinweis zu geben. Dadurch wird ein großer Teil der Arbeit in eine Offline-Phase verlagert und die Abfrage in Echtzeit beschleunigt. Ein nützlicher Nebeneffekt: Gitterbasierte Konstruktionen gelten auch als widerstandsfähig gegen Quantenangriffe. Das passt zu Zcashs umfassenderem Schritt hin zu postquantenfähigem Datenschutz.

## PIR in Zcash

PIR ist Teil der Bemühungen, Zcash auch bei großer Skalierung privat und schnell zu machen.

Der zuvor beschriebene Engpass beim Durchsuchen der Wallet-Daten ist das Ziel. Bei Valar Group werden Verfahren für Private Information Retrieval entwickelt, damit eine Wallet ihre eigenen Daten von einem Server abrufen kann, ohne dass dieser erfährt, welche Einträge angefragt wurden. Eine konkrete Anwendung ist die private Prüfung von Nullifiern. Ein Nullifier ist eine eindeutige Markierung, die veröffentlicht wird, wenn eine Note ausgegeben wird, und verhindert, dass dieselben Mittel zweimal ausgegeben werden. Eine Wallet muss häufig prüfen, ob ein bestimmter Nullifier bereits erschienen ist – also, ob eine Note noch nicht ausgegeben wurde. Eine solche Prüfung über einen Server kann heute verraten, um welche Note es geht. Mit Private Information Retrieval kann die Wallet diese Frage stellen, ohne offenzulegen, welcher Nullifier sie interessiert. Das ergänzt andere Skalierungsarbeiten, darunter Project Tachyon und neue Software für Knoten. Sie sollen die Leistungsgrenzen beseitigen, die private Wallets heute ausbremsen.

Es ist wichtig, den Entwicklungsstand ehrlich einzuordnen: Das ist aktive Forschung und Entwicklungsarbeit, keine fertige, veröffentlichte Funktion. Das Konzept ist gut etabliert und die Richtung steht fest. Die Schwierigkeit, an der derzeit gearbeitet wird, besteht darin, PIR effizient genug für den Alltagseinsatz auf gewöhnlichen Geräten zu machen.

## Live-Beispiel: ZecBlock Private

Im November 2026 startete ZecBlock **ZecBlock Private** (private.zecblock.com), eine Version seines Explorers, die Private Information Retrieval für die Suche nach Transaktionen, Blöcken und Adressen verwendet.

Das ist der erste vollständige Zcash-Block-Explorer, der auf PIR basiert und Transaktionen, Blöcke sowie Adressen abdeckt. Frühere PIR-Demos für Explorer beschränkten sich auf engere Abfragen, etwa nach Adressguthaben.

### So funktionieren private Abfragen

- Die Anfrage (Transaktions-ID, Blockhöhe oder Hash oder Adresse) wird vollständig im Browser verschlüsselt, bevor sie gesendet wird.
- Der Server verarbeitet den gesamten veröffentlichten Datensatz, ohne zu erfahren, welcher Eintrag angefragt wurde.
- Der Server sendet eine einzelne verschlüsselte Antwort zurück, die nur der Browser entschlüsseln kann.
- Eine Suche nach einem vorhandenen Eintrag ist nicht von einer Suche nach einem nicht vorhandenen Eintrag zu unterscheiden (gleiche Anfragegröße und -struktur).

Nach jeder Suche zeigt die Website eine kurze Zusammenfassung dessen an, was genau gesendet wurde. So lässt sich die Datenschutzeigenschaft leicht überprüfen.

### Überprüfung

Jede Datenveröffentlichung ist signiert. Der Browser überprüft die Signatur jedes Ergebnisses, bevor er es anzeigt. So kann ein böswilliger oder fehlerhafter Server keine anderen Daten unterschieben.

### Aktualität der Daten

Neue Blöcke werden alle paar Sekunden veröffentlicht. Die Daten im privaten Explorer sind normalerweise höchstens etwa 20 Sekunden älter als die im regulären ZecBlock-Explorer.

### Bandbreitenkosten

PIR ist teurer als eine normale Abfrage, weil der Server den gesamten Datensatz verarbeiten muss:

- Transaktionsabfrage: ungefähr 1,2 MB Upload
- Adressabfrage: ungefähr 0,4 MB Upload

Das ist der praktische Preis dafür, dass der Server nichts über die Anfrage erfährt.

### Client-Implementierung

Der Browser-Client ist ein Wrapper von Rust → WebAssembly (derzeit im Repository ZecBlock unter `prototype/pir-browser`). Er basiert auf Open-Source-PIR-Bibliotheken von Valar Group. Der Wrapper ist noch nicht als eigenständiges npm-Paket veröffentlicht, das ist aber geplant.

### Abgrenzung zu Wallet-PIR

ZecBlock Private demonstriert PIR für **öffentliche** Blockchain-Daten: Man kann eine bekannte Transaktion, einen bekannten Block oder eine bekannte Adresse abrufen, ohne zu verraten, wonach gesucht wurde. Damit wird **nicht** das schwierigere Wallet-Problem gelöst, privat herauszufinden, welche Notes zu einem Viewing Key gehören, oder Nullifier für noch nicht ausgegebene Notes privat zu prüfen. Das sind weiterhin aktive Forschungsgebiete.

## Häufige Missverständnisse

- PIR verbirgt, welchen Eintrag du angefragt hast. Es verbirgt nicht unbedingt, dass du den Server überhaupt kontaktiert hast; Metadaten auf Netzwerkebene sind eine separate Frage
- PIR ist nicht auf Zcash beschränkt. Es ist ein allgemeines kryptografisches Werkzeug, das Zcash für den Schutz der Wallet-Privatsphäre einsetzt
- Eine schnellere Synchronisierung durch PIR ist ein laufendes Ziel und noch keine Funktion, die bereits in Wallets verfügbar ist
- Alles herunterzuladen und lokal zu durchsuchen ist der aktuelle Ansatz. Er schützt die Privatsphäre, ist aber langsam. PIR soll den Datenschutz erhalten und zugleich die Verzögerung beseitigen

## Verwandte Seiten

- [Zcash Wallet-Synchronisierung](https://zechub.wiki/zcash-tech/zcash-wallet-syncing) – warum die Synchronisierung heute so funktioniert
- [Lightwallet-Knoten](https://zechub.wiki/zcash-tech/lightwallet-nodes) – das Light-Client-Modell, das PIR verbessern könnte
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) – das andere wichtige kryptografische Werkzeug hinter dem Datenschutz von Zcash
- [Postquanten-Sicherheit](https://zechub.wiki/zcash-tech/post-quantum-security) – warum gitterbasierte Verfahren für die Zukunft wichtig sind
- [ZecBlock](https://zecblock.com) – der wichtigste öffentliche Explorer
- [Valar Group](https://zechub.wiki/zcash-organizations/valar-group) – Entwickler der PIR-Bibliotheken, die sowohl vom Explorer-Prototyp als auch in der Wallet-Forschung verwendet werden
