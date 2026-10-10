<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Shielded_Coinholder_Voting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Abstimmung abgeschirmter Coin-Inhaber

> Im August 2026 führte Zcash eine Umfrage unter Coin-Inhabern durch, bei der die Stimmzettel verschlüsselt blieben und nur die Endergebnisse offengelegt wurden, unter Verwendung eines von Valar Group entwickelten abgeschirmten Abstimmungsprotokolls.

Das nehmen Sie mit: Wie eine Abstimmung danach gewichtet werden kann, wie viel ZEC Sie halten, privat bleibt und dennoch korrekt gezählt wird – ohne dass jemand erfährt, wie Sie abgestimmt haben oder wie viel Sie besitzen.

Die Abstimmung abgeschirmter Coin-Inhaber ermöglicht es Inhabern von Zcash, mithilfe ihres abgeschirmten ZEC über Fragen des Ökosystems abzustimmen. Niemand erfährt, wie eine einzelne Person abgestimmt hat oder wie viel ZEC sie hält, dennoch kann jeder prüfen, dass die Gesamtsummen korrekt sind. Sie läuft auf einer dedizierten Abstimmungs-Blockchain, die von Valar Group entwickelt wurde und vom Zcash-Mainnet getrennt ist, sodass Ihre tatsächlichen Gelder nie bewegt werden. Wie Zcash allgemein Entscheidungen trifft, erfahren Sie in der Übersicht zu [Zcash Finanzierung und Governance](../zcash-community/zcash-governance). Diese Seite behandelt ausschließlich das kryptografische Abstimmungsprotokoll.

Neu bei Zcash? Beginnen Sie mit [Was ist ZEC und Zcash](../start-here/what-is-zec-and-zcash), [Abgeschirmte Pools](../using-zcash/shielded-pools) und [zk-SNARKs](../zcash-tech/zk-snarks) und kehren Sie dann hierher zurück.

![Shielded voting flow: a voter proves their Ironwood balance at a snapshot, casts an encrypted ballot split into shares, which are homomorphically tallied and then threshold-decrypted into totals only](/content-images/shielded-voting-flow.webp)

## Warum private Abstimmungen schwierig sind

Eine gute Abstimmung unter Coin-Inhabern soll vier Dinge zugleich erreichen, doch die naheliegenden Wege dorthin stehen miteinander im Konflikt.

1. Gewichtung nach Einsatz, sodass das Halten von mehr ZEC mehr Gewicht verleiht.
2. Privatsphäre der Wahl, sodass niemand erfährt, wie Sie abgestimmt haben.
3. Privatsphäre des Guthabens, sodass niemand erfährt, wie viel ZEC Sie halten.
4. Eine korrekte, prüfbare Auszählung, die jeder kontrollieren kann.

Für eine Gewichtung nach Einsatz scheint das Guthaben aller benötigt zu werden. Um Stimmzettel auszuzählen, scheint man sie öffnen zu müssen. Beides auf naive Weise zu tun, würde genau die privaten Informationen preisgeben, die ein [abgeschirmter Pool](../using-zcash/shielded-pools) schützen soll; frühere Coin-Abstimmungen haben deshalb tatsächlich Guthabeninformationen offengelegt. Abgeschirmte Abstimmungen lösen diesen Zielkonflikt mit denselben Werkzeugen, die abgeschirmte Zahlungen ermöglichen: [Zero-Knowledge-Beweise](../zcash-tech/zk-snarks), Nullifier und Verschlüsselung.

## Die Intuition: eine Wahlurne, die sich selbst auszählt

> Mit einem Drehkreuz lässt sich zählen, was durch einen Banktresor gelangt, ohne hineinzusehen. Eine abgeschirmte Wahlurne geht noch einen Schritt weiter: Sie summiert versiegelte Stimmen, ohne sie jemals zu öffnen.

Stellen Sie sich eine Wahlurne mit drei ungewöhnlichen Fähigkeiten vor. Sie kann einen versiegelten Umschlag zu einer laufenden Summe hinzufügen, ohne ihn zu öffnen. Eine Gruppe von Amtsträgern, von denen keiner allein den Schlüssel besitzt, gibt später nur die endgültigen Summen bekannt. Und bevor Sie einen Umschlag einwerfen dürfen, weisen Sie unauffällig nach, dass Sie zu einem festen Zeitpunkt in der Vergangenheit ZEC hielten und noch nicht abgestimmt haben, ohne zu zeigen, welche Coins Ihnen gehören. Im Folgenden wird erklärt, wie diese Urne tatsächlich gebaut wird.

## Teilnahmeberechtigung und der Snapshot

Eine Abstimmungsrunde legt eine Snapshot-Höhe fest, einen einzelnen Zcash-Mainnet-Block, und Ihr Gewicht entspricht Ihrem verfügbaren abgeschirmten Guthaben im [Ironwood](../zcash-tech/ironwood)-Pool in diesem Block. Die Regel lautet einfach: Ein Ironwood ZEC zum Zeitpunkt des Snapshots entspricht einer Stimme. Für die Bereichsumfrage von NU7 war der Snapshot der Mainnet-Block 3.459.350, etwa am 24. August 2026 um 19:00 UTC; die Abstimmung war bis zum 14. September 2026 um 19:00 UTC geöffnet. Transparentes ZEC wird getrennt nach der älteren Methode behandelt, nicht durch dieses Protokoll.

1. Ihre Gelder werden niemals bewegt oder gesperrt. Die Teilnahmeberechtigung wird beim Snapshot festgelegt, sodass Sie ZEC unmittelbar danach ausgeben oder bewegen können, ohne dass dies Ihre Stimme beeinflusst.
2. Es gibt keinen Registrierungsschritt. Eine Snapshot-Höhe genügt, was den Prozess schlank hält und verhindert, dass offengelegt wird, wer abstimmen möchte.

## Ihr Guthaben nachweisen, ohne es offenzulegen

Wenn Sie abstimmen, erzeugt Ihre Wallet einen Zero-Knowledge-Beweis dafür, dass Sie zum Zeitpunkt des Snapshots über ein nicht ausgegebenes abgeschirmtes ZEC verfügten. Er bestätigt der privaten Auszählungsinfrastruktur ein gültiges Guthaben und dessen Höhe, offenbart jedoch keine Notizen und erzeugt keine Transaktion im Zcash-Mainnet.

Dieser Beweis prägt auf der Abstimmungs-Blockchain ein Abstimmungsguthaben in Höhe Ihres Snapshot-Guthabens, das einem frischen Abstimmungsschlüssel gehört, den Ihre Wallet nur für diese Runde erzeugt. Da der Schlüssel neu ist und nicht mit Ihren Zcash-Adressen verbunden ist, kann nichts auf der Abstimmungs-Blockchain zu Ihren tatsächlichen Notizen zurückverfolgt werden. Ihre On-Chain-Identität und Ihr Stimmzettel sind konstruktionsbedingt nicht verknüpfbar.

## Doppelabstimmungen privat verhindern

Um zu verhindern, dass jemand zweimal mit denselben Coins abstimmt, muss das System bestätigen, dass die Notizen hinter Ihrem Guthaben beim Snapshot nicht ausgegeben waren. Im Mainnet geschieht dies durch Offenlegung des Nullifiers einer Notiz, ihrer eindeutigen Markierung für eine Ausgabe, die vollständige Knoten auf Wiederverwendung prüfen. Würde Ihr Nullifier hier jedoch offengelegt, würde Ihr Stimmzettel direkt mit Ihren Notizen verknüpft.

![Private double-vote prevention: instead of revealing a nullifier, the wallet uses Private Information Retrieval to fetch proof material while hiding which nullifier it asked about, then proves the note was unspent](/content-images/shielded-voting-pir.webp)

Das Protokoll beweist daher privat das Gegenteil. Es erstellt eine Liste aller Nullifier, die zum Zeitpunkt des Snapshots bereits verwendet wurden, und Ihre Wallet beweist per Zero Knowledge, dass der Nullifier Ihrer Notiz nicht in dieser Liste steht. Damit zeigt sie, dass die Notiz nicht ausgegeben war, ohne offenzulegen, um welche Notiz es sich handelt.

Ein Problem bleibt. Das Abrufen des benötigten Ausschnitts dieser Liste von einem Server würde dem Server Ihren Nullifier offenlegen, und die vollständige Liste ist groß: ungefähr 2 GB für Daten aus der Orchard-Ära und deutlich größer, je mehr Zcash wächst. [Private Information Retrieval](../zcash-tech/private-information-retrieval) (PIR) löst beides: Ihre Wallet ruft genau die benötigten Daten ab und verbirgt dabei kryptografisch, welche Daten sie angefordert hat. Das Ergebnis wird gegen eine veröffentlichte Zusammenfassung der Nullifier-Liste geprüft, sodass ein unehrlicher Server kein gefälschtes Ergebnis erzeugen kann.

## Einen verschlüsselten Stimmzettel abgeben

Für jede Frage erledigt Ihre Wallet drei Dinge.

1. Sie verschlüsselt Ihr Stimmgewicht für das Auszählungskomitee mittels homomorpher Verschlüsselung, einer Verschlüsselungsart, deren Chiffretexte addiert werden können, ohne entschlüsselt zu werden. Dadurch kann die Urne Stimmen summieren, die sie nicht lesen kann.
2. Sie teilt Ihre Stimme in 16 separate Anteile auf, sodass selbst ein vollständig kolludierendes Komitee Schwierigkeiten hätte, zu rekonstruieren, wie viel eine einzelne Person abgestimmt hat.
3. Sie übermittelt diese Anteile zu zufälligen Zeitpunkten über mehrere Server, sodass ein Beobachter anhand ihres Eingangszeitpunkts nicht erkennen kann, dass die Anteile zum selben Wähler gehören.

Jeder Anteil enthält seinen eigenen Zero-Knowledge-Beweis, dass er ein legitimer Teil eines gültigen Stimmzettels ist, sodass niemand ungedeckte Stimmen hinzufügen kann. Verifizierte Anteile werden homomorph zur verschlüsselten laufenden Summe für Ihre gewählte Antwort addiert.

## Auszählen, ohne einen Stimmzettel zu öffnen

Die Auszählung wird von einer verteilten Wahlbehörde durchgeführt: mindestens 10 Validatoren der Abstimmungs-Blockchain, von denen keiner allein etwas entschlüsseln kann. Zu Beginn einer Runde führen sie gemeinsam eine Schlüsselerzeugungszeremonie durch, die einen Verschlüsselungsschlüssel erzeugt, dessen passender Entschlüsselungsschlüssel auf alle verteilt wird und nie an einem Ort zusammengeführt wird.

> Kein einzelner Amtsträger besitzt den Schlüssel. Die Urne wird erst geöffnet, wenn zwei Drittel von ihnen ihre Schlüssel gemeinsam einsetzen, und selbst dann gibt sie nur die Summen preis.

Nach Abschluss der Runde existieren die verschlüsselten Summen bereits durch die oben beschriebene homomorphe Addition. Jeder Validator veröffentlicht eine Teilentschlüsselung sowie einen Beweis für deren korrekte Durchführung. Sobald mindestens zwei Drittel beigetragen haben, werden ihre Teile zur endgültigen Klartextauszählung für jede Frage kombiniert; sonst wird nichts entschlüsselt. Jeder vollständige Knoten kann anschließend den kombinierten Korrektheitsbeweis prüfen, sodass die Öffentlichkeit die Auszählung verifizieren kann, ohne den Validatoren vertrauen zu müssen.

## Wer es betreibt und was diese Parteien nicht tun können

Das Design trennt zwei Rollen, damit keine Gruppe zu viel Macht besitzt.

![Separation of powers: a coordinator multisig sets which questions appear but cannot see votes, while a validator set counts but cannot read individual ballots or forge a tally](/content-images/shielded-voting-roles.webp)

Die Koordinator-Multisig ist eine 2-von-5-Gruppe mit Vertretern von Project Tachyon, [Zcash Foundation](../zcash-organizations/zcash-foundation), ZODL, [Shielded Labs](../zcash-organizations/shielded-labs) und Valar Group. Sie entscheidet, welche Fragen die Blockchain erreichen, und bestätigt den Verschlüsselungsschlüssel jeder Runde, kann jedoch einzelne Stimmen weder sehen noch verändern oder blockieren. Jeder, dem die Fragen nicht gefallen, kann seine eigene Abstimmungs-Blockchain betreiben, da die Software offen und erlaubnisfrei ist.

Die Validatoren sind die mindestens 10 Knoten, die den aufgeteilten Entschlüsselungsschlüssel halten und die Schwellenwertentschlüsselung durchführen. Sie können keine einzelnen Stimmzettel entschlüsseln oder eine falsche Auszählung erzeugen, da jede Entschlüsselung mit einem öffentlichen Korrektheitsbeweis ausgeliefert wird.

## Wofür das Quorum da ist

Die Organisatoren legen einen Beteiligungsschwellenwert fest: Die Ergebnisse der Umfrage gelten nur dann als repräsentativ für Coin-Inhaber, wenn mindestens 1.000.000 ZEC an mindestens einer Frage teilnimmt, einschließlich Enthaltungen. Das Quorum entscheidet keine Frage und wird nicht pro Frage angewendet. Es ist eine einzige Prüfung für die gesamte Umfrage, sodass ein Ergebnis nur dann ernst genommen wird, wenn eine erhebliche Menge ZEC teilnimmt. Unterhalb dieses Niveaus gilt das Ergebnis nicht als aussagekräftiges Signal.

## Wogegen dieses Protokoll nicht schützt

Die Grenzen klar zu benennen, gehört zum Verständnis des Designs.

1. Es ist ein Signal, keine bindende Entscheidung. Eine Umfrage unter Coin-Inhabern misst nach Einsatz gewichtete Stimmungen und fließt in den normalen Zcash[Governance-Prozess](../zcash-community/zcash-governance) ein, anstatt ihn zu ersetzen.
2. Sie ist coin-gewichtet, sodass Einfluss den Beständen folgt. Weniger Reibung kann die Beteiligung erhöhen, ändert aber nicht die Konzentration von ZEC.
3. Die Agenda wird von der Koordinator-Multisig festgelegt, die auswählt, welche Fragen erscheinen. Sie kann Stimmen nicht beeinflussen, und jeder kann eine konkurrierende Blockchain betreiben, doch die Festlegung der Agenda bleibt ein Einflussfaktor.
4. Die Auszählung benötigt online verfügbare Validatoren. Die Erstellung der Auszählung setzt die Zusammenarbeit von mindestens zwei Dritteln voraus, sodass ein großer Ausfall oder koordinierte Verweigerung ein Ergebnis verzögern könnte.
5. Guthabenprivatsphäre bei vollständiger Kollusion ist mehrschichtige Verteidigung, kein Theorem. Sollte das gesamte Komitee den Schlüssel heimlich rekonstruieren, schützen Ihre Guthaben die Aufteilung in Anteile und die zeitversetzte Übermittlung; die Entwickler erkennen an, dass diese Maßnahmen bei Kollusion schwächer sind. Ausgefeilte Verkehrsanalysen bleiben ein Restrisiko.
6. Mehr bewegliche Teile als das ältere Design. PIR-Server, Übermittlungsserver, ein neuer Abstimmungsschlüssel und mehrstufige Beweise sind jeweils mögliche Quellen für Fehler oder Fehlkonfigurationen. Das System ist Open Source und Teile davon wurden unabhängig geprüft, was dieses Risiko handhabt, aber nicht beseitigt.

Was es stark und überprüfbar schützt, sind die zwei wichtigsten Dinge: Ihr Stimmzettel kann nicht mit Ihrer Identität verknüpft werden, und nur die endgültigen Summen werden jemals offengelegt.

## Glossar

| Begriff | Bedeutung in einfacher Sprache |
|---|---|
| Voting chain | Eine separate Blockchain, die von Valar Group entwickelt wurde und die Abstimmung ausführt; Ihre Zcash-Notizen werden nie darauf bewegt |
| Snapshot height | Der Mainnet-Block, dessen Guthaben das Stimmgewicht festlegen (Block 3.459.350 für die Umfrage von NU7) |
| Nullifier | Die eindeutige Markierung einer Notiz für eine Ausgabe; ihre Offenlegung würde einen Stimmzettel mit einer Notiz verknüpfen, daher beweist die Abstimmung stattdessen die Nichtzugehörigkeit |
| Private Information Retrieval (PIR) | Das Abrufen von Daten von einem Server, während verborgen bleibt, welche Daten angefordert wurden |
| Homomorphic encryption | Verschlüsselung, deren Chiffretexte addiert werden können, ohne entschlüsselt zu werden |
| Coordinator multisig | Die 2-von-5-Gruppe, die Fragen und den Rundenschlüssel autorisiert, aber Stimmen weder sehen noch ändern kann |
| Election authority | Die 10 oder mehr Validatoren, die gemeinsam den aufgeteilten Entschlüsselungsschlüssel halten und nur die endgültige Auszählung offenlegen |
| Threshold decryption | Das Wiederherstellen eines Ergebnisses nur dann, wenn genügend Inhaber von Schlüsselanteilen – hier zwei Drittel – zusammenarbeiten |
| Quorum | Die Mindestbeteiligung von 1.000.000 ZEC, damit die Umfrage als repräsentativ gilt |

## FAQ

Werden meine Coins bewegt oder gesperrt, wenn ich abstimme? Nein. Die Teilnahmeberechtigung wird am Snapshot-Block gemessen, sodass Ihr ZEC unverändert und ausgabefähig bleibt. Die Abstimmung erzeugt Beweise auf einer separaten Blockchain, keine Zcash-Transaktion.

Kann jemand feststellen, wie ich abgestimmt habe oder wie viel ich halte? Nein. Stimmzettel sind verschlüsselt, und nur aggregierte Summen werden entschlüsselt. Ihre Stimme kann nicht mit Ihrer Identität verknüpft werden, und Ihr Guthaben wird in 16 zeitversetzte Anteile aufgeteilt, um es selbst gegen ein kolludierendes Komitee zu schützen.

Was verhindert, dass jemand zweimal abstimmt oder mit Coins abstimmt, die er nicht hat? Jeder Stimmzettel enthält Zero-Knowledge-Beweise dafür, dass er durch ein echtes, nicht ausgegebenes Snapshot-Guthaben gedeckt ist, und ein PIR-basierter Nichtzugehörigkeitsbeweis zeigt, dass die zugrunde liegende Notiz nicht bereits ausgegeben wurde, ohne offenzulegen, um welche Notiz es sich handelt.

Wer zählt die Stimmen? Eine verteilte Gruppe von mindestens 10 Validatoren, von denen keiner allein etwas entschlüsseln kann. Zwei Drittel müssen zusammenarbeiten, um die Summen offenzulegen, und jede Entschlüsselung enthält einen öffentlichen Korrektheitsbeweis.

Ist das Ergebnis bindend? Es ist ein nach Einsatz gewichtetes Stimmungssignal der Coin-Inhaber. Es informiert die normale Governance von Zcash, anstatt eine Änderung automatisch umzusetzen.

Kann ich dies selbst betreiben oder prüfen? Ja. Die Software der Abstimmungs-Blockchain, die Schaltkreise, das PIR-System und ein Auszählungsprüfer werden alle von Valar Group veröffentlicht, damit jeder sie prüfen und betreiben kann.

## Testen Sie Ihr Verständnis

Wenn jeder Stimmzettel verschlüsselt und jeder Wähler anonym ist, wie kann dann jemand sicher sein, dass die veröffentlichten Summen korrekt sind und niemand zweimal abgestimmt hat?

<details>
<summary>Antwort</summary>

Drei Beweise leisten diese Arbeit. Jeder Stimmzettel enthält einen Zero-Knowledge-Beweis, dass er durch ein echtes Snapshot-Guthaben gedeckt ist, sodass keine ungedeckten Stimmen gezählt werden. Ein PIR-basierter Nichtzugehörigkeitsbeweis zeigt, dass die dahinterliegende Notiz nicht ausgegeben war, und verhindert Doppelabstimmungen, ohne die Notiz offenzulegen. Und wenn Validatoren die Summen entschlüsseln, veröffentlicht jeder einen Korrektheitsbeweis, sodass jeder vollständige Knoten bestätigen kann, dass die endgültigen Zahlen ehrlich aus den verschlüsselten Stimmzetteln entschlüsselt wurden.
</details>

## Ressourcen

- [NU7 Ankündigung der Coinholder Vote (Valar Group und Project Tachyon)](https://forum.zcashcommunity.com/t/nu7-coinholder-vote/56912) - der Forumsbeitrag, der Umfang der Umfrage, Snapshot-Höhe und Zeitplan festlegt
- [Die Coinholder Voting Chain: technisches Design](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925) - die Protokollbeschreibung, auf der diese Seite basiert
- [Valar Group Dokumentation zur abgeschirmten Abstimmung](https://valargroup.gitbook.io/shielded-vote-docs) - die gepflegte Referenz für die Abstimmungs-Blockchain
- [Valar Group Abstimmungscode und Audits (GitHub)](https://github.com/valargroup/vote-sdk) - die Open-Source-Implementierung und ihre Audits

## Verwandte Seiten

- [Private Information Retrieval](../zcash-tech/private-information-retrieval) - die Technik des Nichtzugehörigkeitsbeweises hinter der privaten Verhinderung von Doppelabstimmungen
- [Ironwood](../zcash-tech/ironwood) - der abgeschirmte Pool, dessen Guthaben das Stimmgewicht festlegen
- [zk-SNARKs](../zcash-tech/zk-snarks) - das Beweissystem hinter den Guthaben- und Teilnahmeberechtigungsbeweisen
- [Abgeschirmte Pools](../using-zcash/shielded-pools) - was ein abgeschirmtes Guthaben ist und warum es verborgen bleibt
- [Zcash Übersicht zu Finanzierung und Governance](../zcash-community/zcash-governance) - wie dieses Stimmungssignal in den breiteren Entscheidungsprozess von Zcash einfließt
- [Shielded Labs](../zcash-organizations/shielded-labs) - eines der fünf Mitglieder der Koordinator-Multisig
