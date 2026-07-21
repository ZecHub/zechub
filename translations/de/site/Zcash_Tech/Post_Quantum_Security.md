<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Post-Quantum-Sicherheit in Zcash

## TL;DR

- Quantencomputer sind ein zukünftiges Risiko, weil sie einige Public-Key-Kryptografie brechen könnten, die heute von Blockchains verwendet wird.
- "Post-Quantum" bedeutet Kryptografie, die auf gewöhnlichen Computern läuft, aber so entworfen ist, dass sie Angriffen zukünftiger Quantencomputer standhält.
- Zcash ist heute nicht vollständig post-quantenresistent.
- Shielded Zcash verringert die Menge an öffentlichen Transaktionsdaten, die zukünftige Angreifer untersuchen können, aber die Nutzung von Shielded ist nicht dasselbe wie vollständige Quantenresistenz.
- Zcash bereitet sich durch Forschung, ZIPs und Upgrade-Vorschläge wie ZIP 2005 und Project Tachyon vor.
- Eine sichere Post-Quantum-Migration muss gleichzeitig Guthaben, Privatsphäre, Wallets, Börsen und Konsensregeln schützen.

## Was ist Quantencomputing?

Ein normaler Computer speichert Informationen als Bits. Jedes Bit ist entweder `0` oder `1`.

Ein Quantencomputer verwendet Quantenbits, sogenannte Qubits. Qubits können von speziellen Algorithmen genutzt werden, die einige mathematische Probleme viel schneller lösen als normale Computer.

Das bedeutet nicht, dass ein Quantencomputer bei allem schneller ist. Das Risiko ist spezifisch. Einige kryptografische Verfahren hängen von mathematischen Problemen ab, die für normale Computer sehr schwer, für einen ausreichend großen Quantencomputer aber viel leichter sind.

Für Blockchains ist das wichtigste Beispiel Public-Key-Kryptografie. Öffentliche Schlüssel und Signaturen werden verwendet, um nachzuweisen, dass ein Nutzer Coins ausgeben darf.

## Warum Blockchains das interessiert

Blockchains verwenden Kryptografie für mehrere unterschiedliche Aufgaben:

| Kryptografisches Werkzeug | Was es tut | Quanten-Auswirkung |
| --- | --- | --- |
| Digitale Signaturen | Beweisen, dass der Eigentümer eine Ausgabe autorisiert hat | Hohes Risiko für gängige elliptische-Kurven-Systeme |
| Hash-Funktionen | Erstellen Adressen, Commitments, Merkle-Bäume und Challenges | Geringeres Risiko, aber Sicherheitsmargen sind wichtig |
| Zero-Knowledge-Proofs | Beweisen, dass Shielded-Transaktionen gültig sind, ohne Details preiszugeben | Hängt vom Proof-System und den Annahmen ab |
| Schlüsselaustausch | Hilft Wallets, Notizdaten für Empfänger zu verschlüsseln | Benötigt sorgfältige Prüfung unter einem Quanten-Bedrohungsmodell |

Ein ausreichend leistungsfähiger Quantencomputer könnte viele heute verwendete Signaturschemata bedrohen, einschließlich elliptischer-Kurven-Signaturen. Das ist wichtig, weil eine Signatur dem Netzwerk zeigt, dass eine Transaktion vom richtigen Schlüssel autorisiert wurde.

Hash-Funktionen sind anders. Grovers Algorithmus kann Brute-Force-Suche beschleunigen, aber er bricht Hash-Funktionen nicht auf dieselbe direkte Weise. Größere Sicherheitsmargen können helfen.

## Was ist Post-Quantum-Kryptografie?

Post-Quantum-Kryptografie ist Kryptografie, die so entworfen wurde, dass sie sowohl gegen normale Computer als auch gegen zukünftige Quantencomputer sicher bleibt.

Das bedeutet nicht, dass die Kryptografie einen Quantencomputer verwendet. Es bedeutet, dass das System auf anderen schwierigen mathematischen Problemen basiert.

Im Jahr 2024 veröffentlichte NIST die ersten finalisierten Post-Quantum-Standards:

- **ML-KEM** für Schlüsselaustausch
- **ML-DSA** für digitale Signaturen
- **SLH-DSA** für hashbasierte digitale Signaturen

Diese Standards sind ein wichtiger Meilenstein, aber eine Blockchain kann nicht einfach über Nacht einen Algorithmus durch einen anderen ersetzen. Konsensregeln, Wallets, Hardware-Wallets, Transaktionsgrößen, Gebühren und Privatsphäre müssen alle berücksichtigt werden.

## Wie sich das Quantenrisiko On-Chain zeigt

Eine einfache Art, über das Risiko nachzudenken, ist:

1. Ein Nutzer erstellt ein Schlüsselpaar.
2. Der öffentliche Schlüssel oder Signaturdaten können On-Chain erscheinen.
3. Ein zukünftiger Quantenangreifer könnte dieses öffentliche Material nutzen, um den privaten Schlüssel zu lernen.
4. Wenn Guthaben noch von diesem Schlüssel kontrolliert werden, könnten sie gefährdet sein.

Transparente Blockchains legen absichtlich viele Informationen offen. Adressen, Beträge und Transaktionsverknüpfungen sind öffentlich. Öffentliches Schlüsselmaterial kann ebenfalls sichtbar werden, wenn Coins ausgegeben werden.

Das ist ein Grund, warum die Wiederverwendung von Adressen schädlich ist. Wiederverwendung gibt Beobachtern heute mehr Daten zum Verknüpfen und zukünftigen Angreifern mehr historisches Material zur Analyse.

## Was ist bei Zcash anders?

Zcash unterstützt sowohl transparente als auch Shielded-Transaktionen.

Transparentes Zcash funktioniert eher wie die Nutzung einer öffentlichen Blockchain im Bitcoin-Stil. Adressen, Beträge und Transaktionsbeziehungen sind sichtbar.

Shielded Zcash ist anders. Shielded-Transaktionen verwenden Zero-Knowledge-Proofs, sodass das Netzwerk prüfen kann, dass eine Transaktion den Regeln folgt, ohne Absender, Empfänger oder Betrag offenzulegen.

Das gibt Zcash einen wichtigen Datenschutzvorteil:

- Es werden weniger Transaktionsdaten veröffentlicht, die jeder sehen kann.
- Nutzer vermeiden die Erstellung eines öffentlichen Zahlungsgraphen, wenn sie Shielded bleiben.
- Zukünftige Beobachter haben weniger öffentliche Finanzhistorie zur Analyse.
- Selektive Offenlegung kann über Viewing Keys erfolgen statt über standardmäßig öffentliche Aufzeichnungen.

Aber Shielded Zcash ist nicht automatisch post-quantenresistent. Shielded Pools hängen immer noch von kryptografischen Annahmen ab. Ausgabenautorisierung, Note Commitments, Nullifier, Proof-Systeme, Verschlüsselung und Wallet-Schlüssel müssen alle sorgfältig geprüft werden.

Die kurze Version:

> Die Nutzung von Shielded verringert die öffentliche Sichtbarkeit, aber Zcash braucht dennoch gezielte Post-Quantum-Upgrades.

## Zcash-Risikokarte

| Bereich | Erklärung für Einsteiger | Post-Quantum-Sorge |
| --- | --- | --- |
| Transparente Adressen | Öffentliche Adressen und öffentlicher Transaktionsgraph | Ähnliche Risiken wie bei anderen transparenten Blockchains |
| Ausgabenautorisierung | Der Nachweis, dass ein Nutzer ausgeben darf | Signaturschemata könnten ersetzt oder migriert werden müssen |
| Shielded Notes | Private Wertaufzeichnungen innerhalb von Shielded Pools | Einige Komponenten könnten neue Annahmen oder Wiederherstellungswerkzeuge benötigen |
| zk-SNARKs | Beweise, dass Shielded-Transaktionen gültig sind | Annahmen des Proof-Systems müssen überprüft werden |
| Wallet-Scanning | Wie Wallets empfangene Notes finden und entschlüsseln | Schlüsselaustausch und Note-Verschlüsselung müssen überprüft werden |
| Migration | Verschieben von Guthaben zu sichererer Kryptografie | Muss sowohl Guthabenverlust als auch Datenschutzlecks vermeiden |

## Wie Zcash sich vorbereitet

### Zcash hat einen Netzwerk-Upgrade-Prozess

Zcash hat seine Kryptografie schon früher verändert. Sapling machte Shielded-Transaktionen einfacher nutzbar. NU5 führte Orchard, Unified Addresses und Halo 2 ein.

Das ist wichtig, weil Post-Quantum-Bereitschaft kein einzeiliger Software-Patch ist. Sie erfordert koordinierte Netzwerk-Upgrades, Wallet-Änderungen, Audits und Zeit für die Migration der Nutzer.

Frühere Zcash-Upgrades zeigen, dass das Ökosystem Erfahrung damit hat, von älterer Kryptografie zu neueren Designs überzugehen.

### Halo und Orchard haben ältere Annahmen reduziert

Halo 2 wird von Orchard verwendet, dem modernen Shielded Pool von Zcash. Eine wichtige Verbesserung ist, dass Halo die Notwendigkeit eines Trusted Setup für das Orchard-Proof-System beseitigt hat.

Das ist nicht dasselbe wie Post-Quantum-Sicherheit. Es ist dennoch relevant, weil es zeigt, dass Zcash große kryptografische Bausteine ersetzen kann, wenn bessere Designs verfügbar sind.

### ZIP 2005 konzentriert sich auf Quantum Recoverability

ZIP 2005 trägt den Titel "Orchard Quantum Recoverability". Es schlägt Änderungen vor, die Orchard-Nutzern helfen sollen, Guthaben wiederherzustellen oder zu migrieren, falls Quantenangriffe gegen ältere Annahmen praktikabel werden.

Recoverability ist nicht dasselbe wie vollständige Post-Quantum-Sicherheit. Sie ist enger gefasst und dennoch nützlich:

- Vollständige Post-Quantum-Sicherheit versucht zu verhindern, dass Quantenangriffe funktionieren.
- Recoverability gibt ehrlichen Nutzern einen besseren Weg, falls ältere Kryptografie unsicher wird.

Für Einsteiger kann man sich das wie einen Notausgangsplan vorstellen. Er ersetzt nicht das ganze Gebäude, aber er hilft Menschen, den alten Raum sicher zu verlassen, wenn das alte Schloss schwach wird.

### Project Tachyon blickt auf größere Protokollverbesserungen

Project Tachyon ist ein vorgeschlagenes Zcash-Upgrade, das sich auf Skalierung, Synchronisierung und Zustandswachstum konzentriert. Auf der öffentlichen Website heißt es, dass der Vorschlag darauf abzielt, Transaktionen zu verkleinern, das Wachstum des Validator-Zustands zu verringern und als Nebeneffekt vollständige Post-Quantum-Privatsphäre zu erreichen.

Da Tachyon ein Vorschlag ist, hängt es vor der Aktivierung weiterhin von Engineering-Arbeit, Prüfung und Zustimmung der Community ab. Es wird am besten als Teil der aktiven Forschung und Upgrade-Richtung von Zcash verstanden, nicht als Funktion, die Nutzer heute bereits haben.

### Forschung und Standards entwickeln sich weiter

Auch die breitere Welt der Kryptografie entwickelt sich weiter. Die Post-Quantum-Standards von NIST geben Implementierern stärkere Bausteine für Signaturen und Schlüsselaustausch. Zero-Knowledge-Forscher untersuchen weiterhin Proof-Systeme, die unter Quantenannahmen standhalten können.

Zcash kann von dieser Arbeit profitieren, muss sie aber noch an eine datenschutzwahrende Blockchain anpassen.

## Mögliche zukünftige Upgrade-Ansätze

### Post-Quantum-Ausgabenautorisierung

Zcash könnte irgendwann eine Ausgabenautorisierung benötigen, die sich nicht auf quantenanfällige Signaturschemata stützt.

Das könnte Post-Quantum-Signaturen, hybride Signaturen oder ein anderes Design verwenden. Ein hybrides Design nutzt während einer Übergangszeit sowohl klassische als auch Post-Quantum-Prüfungen, sodass das System nicht nur von einer einzigen Annahme abhängt.

Die Herausforderung sind Größe und Kosten. Post-Quantum-Signaturen können größer sein als heutige Signaturen, was sich auf Transaktionsgröße, Bandbreite, Gebühren, mobile Wallets und Hardware-Wallets auswirkt.

### Neue Adress- und Schlüsselformate

Neue Kryptografie benötigt oft neue Schlüssel und Adressen. Nutzer würden einen klaren Migrationspfad von alten Formaten zu sichereren Formaten benötigen.

Die Migration sollte in Wallets einfach sein. Die meisten Nutzer sollten nicht jedes kryptografische Detail verstehen müssen, um sicher zu bleiben.

### Datenschutzwahrende Migration

Migration ist für Zcash besonders sensibel. Wenn viele Nutzer Guthaben in offensichtlichen Mustern von alten Pools in neue Pools verschieben, könnte die Migration selbst Informationen preisgeben.

Ein guter Migrationsplan muss Folgendes schützen:

- Nutzerguthaben
- Privatsphäre der Nutzer
- Wallet-Kompatibilität
- Börsenunterstützung
- Hardware-Wallet-Unterstützung
- Sicherheit des Netzwerkkonsenses

### Überprüfung des Post-Quantum-Proof-Systems

Das Ersetzen von Signaturen reicht nicht aus. Das Shielded-Design von Zcash hängt auch von Zero-Knowledge-Proofs und Commitments ab.

Zukünftige Arbeit muss möglicherweise Folgendes überprüfen oder ersetzen:

- zk-SNARK-Annahmen
- Polynom-Commitments
- Fiat-Shamir-Challenge-Hashes
- Note Commitments
- Nullifier-Konstruktion
- Merkle-Baum-Annahmen
- Note-Verschlüsselung und Verhalten von Viewing Keys

Einige Komponenten könnten mit angepassten Parametern akzeptabel sein. Andere Komponenten könnten neue Designs benötigen.

## Beispiele für Einsteiger

### Beispiel 1: Das alte Schloss

Stell dir einen Safe mit einem Schloss vor, das heute stark ist. Ein neues Werkzeug, das in der Zukunft erfunden wird, könnte dieses alte Schloss schnell öffnen.

Post-Quantum-Kryptografie ist so, als würde man das Schloss durch ein Design ersetzen, das das neue Werkzeug voraussichtlich nicht brechen kann.

Für eine Blockchain ist es schwierig, das Schloss zu ersetzen, weil jede Wallet, jeder Node, jede Börse und jedes Hardware-Gerät das neue Design verstehen muss.

### Beispiel 2: Die öffentliche Belegbox

Transparente Blockchain-Daten sind so, als würde man jede Quittung für immer in eine öffentliche Box legen. Selbst wenn heute nicht jeder Zusammenhang erkennbar ist, könnten zukünftige Werkzeuge später mehr herausfinden.

Shielded Zcash versucht, die Veröffentlichung dieser Quittungen von vornherein zu vermeiden. Das hilft der langfristigen Privatsphäre, aber das Schloss, das das Shielded-System schützt, muss dennoch für eine Quanten-Zukunft überprüft werden.

### Beispiel 3: Der Ausstiegsplan

Recoverability ist so, als würde man eine Fluchtroute planen, bevor es brennt. Man hofft, sie nie zu brauchen, aber es ist viel sicherer, sie früh zu entwerfen als während eines Notfalls.

ZIP 2005 passt für Orchard Notes zu dieser Idee.

## Was Nutzer heute tun können

Nutzer müssen nicht in Panik geraten. Große öffentliche Quantencomputer, die eingesetzte Blockchain-Kryptografie brechen können, stehen heute nicht zur Verfügung.

Gute Gewohnheiten helfen trotzdem:

- Wenn möglich, Shielded Zcash bevorzugen.
- Adressen nicht wiederverwenden.
- Wallets aktuell halten.
- Ankündigungen zu Zcash-Netzwerk-Upgrades verfolgen.
- Auf ZIPs und Wallet-Hinweise zu Recoverability oder Migration achten.
- Nicht annehmen, dass transparente Aktivität privat ist.
- Guthaben nicht auf Basis von Gerüchten verschieben; auf klare Hinweise vertrauenswürdiger Zcash-Entwickler und Wallet-Teams warten.

## Herausforderungen

Post-Quantum-Upgrades sind für jede Blockchain schwierig.

Zu den typischen Herausforderungen gehören:

- Größere Schlüssel und Signaturen
- Größere Transaktionen
- Höhere Verifizierungskosten
- Mehr Bandbreitennutzung
- Neue Sicherheitsaudits
- Hardware-Wallet-Unterstützung
- Leistung mobiler Wallets
- Integration von Börsen und Verwahrung
- Datenschutzlecks während der Migration
- Zustimmung der Community zu Konsensänderungen

Für Zcash ist der schwierigste Teil nicht nur, Coins ausgabefähig zu halten. Der schwierige Teil ist, Coins ausgabefähig zu halten und gleichzeitig die Privatsphäre zu bewahren, die Zcash besonders macht.

## Zusammenfassung

Quantencomputer könnten irgendwann einige kryptografische Verfahren bedrohen, die von Blockchains verwendet werden. Post-Quantum-Kryptografie ist die langfristige Antwort, aber sie muss sorgfältig eingeführt werden.

Zcash ist heute nicht vollständig post-quantenresistent. Dennoch hat Zcash nützliche Stärken: Shielded-Transaktionen verringern die öffentliche Sichtbarkeit, das Netzwerk hat eine Geschichte kryptografischer Upgrades, und aktuelle Forschung wie ZIP 2005 und Project Tachyon zielt bereits auf zukünftige Quantenrisiken ab.

Für Einsteiger ist die Hauptidee einfach: Privatsphäre heute verringert die zukünftige Datenoffenlegung, und sorgfältige Upgrades können Zcash helfen, sich in Richtung stärkerer Sicherheit im Quantenzeitalter zu bewegen, ohne die Nutzbarkeit zu opfern.

## Verwandte Seiten

- [Shielded Pools](/using-zcash/shielded-pools) - Wie Zcash-Shielded-Transaktionen Transaktionsdetails schützen
- [Halo](/zcash-tech/halo) - Das Proof-System von Zcash ohne Trusted Setup
- [ZKP & ZK-SNARKS](/zcash-tech/zk-snarks) - Wie Zero-Knowledge-Proofs in Zcash funktionieren
- [Viewing Keys](/zcash-tech/viewing-keys) - Wie selektive Offenlegung für Shielded Zcash funktioniert
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) - Zukünftige Shielded Assets und Unterstützung für private Assets
- [Privatsphäre als Kernprinzip](/privacy/privacy-as-a-core-principle) - Warum finanzielle Privatsphäre wichtig ist

## Referenzen

- [NIST: Erste finalisierte Post-Quantum-Verschlüsselungsstandards](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [NIST-Post-Quantum-Kryptografieprojekt](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [ZIP 2005: Orchard Quantum Recoverability](https://zips.z.cash/zip-2005)
- [Project Tachyon](https://tachyon.z.cash/)
- [Zcash-Protokollspezifikation](https://zips.z.cash/protocol/protocol.pdf)
- [Halo 2 Buch](https://zcash.github.io/halo2/)
